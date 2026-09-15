'use strict';

/**
 * sealed.js — sealed shipped assets (Build Doc P4.1).
 *
 * A deliverable is ONE markdown file; its parts — drafts, metadata, renders —
 * live in an underscore folder beside it and never enter the queue. But a part
 * is not automatically scratch: a publishing skill uploads a media file the
 * approved markdown references, and checking only that the path EXISTS lets a
 * render change after approval and still ship. So any asset that will actually
 * be published carries its SHA-256 in the approved file:
 *
 *   sealed:
 *     - _promo/final.mp4 sha256:<64 hex>
 *     - _promo/thumb.jpg sha256:<64 hex>
 *
 * Paths are POSIX, relative to the deliverable's own folder, and may only name
 * parts space (an underscore folder) inside the same business. The seal rides
 * in the frontmatter, so the approved snapshot freezes it with everything
 * else, and "recheck before upload" is a comparison against the exact bytes
 * the owner said yes to. Anything in a parts folder without a sealed hash can
 * never be published — that rule lives in the publishing skills and, from
 * Phase 5, in the publish step itself; the Doctor watches the seal meanwhile.
 *
 * Deliberately NOT a folder manifest (Build Doc P4.1): one line per shipped
 * asset. The manifest version needed exact-set comparison, symlink and
 * canonical-path rules, and same-byte republishing across the guard,
 * snapshots, publishing and rollback at once — more machinery than the
 * problem deserves.
 *
 * fm.js treats a block-style value as PRESENT and never rewrites it, so the
 * sealed block survives every stamp and setField byte-for-byte; this module
 * is the one parser of those lines.
 *
 * PRODUCT code: Node >= 18, stdlib only, no npm, no shelling out. Windows-safe.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const paths = require('./paths.js');
const ops = require('./operations.js');
const fm = require('./fm.js');

/** `<path> sha256:<64 lowercase hex>` — the whole entry, nothing optional. */
const ENTRY = /^(.*\S)\s+sha256:([0-9a-f]{64})$/;

/**
 * parseSealed(text) -> { entries: [{ path, sha256 }], problems: [string] }
 *
 * Reads ONLY the block list under a top-level `sealed:` key inside the
 * frontmatter. No sealed key is a normal deliverable (nothing ships from its
 * parts). A malformed line is a PROBLEM, never skipped: a seal that cannot be
 * read is a seal that cannot be checked, and silently ignoring it would let
 * exactly the unchecked asset ship.
 *
 * THE KEY IS FOUND THE WAY fm.js FINDS IT — same fence rule (trailing
 * spaces/CR tolerated), same BOM handling, same key regex, same
 * canonicalizeKey — because the failure mode the Phase-4 review caught was
 * precisely a split: fm.getField saw a spaced or quoted `sealed` key (so the
 * Doctor went to verify) while this parser's stricter spelling saw nothing,
 * and an approved item verified clean with zero checks run. The invariant the
 * bench binds: whenever fm sees a sealed key, this returns entries or
 * problems, never both empty.
 */
