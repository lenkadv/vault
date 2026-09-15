# Receipt contract (standalone mirror)

Inside a GrowOS install, `system/standards/publisher-standard.md` and
`system/standards/item-model.md` are the source of truth for everything below.
This file only mirrors what `ads-meta-publish` needs from them, compactly, for
the standalone pack, where `system/standards/` does not exist. SKILL.md reads
the real standards in GrowOS mode and reads this file instead in standalone
mode. Most of what follows holds either way, but two rules genuinely fork by
mode rather than just changing where they are written down: how approval gets
proven (standalone has no `.snapshots/` folder at all), and whether an attempt
gets logged (standalone has no `system/tools/growos.js` to call). Each section
below says so plainly at the point where it forks, instead of glossing over
it.

## The shipping receipt

Every publish attempt fills in these seven fields on the work item itself,
verbatim field names, from `system/standards/item-model.md`:

```yaml
publish_destination: "" # manual or the outside service used
publish_ref: ""         # outside draft/platform id; required unless manual
publish_attempted_at: "" # exact UTC time the attempt began
publish_state: ""       # waiting-owner | blocked | needs-verification | prepared | live
publish_note: ""        # plain outcome or blocker; never secrets
publish_reason: ""      # one outcome code from the publisher standard's fixed list
published_at: ""        # exact UTC time the outcome was verified
```

Use exact UTC timestamps such as `2026-07-15T09:00:00.000Z`, never a bare
date. `publish_note` never holds a secret, a key, or the owner's creative
feedback, only a plain operational outcome.

