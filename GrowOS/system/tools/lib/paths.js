'use strict';

/**
 * paths.js - where things live in a GrowOS install.
 *
 * One module owns the folder contract so every tool and guard agrees on it:
 *   - what the install root is (the folder holding system/VERSION),
 *   - which top-level folders are businesses,
 *   - which paths belong to the machine set (SPEC section 1),
 *   - which files are work items (SPEC section 4 watched paths),
 *   - and the one sanctioned POSIX conversion for archive/manifest keys.
 *
 * All real filesystem work uses path.join/path.resolve, so it behaves on
 * Windows and on paths with spaces. Backslash separators are accepted in
 * INPUTS to the matchers (Windows callers), and only toPosix converts them
 * in OUTPUT keys (SPEC section 2 exception).
 */

const fs = require('fs');
const path = require('path');

// SPEC section 4: a business is any top-level directory that is NOT one of
// these names and is not dot-prefixed. This name rule guards watched paths.
const NON_BUSINESS = new Set(['system', 'shared', '_dev', 'dist']);

// listBusinesses additionally ignores node_modules (never a business, even in
// a dev checkout) and requires real business content - see listBusinesses().
const NEVER_LISTED = new Set(['system', 'shared', '_dev', 'dist', 'node_modules']);

// SPEC section 1: the machine set (what updates replace).
const MACHINE_DIRS = ['system', '.claude', '.codex', '.agents', '.obsidian'];
const MACHINE_FILES = ['START HERE.md', 'AGENTS.md', 'CLAUDE.md', 'GrowOS Queue.base'];

// The skills GrowOS itself ships. A skill folder under .claude/skills (or its
// .agents/skills mirror) whose name is NOT one of these — and is not in the
// current shipped manifest — belongs to the OWNER: they may create and edit it,
// and an update must not delete it. This baked list is the fail-safe that keeps
// shipped skills protected even when system/manifest.json cannot be read.
const SHIPPED_SKILLS = new Set([
  'humanize', 'review-queue', 'marketing-strategy', 'publish',
  'growos-setup', 'growos-doctor', 'growos-update', 'skill-creator',
  'brain-capture', 'strategy-offer',
  'research-audience', 'research-competitors',
  'ads-meta-create', 'ads-meta-compliance', 'ads-meta-publish', 'ads-meta-doctor',
  'ads-meta-report', 'ads-meta-research', 'video-edit',
  'content-ideas', 'social-strategy', 'social-write', 'email-write', 'image-create',
  'campaign-plan', 'website-audit', 'lead-magnet', 'landing-page-write',
  'vsl-write', 'seo-optimize',
  'article-write', 'content-repurpose', 'carousel-create',
  'video-script', 'youtube-package', 'youtube-thumbnail',
  'video-animate',
  'marketing-report', 'social-engage', 'google-business',
  'product-descriptions', 'cold-outreach', 'webinar-build',
]);

/**
 * Normalize a path (absolute or relative to root) into clean POSIX-style
 * segments relative to the root. Accepts / and \ separators, resolves "." and
 * "..". Returns null when the path escapes the root.
 */
function relSegments(root, p) {
  let s = String(p);
  if (path.isAbsolute(s)) {
    let rel = path.relative(String(root), s);
    // path.relative is case-SENSITIVE, so a wrong-case absolute parent (an
    // upper-cased volume/drive prefix vs the real lower-case root) relativizes to a
    // `..`-escaping string and would slip the machine/work-item predicates on the
    // case-insensitive macOS/Windows filesystems GrowOS targets. When the lexical
    // relativization escapes, retry with a case-insensitive root-prefix match and
    // keep the tail's ORIGINAL case. A deny-guard may over-match (a false deny is
    // safe); it must never under-match. On a genuinely case-sensitive filesystem
    // the only effect is a harmless over-deny of a wrong-case sibling of the root.
    if (rel.split(/[\\/]/)[0] === '..') {
      const rootAbs = path.resolve(String(root));
      const sAbs = path.resolve(s);
      const rl = rootAbs.toLowerCase();
      const sl = sAbs.toLowerCase();
      if (sl === rl) rel = '';
      else if (sl.startsWith(rl + path.sep) || sl.startsWith(rl + '/')) {
        rel = sAbs.slice(rootAbs.length + 1);
      }
    }
    s = rel;
  }
  const out = [];
  for (const seg of s.split(/[\\/]/)) {
    if (seg === '' || seg === '.') continue;
    if (seg === '..') {
      if (out.length === 0) return null; // escapes the root
      out.pop();
      continue;
    }
    out.push(seg);
  }
  return out;
}

