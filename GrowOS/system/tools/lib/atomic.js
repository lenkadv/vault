'use strict';

/**
 * atomic.js - crash-safe file writes (SPEC section 2).
 *
 * Rule: product code never writes a file in place. atomicWrite puts the full
 * content in a temp file first and then renames it over the target, so any
 * reader (or any crash) ever sees either the complete old file or the complete
 * new file - never half of one.
 *
 * Temp file location, in order of preference:
 *   1. <install root>/.growos/tmp/<name>.<random>.tmp - when the target lives
 *      inside a GrowOS install AND that folder is on the same volume as the
 *      target (rename is only atomic within one volume).
 *   2. <target>.growos-tmp - a sibling next to the target (always the same
 *      volume). The Doctor sweeps up any "*.growos-tmp" leftovers from a
 *      killed process, so this name is part of the contract.
 *
 * Honest scope: this protects against crashes and concurrent readers, which is
 * what a single-machine markdown product needs. It does not fsync, so it is
 * not a power-loss-during-kernel-flush guarantee.
 */

const fs = require('fs');
const path = require('path');
const { newId } = require('./ids.js');

/**
 * renameReplace(tmp, target) - rename tmp over target, with the Windows fallback
 * that manifest.js and targz.js also use. On POSIX, rename atomically replaces an
 * existing target. On Windows, renaming over an existing file can throw EEXIST or
 * EPERM, so on those codes we remove the target and rename again. Windows is a
 * first-class platform and almost every product write replaces an existing file
 * (hook stamps, heartbeat, bookmark, setup wiring, owner-run job writes, the
 * update swap, rollback), so this fallback lives in the shared writer, not per
 * caller.
 */
function renameReplace(tmp, target) {
  try {
    fs.renameSync(tmp, target);
  } catch (err) {
    if (err && (err.code === 'EEXIST' || err.code === 'EPERM')) {
      // Do NOT delete the only live copy and hope the next rename works — if it
      // then fails or the process dies, the target is gone. Move the
      // current file ASIDE first, put the new one in place, and only then drop
      // the aside copy; if the swap fails, restore the original. A crash mid-swap
      // leaves the old bytes recoverable as "<target>.growos-bak", never nothing.
      const backup = target + '.growos-bak';
      try { fs.rmSync(backup, { force: true }); } catch (_) { /* stale */ }
      fs.renameSync(target, backup);
      try {
        fs.renameSync(tmp, target);
      } catch (err2) {
        try { fs.renameSync(backup, target); } catch (_) { /* leave the .growos-bak for recovery */ }
        throw err2;
      }
      try { fs.rmSync(backup, { force: true }); } catch (_) { /* best effort */ }
      return;
    }
    throw err;
  }
}

/** Walk up from dir looking for the install marker; null instead of throwing. */
function findRootOrNull(dir) {
  let d = path.resolve(String(dir));
  for (;;) {
    try {
      if (fs.statSync(path.join(d, 'system', 'VERSION')).isFile()) return d;
    } catch (_) { /* keep walking */ }
    const parent = path.dirname(d);
    if (parent === d) return null;
    d = parent;
  }
}

/**
 * atomicWrite(targetPath, content) -> undefined. Throws on failure, and on
 * failure the target is untouched and no temp litter is left behind.
 * content may be a string (written as UTF-8) or a Buffer. Missing parent
 * folders of the target are created.
 */
function atomicWrite(targetPath, content) {
  const target = path.resolve(String(targetPath));
  const dir = path.dirname(target);
  fs.mkdirSync(dir, { recursive: true });

  // Pick the temp location: .growos/tmp on the same volume, else a sibling.
  let tmp = null;
  const root = findRootOrNull(dir);
  if (root) {
    const tmpDir = path.join(root, '.growos', 'tmp');
    try {
      fs.mkdirSync(tmpDir, { recursive: true });
      if (fs.statSync(tmpDir).dev === fs.statSync(dir).dev) {
        tmp = path.join(tmpDir, path.basename(target) + '.' + newId() + '.tmp');
      }
    } catch (_) {
      tmp = null; // fall through to the sibling strategy
    }
  }
  if (!tmp) tmp = target + '.growos-tmp';

  try {
    fs.writeFileSync(tmp, content);
    renameReplace(tmp, target);
    return;
  } catch (err) {
    try { fs.unlinkSync(tmp); } catch (_) { /* already gone */ }
    // Belt and braces: if the volumes differed after all, retry via a sibling.
    if (err && err.code === 'EXDEV' && !tmp.endsWith('.growos-tmp')) {
      const sibling = target + '.growos-tmp';
      try {
        fs.writeFileSync(sibling, content);
        renameReplace(sibling, target);
        return;
      } catch (err2) {
        try { fs.unlinkSync(sibling); } catch (_) { /* already gone */ }
        throw err2;
      }
    }
    throw err;
  }
}

/**
 * atomicAppend(filePath, line) -> undefined. Appends one line (a trailing
 * newline is added when missing) for JSONL logs. Missing parent folders are
 * created.
 *
 * Why plain O_APPEND is safe enough here: opening with the append flag makes
 * the kernel position EVERY write at the current end of file in one atomic
 * step, so two appenders can never overwrite each other, and the whole line
 * goes out in a single write() call so lines never interleave at the sizes a
 * logbook produces. This is a single-machine product with one hook or tool
 * writing at a time; the worst realistic failure is a process killed mid-write
 * leaving a torn FINAL line, which logbook.readAll tolerates and reports
 * (corruptTail) instead of breaking.
 *
 * The record LEADS with a newline as well. A torn final
 * line has no trailing newline, so the next append used to fuse onto it and
 * become unparseable itself — the new record then vanished with the damaged
 * one, while its caller reported success. Inspecting the last byte first and
 * appending after would be a check-then-act with the same race in the gap;
 * always leading costs at most one blank line, which logbook.readAll already
 * skips. `cmd-restamp.js` fixed its own writer this way; this is the
 * same fix in the shared appender every other caller uses.
 */
function atomicAppend(filePath, line) {
  const p = path.resolve(String(filePath));
  fs.mkdirSync(path.dirname(p), { recursive: true });
  let s = '\n' + String(line);
  if (!s.endsWith('\n')) s += '\n';
  const fd = fs.openSync(p, 'a');
  try {
    fs.writeSync(fd, s, null, 'utf8');
  } finally {
    fs.closeSync(fd);
  }
}

module.exports = { atomicWrite, atomicAppend };
