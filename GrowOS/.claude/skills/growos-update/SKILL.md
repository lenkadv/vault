---
name: growos-update
description: 'Install a GrowOS update safely: preview the changes, get a clear go-ahead, then apply it and report what changed. Triggers: "update growos", "install the update", "new version".'
---

# Update GrowOS

This skill installs a new version of GrowOS safely. It previews what will change,
waits for the owner's go-ahead, then applies the update and reports back. Reach for
it when the owner says "update growos", "install the update", or "there is a new
version".

The updater is careful by design. It changes nothing until it has checked that the
update file is whole and fits the current version. It makes a restore point before
it swaps anything. It protects any changes the owner made to GrowOS's own files.
And it only ever replaces GrowOS's own machinery — an update never touches the
owner's business folders, and it refuses any update file that tries. Your job is
to be the calm, plain-words guide through it.

## Step 1: Get the update
Ask the owner where the update is: a file they downloaded, or a link. If they are
not sure where updates come from, say plainly that you do not know either — you
cannot see where they bought GrowOS — and suggest they check the email or account
they got it from. Never invent a download address.

## Step 2: Preview it first (change nothing)
Always do a dry run before anything real:

`node system/tools/growos.js update <file-or-link> --dry-run`

This checks the update and prints what it would do, without touching a thing. Relay
it in plain words:

- what would change (how many of GrowOS's own files would update),
- any files the owner customized that would be kept safe (a copy is set aside for
  them),
- and that their business folders will not be touched — an update never writes
  inside them.

If the dry run stops with a problem (the file is damaged, was changed after it was
made, or does not fit their current version), tell them plainly that nothing was
changed and they should not go ahead. Do not try to force it.

## If the dry run says this is GrowOS 0.1
Sometimes the dry run stops for a different reason: the folder is not running 2.0 at
all, it is the older GrowOS 0.1, reporting a version number that looks like 2.0 by
mistake — every real 0.1 install does this, so it is not the owner's fault and
nothing is broken. An update genuinely cannot be installed onto it; 0.1 is built
differently underneath.

Do not present this as an error. Tell the owner warmly: this version needs a
one-time move into a fresh 2.0 install, not an update, and every bit of their
business content comes across — nothing is lost, nothing is guessed at. Offer to
make that move for them, and wait for a clear yes, exactly as you would for a real
update.

Once they say yes, switch to the import, using the same preview-then-apply rhythm:

`node system/tools/growos.js import --from <their old business folder> --business "Their Business Name"`

Without `--yes` this only previews what would come across; add `--yes` once they are
happy to actually bring it in. If their old folder holds more than one business, the
tool lists the business folders it finds inside when you point it at the whole
folder — bring each one across the same way, one at a time. Their old folder is only
ever read; nothing in it is ever changed.

## Step 3: Get a clear go-ahead
Show the owner the preview and ask, in plain words, whether to go ahead. Wait for a
clear yes. Do not proceed on a maybe.

## Step 4: Apply the update
Only after they say yes, run it for real:

`node system/tools/growos.js update <file-or-link>`

Let it work. It makes its restore point, swaps in the new files, keeps any
customizations, and refreshes everything. Relay the report it prints: what changed,
what was kept for them, and where the restore point is saved in case they ever
want it. If an update ever leaves things worse, that restore point is what undoes it:

`node system/tools/growos.js repair --restore <the restore point the update printed>`

That puts the machinery back exactly as it was. The command itself does not pause
to ask again once you run it, so only run it once the owner has clearly said go,
the same as any real update. If the new version needs anything filled in inside
their businesses (new brain files, say), that is a separate step the Doctor will
point out — the update itself never does it.

## Step 5: If it refuses or rolls back
The updater protects the owner over finishing the job. If it stops — because the
file failed its check, tried to touch business files, or hit a snag and rolled
everything back — tell them the honest, reassuring truth: nothing was changed and
nothing was lost, and the folder is exactly as it was. If they want help, have them run the support
report (`node system/tools/growos.js doctor --report`) and send the file it saves
at `.growos/support-report.md` when they reach out. Never present a failed or
rolled-back update as if it worked.

## The one rule you never bend
Never run the real update — or the real import, if this turns out to be a 0.1
folder — until the owner has clearly said go in this conversation, and never add a
"skip the questions" flag (`--yes`) before that yes. The dry run and the import
preview are always safe. The real run waits for them.

## When something is missing or breaks
If the shell cannot find `node`, the file or link will not load, or the tool
errors, say so in one plain line and stop. Do not retry blindly or pretend it
updated. Show them the exact error, and offer to run the Doctor so they can see
the folder is still intact.

**What this skill never does:** it never applies an update without the owner's clear
go-ahead, and it never pushes past a failed safety check. A bad update leaves the
folder untouched.
