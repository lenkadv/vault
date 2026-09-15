# GBP craft

Everything in this file is stable, long-standing Google Business Profile
behavior — not a claim about today's exact button labels or pixel counts,
which Google changes without much notice. Where a detail could have
shifted since this was written, this file says so and points at checking
the live dashboard instead of asserting a number that might already be
stale.

## Post kinds

GBP groups what a business posts to its profile into a few kinds. This
skill drafts the three long-standing ones:

### Update

The plain, general-purpose post — sometimes labeled "What's new" in the
composer; check your dashboard for its current label. A tip, a piece of
news, a plain announcement, anything not tied to a specific offer or a
specific date range. The easiest kind to reach for, and the right default
when nothing more specific fits.

### Offer

A specific, time-boxed deal. GBP's Offer post carries its own fields
beyond the plain text: a start date, an end date, and usually room for
terms and conditions and a coupon code. Fill all of these from
`brain/business.md` or what the owner gave directly — never invent an end
date, a discount amount, or a code. An offer with no real end date is not
ready to post as an Offer; either get the real date or post it as an
Update instead.

### Event

Tied to something happening at a specific time — a sale event, a
workshop, an open house, a seasonal happening. Carries a start and end
date and time. Same rule as Offer: the date and time come from what the
owner actually gave you, never a guess.

## Length and format norms

- GBP currently allows a post of roughly 1,500 characters. Treat that as
  a ceiling, not a target — most posts read better well under it.
- Posts get truncated before a reader sees the whole thing on several
  surfaces (a shorter preview with a "read more"). Front-load the actual
  message in the first sentence or two; do not save the point for the
  end.
- Post text renders as plain text — GBP does not support bold, italics,
  bullet lists, or the kind of line-break-heavy formatting a document
  allows. Write it the way you would say it, not the way you would format
  a memo.
- One clear idea per post. A single post trying to announce a sale,
  mention a new hire, and wish everyone a happy holiday does none of the
  three well — that is three posts, or none.
- Emoji and hashtags are allowed on a GBP post, but they are not the norm
  the way they are on Instagram or X. Sparing, or none, is the safer
  default absent a specific instruction in `brain/voice.md` or
  `brain/brand.md`.

## Call-to-action buttons

GBP currently offers a small, fixed set of call-to-action buttons on a
post — things like **Book**, **Order online**, **Buy**, **Learn more**,
**Sign up**, and **Call now**, with **Get offer** specific to an Offer
post. Not every button shows for every business category or every post
kind, and the exact list in the composer is Google's to change — check the
button list in your dashboard before building a post's copy around one
that might not actually be offered to this business.

Whatever button gets picked, its destination — a URL, a phone number — is
real or it does not go in the post. Pull it from `brain/business.md` or
`setup.md`. Nothing on file for what a button should point to: use
`[PLACEHOLDER: the link or number this button should point to]` and say
so, rather than sending a reader to a guessed-at URL.

## Local hooks — place, season, neighborhood

A "local hook" is the detail that makes a GBP post sound like it came
from an actual business at an actual address, not a template stretched
across every city a franchise operates in. It is also the single easiest
place for an AI draft to quietly invent something that sounds plausible
and is not true. The rule has no exceptions: **a local hook comes from
`brain/business.md`, or it does not appear in the post.**

What counts as real material to use:

- A neighborhood, city, or service area `business.md` actually names.
- A season or holiday `business.md` ties to something real — a seasonal
  offer already on the ladder, a slow or busy time of year the owner
  mentioned, hours that change for a real reason.
- A landmark, street, or local detail `business.md` itself states as part
  of how the business describes where it is or what it serves.

What never goes in a post, no matter how natural it would sound:

- A neighborhood name, landmark, or "local favorite" spot invented
  because it sounds right for the business's city.
- A weather or seasonal detail with no real tie to anything in
  `business.md` — "as the leaves turn" dressing up a post that has
  nothing actually seasonal to say.
- A claim about how long the business has served an area, or how
  well-known it is locally, unless that is a hard fact in `business.md`.

No local material on file at all: write the post without a local hook. A
plain, honest Update beats a post that sounds local but is quietly made
up — and it is exactly the kind of thing a customer who actually lives
there would notice was wrong.

## Image guidance

A GBP post with a real, relevant image is worth having over a bare-text
one — a picture gives a reader something to look at before they decide to
read the words. GBP asks for a landscape or square image; check the exact
current pixel guidance in your dashboard's upload prompt, since it can
shift. A blurry, tiny, or off-topic stock-feeling image is worse than no
image at all.

This skill never renders an image itself. For each post, write what the
image should show, its mood, and any on-image text, then hand off to
`image-create`, naming the post item the visual is for. If `image-create`
is not installed in this workspace, say so plainly rather than pretending
a visual got made — a text-only post is a normal, fine fallback, not a
failure.
