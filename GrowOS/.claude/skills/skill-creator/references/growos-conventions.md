# GrowOS conventions for a skill you build

Read this before you write a skill (SKILL.md step 5). It is the full detail behind
the overlay table. Each section gives the rule and the exact pattern to bake in.
Only bake in what the skill's output shape needs. When a rule and a business's own
`brain/voice.md` disagree on wording, the brain wins for that business.

The authoritative sources are the standards files. If anything here ever drifts
from them, the standards win: `system/standards/item-model.md`,
`system/standards/skill-standard.md`, `system/standards/publisher-standard.md`,
`system/standards/brain-contract.md`, and `.claude/agents/reviewer.md`.

---

## 1. The item model (drafting and package shapes)

A deliverable is one markdown file at `<business>/work/<channel>/<slug>.md`. The
skill sets exactly one field, `type`. The system stamps the rest by inserting any
missing lines, and it never rewrites a line that already exists.

Minimal frontmatter a drafting skill writes:

```yaml
---
type: social-post        # REQUIRED, only the skill knows this
headline: "one plain line describing the item"
skill: <name-of-your-skill>
status: draft            # born draft; move to review as a second, separate save
---
```

Do not write `id`, `business`, `channel`, or `created`. The system stamps them and
freezes them. Hand-editing them is denied by the guard.

Legal status moves, one step per save:

```
draft -> review
review -> changes | approved | rejected
changes -> draft | review
approved -> published
```

Everything else is denied: no `draft -> approved`, no `review -> published`, no
reviving a `rejected` or `published` item. A new item may be born only `draft` or
`review`. The skill may apply `review -> approved` or `review -> rejected` only when
the owner says so in chat; it is logged as their decision.

The `note` field is the owner's. Read it, never write it. The one documented
exception is the `review-queue` skill, which may copy the owner's exact change wording
into `note` on their direct instruction. If you build a review-shaped skill, that
exception is in `publisher-standard.md`; no other skill writes `note`.

Package shape: a folder under a channel, one item file each, a shared `_brief.md`
(underscore-prefixed, no status, never in the queue), and the same `project` value
on every item so the queue groups them.

---

## 2. The owner's publish choice, and the two-step publish (publish shape)

A drafting skill stops at `review`. It never sends, posts, or publishes.

Only a publish-shaped skill moves `approved -> published`, and only for an item
whose current status is already `approved`. It must:

1. Read `.snapshots/<id>.approved.md` and confirm the current body matches what the
   owner approved. If the snapshot is missing or the body changed, make no outside
   write and ask the owner to re-approve.
2. Ask how far it may go — `growos publishing-mode --item <path> --json`, never
   by reading setup.md itself. `unanswered` means ask the owner before any
   outside write. `explicit-safe` means the safest outside state: email as a
   draft with no send time, ads paused at every level, video private, social as
   a draft — never a post-now action, never a schedule. `explicit-live` means
   the publisher standard's "Going live" rules apply in full (in-session owner
   confirmation, one mutation, provider-specific read-back). Files that ship are
   staged first with `growos publish-stage`.
3. Fill the shipping receipt, record the attempt with `growos publish-event`,
   then make the `approved -> published` move as its own separate save.

Receipt fields (all optional on the item, required together for the published move):

```yaml
publish_destination: ""   # the service, or "manual"
publish_ref: ""           # the outside draft or platform id (required unless manual)
publish_attempted_at: ""  # exact UTC, e.g. 2026-07-20T09:00:00.000Z
publish_state: ""         # waiting-owner | blocked | needs-verification | prepared | live
publish_reason: ""        # one code from the publisher standard's fixed list
publish_note: ""          # plain outcome, never a secret
published_at: ""          # exact UTC when the outcome state was verified
```

Two states may accompany a new `approved -> published` move: `prepared` (the
verified safe state), or `live` — and `live` passes the guard only when the
resolver answers `explicit-live` for that channel at that moment, the route is
not manual, and `publish_ref` is real. Support can never be live. A non-manual
destination always needs `publish_ref`. Never put a password, key, or customer
detail in a receipt. Full sequence: `publisher-standard.md`.

---

## 3. The reviewer gate (any skill that writes owner-facing copy)

Every draft whose words the owner will ship passes the `reviewer` agent before it
moves to `review`. The reviewer reports; it never edits and never returns a
rewrite. The drafting skill holds the voice context and applies the fixes itself.

Bake this loop into the skill:

1. Finish the draft at `status: draft`.
2. Invoke the `reviewer` agent with the item path, the business folder path, and
   the comparison source it needs to check meaning (the source brief for a new
   draft, or the before-text / frozen snapshot for an edit). If there is no
   comparison source, say so; the reviewer will return `fix`.
3. Act on the verdict:
   - `clean` -> move to `review`. Do not keep polishing.
   - `pass-with-notes` -> apply the quick mechanical fixes, use judgment on the
     rest, then move to `review`.
   - `fix` -> apply the findings (exact replacements for mechanical tells, your own
     voice for judgment findings), then invoke the reviewer again.
4. At most two loops. If it is still `fix` after the second pass, move to `review`
   anyway and tell the owner honestly what is still flagged. Never loop forever,
   never pass a flagged item off as clean.

This is the "apply the findings yourself" pattern, not the "paste the reviewer's
rewrite" pattern. One reviewer rewriting every skill's output would make the whole
product sound the same; that sameness is the exact failure the gate exists to kill.

