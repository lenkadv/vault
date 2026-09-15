# Memory schema

What this skill remembers across rounds, where it lives, and how it earns the right to change.
Covers: evidence types, the six `brain/ads/` files, the brand kit, the verdict floor,
reconciliation, pattern promotion, and history seeding.

Location: resolve it once from "Workspace resolution" in `references/operating-model.md`.
`<business>/brain/ads/` inside a GrowOS install; standalone uses that same `brain/ads/` when the
workspace already has a `brain/` folder of its own, else `./ads-brain/`. Every file below lives at
that root, one level deep: `config.md`, `dna-log.md`, and so on. `offer.md` becomes one file per
offer when a workspace sells more than one thing: `offers/<slug>.md`. This file writes the paths as
`brain/ads/...` for readability; read that prefix as `ads-brain/` only in standalone mode with no
`brain/` folder of its own.

Other pack skills read and write these same files: `ads-meta-research` maintains `angles.md`;
`ads-meta-doctor` and `ads-meta-report` write market rows and verdicts into `dna-log.md`. This
skill is not the only writer, but it is the one that documents the shape.

## Four kinds of evidence, kept distinct

- **Truth**: a false claim, a wrong identity, a missing consent, a policy problem, or an audience
  mismatch.
- **Craft**: clarity, composition, text size, realism, artifacts, hook strength, native fit.
- **Taste**: the reviewer approved, rejected, changed, or grew tired of a creative choice.
- **Market**: spend, purchases, revenue, CPA, ROAS, CTR, hold rate, frequency, fatigue signals.

Approval does not prove performance. Market performance does not excuse a false claim or override a
direct reviewer rejection. When two kinds of evidence disagree, record both and keep the
contradiction visible; do not silently resolve it in favor of whichever is more convenient.

## `config.md`

Non-secret operating values this skill reads instead of asking every time. Secrets (API keys) live
only in the business's private `.env`, which the owner writes themselves; this file never holds one
and never needs to, since a key is only ever referred to by its name.

```yaml
---
name: ads-config
description: Non-secret account and operating defaults for ads-meta-* skills
updated: YYYY-MM-DD
---

ad_account_id: ""          # Meta ad account id, once connected
page_id: ""
pixel_or_dataset_id: ""
currency: ""
target_cpa: ""              # cost-per-acquisition target
target_cpl: ""               # cost-per-lead target, when the account optimizes for leads
target_roas: ""              # ROAS target; derivable as price / target_cpa when unset
conversion_event: ""         # the optimization event this account is bid on; default to a purchase-type event if unset
daily_budget: ""
landing_page_url: ""
business_language: ""       # ad copy is written in this language; skill text stays English
ad_code_prefix: ""          # short prefix for ad codes; falls back to the offer slug if unset
research_mode: standard        # standard (default, brain-only) | deep (research first, wider pool)
history_pull_window_days: 90   # depth of the account-history seed, when the owner asks for one
beat_cooldown_days: 60         # window for the beat-cooldown rule in concepting.md
never_shipped_floor_pct: 60    # quota floor in concepting.md, editable per workspace
```

`research_mode` is the one standing override for how a round gathers its inputs. Unset or
`standard` means brain-only: the round builds from this memory and the brain, and says one sentence
when something is stale. `deep` means every round runs `ads-meta-research` first and then uses the
wider pool and the four-stage cull in `references/concepting.md`. The owner can also ask for a deep
round in the moment without changing this value; that ask covers that one round only. Nothing else
switches the mode, and the skill never sets `deep` on its own.

## `offer.md` (one per offer)

```yaml
---
offer: <slug>
price: ""
anchor: ""            # optional reference price, if any
lp: ""                 # landing page URL
type: ""               # subscription, one-time, service, etc.
status: active
updated: YYYY-MM-DD
---

## Facts (canonical)
What it is, the one-line mechanism, price and terms, what is included. Source-tag every fact;
mark anything unconfirmed [PLACEHOLDER].

## Who buys
The persona map for this offer, however many personas this business actually has, named from its
own audience file. No default count, no default names. Disqualifiers and targeting exclusions.
Per-persona visual or format believability notes (would this persona plausibly be shown this
surface).

## Mechanism language
Locked naming and positioning rules: what may and may not be claimed about how the product works,
and any sensitive-positioning notes (for example, don't imply a prior product was replaced).

## Proof pool
| id | person | claim it supports | photo? | note |
|---|---|---|---|---|
Governed entirely by the workspace's own proof and consent system. This schema never overrides
that system's approval state.

## Claims that won / claims that died
A running ledger tying specific claims to real performance evidence.

## Angle territories
Numbered list. Each entry: a `status` of `untried`, `testing`, `proven`, or `burned` (same enum as
`angles.md`, since one is the fallback for the other), and a beat-cooldowns sub-list, specific world
+ scene + hook combinations retired even though the territory itself stays open.

## Compliance sensitivities
Offer-specific claim risks (results claims, timeframe rules, scarcity, fabrication risk) that
supplement, never replace, `ads-meta-compliance`'s general gate.

## Funnel
Destination, structure (direct-to-checkout, lead-gen, test-then-scale), any front-end or back-end
offer.
```

