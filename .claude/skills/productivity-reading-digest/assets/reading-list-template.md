# Reading List

Articles, posts, threads, and other things to read later. The Reading Digest skill reads this file and processes unchecked items on its weekly run.

## Format

Items use the GitHub-flavored markdown checkbox format. The skill reads any unchecked line that contains a URL.

```markdown
- [ ] [Article title or short description](https://example.com/article)
- [ ] https://example.com/raw-url-also-works
```

When the skill processes an item, it checks the box. Processed items stay in the file for reference (you can scroll back to see what you read) but they no longer appear in future digests.

## Categories (optional)

You can organize by topic with H2 headers. The skill ignores headers and just reads the URLs underneath them.

```markdown
## Work / Productivity
- [ ] [The cost of context switching](https://example.com/...)
- [ ] [How async-first teams work](https://example.com/...)

## Health
- [ ] [Sleep regularity beats sleep duration](https://example.com/...)

## Personal interest
- [ ] [The history of the printing press](https://example.com/...)
```

## Tips for getting value from this file

- **Add ruthlessly, prune ruthlessly.** The list is supposed to be the queue, not a graveyard. Items older than 60 days are probably dead.
- **Title the link with what made you want to save it.** Not the article's marketing title — your reason. "Pricing psychology: lead with cost not benefit" beats "Why Smart Marketers Are Rethinking Their Whole Approach."
- **Drop things without guilt.** If a link has been sitting unchecked for a month and you've felt no pull to read it, delete the line. It's not for you.

## Example

```markdown
# Reading List

## Work
- [x] [Pricing psychology — lead with cost not benefit](https://example.com/pricing)
- [ ] [Async-first team patterns](https://example.com/async)
- [ ] [Why your roadmap is wrong](https://example.com/roadmap)

## Learning
- [ ] [Spaced repetition for technical knowledge](https://example.com/spaced-rep)
- [ ] [The Feynman technique](https://example.com/feynman)

## Personal
- [ ] [Best sourdough technique for beginners](https://example.com/sourdough)
```

---

_The Reading Digest skill processes this file on its weekly run._

---

## Template usage notes (for the skill — not part of the output)

- This file is an EXAMPLE/template. Encourage users to create one if they don't have one — explain the format above.
- When parsing a user's reading-list file, look for any line matching `- [ ] ...` that contains a URL (raw or markdown-linked). Headers, blank lines, and prose between entries are ignored.
- When processing items, change `- [ ]` to `- [x]`. Preserve everything else on the line.
- Don't sort or reorder the user's file. Preserve their structure.
