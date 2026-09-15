---
name: video-animate
description: 'Build motion graphics for a video: text overlays, keyword pops, lower thirds, step-flow diagrams, stat callouts, b-roll accent loops, and short transitions - then composite the result into a video-edit cut. Trigger words: animate this, add an animation, text overlay, animated diagram, b-roll accent, motion graphics, add graphics to my video, add a transition. A per-job probe render decides a real render versus a buildable brief, every session, on this machine, so a broken renderer never blocks the work. Out of scope: cutting raw footage and captions - that is the `video-edit` skill, which cuts and captions only; this skill builds the animations and composites them, it does not touch the underlying cut.'
argument-hint: "[what to animate, or the item/video it composites into]"
user-invocable: true
---

# Video Animate

Builds motion graphics - text overlays, animated diagrams, stat callouts,
b-roll accent loops, and transitions - and composites them into an existing
`video-edit` cut. **Out of scope:** cutting raw footage and captions - that
is the `video-edit` skill, which cuts and captions only. This skill builds
animations and composites them; it does not touch the underlying cut.

Rendering runs through HyperFrames (HTML-to-video). Local rendering on a
customer Mac is genuinely fragile - Chrome/puppeteer drift breaks it in ways
no version pin fixes. So this skill never assumes a render will work. A
cheap, bundled probe render decides render-mode versus brief-mode fresh,
every job, on this machine. Brief-mode is a first-class output, not a
consolation prize: a precise, buildable brief a human editor could follow.

## The pipeline

```
pre-flight (probe) -> read brain -> the ask -> design proposal
   -> author from templates -> lint -> render -> self-check
   -> composite (if asked) -> gate copy + compliance -> deliver
```

## Step 0: Pre-flight - node, cost, consent, probe

Before any composition work:

1. Check `node -v` is 22 or higher. Below that, say so plainly and stop -
   point at the Node.js installer, never a workaround.
2. Check `npx` resolves at all.
3. First use this session: disclose the real cost in one plain paragraph -
   about 360-390MB lands in the npx cache plus a one-time Chrome-for-Testing
   browser download, both outside the project folder, invisible if you only
   look in the project. Ask the owner to say go before either downloads.
4. On a yes: run the PROBE RENDER - `references/templates/probe.html`
   (1 second, 320x180, one fading dot, the cheapest real render there is)
   in a throwaway temp project built per `references/setup.md` §8 - never
   inside the business folder. This is the ONLY thing that decides
   render-mode. Working last session does not count; a fresh
   `npx hyperframes` re-resolves versions every time and can silently start
   failing with no action from the owner.
5. Probe renders clean -> render-mode is unlocked for this job, this
   session only. Probe fails, or the owner declines the cost -> brief-mode.
   Say so in one line, in plain words: the renderer cannot finish a render
   on this machine right now, this is a known issue in the current release
   of the rendering tool and not something the owner broke, the brief is
   today's deliverable and the render can run later. Quote the exact probe
   error in the report - that line is what support needs. Never suggest
   Docker, even though the tool's own error message does.

Full recipe, the honest cost breakdown, and why the probe exists at all:
`references/setup.md`.

## Step 0.5: Read the brain

Read `brain/brand.md` for the accent color and font family, `brain/voice.md`
for tone, `brain/compliance.md` for what may not be claimed, and any
relevant `brain/lessons/`. No `brand.md`, or it is missing a color/font: use
the stock default - one neutral accent, the system font stack. This skill
ships with none of the owner's own palette baked in anywhere.

## Step 1: The ask

Pin down, in a short back-and-forth: which type (see
`references/types.md`), the format (1920x1080, 1080x1920, 1080x1080, or
match the parent cut), whether this is standalone or attaches to an
existing `work/video/` item, and a rough duration. Do not guess a type from
a vague request - ask.

## Step 2: Design proposal - shown before building

For every animation in the job, show the owner, before touching a template:
the message beat it carries, the type, the duration, and where it lands in
the cut. This is the cheap checkpoint the whole structure exists for - an
animation is real work to build and render, so get it right on paper first.
Zero animations is a valid outcome of this step: if nothing on the ask
actually earns its place, say so and stop rather than padding the cut.

## Step 3: Author from templates

The job's project lives at `work/video/_<slug>/anim/` - parts space, built
by hand from the scaffold recipe in `references/setup.md` §8
(`hyperframes.json` verbatim, `assets/gsap.min.js` vendored, the
composition as `index.html`). Clone the matching file from
`references/templates/`, never invent structure from scratch - every
template already carries the verified contract (root `data-start="0"`,
`data-width`/`data-height`/`data-duration`, `class="clip"` children,
root-relative asset paths, full-bleed backgrounds on a child div, never the
root). Apply brand tokens through the
`--accent`/`--font` CSS variables the templates already declare - real
brand.md values when there are any, the neutral stock default otherwise -
never hardcode a color or font into the composition body. Drop in the real
copy for this job. Numbers in a stat callout come only from `brain/proof/`
or the source script - `[PLACEHOLDER: what is missing]` otherwise, never an
invented figure.

## Step 4: Lint, then render

```bash
npx hyperframes lint
```

Fix every error before rendering - lint is cheap, a render is not. Then,
only in render-mode (Step 0 decided this):

```bash
npx hyperframes render --output <path>.mp4
```

Never a version pin (`hyperframes@x.y.z`) on any invocation. This was
tested directly and refuted as a fix - the historically-working version
combination fails identically to the latest one, because the break lives in
a browser/puppeteer interaction, not a HyperFrames version. Unpinned
self-heals the moment upstream ships a fix; a pin would just freeze in the
broken state. Keep the command surface to `lint`, `render`, and `--help` -
never `init` (Step 0 constraint below), never anything destructive to the
shared browser cache.

