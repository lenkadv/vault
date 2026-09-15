---
name: ads-meta-compliance
description: 'Check Facebook/Instagram ad copy AND the rendered creative against Meta advertising policy before an ad ships. Runs automatically inside ads-meta-create (before production and again on the rendered image or video) and as the final backstop inside ads-meta-publish, right before anything writes to Meta. Also works standalone: paste ad copy, point at a creative file, or hand over a work item, and say "check fb compliance", "is this ad compliant", "meta policy check", "will meta approve this", "check this creative", or "check the ad image". Use whenever copy or a rendered ad needs a policy read before it reaches a human reviewer or the Meta API.'
user-invocable: true
---

# Ads Meta Compliance

Two required halves, both mandatory: **copy** (policy taxonomy, claim discipline) and **creative**
(the actual pixels). Neither half substitutes for the other. A clean script can still render into a
rejected ad the moment a template bakes in a star rating or a badge. Meta's reviewers, and its
automated classifiers, look at the finished image and the sampled video frames, not the brief that
produced them. If you only read one reference before running this, read `references/creative-check.md`.

Work in one business folder only. If more than one business folder exists and it is not obvious
which one, ask before touching anything. Resolve the install mode and the business folder using the
shared Workspace resolution section in `../ads-meta-create/references/operating-model.md` before
reading anything else; every `brain/` path below follows that decision.

Read the references when the matching step begins:

- `references/meta-policy.md`: the rulebook. All 65 rules across ten sections (A-J), each with its
  own tier, `Test:` condition, and Fails/Passes examples. This is the single source of policy truth;
  nothing else in this skill restates it, only routes into it.
- `references/copy-policy.md`: the router. Decides which of the rulebook's sections apply to this ad,
  reads them in full, and applies them, plus the claim ledger, the fix-suggestion tables, and the
  tier-to-result mapping the rulebook itself doesn't carry.
- `references/creative-check.md`: the two-layer pixel check (pre-render scan, mandatory post-render
  vision pass), video frame sampling, the severity table, including the rulebook's pixel-only rules
  (safe zone, strobing, pinched-fat imagery, fake interface elements, nudity, Meta brand misuse in
  the render).

`references/copy-policy.md` checks five sections of the rulebook on every ad, no matter the topic:
personal attributes, health and body, deception and claims, prohibited content, and Meta brand rules -
plus five rules that live inside Section G but don't depend on the landing page either (business and
component relevance, circumventing systems, grammar and symbol abuse, disruptive video tactics,
branded content tagging). It loads the remaining sections only when they apply: restricted verticals,
special ad categories, and lead ads load when the ad's own topic, category, or format trips one of
their `Test:` lines; the rest of Section G (the landing page, post-click quality, and domain rules)
loads when the page was read this session or is on file; best-practice notes are read every time but
can only add a note, never fail the ad. A single ad can pass through this whole check up to
three times (the pre-production copy gate, the post-render creative gate, and the publish backstop);
reading only the sections a given ad actually needs, instead of all ten every time, is what keeps that
affordable.

## Bar: normal, not maximum-safe

Real, attributed testimonials are legal. Real prices, real guarantees, real screenshots are legal.
What gets blocked is a specific *shape*: simulated trust signals, claims about the viewer's private
state, and outcomes presented as a guarantee instead of a result. Flattening every ad "to be safe"
produces copy that clears review and converts nothing, which is its own failure mode. When genuinely
in doubt, revise toward the specific problem instead of stripping everything with an edge.

## When this runs

1. **Inside `ads-meta-create`, pre-production.** Before anything renders, run the copy check
   (`references/copy-policy.md`) against the hook, primary text, headline, and any on-image copy
   planned for the template. This is cheap and catches most problems before a render is wasted. If a
   template or AI-image prompt is going to be reused, run the Layer 1 source scan too.
2. **Inside `ads-meta-create`, on the rendered creative.** Every image and every video that reaches
   `status: review` gets the mandatory Layer 2 vision pass: look at the actual PNG, or the sampled
   frames for video. This is not optional and it is not satisfied by having checked the copy.
3. **Inside `ads-meta-publish`, as a backstop.** Immediately before any write to Meta, re-run both
   halves against the exact approved copy and the exact approved creative file. This catches drift
   (an item edited after its last compliance pass) and covers any ad that reached approval through a
   path that skipped this skill.
