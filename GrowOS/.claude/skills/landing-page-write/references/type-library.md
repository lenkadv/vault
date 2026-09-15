# Type library

Seven types cover every page this skill writes. Three of them — sales,
opt-in, and homepage — ship with more than one structural arc, because a
single fixed section order is exactly what made earlier drafts converge on
one generic skeleton no matter how the words changed. Pick the arc the
offer, the audience's awareness, and the proof actually on file support —
never the one that is fastest to write.

This file is the operational half: which `type` value to stamp, which brain
files matter most, and the section flow for each arc or default shape.
Design direction for every section — the `Visual` line, the
`anchor`/`standard` weight, `[IMAGE:]` tags — follows the notation in
`references/craft.md`; it is not repeated here.

## Picking a type

| The page is for... | Reach for | `type` value | Arc or shape |
|---|---|---|---|
| A direct offer, buy or checkout | Sales page | `sales-page` | 3 arcs: mechanism / story / identity |
| Trading an email (or a $0-ish front-end) for something | Opt-in page | `opt-in-page` | 2 arcs: case-first / capture-first |
| Registering for a webinar, workshop, or live event | Webinar registration | `webinar-reg-page` | 1 default shape |
| The main front door of the site | Homepage | `homepage` | 3 arcs: single-offer / multi-path / authority-first |
| The story behind the business | About page | `about-page` | 1 default shape |
| A call-booked or applied-for service, usually high-ticket | Service page | `service-page` | 1 default shape |
| One product's detail/purchase page (ecommerce) | Product page | `product-page` | 1 default shape |

If the owner's words don't obviously map to one row, ask once rather than
guessing — a wrong type wastes more time than one question.

---

## 1. Sales page — `type: sales-page`

Read: `brain/business.md` (the offer, exactly as priced and packaged),
`brain/audience.md` (awareness level — the main signal for which arc fits),
`brain/proof/`, `brain/methodology.md` (the mechanism arc needs real
content here), `brain/stories/` (the story arc needs a real one),
`brain/competitors.md` (the identity arc needs a sharp position).

A sales page always sells one thing toward one primary action: buy, or
start checkout. Price and traffic temperature tune the page's length and
how much of the case gets built before the offer appears — not its type. A
$27 front-end and a $997 self-checkout offer are both `sales-page`; the $27
page compresses the early belief-building, the $997 page carries more of
it. A page where a CALL or an APPLICATION closes the sale, not a checkout
button, is `service-page` instead — see §6.

### Arc: Mechanism

Contrast-led, analytical. Names the system and lets it carry the middle of
the page; proof verifies the mechanism rather than opening on it.

