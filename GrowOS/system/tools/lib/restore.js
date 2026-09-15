'use strict';

/**
 * restore.js — restore points, rollback, and the repair source of truth
 * (system/tools/lib/, SPEC §6.3 step 4 + §6.4).
 *
 * PRODUCT code: Node >= 18, stdlib only, no npm, no shelling out. Every write
 * goes through lib/atomic.js; every hash/compare through lib/manifest.js.
 *
 * A restore point is a self-verifying, byte-exact copy of the MACHINE SET taken
 * BEFORE an update touches anything:
 *
 *   .backups/restore-<fromVersion>-<ts>/
 *     machine/           full copy of every machine file (incl. system/VERSION
 *                        and system/manifest.json)
 *     manifest.json      sha256 hash tree of everything under machine/
 *     restore.json       { createdAt, fromVersion, toVersion, verified }
 *
 * MACHINERY ONLY, by design (Build Doc P2). An update never writes inside a
 * business folder, so a restore point holds no customer files and a rollback
 * never writes any — there is no journal, and content found under a stray
 * journal/ dir in a tampered or pre-2.0 point is IGNORED. The owner-run jobs
 * that do change business files keep their own journals (lib/operations.js).
 *
 * The SAME rollback routine backs both update's automatic failure recovery and
 * `repair --restore <path>` (SPEC §6.4), so a rollback behaves identically
 * however it is triggered.
 *
 * INSTALL-STATE note: system/VERSION and system/manifest.json are machine files
 * (they live under system/**), so they are COPIED into and RESTORED from a
 * restore point. But an update never ships them inside the package payload —
 * they are written from the package's own version + file list at the end of a
 * successful update. update.js therefore treats them as always-preserved and
 * never deletes them during the wholesale-replace swap. That policy lives in
 * update.js; this module just faithfully copies and restores whatever machine
 * files are on disk.
 */

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const manifest = require('./manifest.js');
const atomic = require('./atomic.js');
const paths = require('./paths.js');

/*
 * The SPEC §1 machine set. paths.isMachinePath is the authoritative matcher;
 * this list is only the enumeration order for copying/walking, and every path
 * it yields is re-checked against paths.isMachinePath as a guard, so the two
 * can never silently drift.
 */
const MACHINE_DIRS_POSIX = ['system', '.claude', '.codex', '.agents', '.obsidian'];
const MACHINE_FILES = ['START HERE.md', 'AGENTS.md', 'CLAUDE.md', 'GrowOS Queue.base'];

/** The machine set as coveredRoots for manifest.compareManifest (dirs + files). */
const MACHINE_COVERED = MACHINE_DIRS_POSIX.concat(MACHINE_FILES);

function isFile(p) { try { return fs.statSync(p).isFile(); } catch (_e) { return false; } }
function isDir(p) { try { return fs.statSync(p).isDirectory(); } catch (_e) { return false; } }

/** Synchronous sha256 of a Buffer — used to verify a snapshot source before use. */
function sha256(buf) { return crypto.createHash('sha256').update(buf).digest('hex'); }

/** Byte-order sort used everywhere so copies and manifests agree on order. */
const byteCompare = (a, b) => Buffer.compare(Buffer.from(a, 'utf8'), Buffer.from(b, 'utf8'));

/** Recursively collect POSIX relpaths of regular files under absDir.
 *
 * STRICT on read errors: swallowing a failed readdir let
 * a transiently-locked subtree produce a SHORT machine list — and a restore
 * point built from one is self-consistent (its manifest and count agree with
 * its own blindness) while a later rollback deletes every live file the walk
 * missed. A machine set this cannot fully read is a machine set it must not
 * describe: refuse, name the folder, change nothing. Only ENOENT (the entry
 * vanished mid-walk) reads as legitimately absent. */
function walkFiles(absDir, relPrefixPosix, out) {
  let ents;
  try {
    ents = fs.readdirSync(absDir, { withFileTypes: true });
  } catch (e) {
    if (e && e.code === 'ENOENT') return;
    throw new Error('could not read ' + (relPrefixPosix || absDir) + ' (' +
      (e && e.message ? e.message : String(e)) + ') — a machine list made while part of the tree is ' +
      'unreadable would be missing files, and acting on it later would delete them');
  }
  for (const e of ents) {
    const abs = path.join(absDir, e.name);
    const rel = relPrefixPosix ? relPrefixPosix + '/' + e.name : e.name;
    if (e.isDirectory()) walkFiles(abs, rel, out);
    else out.push(rel);
  }
}

