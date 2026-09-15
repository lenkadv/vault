# The tell rulebook

This is the one list of writing tells that GrowOS edits by. The humanize skill and agent read it.
The Reviewer agent reads it. Nothing else keeps its own copy, so the rules can never
drift apart. Every rule has an id, a severity, a test you can actually run, and a
bad-to-good pair. The examples are made up for this book; never paste them into a
customer's work.

**Severity levels:**

- **INVARIANT** - law. One violation fails the piece, whatever the score says.
- **HARD** - mechanical. A pattern or a count decides it. The scorer
  (`scripts/ai-tells.js`) detects most of these; treat its numbers as ground truth.
- **JUDGMENT** - a reader decides. Bias conservative: leave a clean section alone,
  and never manufacture a finding to look thorough.

**The owner's voice can overrule a generic rule.** If the business's `brain/voice.md`
blesses a phrase as a signature, that phrase is not a tell for that business. If it
bans something outright (say, em dashes), that ban is stricter than this book. A real
writing sample beats any abstract rule here (see E39).

---

## The law (INVARIANTS - never violate, never "score")

### E01 - Never invent a specific
Test: does any number, name, date, quote, or claim in the output not exist in the
input draft? The only exception is exact conflict correction from the brain under
the truth hierarchy below. Any other brain fact that appeared during editing is
fabrication. Reject the edit.

- Bad: draft says "our clients stay a long time" and the editor writes "our clients
  stay 4.2 years on average" (invented number).
- Good: keep "our clients stay a long time", or mark
  `[PLACEHOLDER - real average client tenure]`.

Never fix vagueness by inserting a plausible specific. Vague-but-true stays, gets
flagged, or becomes a placeholder that says exactly what the owner should supply.

The input is evidence of what the draft says, not proof that the claim is true.
Check concrete claims against `brain/business.md`, `brain/proof/`, and any relevant
brain entry. A direct conflict includes both a different canonical fact and a
business rule that forbids that class of unsupported claim. If the brain directly
conflicts, never keep the known-wrong or expressly forbidden claim:
use the exact supported wording when it preserves the point, or a verification
placeholder. If the brain is merely silent, preserve and flag the input claim.
Truth outranks claim freeze; corrections are never silent.

### E02 - Placeholders survive verbatim
Test: is every `[PLACEHOLDER - ...]` from the draft still present, letter for letter?
The editor never fills one in, never deletes one, never rewords one to smooth a
paragraph.

- Bad: `[PLACEHOLDER - client result]` quietly removed because the paragraph flows
  better without it.
- Good: the placeholder is still there, exactly as written.

### E03 - Proof quotes are untouchable
Test: every testimonial, customer name, and result traces to an entry in
`brain/proof/` marked `approval: approved`, and the quoted words are byte-identical
to that entry. A real quote that is still `approval: pending` is a violation too.

- Bad: tightening a customer's quote "so it reads better".
- Good: the quote stays exactly as approved; problems get flagged, never rewritten.

### E04 - Edit for the reader, never for a detector
Test: does a proposed change exist only to fool an AI-detection tool (planted typos,
random rare words, deliberate awkwardness)? Reject it. Evasion and quality point in
opposite directions; we only ever edit for clarity, truth, and the owner's voice.

**Zero-tolerance artifacts (any single hit fails the piece):** "As an AI language
model", "as a large language model", "I'm sorry, but I can't", "as of my last
training update", leftover `[INSERT ...]` scaffolding. This tiny list is the banned
list. It is not the vocabulary list below - that one never fails on a single hit.
An `[INSERT ...]` marker stays visible in a held draft until the owner supplies the
approved material; never delete it merely to make the scorer green.

---

## Load-bearing tells (HARD - these catch most machine writing)

### E05 - AI-vocabulary cluster (HARD, dated 2026-07)
Test: three or more distinct words from the dated list inside roughly 400 words.
One hit never flags - that is how real human writing gets falsely accused. The list:
delve, showcase, underscore, emphasize, enhance, leverage, foster, garner,
meticulous, intricate, pivotal (high signal); tapestry, landscape, robust, vibrant,
seamless, testament, realm, beacon, myriad, plethora, comprehensive, multifaceted
(fading); additionally, boasts, bolstered, nestled (legacy, cluster-count only).
A business may allowlist its own domain words ("landscape" for a gardener).

