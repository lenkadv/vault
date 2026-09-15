'use strict';

/**
 * operations.js — the local operation runner (system/tools/lib/, Build Doc P2).
 *
 * WHY THIS EXISTS
 *
 * An update replaces machinery only. It never writes inside a business folder.
 * That removes shipped migrations entirely, and with them the sanctioned channel
 * by which an unsigned package could rewrite customer files across every business
 * on the install: there is no data-migration step arriving from outside any more,
 * so there is nothing of that kind to forge.
 *
 * It does NOT make an unsigned package safe, and saying so would be a false
 * guarantee. Machine files are executable Node, and the update's own mirror and
 * doctor steps run freshly-installed code in the same process — so a hostile
 * package still owns the install the moment its code runs, and could write
 * anywhere from there. Machinery-only bounds the MECHANISM, not the consequences
 * of running code you did not verify. Package signing remains the open item
 * (`signature: null`, SPEC §6.3 and the limitations in §14).
 *
 * What remains are jobs the OWNER runs, whose operations are computed locally
 * from their own install: filling in new brain files, moving a library, fixing a
 * renamed business, importing a 0.1 install. This module applies such a list.
 *
 * The owner's own writing is on the line, so the contract is strict.
 *
 *   COMPARE-AND-SWAP. Every operation carries the hash it expects to find. If a
 *   file no longer matches, the job STOPS rather than overwriting a change the
 *   owner made since the job was computed.
 *
 *   Said precisely, because the loose version would be a false guarantee: this is
 *   a check followed by a write, not an atomic conditional write — no such
 *   primitive exists in the Node stdlib this product is limited to. An edit that
 *   lands between the last hash and the rename is overwritten.
 *
 *   And that window is NOT an instant, which an earlier wording ("microseconds")
 *   implied and should not have: atomicWrite stages the new bytes to a temp file
 *   and only then renames, so the gap scales with the size of what is being
 *   written and the speed of the disk — milliseconds for a brain file, longer for
 *   something large on slow or networked storage. A move re-reads the source in
 *   there too.
 *
 *   What compare-and-swap actually buys is that a change made at any point BEFORE
 *   that window — which is every realistic case: the owner editing in Obsidian, a
 *   sync client writing a file down, a job computed an hour ago — stops the job.
 *   "Their edit always wins" is the intent; "their edit wins unless it lands
 *   inside the staging window" is the truth, and the truth is what goes here.
 *
 *   VALIDATE THE WHOLE LIST FIRST. Nothing is written until every operation has
 *   been checked and normalised and every expected hash has been confirmed. A job
 *   that would fail on its fourth operation must not have performed its first.
 *
 *   JOURNAL BEFORE MOVING. Every pre-image — the actual old bytes, not just their
 *   hash, because a hash cannot restore anything — is written to a journal first.
 *
 *   STAGE, THEN COMMIT, AND RE-VERIFY AT THE LAST MOMENT. Between preflight and
 *   commit, a symlink or junction could be substituted for a target, or the bytes
 *   could change. Each write re-checks its target immediately before performing it.
 *
 *   Worth being precise about what carries that particular weight: every write
 *   goes through atomicWrite, which renames a temp file over the target, and a
 *   rename REPLACES a symlink rather than following it. So the escape is prevented
 *   structurally, and the explicit symlink refusals here are defence in depth —
 *   for the day someone swaps atomicWrite for a plain open-for-write. Both are
 *   tested, separately, so neither claim rests on the other.
 *
 *   REFUSE, DO NOT GUESS. If a rollback cannot safely restore a file — because
 *   the owner has since changed it — it stops and reports the precise state the
 *   install is in, rather than overwriting newer work to tidy up.
 *
 * PATH VALIDATION IS THE WHOLE SAFETY STORY. Calling a field "canonical" does not
 * make it canonical. Every operation's location is derived from a VALIDATED
 * business (or the install root), and every shape that could escape is rejected by
 * name: `..`, absolute paths, backslashes, `.` components, empty components,
 * Windows drive-relative paths, UNC paths, NTFS alternate data streams, NULs,
 * trailing dots and spaces, reserved device names, case and Unicode aliases of the
 * same file, two operations normalising to the same target, and a symlink at the
 * target or any ancestor. Windows is first-class, so none of that is optional.
 *
 * THE VERBS STAY TINY: create, replace, move. There is no delete, because no real
 * job needs one — and no general verb language, because a verb language in data
 * is a programming language wearing a disguise.
 *
 * Note what `replace` makes possible: a job computes the new bytes itself, from
 * the file's current content, so inserting a missing section into a brain file
 * without disturbing the owner's writing is an ordinary compare-and-swap. The
 * merging is the job's business; the runner only guarantees it lands on exactly
 * the bytes it expected.
 *
 * PRODUCT code: Node >= 18, stdlib only, no npm, no shelling out. Windows-safe.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const paths = require('./paths.js');
const { atomicWrite } = require('./atomic.js');

/** The sentinel an operation uses to say "this file must not exist yet". */
const ABSENT = 'absent';

const VERBS = new Set(['create', 'replace', 'move']);

// Windows opens these names as devices whatever the extension, so a file with one
// of these basenames cannot be relied on to be a file at all.
const RESERVED_DEVICE = new Set([
  'con', 'prn', 'aux', 'nul',
  'com1', 'com2', 'com3', 'com4', 'com5', 'com6', 'com7', 'com8', 'com9',
  'lpt1', 'lpt2', 'lpt3', 'lpt4', 'lpt5', 'lpt6', 'lpt7', 'lpt8', 'lpt9',
]);

