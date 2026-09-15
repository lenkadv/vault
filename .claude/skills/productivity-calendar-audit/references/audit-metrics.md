# Audit Metrics — What to Calculate

This file specifies every metric the audit produces. The point of having a reference is consistency — the same calendar over the same window should produce the same numbers every run.

## 1. Total time in meetings

**Calculation:** Sum the duration of all attended events in the window. Skip declined events. Skip tentative events unless the user opts to count them.

**Outputs:**
- Total hours
- Percentage of working hours (work_hours_start to work_hours_end across workdays in window — exclude weekends from denominator unless the user works weekends)
- Comparison to a healthy reference range (35-50% is typical for managerial roles; 15-30% for IC roles — but don't be prescriptive about which "should" apply)

## 2. Meeting density

**Calculation per workday:**
- Count meetings starting that day (attended only)
- Sum hours that day
- Mark days with 4+ meetings as "red zone"
- Mark days with 0 meetings as "free days"

**Outputs:**
- Heaviest day (highest meeting hours)
- Lightest day (lowest meeting hours)
- Average meetings per workday
- Number of red-zone days
- Number of free days

## 3. Fragmentation

**Calculation:**
- Within work hours, identify all unscheduled stretches between meetings
- A "deep work window" is an unscheduled stretch of 60+ minutes during work hours
- Track the longest single stretch in the window
- Compute average gap between consecutive meetings

**Outputs:**
- Number of deep-work windows in the window
- Longest unbroken block (in minutes)
- Average gap between meetings (in minutes)

**Why this matters:** sustained focus needs unbroken time. A day with 7 meetings and 6 hours of total meeting time fragments those hours across ~9 hours, leaving short gaps unsuitable for deep work. Two days with 3 meetings each but a clear 3-hour block both days produces more useful time.

## 4. Time by meeting type

**Calculation:** Categorize each event using the same taxonomy as the meeting-prep skill:

- **1:1** — recurring + 2 attendees + title contains 1:1 / sync / / / check-in
- **Status / standup** — recurring + multiple attendees + short duration + title contains standup / status / weekly / sync / update
- **Sales call** — external attendees + sales keywords (demo, discovery, intro, pricing)
- **Interview** — title contains interview / candidate
- **Decision meeting** — title contains decide / decision / approval / go-no-go
- **Brainstorm** — title contains brainstorm / workshop / ideation
- **External coordination** — external attendees but no clear sales angle
- **Unknown** — doesn't match any of the above

For each category, sum hours.

**Outputs:** table of category → hours → percentage of total meeting time.

## 5. Anomalies

**Calculation:**

- **Weekend events:** events on Saturday or Sunday
- **After-hours events:** events that start before `work_hours_start` OR end after `work_hours_end`
- **Double-bookings:** events where two accepted events overlap by 5+ minutes
- **Same-day reschedules:** detected if an event was moved within 24 hours of its original time (uses calendar API metadata if available; fallback: skip if not detectable)
- **Long meetings:** events with duration > 90 minutes

**Outputs:** count + small sample of specific instances for context. Omit entire anomaly section if all counts are 0.

## 6. Recurring meeting utility (cross-referenced with recaps)

See `recurring-meeting-analysis.md` for the detailed algorithm.

**Outputs:**
- Table of recurring series in the window: title, occurrences, total hours, decisions logged, status
- Flagged list: series that are candidates for cancellation or review

## 7. Goal area alignment (with goals file)

**Calculation:**
- Read goals file, extract goal area names
- For each meeting, map to a goal area using:
  - Direct keyword match in title
  - Attendee patterns (if attendee has appeared in meetings tagged with this goal area before — uses recaps if available)
  - Recap file goal area tags (if recap exists)
- Aggregate hours per goal area

**Outputs:** hours per goal area, untouched goal areas, allocation summary.

## 8. Plan vs. actual (with plans folder)

**Calculation:**
- For each daily plan file in the window, read the MITs
- For each MIT, check whether time was allocated in the calendar during work hours that day
- An MIT "got time" if there's a 60+ minute unscheduled block that day during work hours
- An MIT "got displaced" if the user's typical peak focus window contained meetings that day

**Outputs:**
- Days with daily plans run
- MITs that got calendar time vs. didn't
- Displacement patterns (specific weekdays, specific meeting types that consistently displace)

## 9. Top time recipients

**Calculation:**
- For each event, identify attendees other than the user
- Tally meeting hours per attendee across all events in window
- Sort descending

**Outputs:** top 5-10 attendees with their hours. If CRM is configured, add relationship type and cadence per person.

**Why this matters:** sometimes the surprise is who's eating your calendar. A 10-hour-per-month allocation to a prospect that hasn't moved in deal stage looks different from 10 hours with your top direct report.

## Edge cases

- **Recurring meeting with one attendee declining one week:** count only the occurrences the user attended.
- **Events without a defined duration** (rare but happens): assume 30 min default.
- **All-day events:** typically not counted as "meeting time" — they're usually OOO or focus days. But surface in a separate "all-day events" count for visibility.
- **Holds and blocks the user put on their own calendar:** count as scheduled time (it blocks focus opportunities for others) but exclude from "meeting" hours since the user isn't actually in a meeting. Note separately.
- **Events the user organized vs. accepted:** track separately. If 80% of meetings are user-organized, that's a different problem than if 80% are externally imposed.

## Comparison to reference ranges

The audit can include reference ranges where they're well-established, but the skill should NOT prescribe. Frame as: "Most knowledge workers do best at [range]. You're at [user's value]. Whether that's right depends on your role."

Reference ranges (loose guides):
- **Meeting load:** 15-30% for IC roles, 35-50% for managers, 50-65% for executives
- **Deep-work windows per week:** 3-5 for sustained creative/analytical work
- **Red-zone days per week:** under 2 is healthy; 3+ correlates with burnout signals in survey data

Don't moralize about these. The user knows their context.
