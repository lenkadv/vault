# Angle bank: schema and ranking

How `angles.md` and `voc.md` are structured, and how to rank what goes into them. Read this when
mode 2 (angle mining) starts, or whenever either file needs to be created from scratch.

## What counts as an angle

An angle is the buyer motivation underneath a headline, not the headline itself. "Get your evenings
back" and "Stop working past dinner" can be the same angle (time reclaimed from the business) written
two ways. Cluster by the underlying tension or promise, then let individual headlines and hooks be
variations produced later, at ad-writing time, not at research time.

A good test: if two pieces of buyer language would make you write structurally different ads (a
different promise, a different proof, a different objection to answer), they're different angles. If
they'd produce the same ad with different words, they're the same angle.

## `angles.md` schema

Frontmatter:

```yaml
---
name: angles
description: Ranked bank of marketing angles, each backed by verbatim buyer quotes.
owner: "ads-meta-research (writes and appends); ads-meta-create reads before drafting"
updated: YYYY-MM-DD
---
```

One entry per angle, newest additions at the bottom of their section (or grouped however the file
already organizes them; don't reorder existing entries just to tidy the file):

```markdown
### <Angle name>

- audience segment: <persona or segment name, or "general" if it applies broadly>
- awareness stage: unaware | problem-aware | solution-aware | product-aware | most-aware
- the promise: <one line: what changes or what relief this angle offers>
- evidence:
  - "<verbatim quote>" | src: <type> | source: <where, anonymized> | found: YYYY-MM-DD
  - "<verbatim quote>" | src: <type> | source: <where, anonymized> | found: YYYY-MM-DD
- status: untried | testing | proven | burned
- rank score: <see rubric below>
- notes: <optional, one line>
```

Every entry needs 2 or more evidence quotes before it counts as a real angle. Fewer than that, park
it in `voc.md` under its natural section and revisit once more evidence shows up, rather than
inflating a thin cluster into a full entry.

A competitor's ad copy, however strong or long-running, is never itself an evidence quote: it's
their marketing, not a buyer's own words. A teardown can corroborate an angle that already has real
buyer evidence (note it, dated, in that entry) and can point at a candidate worth chasing, but it
can't be the thing that gets a new entry past the 2-quote bar on its own.

### Status field: who's allowed to set what

This skill only researches. It never sees how an angle performs in a live ad, so it only ever writes
`status: untried` on a brand-new entry. If a later run finds more evidence for an angle that's
already in the file, append the new quotes and leave the existing status untouched. Moving an angle
to `testing`, `proven`, or `burned` is a job for whatever skill drafts and runs the actual ads; don't
guess at that transition from research alone, even if a competitor's long-running ad seems to confirm
the angle works. That confirms the angle is worth testing, not that it's proven.

Burned angles stay in the file. Deleting a burned entry throws away the reason not to repeat a
mistake; keep it, ranked last, as a record.

## `voc.md` schema

Frontmatter:

```yaml
---
name: voc
description: Raw voice-of-customer language, mined so angles are built FROM real words.
owner: "ads-meta-research (appends)"
sources-allowed: "public reviews, forums, articles, the business's own approved testimonials and support messages"
updated: YYYY-MM-DD
---
```

Sections, in this order (create the ones that have content; write "None yet" under an empty one
rather than skipping it):

- **Trigger events**: the moment that created the need. What was happening right before they went
  looking for a solution.
- **Past-tense "I" statements**: first-person before-state language. The richest section; weight
  gathering effort here.
- **Objections and skepticism**: reasons a real buyer hesitates, specific to this business's offer
  and price point.
- **Identity phrases**: how buyers describe themselves, useful as the "you" in a hook.
- **Language patterns**: words and phrases they actually use (mirror these) vs. jargon they'd never
  say (avoid it, it breaks trust even if it's accurate).

Entry format, one line each:

```
- "<verbatim phrase>" | src: <type> | tags: <tag1, tag2> | found: YYYY-MM-DD
```

Source types: `review` (public review site), `forum` (Reddit, Indie Hackers, industry forums),
`article` (published piece quoting a buyer), `social` (public post), `testimonial` (the business's
own approved proof, before-state portion only), `support` (a support ticket or message, anonymized).

## Anonymization, every time

Strip names, handles, company names, URLs, and any locating detail (a niche plus a country plus a
role can fingerprint one person even without a name) before a quote goes into either file. Keep the
phrase, drop the identity. This applies even to the business's own testimonials and support messages;
`angles.md` and `voc.md` are pattern-language files, not attribution records.

A verbatim quote used as an attributed testimonial inside an actual ad is a different thing entirely
and needs its own consent trail whenever the business already has one. These two files never grant
that permission on their own; they only supply inspiration for how to phrase a promise or objection.

## Ranking rubric

Score each angle 0 to 3 on four factors, sum for a rank score out of 12:

- **Source count** (0-3): how many separate evidence quotes support it, capped so one prolific
  source can't dominate. 2 quotes = 1, 3-4 = 2, 5+ = 3.
- **Source diversity** (0-3): how many different source types or independent people the quotes come
  from. All from one person or one thread = 0-1. A mix of testimonial, forum, and review language
  saying the same thing = 3.
- **Specificity** (0-3): vague general pain scores low; a concrete, detailed before-state scores
  high. "I was overwhelmed" is a 1. "I was on the verge of hiring someone just to keep up" is a 3.
- **Breadth** (0-3): how many audience segments or personas the angle shows up for. One narrow
  segment = 1. Shows up across most of the business's audience = 3.

`status: burned` entries rank last regardless of score; sort everything else by score, highest
first. When two angles tie, prefer the one with the most recent evidence (`found` date).

## Worked example (fictional)

For The Steady Coach, an online coaching business, three anonymized quotes cluster around the same
tension:

- "I have six courses I never finished." (review)
- "I don't need more information, I need something that actually does the work." (forum)
- "I'm not looking for another framework, I'm looking for someone to just tell me what to do next."
  (testimonial)

That's an angle: **done-not-taught** (audience already knows enough; what's missing is execution,
not knowledge), problem-aware, 3 quotes across 3 source types, specific, and if it shows up for more
than one persona, high breadth too. Score: source count 1, diversity 3, specificity 3, breadth
depends on segment spread. Rank near the top of a fresh bank; status `untried` until an ad tests it.
