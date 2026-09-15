'use strict';

/**
 * cmd-update.js — `growos update <path-or-url> [--dry-run]`
 * (system/tools/lib/, SPEC §6.3; Build Doc P2).
 *
 * PRODUCT code: Node >= 18, stdlib only, no npm, no shelling out. Conforms to
 * the dispatcher contract: module.exports = { name, summary, run(args, ctx) }
 * where run returns an integer exit code (0 ok, 2 stopped/failed) and prints —
 * one plain line per step for a human, or a single JSON envelope with --json.
 *
 * AN UPDATE REPLACES MACHINERY ONLY. It never writes inside a business folder.
 * There are no shipped migrations: anything that changes the owner's own files
 * is a separate owner-run command whose operations are computed locally from
 * the install's own state (lib/operations.js). A package that carries
 * migration code — or even declares it — is refused outright, because a
 * package built to change business files is not an update.
 *
 * THE HONESTY GUARANTEES this flow keeps (why the order is what it is):
 *   • Nothing on disk changes until the update file has been verified whole and
 *     confirmed to fit your version — a bad or tampered file is refused with
 *     ZERO changes (verify happens before the restore point and the swap).
 *   • Every payload path must be a machine path. A package that names a
 *     customer path, install-state, or generated wiring is refused whole.
 *   • Before the first machine file is swapped, a self-verifying restore point
 *     captures your entire machine set; if the restore point can't be trusted,
 *     the update stops before touching anything.
 *   • Your customizations to machine files are never silently overwritten —
 *     each is copied to .backups/customizations/<new-version>/ first, and named
 *     in the report.
 *   • A GrowOS 0.1 folder is refused before the from[] check even runs, no
 *     matter what its system/VERSION claims (see cmd-import.js's header: every
 *     real 0.1 install reports "2.0.0"). The shape check is cmd-import.js's own
 *     detect(), reused rather than duplicated, and the refusal names
 *     `growos import` as the real next step.
 *
 * Package format (SPEC §6.3): growos-update-<version>.tgz containing
 *   package-manifest.json  { product, version, from:[...], files:{rel:sha256}, signature }
 *   payload/<machine files>
 * Nothing else. system/VERSION and system/manifest.json are NOT shipped in the
 * payload; they are install-state written from the package's own version + file
 * list at the end, and are always preserved (never deleted) by the
 * wholesale-replace swap.
 */

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const fetch = require('./fetch.js');
const targz = require('./targz.js');
const manifest = require('./manifest.js');
const atomic = require('./atomic.js');
const paths = require('./paths.js');
const restore = require('./restore.js');
const { newId } = require('./ids.js');
// The 0.1-vs-2.0 shape heuristics live in exactly one place: cmd-import.js's
// own detect(). Reused here rather than re-derived, so the two commands can
// never quietly drift apart on what "looks like GrowOS 0.1" means.
const { detect: detectShape } = require('./cmd-import.js');

/* system/VERSION + system/manifest.json: machine files, but written from
 * package metadata, so the swap must never delete them. */
const INSTALL_STATE = ['system/VERSION', 'system/manifest.json'];

/** A controlled stop: prints a plain reason and exits with `code` (default 2). */
class Stop extends Error {
  constructor(reason, code) { super(reason); this.reason = reason; this.code = code || 2; }
}

const byteCompare = (a, b) => Buffer.compare(Buffer.from(a, 'utf8'), Buffer.from(b, 'utf8'));
function absOf(base, relPosix) { return path.join(String(base), ...relPosix.split('/')); }
function isFile(p) { try { return fs.statSync(p).isFile(); } catch (_e) { return false; } }

/** Read a small JSON file, tolerating a BOM (SPEC §2). */
function readJson(p) {
  let t = fs.readFileSync(p, 'utf8');
  if (t.charCodeAt(0) === 0xfeff) t = t.slice(1);
  return JSON.parse(t);
}

/** Read system/VERSION, trimmed, BOM-tolerant. */
function readVersion(root) {
  let t = fs.readFileSync(path.join(String(root), 'system', 'VERSION'), 'utf8');
  if (t.charCodeAt(0) === 0xfeff) t = t.slice(1);
  return t.trim();
}

