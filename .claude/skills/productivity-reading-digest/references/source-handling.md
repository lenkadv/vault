# Source Handling — Per-Source Pull Logic

The skill pulls articles from four possible sources. Each has its own retrieval pattern, its own deduplication rules, and its own post-processing options.

## Source 1: reading-list.md (user-maintained file)

**Pull logic:**
1. Read the file at `sources.reading_list_file`.
2. Find every line matching the pattern `- [ ] ...` (unchecked checkbox).
3. Extract URLs from each line — either markdown link `[title](url)` or bare URL.
4. Use the title from the markdown link if present; otherwise the title comes from the fetched article's `<title>` tag (Step 3 of the main flow).

**Order:** preserve the user's order. If the user wants newest-first, they organize it that way; if they want a thematic order, the skill respects that.

**Post-processing (if `process_action: mark_done`):**
- Change `- [ ]` to `- [x]` on each successfully digested line.
- DON'T delete lines. The processed history is useful.
- DON'T reorder lines.

**Dedup:**
- Within reading-list itself: if the same URL appears on multiple lines, treat as duplicates and process once (mark all matching lines done).
- Across sources: the URL key is used to dedup with other sources.

**Edge cases:**
- A line with multiple URLs: treat as one item (probably an article with a referenced source). Take the first URL as the primary.
- A line with no URL but lots of text: ignore. Reading-list items need URLs.
- A line under a heading the user has organized by topic: ignore the heading semantically; the goal-area mapping comes from the goals file, not the reading-list structure.

## Source 2: URLs pasted in the current chat

**Pull logic:**
1. Scan the user's invocation message for URLs.
2. Each URL becomes a one-shot item for this digest run.
3. No persistence — these aren't saved anywhere for next time unless the user adds them to reading-list.md themselves.

**Order:** as pasted.

**Post-processing:** none. Pasted URLs don't get marked done because there's no source to mark.

**Dedup:** against other sources — if a pasted URL also appears in reading-list.md or the connector, treat as one item and prefer the pasted source (the user explicitly surfaced it).

## Source 3: Read-later connector (Pocket / Instapaper / Readwise Reader)

**Pull logic:**
1. Check if a connector is available (Pocket, Instapaper, Readwise Reader, etc.). If multiple, use the one the user has connected; if multiple connected, use Pocket first by default and let the user override.
2. Pull the unread / "to read" queue. Most connectors have a queue or unread state — use that.
3. For each item, get the URL, title, and date saved.

**Order:** newest saved first (matches the typical "what have I been saving lately" mental model).

**Post-processing (if `process_action: mark_done`):**
- For Pocket: archive the item (mark as read).
- For Instapaper: archive.
- For Readwise Reader: archive or "shortlist done" depending on the tool's semantics.

If `process_action: leave_alone`, the items stay in the queue. The user manages them manually.

**Dedup:** by URL across sources.

**Edge cases:**
- Connector down or auth expired: warn the user, skip this source, continue with others. Don't halt the whole digest.
- Very large queue (200+ items): respect the digest cap. Older items beyond the cap get the "Also in your queue" mention.

## Source 4: Gmail newsletter label

**Pull logic:**
1. Use Gmail's search/list to find unread messages with the configured label (`sources.newsletter_gmail_label`).
2. For each email:
   - Treat the email body itself as the "article" to digest. The user already routed it to this label deliberately.
   - Also extract any external URLs from the email body — these go to a small "also linked in this newsletter" mention but are not separately digested unless the user specifies.

**Order:** by date received, newest first.

**Post-processing (if `process_action: mark_done`):**
- Apply a "Digested" or "Processed" label to the email (create the label if it doesn't exist).
- Optionally also archive (remove from inbox) — but keep the label so the email is findable.

If `process_action: leave_alone`, don't touch the emails. The user manages them.

**Dedup:** newsletter emails rarely overlap with the other sources — they're typically unique to email.

**Edge cases:**
- Newsletter label exists but has no unread mail: skip this source silently.
- Newsletter email is just a header with all the content behind URLs: the newsletter body is still the "article" — summarize the framing the newsletter put around the links rather than fetching every linked piece.
- HTML-heavy newsletter where the body is mostly images: extract any text content. If the email is genuinely image-only with no text, note it ("This newsletter is image-based — can't summarize meaningfully") and move on.

## Cross-source deduplication

URL is the key. If two sources surface the same URL:

1. Process the article once.
2. Note all sources in the digest entry: "Source: reading-list + newsletter."
3. Mark done in all sources (if `process_action: mark_done`).

## When all sources are empty

Tell the user "Nothing to digest right now — your queue is empty across all configured sources." End cleanly. Don't generate an empty digest.

## When the user pastes URLs AND has populated sources

Run all enabled sources, including the pasted URLs. The cap still applies. Pasted URLs get priority (they're at the top of the order) because the user just surfaced them.
