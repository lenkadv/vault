# The brain contract

Every business folder has a `brain/`. It holds what the business knows. This
document is the promise that certain files always exist, in a known place, with a
known job, so that any skill can rely on them without guessing. Every skill —
the shipped forty-three and any the owner adds — stays simple because knowledge
has exactly one home each.

The system creates all of these from templates during setup. The Doctor checks that
they exist and are not empty. It does not police what is inside them; that is the
owner's content to shape.

## The required files

| Path | What it holds | What a skill can rely on |
|---|---|---|
| `brain/business.md` | What the business does, its offers and prices, the offer ladder, and its hard facts | The facts nothing may contradict; the offers to market; which rung a reader is on |
| `brain/audience.md` | Who the marketing is for in their own words, their objections, how much they already know, and the routing rules between personas | The persona and language to write toward, and which persona a given piece is for |
| `brain/voice.md` | How the business sounds: sounds-like / does-not-sound-like, the metaphors they reach for, and any house-style overrides | The tone every draft must match |
| `brain/brand.md` | Colors, fonts, and image style | The look for anything visual |
| `brain/plan.md` | The one-page marketing plan: today's snapshot, the 90-day target, focus channels, weekly rhythm, this month's themes, the shape of the year | The answer to "what should I do?" |
| `brain/decisions.md` | The owner's append-only log of calls made, newest on top | The why behind past choices |
| `brain/competitors.md` | Who else the customer could pick, what they promise, and the angle that is ours | What not to sound like; the honest opening nobody else can use |
| `brain/methodology.md` | How the business actually does the work: its steps, its named ideas, its opinions | Content that teaches THIS method instead of generic advice |
| `brain/ideas.md` | The idea bank, including bigger swings and what has already been used | Something to make, so a week never starts from nothing |
| `brain/compliance.md` | Claims that are off limits, wording that must appear, and who signs off | The rules to check every draft against, on every channel |
| `brain/memory/MEMORY.md` | The durable working notes both tools read at the start of every session | How to work with this business, and where deeper knowledge lives |
| `brain/assets/index.md` | A written line per asset file: what it is and when to use it | Which image, logo, or clip to reach for — the only way it can tell |
| `brain/samples/index.md` | One line per filed sample, newest first | What published writing exists, without opening a hundred files |
| `brain/research/index.md` | One line per research file, newest first | What has been researched and when, at a glance |
| `brain/proof/` | Real testimonials and results, one file each | The only source of proof; nothing invented |
| `brain/stories/` | Real, dated stories, one file each | True stories to make work land |
| `brain/lessons/` | What the system has learned about the owner's taste | Corrections to apply before writing |
| `brain/inbox/` | A catch-all drop folder | Where loose material waits to be filed |
| `brain/samples/` | The business's own published material, one file each | How the owner really writes — the source of voice |
| `brain/research/` | Dated findings with their sources and their coverage | What was actually seen, kept apart from what is settled |
| `brain/assets/` | Logos, photos, screenshots, clips — with `index.md` describing each | The raw material a design or post needs |

Five more paths complete the business folder and are part of the same contract:

| Path | What it holds |
|---|---|
| `setup.md` | This business's connections and preferences: provider, destination id, route, and how far a publish may go per channel. Preferences only, never health. Non-secret only |
| `.env` | This business's private keys and passwords; the ONE home for secrets (git-ignored, never shipped, the AI cannot read it) |
| `work/README.md` | An explainer for the work folder |
| `add-to-brain/README.md` | An explainer for the owner's standing drop folder. The owner drops anything the team can learn from (emails, transcripts, PDFs, past posts, videos); on "continue" or "check the folder" the material is read and filed to its proper brain home, originals kept. Skills read from here; only filing skills move things out |
| `library/` | What THAT business has learned. Not in the shipped template — it appears once there is something to put in it. Never reaches another business, and updates never touch it |

**Why every knowledge type is a file.** Templated files with placeholders get
filled in; empty directories rot. So each knowledge type ships as a real file
with headings and placeholders, and no empty folder ships at all: the foldered
types (`proof/`, `stories/`, `samples/`, `research/`, `assets/`, `lessons/`,
`inbox/`) each carry a `README.md`.

## Rules skills must honor

