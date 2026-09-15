'use strict';

/**
 * links.js — wikilinks for the brain (Build Doc Phase 6).
 *
 * The brain is a linked wiki: pages point at each other with `[[page]]`
 * links, the way Obsidian writes them. Work items are NOT part of this —
 * they keep plain ids, because the guard stamps and checks those and the
 * queue groups on them.
 *
 * The lint launches with exactly TWO rules, and the restraint is the point:
 *
 *   1. A broken wikilink — a `[[target]]` no file in the brain answers to.
 *   2. A required top-level page missing from MEMORY.md's index.
 *
 * There is deliberately NO orphan rule: a check that flags every README as
 * an orphan trains owners to ignore the Doctor, which costs more than the
 * rule is worth. When the orphan graph earns its place it arrives as its own
 * decision, not as scope creep here.
 *
 * Link shapes understood (Obsidian's): `[[page]]`, `[[page|alias]]`,
 * `[[page#Heading]]`, `[[page#^block]]`, `![[embed]]`, `[[folder/page]]`.
 * `[[#heading]]` names no file and is skipped. Text inside fenced code
 * blocks (``` or ~~~) and inline code spans is not a link.
 *
 * Resolution mirrors what the filesystem and Obsidian would do: a target
 * matches a brain file by its path (with or without `.md`) or by bare
 * basename anywhere in the brain, case-insensitively (paths.fsNorm — the
 * OS the owner is on resolves names that way). TWO files answering the
 * same bare name is ambiguous, not broken — rule 1 stays about links that
 * answer to NOTHING.
 *
 * PRODUCT code: Node >= 18, stdlib only, no npm, no shelling out.
 */

const fs = require('node:fs');
const path = require('node:path');
const paths = require('./paths.js');

/* ------------------------------- parsing --------------------------------- */

/**
 * Strip the stretches of text that are code, replacing them with spaces of
 * the same length so nothing shifts. Fenced blocks first (``` / ~~~, from a
 * fence-opening line to the closing fence or EOF), then inline spans.
 */
function blankCode(text) {
  const s = String(text);
  const out = [];
  let inFence = false;
  let fenceMark = '';
  for (const line of s.split(/(\n)/)) {
    if (line === '\n') { out.push(line); continue; }
    // ANY indentation opens a fence (P6 review, finding 3): a fence inside a
    // list sits at 4+ spaces, and a line starting ``` is essentially never
    // prose. (Four-space INDENTED code blocks stay unhandled — blanking all
    // indented text would eat real links in nested lists; recorded in SPEC.)
    const open = line.match(/^\s*(`{3,}|~{3,})/);
    if (!inFence && open) {
      inFence = true;
      fenceMark = open[1][0];
      out.push(' '.repeat(line.length));
      continue;
    }
    if (inFence) {
      const close = line.match(/^\s*(`{3,}|~{3,})\s*$/);
      out.push(' '.repeat(line.length));
      if (close && close[1][0] === fenceMark) inFence = false;
      continue;
    }
    // Inline spans: a run of backticks closed by an equal run (so ``…`` hides
    // its contents like `…` does — P6 review, finding 4).
    out.push(line.replace(/(`+)[^`]+\1/g, (m) => ' '.repeat(m.length)));
  }
  return out.join('');
}

/**
 * parseWikilinks(text) -> [{ target, heading, alias, embed, raw }]
 * Targets are returned verbatim (trimmed); a link whose target is empty
 * after stripping the heading part ([[#h]]) is skipped — it names no file.
 */
function parseWikilinks(text) {
  const cleaned = blankCode(text);
  const found = [];
  // The lookbehind skips an ESCAPED link (`\[[syntax]]` shows the syntax
  // rather than linking — P6 review, finding 5).
  const re = /(?<!\\)(!?)\[\[([^\[\]\n]+)\]\]/g;
  let m;
  while ((m = re.exec(cleaned))) {
    const embed = m[1] === '!';
    let body = m[2];
    let alias = null;
    const pipe = body.indexOf('|');
    if (pipe !== -1) { alias = body.slice(pipe + 1).trim(); body = body.slice(0, pipe); }
    let heading = null;
    const hash = body.indexOf('#');
    if (hash !== -1) { heading = body.slice(hash + 1).trim(); body = body.slice(0, hash); }
    const target = body.trim();
    if (target === '') continue; // [[#heading]] — a same-file jump, no file named
    found.push({ target, heading, alias, embed, raw: m[0] });
  }
  return found;
}

/* ------------------------------ resolution ------------------------------- */

/**
 * buildResolver(relFiles) -> resolve(target) -> [matching rel paths]
 *
 * relFiles are BRAIN-relative POSIX paths ("plan.md", "research/x.md") — a
 * path link is written relative to the brain, so the index must be too.
 * Indexed three ways, all through fsNorm (lower-case, OS-equivalent
 * spellings):
 *   - the exact relative path, with and without a trailing `.md`
 *   - the bare basename without `.md` (for `[[page]]` from anywhere)
 *   - the full basename (for `![[logo.png]]` embeds)
 */
