# Description craft — structure, bullets, meta, alt-text

`SKILL.md`'s Phase 3 walks four pieces per product: the description, the
bullets, the meta title and description, and the alt-text. This file is
the craft behind each one, plus the two things that cut across all four —
voice, and the fabrication traps. Read it when Phase 3 starts; keep it
open through Phase 4's gate, since the gate's scoring-isolation rule
points back at the norms this file sets.

## 1. The benefit-led description

The one move that matters more than any other: every feature becomes a
benefit before it goes in the draft. A feature is what the product has or
does. A benefit is what that means for the person buying it. Skipping the
bridge is the single most common way product copy goes flat.

- Bad (feature, no bridge): "Double-stitched seams. 18/8 stainless steel.
  Wide-mouth opening."
- Good (feature, bridged): "Double-stitched seams that don't blow out
  under a full pack. Stainless steel that won't hold onto yesterday's
  coffee taste. A mouth wide enough to drop ice cubes straight in."

Do this for every feature Phase 2 actually supplied — never invent an
extra one to make the bridge feel fuller, and never bridge a feature that
isn't there yet by guessing what it probably does.

**Shape.** Four beats, in this order:

1. **Open on the buyer's situation or the plain result**, not the product
   name. What does owning this actually change for them?
2. **What it is and how it's used** — the concrete, physical facts, in
   plain words.
3. **The bridge** — each real feature, translated into what it means for
   this audience (`brain/audience.md`'s own words, not marketing
   language).
4. **A closing line** that points at a use case or the moment this
   product earns its keep — never a hard sell; the bullets and the page's
   own CTA carry that job.

**Length.** A single product description is usually short — roughly 50
to 150 words is the normal range for most retail goods. A product with
real complexity (a technical spec sheet, a considered purchase) can run
longer; a simple, low-consideration item can run shorter. This is a
starting shape, not a quota — padding a simple product to hit a word
count reads exactly like padding, and cutting a genuinely complex one
short leaves a buyer's real question unanswered.

**Audience-aware, not generic.** Pull the actual words `brain/audience.md`
records for this persona — their own phrasing for the problem, not a
marketing paraphrase of it. If `brain/proof/` or `brain/samples/` holds a
customer's own words for this exact kind of product, that phrasing
outranks anything invented fresh. A description that could sit unchanged
on a competitor's page for the same category of product hasn't done this
job yet.

**A quiet objection, answered where the data supports it.** If Phase 2's
data already answers an obvious hesitation — a size that runs small, a
material that needs hand-washing, a part that's sold separately — fold
that into the description or a bullet rather than letting the buyer find
out at checkout. This only applies when the data actually says it; never
invent a caveat, and never invent a reassurance ("machine washable")
nobody confirmed either.

## 2. Bullet craft

Bullets exist to be scanned, not read start to finish. Benefit leads;
the spec backs it up, not the other way round.

- Bad (spec leads): "20oz capacity. Stainless steel construction."
- Good (benefit leads, spec backs it): "Holds a full day's water in one
  fill — 20oz of 18/8 stainless steel that won't dent if it's dropped."

**Shape per bullet:** `<the benefit, in plain words>, <the spec or fact
that makes it true>.` Not every bullet needs the full pattern spelled
out — a short, punchy benefit alone is fine when the spec was already
covered in the description — but default to showing the receipt.

