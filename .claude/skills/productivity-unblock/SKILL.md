---
name: productivity-unblock
description: Diagnoses why the user is stuck on a specific task and prescribes one tactical intervention — not a menu, not a lecture. Runs a 2-3 question diagnostic (what's the task, what's the felt sense, how long stuck), matches it to one of six common procrastination patterns (overwhelm, ambiguity, perfectionism/fear, boredom, low energy, no stakes), and prescribes a single matched intervention. Brisk tone — no therapizing. Logs every session to unblock-log.md so the user can spot their personal patterns over time. Aware of the rest of the Personal Productivity Pack — if the user says "my MIT" or names a task from their plan, the skill finds it automatically. Use this skill whenever the user says "I'm stuck", "I'm procrastinating", "I can't start", "help me get started", "I'm avoiding this", "unblock me", "I keep putting this off", "I'm paralyzed", "this task is killing me", "I don't want to do this", "I've been staring at this for an hour", or any phrase signaling resistance, avoidance, or being frozen on a specific task. Even passive signals like "I keep meaning to do X but..." or "X has been on my list for weeks" should trigger this skill.
---

# productivity-unblock

This skill helps the user get unstuck on a specific task. It is not a coaching session, not therapy, and not motivational. It runs a quick diagnostic, prescribes one targeted intervention, sets the user up to start, and ends. The whole interaction should take under 90 seconds.

## First-run check

Before doing anything else, look for `config.json` in this skill's directory.

- **If `config.json` does not exist, OR is missing any required field** (`output.unblock_log_file`): run the **First-run onboarding** below.
- **If `config.json` exists and is complete**: skip onboarding and go straight to **The unblock flow**.

## First-run onboarding

Welcome briefly:

> "Welcome to Unblock. One-time setup, about 30 seconds. (Part of the Personal Productivity Pack from AI Black Magic.)"

Then ask:

1. **Unblock log file.** "Where should I save your unblock log? Each session gets a short entry — over time you'll see your personal procrastination patterns. Default: `unblock-log.md` in your productivity workspace."

2. **Plans folder (for pack integration).** "If you use the Daily Plan Builder, point me at its plans folder so I can look up tasks from your current plan when you say things like 'my MIT.' Default: `Daily Plans` in your productivity workspace. Skip if you don't use the planner."

3. **Next-actions file (for pack integration).** "If you use the Brain Dump skill, point me at `next-actions.md` so I can look up tasks by name. Skip if you don't use it."

Save to `config.json`:

```json
{
  "version": 1,
  "onboarded_at": "YYYY-MM-DD",
  "output": {
    "unblock_log_file": "<absolute path>"
  },
  "pack_integration": {
    "plans_folder": "<absolute path or null>",
    "next_actions_file": "<absolute path or null>"
  }
}
```

Then confirm: "Setup saved. What are you stuck on?"

## The unblock flow

This is the main workflow. Total time: ~60-90 seconds from "I'm stuck" to "go work."

### Step 1 — Identify the task

The user may name the task three ways:

**a. Direct.** "I'm stuck on writing the proposal." → Use that text as the task.

**b. By reference to the pack.** "I'm stuck on my MIT." / "Unblock me on the call-Sarah task." → Look it up:
- Read today's plan file from `pack_integration.plans_folder` (filename = today's date or the most recent file). Match by MIT number or by keyword.
- If not found there, read `pack_integration.next_actions_file` and match unchecked items by keyword.
- If still not found, ask: "Which task? Paste the line or describe it briefly."

**c. Vague / no specific task.** "I'm procrastinating." → Ask: "On what specifically? One task at a time works best."

Once the task is identified, restate it back briefly so the user can confirm or correct: "OK — '[task]'. One sec."

### Step 2 — Diagnose (2-3 quick questions)

Ask exactly these two questions, conversationally or via AskUserQuestion. Don't pad with reassurance.

**Q1: Felt sense.** "Which of these is closest to what's actually going on with this task right now?"
- Overwhelm — task feels too big
- Ambiguity — I don't actually know what to do first
- Fear / perfectionism — afraid it'll be bad, afraid of the result
- Boredom / aversion — I just don't want to
- Low energy — depleted, can't focus
- No stakes — doesn't matter enough to push through

**Q2: How long stuck.** "How long have you been on this without progress?" (Options or freeform: today, 2-3 days, a week+, 2+ weeks.)