function buildResolver(relFiles) {
  const byKey = new Map();
  const add = (key, rel) => {
    const k = paths.fsNorm(key);
    if (k === '') return;
    if (!byKey.has(k)) byKey.set(k, []);
    const list = byKey.get(k);
    if (list.indexOf(rel) === -1) list.push(rel);
  };
  for (const rel of relFiles) {
    const p = String(rel).replace(/\\/g, '/');
    add(p, p);
    if (/\.md$/i.test(p)) add(p.replace(/\.md$/i, ''), p);
    const base = p.split('/').pop();
    add(base, p);
    if (/\.md$/i.test(base)) add(base.replace(/\.md$/i, ''), p);
  }
  return function resolve(target) {
    const t = paths.fsNorm(String(target).replace(/\\/g, '/').replace(/^\.\//, ''));
    return byKey.get(t) ? byKey.get(t).slice() : [];
  };
}

/* ------------------------------- the lint -------------------------------- */

/** The top-level pages MEMORY.md's index must carry (rule 2), plus the
 *  folder indexes — the Change Plan's "top-level pages and folder indexes
 *  only". A hundred files in samples/ never enter MEMORY.md; samples/index.md
 *  does, once. */
const INDEXED_TOP_PAGES = [
  'business', 'audience', 'voice', 'brand', 'plan', 'decisions',
  'competitors', 'methodology', 'ideas', 'compliance',
];
const INDEXED_FOLDER_INDEXES = ['assets/index', 'samples/index', 'research/index'];

/**
 * lintBusinessLinks(root, business) -> {
 *   broken:      [{ file, target }]   // rule 1, capped at 50
 *   indexMissing: [name]              // rule 2
 *   problems:    [string]             // could-not-look notes (never thrown)
 * }
 *
 * Walks `<business>/brain/` once, indexes every file, parses every .md.
 * "Could not read" is a problem line, never a silent skip and never a crash —
 * the Doctor wraps this into findings.
 */
function lintBusinessLinks(root, business) {
  const out = { broken: [], indexMissing: [], problems: [] };
  const brainAbs = path.join(String(root), String(business), 'brain');
  const files = [];
  const mdFiles = [];
  const walk = (dir, rel) => {
    let names = [];
    try { names = fs.readdirSync(dir, { withFileTypes: true }); }
    catch (err) {
      out.problems.push((rel || 'brain') + ' could not be listed (' + (err && err.code ? err.code : 'error') + ')');
      return;
    }
    for (const d of names) {
      if (d.name === '.DS_Store') continue;
      const r = rel === '' ? d.name : rel + '/' + d.name;
      const abs = path.join(dir, d.name);
      if (d.isDirectory()) { walk(abs, r); continue; }
      if (!d.isFile()) continue; // links/sockets: not brain pages, reconcile/Doctor own those stories
      files.push(r);
      if (/\.md$/i.test(d.name)) mdFiles.push({ rel: r, abs });
    }
  };
  walk(brainAbs, '');

  // With part of the brain UNLISTABLE, the file index is incomplete and every
  // link into the unseen subtree would read as broken — a false flood that
  // trains the owner to ignore the Doctor (P6 review, finding 8). The honest
  // report is the could-not-look problem alone; rule 1 waits until it can see.
  const resolve = buildResolver(files);
  out.brokenTotal = 0;
  if (out.problems.length === 0) {
    for (const f of mdFiles) {
      let text = null;
      try { text = fs.readFileSync(f.abs, 'utf8'); }
      catch (_) { out.problems.push('brain/' + f.rel + ' could not be read'); continue; }
      for (const link of parseWikilinks(text)) {
        if (resolve(link.target).length === 0) {
          out.brokenTotal += 1;
          if (out.broken.length < 50) out.broken.push({ file: 'brain/' + f.rel, target: link.target });
        }
      }
    }
    if (out.problems.length) { out.broken = []; out.brokenTotal = 0; } // a mid-walk read failure: same rule
  }

  // Rule 2: the index. Only pages that EXIST are required to be indexed —
  // a missing required page is checkFolders' red already, and two findings
  // for one absence would be noise.
  let mem = null;
  try { mem = fs.readFileSync(path.join(brainAbs, 'memory', 'MEMORY.md'), 'utf8'); }
  catch (_) { mem = null; } // missing MEMORY.md is already a required-file red
  if (mem !== null) {
    // Normalise each MEMORY.md link the way the RESOLVER would: strip a
    // leading ./ and a trailing .md, so [[business.md]] and [[./audience]]
    // satisfy the index exactly like [[business]] (P6 review, finding 7).
    const idxNorm = (t) => paths.fsNorm(String(t).replace(/^\.\//, '').replace(/\.md$/i, ''));
    const memLinks = new Set(parseWikilinks(mem).map((l) => idxNorm(l.target)));
    for (const page of INDEXED_TOP_PAGES) {
      const exists = fs.existsSync(path.join(brainAbs, page + '.md'));
      if (exists && !memLinks.has(paths.fsNorm(page))) out.indexMissing.push(page);
    }
    for (const idx of INDEXED_FOLDER_INDEXES) {
      const exists = fs.existsSync(path.join(brainAbs, ...(idx + '.md').split('/')));
      if (exists && !memLinks.has(paths.fsNorm(idx)) && !memLinks.has(paths.fsNorm(idx + '.md'))) {
        out.indexMissing.push(idx);
      }
    }
  }
  return out;
}

module.exports = { parseWikilinks, buildResolver, lintBusinessLinks, INDEXED_TOP_PAGES, INDEXED_FOLDER_INDEXES };
