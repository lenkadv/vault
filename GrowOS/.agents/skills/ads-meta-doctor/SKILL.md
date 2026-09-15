---
name: ads-meta-doctor
description: 'Runs a full checkup on a live Meta ad account and hands back evidence-backed findings and fix proposals - bleed (spend with no results), fatigue (an aging winner going stale), pacing (over or under the daily budget), and delivery flags (learning phase, disapprovals, anomalies). Nothing gets touched until you say yes, one proposal at a time, and nothing ever gets reactivated. Use whenever the user says "check my ads", "ad account checkup", "run the doctor", "how are my Meta ads doing", "diagnose my ad account", "what should I pause or fix", or "ads health check".'
user-invocable: true
---

# Ads Meta Doctor

The AI media buyer's checkup. Reads the account, turns raw numbers into findings, and proposes
specific fixes with the evidence attached. It never acts without a yes, never activates anything,
and it treats a Meta-reported zero as a question to verify, not a verdict to act on. Every threshold
it judges against lives in `references/operating-system.md` - read that file once, it's the whole
reasoning engine behind every proposal this skill makes.

Work in one business folder only. If more than one business folder exists and it is not obvious
which one, ask before touching anything.

## Step 1 - Load context

Look for a `brain/` folder.
`../ads-meta-create/references/operating-model.md`'s workspace resolution section is the single
source for exactly where that sits: inside a GrowOS install it sits inside the one selected business
folder; standalone mode keeps today's current-folder behavior. If it exists, read
`brain/ads/config.md` for the ad account id, currency, target CPA (or target ROAS / target CPL), and
daily budget. No `brain/`: use `./ads-brain/config.md` instead. Same schema either way.

Missing the file entirely, or missing a field this run needs: ask for it directly (short questions,
not a full interview) and offer to save it to `config.md` so the next checkup skips this step. Doctor
only needs the fields above - leave everything else in the shared config schema (page id, pixel id,
landing page url, business language) untouched if it isn't there yet; another skill in the pack owns
filling those in.

Without a target CPA or target ROAS, every judgment in `references/operating-system.md` is
unavailable (the thresholds are formulas relative to that number). Ask for it before continuing;
don't guess one.

## Step 2 - Size the lookback from what ran before

Look for prior checkups: `brain/ads/checkups/` (or `./ads-brain/checkups/`), sorted by filename date.
None found: this is the **first-ever checkup**. Say so plainly, and expect most or all ads to sit
below the verdict floor (§1 of the operating system) - a brand-new account has nothing to judge yet,
and that's a normal, useful finding on its own, not a failure to report something.

A prior checkup exists: the gap since its date is your primary lookback window. If that gap is under
~3 days, still run the checkup (the user asked), but say plainly that a window this short won't show
a reliable trend, and lean on the wider windows below for anything trend-based.

Regardless of the gap, always also pull two comparable trailing windows (e.g. this week vs last
week) - fatigue and pacing findings need a real trend, not a single reading, and "since last
checkup" alone won't always give you one.

## Step 3 - Pull the account state

