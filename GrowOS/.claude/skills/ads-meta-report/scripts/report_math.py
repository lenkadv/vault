#!/usr/bin/env python3
"""
report_math.py -- deterministic engine for ads-meta-report.

Claude gathers live Meta MCP data plus the user's manually-entered revenue
into one input JSON and calls this script, which owns every number that must
compute identically every run: window aggregation, True ROAS proxy vs MER,
verdict bands, winner/loser picks, the action list, and the 30-day revenue
rollup. Claude renders the Markdown report straight from this JSON, never by
hand. Stdlib only, no network calls, no secrets -- revenue is manual (v1).

Usage: python3 report_math.py --input input.json
Prints one JSON object on stdout. Appends one row to the history JSONL named
in input["history_path"] (created if missing; omit to skip history).
"""
import argparse, datetime, json, os

# Verdict-band multipliers, relative to the workspace's own target_roas.
# Editable heuristics, not universal truths -- see references/report-format.md.
ROAS_GREEN, ROAS_AMBER = 1.15, 0.65
MER_GREEN, MER_AMBER = 1.00, 0.55

PROMPT_TRACKING = """/* paste into a fresh session */
Fix Meta pixel signal quality for this ad account. This week's report flagged Event Match
Quality below 7 on: {emq}.
Tasks: (1) find which match keys are missing or low-coverage per event, (2) propose concrete
Conversions API fixes, (3) re-check after the fix. Research current Meta CAPI / EMQ guidance
yourself first -- do not assume last year's best practice still holds."""

PROMPT_CONCEPTS = """/* paste into a fresh session */
Use ads-meta-create to brief 5-8 NEW distinct ad concepts (not headline swaps on an existing one).
The concept pool is too concentrated -- most spend rides on very few ideas. Pull the offer,
audience, and target CPA from this workspace's own brain/ads files rather than guessing."""


def band(value, target, green, amber):
    if value is None or not target:
        return "unknown"
    if value >= target * green:
        return "green"
    return "amber" if value >= target * amber else "red"


def delta(cur, prior):
    if prior in (0, None) or cur is None:
        return {"dir": "flat", "label": "n/a"}
    d = (cur - prior) / prior * 100.0
    if abs(d) < 3:
        return {"dir": "flat", "label": "0%"}
    return {"dir": "up" if d > 0 else "down", "label": f"{abs(d):.0f}%"}


def agg(campaigns, window):
    rows = [c["windows"][window] for c in campaigns if window in c.get("windows", {})]
    spend = sum(r.get("spend", 0) for r in rows)
    plat_rev = sum(r.get("spend", 0) * r.get("platform_roas", 0) for r in rows)
    ctr = (sum(r.get("ctr", 0) * r.get("spend", 0) for r in rows) / spend) if spend else 0
    return {"spend": spend, "meta_purchases": sum(r.get("purchases", 0) for r in rows),
            "platform_roas": (plat_rev / spend) if spend else None,
            "freq": max((r.get("freq", 0) for r in rows), default=0), "ctr": ctr}


def rollup_30d(history_path, run_date, field):
    """Sum a field across prior weekly rows inside the trailing 30 days -- used
    only when the user did not enter a direct 30d figure this run."""
    if not history_path or not os.path.exists(history_path):
        return None, 0
    anchor = datetime.date.fromisoformat(run_date) - datetime.timedelta(days=1)
    lo = anchor - datetime.timedelta(days=29)
    total, weeks = 0.0, 0
    for line in open(history_path):
        row = json.loads(line) if line.strip() else None
        if not row or row.get("date", run_date) >= run_date:
            continue
        d = datetime.date.fromisoformat(row["date"])
        if lo <= d <= anchor and row.get(field) is not None:
            total, weeks = total + row[field], weeks + 1
    return (total if weeks else None), weeks


