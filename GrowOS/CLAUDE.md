@AGENTS.md

## Claude-only notes

The charter above (AGENTS.md) is the shared source of truth. It is read by both
Claude and Codex, so keep every real rule there, not here. This file adds only
the few things specific to Claude Code:

- Skills live in `.claude/skills/`. Invoke them by name; do not open a `SKILL.md`
  and follow it by hand when the skill is available as a tool.
- The guard hooks are already wired in `.claude/settings.json`. Do not edit that
  file or the guard scripts. They are machinery (see the machine set in AGENTS.md).
- If a skill you expect is missing, say so plainly and fall back to the safest
  manual step. Never invent a skill or a tool that is not there.
