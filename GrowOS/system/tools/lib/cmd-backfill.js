'use strict';

/**
 * cmd-backfill.js — the `backfill` command (Build Doc P3.1, widened by owner
 * decision 2026-07-30).
 *
 *   node system/tools/growos.js backfill [--business "Name"] [--yes] [--json]
 *
 * WHAT IT IS FOR
 *
 * An update replaces machinery only, so a release that adds to the brain schema
 * reaches nobody who already has a business folder. `setup` creates a file that
 * is absent and — by design — never touches one that exists, which is what keeps
 * the owner's writing safe and also what leaves them behind: Phase 1 EXTENDED six
 * templates with nine sections, and an existing customer got none of them while
 * the Doctor reported green, because their files are merely non-empty.
 *
 * Backfill brings a business up to the shipped template:
 *
 *   a template file the business does not have  -> created, byte-identical
 *   a template SECTION missing from a file it
 *     does have                                 -> inserted where the template
 *                                                  puts it (sections.js), with
 *                                                  everything they wrote intact
 *
 * IT PREVIEWS BY DEFAULT. Without --yes it prints what it would do and writes
 * nothing at all. That is not politeness: this module cannot tell a section the
 * owner never had from one they deleted on purpose, so the person who can is
 * shown the list first.
 *
 * EVERY WRITE GOES THROUGH THE OPERATION RUNNER (operations.js), which means
 * compare-and-swap against the exact bytes this job read, a journalled pre-image
 * of every file it touches, path validation, and an all-or-nothing commit —
 * with the exception the runner documents: a rollback can REFUSE a file the
 * owner changed since, so an install can end up partly applied, and it says
 * exactly which files those are.
 *
 * A PREVIEW IS NOT A RESERVATION. An earlier version of this comment claimed a
 * file changed between the preview and the apply stops the job. It does not:
 * they are two processes, and the apply recomputes its plan from what is on
 * disk then. Compare-and-swap protects the window from "this run worked out its
 * plan" to "this run wrote" — which is the window an editor or a sync client can
 * actually surprise — not the window since some earlier preview.
 *
 * WHAT IT COVERS. The whole shipped business template — `brain/**`, `setup.md`,
 * `work/README.md` — not `brain/` alone. The Build Doc calls this "brain
 * backfill" because that is where Phase 1's new files landed, but Phase 1 also
 * rewrote `setup.md` to record destination identities, and Phase 5's publishing
 * reads those. Covering `brain/` only would leave every existing customer
 * without the fields the next phase depends on, which is not what "existing
 * customers upgrade cleanly" means. The scope is the SCOPE constant below.
 *
 * WHAT IT NEVER DOES: remove anything, rewrite a section that is already there,
 * touch a file the template does not ship, or reformat. A file it has nothing to
 * add to is not written at all.
 *
 * PRODUCT code: Node >= 18, stdlib only, no npm, no shelling out. Windows-safe.
 */

const fs = require('fs');
const path = require('path');
const { makeReporter } = require('./report.js');
const paths = require('./paths.js');
const ops = require('./operations.js');
const sections = require('./sections.js');

/**
 * The part of the business template this job maintains. Everything the product
 * ships into a business folder — see the header for why this is not `brain/`
 * alone. A relative POSIX prefix; '' would mean the whole template.
 */
const SCOPE = '';

/** Files whose sections are merged. Anything else is create-only. */
const MERGEABLE = /\.md$/i;

/**
 * Every file in the shipped template, as POSIX paths relative to its root.
 * Ambient OS litter is never part of the template (paths.isAmbientLitter).
 */
function templateFiles(templateRoot) {
  const out = [];
  const walk = (absDir, rel) => {
    let dirents;
    // A folder that cannot be read must NOT reduce quietly to a shorter list:
    // that would make backfill report "everything is up to date" having never
    // looked at half the template. Throw, and the caller turns it into a red.
    try {
      dirents = fs.readdirSync(absDir, { withFileTypes: true });
    } catch (err) {
      throw new Error('could not read ' + (rel || 'the business template') + ': ' +
        (err && err.message ? err.message : String(err)));
    }
    for (const d of dirents.slice().sort((a, b) => (a.name < b.name ? -1 : 1))) {
      if (paths.isAmbientLitter(d.name)) continue;
      const childRel = rel ? rel + '/' + d.name : d.name;
      if (d.isDirectory()) walk(path.join(absDir, d.name), childRel);
      else if (d.isFile()) out.push(childRel);
    }
  };
  walk(templateRoot, '');
  return out.filter((rel) => SCOPE === '' || rel === SCOPE || rel.indexOf(SCOPE + '/') === 0);
}

