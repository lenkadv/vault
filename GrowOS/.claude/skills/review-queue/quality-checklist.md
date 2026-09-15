# Review quality checklist

Score each line yes or no. One no means the review run is not complete.

## Queue

- [ ] Reconcile ran before the queue was read.
- [ ] Every item at `status: review` was included in the initial metadata list.
- [ ] No body was read across businesses before the owner selected an item.
- [ ] An ambiguous instruction produced a candidate list and no file change.

## Decision

- [ ] The selected full body was shown before a decision was requested.
- [ ] The owner was offered approve, changes, reject, and skip.
- [ ] Every write started from a freshly read item still at `status: review`.
- [ ] The status followed one legal edge and matched the owner's clear choice.
- [ ] Body unchanged; note exact; one prepare question.
- [ ] Change feedback was copied word for word and byte-for-byte only after a direct instruction.
- [ ] Approve, reject, and skip did not alter `note`.

## Learning

- [ ] At most one learning question per decision, phrased in one line.
- [ ] A "no" was recorded with `learning decline` (permanent), never just remembered.
- [ ] Nothing outside writing taste was proposed as a lesson — a request that
      touches publishing, budgets, approvals, accounts, facts, or tool
      behaviour was routed to `decisions.md` or the owner's `setup.md` flow.
- [ ] Any automatic write (third observation) was reported in one sentence,
      with its undo command.
- [ ] A logbook warning from `learning candidates` was told to the owner, not
      swallowed.

## Handoff

- [ ] `approved_this_session` contains only items approved in this conversation.
- [ ] “Want me to prepare everything you just approved?” was asked no more than once.
- [ ] Older approved items were not added to the batch.
- [ ] Review made no outside publish action and did not mark an item published.

