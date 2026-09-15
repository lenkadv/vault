'use strict';

/**
 * sections.js — merging a shipped template's SECTIONS into a file the owner
 * already has (system/tools/lib/, Build Doc P3.1 as widened by owner decision).
 *
 * WHY THIS EXISTS
 *
 * An update replaces machinery only, and `setup` never touches a file that
 * exists — which is exactly what protects the owner's writing. The cost is that
 * a release which EXTENDS a template reaches nobody who already has that file.
 * Phase 1 added nine sections across six templates, and an existing customer got
 * none of them while the Doctor stayed green, because their files are non-empty.
 *
 * This module computes the merged bytes. It does one thing: take the sections
 * the template has, the sections the file has, and return the file with the
 * MISSING ones inserted where the template puts them. Everything the owner wrote
 * comes out the other side byte for byte — including sections the template has
 * never heard of, and their own text inside sections that ARE shared.
 *
 * That guarantee has exactly one edge, and it is stated here rather than left to
 * be discovered: a file holding NOTHING BUT WHITESPACE is given the template
 * whole, so its spaces and blank lines do not survive. Whitespace is not writing
 * and there is nothing to anchor an insertion to. A byte-order mark IS carried
 * over, because that is an encoding marker rather than whitespace and dropping
 * it changes how the file reads.
 *
 * THE RULES, stated so they can be argued with:
 *
 *   A SECTION IS A `## ` HEADING and everything under it up to the next one.
 *   `###` and deeper belong to their parent. Up to three leading spaces still
 *   makes a heading (four makes indented code), and a closing run of hashes is
 *   not part of the title. A `## ` inside a fenced code block is not a heading.
 *
 *   AMBIGUOUS STRUCTURE IS REFUSED, NOT GUESSED AT. A file whose code fence is
 *   never closed gets `refuse` set and is returned untouched, because below an
 *   open fence there is no way to tell a heading from a line of code — and
 *   guessing wrong appends the same section on every single run.
 *
 *   TWO HEADINGS ARE THE SAME SECTION when their text matches after Unicode
 *   composition (NFC), whitespace collapsing and lower-casing. `##   HOW  WE
 *   SOUND` is `## How we sound`. (Lower-casing, not full Unicode case folding —
 *   said precisely because the difference shows up in Turkish dotless i and
 *   German ß, and a claim of "case folding" would be a claim this does not
 *   deliver.) Nothing cleverer: this never decides that two different phrasings
 *   "mean the same thing", because guessing that wrong adds a duplicate section
 *   to a file the owner reads every day.
 *
 *   PRESENT MEANS UNTOUCHED. A section the file already has is never rewritten,
 *   however far its content has drifted from the template. Only absence is acted
 *   on.
 *
 *   WHERE A MISSING SECTION GOES is after the nearest template section BEFORE it
 *   that the file actually has. Missing ones in a row keep their template order.
 *   If nothing precedes it, it goes above the file's first section — never at
 *   the bottom, which is where an append-only merge would put the file's opening
 *   section.
 *
 * THE HONEST LIMIT. This cannot tell "the owner never had this section" from
 * "the owner deliberately deleted it": both look like absence. So a section
 * someone removed on purpose comes back the next time this runs. That is why
 * the command that uses this previews by default and applies only on --yes, and
 * why every apply is journalled — it is bounded by the owner seeing it, not by
 * this module knowing better. The same goes for a heading the owner RENAMED, or
 * demoted to `###`: the template's version reads as missing and is inserted
 * alongside theirs.
 *
 * PRODUCT code: Node >= 18, stdlib only, no npm, no shelling out. Windows-safe:
 * a CRLF file gets CRLF insertions, because a file that arrives half one and
 * half the other is a diff nobody can read.
 */

