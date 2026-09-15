# Calendar Audit — [Day, Month Date, Year]

> **Window:** [last 7 days | last 30 days | last 90 days] · **[start date] → [end date]** · **[N] events analyzed**

## Headline numbers

- **In meetings:** [N hours] ([%] of work hours)
- **Deep-work windows:** [N] over the window (60+ min unscheduled stretches in work hours)
- **Longest unbroken block:** [N min] on [date]
- **Red-zone days** (4+ meetings): [N]
- **Free days** (0 meetings): [N]

## Density and fragmentation

- **Heaviest day:** [date] · [N] meetings · [N] hours
- **Lightest day:** [date] · [N] meetings · [N] hours  
- **Average meetings per workday:** [N]
- **Average gap between meetings:** [N min]

[1-2 sentences interpreting fragmentation. Example: "Most days had 5+ context switches between 09:00 and 17:00. That's above the threshold where deep work becomes difficult."]

## Time by meeting type

| Type | Hours | % of meeting time |
|---|---|---|
| 1:1s | [N] | [%] |
| Status / standup | [N] | [%] |
| Sales | [N] | [%] |
| Interview | [N] | [%] |
| Decision meeting | [N] | [%] |
| Brainstorm | [N] | [%] |
| External coordination | [N] | [%] |
| Unknown | [N] | [%] |

[1-2 sentences if any type stands out. E.g., "Status meetings consumed more time than 1:1s. Worth checking whether async updates could replace some."]

## Recurring meeting utility

[Only included if meeting_recaps_folder is configured.]

### Series analyzed: [N]

| Series title | Occurrences | Hours | Decisions logged | Status |
|---|---|---|---|---|
| [Title] | [N] | [N] | [N] | Active / **Candidate for review** / **Strong candidate for cancellation** |
| [Title] | [N] | [N] | [N] | [Status] |

### Flagged for review

[Recurring meetings that occurred 4+ times with no logged decisions and no substantive action items. Cancel candidates.]

- **[Series title]** — [N] occurrences, [N] hours total, 0 decisions logged. The recap files show informational discussion but no decisions or commitments.
- **[Series title]** — [N] occurrences, [N] hours total. No recap files exist (the user didn't think these were worth recapping).

[Omit "Flagged for review" if no recurring meetings hit the threshold.]

## Goal area alignment

[Only included if goals_file_path is configured.]

| Goal area | Hours | Distinct meetings |
|---|---|---|
| [Goal area 1] | [N] | [N] |
| [Goal area 2] | [N] | [N] |
| [Goal area 3] | [N] | [N] |
| **[Untouched goal area]** | 0 | 0 |

[1-2 sentences. Example: "Work absorbed 85% of meeting time. Health and Personal goal areas had zero calendar presence. Worth checking whether that matches intent."]

## Plan vs. actual

[Only included if plans_folder is configured.]

- **Days with daily plans run:** [N] of [total workdays in window]
- **MITs that got calendar time:** [N] of [total MITs across plans]
- **MITs displaced by meetings:** [N]

### Displacement patterns

[List of patterns observed. Example:]

- **Tuesday MITs got displaced 3 of 4 weeks** — the displacing meetings were status/standup type.
- **Late-week MITs got more displacement than early-week** — afternoons especially.

[Omit if no clear patterns.]

## Top time recipients

[Top 5-10 people the user spent time with in meetings.]

| Person | Hours | CRM context |
|---|---|---|
| [Name] | [N] | [relationship, cadence — if CRM configured] |
| [Name] | [N] | [context] |

[1-2 sentences if any allocations are interesting. Example: "Marcus, a prospect from an unsigned account, got 6 hours of calendar time. Worth checking whether that ratio matches deal-stage probability."]

## Anomalies

[Only included if any anomalies were detected. Skip entirely if calendar is clean.]

- **Weekend events:** [N] · [list with dates if few]
- **After-hours events:** [N] · [list with dates if few]
- **Double-bookings:** [N] · [list with dates if few]
- **Same-day reschedules:** [N]
- **Long meetings (>90 min):** [N]

## Analysis

[2-4 paragraphs of brief interpretation. Don't be exhaustive — pick the 2-3 most interesting signals from above. See `references/recommendation-craft.md` for tone guidance. Honest, not moralizing.]

## Recommendations

[3-5 concrete, specific, actionable recommendations the user could implement today.]

### 1. [Recommendation title]

**What:** [Specific action — name the meeting, time block, or pattern]
**Why:** [Backed by data from the audit above]
**Impact:** [What changes if the user does this — time freed, attention recovered, etc.]

---

### 2. [Recommendation title]
[same structure]

---

### 3. [Recommendation title]
[same structure]

---

## Tasks (if accepted)

[If the user accepts any recommendations as tasks, they're listed here AND appended to next-actions.md.]

- [ ] [Action] — _from calendar audit, [date]_
- [ ] [Action] — _from calendar audit, [date]_

---

_Audit generated [timestamp]. Skill: productivity-calendar-audit._

---

## Template usage notes (for the skill — not part of the output)

- Replace ALL bracketed placeholders.
- **Omit sections** that don't apply (no anomalies, no displacement, no goals file configured, no CRM, etc.). Empty sections make the report feel hollow.
- The "Headline numbers" section is the most-read part. Keep it punchy — these stats should give the user the gist in 10 seconds.
- For "Time by meeting type" — only include rows where the hour count > 0. Don't pad with zeros.
- For "Recurring meeting utility" — the "Status" column is opinionated: `Active` (meeting produces decisions/actions), `Candidate for review` (some occurrences had nothing concrete), `Strong candidate for cancellation` (4+ with nothing concrete).
- For "Plan vs. actual" — the displacement patterns are gold. Spend the inference effort here.
- For "Top time recipients" — show 5-10 max. Long lists become noise.
- For "Anomalies" — entire section is conditional. If the calendar is clean, the audit can just not include this section. Don't say "no anomalies" — that's filler.
- For "Recommendations" — each one has the three-line structure (what / why / impact). Without the impact line, recommendations feel like nagging. With it, they're investment cases.
- Use 24h time everywhere.