- Bad: "We delve into the vibrant landscape of bookkeeping to showcase robust value."
- Good: "Here is what changed in the bookkeeping rules this year, and what it costs
  you if you miss it."

### E06 - Burstiness: sentence lengths must vary (HARD)
Test: three or more sentences in a row within about two words of each other, or
almost every sentence sitting in the 15-28 word band, or a spread (standard
deviation) under ~6. Human writing runs from 4 words to 55 and back.

- Bad: five sentences in a row, each 17 to 19 words, marching in step.
- Good: "We rebuilt it. Twice. The second rebuild took nine weeks, ate the whole
  spring, and taught us the one thing the brochure never says."

### E07 - Negation pivot (HARD)
Test: more than one "not X, but Y" / "isn't X, it's Y" / "no X, just Y" frame per
piece. One is a legitimate contrast. Two is a verbal tic.

- Bad: "This isn't a gym. It's a lifestyle. We don't sell workouts, we sell change."
- Good: "A 45-minute session, three mornings a week, with a coach who knows your
  knee history."

### E08 - Rule-of-three stacks (HARD)
Test: three-item lists appearing more than twice in a short piece, or three
sentences in a row opening with the same word ("No fees. No contracts. No excuses.").

- Bad: "Fresh, fast, and friendly. Local, loyal, and loved. Big taste, small
  footprint, zero fuss."
- Good: "Fresh bread, baked at five, gone by noon."

### E09 - Hedges and throat-clearing (HARD)
Test: "it's important to note", "it's worth noting", "needless to say", "aims to",
a sentence-opening "Honestly," or "Look,". One hedge is human; a stack is filler.
Remove it, then check the sentence still earns its place.

- Bad: "It's worth noting that delivery times matter a lot to customers."
- Good: "Miss the delivery window twice and you lose the customer."

### E10 - Empty transition openers (HARD)
Test: sentences starting "Additionally,", "Furthermore,", "Moreover,", "Notably,",
"In addition,".

- Bad: "Additionally, the planner saves time."
- Good: "It also hands you back your Sunday evenings."

### E11 - Wrap-up reflex (HARD)
Test: "In conclusion,", "In summary,", "Overall,", "To sum up,", or a closing
paragraph that only restates what was already said. Cut it, or end on a concrete
next step.

- Bad: "In conclusion, consistency is what grows a studio."
- Good: "Book the same slot every week for eight weeks. Then decide."

### E12 - Em-dash rate (HARD, rate not ban)
Test: more than one or two em dashes per paragraph. The mark is not the tell; the
density is. Exception: if the owner's `voice.md` bans them outright, a single one
is a violation for that business.

- Bad: three dash-asides stacked into one paragraph.
- Good: one dash at most, or a comma, or a full stop and a new sentence.

### E13 - Unearned praise adjectives (HARD list + judgment)
Test: hype adjectives with no evidence behind them - seamless, robust, vibrant,
transformative, game-changing, cutting-edge, revolutionary, unparalleled,
world-class. More than about one per paragraph, cut.

- Bad: "a seamless, game-changing booking experience."
- Good: "booking takes under a minute on a phone."

### E14 - Vague attribution (JUDGMENT + phrase list)
Test: "experts say", "studies show", "research suggests", "it's widely regarded"
with no named source. Name the source only when it already exists in the draft.
Otherwise follow the business's claim rule: preserve and flag, cut, soften, or use
a verification placeholder. Never import a source from the brain merely to improve
the draft, and never invent one (E01).

- Bad: "Studies show meal prepping saves money."
- Good: "Our January order data says prep customers spend about a third less on
  weekday lunches." (only if that source and claim already appear in the draft)

---

## Structural and tonal tells (JUDGMENT)

