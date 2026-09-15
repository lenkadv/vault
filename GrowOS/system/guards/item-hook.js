#!/usr/bin/env node
'use strict';

/**
 * item-hook.js — the Registrar. One zero-dependency guard, two hook events,
 * two host protocols (Claude Code + Codex). SPEC section 4 is the contract.
 *
 * WHAT IT DOES
 *   PreToolUse  (Write|Edit|MultiEdit) : the ONLY place a write can be blocked.
 *                Enforces the section 4.1 decision table (machine set, illegal
 *                status, illegal transition, new-item born approved/published),
 *                plus STRICT cross-business isolation — a write into a business
 *                other than the session's lane is denied unless it is a
 *                frontmatter-only status/receipt/note edit of an existing item
 *                (the queue carve-out). Owner setting system/settings.json picks
 *                strict (default) vs warn; a broken/absent file falls back strict.
 *   PreToolUse  (Read)                 : deny any read of a `.env` secrets file —
 *                the AI never needs the values; scripts read them directly.
 *   PreToolUse  (Bash)                 : the section 4.3 write-guard — deny a
 *                clear write to machinery or into another business, deny a
 *                command that would print a `.env` (sourcing is allowed), warn on
 *                an ambiguous mention.
 *   PostToolUse (Write|Edit|MultiEdit) : the section 4.2 book-keeping — stamp
 *                missing core fields, flag a missing type, freeze the first
 *                review snapshot, record the logbook/bookmark/heartbeat, and set
 *                the session lane (warn on a cross-business session in warn mode).
 *
 * NEVER-CRASH: a dead guard must never block the customer's work. Every path is
 * wrapped; on any internal error we append to .growos/logs/hook-errors.log and
 * exit 0. Stamp notices are silent (exit 0); only flags and warnings speak
 * (exit 2 with a stderr line) — SPEC section 4.2.
 *
 * TWO PROTOCOLS, ONE ADAPTER PAIR (SPEC section 4.1 / 7): parseHookInput reads
 * either host's stdin JSON into one normalized shape; emitDecision writes the
 * deny/warn/allow answer back in the calling host's dialect. All the real logic
 * in between is host-agnostic.
 *
 *   DIALECT DETECTION RULE (VERIFIED against the real CLI):
 *     Claude Code hook payloads always carry the snake_case string field
 *     `hook_event_name`. We treat its PRESENCE as the Claude marker and its
 *     ABSENCE as Codex. VERIFIED 2026-07-20 against Codex CLI 0.144.3 (real
 *     captured payloads, golden fixture _dev/tests/fixtures/hook/codex-0144-
 *     payloads.jsonl): Codex 0.144.3 sends snake_case fields BYTE-IDENTICAL to
 *     Claude's schema — including `hook_event_name` — and delivers an
 *     apply_patch's V4A text in `tool_input.command`. So real Codex is detected
 *     as the 'claude' dialect, and the Claude-shaped hookSpecificOutput deny
 *     (permissionDecision:"deny") IS honored by Codex 0.144.x. The camelCase
 *     read and the {"decision":"block"} emit below are therefore a DEFENSIVE
 *     branch for older/other Codex builds — dead but harmless under 0.144.x, and
 *     kept so an earlier Codex still gets a valid deny. If a future Codex changes
 *     the schema, capture its payload and add a golden fixture.
 *
 *   emitDecision output shapes:
 *     Claude deny : {"hookSpecificOutput":{"hookEventName":"PreToolUse",
 *                    "permissionDecision":"deny","permissionDecisionReason":"…"}}
 *                    (this is what real Codex 0.144.x receives and honors)
 *     Claude warn : {"hookSpecificOutput":{…"permissionDecision":"allow"},
 *                    "systemMessage":"…"}   (allow + a user-facing advisory)
 *     Codex  deny : {"decision":"block","reason":"…"}  (legacy/older-Codex branch)
 *     Codex  warn : plain advisory text on stdout
 *     allow (both): exit 0, no output.
 *   `systemMessage` is chosen over `additionalContext` for the warn advisory:
 *   `systemMessage` is the documented top-level field that surfaces a warning to
 *   the user, whereas `additionalContext` is for injecting text into the model's
 *   prompt on UserPromptSubmit/SessionStart — the wrong tool for a heads-up.
 */

const fs = require('fs');
const path = require('path');

const fm = require('../tools/lib/fm.js');
const ids = require('../tools/lib/ids.js');
const paths = require('../tools/lib/paths.js');
const atomic = require('../tools/lib/atomic.js');
const logbook = require('../tools/lib/logbook.js');

// ── item-model constants (SPEC section 5) ──────────────────────────────────
const LEGAL_STATUS = ['draft', 'review', 'changes', 'approved', 'published', 'rejected'];
// The legal AI transitions (SPEC section 5.3). A self-edge (no status change)
// is always allowed — a plain body edit is not a transition.
const LEGAL_EDGES = {
  draft: ['review'],
  review: ['changes', 'approved', 'rejected'],
  changes: ['draft', 'review'],
  approved: ['published'],
  published: [],
  rejected: [],
};

// The canonical list is shared with `restamp` (item-fields.js): both refuse an
// ambiguous label, and two lists of "core" is how they came to disagree about
// which labels are ambiguous.
const { RECEIPT_KEYS } = require('../tools/lib/item-fields.js');

function todayISO() { return new Date().toISOString().slice(0, 10); }
function isDate(s) { return typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s); }

function isIsoInstant(value) {
  return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(String(value || '')) &&
    !Number.isNaN(Date.parse(value));
}

function validatePublishReceipt(text, root, absPath) {
  const destination = fm.getField(text, 'publish_destination');
  const ref = fm.getField(text, 'publish_ref');
  const attempted = fm.getField(text, 'publish_attempted_at');
  const state = fm.getField(text, 'publish_state');
  const publishedAt = fm.getField(text, 'published_at');
  if (!destination) return 'This item cannot be marked published without a publish destination.';
  if (state !== 'prepared' && state !== 'live') {
    return 'This item cannot be marked published until its publish state is prepared (a verified safe ' +
      'handoff) or live (a verified live publish on a channel the owner set to live).';
  }
  if (!isIsoInstant(attempted)) return 'This item needs a valid publish attempt time before it can be marked published.';
  if (!isIsoInstant(publishedAt)) return 'This item needs a valid published time before it can be marked published.';
  if (destination !== 'manual' && !ref) return 'This item needs the outside draft or platform id before it can be marked published.';
  if (state === 'live') {
    // The LIVE door (Build Doc P5.1/P5.2). Recording an honest receipt is
    // always legal while the item stays approved; ENTERING `published` on a
    // live claim needs the owner's exact `live` answer for this channel AT
    // THIS MOMENT, judged by the same resolver publishers use. This cannot
    // stop a persuaded model from first flipping the setting — that limit is
    // documented, not implied away — but it does stop a confused skill from
    // live-publishing against the settings file.
    if (destination === 'manual') {
      return 'A live receipt cannot be manual. When the owner presses the last button themselves, the ' +
        'receipt state is prepared, not live.';
    }
    if (!ref) return 'A live receipt needs the platform id of what went out.';
    let resolved = null;
    try {
      const publishing = require('../tools/lib/publishing.js');
      resolved = publishing.resolveMode(root, absPath);
    } catch (err) {
      return 'This live receipt cannot be accepted: ' + (err && err.message ? err.message : String(err)) +
        ' The item stays approved — tell the owner what happened.';
    }
    if (resolved.mode !== 'explicit-live') {
      return 'The receipt says LIVE, but the ' + (resolved.channel || 'item\'s') + ' channel is not set ' +
        'to live right now (' + resolved.reason + '). The item stays approved. Tell the owner exactly ' +
        'what the destination shows; if something really went out, the owner decides the next step.';
    }
  }
  return null;
}

/* ═════════════════════════ OWNER SETTINGS (machine-set) ═════════════════════ */

/**
 * readIsolationMode(root) -> 'strict' | 'warn'. Reads the owner-controlled
 * system/settings.json (a machine-set file the AI cannot edit; the owner may
 * hand-edit it). "strict" DENIES a write into a different business than the one
 * this session started in (with the queue carve-out below); "warn" keeps the old
 * behaviour (a heads-up, never a block). ANY problem — missing file, bad JSON, an
 * unexpected value — falls back to the safe default 'strict', so a broken or
 * absent settings file can never quietly drop the isolation wall.
 */
function readIsolationMode(root) {
  try {
    let raw = fs.readFileSync(path.join(root, 'system', 'settings.json'), 'utf8');
    if (raw.charCodeAt(0) === 0xfeff) raw = raw.slice(1);
    const obj = JSON.parse(raw);
    return obj && obj.isolation === 'warn' ? 'warn' : 'strict';
  } catch (_) { return 'strict'; }
}

/* ════════════════════════════ PROTOCOL ADAPTER ═════════════════════════════ */

/**
 * sanitizeSessionId(id) -> the session id reduced to a filesystem-safe token, or
 * null when absent. The id is host-supplied and lands in
 * `.growos/sessions/<id>.json` (and the -seen/-prestatus twins), so a hostile
 * `../../…` value would escape the sessions folder. Replace every character
 * outside [A-Za-z0-9._-] with `_`. Defense-in-depth: not AI-reachable today, but
 * the id is untrusted input and must never build a path outside the sessions dir.
 */
function sanitizeSessionId(id) {
  if (id === null || id === undefined || id === '') return null;
  const s = String(id).replace(/[^A-Za-z0-9._-]/g, '_');
  return s === '' ? null : s;
}

/**
 * parseHookInput(raw) -> normalized event.
 *   { dialect:'claude'|'codex', event, toolName, toolInput, sessionId, cwd,
 *     parseError:boolean }
 * parseError is true only when stdin is not parseable JSON (garbage / empty).
 */
function parseHookInput(raw) {
  let obj = null;
  let parseError = false;
  try {
    obj = JSON.parse(raw);
  } catch (_) {
    parseError = true;
  }
  if (!obj || typeof obj !== 'object') {
    if (!parseError) parseError = String(raw).trim() !== '';
    obj = {};
  }
  const isClaude = typeof obj.hook_event_name === 'string';
  return {
    dialect: isClaude ? 'claude' : 'codex',
    event: obj.hook_event_name || obj.hookEventName || obj.event || null,
    toolName: obj.tool_name || obj.toolName || null,
    toolInput: obj.tool_input || obj.toolInput || null,
    sessionId: sanitizeSessionId(obj.session_id || obj.sessionId),
    cwd: obj.cwd || obj.workingDirectory || obj.working_directory || null,
    parseError: parseError,
  };
}

/** Synchronous stdout write (no async truncation before process.exit). */
function out(s) { try { fs.writeSync(1, s); } catch (_) { /* nothing we can do */ } }
function err(s) { try { fs.writeSync(2, s); } catch (_) { /* nothing we can do */ } }

/**
 * emitDecision(dialect, decision) -> writes the answer and exits 0.
 * decision = { action:'deny'|'warn'|'allow', reason }.
 */
function emitDecision(dialect, decision) {
  const action = (decision && decision.action) || 'allow';
  const reason = (decision && decision.reason) || '';
  if (action === 'deny') {
    if (dialect === 'codex') {
      out(JSON.stringify({ decision: 'block', reason: reason }));
    } else {
      out(JSON.stringify({
        hookSpecificOutput: {
          hookEventName: 'PreToolUse',
          permissionDecision: 'deny',
          permissionDecisionReason: reason,
        },
      }));
    }
  } else if (action === 'warn') {
    if (dialect === 'codex') {
      out(reason);
    } else {
      out(JSON.stringify({
        hookSpecificOutput: { hookEventName: 'PreToolUse', permissionDecision: 'allow' },
        systemMessage: reason,
      }));
    }
  }
  process.exit(0);
}

/* ════════════════════════════ ROOT + LOGGING ═══════════════════════════════ */

/**
 * resolveRoot(parsed) -> the install root. Prefers CLAUDE_PROJECT_DIR, then the
 * event's cwd (walking up to system/VERSION), then the script's own location
 * (this file lives at <root>/system/guards/item-hook.js, so ../.. is the root).
 */
function resolveRoot(parsed) {
  const starts = [];
  if (process.env.CLAUDE_PROJECT_DIR) starts.push(process.env.CLAUDE_PROJECT_DIR);
  if (parsed && parsed.cwd) starts.push(parsed.cwd);
  for (const s of starts) {
    try { return paths.findRoot(s); } catch (_) { /* try the next start */ }
  }
  try { return paths.findRoot(__dirname); } catch (_) { /* fall through */ }
  return path.resolve(__dirname, '..', '..');
}

/** Best-effort error log; never throws. */
function logError(root, where, e) {
  try {
    const line = new Date().toISOString() + ' [' + where + '] ' +
      ((e && e.stack) || (e && e.message) || String(e)) + '\n';
    const p = path.join(root || path.resolve(__dirname, '..', '..'), '.growos', 'logs', 'hook-errors.log');
    fs.mkdirSync(path.dirname(p), { recursive: true });
    fs.appendFileSync(p, line);
  } catch (_) { /* the guard must survive even a broken log */ }
}

/* ════════════════════════════ SHARED HELPERS ═══════════════════════════════ */

function resolveTarget(parsed, root) {
  const ti = parsed.toolInput || {};
  const fp = ti.file_path || ti.filePath || ti.path;
  if (typeof fp !== 'string' || fp === '') return null;
  return path.isAbsolute(fp) ? path.resolve(fp) : path.resolve(root, fp);
}

function safeRead(absPath) {
  try { return fs.readFileSync(absPath, 'utf8'); } catch (_) { return ''; }
}

/**
 * realTwin(absPath) -> the candidate resolved THROUGH the filesystem: the realpath
 * of its nearest EXISTING ancestor with the not-yet-created tail re-joined
 * lexically (a brand-new file resolves to itself). A symlink alias — an innocent
 * customer-named link whose TARGET escapes to machinery or a `.env` — resolves here
 * to the file it really opens. The deny predicates below run on BOTH this and the
 * lexical path and deny if EITHER trips (the §4 symlink-resolution guarantee).
 * Never throws: on any resolve error it falls back to the lexical path.
 */
function realTwin(absPath) {
  try {
    const r = paths.realpathBestEffort(absPath);
    return typeof r === 'string' && r !== '' ? r : absPath;
  } catch (_) { return absPath; }
}

// The realpath twin must be judged against the root's OWN realpath, not the lexical
// root: macOS aliases `/var`->`/private/var` and `/tmp`->`/private/tmp`, so
// realpath resolves benign ANCESTOR symlinks too and the twin can carry a different
// prefix than a non-realpath'd root — which would make the twin's path predicates
// escape and silently pass. `realTwin(root)` puts both in the same real namespace.
// (root always exists, so this is just its realpath; the predicates are cheap.)

/**
 * machineWriteDenied(root, absPath) -> true when the path is machinery the AI may
 * not write (and NOT an owner custom skill), judged on the lexical path AND its
 * realpath twin — so a customer-named symlink whose target is a machine file is
 * denied like a direct machine write. Deny if EITHER form is machinery.
 */
function machineWriteDenied(root, absPath) {
  if (paths.isMachinePath(root, absPath) && !paths.isCustomSkillPath(root, absPath)) return true;
  const real = realTwin(absPath);
  if (real === absPath) return false;
  const rr = realTwin(root);
  return paths.isMachinePath(rr, real) && !paths.isCustomSkillPath(rr, real);
}

/**
 * bookkeepingWriteDenied(root, absPath) -> true when the path is GrowOS's own
 * bookkeeping (approval snapshots, the logbook and staging under a business's
 * `.state/`, the `.growos/` watcher state), judged on the lexical path AND its
 * realpath twin — so an innocent-looking symlink whose target is bookkeeping is
 * denied like a direct write. These records are
 * what vouches for "the owner approved exactly this" and "the system saw the
 * change", so the AI's editing tools never write them; the guard itself and
 * `growos` commands maintain them from their own processes.
 */
function bookkeepingWriteDenied(root, absPath) {
  if (paths.isBookkeepingPath(root, absPath)) return true;
  const real = realTwin(absPath);
  if (real === absPath) return false;
  return paths.isBookkeepingPath(realTwin(root), real);
}

function bookkeepingMessage(root, absPath) {
  const rel = paths.toPosix(path.relative(root, absPath));
  return 'This is GrowOS\'s own bookkeeping (' + rel + ') — approval snapshots, the ' +
    'logbook, staging, and watcher state are the records that vouch for what the owner ' +
    'approved and what the system saw. The AI never writes them; the guard and growos ' +
    'commands maintain them. If something in there looks wrong, run the Doctor and show the owner.';
}

/**
 * envReadDenied(absPath) -> true when the path is a `.env` secrets file, judged on
 * the lexical path AND its realpath twin — so an innocent-looking symlink whose
 * target is a `.env` is denied like a direct `.env` read. Deny if EITHER is `.env`.
 * (isEnvFile is basename-only, so the root namespace does not matter here.)
 */
function envReadDenied(absPath) {
  if (paths.isEnvFile(absPath)) return true;
  const real = realTwin(absPath);
  return real !== absPath && paths.isEnvFile(real);
}

/**
 * crossesLaneBusiness(root, absPath, lane) -> the business a path lands in that is
 * NOT the lane, judged on the lexical path AND its realpath twin (so a symlink
 * whose name sits in-lane but whose target escapes to another business is caught),
 * or null when the path stays in the lane / outside any business.
 */
function crossesLaneBusiness(root, absPath, lane) {
  const lex = paths.businessOf(root, absPath);
  if (lex && lex !== lane) return lex;
  const real = paths.businessOf(realTwin(root), realTwin(absPath));
  if (real && real !== lane) return real;
  return null;
}

/** businessOf on the realpath twin, judged against the root's realpath — the
 *  namespace-consistent twin used to confirm a carve-out is a real in-place edit. */
function twinBusinessOf(root, absPath) {
  return paths.businessOf(realTwin(root), realTwin(absPath));
}

/**
 * resolvedBusinessMismatch(root, absPath) -> the business a path REALLY lands in
 * when its realpath twin resolves into a DIFFERENT business than its lexical name
 * claims (a symlink whose innocent in-business name redirects into ANOTHER
 * business), or null when the lexical and resolved forms agree on the business (or
 * the twin resolves outside any business). This is the §4.1/§4.3 lexical-AND-
 * realpath guarantee applied to BUSINESS identity: the lane is bound and cross-
 * business is judged on where the bytes LAND, never on the innocent lexical name
 * alone. A non-symlink path (twin identity, or a benign ancestor alias normalized
 * against the root's own realpath) reports no mismatch — so normal writes are
 * untouched; only a real cross-business redirect trips it.
 */
function resolvedBusinessMismatch(root, absPath) {
  const lex = paths.businessOf(root, absPath);
  const real = paths.businessOf(realTwin(root), realTwin(absPath));
  return real && real !== lex ? real : null;
}

