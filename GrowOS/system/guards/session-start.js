#!/usr/bin/env node
'use strict';

/**
 * session-start.js — the quiet reconciler front door (SPEC section 4.4).
 *
 * Wired to the SessionStart hook. On every new session it:
 *   1. Writes/refreshes the session marker .growos/sessions/<session_id>.json
 *      ({started, lastSeen}). It MERGES: if item-hook already created the marker
 *      (adding a `business`), that field and the original `started` survive.
 *   2. Lazily runs the shared reconciler (system/tools/lib/reconcile-core.js —
 *      built alongside this file). If it isn't present yet, reconcile is skipped
 *      silently. Its `summaryLines` carry review counts and red flags.
 *   3. Offers to resume any business whose bookmark is recent (< 7 days) and has
 *      a non-empty next step.
 *   4. Prints AT MOST 5 short plain lines — and ONLY if something needs
 *      attention. If nothing does, it prints nothing (SessionStart stdout is fed
 *      back to the model as context, so silence keeps a clean session clean).
 *
 * NEVER-CRASH: a broken session start must not break the session. Everything is
 * wrapped; on any internal error we log to .growos/logs/hook-errors.log, exit 0.
 * Budget: reconcile-core owns the mtime-gated heavy scan; the work here is
 * O(businesses).
 */

const fs = require('fs');
const path = require('path');

const paths = require('../tools/lib/paths.js');
const atomic = require('../tools/lib/atomic.js');
const logbook = require('../tools/lib/logbook.js');

const MAX_LINES = 5;
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

/**
 * sanitizeSessionId(id) -> a session id safe to join into a filesystem path. The
 * id is host-supplied and lands in `.growos/sessions/<id>.json`, so a hostile
 * `../../…` value would escape the sessions folder. Replace every character
 * outside [A-Za-z0-9._-] with `_`; an empty/absent id falls back to a fixed name.
 * Defense-in-depth: this hook is not AI-reachable, but the id is still untrusted.
 */
function sanitizeSessionId(id) {
  const s = String(id == null ? '' : id).replace(/[^A-Za-z0-9._-]/g, '_');
  return s === '' ? 'unknown-session' : s;
}

function resolveRoot(cwd) {
  const starts = [];
  if (process.env.CLAUDE_PROJECT_DIR) starts.push(process.env.CLAUDE_PROJECT_DIR);
  if (cwd) starts.push(cwd);
  for (const s of starts) {
    try { return paths.findRoot(s); } catch (_) { /* next */ }
  }
  try { return paths.findRoot(__dirname); } catch (_) { /* fall through */ }
  return path.resolve(__dirname, '..', '..');
}

function logError(root, e) {
  try {
    const p = path.join(root || path.resolve(__dirname, '..', '..'), '.growos', 'logs', 'hook-errors.log');
    fs.mkdirSync(path.dirname(p), { recursive: true });
    fs.appendFileSync(p, new Date().toISOString() + ' [session-start] ' +
      ((e && e.stack) || (e && e.message) || String(e)) + '\n');
  } catch (_) { /* survive a broken log */ }
}

function main() {
  let raw = '';
  try { raw = fs.readFileSync(0, 'utf8'); } catch (_) { raw = ''; }
  let input = {};
  try { input = JSON.parse(raw) || {}; } catch (_) { input = {}; }

  const sessionId = sanitizeSessionId(input.session_id || input.sessionId);
  const cwd = input.cwd || input.workingDirectory || null;
  const root = resolveRoot(cwd);

  try {
    // ── Step 1: write/merge the session marker. ──
    const markerP = path.join(root, '.growos', 'sessions', sessionId + '.json');
    let existing = {};
    try { existing = JSON.parse(fs.readFileSync(markerP, 'utf8')) || {}; } catch (_) { existing = {}; }
    const now = new Date().toISOString();
    const merged = Object.assign({}, existing, {
      started: existing.started || now,
      lastSeen: now,
    });
    atomic.atomicWrite(markerP, JSON.stringify(merged));

    // ── Step 2: reconcile (optional; built by a sibling this wave). ──
    let summaryLines = [];
    try {
      // eslint-disable-next-line global-require
      const rc = require('../tools/lib/reconcile-core.js');
      if (rc && typeof rc.reconcile === 'function') {
        const result = rc.reconcile(root, { quiet: true });
        if (result && Array.isArray(result.summaryLines)) summaryLines = result.summaryLines;
      }
    } catch (_) { /* reconcile-core not present yet — skip silently */ }

    // ── Step 3: resume offers from recent, unfinished bookmarks. ──
    const resumeLines = [];
    let businesses = [];
    try { businesses = paths.listBusinesses(root); } catch (_) { businesses = []; }
    for (const b of businesses) {
      const bm = logbook.readBookmark(root, b);
      if (!bm || !bm.next || String(bm.next).trim() === '' || !bm.updated) continue;
      const age = Date.now() - Date.parse(bm.updated);
      if (isFinite(age) && age >= 0 && age < WEEK_MS) {
        const doing = bm.doing && String(bm.doing).trim() !== '' ? bm.doing : 'in the middle of something';
        resumeLines.push('In ' + b + ': you were ' + doing + ' — ' + bm.next + '. Pick it up?');
      }
    }

    // ── Step 4: print <= 5 lines, only if something needs attention. ──
    const lines = summaryLines.concat(resumeLines)
      .filter((l) => typeof l === 'string' && l.trim() !== '')
      .slice(0, MAX_LINES);
    if (lines.length) process.stdout.write(lines.join('\n') + '\n');
    process.exit(0);
  } catch (e) {
    logError(root, e);
    process.exit(0);
  }
}

if (require.main === module) main();

module.exports = { resolveRoot };
