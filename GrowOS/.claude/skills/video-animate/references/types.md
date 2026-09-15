# The four types

What each type is for, when to reach for it, and the template that starts
it. Pick one at Step 1 of `SKILL.md` from what the owner actually asked
for - do not default to b-roll-accent just because it is the most visual.

`references/templates/probe.html` is not a fifth type here - it is the
pre-flight mechanism from `references/setup.md` §4, never shown to the
owner as a deliverable.

## 1. Text overlay

**Template:** `templates/text-overlay.html` - 1080x1920, ~6 seconds. A
lower-third (name/role card, slides and fades in from the left, holds,
slides out) plus two keyword pops (a big centered word, and an accent
pill for a short stat or claim), each scaling in and settling.

**When it fits:** naming a person or product on screen, punctuating a
spoken word with a big keyword at the moment it is said, a short stat pill
that needs to land on a beat rather than sit in a diagram. Vertical-first
(built for 9:16 talking-head and short-form), but the same structure works
reframed to landscape or square.

**Notes:** three independently-timed `.clip` children on separate track
indices - reuse the pattern (pop in, hold, pop or slide out) rather than
inventing a fourth element; a fourth simultaneous clip is usually a sign
the job actually needs two separate overlays in sequence, not one busier
one.

## 2. Diagram

**Template:** `templates/diagram-flow.html` - 1920x1080, ~8 seconds. A
title kicker plus three step boxes entering in sequence, connected by two
SVG arrows whose lines draw themselves (measured `getTotalLength()`,
animated `strokeDashoffset`) right as each box settles.

**Variant - stat callout:** `templates/stat-callout.html` - 1920x1080, ~5
seconds. One number counting up to a verified figure, with a label
underneath. Use this instead of the full flow template when the job is
about ONE number, not a process with steps.

**When it fits:** explaining a process, a before/after, a step sequence -
or, via the stat-callout variant, a single number that matters more than
any image could. Never invent the number or the steps; both come from
`brain/proof/` or the source script, `[PLACEHOLDER: what is missing]`
otherwise.

**Notes:** the arrow-draw technique (measure the real path length, tween
`strokeDashoffset` from that length to 0) is the one non-obvious piece -
copy it rather than re-deriving it, it is what keeps the arrowhead landing
exactly on the box edge with no gap or overlap. For a vertical (1080x1920)
cut: adapt the template rather than shipping landscape into a vertical
frame - stack the three boxes in a column, point the arrows downward, same
measure-and-draw technique on vertical paths.

## 3. B-roll accent

**Template:** `templates/broll-accent.html` - 1920x1080, 6-8 seconds,
seamless loop. A grid of cells whose scale and opacity pulse on mirrored
finite tweens (bounded `repeat` + `yoyo`, parity-tuned so the final play
lands every cell back on its own start state) - a provably clean loop
point with no unbounded repeats.

**When it fits:** filling a beat where the cut needs motion behind or
beside spoken content that is genuinely about something visual - texture,
rhythm, activity - never as a default filler with no message behind it.
This is the type `references/craft.md`'s concrete-over-abstract rule most
directly guards: a geometric, literal pulse, not a generative shader
texture. If the job cannot say what the loop is actually showing, it
probably should not be built - offer zero animations instead.

**Notes:** deterministic by construction - every cell's state is a pure
function of `tl.time()` via a phase formula, never `Math.random()` and
never GSAP's `repeat: -1` (banned - render duration must stay bounded and
the timeline must stay seek-safe at any point, not just from a live start).

## 4. Transition

**Template:** `templates/transition.html` - 1920x1080, ~1 second. Two
panels covering the frame slide apart (`transform: translateX`, never
`width`/`left`) to reveal what is underneath.

**When it fits:** cutting between two sections of a longer edit where a
plain hard cut feels abrupt - a chapter change, a before/after pivot.
Rendered as its own short standalone clip for `video-edit` to splice in,
never baked into a longer composition.

**Notes:** the shortest template on purpose - `references/craft.md`'s
duration bound is 1 second or under, and a transition that lingers stops
reading as a transition and starts reading as its own scene.