/**
 * An ATX H2: up to three leading spaces (four makes it indented code), exactly
 * two hashes, whitespace, the text, and an OPTIONAL closing run of hashes that
 * some editors add. `###` is not a match.
 *
 * Both permissive parts were bugs found in testing: `   ## Voice` and
 * `## Voice ##` are the same section as `## Voice` to every Markdown reader, and
 * failing to see that put a SECOND copy of a section into a file that already
 * had it.
 */
const HEADING = /^ {0,3}##[ \t]+(.*?)(?:[ \t]+#+)?[ \t]*$/;

/**
 * A fence line: up to three leading spaces, then a run of three or more
 * backticks or tildes. `char` and `length` matter — a block opened with ``` is
 * closed only by a run of at least as many backticks, and a closer carries no
 * trailing text. An opener may (```js).
 *
 * The old version toggled a boolean on any fence-looking line. That was wrong in
 * a way that damaged files: a fence left OPEN made every later `## ` read as
 * code, so a missing section was appended INSIDE the open block — and the next
 * run could not see the heading it had just written, so it appended it again,
 * every run, forever. The comment then claimed the worst case "never causes a
 * write", which was simply false. Structure this module cannot read confidently
 * is refused now, because guessing where a fence ends means inventing structure
 * in someone else's file.
 */
