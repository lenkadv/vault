'use strict';

/**
 * cmd-import.js — the `import` command (Build Doc P3.4).
 *
 *   node system/tools/growos.js import --from <0.1 business folder> --business "Name" [--yes]
 *
 * THE PROMISE THIS KEEPS
 *
 * The requirements say 0.1 customers "upgrade cleanly and get 2.0 free."
 * Refusing safely is not upgrading cleanly, so this has to actually work — on
 * folders holding a real business's only copy of its own marketing.
 *
 * THE TRAP, AND IT IS WHY THIS IS HARDER THAN IT LOOKS
 *
 * All fourteen real 0.1 installs report `system/VERSION` as `2.0.0`. The version
 * string is not merely unhelpful, it is actively misleading, and anything that
 * trusted it would misread every real customer there is. So a 0.1 folder is
 * identified by its SHAPE — the omnibus `brand.md`, `audiences/`, `output/`.
 *
 * Shape alone is not enough either, and this is the part earlier designs missed:
 * an ALREADY-IMPORTED 0.1 folder still looks exactly like 0.1, forever. Without
 * decisive NEGATIVE criteria the next run imports everything a second time. So
 * detection is positive markers AND the absence of 2.0's own markers, and a
 * completed import records an identity that makes a repeat a no-op.
 *
 * NOTHING IS GUESSED
 *
 * 0.1 had no unified statuses (Requirements appendix B: "Review = ad-hoc chat;
 * light per-skill frontmatter; no unified statuses, no queue"). So for most of a
 * real install there is NO WAY to know whether a file went out. "Probably
 * published" is how a half-finished draft ends up on a customer's website, so:
 *
 *   - a file whose own frontmatter says `status: published` -> `brain/samples/`
 *   - one that says draft/review/changes                    -> also staged, NOT
 *     silently turned into a queue item with a fresh id and a status nobody set
 *   - everything else, which is most of it                  -> `brain/inbox/`,
 *     visible, whole, and claimed to be nothing at all
 *
 * The inbox is the drop folder the Doctor nags about until it is drained, which
 * is exactly the right pressure: a person decides, with the AI's help, in a
 * session. That is a smaller promise than the Build Doc's "unfinished work
 * enters the queue as drafts", and it is the honest one — see SPEC §6.7.4.
 *
 * THE OMNIBUS `brand.md` IS NOT SPLIT. In 0.1 it holds brand, voice, audience
 * and business facts together; 2.0's `brain/brand.md` is visual identity alone.
 * Copying one onto the other would put four kinds of knowledge into a file that
 * three skills read for a fifth. It goes to the inbox whole.
 *
 * LOSSLESS, AND VERIFIED. Every source file is also copied byte-for-byte into a
 * dated archive inside the business, whatever the mapper made of it, and the
 * count and hashes are checked afterwards. The source folder is never moved,
 * never written to, never deleted.
 *
 * ALL OR NOTHING. Every write goes through the operation runner in one job, so a
 * single collision leaves the install exactly as it was.
 *
 * PRODUCT code: Node >= 18, stdlib only, no npm, no shelling out. Windows-safe.
 */

const fs = require('fs');
const path = require('path');
const { makeReporter } = require('./report.js');
const paths = require('./paths.js');
const ops = require('./operations.js');
const fm = require('./fm.js');

/** Where a completed import leaves its receipt, inside the business. */
const LEGACY = 'legacy-0.1';

/**
 * 0.1's own shape. Any TWO of these in one folder is a 0.1 business — one alone
 * is not enough, because `lessons.md` or a folder called `research` could be
 * anybody's.
 */
const MARKERS_01 = {
  files: ['brand.md', 'lessons.md', 'content-ideas.md'],
  dirs: ['audiences', 'output', 'swipe-files', 'inspiration', 'uploads'],
};

/**
 * Decisive 2.0 markers. Any ONE of these means the folder is NOT a 0.1 business
 * and must never be imported from — `brain/` and `work/` are what 2.0 makes, and
 * `setup.md` is the file 2.0 puts at the root of every business.
 */
