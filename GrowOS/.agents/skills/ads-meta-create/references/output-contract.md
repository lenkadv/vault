# Output contract

## Package

Write one folder per round. Resolve where that folder sits from "Workspace resolution" in
`references/operating-model.md`: `<business>/work/ads/<round-slug>/` inside a GrowOS install,
`ads/rounds/<round-slug>/` standalone.

```text
<round root>/<round-slug>/
  _brief.md
  _research.md
  _concepts.md
  _selection.md
  <ad-code>.md
  _<ad-code>/
    <ad-code>.png or <ad-code>.mp4
  _<ad-code-of-a-carousel>/
    card-01.png
    card-02.png
```

Every rendered file lives inside that ad's own parts folder, `_<ad-code>/`, beside the item file.
Nothing renders as a bare sibling of the item any more: a file that will actually be published has
to sit in a parts folder to be sealable at all (`system/standards/item-model.md`, "Sealed assets").

Underscore-prefixed files and folders are shared context or parts. They carry no `status`, are never
part of a review queue, and must not contain hidden reasoning; record sources, observations,
decisions, and short rationale only. Every reviewable ad item shares `project: <round-slug>`.

**A round built under the old sibling layout** (creative next to the item, no `sealed:` line) gets
resealed into the shape above: move each rendered file into `_<ad-code>/`, repoint `creative:`, and
add the `sealed:` lines. When that can happen depends on where the item sits, because a seal only
ever lands before review:

- **`draft` or `changes`:** reseal it the next time this skill touches the round.
- **`review`:** it comes back through `changes` to `draft` first, on the owner's change request in
  the review queue, and reseals there.
- **`approved` or `published`:** it keeps its old shape. The only legal move out of `approved` is
  `published`, and publishing refuses an old-shape item, so shipping that ad sealed means a fresh
  item taken through review from the start.

## `_research.md`

A short provenance note, not a research artifact: what this round drew on, and how old each source
was on the day it was used. The exact shape lives in `references/operating-model.md` under "Drawing
from the brain".

## `_brief.md`

```markdown
---
project: <round-slug>
skill: ads-meta-create
offer: <offer slug or temporary>
objective: <conversion objective>
---

# <Round name>

## Readiness
| Component | Rating | Evidence | Action or override |
|---|---|---|---|

## Strategy
- Audience and awareness:
- Recommended method mix:
- User overrides:
- Signal, adjacent, and explore posture:

## Round sizing
- Budget and window:
- Target CPA or ROAS:
- Existing active concepts:
- Finished concepts:

## Placement and production plan
| Ad code | Format | Placement | Method | Lane | Production route |
|---|---|---|---|---|---|

## Test structure
- Suggested budget:
- Evaluation floor:
- Tracking limitations:

## Risks
- ...
```

Never invent an account, campaign, budget, or target. Mark unknowns `[PLACEHOLDER]`.

## Ad item frontmatter

Human-owned fields only. If the workspace has its own item system with a stamping mechanism, leave
its fields (an id, a creation date, a channel) for that system to set; this skill never invents
them and never edits `status` after handoff. In a workspace without such a system, these fields
simply stay absent; the ad code and filename carry identity instead.

```yaml
---
type: image-ad          # image-ad | carousel-ad | video-ad
status: review
project: <round-slug>
ad_code: <unique code>
format: image            # image | carousel | video
template: ""              # library id for a template build, else blank
build: ai-image            # template | custom-html | ai-image | video-script
persona: <persona or audience segment, named from the workspace's own audience file>
awareness: problem-aware
angle:
  - <angle family>
method:
  - <method from strategy-methods.md>
motivation: relief        # same concept as dna-log.md's "emotion" column and strategy-methods.md's "emotional job"
hook: "<opening line>"
hook_device: lived-moment
world: "<2-4 word visual world>"
lane: explore              # signal | adjacent | explore
primary_text: |
  <final reviewed copy>
ad_headline: "<headline>"
link_description: "<optional, images only>"
link: "<verified destination>"
cta: LEARN_MORE
proof_used:
  - <proof id, or omit>
creative: "_<ad-code>/<ad-code>.png"   # the parts path; omit on a video-script until recorded
sealed:
  - _<ad-code>/<ad-code>.png sha256:<64-character hash>
asset_status: finished          # finished | record-ready
compliance: pass                # pass | pass-with-note | needs-specialist-review | fail
note: ""
# meta_ad_id: <id>              # never set here; ads-meta-publish stamps it at publish time
headline: "<queue title>"
skill: ads-meta-create
source: "<offer or brief slug>"
---
```

