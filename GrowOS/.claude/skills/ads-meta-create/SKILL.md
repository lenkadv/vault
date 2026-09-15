---
name: ads-meta-create
description: 'Turn an offer into a budget-sized round of finished, review-ready Meta ad creative for Facebook, Instagram, and Reels. Trigger for "new ad round", "meta ads", "facebook ads", "instagram ads", "make ads", "ad creative", "diverse ad round", "creative testing", "stale ad replacement", or any request for ads that convert. On a workspace it has not seen before, this skill also onboards it from the brain: detects what the business already knows and interviews for what is genuinely missing before the first round. Connecting Meta and putting API keys in place is a one-time setup walkthrough in references/pack-setup.md, not part of a round. Do not use this for publishing approved ads (ads-meta-publish), reporting-only or learning-only runs (ads-meta-report), compliance-only audits (ads-meta-compliance), competitor research on its own (ads-meta-research), account health checkups (ads-meta-doctor), organic social content, or Google Ads.'
user-invocable: true
compatibility: Reads and writes local files, uses kie.ai for AI imagery and headless Chrome for HTML-template rendering when those keys are configured, and calls the Meta Ads MCP only when the owner asks to seed memory from account history. Every capability degrades gracefully when absent.
---

# Ads Meta Create

The job is not to produce plausible copy. It is to find the best route from an offer to ads that
can earn real conversion data, then hand over finished work for human review. Nothing here
publishes or activates anything; a separate skill ships approved ads to Meta, paused.

Work in one business folder only. If more than one business folder exists and it is not obvious
which one, ask before touching anything. `references/operating-model.md`'s "Workspace resolution"
section is the shared source for that decision and for every path below it.

First time this runs in a workspace, or when the owner asks about setup, connections, or what the
Meta Ads Pack skills do: `references/pack-setup.md` has the full walkthrough (Meta Ads MCP
connection, the API keys the owner puts in `.env`, ffmpeg/Chrome, the brand kit, and how the seven
skills fit together).

Read a reference only when its phase starts:

- `references/operating-model.md`: workspace resolution, intake, onboarding, readiness, sizing
- `references/strategy-methods.md`: method selection and portfolio architecture
- `references/concepting.md`: over-generate, then cull to a diverse round
- `references/creative-system.md`: copy discipline, production routes, final-pixel gate
- `references/memory-schema.md`: the `brain/ads/` files, the brand kit, verdict floor, seeding
- `references/output-contract.md`: round folder, parts folders and seals, item frontmatter, ad codes
- `references/archetypes.md` (if present): named idea-generation lenses; see concepting.md

## Operating principles

1. **Conversion is a system outcome.** Diagnose the offer, message, creative, landing page,
   tracking, delivery, and budget before blaming the ad.
2. **Finished work beats strategy theatre.** Once intake is sufficient, build the round. The user
   reviews finished ads, not a concept deck.
3. **Diversify ideas, not decorations.** A color, crop, CTA, or first-line swap is an iteration. A
   distinct ad changes the buyer's motivation, the narrative, or the visual world.
4. **Taste is evidence, not law.** Learn from review decisions and results without treating a
   subjective call as a deterministic score. Protect room to explore.
5. **Inspect final pixels.** A strong concept still fails if the rendered face, hand, text,
   interface, or crop is wrong. Never approve from a prompt or a script.
6. **Never fabricate.** Claims, customers, results, quotes, and stories need a traceable source.
   Use `[PLACEHOLDER]` or change the concept when proof is missing.
7. **Never synthesize a real person's likeness who is not the business's own founder or team
   member speaking as themselves.** No exceptions, no matter how minor the edit.
8. **Never publish or activate.** This skill produces review items only.

## Phase 0: compact intake

Ask only what changes the output, using the host's structured question tool when available
(otherwise one plain question at a time). Recommend a default and state the tradeoff in one
sentence, then proceed. There is no strategy checkpoint before building.

1. **Offer:** documented offer, a brief, or a supplied URL and notes.
2. **Production:** recommend `Hybrid` (library first, freestyle when the library would flatten the
   idea). Allow `Library only` or `Freestyle`.
3. **Method:** recommend `Skill chooses` from `references/strategy-methods.md`, or take a forced
   method.
4. **Scale:** infer a funded round size from spend, target CPA, and test window per
   `references/operating-model.md`. Ask only when neither can be found.

**There is no research-depth question.** The round runs on what the brain and the banked research
already hold, because that is the fast path: a session spent building finished ads beats a session
spent re-reading the internet for facts this workspace already wrote down. Exactly two things change
that, and nothing else does: a standing `research_mode: deep` in `brain/ads/config.md`, or the owner
asking for a deep round in this conversation. Either one turns on the deep path in Phase 4.

## Phase 1: discover and onboard the workspace

Follow `references/operating-model.md`. Resolve the mode and the one business folder; detect an
existing brain; interview for what is genuinely missing (never invent a fact; mark it
`[PLACEHOLDER]` instead). The readiness gate that closes onboarding is Phase 3 below, so this phase
hands straight on. This runs in full the first time a workspace uses this skill and abbreviates
automatically once the brain and `brain/ads/` memory already exist.

Onboarding does not test the Meta connection and does not offer to seed memory from account
history. Connection setup and its one verification step live in `references/pack-setup.md`, which
the owner runs once, outside a round. Seeding from account history happens only when the owner asks
for it in so many words, and keeps the evidence-type rules in `references/memory-schema.md`.

