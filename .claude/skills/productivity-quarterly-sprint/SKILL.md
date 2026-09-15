---
name: productivity-quarterly-sprint
description: Runs a structured 4-session quarterly planning sprint spread across a week (typically the last week of a calendar quarter). Aggregates from every other pack skill's outputs — 12 weeks of daily plans, weekly reviews, brain dumps, meeting recaps, decisions log, decision-journal entries, reading digests, calendar audits, unblock log patterns, CRM relationship data — and uses them to produce three artifacts: a quarterly review file (deep look-back across 90 days), an updated goals.md (current state of stated goals refreshed with what was achieved/dropped/learned), and a next-quarter themes/priorities file (1-3 themes, 3-5 priorities each, optional metrics) that the weekly review consults all quarter. State-saved across sessions so the user can do this over a week, not in one painful sitting. Use this skill whenever the user says "quarterly review", "quarterly planning", "Q[N] planning", "end-of-quarter review", "set my quarterly goals", "plan the next quarter", "start my quarterly sprint", "resume my quarterly sprint", "reflect on the quarter", "what did I do this quarter", or any phrase about quarterly-scale reflection or planning. The 4 sessions: (1) look back across all pack data, (2) reflect deeply, (3) set themes + priorities, (4) operationalize cadences and time blocks. Designed for the end of Q1/Q2/Q3/Q4 on the calendar.
---

# productivity-quarterly-sprint

This skill is the apex of the pack. Every other skill produces material; this skill reads across all of it to produce the deepest reflection and the strongest forward intent. Done well, the quarterly sprint is what makes the year compound — without it, 90 days pass and the user has no sense of where they actually went.

The sprint is **4 sessions over a week**, not 90 minutes in one sitting. The structure:

| Session | When | Time | Purpose |
|---|---|---|---|
| 1. Look back | Day 1 | 60-75 min | Aggregate the quarter's data; surface what happened |
| 2. Reflect | Day 2-3 | 45-60 min | Deeper interpretation — what was learned, what shifted |
| 3. Themes + priorities | Day 3-4 | 45-60 min | Set 1-3 themes with 3-5 priorities each for next quarter |
| 4. Operationalize | Day 5-6 | 30-45 min | Cadences, time blocks, scheduled tasks, decision-journal review dates |

State is saved between sessions. The user invokes the skill to start, comes back to continue, and the skill picks up where they left off.

## First-run check

Before doing anything else, look for `config.json` in this skill's directory.

- **If `config.json` does not exist, OR is missing required fields** (`output.reviews_folder`, `output.themes_file`, `output.goals_file_path`): run the **First-run onboarding**.
- **If `config.json` exists and is complete**: skip onboarding and go to **The sprint flow**.

## First-run onboarding

Welcome:

> "Welcome to Quarterly Sprint. This is a 4-session ritual run at the end of each calendar quarter — about 3-4 hours total spread across a week. (Part of the Personal Productivity Pack from AI Black Magic.) Quick one-time setup."

Then walk through:

1. **Quarterly reviews folder.** "Where should quarterly review files be saved? Default: `Quarterly Reviews/` in your productivity workspace."

2. **Quarterly themes file.** "Where should the current quarter's themes/priorities file live? The weekly review reads it all quarter. Default: `quarterly-themes.md` in your productivity workspace."

3. **Goals file path.** "Point me at your goals file. The sprint updates it at the end of Session 3 with what's still in play, what's done, and what's new. (Same goals.md the rest of the pack already reads.) Default: `goals.md` in your productivity workspace."

4. **Pack integration paths (recommended — the more, the richer the look-back).** Ask for each:
   - Weekly reviews folder
   - Daily plans folder
   - Brain dumps folder
   - Meeting recaps folder
   - Decisions log file
   - Decision journal folder
   - Reading digests folder
   - Calendar audit reports folder
   - Unblock log file
   - Personal CRM contacts index
   - Note synthesis folder
   - Email digests folder

5. **Sprint state file.** "Where should I save sprint progress between sessions? Default: hidden file in the reviews folder. The state file lets you resume across days."

6. **Reminder preference.** "Want me to suggest scheduled tasks at the start of each quarter to remind you when to begin? (Uses the schedule skill — optional.)"

Save to `config.json`:

```json
{
  "version": 1,
  "onboarded_at": "YYYY-MM-DD",
  "output": {
    "reviews_folder": "<absolute path>",
    "themes_file": "<absolute path>",
    "goals_file_path": "<absolute path>",
    "state_file": "<absolute path>"
  },
  "pack_integration": {
    "weekly_reviews_folder": null,
    "plans_folder": null,
    "brain_dumps_folder": null,
    "meeting_recaps_folder": null,
    "decisions_log_file": null,
    "decision_journal_folder": null,
    "reading_digests_folder": null,
    "calendar_audits_folder": null,
    "unblock_log_file": null,
    "contacts_index_file": null,
    "note_synthesis_folder": null,
    "email_digests_folder": null
  },
  "preferences": {
    "suggest_scheduled_reminders": true
  }
}
```

