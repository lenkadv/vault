# Cold craft — how the sequence actually works

This is the mechanics behind `SKILL.md` Phases 2 through 4: how to rotate
angles across a 3-5 touch sequence, how to write a subject line that
earns an open instead of a delete, how the LinkedIn variant differs from
the email touches, and how to build a personalization slot that actually
does something. Read it once when the sequence map goes together
(Phase 2), and keep it open through drafting (Phases 3 and 4).

## The touch pattern: one angle per touch

A sequence that repeats the same pitch in different words is the single
most common cold-outreach failure. Each touch earns its send by giving a
reader who ignored the last one a genuinely new reason to look, not a
rephrase of the old one.

| Touches | Rotation |
|---|---|
| 3 | Problem -> Proof -> Breakup |
| 4 | Problem -> Proof -> Different angle -> Breakup |
| 5 | Problem -> Proof -> Different angle -> Another angle or proof point -> Breakup |

**Problem (touch 1).** Name a real, specific problem the ICP has, in
language they would use themselves — pull it from `brain/audience.md`,
not a generic industry pain point. Little to no pitch yet; the point is
recognition, not persuasion. This is usually where the sequence's
personalization slot lives, connecting this specific prospect to this
specific problem.

**Proof (touch 2).** A specific instance of the business solving this
exact problem before — a real result from `brain/proof/`, or a real
mechanism from `brain/methodology.md` when no proof entry fits this
angle. Show the work; do not just assert that it works.

**Different angle (touch 3, and the extra slot in a 5-touch run).** A
reader who skipped touches 1-2 usually had a real reason: wrong time,
wrong framing, too busy to notice. Reframe entirely — a different
consequence of the same problem, a different stakeholder's angle on it,
a genuine trigger event if the owner named one (new hire, funding,
expansion), or a real objection from `brain/audience.md` addressed head
on. If `brain/competitors.md` names a gap this business genuinely fills,
that can be this touch's angle too — factual and specific, never
trash-talk. This is not the same pitch with different adjectives; it is
a different reason to care.

**Breakup (last touch, whatever the count).** Acknowledge the silence
without guilt-tripping, offer one small piece of value or leave a clean
door open, and mean it. The reason a breakup email works is that it
genuinely asks for nothing — no "last chance," no manufactured urgency —
which is exactly why it often gets the reply the first three didn't.

## Body mechanics for every touch

- **Length: roughly 50-125 words**, sign-off excluded. Shorter than any
  list-email type this business sends — a stranger has not earned the
  business's longer voice yet.
- **One CTA, reply-oriented over click-oriented.** On the first two
  touches especially, ask for a reply, not a click or a meeting booking
  — a link asks for more trust than a stranger has extended yet, and a
  reply is both the cheapest next step and the strongest real signal. A
  call or meeting ask can appear later, once real interest has shown, but
  never as the opening ask.
- **No wind-up.** Skip "Hope you're doing well" and any other
  throat-clearing; spend the first line on the actual point. A reader
  decides whether to keep reading in that first line.
- **Grade-8 or plainer, in the business's real words** — see `SKILL.md`'s
  "cold register" note. Short paragraphs; one idea per paragraph.
- **Sign-off:** a first name alone, unless `brain/voice.md` says
  otherwise. No logo-and-banner signature block — it reads as bulk mail,
  not a person.

## Subject-line craft

- **2-4 words**, lowercase or sentence case unless `brain/voice.md`
  states a house-style override.
- **No urgency words, no emojis, no stacked punctuation, and no
  recipient name.** A name in a cold subject line reads like a
  mail-merge tell, not a personal touch — leave it out.
- **Internal-looking, not marketing-looking.** It should read like
  something a colleague would actually send, not a campaign.
- **True to the body.** Never a curiosity gap the message doesn't pay
  off in the first line or two.
- **No fake `Re:` or `Fwd:` prefix.** Beyond the compliance problem this
  causes (see `references/compliance-deliverability.md`), it is a craft
  failure too — the moment it's noticed, the trust it borrowed is gone
  for the rest of the sequence.
- **2-3 options per touch**, reaching for genuinely different angles, not
  three phrasings of the same idea. Cold subject lines have a narrower
  honest range than a newsletter's; a forced 4th or 5th option is
  usually padding.

