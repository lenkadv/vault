# Playbook: import from GrowOS 0.1

When the owner already uses an older GrowOS, do not make them start over. Their old
folder is the best draft-to-correct you could ask for: it is their real business,
already written down. Map what exists into the new brain, then jump straight to the
plan, skipping every question the old files already answer.

Read the old folder only. Never write into it or change it. All writing happens in
the new business folder.

---

## 1. Get the path

Ask for the path to their old GrowOS folder. They do not need to know whether
it points at one business or their whole old install — the importer below
sorts that out, and tells you which business folders it found if it needs to
be pointed at one specifically.

---

## 2. Run the importer

Never merge files by hand. Run the real tool instead — it losslessly archives
every file byte-for-byte and safely maps what it can, the same
preview-then-`--yes` rhythm `growos-update` uses for this same handoff:

`node system/tools/growos.js import --from "<their old folder>" --business "Their Business Name"`

Without `--yes` this only previews what would come across, file by file; add
`--yes` once the owner is happy to bring it in. If the path turns out to be a
whole old install rather than one business, the tool lists the business
folders it finds inside — point it at the right one and run it again. Their
old folder is only ever read; nothing in it is ever changed, moved, or deleted.

If the path is wrong, unreadable, or does not look like a GrowOS 0.1 business,
the tool says so plainly, with the reason why — fall back to a normal fresh
onboarding (`playbooks/self-gather.md`) rather than dead-ending the setup.

What lands where:

| What it is | Where the importer puts it |
|---|---|
| `research/` entries | `brain/research/` |
| `uploads/` | `brain/assets/` |
| `swipe-files/`, `inspiration/` | `library/` (this business's own learned material, not the shared brain) |
| `output/` entries marked `status: published` | `brain/samples/` — their real published writing |
| Everything else — `business.md`, `offers.md`, `voice.md`, `style.md`, `brand.md`, `lessons.md`, `content-ideas.md`, `audiences/`, `proof/`, `stories/`, unfinished `output/`, and anything the importer does not recognize | `brain/inbox/`, for you and the owner to sort together (Step 3 below) |

Every file, wherever it lands, is also archived byte-for-byte under
`<business>/legacy-0.1/<date>/original/` and checked against the source after
the copy — so nothing is lost even where the importer could not confidently
place something. Secrets or API keys in old config are never copied into any
brain file or `setup.md`; if you spot one, tell the owner it now lives in
`<business>/.env`.

---

## 3. Confirm, do not re-ask

Most of what comes across lands in `brain/inbox/` rather than straight into a
named brain file — the importer never guesses which brain file a file like
`voice.md` or `business.md` really belongs in, on purpose. Process that inbox
first, the same way Step 5 of this skill processes `add-to-brain/` (the same
`brain-capture` routing), before showing the owner anything. Keep their words;
invent nothing to fill a gap the old folder left blank.

Show the mapped brain back the same way as a fresh onboarding: "here is what I
carried over from your old GrowOS. Correct me where anything is stale." But because
these are their own prior answers, this is a light review, not a full interview.

- Skip any question the old files already answer. If `voice.md` came across rich,
  do a short taste check at most, not the full three-variant calibration.
- Only run the calibration or a deeper interview for the parts the old folder left
  thin or empty.
- Note anything you could not map (an old file in a shape you did not recognize) so
  the owner can point you at it.

---

## 4. Rejoin the main flow

Once the brain is mapped and confirmed, return to the skill at **Step 6**: the
debrief and the human-only questions, which start with the bottleneck
question, then write `brain/plan.md`, and continue to tools, the
"what do you want to make first?" menu, and the Day-One Map like any other
onboarding. An importing owner still gets a fresh plan and a first approved
piece of work; only the brain-building was a shortcut.

Checkpoint (phase: `imported`) before rejoining, so a stop mid-import resumes
cleanly.
