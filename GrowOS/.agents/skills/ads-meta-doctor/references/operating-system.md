# Operating system - the decision rules

Purpose: the thresholds and reasoning `ads-meta-doctor` uses to turn raw Meta numbers into a
finding, and the thresholds `ads-meta-report` uses to write verdicts. One file, one set of rules,
so a checkup and a weekly report never disagree about what "bad" means.

Every number below is a **heuristic default**, expressed relative to the account's own target CPA
(or target ROAS) from `config.md` - never an absolute dollar figure. Edit this file directly if your
account behaves differently; nothing here is a hard law of Meta's ad system, it's a starting prior
that gets more accurate the longer you run this skill on a real account.

**Read this before believing any negative finding.** The whole point of a gate-then-judge structure
is that a bad number, seen too early or in isolation, produces a false kill - and a false kill is
the expensive mistake, not the cautious one. Pausing a real winner because Meta hadn't reported the
sale yet, or because it was still mid-learning-phase, throws away money and machine-learned delivery
data that took real spend to earn. A false "keep" costs a few more days of a mediocre ad. A false
"kill" costs the winner. Every rule below is written to fail toward keep, not toward cut.

---

## 1. The verdict floor - the gate before ANY judgment

Before this skill calls anything a winner, a loser, fatigued, or worth touching, the ad (or ad set)
must clear the floor. Below the floor, the only honest label is **insufficient** - still warming up,
not yet judgeable, no action proposed.

**Floor = spend of roughly 2 to 3x target CPA, OR 14+ days of delivery with real opportunity to
convert (not paused, not starved of budget) - whichever comes first.**

Why this specific shape: a handful of impressions and one lucky or unlucky conversion is noise, not
a verdict. Both a spend floor and a time floor exist because either one alone breaks: a high-budget
account can blow past 2-3x target CPA in hours (spend floor caught it), while a low-budget account
might take weeks to spend that much even on a real winner (time floor catches it instead).

**Learning-phase caveat.** A newly created or recently edited ad set is still calibrating delivery -
Meta's own learning phase. Delivery looks erratic on purpose during this window: spend concentrates
unevenly, CPA spikes, frequency looks strange. None of that is a bleed, fatigue, or pacing signal;
it's the system finding its footing. If your MCP exposes a learning-stage field, use it directly and
treat `LEARNING` / `LEARNING_LIMITED` as floor-exempt regardless of spend or days elapsed. If it
doesn't expose one, approximate it: an ad set edited (budget, targeting, or a swapped ad) within the
last 3-4 days, or an ad set that hasn't yet logged roughly 50 optimization events, is probably still
learning. Exempt it from judgment either way - re-check next run.

---

## 2. Kill decisions are multi-factor, and the bias is toward keep

Never call a kill from one metric alone - not spend, not frequency, not a Meta-reported zero. Weigh
all four inputs together, and remember Meta under-reports conversions at the ad level more often
than it over-reports them, so a "zero" from Meta alone is evidence, not proof.

1. **Gap vs target.** Express CPA or ROAS as a percentage away from target. Roughly:
   - within ~35% of target (either direction): keep / check zone, not a kill signal on its own.
   - 35-75% worse than target, floor cleared: a real concern, corroborate with the other three
     inputs before proposing anything.
   - 75%+ worse than target, floor cleared, sustained (not a single bad day): strong signal, but
     still not sufficient alone - see the corroboration rule below.
2. **Spend level.** Is the spend behind this number material relative to the account's daily budget,
   or is it a rounding error? A loser that consumed 40% of the week's budget is a different problem
   than one that consumed 2%.
3. **Frequency as a possible prospecting signal, not an automatic red flag.** Rising frequency can
   mean genuine creative fatigue - or it can mean the algorithm found a smaller pocket of a broad
   audience and is intentionally serving it repeatedly because it converts. Frequency on its own
   proves neither. Use it to corroborate a CTR/CPA trend (see §4), never as a standalone kill trigger.
4. **Overall account/portfolio health.** Pull the account's opportunity score and check what else is
   carrying volume. Killing the only ad delivering meaningful spend is a different decision than
   retiring a redundant loser inside a portfolio with three other proven concepts already covering
   the budget. A thin portfolio raises the bar for pausing anything.

**Corroboration rule:** propose a pause only when the floor is cleared AND at least two of the four
inputs above point the same direction. One red flag alone is a **watch** or **verify** proposal -
never a **pause** proposal. This is the mechanical form of the keep-bias: it takes convergent
evidence to recommend cutting something, and a single number is never convergent evidence.

