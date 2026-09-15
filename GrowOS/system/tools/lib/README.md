# system/tools/lib — the shared internal modules

Single-purpose building blocks for `growos.js` and the guards. Plain Node (18+),
zero dependencies, no shelling out. Every filesystem path goes through
`path.join`; POSIX `/` appears only in `toPosix()` output and in the machine-set
matching keys. Tests: `_dev/tests/fm.test.js` and `_dev/tests/libs.test.js`.

This file is the contract. If a signature here and the code ever disagree, fix
one of them the same day — later tasks build against this page.

Modules added by later tasks (`targz.js`, `manifest.js`, doctor/update helpers)
document themselves here when they land.

---

## fm.js — the frontmatter engine (ported from the proven V2 hook)

Insert-only by design: it never re-serializes a frontmatter block, so existing
lines, block-style lists, comments, and the body survive byte-for-byte. Reads
and writes TOP-LEVEL plain-scalar fields only (not a YAML parser; block-style
values read as `''` and count as present). Tolerates CRLF files and a leading
UTF-8 BOM on read; on write it keeps the file's own line-ending style and its
BOM — nothing is stripped silently.

- `parse(text) -> { hasFm, fields, body, raw, lineEnding, bom }`
  — `fields` is `[{ key, value }]` in file order (values trimmed, one pair of
  surrounding quotes stripped); `body` is everything after the closing `---`
  (the whole text, minus any BOM, when `hasFm` is false); `raw` is the input
  untouched; `lineEnding` is `'\n'` or `'\r\n'` (majority vote); `bom` is true
  when the file starts with a BOM.
- `getField(text, name) -> string | undefined`
  — first matching top-level field's value; `''` for block-style/empty values;
  `undefined` when the file has no frontmatter or no such field.
- `stampMissing(text, fields) -> { text, inserted }`
  — INSERTS one `key: value` line (just before the closing `---`) for each
  given key that has NO line yet; keys that exist — even with empty or
  block-style values — are skipped, so duplicate lines can never appear;
  `undefined`/`null` values are skipped. A file with no frontmatter gets a
  complete block prepended, original content preserved byte-for-byte below it.
  `inserted` lists the keys actually added; when nothing was missing the very
  same string comes back.
- `setField(text, name, value) -> text`
  — replaces exactly ONE line (the first top-level line for `name`) with
  canonical `name: value`; every other byte is untouched. Throws a plain-worded
  Error when there is no frontmatter or no such field (use `stampMissing` to
  add fields).

Scalar formatting (both writers): empty string becomes `""`; values containing
a colon, hash, or square bracket, or leading/trailing spaces, are JSON-quoted;
everything else is written bare.

## atomic.js — crash-safe writes

- `atomicWrite(targetPath, content) -> undefined`
  — writes the full content to a temp file, then `fs.renameSync` over the
  target: readers (and crashes) see the complete old file or the complete new
  file, never half. Temp location: `<install root>/.growos/tmp/<name>.<rand>.tmp`
  when the target sits inside an install on the same volume, else the sibling
  `<target>.growos-tmp` (the Doctor sweeps that pattern). Creates missing
  parent folders. `content` is a string (UTF-8) or Buffer. On failure the
  target is untouched and temp litter is cleaned up. Not fsync-hardened — the
  guarantee is complete-or-not-at-all, not power-loss durability.
- `atomicAppend(filePath, line) -> undefined`
  — appends one line (adds the trailing `\n` when missing) using an O_APPEND
  open and a single write call. Safe enough for single-machine JSONL: the
  kernel places each append at end-of-file atomically, whole lines never
  interleave, and a crash can only tear the FINAL line — which
  `logbook.readAll` tolerates and reports. Creates missing parent folders.

## ids.js — permanent item ids

- `newId() -> string` — 10 characters, lowercase base36 (`0-9a-z`), from
  `crypto.randomBytes` with rejection sampling (uniform, no modulo bias).
- `isId(s) -> boolean` — true only for a string of exactly 10 lowercase
  base36 characters.

## paths.js — the folder contract