Confirm: "Setup saved. Want to start the sprint now, or come back at the end of the quarter?"

## The sprint flow

Detect which session to run from state. If no state file exists OR state is marked `complete` for the current quarter: start Session 1. Otherwise: resume the next pending session.

### Determining the quarter

The "quarter" being reviewed is the most recently completed calendar quarter:

- If today is in Apr-Jun: previous quarter is Q1 (Jan-Mar)
- If today is in Jul-Sep: previous quarter is Q2 (Apr-Jun)
- If today is in Oct-Dec: previous quarter is Q3 (Jul-Sep)
- If today is in Jan-Mar: previous quarter is Q4 of last year (Oct-Dec)

If the user wants to plan the upcoming quarter while still in the current one (early sprint), honor that — but tell them the look-back will use whatever data exists so far.

### Session 1 — Look back

This is the heaviest session. The skill aggregates from every pack source it has access to.

See `references/sprint-sessions.md` for the detailed flow. Short version:

1. **Greeting.** "OK, starting your [Q3 2026] quarterly sprint. Session 1: look back. About 60-75 minutes. We'll go section by section."

2. **Aggregate the data.** Read in parallel:
   - All weekly review files dated in the quarter
   - All daily plan files dated in the quarter
   - Brain dumps from the quarter
   - Meeting recaps from the quarter
   - Decisions log entries in the quarter
   - Decision journal entries dated or reviewed in the quarter
   - Reading digests from the quarter
   - Calendar audit reports from the quarter
   - Unblock log entries from the quarter
   - Note synthesis files from the quarter

3. **Surface key findings.** Walk through the user beat-by-beat:

   a. **What got done.** MIT hit rate across the quarter. Major decisions made. Big projects shipped. Surface specific items from weekly reviews and decisions log.
   
   b. **What got dropped.** MITs that never got time. Tasks that lived in next-actions for months. Goals from last quarter that didn't progress.
   
   c. **Patterns from unblock log.** Dominant procrastination diagnoses. Tasks that came up multiple times in unblock sessions.
   
   d. **Goal coverage trajectory.** Where attention actually went (combine plan data + calendar audits if available). Goals that got real time vs. neglected.
   
   e. **Relationships.** From CRM if available — who you spent time with, who became overdue, who became close.
   
   f. **Reading patterns.** From reading digests — what topics dominated. Where intake matched intent.
   
   g. **Calendar shape.** From calendar audits if any were run — meeting load trends, deep-work windows, recurring meeting changes.

4. **Capture user reactions** at each section. Verbatim. These feed Session 2.

5. **Save state.** Mark Session 1 complete in the state file. Cache the findings so Session 2 can build on them.

6. **End cleanly.** "Session 1 done. Come back when you're ready for Session 2 — reflection."

### Session 2 — Reflect

This is the deepest session. Don't rush.

1. **Pick up from state.** Read the look-back from Session 1. "Welcome back. Session 2: reflection."

2. **Walk through 5-7 reflective questions, one at a time.** See `references/reflection-craft.md` for guidance on each. Default set:

   a. **What did I accomplish this quarter that I'm proud of?** (Specific. Not "had a good quarter" — actual things.)
   
   b. **What did I plan but not do? What does that pattern teach me?** (Distinct from beating yourself up — diagnostic.)
   
   c. **What surprised me?** (The unexpected often holds the most signal.)
   
   d. **What did I learn about my work / my capabilities / my limits?** (Identity and capability shifts.)
   
   e. **What was my best decision this quarter? Worst?** (Pull from decision-journal reviews if available — was the decision good, separate from outcome.)
   
   f. **What relationships strengthened? Which drifted?** (Honest about both.)
   
   g. **What was the most wasted time?** (Not blame — pattern detection. "Recurring meetings X drained Y hours.")

3. **Capture each answer verbatim.** No paraphrasing. These go into the review file.

4. **Save state.** Mark Session 2 complete.

5. **End cleanly.** "Session 2 done. Next: themes and priorities for [next quarter]."

### Session 3 — Themes and priorities

The forward-looking heart of the sprint.

1. **Pick up from state.** "Welcome back. Session 3: themes and priorities for [next quarter]."

2. **Frame the framework.** Show the user the structure:
   - **1-3 quarterly themes** — high-level intents (verbs or short phrases like "Build distribution", "Ship v2", "Health reset")
   - **3-5 priorities per theme** — specific, achievable in 90 days
   - **Optional metrics** — how you'll know each priority succeeded
   
   See `references/theme-craft.md` for what good themes look like vs. corporate-speak.

3. **Pick themes.** Ask: "What 1-3 themes feel right for next quarter?" Push back if the user lists more than 3 — themes only work if they're few.

