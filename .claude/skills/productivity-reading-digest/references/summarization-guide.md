# Summarization Guide — Quality Bar

Per-article output has four parts: TL;DR, takeaways, relevance, optional action item. Each has a specific job and a specific failure mode. This is the bar.

## TL;DR — one sentence

**Job:** State what the article is actually saying. Plain. Factual. No marketing language.

**Bar:** Someone who hasn't read the article should be able to read this sentence and know what argument or finding the piece makes.

**Examples — good:**
- "Spaced repetition beats massed practice for long-term retention, but only when paired with retrieval rather than rereading."
- "The author argues that company OKRs cause more harm than good because they incentivize gaming the metric instead of doing the work."
- "Async-first teams need three things in place to function: a single source of truth, default-written communication, and an explicit policy on response times."

**Examples — bad (avoid):**
- "An interesting piece on productivity." (No content.)
- "The article explores the importance of focus." (No argument.)
- "A deep dive into a fascinating topic." (Editorial filler.)
- "Spaced repetition is a powerful technique that helps with learning." (Generic, no specificity from the article.)

## Key takeaways — 3 to 5 bullets

**Job:** Capture the substantive ideas worth keeping. Things the user can use later, reference in conversation, or apply.

**Bar:** Each takeaway should be CONCRETE — specific enough to mean something on its own. Generic restatements of the TL;DR don't count.

**Examples — good:**
- "Lead with the cost of NOT changing, not the benefit of changing. The article cites a study where this framing 2x'd conversion."
- "Most company OKRs miss the point because they're set quarterly and graded for completeness — the right cadence is annual with quarterly milestones, graded for ambition."
- "When debugging a hard async-team problem, the diagnostic is almost always 'we forgot to write the thing down.'"

**Examples — bad (avoid):**
- "Spaced repetition works." (Too generic.)
- "The author makes good points about teams." (No information.)
- "Important to align on company goals." (Platitude.)

**Rule of thumb:** A takeaway should pass the "could I tell someone this at lunch?" test. If it's too generic to be conversation-worthy, it's too generic to keep.

## Relevance note — one line

**Job:** Tie the article to the user's current goals or context. Why this matters to THEM, right now.

**Bar:** Should reference a specific goal area or known context. If a goals file is configured, pull from it. If not, the relevance can be more general but should still be substantive.

**With goals file:**
- "Connects to your Work goal area (ship pricing page) — the framing trick here is directly applicable."
- "Connects to your Health goal area (sleep regularity) — practical advice on bedtime consistency."
- "Adjacent to Learning goal area but not directly aligned — read if you're curious, skip if you're behind."

**Without goals file:**
- "Useful frame; would apply to any positioning work."
- "Niche topic; relevant only if you're actively working on team async patterns."
- "Skip-worthy if pressed for time — the takeaways are derivative of better source material."

**The relevance note is permission to skip.** If an article isn't actually relevant, say so. Don't manufacture relevance.

## Action item — optional, only when genuinely present

**Job:** If the article suggests a concrete thing the user could do, surface it.

**Bar:** The action has to be specific, doable, and clearly suggested by the article. NOT every article produces an action item — most don't.

**Examples — good:**
- "Try the spaced-repetition flashcard schedule from the article (1, 3, 7, 14 day intervals) for your Spanish practice."
- "Send the framing-cost-not-benefit example to Sarah before Friday's pricing review."
- "Audit your team's async patterns against the three checks in the article."

**Examples — bad (avoid):**
- "Think about how to apply this." (Not an action.)
- "Read the related article linked at the bottom." (That's just more reading.)
- "Reflect on whether your OKRs are bad." (Vague.)

**When to skip:** If you have to manufacture an action item to fill the field, leave it blank. An article without a clear action is fine.

## Common failures

### Filler language
Anything that sounds like a book-flap blurb is filler. "Thought-provoking," "fascinating," "deep dive," "essential reading." Cut all of it.

### Hedging
"The author seems to suggest" / "It might be worth considering" / "Some readers may find" — the digest is for the user's reference, not a book report. State directly what the article says. If you're uncertain about the article's claim, that's a signal you didn't get enough from it — say so plainly ("Article was thin on specifics") rather than hedging.

### Over-summarizing
Don't try to capture every point. 3-5 takeaways is the bar. If the article had 10 points, you picked the top 5 and the user can decide whether to read the original for more.

### Under-summarizing
A 3-word takeaway like "Use spaced repetition" is useless. Each takeaway should be substantive enough to stand alone.

### Confidence without basis
If you couldn't fetch the article or only got a partial read, say so. Don't generate a confident summary from a paywall preview or a headline.

## When the article is just bad

Some articles are weak, derivative, or empty. The digest should reflect that:

- "Mostly restates well-known ideas without new evidence. Skip."
- "Thin on substance — the title was the strongest part. Skip."
- "Heavily promotional for the author's product. Treat as marketing."

The digest is honest about quality. Padding bad articles wastes the user's time twice.
