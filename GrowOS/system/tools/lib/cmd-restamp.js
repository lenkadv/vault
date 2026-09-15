'use strict';

/**
 * cmd-restamp.js — the `restamp` command (Build Doc P3.2).
 *
 *   node system/tools/growos.js restamp --from acme --to acme-ltd [--yes] [--json]
 *
 * WHAT BREAKS
 *
 * `business` is a frozen field, and the guard denies any write whose `business`
 * disagrees with the folder the file sits in. So renaming a business folder — a
 * rebrand, or fixing a setup typo — freezes every item that business ever made:
 * the field says the old name, the folder says the new one, and no ordinary write
 * can reconcile them, because changing that field is exactly what is frozen. The
 * AI is told why each write failed, so it is not silent; what was missing is a
 * way out.
 *
 * WHY THE OWNER SUPPLIES THE OLD NAME
 *
 * Because nothing can work it out. A renamed folder and a folder holding one file
 * copied in from another business are byte-identical — every item disagrees with
 * the folder in exactly the same way. Any heuristic here would be a guess about
 * which of two histories happened, and being wrong means writing one client's
 * identity onto another's work. So the Doctor spots the mismatch and prints the
 * exact command; the owner runs it.
 *
 * WHAT IT TOUCHES: every work item in the business, plus BOTH snapshot forms —
 * `.snapshots/<id>.md` (the frozen original) and `.snapshots/<id>.approved.md`
 * (what the owner said yes to) — because an item whose snapshot still carries the
 * old name is desynced from its own history, which is the thing freezing exists
 * to prevent. Only the one `business:` line changes in each; `fm.setField`
 * rewrites exactly that line and leaves every other byte alone.
 *
 * HISTORY IS APPENDED TO, NEVER REWRITTEN. The logbook's old events name the old
 * paths, and they still will afterwards: those events are evidence of what
 * happened, and editing them to look tidy would be falsifying the record. One
 * `restamped` event is appended saying what changed and from what.
 *
 * EVERYTHING GOES THROUGH THE OPERATION RUNNER, in ONE job: compare-and-swap on
 * every file, a journalled pre-image of each, and all-or-nothing — with the one
 * honest exception the runner documents: a rollback can REFUSE a file the owner
 * has changed since, so an install CAN end up partly restamped. What is
 * guaranteed is that it is never left in a state nobody described, and that
 * running this again picks up from wherever it got to: an item already carrying
 * the new name is not a disagreement, it is a job half done.
 *
 * IT REFUSES RATHER THAN GUESSES, on: a `--to` that is not a real business folder
 * or is spelled differently from it, a `--from` that is not what the items
 * unanimously say, mixed names, either name already owned elsewhere, an item with
 * no frontmatter or no `business`, two items sharing one id (they share a
 * snapshot), a snapshot that disagrees with its item, and any file that changed
 * since the plan was worked out.
 *
 * THE HONEST NOTE (Build Doc P3.2). Like every `growos.js` command, the AI can
 * invoke this — the guard lets the product's own tool run (item-hook.js). The
 * preview, the refusals and the journal bound the damage; "the owner runs it" is
 * prose, not a code-enforced boundary.
 *
 * PRODUCT code: Node >= 18, stdlib only, no npm, no shelling out. Windows-safe.
 */

const fs = require('fs');
const path = require('path');
const { makeReporter } = require('./report.js');
const paths = require('./paths.js');
const ops = require('./operations.js');
const fm = require('./fm.js');
const ids = require('./ids.js');
const logbook = require('./logbook.js');

/**
 * Every work item in a business, as POSIX paths relative to the business folder.
 * The SPEC section 4 rule is `paths.isWorkItem`, the ONE definition — a `.md`
 * under `work/` outside sidecar space (underscore parts folders, underscore
 * briefs, the shipped `work/README.md`). This walker used to carry its own
 * copy of the exemptions, which is how it and the Doctor came to disagree
 * about a deliverable's part files.
 */
function workItems(root, business) {
  const out = [];
  const base = path.join(String(root), business, 'work');
  const walk = (absDir, rel) => {
    let dirents;
    try {
      dirents = fs.readdirSync(absDir, { withFileTypes: true });
    } catch (err) {
      // An absent work/ is normal — a business may not have made anything yet.
      // Anything ELSE (a permission, a lock, a sync placeholder) must NOT reduce
      // quietly to "no items in there": that made restamp report success while
      // leaving a whole channel frozen, which is silence reading as health.
      if (err && err.code === 'ENOENT' && rel === '') return;
      if (err && err.code === 'ENOENT') return;
      throw new Error('could not read ' + business + '/work/' + rel + ': ' +
        (err && err.message ? err.message : String(err)));
    }
    for (const d of dirents.slice().sort((a, b) => (a.name < b.name ? -1 : 1))) {
      const childRel = rel ? rel + '/' + d.name : d.name;
      if (d.isDirectory()) {
        // An underscore folder is a deliverable's parts (paths.isWorkSidecar);
        // nothing in it is an item, so the walk does not even enter it. This
        // skip is REDUNDANT with the isWorkItem filter below — a probe proves
        // removing it changes nothing — and it stays as the cheap statement of
        // intent; the filter on paths.isWorkItem is the authoritative check.
        if (!d.name.startsWith('_')) walk(path.join(absDir, d.name), childRel);
        continue;
      }
      if (!d.isFile()) continue;
      if (!/\.md$/i.test(d.name)) continue;
      if (!paths.isWorkItem(root, business + '/work/' + childRel)) continue;
      out.push('work/' + childRel);
    }
  };
  walk(base, '');
  return out;
}

