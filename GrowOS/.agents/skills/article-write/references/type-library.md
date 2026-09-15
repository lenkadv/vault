# Type library

Five types cover every article this skill writes. Each one gets exactly
one section skeleton — unlike a landing page, an article's types are
already different enough in job and shape that no single type needs a
second arc to choose between. Pick the type the topic actually is, not
the one that is fastest to write.

This file is the operational half: which `type` value to stamp, which
brain files matter most, the section skeleton, a rough length band, and
2-3 craft rules specific to that type. General drafting craft — voice,
proof, placeholders, hooks, the Editor gate — lives in `SKILL.md` and is
not repeated here.

## Picking a type

| The article is... | Reach for | `type` value |
|---|---|---|
| A deep, comprehensive resource on one topic | Guide | `guide` |
| A specific process with a clear start and finish | How-to | `how-to` |
| A themed set of discrete, comparable items | Listicle | `listicle` |
| The business's own stance on a debate or trend | Opinion | `opinion` |
| Two named options, helping the reader choose | Comparison | `comparison` |

If the owner's words don't obviously map to one row, ask once rather than
guessing — a wrong type wastes more time than one question.

---

## 1. Guide — `type: guide`

Read: `brain/methodology.md` (the steps and named ideas that make this
the business's own definitive take, not generic advice),
`brain/audience.md` (the real questions this persona has about the
topic), `brain/research/`, `brain/proof/`.

**Job.** The cornerstone piece — everything a reader needs to actually
understand a broad topic, in one place, well enough that they do not need
to go looking elsewhere.

**Pick this when** the topic is broad enough to need real depth, and the
goal is to become the reference this audience keeps coming back to — not
to walk them through one narrow task (that's how-to) or rank a set of
items (that's listicle).

**Shape.** Open naming the problem or the topic's real stakes, and what
the guide covers → why this matters now, briefly (skip if the hook
already carried it) → the body sections, one per sub-topic, ordered the
way the reader actually needs to learn them (foundational first, unless
the audience already has the basics — say which you assumed) → a section
on the mistakes or misconceptions that trip this audience up
specifically → a short recap that actually recaps, not just restates the
intro → one clear next step.

**Length band.** Long — roughly 1,800 to 3,000 words is the usual range
for a topic that earns a guide at all. A starting shape, not a quota: a
guide that only needs 900 words to say everything true about it is
probably a how-to or a listicle wearing a guide's title — say so rather
than padding to hit a number.

**Craft rules.**
- Each subhead should work as a standalone answer — someone scanning just
  the headings, or an AI engine reading just one section, should get a
  real answer, not a teaser for the paragraph below it.
- Depth where it matters, not depth everywhere: go deep on the two or
  three sub-topics this audience actually struggles with; thin coverage
  of an easy part is honest, not lazy.
- Every section earns its place by answering something from Phase 3's
  question set — a section answering nothing on that list is probably
  padding.

---

## 2. How-to — `type: how-to`

Read: `brain/methodology.md` (the actual steps, in the order this
business really does them — not a generic version of the process),
`brain/audience.md` (what they already know, so the steps start at the
right place).

**Job.** Get the reader from "I don't know how" to "I did it" — one
process, one outcome, steps in the order they actually happen.

**Pick this when** the reader needs to DO something specific, with a
clear start and a clear finish — not understand a broad topic (guide) or
decide between options (comparison).

**Shape.** Open naming the outcome and who this is for → what you need
before starting (tools, access, a prerequisite skill — only what's real)
→ the steps, numbered, in the actual order → each step: what to do, why
it matters, the mistake people actually make there → what "done" looks
like, concretely, so the reader can check their own work → a short
troubleshooting or "if this happens" close for the one or two places it
commonly goes wrong.

**Length band.** Medium — usually 900 to 1,800 words, scaled to how many
real steps there are. Word count follows the process; do not stretch a
five-step process to hit a length target.

**Craft rules.**
- One action per step. A step that says "do X, then Y, then check Z" is
  three steps wearing one number.
- Steps in the order the reader actually does them, checked against
  `methodology.md` if this is how the business does it themselves — never
  a plausible-sounding order guessed from general knowledge of the
  category.
- Show what success looks like early, not only at the very end, so a
  reader can tell mid-process whether they're still on track.

---

## 3. Listicle — `type: listicle`

Read: `brain/audience.md` (the real pain or question the list answers —
the theme that makes these items belong together), `brain/proof/` and
`brain/research/` (when items are examples, results, or tools rather
than pure advice).

**Job.** A themed set of discrete, comparable items — tips, tools,
mistakes, examples — that stand alone and add up to one promise.

**Pick this when** the content is naturally a set of parallel items
rather than one sequential process (how-to) or one continuous argument
(guide, opinion).

**Shape.** Open with the promise and the count → one short line on why
these particular items, and how they're ordered (priority, difficulty,
chronology — say which) → the items, each with a real subhead (not just
a number) and enough substance to stand alone, roughly a paragraph or two
each → a short close naming where to actually start, not just a restated
list.

**Length band.** Medium, and it scales with the count — figure roughly
100 to 250 words per item, plus the open and close. A ten-item list at 80
words an item is a collection of labels, not a listicle.

**Craft rules.**
- Every item earns its slot. Cut a weak ninth item rather than padding to
  a round number of ten.
- Vary each item's length and opening move — identically shaped items in
  a row is the clearest AI tell this format has.
- State the ordering logic in the opening line. An unexplained order
  reads as random, even when it wasn't.

---

## 4. Opinion — `type: opinion`

Read: `brain/methodology.md` (the real belief or reasoning behind the
stance), `brain/stories/` and the Phase 3 interview when one happened (a
stance lands harder with a real example behind it), `brain/audience.md`
(the strongest real objection to steelman).

**Job.** The business's own point of view on something genuinely
contested in their space — not a summary of both sides, an actual
position.

**Pick this when** the business has a real, differentiated take worth
putting a flag in the ground on. This is the type most likely to use the
Phase 3 opt-in interview, because a borrowed opinion reads as hollow no
matter how well it's written.

**Shape.** State the stance plainly in the opening — no hedging, no
"there are many views on this" → the conventional wisdom this pushes
against, described fairly → the real reasoning behind the stance
(methodology, experience, a story) → the strongest counterargument, taken
seriously, then answered → what this actually means for the reader's own
decision.

**Length band.** Medium — usually 800 to 1,400 words. An opinion piece
carries one argument, not full topic coverage, so it should read tighter
than a guide on the same subject.

**Craft rules.**
- The stance appears in the first hundred words. Burying the take is the
  one mistake that breaks this whole type.
- Steelman before rebutting — skipping the honest version of the other
  side reads as a strawman and costs more trust than it saves words.
- The stance has to trace to something real: methodology, a genuine
  result, an actual story. A contrarian take manufactured to be spicy is
  fabrication with extra steps.

---

## 5. Comparison — `type: comparison`

Read: `brain/competitors.md` (the other option's real promise, never a
guess at it), `brain/business.md` (this offer, exactly as priced and
packaged), `brain/audience.md` (what they're actually weighing when they
decide).

**Job.** Help a reader who is actively choosing between two named
things — this business's approach and one alternative, or two approaches
in general — make the right call for their own situation.

**Pick this when** the audience is genuinely deciding, not just
learning. Often later-stage than a guide or a how-to.

**Shape.** Open naming both options and what's actually at stake in
picking wrong → a short verdict up front, for the reader who only reads
the first screen → the same criteria, applied to both sides, one at a
time (never more depth on one side than the other) → "who should pick
which" — real segmentation, not "it depends on you" → the final
recommendation, restated plainly.

**Length band.** Medium to long — usually 1,200 to 2,000 words, enough
room to give both sides genuinely equal treatment across every
criterion.

**Craft rules.**
- Same criteria, same depth, both sides. Lopsided treatment reads as
  biased even where the bias happens to be earned.
- A competitor's features, pricing, or claims come only from
  `brain/competitors.md` and whatever Phase 2 actually verified — never
  invented, never assumed current.
- Lead with the verdict. A reader comparing two things wants the answer
  before the argument — the opposite order from a guide, which builds
  toward one.

---

## Where this comes from

0.1's `article-write` had no type split at all — one flow for every
article, with a single implicit shape (hook, body sections, conclusion)
and a fixed interview-then-outline-approval sequence. The five section
skeletons above are new, house-designed v1: there is no mined precedent
for a guide's shape as distinct from a how-to's, or a comparison's as
distinct from a listicle's. What IS mined from 0.1, into the discipline
every type shares (`SKILL.md` Phase 4): interviewing for real stories
rather than inventing them, plain language over generic marketing
phrasing, varied sentence rhythm, and a mandatory pass through the Editor
gate before anything ships. 0.1's outline-approval gate — a hard stop
before drafting — is deliberately not carried forward; the owner's call
for V2 is speed by default (`SKILL.md` Phase 3).