All matchers accept absolute paths or paths relative to `root`, with `/` or `\`
separators; `.` and `..` segments are resolved; paths escaping the root match
nothing. Matching is case-sensitive (the canonical shipped names).

- `findRoot(startDir) -> rootPath` — nearest folder at or above `startDir`
  containing the file `system/VERSION`; throws a plain-worded Error when there
  is none.
- `listBusinesses(root) -> string[]` — sorted top-level dirs that are not
  `system`/`shared`/`_dev`/`dist`/`node_modules`, not dot-prefixed, AND contain
  a `brain/` or `work/` subfolder or a `setup.md` file.
- `isMachinePath(root, p) -> boolean` — exactly the SPEC §1 machine set:
  `system/**`, `.claude/**`, `.codex/**`, `.agents/**`, `.obsidian/**`,
  `system/creative-library/**`, plus the root files `START HERE.md`, `AGENTS.md`,
  `CLAUDE.md`, `GrowOS Queue.base`. The named folders themselves count; the root itself does not.
- `isWorkItem(root, p) -> boolean` — SPEC §4 watched paths:
  `<business>/work/**/*.md` where `<business>` is any top-level name that is
  not `system`/`shared`/`_dev`/`dist` and not dot-prefixed (name rule only, so
  a half-created business is still guarded), and the basename does not start
  with `_` (only the basename is exempt — an underscore FOLDER is not).
- `businessOf(root, p) -> string | null` — the top-level segment when it passes
  the business name rule, else null. Pure path logic (no disk access).
- `channelOf(root, p) -> string | null` — the folder directly under `work/`
  for an item path (`acme/work/social/x.md` → `social`); null when the file
  sits directly in `work/` or the path is not in a business's `work/` tree.
- `toPosix(relPath) -> string` — every `\` becomes `/`; nothing else changes.
  For archive entry names, manifest keys, and watched-path patterns ONLY —
  never feed the result to fs calls.

## logbook.js — the Evidence Camera + the bookmark

Files live in `<root>/<business>/.state/` (created on demand).

- `append(root, business, eventObj) -> entry` — adds `ts` (ISO now) when
  missing, appends one JSON line to `.state/logbook.jsonl` (atomicAppend),
  returns the entry written. Events are recorded as given, not validated.
- `readAll(root, business) -> { entries, corruptTail, badLines }` — every
  parseable event in order; `corruptTail` is true when the final non-empty
  line failed to parse (torn crash write, skipped); `badLines` counts
  unparseable non-tail lines (skipped). Missing/empty file → `[]`, false, 0.
- `writeBookmark(root, business, {doing, item, next, by, ...extras}) -> bookmark`
  — stamps `updated` (ISO now), fills missing canonical fields with `''`,
  passes extras through, writes `.state/bookmark.json` atomically, returns
  what it wrote.
- `readBookmark(root, business) -> object | null` — null when missing or
  unreadable (a broken bookmark just means "nothing to resume").

## diff.js — small line-based unified diff

- `unifiedDiff(aText, bText, {context = 2, maxBytes = 8192}) -> { diff, truncated }`
  — hunks only (no `---`/`+++` header lines), headers always with explicit
  counts (`@@ -3,2 +3,2 @@`), deletions before additions inside a change run.
  `''` when the texts are byte-identical. Lines are `split('\n')`, so a
  trailing-newline-only change is still visible. Common prefix/suffix are
  trimmed, the middle uses a real LCS; an enormous middle falls back to one
  plain replace-hunk (valid, just not minimal). Diffs over `maxBytes` of UTF-8
  are cut at a line boundary (never mid-character) with `truncated: true`.
  Evidence for the logbook — not guaranteed to be `patch`-perfect.

## report.js — findings, plain words, one exit-code contract

- `makeReporter({json} = {}) -> reporter`
  - `add({level, title, detail?, fix?})` — record one finding; `level` must be
    `green`|`yellow`|`red` and `title` a non-empty string (throws otherwise);
    `detail`/`fix` default to `''`.
  - `green(title, detail?, fix?)` / `yellow(...)` / `red(...)` — shorthands.
  - `toJSON() -> { ok, worst, findings }` — findings in insertion order;
    `worst` is the highest level seen (`green` when empty); `ok` is false only
    when `worst` is `red` (yellow still counts as usable).
  - `exitCode() -> 0 | 1 | 2` — green 0, yellow 1, red 2 (SPEC §6).
  - `print()` — human text to stdout: Problems (`✕`), then Warnings (`△`),
    then Looks good (`✓`), each finding as marker + title with indented detail
    and `Fix:` lines, ending in a one-line summary. With `{json: true}` it
    prints the `toJSON()` envelope as one JSON line instead.
