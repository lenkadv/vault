# The cold preflight

Run this against every touch's subject and body, and against the
LinkedIn item's connection note and follow-ups, after the body is
written and before the Editor gate (`SKILL.md` Phase 5). It is a
required step, not an optional check: this is unsolicited email landing
in a stranger's inbox, so the rules that matter here are stricter than a
list send's, not looser.

This is cold-outreach's own preflight — independent of `email-write`'s
list-email deliverability check. A list send and a cold send fail in
different ways: a list send risks a spam-filter trigger inside an
established relationship; a cold send risks looking like exactly what
sends to the wrong audience actually look like, with real rules
(CAN-SPAM, and more depending on jurisdiction) attached to getting it
wrong. This file does not defer to that one, and that one does not defer
to this.

## What to do with what you find

Fix what's clearly mechanical, in the owner's voice, without asking:
capitalization, stacked punctuation, a missing opt-out line, an obviously
deceptive subject pattern. Flag what needs the owner's judgment: their
actual physical address, whether a specific jurisdiction's rules apply
to this particular list, or a results claim that needs
`brain/compliance.md`'s exact wording. Never silently soften a true,
specific claim to make a score look better — that is meaning drift, not
a compliance fix.

## A. Honest identity and a non-deceptive subject

- **Sender identity is honest.** The from-name and any signature name a
  real person at the real business — never a fictional persona, and
  never a name borrowed from elsewhere to sound more familiar.
- **The subject reflects the actual content.** No fake `Re:` or `Fwd:`
  prefix implying an existing conversation that never happened. No
  curiosity-gap subject the body does not actually pay off.

## B. The required lines

- **A physical address line.** CAN-SPAM requires one on commercial
  email. Use `[PLACEHOLDER: the business's real physical mailing
  address]` until the owner supplies one — never invent an address,
  never leave the line out, and never reuse an address filed under
  another business folder.
- **A working opt-out line in every email touch of the sequence** — not
  only the first one. Plain language is enough ("reply stop and this is
  the last one you'll get from me"); what matters is that it appears
  every time and that whoever sends this actually honors it once used.
  LinkedIn messages do not need this line — LinkedIn's own block and
  disconnect controls serve that role there; do not force an email-style
  opt-out line into a LinkedIn message where it reads oddly.

## C. Claims and personalization honesty

- **Claims about the sender's own results come only from `brain/proof/`,
  byte-exact, and only from an entry whose `approval` field says
  `approved`.** Nothing else is asserted as a result, a number, or a
  named outcome anywhere in the sequence.
- **Every `[PERSONALIZE: ...]` slot is genuinely marked, none faked.** A
  slot the drafting pass could not fill honestly stays marked — it never
  gets papered over with a generic line dressed up to look personal.

## D. Jurisdiction — one line, no legal advice

State this once, plainly, and stop there: cold email rules differ by
country — GDPR and ePrivacy add consent-based rules on top of CAN-SPAM
in the EU, and other regimes apply elsewhere. This is not legal advice.
Check what applies to your business and your recipients before sending.

This skill does not go further than that one line. It does not judge
whether a specific list is compliant in a specific country, and it never
implies it has.

## E. Sending hygiene

This does not touch how the business actually sends — that is
infrastructure the owner's own sending tool handles, not something a
drafting skill can fix from inside a markdown file. Name it once, here,
rather than turning every report into a lecture:

- **A separate sending domain**, apart from the business's main
  domain — protects the primary domain's reputation if anything about
  the cold send goes wrong.
- **Warm-up before real volume.** A brand-new domain or mailbox sending
  a full sequence on day one gets flagged fast.
- **Low daily volume per mailbox.** Cold sending tools generally cap
  this for a reason; a drafted sequence does not override that cap.
- **Stop-on-reply.** The moment a prospect replies, on email or on
  LinkedIn, the rest of that sequence stops for that person, on both
  channels — never sent on autopilot past a real response.
- **Plain text over heavy formatting or images.** A cold email that
  looks like a template — logos, banners, heavy HTML — reads as bulk
  mail before a single word is read. This is also a craft point (see
  `references/cold-craft.md`), not only a hygiene one.

## Risk rating

- **Low** — clean copy, minor suggestions only, should land in the
  inbox.
- **Medium** — a required line missing, or a subject that could read as
  deceptive. Worth fixing before this ships.
- **High** — multiple issues stacked (a missing address line, a faked
  personalization slot, an unapproved results claim). Needs a real fix,
  not a word swap.

## Report format

```text
COLD PREFLIGHT

Touch: <file name>
Subject: "<subject>"
Risk: LOW | MEDIUM | HIGH

IDENTITY  — [pass/warning/fail] sender identity honest · subject non-deceptive
REQUIRED  — [pass/warning/fail] address line present · opt-out line present
CLAIMS    — [pass/warning/fail] proof traced to brain/proof/ · personalization slots genuine

Fixed automatically:
- <what was changed and why, one line each>

Flagged for the owner:
- <what needs their judgment and why, one line each>
```

Run this once per touch, and once for the LinkedIn item's connection
note and follow-ups. A short report per item the owner actually reads
beats one long report they skim past.
