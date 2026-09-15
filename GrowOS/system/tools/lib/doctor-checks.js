'use strict';

/**
 * doctor-checks.js - the twelve health checks (SPEC section 6.2).
 *
 * Each check is one async function returning a section:
 *   { key, title, findings: [ { level, title, detail, fix } ] }
 * where level is 'green' | 'yellow' | 'red' (report.js levels). runChecks runs
 * all twelve in order and returns { sections, manifestDiff } so cmd-doctor can
 * build the reporter, and (with --report) write a privacy-safe support report.
 *
 * A check must never throw: anything unexpected becomes a plain finding so the
 * Doctor always finishes and tells the owner something useful.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const fm = require('./fm.js');
const ids = require('./ids.js');
const paths = require('./paths.js');
const logbook = require('./logbook.js');
const manifest = require('./manifest.js');
const codexTrust = require('./codex-trust.js');

const LEGAL_STATUSES = ['draft', 'review', 'changes', 'approved', 'published', 'rejected'];
const CHARTER_FILES = ['AGENTS.md', 'CLAUDE.md', 'START HERE.md', 'GrowOS Queue.base'];

// The machine set as compareManifest coveredRoots: the exact SPEC section 1
// dirs/files, so the walk never strays into customer content (e.g. it covers
// system/creative-library but NOT a business's own library/).
const MACHINE_COVERED_ROOTS = [
  'system', '.claude', '.codex', '.agents', '.obsidian',
  'START HERE.md', 'AGENTS.md', 'CLAUDE.md', 'GrowOS Queue.base',
];

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * The brain contract, as the Doctor enforces it (system/standards/brain-contract.md).
 *
 * Exported because three places have to agree about it — this list, the shipped
 * business template, and the contract document — and any two of them can drift
 * apart in silence. `_dev/tests/brain-schema.test.js` holds them together.
 *
 * Every knowledge type is a FILE with placeholders, never an empty folder. In all
 * fourteen real 0.1 installs the templated files were richly filled in and every
 * empty directory rotted, so a folder here always ships a README as well.
 */
const REQUIRED_BRAIN_FILES = [
  'brain/business.md',
  'brain/audience.md',
  'brain/voice.md',
  'brain/brand.md',
  'brain/plan.md',
  'brain/decisions.md',
  'brain/competitors.md',
  'brain/methodology.md',
  'brain/ideas.md',
  'brain/compliance.md',
  'brain/memory/MEMORY.md',
  'brain/assets/index.md',
  'brain/samples/index.md',
  'brain/research/index.md',
  // Not brain files, but required parts of a business folder by the same contract.
  'setup.md',
  'work/README.md',
  'add-to-brain/README.md',
];
const REQUIRED_BRAIN_DIRS = [
  'brain/proof',
  'brain/stories',
  'brain/lessons',
  'brain/inbox',
  'brain/samples',
  'brain/research',
  'brain/assets',
];

/**
 * Every foldered kind carries its own explainer, and the explainer is required.
 * Without this, deleting `brain/assets/README.md` broke nothing: `index.md` kept
 * the folder non-empty and no check ever asked for the documentation.
 */
const REQUIRED_BRAIN_READMES = REQUIRED_BRAIN_DIRS.slice();

/**
 * True because checkBrainUpkeep really does compare the files in `brain/assets/`
 * against the names written in `assets/index.md`. The assets README tells the
 * owner the Doctor will mention an undescribed file; this flag is what a test
 * uses to hold that promise to the code rather than to prose.
 */
const CHECKS_UNINDEXED_ASSETS = true;

// How long something may sit in brain/inbox/ before the Doctor mentions it. The
// inbox is a drop folder, not an archive — in the real 0.1 installs the
// equivalent folder filled up and was never drained, so the knowledge people
// dropped in never became knowledge the system could use.
const INBOX_STALE_DAYS = 14;

/* ------------------------------- helpers -------------------------------- */

function existsFile(p) {
  try { return fs.statSync(p).isFile(); } catch (_) { return false; }
}
function existsDir(p) {
  try { return fs.statSync(p).isDirectory(); } catch (_) { return false; }
}
function section(key, title, findings) {
  return { key, title, findings: findings || [] };
}
function finding(level, title, detail, fix) {
  return { level, title, detail: detail || '', fix: fix || '' };
}

/** Recursively list files under a dir, skipping heavy/irrelevant trees. */
function walkAll(root) {
  // _quarantine holds files the owner already set aside; never re-scan (and so
  // never re-quarantine) them. .git/_dev/dist/node_modules are dev/tooling noise.
  const skipTop = new Set(['.git', '_dev', 'dist', 'node_modules', '_quarantine']);
  const out = [];
  const walk = (dir, rel, depth) => {
    let dirents;
    try {
      dirents = fs.readdirSync(dir, { withFileTypes: true });
    } catch (_) {
      return;
    }
    for (const d of dirents) {
      const childRel = rel === '' ? d.name : rel + '/' + d.name;
      if (depth === 0 && skipTop.has(d.name)) continue;
      const abs = path.join(dir, d.name);
      const isDir = d.isDirectory();
      out.push({ abs, rel: childRel, name: d.name, isDir });
      if (isDir) walk(abs, childRel, depth + 1);
    }
  };
  walk(String(root), '', 0);
  return out;
}

/** Read + parse every work item across the install, grouped by business. */
function collectItems(root) {
  const byBusiness = {};
  let businesses = [];
  try { businesses = paths.listBusinesses(root); } catch (_) { businesses = []; }
  for (const business of businesses) {
    const items = [];
    const workDir = path.join(root, business, 'work');
    for (const entry of walkAll(workDir)) {
      if (entry.isDir) continue;
      if (!/\.md$/i.test(entry.name)) continue;
      // The ONE definition of "under work/ but not an item" (paths.isWorkSidecar,
      // Build Doc P4.1): underscore parts folders, underscore briefs, and the
      // shipped work/README.md. Filtered HERE so every check downstream —
      // including the no-label red — is asking about real items only.
      if (!paths.isWorkItem(root, business + '/work/' + entry.rel)) continue;
      // An item that is a LINK is not an item: every read
      // follows the link, so a live "item" pointing at its own approved
      // snapshot would vouch for itself through every later comparison. Named
      // red before anything downstream trusts its bytes.
      try {
        if (fs.lstatSync(entry.abs, { bigint: true }).isSymbolicLink()) {
          items.push({ abs: entry.abs, rel: business + '/work/' + entry.rel, unreadable: false, linked: true, hasFm: false });
          continue;
        }
      } catch (_) { /* fall through to the read below, which reports unreadable */ }
      let content = null;
      let mtimeMs = 0;
      try {
        content = fs.readFileSync(entry.abs, 'utf8');
        mtimeMs = fs.statSync(entry.abs).mtimeMs;
      } catch (_) {
        items.push({ abs: entry.abs, rel: business + '/work/' + entry.rel, unreadable: true });
        continue;
      }
      const parsed = fm.parse(content);
      items.push({
        abs: entry.abs,
        rel: business + '/work/' + entry.rel,
        unreadable: false,
        hasFm: parsed.hasFm,
        id: fm.getField(content, 'id'),
        status: fm.getField(content, 'status'),
        type: fm.getField(content, 'type'),
        created: fm.getField(content, 'created'),
        // Present for a block list too (fm reads those as '') — undefined means
        // the deliverable seals nothing, which is the ordinary case.
        sealedPresent: fm.getField(content, 'sealed') !== undefined,
        mtimeMs,
      });
    }
    byBusiness[business] = items;
  }
  return byBusiness;
}

// "Not an item" is paths.isWorkSidecar / paths.isWorkItem — one definition,
// consulted in collectItems above. The Doctor keeping its own copy is how it
// and a data job ended up disagreeing about what an item is (restamp refusing
// to run on every real install was exactly that bug).

/* ------------------------------- check 1 -------------------------------- */

async function checkNode() {
  const major = parseInt(String(process.versions.node).split('.')[0], 10);
  if (major >= 18) {
    return section('node', 'Node version', [finding('green', 'Node ' + process.versions.node + ' is new enough')]);
  }
  return section('node', 'Node version', [finding('red',
    'Node ' + process.versions.node + ' is too old',
    'GrowOS needs Node 18 or newer.',
    'Install Node 18+ from nodejs.org, then try again.')]);
}

/* ------------------------------- check 2 -------------------------------- */

