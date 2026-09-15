'use strict';

/**
 * codex-trust.js — grant (and check) per-hook trust for the GrowOS guard in the
 * USER-LEVEL Codex config (system/tools/lib/, JOB 2 of the guard-hardening pass).
 *
 * WHY THIS EXISTS
 *   Codex gates project hooks behind TWO layers: project trust (auto-granted by
 *   `codex exec -C <dir>`) AND per-hook PERSISTED trust in the user config
 *   (~/.codex/config.toml). A non-interactive `codex exec` SILENTLY SKIPS an
 *   untrusted hook — no warning — so without this the GrowOS guard never fires
 *   under Codex. Opening Codex once in the folder and approving the guard also
 *   persists this trust; this module does it up front so a fresh install is
 *   guarded from the first `codex exec`.
 *
 * THE SCHEME (reverse-engineered AND verified against Codex CLI 0.144.3 on
 * 2026-07-20; cross-checked against codex-rs/hooks/src/engine/discovery.rs
 * `command_hook_hash` + codex-rs/config/src/fingerprint.rs `version_for_toml`):
 *
 *   [hooks.state."<key>"]  where
 *     key  = "<hooks.json ABSOLUTE path>:<event_label>:<matcher_idx>:<hook_idx>"
 *            event_label is the SNAKE_CASE label: pre_tool_use, post_tool_use,
 *            session_start, … (NOT the PascalCase JSON key).
 *     trusted_hash = "sha256:" + hex( sha256( compact_canonical_json(identity) ) )
 *       identity = {
 *         event_name: "<event_label>",
 *         matcher?:   "<matcher string>",   // omitted iff the group has none;
 *                                           // an empty "" IS kept as ""
 *         hooks: [ { type:"command",
 *                    command:"<raw command, BEFORE ${VAR} expansion>",
 *                    timeout:<int, default 600; SessionEnd clamps to 1..3>,
 *                    async:<bool, default false> } ]
 *       }
 *       canonical_json = recursively sort every object key, serialize compact
 *       (no whitespace), UTF-8 bytes. command_windows / statusMessage that are
 *       absent are dropped (Codex round-trips the identity through TOML, which
 *       has no null). This matched the live superpowers entry hash exactly and,
 *       once written, makes the GrowOS guard fire under plain `codex exec`.
 *
 * PRODUCT code: Node >= 18, stdlib only, no npm, no shelling out. All writes go
 * through lib/atomic.js. The Codex config is a USER file: this module only ever
 * TOUCHES it when it already exists (a Claude-only owner has no Codex to trust),
 * always backs it up first, and only rewrites the [hooks.state] sub-tables that
 * belong to THIS install — every other line (other installs, plugin hooks, the
 * owner's own settings) is preserved byte-for-byte.
 */

const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const crypto = require('node:crypto');
const atomic = require('./atomic.js');

/* ─────────────────────────── event labels ─────────────────────────── */

// Codex's persisted hook-state key uses these snake_case labels
// (codex-rs/hooks/src/lib.rs hook_event_key_label).
const EVENT_LABEL = {
  PreToolUse: 'pre_tool_use',
  PermissionRequest: 'permission_request',
  PostToolUse: 'post_tool_use',
  PreCompact: 'pre_compact',
  PostCompact: 'post_compact',
  SessionStart: 'session_start',
  SessionEnd: 'session_end',
  UserPromptSubmit: 'user_prompt_submit',
  SubagentStart: 'subagent_start',
  SubagentStop: 'subagent_stop',
  Stop: 'stop',
};
// Events whose matcher Codex ignores at dispatch, so it is NOT part of the hash
// identity (codex-rs/hooks/src/events/common.rs matcher_pattern_for_event).
const NO_MATCHER = new Set(['UserPromptSubmit', 'Stop']);

const DEFAULT_TIMEOUT = 600;
const SESSION_END_DEFAULT_TIMEOUT = 1;
const SESSION_END_MAX_TIMEOUT = 3;

/* ─────────────────────────── config location ─────────────────────────── */

/** The Codex home dir: $CODEX_HOME if set, else ~/.codex. */
function codexHome() {
  const h = process.env.CODEX_HOME;
  return h && String(h).trim() !== '' ? String(h) : path.join(os.homedir(), '.codex');
}
/** The user-level Codex config path. */
function codexConfigPath() {
  return path.join(codexHome(), 'config.toml');
}
/** The absolute hooks.json path an install ships (the key_source Codex records). */
function hooksJsonPath(root) {
  return path.join(String(root), '.codex', 'hooks.json');
}

