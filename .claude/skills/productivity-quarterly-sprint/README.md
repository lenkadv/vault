# Quarterly Planning Sprint

**Part of the Personal Productivity Pack — a free skill set from AI Black Magic.**

The highest-level temporal skill in the pack. A structured 4-session sprint spread across a week, run at the end of each calendar quarter. Aggregates from every other pack skill's outputs — 12 weeks of daily plans, weekly reviews, brain dumps, meeting recaps, decisions log, decision journals, reading digests, calendar audits, unblock log, CRM, note synthesis — and uses that material to produce three artifacts: a quarterly review file, an updated `goals.md`, and a next-quarter themes/priorities file.

Done well, the quarterly sprint is what makes the year compound. Without it, 90 days pass and the user has no sense of where they actually went.

## Quick start

1. **Install the skill** — drop the `productivity-quarterly-sprint` folder into your Claude skills directory.
2. **Ask Claude**: *"Start my quarterly sprint"* (typically end of March / June / September / December).
3. **First-run onboarding** (~90 seconds — longest in the pack because it asks for every pack source path).
4. **Run the 4 sessions over a week.** State is saved between sessions; you can pause and resume.

## The 4 sessions

| Session | Time | Purpose |
|---|---|---|
| **1. Look back** | 60-75 min | Aggregate the quarter's data; surface what happened |
| **2. Reflect** | 45-60 min | Deeper interpretation — what was learned, what shifted |
| **3. Themes + priorities** | 45-60 min | Set 1-3 themes with 3-5 priorities each for next quarter |
| **4. Operationalize** | 30-45 min | Cadences, time blocks, scheduled tasks, decision-journal review dates |

The 4-session structure is deliberate. Quarterly reflection done in one 3-hour sitting produces shallow work — attention fatigue around hour 2, "done with it" pressure, no time to sit with hard answers. Spreading across a week lets insights from one session simmer before the next.

State is saved between sessions. Invoke the skill mid-sprint and it picks up where you left off.

## What you get every quarter

### Quarterly review file
A comprehensive markdown file with:
- Look-back: what got done, what got dropped, patterns, goal coverage, relationships, reading, calendar shape
- Reflection: 7 deep questions answered verbatim
- Themes + priorities: structured forward intent
- Operationalization: time blocks, cadences, scheduled tasks

### Updated goals.md
The same goals file the rest of the pack reads. Existing goals get marked done/dropped/carry-forward. New goals from the themes/priorities get added. The skill walks through it with you respectfully — no automated overwrites.

### Quarterly themes file
1-3 themes + 3-5 priorities each, written to a single file the Weekly Review and Daily Plan skills consult all quarter. This is what makes quarterly intent show up in daily work.

## The framework

Themes + 3-5 priorities + optional metrics:

```
Theme 1: "Build distribution"
  ├─ Newsletter to 10,000 subscribers (metric: subscriber count)
  ├─ Launch podcast — 5 episodes by end of Q3 (metric: episode count)
  └─ Establish 2 partner relationships (metric: signed partnerships)

Theme 2: "Health reset"
  ├─ Train for half marathon — race Aug 15 (metric: race completed)
  └─ Sleep 8 hours weekday baseline (metric: average sleep)

Theme 3: "Ship product v2"
  ├─ Beta launch July 15
  ├─ 50 paying customers by end of quarter (metric: customer count)
  └─ Build core team to 4 people (metric: hires)
```

The `references/theme-craft.md` file is the quality bar — what makes a theme actually work vs. corporate-speak.

## Pack integration — the apex of the pack

The quarterly sprint is the most pack-integrated skill. It reads from EVERY other skill's output:

| Source | What it contributes |
|---|---|
| Weekly reviews | Quarter-long reflection trail |
| Daily plans | MIT hit/miss patterns |
| Brain dumps | Themes that emerged from raw thinking |
| Meeting recaps + decisions log | Decisions made + their outcomes |
| Decision journal | Reviews due, decision quality patterns |
| Reading digests | Intake mix, where reading matched intent |
| Calendar audits | Calendar shape trends |
| Unblock log | Procrastination patterns over the quarter |
| Personal CRM | Relationship strengthening / drifting |
| Note synthesis | Themes that crossed multiple data sources |
| Email digests | Inbox patterns over the quarter |

The more of the pack you use, the richer the sprint. The minimum viable input is weekly reviews + daily plans — even with just those, the sprint produces substantial output.

## Reflection done right

Session 2 is the deepest. The `references/reflection-craft.md` file is explicit about how to make reflection generative rather than corporate:

- **Specific, not generic** — about real things that happened
- **Honest, including the unflattering parts**
- **Generates lessons** — not just summaries
- **In the user's own voice** — not sanitized

The 7 reflective questions are designed to surface meaning from the quarter's data, not just restate it. Examples:

- "What did I plan but not do? What does that pattern teach me?" (not "what didn't get done?")
- "What did I learn about my capabilities or limits?" (not "what skills did you develop?")
- "What was my best decision this quarter — separate from outcome?" (decision quality vs. luck)
- "Most wasted time" (pattern detection, not blame)

## What this skill is NOT

- **Not annual planning.** That's a bigger ritual — once a year. The quarterly is the right cadence for 90-day cycles.
- **Not corporate OKRs.** The framework is flexible. Metrics are optional.
- **Not a productivity scorecard.** No grades, no judgments. Reflection over rating.
- **Not a single sitting.** Force 90+ minutes of reflection on yourself in one chunk and you produce shallow work. The 4-session structure protects depth.

## Updating your settings

Tell Claude *"update my quarterly sprint settings"* — or edit `config.json` directly.

## Files in this skill

- `SKILL.md` — the skill itself (Claude reads this)
- `config.example.json` — canonical config shape
- `assets/quarterly-review-template.md` — comprehensive review file structure
- `assets/themes-priorities-template.md` — next-quarter themes/priorities file
- `assets/goals-update-template.md` — respectful goals.md update pattern
- `references/sprint-sessions.md` — detailed flow for each of the 4 sessions
- `references/reflection-craft.md` — quality bar for Session 2 reflection
- `references/theme-craft.md` — what makes a good theme vs. corporate-speak

---

_Free for AI Black Magic email subscribers. Share, don't sell._
