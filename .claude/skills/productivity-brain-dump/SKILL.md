---
name: productivity-brain-dump
description: Processes a messy brain dump — typed text, voice transcript, interactive Q&A, or a capture inbox file — and sorts every item into 5 buckets (Tasks, Ideas, Decisions, Questions, Notes). Cleans up phrasing, maps tasks to goal areas, flags urgent items, and handles emotional/anxious content with a brief acknowledgment instead of forcing it into a task. Saves a timestamped dump file and appends actionable items to a shared next-actions.md file the Daily Plan Builder reads. Optionally offers to plan today's MITs right after the dump. Use this skill whenever the user says "brain dump", "process my brain dump", "I need to get this out of my head", "clear my head", "organize my thoughts", "sort through what's on my mind", "what should I do with all this", "process my notes", "I've been thinking about a lot of stuff", "capture my thoughts", "dump everything", "I have a million things in my head", or pastes/uploads a wall of stream-of-consciousness text without specifying what to do with it. Also trigger when the user references an "inbox file" or "capture file" they want processed. First run walks the user through a one-time setup.
---

# productivity-brain-dump

This skill takes whatever mess of thoughts a user is carrying and turns it into a clean, sorted output — without forcing a particular productivity philosophy on them and without losing emotional context. It's designed to feel like a thoughtful assistant going through their notebook with them, not a parser.

## First-run check

Before doing anything else, look for `config.json` in this skill's directory.

- **If `config.json` does not exist, OR is missing any required field** (`output.dumps_folder`, `output.next_actions_file`): run the **First-run onboarding** below.
- **If `config.json` exists and is complete**: skip onboarding and go straight to **The dump flow**.

## First-run onboarding

Welcome the user briefly:

> "Welcome to Brain Dump. Quick one-time setup — about a minute — so the skill knows where to save things. (Part of the Personal Productivity Pack from AI Black Magic.)"

Then walk through these questions using AskUserQuestion when available, conversationally otherwise:

1. **Dumps folder.** "Where should each processed dump be saved?" Default: a `Brain Dumps/` subfolder of the user's productivity workspace.

2. **Next-actions file.** "Where is your `next-actions.md`?" This vault uses Obsidian Tasks plugin — tasks are inserted into manual sections (@online, @telefon, @doma, @venku), not appended to the end of the file.

3. **Inbox file (optional).** "If you keep a capture inbox somewhere — a notes-app file, a phone-synced markdown file — give me the path. The skill will read whatever's accumulated when you run a dump. Skip if you don't have one."

4. **Someday-maybe file.** "Where is your `someday-maybe.md`? Ideas and Decisions from the dump will be written there." Default: `gtd/someday-maybe.md` in the vault.

5. **Offer to write to vault after each dump?** Default: yes. "After sorting, should I offer to write tasks/ideas/decisions to your vault files?"

Save to `config.json` with this schema:

```json
{
  "version": 1,
  "onboarded_at": "YYMMDD",
  "output": {
    "dumps_folder": "<absolute path>",
    "next_actions_file": "<absolute path>",
    "someday_maybe_file": "<absolute path>",
    "inbox_file_path": null
  },
  "preferences": {
    "ask_to_write_after_dump": true,
    "enrich_tasks": true
  }
}
```

`config.example.json` in this folder is the canonical reference.

Then confirm: "Setup saved. What's on your mind?"

## The dump flow

This runs every time after onboarding.

### Step 1 — Determine the input source

Read the user's message and context to decide which input mode applies. Don't make the user pick from a menu — figure it out and confirm only if ambiguous.

- **Pasted text** — if the user's message already contains the dump (a wall of text, a bulleted brain dump, etc.), use it directly.
- **Voice transcript / uploaded file** — if the user uploaded a `.txt`, `.md`, or similar transcript file, read it.
- **Inbox.md** — if the user says "process my inbox", "process what I captured", "run my brain dump from inbox", or similar, AND `inbox_file_path` is set in config, read that file.
- **Interactive Q&A** — if the user says "brain dump", "I need to clear my head", or similar with no content provided, ask conversationally:
  > "What's on your mind? Type whatever comes — full sentences, fragments, bullets, all fine. When you're done, say 'that's it' or 'done'."
  
  Loop "anything else?" until the user signals done.

