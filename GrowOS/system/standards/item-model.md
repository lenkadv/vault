# The item model

This is the contract for every piece of work GrowOS makes. Every deliverable in a
business's `work/` folder is one markdown file with a small label (its frontmatter)
at the top. This document is the source of truth for that label: the fields, the
statuses, and the moves that are allowed. Skills follow it exactly; a guard enforces
the parts that must never fail.

This is the precise version, written for skills and the system. When an owner
asks how any of it works, explain it to them in plain words rather than sending
them here.

## Core fields

Every work item carries these fields. Most are stamped by the system; the skill
sets `type`.

```yaml
id: k3x9q2m7wd     # 10-char lowercase id, stamped once, never edited, file never renamed to match it
status: draft      # draft | review | changes | approved | published | rejected
type: social-post  # REQUIRED, set by the skill (the system cannot guess it)
business: acme     # stamped from the top-level business folder name
channel: social    # stamped from the folder under work/
created: 2026-07-12 # stamped, YYYY-MM-DD
headline: ""       # one plain-text line, used by the queue views
skill: ""          # which skill made it
note: ""           # the owner's comment; review may copy their exact direct feedback
```

The system stamps `id`, `status`, `business`, `channel`, and `created` by inserting
those lines if they are missing. It never rewrites lines that already exist, so any
extra fields, comments, or formatting the owner added survive untouched. The one
field a skill must always set itself is `type`; an item with no `type` is flagged
back to the skill to fix.

## Optional fields (by convention, never stamped)

```yaml
stage: to-record   # a plain label for a per-type step; never enforced, never automated
parent: k3x9q2m7wd # another item's id; links a piece to the work that spawned it
project: launch-r1 # groups a round or package together for the queue
publish_destination: "" # manual or the outside service used
publish_ref: ""         # outside draft/platform id; required unless manual
publish_attempted_at: "" # exact UTC time the attempt began
publish_state: ""       # waiting-owner | blocked | needs-verification | prepared | live
publish_note: ""        # plain outcome or blocker; never secrets
publish_reason: ""      # one outcome code from the publisher standard's fixed list
published_at: ""        # exact UTC time the outcome was verified
```

`stage` is a human label and a filter only. No rule or automation ever hangs off it,
so it never turns into a hidden workflow engine.

The seven `publish_...` fields form the shipping receipt. Publishing skills may
add or update them while an item remains approved — recording what really
happened is always legal. A new move to `published` requires
`publish_destination`, valid exact UTC values for `publish_attempted_at` and
`published_at`, and `publish_state: prepared` or `live`. A non-manual
destination also requires `publish_ref`. `publish_state` values mean:

- `waiting-owner`: a manual handoff is waiting for the owner's confirmation.
- `blocked`: a known problem prevented a safe handoff.
- `needs-verification`: an outside attempt may have worked and must be checked;
  never retry it automatically.
- `prepared`: the safe outside state was verified, or the owner confirmed the
  manual handoff.
- `live`: the work went out for real (or onto a verified schedule) on a channel
  the owner set to exactly `live`, and the read-back confirmed it. A live
  receipt is never manual and always carries `publish_ref`. The guard accepts
  the `approved -> published` move with a live receipt only while the
  publishing resolver answers `explicit-live` for the item's channel at that
  moment — a live claim against a safe or unanswered setting keeps the item
  approved and is a red Doctor finding, so it gets eyes instead of a quiet
  pass. `published_at` stays "when the outcome was verified"; a scheduled
  publish's air time lives in `publish_note`.

`publish_note` holds only a plain operational outcome. It never holds credentials,
secrets, or the owner's creative feedback. `publish_reason` is one code from the
publisher standard's fixed list — machine-bucketable, never prose.

## Statuses and who sets them

| status | meaning | who sets it |
|---|---|---|
| draft | being made, not ready for the owner | skill |
| review | waiting for the owner | skill |
| changes | owner asked for a fix (see `note`) | owner (in editor, or by telling the AI) |
| approved | owner said yes | owner (in editor, or by telling the AI) |
| published | shipped or handed off | publish step |
| rejected | killed | owner |

## Legal transitions

A skill (on any runtime) may move an item only along these edges:

```
draft   -> review
review  -> changes
changes -> draft
changes -> review
review  -> approved
review  -> rejected
approved -> published
```

Everything else is denied by the guard: any move out of `published` or `rejected`,
any downgrade from `approved` back to `draft` or `review`, and any skip such as
`draft -> approved` or `review -> published`. A new item must be born `draft` (or
`review`); a skill can never create one already `approved` or `published`.

