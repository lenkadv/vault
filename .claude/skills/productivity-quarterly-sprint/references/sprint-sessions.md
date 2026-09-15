# Sprint Sessions — Detailed Flow

The quarterly sprint is 4 sessions across a week. This file is the deeper how-to for each one.

## Why 4 sessions, not 1

Quarterly reflection done in a single 3-hour sitting produces shallow work for predictable reasons:
- Attention fatigue around hour 2 — the deeper reflective questions get rushed
- "Done with it" pressure — once the user is 2 hours in, they want to wrap up rather than think
- No time to sit with hard answers — some questions need overnight thinking
- All-or-nothing risk — if the user blocks 3 hours and one thing comes up, the whole sprint gets postponed indefinitely

Spreading across 4 sessions of 45-75 minutes each:
- Each session has a clear focus, less cognitive load
- Insights from one session can simmer before the next
- Easier to schedule (one block at a time)
- The user can pause and resume

## Session 1: Look back (60-75 min)

**Goal:** aggregate everything the pack captured this quarter into a coherent view.

This is the heaviest session — lots of data to pull. The user mostly receives and reacts; the skill does the aggregating.

### Pre-flight check

Verify all configured pack sources have data in the quarter window:
- Weekly reviews folder: how many files in the quarter?
- Daily plans folder: how many?
- Brain dumps folder: how many?
- Meeting recaps folder: how many?
- Etc.

If most sources are empty, tell the user honestly: "Most pack data is empty for this quarter. The look-back will be light. Want to proceed anyway, or supplement from memory?"

### The 7 beats

Walk the user through 7 data beats. Pause after each for their reaction (capture verbatim).

**Beat 1: What got done.**

Aggregate from:
- Weekly reviews (the "what worked this week" answers across 12 weeks)
- Decisions log (every logged decision in the quarter)
- Decision journal (entries created or reviewed)
- Meeting recaps (substantive outcomes)

Present a concrete list of accomplishments. Examples:
- "Shipped pricing page (decisions log 2026-03-04, meeting recap 2026-03-15)"
- "Hired 2 new engineers"
- "Newsletter reached 7,500 subscribers"
- "8 of 12 weeks ran daily plans consistently"

Ask: "Anything missing from this list that I should add?"

**Beat 2: What got dropped.**

Aggregate:
- MITs from daily plans that appeared 3+ times without getting done
- Goals from the previous quarter that didn't progress
- next-actions items older than 60 days still unchecked
- Brain dump Ideas that never resurfaced

Present honestly. Don't moralize.

Ask: "Any of these you want to formally drop, or are some still alive?"

**Beat 3: Patterns from the unblock log.**

If unblock log is configured:
- Total sessions count
- Dominant diagnoses (e.g., "60% perfectionism")
- Specific tasks that came up 3+ times

Present the patterns. Ask: "What do these patterns tell you?"

**Beat 4: Goal coverage trajectory.**

Combine plan data + calendar audits (if any) + reading digests (if any) to map time across goal areas.

Present:
- Hours per goal area
- Neglect: areas with little/no calendar time AND no MIT presence
- Surprises: where attention went vs. where it was supposed to

Ask: "How does this map to what you wanted the quarter to be?"

**Beat 5: Relationships.**

If CRM is configured:
- Contacts who became closer (more frequent touchpoints)
- Contacts who drifted (became overdue or are now lost-touch)
- New contacts added
- Time allocation top 5

Present. Ask: "Anyone here you want to be intentional about next quarter?"

**Beat 6: Reading and intake.**

If reading digests are configured:
- Digests run this quarter
- Articles processed
- Dominant topics
- Reading coverage vs. work coverage (did intake match output direction?)

Ask: "Did reading match what you needed?"

**Beat 7: Calendar shape.**

If calendar audits were run this quarter, summarize key findings.

If no audits were run but the calendar is connected: do a lightweight audit just for this sprint — meeting load %, deep work windows, top recipients.

Ask: "Calendar pattern this quarter — anything you want to change structurally?"

### Wrap Session 1

> "OK, that's the look-back. Captured all your reactions. Session 2 is reflection — deeper. When you're ready, come back."

