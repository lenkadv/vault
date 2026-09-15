'use strict';

/**
 * cmd-libraries.js — the `libraries` command (Build Doc P3.3).
 *
 *   node system/tools/growos.js libraries [--business "Name"] [--map <file>] [--yes]
 *
 * WHAT CHANGES
 *
 * ⟳ Requirements amendment 2: learned patterns are PER BUSINESS. The catalogue
 * GrowOS ships stays install-wide in `system/creative-library/`; anything a
 * business learns stays in that business's own `library/` and never reaches
 * another. Not tidiness — it is what makes the product safe for an agency
 * running competing clients. A pattern proven on one client's spend must never
 * surface in another client's drafts.
 *
 * `shared/library/yours/` is the old install-wide home, and it IS the leak:
 * every business can read it. This job empties it into the right business.
 *
 * THE MULTI-BUSINESS RULE IS THE POINT, NOT AN EDGE CASE. One business has one
 * honest destination. More than one has none, and all three tempting answers are
 * wrong: copying into every business is the leak itself, picking one guesses
 * whose material it is, and leaving it where it is keeps it cross-readable. So
 * it stops and asks the owner to say where each file goes — `--business` for all
 * of it, or `--map` for one destination per file.
 *
 * WHY IT IS A CREATE PLUS A POINTER, NOT A MOVE
 *
 * The operation runner cannot express a move whose source and destination are in
 * different homes: an install-level operation may not write into a business
 * folder ("name the business instead"), and a business-level one may not reach
 * outside itself (`..` is refused). Both are correct, and neither is getting
 * weakened for a migration. So each file becomes a `create` at the destination
 * plus a `replace` of the source with a plain pointer, in ONE runner job — same
 * compare-and-swap, same journalled pre-images, same all-or-nothing commit.
 *
 * The content leaves the shared folder, which is the entire requirement. The
 * emptied file stays behind saying where it went, because the runner has no
 * delete verb by design and a migration does not justify inventing one. The
 * report tells the owner they can delete the folder by hand when they are happy.
 *
 * WHAT IT NEVER TOUCHES: `system/creative-library/` (ours, install-wide, replaced
 * by updates), and the old folder's own README while it is still byte-for-byte
 * the explainer we shipped. A README someone has WRITTEN IN is not ours any
 * more — it migrates like any other file, under a name that cannot collide
 * with the new library's own README.
 *
 * PRODUCT code: Node >= 18, stdlib only, no npm, no shelling out. Windows-safe.
 */

const fs = require('fs');
const path = require('path');
const { makeReporter } = require('./report.js');
const paths = require('./paths.js');
const ops = require('./operations.js');

/** The retired install-wide folder, POSIX, relative to the install root. */
const OLD_ROOT = 'shared/library/yours';

/**
 * The first line of an emptied source file. Exact, machine-readable, and the ONE
 * signal that a file has already been migrated — so a second run is a no-op
 * rather than a migration of pointers into pointers. Checked as a prefix of the
 * first line, so the destination path can follow it.
 */
const MOVED_MARKER = '<!-- growos:moved-to ';

/** The explainer written into a business's library the first time it gets one. */
function libraryReadme(business) {
  return [
    '# ' + business + '’s library',
    '',
    '> What this business has learned: hooks, angles, post styles, swipes worth',
    '> keeping. It grows as work gets approved, and it stays HERE.',
    '',
    '## Why it is not shared',
    '',
    'Anything learned from one business’s work stays inside that business. If you',
    'run more than one — clients, brands, side projects — a pattern proven on one',
    'never turns up in another one’s drafts. That is the whole reason this folder',
    'lives here instead of somewhere central.',
    '',
    'The catalogue GrowOS ships is the other half, in `system/creative-library/`.',
    'That one is generic craft, the same for everybody, and updates refresh it.',
    'Nothing you or your work produces is ever written there.',
    '',
    '## Adding to it',
    '',
    'The system adds writing patterns it has proven, and proposes anything that',
    'would change how the business LOOKS — a visual style, an animation template —',
    'rather than adding it silently. You can add or delete anything here yourself;',
    'updates never touch this folder.',
    '',
  ].join('\n');
}

