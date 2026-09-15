'use strict';

/**
 * cmd-publish-stage.js — the `publish-stage` command (Build Doc P5; closes
 * Phase 4's explicit obligation in SPEC §5.6: the publish step uploads the
 * exact bytes it verified, from a verified read-only staging copy, never by
 * re-opening a path after hashing).
 *
 *   growos publish-stage --item <path> [--json]
 *   growos publish-stage --item <path> --release [--json]
 *
 * WHAT IT PROVES before anything is staged:
 *   1. The item resolves cleanly (same discipline as publishing-mode: real
 *      file, real work item, no symlink anywhere on the way).
 *   2. Its status is `approved`, and the APPROVED SNAPSHOT exists.
 *   3. The live item is byte-identical to the approved snapshot EXCEPT the
 *      fields an attempt legitimately writes (status, note, the receipt) —
 *      judged by the guard's own carve-out engine, the same code that guards
 *      cross-business receipt writes. The sealed list is NOT maskable, so a
 *      re-sealed live file fails here by construction.
 *   4. Every sealed asset passes the seal's place-and-bytes rules
 *      (lib/sealed.js verifySealed — parts space only, ordinary file,
 *      resolved containment, exact SHA-256).
 *
 * WHAT STAGING ADDS on top of verifying: each asset is copied into
 * `<business>/.state/staging/<id>/` while being hashed THROUGH THE SOURCE
 * DESCRIPTOR (open once; nlink and file-ness judged on fstat of that
 * descriptor), the staged copy is re-hashed through ITS OWN descriptor, and
 * only a copy whose both hashes equal the approved seal survives — then it
 * is made read-only. The publisher uploads FROM the staged path and runs
 * `--release` after the verified upload.
 *
 * THE HONEST LIMITS, stated (SPEC §6.7.12 f4 promised these live here):
 *
 *  1. Read-only is a convention the owner's own tools can override, and
 *     nothing in userland can stop a root-capable process from rewriting the
 *     staged copy between this verification and the connector's read. What
 *     this closes is the gap SPEC §5.6 named: the bytes that ship are the
 *     bytes that were hashed, not whatever a path happens to hold at upload
 *     time.
 *  2. Clearing the staging folder WALKS it and then removes it, and Node has
 *     no fs.*at() calls, so a path swapped between the walk and the remove is
 *     the same race class cmd-update documents. The components are lstat'd
 *     first, which is what a userland process can do.
 *  3. The up-front stale-clear can break a CONCURRENT second publisher staging
 *     the same item: its folder disappears underneath it. This is a
 *     single-owner tool, and preventing a stale upload wins over supporting a
 *     second simultaneous publisher.
 *
 * Any failure refuses, cleans up the partial staging, and stages NOTHING.
 *
 * PRODUCT code: Node >= 18, stdlib only, no npm, no shelling out. Windows is
 * first-class (O_NOFOLLOW is used only where the platform has it; the staged
 * re-hash through the copy's own descriptor is the proof that travels).
 */

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const fm = require('./fm.js');
const ids = require('./ids.js');
const paths = require('./paths.js');
const sealedLib = require('./sealed.js');
const publishing = require('./publishing.js');

function fail(json, msg) {
  if (json) process.stdout.write(JSON.stringify({ refused: true, reason: msg }) + '\n');
  else process.stdout.write('Cannot stage: ' + msg + '\n');
  return 2;
}

/** Stream-copy fd -> staged path, hashing the SOURCE as it is read. */
function copyAndHash(srcFd, stagedAbs) {
  const hash = crypto.createHash('sha256');
  const outFd = fs.openSync(stagedAbs, 'wx');
  try {
    const buf = Buffer.alloc(1024 * 1024);
    let pos = 0;
    for (;;) {
      const n = fs.readSync(srcFd, buf, 0, buf.length, pos);
      if (n === 0) break;
      hash.update(buf.subarray(0, n));
      let written = 0;
      while (written < n) written += fs.writeSync(outFd, buf, written, n - written);
      pos += n;
    }
    fs.fsyncSync(outFd);
  } finally {
    try { fs.closeSync(outFd); } catch (_) {}
  }
  return hash.digest('hex');
}

