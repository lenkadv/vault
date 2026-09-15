# Captions

Word-level burned-in captions via `scripts/generate_captions.py` + an ffmpeg
`ass=` burn-in pass. Two tiers: a **rail** (every phrase, always on if
captions are requested) and an optional **hero word** (one word composited
behind the subject - off by default, heavier dependency, see §3).

Always burn captions in - never ship soft subtitles. Every major platform
strips soft-subtitle tracks on upload or re-encode, so a "captioned" video
with only a soft track effectively has none once it's posted.

**Burn onto the mastered file, with `-c:a copy` - never re-render via the
EDL at this point.** By the time captions run (Step 7), audio mastering
(Step 6) has already happened. `render_edl.py` always rebuilds audio from
the raw source, never from a mastered file, so adding the subtitle to
`edl.json`'s `overlays` and re-rendering at this stage silently throws away
Step 6's work. Burn straight onto `edit_final.mp4` instead, copying its
audio through untouched - see SKILL.md Step 7 for the exact command.

## 1. Getting the style - brand-configurable, stock-font default

Before generating captions, work out the style instead of assuming a default:

1. **Look for `brain/brand.md`** (or `brain/voice.md`, or search `brain/` by
   content if the filenames differ) in the working directory. If it defines a
   primary color, an accent color, or a display font, use those.
2. **No brain, or brand.md doesn't cover this** - ask: primary text color,
   accent/highlight color, and (optional) a font family already installed on
   this machine. One or two questions, not a full interview.
3. **Still nothing** - use the stock default: white rail text, an amber
   highlight, Arial Black. Arial Black ships on both macOS and Windows by
   default, so this default never needs a font install.

**Size by output format** - `--font-size`/`--margin-v` are canvas-relative,
not fixed numbers, so scale them to whatever resolution this render is:

| Format | Resolution | `--font-size` | `--margin-v` |
|---|---|---|---|
| Vertical | 1080x1920 | 90 | 500 |
| Landscape | 1920x1080 | 60 | 80 |
| Square | 1080x1080 | 75 | 120 |

Any other resolution: scale from the nearest of these by height ratio, then
eyeball a test frame - don't guess blind.

```bash
python3 .claude/skills/video-edit/scripts/generate_captions.py transcription.json \
    --output captions.ass \
    --font "Arial Black" \
    --primary-color "#FFFFFF" --highlight-color "#FFC857" \
    --font-size 90 --outline 5 --shadow 2 --margin-v 500 \
    --width 1080 --height 1920 --all-caps \
    --keyterms "BrandName" "ProductName"
```

`--keyterms` biases the highlight-word selection toward brand/product names - pass whatever the business's own vocabulary is, not a fixed list.

**Custom font risk:** an arbitrary brand font isn't guaranteed to exist on
this machine, and ffmpeg/libass will silently fall back to a system default if
the named font isn't found - the render won't error, it'll just look wrong.
After generating captions with a non-stock font, always extract a test frame
and read it before committing to a full render:

```bash
ffmpeg -i cut.mp4 -vf "ass=captions.ass" -vframes 1 -ss 2 caption_test.jpg
```

If the custom font isn't rendering (falls back to a generic sans), either
confirm it's actually installed as a system font, or fall back to Arial
Black and say so.

## 2. Phrase grouping and highlight selection

`scripts/generate_captions.py` handles this - the logic, so it can be tuned:

- **2-3 words per phrase**, breaking at a pause over 0.2s or at the max word
  count, whichever comes first. Grammatical units generally survive
  (article+noun, verb+object) because the break is pause-driven, not a fixed
  word count.
- **Filler stripping** runs before grouping: "uh", "um", filler "you know" /
  "I mean" / "kind of" / "sort of", a trailing "right?". Removed entirely,
  not left as a gap - the surrounding phrase timing closes over it.