## Phase 2: learn from history

Read prior round items, their final status and feedback, plus any performance data, keeping Truth,
Craft, Taste, and Market evidence distinct (`references/memory-schema.md`). Approval does not
prove performance; performance does not excuse a false claim or a direct rejection.

## Phase 3: readiness gate

Rate the offer, message-to-page continuity, measurement, account and delivery setup, and test
capacity `green`, `amber`, or `red` with evidence, per `references/operating-model.md`. The
continuity rating is read from the live landing page, and that read is the one external read a
default round makes; if the owner declines it or there is no page yet, rate against the page copy on
file in the brain and name that source in the readiness table. A red result asks once whether to fix
it or proceed with the risk recorded in `_brief.md`, then continues either way.

## Phase 4: draw from the brain

Read `brain/ads/angles.md`, `brain/ads/voc.md`, and the brain files this round needs, per "Drawing
from the brain" in `references/operating-model.md`. This is a read, not a research pass. When
something there is missing or stale, say so in one sentence, offer `ads-meta-research` for a
stronger next round, and carry on with what is on file. Write `_research.md` as a short provenance
note (what this round drew on, and how old each source was), not a research trail.

**Deep mode**, when `brain/ads/config.md` sets `research_mode: deep` or the owner asked for a deep
round: run the `ads-meta-research` skill first, then build on the refreshed bank using the deep path
in `references/concepting.md`.

## Phase 5: choose the strategy

Select two or three complementary methods from `references/strategy-methods.md`'s recommendation
matrix. Size the round from `references/operating-model.md`; on a first round for an offer, use the
low end of the recommended bracket.

## Phase 6: generate and cull the portfolio

Over-generate roughly twice the funded size using the five stances in `references/concepting.md`,
then cull through the two passes in the same file: similarity and beat cooldown first, taste gate
and quota selection second. A deep round restores the wider pool and the four-stage cull. The final
set must be meaningfully diverse: no two ads may share persona, motivation, promise shape,
narrative, and visual world. This internal cull is not shown to the user; what gets produced is.

## Phase 7: write and gate

For every surviving concept, write the copy in `references/creative-system.md`'s order, then run
the `ads-meta-compliance` skill on the copy, on-image text, and claims before anything renders. Loop
fixes back through compliance until the item passes or is replaced.

## Phase 8: produce

Render each gated concept on its chosen route from `references/creative-system.md`: an HTML
template from the shared ad library, a freestyle HTML layout, a kie.ai AI image at one of the two
poles, a carousel, or a record-ready video script when the user must be on camera.

Two rules hold on every route. **Render into the ad's own parts folder**, `_<ad-code>/`, beside
where the item file will sit (`_<ad-code>/<ad-code>.png` or `.mp4`; a carousel writes
`card-01.png`, `card-02.png`, and so on). Never render as a bare sibling of the item: a file has to
live in a parts folder to be sealable at all. And **when `brain/ads/brand-kit/` exists, overlay it
on the stock library template** at render time, taking colors and fonts from the kit's token
override and the logo or avatar from its image assets. The shared library stays stock; the branded
pixels live with the ad.

## Phase 9: final inspection

Open every finished asset at full size and mobile thumbnail. Run the final-pixel gate in
`references/creative-system.md`, then run `ads-meta-compliance` again on the rendered pixels. Copy
compliance does not catch what a template or a generated image bakes in. Fix and re-render up to
three times; kill or replace anything still failing. Inspect the finished round side by side for
repeated beats before handoff. All of this happens before anything is sealed, so a fix here is just
another render into the same parts folder; the hash gets taken once, at handoff, from the file that
survives.

## Phase 10: handoff

Follow `references/output-contract.md` exactly: one round folder, `_brief.md`, `_research.md`,
`_concepts.md`, `_selection.md`, one item per finished ad, and that ad's rendered files inside its
own `_<ad-code>/` parts folder.

**Seal every file that will ship, before the item moves to `review`,** so the owner's approval
covers those exact bytes:

```yaml
sealed:
  - _<ad-code>/<ad-code>.png sha256:<64-character hash>
```

Get each hash with `shasum -a 256 <file>` (`sha256sum` on Linux) and use exactly what it prints. One
line per file that really ships: a carousel gets one per card, a record-ready script gets none,
because there is no file yet. This is `system/standards/item-model.md`'s "Sealed assets" rule, seal
before review, never after. Any regeneration of an asset recomputes its hash and rewrites the sealed
line in the same breath, so a stale hash never survives a re-render.

**The trap to watch for:** if a render succeeds only after the item already reached `review` (a
redo, a retried key, a late fix), do not seal it into an item that is already past `draft`. Take the
item back the legal way (`review` to `changes` to `draft`) so the reseal happens before the owner's
next approval, the same as any other post-review change. Sealing into an item at `review` is never
legal, no matter how good the excuse.

Append a `pending` row per ad to `brain/ads/dna-log.md`. Report the round path, counts by format and
lane, risks carried forward, and the review queue to open. With no review queue installed: present
the round and wait for the owner's explicit yes per ad; a yes means set `status: approved` on the
sealed item, nothing else changes status. Do not ask for another approval checkpoint.

## Phase 11: close the loop

The next run's Phase 2 reconciles this round's outcome automatically. Facts (verdicts, taste
observations) write themselves with evidence; strategy changes (retiring an angle, banning a
pattern, changing scale) are proposed in chat and applied only on an explicit yes.