const MARKERS_20 = { files: ['setup.md'], dirs: ['brain', 'work', '.snapshots', '.state'] };

/** Markers of a 0.1 INSTALL root rather than one of its businesses. */
const MARKERS_INSTALL_01 = { files: ['ONBOARDING.md', 'UPDATE.md'], dirs: ['system/business-template'] };

const hasFile = (root, rel) => {
  try { return fs.statSync(path.join(root, ...rel.split('/'))).isFile(); } catch (_) { return false; }
};
const hasDir = (root, rel) => {
  try { return fs.statSync(path.join(root, ...rel.split('/'))).isDirectory(); } catch (_) { return false; }
};

/**
 * detect(dir) -> { kind, why }
 *   kind: 'business-0.1' | 'install-0.1' | 'business-2.0' | 'unknown'
 *
 * The version string is deliberately never consulted. See the header.
 */
function detect(dir) {
  const twenty = MARKERS_20.files.filter((f) => hasFile(dir, f))
    .concat(MARKERS_20.dirs.filter((d) => hasDir(dir, d)));
  if (twenty.length) {
    return { kind: 'business-2.0', why: 'it has ' + twenty.join(', ') + ', which is what GrowOS 2.0 makes' };
  }
  const installish = MARKERS_INSTALL_01.files.filter((f) => hasFile(dir, f))
    .concat(MARKERS_INSTALL_01.dirs.filter((d) => hasDir(dir, d)));
  if (installish.length) {
    return { kind: 'install-0.1', why: 'it has ' + installish.join(', ') + ', so it is a whole 0.1 folder' };
  }
  const found = MARKERS_01.files.filter((f) => hasFile(dir, f))
    .concat(MARKERS_01.dirs.filter((d) => hasDir(dir, d)));
  if (found.length >= 2) return { kind: 'business-0.1', why: 'it has ' + found.join(', ') };
  return {
    kind: 'unknown',
    why: found.length
      ? 'the only thing in it that looks like GrowOS 0.1 is ' + found.join(', ')
      : 'nothing in it looks like a GrowOS 0.1 business',
  };
}

/** The business folders inside a 0.1 install root, for a helpful refusal. */
function businessesInside(dir) {
  let entries = [];
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch (_) { return []; }
  return entries
    .filter((d) => d.isDirectory() && !d.name.startsWith('.') && d.name !== 'system')
    .filter((d) => detect(path.join(dir, d.name)).kind === 'business-0.1')
    .map((d) => d.name)
    .sort();
}

/** Every file under `dir`, POSIX-relative, sorted. Throws on an unreadable folder. */
function sourceFiles(dir, rel) {
  const out = [];
  let dirents;
  try {
    dirents = fs.readdirSync(path.join(dir, ...(rel ? rel.split('/') : [])), { withFileTypes: true });
  } catch (err) {
    throw new Error('could not read ' + (rel || 'the folder') + ': ' + (err && err.message ? err.message : String(err)));
  }
  for (const d of dirents.slice().sort((a, b) => (a.name < b.name ? -1 : 1))) {
    if (paths.isAmbientLitter(d.name)) continue;
    const childRel = rel ? rel + '/' + d.name : d.name;
    if (d.isDirectory()) { out.push(...sourceFiles(dir, childRel)); continue; }
    if (!d.isFile()) continue;    // a symlink is not content we will follow
    out.push(childRel);
  }
  return out;
}

/** A stable identity for a source folder: its file list and their bytes. */
function fingerprint(dir, files) {
  const parts = files.map((rel) =>
    rel + ':' + ops.hashBytes(fs.readFileSync(path.join(dir, ...rel.split('/')))));
  return ops.hashBytes(parts.join('\n'));
}

/** A filename-safe version of a 0.1 relative path, for a flat destination. */
function flatten(rel) {
  return rel.replace(/[\\/]/g, '-').replace(/[^A-Za-z0-9._-]+/g, '-').replace(/^-+|-+$/g, '');
}