/**
 * Is this buffer plain UTF-8 text that survives a decode/encode round trip?
 *
 * The merge works on a string, so anything that does not round-trip would be
 * WRITTEN BACK CHANGED — invalid byte sequences become U+FFFD and the owner
 * loses whatever was there. A file that fails this is left alone and said so.
 * (A UTF-8 BOM round-trips fine and is not the case this is about.)
 */
function isRoundTripUtf8(buf) {
  return Buffer.compare(Buffer.from(buf.toString('utf8'), 'utf8'), buf) === 0;
}

/**
 * plan(root, businessNames) -> { operations, notes, skipped }
 *
 * Pure computation over what is on disk right now. Nothing is written here; the
 * expected hashes it records are what compare-and-swap later checks against.
 */
function plan(root, businessNames) {
  const templateRoot = path.join(String(root), 'system', 'templates', 'business');
  const files = templateFiles(templateRoot);
  const operations = [];
  const notes = [];      // one plain line per change, for the preview
  const skipped = [];    // files deliberately left alone, with the reason

  for (const business of businessNames) {
    for (const rel of files) {
      const templateBytes = fs.readFileSync(path.join(templateRoot, ...rel.split('/')));
      const target = path.join(String(root), business, ...rel.split('/'));

      let current;
      try {
        current = fs.readFileSync(target);
      } catch (err) {
        if (err && err.code === 'ENOENT') {
          operations.push({ business, path: rel, verb: 'create', expect: ops.ABSENT, bytes: templateBytes });
          notes.push(business + '/' + rel + ' — new file');
          continue;
        }
        skipped.push(business + '/' + rel + ' — could not be read (' + (err && err.message ? err.message : String(err)) + ')');
        continue;
      }

      if (!MERGEABLE.test(rel)) continue;              // exists, not a markdown file
      if (!isRoundTripUtf8(current) || !isRoundTripUtf8(templateBytes)) {
        skipped.push(business + '/' + rel + ' — not plain UTF-8 text, so it was left exactly as it is');
        continue;
      }

      // A file with nothing to add produces NO operation — not an operation that
      // writes the same bytes back. The difference is visible: no journal, so no
      // copy of the owner's content is taken, and no mtime churn for a sync
      // client to carry around. These two lines are redundant with each other (a
      // mutation probe removed each in turn and nothing failed; removing BOTH is
      // caught). Kept as two because they say different things — one about the
      // merge's own answer, one about the bytes — and the cost is nil.
      const merged = sections.merge(current.toString('utf8'), templateBytes.toString('utf8'));
      if (merged.refuse) {
        skipped.push(business + '/' + rel + ' — ' + merged.refuse + ', so it was left exactly as it is');
        continue;
      }
      if (!merged.changed) continue;
      const bytes = Buffer.from(merged.text, 'utf8');
      if (Buffer.compare(bytes, current) === 0) continue;

      operations.push({
        business,
        path: rel,
        verb: 'replace',
        expect: ops.hashBytes(current),
        bytes,
      });
      notes.push(business + '/' + rel + ' — ' + merged.added.length + ' missing section(s): ' +
        merged.added.join(', '));
    }
  }
  return { operations, notes, skipped };
}

/**
 * Which businesses this run covers. An explicit --business must name one that
 * exists, matched the way the filesystem matches names (operations.sameFileKey),
 * and must not be one of two folders that normalise together — picking would be
 * guessing whose files get written.
 */
function chooseBusinesses(root, wanted) {
  const all = paths.listBusinesses(root);
  if (wanted === null || wanted === undefined || String(wanted).trim() === '') {
    return { ok: true, businesses: all };
  }
  const key = ops.sameFileKey(String(wanted).trim());
  const matches = all.filter((b) => ops.sameFileKey(b) === key);
  if (matches.length === 0) {
    return {
      ok: false,
      reason: '"' + wanted + '" is not a business folder on this install',
      detail: all.length ? 'This install has: ' + all.join(', ') + '.' : 'This install has no business folders yet.',
    };
  }
  if (matches.length > 1) {
    return {
      ok: false,
      reason: 'more than one folder matches "' + wanted + '"',
      detail: 'They are: ' + matches.join(', ') + '. There is no way to tell which one you mean.',
    };
  }
  return { ok: true, businesses: matches };
}

