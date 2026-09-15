# Brain Dump Processor

**Part of the Personal Productivity Pack — a free skill set from AI Black Magic.**

Take whatever mess of thoughts you're carrying and turn it into a clean, sorted output. The skill processes a brain dump — typed, voice-transcribed, interactively prompted, or pulled from an inbox file — and sorts every item into 5 buckets: Tasks, Ideas, Decisions, Questions, Notes. Actionable items flow straight into the Daily Plan Builder.

## Quick start

1. **Install the skill** — drop the `productivity-brain-dump` folder into your Claude skills directory.
2. **Ask Claude**: *"Brain dump."* (or paste a wall of text, or "process my inbox.")
3. **Answer the one-time onboarding questions** — folders for dumps and the shared next-actions file, optional inbox file, optional goals file. ~60 seconds.
4. **From then on**, every dump gets sorted, saved, and the tasks flow into your planner.

## How to use it

**Type or paste it.** Drop a wall of text into Claude with "brain dump" — the skill processes whatever you give it.

**Upload a voice transcript.** Got a .txt or .md from Otter, AudioPen, or Apple Voice Memos? Upload it and say "process this dump."

**Interactive walk-through.** Frozen at a blank page? Just say "brain dump" with nothing else. The skill will ask "What's on your mind?" and prompt you through it.

**Process your inbox file.** If you keep a capture file (on your phone, in your notes app, anywhere), point the skill at it during onboarding. Say "process my inbox" any time.

## What the skill does

- **Sorts** every thought into Tasks, Ideas, Decisions, Questions, or Notes
- **Cleans up** task phrasing without inventing context you didn't provide
- **Flags urgent** tasks with a 🔥 prefix (recognizes "today", "asap", "by Friday", etc.)
- **Maps tasks to goal areas** if you keep a goals file
- **Handles emotional content gently** — acknowledges feelings, files them under Notes, doesn't try to force a task out of a worry
- **Saves a timestamped dump file** so you can scroll back through past sessions
- **Appends actionable items to `next-actions.md`** — the Daily Plan Builder reads from this
- **Offers to plan** your day right after the dump (you can decline)

## How it pairs with Daily Plan Builder

The brain dump skill writes to `next-actions.md`. The Daily Plan Builder reads from `next-actions.md`. That's the whole integration:

1. You dump your head into the brain dump skill.
2. Tasks land in `next-actions.md`.
3. Next time you run the daily planner, those tasks show up as candidates.
4. You pick your MITs from the pool.

If you only use one of the two skills, both still work fine alone.

## What the skill won't do

- **Won't drop items.** Even weird, short, or unclear items get filed (usually under Notes). You can trust it to preserve what you dumped.
- **Won't merge separate thoughts.** Each line stays its own line.
- **Won't try to be your therapist.** When something emotional shows up, you get one calm acknowledging sentence — not a paragraph of unsolicited advice.
- **Won't auto-clear your inbox file.** That's your call.

## Updating your settings

Tell Claude *"update my brain dump settings"* — or edit `config.json` directly.

## Files in this skill

- `SKILL.md` — the skill itself (Claude reads this)
- `config.example.json` — canonical config shape
- `assets/dump-template.md` — markdown template for saved dumps
- `references/sorting-guide.md` — heuristics for tricky bucket calls
- `references/inbox-file-format.md` — spec for the optional inbox file

---

_Free for AI Black Magic email subscribers. Share, don't sell._