/* ─────────────────────────── the hash ─────────────────────────── */

/** Recursively sort object keys (Codex canonicalizes JSON before hashing). */
function canonical(v) {
  if (Array.isArray(v)) return v.map(canonical);
  if (v && typeof v === 'object') {
    const out = {};
    for (const k of Object.keys(v).sort()) out[k] = canonical(v[k]);
    return out;
  }
  return v;
}
/** version_for_toml: sha256 of the compact, key-sorted JSON of the identity. */
function versionForToml(identity) {
  const bytes = Buffer.from(JSON.stringify(canonical(identity)), 'utf8');
  return 'sha256:' + crypto.createHash('sha256').update(bytes).digest('hex');
}
/** Codex normalizes command-hook timeouts before hashing. */
function normalizeTimeout(eventName, timeoutSec) {
  const t = typeof timeoutSec === 'number' ? timeoutSec : null;
  if (eventName !== 'SessionEnd') return Math.max(1, t === null ? DEFAULT_TIMEOUT : t);
  const base = t === null ? SESSION_END_DEFAULT_TIMEOUT : t;
  return Math.min(SESSION_END_MAX_TIMEOUT, Math.max(1, base));
}

/**
 * computeTrustEntries(hooksPath, hooksObj) -> [{ key, hash }]
 * One entry per command hook in the hooks.json object, in the exact key + hash
 * form Codex persists. Non-command hooks and (non-SessionEnd) async hooks are
 * skipped — Codex does not run them, so it records no trust for them.
 */
function computeTrustEntries(hooksPath, hooksObj) {
  const out = [];
  const hooks = hooksObj && hooksObj.hooks && typeof hooksObj.hooks === 'object' ? hooksObj.hooks : {};
  for (const eventName of Object.keys(hooks)) {
    const label = EVENT_LABEL[eventName];
    if (!label) continue;
    const groups = Array.isArray(hooks[eventName]) ? hooks[eventName] : [];
    groups.forEach((group, gi) => {
      const handlers = group && Array.isArray(group.hooks) ? group.hooks : [];
      handlers.forEach((h, hi) => {
        if (!h || h.type !== 'command' || typeof h.command !== 'string' || h.command.trim() === '') return;
        if (h.async && eventName !== 'SessionEnd') return; // Codex skips async non-SessionEnd hooks
        const handler = {
          type: 'command',
          command: h.command, // RAW command — Codex hashes before ${VAR} expansion
          timeout: normalizeTimeout(eventName, h.timeout),
          async: !!h.async,
        };
        // statusMessage is kept in the identity when present (it is dropped when
        // absent because TOML has no null). GrowOS hooks never set it.
        const sm = h.statusMessage !== undefined ? h.statusMessage : h.status_message;
        if (typeof sm === 'string') handler.statusMessage = sm;
        const identity = { event_name: label };
        if (!NO_MATCHER.has(eventName) && group.matcher !== undefined && group.matcher !== null) {
          identity.matcher = group.matcher;
        }
        identity.hooks = [handler];
        out.push({ key: hooksPath + ':' + label + ':' + gi + ':' + hi, hash: versionForToml(identity) });
      });
    });
  }
  return out;
}

/** Read + parse an install's .codex/hooks.json -> { hooksPath, entries } | null. */
function entriesForInstall(root) {
  const hooksPath = hooksJsonPath(root);
  let obj;
  try {
    let t = fs.readFileSync(hooksPath, 'utf8');
    if (t.charCodeAt(0) === 0xfeff) t = t.slice(1);
    obj = JSON.parse(t);
  } catch (_) {
    return null;
  }
  return { hooksPath, entries: computeTrustEntries(hooksPath, obj) };
}

/* ─────────────────────── minimal TOML [hooks.state] editing ─────────────────────── */

/**
 * Encode a hook key as a TOML quoted key.
 *
 * This MUST escape. A TOML basic string treats backslash as an escape
 * character, and every Windows key is full of them — a drive-letter path under
 * a Users folder, written raw into a quoted key, produces escape sequences the
 * TOML parser rejects (a backslash followed by "U" is not one of the handful it
 * allows). That does not just lose the GrowOS entry: it makes the WHOLE config
 * unparseable and breaks the owner's Codex. On macOS there are no backslashes
 * in these paths, so it worked by accident.
 *
 * JSON string escaping is a subset of TOML basic-string escaping for the
 * characters that can appear in a path, and hooksStateKeyOf already decodes with
 * JSON.parse, so the two are exact inverses.
 */
