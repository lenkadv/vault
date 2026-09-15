# Inbox File Format

The inbox file is an optional capture pad the user maintains throughout the day. The skill reads from it when running a dump, then leaves it alone (the user empties it manually when they're ready).

## What the file looks like

It's just a plain markdown or text file. The format is intentionally loose — capture is supposed to be friction-free.

Example:

```
- need to call dentist
- idea: micro-course on productivity skills?
- what's the deadline for taxes
- ugh stressed about friday
- pick up dry cleaning
- decide between vendor A and vendor B for the photoshoot
- great quote from podcast: "the cave you fear holds the treasure you seek"
```

Bullet, line, or paragraph — any format works. The skill sorts on intent, not on structure.

## Where to put it

Anywhere the skill can read. Common patterns:

- **In your notes app** that syncs to a file (Obsidian, Bear with markdown export, iA Writer, Drafts → file)
- **On a synced cloud folder** (Dropbox, Google Drive, OneDrive) so your phone can write to it
- **In the same productivity workspace folder** as your dumps and plans

Configure the path in `config.json` under `output.inbox_file_path` — or tell Claude "use `<path>` as my inbox file."

## How the skill uses it

When the user says "process my inbox" or "run my brain dump from inbox":

1. Skill reads the file.
2. Each line becomes an item to sort (blank lines and obvious headers are skipped).
3. Items get processed through the same 5-bucket sort, enrichment, and emotional handling as a typed dump.
4. A timestamped dump file is saved as usual.
5. Tasks go to next-actions.md.
6. The skill **does not delete or modify the inbox file** — that's the user's call.

### Why the skill doesn't auto-clear the inbox

Auto-clearing is dangerous. If something goes wrong (crash, partial save, the user disagrees with how an item was sorted), there's no recovery. Leaving the file alone keeps the user in control:

- After the dump processes successfully, the skill ends with: "Your inbox file at `{path}` still contains the original items. Clear it whenever you're ready — or tell me to clear it now."
- If the user says "clear it", the skill empties the file (preserving any headers) and confirms.

## Setting up an inbox file for the first time

1. Pick a path. (Recommendation: `~/productivity/inbox.md` or wherever your other productivity files live.)
2. Create the file with a one-line header so you remember what it's for:
   ```markdown
   # Inbox — dump captures here throughout the day
   ```
3. Tell Claude: "Use `<path>` as my brain dump inbox." Or edit `config.json` directly.

That's it. From now on, anything you jot into that file gets processed when you run a brain dump from inbox.
