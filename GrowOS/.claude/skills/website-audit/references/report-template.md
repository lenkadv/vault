# Report template

Everything this skill writes lands as ONE file, directly in `work/strategy/`
— no round folder, no `_brief.md`, no parts folder. There is nothing to
render or seal; the deliverable is the report itself.

## Where it lands

```text
work/strategy/website-audit-<domain-slug>.md
```

`<domain-slug>` is the audited site's hostname, lowercase, dots turned to
hyphens (`example.com` -> `example-com`). Competitor mode prefixes it:
`website-audit-competitor-<domain-slug>`. If that path already exists —
this is a re-audit, not the first one — append `-2`, `-3`, and so on. Never
overwrite an earlier audit; the owner may want to compare the two.

## Frontmatter

Own site:

```yaml
---
type: website-audit
headline: "Our site audit — <NN>/100"
skill: website-audit
url: "<the exact home-page URL audited>"
mode: own-site
score: <NN>
---
```

Competitor — adds `competitor`, and `mode` changes:

```yaml
---
type: website-audit
headline: "Competitor audit — <competitor name> — <NN>/100"
skill: website-audit
url: "<the exact home-page URL audited>"
mode: competitor
competitor: "<name, from brain/competitors.md or as the owner named it>"
score: <NN>
---
```

The system stamps `id`, `status`, `business`, `channel`, `created` — never
set those by hand. `score` mirrors the one overall number from Phase 3 so
the queue view can show it without opening the file; it is never a second,
different number from the one in the body.

## The report body

```markdown
# <Headline — matches frontmatter>

**<NN>/100** — <one plain sentence: what this score means for the owner
right now, not a category label>

**Site:** <own site | a competitor's site — say plainly whose site this is>

## Coverage
| Page | URL | Read |
|---|---|---|
| Home | <url> | yes |
| Offer / product | <url> | yes |
| About | <url> | yes — or: failed — <reason, e.g. "404"> |
| Content page | <url> | yes |
| <any owner-named page> | <url> | yes |

Read on <date>. <One line on any coverage gap and what it thinned out —
e.g. "The about page 404'd, so Trust below leans on the home and product
pages only.">

This audit reads pages, not traffic or rankings: no visit counts, no search
position, no page-speed measurement, no site-wide crawl. Anything below
that a page read genuinely cannot show is named as a gap, not guessed.

## 1. Content — <strong | solid | shaky | weak | not gradable>
- "<exact quote>" — <what it means, one line>
- <a concretely observed element> — <what it means, one line>

## 2. SEO — <grade>
- ...

## 3. Conversion — <grade>
- ...

## 4. Trust — <grade>
- ...

## 5. UX — <grade>
- ...

## 6. Brand — <grade>
- ...

A dimension graded `not gradable` skips the quote/observed-element
bullets — write one line saying why (e.g. "every criterion here needed
the about page, and it never loaded") and point back to the Coverage
section for detail. Its weight is dropped from the overall number per
`references/rubric.md`'s renormalize rule; say so in the Coverage section.

## Top 10 fixes
<Own site only — see the competitor variant below>

| # | Fix | Why it matters | Effort | Takes it |
|---|---|---|---|---|
| 1 | <fix> | <one line> | quick | `landing-page-write` |
| 2 | <fix> | <one line> | moderate | manual |
...

## What this skill couldn't check
<Anything skipped: an unreadable page, a not-observable criterion that
mattered here, a thin brain file. If nothing was skipped, say that plainly
too — a clean coverage read is a normal outcome.>
```

`Effort` is one of `quick`, `moderate`, `build`. `Takes it` names an
installed GrowOS skill (checked at the time of writing against the
workspace's skill folders — `.claude/skills/`, or `.agents/skills/` on the
Codex runtime — per SKILL.md Phase 4) or the word `manual` — never a skill
name that isn't actually installed in this workspace.

## The competitor variant of the fix section

Swap the "Top 10 fixes" section for this one. Everything else in the body —
headline, coverage, the six dimension sections — stays the same shape,
scoring the competitor's site with the same rubric:

```markdown
## What this tells us about our site
| # | What we saw on their site | What it means for ours | Evidence |
|---|---|---|---|
| 1 | <observation> | <the takeaway for our own site> | "<quote>" |
...
```

No `Effort` column, no `Takes it` column, no skill handoffs — this section
is about our own site's next move, not a fix list for a site the business
does not own. If a takeaway is worth acting on, say so in plain words inside
the "what it means for ours" cell; naming the actual GrowOS skill to do that
work is a separate, later conversation, not something this table generates.

## Placeholders

If something the report genuinely needs turns out to be missing — most
likely a competitor with no recorded facts in `brain/competitors.md` — write
`[PLACEHOLDER: what's missing]` in the relevant line and keep going, per the
charter. In practice this is rare: Phase 0 asks the owner for anything the
report cannot run without before any fetching starts.
