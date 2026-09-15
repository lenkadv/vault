'use strict';

/**
 * logbook.js - the Evidence Camera and the bookmark (SPEC sections 5.4, 5.5).
 *
 * Per business, two small files under <business>/.state/:
 *   logbook.jsonl - append-only, one JSON event per line. Machine format on
 *                   purpose; customers never need to open it.
 *   bookmark.json - "what was I doing" session continuity, rewritten whole
 *                   (atomically) on every meaningful step.
 *
 * Reading is deliberately forgiving: a process killed mid-append leaves a torn
 * final line, and readAll reports that (corruptTail) instead of failing.
 */

const fs = require('fs');
const path = require('path');
const { atomicWrite, atomicAppend } = require('./atomic.js');

function statePath(root, business, file) {
  return path.join(String(root), String(business), '.state', file);
}

/**
 * append(root, business, eventObj) -> the entry that was written.
 * Adds ts (ISO time, now) when the event does not carry one, then appends the
 * event as one JSON line to <business>/.state/logbook.jsonl. Parent folders
 * are created. The event object is not validated - the camera records what it
 * is given.
 */
function append(root, business, eventObj) {
  const entry = Object.assign({}, eventObj);
  if (!entry.ts) entry.ts = new Date().toISOString();
  atomicAppend(statePath(root, business, 'logbook.jsonl'), JSON.stringify(entry));
  return entry;
}

/**
 * readAll(root, business) -> { entries, corruptTail, badLines }.
 *   entries     - every parseable event, in file order
 *   corruptTail - true when the FINAL non-empty line failed to parse (the
 *                 signature of a write torn by a crash); that line is skipped
 *   badLines    - count of unparseable lines BEFORE the tail (real damage;
 *                 they are skipped, never fatal)
 * A missing or empty logbook reads as { entries: [], corruptTail: false,
 * badLines: 0 }.
 */
function readAll(root, business) {
  const p = statePath(root, business, 'logbook.jsonl');
  let raw;
  try {
    raw = fs.readFileSync(p, 'utf8');
  } catch (err) {
    if (err && err.code === 'ENOENT') return { entries: [], corruptTail: false, badLines: 0 };
    throw err;
  }
  const lines = raw.split('\n').filter((l) => l.trim() !== '');
  const entries = [];
  let badLines = 0;
  let corruptTail = false;
  for (let i = 0; i < lines.length; i++) {
    try {
      entries.push(JSON.parse(lines[i]));
    } catch (_) {
      if (i === lines.length - 1) corruptTail = true;
      else badLines++;
    }
  }
  return { entries, corruptTail, badLines };
}

/**
 * writeBookmark(root, business, {doing, item, next, by, ...extras}) -> the
 * bookmark that was written. Stamps `updated` (ISO time, now), fills any of
 * the four canonical fields that are missing with '', passes extra fields
 * through untouched (skills may write richer bookmarks), and writes the whole
 * file atomically to <business>/.state/bookmark.json.
 */
function writeBookmark(root, business, fields) {
  const f = fields || {};
  const extras = {};
  for (const k of Object.keys(f)) {
    if (k !== 'updated' && k !== 'doing' && k !== 'item' && k !== 'next' && k !== 'by') extras[k] = f[k];
  }
  const bookmark = Object.assign(
    {
      updated: new Date().toISOString(),
      doing: f.doing === undefined || f.doing === null ? '' : f.doing,
      item: f.item === undefined || f.item === null ? '' : f.item,
      next: f.next === undefined || f.next === null ? '' : f.next,
      by: f.by === undefined || f.by === null ? '' : f.by,
    },
    extras
  );
  atomicWrite(statePath(root, business, 'bookmark.json'), JSON.stringify(bookmark) + '\n');
  return bookmark;
}

/**
 * readBookmark(root, business) -> the parsed bookmark object, or null when the
 * file is missing or unreadable (a broken bookmark must never break a session
 * start - it just means "nothing to resume").
 */
function readBookmark(root, business) {
  try {
    return JSON.parse(fs.readFileSync(statePath(root, business, 'bookmark.json'), 'utf8'));
  } catch (_) {
    return null;
  }
}

module.exports = { append, readAll, writeBookmark, readBookmark };
