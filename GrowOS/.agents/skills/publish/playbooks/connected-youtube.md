# Connected private video upload

> **Scope: this is the SAFE-STATE playbook** — it applies under `explicit-safe`
> (and as the safe path once an `unanswered` channel's owner answers safe). Its
> 'never' rules are absolute WITHIN that scope. Under `explicit-live`, the
> publisher standard's 'Going live' rules govern instead: same care, same one
> mutation and read-back, with the confirmed visibility or publishAt schedule in place of the safe state — and
> only after the in-session owner confirmation the standard requires.


Use only after the runtime proves private upload and read-back capability.

1. Record destination and exact attempt time while status remains approved.
2. Upload the exact approved media and metadata with:

   ```yaml
   privacyStatus: private
   notifySubscribers: false
   ```

   Never include unlisted, public, `publishAt`, or an automatic visibility change.
3. Record the returned id in `publish_ref` immediately.
4. Read back that returned id. Verify the title, description, tags, privacy, and
   processing status belong to the approved package.
5. If privacy is private and processing succeeded, set the receipt to `prepared`,
   add exact completion time, and make the separate approved to published move.

Processing that is not complete or has an unknown state remains
`needs-verification`. Keep the item approved and check the same id later. Failed
processing or wrong privacy is `blocked`. A timeout after upload is uncertain;
never upload a second copy before checking the destination.

