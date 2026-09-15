'use strict';

/**
 * reconcile-core.js - the shared catch-up engine (SPEC section 6.6, 4.4).
 *
 * THE API IS LOCKED (the SessionStart guard requires this exact shape):
 *
 *     reconcile(root, { quiet }) -> { appended: <int>, summaryLines: string[] }
 *
 * It is fully synchronous (no promises): SessionStart must finish in well under
 * two seconds, so it reads files directly and skips work with an mtime gate.
 *
 * For every business it looks at each work item that changed since the last
 * reconcile watermark and, by comparing the item against its frozen snapshot
 * and the logbook's own history, records the changes the OWNER made outside a
 * logged AI event:
 *   - a status that moved with no matching logged flip  -> a `flip` event
 *     (actor "owner" when a snapshot exists, "unknown" when it does not),
 *     tagged detected:"reconcile";
 *   - a body that differs from the snapshot -> one `edited` event carrying a
 *     unified diff (capped at 8 KB, SPEC section 5.4) and the diff's sha256 as
 *     `diffHash`, de-duplicated so the same edit is never logged twice;
 *   - a `note` that became non-empty vs the snapshot -> a `note` event.
 *
 * summaryLines is the <=5-line plain-word catch-up shared with SessionStart:
 * only attention-worthy lines (items waiting per business, a count of the
 * owner's out-of-session changes, and any red flags). Empty when nothing needs
 * the owner's attention.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const fm = require('./fm.js');
const diff = require('./diff.js');
const logbook = require('./logbook.js');
const paths = require('./paths.js');
const { atomicWrite } = require('./atomic.js');

const WATERMARK_REL = path.join('.growos', 'reconcile-watermark.json');
const LEGAL_STATUSES = ['draft', 'review', 'changes', 'approved', 'published', 'rejected'];

/** sha256 hex of a string (for stable diff de-duplication). */
function sha256(s) {
  return crypto.createHash('sha256').update(String(s)).digest('hex');
}

/** Read the reconcile watermark: { perBusiness: { slug: ISO } }. */
function readWatermark(root) {
  try {
    const parsed = JSON.parse(fs.readFileSync(path.join(root, WATERMARK_REL), 'utf8'));
    if (parsed && parsed.perBusiness && typeof parsed.perBusiness === 'object') return parsed;
  } catch (_) { /* missing or unreadable -> start fresh */ }
  return { perBusiness: {} };
}

function writeWatermark(root, wm) {
  atomicWrite(path.join(root, WATERMARK_REL), JSON.stringify(wm) + '\n');
}

/** Every work item under <business>/work/, abs paths — paths.isWorkItem is the
 * one definition, so this walker can never disagree with the guard or the
 * Doctor about what is an item (sidecar parts folders, briefs and the shipped
 * work/README.md are not). */
function listItemFiles(root, business) {
  const out = [];
  const workDir = path.join(root, business, 'work');
  const walk = (dir, rel) => {
    let dirents;
    try {
      dirents = fs.readdirSync(dir, { withFileTypes: true });
    } catch (_) {
      return;
    }
    for (const d of dirents) {
      const abs = path.join(dir, d.name);
      const childRel = rel ? rel + '/' + d.name : d.name;
      if (d.isDirectory()) {
        if (!d.name.startsWith('_')) walk(abs, childRel);
        continue;
      }
      // No case-sensitive prefilter in front of the ONE predicate: isWorkItem
      // already fsNorms the extension, and a `.MD` spelling is the same file
      // on the filesystems this product treats as first-class — filtering it
      // out here meant an owner's `.MD` approval was never reconciled.
      if (paths.isWorkItem(root, business + '/work/' + childRel)) out.push(abs);
    }
  };
  walk(workDir, '');
  return out;
}

/**
 * Fold the logbook into what it already knows about each id:
 *   status[id]   - the latest logged status (created/flip)
 *   editHashes   - set of "id\x00diffHash" already recorded as edited
 *   notes[id]    - the latest note text already logged
 */
function digestLogbook(root, business) {
  const status = {};
  const editHashes = new Set();
  const notes = {};
  const { entries, corruptTail } = logbook.readAll(root, business);
  for (const e of entries) {
    if (!e || !e.id) continue;
    if (e.event === 'created') status[e.id] = e.status || 'draft';
    else if (e.event === 'flip' && e.to) status[e.id] = e.to;
    else if (e.event === 'edited' && e.diffHash) editHashes.add(e.id + '\x00' + e.diffHash);
    else if (e.event === 'note' && typeof e.note === 'string') notes[e.id] = e.note;
  }
  return { status, editHashes, notes, corruptTail };
}

/**
 * reconcile(root, { quiet } = {}) -> { appended, summaryLines }.
 */
