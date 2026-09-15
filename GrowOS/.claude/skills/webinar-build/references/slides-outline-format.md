# Slides outline format

The format `_<slug>-webinar/slides-outline.md` must follow. Adapted from the
outline-contract half of the owner's own giveaway "workshop-slides" skill —
per the lead's ADAPT ruling, only the outline contract carries over, fused
with `references/webinar-structure.md`'s belief-chain engine (the same
device, under the same four field names, in both source materials — no
reconciliation needed, just one shared shape). The giveaway skill's HTML
render engine, its hardcoded voice rules, and its brand-neutral-but-hardcoded
color defaults do NOT carry over — v1 of this skill promises an outline, not
a rendered deck, and says so plainly if asked for one.

This file is notation for building the outline. It never appears inside a
customer's actual slides outline, and it is never itself scored at the
Editor gate (SKILL.md Phase 8) — the finished `slides-outline.md` it produces
is also notation, and also never scored.

## 1. Header block (required)

```markdown
# <Webinar working title> — slides outline

**Audience:** who this is for, in one line — from `brain/audience.md`.
**Goal:** what the audience should believe or do by the end.
**Platform / context:** live webinar, workshop, or pre-recorded/evergreen
  replay (from the Phase 0 delivery-style answer).
**Runtime:** total minutes, and the segment split from `webinar-structure.md`
  scaled to this length.
**Brand colors / fonts:** from `brain/brand.md` first. Only ask the owner
  when brand.md genuinely has nothing — never re-interview for something the
  brain already answers, and never default silently to a hardcoded palette.
**Pre-show countdown:** the hold screen's countdown to the real start time,
  or "none." (This is not the kill list's banned pitch-section countdown —
  see `webinar-structure.md`, Section 4.)
**Slide count:** filled in once the outline is final.
```

## 2. The core promise(s) (required)

One to three outcome-language promises the deck proves — never internal
jargon, never a mechanism name. State them the way the audience would repeat
them back ("it actually saves me money," not "cost-optimization framework").
These are the same three promises the teaching chapters carry.

```markdown
## THE PROMISE(S)

1. **<promise, outcome language>** — one line unpacking it.
2. **<promise 2>** — ...
3. **<promise 3>** — ...
```

## 3. Per-chapter belief-chain header (required per chapter)

Carry the belief chain drafted in SKILL.md Phase 3 forward verbatim — this
outline does not re-derive it. The header is also the slide-shape's
underlying "old belief -> new belief" beat for that chapter's divider and
money-echo slides, and the fastest check for whether a chapter still earns
its slot: if "self-challenge verdict" cannot be filled in honestly, the
chapter is not ready to outline yet.

```markdown
### Chapter <N> — "<chapter title, an instruction, outcome language>"
- **They currently believe:** <from Phase 3>
- **Break it with:** <from Phase 3>
- **New belief:** <from Phase 3>
- **Self-challenge verdict:** YES/NO/CONDITIONAL — <why, and the residual
  risk if conditional>
```