// The guard's own list, shared (item-fields.js). Restamp's job is to leave
// items the guard will handle normally; a key set narrower than the guard's
// meant an item with `Headline:` was restamped and reported cured while every
// later AI edit to it stayed refused — with nothing telling the owner why.
const { CORE_KEYS } = require('./item-fields.js');

/**
 * A duplicated or mis-cased core key, or null.
 *
 * Both break the same way and the guard refuses both for the same reason:
 * `fm.setField` rewrites the FIRST matching line while a real YAML reader takes
 * the LAST, and `Status:` is a different key to this engine and the same one to
 * YAML. Correcting such a file would report success and leave it saying the old
 * name to everything that matters. Applied to items AND to snapshots — the
 * snapshot had no check at all, which is the same defect one file along.
 */
function coreKeyProblem(text) {
  const keys = fm.fieldKeys(text);
  const seen = Object.create(null);
  for (const k of keys) {
    if (seen[k]) {
      return 'has more than one "' + k + '" line, and a correction would rewrite the first while YAML reads the last';
    }
    seen[k] = true;
    const lower = k.toLowerCase();
    if (lower !== k && CORE_KEYS.indexOf(lower) !== -1) {
      return 'has a mis-cased "' + k + '" line, which this reads as a different field from "' + lower + '" and YAML does not';
    }
  }
  return null;
}

/**
 * A doubled or mis-cased `business` line — the one ambiguity that can hide
 * which name an item claims. Used by the ownership scan, which reads OTHER
 * businesses' items and has no right to refuse over problems that cannot
 * affect its one question.
 */
function businessLineAmbiguity(text) {
  const keys = fm.fieldKeys(text);
  let seen = false;
  for (const k of keys) {
    if (k === 'business') {
      if (seen) return 'has more than one "business" line, so which name it claims depends on who reads it';
      seen = true;
    } else if (k.toLowerCase() === 'business') {
      return 'has a mis-cased "' + k + '" line, so which name it claims depends on who reads it';
    }
  }
  return null;
}

/**
 * The `business` field of every item in a business, for the ownership scan.
 * Read failures THROW rather than being skipped: an unreadable item is exactly
 * where a name collision could be hiding, and missing it would hand one
 * business's identity to another.
 */
function stampedNames(root, business) {
  const seen = new Set();
  for (const rel of workItems(root, business)) {
    let text;
    try {
      text = fs.readFileSync(path.join(String(root), business, ...rel.split('/')), 'utf8');
    } catch (err) {
      if (err && err.code === 'ENOENT') continue;   // deleted between listing and reading
      throw new Error('could not read ' + business + '/' + rel + ': ' + (err && err.message ? err.message : String(err)));
    }
    // Only ambiguity about the BUSINESS line matters here. This scan asks one
    // question of a stranger's item — what name does it claim? — and a doubled
    // `business:` or a mis-cased `Business:` is exactly what could make the
    // answer depend on who reads it (this engine takes the first line, a YAML
    // reader the last). A doubled `stage:` in that same item cannot, and
    // refusing THIS business's cure over it froze real work — the broad check
    // belongs to the files being corrected, not to the bystanders being read.
    if (fm.parse(text).hasFm) {
      const problem = businessLineAmbiguity(text);
      if (problem) {
        throw new Error(business + '/' + rel + ' ' + problem + ', so it cannot be checked for a name clash');
      }
    }
    const v = fm.getField(text, 'business');
    if (typeof v === 'string' && v !== '') seen.add(v);
  }
  return seen;
}

/**
 * plan(root, from, to) -> { ok, errors, operations, counts }
 *
 * Pure computation against what is on disk right now. Every refusal in the
 * header lives here, and nothing is written. `errors` is a list of plain
 * sentences; the caller prints them all rather than only the first, because an
 * install with three problems should take one round trip, not three.
 */
