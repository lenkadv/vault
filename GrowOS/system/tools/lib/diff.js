'use strict';

/**
 * diff.js - a small line-based unified diff (SPEC section 5.4).
 *
 * Made for logbook "edited" events: show what the owner changed, capped at
 * 8 KB per event. Output is hunks only (no ---/+++ file header lines), exactly
 * like the SPEC example: "@@ -3,2 +3,2 @@\n-old hook line\n+new hook line".
 *
 * Correctness over elegance, per the build brief:
 *   - Lines are text.split('\n'); the empty string after a final newline
 *     counts as a line, so a trailing-newline-only change is still visible.
 *   - Common prefix/suffix are trimmed first, then a classic LCS table finds
 *     the minimal middle. When the middle is too big for the table (millions
 *     of cells), it falls back to one plain replace-hunk (all removals, then
 *     all additions) - still a valid diff, just not minimal. This is evidence
 *     for the logbook, not a patch feed.
 *   - Hunk headers always carry explicit counts ("-3,2"), which every unified
 *     diff reader accepts.
 */

// Cap for the LCS table (cells). 4M cells of Uint32 is ~16 MB - fine for a
// short-lived process, and far beyond any frontmatter/body edit we log.
const MAX_LCS_CELLS = 4000000;

/** Minimal-edit ops for the trimmed middle via a classic LCS length table. */
function lcsOps(a, b) {
  const n = a.length;
  const m = b.length;
  const W = m + 1;
  const dp = new Uint32Array((n + 1) * W);
  for (let i = 1; i <= n; i++) {
    const ai = a[i - 1];
    for (let j = 1; j <= m; j++) {
      dp[i * W + j] = ai === b[j - 1]
        ? dp[(i - 1) * W + (j - 1)] + 1
        : Math.max(dp[(i - 1) * W + j], dp[i * W + (j - 1)]);
    }
  }
  // Ops are built back-to-front and reversed at the end. Inside a change run
  // we prefer pushing '+' here (which lands AFTER the '-' lines once
  // reversed), so every run reads deletions-then-additions, the way every
  // unified diff reader expects.
  const ops = [];
  let i = n;
  let j = m;
  while (i > 0 && j > 0) {
    if (a[i - 1] === b[j - 1]) {
      ops.push({ t: ' ', line: a[i - 1] });
      i--; j--;
    } else if (dp[i * W + (j - 1)] >= dp[(i - 1) * W + j]) {
      ops.push({ t: '+', line: b[j - 1] });
      j--;
    } else {
      ops.push({ t: '-', line: a[i - 1] });
      i--;
    }
  }
  while (i > 0) { ops.push({ t: '-', line: a[i - 1] }); i--; }
  while (j > 0) { ops.push({ t: '+', line: b[j - 1] }); j--; }
  return ops.reverse();
}

/** Group ops into unified hunks with `context` lines around each change run. */
function buildHunks(all, context) {
  let aPos = 0;
  let bPos = 0;
  for (const op of all) {
    op.aBefore = aPos;
    op.bBefore = bPos;
    if (op.t !== '+') aPos++;
    if (op.t !== '-') bPos++;
  }

  const changeIdx = [];
  for (let i = 0; i < all.length; i++) if (all[i].t !== ' ') changeIdx.push(i);
  if (changeIdx.length === 0) return [];

  // Merge change runs whose gap of unchanged lines is <= 2*context.
  const groups = [];
  let start = changeIdx[0];
  let last = changeIdx[0];
  for (let k = 1; k < changeIdx.length; k++) {
    if (changeIdx[k] - last - 1 > context * 2) {
      groups.push([start, last]);
      start = changeIdx[k];
    }
    last = changeIdx[k];
  }
  groups.push([start, last]);

  const hunks = [];
  for (const [s, e] of groups) {
    const lo = Math.max(0, s - context);
    const hi = Math.min(all.length - 1, e + context);
    const ops = all.slice(lo, hi + 1);
    const aCount = ops.filter((o) => o.t !== '+').length;
    const bCount = ops.filter((o) => o.t !== '-').length;
    // Unified convention: 1-based start; a zero-count side points at the line
    // BEFORE the change (its 0-based "lines consumed so far" value).
    const aStart = aCount > 0 ? ops.find((o) => o.t !== '+').aBefore + 1 : all[lo].aBefore;
    const bStart = bCount > 0 ? ops.find((o) => o.t !== '-').bBefore + 1 : all[lo].bBefore;
    const lines = ['@@ -' + aStart + ',' + aCount + ' +' + bStart + ',' + bCount + ' @@'];
    for (const o of ops) lines.push(o.t === ' ' ? ' ' + o.line : o.t + o.line);
    hunks.push(lines.join('\n'));
  }
  return hunks;
}

