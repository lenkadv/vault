# Content Publisher quality checklist

Score every line that applies; any "no" blocks that item's outside action. The
first block always applies; then score the block for the mode the resolver
answered — a correct live action must be able to pass its own checklist.

## Always

- [ ] The item was freshly read at `status: approved`.
- [ ] A real approved snapshot exists and the current package matches it.
- [ ] Current content matched the owner-approved version.
- [ ] No copy or body was edited.
- [ ] Destination, account, and schedule were proven, not guessed.
- [ ] An earlier uncertain attempt was verified, not recreated.
- [ ] Threads or unsupported media used an honest manual fallback.
- [ ] Every item received its own receipt and outcome, and every attempt
      recorded its `publish-event`.
- [ ] Any FILE that shipped (an image, a video) was staged first with
      `growos publish-stage` and uploaded FROM the staged path, never the
      original part path.

## Under `explicit-safe` (and any manual handoff)

- [ ] No immediate-post or `shareNow` mode was used.
- [ ] Connected preparation was read back for id, content, state, and time.
- [ ] Manual handoff stayed approved and waiting until owner confirmation.

## Under `explicit-live` only

- [ ] The owner confirmed THIS item, the account, the exact destination, and
      now-versus-schedule (with the exact time and zone) in this session.
- [ ] Exactly ONE live-making mutation ran, and the read-back proved the
      intended public or scheduled state.
- [ ] The receipt records `publish_state: live` with the real reason code.