/**
 * Where one 0.1 file goes. Returns a POSIX path relative to the business, or
 * null when the mapper has no opinion (it still gets archived).
 *
 * `stamp` is the import date, used to keep inbox drops sortable and distinct.
 */
function destinationFor(rel, text, stamp) {
  const seg = rel.split('/');
  const top = seg[0];
  const base = seg[seg.length - 1];

  if (rel === 'research' || top === 'research') return 'brain/research/' + seg.slice(1).join('/');
  if (top === 'uploads') return 'brain/assets/' + seg.slice(1).join('/');
  // What 0.1 collected is learned material, and ⟳ amendment 2 says that lives in
  // the business, never anywhere shared (Build Doc P3.3).
  if (top === 'swipe-files' || top === 'inspiration') return 'library/' + seg.slice(1).join('/');
  if (rel === 'lessons.md') return 'brain/lessons/0.1-lessons.md';

  if (top === 'output') {
    // The one place a status can be known, and only when the file says so.
    const status = text === null ? undefined : fm.getField(text, 'status');
    if (status === 'published') return 'brain/samples/' + flatten(seg.slice(1).join('/'));
    return 'brain/inbox/' + stamp + '-0.1-' + flatten(seg.slice(1).join('/'));
  }
  if (top === 'audiences') return 'brain/inbox/' + stamp + '-0.1-audience-' + flatten(seg.slice(1).join('/'));
  if (rel === 'brand.md') return 'brain/inbox/' + stamp + '-0.1-brand.md';
  if (rel === 'content-ideas.md') return 'brain/inbox/' + stamp + '-0.1-content-ideas.md';

  // Anything else the mapper has never seen. It is archived like everything
  // else; putting it in the inbox as well keeps it visible rather than buried.
  return 'brain/inbox/' + stamp + '-0.1-' + flatten(rel);
}

/** Today, as YYYY-MM-DD, for the archive folder and inbox drop names. */
function today() {
  return new Date().toISOString().slice(0, 10);
}

/**
 * plan(root, fromDir, business, stamp) -> { ok, errors, operations, manifest, ... }
 * Pure computation. Nothing is written.
 */