const FENCE = /^ {0,3}(`{3,}|~{3,})(.*)$/;

/** The one comparison key for "is this the same section". */
function headingKey(text) {
  return String(text).normalize('NFC').replace(/\s+/g, ' ').trim().toLowerCase();
}

/**
 * split(text) -> { preamble, sections: [{ heading, key, raw }], eol }
 *
 * `raw` is the EXACT substring from a heading line through the byte before the
 * next heading (or the end). So `preamble + every raw` reassembles the input
 * character for character — the property the whole merge rests on, and the one
 * the bench checks first.
 */
function split(text) {
  const src = String(text);
  const eol = src.indexOf('\r\n') !== -1 ? '\r\n' : '\n';

  // Line starts, so a heading's offset is known exactly and nothing is rebuilt
  // from re-joined pieces.
  const starts = [0];
  for (let i = 0; i < src.length; i++) {
    if (src.charCodeAt(i) === 10 /* \n */ && i + 1 < src.length) starts.push(i + 1);
  }

  const marks = [];   // { offset, heading }
  let open = null;    // { char, length } of the fence currently open
  for (let li = 0; li < starts.length; li++) {
    const from = starts[li];
    const to = li + 1 < starts.length ? starts[li + 1] : src.length;
    let line = src.slice(from, to);
    line = line.replace(/\n$/, '').replace(/\r$/, '');

    const f = line.match(FENCE);
    if (f) {
      const char = f[1].charAt(0);
      const length = f[1].length;
      const rest = f[2];
      if (open === null) {
        // CommonMark: a BACKTICK fence's info string may not contain a backtick.
        // So a line like ```` ```a`b ```` is not an opener at all, and treating it
        // as one made an otherwise balanced file look unbalanced — refusing to
        // merge a file there was nothing wrong with. (A tilde fence has no such
        // rule.) Not an opener means it is ordinary text: fall through.
        if (char === '`' && rest.indexOf('`') !== -1) {
          const mh = line.match(HEADING);
          if (mh && mh[1].trim() !== '') marks.push({ offset: from, heading: mh[1].trim() });
          continue;
        }
        open = { char, length };
        continue;
      }
      // A closer matches its opener's character, is at least as long, and
      // carries nothing after it. Anything else is just a line inside the block.
      if (char === open.char && length >= open.length && rest.trim() === '') open = null;
      continue;
    }
    if (open !== null) continue;   // inside a fenced block: not headings

    const m = line.match(HEADING);
    if (m && m[1].trim() !== '') marks.push({ offset: from, heading: m[1].trim() });
  }

  const preamble = marks.length ? src.slice(0, marks[0].offset) : src;
  const sections = marks.map((mk, i) => ({
    heading: mk.heading,
    key: headingKey(mk.heading),
    raw: src.slice(mk.offset, i + 1 < marks.length ? marks[i + 1].offset : src.length),
  }));
  // A fence still open at the end of the file means the structure below it is
  // ambiguous: those lines are code to one reader and headings to another. The
  // caller refuses such a file rather than merging into a guess.
  return { preamble, sections, eol, unbalancedFence: open !== null };
}

/** Re-end every line of `text` with `eol`. */
function toEol(text, eol) {
  const lf = String(text).replace(/\r\n/g, '\n');
  return eol === '\n' ? lf : lf.replace(/\n/g, eol);
}

/** A section ready to drop in: the file's line endings, one blank line after. */
function block(raw, eol) {
  return toEol(raw, eol).replace(/(?:\r?\n)+$/, '') + eol + eol;
}

/** Make sure `out` ends with a blank line, so an insertion is not glued on. */
function withBreak(out, eol) {
  if (out === '') return out;
  if (out.endsWith(eol + eol)) return out;
  if (out.endsWith(eol)) return out + eol;
  return out + eol + eol;
}

/**
 * merge(current, template) -> { text, added: [heading], changed }
 *
 * `text` is what the file should contain. When nothing is missing it is the
 * input, unchanged and byte-identical — the caller can compare and skip.
 */
function merge(current, template) {
  const cur = String(current);
  const c = split(cur);
  const none = (refuse) => ({ text: cur, added: [], changed: false, refuse });

  // Structure this module cannot read confidently is not merged into. See FENCE.
  if (c.unbalancedFence) {
    return none('it has a code fence (``` or ~~~) that is never closed, so there is no way to tell ' +
      'which of the lines below it are headings and which are code');
  }
  const t = split(template);
  if (t.unbalancedFence) {
    return none('the shipped template has an unclosed code fence, which is a bug in GrowOS, not in your file');
  }

  // A file holding nothing but whitespace has nothing WRITTEN in it to lose and
  // nothing to anchor to. Giving it the sections alone would leave a headless
  // file with no title and no explanation, so it gets the template whole.
  //
  // A byte-order mark is not whitespace in that sense: it is how some editors
  // decide the file's encoding, so it is carried over. That distinction is the
  // honest edge of "everything the owner wrote survives" — whitespace is not
  // writing; an encoding marker changes how the file reads.
  if (cur.trim() === '') {
    const bom = cur.charCodeAt(0) === 0xfeff ? '﻿' : '';
    const whole = bom + toEol(template, c.eol);
    return {
      text: whole,
      added: t.sections.map((s) => s.heading),
      changed: whole !== cur,
      refuse: null,
    };
  }

  const byKey = new Map();
  c.sections.forEach((s, i) => byKey.set(s.key, i));   // a repeated heading anchors on its last

  // buckets: index in c.sections to insert AFTER; -1 means above the first one.
  const buckets = new Map();
  const added = [];
  let anchor = -1;
  for (const ts of t.sections) {
    if (byKey.has(ts.key)) { anchor = byKey.get(ts.key); continue; }
    if (!buckets.has(anchor)) buckets.set(anchor, []);
    buckets.get(anchor).push(ts);
    added.push(ts.heading);
  }
  if (added.length === 0) return { text: cur, added: [], changed: false, refuse: null };

  let out = c.preamble;
  let endedWithInsert = false;
  const emit = (idx) => {
    const list = buckets.get(idx);
    if (!list) return;
    for (const ts of list) {
      out = withBreak(out, c.eol) + block(ts.raw, c.eol);
      endedWithInsert = true;
    }
  };
  emit(-1);
  c.sections.forEach((s, i) => {
    out += s.raw;
    endedWithInsert = false;
    emit(i);
  });

  // Only tidy trailing blank lines this module itself just added. Trimming when
  // the owner's own section is last would be editing their file to no purpose.
  if (endedWithInsert) out = out.replace(/(?:\r?\n)+$/, c.eol);

  return { text: out, added, changed: out !== cur, refuse: null };
}

module.exports = { split, merge, headingKey };
