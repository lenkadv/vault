---
name: humanize
description: 'Quality pass on any text or work item: dispatch the humanize agent to remove AI tells, restore the owner voice, and flag any compliance clash for the owner to decide. Triggers: "humanize", "polish", "make this sound human", "does this sound AI", "clean this up", "readability", "check friction".'
---

# Humanize

This skill takes a piece of writing and makes it read like this business wrote it
on a good day. Reach for it when the owner says "humanize", "polish", "make this
sound human", "does this sound AI", "clean this up", "readability", or "check
friction".

Its only job is to take what the owner pointed at, walk any work item to a legal
place to edit, dispatch the `humanize` agent to do the actual quality pass, then
apply what comes back and report it plainly. This skill does not read the brain,
does not run the scorer, and does not decide what counts as a tell, a voice
violation, or a compliance clash — the agent does all of that. This skill moves
files and talks to the owner.

## What it works on

- **Pasted text in chat.** No file, no status. Dispatch the agent with the text and
  the business folder path; reply with the edited text plus one line on what
  changed.
- **A work item at `draft`.** Dispatch the agent with the file path and the
  business folder path; write the returned text back into the file, below the
  frontmatter, leaving every stamped field untouched. Report the before and after
  score in one line.
- **A work item at `review`** (the owner asked for another pass). Walk the status
  the legal way first: `review -> changes -> draft`, each move its own save. Then
  edit exactly as the draft case above. Then move `draft -> review` again, its own
  save. The frozen snapshot stays the original; that is correct — this skill never
  rewrites history, only the live draft.

If it is unclear which business folder pasted text belongs to, ask. Never guess
across businesses.

## Dispatching the agent

Hand the `humanize` agent exactly two things: the draft text or a file path to it,
and the business folder path. Nothing else — it reads `voice.md`, `lessons/`,
`business.md`, `proof/`, and `compliance.md` itself, and it runs the scorer itself.
If the owner asked for only one playbook (just readability, just friction), say so
when you dispatch it. When the owner asked for multiple versions, say how many —
the agent owns the variety rules.

What comes back: a status (shippable as is, or edited), findings grouped as tells /
voice / lessons / facts, a COMPLIANCE FLAGS section, the edited text, and a change
list. Nothing in that report is yours to second-guess — you apply the text and
relay the findings.

## Applying the result

- If the agent says shippable as is, touch nothing. Say so.
- Otherwise, replace the text (pasted reply, or the work-item body) with exactly
  what the agent returned. Never re-touch it yourself, and never fold in your own
  edits on top of the agent's.
- A COMPLIANCE FLAGS entry never gets applied as an edit. It is not something you
  fix; it is something you show the owner, quoted, so they can decide.

## Reporting back

Keep it plain, the same way every GrowOS skill talks to the owner.

- **Pasted text:** one line on what changed. Never a lecture, never a report the
  owner did not ask for.
- **A work item:** the before and after score, plus at most the top three things
  that mattered from the change list — never a long dump.
- **Always say what was flagged but left alone** — a placeholder that needs the
  owner, an unapproved quote, and every COMPLIANCE FLAGS entry, quoted plainly with
  its `brain/compliance.md` line — so nothing looks done that is not, and so a
  compliance question reaches the owner instead of getting buried in a diff.

## When the agent can't be dispatched

If this runtime cannot run a separate agent, do not skip the pass silently: read
`.claude/skills/humanize/rulebook/tells.md` and the playbooks yourself, run
`.claude/skills/humanize/scripts/ai-tells.js` yourself, and apply the same method
in-session, law for law. Say plainly in your report that this ran as a fallback
pass, not the separate agent. If the scorer will not run at all, say that too and
do the pass by the rulebook alone. A missing agent or scorer is a normal, honest
state to report; pretending the pass ran as usual is not.

## What this skill never does

- It never edits text itself — every change comes from the dispatched agent; this
  skill only applies and reports it (or runs the documented fallback above).
- It never changes supported meaning, facts, prices, quotes, or placeholders, and
  it never leaves a claim the brain proves wrong, because it never overrides what
  the agent returned.
- It never rewrites, cuts, or softens copy to resolve a compliance flag — it shows
  the flag to the owner, quoted, and stops there. That decision is the owner's.
- It never invents a specific.
- It never publishes or moves an item to `approved`.
- It never edits to beat an AI detector.
- It never hand-edits a work item's stamped fields, and it never skips the legal
  status walk for an item sitting at `review`.
