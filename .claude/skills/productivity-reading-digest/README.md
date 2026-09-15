# Reading Digest

**Part of the Personal Productivity Pack — a free skill set from AI Black Magic.**

Turns your "I'll read this later" queue into a weekly digest. Pulls from a reading-list.md file, URLs you paste, a Pocket/Instapaper/Readwise connector, and a Gmail newsletter label. For each article, produces a TL;DR + 3-5 key takeaways + a relevance note tied to your goal areas. Extracts action items into your shared task queue. The point: get the value out of saved articles without needing to read every one.

## Quick start

1. **Install the skill** — drop the `productivity-reading-digest` folder into your Claude skills directory.
2. **Ask Claude**: *"Digest my reading"* (or *"weekly reading"*, *"process my reading list"*, etc.)
3. **First-run onboarding** (~60 seconds) — sources, folders, pack integration.
4. **Pair with a schedule**: *"every Saturday at 9am, digest my reading"* — and the digest waits for you on the weekend.

## Where articles come from

Four sources, mix-and-match:

| Source | Setup |
|---|---|
| **reading-list.md** | A markdown file you maintain. The skill reads unchecked items. Auto-checks them after processing. |
| **Pasted URLs** | Paste one or more URLs into chat and the skill includes them in the next digest. |
| **Read-later connector** | Pocket, Instapaper, or Readwise Reader if connected. Skill pulls the unread queue. |
| **Gmail newsletter label** | Funnel newsletters to a label (e.g., "Newsletters"); skill reads unread mail there each digest. |

The skill deduplicates across sources, so an article in two places gets processed once.

## What you get every digest

A dated `YYYY-MM-DD-reading-digest.md` file with:

- **What stood out** — 2-3 lines on the strongest piece
- **Per-article entries** — TL;DR, 3-5 key takeaways, relevance note, optional action item, goal area tag
- **Also in your queue** — brief mention of items beyond the per-digest cap (default 12)
- **Goal coverage** — which goal areas your reading touched this week
- **Action items extracted** — also appended to next-actions.md for the Daily Plan Builder

## The summary quality bar

This is where most reading digesters fall apart — they produce generic summaries that sound like book-flap blurbs ("fascinating deep-dive into the importance of focus"). This skill's reference file (`references/summarization-guide.md`) sets a higher bar:

- **TL;DR:** a sentence that names the actual argument or finding
- **Takeaways:** concrete enough to repeat at lunch — no generic platitudes
- **Relevance:** honest — if an article isn't relevant, the digest says so

The relevance note is permission to skip. Articles that don't matter to you get flagged as such, so you don't waste time on the digest entries themselves.

## Pack integration

| Connects to | What flows |
|---|---|
| **Brain Dump & Daily Plan** | Action items extracted from articles → shared `next-actions.md` |
| **Goals file** | Each article gets mapped to a goal area; relevance notes pull from goal context |
| **Weekly Review** | Recent digests are visible to the weekly review skill, contributing to goal coverage and look-back |

## Post-processing options

When the skill processes an article, by default it marks it done in the source:

- reading-list.md: check the box
- Connector: archive
- Gmail newsletter label: apply a "Processed" label (or archive)

If you'd rather keep manual control, set `process_action: leave_alone` in config.

## What this skill is NOT

- **Not a research engine.** Summarizes what you saved; doesn't go find new articles.
- **Not a Pocket replacement.** Use a real read-later tool to capture; this skill processes what those tools accumulate.
- **Not a verbatim summarizer.** Outputs are interpretation-light — meant to extract the ideas, not replace the read.
- **Not an autopilot.** Doesn't fetch new articles, doesn't unsubscribe newsletters, doesn't act on action items on its own.

## Updating your settings

Tell Claude *"update my reading digest settings"* — or edit `config.json` directly.

## Files in this skill

- `SKILL.md` — the skill itself (Claude reads this)
- `config.example.json` — canonical config shape
- `assets/digest-template.md` — weekly digest file structure
- `assets/reading-list-template.md` — example reading-list.md format
- `references/source-handling.md` — per-source pull and post-processing logic
- `references/summarization-guide.md` — quality bar for TL;DR, takeaways, relevance

---

_Free for AI Black Magic email subscribers. Share, don't sell._
