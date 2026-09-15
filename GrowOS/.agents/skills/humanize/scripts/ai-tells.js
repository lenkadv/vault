#!/usr/bin/env node
'use strict';

/**
 * ai-tells.js - the deterministic AI-tell scorer for the humanize pass and the
 * Reviewer agent. Zero npm dependencies, Node >= 18, read-only (it never
 * writes a file).
 *
 * What it measures, and what it does not:
 *   - It scores 0-100 (0 = clean) from MECHANICALLY DETECTABLE tells only:
 *     patterns a regex or a word count can decide. Sixteen weighted detectors
 *     plus one zero-tolerance artifact check.
 *   - Readability is a SEPARATE axis: a computed Flesch-Kincaid grade from
 *     real word/sentence/syllable math. It is never folded into the 0-100
 *     tell score, and it is never estimated by a model.
 *   - It does NOT judge fabrication, meaning drift, voice fit, or stance.
 *     Those calls belong to the Reviewer agent and the humanize pass, which
 *     treat this script's numbers as ground truth for the mechanical part.
 *
 * Usage:
 *   node ai-tells.js <file> [--json] [--channel sales|landing|article]
 *                    [--voice-config <json-or-path>]
 *   cat draft.md | node ai-tells.js [--json]
 *   node ai-tells.js --self-test
 *
 * Voice overrides (--voice-config): a small JSON object derived from the
 * business's brain/voice.md, so the owner's voice can beat a generic rule:
 *   {
 *     "emDash": "rate" | "zero",   // "zero" = the voice bans em dashes, any
 *                                  //  hit flags (default "rate": only density)
 *     "sanctioned": ["here's the thing"],
 *                                  // signature phrases the voice file blesses;
 *                                  //  matching hits are dropped, never scored
 *     "allowWords": ["robust"],    // domain words removed from the vocab list
 *                                  //  (e.g. "landscape" for a gardener)
 *     "quotes": "straight" | "any" // "straight" = flag curly quotes (house
 *                                  //  style); default "any": never flagged
 *   }
 *
 * Calibration contract (release-blocking, from the editing research pack):
 * genuine human writing must score clean (< ~12) and deliberate slop must
 * score high (> ~45). Weights and thresholds below were tuned on the three
 * fixture businesses' real voice samples plus constructed slop. False
 * positives on real human voice outrank every other concern: every detector
 * carries an explicit false-positive guard, single word-list hits never flag,
 * and vocabulary is only ever a cluster signal.
 *
 * The word lists are data tables IN this file on purpose (no external config
 * in v1). The AI-vocab cluster list is dated 2026-07 and should be re-audited
 * about every 6 months: the words age out; the method does not.
 */

const fs = require('fs');
const path = require('path');

/* ------------------------------- data tables ------------------------------ */

// AI-vocab CLUSTER list, dated 2026-07. Single hits NEVER flag. Only a
// cluster of >= 3 distinct entries inside a ~400-word window scores, and at
// least 2 of them must be high/mid tier (a legacy-only cluster never flags).
const VOCAB_HIGH = [
  // high-signal 2026: verbs and -ing connectors
  'delve', 'delves', 'delved', 'delving',
  'showcase', 'showcases', 'showcased', 'showcasing',
  'underscore', 'underscores', 'underscored', 'underscoring',
  'emphasize', 'emphasizes', 'emphasized', 'emphasizing',
  'enhance', 'enhances', 'enhanced', 'enhancing',
  'elevate', 'elevates', 'elevated', 'elevating',
  'leverage', 'leverages', 'leveraged', 'leveraging',
  'foster', 'fosters', 'fostered', 'fostering',
  'garner', 'garners', 'garnered', 'garnering',
  'highlighting', // the bare verb "highlight" is too common in human text
  'meticulous', 'meticulously', 'intricate', 'pivotal',
];
const VOCAB_MID = [
  'tapestry', 'landscape', 'robust', 'vibrant', 'seamless', 'testament',
  'realm', 'beacon', 'myriad', 'plethora', 'comprehensive', 'multifaceted',
  'journey',
];
const VOCAB_LEGACY = [
  'additionally', 'boasts', 'bolstered', 'nestled',
];

// Unearned praise adjectives (E13). Cluster-only: a single earned adjective
// is human; two or more with nothing behind them is press-release voice.
const PRAISE_WORDS = [
  'seamless', 'robust', 'vibrant', 'transformative', 'game-changing',
  'game-changer', 'cutting-edge', 'revolutionary', 'unparalleled',
  'world-class', 'best-in-class', 'state-of-the-art', 'industry-leading',
  'ultimate', 'unforgettable',
];