Save state file:
```json
{
  "quarter": "2026-Q2",
  "current_session": "2_reflect",
  "session_1_completed": "2026-06-28",
  "look_back_summary": "[serialized findings]",
  "user_reactions": "[verbatim notes from beats]"
}
```

## Session 2: Reflect (45-60 min)

**Goal:** turn the data into insight. What did the quarter teach the user about themselves and their work?

This is the most introspective session. Pace it. Don't rush.

### The 7 questions

Ask one at a time. Wait. Don't supply answers. Let silence happen.

See `reflection-craft.md` for the quality bar on each.

1. **What did I accomplish this quarter that I'm proud of?**
2. **What did I plan but not do? What does that pattern teach me?**
3. **What surprised me — about the work, the people, myself?**
4. **What did I learn about my capabilities or limits?**
5. **What was my best decision this quarter? My worst?**
6. **Which relationships strengthened? Which drifted? Honestly?**
7. **What was the most wasted time this quarter?**

Capture each answer verbatim. The reflection IS the answer in the user's own words.

### Wrap Session 2

Save state. End with: "Session 2 done. Sit with these. Session 3 is themes and priorities for next quarter."

## Session 3: Themes and priorities (45-60 min)

**Goal:** decide what next quarter is about. NOT a wishlist — 1-3 themes with 3-5 priorities each.

### The framework

Show the user:

```
1-3 quarterly themes (high-level intents)
↓
3-5 priorities per theme (specific, 90-day-achievable)
↓
Optional metrics per priority
```

See `theme-craft.md` for what makes a good theme.

### The flow

1. **Pick themes.** Ask: "What 1-3 themes feel right for next quarter?" Push back at 4+. "What's the 3 if you had to pick?"

2. **Per theme, pick priorities.** "For [Theme 1], what are 3-5 specific things you'd want done in 90 days?" Push back on vagueness.

3. **Per priority, optional metric.** "How will you know if [priority] succeeded? Any specific number, milestone, or signal?" Accept "I'll just know" — not every priority needs a hard metric.

4. **Write the themes file.** Save to `{themes_file}`. Overwrite any existing version. The Weekly Review and Daily Plan skills read this file as context.

5. **Update goals.md.** Walk through existing goals (done/drop/carry-forward) and add new ones from themes/priorities. See `assets/goals-update-template.md` for the respectful-edit pattern.

### Wrap Session 3

Save state. End with: "Themes set. goals.md updated. Last session: operationalize."

## Session 4: Operationalize (30-45 min)

**Goal:** turn intent into calendar reality. Without this, themes evaporate by week 3.

### The flow

1. **Standing time blocks per theme.** "For [Theme 1], when does it need time each week?" Specific weekday + specific time block. Recommend adding to calendar as recurring holds.

2. **Pack cadences.** Review last quarter's cadences:
   - Did daily plan run consistently?
   - Did weekly review happen?
   - Was email triage running?
   - Etc.
   
   For any that didn't, ask whether to set up a scheduled task for the new quarter.

3. **Decision journal forward dates.** Surface entries with review dates falling in the upcoming quarter. The user knows in advance what reviews are coming.

4. **Calendar prep.** If the sprint's earlier sessions surfaced calendar changes (cancel X recurring, batch Y, carve out Z), confirm them as action items.

5. **Compile the quarterly review file.** Pull everything from Sessions 1-4 into the comprehensive review file. Save.

6. **Set up scheduled reminders (optional).** If user wants, suggest using the schedule skill to remind them of: weekly review day/time, end-of-quarter sprint reminder, decision journal review dates.

7. **Final summary in chat.** Tight, three-paragraph format. Then end the sprint cleanly. Clear the state file.

## What can go wrong

- **User starts Session 1 but never returns.** State file ages. On next invocation, ask: "Sprint from [date] is still open. Resume or abandon?" If abandoned, save what was captured as a partial review.
- **User has light pack usage.** Aggregation produces thin material. Honest framing: "Look-back is lighter without [X]. Want to supplement from memory?"
- **User tries to skip Session 2.** Reflection IS the value. Push back gently: "We can skip — but the reflection is what usually makes the planning land. Skip anyway?"
- **User wants to do all 4 sessions in one sitting.** Allow it but flag: "Doing all 4 in one go tends to produce shallow work. If you have 3 hours, that's fine — just pace yourself and take breaks."
