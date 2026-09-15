# Recurring Meeting Analysis

Recurring meetings are the highest-leverage thing to fix in most calendars. They're invisible — they got onto the calendar months or years ago and have been running on inertia ever since. A single recurring meeting at 1 hour per week is 50+ hours per year.

This file explains how the audit identifies and evaluates them.

## Identifying recurring series

In the calendar events for the window, group events by:
- Same title (exact or near-match — minor variations like "Weekly status" vs "Weekly Status Mtg" should cluster)
- Same primary attendees (the user + same handful of others)
- Regular cadence (weekly / biweekly / monthly)

A series qualifies for analysis when:
- 3+ occurrences in the window (for a week-long audit: must be very frequent; for a 90-day audit: weekly meetings have 12 occurrences)
- Same attendee set (within reasonable variation — people occasionally miss)

Discard:
- One-off events that share a title with a series but were rescheduled separately
- Events that the user declined more often than attended (those aren't really part of their schedule)

## Per-series metrics

For each qualifying series:

1. **Occurrences** — how many times it happened in the window
2. **Total hours** — sum of duration across occurrences
3. **Average duration** — mean event duration
4. **Decline rate** — % of occurrences the user declined (high decline rate is a signal in itself)

## Cross-reference with recaps (if recaps folder is configured)

For each series, search the meeting recaps folder for files matching the series title (filename slug match, with some fuzziness).

For each matching recap file:
- Check whether the recap has a "Decisions made" section AND that section has content
- Check whether the recap has user-owned action items (the kind that go to next-actions.md)
- Check whether the recap was extracted from filled-in notes vs. interactive Q&A (substantive vs. reconstructed)

Aggregate across the series:
- **Decisions logged across all occurrences:** count of distinct decisions captured in recap files (or in the decisions log file matching the series)
- **Action items generated:** count of action items extracted
- **Recap coverage:** % of occurrences that have a corresponding recap file

## Status classification

Based on metrics and recap signals:

### Active

The series produces decisions OR action items consistently. Worth keeping.

Signals:
- 1+ decisions logged per occurrence on average
- OR significant action items extracted regularly
- OR explicit value mentioned in recaps ("this conversation moved X forward")

### Candidate for review

The series might be valuable but is showing signs of decay. Worth re-evaluating purpose.

Signals:
- Decisions logged in some occurrences but not most
- Recap coverage is patchy (some occurrences worth recapping, others not)
- High decline rate (the user keeps missing it deliberately)
- Heavy fragmentation effect (it lands at a time that consistently breaks deep work)

### Strong candidate for cancellation

The series isn't producing value. Should be canceled or restructured.

Signals:
- 4+ occurrences in the window with ZERO decisions logged
- OR no recap files exist at all for any occurrence (the user didn't think any of them were worth recapping)
- OR recap files explicitly note "no actionable outcomes"
- OR user declined 30%+ of occurrences

## What to do with the analysis

The audit's job is to surface; the user's job is to act.

For "Strong candidate for cancellation" series, the audit recommends:
> "Cancel the [series title] series — [N] occurrences this [window], zero decisions logged. Time freed: [N] hrs/[week/month]."

For "Candidate for review":
> "Review the [series title] series — [N] occurrences, [N] decisions but inconsistent value. Worth either reducing to [lower frequency] or restructuring."

For "Active":
> No action — these meetings earn their place.

## Common patterns in dead-weight recurring meetings

The audit should be able to recognize these patterns specifically:

### "Status update" series that's really just status reporting

Status of work that could be communicated async. Recurring weekly, multiple attendees, mostly the user listening, occasional update from them. Recaps (if any) are filled with information transfer but no decisions.

**Recommendation pattern:** "Move to async — Slack channel update or a doc the team appends to."

### "Sync" series with no agenda

Recurring 30-60 min meeting with vague title ("Team sync", "Quick sync") that's been on the calendar for months. Recaps either don't exist or are scattered. Often used as social maintenance rather than work.

**Recommendation pattern:** "Cut to monthly or kill. Either it's a social commitment (then own that and move it out of work hours) or it's not producing — either way, current frequency doesn't fit."

### Standing 1:1s that have outlived their utility

The 1:1 was set up for a specific reason that's no longer relevant. Both parties keep showing up out of habit. Recaps thin or absent.

**Recommendation pattern:** "Talk to [person] about whether this still serves both of you. Maybe cut to biweekly or kill with a 'we can grab time when needed' agreement."

### "All-hands" or org-wide that the user attends out of obligation

Big meeting, user is a passenger, no individual contribution expected. High time cost, low individual value.

**Recommendation pattern:** "Decline the standing invite. Ask whoever runs it for the recap. You attend in-person only when there's a specific reason."

## What the audit should NOT do

- **Don't recommend canceling meetings the user organized for their direct reports.** Those have value the audit can't see (career development, retention, signal-sending). Flag them as worth-the-user-reviewing rather than as cancellation candidates.
- **Don't recommend canceling meetings with external parties without flagging it carefully.** "Cancel your standing call with the vendor" might break a relationship.
- **Don't double-flag a meeting that another section of the audit already covered.** If a recurring meeting is the displacing factor for MITs, mention it once with both implications, not twice.

## When recaps aren't available

If the meeting recaps folder isn't configured, the skill can still do useful analysis based on:
- Occurrence count + total hours (surface the biggest time sinks regardless of utility)
- Decline rate (high-decline meetings are at least suspect)
- Decisions log search (search for the series title in decisions.md to find any logged decisions)

Without recaps, the skill can't say "this meeting didn't produce value" — but it can say "this meeting consumes [N] hours. Worth checking whether it's worth that." That's still useful.