/** Every migratable file under the old folder, POSIX-relative to OLD_ROOT. */
function oldFiles(root) {
  const base = path.join(String(root), ...OLD_ROOT.split('/'));
  const out = [];
  const walk = (absDir, rel) => {
    let dirents;
    try {
      dirents = fs.readdirSync(absDir, { withFileTypes: true });
    } catch (err) {
      // Only an ABSENT TOP-LEVEL folder means "nothing here". Anything else —
      // a permission, a lock, a sync placeholder, or a sub-folder that vanished
      // between listing its parent and reading it — must not reduce quietly to
      // an empty list: the command and the Doctor would then report that the
      // shared folder is clear while a customer's material is still sitting in
      // it, readable by every business. A descendant ENOENT is the vanishing
      // case: whatever replaced or renamed that folder is not in the listing
      // this walk already took, so the inventory is indeterminate, not smaller.
      if (err && err.code === 'ENOENT' && rel === '') return;
      throw new Error('could not read ' + OLD_ROOT + '/' + rel + ': ' +
        (err && err.message ? err.message : String(err)));
    }
    for (const d of dirents.slice().sort((a, b) => (a.name < b.name ? -1 : 1))) {
      if (paths.isAmbientLitter(d.name)) continue;
      const childRel = rel ? rel + '/' + d.name : d.name;
      if (d.isDirectory()) { walk(path.join(absDir, d.name), childRel); continue; }
      // A symlink, socket or device in there is not content this will follow —
      // and it is not something to pass over in silence either, because it may
      // be the owner's material behind a link.
      if (!d.isFile()) {
        throw new Error(OLD_ROOT + '/' + childRel + ' is not an ordinary file, so this will not move it. ' +
          'Look at it and move it yourself');
      }
      // The retired folder's own explainer is documentation, not owner material —
      // but ONLY while it is still the bytes we shipped. "It is just our README"
      // cannot be assumed: if someone has written notes in it, leaving it behind
      // strands their writing in the shared folder, which is the exact thing this
      // command exists to end. An edited one migrates like anything else, under a
      // name that cannot clash with the new library README.
      if (childRel.toLowerCase() === 'readme.md' && isShippedRetiredReadme(absDir, d.name)) continue;
      out.push(childRel);
    }
  };
  walk(base, '');
  return out;
}

/**
 * Every name in `names` the filesystem would treat as the same file as `want`,
 * excluding `want` itself. ALL of them, not the first: a folder holding both
 * the exact name and a case twin must still be reported, and returning the
 * exact name first hid the twin. Compared on `ops.sameFileKey`, the same key
 * the runner uses to spot two operations aiming at one file.
 */
function aliasesAmong(names, want) {
  const key = ops.sameFileKey(want);
  const out = [];
  for (const n of names) {
    if (n !== want && ops.sameFileKey(n) === key) out.push(n);
  }
  return out;
}

/**
 * The first on-disk name that collides with any COMPONENT of `destRel` under
 * the business folder, or null when the whole path is clear.
 *
 * `fs.existsSync` asks a case-SENSITIVE question on Linux and a case-INSENSITIVE
 * one on the two platforms this product calls first-class — and it only ever
 * asks about the leaf. So an existing `library/Hooks/` did not stop
 * `library/hooks/openers.md`: on Linux the pair collides the moment the folder
 * reaches macOS or Windows, and on a case-insensitive disk the new file quietly
 * lands INSIDE `Hooks/`. Every component is judged, from the top down.
 *
 * An unreadable directory on the way THROWS rather than answering "no
 * collision" — the same no-fail-open rule as the inventory walk above.
 */
