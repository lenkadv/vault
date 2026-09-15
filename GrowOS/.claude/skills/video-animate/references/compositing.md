# Compositing - getting the animation into the cut

This skill owns compositing. `video-edit` cuts and captions only - it never
inserts b-roll or animated overlays itself. Read this at Step 6 of
`SKILL.md`, and only when the job actually asks for compositing, not for
every render.

## Route by what is proven this session, never by assumption

Three routes exist. Which one is available is decided fresh, every job -
never assume alpha works because it worked once, and never promise a route
before checking it is actually open.

### (a) Insert - render as its own clip, splice with ffmpeg concat

The default, and the only route that needs no alpha channel at all. Render
the animation as a standalone clip, then splice it into the cut:

```bash
ffmpeg -f concat -safe 0 -i filelist.txt -c copy output.mp4
```

(`filelist.txt` lists `file '<path>'` lines in cut order; re-encode instead
of `-c copy` when the animation's codec/resolution does not already match
the cut exactly.) Always available whenever ffmpeg is present - this is the
route to reach for first.

### (b) Overlay on footage - needs a proven alpha channel

Lays the animation directly on top of existing footage as a transparent
layer. Only offered when THIS session already rendered an alpha-channel
composition and verified it - never assumed from a template's
transparent-background authoring alone:

```bash
npx hyperframes render -c compositions/<file>.html --format webm \
  --output <file>-alpha.webm
ffprobe -show_entries stream=pix_fmt -of default=noprint_wrappers=1 \
  <file>-alpha.webm
```

`pix_fmt` needs to actually show an alpha-carrying format (`yuva420p` or
similar) before this route is offered to the owner - a composition
authored with a transparent CSS background is necessary but not
sufficient, only a checked render proves the pixels came out right. No
verified alpha render this session: skip straight to (c).

### (c) Embed - footage as a layer inside the composition

When alpha is not proven, put the existing footage clip INSIDE the
animation composition as a layer instead, and render full frames with the
overlay drawn on top - this achieves the same visual result as (b) without
needing alpha to work at all. The footage clip is a direct child of the
composition root (`<video muted playsinline>`, sibling of any `<audio>` -
the framework owns playback, never a hand-rolled play/pause), and its
source path is root-relative, same as every other asset. This is the
fallback route whenever (b) is not available, not a lesser option - it
produces a normal, fully-composited MP4.

## When ffmpeg is missing

ffmpeg is `video-edit`'s tool, checked at pre-flight only when compositing
is actually the ask (no need to gate every animation-only render on it).
Missing: compositing degrades to handing over the rendered animation plus
exact, copy-pasteable splice instructions for whoever has ffmpeg - say so
plainly in the report, do not silently skip the step.

## The approved-item rule

Never touch a `work/video/` item that is `approved` or `published` -
compositing a new animation into it means making a NEW item for the
composited version, with `source` pointing at the original. This holds
even when the requested change looks trivial. The full item-lifecycle
detail lives in `SKILL.md` Step 8 and `system/standards/item-model.md`;
this is the one rule from there worth restating here, because compositing
is exactly the moment it is tempting to break.