If none of these match clearly, ask: "Do you want to (a) type/paste it now, (b) point me at a file, or (c) walk through it interactively?"

### Step 2 — Sort items into 5 buckets

Process the raw input and place each distinct thought into exactly one of these buckets:

- **Tasks** — actionable items the user can act on. Verb-led. Examples: "Email Sarah the draft", "Pay the electric bill", "Schedule dentist."
- **Ideas** — someday/maybe, projects, possibilities, opportunities. Things that aren't ready to become tasks yet. Examples: "Maybe build a course on email marketing", "What if we offered a free tier?"
- **Decisions** — things requiring a choice the user hasn't made yet. Examples: "Stay in current apartment or move?", "Hire the contractor or do it myself?"
- **Questions** — things requiring an answer, research, or external input. Examples: "What's the deadline for the tax filing?", "Does Stripe support recurring discounts?"
- **Notes** — observations, references, capture for memory, AND emotional content (see Step 4). Examples: "Good quote: 'The cave you fear holds the treasure you seek.'", "Reminder: Mom's birthday is in 6 weeks."

See `references/sorting-guide.md` for trickier sorting decisions if you need them.

Sort by intent and shape of the item, not by length. A two-word item can be a Task ("Call mom"); a paragraph can still be a Note. Don't over-merge — separate items should stay separate.

### Step 3 — Enrich Tasks (medium enrichment)

For each item in the Tasks bucket:

- **Clean up phrasing.** Convert fragments and shorthand into clear verb-led tasks. "call john abt the thing" → "Call John about [the thing]". Don't invent context the user didn't provide — if "[the thing]" is ambiguous, keep the placeholder so the user can fill it in.

- **Assign GTD context.** Every task needs a context for the vault's task management system. Assign exactly one:
  - `@online` — anything on a computer or phone, regardless of location (email, payments, WhatsApp, research, writing, any digital task)
  - `@telefon` — voice calls only
  - `@doma` — tasks requiring physical presence at home, not online
  - `@venku` — errands outside the home
  Record the context — it's used in Step 6 to place the task in the correct section.

- **Flag urgent items.** If the task contains any of these urgency signals, mark it with a `🔥` prefix: "today", "asap", "urgent", "by Friday" (or any near-future weekday), "due [date]", "deadline", "this morning", "this afternoon", "tonight", "ASAP", "right now".

Example of a fully enriched task:
- Raw: `urgent: send proposal to acme today`
- Enriched: `🔥 Send proposal to Acme today` → context: @online

### Step 4 — Handle emotional content gently

If any item reads as anxiety, worry, frustration, grief, excitement, or other emotional content:

- Acknowledge briefly. **One** calm sentence in the chat summary at the end — something like "Noted — sounds like the presentation is weighing on you." Not a paragraph. Not advice. Not therapy.
- File the item itself under Notes verbatim (or lightly tidied), preserving the user's actual words.
- Do NOT extract a task from emotional content UNLESS the user clearly wrote one alongside it. ("I'm freaking out about Friday's presentation and I still need to make the slides" → file the worry under Notes, extract "Make slides for Friday's presentation" as a task.)
- Do NOT skip emotional content — it's part of what the user wanted off their chest.

The principle: respect the user's autonomy. They get to decide whether a worry needs action. The skill just makes sure nothing gets lost.

### Step 5 — Save the dump file

Save to `{output.dumps_folder}/{YYMMDD-HHMM}-dump.md` using the template in `assets/dump-template.md`. Substitute real values. Use 24h time in the filename (e.g., `260519-1430-dump.md`).

If the dumps folder doesn't exist yet, create it.

### Step 6 — Write tasks to next-actions.md

The vault's `next-actions.md` uses Obsidian's Tasks plugin. Each context section (`## @online`, `## @telefon`, `## @doma`, `## @venku/pochůzky`) contains manual items followed by a ` ```tasks ` plugin query block. New tasks must be inserted into the manual area of the correct section — NOT appended to the end of the file, and NOT inside the query block.

For every item in the Tasks bucket:

1. Take its context from Step 3: @online, @telefon, @doma, or @venku.
2. Open `{output.next_actions_file}` and find the section `## @{context}` (use `## @venku/pochůzky` for @venku).
3. Insert the task **immediately before the first line starting with ` ```tasks `** in that section.
4. Format — plain checkbox, no HTML comments (they break the Tasks plugin):
   ```
   - [ ] {enriched task text}
   ```

**If a section doesn't exist:** add it before `## @venku/pochůzky` with just the header and the task — no query block (the user can add one later if needed).

