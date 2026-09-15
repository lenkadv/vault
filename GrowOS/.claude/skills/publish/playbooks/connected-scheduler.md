# Connected scheduler playbook

> **Scope: this is the SAFE-STATE playbook** — it applies under `explicit-safe`
> (and as the safe path once an `unanswered` channel's owner answers safe). Its
> 'never' rules are absolute WITHIN that scope. Under `explicit-live`, the
> publisher standard's 'Going live' rules govern instead: same care, same one
> mutation and read-back, with the confirmed post or exact approved schedule in place of the safe state — and
> only after the in-session owner confirmation the standard requires.


Use this only after the runtime proves it has the required safe capability.

1. Re-read the approved body and any exact approved schedule.
2. Record destination and `publish_attempted_at` on the still-approved item.
3. For a draft-capable Buffer-style adapter, require `saveToDraft: true`. For an
   approved schedule, require `customScheduled` plus the exact `dueAt`. Never use
   `shareNow`, a post-now action, or a guessed time.
4. Create once. Record the returned id in `publish_ref` immediately.
5. Read back that id. Verify the reference, full content, destination state, and
   exact scheduled time and time zone when scheduling. The read back must match
   the approved item before `publish_state: prepared` is written.
6. If it matches, set a plain `publish_note`, add exact `published_at`, and make
   the separate approved to published move.

If creation definitely fails, set `blocked` with the reason and keep approved. If
it times out or may have worked, set `needs-verification` and keep approved. A
later run reads the destination first and never creates again automatically.

