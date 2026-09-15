# Deliverability preflight

Run this on every email — single or in a round — after the body is written
and before the Editor gate (SKILL.md Phase 4). It is a required step, not an
optional check: an email that never reaches the inbox never gets read,
whatever the copy says.

This does not touch how the business actually sends (SPF/DKIM/DMARC,
domain warm-up, list hygiene) — that is infrastructure the owner or the
`publish` skill's connection handles, not something a drafting skill can fix
from inside a markdown file. Where it's relevant, name it once at the end;
do not turn every report into a sending-infrastructure lecture.

## What to do with what you find

Fix what's clearly mechanical, in the owner's voice, without asking:
capitalization, stacked punctuation, an obviously swappable spam-trigger
word, a subject over length. Flag what needs the owner's judgment: a
genuine deadline or guarantee claim that reads urgent because it's true, a
claim `brain/compliance.md` says needs specific wording, or anything where
softening the language would also soften a fact the business actually
wants stated. Never silently delete a real deadline or a real number to
make the score look better — that is meaning drift, not a deliverability
fix.

## A. Subject line

- **ALL CAPS words** — any fully capitalized word. One is borderline, three
  or more is high risk.
- **Stacked or excessive punctuation** — `!!!`, `???`, `!?!?`.
- **Spam-trigger words and phrases** — watch for: free, guarantee(d), act
  now, limited time, click here, buy now, order now, don't miss, urgent,
  congratulations, winner, prize, no obligation, risk-free, 100%, lowest
  price, cash, credit, discount, extra income, earn money, double your,
  million, billion. A trigger word isn't automatically wrong — "free
  shipping" in a real promo is fine — but it raises the bar for everything
  else in the subject to look clean.
- **Deceptive patterns** — a fake `Re:` or `Fwd:` prefix, or a subject that
  promises something the body doesn't deliver.
- **Length** — flag over ~60 characters (many clients truncate) or under
  ~20 (can read as spammy or incomplete).
- **Emoji overuse** — more than 1-2 in the subject line.

## B. Body content

- **Spam-trigger density** — a short email packed with sales-heavy words
  from the list above reads as promotional even if no single word is
  extreme.
- **Link count** — flag more than 3 unique links, excluding the
  unsubscribe link. Every extra link past that raises spam-filter risk and
  dilutes the one CTA this email should have anyway (`references/craft.md`).
- **Text-to-image balance** — an email that's mostly image with little
  real text tends to land in spam or the promotions tab. Recommend at least
  roughly 60% text to 40% image if the business's template leans
  image-heavy. This skill drafts text, not the final HTML render, so note
  this as a build reminder rather than something to fix in the markdown.
- **HTML complexity** — if the business's send template is known to use
  heavy HTML, embedded CSS, or scripts, note that simpler markup delivers
  better. Not this skill's file to fix; a note for whoever builds the send.
- **Unsubscribe link** — remind that every send needs one. Required by
  CAN-SPAM and GDPR, and every ESP enforces it, so this is a note, not
  something the draft itself needs to contain.
- **Sender name consistency** — a reminder only: changing the "from" name
  often hurts deliverability over time.

## C. Formatting red flags

- More than 2 exclamation marks anywhere in the body.
- Colored text (red or green especially) — a classic spam signal.
- Extreme font sizes — very large for emphasis, or very small (hiding
  text triggers filters even when nothing is actually hidden).
- Any full sentence in ALL CAPS, even once.
- A big or heavily-emphasized dollar amount written as `$997`, or `$$$$`
  patterns — spell it out ("997 dollars") or rephrase, in the subject line
  and any bolded or headline line. A small, plain price mentioned in passing
  in body text (`$18 a bag`) is fine as-is; this rule is about a price used
  as a shout, not every dollar sign.

## D. Content patterns

- **Stacked pressure language** — "act now," "last chance," "expires
  tonight," "only 3 left." One real deadline is fine; stacking several
  pressure phrases in one email reads as manufactured urgency even when the
  deadline itself is genuine.
- **Absolute promises** — "guaranteed results," "100% satisfaction,"
  "risk-free." These are spam-filter magnets AND a compliance question —
  check `brain/compliance.md` before keeping one, whatever the risk score
  says.
- **"Add us to your contacts"** — reads as desperate in a cold or early
  email; fine only deep into a welcome or nurture sequence once real trust
  exists.
- **Excessive merge fields** — too many personalization tokens in one
  email reads as templated to filters, ironically.

## Risk rating

- **Low** — clean copy, minor suggestions only, should land in the inbox.
- **Medium** — several triggers that could trip strict filters (corporate
  mail gateways, Gmail's promotions tab). Worth fixing before it ships.
- **High** — multiple strong spam signals stacked together. Likely to hit
  spam or promotions. Needs a real rewrite, not a word swap.

## Report format

```text
DELIVERABILITY PREFLIGHT

Subject: "<subject>"
Risk: LOW | MEDIUM | HIGH

SUBJECT — [pass/warning/fail] caps · punctuation · trigger words · length
BODY    — [pass/warning/fail] link count (<n> found) · spam density · formatting

Fixed automatically:
- <what was changed and why, one line each>

Flagged for the owner:
- <what needs their judgment and why, one line each>
```

Keep the report short. A five-line report the owner actually reads beats a
thorough one they skim past.
