# Type library

Nine types cover every list-email job. `system/creative-library/email-types.md`
is the CRAFT catalog — what each type is, when to use it, its shape, and a
plain example outline. Read it every time you pick a type; do not duplicate
it here and do not draft from memory of it.

This file is the OPERATIONAL half: which `type` value to stamp on the item,
whether it is a single email or a round, which brain files matter most for
that type, and — for the six sequence types — a timing table to start the
sequence map from. The shared catalog tells you the shape of the house;
this file tells you which rooms to check before you build it.

## Picking a type

| The moment calls for... | Reach for | `type` value | Single or round |
|---|---|---|---|
| A regular rhythm, something useful, not a pitch | Newsletter | `newsletter` | single |
| A real, specific offer with a genuine reason to act now | Promo | `promo-broadcast` | single |
| Someone just joined the list | Welcome | `welcome-seq` | round |
| Keeping warm between launches | Nurture | `nurture-seq` | round |
| A real launch window: doors opening, then closing | Launch | `launch-seq` | round |
| A chunk of the list has gone quiet | Win-back | `winback-seq` | round |
| An ecommerce cart left behind at checkout | Cart-abandon | `cart-abandon-seq` | round |
| A SaaS free trial running against a clock | Trial-nurture | `trial-nurture-seq` | round |
| Happy customers worth asking for a review | Review request | `review-request-broadcast` | single (short round optional) |

If the owner asks for "just one welcome email" or "just the first cart
email," still build the whole map in `_brief.md` (Phase 2 of SKILL.md) so
that one email is written knowing what comes before and after it — then
draft only the email they asked for and say plainly that the rest of the
round is mapped but not yet written. A round can ship one email at a time to
review; the map should still cover the whole arc.

Newsletter and promo-broadcast are always single items — they never take a
round folder, even when the business sends them on a fixed weekly rhythm.
The rhythm lives in `brain/plan.md`, not in a folder structure.

## 1. Newsletter — `type: newsletter`

Read: `samples/` (heaviest weight here — this is the type readers judge the
business's actual voice by), `voice.md`, `brain/ideas.md` (Serve mode: what
material is `fresh`), `brain/methodology.md` when the angle teaches the
business's own method, `brain/stories/` when the angle is a story.

One newsletter is one idea, told once. Resist the urge to fold in a second
topic because it's timely — a second idea makes it read like a digest, and
digests get skimmed, not read. If the material genuinely wants two ideas,
that is two newsletters, not one long one.

## 2. Promo — `type: promo-broadcast`

Read: `brain/business.md` (the exact offer and price — never approximate
this), `brain/proof/` (the reason to believe), `brain/compliance.md` (claims
and required wording — promo copy is where compliance risk is highest, so
check every claim against it before drafting, not after).

A promo needs a REAL reason to act now — a genuine deadline, a genuine
limit, a genuine bonus that actually ends. If none exists, say so plainly
rather than manufacturing one; a fake deadline is a compliance and trust
problem, not a copywriting problem to solve with better phrasing.

## 3. Welcome sequence — `type: welcome-seq`

**First, confirm which list "just joined" means.** For a business whose own
product is a subscription or membership (and whose brain may use "subscriber"
for both the free list AND the paying members), "new subscribers" is
ambiguous: a welcome sequence for free newsletter joiners builds toward a
first soft offer, while one for brand-new paying members skips the sell and
onboards them into the product. Ask once if it is not obvious from the prompt
and the plan.

Read: `brain/business.md` (what they are being introduced to and the offer
ladder), `brain/audience.md` (who just joined and why), `brain/stories/`
(the founder or origin story for the trust-building email).

Typical length: 3-5 emails, extendable to 7 for a business that wants a
richer runway before the first soft offer.

| # | Timing | Job |
|---|---|---|
| 1 | Immediately | Deliver what was promised. Say who you are, in one line. |
| 2 | Day 1-2 | The story — why the business does this. Build real connection. |
| 3 | Day 3-5 | The best lesson or framework. Prove the list is worth reading. |
| 4 | Day 7+ | A soft, honest mention of the offer, if it genuinely fits here. |
| 5 (optional) | Day 10 | A proof point — a real result, verbatim. |
| 6 (optional) | Day 14 | A check-in: "how's it going?" — engagement, not a pitch. |

## 4. Nurture sequence — `type: nurture-seq`

Read: `brain/ideas.md` (Serve mode — the rotating material; flip each idea
used per the loopback contract), `brain/proof/` (proof points to rotate in),
`brain/business.md` (the soft offer, for the rare email that carries one).