Use whatever the Meta Ads MCP exposes under these names (verify a field exists via
`ads_get_field_context` before leaning on it if you're unsure):

| Need | Tool |
|---|---|
| Spend, results, CPA inputs, CTR, frequency, budget, status | `ads_get_ad_entities` (ad and adset level; one `breakdowns` value per call, the API doesn't do multi-dimension cross-tabs) |
| CTR/CPA/ROAS direction over time | `ads_insights_performance_trend` (ad or adset level) |
| Recent changes made outside this skill | `ads_account_get_activity_logs` |
| Hard delivery blockers | `ads_get_errors` |
| Spend/CTR/CPA spikes or drops | `ads_insights_anomaly_signal` (observational only, never treat as a verdict) |
| Account-level health context | `ads_get_opportunity_score` |

Scope to active campaigns and their ad sets/ads by default; a paused entity has nothing to check
until reactivated (and this skill never reactivates anything itself).

Compute CPA (spend / the result type matching that ad set's actual optimization goal - purchases,
leads, whatever it's actually optimizing for, not a fixed action type) or ROAS where value tracking
is on. Compare against the account's target from `config.md`.

## Step 4 - Classify findings

Run every ad/adset through `references/operating-system.md` in order: verdict floor first, then hard
delivery flags, then the multi-factor read for anything past the floor. Four finding types:

- **Bleed** - spend with no attributed results. A Meta-only zero is a CHECK signal, never an
  automatic kill (op-system §2) - the finding is a question for the user ("any record of a sale
  outside Meta?"), not a pause proposal, unless they confirm the zero is real.
- **Fatigue** - rising frequency with falling CTR or conversion rate on a previously-strong ad,
  sustained across comparable windows (op-system §4). Route through the response ladder: watch, then
  flag for refresh, then (only with sustained evidence and no refresh queued) a budget/pause proposal.
- **Pacing** - spend meaningfully under or over the configured daily budget (op-system §5).
  Underpacing is a delivery-constraint finding, not a bleed finding.
- **Delivery flags** - learning phase, disapprovals, policy issues, zero-delivery despite an active
  status, anomaly signals (op-system §6). Surface these regardless of checkup cadence; they don't
  wait for a pattern to form.

Don't classify anything below the verdict floor as a finding at all beyond "still warming up" - no
proposal, no urgency, just a note.

## Step 5 - Turn each finding into a proposal

One proposal per finding, each showing its work:

- **What**: the ad/adset name and id.
- **Evidence**: the actual numbers, the window they came from, and the specific comparison (vs
  target, vs prior window, vs configured budget).
- **Threshold cited**: which rule in `operating-system.md` triggered this (e.g. "op-system §2, gap
  vs target + spend level + frequency all point the same way").
- **Proposed action**: `watch` (no action, just noted) / `verify` (a question for the user, not a
  mutation) / `flag for creative refresh` (no mutation, a production note) / `pause` / `budget step
  +15-20%` / `budget step -15-20%` (show the real new number, not just the percent).

A finding with only one corroborating factor is a `watch` or `verify`, never a `pause` proposal -
that's the keep-bias in op-system §2, not optional.

## Step 6 - Execute, one yes at a time

Present the findings and proposals as a single readable report so the user has full context. Then
walk the actionable proposals (`pause` and `budget step`) one at a time: state the proposal plainly,
wait for an explicit yes or no, and only then act.

On yes: re-read the entity first (confirm it's still in the state your evidence assumed - someone may
have changed it since you pulled data), then call `ads_update_entity` with the specific field
(`status: PAUSED` for a pause; `daily_budget`/`lifetime_budget` in minor units for a budget step).
Confirm the change landed by reading the entity back. Record the outcome.

On no: record it as declined and move to the next proposal. Don't re-argue it, don't rephrase it and
ask again later in the same run. The user's no is final for this checkup.

Never call `ads_activate_entity`. Not on a proposal, not as a side effect of anything, not even to
"undo" a pause this same run made - reactivating is the user's move in Ads Manager, always.

## Step 7 - Write the checkup summary

Save a short markdown file to `brain/ads/checkups/<date>-checkup.md` (or `./ads-brain/checkups/` if
no brain exists): the lookback window(s) used, each finding with its evidence in brief, each
proposal and its outcome (executed / declined / not actionable), and a one-line suggested next
checkup timing based on how much moved this run. This file is also how the next run knows when it
last checked in - keep it, don't overwrite an old one.

Tell the user the same thing in chat, shorter: what changed, what you did, what's still open.

## Edge cases

- **No active campaigns.** Say so, write a short summary noting nothing was live to check, stop.
- **Everything is below the verdict floor.** That's a valid, complete checkup outcome for a young
  account. Report it as such, don't manufacture findings to fill space.
- **MCP rate limit or error mid-run.** Report what you completed and what you couldn't reach; don't
  fail silently, don't retry in a loop.
- **A finding's evidence looks wrong** (e.g. a field the account doesn't expose). Say what's missing
  and skip that specific check rather than guessing a number.

## What this skill never does

Never activates a paused entity. Never executes more than one proposal without asking again for the
next one. Never calls a Meta-only zero a loss on its own. Never invents a target CPA, a threshold, or
a number not pulled live from the MCP or read from `config.md`. Never edits ad copy, creative, or
targeting - that's `ads-meta-create`'s job, not this one.
