# Brief template

The campaign brief is ONE work item: `work/strategy/<campaign-slug>.md`,
`type: campaign-brief`. Not a folder. Not an underscore `_brief.md`. This is
a deliberate difference from the round pattern other skills use - an email
sequence's folder, a social platform-variant set, an ad round - where a
status-less `_brief.md` holds shared context because every piece inside the
round still needs its own review. A campaign brief is the opposite: it is
itself the one thing the owner reviews and approves. Everything it produces
afterward is a SEPARATE item, in its own channel, made only on request (see
`SKILL.md`'s go protocol).

## Frontmatter

```yaml
---
type: campaign-brief
headline: "<campaign name, plain words - e.g. \"Spring sale - campaign brief\">"
skill: campaign-plan
campaign_type: launch | promo-sale | evergreen-push | webinar
project: <campaign-slug>
---
```

`<campaign-slug>` is a short, lowercase, hyphenated line naming the
campaign - the same slug convention every GrowOS skill uses
(`system/standards/skill-standard.md`). Use the exact same string in the
filename and in `project`. If the target path
already exists, append `-2`, `-3`.

`campaign_type` is the one value Phase 0 picked; it is not a system field,
just a plain record of the choice so the brief is self-explanatory later.

Every child asset this campaign produces carries this same `project` value
as its own, so the queue can group the whole campaign regardless of which
channel each piece landed in. The system stamps `id`, `status`, `business`,
`channel`, `created` - never set those by hand.

## Body

### 1. The campaign story

- **The goal.** The owner's own answer from the Phase 0 interview, first
  line of the section: what this campaign should actually do, in their
  words ("30 new subscribers"). This is the number or outcome the whole
  brief gets judged against - it lives here, at the top, never scattered
  or implied.
- **The angle.** One or two sentences: the honest, specific reason this
  matters right now, in the business's own words. Drawn from `voice.md`,
  `audience.md`, and `business.md` - never invented, never generic
  ("limited time only" is not an angle).
- **The message ladder.** An ordered list: what the reader has to believe,
  in order, before the ask makes sense. Start from what a total stranger
  believes today and end at "acting now is safe." A cheap, low-commitment
  offer might need three or four steps; a bigger or pricier ask usually
  needs more. Every belief is one plain line. This is the backbone the
  asset list gets sequenced against - an asset earns its place by moving
  exactly one belief forward.

```markdown
## The campaign story

**The angle:** <one or two sentences>

**The message ladder:**
1. <what the reader believes today, or does not know yet>
2. <the next belief>
3. ...
N. <the last belief - acting now is safe>
```

### 2. The timeline

A table, phases from `references/type-library.md` for the chosen type,
every date anchored on the real date(s) the owner gave in the interview.
Never a relative placeholder like "week 2" once real dates exist - do the
arithmetic and write the actual date.

```markdown
## The timeline

| Phase | Dates | What has to be true by the end |
|---|---|---|
| Runway | <real dates> | <from type-library, adjusted to this campaign> |
| Open | <real dates> | ... |
```

The phase names come from whichever shape the chosen type uses - the
five-phase arc's names for `launch` and `promo-sale`, or `webinar`'s own
Registration / Show-up / Replay-close. `evergreen-push` has no phases in
this sense; its timeline states the rotation cadence and the next review
date instead of a phase table.

If the type calls for a phase this campaign is skipping (a promo-sale with
no runway, for instance), leave the phase out of the table entirely rather
than filling a row with "N/A" - a row that is not there is clearer than a
row that says nothing.

If a close date or cap the type needs has not been given yet, write
`[PLACEHOLDER: real close date]` in that cell and carry it into section 5.
Never invent one to make the table look finished.

### 3. The channel plan

Only channels this business actually uses - from the interview and
`brain/plan.md`'s focus channels. Never add a channel because campaigns
usually include it.

```markdown
## The channel plan

| Channel | Role in this campaign | Why |
|---|---|---|
| Email | Carries the argument - the message ladder climbs here | <plan.md's stated reason, or the interview> |
| <channel> | <role> | <why> |
```

Start from `references/type-library.md`'s channel-role defaults for the
chosen type, then adjust the ROLE to what this business's own channels can
actually carry - a business with no ad account has no ads row, whatever
the type library's default menu suggests.

### 4. The asset list

One table. Every row is one asset, one job, one channel, one skill, one
date, one effort estimate.

```markdown
## The asset list

| # | Asset | Channel | Skill | Phase / Date | Effort | The belief it moves |
|---|---|---|---|---|---|---|
| 1 | <one line naming the asset> | email | email-write | Runway - <date> | S | <one line - the single belief this moves> |
| 2 | ... | | | | | |
```

The Phase / Date column takes whatever the chosen type calls its phases (a
phase name plus the real date), or for `evergreen-push`, a cycle number
plus the real review date.

**Effort (S/M/L) is for the OWNER, not the AI** - how much of the owner's
own time this asset costs once it reaches them:

- **S** - a quick read and approve. A couple of minutes.
- **M** - real attention: a genuine review, a short recording, a small
  decision to make.
- **L** - a real chunk of the owner's time: on camera for a while, a live
  session, a big approval decision with real consequences either way.

**One job per row.** If a row is quietly doing two jobs ("states the price
AND handles the objection"), split it into two rows or cut one job. A row
that cannot be summed up as moving ONE belief is a sign the row is really
two.

**Story assignment.** Directly under the table, list which
`brain/stories/` entry, if any, is assigned to which row. A story assigned
to one row never appears again on another row in this same brief - if the
honest story bank is thin, say so and leave rows without one rather than
reusing what is already spoken for.

```markdown
**Stories assigned:** Row 3 -> <story file>. Row 7 -> <story file>. No
story used twice in this brief.
```

Proof quotes from `brain/proof/` are different from stories: the same
quote is allowed to appear on more than one row - a strong testimonial can
carry real weight in two places - but a story, a real dated thing that
happened, is used once. Note which proof entries are in play the same way,
if it matters for a specific row.

### 5. What we still need from the owner

Everything still open. Never silently drop this section from a
"complete" brief - if it is genuinely empty, say so in one line rather
than omitting the section.

```markdown
## What we still need from the owner

- [PLACEHOLDER: a real close date, cap, or other fact the timeline or asset
  list needed but does not have yet]
- [PLACEHOLDER: proof or a story the asset list could use but brain/proof/
  or brain/stories/ does not have yet]
- <any other open question the brief surfaced but cannot answer alone>
```

## Real-scarcity-only, restated

A deadline or a cap in the timeline or the asset list must be a fact the
owner actually stated - a real end date, a real seat or unit cap, a real
reason (the owner said so, or `business.md`/`plan.md` already states it).
If nothing like that exists for this campaign, the cart/close phase does
not get invented to fill a template. Say so, and either run the campaign
open-ended and honest about it, or flag that `evergreen-push` may be the
more honest type for this one.

## What the brief is not

It carries no copy. Not a subject line, not a hook, not an ad headline -
just the one-line JOB each asset has to do. Writing the actual words is
every child skill's job, done fresh, with its own brain read and its own
Editor gate, at the moment the owner says go.
