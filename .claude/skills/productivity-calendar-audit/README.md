# Calendar Audit

**Part of the Personal Productivity Pack — a free skill set from AI Black Magic.**

Backward-looking audit of how you actually spent your calendar time — week, month, or quarter, your pick. Surfaces stats (meeting load, density, fragmentation), spots recurring meetings that don't produce decisions (cross-referenced with meeting recaps), maps time to goal areas, compares planned MITs against actual time, and ends with 3-5 concrete recommendations you can act on today.

Different from meeting-prep and meeting-recap, which work on single meetings forward and post. This skill is the macro view across many.

## Quick start

1. **Connect Google Calendar to Claude** (required).
2. **Install the skill** — drop the `productivity-calendar-audit` folder into your Claude skills directory.
3. **Ask Claude**: *"Audit my calendar"* (or *"audit my month"*, *"audit my quarter"*).
4. **First-run onboarding** (~60 seconds).

## What you get in every audit

### Headline numbers
- Hours in meetings (% of work hours)
- Deep-work windows (60+ min unscheduled stretches)
- Red-zone days (4+ meetings)
- Free days (0 meetings)

### Density and fragmentation
- Heaviest day · lightest day · average gap between meetings

### Time by meeting type
- 1:1s · status · sales · interview · decision · brainstorm · external coord

### Recurring meeting utility (if recaps configured)
- Series-by-series breakdown
- Flagged candidates for cancellation (4+ occurrences, zero decisions logged)

### Goal area alignment (if goals file configured)
- Hours per goal area · untouched goal areas

### Plan vs. actual (if plans folder configured)
- MITs that got time vs. got displaced
- Displacement patterns (specific weekdays, specific meeting types)

### Top time recipients (with CRM context if configured)
- Who ate your calendar this window

### Anomalies (if any)
- Weekend events · after-hours · double-bookings · long meetings

### Recommendations
- 3-5 concrete actions: cancel X, batch Y, carve out Z

## The recurring meeting analysis — the highest-leverage part

Recurring meetings are usually the biggest fixable problem. They got onto the calendar months or years ago and run on inertia. A weekly 1-hour meeting is 50+ hours/year.

If you use the Meeting Recap skill, the audit cross-references each recurring series against its recaps:

- **Active** — produces decisions consistently → keep
- **Candidate for review** — value has decayed → reduce or restructure
- **Strong candidate for cancellation** — 4+ occurrences with zero decisions logged → cancel

The audit doesn't auto-cancel — it surfaces and recommends. You decide.

## Configurable per session

Run it however you want:

| Phrase | Window |
|---|---|
| *"Audit my calendar"* | Default (week unless changed in config) |
| *"Audit my week"* | Last 7 days |
| *"Audit my month"* | Last 30 days |
| *"Audit my quarter"* | Last 90 days |
| *"Audit the last 14 days"* | Custom |

## Pack integration

| Connects to | What happens |
|---|---|
| **Meeting Recaps** | Cross-referenced for recurring-meeting utility analysis |
| **Decisions log** | Decision density per meeting |
| **Goals file** | Maps calendar time to goal areas; flags neglect |
| **Plans folder** | Compares planned MITs against actual time; surfaces displacement patterns |
| **Personal CRM** | Top time recipients show relationship type and cadence — context for "is this allocation right?" |
| **next-actions.md** | Accepted recommendations flow into your shared task queue |

The more of the pack you use, the richer the audit.

## Honest tone

The audit's voice is **specific, data-grounded, respectful of your autonomy.** It surfaces patterns; it doesn't moralize. *"Health goal area: 0 hours this month"* is honest data; *"you should prioritize your health"* is moralizing. The audit does the first, not the second.

Recommendations are specific (name the meeting, the time block, the pattern), data-backed (cited from the audit above), and actionable (you could do this today). The recommendation-craft reference (`references/recommendation-craft.md`) is the quality bar.

## What this skill is NOT

- **Not a calendar manager.** It analyzes; it doesn't move, reschedule, or cancel events. You take action (or accepted recommendations go to next-actions.md for you to do).
- **Not a productivity coach.** Surfaces data; doesn't lecture.
- **Not a single-meeting analyzer.** Use meeting-prep / meeting-recap for that.
- **Not forward-looking.** Backward audit only. Weekly Review handles forward calendar preview.

## Updating your settings

Tell Claude *"update my calendar audit settings"* — or edit `config.json` directly.

## Files in this skill

- `SKILL.md` — the skill itself (Claude reads this)
- `config.example.json` — canonical config shape
- `assets/audit-report-template.md` — full audit report structure
- `references/audit-metrics.md` — what stats to calculate and how
- `references/recurring-meeting-analysis.md` — how to evaluate recurring meeting utility
- `references/recommendation-craft.md` — quality bar for recommendations

---

_Free for AI Black Magic email subscribers. Share, don't sell._