const HEX64 = /^[0-9a-f]{64}$/;

/* ------------------------------- hashing -------------------------------- */

/** SHA-256 over exact bytes, hex. */
function hashBytes(data) {
  const buf = Buffer.isBuffer(data) ? data : Buffer.from(String(data), 'utf8');
  return crypto.createHash('sha256').update(buf).digest('hex');
}

/** SHA-256 of a file, or ABSENT when it is not there. Throws on a real error. */
function hashFileOrAbsent(abs) {
  let buf;
  try {
    buf = fs.readFileSync(abs);
  } catch (err) {
    if (err && err.code === 'ENOENT') return ABSENT;
    throw err;
  }
  return hashBytes(buf);
}

/* --------------------------- path validation ---------------------------- */

/**
 * The one comparison key for "is this the same file". Case-folded (macOS and
 * Windows are case-insensitive), Unicode-composed (é as one codepoint and as
 * e + combining accent are the same file on macOS), and stripped of the trailing
 * dots and spaces Windows ignores.
 */
function sameFileKey(relPosix) {
  return relPosix
    .normalize('NFC')
    .split('/')
    .map((seg) => seg.toLowerCase().replace(/[.\s]+$/, ''))
    .join('/');
}

/**
 * Validate a relative path for use as an operation target.
 * Returns null when it is acceptable, or a plain-words reason when it is not.
 *
 * Deliberately a whitelist of shapes rather than a blacklist of attacks: the path
 * must be POSIX-separated, non-empty, and made only of components that are not
 * `.`, `..`, empty, device names, or carrying anything Windows resolves away.
 */