function plan(root, from, to) {
  const errors = [];
  const fail = (why) => { errors.push(why); return { ok: false, errors, operations: [], counts: null }; };

  /* ---- both names are plain slugs, not paths ---- */
  for (const [label, name] of [['--from', from], ['--to', to]]) {
    if (typeof name !== 'string' || name.trim() === '') return fail(label + ' is missing.');
    const problem = ops.businessProblem(name);
    if (problem) return fail(label + ' must be a plain business name, not a path: ' + problem + '.');
  }
  if (from === to) return fail('--from and --to are the same name, so there is nothing to change.');

  /* ---- --to is a real business folder, spelled exactly like it ---- */
  let businesses;
  try { businesses = paths.listBusinesses(root); } catch (err) {
    return fail('Could not read the install folder: ' + (err && err.message ? err.message : String(err)));
  }
  if (businesses.indexOf(to) === -1) {
    // Case and Unicode aliases are called out separately: the guard compares the
    // field to the folder name with ===, so restamping to a merely equivalent
    // spelling would report success and leave every item just as frozen.
    const alias = businesses.find((b) => ops.sameFileKey(b) === ops.sameFileKey(to));
    if (alias) {
      return fail('--to is spelled "' + to + '" but the folder is "' + alias + '". They have to match exactly, ' +
        'because that is how the guard compares them. Use --to "' + alias + '".');
    }
    return fail('"' + to + '" is not a business folder on this install. ' +
      (businesses.length ? 'This install has: ' + businesses.join(', ') + '.' : 'This install has no business folders.'));
  }

  // ...and the folder really is that folder, not a link wearing its name.
  //
  // NOTHING IS BOUND TO THIS TODAY, and saying so is more useful than a test
  // that appears to prove it. `listBusinesses` reads dirents with lstat
  // semantics, so a symlinked top-level folder is never a business in the first
  // place and can never reach this line — a mutation probe removing it changed
  // no outcome. It stays as defence in depth for the day that enumerator learns
  // to follow a link, which is exactly the "a machine-class NAME is not a
  // DESTINATION" class that recurred through Phase 2. Do not weaken
  // listBusinesses believing this line covers it: it is second, not first.
  const home = path.join(path.resolve(String(root)), to);
  const realHome = paths.realpathBestEffort(home);
  if (path.basename(realHome) !== to) {
    return fail('The folder "' + to + '" really resolves to "' + realHome + '", so it is not the folder it looks like. ' +
      'Sort that out before restamping anything.');
  }

  /* ---- neither identity is already owned somewhere else ---- */
  //
  // Compared on sameFileKey, not on ===. macOS and Windows open `Acme` and
  // `acme` as ONE folder, so exact equality let the "the old name is still a
  // live business" refusal be walked straight past on both filesystems this
  // product treats as first-class.
  const ownsFrom = businesses.find((b) => ops.sameFileKey(b) === ops.sameFileKey(from));
  if (ownsFrom !== undefined) {
    return fail('"' + ownsFrom + '" is still a business folder on this install, so "' + from + '" has not been ' +
      'renamed — it is a business of its own. Moving its name onto "' + to + '" is not a cure for anything.');
  }
  for (const other of businesses) {
    if (other === to) continue;
    let theirs;
    try { theirs = stampedNames(root, other); } catch (err) {
      return fail('Could not check whether "' + other + '" already owns one of these names: ' +
        (err && err.message ? err.message : String(err)) + '. Nothing was changed.');
    }
    for (const claimed of [from, to]) {
      for (const t of theirs) {
        if (ops.sameFileKey(t) !== ops.sameFileKey(claimed)) continue;
        return fail('Business "' + other + '" already has work stamped "' + t + '", so that name is not free. ' +
          'Restamping would give two businesses the same identity.');
      }
    }
  }

  /* ---- the items: read ONCE, and everything below uses that read ---- */
  //
  // One read per file, kept. Validating one read and then building the operation
  // from a SECOND read means the bytes that get written were never the bytes
  // that were checked: an edit landing between the two would be approved on the
  // strength of the first and rewritten on the strength of the second, with
  // compare-and-swap seeing nothing wrong because the expected hash came from
  // the second read as well.
  let items;
  try { items = workItems(root, to); } catch (err) {
    return fail((err && err.message ? err.message : String(err)) + '. Nothing was changed.');
  }
  const found = new Map();     // business value -> [{ rel, text, id }]
  const idsSeen = new Map();   // id -> [rel]
  const bad = [];
  const notItems = [];         // no frontmatter: a part file, or damage — see below
  for (const rel of items) {
    const abs = path.join(String(root), to, ...rel.split('/'));
    let text;
    try { text = fs.readFileSync(abs, 'utf8'); } catch (err) {
      if (err && err.code === 'ENOENT') continue;    // vanished between listing and reading
      bad.push(rel + ' could not be read (' + (err && err.message ? err.message : String(err)) + ')');
      continue;
    }
    // A `.md` under work/ with NO frontmatter is not necessarily broken. The
    // master requirements allow a deliverable's parts — drafts, metadata, a
    // voiceover script — to live in a sub-folder beside it that never enters the
    // queue, and those carry no label block. Refusing the whole job on one would
    // block this cure on exactly the installs most likely to need it. There is
    // no canonical sidecar-folder predicate yet (Phase 4 P4.1 defines it), so
    // these are left alone and REPORTED rather than silently passed over: if one
    // of them is a work item that lost its frontmatter, the Doctor calls that
    // red on its own.
    if (!fm.parse(text).hasFm) { notItems.push(rel); continue; }

    // From here it carries a label block, so it is an item and its fields are
    // held to the item model.
    const keyProblem = coreKeyProblem(text);
    if (keyProblem) { bad.push(rel + ' ' + keyProblem); continue; }
    const biz = fm.getField(text, 'business');
    if (biz === undefined || biz === '') { bad.push(rel + ' has no business field'); continue; }
    const id = fm.getField(text, 'id');
    if (id === undefined || id === '') { bad.push(rel + ' has no id, so its snapshots cannot be found'); continue; }
    if (!ids.isId(id)) {
      bad.push(rel + ' has an id ("' + id + '") that is not a GrowOS id, so its history cannot be matched up');
      continue;
    }
    if (!found.has(biz)) found.set(biz, []);
    found.get(biz).push({ rel, text, id, business: biz });
    if (!idsSeen.has(id)) idsSeen.set(id, []);
    idsSeen.get(id).push(rel);
  }
  if (bad.length) {
    errors.push('Some items are not in a shape this can correct, so nothing was changed: ' + bad.join('; ') + '.');
  }
  for (const [id, where] of idsSeen) {
    if (where.length > 1) {
      errors.push('Two items share the id "' + id + '" (' + where.join(', ') + '), so they also share a snapshot. ' +
        'Give one of them a new id first.');
    }
  }
  // `from` and `to` are the two names this run is correcting BETWEEN, so an item
  // already carrying `to` is not a disagreement — it is a job half done, which
  // is exactly what a refused rollback leaves behind. Refusing that as "mixed
  // names" made the promise in the error report ("run it again; it picks up from
  // wherever it got to") untrue. A THIRD name is still a real disagreement and
  // is still refused.
  const strangers = [...found.keys()].filter((k) => k !== from && k !== to);
  if (strangers.length) {
    const spellings = [...found.keys()].sort().map((k) => '"' + k + '" (' + found.get(k).length + ')').join(', ');
    errors.push('The items do not agree on one name — they say ' + spellings + '. ' +
      'This corrects "' + from + '" to "' + to + '" and will not pick between others.');
  } else if (found.size === 0) {
    /* nothing stamped at all: handled below */
  } else if (!found.has(from) && !found.has(to)) {
    errors.push('--from says "' + from + '" but every item says "' + [...found.keys()][0] + '".');
  }
  if (errors.length) return { ok: false, errors, operations: [], counts: null, notItems };

  // No early return for a business with no stamped items: the pointer-stub
  // pass below still applies (a business can have a migrated library and no
  // work yet), so the flow continues with empty item/snapshot sets and
  // `empty` is carried on the final result instead.

  // Every item may ALREADY say the new name — a second run, or a first run whose
  // items landed and whose snapshots did not. That is not an error and must not
  // be treated as one: refusing here left a stale snapshot permanently
  // unreachable, because the only command that could fix it declined to look.
  // The snapshot pass below runs either way; if it finds nothing, the job is a
  // clean no-op.
  // Both groups are walked: the ones still saying `from` get corrected, and the
  // ones already saying `to` are still checked for a stale snapshot.
  const toFix = found.get(from) || [];
  const done = found.get(to) || [];
  const already = toFix.length === 0;
  const pending = toFix.concat(done);

  /* ---- the snapshots: both forms, per item ---- */
  const operations = [];
  const snapRels = [];
  for (const it of pending) {
    if (it.business === from) {
      operations.push({
        business: to, path: it.rel, verb: 'replace',
        expect: ops.hashBytes(Buffer.from(it.text, 'utf8')),
        bytes: fm.setField(it.text, 'business', to),
      });
    }

    for (const suffix of ['.md', '.approved.md']) {
      const snapRel = '.snapshots/' + it.id + suffix;
      const snapAbs = path.join(String(root), to, '.snapshots', it.id + suffix);
      let snapText;
      try { snapText = fs.readFileSync(snapAbs, 'utf8'); } catch (err) {
        // An absent snapshot is normal: an item that never reached review has no
        // frozen original, and one approved before this machinery existed may
        // have no approved copy. Requiring them would refuse real installs.
        if (err && err.code === 'ENOENT') continue;
        errors.push(snapRel + ' could not be read (' + (err && err.message ? err.message : String(err)) + ')');
        continue;
      }
      if (!fm.parse(snapText).hasFm) {
        errors.push(snapRel + ' has no frontmatter — it is damaged, so it was not corrected and nothing else was either.');
        continue;
      }
      // The same scrutiny the item got. A snapshot with two `business` lines
      // would have its first rewritten while YAML reads the last, so history
      // keeps saying the old name and the command reports success.
      const snapKeys = coreKeyProblem(snapText);
      if (snapKeys) { errors.push(snapRel + ' ' + snapKeys + ', so correcting it would not stick.'); continue; }
      // A snapshot is filed under an id. If the copy inside says a DIFFERENT id,
      // it is not this item's history, and writing this item's business name
      // into it would file one item's past under another's name.
      const snapId = fm.getField(snapText, 'id');
      if (snapId === undefined || snapId === '') {
        errors.push(snapRel + ' has no id, so there is no way to confirm it is ' + it.rel + "'s history.");
        continue;
      }
      if (snapId !== it.id) {
        errors.push(snapRel + ' contains id "' + snapId + '", so it is not ' + it.rel + '\'s history. ' +
          'Correcting it would file one item\'s past under another item\'s name.');
        continue;
      }
      const snapBiz = fm.getField(snapText, 'business');
      if (snapBiz === to) continue;                    // already correct
      if (snapBiz !== from) {
        // Quoted from the ITEM, not from the flags: an already-restamped item
        // says `to`, and telling the owner it says `from` sends them hunting
        // for a disagreement that does not exist.
        errors.push(snapRel + ' says "' + String(snapBiz) + '" where its item says "' + it.business + '". ' +
          'A snapshot that disagrees with its item is damaged, and correcting it would be guessing which is right.');
        continue;
      }
      operations.push({
        business: to, path: snapRel, verb: 'replace',
        expect: ops.hashBytes(Buffer.from(snapText, 'utf8')),
        bytes: fm.setField(snapText, 'business', to),
      });
      snapRels.push(snapRel);
    }
  }
  if (errors.length) return { ok: false, errors, operations: [], counts: null, notItems };

  /* ---- pointer stubs in the retired shared library ---- */
  //
  // `libraries` then a folder rename is two supported owner jobs, and the
  // stubs it left behind still name the OLD business — so the next libraries
  // run called them damage and the Doctor reported them forever. Curing a
  // rename is this command's whole job; the stubs are part of the rename. A
  // stub is rewritten ONLY when its destination verifies under the new name
  // (libraries.pointerTargetProblem — the same validator the libraries
  // command itself uses), because rewriting an unverifiable one would
  // fabricate a completed move. Anything it cannot fix or check is a WARNING,
  // never silence — but also never a refusal of the rename itself.
  //
  // The verification is PLAN-time: the write is
  // compare-and-swapped on the stub's own bytes, but the target is not
  // re-proven at commit — the same preview-is-not-a-reservation gap every job
  // carries, held to one process's plan-to-apply distance in a --yes run.
  // The `[to]` membership below is sound because this plan has already
  // refused any --to that is not a real business folder.
  const libraries = require('./cmd-libraries.js');
  const stubRels = [];
  const stubWarnings = [];
  {
    const yoursAbs = path.join(String(root), ...libraries.OLD_ROOT.split('/'));
    const scan = (absDir, rel) => {
      let dirents;
      try {
        dirents = fs.readdirSync(absDir, { withFileTypes: true });
      } catch (err) {
        if (err && err.code === 'ENOENT' && rel === '') return;   // no retired folder: nothing to do
        stubWarnings.push('could not check ' + libraries.OLD_ROOT + '/' + rel + ' for pointers to "' + from +
          '": ' + (err && err.message ? err.message : String(err)) + '. Run the doctor after sorting that out.');
        return;
      }
      for (const d of dirents) {
        const childRel = rel ? rel + '/' + d.name : d.name;
        if (d.isDirectory()) { scan(path.join(absDir, d.name), childRel); continue; }
        // A non-file entry earns a warning only when it could HIDE a stale
        // pointer: a pointer-shaped (.md) name, or a link that resolves to a
        // folder (a whole unscanned subtree). Warning on EVERY non-file
        // flagged a linked image an ordinary image would never have earned;
        // the promise is no SILENT skip of anything pointer-shaped, not
        // noise about everything.
        if (!d.isFile()) {
          if (/\.md$/i.test(d.name)) {
            stubWarnings.push(libraries.OLD_ROOT + '/' + childRel + ' is not an ordinary file, so it was not ' +
              'checked for a pointer to "' + from + '". Look at it yourself.');
          } else {
            let hidesTree = false;
            let unstattable = false;
            try { hidesTree = fs.statSync(path.join(absDir, d.name)).isDirectory(); }
            catch (_) { unstattable = true; }
            if (hidesTree) {
              stubWarnings.push(libraries.OLD_ROOT + '/' + childRel + ' is a linked folder, so nothing inside ' +
                'it was checked for pointers to "' + from + '". Look at it yourself.');
            } else if (unstattable) {
              // A stat error is not a harmless image: it means there is no
              // telling WHAT this entry is — a broken or unreadable link could
              // be hiding a whole folder of pointers.
              // Silence promised "nothing pointer-shaped was skipped"; this
              // entry could not even be classified, so it is said out loud.
              stubWarnings.push(libraries.OLD_ROOT + '/' + childRel + ' could not be checked at all (a ' +
                'broken or unreadable link), so there is no telling what it is — it was not checked for ' +
                'pointers to "' + from + '". Look at it yourself.');
            }
          }
          continue;
        }
        if (!/\.md$/i.test(d.name)) continue;
        let text;
        try { text = fs.readFileSync(path.join(absDir, d.name), 'utf8'); } catch (err) {
          stubWarnings.push('could not read ' + libraries.OLD_ROOT + '/' + childRel + ': ' +
            (err && err.message ? err.message : String(err)));
          continue;
        }
        const claimed = libraries.pointerDestination(text);
        if (claimed === null) continue;
        const segs = claimed.split('/');
        if (segs[0] !== from || segs[1] !== 'library' || segs.length < 3) continue;
        const restRel = segs.slice(2).join('/');
        const newClaim = to + '/library/' + restRel;
        if (libraries.pointerTargetProblem(root, newClaim, [to]) !== null) {
          stubWarnings.push(libraries.OLD_ROOT + '/' + childRel + ' points at "' + claimed + '", and nothing ' +
            'verifies at "' + newClaim + '" — it was left alone rather than rewritten into a claim that is ' +
            'not true. Find where that content went, then run the doctor.');
          continue;
        }
        operations.push({
          business: null,
          path: libraries.OLD_ROOT + '/' + childRel,
          verb: 'replace',
          expect: ops.hashBytes(Buffer.from(text, 'utf8')),
          bytes: libraries.pointer(to, restRel),
        });
        stubRels.push(libraries.OLD_ROOT + '/' + childRel);
      }
    };
    scan(yoursAbs, '');
  }

  const counts = { items: toFix.length, snapshots: snapRels.length, stubs: stubRels.length };
  return { ok: true, errors: [], operations, counts, notItems, already, empty: found.size === 0, stubWarnings };
}

