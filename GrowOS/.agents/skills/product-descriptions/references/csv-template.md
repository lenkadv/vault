# CSV template — columns, an example, and the placeholder rule

`SKILL.md` Phase 2 reads a CSV as one of the three ways product data
reaches this skill, whenever the owner drops one in `add-to-brain/` or
names a path directly. This file is what that CSV should look like, so
the owner (or whoever built the export) has something concrete to match.

This skill never requires the owner to use this exact template before it
will work — a CSV with different headers, extra columns, or a different
order still gets read; this is the shape that needs the least
back-and-forth to fill in completely.

## The columns

Nine columns, matched by header name, not by position — a CSV with the
same headers in a different order, or in a different case (`Name` instead
of `name`), reads the same.

| Column header | What goes in it | If it's blank |
|---|---|---|
| `name` | The product's name, exactly as it should appear in the draft | `[PLACEHOLDER: product name, row <n>]` — without a name, the row can't be drafted at all; flag it and move to the next row |
| `price` | The price, with currency | `[PLACEHOLDER: price for <product name>]` |
| `category` | The product category or type | `[PLACEHOLDER: category for <product name>]` |
| `features_specs` | The key features or technical specs, plain text, semicolon-separated if there's more than one | `[PLACEHOLDER: features/specs for <product name>]` — the description and bullets draft from whatever else is filled in |
| `materials_ingredients` | Materials (a physical good) or ingredients (a consumable) | `[PLACEHOLDER: materials/ingredients for <product name>]` |
| `sizes_variants` | Sizes, colors, or other variant options, semicolon-separated | `[PLACEHOLDER: sizes/variants for <product name>]` |
| `audience_use_case` | Who it's for, or how it's typically used | Left out of the draft rather than placeholdered — this one shapes tone more than it supplies a fact `references/description-craft.md`'s benefit bridge needs; `brain/audience.md` fills the gap instead |
| `current_description` | The existing description text, if any | Nothing — this column is reference only, never required |
| `image_notes` | The owner's own description of the product photo: angle, setting, what's actually visible | Alt-text becomes the placeholder template from `references/description-craft.md`'s alt-text section |

**`current_description` is reference, not raw material to reword.** When
it's filled in, read it for facts (a spec it mentions, a claim it
makes) and for a sense of what the business has already said publicly —
but the new description still has to do the actual job: bridge features
to benefits, per `references/description-craft.md`. A feature-dump
`current_description` copied and lightly reworded hasn't done that job;
it's exactly the gap this skill exists to close.

**Extra columns beyond these nine are fine — for product facts.** Read one
if it's clearly useful for this product (a SKU code, a supplier note);
ignore it if it isn't. These nine are the ones this skill actively looks
for. **A link, a discount or coupon code, a tracking parameter, a phone
number, or a postal address is different: it never comes from a CSV cell,
named column or extra, however ordinary it looks.** `brain/business.md`
and `setup.md` are the ONLY two places one of these may come from — the
same rule `social-engage` already applies to links. A checkout link or
coupon sitting in a supplier's export is exactly the kind of thing that
must never reach a description this way.

**A missing column is the same as every cell in it being blank.** If the
whole CSV has no `materials_ingredients` column at all, every row gets
that column's placeholder rule applied — nothing different happens just
because the gap is column-wide instead of row-by-row.

## Example

```csv
name,price,category,features_specs,materials_ingredients,sizes_variants,audience_use_case,current_description,image_notes
Insulated Steel Water Bottle,$28,Drinkware,"Keeps drinks cold 24h, hot 12h; leak-proof lid; wide mouth fits ice",18/8 stainless steel; BPA-free lid,"20oz, 32oz; Matte Black, Ocean Blue, Sand",Gym-goers and daily commuters who refill often,"Our bottle is great and keeps things cold for a long time.","Matte black bottle standing upright on a white background, condensation visible on the lower half"
Trail Running Cap,$22,Headwear,,,"One size, adjustable strap",,,
```

(The product names and details above are made up to illustrate the
format — never carry them into a real draft.)

**Row 1 (Insulated Steel Water Bottle)** has every column filled, so the
draft has real material for all four pieces: the description bridges
"leak-proof lid" and "wide mouth" into what that means for someone
refilling on the go, the bullets back the cold/hot claims with the
18/8-steel spec, and the alt-text can be written for real from
`image_notes` instead of placeholdered.

**Row 2 (Trail Running Cap)** is missing `features_specs`,
`materials_ingredients`, `audience_use_case`, `current_description`, and
`image_notes`. The draft still goes ahead on what IS there — name,
price, category, and the size/variant line — and:

- The description and bullets lean on `category` and `sizes_variants`
  alone, with `[PLACEHOLDER: features/specs for Trail Running Cap]` and
  `[PLACEHOLDER: materials/ingredients for Trail Running Cap]` standing
  in for what would have sharpened them.
- `brain/audience.md` supplies the tone, since `audience_use_case` is
  blank for this row.
- The alt-text becomes `references/description-craft.md`'s placeholder
  template, built from the name, category, and whatever variant
  information the row does give.

Neither gap blocks the row — the placeholder rule exists exactly so a
thin row still drafts honestly instead of stalling the whole round.

## The one rule underneath all of this

A blank cell, or a whole missing column, becomes a named
`[PLACEHOLDER: ...]` in that product's draft. It never becomes a guess —
not "most water bottles are BPA-free so this one probably is too," not
"caps are usually one-size." If the CSV doesn't say it, the draft doesn't
say it either, until the owner fills the gap.
