'use strict';

/**
 * cmd-mirror.js - regenerate the Codex twin (SPEC section 6.5).
 *
 * mirror(root) does three things and returns plain findings:
 *   1. Regenerate .agents/skills as a REAL byte-for-byte copy of .claude/skills
 *      (delete the target's contents first, copy every file - never a symlink),
 *      then verify byte-parity by hashing both trees. If .claude/skills is
 *      missing or empty, create an empty .agents/skills and note it.
 *      Ambient OS litter (.DS_Store and friends - paths.isAmbientLitter) is
 *      never copied, never hashed for parity, and is SWEPT OUT of .agents/:
 *      that folder is generated, so nothing in it is anyone's work.
 *   2. Skill lint on every .claude/skills/-star-/SKILL.md: refuse (red) on a
 *      UTF-8 BOM, on a frontmatter `description` that contains ": " while
 *      unquoted, or on CRLF line endings. These three break Codex 0.135.0
 *      (see _dev/reference/codex-wiring.md). Lint runs BEFORE the copy, so a
 *      broken skill is never mirrored to Codex.
 *   3. codexgen writes .codex/hooks.json + config.toml (shared with setup).
 *
 * The command wrapper (run) prints the findings and returns the exit code;
 * setup imports mirror() directly and folds the findings into its own report.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { makeReporter } = require('./report.js');
const { atomicWrite } = require('./atomic.js');
const codexgen = require('./codexgen.js');
const codexTrust = require('./codex-trust.js');
const paths = require('./paths.js');

/* ------------------------------- helpers -------------------------------- */

/**
 * Recursively collect regular files under dir as POSIX rel paths, sorted.
 * Raw on purpose — ambient litter is INCLUDED here, because the prune step
 * below needs to see it in order to delete it. Callers that are asking "what
 * is a skill file" filter with contentFiles().
 */
function walkRel(dir, prefix, out) {
  let dirents;
  try {
    dirents = fs.readdirSync(dir, { withFileTypes: true });
  } catch (_) {
    return out; // missing dir -> no files
  }
  dirents.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
  for (const d of dirents) {
    const rel = prefix === '' ? d.name : prefix + '/' + d.name;
    if (d.isDirectory()) walkRel(path.join(dir, d.name), rel, out);
    else out.push(rel);
  }
  return out;
}

/**
 * The files under dir that are actually skill content: everything the walk
 * found, minus the view metadata Finder and Explorer leave behind. Litter is
 * never mirrored and never counted in byte-parity, so a .DS_Store on one side
 * only — the normal state of any Mac — is not a failed mirror
 * (paths.isAmbientLitter is the shared definition).
 */
function contentFiles(dir) {
  return walkRel(dir, '', []).filter((rel) => !paths.isAmbientLitter(rel.split('/').pop()));
}

/** rel-path -> sha256 map for every skill file under dir (empty when absent). */
function hashTree(dir) {
  const map = {};
  for (const rel of contentFiles(dir)) {
    map[rel] = crypto.createHash('sha256').update(fs.readFileSync(path.join(dir, ...rel.split('/')))).digest('hex');
  }
  return map;
}

/** The raw text of the frontmatter block (between the first two --- fences). */
function frontmatterBlock(text) {
  const t = text.charCodeAt(0) === 0xfeff ? text.slice(1) : text;
  const lines = t.split('\n');
  if (!/^---[ \t]*\r?$/.test(lines[0] === undefined ? '' : lines[0])) return null;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].replace(/\r$/, '').trim() === '---') return lines.slice(1, i);
  }
  return null;
}

/** The raw (quote-preserving) value of the `description:` line, or undefined. */
function rawDescription(text) {
  const block = frontmatterBlock(text);
  if (!block) return undefined;
  for (const line of block) {
    const m = line.replace(/\r$/, '').match(/^description:\s*(.*)$/);
    if (m) return m[1].trim();
  }
  return undefined;
}

