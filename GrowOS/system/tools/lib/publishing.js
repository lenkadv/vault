'use strict';

/**
 * publishing.js — the publishing-mode resolver (Build Doc P5.2, SPEC §5.9).
 *
 * ONE question, answered from one place: how far may a publish step go for
 * THIS item's channel? Three answers, and only one authorises anything:
 *
 *   explicit-live   the owner wrote exactly `live` for exactly this channel
 *   explicit-safe   the owner wrote exactly `safe-state`
 *   unanswered      everything else — no entry, a malformed or case-variant
 *                   value, a placeholder, duplicate entries, an alias or
 *                   near-spelling, an unknown channel, an unreadable setup.md
 *
 * `unanswered` authorises NOTHING and is deliberately not `explicit-safe`:
 * safe-state is a choice the owner made; unanswered means the owner has not
 * chosen, so the publisher asks before doing anything at all.
 *
 * Business and channel derive from the item's RESOLVED path — never from a
 * caller argument, so no caller can ask about one folder and act on another.
 * A symlinked business, setup.md, item, or any ancestor between the install
 * root and the item is refused outright (a NAME is not a DESTINATION).
 *
 * The channel match is an exact token, case-insensitive, against the P4.2
 * vocabulary (lib/channels.js). No expansion, no aliases: `social: live`
 * never authorises `linkedin`; a retired `newsletters` folder is an unknown
 * channel, not a synonym for `email`. `support` is HARD-CODED incapable of
 * live — whatever setup.md says, support replies are drafts the owner sends.
 *
 * Publishers never parse setup.md themselves. This resolver therefore also
 * returns the matched entry's fields (provider, destination id, route, and
 * the raw labelled bullets), with the same refusal to guess: a placeholder
 * or unrecognised value comes back null with the problem named.
 *
 * setup.md records what the owner INTENDS — nothing here checks that any
 * connection exists or works; that is the publisher's moment-of-use job.
 *
 * PRODUCT code: Node >= 18, stdlib only, no npm, no shelling out. Windows is
 * first-class: paths are compared through lib/paths.js normalisation.
 */

const fs = require('node:fs');
const path = require('node:path');
const paths = require('./paths.js');
const channels = require('./channels.js');

/** The two exact mode tokens. Anything else is unanswered. */
const MODE_LIVE = 'live';
const MODE_SAFE = 'safe-state';

/** The three route tiers a Route line may name, exactly. */
const ROUTES = new Set(['connector', 'api', 'manual']);

/** The one channel that can never be live, whatever anyone writes. */
const FIXED_SAFE_CHANNEL = 'support';

/**
 * The shipped template's own section headings, mapped to the channel each
 * section is the home of. This fallback exists for a setup.md written before
 * entries carried an explicit `- Channel:` line; it maps ONLY the exact
 * shipped headings — an owner's own heading answers for nothing (that would
 * be guessing). Compared trimmed, lower-cased, spaces collapsed.
 */
const SHIPPED_HEADINGS = {
  'email and newsletter': 'email',
  'social': 'social',
  'ads': 'ads',
  'video': 'video',
  'customer support': 'support',
};

function normHeading(h) {
  return String(h || '').trim().toLowerCase().replace(/\s+/g, ' ');
}

function isPlaceholder(value) {
  return String(value).indexOf('[PLACEHOLDER') !== -1;
}

/**
 * ASCII-only trim. JavaScript's own trim() also removes Unicode whitespace
 * (a non-breaking space, an ideographic space), which let an INVISIBLY
 * decorated value read as the exact token. The permitted
 * slack around a value is plain spaces and tabs; anything else stays in the
 * value and fails the exact-token comparison — with the invisible character
 * NAMED (below) so the owner can actually fix the line.
 */
function asciiTrim(s) {
  return String(s).replace(/^[ \t]+/, '').replace(/[ \t\r]+$/, '');
}

/** Name any invisible non-ASCII whitespace in a value, for problem messages. */
function invisibleCharNote(v) {
  return /[\u00A0\u1680\u2000-\u200B\u2028\u2029\u202F\u205F\u3000\uFEFF]/.test(String(v))
    ? ' The value contains an invisible character (like a non-breaking space) - retype the line with plain spaces.'
    : '';
}

