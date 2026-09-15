# Visuals playbook

How to pick, adapt, and ship a static ad visual from this library, for your own business or any
offer you're running ads for. Three folders back this up:

- `templates/`: HTML cards rendered to PNG by a plain browser, no AI. Native-app mockups, offer
  grids, testimonials, curiosity hooks. See `templates/CATALOG.md` for the full list and
  `RENDER.md` for how to render one.
- `styles/`: AI-image prompt recipes for photoreal scenes, illustrated/stylized worlds, and
  founder-face shots. See `styles/CATALOG.md`.
- `carousels/CONCEPTS.md`: eleven multi-slide swipe concepts, each one visual idea told across
  four or five connected images.

Every record in every folder already explains itself: what it looks like, when to use it, and how
to adapt it. This file is the layer above all three: the shared method for choosing a format, the
rules that never bend regardless of the offer, and the recipe for retargeting the whole library to
a business it wasn't built for.

---

## 1. How to choose a format

Five questions, in order. Don't skip to "what looks cool," start here.

### Match the audience's world

Pick a format whose depicted world your actual audience recognizes in under a second. A home
office desk, a phone lock screen, a group chat, a community comment section, a kanban board: each
of these is instantly legible to *someone*, and instantly meaningless to someone else. A software
buyer clocks a kanban board immediately; a retail buyer doesn't think in kanban boards at all. Know
which world your buyer actually lives in before you pick the format, not after.

This is the single most common way a good format fails: it's the right mechanic, aimed at the
wrong world. Fix the world before you touch the copy.

### Match the awareness stage