### E15 - Announced payoff (JUDGMENT + phrase list)
Test: a sentence advertises the payoff instead of delivering it - "here's the
kicker", "the best part?", "here's the thing", "what nobody tells you". Delete the
fanfare; let the substance land. Exception: a voice file may bless one of these as
the owner's signature (see E39) - then it stays.

- Bad: "Here's the kicker: the first visit is free."
- Good: "The first visit is free."

### E16 - Empty-but-true statements (JUDGMENT)
Test: could anyone alive disagree with the sentence? If no one could, it is a
platitude. Cut it or make it specific enough to argue with.

- Bad: "We care deeply about quality."
- Good: "If a stitch pops in the first year, we repair it free and pay the postage."

### E17 - Superficial "-ing" tails (JUDGMENT)
Test: a trailing clause that restates instead of adding - "...highlighting its
importance", "...ensuring success", "...underscoring our commitment". Delete the
tail; the meaning survives.

- Bad: "We answer every ticket within a day, underscoring our commitment to service."
- Good: "We answer every ticket within a day."

### E18 - Therapist-mode reassurance (JUDGMENT)
Test: unsolicited comfort in a business context - "you're not alone", "you're not
broken", "you're not imagining it". Replace the hug with a real observation.

- Bad: "You're not failing. You're just overwhelmed."
- Good: "Most owners hit this wall the month their second hire starts."

### E19 - Near-miss metaphors (JUDGMENT)
Test: does every part of the metaphor map to the real thing? If one clause breaks,
cut the metaphor and say it literally.

- Bad: "Cash flow is like breathing: in, out, and sometimes you hold it." (hold it?)
- Good: "Money comes in late and goes out on the first. The gap is the problem."

### E20 - Symmetrical filler (JUDGMENT)
Test: a balanced see-saw sentence that reads profound and says little.

- Bad: "Planning without action is a dream; action without planning is a gamble."
- Good: "Pick one of the three plans this week and actually run it."

### E21 - Rhetorical questions as filler (JUDGMENT)
Test: a question that only stalls before the point. Answer it or cut it.

- Bad: "So what does this mean for your salon?"
- Good: say the thing it means.

### E22 - "Quiet/quietly" as fake gravitas (HARD density)
Test: "quiet confidence", "quietly building", "quietly winning" used to add weight.
A literal quiet (a quiet room, went quiet) is fine; the pattern in clusters is not.

- Bad: "the quiet confidence of a studio that is quietly redefining fitness."
- Good: "a studio that opens at six and never cancels a class."

### E23 - Copula avoidance: bring back plain "is" (HARD phrase list)
Test: "serves as", "stands as", "functions as", "represents" where "is" works.

- Bad: "The checklist serves as your opening routine."
- Good: "The checklist is your opening routine."

---

## Formatting tics (HARD)

### E24 - Formatting overuse
Test any of: bold on more than about one phrase per screen or on whole sentences;
Title Case Headings (use sentence case); emoji as bullets or section markers.

- Bad: "## Five Ways To **Grow** Your **Studio**" with a rocket emoji
- Good: "## Five ways to grow your studio"

### E25 - Punctuation and unicode tics
Test any of: arrows (→, =>) as connectors; quotes around an ordinary word for
"emphasis"; more than one exclamation mark per paragraph; curly quotes when the
house style is straight.

- Bad: "Faster onboarding → more revenue!!"
- Good: "Faster onboarding means more revenue."

---

## Readability and rhythm craft