function plan(root, fromDir, business, stamp) {
  const errors = [];
  const fail = () => ({ ok: false, errors, operations: [], manifest: [] });

  const src = path.resolve(String(fromDir));

  // Machinery is never a source. The real failure this guards against was found
  // in a delivered install: a system/business-template that had absorbed a
  // client's private research. Reading FROM the machine set would either import
  // our own templates as if they were the customer's writing, or carry that
  // contamination straight into a business folder.
  //
  // BOTH sides are resolved through the filesystem, and the relative path is
  // computed from the RESOLVED pair. Mixing the two is a real bug and it was in
  // here: the containment test used realpaths while the classification used the
  // lexical paths, so on macOS — where the install sits under /var, a symlink to
  // /private/var — `path.relative` produced a `..`-escaping string, the machine
  // check quietly returned false, and a contaminated `system/business-template/`
  // imported cleanly into a business folder. Same class as Phase 2's recurring
  // "a NAME is not a DESTINATION": resolve once, then judge what you resolved.
  const rootReal = paths.realpathBestEffort(path.resolve(String(root)));
  const srcReal = paths.realpathBestEffort(src);
  if (srcReal === rootReal || srcReal.indexOf(rootReal + path.sep) === 0) {
    const rel = paths.toPosix(path.relative(rootReal, srcReal));
    if (rel === '' || paths.isMachinePath(rootReal, rel)) {
      errors.push('"' + fromDir + '" is part of GrowOS itself, not a business. Machinery is never a source: ' +
        'importing from it would either copy our own templates in as if they were your writing, or carry ' +
        'whatever has ended up in there into a business folder.');
      return fail();
    }
  }

  let stat;
  try { stat = fs.statSync(src); } catch (err) {
    errors.push('Could not open "' + fromDir + '": ' + (err && err.message ? err.message : String(err)) + '.');
    return fail();
  }
  if (!stat.isDirectory()) {
    errors.push('"' + fromDir + '" is not a folder.');
    return fail();
  }

  const shape = detect(src);
  if (shape.kind === 'business-2.0') {
    errors.push('"' + fromDir + '" is already a GrowOS 2.0 business — ' + shape.why + '. ' +
      'There is nothing to import; 2.0 folders are used as they are.');
    return fail();
  }
  if (shape.kind === 'install-0.1') {
    const inside = businessesInside(src);
    errors.push('"' + fromDir + '" is a whole GrowOS 0.1 folder, not one of its businesses (' + shape.why + '). ' +
      (inside.length
        ? 'Point --from at one of the business folders inside it: ' + inside.join(', ') + '.'
        : 'No business folders were found inside it.'));
    return fail();
  }
  if (shape.kind !== 'business-0.1') {
    errors.push('"' + fromDir + '" does not look like a GrowOS 0.1 business — ' + shape.why + '. ' +
      'A 0.1 business has an omnibus brand.md and folders like audiences/ and output/. ' +
      'Nothing was read. (The version file is deliberately ignored: every real 0.1 install says 2.0.0.)');
    return fail();
  }

  let files;
  try { files = sourceFiles(src, ''); } catch (err) {
    errors.push((err && err.message ? err.message : String(err)) + ' Nothing was read.');
    return fail();
  }
  if (files.length === 0) {
    errors.push('"' + fromDir + '" has no files in it.');
    return fail();
  }

  const identity = fingerprint(src, files);

  // Already done? A completed import leaves a receipt carrying the source's
  // fingerprint. This is what stops a folder that will ALWAYS look like 0.1 from
  // being imported a second time.
  const legacyDir = path.join(String(root), business, LEGACY);
  let already = null;
  try {
    for (const d of fs.readdirSync(legacyDir)) {
      let receipt;
      try { receipt = JSON.parse(fs.readFileSync(path.join(legacyDir, d, 'import.json'), 'utf8')); } catch (_) { continue; }
      if (receipt && receipt.fingerprint === identity) { already = { when: d, receipt }; break; }
    }
  } catch (_) { /* no archive yet */ }
  if (already) {
    return { ok: true, errors: [], operations: [], manifest: [], already, identity, files };
  }

  /* ---- the manifest: every file, and where it lands ---- */
  const operations = [];
  const manifest = [];
  const resumed = [];              // already present, byte-identical: a killed run
  const archiveBase = LEGACY + '/' + stamp + '/original';
  const takenKeys = new Map();     // sameFileKey -> the rel that claimed it

  for (const rel of files) {
    const abs = path.join(src, ...rel.split('/'));
    let bytes;
    try { bytes = fs.readFileSync(abs); } catch (err) {
      errors.push(rel + ' could not be read: ' + (err && err.message ? err.message : String(err)) + '.');
      continue;
    }
    // Only decode when it round-trips; a binary upload must not be mangled by a
    // status lookup, and a file that is not text simply has no status.
    const isText = Buffer.compare(Buffer.from(bytes.toString('utf8'), 'utf8'), bytes) === 0;
    const dest = destinationFor(rel, isText ? bytes.toString('utf8') : null, stamp);

    // The archive copy: byte-for-byte, whatever the mapper decided.
    const archiveRel = archiveBase + '/' + rel;
    for (const [target, what] of [[dest, 'imported'], [archiveRel, 'archived']]) {
      const problem = ops.pathProblem(target);
      if (problem) {
        errors.push(rel + ' cannot be placed (' + what + '): ' + problem + '.');
        continue;
      }
      const key = ops.sameFileKey(target);
      if (takenKeys.has(key)) {
        errors.push(rel + ' and ' + takenKeys.get(key) + ' would both become ' + target +
          '. Rename one of them in the old folder first.');
        continue;
      }
      takenKeys.set(key, rel);
      const destAbs = path.join(String(root), business, ...target.split('/'));
      if (fs.existsSync(destAbs)) {
        // Byte-identical means a previous run already put it there — an import
        // whose PROCESS was killed leaves exactly this: files written, no
        // receipt, so the identity check above cannot see it. Skipping what is
        // provably already correct makes an interrupted import resumable by
        // running the same command again. It is not a guess: the bytes match.
        let same = false;
        try { same = ops.hashFileOrAbsent(destAbs) === ops.hashBytes(bytes); } catch (_) { same = false; }
        if (same) { resumed.push(business + '/' + target); continue; }
        errors.push(business + '/' + target + ' already exists and is not what would be imported, ' +
          'so nothing was imported. Look at both copies and move the one you want out of the way first.');
        continue;
      }
      operations.push({ business, path: target, verb: 'create', expect: ops.ABSENT, bytes });
    }
    manifest.push({ from: rel, to: dest, bytes: bytes.length });
  }
  if (errors.length) return fail();

  // The receipt. Written with the job, so an import that half-applied cannot
  // leave an identity claiming it finished.
  operations.push({
    business,
    path: LEGACY + '/' + stamp + '/import.json',
    verb: 'create',
    expect: ops.ABSENT,
    bytes: JSON.stringify({
      version: 1,
      from: src,
      business,
      when: stamp,
      files: files.length,
      fingerprint: identity,
      note: 'Everything from the old folder is under original/, byte for byte. ' +
        'Nothing here claims a file was ever published.',
    }, null, 2) + '\n',
  });

  return { ok: true, errors: [], operations, manifest, identity, files, stamp, resumed };
}

