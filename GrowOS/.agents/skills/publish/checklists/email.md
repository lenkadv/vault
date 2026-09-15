# Email Publisher quality checklist

Score every line that applies; any "no" blocks that item's outside action. The
first block always applies; then score the block for the mode the resolver
answered — a correct live send must be able to pass its own checklist.

## Always

- [ ] The item was freshly read at `status: approved`.
- [ ] A real approved snapshot exists and the current message matches it.
- [ ] Subject, preview, and body match the approved package byte-for-byte.
- [ ] Audience, list, send time, and schedule were never guessed.
- [ ] A previous uncertain attempt was verified before any create.
- [ ] The returned id was recorded immediately.
- [ ] The receipt was complete before the published move, and every attempt
      recorded its `publish-event`.
- [ ] Any FILE that shipped (an attachment, an inline image) was staged first
      with `growos publish-stage` and uploaded FROM the staged path.

## Under `explicit-safe` (and any manual handoff)

- [ ] No send or schedule call was available to the chosen action.
- [ ] Read-back proved unsent, unscheduled, non-public draft state.
- [ ] Manual handoff stayed approved until owner confirmation.

## Under `explicit-live` only

- [ ] The owner confirmed THIS message, the exact list or audience, and
      now-versus-schedule (with the exact time and zone) in this session.
- [ ] Exactly ONE live-making mutation ran (the send or the schedule), and the
      read-back proved the intended sent or scheduled state.
- [ ] The receipt records `publish_state: live` with the real reason code.