function destinationCollision(root, business, destRel) {
  let dirAbs = path.join(String(root), business);
  const segs = destRel.split('/');
  const walked = [];
  for (const want of segs) {
    let names;
    try {
      names = fs.readdirSync(dirAbs);
    } catch (err) {
      if (err && err.code === 'ENOENT') return null;   // nothing on disk from here down
      throw new Error('could not check ' + business + '/' + walked.join('/') +
        ' for name collisions: ' + (err && err.message ? err.message : String(err)));
    }
    const aliases = aliasesAmong(names, want);
    if (aliases.length) {
      return { existing: walked.concat(aliases[0]).join('/'), wanted: walked.concat(want).join('/') };
    }
    walked.push(want);
    dirAbs = path.join(dirAbs, want);
  }
  return null;
}

/**
 * The exact bytes of the `shared/library/yours/README.md` this product used to
 * ship, as a hash. Recorded rather than kept as a file, because that file is
 * retired: a fresh 2.0 install has no such folder at all.
 */
const RETIRED_README_SHA = '66be5a365d95e0dea713c8d4073681c96c7cbaf4cc486f664c301c1fac937b96';

function isShippedRetiredReadme(absDir, name) {
  try {
    return ops.hashBytes(fs.readFileSync(path.join(absDir, name))) === RETIRED_README_SHA;
  } catch (_) {
    return false;   // unreadable is not "ours"; the walk refuses it above
  }
}

