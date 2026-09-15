# Pipeline Internals - Packed Transcript, EDL, Self-Eval Loop, Encoding

Shared machinery behind every mode (vertical ad, long-form, multi-camera). Read
this for the two data files the edit is planned from, the bounded self-check
loop that runs after every render, and the encoding/audio settings. The
mode-specific reference files (`vertical-ad.md`, `long-form.md`, `multicam.md`)
point back here instead of repeating this.

---

## 1. Packed transcript (`packed_transcript.md`)

A compact, human-readable read of the footage. Written by
`scripts/build_packed_transcript.py` from `transcription.json` plus an ffmpeg
silence pass - never write it by hand. Plan the cut from this file, not from
re-scanning the raw JSON or re-watching the source.

```bash
python3 .claude/skills/video-edit/scripts/build_packed_transcript.py \
    transcription.json source.mp4 --output packed_transcript.md
```

It captures:

- **Beats** - runs of speech between pauses, with a timestamp range.
- **Pauses** - gaps over 0.5s, shown as `<pause Ns>`. Silence-trim candidates.
- **Audio events** - laughter, sighs, false starts, breaths (only present if
  the transcription ran with `--audio-events` on ElevenLabs - the local
  Whisper fallback doesn't tag these, so this section is empty on that path).
  A laugh is often a natural cut point; a sigh before a line can mark an
  emotional beat that word timing alone would miss.
- **Repeated takes** - a phrase said again later is tagged `[repeat of Ns]` on
  the second occurrence, pointing at the first. Keep the later take, drop the
  earlier one, unless the packed transcript shows a reason not to (this is a
  similarity heuristic, not proof - read the actual lines).
- **False starts** - a short broken fragment immediately followed by a restart.

```
[12.40-18.90] So I haven't recorded anything in over two years.
<pause 1.2s>
[20.10-24.50] To be honest I just <false-start> I just didn't have anything to say.
<laughter 0.6s>
[25.30-31.00] Until I found something that changed that.
...
[88.20-94.10] Until I found something that changed that.  [repeat of 25.30s]
```

---

## 2. EDL - edit decision list (`edl.json`)

The edit as data. Every cut, in order. `scripts/render_edl.py` turns it into
video and makes **no creative decisions** - if the output is wrong, the EDL is
wrong, not the render.

```json
{
  "version": 1,
  "mode": "vertical-ad",
  "source": { "main": "take07.mp4", "broll": null },
  "sync_offset": null,
  "output": { "width": 1080, "height": 1920, "fps": 30 },
  "encoding": { "crf": 14, "preset": "fast", "audio_bitrate": "320k" },
  "crop_presets": {
    "main": { "normal": null, "punched_in": "crop=1478:831:260:60,scale=1080:1920:flags=lanczos" }
  },
  "segments": [
    { "id": 1, "start": 0.30, "end": 3.10, "source": "main", "crop": "normal", "note": "hook" }
  ],
  "overlays": [
    { "type": "subtitle", "file": "captions.ass", "note": "burned in last" }
  ]
}
```

- `version` - bump by 1 every time the self-eval loop patches the EDL. Lets
  you diff rounds.
- `mode` - `vertical-ad`, `long-form`, or `long-form-multicam` (a label for
  humans; the render script doesn't branch on it - see below).
- `source.broll` / `sync_offset` - only set for a second camera. `null`
  otherwise.
- `crop_presets` - calibrated ffmpeg crop expressions, keyed by a name each
  segment references. `null` means no crop.
- `segments` - ordered list. Each has `start`/`end` in source-video time, a
  `source`, a `crop` key into `crop_presets`, and a `note` explaining intent
  ("retake kept, first occurrence dropped" tells a reviewer the cut was
  deliberate, not a mistake).
- `overlays` - optional. Any entry with `"type": "subtitle"` burns in an
  `.ass` file as the last render pass; anything else is a full-frame,
  time-gated replace (`start`/`end` seconds). `render_edl.py` applies whatever
  is in this array regardless of `mode` - a caption-only pass on an
  already-cut long-form video uses exactly the same mechanism as a vertical
  ad's overlays.
- Times are always in seconds, source-video time.

To change the edit: edit `edl.json`, re-run `render_edl.py`. To compare two
cuts: diff the two JSON files. The self-eval loop patches this file directly.

---

## 3. Self-eval loop (bounded, max 3 rounds)

After every render, inspect the output, fix what's broken by patching the EDL,
re-render. Bounded because each render costs real minutes and an uncapped loop
can thrash on a defect it can't actually fix.

```
render -> inspect -> defects? --no--> done
                       |
                      yes
                       |
              patch edl.json, version++
                       |
                  re-render  --(round < 3)--> inspect
                       |
                  (round == 3) -> stop, report what's still broken
```

### Round procedure

**1. Programmatic checks:**

```bash
python3 .claude/skills/video-edit/scripts/eval_checks.py edit_v1.mp4 edl.json \
    transcription.json --output defects.json
```

Writes `defects.json`: spec match (resolution/fps/codec), loudness, residual
and trailing/leading silence, mid-word cuts, scene-change count. Read it.

**2. Visual checks** (a script can't see these - extract frames and read them):

- **Glitch frames at start/end.** First 3 and last 3 frames. Flag a pre-speech
  "ready" pose, a post-speech "done" look, or any black/frozen frame.
  ```bash
  ffmpeg -ss 0 -i edit_v1.mp4 -vframes 1 chk_start.jpg -y
  DUR=$(ffprobe -v quiet -show_entries format=duration -of csv=p=0 edit_v1.mp4)
  END_TS=$(python3 -c "print($DUR - 0.12)")
  ffmpeg -ss "$END_TS" -i edit_v1.mp4 -vframes 1 chk_end.jpg -y
  ```
  (Use `python3 -c` for this kind of arithmetic, not `bc` - it isn't installed
  by default on Windows.)
- **Face framing.** Extract a frame every ~30s (more often on short clips).
  Forehead to chin, both eyes, some headroom, not pushed to an edge.
- **Cut quality at boundaries.** For each segment boundary, extract the frame
  just before and after. The cut should land on a natural pause, not a
  half-gesture.

**3. Decide and patch.** No defects → done, move to audio mastering. Otherwise
patch `edl.json`, bump `version`:

| Defect | EDL patch |
|---|---|
| Mid-word cut | Shift `start`/`end` to the nearest word boundary in `transcription.json` |
| Retake still present | Drop the segment covering the earlier occurrence |
| Glitch frame at start/end | Move the boundary past the bad frames |
| Trailing/leading silence | Trim the last word + ~0.15s / first speech − ~0.1s |
| Residual intra-segment silence | Split the segment at the silence |
| Face cropped wrong | Adjust x/y in the relevant `crop_presets` entry |
| Loudness off | Re-run `scripts/master_audio.py`; no EDL change needed |
| Spec mismatch | Fix the EDL `output` block |

Record the change in the segment's `note` so the next round (or a human) can
see the history.

**4. Re-render and re-inspect:**

```bash
python3 .claude/skills/video-edit/scripts/render_edl.py edl.json --output edit_v2.mp4
```

Never overwrite - `edit_v1`, `edit_v2`, `edit_v3` all stay on disk.

### Reporting

When the loop finishes (clean, or capped at round 3): final file path, the
round it passed on, one line per round on what was fixed, and - if round 3
still shows a defect - say so plainly with its timestamp. Never present a
capped-out result as clean.

---

## 4. Encoding and audio settings

`render_edl.py` reads encoding values straight from the EDL's `encoding`
block, so a render is fully described by the EDL:

| Setting | Vertical ad | Long-form | Why |
|---|---|---|---|
| CRF | 14 | 18 | Ads are short - the extra quality is affordable. Long-form gets re-encoded by the platform anyway, so a lower CRF is wasted bytes. |
| Preset | fast | medium | Ad renders iterate more; long-form renders once or twice. |
| Audio bitrate | 320kbps | 320kbps | Matches a human editor's export. |
| FPS | source fps | source fps | Detect with ffprobe, preserve exactly - never force-convert. |
| Container | MP4 + `+faststart` | same | Platform-optimized streaming. |

Bitrate sanity check after a render: if a 1080p output exceeds ~15 Mbps, CRF
is too low for no benefit - most platforms will compress it down anyway.

### Audio chain - `scripts/master_audio.py`

Run once, after the visual edit passes the self-eval loop. Three stages in
this order, all in one script - don't hand-build the chain:

```bash
# Long-form (wider loudness range)
python3 .claude/skills/video-edit/scripts/master_audio.py edit_v2.mp4 \
    --source "raw_take.mp4" --output edit_final.mp4 --lra 11

# Vertical ad / short-form (tighter range - watched on phone speakers, noisy places)
python3 .claude/skills/video-edit/scripts/master_audio.py edit_v2.mp4 \
    --source "raw_take.mp4" --output edit_final.mp4 --lra 2
```

Always pass `--source` - the noise-profile fingerprint needs a clean room-tone
pause, and the edit's silences are already trimmed, so the original recording
is the only place that pause still exists.

1. **Denoise.** Steady mains hum and room tone get removed with a profile
   pulled from the longest silence in the source. This needs
   `pip install noisereduce soundfile` - if that isn't installed, the script
   falls back to ffmpeg's own `afftdn` blind denoise automatically, so it
   never hard-stops for a missing package (weaker result, but it runs).
2. **EQ + dynamics.** High-pass at 90Hz, cut the low-mid boom (-4dB @ 250Hz),
   lift presence (+3dB @ 3.2kHz), add air (+3dB shelf @ 9kHz), gentle 3:1
   compression. Corrects the boomy, dull sound of a typical close-mic
   recording.
3. **Loudness.** Two-pass `loudnorm` to -16 LUFS, true peak -1.5 dBTP. Two-pass
   measures first so it normalizes cleanly instead of pumping. `--lra 11` for
   long-form, `--lra 2` for short-form.

Verify: the script writes `<output>.audiomaster.log` and prints the final
integrated loudness. Acceptance band: -17 to -15 LUFS, true peak under -1.0
dBTP - `scripts/eval_checks.py` checks the same band.
