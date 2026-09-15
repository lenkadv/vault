# Connected email draft

> **Scope: this is the SAFE-STATE playbook** — it applies under `explicit-safe`
> (and as the safe path once an `unanswered` channel's owner answers safe). Its
> 'never' rules are absolute WITHIN that scope. Under `explicit-live`, the
> publisher standard's 'Going live' rules govern instead: same care, same one
> mutation and read-back, with the confirmed real send or schedule in place of the safe state — and
> only after the in-session owner confirmation the standard requires.


Use only a connection that proves it can create and read an unsent draft.

1. Record destination and exact attempt time while status remains approved.
2. Send only the approved subject, preview, and body to the draft creation call.
   Include an audience only when the approved package or owner supplies it.
3. For a Kit-style adapter, require these safe values:

   ```yaml
   send_at: null
   public: false
   ```

4. Create once and immediately record the returned id in `publish_ref`.
5. Read back that exact id. Verify the subject, preview, body, audience when set,
   and that it is unsent, unscheduled, and non-public or private. Only after that
   read back may the receipt become `prepared`.
6. Record the exact completion time and make the separate approved to published
   move.

If creation definitely failed, use `blocked`. If it may have worked, use
`needs-verification` and never create again until the destination is checked.
Any send time, sent state, or public state is a blocker.

