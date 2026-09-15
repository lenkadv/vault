# Template catalog

26 template concepts (29 files counting size variants), picked from a much larger set and kept
because each does something genuinely different. Every template renders with plain headless
Chrome, no AI, no account, nothing to install. See `RENDER.md` for the render command and how
`tokens.css` controls the look of all of them at once. See `../PLAYBOOK.md` for how to pick a
format instead of guessing.

## How to read this table

- **Photo required** marks templates that need a real photo (yours or a customer's) to look
  finished. Everything else renders complete with zero assets.
- **Best for** is the job the format does, not a niche. Match it to your awareness stage: a
  problem-aware audience needs to see themselves in the picture; a solution-aware audience needs
  to see the after; an offer-aware audience needs the price and the proof.
- Every template ships with placeholder or bracketed `[text like this]` copy. Replace it with your
  own before you ship anything. Never leave a bracket on a live ad.

## Native-surface mockups (chat, feed, and comment sections)

These read as organic content, not ads, because they borrow the visual grammar of a real app
screen. No logo or URL is baked into any of them.

| Template | What it looks like | Best for | Photo required | Sizes |
|---|---|---|---|---|
| `imessage` | A text thread: a friend asks how you're keeping up, you reveal what changed | Word-of-mouth, relatability, solution-aware reveal | Yes (small contact photo) | 1080x1350, 1080x1920 |
| `community-comment` | A community post with a member's comment and a founder reply underneath | Social proof, peer recommendation, trust | Yes (founder photo, small) | 1080x1350 |
| `reddit-post` | A forum thread: an upvoted post plus one top comment | Peer recommendation, skeptical-audience proof | No | 1080x1350 |
| `tweet` | A single post on a text-first social feed, with engagement counts | Hot takes, announcements, quotable one-liners | Yes (small avatar) | 1080x1350 |
| `youtube-comments` | A video thumbnail with two comments underneath asking real questions | Curiosity, social proof without fabricated praise | No | 1080x1350 |
| `chatgpt` | A chat assistant answering a question by describing your offer | Positioning, "even the AI recommends it," curiosity | No | 1080x1350 |

## Testimonials

| Template | What it looks like | Best for | Photo required | Sizes |
|---|---|---|---|---|
| `testimonial-dark` | Centered circular photo, five stars, one large serif quote on a dark background | Premium trust, works with almost any face crop | Yes | 1080x1080, 1080x1350, 1080x1920 |
| `testimonial-light` | A bright card: verified badge, five stars, serif quote, avatar and role | Trust, approachable/warm brand feel | Yes | 1080x1350 |
| `testimonial-review` | A review card with a "verified customer" badge and a bolded key phrase in the quote | Trust plus credibility (verification signal) | Yes | 1080x1350 |

## Founder and authority

| Template | What it looks like | Best for | Photo required | Sizes |
|---|---|---|---|---|
| `founders-letter` | A handwritten note on coffee-stained paper, signed | Founder authority, honesty about price, story | No (illustrated paper, not a photo) | 1080x1350 |
| `linkedin-founder` | A founder quote card styled as a professional feed post | Founder authority, credibility, a literally-true claim | Yes | 1080x1350 |

## Curiosity and pattern-interrupt

| Template | What it looks like | Best for | Photo required | Sizes |
|---|---|---|---|---|
| `finder-tree` | A file browser window with a hand-drawn arrow annotating one folder | Mechanism explainer, "here's how it actually works" | No | 1080x1350 |
| `trash-dialog` | A system confirmation dialog: "Move [X] to Trash?" with the cursor on Delete | Zero-sell pattern-interrupt, no pitch at all | No | 1080x1350 |
| `curiosity-redacted` | A bold statement with one key word blacked out like a redaction | Curiosity hook, forces a second look | No | 1080x1350 |
| `curiosity-visual` | One oversized, satisfying object (a giant checkbox) alone in a dark frame | "Wait, what?" pattern-interrupt, minimal copy | No | 1080x1350 |
| `notification-summary` | A phone lock screen with a stack of "while you were busy" notification cards | Relatability, the relief of things handled without you | No | 1080x1350 |
| `screen-time-drop` | A phone usage-report chart showing a category collapsing after a change | Data-native transformation, quantified before/after | No | 1080x1350 |
| `review-queue` | A kanban board with a column of cards "waiting for your OK" | Mechanism, the human-in-the-loop promise, product-mirror | No | 1080x1350 |

## Meme and relatability

| Template | What it looks like | Best for | Photo required | Sizes |
|---|---|---|---|---|
| `alignment-chart` | A 2x2 self-identify grid: four named personas, one highlighted "exit" quadrant | High-share "which one are you," problem-aware diagnosis | No | 1080x1350 |
| `starter-pack` | A labeled flat-lay grid of six relatable pain objects | Relatability, humor, problem-aware recognition | No | 1080x1350 |

## Offer and proof

| Template | What it looks like | Best for | Photo required | Sizes |
|---|---|---|---|---|
| `bento-offer` | A five-tile grid: price, mechanism, personalization, channel coverage, proof stat | Offer-aware close, price plus proof in one frame | No | 1080x1350 |
| `feature-callout` | A centered laptop with radiating hand-drawn callouts naming what it does | Offer/mechanism explainer, one visual + a price line | No | 1080x1350 |
| `output-grid` | A 3x3 grid of tiny deliverable mockups: newsletter, ad, post, and so on | Output-proof, "here's everything that shipped this week" | No | 1080x1350 |
| `product-hero` | A polished floating card on a gradient background, "waiting for your OK" | Premium offer-aware close, product-mirror | No | 1080x1350 |
| `single-stat` | One huge real number with a one-line label and context | Authority at a glance, a single proof point | No | 1080x1350 |
| `text-card` | A bold positioning claim in large serif type on a dark background | Hook, brand statement, positioning-aware audiences | No | 1080x1350 |

## Notes on "photo required"

Every photo slot points at `assets/placeholder-avatar.svg` by default, so every template renders
complete even with zero setup. Swap the `src` for a real photo before you ship: a square, evenly
lit headshot works best for the circular crops (`testimonial-*`, `linkedin-founder`,
`community-comment`), and a smaller casual photo works fine for the `imessage` contact avatar.

## What got left out, and why

The source library had roughly 59 approved templates; this catalog keeps 26. The other ~33 were
cut for one of these reasons, not for low quality:

- **Direct duplicates of a stronger template already on the list.** Several native-app mockups did
  the same emotional job as one already here (a second and third messaging-app reveal, three
  variants of the same "select all squares" grid, two content calendars, four different "everything
  is checked off" to-do screens, two Finder-folder-with-arrow shots). One good version beats three
  similar ones in a curated set.
- **Third-party product UI recreated at high fidelity.** A couple of formats leaned on a specific
  real product's distinctive interface (a search-results page, a puzzle-grid captcha) closely enough
  that reskinning them risked both a worse result (the UI reads as broken without the real branding)
  and unnecessary trademark proximity for a resold product. `chatgpt` stayed in because a plain
  chat-bubble layout has no real distinctive trade dress to borrow.
- **Audience-narrow.** A dark-terminal "hacker" mockup and a literal AI-coding-CLI screenshot only
  land with a technical audience; most Meta ads customers are not selling developer tools.
- **Fragile to reskin well.** A mid-edit filename-rename animation and a hand-annotated screenshot
  both depend on precise, fiddly detail to read correctly, and break easily when the underlying copy
  changes length.
- **One extra testimonial layout** (`testimonial-photo`, a big face-forward photo over a solid
  panel) was dropped because it demands a specific high-quality photo crop to look right, and the
  same job is already covered by `testimonial-dark`, which is explicitly crop-robust.
- **A messy-desk lifestyle photo format** needs an unusual staged prop shot (a cluttered desk) that
  is harder for most customers to source than anything else on this list, for a payoff already
  covered by `screen-time-drop` and `calendar`-style contrast formats.

If one of these formats sounds right for your business anyway, the mechanic still works. Build it
fresh from the closest template on this list: copy the file, keep the layout, replace the content.
