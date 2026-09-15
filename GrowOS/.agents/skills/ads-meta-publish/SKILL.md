---
name: ads-meta-publish
description: 'Publish approved Meta ad items to Meta as PAUSED campaigns, ad sets, and ads through the Meta Ads MCP: per-ad idempotency, a compliance backstop that blocks anything not freshly checked, and a clear report of exactly what got created. Never activates anything, everything lands paused for review in Ads Manager. Use for "publish these ads", "publish fb ads", "ship the ad round to meta", "put these in meta paused", "push the approved ads live" (still lands paused), "publish the ad round".'
user-invocable: true
---

# Publish Meta ads (PAUSED)

Takes ads that already have a human "yes" (`status: approved`) and creates them in Meta,
one at a time, through the Meta Ads MCP only. Every campaign, ad set, and ad this skill
touches is created PAUSED. It never flips anything to ACTIVE, not even when asked to
"push live": that phrase still means "get it into the account, ready," and the person
reviews and activates in Ads Manager themselves. The full mechanics (media hosting, the
`object_story_spec` shapes, field-name landmines) live in
`references/meta-api-cookbook.md`; this file is the decision flow.

Read `system/standards/publisher-standard.md` before starting (GrowOS mode): the same shipping
receipt, `publish_reason` codes, and `publish-event` recording it defines for every other
publishing skill apply here too; the compliance backstop and the paused-only ceiling below sit
on top of that contract, they don't replace it. The item fields those rules fill in are
`system/standards/item-model.md`, "The seven publish_ fields." Standalone, with no
`system/standards/` folder to read: `references/receipt-contract.md` carries the same rules,
compactly, so this file still works with no GrowOS install underneath it.

Work in one business folder only. If more than one business folder exists and it is not obvious
which one, ask before touching anything. `../ads-meta-create/references/operating-model.md`'s
"Workspace resolution" section is the shared source for how that detection and the standalone
fallback actually work; this skill follows the same rules rather than repeating them here. Handed
an explicit item path already, one ad's own file path that itself contains the business folder,
infer the business folder from that path instead of asking again. A bare round slug carries no
business of its own: resolve the one business first, the same way as with no path at all, then
find that round inside it; if the slug resolves under more than one business folder, ask which
one.

GrowOS mode, before anything else: run `node system/tools/growos.js reconcile`, the same way
`publish` does, catching up on anything the owner changed directly in their editor before this
skill reads the queue. Then, once the round is found below, resolve how far the ads channel may
go, once for the whole round since every ad in it shares the same business and the same `ads`
channel: `node system/tools/growos.js publishing-mode --item <path to any one approved item in
the round> --json`; never read setup.md yourself. `unanswered` means nobody has set "How far to
go" for ads yet: stop before touching Meta and ask the owner (their answer may update setup.md,
then resolve again). `explicit-safe` or `explicit-live` both proceed to the flow below unchanged,
since this skill's own ceiling is fixed at PAUSED regardless of the answer (see "What this skill
never does"). Standalone mode: skip both calls, there is no GrowOS install here to reconcile or
resolve against; say so once, in the final report. The same split applies to every
`growos publish-event` call later in this flow: GrowOS mode runs it for real, standalone mode
skips it and says so, since the receipt fields already written into the item are the standalone
record on their own.

## Before anything else (preconditions)

These five are listed in reference order, not execution order: finding the round (3) always comes
before the per-ad checks that follow it, a missing or blank config (1) blocks only the Meta-facing
steps that actually read its fields, picking or creating the campaign/ad set and publishing each
ready ad below, never reconcile, publishing-mode resolution, or the round lookup itself, and
account identity (5) runs right after the round is found (3): a wrong account blocks the whole
round in one pass, before section 1 sorts anything into lanes, instead of surfacing ad by ad.

1. **Config.** Find `brain/ads/config.md` (an existing brain workspace) or
   `./ads-brain/config.md` (standalone; the shared "Workspace resolution" section above spells
   out the full detection rule) and read `ad_account_id`, `page_id`,
   `pixel_or_dataset_id`, `currency`, `landing_page_url`, `business_language`. Missing the file
   entirely, or present with these fields blank, means nothing has been set up yet, don't guess these values, stop and say so. An
   Instagram placement id isn't part of the config schema; look it up live (`ads_get_ig_accounts`)
   when needed, and ship Facebook-only if none is connected.
2. **MCP connectivity.** Call a cheap read (`ads_get_ad_accounts`) before touching anything
   that writes. A failure here means auth or connection trouble, not a publishing problem, and
   the answer is "reconnect the Meta Ads MCP," not a workaround.
