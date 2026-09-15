---
name: productivity-decision-journal
description: Captures important decisions in a structured Annie-Duke-style journal entry — situation, options considered, decision made, anticipated outcomes with confidence levels, what would change my mind, and a future review date. Separates "was the decision good?" from "was the outcome good?" — outcomes can be bad due to luck even when the decision was sound. Each entry is its own file; reviews append a "Review" section to the original (full decision arc visible in one place). Cross-references the lighter decisions.md log written by the meeting-recap skill. Use this skill whenever the user says "journal this decision", "I want to record this decision", "log a decision", "decision journal entry", "write up a decision properly", "I'm about to decide something big", "capture this decision for later review", or any phrase about structured decision capture. Also use when reviewing past decisions — "review my decision on X", "how did the X decision turn out", "what decisions are due for review". The skill is intentionally heavier than the decisions.md log — use this for decisions worth the 5-10 minutes it takes to do right.
---

# productivity-decision-journal

This skill exists because most people remember their decisions wrong. They remember outcomes — not the reasoning, options, or predictions that went into the choice. Months later, when they want to learn from past decisions, they're stuck with hindsight bias: "I always knew that would happen."

A decision journal solves this by capturing the decision at the moment, with the reasoning, options, and predictions intact. Later, you can review what actually happened and separate two questions:

1. **Was the OUTCOME good?**
2. **Was the DECISION good?**

These can diverge. Bad decisions sometimes produce good outcomes (luck). Good decisions sometimes produce bad outcomes (also luck). The skill at decision-making improves only if you can tell them apart.

## When to use this vs. decisions.md

The pack has two decision artifacts:

| | **decisions.md (meeting-recap)** | **Decision Journal (this skill)** |
|---|---|---|
| **For** | Quick log of what was decided | Structured record of why and what's predicted |
| **Effort** | Auto-captured from meetings (~30 sec) | 5-10 minutes per entry |
| **When** | Every meeting decision | Decisions worth the effort to review later |
| **Structure** | One-line entry | Full Annie Duke structure |
| **Review** | Searchable but no formal review | Each entry has a review date and append-on-review |

Use decisions.md as the default for routine meeting decisions. Use Decision Journal for decisions you'd want to learn from in 6 months: big bets, irreversible moves, decisions made under uncertainty, decisions where you'd benefit from comparing predictions to reality.

## First-run check

Before doing anything else, look for `config.json` in this skill's directory.

- **If `config.json` does not exist, OR is missing required fields** (`output.journal_folder`): run the **First-run onboarding**.
- **If `config.json` exists and is complete**: skip onboarding and go to **The flows**.

## First-run onboarding

Welcome:

> "Welcome to Decision Journal. The deeper companion to your decisions.md log — for decisions worth the 5-10 minutes to capture properly. Quick one-time setup. (Part of the Personal Productivity Pack from AI Black Magic.)"

Then walk through:

1. **Journal folder.** "Where should journal entries be saved? Default: `Decision Journal/` in your productivity workspace. Each decision becomes its own file."

2. **Decisions log file (pack integration).** "If you use the Meeting Recap skill, point me at the `decisions.md` it maintains. I'll cross-reference journal entries with the corresponding log entries when there's a match. Skip if you don't use it."

3. **Next-actions file (pack integration).** "Point me at `next-actions.md` so any action items implied by a decision flow into your shared task queue. Skip if not using the pack."

4. **Default review window.** "How long after a decision should I default to scheduling its review? Default: 3 months. You can override per-decision."

5. **Allow proactive offers from other skills?** "When the Brain Dump or Meeting Recap skills detect substantive decisions, should they offer to upgrade them to a full journal entry? Default: yes."

Save to `config.json`:

```json
{
  "version": 1,
  "onboarded_at": "YYMMDD",
  "output": {
    "journal_folder": "<absolute path>"
  },
  "pack_integration": {
    "decisions_log_file": null,
    "next_actions_file": null
  },
  "preferences": {
    "default_review_months": 3,
    "allow_proactive_offers": true
  }
}
```

Confirm: "Setup saved. Three things you can do: journal a decision, review one that's due, or just ask 'what decisions are due for review.'"

