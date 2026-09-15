---
name: ads-meta-report
description: 'Generate the weekly Meta ads report: pull live Meta insights (7d and 30d, campaign and ad level), ask for the week actual revenue in about 30 seconds, compute a True ROAS proxy and MER against your own target economics, call a verdict, list winners and losers, and hand over a copy-paste action list. Ends by closing the loop: writes what happened into your ad memory (brain/ads/dna-log.md verdicts, brain/ads/taste-profile.md taste entries) and proposes any strategy shifts for your yes. Use whenever the user says "weekly ads report", "ads report", "how are the ads doing", "meta ads report", "run the ads report", "ads learn", "close the ad loop", "what did we learn from the ads", or wants a real checkup on Meta ad performance, not just platform numbers. This is the only skill that asks for revenue and writes ad verdicts into memory -- ads-meta-doctor diagnoses delivery, fatigue and pacing and proposes account changes but never touches revenue or memory; ads-meta-create drafts new ads and never reports on old ones.'
user-invocable: true
---

# Ads Meta Report

Answers one question fast: are the ads making money, and what do you do this week? Meta's own
dashboard cannot answer that alone -- its pixel misses conversions (ad blockers, iOS privacy
limits, multi-device journeys) and its own ROAS number can also overclaim credit for sales that
would have happened anyway. The fix is not a smarter pixel, it is asking you the one number Meta
cannot fabricate: what actually landed in your bank account this week.

**The split that keeps every run identical:** you do the live MCP pulls and the revenue question,
then hand one JSON file to `scripts/report_math.py`. The script does everything deterministic
after that -- window math, the True ROAS vs MER split, verdict bands, winner/loser picks, the
action list, and the 30-day revenue rollup. Never recompute a number by hand; if a number looks
wrong, fix the script, because a hand-edited report is gone next week and hides the real bug.

This skill never changes anything in Ads Manager. It reports, recommends, and remembers.

Work in one business folder only. If more than one business folder exists and it is not obvious
which one, ask before touching anything.

## Step 0 -- find the ads brain

Look for `brain/`. `../ads-meta-create/references/operating-model.md`'s workspace resolution
section is the single source for exactly where that lives: inside a GrowOS install every such path
sits inside the one selected business folder; standalone mode keeps today's current-folder behavior.
If present, ads memory lives in `brain/ads/`; if not, it lives in `./ads-brain/` (create it on first
use). Read `config.md` for
`ad_account_id`, `pixel_or_dataset_id`, `currency`, `target_cpa`, `conversion_event` (the
optimization event this account is bid on -- default to a purchase-type event if unset), and
`target_roas` if it is there. Read `offer.md` for `price` if you need to derive a target: `target_roas = price /
target_cpa` is the ROAS you get by definition when you hit target CPA exactly. If neither
`target_roas` nor enough to derive it exists, ask once in chat and mention you can save it to
`config.md` so future runs stop asking. Without a workspace root (no `work/` tree), the report and
its history file live under `ads/reports/` instead of `work/reports/`.

## Step 1 -- compute the date windows

`run_date` = today, `anchor` = yesterday (last full day). Build four `time_range` windows
(`since`/`until`, YYYY-MM-DD): `7d` (anchor-6..anchor), `prior7d` (anchor-13..anchor-7), `30d`
(anchor-29..anchor), `prior30d` (anchor-59..anchor-30).

## Step 2 -- find active campaigns

`ads_get_ad_entities(level="campaign", date_preset="last_30d", fields=["id","name",
"effective_status","amount_spent"])`, keep only `effective_status == "ACTIVE"`. None active -> stop,
tell the user "no active campaigns this week," still write the run log if this run is scheduled.

## Step 3 -- pull campaign-level insights, four windows

Per active campaign, per window: `ads_get_ad_entities(level="campaign", time_range=<window>,
fields=["amount_spent","purchase_roas","actions:<conversion_event>","ctr","frequency"],
filtering=[{"field":"campaign.id","operator":"EQUAL","value":["<id>"]}])`. Parse `spend` (strip
currency symbols/commas), `platform_roas` (purchase_roas; "Not available" -> 0), `purchases` (the
configured conversion action; missing -> 0), `ctr`, `freq`.

## Step 4 -- pull ad-level insights + creatives (30d window)

`ads_get_ad_entities(level="ad", time_range=<30d>, fields=["id","name","creative_id",
"amount_spent","ctr","purchase_roas","actions:<conversion_event>"], filtering=[{"field":
"ad.campaign_id","operator":"EQUAL","value":["<id>"]}, {"field":"ad.amount_spent","operator":
"GREATER_THAN","value":["0"]}], sort="amount_spent_descending", limit=50)`. For every ad with
spend, get its creative in one batched call: `ads_get_creatives(creative_ids=[...],
fields=["id","body","title","image_url","thumbnail_url","call_to_action_type"])`. Build one
`featured_ads` list -- `code` (ad name), `ad_id`, `spend`, `purchases`, `ctr`, `roas`, `cta`
(humanized), `title`, `body`, `image_url` (full, unmodified -- trimming params breaks the
signature), `is_video` (true, omit `image_url`, when the creative has no image). The script picks
winners and losers from this list; do not pre-filter or pre-sort it yourself.

