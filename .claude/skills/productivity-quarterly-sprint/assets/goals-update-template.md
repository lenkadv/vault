# Goals File Update Pattern

The quarterly sprint updates the goals file (the same one the rest of the pack reads). This template explains how to do it respectfully — preserving history, marking progress, and adding new entries without overwriting the user's structure.

## The principle: edit, don't rewrite

The goals file is the user's. The sprint proposes changes; the user confirms each before saving. Never overwrite the file wholesale.

## Reading the existing file

Goals files follow a flexible structure (per the goals-file-format.md spec from earlier in the pack):

```markdown
# My Goals — 2026

## Work
- Ship the new pricing page by end of Q2
- Get 3 client testimonials this quarter
- Build the email automation system

## Health
- Run 3x per week
- Hit 8 hours of sleep on weekdays

## Personal
- Finish reading [book]
- Plan summer trip
```

The skill should:

1. **Read** the file in full.
2. **Group** the existing goals by section.
3. **Walk through** each section with the user.

## Per-section walkthrough

For each existing goal in the section, ask:

> "[Goal text]" — done, dropped, or carry forward?

The user picks one:

- **Done** → mark as completed in the file (strikethrough or move to a "Completed [Year]" section at the bottom of the file)
- **Dropped** → remove the line OR move to a "Dropped" section (let the user pick the convention they prefer — once chosen, stick with it across the file)
- **Carry forward** → keep the line as-is

If the user wants to reframe a goal ("not 'launch newsletter' anymore — now it's 'launch podcast'"), edit the line to reflect the new framing.

## Adding new goals

After walking existing goals, ask:

> "Based on next quarter's themes and priorities, here are the new goals to add — confirm each?"

Translate the themes/priorities into goal-area-tagged entries. Example translation:

**Themes/priorities:**
- Theme: "Build distribution"
  - Get to 10,000 newsletter subscribers
  - Launch podcast presence (5 episodes minimum)

**Becomes goals.md entries:**
```markdown
## Work
- Newsletter to 10,000 subscribers (Q3 priority)
- Launch podcast — 5 episodes by end of Q3
```

The skill should pick the right SECTION for each new goal based on:
- Existing section names in the user's file
- Theme name (e.g., a "Health reset" theme → goals go in the Health section)
- User confirmation if ambiguous

## Don't auto-add untouched sections

If the user picks a theme that touches a goal area they don't currently track in goals.md (e.g., they have Work and Health, but the new theme is "Learning"), ask:

> "This theme is about Learning, but you don't have a Learning section in goals.md. Add one?"

The user decides.

## Confirmation before saving

After all section edits + additions, show the user the proposed new state of goals.md:

> "Here's what goals.md will look like after the updates. OK to save?"

If the user wants any final tweaks, take them, then save.

## Preserving structure

- Maintain the user's heading structure (H1 / H2 / H3 conventions they use)
- Maintain their bullet style (dashes vs. asterisks, etc.)
- Maintain blank lines and other whitespace patterns
- Don't reorder sections unless asked

## Example update flow

**Before sprint:**

```markdown
# My Goals — 2026

## Work
- Ship pricing page by end of Q2
- Get 3 client testimonials this quarter
- Build email automation

## Health
- Run 3x per week
- Hit 8 hours sleep on weekdays
```

**Walking through with user:**

- "Ship pricing page" → **Done** (the sprint look-back already noted this)
- "Get 3 client testimonials" → **Carry forward** (still working on it)
- "Build email automation" → **Dropped** (decided this wasn't worth it)
- "Run 3x per week" → **Carry forward**
- "Sleep 8 hours" → **Carry forward**

**New goals from themes:**

- Add to Work: "Newsletter to 10,000 subscribers"
- Add to Work: "Launch podcast — 5 episodes by end of Q3"
- Add to Health: "Train for half marathon — race Aug 15"

**After sprint:**

```markdown
# My Goals — 2026

## Work
- Get 3 client testimonials this quarter
- Newsletter to 10,000 subscribers (Q3 priority)
- Launch podcast — 5 episodes by end of Q3

## Health
- Run 3x per week
- Hit 8 hours sleep on weekdays
- Train for half marathon — race Aug 15

## Completed Q2 2026
- ~~Ship pricing page by end of Q2~~

## Dropped
- ~~Build email automation~~ — decided not worth the effort
```

(Or whatever convention the user prefers for completed/dropped — the example above uses strikethrough + dedicated sections.)

---

## Template usage notes (for the skill — not part of the output)

- Be PATIENT during the walkthrough. The user is making real decisions about their goals — don't rush them.
- The user might want to discuss a goal during the walkthrough ("should I keep this?"). The skill can offer brief perspective but defers to the user's judgment.
- If goals.md is empty or doesn't exist, the sprint can create it from the themes/priorities — but ask the user how they want the file structured.
- The "Completed" and "Dropped" sections at the bottom of the file are convention, not requirement. Some users prefer to just remove dropped goals and not list them. Honor preference once expressed.
