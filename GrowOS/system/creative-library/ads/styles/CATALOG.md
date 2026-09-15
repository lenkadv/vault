# Style Library Catalog

32 AI-image style recipes for Meta ad and social creative. Each one is a markdown file with a
description, a copy-paste prompt template, and notes on why it works and how to adapt it to your
own business. Every prompt template ships with fictional examples using three example businesses:
**Willow & Wren** (e-commerce home goods), **Summit Books & Tax** (local bookkeeping service), and
**The Steady Coach** (online coach and course business). Swap in your own business wherever you see
a `[bracketed placeholder]`.

## The two generation modes

Every recipe is tagged `mode: edit` or `mode: generate` in its frontmatter.

- **Generate mode** needs nothing but the text prompt. No specific person's face is in the frame,
  so you run the prompt as plain text-to-image and it just works.
- **Edit mode** puts your real founder's face into the shot. It needs two extra things: a small set
  of reference photos of your founder, and one instruction sentence, an "identity-lock line", that
  tells the model to keep the same face across every generation. Without the identity lock, an
  image model will quietly drift the face a little on every generation, close but not quite your
  founder, which is worse than not using their face at all.

Recipes tagged `founder_photo_required: true` in their frontmatter are edit mode. Everything else
is generate mode and needs no reference photos at all.

## Building your own founder identity-lock

If you want your founder's real face in any edit-mode recipe, do this once and reuse it everywhere:

1. **Gather 4 to 6 reference photos.** Mix angles: front-on, three-quarter, and a side profile.
   Keep the lighting even and consistent across all of them, and make sure the face fills a good
   share of the frame in each one. Skip photos with other people in them.
2. **Write one identity-lock sentence.** It should tell the model, in plain language, to preserve
   the exact facial structure, bone structure, nose shape, jawline, and skin texture across every
   image, so the output reads as the same real person every time, not a stylized approximation.
   Each recipe in this library shows you exactly where that sentence goes in the prompt, marked
   `[IDENTITY-LOCK LINE]`.
3. **Only use edit mode when the face is forward-facing and clearly visible in the shot.** A
   behind-the-shoulder or profile-only pose can confuse an edit-mode model into blending two angles
   into one distorted face. For those poses, or for any shot that isn't of your founder specifically
   (a fictional stand-in, an object, a scene with no person), use a generate-mode recipe instead and
   skip the reference photos entirely.

## How to generate

1. Open the recipe file for the style you want and copy its prompt template.
2. Fill in every `[bracketed placeholder]` with your own real business details. Never leave a
   placeholder unedited, and never invent a number, result, or claim you can't back up.
3. Run the finished prompt through your preferred AI image model. This pack's included image
   generation key covers this: point it at the kie.ai nano-banana image model (or your preferred AI
   image model that supports image-to-image edits) for anything tagged `mode: edit`, and plain
   text-to-image for anything tagged `mode: generate`. For edit mode, attach your founder's
   reference photos as image input alongside the text prompt.
4. Generate a few variations. Small wording changes in the bracketed sections often make a bigger
   difference than re-rolling the same prompt.

## Founder-photo recipes: use sparingly

10 of these 32 recipes need your founder's face (`founder_photo_required: true`), and two more
combine six near-identical "founder in an everyday moment" location ideas down into two files with
alternate-setting notes built in. Founder-photo recipes are powerful for personal-brand offers, but
they're also the minority of this library on purpose: most small businesses can run strong ad
creative without ever needing a reference photo. Reach for a founder-photo recipe when the ad is
specifically about trust in the person; reach for everything else the rest of the time.

## Full catalog, grouped by family

### Editorial

| id | use when | founder photo required | aspect ratios |
|---|---|---|---|
| [editorial-identity-poster](editorial-identity-poster.md) | Premium magazine-grade authority, awareness campaigns, branded thought-leadership posts | yes | 4:5, 1:1 |
| [editorial-oversized-product](editorial-oversized-product.md) | Playful brand-character moments, lighthearted promise ads | yes | 4:5, 1:1 |
| [fashion-low-angle](fashion-low-angle.md) | Bold product or tool reveal, confident promise hooks | yes | 4:5, 1:1 |

### Illustrated

