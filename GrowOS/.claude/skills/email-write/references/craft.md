# Craft — how to actually write the thing

`system/creative-library/email-types.md` gives the shape. `system/creative-library/hooks.md`
gives ten opening patterns that work for subject lines and first lines alike.
This file is the mechanics between them: how to run the subject-line pass,
how to keep a sequence from repeating itself, and the bar a draft clears
before it goes to the Editor gate.

## One reader, not a broadcast

Write to the one person reading this on their phone, mid-scroll, not to "the
list." A list of ten thousand is still opened by one person at a time. The
email earns its place in that inbox the same way a text from a person would:
by being specific, by sounding like someone who actually did the thing it
describes, and by asking for exactly one thing.

## Subject lines: write 3-5, across different angles

A single subject line is a guess. Three to five, each reaching for a
different angle, is a real choice. Pull from `system/creative-library/hooks.md`
and vary which pattern each option uses — do not submit five variations on
the same hook. A useful spread:

- A direct question (hook pattern 1)
- A specific number or event, not a vague tease (hook pattern 6 or 7)
- A named concept or bold claim the business can defend (hook pattern 2)
- A genuine personal tension or confession, when the type allows first-person
- A curiosity gap that does not give away the answer (hook pattern 8)

Mechanics that hold across all of them:

- Roughly 4-8 words, or under ~50 characters — many clients truncate past
  that, and a longer subject reads like a headline, not a message from a
  person.
- Lowercase or sentence case reads more like a real message than Title
  Case, but this is a voice call, not a rule — check `brain/voice.md` for a
  house-style override before defaulting to it.
- No ALL CAPS words, no stacked punctuation (`!!!`, `???`), no spam-trigger
  words — cross-check against `references/deliverability.md` before locking
  one in, not after.
- The subject has to be TRUE to the body. A subject that promises one thing
  and delivers another earns the open and loses the trust; that trade is
  never worth it.

Pick one as the recommendation; keep the other options you drafted in the
item body under "Also considered" (`references/output-contract.md`) so the
owner can swap at review without a re-draft.

## Preview text extends, never repeats

The preview text is the second line of the pitch, not an echo of the first.
It should add a piece of information the subject didn't give — a specific
detail, a twist, a reason. If the preview just restates the subject in
different words, it wasted the second-most-visible line in the inbox.

## Opening lines: no wind-up

Never open with "Hey [Name], hope this email finds you well" or any
throat-clearing before the actual point. The reader decided whether to keep
reading in the first line; spend it. Pull an opening move from
`system/creative-library/hooks.md` rather than reaching for a stock greeting.

For a sequence specifically: read the last 2-3 emails already sitting in
`work/email/` (any status) before picking an opening move, and do not reuse
whichever move the most recent one or two used. A sequence where every email
opens the same way reads like a template, however good any single email is.

## One argument per email

Before drafting the body, write the email's argument as a single plain
sentence: the one thing this email is trying to land. If that sentence would
fit unchanged into one of the last 2-3 emails already sent or drafted, it is
not a new argument — find a different angle on the topic, or hold the topic
for later. This check matters most in `nurture-seq` and `newsletter`, where
the same three or four good ideas otherwise get reworded and resent for
months without the reader ever noticing they've heard it before.

If the business has a `brain/lessons/` entry naming an argument, phrase, or
opening it has worn out, treat that the same way — it is a standing
correction, not a one-time note.

## Narrative shape — how the one argument gets told

Once the one-sentence argument is set, pick a shape to tell it in. These
five carry over from 0.1's email-types taxonomy — they answer a different
question than the 8-type library (`references/type-library.md`) does. The
8 types are about the email's JOB (a newsletter, a welcome email, a
launch-close email); these five are about HOW that job's one argument gets
told on the page. Any of the 8 types can use any of these five — a
launch-open email can be told as a story, a newsletter can be told as a
case study.

- **Value/teaching** — a hook, why it's on your mind, the core lesson with
  a real example, one practical step the reader can use today.
- **Story-to-lesson** — drop into a real moment, build it with specific
  detail, the turning point, then the lesson it taught. The story has to be
  a real, dated one from `brain/stories/` — never invented to fit the
  argument.
- **Observation** — something noticed, why it matters to the reader, one
  takeaway. The shortest of the five; good for a quick, lower-effort send.
- **Case study / proof** — the result up front, the before, what changed,
  the specific outcome (numbers when they're real), the lesson for the
  reader. Every number and quote here has to trace to `brain/proof/`.
- **Curiosity / open loop** — tease something real without giving it away,
  say why it matters, a partial reveal, a clear promise of what's coming.
  Use sparingly — a list that gets teased and never paid off stops trusting
  the tease.

Pick the shape the actual material supports, not the one that sounds most
interesting in the abstract. A real story with a real lesson beats a
value/teaching email padded out to sound like it has one.

## Body mechanics

- Short paragraphs: 1-3 sentences. White space does real work in an inbox.
- Grade-8 plain words, per the charter — this applies to the email itself,
  not to how you talk to the owner about it (those are already the same
  register in GrowOS, but the discipline is worth naming twice).
- One primary call to action. Everything else in the email is in service of
  that one ask, not a second competing one. A reply-ask ("hit reply and tell
  me...") is a real CTA and can legitimately expect zero clicks — judge it
  by replies, not by click-through.
- The P.S. is the second most-read line in most emails, after the subject.
  Use it for the strongest restatement of the CTA or the reply bait — never
  for a third, unrelated idea. Skip it entirely rather than force one.
- Sign-off matches whatever `brain/voice.md` specifies. If it's silent on
  this, a first name alone reads more like a person than "Best regards" or
  "Sincerely."

## Length

Newsletter and nurture emails: roughly 300-600 words. Promo and launch
emails can run longer when there's a real case to make. Win-back and quick
check-in emails: 100-250 words — short is legal, and most business owners
underuse it. Cart-abandon and trial-nurture: keep each email to one clear
job; when the job is done, stop.

## The self-check bar (run before the Editor gate)

Walk this before handing the draft to the `reviewer` agent — catching these
yourself means the gate finds less, and less rework either way.

1. The argument is a single sentence, and it's genuinely new against the
   last 2-3 emails in this channel or round.
2. The opening move differs from the last 1-2 emails in the same
   sequence or the same newsletter rhythm.
3. Every claim, number, and quote traces to `brain/business.md`,
   `brain/proof/`, `brain/stories/`, or the owner's own words in this
   session — anything else is `[PLACEHOLDER: what's missing]`.
4. Exactly one primary CTA.
5. The subject options genuinely differ from each other (not five
   phrasings of one idea), and the preview adds information the subject
   didn't give.
6. Grade-8 plain words; short paragraphs; sign-off matches voice.md.
7. Nothing in the draft is copy-pasted from a competitor, a swipe file, or
   research material without being rewritten in this business's own voice —
   swipe material is reference for structure and technique, never a source
   to lift sentences from.