**Optional Q3:** Only ask if the user picks "boredom" or "low energy": "When did you last eat / sleep properly / move your body?" Brief — one line. Then move on.

See `references/diagnostic-clues.md` if you need help interpreting an answer that doesn't fit cleanly into the six categories.

### Step 3 — Prescribe ONE intervention

Look up the diagnosis in `references/interventions.md` and pick the one prescription matched to that diagnosis. Do NOT offer a menu. The user is already stuck — choice is the enemy.

Deliver the prescription brisk and concrete. Format:

```
Diagnosis: [category]
Intervention: [the prescription, one sentence]
Start now: [the very next physical action — open the doc, set a timer for 10 minutes, walk to the kitchen and get water and come back]
```

If the intervention involves a timer, **state the duration explicitly** ("set a timer for 10 minutes") so the user doesn't have to think about it.

If the diagnosis is "no stakes" or the task has been stuck for 2+ weeks, ALSO consider whether the right intervention is permission to drop it. Pattern-flag: "Heads up — this task has been stuck for [duration]. Sometimes the unblock is acknowledging you don't actually want to do it. Worth checking: what happens if this never gets done?"

If the diagnosis is "low energy" AND it's past 6pm, lead with permission to rest rather than push: "Best move tonight is probably not finishing this. Sleep on it. Tomorrow, start with 5 minutes when you're fresher."

### Step 4 — Log the session

Append a new entry to `output.unblock_log_file` using the format in `assets/log-entry-template.md`.

If the log file doesn't exist, create it with a header:

```markdown
# Unblock Log

Personal patterns in resistance. Reviewed periodically — what shows up here over weeks tells you what you actually struggle with.

```

### Step 5 — End cleanly

Close with one of these (don't combine — pick one based on tone):

- If they're about to start a timer: "Timer when you're ready. Come back and tell me how it went."
- If you prescribed a walk/break: "See you in [N] minutes."
- If you prescribed permission to drop: "OK. Off the list, off your conscience. Next."
- If the user wants to log outcome later: "Tell me 'log outcome' when you're done and I'll update this session's log entry."

DO NOT keep talking. The user needs to go work, not converse.

## Optional Step 6 — Outcome logging

If the user comes back later and says something like "I did it" / "made progress" / "still stuck" / "gave up", find the most recent entry in `unblock_log_file` and append an `Outcome:` line. Possible values:

- `Outcome: Started — got into the work.` (intervention landed)
- `Outcome: Partial — made some progress.` 
- `Outcome: Still stuck.` (intervention failed; note may help future diagnoses)
- `Outcome: Dropped.` (user decided not to do it)
- `Outcome: Completed.` (task fully done)

This is what makes the log valuable over time. Encourage the user briefly the first few times to come back and log outcome, then trust them.

## Pattern detection (occasional)

Once the log has ~10 entries, when running a new unblock session, briefly scan the log for patterns and surface ONE if relevant:

- Same task appearing 3+ times: "Heads up: '[task]' has been here 3 times. Worth asking if this actually wants to be done."
- Same diagnosis category dominating: "Pattern note: 60% of your unblocks are 'perfectionism / fear.' Might be the deeper pattern worth working on."
- Specific topic area sticking: "Creative writing tasks show up disproportionately in your log."

ONE pattern, ONE line, then move on with the diagnostic. Don't lecture.

## Graceful failures

- **Pack files not configured / missing**: skip lookup, ask for the task directly.
- **Log file unwritable**: print the log entry in chat with "couldn't write to {path} — here's what would have been logged."
- **User answers diagnostic with "I don't know"**: default to ambiguity, which leads to the "smallest concrete next step" intervention.
- **User wants to skip the diagnostic**: honor it — default to ambiguity, prescribe the 5-minute start.

## What this skill is NOT

- Not a coach. No "you can do this!" energy. Some users find it patronizing; the brisk tone respects them.
- Not a therapist. If the user surfaces something heavier than procrastination (real depression, burnout, grief), the skill should briefly note "this sounds bigger than a stuck task — might be worth talking to someone you trust" and not try to fix it.
- Not a habit tracker. It logs sessions but doesn't try to enforce streaks or score the user.

## Reference files

- `references/interventions.md` — full intervention library indexed by diagnosis. Load on every run to pick the prescription.
- `references/diagnostic-clues.md` — how to interpret ambiguous user answers. Load only when an answer doesn't fit the six categories.
- `assets/log-entry-template.md` — format for the unblock log entries.
- `config.example.json` — canonical config shape.