If the runtime cannot run a separate agent, do not skip the gate silently: run the
same checks in-session as a clearly labeled fresh pass and say so in the summary.

---

## 4. The three drawers (where things live)

- **Craft** the skill always uses lives in the skill folder
  (`.claude/skills/<name>/`): its steps, its `references/`, its checklists.
- **Catalogs** that grow over time split in two. `system/creative-library/` is shipped
  by us and replaced by updates: generic craft, the same for everybody. Anything a
  business LEARNS goes in `<business>/library/`, which updates never touch. A skill
  that accumulates examples, swipe files, or templates writes them to THAT business's
  library, not into its own folder and never anywhere shared — a pattern proven on one
  client's work must never turn up in another client's drafts.
- **Business facts** are read from `<business>/brain/` every run, never hardcoded.
  A skill that needs the offer, price, audience, voice, or proof reads
  `brain/business.md`, `brain/audience.md`, `brain/voice.md`, `brain/proof/`, and
  the rest of the brain. The guaranteed brain files are in
  `system/standards/brain-contract.md`. Proof and quotes come only from
  `brain/proof/`, used as written. Never invent a fact; leave
  `[PLACEHOLDER: what is missing]` instead.

A skill that hardcodes a price or a claim is wrong the moment the business changes
it. Read the brain.

---

## 5. Graceful degradation

When a tool, key, or connection is missing, the skill must:

1. Say so in one plain line, so the owner knows what did not run and why.
2. Fall back to the safest manual path: hand the owner copy to paste, save a local
   draft, or leave a labeled `[PLACEHOLDER]`.
3. Note it in the run summary so nothing looks done that is not.

A missing connection is a normal, honest state. Pretending it worked is the one
unacceptable response. Bake a "when something is missing or breaks" section into
every skill you write.

---

## 6. Codex, lint, and naming

The same SKILL.md is read by Claude and by Codex, which parses YAML strictly. The
mirror step (`node system/tools/growos.js mirror`) enforces these and fails loudly:

- **Single-quote the `description`.** It contains a colon (in "Triggers:"), and an
  unquoted colon breaks strict YAML. Single quotes also let you use double quotes
  around trigger phrases inside.
- **No BOM.** Save plain UTF-8.
- **LF line endings**, not CRLF.
- **Folder name equals skill name**, and both follow the house pattern:
  **thing-first kebab names** — the thing being made or worked on, then the
  action (`email-write`, `ad-draft`, `lead-research`, `brain-capture`), never a
  gerund (`writing-emails`) and never role-first (`copywriter-emails`). This is
  deliberate; it overrides the gerund habit from other skill systems. When
  several skills form one family, share an area prefix so they sort together
  (`ads-meta-create`, `ads-meta-publish`, `ads-meta-report`).
- **No symlinks.** The Codex copy in `.agents/skills/<name>/` is a real generated
  copy that the mirror keeps in sync. Never create it by hand or link it.

The `description` should lead with what the skill does, then end with plain trigger
words the owner would actually type. Example shape:

```yaml
description: 'One plain sentence on what it produces and why. Triggers: "phrase one", "phrase two".'
```

---

## 7. Changelog and backup

- Create `.claude/skills/<name>/CHANGELOG.md` when the skill is born. Newest entry
  on top. One entry per real change (a step added or removed, a scope change, a
  bug fix, a revert). Skip typos and formatting. Use plain ASCII, no em-dashes.
- Before editing an existing skill's `SKILL.md`, copy the current file to
  `.backups/skills/<name>/SKILL.backup-YYYY-MM-DD.md`. If today already has one,
  add `-2`, `-3`. The chassis already uses `.backups/` for update safety; reuse it,
  because a customer may not use git. Then edit, then add a changelog entry.

Entry shape:

```markdown
## YYYY-MM-DD - short imperative title

**Change type:** add | remove | refactor | fix | revert
**Why:** one or two plain sentences.
**Changes:**
- what changed, conceptually (not line numbers)
```

---

## 8. Bookmark and resume

The real bookmark helper is `writeBookmark(root, business, {doing, item, next, by})`
in `system/tools/lib/logbook.js`. Do not invent a different one. The system already
calls it automatically on every work-item save (through the item hook), so any
drafting or publish skill you build is resumable for free: the bookmark records
what was being made and what comes next.

A long-running skill that wants a richer bookmark writes through that same helper.
A skill (like this one) that does not produce a work item is resumed differently:
its partial output on disk is its own resume point. Say plainly where it stopped so
the next session can pick it up. Never claim a resume mechanism a skill does not
have.

---

## 9. The guard, in one paragraph

The write guard (`system/guards/item-hook.js`) blocks the AI's edit tools from
GrowOS's machine files, and it enforces the item model on every work-item save
(legal status only, frozen identity fields, born draft or review). You do not
fight the guard; you write skills that move along its legal edges. The one place it
steps aside for you is custom skills: it allows creating and editing files under
`.claude/skills/<name>/` when `<name>` is not a shipped GrowOS skill, because those
are the customer's own content. Author every custom skill under `.claude/skills/`
only; the matching `.agents/skills/` copy is generated by `mirror` and stays
machine-protected, so never write there by hand. Shipped skills stay protected. See
the "Custom skills and updates" section of the SKILL.md.
