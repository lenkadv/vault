---
name: ads-meta-research
description: 'Two independent research modes that feed a Meta ad round with real evidence instead of guesses. Competitor teardown pulls a competitor''s live ads from the Ad Library, reads hooks, formats, offers, and CTAs, and uses how long each ad has kept running as the strength signal. Angle mining turns real buyer language (reviews, forums, testimonials, support messages) into a ranked bank of angles, each backed by verbatim quotes. Use for "competitor teardown", "spy on competitor ads", "what ads is X running", "ad library search", "angle mining", "find angles", "buyer language", "voice of customer", "research before an ad round", or "ads meta research". Run one mode or both together. Updates angles.md and voc.md so ads-meta-create can draw from them directly; never drafts or ships an ad itself.'
user-invocable: true
compatibility: Competitor teardown needs the Meta Ads MCP with an active ad account connected. Angle mining needs web search plus whatever buyer materials the business already has. Either mode works without the other.
---

# Meta Ads Research

Two research jobs, run alone or together: find out what competitors are actually running and why
it's probably working, and find out how real buyers describe their own problem so an ad can speak
their language back to them. Both jobs end the same way: evidence lands in shared memory so
`ads-meta-create` starts from real signal instead of a blank page.

This skill never writes ad copy and never touches Meta beyond reading the public Ad Library. If the
job is "make the ads," hand off to `ads-meta-create` once research is done. `ads-meta-create`'s
default rounds run on banked knowledge alone (`angles.md`/`voc.md`); this skill is the deep-dive
that refreshes it, and the one create points to when that knowledge is missing, stale, or an
explicit deep round is asked for.

Work in one business folder only. If more than one business folder exists and it is not obvious
which one, ask before touching anything.

Read these only when their phase begins:
- `references/teardown-method.md` for competitor teardown: the longevity signal and its limits, how
  to read format mix, hook classification, offer-structure extraction, and the line between learning
  from an angle and copying a claim.
- `references/angle-bank.md` for angle mining: the angle-bank schema, evidence rules, and ranking.

## Operating principles

1. **Evidence over summary.** Every finding traces to something checkable: a snapshot URL, a
   verbatim quote with its source. A teardown or angle bank that can't be traced back is an opinion
   with extra formatting.
2. **Longevity is a signal, not proof.** An ad still running after weeks costs its advertiser real
   money every day it stays up. That's the tell. It isn't a guarantee, and `teardown-method.md`
   covers when it lies.
3. **Learn the angle, never copy the claim.** A competitor's exact wording, numbers, and proof belong
   to them and are unverified for this business anyway. Extract the underlying tension or promise and
   rebuild it with this business's own facts.
4. **Never fabricate.** No invented quotes, no invented ad performance numbers, no guessed running
   duration. If the Ad Library doesn't show something, say it doesn't show it.
5. **Both modes write to shared memory, append-only, dated.** Nothing in `angles.md` or `voc.md` gets
   silently rewritten; new evidence stacks on top of what's already there.
6. **Say what you couldn't check.** A thin competitor set, a search that returned nothing, a missing
   ad account: report it plainly instead of padding the output to look complete.

## Setup: find what this business already knows

Look for a `brain/` folder. `../ads-meta-create/references/operating-model.md`'s workspace
resolution section is the single source for exactly where that sits: inside a GrowOS install every
brain/work path sits inside the one selected business folder; standalone mode keeps today's
current-folder behavior. If it exists, read what's there for the offer, the audience, and any
existing competitor list (`brain/competitors.md`, a `brain/competitors/` folder, or similar; search
by content if the filename differs) before asking the user anything. No `brain/` at all: ask
directly for the offer, the audience, and known competitors. Either way, ask only for what's
genuinely missing. Don't re-interview for facts already on file.

## Mode 1: competitor teardown

1. **Get 2 to 4 competitors.** Pull from the brain if listed; otherwise ask the user to name them (a
   competing product, not a competing category: "the other coaching platform they compare us to,"
   not "coaching in general").
2. **Check the precondition first.** `ads_library_search` only works for a caller with at least one
   active ad account connected. If there isn't one, say so immediately and stop mode 1 rather than
   fabricating findings to route around a missing connection. Mode 2 doesn't need this and can still
   run.