## The flows

Three modes, detected by phrasing.

### Mode A: Capture a new decision

Triggers: "Journal this decision", "I want to record a decision", "Log a decision", "Write up the X decision", "I'm about to decide something big", etc.

This is the main flow. Walk the user through the structured capture. Don't try to fill in answers for them — the value of the journal comes from the user articulating their own thinking.

#### Step 1 — Establish the decision

Ask: "What's the decision?" In one sentence. If the user gives a vague answer ("the pricing thing"), ask a quick clarifier — the decision needs to be statable in one sentence or it's not actually a decision yet.

#### Step 2 — Walk through the entry sections

Ask one section at a time. Use AskUserQuestion where the structure is clear; conversational follow-ups where it isn't. The user is articulating; the skill is structuring.

The sections, in order:

**1. Situation.** "What's going on that's making this decision necessary now?" Capture the context, the trigger.

**2. Problem statement.** "What specifically are you deciding? Frame it as a question." A good decision is one with a sharp problem statement.

**3. Options considered.** "What options are you considering?" 2-5 options usually. If the user lists only one ("I'm going to do X"), gently push: "What's the alternative you're rejecting? Even a weak alternative." The act of naming the alternative usually surfaces something.

**4. Decision.** "Which option are you going with?"

**5. Why this option.** "What's the strongest argument for this choice?" Capture verbatim — the user's reasoning is the heart of the entry.

**6. Anticipated outcomes with confidence.** "What do you expect to happen?" Ask for:
- **Best case** + likelihood (rough percentage or qualitative high/medium/low)
- **Most likely** + likelihood
- **Worst case** + likelihood

Use AskUserQuestion for the likelihood selection if the user wants structure; otherwise let them describe in their own words. Don't make it feel like a test.

**7. What would change my mind.** "If you saw what evidence, you'd reverse this decision?" This is the "kill criteria" — knowing what would change your mind is a strong signal of decision quality.

**8. Inputs / influences.** "What shaped this decision? Books, conversations, people you talked to, frames you used. Any biases you might be aware of?" Often optional; let the user skip if they don't want to articulate this.

**9. Review date.** "When should I prompt you to review this? Default: 3 months from today." Show them the date. Let them adjust.

#### Step 3 — Save the entry

Save to `{journal_folder}/{YYMMDD}-{decision-slug}.md` using `assets/entry-template.md`.

Filename slug should be kebab-case and ~3-5 words: "annual-pricing-acme", "hire-marketing-lead", "switch-to-monorepo".

#### Step 4 — Cross-reference decisions.md

If `decisions_log_file` is configured, check whether a matching entry exists in decisions.md (recent entries, similar keywords). If yes, add a line to that entry: `> Full journal entry: [{journal_filename}]`.

Don't worry about exact match — if there's a recent decisions.md entry that's clearly the same decision, link them. If not, no big deal.

If the decision was made in a meeting context but isn't in decisions.md yet, also append a line to decisions.md following its format (so the lightweight log has visibility):

```markdown
## [YYMMDD] — [Decision title]
**Decision:** [one-line summary]
**Decided by:** [who]
> Full journal entry: [filename]
```

#### Step 5 — Action items (if applicable)

If the decision implies concrete next steps, print them in the chat summary so the user can add them to the appropriate project file with `#next-action #online` (or other context tag). Do NOT append directly to next-actions.md — the vault uses Obsidian Tasks plugin queries, and tasks must be added to project files manually with the correct tags.

Don't push for action items — the journal entry is the artifact. Action items are a side benefit if they're obvious.

#### Step 6 — Confirmation

Print to chat:

```
Decision journaled → {filename}
Review scheduled for: {review_date}
Cross-referenced in decisions.md
{N} action items added to next-actions

Want me to set up a calendar reminder for the review? (Use the schedule skill: "remind me about the [decision] review on [date]".)
```

### Mode B: Review a past decision

Triggers: "Review my decision on X", "How did the X decision turn out", "Time to review the X decision", or invoked when a review date is reached.

#### Step 1 — Find the entry

If the user names a decision, search the journal folder by filename and keyword. If ambiguous, list candidates and ask which.