## `dna-log.md`

One row per ad ever produced, newest first.

```
ad_code | date | offer | project | format | build | template | persona | awareness | angle |
method | hook_device | emotion | world | verdict | note
```

- `format`: image | video | carousel
- `build`: template | custom-html | ai-image | video-script | unknown
- `template`: the library id when `build = template`, else `-`
- `awareness`: unaware | problem | solution | product | most (`?` if uncertain)
- `world`: 2-4 words, the visual scene, surface, or composition. Drives the never-shipped and
  world-repeat checks in `references/concepting.md`.
- `verdict`: won | lost | insufficient | rejected | changes | pending | unknown
- `note`: 8 words or fewer

Ownership: the learning step (Phase 2, next run) appends new market and taste facts and updates
`verdict` and `note`; the create phase only reads existing rows and appends fresh `pending` rows for
its own new round. It never edits an existing row. Key uniqueness: `ad_code` should be globally
unique forever, but treat `project + ad_code` as the real composite key (matching the item's own
`project: <round-slug>` frontmatter field, see `references/output-contract.md`) so the schema
tolerates a legacy collision without corrupting the join.

## `taste-profile.md`

```yaml
---
name: ads-taste-profile
description: Evidence-backed judging document for ads-meta-create's cull
updated: YYYY-MM-DD
---

## Hard rules
Pass/fail, each with a one-line evidence citation (source and date). A new workspace ships with the
universal integrity rules pre-populated: never synthesize a non-founder likeness; never fabricate
proof or metrics; AI imagery only at the two poles from references/creative-system.md; documented
proof only, with consent. Everything else starts empty.

## Approves
Named patterns, each with evidence (ad codes, dates, or a decision source).

## Rejects
Same shape as Approves. This section is also where a rolling "avoid this phrase or shape" list
lives, seeded from actual review feedback rather than guessed in advance.

## Format preferences
A short "reaches for" list and an "avoids" list, kept current.

## Sensitivities
Nuanced, contextual rules that are not clean pass/fail: brand-positioning edge cases, category
sensitivities, and the like.

## Update protocol
Fixed text, does not change per workspace:
- Facts append automatically with evidence attached.
- A pattern promotes from a dated `### Learned YYYY-MM-DD` entry into Approves or Rejects only once
  it has 3 or more confirming examples.
- Contradictions stay attached to the entry; never silently merged away.
- Existing patterns are never deleted or rewritten except by a human reviewer.
```

## `voc.md`

```yaml
---
name: ads-voc
description: Verbatim buyer language, anonymized, feeding hooks and copy
sources-allowed: <what may be mined, e.g. reviews, support transcripts, call notes>
updated: YYYY-MM-DD
---

## Trigger events
## Past-tense "I" statements
## Objections and skepticism
## Identity phrases
## Language patterns
## Pending sources
```

Entry format: `- "phrase" | src: <type> | tags: t1, t2 | found: YYYY-MM-DD`. Anonymize hard: no
names, handles, or locating detail. A phrase here can spark a hook; it can never be presented in an
ad as if a real customer said it. Using a real customer's actual words as an attributed ad quote
still requires going back through the proof and consent system in `offer.md`. Past-tense "I"
statements are the highest-value entries; they read as something the buyer has already thought.

## `angles.md`

Maintained primarily by `ads-meta-research`; this skill reads it during Phase 4 and Phase 6 and may
add a territory note when a round surfaces one worth tracking. Holds the angle bank: named angle
territories, the evidence behind each, and their current status. When this file does not exist yet,
fall back to `offer.md`'s own Angle territories section.

## `brand-kit/`

A folder, not a file: `brain/ads/brand-kit/` (standalone: `ads-brain/brand-kit/`). It is this
business's own look for ads, and it is the only place that look is ever written.

**What it holds.**

```text
brain/ads/brand-kit/
  tokens.css        # a token override file: brand colors, accent tints, fonts
  logo.svg          # or .png; the business's real logo
  avatar.png        # the founder or brand avatar the templates ask for
  README.md         # one short note per asset: what it is and where it came from
