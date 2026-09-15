# Craft — the notation, headlines, and the friction check

`references/type-library.md` gives the structure: which type, which arc,
which sections in what order. This file is everything that happens inside
and around that structure, in the order the skill actually uses it: the
notation that carries design direction alongside the copy, how to
generate and judge a headline, the walk that catches friction before the
Editor gate does, and what a builder receives at the end of it all.

## 1. The design-direction notation

Write this alongside each section's copy, not as a separate pass at the
end — the two decisions inform each other. Every section carries exactly
this shape:

```
## Section <n>: <name>
**Headline:** ...
**Body:**
<full copy>
**Addresses objection:** <which one, or "structural — none">
**Visual:** <one item from the closed list below>
**Weight:** anchor | standard
**Layout notes:** <plain words: column count, light or dark, ordering — never CSS, never a hex code>
[IMAGE: <concrete description>]
```

`[IMAGE:]` is inline in the body, zero or more per section, at the exact
point a real photo or render belongs — not every section needs one.

### The closed Visual vocabulary

Pick one per section. This list is closed on purpose — a build step reads
these as a fixed vocabulary, not free text:

- `hero-dark` — the fixed dark, high-contrast hero pattern; the one
  section that skips variation entirely.
- `card grid` — a grid of cards: features, paths, benefits, personas.
- `contrast table` — old-way/new-way or before/after, side by side.
- `testimonial cards` — a set of short quote cards, one voice each.
- `pull-quote` — one quote, large, centered.
- `case study block` — one deep, named transformation story (starting
  point, what was built, the result) — not a short quote.
- `value-stack visual` — the offer's contents itemized, building to a
  total.
- `qualifier columns` — two columns: for-you-if / not-for-you-if.
- `timeline` — sequential steps, or a story's beats, as connected points.
- `stat row` — a row of real, sourced numbers.
- `avatar + proof strip` — a small avatar row plus one line of real social
  proof.
- `product-in-action mock` — a mock or screenshot-style visual showing the
  product or the work actually doing its thing.
- `logo bar` — a row of real client or press logos.
- `FAQ accordion` — the FAQ block's own visual shape.
- `path router` — a small set of routing cards, each pointing at a
  different persona's next step.
- `plain text` — no special visual treatment; the copy carries the
  section alone.

### Weight

`anchor` marks a genuine emotional pivot: the hero, the differentiator or
mechanism reveal, the offer moment, the decision or close. Most sections
are `standard`. Marking everything `anchor` defeats the tag — it exists so
a build step knows where to spend its strongest, most differentiated
treatment, and that only works if most of the page is quieter than that.

### Brand fit

Design direction follows `brain/brand.md` — colors, fonts, image style,
and what to avoid — the same way the copy follows `voice.md`. Layout
notes never contradict the brand to chase a trend. If `brand.md` is still
a placeholder, write direction conservatively and say so once rather than
inventing a look.

## 2. Headline craft

Never ship the first idea, and never ship an unscored one. Generate wide,
score on a real rubric, present a short list, let the owner pick or mix.

### Generate roughly 9, across genuinely different angles

One headline per angle below — not nine variations on the same idea:

- **Outcome** — the plain result, stated for the reader, no mechanism yet.
- **Mechanism** — names the system or method.
- **Problem** — opens on the pain, not the fix.
- **Curiosity** — the question the reader hadn't thought to ask.
- **Proof** — leads with a real number or result.
- **Minimalist** — as few words as possible, maximum confidence.
- **Contrast** — the old way against the new way, in one line.
- **Desire/relief** — the feeling on the other side, not the mechanics.
- **Identity/challenge** — who the reader is, or refuses to be; a direct
  bet or risk-reversal works well here.

Two generation habits worth holding onto regardless of angle:

- **Show then name.** Don't name the product or offer until you've
  demonstrated what it produces. Outcome first, name second — the reader
  should feel "I want that" before learning what "that" is called.