/**
 * First path segment (from root) that is a symbolic link, or null.
 *
 * BIGINT stats, like every other stat taken on a proof path: the seal gate's
 * binding test holds every stat of the approved copy to that rule, and one
 * numeric stat there would round dev/ino on filesystems that use the full
 * identifier width. This walk compares no identifiers, but
 * the rule is simpler to keep than to except.
 */
function firstSymlinkOnPath(root, absTarget) {
  const rel = path.relative(String(root), String(absTarget));
  let cur = String(root);
  for (const seg of rel.split(path.sep)) {
    if (seg === '' || seg === '.') continue;
    cur = path.join(cur, seg);
    let lst = null;
    try { lst = fs.lstatSync(cur, { bigint: true }); } catch (_e) { return null; } // absent below here
    if (lst.isSymbolicLink()) return cur;
  }
  return null;
}

/* ------------------------------ setup parse ------------------------------ */

/**
 * parseSetup(text) -> { entries: [entry], problems: [string] }
 *
 * An entry is one channel's block of labelled bullets. Within a section
 * (### heading), every `- Channel: <name>` line STARTS a new entry (the
 * template's repeat-this-block shape); bullets before the first Channel line
 * belong to the section itself, which becomes an entry only when its heading
 * is one of the shipped ones. Labels are matched case-insensitively; values
 * are kept verbatim (trimmed). A placeholder value counts as absent.
 *
 * The parser records rather than guesses: a duplicated label that matters, a
 * value it cannot read, a Channel line with a placeholder — each becomes a
 * problem string on the entry, and the resolver turns problems into
 * `unanswered` where they touch the answer.
 */
