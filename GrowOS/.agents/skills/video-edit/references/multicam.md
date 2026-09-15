# Multi-Camera Mode

Applies whenever the footage handed over has **more than one camera angle** of
the same recording - a main camera plus a second angle, a wide plus a close-up,
a phone plus a webcam. It's an add-on step, not a separate mode: sync first,
then follow `references/long-form.md` or `references/vertical-ad.md` for the
actual cut, treating the second camera as an available source the EDL can pull
from.

**Skip this file entirely if there's only one camera file.** Set the EDL's
`sync_offset` to `null` and move on - most footage handed over is single-camera.

## Why sync has to be exact

Two cameras never start recording at the same instant, even if someone hit
record on both at once. Every segment sourced from the second camera depends
on knowing precisely how far its timeline is offset from the main camera's.
Get this wrong by even a few frames and a B-roll cutaway shows the wrong
moment - a hand gesture that doesn't match the audio, a reaction shot to
something that hasn't been said yet.

## Three-phase sync process

Don't stop after phase 1 or 2 - each phase catches what the previous one
can't verify. Do not edit on an unverified offset.

### Phase 1 - coarse: silence pattern matching

```bash
ffmpeg -y -i "MAIN_VIDEO" -vn -acodec pcm_s16le -ar 16000 -ac 1 main_audio.wav
ffmpeg -y -i "SECOND_VIDEO" -vn -acodec pcm_s16le -ar 16000 -ac 1 second_audio.wav
ffmpeg -i main_audio.wav -af "silencedetect=n=-30dB:d=0.5" -f null /dev/null 2>&1 | grep -E "silence_(start|end)"
ffmpeg -i second_audio.wav -af "silencedetect=n=-30dB:d=0.5" -f null /dev/null 2>&1 | grep -E "silence_(start|end)"
```

Match 2+ distinctive silence events between the two files.
`SYNC_OFFSET = second_time - main_time`. If two or more matched pairs agree
within 0.1s, use the average as the coarse estimate. The second camera's mic
is often noisier - focus on the most distinctive pauses.

### Phase 2 - fine: waveform cross-correlation

```python
import numpy as np
from scipy.io import wavfile
from scipy.signal import correlate

sr1, main = wavfile.read('main_audio.wav')
sr2, second = wavfile.read('second_audio.wav')
main = main.astype(np.float64); second = second.astype(np.float64)
main = main / (np.max(np.abs(main)) + 1e-10)
second = second / (np.max(np.abs(second)) + 1e-10)

COARSE_OFFSET = 0.0  # from Phase 1

def find_precise_offset(main, second, main_time, coarse_offset, sr, chunk_sec=5, margin_sec=2):
    chunk_start = int(main_time * sr)
    chunk_len = int(chunk_sec * sr)
    main_chunk = main[chunk_start:chunk_start + chunk_len]
    search_center = int((main_time + coarse_offset) * sr)
    search_margin = int(margin_sec * sr)
    search_start = max(0, search_center - search_margin)
    search_end = min(len(second), search_center + search_margin + chunk_len)
    second_search = second[search_start:search_end]
    corr = correlate(second_search, main_chunk, mode='valid')
    peak = np.argmax(corr)
    return (search_start + peak - chunk_start) / sr

offsets = []
for t in [20, 50, 90]:  # timepoints with active speech, spread across the video
    try:
        offsets.append(find_precise_offset(main, second, t, COARSE_OFFSET, sr1))
    except Exception:
        pass
if len(offsets) >= 2:
    spread = max(offsets) - min(offsets)
    avg = sum(offsets) / len(offsets)
    print(f"Average: {avg:.4f}s | Spread: {spread:.4f}s")
```

This needs `numpy` and `scipy` (`pip install numpy scipy` - not installed by
default, only needed if this file's steps actually run). The 3 measurements
must agree within **0.04s** (one frame at 25fps). A larger spread means
different sample rates, variable frame rate, or a bad coarse estimate - investigate before continuing, don't average past it.

### Phase 3 - visual: frame verification

```bash
OFFSET=9.9305  # from Phase 2
T1=20
T2_OFFSET=$(python3 -c "print($T1 + $OFFSET)")
ffmpeg -ss $T1 -i "MAIN_VIDEO" -vframes 1 sync_check_main_20.jpg
ffmpeg -ss "$T2_OFFSET" -i "SECOND_VIDEO" -vframes 1 sync_check_second_20.jpg
```

(Note the `python3 -c` for the offset arithmetic instead of `bc` - `bc` isn't
installed by default on Windows, and this whole pipeline needs to run there
too.)

Pick 2 timepoints with a distinctive gesture. Read both frames: body position,
head orientation, and gesture phase must match. If they don't, widen the
Phase 2 search margin or try different timepoints - don't ship an unverified
guess.

### Save the result

```bash
echo "SYNC_OFFSET=9.9305" > sync_offset.txt
echo "# silence match (2 pairs), cross-correlation (3 pts, spread 0.002s), visual check (2 pts)" >> sync_offset.txt
```

Put the value in the EDL's `sync_offset` field. `scripts/render_edl.py` adds
it to every second-camera segment's times automatically. **Audio always comes
from the main camera** - never use the second camera's audio track, even for
a segment sourced from its video.

## Camera-switch policy

- **Main camera carries 90-95% of runtime.** The second angle is a supporting
  source, not co-equal footage - cut to it mostly to cover retake splices
  (an edit point that would otherwise show a visible jump on the main camera)
  and for the occasional topic transition.
- **Second-camera segments run 3-5 seconds.** Long enough to register, short
  enough that it reads as a cutaway, not a camera change.
- Follow the same 5-7 second cut-frequency target from `long-form.md` across
  **both** cameras combined - a switch to the second camera counts as a cut.
- Stay on the main camera for the opening hook, direct address to the viewer,
  punchlines, and key revelations. The viewer wants the primary face there.

## Before assigning a second-camera crop: two checks

**Smart-frame check.** Read a reference frame from the second camera before
picking its crop level. Studio equipment, cables, a backdrop edge, or a
monitor showing a script all need cropping out or avoiding:

- Clean frame → a wide crop is fine.
- Minor edge clutter → default to a medium crop.
- Significant clutter → tight crop only, cropped in enough to exclude it.

**Crop feasibility check.** Before committing a crop preset, verify it doesn't
upscale. Cropping a region smaller than the output resolution and scaling it
up loses sharpness - cheap to check, expensive to notice after a full render:

```python
# crop_w, crop_h = the pixel region you're about to crop from the source
# out_w, out_h = the EDL output resolution
scale_factor = out_w / crop_w
if scale_factor > 1.0:
    print(f"WARNING: this crop upscales {scale_factor:.2f}x - pick a wider crop preset")
```

A tight crop on a 4K source scaling down to 1080p is fine (downscale). The
same tight crop on a 1080p source scaling up to 1080p output is an upscale - soft, visibly worse. Check this for every crop preset before it goes in the
EDL, not after the render.