/**
 * realpathBestEffort(p) -> p resolved THROUGH the filesystem: `fs.realpathSync` of
 * the nearest EXISTING ancestor, with the not-yet-created tail re-joined lexically.
 * A path that fully exists resolves completely (every symlink followed, including
 * benign ancestor aliases like macOS `/var`->`/private/var`); a brand-new file
 * resolves to its REAL parent + its own name. The guard uses this to judge a
 * symlink alias on what it REALLY opens, not on its innocent name. Best-effort and
 * never throws: if nothing resolves it returns the lexically-resolved absolute path.
 */
function realpathBestEffort(p) {
  let abs;
  try { abs = path.resolve(String(p)); } catch (_) { return String(p); }
  const tail = [];
  let cur = abs;
  let hops = 0;
  for (;;) {
    try {
      const real = fs.realpathSync(cur);
      return tail.length ? path.join(real, ...tail) : real;
    } catch (_) {
      // cur does not fully resolve. If cur ITSELF is a symlink whose target does not
      // exist yet — a DANGLING leaf link, e.g. `brain/x.md -> ../work/social/x.md` for a
      // NEW file written THROUGH the link — realpathSync throws, and treating cur's name
      // as a lexical tail would LOSE the link and resolve it to itself. Follow the link
      // one hop instead, so the twin reflects where the bytes really land, not the link's
      // innocent name (a deny-guard must judge the real destination). Bounded to stop a
      // symlink cycle; on any lstat/readlink error fall through to the lexical walk.
      let linked = null;
      try {
        if (hops < 40 && fs.lstatSync(cur).isSymbolicLink()) {
          linked = path.resolve(path.dirname(cur), fs.readlinkSync(cur));
        }
      } catch (_) { linked = null; }
      if (linked !== null) { hops++; cur = linked; continue; } // re-resolve the target, same tail
      const parent = path.dirname(cur);
      if (parent === cur) return abs; // reached the filesystem root; nothing existed
      tail.unshift(path.basename(cur));
      cur = parent;
    }
  }
}

/**
 * fsNorm(segment) -> a path segment normalized the way the OS resolves it, so a
 * lookalike can't slip a security predicate while the filesystem still opens the
 * protected target:
 *   - lower-cased (macOS/Windows ignore case),
 *   - NTFS alternate-data-stream suffix removed — on Windows `AGENTS.md::$DATA`,
 *     `.env:$DATA`, and `AGENTS.md:stream` all read/write the real file, so
 *     everything from the first ':' is dropped (a ':' never appears in a real
 *     GrowOS path, so this only ever tightens matching),
 *   - trailing dots and spaces stripped (Windows drops them, so `humanize.` and
 *     `humanize ` both open `humanize`).
 * Every path predicate (machine set, custom skill, .env, work item) compares on
 * this form.
 */
function fsNorm(segment) {
  let s = String(segment).toLowerCase();
  const colon = s.indexOf(':');
  if (colon !== -1) s = s.slice(0, colon);   // drop an NTFS :stream / ::$DATA suffix
  return s.replace(/[.\s]+$/, '');
}

/** fsNorm applied to every segment of a relative path string (either separator). */
function fsNormRel(relStr) {
  return String(relStr).split(/[\\/]/).map(fsNorm).join('/');
}

/** The SPEC section 4 business-name rule (name only; no folder inspection).
 *  Compares on fsNorm so a reserved name in an OS-equivalent spelling
 *  (`System`, `system.`, `system::$DATA`) is never mistaken for a business, and
 *  agrees with the fsNorm'd machine/work-item predicates. */
function isBusinessName(name) {
  if (typeof name !== 'string' || name === '' || name.startsWith('.')) return false;
  const norm = fsNorm(name);
  return norm !== '' && !NON_BUSINESS.has(norm);
}

/**
 * findRoot(startDir) -> the install root: the nearest folder at or above
 * startDir that contains the file system/VERSION. startDir may be any path
 * inside the install. Throws a plain-worded Error when no root exists.
 */
function findRoot(startDir) {
  let dir = path.resolve(String(startDir));
  for (;;) {
    let marker = null;
    try { marker = fs.statSync(path.join(dir, 'system', 'VERSION')); } catch (_) { /* keep walking */ }
    if (marker && marker.isFile()) return dir;
    const parent = path.dirname(dir);
    if (parent === dir) {
      throw new Error(
        'Could not find the GrowOS folder. Walked up from "' + String(startDir) +
        '" and never found a folder containing system/VERSION.'
      );
    }
    dir = parent;
  }
}

