# The SEO + AI-search checklist

One reader is a search crawler. The other is an AI answer engine deciding
what to quote back to someone who asked it a question. Both want the same
thing: a clear, specific, well-labeled answer they can trust and extract
cleanly. This is the one pass that satisfies both, walked in the order
`SKILL.md` Phase 4 works it.

## Why these checks: the seven principles

The short version of what AI answer engines — and, not coincidentally,
search crawlers — actually reward:

1. **Direct answers.** Content that leads with the answer gets extracted;
   hedging and filler get skipped.
2. **Structure.** Headings that read like the question someone would ask
   make a section easy to find and easy to lift.
3. **Specificity.** A real number, date, or named detail beats "many" or
   "significantly," every time.
4. **Original insight.** A named method or a genuine first-hand angle gets
   cited over a page that just repeats consensus.
5. **Entity clarity.** Terms defined on first use, relationships spelled
   out — a page an AI could build a small knowledge graph from.
6. **Freshness.** A dated, current page beats an undated one — but only
   when the date is real (see the fabrication trap in `SKILL.md`).
7. **Authority.** A named author or brand, real credentials, links to real
   sources — signals that this page is worth trusting.

These are the reasons behind the seven checks below, not a scorecard to
fill in and hand to the owner. Don't score the page; rewrite it.

## The walk (Phase 4, in order)

### 1. Headings that answer the real questions

- Rewrite a topic heading into one that answers a question from Phase 3's
  question set. "Best practices" becomes "How to `<specific action>`."
  "Overview" becomes "What is `<term>`, and who is it for?"
- Keep a logical H1 -> H2 -> H3 hierarchy an AI (and a reader) can follow
  without seeing the page rendered.
- A heading is a query in disguise, not a chance to be clever. Clear beats
  cute, every time.
- **Except the primary headline of a sales or conversion page.** That H1 is
  conversion copy — often chosen through its own skill's scored headline
  process — and this pass does not rewrite it into a query answer. If a
  more answer-shaped H1 would genuinely help search, propose it in the
  notes block as an option for the owner; never swap it in the body.

### 2. Answer-shaped sections

- The first 2-3 sentences under a heading answer that heading's question
  completely enough to stand alone if quoted out of context. Detail,
  caveats, and examples follow after.
- Add a short summary or TL;DR near the top — after the intro, before the
  first section — when the page is long enough to need one: 3-5 bullets of
  real takeaways, not a re-hash of the headings.
- An FAQ section near the bottom is fair game when the page or the brain
  already answers real questions people ask: 5-8 questions, 2-3 direct
  sentences each. Only questions already answered. Never invent one to
  round out the section.

### 3. Entities named plainly

- Spell out an acronym on first use. Define a term of art the moment it
  appears, in plain words, not a link-and-hope.
- Make relationships explicit: not "X and Y," but "X and Y work together
  because...". An AI extracting this page shouldn't have to infer the
  connection.
- Name the business, the product, and the person behind a claim plainly.
  An entity implied by pronoun or context is an entity an AI engine can't
  reliably attach a fact to.

### 4. Claims made citable

- Replace a vague claim ("many customers," "can improve results") with the
  business's own specific version, sourced from `brain/proof/`,
  `brain/business.md`, or `brain/methodology.md` — never invented (the
  fabrication trap in `SKILL.md` is absolute here).
- Name the method. Generic advice isn't citable; a business's own named
  process, framework, or opinion (`brain/methodology.md`) is exactly the
  kind of original angle an AI engine has a reason to quote.
- Date a claim only when the brain actually supports that date. An
  undated true claim is honest. A dated false-fresh claim isn't — leave it
  undated rather than guess.
- A claim the brain doesn't support gets `[PLACEHOLDER: what's missing]`
  in a revision, or a line in the change list naming what the owner could
  add.

### 5. Meta title and description

- 2-3 title options, each built around the primary query from Phase 3, in
  the business's own voice — not keyword-stuffed, not clickbait.
- 2-3 description options, each a genuine, specific reason to click or
  trust the page, sized to what a search result actually shows.

### 6. Schema suggestion

Write it as a fenced JSON-LD block, clearly marked "suggestion — your site
tooling applies this" — this skill can't publish schema to a live site.
Pick the type(s) that fit what's really on the page:

- **Article / BlogPosting** — author, date, headline. The default for
  most articles.
- **FAQPage** — only when step 2 above produced a real FAQ section on the
  page. No FAQ section, no FAQ schema.
- **HowTo** — for genuine step-by-step process content.
- **Organization** — brand identity and contact info, when the page is
  about the business itself (an about page, a homepage).

A minimal sketch, to show the shape (fill every value from the actual page
and the brain — never ship the placeholder text below as real data):

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "<the page's actual headline>",
  "author": { "@type": "Person", "name": "<from the brain, if known>" },
  "datePublished": "<only if the brain or page states one>"
}
```

### 7. Internal-link notes

- Suggest a link only to a page actually seen in Phase 2 — the site's own
  nav, or a page it already links to or mentions. Never invent a URL that
  wasn't observed.
- **For a work-item target** there is no fetched site to observe. The
  observable structure is the business's own other page items in
  `work/pages/` and any live pages `brain/business.md` or `brain/plan.md`
  actually name — suggest links only among those. Nothing observable to
  link to is a normal outcome: say so in one line and leave the section
  out, rather than inventing site structure.
- Where an existing link uses vague anchor text ("click here," "read
  more"), suggest a specific, descriptive replacement that tells a reader
  — and an AI engine — what the linked page actually is.
- Note where an external link to a real authoritative source (a study, a
  standard, a trusted publication the business already cites elsewhere)
  would strengthen a claim from step 4 — but never invent the source or
  the link.

## Before you call the pass done

- Every specific claim in the revision traces to something the brain or
  the original page actually said.
- No FAQ question exists that the brain or the page didn't already answer.
- No date was added or changed that the brain doesn't support.
- The schema block is marked as a suggestion, not presented as if it's
  already live.
- Every internal link named was actually seen, not guessed at.
- Read against `brain/voice.md`: this still sounds like the business, not
  like a checklist filled out.
