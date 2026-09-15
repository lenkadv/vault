# Intent types

Every social post has one job. Before you write a single word, name the job. That
is the intent. Pick one per post — a post trying to teach AND sell AND tell a
story is a post that does none of the three well. If a topic genuinely wants two
jobs, that is two posts, not one.

This library adopts GrowOS 0.1's intent reference, folded from seven types down
to five. Two of 0.1's types do not disappear — they fold into the closest type
below, and each fold is named so nothing gets quietly lost:

- **Hot take** folds into **teach** (a sharp, defensible opinion that still
  leaves the reader knowing something) or **engage** (an opinion posted mainly
  to start a fight in the comments, no teaching payload). Pick based on which
  job the post is actually doing.
- **Observe** — the short, no-lesson, purely human moment — folds into
  **story**. It is story compressed to one beat instead of a full arc; it still
  exists to build connection, just without the setup-turn-lesson shape.

## How to use this file

1. Read the topic or plan slot. Ask: what is this post actually trying to do —
   build authority, build connection, build trust, get a sale moving, or start
   a conversation? That answer is the intent.
2. Jump to that intent's section below for its shape and what to ground it in.
3. Pull the matching hook pattern from `system/creative-library/hooks.md` and the
   matching post shape from `system/creative-library/post-styles.md` — this file
   says WHAT job the post does; those two files say HOW to open it and HOW to
   shape it.
4. Ground every post in something real from the brain (see each section's
   "ground it in" line). A post with no real material behind it gets a
   `[PLACEHOLDER: what's missing]` where the specific belongs — never an
   invented number, quote, or result.

A rough starting mix across a week, adjustable to the business and never
enforced as a rule: more teach and engage than anything else, story and proof
woven in regularly, promo kept rare and earned. `social-strategy`'s weekly plan
is where the actual mix for THIS business gets decided; this file only shapes
each post once its slot and intent are already chosen.

---

## Teach

**Purpose:** Build authority. Earn a save or a share because the reader learned
something real.

**What it is:** A how-to, a quick tip, a framework, a myth busted, a mistake
named and fixed, a sharp opinion that still leaves the reader smarter for
having read it (this is where a hot take belongs, when it teaches something
along with the sting).

**Ground it in:** `brain/methodology.md` — the business's own named steps and
opinions. A teach post that could have come from any competitor in the field is
a wasted teach post; one that could only have come from THIS business, because
it uses their method, is the real thing.

**When to reach for it:** Whenever there is a real piece of know-how to give
away. This should be the most common intent in the mix — it is the one that
makes a stranger follow.

**Its shape:** Hook that names the outcome or the mistake → the actual
teaching, specific enough to use today → one line tying it back to why it
matters. A numbered list or a short carousel-style breakdown both work well
here.

**Example hook (fill with something true):** "The mistake I see [audience]
make with [task], over and over" or "Here's exactly how to [do the specific
thing] — no fluff."

**Watch for:** Generic advice that could sit on any blog. If you cut the
business's name out and it still reads true for a competitor, it is not
grounded enough yet — go back to `methodology.md`.

---

## Story

**Purpose:** Build connection and trust. Make the account feel like a person,
not a feed of tips.

**What it is:** A real, dated moment: a turning point, a behind-the-scenes
look, a milestone, a mistake owned honestly, or — the compressed version — a
single relatable observation with no full arc, just a true, human beat.

**Ground it in:** `brain/stories/` for the full-arc version. A compressed
observation still has to be true to how this business's people actually
experience their work — never invented to sound relatable.

**When to reach for it:** When there is a real story on file, or a genuinely
true, small observation worth sharing. Never invent one to fill a slot — an
empty `brain/stories/` folder means fewer story posts this week, not a made-up
one.

**Its shape (full arc):** Set the scene → the turn (what happened, what
changed) → the point (what it means for the reader). Keep it short and let the
real details do the work.

**Its shape (compressed / observation):** One or two lines, a true and specific
moment, no lesson bolted on, no CTA. It exists to be human, not to sell or
teach.

