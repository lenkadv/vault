# Publish — the video channel flow

> This is the video branch of the `publish` skill: the former `video-publish`
> flow, re-housed unchanged in wave 0. The router in `SKILL.md` sends an
> approved final video package item here. Playbook and checklist paths are
> relative to `.claude/skills/publish/`.

Prepare an approved video exactly as far as the owner chose for this channel:
a private, processed upload by default, public or scheduled visibility only
where the owner set exactly `live`. Read
`system/standards/publisher-standard.md` first; its resolver, live rules,
staging, and event recording all apply here.

Resolve the mode before anything outside (`growos publishing-mode --item
<path> --json`; never read setup.md yourself). `unanswered` means ask the
owner first. Under `explicit-live`, the standard's in-session confirmation
names the channel id and whether visibility goes public now or on a schedule;
read-back must confirm the exact visibility and processing state intended.

## 1. Check the sibling items are ready

A `channel: video` item is only ever one third of the real package. Phase 9
splits a video's title, description, tags, thumbnail, and final media across
three separate items - `video-edit`'s final cut (the media), `youtube-package`
(title, description, tags), and `youtube-thumbnail` (the thumbnail) - and this
skill still handles one item at a time.

Before treating any one of them as ready, find the other two by their shared
video-slug or `parent:` link. Each of the three must be `status: approved`,
with its own parts sealed - `video-edit`'s final media file, `youtube-package`'s
five parts, `youtube-thumbnail`'s rendered concepts. Any of the three still at
`draft`, `review`, or `changes`, or missing a sealed line, means the package is
not ready: stop, say plainly which item and which piece is missing, and never
upload with an older or partial piece filling the gap.

## 2. Check the package

Reconcile and re-read the item. Status must be `approved`; stop for every other
status. Compare it with the approved snapshot when present.

The approved snapshot is a hard door. If it is missing or does not exist, or
the current video package mismatch means it does not match the approved copy,
make no outside action and no receipt write. Keep the item approved and ask the
owner to reconfirm it by moving it back to review, which is the owner's move to
make; the AI cannot make that downgrade. The owner then accepts or makes the
change and approves the exact version again. On that fresh approval GrowOS
refreshes the approved snapshot: through the hook when the owner approves in
chat, or through reconcile when they approve in their editor. The next run then
sees a matching snapshot and can proceed. Never create proof from the current
package without that fresh approval.

The title, description, tags, thumbnail reference, and final media file must all
come from the approved package. Do not invent, rewrite, or repair metadata during
upload.

The final media file and any thumbnail that will be uploaded must each have a
sealed line in the approved item (`system/standards/item-model.md`, "Sealed
assets"). Before any outside attempt, stage the bytes in code:

```text
node system/tools/growos.js publish-stage --item <path> --json
```

It verifies the item against the approved snapshot, verifies every sealed
asset, and hands back read-only staged copies (it reports per file whether
read-only actually took) whose hashes are proven through
their own descriptors. **Upload FROM the staged paths, never from the parts
folder**, and run `--release` after the verified upload. If it refuses, make
no outside action, set `publish_state: blocked` with `publish_reason:
sealed-mismatch` (or `approval-mismatch`), and name the file and reason in
`publish_note`. A file with no sealed line is never uploaded, whatever it is
named. Never edit a sealed line to make a check pass; if the render
legitimately changed, the owner re-approves it.

Check the receipt first. An existing id or uncertain attempt must be verified,
not uploaded again.

## 3. Prove the capability the mode needs

Inspect the runtime connection. Under `explicit-safe` (and `unanswered`,
once the owner answers safe) it must support a private upload plus read-back
of privacy and processing — and then private is the ONLY state used: never
unlisted, never public, never `publishAt`, never a scheduled visibility
change. Under `explicit-live`, after the in-session confirmation, the same
connection may set the confirmed visibility (or `publishAt` schedule) — and
the read-back must prove exactly that visibility and processing state, not
merely that an upload exists. Unlisted is never used in either mode: it looks
private and is not.

- Proven private upload and read-back: `playbooks/connected-youtube.md`.
- Missing or incomplete capability: `playbooks/manual-video.md`.

Keep status approved while uploading and processing. Only a read-back that proves
the exact upload is private and processing succeeded may become prepared.

## 4. Report the handoff

Record every attempt with its reason-coded event (`growos publish-event
--item <path> --publisher publish --route ... --outcome ... --reason
<code>`). Report the headline, destination, video id when present, privacy, processing
state, receipt state, and next owner action. Keep every batch item separate.

Score `checklists/video.md`. Any no keeps the item approved.
