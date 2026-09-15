# Playbook: dossier and promotion

Read `SKILL.md` first, and finish `playbooks/gather.md` before you start writing
— this playbook turns what you gathered into the dated file, then promotes what
it supports into `brain/audience.md`. Evidence first, always: every line below
either quotes something a real customer said, or is clearly labeled as your own
reading of it.

## File and header

Write to `brain/research/YYYY-MM-DD-audience.md` (today's date, `audience` as
the topic). If that file already exists, append `-02`, `-03`, and so on
rather than overwrite it, and carry the exact filename you used into the
index line in `brain/research/index.md`. Open with a short header block,
plain text, not YAML:

```markdown
# Audience research — 2026-08-05

**Depth:** quick
**Web access:** yes
**Sources read:** exampleloopmarketing.com (home, about, /reviews — domain-linked),
  3 support-email exports from add-to-brain/ (owner-dropped 2026-08-04)
**Sources found but not read (unconfirmed):** a Facebook group named
  "Example Loop Marketing customers" found by name-search — needs the owner's
  confirmation before it is read
**Coverage:** read all 3 emails in full; read the first 40 of roughly 90
  visible Google reviews (stopped once the same three themes kept repeating);
  the site's own copy was read for context, never quoted as customer voice
```

Every field is honest, not aspirational. "Sources read" names what you
actually opened, not what you meant to. "Coverage" says how far you got and
why you stopped — saturation, running out of confirmed sources, or running out
of time on an In-depth pass that could have gone further. If you have nothing
for a field ("Sources found but not read"), write "none" rather than deleting
the line; an absent line reads as "I forgot to check," a line that says "none"
reads as "I checked."

## The nine sections