/** Where the pointer in an emptied source file says its content went. */
const POINTER_DEST = new RegExp('^' + MOVED_MARKER.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(\\S.*?)\\s*-->\\s*$');

/**
 * The destination a pointer claims, or null when this is not a valid pointer.
 *
 * PARSED, not merely prefix-matched. "The first line starts with the marker" is
 * not proof of a completed move: it says nothing about WHERE the content went or
 * whether it is there. A file left saying "I moved to X" with no X is a file
 * whose content is gone and never arrived, and skipping it as already-done would
 * make that permanent.
 */
function pointerDestination(text) {
  const m = String(text).split('\n', 1)[0].match(POINTER_DEST);
  return m ? m[1] : null;
}

/**
 * Whether a pointer's claimed destination is really a completed move, and if
 * not, which way it is wrong. Returns null (a real, landed move), 'shape'
 * (not a place this migration ever writes), or 'missing' (the right shape,
 * but no ordinary file is there).
 *
 * A parsed pointer is a CLAIM, not proof. `existsSync` on the claim accepted a
 * pointer naming its own source path, a `..` climb to any real file, or a
 * directory that had replaced the lost destination — each one read as "already
 * moved", which made the loss permanent while reporting the folder clear. The
 * only place this command ever writes is `<business>/library/<file>`, so that
 * is the only claim that can mean "done":
 *
 *   - the path must parse as `<business>/library/<rel>` with no climbing or
 *     Windows-hostile component (`ops.pathProblem`, the runner's own rule);
 *   - `<business>` must be a business folder on THIS install, by exact name —
 *     the pointer was machine-written from the folder name, so anything else
 *     is not our pointer or not our install any more;
 *   - what sits there must be an ordinary file, judged with `lstat` so a link
 *     does not count, and it must RESOLVE inside that business — a NAME is not
 *     a DESTINATION, and a symlinked ancestor sends the name somewhere else.
 */
function pointerTargetProblem(root, claimed, businesses) {
  const c = String(claimed);
  const segs = c.split('/');
  if (segs.length < 3 || segs[1] !== 'library') return 'shape';
  if (ops.pathProblem(c) !== null) return 'shape';
  if (businesses.indexOf(segs[0]) === -1) return 'shape';
  const abs = path.join(String(root), ...segs);
  let st;
  try { st = fs.lstatSync(abs); } catch (_) { return 'missing'; }
  if (!st.isFile()) return 'missing';
  // One inode, one name. A hard link passes isFile and its
  // realpath stays inside the named business — but the SAME bytes answer under
  // another name, possibly in another business, and a write through either
  // name reaches both. A file with company is not a landed move.
  if (st.nlink > 1) return 'shared';
  const bizReal = paths.realpathBestEffort(path.join(String(root), segs[0]));
  const absReal = paths.realpathBestEffort(abs);
  if (absReal !== bizReal && absReal.indexOf(bizReal + path.sep) !== 0) return 'missing';
  return null;
}

/** The bytes an emptied source file is left holding. */
function pointer(business, rel) {
  const dest = business + '/library/' + rel;
  return [
    MOVED_MARKER + dest + ' -->',
    '',
    '# Moved',
    '',
    'This file now lives at `' + dest + '`.',
    '',
    'GrowOS keeps what a business learns inside that business, so nothing proven',
    'for one ever turns up in another one’s drafts. This folder was the old',
    'install-wide home and is being retired: once you are happy everything landed,',
    'you can delete `' + OLD_ROOT + '/` yourself. Nothing reads it any more.',
    '',
  ].join('\n');
}

/**
 * parseMap(text) -> { ok, entries: Map<rel, business>, errors }
 *
 * One `<path under the old folder> -> <business>` per line. Blank lines and
 * lines starting with `#` are ignored. Deliberately dull: this is the owner
 * saying where their own material goes, and it should be readable and writable
 * by hand in any editor.
 */
function parseMap(text) {
  const entries = new Map();
  const errors = [];
  const lines = String(text).split(/\r?\n/);
  lines.forEach((raw, i) => {
    const line = raw.trim();
    // `#` at the start is a comment. A FILE whose name starts with `#` is named
    // by quoting it (see below), so commenting a line out keeps working.
    if (line === '' || line.charAt(0) === '#') return;
    const at = line.indexOf('->');
    if (at === -1) {
      errors.push('line ' + (i + 1) + ' is not "<file> -> <business>": ' + JSON.stringify(raw));
      return;
    }
    // A path may be double-quoted, which is the ONLY way to name a file whose
    // own name starts with `#` — otherwise the single line that could name it
    // reads as a comment, and the map is refused as incomplete forever. Quoting
    // rather than "a `#` line with an arrow is not a comment", because people
    // comment map entries OUT and that must keep working.
    const rawRel = line.slice(0, at).trim();
    const quoted = rawRel.match(/^"(.*)"$/);
    const rel = (quoted ? quoted[1] : rawRel).replace(/\\/g, '/');
    const business = line.slice(at + 2).trim();
    if (rel === '' || business === '') {
      errors.push('line ' + (i + 1) + ' is missing a file or a business: ' + JSON.stringify(raw));
      return;
    }
    if (entries.has(rel)) {
      errors.push('"' + rel + '" is listed more than once, so there is no single destination for it');
      return;
    }
    entries.set(rel, business);
  });
  return { ok: errors.length === 0, entries, errors };
}

/**
 * plan(root, opts) -> { ok, errors, operations, moves, note }
 *   opts: { business, mapText }
 *
 * Pure computation against what is on disk. Nothing is written.
 */
function plan(root, opts) {
  opts = opts || {};
  const errors = [];
  const fail = () => ({ ok: false, errors, operations: [], moves: [] });

  // The two flags are alternatives, and the refusal is about the INVOCATION —
  // so it comes before the folder is even looked at, and it is judged on
  // PRESENCE, not value: an explicitly empty --business beside a --map is
  // still both flags. Answering "nothing to move" first
  // meant an empty or already-migrated library quietly accepted a command
  // line that will be refused the day there is real work in it.
  const businessPassed = opts.business !== null && opts.business !== undefined && opts.business !== false;
  const wantedRaw = businessPassed ? String(opts.business).trim() : '';
  if (businessPassed && opts.mapText !== null && opts.mapText !== undefined) {
    errors.push('You gave both --business and --map. They are two ways of saying the same thing, and ' +
      'this will not pick between them: use --business to send all of it to one business, or --map to ' +
      'give each file its own destination.');
    return fail();
  }
  if (businessPassed && wantedRaw === '') {
    errors.push('The --business option needs a name; it was given with no business name after it.');
    return fail();
  }

  let businesses;
  try { businesses = paths.listBusinesses(root); } catch (err) {
    errors.push('Could not read the install folder: ' + (err && err.message ? err.message : String(err)));
    return fail();
  }

  const files = oldFiles(root);
  const pending = [];
  for (const rel of files) {
    let text;
    try { text = fs.readFileSync(path.join(String(root), ...OLD_ROOT.split('/'), ...rel.split('/'))); } catch (err) {
      errors.push(OLD_ROOT + '/' + rel + ' could not be read (' + (err && err.message ? err.message : String(err)) + ').');
      continue;
    }
    // Already emptied by a previous run? Only when the pointer PARSES and its
    // claim survives pointerTargetProblem above. Anything else — a marker with
    // no destination, a claim outside a business library, a destination that
    // has since gone — means the content left this file and did not arrive,
    // and passing over it would make that permanent while reporting the folder
    // clear.
    const claimed = pointerDestination(text.toString('utf8'));
    if (claimed !== null) {
      const problem = pointerTargetProblem(root, claimed, businesses);
      if (problem === null) continue;
      errors.push(OLD_ROOT + '/' + rel + ' says its content moved to ' + claimed + ', but ' +
        (problem === 'shape'
          ? 'that is not a place this migration puts things — a completed move lands at <business>/library/<file>'
          : problem === 'shared'
            ? 'the file there has more than one name pointing at it, so it may also be another business\'s file'
            : 'there is no ordinary file there') +
        '. Its content is not in this file either. Find it — it may be in a job journal under ' +
        '.growos/jobs — before running this again.');
      continue;
    }
    if (text.toString('utf8').indexOf(MOVED_MARKER) === 0) {
      errors.push(OLD_ROOT + '/' + rel + ' starts with a GrowOS "moved" marker that does not say where to. ' +
        'That is damage, not a completed move, and this will not guess past it.');
      continue;
    }
    pending.push({ rel, bytes: text });
  }
  if (errors.length) return fail();
  if (pending.length === 0) return { ok: true, errors: [], operations: [], moves: [], nothing: true };

  /* ---- where each file goes ---- */
  // The both-flags contradiction was refused at the top, before any reading.
  const wanted = wantedRaw;
  let destOf;   // rel -> business folder name

  if (opts.mapText !== null && opts.mapText !== undefined) {
    const parsed = parseMap(opts.mapText);
    for (const e of parsed.errors) errors.push('The destination map has a problem: ' + e + '.');
    if (errors.length) return fail();
    const listed = new Set(parsed.entries.keys());
    const have = new Set(pending.map((p) => p.rel));
    for (const rel of have) {
      if (!listed.has(rel)) {
        errors.push('The map does not say where "' + rel + '" goes. Every file needs a destination — ' +
          'this will not pick one for you.');
      }
    }
    for (const rel of listed) {
      if (!have.has(rel)) {
        errors.push('The map lists "' + rel + '", which is not in ' + OLD_ROOT + '/ (or has already been moved).');
      }
    }
    if (errors.length) return fail();
    destOf = new Map(parsed.entries);
  } else if (wanted !== '') {
    destOf = new Map(pending.map((p) => [p.rel, wanted]));
  } else if (businesses.length === 1) {
    destOf = new Map(pending.map((p) => [p.rel, businesses[0]]));
  } else if (businesses.length === 0) {
    errors.push('There are no business folders yet, so there is nowhere for this to go. ' +
      'Set one up first: node system/tools/growos.js setup --business "Your Business".');
    return fail();
  } else {
    errors.push('This install has ' + businesses.length + ' businesses (' + businesses.join(', ') +
      '), so there is no way to know whose material this is. These files are waiting: ' +
      pending.map((p) => p.rel).join(', ') + '. ' +
      'Say where they go: --business "<name>" puts all of it in one, or --map <file> gives each ' +
      'file its own line as "<file> -> <business>". Nothing is copied into every business — that ' +
      'is exactly the leak this is fixing.');
    return fail();
  }

  /* ---- validate every destination, then build the job ---- */
  for (const [rel, business] of destOf) {
    if (businesses.indexOf(business) === -1) {
      const alias = businesses.find((b) => ops.sameFileKey(b) === ops.sameFileKey(business));
      errors.push('"' + business + '" (for ' + rel + ') is not a business folder on this install' +
        (alias ? ' — did you mean "' + alias + '"?' : '') + '.');
    }
    // REDUNDANT, NOT UNREACHABLE — an earlier comment here claimed the latter and
    // was wrong, which is worth more than a tidy note. Every `rel` has been
    // proven to be a file the directory walk found, so no map entry can INVENT a
    // path — but a real file on Linux can be named with a colon or another shape
    // Windows cannot store, and this fires on that. The runner refuses it again
    // afterwards, which is why nothing in the bench binds to this line alone.
    const problem = ops.pathProblem(rel);
    if (problem) errors.push('"' + rel + '" cannot be used as a path: ' + problem + '.');
  }
  if (errors.length) return fail();

  const operations = [];
  const moves = [];
  const readmesNeeded = new Set();
  for (const p of pending) {
    const business = destOf.get(p.rel);
    // The retired folder's own README, when the owner has written in it, needs a
    // name that cannot collide with the library README this job creates.
    const destRel = 'library/' + (p.rel.toLowerCase() === 'readme.md'
      ? 'from-shared-library-README.md'
      : p.rel);
    const destAbs = path.join(String(root), business, ...destRel.split('/'));
    // existsSync alone is a case-SENSITIVE question, and the filesystems this
    // product treats as first-class are not — and it only ever asks about the
    // leaf. The runner compares aliases among PLANNED operations; this is the
    // same question asked of what is already on disk, per COMPONENT.
    const collision = destinationCollision(root, business, destRel);
    if (collision) {
      errors.push(business + '/' + collision.existing + ' already exists, and on macOS or Windows that is ' +
        'the same name as ' + business + '/' + collision.wanted + '. Nothing was moved — rename one of ' +
        'them first.');
      continue;
    }
    let landed = false;
    if (fs.existsSync(destAbs)) {
      // A destination holding EXACTLY these bytes is a run that was killed
      // between creating it and emptying the source — the other half of the
      // partial state the pointer covers. Refusing it as a collision left the
      // material cross-readable with no way forward, so finish the job instead:
      // skip the create, still write the pointer. Byte equality is proof of the
      // BYTES only, not of the PLACE: skipping the create
      // also skips every check the runner would have done, and a symlink at
      // the destination has equal bytes BY DEFINITION when it points at the
      // source itself — "finishing" that job replaces the only real copy with
      // a pointer. So the resume path proves the destination the same way the
      // pointer check does: an ordinary file with one name, no link on the
      // way, resolving inside this business.
      const placeProblem = pointerTargetProblem(root, business + '/' + destRel, businesses);
      if (placeProblem !== null) {
        errors.push(business + '/' + destRel + ' already exists but is not an ordinary file safely inside ' +
          'that business (a link, an extra name, or a path that resolves elsewhere). Nothing was moved — ' +
          'look at it and remove it before running this again.');
        continue;
      }
      let same = false;
      try { same = ops.hashFileOrAbsent(destAbs) === ops.hashBytes(p.bytes); } catch (_) { same = false; }
      if (!same) {
        errors.push(business + '/' + destRel + ' already exists and is not this file. Nothing was moved — ' +
          'look at both copies and remove the one you do not want first.');
        continue;
      }
      landed = true;
    }
    if (!landed) {
      operations.push({ business, path: destRel, verb: 'create', expect: ops.ABSENT, bytes: p.bytes });
    }
    operations.push({
      business: null,
      path: OLD_ROOT + '/' + p.rel,
      verb: 'replace',
      expect: ops.hashBytes(p.bytes),
      bytes: pointer(business, destRel.slice('library/'.length)),
    });
    moves.push({ from: OLD_ROOT + '/' + p.rel, to: business + '/' + destRel });
    // The library explains itself the first time it gets content — but "has a
    // README" is the same case-blind question as any other destination, so it
    // is asked with aliases too. On Linux, existsSync('README.md') said no
    // while `readme.md` sat right there, and the mint created the colliding
    // pair this very block exists to prevent.
    let hasReadme = false;
    try {
      hasReadme = fs.readdirSync(path.join(String(root), business, 'library'))
        .some((n) => ops.sameFileKey(n) === ops.sameFileKey('README.md'));
    } catch (err) {
      if (!(err && err.code === 'ENOENT')) {
        errors.push('could not check ' + business + '/library for a README: ' +
          (err && err.message ? err.message : String(err)) + '.');
        continue;
      }
      hasReadme = false;   // no library folder yet — this job is creating it
    }
    if (!hasReadme) readmesNeeded.add(business);
  }
  if (errors.length) return fail();

  for (const business of [...readmesNeeded].sort()) {
    operations.push({
      business, path: 'library/README.md', verb: 'create',
      expect: ops.ABSENT, bytes: libraryReadme(business),
    });
  }

  return { ok: true, errors: [], operations, moves };
}

/**
 * Material still sitting in the old install-wide folder, for the Doctor. The
 * folder's own README counts only once someone has written in it: while it is
 * byte-for-byte the shipped explainer, `oldFiles` leaves it out, and reporting
 * OUR OWN documentation forever would train the owner to ignore the finding.
 */
function leftovers(root) {
  const out = [];
  let businesses;
  try { businesses = paths.listBusinesses(root); } catch (_) { businesses = []; }
  for (const rel of oldFiles(root)) {
    let text;
    try {
      text = fs.readFileSync(path.join(String(root), ...OLD_ROOT.split('/'), ...rel.split('/')), 'utf8');
    } catch (_) {
      // Unreadable is NOT 'already moved' — and neither is ENOENT: a listed
      // file that cannot be read back means the folder changed under this
      // scan, and calling it clear on a scan that raced is the fail-open this
      // module keeps refusing. If it is truly gone, the next look will not
      // list it; one transient mention is the cheaper mistake.
      out.push(rel);
      continue;
    }
    // Same rule the command uses: a file only counts as moved when its pointer
    // PARSES and its claim survives pointerTargetProblem — shape, a real
    // business's library, an ordinary file that resolves inside it. One
    // definition, so the Doctor can never call the folder clear while the
    // command still has work.
    const claimed = pointerDestination(text);
    if (claimed !== null && pointerTargetProblem(root, claimed, businesses) === null) continue;
    out.push(rel);
  }
  return out;
}

async function run(args, ctx) {
  const reporter = makeReporter({ json: ctx.flags && ctx.flags.json });

  if (!ctx.root) {
    reporter.red('Could not find your GrowOS folder', 'There is no system/VERSION at or above where this ran.');
    reporter.print();
    return 2;
  }
  const root = ctx.root;

  // The contradiction outranks everything about the map, including whether its
  // file exists: answering "could not read the map" first walks the owner into
  // fixing a path for an invocation that was never going to be accepted.
  // Judged on flag PRESENCE, not value — `--business= --map m` is both flags
  // on one command line, whatever the empty value says.
  const businessGiven = !!(ctx.flags && ctx.flags.business !== undefined && ctx.flags.business !== null && ctx.flags.business !== false);
  const businessFlag = ctx.flags && typeof ctx.flags.business === 'string' ? ctx.flags.business.trim() : '';
  const mapFlagGiven = !!(ctx.flags && ctx.flags.map !== undefined && ctx.flags.map !== null && ctx.flags.map !== false);
  if (businessGiven && mapFlagGiven) {
    reporter.red('Nothing was moved', 'You gave both --business and --map. They are two ways of saying the ' +
      'same thing, and this will not pick between them: use --business to send all of it to one business, ' +
      'or --map to give each file its own destination.', 'Drop one of them, then run it again.');
    reporter.print();
    return 2;
  }
  if (businessGiven && businessFlag === '') {
    reporter.red('The --business option needs a name', 'It was given with no business name after it.',
      'Run: node system/tools/growos.js libraries --business "Your Business"');
    reporter.print();
    return 2;
  }

  let mapText = null;
  const mapPath = ctx.flags && ctx.flags.map;
  if (mapPath !== undefined && mapPath !== null && mapPath !== false) {
    if (mapPath === true || String(mapPath).trim() === '') {
      reporter.red('The --map option needs a file', 'Pass the path to a file listing "<file> -> <business>" lines.',
        'Run: node system/tools/growos.js libraries --map destinations.txt');
      reporter.print();
      return 2;
    }
    try {
      mapText = fs.readFileSync(String(mapPath), 'utf8');
    } catch (err) {
      reporter.red('Could not read the destination map', String(mapPath) + ': ' + (err && err.message ? err.message : String(err)),
        'Check the path and run it again.');
      reporter.print();
      return 2;
    }
  }

  let planned;
  try {
    planned = plan(root, { business: ctx.flags && ctx.flags.business, mapText });
  } catch (err) {
    reporter.red('Could not work out what to move', err && err.message ? err.message : String(err), 'Nothing was changed.');
    reporter.print();
    return 2;
  }

  if (!planned.ok) {
    for (const e of planned.errors) reporter.red('Nothing was moved', e, 'Sort that out, then run it again.');
    reporter.print();
    return 2;
  }

  if (planned.nothing || planned.operations.length === 0) {
    reporter.green('There is nothing left in the old shared library',
      OLD_ROOT + '/ holds no material that still needs a home.');
    reporter.print();
    return 0;
  }

  const lines = planned.moves.map((m) => m.from + ' -> ' + m.to);
  const summary = planned.moves.length + ' file(s) to move out of the shared library';

  if (!(ctx.flags && ctx.flags.yes)) {
    const dry = ops.applyJob(root, planned.operations, { dryRun: true, name: 'libraries' });
    if (!dry.ok) {
      for (const e of dry.errors) reporter.red('This cannot be applied as it stands', e.reason, 'Nothing was changed.');
      reporter.print();
      return 2;
    }
    reporter.yellow('There is work waiting: ' + summary,
      lines.join(' | ') + ' — this is a preview, not a reservation: applying re-reads everything and works ' +
      'from what is there then, so a file added or changed in between may be included or may stop the run ' +
      '(with --map, a file the map does not name stops it).',
      'Nothing was changed. To apply it: node system/tools/growos.js libraries' +
      (ctx.flags && ctx.flags.business ? ' --business "' + ctx.flags.business + '"' : '') +
      (mapText !== null ? ' --map "' + String(mapPath) + '"' : '') + ' --yes');
    reporter.print();
    return reporter.exitCode();
  }

  const result = ops.applyJob(root, planned.operations, { name: 'libraries' });
  if (!result.ok) {
    const stuck = result.rolledBack === false;
    for (const e of result.errors) {
      reporter.red(stuck ? 'It stopped part-way' : 'Nothing was moved', e.reason, 'Check that file, then run it again.');
    }
    if (stuck) {
      reporter.red('Some of it had already been applied when it stopped',
        'The undo could not finish: ' + JSON.stringify((result.rollback && result.rollback.refused) || []),
        'The originals are in ' + (result.journalDir || '.growos/jobs') + '.');
    }
    reporter.print();
    return 2;
  }

  reporter.green('Moved: ' + summary, lines.join(' | '),
    'Each file in ' + OLD_ROOT + '/ now just says where it went. Delete that folder yourself ' +
    'once you are happy; nothing reads it any more.');
  reporter.print();
  return reporter.exitCode();
}

module.exports = {
  name: 'libraries',
  summary: 'Move what a business learned out of the old shared library and into that business.',
  run,
  plan,
  leftovers,
  parseMap,
  aliasesAmong,
  // Shared with `restamp`, which updates pointer stubs when a business folder
  // is renamed — one parser, one validator, one stub format, so the two
  // commands can never disagree about what a completed move looks like.
  pointerDestination,
  pointerTargetProblem,
  pointer,
  OLD_ROOT,
};
