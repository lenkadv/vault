#!/usr/bin/env node
'use strict';

/**
 * growos.js - THE tool (SPEC section 6).
 *
 *   node system/tools/growos.js <command> [args] [flags]
 *
 * The dispatcher does one job: parse argv, resolve the install root, load
 * lib/cmd-<command>.js, and call its run(args, ctx). Each command module
 * exports { name, summary, run }. run(args, ctx) returns an integer exit code
 * (or a Promise of one). Nothing here ever prints a stack trace: any error is
 * caught and turned into plain words with exit code 2.
 *
 * ctx = {
 *   root:  the install root (findRoot(cwd), else the tool's own ../..), or null
 *   flags: { json, yes, dryRun, business, report, quarantine, restore }
 *   args:  the leftover positional arguments
 * }
 *
 * The command contract is LOCKED so sibling command modules (cmd-update,
 * cmd-repair, ...) can be added by just dropping a lib/cmd-<name>.js file.
 */

const fs = require('fs');
const path = require('path');
const paths = require('./lib/paths.js');

const LIB_DIR = path.join(__dirname, 'lib');

// Flags that take a value; everything else --foo is a boolean switch.
// `from`/`to` are the owner-run data jobs' names (restamp). They must be here:
// without it `--to acme-ltd` parses as the switch `--to` plus a stray positional,
// and the command would read `to` as `true`.
const VALUE_FLAGS = new Set(['business', 'restore', 'from', 'to', 'map', 'item',
  'publisher', 'route', 'outcome', 'reason', 'destination', 'ref',
  'category', 'text', 'target', 'id']);

/** Parse argv (already sliced past `node growos.js`). */
function parseArgs(argv) {
  const flags = {
    json: false, yes: false, dryRun: false,
    business: null, report: false, quarantine: false, restore: null,
  };
  const positionals = [];
  let command = null;

  for (let i = 0; i < argv.length; i++) {
    const tok = argv[i];
    if (tok.length > 2 && tok.slice(0, 2) === '--') {
      let name = tok.slice(2);
      let val = null;
      const eq = name.indexOf('=');
      if (eq !== -1) { val = name.slice(eq + 1); name = name.slice(0, eq); }
      const camel = name.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      if (VALUE_FLAGS.has(camel)) {
        if (val === null) {
          val = argv[i + 1];
          if (val === undefined) throw new Error('The --' + name + ' option needs a value, like --' + name + ' "..."');
          i++;
        }
        flags[camel] = val;
      } else {
        flags[camel] = val === null ? true : val;
      }
    } else if (command === null) {
      command = tok;
    } else {
      positionals.push(tok);
    }
  }
  return { command, flags, positionals };
}

/** findRoot(cwd), else the tool's own install root (../..), else null. */
function resolveRoot(cwd) {
  try {
    return paths.findRoot(cwd);
  } catch (_) { /* fall through */ }
  const own = path.resolve(__dirname, '..', '..');
  try {
    if (fs.statSync(path.join(own, 'system', 'VERSION')).isFile()) return own;
  } catch (_) { /* no marker */ }
  return null;
}

/** Every lib/cmd-*.js as { command, summary }. */
function listCommands() {
  const out = [];
  let names = [];
  try { names = fs.readdirSync(LIB_DIR); } catch (_) { names = []; }
  for (const n of names.sort()) {
    const m = n.match(/^cmd-(.+)\.js$/);
    if (!m) continue;
    let summary = '';
    try { summary = require(path.join(LIB_DIR, n)).summary || ''; } catch (_) { summary = '(could not load)'; }
    out.push({ command: m[1], summary });
  }
  return out;
}

function printHelp(unknownName) {
  const lines = [];
  if (unknownName) lines.push('Unknown command: ' + unknownName);
  lines.push('GrowOS - usage: node system/tools/growos.js <command> [options]');
  lines.push('');
  lines.push('Commands:');
  for (const c of listCommands()) {
    lines.push('  ' + c.command.padEnd(12) + c.summary);
  }
  lines.push('');
  lines.push('Common options: --json  --yes  --dry-run  --business "Name"  --report  --quarantine');
  process.stdout.write(lines.join('\n') + '\n');
}

async function main() {
  let parsed;
  try {
    parsed = parseArgs(process.argv.slice(2));
  } catch (err) {
    process.stdout.write(String(err.message) + '\n');
    return 2;
  }

  const { command, flags, positionals } = parsed;

  if (!command) { printHelp(null); return 0; }

  const cmdPath = path.join(LIB_DIR, 'cmd-' + command + '.js');
  if (!fs.existsSync(cmdPath)) { printHelp(command); return 2; }

  let mod;
  try {
    mod = require(cmdPath);
  } catch (err) {
    process.stdout.write('Could not load the "' + command + '" command: ' + err.message + '\n');
    return 2;
  }
  if (!mod || typeof mod.run !== 'function') {
    process.stdout.write('The "' + command + '" command is not usable (no run function).\n');
    return 2;
  }

  const ctx = { root: resolveRoot(process.cwd()), flags, args: positionals };
  const code = await mod.run(positionals, ctx);
  return typeof code === 'number' ? code : 0;
}

main()
  .then((code) => { process.exitCode = code; })
  .catch((err) => {
    process.stdout.write('Something went wrong: ' + (err && err.message ? err.message : String(err)) + '\n');
    process.exitCode = 2;
  });