**`publish_state` values** (from the standard): `waiting-owner` (a manual
handoff is waiting for the owner's confirmation), `blocked` (a known problem
prevented a safe handoff), `needs-verification` (an outside attempt may have
worked and must be checked, never retried automatically), `prepared` (the
safe outside state was verified), `live` (went out for real under an
explicit `live` setting, read-back confirmed, always carries `publish_ref`).
This skill only ever writes `prepared`, `blocked`, or `needs-verification`:
it never writes `waiting-owner` (nothing here is a manual paste) and never
writes `live` (every object this skill creates lands PAUSED, always, whatever
the channel's setting allows).

**`publish_reason` codes** are a fixed, closed list, the same one
`growos publish-event` accepts: `verified`, `owner-chose-manual`,
`mode-unanswered`, `mode-safe`, `connector-missing`, `connector-unproven`,
`account-mismatch`, `destination-missing`, `schedule-missing`,
`unsupported-media`, `sealed-mismatch`, `approval-mismatch`,
`compliance-missing`, `provider-error`, `readback-failed`,
`readback-timeout`, `id-lost`. A code outside this list is refused, not
recorded, so it never rots into free-text prose nobody can bucket. In
practice this skill writes `verified`, `account-mismatch`,
`destination-missing`, `compliance-missing`, `sealed-mismatch`,
`provider-error`, `readback-timeout`, or `id-lost`.

## Record every attempt (publish-event)

**Inside GrowOS**, every attempt, prepared, blocked, or uncertain, records ONE
reason-coded event, whatever happened:

```text
node system/tools/growos.js publish-event --item <path> \
  --publisher ads-meta-publish --route api \
  --outcome <prepared|blocked|needs-verification> \
  --reason <code> [--destination <id>] [--ref <id>]
```

Inside GrowOS, the Doctor reads these events to tell a broken connector from
an honestly blocked ad, without ever polling Meta itself. A receipt with no
recorded attempt is itself a finding there: silence must be provable, not
assumed.

**Standalone has no `system/tools/growos.js` to call**, so this step is
skipped, not attempted: say so in one plain sentence in the report rather
than pretending the call ran. The seven receipt fields already written into
the item's own frontmatter (above) are the whole standalone record; there is
no separate log file to invent instead.

## Approved-only, and provable

A publish step may act only when the item's status is `approved`. How that
approval gets proven differs by mode, and this is the real fork in this file.

**Inside GrowOS**, approval must be provable, not assumed. Before any outside
action or receipt write, read `.snapshots/<id>.approved.md` and compare the
current body and creative reference against it. If the approved snapshot is
missing, or the current item does not match it, make no outside action and no
receipt write: keep the item `approved` and ask the owner to move it back to
review, which is the owner's move to make, not this skill's. On a fresh
approval GrowOS refreshes the approved snapshot automatically (through the
hook when the owner approves in chat, or through reconcile when they approve
in their editor), and the next run then sees a matching snapshot and can
proceed. Never manufacture a missing approved snapshot from the current body:
that would turn an unproven version into false proof.

**Standalone has no `.snapshots/` folder at all**, so there is no frozen copy
to compare against and no mismatch check to run. The proof here is narrower,
stated plainly rather than glossed over: the item's own `status: approved` in
its frontmatter is the approval signal, and the sealed-bytes re-hash below
proves only that the file on disk still matches the label written in the
item right now, enough to catch an accidental re-render, a stray edit, or a
sync client touching the file after approval. It cannot prove the label
itself was never changed, because standalone keeps no frozen copy of the
approved item; that guarantee needs a GrowOS install. Nor does it
independently prove the copy or body text was not hand-edited after
approval, for the same reason.

## Sealed assets, the bytes are part of the approval

Any file that leaves the machine, an ad image or video, must carry a sealed
line in the item's own frontmatter, written before the item went to review:

```yaml
sealed:
  - _<ad-code>/<ad-code>.png sha256:<64-character hash>
```

The path is POSIX style, relative to the item's own folder, naming a file
inside its `_<ad-code>/` parts folder. The hash is the SHA-256 of the exact
bytes. Before any of it is trusted, the path itself is checked for its
shape: relative, no `..` segment anywhere in it, resolving inside that ad's
own `_<ad-code>/` folder, and a plain file, not a symlink. A path that fails
any part of that is refused before it is ever read. Three more rules, none
of them bends:

- A publish step re-hashes every sealed asset before anything is uploaded,
  inside GrowOS against the approved snapshot, standalone against the label
  written in the item right now (see "Approved-only, and provable" above for
  what that second check does and does not prove). A mismatch means the
  file does not match its own label: stop, report, ship nothing from that
  ad.
- A file with no sealed line is never published, whatever it is named or
  how finished it looks. Working material stays working material until it
  is sealed. The same holds format-wide: a carousel needs one sealed line
  per card, and a partial list is treated as no seal at all.
- Nobody edits a sealed line to make a check pass. If the creative
  legitimately changed, the ad goes back through review so the owner
  approves the new bytes.

Inside GrowOS, the recheck is enforced in code: `growos publish-stage`
verifies the item against its approved snapshot, verifies every sealed
asset's place and bytes, and copies each one into a read-only staging
folder; the upload reads FROM that staged copy, never from the original
parts-folder path, so the bytes that ship are the bytes that were verified.

Standalone has no such command to call, so this skill closes the same gap
by hand, in the same order: stage first, verify the staged copy, upload
only from that copy. Hashing a path once and then uploading from that same
path again leaves a window for the file to change in between; copying it
first and checking the copy closes that window. For every file the item's
`sealed:` label names: copy it into a staging folder inside the round,
`<round folder>/.staging/<item-id>/`, under its own file name, then
recompute the hash of that staged copy, not the original, with
`shasum -a 256 <file>`, and compare it, character for character, against
that file's `sealed:` line. Any mismatch, or any path-shape violation
caught above, refuses the ad the same way a failed `publish-stage` call
would, with a plain sentence telling the owner to re-run `ads-meta-create`
on that ad so it reseals the current bytes. Every file validated, staged,
and matching: the upload reads from the staged copy only, and the round's
whole `.staging/` folder is removed once every ad in the round has been
attempted.

An item whose format requires more than one file (a `creative:` file, or,
for a carousel, one file per card) but whose `sealed:` list does not carry
a matching line for every one of them is an old-shape round from before
this pack sealed ad creative, or a card added without a reseal: refuse it
too, and point at `ads-meta-create` to reseal it, rather than treating a
missing or partial seal list as nothing to check.

## Read the outside object back before calling it done

Creating something is not proof it exists the way the outside service says
it does. Read it back and confirm the state actually matches what was
intended (here: it exists, it is PAUSED, it was not silently dropped) before
writing `publish_state: prepared`. If the read-back contradicts it or fails
outright, the attempt is `blocked`, not `prepared`. If the read-back times
out, or the write call itself may have committed with no id returned, the
attempt is `needs-verification`, never retried automatically: the next run
checks the outside service first before ever creating a second copy.