| id | use when | founder photo required | aspect ratios |
|---|---|---|---|
| [animated-feature-poster](animated-feature-poster.md) | Big aspirational hooks, character-led brand moments, launch announcements | yes | 4:5, 1:1 |
| [chibi-miniatures](chibi-miniatures.md) | Variety and range pitches, "here is everything we handle" angles | yes | 4:5, 1:1 |
| [children-book-watercolor](children-book-watercolor.md) | Quiet emotional pain ads, calm promise ads, hopeful narrative beats | no | 4:5, 1:1 |
| [clay-handoff](clay-handoff.md) | A hand-off or delegation metaphor, charming stop-motion warmth | no | 4:5, 1:1 |
| [dollhouse-cutaway](dollhouse-cutaway.md) | A work-life balance metaphor, a cozy "it happens downstairs" story | no | 4:5, 1:1 |
| [forty-agents](forty-agents.md) | The "one human, a whole team" awe metaphor, leverage without headcount | no | 4:5, 1:1 |
| [retro-appliance](retro-appliance.md) | A vintage-ad pastiche, playful heretical framing, an offer plus a price badge | no | 4:5, 1:1 |

### Lo-fi

| id | use when | founder photo required | aspect ratios |
|---|---|---|---|
| [glass-flowchart](glass-flowchart.md) | Explaining the mechanism as a hand-drawn three-step flow | no | 4:5, 1:1 |
| [launch-month](launch-month.md) | A recurring grind and its resolution, a handwritten calendar gag | no | 4:5, 1:1 |
| [mirror-marker](mirror-marker.md) | An intimate identity-mirror message, an emotional one-liner | no | 4:5, 1:1 |
| [org-chart-me](org-chart-me.md) | The "I am every box on the org chart" pain plus the delegation turn | no | 4:5, 1:1 |
| [trophy](trophy.md) | Proof as an object, an award-photo scroll-stopper, sincere pride | no | 4:5, 1:1 |

### Photoreal

| id | use when | founder photo required | aspect ratios |
|---|---|---|---|
| [approve-week](approve-week.md) | The product-mirror payoff, one tap approves the week | no | 4:5, 1:1 |
| [building-banner](building-banner.md) | A bold public "confession" statement carried by a real photographed banner | no | 4:5, 1:1 |
| [clone-team](clone-team.md) | The "wearing all the hats" pain as a literal photoreal metaphor | no | 4:5, 1:1 |
| [founder-approve-anywhere](founder-approve-anywhere.md) | Founder freedom, "run it from anywhere," lifestyle proof with a legible phone screen | yes | 4:5, 1:1 |
| [founder-morning-calm](founder-morning-calm.md) | Calm morning-owner lifestyle, quiet control, the freedom the business gives back | yes | 4:5, 1:1 |
| [founder-printout-proof](founder-printout-proof.md) | Output or volume proof with the founder, "look what got done" energy | yes | 4:5, 1:1 |
| [marketer-6am](marketer-6am.md) | A specific, painfully relatable early-morning overwhelm moment | no | 4:5, 1:1 |
| [name-tags](name-tags.md) | The "I am every department" pain, a deadpan relatable portrait | no | 4:5, 1:1 |
| [phone-results](phone-results.md) | Social proof, showing real results, urgency | yes | 4:5, 1:1 |
| [the-bottleneck](the-bottleneck.md) | The "I am the bottleneck" realization, solo-operator overwhelm | no | 4:5, 1:1 |
| [victory-moment](victory-moment.md) | Real results, a milestone, "it's working" energy | yes | 4:5, 1:1 |
| [whiteboard-session](whiteboard-session.md) | Authority, teaching, framework reveals | yes | 4:5, 1:1 |
| [wide-angle-hands-reaching](wide-angle-hands-reaching.md) | High-energy curiosity hooks, "stop the scroll" pattern interrupts | yes | 4:5, 1:1 |

### Product

| id | use when | founder photo required | aspect ratios |
|---|---|---|---|
| [flat-lay-product](flat-lay-product.md) | Product tangibility, lifestyle context, "just got this" feel | no | 4:5, 1:1 |
| [fortune-cookie](fortune-cookie.md) | A tiny surprise or delight, a single short promise | no | 4:5, 1:1 |
| [shipping-label](shipping-label.md) | Product tangibility for a digital or service business | no | 4:5, 1:1 |
| [warning-sticker](warning-sticker.md) | A playful "warning" framing, a laptop or product close-up | no | 4:5, 1:1 |