/**
 * listMachineFiles(root) -> sorted POSIX relpaths of every machine file that is
 * actually on disk right now (SPEC §1 machine set). Absent machine dirs are
 * simply skipped. Every result is re-checked against paths.isMachinePath.
 */
function listMachineFiles(root) {
  const out = [];
  for (const f of MACHINE_FILES) if (isFile(path.join(root, f))) out.push(f);
  for (const d of MACHINE_DIRS_POSIX) {
    const abs = path.join(root, ...d.split('/'));
    if (isDir(abs)) walkFiles(abs, d, out);
  }
  // Exclude an owner-created CUSTOM skill (.claude/skills/<name>/… whose <name> is
  // not shipped): it lives under a machine dir but is CUSTOMER content, not the
  // machine set. Snapshotting it would let a rollback delete a custom skill created
  // after the point, or overwrite an edited one — the guard and the updater already
  // treat custom skills as the owner's, so the restore path must too.
  return out
    .filter((rel) => paths.isMachinePath(root, rel) && !paths.isCustomSkillPath(root, rel))
    .sort(byteCompare);
}

/**
 * A restore point is applied to the LIVE install, so every path it names must be in
 * the class it claims BEFORE any write or delete — a point marked "verified" is still
 * only as trustworthy as its bytes, and a tampered/corrupted manifest could name a
 * customer path in its MACHINE list. This guard refuses such a point
 * outright, so nothing is written or deleted out of class.
 */
function assertMachineKeysInClass(root, keys) {
  const bad = keys.filter((rel) => !paths.isMachinePath(String(root), rel));
  if (bad.length) {
    throw new Error('this restore point is not safe to apply — its machine list names ' +
      bad.length + ' path(s) outside the machine set (' + bad.slice(0, 3).join(', ') +
      ') — nothing was changed');
  }
}

/** Absolute path of a file, given a POSIX relpath and a base dir. */
function abs(base, relPosix) { return path.join(base, ...relPosix.split('/')); }

/**
 * A machine-class KEY is not enough: the write or delete lands wherever path
 * RESOLUTION says, and a machine directory swapped for a symlink (or junction)
 * into a business folder carries a perfectly-named machine write inside the
 * owner's files. atomicWrite's rename replaces a FILE symlink, but a linked
 * DIRECTORY component is followed like any other — so every component below
 * root is checked with lstat, and any symlink refuses the whole operation.
 * The operation runner draws the same line for business writes
 * (operations.js anySymlinkOnPath); this is its machine-side twin.
 */
function findSymlinkedPaths(root, rels) {
  const bad = [];
  for (const rel of rels) {
    let cur = String(root);
    for (const seg of String(rel).split('/')) {
      cur = path.join(cur, seg);
      let lst = null;
      try { lst = fs.lstatSync(cur); } catch (_e) { break; } // absent below here — nothing to follow
      if (lst.isSymbolicLink()) { bad.push(rel); break; }
    }
  }
  return bad;
}
function assertNoSymlinkedPaths(root, rels) {
  const bad = findSymlinkedPaths(root, rels);
  if (bad.length) {
    throw new Error('a GrowOS folder on the way to ' + bad.length + ' file(s) is a symbolic link (' +
      bad.slice(0, 3).join(', ') + ') — writing through a link could land outside GrowOS\'s own ' +
      'files, so nothing was changed. Remove or investigate the link first');
  }
}

/** Read restore.json for a restore point, or null. */
function readRestoreJson(restoreDir) {
  try {
    let t = fs.readFileSync(path.join(restoreDir, 'restore.json'), 'utf8');
    if (t.charCodeAt(0) === 0xfeff) t = t.slice(1);
    return JSON.parse(t);
  } catch (_e) {
    return null;
  }
}

// A restore-point dir component must be a plain token — never a path separator or
// a `..` traversal. The version reaches here from system/VERSION and the package
// manifest; both are validated upstream, but this sink sanitizes defensively so a
// tampered value can never place a backup outside the GrowOS folder.
function safeComponent(v) {
  const s = String(v);
  return (/^[0-9A-Za-z][0-9A-Za-z._-]*$/.test(s) && s.indexOf('..') === -1) ? s : 'unknown';
}

