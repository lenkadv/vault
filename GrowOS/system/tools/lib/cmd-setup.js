'use strict';

/**
 * cmd-setup.js - the `setup` command (SPEC section 6.1).
 *
 * Idempotent, non-interactive. The setup SKILL asks the human for the business
 * name and passes it as --business "Name"; this tool never prompts.
 *
 * Steps (each reported plainly, or via the --json envelope):
 *   1. Node version >= 18.
 *   2. --business "Name" -> kebab-case slug -> create <slug>/ from
 *      system/templates/business, SKIPPING any file that already exists
 *      (never overwrite - this is what makes re-running safe).
 *   3. Write .codex/hooks.json + config.toml (codexgen).
 *   4. Mirror (.agents/skills + Codex wiring).
 *   5. Initialize .growos/ (tmp/, logs/, sessions/).
 *   6. Run the health checks and fold the result in; setup is "complete" on
 *      green or yellow-with-explained-items, red means something needs a fix.
 *
 * Re-running with a new --business adds a second business without touching the
 * first.
 */

const fs = require('fs');
const path = require('path');
const { makeReporter } = require('./report.js');
const { atomicWrite } = require('./atomic.js');
const codexgen = require('./codexgen.js');
const { mirror } = require('./cmd-mirror.js');
const doctorChecks = require('./doctor-checks.js');
const codexTrust = require('./codex-trust.js');
const paths = require('./paths.js');

const RESERVED_SLUGS = new Set(['system', 'shared', '_dev', 'dist', 'node_modules']);

/** Turn a business name into a safe kebab-case slug. */
function slugify(name) {
  return String(name)
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '') // strip accents
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Recursively copy src into dst, never overwriting an existing file. */
function copyTreeSkipExisting(src, dst) {
  const created = [];
  const skipped = [];
  const walk = (from, to) => {
    let dirents;
    try {
      dirents = fs.readdirSync(from, { withFileTypes: true });
    } catch (_) {
      return;
    }
    fs.mkdirSync(to, { recursive: true });
    for (const d of dirents) {
      // Never seed a business folder with the OS's own view metadata
      // (paths.isAmbientLitter — the shared definition).
      if (paths.isAmbientLitter(d.name)) continue;
      const fromChild = path.join(from, d.name);
      const toChild = path.join(to, d.name);
      if (d.isDirectory()) {
        walk(fromChild, toChild);
      } else if (fs.existsSync(toChild)) {
        skipped.push(toChild);
      } else {
        atomicWrite(toChild, fs.readFileSync(fromChild));
        created.push(toChild);
      }
    }
  };
  walk(src, dst);
  return { created, skipped };
}