## Step 5: Self-check - never hand over an unchecked render

```bash
ffmpeg -ss <t> -i <output>.mp4 -frames:v 1 frame.png   # 2-3 timestamps
ffprobe -show_entries stream=codec_name,width,height,pix_fmt,duration \
  -of default=noprint_wrappers=1 <output>.mp4
```

Actually look at the extracted frames - text legible, safe zones held,
nothing clipped or stale. Check duration, fps, and resolution against what
was asked for. A render that has not been looked at does not get presented
as done. No ffmpeg on this machine: the frame check cannot run - say so in
the report (the render shipped without it) rather than skipping silently.

## Step 6: Composite - only if asked

Route by what is actually proven this session, never by assumption. Full
detail, the three routes, and the approved-item rule:
`references/compositing.md`. If ffmpeg is missing, compositing degrades to
handing over the rendered animation plus exact splice instructions - say so
plainly, do not silently skip it.

## Step 7: Gate the copy, check compliance

Before seal, run one editor-gate pass (the `reviewer` agent) over the full
copy set for the job - every overlay line, diagram label, and stat figure
together, one invocation, not one per line. This runs after Step 4's render,
not before it. The gate covers the owner-facing copy only: a brief's
technical notation (timing tables, easing names, pixel sizes) is an internal
production document, never rewritten to satisfy a readability score. Apply
what it flags per `system/standards/skill-standard.md`'s Editor gate section
- and if a fix changes any words that appear on the rendered video, that
render is now stale: redo Step 4, re-run Step 5's self-check, and re-seal,
before this item goes anywhere near `review`. Never seal a render that is
older than the copy it shows. Separately, check every claim against
`brain/compliance.md` at design time (Step 2, not after render) - a clash
gets flagged as an exact quote to the owner, never silently rewritten. No
agent runtime available: run the same check yourself in-session, labeled
plainly as a fresh pass rather than the reviewer agent, per the skill
standard's no-agent fallback.

## Step 8: Deliver

**Standalone job:** its own work item, `work/video/<slug>.md`,
`type: video-animation`, parts (composition HTML, assets, renders) in
`work/video/_<slug>/`. Set only the human fields at birth - `type`,
`headline`, `skill: video-animate`, and `source` when this job was derived
from a script or another item. The system stamps the rest. Born `draft`.

**Attaching to an existing cut still in `draft` or `changes`:** renders land
in THAT item's `_<slug>/` parts folder, sealed into that item before its own
review.

**Attaching to an `approved` or `published` item:** never touch it. Make a
NEW item for the composited version, with `source` pointing at the original.
This rule has no exceptions.

**Seal before review:** every render that will actually ship gets its
`- _<slug>/<file> sha256:<hex>` line in the item's frontmatter, written
before the item moves to `review`, per `system/standards/item-model.md`'s
Sealed assets section.

**Brief-mode deliverable:** when Step 0 landed on brief-mode, the brief IS
the deliverable, not an apology for one. Per animation: storyboard beats
with timestamps, the exact copy, colors and fonts as brand tokens, sizes,
the easing/motion words to use, format and duration - good enough to hand a
human editor cold. Brief-mode still authors and lints the composition HTML
into the job's parts project once the copy is settled - the lint-clean file
banks beside the brief so the later render is one command - but the
owner-facing brief is what the item presents. Nothing gets a `sealed:` line
in brief-mode; the item and the report both say plainly that nothing
rendered.

**Report:** what ran and what did not, every seal written, the probe's
outcome for this session (with the exact error quoted if it failed), which
compositing route was used and why, and any claim or number still marked
`[PLACEHOLDER]`.

## Reference files

| File | Read for |
|---|---|
| `references/setup.md` | Node/npx checks, the real cost, the probe, GSAP vendoring, why `init` never runs |
| `references/craft.md` | The taste law - concrete over abstract, duration bounds, safe zones, formats |
| `references/types.md` | The four animation types, when each fits, per-type template notes |
| `references/compositing.md` | The three routes into a video-edit cut, and the approved-item rule |
| `references/templates/` | Six standalone compositions to author from - never build from a blank file |

## Rules

1. Never run `hyperframes init` - it rewrites global agent-skill folders on
   the whole machine with no working opt-out. This skill ships its own
   scaffold in `references/templates/` and copies from that instead. Only
   `lint`, `render`, and `--help` are ever invoked.
2. Never pin a HyperFrames version. Pinning was tested and found to make no
   difference to the known failure - unpinned self-heals when upstream
   fixes land; a pin would freeze in the broken state instead.
3. The probe decides render-mode versus brief-mode, fresh, every job, every
   session. A render that worked last time proves nothing about this time.
4. Zero animations is a valid recommendation. An animation earns its place
   with a specific message beat, or it does not get built.
5. Never touch an approved or published item. Composite into a new item
   that references the original in `source`.
6. Never invent a stat, a quote, or a claim. `brain/proof/` or the source
   script only - `[PLACEHOLDER: what is missing]` otherwise.
7. Never a CDN URL inside a render-bound composition. GSAP loads from
   `assets/gsap.min.js`, vendored once per job - so the composition has no
   render-time CDN dependency. The render COMMAND is a different thing:
   `npx hyperframes` re-resolves every call on purpose, so do not tell the
   owner the render works offline.
8. Never suggest Docker to the owner, even though the CLI's own error
   message does.
9. Seal before review. A render with no `sealed:` line never ships.

## Tools used

Node.js >= 22 and `npx` (resolves `hyperframes` unpinned - the authoring and
render engine); ffmpeg / ffprobe (self-check, and the insert/embed
compositing routes - `video-edit`'s tool, checked at pre-flight whenever
compositing is asked for); the `reviewer` agent (the copy gate in Step 7).