/** True when a scalar value is wrapped in a matching pair of quotes. */
function isQuoted(v) {
  if (v.length < 2) return false;
  const a = v[0];
  const b = v[v.length - 1];
  return (a === '"' && b === '"') || (a === "'" && b === "'");
}

/** Lint one SKILL.md's raw text. Returns an array of plain problem strings. */
function lintSkillText(rel, text) {
  const problems = [];
  if (text.charCodeAt(0) === 0xfeff) {
    problems.push(rel + ' starts with a hidden BOM character (Codex cannot read it).');
  }
  if (text.indexOf('\r\n') !== -1 || text.indexOf('\r') !== -1) {
    problems.push(rel + ' uses Windows (CRLF) line endings; save it with plain line breaks.');
  }
  const desc = rawDescription(text);
  if (desc !== undefined && !isQuoted(desc) && desc.indexOf(': ') !== -1) {
    problems.push(rel + " has a description with a colon-space that is not in quotes; wrap the description in single quotes.");
  }
  return problems;
}

/** List every .claude/skills/<name>/SKILL.md as { rel, abs }. */
function listSkillFiles(claudeSkills) {
  const out = [];
  let names;
  try {
    names = fs.readdirSync(claudeSkills, { withFileTypes: true });
  } catch (_) {
    return out;
  }
  for (const d of names) {
    if (!d.isDirectory()) continue;
    const abs = path.join(claudeSkills, d.name, 'SKILL.md');
    if (fs.existsSync(abs)) out.push({ rel: path.posix.join('.claude', 'skills', d.name, 'SKILL.md'), abs });
  }
  return out;
}

/* -------------------------------- mirror -------------------------------- */

/**
 * mirror(root) -> { findings, ok }.
 * findings: [{ level, title, detail, fix }]; ok is false when any red finding
 * was recorded (lint failure or a parity failure), matching exit code 2.
 */
function mirror(root) {
  const findings = [];
  const add = (level, title, detail, fix) => findings.push({ level, title, detail: detail || '', fix: fix || '' });

  const claudeSkills = path.join(String(root), '.claude', 'skills');
  const agentsSkills = path.join(String(root), '.agents', 'skills');

  // 1. Lint first - never mirror a skill Codex cannot read.
  const skillFiles = listSkillFiles(claudeSkills);
  const lintProblems = [];
  for (const s of skillFiles) {
    let text;
    try {
      text = fs.readFileSync(s.abs, 'utf8');
    } catch (err) {
      lintProblems.push(s.rel + ' could not be read: ' + err.message);
      continue;
    }
    for (const p of lintSkillText(s.rel, text)) lintProblems.push(p);
  }
  if (lintProblems.length > 0) {
    add('red', 'Some skills would be invisible to Codex', lintProblems.join(' | '),
      'Fix the listed SKILL.md files, then run: node system/tools/growos.js mirror');
    // Still write the Codex wiring (harmless), but do NOT copy broken skills.
    let cg = null;
    try { cg = codexgen.writeCodexFiles(root); } catch (_) { /* reported elsewhere */ }
    if (cg) add('green', 'Codex wiring written', 'Refreshed .codex/hooks.json and .codex/config.toml.');
    return { findings, ok: false };
  }

  // 2. Regenerate .agents/skills as a real-file copy of .claude/skills by syncing
  //    IN PLACE: write/replace every source file atomically (each file is always a
  //    complete old-or-new), then delete stale files. Unlike a delete-then-copy or
  //    an rm-then-rename swap, this never leaves .agents/skills absent or a file
  //    half-written — a crash mid-sync leaves a valid, individually-consistent tree
  //    that the byte-parity check below (and the Doctor) flags as out of sync
  //    (Codex #2 robustness).
  const sourceFiles = contentFiles(claudeSkills);
  const desired = new Set(sourceFiles);
  try {
    fs.mkdirSync(agentsSkills, { recursive: true });
    for (const rel of sourceFiles) {
      atomicWrite(path.join(agentsSkills, ...rel.split('/')), fs.readFileSync(path.join(claudeSkills, ...rel.split('/'))));
    }
    // Prune everything in the copy that is not a source skill file. The walk is
    // the RAW one on purpose, so ambient litter is on the list and gets swept
    // out too — .agents/ is generated, and nothing there is anyone's work.
    for (const rel of walkRel(agentsSkills, '', [])) {
      if (!desired.has(rel)) fs.rmSync(path.join(agentsSkills, ...rel.split('/')), { force: true });
    }
  } catch (err) {
    add('red', 'Could not sync the Codex skills copy', err.message, 'Check folder permissions, then run mirror again.');
    return { findings, ok: false };
  }
  // Verify byte-parity both ways.
  {
    const a = hashTree(claudeSkills);
    const b = hashTree(agentsSkills);
    const keysA = Object.keys(a).sort();
    const keysB = Object.keys(b).sort();
    const identical = keysA.length === keysB.length && keysA.every((k, i) => k === keysB[i] && a[k] === b[k]);
    if (!identical) {
      add('red', 'The Codex skills copy does not match', 'Syncing .claude/skills to .agents/skills did not produce an identical tree.',
        'Run mirror again; if it repeats, re-download the product.');
      return { findings, ok: false };
    }
  }
  if (sourceFiles.length === 0) {
    add('green', 'No skills to mirror yet', 'There are no skills in .claude/skills, so the Codex copy is an empty folder.');
  } else {
    add('green', 'Codex skills copy is in sync', 'Synced ' + sourceFiles.length + ' file(s) to .agents/skills, byte-for-byte.');
  }

  // 3. Codex wiring.
  try {
    codexgen.writeCodexFiles(root);
    add('green', 'Codex wiring written', 'Refreshed .codex/hooks.json and .codex/config.toml.');
  } catch (err) {
    add('red', 'Could not write the Codex wiring', err.message, 'Check folder permissions, then run mirror again.');
    return { findings, ok: false };
  }

  return { findings, ok: true };
}

