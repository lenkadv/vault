# Report template

Everything this skill writes lands as ONE file, directly in `work/strategy/`
— no round folder, no `_brief.md`, no parts folder. There is nothing to
render or seal; the deliverable is the report itself.

This report is written straight to the owner, in plain, grade-8 words — not
in `brain/voice.md`'s outward voice for their audience. It is the one place
in the house where the marketing-copy voice rules do not apply, because
nothing in it is marketing copy.

## Where it lands

Weekly:

```text
work/strategy/weekly-report-<date>.md
```

`<date>` is the day this report was generated (today), `YYYY-MM-DD`.

Monthly:

```text
work/strategy/monthly-report-<month>.md
```

`<month>` is the calendar month being reported on, `YYYY-MM` — not the
generation date. A month is a stable label; a week is not, which is why the
two slugs date themselves differently.

Either way, if that exact path already exists — a second run today, or the
same month asked for twice — do not overwrite it. Append `-2`, `-3`, and so
on, the same rule `website-audit` uses for a re-audit. The owner may want to
compare the two.

## Frontmatter

Weekly:

```yaml
---
type: marketing-report
headline: "Weekly report — <period_start> to <period_end>"
skill: marketing-report
cadence: weekly
period_start: <YYYY-MM-DD>
period_end: <YYYY-MM-DD>
---
```

Monthly:

```yaml
---
type: marketing-report
headline: "Monthly report — <Month YYYY>"
skill: marketing-report
cadence: monthly
period_start: <YYYY-MM-DD>
period_end: <YYYY-MM-DD>
---
```

The system stamps `id`, `status`, `business`, `channel`, and `created` —
never set those by hand. `cadence`, `period_start`, and `period_end` follow
`website-audit`'s own precedent of a few small extra fields (its `score`,
`mode`, `url`) beyond the item model's base list, so the queue view can show
the period without opening the file. A custom range the owner named outright
(not a clean week or calendar month) still gets real, exact
`period_start`/`period_end` dates — file it under whichever of
`cadence: weekly` or `cadence: monthly` is the closer fit; never invent a
third value.

## The report body

```markdown
# <Headline — matches frontmatter>

<One plain sentence, built entirely from what Phases 2-4 actually found --
never a manufactured score or a red/amber/green band. Never fold `prepared`
and `live` items into one count without saying which is which. For example:
"Four things prepared this week and none live yet, two with real numbers
behind them; the ad account has not been checked since <date>.">

## Sources checked
| Source | Covers | Status |
|---|---|---|
| Receipts + logbook (`work/`, `.state/logbook.jsonl`) | what actually shipped | read |
| `setup.md` | which tools are connected | read |
| <named tool, if any> | performance numbers | connected — or: named, not reachable this session — or: none named |
| Pasted exports | performance numbers the owner supplied | <n> received — or: none this run |
| Latest `ads-meta-report` | ad performance | found, `<path>`, dated `<date>` — or: none on file |
| `brain/plan.md` | the goals this period is measured against | read — or: thin — or: missing |

## What ran
| Channel | What | State | Shipped | Source |
|---|---|---|---|---|
| <channel> | <headline, plain words> | <"live -- sent for real" when the item's `publish_state` is `live`; "prepared -- safe draft, paused, or private, not yet sent" when it is `prepared`> | <published_at date> | <publish_destination / publish_ref, or "manual, confirmed by the owner"> |

<A `prepared` row is a verified-safe draft, a paused ad, or a private upload
-- the owner still has to act before a customer sees it. Word it that way,
never as if it already reached one. Never fold `prepared` and `live` rows
into one number without saying which is which.>

<Nothing published in the window: say so in one plain line instead of an
empty table. A quiet period is a real finding, not a formatting problem.>

## What worked
- <a finding, each one citing its source inline — a connected tool, a
  pasted export, or a plain fact straight from the receipts (shipped on the
  day the plan's rhythm calls for, for instance)>

<No sourced wins this period: say that plainly. Never pad with something the
data does not support.>

## What didn't
- <a finding, same citation discipline as above — a number below where the
  owner wants it, sourced; a gap against the plan's rhythm, sourced; never
  an invented cause>

**Attempted, not shipped:**
- <any item whose receipt shows a real attempt in this window that has not
  reached `published` — name it, its `publish_state`, and its
  `publish_note` if it has one. Cut this whole subsection if there is
  nothing to list; do not write "none" as a placeholder line.>

## The ads picture
<Either: the verdict, headline numbers, and top action or two, copied from
the latest `ads-meta-report`, cited to its path and date — or, if none is
on file, the plain honest line: no `ads-meta-report` output exists yet for
this account; `ads-meta-report` is installed and ready (or is not installed
-- say which), offered here, never run from inside this report.>

## Against the plan
<Quote or closely summarize the relevant lines from `brain/plan.md`: the
90-day target, this month's themes, the focus channels, the weekly rhythm.
Say plainly where this period's activity matches what the plan called for,
and where it does not. Plan thin, missing, or still template: say that
once, and compare against whatever real lines exist.>

## 3 changes worth making
1. <a concrete, sourced change> — `<the GrowOS skill that would carry it
   out>` (or: manual — `<skill>` is not installed in this workspace yet)
2. <...>
3. <...>

<Fewer than three real, sourced changes is an honest outcome. Say plainly
that a thin period produced fewer than three, rather than padding the list
with something the data does not support.>

## What I could not see
<Every real gap, named plainly: a channel with no connected tool and no
pasted export, an ads-meta-report that does not exist yet, a thin
brain/plan.md, a stale ads report. Nothing missed this period — every
number had a real source: say that plainly too. A clean read is a normal
outcome, not a sign something was skipped.>

## Want a closer look?
<One line offering a `marketing-strategy` session on these findings — an
offer only, never opened automatically, never assumed.>
```

## Placeholders

Where a fact the report genuinely needs turns out missing mid-draft — most
likely a number the owner expected but never pasted — write
`[PLACEHOLDER: what's missing]` in the relevant line and keep going, per the
charter. In practice this should be rare outside "what I could not see":
Phases 2 through 4 gather everything the report needs before a single line
of the body gets written.
