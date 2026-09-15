# Playbook: dossier and promotion

Read `SKILL.md` first, and finish `playbooks/discover.md` before you start
writing — every competitor in this dossier must already be confirmed. Evidence
first: every claim about a competitor either quotes something found where you
looked, or is clearly labeled as the competitor's own marketing claim.

## File and header

Write to `brain/research/YYYY-MM-DD-competitors.md`. If that file already
exists, append `-02`, `-03`, and so on rather than overwrite it, and carry
the exact filename you used into the index line in `brain/research/index.md`.
Open with a plain header block, same shape as the audience dossier:

```markdown
# Competitor research — 2026-08-05

**Depth:** quick
**Web access:** yes
**Competitors covered:** Acme Social Co (owner-named), Bramble Posts
  (found by "alternative to Example Loop Marketing" search, confirmed by owner)
**Found but not confirmed:** Postly (found by category search, owner has not
  said whether this is a real competitor)
**Coverage:** Acme Social Co — homepage, pricing page, 15 of ~60 visible
  Google reviews. Bramble Posts — homepage, pricing page, 20 of ~30 visible
  Trustpilot reviews (read all of them — the whole set was short enough).
```

## Per-competitor sections

One sub-section per confirmed competitor, in this shape:

```markdown
## Acme Social Co

**Who they are:** a social-scheduling tool aimed at small agencies, roughly
the same size business as this one's customers.

**Positioning and promise (their claim):** "the only scheduler built for
agencies who bill by the hour" — their homepage headline. Their claim, not
verified against anyone else's offer.

**Offers and visible pricing:** $49/mo for 5 clients, $99/mo for 15 clients,
per their public pricing page, checked 2026-08-05. No custom/enterprise price
shown publicly.

**Channels visibly in use:** a public blog (posts roughly weekly), a LinkedIn
company page (active), no visible presence on Instagram or TikTok.

**What their customers praise (from THEIR reviews, verbatim):**
- "Setup took maybe ten minutes and I never looked at a manual." — Google
  review, 2026-05
- "Support actually answers, same day, every time." — Google review, 2026-06

**What their customers complain about (from THEIR reviews, verbatim):**
- "Great until you have more than 15 clients, then you're stuck upgrading to
  a plan that doesn't even exist yet." — Google review, 2026-04
- "No way to see all my clients' calendars at once, I have to click into each
  one." — Google review, 2026-07

**Where the owner is genuinely different (evidence-based):** Example Loop Marketing's
multi-client dashboard shows every client's calendar on one screen — the exact
gap two of Acme's own reviewers named. This is checked against Acme Social Co
specifically; it is not a claim about every scheduler on the market.
```

Every competitor entry follows this shape. Skip a field only when you
genuinely could not find anything for it after a real look, and say so
("no visible pricing anywhere on their site as of this check") rather than
leaving it blank with no explanation.

## The "genuinely different" section, done honestly

This is the section most likely to slide into cheerleading. Hold the line:

- **Trace every claimed difference to a specific gap named above.** "We're
  better" is not a difference; "their own reviewers say X is missing, and this
  business has X" is.
- **Never claim more than what was checked.** "Different from the two I
  looked at" is correct. "The only one who does this" is a claim about every
  competitor in the market, most of which were never read, and it is exactly
  the kind of claim a customer enjoys disproving.
- **A strength you cannot back stays out.** If nothing in the evidence
  supports a difference you suspect is real, say so plainly rather than
  writing it in on instinct: "this may be a real difference but nothing in
  the reviews read this pass confirms it either way."

## Confidence, applied the same way

Where a claim about a competitor's customers rests on more than one review
(what they praise, what they complain about, as a pattern rather than a
one-off), label it the same way `research-audience` does: **high** (three or
more independent reviewers, unprompted), **medium** (two, or a
prompted-format review site), **low** (one). A single competitor is rarely
going to produce enough independent reviews for "high" on a Quick pass; say so
rather than stretching a label to look stronger than the count supports.

## Promotion: writing `brain/competitors.md`

1. **Read the current file in full first.** Note every line already marked
   **confirmed**, and leave those exactly as they are, even where new
   evidence disagrees — say so in your summary instead of touching the line.
2. **If the file does not yet explain the marks**, add the same short legend
   `research-audience` adds to `audience.md`, matching `business.md`'s
   wording, before your first tagged addition.
3. **"Who we are really up against"** gets a line per confirmed competitor,
   marked (default **unchecked**).
4. **"What they promise"** gets their own claim, explicitly marked as a claim
   in the text itself, not just by the file's convention.
5. **"Where they are strong"** and **"Where they leave people down"** draw
   directly from the praise and complaint quotes above — say honestly where
   they are strong even when it does not help the owner's case; pretending a
   competitor is bad at everything reads as desperate and the owner's own
   customers will know better.
6. **"The angle that is ours"** gets the evidence-based difference, with
   "Checked against" naming exactly which competitors were actually looked at
   and "When" the date of this pass.

## Updating the research index

Add one line, newest first, to `brain/research/index.md`:

```markdown
- [[2026-08-05-competitors]] — Acme Social Co and Bramble Posts, first pass;
  Postly found but not yet confirmed by the owner.
```

## What this playbook never does

It never opens a competitor's site or reviews before the owner has confirmed
them. It never states a competitor's own marketing line as if it were
independently verified or as if their customers said it. It never invents a
price, a promise, or a failing no evidence supports. It never claims a wider
comparison than what was actually checked. It never writes a "where they are
strong" section that pretends a real competitor has no strengths. It never
edits, softens, or removes a line in `competitors.md` already marked
confirmed.