4. **Pick priorities per theme.** For each theme, ask: "What are 3-5 specific things you'd want done in 90 days under this theme?" Push back on vague priorities.

5. **Set optional metrics.** For each priority, ask: "How will you know if this succeeded — any specific number, milestone, or signal?" If the user says "I'll just know," accept it — not every priority needs a hard metric.

6. **Write the themes file.** Save to `{themes_file}` (typically `quarterly-themes.md`) using `assets/themes-priorities-template.md`. **Overwrite** — each quarter starts fresh.

7. **Update goals.md.** Read the current goals file. Propose updates section by section:
   - For each existing goal: mark done, mark dropped, or carry forward
   - Add new goals from the themes/priorities
   - Confirm with the user before saving each section

8. **Save state.** Mark Session 3 complete.

9. **End cleanly.** "Session 3 done. Final session: operationalize."

### Session 4 — Operationalize

The session that makes the plan real. Without it, themes and priorities decay into wishful thinking.

1. **Pick up from state.** "Welcome back. Session 4: operationalize."

2. **Standing time blocks.** For each priority, ask: "What time block does this need in your typical week?" Surface specific weekly cadence — "every Tuesday morning for theme X" — and recommend the user create recurring calendar holds for them.

3. **Cadence check.** Review the user's current pack cadences:
   - Daily plan: every morning?
   - Weekly review: which day?
   - Brain dump: ad hoc or scheduled?
   - Email triage: morning ritual scheduled?
   - Personal CRM overdue check: weekly?
   
   For any cadence that didn't happen consistently last quarter, ask whether to set up a scheduled task (using the schedule skill) for the new quarter.

4. **Decision journal forward dates.** If decision-journal is configured, scan for entries with review dates in the upcoming quarter. Surface them: "You have 4 decision journal entries due for review next quarter — here are the dates."

5. **Calendar prep.** If calendar audit revealed recurring meetings to cancel, surface them as action items: "Earlier this sprint you decided to cancel the 'Product Status' series — add to next-actions?"

6. **Write the quarterly review file.** Compile everything from Sessions 1-4 into a single review file using `assets/quarterly-review-template.md`. Save to `{reviews_folder}/{YYYY-QN}-quarterly-review.md`.

7. **Print the final summary.** Tight format:

```
Quarterly sprint complete: {quarter} review.

Saved:
- Review: {path}
- Themes/priorities: {path}
- Goals.md: updated

Themes for {next quarter}:
1. {Theme 1} — {short summary}
2. {Theme 2} — {short summary}
3. {Theme 3} — {short summary}

{N} scheduled tasks set up for the new quarter.
{N} decision journal reviews due in {next quarter}.

That's a wrap. Good quarter.
```

8. **Clear the state file.** The sprint is complete for this quarter.

## Resuming a sprint

If the user invokes the skill mid-sprint (between sessions), the skill reads the state file and:

- **State exists, current session pending:** "Welcome back. Picking up at Session [N]: [name]." Continue.
- **State exists, all sessions complete but state not cleared:** "Looks like the sprint is done — want to review your write-up or start the next one?"
- **State exists but for a previous quarter:** "I see an unfinished sprint for {quarter}. Resume it, or start a new one for {current quarter}?"

## Editing the config later

Standard pattern.

## Graceful failures

- **Pack integrations missing**: skill works with fewer sources but warns: "Look-back will be lighter without [X]." The minimum viable input is weekly reviews + daily plans.
- **No weekly reviews yet**: ask the user to point at their notes folder or describe what happened this quarter manually. The sprint can run on user memory.
- **State file corrupted or partial**: offer to start over OR salvage what's there.
- **User abandons mid-sprint and returns weeks later**: state file age check. If old (>30 days), confirm before resuming: "This sprint state is from 6 weeks ago — start fresh or pick up?"

## What this skill is NOT

- **Not annual planning.** That's an even bigger ritual — once a year. A future skill could handle it.
- **Not a corporate OKR system.** The framework is themes + priorities + optional metrics — flexible, personal, not formal.
- **Not a productivity scorecard.** No grades, no judgments. Reflection over rating.
- **Not a single sitting.** The 4-session structure is deliberate. Forcing 60-75 minutes of look-back PLUS 45-60 minutes of reflection PLUS goal-setting in one session produces shallow work.

## Reference files

- `assets/quarterly-review-template.md` — comprehensive review file structure
- `assets/themes-priorities-template.md` — next-quarter themes/priorities file
- `assets/goals-update-template.md` — how to update goals.md respectfully
- `references/sprint-sessions.md` — detailed flow for each of the 4 sessions
- `references/reflection-craft.md` — quality bar for the reflective questions (Session 2)
- `references/theme-craft.md` — what good themes look like vs. corporate-speak
- `config.example.json` — canonical config shape