/* ------------------------------ command --------------------------------- */

function run(args, ctx) {
  const reporter = makeReporter({ json: ctx.flags && ctx.flags.json });
  if (!ctx.root) {
    reporter.red('Could not find your GrowOS folder', 'There is no system/VERSION at or above where this ran.');
    reporter.print();
    return 2;
  }
  // Read the owner's standing approval BEFORE mirror regenerates the wiring —
  // afterwards there is nothing left to compare the old approval against
  // (codexTrust.hasProvenConsent).
  const provenConsentBefore = codexTrust.hasProvenConsent(ctx.root);

  const { findings } = mirror(ctx.root);
  for (const f of findings) reporter.add(f);

  // Refresh the Codex guard trust, but only when the owner already said yes:
  // mirror rewrites .codex/hooks.json, and any change to it changes each hook's
  // trust hash, so an EXISTING grant must be refreshed or Codex would silently
  // skip the guard. Without a prior grant nothing is written (Codex's approval
  // gate is the owner's to open, via setup --codex-trust or inside Codex).
  // Kept in the CLI wrapper (not the mirror() lib) so a test that imports
  // mirror(root) never writes to the user's config.
  try {
    if (provenConsentBefore) {
      reporter.add(codexTrust.persistFinding(codexTrust.persistCodexHookTrust(ctx.root)));
    } else {
      const st = codexTrust.trustStatus(ctx.root);
      if (st.applicable !== false && !st.noHooks && !st.ok) {
        reporter.yellow('Codex has not accepted the GrowOS guard yet',
          'Codex asks for your OK before it runs any project hook. Until then the guard stays off inside Codex.',
          'Run setup with --codex-trust after saying yes, or open Codex once in this folder and approve the GrowOS guard when asked.');
      }
    }
  } catch (err) {
    reporter.yellow('Could not check the Codex guard trust', err.message,
      'Open Codex once in this folder and approve the GrowOS guard when asked.');
  }

  reporter.print();
  return reporter.exitCode();
}

module.exports = { name: 'mirror', summary: 'Rebuild the Codex twin (.agents/skills + .codex) from .claude/skills.', run, mirror };