function parseSealed(text) {
  const entries = [];
  const problems = [];
  const s = String(text).replace(/^﻿/, '');
  const lines = s.split('\n');
  if (!/^---[ \t]*\r?$/.test(lines[0] === undefined ? '' : lines[0])) return { entries, problems };
  let close = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') { close = i; break; }
  }
  if (close === -1) return { entries, problems };

  const keyLines = [];
  for (let i = 1; i < close; i++) {
    const line = lines[i].replace(/\r$/, '');
    const m = line.match(/^([^\s:#][^:]*?)\s*:\s*(.*)$/);
    if (m && fm.canonicalizeKey(m[1]) === 'sealed') keyLines.push({ idx: i, value: m[2].trim() });
  }
  if (keyLines.length === 0) return { entries, problems };
  if (keyLines.length > 1) {
    problems.push('the label has more than one sealed: line, so which list is the seal depends on who ' +
      'reads it — keep exactly one');
    return { entries, problems };
  }
  if (keyLines[0].value !== '') {
    problems.push('the sealed: line carries a value of its own ("' + keyLines[0].value + '") — sealed is a ' +
      'list, one "- <file> sha256:<hash>" line per shipped asset');
    return { entries, problems };
  }

  for (let j = keyLines[0].idx + 1; j < close; j++) {
    const line = lines[j].replace(/\r$/, '');
    if (/^\s*$/.test(line)) continue;
    // A YAML comment at ANY indent — fm.js ignores them, so this must too.
    if (/^\s*#/.test(line)) continue;
    if (!/^\s/.test(line)) {
      // Only a REAL next field ends the block. A column-zero line that is
      // neither a comment nor a key is junk fm.js would skip — breaking on it
      // silently orphaned every entry below, so it is a problem instead.
      if (/^([^\s:#][^:]*?)\s*:\s*(.*)$/.test(line)) break;
      problems.push('sealed line ' + JSON.stringify(line.trim()) + ' is not an entry, a comment, or the ' +
        'next field, so the list below it cannot be trusted as read');
      continue;
    }
    const item = line.match(/^\s+-\s*(.*)$/);
    if (!item) {
      problems.push('sealed line ' + JSON.stringify(line.trim()) + ' is not a "- <file> sha256:<hash>" entry');
      continue;
    }
    const parsed = item[1].match(ENTRY);
    if (!parsed) {
      problems.push('sealed entry ' + JSON.stringify(item[1]) + ' is not "<file> sha256:<64-character hash>", ' +
        'so this asset cannot be checked');
      continue;
    }
    entries.push({ path: parsed[1], sha256: parsed[2] });
  }
  // An EMPTY block is "started and never finished", and it satisfies fm.js's
  // presence check — leaving it silent let two empty lists verify each
  // other. Named, never guessed at.
  if (entries.length === 0 && problems.length === 0) {
    problems.push('the sealed: list is empty — it seals nothing. Add the shipped files as ' +
      '"- <file> sha256:<hash>" lines, or remove the sealed: line');
  }
  return { entries, problems };
}

/**
 * verifySealed(root, business, itemRel, text) -> [problem strings]
 *
 * `itemRel` is the deliverable's path relative to the business folder
 * ("work/social/promo.md"). Empty result = every sealed asset is exactly the
 * bytes that were sealed, sitting as an ordinary file in parts space inside
 * this business. Every judgment is spelled out rather than reduced to a
 * boolean, because the owner reads these.
 *
 * The place rules repeat a lesson this build keeps re-learning: a NAME is not
 * a DESTINATION. The path is validated (ops.pathProblem — the runner's own
 * rule), required to be sidecar space (paths.isWorkSidecar), lstat'ed so a
 * link cannot stand in for the bytes, and resolved so a linked ancestor
 * cannot send the check somewhere else.
 */
function verifySealed(root, business, itemRel, text) {
  const { entries, problems } = parseSealed(text);
  const out = problems.slice();
  const baseRel = path.posix.dirname(paths.toPosix(String(itemRel)));

  for (const e of entries) {
    const problem = ops.pathProblem(e.path);
    if (problem) {
      out.push('"' + e.path + '" cannot be used as a sealed path: ' + problem);
      continue;
    }
    const rel = baseRel === '.' ? e.path : baseRel + '/' + e.path;
    if (!paths.isWorkSidecar(root, business + '/' + rel)) {
      out.push('"' + e.path + '" is not in a parts folder — only files in the deliverable\'s underscore ' +
        'folder (like _promo/) can be sealed and shipped');
      continue;
    }
    const abs = path.join(String(root), business, ...rel.split('/'));
    let st;
    try { st = fs.lstatSync(abs); } catch (_) {
      out.push(e.path + ' is sealed into this deliverable but is not there');
      continue;
    }
    if (!st.isFile()) {
      out.push(e.path + ' is not an ordinary file (a link or a folder), so it cannot be the sealed bytes');
      continue;
    }
    // Every DIRECTORY on the way from the business folder to the file must be
    // real too: a symlinked folder inside `_promo/` reads
    // as parts space lexically while the file physically lives elsewhere —
    // lstat on the leaf and inside-the-business containment both pass, and
    // only this walk catches the disguise. A NAME is not a DESTINATION.
    {
      let cur = path.join(String(root), business);
      let linked = null;
      for (const seg of rel.split('/').slice(0, -1)) {
        cur = path.join(cur, seg);
        let ls = null;
        try { ls = fs.lstatSync(cur); } catch (_) { break; }
        if (ls.isSymbolicLink()) { linked = seg; break; }
      }
      if (linked !== null) {
        out.push(e.path + ' passes through a linked folder (' + linked + ') — the file it names does not ' +
          'really live in the deliverable\'s parts space, so it cannot be sealed from there');
        continue;
      }
    }
    const bizReal = paths.realpathBestEffort(path.join(String(root), business));
    const absReal = paths.realpathBestEffort(abs);
    if (absReal !== bizReal && absReal.indexOf(bizReal + path.sep) !== 0) {
      out.push(e.path + ' resolves outside ' + business + ', so it is not this deliverable\'s asset');
      continue;
    }
    let bytes;
    try { bytes = fs.readFileSync(abs); } catch (err) {
      out.push(e.path + ' could not be read (' + (err && err.message ? err.message : String(err)) + '), so the seal cannot be checked');
      continue;
    }
    if (crypto.createHash('sha256').update(bytes).digest('hex') !== e.sha256) {
      out.push(e.path + ' is no longer the bytes that were sealed into this deliverable — it changed ' +
        'after the seal was written, so what would ship is not what was approved');
    }
  }
  return out;
}

module.exports = { parseSealed, verifySealed };