async function checkFolders(ctx) {
  const root = ctx.root;
  const findings = [];

  // Core structure.
  const missingCore = [];
  if (!existsDir(path.join(root, 'system'))) missingCore.push('system/');
  if (!existsFile(path.join(root, 'system', 'VERSION'))) missingCore.push('system/VERSION');
  if (!existsDir(path.join(root, 'system', 'creative-library'))) missingCore.push('system/creative-library/');
  if (missingCore.length) {
    findings.push(finding('red', 'A core GrowOS folder is missing', missingCore.join(', '),
      'Re-download the product zip; your business folders are safe to carry over.'));
  }

  // Every business has brain/, work/, setup.md.
  let businesses = [];
  try { businesses = paths.listBusinesses(root); } catch (_) { businesses = []; }
  const gaps = [];
  for (const b of businesses) {
    const need = [];
    if (!existsDir(path.join(root, b, 'brain'))) need.push('brain/');
    if (!existsDir(path.join(root, b, 'work'))) need.push('work/');
    if (!existsFile(path.join(root, b, 'setup.md'))) need.push('setup.md');
    if (need.length) gaps.push(b + ' (missing ' + need.join(', ') + ')');
  }
  if (gaps.length) {
    findings.push(finding('red', 'A business folder is missing required parts', gaps.join('; '),
      'Run: node system/tools/growos.js setup --business "<name>" to rebuild the missing parts.'));
  }

  // Brain Contract: every business's required brain files exist and are non-empty,
  // and the required brain subfolders exist. Yellow, not red — a
  // customer mid-onboarding may still be filling these in.
  const BRAIN_FILES = REQUIRED_BRAIN_FILES;
  const BRAIN_DIRS = REQUIRED_BRAIN_DIRS;
  const brainGaps = [];
  for (const b of businesses) {
    for (const rel of BRAIN_FILES) {
      const p = path.join(root, b, ...rel.split('/'));
      let size = -1;
      try { const st = fs.statSync(p); size = st.isFile() ? st.size : -1; } catch (_) { size = -1; }
      if (size <= 0) brainGaps.push(b + '/' + rel);
    }
    for (const rel of BRAIN_DIRS) {
      if (!existsDir(path.join(root, b, ...rel.split('/')))) brainGaps.push(b + '/' + rel + '/');
    }
    // Each foldered kind carries its own explainer. Without requiring it, deleting
    // brain/assets/README.md broke nothing — index.md kept the folder non-empty
    // and no check ever asked for the documentation.
    for (const rel of REQUIRED_BRAIN_READMES) {
      const p = path.join(root, b, ...rel.split('/'), 'README.md');
      let size = -1;
      try { const st = fs.statSync(p); size = st.isFile() ? st.size : -1; } catch (_) { size = -1; }
      if (size <= 0) brainGaps.push(b + '/' + rel + '/README.md');
    }
  }
  if (brainGaps.length) {
    findings.push(finding('yellow', 'A brain file is missing or empty', brainGaps.join(', '),
      'The system fills these during setup - run setup, or open the file and fill it in.'));
  }

  // Sections this version ships that a business's own files do not have yet
  // (Build Doc P3.1). A customer who set up before a release has files that are
  // present and non-empty, so every check above is satisfied while they are
  // missing most of what that release added — the Doctor said green and the
  // owner had no way to know. This asks cmd-backfill for its OWN plan rather
  // than re-deriving it, so the report and the command can never disagree about
  // what is missing. Yellow: nothing is broken, there is just work waiting.
  try {
    const backfill = require('./cmd-backfill.js');
    const pending = backfill.plan(root, businesses);
    const toFill = pending.operations.filter((o) => o.verb === 'replace');
    if (toFill.length) {
      findings.push(finding('yellow',
        'Some files are missing sections this version ships',
        pending.notes.filter((n) => n.indexOf(' — new file') === -1).join('; '),
        'Preview it with: node system/tools/growos.js backfill   (then add --yes to apply)'));
    }
    // A file backfill could not read is invisible to every check above — it
    // exists and is non-empty, so nothing complains — and it was the only thing
    // standing between a business and being up to date. Reporting the count
    // alone would be no better: the owner needs the path to go and look.
    if (pending.skipped.length) {
      findings.push(finding('yellow',
        'Some files could not be checked for missing sections',
        pending.skipped.join('; '),
        'Open each one and fix what is wrong with it, then run: node system/tools/growos.js backfill'));
    }
  } catch (err) {
    findings.push(finding('yellow', 'Could not check for missing sections',
      err && err.message ? err.message : String(err),
      'Run: node system/tools/growos.js backfill'));
  }

  // A business whose items carry a different name than its folder (Build Doc
  // P3.2). This is not cosmetic: `business` is frozen AND the guard denies any
  // write whose business disagrees with its folder, so every item in that
  // business is unsaveable until it is corrected. Red, with the exact command.
  //
  // It NEVER guesses. With one old spelling the command can be printed in full;
  // with several there is no single --from, and inventing one would be the guess
  // this whole design refuses — so the finding names the spellings and stops.
  // Asks cmd-restamp for the answer rather than deriving a second opinion.
  try {
    const restamp = require('./cmd-restamp.js');
    for (const m of restamp.mismatches(root)) {
      const one = m.names.length === 1 ? m.names[0] : null;
      findings.push(finding('red',
        'Work in "' + m.business + '" does not match its folder name',
        m.items + ' item(s) say ' + m.names.map((n) => '"' + n + '"').join(' or ') +
          ', but they sit in "' + m.business + '". Until that agrees, none of them can be saved.',
        one
          ? 'Run: node system/tools/growos.js restamp --from "' + one + '" --to "' + m.business + '"'
          : 'The items disagree among themselves (' + m.names.join(', ') + '), so there is no single old ' +
            'name to correct. Open them and settle on one, then run restamp.'));
    }
  } catch (err) {
    findings.push(finding('yellow', 'Could not check the business names on your work',
      err && err.message ? err.message : String(err),
      'Run: node system/tools/growos.js doctor again.'));
  }

  // Learned material still sitting in the retired install-wide library (Build
  // Doc P3.3, ⟳ Requirements amendment 2). Anything in there is readable by
  // EVERY business, which is the one thing the per-business design exists to
  // prevent — so it is reported until it is moved. The old folder's own README
  // does not count only while it is byte-for-byte the explainer we shipped
  // (cmd-libraries recognises those exact bytes); one the owner has written in
  // is their material and is reported like anything else.
  try {
    const libraries = require('./cmd-libraries.js');
    const left = libraries.leftovers(root);
    if (left.length) {
      findings.push(finding('yellow',
        'Learned material sits where every business can read it',
        left.length + ' file(s) in ' + libraries.OLD_ROOT + '/: ' + left.join(', ') +
          '. What one business learns should stay in that business.',
        'Preview the move with: node system/tools/growos.js libraries   (then add --yes to apply)'));
    }
  } catch (err) {
    findings.push(finding('yellow', 'Could not check the shared library',
      err && err.message ? err.message : String(err),
      'Run: node system/tools/growos.js libraries'));
  }

  // .growos writable (probe write + delete).
  try {
    const probe = path.join(root, '.growos', 'tmp', '.doctor-probe-' + Math.random().toString(36).slice(2));
    fs.mkdirSync(path.dirname(probe), { recursive: true });
    fs.writeFileSync(probe, 'ok');
    fs.rmSync(probe, { force: true });
  } catch (err) {
    findings.push(finding('red', 'The .growos state folder is not writable', err.message,
      'Check folder permissions on .growos, or move the GrowOS folder out of a read-only location.'));
  }

  if (findings.length === 0) {
    findings.push(finding('green', 'Folders look right',
      businesses.length + ' business folder(s) checked; the state folder is writable.'));
  }
  return section('folders', 'Folder shape', findings);
}

/* ------------------------------- check 3 -------------------------------- */

async function checkCharter(ctx) {
  const missing = CHARTER_FILES.filter((f) => !existsFile(path.join(ctx.root, f)));
  if (missing.length === 0) {
    return section('charter', 'Charter files', [finding('green', 'The charter files are all here')]);
  }
  return section('charter', 'Charter files', [finding('red',
    'A charter file is missing', missing.join(', '),
    'Re-download the product zip; your business folders are safe to carry over.')]);
}

/* ------------------------------- check 4 -------------------------------- */

/**
 * Any machine file or folder that is really a symbolic link, top down. GrowOS
 * never creates one, and a linked machine folder makes every path check lie:
 * the NAME is machinery, the DESTINATION is wherever the link points — which is
 * why update, repair and rollback all refuse outright when they find one. This
 * is the detective half of that; without it the owner only learns when an
 * update stops. Walks the machine roots and reports the link itself, not the
 * files beneath it (which would be one finding per file, all the same fault).
 */
function symlinkedMachinePaths(root) {
  const found = [];
  const visit = (relPosix) => {
    const abs = path.join(root, ...relPosix.split('/'));
    let lst = null;
    try { lst = fs.lstatSync(abs); } catch (_e) { return; }
    if (lst.isSymbolicLink()) { found.push(relPosix); return; } // do not descend
    if (!lst.isDirectory()) return;
    let ents = [];
    try { ents = fs.readdirSync(abs, { withFileTypes: true }); } catch (_e) { return; }
    for (const e of ents) visit(relPosix + '/' + e.name);
  };
  for (const rel of MACHINE_COVERED_ROOTS) visit(rel);
  return found;
}

async function checkMachineIntegrity(ctx) {
  const root = ctx.root;
  const linkedMachine = symlinkedMachinePaths(root);
  if (linkedMachine.length) {
    // Reported BEFORE the manifest comparison, and on its own: a linked folder
    // makes the comparison meaningless (it hashes whatever is on the other end),
    // so a list of "changed files" here would send the owner chasing the wrong
    // thing entirely.
    return {
      section: section('machine', 'Machine integrity', [finding('red',
        'A GrowOS folder or file is a symbolic link to somewhere else',
        linkedMachine.join(', '),
        'GrowOS never makes these. Until it is removed, updates and repairs will refuse rather than write through it. If you did not create it, ask us before changing anything.')]),
      diff: null,
    };
  }
  const manifestPath = path.join(root, 'system', 'manifest.json');
  if (!existsFile(manifestPath)) {
    return {
      section: section('machine', 'Machine integrity', [finding('yellow',
        'The file list is not built yet (dev install)',
        'system/manifest.json is missing, so file integrity cannot be verified. This is normal before the first packaged release.')]),
      diff: null,
    };
  }

  let manifestObj;
  try {
    manifestObj = manifest.loadManifest(manifestPath);
  } catch (err) {
    return {
      section: section('machine', 'Machine integrity', [finding('red',
        'The file list is unreadable', err.message,
        'Run: node system/tools/growos.js repair')]),
      diff: null,
    };
  }

  let cmp;
  try {
    cmp = await manifest.compareManifest(root, manifestObj, MACHINE_COVERED_ROOTS);
  } catch (err) {
    return {
      section: section('machine', 'Machine integrity', [finding('red',
        'Could not check the GrowOS files', err.message, 'Run: node system/tools/growos.js repair')]),
      diff: null,
    };
  }

  // Obsidian rewrites its own runtime files (workspace layout, caches) the moment
  // the owner opens the vault - which the product encourages. Those are never in
  // the shipped manifest, so exempt them from changed/extra or check 4 would
  // false-yellow for essentially every Obsidian user, training them to ignore the
  // one check that catches real tampering.
  const isObsidianRuntime = (p) => /^\.obsidian\/(workspace.*\.json|.*\.json\.tmp|cache)$/.test(p) || p === '.obsidian/workspace';
  const changed = cmp.changed.filter((p) => !isObsidianRuntime(p));
  const findings = [];
  if (cmp.missing.length) {
    findings.push(finding('red', 'Some GrowOS files are missing or damaged',
      cmp.missing.join(', '), 'Run: node system/tools/growos.js repair'));
  }
  if (changed.length) {
    findings.push(finding('yellow', 'You changed some GrowOS files',
      changed.join(', '),
      'That is fine - an update installs the new version and keeps your version safe in .backups/customizations, and tells you where.'));
  }
  // Never report as "extra": the manifest itself (cannot hold its own hash), the
  // per-install .codex wiring (generated by setup), Obsidian's runtime files, or
  // a customer-machine-local file (e.g. .claude/settings.local.json) that no
  // shipped package ever names and that belongs to the install, not the product.
  const extra = cmp.extra.filter((p) => p !== 'system/manifest.json' && !p.startsWith('.codex/') &&
    !isObsidianRuntime(p) && !paths.isLocalOnlyFile(p));
  if (extra.length) {
    findings.push(finding('yellow', 'Extra files are inside GrowOS folders',
      extra.join(', '),
      'If you added these on purpose, move them into your business folder instead - its brain/, work/, or library/.'));
  }
  if (findings.length === 0) {
    findings.push(finding('green', 'GrowOS files match the shipped version'));
  }
  return { section: section('machine', 'Machine integrity', findings), diff: { missing: cmp.missing, changed: cmp.changed, extra } };
}

/* ------------------------------- check 5 -------------------------------- */

function readSessions(root) {
  const dir = path.join(root, '.growos', 'sessions');
  const windows = [];
  let names = [];
  try { names = fs.readdirSync(dir); } catch (_) { return windows; }
  for (const name of names) {
    if (!name.endsWith('.json')) continue;
    const abs = path.join(dir, name);
    try {
      const s = JSON.parse(fs.readFileSync(abs, 'utf8'));
      const started = Date.parse(s.started);
      const lastSeen = Date.parse(s.lastSeen || s.started);
      // Clean markers older than 7 days.
      const newest = Math.max(isNaN(started) ? 0 : started, isNaN(lastSeen) ? 0 : lastSeen);
      if (newest && Date.now() - newest > 7 * DAY_MS) {
        try { fs.rmSync(abs, { force: true }); } catch (_) { /* best effort */ }
        continue;
      }
      if (!isNaN(started)) windows.push({ started, lastSeen: isNaN(lastSeen) ? started : lastSeen });
    } catch (_) { /* skip unreadable */ }
  }
  return windows;
}

