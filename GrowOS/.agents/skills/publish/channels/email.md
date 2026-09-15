# Publish — the email channel flow

> This is the email branch of the `publish` skill: the former `email-publish`
> flow, re-housed unchanged in wave 0. The router in `SKILL.md` sends an
> approved newsletter, broadcast, sequence email, or customer email item here.
> Playbook and checklist paths are relative to `.claude/skills/publish/`.

Prepare an approved email exactly as far as the owner chose for this channel:
an unsent draft by default, a real send only where the owner set exactly
`live`. Read `system/standards/publisher-standard.md` first; its resolver,
live rules, and event recording all apply here.

## 1. Check approval and meaning

Reconcile and re-read the item. Status must be `approved`; stop for any other
state. Compare the current item with its approved snapshot when present.

The approved snapshot is a hard door. If it is missing or does not exist, or
the current subject, preview, body, and package mismatch or do not match it,
make no outside action and no receipt write. Keep the item approved and ask the
owner to reconfirm it by moving it back to review, which is the owner's move to
make; the AI cannot make that downgrade. The owner then accepts or makes the
change and approves the exact version again. On that fresh approval GrowOS
refreshes the approved snapshot: through the hook when the owner approves in
chat, or through reconcile when they approve in their editor. The next run then
sees a matching snapshot and can proceed. Never create proof from the current
item without that fresh approval.

Copy the subject, preview, and body byte-for-byte and byte-faithfully from the
approved package. Do not polish, repair, add a footer, or change links. If a
required field is missing, ask the owner instead of inventing it.

Check for an earlier receipt before any outside action. Verify an existing or
uncertain attempt. Do not create a duplicate.

## 2. Resolve how far, then prove the capability

First ask the resolver — never `setup.md`:

```text
node system/tools/growos.js publishing-mode --item <path> --json
```

- `unanswered` — ask the owner before any outside write.
- `explicit-safe` — an unsent, unscheduled draft (or the manual package).
  Never a send, never a send time.
- `explicit-live` — a real send or approved schedule is allowed, under the
  standard's "Going live" rules: in-session confirmation naming the item, the
  connection's reported account, the exact list or audience id, and
  now-vs-schedule; exactly one mutation; provider-specific read-back (a SENT
  broadcast, not just a created one). The lost-id rule applies: no idempotency
  key or findable client marker means this provider does not send live.

Then inspect the actual runtime connection. Under `explicit-safe` it must be
able to create a draft and read that draft back — a send-only tool is unsafe
there: do not call it; use the manual playbook. Never guess an audience or
list; the resolver's entry carries the confirmed destination id, and a null
id is a question for the owner, not a guess.

- Draft-capable and readable connection: `playbooks/connected-email.md`.
- Missing, send-only, or unverifiable connection: `playbooks/manual-email.md`.

The item stays approved until the draft is verified as unsent, unscheduled, and
non-public, or the owner confirms the same manual result.

## 3. Close honestly

Record every attempt with one reason-coded event (`growos publish-event
--item <path> --publisher publish --route ... --outcome ... --reason
<code>`), whatever the outcome. Write the complete receipt before the separate
move to published. Report the
headline, destination, outside draft id when present, state, and the owner's next
action. Handle a batch one item at a time.

Score `checklists/email.md`. Any no keeps the item approved.