/** Emitter: one plain line per step for humans; silent under --json. */
function makeEmitter(json) {
  const steps = [];
  return {
    steps,
    step(msg) { steps.push(msg); if (!json) process.stdout.write(msg + '\n'); },
  };
}

/** Run a sibling command (mirror/doctor) best-effort and quietly; never throws. */
async function lazyRun(root, cmdName, ctx) {
  const p = path.join(String(root), 'system', 'tools', 'lib', 'cmd-' + cmdName + '.js');
  if (!isFile(p)) return { ran: false, reason: 'absent' };
  const outW = process.stdout.write;
  const errW = process.stderr.write;
  process.stdout.write = () => true;
  process.stderr.write = () => true;
  try {
    delete require.cache[require.resolve(p)];
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const mod = require(p);
    if (!mod || typeof mod.run !== 'function') return { ran: false, reason: 'no run()' };
    const r = mod.run([], { root: String(root), flags: { json: true, yes: true }, args: [] });
    const code = r && typeof r.then === 'function' ? await r : r;
    return { ran: true, code };
  } catch (e) {
    return { ran: false, reason: e.message };
  } finally {
    process.stdout.write = outW;
    process.stderr.write = errW;
  }
}

/**
 * Work out what the swap will do: which payload files are new, which change
 * existing bytes, and which machine files disappear (present on disk, absent
 * from the package). Pure read — hashes disk vs payload; changes nothing.
 */
async function computePlan(root, payloadDir, files, installStateSet) {
  const payloadKeys = Object.keys(files).sort(byteCompare);
  const added = [];
  const changed = [];
  for (const key of payloadKeys) {
    const onDisk = absOf(root, key);
    if (!isFile(onDisk)) { added.push(key); continue; }
    if ((await manifest.hashFile(onDisk)) !== files[key]) changed.push(key);
  }
  const desired = new Set(payloadKeys.concat([...installStateSet]));
  // The .codex wiring is generated per-install by setup/mirror (absolute paths),
  // so it is deliberately absent from the payload. Never treat it as "removed" —
  // deleting it every update and leaning on the best-effort mirror to recreate it
  // is how an update could silently leave Codex unwired.
  //
  // An OWNER-CREATED custom skill (.claude|.agents/skills/<name>/…, not a shipped
  // skill) is also absent from every package payload — it is the owner's, not
  // ours. Deleting it on update (even with a backup) removes a working skill from
  // where it lives, so it is excluded here too. A RETIRED SHIPPED skill the owner
  // edited is NOT a custom skill (isCustomSkillPath is false for shipped names),
  // so it is still removed (and backed up) exactly as before.
  //
  // .claude/settings.local.json is likewise absent from every payload — it is the
  // owner's own Claude Code permissions, not a shipped file (paths.isLocalOnlyFile).
  // Without this it would be listed as "removed", then treated as a customization
  // to back up, then deleted below — the exact defect this predicate closes.
  const removed = restore.listMachineFiles(String(root))
    .filter((rel) => !desired.has(rel) && !rel.startsWith('.codex/') &&
      !paths.isCustomSkillPath(String(root), rel) && !paths.isLocalOnlyFile(rel));
  return { added, changed, removed, payloadKeys };
}

/** A safe semver path component: digits.digits.digits, nothing else. */
const VERSION_RE = /^[0-9]+\.[0-9]+\.[0-9]+$/;

/** Copy a machine file's current bytes to .backups/customizations/<version>/. */
function backupCustomization(root, version, relPosix) {
  // Defense in depth: run() validates the version at manifest read, but it becomes
  // a PATH component here, so refuse anything that is not a plain semver — a value
  // like "../../../outside" must never let a backup escape the GrowOS folder.
  if (!VERSION_RE.test(String(version))) {
    throw new Stop('this update file has an unsafe version — nothing was changed', 2);
  }
  const dstRel = '.backups/customizations/' + String(version) + '/' + relPosix;
  // A symlink planted anywhere under .backups (a linked customizations dir
  // pointing into a business folder) would carry this write inside the owner's
  // files even though the destination NAME is a backup path. Refuse instead.
  restore.assertNoSymlinkedPaths(root, [dstRel]);
  const dst = absOf(root, dstRel);
  atomic.atomicWrite(dst, fs.readFileSync(absOf(root, relPosix)));
  return dst;
}