3. **The round.** Find the ad items: `work/ads/<round-slug>/` if a `work/` tree exists, else
   `ads/rounds/<round-slug>/` (same shared fallback rule as Config, above).
   Filter to `status: approved`. None found, stop and say so.
4. **The approved snapshot, per ad, before anything else touches it.**
   - **GrowOS mode:** Read `.snapshots/<id>.approved.md` and compare the current body and creative
     reference against it. The approved snapshot is a hard door, not an optional comparison. If it
     is missing or does not exist, or the current copy or creative reference mismatch or do not
     match it, make no outside action and no receipt write for that ad. Keep it `approved` and ask
     the owner to reconfirm it by moving it back to review, which is the owner's move to make; the
     skill cannot make that downgrade. The owner then accepts or makes the change and approves the
     exact version again. On that fresh approval GrowOS refreshes the approved snapshot, through
     the hook when the owner approves in chat or through reconcile when they approve in their
     editor, and the next run then sees a matching snapshot and can proceed. Never create proof
     from the current body without that fresh approval. A snapshot mismatch on one ad never blocks
     the rest of the round.
   - **Standalone mode:** there is no `.snapshots/` folder to read at all (the shared "Workspace
     resolution" section names it absent outside a GrowOS install), so there is no frozen copy to
     compare against and no mismatch to catch here. The proof is narrower, said plainly rather than
     glossed over: the item's own `status: approved` in its frontmatter is the approval signal, and
     step 2 below's sealed-bytes re-hash proves only that the file on disk still matches the
     `sealed:` label written in the item right now, which catches an accidental re-render, a stray
     edit, or a sync client touching the file after approval. It cannot prove the label itself was
     never changed, because standalone keeps no frozen copy of the approved item; that guarantee
     needs a GrowOS install. Nor does it independently prove the copy or body text was not
     hand-edited after approval, for the same reason. Nothing in this step blocks on a missing
     snapshot, because none is ever expected here.
5. **Account identity.** Runs once the round (3) is found, before anything past it: the account
   this round is about to act on must be the one the owner configured, not a stale or copied id.
   **GrowOS mode:** config's `ad_account_id` (1) must equal the destination id the
   publishing-mode resolution above returned, when it returned one, and must appear among the
   accounts the connectivity read (2) came back with. **Standalone mode:** there is no resolver
   call to compare against, so config's `ad_account_id` must appear among the accounts the
   connectivity read (2) came back with. Either mode, any disagreement blocks every approved item
   found in (3) the same way an unavailable compliance skill blocks them (see "When something's
   missing"): `publish_state: blocked`, `publish_reason: account-mismatch` (or
   `destination-missing` in GrowOS mode when the resolver returned no destination at all), naming
   both values plainly in `publish_note`. GrowOS mode records the event per item:

   ```text
   node system/tools/growos.js publish-event --item <path> --publisher ads-meta-publish \
     --route api --outcome blocked --reason account-mismatch
   ```

   Standalone mode skips that call and says so once in the report. Keep every item `approved`, and
   stop the round right here: no lane sort, no compliance pass, no campaign or ad set, nothing
   sent to Meta this run.

## 1. Sort the approved ads into lanes

For each approved item, before doing anything with Meta:
- **Snapshot mismatch.** Failed the approved-snapshot check above. Skip the Meta write, keep it
  `approved`, and ask the owner to reconfirm through review.
- **Already published.** It carries `meta_ad_id` (and the matching `publish_ref` — the two are
  always written together, see step 4). Optionally confirm it still exists (`ads_get_ad_entities`
  or `ads_get_creatives` by id), since someone may have deleted it by hand in Ads Manager. If
  it's still there, skip it: no re-upload, no duplicate ad. If it's gone, treat it like a fresh
  ad and re-publish, overwriting `meta_ad_id` and `publish_ref` with the new one.
- **Needs verification.** `publish_state: needs-verification` from an earlier run — the create
  call may have committed with no confirmed read-back. Check Meta for it first (by `meta_ad_id`
  if one was captured, otherwise by matching name in the ad set) before doing anything else.
  Found and paused: finish the receipt exactly like "Already published." Genuinely absent: treat
  it like a fresh ad. Never create a second one just because the last attempt was uncertain.
- **Not yet a finished asset.** `asset_status: record-ready` (a locked video script with no
  footage yet) has no creative file to upload. Skip it and say so plainly, this isn't a
  compliance block, it's just not filmed yet.
- **Old-shape round.** The item's format requires more than one sealed file, a `creative:` file,
  or, for a carousel, one file per card, and the `sealed:` list does not carry a matching line for
  every one of them: this ad predates the sealing fix, or a card was added without a reseal, and
  was never fully hashed at handoff. A missing or partial `sealed:` list is old-shape too, not
  just a wholly absent one. Skip the Meta write, keep it `approved`, and say plainly that
  `ads-meta-create` needs to touch this ad again (regenerate the creative, or reseal it if the
  bytes on disk are already trustworthy) so every file the format requires carries a real
  `sealed:` line before this skill will publish it.
- **Blocked.** Fails the compliance backstop below. Skip the Meta write, keep it `approved`.
- **Ready.** Everything else. These move to step 3.

## 2. Compliance backstop (blocking, no exceptions from inside the skill)

`ads-meta-compliance` resolves every check to one of four results: `pass`, `pass-with-note`,
`needs-specialist-review`, or `fail`. The item may already carry one of these in its
`compliance` field from whatever drafted it. That field alone proves nothing about the file
sitting there right now: files drift, creatives get swapped, and a stale result from days ago is
not evidence about today's pixels. Do both checks, every ad, every run:

1. **Read the stored field.** Note it, but don't trust it yet, it only sets expectations for
   step 2.
2. **Run a fresh pass regardless.** Invoke the `ads-meta-compliance` skill on this item's
   actual creative file (the rendered PNG/MP4, not the brief, not the copy alone) right now.
   The fresh result is what counts for this run, not the memory of an old one.
3. **Fresh result `pass` or `pass-with-note`: publish.** Carry a `pass-with-note`'s note into
   the final report so the reviewer still sees what was disclosed, even though the ad ships.
4. **Fresh result `needs-specialist-review`, `fail`, or anything else (including no result at
   all): the ad is blocked.** Do not call any Meta write tool for it. Set
   `publish_state: blocked` and `publish_reason: compliance-missing` — the publisher standard's
   list carries that exact code for this ("ads: no recorded pass for the exact creative") — with
   the fresh result and reason in plain words in `publish_note`. GrowOS mode records the attempt:

   ```text
   node system/tools/growos.js publish-event --item <path> --publisher ads-meta-publish \
     --route api --outcome blocked --reason compliance-missing
   ```

   Standalone mode skips that call (there is no `system/` to run it against) and says so in one
   sentence in the report; the receipt fields just written into `publish_note`/`publish_state`/
   `publish_reason` are the whole standalone record, there is no separate log to write instead.

   The item stays `approved`, not `published`; it's fixable, not dead.
   `needs-specialist-review` specifically means a human needs to make the call, never treat it
   as a quiet pass.

**Overriding a block is the person's call, made in this conversation, not the skill's.** If they
explicitly say to publish it anyway, publishing proceeds for that one ad on the normal path in
step 4, and both `publish_note` and the final report say plainly that it shipped on an explicit
override of a compliance block (name the original result). The skill itself never argues for an
override, never treats a `note` claiming "false positive" as permission, and never asks a
leading question that nudges toward one. Silence, or "looks fine to me," is not an override.

## 3. Campaign + ad set

One pick per round, not per ad. Offer existing campaigns/ad sets from the account first
(`ads_get_ad_entities`), plus "create new" for either. Full mechanics, field requirements, and
the CBO-budget landmine: `references/meta-api-cookbook.md` § Pick the campaign / Pick or create
the ad set.

**Show a one-screen dry-run before any write**: round name, ad count, the campaign and ad set
(existing or "new: <name>"), the reminder that every object lands PAUSED, and, whenever any ad in
the round carries multiple text variants and the multi-text capability has not been proven on this
account or MCP build yet, one more line naming the throwaway probe ad that step will create and
delete before the real ads (cookbook § Multiple text variants). Get an explicit yes before
creating or touching anything in the account, the probe included. A multi-ad burst is hard to undo
one at a time; the confirmation is cheap, a wrong campaign is not.

## 4. Publish each ready ad

**Verify the bytes before anything leaves the machine.** The publisher standard requires
verifying a sealed file's exact bytes and staging a verified copy through `growos publish-stage`
before anything is uploaded (`system/standards/item-model.md`, "Sealed assets"; standalone:
`references/receipt-contract.md`'s sealed-bytes rule). GrowOS mode calls `growos publish-stage`
for real, per ad, in step 2 below; step 3 then uploads only the verified copy it hands back.
Standalone mode has no GrowOS install to call into, so this skill closes the same gap by hand:
stage each sealed file into the round's own staging folder first, re-hash the staged copy, and
upload only that copy, never hashing a path once and then uploading from that same path again.
Either mode: an item whose format requires more than one file (a `creative:` file, or, for a
carousel, one file per card) but whose `sealed:` list does not carry a matching line for every one
of them is an old-shape round from before this pack sealed ad creative, or a card added without a
reseal; refuse it (the "Old-shape round" lane in step 1 already catches most of these before this
point) rather than upload an unverified file.

Every attempt fills in the publisher standard's shipping receipt
(`system/standards/publisher-standard.md`, "The shipping receipt"):

```yaml
publish_destination: <ad_account_id>   # from config, e.g. act_1234567890 — never invented
publish_ref: <the Meta ad id>          # same value as meta_ad_id, written together
publish_attempted_at: <exact UTC>      # set when this ad's Meta write starts
publish_state: prepared                # this skill only ever writes prepared, blocked, or needs-verification — never live
publish_reason: verified               # or compliance-missing / sealed-mismatch / provider-error / readback-timeout / id-lost
publish_note: <campaign + ad set used, or the plain problem>
published_at: <exact UTC>              # when the read-back confirmed it — never a bare date
```

Per ad, in order, one at a time (a failure on one must never stop the others):

1. While the item is still `approved`, record `publish_destination` and `publish_attempted_at` —
   the attempt starting, not its outcome yet.
2. **Verify the sealed bytes, then stage or re-hash, before touching Meta.**
   - **GrowOS mode:** `node system/tools/growos.js publish-stage --item <path> --json`. It
     re-confirms the approved snapshot, verifies every sealed asset's place and bytes, and copies
     each verified file into `<business>/.state/staging/<id>/`, read-only. If it refuses (a
     drifted asset, a missing file, a link, or the live item no longer matching its own approved
     snapshot), make no outside action: `publish_state: blocked`, `publish_reason: sealed-mismatch`
     (or `approval-mismatch` when it's the item itself that drifted, not just the asset), name the
     file and the reason in `publish_note`, record the event (`--outcome blocked --reason
     sealed-mismatch`, matching whichever reason applies), keep `approved`, move to the next ad.
     On success, step 3 below uploads ONLY from the staged path(s) it returned, never from the
     round folder or the `_<ad-code>/` parts folder directly. Run
     `growos publish-stage --item <path> --release` once this ad's attempt is done, so a stale
     staged copy never lingers for a later run to trust by mistake.
   - **Standalone mode:** stage each file before verifying it, verify the staged copy instead of
     the original, and upload only from that copy afterward: hashing a path once and then
     uploading from that same path again leaves a window for the file to change in between, and
     copying it first closes that window. For every file the item's `sealed:` label names, first
     check the path's shape before reading it at all: refuse the ad (`publish_state: blocked`,
     `publish_reason: sealed-mismatch`, one plain sentence naming the failed rule, no outside
     action) unless the path is relative, has no `..` segment anywhere in it, resolves inside this
     ad's own `_<ad-code>/` parts folder, and names a plain file, not a symlink. A path that
     passes gets copied into a staging folder inside the round, `<round folder>/.staging/<item-id>/`,
     under its own file name. Only then is the staged copy, not the original, re-hashed with
     `shasum -a 256` and compared, character for character, against the hash on that `sealed:`
     line. Any mismatch: refuse this ad the same way, `publish_state: blocked`,
     `publish_reason: sealed-mismatch`, and say in one plain sentence that the bytes changed since
     approval and the owner needs to re-run `ads-meta-create` on this ad to reseal it. Note any
     block in the report instead of a logged event, since there is no `growos publish-event` to
     call standalone; keep `approved`, move to the next ad. Every file validated, staged, and
     matching: step 3 below hosts and uploads ONLY the staged copy, never the `_<ad-code>/`
     parts-folder original again, and the round's whole `.staging/` folder is removed once every
     ad in the round has been attempted.
   - **Either mode, any file the item's format requires with no matching `sealed:` line at all**
     (the `creative:` file, or, for a carousel, any one card): old-shape round, refuse the same
     way (`publish_reason: sealed-mismatch`), and say plainly that `ads-meta-create` needs to
     touch this ad again so every file the format requires carries a seal before this skill will
     publish it.

   Staging or re-hashing here proves the bytes only, a separate door from the compliance backstop
   earlier in this flow, and both must have passed before anything uploads.
3. Host the verified creative file publicly (the staged copy, either mode: GrowOS's
   `<business>/.state/staging/<id>/`, standalone's `<round folder>/.staging/<item-id>/`), then
   upload it to Meta for a hash/video_id. A carousel hosts and uploads every card the same way,
   each card's `image_hash` coming from that card's own staged copy, in the sealed list's own
   order, never a card read straight from the parts folder. Build the creative
   (`ads_create_creative`), then the ad (`ads_create_ad`, `status: PAUSED`). Exact steps, the
   two-host fallback, and every field-name trap: `references/meta-api-cookbook.md`.
4. The instant `ads_create_ad` returns an id, write `meta_ad_id: <id>` AND `publish_ref: <id>` —
   the same value, both fields, together. This one write is the entire idempotency mechanism, do
   it immediately, don't batch it for the end of the run where a later failure could lose it.
5. **Read the ad back before calling it prepared** — creating it is not proof it exists the way
   Meta says it does. `ads_get_ad_entities` (or `ads_get_creatives`) filtered to that id, and
   confirm it is really there, paused, not deleted. Every "record the event" below is GrowOS mode:
   `growos publish-event` records it for real there; standalone mode skips that call (no `system/`
   to run it against) and notes it in the report instead, since the receipt fields just written
   are already the standalone record.
   - **Confirmed, paused:** finish the receipt above (`publish_state: prepared`,
     `publish_reason: verified`, `published_at`, a `publish_note` naming the campaign and ad set
     used — plus any `pass-with-note` disclosure carried from the compliance check). Record the
     attempt (`growos publish-event --item <path> --publisher ads-meta-publish --route api --outcome prepared --reason verified --destination <ad_account_id> --ref <meta_ad_id>`).
     Only then make the separate `approved -> published` move — never fold it into the same write
     as the receipt. GrowOS mode: if step 2's `--release` hasn't run yet for this ad, run it now.
   - **Read-back contradicts it, or fails outright:** `publish_state: blocked`,
     `publish_reason: provider-error`, the plain problem in `publish_note`, keep `approved`,
     record the event (`--outcome blocked --reason provider-error`).
   - **Timed out, or the create call itself may have committed with no id returned:**
     `publish_state: needs-verification`, `publish_reason: readback-timeout` (or `id-lost` when no
     id came back at all), keep `approved`, record the event (`--outcome needs-verification`).
     Never retry the create — the next run's "Needs verification" lane (step 1) checks Meta first.
6. If pixel tracking is configured, apply it (cookbook § Apply pixel tracking). A tracking
   failure doesn't undo the ad or its receipt; log it and move on, it can be patched later.

## 5. Final report

Always, even on a partial run:
- **Published this run:** ad codes plus new `meta_ad_id`s.
- **Already published (skipped):** ad codes, unchanged.
- **Blocked:** ad codes plus the exact compliance reason each one failed on. Never let a
  blocked ad quietly vanish from the report, it's the most important line in it.
- **Multi-text probe, only when it ran this session:** pass or fail, and confirmation that the
  throwaway ad was deleted (cookbook § Multiple text variants).
- Campaign + ad set used, and the account's Ads Manager link.
- One closing line: **everything above is PAUSED.** Review and activate in Ads Manager.

## When something's missing

No `brain/ads/config.md` (or `ads-brain/config.md`): stop before the first read call, say what's
missing, don't fall back to invented account/page ids. MCP not connected: stop, name the fix
(reconnect), don't retry into a wall. Config's `ad_account_id` disagreeing with the resolver's
destination or the connected account (preconditions, "Account identity"): not a per-ad problem
either, treat every approved item as blocked with `publish_reason: account-mismatch` the same
way, rather than picking a campaign or touching any ad. `ads-meta-compliance` skill unavailable
for some reason: that's a missing check, not a passed one, treat every ad as blocked rather than
skip step 2.

## What this skill never does

- Never activates anything. PAUSED in, PAUSED out, always.
- Never writes `publish_state: live`, and never moves an item to `published` on one. Paused-only
  means the receipt's only successful terminal state is `prepared` — see step 4's shipping
  receipt.
- Never edits copy, creative, targeting, or budget while publishing. It ships exactly what was
  approved, byte for byte; changing an ad is a job for whatever drafted it, then re-approve.
- Never overrides a compliance block on its own initiative.
- Never invents an account id, page id, image URL, or Meta object id. A failed lookup or upload
  stops that ad and gets reported, it doesn't get guessed around.
- Never uses a non-MCP path to Meta (no SDK, no CLI, no raw Graph API call). If an MCP tool
  can't do something this skill needs, that's a limitation to report, not a reason to reach
  around it.