`review -> approved` and `review -> rejected` are legal for the AI because the owner
often says it in chat and the AI applies it on their behalf. When it does, the event
is logged as done on the owner's instruction, so the record stays honest. The owner
editing files directly is never constrained; the system detects and logs those
changes as the owner's.

## The two-step publish

Publishing is always two separate moves, never one jump. First the owner approves
(`review -> approved`). Then, and only then, a publish step ships the work and marks
it `approved -> published` with a complete shipping receipt. A skill must never try to go straight from `review` to
`published`; the guard denies it. This is what guarantees an owner's yes always sits
between "made" and "shipped."

When the owner approves, the system also keeps a copy of exactly what they said yes
to. If the owner later moves the item back to review, changes it, and approves
again, that copy refreshes to the new version. A publish step always compares
against the version the owner most recently approved, so a fixed item can move
forward instead of getting stuck on an older copy.

## The record (kept for you, automatically)

You do not manage history by hand. As items are created and moved, the system keeps
a per-business record: it freezes a copy of each item the first time it reaches
`review` (so the original is never lost), it writes an append-only log of what
happened, and it keeps a small bookmark of what was in progress so a session can be
resumed. Skills do not have to do any of this; it happens around them. Skills may
leave a richer bookmark for long tasks through the system's helper.

## Packages

A round or package is a folder under a channel. Each deliverable inside it is its own
item file with its own status. A file whose name starts with an underscore, such as
`_brief.md`, holds shared context: it has no status and never enters the review
queue. Every item in the package shares the same `project` value so the queue can
group them.

## Parts folders

When a deliverable has parts — drafts, metadata, a voiceover script, rendered
files — they live in an underscore-prefixed folder beside it: `promo.md` keeps its
parts in `_promo/`. The underscore rule is one rule: any file or folder under
`work/` whose own name, or any parent folder's name, starts with `_` is NOT a work
item. Nothing in a parts folder has a status, appears in the queue, or is stamped.
The deliverable itself — the one markdown file — is what gets reviewed and
approved; anything in the parts folder that will actually ship is sealed into it
(see "Sealed assets" below).

## Sealed assets

A part is not automatically scratch: a video's final render, a thumbnail, an ad
image — these leave the machine. Any file that will actually be published is
SEALED into the deliverable's frontmatter, one line per asset:

```yaml
sealed:
  - _promo/final.mp4 sha256:9f2c4a…
  - _promo/thumb.jpg sha256:41d0be…
```

The path is written the POSIX way, relative to the deliverable's own folder, and
may only name a file inside a parts folder in the same business. The hash is the
SHA-256 of the exact bytes. The skill that finishes the asset writes the line
BEFORE the item goes to review, so the owner's approval covers the seal — the
approved snapshot freezes it with everything else.

Three rules follow, and none of them bends:

- **A publish step re-hashes every sealed asset against the APPROVED copy of
  this file before anything is uploaded.** A mismatch means the file changed
  after approval: stop, report, ship nothing from that deliverable.
- **A parts file with no sealed line is never published.** It is working
  material, whatever it looks like.
- **Nobody edits a sealed line to make a check pass.** If the asset legitimately
  changed, the deliverable goes back through review so the owner approves the
  new bytes.

The Doctor watches the seal: on an approved or published item, the seal of
record is the APPROVED SNAPSHOT's sealed list — a sealed asset that is missing
or no longer matches it is a red finding, and so is a live sealed list that
differs from the approved one.

The publish-time recheck is enforced IN CODE: `growos publish-stage` verifies
the item against its approved snapshot, verifies every sealed asset, and
copies each one into a staging folder — hashed through a held descriptor while
copying, re-hashed through the staged copy's own descriptor, then made
read-only (and reported per file). The upload reads FROM the staged copy, so the bytes that
ship are the bytes that were verified, not whatever the original path holds at
upload time.

Two limits, stated rather than implied away:

- The staged copy is ordinary (read-only) disk. Between its verification and
  the connector's read of it, a root-capable process — or the owner's own
  tools — could still rewrite it; nothing in userland closes that. What the
  staging closes is the gap that mattered: a re-render, an edit, or a sync
  client changing the ORIGINAL part between hashing and upload no longer
  changes what ships.
- A deliverable mistakenly SAVED into a parts folder without a label is
  invisible to the queue and to the Doctor — an unlabelled draft there is
  indistinguishable from a part, which is the convention working as designed.
  The Doctor names a STAMPED item found in parts space; an unlabelled one it
  cannot. Skills put deliverables in channel folders, never in parts folders.