/**
 * listBusinesses(root) -> sorted names of the business folders in an install.
 * A business is a top-level directory that is not system/shared/_dev/dist/
 * node_modules, not dot-prefixed, AND actually looks like a business: it has a
 * brain/ or work/ subfolder or a setup.md file. (The watched-path guard rule
 * is deliberately broader - see isWorkItem - so a half-created business is
 * still guarded even before this enumerator picks it up.)
 */
function listBusinesses(root) {
  let entries;
  try {
    entries = fs.readdirSync(String(root), { withFileTypes: true });
  } catch (err) {
    throw new Error('Could not read the install folder "' + String(root) + '": ' + err.message);
  }
  const out = [];
  for (const e of entries) {
    if (!e.isDirectory()) continue;
    const name = e.name;
    // Compare the reserved-name set on fsNorm so this enumerator AGREES with the
    // isBusinessName/businessOf predicate: on a case-sensitive Linux box a top-level
    // `System/` folder is NOT in the lower-cased NEVER_LISTED set, so a plain
    // compare would enumerate it as a business while the predicate (fsNorm) rejects
    // it — the guard and the enumerator would then disagree.
    if (name.startsWith('.') || NEVER_LISTED.has(fsNorm(name))) continue;
    const dir = path.join(String(root), name);
    const hasDir = (sub) => {
      try { return fs.statSync(path.join(dir, sub)).isDirectory(); } catch (_) { return false; }
    };
    const hasFile = (sub) => {
      try { return fs.statSync(path.join(dir, sub)).isFile(); } catch (_) { return false; }
    };
    if (hasDir('brain') || hasDir('work') || hasFile('setup.md')) out.push(name);
  }
  return out.sort();
}

/**
 * isMachinePath(root, p) -> true when p (absolute, or relative to root, either
 * separator style) is in the SPEC section 1 machine set: system/**, .claude/**,
 * .codex/**, .agents/**, .obsidian/**, or one of the
 * root files START HERE.md / AGENTS.md / CLAUDE.md / GrowOS Queue.base. The named folders
 * themselves count as machine paths. Paths outside the root never do.
 *
 * Matching is CASE-INSENSITIVE. macOS and Windows (both first-class targets)
 * have case-insensitive filesystems, so `agents.md` and `System/VERSION` resolve
 * to the real machine files on disk; a case-sensitive test would let the AI
 * overwrite machinery by varying case. Denying a lower-cased variant on a
 * case-sensitive Linux box is harmless (no shipped content uses those names).
 */
function isMachinePath(root, p) {
  const segs = relSegments(root, p);
  if (segs === null || segs.length === 0) return false;
  // Normalize EVERY segment the way the OS resolves it (fsNorm: lower-case,
  // trailing dots/spaces stripped). Windows drops a trailing '.'/' ' from a
  // name, so `.claude.`, `system.`, and `AGENTS.md.` all open the real machine
  // file; a plain lower-case compare would miss them and let the AI overwrite
  // machinery. fsNormRel does the same to each machine name it compares against.
  const rel = segs.map(fsNorm).join('/');
  for (const f of MACHINE_FILES) {
    if (rel === fsNormRel(f)) return true;
  }
  for (const d of MACHINE_DIRS) {
    const dl = fsNormRel(d);
    if (rel === dl || rel.startsWith(dl + '/')) return true;
  }
  return false;
}

/**
 * The path segments BELOW a business's work/ folder, or null when p is not
 * inside one. Shared by isWorkItem and isWorkSidecar so the two can never
 * disagree about where "work" begins. The fixed "work" segment is matched
 * case-insensitively for the same reason isMachinePath is: on macOS/Windows,
 * `<business>/Work/...` resolves to the real folder.
 */
function workSegments(root, p) {
  const segs = relSegments(root, p);
  if (segs === null || segs.length < 3) return null;
  if (!isBusinessName(segs[0]) || fsNorm(segs[1]) !== 'work') return null;
  return segs.slice(2);
}