If the user just says "review my next due decision" or similar, find the entry with the soonest review date in the past or today.

#### Step 2 — Read the original entry back

Show the user the relevant parts of their original entry:
- The decision
- What they predicted
- What would have changed their mind

This is to recover the original context — most people remember the outcome but forget what they expected.

#### Step 3 — Walk through the review questions

Ask one at a time. See `references/review-craft.md` for the why behind each.

1. **What actually happened?** Capture the outcome.
2. **Compared to your predictions, was the outcome better/worse/about-right?** Specifically reference the three confidence-leveled scenarios from the original entry.
3. **Was the DECISION good?** Important to separate from outcome. Ask: "Given what you knew at the time, was this still the right call? Outcomes can be bad due to luck even when the decision was sound."
4. **Were any of the 'what would change my mind' signals triggered?** If so, did you adjust at the time?
5. **What would you do differently now?** With hindsight (acknowledging hindsight bias).
6. **Lessons for future decisions.** What does this teach about how YOU make decisions, not about the specific situation.

#### Step 4 — Append the Review section

Use `assets/review-section-template.md`. Append to the bottom of the original entry. The entry file now contains the full arc: prediction → outcome → reflection.

#### Step 5 — Update status

Add a status line at the top of the entry: `Status: Reviewed YYMMDD`. The entry is no longer "open."

#### Step 6 — Confirmation

Print to chat:

```
{decision-slug} reviewed.
Decision quality: [user's assessment]
Lesson noted: {one-liner if surfaced}

Full updated entry → {filename}
```

### Mode C: Check what's due for review

Triggers: "What decisions are due for review", "Any reviews due", "Check my decision journal".

Walk the journal folder. For each entry:
- Parse the review date from the frontmatter (or first few lines).
- If the review date is today or in the past AND the entry doesn't have a Review section yet, it's due.
- If the review date is in the next 14 days, it's upcoming.

Print:

```
Reviews due (past their review date):
- {date} · {decision title} → {filename}
- {date} · {decision title} → {filename}

Upcoming (next 14 days):
- {date} · {decision title}
- {date} · {decision title}

{If nothing due:} No reviews due. Nice.
```

Offer to start a review for any of the due ones.

This mode is what makes pairing with the schedule skill useful — a weekly run of "what decisions are due for review" turns the journal from a one-time capture into an ongoing practice.

## Proactive offers from other skills

If `preferences.allow_proactive_offers` is true, other skills in the pack can offer to upgrade their detected decisions into journal entries:

- **Brain Dump Processor**: when an item lands in the "Decisions" bucket, after the dump is processed, the brain dump skill checks if this skill is installed and offers: "One of these looks substantive — want to capture it as a full Decision Journal entry?"
- **Meeting Recap**: when decisions are extracted, the meeting-recap skill offers: "Any of these worth a full journal entry?"

The offer is light — one line, easy to decline. The user is in control.

If `allow_proactive_offers` is false, the other skills don't offer. The skill is invoked manually only.

## Editing the config later

Standard pattern.

## Graceful failures

- **No entries yet, user asks for review check**: tell them "No decisions journaled yet — you'll get reviews due here once you've captured some."
- **Review date format ambiguous**: ask. "Three months from today is [date] — that work, or did you mean something different?"
- **decisions.md exists but no clear matching entry**: skip the cross-reference. Don't force a match.
- **Entry file has been manually edited and structure is off**: read what's there, do the review against whatever exists. Don't try to reformat the original.

## What this skill is NOT

- **Not a quick log.** Use decisions.md (via meeting-recap) for that. This skill is for decisions worth 5-10 minutes.
- **Not a decision-maker.** It captures your decision; it doesn't tell you which option to pick.
- **Not for every decision.** Most decisions are routine. The journal is for ones that benefit from later review.
- **Not a probability-forecasting tool.** It uses confidence levels for self-honesty, not to be evaluated against truth.

## Reference files

- `assets/entry-template.md` — full journal entry structure
- `assets/review-section-template.md` — the appended review section
- `references/decision-craft.md` — how to capture decisions well (avoid common failures)
- `references/review-craft.md` — how to review well (decision quality vs outcome quality)
- `config.example.json` — canonical config shape