/** Cut text to maxBytes of UTF-8, preferably at a line break, never mid-char. */
function truncateBytes(text, maxBytes) {
  if (Buffer.byteLength(text, 'utf8') <= maxBytes) return { text, truncated: false };
  let cut = text;
  while (cut !== '' && Buffer.byteLength(cut, 'utf8') > maxBytes) {
    const nl = cut.lastIndexOf('\n');
    if (nl === -1) break;
    cut = cut.slice(0, nl);
  }
  if (Buffer.byteLength(cut, 'utf8') > maxBytes) {
    // One huge line: binary-search the largest character prefix that fits.
    let lo = 0;
    let hi = cut.length;
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1;
      if (Buffer.byteLength(cut.slice(0, mid), 'utf8') <= maxBytes) lo = mid;
      else hi = mid - 1;
    }
    cut = cut.slice(0, lo);
  }
  return { text: cut, truncated: true };
}

/**
 * unifiedDiff(aText, bText, {context = 2, maxBytes = 8192}) ->
 *   { diff, truncated }
 * diff is '' when the texts are byte-identical. When the rendered diff would
 * exceed maxBytes of UTF-8, it is cut (at a line boundary when possible) and
 * truncated is true.
 */
function unifiedDiff(aText, bText, opts) {
  const o = opts || {};
  const context = o.context === undefined ? 2 : o.context;
  const maxBytes = o.maxBytes === undefined ? 8192 : o.maxBytes;

  const aStr = String(aText);
  const bStr = String(bText);
  if (aStr === bStr) return { diff: '', truncated: false };

  const a = aStr.split('\n');
  const b = bStr.split('\n');

  // Trim the common prefix and suffix - the cheap 99% of most edits.
  let pre = 0;
  while (pre < a.length && pre < b.length && a[pre] === b[pre]) pre++;
  let suf = 0;
  while (suf < a.length - pre && suf < b.length - pre && a[a.length - 1 - suf] === b[b.length - 1 - suf]) suf++;

  const aMid = a.slice(pre, a.length - suf);
  const bMid = b.slice(pre, b.length - suf);

  let midOps;
  if (aMid.length === 0) {
    midOps = bMid.map((line) => ({ t: '+', line }));
  } else if (bMid.length === 0) {
    midOps = aMid.map((line) => ({ t: '-', line }));
  } else if (aMid.length * bMid.length <= MAX_LCS_CELLS) {
    midOps = lcsOps(aMid, bMid);
  } else {
    midOps = aMid.map((line) => ({ t: '-', line })).concat(bMid.map((line) => ({ t: '+', line })));
  }

  const all = a.slice(0, pre).map((line) => ({ t: ' ', line }))
    .concat(midOps, a.slice(a.length - suf).map((line) => ({ t: ' ', line })));

  const hunks = buildHunks(all, context);
  const rendered = hunks.join('\n');
  const cut = truncateBytes(rendered, maxBytes);
  return { diff: cut.text, truncated: cut.truncated };
}

module.exports = { unifiedDiff };