/* ------------------------------ the main flow ------------------------------ */

async function run(args, ctx) {
  const root = ctx && ctx.root ? String(ctx.root) : process.cwd();
  const flags = (ctx && ctx.flags) || {};
  const json = !!flags.json;
  const emit = makeEmitter(json);

  const result = {
    ok: true,
    action: 'update',
    stopped: null,
    fromVersion: null,
    toVersion: null,
    changed: [],
    added: [],
    removed: [],
    customizations: [],
    restorePoint: null,
    steps: emit.steps,
  };

  let extractDir = null;
  let downloadedTgz = null;

  function finish(code) {
    if (json) {
      // Keep the machine envelope to exactly one line.
      process.stdout.write(JSON.stringify(result) + '\n');
    } else if (code === 0 && result.action === 'update') {
      const lines = ['', 'Update complete.'];
      lines.push('  From ' + result.fromVersion + ' to ' + result.toVersion + '.');
      lines.push('  Machine files: ' + result.changed.length + ' changed, ' + result.added.length + ' added, ' + result.removed.length + ' removed.');
      if (result.customizations.length) {
        lines.push('  Your customizations were kept here:');
        for (const c of result.customizations) lines.push('    ' + c.relPath + '  ->  ' + c.savedTo);
      }
      if (result.restorePoint) lines.push('  A restore point is saved at ' + result.restorePoint + ' if you ever need it.');
      lines.push('  Your business folders were not touched — an update never writes inside them.');
      process.stdout.write(lines.join('\n') + '\n');
    }
    return code;
  }

  try {
    // --migrate-only is gone. Say why, rather than quietly doing nothing — a
    // customer following an old instruction deserves the real answer.
    if (flags.migrateOnly) {
      throw new Stop('update --migrate-only is gone — an update replaces GrowOS\'s own machinery only and ' +
        'never changes business files. Anything that changes your own files is a separate command you run; ' +
        'the Doctor will tell you if one is needed. Nothing was changed', 2);
    }

    const source = args && args.length ? args[0] : null;
    if (!source) {
      throw new Stop('an update needs a file or an https:// link — none was given', 2);
    }

    // Before anything is fetched or extracted: the install's own scratch area
    // must be a real folder inside the install. Everything transient goes
    // through .growos/tmp (the download, the extract dir, every atomicWrite
    // temp file), and targz's containment check resolves STRINGS — so a
    // .growos/tmp symlinked into a business folder would land all of it inside
    // the owner's files while every check passed. Nothing of theirs is
    // overwritten and the cleanup removes what it made, but an update writing
    // inside a business folder at all is exactly what must not happen.
    // `.backups` takes the restore point; `.codex` is written by the mirror step
    // AFTER the guarded transaction, and is deliberately absent from the swap
    // plan (it is generated per install), so the touched-path check below never
    // sees it. All three are checked here, before anything is fetched.
    {
      const linked = restore.findSymlinkedPaths(root, ['.growos/tmp', '.backups', '.codex']);
      if (linked.length) {
        throw new Stop('one of GrowOS\'s own folders (' + linked.join(', ') + ') is a symbolic link, so an ' +
          'update would write through it to somewhere else. Remove or investigate the link first; ' +
          'nothing was changed', 2);
      }
    }

    // 1. Source -> local .tgz.
    const got = await fetch.fetchToTmp(source, root);
    downloadedTgz = got.downloaded ? got.path : null;
    emit.step(got.downloaded ? 'Downloaded the update file.' : 'Found the update file.');

    // 2. Verify: extract, read the package manifest, hash-check every payload
    //    file, confirm the product and the from-version. Nothing is changed yet.
    extractDir = path.join(root, '.growos', 'tmp', 'update-extract-' + newId());
    targz.extractTarGz(got.path, extractDir);

    const pmPath = path.join(extractDir, 'package-manifest.json');
    if (!isFile(pmPath)) throw new Stop('this file is not a GrowOS update (no package manifest inside) — nothing was changed', 2);
    let pkg;
    try { pkg = readJson(pmPath); } catch (_e) {
      throw new Stop('this update file is unreadable (its manifest is not valid) — nothing was changed', 2);
    }
    if (pkg.product !== 'growos') {
      throw new Stop('this update is not for GrowOS — nothing was changed', 2);
    }
    if (pkg.signature !== null && pkg.signature !== undefined) {
      throw new Stop('this update is signed but the signature cannot be verified here — nothing was changed', 2);
    }

    // 2a. THE PHASE-2 REFUSAL: an update replaces machinery only, so a package
    //     carrying migration code — or even declaring it — is not an update.
    //     Both signals are checked: a migrations map in the manifest (the old
    //     contract) and a migrations/ entry in the archive (the old payload).
    //     Interpreting either charitably is how business-file writes sneak back.
    {
      const declares = pkg.migrations && typeof pkg.migrations === 'object' &&
        Object.keys(pkg.migrations).length > 0;
      // The dir existing AT ALL is the signal — tar has no empty directories, so
      // its presence means the package shipped something under migrations/.
      let shipsDir = false;
      try { fs.readdirSync(path.join(extractDir, 'migrations')); shipsDir = true; } catch (_e) { shipsDir = false; }
      if (declares || shipsDir) {
        throw new Stop('this update carries changes to business files (migrations), and a GrowOS update ' +
          'never touches your business folders — it replaces GrowOS\'s own machinery only. ' +
          'This package cannot be installed; nothing was changed', 2);
      }
    }

    // The version becomes a backup PATH component (backupCustomization), so it must
    // be a plain semver before anything is touched — a manifest version of
    // "../../../outside" must never make a customization backup escape the folder.
    // Validate the package version and every declared from-version.
    if (typeof pkg.version !== 'string' || !VERSION_RE.test(pkg.version)) {
      throw new Stop('this update file has an invalid version — nothing was changed', 2);
    }
    const badFrom = (Array.isArray(pkg.from) ? pkg.from : []).find((v) => typeof v !== 'string' || !VERSION_RE.test(v));
    if (badFrom !== undefined) {
      throw new Stop('this update file lists an invalid from-version — nothing was changed', 2);
    }
    result.toVersion = pkg.version || null;

    const payloadDir = path.join(extractDir, 'payload');
    let verify;
    try { verify = await manifest.verifyDir(payloadDir, pkg); } catch (_e) {
      throw new Stop('this update file is damaged (its file list is invalid) — nothing was changed', 2);
    }
    if (!verify.ok) {
      throw new Stop('the update file looks damaged or was changed after it was made — nothing was changed', 2);
    }

    // 2b. EVERY payload file must be a machine file. Without
    //     this, a package could list a customer path (e.g. acme/work/social/x.md)
    //     and the swap would overwrite customer content, which restore points do
    //     not cover. system/VERSION + system/manifest.json are install-state and
    //     .codex/** is generated per-install, so none of those belong in a payload.
    for (const rel of Object.keys(pkg.files || {})) {
      // Classify every payload key on the SAME segment normalizer the path predicates
      // use (fsNormRel: lower-case, trailing dot/space stripped, NTFS :stream dropped),
      // so an OS-equivalent spelling is handled the way the filesystem resolves it —
      // otherwise `System/VERSION` or `.codex./hooks.json` passes isMachinePath (which
      // fsNorms) yet slips the raw-lowercase install-state/.codex checks and overwrites
      // install-state or the generated wiring.
      const norm = paths.fsNormRel(rel);
      // A package is authored with CANONICAL keys. A segment carrying a trailing dot/
      // space or an NTFS :stream is a noncanonical alias (`.codex./hooks.json`), never
      // a real shipped path — refuse it outright rather than try to interpret it.
      const canonical = String(rel).split(/[\\/]/).every((seg) => paths.fsNorm(seg) === String(seg).toLowerCase());
      const bad = !canonical ||
        !paths.isMachinePath(root, rel) ||
        INSTALL_STATE.some((s) => paths.fsNormRel(s) === norm) ||
        norm === 'system/manifest.json' || norm.indexOf('.codex/') === 0;
      if (bad) {
        throw new Stop('this update tries to write a file it should not (' + rel + ') — refusing; nothing was changed', 2);
      }
    }

    // 2b-i. A package must NEVER ship the owner's own .claude/settings.local.json
    //     (paths.isLocalOnlyFile) — it is a customer-MACHINE file, never a shipped
    //     one, even though it sits inside a machine directory by location. Without
    //     this refusal a malformed or malicious package could WRITE it directly,
    //     and a rollback afterward — which deliberately skips this path — would
    //     then preserve exactly those wrong bytes forever. Checked here, before
    //     anything is mutated, same as every other payload-shape refusal above.
    for (const rel of Object.keys(pkg.files || {})) {
      if (paths.isLocalOnlyFile(rel)) {
        throw new Stop('this update file tries to ship ' + rel + ', which belongs to your machine, not the product — nothing was changed', 2);
      }
    }

    // 2b-ii. A package must NEVER ship OVER an owner's custom skill. A
    //     payload key that currently resolves to a customer-authored skill folder
    //     (.claude/skills/<name>/… whose <name> GrowOS does not ship) and exists on
    //     disk would be overwritten by the swap — the swap treats it as machinery,
    //     but isCustomSkillPath says it is the owner's. Refuse the whole update; a
    //     name clash with a newly-shipped skill is resolved by renaming, never by
    //     silently replacing the owner's work.
    for (const rel of Object.keys(pkg.files || {})) {
      if (paths.isCustomSkillPath(root, rel) && isFile(absOf(root, rel))) {
        throw new Stop('this update would overwrite a skill you created (' + rel + ') — GrowOS never ships over your own skills; nothing was changed', 2);
      }
    }

    const currentVersion = readVersion(root);
    result.fromVersion = currentVersion;

    // 2c. THE 0.1-SHAPE REFUSAL (owner decision). All fourteen real 0.1 installs
    //     report system/VERSION as "2.0.0" (cmd-import.js's own header explains
    //     why), so the version string just read above is exactly the wrong thing
    //     to trust for telling a 0.1 folder apart from a real 2.0 one — an old
    //     install would otherwise sail straight through the from[] check below,
    //     since "2.0.0" is right there in almost every package's from[] list.
    //     Checked here, before that check, so a 0.1 folder is refused for the
    //     real reason rather than an unrelated-looking version mismatch (or, on
    //     a from[] list that happens to include "2.0.0", not refused at all).
    const shape = detectShape(root);
    if (shape.kind === 'install-0.1') {
      throw new Stop('this folder is the older GrowOS 0.1, not 2.0 (' + shape.why + ') — an update cannot ' +
        'be installed onto it. The path from here is `growos import`, which brings your business content ' +
        'into a fresh 2.0 install instead of updating in place; nothing was changed', 2);
    }

    const froms = Array.isArray(pkg.from) ? pkg.from : [];
    if (froms.indexOf(currentVersion) === -1) {
      throw new Stop('this update can\'t safely upgrade from your version (' + currentVersion + ') — nothing was changed', 2);
    }
    emit.step('Checked the update — this is GrowOS ' + pkg.version + ', and it can upgrade your ' + currentVersion + '.');

    // 3. Customization detection. Both CHANGED machine files and EXTRA files an
    //    owner dropped into a machine folder count as customizations to preserve —
    //    otherwise the swap would delete an owner-added machine file with no backup.
    //    The manifest itself, the generated .codex wiring, Obsidian's
    //    runtime files, and the owner's own .claude/settings.local.json (never
    //    shipped, so never a customization to "keep" — see paths.isLocalOnlyFile)
    //    are not customizations.
    let customized = [];
    const currentManifestPath = path.join(root, 'system', 'manifest.json');
    if (isFile(currentManifestPath)) {
      const currentManifest = manifest.loadManifest(currentManifestPath);
      const cmp = await manifest.compareManifest(root, currentManifest, restore.MACHINE_COVERED);
      const notACustomization = (p) => p === 'system/manifest.json' || p.indexOf('.codex/') === 0 ||
        /^\.obsidian\/(workspace.*\.json|.*\.json\.tmp|cache)$/.test(p) || paths.isLocalOnlyFile(p);
      const extras = cmp.extra.filter((p) => !notACustomization(p));
      customized = cmp.changed.concat(extras);
      emit.step(customized.length
        ? 'Found ' + customized.length + ' machine file(s) you added or customized — they will be kept.'
        : 'No customized machine files found.');
    } else {
      emit.step('No saved fingerprint found — I can not tell which machine files you customized, so any customizations get overwritten. Your full pre-update copy is still saved in the restore point, so nothing is lost and repair --restore can bring it back.');
    }
    const customizedSet = new Set(customized);

    // Plan the swap (needed for both dry-run and the real run).
    const installStateSet = new Set(INSTALL_STATE);
    const plan = await computePlan(root, payloadDir, pkg.files, installStateSet);

    // A machine-class KEY only says where the write is NAMED to land; a machine
    // directory swapped for a symlink into a business folder would carry the
    // swap's writes and deletes inside the owner's files. Refuse BEFORE the
    // restore point, over every path the swap would touch — including where a
    // customization backup would land, in case .backups itself grew a link.
    {
      const touched = plan.changed.concat(plan.added, plan.removed);
      const backupRels = touched
        .filter((rel) => customizedSet.has(rel))
        .map((rel) => '.backups/customizations/' + pkg.version + '/' + rel);
      const bad = restore.findSymlinkedPaths(root, touched.concat(backupRels));
      if (bad.length) {
        throw new Stop('a folder on the way to ' + bad.length + ' file(s) this update would touch is a ' +
          'symbolic link (' + bad.slice(0, 3).join(', ') + ') — writing through a link could land ' +
          'outside GrowOS\'s own files. Remove or investigate the link first; nothing was changed', 2);
      }
    }

    // --dry-run: steps 1-3 only, print the would-do list, change NOTHING.
    if (flags.dryRun) {
      result.action = 'dry-run';
      result.changed = plan.changed;
      result.added = plan.added;
      result.removed = plan.removed;
      result.customizations = customized.map((rel) => ({ relPath: rel, savedTo: null }));
      emit.step('Dry run — here is what an update would do:');
      emit.step('  Would change ' + plan.changed.length + ', add ' + plan.added.length + ', remove ' + plan.removed.length + ' machine file(s).');
      emit.step('  Would keep ' + customized.length + ' customization(s).');
      emit.step('  Would not touch your business folders — an update never writes inside them.');
      emit.step('Nothing was changed.');
      return finish(0);
    }

    // 4. Restore point (before anything on the live install is touched).
    let rp;
    try {
      rp = await restore.createRestorePoint(root, { fromVersion: currentVersion, toVersion: pkg.version });
    } catch (e) {
      throw new Stop(e.message + ' — nothing was changed', 2);
    }
    result.restorePoint = rp.dir;
    emit.step('Made a restore point.');

    // Steps 5-6 are ONE all-or-nothing transaction: swap the machine files, then
    // commit the new version. ANY failure inside rolls the machine set back from
    // the restore point, so a customer can never be left half-updated — not even
    // if the version write fails partway.
    const wroteAdded = [];
    try {
      // 5. Swap: install payload files, delete machine files the package dropped,
      //    preserving any customization to .backups/customizations/<version>/ first.
      // The precheck above described the tree's shape once; these re-check each
      // path as it is about to be written or deleted, so a link appearing partway
      // through the swap is caught rather than followed. Not race-free — nothing
      // short of an OS-level open-and-verify would be — but the window shrinks
      // from "the whole swap" to "one path check".
      const addedSet = new Set(plan.added);
      for (const key of plan.changed.concat(plan.added)) {
        restore.assertNoSymlinkedPaths(root, [key]);
        if (customizedSet.has(key) && isFile(absOf(root, key))) {
          const savedTo = backupCustomization(root, pkg.version, key);
          result.customizations.push({ relPath: key, savedTo });
        }
        // "added" was decided ONCE, at plan time. A file that has APPEARED at
        // this path since — a sync client landing an owner customization mid-
        // update — is not in the restore point and would be overwritten with
        // no copy anywhere. Re-check at the write, and
        // preserve foreign bytes exactly like a changed file's customization.
        if (addedSet.has(key) && isFile(absOf(root, key))) {
          const nowHash = await manifest.hashFile(absOf(root, key));
          if (nowHash !== pkg.files[key]) {
            try {
              const savedTo = backupCustomization(root, pkg.version, key);
              result.customizations.push({ relPath: key, savedTo });
            } catch (bkErr) {
              // A failed backup here must NOT fall into the transaction
              // rollback with the appeared file unbacked: the file is absent
              // from the restore point, so the rollback's extra-file sweep
              // would delete the owner's only copy.
              // One rescue copy OUTSIDE the machine set, then abort.
              const rescue = path.join(root, 'appeared-file-rescue-' + Date.now() + '-' +
                path.basename(key));
              try {
                fs.copyFileSync(absOf(root, key), rescue);
              } catch (rescueErr) {
                throw new Stop('a file appeared at ' + key + ' during the update, its backup failed (' +
                  (bkErr && bkErr.message ? bkErr.message : String(bkErr)) + '), and so did the rescue copy (' +
                  (rescueErr && rescueErr.message ? rescueErr.message : String(rescueErr)) + ') — the update ' +
                  'stops here and the rollback may remove that file. If it matters, copy it out of ' + key +
                  ' yourself before running the update again', 2);
              }
              throw new Stop('a file appeared at ' + key + ' during the update and its backup failed (' +
                (bkErr && bkErr.message ? bkErr.message : String(bkErr)) + '). A rescue copy was saved to ' +
                path.basename(rescue) + ' at the GrowOS folder root; the update rolled back. Check the ' +
                'rescue copy, fix .backups\' permissions, and run the update again', 2);
            }
          }
        }
        atomic.atomicWrite(absOf(root, key), fs.readFileSync(absOf(payloadDir, key)));
        if (addedSet.has(key)) wroteAdded.push(key);
      }
      for (const key of plan.removed) {
        restore.assertNoSymlinkedPaths(root, [key]);
        if (customizedSet.has(key) && isFile(absOf(root, key))) {
          const savedTo = backupCustomization(root, pkg.version, key);
          result.customizations.push({ relPath: key, savedTo });
        }
        fs.rmSync(absOf(root, key), { force: true });
      }
      // A removal can empty a directory — a retired skill's whole folder, most
      // often. Leaving it behind is litter a later rollback then has to
      // distrust (an empty folder is nobody's skill — restore.js), so the
      // update removes what it emptied: climb from each
      // removed file's folder and drop directories that are now empty,
      // stopping at the install root or the first non-empty parent. rmdirSync
      // refuses a non-empty directory by contract, so this can never take
      // anything but an empty shell — and any error simply stops the climb.
      for (const key of plan.removed) {
        let dir = path.dirname(absOf(root, key));
        const stop = path.resolve(root);
        while (path.resolve(dir) !== stop) {
          let ents;
          try { ents = fs.readdirSync(dir); } catch (_e) { break; }
          if (ents.length !== 0) break;
          try { fs.rmdirSync(dir); } catch (_e) { break; }
          dir = path.dirname(dir);
        }
      }
      result.changed = plan.changed;
      result.added = plan.added;
      result.removed = plan.removed;
      emit.step('Swapped in the new machine files (' + plan.changed.length + ' changed, ' + plan.added.length + ' added, ' + plan.removed.length + ' removed).');

      // 6. Commit the new version — the point of no return for the machine update.
      //    SPEC §1: the manifest fingerprints EVERY machine file. The package ships
      //    the payload files; system/VERSION is install-state (not shipped), so its
      //    fingerprint is added here from the freshly-written file. system/manifest.json
      //    cannot hold its own hash, so it is the only omission (Doctor accounts for it).
      // These two are install-state, so they are absent from the swap plan and
      // got none of its per-write checks — yet they are still writes into
      // system/. Checked here for the same reason as every other write.
      //
      // BOUND through the library seam (update.test.js z1g wraps
      // restore.assertNoSymlinkedPaths and proves the manifest write gets its
      // OWN check after the VERSION write). An earlier comment here claimed
      // the mid-transaction state was untestable without a product seam;
      // A later review was right that the claim was false — the library
      // function IS the seam, the same way the bench wraps fs elsewhere.
      restore.assertNoSymlinkedPaths(root, INSTALL_STATE);
      const versionPath = path.join(root, 'system', 'VERSION');
      atomic.atomicWrite(versionPath, pkg.version + '\n');
      const newManifestFiles = Object.assign({}, pkg.files);
      newManifestFiles['system/VERSION'] = await manifest.hashFile(versionPath);
      // Re-checked immediately before ITS OWN write: the check above covered the
      // VERSION write, and a read plus a hash happen in between. Per-write means
      // per write, not once per pair.
      restore.assertNoSymlinkedPaths(root, ['system/manifest.json']);
      manifest.saveManifest({ files: newManifestFiles }, path.join(root, 'system', 'manifest.json'));
      emit.step('Set your version to ' + pkg.version + '.');
    } catch (txErr) {
      // The files this run ADDED are not in the restore point, and a NEW
      // shipped skill's name is not in the running (old) baked roster — so
      // without this cleanup the rollback would preserve a half-landed new
      // skill as "the owner's" inside a reportedly-rolled-back install.
      // Remove exactly what this run wrote, hash-gated:
      // only bytes that are provably the package's are ours to remove.
      for (const key of wroteAdded) {
        try {
          const abs = absOf(root, key);
          const bytes = fs.readFileSync(abs);
          if (crypto.createHash('sha256').update(bytes).digest('hex') === pkg.files[key]) {
            fs.rmSync(abs, { force: true });
            let dir = path.dirname(abs);
            const stop = path.resolve(root);
            while (path.resolve(dir) !== stop) {
              let ents;
              try { ents = fs.readdirSync(dir); } catch (_e) { break; }
              if (ents.length !== 0) break;
              try { fs.rmdirSync(dir); } catch (_e) { break; }
              dir = path.dirname(dir);
            }
          }
        } catch (_e) { /* absent or changed since: not ours to remove */ }
      }
      await restore.fullRollback(root, rp.dir);
      const why = txErr && txErr.message ? txErr.message : String(txErr);
      throw new Stop('the update did not finish, so the whole thing was rolled back — nothing was lost. Details: ' + why, 2);
    }

    // The mirror can RUN but still fail (a skill lint error, a parity mismatch).
    // Reporting "Refreshed the Codex mirror" on a non-zero code is exactly the
    // "announces success while broken" trap — check the code, not just ran.
    const mir = await lazyRun(root, 'mirror', ctx);
    let mirrorWarned = false;
    if (!mir.ran) {
      // Absent only happens on a partial/dev install (all sibling commands ship
      // together in a real one). The Doctor's twin-parity check is the backstop.
      emit.step('Mirror step skipped (' + mir.reason + ') — run: node system/tools/growos.js mirror');
    } else if (mir.code && mir.code !== 0) {
      // The dangerous case: mirror RAN but did not finish cleanly. Never report
      // this as success — Codex could be left out of sync.
      emit.step('The Codex mirror did NOT finish cleanly — Claude works, but Codex may be out of sync. Run: node system/tools/growos.js doctor, then mirror.');
      mirrorWarned = true;
    } else {
      emit.step('Refreshed the Codex mirror.');
    }
    const doc = await lazyRun(root, 'doctor', ctx);
    if (doc.ran) emit.step('Ran the Doctor.');

    // The swap succeeded; a failed mirror is a warning (exit 1), never a silent
    // success and never a false failure.
    if (mirrorWarned) {
      result.warnings = (result.warnings || []).concat(['mirror']);
      return finish(1);
    }
    return finish(0);
  } catch (err) {
    const stop = err instanceof Stop ? err : new Stop('the update stopped unexpectedly: ' + err.message, 2);
    result.ok = false;
    result.stopped = { reason: stop.reason };
    emit.step(stop.reason);
    return finish(stop.code);
  } finally {
    if (extractDir) { try { fs.rmSync(extractDir, { recursive: true, force: true }); } catch (_e) { /* best effort */ } }
    if (downloadedTgz) { try { fs.rmSync(downloadedTgz, { force: true }); } catch (_e) { /* best effort */ } }
  }
}

module.exports = { name: 'update', summary: 'Install a GrowOS update from a file or link (verify, back up, swap machinery only).', run };
