# Learn and memory

The mechanics behind SKILL.md Step 9, the final step of this skill: the report tells you what
happened, this turns it into memory so the next round of ads is smarter. Nothing here touches
Meta or Stripe -- it reads the report you just built and the review-queue items in `work/ads/*/`
(or `ads/rounds/*/`), and writes to the shared ads-brain files.

**Core policy, non-negotiable:** facts update automatically, strategy waits for a yes. A verdict or
a taste entry only records what already happened -- the market's numbers, or the user's own queue
decision -- so writing it down is bookkeeping, not a decision. Anything that would redirect future
spend or production (retiring an angle, promoting a template, graduating a test winner) changes the
next round's behavior, so it gets proposed and applied only on approval.

## Stateless reconciliation

There is no cursor file tracking what has already been processed. The diff between what you just
read (the newest report + every ad item's `status`/`note`/`feedback`) and what is already logged in
`dna-log.md` IS the work list, recomputed fresh every run. A separate state file would drift and
quietly lie about what has been processed -- the markdown files are the state.

Match ads by **`project` + `ad_code`** together, never `ad_code` alone. Two different rounds can
reuse the same short code by accident, and a same-code collision across rounds would silently merge
two unrelated ads' history.

For each ad: no row in `dna-log.md` yet -> append one (`world` column: 2-4 words describing the
visual scene/surface/composition, pulled from the item if present, inferred from the creative if
not). A row exists but its `verdict`/`note` is stale versus what you now know -> update those two
cells only. Never touch any other cell, and never delete a row -- a human hand-correction always
wins over what this step would otherwise write.

## dna-log.md schema

`../../ads-meta-create/references/memory-schema.md` is the single source for the `dna-log.md`
column list and the `format`/`build`/`verdict` enums -- read it there rather than here, so a change
to the schema only ever needs one edit. This step's own contribution on top of that shared schema is
the append/update mechanic already covered under "Stateless reconciliation" above.

## The verdict floor

Before a market verdict (`won`/`lost`) gets written, the ad must clear the floor: spend roughly
2-3x the offer's `target_cpa`, OR 14+ days of delivery. Below the floor, the verdict stays
`insufficient` no matter which way the numbers lean -- a handful of impressions calling a "winner"
or "loser" is noise, and a log that freezes noise as truth stops being useful.

**`../ads-meta-doctor/references/operating-system.md` is the authoritative source for this floor**
(it also gates doctor's kill/scale judgment, and includes a learning-phase exemption worth
respecting here too: don't judge an ad still in Meta's learning phase even if it happens to clear
the spend/time floor). Defer to its exact formula and thresholds. The formula above is only a
fallback for the rare case that file is missing from the pack -- same portable principle, without
doctor's multi-factor kill-bias refinement.

Two special cases, both mandatory:
- **A queue decision maps straight to the verdict, no floor needed.** The ad never reached the
  market, so the reviewer's own call IS the verdict: `rejected` -> `rejected`, `changes` ->
  `changes`, `draft`/`review` -> `pending`.
- **Never write `lost` from Meta-reported zero sales alone**, even above the floor, unless the
  report's revenue entry confirms it. Meta under-reports at the ad level; a Meta-only zero stays
  `insufficient` with a note flagging it for a revenue check.

Fatigue is a flag, not a verdict: apply the pattern-based definition in
`../ads-meta-doctor/references/operating-system.md` §4 (two or more of rising frequency with
falling CTR/conversion across comparable windows, deteriorating CPA, a falling video hold rate, or
an ad past this account's typical winner lifespan; a single high frequency reading alone is not
fatigue) and add `fatigue` to the `note` column. It never changes the verdict on its own.

## taste-profile.md schema and the update protocol

Sections, in order: **Hard rules** (pass/fail, each with a one-line evidence citation), **Approves**
(named patterns with evidence), **Rejects** (same shape), **Format preferences** (a short reaches-
for / avoids list), **Sensitivities** (nuanced rules that are not clean pass/fail), **Update
protocol** (fixed text, reproduced below).

For every newly `rejected`/`changed` item this run, parse both `note` and `feedback` (feedback is
richer -- it is the reviewer's own words) and append one line under a fresh `### Learned YYYY-MM-DD`
heading: the inferred pattern, plus ad_code evidence, citing the feedback directly. An approved ad
that matches an existing pattern gets a terse one-line reinforcement, not a new entry. New evidence
that contradicts an existing pattern gets flagged inside the entry -- never silently merged, never
used to overwrite the earlier one.

**Pattern promotion ladder:** one silent decision stays an example. Explicit feedback becomes a rule
for that specific issue. Three or more confirming ad_codes may be promoted into Hard rules /
Approves / Rejects above (append, cite every code, keep the dated entry it came from). This
promotion is still a fact-layer action -- it does not need the user's yes, because it is just
recognizing a pattern in decisions the user already made.

**Boredom-wins.** Any feedback that reads as fatigue ("overused", "too often", "seen this", "not a
big fan anymore") triggers an immediate beat cooldown -- record the retired beat (world + scene +
hook) in the taste-profile entry right away. The user's own boredom outranks any market data saying
the format still performs.

## The five strategy proposals

Each needs ad_code evidence and the user's yes before you write anything:

1. **Angle-territory status** in `offer.md` -- `untried -> proven` on a floor-clearing win, or
   `untried -> burned` on repeated floor-clearing losses or the user rejecting it outright. Include
   any beat cooldown flagged above as part of the same proposal.
2. **Catalog/template promotion** -- a custom-html ad that won is worth turning into a reusable
   template in this business's own creative library, never the shared one. Describe it; build the
   actual template record only on approval.
3. **Graduation** -- a test-campaign winner that clears the floor should move to the scale campaign.
   The user or `ads-meta-publish` executes this; this skill only proposes it.
4. **Fatigue watch** -- a winner running 3+ weeks (or already flagged fatigued) should get a refresh
   lane in the next round.
5. **Discuss (not a change, a flag)** -- when the user approved an ad but the market later lost it
   (or the reverse), keep both facts as written and surface the disagreement as information, never
   resolve it silently by picking one side.

## Guardrails

- Facts append or update a specific cell; they never delete a row or overwrite a human edit.
- If a cell was hand-corrected by the user, respect it and move on -- do not "fix" it back.
- This step never touches Meta or Stripe. Publishing and budget moves belong to `ads-meta-publish`,
  `ads-meta-doctor`, and the user.
- No em-dashes in anything written to the log, taste-profile, or chat.