3. **Search each competitor.** Call `ads_library_search` with the competitor's Page name or a
   matching `search_terms` value, filtered by the business's own country or countries, with
   `ad_active_status: ALL` (a competitor that just pulled an ad is itself a data point, not noise to
   filter out). Pull more than one page of results when the returned count says there's more.
4. **Analyze per ad**, following `teardown-method.md`: hook (first line or first beat), format,
   offer structure, CTA, and running duration as the strength signal.
5. **Synthesize per competitor and across the set.** Name the pattern that keeps showing up, what's
   new since older ads, and what never sticks around. Call out the strongest 3 to 5 ads specifically,
   each with its snapshot URL cited.
6. **Write the teardown report** (see Output below): a "what to steal" section built from angles and
   structures, never exact wording, plus a "what to avoid" section built from weak or short-lived
   patterns.
7. **Cross-check against the angle bank.** A competitor's own ad copy is their marketing, not a
   buyer's own words, so it never counts as an `angles.md` evidence quote on its own. If a "what to
   steal" angle already has a tracked entry, add the teardown as a dated corroboration note (a
   competitor paying to keep an angle live for weeks is a reason to trust it more, not a substitute
   for evidence). If it's genuinely new and has no buyer quotes behind it yet, name it in the report
   as a candidate for angle mining instead of writing it into `angles.md` unevidenced.

## Mode 2: angle mining

1. **Gather buyer language.** Web search for reviews, forum threads, and articles where real buyers
   describe the problem in their own words. Pull from the business's own approved testimonials and
   support messages if the brain has them (`brain/social-proof/`, or ask what's on hand). Don't mine
   private customer email without the business's own go-ahead to use it this way.
2. **Cluster into angles.** Group language that circles the same underlying tension or promise, per
   `angle-bank.md`'s definition of an angle. An angle is the buyer motivation underneath a headline,
   not the headline itself.
3. **Attach evidence.** Every angle needs 2 or more verbatim quotes, each with its source. An angle
   with a single quote is a hunch, not an angle yet: keep gathering or mark it thin and move on.
4. **Rank by evidence strength** using the rubric in `angle-bank.md` (source count, source diversity,
   specificity, breadth across segments).
5. **Write the angle bank** (see Output below). Mark every new angle `status: untried`: this skill
   only researches, it never sees a live ad's real-world results, so it never sets `testing`,
   `proven`, or `burned` itself.

## Running both together

Order doesn't matter much, but teardown often surfaces language worth checking against angle mining
(a competitor's recurring hook line is a clue, not evidence; verify it against real buyer quotes
before trusting it). When both run in one session, produce one combined report with both sections
instead of two separate files.

## Memory updates

Ads memory lives in `brain/ads/`, or `./ads-brain/` per Setup above (same resolution); create the
folder on first use. Append to `angles.md` and `voc.md` (create them from the
schemas in `angle-bank.md` if they don't exist yet). Never overwrite an existing entry, and date
every addition. These are the files `ads-meta-create` reads before drafting, so a run that skips this
step leaves the next ad round exactly as uninformed as this one started.

Keep the two files honest about what kind of evidence they hold: `voc.md` is real buyer language
only, so competitor ad copy never lands there even when it's a strong pattern. Mode 1 writes
corroboration notes into existing `angles.md` entries (see Mode 1, step 7); mode 2 writes new
evidenced angles and new `voc.md` quotes. Both date every line they touch.

## Output

Write a report to `work/reports/`, or `ads/reports/` when there's no `work/` tree.
`../ads-meta-create/references/operating-model.md`'s workspace resolution section is the single
source for exactly where that lands: inside a GrowOS install it sits inside the one selected
business folder; standalone mode keeps today's current-folder behavior. The file:
`ads-meta-research-<slug>-<YYYY-MM-DD>.md` (slug = business or round name, lowercase-hyphenated).
This is a read artifact, not a review-queue item: no frontmatter status, nothing for a human to
approve or reject, just the findings.

## Report back

Tell the user which mode(s) ran; competitor count and ads reviewed (teardown); angle count and total
quotes gathered (mining); where the report landed; and what got appended to `angles.md` and
`voc.md`. Flag anything you couldn't check (no ad account, thin search results, no buyer material
found) instead of quietly working around it.