function reconcile(root, opts) {
  const options = opts || {};
  const runStart = new Date();
  const wm = readWatermark(root);

  let businesses;
  try {
    businesses = paths.listBusinesses(root);
  } catch (_) {
    return { appended: 0, summaryLines: [] };
  }

  let appended = 0;
  let outsideChanges = 0;
  const reviewCounts = {};
  const redFlags = [];

  for (const business of businesses) {
    const markIso = wm.perBusiness[business];
    const markMs = markIso ? Date.parse(markIso) : NaN;
    const log = digestLogbook(root, business);
    if (log.corruptTail) redFlags.push(business);

    for (const abs of listItemFiles(root, business)) {
      let content;
      let mtimeMs;
      try {
        const st = fs.statSync(abs);
        mtimeMs = st.mtimeMs;
        content = fs.readFileSync(abs, 'utf8');
      } catch (_) {
        continue; // vanished mid-run
      }

      const status = fm.getField(content, 'status');
      if (status === 'review') reviewCounts[business] = (reviewCounts[business] || 0) + 1;

      // Mtime gate: only reconcile items touched since the last watermark.
      if (!Number.isNaN(markMs) && mtimeMs <= markMs) continue;

      const id = fm.getField(content, 'id');
      if (!id) continue; // nothing to key events on

      const snapPath = path.join(root, business, '.snapshots', id + '.md');
      let snap = null;
      try {
        snap = fs.readFileSync(snapPath, 'utf8');
      } catch (_) {
        snap = null;
      }
      const actor = snap !== null ? 'owner' : 'unknown';

      // --- status flip made outside a logged event ---------------------
      const known = Object.prototype.hasOwnProperty.call(log.status, id)
        ? log.status[id]
        : (snap !== null ? fm.getField(snap, 'status') : undefined);
      if (status !== undefined && known !== undefined && status !== known && LEGAL_STATUSES.indexOf(status) !== -1) {
        logbook.append(root, business, { actor, event: 'flip', id, from: known, to: status, detected: 'reconcile' });
        // The hook records the current approved copy when approval happens in
        // chat. Reconcile provides the same protection when the owner approves
        // by editing the file directly outside a session. A newly observed
        // review -> approved decision replaces an older approved copy so an
        // explicit reapproval can safely converge after a package change.
        if (status === 'approved' && known === 'review' && actor === 'owner') {
          const approvedSnap = path.join(root, business, '.snapshots', id + '.approved.md');
          atomicWrite(approvedSnap, content);
        }
        log.status[id] = status;
        appended++;
        outsideChanges++;
      }

      // --- body edited vs the snapshot ---------------------------------
      if (snap !== null) {
        const curBody = fm.parse(content).body;
        const snapBody = fm.parse(snap).body;
        if (curBody !== snapBody) {
          const d = diff.unifiedDiff(snapBody, curBody);
          const diffHash = sha256(d.diff);
          const key = id + '\x00' + diffHash;
          if (!log.editHashes.has(key)) {
            const evt = { actor, event: 'edited', id, diff: d.diff, diffHash, detected: 'reconcile' };
            if (d.truncated) evt.truncated = true;
            logbook.append(root, business, evt);
            log.editHashes.add(key);
            appended++;
            outsideChanges++;
          }
        }
      }

      // --- note became non-empty vs the snapshot -----------------------
      const note = fm.getField(content, 'note');
      if (note && note.trim() !== '') {
        const snapNote = snap !== null ? (fm.getField(snap, 'note') || '') : '';
        if (note !== snapNote && log.notes[id] !== note) {
          logbook.append(root, business, { actor, event: 'note', id, note, detected: 'reconcile' });
          log.notes[id] = note;
          appended++;
          outsideChanges++;
        }
      }
    }

    wm.perBusiness[business] = runStart.toISOString();
  }

  try {
    writeWatermark(root, wm);
  } catch (_) { /* watermark is an optimization; never fail the reconcile */ }

  // Publishing-mode changes made OUTSIDE a hooked session (the owner in an
  // editor, a sync client) are detected here, logged with actor `owner`, and
  // surfaced in the catch-up — "a change surfaces at next session start"
  // (Build Doc P5.3). AI-made changes are logged by the hook the moment they
  // happen; this pass sees only what the state file has not seen yet.
  const modeLines = [];
  try {
    const publishing = require('./publishing.js');
    for (const business of businesses) {
      const rec = publishing.recordModeChanges(root, business, { actor: 'owner', detected: 'reconcile' });
      for (const ch of rec.changes) {
        appended++;
        modeLines.push('Publishing setting changed: ' + business + ' ' + ch.channel + ' is now ' +
          publishing.sayMode(ch.to) + ' (was ' + publishing.sayMode(ch.from) + ').');
      }
    }
  } catch (_) { /* detective, never fatal to the reconcile */ }

  // `quiet` is accepted for API stability (SessionStart passes it); the core
  // never prints on its own, so the returned shape is the same either way - the
  // caller decides what to show.
  void options.quiet;
  const summaryLines = modeLines.concat(buildSummary(reviewCounts, outsideChanges, redFlags));
  return { appended, summaryLines };
}

/** The <=5-line plain catch-up; only attention-worthy lines. */
function buildSummary(reviewCounts, outsideChanges, redFlags) {
  const lines = [];
  const names = Object.keys(reviewCounts).sort();
  for (const b of names) {
    const n = reviewCounts[b];
    if (n > 0) lines.push(b + ': ' + n + ' item' + (n === 1 ? '' : 's') + ' waiting for you.');
  }
  if (outsideChanges > 0) {
    lines.push(outsideChanges + ' change' + (outsideChanges === 1 ? '' : 's') + ' you made outside a session ' +
      (outsideChanges === 1 ? 'was' : 'were') + ' recorded.');
  }
  for (const b of redFlags) {
    lines.push('Heads up: the record in ' + b + ' looks torn - run the Doctor when you can.');
  }
  return lines.slice(0, 5);
}

module.exports = { reconcile };
