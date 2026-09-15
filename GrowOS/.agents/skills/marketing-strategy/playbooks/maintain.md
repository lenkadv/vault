# Playbook: maintain

Use this for small edits to a plan that already exists and still holds: this
month's themes, swapping one piece of work for another, rolling a date forward,
fixing a name. These happen in chat. There is no work item, no status move, and no
queue round.

Most maintenance turns out to be confirming that nothing moved. That is a normal
and good result, and it must not cost a full round.

Read `SKILL.md` first. Its law applies here too — including this one: every example
business below is called "Example something", and **no sentence from any example in
this skill may ever appear in a real plan.** Examples show the standard; the words
come from this business's files.

## Step 1: Read before you sort

Read `brain/plan.md` in full, plus any brain file the change touches
(`brain/business.md` for an offer or price, `brain/competitors.md` for a
positioning line, `brain/decisions.md` for whether this was already settled).

If `brain/plan.md` is missing, empty, or still template, this is not maintenance.
Say so in one line and go to `playbooks/create.md`.

## Step 2: Sort the change against the list

This is a list, not a feeling. Say out loud which list the change landed on.

### Big — goes through the queue as a full round

- The target number, or the horizon.
- Who the plan is for.
- The positioning line.
- Which channels are in or out.
- Adding a refusal, or removing one.
- The offer or the price the plan is built on.
- **Anything that makes a line already in `plan.md` untrue.**

### Small — handled here, in chat, on the owner's yes

- This month's or this week's themes, inside a channel that is already chosen.
- Swapping one specific piece of work for another, inside a channel that is
  already chosen.
- Rolling a date forward.
- Fixing a name, a link, a typo, or a skill name.
- Adding a note that changes no decision.
- Recording that a checkpoint happened, and what the answer was.

### If it is on neither list, or on both

Treat it as big, and say why in one plain line. In the shape Example Boiler Care
would use: "You asked to swap the Thursday Example Boiler Care post for a short
video. That is a swap inside a chosen channel, which is small — but video is not
one of the two channels in the Example Boiler Care plan, so it also changes which
channels are in. When both apply, it gets a proper round."

## Step 3a: If it is big, hand it over cleanly

Say so in one line, name which item on the big list it touches, and switch to
`playbooks/create.md` for a full round through the queue.

Do not "just make the one edit" on a big change. A spine line edited quietly in
chat leaves the rest of the page silently untrue, and nobody finds out until the
checkpoint.

If, after you have told them it is a big change, the owner says plainly to do it
anyway ("just change it, I do not want a whole round"), that is their call and it
stands. Then, in this order: show the before and after as in Step 3b, name in one
plain line which other lines of the plan may now be untrue, apply it on their yes,
and offer a full round to check the rest. Never take this shortcut on your own
reading of what they probably meant.

## Step 3b: If it is small, show the exact before and after

One block per changed line. Nothing else changes.

```
Line: This month's theme (focus channel: the newsletter)

Before: October theme — Example Boiler Care winter prep checklists.
After:  October theme — Example Boiler Care winter prep checklists, plus the two
        questions Example Boiler Care customers keep asking in replies.

Why: you said the replies to Example Boiler Care keep asking the same two things.
```

Rules for this step:

- Show every line you would change, before and after. No silent edits alongside
  the one they asked for.
- Quote the "before" from the file exactly as it is written.
- Keep any `[PLACEHOLDER: ...]` untouched unless the owner is supplying the exact
  missing fact right now.
- If the edit pushes the page over about 500 words, say what you would cut to make
  room and show that cut in the same set of before-and-afters. The one-page law
  does not bend for an addition.
- If the change needs a number, price, or claim the brain does not hold, do not
  estimate. Ask the owner for it, or write it as a placeholder.

## Step 4: Apply on the owner's yes, then confirm in one line

Only a clear yes applies the change. A "sounds about right" is a yes; silence is
not.

Apply the agreed edits to `brain/plan.md` in one save. Read the file back, then
confirm in one plain line what changed and where: "Updated this month's theme in
`brain/plan.md`; nothing else moved."

That confirmation reports the read-back, not the edit you meant to make. If the
line you just read does not say what you expected, say that instead — what you
tried, what the file actually holds now, and what you would do next.

No work item is created. No status is moved. There is nothing to publish, because
`brain/plan.md` is the destination and it has just been written.

## Step 5: Log the decision if there was one

If the change came with a real decision the owner stated plainly ("we are dropping
the Saturday Example Boiler Care workshop"), offer to add it to the top of
`brain/decisions.md`, dated,
with the decision, the why, the trade-off they accepted, and what was not decided.
Write it only on their yes. Never rewrite an entry that is already there; new
entries go on top.

## Reopening a plan: always with a reason

When the owner asks for a rewrite, a rewrite is what they get — but never a silent
one. State, in their own terms, what changed in the world that reopened the plan,
before you start.

- **Bad:** "Here is version 2 of the Example Bike Repair plan."
- **Good:** "Reopening the Example Bike Repair plan, because the spring ad round
  cost Example Bike Repair more per booking than referrals did and you dropped the
  six-week service package last week. Between them, those two make three lines in
  the current plan untrue."

Then go to `playbooks/create.md`, and offer to log the reason at the top of
`brain/decisions.md`.

## Checkpoints

When the plan's checkpoint date arrives, or the owner asks how the plan is going:

1. Read the plan's watched numbers and say where each one actually stands, from a
   named source. If you cannot see the number, say so and ask the owner for it.
   Never estimate it.
2. Read any line that said "only if X by <date>" and say plainly whether X
   happened.
3. Say which parts of the plan still hold and which do not.
4. Record the checkpoint result in `brain/plan.md` — that is a small change and
   goes through Step 3b.
5. If any line of the plan is now untrue, that is a big change by the list in Step
   2. Say which line and why, and offer a full round.

## What this playbook never does

It never edits `brain/plan.md` without showing the exact before and after first,
and never without the owner's yes. It never makes a big change quietly. It never
invents a number to fill a themed month. It never fills or deletes a placeholder.
It never creates a work item or moves a status. It never writes the `note` field.
It never rewrites an entry already in `brain/decisions.md`.