/**
 * createRestorePoint(root, { fromVersion, toVersion }) ->
 *   Promise<{ dir, restoreJson, files }>
 *
 * Copies the entire machine set, writes the point's own hash manifest, RE-HASHES
 * the copy to verify it, and writes restore.json. Any verification failure
 * throws BEFORE the caller touches the live install, so a bad restore point can
 * never let an update proceed. fromVersion/toVersion are sanitized to safe path
 * components (safeComponent).
 */
async function createRestorePoint(root, opts) {
  opts = opts || {};
  const fromVersion = safeComponent(opts.fromVersion || 'unknown');
  const toVersion = safeComponent(opts.toVersion || 'unknown');

  const ts = new Date().toISOString().replace(/[:.]/g, '-');
  const base = path.join(String(root), '.backups', 'restore-' + fromVersion + '-' + ts);
  let dir = base;
  let n = 2;
  while (fs.existsSync(dir)) { dir = base + '-' + n; n += 1; } // never collide

  // WHERE the snapshot lands matters as much as what goes into it: a .backups
  // linked into a business folder would put a full copy of the machine set
  // inside the owner's files. Checked before the directory is made.
  assertNoSymlinkedPaths(String(root), ['.backups']);

  fs.mkdirSync(dir, { recursive: true });

  const machineDir = path.join(dir, 'machine');
  // listMachineFiles is STRICT (walkFiles throws on unreadable subtrees) — a
  // point missing files it could not see is worse than no point. On refusal,
  // remove the just-made empty dir so nothing half-made lingers.
  let files;
  try {
    files = listMachineFiles(root);
  } catch (e) {
    try { fs.rmSync(dir, { recursive: true, force: true }); } catch (_e2) {}
    throw new Error('a restore point could not be made: ' + (e && e.message ? e.message : String(e)) +
      ' — nothing was changed');
  }
  // listMachineFiles ENUMERATES through a symlinked machine dir, so a machine
  // folder linked into a business folder would copy the owner's brain into the
  // backup labelled as machinery. Reading through a link damages nothing yet —
  // but it would put one business's content in a machine-class snapshot, and a
  // rollback taken after the link was removed would write it into
  // system/creative-library/, where every business can read it. Refuse instead.
  assertNoSymlinkedPaths(String(root), files);
  for (const rel of files) {
    atomic.atomicWrite(abs(machineDir, rel), fs.readFileSync(abs(String(root), rel)));
  }
  const m = await manifest.buildManifest(machineDir, files);
  manifest.saveManifest(m, path.join(dir, 'manifest.json'));
  const verify = await manifest.verifyDir(machineDir, m);
  if (!verify.ok) {
    throw new Error(
      'the restore point could not be verified (its copy does not match its own fingerprint) — nothing was changed'
    );
  }

  // The file count is recorded so a later rollback can tell a COMPLETE point from
  // one a sync client has only partly materialised — see rollbackMachine.
  const restoreJson = {
    createdAt: new Date().toISOString(), fromVersion, toVersion, verified: true, machineFiles: files.length,
  };
  atomic.atomicWrite(path.join(dir, 'restore.json'), JSON.stringify(restoreJson, null, 2) + '\n');

  return { dir, restoreJson, files };
}

/* -------------------------------- rollback -------------------------------- */

/**
 * rollbackMachine(root, restoreDir) -> Promise<{ restored, deleted, verify }>
 * Returns the machine set to exactly the snapshot: deletes machine files that
 * exist now but are absent from the snapshot (e.g. a file the update added),
 * re-copies every snapshot file (incl. system/VERSION and system/manifest.json),
 * then verifies the machine set against the snapshot manifest by hash. Throws if
 * the verification still fails (a rollback that cannot be trusted is fatal).
 */
