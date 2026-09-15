'use strict';

/**
 * cmd-repair.js — `growos repair [--restore <path>]`  (system/tools/lib/,
 * SPEC §6.4).
 *
 * PRODUCT code: Node >= 18, stdlib only, no npm, no shelling out. Conforms to
 * the dispatcher contract: module.exports = { name, summary, run(args, ctx) }
 * returning an integer exit code (0 green, 1 yellow, 2 red).
 *
 * Two modes:
 *   default            Find machine files whose bytes no longer match the
 *                      current system/manifest.json (damage: corruption, a
 *                      half-finished sync, a stray edit) and re-copy each from a
 *                      restore point whose copy matches today's manifest. Only
 *                      those files are touched; customer files are never touched.
 *   --restore <path>   Full rollback of the MACHINE SET from that restore point —
 *                      the exact routine an update uses to recover, shared via
 *                      lib/restore.js. It never writes inside a business folder:
 *                      updates replace machinery only, so a restore point holds
 *                      no customer files and a rollback restores none.
 *
 * Honest dead-end: with no restore point AND no intact manifest to compare
 * against, repair says so plainly ("re-download the product zip; your business
 * folders are safe to carry over") rather than pretend it can fix things.
 */

const fs = require('node:fs');
const path = require('node:path');

const manifest = require('./manifest.js');
const atomic = require('./atomic.js');
const paths = require('./paths.js');
const restore = require('./restore.js');
const { makeReporter } = require('./report.js');

function isFile(p) { try { return fs.statSync(p).isFile(); } catch (_e) { return false; } }
function isDir(p) { try { return fs.statSync(p).isDirectory(); } catch (_e) { return false; } }
function absOf(root, relPosix) { return path.join(String(root), ...relPosix.split('/')); }

/** Resolve the restore-point path for --restore (flag value, or first arg). */
function restoreArg(args, flags) {
  if (typeof flags.restore === 'string' && flags.restore !== '') return flags.restore;
  if (flags.restore && args && args.length) return args[0];
  return null;
}

/* ------------------------------ --restore mode ---------------------------- */

async function runRestore(root, restorePath, reporter) {
  const dir = path.resolve(String(restorePath));
  if (!isDir(dir)) {
    reporter.red('That restore point does not exist.', 'Looked for: ' + dir, 'Check the path and try again.');
    return reporter;
  }
  const rj = restore.readRestoreJson(dir);
  if (!rj || rj.verified !== true) {
    reporter.red('That restore point is not marked as verified.', 'It may be incomplete.', 'Pick a different restore point under .backups/.');
    return reporter;
  }
  // Confirm the point's own copy still matches its manifest before trusting it
  // to roll back over your live files.
  {
    const manPath = path.join(dir, 'manifest.json');
    const machineDir = path.join(dir, 'machine');
    if (!isFile(manPath) || !isDir(machineDir)) {
      reporter.red('That restore point is missing its machine copy.', '', 'Pick a different restore point, or re-download the product zip.');
      return reporter;
    }
    const selfCheck = await manifest.verifyDir(machineDir, manifest.loadManifest(manPath));
    if (!selfCheck.ok) {
      reporter.red('That restore point is damaged and cannot be trusted.', '', 'Pick a different restore point, or re-download the product zip.');
      return reporter;
    }
  }

  const done = await restore.fullRollback(root, dir);
  const machineCount = done.machine ? done.machine.restored.length : 0;
  // The protection has to be reported where the OWNER reads it, not only in
  // the return object: a restore point can hold
  // an old shipped skill under a name that is theirs now, and the rollback
  // deliberately leaves their skill alone — silence here read as "everything
  // was rolled back", which is not what happened.
  const skipped = (done.machine && done.machine.skipped) || [];
  if (skipped.length) {
    reporter.yellow('Your own skill was left alone, on purpose',
      skipped.join(', ') + ' — the restore point holds an old shipped skill under a name that is yours ' +
      'now, and rolling that back would overwrite your work.',
      'Nothing to do. This is the protection working; your skill is untouched.');
  }
  reporter.green(
    'Rolled the machine files back from the restore point.',
    'Restored ' + machineCount + ' machine file(s); your version was set back too. Your business folders ' +
    'were not touched.' + (skipped.length ? ' ' + skipped.length + ' file(s) of your own skill were left alone — see above.' : ''),
    'none'
  );
  return reporter;
}

/* ------------------------------- default mode ----------------------------- */