```

**Who creates it.** The rebrand conversation in `references/pack-setup.md`, once, on the owner's
ask. Not a round, not a background step.

**What sources it.** Facts already on file in `brain/brand.md` (colors, fonts, logo, how the brand
looks), plus whatever the owner supplies in that conversation for a fact the brain does not have
yet. Never a guessed color, and never another business's look.

**How production uses it.** Render overlays the kit on top of the stock library template and writes
the result into that ad's `_<ad-code>/` parts folder: the stock template stays the stock template,
the kit supplies the tokens and images, and the finished pixels live with the ad. The shared ad
library is never edited to hold a business's brand. Inside a GrowOS install
(`system/creative-library/ads/`) it is machinery a guard protects and an update replaces, so an edit
there is either refused outright or reverted at the next update, and every business on the install
would have inherited it in the meantime. Standalone (the pack's `library/`), the same rule holds for
the simpler reason that the next pack refresh puts the stock files back.

No kit yet is a normal state: production falls back to the stock template's own neutral tokens and
says so plainly rather than inventing a brand.

## `styles/`

A folder, not a file: `brain/ads/styles/` (standalone: `ads-brain/styles/`). Holds this business's
own pending AI-image style records, one file per style: the business-local counterpart to the shared
library's `styles/` catalog.

**What it holds.** One markdown file per proposed style: the prompt recipe, the example generated for
the ad that first needed it, and a short note on why the workspace's existing approved styles didn't
already cover the concept.

**Who creates it.** `ads-meta-create`'s AI-image route, the moment a concept needs a style outside
whatever the workspace already has approved (`references/creative-system.md`, "New-style proposal").

**How it's used.** A pending style is fine for the one ad that prompted it; it never self-promotes
into default use. It only enters this business's approved rotation once a human reviews the result
and says so. The shared library's own `styles/` catalog is never the destination, the same
never-edited rule as `brand-kit/` above.

## Verdict floor

An ad earns a business verdict only above a floor, to stop noise from freezing into "truth":

- spend of roughly 2 to 3 target-CPA units, or
- at least 14 days of delivery with real opportunity to convert

`../ads-meta-doctor/references/operating-system.md` is the authoritative source for this floor (it
also gates doctor's kill/scale judgment and ads-meta-report's verdicts, including a learning-phase
exemption); the formula above is a summary for this file's own context, not a second definition.

Above the floor: verified conversions at or better than target may support `won`; verified zero or
uneconomic conversions may support `lost`; contradictory or incomplete attribution stays
`insufficient`. Below the floor, every row stays `pending` or `insufficient` no matter how it looks
early. Never mark an ad `lost` from platform-reported zero conversions alone when attribution is
known to be incomplete; never mark it `won` from click-through rate alone.

## Reconciliation (Phase 2, every run)

Diff the latest available performance data and any finalized round items against `dna-log.md`,
matched by the `project + ad_code` composite key, never by `ad_code` alone; a naive join breaks the
moment two rounds ever reuse a code. Never overwrite a human's prior decision to make a pattern look
cleaner; append a new observation instead and let the pattern-promotion ladder below do the work.

## Pattern promotion

- One silent decision stays an example: weak evidence on its own.
- Explicit reviewer feedback becomes a rule for that specific issue immediately.
- Three or more aligned examples may become a pattern candidate for `taste-profile.md`.
- Contradictory evidence stays attached to the pattern; it is never quietly dropped.
- A direct "this is overused" decision retires the beat immediately for new production (see the
  beat-cooldown rule in `references/concepting.md`); changing a beat's status on an already-live ad
  remains a separate, human strategy decision.

## Facts vs. strategy

Facts write themselves: a verdict, a taste observation, a market row. Strategy changes are always
proposed in chat and applied only on an explicit yes, never silent, even when the evidence looks
strong:

- retiring or reopening an angle territory's `status`
- adding a beat to permanent cooldown versus a temporary one
- promoting a pending style or template to approved
- graduating a concept from test to a larger campaign
- flagging a shipped ad as approaching fatigue

## Creative fatigue

Treat fatigue as a pattern across time, not a fixed frequency number: rising frequency with falling
CTR or conversion, CPA deterioration across comparable windows, falling hold rate on a previously
strong video, repeated reviewer boredom with the same hook or scene, or an ad older than this
account's normal winner lifespan. When retiring a fatigued ad, keep the underlying desire if it
still converts, but refresh the hook, carrier, narrative, and world rather than recoloring the same
creative.

## History seeding (on an explicit ask only)

Not part of onboarding and never offered on its own. It runs when the owner asks for it in so many
words ("seed from my account history"), and only if the Meta connection works and the account has
usable history.

**What it pulls.** List active ad accounts, then list existing campaigns, ad sets, and ads with
their available creative and insights (for example `ads_get_ad_accounts`, `ads_get_ad_entities`,
`ads_get_creatives`) over the window in `config.md`'s `history_pull_window_days` (default 90 days).

**What it writes.** For each existing ad with enough spend or delivery to clear the verdict floor
above, append a `dna-log.md` row: real creative details where they can be read from the ad (format,
persona if inferable, a best-guess `world` description), and a verdict from the insights data. This
is market evidence, not taste evidence; a live ad the business happened to run is not the same
thing as a reviewer's approve or reject decision, so seeding never writes rows into
`taste-profile.md`'s Approves or Rejects sections. Ads below the verdict floor, or with creative
details too thin to describe, get skipped rather than force-fit into the schema.

**What it never does.** It never invents a `world`, `persona`, or `angle_family` it cannot actually
read from the pulled data; an uncertain field stays `?` or `unknown` rather than guessed. It never
seeds another business's aesthetic or taste into this workspace.

**When to say no.** A brand-new ad account, or one with too little history to seed anything real,
gets a plain statement that the seed found nothing worth writing, never a padded or invented history
to make the workspace look more mature than it is.
