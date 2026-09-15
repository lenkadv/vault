---
name: productivity-reading-digest
description: Processes the user's queue of saved articles into a weekly digest — short, scannable, useful. Pulls from four possible sources (a reading-list.md file the user maintains, URLs pasted into chat, a Pocket/Instapaper/Readwise read-later connector if available, and an optional Gmail newsletter label). For each article, fetches the content and produces a TL;DR + 3-5 key takeaways + a one-line relevance note tied to the user's goal areas. Extracts action items into the shared next-actions.md the daily planner reads. Maps each article to one of the user's goal areas so the weekly review can see reading coverage. The point: extract the value from "I'll read this later" without requiring full reads. Use this skill whenever the user says "digest my reading", "weekly reading", "process my reading list", "summarize my saved articles", "what's in my read-later queue", "catch me up on my reading", "Saturday reading", "go through my saved articles", "process my read-later", or any phrase about working through accumulated reading. Also trigger when the user pastes one or more URLs and asks for summaries or "make this a digest." Even casual phrases like "I never read anything in my queue" should suggest this skill.
---

# productivity-reading-digest

This skill exists because everyone saves more than they read. Articles, threads, posts pile up in Pocket, in `reading-list.md`, in starred emails, in browser tabs that have been open for weeks. The skill turns that backlog into a weekly digest — extracting the value without requiring full reads — so the queue doesn't generate guilt and the ideas don't get lost.

Target cadence: weekly. Pair with the schedule skill ("every Saturday at 9am, digest my reading") or run on demand.

## First-run check

Before doing anything else, look for `config.json` in this skill's directory.

- **If `config.json` does not exist, OR is missing any required field** (`output.digests_folder`): run the **First-run onboarding**.
- **If `config.json` exists and is complete**: skip onboarding and go straight to **The digest flow**.

## First-run onboarding

Welcome:

> "Welcome to Reading Digest. Quick one-time setup — about a minute. (Part of the Personal Productivity Pack from AI Black Magic.)"

Then walk through:

1. **Digests folder.** "Where should weekly digest files be saved? Default: `Reading Digests/` in your productivity workspace."

2. **Reading list file (optional, common).** "Do you keep a markdown file of articles to read later? If so, give me the path. The skill will read it and pull URLs as items to digest. Default: `reading-list.md` in your productivity workspace. Skip if you don't keep one — you can always paste URLs."

3. **Newsletter Gmail label (optional).** "If you funnel newsletters to a specific Gmail label (e.g., 'Newsletters' or 'Read Later'), give me the label name. The skill will treat unread emails in that label as articles to digest. Skip if not."

4. **Read-later connector (optional).** "Do you use Pocket, Instapaper, or Readwise Reader? If you have one connected to Claude, I'll pull from your queue. Skip if not."

5. **Next-actions file (pack integration).** "Point me at `next-actions.md` so action items extracted from articles flow into your shared task queue. Skip if you don't use the pack."

6. **Goals file (pack integration, recommended).** "Point me at your goals file so the skill can map each article to a goal area and surface the connection. The digest's relevance notes get much more useful with this connected."

7. **Max articles per digest.** "How many articles should I deeply summarize per digest? Default: 12. Older items beyond the cap get a brief one-line mention so nothing is silently lost."

8. **What to do with processed items.** "After I summarize an article, what should happen to it? Options: mark it processed in the source (check the box in reading-list.md, archive in the connector), or leave alone. Default: mark it processed."

Save to `config.json`:

```json
{
  "version": 1,
  "onboarded_at": "YYYY-MM-DD",
  "output": {
    "digests_folder": "<absolute path>"
  },
  "sources": {
    "reading_list_file": null,
    "newsletter_gmail_label": null,
    "use_read_later_connector": false
  },
  "pack_integration": {
    "next_actions_file": null,
    "goals_file_path": null
  },
  "preferences": {
    "max_articles_per_digest": 12,
    "process_action": "mark_done"
  }
}
```

Confirm: "Setup saved. Want to run your first digest now, or wait for the weekend?"

## The digest flow

This is the main workflow. Five steps: collect, fetch, summarize, package, write outputs.

### Step 1 — Collect URLs from all configured sources

Aggregate URLs from each enabled source. See `references/source-handling.md` for the source-by-source details.

**a. reading-list.md (if configured).**
Read the file. Pull every unchecked checkbox item that contains a URL: `- [ ] [Title](url)` or `- [ ] url`. Preserve the order.

**b. URLs pasted in this session.**
If the user's invocation message contained URLs, include them.