4. **Standalone.** The user pastes copy, points at an image or video file, or names a work item.
   Run whatever halves apply to what was actually handed over. Copy-only input gets the copy check
   only, and the report says so plainly rather than implying a creative pass that never happened.

## Business rules on top of Meta's policy

Once the workspace is resolved, check for the business's own ad rules, which bind **on top of**
Meta's baseline (a supplement business might ban health-adjacent language Meta would technically allow
with a disclaimer, for example): `<business>/brain/compliance.md` in a GrowOS install, or
`brain/compliance.md` (else `ads-brain/compliance.md`) in standalone mode - the same conditional
`operating-model.md`'s Workspace resolution table uses for this row. If a business rule and Meta's
policy conflict, the stricter one wins. Neither `brain/compliance.md` nor `ads-brain/compliance.md`
found at the path that applies: check against Meta's policy only, and say so in the
report rather than inventing business rules.

For proof and testimonials, check `brain/proof/` for entries marked approved. A quote with no
matching approved entry is not usable as an attributed testimonial, regardless of how compliant its
wording is. That's a sourcing problem `references/copy-policy.md`'s claim ledger exists to catch.

## Result enum

Every check resolves to exactly one of these. Don't invent a fifth state.

| Result | Meaning |
|---|---|
| `pass` | Checked against current applicable policy and any business rules. Clean. |
| `pass-with-note` | Allowed, but a disclosed judgment call or limitation travels with it (record the note). |
| `needs-specialist-review` | Touches a regulated or genuinely uncertain area, or a rulebook rule the draft can't verify (see `references/meta-policy.md` §§ E-F and `references/copy-policy.md` § How routing works). Never report this as compliant: it means a human needs to make the call, not that the AI made a conservative one. |
| `fail` | A known policy violation, an unsupported claim, or a Layer 2 pixel violation. Blocks the ad. |

## What happens per result

- **`pass` / `pass-with-note`**: the ad proceeds. Carry the note forward if there is one; it should
  still be visible to whoever approves the ad.
- **`needs-specialist-review`**: do not let the ad continue as if it were clean. Surface exactly
  what's uncertain and why, and stop for a human call before treating it as ready.
- **`fail`**: the ad does not proceed. A copy failure loops back to copy (rewrite using
  `references/copy-policy.md`'s replacement tables, then re-check). A creative failure loops back to
  the **template or the render**, not the copy: rewording a caption never fixes a star rating baked
  into the image. Re-check after every fix. Cap at 3 revision passes; past that, discard the concept
  and say why rather than forcing a fourth rewrite.

This skill reports results; it does not invent or edit a work item's frontmatter. If you're checking
an item that already has a compliance field, follow that item's own convention for recording the
verdict. That schema belongs to whichever skill produced the item (`ads-meta-create` /
`ads-meta-publish`), not to this one.

## Process

1. **Scan the copy** against every section of `references/copy-policy.md`. Flag every issue, not
   just the first one found.
2. **Check the creative**: both layers of `references/creative-check.md`. A Layer 1 grep triages
   what to look at; only Layer 2 (actually looking at the rendered pixels) can close the check.
3. **Cross-check the claim ledger.** Every factual or outcome claim needs a source (real docs,
   an approved `brain/proof/` entry, verified business data, or a current official source). No
   source: use `[PLACEHOLDER]`, weaken the claim, or drop the concept.
4. **Assign the result** from the enum above, with a one-line reason.
5. **If `fail` or `needs-specialist-review`**, propose the fix: for copy, a compliant rewrite; for
   creative, what to strip or re-render. For `fail`, re-run this whole process on the revision.
6. **Report.**

## Report format

```
## Meta Compliance Check

**Checked:** copy [yes/no] · creative [Layer 1: run/n-a · Layer 2: run/NOT RUN]
**Creative inspected:** <exact file path of the PNG/MP4 you looked at, or "none, copy only">
**Result:** pass / pass-with-note / needs-specialist-review / fail

### Issues (if any)
- [exact text or visual element] | [policy/business rule violated] | [suggested fix]

### Note (if pass-with-note or needs-specialist-review)
[what's disclosed, and why it doesn't block]
```

If Layer 2 didn't run on a creative that exists, the result cannot be `pass` or `pass-with-note`.
Record `needs-specialist-review`, the existing value for a human needing to make the call, and say
plainly that the creative is unchecked, not compliant.