function tomlQuotedKey(key) {
  return JSON.stringify(String(key));
}

/** A table-header line: `[…]` / `[[…]]` (our config never puts `[` on a value line). */
function isHeaderLine(line) {
  return /^\s*\[/.test(line) && /\]\s*(#.*)?$/.test(line);
}
/** Decode a `[hooks.state."<key>"]` header to its key, or null. */
function hooksStateKeyOf(headerLine) {
  const m = headerLine.trim().match(/^\[hooks\.state\.("(?:[^"\\]|\\.)*")\]$/);
  if (!m) return null;
  try { return JSON.parse(m[1]); } catch (_) { return null; }
}
/** Read every persisted [hooks.state."K"] trusted_hash -> Map<key, hash>. */
function parsePersistedHashes(text) {
  const map = new Map();
  if (typeof text !== 'string') return map;
  const lines = text.split('\n');
  let curKey = null;
  for (const line of lines) {
    if (isHeaderLine(line)) { curKey = hooksStateKeyOf(line); continue; }
    if (curKey === null) continue;
    const m = line.match(/^\s*trusted_hash\s*=\s*"([^"]*)"\s*(#.*)?$/);
    if (m) { map.set(curKey, m[1]); curKey = curKey; }
  }
  return map;
}

/**
 * mergeHookState(text, entries, hooksPath) -> { text, added, updated, removed }
 * Idempotently makes the config's [hooks.state] carry exactly `entries` for THIS
 * hooksPath: updates a changed trusted_hash in place, drops a stale entry for
 * this install, and appends any missing one. Blocks for OTHER installs/plugins
 * are untouched. When the config already matches, the text is returned
 * byte-identical (so setup/mirror never churn a backup on a no-op).
 */
function mergeHookState(text, entries, hooksPath) {
  const desired = new Map(entries.map((e) => [e.key, e.hash]));
  const myPrefix = hooksPath + ':';
  const lines = text.split('\n');

  // Split into the preamble + header-delimited blocks (each block owns the lines
  // from its header up to the next header, trailing blank lines included).
  const preamble = [];
  const blocks = []; // { header, key, lines: [...] }
  let cur = null;
  for (const line of lines) {
    if (isHeaderLine(line)) {
      cur = { header: line, key: hooksStateKeyOf(line), lines: [line] };
      blocks.push(cur);
    } else if (cur) {
      cur.lines.push(line);
    } else {
      preamble.push(line);
    }
  }

  let added = 0;
  let updated = 0;
  let removed = 0;
  const present = new Set();
  const kept = [];
  let lastHooksStateIdx = -1; // index into `kept` of the last hooks.state* block

  for (const b of blocks) {
    const isHooksStateParent = b.header.trim() === '[hooks.state]';
    if (b.key !== null && desired.has(b.key)) {
      // One of mine: keep the block, ensuring its trusted_hash matches.
      present.add(b.key);
      const want = desired.get(b.key);
      let changed = false;
      let sawHash = false;
      const newLines = b.lines.map((l) => {
        const m = l.match(/^(\s*trusted_hash\s*=\s*")([^"]*)("\s*(?:#.*)?)$/);
        if (!m) return l;
        sawHash = true;
        if (m[2] !== want) { changed = true; return m[1] + want + m[3]; }
        return l;
      });
      if (!sawHash) {
        // The block is there but carries NO hash, so the reader sees no trust at
        // all. Treating "the header exists" as "already current" reports green
        // while Codex silently skips the guard. Repair it instead.
        newLines.splice(1, 0, 'trusted_hash = "' + want + '"');
        changed = true;
      }
      if (changed) updated += 1;
      kept.push({ header: b.header, key: b.key, lines: newLines });
      lastHooksStateIdx = kept.length - 1;
      continue;
    }
    if (b.key !== null && b.key.indexOf(myPrefix) === 0) {
      // A stale entry for THIS install (no longer produced) — drop it.
      removed += 1;
      continue;
    }
    kept.push(b);
    if (isHooksStateParent || (b.key !== null && b.key.indexOf('hooks.state') !== -1) || b.header.trim().indexOf('[hooks.state') === 0) {
      lastHooksStateIdx = kept.length - 1;
    }
  }

  // Append any desired entry that was not already present.
  const missing = entries.filter((e) => !present.has(e.key));
  if (missing.length) {
    const newBlocks = missing.map((e) => {
      added += 1;
      const header = '[hooks.state.' + tomlQuotedKey(e.key) + ']';
      return { header: header, key: e.key, lines: ['', header, 'trusted_hash = "' + e.hash + '"'] };
    });
    if (lastHooksStateIdx >= 0) {
      kept.splice(lastHooksStateIdx + 1, 0, ...newBlocks);
    } else {
      // No [hooks.state] table yet — open one, then add the entries.
      kept.push({ header: '[hooks.state]', key: null, lines: ['', '[hooks.state]'] });
      for (const nb of newBlocks) kept.push(nb);
    }
  }

  const outLines = preamble.slice();
  for (const b of kept) for (const l of b.lines) outLines.push(l);
  return { text: outLines.join('\n'), added, updated, removed };
}

/* ─────────────────────────── persist + status ─────────────────────────── */

/**
 * persistCodexHookTrust(root, opts?) -> result
 * Writes the correct [hooks.state] entries for this install's .codex/hooks.json
 * into the user-level Codex config, idempotently. It NEVER creates a Codex config
 * that does not exist (a Claude-only owner has no Codex to trust). Before any
 * change it copies the config to <root>/.backups/codex-config/config.toml.<ts>.
 *
 * result.status ∈ 'persisted' | 'unchanged' | 'skipped' | 'no-hooks' | 'error'.
 * opts: { configPath, backupsDir } (tests point these at a sandbox).
 */
function persistCodexHookTrust(root, opts) {
  opts = opts || {};
  const cfgPath = opts.configPath || codexConfigPath();
  const info = entriesForInstall(root);
  if (!info) return { status: 'no-hooks', reason: '.codex/hooks.json is missing or unreadable', configPath: cfgPath };
  if (info.entries.length === 0) return { status: 'no-hooks', reason: 'no command hooks in .codex/hooks.json', configPath: cfgPath };

  let cfgText;
  try {
    cfgText = fs.readFileSync(cfgPath, 'utf8');
    if (cfgText.charCodeAt(0) === 0xfeff) cfgText = cfgText.slice(1);
  } catch (_) {
    // No Codex config -> nothing to trust yet. The owner opening Codex here once
    // (or a later re-run after they set Codex up) will persist it.
    return { status: 'skipped', reason: 'no Codex config at ' + cfgPath, configPath: cfgPath, total: info.entries.length };
  }

  let merged;
  try {
    merged = mergeHookState(cfgText, info.entries, info.hooksPath);
  } catch (e) {
    return { status: 'error', reason: 'could not update the Codex config: ' + (e && e.message ? e.message : String(e)), configPath: cfgPath };
  }

  if (merged.text === cfgText) {
    return { status: 'unchanged', configPath: cfgPath, total: info.entries.length };
  }

  const backupsDir = opts.backupsDir || path.join(String(root), '.backups', 'codex-config');
  const ts = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = path.join(backupsDir, 'config.toml.' + ts);
  try {
    atomic.atomicWrite(backupPath, cfgText);
    atomic.atomicWrite(cfgPath, merged.text);
  } catch (e) {
    return { status: 'error', reason: 'could not write the Codex config: ' + (e && e.message ? e.message : String(e)), configPath: cfgPath };
  }
  return {
    status: 'persisted',
    configPath: cfgPath,
    backupPath,
    added: merged.added,
    updated: merged.updated,
    removed: merged.removed,
    total: info.entries.length,
  };
}

/**
 * wiringState(root) -> 'ok' | 'missing' | 'unreadable' | 'no-commands'
 * Why the install's own .codex/hooks.json cannot be used, if it cannot. The
 * distinction matters: "you do not use Codex" and "your Codex wiring is broken"
 * look identical from a null, and only one of them is fine.
 */
function wiringState(root) {
  let obj;
  try {
    let t = fs.readFileSync(hooksJsonPath(root), 'utf8');
    if (t.charCodeAt(0) === 0xfeff) t = t.slice(1);
    obj = JSON.parse(t);
  } catch (err) {
    return err && err.code === 'ENOENT' ? 'missing' : 'unreadable';
  }
  return computeTrustEntries(hooksJsonPath(root), obj).length === 0 ? 'no-commands' : 'ok';
}

/**
 * trustStatus(root, opts?) -> { applicable, ok, total, missing, mismatched,
 *                               configPath, configState, wiring, noHooks }
 * Read-only.
 *   configState  'absent'  no Codex on this machine — a Claude-only owner
 *                'present' | 'unreadable'
 *   wiring       wiringState(root), above
 *   applicable   false ONLY when the config is genuinely absent. An unreadable
 *                config is NOT "no Codex" — treating a read failure as "nothing
 *                to do here" is how a dead guard reports itself as fine.
 *   ok           every current hook has a matching persisted trusted_hash
 */
function trustStatus(root, opts) {
  opts = opts || {};
  const cfgPath = opts.configPath || codexConfigPath();

  let cfgText = null;
  let configState = 'present';
  try {
    cfgText = fs.readFileSync(cfgPath, 'utf8');
    if (cfgText.charCodeAt(0) === 0xfeff) cfgText = cfgText.slice(1);
  } catch (err) {
    configState = err && err.code === 'ENOENT' ? 'absent' : 'unreadable';
  }

  const wiring = wiringState(root);
  const info = entriesForInstall(root);
  if (!info || info.entries.length === 0) {
    return {
      applicable: configState !== 'absent', ok: true, total: 0, missing: [], mismatched: [],
      configPath: cfgPath, configState: configState, wiring: wiring, noHooks: true,
    };
  }
  if (configState !== 'present') {
    return {
      applicable: configState !== 'absent', ok: configState === 'absent',
      total: info.entries.length, missing: [], mismatched: [],
      configPath: cfgPath, configState: configState, wiring: wiring,
    };
  }
  const persisted = parsePersistedHashes(cfgText);
  const missing = [];
  const mismatched = [];
  for (const e of info.entries) {
    if (!persisted.has(e.key)) missing.push(e.key);
    else if (persisted.get(e.key) !== e.hash) mismatched.push(e.key);
  }
  return {
    applicable: true,
    ok: missing.length === 0 && mismatched.length === 0,
    total: info.entries.length,
    missing,
    mismatched,
    configPath: cfgPath,
    configState: configState,
    wiring: wiring,
  };
}

/**
 * persistFinding(result) -> { level, title, detail, fix }
 * Turn a persistCodexHookTrust result into a reporter finding for setup/mirror.
 * Never red — a Codex-config hiccup must not fail a Claude-first install.
 */
function persistFinding(result) {
  const r = result || {};
  if (r.status === 'persisted') {
    return { level: 'green', title: 'Granted the Codex guard trust',
      detail: 'Wrote ' + (r.total || 0) + ' trusted-hook entr' + ((r.total === 1) ? 'y' : 'ies') +
        ' to the Codex config so the guard runs under Codex too (backup: ' + (r.backupPath || 'n/a') + ').', fix: '' };
  }
  if (r.status === 'unchanged') {
    return { level: 'green', title: 'Codex guard trust is already current', detail: '', fix: '' };
  }
  if (r.status === 'skipped') {
    return { level: 'green', title: 'Codex is not set up here yet',
      detail: 'No Codex config found, so there is nothing to trust. Opening Codex in this folder once will grant it.', fix: '' };
  }
  if (r.status === 'no-hooks') {
    return { level: 'green', title: 'No Codex hooks to trust', detail: r.reason || '', fix: '' };
  }
  return { level: 'yellow', title: 'Could not grant the Codex guard trust', detail: r.reason || 'unknown error',
    fix: 'Open Codex once in this folder and approve the GrowOS guard when asked.' };
}

/**
 * hasProvenConsent(root, opts) -> boolean
 *
 * True only when the Codex config trusts EVERY hook of the wiring currently on
 * disk, with matching hashes. That is the one thing that actually demonstrates
 * the owner approved this exact wiring.
 *
 * IT MUST BE CALLED BEFORE THE WIRING IS REWRITTEN. Once mirror or setup has
 * regenerated .codex/hooks.json there is nothing left to compare the old
 * approval against, and the question becomes unanswerable.
 *
 * The earlier version asked whether ANY persisted key began with this install's
 * hooks path. That is consent inferred from a path prefix, which P0.5 forbids,
 * and it was not theoretical: approving a single hook inside Codex — exactly
 * what a real owner does when the dialog appears — made the next mirror grant
 * all four. One yes became four.
 *
 * What this still allows, and should: the owner approved the whole wiring, a
 * product update changes the hook identities, and the now-stale trust would make
 * Codex silently skip the guard. That refresh is the reason any of this exists.
 */
function hasProvenConsent(root, opts) {
  try {
    const st = trustStatus(root, opts || {});
    return st.applicable !== false && !st.noHooks && st.ok === true;
  } catch (_) {
    return false;
  }
}

/* ─────────────────────── relink after a folder move ─────────────────────── */

/**
 * WHY RELINKING IS ITS OWN COMMAND, AND WHY TRUST CANNOT RIDE ALONG FREE
 *
 * Codex keys a hook's trust to the ABSOLUTE path of .codex/hooks.json, and a
 * non-interactive `codex exec` SILENTLY SKIPS a hook it does not trust. Move the
 * folder and three things happen at once: the generated command points at a file
 * that is not there, every persisted key is for the old path, and Codex says
 * nothing about any of it. The owner's next session runs with no guard and looks
 * completely normal.
 *
 * The WIRING can heal itself — it is derived from wherever the folder is now.
 * TRUST cannot. Carrying an approval from the old location to the new one on its
 * own say-so would be GrowOS quietly widening its own permissions, which is the
 * one thing the whole design refuses to do.
 *
 * So relinking is an explicit thing the owner runs, and even then the old
 * approval only counts when it can be PROVED to be this product's own wiring at
 * a previous location. The proof is arithmetic, not resemblance: take the
 * candidate old root, generate the hooks.json this product would have written
 * there, hash it the way Codex hashes it, and require the persisted entries to
 * match — same key set, same hashes, exactly. A familiar-looking path proves
 * nothing; only the hashes do.
 *
 * Anything that does not validate is left completely alone. It might be another
 * install, another product, or an entry the owner made deliberately. Not ours to
 * carry, and not ours to delete.
 *
 * WHAT THIS IS NOT. It is not a lock against a hostile writer. Anyone who can
 * write to the Codex config can simply grant trust for the current folder and
 * skip all of this. What the check establishes is PROVENANCE — that the approval
 * being carried really was the owner approving this same wiring, somewhere else,
 * rather than an unrelated entry sitting under a similar-looking path. That is
 * the mistake worth preventing here, and it is the only claim this makes.
 */

/**
 * oldRootFromWiring(root) -> { root, reason } — where this folder used to live,
 * according to the folder itself.
 *
 * The moved folder still carries its own `.codex/hooks.json`, and every command
 * in it names the OLD absolute path. That is the one honest answer to "which
 * approval was mine", and it has to be read BEFORE the wiring is regenerated.
 *
 * The alternative — scanning the Codex config for an old-looking root that
 * validates — is what this replaces, and it was dangerous. With installs A and B
 * both approved and B moving to C, A validates exactly as well as B does, so
 * order alone decided the winner: C could take A's approval and retire A's
 * entries, leaving a completely unrelated install unguarded.
 *
 * `.root` is null when the answer is not unambiguous; `.reason` says why.
 */
function oldRootFromWiring(root) {
  const hooksPath = hooksJsonPath(root);
  let obj;
  try {
    let t = fs.readFileSync(hooksPath, 'utf8');
    if (t.charCodeAt(0) === 0xfeff) t = t.slice(1);
    obj = JSON.parse(t);
  } catch (_) {
    return { root: null, reason: 'this folder has no readable .codex/hooks.json to say where it came from' };
  }

  const marker = '/system/guards/';
  const roots = new Set();
  const walk = (v) => {
    if (Array.isArray(v)) { v.forEach(walk); return; }
    if (!v || typeof v !== 'object') return;
    for (const k of Object.keys(v)) {
      if (k === 'command' && typeof v[k] === 'string') {
        // `node "<root>/system/guards/<script>"` — take everything before the marker.
        const cmd = v[k].split('\\').join('/');
        const at = cmd.lastIndexOf(marker);
        if (at === -1) continue;
        let head = cmd.slice(0, at);
        const q = head.lastIndexOf('"');
        if (q !== -1) head = head.slice(q + 1);
        else {
          const sp = head.lastIndexOf(' ');
          if (sp !== -1) head = head.slice(sp + 1);
        }
        if (head !== '') roots.add(head);
      } else {
        walk(v[k]);
      }
    }
  };
  walk(obj);

  const list = [...roots];
  if (list.length === 0) return { root: null, reason: 'the old wiring names no guard script' };
  if (list.length > 1) {
    return { root: null, reason: 'the old wiring points at more than one folder (' + list.join(', ') + ')' };
  }
  // Compare the way the filesystem does, so a case-varied or symlinked spelling
  // of the same folder does not read as a move.
  const same = (a, b) => {
    try { return fs.realpathSync(a) === fs.realpathSync(b); } catch (_) { return a === b; }
  };
  if (list[0] === String(root) || same(list[0], root)) {
    return { root: null, reason: 'this folder has not moved' };
  }
  return { root: list[0], reason: '' };
}

// NOTE: there was a candidateOldRoots() here that scanned the Codex config for
// every old-looking install root. It is deliberately GONE rather than left
// unused: it is the approach that let a relink take an unrelated install's
// approval and retire its entries, and an exported helper sitting there is an
// invitation to reintroduce exactly that. oldRootFromWiring is the answer — the
// folder's own old wiring, which can only ever describe the folder itself.

/**
 * validateOldTrust(cfgText, oldRoot) -> { ok, keys, reason }
 * Does the config's trust for `oldRoot` match, hash for hash, what THIS product's
 * wiring at that path would have earned? `keys` are the persisted keys proven to
 * be ours (and therefore safe to retire once the move is done).
 *
 * Exact means exact: every expected entry present with the right hash, and no
 * extra entry under that prefix. An extra key means the wiring there was not the
 * one we generate, so nothing under it is evidence of anything.
 */
function validateOldTrust(cfgText, oldRoot) {
  let expected;
  try {
    // Required lazily: codexgen owns the shape of the wiring, and requiring it at
    // module load would tie every trust read to the generator.
    const codexgen = require('./codexgen.js');
    expected = computeTrustEntries(hooksJsonPath(oldRoot), codexgen.hooksObject(oldRoot));
  } catch (e) {
    return { ok: false, keys: [], reason: 'could not rebuild the old wiring: ' + (e && e.message ? e.message : String(e)) };
  }
  if (expected.length === 0) return { ok: false, keys: [], reason: 'no hooks to compare' };

  const persisted = parsePersistedHashes(cfgText);
  const prefix = hooksJsonPath(oldRoot) + ':';
  const under = [];
  for (const key of persisted.keys()) if (key.indexOf(prefix) === 0) under.push(key);
  if (under.length === 0) return { ok: false, keys: [], reason: 'no entries for that folder' };

  for (const e of expected) {
    if (!persisted.has(e.key)) {
      return { ok: false, keys: [], reason: 'the old approval is incomplete (missing ' + e.key + ')' };
    }
    if (persisted.get(e.key) !== e.hash) {
      return { ok: false, keys: [], reason: 'the old approval does not match this product\'s wiring' };
    }
  }
  if (under.length !== expected.length) {
    return { ok: false, keys: [], reason: 'that folder carries hook trust GrowOS did not write' };
  }
  return { ok: true, keys: under, reason: '' };
}

/** Remove the given [hooks.state."key"] blocks from a Codex config. */
function dropHookState(text, keys) {
  const drop = new Set(keys);
  if (drop.size === 0) return text;
  const kept = [];
  let dropping = false;
  for (const line of String(text).split('\n')) {
    if (isHeaderLine(line)) {
      const k = hooksStateKeyOf(line);
      dropping = k !== null && drop.has(k);
      // A dropped block takes the blank line that separated it with it, so the
      // config does not slowly fill up with gaps.
      if (dropping && kept.length && kept[kept.length - 1].trim() === '') kept.pop();
    }
    if (!dropping) kept.push(line);
  }
  return kept.join('\n');
}

/**
 * relinkCodexTrust(root, opts?) -> result
 *
 * status:
 *   'relinked'      old approval proved, trust written here, stale keys retired
 *   'already'       already trusted for this folder; nothing to do
 *   'unproven'      old-looking entries exist but do not verify — nothing written
 *   'nothing'       no prior approval to carry; the owner has to say yes
 *   'no-config'     this machine has no Codex; nothing to relink
 *   'no-hooks' | 'error'
 */
function relinkCodexTrust(root, opts) {
  opts = opts || {};
  const cfgPath = opts.configPath || codexConfigPath();
  const info = entriesForInstall(root);
  if (!info || info.entries.length === 0) {
    return { status: 'no-hooks', configPath: cfgPath, reason: '.codex/hooks.json is missing, unreadable, or has no command hooks' };
  }

  let cfgText;
  try {
    cfgText = fs.readFileSync(cfgPath, 'utf8');
    if (cfgText.charCodeAt(0) === 0xfeff) cfgText = cfgText.slice(1);
  } catch (_) {
    return { status: 'no-config', configPath: cfgPath };
  }

  if (trustStatus(root, { configPath: cfgPath }).ok) {
    return { status: 'already', configPath: cfgPath, total: info.entries.length };
  }

  // Which folder was this one, before? The folder's OWN old wiring answers that
  // — never a scan of the config for something that looks close enough. See
  // oldRootFromWiring: with two installs approved, a scan can take the wrong
  // one's approval and retire its entries, leaving a stranger unguarded.
  const from = opts.fromRoot !== undefined
    ? { root: opts.fromRoot, reason: opts.fromReason || '' }
    : oldRootFromWiring(root);
  const rejected = [];
  let proven = null;

  if (from.root) {
    const v = validateOldTrust(cfgText, from.root);
    if (v.ok) proven = { root: from.root, keys: v.keys };
    else rejected.push({ root: from.root, reason: v.reason });
  }

  if (!proven) {
    return {
      status: rejected.length ? 'unproven' : 'nothing',
      configPath: cfgPath,
      rejected,
      noOldRoot: from.root ? '' : from.reason,
      total: info.entries.length,
    };
  }

  // Proved. Write trust for HERE, then retire the old keys — and only the ones
  // that validated. Everything else in the file is somebody else's.
  let merged;
  try {
    merged = mergeHookState(cfgText, info.entries, info.hooksPath);
  } catch (e) {
    return { status: 'error', configPath: cfgPath, reason: 'could not update the Codex config: ' + (e && e.message ? e.message : String(e)) };
  }
  const finalText = dropHookState(merged.text, proven.keys);
  if (finalText === cfgText) {
    return { status: 'already', configPath: cfgPath, total: info.entries.length };
  }

  const backupsDir = opts.backupsDir || path.join(String(root), '.backups', 'codex-config');
  const ts = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = path.join(backupsDir, 'config.toml.' + ts);
  try {
    atomic.atomicWrite(backupPath, cfgText);
    atomic.atomicWrite(cfgPath, finalText);
  } catch (e) {
    return { status: 'error', configPath: cfgPath, reason: 'could not write the Codex config: ' + (e && e.message ? e.message : String(e)) };
  }
  return {
    status: 'relinked',
    configPath: cfgPath,
    backupPath,
    fromRoot: proven.root,
    retired: proven.keys.length,
    total: info.entries.length,
    rejected,
  };
}

/** relinkCodexTrust result -> a reporter finding. */
function relinkFinding(result) {
  const r = result || {};
  if (r.status === 'relinked') {
    return { level: 'green', title: 'Carried your Codex approval to this folder',
      detail: 'Proved the approval at ' + r.fromRoot + ' was this GrowOS wiring, granted the ' +
        r.total + ' guard hook(s) here, and retired ' + r.retired + ' entr' +
        (r.retired === 1 ? 'y' : 'ies') + ' for the old folder (backup: ' + r.backupPath + ').',
      fix: '' };
  }
  if (r.status === 'already') {
    return { level: 'green', title: 'The Codex guard is already trusted here', detail: '', fix: '' };
  }
  if (r.status === 'no-config') {
    return { level: 'green', title: 'Codex is not set up on this machine',
      detail: 'There is no Codex config, so there is no Codex guard to relink.', fix: '' };
  }
  if (r.status === 'unproven') {
    const list = (r.rejected || []).map((x) => x.root + ' (' + x.reason + ')').join('; ');
    return { level: 'yellow', title: 'Could not verify your old Codex approval',
      detail: 'The wiring now points at this folder, but the guard is still off inside Codex. ' +
        'Nothing was carried across, and nothing was deleted: ' + list,
      fix: 'Approve the GrowOS guard in Codex once from this folder, or rerun setup with --codex-trust after you have said yes.' };
  }
  if (r.status === 'nothing') {
    return { level: 'yellow', title: 'There is no Codex approval to carry across',
      detail: 'The wiring now points at this folder, but Codex has never been told to trust the GrowOS guard, so it stays off inside Codex.' +
        (r.noOldRoot ? ' (' + r.noOldRoot + ')' : ''),
      fix: 'Approve the GrowOS guard in Codex once from this folder, or rerun setup with --codex-trust after you have said yes.' };
  }
  if (r.status === 'no-hooks') {
    return { level: 'yellow', title: 'There is no Codex wiring to relink', detail: r.reason || '',
      fix: 'Run: node system/tools/growos.js mirror' };
  }
  return { level: 'yellow', title: 'Could not relink the Codex guard', detail: r.reason || 'unknown error',
    fix: 'Approve the GrowOS guard in Codex once from this folder.' };
}

module.exports = {
  codexHome,
  codexConfigPath,
  hooksJsonPath,
  validateOldTrust,
  dropHookState,
  relinkCodexTrust,
  relinkFinding,
  versionForToml,
  computeTrustEntries,
  entriesForInstall,
  parsePersistedHashes,
  mergeHookState,
  persistCodexHookTrust,
  trustStatus,
  persistFinding,
  hasProvenConsent,
  oldRootFromWiring,
};