**c. Read-later connector (if configured).**
Use Pocket / Instapaper / Readwise Reader (whatever's available) to pull the unread/queue items.

**d. Newsletter Gmail label (if configured).**
Read unread emails in the configured label. Each email becomes a "source" — extract any external URLs from the body AND treat the email body itself as the digestible content for a "newsletter-as-article" entry.

**Deduplicate** by URL across sources. If an article appears in two places, process it once and note the sources in the digest entry.

If no URLs found in any source: tell the user "Nothing to digest right now — your queue is empty across all configured sources." End cleanly.

### Step 2 — Cap and order

Sort by:
1. Items the user added most recently first (newest at top of digest)
2. Then by source priority: pasted-in-session > reading-list > connector > newsletter

Apply the cap from `preferences.max_articles_per_digest` (default 12).

If the queue exceeds the cap, the items beyond the cap get a brief "also in your queue" section at the bottom of the digest with title + source + age, but no summary. Nothing silently disappears.

Tell the user the count up front:

```
Queue: 18 items across reading-list (10), connector (5), and newsletter label (3).
Going to deeply digest the top 12. The other 6 get a brief mention.
This will take a few minutes — go grab coffee.
```

### Step 3 — Fetch each article

For each article in the top N, fetch the content:

- **URLs from reading-list / connector / pasted:** use the available web-fetching tool (e.g., WebFetch). Read the article text.
- **Newsletter emails:** read the email body directly via the Gmail connector.

Handle failures gracefully:
- **Paywalled content / can't fetch:** note the failure in the digest entry. "Couldn't access — try opening the link directly if you want this one." Don't try to bluff a summary based on the URL alone.
- **404 / dead link:** flag for removal. "Looks like this URL is dead — remove from your list?"
- **Very long article (~10,000+ words):** read what you can, note in the digest that the summary is based on the first portion. Better than nothing.

### Step 4 — Summarize each article

For each successfully fetched article, produce:

**a. TL;DR (1 sentence).** What's the piece actually saying. Plain. No editorializing.

**b. 3-5 key takeaways.** The substantive ideas worth keeping. Concrete, not generic. Avoid "the article emphasizes the importance of X" style summaries — those are useless. Better: "Lead with the cost, not the benefit, when pitching change. The article cites a study showing 2x conversion."

**c. Relevance note (1 line).** Why this matters to the user — tied to their goal areas if a goals file is configured. E.g., "Connects to your Work goal area: ship pricing page (the framing trick here is directly applicable)."

If no goals file is configured, the relevance note becomes more general: "Useful frame; would apply to any positioning work." Don't skip it — even generic relevance is more valuable than no relevance.

**d. Goal area tag.** Map to one of the user's goal areas if a goals file exists. Format as `[Goal Area]` at the end of the entry header.

**e. Action items (optional, only if obvious).** If the article suggests something concrete the user could do — "try this technique", "ask X about Y", "test this on Z" — surface it as an action item. ONE max per article. Action items only appear when the article genuinely produces one; don't manufacture them.

See `references/summarization-guide.md` for the quality bar on each of these.

### Step 5 — Write the outputs

**a. The digest file.**

Save to `{digests_folder}/{YYYY-MM-DD}-reading-digest.md` using `assets/digest-template.md`. The digest includes:
- Week date / digest date
- "What stood out this week" — a 2-3 line top-of-file summary of the strongest piece(s)
- Each summarized article (top N) in full structure
- Brief "Also in your queue" section for items beyond the cap
- Goal coverage summary — which goal areas the week's reading touched
- Cross-reference: action items appended to next-actions.md

**b. Action items to next-actions.md.**

For each article-derived action item, append using the standard pack format:

```markdown
- [ ] {action item}   <!-- reading: {article title}, captured: {YYYY-MM-DD HH:MM} -->
```

Skip if `next_actions_file` not configured. Items still appear in the digest file.

**c. Process the source items.**

Based on `preferences.process_action`:

- **mark_done:** check off items in `reading-list.md`, archive in the read-later connector if available, apply a "Processed" label in Gmail (or archive) for newsletter items.
- **leave_alone:** don't touch the sources. The user manages them manually.

If marking done, only mark items that were actually processed (in the top N AND fetched successfully). Failed fetches stay in the queue for next time.

### Step 6 — Print the chat summary

```
Reading digest saved → {digest_path}
{N} articles summarized · {M} action items added to next-actions
{K} items skipped (beyond the cap — see "Also in your queue")

This week's standout:
{1-2 lines on the strongest piece}

Goal coverage from reading:
- Work: {count} pieces
- Learning: {count} pieces
- (untouched areas, if any)
```

Keep it tight. The digest file is the long-form output.

## Editing the config later

Standard pattern — edit `config.json` directly or tell Claude what to change. No re-onboarding needed.

## Graceful failures

- **No sources configured AND no URLs pasted**: ask once for input. If none provided, end cleanly.
- **One source returns errors** (e.g., Gmail connector down): warn the user, continue with the other sources.
- **Web fetch fails on most articles in the queue**: stop and tell the user — something's wrong, maybe connectivity. Don't produce a digest full of "couldn't fetch" entries.
- **No goals file**: skip goal area tagging and goal coverage section. Relevance notes become generic.
- **The user runs the skill twice in one week**: ask "Want a delta digest (only what's new since the last one) or a fresh one?"

## What this skill is NOT

- **Not a research engine.** It summarizes what the user saved; it doesn't go find new articles.
- **Not a verbatim summarizer.** Outputs are interpretation-light but compressed — meant to make the ideas portable, not to replace the read.
- **Not a Pocket / Instapaper replacement.** Use a real read-later tool to capture; this skill processes what those tools accumulate.
- **Not an autopilot.** Default is to mark items processed in their sources, but it doesn't fetch new things or unsubscribe newsletters on its own.

## Reference files

- `assets/digest-template.md` — the weekly digest file structure
- `assets/reading-list-template.md` — example format for a user-maintained reading list file
- `references/source-handling.md` — how to pull from each of the 4 sources
- `references/summarization-guide.md` — quality bar for TL;DR, takeaways, and relevance notes
- `config.example.json` — canonical config shape
