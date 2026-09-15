---
name: growos-doctor
description: 'Run a full health check on the GrowOS folder, explain each finding in plain words, and offer a safe fix for anything wrong. Triggers: "doctor", "is everything okay", "something feels broken", "run a check".'
---

# The Doctor

This skill checks the whole GrowOS folder and explains what it finds in plain
words. Reach for it when the owner says "doctor", "is everything okay", "something
feels broken", or "run a check", or any time something seems off and you want to
be sure before carrying on.

## Step 1: Run the check
Run:

`node system/tools/growos.js doctor --json`

This prints one line of structured results: a list of findings, each with a level
(`red`, `yellow`, or `green`), a short title, a detail, and a suggested fix. Read
that. Do not show the raw output to the owner.

## Step 2: Explain it in plain words
Turn the findings into a short, calm summary, grouped in three buckets:

- **Problems**: the red findings. These need attention.
- **Warnings**: the yellow findings. Worth a glance, usually not urgent.
- **Looks good**: the green findings. Sum these up in a single line. Do not list
  every one.

If everything is green, lead with the good news: tell them plainly that the folder
is healthy and nothing needs doing. Keep the whole thing scannable. No wall of
text.

## Step 3: Offer a fix for each problem
Every finding carries a suggested fix. Offer it and let the owner decide. Never run
a change without their okay. Fixes come in three shapes:

- A **repair command** for damaged or missing machine files:
  `node system/tools/growos.js repair`. Explain that it re-copies GrowOS's own
  files from a safe backup and never touches their content. Offer to run it.
- **Setting duplicates aside** when a cloud sync (iCloud, OneDrive, Dropbox) has
  left doubled-up copies: `node system/tools/growos.js doctor --quarantine`.
  Explain that it moves the extra copies into a `_quarantine` folder so they can
  compare and keep the right one, and that nothing is deleted. Offer to run it.
- A **plain instruction** for anything else (for example, "this changed outside a
  session, which is normal if that was you editing"). Relay it in plain words, and
  if it is a command, offer to run it with their okay.

Run a fix only after the owner says yes. Then run the check again so they can see
it come back clear.

## Step 4: When they want to contact support
If the owner is stuck or wants help from a person, make them a support report:

`node system/tools/growos.js doctor --report`

This saves a file at `.growos/support-report.md`. Tell them where it is and that it
is safe to share: their business names, headlines, and folder names are scrambled
out, so the report shows what is wrong without exposing what they are working on.
They can attach that file when they ask for help.

## When something is missing or breaks
If the Doctor itself will not run (for example, the shell cannot find `node`, or
the tool errors), say so plainly and give the safest next step: check that Node is
installed (the `growos-setup` skill can walk them through it). Show them the exact
error you saw rather than paraphrasing it. Never guess at the folder's health or
call it fine when you could not actually check.

**What this skill never does:** it never runs a repair, quarantine, or other change
without the owner's okay, and it never sends the support report anywhere. It only
saves it for the owner to share.