- **The reveal callback.** When the name does land, callback to something
  the reader just experienced on the page ("That [result they just saw]?
  That's [name].") rather than a flat "Introducing [name]."

### Score every candidate on the rubric

| Criterion | What it asks |
|---|---|
| Clarity | Would a stranger understand what this offers in one read? |
| Specificity | Is it concrete, or could it be true of almost anything? |
| Emotional pull | Does it make the reader feel something, not just inform? |
| Differentiation | Could this sit unchanged on a competitor's page? |
| Voice match | Does it sound like this business, per `voice.md`? |

Score each 1-10 per criterion, sum to a total out of 50.

**The fail bar, applied before scoring — not a sixth criterion, a filter:**
a headline that could sit unchanged on another business's page fails,
whatever it scores elsewhere. So does a headline whose subject is the
product or the technology instead of the reader's own change or result.
Drop these or floor their differentiation score; don't let raw total carry
a genuinely generic line into the top 5.

**Never reuse a headline.** Check the last few items in `work/pages/` (any
status) and `brain/samples/` before finalizing the list — a new page earns
its own headline, never a prior page's hero or shortlist verbatim.

### Present the top 5, save all 9

Show the top 5 in the chat reply, each with the angle and a one-line why:

```
**1. [Headline] — [Angle]**
[Sub-headline, if the arc's hero uses one]
Why: <one line — which criteria it wins on>
```

Save the complete scored table — all candidates, not just the top 5 — to
the parts folder as `_<slug>/headlines.md`:

```markdown
# Headlines — <slug>

| # | Headline | Angle | Clarity | Specificity | Emotional pull | Differentiation | Voice match | Total |
|---|---|---|---|---|---|---|---|---|
| 1 | ... | Outcome | . | . | . | . | . | .. |
| 2 | ... | Mechanism | . | . | . | . | . | .. |
...

## Top 5 (presented to the owner)
1. ... — why
2. ... — why
...
```

Ship the draft with the top scorer already in place. Flag the pick as the
one live decision at hand-off (SKILL.md Phase 8) — the owner can swap it
for another option, or mix two, without asking for a re-draft. If they
swap it, update the item's body and its `headline` frontmatter field to
match.

## 3. The friction self-check (run before the Editor gate)

A required walk, not an optional pass — catching these yourself here means
the Editor gate finds less. Six checks, in order:

1. **Clarity above the fold** — by the end of the first third of the page,
   does a reader know what this is, who it's for, one proof point, and the
   price or the CTA action? If any is missing, restructure — don't just
   add a line near the top.
2. **One action** — does the whole page point at exactly one primary
   action? A page arguing for two different next steps splits the
   reader's decision and weakens both.
3. **Proof near claims** — does every claim strong enough to invite doubt
   sit near a real proof element (a number, a quote, a result), rather
   than floating alone?
4. **Objection coverage** — does every objection named in
   `brain/audience.md` have a home somewhere on the page? A gap gets copy
   added to the most relevant existing section, not a bolted-on paragraph
   at the end.
5. **CTA rhythm** — does a CTA land roughly every 2-3 sections, not just
   once at the top and once at the bottom?
6. **Mobile-order sanity** — read only the subheads, top to bottom (the
   skimmable-story test): do the problem, the solution, and the outcome
   come through from subheads alone, and would a skimmer want to act? And:
   how many thumb-flicks does it take to reach the primary action on
   mobile — it should be few, not deep.

Two supplementary checks worth a line each: no section runs past roughly
120 words without a visual or proof break, and no single testimonial is
reused more than twice on one page. And the honesty check underneath all
of them: every number is real and sourced, or it's a flagged
`[PLACEHOLDER]`; no fake countdown, no invented scarcity, and no stray
em-dash or hashtag left in the body copy — those read as unedited, not as
a deliberate choice.

Report format:

```text
FRICTION SELF-CHECK

CLARITY ABOVE THE FOLD — [pass/fix] <one line>
ONE ACTION             — [pass/fix] <one line>
PROOF NEAR CLAIMS      — [pass/fix] <one line>
OBJECTION COVERAGE     — [pass/fix] <one line>
CTA RHYTHM             — [pass/fix] <one line>
MOBILE-ORDER SANITY    — [pass/fix] <one line>

Fixed automatically:
- <what changed and why, one line each>

Flagged for the owner:
- <what needs their judgment and why, one line each>
```

**This walk builds three roll-ups as a side effect — keep them, they are
also what a builder reads first:**

- **Skimmable Story** — every subhead in the page, in order. Check 6
  already extracted this list; keep it rather than discarding it.
- **CTA Map** — a table of position → CTA text → the reader's state at
  that point. Check 5 already counted this; write it down as the table.
- **Objection Coverage** — a table of objection (from `brain/audience.md`)
  → the section that handles it. Check 4 already built this map.

Append all three to the bottom of the item before it goes to the Editor
gate.

## 4. What a builder gets

This skill's whole output is written so a builder — a person, or a future
GrowOS build skill — can act without re-reading anything else. The
finished item carries: frontmatter naming the type and the arc chosen; the
chosen headline plus a pointer to `_<slug>/headlines.md` for the rest; the
one action the page exists to cause; every section in the notation above,
in order; and the three roll-ups from the friction self-check (Skimmable
Story, CTA Map, Objection Coverage). That is deliberately everything a
builder needs and nothing more — no HTML, no component code, no color
tokens beyond what `brand.md` already states in words. Building the real
page is the next step, not this one.