def window_metrics(a, revenue_actual, revenue_meta, target_roas):
    spend = a["spend"]
    true_roas = (revenue_meta / spend) if (revenue_meta is not None and spend) else None
    mer = (revenue_actual / spend) if (revenue_actual is not None and spend) else None
    return {**a, "revenue_actual": revenue_actual, "revenue_meta_attributed": revenue_meta,
            "true_roas": true_roas, "true_roas_band": band(true_roas, target_roas, ROAS_GREEN, ROAS_AMBER),
            "mer": mer, "mer_band": band(mer, target_roas, MER_GREEN, MER_AMBER)}


def pick_featured(ads, target_cpa):
    winners = sorted([a for a in ads if a.get("purchases", 0) >= 1], key=lambda a: -a["spend"])[:3]
    losers = sorted([a for a in ads if a.get("purchases", 0) == 0], key=lambda a: -a["spend"])[:3]
    for i, w in enumerate(winners):
        w["tag"] = "champion" if i == 0 else "proven"
        w["statline"] = f"{w['spend']:,.0f} spend - {w.get('roas', 0):.1f}x platform ROAS - {w['purchases']} sale(s)"
    for l in losers:
        l["tag"] = "verify" if (target_cpa and l["spend"] >= target_cpa) else "watch"
        l["statline"] = f"{l['spend']:,.0f} spend - 0 Meta-reported sales - CTR {l.get('ctr', 0):.1f}%"
    return winners, losers


def build_actions(w7, signal, concepts, winners, losers):
    actions = []
    emq = (signal or {}).get("emq") or {}
    if emq and min(emq.values()) < 7:
        actions.append({"title": "Improve pixel signal quality before trusting platform numbers.",
            "why": f"Worst Event Match Quality is {min(emq.values()):.1f} (below 7). Weak signal makes "
                   "Meta's own reporting unreliable in both directions -- fix this before scaling on it.",
            "kind": "workitem", "prompt": PROMPT_TRACKING.format(emq=json.dumps(emq))})
    if w7["true_roas_band"] == "green" and w7["mer_band"] in ("green", "unknown") and w7["freq"] < 3.5:
        actions.append({"title": "Scale active budget one step (about 15-20%), then hold and watch 3 days.",
            "why": "This week clears target with healthy frequency. One step, not a jump.",
            "kind": "trivial", "prompt": None})
    if concepts is not None and concepts < 5:
        actions.append({"title": f"Brief new distinct ad concepts (only about {concepts} carry real spend).",
            "why": "A few concepts absorbing all the spend is a creative-diversity bottleneck, not targeting.",
            "kind": "workitem", "prompt": PROMPT_CONCEPTS})
    if winners:
        actions.append({"title": f"Protect the champion ({winners[0]['code']}) and keep budget on the winning lane.",
            "why": "It is a proven performer this window. Do not disrupt it while testing something else.",
            "kind": "trivial", "prompt": None})
    if losers:
        actions.append({"title": "Verify the zero-sale spenders before cutting anything.",
            "why": "Meta under-reports at the ad level. A 0-sale ad may still have driven a sale the pixel missed.",
            "kind": "trivial", "prompt": None})
    return actions


