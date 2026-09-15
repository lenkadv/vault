# Copy policy router

Read by `../SKILL.md` § Process step 1. This file no longer carries the policy taxonomy itself; that
moved to `references/meta-policy.md`, the restored 65-rule rulebook, so there is exactly one place to
update when Meta changes a rule. What stays here: the routing logic that decides which of the
rulebook's ten sections apply to a given ad, and the parts of the old copy-policy.md that are process
rather than policy, the claim ledger, the fix-suggestion tables, and the tier-to-result mapping. Those
map to no rulebook rule, so they survive the rulebook's return instead of being replaced by it.

Contents: How routing works · Claim ledger · Personal attributes: the fix-suggestion companion ·
Prohibited-language tables · Before/after checklist · Proof, people, and IP · Result mapping.

---

## How routing works

`references/meta-policy.md` splits into sections that are universal (checked on every ad, no matter
the topic) and sections that are conditional (loaded only when their own rule titles or `Test:` lines
trigger on the ad's topic, category, or format). Knowing which is which is what keeps a per-ad check
affordable instead of reading all ten sections every time.

`references/meta-policy.md`'s own "How to use this rulebook" step 1 says to run every rule in
sections A-I against the ad and the brief. That step predates this router, and this router
supersedes it: the schedule below is the one to follow. Full coverage still happens, it just isn't
delivered by re-reading all nine sections on every ad - the universal sections, the sections this
ad's own triggers load, and the open-ended catch-all, taken together, are what stand in for "every
rule."

Five sections are universal: read them in full, every time, no matter what the ad is about.

| Section | Covers |
|---|---|
| A - Personal attributes and privacy | protected-attribute mechanics, the highest-frequency trap |
| B - Health, weight, body image | cure claims, before/after, wearables, 18+ targeting |
| C - Deception, claims, urgency, ad quality | truth, income claims, engagement bait, fake scarcity |
| D - Prohibited content categories | tobacco, drugs, weapons, nudity, the outright-banned roll-up |
| H - Mentioning Facebook, Instagram, and Meta | brand references in ad text |

Also universal, alongside those five sections: five rules that live inside Section G but don't
depend on the landing page at all, so nothing gates them. M51 (the ad must represent the business,
and every component must be relevant), M55 (no grammar, punctuation, or symbol abuse), M57 (no
disruptive video tactics), and M58 (branded content must be tagged) are `reject-risk`; M54 (no
circumventing systems or inauthentic assets) is `account-risk`. Check all five every time, the same
as the five sections above. The rest of Section G stays gated on landing-page information; see below.

Three more sections are conditional: they load only when they are triggered. Do the cheap part
first: scan the conditional sections' rule titles and `Test:` lines in `references/meta-policy.md`
against the ad's topic, category, and format. A match means open that section and read every rule in
it before applying anything from it. No match means skip it: do not guess at a rule you never opened,
and do not invent a finding from a section title alone.

| Section | Triggers on |
|---|---|
| E - Restricted categories needing authorization | alcohol, gambling or gaming, financial or insurance products, loans, cryptocurrency, dating services, prescription or OTC drugs, cannabis or CBD, addiction treatment |
| F - Special ad categories | housing, employment, financial products and services, social issues, elections, or politics |
| I - Lead ads | an instant-form ad, or copy that asks for a reply, comment, or DM containing personal or financial details |

These trigger lists are illustrative, not the actual test. `references/meta-policy.md`'s own `Test:`
lines are the real trigger, and they stay current even when this file goes stale between rulebook
refreshes.

**The open-ended catch-all.** The "no match" rule above covers the three enumerated sections only:
nothing in E, F, or I's own `Test:` lines fired for this ad. It is not a general clearance.
`references/meta-policy.md` is Meta's own ad-policy taxonomy, not a general regulatory map, and it
doesn't cover every regulated vertical that exists. Legal services is the clearest recurring case.
Children's products and services are another. An offer touching one of those, or any other regulated
category the rulebook's ten sections don't name, falls through to `needs-specialist-review`, never to
a pass. Say plainly which category triggered it and that no rulebook section covers it, instead of
treating an empty trigger scan as clearance.

The rest of `references/meta-policy.md` § G (M50, M52, M53 - the landing page, post-click quality,
and domain rules) triggers differently: by information, not by topic. Load it when the landing page
was read this session, or a description of it is on file. Neither: say plainly that the destination
was not checked, per `../SKILL.md`'s report format, instead of silently skipping those three rules.
M51, M54, M55, M57, and M58 are already covered above and never wait on the landing page.

Section J (best practice) is read every time but can only add a note. Nothing in it can produce a
`fail`; see § Result mapping below.

A single ad can pass through this whole check up to three times: the pre-production copy gate, the
post-render creative gate, and the publish backstop. Reading only what a given ad actually needs,
instead of all ten sections every time, is what keeps that affordable.

## Claim ledger

For every factual or outcome claim in the copy, record:

| Claim | Source | Exact or paraphrased | Permission | Risk | Decision |
|---|---|---|---|---|---|

A source is canonical product documentation, an approved `brain/proof/` entry, a verified business
number, or a current official source. A competitor's ad, an AI-generated screenshot, and a plausible
customer name are not sources. If the source is missing: use `[PLACEHOLDER]`, weaken the claim to
something you can support, or pick a different angle. Do not quietly drop the ledger step because the
claim "sounds fine": the ledger is what catches a fine-sounding claim nobody can actually back up.
This is what `references/meta-policy.md` § C's deception rules, and the outcome rules inside E and F,
actually get checked against. A clean-sounding claim with no ledger entry is still a `fail`.

## Personal attributes: the fix-suggestion companion

`references/meta-policy.md` § A states the rule: the protected-attribute mechanic, the grammar-move
table, the safe harbours. This is the companion for the moment after a `fail`, how to actually rewrite
a hook that trips it, because knowing the rule and knowing how to write around it are two different
skills.

**Why third person is the fix, not just a workaround.** Recognition-driven hooks work by making the
reader feel seen, and "feeling seen" is exactly what Section A restricts the moment it touches a
protected or sensitive attribute. The fix is real, not a loophole: recognize the reader by role,
behavior, or situation, through a specific third-person character or a category statement. The reader
projects onto the character, and nothing gets asserted about the reader directly.

| Risky (asserts about the viewer) | Safe (character, category, or situation) |
|---|---|
| "You're wasting money on marketing that doesn't work" | "Jordan burned three months on marketing that went nowhere" |
| "You don't have a team for this" | "The team she could never justify hiring" |
| "You're overwhelmed and behind on everything" | "One person can't be five people every day" |
| "Are you a struggling small business owner?" | "Two shops opened on the same block last spring..." |

Where "you" stays fine regardless: the CTA ("see how it works," "put yours to the test": action or
benefit, no attribute attached), conditional or category frames ("if someone's running their own
books solo..."), and any line where "your" points at a positive outcome ("done by morning, in your
voice"), never a lack.

**Beyond the protected-attribute list.** Section A's mechanic is specific: a protected attribute plus
`you`. The broader house bar is not: don't shame, humiliate, threaten, or exploit insecurity even
where no protected attribute is in play. Problem-aware copy can name a real frustration without
telling the viewer they're defective, failing, unattractive, poor, sick, or unsafe. "This is a common
problem" is fine. "You have this problem because you're [X]" is not, protected attribute or not.

## Prohibited-language tables

Concrete wrong-to-right swaps for the patterns that come up most in a first draft. None of these are
quoted from `references/meta-policy.md` directly; they are the practical fix layer, what to write
instead, once a section above has already said why the original failed. Treat them as a living
reference, not a locked list: the specific words drift with platform enforcement over time, the
underlying category of harm does not.

### Personal-attribute callouts (concrete swaps)

❌ Direct questions about appearance, financial status, relationship status, age, intelligence,
disability, or belief ("Are you broke?", "Still single?", "Over 40?"); implied inadequacy ("fix
yourself," "you're doing it wrong")

✅ Category statements, "many people face...", "if you're looking for...", solution-first framing, or
better, the third-person mechanism above

> "Tired of being broke?" becomes "Ready to improve your financial situation?", which is functional
> but still pushes toward "you." Stronger: "Most people hit a point where the budget stops working"
> (category, no "you" at all).

### Violence and aggressive language

Scope: a command or threat aimed at a target, a person, a group, a competitor, not the bare word.
Self-referential idiom (a customer saying they've killed every plant they've owned) is not a hit on
its own: check it against `references/meta-policy.md`'s own rules before flagging it, the same "quote
the exact offending span or there is no finding" discipline the rulebook states for every section.

❌ kill, destroy, attack, crush, annihilate, demolish, obliterate

✅ eliminate, remove, overcome, solve, fix, address, tackle, resolve

> "Kill your competition" becomes "outperform your competition." "Crush your goals" becomes "hit
> your goals."

### Health and medical claims

❌ cure, heal, treat, diagnose, prevent disease, prescription, "FDA-approved" (unless actually true),
specific disease treatments, weight-loss guarantees, mental-health treatment claims, "detox"/"cleanse"

✅ support, help, may contribute to, designed to assist, a wellness approach

> "Cure your back pain" becomes "help support back health." Always pair a health-adjacent claim with
> a disclaimer: "Individual results may vary. Consult a physician before starting any new program."

### Get-rich-quick and financial claims

❌ get rich, easy money, guaranteed income, make money fast, "risk-free investment", passive income
without qualification

✅ potential to increase income, designed to help you earn, an income opportunity + disclaimer

> "Make $10k this month" becomes "learn strategies that have helped clients grow revenue" plus a
> results disclaimer: "Results not typical. Individual results may vary."

### Absolute and exaggerated claims

❌ 100% guaranteed, always works, never fails, foolproof, instant, miracle, revolutionary, "the
only", "everyone", "works for all"

✅ designed to, built to, typically, often, consistently, many users find

> "Always get results" becomes "consistently designed to help you get results." "Instant success"
> becomes "fast results for many users."

### Engagement bait

❌ "Share if you agree", "tag a friend who needs this", "comment YES to learn more", "like if you...",
vote-manipulation emoji rows, fake urgency ("watch before this is taken down")

✅ Organic calls to action focused on value: "learn more at [link]", "see how it works", or remove the
engagement request entirely

## Before/after checklist

`references/meta-policy.md` § B's safe harbours allow before-and-after transformation depictions for
18+ audiences; M13 and M16 set the limits on how. This is the practical checklist for applying them
to a specific draft, whether the transformation is weight, body, income, or lifestyle:

- Truthful, typical framing, not the single best result presented as the norm.
- Full context: timeframe, and what following the program actually involved.
- A disclaimer: "Results not typical. Individual results may vary."
- No dramatic body-transformation imagery without the above (see `creative-check.md`'s before/after
  row for the rendered version of this same check).
- No income screenshots without context and a disclaimer.

Flag anything that shows a transformation without a timeframe, without a disclaimer, or that implies
the result is typical when it isn't.

## Proof, people, and IP

Sourcing and consent discipline the rulebook doesn't carry, because it isn't a Meta policy statement,
it's this business's own bar for using real people and real assets.

**Proof and people.** Quotes are exact or clearly marked paraphrases, attributed, approved, and used
with permission. Check `brain/proof/` for an approved entry before treating any quote as usable.
Customer names, faces, voices, and private details need consent on file. Never synthesize a real
person's likeness. A fictional person can never be presented as a real customer or testimonial.
Founder first-person copy must be literally true of the founder. `references/meta-policy.md` M23
covers the narrower case of a public figure's likeness used as bait; this is the broader, everyday
version of the same discipline.

**IP and identity.** Use licensed or owned photos, footage, music, fonts, logos, and product
captures. Generated likenesses of a real, non-founder person require explicit authorization; see
`creative-check.md` for the pixel side of this rule. Don't hide or evade an AI disclosure the ad
actually needs, not only the political-ad case M47 makes mandatory.

Platform logos and Meta brand references in copy are `references/meta-policy.md` § H's job, universal
on every ad; see § How routing works above rather than looking for them here.

## Result mapping

`references/meta-policy.md` uses three tiers; `../SKILL.md` § Result enum uses four results. This is
the one place that maps between them, so nothing downstream has to guess:

| Rulebook tier or finding | Result |
|---|---|
| `reject-risk` or `account-risk` hit, confirmed against the rule's own `Test:` line | `fail` |
| `best-practice` hit (Section J, or M56's safe-zone note) | `pass-with-note`, never `fail` |
| Rulebook marks it `CANNOT VERIFY`, an E/F category whose authorization status isn't stated, or a regulated category none of the rulebook's sections name (the open-ended catch-all above) | `needs-specialist-review` |
| A disclosed, low-stakes judgment call with a clear compliant read | `pass-with-note`, with the note stating exactly what was judged and why |
| Clean against every universal section (the five sections above plus M51/M54/M55/M57/M58 from Section G), the rest of Section G when loaded, and every conditional section the ad actually triggered | `pass` |

A hit on the claim ledger with no source, or a before/after violation without disclosure, is `fail`
by the same rule the rulebook itself states: quote the exact offending span, or there is no finding.
A swap-table hit is not automatically the same: it gets rewritten or justified against the
rulebook's own rules, and the rulebook decides pass or fail, not the swap table by itself. Rewrite
using the fix-suggestion tables above, then re-check.