### E26 - Grade ceiling, voice floor (HARD, computed)
Test: the computed reading grade (the scorer's second axis - never a guess) sits
above the channel's ceiling: sales pages about grade 5-6, landing pages about 6,
articles about 8. Simplify toward the ceiling - but if an edit turns the copy
choppy, babyish, or personality-free, it crossed the voice floor. Revert that edit.
Two dials: grade is a ceiling, voice is a floor.

### E27 - Dynamic verbs over static (JUDGMENT)
Test: is/are/was doing all the work, plus wimp verbs (seem, appear, become) where a
real verb could carry the action.

- Bad: "The report is a place where your numbers are visible."
- Good: "The report shows your numbers the moment they move."

### E28 - Vary sentence openings (JUDGMENT)
Test: most sentences opening the same way, usually "We..." or the product name.

- Bad: "We plan. We build. We maintain."
- Good: "We plan and build it. Maintenance? Already included."

### E29 - Perception filter words (JUDGMENT)
Test: "you'll see", "you'll notice", "you'll find", "we think that" standing between
the reader and the thing. Cut about half; state the thing.

- Bad: "You'll find that setup is quick."
- Good: "Setup takes one afternoon."

### E30 - Vary sentence content (JUDGMENT)
Test: every sentence the same kind (all claims, or all instructions) reads like
stage directions. Mix a claim, a concrete example, a short aside, a question.

### E31 - The delete test (JUDGMENT)
Test: can the sentence be removed without losing meaning? Then it is padding. Cut
it. Watch especially the first and last paragraphs, where writers warm up and wind
down.

---

## Positive human tests (apply AFTER the tells are gone)

Removing slop gets copy to neutral. Neutral is not shippable. These are what
"actually human" means; the personality stage in the humanize playbook applies them.
Every positive ingredient below already exists in the source; otherwise ask the
owner and hold the piece. The brain may verify source material or supply an exact
direct-conflict correction, but it never donates a nicer fact, stance, or story.

### E32 - Specificity over abstraction (JUDGMENT)
Test: for every adjective, ask "could I replace it with a number, a name, or a
date already present in the source?"

- Bad: "trusted by many happy customers, incredibly fast."
- Good: "214 subscriptions this spring; the box ships every Tuesday."
  (only when both details are already in the source; otherwise request them and
  hold the piece)

### E33 - Only this business could say it (JUDGMENT)
Test: could a random business in another niche say the exact same line? Could a
model have written it with no help from this owner? Does it echo the brief's own
phrasing? Any yes means commodity copy - replace it with something proprietary from
the source. If the source has no proprietary detail, flag the gap and hold; do not
borrow one from the brain.

### E34 - Reader-first opening (JUDGMENT)
Test: does the first line describe the reader's situation before naming the product?

- Bad: "Maplewood Books is a community-focused independent bookstore."
- Good: "Out of ideas for the book club you somehow ended up running?"

### E35 - Take a stance (JUDGMENT)
Test: does the piece hold a real position, or is it careful and flat? Could a
section honestly end on "I believe...", "I won't...", or "I disagree..."? If not,
there is no point of view in it. Restore only a stance already present in the
source. If none exists, request one and hold.

### E36 - A real first-hand story (JUDGMENT - the strongest single lever)
Test: is there at least one real, lived moment - "I did", "I saw", "a customer
named..." - already present in the source? "Imagine a business that..." is not a
story. The brain verifies the source story and proof approval; it does not supply
an absent story. If the piece needs one, request it and hold (E01).

### E37 - One voice everywhere (JUDGMENT)
Test: does the footer, the form label, the small print still sound like the same
person as the headline? Copy that drops into neutral corporate register at the
edges reads assembled.

### E38 - The read-aloud test (JUDGMENT method)
Test: read it out loud. Would the owner actually say this sentence to a friend? If
a phrase snags on the way out of the mouth, or uses a word they would never say,
rewrite it in their words.

### E39 - A real sample beats any rule in this book (JUDGMENT override)
Test: when the "Writing samples" in `brain/voice.md` conflict with a generic rule
here, the sample wins. If the owner opens with "Here's the thing..." in their real
writing, that phrase is their signature, not a tell (E15 stands down for that
business). This is the rule that keeps humanize from "correcting" a casual voice into
clean nothing.

### E40 - Revert over-corrections (JUDGMENT)
Test: any word fancier than the owner would ever say is a thesaurus artifact.
Revert to the plain word.

- Bad: "a paramountly significant advantage."
- Good: "the main advantage."

---

## How the scorer maps to this book

`scripts/ai-tells.js` mechanically detects E05-E17 (partly), E22-E26, and the
zero-tolerance artifacts under E04, and computes the reading grade for E26 as a
separate axis. Everything else in this book is judgment: the humanize pass and the
Reviewer decide those by reading, conservatively, with the scorer's numbers as
ground truth for the mechanical part.