- **One highlight word per phrase, at most**, picked in priority order:
  numbers > configured keyterms (brand/product names) > strong verbs >
  emotional words > contrast words ("but", "instead", "without"). Never two
  consecutive phrases both highlighted - `--highlight-rate` targets roughly
  20-30% of phrases carrying one.
- **ALL CAPS by default** (`--all-caps`), matching short-form caption
  convention. Pass `--no-all-caps` for long-form or any context where
  sentence case reads better - `references/long-form.md` uses this.

## 3. Hero word - optional, off by default

A rare, cinematic effect: one word per clip (0-2 max) rendered large behind
the subject, so their head/shoulders occlude part of it. This is genuinely
striking when used sparingly and genuinely distracting used often - it is
**not part of the default pipeline**. Turn it on only when asked for it.

**What it costs:**

```bash
pip install rembg pymatting pillow
```

One command. First run downloads a ~176MB segmentation model
(`u2net_human_seg`) to `~/.u2net/`. Matting is **CPU-only** - do not run it on
GPU/CoreML, both have documented mixed-precision corruption bugs with
segmentation models, and it produces visibly broken mattes. Expect roughly
**1 second per frame** on CPU. Because only the hero word's short window gets
matted (not the whole clip - see below), a 30-second clip with one 1.5-second
hero word costs a minute or two of extra render time, not the whole clip's
runtime multiplied out. Still: this is the single most expensive optional
step in the whole skill. Say so before running it, especially on an
underpowered laptop.

**Selection, if it's being used:** pick the word that IS the point of the
clip - the payoff, the turn, the emotional peak - not just an important word.
A pause before a candidate word (a gap over 0.3s in `transcription.json`) is a
strong signal of deliberate emphasis. Zero is a completely valid outcome if
nothing earns it; never force one onto a clip that doesn't have a clear peak.

**Running it:**

```bash
python3 .claude/skills/video-edit/scripts/hero_word_optional.py cut.mp4 --word "Freedom" \
    --start 12.4 --end 13.1 --output hero_freedom.mp4 --color "#FFC857"
```

This mattes just the window around the word (lead-in + linger, not the whole
clip), draws the word behind the matte with a scale/fade animation, and
writes a short opaque mp4 fragment covering that window. Feed it into the
EDL's `overlays` array as a full-frame replace:

```json
{ "type": "hero", "file": "hero_freedom.mp4", "start": 12.25, "end": 13.9 }
```

`render_edl.py` already applies any overlay entry this way - no separate
render path needed.

**Before compositing, exclude the hero word's timestamps from the rail** so
it doesn't double up - pass the same window to
`scripts/generate_captions.py --hero-windows`:

```bash
python3 .claude/skills/video-edit/scripts/generate_captions.py transcription.json \
    --output captions.ass --hero-windows '[{"start": 12.25, "end": 13.9}]'
```

**Eligibility - check before matting, not after.** Skip the hero effect
(flat captions only, no error, just a note in the report) if any of:

- Multiple speakers or a hard cut inside the hero window.
- No clear single human subject, or fast handheld motion (the matte will
  flicker).
- The source already has burned-in text or graphics in that region.
- `rembg` isn't installed - check with
  `python3 .claude/skills/video-edit/scripts/hero_word_optional.py --check`
  before starting.

The rail always works regardless of whether the hero effect can run - never
let a matting failure cost the captions entirely.

## 4. Verify

Extract a handful of frames across the finished captioned video and read
them:

- Captions readable at a glance, not overlapping the face, inside the safe
  zone (`references/vertical-ad.md` §"Safe zones" for the vertical numbers).
- Highlight color clearly distinguishable from the base text color.
- If a hero word was placed: it's legibly behind the subject (not buried
  under the widest, most opaque part of the head), no pale halo tracing the
  hair (a decontamination artifact - if present, the matte needs the
  `alpha_matting` settings in `hero_word_optional.py` re-tuned, not a redo
  with the same settings).
