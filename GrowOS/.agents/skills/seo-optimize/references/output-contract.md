# Output contract

Phase 0 decides which of three deliverable shapes this run produces. This
document governs the exact shape of each one.

## Which output, which mode

| Target | Status | Deliverable |
|---|---|---|
| GrowOS item | `draft` or `changes` | Revision, same file, in place |
| GrowOS item | `review` | Nothing — stop, ask (`SKILL.md` Phase 0) |
| GrowOS item | `approved` or `published` | Revision, NEW `<slug>-seo.md` item |
| Live-site URL | no item exists | `seo-report`, in `work/strategy/` |

## The status-walk ruling

This is the rule Phase 0 applies, in full — it is not softened or
reopened by anything below:

- **Target item at `draft` or `changes`:** revise IN PLACE — it is the
  working draft. Run the Editor gate again, and walk the legal statuses
  as usual.
- **Target item at `review`:** do not touch it. Say plainly: the owner
  either asks for changes (moving it to `changes` puts it back in your
  hands) or approves it first — their call, made in chat.
- **Target item `approved` or `published`:** never touch those bytes —
  approval froze them. Create a NEW item `<original-slug>-seo.md` in the
  SAME channel folder, `type` matching the original, body opening with
  one line naming the original item's id it revises. The new item walks
  its own draft -> review path.
- **External URL:** the change list is a `work/strategy/` item, type
  `seo-report`.

## Mode A and B: the revision

The same shape whether you're editing in place (Mode A) or writing the
new `<original-slug>-seo.md` item (Mode B). The only differences are the
filename and one opening body line.

### Frontmatter

This skill doesn't invent a new frontmatter contract for pages or
articles — that shape belongs to whichever skill creates them
(`landing-page-write`, `article-write`). It changes nothing about the
original's fields beyond what Phase 4 actually edits.

- **Mode A (in place):** every field is already there. Touch only what
  the pass actually changes — usually nothing in the frontmatter at all,
  since headings and copy live in the body.
- **Mode B (new item):** the system stamps `id`, `status`, `business`,
  `channel`, `created` as normal, never set by hand. Set `type` to match
  the original exactly, and `skill: seo-optimize`. `headline` follows the
  original unless the revision genuinely changes what the page is called.

### Body shape

Two parts, clearly separated, because checklist items 1-4 are real edits
to the page's own copy and items 5-7 are metadata that was never part of
the visible page:

```markdown
[Mode B only, as the very first line: "Revises <original item id>."]

<the page or article body, edited in place — the actual headings,
sections, and copy a reader would see, carrying every checklist item
1-4 applied>

---

## SEO + AI-search notes (seo-optimize, <date>)

**Primary query:** <the one query from Phase 3>
**Question set:**
- <question>
- <question>

**Meta title options:**
1. <option>
2. <option>
3. <option>

**Meta description options:**
1. <option>
2. <option>

**Schema suggestion — your site tooling applies this:**
(a fenced `json` block holding the JSON-LD sketch — see
`references/checklist.md` step 6 for the shape and which type to pick)

**Internal-link notes:**
- <where a link could point, to what already-seen page, and why>

**Left for the owner:**
- [PLACEHOLDER: what's missing]
```

The notes block isn't page copy — it's the record of the pass, kept with
the item so the decision (and the unchosen meta options) travels with the
review, the same way `email-write` keeps its unchosen subject lines.
Whoever ships this page next reads the body above the `---` as the page;
the notes below it are guidance, not more copy to publish verbatim.

### The Editor gate's comparison source

The ORIGINAL text: what Phase 2 read before Phase 4 touched anything
(Mode A), or the frozen approved/published item itself, which never
changes (Mode B). Meaning has to survive the pass; only structure and
specificity may change. See `SKILL.md` Phase 6.

## Mode C: the change list (`seo-report`)

```text
work/strategy/<readable-slug>.md
```

One file, no round folder — the same single-item shape as a single email
in `email-write`.

### Frontmatter

```yaml
---
type: seo-report
headline: "SEO + AI-search change list — <page name or URL>"
skill: seo-optimize
target_url: "<the exact URL read>"
fetched: <YYYY-MM-DD>          # the date the page was actually read
primary_query: "<the one query this page should own>"
---
```

Everything else follows `system/standards/item-model.md` as normal:
`id`, `status`, `business`, `channel`, `created` are stamped by the
system, never set by hand.

### Body shape

```markdown
# <headline>

**Page's job:** <one line — what should someone be searching or asking
when this page is the answer, and for which persona>
**Primary query:** <query>
**Question set:** <the questions from Phase 3, as a short list>

## Quick wins
| # | Where | Current | Proposed | Why |
|---|---|---|---|---|
| 1 | <section or element, top of the page to bottom> | "<exact current text>" | "<exact proposed text>" | <one line> |

## Bigger rewrites
| # | Where | Current | Proposed | Why |
|---|---|---|---|---|

## Meta title options
1. <option>

## Meta description options
1. <option>

## Schema suggestion — your site tooling applies this
(a fenced `json` block holding the JSON-LD sketch)

## Internal-link notes
- <note>

## Left for you to add
- [PLACEHOLDER: what's missing]
```

Every change row is ordered top of the page to bottom, so the owner can
work through the table in one pass over their own page without hunting
for where a change belongs. "Quick wins" holds the mechanical, low-risk
changes — a heading reword, a meta option, a definition added. "Bigger
rewrites" holds anything that touches a whole section's structure or
argument. An empty "Bigger rewrites" table is a fine, honest outcome.

**Applying this is the owner's own work.** This skill has no access to
their live site and no publish step for a `seo-report` — it ends at a
change list, ready to work through top to bottom. Say that plainly when
handing it over.

## When a change list is a rewrite in disguise

Stop if "Bigger rewrites" ends up longer than "Quick wins," or the total
proposed text runs close to the length of the whole page, or barely a
sentence of the original would survive. That isn't an optimization
anymore — it's a rewrite wearing a disguise, and shipping it as a change
list only hides the size of the ask inside a table.

Say so plainly, and point at:

- `landing-page-write`, if the target is a page,
- `article-write`, if the target is an article,

conditionally — say plainly if the matching skill isn't installed in this
workspace yet, rather than either forcing the small job to cover the big
one, or inventing a skill that isn't there.

## A clean page is a real outcome

If the page already does most of what the checklist asks — clear
headings, real answers, citable claims — say so. A short revision with
only the meta and schema additions, or a change list with two or three
rows, is a complete and honest output. Never pad the notes or invent
change rows to look thorough.