- **Read before you write.** Load the brain files a task depends on (at least
  `business.md`, `audience.md`, and `voice.md`) before drafting, so the work sounds
  like the business and never contradicts its facts.
- **Proof only from `proof/`.** Never invent a testimonial, number, or result. If
  the needed proof is not there, leave a `[PLACEHOLDER]` for the owner.
- **Stories only from `stories/`, as written.** Do not invent or bend a story.
- **Placeholders survive.** A brain file may still contain `[PLACEHOLDER: ...]`
  markers if the owner has not filled it in. That is fine. Work around a placeholder
  honestly; never fill it with a guess.
- **Secrets live only in the business's private `.env` file.** Never copy a key or
  password into `setup.md`, another file, a draft, or a work item. The AI never
  needs a secret's value — scripts read it straight from `.env` — so it never asks
  for one in chat and never prints one. `setup.md` holds non-secret preferences only.
- **Do not require frontmatter on brain files.** Brain files carry no required label
  in this version (proof and story entries have their own small fields). Keep them
  frictionless for the owner to edit.

## Links: the brain is a wiki, the queue is not

Brain pages point at each other with wikilinks, the way Obsidian writes them:
`[[business]]`, `[[audience|who this is for]]`, `[[business#Offer ladder]]`,
`![[logo-dark.png]]` to embed an asset, `[[research/2026-07-pricing]]` when the
bare name is ambiguous. A link resolves to any file in the brain by its name,
case-insensitively. Link generously — a page a reader can reach is a page that
gets used.

**A work item is never a wikilink target and never carries one to another
item.** Work items keep plain ids, because the guard stamps and checks those
and the queue groups on them. A brain page may of course MENTION an item's id
as text.

**The index discipline.** `brain/memory/MEMORY.md` carries the index of the
TOP-LEVEL pages and the folder indexes — never every filed item. The big
folders each keep their own local index (`assets/index.md`,
`samples/index.md`, `research/index.md`): one line per file, newest first.
Filing something updates the LOCAL index; `MEMORY.md` changes only when a NEW
top-level page is created. This is what keeps the one file loaded every
session from becoming a catalogue of hundreds.

**The Doctor checks exactly two things** about links: a wikilink that points
at nothing, and a required top-level page missing from `MEMORY.md`'s index.
Both are advisory. There is deliberately no "orphan page" check.

## The sub-folders

`proof/`, `stories/`, `lessons/`, `inbox/`, `samples/`, `research/` and `assets/`
each ship with a `README.md` that explains the folder. `proof/` and `stories/` also
ship a `_template.md` skeleton to copy for a new entry. Underscore-prefixed files
like `_template.md` are helpers, not content; skills and the guards ignore them.

Three of them have a job worth spelling out:

- **`samples/`** is the business's own published writing. It is where voice
  actually comes from: `voice.md` describes the sound, samples demonstrate it.
  Only the owner's own material goes here — someone else's writing would teach the
  system to sound like them.
- **`research/`** holds findings, not facts. Each file is dated, names its
  sources, and states its coverage — the period looked at, how much was read, and
  whether more went unread. A research skill may write a finding into the brain
  file that owns it, but only carrying an honest mark (**unchecked** by default,
  **rough** at best), and it never touches a line the owner marked **confirmed**.
  A finding becomes a settled fact — one the system can lean on as the owner's
  own word — only when the owner confirms it. Skills treat unchecked lines as
  context, never as claims to publish. Never infer absence from an incomplete
  read.
- **`assets/`** holds files the system cannot read. `index.md` is the half that
  matters: one line per asset saying what it is and when to use it. An asset with
  no line is invisible to every skill.

**`inbox/` is a drop folder, not an archive.** Anything left sitting there is
knowledge the owner handed over that never became knowledge the system can use, so
the Doctor reports what has been waiting and for how long. Draining it — filing
each item into the brain file that owns it — is ordinary work, not a chore that
needs its own ceremony.

`brain/memory/` is different: it ships a single `MEMORY.md`, the durable working
notes both Claude and Codex read at the start of every session. It is a plain file
that travels with the folder, so both tools share one memory. See the charter's
"Memory" section for what belongs there versus in `lessons/` (taste corrections) or
`decisions.md` (business calls); secrets never go there, only in `.env`.