async function checkGuards(ctx) {
  const root = ctx.root;
  const findings = [];

  const windows = readSessions(root);
  let heartbeatMs = NaN;
  let heartbeatExists = false;
  try {
    heartbeatMs = Date.parse(JSON.parse(fs.readFileSync(path.join(root, '.growos', 'heartbeat.json'), 'utf8')).last);
    heartbeatExists = true;
  } catch (_) { heartbeatMs = NaN; heartbeatExists = false; }

  const byBusiness = collectItems(root);
  let total = 0;
  let redItems = 0;
  let outsideItems = 0;
  const SESSION_PAD = 5000; // lastSeen can trail the final write by a few seconds
  const HEARTBEAT_LAG = 1000; // the heartbeat is written just after the item

  for (const b of Object.keys(byBusiness)) {
    for (const item of byBusiness[b]) {
      // Count EVERY watched work-item file toward liveness, including ones with no
      // frontmatter (an unwired guard leaves exactly those) — otherwise "nothing
      // to check yet" would hide a dead guard. Sidecars and the
      // shipped work/README.md never reach this list (collectItems filters on
      // paths.isWorkItem), so everything here counts.
      if (item.unreadable || !item.mtimeMs) continue;
      total++;
      const covered = windows.some((w) => item.mtimeMs >= w.started && item.mtimeMs <= w.lastSeen + SESSION_PAD);
      if (covered) {
        const silent = isNaN(heartbeatMs) || heartbeatMs < item.mtimeMs - HEARTBEAT_LAG;
        if (silent) redItems++;
      } else {
        outsideItems++;
      }
    }
  }

  if (total === 0) {
    findings.push(finding('green', 'Nothing to check yet', 'There are no work items, so there is nothing for the guard to have missed.'));
  } else if (!heartbeatExists) {
    // Independent of session windows: work items exist but the guard has never
    // once left an activity mark. Every real work item is created THROUGH the
    // guard, so this means the hooks are not wired / not firing at all - the
    // failure mode the window check below is blind to. Make it loud.
    findings.push(finding('red', 'I can not confirm the guard has ever run',
      'There are ' + total + ' work item(s) but no activity mark exists at all.',
      'The guard hooks may not be wired. Open this folder in the Claude desktop app (which runs the guards), make one small edit, and check the Doctor again. If it stays red, run setup.'));
  } else if (redItems > 0) {
    findings.push(finding('red', 'The guard may not be firing',
      redItems + ' item(s) changed during a session but the activity mark did not move.',
      'Open this folder in the Claude desktop app so the guard runs, then check the Doctor again.'));
  } else if (outsideItems > 0) {
    findings.push(finding('yellow', 'Some items changed outside a session',
      outsideItems + ' item(s) changed with no session running - normal if that was you editing by hand.'));
  } else {
    findings.push(finding('green', 'The guard is firing', 'Every recent change lines up with an active session.'));
  }

  // Surface the hook error log if it has anything in it.
  try {
    const logPath = path.join(root, '.growos', 'logs', 'hook-errors.log');
    const text = fs.readFileSync(logPath, 'utf8');
    if (text.trim() !== '') {
      const tail = text.trim().split('\n').slice(-5).join(' | ');
      findings.push(finding('yellow', 'The guard logged some errors', tail,
        'Look at .growos/logs/hook-errors.log for the details.'));
    }
  } catch (_) { /* no log, fine */ }

  return section('guards', 'Guards alive', findings);
}

/* ------------------------------- check 6 -------------------------------- */

async function checkItems(ctx) {
  const root = ctx.root;
  const byBusiness = collectItems(root);
  const findings = [];

  const unreadable = [];
  const noLabel = [];
  const badStatus = [];
  const missingType = [];
  const badId = [];
  const orphanSnaps = [];
  const incompleteSnaps = [];
  const linkedItems = [];
  const idToPaths = {};

  for (const b of Object.keys(byBusiness)) {
    for (const item of byBusiness[b]) {
      if (item.linked) { linkedItems.push(item.rel); continue; }
      if (item.unreadable) { unreadable.push(item.rel); continue; }
      // A watched work-item file with NO label block is a real problem: if the
      // guard were unwired, the AI could create items that never get stamped, and
      // a frontmatter-keyed sweep would silently pass them. Flag it
      // red. The ONE exception is the shipped work/README.md (docs, not an item).
      if (!item.hasFm) {
        // Sidecars and work/README.md never reach this list (collectItems
        // filters on paths.isWorkItem), so a labelless file HERE is real damage.
        noLabel.push(item.rel);
        continue;
      }
      if (item.status === undefined || LEGAL_STATUSES.indexOf(item.status) === -1) badStatus.push(item.rel + ' (' + (item.status === undefined ? 'no status' : item.status) + ')');
      if (item.type === undefined || item.type === '') missingType.push(item.rel);
      if (item.id === undefined || !ids.isId(item.id)) badId.push(item.rel);
      if (item.id) (idToPaths[item.id] = idToPaths[item.id] || []).push(item.rel);
    }
    // Snapshots: orphans (no live item) AND incomplete copies (a crash during a
    // freeze can leave a zero-byte or unparseable snapshot).
    const liveIds = new Set(byBusiness[b].filter((i) => i.id).map((i) => i.id));
    const snapDir = path.join(root, b, '.snapshots');
    let snapNames = [];
    try { snapNames = fs.readdirSync(snapDir); } catch (_) { snapNames = []; }
    for (const n of snapNames) {
      if (!n.endsWith('.md')) continue;
      const sid = n.slice(0, -3).replace(/\.approved$/, '');
      if (!liveIds.has(sid)) { orphanSnaps.push(b + '/.snapshots/' + n); continue; }
      let snapText = null;
      try { snapText = fs.readFileSync(path.join(snapDir, n), 'utf8'); } catch (_) { snapText = ''; }
      if (snapText === '' || !fm.parse(snapText).hasFm) incompleteSnaps.push(b + '/.snapshots/' + n);
    }
  }

  const dupIds = Object.keys(idToPaths).filter((id) => idToPaths[id].length > 1);

  if (unreadable.length) {
    findings.push(finding('red', "Some items can't be read as work items", unreadable.join(', '),
      'Open each file and make sure it starts with a --- label block.'));
  }
  if (noLabel.length) {
    findings.push(finding('red', 'A work item is missing its label', noLabel.join(', '),
      'This file was not stamped, often because the guard was not running. Ask the AI to recreate it as ' +
      'a fresh item and compare the two. Then you, the owner, can move the original to add-to-brain or Trash.'));
  }
  if (linkedItems.length) {
    findings.push(finding('red', 'A work item is a link, and a link cannot be trusted', linkedItems.join(', ') +
      ' — every read follows a link to wherever it points, so a linked "item" can make any check agree ' +
      'with itself. GrowOS never creates one.',
      'Replace the link with the real file (copy the target into place), then run the doctor again.'));
  }

  // The seal on shipped assets (Build Doc P4.1). An approved or published
  // deliverable whose sealed asset no longer verifies is RED: "what ships is
  // what was approved" is the entire point of the seal, and a publish skill
  // consulting this file would be about to ship other bytes. On any earlier
  // status the same problems are YELLOW — the seal is still being written and
  // catching a malformed line before review is when it is cheap.
  {
    const sealedLib = require('./sealed.js');
    const redSeal = [];
    const yellowSeal = [];
    for (const b of Object.keys(byBusiness)) {
      for (const item of byBusiness[b]) {
        if (item.unreadable || !item.hasFm) continue;
        const approvedLike = item.status === 'approved' || item.status === 'published';
        // On an approved or published item, the seal OF RECORD is the approved
        // snapshot — verifying only the live file certified "the item agrees
        // with itself", which a re-render plus a re-seal passes while the copy
        // the owner said yes to promises different bytes. The snapshot is
        // read BEFORE the gate: gating on the LIVE file's sealed key alone
        // meant deleting that one line switched approved-seal verification
        // off entirely.
        let snapText = null;
        let snapReadError = null;
        if (approvedLike && item.id) {
          const snapAbs = path.join(root, b, '.snapshots', item.id + '.approved.md');
          // The PATH to the approved copy, before the copy itself: an lstat of
          // the LEAF says nothing about a linked `.snapshots/` folder, which
          // hands over an ordinary file sitting somewhere else entirely.
          // Same walk publish-stage does.
          const linkedSnapDir = require('./publishing.js')
            .firstSymlinkOnPath(path.join(root, b), snapAbs);
          if (linkedSnapDir) {
            redSeal.push(item.rel + ' (the approved copy sits under a link: ' +
              paths.toPosix(path.relative(root, linkedSnapDir)) + ')');
            continue;
          }
          // The approved copy must be ITS OWN ordinary file, and the bytes
          // judged must be the bytes whose identity
          // was checked: lstat-then-open-BY-NAME left a gap a swap could slip
          // a replacement through. So the open descriptor
          // is the one source of truth — fstat(fd) describes exactly what was
          // opened, the lstat twin proves the name still means that file, and
          // the read goes through the same fd. BIGINT stats throughout:
          // numeric dev/ino round into doubles on filesystems that use the
          // full identifier width (appendCorrection set the precedent).
          let snapLst = null;
          try {
            snapLst = fs.lstatSync(snapAbs, { bigint: true });
          } catch (err) {
            // ENOENT here — the approved copy absent when first looked — is
            // the honest pre-machinery state (approved before snapshots
            // existed). This catch covers ONLY the approved copy's lstat; the
            // live item gets its own scope below, so its failure can never be
            // misread as "no approved copy yet". ANY
            // other failure means an approved copy is there and cannot be
            // read — not a license to let the live file's self-consistent
            // claim stand in for it.
            if (!(err && err.code === 'ENOENT')) snapReadError = err;
          }
          if (snapLst !== null && snapReadError === null) {
            let fd = null;
            try {
              if (snapLst.isSymbolicLink()) {
                throw new Error('it is not an ordinary file — a link cannot vouch for anything');
              }
              fd = fs.openSync(snapAbs, 'r');
              const st = fs.fstatSync(fd, { bigint: true });
              if (st.dev !== snapLst.dev || st.ino !== snapLst.ino) {
                throw new Error('it changed underneath while being opened, so what was read cannot be trusted — run the doctor again');
              }
              if (!st.isFile()) {
                throw new Error('it is not an ordinary file — a link cannot vouch for anything');
              }
              if (st.nlink > 1n) {
                throw new Error('it has more than one name pointing at it, so it may also be the live file');
              }
              let liveSt = null;
              try {
                liveSt = fs.lstatSync(item.abs, { bigint: true });
              } catch (liveErr) {
                throw new Error('the item itself could not be checked (' +
                  (liveErr && liveErr.message ? liveErr.message : String(liveErr)) +
                  ') — it changed or vanished while the doctor ran; run the doctor again');
              }
              if (st.dev === liveSt.dev && st.ino === liveSt.ino) {
                throw new Error('it IS the live file — an approved copy that tracks the live bytes cannot vouch for them');
              }
              snapText = fs.readFileSync(fd, 'utf8');
            } catch (err) {
              snapReadError = err;
            } finally {
              if (fd !== null) { try { fs.closeSync(fd); } catch (_) {} }
            }
          }
        }
        const snapSealed = snapText !== null && fm.getField(snapText, 'sealed') !== undefined;
        if (!item.sealedPresent && !snapSealed && snapReadError === null) continue;

        // Reaching here means the item WAS readable at collection, so a read
        // failure now is a mid-run change, never the already-reported
        // unreadable case — silently skipping it hid exactly that.
        let text = null;
        let liveReadError = null;
        try { text = fs.readFileSync(item.abs, 'utf8'); } catch (err) { liveReadError = err; }
        const itemRel = item.rel.slice(b.length + 1);
        const problems = [];
        if (liveReadError !== null) {
          problems.push('the item could not be re-read while checking its seal (' +
            (liveReadError.message || String(liveReadError)) +
            ') — it changed or vanished while the doctor ran; run the doctor again');
        }
        if (snapReadError !== null) {
          const m = snapReadError.message || String(snapReadError);
          problems.push(/^the item itself/.test(m)
            ? m
            : 'the approved copy (.snapshots/' + item.id + '.approved.md) could not be read (' + m +
              '), so the seal cannot be verified against what was approved');
        } else if (snapText !== null) {
          problems.push(...sealedLib.verifySealed(root, b, itemRel, snapText));
          if (text !== null) {
            // The live file's own parse problems count too: comparing only its
            // PARSED entries let a malformed extra line vanish.
            const live = sealedLib.parseSealed(text);
            for (const p of live.problems) problems.push('in the live file: ' + p);
            const snap = sealedLib.parseSealed(snapText);
            const key = (e) => e.path + ' ' + e.sha256;
            const liveSet = live.entries.map(key).sort().join('\n');
            const snapSet = snap.entries.map(key).sort().join('\n');
            if (liveSet !== snapSet) {
              problems.push('the sealed list in the live file is not the one that was approved — the seal ' +
                'changed after approval');
            }
          }
        } else if (text !== null) {
          problems.push(...sealedLib.verifySealed(root, b, itemRel, text));
        }
        if (!problems.length) continue;
        const line = item.rel + ': ' + problems.join('; ');
        if (approvedLike) redSeal.push(line);
        else yellowSeal.push(line);
      }
    }
    if (redSeal.length) {
      findings.push(finding('red', 'A sealed asset does not match what was approved', redSeal.join(' | '),
        'Nothing should be published from that deliverable. Put back the sealed bytes, or have the ' +
        'owner re-approve it with a fresh seal.'));
    }
    if (yellowSeal.length) {
      findings.push(finding('yellow', 'A sealed asset line needs attention before review', yellowSeal.join(' | '),
        'Fix the sealed: line (each shipped file needs "- <file> sha256:<hash>") so the seal can be ' +
        'checked when this is approved.'));
    }
  }

  // The one honest migration edge of the sidecar rule (Build Doc P4.1): a file
  // carrying a full item label INSIDE an underscore folder will never enter the
  // queue again — losing it silently would break "if I hear nothing, it
  // worked", so it is named. A labelless file in there is simply a part and
  // says nothing.
  {
    const stranded = [];
    for (const business of Object.keys(byBusiness)) {
      for (const entry of walkAll(path.join(root, business, 'work'))) {
        if (entry.isDir || !/\.md$/i.test(entry.name)) continue;
        const rel = business + '/work/' + entry.rel;
        if (!paths.isWorkSidecar(root, rel)) continue;
        let text = null;
        try { text = fs.readFileSync(entry.abs, 'utf8'); } catch (_) { continue; }
        if (fm.parse(text).hasFm && fm.getField(text, 'status') !== undefined) stranded.push(rel);
      }
    }
    if (stranded.length) {
      findings.push(finding('yellow', 'A stamped item sits in a parts folder', stranded.join(', ') +
        ' — files in an underscore folder are a deliverable\'s parts, and nothing in one ever enters ' +
        'the review queue.',
        'If it is a real item, move it out of the underscore folder. If it is a part, remove its label block.'));
    }
  }

  // The channel vocabulary (Build Doc P4.2). A new channel is allowed — the
  // owner's folders are the owner's — but every channel the vocabulary does
  // not know is NAMED, and a name one edit from a known channel (or from
  // another folder in the same business) is called what it probably is: two
  // spellings quietly splitting one channel's work. Caught at two items, not
  // fifty — and the Phase 5 resolver needs this vocabulary to exist.
  {
    const channels = require('./channels.js');
    const lines = [];
    let businesses = [];
    try { businesses = paths.listBusinesses(root); } catch (_) { businesses = []; }
    for (const business of businesses) {
      let dirents = [];
      try { dirents = fs.readdirSync(path.join(root, business, 'work'), { withFileTypes: true }); } catch (_) { continue; }
      const unknown = [];
      for (const d of dirents) {
        if (!d.isDirectory() || d.name.startsWith('_')) continue;
        if (channels.isKnownChannel(d.name)) continue;
        unknown.push(d.name);
      }
      const inDrift = new Set();
      for (let i = 0; i < unknown.length; i++) {
        for (let j = i + 1; j < unknown.length; j++) {
          // looksLikeSameChannel, not raw distance: `seo` and `sem` are
          // different words, not two spellings of one channel.
          if (channels.looksLikeSameChannel(unknown[i], unknown[j])) {
            // An observation, not a conclusion: the
            // Doctor cannot know whether two near names are one channel
            // misspelled or two real channels, so it says what it sees and
            // leaves the call to the owner.
            lines.push(business + '/work/' + unknown[i] + ' and ' + business + '/work/' + unknown[j] +
              ' are a small edit apart. If they are two spellings of one channel, merge them; two ' +
              'genuinely different channels are fine to keep');
            inDrift.add(unknown[i]);
            inDrift.add(unknown[j]);
          }
        }
      }
      for (const name of unknown) {
        if (inDrift.has(name)) continue;
        const near = channels.nearestKnown(name);
        lines.push(business + '/work/' + name + (near
          ? ' — close to "' + near + '", which GrowOS does know. If that is what it should be, move the ' +
            'items there; two spellings quietly split one channel\'s work. A genuinely different channel ' +
            'is fine'
          : ' — not a channel GrowOS knows. A deliberate new channel is fine; it will be handled ' +
            'manually until setup knows it'));
      }
    }
    if (lines.length) {
      findings.push(finding('yellow', 'A channel folder is not in the known list', lines.join(' | '),
        'If it is a misspelling, move the items into the right folder and remove the stray one. ' +
        'A genuinely new channel is fine to keep.'));
    }
  }
  if (badStatus.length) {
    findings.push(finding('red', 'Some items have a status GrowOS does not recognize', badStatus.join(', '),
      'Legal statuses are: ' + LEGAL_STATUSES.join(', ') + '.'));
  }
  if (dupIds.length) {
    findings.push(finding('red', 'Two items share the same id',
      dupIds.map((id) => id + ': ' + idToPaths[id].join(' & ')).join('; '),
      'Give one of each pair a fresh id (the system normally stamps these).'));
  }
  if (missingType.length) {
    findings.push(finding('yellow', 'Some items have no type', missingType.join(', '),
      'The skill that made the item should set its type.'));
  }
  if (badId.length) {
    findings.push(finding('yellow', 'Some items have a missing or odd id', badId.join(', '),
      'This file was not stamped, often because the guard was not running. Ask the AI to recreate it as ' +
      'a fresh item and compare the two. Then you, the owner, can move the original to add-to-brain or Trash.'));
  }
  if (orphanSnaps.length) {
    findings.push(finding('yellow', 'Some frozen copies have no matching item', orphanSnaps.join(', '),
      'These are safe to leave; they are old originals whose item was renamed or removed.'));
  }
  if (incompleteSnaps.length) {
    findings.push(finding('yellow', 'A frozen copy looks incomplete', incompleteSnaps.join(', '),
      'Delete it so the next review re-freezes a clean copy.'));
  }
  if (findings.length === 0) {
    findings.push(finding('green', 'All work items look well-formed'));
  }
  return section('items', 'Work items', findings);
}