- **Problem-aware** (they feel the pain, haven't named a fix): mirror the pain back at them.
  Relatable, funny, "is this me" formats. `alignment-chart`, `starter-pack`, `the-bottleneck`.
- **Solution-aware** (they know fixes like yours exist, haven't picked one): show the *after*.
  Calm, handled, relief. `notification-summary`, `screen-time-drop`, `approve-week`.
- **Product-aware or offer-aware** (they're comparing specifics): state the offer plainly. Price,
  proof, mechanism. `bento-offer`, `output-grid`, `single-stat`.

A gorgeous problem-aware creative shown to an offer-aware buyer reads as vague and stalls the
decision. A hard price-and-proof creative shown to a problem-unaware buyer reads as a cold pitch
before they've admitted the problem exists. Match the stage or the format works against you.

### The two-poles rule for AI imagery

Every AI-generated image commits fully to one of two poles: **photoreal** (it could pass as an
actual photograph) or **proudly, obviously artificial** (illustrated, clay, diorama, vintage print,
anything that reads as deliberately crafted, not attempted-real). Never land in between. A "pretty
good but not quite real" AI image is the one look that reliably underperforms, because it reads as
a mistake instead of a choice. If a render looks almost-but-not-quite photoreal, either push it
further toward real (better lighting, better reference photos, more specific detail) or pull it all
the way to an obviously stylized world instead of leaving it stuck in the middle.

### Native-surface-first, and why it wins

Formats that borrow a real app or platform's visual grammar (a text thread, a comment section, a
lock-screen notification) read as organic content, not advertising. No brand logo pinned to the
corner, no obvious CTA button baked into the image, nothing that visually announces "this is a
paid ad." That's not just a taste preference: creative that reads as native content consistently
outperforms creative that reads as a polished ad on click-through rate, because the platform's own
users have learned to tune out anything that looks like a brand pitch and keep scrolling past
anything that looks like more of the same feed. A rougher, more native-looking image beats a
glossier, more obviously-branded one on real ad performance, repeatedly. Don't mistake "looks less
designed" for "worse creative."

### Diversity is the targeting signal

Modern ad delivery systems read the creative itself to help decide who sees it. A batch of images
that are really the same photo with a different headline, or the same layout with a different
color, gets treated as one thing by the algorithm, no matter how many variants you upload. Real
diversity means genuinely different subjects, genuinely different depicted worlds, genuinely
different formats, not palette swaps. When you build a round of ads, span multiple formats from
this library and multiple worlds within your audience, not five versions of one idea.

---

## 2. Hard rules that travel to any offer

These hold regardless of what you're advertising. No exceptions, no "just this once."

- **Never fabricate.** No invented statistics, review counts, ratings, testimonial quotes, or
  results. If you don't have a real number or a real quote with permission to use it, leave the
  claim out entirely. A placeholder bracket left unedited is safer than a number you made up.
- **No outcome-plus-timeframe pairings.** "Doubled in two months," "70 clients in four days,"
  anything that stacks a specific result against a specific window, stays off the image even when
  it happens to be true. These read as a promise the platform and the viewer both discount, and
  they draw the most compliance scrutiny. Keep claims to what got delivered or what time got saved,
  not a result-by-a-date formula.
- **Two to three lines of on-image text, maximum** (a chat-bubble thread can run longer since each
  bubble reads as one quick beat, not a paragraph). Heavy text on a static image underperforms and
  most platforms visually deprioritize text-heavy creative besides.
- **No domain, no URL, anywhere on the image.** A plain wordmark is fine if you want one; a clickable-
  looking link baked into the picture is not. **No CTA button on the image**, and no chrome that
  mimics a real platform's UI closely enough to be mistaken for that platform's own interface
  (a fake feed post with a real platform's exact logo and color system reads as impersonation, not
  homage; keep native-surface formats recognizable but generic).
- **Photoreal or proudly artificial, never the uncanny middle.** Restated here because it's the
  single most common way an otherwise-good AI image quietly fails. See the two-poles rule above.
- **Every visual needs a subject.** A photo, an object, a scene, a native app surface, a diagram:
  something concrete for the eye to land on. A plain colored block with a typeset claim and nothing
  else is a weak, easily-scrolled-past format; give the eye something to actually look at.
- **A real person's face only carries claims that are literally true of them.** If a photo of a
  real founder or a real customer appears in an ad, every word attached to that photo has to be
  something that person could say and mean. Put anything speculative, aspirational, or
  illustrative on an anonymous or clearly fictional carrier instead, never on a real, named face.

---

## 3. Make it yours: adapting the library to your business

The format mechanics in this library are portable. The depicted worlds, examples, and placeholder
copy are not, they were written generically on purpose so you'd replace them. Four steps.

### 1. Know your real customer segments before you pick anything

Don't assume who buys from you. Pull your actual customer or lead records (a CRM export, a Stripe
customer list, whatever you have) and classify them into real segments: by business type,
by what they bought, by how they found you. Find your actual top one or two segments by count and
by revenue, not the segment that feels most flattering to imagine. Guessing at your audience from
a stereotype instead of your own data is the single easiest way to pick a beautifully executed
format that lands with nobody.

### 2. Learn how that segment actually talks about their problem

Once you know who you're actually targeting, find their own words for the pain and the dream: read
support tickets, reviews, sales call notes, community posts, anywhere your actual buyers describe
their situation unprompted. The self-identify formats in this library (`alignment-chart`,
`starter-pack`, and similar) only work when the personas and one-liners come from language real
people actually use. An invented, generic "pain point" reads as hollow; a phrase pulled from an
actual customer's actual complaint reads as uncannily accurate, which is exactly the reaction that
makes someone stop scrolling.

### 3. Swap the depicted world, keep the mechanic

Every template and style recipe in this library documents its own invariant (the format mechanic
that has to stay) and its swap slots (the specific nouns, prices, and worlds that don't). A kanban
board reading "waiting for your OK" is the mechanic; the four example task names on the cards are
the swap slots. A vending machine dispensing shrink-wrapped deliverables is the mechanic; what's
printed on the packets is the swap slot. Read the template or recipe's own notes for exactly what's
fixed and what's yours to change, then replace every placeholder with something true and specific
to your business. Retire any depicted world that doesn't fit your actual audience rather than
forcing it (a home-office desk pan doesn't fit a business that sells to construction crews; a
storefront moment doesn't fit a business with zero storefront customers, however tempting the
cliché).

### 4. Re-render, then re-check the hard rules

Once the copy and world are swapped in, re-render the template (`RENDER.md`) or re-generate the AI
image, and run it back through section 2 of this file before it ships. New copy can accidentally
reintroduce a banned pattern (an outcome-plus-timeframe claim, a fabricated number, a bare URL) even
when the original template was clean. Check the actual rendered image, not just the text you typed,
because problems in AI-generated creative (extra fingers, garbled on-image text, a logo the model
invented on its own) show up in the pixels, not the prompt.

---

## 4. Quick reference

| You need... | Look at... |
|---|---|
| A format that mirrors a specific pain back at the reader | `templates/CATALOG.md` → meme and relatability |
| A format that shows the calm "after" | `templates/CATALOG.md` → curiosity and pattern-interrupt |
| Price, proof, or a plain offer statement | `templates/CATALOG.md` → offer and proof |
| Social proof from a real customer | `templates/CATALOG.md` → testimonials |
| A photoreal AI scene | `styles/CATALOG.md` → photoreal family |
| An obviously artificial, stylized AI world | `styles/CATALOG.md` → illustrated, lo-fi, or product family |
| Your founder's real face in a shot | `styles/CATALOG.md` → any `founder_photo_required: true` recipe |
| A multi-slide swipe story | `carousels/CONCEPTS.md` |
| How to render an HTML template, or rebrand the whole set at once | `RENDER.md` |
