'use strict';

/**
 * fm.js - the shared frontmatter engine (used by the guard hook and the tool).
 *
 * Ported from the proven V2 item-hook engine and generalized. The one sacred
 * property, unchanged from V2: writes only ever INSERT whole new lines (or
 * replace exactly one line, for setField). Existing lines - including block
 * lists, comments, weird spacing, and the body - survive byte-for-byte,
 * because the block is never re-serialized. The engine works line by line on
 * the original text.
 *
 * Deliberately NOT a full YAML parser. It reads and writes TOP-LEVEL scalar
 * fields only (plain unquoted keys at column 0). Block-style values (a key
 * whose list/indented value lives on the next lines) read as '' and are
 * treated as PRESENT, so they are never duplicated or rewritten. Quoted,
 * multiline, and anchored YAML is not interpreted. If full YAML semantics are
 * ever needed, replace this module wholesale - do not bolt partial parsing on.
 *
 * Generalizations over the V2 original (SPEC section 2: parsers must accept
 * what customers' editors produce):
 *   - CRLF files: fields read correctly (the V2 regex missed values on CRLF
 *     lines), and inserted/replaced lines use the file's own line-ending
 *     style, so a CRLF file stays purely CRLF.
 *   - A leading UTF-8 BOM is tolerated on read and preserved on write.
 *     Nothing is stripped silently.
 *   - stampMissing on a file with NO frontmatter prepends a complete block;
 *     the original content is preserved byte-for-byte below it.
 */

const BOM = '\ufeff';

/** Split a leading BOM off. Returns { bom: ''|BOM, text }. */
function splitBom(text) {
  const s = String(text);
  return s.startsWith(BOM) ? { bom: BOM, text: s.slice(1) } : { bom: '', text: s };
}

/** Majority line ending of the text: '\r\n' or '\n' (ties and no-newline -> '\n'). */
function detectEol(text) {
  const crlf = (text.match(/\r\n/g) || []).length;
  const lf = (text.match(/\n/g) || []).length - crlf;
  return crlf > lf ? '\r\n' : '\n';
}

/**
 * Locate the frontmatter block in BOM-free text.
 * The opening line must be exactly --- (trailing spaces/CR tolerated).
 * Returns { has, lines, closeIdx } - lines is text.split('\n').
 */
function locate(text) {
  const lines = text.split('\n');
  if (!/^---[ \t]*\r?$/.test(lines[0] === undefined ? '' : lines[0])) return { has: false, lines };
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') return { has: true, lines, closeIdx: i };
  }
  return { has: false, lines };
}

/** Strip one pair of matching surrounding quotes, like the V2 engine. */
function stripQuotes(s) {
  if (s.length >= 2) {
    const a = s[0];
    const b = s[s.length - 1];
    if ((a === '"' && b === '"') || (a === "'" && b === "'")) return s.slice(1, -1);
  }
  return s;
}