## The LinkedIn variant

### The connection note

- **No pitch, no CTA, no link.** Its only job is to earn the accept. A
  connection note that pitches in the same breath reads as exactly what
  it is — a cold email wearing a different platform — and converts
  worse than either would alone.
- **A real, specific reason to connect**, never a generic line ("I'd
  love to connect and learn more about your work"). Shared context, a
  specific detail, a genuine reason a real person would give.
- **Stay well inside the platform's live character cap.** LinkedIn's
  connection-note box currently runs narrow — roughly 200-300
  characters — but this is a platform UI limit that moves without
  notice. Check the box's own live counter when the note is actually
  sent rather than trusting a remembered number.
- Never open with a compliment that is really a pitch in disguise
  ("Loved your recent post — by the way, we help companies like yours
  do X"). That is a pitch with a compliment bolted on the front, not a
  genuine reason to connect.

### Follow-up etiquette

- **Wait for the accept.** Never message before the connection is
  confirmed.
- **Give it a beat after accepting** — a day or two, not immediately.
  An instant follow-up reads as automated, which is the one thing
  LinkedIn outreach cannot afford to look like.
- The follow-up carries the actual angle and the one CTA, with its own
  personalization slot when it needs one — it does not just repeat the
  connection note's reason for connecting.
- **Keep the run shorter than the email sequence.** LinkedIn tolerates
  less "sequence" energy before it reads as spam DMs; one follow-up, two
  at most, is a reasonable default, and it does not need every angle the
  email sequence uses.
- If a reply comes in on either channel, stop sending on both for that
  person — see the stop-on-reply rule in
  `references/compliance-deliverability.md`.

## Personalization-slot craft

### The marking convention

Always this shape: `[PERSONALIZE: what to look up — e.g. their recent
post topic]`. The bracket names WHAT to look up, never a filled-in
guess. A slot that already contains a guessed name, a guessed company
detail, or a fact dressed up as confirmed is not a personalization slot
— it is an invented detail wearing the notation, and that is exactly
what this skill must never do.

### Slots that survive being filled simply

A slot fails if the sentence around it only works with an unrealistically
rich, hard-to-find detail. Build the sentence so a plain, easy-to-find
fact — a job title, an obviously public fact, the TOPIC of a recent post
rather than its exact wording — still lands naturally when someone fills
it in for real.

### The stripped-line test

Read the touch with the personalized line deleted. If it reads exactly
the same and still makes complete sense, the personalization was
decorative, not load-bearing, and needs a rewrite so the next sentence
actually depends on it.

**Decorative (fails the test):**
> [PERSONALIZE: their recent post topic]
> Hope things are going well at [Company]. Anyway — we help teams like
> yours cut onboarding time in half.

Strip the first line: the pitch reads identically. It was a name pasted
on top of a template.

**Load-bearing (passes the test):**
> [PERSONALIZE: their recent post topic]
> You flagged that onboarding still takes your team three weeks. That's
> almost exactly the gap we built [Product] to close.

Strip the first line: "That's almost exactly the gap..." now dangles
with nothing to refer to. The sentence needs the personalized line to
make sense — proof the personalization was actually doing work.

### How many, and where

One slot is usually enough, almost always in touch 1's opening. A later
touch can carry a second slot only when there is a genuinely new, real
detail to hang it on — never a second slot invented just to look
personal twice.

## The self-check bar (run before the Editor gate)

Walk this before Phase 6 — catching these here means the gate finds
less, and less rework either way.

1. Every touch's one CTA is a single, clear ask — never two competing
   asks in the same message.
2. Every personalization slot passes the stripped-line test above.
3. No claim about the sender's own results appears anywhere without a
   byte-exact, approved `brain/proof/` entry behind it.
4. Every subject line is true to the body it introduces — nothing reads
   as a tease the message does not pay off.
5. Nothing in the sequence reads like the same pitch reworded three
   times; each touch's angle is genuinely different from the others.
6. Grade-8 or plainer, short paragraphs, no wind-up, sign-off matches
   `voice.md` (or a first name alone, if `voice.md` is silent on this).
7. Nothing here is copy-pasted from a swipe file or research material
   without being rewritten in this business's own voice — reference
   material is for structure and technique, never a source to lift
   sentences from.