/**
 * smuggledWorkItem(root, absPath) -> true when the LEXICAL path is not a work item
 * but the realpath twin IS one — a symlink whose innocent non-work-item name (a
 * `shared/…`, a `brain/…`, any non-`work/` path) resolves into a real work/ item
 * location. isWorkItem is lexical, so without this the item-model rules 2-5 (born
 * status, legal transition, frozen id/business/channel, shipping receipt) would be
 * skipped for such a write, letting a save mint a published item or force an illegal
 * status move that the SAME bytes written to the item's real path are denied. Judged
 * on the root's own realpath so a benign ancestor alias never trips it.
 */
function smuggledWorkItem(root, absPath) {
  return !paths.isWorkItem(root, absPath) && paths.isWorkItem(realTwin(root), realTwin(absPath));
}

/** Apply one string replacement the way Edit/MultiEdit would (in memory). */
function applyOneEdit(text, oldStr, newStr, replaceAll) {
  if (typeof oldStr !== 'string' || typeof newStr !== 'string') return text;
  if (oldStr === '') return newStr + text; // Edit's new-file / prepend convention
  if (replaceAll) return text.split(oldStr).join(newStr);
  const i = text.indexOf(oldStr);
  if (i === -1) return text; // would not apply; leave unchanged (Pre will allow)
  return text.slice(0, i) + newStr + text.slice(i + oldStr.length);
}

/**
 * incomingContent(parsed, absPath) -> the text the tool is about to leave on
 * disk, computed WITHOUT running the tool. Write: the content field. Edit /
 * MultiEdit: the edit(s) applied to the current on-disk text. null when the
 * tool input carries nothing we can evaluate.
 */
function incomingContent(parsed, absPath) {
  const ti = parsed.toolInput || {};
  const tool = parsed.toolName;
  if (tool === 'Write') {
    return typeof ti.content === 'string' ? ti.content : null;
  }
  const current = safeRead(absPath);
  if (tool === 'Edit') {
    return applyOneEdit(current, ti.old_string, ti.new_string, ti.replace_all);
  }
  if (tool === 'MultiEdit') {
    let t = current;
    const edits = Array.isArray(ti.edits) ? ti.edits : [];
    for (const e of edits) if (e) t = applyOneEdit(t, e.old_string, e.new_string, e.replace_all);
    return t;
  }
  return null;
}

function isLegalTransition(from, to) {
  if (from === to) return true;
  const outs = LEGAL_EDGES[from];
  return Array.isArray(outs) && outs.indexOf(to) !== -1;
}

/* ════════════════════════ CROSS-BUSINESS ISOLATION ═════════════════════════ */

// The one lane a session may edit freely is the FIRST business it wrote into
// (recorded in .growos/sessions/<id>.json by PostToolUse step 7). The one thing
// allowed across that lane is moving a WORK ITEM through its review statuses —
// so the whole-team skills (review-queue, marketing-strategy, the publishers) keep working —
// which is exactly a frontmatter-only edit limited to these fields.
const CARVEOUT_FIELDS = ['status', 'note'].concat(RECEIPT_KEYS);

/** The business this session first wrote into ("the lane"), or null if none yet. */
function laneBusiness(root, sessionId) {
  if (!sessionId) return null;
  try {
    const m = JSON.parse(fs.readFileSync(markerPathFor(root, sessionId), 'utf8'));
    return m && typeof m.business === 'string' && m.business !== '' ? m.business : null;
  } catch (_) { return null; }
}

/**
 * laneMarkerCorrupt(root, sessionId) -> true when the lane marker FILE exists and is
 * non-empty but does NOT parse to an object — a tampered/corrupt marker whose lane
 * cannot be trusted. laneBusiness returns null for BOTH "no marker" and "corrupt
 * marker"; this distinguishes the corrupt case so the guard can fail CLOSED (deny)
 * instead of fail-open (treat as no-lane and allow). A parseable marker — even one
 * with an empty/absent business — is NOT corrupt; it legitimately reads as "no lane
 * yet". Never throws. (The marker lives under .growos/, which is not machine-protected,
 * so a corrupt/hostile marker IS reachable — hence the conservative deny.)
 */
function laneMarkerCorrupt(root, sessionId) {
  if (!sessionId) return false;
  let raw;
  try { raw = fs.readFileSync(markerPathFor(root, sessionId), 'utf8'); }
  catch (_) { return false; }                 // no marker (ENOENT) — not corrupt
  if (String(raw).trim() === '') return false; // empty file — reads as no-lane
  try { const o = JSON.parse(raw); return !(o && typeof o === 'object'); }
  catch (_) { return true; }                   // exists, non-empty, unparseable — corrupt
}

/**
 * touchLaneForBusiness(root, sessionId, business) -> set the session lane if it
 * is not set yet (first-write-wins; never overrides), and refresh lastSeen. Used
 * for a NON-work-item business write (a brain or setup.md file) so isolation
 * protects those too in a brain-only session — work items set the lane in the
 * PostToolUse step-7 book-keeping. Never throws.
 */
function touchLaneForBusiness(root, sessionId, business) {
  if (!business || !sessionId) return;
  try {
    const p = markerPathFor(root, sessionId);
    const now = new Date().toISOString();
    let raw = null;
    try { raw = fs.readFileSync(p, 'utf8'); } catch (_) { raw = null; }
    if (raw !== null && String(raw).trim() !== '') {
      let marker = null;
      try { marker = JSON.parse(raw); } catch (_) { marker = null; }
      // A corrupt (existing, non-empty, unparseable) marker is NEVER clobbered — the
      // Pre guards deny a write under a corrupt marker, so we must not silently reset
      // its lane here either (preserve an unreadable claim through every
      // writer, not only claimLaneAtomic).
      if (!marker || typeof marker !== 'object') return;
      if (!marker.business) marker.business = business; // set once, never override the lane
      marker.lastSeen = now;
      atomic.atomicWrite(p, JSON.stringify(marker));
    } else {
      atomic.atomicWrite(p, JSON.stringify({ business: business, started: now, lastSeen: now }));
    }
  } catch (_) { /* lane tracking must never crash the guard */ }
}

/**
 * claimLaneAtomic(root, sessionId, business) -> the session's lane after an ATOMIC
 * first-write-wins claim. `touchLaneForBusiness` reads-then-writes, so two parallel
 * first-writes could BOTH observe no lane, both be allowed, and write into different
 * businesses (the marker just converges last-wins).
 *
 * The claim writes the COMPLETE marker to a temp file first, then hard-LINKS it into
 * place: `linkSync` fails with EEXIST if the target already exists (an atomic "create
 * if absent", like O_EXCL), and — crucially — the marker only ever appears already
 * fully written. A bare `openSync('wx')` create-then-write leaves a NANOSECOND window
 * where the marker exists but is empty, in which an EEXIST loser reads null and its
 * fallback would write ITS OWN business. Linking a pre-written file closes
 * that window: exactly one concurrent first-write wins; every loser gets EEXIST and
 * reads back the WINNER's complete marker. Callers judge the target against the
 * RETURNED lane, so the loser's cross-business write is denied, not allowed. Returns
 * the effective lane, or null on a missing arg. Never throws (must not crash the guard).
 */
function claimLaneAtomic(root, sessionId, business) {
  if (!sessionId || !business) return null;
  const p = markerPathFor(root, sessionId);
  const now = new Date().toISOString();
  try { fs.mkdirSync(path.dirname(p), { recursive: true }); } catch (_) { /* best effort */ }
  // Fast path: an existing marker means we lost (or a prior write) — read the winner.
  const pre = laneBusiness(root, sessionId);
  if (pre) { touchLaneForBusiness(root, sessionId, pre); return pre; }
  const tmp = p + '.claim-' + process.pid + '-' + Date.now() + '-' + Math.random().toString(36).slice(2) + '.tmp';
  try {
    fs.writeFileSync(tmp, JSON.stringify({ business: business, started: now, lastSeen: now }));
    try {
      fs.linkSync(tmp, p);  // atomic create-if-absent of an ALREADY-COMPLETE marker
      return business;      // we won the claim
    } catch (e) {
      if (e && e.code === 'EEXIST') {
        // Lost the race. The winner linked a COMPLETE marker, so this read never sees
        // an empty file — it returns the winner's business. An unreadable existing
        // marker (legacy/corrupt) is NEVER overwritten and is NOT claimed as ours: we
        // return null so the caller keeps its fail-open no-lane behavior instead of us
        // stealing the lane into this business (never overwrite/steal an
        // unreadable claim).
        const won = laneBusiness(root, sessionId);
        if (won) touchLaneForBusiness(root, sessionId, won); // refresh lastSeen; never override
        return won;
      }
      // A filesystem without hard links (rare: some FAT/network mounts) — degrade to the
      // best-effort read/update claim rather than brick the guard. The common macOS/
      // Linux/Windows-NTFS case never reaches here (same-dir link is supported there).
      touchLaneForBusiness(root, sessionId, business);
      return laneBusiness(root, sessionId);
    }
  } catch (_) {
    // writeFileSync failed (permissions, disk) — never crash the guard.
    touchLaneForBusiness(root, sessionId, business);
    return laneBusiness(root, sessionId);
  } finally {
    try { fs.unlinkSync(tmp); } catch (_) { /* the extra link is gone or never made */ }
  }
}

const CARVEOUT_SET = new Set(CARVEOUT_FIELDS);

/**
 * maskCarveout(text) -> the file's bytes with ONLY its complete, single-line,
 * top-level carve-out fields (status / note / publish_*) removed, or null when
 * the text is not a safe carve-out candidate (no frontmatter, or a carve-out
 * field is written block-style or appears twice). Everything else — BOM, fences,
 * comments, whitespace, line endings, nested/indented YAML, unrelated fields, and
 * the body — is left byte-for-byte, so two masked texts are equal ONLY when they
 * differ nowhere except in carve-out scalars. This is the raw-byte replacement
 * for the old field-map compare, which parsed only top-level scalars and so was
 * blind to a changed nested list item.
 */