function parseSetup(text) {
  const problems = [];
  const entries = [];
  let heading = null;
  let sectionIndex = -1;
  let current = null; // the entry bullets are attaching to
  let sectionEntry = null; // the heading's own (pre-Channel-line) entry
  // The most recent ATTACHED bullet occurrence: { entry, label, stored }.
  // `stored` is false for a placeholder or duplicate attach (recorded in
  // allValues but never written to fields) — a continuation still lengthens
  // that transcript, but must not retroactively answer for it. Cleared on a
  // heading, a Channel line, a blank line, or any other non-continuation
  // line; a continuation line is judged AFTER the heading/bullet regexes
  // above (both keep priority) so it can only ever be a line neither of them
  // claimed.
  let last = null;

  const startEntry = (channelName, viaHeading) => {
    const e = {
      channel: channelName === null ? null : asciiTrim(String(channelName)).toLowerCase(),
      viaHeading: !!viaHeading,
      heading: heading,
      section: sectionIndex,
      fields: {},        // lowercased label -> verbatim value (placeholders excluded)
      allValues: {},     // lowercased label -> EVERY value seen, in file order
      duplicates: [],    // labels seen more than once
      problems: [],
    };
    entries.push(e);
    return e;
  };

  for (const line of String(text).split(/\r?\n/)) {
    const h = line.match(/^\s{0,3}(#{2,6})\s+(.*)$/);
    if (h) {
      heading = h[2].trim();
      sectionIndex += 1;
      current = null;
      sectionEntry = null;
      last = null; // a heading ends any continuation context
      continue;
    }
    // ASCII spacing only, in the line shape and the trims:
    // \s would let a non-breaking space pass as the permitted slack around a
    // value, and the exact-token rule would silently forgive it.
    const b = line.match(/^[ \t]*-[ \t]+([^:]+):[ \t]*(.*)$/);
    if (b) {
      const label = asciiTrim(b[1]).toLowerCase();
      const value = asciiTrim(b[2]);

      if (label === 'channel') {
        last = null; // a Channel line always starts a new block, never a continuation
        if (isPlaceholder(value) || value === '') {
          // A block whose Channel line is still a placeholder names no channel;
          // its bullets attach to nothing (never to a neighbour's entry).
          current = startEntry(null, false);
          current.problems.push('a block\'s Channel line is not filled in');
          continue;
        }
        current = startEntry(value, false);
        continue;
      }

      // A labelled bullet before any Channel line: the section's own entry.
      if (current === null) {
        if (sectionEntry === null) {
          const mapped = SHIPPED_HEADINGS[normHeading(heading)];
          sectionEntry = startEntry(mapped === undefined ? null : mapped, true);
        }
        attach(sectionEntry, label, value);
        continue;
      }
      attach(current, label, value);
      continue;
    }

    // Not a heading and not a labelled bullet: maybe a CONTINUATION of the
    // most recently attached bullet's value, wrapped onto the next physical
    // line(s). Continuations must be CONTIGUOUS with their bullet — a blank
    // line, ordinary unindented prose, or an indented unlabelled dash line
    // (a sub-list) all end the context. This protects the shipped template,
    // whose answered blocks are followed by blank lines, help prose, and (for
    // Customer support) an indented help paragraph: none of that may ever
    // append to the owner's answer.
    if (line.trim() === '') { last = null; continue; } // a blank line ends the context
    if (/^[ \t]{2,}[^ \t]/.test(line)) {
      if (/^[ \t]{2,}-/.test(line)) {
        // An indented line starting with "-" has no label (no colon reached
        // the bullet regex above) — a sub-list line. Not a continuation, not
        // a bullet: it ends the context and is otherwise ignored.
        last = null;
        continue;
      }
      if (last !== null) {
        // Join with a space, uniformly. For a prose field the space is
        // correct; for a steering field (How far to go / Route / Destination
        // id) a joined value stops matching the exact vocabulary or the real
        // destination, so the entry resolves to a PROBLEM/unanswered LOUDLY —
        // the whole point. Under the old truncation, a wrapped destination id
        // could silently target a wrong-but-valid destination; joined with a
        // space, it cannot.
        const joined = ' ' + asciiTrim(line);
        const vals = last.entry.allValues[last.label];
        vals[vals.length - 1] += joined; // mutate the LAST element, never push
        if (last.stored) {
          // A placeholder first line stays unanswered — the joined value is
          // never re-checked against isPlaceholder.
          last.entry.fields[last.label] += joined;
        }
        continue; // last stays set: further contiguous lines keep joining
      }
      continue; // indented, but no bullet is open — nothing to join to
    }
    // Ordinary unindented prose (or any other shape): ends the context too.
    last = null;
  }

  function attach(entry, label, value) {
    // EVERY value is remembered, in file order, even the ones the first-wins
    // rule below discards. A reader that must judge what the file CLAIMS —
    // support's live contradiction — has to see all of them: with
    // `safe-state` first and `live` second, the retained value is innocent and
    // the contradiction went unnamed.
    if (!Object.prototype.hasOwnProperty.call(entry.allValues, label)) entry.allValues[label] = [];
    entry.allValues[label].push(value);
    if (Object.prototype.hasOwnProperty.call(entry.fields, label) || entry.duplicates.indexOf(label) !== -1) {
      if (entry.duplicates.indexOf(label) === -1) entry.duplicates.push(label);
      last = { entry, label, stored: false }; // recorded, but this occurrence never answers
      return; // first value stays; the duplication is recorded, not resolved
    }
    if (isPlaceholder(value)) {
      last = { entry, label, stored: false }; // an unedited placeholder counts as unanswered
      return;
    }
    entry.fields[label] = value;
    last = { entry, label, stored: true };
  }

  // A section that holds explicit Channel-line entries AND stray bullets above
  // them: the stray bullets' heading-entry is only real if it carries its own
  // "How far to go" answer. Without one it is dropped — an owner putting the
  // Provider line above the Channel line must not manufacture a duplicate
  // entry (two answers where they wrote one). WITH one, the ambiguity is
  // real, and the duplicate rule turns it into `unanswered`, which asks.
  const sectionsWithChannelLines = new Set(
    entries.filter((e) => !e.viaHeading && e.channel !== null).map((e) => e.section));
  const kept = entries.filter((e) =>
    !(e.viaHeading && sectionsWithChannelLines.has(e.section) &&
      !Object.prototype.hasOwnProperty.call(e.fields, 'how far to go')));

  return { entries: kept, problems };
}

/* ------------------------------- resolution ------------------------------ */

/** Turn one matched entry into { mode, entryOut, problems } — strictly. */
function judgeEntry(entry, channel) {
  const problems = entry.problems.slice();
  let mode = 'unanswered';
  let reason;

  const HOW = 'how far to go';
  // The line appears more than once — count EVERY occurrence in file order, not
  // just the ones the first-wins rule kept. A placeholder followed by `live`
  // left `duplicates` empty (the placeholder was never stored, so the second
  // value did not read as a repeat) and resolved to a clean `explicit-live`,
  // authorising a live publish from a block the owner half-answered. Two
  // "How far to go" lines are two answers, and two answers are
  // no answer — whatever either line says.
  const howCount = (entry.allValues && entry.allValues[HOW]) ? entry.allValues[HOW].length : 0;
  if (entry.duplicates.indexOf(HOW) !== -1 || howCount > 1) {
    problems.push('the entry has more than one "How far to go" line — two answers are no answer');
    reason = 'the ' + channel + ' entry answers "How far to go" more than once, so nothing is authorised';
  } else if (!Object.prototype.hasOwnProperty.call(entry.fields, HOW)) {
    reason = 'the ' + channel + ' entry has no answered "How far to go" line';
  } else {
    const v = asciiTrim(entry.fields[HOW]);
    if (v === MODE_LIVE) {
      mode = 'explicit-live';
      reason = 'setup.md answers exactly `live` for ' + channel;
    } else if (v === MODE_SAFE) {
      mode = 'explicit-safe';
      reason = 'setup.md answers exactly `safe-state` for ' + channel;
    } else {
      reason = 'the ' + channel + ' entry\'s "How far to go" value (' + JSON.stringify(v) + ') is not exactly ' +
        '`live` or `safe-state`, so it authorises nothing';
      problems.push('"How far to go" must be exactly `live` or `safe-state` — anything else, including a ' +
        'different spelling or capitalisation, is treated as not answered.' + invisibleCharNote(v));
    }
  }

  if (entry.duplicates.length) {
    for (const d of entry.duplicates) {
      if (d !== HOW) problems.push('the label "' + d + '" appears more than once; the first value was kept');
    }
  }

  let route = null;
  let routeInvalid = false;
  if (Object.prototype.hasOwnProperty.call(entry.fields, 'route')) {
    const rv = asciiTrim(entry.fields.route);
    if (ROUTES.has(rv)) route = rv;
    else {
      routeInvalid = true;
      problems.push('the Route value (' + JSON.stringify(rv) + ') is not one of connector / api / manual.' +
        invisibleCharNote(rv));
    }
  }

  // Build Doc P5.2: duplicate keys and malformed values resolve to UNANSWERED.
  // A duplicated label that STEERS a publish (provider, destination id, route)
  // is two answers where one was needed — no answer; same for a Route value
  // the vocabulary does not know. A harmless repeated label (notes) records a
  // problem above without touching the mode.
  if (mode !== 'unanswered') {
    const steering = entry.duplicates.filter((d) => d === 'provider' || d === 'destination id' || d === 'route');
    if (steering.length) {
      mode = 'unanswered';
      reason = 'the ' + channel + ' entry answers "' + steering[0] + '" more than once — two answers are ' +
        'no answer, so nothing is authorised until the entry has one of each';
    } else if (routeInvalid) {
      mode = 'unanswered';
      reason = 'the ' + channel + ' entry\'s Route value is not one GrowOS knows (connector / api / ' +
        'manual), so nothing is authorised until it is fixed';
    }
  }

  const entryOut = {
    heading: entry.heading,
    channel: entry.channel,
    provider: Object.prototype.hasOwnProperty.call(entry.fields, 'provider') ? entry.fields.provider : null,
    destination_id: Object.prototype.hasOwnProperty.call(entry.fields, 'destination id') ? entry.fields['destination id'] : null,
    route,
    fields: entry.fields,
  };

  return { mode, reason, entryOut, problems };
}

/**
 * resolveSetupForChannel(setupText, channel) -> { mode, reason, fixed, entry, problems }
 * The pure part: no filesystem. `channel` must already be the item's channel
 * folder token (lower-cased by the caller).
 */
function resolveSetupForChannel(setupText, channel) {
  const c = String(channel).toLowerCase();
  const parsed = parseSetup(setupText);
  const problems = parsed.problems.slice();

  const matches = parsed.entries.filter((e) => e.channel !== null && e.channel === c);

  let mode = 'unanswered';
  let reason;
  let entryOut = null;

  if (matches.length === 0) {
    reason = 'setup.md has no entry for the ' + c + ' channel — nobody has answered for it yet';
  } else if (matches.length > 1) {
    reason = 'setup.md has ' + matches.length + ' entries for the ' + c + ' channel — two answers are no answer';
    problems.push('duplicate entries for ' + c + ': the resolver will not pick one');
    entryOut = null;
  } else {
    const judged = judgeEntry(matches[0], c);
    mode = judged.mode;
    reason = judged.reason;
    entryOut = judged.entryOut;
    for (const p of judged.problems) problems.push(p);
  }

  // An unknown channel authorises nothing even with a matching, well-formed
  // entry: the vocabulary is what keeps `social: live` from meaning linkedin,
  // and a name GrowOS does not know gets the ask-first treatment.
  if (mode !== 'unanswered' && !channels.isKnownChannel(c)) {
    problems.push(c + ' is not a channel GrowOS knows, so its setup entry authorises nothing');
    reason = c + ' is not in the shipped channel vocabulary — publishing there is ask-first until ' +
      'a GrowOS release knows the name';
    mode = 'unanswered';
  }

  // Support is HARD-CODED incapable of live, whatever the file says. Its
  // "How far to go" line is decoration, so the strict-value complaints do not
  // apply here — the ONE thing worth naming is a value that exactly claims
  // `live`, because that line contradicts what actually happens.
  let fixed = false;
  if (c === FIXED_SAFE_CHANNEL) {
    fixed = true;
    const keep = problems.filter((p) => !/How far to go/.test(p));
    problems.length = 0;
    for (const p of keep) problems.push(p);
    // The live CLAIM is judged on the raw values, not on the (possibly already
    // demoted) mode — a duplicate steering key must not hide the one line
    // worth naming here. EVERY value the label carried is judged, not just
    // the first one the parser retained: `safe-state` written above `live`
    // left an innocent retained value and the contradiction went unnamed.
    const rawHows = matches.length === 1 && matches[0].allValues
      ? (matches[0].allValues['how far to go'] || []) : [];
    if (rawHows.some((v) => asciiTrim(v) === MODE_LIVE)) {
      problems.push('setup.md says `live` for support, but support has no live mode — the answer is ignored');
    }
    // Duplicate steering keys or a malformed Route mean the ENTRY's fields
    // cannot be trusted either — support stays safe as a MODE, but a draft
    // must not be steered by "the first of two answers": the
    // publisher asks instead.
    if (mode === 'unanswered' && entryOut !== null) entryOut = null;
    mode = 'explicit-safe';
    reason = 'support replies are always prepared as drafts the owner sends — this channel has no live ' +
      'mode, whatever setup.md says';
  }

  return { mode, reason, fixed, entry: entryOut, problems };
}

/* ------------------------------ the item side ---------------------------- */

/**
 * resolveMode(root, itemPath) -> {
 *   item, business, channel, mode, fixed, reason, entry, problems
 * }
 *
 * THROWS (a refusal, not an answer) when the item path cannot be trusted:
 * outside a business's work area, sidecar space, missing, not a regular
 * file, or any symlink on the way — item, setup.md, business, or ancestor.
 * Every other difficulty (missing setup.md, malformed entries, unknown
 * channel) is an ANSWER: `unanswered`, with the reason in plain words.
 */
function resolveMode(root, itemPath) {
  const rootAbs = path.resolve(String(root));
  // The install root itself may sit under a benign ancestor alias (macOS
  // /var -> /private/var). Judge each candidate against the base it actually
  // belongs to, so only links BELOW the root refuse — never the alias above it.
  const rootReal = paths.realpathBestEffort(rootAbs);

  // The path the caller gave and the path the filesystem means must agree.
  const lexical = path.resolve(rootAbs, String(itemPath));
  const twin = paths.realpathBestEffort(lexical);

  const contains = (base, cand) => {
    const rel = path.relative(base, cand);
    return rel !== '' && rel.split(path.sep)[0] !== '..' && !path.isAbsolute(rel);
  };
  // Where the item REALLY lives (the twin) must be inside the install. The
  // lexical spelling may legitimately sit outside both bases when the CALLER
  // spelled the root through a benign ancestor alias (macOS /var ->
  // /private/var); the twin's walk covers the real chain in that case, so the
  // lexical spelling is only symlink-walked when it lies under a base itself.
  if (!contains(rootAbs, twin) && !contains(rootReal, twin)) {
    throw new Error('this path is outside the GrowOS folder, so it is not a work item');
  }
  // The LEXICAL spelling must name the item from inside the install too:
  // without this, an external name (`/tmp/item.md`
  // symlinked at a real item) was never symlink-walked — its twin lands
  // inside and answers. The one legitimate outside spelling is a benign
  // ANCESTOR alias (macOS `/var` -> `/private/var`): some ancestor of the
  // lexical path IS the install root under another OS spelling. That ancestor
  // becomes the walk base, so every component BELOW the root is still
  // symlink-checked; an alias for a mid-path folder or the item itself has no
  // such ancestor and is refused.
  let lexBase = contains(rootAbs, lexical) ? rootAbs : (contains(rootReal, lexical) ? rootReal : null);
  if (lexBase === null) {
    let cur = path.dirname(lexical);
    let prev = null;
    while (cur !== prev) {
      if (paths.realpathBestEffort(cur) === rootReal) { lexBase = cur; break; }
      prev = cur;
      cur = path.dirname(cur);
    }
  }
  if (lexBase === null) {
    throw new Error('this path names the item from outside the GrowOS folder — spell it by its place ' +
      'inside the install (an outside name for an inside file is a link, and a link is not an item)');
  }
  {
    const link = firstSymlinkOnPath(lexBase, lexical);
    if (link !== null) {
      throw new Error('the path to this item passes through a link (' +
        paths.toPosix(path.relative(lexBase, link)) + ') — a link is a name, not a destination, so the ' +
        'resolver will not answer for it. Remove or investigate the link first');
    }
  }
  {
    const base = contains(rootAbs, twin) ? rootAbs : rootReal;
    const link = firstSymlinkOnPath(base, twin);
    if (link !== null) {
      throw new Error('the path to this item passes through a link (' +
        paths.toPosix(path.relative(base, link)) + ') — a link is a name, not a destination, so the ' +
        'resolver will not answer for it. Remove or investigate the link first');
    }
  }

  const abs = twin;
  const judgeRoot = contains(rootReal, twin) ? rootReal : rootAbs;
  let lst = null;
  try { lst = fs.lstatSync(abs); } catch (_e) { lst = null; }
  if (lst === null) {
    throw new Error('there is no item at ' + paths.toPosix(path.relative(judgeRoot, abs)) + ' — nothing to answer for');
  }
  if (lst.isSymbolicLink()) {
    throw new Error('this item is a link, and a link is not an item — the resolver will not answer for it');
  }
  if (!lst.isFile()) {
    throw new Error('this path is not an ordinary file, so it is not a work item');
  }
  if (!paths.isWorkItem(judgeRoot, abs)) {
    throw new Error('this file is not a work item (it is outside a business\'s work folder, or it is ' +
      'sidecar parts space) — publishing-mode answers only for real items');
  }

  const business = paths.businessOf(judgeRoot, abs);
  const channelRaw = paths.channelOf(judgeRoot, abs);
  const item = paths.toPosix(path.relative(judgeRoot, abs));

  if (business === null) {
    throw new Error('this item is not inside a business folder');
  }

  if (channelRaw === null || channelRaw === undefined) {
    return {
      item, business, channel: null, mode: 'unanswered', fixed: false,
      reason: 'this item sits directly under work/ with no channel folder, so there is no channel ' +
        'entry to answer for it',
      entry: null,
      problems: [],
    };
  }
  const channel = String(channelRaw).toLowerCase();

  // setup.md itself must be an ordinary, un-linked file.
  const setupAbs = path.join(judgeRoot, business, 'setup.md');
  let setupLst = null;
  try { setupLst = fs.lstatSync(setupAbs); } catch (_e) { setupLst = null; }
  if (setupLst !== null && (setupLst.isSymbolicLink() || !setupLst.isFile())) {
    throw new Error(business + '/setup.md is a link or not an ordinary file — it cannot answer for this ' +
      'business. Remove or investigate the link first');
  }

  if (setupLst === null) {
    return {
      item, business, channel,
      mode: channel === FIXED_SAFE_CHANNEL ? 'explicit-safe' : 'unanswered',
      fixed: channel === FIXED_SAFE_CHANNEL,
      reason: channel === FIXED_SAFE_CHANNEL
        ? 'support replies are always prepared as drafts the owner sends — this channel has no live mode'
        : business + '/setup.md is missing, so no channel has an answer — ask the owner',
      entry: null,
      problems: [business + '/setup.md is missing'],
    };
  }

  // Read THROUGH a descriptor opened with O_NOFOLLOW where the platform has
  // it: the lstat above and a plain readFileSync-by-name
  // left a gap where a regular file could be swapped for a link between the
  // two. The fstat re-check makes the bytes come from the file that was
  // judged. On platforms without O_NOFOLLOW the lstat check above is the
  // (pre-existing) line, and that limit stays written here.
  let text = null;
  let setupFd = null;
  try {
    let flags = fs.constants.O_RDONLY;
    if (typeof fs.constants.O_NOFOLLOW === 'number') flags |= fs.constants.O_NOFOLLOW;
    setupFd = fs.openSync(setupAbs, flags);
    const fst = fs.fstatSync(setupFd);
    // NOTHING is bound to this line — the lstat
    // above plus O_NOFOLLOW already refuse links, and a directory fails the
    // read below with EISDIR. It stands only for the exotic non-regular file
    // (a FIFO would otherwise hang the read). Defensive, kept, stated here.
    if (!fst.isFile()) throw new Error('not an ordinary file');
    text = fs.readFileSync(setupFd, 'utf8');
    if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);
  } catch (err) {
    if (err && (err.code === 'ELOOP' || err.code === 'EMLINK')) {
      throw new Error(business + '/setup.md is a link or not an ordinary file — it cannot answer for this ' +
        'business. Remove or investigate the link first');
    }
    return {
      item, business, channel,
      mode: channel === FIXED_SAFE_CHANNEL ? 'explicit-safe' : 'unanswered',
      fixed: channel === FIXED_SAFE_CHANNEL,
      reason: channel === FIXED_SAFE_CHANNEL
        ? 'support replies are always prepared as drafts the owner sends — this channel has no live mode'
        : business + '/setup.md could not be read (' + (err && err.message ? err.message : String(err)) +
          '), and a file that cannot be read authorises nothing',
      entry: null,
      problems: [business + '/setup.md could not be read'],
    };
  } finally {
    if (setupFd !== null) { try { fs.closeSync(setupFd); } catch (_) {} }
  }

  let r;
  try {
    r = resolveSetupForChannel(text, channel);
  } catch (err) {
    // The parser must never turn garbage into authority — or into a crash.
    r = {
      mode: 'unanswered', fixed: false, entry: null,
      reason: business + '/setup.md could not be understood (' + (err && err.message ? err.message : String(err)) +
        '), and a file that cannot be understood authorises nothing',
      problems: ['setup.md could not be parsed'],
    };
    if (channel === FIXED_SAFE_CHANNEL) {
      r.mode = 'explicit-safe';
      r.fixed = true;
      r.reason = 'support replies are always prepared as drafts the owner sends — this channel has no live mode';
    }
  }

  return {
    item, business, channel,
    mode: r.mode, fixed: r.fixed, reason: r.reason, entry: r.entry, problems: r.problems,
  };
}

/**
 * enumerateModes(root, business) -> [{ channel, mode, fixed, reason, problems }]
 * The Doctor's view: every channel setup.md answers for, judged with exactly
 * the same strictness as resolveMode. Channels are deduped case-insensitively;
 * duplicates resolve unanswered here too. Never throws: an unreadable or
 * linked setup.md comes back as one problem row.
 */
function enumerateModes(root, business) {
  const rootAbs = path.resolve(String(root));
  const setupAbs = path.join(rootAbs, String(business), 'setup.md');
  let lst = null;
  try { lst = fs.lstatSync(setupAbs); } catch (_e) { return []; }
  if (lst.isSymbolicLink() || !lst.isFile()) {
    return [{ channel: null, mode: 'unanswered', fixed: false,
      reason: business + '/setup.md is a link or not an ordinary file', problems: ['setup.md is a link'] }];
  }
  let text;
  try {
    text = fs.readFileSync(setupAbs, 'utf8');
    if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);
  } catch (err) {
    return [{ channel: null, mode: 'unanswered', fixed: false,
      reason: business + '/setup.md could not be read', problems: [String(err && err.message || err)] }];
  }
  let names = [];
  try {
    const seen = new Set();
    for (const e of parseSetup(text).entries) {
      if (e.channel === null) continue;
      if (!seen.has(e.channel)) { seen.add(e.channel); names.push(e.channel); }
    }
  } catch (_e) { names = []; }
  const rows = [];
  for (const c of names) {
    let r;
    try { r = resolveSetupForChannel(text, c); }
    catch (_e) { r = { mode: 'unanswered', fixed: false, reason: 'could not be judged', problems: ['parse failure'] }; }
    rows.push({ channel: c, mode: r.mode, fixed: r.fixed, reason: r.reason, problems: r.problems });
  }
  return rows;
}

