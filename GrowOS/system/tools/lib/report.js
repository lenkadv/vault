'use strict';

/**
 * report.js - plain-word findings, one exit-code contract (SPEC section 6).
 *
 * Every growos.js command collects findings into a reporter and ends with:
 *   exit 0 = green (all good), 1 = yellow (warnings), 2 = red (failed).
 *
 * A finding is { level: 'green'|'yellow'|'red', title, detail, fix }:
 *   title  - one short plain sentence (what was checked / what is wrong)
 *   detail - optional second sentence with the specifics
 *   fix    - optional: the exact command to run or the plain instruction
 *
 * print() renders for humans - problems first, then warnings, then good news,
 * with the three plain markers (no other symbols):
 *   ✕ red   △ yellow   ✓ green
 * With makeReporter({ json: true }), print() emits the machine envelope
 * instead (one JSON line), which is what the --json flag feeds the AI.
 */

const LEVELS = ['green', 'yellow', 'red'];
const MARK = { green: '✓', yellow: '△', red: '✕' };
const EXIT = { green: 0, yellow: 1, red: 2 };

/**
 * makeReporter({json} = {}) -> reporter with:
 *   add({level, title, detail?, fix?})  - record one finding (validates level/title)
 *   green(title, detail?, fix?)         - shorthand for add
 *   yellow(title, detail?, fix?)        - shorthand for add
 *   red(title, detail?, fix?)           - shorthand for add
 *   toJSON()   -> { ok, worst, findings } (ok is false only when worst is red)
 *   exitCode() -> 0 | 1 | 2 from the worst finding (empty reporter is green)
 *   print()    -> write the human text (or the JSON envelope) to stdout
 */
function makeReporter(opts) {
  const json = !!(opts && opts.json);
  const findings = [];

  function add(finding) {
    const f = finding || {};
    if (LEVELS.indexOf(f.level) === -1) {
      throw new Error('Finding level must be green, yellow, or red.');
    }
    if (typeof f.title !== 'string' || f.title === '') {
      throw new Error('Finding needs a title: one short plain sentence.');
    }
    findings.push({
      level: f.level,
      title: f.title,
      detail: typeof f.detail === 'string' ? f.detail : '',
      fix: typeof f.fix === 'string' ? f.fix : '',
    });
  }

  function worst() {
    let w = 'green';
    for (const f of findings) {
      if (f.level === 'red') return 'red';
      if (f.level === 'yellow') w = 'yellow';
    }
    return w;
  }

  function toJSON() {
    return { ok: worst() !== 'red', worst: worst(), findings: findings.slice() };
  }

  function exitCode() {
    return EXIT[worst()];
  }

  function render() {
    const groups = [
      ['red', 'Problems'],
      ['yellow', 'Warnings'],
      ['green', 'Looks good'],
    ];
    const out = [];
    for (const [level, label] of groups) {
      const list = findings.filter((f) => f.level === level);
      if (list.length === 0) continue;
      out.push(label + ':');
      for (const f of list) {
        out.push('  ' + MARK[level] + ' ' + f.title);
        if (f.detail) out.push('      ' + f.detail);
        if (f.fix) out.push('      Fix: ' + f.fix);
      }
    }
    const reds = findings.filter((f) => f.level === 'red').length;
    const yellows = findings.filter((f) => f.level === 'yellow').length;
    const greens = findings.filter((f) => f.level === 'green').length;
    out.push(
      findings.length === 0
        ? 'Summary: nothing to report. All good.'
        : 'Summary: ' + reds + ' problem(s), ' + yellows + ' warning(s), ' + greens + ' good.'
    );
    return out.join('\n');
  }

  function print() {
    process.stdout.write((json ? JSON.stringify(toJSON()) : render()) + '\n');
  }

  return {
    add,
    green: (title, detail, fix) => add({ level: 'green', title, detail, fix }),
    yellow: (title, detail, fix) => add({ level: 'yellow', title, detail, fix }),
    red: (title, detail, fix) => add({ level: 'red', title, detail, fix }),
    toJSON,
    exitCode,
    print,
  };
}

module.exports = { makeReporter };