/**
 * isWorkSidecar(root, p) -> true when p sits under a business's work/ tree but
 * is deliberately NOT a work item (Build Doc P4.1). Two shapes:
 *
 *   - Any path with an underscore-prefixed SEGMENT below work/. `_brief.md`
 *     was always exempt; the same convention now covers a whole folder — a
 *     deliverable's parts (drafts, metadata, renders) live in `_promo/` beside
 *     `promo.md`, and nothing inside one ever enters the queue. Checked on the
 *     RAW segment (a leading "_" is never case-folded), on every segment, any
 *     file type — the predicate is about the space, not the extension.
 *   - The shipped `work/README.md` itself (any OS-equivalent spelling), the
 *     folder's own explainer. Only DIRECTLY under work/ — nothing ships a
 *     channel README, so a deeper one is a file in item space.
 *
 * This is the ONE definition of "under work/ but not an item". The guard, the
 * Doctor, the queue and restamp all consult it — before it existed, restamp
 * skipped a part file while the Doctor called the same file red, and neither
 * could tell a part from an item that lost its label. The Doctor's red on a
 * labelless NON-sidecar .md is untouched: that red is also the signal for a
 * real guard bypass, and it keeps its meaning precisely because parts space
 * is now named rather than guessed at.
 */
function isWorkSidecar(root, p) {
  const tail = workSegments(root, p);
  if (tail === null) return false;
  if (tail.some((s) => s.startsWith('_'))) return true;
  if (tail.length === 1 && fsNorm(tail[0]) === 'readme.md') return true;
  return false;
}

/**
 * isWorkItem(root, p) -> true when p is a watched work item per SPEC section 4:
 * <business>/work/<anything>.md where <business> passes the name rule and the
 * path is not sidecar space (isWorkSidecar above).
 *
 * The ".md" extension is matched CASE-INSENSITIVELY for the same reason
 * isMachinePath is: on case-insensitive macOS/Windows filesystems,
 * `<business>/Work/social/post.MD` resolves to the real item, so a
 * case-sensitive test would let the AI edit it unguarded (a strong guard bypass).
 */
function isWorkItem(root, p) {
  const tail = workSegments(root, p);
  if (tail === null || tail.length === 0) return false;
  return fsNorm(tail[tail.length - 1]).endsWith('.md') && !isWorkSidecar(root, p);
}

/**
 * isBookkeepingPath(root, p) -> true when p is GrowOS's own bookkeeping — the
 * record that vouches for what the owner approved and what the system saw
 * (Build Doc P5). Three spaces:
 *
 *   - `.growos/**` at the root (watcher state, session lanes, reconcile marks)
 *   - `<business>/.snapshots/**` (frozen originals and APPROVED copies — the
 *     publishing authority publish-stage checks against)
 *   - `<business>/.state/**` (the append-only logbook, bookmark, staging)
 *
 * The AI's editing tools never write these; the guard and `growos` commands
 * maintain them. Without this, an ordinary Write could rewrite an approved
 * snapshot to match a tampered item and the staging check would vouch for
 * bytes the owner never saw. Segments are fsNorm'd like isMachinePath, so an
 * OS-equivalent spelling (`.Snapshots`, `.state.`) is the same space.
 */
function isBookkeepingPath(root, p) {
  const segs = relSegments(root, p);
  if (segs === null || segs.length === 0) return false;
  if (fsNorm(segs[0]) === '.growos') return true;
  if (segs.length >= 2 && isBusinessName(segs[0])) {
    const second = fsNorm(segs[1]);
    if (second === '.snapshots' || second === '.state') return true;
  }
  return false;
}

/**
 * businessOf(root, p) -> the top-level business folder name a path belongs to,
 * or null when the path is outside the root or its top-level folder is not a
 * business (machine folders, dot folders). Pure path logic: it assumes the
 * path points at (or into) a top-level directory, and does not touch the disk.
 */
function businessOf(root, p) {
  const segs = relSegments(root, p);
  if (segs === null || segs.length === 0) return null;
  // Return the REAL folder segment (not fsNorm'd): callers build filesystem paths
  // from it (snapshot dirs, the logbook), which must keep the folder's true case
  // for case-sensitive Linux. isBusinessName already rejects reserved names in any
  // OS spelling, so a machine dir can never be mistaken for a business here.
  return isBusinessName(segs[0]) ? segs[0] : null;
}

/**
 * channelOf(root, p) -> the channel of a work-item path: the folder directly
 * under work/ (e.g. "social" for acme/work/social/post.md). null when the file
 * sits directly in work/ or the path is not inside a business's work/ tree.
 */