def validate_history_path(hist):
    """history_path comes straight from the caller's input JSON, not from the
    command line -- the Bash guard never sees it. Validate it here, before it
    is ever opened for read or write, rather than trust the caller."""
    if hist is None:
        return
    if os.path.isabs(hist) or ".." in hist.replace("\\", "/").split("/"):
        raise SystemExit(
            f"history_path must be a relative path inside the business "
            f"folder, with no '..' segment -- refusing {hist!r}")
    if os.path.basename(hist) != "_ads-meta-report-history.jsonl":
        raise SystemExit(
            f"history_path must end in _ads-meta-report-history.jsonl, the "
            f"one file this skill actually writes -- refusing {hist!r}")
    root = os.path.realpath(os.getcwd())
    resolved = os.path.realpath(os.path.join(root, hist))
    if os.path.commonpath([root, resolved]) != root:
        raise SystemExit(
            f"history_path {hist!r} resolves outside the business folder "
            f"-- refusing to read or write it")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--input", required=True)
    inp = json.load(open(ap.parse_args().input))
    run_date, currency = inp["run_date"], inp.get("currency", "USD")
    target_roas, target_cpa, hist = inp.get("target_roas"), inp.get("target_cpa"), inp.get("history_path")
    validate_history_path(hist)
    rev = inp.get("revenue", {})

    a7, ap7 = agg(inp["campaigns"], "7d"), agg(inp["campaigns"], "prior7d")
    a30, ap30 = agg(inp["campaigns"], "30d"), agg(inp["campaigns"], "prior30d")
    rev30_actual, weeks = (rev.get("30d_actual"), None) if rev.get("30d_actual") is not None \
        else rollup_30d(hist, run_date, "revenue_7d_actual")
    rev30_meta, _ = (rev.get("30d_meta_attributed"), None) if rev.get("30d_meta_attributed") is not None \
        else rollup_30d(hist, run_date, "revenue_7d_meta_attributed")
    # A rolled-up 30d figure only means something once it covers most of the
    # window. Fewer than 3 weekly entries is partial revenue against a full
    # 30d spend total -- comparing them would produce a false ROAS/MER, so
    # leave 30d unset (never entered directly) rather than mislead.
    if weeks is not None and weeks < 3:
        rev30_actual = rev30_meta = None

    w7 = window_metrics(a7, rev.get("7d_actual"), rev.get("7d_meta_attributed"), target_roas)
    w30 = window_metrics(a30, rev30_actual, rev30_meta, target_roas)
    w7["delta_spend"], w30["delta_spend"] = delta(a7["spend"], ap7["spend"]), delta(a30["spend"], ap30["spend"])
    w30["history_weeks"] = "entered" if weeks is None else weeks

    winners, losers = pick_featured(inp.get("featured_ads", []), target_cpa)
    concepts = inp.get("concepts_ge_5pct")
    actions = build_actions(w7, inp.get("signal"), concepts, winners, losers)

    if target_roas is None or (w7["true_roas_band"] == "unknown" and w7["mer_band"] == "unknown"):
        verdict = "insufficient"
    elif w7["true_roas_band"] == "red" or w7["mer_band"] == "red":
        verdict = "red"
    elif w7["true_roas_band"] == "green" and w7["mer_band"] in ("green", "unknown"):
        verdict = "green"
    else:
        verdict = "amber"
    vlabel = {"green": "GREEN", "amber": "WATCH", "red": "RED", "insufficient": "NOT ENOUGH DATA"}[verdict]

    roas_txt = f"True ROAS {w7['true_roas']:.2f}x" if w7["true_roas"] is not None else "True ROAS not entered"
    mer_txt = f"MER {w7['mer']:.2f}x" if w7["mer"] is not None else "MER not entered"
    tldr = f"{vlabel} -- spend {a7['spend']:,.0f} {currency}/wk, {roas_txt}, {mer_txt}"

    history_row = {"date": run_date, "verdict": verdict, "spend_7d": round(a7["spend"], 2),
        "revenue_7d_actual": rev.get("7d_actual"), "revenue_7d_meta_attributed": rev.get("7d_meta_attributed"),
        "true_roas_7d": round(w7["true_roas"], 2) if w7["true_roas"] is not None else None,
        "mer_7d": round(w7["mer"], 2) if w7["mer"] is not None else None,
        "meta_purchases_7d": a7["meta_purchases"]}
    if hist:
        os.makedirs(os.path.dirname(hist), exist_ok=True)
        with open(hist, "a") as f:
            f.write(json.dumps(history_row) + "\n")

    print(json.dumps({"run_date": run_date, "verdict": verdict, "verdict_label": vlabel, "tldr": tldr,
        "target_roas": target_roas, "target_cpa": target_cpa, "currency": currency,
        "windows": {"7d": w7, "30d": w30}, "signal": inp.get("signal"),
        "featured": {"winners": winners, "losers": losers}, "concepts_ge_5pct": concepts,
        "actions": actions, "history_row": history_row, "history_path": hist}))


if __name__ == "__main__":
    main()
