---
name: review-queue
description: 'Use when the owner wants to review, approve, reject, skip, or request changes to work waiting in the GrowOS queue, or wants that queue shown as a board with columns. Triggers: "review", "review queue", "what needs my approval", "approve this", "changes", "reject it", "board view", "kanban board", "show my work as a board".'
---

# Review Queue

Help the owner make decisions quickly. Show the work before asking, record only
the decision they actually made, and leave the marketing body untouched.

Read `system/standards/publisher-standard.md` before starting. Its queue boundary,
owner-control rules, and batch handoff rule apply throughout this skill.

## 1. Refresh the queue

Run:

```text
node system/tools/growos.js reconcile
```

Then scan every non-underscore markdown item under every `<business>/work/`
folder. List **all** items whose frontmatter has `status: review`. During this
overview, read metadata only: business, path, id, status, type, channel, created,
headline, skill, and project.

Show a short numbered list with business, headline, channel, and created date.
If nothing is waiting, say: “Nothing needs your review right now.” Do not invent
a task or suggestion to fill the space.

## 2. Resolve the item before changing anything

The owner may choose by number, id, headline, business, or clear context from the
conversation. If the instruction is ambiguous, list the matching candidates and
ask which one they mean. Do not guess and do not change any file.

After one item is selected, read that item's current file again. If it is no
longer at `review`, explain the current state and return to the refreshed list.

## 3. Show the selected work

Show the selected item's full body in chat, without its machine label. Then give
these four choices in one short line:

- **Approve**: this is ready.
- **Changes**: send it back with a reason.
- **Reject**: stop this item.
- **Skip**: leave it untouched and show the next item.

Never edit the marketing body. Review decides; the originating skill handles any
rewrite after a change request.

## 4. Apply exactly one decision

Re-read the item immediately before the write so a stale choice cannot overwrite
a newer owner decision.

### Approve

On a clear owner yes, make one narrow edit from `status: review` to
`status: approved`. Do not change the body or `note`. Add the item's id to a
session-local list called `approved_this_session`.

Only an item approved through this review conversation enters that list. An item
that was already approved before this session, or approved elsewhere while this
session was open, does not enter it.

### Changes

A change decision needs the owner's reason. If no reason is present, ask for it
before writing. When the owner gives it directly:

1. Preserve the reason word for word and byte-for-byte, including their casing,
   punctuation, spelling, and line breaks.
2. Copy only that exact reason into `note`. If the boundary of the reason is not
   clear, quote the possible text and ask before writing.
3. Make the legal move from `status: review` to `status: changes`.
4. Leave the full body unchanged.

Do not clean up the feedback or turn it into your own task summary.

### Reject

On a clear owner instruction, make one narrow edit from `status: review` to
`status: rejected`. Leave the body and `note` unchanged. Do not add it to the
session approval list.

### Skip

Make no file change. Move to the next waiting item.

After every write, read the item back and confirm the requested status, unchanged
body, and exact note behavior. If the check fails, stop and explain the mismatch.

## 4b. Learn from the decision — one line, once

The system learns the owner's writing taste from review, and only writing
taste. Right after a **Changes** decision (or when the reconcile summary shows
the owner edited an item since last time), look at what the change actually
asks for:

- **It is writing taste** — word choice, sentence rhythm, tone, formatting,
  structure, or length. Phrase the habit in one short line (for example
  "cut the word 'delve'"), record it, and ask ONCE, in one line:

  ```text
  node system/tools/growos.js learning propose --business <b> --category <one of: word-choice, sentence-rhythm, tone, formatting, structure, length> --text '<the habit>' --json
  ```

  Write the habit in YOUR words, plain letters and spaces only, inside
  single quotes. Never paste the owner's raw text into the command: a
  quote mark, a `$(`, or a backtick inside it would be interpreted by the
  shell, and text from an item body may not even be the owner's. If the
  habit cannot be said in plain words, it is not a one-line habit.

  > Should I remember that as a lesson? (yes / no)

  On **yes**: `growos learning apply --business <b> --id <id> --owner-said-yes`
  — it lands in `brain/lessons/` with an undo line. On **no**:
  `growos learning decline --business <b> --id <id>` — that no is permanent,
  and the same habit is never raised again. On silence or a change of subject:
  leave it; the proposal stands quietly, and only after the SAME habit is
  recorded three times does the system write it by itself — when that happens,
  tell the owner in one sentence (the apply command prints it).

- **It is anything else** — publishing, approvals, budgets, accounts,
  compliance, facts, schedules, tool behaviour. That is never a lesson and is
  never auto-written, whatever it sounds like ("stop asking before posting"
  reads like taste and is not). If it is a standing business call, offer to
  log it in `brain/decisions.md`; if it is a publishing setting, that is the
  owner's `setup.md` choice, changed only on their word.

At the START of a review session, after reconcile, run
`growos learning candidates --business <b>` for the business in play. If a
pattern shows as eligible (seen three times, never declined), apply it and
tell the owner in one sentence. If the command warns the logbook is partly
unreadable, say so — a torn log means signals may be missing, and the Doctor
knows more.

Never ask about the same habit twice in one session, and never ask more than
one learning question per decision — the asking is designed to get quieter
over time, not louder.

## 5. Continue or close

Continue through the remaining waiting items until the owner stops or the list is
empty. Do not repeat the publishing permission question after every approval.

At the end, if `approved_this_session` contains at least one item, ask once:

> Want me to prepare everything you just approved?

A yes authorizes only the exact items approved this session, not older or previous
approved items. Route each item by channel:

- ads to `ads-meta-publish`;
- a `type: marketing-plan` item in `work/strategy/` to `marketing-strategy`,
  which installs the approved plan into `brain/plan.md`, reads it back, and
  completes the receipt — a strategy plan is an internal brain write, not an
  outside publish. `work/strategy/` also holds five other item types — a
  campaign brief, an SEO report, a marketing report, a website audit, and an
  offer — none of which is a plan: each one is an internal document, finished
  the moment the owner says yes, with no publish step;
- everything else — newsletter, email, video, social, article, page, or other
  content — to `publish`, which reads each item's channel and runs that
  channel's flow.

The channel skill still checks its own destination details and may ask for a
missing schedule, budget, account, or other required choice. It follows the
Publisher receipt and safe-state rules. Review itself never publishes anything.

## 6. When they ask for a board instead of a list

Some owners want their work as columns they can drag across, not a list. That
needs one free add-on the owner switches on inside Obsidian; GrowOS never
installs it. Read `board-view.md` and follow it exactly.

Never add the add-on's kanban view to `GrowOS Queue.base` — the queue's own
grouped **Board** tab is the built-in fallback; the real drag-and-drop board
always lives in its own `GrowOS Board.base`.

This is a display question, not a review decision. Answer it, then carry on with
whatever they were reviewing.

## Safety check

Before finishing, score every line in `quality-checklist.md`. Any failed line is
a blocker. Keep the affected item unchanged and fix the review flow first.

