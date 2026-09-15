'use strict';

/**
 * channels.js — the channel vocabulary (Build Doc P4.2).
 *
 * GrowOS ships a known channel list; skills use it by default. A new channel
 * still works — the owner's folders are the owner's — but the Doctor names
 * every channel it does not know, and when the unknown name is one edit away
 * from a known one it says so, because `newsletter` beside `newsletters` is
 * two folders quietly splitting one channel's work, and it is caught at two
 * items rather than fifty.
 *
 * This lands before Phase 5 on purpose: the publishing resolver has to tell
 * `social` from `linkedin` from an unknown channel, and cannot do that against
 * a vocabulary that does not exist.
 *
 * Two tiers, one Set. SHIPPED are the area channels the shipped skills create
 * work in (the Requirements' v1 areas). PLATFORMS are the destination names
 * the setup template and the publish skills talk about — an owner organising
 * work by platform is not doing anything wrong, and the resolver must
 * recognise those names, so they are known rather than nagged about.
 *
 * Compared case-insensitively: macOS and Windows open `Social/` and `social/`
 * as one folder, so two case-spellings are one channel, not two.
 *
 * PRODUCT code: Node >= 18, stdlib only, no npm, no shelling out. Windows-safe.
 */

/** The area channels shipped skills put work in. */
const SHIPPED_CHANNELS = [
  'social',        // post writing, engagement replies (X/LinkedIn/FB/IG)
  'ads',           // ad rounds (ads-meta-create)
  'email',         // ONE inbox bucket (owner decision 2026-08-02) — broadcasts
                   // and automated sequences alike; not split into
                   // newsletters/sequences. The shipped work/README.md names
                   // work/email/, and the Phase 5 resolver decides whether a
                   // stray `newsletters`/`sequences` folder is a semantic alias
                   // for it or just an unknown channel to flag.
  'support',       // customer-support reply drafts (always safe-state)
  'video',         // the video pipeline, incl. short-form
  'pages',         // landing/sales pages, offers, VSL scripts, lead magnets
  'articles',      // SEO / AI-search articles
  'visuals',       // branded images and carousels
  'strategy',      // work/strategy/ holds six item types now, not just the
                   // plan: type: marketing-plan (installed into brain/plan.md
                   // by marketing-strategy) plus campaign-brief, seo-report,
                   // marketing-report, website-audit, and strategy-offer's
                   // item — those five are internal documents, finished at
                   // approved, with no publish step.
  'reports',       // ads-meta-research and ads-meta-report write work/reports/
];

/** Platform names an owner may organise by; the Phase 5 resolver knows them. */
const PLATFORM_CHANNELS = [
  'linkedin', 'instagram', 'facebook', 'x', 'youtube', 'tiktok', 'threads',
];

const KNOWN = new Set(SHIPPED_CHANNELS.concat(PLATFORM_CHANNELS));

function isKnownChannel(name) {
  return KNOWN.has(String(name).toLowerCase());
}

/** Plain Levenshtein distance — the lists are tiny, clarity beats cleverness. */
function editDistance(a, b) {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) {
      cur[j] = Math.min(
        prev[j] + 1,
        cur[j - 1] + 1,
        prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
    prev = cur;
  }
  return prev[n];
}

/**
 * Whether two channel names are close enough to be one channel misspelled.
 * At most two edits AND the distance must be small RELATIVE to the shorter
 * name (three characters of name per allowed edit): `client`/`clients` is
 * drift, `seo`/`sem` are different three-letter words, and `sms` is not a
 * misspelling of `ads`. Edit distance alone over-fires on short names — the
 * Phase-4 review caught exactly that.
 *
 * The proportional rule has accepted misses, said plainly: a two-edit slip in
 * a six-character name (a transposition plus a typo) is under the bar, and
 * near names like `blogs`/`vlogs` are over it — which is why the Doctor's
 * message states an observation and leaves the call to the owner, never a
 * conclusion. Perfect discrimination between "misspelled" and "different"
 * does not exist at this string length.
 */
function looksLikeSameChannel(a, b) {
  const x = String(a).toLowerCase();
  const y = String(b).toLowerCase();
  const d = editDistance(x, y);
  return d > 0 && d <= 2 && d * 3 < Math.min(x.length, y.length);
}

/**
 * The known channel a name is probably a misspelling of, or null: null for a
 * name that IS known (no suggestion needed) and for one that is not close to
 * anything (a deliberate new channel, which is allowed).
 *
 * Deliberately LOOSER than the pairwise drift rule above: closeness to a name
 * the vocabulary ships carries a strong prior (`adds` beside a known `ads` is
 * almost certainly the typo), while two unknown names carry none — so `adds`
 * gets its suggestion and `seo`/`sem` stay two different words. Still bounded:
 * two edits at most, and never more than one edit per two characters of the
 * shorter name, so `sms` is not "probably `ads`".
 */
function nearestKnown(name) {
  const n = String(name).toLowerCase();
  if (KNOWN.has(n)) return null;
  let best = null;
  let bestD = Infinity;
  for (const k of KNOWN) {
    const d = editDistance(n, k);
    if (d > 0 && d <= 2 && d * 2 <= Math.min(n.length, k.length) && d < bestD) { bestD = d; best = k; }
  }
  return best;
}

module.exports = { SHIPPED_CHANNELS, PLATFORM_CHANNELS, isKnownChannel, nearestKnown, looksLikeSameChannel, editDistance };
