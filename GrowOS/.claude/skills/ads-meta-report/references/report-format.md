# Report format

Two things live here: the exact `input.json` shape the engine (`scripts/report_math.py`) expects,
and the exact Markdown template for the report it produces. Follow both precisely -- the whole
point of the split is that the report reads identically every week.

## The input JSON

Write this to a temp file and pass it as `--input`. Field-by-field:

```json
{
  "run_date": "2026-08-06",
  "currency": "USD",
  "target_roas": 2.0,
  "target_cpa": 225,
  "history_path": "work/reports/_ads-meta-report-history.jsonl",
  "campaigns": [
    {"id": "123", "name": "Main", "windows": {
      "7d":       {"spend": 1400, "platform_roas": 1.8, "purchases": 5, "ctr": 1.2, "freq": 2.1},
      "prior7d":  {"spend": 1200, "platform_roas": 1.6, "purchases": 4, "ctr": 1.1, "freq": 1.9},
      "30d":      {"spend": 5600, "platform_roas": 1.7, "purchases": 20, "ctr": 1.15, "freq": 2.4},
      "prior30d": {"spend": 5000, "platform_roas": 1.5, "purchases": 16, "ctr": 1.05, "freq": 2.0}
    }}
  ],
  "concepts_ge_5pct": 3,
  "signal": {"emq": {"Purchase": 6.1, "InitiateCheckout": 8.0}},
  "revenue": {
    "7d_actual": 3400,
    "7d_meta_attributed": 2600,
    "30d_actual": null,
    "30d_meta_attributed": null
  },
  "featured_ads": [
    {"code": "WW-IMG-0721-01", "ad_id": "a1", "spend": 400, "purchases": 2, "ctr": 1.4,
     "roas": 2.1, "cta": "Shop now", "title": "...", "body": "...", "image_url": "https://..."}
  ]
}
```

Notes:
- `history_path` -- resolve it yourself before writing this file (Step 0 of SKILL.md decides
  `work/reports/` vs `ads/reports/`). Omit it entirely to skip history (not recommended).
- `target_roas` / `target_cpa` -- `null` is valid and expected on a first-ever run before the user
  has set an economic target; the engine reports `insufficient`/`NOT ENOUGH DATA` rather than
  guessing.
- `revenue.30d_actual` / `30d_meta_attributed` -- leave `null` unless the user explicitly gives you
  a 30-day figure. The engine rolls this up itself from `history_path` once at least 3 prior weekly
  rows exist inside the trailing 30 days; fewer than that and it correctly reports "not enough
  history yet" rather than dividing partial revenue by a full month of spend.
- `featured_ads` -- pass every ad with 30d spend > 0, unsorted and untagged. The engine picks the
  top 3 winners (>=1 sale) and top 3 losers (0 sales) by spend and tags them itself.
- `signal` -- omit entirely (not `null` with empty `emq`) if no pixel/dataset is configured. An
  empty `emq` dict is treated as "healthy," which would be wrong for an account with no signal at
  all.

## The Markdown report

Frontmatter (no `status` -- this is a read artifact, not a review-queue item):

```yaml
---
type: report
report: ads-meta-report
period: "<7d since>..<7d until>"
generated: <run_date>
---
```

Body, built from the engine's JSON output (copy its numbers, never recompute):

````markdown
# Meta Ads -- Weekly Report -- <run_date>

Scope: active campaigns only, through <anchor> (last full day). Sources: Meta + your entered revenue.

## TL;DR

**<verdict_label>** -- <tldr line from the engine>

Top actions this week:
- <action 1 title>
- <action 2 title>
- <action 3 title>

## Headline metrics (7d / 30d)

| Metric | 7d | 30d |
|---|---|---|
| Ad spend | <7d spend> | <30d spend> |
| Meta's own ROAS (platform-reported) | <7d platform_roas>x | <30d platform_roas>x |
| True ROAS proxy (Meta-attributed revenue / spend) | <7d true_roas or "not entered">x | <30d true_roas or "not enough history yet">x |
| MER (total revenue / spend) | <7d mer>x | <30d mer or "not enough history yet">x |
| Verdict band | <7d true_roas_band / mer_band> | <30d bands> |

If `target_roas` was `null`, add one line under the table: *"No target ROAS set yet -- ask once
and offer to save it to `config.md`."*

## Why True ROAS and MER are both here

One paragraph, adapted to this account's numbers: Meta's own platform ROAS can run high (it
credits view-through and multi-touch activity generously) or low (its pixel misses conversions from
ad blockers, iOS privacy limits, and multi-device buyers) -- so it is shown, but never trusted
alone. **True ROAS proxy** is the entered Meta-attributed revenue over spend -- the closest
estimate of what the ads themselves drove. **MER** is total revenue over spend -- everything, ad-
driven or not, which is why it usually reads higher and is the honest floor number when the split
is unknown.

## Do this week

The `actions` list as a checklist. For each `workitem` kind, paste its `prompt` in a fenced block
right under it:

```markdown
- [ ] <action title>
  <if workitem: fenced prompt block>
- [ ] <action title>
```

## Winners & losers

A table of the featured ads: code, tag (champion/proven/verify/watch), statline. Embed the creative
image only if you have the full signed URL; otherwise the statline carries it.

| Ad | Tag | Statline |
|---|---|---|

## Signal health

EMQ per event (below 7 means trust entered revenue over Meta's own numbers), and a one-line note if
`signal` was omitted entirely ("no pixel configured -- platform ROAS above is directional only").

## Trend

One line per week of history available (from `history_path`, most recent first, cap at 6 rows):
date, verdict, spend, True ROAS, MER. If this is the first-ever run, say so plainly instead of
showing an empty table: *"First report on this account -- trends will show once a few weeks have
run."*
````