Hero (the promise, the mechanism named, one proof point, the buy action) →
the gap (make the underperformance felt — don't argue it) → the reframe
(why it isn't the reader's fault; the real question this page answers) →
authority (real credibility, real experience) → the missing piece (what
the obvious fix already does, and the one thing it doesn't) → meet the
mechanism, plainly named → results proof (real outcomes, an honest
caveat) → offer + guarantee (pulled up so the buy is reachable fast, not
buried near the end) → how it works (make the process feel small) →
before/after or examples → why the price is what it is → the decision
(the fork: same effort either way, different outcome) → close (one human
note) → FAQ → footer / floating CTA.

Pick when `brain/methodology.md` has a real, nameable process to carry the
middle third. Compress the gap-through-missing-piece run for warm or
returning traffic; keep it full for cold traffic.

### Arc: Story

Opens inside one real, documented moment instead of an argument. Proof
arrives as narrative beats; the mechanism is revealed through what the
story shows, not stated abstractly.

Hero (the promise, stated plainly — don't tease it inside the story) →
cold open, mid-scene, inside one dated moment from `brain/stories/` → the
turn (what changed in that moment) → the mechanism, named as what made the
turn possible → problem mirror, short (the story already did the feeling
work) → proof block (other real outcomes) → offer stack → guarantee →
objections / FAQ → close that returns to the opening story's voice → final
CTA.

Pick when `brain/stories/` holds a real, specific, dated story strong
enough to open a whole page on — not a general anecdote stretched to fit.
If `stories/` is thin or empty, this arc is off the table: say so and pick
a different one rather than dramatizing a moment nobody documented.

### Arc: Identity

Challenger framing. Who the reader is becoming carries the page more than
any single mechanism does; for/not-for shows up early, as identity, not
gatekeeping.

Hero (names who the reader is becoming, not just what they get) →
for/not-for, early and short → the old way (what the reader's current
approach, or the competition, already runs — grounded in
`brain/competitors.md`) → the contrast (why this reader doesn't belong in
that category anymore) → the mechanism, briefly (this arc sells a
position more than a system) → proof (people who made the same move) →
offer stack → guarantee → FAQ → close that speaks to the identity, not
just the transaction → final CTA.

Pick when `brain/competitors.md` gives a real, sharp, ownable position and
`brain/audience.md` shows a genuine "who they want to become" — not a
vague aspiration invented to make the arc fit.

---

## 2. Opt-in page — `type: opt-in-page`

Read: `brain/business.md` (the lead magnet or front-end offer, and its
price if any — most are $0), `brain/audience.md` (awareness and traffic
temperature, the main signal for which arc fits), `brain/proof/`.

### Arc: Case-first

Builds the case before the ask. Right for cold or only-warm traffic that
needs to understand what they get and why before handing over an email
address.

Hero (event or offer facts if any + headline + the one-line "what you
leave with" + the CTA, with price and logistics if there are any) →
problem mirror, short → what happens / the concrete outcome → why this is
different (one mechanism block — cold traffic gets one belief break here,
not five) → proof strip → for/not-for, short → offer recap (plus a bump or
upgrade line if the business has one) → guarantee, if the offer has one →
FAQ from real questions → final CTA.

### Arc: Capture-first

Minimizes friction. Right for warm-to-hot traffic (an ad, a referral, a
known audience) that already understands the offer — the job is removing
friction, not building a case.

Hero as a two-part layout: the name+email field visible immediately on one
side, proof or a short video on the other → a plain "1. enter your
details, 2. get it" step strip under the form → avatar stack + one line of
real social proof → a short reinforcement block below the fold (2-3 lines
on what they get, for anyone who scrolls) → FAQ, short, only if real
objections exist.

Both arcs: step 2 of any step strip names the real next action — "save
your seat," "get the replay link," or the price — set from what the offer
actually is, never invented as a default "pay $X."

Pick between the two on traffic temperature and awareness from
`brain/audience.md`, not on preference: cold or only-warm gets case-first,
warm-to-hot gets capture-first.

---

## 3. Webinar registration page — `type: webinar-reg-page`

Read: `brain/business.md` (the event and what it leads to),
`brain/audience.md`, `brain/proof/`.

One default shape — the opt-in case-first backbone, adapted for an event.
The event-logistics blocks below (date/time/timezone, countdown, replay
framing) come from general marketing craft, not mined precedent; say so
if asked why this type has no arc choice while opt-in does.

Hero (date, time, timezone, and what they'll leave with — up front, not
buried) → problem mirror, short → what you'll learn or walk away with,
concrete and session-shaped → why this is different / the presenter's
angle → proof strip → who it's for → logistics block (date/time/timezone,
replay availability if the business offers one) → FAQ (timing, replay,
cost if any) → final CTA with a calendar-add reminder line.

---

## 4. Homepage — `type: homepage`

**House default v1.** No source in the mined canon defines a homepage
structure; these three arcs are designed from the copy/design split and
general craft, not mined from prior work. Say so plainly if the owner
asks where they came from.

Read: `brain/business.md` (how many real offers are active),
`brain/audience.md` (how many real personas this homepage has to serve),
`brain/proof/`, `brain/methodology.md`.

A homepage's job differs from a sales page's: it usually serves more than
one traffic source and more than one intent at once, so routing and
trust-building often matter as much as any single argument.

### Arc: Single-offer

Right when `brain/business.md` shows one clear flagship offer and
`brain/audience.md` shows one dominant persona — the homepage can act
almost like a soft sales page.

Hero (the promise, one proof point, one primary CTA) → who it's for,
short → how it works → proof (results, logos, testimonials) → the offer,
plainly, at a glance (not a full stack — that's the sales page's job) →
FAQ, short → final CTA.

### Arc: Multi-path

Right when more than one real persona or more than one active offer
exists — the homepage's job is routing each visitor to the right deeper
page, not closing anything itself.

Hero (the one promise true for everyone, kept intentionally broad) → a
path router (2-4 cards mapped straight to the personas in
`brain/audience.md`: "if you're X, go here") → broad proof (logos or
stats that hold across every persona) → how the business works, one level
up from any single offer → a light touch on the featured offer(s),
pointing deeper rather than closing → a short trust strip (the full story
lives on the about page) → final CTA, usually softer than a sales page's
("see how it works" more than "buy").

### Arc: Authority-first

Right when trust has to be earned before any offer lands at all — a
high-consideration purchase, or a skeptical, competitive audience.

Hero (the point of view — the one belief that makes this business
different, not a feature) → proof of expertise (methodology, real
results, samples of the actual work) → the offer(s), introduced only
after that trust is built, still light-touch → a path router if more than
one persona exists → final CTA.

Pick this arc only when `brain/proof/`, `brain/stories/`, or
`brain/methodology.md` genuinely have the depth to carry a page that
leads with proof before any offer. A thin `proof/` folder makes this the
wrong arc — pick single-offer or multi-path instead and say why.

---

## 5. About page — `type: about-page`

**House default v1.** No about-page precedent exists in the mined canon;
designed from general craft: an about page is the story that sells trust,
not a resume.

Read: `brain/stories/` (the origin story lives here, if it exists),
`brain/business.md`, `brain/methodology.md`.

One default shape: hero (the one line capturing why the business exists)
→ the origin story, real and specific, from `brain/stories/` (one
documented moment, not a generic "founded in..." paragraph) → what that
moment changed, or the belief it left behind (the "why this way of
working") → how the business works today, plainly (the methodology) → the
people, real, from `brain/business.md` or `brain/assets/` — never an
invented bio or headcount → proof (a few real results or testimonials —
trust markers, not a full case-study wall) → values or standards, only if
the business has actually stated them somewhere in the brain (skip the
section entirely rather than write generic "integrity, excellence,
innovation" filler) → the invitation (a soft CTA matching whatever this
business's natural next step is) → FAQ, only if real recurring questions
about the business itself exist.

If `brain/stories/` has nothing usable, this page cannot open on a
documented moment — say so, and open on the plainest honest version
instead: what the business does and why, straight from `brain/business.md`.

---

## 6. Service page — `type: service-page`

Read: `brain/business.md` (the service and its real price bracket),
`brain/proof/` (needs real case-study depth — see the note below),
`brain/audience.md` (the qualifier's for/not-for lines),
`brain/competitors.md`.

For a service where a CALL or an APPLICATION closes the sale, not a
checkout button — usually high-ticket. One default shape, mined faithfully
from a call-booked backbone that three independent sources agreed on:

Hero, dark (names the expensive problem) → who this is for / the real
cost of the problem → authority, heavy and real (credentials, track
record — never inflated) → the transformation (before/after of real
clients, from `brain/proof/`) → how it works / what actually happens
(demystify the service) → proof: 2-3 deep case studies (named client,
starting point, what was built, the result) rather than a wall of
one-line pull-quotes → the qualifier (two columns: "this is for you if" /
"not for you if") → what happens on the call (3-4 plain steps, so it
doesn't read like a sales ambush) → book/apply — the conversion section →
guarantee tuned to a service (completion or satisfaction framing, or
"first call free" — never "keep the file," which is digital-download
language) → FAQ (the real high-ticket objections) → a personal close.

CTA ladder across the page, no price on any button: "see if you qualify"
(hero) → "book your call" (mid-page) → "apply now" (the conversion
section) → "book your call" again (the close).

Proof note: this shape leans on 2-3 deep case studies, not testimonial
density. A thin `proof/` folder — a few one-line quotes and nothing
more — cannot carry this shape honestly. Say so, write what proof actually
exists, and flag the gap rather than inflating one quote into a "case
study."

---

## 7. Product page — `type: product-page`

**House default v1.** No product-detail-page precedent exists in the
mined canon ("meet the product" appears only as one step inside a sales
page); designed from general ecommerce craft: an offer stack plus real
objections handled directly.

Read: `brain/business.md` (the product, price, what's included),
`brain/proof/` (reviews, real), `brain/audience.md` (the real objections
to answer).

One default shape: hero (the product, the one promise, price, the
primary buy action, immediate proof if it's real — a rating or review
count) → what it is / what's included, plainly (the offer stack: contents,
specs) → how it works or how to use it, when the category needs that →
proof (real reviews or testimonials, verbatim) → objections, handled
directly (shipping, sizing or fit, quality concerns, how it compares —
whatever `brain/audience.md` actually lists; never a generic objection
list) → guarantee or return policy, exactly as the business offers it →
final CTA, restated.

---

## Where each shape came from

Sales, opt-in, and service are mined faithfully from the owner's own prior
landing-page skills, where three independent versions agreed on the
shape. Webinar-reg reuses the opt-in backbone with event-logistics blocks
added from general craft. Homepage, about, and product had no direct
precedent anywhere in the source material — they are house defaults, v1,
designed from the copy/design split and general marketing craft. None of
that is a secret; say which kind a shape is if the owner asks.
