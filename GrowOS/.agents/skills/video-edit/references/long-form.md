# Long-Form Mode

A single-camera (or multi-camera - see `references/multicam.md`) talking-head
recording, 5-25 minutes, cut into a watchable long-form video. Read
`references/pipeline.md` first for the EDL/self-eval/encoding machinery this
reuses.

## Format targets

- **Output:** 1920x1080 (16:9), or the source aspect if it's already vertical - long-form isn't defined by orientation, it's defined by length and pacing.
  A horizontal source that isn't 16:9 (a screen recording, an odd camera
  ratio) keeps its own source resolution untouched unless the owner asks for
  a specific target format - never force-crop a screen recording to 16:9.
  Preserve source fps exactly (detect with ffprobe, never force-convert; if
  the camera shot 50fps, the output is 50fps).
- **Encoding:** CRF 18, preset medium, LRA 11 on the audio master (wider
  loudness range than short-form - long-form gets watched with more
  attention and less ambient noise competing for it).

## Retake and filler policy - natural pacing, not maximum tightness

Long-form absorbs more breathing room than a vertical ad. The goal is a clean,
watchable cut, not the fastest possible one:

- Drop every confirmed retake (`[repeat of Ns]` in the packed transcript) - keep the later take unless the packed transcript shows a reason not to
  (delivery was worse, audio glitched, etc.).
- Drop false starts and filler words, but a short natural pause for emphasis
  or a breath before a hard sentence can stay - long-form doesn't need to feel
  machine-gunned.
- Collapse long silences (recording breaks, note-checking) entirely - they
  aren't pacing, they're dead air. Intra-segment silences over 0.5s collapse
  to a short natural pause (~0.3s), never vanish completely (a hard 0s cut
  between sentences reads as jarring, not tight).

## Cut frequency and crop levels

Target **5-7 seconds between crop/camera changes** (roughly 9-12 cuts per
minute). Never hold one static frame longer than 7 seconds; never cut more
often than every 3 seconds unless the content genuinely demands it.

Assign a crop level per beat from the content, not on a fixed rotation - alternate the pattern (`normal` → `punched_in` → `normal` → `tight` → `normal`),
don't just toggle two:

| Content pattern | Crop |
|---|---|
| Emotional story (a real setback, a turning point) | tight |
| Key revelation ("that's when it clicked") | tight |
| Bold claim | tight |
| After a strong statement - let it breathe | normal |
| Backstory / narrative context | punched_in |
| Lists or sequences of facts | (b-roll crop if multicam, else normal) |
| Direct address to the viewer | normal |
| Matter-of-fact information | normal |
| Transition between topics | punched_in |

**Face-crop calibration is mandatory before writing crop offsets into the
EDL.** Centered defaults are wrong on almost every video. Extract a reference
frame at a typical moment, find an approximate face center (a brightness-
weighted centroid is a fine starting guess), then extract an actual cropped
test frame and read it - forehead visible, chin not cut, some headroom. Adjust
x/y until it looks right, then write the verified crop string into the EDL's
`crop_presets`. This single step is the most common source of a bad long-form
render - don't skip the visual check.

When no face is in frame at all (a screen recording, slides + voiceover) -
face-crop calibration doesn't apply. Keep the full frame throughout - no crop
variation, just cut on content.

```
main.normal      -> null (no crop)
main.punched_in  -> crop=<w>:<h>:{x}:{y},scale=<out_w>:<out_h>:flags=lanczos   (~130%)
main.tight       -> crop=<w>:<h>:{x}:{y},scale=<out_w>:<out_h>:flags=lanczos   (~150%)
```

## Silence trimming

Two layers, both feeding trimmed boundaries into the EDL segments:

- **Between segments** - a long pause becomes a cut, not a segment. Only
  speech beats become EDL segments in the first place.
- **Within a segment** - an intra-segment silence over 0.5s collapses to
  ~0.3s. Never cut through a word: a word only counts as "inside" a silence
  if its **midpoint** falls in the silence region - a word tail barely
  entering the gap is fine to trim. Protect the final word of each beat by
  extending the segment to the last transcribed word plus a ~0.3s buffer;
  speakers trail off quietly at sentence ends and an over-eager trim clips
  the last syllable. `scripts/eval_checks.py` catches any mid-word cut that
  slips through.

## Chapter awareness

Long-form benefits from chapter markers (for the platform's chapter UI, or
just for the delivery report). Generate a suggested chapter list from the
packed transcript once the cut is locked:

1. Walk the final EDL's segments in order, mapped back to their packed-
   transcript beats.
2. A candidate chapter boundary is a pause over ~2s that also lines up with a
   topic shift - read the beat text on either side of the pause; if the
   subject changes (not just a breath mid-thought), it's a boundary.
3. Give each chapter a short (3-6 word) title from the beat that opens it - don't invent a title the transcript doesn't support.
4. The first chapter always starts at 0:00 regardless of pause length.

This is a suggestion, not a rendered feature - hand it to the user in the
delivery report as a timestamp list they can paste into a platform's
description field. Don't fabricate chapters where the transcript doesn't
clearly support a topic change; a 12-minute single-topic video may only need
2-3 chapters, and that's fine.

## Captions

Not on by default for long-form - long-form is typically watched with sound,
and a permanent burned-in caption rail reads as short-form styling on a
video that isn't. If the user wants captions anyway (accessibility, a
silent-autoplay placement, personal preference), use
`references/captions.md` with `--no-all-caps` - sentence case reads better at
long-form's slower pace than the ALL CAPS short-form convention.

## Delivery

Report: final duration vs. the raw take's duration (how much got cut), the
suggested chapter list, self-eval rounds run, and anything the loop couldn't
fix on its own.