// Hedges and throat-clearing (E09). One hedge is human; the stack scores.
const HEDGE_RES = [
  /\bit'?s (?:important|worth) (?:to note|noting)\b/i,
  /\bit is important to (?:note|consider|remember|understand)\b/i,
  /\bit should be noted\b/i,
  /\bneedless to say\b/i,
  /\baims to\b/i,
];
// These two only count sentence-initial (a mid-sentence "look" is a verb).
const HEDGE_OPENER_RE = /^(?:honestly|look|let'?s be honest)(?::|,)\s/i;

// Announced payoff + cliche openers (E15 / E33). The voice file may SANCTION
// one of these as a signature (e.g. "here's the thing") - see cfg.sanctioned.
const PAYOFF_RE = /\bhere(?:'?s| is) the (?:kicker|thing|catch)\b|\bthe best part\?|\bwhat nobody tells you\b/i;
const CLICHE_OPENER_RE = /^(?:whether you'?re|in today'?s|in a world|imagine a|picture this|are you ready to)\b/i;

// Wrap-up reflex (E11). Sentence-initial with a comma, per the false-positive
// guard ("Ultimately" as an ordinary adverb never flags).
const WRAPUP_RE = /^(?:in conclusion|in summary|overall|to sum up|ultimately),\s/i;

// Conjunctive openers (E10). Sentence-initial only.
const CONJUNCTIVE_RE = /^(?:additionally|furthermore|moreover|notably|in addition),\s/i;

// Negation pivots (E07). One free use per piece; extras score.
const NEGATION_RES = [
  /\bnot (?:just|only)\b[^.!?]{0,120}?\bbut\b/i,
  /\bisn'?t\b[^.!?]{0,120}?\bit'?s\b/i,
  /\bisn'?t just\b/i,
  /\bit'?s not (?:just|only|about)\b[^.!?]{0,120}?\b(?:but|it'?s)\b/i,
  /\bis not (?:just|only|merely|about)\b[^.!?]{0,120}?\bbut\b/i,
  /\bno \w+(?:,| —| -)? just \w+/i,
  /\bnot [^.!?]{0,60}?[—–-]\s?it'?s\b/i,
];

// Vague attribution (E14). Skipped when a named source sits in the same
// sentence (a year like 2024, or "<Proper Noun> University/Institute/...").
const ATTRIBUTION_RE = /\b(?:experts?|studies|research|observers?|analysts?|industry reports?|reports)\s+(?:say|says|argue|argues|show|shows|suggest|suggests|note|notes|found|find|finds|agree|agrees|indicate|indicates)\b|\bit'?s widely (?:regarded|believed|known)\b/i;
const NAMED_SOURCE_RE = /\b(?:19|20)\d{2}\b|\b[A-Z][a-z]+ (?:University|Institute|Journal|Report|Study|Survey)\b/;

// Copula avoidance (E23): fancy stand-ins for a plain "is".
const COPULA_RE = /\b(?:serves? as|stands as|functions as|represents)\b/i;

// Superficial "-ing" tails (E17): a trailing participle that restates.
const ING_TAIL_RE = /,\s+(?:highlighting|underscoring|ensuring|reflecting|showcasing|demonstrating|signaling|signalling|emphasizing|cementing|solidifying|reinforcing|marking|transforming|elevating)\b[^.!?]{0,90}$/i;

// "Quiet/quietly" as fake gravitas (E22). Literal quiet (a quiet room, went
// quiet) never flags - only the weight-adder patterns below.
const QUIET_RE = /\bquiet (?:confidence|power|strength|luxury|authority|ambition|force|revolution|dominance|excellence|brilliance)\b|\bquietly (?:becoming|building|growing|winning|dominating|reshaping|transforming|redefining|revolutionizing|leading|powering)\b/i;

// Chat-artifact zero-tolerance list (E04 gate). Deliberately tiny and
// unambiguous - this is the "banned list", NOT the vocab cluster list.
// Any hit = hard fail, separate from the 0-100 score.
const ARTIFACT_RES = [
  /as an ai language model/i,
  /as a large language model/i,
  /i'?m sorry,? but i (?:can'?t|cannot)/i,
  /as of my last (?:training|knowledge) update/i,
  /\[INSERT[^\]]*\]/,
];

// Emoji-as-bullet detection (E24) and arrow connectors (E25).
const EMOJI_BULLET_RE = /^\s*(?:[-*+]\s*)?[☀-➿⬀-⯿\u{1F000}-\u{1FAFF}]/u;
const ARROW_RE = /→|⇒|=>/;

// Readability channel ceilings (E26): computed grade must sit at or under
// the ceiling for the channel. Grade is a ceiling; voice is a floor.
const CHANNEL_CEILINGS = { sales: 6, landing: 6, article: 8 };

/* ------------------------------ text plumbing ----------------------------- */

/** Strip a UTF-8 BOM and normalize CRLF; parsers must accept both (SPEC). */
function normalize(raw) {
  let t = String(raw);
  if (t.charCodeAt(0) === 0xfeff) t = t.slice(1);
  return t.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
}

/**
 * prepare(text) -> the analysis context.
 * Splits the input into classified lines (1-based numbers preserved for hit
 * reporting), builds prose paragraphs and sentences, and separates the
 * surfaces the detectors read:
 *   - prose lines + list lines  -> phrase detectors (copy is copy)
 *   - prose sentences only      -> rhythm + readability (lists and headings
 *                                  would inflate "sentence length")
 *   - blockquote lines          -> excluded (quoted material, often proof,
 *                                  is not the draft's own prose)
 *   - YAML frontmatter + fenced code -> excluded entirely
 *   - [PLACEHOLDER ...] markers -> replaced by one neutral token so a legal
 *                                  placeholder never skews the stats
 */