**Concept count:** group ads by concept key (ad name with any "- Copy" suffix removed). Count
concepts whose summed 30d spend is at least 5% of total active 30d spend -> `concepts_ge_5pct`.

## Step 5 -- signal health (skip gracefully if no pixel configured)

If `pixel_or_dataset_id` is known: `ads_get_dataset_quality(dataset_id=<pixel_or_dataset_id>)` for Event Match Quality
per event. Keep the `composite_score` for whichever events matter to this offer (purchase or lead).
A low EMQ (below 7) is exactly why Meta's own ROAS drifts from reality -- explain that plainly in
the report, do not just show the number.

## Step 6 -- ask for the week's actual revenue (about 30 seconds)

Ask directly in chat, and say why first: *"Meta's own numbers can run high or low depending on
tracking quality, so before I call a verdict, what was your actual revenue for the last 7 days
(<anchor-6> through <anchor>)?"* Then, optionally: *"Do you know how much of that came specifically
from customers who clicked or saw the ad first? Skip this if you do not track it -- I will still
show MER, just not the True ROAS proxy."* That is it. Do not ask for a 30-day figure; the engine
rolls up 30-day revenue from the report history automatically once enough weeks exist, and stays
honest ("not enough history yet") until it does.

## Step 7 -- write input.json and run the engine

Assemble everything above into one JSON (see `references/report-format.md` for the exact shape)
and run:
```bash
python3 scripts/report_math.py --input /tmp/ads-meta-report-input.json
```
It prints one JSON object: `{verdict, tldr, windows, signal, featured, actions, history_row,
history_path}`. It also appends the history row itself. You write the report next -- the engine
never touches Markdown.

## Step 8 -- write the Markdown report

Follow `references/report-format.md` exactly (frontmatter, section order, table shapes). Write to
`work/reports/ads-meta-report-<run_date>.md` (or `ads/reports/...` standalone). Copy the engine's
numbers verbatim; do not recompute or round differently than it did.

## Step 9 -- learn: close the loop

This is the merged learning step -- it runs every time, right after the report, using the same
data you just gathered. Full mechanics (verdict floor, dna-log/taste-profile formats, the
facts-vs-strategy split, boredom-wins) are in `references/learn-and-memory.md`; the short version:

1. **Reconcile** any ad round in `work/ads/*/` or `ads/rounds/*/` against `brain/ads/dna-log.md`
   (or `ads-brain/dna-log.md`), matched by `project` + `ad_code`. This is stateless -- there is no
   cursor file, the diff between what you read and what is logged IS the work.
2. **Write verdicts (fact, automatic).** A queue decision (`rejected`, `changes`) maps straight to
   the log row -- the ad never reached the market, so the review call is the verdict. A market
   verdict (`won`/`lost`) only applies once an ad clears the **verdict floor** defined in
   `../ads-meta-doctor/references/operating-system.md` (roughly 2-3x target CPA spent, or 14+ days
   delivered, with a learning-phase exemption -- read that file, it is the shared authority so a
   checkup and a weekly report never disagree about what counts as proven). Below the floor, or on
   Meta-only zero sales with no revenue confirmation, the verdict stays `insufficient` -- never
   `lost`. If that file is ever missing from the pack, fall back to the formula in
   `references/learn-and-memory.md` -- same principle, without doctor's multi-factor refinement.
3. **Write taste entries (fact, automatic).** For every newly rejected/changed item, read its
   `note` and `feedback` fields and append a dated entry to `taste-profile.md`. Fatigue language
   ("used this too much", "seen this before", "bored of this") triggers an immediate beat cooldown
   -- record it now, do not wait for a pattern to repeat.
4. **Propose strategy shifts (chat, needs a yes).** Up to five items, each with ad_code evidence:
   angle-territory status changes and beat cooldowns in `offer.md`, a winning custom-html ad
   worth promoting into this business's own creative library, never the shared one, a floor-clearing
   test ad worth graduating to the scale campaign, and any winner running 3+ weeks worth refreshing.
   Apply only what the user approves; this skill never touches Meta itself.

## Step 10 -- tell the user, then log

Report the verdict, the TL;DR line, and the report path. Nothing gets sent anywhere; this is a
file-only skill. If this run was scheduled (not manually triggered) and the workspace has a run-log
convention, append one block per that convention; otherwise skip it silently.

## Rules

- **Determinism first.** All math lives in `report_math.py`. A number that looks wrong is a script
  bug, not a report typo to hand-fix.
- **Never call an ad `lost` from Meta-reported zero sales alone.** Meta under-reports; a loser is
  always "verify before cutting," and the verdict floor exists specifically to stop noise from
  freezing into truth.
- **Revenue truth outranks platform numbers,** but platform numbers still get shown, clearly
  labeled as Meta's own claim, so the gap between them is visible instead of hidden.
- **Facts write themselves; strategy waits for a yes.** Verdicts and taste entries are bookkeeping.
  Anything that redirects future spend or production is a proposal, applied only on approval.
- **Thin data gets an honest "not enough yet," never a forced verdict.** A brand-new account with a
  few days of spend should see `insufficient`/`NOT ENOUGH DATA`, not a fabricated red or green.
- **Full signed image URLs only.** Trimming a Meta CDN URL's signature params breaks the image.