### The `sealed:` lines

`sealed:` is what makes the owner's approval cover the actual bytes, and it is written at handoff,
while the item is still at `draft`, before it moves to `review`. One line per file that will really
be published, in the format `system/standards/item-model.md` defines under "Sealed assets": the
POSIX path relative to the item's own folder, then the SHA-256 of the exact bytes.

```yaml
sealed:
  - _<ad-code>/<ad-code>.png sha256:<64-character hash>
```

A carousel gets one line per card, in card order:

```yaml
sealed:
  - _<ad-code>/card-01.png sha256:<64-character hash>
  - _<ad-code>/card-02.png sha256:<64-character hash>
```

Get each hash with `shasum -a 256 <file>` (`sha256sum` on Linux) and use exactly what it prints. A
record-ready video script gets no `sealed:` line at all, because no file exists to ship yet. A parts
file with no sealed line is never published, and nobody edits a sealed line to make a check pass: if
the file legitimately changed, the item goes back through review so the owner approves the new
bytes.

Valid `type` and `format` pairs:

| Type | Format |
|---|---|
| `image-ad` | `image` |
| `carousel-ad` | `carousel` |
| `video-ad` | `video` |

Use the CTA enum the connected publishing path actually expects; do not guess if it differs from
the platform default.

## Unique ad codes

Derive a short prefix from `brain/ads/config.md`'s `ad_code_prefix` when set, otherwise from the
offer slug. Format: `<PREFIX>-<FORMAT>-<MMDD>-<NN>`. FORMAT is exactly one of these three tokens,
never a variant spelling:

| Format | Token |
|---|---|
| image | `IMG` |
| carousel | `CRSL` |
| video, finished or record-ready | `VID` |

Before writing any code, search both the round tree and `brain/ads/dna-log.md` for a collision and
start `NN` above whatever is already used that day. Ad codes are unique forever; never reuse or
reassign one, even for a killed or replaced ad.

## Asset body

After the frontmatter, write the ad in a review-friendly shape:

```markdown
# <Ad code>: <short concept name>

## Ad

<final primary text>

**Headline:** <headline>

**Description:** <description>

**CTA:** <cta>

![<ad code>](_<ad-code>/<ad-code>.png)

## Creative intent
- Buyer moment:
- Why this should stop the scroll:
- Reason to believe:
- Placement notes:

## Production and provenance
- Source assets:
- Generated or materially edited:
- Proof and claim sources:
- Final-pixel QA:

## Test hypothesis
If <buyer state>, then <creative idea> should improve <leading or business signal> because
<specific reason>. Judge the business result only after the verdict floor in
`references/memory-schema.md` is cleared.
```

Keep the creative-intent section concise. It supports review and later learning; it is not a
strategy essay.

## Carousel items

Cards render as `_<ad-code>/card-01.png`, `card-02.png`, and so on, in swipe order. Set `creative`
to the first card (`_<ad-code>/card-01.png`) and list every card in the body, in order, each
embedded. **Seal every card, not just the one `creative` points at**, one `sealed:` line per file.
Record the sequence's single promise and the job of each card.

## Video items

**Finished video:** `asset_status: finished`, `creative` set to `_<ad-code>/<ad-code>.mp4`, one
`sealed:` line for that file, representative frames embedded when useful, plus a transcript and
captions.

**Record-ready script (no footage yet):** `asset_status: record-ready`, omit `creative` and
`sealed:` entirely, and include three hook variants, the final script, framing and delivery notes, a
shot plan, b-roll ideas, captions, on-screen text, edit beats, and every claim's source. Call it a
record-ready package in the body text, never a finished video. When footage lands later, the file
goes into `_<ad-code>/` and the item is sealed at `draft`, under the same status rules as the
old-shape reseal above: at `draft` or `changes` it seals in place, at `review` it comes back through
`changes` first, and once `approved` it gets a fresh item instead.

## Nothing produced is discarded silently

Culling happens before production, in `references/concepting.md`. Once a concept is actually
rendered into a finished (or record-ready) asset, it goes into the round for review. If a rendered
asset still fails the final-pixel gate after the fix loop in `references/creative-system.md`, say so
in the handoff report by ad code and reason rather than quietly dropping the file.