async function rollbackMachine(root, restoreDir) {
  const machineDir = path.join(restoreDir, 'machine');
  if (!isDir(machineDir)) {
    throw new Error('this restore point has no machine copy to roll back to');
  }
  const snapshot = manifest.loadManifest(path.join(restoreDir, 'manifest.json'));
  const snapshotKeys = Object.keys(snapshot.files);
  const snapshotSet = new Set(snapshotKeys);

  // A snapshot with no machine files SELF-VERIFIES perfectly — nothing missing,
  // nothing changed, nothing extra — and then means "delete every machine file",
  // the tool included, reported as a success. That must never be obeyed, and it
  // does not take an attacker to produce: a sync client that has not yet
  // materialised the backup's contents presents exactly this shape.
  //
  // system/VERSION is the marker every real snapshot carries (createRestorePoint
  // copies the whole machine set, and no install lacks it). Its absence means
  // this is not a GrowOS machine snapshot, whatever restore.json claims.
  if (!snapshotSet.has('system/VERSION')) {
    throw new Error('this restore point does not contain a GrowOS machine copy (no system/VERSION), ' +
      'so it cannot be what your files are put back from — nothing was changed');
  }
  // The VERSION marker alone is not a floor: a point holding ONLY that one file
  // passes it, passes the source checks, and then deletes every other machine
  // file because none appears in the snapshot. So the point must also still hold
  // as many files as it recorded holding. createRestorePoint writes that count
  // into restore.json at the moment it takes the copy, which makes a partly
  // materialised or truncated backup detectable — the realistic failure — while
  // a legitimate point matches exactly. (A crafted point can set both
  // consistently; that is the forgery case, and it needs write access inside the
  // install, which already grants the damage.)
  {
    const rj = readRestoreJson(restoreDir);
    const recorded = rj && typeof rj.machineFiles === 'number' ? rj.machineFiles : null;
    if (recorded !== null) {
      if (recorded !== snapshotKeys.length) {
        throw new Error('this restore point is incomplete: it recorded ' + recorded + ' file(s) but its list ' +
          'now holds ' + snapshotKeys.length + ' — refusing to use it; nothing was changed');
      }
    } else {
      // A point made before that field existed is not thereby suspect, and
      // refusing every one of them would be a regression dressed as a safety
      // check. It still needs a floor, and the floor is ABSOLUTE (Phase-2
      // round 4): the files below have shipped in every 2.0 release, so every
      // genuine point contains all of them — and the LIVE tree gets no vote,
      // because a damaged install is exactly when repair runs, and "the live
      // file is missing too" must never lower the bar. The earlier floor
      // required only the root charter files the live tree happened to have,
      // which let a five-file point pass and then delete most of the
      // machinery.
      const ESSENTIAL = MACHINE_FILES.concat([
        'system/VERSION',
        'system/manifest.json',
        'system/tools/growos.js',
        'system/guards/item-hook.js',
        'system/guards/session-start.js',
        '.claude/settings.json',
      ]);
      const missing = ESSENTIAL.filter((f) => !snapshotSet.has(f));
      if (missing.length) {
        throw new Error('this restore point looks incomplete — it does not contain ' + missing.join(', ') +
          ', which every full copy of your GrowOS files has. Refusing to use it; nothing was changed');
      }
      // A CRAFTED point holding exactly these essentials and nothing else would
      // pass this floor and then delete the rest of the machinery — the same
      // forgery case as a crafted count above, and the same answer: it needs
      // write access inside the install, which already grants the damage. The
      // INNOCENT shape — a partly-materialised backup — cannot reach that
      // state: manifest.json is written atomically (complete or absent, never
      // a valid shorter list), and the source verification below reads and
      // hashes EVERY listed file before anything mutates, so a point whose
      // files lag its manifest refuses instead of gutting.
    }
  }

  // Every snapshot key must be a machine path BEFORE any delete/write.
  // A poisoned/corrupted manifest that lists a customer path would otherwise be
  // written over the live file here. Refuse the whole rollback — nothing is touched.
  assertMachineKeysInClass(String(root), snapshotKeys);
  // And no path we will write or delete may pass through a symlink: a machine
  // dir swapped for a link into a business folder would carry both the deletes
  // (of files ENUMERATED through the link) and the snapshot writes inside the
  // owner's files. Checked over the union BEFORE anything is touched.
  const liveMachine = listMachineFiles(String(root));
  assertNoSymlinkedPaths(String(root), snapshotKeys.concat(liveMachine));

  // READ AND VERIFY EVERY SOURCE FIRST, then mutate. Deleting first and reading
  // as it went meant one unreadable snapshot file threw with deletions already
  // landed — a half-restored machine set from the routine whose entire job is
  // putting things back. A sync client that has fetched the manifest but not yet
  // every file produces exactly that, so this is ordinary damage, not an attack.
  // The machine set is a few hundred small text files; holding it in memory for
  // the length of a rollback is the cheapest way to make this all-or-nothing.
  const sources = new Map();
  const unusable = [];
  for (const rel of snapshotKeys) {
    let bytes;
    try { bytes = fs.readFileSync(abs(machineDir, rel)); } catch (_e) { unusable.push(rel); continue; }
    if (sha256(bytes) !== snapshot.files[rel]) { unusable.push(rel); continue; }
    sources.set(rel, bytes);
  }
  if (unusable.length) {
    throw new Error('this restore point is missing or damaged for ' + unusable.length + ' file(s) (' +
      unusable.slice(0, 3).join(', ') + '), so it cannot put your GrowOS files back — nothing was changed');
  }

  // The checks above are a snapshot of the tree's shape; these are per-operation.
  // A link appearing between the precheck and this write would otherwise be
  // followed, so each mutation re-checks its own path immediately before it. Not
  // a race-free guarantee — nothing short of an OS-level open-and-verify would
  // be — but the window is one path check wide instead of a whole rollback wide.
  // A snapshot key can name a path that is, TODAY, the owner's own skill. No
  // attacker or corruption required: GrowOS ships `foo`, a later release retires
  // it, the owner writes their own `foo` — a path does not acquire a new identity
  // when its name is reused — and this rollback would put the old shipped file
  // over months of their work. Whatever is a custom skill right now is theirs,
  // so it is skipped and reported rather than restored.
  //
  // Two rules the first fix got wrong:
  //
  //   THE WHOLE FOLDER IS THEIRS, not the files that happen to exist. Skipping
  //   only keys whose exact live file existed meant an old point's
  //   `foo/scripts/old.js` — a file the owner's own `foo` never had — was
  //   planted INSIDE their skill.
  //
  //   THE CLASSIFICATION IS FROZEN BEFORE ANYTHING MOVES. This rollback
  //   restores the point's old `system/manifest.json`, and asking
  //   isCustomSkillPath afterwards asks the OLD manifest — which still ships
  //   `foo`, un-protecting it exactly when protection matters. The frozen set
  //   below is the pre-rollback truth, used for the skip, for the DELETE, and
  //   for every verify exemption. An earlier fix caught the delete
  //   missing from that list: the deletion loop judged "machinery" through
  //   the manifest-consulting classifier, so on a SECOND rollback of the same
  //   point — the live manifest now being the point's old one — the owner's
  //   own files inside a frozen-protected skill counted as machine files
  //   absent from the snapshot and were deleted, while `skipped` reported the
  //   very same skill as left alone.
  const ownerSkillName = (rel) => {
    const segs = paths.toPosix(String(rel)).split('/');
    if (segs.length < 4) return null;
    if (paths.fsNorm(segs[0]) !== '.claude' || paths.fsNorm(segs[1]) !== 'skills') return null;
    const name = segs[2];
    if (!name || name.charAt(0) === '.' || name.charAt(0) === '_' || paths.fsNorm(name) === '') return null;
    return paths.fsNorm(name);
  };
  // "The owner actually has a skill there" means a folder with at least one
  // real file in it. Bare isDir() froze an EMPTY leftover folder — updates
  // used to leave one behind when they retired a skill's files — and the
  // rollback then skipped restoring a skill nobody had, reporting a
  // nonexistent skill as protected. Ambient litter like
  // .DS_Store is not a file the owner made; anything odder (a link, a fifo)
  // errs toward protection — never toward deleting or overwriting.
  const dirHasRealFile = (absDir) => {
    let ents;
    try {
      ents = fs.readdirSync(absDir, { withFileTypes: true });
    } catch (e) {
      // ENOENT: no folder, nothing of the owner's there. ANY other failure is
      // UNKNOWN, and unknown errs toward protection: a
      // folder that exists but cannot be listed may be full of the owner's
      // work, and "could not look" must never read as "nothing there".
      // NORMALLY UNREACHABLE: the strict machine walk (walkFiles) refuses the
      // whole rollback on the same unreadable dir before classification runs
      // — z1k binds THAT refusal. This branch stays as the belt for any
      // future caller that reaches classification without the walk.
      return !(e && e.code === 'ENOENT');
    }
    for (const e of ents) {
      if (e.isDirectory()) {
        if (dirHasRealFile(path.join(absDir, e.name))) return true;
        continue;
      }
      if (e.isFile()) { if (!paths.isAmbientLitter(e.name)) return true; continue; }
      return true; // a link or other odd entry: someone made it — protect
    }
    return false;
  };
  const frozenOwnerSkills = new Set();
  for (const rel of snapshotKeys) {
    const n = ownerSkillName(rel);
    if (n === null || frozenOwnerSkills.has(n)) continue;
    // Theirs = the name is not in the BAKED shipped roster and the owner
    // actually has a skill folder there. The baked list, NOT the manifest,
    // because the manifest is itself a rollback target: the first rollback
    // restores an old manifest that still ships the retired name, and a
    // manifest-consulting classification would evaporate on every rollback
    // after the first — this exact hole surfaced when the owner-facing repair
    // command re-rolled a point the library had already rolled. Without the
    // real-file check, a retired skill nobody recreated would be
    // "protected" out of its own restore.
    if (!paths.SHIPPED_SKILLS.has(n) &&
        dirHasRealFile(path.join(String(root), '.claude', 'skills', paths.toPosix(String(rel)).split('/')[2]))) {
      frozenOwnerSkills.add(n);
    }
  }
  const isFrozenOwnerPath = (rel) => {
    const n = ownerSkillName(rel);
    return n !== null && frozenOwnerSkills.has(n);
  };
  // The owner-skill truth every MUTATION consults: a
  // skills-folder path whose name is outside the BAKED shipped roster is never
  // ours to delete, and never counts against the verify. The frozen set above
  // is a subset of this (it is built only from not-baked names); what matters
  // here is what is ABSENT: the live manifest gets no vote anywhere in this
  // function, because the rollback itself replaces it — a manifest-consulting
  // answer changes between the first run and the second.
  const isOwnerSkillPathNow = (rel) => {
    const n = ownerSkillName(rel);
    return n !== null && !paths.SHIPPED_SKILLS.has(n);
  };
  const skipped = snapshotKeys.filter(isFrozenOwnerPath);
  const skippedSet = new Set(skipped);

  const deleted = [];
  for (const rel of liveMachine) {
    if (!snapshotSet.has(rel)) {
      if (isOwnerSkillPathNow(rel)) continue; // the delete honors the same truth as the skip
      // .claude/settings.local.json is the owner's own machine file, not the
      // product's — a snapshot taken before it existed has no entry for it, but
      // that absence must never read as "removed by the update". Never delete it.
      if (paths.isLocalOnlyFile(rel)) continue;
      assertNoSymlinkedPaths(String(root), [rel]);
      fs.rmSync(abs(String(root), rel), { force: true });
      deleted.push(rel);
    }
  }
  for (const rel of snapshotKeys) {
    if (skippedSet.has(rel)) continue;
    // Symmetrically: never force an OLDER snapshot copy of the owner's local
    // settings file over their current one. A snapshot key existing at all just
    // means the file was already there when the point was taken — not that its
    // bytes are the ones to keep.
    if (paths.isLocalOnlyFile(rel)) continue;
    assertNoSymlinkedPaths(String(root), [rel]);
    atomic.atomicWrite(abs(String(root), rel), sources.get(rel));
  }

  const verify = await manifest.compareManifest(String(root), snapshot, MACHINE_COVERED);
  // A preserved custom skill legitimately shows up as an EXTRA under
  // .claude/ that is not in the machine snapshot — it is customer content the
  // rollback deliberately leaves untouched, so it must not fail the verify. The
  // same goes for one deliberately SKIPPED above: it shows up as changed (the
  // owner's bytes, which is the point) or missing (a snapshot file the owner's
  // own skill never had, deliberately not planted). The exemption is the SAME
  // owner-skill truth the delete used (frozen ∪ not-baked-shipped) — never
  // isCustomSkillPath, whose manifest half is now the point's old manifest and
  // must not be able to turn the owner's files into failures — the same
  // earlier fix aligned the delete and this filter.
  //
  // .claude/settings.local.json got the SAME two skips above (never deleted,
  // never written), so it can legitimately show up as extra (skip #1, absent
  // from the snapshot), changed, or missing (skip #2, its live bytes were never
  // touched) — none of that is a rollback failure, and it must not be able to
  // fail the byte-identical verify.
  const badExtra = (verify.extra || []).filter((p) => !isOwnerSkillPathNow(p) && !paths.isLocalOnlyFile(p));
  const badChanged = (verify.changed || []).filter((p) => !skippedSet.has(p) && !paths.isLocalOnlyFile(p));
  const badMissing = (verify.missing || []).filter((p) => !skippedSet.has(p) && !paths.isLocalOnlyFile(p));
  const ok = badMissing.length === 0 && badChanged.length === 0 && badExtra.length === 0;
  if (!ok) {
    throw new Error(
      'the rollback did not fully restore the machine files (' +
      badChanged.concat(badMissing).concat(badExtra).join(', ') + ') — please contact support'
    );
  }
  return {
    // Local-only keys are excluded here too: cmd-repair.js turns this list into
    // a customer-facing "restored N file(s)" count, and this file was never
    // actually restored — it was deliberately left exactly as the owner had it.
    // Not the `skipped` array below: that one means "an owner-created skill was
    // protected", a different message for a different reason.
    restored: snapshotKeys.filter((rel) => !skippedSet.has(rel) && !paths.isLocalOnlyFile(rel)),
    deleted: deleted.sort(byteCompare),
    skipped: skipped.sort(byteCompare),
    verify,
  };
}

