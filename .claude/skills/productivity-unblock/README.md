# Procrastination Unblocker

**Part of the Personal Productivity Pack — a free skill set from AI Black Magic.**

Get unstuck on a specific task in under 90 seconds. The skill runs a quick 2-3 question diagnostic to identify what kind of procrastination is happening, then prescribes one matched intervention. No coaching, no motivational posters — brisk, tactical, done.

## Quick start

1. **Install the skill** — drop the `productivity-unblock` folder into your Claude skills directory.
2. **Ask Claude**: *"I'm stuck."* Or *"Help me unblock the X task."* Or *"I'm procrastinating on my MIT."*
3. **Answer the one-time onboarding questions** — about 30 seconds.
4. **From then on**, every "I'm stuck" runs the diagnostic and prescribes one move.

## How it works

The skill assumes procrastination has six common roots and treats each one differently. One-size-fits-all advice ("just start!") fails because the right intervention depends on the cause.

The six diagnoses:

| Diagnosis | Looks like | Prescription |
|---|---|---|
| **Overwhelm** | Task feels too big | Shrink it — 5 minutes on the smallest piece |
| **Ambiguity** | Don't know what to do first | Define "done" + next concrete action |
| **Fear / perfectionism** | Afraid it'll be bad | Deliberately bad 15-minute draft |
| **Boredom / aversion** | Just don't want to | Pair with energy — music, walk, coffee shop |
| **Low energy** | Depleted, can't focus | Body check (water/food/walk) or permission to defer |
| **No stakes** | Doesn't matter enough | Clarify stakes, or drop it |

The skill picks one based on your answer and prescribes it concretely — including the exact next physical action and a timer duration where applicable.

## Pack integration

If you use the Daily Plan Builder or Brain Dump Processor, the skill knows about them. You can say:

- *"I'm stuck on my MIT"* → skill reads today's plan and finds it
- *"Unblock me on the call-Sarah task"* → skill searches `next-actions.md` for it
- *"I'm avoiding the proposal"* → skill matches by keyword

If you don't use the other skills, no problem — just describe the task in chat.

## The log

Every session writes a short entry to `unblock-log.md`. Over weeks, you'll see your personal patterns:

- *"60% of my unblocks are fear/perfectionism."*
- *"I keep getting stuck on creative writing tasks."*
- *"The dentist appointment has been here 4 times — maybe I really don't want to do it."*

The log is the long-term value of the skill. The intervention works in the moment; the pattern recognition changes how you set up your work going forward.

## What this skill is NOT

- **Not a coach.** No "you can do this!" energy. The brisk tone respects users who don't want softness.
- **Not a therapist.** When something heavier surfaces (real depression, burnout, grief), the skill names it and steps aside.
- **Not a habit tracker.** It logs sessions but doesn't enforce streaks or score you.

## Updating your settings

Tell Claude *"update my unblock settings"* — or edit `config.json` directly.

## Files in this skill

- `SKILL.md` — the skill itself (Claude reads this)
- `config.example.json` — canonical config shape
- `references/interventions.md` — full library of diagnosis → prescription mappings
- `references/diagnostic-clues.md` — phrase-to-category translations + signals for non-procrastination issues
- `assets/log-entry-template.md` — format for log entries

---

_Free for AI Black Magic email subscribers. Share, don't sell._