This is the one type with no fixed end. Draft it as a standing rotation
rather than a numbered map: lesson, story, proof point, lesson, soft offer —
roughly one offer for every five or six value emails, per the shared
catalog. Because it never closes, treat each round as a batch (say, 4-6
emails at a time) rather than trying to plan the whole ongoing rhythm in one
`_brief.md`.

## 5. Launch sequence — `type: launch-seq`

Read: `brain/business.md` (the offer being launched, exactly as priced and
packaged), `brain/audience.md` (the real objections this audience raises),
`brain/proof/` (results to show, not just claim), `brain/compliance.md`
(urgency and guarantee wording — launch copy leans hardest on claims and
deadlines of any type in this library, so this is the type to check against
compliance.md most carefully).

Typical length: 6-9 emails across three phases.

| Phase | Emails | Job |
|---|---|---|
| Pre-launch | 2-3 | Name the problem. Share what's coming. Build real anticipation — no manufactured hype. |
| Open | 2-3 | Announce it plainly. Explain what it is and who it's for. Answer the obvious objection. |
| Close | 2-3 | The real deadline. A last honest reminder. Then it's closed — say so, and mean it. |

## 6. Win-back sequence — `type: winback-seq`

Read: `brain/audience.md` (why someone might have drifted), `brain/ideas.md`
(the best recent content for email 2).

Typical length: 3-4 emails, escalating in directness.

| # | Approach |
|---|---|
| 1 | Curiosity, low pressure — "it's been a while, here's what you missed." |
| 2 | The best recent piece of content, no ask attached. |
| 3 | A direct, honest question: still want to hear from us? |
| 4 | The clean goodbye: say plainly what happens (removed, moved to a lower-frequency list) unless they respond. |

The actual inactivity threshold (how long counts as "gone quiet") and the
segment it applies to live in the business's sending platform, not in the
brain. If the owner hasn't stated one, draft the copy and mark
`[PLACEHOLDER: inactivity threshold — e.g. no opens in 90 days]` rather than
inventing a number.

## 7. Cart-abandon sequence (ecommerce) — `type: cart-abandon-seq`

Read: `brain/business.md` (shipping, returns, and guarantee facts — these
are exactly what a hesitant buyer needs answered), `brain/proof/` (a real
review or result to reassure).

Typical length: 2-3 emails.

| # | Timing | Job |
|---|---|---|
| 1 | ~1 hour later | A plain reminder — here's what was left, here's the link back. |
| 2 | Next day | Handle the likely hesitation: shipping, sizing, a real question. Add a review or plain reassurance. |
| 3 | 2-3 days later | Only if it's a real fit: a genuine incentive to finish, stated honestly — never invented if the business doesn't actually discount. |

The specific product left in the cart is merge-field data from the store
platform, not something this skill can see. Draft with an explicit merge
placeholder (`{{ cart.item_name }}`, or `[PRODUCT NAME]` if the business's
platform is unknown) rather than inventing an example product to write
around.

## 8. Trial-nurture sequence (SaaS) — `type: trial-nurture-seq`

Read: `brain/business.md` (the product and what's past the trial),
`brain/audience.md` (the job the trial user is actually trying to get done),
`brain/proof/` (a case study that matches that job).

Typical length: 4 emails.

| # | Timing | Job |
|---|---|---|
| 1 | Day 0 | Welcome them in. Point at the ONE action that gets to a real result fastest. |
| 2 | Day 2-3 | Check in based on what they did or didn't do. Remove the friction that's likely stopping them. |
| 3 | Day 5-6 | Show a result, feature, or story that proves the value, matched to their actual use. |
| 4 | Day 8-9 | Trial ending — make the decision plain: what happens next, and the simple next step. |

"The one action that gets to a real result fastest" is product knowledge —
if `business.md` or `brain/methodology.md` doesn't name it, ask once rather
than guessing at the product's own activation moment.

## 9. Review request — `type: review-request-broadcast`

Read: `brain/business.md` (the real contact channel and, if on file, the
Google review link), `brain/voice.md`, `brain/compliance.md` (no incentive
or gated-review language survives into the copy — Google bans both,
regardless of what prompted the ask).

Usually one email — a single, honest ask sent to real past or current
customers. When the handoff (typically `google-business` Mode 2) asks for
a short nudge sequence instead, keep it to 2 emails at most: the ask, then
one plain reminder a week or two later, never more before it starts to
feel like nagging.

Never gate the ask by how happy a customer seemed, and never offer
anything — a discount, a freebie, an entry into a drawing — in exchange
for a review; both are against Google's own policies, not a house
preference. No review link on file yet: `[PLACEHOLDER: Google review
link]` rather than a guess.