The Open and the Pitch don't carry a belief-chain header of their own in this
outline (they aren't "chapters" in the belief-chain sense) — the Open's job
is calibration and trust, and the Pitch's arc lives in
`references/cta-choreography.md`.

## 4. Segments + slides (required)

```markdown
## SEGMENT <name from webinar-structure.md> (min <start>–<end>)
```

Timing marks (`min X–Y`) come straight from the runsheet (SKILL.md Phase 6)
once it exists — for a segment still in relative time, use the T+ offsets
instead of a placeholder date.

Each slide:

```markdown
### Slide <N> — <short internal label>
**ON SLIDE:** <the exact words that render on screen — short, scannable in
  under two seconds. This is copy, not a paragraph.>
**SAY:** <a one-line pointer into `segment-scripts.md` for this beat, e.g.
  "see segment-scripts.md, Chapter 1, the reframe line" — the actual spoken
  words live in the script, once, not duplicated here.>
**VISUAL:** pattern: <one ID from the table below> — <what fills it: a real
  asset description and where it lives, OR "CREATE FRESH" for a
  built-from-scratch graphic (a chip row, a chart), OR "DROP-IN: <exact
  description of the missing asset>" when no real asset exists yet.>
```

Optional lines, include only when relevant:

```markdown
**CHAT BEAT:** <the audience prompt, e.g. "Type 1, 2, or 3 in the chat.">
**PRODUCTION NOTE:** <a build instruction for a future render pass, e.g. "no
  chat badge on this slide">
**NOTE:** <rationale for a structural choice — why this slide exists, what
  it replaced>
**CLAIM-CHECK:** <a fact, number, or claim that must be verified with the
  owner before this deck ships — never invent the number to fill this in.
  Treat the same way as a `rough` or `unchecked` mark in `brain/business.md`:
  context, not something to say as settled.>
```

## 5. The DROP-IN placeholder discipline

A slide that needs a real asset — a screenshot, a customer photo, a chart
built from real numbers — gets one of exactly three treatments, never a
fourth:

- **A real asset exists and is on file.** Name it and where it lives (a
  `brain/assets/` entry, per its `index.md` line).
- **CREATE FRESH.** The asset is a built-from-scratch graphic with no
  photographic or data content of its own (an icon row, a diagram, a chip
  list) — safe to build without any missing real-world input.
- **DROP-IN.** A real asset is genuinely needed and does not exist yet.
  Name exactly what's missing and where it should end up, and leave it
  there — never invent a stand-in graphic that implies a real screenshot,
  chart, or photo exists when it doesn't. A slot the owner has to fill is
  marked, never faked.

`DROP-IN` beats `CREATE FRESH` whenever there's genuine doubt about which one
applies — an unconfirmed real asset is safer marked missing than quietly
replaced with a generic graphic that looks like it might be real.

## 6. On-slide reading-grade discipline

What's SHOWN and what's SAID follow different rules, on purpose:

- **On-slide text** is pinned to a low, simple reading grade and a narrow
  character count per line, because it has to be scannable in under two
  seconds by someone half-watching a screen. This is a constraint of the
  MEDIUM — like the Editor gate's channel ceiling for spoken sales copy — not
  a claim about this business's real voice.
- **Spoken narration** (in `segment-scripts.md`) stays in this business's own
  real register from `brain/voice.md` — full sentences, natural formality,
  humor if that's how they sound. `brain/voice.md` governs vocabulary and
  formality on slides too; it never overrides the on-slide grade ceiling,
  because a slide's job is to be glanced at, not read closely.
- **No em dash on slides.** A narrow rule specific to this medium — a slide
  is a handful of words, and an em dash reads as visual clutter at a glance
  in a way it doesn't on a page. This is separate from whatever the Editor
  gate's scorer flags in spoken copy; slides are never scored (see below),
  so this rule is enforced by the drafting pass itself, not a number.
- **No persistent chrome.** No progress bar, no chapter-number badge, no
  "chat is live" indicator anywhere in the outline — every slide should read
  as one clean thought, not a dashboard.

## 7. Per-segment slide-density guidance

| Segment | Typical patterns | Density note |
|---|---|---|
| The Open | `hold`, `chips`, `standard`, `chat-beat` | The payoff-proof slide and the credible proof-of-concept slide can each split into a short `split`/`quote-proof` run if the evidence needs more than one image to read clearly. |
| Chapter template (x3) | `chapter` (divider), `standard`, `prompt-card`, `split` or `quote-proof` (the proof run), `money-echo` | The proof run is the one place worth spreading across several consecutive slides rather than cramming — readability at stream/small-screen resolution is the reason, not a slide-count target. |
| Recap + Gift | `chips` (an explicit callback to the Open's chips), `money-echo` or `standard` (the gift reveal) | Short by design — this segment is ~4% of runtime; don't pad it with slides it doesn't need. |
| The Pitch | `chapter`-style divider (reveal), `split`, `quote-proof`, `montage` (proof wall), `standard` ("what's inside," price, guarantee, gut-check, mission), `stack-list` (bonus recap, deliberately unadorned — no per-item pricing), `door-list` (cost comparison), one `standard` per objection (headlined as the audience's own quoted thought), `cta` | The proof wall is the other place to spread across multiple consecutive slides for the same readability reason. The bonus recap (`stack-list`) stays plain — no icons, no per-item price — specifically so it doesn't read as a hyped sales list. |
| Q&A close | `standard` per seeded question, or `chat-beat` where a live question gets read on-slide | Kept light — most of this segment is spoken, not slide-driven. |

**Design rhythm.** Roughly one-fifth of the deck runs in a distinct
dark/high-contrast treatment (chapter dividers, proof "showcase" runs, the
gift reveal, the end card) against an otherwise light/neutral default — a
deliberate rhythm marking "we're changing gears," not a constant visual
intensity held for the whole runtime. Reserve the strongest visual register
for gear-changes and proof; constant intensity numbs.

**Illustration is reserved for the hardest concepts.** Budget custom
illustration (not a real screenshot) specifically for the slide or two that
rehearsal shows is the most abstract or confusing — decide which ones those
are from an actual rehearsal or read-through, not a guess made while
outlining.

## 8. Visual pattern table (required)

Fifteen pattern IDs, carried over from the giveaway skill's own component
library because the eval found the set itself to be genuinely good,
purpose-built craft — only the render-engine column is dropped, since v1 has
no render phase.

| Pattern ID | Use for |
|---|---|
| `hold` | Pre-show / title-only card, optional countdown to the real start time |
| `chapter` | Section-break interstitial carrying the belief-chain header |
| `standard` | One idea: eyebrow + headline + lede — the workhorse pattern |
| `split` | Media beside text (add a `reverse` note to flip sides); the default for a real photo or screenshot next to a claim |
| `chips` | 2-4 small icon/label pillars — the promise(s), and an explicit callback at Recap |
| `chat-beat` | A slide whose entire visual job is an audience prompt: a poll, a "type X," a trial-close question |
| `quote-proof` | 1-3 testimonial cards, verbatim and attributed — quote and name rendered larger than body text |
| `door-list` | The cost-of-alternatives comparison, always immediately pre-price |
| `stack-list` | A plain, unadorned numbered bonus or feature stack — no icons, no per-item price |
| `montage` | A grid of several real images at once, for volume rather than one-by-one reading (the proof wall) |
| `chart` | A data/trend visual or a step-flow diagram — used sparingly, only at high-leverage moments |
| `cta` | The final call to action: link, price, one line — nothing else |
| `prompt-card` | A literal, complete copy-paste script or prompt the audience can use immediately, outside the deck entirely |
| `live-switch` | A cue card for the moment right before a real live demo — always paired with a backup slide of the same demo, captured earlier, in case the live version fails |
| `money-echo` | The chapter-closing value-reframe card (see `cta-choreography.md`) — once per chapter, never a new idea |

**`chat-beat` versus the optional `CHAT BEAT:` field.** `chat-beat` is a
dedicated pattern for a slide whose entire job IS the prompt. For a smaller
prompt riding on a slide of a different pattern (a `standard` slide that
happens to end with "type YES if..."), use the optional `CHAT BEAT:` field
from Section 4 instead — engagement is a property that can attach to any
pattern, not a template of its own (`webinar-structure.md`, Section 3).

If a slide genuinely needs a layout none of these fifteen cover, say so
explicitly (`VISUAL: pattern: none — needs a new pattern: <description>`)
rather than force-fitting it into the nearest existing one. Note for a
future revision of this file: the mined canon's own grep of the finished,
later deck (not the giveaway skill's outline format) shows a sixteenth
pattern in real use there, a dedicated "what's inside" list style — left out
here to hold to exactly the 15-ID table the lead's ADAPT ruling named, with
`standard` covering that beat instead for now.

**A future render skill, if one ever gets built,** would map each pattern ID
to one reusable visual component — that mapping does not exist in this
version. When the owner asks for an actual built deck, say so plainly:
rendering is not this skill's v1 job.

## 9. Content rules

- **No fabricated stat, testimonial, or story detail.** Every number, quote,
  and story comes from `brain/proof/` (only `approval: approved`) or
  `brain/stories/`, as written. Missing a fact: `[PLACEHOLDER: what's
  missing]`, carried all the way through — never a guess dressed up as a
  fact.
- **DROP-IN beats CREATE FRESH when in doubt** (Section 5, above).
- **`brain/voice.md` governs word choice and formality on slides; the
  reading-grade ceiling in Section 6 is not negotiable by voice** — a
  technical, formal business still gets short, scannable on-slide lines; its
  formality shows up in word choice, not sentence length.
- **A CLAIM-CHECK is never left to resolve itself.** Surface every open
  CLAIM-CHECK in the SKILL.md hand-off summary, the same way an open
  `[PLACEHOLDER]` gets surfaced.