**Example hook (fill with something true):** "[X time ago] I [old situation].
Today, [new situation]. One thing changed." or a plain, dated moment: "The
[specific thing] came in at [time]. I almost didn't [do the thing]."

**Watch for:** A story with the specifics sanded off reads as fake. Keep the
real number, the real day, the real name (if the person consented) — the
specifics are what make it a story instead of a parable.

---

## Proof

**Purpose:** Build credibility without bragging. Show a real result instead of
claiming one.

**What it is:** A real testimonial, a specific result, a before-and-after, a
screenshot with honest context, a mini case study focused on the customer's
transformation rather than the business's flex.

**Ground it in:** `brain/proof/` only, quoted exactly as written there. Never a
number, a quote, or a result that is not sitting in that folder.

**When to reach for it:** When there is real proof on file that fits the
topic. If `brain/proof/` is thin, this is the intent that runs least often —
say so plainly rather than stretching a weak result to fill the slot.

**Its shape:** Name the starting point → the specific result, in the
customer's own words or numbers where possible → one line on what made the
difference (never dollar amounts or revenue as the headline — frame around the
transformation, not the payout).

**Example hook (fill with something true, from `proof/`):** "[Customer] came to
us with [starting problem]. Here's what changed." or "One number from this
month: [specific, sourced result]."

**Watch for:** Never edit or trim a quote to make it punchier — an altered
proof quote is a zero-tolerance problem at the editor gate. If the exact quote
is clunky, pick a different one or use it in full.

---

## Promo

**Purpose:** Move a warm reader toward the offer. The rarest intent, and the
one that has to be earned by everything posted around it.

**What it is:** A direct mention of the offer, a value-first post with a
natural call to action woven in, a lead magnet mention, a waitlist or
availability note, a customer story used specifically as the proof behind an
ask.

**Ground it in:** `brain/business.md` — the exact offer, price, and terms as
written there. Never soften, sweeten, or invent a detail of the offer to make
the post read better.

**When to reach for it:** Sparingly, and only when the plan or the owner
actually calls for it. A feed that is mostly promo reads as a pitch, not a
business worth following — this should be the least common intent by a wide
margin.

**Its shape:** Give something real first (a tip, a story, a result) → the
natural bridge to the offer → one clear, low-pressure next step. No hard sell,
no countdown-timer urgency that is not real.

**Example hook (fill with something true):** "I've been [doing the real work]
for [audience] for a while now. If [the specific situation] is you, here's what
I can do." or lead with the value and let the offer land in the last line.

**Watch for:** Fake urgency ("only 2 spots left!" when that is not actually
true) and any claim the offer cannot back up. `brain/compliance.md` gets
checked here especially hard if the business has rules about how the offer may
be described.

---

## Engage

**Purpose:** Start a real conversation. Boost the plain human signal of
replies and comments, and make the account feel like somewhere people talk
back.

**What it is:** A genuine question, a poll, a this-or-that, a fill-in-the-blank,
or an opinion posted specifically to invite pushback rather than to teach (this
is the other home for a hot take — the version with no lesson attached, just a
stance that wants an answer).

**Ground it in:** `brain/audience.md` — a question lands when it touches a real
pain, choice, or debate this exact audience actually has. A generic engagement
question ("What's your favorite productivity tip?") gets generic replies.

**When to reach for it:** Regularly — it is cheap to make and keeps the feed
feeling like a conversation, not a broadcast. Good as a lighter post between
heavier teach or story posts.

**Its shape:** One short line of context, if needed → the question or prompt,
asked plainly → then get out of the way. No lecture before the question.

**Example hook (fill with something true):** "[One line of real context].
[The direct question]." or a plain either/or grounded in a real choice this
audience actually faces.

**Watch for:** This is NOT the same job as replying to comments and DMs on
posts that already went out — that is `social-engage`'s job, a different
skill. This intent is about the ORIGINAL post that starts the conversation,
never the replies that follow it. Also watch for engagement bait with no real
question in it ("Agree?", "Repost if you know this") — the platform references
in `system/creative-library/platforms/` call this out by name as something to
avoid.