async function run(args, ctx) {
  const reporter = makeReporter({ json: ctx.flags && ctx.flags.json });

  if (!ctx.root) {
    reporter.red('Could not find your GrowOS folder', 'There is no system/VERSION at or above where this ran.');
    reporter.print();
    return 2;
  }
  const root = ctx.root;
  const from = ctx.flags && ctx.flags.from;
  const businessName = ctx.flags && ctx.flags.business;

  if (!from || !businessName) {
    reporter.red('Import needs a folder and a business name',
      'It reads a GrowOS 0.1 business folder into a business here. Your old folder is never changed.',
      'Run: node system/tools/growos.js import --from "<your old GrowOS folder>/<business>" --business "Your Business"');
    reporter.print();
    return 2;
  }

  // The destination business, created if it is not there yet — importing into a
  // business that does not exist is the ordinary case for someone arriving from
  // 0.1, and making them run setup first would be a step for no reason.
  const setup = require('./cmd-setup.js');
  const slug = setup.slugify(String(businessName));
  if (slug === '') {
    reporter.red('That business name cannot be used as a folder',
      '"' + businessName + '" has no letters or numbers in it.');
    reporter.print();
    return 2;
  }
  const stamp = today();

  let planned;
  try {
    planned = plan(root, String(from), slug, stamp);
  } catch (err) {
    reporter.red('Could not work out what to import', err && err.message ? err.message : String(err),
      'Nothing was changed.');
    reporter.print();
    return 2;
  }

  if (!planned.ok) {
    for (const e of planned.errors) reporter.red('Nothing was imported', e, 'Sort that out, then run it again.');
    reporter.print();
    return 2;
  }

  if (planned.already) {
    reporter.green('That folder has already been imported',
      'It came in on ' + planned.already.when + ' (' + planned.already.receipt.files + ' files), and nothing in it ' +
      'has changed since. Importing again would give you two of everything.',
      'The originals are in ' + slug + '/' + LEGACY + '/' + planned.already.when + '/original/.');
    reporter.print();
    return 0;
  }

  const lines = planned.manifest.map((m) => m.from + ' -> ' + m.to);
  const summary = planned.files.length + ' file(s) from "' + from + '"';

  if (!(ctx.flags && ctx.flags.yes)) {
    reporter.yellow('There is work waiting: ' + summary,
      lines.join(' | '),
      'Nothing was changed, and your old folder is never written to. ' +
      'To do it: node system/tools/growos.js import --from "' + from + '" --business "' + businessName + '" --yes');
    reporter.print();
    return reporter.exitCode();
  }

  // The destination business must exist before the runner will write into it —
  // it resolves every operation through the validated business list, and a
  // folder that is not there yet is not on it.
  //
  // Made from the template directly rather than by calling setup's run(): that
  // also mirrors, wires Codex and folds in every Doctor finding, so its exit
  // code goes red for things that have nothing to do with whether the folder
  // exists. An import that refused because of an unrelated warning elsewhere in
  // the install would be a refusal of real work.
  let madeBusiness = false;
  if (!fs.existsSync(path.join(root, slug))) {
    try {
      setup.copyTreeSkipExisting(path.join(root, 'system', 'templates', 'business'), path.join(root, slug));
      madeBusiness = true;
    } catch (err) {
      reporter.red('Could not create the business to import into',
        'Making "' + slug + '" from the template failed: ' + (err && err.message ? err.message : String(err)) + '.',
        'Check folder permissions, then run it again.');
      reporter.print();
      return 2;
    }
    if (!fs.existsSync(path.join(root, slug))) {
      reporter.red('Could not create the business to import into',
        '"' + slug + '" is still not there, so nothing was imported.');
      reporter.print();
      return 2;
    }
    // The plan was computed against a business that did not exist; recompute so
    // the collision checks see the template files that now do.
    try {
      planned = plan(root, String(from), slug, stamp);
    } catch (err) {
      reporter.red('Could not work out what to import', err && err.message ? err.message : String(err));
      reporter.print();
      return 2;
    }
    if (!planned.ok) {
      for (const e of planned.errors) reporter.red('Nothing was imported', e, 'Sort that out, then run it again.');
      reporter.print();
      return 2;
    }
  }

  const result = ops.applyJob(root, planned.operations, { name: 'import' });
  if (!result.ok) {
    for (const e of result.errors) reporter.red('Nothing was imported', e.reason, 'Check that, then run it again.');
    reporter.print();
    return 2;
  }

  /* ---- verify: every source file is in the archive, byte for byte ----
   *
   * NOTHING IS BOUND TO THIS, and it is better to say so than to leave a reader
   * assuming a test proves it. It re-reads what was just written and compares it
   * to the source, so the only things it can catch are storage-level: a
   * truncated write, a disk error, a sync client mangling the copy mid-run. The
   * bench cannot produce any of those without mocking the filesystem, which it
   * deliberately does not do. It stays because this is the step that lets the
   * owner delete their old folder, and "we checked" should mean it. */
  const missing = [];
  const wrong = [];
  for (const rel of planned.files) {
    const kept = path.join(root, slug, LEGACY, stamp, 'original', ...rel.split('/'));
    let bytes;
    try { bytes = fs.readFileSync(kept); } catch (_) { missing.push(rel); continue; }
    if (ops.hashBytes(bytes) !== ops.hashBytes(fs.readFileSync(path.join(path.resolve(String(from)), ...rel.split('/'))))) {
      wrong.push(rel);
    }
  }
  if (missing.length || wrong.length) {
    reporter.red('The copy could not be verified',
      (missing.length ? missing.length + ' file(s) are not in the archive. ' : '') +
      (wrong.length ? wrong.length + ' file(s) do not match the original. ' : '') +
      'Your old folder is untouched, so nothing is lost — but do not delete it.',
      'The originals are still where they always were: ' + from);
    reporter.print();
    return 2;
  }

  reporter.green('Imported ' + summary,
    lines.join(' | '),
    'Every one of those ' + planned.files.length + ' files is also kept byte-for-byte in ' +
    slug + '/' + LEGACY + '/' + stamp + '/original/, and your old folder was not touched. ' +
    'Nothing was filed as published unless it said so itself; the rest is in brain/inbox/ for you to sort ' +
    'through with GrowOS.');
  reporter.print();
  return reporter.exitCode();
}

module.exports = {
  name: 'import',
  summary: 'Bring a GrowOS 0.1 business into this install, losslessly and without guessing.',
  run,
  plan,
  detect,
  destinationFor,
  LEGACY,
};