function channelOf(root, p) {
  const segs = relSegments(root, p);
  if (segs === null || segs.length < 4) return null;
  // fsNorm the "work" segment so this AGREES with isWorkItem: a work item at an
  // OS-equivalent spelling (`work.`, `Work`, `work::$DATA`) must still report its
  // channel, or PostToolUse would stamp the wrong channel on a guarded item.
  if (!isBusinessName(segs[0]) || fsNorm(segs[1]) !== 'work') return null;
  return segs[2];
}

/**
 * isShippedSkill(root, name) -> true when a skill folder name belongs to GrowOS
 * itself (so the AI may not edit it and an update may delete/replace it). True
 * when the CURRENT shipped manifest lists a .claude/skills/<name>/ file, OR the
 * name is in the baked SHIPPED_SKILLS fail-safe. The manifest read is wrapped:
 * an absent/unreadable manifest simply falls back to the baked list, so a
 * shipped skill is protected either way. Name matching is case-INSENSITIVE, to
 * line up with isMachinePath on case-insensitive macOS/Windows filesystems.
 */
function isShippedSkill(root, name) {
  const lower = fsNorm(name || '');
  if (lower === '') return false;
  if (SHIPPED_SKILLS.has(lower)) return true;
  try {
    let text = fs.readFileSync(path.join(String(root), 'system', 'manifest.json'), 'utf8');
    if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);
    const mf = JSON.parse(text);
    const files = mf && typeof mf === 'object' && mf.files && typeof mf.files === 'object' ? mf.files : {};
    for (const key of Object.keys(files)) {
      // Compare on the normalized skill-folder segment, so a lookalike name
      // (trailing dot/space, different case) still matches a shipped skill.
      const segs = String(key).split(/[\\/]/);
      if (segs.length >= 3 && segs[0].toLowerCase() === '.claude' &&
          segs[1].toLowerCase() === 'skills' && fsNorm(segs[2]) === lower) return true;
    }
  } catch (_) { /* no manifest / unreadable -> rely on the baked SHIPPED_SKILLS list */ }
  return false;
}

/**
 * isCustomSkillPath(root, p) -> true when p is a file inside an OWNER-created
 * skill folder: `.claude/skills/<name>/...` where <name> is a real skill folder
 * (non-empty, not dot- or underscore-prefixed) that is NOT a shipped skill.
 * These paths are machine paths by location, but the owner is allowed to create
 * and edit them — the guard exempts them, and updates never delete them.
 *
 * `.claude/skills/` is the SOLE place a custom skill is authored. `.agents/skills/`
 * is a GENERATED mirror written only by the `mirror` tool (which does not go
 * through the write guard), so it stays fully machine-protected here — otherwise
 * an update's mirror step, which prunes `.agents` entries that have no `.claude`
 * twin, would silently delete an `.agents`-only custom skill.
 *
 * Requires at least four segments (folder + a file under it): the skills root and
 * a bare skill folder themselves stay fully machine-protected. Every structural
 * segment is fsNorm-compared (case + trailing dot/space), so `.claude./skills/`
 * or a lookalike shipped name cannot slip past. Any error resolves to false, so
 * an unexpected input keeps the path machine-protected (fail safe).
 */
function isCustomSkillPath(root, p) {
  try {
    const segs = relSegments(root, p);
    if (segs === null || segs.length < 4) return false;
    if (fsNorm(segs[0]) !== '.claude') return false;   // .agents is generated, not authored here
    if (fsNorm(segs[1]) !== 'skills') return false;
    const name = segs[2];
    if (!name || name.charAt(0) === '.' || name.charAt(0) === '_') return false;
    // A name that normalizes to empty (all dots/spaces) would resolve to the
    // skills root itself on Windows — never treat it as a custom skill.
    if (fsNorm(name) === '') return false;
    return !isShippedSkill(root, name);
  } catch (_) {
    return false; // fail safe: stays machine-protected
  }
}

/**
 * isEnvFile(p) -> true when a path points at a per-business secrets file: a file
 * whose basename is exactly `.env` or begins with `.env.` (e.g. `.env.local`).
 * These hold keys and passwords and are the ONE sanctioned home for secrets, so
 * the guard keeps them out of the AI's read tools, the packager keeps them out of
 * every shipped artifact, and the Doctor's secret scan never treats them as a
 * leak. Pure basename logic (no disk touch); accepts / and \ separators.
 */
function isEnvFile(p) {
  // Normalize the basename the way the OS resolves it (lower-case, trailing
  // dots/spaces stripped) so `.ENV`, `.Env`, and `.env ` are all caught — on
  // case-insensitive filesystems they open the same secrets file as `.env`.
  const base = fsNorm(String(p).split(/[\\/]/).pop() || '');
  return base === '.env' || base.indexOf('.env.') === 0;
}

