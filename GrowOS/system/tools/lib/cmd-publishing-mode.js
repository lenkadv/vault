'use strict';

/**
 * cmd-publishing-mode.js — the `publishing-mode` command (Build Doc P5.2).
 *
 * `growos publishing-mode --item <path> [--json]`
 *
 * The ONE way a publisher learns how far it may go for an item: publishers
 * never parse setup.md themselves. The answer derives business and channel
 * from the item's RESOLVED path — never from an argument — and only the
 * exact `live` token authorises a live action (lib/publishing.js).
 *
 * Exit codes: 0 = answered (any of the three modes — `unanswered` is a clean
 * answer, not an error); 2 = refused (the item path cannot be trusted: not a
 * work item, missing, or a symlink anywhere on the way).
 */

const publishing = require('./publishing.js');

async function run(args, ctx) {
  const json = !!(ctx.flags && ctx.flags.json);
  const item = ctx.flags && ctx.flags.item;

  const refuse = (msg) => {
    if (json) {
      process.stdout.write(JSON.stringify({ refused: true, reason: msg }) + '\n');
    } else {
      process.stdout.write('Cannot answer: ' + msg + '\n');
    }
    return 2;
  };

  if (!item || typeof item !== 'string') {
    return refuse('publishing-mode needs --item <path to the work item>');
  }
  if (!ctx.root) {
    return refuse('there is no GrowOS folder here (no system/VERSION found)');
  }

  let r;
  try {
    r = publishing.resolveMode(ctx.root, item);
  } catch (err) {
    return refuse(err && err.message ? err.message : String(err));
  }

  if (json) {
    process.stdout.write(JSON.stringify(r) + '\n');
  } else {
    const lines = [];
    lines.push('Item:     ' + r.item);
    lines.push('Business: ' + r.business);
    lines.push('Channel:  ' + (r.channel === null ? '(none)' : r.channel));
    lines.push('Mode:     ' + r.mode + (r.fixed ? ' (fixed — this channel has no live mode)' : ''));
    lines.push('Why:      ' + r.reason);
    if (r.entry && r.entry.route) lines.push('Route:    ' + r.entry.route);
    if (r.entry && r.entry.destination_id) lines.push('Goes to:  ' + r.entry.destination_id);
    for (const p of r.problems) lines.push('Note:     ' + p);
    process.stdout.write(lines.join('\n') + '\n');
  }
  return 0;
}

module.exports = {
  name: 'publishing-mode',
  summary: 'Answer how far a publish may go for one work item (live, safe-state, or unanswered).',
  run,
};