/**
 * The correction event, appended to the business's logbook AFTER the job commits.
 *
 * NOT part of the runner job, and that is the point. The logbook is append-only
 * and the guard appends to it from another process; putting it through the
 * runner meant reading it, then writing the WHOLE file back, so any event
 * appended in between was silently destroyed — evidence lost, in the one file
 * whose entire job is to be evidence. `logbook.append` opens with O_APPEND, so
 * concurrent writers interleave instead of overwriting.
 *
 * The trade, said plainly: the event is outside the transaction, so a failure
 * here leaves the restamp done and unrecorded. The caller reports that. Losing
 * a line of our own record is a far smaller harm than deleting somebody else's.
 *
 * `actor` is `unknown`, not `owner`. Every growos.js command can be invoked by
 * the AI (SPEC §11 limit 1), so "the owner did this" is not something the code
 * can know — and the logbook must not assert what cannot be known. `by` records
 * what it actually was.
 */
function appendCorrection(root, to, from, counts) {
  // THIS WRITE HAS BEEN WRONG THREE TIMES, so the reasoning is here in full.
  //
  // It started inside the operation runner as a whole-file replace, which
  // destroyed any event another writer appended in between. Moving it out fixed
  // that and lost every path check the runner does, so a SYMLINKED `.state/`
  // sent this business's evidence into another's. Adding the runner's checks by
  // hand fixed the symlink and left two holes that were the same shape:
  //
  //   A HARD LINK has no target path. The directory entry is genuinely in this
  //   business, so resolved containment passes and `lstat` reports an ordinary
  //   file — every path check says yes while the bytes land in another
  //   business's logbook. The number of names pointing at the inode is the only
  //   tell.
  //
  //   CHECK-THEN-ACT. Validating a path and then opening it later is two
  //   operations with a gap, and a sync client swapping a link into that gap is
  //   exactly the case the whole install worries about. The runner never had
  //   this problem because it renames over its target, and a rename replaces a
  //   link rather than following it; an append in place has no such property.
  //
  // So the order is inverted: OPEN FIRST, then prove the handle you are holding
  // is the file you meant, write through that same descriptor, and PROVE THE
  // WRITE AFTERWARDS — read the bytes back through the descriptor, and re-check
  // the name and the link count.
  //
  // BE EXACT ABOUT THE LIMIT (round 4 was right that an earlier comment here
  // claimed "no window left", which was false). With POSIX append semantics
  // the identity of a PATH and the identity of a DESCRIPTOR can always diverge
  // between two syscalls: a rename after the final check leaves the write in
  // the inode that was validated while the official pathname grows a fresh
  // file, and a hard link created mid-write gives the validated inode a second
  // name. Neither can be PREVENTED from here. What this function guarantees
  // instead is that it never CLAIMS more than it proved: after the write it
  // re-reads the bytes through the descriptor (the note is really in the
  // inode), re-fstats the link count (the inode still has exactly one name)
  // and re-lstats the pathname (that name is still this business's logbook) —
  // and any of those failing makes the command SAY SO instead of reporting a
  // note it cannot vouch for.
  const home = path.join(path.resolve(String(root)), to);
  const abs = path.join(home, '.state', 'logbook.jsonl');
  const shortName = '.state/logbook.jsonl';

  // Refuse before CREATING anything through a link. The authoritative check is
  // below, on the handle; this only stops mkdir walking through one — and it is
  // a CHECK-THEN-CREATE, said plainly: a swap landing between this walk and the
  // mkdir/open below can make an empty `.state/` folder or an empty logbook
  // file appear on the other side of a link. That side effect cannot be closed
  // from here (Node has no openat). What IS guaranteed is that no note is ever
  // WRITTEN through such a swap — the descriptor checks below run before and
  // after the write, on the thing actually held.
  //
  // These two ancestor walks are REDUNDANT WITH EACH OTHER and a probe proves it:
  // remove either and nothing fails, remove both and the symlinked-`.state` test
  // fails. That is the exact masking trap that hid an unbound check twice already
  // on this build, so it is written down rather than left to be rediscovered.
  // They are kept as two because they answer different questions — "may I create
  // here?" and "is what I am holding what I meant?".
  linkOnPathProblem(home, path.dirname(abs), shortName);
  fs.mkdirSync(path.dirname(abs), { recursive: true });

  // O_NOFOLLOW makes a symlinked LEAF fail at the syscall, with no window at all
  // (absent on Windows, where the checks below carry it). O_RDWR, not O_WRONLY,
  // so the write can be READ BACK through this same descriptor — and it is also
  // what stops a FIFO smuggled in as the logbook from hanging this process: a
  // write-only FIFO open blocks until a reader appears, while a read-write one
  // does not block on the platforms we can test (POSIX leaves it unspecified).
  // O_NONBLOCK is the belt for a platform where it might: a probe shows the
  // FIFO test passes without it here, so the O_RDWR behaviour, not this flag,
  // is what the bench binds. Either way the fstat below refuses the non-file.
  let flags = fs.constants.O_RDWR | fs.constants.O_APPEND | fs.constants.O_CREAT;
  if (typeof fs.constants.O_NOFOLLOW === 'number') flags |= fs.constants.O_NOFOLLOW;
  if (typeof fs.constants.O_NONBLOCK === 'number') flags |= fs.constants.O_NONBLOCK;

  let fd;
  try {
    fd = fs.openSync(abs, flags);
  } catch (err) {
    if (err && (err.code === 'ELOOP' || err.code === 'EMLINK')) {
      throw new Error(shortName + ' is a link, so the note was not written through it');
    }
    if (err && err.code === 'ENXIO') {
      throw new Error(shortName + ' is not an ordinary file, so the note was not written to it');
    }
    throw err;
  }

  try {
    // BIGINT identity. The default numeric stats round dev/ino into doubles,
    // and on Windows filesystems whose identifiers need the full width (ReFS
    // documents 128-bit identity) two different files can collide in a rounded
    // comparison. The identity checks are only as sound as the numbers.
    const opened = fs.fstatSync(fd, { bigint: true });
    if (!opened.isFile()) {
      throw new Error(shortName + ' is not an ordinary file, so the note was not written to it');
    }
    if (opened.nlink !== 1n) {
      throw new Error(shortName + ' has more than one name pointing at it (' + opened.nlink + '), so it may be ' +
        'another business\'s logbook as well — the note was not written');
    }
    // The path, judged AFTER the open. A link in place at open time is still
    // here to be seen; one reverted since leaves the inode not matching.
    linkOnPathProblem(home, abs, shortName);
    const onDisk = fs.lstatSync(abs, { bigint: true });
    if (onDisk.dev !== opened.dev || onDisk.ino !== opened.ino) {
      throw new Error(shortName + ' changed underneath while it was being opened, so the note was not written');
    }
    const sizeBefore = Number(opened.size);

    // ONE write, separator included. Inspecting the last byte and then appending
    // was itself a check-then-act: another writer's torn fragment landing in
    // between glued the JSON onto it. Always leading with a newline costs at
    // most one blank line, which `logbook.readAll` already skips.
    const entry = JSON.stringify({
      ts: new Date().toISOString(),
      actor: 'unknown',
      event: 'restamped',
      from,
      to,
      items: counts.items,
      snapshots: counts.snapshots,
      // In a stubs-only run this is the ONLY material change — an event
      // recording "0 items, 0 snapshots" and nothing else would record
      // nothing at all.
      stubs: counts.stubs || 0,
      by: 'growos restamp',
    });
    const bytes = Buffer.from('\n' + entry + '\n', 'utf8');
    const written = fs.writeSync(fd, bytes, 0, bytes.length);
    if (written !== bytes.length) {
      throw new Error(shortName + ' took only part of the note (' + written + ' of ' + bytes.length +
        ' bytes), so the record may be torn — check the end of the logbook');
    }

    // PROVE it, in the same order the claims will be read: the bytes are in the
    // inode (read back through this descriptor — another O_APPEND writer may
    // have landed between the fstat and the write, so the note is SEARCHED for
    // from where the file ended before the write), the inode still has exactly
    // one name, and the pathname still leads to it. The search walks the whole
    // region in chunks: a fixed window falsely refused to vouch for a
    // correctly-written note whenever later appends outgrew it — bounded
    // memory, no growth bound.
    // The proofs themselves can fail with a raw filesystem error (EIO mid
    // read-back, an lstat refused), and a bare errno does not say what is
    // uncertain — which is the one promise this reporting makes. Exact
    // refusals pass through; raw ones are wrapped.
    const exact = (msg) => { const e = new Error(msg); e.vouchExact = true; return e; };
    try {
      const after = fs.fstatSync(fd, { bigint: true });
      let found = false;
      const CHUNK = 1024 * 1024;
      let pos = sizeBefore;
      let carry = Buffer.alloc(0);
      while (pos < Number(after.size)) {
        const want = Math.min(CHUNK, Number(after.size) - pos);
        const chunk = Buffer.alloc(want);
        const got = fs.readSync(fd, chunk, 0, want, pos);
        if (got <= 0) break;
        const window = Buffer.concat([carry, chunk.subarray(0, got)]);
        if (window.indexOf(bytes) !== -1) { found = true; break; }
        carry = window.subarray(Math.max(0, window.length - (bytes.length - 1)));
        pos += got;
      }
      if (!found) {
        throw exact(shortName + ' does not show the note on read-back, so it cannot be vouched for — ' +
          'check the end of the logbook');
      }
      if (after.nlink !== 1n) {
        throw exact(shortName + ' gained another name while the note was being written (' + after.nlink +
          '), so the note may also appear in another business\'s logbook — check both');
      }
      const onDiskAfter = fs.lstatSync(abs, { bigint: true });
      if (onDiskAfter.dev !== opened.dev || onDiskAfter.ino !== opened.ino) {
        throw exact(shortName + ' was moved or replaced while the note was being written — the note is in ' +
          'the file that moved, and the logbook now at that path does not have it. Find the moved file');
      }
    } catch (err) {
      if (err && err.vouchExact === true) throw err;
      throw new Error(shortName + ' could not be re-checked after the write (' +
        (err && err.message ? err.message : String(err)) + ') — the note may or may not be in the ' +
        'logbook; check the end of it');
    }

    // Close is a CHECK, not housekeeping: a delayed-write filesystem reports a
    // writeback failure here, and a read-back from the page cache does not
    // prove persistence. A refused close is a refused
    // vouching.
    const closing = fd;
    fd = -1;
    try {
      fs.closeSync(closing);
    } catch (err) {
      throw new Error(shortName + ' could not be closed cleanly (' + (err && err.message ? err.message : String(err)) +
        ') — the note may not have reached the disk. Check the end of the logbook');
    }
  } finally {
    // Only reached with the descriptor still open when an error is already
    // propagating — a close error here must not mask the real reason.
    if (fd !== -1) { try { fs.closeSync(fd); } catch (_) { /* see above */ } }
  }
}