/* --------------------------- mode-change watching ------------------------ */

/**
 * recordModeChanges(root, business, opts) -> { changes, baseline }
 *
 * The detective half of the live switch (Build Doc P5.3): compare the
 * business's CURRENT per-channel modes against the last ones seen
 * (`.growos/publish-modes.json`), append one `publish-mode-change` logbook
 * event per difference, and save the new state. The FIRST observation of a
 * business writes the state silently and reports `baseline: true` — a change
 * cannot be reported without a before, and flooding the log with "changes
 * from nothing" would bury the real ones.
 *
 * opts.actor ('ai' | 'owner'), opts.session, opts.detected ride into the
 * event. Never throws: watching must never break the write it watches — a
 * failure here simply records nothing, and the Doctor's live-channel
 * highlight remains the standing view.
 */
function recordModeChanges(root, business, opts) {
  opts = opts || {};
  try {
    const logbook = require('./logbook.js');
    const atomic = require('./atomic.js');
    const rootAbs = path.resolve(String(root));
    const rows = enumerateModes(rootAbs, business);
    const current = {};
    for (const r of rows) if (r.channel) current[r.channel] = r.mode;

    const statePath = path.join(rootAbs, '.growos', 'publish-modes.json');
    let all = null;
    try {
      let raw = fs.readFileSync(statePath, 'utf8');
      if (raw.charCodeAt(0) === 0xfeff) raw = raw.slice(1);
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object' && parsed.businesses && typeof parsed.businesses === 'object') {
        all = parsed.businesses;
      }
    } catch (_) { all = null; }
    const prev = all !== null && all[business] && typeof all[business] === 'object' ? all[business] : null;

    const changes = [];
    if (prev !== null) {
      const names = new Set(Object.keys(prev).concat(Object.keys(current)));
      for (const c of names) {
        const from = Object.prototype.hasOwnProperty.call(prev, c) ? String(prev[c]) : 'unanswered';
        const to = Object.prototype.hasOwnProperty.call(current, c) ? String(current[c]) : 'unanswered';
        if (from !== to) changes.push({ channel: c, from, to });
      }
      for (const ch of changes) {
        try {
          const ev = {
            actor: opts.actor === 'owner' ? 'owner' : 'ai',
            event: 'publish-mode-change',
            channel: ch.channel,
            from: ch.from,
            to: ch.to,
          };
          if (opts.session) ev.session = String(opts.session);
          if (opts.detected) ev.detected = String(opts.detected);
          logbook.append(rootAbs, business, ev);
        } catch (_) { /* detective, never fatal */ }
      }
    }

    try {
      fs.mkdirSync(path.join(rootAbs, '.growos'), { recursive: true });
      const next = { businesses: Object.assign({}, all || {}) };
      next.businesses[business] = current;
      atomic.atomicWrite(statePath, JSON.stringify(next, null, 2) + '\n');
    } catch (_) { /* state is best-effort; next observation re-baselines */ }

    return { changes, baseline: prev === null };
  } catch (_) {
    return { changes: [], baseline: false };
  }
}

/** Plain words for a mode, for owner-facing lines. */
function sayMode(mode) {
  if (mode === 'explicit-live') return 'LIVE';
  if (mode === 'explicit-safe') return 'safe-state';
  return 'not answered';
}

module.exports = {
  firstSymlinkOnPath,
  resolveMode,
  enumerateModes,
  resolveSetupForChannel,
  parseSetup,
  recordModeChanges,
  sayMode,
  MODE_LIVE,
  MODE_SAFE,
  FIXED_SAFE_CHANNEL,
};
