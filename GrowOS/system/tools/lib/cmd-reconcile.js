'use strict';

/**
 * cmd-reconcile.js - the `reconcile` command (SPEC section 6.6).
 *
 * A thin wrapper over reconcile-core: it runs the shared engine and prints the
 * <=5-line plain-word catch-up. reconcile itself is not a pass/fail check, so
 * it exits 0 unless the install root cannot be found.
 *
 *   --json  ->  print { "appended": <int>, "summaryLines": [ ... ] } on one line
 */

const { reconcile } = require('./reconcile-core.js');

function run(args, ctx) {
  if (!ctx.root) {
    process.stdout.write('Could not find your GrowOS folder (no system/VERSION at or above here).\n');
    return 2;
  }

  const result = reconcile(ctx.root, { quiet: false });

  if (ctx.flags && ctx.flags.json) {
    process.stdout.write(JSON.stringify({ appended: result.appended, summaryLines: result.summaryLines }) + '\n');
    return 0;
  }

  if (result.summaryLines.length === 0) {
    process.stdout.write('All caught up - nothing new since last time.\n');
  } else {
    process.stdout.write(result.summaryLines.join('\n') + '\n');
  }
  return 0;
}

module.exports = {
  name: 'reconcile',
  summary: 'Catch up on changes made outside a session and show what is waiting.',
  run,
};