Write only what the evidence supports. A section with genuinely nothing behind
it says so in one line ("no evidence yet for this section — nothing in the
material gathered touches it") rather than being invented to look complete.

### 1. Who they are

Segments actually seen in the evidence, described in plain, factual terms:
what they do, where they are in their business or life, what kind of person
they are. **No cute persona names.** Not "Busy Betty," just "solo owners
running the shop themselves, evidenced by 6 of the 40 reviews mentioning doing
everything alone."

If the evidence shows more than one real segment, give each its own short
sub-heading. Never blend two real segments into one composite that fits
neither — that composite is nobody, and a draft written for nobody reads like
it was written for nobody.

### 2. Core problem, in their own words

A cited quote bank. Each quote verbatim, with its source and confidence label:

```markdown
- "I kept forgetting to post until a customer asked if we'd closed down."
  — Google review, 2026-06 · **medium** (prompted-style review, one source
  this pass)
- "Marketing always felt like a chore I'd get to after the actual work was done."
  — support email, 2026-07 · **high** (also said, in close to these words, in
  two more emails and one review)
```

### 3. Emotional drivers

Fears, frustrations, desires the evidence shows, each backed by at least one
quote and a confidence label. Group by drive, not by source.

### 4. Past attempts that failed them

What they tried before, and their own words about why it did not work. This is
where "alternatives considered" from Mode 1 and complaint themes from Mode 2
usually land together.

### 5. What they refuse to do

The sacrifices or risks they visibly avoid — evidenced by what they say they
will not accept, not by your guess at their limits. "Won't pay for a tool that
needs a login every day" (three reviews) is evidence. "Probably doesn't like
complexity" is a guess and does not belong here.

### 6. The transformation they describe wanting

In their language, not the business's. If a customer says "I just want it to
run itself for a week so I can breathe," that is the line — not "increased
operational efficiency."

### 7. What they believe success hinges on, and who or what they blame

Two closely related things worth keeping together: what they think the real
lever is, and, where evidence shows it, who or what they hold responsible when
it does not work (themselves, a past tool, bad timing, bad luck).

### 8. Objections seen in the wild

Concerns that came up, whether or not they stopped a sale. Cite each. This
section is a direct feed into `audience.md`'s own "What stops them buying"
section (see promotion, below).

### 9. Interpretation — what I read between the lines

This section is different in kind from the eight above it, and it must look
different. Head it exactly this way, and open it with one line making the
shift explicit:

```markdown
## 9. Interpretation — what I read between the lines

Everything below this line is my reading of the evidence above, not a new
finding. It is offered because it is often useful, and it is never to be
treated as something a customer actually said.
```

Then write the deeper-drivers read: private fears the surface complaints hint
at, identity payoffs the transformation implies, the story they seem to be
telling themselves about why they have not solved this yet. Ground every line
in a specific quote or theme from sections 2 through 8 ("this reads as more
about looking competent to their own customers than about the software
itself, given how often 'looking unprofessional' comes up next to the actual
technical complaint"). A line of interpretation with nothing above it to point
back to does not belong here.

## Confidence labels, applied

Attach one to every substantive claim in sections 2 through 8:

- **high** — three or more independent sources (different people, or
  independently authored sources), said unprompted.
- **medium** — two independent sources, or any count of sources where the
  material was prompted (a survey question, a direct interview answer). A
  direct question can shape the answer it gets, so a prompted claim caps at
  medium no matter how many people echoed it.
- **low** — one source, prompted or not.

"Independent" means different people (or independently authored sources).
Repeated statements by one person over time are ONE source — note them as
repeated evidence if it's worth saying they kept saying it, but they never
raise the independent-source count, and neither do three quotes pulled from
the same review. Count carefully; the label is doing real work for whoever
reads this dossier later, and an inflated label is a small lie with a long
shelf life.

## The below-five rule

If a whole segment description (section 1, or a sub-theme inside another
section) rests on fewer than five distinct data points, say so in plain words,
right there: "this segment description draws on 3 data points; treat it as an
early read, not a settled one." Do not delete the section and do not hide the
count. A thin, honestly labeled read is useful. A confident-sounding one built
on three quotes is the exact failure mode this rule exists to stop.

## Candidate proof

While reading, you will find quotes that sound like a testimonial or a named
result ("this saved me four hours a week"). These never go into
`brain/proof/` from here — that folder only ever gets a line on the owner's
own confirmation. Instead, close the dossier with:

```markdown
## Candidate proof (unconfirmed — not filed in brain/proof/)

- "This saved me about four hours a week I used to spend chasing posts."
  — Google review, 2026-06. Reads like a strong result claim. Needs the
  reviewer's own yes before it can be used publicly; the owner can promote it
  with `brain-capture` once that is in hand.
```

If there is nothing candidate-worthy this pass, write "none found this pass"
rather than omitting the section.

## Promotion: writing `brain/audience.md`

Do this after the dossier file is saved, not before — the dossier is the
record of what was found; `audience.md` is what the business now treats as
worth acting on, with an honest mark.

1. **Read the current `brain/audience.md` in full first.** Note every line
   already marked **confirmed**. Those lines are untouchable by this skill:
   never edit, soften, reorder past, or silently overwrite one, even if new
   evidence disagrees with it. If it does disagree, add a note in your reply
   and in the dossier, and leave the confirmed line exactly as it stands.
2. **If the file does not yet explain the marks**, add a short legend
   immediately under the title, matching `business.md`'s own wording:

   ```markdown
   > Mark each line so the system knows how far it can lean on it: **confirmed**
   > (the owner checked it and would put it in writing), **rough** (near enough,
   > not a number to publish), **unchecked** (research or a single mention;
   > useful context, never a public claim). Anything unmarked is unchecked.
   ```

3. **Add or extend, never blanket-replace.** New findings become new lines or
   fill placeholders that are still `[PLACEHOLDER: ...]`, each carrying its
   mark. Research findings are born **unchecked** by default (they are a
   finding, not yet a fact the owner has stood behind), unless the evidence is
   so strong (high confidence, corroborated across many independent sources)
   that you judge it worth flagging as **rough** — and if you do, say why in
   your summary so the owner can see the reasoning, not just the mark.
4. **"What stops them buying"** in `audience.md` is the direct landing spot for
   section 8's objections. Add real ones from the dossier, each still marked.
5. **"How they talk about it"** is the direct landing spot for the vocabulary
   you pulled in section 2 and Mode 1's exact-vocabulary extraction.

## Updating the research index

Add one line, newest first, to the top of `brain/research/index.md`, as a
wikilink:

```markdown
- [[2026-08-05-audience]] — 3 support emails plus 40 of ~90 Google reviews;
  first pass, medium depth, one source found but not yet confirmed.
```

## What this playbook never does

It never writes a quote that was not actually said. It never merges two real
segments into an average. It never treats the business's own site copy, or a
competitor's, as something a customer said. It never reads a source that was
not confirmed. It never edits, softens, or removes a line in `audience.md`
already marked confirmed. It never files a candidate proof quote into
`brain/proof/`. It never presents section 9 as anything but interpretation,
and never lets it stand without a quote underneath it to point back to.