async function runDefault(root, reporter) {
  const manPath = path.join(String(root), 'system', 'manifest.json');
  if (!isFile(manPath)) {
    reporter.red(
      'There is no fingerprint file to check your machine files against.',
      'system/manifest.json is missing.',
      'Re-download the product zip; your business folders are safe to carry over.'
    );
    return reporter;
  }

  let currentManifest;
  try { currentManifest = manifest.loadManifest(manPath); } catch (e) {
    reporter.red('The fingerprint file is unreadable.', e.message, 'Re-download the product zip; your business folders are safe to carry over.');
    return reporter;
  }

  // Repair WRITES whatever the fingerprint file says is damaged, so the file
  // must only ever name machine paths. A poisoned/corrupted manifest naming a
  // business path would otherwise walk a matching restore-point copy straight
  // over the owner's work (the same class trap as a poisoned restore
  // point). One bad key means the whole file cannot be trusted: refuse.
  {
    const outOfClass = Object.keys(currentManifest.files || {})
      .filter((rel) => !paths.isMachinePath(String(root), rel));
    if (outOfClass.length) {
      reporter.red(
        'The fingerprint file names paths outside GrowOS\'s own files, so it cannot be trusted.',
        'For example: ' + outOfClass.slice(0, 3).join(', '),
        'Nothing was changed. Re-download the product zip; your business folders are safe to carry over.'
      );
      return reporter;
    }
  }

  const cmp = await manifest.compareManifest(root, currentManifest, restore.MACHINE_COVERED);
  const damaged = cmp.changed.concat(cmp.missing).sort((a, b) =>
    Buffer.compare(Buffer.from(a, 'utf8'), Buffer.from(b, 'utf8')));

  if (damaged.length === 0) {
    reporter.green('All machine files match their fingerprints.', 'Nothing needs repair.', 'none');
    return reporter;
  }

  const points = restore.listRestorePoints(root).filter((p) => p.restoreJson && p.restoreJson.verified && isDir(path.join(p.dir, 'machine')));
  if (points.length === 0) {
    reporter.red(
      'Some machine files are damaged and there is no restore point to fix them from.',
      'Damaged: ' + damaged.join(', '),
      'Re-download the product zip; your business folders are safe to carry over.'
    );
    return reporter;
  }

  // A repair write must not pass through a symlink either — a machine dir
  // swapped for a link into a business folder would carry a correctly-named
  // repair inside the owner's files (restore.js draws the same line).
  {
    const linked = restore.findSymlinkedPaths(String(root), damaged);
    if (linked.length) {
      reporter.red(
        'A folder on the way to ' + linked.length + ' damaged file(s) is a symbolic link.',
        'For example: ' + linked.slice(0, 3).join(', ') + '. Writing through a link could land outside GrowOS\'s own files.',
        'Nothing was changed. Remove or investigate the link, then run repair again.'
      );
      return reporter;
    }
  }

  for (const rel of damaged) {
    const want = currentManifest.files[rel];
    const source = await restore.findRepairCopy(root, rel, want);
    if (source) {
      // Re-checked per write, not just once above: a link appearing partway
      // through a repair would otherwise be followed for the remaining files.
      restore.assertNoSymlinkedPaths(String(root), [rel]);
      atomic.atomicWrite(absOf(root, rel), fs.readFileSync(source));
      reporter.green('Repaired ' + rel + '.', 'Restored from a matching backup copy.', 'none');
    } else {
      reporter.red(
        'Could not repair ' + rel + '.',
        'No backup holds a clean copy that matches the current version.',
        'Re-download the product zip; your business folders are safe to carry over.'
      );
    }
  }
  return reporter;
}

/* --------------------------------- entry ---------------------------------- */

async function run(args, ctx) {
  const root = ctx && ctx.root ? String(ctx.root) : process.cwd();
  const flags = (ctx && ctx.flags) || {};
  const reporter = makeReporter({ json: !!flags.json });

  const restorePath = restoreArg(args || [], flags);
  try {
    if (flags.restore) {
      if (!restorePath) {
        reporter.red('Which restore point?', 'Pass the folder path.', 'growos repair --restore .backups/restore-<version>-<time>');
      } else {
        await runRestore(root, restorePath, reporter);
      }
    } else {
      await runDefault(root, reporter);
    }
  } catch (e) {
    reporter.red('Repair stopped unexpectedly.', e.message, 'Try again, or re-download the product zip; your business folders are safe.');
  }

  reporter.print();
  return reporter.exitCode();
}

module.exports = { name: 'repair', summary: 'Fix damaged machine files from a restore point, or roll a whole update back.', run };
