# Video Publisher quality checklist

Score every line that applies; any "no" blocks that item's outside action. The
first block always applies; then score the block for the mode the resolver
answered — a correct live publish must be able to pass its own checklist.

## Always

- [ ] The item was freshly read at `status: approved`.
- [ ] A real approved snapshot exists and the current video package matches it.
- [ ] Media path, title, description, tags, and thumbnail came from the approved package.
- [ ] Every file that shipped was verified and staged by `growos publish-stage`,
      and the upload read FROM the staged paths, never the original parts.
- [ ] No file without a sealed line left the machine.
- [ ] No metadata was invented or rewritten.
- [ ] A previous uncertain attempt was verified before upload.
- [ ] The returned id was recorded immediately.
- [ ] Read-back proved the exact metadata and completed processing, and every
      attempt recorded its `publish-event`.

## Under `explicit-safe` (and any manual handoff)

- [ ] Visibility was private with notifications off and no `publishAt`.
- [ ] Processing or unknown state stayed approved at `needs-verification`.
- [ ] Manual handoff stayed approved until private, processed confirmation.

## Under `explicit-live` only

- [ ] The owner confirmed THIS video, the channel, and the exact visibility or
      premiere time in this session, before the activating write.
- [ ] The upload itself landed private first; exactly ONE live-making mutation
      followed (the visibility or schedule change), read back as intended.
- [ ] The receipt records `publish_state: live` with the real reason code.