function prepare(text) {
  const rawLines = normalize(text).split('\n');
  const lines = []; // { n, text, kind }
  let fmStripped = false;
  let inFence = false;
  let i = 0;

  // YAML frontmatter block at the very top (work items carry one).
  if (rawLines[0] !== undefined && /^---\s*$/.test(rawLines[0])) {
    let close = -1;
    for (let j = 1; j < rawLines.length; j++) {
      if (/^---\s*$/.test(rawLines[j])) { close = j; break; }
    }
    if (close !== -1) { i = close + 1; fmStripped = true; }
  }

  for (; i < rawLines.length; i++) {
    const n = i + 1;
    let t = rawLines[i];
    if (/^\s*```/.test(t)) { inFence = !inFence; continue; }
    if (inFence) continue;
    // A legal placeholder is one opaque token, never scored as prose.
    t = t.replace(/\[(?:PLACEHOLDER|FILL IN)[^\]]*\]/gi, 'placeholder');
    let kind;
    if (t.trim() === '') kind = 'blank';
    else if (/^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/.test(t)) kind = 'rule';
    else if (/^#{1,6}\s/.test(t)) kind = 'heading';
    else if (/^\s*>/.test(t)) kind = 'quote';
    else if (/^\s*(?:[-*+]|\d+[.)])\s/.test(t)) kind = 'list';
    else kind = 'prose';
    lines.push({ n, text: t, kind });
  }

  // Paragraphs: consecutive prose lines joined with a space, offsets mapped
  // back to source lines so sentence hits report a real line number.
  const paragraphs = [];
  let cur = null;
  for (const ln of lines) {
    if (ln.kind === 'prose') {
      if (!cur) cur = { startLine: ln.n, parts: [] };
      cur.parts.push(ln);
    } else if (ln.kind !== 'blank' || !cur) {
      if (cur) { paragraphs.push(cur); cur = null; }
    } else {
      paragraphs.push(cur); cur = null;
    }
  }
  if (cur) paragraphs.push(cur);
  for (const p of paragraphs) {
    let text = '';
    const map = []; // { start, line }
    for (const part of p.parts) {
      if (text !== '') text += ' ';
      map.push({ start: text.length, line: part.n });
      text += part.text.trim();
    }
    p.text = text;
    p.lineAt = (offset) => {
      let line = p.startLine;
      for (const m of map) { if (offset >= m.start) line = m.line; else break; }
      return line;
    };
    p.words = countWords(text);
  }

  // Sentences (prose only), with an abbreviation/decimal guard.
  const sentences = [];
  for (const p of paragraphs) {
    for (const s of splitSentences(p.text)) {
      sentences.push({
        text: s.text,
        wordCount: countWords(s.text),
        line: p.lineAt(s.start),
        paragraph: p,
      });
    }
  }

  const proseAndList = lines.filter((l) => l.kind === 'prose' || l.kind === 'list');
  const headings = lines.filter((l) => l.kind === 'heading');
  const listItems = lines.filter((l) => l.kind === 'list');
  const words = [];
  for (const l of proseAndList) {
    for (const w of l.text.split(/\s+/)) {
      const clean = w.replace(/^[^A-Za-z0-9'-]+|[^A-Za-z0-9'-]+$/g, '');
      if (clean) words.push({ word: clean.toLowerCase(), line: l.n });
    }
  }

  return { lines, paragraphs, sentences, proseAndList, headings, listItems, words, fmStripped };
}

const ABBREV_RE = /\b(?:e\.g|i\.e|vs|etc|mr|mrs|ms|dr|st|no|inc|ltd|co|jr|sr|approx|dept|est|fig|min|max|cf|al|p|pp)\.$/i;

/** Split one paragraph into sentences; returns [{ text, start }]. */
function splitSentences(text) {
  const out = [];
  let start = 0;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch !== '.' && ch !== '!' && ch !== '?') continue;
    // decimals: 3.5
    if (ch === '.' && /\d/.test(text[i - 1] || '') && /\d/.test(text[i + 1] || '')) continue;
    // abbreviations: e.g., Dr., etc.
    if (ch === '.' && ABBREV_RE.test(text.slice(Math.max(0, i - 8), i + 1))) continue;
    // run of terminators (?! ... ) collapses to one boundary
    let j = i;
    while (j + 1 < text.length && /[.!?"')”’]/.test(text[j + 1])) j++;
    const next = text[j + 1];
    if (next !== undefined && next !== ' ') { i = j; continue; }
    const piece = text.slice(start, j + 1).trim();
    if (piece) out.push({ text: piece, start });
    start = j + 2;
    i = j + 1;
  }
  const tail = text.slice(start).trim();
  if (tail) out.push({ text: tail, start });
  return out;
}

function countWords(text) {
  const m = String(text).split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w));
  return m.length;
}

/** Syllable heuristic: vowel groups, silent e, floor of 1. Real math (E26). */
function countSyllables(word) {
  const w = String(word).toLowerCase().replace(/[^a-z]/g, '');
  if (w.length === 0) return 0;
  if (w.length <= 3) return 1;
  let s = w.replace(/e$/, '');
  if (/le$/.test(w) && !/[aeiouy]le$/.test(w)) s = w; // table, little keep the -le beat
  const groups = s.match(/[aeiouy]+/g);
  return Math.max(1, groups ? groups.length : 1);
}

function mean(arr) { return arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0; }
function stdev(arr) {
  if (arr.length < 2) return 0;
  const m = mean(arr);
  return Math.sqrt(mean(arr.map((x) => (x - m) * (x - m))));
}

/** Normalize apostrophes/case for sanctioned-phrase comparison. */
function normPhrase(s) {
  return String(s).toLowerCase().replace(/[‘’]/g, "'").replace(/\s+/g, ' ').trim();
}

/** True when the owner's voice file sanctions this matched text. */
function isSanctioned(matched, cfg) {
  if (!cfg.sanctioned || cfg.sanctioned.length === 0) return false;
  const m = normPhrase(matched);
  return cfg.sanctioned.some((p) => {
    const q = normPhrase(p);
    return q !== '' && (m.indexOf(q) !== -1 || q.indexOf(m) !== -1);
  });
}

/* -------------------------------- detectors ------------------------------- */
/* Each detector returns { hits: [{ line, text }], score } with score already */
/* capped at the detector's weight. Weights come from the research pack and   */
/* were then calibrated on the fixture voices (human < 12, slop > 45).        */

const DETECTORS = [
  {
    id: 'burstiness', rule: 'E06', weight: 20,
    name: 'Sentence rhythm is machine-even',
    detect(ctx) {
      const hits = [];
      let score = 0;
      const lens = ctx.sentences.map((s) => s.wordCount);
      if (lens.length < 5) return { hits, score }; // too short to judge rhythm
      // (a) a run of 3+ consecutive sentences within +/-2 words of each other.
      // Guard: only medium-or-longer sentences count (three staccato "Fixable.
      // Really. Promise." fragments are a human move, not a metronome).
      for (let i = 0; i + 2 < lens.length; i++) {
        const win = lens.slice(i, i + 3);
        if (Math.min(...win) >= 12 && Math.max(...win) - Math.min(...win) <= 2) {
          hits.push({ line: ctx.sentences[i].line, text: 'three sentences in a row of ' + win.join(', ') + ' words' });
          score += 8;
          break; // one run is enough evidence for the sub-flag
        }
      }
      // (b) >= 85% of sentences inside the 15-28 word band (the GPT cluster).
      const inBand = lens.filter((l) => l >= 15 && l <= 28).length;
      if (inBand / lens.length >= 0.85) {
        hits.push({ line: ctx.sentences[0].line, text: Math.round((inBand / lens.length) * 100) + '% of sentences sit in the 15-28 word band' });
        score += 8;
      }
      // (c) stdev < 6. Guard: only when the mean is medium-length - uniformly
      // SHORT sentences are punchy human style, not the metronome tell.
      const sd = stdev(lens);
      if (sd < 6 && mean(lens) >= 15) {
        hits.push({ line: ctx.sentences[0].line, text: 'sentence lengths barely vary (spread ' + sd.toFixed(1) + ')' });
        score += 8;
      }
      // (d) uniform paragraph lengths (secondary tell).
      const plens = ctx.paragraphs.map((p) => p.words).filter((w) => w > 0);
      if (plens.length >= 4) {
        const cv = mean(plens) > 0 ? stdev(plens) / mean(plens) : 1;
        if (cv < 0.2) {
          hits.push({ line: ctx.paragraphs[0].startLine, text: 'every paragraph is nearly the same length' });
          score += 4;
        }
      }
      return { hits, score: Math.min(score, this.weight) };
    },
  },
  {
    id: 'vocab-cluster', rule: 'E05', weight: 15,
    name: 'AI-vocabulary cluster (dated list, 2026-07)',
    detect(ctx, cfg) {
      const allow = new Set((cfg.allowWords || []).map((w) => String(w).toLowerCase()));
      const tier = new Map();
      for (const w of VOCAB_HIGH) tier.set(w, 'high');
      for (const w of VOCAB_MID) tier.set(w, 'mid');
      for (const w of VOCAB_LEGACY) tier.set(w, 'legacy');
      const found = []; // { idx, word, line, tier }
      ctx.words.forEach((w, idx) => {
        if (tier.has(w.word) && !allow.has(w.word)) {
          found.push({ idx, word: w.word, line: w.line, tier: tier.get(w.word) });
        }
      });
      // Also catch the legacy stock phrase as one "word".
      ctx.proseAndList.forEach((l) => {
        if (/in today'?s fast-paced world/i.test(l.text)) {
          found.push({ idx: 0, word: "in today's fast-paced world", line: l.n, tier: 'legacy' });
        }
      });
      // Best 400-word window: count DISTINCT entries; >= 3 distinct AND >= 2
      // of them non-legacy. A single hit NEVER flags; that is how you
      // false-positive on real human writing.
      let best = null;
      for (let a = 0; a < found.length; a++) {
        const windowEnd = found[a].idx + 400;
        const distinct = new Map();
        for (let b = a; b < found.length; b++) {
          if (found[b].idx > windowEnd) break;
          if (!distinct.has(found[b].word)) distinct.set(found[b].word, found[b]);
        }
        const entries = [...distinct.values()];
        const nonLegacy = entries.filter((e) => e.tier !== 'legacy').length;
        if (entries.length >= 3 && nonLegacy >= 2) {
          if (!best || entries.length > best.length) best = entries;
        }
      }
      if (!best) return { hits: [], score: 0 };
      const hits = best.map((e) => ({ line: e.line, text: e.word }));
      const score = Math.min(this.weight, Math.round(8 + 2.5 * (best.length - 3)));
      return { hits, score };
    },
  },
  {
    id: 'formatting', rule: 'E24', weight: 8,
    name: 'Formatting overuse (bold, Title Case, emoji bullets)',
    detect(ctx) {
      const hits = [];
      let score = 0;
      const totalWords = ctx.words.length;
      // Bold density: > 1 bolded span per ~80 words (and at least 2 spans).
      let boldCount = 0;
      let firstBoldLine = 0;
      let wholeSentenceBold = 0;
      for (const l of ctx.proseAndList) {
        const spans = l.text.match(/\*\*[^*]+\*\*/g) || [];
        if (spans.length && !firstBoldLine) firstBoldLine = l.n;
        boldCount += spans.length;
        for (const s of spans) {
          if (countWords(s.replace(/\*\*/g, '')) >= 8) {
            wholeSentenceBold++;
            hits.push({ line: l.n, text: 'a whole sentence in bold' });
          }
        }
      }
      if (boldCount >= 2 && totalWords > 0 && boldCount > totalWords / 80) {
        hits.push({ line: firstBoldLine, text: boldCount + ' bolded phrases in ' + totalWords + ' words' });
        score += 3;
      }
      const boldListLabels = ctx.listItems.filter((l) => /^\s*(?:[-*+]\s*)?\*\*[^*]+\*\*/.test(l.text));
      if (boldListLabels.length >= 3 && score === 0) {
        hits.push({ line: boldListLabels[0].n, text: boldListLabels.length + ' list items begin with bold labels' });
        score += 3;
      }
      score += Math.min(4, wholeSentenceBold * 2);
      // Title-Case Headings (sentence case is the house rule).
      for (const h of ctx.headings) {
        const text = h.text.replace(/^#{1,6}\s+/, '');
        const wordsIn = text.split(/\s+/).filter((w) => /^[A-Za-z]/.test(w));
        const minor = new Set(['a', 'an', 'the', 'of', 'to', 'in', 'on', 'for', 'and', 'or', 'with', 'at', 'by', 'is', 'your', 'our']);
        const significant = wordsIn.filter((w) => !minor.has(w.toLowerCase()));
        const capped = significant.filter((w) => /^[A-Z]/.test(w));
        if (significant.length >= 3 && capped.length / significant.length >= 0.75) {
          hits.push({ line: h.n, text: text.slice(0, 60) });
          score += 2;
        }
      }
      // Emoji used as bullets / line markers.
      for (const l of ctx.lines) {
        if ((l.kind === 'list' || l.kind === 'prose') && EMOJI_BULLET_RE.test(l.text)) {
          hits.push({ line: l.n, text: l.text.trim().slice(0, 40) });
          score += 2;
        }
      }
      return { hits, score: Math.min(score, this.weight) };
    },
  },
  {
    id: 'negation-pivot', rule: 'E07', weight: 8,
    name: 'Negation pivot ("not X, it\'s Y")',
    detect(ctx) {
      const hits = [];
      for (const s of ctx.sentences) {
        for (const re of NEGATION_RES) {
          const m = re.exec(s.text);
          if (m) { hits.push({ line: s.line, text: m[0].slice(0, 80) }); break; }
        }
      }
      // One contrast per piece is a legitimate human move; extras score.
      const score = Math.min(this.weight, Math.max(0, hits.length - 1) * 4);
      return { hits, score };
    },
  },
  {
    id: 'vague-attribution', rule: 'E14', weight: 6,
    name: 'Vague attribution ("experts say", "studies show")',
    detect(ctx) {
      const hits = [];
      for (const s of ctx.sentences.concat(listAsSentences(ctx))) {
        const m = ATTRIBUTION_RE.exec(s.text);
        if (!m) continue;
        if (NAMED_SOURCE_RE.test(s.text)) continue; // a real, named source nearby
        hits.push({ line: s.line, text: m[0] });
      }
      return { hits, score: Math.min(this.weight, hits.length * 3) };
    },
  },
  {
    id: 'hedge-stack', rule: 'E09', weight: 6,
    name: 'Hedges and throat-clearing',
    detect(ctx) {
      const hits = [];
      for (const s of ctx.sentences.concat(listAsSentences(ctx))) {
        for (const re of HEDGE_RES) {
          const m = re.exec(s.text);
          if (m) { hits.push({ line: s.line, text: m[0] }); break; }
        }
        const o = HEDGE_OPENER_RE.exec(s.text);
        if (o) hits.push({ line: s.line, text: o[0].trim() });
      }
      // One deliberate hedge is human. Score the stack (2+).
      const score = hits.length >= 2 ? Math.min(this.weight, (hits.length - 1) * 3) : 0;
      return { hits, score };
    },
  },
  {
    id: 'praise-adjectives', rule: 'E13', weight: 6,
    name: 'Unearned praise adjectives',
    detect(ctx) {
      const hits = [];
      const re = new RegExp('\\b(?:' + PRAISE_WORDS.join('|') + ')\\b', 'gi');
      for (const l of ctx.proseAndList) {
        let m;
        re.lastIndex = 0;
        while ((m = re.exec(l.text))) hits.push({ line: l.n, text: m[0] });
      }
      // A single earned adjective never flags; the cluster does.
      const score = hits.length >= 2 ? Math.min(this.weight, hits.length * 2) : 0;
      return { hits, score };
    },
  },
  {
    id: 'em-dash-rate', rule: 'E12', weight: 6,
    name: 'Em-dash rate (or any hit when the voice bans them)',
    detect(ctx, cfg) {
      const hits = [];
      let score = 0;
      const counts = [];
      for (const p of ctx.paragraphs) {
        const m = p.text.match(/—|\s--\s/g) || [];
        counts.push(m.length);
        if (cfg.emDash === 'zero') {
          if (m.length > 0) {
            hits.push({ line: p.startLine, text: m.length + ' em dash(es) - the voice file bans them' });
            score += m.length * 3;
          }
        } else if (m.length >= 3) {
          // Rate, not presence: the mark is not the tell; the density is.
          hits.push({ line: p.startLine, text: m.length + ' em dashes in one paragraph' });
          score += 3;
        }
      }
      if (cfg.emDash !== 'zero') {
        const total = counts.reduce((a, b) => a + b, 0);
        if (counts.length > 0 && total >= 3 && total / counts.length > 1) {
          hits.push({ line: ctx.paragraphs[0] ? ctx.paragraphs[0].startLine : 1, text: total + ' em dashes across ' + counts.length + ' paragraph(s)' });
          score += 3;
        }
      }
      return { hits, score: Math.min(score, this.weight) };
    },
  },
  {
    id: 'conjunctive-openers', rule: 'E10', weight: 5,
    name: 'Empty transition openers (Additionally, Furthermore, ...)',
    detect(ctx) {
      const hits = [];
      for (const s of ctx.sentences.concat(listAsSentences(ctx))) {
        const m = CONJUNCTIVE_RE.exec(s.text);
        if (m) hits.push({ line: s.line, text: m[0].trim() });
      }
      const score = hits.length === 0 ? 0 : Math.min(this.weight, 3 + (hits.length - 1) * 2);
      return { hits, score };
    },
  },
  {
    id: 'wrap-up', rule: 'E11', weight: 5,
    name: 'Wrap-up reflex (In conclusion, In summary, ...)',
    detect(ctx) {
      const hits = [];
      let score = 0;
      const n = ctx.sentences.length;
      ctx.sentences.forEach((s, i) => {
        const m = WRAPUP_RE.exec(s.text);
        if (!m) return;
        const late = n > 0 && i >= Math.floor(n * 0.8);
        hits.push({ line: s.line, text: m[0].trim() + (late ? ' (closing the piece)' : '') });
        score += late ? 5 : 3;
      });
      return { hits, score: Math.min(score, this.weight) };
    },
  },
  {
    id: 'announced-payoff', rule: 'E15/E33', weight: 5,
    name: 'Announced payoffs and cliche openers',
    detect(ctx, cfg) {
      const hits = [];
      let score = 0;
      const openingSentences = ctx.paragraphs.slice(0, 3)
        .map((p) => ctx.sentences.find((s) => s.paragraph === p))
        .filter(Boolean);
      for (const first of openingSentences) {
        const m = CLICHE_OPENER_RE.exec(first.text);
        if (m && !isSanctioned(m[0], cfg)) {
          hits.push({ line: first.line, text: m[0] + '... (stock opener)' });
          score += 3;
        }
      }
      for (const s of ctx.sentences.concat(listAsSentences(ctx))) {
        const m = PAYOFF_RE.exec(s.text);
        if (m && !isSanctioned(m[0], cfg)) {
          hits.push({ line: s.line, text: m[0] });
          score += 2;
        }
      }
      return { hits, score: Math.min(score, this.weight) };
    },
  },
  {
    id: 'punctuation-tics', rule: 'E25', weight: 4,
    name: 'Punctuation and unicode tics',
    detect(ctx, cfg) {
      const hits = [];
      let score = 0;
      for (const l of ctx.proseAndList) {
        const arrow = ARROW_RE.exec(l.text);
        if (arrow) { hits.push({ line: l.n, text: 'arrow used as a connector (' + arrow[0] + ')' }); score += 2; }
        // Quotes around a single ordinary word for "emphasis".
        const emph = /(^|\s)["“]([A-Za-z-]+)["”](?=[\s.,;:!?]|$)/.exec(l.text);
        if (emph) { hits.push({ line: l.n, text: 'scare quotes around "' + emph[2] + '"' }); score += 1; }
        if (cfg.quotes === 'straight' && /[“”‘’]/.test(l.text)) {
          hits.push({ line: l.n, text: 'curly quotes (house style is straight)' });
          score += 1;
        }
      }
      for (const p of ctx.paragraphs) {
        const bangs = (p.text.match(/!/g) || []).length;
        if (bangs >= 2) { hits.push({ line: p.startLine, text: bangs + ' exclamation marks in one paragraph' }); score += 2; }
      }
      return { hits, score: Math.min(score, this.weight) };
    },
  },
  {
    id: 'ing-tail', rule: 'E17', weight: 4,
    name: 'Superficial "-ing" tails (…, highlighting its importance)',
    detect(ctx) {
      const hits = [];
      for (const s of ctx.sentences.concat(listAsSentences(ctx))) {
        const body = s.text.replace(/[.!?]+$/, '');
        const m = ING_TAIL_RE.exec(body);
        if (m) hits.push({ line: s.line, text: m[0].slice(0, 70) });
      }
      return { hits, score: Math.min(this.weight, hits.length * 2) };
    },
  },
  {
    id: 'copula-avoidance', rule: 'E23', weight: 3,
    name: 'Copula avoidance (serves as, stands as, represents)',
    detect(ctx) {
      const hits = [];
      for (const l of ctx.proseAndList) {
        let m;
        const re = new RegExp(COPULA_RE.source, 'gi');
        while ((m = re.exec(l.text))) hits.push({ line: l.n, text: m[0] });
      }
      const score = hits.length === 0 ? 0 : hits.length === 1 ? 2 : 3;
      return { hits, score };
    },
  },
  {
    id: 'quiet-gravitas', rule: 'E22', weight: 3,
    name: '"Quiet/quietly" as fake gravitas',
    detect(ctx) {
      const hits = [];
      for (const l of ctx.proseAndList) {
        let m;
        const re = new RegExp(QUIET_RE.source, 'gi');
        while ((m = re.exec(l.text))) hits.push({ line: l.n, text: m[0] });
      }
      const total = ctx.words.length;
      const flag = hits.length >= 2 || (hits.length === 1 && total < 150);
      return { hits, score: flag ? this.weight : 0 };
    },
  },
  {
    id: 'rule-of-three', rule: 'E08', weight: 5,
    name: 'Rule-of-three stacks and anaphora',
    detect(ctx) {
      const hits = [];
      let score = 0;
      // Triple comma-lists of short items; the FIRST TWO per piece are free
      // (a natural 3-item list is human), repeats beyond that score.
      const triples = [];
      const re = /\b(\w+(?:\s\w+)?), (\w+(?:\s\w+)?),? and (\w+(?:\s\w+)?)\b/g;
      for (const l of ctx.proseAndList) {
        let m;
        re.lastIndex = 0;
        while ((m = re.exec(l.text))) triples.push({ line: l.n, text: m[0] });
      }
      if (triples.length > 2) {
        for (const t of triples.slice(2)) hits.push(t);
        score += (triples.length - 2) * 2;
      }
      // Anaphora: 3+ consecutive sentences opening with the same word. A short
      // throat-clearing clause before a colon does not hide the real opening.
      const firsts = ctx.sentences.map((s) => {
        let opening = s.text;
        const colon = opening.indexOf(':');
        if (colon !== -1 && countWords(opening.slice(0, colon)) <= 4) opening = opening.slice(colon + 1).trim();
        return (opening.split(/\s+/)[0] || '').toLowerCase().replace(/[^a-z']/g, '');
      });
      for (let i = 0; i + 2 < firsts.length; i++) {
        if (firsts[i] && firsts[i] === firsts[i + 1] && firsts[i] === firsts[i + 2]) {
          hits.push({ line: ctx.sentences[i].line, text: 'three sentences in a row open with "' + firsts[i] + '"' });
          score += 3;
          break;
        }
      }
      // Three clipped one-to-three-word beats are the staccato version of the
      // same device ("Bold. Smoky. Unforgettable.").
      for (let i = 0; i + 2 < ctx.sentences.length; i++) {
        const trio = ctx.sentences.slice(i, i + 3);
        if (trio.every((s) => s.wordCount >= 1 && s.wordCount <= 3)) {
          hits.push({ line: trio[0].line, text: 'three clipped beats in a row' });
          score += 5;
          break;
        }
      }
      return { hits, score: Math.min(score, this.weight) };
    },
  },
];

/** List items rendered as pseudo-sentences for the phrase detectors. */
function listAsSentences(ctx) {
  return ctx.listItems.map((l) => ({
    text: l.text.replace(/^\s*(?:[-*+]|\d+[.)])\s*/, ''),
    line: l.n,
    wordCount: 0,
  }));
}

/** Detector #17: chat artifacts. Zero tolerance - any hit is a hard fail. */
function detectArtifacts(ctx) {
  const hits = [];
  for (const l of ctx.lines) {
    for (const re of ARTIFACT_RES) {
      const m = re.exec(l.text);
      if (m) hits.push({ line: l.n, text: m[0] });
    }
  }
  return hits;
}

/** Detector #18: computed readability - the separate axis (E26). */
function computeReadability(ctx, channel) {
  const sentences = ctx.sentences.filter((s) => s.wordCount > 0);
  let words = 0;
  let syllables = 0;
  for (const s of sentences) {
    for (const w of s.text.split(/\s+/)) {
      if (!/[A-Za-z]/.test(w)) continue;
      words++;
      syllables += countSyllables(w);
    }
  }
  const n = sentences.length;
  const grade = n > 0 && words > 0
    ? 0.39 * (words / n) + 11.8 * (syllables / words) - 15.59
    : 0;
  const ease = n > 0 && words > 0
    ? 206.835 - 1.015 * (words / n) - 84.6 * (syllables / words)
    : 0;
  const ceiling = CHANNEL_CEILINGS[channel] || CHANNEL_CEILINGS.article;
  return {
    grade: Math.round(grade * 10) / 10,
    ease: Math.round(ease * 10) / 10,
    words,
    sentences: n,
    syllables,
    // List items and headings are counted separately on purpose: folding
    // them into "sentences" is how fragments fake a low grade.
    listItems: ctx.listItems.length,
    headings: ctx.headings.length,
    channel: CHANNEL_CEILINGS[channel] ? channel : 'article',
    ceiling,
    withinBand: n === 0 ? true : grade <= ceiling + 0.5,
  };
}

/* --------------------------------- scoring -------------------------------- */

/**
 * score(text, options) -> the full report object.
 * options: { channel, voiceConfig } - voiceConfig per the header comment.
 */
function score(text, options) {
  const opts = options || {};
  const cfg = Object.assign({ emDash: 'rate', sanctioned: [], allowWords: [], quotes: 'any' }, opts.voiceConfig || {});
  const ctx = prepare(text);

  const detectors = [];
  let total = 0;
  for (const d of DETECTORS) {
    const r = d.detect(ctx, cfg);
    detectors.push({ id: d.id, rule: d.rule, name: d.name, weight: d.weight, score: r.score, hits: r.hits });
    total += r.score;
  }
  const artifacts = detectArtifacts(ctx);
  detectors.push({
    id: 'chat-artifacts', rule: 'E04', name: 'Chat artifacts (zero tolerance)',
    weight: 0, score: 0, hits: artifacts, hardFail: artifacts.length > 0,
  });

  const readability = computeReadability(ctx, opts.channel);

  return {
    score: Math.min(100, Math.round(total)),
    hardFail: artifacts.length > 0,
    detectors,
    readability,
    meta: {
      sentences: ctx.sentences.length,
      words: ctx.words.length,
      paragraphs: ctx.paragraphs.length,
      frontmatterStripped: ctx.fmStripped,
      voiceConfig: cfg,
      vocabListDate: '2026-07',
    },
  };
}

/* ------------------------------- self-test -------------------------------- */
/* Embedded fixtures, constructed fresh for this file (never copied from any  */
/* business). The clean sample is real-sounding owner writing and must score  */
/* under 12; the slop sample plants every tell and must score over 45 with a  */
/* hard fail. Every detector must fire at least once across the fixtures.     */

const FIXTURE_CLEAN = [
  'Last March our oven died on a Friday.',
  'Not a great day.',
  'We had sixty orders due and one very old backup plan: my mother\'s kitchen across town.',
  'So that is where the bread got baked, four loaves at a time, until two in the morning.',
  'I bring this up because three people asked me this week why we do not just open a second shop.',
  'Honest answer?',
  'We tried something close to it once, back in 2019, and it nearly sank us.',
  'The second shop looked busy and lost money for eleven straight months.',
  'What works for us is boring: one shop, a short menu, bread that sells out by noon.',
  'If you came by after lunch and left empty-handed, sorry about that.',
  'Come at nine.',
  'The sourdough is worth the alarm clock.',
].join('\n');

const FIXTURE_SLOP = [
  '# Unlock Your Business Potential With Our Comprehensive Platform',
  '',
  'Whether you\'re a small business owner or a seasoned marketing professional, our robust platform serves as a comprehensive solution for all your evolving needs. It\'s worth noting that our seamless onboarding experience represents a pivotal milestone in every customer journey today. Additionally, our vibrant community stands as a testament to the transformative power of these cutting-edge tools. Furthermore, experts say that businesses that leverage intelligent automation delve far deeper into meaningful growth. It\'s important to note that the platform showcases measurable outcomes, highlighting its importance for modern teams.',
  '',
  'Here\'s the kicker: this isn\'t just a tool — it\'s a movement — and honestly, a complete transformation! It\'s not just software but a true partner. The quiet confidence of our approach means we are quietly transforming an entire industry — for good! Our platform offers **streamlined workflows**, **enhanced productivity**, and **seamless integration**.',
  '',
  '- ✅ Faster onboarding → more revenue!',
  '- 🚀 Studies show that automation saves teams hours every week!',
  '',
  'We deliver innovation, inspiration, and insights. We provide speed, scale, and simplicity. We ensure growth, guidance, and grit. As an AI language model, I can confirm the results, ensuring success for your business. [INSERT customer testimonial]',
  '',
  'In conclusion, our meticulous approach underscores our commitment to unparalleled excellence, reflecting the values of a truly world-class team.',
].join('\n');

function selfTest() {
  const problems = [];
  const noteOk = (msg) => process.stdout.write('ok   ' + msg + '\n');
  const fail = (msg) => { problems.push(msg); process.stdout.write('FAIL ' + msg + '\n'); };

  const clean = score(FIXTURE_CLEAN);
  const slop = score(FIXTURE_SLOP);

  if (clean.score < 12) noteOk('clean human sample scores ' + clean.score + ' (< 12)');
  else fail('clean human sample scored ' + clean.score + ' (must be < 12): ' + summarizeHits(clean));
  if (!clean.hardFail) noteOk('clean sample has no hard-fail artifacts');
  else fail('clean sample hard-failed');

  if (slop.score > 45) noteOk('slop sample scores ' + slop.score + ' (> 45)');
  else fail('slop sample scored ' + slop.score + ' (must be > 45)');
  if (slop.hardFail) noteOk('slop sample hard-fails on chat artifacts');
  else fail('slop sample did not hard-fail');

  // Every detector fires at least once across the two fixtures.
  for (const d of DETECTORS.concat([{ id: 'chat-artifacts' }])) {
    const inClean = clean.detectors.find((x) => x.id === d.id);
    const inSlop = slop.detectors.find((x) => x.id === d.id);
    const fired = (inClean && inClean.hits.length > 0) || (inSlop && inSlop.hits.length > 0);
    if (fired) noteOk('detector fires somewhere: ' + d.id);
    else fail('detector never fired on any fixture: ' + d.id);
  }

  // Readability axis is computed, not guessed.
  if (clean.readability.grade > 0 && slop.readability.grade > clean.readability.grade) {
    noteOk('readability grades computed (clean ' + clean.readability.grade + ' < slop ' + slop.readability.grade + ')');
  } else {
    fail('readability math looks wrong (clean ' + clean.readability.grade + ', slop ' + slop.readability.grade + ')');
  }

  // Too short to judge rhythm: under 5 sentences, burstiness stays silent.
  const tiny = score('Short one. Another line here. Third.');
  const tinyBurst = tiny.detectors.find((d) => d.id === 'burstiness');
  if (tinyBurst.score === 0 && tinyBurst.hits.length === 0) noteOk('burstiness needs 5+ sentences before it scores');
  else fail('burstiness scored a 3-sentence text');

  // The voice-beats-rule mechanism: a sanctioned signature is never flagged.
  const signature = 'Here\'s the thing. Your prices are a number, and you are allowed to change the number whenever you decide it is time.';
  const plain = score(signature);
  const sanctioned = score(signature, { voiceConfig: { sanctioned: ["here's the thing"] } });
  const plainHit = plain.detectors.find((d) => d.id === 'announced-payoff').hits.length > 0;
  const sancHit = sanctioned.detectors.find((d) => d.id === 'announced-payoff').hits.length > 0;
  if (plainHit && !sancHit) noteOk('voice override: sanctioned "here\'s the thing" is not flagged');
  else fail('voice override failed (plain hit: ' + plainHit + ', sanctioned hit: ' + sancHit + ')');

  // The voice-escalation mechanism: an em-dash house ban flags a single dash.
  const oneDash = 'The launch went fine — better than fine, honestly, and the team slept well that night.';
  const rateMode = score(oneDash);
  const zeroMode = score(oneDash, { voiceConfig: { emDash: 'zero' } });
  const rateHit = rateMode.detectors.find((d) => d.id === 'em-dash-rate').score > 0;
  const zeroHit = zeroMode.detectors.find((d) => d.id === 'em-dash-rate').score > 0;
  if (!rateHit && zeroHit) noteOk('voice override: em-dash ban escalates rate to any-hit');
  else fail('em-dash escalation failed (rate scored: ' + rateHit + ', zero scored: ' + zeroHit + ')');

  process.stdout.write('\n# self-test: ' + (problems.length === 0 ? 'PASS' : problems.length + ' failure(s)') + '\n');
  return problems.length === 0 ? 0 : 1;
}

function summarizeHits(report) {
  return report.detectors
    .filter((d) => d.hits.length > 0)
    .map((d) => d.id + '(' + d.score + ': ' + d.hits.map((h) => h.text).join('; ').slice(0, 120) + ')')
    .join(' | ');
}

/* ----------------------------------- CLI ---------------------------------- */

function parseArgs(argv) {
  const args = { json: false, selfTest: false, file: null, channel: 'article', voiceConfig: null };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--json') args.json = true;
    else if (a === '--self-test') args.selfTest = true;
    else if (a === '--channel') args.channel = argv[++i] || 'article';
    else if (a === '--voice-config') args.voiceConfig = argv[++i] || '';
    else if (!args.file) args.file = a;
  }
  return args;
}

/** --voice-config accepts inline JSON or a path to a JSON file. */
function loadVoiceConfig(value) {
  if (!value) return null;
  const trimmed = String(value).trim();
  let raw = trimmed;
  if (!trimmed.startsWith('{')) {
    raw = fs.readFileSync(path.resolve(trimmed), 'utf8');
  }
  const parsed = JSON.parse(raw);
  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    throw new Error('voice config must be a JSON object');
  }
  return parsed;
}

function renderHuman(report) {
  const out = [];
  out.push('AI-tell score: ' + report.score + '/100 (0 is clean)');
  if (report.hardFail) {
    out.push('HARD FAIL: chat artifacts found - this text contains leftover machine output.');
  }
  const r = report.readability;
  out.push('Readability: grade ' + r.grade + ' (' + r.channel + ' ceiling ' + r.ceiling + ') - ' + (r.withinBand ? 'within the band' : 'above the band'));
  const firing = report.detectors.filter((d) => d.hits.length > 0);
  if (firing.length === 0) {
    out.push('No mechanical tells found.');
  } else {
    out.push('Findings:');
    for (const d of firing) {
      out.push('  [' + d.rule + '] ' + d.name + (d.score ? ' (+' + d.score + ')' : d.hardFail ? ' (HARD FAIL)' : ''));
      for (const h of d.hits.slice(0, 5)) {
        out.push('      line ' + h.line + ': ' + h.text);
      }
      if (d.hits.length > 5) out.push('      ... and ' + (d.hits.length - 5) + ' more');
    }
  }
  return out.join('\n');
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.selfTest) {
    process.exitCode = selfTest();
    return;
  }
  let text;
  try {
    text = args.file
      ? fs.readFileSync(path.resolve(args.file), 'utf8')
      : fs.readFileSync(0, 'utf8'); // stdin
  } catch (err) {
    process.stderr.write('Could not read the input: ' + err.message + '\n');
    process.exitCode = 2;
    return;
  }
  if (String(text).trim() === '') {
    process.stderr.write('The input is empty - nothing to score.\n');
    process.exitCode = 2;
    return;
  }
  let voiceConfig = null;
  try {
    voiceConfig = loadVoiceConfig(args.voiceConfig);
  } catch (err) {
    process.stderr.write('Bad --voice-config: ' + err.message + '\n');
    process.exitCode = 2;
    return;
  }
  const report = score(text, { channel: args.channel, voiceConfig });
  process.stdout.write((args.json ? JSON.stringify(report) : renderHuman(report)) + '\n');
}

if (require.main === module) main();

module.exports = { score, prepare, countSyllables, splitSentences, selfTest, FIXTURE_CLEAN, FIXTURE_SLOP };