**Meta-only zeros are a CHECK signal, never an automatic kill - full stop.** If the account has no
independent revenue truth (Stripe, CRM, a call log) connected, the most a Meta-zero can ever produce
is a proposal to *verify*, worded as a question the user needs to answer themselves ("do you have
any record of a sale from this ad outside Meta?"), never a proposal to *pause* on that evidence
alone. If the user confirms independently that zero is real, that confirmation - not Meta's number -
is what clears the pause proposal.

---

## 3. Scaling moves in bounded steps

**Budget changes: 15-20% per step, one step, then watch before the next one.**

Why not just fix what's broken in one move: Meta's delivery system treats a large enough budget or
bid change as a signal to re-calibrate, which can partially reset the very learning phase that
produced the CPA you're trying to protect or improve. A 15-20% step is large enough to matter and
small enough to stay under that re-calibration threshold in most accounts. Two or three small steps
that compound get you to the same place as one big jump, without repeatedly restarting delivery.

**Watch window between steps:** at least 3 days, or until the next checkup, whichever is longer.
Never queue a second budget step on the same ad set before the first one has had time to show up in
the numbers.

This applies in both directions - scaling a winner up and stepping a struggling ad's budget down are
the same mechanical move with the sign flipped. Always show the actual new budget number (not just
the percentage) before executing, so the user is approving a real number, not an abstraction.

---

## 4. Fatigue - definition and response ladder

**Definition:** a pattern across time, not a single frequency reading. Look for two or more of:

- rising frequency paired with falling CTR or falling conversion rate, across at least two
  comparable windows (this week vs last week, not today vs yesterday)
- CPA deteriorating across those same comparable windows
- a video's hold/view-through rate falling from a previously strong level
- an ad meaningfully older than this account's own typical winner lifespan (a pattern you'll only
  know after a few checkups - until then, treat "still winning past 3-4 weeks with no refresh
  queued" as a soft flag worth a mention, not a finding)

A single high frequency number with flat or improving CTR is not fatigue - see §2.3. It might just be
a small, well-targeted audience the algorithm is happily re-serving.

**Response ladder - escalate only as evidence accumulates:**

1. **Watch.** One window shows the pattern. Note it, propose nothing yet.
2. **Flag for refresh.** Confirmed across two comparable windows. Propose queuing a creative
   refresh - new hook, new opening scene, new format - while the ad keeps running. Fatigue is a
   production problem before it's a budget problem.
3. **Step down or pause.** Sustained fatigue, no refresh in the pipeline, and CPA has crossed from
   "worse than target" into genuinely uneconomic (see §2 gap bands) with the floor cleared. Only at
   this stage does a budget-down or pause proposal belong on the table - and it still needs the §2
   corroboration rule satisfied.

---

## 5. Pacing bands

Express every band as a percentage of the ad set's configured daily budget, not a dollar amount.

- **Underpacing:** daily spend under roughly 50% of the configured daily budget for 3+ consecutive
  days. This is a delivery problem, not a bleed or fatigue problem - the likely causes are an
  audience too narrow, a bid or cost cap too tight, or creative that isn't competitive enough to win
  auctions. Propose investigating the constraint, not pausing the ad.
- **Normal:** roughly 50-125% of daily budget on any given day. Meta's own dynamic daily budgeting
  allows real day-to-day swings (commonly up to ~25% over budget on a strong day, evened out across
  the week) - a single high day inside this band is not a signal.
- **Overpacing:** sustained spend above roughly 125% of daily budget across most of the week, not
  just one day. Before flagging this as a problem, check the account activity log for a manual
  budget edit the user made themselves (which explains it) or a duplicate/overlapping campaign
  competing for the same audience. Only propose a fix once those are ruled out.

---

## 6. Delivery flags

Anything that blocks or throttles delivery outright, surfaced separately from performance judgment
because it needs fixing regardless of CPA:

- hard delivery blockers (payment issue, disapproved ad, policy restriction) - surface immediately,
  these don't wait for a checkup cadence
- an ad set stuck with zero or near-zero delivery despite an active status and adequate budget -
  usually an audience or bid-cap problem, not a creative problem
- an anomaly signal (sudden spend, CTR, or CPA spike/drop) - treat as "something changed, go look,"
  not as a verdict; anomaly detection is observational, never causal on its own

---

## Summary - the order of operations

1. Is it past the verdict floor? If not: **insufficient**, no action, move on.
2. Any hard delivery flags? Surface those regardless of everything else below.
3. Compute the gap vs target, the spend level, the frequency trend, and account health.
4. Do at least two of those four converge on a problem? If not: **watch**, not a proposal.
5. If they converge: is it a pacing issue, a fatigue pattern, or a genuine economic miss? Route to
   the matching response ladder (§3 scaling, §4 fatigue, §5 pacing).
6. Every proposal that reaches the user shows its evidence: the numbers, the window they came from,
   and which rule above triggered it. No proposal without a citation back to this file.