/** Throw when any component from `home` down to `abs` is a symbolic link. */
function linkOnPathProblem(home, abs, shortName) {
  const realHome = paths.realpathBestEffort(home);
  for (let cur = abs, hops = 0; hops < 64; hops++) {
    let st = null;
    try { st = fs.lstatSync(cur); } catch (_) { st = null; }   // absent is fine
    if (st && st.isSymbolicLink()) {
      throw new Error(shortName + ': ' + paths.toPosix(path.relative(home, cur)) +
        ' is a link, so the note was not written through it');
    }
    const parent = path.dirname(cur);
    if (parent === cur || cur === home || cur === realHome) break;
    cur = parent;
  }
}

/**
 * The mismatch, as the Doctor reports it: for each business, what its items say
 * their business is. Exported so `doctor-checks.js` asks THIS module rather than
 * deriving a second opinion that could drift from the command's own rules.
 *
 * Returns [{ business, names: [value], items: n }] for businesses whose items do
 * not all agree with the folder name. `names` holds every spelling found, so the
 * caller can tell the one-name case (a command can be offered) from the mixed
 * case (it cannot, and inventing one would be the guess this design refuses).
 */
function mismatches(root) {
  let businesses = [];
  try { businesses = paths.listBusinesses(root); } catch (_) { return []; }
  const out = [];
  for (const b of businesses) {
    const names = new Set();
    let items = 0;
    for (const rel of workItems(root, b)) {
      let text;
      try { text = fs.readFileSync(path.join(String(root), b, ...rel.split('/')), 'utf8'); } catch (_) { continue; }
      const v = fm.getField(text, 'business');
      if (typeof v !== 'string' || v === '') continue;
      items++;
      names.add(v);
    }
    if (items === 0) continue;
    if (names.size === 1 && names.has(b)) continue;      // healthy
    out.push({ business: b, names: [...names].sort(), items });
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
  const from = ctx.flags && ctx.flags.from;
  const to = ctx.flags && ctx.flags.to;

  if (!from || !to) {
    reporter.red('Restamp needs both names',
      'It corrects the business name stamped inside a business\'s own work, from one exact name to another.',
      'Run: node system/tools/growos.js restamp --from "<old name>" --to "<folder name>"');
    reporter.print();
    return 2;
  }

  let planned;
  try {
    planned = plan(root, String(from), String(to));
  } catch (err) {
    reporter.red('Could not work out what to change', err && err.message ? err.message : String(err),
      'Nothing was changed.');
    reporter.print();
    return 2;
  }

  if (!planned.ok) {
    for (const e of planned.errors) {
      reporter.red('Restamp refused, and changed nothing', e,
        'Fix that, then run it again.');
    }
    reporter.print();
    return 2;
  }

  // Files under work/ carrying no label block. Reported whether or not there is
  // anything else to do: they are the one thing this command deliberately does
  // not touch, and the owner should hear it from the command rather than work it
  // out from what did not change.
  if (planned.notItems && planned.notItems.length) {
    reporter.yellow('Some files under work/ were left alone',
      planned.notItems.join(', ') + ' — they carry no label block, so there is no business name in them ' +
      'to correct. A deliverable\'s parts live in an underscore folder and are already exempt, so a ' +
      'labelless file HERE is a work item that has lost its label block.',
      'Open each one and fix its label. The Doctor reports every one of them as a problem for the same reason.');
  }

  for (const w of planned.stubWarnings || []) {
    reporter.yellow('A retired-library pointer was left alone', w,
      'Run: node system/tools/growos.js doctor');
  }

  if (planned.operations.length === 0) {
    reporter.green('There is nothing to restamp',
      planned.empty
        ? '"' + to + '" has no work items carrying a business name, so nothing is stamped wrong.'
        : '"' + to + '" already says "' + to + '" everywhere, in its items and in their snapshots.');
    reporter.print();
    return reporter.exitCode();
  }

  const summary = planned.counts.items + ' item(s) and ' + planned.counts.snapshots +
    ' snapshot(s)' + (planned.counts.stubs ? ' plus ' + planned.counts.stubs + ' retired-library pointer(s)' : '') +
    ' from "' + from + '" to "' + to + '"';

  if (!(ctx.flags && ctx.flags.yes)) {
    const dry = ops.applyJob(root, planned.operations, { dryRun: true, name: 'restamp' });
    if (!dry.ok) {
      for (const e of dry.errors) reporter.red('This cannot be applied as it stands', e.reason, 'Nothing was changed.');
      reporter.print();
      return 2;
    }
    reporter.yellow('There is work waiting: ' + summary,
      'Only the business line changes in each file. Your history is added to, never rewritten. ' +
      'This is a preview, not a reservation: applying re-reads everything and works from what is ' +
      'there then, so if you change something in between, the apply sees the change rather than this list.',
      'Nothing was changed. To apply it: node system/tools/growos.js restamp --from "' + from +
      '" --to "' + to + '" --yes');
    reporter.print();
    return reporter.exitCode();
  }

  const result = ops.applyJob(root, planned.operations, { name: 'restamp' });
  if (!result.ok) {
    const stuck = result.rolledBack === false;
    for (const e of result.errors) {
      reporter.red(stuck ? 'Restamp stopped part-way' : 'Restamp stopped and changed nothing',
        e.reason, 'Check that file, then run it again.');
    }
    if (result.rolledBack === false) {
      reporter.red('Some of it had already been applied when it stopped',
        'The undo could not put everything back: ' + JSON.stringify((result.rollback && result.rollback.refused) || []) +
        '. Run this command again once you have looked at those — it picks up from wherever it got to.',
        'The originals are in ' + (result.journalDir || '.growos/jobs') + '.');
    }
    reporter.print();
    return 2;
  }

  // Only now, and outside the transaction — see appendCorrection.
  let noted = true;
  try {
    appendCorrection(root, to, from, planned.counts);
  } catch (err) {
    noted = false;
    // The error message IS the state report: appendCorrection distinguishes
    // "never written", "possibly torn", "possibly also in another business's
    // logbook" and "written into a file that then moved". Summarizing them
    // all as "simply missing one line, nothing needs undoing" was false for
    // most of those branches — so the message is passed
    // through, and the advice is to look, not to relax.
    reporter.yellow('The change was made, but the logbook note cannot be vouched for',
      'Everything was restamped. Then: ' + (err && err.message ? err.message : String(err)) + '.',
      'Check the end of ' + to + '/.state/logbook.jsonl before running anything else — the message ' +
      'above says exactly what is uncertain.');
  }

  reporter.green('Restamped: ' + summary,
    (noted
      ? 'One correction event was added to the logbook; the earlier events still name the old paths, because that is what happened.'
      : 'The logbook note could NOT be vouched for — see the warning above. The files themselves are correct.'),
    'The originals are kept in ' + path.join('.growos', 'jobs') + ' if you want to look.');
  reporter.print();
  return reporter.exitCode();
}

module.exports = {
  name: 'restamp',
  summary: 'Correct the business name stamped inside a business\'s work after its folder was renamed.',
  run,
  plan,
  mismatches,
  workItems,
  // exported for the bench: the after-commit seam, so a test can interleave
  // another writer with it rather than only appending before the command runs.
  appendCorrection,
};