function maskCarveout(text) {
  const s = String(text);
  const hasBom = s.charCodeAt(0) === 0xFEFF;
  const t = hasBom ? s.slice(1) : s;
  const lines = t.split('\n');                 // CRLF lines keep their trailing \r
  if (!/^---[ \t]*\r?$/.test(lines[0] === undefined ? '' : lines[0])) return null; // no opening fence
  let closeIdx = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].replace(/\r$/, '').trim() === '---') { closeIdx = i; break; }
  }
  if (closeIdx === -1) return null;            // no closing fence
  const seen = new Set();
  const drop = new Set();
  for (let i = 1; i < closeIdx; i++) {
    const line = lines[i].replace(/\r$/, '');
    const m = line.match(/^([^\s:#][^:]*?)\s*:\s*(.*)$/); // a top-level (non-indented) key: value
    if (!m) continue;                          // indented continuation / comment / blank -> kept as-is
    const key = fm.canonicalizeKey(m[1]);
    if (!CARVEOUT_SET.has(key)) continue;      // a non-carve-out field -> kept (must match exactly)
    if (seen.has(key)) return null;            // a duplicate carve-out key -> not safe
    seen.add(key);
    // A carve-out field must be a PURE single-line inline scalar. Strip any leading
    // YAML tag/anchor property (`!!str`, `!foo`, `!<…>`, `&anchor`) first, then:
    let val = m[2].trim();
    while (/^(!<[^>]*>|![^\s]*|&[^\s]+)(\s+|$)/.test(val)) val = val.replace(/^(!<[^>]*>|![^\s]*|&[^\s]+)\s*/, '');
    // (a) an explicit block-scalar indicator (`|`/`>`, with an indent digit 1-9
    //     and/or a `+`/`-` chomp in EITHER order, plus an optional comment) means
    //     the value spans indented lines — reject.
    if (/^[|>]([1-9][+-]?|[+-][1-9]?)?[ \t]*(#.*)?$/.test(val)) return null;
    // (b) ANY indented continuation line before the next top-level key means this
    //     field has a multi-line value (an implicit block, possibly after blank or
    //     comment lines) — reject. Blank and top-level comment lines are skipped.
    for (let j = i + 1; j < closeIdx; j++) {
      const l = lines[j].replace(/\r$/, '');
      if (/^[^\s:#][^:]*?\s*:/.test(l)) break;   // reached the next top-level key
      if (/^\s+\S/.test(l)) return null;         // an indented line belongs to this key's value
    }
    drop.add(i);
  }
  const kept = lines.filter((_, i) => !drop.has(i));
  return (hasBom ? String.fromCharCode(0xFEFF) : '') + kept.join('\n');
}

/**
 * isCarveOutEdit(currentText, incomingText) -> true when the ONLY differences
 * between the two are complete, single-line, top-level carve-out scalars (a status
 * move, the shipping-receipt fields, and/or the owner's note). Every other byte —
 * body, unrelated fields, nested YAML, whitespace, line endings, BOM — must be
 * identical. Status LEGALITY (a legal transition, a complete receipt) is not judged
 * here — that stays with checkWorkItemWrite, which runs afterwards.
 */
function isCarveOutEdit(currentText, incomingText) {
  const cur = maskCarveout(currentText);
  const inc = maskCarveout(incomingText);
  if (cur === null || inc === null) return false; // not a safe carve-out candidate
  return cur === inc;                             // every non-carve-out byte is identical
}

/**
 * crossBusinessGuard(parsed, root, absPath) -> a deny decision, or null to let
 * the normal rules proceed. Engages ONLY in strict mode. Two ways it denies:
 * (a) the target's realpath twin resolves into a DIFFERENT business than its
 * lexical name (a disguised cross-business write) — denied even with NO lane, so a
 * symlinked write can never slip through as the lane-binding first write; or
 * (b) this session already has a lane and the target sits in a different business.
 * The carve-out (an in-place, frontmatter-only status/receipt/note edit of an
 * EXISTING work item) is allowed through; everything else — a body edit, a new
 * item, a brain/setup file, a rename — is denied. Warn mode is a deliberate
 * no-op here (PostToolUse step 7 still warns, exactly as before).
 */
function crossBusinessGuard(parsed, root, absPath) {
  if (readIsolationMode(root) !== 'strict') return null;  // warn mode: PostToolUse warns
  // A corrupt/tampered marker means the lane can't be trusted — fail CLOSED, never
  // fall through to the no-lane "first write is allowed" path (which would let a write
  // proceed AND its lane get reset by a later writer). Deny until the owner clears it.
  if (laneMarkerCorrupt(root, parsed.sessionId)) {
    return { action: 'deny', reason: corruptMarkerMessage(root, parsed.sessionId) };
  }
  let lane = laneBusiness(root, parsed.sessionId);
  // §4.1/§4.3 symlink guarantee for BUSINESS identity. A path whose innocent
  // in-business name RESOLVES into a DIFFERENT business is a disguised cross-business
  // write no matter what its name says — deny it even before a lane exists, so it can
  // never slip through as the lane-binding FIRST write and leave the lane pointing at
  // the lexical (wrong) business. With a lane, the same
  // resolved landing is a cross-lane write; the lexical crossesLaneBusiness below
  // covers the in-name case. The carve-out never applies to a divergent path (its
  // twin, by definition, does not resolve to the lexical business), so denying here
  // cannot block a legitimate in-place status flip.
  const resolved = resolvedBusinessMismatch(root, absPath);
  if (resolved && resolved !== lane) {
    // With a lane, this is a plain cross-lane write; with none, name the redirect.
    return { action: 'deny', reason: lane
      ? crossBusinessMessage(lane, resolved)
      : crossBusinessResolveMessage(paths.businessOf(root, absPath), resolved) };
  }
  if (!lane) {
    // No lane yet: claim the target's OWN business as the lane with an ATOMIC
    // first-write-wins claim, so two PARALLEL first-writes into different businesses
    // converge on one lane and the loser is judged against it — its cross-business
    // write is denied here, not allowed through. A target
    // outside any business (machine/shared) claims nothing and passes as before.
    const targetBiz = resolved || paths.businessOf(root, absPath);
    if (!targetBiz) return null;
    lane = claimLaneAtomic(root, parsed.sessionId, targetBiz);
    if (!lane || lane === targetBiz) return null;         // we won (or it was already ours)
    // Lost the race to a DIFFERENT business — fall through and deny against the winner.
  }
  // The target crosses the lane when EITHER its lexical business or its realpath
  // twin's business is not the lane — so a symlink whose innocent name sits in-lane
  // but whose target escapes to another business is caught (§4 symlink guarantee).
  const other = crossesLaneBusiness(root, absPath, lane);
  if (!other) return null;                                // stays in lane (or outside any business)
  // Cross-business, strict. Only the queue carve-out survives: an in-place,
  // frontmatter-only status/receipt/note edit of an EXISTING work item. Require the
  // realpath twin to resolve to the SAME business as the lexical path — a symlink
  // whose target escapes elsewhere is never a plain in-place edit.
  const lex = paths.businessOf(root, absPath);
  if (lex && paths.isWorkItem(root, absPath) && fs.existsSync(absPath) &&
      twinBusinessOf(root, absPath) === lex) {
    const incoming = incomingContent(parsed, absPath);
    if (incoming !== null && isCarveOutEdit(safeRead(absPath), incoming)) return null;
  }
  return { action: 'deny', reason: crossBusinessMessage(lane, other) };
}

/* ════════════════════════════ MESSAGES (plain words) ═══════════════════════ */

function machineMessage(root, absPath) {
  const rel = paths.toPosix(path.relative(root, absPath));
  return 'That file (' + rel + ') is part of GrowOS itself, and a future update would ' +
    'overwrite anything changed here. Draft content under a business\'s work/ folder (or ' +
    'notes under brain/) instead. To change the machinery on purpose, ask the owner to edit ' +
    'it in their own editor — owner edits are never blocked, and the Doctor will list the ' +
    'change as a customization.';
}

function illegalStatusMessage(status) {
  return '"' + status + '" is not a status GrowOS knows. Use one of: ' + LEGAL_STATUS.join(', ') + '.';
}

function transitionMessage(from, to) {
  const outs = LEGAL_EDGES[from] || [];
  const moves = outs.length
    ? 'From "' + from + '" the allowed moves are: ' + outs.join(', ') + '.'
    : 'From "' + from + '" the AI can\'t move it anywhere — only the owner can change it now.';
  return 'This item is "' + from + '". Moving it to "' + to + '" isn\'t an allowed step. ' + moves;
}

function bornMessage() {
  return 'A new item has to start as draft (or review). "approved", "published", "rejected", and ' +
    '"changes" are set later, by the owner or the system — make it, hand it to review, and let the ' +
    'owner decide.';
}

function bornFieldMismatchMessage(field, supplied, expected) {
  return 'This new item says ' + field + ': "' + supplied + '", but the folder it is being saved in ' +
    'is ' + field + ' "' + expected + '". A work item\'s ' + field + ' must match where it lives, or ' +
    'its history and snapshots would collide with another item. Leave ' + field + ' off (the system ' +
    'stamps it from the path) or set it to "' + expected + '".';
}

function droppedStatusMessage(from) {
  return 'This item is "' + from + '", and this save drops its status line — which would quietly ' +
    'reset it to draft and pull it out of the owner\'s queue. Keep the status line. To change it, ' +
    'use an allowed move; to leave it, include "status: ' + from + '" unchanged.';
}

function ambiguousKeyMessage(key) {
  return 'The label has a field ("' + key + '") that GrowOS and a normal YAML reader would read ' +
    'differently — a repeated key, or a core field written with different capitalization. Use each ' +
    'core field once, in lowercase (id, status, type, business, channel, created, headline, skill, note).';
}

function deleteItemMessage(rel) {
  return 'Deleting a work item (' + rel + ') is the owner\'s call, not the AI\'s. If it should go ' +
    'away, mark it rejected and let the owner remove it in their editor.';
}

function unreconstructableMessage(rel) {
  return 'I could not work out what this patch would leave in ' + rel + ', so I can\'t confirm it ' +
    'keeps the item\'s label and status valid. Rewrite it as a plain edit of the whole file.';
}

function moveOutMessage(rel) {
  return 'Moving a work item (' + rel + ') out of its work/ folder would quietly pull it from the ' +
    'review queue, like a hidden delete. Leave it in work/; if it should go, mark it rejected.';
}

function crossBusinessMoveMessage() {
  return 'A work item can\'t be moved into a different business — its business is part of its ' +
    'permanent identity. Make a new item in the other business instead.';
}

function crossChannelMoveMessage() {
  return 'A work item can\'t be moved into a different channel folder — its channel is stamped from ' +
    'where it lives and is part of its label. Make a new item in that channel instead.';
}

function overwriteMessage(rel) {
  return 'That move would land on top of another item that already lives at ' + rel + ', destroying ' +
    'it. Pick a name that is not already taken.';
}

function frozenFieldMessage(field, cur, inc) {
  const what = inc === undefined ? 'dropping it' : 'changing it to "' + inc + '"';
  return 'The "' + field + '" field is part of this item\'s permanent identity — it is set once and ' +
    'never edited. It is "' + cur + '"; ' + what + ' would break the link to its frozen original and ' +
    'its history. Leave "' + field + ': ' + cur + '" exactly as it is.';
}

function bashDenyMessage(hit) {
  return 'That command writes to GrowOS machinery (' + hit + '). Machine changes ship as ' +
    'updates, not direct edits. Put content under a business\'s work/ or brain/ folder, or ask ' +
    'the owner to make machine changes in their editor.';
}

function bashWarnMessage(hit) {
  return 'Heads up (not blocked): that command mentions GrowOS machinery (' + hit + '). ' +
    'Double-check you\'re not about to overwrite machine files — those ship as updates.';
}

function typeFlagMessage() {
  return 'This work item still needs a "type" — the one word that says what it is (for example ' +
    'social-post, newsletter, or ad). Set the type field and save again.';
}

function crossBusinessMessage(lane, target) {
  return 'This save changes a file in the ' + target + ' business, but this session is working in ' +
    lane + '. To keep businesses from mixing, GrowOS only lets a session change files in the ' +
    'business it started in. The one thing allowed across businesses is moving a work item through ' +
    'its review statuses (approve, reject, the shipping receipt, the owner\'s note) without touching ' +
    'its body. To work on ' + target + ', start a fresh session in that business.';
}

// A path whose lexical NAME sits in one place but whose realpath resolves into a
// different business — a symlink that would write into `realBiz` under an innocent
// name. Used when no lane exists yet, so the plain lane-vs-target wording does not
// fit (there is no lane to name). §4.1/§4.3 judge the write on where it LANDS.
function crossBusinessResolveMessage(nameBiz, realBiz) {
  const where = nameBiz ? 'the ' + nameBiz + ' area' : 'a shared area';
  return 'This path is written as ' + where + ', but it resolves through a link into the ' + realBiz +
    ' business — so it would change a file in ' + realBiz + ' under an innocent-looking name. GrowOS ' +
    'judges every write on where it really lands, not on its name, and keeps businesses from mixing. ' +
    'To work on ' + realBiz + ', write directly to a ' + realBiz + ' path in a session for that business.';
}

function corruptMarkerMessage(root, sessionId) {
  const rel = paths.toPosix(path.relative(root, markerPathFor(root, sessionId)));
  return 'This session\'s isolation marker (' + rel + ') is unreadable, so GrowOS can\'t tell which ' +
    'business this session is working in — and it won\'t risk mixing businesses on a guess. This should ' +
    'never happen on its own; delete that one file to reset the session\'s lane, then save again.';
}

function smuggledItemMessage(root, absPath) {
  const rel = paths.toPosix(path.relative(root, absPath));
  return 'This path (' + rel + ') is not itself a work item, but it resolves through a link into a ' +
    'work/ item. Saving through it would skip the review rules every item must pass — a new item has ' +
    'to be born draft, status moves only along the allowed steps, and id/business/channel/receipt are ' +
    'protected. Write the item directly at its real work/ path so those rules apply.';
}

function envReadMessage(rel) {
  return 'That file (' + rel + ') is a private .env holding this business\'s keys and passwords, and ' +
    'GrowOS keeps secrets out of the AI\'s view. You never need the actual values — the scripts that ' +
    'use a key read it straight from .env. If what you need is a non-secret preference, it lives in ' +
    'setup.md instead.';
}

function envBashReadMessage(hit) {
  return 'That command would print a private .env file (' + hit + '), which holds this business\'s ' +
    'keys and passwords. GrowOS keeps secret values out of the AI\'s view. Sourcing a .env so a ' +
    'script can use its keys (for example: set -a; . ./' + hit + '; set +a) is fine — reading its ' +
    'contents onto the screen is not.';
}

/* ════════════════════════════ PreToolUse — writes (4.1) ════════════════════ */

function evaluatePreWrite(parsed, root) {
  const absPath = resolveTarget(parsed, root);
  if (!absPath) return { action: 'allow' };

  // Rule 1 — anything in the machine set is off-limits to the AI's edit tools,
  // EXCEPT an owner-created custom skill (.claude|.agents/skills/<name>/… that is
  // not a shipped skill): those live under a machine folder but are the owner's
  // to write. A shipped skill stays protected (isCustomSkillPath is false for it).
  if (machineWriteDenied(root, absPath)) {
    return { action: 'deny', reason: machineMessage(root, absPath) };
  }

  // Rule 1a — system bookkeeping is not the AI's to write: a Write into
  // `.snapshots/` could rewrite the approval proof that
  // publish-stage checks against, and a Write into `.growos/` could reset the
  // mode-change watcher's memory.
  if (bookkeepingWriteDenied(root, absPath)) {
    return { action: 'deny', reason: bookkeepingMessage(root, absPath) };
  }

  // Rule 1b — cross-business isolation (strict mode). A deny here, or null to
  // let the normal rules run. Covers brain, setup.md, and non-carve-out items.
  const iso = crossBusinessGuard(parsed, root, absPath);
  if (iso) return iso;

  // Rule 1c — item-model symlink guarantee (§4.1). The isWorkItem test below is
  // lexical, so a symlink whose non-work-item name resolves INTO a work/ item would
  // skip rules 2-5 and let a save mint a published item or force an illegal status
  // move. Deny a write whose real target is a work item but whose lexical name is
  // not — regardless of isolation mode (item-model integrity is not an isolation rule).
  if (smuggledWorkItem(root, absPath)) {
    return { action: 'deny', reason: smuggledItemMessage(root, absPath) };
  }

  // Rules 2-4 only apply to work items; everything else is allowed here.
  let decision = { action: 'allow' };
  if (paths.isWorkItem(root, absPath)) {
    // Capture the REAL pre-write on-disk status before the tool runs,
    // so PostToolUse step 3b can tell a genuine review -> approved from a plain save.
    recordPreStatus(root, parsed.sessionId, absPath);
    const incoming = incomingContent(parsed, absPath);
    if (incoming !== null) decision = checkWorkItemWrite(root, absPath, incoming);
  }

  // Bind the session lane on a PASSING write, so a first write binds
  // the lane at PreToolUse rather than waiting for PostToolUse step 7.
  if (decision.action === 'allow') claimLaneForTarget(root, parsed, absPath);
  return decision;
}

/**
 * claimLaneForTarget(root, parsed, absPath) -> bind the session lane to the target's
 * business on a passing write, first-write-wins. Strict mode ONLY — warn
 * mode keeps PreToolUse a no-op and lets §4.2 step 7 bind the lane and warn. A target
 * outside any business (machine/shared) binds nothing. Never throws.
 */
function claimLaneForTarget(root, parsed, absPath) {
  try {
    if (readIsolationMode(root) !== 'strict') return;
    // Bind the lane to where the bytes LAND, not the innocent lexical name: a
    // divergent (symlinked-across-businesses) write is already denied by
    // crossBusinessGuard before we get here, so resolvedBusinessMismatch is null and
    // this is the lexical business — but binding the resolved form keeps the lane
    // truthful even if a future path reaches binding another way (§4.1/§4.3).
    const b = resolvedBusinessMismatch(root, absPath) || paths.businessOf(root, absPath);
    if (b) touchLaneForBusiness(root, parsed.sessionId, b);
  } catch (_) { /* lane claim must never crash the guard */ }
}

/**
 * checkWorkItemWrite(root, absPath, incoming) -> decision. The per-item rule
 * engine (2a dup/miscase, 2b illegal status, 2c frozen fields, 3 transition,
 * 3b dropped-status, 4 born) applied to a full incoming text. Shared by the
 * Write/Edit path and the apply_patch ADD path. Assumes absPath is already known
 * to be a work item (not machinery).
 */
function checkWorkItemWrite(root, absPath, incoming) {
  const exists = fs.existsSync(absPath);
  const hasFm = fm.parse(incoming).hasFm;

  // Rule 2a — reject frontmatter this engine would read differently from YAML:
  // a duplicated key (we take first, YAML/Obsidian take last) or a mis-cased
  // core key (`Status:` alongside a stamped `status:`). Either one lets a write
  // desync the guard from what the queue actually shows, so refuse the ambiguity.
  if (hasFm) {
    const dup = duplicateOrMiscasedCoreKey(incoming);
    if (dup) return { action: 'deny', reason: ambiguousKeyMessage(dup) };
  }

  const incomingStatus = hasFm ? fm.getField(incoming, 'status') : undefined;
  // An absent or empty status is "not set yet" — Post will stamp draft.
  const hasIncoming = incomingStatus !== undefined && incomingStatus !== '';

  // Rule 2b — an explicitly illegal status value.
  if (hasIncoming && LEGAL_STATUS.indexOf(incomingStatus) === -1) {
    return { action: 'deny', reason: illegalStatusMessage(incomingStatus) };
  }

  // Rule 2d — the item's business/channel must match WHERE IT LIVES, on EVERY write,
  // not only at creation. channelOf is null for a work-ROOT item (directly in work/),
  // so a non-empty channel there is a mismatch too. This runs OUTSIDE the frozen-field
  // loop below, which only guards fields that ALREADY had a value — so it also stops
  // ADDING a mislabeling channel/business to an item that PostToolUse left without one
  // (a work-root item's channel could be set on a later write). Dropping a
  // frozen field is still handled by the frozen-field loop; this covers add + mismatch.
  if (hasFm) {
    const incBiz = fm.getField(incoming, 'business');
    const pathBiz = paths.businessOf(root, absPath);
    if (incBiz !== undefined && incBiz !== '' && pathBiz && incBiz !== pathBiz) {
      return { action: 'deny', reason: bornFieldMismatchMessage('business', incBiz, pathBiz) };
    }
    const incChan = fm.getField(incoming, 'channel');
    const pathChan = paths.channelOf(root, absPath);
    if (incChan !== undefined && incChan !== '' && incChan !== (pathChan || '')) {
      return { action: 'deny', reason: bornFieldMismatchMessage('channel', incChan, pathChan || '(none — it sits directly in work/)') };
    }
  }

  if (exists) {
    const currentText = safeRead(absPath);

    // Rule 2c — frozen fields (SPEC §5.1) are stamped once and never edited.
    // Deny any incoming that CHANGES or DROPS a frozen field that already has a
    // value: changing `id`/`created`/`business`/`channel`, or removing the line
    // (which would make PostToolUse stamp a fresh one), desyncs the item from its
    // snapshot and logbook history. Initial stamping — where
    // the current file has no value yet — is still allowed.
    for (const f of FROZEN_FIELDS) {
      const cur = fm.getField(currentText, f);
      if (cur === undefined || cur === '') continue; // not set yet -> stamping is fine
      const inc = fm.getField(incoming, f); // undefined when the incoming drops the line
      if (inc !== cur) return { action: 'deny', reason: frozenFieldMessage(f, cur, inc) };
    }

    const currentStatus = fm.getField(currentText, 'status');
    const known = currentStatus !== undefined && currentStatus !== '';
    // An existing item with NO status line reads as an effective draft: PostToolUse
    // would stamp it draft, so an explicit jump straight to approved/published must
    // still be validated as a draft-> transition, not skipped (an unstamped
    // item was publishable in one write — a review bypass).
    const effectiveCurrent = known ? currentStatus : 'draft';
    if (hasIncoming) {
      // Rule 3 — an explicit transition on an item that already exists.
      if (!isLegalTransition(effectiveCurrent, incomingStatus)) {
        return { action: 'deny', reason: transitionMessage(effectiveCurrent, incomingStatus) };
      }
      // Rule 3c — only a fresh approved -> published transition needs the
      // Publisher's shipping receipt. Legacy items that were already published
      // remain editable without being retroactively blocked.
      if (effectiveCurrent === 'approved' && incomingStatus === 'published') {
        const receiptError = validatePublishReceipt(incoming, root, absPath);
        if (receiptError) return { action: 'deny', reason: receiptError };
      }
    } else if (!isLegalTransition(effectiveCurrent, 'draft')) {
      // Rule 3b — the incoming content DROPS the status line (no line, empty,
      // or no frontmatter at all). PostToolUse would re-stamp it to `draft`, so
      // treat the omission as an implicit move to draft and deny it when that
      // downgrade is illegal. This closes the "omit one line to silently reset a
      // review/approved item" hole.
      return { action: 'deny', reason: droppedStatusMessage(effectiveCurrent) };
    }
  } else {
    // Rule 4 — a BRAND-NEW item. Its only legal initial status is draft or review
    // (approved/published/rejected/changes are set later, by the owner or system).
    // Its business/channel-vs-path agreement is enforced by Rule 2d above, which now
    // runs for new and existing items alike.
    if (hasIncoming && incomingStatus !== 'draft' && incomingStatus !== 'review') {
      return { action: 'deny', reason: bornMessage() };
    }
  }

  // Rule 5 — allow.
  return { action: 'allow' };
}

/**
 * duplicateOrMiscasedCoreKey(text) -> the offending key name, or null. Flags a
 * top-level key that appears more than once, or a key that lowercases to one of
 * the stamped core fields but is not exactly that lowercase form.
 */
const { CORE_KEYS } = require('../tools/lib/item-fields.js');
// Stamped once, never edited by the AI (SPEC §5.1). status is deliberately NOT
// here — it moves along the legal transitions; these four are an item's identity.
const FROZEN_FIELDS = ['id', 'created', 'business', 'channel'];
function duplicateOrMiscasedCoreKey(text) {
  const keys = fm.fieldKeys(text);
  const seen = Object.create(null);
  for (const k of keys) {
    if (seen[k]) return k;
    seen[k] = true;
    const lower = k.toLowerCase();
    if (lower !== k && CORE_KEYS.indexOf(lower) !== -1) return k;
  }
  return null;
}

/* ═══════════════════════ PreToolUse — apply_patch (Codex) ═══════════════════ */

/**
 * Codex sends file edits as tool_name "apply_patch" with the V4A patch in
 * tool_input.command (NOT Write/Edit/MultiEdit). parseApplyPatch pulls out, per
 * affected file: the op, an optional Move-to destination (a rename), the raw hunk
 * body lines (context/+/-), and, for an Add, the full new content. The UPDATE
 * path RECONSTRUCTS the resulting file (applyV4A) and runs the SAME checks a
 * normal Write gets (checkWorkItemWrite), so every guarantee — status, frozen
 * fields, duplicate/mis-cased keys, a removed label fence — is enforced through
 * one engine rather than a partial delta.
 */
function parseApplyPatch(command) {
  const lines = String(command).split('\n');
  const files = [];
  let cur = null;
  const push = () => { if (cur) files.push(cur); cur = null; };
  for (const raw of lines) {
    const line = raw.replace(/\r$/, '');
    let m;
    if ((m = line.match(/^\*\*\*\s+Update File:\s*(.+)$/))) { push(); cur = { op: 'update', path: m[1].trim(), moveTo: null, hunk: [], addLines: [] }; continue; }
    if ((m = line.match(/^\*\*\*\s+Add File:\s*(.+)$/)))    { push(); cur = { op: 'add',    path: m[1].trim(), moveTo: null, hunk: [], addLines: [] }; continue; }
    if ((m = line.match(/^\*\*\*\s+Delete File:\s*(.+)$/))) { push(); cur = { op: 'delete', path: m[1].trim(), moveTo: null, hunk: [], addLines: [] }; continue; }
    if ((m = line.match(/^\*\*\*\s+Move to:\s*(.+)$/)))     { if (cur) cur.moveTo = m[1].trim(); continue; } // rename destination
    if (/^\*\*\*\s+(Begin|End) Patch/.test(line)) { push(); continue; }
    if (!cur) continue;
    if (cur.op === 'add') {
      cur.addLines.push(line.startsWith('+') ? line.slice(1) : line); // Add File lists new content (usually +prefixed)
    } else if (cur.op === 'update') {
      cur.hunk.push(line); // keep the ordered hunk (context/+/-/@@) for reconstruction
    }
  }
  push();
  return { files };
}

/** Find the sub-sequence `seq` in `arr` at or after index `from`; -1 if absent. */
function indexOfSeq(arr, seq, from) {
  if (seq.length === 0) return from;
  for (let i = from; i + seq.length <= arr.length; i++) {
    let ok = true;
    for (let j = 0; j < seq.length; j++) if (arr[i + j] !== seq[j]) { ok = false; break; }
    if (ok) return i;
  }
  return -1;
}

/**
 * applyV4A(currentText, hunkLines) -> the resulting text, or null when the patch
 * cannot be applied cleanly (context not found). Handles the V4A body: '@@'
 * section markers, ' ' context, '-' deletions, '+' additions, across one or more
 * hunks. Deterministic and conservative — a null means "I could not reconstruct",
 * and the caller then denies rather than guessing.
 */
function applyV4A(currentText, hunkLines) {
  const cur = currentText.split(/\r?\n/); // tolerate CRLF work items
  const isMarker = (l) => /^@@/.test(l) || /^\*\*\*\s+End of File\b/.test(l); // section / EOF markers, not content
  const out = [];
  const appends = []; // context-free additions -> appended at END, never before the label
  let ci = 0;
  let i = 0;
  while (i < hunkLines.length) {
    if (isMarker(hunkLines[i])) { i++; continue; }
    const oldSeq = [];
    const newSeq = [];
    while (i < hunkLines.length && !isMarker(hunkLines[i])) {
      const l = hunkLines[i].replace(/\r$/, '');
      if (l.startsWith('+')) newSeq.push(l.slice(1));
      else if (l.startsWith('-')) oldSeq.push(l.slice(1));
      else { const c = l.startsWith(' ') ? l.slice(1) : l; oldSeq.push(c); newSeq.push(c); }
      i++;
    }
    // A pure-addition hunk (no context, no deletion) has no anchor. Inserting it
    // at the cursor would put it at the top (before the frontmatter) and falsely
    // look like the label was dropped. An append doesn't touch the
    // label, so defer these to the end — the frontmatter checks stay correct.
    if (oldSeq.length === 0) { for (const nl of newSeq) appends.push(nl); continue; }
    const at = indexOfSeq(cur, oldSeq, ci);
    if (at === -1) return null; // cannot locate the context -> unreconstructable
    for (; ci < at; ci++) out.push(cur[ci]);
    for (const nl of newSeq) out.push(nl);
    ci += oldSeq.length;
  }
  for (; ci < cur.length; ci++) out.push(cur[ci]);
  for (const nl of appends) out.push(nl);
  return out.join('\n');
}

function resolveRel(root, p) { return path.isAbsolute(p) ? path.resolve(p) : path.resolve(root, p); }

/** PreToolUse for a Codex apply_patch: check every affected file (incl. renames). */
function evaluateApplyPatch(parsed, root) {
  const ti = parsed.toolInput || {};
  const cmd = typeof ti.command === 'string' ? ti.command : (typeof ti.patch === 'string' ? ti.patch : null);
  if (cmd === null) return { action: 'allow' };
  const { files } = parseApplyPatch(cmd);
  const rel = (p) => paths.toPosix(path.relative(root, p));
  // Cross-business isolation (strict mode): read the lane + mode once for the
  // whole patch. A patch is a sequence, but the session lane does not move.
  const isoMode = readIsolationMode(root);
  // A corrupt/tampered marker means the lane can't be trusted — fail CLOSED (strict),
  // never fall through to the no-lane path (preserve + never proceed).
  if (isoMode === 'strict' && laneMarkerCorrupt(root, parsed.sessionId)) {
    return { action: 'deny', reason: corruptMarkerMessage(root, parsed.sessionId) };
  }
  const lane = laneBusiness(root, parsed.sessionId);
  // With no stored lane yet, the patch's FIRST business target is a PROVISIONAL
  // lane, so a single patch that spans two businesses before any lane exists is
  // still caught on the second business. Judged on the RESOLVED business
  // (twin) so a symlinked first target names its true landing business.
  let firstBiz = null;
  for (const f of files) {
    const s = resolveRel(root, f.path);
    firstBiz = resolvedBusinessMismatch(root, s) || paths.businessOf(root, s);
    if (!firstBiz && f.moveTo) { const d = resolveRel(root, f.moveTo); firstBiz = resolvedBusinessMismatch(root, d) || paths.businessOf(root, d); }
    if (firstBiz) break;
  }
  // Atomic first-write-wins claim (strict, no stored lane): two PARALLEL first patches
  // into different businesses converge on ONE lane, and the loser's targets are then
  // validated against the winner — denied, not allowed through.
  let effLane = lane || firstBiz;
  if (isoMode === 'strict' && !lane && firstBiz) {
    effLane = claimLaneAtomic(root, parsed.sessionId, firstBiz) || firstBiz;
  }

  // A patch is a SEQUENCE — an earlier move creates a destination that a later op
  // can hit. Track a virtual "does an item exist here" state across the ops so a
  // move-then-delete, or a move that overwrites an item created earlier in the
  // same patch, is caught. itemAt overrides the real filesystem.
  const itemAt = new Map();
  const existsItem = (p) => (itemAt.has(p) ? itemAt.get(p) : (fs.existsSync(p) && paths.isWorkItem(root, p)));

  for (const f of files) {
    const src = resolveRel(root, f.path);
    const dest = f.moveTo ? resolveRel(root, f.moveTo) : src;
    // Machinery is off-limits for ANY op, on BOTH the source and a Move-to dest —
    // except an owner-created custom skill (a machine-folder path the owner owns).
    // Judged on the lexical path AND its realpath twin (machineWriteDenied), so a
    // symlink whose target is a machine file is denied like a direct machine write.
    if (machineWriteDenied(root, src)) return { action: 'deny', reason: machineMessage(root, src) };
    if (machineWriteDenied(root, dest)) return { action: 'deny', reason: machineMessage(root, dest) };

    // System bookkeeping is equally off-limits for any op:
    // an apply_patch into `.snapshots/` would rewrite the approval proof.
    if (bookkeepingWriteDenied(root, src)) return { action: 'deny', reason: bookkeepingMessage(root, src) };
    if (bookkeepingWriteDenied(root, dest)) return { action: 'deny', reason: bookkeepingMessage(root, dest) };

    const srcIsItem = paths.isWorkItem(root, src);
    const destIsItem = paths.isWorkItem(root, dest);
    const isMove = dest !== src;

    // §4.1 item-model symlink guarantee: a src/dest whose lexical path is NOT a work
    // item but whose realpath twin IS one would skip the born/transition/frozen/receipt
    // rules below — deny it, same as the file-tool guard (author at the real work/ path).
    if (smuggledWorkItem(root, src)) return { action: 'deny', reason: smuggledItemMessage(root, src) };
    if (isMove && smuggledWorkItem(root, dest)) return { action: 'deny', reason: smuggledItemMessage(root, dest) };

    // §4.1/§4.3 symlink guarantee for BUSINESS identity, independent of the lane.
    // A src/dest whose realpath twin resolves into a DIFFERENT business than its
    // lexical name is a disguised cross-business write — deny it even with NO lane
    // and even when the lexical name is OUTSIDE any business (e.g. a `shared/` symlink
    // that lands in a business), so it can never slip through as the lane-binding
    // first patch op. A divergent path is never a valid carve-out (its twin, by
    // definition, does not resolve to its lexical business), so this can't block a
    // legitimate in-place status flip. Mirrors crossBusinessGuard (file-tool arm).
    if (isoMode === 'strict') {
      const srcMis = resolvedBusinessMismatch(root, src);
      const destMis = isMove ? resolvedBusinessMismatch(root, dest) : null;
      const mis = (srcMis && srcMis !== effLane) ? srcMis : ((destMis && destMis !== effLane) ? destMis : null);
      if (mis) return { action: 'deny', reason: effLane ? crossBusinessMessage(effLane, mis) : crossBusinessResolveMessage(paths.businessOf(root, srcMis === mis ? src : dest), mis) };
    }

    // Cross-business isolation (strict). A write touching a business other than
    // the session's lane (stored, or the patch's provisional first business) is
    // denied, EXCEPT an in-place, frontmatter-only status/receipt/note edit of an
    // existing work item (the queue carve-out).
    if (isoMode === 'strict' && effLane) {
      // Judge the source and dest on the lexical path AND its realpath twin, so a
      // symlink whose name sits in-lane but whose target escapes to another business
      // is caught here too (§4 symlink-resolution guarantee).
      const other = crossesLaneBusiness(root, src, effLane) || crossesLaneBusiness(root, dest, effLane);
      if (other) {
        let carve = false;
        // The carve-out is a real in-place item edit — require the dest's twin to
        // resolve to the same business as its lexical path (no symlink escape).
        if (!isMove && f.op === 'update' && destIsItem && fs.existsSync(dest) &&
            twinBusinessOf(root, dest) === paths.businessOf(root, dest)) {
          const nt = applyV4A(safeRead(dest), f.hunk);
          if (nt !== null && isCarveOutEdit(safeRead(dest), nt)) carve = true;
        }
        if (!carve) return { action: 'deny', reason: crossBusinessMessage(effLane, other) };
      }
    }

    if (f.op === 'delete') {
      // No silent deletion of the owner's items — including one MOVED to this path
      // earlier in the same patch (existsItem consults the virtual state).
      if (existsItem(src)) return { action: 'deny', reason: deleteItemMessage(rel(src)) };
      itemAt.set(src, false);
      continue;
    }

    if (f.op === 'add') {
      if (destIsItem) {
        if (existsItem(dest)) return { action: 'deny', reason: overwriteMessage(rel(dest)) };
        const d = checkWorkItemWrite(root, dest, f.addLines.join('\n'));
        if (d.action === 'deny') return d;
      }
      itemAt.set(dest, destIsItem);
      continue;
    }

    // Update / move. Move safety first:
    if (isMove && srcIsItem) {
      if (!destIsItem) return { action: 'deny', reason: moveOutMessage(rel(src)) }; // stealth removal from the queue
      if (paths.businessOf(root, src) !== paths.businessOf(root, dest)) return { action: 'deny', reason: crossBusinessMoveMessage() };
      if (paths.channelOf(root, src) !== paths.channelOf(root, dest)) return { action: 'deny', reason: crossChannelMoveMessage() };
    }
    // A move whose destination already holds an item would overwrite/destroy it.
    if (isMove && existsItem(dest)) return { action: 'deny', reason: overwriteMessage(rel(dest)) };

    if (!destIsItem) { if (isMove) itemAt.set(src, false); continue; } // moving non-items around

    // Reconstruct from the SOURCE, then run the full engine. A rename validates
    // against the SOURCE's current state; a move-IN / in-place write validates
    // against the DESTINATION (new for a move-in, so born-rules apply).
    const newText = applyV4A(safeRead(src), f.hunk);
    if (newText === null) return { action: 'deny', reason: unreconstructableMessage(rel(dest)) };
    const currentRef = (isMove && srcIsItem) ? src : dest;
    const d = checkWorkItemWrite(root, currentRef, newText);
    if (d.action === 'deny') return d;

    // Capture the REAL pre-write on-disk status for step 3b. Read it
    // from the SOURCE (its status before this op) but key it by the DESTINATION,
    // which is where PostToolUse stamps and later reads the pre-status.
    recordPreStatus(root, parsed.sessionId, dest, src);

    if (isMove) itemAt.set(src, false);
    itemAt.set(dest, true);
  }
  // The whole patch passed — bind the lane (first-write-wins) so a first patch
  // binds the lane at PreToolUse, not only at PostToolUse.
  if (isoMode === 'strict' && effLane) touchLaneForBusiness(root, parsed.sessionId, effLane);
  return { action: 'allow' };
}

/* ════════════════════════════ PreToolUse — Bash (4.3) ══════════════════════ */

function stripToken(t) {
  let s = String(t).trim();
  if (s.length >= 2) {
    const a = s[0];
    const b = s[s.length - 1];
    if ((a === '"' && b === '"') || (a === "'" && b === "'")) s = s.slice(1, -1);
  }
  return s;
}

/**
 * Split a command segment into tokens the way the shell does, and hand back the
 * VALUES: whitespace separates, quotes and backslashes do not, and adjacent
 * quoted and bare runs GLUE into one word.
 *
 * The old regex (`"[^"]*"|'[^']*'|[^\s]+`) got two shapes wrong, and both hid a
 * real write target: `new\ post.md` split into two tokens,
 * so the destination classified was `post.md`; and `acme/"work"/social/x.md`
 * matched as one bare run WITH the quotes still in it, so `fsNorm('"work"')`
 * was not `work` and every work-item rule was skipped while the shell created
 * the item. An unterminated quote simply ends the token — the guard reads what
 * the shell would read up to that point rather than dropping the word.
 */
/**
 * Decode ONE ANSI-C escape starting at `s[at]` (which is a backslash). Returns
 * { ch, next } — the produced character(s) and the index just past the escape.
 * Covers the escapes a path obfuscator would reach for (`\x73`, `\163`, `/`,
 * `\n`, `\\`, …); an unknown escape yields the literal following character, which
 * is what bash does for e.g. `\z`.
 */
function ansiCEscape(s, at) {
  const n = s[at + 1];
  if (n === undefined) return { ch: '\\', next: at + 1 };
  const simple = { n: '\n', t: '\t', r: '\r', a: '\x07', b: '\b', f: '\f', v: '\v', e: '\x1b', E: '\x1b', '\\': '\\', "'": "'", '"': '"', '?': '?', '`': '`', '$': '$' };
  if (Object.prototype.hasOwnProperty.call(simple, n)) return { ch: simple[n], next: at + 2 };
  if (n === 'x') { const m = /^[0-9A-Fa-f]{1,2}/.exec(s.slice(at + 2)); if (m) return { ch: String.fromCharCode(parseInt(m[0], 16)), next: at + 2 + m[0].length }; }
  if (n === 'u') { const m = /^[0-9A-Fa-f]{1,4}/.exec(s.slice(at + 2)); if (m) return { ch: String.fromCharCode(parseInt(m[0], 16)), next: at + 2 + m[0].length }; }
  if (n === 'U') { const m = /^[0-9A-Fa-f]{1,8}/.exec(s.slice(at + 2)); if (m) { try { return { ch: String.fromCodePoint(parseInt(m[0], 16)), next: at + 2 + m[0].length }; } catch (_) { return { ch: '', next: at + 2 + m[0].length }; } } }
  if (n >= '0' && n <= '7') { const m = /^[0-7]{1,3}/.exec(s.slice(at + 1)); if (m) return { ch: String.fromCharCode(parseInt(m[0], 8) & 0xff), next: at + 1 + m[0].length }; }
  return { ch: n, next: at + 2 };
}

function tokenize(seg) {
  const s = String(seg);
  const out = [];
  let cur = '';
  let started = false;
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (c === ' ' || c === '\t' || c === '\n' || c === '\r') {
      if (started) { out.push(cur); cur = ''; started = false; }
      i += 1;
      continue;
    }
    if (c === '\\') {                       // backslash quotes the next character
      if (i + 1 < s.length) { cur += s[i + 1]; i += 2; } else { cur += c; i += 1; }
      started = true;
      continue;
    }
    // ANSI-C quoting: `$'…'` expands escapes and GLUES to its neighbours exactly
    // like any other quoted run, so `set$'up.md'` is the single word `setup.md`.
    // Without this the tokenizer saw a literal `$` joined
    // to a quoted run and judged `set$up.md`, while the shell wrote `setup.md`.
    // `$"…"` is locale translation — the text passes through, so it is read as a
    // plain double-quoted run with the `$` dropped.
    if (c === '$' && (s[i + 1] === "'" || s[i + 1] === '"')) {
      if (s[i + 1] === '"') { i += 1; continue; }  // $"…": drop $, let the quote handler glue it
      const q = "'";
      let j = i + 2;
      started = true;
      while (j < s.length && s[j] !== q) {
        if (s[j] === '\\' && j + 1 < s.length) { const r = ansiCEscape(s, j); cur += r.ch; j = r.next; continue; }
        cur += s[j];
        j += 1;
      }
      i = j < s.length ? j + 1 : j;
      continue;
    }
    if (c === '"' || c === "'") {
      const q = c;
      let j = i + 1;
      started = true;
      while (j < s.length && s[j] !== q) {
        if (q === '"' && s[j] === '\\' && j + 1 < s.length) { cur += s[j + 1]; j += 2; continue; }
        cur += s[j];
        j += 1;
      }
      i = j < s.length ? j + 1 : j;
      continue;
    }
    cur += c;
    started = true;
    i += 1;
  }
  if (started) out.push(cur);
  return out;
}

/**
 * Re-quote one token so a list of TOKENS can travel as one command string and
 * come back the same words. Needed because a nested payload (find -exec, xargs)
 * is re-tokenized when it is dequeued, and tokenize() now returns unquoted
 * values — without this, `-exec sed -i 's/a b/c/' {} +` would come back as two
 * words and the operand list would shift.
 */
function shQuote(tok) {
  const t = String(tok);
  return /[\s"'`$\\|&;<>()*?]/.test(t) ? "'" + t.replace(/'/g, "'\\''") + "'" : t;
}

/**
 * The inner commands of a dollar-paren substitution, a backquoted run, and the
 * process-substitution forms that open with a less-than or greater-than sign.
 *
 * A substitution RUNS its payload, so it is a command like any other, but the
 * segment split only ever broke on semicolons, pipes and ampersands — so an
 * echo of a substituted sed -i on an item was judged as an echo, and the sed
 * inside it met no rule at all. Paren nesting is counted,
 * so a payload containing its own substitution comes back whole; the caller
 * re-scans what it enqueues, and each pass strips at least the outer pair, so
 * the walk always terminates.
 */
function substitutionPayloads(seg) {
  const s = String(seg);
  const out = [];
  for (let i = 0; i < s.length; i++) {
    const two = s.slice(i, i + 2);
    if (two === '$(' || two === '<(' || two === '>(') {
      let depth = 1;
      let j = i + 2;
      let buf = '';
      for (; j < s.length; j++) {
        if (s[j] === '(') depth += 1;
        else if (s[j] === ')') { depth -= 1; if (depth === 0) break; }
        buf += s[j];
      }
      if (buf.trim()) out.push(buf);
      i = j;
      continue;
    }
    if (s[i] === '`') {
      const j = s.indexOf('`', i + 1);
      if (j === -1) break;
      const buf = s.slice(i + 1, j);
      if (buf.trim()) out.push(buf);
      i = j;
    }
  }
  return out;
}

// Verbs this guard RECOGNISES. Used to find the real command behind a wrapper
// whose option value or required operand looks like a command name
// (`timeout 10 bash -c …`, `env -u NAME sed -i …`). The
// read verbs earn their place by STOPPING that scan: without them,
// `timeout 10 grep rm acme/work/…` would re-point at `rm` and refuse an
// ordinary search. A tail with no recognised verb is left exactly as before.
const BASH_WRITE_VERBS = new Set([
  'cp', 'mv', 'copy-item', 'move-item', 'install', 'rsync', 'ln', 'link',
  'rm', 'del', 'remove-item', 'rmdir', 'rd',
  'tee', 'set-content', 'add-content', 'out-file', 'new-item', 'touch', 'truncate',
  'mkdir', 'chmod', 'chown', 'chattr', 'dd', 'sed', 'perl', 'ruby',
  'tar', 'gtar', 'bsdtar', 'unzip', '7z', '7za', 'unar', 'cpio', 'git',
]);
const BASH_NEST_VERBS = new Set([
  'bash', 'sh', 'zsh', 'dash', 'ksh', 'pwsh', 'powershell', 'eval', 'xargs', 'find',
]);
const BASH_READ_VERBS = new Set([
  'cat', 'head', 'tail', 'less', 'more', 'grep', 'egrep', 'fgrep', 'rg', 'ag',
  'ls', 'wc', 'sort', 'uniq', 'cut', 'awk', 'diff', 'stat', 'file', 'echo',
  'printf', 'node', 'python', 'python3', 'jq', 'npm', 'npx', 'make', 'pwd',
  'date', 'which', 'test', 'true', 'false', 'sleep', 'open', 'basename', 'dirname',
]);
const BASH_KNOWN_VERBS = new Set([...BASH_WRITE_VERBS, ...BASH_NEST_VERBS, ...BASH_READ_VERBS]);

// Best-effort (SPEC §4.3): shell verbs that PRINT a file to the screen. A .env
// argument to one of these would leak secret values, so it is denied. The dot/
// source builtins that LOAD a .env into a script's environment are deliberately
// NOT here — sourcing keys so a script can use them is allowed; printing them is
// not. This list is not exhaustive; the charter + Doctor are the other layers.
/** Strip trailing shell punctuation a token may carry, e.g. `acme/.env)` -> `acme/.env`. */
function cleanArg(tok) { return stripToken(tok).replace(/[)'";,]+$/, ''); }

/**
 * envPathInText(seg) -> the first `.env` secrets-file reference in a raw command
 * segment, or null. Finds `.env` (or `.env.<suffix>`) used as a filename ANYWHERE
 * in the text — inside a quoted interpreter string (a node -e readFileSync of an
 * x/.env path), a command substitution, a copy-to-stdout — not only after a known
 * read verb. The final `isEnvFile` check keeps `.environment` / `.env-example` from
 * matching. Callers exempt the pure `.`/`source` forms, which legitimately load a
 * `.env` for a script without revealing its values. Best-effort (SPEC §5.8): an
 * obfuscated read (base64, a copied file) can still evade; the Read guard, the
 * charter, and the Doctor scan are the other layers.
 */
function envPathInText(seg) {
  const re = /[^\s'"`()=;:,|&<>\/\\]*\.env(?:\.[A-Za-z0-9_-]+)*(?=[\s'"`()=;:,|&<>\/\\.]|$)/gi;
  let m;
  while ((m = re.exec(String(seg)))) {
    const tok = m[0].replace(/^[`'"]+/, '');
    if (paths.isEnvFile(tok)) return tok;
  }
  return null;
}

/**
 * evaluateBashGuard(parsed, root) -> decision. Allowlist growos.js first; deny
 * a machine path that is the clear TARGET of a write (redirect target, cp/mv
 * destination, or any rm/del argument); otherwise warn on an ambiguous machine
 * mention; otherwise allow. False-positive philosophy (SPEC 4.3): deny only when
 * the write-target reading is unambiguous.
 */
/**
 * isToolInvocation(tokens) -> true when this command segment actually RUNS the
 * product tool (`node .../growos.js …`, or growos.js executed directly). A mere
 * mention (e.g. growos.js inside a trailing comment) does not count — that was
 * the substring "skeleton key" that let `echo x > AGENTS.md  # growos.js` slip
 * past the deny.
 */
function isToolInvocation(tokens) {
  if (!tokens.length) return false;
  const isGrowos = (t) => /(^|[\\/])growos\.js$/i.test(stripToken(t));
  if (isGrowos(tokens[0])) return true;
  const first = path.basename(stripToken(tokens[0])).replace(/\.exe$/i, '').toLowerCase();
  if (first !== 'node' && first !== 'node.js') return false;
  // For `node …`, growos.js must be the SCRIPT (the first non-flag argument), not
  // just any token — otherwise `node -e "<leak>" growos.js` would be waved through
  // as a tool call. Inline eval (`-e`/`-p`) runs no script.
  for (let i = 1; i < tokens.length; i++) {
    const t = stripToken(tokens[i]);
    // Inline eval runs no script — including the attached long forms
    // `--eval=…`/`--print=…`. `node --eval=0 growos.js` is NOT a
    // GrowOS invocation.
    if (t === '-e' || t === '-p' || /^--(eval|print)(=|$)/.test(t)) return false;
    if (t.startsWith('-')) continue;      // a node flag — keep scanning for the script
    return isGrowos(tokens[i]);           // the first positional arg is the script
  }
  return false;
}

function evaluateBashGuard(parsed, root) {
  const ti = parsed.toolInput || {};
  const cmd = typeof ti.command === 'string' ? ti.command
    : (typeof ti.cmd === 'string' ? ti.cmd : '');
  if (!cmd) return { action: 'allow' };

  // Where a RELATIVE operand actually lands. The shell resolves it against its
  // own working directory, which the hook receives (`parsed.cwd`) and the git
  // arm already used. The rest of this guard resolved from the install ROOT,
  // so every relative operand was judged in the wrong place whenever the
  // command ran from anywhere else, with no `cd` needed at all. `segCwd` is
  // the directory the CURRENT segment runs in; a `cd` earlier in the same
  // chain moves it.
  const rootCwd = (parsed && parsed.cwd) ? String(parsed.cwd) : String(root);
  let segCwd = rootCwd;
  const absFrom = (s) => { try { return path.isAbsolute(s) ? path.resolve(s) : path.resolve(segCwd, s); } catch (_) { return null; } };

  const isMach = (tok) => {
    const t = stripToken(tok);
    if (!t) return false;
    // A custom skill lives under a machine folder but is the OWNER's to write, so
    // Bash must not flag it as machinery — Write/Edit and apply_patch already exempt
    // it (isCustomSkillPath). Without this the warn scan would flag a custom-skill
    // mention that the other handlers allow. Lexical is enough for a warn.
    try { return paths.isMachinePath(root, t) && !paths.isCustomSkillPath(root, t); } catch (_) { return false; }
  };
  // Resolve-aware machine test, for DENY classifications only (write targets and
  // redirect targets — a bounded set). A write THROUGH a pre-existing symlink whose
  // target is machinery is denied even though its name looks innocent (§4 symlink
  // guarantee). The warn scan below stays lexical: it visits every token, and one
  // realpath per token would be wasteful for a heads-up. Identity for non-symlinks,
  // so a normal machine mention or a brand-new file behaves exactly as before.
  const isMachTargetDeny = (tok) => {
    const t = stripToken(tok);
    if (!t) return false;
    try {
      const abs = absFrom(t);
      if (!abs) return false;
      // machineWriteDenied judges machinery on the lexical path AND its realpath twin
      // and exempts an owner custom skill — so Bash agrees with Write/Edit/apply_patch:
      // a write THROUGH a machine-target symlink is denied while a custom
      // skill stays writable.
      return machineWriteDenied(root, abs);
    } catch (_) { return false; }
  };
  // Same resolve-aware shape for the bookkeeping space:
  // a Bash rm/cp/tee/redirect into `.snapshots/`, `.state/` or `.growos/` is the
  // same rewrite-the-record move the file-tool guard now denies.
  const isBookkeepingTargetDeny = (tok) => {
    const t = stripToken(tok);
    if (!t) return false;
    try {
      const abs = absFrom(t);
      return abs ? bookkeepingWriteDenied(root, abs) : false;
    } catch (_) { return false; }
  };

  const machineHits = [];   // a write to GrowOS machinery -> deny
  const bookkeepingHits = []; // a write into snapshots/logbook/staging/watcher state -> deny
  const crossHits = [];     // a write into another business than the lane -> deny (strict)
  const envReadHits = [];   // a command that would print a .env -> deny
  const writeBusinesses = []; // ordered {tok, business} for each business write target
  let warnHit = null;
  let itemDeny = null;      // a rm/mv/cp that breaks a work-item delete/move rule -> deny
  let contentDeny = null;   // a shell CONTENT write into a work item or setup.md -> deny
  let gitWorkTreeHit = null; // a git rm/mv pointed at an explicit work tree -> deny

  const rel = (p) => paths.toPosix(path.relative(root, p));
  const toAbs = (a) => { const s = cleanArg(a); return s ? absFrom(s) : null; };
  const isDir = (p) => { try { return !!p && fs.statSync(p).isDirectory(); } catch (_) { return false; } };
  const isLiveItem = (p) => !!p && paths.isWorkItem(root, p) && fs.existsSync(p);

  const isoMode = readIsolationMode(root);
  // A corrupt/tampered marker means the lane can't be trusted — fail CLOSED (strict),
  // consistent with the file-tool and apply_patch guards.
  if (isoMode === 'strict' && laneMarkerCorrupt(root, parsed.sessionId)) {
    return { action: 'deny', reason: corruptMarkerMessage(root, parsed.sessionId) };
  }
  const lane = laneBusiness(root, parsed.sessionId);

  // Classify one WRITE-TARGET token: machinery is denied everywhere; a path in a
  // business is recorded (in order) so the cross-business + provisional-lane check
  // can run against the whole command AFTER all targets are known.
  // A shell CONTENT write cannot be validated the way a file-tool edit can (no
  // incoming text to run the item rules on, no PostToolUse observer for Bash), so
  // Bash never writes item bytes or publishing settings — the file tools do, where
  // every rule runs. Judged on the lexical path AND
  // its realpath twin, like every other deny classification here.
  const contentTargetDeny = (tok) => {
    const t = cleanArg(tok);
    if (!t) return;
    const abs = absFrom(t);
    if (abs) contentTargetDenyAbs(abs);
  };
  const contentTargetDenyAbs = (abs) => {
    const twin = realTwin(abs);
    const rr = realTwin(root);
    if (paths.isWorkItem(root, abs) || (twin !== abs && paths.isWorkItem(rr, twin))) {
      if (!contentDeny) {
        contentDeny = 'This command would write into a work item (' + rel(abs) + '). The queue\'s ' +
          'label and status rules are checked on file edits, and a shell write cannot be checked the ' +
          'same way — use the Write/Edit tools (or a growos command) instead.';
      }
      return;
    }
    const isSetup = (p2, base) => paths.fsNorm(path.basename(p2)) === 'setup.md' && !!paths.businessOf(base, p2);
    if (isSetup(abs, root) || (twin !== abs && isSetup(twin, rr))) {
      if (!contentDeny) {
        contentDeny = 'This command would change ' + rel(abs) + '. Publishing settings change only on ' +
          'the owner\'s word, through the file tools the system can observe — use Write/Edit instead.';
      }
    }
  };

  const noteWriteTarget = (tok) => {
    const t = cleanArg(tok);
    if (!t) return;
    if (isMachTargetDeny(t)) { machineHits.push(t); return; }
    if (isBookkeepingTargetDeny(t)) { bookkeepingHits.push(t); return; }
    let b = null;
    try {
      // §4.1/§4.3: the business a write LANDS in is judged on BOTH the lexical name
      // and the realpath twin. A symlink whose in-lane name resolves into ANOTHER
      // business is recorded under the RESOLVED business, so the cross-business check
      // and the provisional-lane bind below see the real landing site, not the innocent
      // name — matching what Write/Edit/apply_patch already enforce.
      // A RELATIVE operand lands where the SEGMENT's shell cwd puts it, not the
      // install root: resolving `../other/brain/voice.md` from the root missed a
      // cross-business write whenever the command ran from a subfolder.
      // `absFrom` uses segCwd, like every other target resolution here.
      const abs = absFrom(t);
      if (abs) b = resolvedBusinessMismatch(root, abs) || paths.businessOf(root, abs);
    } catch (_) { b = null; }
    if (b) writeBusinesses.push({ tok: t, business: b });
  };

  // A helper for the BLIND-NESTING rule below: does any token of the whole
  // command resolve to guarded space (a work item, a business's work tree,
  // setup.md, bookkeeping)? Used only when a content verb's real targets are
  // invisible (xargs/find -exec), where over-matching is the safe direction.
  // Is this absolute path guarded WRITE space — a work item, anywhere inside a
  // business's work tree, the business root itself (where setup.md lives), or
  // bookkeeping? Segment comparison, never a built regex: a business name is the
  // owner's words and may contain regex metacharacters, which an earlier
  // version interpolated straight into `new RegExp`.
  // A realpath twin must be judged against the ROOT's own realpath, never the
  // lexical root — macOS aliases /var and /tmp, so the twin carries a different
  // prefix and every path predicate would silently escape (the trap already
  // documented above realTwin).
  const rootTwin = realTwin(root);
  const guardedSpaceAt = (abs, base) => {
    const b = base || root;
    if (!abs) return false;
    if (paths.isWorkItem(b, abs) || paths.isBookkeepingPath(b, abs)) return true;
    if (paths.fsNorm(path.basename(abs)) === 'setup.md' && !!paths.businessOf(b, abs)) return true;
    if (!paths.businessOf(b, abs)) return false;
    const r = path.relative(b, abs);
    if (r.startsWith('..')) return false;
    const segs = paths.toPosix(r).split('/').filter(Boolean);
    return segs.length >= 2 && paths.fsNorm(segs[1]) === 'work';
  };
  // The business root itself, or its work tree: the two places a directory-level
  // write (an archive extraction, a recursive copy) can drop files the guard
  // never sees — a new item, or a replacement setup.md.
  const guardedWriteDirAt = (abs, base) => {
    const b = base || root;
    if (!abs || !paths.businessOf(b, abs)) return false;
    const r = path.relative(b, abs);
    if (r.startsWith('..')) return false;
    const segs = paths.toPosix(r).split('/').filter(Boolean);
    // A top-level name is a business ROOT only if it is really a folder there.
    // `isBusinessName` is a name-shape rule that never touches the disk, so
    // without this an ordinary root-level FILE name ("post.md") read as a
    // business and every folder copy near the root was refused — a probe found
    // this masking the tokenizer's own test.
    if (segs.length === 1) return isDir(abs);
    return paths.fsNorm(segs[1]) === 'work';
  };
  const guardedWriteDir = (abs) => {
    if (!abs) return false;
    const twin = realTwin(abs);
    return guardedWriteDirAt(abs) || (twin !== abs && guardedWriteDirAt(twin, rootTwin));
  };

  const guardedTouchMemo = new Map();
  const rootAbsForTouch = (() => { try { return path.resolve(root); } catch (_) { return String(root); } })();
  const touchesGuardedSpace = () => {
    if (guardedTouchMemo.has(segCwd)) return guardedTouchMemo.get(segCwd);
    let hit = false;
    for (const tok of tokenize(cmd)) {
      const t = cleanArg(tok);
      if (!t) continue;
      const abs = absFrom(t);
      if (!abs) continue;
      // The install ROOT itself (a `.` in a git-backed install, an argument that
      // names the whole tree) sweeps EVERY business at once — a blind write there
      // touches guarded space by definition (`git checkout -- .`). A business
      // ROOT or its work tree is guarded write space too: a blind `find acme
      // -exec …`/subshell `cd` drops files the guard never sees, which
      // `guardedWriteDir` recognises where the work-tree-only `guardedSpaceAt`
      // did not.
      if (abs === rootAbsForTouch || guardedWriteDir(abs)) { hit = true; break; }
      // Judged on the lexical path AND its realpath twin, like every other deny
      // classification here. Without the twin, a link whose innocent name sits
      // outside the work tree (`acme/brain/items -> acme/work`) made a blind
      // command look like it touched nothing.
      const twin = realTwin(abs);
      if (guardedSpaceAt(abs) || (twin !== abs && guardedSpaceAt(twin, rootTwin))) { hit = true; break; }
    }
    guardedTouchMemo.set(segCwd, hit);
    return hit;
  };

  // Evaluate per command segment so an allowlisted growos.js segment can't shield
  // a sibling segment (`node …/growos.js update; rm AGENTS.md` still denies rm).
  // A WORKLIST rather than a plain loop: a shell wrapper's
  // -c payload, a find -exec tail, and an xargs tail are commands too, and the
  // old code judged only the wrapper's own verb — `bash -c "sed -i …"` walked
  // straight past every rule. Nested payloads are enqueued and judged like any
  // segment; xargs/find nests are marked BLIND (their real file operands are
  // invisible here), which trips the fail-toward-deny rule for content verbs.
  const segQueue = [];
  /**
   * Enqueue one command CHAIN, carrying `cd` state along it. The shell resolves
   * a later segment's relative operands against the directory an earlier `cd`
   * moved it to, so `cd acme && cp /tmp/x work/social/new.md` really mints
   * `acme/work/social/new.md` while an earlier guard classified a root-level
   * path and saw nothing. A `cd` this guard cannot follow
   * (no argument, `cd -`, a variable) makes the REST of the chain BLIND, which
   * is the existing fail-toward-deny lane for content verbs.
   */
  const enqueueChain = (text, blindStart, startCwd) => {
    let cur = startCwd;
    let blind = blindStart;
    // Split the chain into segments while HONOURING the operator between them and
    // subshell parentheses, because a `cd` only reliably moves the NEXT command's
    // directory when it is sequenced unconditionally at the top level. The old
    // `split(/[;|&\n]+/)` collapsed `&&`, `||`, `|`, `&` and subshell scope into
    // one separator and applied a `cd` the shell skips: `true || cd /tmp; tee
    // …setup.md` moved the guard to /tmp while the shell wrote setup.md, and
    // `(cd acme; tee ../acme/setup.md)` changed the shell's dir while the guard
    // read `(cd` as an unknown verb. A conditional / pipe /
    // background / subshell boundary makes the cwd UNCERTAIN — the existing
    // fail-toward-deny lane for content verbs (blind).
    const s = String(text);
    let seg = '';
    const flush = (uncertainAfter) => {
      const part = seg; seg = '';
      const tk = tokenize(part);
      if (tk.length) {
        const v0 = path.basename(stripToken(tk[0])).toLowerCase();
        if (v0 === 'cd' || v0 === 'pushd' || v0 === 'popd') {
          const dirArg = tk.map((t) => stripToken(t)).slice(1).filter((t) => t && !t.startsWith('-'))[0];
          // Trust a cd only when we are NOT already blind (a conditional/pipe/
          // subshell boundary preceded it): otherwise the shell may have skipped
          // it, or it ran in a scope whose cwd does not persist.
          if (blind || v0 === 'popd' || !dirArg || dirArg === '-' || /[$`*?~]/.test(dirArg)) blind = true;
          else { const next = path.isAbsolute(dirArg) ? path.resolve(dirArg) : path.resolve(cur, dirArg); if (next) cur = next; else blind = true; }
        } else {
          segQueue.push({ seg: part, blind, cwd: cur });
        }
      }
      if (uncertainAfter) blind = true;
    };
    for (let i = 0; i < s.length; i++) {
      const c = s[i];
      // Skip over quoted runs so an operator inside a quote is not a boundary.
      if (c === '"' || c === "'") { const j = s.indexOf(c, i + 1); if (j === -1) { seg += s.slice(i); i = s.length; } else { seg += s.slice(i, j + 1); i = j; } continue; }
      if (c === '\\' && i + 1 < s.length) { seg += c + s[i + 1]; i += 1; continue; }
      const two = s.slice(i, i + 2);
      if (two === '&&' || two === '||') { flush(true); i += 1; continue; }   // conditional: cwd uncertain onward
      if (c === ';' || c === '\n') { flush(false); continue; }               // plain sequence: cwd persists
      if (c === '|' || c === '&') { flush(true); continue; }                 // pipe / background: subshell, cwd uncertain
      if (c === '(' || c === ')') { flush(true); continue; }                 // subshell boundary: cwd uncertain
      seg += c;
    }
    flush(false);
  };
  enqueueChain(cmd, false, rootCwd);

  while (segQueue.length) {
    const item = segQueue.shift();
    const seg = item.seg;
    const blind = item.blind;
    segCwd = item.cwd || rootCwd;
    const tokens = tokenize(seg);
    if (tokens.length === 0) continue;

    // A substitution RUNS its payload, so it is a command too: an echo of a
    // substituted in-place edit on an item used to be judged as an echo, and
    // the edit inside it met no rule at all.
    for (const inner of substitutionPayloads(seg)) enqueueChain(inner, blind, segCwd);

    // 1) Redirect targets are the SHELL's write, independent of the program, so
    //    check them on EVERY segment — including a growos.js one. Otherwise
    //    `node system/tools/growos.js doctor > AGENTS.md` would slip through the
    //    tool allowlist.
    // Redirect targets feed ONLY the machine check. Cross-business classification
    // is left to the explicit write VERBS below: the redirect regex is loose
    // enough to read a `=>` arrow or `>=` inside a `node -e`/`awk` script as a
    // redirect, and machine paths are specific enough that a stray match is
    // harmless there — but a business name is not, so a loose match must never
    // reach the cross-business rule (it would deny an innocent inline script).
    const redir = /[0-9]?>>?\s*("[^"]+"|'[^']+'|[^\s;|&<>()]+)/g;
    let m;
    while ((m = redir.exec(seg))) {
      if (isMachTargetDeny(m[1])) { machineHits.push(stripToken(m[1])); continue; }
      if (isBookkeepingTargetDeny(m[1])) { bookkeepingHits.push(stripToken(m[1])); continue; }
      // A redirect is a CONTENT write: `echo done > item.md` rewrites the item
      // with no rule running. Work items and setup.md are
      // specific paths, so the loose redirect match cannot deny an innocent
      // inline script the way a business-wide rule would.
      contentTargetDeny(m[1]);
    }

    // Leading VAR=value tokens are the shell's ENVIRONMENT for the command,
    // not the command: `GIT_WORK_TREE=x git rm …` and
    // `FOO=1 rm …` are judged by the verb that FOLLOWS the assignments — the
    // old code saw the assignment as an unknown verb and skipped every rule.
    // A GIT_DIR / GIT_WORK_TREE / GIT_INDEX_FILE assignment is remembered:
    // it moves git's idea of the working tree exactly like the --flags do.
    let envExotic = null;
    {
      // Quote-aware, on the RAW segment: a spaced value in `GIT_DIR="…"` breaks
      // tokenwise shifting exactly like it breaks the git option walk.
      const ASSIGN = /^\s*(?:[A-Za-z_][A-Za-z0-9_]*=(?:"[^"]*"|'[^']*'|[^\s]*)\s+)+/;
      const m2 = ASSIGN.exec(seg);
      if (m2) {
        if (/(^|\s)(GIT_WORK_TREE|GIT_DIR|GIT_INDEX_FILE)=/.test(m2[0])) {
          envExotic = 'a GIT_* environment override';
        }
        const rest = tokenize(seg.slice(m2[0].length));
        if (rest.length === 0) continue; // the whole segment is assignments: nothing runs
        tokens.length = 0;
        for (const t of rest) tokens.push(t);
      }
    }

    // 3b) A .env read leaks secret values. Scan BEFORE the tool-invocation skip
    //     below, so a trailing "growos.js" argument can't shield an inline
    //     `node -e` that reads a .env. Any .env reference in
    //     a segment is denied — interpreter, substitution, or a plain `cat` all
    //     leak it. The ONLY exempt form is a pure `.`/`source`, which LOADS keys
    //     into a script without printing them (`set -a; . ./acme/.env; set +a`).
    const v0 = path.basename(stripToken(tokens[0])).toLowerCase();
    if (v0 !== '.' && v0 !== 'source') {
      const hit = envPathInText(seg);
      if (hit) envReadHits.push(hit);
    }

    // The tool legitimately rewrites machinery via its OWN internals, so skip the
    // verb-based checks for a real growos.js invocation — but only AFTER the
    // redirect and .env checks above have already run on this segment.
    if (isToolInvocation(tokens)) continue;

    // Wrappers: a passthrough prefix (command/env/nohup/…)
    // merely relays its tail; a shell's -c payload IS a command; find -exec and
    // xargs run a command whose file operands this guard cannot see.
    {
      const PASSTHROUGH = new Set(['command', 'nohup', 'nice', 'time', 'stdbuf', 'timeout', 'env', 'doas', 'setsid', 'ionice']);
      const vbAt = (i) => path.basename(stripToken(tokens[i] || '')).replace(/\.exe$/i, '').toLowerCase();
      let ti = 0;
      // A wrapper's option VALUE or required operand is
      // neither a flag nor a VAR=v pair, so the old walk stopped ON it and
      // judged `10`/`NAME` as the verb — `timeout 10 bash -c 'sed -i … item.md'`
      // and `env -u NAME bash -c …` met no rule at all. After a wrapper, scan
      // forward for the first token this guard RECOGNISES as a verb and
      // re-point there. The read verbs in that set stop the scan, so
      // `timeout 10 grep rm acme/work` still reads as a grep, not an rm. A tail
      // with no recognised verb falls back to the old flag walk, so an
      // unfamiliar shape behaves exactly as it did before.
      // Options in the passthrough wrappers that CONSUME the next token as a
      // VALUE, so that value is never the command. `env -u rm tee …setup.md`
      // set the guard's verb to `rm` (the -u value) and skipped tee's content
      // rule; the same shape covers `timeout -s SIG`,
      // `nice -n N`, `stdbuf -o0`, `ionice -c2`.
      const WRAPPER_VALUE_OPTS = new Set([
        '-u', '--unset', '-C', '--chdir', '-S', '--split-string',   // env
        '-s', '--signal', '-k', '--kill-after',                     // timeout
        '-n', '--adjustment',                                       // nice
        '-i', '-o', '-e',                                           // stdbuf
        '-c', '-p',                                                 // ionice / taskset
      ]);
      if (PASSTHROUGH.has(vbAt(0))) {
        let j = 1;
        while (j < tokens.length) {
          const tj = stripToken(tokens[j]);
          if (WRAPPER_VALUE_OPTS.has(tj)) { j += 2; continue; }  // skip the option AND its value
          if (BASH_KNOWN_VERBS.has(vbAt(j))) break;
          j += 1;
        }
        if (j < tokens.length) ti = j;
        else {
          while (ti < tokens.length && PASSTHROUGH.has(vbAt(ti))) {
            ti += 1;
            while (ti < tokens.length &&
                   (/^-/.test(stripToken(tokens[ti])) || /^[A-Za-z_][A-Za-z0-9_]*=/.test(stripToken(tokens[ti])))) ti += 1;
          }
        }
      }
      if (ti > 0) { tokens.splice(0, ti); if (tokens.length === 0) continue; }

      const vb = vbAt(0);
      const SHELLS = new Set(['bash', 'sh', 'zsh', 'dash', 'ksh', 'pwsh', 'powershell']);
      // `eval` JOINS all its arguments with spaces and runs the result as one
      // command. Enqueuing each argument separately judged a zero-operand `tee`
      // and an unknown `acme/setup.md`, so `eval /usr/bin/tee acme/setup.md`
      // wrote setup.md past every rule. Re-quote the values
      // so a spaced operand survives the re-tokenize, then judge the whole line.
      if (vb === 'eval') {
        // eval CONCATENATES its arguments with spaces and re-parses the result
        // as shell source. Join the token VALUES raw (not re-quoted) — the quotes
        // inside a value are syntax eval will re-interpret — then judge the whole
        // line. `eval "sed -i 's/x/y/' item.md"` is one value that re-parses to a
        // real sed; `eval /usr/bin/tee …setup.md` is two values that join into a
        // tee. A bare `--` is eval's end-of-options marker.
        const parts = [];
        for (let i = 1; i < tokens.length; i++) {
          const t = stripToken(tokens[i]);
          if (t === '--') continue;
          parts.push(t);
        }
        if (parts.length) enqueueChain(parts.join(' '), blind, segCwd);
        continue;
      }
      // A shell's -c payload IS a command.
      if (SHELLS.has(vb)) {
        // A PowerShell payload can travel base64'd (UTF-16LE), where it is
        // opaque text to every rule below. Decode it and judge what it says.
        if (vb === 'pwsh' || vb === 'powershell') {
          for (let i = 1; i < tokens.length - 1; i++) {
            if (!/^-e(c|nc|ncoded|ncodedcommand)?$/i.test(stripToken(tokens[i]))) continue;
            let decoded = '';
            try { decoded = Buffer.from(stripToken(tokens[i + 1]), 'base64').toString('utf16le'); } catch (_) { decoded = ''; }
            if (decoded.trim()) enqueueChain(decoded, blind, segCwd);
          }
        }
        // Every non-flag argument may be a script payload; enqueue each as
        // ordinary segments. Over-enqueuing is harmless (an unknown "verb"
        // matches no rule), under-enqueuing was an earlier bypass.
        for (let i = 1; i < tokens.length; i++) {
          const t = stripToken(tokens[i]);
          if (t.startsWith('-')) continue;
          enqueueChain(t, blind, segCwd);
        }
        continue; // the shell itself writes nothing; its payloads are queued
      }
      if (vb === 'xargs') {
        // The operands arrive on stdin — invisible here. Judge the nested
        // command, marked blind. Tokens are re-quoted on the way out: they come
        // back through tokenize(), which now returns VALUES, so a spaced
        // argument would otherwise split into two words.
        const rest2 = [];
        for (let i = 1; i < tokens.length; i++) {
          const t = stripToken(tokens[i]);
          if (rest2.length === 0 && t.startsWith('-')) continue; // xargs' own flags
          rest2.push(shQuote(t));
        }
        if (rest2.length) segQueue.push({ seg: rest2.join(' '), blind: true, cwd: segCwd });
        continue;
      }
      if (vb === 'find') {
        // Everything between -exec/-execdir/-ok and the closing ;/+ is a
        // command over found files. It is BLIND only when `{}` actually hands
        // it those files: without a placeholder the command runs on its own
        // literal operands, and marking it blind refused honest work.
        for (let i = 1; i < tokens.length; i++) {
          const t = stripToken(tokens[i]).toLowerCase();
          if (t === '-exec' || t === '-execdir' || t === '-ok' || t === '-okdir') {
            // -execdir / -okdir run the command IN THE FOUND FILE'S DIRECTORY,
            // not the shell's cwd — which this walker cannot know, so those are
            // always blind. A plain `{}` still makes -exec
            // blind because the operands are the found files.
            const dirRelative = t === '-execdir' || t === '-okdir';
            const sub = [];
            let placeholder = false;
            let j = i + 1;
            for (; j < tokens.length; j++) {
              const tj = stripToken(tokens[j]);
              if (tj === ';' || tj === '+' || tj === '\\;') break;
              if (tj.indexOf('{}') !== -1) { placeholder = true; if (tj === '{}') continue; }
              sub.push(shQuote(tj));
            }
            if (sub.length) segQueue.push({ seg: sub.join(' '), blind: blind || placeholder || dirRelative, cwd: segCwd });
            i = j;
          }
        }
        // fall through: find itself is judged too (its tree arg is harmless)
      }
    }

    // 2/3) Common write verbs whose target is a machine file (or a cross-business
    // file). SPEC §4.3 is best-effort (the manifest + Doctor are the real net),
    // but the obvious write verbs should be denied, not merely warned.
    //
    // `git mv` and `git rm` are the same file operations wearing a wrapper, and
    // classifying only the FIRST token as the verb let them walk past every
    // rule below — the guard re-points at the
    // subcommand so the mv/rm rules apply unchanged. Only those two: other git
    // subcommands do not take work-item paths as file operands this way.
    //
    // Finding the subcommand means walking PAST git's global options, several
    // of which take a VALUE (-C dir, -c k=v, --git-dir dir, --work-tree dir,
    // --namespace ns) — treating the value as the subcommand let
    // `git -C somewhere mv …` skip every rule. -C also
    // changes what relative operands mean, so they are resolved against it
    // here, before classification. And `git rm --cached` or a --dry-run never
    // touches the working tree, so those are not re-pointed at all — denying
    // them was a refusal of legitimate work.
    let verbTokens = tokens;
    let gitBlindWrite = false;
    if (path.basename(stripToken(tokens[0])).replace(/\.exe$/i, '').toLowerCase() === 'git') {
      const VALUED = ['-C', '-c', '--git-dir', '--work-tree', '--namespace', '--exec-path', '--super-prefix'];
      // Relative -C is relative to the SHELL's cwd, which the hook receives —
      // resolving it from the install root examined a different tree entirely
      // when the command ran from a subfolder.
      const shellCwd = parsed && parsed.cwd ? String(parsed.cwd) : String(root);
      let base = null;
      let gitExotic = envExotic; // env GIT_* assignments count exactly like the --flags
      let k = 1;
      while (k < tokens.length) {
        const t = stripToken(tokens[k]);
        if (!t.startsWith('-')) break;
        if (VALUED.indexOf(t) !== -1) {
          if (t === '-C' && k + 1 < tokens.length) {
            const v = stripToken(tokens[k + 1]);
            base = path.resolve(base === null ? shellCwd : base, v);   // repeated -C composes, like git's own
          }
          // An explicit work tree or repo moves git's OWN idea of where
          // operands land: when the effective cwd is outside the work tree,
          // git resolves them against the work-tree ROOT, not the cwd this
          // walker resolves against. Config names are
          // case-insensitive to git, so core.worktree is matched that way.
          if (t === '--work-tree' || t === '--git-dir') gitExotic = t;
          if (t === '-c' && k + 1 < tokens.length &&
              /^core\.worktree=/i.test(stripToken(tokens[k + 1]))) gitExotic = '-c core.worktree';
          k += 2;
          continue;
        }
        if (t.length > 2 && t.startsWith('-C')) {   // attached form: -Cdir
          const v = t.slice(2).replace(/^=/, '');
          base = path.resolve(base === null ? shellCwd : base, v);
        }
        const tl = t.toLowerCase();
        if (tl.startsWith('--work-tree=')) gitExotic = '--work-tree';
        else if (tl.startsWith('--git-dir=')) gitExotic = '--git-dir';
        else if (t.startsWith('-c') && t.length > 2 && /^core\.worktree=/i.test(t.slice(2))) gitExotic = '-c core.worktree';
        k += 1;   // a valueless flag, or one with its value attached (--git-dir=x, -ck=v)
      }
      const sub = k < tokens.length ? stripToken(tokens[k]).toLowerCase() : '';
      // Backstop for the walk itself: a QUOTE INSIDE an
      // attached value (`--work-tree="/spaced path"`) defeats the tokenizer,
      // so the "subcommand" lands on a path fragment and the rm/mv rules
      // below never run at all. When an exotic flag was seen and the raw
      // segment names an rm/mv, deny without trying to parse further — the
      // passivity exemption needs a clean parse to be trustworthy, and
      // over-matching is the safe direction for a deny guard.
      if (sub !== 'mv' && sub !== 'rm' &&
          gitExotic !== null && gitWorkTreeHit === null && /(^|[\s"'`])(rm|mv)\b/.test(seg)) {
        // A quote is as good as a space to the shell: `'rm'` is still rm.
        gitWorkTreeHit = gitExotic;
      }
      // `mv` and `rm` are not the only git subcommands that
      // change files on disk. checkout/restore/switch/apply/am/stash/clean/
      // reset/revert/cherry-pick/merge/pull/rebase all rewrite the working tree
      // from git's own storage, and which bytes land is invisible here — so they
      // are judged the way every other blind command is: refused when the
      // command names guarded space. Read-only subcommands (status, log, diff,
      // show, …) are not on the list and stay allowed.
      const GIT_WORKTREE_WRITING = new Set(['checkout', 'restore', 'switch', 'apply', 'am',
        'stash', 'clean', 'reset', 'revert', 'cherry-pick', 'merge', 'pull', 'rebase']);
      if (sub && sub !== 'mv' && sub !== 'rm' && GIT_WORKTREE_WRITING.has(sub)) gitBlindWrite = true;

      if (sub === 'mv' || sub === 'rm') {
        // `--` ends the options: a `--cached` AFTER it is a file name, not a
        // flag, and must neither grant passivity nor be dropped from
        // inspection. A single-dash cluster containing
        // `n` (-fn, -vn) is a dry run like the exact -n.
        const rest2 = tokens.slice(k + 1);
        const stripped = rest2.map((t) => stripToken(t));
        const dd = stripped.indexOf('--');
        const optZone = dd === -1 ? stripped : stripped.slice(0, dd);
        const isDryFlag = (t) => t === '--dry-run' || /^-[a-zA-Z]*n[a-zA-Z]*$/.test(t);
        const passive = (sub === 'rm' && optZone.indexOf('--cached') !== -1) || optZone.some(isDryFlag);
        // A non-passive rm/mv pointed at an explicit work tree or repo is
        // refused outright: git's prefix rules resolve
        // operands against the work-tree root whenever the effective cwd is
        // outside it, and this guard cannot mirror that faithfully — so it
        // cannot tell which files the command would really delete or move.
        // Over-matching is the safe direction for a deny guard; index-only
        // (--cached) and dry runs stay allowed, they touch no working tree.
        if (!passive && gitExotic !== null && gitWorkTreeHit === null) {
          gitWorkTreeHit = gitExotic;
        }
        if (!passive) {
          const effBase = base === null ? null : base;
          verbTokens = [tokens[k]].concat(rest2.map((t, i2) => {
            const s2 = stripped[i2];
            const afterDD = dd !== -1 && i2 > dd;
            if (s2 === '--' && i2 === dd) return t;
            // After --, every token is a PATH: resolve it (a leading dash
            // would otherwise read as a flag downstream and escape the item
            // rules). Before --, only non-flag operands are paths.
            if (!afterDD && s2.startsWith('-')) return t;
            if (path.isAbsolute(s2)) return t;
            return path.resolve(effBase === null ? shellCwd : effBase, s2);
          }));
        }
      }
    }
    const verb = path.basename(stripToken(verbTokens[0])).replace(/\.exe$/i, '');
    const vlow = verb.toLowerCase();
    const rest = verbTokens.slice(1);
    const args = rest.filter((t) => !stripToken(t).startsWith('-'));
    const flags = rest.filter((t) => stripToken(t).startsWith('-'));
    const denyLast = () => { if (args.length) noteWriteTarget(args[args.length - 1]); };
    const denyAny = () => { for (const a of args) noteWriteTarget(a); };

    // Where a copy/move/link's operands really point. `-t DIR` /
    // `--target-directory=DIR` INVERTS the usual order: the destination is the
    // flag's value and EVERY positional is a source. An earlier model read
    // the last positional as the destination, so `mv -t acme/work/social
    // /tmp/x.md` classified the SOURCE as the target (minting an item unseen)
    // and `mv -t /tmp acme/work/social/item.md` moved an item out of the queue
    // with the delete rule never running. Computed once,
    // so the content rules and the item delete/move rules read the same shape.
    let targetDir = null;
    for (let i = 0; i < rest.length; i++) {
      const t = stripToken(rest[i]);
      if (t === '-t' || t === '--target-directory') { targetDir = stripToken(rest[i + 1] || ''); break; }
      if (!t.startsWith('-')) continue;
      const attached = /^(?:--target-directory=|-t)(.+)$/.exec(t);
      if (attached) { targetDir = attached[1].replace(/^=/, ''); break; }
    }
    const positional = args.map((a) => cleanArg(a)).filter((a) => a);
    const opSources = targetDir === null ? positional.slice(0, -1) : positional.filter((a) => a !== targetDir);
    const opDest = targetDir === null ? (positional.length ? positional[positional.length - 1] : null) : targetDir;
    const opDestIsDir = targetDir !== null || isDir(toAbs(opDest));

    // Compare every write verb case-INSENSITIVELY (vlow), so a lowercase PowerShell
    // verb (`set-content`, `out-file`, `copy-item`, `move-item`, `remove-item`)
    // is caught exactly like its title-case spelling — the shell resolves the cmdlet
    // regardless of case, so the guard must too.
    if (vlow === 'cp' || vlow === 'mv' || vlow === 'copy-item' || vlow === 'move-item' ||
        vlow === 'install' || vlow === 'rsync' || vlow === 'ln' || vlow === 'link') {
      let sources = opSources;
      let destRaw = opDest;
      // `ln SOURCE` / `link SOURCE` with a SINGLE operand makes a link named
      // basename(SOURCE) in the current directory — so the created name, not the
      // operand, is the write target. Reading the one operand as the destination
      // let `ln -f brain/setup.md` mint `./setup.md` unseen.
      if ((vlow === 'ln' || vlow === 'link') && targetDir === null && opSources.length === 0 && opDest !== null) {
        sources = [opDest];
        destRaw = path.join(segCwd, path.basename(cleanArg(opDest)));
      }
      if (destRaw !== null) noteWriteTarget(destRaw);   // the destination is the write target

      // cp/install/rsync REPLACE the destination's content
      // and can MINT a brand-new item with no birth rule running — and a
      // directory destination writes each source's basename inside it, so the
      // basename form is judged too. mv gets the same rule EXCEPT the one
      // legal shape Bash keeps: renaming an existing item within its own
      // business and channel (the item rules above still govern that move).
      // `ln` is in this loop now too: it MAKES the destination, so a link is
      // just as good a way to mint an item or replace setup.md — the same gap
      // an earlier fix left open.
      if (sources.length && destRaw !== null) {
        const rawDest = toAbs(destRaw);
        const destDir = opDestIsDir;
        for (const a of sources) {
          const src = toAbs(a);
          const destForA = destDir && src ? path.join(rawDest, path.basename(src)) : rawDest;
          if (!destForA) continue;
          const isMvVerb = vlow === 'mv' || vlow === 'move-item';
          const legalRename = isMvVerb && src && isLiveItem(src) &&
            paths.isWorkItem(root, destForA) &&
            paths.businessOf(root, src) === paths.businessOf(root, destForA) &&
            paths.channelOf(root, src) === paths.channelOf(root, destForA);
          if (!legalRename) contentTargetDenyAbs(destForA);
        }
      }

      // A RECURSIVE or directory-to-directory copy writes children this guard
      // never sees, so the .md basename test above has nothing to test. Into a
      // business's work tree or its root, that is minting.
      const recursive = flags.some((f) => {
        const s = stripToken(f);
        return /^--(recursive|archive)$/.test(s) || (/^-[A-Za-z]*$/.test(s) && /[raR]/.test(s.slice(1)));
      });
      // A trailing SLASH marks a directory source; a trailing backslash does
      // not — on POSIX that is an ordinary character in a file name, and
      // reading it as a separator made a broken path spelling look like a
      // folder copy.
      const dirSource = (a) => a.endsWith('/') || a.endsWith(path.sep) || isDir(toAbs(a));
      if (destRaw !== null && (recursive || sources.some(dirSource))) {
        const destAbs = toAbs(destRaw);
        if (destAbs && guardedWriteDir(destAbs) && !contentDeny) {
          contentDeny = 'This copies a whole folder into ' + rel(destAbs) + '. The guard cannot see which ' +
            'files land there, and a work item or a setup.md arriving that way skips every rule — copy the ' +
            'files you mean by name, or use the file tools.';
        }
      }

      // rsync -R / --relative recreates each SOURCE's full relative path UNDER
      // the destination, so the file lands at dest/<source-path>, not
      // dest/<basename> — `rsync -R Acme/work/social/new.md <root>/` mints
      // `<root>/Acme/work/social/new.md` while the basename test judged an
      // innocent `<root>/new.md`. Judge the real landing.
      const rsyncRelative = vlow === 'rsync' && flags.some((f) => {
        const s = stripToken(f);
        return /^--relative$/.test(s) || (/^-[A-Za-z]*$/.test(s) && s.slice(1).indexOf('R') !== -1);
      });
      if (rsyncRelative && destRaw !== null) {
        const destAbs = toAbs(destRaw);
        for (const a of sources) {
          const relSrc = cleanArg(a).replace(/^\.\//, '');
          if (!relSrc || path.isAbsolute(relSrc)) continue;   // -R keeps the path AS WRITTEN; absolute forms are exotic
          const landed = destAbs ? path.join(destAbs, relSrc) : null;
          if (!landed) continue;
          contentTargetDenyAbs(landed);
          if (guardedWriteDir(landed) && !contentDeny) {
            contentDeny = 'This lands files at ' + rel(landed) + ' (rsync -R keeps the source path). The ' +
              'guard cannot see which files arrive there, and a work item or setup.md arriving that way skips ' +
              'every rule — copy the files you mean by name, or use the file tools.';
          }
        }
      }

      // `ln` makes a SECOND NAME for its source. A second name for a guarded
      // file (a snapshot, an item, setup.md, machinery) is how its
      // protections get dodged — the innocent name writes the same bytes.
      // `cp -l`/`cp -s` make exactly the same second name, and `link` is
      // `ln` under another spelling.
      const cpLinks = (vlow === 'cp' || vlow === 'copy-item') && flags.some((f) => {
        const s = stripToken(f);
        return /^--(link|symbolic-link)$/.test(s) || (/^-[A-Za-z]*$/.test(s) && /[ls]/.test(s.slice(1)));
      });
      if (vlow === 'ln' || vlow === 'link' || cpLinks) {
        for (const a of sources) {
          const src = toAbs(a);
          if (!src) continue;
          const isSetupSrc = paths.fsNorm(path.basename(src)) === 'setup.md' && !!paths.businessOf(root, src);
          if (paths.isWorkItem(root, src) || bookkeepingWriteDenied(root, src) ||
              machineWriteDenied(root, src) || isSetupSrc) {
            if (!contentDeny) {
              contentDeny = 'This would give ' + rel(src) + ' a second name. That file is guarded, and a ' +
                'second name is how a guarded file gets edited past its guard — so links to it are refused.';
            }
          }
        }
      }
    } else if (vlow === 'tar' || vlow === 'gtar' || vlow === 'bsdtar' || vlow === 'unzip' ||
               vlow === '7z' || vlow === '7za' || vlow === 'unar' || vlow === 'cpio') {
      // An archive extraction creates files the guard cannot enumerate. Into a
      // business's work tree or its root, that mints items and can drop a new
      // setup.md with no rule running. Writing an archive
      // (tar -c) or LISTING one (tar -t, unzip -l, 7z l) reads instead of
      // writing, so those are not extraction — refusing them was a refusal of
      // honest work.
      const flagStr = rest.map((t) => stripToken(t)).join(' ');
      const hasShort = (ch) => new RegExp('(^|\\s)-[A-Za-z]*' + ch).test(flagStr);
      let extracts;
      if (vlow === 'tar' || vlow === 'gtar' || vlow === 'bsdtar') {
        extracts = rest.some((t) => { const s = stripToken(t); return s === '--extract' || (/^-?[A-Za-z]+$/.test(s) && s.replace(/^-/, '').indexOf('x') !== -1); });
      } else if (vlow === 'unzip') {
        // unzip WRITES unless it is a list/test-only run (-l, -v list; -t test; -z zipinfo comment).
        extracts = !(hasShort('l') || hasShort('v') || hasShort('t') || hasShort('z'));
      } else if (vlow === '7z' || vlow === '7za') {
        const sub = args.length ? stripToken(args[0]).toLowerCase() : '';
        extracts = sub === 'x' || sub === 'e';   // l = list, t = test, a = add (reads)
      } else if (vlow === 'cpio') {
        // cpio -i (extract) and -p (pass-through copy) WRITE files; -o creates an
        // archive to stdout, which reads.
        extracts = !(hasShort('o') || /--create/.test(flagStr));
      } else {
        extracts = true;   // unar / others: assume it writes
      }
      if (extracts) {
        let into = null;
        for (let i = 0; i < rest.length; i++) {
          const t = stripToken(rest[i]);
          if (t === '-C' || t === '--directory' || t === '-d' || t === '-o') { into = stripToken(rest[i + 1] || ''); break; }
          const attached = /^(?:--directory=|-C|-d|-o)(.+)$/.exec(t);
          if (attached && t.startsWith('-')) { into = attached[1].replace(/^=/, ''); break; }
        }
        const destAbs = into ? toAbs(into) : segCwd;
        if (destAbs && guardedWriteDir(destAbs) && !contentDeny) {
          contentDeny = 'This unpacks an archive into ' + rel(destAbs) + '. The guard cannot see which files ' +
            'land there, and a work item arriving that way skips every rule — unpack somewhere else first, ' +
            'then bring over the files you mean.';
        }
      }
      denyAny();
    } else if (vlow === 'rm' || vlow === 'del' || vlow === 'remove-item' || vlow === 'rmdir' || vlow === 'rd') {
      denyAny();
    } else if (vlow === 'tee' || vlow === 'set-content' || vlow === 'add-content' ||
               vlow === 'out-file' || vlow === 'new-item' || vlow === 'touch' || vlow === 'truncate' ||
               vlow === 'mkdir' || vlow === 'chmod' || vlow === 'chown' || vlow === 'chattr') {
      denyAny(); // these WRITE / create / clear / re-permission their file argument(s)
      // The pure content writers also hit the item/setup rule.
      // mkdir/chmod/chown/chattr write no bytes; touch at most creates an EMPTY
      // file (no status to fake — an unstamped item is the Doctor's to flag),
      // and it is the long-standing innocent lane-binding write. truncate DOES
      // change bytes (to none), so it stays in.
      if (vlow !== 'mkdir' && vlow !== 'chmod' && vlow !== 'chown' && vlow !== 'chattr' && vlow !== 'touch') {
        for (const a of args) contentTargetDeny(a);
        // BLIND nesting (xargs / find -exec): the real file operands are on
        // stdin or found at runtime — invisible here. When the command as a
        // whole mentions guarded space, fail toward deny.
        if (blind && !contentDeny && touchesGuardedSpace()) {
          contentDeny = 'This runs a file-writing command over files this guard cannot see (xargs / ' +
            'find -exec), and the command mentions guarded space (a work item, work folder, or ' +
            'setup.md). Use the file tools, or name the files directly so the rules can run.';
        }
      }
    } else if (vlow === 'dd') {
      for (const t of rest) {
        const s = stripToken(t);
        if (s.indexOf('of=') === 0) { noteWriteTarget(s.slice(3)); contentTargetDeny(s.slice(3)); }
      }
    } else if ((vlow === 'sed' || vlow === 'perl' || vlow === 'ruby') && flags.some((f) => /^-[a-z]*i/.test(stripToken(f)))) {
      // In-place edit (sed -i, perl -pi, ruby -i). The FIRST positional is the
      // SCRIPT, not a file, unless -e/-f already supplied one — reading it as a
      // write target made `sed -i 's/x/y/' brain/note.md` claim a business
      // called "s" and then refuse the real file as cross-business. A deny
      // guard that refuses honest work is its own defect.
      const scripted = flags.some((f) => /^-[a-zA-Z]*[ef]/.test(stripToken(f)));
      // -e/-f (and the bundles that END in e/f, like -ne) each take the NEXT
      // token as a SCRIPT or a script FILE, never a file to edit. Treating that
      // value as a file made `sed -i -e 's/x/y/' brain/note.md` refuse the honest
      // edit as a phantom business "s". Skip the consumed
      // script values; when NO -e/-f is present, the first positional is the
      // inline script and the rest are files.
      const consumed = new Set();
      for (let i = 0; i < rest.length; i++) {
        const t = stripToken(rest[i]);
        if (!t.startsWith('-')) continue;
        if (t === '-e' || t === '--expression' || t === '-f' || t === '--file') { consumed.add(i + 1); continue; }
        const mm = /^-([A-Za-z]+)$/.exec(t);
        if (mm && /[ef]$/.test(mm[1])) consumed.add(i + 1);   // a bundle ending in e/f consumes the next token
      }
      const positionalsAll = [];
      for (let i = 0; i < rest.length; i++) {
        if (stripToken(rest[i]).startsWith('-')) continue;
        if (consumed.has(i)) continue;
        positionalsAll.push(rest[i]);
      }
      const fileArgs = scripted ? positionalsAll : positionalsAll.slice(1);
      for (const a of fileArgs) noteWriteTarget(a);
      for (const a of fileArgs) contentTargetDeny(a);
      if (blind && !contentDeny && touchesGuardedSpace()) {
        contentDeny = 'This runs an in-place edit over files this guard cannot see (xargs / find -exec), ' +
          'and the command mentions guarded space. Use the file tools, or name the files directly.';
      }
    }

    // A Bash rm/mv/cp that targets a work ITEM gets the SAME delete/move
    // protection apply_patch enforces, so Bash is not the soft path around the queue
    // rules. Verbs compared case-insensitively (vlow), so `Remove-Item`/`Move-Item`
    // match too. Best-effort: only recognized file-level ops on real items are covered.
    if (!itemDeny) {
      if (vlow === 'rm' || vlow === 'del' || vlow === 'remove-item') {
        // Deleting an existing work item is denied — no silent removal from the queue.
        for (const a of args) { const src = toAbs(a); if (isLiveItem(src)) { itemDeny = deleteItemMessage(rel(src)); break; } }
      } else if ((vlow === 'mv' || vlow === 'move-item') && opSources.length && opDest !== null) {
        // A move: the destination holds the file under its own basename when it
        // is a directory; every other positional is a source. `-t` is read the
        // same way here as in the content rules above.
        const rawDest = toAbs(opDest);
        const destDir = opDestIsDir;
        for (const a of opSources) {
          const src = toAbs(a);
          const destForA = destDir && src ? path.join(rawDest, path.basename(src)) : rawDest;
          // A move ONTO an existing item destroys the item it lands on, whatever
          // the source is — same rule as the cp overwrite below.
          if (destForA && paths.isWorkItem(root, destForA) && fs.existsSync(destForA)) {
            itemDeny = overwriteMessage(rel(destForA)); break;
          }
          if (!isLiveItem(src)) continue;
          const dest = destForA;
          if (!paths.isWorkItem(root, dest)) { itemDeny = moveOutMessage(rel(src)); break; }          // stealth removal from the queue
          if (paths.businessOf(root, src) !== paths.businessOf(root, dest)) { itemDeny = crossBusinessMoveMessage(); break; }
          if (paths.channelOf(root, src) !== paths.channelOf(root, dest)) { itemDeny = crossChannelMoveMessage(); break; }
        }
      } else if ((vlow === 'cp' || vlow === 'copy-item') && opSources.length && opDest !== null) {
        // A copy that OVERWRITES an existing work item destroys it — mirrors an
        // apply_patch `add` onto an existing item.
        const rawDest = toAbs(opDest);
        const destDir = opDestIsDir;
        for (const a of opSources) {
          const src = toAbs(a);
          const dest = destDir && src ? path.join(rawDest, path.basename(src)) : rawDest;
          if (dest && paths.isWorkItem(root, dest) && fs.existsSync(dest)) { itemDeny = overwriteMessage(rel(dest)); break; }
        }
      }
    }

    // A git subcommand that rewrites the working tree writes bytes this guard
    // cannot enumerate — the same position xargs and find -exec are in, so the
    // same fail-toward-deny rule applies.
    if (gitBlindWrite && !contentDeny && touchesGuardedSpace()) {
      contentDeny = 'This git command rewrites files in the working tree, and the command names guarded ' +
        'space (a work item, a work folder, or setup.md). The guard cannot tell which bytes it would put ' +
        'there, so it is refused — use the file tools, or ask the owner to run it themselves.';
    }

    // 4) Ambiguous machine mention in a non-tool segment -> warn (allow).
    if (!warnHit) { for (const tok of tokens) if (isMach(tok)) { warnHit = stripToken(tok); break; } }
  }

  // Cross-business (strict): a write verb whose target is a business other than the
  // session lane is denied. With no stored lane, the FIRST business write target is
  // claimed as the lane with an ATOMIC first-write-wins claim, so two PARALLEL first
  // Bash writes into different businesses converge on ONE lane and the loser's targets
  // are validated against the winner — denied, not allowed through.
  let effLane = null;
  if (isoMode === 'strict') {
    effLane = lane;
    if (!effLane && writeBusinesses.length) effLane = claimLaneAtomic(root, parsed.sessionId, writeBusinesses[0].business);
    if (effLane) for (const w of writeBusinesses) if (w.business !== effLane) crossHits.push(w);
  }

  if (machineHits.length) return { action: 'deny', reason: bashDenyMessage(machineHits[0]) };
  if (envReadHits.length) return { action: 'deny', reason: envBashReadMessage(envReadHits[0]) };
  if (bookkeepingHits.length) {
    const abs = path.isAbsolute(bookkeepingHits[0]) ? path.resolve(bookkeepingHits[0]) : path.resolve(root, bookkeepingHits[0]);
    return { action: 'deny', reason: bookkeepingMessage(root, abs) };
  }
  if (itemDeny) return { action: 'deny', reason: itemDeny };
  if (contentDeny) return { action: 'deny', reason: contentDeny };
  if (gitWorkTreeHit) {
    return { action: 'deny', reason: 'This git command points at its own working tree (' + gitWorkTreeHit +
      '), so the guard cannot tell which files it would really delete or move — git resolves those ' +
      'names against that tree, not against the folder the command runs from. Run it as a plain ' +
      '`git rm` or `git mv` from inside the GrowOS folder instead. If the special form is truly ' +
      'needed, ask the owner to run it themselves; the owner is never blocked.' };
  }
  // Report the RESOLVED landing business (w.business), not the lexical name — a
  // symlinked target really lands in another business.
  if (crossHits.length) return { action: 'deny', reason: crossBusinessMessage(effLane, crossHits[0].business || 'another') };

  // A passing command that wrote into a business refreshes the lane (already claimed
  // atomically above on the first write; idempotent for later writes / a stored lane).
  if (effLane) touchLaneForBusiness(root, parsed.sessionId, effLane);
  if (warnHit) return { action: 'warn', reason: bashWarnMessage(warnHit) };
  return { action: 'allow' };
}

/* ════════════════════════════ PreToolUse — Read (secrets) ══════════════════ */

/**
 * evaluateReadGuard(parsed, root) -> decision. The AI never needs the VALUES in a
 * business's `.env`: the scripts that use a key read it straight from the file.
 * So a Read of any `.env` (this business's or another's) is denied — the one
 * sanctioned secrets home stays out of the AI's view. Everything else is allowed.
 */
function evaluateReadGuard(parsed, root) {
  const absPath = resolveTarget(parsed, root);
  if (!absPath) return { action: 'allow' };
  // Judge on the lexical path AND its realpath twin (envReadDenied), so a
  // symlink whose innocent name hides a `.env` target is denied like a direct read.
  if (envReadDenied(absPath)) {
    return { action: 'deny', reason: envReadMessage(paths.toPosix(path.relative(root, absPath))) };
  }
  return { action: 'allow' };
}

/* ════════════════════════════ PostToolUse (4.2) ════════════════════════════ */

function sessionsDir(root) { return path.join(root, '.growos', 'sessions'); }
function seenPathFor(root, sessionId) { return path.join(sessionsDir(root), sessionId + '-seen.json'); }
function markerPathFor(root, sessionId) { return path.join(sessionsDir(root), sessionId + '.json'); }
// The pre-write on-disk status of every work item this session touched, keyed by
// the item's relative path. Written by PreToolUse (the real status BEFORE a write),
// read by PostToolUse step 3b so an approval snapshot only refreshes on a genuine
// review -> approved THIS operation — never from the long-lived seen cache, which a
// stale session can carry across an owner's out-of-session approval.
function preStatusPathFor(root, sessionId) { return path.join(sessionsDir(root), sessionId + '-prestatus.json'); }

/** Read a per-session JSON map; {} on any problem (missing / unparseable). */
function readSessionJson(p) {
  try { const o = JSON.parse(fs.readFileSync(p, 'utf8')); return o && typeof o === 'object' ? o : {}; }
  catch (_) { return {}; }
}
/** Atomically write a per-session JSON map; never throws (must not crash the guard). */
function writeSessionJson(p, obj) {
  try { atomic.atomicWrite(p, JSON.stringify(obj)); } catch (_) { /* per-session state must never crash the guard */ }
}

/**
 * recordPreStatus(root, sessionId, keyAbs, srcAbs) -> capture the REAL on-disk
 * status of an EXISTING work item BEFORE the pending write, keyed (in the per-
 * session prestatus map) by keyAbs's relative path. srcAbs (default keyAbs) is the
 * file actually read — for an apply_patch move the status comes from the SOURCE but
 * is keyed by the DESTINATION, matching what postProcessItem later reads. A missing
 * file, a non-work-item, or an absent/empty status records nothing (ambiguous → the
 * step-3b default). Never throws. Capturing on a path that later denies is harmless:
 * the next real PreToolUse re-records the then-current status.
 */
function recordPreStatus(root, sessionId, keyAbs, srcAbs) {
  try {
    if (!sessionId || !keyAbs) return;
    const src = srcAbs || keyAbs;
    if (!fs.existsSync(src) || !paths.isWorkItem(root, src)) return;
    const cur = fm.getField(safeRead(src), 'status');
    if (cur === undefined || cur === '') return; // no definite pre-status to record
    const relKey = paths.toPosix(path.relative(root, keyAbs));
    const p = preStatusPathFor(root, sessionId);
    const map = readSessionJson(p);
    map[relKey] = cur;
    writeSessionJson(p, map);
  } catch (_) { /* pre-status capture must never crash the guard */ }
}

function readVersion(root) {
  try { return fs.readFileSync(path.join(root, 'system', 'VERSION'), 'utf8').trim(); }
  catch (_) { return ''; }
}

/**
 * handlePost(parsed, root) -> { exitCode, message }. Does all seven section-4.2
 * steps in order and returns the exit intent (0 silent, or 2 with a stderr line
 * for the type flag and the isolation warning).
 */
/**
 * A write to a business's setup.md may change a publishing mode. The observer
 * diffs the modes against the last seen state and logs each change with who
 * asked (Build Doc P5.3, detective control 1). It must NEVER break the write
 * it watches: every failure is swallowed — the reconciler and the Doctor are
 * the other detective layers.
 */
function maybeRecordModeChange(root, absPath, sessionId) {
  try {
    if (!absPath) return;
    if (paths.fsNorm(path.basename(absPath)) !== 'setup.md') return;
    const business = paths.businessOf(root, absPath);
    if (!business) return;
    const publishing = require('../tools/lib/publishing.js');
    publishing.recordModeChanges(root, business, { actor: 'ai', session: sessionId });
  } catch (_) { /* watching never blocks or breaks anything */ }
}

function handlePost(parsed, root) {
  const sessionId = parsed.sessionId || 'unknown-session';
  // Codex apply_patch can touch several files at once; process every affected
  // work item (add/update; a delete has nothing to stamp).
  if (parsed.toolName === 'apply_patch') {
    const ti = parsed.toolInput || {};
    const cmd = typeof ti.command === 'string' ? ti.command : (typeof ti.patch === 'string' ? ti.patch : null);
    if (cmd === null) return { exitCode: 0 };
    const { files } = parseApplyPatch(cmd);
    let exitCode = 0; let message = null;
    for (const f of files) {
      if (f.op === 'delete') continue;
      // After a move the file lives at the destination — stamp/freeze THAT path.
      const target = f.moveTo ? f.moveTo : f.path;
      const abs = path.isAbsolute(target) ? path.resolve(target) : path.resolve(root, target);
      // A brain/setup write also sets the session lane (work items bind it at the
      // top of postProcessItem, before any early return).
      if (!paths.isWorkItem(root, abs)) touchLaneForBusiness(root, sessionId, paths.businessOf(root, abs));
      maybeRecordModeChange(root, abs, sessionId);
      const r = postProcessItem(root, abs, sessionId);
      if (r.exitCode === 2 && exitCode === 0) { exitCode = 2; message = r.message; }
    }
    return { exitCode, message };
  }
  const abs = resolveTarget(parsed, root);
  // A brain/setup write establishes the lane too, so cross-business isolation
  // protects non-work files even in a brain-only session. Work items bind the lane
  // at the top of postProcessItem, before any early return.
  if (abs && !paths.isWorkItem(root, abs)) touchLaneForBusiness(root, sessionId, paths.businessOf(root, abs));
  maybeRecordModeChange(root, abs, sessionId);
  return postProcessItem(root, abs, sessionId);
}

function postProcessItem(root, absPath, sessionId) {
  if (!absPath || !paths.isWorkItem(root, absPath)) return { exitCode: 0 };
  if (!fs.existsSync(absPath)) return { exitCode: 0 };

  const business = paths.businessOf(root, absPath);
  const channel = paths.channelOf(root, absPath); // may be null (item directly in work/)

  // Bind the session lane FIRST, first-write-wins, BEFORE any early return below
  // (the missing-type flag), so a first write that early-returns still leaves the
  // lane bound. Step 7 keeps the cross-business warn. In strict mode
  // PreToolUse already bound it; this covers warn mode and any Post-only path.
  if (business) touchLaneForBusiness(root, sessionId, business);
  const today = todayISO();
  const original = fs.readFileSync(absPath, 'utf8');

  // ── Step 1: stamp missing core fields (insert-only), then repair empties. ──
  let text = original;
  const stamp = {
    id: ids.newId(),
    status: 'draft',
    business: business || undefined,
    channel: channel || undefined,
    created: today,
    headline: '',
    skill: '',
    note: '',
  };
  text = fm.stampMissing(text, stamp).text;

  // Repair fields that exist but are empty/invalid (stampMissing skips existing
  // keys, so these are fixed in place with setField — never duplicated).
  const idVal = fm.getField(text, 'id');
  if (idVal !== undefined && !ids.isId(idVal)) text = fm.setField(text, 'id', ids.newId());
  const createdVal = fm.getField(text, 'created');
  if (createdVal !== undefined && !isDate(createdVal)) text = fm.setField(text, 'created', today);
  const statusVal = fm.getField(text, 'status');
  if (statusVal !== undefined && statusVal === '') text = fm.setField(text, 'status', 'draft');
  if (business) {
    const bVal = fm.getField(text, 'business');
    if (bVal !== undefined && bVal === '') text = fm.setField(text, 'business', business);
  }
  if (channel) {
    const cVal = fm.getField(text, 'channel');
    if (cVal !== undefined && cVal === '') text = fm.setField(text, 'channel', channel);
  }
  // headline / skill / note stay as-is even when empty.

  if (text !== original) atomic.atomicWrite(absPath, text);

  const id = fm.getField(text, 'id');
  const status = fm.getField(text, 'status');
  const type = fm.getField(text, 'type');
  const headline = fm.getField(text, 'headline');
  const skill = fm.getField(text, 'skill');

  // ── Step 2: flag a missing type (the stamp above already ran). ──
  if (type === undefined || type === '') {
    return { exitCode: 2, message: typeFlagMessage() };
  }

  // ── Step 3: freeze once when the item first reaches review. ──
  // Write the snapshot ATOMICALLY (temp + rename) and only when one does not
  // already exist, so freeze-once holds AND a crash can never leave a truncated
  // snapshot that later writes then accept as the frozen original.
  let froze = false;
  const snapRel = path.join('.snapshots', String(id) + '.md');
  if (status === 'review' && ids.isId(id)) {
    const snapAbs = path.join(root, business, '.snapshots', id + '.md');
    if (!fs.existsSync(snapAbs)) {
      atomic.atomicWrite(snapAbs, text);
      froze = true;
    }
  }

  // ── Step 3b: capture the APPROVED copy — "what the owner said yes to." ──
  // The decision uses the REAL pre-write on-disk status captured by PreToolUse
  // (per-session prestatus map), NOT the long-lived seen cache. The seen cache is
  // only updated by PostToolUse, so a session that processed the item at review
  // and then had the OWNER approve it OUT of session keeps a stale seen='review';
  // reading that would let a later approved -> approved body edit overwrite the
  // approved copy with AI-changed bytes and ship tampered content. The
  // pre-status is the true status this write started from:
  //   - pre 'review'  -> a genuine review -> approved THIS op: REFRESH (even if the
  //     copy already exists — this is the publisher recovery loop converging).
  //   - pre 'approved' -> a plain save while already approved: NEVER refresh.
  //   - no pre-status captured (ambiguous) -> only the FIRST-EVER creation of the
  //     copy (safe default; matches a Post-only reconcile-style first approval).
  // Out-of-session re-approvals stay the reconcile path's job. Atomic, never torn.
  const relKey = paths.toPosix(path.relative(root, absPath));
  const seenP = seenPathFor(root, sessionId);
  let seen = {};
  try { seen = JSON.parse(fs.readFileSync(seenP, 'utf8')) || {}; } catch (_) { seen = {}; }
  const prevStatus = seen[relKey]; // still the pre-write status source for Step 4's flip detection

  if (status === 'approved' && ids.isId(id)) {
    const apAbs = path.join(root, business, '.snapshots', id + '.approved.md');
    const preStatus = readSessionJson(preStatusPathFor(root, sessionId))[relKey];
    let refresh;
    if (preStatus === 'review') refresh = true;           // genuine review -> approved this op
    else if (preStatus === 'approved') refresh = false;   // a plain save while already approved
    else refresh = !fs.existsSync(apAbs);                 // ambiguous: first-ever creation only
    if (refresh) atomic.atomicWrite(apAbs, text);
  }

  // ── Step 4: record the logbook (created / flip / frozen). ──
  // Pre-write status is not observable here (PostToolUse runs AFTER the tool),
  // so we keep a per-session {path -> last status} cache and compare against it
  // (read above in Step 3b). On a first-touch-this-session miss we compare
  // against the frozen snapshot if one exists, else treat it as a created event.
  // (Known limit: a file first touched in a brand-new session with no snapshot
  // logs `created` again — the reconciler and Doctor are the backstops; it is
  // evidence, not truth.)

  // SPEC 5.3: approve/reject flips only happen on the owner's say-so in chat,
  // so their provenance is recorded as such.
  const flipActor = function (from, to) {
    if (from === 'review' && (to === 'approved' || to === 'rejected')) return 'ai-on-owner-instruction';
    return 'ai';
  };

  if (prevStatus !== undefined) {
    if (prevStatus !== status) {
      logbook.append(root, business, { actor: flipActor(prevStatus, status), session: sessionId, event: 'flip', id: id, from: prevStatus, to: status });
    }
  } else {
    // Cache miss: the pre-write status is unknown this session. Never synthesize
    // a flip from the review-era snapshot — it is frozen once and does not track
    // later status, so doing so fabricated illegal edges (e.g. review->published)
    // on a plain body edit of an already-approved/published item. Emit `created`
    // only when this genuinely looks new: no snapshot existed before this call
    // and the item is still a draft. Any real out-of-session status change is
    // left for `reconcile` to detect against the snapshot; the hook never guesses.
    const snapAbsPre = path.join(root, business, '.snapshots', String(id) + '.md');
    const hadSnapshotBefore = fs.existsSync(snapAbsPre) && !froze;
    if (!hadSnapshotBefore && status === 'draft') {
      logbook.append(root, business, { actor: 'ai', session: sessionId, event: 'created', id: id, path: relKey, skill: skill || undefined });
    }
  }
  if (froze) {
    logbook.append(root, business, { actor: 'ai', session: sessionId, event: 'frozen', id: id, snapshot: paths.toPosix(snapRel) });
  }
  seen[relKey] = status;
  atomic.atomicWrite(seenP, JSON.stringify(seen));

  // ── Step 5: bookmark. ──
  const next = status === 'draft' ? 'hand to review'
    : status === 'review' ? 'waiting for the owner' : '';
  logbook.writeBookmark(root, business, {
    doing: String(type) + ': ' + (headline && headline !== '' ? headline : path.basename(absPath)),
    item: id,
    next: next,
    by: skill && skill !== '' ? skill : 'unknown',
  });

  // ── Step 6: heartbeat. ──
  const hbPath = path.join(root, '.growos', 'heartbeat.json');
  let prevCount = 0;
  try { prevCount = JSON.parse(fs.readFileSync(hbPath, 'utf8')).count || 0; } catch (_) { prevCount = 0; }
  atomic.atomicWrite(hbPath, JSON.stringify({ last: new Date().toISOString(), count: prevCount + 1, version: readVersion(root) }));

  // ── Step 7: isolation warn (never denies). ──
  const markerP = markerPathFor(root, sessionId);
  const now = new Date().toISOString();
  let marker = null;
  try { marker = JSON.parse(fs.readFileSync(markerP, 'utf8')); } catch (_) { marker = null; }
  if (marker && typeof marker === 'object') {
    if (marker.business && marker.business !== business) {
      marker.lastSeen = now;
      atomic.atomicWrite(markerP, JSON.stringify(marker));
      return {
        exitCode: 2,
        message: 'WARNING (not blocked): you are working in ' + business + ' but started this ' +
          'session in ' + marker.business + ' — check you\'re in the right business folder.',
      };
    }
    marker.business = marker.business || business;
    marker.lastSeen = now;
    atomic.atomicWrite(markerP, JSON.stringify(marker));
  } else {
    atomic.atomicWrite(markerP, JSON.stringify({ business: business, started: now, lastSeen: now }));
  }

  return { exitCode: 0 };
}

/* ════════════════════════════ DISPATCH ═════════════════════════════════════ */

function dispatch(parsed, root) {
  const event = String(parsed.event || '');
  if (event === 'PreToolUse') {
    if (parsed.toolName === 'Bash') {
      emitDecision(parsed.dialect, evaluateBashGuard(parsed, root)); // exits
    } else if (parsed.toolName === 'apply_patch') {
      emitDecision(parsed.dialect, evaluateApplyPatch(parsed, root)); // Codex file edits — exits
    } else if (parsed.toolName === 'Write' || parsed.toolName === 'Edit' || parsed.toolName === 'MultiEdit') {
      emitDecision(parsed.dialect, evaluatePreWrite(parsed, root)); // exits
    } else if (parsed.toolName === 'Read') {
      emitDecision(parsed.dialect, evaluateReadGuard(parsed, root)); // .env secrets guard — exits
    } else {
      process.exit(0);
    }
  } else if (event === 'PostToolUse') {
    const r = handlePost(parsed, root) || { exitCode: 0 };
    if (r.message) err(r.message.endsWith('\n') ? r.message : r.message + '\n');
    process.exit(r.exitCode || 0);
  } else {
    process.exit(0); // unknown / unhandled event
  }
}

function main() {
  let raw = '';
  try { raw = fs.readFileSync(0, 'utf8'); } catch (_) { raw = ''; }
  const parsed = parseHookInput(raw);
  const root = resolveRoot(parsed);
  try {
    if (parsed.parseError) {
      logError(root, 'item-hook', new Error('unparseable hook stdin (not JSON)'));
      process.exit(0);
    }
    dispatch(parsed, root);
  } catch (e) {
    logError(root, 'item-hook', e);
    process.exit(0);
  }
}

module.exports = {
  parseHookInput, emitDecision, resolveRoot,
  evaluatePreWrite, evaluateApplyPatch, evaluateBashGuard, evaluateReadGuard, handlePost,
  parseApplyPatch, checkWorkItemWrite,
  validatePublishReceipt, RECEIPT_KEYS,
  isLegalTransition, LEGAL_STATUS, LEGAL_EDGES,
  readIsolationMode, isCarveOutEdit, crossBusinessGuard, laneBusiness,
  claimLaneAtomic, resolvedBusinessMismatch, smuggledWorkItem,
};

if (require.main === module) main();