/**
 * fullRollback(root, restoreDir) -> Promise<{ machine }>
 * The shared recovery used by both update's automatic failure recovery and
 * `repair --restore`. Restores the MACHINE SET and nothing else — a rollback
 * never writes inside a business folder, whatever a restore point carries.
 * VERSION and manifest.json ride along inside the machine copy, so they are
 * restored too.
 */
async function fullRollback(root, restoreDir) {
  const machine = await rollbackMachine(String(root), restoreDir);
  return { machine };
}

/* ------------------------------ finding points ---------------------------- */

/** All restore-point dirs, newest first (by restore.json.createdAt, then name). */
function listRestorePoints(root) {
  const base = path.join(String(root), '.backups');
  let ents;
  try { ents = fs.readdirSync(base, { withFileTypes: true }); } catch (_e) { return []; }
  const points = [];
  for (const e of ents) {
    if (!e.isDirectory() || !e.name.startsWith('restore-')) continue;
    const dir = path.join(base, e.name);
    points.push({ dir, name: e.name, restoreJson: readRestoreJson(dir) });
  }
  points.sort((a, b) => {
    const ta = (a.restoreJson && a.restoreJson.createdAt) || '';
    const tb = (b.restoreJson && b.restoreJson.createdAt) || '';
    if (ta !== tb) return ta < tb ? 1 : -1; // newest first
    return a.name < b.name ? 1 : a.name > b.name ? -1 : 0;
  });
  return points;
}

/**
 * findRepairCopy(root, relPosix, wantHash) -> absolute path | null
 * Searches restore points (newest first) for a machine copy of relPosix whose
 * bytes hash to wantHash (the CURRENT manifest's expected value). This is how
 * repair sources correct bytes: only a copy that matches today's manifest is
 * used, so an old restore point can still repair a file that did not change
 * between versions, and never installs stale bytes for one that did.
 */
async function findRepairCopy(root, relPosix, wantHash) {
  for (const pt of listRestorePoints(root)) {
    const candidate = abs(path.join(pt.dir, 'machine'), relPosix);
    if (!isFile(candidate)) continue;
    if ((await manifest.hashFile(candidate)) === wantHash) return candidate;
  }
  return null;
}

module.exports = {
  MACHINE_DIRS_POSIX,
  MACHINE_FILES,
  MACHINE_COVERED,
  listMachineFiles,
  createRestorePoint,
  rollbackMachine,
  fullRollback,
  listRestorePoints,
  readRestoreJson,
  findRepairCopy,
  findSymlinkedPaths,
  assertNoSymlinkedPaths,
};
