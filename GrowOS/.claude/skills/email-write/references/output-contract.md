# Output contract

Everything this skill writes lands under `work/email/` — the one email bucket
(channel decision #4). There is no separate `newsletters/` or `sequences/`
folder. A single email is one file. A sequence is a round: a folder with a
`_brief.md` map plus one item per email.

## Single email (newsletter, promo-broadcast)

```text
work/email/<readable-slug>.md
```

One file, one item, no round folder. `<readable-slug>` is a short, lowercase,
hyphenated line from the headline — the same convention every GrowOS skill
uses (`system/standards/skill-standard.md`). If the target path already
exists, append `-2`, `-3`, and so on. Never overwrite an existing item.

## Sequence (welcome, nurture, launch, win-back, cart-abandon, trial-nurture)

```text
work/email/<round-slug>/
  _brief.md
  01-<slug>.md
  02-<slug>.md
  03-<slug>.md
  ...
```

`<round-slug>` names the sequence: `<type-short>-<descriptor>`, for example
`welcome-default`, `launch-spring-bootcamp`, `winback-2026-08`,
`cart-abandon-default`. Use `type-short` from: `welcome`, `nurture`,
`launch`, `winback`, `cart-abandon`, `trial-nurture`. If a round with that
slug already exists and this is genuinely a new round (not a redo), append
`-2`, `-3`.

Per-email files are numbered in send order: `01-<slug>.md`, `02-<slug>.md`,
and so on, where `<slug>` is a short descriptor of that email's job (`deliver
and intro`, `the story`, `handle the objection`). Numbers keep the folder
readable in send order; they are not a stamped field and nobody enforces
them — renumber by hand if the map changes.

`_brief.md` is the shared context: no status, never enters the review queue,
never gets stamped. This is where the sequence map lives — the arc, how many
emails, the job of each, the timing between them — written BEFORE any email
is drafted (see the SKILL.md walkthrough, Phase 2). Every item in the round
carries the same `project: <round-slug>` so the queue can group them.

### `_brief.md` template

```markdown
---
project: <round-slug>
skill: email-write
type: <welcome-seq | nurture-seq | launch-seq | winback-seq | cart-abandon-seq | trial-nurture-seq>
trigger: <what starts the sequence — signup, cart add, trial start, launch date, inactivity threshold>
audience: <persona from brain/audience.md>
goal: <what the reader should do or feel by the end>
---

# <Sequence name> — sequence map

## The arc
<2-4 sentences: the shape of the sequence and why this order earns each send>

## Emails
| # | Timing | Job | Angle | File |
|---|---|---|---|---|
| 1 | Immediately | Deliver + introduce | <one line> | 01-deliver-and-intro.md |
| 2 | Day 1-2 | Build trust | <one line> | 02-the-story.md |
...

## Notes
<open questions, risks carried forward, anything the owner should know before
approving the first email — never hidden reasoning, just what a human reading
this folder later would want to know>
```

Never invent a trigger, an audience size, or a timing window the business
has not stated. Mark it `[PLACEHOLDER: what is missing]` and keep going —
the map can ship with a placeholder; a fabricated one cannot.

## Email item frontmatter

```yaml
---
type: newsletter        # REQUIRED — one of the 8 values, see references/type-library.md
headline: "<queue title — plain, one line>"
skill: email-write
subject: "<the one chosen subject line>"
preview: "<the chosen preview text>"
project: <round-slug>    # sequences only — omit for a single email, UNLESS a campaign handoff asks you to carry its campaign slug: then set it, so the queue groups the campaign
source: "<idea slug from brain/ideas.md, source asset path, or 'adhoc'>"
---
```

`type` is always one of the eight values from `references/type-library.md`:
`newsletter`, `promo-broadcast`, `welcome-seq`, `nurture-seq`, `launch-seq`,
`winback-seq`, `cart-abandon-seq`, `trial-nurture-seq`. For a sequence, every
email in the round carries the SAME type value (the sequence's type), not a
per-email variant — the round as a whole is a `welcome-seq`; each email in
it is one beat of that one type.

`subject` and `preview` are required before an item reaches `review`. The
`publish` skill's email channel copies these two fields, and the body,
byte-for-byte at send time — a missing one means publish has to stop and
ask, so do not leave either blank going into the Editor gate.

`source` closes the loop with the idea bank (`content-ideas`'s "idea used"
contract): the exact idea line this email came from, a source brief or asset
path, or the literal word `adhoc` when nothing seeded it.

Everything else in `system/standards/item-model.md`'s core and optional
fields applies as normal — `id`, `status`, `business`, `channel`, `created`
are stamped by the system, never set by hand.

## The item body

After the frontmatter, write the email in a review-friendly shape so the
owner can see the choice, not just the winner:

```markdown
# <headline>

**Subject (chosen):** <subject>
**Also considered:** <the other subject options you drafted, separated by " · ">
**Preview text:** <preview>

---

<the full email body, exactly as it would be sent>
```

If the owner swaps the subject at review, update the `subject` frontmatter
field to match before the item moves to `approved` — the frontmatter is what
`publish` reads, not the "Also considered" line.

Mark an image the email needs but does not have with `[IMAGE: description]`
inline, in the body, at the point it belongs. If a real rendered image is
attached (produced by `image-create` or supplied by the owner), it is a part
of this item: put it in an underscore parts folder beside the item
(`01-deliver-and-intro.md` keeps its parts in `_01-deliver-and-intro/`) and
seal it into the item's frontmatter with its SHA-256 before the item goes to
`review`, per `system/standards/item-model.md`'s "Sealed assets". An
unsealed image in a parts folder is never published.

## Nothing produced is discarded silently

If an email in a round fails the deliverability preflight or the Editor gate
badly enough that it should not ship as drafted, say so by its file name and
reason in the handoff report rather than quietly dropping it from the round.
The owner decides what happens to a flagged email; this skill never deletes
one on its own judgment.