/** Re-hash a staged copy through its own descriptor. */
function hashThroughFd(abs) {
  const fd = fs.openSync(abs, 'r');
  try {
    const st = fs.fstatSync(fd, { bigint: true });
    if (!st.isFile()) throw new Error(abs + ' is not an ordinary file after staging');
    const hash = crypto.createHash('sha256');
    const buf = Buffer.alloc(1024 * 1024);
    let pos = 0;
    for (;;) {
      const n = fs.readSync(fd, buf, 0, buf.length, pos);
      if (n === 0) break;
      hash.update(buf.subarray(0, n));
      pos += n;
    }
    return hash.digest('hex');
  } finally {
    try { fs.closeSync(fd); } catch (_) {}
  }
}

async function run(args, ctx) {
  const json = !!(ctx.flags && ctx.flags.json);
  const item = ctx.flags && ctx.flags.item;
  const release = !!(ctx.flags && ctx.flags.release);

  if (!item || typeof item !== 'string') return fail(json, 'publish-stage needs --item <path to the work item>');
  if (!ctx.root) return fail(json, 'there is no GrowOS folder here (no system/VERSION found)');

  // 1. The item resolves under the same discipline publishers already use.
  let meta;
  try {
    meta = publishing.resolveMode(ctx.root, item);
  } catch (err) {
    return fail(json, err && err.message ? err.message : String(err));
  }
  const rootAbs = path.resolve(String(ctx.root));
  const itemAbs = path.join(rootAbs, ...meta.item.split('/'));
  const business = meta.business;

  let liveText;
  try { liveText = fs.readFileSync(itemAbs, 'utf8'); }
  catch (err) { return fail(json, 'the item could not be read: ' + (err && err.message ? err.message : String(err))); }

  const id = fm.getField(liveText, 'id');
  if (!id || !ids.isId(id)) return fail(json, 'the item has no valid id, so its approved snapshot cannot be found');

  const stagingDir = path.join(rootAbs, business, '.state', 'staging', id);
  const stagingRel = business + '/.state/staging/' + id;

  // The staging path is a WRITE (and delete) destination, so its components
  // get the same discipline as everything else here: a
  // symlinked `.state`, `staging`, or `<id>` would make the recursive remove
  // and the copies land wherever the link points — another business's folder,
  // in the reported case. Where a component is absent, mkdir below creates a
  // real directory, so absence is clean.
  {
    let cur = path.join(rootAbs, business);
    for (const seg of ['.state', 'staging', id]) {
      cur = path.join(cur, seg);
      let ls = null;
      try { ls = fs.lstatSync(cur); } catch (_) { ls = null; }
      if (ls === null) break; // absent from here down: nothing a link can redirect
      if (ls.isSymbolicLink()) {
        return fail(json, business + '/' + path.relative(path.join(rootAbs, business), cur).split(path.sep).join('/') +
          ' is a link — the staging folder must be a real folder, because staging deletes and rewrites it. ' +
          'Nothing was staged or removed; investigate the link first');
      }
    }
  }

  if (release) {
    try { fs.rmSync(stagingDir, { recursive: true, force: true }); }
    catch (err) { return fail(json, 'could not remove ' + stagingRel + ': ' + (err && err.message ? err.message : String(err))); }
    if (json) process.stdout.write(JSON.stringify({ released: true, staging_dir: stagingRel }) + '\n');
    else process.stdout.write('Released: ' + stagingRel + ' is gone.\n');
    return 0;
  }

  // Clear any STALE staged copy of this item up front: from here on, every
  // refusal leaves nothing behind to upload — a publisher can never grab
  // yesterday's verified dir after today's verification said no.
  try { fs.rmSync(stagingDir, { recursive: true, force: true }); }
  catch (err) { return fail(json, 'could not clear ' + stagingRel + ': ' + (err && err.message ? err.message : String(err))); }

  // 2. Approved only, with the approved snapshot as the proof.
  const status = fm.getField(liveText, 'status');
  if (status !== 'approved') {
    return fail(json, 'this item is ' + JSON.stringify(status || 'unstamped') + ', not approved — only approved ' +
      'work is staged for publishing');
  }
  const snapAbs = path.join(rootAbs, business, '.snapshots', id + '.approved.md');
  // The PATH to the proof, before the proof itself. O_NOFOLLOW judges only the
  // last component (and only where the platform has it — Windows does not), so
  // a linked `.snapshots/` folder handed over an ordinary nlink==1 file sitting
  // somewhere else entirely and every check below passed it. Same walk the
  // staging destination already gets above.
  {
    const linked = publishing.firstSymlinkOnPath(path.join(rootAbs, business), snapAbs);
    if (linked) {
      return fail(json, business + '/' + path.relative(path.join(rootAbs, business), linked).split(path.sep).join('/') +
        ' is a link — the approved copy must sit on a real path inside this business, because a link can ' +
        'point the proof at bytes the owner never approved. Nothing was staged; investigate the link first');
    }
  }
  // The snapshot is the PROOF, so it gets the same descriptor discipline as
  // the assets: opened O_NOFOLLOW, judged through fstat
  // (ordinary file, exactly ONE name — a hard link means an innocent second
  // name can rewrite the proof past the bookkeeping guard), read through the
  // same descriptor that was judged.
  let snapText = null;
  let snapFd = null;
  try {
    let flags = fs.constants.O_RDONLY;
    if (typeof fs.constants.O_NOFOLLOW === 'number') flags |= fs.constants.O_NOFOLLOW;
    snapFd = fs.openSync(snapAbs, flags);
    const st = fs.fstatSync(snapFd, { bigint: true });
    if (!st.isFile()) return fail(json, 'the approved copy is not an ordinary file — it cannot vouch for anything');
    if (st.nlink !== 1n) {
      return fail(json, 'the approved copy has more than one name pointing at it (' + st.nlink + ') — a ' +
        'second name means the proof may not stay what the owner approved. Remove the extra link, then ' +
        'ask the owner to re-approve if anything looks off');
    }
    snapText = fs.readFileSync(snapFd, 'utf8');
  } catch (err) {
    if (err && err.code === 'ENOENT') {
      return fail(json, 'there is no approved copy at ' + business + '/.snapshots/' + id + '.approved.md — without ' +
        'it nothing proves what the owner said yes to. Ask the owner to move the item back to review and approve ' +
        'the exact version again');
    }
    if (err && (err.code === 'ELOOP' || err.code === 'EMLINK')) {
      return fail(json, 'the approved copy is a link — it cannot vouch for anything');
    }
    return fail(json, 'the approved copy could not be read: ' + (err && err.message ? err.message : String(err)));
  } finally {
    if (snapFd !== null) { try { fs.closeSync(snapFd); } catch (_) {} }
  }

  // 3. The live item must BE the approved item, give or take the attempt's own
  //    fields. The guard's carve-out engine is the single source of truth for
  //    "give or take" (status, note, receipt) — sealed is deliberately not in
  //    that set, so a re-sealed live file is a mismatch here.
  const hook = require('../../guards/item-hook.js');
  if (!hook.isCarveOutEdit(snapText, liveText)) {
    return fail(json, 'what is on disk is not what the owner approved — the body, the label, or the sealed ' +
      'list differs from the approved copy beyond the receipt fields an attempt may write. Nothing was ' +
      'staged. If the change is intended, the owner moves the item back to review and approves it again');
  }

  // 4. Nothing sealed? Then there is nothing to stage — a clean, honest empty.
  const sealedPresent = fm.getField(snapText, 'sealed') !== undefined;
  if (!sealedPresent) {
    if (json) {
      process.stdout.write(JSON.stringify({
        item: meta.item, id, business, staging_dir: null, files: [],
        note: 'the approved item seals no files; there is nothing to stage',
      }) + '\n');
    } else {
      process.stdout.write('Nothing sealed, nothing to stage — this deliverable ships no files.\n');
    }
    return 0;
  }

  // 5. The seal's own rules first: place, ordinariness, containment, bytes.
  const itemRel = meta.item.slice(business.length + 1);
  const sealProblems = sealedLib.verifySealed(rootAbs, business, itemRel, snapText);
  if (sealProblems.length) {
    return fail(json, 'the sealed assets do not verify against the approved copy: ' + sealProblems.join(' | ') +
      ' — nothing was staged, and nothing from this deliverable should be uploaded');
  }
  const entries = sealedLib.parseSealed(snapText).entries;

  // 6. Stage: copy each asset while hashing the source through ITS descriptor,
  //    prove the staged copy through its own, and make it read-only.
  try { fs.mkdirSync(stagingDir, { recursive: true }); }
  catch (err) { return fail(json, 'could not create ' + stagingRel + ': ' + (err && err.message ? err.message : String(err))); }

  const baseRel = path.posix.dirname(paths.toPosix(itemRel));
  const files = [];
  const cleanupAndFail = (msg) => {
    try { fs.rmSync(stagingDir, { recursive: true, force: true }); } catch (_) {}
    return fail(json, msg + ' — nothing was staged');
  };

  // Any UNEXPECTED failure inside the copy loop (disk full, a permission
  // surprise) must also stage nothing — without this catch a thrown error
  // escaped with a partial directory left behind.
  try {
  for (let i = 0; i < entries.length; i++) {
    const e = entries[i];
    const rel = baseRel === '.' ? e.path : baseRel + '/' + e.path;
    const srcAbs = path.join(rootAbs, business, ...rel.split('/'));
    let srcFd = null;
    try {
      let flags = fs.constants.O_RDONLY;
      if (typeof fs.constants.O_NOFOLLOW === 'number') flags |= fs.constants.O_NOFOLLOW;
      try { srcFd = fs.openSync(srcAbs, flags); }
      catch (err) {
        if (err && (err.code === 'ELOOP' || err.code === 'EMLINK')) {
          return cleanupAndFail(e.path + ' is a link, and a link is not the sealed bytes');
        }
        return cleanupAndFail(e.path + ' could not be opened (' + (err && err.message ? err.message : String(err)) + ')');
      }
      const st = fs.fstatSync(srcFd, { bigint: true });
      if (!st.isFile()) return cleanupAndFail(e.path + ' is not an ordinary file');
      if (st.nlink !== 1n) {
        return cleanupAndFail(e.path + ' has more than one name pointing at it (' + st.nlink + ') — a second ' +
          'name means these may not stay the sealed bytes');
      }
      const stagedName = String(i + 1).padStart(2, '0') + '-' + path.posix.basename(e.path);
      const stagedAbs = path.join(stagingDir, stagedName);
      // TWO HASHES, TWO DIFFERENT JOBS:
      // - srcHash catches a source that changed AFTER verifySealed's
      //   path-based pass and BEFORE this descriptor read — the exact gap
      //   publish-stage exists for. For an AT-REST drift it is redundant with
      //   verifySealed above (which refuses first); for the post-verification
      //   race it is the only line. Bound by the stage-race-driver test.
      // - stagedHash proves the COPY through its own descriptor (a staging
      //   write that corrupted or raced). No test perturbs the staging write,
      //   so a probe reports it unbound: defensive, kept, stated here.
      const srcHash = copyAndHash(srcFd, stagedAbs);
      if (srcHash !== e.sha256) {
        return cleanupAndFail(e.path + ' is no longer the bytes that were approved (the seal does not match)');
      }
      const stagedHash = hashThroughFd(stagedAbs);
      if (stagedHash !== e.sha256) {
        return cleanupAndFail(e.path + ': the staged copy did not read back as the sealed bytes');
      }
      // Read-only is a courtesy, not a proof — say honestly whether it took
      // rather than calling the copy immutable either way.
      let readOnly = true;
      try { fs.chmodSync(stagedAbs, 0o444); } catch (_) { readOnly = false; }
      files.push({ sealed: e.path, staged: stagingRel + '/' + stagedName, sha256: e.sha256, read_only: readOnly });
    } finally {
      if (srcFd !== null) { try { fs.closeSync(srcFd); } catch (_) {} }
    }
  }
  } catch (err) {
    return cleanupAndFail('unexpected error while staging (' + (err && err.message ? err.message : String(err)) + ')');
  }

  if (json) {
    process.stdout.write(JSON.stringify({
      item: meta.item, id, business, staging_dir: stagingRel, files,
      note: 'upload FROM the staged paths, then run publish-stage --release --item ' + meta.item,
    }) + '\n');
  } else {
    const lines = ['Staged ' + files.length + ' sealed file(s) into ' + stagingRel + ':'];
    for (const f of files) lines.push('  ' + f.sealed + ' -> ' + f.staged);
    lines.push('Upload FROM the staged paths, then run: growos publish-stage --item "' + meta.item + '" --release');
    process.stdout.write(lines.join('\n') + '\n');
  }
  return 0;
}

module.exports = {
  name: 'publish-stage',
  summary: 'Verify an approved item\'s sealed assets and stage verified read-only copies for upload.',
  run,
};
