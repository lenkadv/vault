# Publish — the content channel flow

> This is the content branch of the `publish` skill: the former
> `content-publish` flow, re-housed unchanged in wave 0. The router in
> `SKILL.md` sends an approved social post, article, page, or other content
> item here. Playbook and checklist paths are relative to
> `.claude/skills/publish/`.

Prepare approved content without changing its words, and take it exactly as far
as the owner's per-channel choice allows — a safe draft by default, a real post
or schedule only where the owner set exactly `live`. Read
`system/standards/publisher-standard.md` before any action; its resolver, live
rules, staging, and event recording all apply here.

## 1. Check the door

Reconcile, then re-read the selected item. Its status must be `approved`. Refuse
and stop for every other status. Read the approved snapshot when available and
confirm the current body still matches what the owner approved. Never edit or
rewrite the copy or body.

The approved snapshot is a hard door, not an optional comparison. If it is
missing or does not exist, or the current body and package mismatch or do not
match it, make no outside action and no receipt write. Keep the item approved
and ask the owner to reconfirm it by moving it back to review, which is the
owner's move to make; the AI cannot make that downgrade. The owner then accepts
or makes the change and approves the exact version again. On that fresh approval
GrowOS refreshes the approved snapshot: through the hook when the owner approves
in chat, or through
reconcile when they approve in their editor. The next run then sees a matching
snapshot and can proceed. Never create proof from the current body without that
fresh approval.

Check the receipt before creating anything. An existing `publish_ref` or
`needs-verification` state means verify the earlier attempt. Do not create again.

## 2. Resolve how far, then the destination

First ask the resolver — never `setup.md`:

```text
node system/tools/growos.js publishing-mode --item <path> --json
```

- `unanswered` — ask the owner before ANY outside write. Their answer may
  update setup.md (on their word alone), then resolve again.
- `explicit-safe` — a connected DRAFT or the manual package. **No schedule**:
  scheduling counts as live.
- `explicit-live` — the standard's "Going live" rules: in-session confirmation
  naming item, reported account, destination id, and now-vs-schedule; one
  mutation; read-back with provider-specific criteria. A schedule additionally
  requires the exact approved date, time, and time zone. `shareNow` or an
  immediate-post mode is allowed ONLY here, only after that confirmation.

Then inspect the actual runtime for the connection the route names. Do not
assume a named service is connected. Account and destination come from the
resolver's entry fields, the item, its `_brief.md`, or the owner's answer.
Never guess them.

Threads and unsupported media use the manual fallback unless the connection
proves it can preserve the complete approved package. Any post that ships a
FILE (an image, a video) stages it first: `growos publish-stage --item <path>
--json`, upload from the staged paths, `--release` after.

## 3. Use one playbook

- Safe draft or exact approved schedule connection:
  `playbooks/connected-scheduler.md`.
- Missing capability, threads, or unsupported media:
  `playbooks/manual-content.md`.

Write receipt fields while the item remains approved. Move it to published only
after the outside state is verified as safe or the owner confirms the manual
handoff.

## 4. Record and report per item

Record every attempt — whatever happened — with one reason-coded event:

```text
node system/tools/growos.js publish-event --item <path> --publisher publish \
  --route <connector|api|manual> --outcome <...> --reason <code>
```

For each item report headline, destination, receipt state, outside reference when
one exists, and the next owner action. A mixed batch keeps separate outcomes.

Score `checklists/content.md`. Any no keeps that item approved.
