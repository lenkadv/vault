# Recommendation Craft — Specific, Actionable, Not Naggy

The audit produces 3-5 recommendations at the end. This file is the quality bar — what makes a recommendation useful vs. eye-rolling.

## The three-part structure

Every recommendation has three lines:

1. **What** — the specific change
2. **Why** — the data from the audit supporting it
3. **Impact** — what changes if the user does it

Without **What**, recommendations are vague. Without **Why**, they feel like nagging. Without **Impact**, they don't get acted on.

## Example: good vs. bad recommendation

### Bad

> "Have fewer meetings."

Vague. Naggy. The user can't act on this. No data, no specifics, no path.

### Better

> "Try canceling the Wednesday Product Status."

Specific but missing why and impact. Still feels presumptuous.

### Good

> **What:** Cancel the Wednesday "Product Status" recurring series.
> **Why:** 5 occurrences this month, zero decisions logged across all recaps. Recaps note "informational only."
> **Impact:** Frees 2.5 hours/week. Recovers the Wednesday morning deep-work window that's currently fragmented.

Specific, data-backed, with a clear gain. The user can act today.

## The five anti-patterns to avoid

### 1. Generic productivity advice

❌ "Block off time for deep work."

The user knows this. Telling them again is condescending. Instead, look at WHEN their deep work blocks could be (data from fragmentation analysis) and recommend a specific block.

✅ "Block Tuesday and Thursday mornings 09:00-11:00 — both currently meeting-free, but neither is protected so meetings drift in."

### 2. Moralizing

❌ "You're spending too much time on Slack."

Judgmental. Maybe Slack is the right tool for their role. The audit doesn't know.

✅ Just don't recommend on this. The audit's job is calendar; if Slack is consuming the user's day, that's outside scope.

### 3. Suggesting things outside the data

❌ "Spend more time on Health goals."

The audit can SHOW that Health got zero calendar time. It shouldn't tell the user what to do about it — that's a values question only they can answer.

✅ Surface in the data section: "Health goal area: 0 hours this month." Let the user decide.

### 4. Over-recommending

❌ Producing 10 recommendations. The user looks at 10 and acts on zero — too many decisions.

✅ 3-5 max. Pick the highest-leverage ones. If the data supports a 6th, save it for next audit.

### 5. Hedged recommendations

❌ "You might want to consider potentially canceling the Wednesday meeting if you think it's not adding value."

So many hedges that the recommendation evaporates.

✅ Direct: "Cancel the Wednesday meeting — zero decisions across 5 occurrences." If the user disagrees, they decline the recommendation. That's their job; the audit's job is to recommend clearly.

## Tone calibration

The audit's voice should be: **specific, data-grounded, respectful of the user's autonomy.**

- **Specific** beats general.
- **Data-grounded** beats inferential.
- **Respectful of autonomy** means: the audit recommends; the user decides. Don't push, don't moralize, don't repeat the recommendation if the user declines.

## What recommendations CAN look like

### "Cancel" recommendations (highest leverage)

> "Cancel the [series] recurring — [N] occurrences with [signal of no value]. Frees [N] hrs."

### "Batch" recommendations

> "Move all 1:1s to Mondays. Currently scattered Tue-Thu causing fragmentation; consolidating gives you 2 protected deep-work mornings."

### "Carve out" recommendations

> "Carve out [time block] as a permanent unscheduled block. Currently [pattern that suggests this need]."

### "Decline" recommendations (lower commitment than cancel)

> "Decline the standing invite for [meeting] — you spoke in 0 of last 4 recaps. They can update you async."

### "Reduce frequency" recommendations

> "Cut [recurring] from weekly to biweekly. [Data showing biweekly would still produce same value]."

### "Move" recommendations

> "Move [recurring] from Tuesday morning to Thursday afternoon. Currently lands in your peak focus window."

### "Address asymmetry" recommendations

> "Spent [N] hours with [person/account] this month. Worth checking whether that allocation matches the relationship's importance."

This one is genuinely just data + question — the user decides.

## Recommendations the audit should NEVER make

- **"Be more disciplined."** Not actionable.
- **"Prioritize differently."** Not actionable.
- **"Set better boundaries."** Moralizing.
- **"Delegate more."** Doesn't know what the user can delegate.
- **"Work less."** Out of scope.

If a recommendation feels like one of these, replace it with something specific or drop it.

## When the user accepts a recommendation

If the user says yes to a recommendation, the audit:

1. Adds it to next-actions.md as a task (e.g., "Cancel Wednesday Product Status recurring")
2. Notes it in the audit report under the "Tasks (if accepted)" section
3. Doesn't keep selling — the recommendation has been accepted, move on

If the user declines (or doesn't respond to) a recommendation:

1. Don't argue
2. Don't bring it up again in this session
3. The audit can surface it again in a future audit if the data still supports it, but should not auto-repeat

## A final test for each recommendation

Before including a recommendation in the report, ask: **"If a thoughtful peer read this, would they say it's specific and supported?"**

If yes, include it. If no — if the recommendation feels like generic advice or is unsupported by the audit's data — cut it.

3 strong recommendations beat 5 weak ones.