/** Format a scalar for a frontmatter line (V2 rules, unchanged). */
function formatScalar(v) {
  const s = String(v);
  if (s === '') return '""';
  if (/[:#[\]]/.test(s) || /^\s|\s$/.test(s)) return JSON.stringify(s);
  return s;
}

/**
 * Canonicalize a frontmatter key the way a real YAML reader would see it:
 * trim surrounding whitespace (so `status : x` is key `status`, not `status `)
 * and strip one pair of surrounding quotes (so `"status": x` is key `status`).
 * This is what stops a guard/YAML DESYNC: without it the partial reader treats
 * `status ` and `"status"` as different keys from `status`, letting a second
 * status/frozen-field line hide from the guard while YAML honours it.
 */
function canonicalizeKey(raw) {
  return stripQuotes(String(raw).trim());
}

/**
 * Enumerate top-level field lines between the --- fences.
 * Returns [{ key, value, lineIdx }] in file order, keys CANONICALIZED. Comment
 * lines, list items, and indented lines never match. A trailing \r is ignored.
 */
function fieldEntries(loc) {
  const out = [];
  for (let i = 1; i < loc.closeIdx; i++) {
    const line = loc.lines[i].replace(/\r$/, '');
    const m = line.match(/^([^\s:#][^:]*?)\s*:\s*(.*)$/);
    if (m) out.push({ key: canonicalizeKey(m[1]), value: stripQuotes(m[2].trim()), lineIdx: i });
  }
  return out;
}

/**
 * parse(text) -> { hasFm, fields, body, raw, lineEnding, bom }
 *   hasFm      - true when a closed --- block starts the file (after any BOM)
 *   fields     - [{ key, value }] top-level scalars in file order
 *                (block-style values read as '')
 *   body       - everything after the closing --- line (the whole text, minus
 *                any BOM, when there is no frontmatter)
 *   raw        - the input, untouched
 *   lineEnding - '\r\n' or '\n' (majority vote)
 *   bom        - true when the file starts with a UTF-8 BOM
 */
function parse(text) {
  const raw = String(text);
  const { bom, text: t } = splitBom(raw);
  const lineEnding = detectEol(t);
  const loc = locate(t);
  if (!loc.has) {
    return { hasFm: false, fields: [], body: t, raw, lineEnding, bom: bom !== '' };
  }
  const fields = fieldEntries(loc).map((e) => ({ key: e.key, value: e.value }));
  const body = loc.lines.slice(loc.closeIdx + 1).join('\n');
  return { hasFm: true, fields, body, raw, lineEnding, bom: bom !== '' };
}

/**
 * getField(text, name) -> the field's value as a string, or undefined when the
 * file has no frontmatter or no such top-level field. Block-style values read
 * as ''. Duplicated keys: the first one wins. Values are trimmed and one pair
 * of surrounding quotes is stripped.
 */
function getField(text, name) {
  const { text: t } = splitBom(String(text));
  const loc = locate(t);
  if (!loc.has) return undefined;
  const hit = fieldEntries(loc).find((e) => e.key === name);
  return hit ? hit.value : undefined;
}

/**
 * stampMissing(text, fields) -> { text, inserted }
 *
 * INSERT-ONLY stamping. For every {key: value} whose key has NO top-level line
 * in the frontmatter, one new "key: value" line is spliced in just before the
 * closing ---. Keys that already have a line - even with an empty or
 * block-style value - are skipped, so no duplicate lines can ever appear.
 * Values that are undefined or null are skipped. Existing lines are never
 * rewritten or reordered; untouched content is byte-identical.
 *
 * A file with NO frontmatter gets a complete block prepended (in the file's
 * own line-ending style); the original content follows byte-for-byte.
 *
 * Returns the new text plus the list of keys actually inserted. When nothing
 * was missing, `text` is returned unchanged (the same string).
 */
function stampMissing(text, fields) {
  const original = String(text);
  const { bom, text: t } = splitBom(original);
  const eol = detectEol(t);
  const wanted = Object.entries(fields || {}).filter(([, v]) => v !== undefined && v !== null);
  const loc = locate(t);

  if (!loc.has) {
    if (wanted.length === 0) return { text: original, inserted: [] };
    const block = ['---'].concat(
      wanted.map(([k, v]) => k + ': ' + formatScalar(v)),
      ['---', '']
    ).join(eol);
    return { text: bom + block + t, inserted: wanted.map(([k]) => k) };
  }

  const present = new Set(fieldEntries(loc).map((e) => e.key));
  const missing = wanted.filter(([k]) => !present.has(k));
  if (missing.length === 0) return { text: original, inserted: [] };

  const cr = eol === '\r\n' ? '\r' : '';
  const newLines = missing.map(([k, v]) => k + ': ' + formatScalar(v) + cr);
  loc.lines.splice(loc.closeIdx, 0, ...newLines);
  return { text: bom + loc.lines.join('\n'), inserted: missing.map(([k]) => k) };
}

/**
 * setField(text, name, value) -> new text.
 *
 * Replaces exactly ONE line: the first top-level line for `name`, rewritten in
 * canonical "name: value" form (the line's own \r is preserved on CRLF files).
 * Every other byte of the file is untouched. Throws a plain-worded Error when
 * the file has no frontmatter or no such field - use stampMissing to add new
 * fields.
 */
function setField(text, name, value) {
  const original = String(text);
  const { bom, text: t } = splitBom(original);
  const loc = locate(t);
  if (!loc.has) {
    throw new Error('Cannot set "' + name + '": the file has no frontmatter block.');
  }
  const hit = fieldEntries(loc).find((e) => e.key === name);
  if (!hit) {
    throw new Error('Cannot set "' + name + '": no such field in the frontmatter. Use stampMissing to add new fields.');
  }
  const hadCr = loc.lines[hit.lineIdx].endsWith('\r');
  loc.lines[hit.lineIdx] = name + ': ' + formatScalar(value) + (hadCr ? '\r' : '');
  return bom + loc.lines.join('\n');
}

/**
 * fieldKeys(text) -> the raw top-level field keys in file order (with
 * duplicates preserved), or [] when there is no frontmatter. Used by the guard
 * to catch two ambiguities this engine reads differently from a real YAML
 * parser: a duplicated key (we take the first, YAML takes the last) and a
 * mis-cased core key (`Status:` vs `status:`).
 */
function fieldKeys(text) {
  const { text: t } = splitBom(String(text));
  const loc = locate(t);
  if (!loc.has) return [];
  return fieldEntries(loc).map((e) => e.key);
}

module.exports = { parse, getField, stampMissing, setField, fieldKeys, canonicalizeKey, stripQuotes };