async function run(args, ctx) {
  const reporter = makeReporter({ json: ctx.flags && ctx.flags.json });

  if (!ctx.root) {
    reporter.red('Could not find your GrowOS folder', 'There is no system/VERSION at or above where this ran.');
    reporter.print();
    return 2;
  }
  const root = ctx.root;

  // Whether the owner has already approved the wiring as it stands RIGHT NOW,
  // read before step 3 regenerates it. Afterwards the old approval has nothing
  // left to be compared against (codexTrust.hasProvenConsent).
  const provenConsentBefore = codexTrust.hasProvenConsent(root);

  // 1. Node version.
  const major = parseInt(String(process.versions.node).split('.')[0], 10);
  if (major >= 18) {
    reporter.green('Node ' + process.versions.node + ' is new enough');
  } else {
    reporter.red('Node ' + process.versions.node + ' is too old', 'GrowOS needs Node 18 or newer.',
      'Install Node 18+ from nodejs.org, then run setup again.');
    reporter.print();
    return 2;
  }

  // 1b. --relink-codex: a repair, not a new install.
  //
  //     Codex keys each hook's trust to the ABSOLUTE path of .codex/hooks.json,
  //     and `codex exec` SILENTLY SKIPS a hook it does not trust. Move the folder
  //     and the guard is off inside Codex with no error and nothing in the
  //     transcript. This rewrites the wiring for wherever the folder is now, and
  //     carries the owner's old approval across ONLY when it can prove, hash for
  //     hash, that the old entries were this product's own wiring at a previous
  //     location. It takes no business name, because there is nothing to create.
  if (ctx.flags && (ctx.flags.relinkCodex || ctx.flags['relink-codex'])) {
    // Read where this folder came from BEFORE overwriting the evidence. The old
    // .codex/hooks.json still names the old absolute path; once it is rewritten
    // that answer is gone, and guessing at it from the Codex config can take an
    // unrelated install's approval (see oldRootFromWiring).
    const from = codexTrust.oldRootFromWiring(root);
    try {
      codexgen.writeCodexFiles(root);
      reporter.green('Rewrote the Codex wiring for this folder',
        'Updated .codex/hooks.json and .codex/config.toml to point at ' + root + '.');
    } catch (err) {
      reporter.red('Could not write the Codex wiring', err.message,
        'Check folder permissions and run it again.');
      reporter.print();
      return 2;
    }
    try {
      reporter.add(codexTrust.relinkFinding(codexTrust.relinkCodexTrust(root, {
        fromRoot: from.root, fromReason: from.reason,
      })));
    } catch (err) {
      reporter.yellow('Could not relink the Codex guard', err.message,
        'Approve the GrowOS guard in Codex once from this folder.');
    }
    reporter.print();
    return reporter.exitCode();
  }

  // 1c. --codex-trust on its own: the owner approving the guard, nothing else.
  //
  //     Saying yes to the guard has nothing to do with creating a business, and
  //     requiring one meant a FRESH install — which by definition has no
  //     business yet — could not approve the guard at all. The moment an owner
  //     most wants it on was the one moment it was out of reach. With a
  //     --business alongside it, this falls through to the full setup below and
  //     the flag is honoured there as before.
  const ownerSaidYesFlag = !!(ctx.flags && (ctx.flags['codex-trust'] || ctx.flags.codexTrust));
  const wantsBusiness = !!(ctx.flags && ctx.flags.business && String(ctx.flags.business).trim() !== '');
  if (ownerSaidYesFlag && !wantsBusiness) {
    // The wiring has to exist before there is anything to trust.
    try {
      codexgen.writeCodexFiles(root);
    } catch (err) {
      reporter.red('Could not write the Codex wiring', err.message,
        'Check folder permissions and run it again.');
      reporter.print();
      return 2;
    }
    try {
      reporter.add(codexTrust.persistFinding(codexTrust.persistCodexHookTrust(root)));
    } catch (err) {
      reporter.yellow('Could not grant the Codex guard trust', err.message,
        'Open Codex once in this folder and approve the GrowOS guard when asked.');
    }
    reporter.print();
    return reporter.exitCode();
  }

  // 2. Business name -> slug -> create from templates.
  const businessName = ctx.flags && ctx.flags.business;
  if (!businessName || String(businessName).trim() === '') {
    reporter.red('Setup needs a business name', 'Pass it like: --business "Acme Co".',
      'Run: node system/tools/growos.js setup --business "Your Business"');
    reporter.print();
    return 2;
  }
  const slug = slugify(businessName);
  if (slug === '' || RESERVED_SLUGS.has(slug)) {
    reporter.red('That business name cannot be used as a folder', 'It becomes "' + slug + '", which is empty or reserved.',
      'Pick a name with some letters or numbers in it.');
    reporter.print();
    return 2;
  }

  const templateDir = path.join(root, 'system', 'templates', 'business');
  if (!fs.existsSync(templateDir)) {
    reporter.red('The business template is missing', 'system/templates/business was not found.',
      'Re-download the product zip.');
    reporter.print();
    return 2;
  }
  const dest = path.join(root, slug);
  const existed = fs.existsSync(dest);
  const { created, skipped } = copyTreeSkipExisting(templateDir, dest);
  if (existed && created.length === 0) {
    reporter.green('Business "' + slug + '" is already set up', 'Nothing to create; every file was already there.');
  } else if (existed) {
    reporter.green('Business "' + slug + '" was updated', 'Added ' + created.length + ' new file(s); kept ' + skipped.length + ' you already had.');
  } else {
    reporter.green('Created business "' + slug + '"', 'Made ' + created.length + ' starter file(s) from the template.');
  }

  // 3. Codex wiring.
  try {
    codexgen.writeCodexFiles(root);
    reporter.green('Wrote the Codex wiring', 'Created .codex/hooks.json and .codex/config.toml for this folder.');
  } catch (err) {
    reporter.red('Could not write the Codex wiring', err.message, 'Check folder permissions and run setup again.');
  }

  // 4. Mirror.
  const mirrorResult = mirror(root);
  for (const f of mirrorResult.findings) reporter.add(f);

  // 4b. Codex guard trust: only with the owner's OK. Codex asks a human before
  //     it runs any project hook; GrowOS respects that gate. Setup writes the
  //     trust entries only when the owner said yes (--codex-trust), or refreshes
  //     them when a prior yes is already on file. It never grants trust silently,
  //     only ever touches an EXISTING Codex config, and never fails setup.
  try {
    if (ownerSaidYesFlag || provenConsentBefore) {
      reporter.add(codexTrust.persistFinding(codexTrust.persistCodexHookTrust(root)));
    } else {
      const st = codexTrust.trustStatus(root);
      if (st.applicable !== false && !st.noHooks && !st.ok) {
        reporter.yellow('Codex has not accepted the GrowOS guard yet',
          'Codex asks for your OK before it runs any project hook. Until then the guard stays off inside Codex.',
          'Rerun setup with --codex-trust after saying yes, or open Codex once in this folder and approve the GrowOS guard when asked.');
      }
    }
  } catch (err) {
    reporter.yellow('Could not check the Codex guard trust', err.message,
      'Open Codex once in this folder and approve the GrowOS guard when asked.');
  }

  // 5. Initialize .growos state.
  try {
    for (const sub of ['tmp', 'logs', 'sessions']) {
      fs.mkdirSync(path.join(root, '.growos', sub), { recursive: true });
    }
    reporter.green('State folder is ready', 'Made .growos/tmp, .growos/logs, and .growos/sessions.');
  } catch (err) {
    reporter.red('Could not create the state folder', err.message, 'Check folder permissions on .growos.');
  }

  // 6. Health check - fold every finding in so the owner sees the full picture.
  try {
    const { sections } = await doctorChecks.runChecks({ root, flags: {} });
    for (const s of sections) {
      for (const f of s.findings) reporter.add(f);
    }
  } catch (err) {
    reporter.yellow('Could not finish the health check', err.message, 'Run: node system/tools/growos.js doctor');
  }

  reporter.print();
  return reporter.exitCode();
}

module.exports = {
  name: 'setup',
  summary: 'Set up a business folder and wire this install for Claude and Codex.',
  run,
  slugify,
  // Exported so `import` can make the destination business the same way setup
  // does, from one definition. Importing calls this rather than run(): run()
  // also mirrors, wires Codex and folds in every Doctor finding, so its exit
  // code goes red for things that have nothing to do with whether the folder was
  // created — and an import that refused because of an unrelated warning would
  // be a refusal of real work.
  copyTreeSkipExisting,
};