**How many.** Three to six per product is the normal range. Fewer than
three usually means the data was thin (say so, don't stretch); more than
six starts blurring together and the buyer stops reading them as
distinct points.

**Keep them parallel.** Same grammatical shape across the set — all
starting on a verb, or all starting on the benefit noun — so the eye can
scan the list as a list, not as six different sentence shapes stapled
together.

**Never a feature the description didn't already cover appearing here
for the first time with no bridge.** If a bullet introduces a fact,
bridge it right there, in the bullet itself — the bullet doesn't get a
pass on the feature-to-benefit rule just because it's short.

## 3. Meta title and meta description

These are the two fields a search result actually shows. Write one of
each per product — not a scored shortlist like a page headline gets;
a batch running up to 20 products is sized the way it is specifically to
stay tractable, and a nine-candidate scoring pass per field, per product,
would work against that. The owner can always ask for an alternate on any
one item at review.

**Length norms** (how search engines actually render these — a
mechanical constraint, not a claim about the business):

- **Meta title:** roughly 60 characters or under. Longer usually gets cut
  off mid-word in a search result.
- **Meta description:** roughly 150 to 160 characters. Longer gets
  truncated, usually with a trailing ellipsis.

These are practical ceilings, not targets to fill exactly — a meta title
that says everything it needs to in 40 characters doesn't need padding to
reach 60.

**What goes in each.**

- **Meta title:** the product (or collection) name plus one real
  differentiator — a use case, a material, a size range — not a generic
  "Buy [Product] Online | [Store Name]" template. Include the brand name
  only if there's room after the differentiator earns its place.
- **Meta description:** the core benefit, one concrete detail that makes
  it credible (a spec, a material, a use case), and a soft, specific
  prompt — never a generic "Shop now" with nothing else to it.

**No invented ranking or volume claims here either.** These two fields
describe the page; they are not the place to imply a keyword's search
volume, difficulty, or ranking position — none of that can be known from
a product's own data, and none of it belongs in a meta field regardless.
A deeper query-and-ranking pass, once the page is live, is
`seo-optimize`'s job.

## 4. Alt-text rules

Alt-text describes a real image — one the owner already has, or one
they've described. It is never a description of a product this skill
imagines existing. Getting this wrong is a specific, common failure mode:
a plausible-sounding alt-text line ("a sleek black water bottle on a
marble countertop") that describes a photo nobody actually took.

**The honesty rule.** Alt-text may only state what's actually known:

- What Phase 2's data confirms (color, material, a size shown in a
  variant photo the owner named).
- What the owner has directly described about the actual photo (angle,
  setting, what's visible).

**No image information at all.** Write the placeholder template, never a
guessed visual:

```text
[PLACEHOLDER: describe the product photo — <product name>, <any known
color/material/size>, <any known distinguishing feature>. Add what's
actually in the photo: angle, setting, background.]
```

The template front-loads whatever IS already known from the product's
own data, so the owner only has to fill in the parts that come from
actually looking at the photo — never asks them to start from a blank
line, and never fills those parts in with a guess to save them the step.

- Bad (invented visual): "Matte black bottle on a rustic wood table with
  morning light."
- Good (known attributes, honestly placeholdered): "[PLACEHOLDER:
  describe the product photo — Insulated Steel Water Bottle, Matte Black,
  20oz. Add what's actually in the photo: angle, setting, background.]"
- Good (owner described the photo): "Matte black insulated water bottle
  standing upright on a plain white background, condensation visible on
  the lower third."

**Keep it concise.** Roughly 125 characters or under where the real
content allows it — some screen readers and platforms truncate longer
alt-text, so the most important, identifying details belong first.

**Never a generated photo.** This skill does not ask `image-create` (or
anything else) to render an image of the actual product to fill an
alt-text gap. A generated image cannot be trusted to depict a real
physical SKU — the customer receiving the real item is the one who'd pay
for that gap between a rendered promise and the actual product. Missing
photography is a placeholder and an honest flag to the owner, never a
generated stand-in.

## 5. Voice in product copy

`brain/voice.md` governs the register, exactly as it does for every other
GrowOS channel — there is no separate, fixed reading-grade ceiling for
product copy itself. A technical parts supplier's product copy can stay
technical; a playful direct-to-consumer brand's copy can stay playful.
What has to stay grade-8 plain is everything this skill SAYS to the
owner — the hand-off, the flags, the placeholders — never the product
copy it writes for the business's own customers.

Inside whatever register `voice.md` sets, product copy leans concrete
over abstract: a number, a material, a use case beats an adjective every
time.

- Bad (abstract, unearned): "Premium quality construction you can trust,
  built to last."
- Good (concrete): "18/8 stainless steel, double-walled, dishwasher
  safe."

Watch for hype adjectives with nothing behind them — "seamless,"
"revolutionary," "game-changing," "world-class" — the same list the
Editor gate's scorer flags everywhere else. A real spec or a real use
case earns its place; an adjective with nothing behind it doesn't. Where
`brain/proof/` or `brain/samples/` holds the exact words a real customer
used for this kind of product, that language beats anything drafted from
scratch — mirror it rather than paraphrasing it into something smoother
and less specific.

## 6. Collection-page vs. product-page differences

Same item `type`, same four required pieces — description, bullets,
meta, alt-text — but the subject shifts from one SKU to a set:

| | Product page | Collection page |
|---|---|---|
| Description's subject | This one item, its own features and use | The theme tying the set together — a use case, a season, a material line, an audience — not one item's spec sheet |
| Bullets | This item's own benefits | What the SET spans: the range of options, the shared quality across it, who each end of the range suits |
| Count language | N/A | Only state how many items are in the collection if the data actually says so — never round up, round down, or estimate a count |
| Meta title/description | Names the product, its differentiator | Names the collection and the shared theme — the query it should own is category-level, not one SKU's |
| Alt-text | Describes the one product's own photo | Describes the collection's own hero or grid image, if one exists, at the same honesty standard — never implies items in the shot that the data doesn't confirm are actually part of the set |

- Bad (product-page description used unchanged for a collection): "This
  jacket is warm, waterproof, and built for cold mornings."
- Good (collection description): "Six jackets built for the same cold
  mornings, split by how much weather you actually run into — a light
  shell for city commutes, insulated builds for standing outside all day."

## 7. The two fabrication traps

Named here in full; `SKILL.md` Phase 3 flags them at the point of
drafting.

**Physical attributes.** Dimensions, materials, weight, capacity,
certifications (a safety rating, an organic certification body, a
material standard). These go in only when Phase 2's data actually states
them — a CSV cell, a pasted spec, or a shop page's own stated text. A
guess that would be right for "most products like this" is still a
fabrication the moment it's written as fact. Missing one:
`[PLACEHOLDER: <attribute> for <product name>]`.

**Loaded claims.** Words that carry a legal or regulatory weight beyond
their plain meaning — "organic," "hypoallergenic," "sustainable,"
"natural," "eco-friendly," "clinically proven," "non-toxic," and words
like them. Two conditions, both required, before one of these appears in
a draft:

1. The claim is actually present in Phase 2's data — the owner's own
   spec sheet, a CSV cell, or text stated on the shop page itself.
2. `brain/compliance.md` clears it, checked now, at drafting time.

**Compliance silence is not compliance clearance.** If `brain/compliance.md`
says nothing about a claim class one way or the other, that's not
permission to use it freely — say so plainly and flag the claim for the
owner's sign-off before it ships, the same way an unverified fact gets
flagged rather than assumed true. This is stricter than the general
"silence means unverified, not automatically false" rule, because a
loaded claim in this category (organic, hypoallergenic, and similar)
often carries real certification or regulatory requirements behind it —
getting it wrong isn't just a style problem.
