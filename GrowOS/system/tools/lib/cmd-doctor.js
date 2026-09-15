'use strict';

/**
 * cmd-doctor.js - the `doctor` command (SPEC section 6.2).
 *
 * Runs the eleven checks (doctor-checks.js), turns each finding into a reporter
 * finding, and prints the plain-word checkup (or the --json envelope). With
 * --report it also writes .growos/support-report.md, a privacy-safe report in
 * which business names and deep path segments are hashed.
 *
 * Exit code follows report.js: 0 green, 1 yellow, 2 red.
 */

const fs = require('fs');
const path = require('path');
const { makeReporter } = require('./report.js');
const { atomicWrite } = require('./atomic.js');
const doctorChecks = require('./doctor-checks.js');

async function run(args, ctx) {
  const reporter = makeReporter({ json: ctx.flags && ctx.flags.json });
  if (!ctx.root) {
    reporter.red('Could not find your GrowOS folder', 'There is no system/VERSION at or above where this ran.');
    reporter.print();
    return 2;
  }

  const { sections, manifestDiff } = await doctorChecks.runChecks(ctx);
  for (const s of sections) {
    for (const f of s.findings) reporter.add(f);
  }

  if (ctx.flags && ctx.flags.report) {
    try {
      const text = doctorChecks.buildSupportReport(ctx, sections, manifestDiff);
      const reportPath = path.join(ctx.root, '.growos', 'support-report.md');
      atomicWrite(reportPath, text);
      reporter.add({ level: 'green', title: 'Wrote a support report', detail: 'Saved to .growos/support-report.md (names and paths are hashed).' });
    } catch (err) {
      reporter.add({ level: 'yellow', title: 'Could not write the support report', detail: err.message });
    }
  }

  reporter.print();
  return reporter.exitCode();
}

module.exports = { name: 'doctor', summary: 'Check the health of your GrowOS folder and offer fixes.', run };
