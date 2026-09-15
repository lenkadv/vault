---
name: productivity-calendar-audit
description: Backward-looking audit of how the user actually spent their calendar time — over a configurable window (week / month / quarter, user picks per session). Surfaces: meeting density and fragmentation patterns, time by meeting type, goal area alignment vs. neglect, top time recipients, anomalies (weekend work, after-hours, double-bookings), plan vs. actual (MITs that got displaced), and — most usefully — recurring meetings that don't produce decisions or outcomes (cross-referenced with meeting recaps to identify dead-weight calendar inheritance). Produces a balanced report with stats + brief analysis + 3-5 concrete recommendations the user can act on (cancel X recurring, batch Y type, carve out Z deep-work window). Different from the meeting-prep / meeting-recap skills, which work on single meetings forward and post; this skill is the macro view across many. Use this skill whenever the user says "audit my calendar", "where did my time go", "analyze my time", "how am I spending my time", "calendar audit", "review my schedule", "audit my week" / "audit my month" / "audit my quarter", "what meetings should I cut", "calendar review", "is my calendar healthy", or any phrase about retrospective analysis of time spent. Requires Google Calendar to be connected.
---

# productivity-calendar-audit

This skill exists because what you think your calendar looks like and what it actually looks like are usually different. People believe they spend 30% of their week in meetings; data often shows 60%. People believe their recurring 1:1s are valuable; data often shows half haven't produced a decision in months. The audit replaces feel with data, then turns the data into specific changes the user can make.

The skill produces:
- **Stats** — meeting load, density, fragmentation, time by category
- **Analysis** — what the data says, briefly
- **Recommendations** — 3-5 concrete changes the user could make

Target time: 2-3 minutes to run, 5 minutes to read.

## First-run check

Before doing anything else, look for `config.json` in this skill's directory.

- **If `config.json` does not exist, OR is missing required fields** (`output.audit_reports_folder`): run the **First-run onboarding**.
- **If `config.json` exists and is complete**: skip onboarding and go to **The audit flow**.

## First-run onboarding

Welcome:

> "Welcome to Calendar Audit. Quick one-time setup. (Part of the Personal Productivity Pack from AI Black Magic.) First: is Google Calendar connected to Claude?"

If calendar isn't connected, halt and direct the user to connect it. Calendar is required.

Then:

1. **Audit reports folder.** "Where should audit reports be saved? Default: `Calendar Audits/` in your productivity workspace."

2. **Pack integration paths (recommended).** Ask for each; user can skip individually.
   - **Meeting recaps folder** — for recurring meeting utility analysis
   - **Decisions log file** — for decision density per meeting
   - **Goals file** — for goal area alignment
   - **Plans folder** — for MIT vs. actual time comparison
   - **Personal CRM contacts index** — for top time recipients with relationship context
   - **Next-actions file** — for "cancel X recurring" tasks flowing to the daily planner

3. **Default window preference.** "Default audit window when you don't specify? Options: week (last 7 days), month (last 30), quarter (90). Default: week."

4. **Working hours.** "What are your typical working hours? Default: 09:00–17:00. The audit uses this to compute meeting density during work time vs. after-hours."

Save to `config.json`:

```json
{
  "version": 1,
  "onboarded_at": "YYYY-MM-DD",
  "output": {
    "audit_reports_folder": "<absolute path>"
  },
  "pack_integration": {
    "meeting_recaps_folder": null,
    "decisions_log_file": null,
    "goals_file_path": null,
    "plans_folder": null,
    "contacts_index_file": null,
    "next_actions_file": null
  },
  "preferences": {
    "default_window": "week",
    "work_hours_start": "09:00",
    "work_hours_end": "17:00"
  }
}
```

Confirm: "Setup saved. Want to run your first audit?"

## The audit flow

### Step 1 — Determine window

If user specified in their message (e.g., "audit last month", "audit my quarter"), use that.

Otherwise use `preferences.default_window` (default: week).

Compute the date range:
- **week** → last 7 days from today
- **month** → last 30 days from today
- **quarter** → last 90 days from today
- **custom** → user-specified range

### Step 2 — Fetch calendar events

Use Google Calendar connector to fetch all events in the window. Include:
- Title, attendees, time, duration, location
- Recurring metadata (if part of a series)
- Status (accepted vs. declined)

Skip events the user **declined** — those weren't actually attended.

Tell the user the count: "Fetched 47 calendar events from the last 30 days. Running the audit — takes a minute."

### Step 3 — Calculate core metrics

See `references/audit-metrics.md` for the full list. The skill produces:

**a. Total time in meetings**
- Hours in meetings
- % of working hours (based on `work_hours_start`/`end`)
- Compare to total possible work hours in window

**b. Density patterns**
- Heaviest day (most meeting hours)
- Days with 4+ meetings (red-zone days)
- Days with 0 meetings (full deep-work days)
- Average meetings per workday

**c. Fragmentation**
- Number of deep-work windows (60+ min unscheduled stretches during work hours)
- Longest single unbroken block
- Average gap between meetings

**d. Time by meeting type**
- Use the meeting-type taxonomy: 1:1, sales call, interview, status, decision meeting, brainstorm, external coordination, unknown
- Hours per category

**e. Anomalies**
- Weekend events
- Events after `work_hours_end` or before `work_hours_start`
- Double-bookings (overlapping accepted events)
- Same-day reschedules (events moved within the day they happened)
- Long meetings (>90 min)

### Step 4 — Recurring meeting utility analysis

If `meeting_recaps_folder` is configured, run the recurring-meeting analysis. See `references/recurring-meeting-analysis.md` for the detailed strategy.

Short version:

1. Identify recurring meeting series in the window (events with the same title that occurred 3+ times).
2. For each series, check if matching recap files exist in the recaps folder.
3. Cross-reference: did this series produce any decisions logged in the decisions log? Any substantive action items?
4. Flag series that occurred 4+ times with:
   - No recap files (the user didn't think it was worth recapping)
   - Or recaps that captured no decisions
   - Or recaps marked "no action items"

These are candidates for cancellation or reduced frequency.

If no recaps folder is configured, skip the utility check and just rank recurring series by total hours (so the user can review the biggest time sinks themselves).

### Step 5 — Goal area alignment

If `goals_file_path` is configured, map calendar time to goal areas.

Mapping signals:
- Meeting title keywords
- Attendee patterns (people associated with specific goal areas if visible from CRM or notes)
- Meeting recaps (if available) — pull goal area tags

Output:
- Hours per goal area
- Untouched goal areas (no calendar time during window)
- Disproportionate allocation (e.g., "Work: 35 hours, Health: 1 hour" — surface honestly without moralizing)

### Step 6 — Plan vs. actual

If `plans_folder` is configured, read daily plan files for the window. For each day:
- Did the day's MITs get calendar time?
- Were any MITs displaced by meetings that landed in their planned focus window?

Output:
- Days where MITs got displaced (count)
- Patterns ("3 of 5 weeks had Tuesday MITs eaten by meetings")

This is one of the highest-leverage parts of the audit — it surfaces when the calendar is hijacking the user's intent.

### Step 7 — Top time recipients

Tally meeting hours by attendee (excluding the user themselves).

If `contacts_index_file` is configured, look up each top recipient in the CRM. Surface their relationship type and cadence — useful context for "is this allocation right?"

Output the top 5-10 people the user spent time with. NOT a judgment — just data. "You spent 8 hours with Sarah this month (CRM cadence: weekly 1:1)" reads differently from "8 hours with Marcus, a stranger from a prospect company."

### Step 8 — Synthesize analysis (brief)

Write 2-4 short paragraphs that interpret the data. Don't be exhaustive — pick the 2-3 most interesting signals.

See `references/recommendation-craft.md` for guidance on tone. Brief, factual, no moralizing.

Examples of useful interpretation:
- "Meeting load is 62% of working hours — high end of healthy. Most concentration is Tuesday-Thursday."
- "Deep-work windows: 4 over the past month, averaging 75 minutes. Below the threshold most knowledge workers need for sustained focus on hard problems."
- "Your Tuesday MIT block got displaced 3 of 4 weeks. The displacing meetings were all status/standup."

### Step 9 — Generate 3-5 recommendations

The recommendations are the action layer. Each one should be:
- Specific (name the meeting or pattern)
- Actionable (the user could do this today)
- Backed by data from earlier in the report

See `references/recommendation-craft.md` for the quality bar.

Examples:
- "Cancel the Wednesday 'Product Status' series — 5 occurrences this month, zero decisions logged. Time freed: 2.5 hrs/week."
- "Batch 1:1s on Mondays — currently scattered Tue-Thu, fragmenting deep work. Saves ~3 fragmentation events/week."
- "Decline the 'Cross-Team Sync' standing invite — you spoke in 0 of 4 past recaps. They can update you async."
- "Carve out Tuesday mornings 09:00-11:00 as a permanent block — your Tuesday MITs got displaced 3 of 4 weeks."

Each recommendation can optionally extract an action item to `next_actions_file`:

```markdown
- [ ] Cancel "Product Status" recurring meeting   <!-- calendar audit: 2026-05-19, captured: 2026-05-19 14:30 -->
```

Only extract action items the user explicitly accepts. Don't auto-append. The audit suggests; the user decides.

### Step 10 — Save the report and answer in chat

Save the full report to `{audit_reports_folder}/{YYYY-MM-DD}-{window}-audit.md` using `assets/audit-report-template.md`.

Print a tight chat summary:

```
Calendar audit complete (last {window}) → {path}

Headline numbers:
- {hours} in meetings ({%} of work hours)
- {N} deep-work windows (avg {X} min)
- {N} red-zone days (4+ meetings)

Top recommendations:
1. {recommendation 1}
2. {recommendation 2}
3. {recommendation 3}

Want me to add any of these as tasks?
```

If user accepts a recommendation as a task, append to next-actions.md.

## Editing the config later

Standard pattern.

## Graceful failures

- **Calendar not connected**: halt with instructions to connect.
- **Window has very few events**: tell the user honestly. "Only 5 events in the last week — not enough for meaningful patterns. Try a longer window."
- **No meeting recaps**: skip recurring meeting utility check; rank recurring series by hours only.
- **No goals file**: skip goal area alignment section.
- **No plans folder**: skip plan vs. actual section.
- **No CRM**: top time recipients still shown, just without relationship context.
- **Lots of declined events**: the audit ignores them. Worth a brief note if many declines ("You declined 14 events in this window — calendar hygiene looks good there").

## What this skill is NOT

- **Not a calendar manager.** It analyzes; it doesn't move, reschedule, or cancel events. The user takes action separately (or the audit's action items go to next-actions for them to do).
- **Not a productivity coach.** It surfaces data; it doesn't lecture. Recommendations are specific, not moralizing.
- **Not a single-meeting analyzer.** Use meeting-prep / meeting-recap for single meetings. This skill is the aggregate view.
- **Not predictive.** Backward-looking only. The Weekly Review skill handles forward calendar preview.

## Reference files

- `assets/audit-report-template.md` — full audit report structure
- `references/audit-metrics.md` — what stats to calculate and how
- `references/recurring-meeting-analysis.md` — how to cross-reference recaps for utility
- `references/recommendation-craft.md` — quality bar for recommendations (specific, actionable, non-naggy)
- `config.example.json` — canonical config shape