**Don't deduplicate.** Duplicate tasks are signal — the user is surfacing something that keeps coming back.

### Step 6b — Write Ideas and Decisions to someday-maybe.md

If `{output.someday_maybe_file}` is configured:

**Ideas:** Append each idea to the most fitting section of `someday-maybe.md`:
- `## Projekty` — project-scale ideas
- `## Vzdělávání` — courses, skills, learning
- `## Místa` — places to visit
- `## Ostatní` — anything else

Format: `- {idea text}`

**Decisions:** Append each decision to `## Otevřená rozhodnutí`.
Format: `- {decision text} — zachyceno {YYMMDD}`

Insert after the section header and any existing items. If a section doesn't exist, add it before the end of the file.

If `someday_maybe_file` is not configured, skip silently.

### Step 7 — Print the chat summary

Format:

```
Brain dump processed → {YYMMDD-HHMM}-dump.md
{N} tasks → next-actions.md | {N} ideas/decisions → someday-maybe.md

📊 Sort
- Tasks: {count}
- Ideas: {count}
- Decisions: {count}
- Questions: {count}
- Notes: {count}

🎯 Tasks captured
- {task 1}
- {task 2}
- ...

{If applicable, one-sentence emotional acknowledgment here}
```

Keep it tight. The point of a brain dump is to feel lighter afterward — a long summary defeats that.

### Step 7b — Offer to log CRM touchpoints (optional)

If the Personal CRM skill (`productivity-personal-crm`) is installed AND its config has `auto_extract_from_pack: ask` or `always` AND any item in this dump mentions a known contact (compare against contacts.json), make ONE light offer per contact mentioned:

> "You mentioned [name] in this dump. Want to log a touchpoint with them?"

If yes: hand off to the CRM skill's "Log a touchpoint" mode for that contact.
If no or no response: skip — the dump itself still captures the mention.

If `auto_extract_from_pack` is `always`: silently log a brief "mentioned in brain dump on [date]" entry to the contact's record. Don't prompt.

If `auto_extract_from_pack` is `never` or CRM isn't installed: skip this step entirely.

### Step 8 — Offer to journal a substantive decision (optional)

If the Decision Journal skill (`productivity-decision-journal`) is installed AND its config has `allow_proactive_offers: true` AND the Decisions bucket from this dump has at least one substantive item (more than 5 words, not just "decide about X"), make ONE light offer:

> "One of these looks substantive — '[the decision item]'. Want to capture it as a full Decision Journal entry? It's a 5-min structured walk-through that pays off when you review later."

If yes: hand off to the Decision Journal skill, passing the decision item as the starting point.

If no or no response: skip — the item is already filed in the dump's Decisions bucket, no work lost.

Skip this step entirely if Decision Journal isn't installed OR proactive offers are disabled.

### Step 9 — Close

Tasks are in next-actions.md, ideas and decisions are in someday-maybe.md. Stop cleanly.

## Editing the config later

If the user says "change my dumps folder", "use a different inbox file", or similar, read `config.json`, update only what they asked, save. Don't re-run full onboarding.

## Graceful failures

- **Inbox.md missing** but configured: mention it once ("Heads up: your inbox file at `{path}` isn't accessible. Continuing with what you've typed.") and proceed with other inputs.
- **someday_maybe_file missing or not configured**: skip Step 6b, note in summary that ideas/decisions were not saved to file.
- **No actionable items in the dump** (all Notes/Ideas/Questions, no Tasks): skip Step 8. Tell the user: "No actionable tasks this time — everything went into the other buckets."
- **Empty dump** (user runs the skill but doesn't provide anything): ask once, "What's on your mind?" If they still don't dump, end the conversation kindly.

## Reference files

- `assets/dump-template.md` — markdown template for the saved dump file. Use in Step 5.
- `references/sorting-guide.md` — heuristics for tricky sort decisions (e.g., "is 'figure out my pricing' a Task or a Decision?"). Load only if a particular item is genuinely ambiguous.
- `references/inbox-file-format.md` — spec for the optional inbox.md file. Load if the user asks how to set one up.
- `config.example.json` — canonical config shape.
