'use strict';

/**
 * cmd-learning.js — the `learning` command (Build Doc Phase 7).
 *
 *   growos learning candidates --business <b> [--json]
 *   growos learning propose    --business <b> --category <c> --text <t> [--target lessons|library] [--json]
 *   growos learning decline    --business <b> --id <id> [--json]
 *   growos learning apply      --business <b> --id <id> [--owner-said-yes] [--json]
 *   growos learning undo       --business <b> --id <id> [--json]
 *
 * Thin wrapper over lib/learning.js — the rules live there (and the P7.3
 * allowlist lives ONLY there). A torn or partly unreadable logbook is
 * REPORTED with the candidates, never swallowed.
 */

const fs = require('node:fs');
const path = require('node:path');
const learning = require('./learning.js');

function fail(json, msg) {
  if (json) process.stdout.write(JSON.stringify({ refused: true, reason: msg }) + '\n');
  else process.stdout.write('Cannot do that: ' + msg + '\n');
  return 2;
}

async function run(args, ctx) {
  const f = ctx.flags || {};
  const json = !!f.json;
  const sub = (ctx.positionals && ctx.positionals[0]) || (args && args[0]) || '';
  if (!ctx.root) return fail(json, 'there is no GrowOS folder here (no system/VERSION found)');
  const business = typeof f.business === 'string' ? f.business : '';
  if (!business) return fail(json, 'learning needs --business <folder name>');
  // The name must BE one of this install's business folders — never a path:
  // '../elsewhere' with a brain/ inside would
  // otherwise make every write here land outside the install.
  let known = [];
  try { known = require('./paths.js').listBusinesses(ctx.root); } catch (_) { known = []; }
  if (known.indexOf(business) === -1) {
    return fail(json, 'there is no business folder named "' + business + '" here — learning works only ' +
      'inside a real business of this install');
  }

  try {
    if (sub === 'candidates') {
      const view = learning.computeCandidates(ctx.root, business);
      if (json) { process.stdout.write(JSON.stringify(view) + '\n'); return 0; }
      const lines = [];
      if (view.log.corruptTail || view.log.badLines > 0) {
        lines.push('CAREFUL: the logbook is partly unreadable (' +
          (view.log.corruptTail ? 'torn final line' : '') +
          (view.log.corruptTail && view.log.badLines ? ', ' : '') +
          (view.log.badLines ? view.log.badLines + ' bad line(s)' : '') +
          ') — this view may be missing signals. The Doctor knows more.');
      }
      if (view.patterns.length === 0) lines.push('No learning candidates yet.');
      // Control characters are stripped from log-derived text before it hits
      // a terminal — a proposal is data, not ANSI.
      const clean = (s) => String(s).replace(/[\u0000-\u001f\u007f-\u009f]/g, '');
      for (const p of view.patterns) {
        // The id is log-derived too, so it goes through the same clean() — it
        // was the one field printed raw.
        lines.push((p.eligible ? '* ' : '  ') + clean(p.id) + '  [' + clean(p.category) + ' -> ' + p.target + ']  "' +
          clean(p.text) + '" — ' + p.why);
      }
      process.stdout.write(lines.join('\n') + '\n');
      return 0;
    }
    if (sub === 'propose') {
      const r = learning.propose(ctx.root, business, { category: f.category, text: f.text, target: f.target });
      if (json) process.stdout.write(JSON.stringify(r) + '\n');
      else process.stdout.write('Noted (' + r.id + '), seen ' + r.observations + ' time(s).\n');
      return 0;
    }
    if (sub === 'decline') {
      const r = learning.decline(ctx.root, business, f.id);
      if (json) process.stdout.write(JSON.stringify(r) + '\n');
      else process.stdout.write('Understood — ' + r.id + ' will never be raised again.\n');
      return 0;
    }
    if (sub === 'apply') {
      // Strictly the boolean switch: a stray value like "false" after the
      // flag must never read as an owner yes.
      const ownerYes = f.ownerSaidYes === true &&
        !(ctx.args || []).some((a) => String(a).toLowerCase() === 'false');
      const r = learning.apply(ctx.root, business, f.id, { ownerSaidYes: ownerYes });
      if (json) process.stdout.write(JSON.stringify(r) + '\n');
      else if (r.already) process.stdout.write('Already written earlier — nothing to do.\n');
      else process.stdout.write('Learned: it is now in ' + r.file + ' (undo any time with: growos learning undo --business ' +
        business + ' --id ' + r.id + ').\n');
      return 0;
    }
    if (sub === 'undo') {
      const r = learning.undo(ctx.root, business, f.id);
      if (json) process.stdout.write(JSON.stringify(r) + '\n');
      else process.stdout.write('Removed from ' + r.file + ' — exactly the block that was added, nothing else.\n');
      return 0;
    }
    return fail(json, 'learning needs one of: candidates, propose, decline, apply, undo');
  } catch (err) {
    return fail(json, err && err.message ? err.message : String(err));
  }
}

module.exports = {
  name: 'learning',
  summary: 'See, record, decline, apply, and undo learned writing-taste patterns.',
  run,
};