async function run(args, ctx) {
  const reporter = makeReporter({ json: ctx.flags && ctx.flags.json });

  if (!ctx.root) {
    reporter.red('Could not find your GrowOS folder', 'There is no system/VERSION at or above where this ran.');
    reporter.print();
    return 2;
  }
  const root = ctx.root;

  const templateRoot = path.join(root, 'system', 'templates', 'business');
  if (!fs.existsSync(templateRoot)) {
    reporter.red('The business template is missing', 'system/templates/business was not found.',
      'Re-download the product zip, then run this again.');
    reporter.print();
    return 2;
  }

  let chosen;
  try {
    chosen = chooseBusinesses(root, ctx.flags && ctx.flags.business);
  } catch (err) {
    reporter.red('Could not read the install folder', err && err.message ? err.message : String(err));
    reporter.print();
    return 2;
  }
  if (!chosen.ok) {
    reporter.red('That business was not found', chosen.reason + '. ' + chosen.detail,
      'Run: node system/tools/growos.js backfill (with no --business) to see them all.');
    reporter.print();
    return 2;
  }
  if (chosen.businesses.length === 0) {
    reporter.green('There are no business folders yet', 'Nothing to fill in.',
      'Run: node system/tools/growos.js setup --business "Your Business"');
    reporter.print();
    return 0;
  }

  let planned;
  try {
    planned = plan(root, chosen.businesses);
  } catch (err) {
    reporter.red('Could not work out what is missing', err && err.message ? err.message : String(err),
      'Nothing was changed.');
    reporter.print();
    return 2;
  }

  for (const s of planned.skipped) {
    reporter.yellow('One file was left alone', s,
      'Open it and check it, then run this again if you want its sections filled in.');
  }

  if (planned.operations.length === 0) {
    // "Everything is up to date" is a CLAIM ABOUT FILES THAT WERE INSPECTED. If
    // any were skipped, it is not true — and printing a warning immediately
    // followed by an all-clear is worse than either alone, because the all-clear
    // is what gets remembered.
    if (planned.skipped.length) {
      reporter.yellow('Nothing could be filled in',
        'There was nothing to add to the files this could read, and ' + planned.skipped.length +
        ' file(s) above could not be read at all — so this cannot tell you the business is up to date.',
        'Sort those files out, then run this again.');
    } else {
      reporter.green('Everything is already up to date',
        chosen.businesses.join(', ') + ' has every file and section this version ships.');
    }
    reporter.print();
    return reporter.exitCode();
  }

  const newFiles = planned.operations.filter((o) => o.verb === 'create').length;
  const filledIn = planned.operations.length - newFiles;
  const summary = newFiles + ' file(s) to add, ' + filledIn + ' file(s) to fill in';

  if (!(ctx.flags && ctx.flags.yes)) {
    // The preview. A dry run through the runner as well, so the preview reports
    // the same refusals a real run would rather than a cheerier list.
    const dry = ops.applyJob(root, planned.operations, { dryRun: true, name: 'backfill' });
    if (!dry.ok) {
      for (const e of dry.errors) {
        reporter.red('This cannot be applied as it stands', e.reason, 'Nothing was changed.');
      }
      reporter.print();
      return 2;
    }
    reporter.yellow('There is work waiting: ' + summary,
      planned.notes.join(' | ') + ' — this is a preview, not a reservation: applying re-reads everything ' +
      'and works from what is there then, so anything you change in between may be included or may stop ' +
      'the run (a file the new read cannot parse safely is refused, not guessed at).',
      'Nothing was changed. To apply it: node system/tools/growos.js backfill' +
      (ctx.flags && ctx.flags.business ? ' --business "' + ctx.flags.business + '"' : '') + ' --yes');
    reporter.print();
    return reporter.exitCode();
  }

  const result = ops.applyJob(root, planned.operations, { name: 'backfill' });
  if (!result.ok) {
    const stuck = result.rolledBack === false;
    for (const e of result.errors) {
      reporter.red(stuck ? 'Backfill stopped part-way' : 'Backfill stopped and changed nothing', e.reason,
        'Check that file, then run it again.');
    }
    if (stuck) {
      reporter.red('Some of it had already been applied when it stopped',
        'The undo could not finish: ' + JSON.stringify(result.rollback && result.rollback.refused || []),
        'The originals are in ' + (result.journalDir || '.growos/jobs') + '.');
    }
    reporter.print();
    return 2;
  }

  reporter.green('Filled in what was missing: ' + summary,
    planned.notes.join(' | ') +
      (planned.skipped.length ? ' — but ' + planned.skipped.length + ' file(s) above were left alone, ' +
        'so this business is NOT fully up to date' : ''),
    'The originals are kept in ' + path.join('.growos', 'jobs') + ' if you want to look.');
  reporter.print();
  return reporter.exitCode();
}

module.exports = {
  name: 'backfill',
  summary: 'Add the files and sections this version ships to a business that predates them.',
  run,
  plan,
  templateFiles,
};
