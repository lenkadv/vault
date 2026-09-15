# Decision Journal

**Part of the Personal Productivity Pack — a free skill set from AI Black Magic.**

The deeper companion to the decisions.md log. For decisions worth 5-10 minutes to capture properly — big bets, irreversible moves, decisions made under uncertainty. Each entry uses an Annie-Duke-style structure: situation, options considered, anticipated outcomes with confidence levels, what would change your mind, and a future date to review.

The point: most people remember outcomes but forget reasoning. Capture both at decision-time so you can later separate **"was the outcome good?"** from **"was the decision good?"** — outcomes can be bad due to luck even when the decision was sound. That distinction is where decision-making skill actually improves.

## Quick start

1. **Install the skill** — drop the `productivity-decision-journal` folder into your Claude skills directory.
2. **Ask Claude**: *"Journal this decision"* or *"I want to record a decision"*.
3. **First-run onboarding** (~60 seconds).

## When to use this vs. decisions.md

The pack has two decision artifacts:

| | **decisions.md** (meeting-recap) | **Decision Journal** (this skill) |
|---|---|---|
| **For** | Quick log of what was decided | Structured record of why and what's predicted |
| **Effort** | ~30 sec (auto-captured) | 5-10 min |
| **When** | Every meeting decision | Decisions worth reviewing later |
| **Structure** | One-line entry | Full structured entry |
| **Review** | Searchable | Append-on-review |

Use decisions.md for routine meeting decisions. Use Decision Journal for decisions where you'd benefit from comparing your predictions to reality 3-6 months from now.

## Each entry captures

- **Situation** — what's making this decision necessary now
- **Problem statement** — the decision as a sharp question
- **Options considered** — alternatives, not just the chosen path
- **Decision** — what you're going with
- **Why this option** — your strongest argument
- **Anticipated outcomes** with confidence levels (best / most-likely / worst case)
- **What would change my mind** — kill criteria
- **Inputs and influences** — what shaped this decision
- **Review date** — when to come back and check

## Three modes

| Mode | When |
|---|---|
| **Capture a new decision** | User says "journal this decision" or similar |
| **Review a past decision** | User says "review the [X] decision" or the review date arrives |
| **Check what's due for review** | User says "any reviews due" |

Pair with the schedule skill (*"every Monday at 9am, check my decision journal for reviews due"*) to make the review practice consistent. The skill becomes a one-time capture without the schedule — and a powerful ongoing practice with it.

## Reviews: append, don't replace

When a decision is reviewed, the original entry stays intact and a `## Review` section is appended to the bottom. One file shows the full arc: original predictions → actual outcome → reflection.

The review asks:
- What actually happened?
- How does it compare to your predictions?
- **Was the decision good?** (separate from whether the outcome was good)
- Were your kill criteria triggered?
- What would you do differently with hindsight?
- **Lesson for future decisions** (portable, not situation-specific)

The "lesson" section is the long-term value. Over many reviews, patterns emerge in how you make decisions — and that's how your decision-making skill actually improves.

## Pack integration

| Connects to | What happens |
|---|---|
| **decisions.md** (meeting-recap) | Journal entries cross-reference matching decisions.md lines, and add a journal entry to decisions.md so the log has visibility |
| **next-actions.md** | Action items implied by a decision flow into the shared task queue |
| **Brain Dump Processor** | When dumps surface substantive Decisions bucket items, the brain dump skill offers to upgrade them to a full journal entry (opt-out via config) |
| **Meeting Recap** | When recaps extract decisions, the meeting-recap skill offers to upgrade them (opt-out via config) |
| **Schedule skill** | Pair to auto-check for reviews due on a cadence |

## What this skill is NOT

- **Not a quick log.** Use decisions.md for that.
- **Not a decision-maker.** It captures your decision; doesn't tell you which to pick.
- **Not for every decision.** Most are routine. The journal is for ones worth the effort.
- **Not a probability-forecasting tool.** Confidence levels are for self-honesty, not calibration scoring.

## Updating your settings

Tell Claude *"update my decision journal settings"* — or edit `config.json` directly.

## Files in this skill

- `SKILL.md` — the skill itself (Claude reads this)
- `config.example.json` — canonical config shape
- `assets/entry-template.md` — full journal entry structure
- `assets/review-section-template.md` — appended Review section
- `references/decision-craft.md` — capturing decisions well (common failures + how to push back)
- `references/review-craft.md` — separating decision quality from outcome quality (the central concept)

---

_Free for AI Black Magic email subscribers. Share, don't sell._