function pathProblem(rel) {
  if (typeof rel !== 'string' || rel === '') return 'the path is empty';
  if (rel.indexOf('\u0000') !== -1) return 'the path contains a NUL character';
  if (rel.indexOf('\\') !== -1) return 'the path uses a backslash; operation paths are POSIX-separated';
  if (rel.indexOf(':') !== -1) {
    // Catches BOTH a drive letter ("C:x.md", "c:/x") and an NTFS stream
    // ("x.md::$DATA", "x.md:hidden"). Neither is ever a plain relative path.
    return 'the path contains a colon (a drive letter or an NTFS data stream)';
  }
  if (rel.charAt(0) === '/') return 'the path is absolute';
  if (path.isAbsolute(rel)) return 'the path is absolute';

  for (const seg of rel.split('/')) {
    if (seg === '') return 'the path has an empty component';
    // Belt and braces, and worth knowing it: `.` and `..` are ALSO caught by the
    // trailing-dot rule two lines down, and `..` again by resolved-path
    // containment. A mutation probe confirmed removing this line changes no
    // behaviour. It stays because it is the legible statement of intent — but do
    // not weaken the trailing-dot rule or containment believing this line has
    // those forms covered on its own.
    if (seg === '.' || seg === '..') return 'the path has a "." or ".." component';
    if (/[.\s]$/.test(seg)) return 'a path component ends in a dot or space, which Windows resolves away';
    if (/^\s/.test(seg)) return 'a path component starts with a space';
    // Illegal in an NTFS filename. Windows is first-class, so a job that
    // validates here and fails mid-commit THERE is a portability bug with a
    // data-integrity edge: the operations before it have already landed. (`\`
    // and `:` are refused above, for the whole path.)
    const illegal = seg.match(/[<>"|?*-]/);
    if (illegal) {
      return 'a path component contains a character Windows cannot put in a filename (' +
        JSON.stringify(illegal[0]) + ')';
    }
    const base = seg.replace(/\..*$/, '').toLowerCase();
    if (RESERVED_DEVICE.has(base)) return 'a path component is a reserved Windows device name (' + seg + ')';
  }
  return null;
}

/** A business slug must be a plain name, never a path. */
function businessProblem(name) {
  if (typeof name !== 'string' || name === '') return 'the business name is empty';
  if (name.indexOf('\u0000') !== -1) return 'the business name contains a NUL character';
  if (/[\\/:]/.test(name)) return 'the business name contains a separator or colon';
  if (name === '.' || name === '..') return 'the business name is "." or ".."';
  if (/[.\s]$/.test(name)) return 'the business name ends in a dot or space';
  if (/^\s/.test(name)) return 'the business name starts with a space';
  return null;
}

/**
 * Is `abs` really inside `home`, with no symlink or junction anywhere on the way?
 * Resolved-path containment, not string prefixing: a symlinked ancestor would
 * satisfy a prefix check while pointing anywhere at all.
 */
function containedRealPath(home, abs) {
  const realHome = paths.realpathBestEffort(home);
  const realAbs = paths.realpathBestEffort(abs);
  if (realHome === null || realAbs === null) return false;
  if (realAbs === realHome) return true;
  return realAbs.indexOf(realHome + path.sep) === 0;
}

/** True when the path itself, or any ancestor up to home, is a symlink. */
function anySymlinkOnPath(home, abs) {
  let cur = abs;
  const realHome = paths.realpathBestEffort(home);
  for (let hops = 0; hops < 64; hops++) {
    try {
      if (fs.lstatSync(cur).isSymbolicLink()) return true;
    } catch (_) { /* absent is fine — a file being created does not exist yet */ }
    const parent = path.dirname(cur);
    if (parent === cur) return false;
    cur = parent;
    if (cur === home || cur === realHome) return false;
  }
  return true; // absurdly deep: treat as unsafe
}

/* ---------------------------- normalisation ----------------------------- */

/**
 * normaliseJob(root, ops) -> { ok, errors, planned }
 *
 * Checks the shape of every operation, resolves each to an absolute target
 * inside a validated location, and refuses two operations that would land on the
 * same file. No disk writes; reads only what it needs to validate.
 */
function normaliseJob(root, opsList) {
  const errors = [];
  const planned = [];
  const fail = (index, reason) => errors.push({ index, reason });

  if (!Array.isArray(opsList)) {
    return { ok: false, errors: [{ index: -1, reason: 'a job must be a list of operations' }], planned: [] };
  }

  let businesses = [];
  try { businesses = paths.listBusinesses(root); } catch (err) {
    return {
      ok: false,
      errors: [{ index: -1, reason: 'could not list the businesses: ' + (err && err.message ? err.message : String(err)) }],
      planned: [],
    };
  }
  // Name -> real folder, keyed on the normalised name so an alias spelling finds
  // its folder. But two folders CAN normalise to one key: `Acme` and `acme` on a
  // case-sensitive filesystem, or NFC/NFD spellings of the same word. Building
  // the map straight from the list silently kept the last one, so a job naming
  // one business could resolve to the OTHER customer's folder. Record the
  // collisions instead and refuse any operation that names one: picking is
  // guessing, and what would be guessed is whose files get written.
  const businessByKey = new Map();
  const ambiguousKeys = new Map(); // key -> [folder names]
  for (const b of businesses) {
    const k = sameFileKey(b);
    if (businessByKey.has(k)) {
      const list = ambiguousKeys.get(k) || [businessByKey.get(k)];
      list.push(b);
      ambiguousKeys.set(k, list);
      continue;
    }
    businessByKey.set(k, b);
  }

  opsList.forEach((op, index) => {
    if (!op || typeof op !== 'object' || Array.isArray(op)) {
      return fail(index, 'an operation must be an object');
    }
    if (!VERBS.has(op.verb)) {
      return fail(index, 'unknown verb "' + String(op.verb) + '" (create, replace, move)');
    }

    /* ---- where it may write ---- */
    let home;      // the absolute folder the path is relative to
    let label;     // for messages
    if (op.business === null || op.business === undefined) {
      home = path.resolve(String(root));
      label = '(install)';
    } else {
      const bp = businessProblem(op.business);
      if (bp) return fail(index, bp);
      const key = sameFileKey(op.business);
      if (ambiguousKeys.has(key)) {
        return fail(index, 'more than one business folder matches "' + op.business + '" on this install (' +
          ambiguousKeys.get(key).join(', ') + '), so there is no way to tell which one you mean — ' +
          'rename one of them before running this');
      }
      // Resolve through the VALIDATED business list, never by joining the name.
      const real = businessByKey.get(key);
      if (real === undefined) {
        return fail(index, '"' + op.business + '" is not a business folder on this install');
      }
      home = path.join(path.resolve(String(root)), real);
      label = real;
      if (!containedRealPath(path.resolve(String(root)), home) ||
          anySymlinkOnPath(path.resolve(String(root)), home)) {
        return fail(index, 'the business folder "' + real + '" is a link, or resolves outside the install');
      }
    }

    /* ---- the path, and the destination of a move ---- */
    const targets = [{ rel: op.path, which: 'path' }];
    if (op.verb === 'move') targets.push({ rel: op.to, which: 'to' });

    const resolved = [];
    for (const t of targets) {
      const problem = pathProblem(t.rel);
      if (problem) return fail(index, problem + ' (' + t.which + ': ' + JSON.stringify(t.rel) + ')');
      const abs = path.join(home, ...t.rel.split('/'));

      // An install-level operation must not reach the machine set (updates own
      // that) and must not reach into a business (those must name their business,
      // so the business validation runs).
      if (op.business === null || op.business === undefined) {
        if (paths.isMachinePath(root, t.rel)) {
          return fail(index, 'an install-level operation may not touch the machine set (' + t.rel + ')');
        }
        const top = t.rel.split('/')[0];
        if (businessByKey.has(sameFileKey(top))) {
          return fail(index, 'name the business instead of writing into "' + top + '" from the install root');
        }
      }

      if (!containedRealPath(home, abs)) {
        return fail(index, 'the path resolves outside ' + label + ' (' + t.rel + ')');
      }
      resolved.push({ rel: t.rel, abs, key: label + '::' + sameFileKey(t.rel) });
    }

    /* ---- the expected-state field ---- */
    if (op.verb === 'create') {
      if (op.expect !== ABSENT) return fail(index, 'create must expect "' + ABSENT + '"');
    } else {
      if (typeof op.expect !== 'string' || !HEX64.test(op.expect)) {
        return fail(index, op.verb + ' must expect a sha256 hex hash of the current bytes');
      }
    }

    /* ---- the bytes ---- */
    if (op.verb === 'move') {
      if (op.bytes !== undefined) return fail(index, 'move carries no bytes; it relocates a file');
    } else {
      if (op.bytes === undefined || op.bytes === null) return fail(index, op.verb + ' needs bytes');
      if (!Buffer.isBuffer(op.bytes) && typeof op.bytes !== 'string') {
        return fail(index, op.verb + ' bytes must be a Buffer or a string');
      }
    }

    planned.push({
      index,
      verb: op.verb,
      business: op.business === undefined ? null : op.business,
      label,
      // The validated folder this operation's paths are relative to. Carried so
      // the preflight and last-moment link checks can walk EVERY component from
      // here down to the file — passing the file's own parent as the walk root
      // (what they used to do) checked the leaf and stopped, so no ancestor was
      // ever examined and the guarantee the plan advertises did not hold.
      home,
      rel: resolved[0].rel,
      abs: resolved[0].abs,
      key: resolved[0].key,
      toRel: op.verb === 'move' ? resolved[1].rel : null,
      toAbs: op.verb === 'move' ? resolved[1].abs : null,
      toKey: op.verb === 'move' ? resolved[1].key : null,
      expect: op.expect,
      bytes: op.verb === 'move' ? null
        : (Buffer.isBuffer(op.bytes) ? op.bytes : Buffer.from(String(op.bytes), 'utf8')),
    });
  });

  // Two operations on one file, in ANY spelling of its name.
  const seen = new Map();
  for (const p of planned) {
    for (const k of [p.key, p.toKey]) {
      if (k === null) continue;
      if (seen.has(k)) {
        errors.push({ index: p.index, reason: 'two operations target the same file as operation ' + seen.get(k) + ' (' + k + ')' });
      } else {
        seen.set(k, p.index);
      }
    }
  }

  return { ok: errors.length === 0, errors, planned };
}

/* ------------------------------- preflight ------------------------------ */

/** Confirm every expected hash and every destination, before anything is written. */
function preflight(planned) {
  const errors = [];
  for (const p of planned) {
    let actual;
    try {
      actual = hashFileOrAbsent(p.abs);
    } catch (err) {
      errors.push({ index: p.index, reason: p.rel + ' could not be read: ' + (err && err.message ? err.message : String(err)) });
      continue;
    }
    if (actual !== p.expect) {
      errors.push({
        index: p.index,
        reason: p.rel + ' is not what this job expected — it has changed since the job was worked out' +
          ' (expected ' + (p.expect === ABSENT ? 'no file' : p.expect.slice(0, 12) + '…') +
          ', found ' + (actual === ABSENT ? 'no file' : actual.slice(0, 12) + '…') + ')',
      });
      continue;
    }
    // Neither the target NOR any folder on the way to it may be a link. Walked
    // from the validated home, so every ancestor is examined — and run even when
    // the target is absent, because a create's parent is exactly where a linked
    // ancestor does its damage: the file does not exist, so nothing looks wrong,
    // and atomicWrite makes it on the other side of the link.
    if (anySymlinkOnPath(p.home, p.abs)) {
      errors.push({ index: p.index, reason: p.rel + ' is a link, or sits inside a linked folder; operations write real files only' });
      continue;
    }
    if (p.toAbs && anySymlinkOnPath(p.home, p.toAbs)) {
      errors.push({ index: p.index, reason: p.toRel + ' is a link, or sits inside a linked folder; operations write real files only' });
      continue;
    }
    if (p.verb === 'move') {
      let destState;
      try { destState = hashFileOrAbsent(p.toAbs); } catch (_) { destState = 'unreadable'; }
      if (destState !== ABSENT) {
        errors.push({ index: p.index, reason: 'the destination ' + p.toRel + ' already exists' });
      }
    }
  }
  return errors;
}

/* -------------------------------- journal ------------------------------- */

function journalRoot(root) {
  return path.join(String(root), '.growos', 'jobs');
}

/**
 * The journal holds exact pre-images — the owner's real bytes. So where it lands
 * matters as much as where the operations land: if `.growos/jobs` is a link into
 * a business folder, a job on business B writes B's originals inside A, where
 * A's own AI can read them. Checked before a single pre-image is written, and
 * `.growos/tmp` with it, because atomicWrite stages every write through there.
 */
function journalHomeProblem(root) {
  for (const rel of ['.growos/jobs', '.growos/tmp']) {
    const abs = path.join(String(root), ...rel.split('/'));
    if (anySymlinkOnPath(path.resolve(String(root)), abs)) {
      return rel + ' is a symbolic link, so this job would write copies of your files ' +
        'somewhere else — remove or investigate the link first; nothing was changed';
    }
  }
  return null;
}

/** A journal directory name that sorts chronologically and is filesystem-safe. */
function newJournalDir(root, name) {
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const dir = path.join(journalRoot(root), stamp + '-' + String(name || 'job').replace(/[^a-z0-9-]/gi, '-'));
  fs.mkdirSync(path.join(dir, 'pre'), { recursive: true });
  return dir;
}

/**
 * Record the pre-image of every operation: its hash, and — when a file is there —
 * its actual bytes. The hash alone proves nothing can be restored from it.
 */
function writeJournal(dir, planned) {
  const entries = [];
  // What the job is ABOUT to write, per operation. Known before any write happens
  // (the bytes come with the operation; a move's destination gets the source's
  // bytes), and it is what lets a rollback tell "still exactly what this job left"
  // from "the owner has changed it since" — the difference between safely undoing
  // and destroying newer work.
  const wrote = {};
  planned.forEach((p, i) => {
    const before = hashFileOrAbsent(p.abs);
    const entry = {
      index: p.index,
      verb: p.verb,
      business: p.business,
      label: p.label,
      rel: p.rel,
      to: p.toRel,
      before,
      pre: null,
    };
    if (before !== ABSENT) {
      const preName = path.join('pre', String(i).padStart(4, '0') + '.bin');
      atomicWrite(path.join(dir, preName), fs.readFileSync(p.abs));
      entry.pre = preName.split(path.sep).join('/');
    }
    wrote[String(p.index)] = p.verb === 'move' ? before : hashBytes(p.bytes);
    entries.push(entry);
  });
  atomicWrite(path.join(dir, 'journal.json'),
    JSON.stringify({ version: 1, entries, wrote }, null, 2) + '\n');
  return entries;
}

/* --------------------------------- apply -------------------------------- */

/**
 * applyJob(root, ops, opts) -> result
 *
 * opts:
 *   dryRun          validate and preflight, write nothing, report what would happen
 *   name            a label for the journal directory
 *   onBeforeCommit  TEST SEAM. Called with (i, planned[i]) immediately before each
 *                   write. It exists so the bench can create the one race that
 *                   cannot otherwise be produced on purpose — a symlink
 *                   substituted between preflight and commit — and prove the
 *                   commit refuses it. Nothing in the product passes it.
 *
 * result: { ok, stage, errors, planned?, applied, journalDir, rolledBack? }
 *   stage is where it got to: 'validate' | 'preflight' | 'dry-run' | 'commit' | 'done'
 */
function applyJob(root, opsList, opts) {
  opts = opts || {};
  const norm = normaliseJob(root, opsList);
  if (!norm.ok) return { ok: false, stage: 'validate', errors: norm.errors, applied: [], journalDir: null };

  const pre = preflight(norm.planned);
  if (pre.length) return { ok: false, stage: 'preflight', errors: pre, applied: [], journalDir: null };

  if (opts.dryRun) {
    return {
      ok: true,
      stage: 'dry-run',
      errors: [],
      applied: [],
      journalDir: null,
      planned: norm.planned.map((p) => ({
        verb: p.verb, business: p.business, path: p.rel, to: p.toRel,
        bytes: p.bytes === null ? null : p.bytes.length,
      })),
    };
  }

  if (norm.planned.length === 0) {
    return { ok: true, stage: 'done', errors: [], applied: [], journalDir: null };
  }

  // Where the journal itself lands is part of the safety story — see
  // journalHomeProblem. Checked before the first pre-image is written.
  {
    const jp = journalHomeProblem(root);
    if (jp) {
      return { ok: false, stage: 'preflight', applied: [], journalDir: null, errors: [{ index: -1, reason: jp }] };
    }
  }

  let journalDir;
  try {
    journalDir = newJournalDir(root, opts.name);
    writeJournal(journalDir, norm.planned);
  } catch (err) {
    return {
      ok: false, stage: 'preflight', applied: [], journalDir: null,
      errors: [{ index: -1, reason: 'could not write the job journal: ' + (err && err.message ? err.message : String(err)) }],
    };
  }

  const applied = [];
  const appliedIndices = new Set();
  let failure = null;

  for (let i = 0; i < norm.planned.length; i++) {
    const p = norm.planned[i];
    try {
      if (typeof opts.onBeforeCommit === 'function') opts.onBeforeCommit(i, p);

      // RE-VERIFY, immediately before writing. Between preflight and here, a
      // symlink or junction could have been substituted for the target, or the
      // bytes could have changed. This is the last honest moment to look.
      const now = hashFileOrAbsent(p.abs);
      if (now !== p.expect) {
        throw new Error(p.rel + ' changed between the check and the write');
      }
      // Walked from the validated home, and NOT gated on the target existing:
      // the swap that matters most is a create's parent folder turning into a
      // link, where the target is absent either way and only the ancestors give
      // it away.
      if (anySymlinkOnPath(p.home, p.abs)) {
        throw new Error(p.rel + ' became a link, or moved inside a linked folder, between the check and the write');
      }
      if (p.toAbs && anySymlinkOnPath(p.home, p.toAbs)) {
        throw new Error(p.toRel + ' became a link, or moved inside a linked folder, between the check and the write');
      }
      if (p.verb === 'move' && hashFileOrAbsent(p.toAbs) !== ABSENT) {
        throw new Error('the destination ' + p.toRel + ' appeared between the check and the write');
      }

      if (p.verb === 'move') {
        fs.mkdirSync(path.dirname(p.toAbs), { recursive: true });
        atomicWrite(p.toAbs, fs.readFileSync(p.abs));
        // A move is two steps, so it has a middle. If the source will not delete
        // — a lock, a permission, a sync client holding it — the owner is left
        // with their file DUPLICATED, and a rollback then refuses that entry
        // because something is "already back at the original path": neither done
        // nor undone, the one state this module exists to prevent. Undo the half
        // instead. The destination was proven absent at preflight, so removing
        // the copy just written restores exactly the pre-state, and the throw
        // then rolls the rest of the job back the normal way.
        try {
          fs.rmSync(p.abs, { force: true });
        } catch (rmErr) {
          const why = rmErr && rmErr.message ? rmErr.message : String(rmErr);
          // Undo the copy — but ONLY if it is still the bytes this job wrote.
          // Between the copy and here, something else could have replaced it (the
          // owner, a sync client); deleting that would destroy work this job never
          // created, in the name of tidying up. And if the removal itself fails,
          // say so instead of claiming the move was undone.
          // A move copies the source's bytes, and the source hashed to p.expect
          // at the re-verify a few lines above — so the copy this job wrote is
          // exactly p.expect. Anything else there now is somebody else's.
          let destState;
          try {
            destState = hashFileOrAbsent(p.toAbs);
          } catch (hashErr) {
            // An UNREADABLE destination proves nothing either way — and
            // letting the raw error escape this handler dropped the entry
            // from the rollback set entirely, so the job claimed a clean
            // rollback over a copy it may have left behind. Unknown is
            // judged like "not the copy this job made": two files may
            // remain, and the entry stays in the set.
            const unknown = new Error('could not remove ' + p.rel + ' after copying it to ' + p.toRel +
              ' (' + why + '), and the copy could not even be read back to check (' +
              (hashErr && hashErr.message ? hashErr.message : String(hashErr)) +
              '), so it was left alone: you may have the original AND that file — check ' + p.toRel +
              ' before removing anything');
            unknown.moveLeftDebris = true;
            throw unknown;
          }
          if (destState === ABSENT) {
            // Nothing to undo: something already removed the copy. Say that,
            // rather than the old message claiming both files were still there.
            throw new Error('could not remove ' + p.rel + ' after copying it to ' + p.toRel + ' (' + why +
              '), and the copy is already gone, so your original is intact and nothing was left behind');
          }
          if (destState !== p.expect) {
            // Two files remain, and one of them may be the job's (a source that
            // changed inside the staging window copies as OTHER-than-expect
            // bytes; an unreadable destination proves nothing either way). The
            // debris flag keeps this entry in the rollback set so `rolledBack`
            // cannot read true over the pair.
            const twoRemain = new Error('could not remove ' + p.rel + ' after copying it to ' + p.toRel +
              ' (' + why + '), and ' + p.toRel + ' is no longer the copy this job made, so it was left ' +
              'alone: you have the original AND that file — check ' + p.toRel + ' before removing anything');
            twoRemain.moveLeftDebris = true;
            throw twoRemain;
          }
          // Hash-then-delete is check-then-act, like compare-and-swap itself:
          // something could replace the copy in between. The window is one
          // read-then-delete wide (the hash is computed from a captured buffer,
          // but reading that buffer and deleting the file are still two calls)
          // and there is no atomic delete-if-unchanged in the stdlib, so this
          // is narrowed, not eliminated — said here rather than implied away.
          let undone = false;
          try { fs.rmSync(p.toAbs, { force: true }); undone = !fs.existsSync(p.toAbs); } catch (_e2) { undone = false; }
          const halfDone = new Error('could not remove ' + p.rel + ' after copying it to ' + p.toRel + ' (' + why + '), so ' +
            (undone
              ? 'the copy was removed again rather than leave you with two — nothing changed'
              : 'the move is half done: the original is still there AND a copy remains at ' + p.toRel +
                ', which could not be removed either. Remove that copy by hand'));
          // Only THIS state leaves job-written bytes on disk. The rollback set
          // must know that (see the catch below): sending every failed move to
          // rollback made an intact, fully-compensated failure read as "half
          // applied".
          halfDone.moveLeftDebris = !undone;
          throw halfDone;
        }
      } else {
        atomicWrite(p.abs, p.bytes);
      }
      applied.push({ verb: p.verb, business: p.business, path: p.rel, to: p.toRel });
      appliedIndices.add(p.index);
    } catch (err) {
      failure = { index: p.index, reason: (err && err.message ? err.message : String(err)) };
      // A failed replace/create wrote nothing (atomicWrite is rename-atomic and
      // the re-verify throws before it), so the entry needs no undo — but a
      // MOVE that copied its bytes and could not clean up has left a duplicate
      // behind, and that one goes back into the rollback set so `rolledBack`
      // cannot read true over it. ONLY that one: every
      // other move failure either never wrote (the copy step is rename-atomic)
      // or says in its own message that the state is intact, and rolling those
      // back turned "nothing changed" into a false "half applied". The
      // debris flag is set at the one throw site that leaves
      // job bytes on disk.
      if (p.verb === 'move' && err && err.moveLeftDebris === true) appliedIndices.add(p.index);
      break;
    }
  }

  if (failure === null) {
    return { ok: true, stage: 'done', errors: [], applied, journalDir };
  }

  // All or nothing: put back what landed before the failure — and ONLY what
  // landed. This rollback runs in the same process that applied the job, so it
  // knows exactly which operations committed. Walking the untouched entries too
  // meant an owner edit to a file the job NEVER WROTE was refused as "changed
  // since this job wrote it", flipping `rolledBack` to false — and every command
  // on top then told the owner part of the job had been applied when nothing
  // job-written remained on disk at all. A crash-recovery rollback (from the
  // journal alone, in a fresh process) has no applied list and still walks
  // everything, which is the right caution when nothing is known.
  const back = rollbackJob(root, journalDir, { onlyIndices: appliedIndices });
  return {
    ok: false,
    stage: 'commit',
    errors: [failure],
    applied,
    journalDir,
    rolledBack: back.ok,
    rollback: back,
  };
}

/* ------------------------------- rollback ------------------------------- */

/**
 * rollbackJob(root, journalDir, opts?) -> { ok, restored, refused, errors }
 *
 * Puts every journalled file back to its pre-image — but ONLY where the file is
 * still what this job left. If the owner has changed it since, restoring would
 * destroy newer work to tidy up an older mistake, so it refuses that file and
 * reports it. Everything it could safely restore, it does, and it says exactly
 * which is which: an install in a known partial state can be finished by hand,
 * while one described by a guess cannot.
 *
 * `opts.onlyIndices` (a Set of journal entry indices) limits the RESTORE walk to
 * the operations the calling process knows actually committed. The journal is
 * still validated whole — trust in the record is all-or-nothing — but an entry
 * the job never reached has nothing to undo, and judging it anyway turned an
 * owner's mid-job edit into a false "changed since this job wrote it" refusal.
 * Callers recovering from a journal alone (a crash, a kill) must not pass it:
 * with no applied list, walking everything is the right caution.
 */
/**
 * The pre-image bytes for one journal entry, or null when they cannot be trusted.
 *
 * A pre-image is the only copy of the owner's original bytes, and a rollback
 * writes it back. If cloud sync or disk damage has corrupted it, writing it is
 * WORSE than doing nothing: the job's own change is at least intact bytes, while
 * the backup is now garbage. So it is verified against the hash recorded when it
 * was taken (`before`), and a mismatch means that file is left alone and said so.
 */
function readVerifiedPreImage(journalDir, e) {
  if (!e.pre) return null;
  let bytes;
  try { bytes = fs.readFileSync(path.join(String(journalDir), ...String(e.pre).split('/'))); } catch (_) { return null; }
  if (typeof e.before !== 'string' || hashBytes(bytes) !== e.before) return null;
  return bytes;
}

function rollbackJob(root, journalDir, opts) {
  const only = opts && opts.onlyIndices instanceof Set ? opts.onlyIndices : null;
  let manifest;
  try {
    manifest = JSON.parse(fs.readFileSync(path.join(String(journalDir), 'journal.json'), 'utf8'));
  } catch (err) {
    return {
      ok: false, restored: [], refused: [],
      errors: [{ reason: 'the job journal could not be read, so nothing was rolled back: ' + (err && err.message ? err.message : String(err)) }],
    };
  }
  if (!manifest || !Array.isArray(manifest.entries)) {
    return { ok: false, restored: [], refused: [], errors: [{ reason: 'the job journal is not in a shape this can read' }] };
  }

  // A rollback DELETES and OVERWRITES on the journal's word, so the journal gets
  // the same scrutiny the original operations got. Being valid JSON says nothing
  // about being safe: a journal damaged by cloud sync — the appendix records
  // iCloud merging and duplicating files in this very product — can name a file
  // the job never touched, or a path that climbs out of the business. Every entry
  // is validated BEFORE anything is touched, and one bad entry stops the whole
  // rollback: a journal that is wrong about one file cannot be trusted about the
  // rest, and a half-applied rollback is the state this module exists to avoid.
  //
  // BE CLEAR ABOUT THE LIMIT. This bounds DAMAGE, not forgery. The journal is
  // the only record of what the job did, so a journal that is internally
  // coherent is believed — someone who can write a plausible `create` entry
  // whose recorded hash matches a live file can still get that file deleted.
  // That is accepted rather than defended, for one reason: writing the journal
  // needs write access to `.growos/jobs` inside the install, and anything with
  // that access can change the owner's files directly. Defending it would cost
  // real complexity to raise the bar for an attacker who is already past it.
  // What these checks DO buy is the realistic case: a truncated, merged or
  // half-written journal is refused instead of acted on.
  {
    const bad = [];
    let businesses = [];
    try { businesses = paths.listBusinesses(String(root)); } catch (_) { businesses = []; }
    const known = new Set(businesses.map((b) => sameFileKey(b)));
    manifest.entries.forEach((e, i) => {
      const where = 'entry ' + i;
      if (!e || typeof e !== 'object' || Array.isArray(e)) return bad.push(where + ' is not an operation record');
      if (!VERBS.has(e.verb)) return bad.push(where + ' has an unknown verb (' + String(e.verb) + ')');
      const atInstallRoot = e.business === null || e.business === undefined;
      if (!atInstallRoot) {
        if (businessProblem(e.business) || !known.has(sameFileKey(e.business))) {
          return bad.push(where + ' names a business this install does not have (' + String(e.business) + ')');
        }
        if (typeof e.label !== 'string' || sameFileKey(e.label) !== sameFileKey(e.business)) {
          return bad.push(where + ' has a folder label that does not match its business');
        }
      }
      for (const [field, rel] of [['path', e.rel], ['to', e.to]]) {
        if (field === 'to' && (rel === null || rel === undefined)) continue;
        const problem = pathProblem(rel);
        if (problem) return bad.push(where + ' has an unusable ' + field + ': ' + problem);
      }
      if (e.pre !== null && e.pre !== undefined) {
        const problem = pathProblem(e.pre);
        if (problem || String(e.pre).indexOf('pre/') !== 0) {
          return bad.push(where + ' points at a backup copy outside the journal (' + String(e.pre) + ')');
        }
      }
      // EVERY verb needs the hash of what the job wrote. It is the only way to
      // tell "still exactly what this job left" from "the owner has worked on it
      // since" — the difference between safely undoing and destroying newer work.
      // A create without it would be deleted on no evidence; a replace without it
      // skipped the changed-since guard entirely and put the old pre-image back
      // over the owner's newer edit. Losing just the `wrote` map to a sync merge
      // is exactly the damage this validation is here for, so absent -> refuse.
      if (!(manifest.wrote && manifest.wrote[String(e.index)] !== undefined)) {
        return bad.push(where + ' records nothing about what the job wrote, so there is no way to tell ' +
          'the job\'s own bytes from work done since');
      }
    });
    if (bad.length) {
      return {
        ok: false, restored: [], refused: [],
        errors: [{ reason: 'the job journal describes something this cannot safely undo, so nothing was rolled back: ' + bad.join('; ') }],
      };
    }
  }

  const restored = [];
  const refused = [];
  const errors = [];

  // Reverse order, so a move that displaced something is undone before whatever
  // was written on top of it.
  for (const e of manifest.entries.slice().reverse()) {
    // Never reached by the job, so there is nothing of the job's to undo there.
    // Validated above like every other entry; skipped only for restoring.
    if (only !== null && !only.has(e.index)) continue;
    const home = e.business === null || e.business === undefined
      ? path.resolve(String(root))
      : path.join(path.resolve(String(root)), e.label);
    const abs = path.join(home, ...String(e.rel).split('/'));
    const toAbs = e.to ? path.join(home, ...String(e.to).split('/')) : null;

    // The names passed validation above; this is where they RESOLVE. Same rule as
    // the forward direction: inside the validated home, and no link on the way —
    // undoing a job must not be a way to write somewhere a job could not.
    const escapes = [abs].concat(toAbs ? [toAbs] : []).filter(
      (a) => !containedRealPath(home, a) || anySymlinkOnPath(home, a)
    );
    if (escapes.length) {
      refused.push({ path: e.rel, why: 'it is a link, or resolves outside ' + (e.label || '(install)') + ', so it was left alone' });
      continue;
    }

    try {
      if (e.verb === 'create') {
        // The job created it. Remove it only if it is still byte-for-byte what the
        // job wrote; an owner edit since means it is theirs now.
        const now = hashFileOrAbsent(abs);
        if (now === ABSENT) { restored.push(e.rel + ' (already gone)'); continue; }
        // Guaranteed present by the validation above (every verb needs it), so
        // this comparison is unconditional — the old `!== undefined` form meant a
        // journal that had lost the record deleted the file on no evidence at all.
        if (now !== manifest.wrote[String(e.index)]) {
          refused.push({ path: e.rel, why: 'it has been changed since this job created it' });
          continue;
        }
        fs.rmSync(abs, { force: true });
        restored.push(e.rel + ' (removed)');
        continue;
      }

      if (e.verb === 'move') {
        const destNow = hashFileOrAbsent(toAbs);
        // The cleanest state a rollback can meet: the move never happened —
        // no destination, and the original still exactly at its pre-image. A
        // crash right after journalling leaves every later move like this,
        // and refusing it as "something is already back" reported that crash
        // as an incomplete rollback forever.
        if (destNow === ABSENT && hashFileOrAbsent(abs) === e.before) {
          restored.push(e.rel + ' (the move never happened — the original is untouched)');
          continue;
        }
        if (destNow !== e.before && destNow !== ABSENT) {
          refused.push({ path: e.to, why: 'it has been changed since this job moved it here' });
          continue;
        }
        if (hashFileOrAbsent(abs) !== ABSENT) {
          refused.push({ path: e.rel, why: 'something is already back at the original path' });
          continue;
        }
        if (destNow !== ABSENT) {
          fs.mkdirSync(path.dirname(abs), { recursive: true });
          atomicWrite(abs, fs.readFileSync(toAbs));
          fs.rmSync(toAbs, { force: true });
        } else if (e.pre) {
          const preBytes = readVerifiedPreImage(journalDir, e);
          if (preBytes === null) {
            refused.push({ path: e.rel, why: 'the copy of the original bytes is damaged, so it was NOT written back' });
            continue;
          }
          fs.mkdirSync(path.dirname(abs), { recursive: true });
          atomicWrite(abs, preBytes);
        }
        restored.push(e.rel + ' (moved back)');
        continue;
      }

      // replace: restore the pre-image, unless the live bytes are neither what
      // the job wrote nor already the pre-image.
      const now = hashFileOrAbsent(abs);
      if (now === e.before) { restored.push(e.rel + ' (already as it was)'); continue; }
      const preAbs = e.pre ? path.join(String(journalDir), ...e.pre.split('/')) : null;
      if (preAbs === null) {
        refused.push({ path: e.rel, why: 'the journal kept no copy of the original bytes' });
        continue;
      }
      // Guaranteed present by the validation above — an entry without it never
      // reaches here, so this is an unconditional comparison, not an optional one.
      const wrote = manifest.wrote[String(e.index)];
      if (now !== wrote) {
        refused.push({ path: e.rel, why: 'it has been changed since this job wrote it' });
        continue;
      }
      const preBytes = readVerifiedPreImage(journalDir, e);
      if (preBytes === null) {
        refused.push({ path: e.rel, why: 'the copy of the original bytes is damaged, so it was NOT written back' });
        continue;
      }
      atomicWrite(abs, preBytes);
      restored.push(e.rel + ' (put back)');
    } catch (err) {
      errors.push({ path: e.rel, reason: (err && err.message ? err.message : String(err)) });
    }
  }

  return { ok: refused.length === 0 && errors.length === 0, restored, refused, errors };
}

module.exports = {
  ABSENT,
  hashBytes,
  hashFileOrAbsent,
  sameFileKey,
  pathProblem,
  businessProblem,
  normaliseJob,
  applyJob,
  rollbackJob,
};