/* ------------------------------- check 7 -------------------------------- */

function daysSince(dateStr) {
  const ms = Date.parse(String(dateStr));
  if (isNaN(ms)) return null;
  return Math.floor((Date.now() - ms) / DAY_MS);
}

async function checkQueue(ctx) {
  const byBusiness = collectItems(ctx.root);
  const findings = [];
  const staleList = [];
  let anyReview = false;

  for (const b of Object.keys(byBusiness)) {
    const reviews = byBusiness[b].filter((i) => i.status === 'review');
    if (reviews.length) {
      anyReview = true;
      findings.push(finding('green', reviews.length + ' item(s) waiting for you in ' + b));
    }
    for (const i of reviews) {
      const d = daysSince(i.created);
      if (d !== null && d > 30) staleList.push(i.rel + ' (' + d + ' days)');
    }
  }
  if (staleList.length) {
    findings.push(finding('yellow', 'Some items have waited over 30 days', staleList.join(', '),
      'Review or reject them so the queue reflects reality.'));
  }
  if (!anyReview && staleList.length === 0) {
    findings.push(finding('green', 'Nothing is stuck in the review queue'));
  }
  return section('queue', 'Queue sanity', findings);
}

/* ------------------------------- check 8 -------------------------------- */

/**
 * rel -> sha256 for the SKILL FILES under dir. Ambient OS litter is left out
 * (paths.isAmbientLitter — the same definition mirror and the release lint
 * use): a .DS_Store on one side is Finder, not a mirror that went stale. Cry
 * drift over that and every Mac owner sees a yellow they cannot clear, which
 * is how owners learn to ignore the Doctor.
 */
function hashTree(dir) {
  const map = {};
  for (const entry of walkAll(dir)) {
    if (entry.isDir) continue;
    if (paths.isAmbientLitter(entry.name)) continue;
    map[entry.rel] = crypto.createHash('sha256').update(fs.readFileSync(entry.abs)).digest('hex');
  }
  return map;
}