// View metadata an operating system writes on its own, just because a folder
// was opened. Finder makes .DS_Store; Explorer makes Thumbs.db and desktop.ini.
// None of it is content, none of it is ours, and all of it comes straight back
// the next time anyone looks at the folder.
const AMBIENT_LITTER = new Set(['.ds_store', 'thumbs.db', 'desktop.ini']);

/**
 * isAmbientLitter(name) -> true for a file the OS made by itself.
 *
 * THE ONE definition, shared by everything that has to agree on it: mirror (so
 * litter is never copied into .agents/ and never held against byte-parity), the
 * Doctor's twin-parity hash, the release lint's twin checker, and the packager.
 * They used to disagree, and the disagreement was expensive: a .DS_Store inside
 * .agents/skills read as "mirror output with no source", which REFUSED the
 * release build. On any Mac where someone had once opened the folder in Finder,
 * a release could not be cut at all.
 *
 * Deliberately narrow. Cloud-sync damage — "post 2.md", a conflicted copy, an
 * .icloud placeholder, a .growos-tmp — is NOT this. Those files hold the
 * owner's real bytes, and losing one loses work, so they stay the Doctor's
 * business (check 9) and are never quietly swept up as litter.
 *
 * Windows is first-class here: Explorer's two names count exactly as Finder's
 * one does. Matching is case-insensitive because that is how the filesystems
 * GrowOS targets hand these names back. Pure basename logic, no disk touch.
 */
function isAmbientLitter(name) {
  if (typeof name !== 'string' || name === '') return false;
  return AMBIENT_LITTER.has(name.toLowerCase());
}

// A file that belongs to the CUSTOMER'S MACHINE, never the shipped product: the
// owner's own Claude Code permissions/allowlist, created by Claude Code itself
// after install and different on every machine. No package's files{} and no
// shipped manifest may ever name it.
const LOCAL_ONLY_FILES = new Set(['.claude/settings.local.json']);

/**
 * isLocalOnlyFile(relPath) -> true when relPath is a customer-machine-local
 * file: a customer-machine-local file that is never shipped, never included in
 * the shipped product manifest, and must never be deleted, relocated, "kept as
 * a customization," or restored from a snapshot — it belongs to the install,
 * not the product.
 *
 * THE ONE definition, shared by everything that has to agree on it: the
 * updater's swap plan (never lists it as "removed" just because no payload
 * ships it) and its customization detector (never mislabels the owner's copy
 * as "customized... will be kept"), the payload refusal (a package whose
 * files{} names it is refused outright, before anything is mutated), rollback
 * (never deletes it when a snapshot predates it, never overwrites it with an
 * older snapshot's bytes, and never lets either skip fail the byte-identical
 * verify or inflate the restored-file count), and the packager (never lists it
 * to ship). They used to each hard-code the same one path independently, which
 * is exactly how a rename or a lookalike spelling slips through one of them.
 *
 * Matched on fsNormRel — the SAME filesystem-aware normalization isMachinePath
 * and isEnvFile use (case-insensitive, either path separator, trailing dots/
 * spaces stripped, an NTFS :stream suffix dropped) — so an OS-equivalent
 * spelling resolves the way the filesystem actually resolves it. Compares the
 * WHOLE relative path, not just the basename: a same-named file anywhere else
 * (a business folder, a nested skill) is not this file. Pure path logic; no
 * disk touch.
 */
function isLocalOnlyFile(relPath) {
  if (typeof relPath !== 'string' || relPath === '') return false;
  return LOCAL_ONLY_FILES.has(fsNormRel(relPath));
}

/**
 * toPosix(relPath) -> the relative path with every backslash turned into "/".
 * The ONE sanctioned place to build archive entry names, manifest keys, and
 * watched-path patterns (SPEC section 2 exception). String conversion only:
 * no resolving, no collapsing, spaces preserved. Never feed the result to fs
 * calls - filesystem work stays on path.join.
 */
function toPosix(relPath) {
  return String(relPath).replace(/\\/g, '/');
}

module.exports = { findRoot, listBusinesses, isMachinePath, isBookkeepingPath, isWorkItem, isWorkSidecar, businessOf, channelOf, toPosix, isShippedSkill, isCustomSkillPath, isEnvFile, isAmbientLitter, isLocalOnlyFile, realpathBestEffort, fsNorm, fsNormRel, SHIPPED_SKILLS };