async function checkTwinParity(ctx) {
  const root = ctx.root;
  const findings = [];

  const claudeSkills = path.join(root, '.claude', 'skills');
  const agentsSkills = path.join(root, '.agents', 'skills');
  const a = existsDir(claudeSkills) ? hashTree(claudeSkills) : {};
  const b = existsDir(agentsSkills) ? hashTree(agentsSkills) : {};
  const ak = Object.keys(a).sort();
  const bk = Object.keys(b).sort();
  const identical = ak.length === bk.length && ak.every((k, i) => k === bk[i] && a[k] === b[k]);
  if (!identical) {
    findings.push(finding('yellow', 'The Codex skills copy is out of date',
      'The files in .agents/skills do not match .claude/skills.',
      'Run: node system/tools/growos.js mirror'));
  }

  // .codex/hooks.json exists and points at files that exist.
  const hooksPath = path.join(root, '.codex', 'hooks.json');
  if (!existsFile(hooksPath)) {
    findings.push(finding('yellow', 'The Codex wiring is missing',
      '.codex/hooks.json is not there.',
      'Run: node system/tools/growos.js setup --business "<name>" (or mirror) to write it.'));
  } else {
    let hooks = null;
    try { hooks = JSON.parse(fs.readFileSync(hooksPath, 'utf8')); } catch (_) { hooks = null; }
    if (hooks === null) {
      findings.push(finding('yellow', 'The Codex wiring is unreadable',
        '.codex/hooks.json could not be parsed.',
        'Run: node system/tools/growos.js mirror'));
    } else {
      // Collect every "command" string, then pull the path out of node "<abs>".
      const commands = [];
      const collect = (obj) => {
        if (!obj || typeof obj !== 'object') return;
        if (Array.isArray(obj)) { obj.forEach(collect); return; }
        for (const k of Object.keys(obj)) {
          if (k === 'command' && typeof obj[k] === 'string') commands.push(obj[k]);
          else collect(obj[k]);
        }
      };
      collect(hooks);
      const referenced = commands.map((c) => { const m = c.match(/"([^"]+)"/); return m ? m[1] : null; }).filter(Boolean);
      const dead = referenced.filter((p) => !existsFile(p));
      if (referenced.length === 0) {
        findings.push(finding('yellow', 'The Codex wiring has no hook command',
          '.codex/hooks.json does not point at the guard script.',
          'Run: node system/tools/growos.js mirror'));
      } else if (dead.length) {
        findings.push(finding('yellow', 'The Codex wiring points at a missing file', dead.join(', '),
          'Run: node system/tools/growos.js setup --business "<name>" to rewrite the wiring for this folder.'));
      }
    }
  }

  if (findings.length === 0) {
    findings.push(finding('green', 'The Codex twin is in sync'));
  }
  return section('twin', 'Twin parity', findings);
}

/* ------------------------- check 7b: the inbox drains --------------------- */

/**
 * checkInbox — is anything still sitting in `brain/inbox/` waiting to be filed?
 *
 * The inbox is a drop folder: somewhere to put a thought, a review, or a story
 * before you lose it, so the system can file it into the brain file that owns it
 * later. In every one of the fourteen real 0.1 installs the equivalent folder
 * filled up and was never drained — which means everything the owner handed over
 * stayed exactly where it could not be used.
 *
 * So it gets named. Yellow, never red: material waiting to be filed is not
 * damage, it is a small job. The README that explains the folder does not count,
 * and neither do underscore helpers — a fresh install must not open on a yellow
 * that can only be cleared by deleting the documentation.
 */
/**
 * Is a directory entry safely inside the business it claims to belong to? A
 * symlinked or junctioned inbox pointing outside the install would otherwise have
 * the Doctor happily counting somebody else's files as this owner's backlog.
 */
function insideBusiness(root, business, abs) {
  const home = paths.realpathBestEffort(path.join(String(root), business));
  const real = paths.realpathBestEffort(abs);
  if (home === null || real === null) return false;
  return real === home || real.indexOf(home + path.sep) === 0;
}

/**
 * 8b. Brain links (Build Doc Phase 6). Exactly TWO rules, both advisory
 * yellow: a broken wikilink, and a required top-level page missing from
 * MEMORY.md's index. The orphan graph deliberately does not exist — a check
 * that flags every README as an orphan trains owners to ignore the Doctor.
 */
async function checkBrainLinks(ctx) {
  const root = ctx.root;
  const findings = [];
  // A damaged links.js must degrade to ONE yellow, never abort the whole
  // Doctor before anything prints.
  let links = null;
  try { links = require('./links.js'); }
  catch (err) {
    return { key: 'brain-links', title: 'Brain links', findings: [
      finding('yellow', 'The link checker itself could not be loaded',
        String(err && err.message ? err.message : err) + ' — links were not checked this run.',
        'Run: node system/tools/growos.js repair (a damaged system file is what repair is for).'),
    ] };
  }
  let businesses = [];
  let bizErr = null;
  try { businesses = paths.listBusinesses(root); } catch (err) { bizErr = err; businesses = []; }
  if (bizErr) {
    // "Could not look" is never a green "all links resolve".
    findings.push(finding('yellow', 'The businesses could not be listed for the link check',
      String(bizErr.message || bizErr), 'Check the folder is readable, then run the Doctor again.'));
  }

  for (const b of businesses) {
    let r = null;
    try { r = links.lintBusinessLinks(root, b); }
    catch (err) {
      findings.push(finding('yellow', 'The link check could not finish for ' + b,
        String(err && err.message ? err.message : err), 'Run the Doctor again; if it repeats, tell the owner.'));
      continue;
    }
    if (r.broken.length) {
      const total = typeof r.brokenTotal === 'number' ? r.brokenTotal : r.broken.length;
      const shown = r.broken.slice(0, 8).map((x) => x.file + ' -> [[' + x.target + ']]');
      findings.push(finding('yellow', 'A wikilink in ' + b + '\'s brain points at nothing',
        shown.join(', ') + (total > 8 ? ' (and ' + (total - 8) + ' more)' : '') +
        ' — the page it names does not exist in the brain, so a reader (and the AI) hits a dead end.',
        'Create the page, fix the spelling, or remove the link.'));
    }
    if (r.indexMissing.length) {
      findings.push(finding('yellow', 'MEMORY.md\'s index is missing a page it should carry (' + b + ')',
        r.indexMissing.map((n) => '[[' + n + ']]').join(', ') + ' — MEMORY.md is loaded every session, and ' +
        'its index of the top-level pages and folder indexes is how each session finds the brain fast.',
        'Add the missing line(s) to the index section of brain/memory/MEMORY.md.'));
    }
    for (const p of r.problems) {
      findings.push(finding('yellow', 'Part of ' + b + '\'s brain could not be checked for links', p,
        'Check the folder is readable, then run the Doctor again.'));
    }
  }

  if (!findings.length) {
    findings.push(finding('green', 'The brain\'s links all resolve',
      'Every wikilink points at a real page, and MEMORY.md\'s index carries the top-level pages.', 'none'));
  }
  return { key: 'brain-links', title: 'Brain links', findings };
}

async function checkBrainUpkeep(ctx) {
  const root = ctx.root;
  const findings = [];

  // A failure to even LIST the businesses is not "no businesses". Turning it into
  // an empty list and then reporting a clean bill of health is precisely the
  // silent failure this whole system exists to refuse.
  let businesses = [];
  let listFailed = null;
  try { businesses = paths.listBusinesses(root); } catch (err) {
    listFailed = err && err.message ? err.message : String(err);
  }
  if (listFailed !== null) {
    findings.push(finding('yellow', 'Could not check the inbox or the asset index',
      'The business folders could not be listed: ' + listFailed,
      'Run the Doctor again; if it repeats, check folder permissions.'));
    return section('brain-upkeep', 'Brain upkeep', findings);
  }

  const perBusiness = [];
  const uninspected = [];
  const undescribed = [];
  let total = 0;
  let oldestDays = null;
  let oldestWhere = null;

  for (const b of businesses) {
    /* ---- the inbox drains ---- */
    const dir = path.join(root, b, 'brain', 'inbox');
    let entries = null;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch (err) {
      // ENOENT is the Folder Shape check's business, and it already reports it.
      // Anything else means we could not look, which must never read as "empty".
      if (!err || err.code !== 'ENOENT') uninspected.push(b + '/brain/inbox (' + (err && err.code ? err.code : 'unreadable') + ')');
      entries = null;
    }
    if (entries !== null && !insideBusiness(root, b, dir)) {
      uninspected.push(b + '/brain/inbox (points outside the business folder)');
      entries = null;
    }
    if (entries !== null) {
      let waiting = 0;
      for (const d of entries) {
        const name = d.name;
        if (paths.isAmbientLitter(name)) continue;
        // The folder's own explainer and any underscore helper are not drops. A
        // fresh install must never open on a yellow it can only clear by deleting
        // the documentation. Case-insensitive, because that is how the
        // filesystems GrowOS targets hand names back.
        if (name.charAt(0) === '_' || name.toLowerCase() === 'readme.md') continue;
        waiting += 1;
        // lstat, so a symlink reports ITS OWN age rather than its target's, and a
        // dangling link still counts as something sitting there.
        try {
          const ms = fs.lstatSync(path.join(dir, name)).mtimeMs;
          const days = Math.floor((Date.now() - ms) / DAY_MS);
          if (days >= 0 && (oldestDays === null || days > oldestDays)) { oldestDays = days; oldestWhere = b; }
        } catch (_) { /* an unreadable timestamp does not change that the item is there */ }
      }
      if (waiting > 0) { perBusiness.push(b + ': ' + waiting); total += waiting; }
    }

    /* ---- every asset is described ---- */
    const assetsDir = path.join(root, b, 'brain', 'assets');
    let assetEntries = null;
    try {
      assetEntries = fs.readdirSync(assetsDir, { withFileTypes: true });
    } catch (err) {
      if (!err || err.code !== 'ENOENT') uninspected.push(b + '/brain/assets (' + (err && err.code ? err.code : 'unreadable') + ')');
      assetEntries = null;
    }
    if (assetEntries !== null && !insideBusiness(root, b, assetsDir)) {
      uninspected.push(b + '/brain/assets (points outside the business folder)');
      assetEntries = null;
    }
    if (assetEntries !== null) {
      // Read the index MINUS its fenced example block. The template shows a
      // worked example line, and a customer whose logo happens to share that
      // example's filename would otherwise count as described forever without
      // ever having written a word about it.
      let index = '';
      try {
        index = fs.readFileSync(path.join(assetsDir, 'index.md'), 'utf8')
          .split('\n')
          .reduce((acc, line) => {
            if (/^\s*```/.test(line)) { acc.inFence = !acc.inFence; return acc; }
            if (!acc.inFence) acc.kept.push(line);
            return acc;
          }, { inFence: false, kept: [] })
          .kept.join('\n');
      } catch (_) { index = ''; }
      for (const d of assetEntries) {
        const name = d.name;
        if (d.isDirectory()) continue;
        if (paths.isAmbientLitter(name)) continue;
        if (name.charAt(0) === '_') continue;
        if (name.toLowerCase() === 'readme.md' || name.toLowerCase() === 'index.md') continue;
        // The system cannot see inside a file, so an asset the index does not name
        // is invisible to every skill. Naming it is the whole job.
        if (index.indexOf(name) === -1) undescribed.push(b + '/' + name);
      }
    }
  }

  if (uninspected.length) {
    findings.push(finding('yellow', 'Could not check part of the brain',
      'These could not be read, so nothing here can say they are clear: ' + uninspected.join(', ') + '.',
      'Check folder permissions, and that nothing in the brain is a link pointing outside the business folder.'));
  }

  if (total === 0 && uninspected.length === 0) {
    findings.push(finding('green', 'Nothing is waiting in the inbox'));
  } else if (total > 0) {
    let detail = total + ' item(s) dropped in brain/inbox/ and not filed yet (' +
      perBusiness.join(', ') + ').';
    if (oldestDays !== null && oldestDays >= INBOX_STALE_DAYS) {
      detail += ' The oldest was last modified ' + oldestDays + ' day(s) ago, in ' + oldestWhere +
        ' — long enough that it has probably been forgotten.';
    } else if (oldestDays !== null) {
      detail += ' The most recently modified is ' + oldestDays + ' day(s) old.';
    }
    findings.push(finding('yellow', 'Some things are waiting in the inbox', detail,
      'Ask GrowOS to go through the inbox: each item gets filed into the brain file that owns it, ' +
      'and anything that is not worth keeping gets deleted.'));
  }

  if (undescribed.length) {
    findings.push(finding('yellow', 'Some assets have no line in the asset index',
      undescribed.length + ' file(s) sit in brain/assets/ with nothing describing them: ' +
      undescribed.join(', ') + '. GrowOS cannot see inside a file, so it will never reach for these.',
      'Add a line to brain/assets/index.md for each one: what it is, and when to use it.'));
  }
  return section('brain-upkeep', 'Brain upkeep', findings);
}

/* --------------------------- check 8b: Codex guard trust ------------------ */

/**
 * checkGuardTrust — CAN the GrowOS guard actually fire under Codex?
 *
 * Codex silently skips a project hook whose per-hook trust is not persisted in
 * the user config, so an untrusted guard never fires under `codex exec` and
 * never says so. The question is therefore not "is the trust tidy" but "is this
 * folder protected inside Codex right now", and the answer is red whenever it
 * is no.
 *
 * Three ways it can be no, and all three used to read as fine:
 *   - the trust is missing or stale (the usual cause: the folder moved),
 *   - the wiring itself is gone or unreadable, so there is nothing to trust —
 *     this reported "Codex guard trust is fine" beside a yellow note about
 *     missing wiring, two reassuring lines for a dead guard,
 *   - the Codex config cannot be read, which is not the same as not having one.
 *
 * Green only for an owner with no Codex at all, or a guard that is genuinely
 * trusted.
 */
async function checkGuardTrust(ctx) {
  const root = ctx.root;
  const findings = [];
  let status = null;
  try { status = codexTrust.trustStatus(root); } catch (_) { status = null; }

  const RELINK = 'If you moved this folder, run: node system/tools/growos.js setup --relink-codex. ' +
    'Otherwise open Codex once in this folder and approve the GrowOS guard when asked.';

  if (!status) {
    findings.push(finding('red', 'Could not check whether the Codex guard is trusted',
      'The check itself failed, so nothing here can promise the guard is on inside Codex.', RELINK));
  } else if (status.configState === 'absent') {
    // No Codex config on this machine — the owner runs Claude only.
    findings.push(finding('green', 'Codex is not set up here (nothing to trust)',
      'No Codex config was found, so there is no Codex hook trust to grant.'));
  } else if (status.configState === 'unreadable') {
    findings.push(finding('red', 'The Codex config cannot be read, so the guard cannot be confirmed',
      'Codex is set up on this machine but its config at ' + status.configPath + ' could not be read. ' +
      'An unreadable config is not the same as no Codex, and the guard may be off.',
      'Check the file and its permissions, then run the Doctor again.'));
  } else if (status.noHooks) {
    // Codex IS on this machine, and this folder has no usable wiring for it.
    const why = status.wiring === 'missing' ? '.codex/hooks.json is not there'
      : status.wiring === 'unreadable' ? '.codex/hooks.json could not be read'
      : '.codex/hooks.json wires no command hooks';
    findings.push(finding('red', 'The Codex guard cannot fire — this folder has no working wiring',
      'Codex is set up on this machine, but ' + why + ', so nothing guards this folder inside Codex.',
      'Run: node system/tools/growos.js mirror (or setup --relink-codex if you moved this folder).'));
  } else if (status.ok) {
    findings.push(finding('green', 'The Codex guard is trusted'));
  } else {
    // RED, not a note. Codex does not warn about an untrusted hook — it skips it
    // and carries on looking entirely normal. So this is not "tidy this up
    // sometime": for as long as it is true, every Codex session in this folder
    // runs with no guard at all, and nothing else will say so. A move is the
    // usual cause, because trust is keyed to the old absolute path.
    const n = status.missing.length + status.mismatched.length;
    findings.push(finding('red', 'The Codex guard is not trusted, so Codex is running unguarded',
      n + ' of ' + status.total + ' guard hook(s) have no matching trust in the Codex config. Codex skips an ' +
      'untrusted hook without saying so, so nothing is protecting this folder inside Codex right now.',
      RELINK));
  }
  return section('guard-trust', 'Codex guard trust', findings);
}

/* ------------------------------- check 9 -------------------------------- */

function isDuplicateName(name, isDir) {
  const base = isDir ? name : name.replace(/\.[^.]+$/, '');
  if (/ [2-9]$/.test(base)) return true; // "notes 2", "post 2.md"
  if (/conflicted copy/i.test(name)) return true;
  return false;
}

async function checkSyncDamage(ctx) {
  const root = ctx.root;
  const findings = [];
  const quarantine = !!(ctx.flags && ctx.flags.quarantine);

  const machineLitter = [];
  const customerDupes = [];
  const customerIcloud = [];
  const tmpLeftovers = [];
  const orphanBaks = [];

  for (const entry of walkAll(root)) {
    const name = entry.name;
    const isMachine = paths.isMachinePath(root, entry.rel);
    const dup = isDuplicateName(name, entry.isDir);
    const icloud = /\.icloud$/i.test(name);
    // A ".growos-tmp" is a mid-write temp — always safe (the real file is intact,
    // or the write never completed). A ".growos-bak" holds the OLD bytes of a file
    // whose rename-replace swap was interrupted: it is safe to delete ONLY if the
    // real file is present. If the real file is MISSING, the .growos-bak is the
    // ONLY copy and must be RESTORED, not deleted.
    const isTmp = name.endsWith('.growos-tmp');
    const isBak = name.endsWith('.growos-bak');

    if (!dup && !icloud && !isTmp && !isBak) continue;
    if (isTmp) { tmpLeftovers.push(entry.rel); continue; }
    if (isBak) {
      const realExists = fs.existsSync(entry.abs.slice(0, -'.growos-bak'.length));
      if (realExists) tmpLeftovers.push(entry.rel);
      else orphanBaks.push(entry.rel);
      continue;
    }

    if (isMachine) {
      machineLitter.push(entry.rel);
    } else if (dup) {
      customerDupes.push(entry);
    } else if (icloud) {
      customerIcloud.push(entry.rel);
    }
  }

  // Stale .growos/tmp/* older than one day.
  const staleTmp = [];
  const tmpDir = path.join(root, '.growos', 'tmp');
  try {
    for (const n of fs.readdirSync(tmpDir)) {
      const abs = path.join(tmpDir, n);
      try {
        if (Date.now() - fs.statSync(abs).mtimeMs > DAY_MS) staleTmp.push('.growos/tmp/' + n);
      } catch (_) { /* skip */ }
    }
  } catch (_) { /* no tmp dir */ }

  if (machineLitter.length) {
    findings.push(finding('yellow', 'GrowOS files have cloud-sync copies', machineLitter.join(', '),
      'Run: node system/tools/growos.js repair to restore the right files, then delete the copies.'));
  }

  if (customerDupes.length) {
    if (quarantine) {
      const moved = quarantineDupes(root, customerDupes);
      findings.push(finding('yellow', 'Your files had cloud-sync duplicates',
        'Moved ' + moved.length + ' into _quarantine.',
        'Open _quarantine to compare each copy with its original and keep the one you want.'));
    } else {
      findings.push(finding('yellow', 'Your files have cloud-sync duplicates',
        customerDupes.map((e) => e.rel).join(', '),
        'Run: node system/tools/growos.js doctor --quarantine to set the duplicates aside safely.'));
    }
  }

  if (customerIcloud.length) {
    findings.push(finding('yellow', 'Some files are not downloaded from the cloud yet', customerIcloud.join(', '),
      'Open them in Finder/Explorer to download the real files.'));
  }
  if (tmpLeftovers.length) {
    findings.push(finding('yellow', 'Some half-written temp files were left behind', tmpLeftovers.join(', '),
      'These are safe to delete.'));
  }
  if (orphanBaks.length) {
    findings.push(finding('red', 'A backup copy may be your only copy of a file', orphanBaks.join(', '),
      'A file swap was interrupted and the real file is missing. Do NOT delete these — rename each one to remove the ".growos-bak" ending to restore it, then run the doctor again.'));
  }
  if (staleTmp.length) {
    findings.push(finding('yellow', 'Old temporary files are lying around', staleTmp.join(', '),
      'Everything in .growos/tmp is safe to delete.'));
  }

  if (findings.length === 0) {
    findings.push(finding('green', 'No cloud-sync damage found'));
  }
  return section('sync', 'Sync damage', findings);
}

/** Move customer duplicate files/dirs into _quarantine/<date>/, keeping structure. */
function quarantineDupes(root, entries) {
  const date = new Date().toISOString().slice(0, 10);
  const base = path.join(root, '_quarantine', date);
  const moved = [];
  for (const e of entries) {
    const dest = path.join(base, ...e.rel.split('/'));
    try {
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      try {
        fs.renameSync(e.abs, dest);
      } catch (err) {
        if (err && err.code === 'EXDEV') {
          fs.cpSync(e.abs, dest, { recursive: true });
          fs.rmSync(e.abs, { recursive: true, force: true });
        } else {
          throw err;
        }
      }
      moved.push(e.rel);
    } catch (_) { /* leave it in place if it cannot be moved */ }
  }
  if (moved.length) {
    const readme = [
      '# Set-aside duplicates',
      '',
      'These files looked like copies your cloud sync (iCloud, Dropbox, OneDrive) made,',
      'usually named like "post 2.md" or "... conflicted copy ...".',
      '',
      'For each file here, compare it with the original of the same name in your',
      'business folder and keep the version you want. Then delete the other.',
      '',
      'Nothing was deleted. Everything here was only moved.',
      '',
    ].join('\n');
    try { fs.writeFileSync(path.join(base, 'README.md'), readme); } catch (_) { /* best effort */ }
  }
  return moved;
}

/* ------------------------------- check 10 ------------------------------- */

async function checkRecords(ctx) {
  const root = ctx.root;
  const findings = [];
  let businesses = [];
  try { businesses = paths.listBusinesses(root); } catch (_) { businesses = []; }

  for (const b of businesses) {
    const r = logbook.readAll(root, b);
    if (r.corruptTail) {
      findings.push(finding('yellow', 'The record ends on a torn line in ' + b,
        'The last log line was cut off (usually a crash mid-write). Nothing before it was lost.'));
    }
    if (r.badLines > 0) {
      findings.push(finding('yellow', 'Some record lines were unreadable in ' + b,
        r.badLines + ' line(s) could not be read and were skipped.'));
    }
    // Bookmark: present but unreadable is a problem; absent is fine.
    const bmPath = path.join(root, b, '.state', 'bookmark.json');
    if (existsFile(bmPath) && logbook.readBookmark(root, b) === null) {
      findings.push(finding('yellow', 'The bookmark is unreadable in ' + b,
        '.state/bookmark.json exists but could not be parsed.',
        'It is safe to delete; the next step will write a fresh one.'));
    }
  }
  if (findings.length === 0) {
    findings.push(finding('green', 'The records look intact'));
  }
  return section('records', 'Logbook and bookmark', findings);
}

/* Check 11 (the migration ledger) is GONE, with the mechanism it watched:
 * updates replace machinery only (Build Doc P2), so there are no shipped
 * migrations and no per-business ledger to fall behind. */

/* ------------------------------- check 12 ------------------------------- */

// A light, report-only look for a secret that landed somewhere it should not.
// It NEVER auto-fixes or deletes; it points at the line so the owner can move
// the key into the business's private .env. False positives are cheap here (a
// yellow note), so the shapes are deliberately conservative and the value is
// never shown in full — only its first few characters.

// Strong shapes: a known key/token prefix is signal enough on its own.
const SECRET_PREFIX_PATTERNS = [
  { re: /sk-ant-[A-Za-z0-9_-]{16,}/g, why: 'an Anthropic-style key' },
  { re: /sk-[A-Za-z0-9]{20,}/g, why: 'a secret key' },
  { re: /xox[baprs]-[A-Za-z0-9-]{10,}/g, why: 'a Slack token' },
  { re: /gh[pousr]_[A-Za-z0-9]{20,}/g, why: 'a GitHub token' },
  { re: /github_pat_[A-Za-z0-9_]{20,}/g, why: 'a GitHub token' },
  { re: /AKIA[0-9A-Z]{16}/g, why: 'an AWS access key id' },
  { re: /AIza[0-9A-Za-z_-]{20,}/g, why: 'a Google API key' },
];
// A key-ish assignment: `api_key: <20+ chars>`, `token=<20+ chars>`, etc.
const SECRET_ASSIGN_RE = /\b(api[_-]?key|secret|token|password|passwd|access[_-]?token|client[_-]?secret|auth[_-]?token|bearer)\b["']?\s*[:=]\s*["']?([^\s"'`]{20,})/i;
// A long high-entropy base64/hex string sitting near a secret word.
const SECRET_NEAR_RE = /\b(?:key|token|secret|password|passwd|credential)\b[^\n]{0,40}?([A-Za-z0-9+/=]{32,})/i;

const SECRET_TEXT_EXT = new Set(['.md', '.markdown', '.txt', '.text', '.csv', '.tsv', '.json', '.yml', '.yaml', '.log']);
const SECRET_SKIP_DIRS = new Set(['.growos', '.snapshots', '.state', '.backups', '_quarantine', 'node_modules', '.git', '_dev', 'dist']);

function shannonEntropy(s) {
  const freq = Object.create(null);
  for (const ch of s) freq[ch] = (freq[ch] || 0) + 1;
  let e = 0;
  const n = s.length;
  for (const k in freq) { const p = freq[k] / n; e -= p * Math.log2(p); }
  return e;
}

/** A value that really looks like a random secret, not prose, a version, or a placeholder. */
function looksLikeSecretValue(v) {
  if (!/^[A-Za-z0-9_\-/+=.]{20,}$/.test(v)) return false;
  if (/PLACEHOLDER|example|your[_-]?|xxxx|changeme|<|>/i.test(v)) return false;
  if (/^[0-9.]+$/.test(v)) return false; // pure numbers / versions / ids
  return shannonEntropy(v) >= 3.0;
}

/** Scan one file's text; return [{ line, snippet, why }] (value truncated to 6 chars). */
function scanTextForSecrets(text) {
  const out = [];
  const lines = String(text).split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.length > 4000) continue;      // skip minified / data lines
    if (/PLACEHOLDER/i.test(line)) continue;
    let cand = null;
    let why = null;
    for (const p of SECRET_PREFIX_PATTERNS) {
      p.re.lastIndex = 0;
      const m = p.re.exec(line);
      if (m) { cand = m[0]; why = p.why; break; }
    }
    if (!cand) {
      const m = SECRET_ASSIGN_RE.exec(line);
      if (m && looksLikeSecretValue(m[2])) { cand = m[2]; why = 'a key-like value'; }
    }
    if (!cand) {
      const m = SECRET_NEAR_RE.exec(line);
      if (m && shannonEntropy(m[1]) >= 3.5) { cand = m[1]; why = 'a long high-entropy string near a secret word'; }
    }
    if (cand) out.push({ line: i + 1, snippet: String(cand).slice(0, 6) + '...', why });
  }
  return out;
}

async function checkSecrets(ctx) {
  const root = ctx.root;
  const findings = [];
  const reportPaths = [];
  const MAX = 50; // never flood the report

  // Where to look: every business folder + shared/. Machinery, .env (the
  // sanctioned home), state/snapshot/backup dirs, and dev trees are excluded.
  const scanRoots = [];
  try { for (const b of paths.listBusinesses(root)) scanRoots.push(b); } catch (_) { /* none */ }
  if (existsDir(path.join(root, 'shared'))) scanRoots.push('shared');

  const scanFile = (abs, rel) => {
    if (findings.length >= MAX) return;
    if (paths.isEnvFile(rel)) return;                 // the sanctioned secrets home
    if (paths.isMachinePath(root, rel)) return;        // machine set (e.g. system/creative-library)
    const ext = (rel.match(/\.[^./]+$/) || [''])[0].toLowerCase();
    if (ext && !SECRET_TEXT_EXT.has(ext)) return;      // only text files (extensionless allowed)
    let text = null;
    try {
      if (fs.statSync(abs).size > 1024 * 1024) return; // skip large files
      text = fs.readFileSync(abs, 'utf8');
    } catch (_) { return; }
    if (/[\u0000\uFFFD]/.test(text)) return;         // looks binary
    const hits = scanTextForSecrets(text);
    if (hits.length) {
      reportPaths.push(rel);
      const h = hits[0];
      findings.push(finding('yellow',
        'A file may hold a secret in the wrong place',
        rel + ' line ' + h.line + ' looks like ' + h.why + ' (' + h.snippet + ')' +
          (hits.length > 1 ? ', and ' + (hits.length - 1) + ' more line(s) in the same file' : ''),
        'If that is a real key or password, move it into this business\'s private .env file — the one place secrets belong — and delete it here. If it is not a secret, you can ignore this.'));
    }
  };

  const walk = (dir, rel) => {
    if (findings.length >= MAX) return;
    let dirents;
    try { dirents = fs.readdirSync(dir, { withFileTypes: true }); } catch (_) { return; }
    for (const d of dirents) {
      const childRel = rel + '/' + d.name;
      if (d.isDirectory()) {
        if (SECRET_SKIP_DIRS.has(d.name) || d.name.charAt(0) === '.') continue;
        if (paths.isMachinePath(root, childRel)) continue;
        walk(path.join(dir, d.name), childRel);
      } else {
        scanFile(path.join(dir, d.name), childRel);
      }
    }
  };

  try {
    for (const top of scanRoots) walk(path.join(root, top), top);
  } catch (_) { /* a scan hiccup must never crash the Doctor */ }

  const sec = findings.length
    ? section('secrets', 'Secrets in the right place', findings)
    : section('secrets', 'Secrets in the right place', [finding('green', 'No secrets found in the wrong place')]);
  // Paths only (never values) for the privacy-safe support report.
  sec.paths = reportPaths;
  return sec;
}

/* ------------------------------- runner --------------------------------- */

/**
 * runChecks(ctx) -> { sections, manifestDiff }
 * ctx: { root, flags }. Runs all twelve checks in order.
 */
/**
 * 13. Publishing (Build Doc P5.3/P5.5). ALL DETECTIVE: the standing view of
 * which channels are LIVE right now, contradictions the resolver refuses to
 * act on, receipts that claim live against a safe setting, staged copies left
 * behind, receipts with no recorded attempt, and channels whose recent
 * attempts keep going nowhere. Nothing here blocks anything; it names things
 * where the owner reads them.
 */
async function checkPublishing(ctx) {
  const root = ctx.root;
  const findings = [];
  const publishing = require('./publishing.js');
  const logbookLib = require('./logbook.js');
  let businesses = [];
  try { businesses = paths.listBusinesses(root); } catch (_) { businesses = []; }

  // (a) The live highlight — currently-live channels only, never a mode dump.
  const liveBits = [];
  const contradictions = [];
  const unanswerable = [];
  const problemRows = [];
  for (const b of businesses) {
    let rows = [];
    try { rows = publishing.enumerateModes(root, b); } catch (_) { rows = []; }
    for (const r of rows) {
      // A null-channel row is enumerateModes saying setup.md itself cannot
      // answer (a link, unreadable) — that is a RED problem, not something to
      // skip on the way to a green "settings look right".
      if (r.channel === null) {
        unanswerable.push(b + ': ' + (r.reason || (r.problems || []).join('; ') || 'setup.md cannot be judged'));
        continue;
      }
      if (r.mode === 'explicit-live') liveBits.push(b + ' ' + r.channel);
      // Only an entry that actually CLAIMS live contradicts support's fixed
      // safety; any other problem row (a duplicate Provider, say) is a plain
      // entry problem and must not be reported as a live claim.
      if (r.channel === 'support' && (r.problems || []).some((p) => /says\s+`?live`?/i.test(p))) {
        contradictions.push(b + ': ' + r.problems.join('; '));
      }
      // A named channel's entry can carry a problem that is neither an
      // unanswerable setup.md nor a live claim — a duplicate destination, a
      // bad Route, a malformed value. Those never surfaced anywhere: an
      // unanswered channel with a broken entry stayed silent. Dedup: the
      // support live-contradiction string is already reported above, so it is
      // the ONE problem excluded here — a support row's OTHER problems (a
      // duplicate destination, say) still get their own line below.
      const rowProblems = (r.problems || []).filter((p) =>
        !(r.channel === 'support' && /says\s+`?live`?/i.test(p)));
      if (rowProblems.length) problemRows.push(b + ' ' + r.channel + ': ' + rowProblems[0]);
    }
  }
  if (unanswerable.length) {
    findings.push(finding('red', 'A setup.md cannot answer for its business',
      unanswerable.join(' | ') + ' — publishing questions have no trustworthy answer while this file is a ' +
      'link or unreadable, so every channel there is effectively ask-first.',
      'Make setup.md an ordinary readable file again (remove the link, restore the file), then run the Doctor again.'));
  }
  if (liveBits.length) {
    findings.push(finding('yellow', 'Publishing is set to LIVE for: ' + liveBits.join(', '),
      'Approved work on a live channel goes out for real (or onto a real schedule) after your yes. ' +
      'This is your choice working — and the standing reminder of where it is switched on.',
      'To change one, say "set that channel back to safe-state" and the setting is updated for you.'));
  }
  if (contradictions.length) {
    findings.push(finding('yellow', 'setup.md claims live for customer support', contradictions.join(' | ') +
      ' — support has no live mode; replies are always drafts you send yourself.',
      'Change that line to safe-state so the file matches what actually happens.'));
  }
  if (problemRows.length) {
    findings.push(finding('yellow', 'setup.md has entries with problems', problemRows.join(' | '),
      'Open setup.md and fix the named entry. Where a problem affects permission, route, or ' +
      'destination, GrowOS treats it as unanswered.'));
  }

  // (b) Receipts vs settings, and receipts with no recorded attempt. Only
  // APPROVED items: a published item's receipt is history; an approved one
  // claiming LIVE against a safe setting needs eyes now (the guard denies the
  // flip in exactly this state).
  const liveClaims = [];
  const silentReceipts = [];
  const mismatchedReceipts = [];   // an attempt WAS recorded; it disagrees with the receipt
  for (const b of businesses) {
    let events = [];
    try {
      events = logbookLib.readAll(root, b).entries.filter((e) => e.event === 'publish-attempt');
    } catch (_) { events = []; }
    // Per item id: the timestamp of the LAST recorded attempt. An id-level set
    // was a lifetime pass — one old blocked event silenced every later silent
    // attempt. The receipt's own publish_attempted_at is
    // compared against this, so a newer unrecorded attempt is surfaced.
    // The LAST APPENDED event, not the highest timestamp: the logbook is
    // append-only and readAll returns file order, which is the order things
    // actually happened. Picking the maximum ts let a clock that stepped
    // BACKWARDS between two attempts hand the verdict to the older one — a
    // false warning on an item that did go live, and a false silence in the
    // approved branch below. The ts is still kept, for
    // the receipt-is-newer comparison.
    const lastEvent = new Map(); // id -> { ts, outcome } of the LAST recorded event
    for (const e of events) {
      if (!e.id) continue;
      const t = Date.parse(e.ts || '');
      lastEvent.set(e.id, { ts: Number.isFinite(t) ? t : 0, outcome: String(e.outcome || '') });
    }
    for (const entry of walkAll(path.join(root, b, 'work'))) {
      if (entry.isDir || !/\.md$/i.test(entry.name)) continue;
      const rel = b + '/work/' + entry.rel;
      if (!paths.isWorkItem(root, rel)) continue;
      let text = null;
      try { text = fs.readFileSync(entry.abs, 'utf8'); } catch (_) { continue; }
      const status = fm.getField(text, 'status');
      const state = fm.getField(text, 'publish_state');
      if (state === undefined || state === '') continue;
      const id = fm.getField(text, 'id');
      if (status === 'approved') {
        if (state === 'live') {
          let mode = 'unanswered';
          try { mode = publishing.resolveMode(root, entry.abs).mode; } catch (_) { mode = 'unanswered'; }
          if (mode !== 'explicit-live') liveClaims.push(rel);
        }
        if (id) {
          const last = lastEvent.get(id);
          if (last === undefined) silentReceipts.push(rel);
          else {
            // Recorded once, but the receipt says a LATER attempt happened.
            // Small slack: the publisher writes the receipt and the event
            // seconds apart, in either order. An UNPARSEABLE attempt time is
            // its own finding, not a silent skip.
            const rawAt = fm.getField(text, 'publish_attempted_at') || '';
            const attempted = Date.parse(rawAt);
            if (!Number.isFinite(attempted)) {
              silentReceipts.push(rel + ' (its publish_attempted_at is not a time this check can read: ' +
                JSON.stringify(rawAt) + ')');
            } else if (attempted > last.ts + 5 * 60 * 1000) silentReceipts.push(rel);
            // A `live` receipt whose LAST recorded attempt did not go live is the
            // same contradiction the published branch below flags — an approved
            // item carrying publish_state:live with a blocked/failed attempt says
            // one thing while the logbook says another.
            else if (state === 'live' && last.outcome !== 'live-now' && last.outcome !== 'live-scheduled') {
              mismatchedReceipts.push(rel + ' (the last recorded attempt says "' + last.outcome + '")');
            }
          }
        }
      } else if (status === 'published' && state === 'live') {
        // A published live claim needs its LAST recorded event to actually
        // SAY live — a months-old blocked event is not a record of this
        // publish. Scoped to `live` so imported 0.1
        // histories (no live mode, no logbook) stay quiet.
        if (id) {
          const last = lastEvent.get(id);
          if (last === undefined) silentReceipts.push(rel);
          else if (last.outcome !== 'live-now' && last.outcome !== 'live-scheduled') {
            // Its own finding, not the silent-receipt one: an event WAS
            // recorded here, and saying "no event was recorded" about a
            // recorded event is the report contradicting itself. `live`
            // covers both live-now and live-scheduled by
            // design — the receipt states one live state, not which.
            mismatchedReceipts.push(rel + ' (the last recorded attempt says "' + last.outcome + '")');
          }
        }
      }
    }
  }
  if (liveClaims.length) {
    findings.push(finding('red', 'A receipt claims a LIVE publish on a channel that is not set live',
      liveClaims.join(', ') + ' — either an outside write happened without the setting authorising it, ' +
      'or the receipt is wrong. The item is still approved, so nothing in the queue moved.',
      'Check the destination yourself, then decide: fix the receipt, or set the channel live and re-run ' +
      'the publish step.'));
  }
  if (silentReceipts.length) {
    findings.push(finding('yellow', 'A publish attempt left a receipt but no record of how it went',
      silentReceipts.join(', ') + ' — the item carries receipt fields, but no publish-attempt event was ' +
      'recorded, so there is no saying whether this was a broken connection or a choice.',
      'Have the publisher record it: growos publish-event --item <path> ... (the publisher standard ' +
      'lists the reason codes).'));
  }
  if (mismatchedReceipts.length) {
    findings.push(finding('yellow', 'A receipt says the work went live, but the recorded attempt says otherwise',
      mismatchedReceipts.join(', ') + ' — the attempt WAS recorded; what it recorded does not agree with ' +
      'the receipt on the item. One of the two is wrong.',
      'Check the destination yourself, then fix whichever is wrong: correct the receipt on the item, or ' +
      'have the publisher record the attempt again with growos publish-event.'));
  }

  // (c) Staged copies exist for ONE verified upload, then get released.
  const stale = [];
  const now = Date.now();
  for (const b of businesses) {
    const base = path.join(root, b, '.state', 'staging');
    let names = [];
    try { names = fs.readdirSync(base); } catch (_) { names = []; }
    for (const n of names) {
      try {
        const st = fs.statSync(path.join(base, n));
        if (now - st.mtimeMs > 7 * DAY_MS) stale.push(b + '/.state/staging/' + n);
      } catch (_) { /* vanished mid-check: nothing to report */ }
    }
  }
  if (stale.length) {
    findings.push(finding('yellow', 'Old staged publish copies are still on disk', stale.join(', ') +
      ' — a staging folder holds verified copies for one upload and is released right after it.',
      'Run: growos publish-stage --item <the item> --release (or delete the folder).'));
  }

  // (d) A channel whose last three attempts all went nowhere.
  const trendBits = [];
  for (const b of businesses) {
    let events = [];
    try {
      events = logbookLib.readAll(root, b).entries.filter((e) => e.event === 'publish-attempt');
    } catch (_) { events = []; }
    const byChannel = {};
    for (const e of events) { if (e.channel) (byChannel[e.channel] = byChannel[e.channel] || []).push(e); }
    for (const c of Object.keys(byChannel)) {
      const last = byChannel[c].slice(-3);
      if (last.length === 3 &&
          last.every((e) => e.outcome === 'blocked' || e.outcome === 'needs-verification')) {
        const reasons = Array.from(new Set(last.map((e) => e.reason_code).filter(Boolean)));
        trendBits.push(b + ' ' + c + ' (' + reasons.join(', ') + ')');
      }
    }
  }
  if (trendBits.length) {
    findings.push(finding('yellow', 'Publishing keeps not landing on a channel', trendBits.join(' | ') +
      ' — the last three attempts were blocked or could not be verified.',
      'The reason codes say why; fix the connection, or switch that channel\'s Route to manual in setup.md.'));
  }

  // (e) The mode-change watcher's memory. A missing state file is normal on a
  // fresh install (the first observation baselines silently) — but once a
  // mode CHANGE has been recorded, the state file existed; its absence now
  // means something deleted it, and the next observation would re-baseline
  // silently, hiding a change. Named, never guessed at.
  {
    const statePath = path.join(root, '.growos', 'publish-modes.json');
    // The judgment is PER BUSINESS: `{"businesses":{}}`
    // parses fine and still means every business re-baselines silently, so
    // "the file parses" is not the test — "each business that recorded a
    // change still has its memory" is.
    let stateBiz = null;
    try {
      let raw = fs.readFileSync(statePath, 'utf8');
      if (raw.charCodeAt(0) === 0xfeff) raw = raw.slice(1);
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object' && parsed.businesses &&
          typeof parsed.businesses === 'object') stateBiz = parsed.businesses;
    } catch (_) { stateBiz = null; }
    {
      let hadChanges = false;
      for (const b of businesses) {
        try {
          if (logbookLib.readAll(root, b).entries.some((e) => e.event === 'publish-mode-change') &&
              (stateBiz === null || !stateBiz[b] || typeof stateBiz[b] !== 'object')) { hadChanges = true; break; }
        } catch (_) { /* an unreadable logbook is checkRecords' finding */ }
      }
      if (hadChanges) {
        findings.push(finding('yellow', 'The publishing watcher\'s memory is missing',
          '.growos/publish-modes.json is gone or unreadable, but mode changes were recorded before — ' +
          'the next observation will silently treat whatever it sees as the baseline, so a change made ' +
          'in the meantime would not be reported.',
          'Check setup.md\'s current "How far to go" lines yourself once, then carry on — the next ' +
          'observation rebuilds the memory from what it sees.'));
      }
    }
  }

  if (!findings.length) {
    findings.push(finding('green', 'Publishing settings and receipts look right',
      'No live channels to flag, no contradictions, no unrecorded receipts, no stale staged copies.',
      'none'));
  }
  return { key: 'publishing', title: 'Publishing', findings };
}

async function runChecks(ctx) {
  const sections = [];
  let manifestDiff = null;

  sections.push(await checkNode(ctx));
  sections.push(await checkFolders(ctx));
  sections.push(await checkCharter(ctx));
  const m = await checkMachineIntegrity(ctx);
  sections.push(m.section);
  manifestDiff = m.diff;
  sections.push(await checkGuards(ctx));
  sections.push(await checkItems(ctx));
  sections.push(await checkQueue(ctx));
  sections.push(await checkBrainUpkeep(ctx));
  sections.push(await checkBrainLinks(ctx));
  sections.push(await checkTwinParity(ctx));
  sections.push(await checkGuardTrust(ctx));
  sections.push(await checkSyncDamage(ctx));
  sections.push(await checkRecords(ctx));
  sections.push(await checkPublishing(ctx));
  sections.push(await checkSecrets(ctx));

  return { sections, manifestDiff };
}

/* --------------------------- support report ----------------------------- */

function hashSeg(s) {
  return crypto.createHash('sha256').update(String(s)).digest('hex').slice(0, 8);
}
const KEEP_TOP = new Set([
  'system', 'shared', '.claude', '.codex', '.agents', '.obsidian', '.growos', '.backups',
  '_quarantine', 'START HERE.md', 'AGENTS.md', 'CLAUDE.md', 'GrowOS Queue.base',
]);
/** Replace business names and any segment beyond the top level with hashes. */
function sanitizePath(rel) {
  const segs = String(rel).split('/');
  segs[0] = KEEP_TOP.has(segs[0]) ? segs[0] : hashSeg(segs[0]);
  for (let i = 1; i < segs.length; i++) segs[i] = hashSeg(segs[i]);
  return segs.join('/');
}

function worstOf(findings) {
  let w = 'green';
  for (const f of findings) {
    if (f.level === 'red') return 'red';
    if (f.level === 'yellow') w = 'yellow';
  }
  return w;
}

/**
 * Build the privacy-safe support report text. Business names, headlines, and
 * path segments beyond the top level are replaced with short sha256 hashes so
 * the file is safe to send to support.
 */
function buildSupportReport(ctx, sections, manifestDiff) {
  const root = ctx.root;
  let version = 'unknown';
  try { version = fs.readFileSync(path.join(root, 'system', 'VERSION'), 'utf8').trim(); } catch (_) { /* */ }
  const os = require('os');

  const lines = [];
  lines.push('# GrowOS support report');
  lines.push('');
  lines.push('Business names and file paths in this report are replaced with short hashes on');
  lines.push('purpose, so this file is safe to share. No names, headlines, or content leak.');
  lines.push('');
  lines.push('## Environment');
  lines.push('- GrowOS version: ' + version);
  lines.push('- Platform: ' + process.platform + ' (' + os.type() + ' ' + os.release() + ')');
  lines.push('- Architecture: ' + process.arch);
  lines.push('- Node: ' + process.versions.node);
  lines.push('- Generated: ' + new Date().toISOString());
  lines.push('');
  lines.push('## Checks');
  lines.push('');
  lines.push('| Check | Result | Findings |');
  lines.push('|---|---|---|');
  for (const s of sections) {
    lines.push('| ' + s.title + ' | ' + worstOf(s.findings) + ' | ' + s.findings.length + ' |');
  }
  lines.push('');
  lines.push('## Machine file differences (paths hashed)');
  if (!manifestDiff) {
    lines.push('- No file list to compare (system/manifest.json is not present).');
  } else {
    const block = (label, list) => {
      lines.push('- ' + label + ': ' + list.length);
      for (const p of list) lines.push('  - ' + sanitizePath(p));
    };
    block('missing or damaged', manifestDiff.missing);
    block('changed', manifestDiff.changed);
    block('extra', manifestDiff.extra);
  }
  lines.push('');

  // Possible-secret findings: PATHS ONLY (hashed), never the value or the line —
  // the support report must never carry even a truncated secret.
  const secrets = sections.find((s) => s.key === 'secrets');
  const secretPaths = (secrets && Array.isArray(secrets.paths)) ? secrets.paths : [];
  lines.push('## Files that may hold a secret (paths hashed, no values)');
  lines.push('- flagged files: ' + secretPaths.length);
  for (const p of secretPaths) lines.push('  - ' + sanitizePath(p));
  lines.push('');

  return lines.join('\n');
}

module.exports = {
  runChecks,
  buildSupportReport,
  // exported for focused tests / reuse
  MACHINE_COVERED_ROOTS,
  REQUIRED_BRAIN_FILES,
  REQUIRED_BRAIN_DIRS,
  REQUIRED_BRAIN_READMES,
  CHECKS_UNINDEXED_ASSETS,
  INBOX_STALE_DAYS,
  sanitizePath,
};
