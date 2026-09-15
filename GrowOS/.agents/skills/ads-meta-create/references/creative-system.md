# Creative system

## From desire to ad

Build each ad in this order:

1. **Buyer moment**: the situation in which this matters
2. **Dominant desire**: what the buyer wants to feel, gain, protect, or stop doing
3. **Promise**: the change the offer can credibly help create
4. **Reason to believe**: mechanism, proof, demonstration, authority, or specificity
5. **Creative device**: the scene, carrier, structure, or visual act that makes the idea felt
6. **Next step**: the smallest logical action for this awareness stage

Write the on-creative hook before the long copy. If the idea cannot survive as a simple visual and
a short opening line, more copy rarely saves it.

## Argument budget

Give every ad exactly one argument: one thing it is claiming or proving. A round that tries to
explain the whole offer in every ad converges on the same shape, because every ad ends up doing the
same job: the same enumerated feature list, the same "your problem, finally handled" headline
pattern. A round of N ads (N >= 4) should cover at least four different
arguments: a specific outcome, a customer story, a lived pain moment, a contrarian take, the
mechanism, documented authority, a curiosity gap. At most one ad per round should try to explain
how the whole thing works; every other ad sells one outcome, one story, one moment, or one claim.

Before handing off a batch, table every ad by its argument, hook device, and the first few words of
its headline. Any duplicate in any column: rewrite the weaker ad from a different argument.

## Hooks

Write three candidate hooks per ad, each on a different device (pain scene, verbatim quote, named
output plus a number or timeframe, contrarian claim, question, mini-story opener). Kill the most
predictable candidate, then pick by two bars:

- **The any-business test.** If the hook could open an ad for any business, it fails. It must name
  something only this ad can say: a deliverable, a number, a person, a moment.
- **Persona-in-three-seconds.** The intended buyer knows this is for them within the first line. No
  warm-ups, no throat-clearing.

Keep a rolling list of overused phrases in `brain/ads/taste-profile.md`'s Rejects section, seeded
from actual review feedback, not guessed in advance. Once a phrase or headline shape shows up as a
rejection reason two or three times, it earns a spot on that list and future rounds avoid it.

## Copy length matched to the creative

| Creative | Primary text | Why |
|---|---|---|
| Screenshot-style native mockup | 1-3 lines | The image is the content |
| Founder photo with bold overlay text | 3-5 lines | Set up the truth; the image lands it |
| Non-face object or scene | 5-10 lines | Problem, solution, next step; the image supports |
| Curiosity-gap creative | 2-4 lines | Create the gap. Do not fill it in the copy |
| Text-only or plain-text card | 10-20 lines | The copy is the ad; write it story-led |
| Video caption | 1-3 lines | The script carries the load |

Other fields: `ad_headline` 25-40 characters (the any-business bar applies here too);
`link_description` optional, 20-30 characters, images only; `cta` defaults to the platform's
"Learn More" equivalent and varies only on genuine fit.

## Pre-write claims checklist

This skill does not own the compliance taxonomy; the `ads-meta-compliance` skill does, and Phase 7
calls it before anything renders. Before handing copy to that gate, do this cheap pass yourself so
the round arrives clean:

- Every factual or outcome claim traces to a real source: the offer's canonical facts, an approved
  proof entry, or verified business data. No source, no claim; use `[PLACEHOLDER]` or drop it.
- No invented statistic, testimonial, view count, review, or engagement number anywhere, including
  inside a rendered mockup.
- No guaranteed income, effortless outcome, or certain result phrasing.
- Any on-image quote is exact and attributed to a real, consented source.
- The offer, price, and mechanism described match what the destination page actually delivers.

## The skeptical-scroll gate

Judge every concept as the intended buyer scrolling past it between ordinary posts. Kill or repair
it when any answer is weak.

1. **Recognition**: does the right buyer know this is relevant within one second?
2. **Desire or tension**: is there a felt reason to stop, not merely a topic label?
3. **Specificity**: is the detail concrete without narrowing the audience arbitrarily?
4. **Believability**: can the claim, carrier, scene, and proof all be true?
5. **Visual job**: does the image or opening frame communicate, demonstrate, or create curiosity?
6. **Message continuity**: will the destination deliver the promise the ad starts?
7. **Native fit**: does the execution belong in the selected placement?
8. **Distinctness**: is it a new message, narrative, or appearance, not a cosmetic variation?
9. **Production feasibility**: can it be made convincingly with the inputs actually available?
10. **Conversion path**: does the next action make sense for this awareness stage?

Common false positives: a beautiful scene with no conflict, buyer, action, or product meaning; an
object metaphor that needs the body copy to explain it; a credential or price comparison treated as
the entire creative idea; a fake interface that signals "AI made this" before it signals value; a
person posing rather than doing something connected to the promise.

## Production routing

Choose the route per concept, not as a blanket policy. A production-capability check runs once at
intake (Phase 0): confirm the kie.ai key is set for AI imagery and that headless Chrome can render
the HTML templates before promising either route. If a capability check fails, reassign that
concept's share to the next-best working track. Never silently downgrade a custom or AI concept to
the safest template just because it is easiest to render.

Whatever the route, the rendered file lands in that ad's own `_<ad-code>/` parts folder (see
`references/output-contract.md`), and when `brain/ads/brand-kit/` exists its tokens and image assets
overlay the stock library files at render time. The shared library itself is never edited to carry a
business's brand; see "`brand-kit/`" in `references/memory-schema.md` for why.

### Template route

Pull a layout from the shared ad library. Find it once per run and remember the path: inside a
GrowOS install the library lives at `system/creative-library/ads/`; in a standalone workspace it is
the pack's own `library/` folder, either at the workspace root or inside the unzipped pack folder.
Match its documented `type` and `best_for` tags to the concept's argument and persona; verify the
persona would plausibly encounter this surface (a developer-tool mockup, for example, only fits a
technical audience). Edit only the template's designated editable text fields, keep its structure
and brand tokens intact, and render through the library's HTML-to-PNG pipeline. Templates are a
capped floor, never the default; see the quotas in `references/concepting.md`. Reach for one only
when a native surface genuinely serves the concept.

### Custom-html route

This is the main source of visual novelty and a first-class citizen, not a fallback for when AI
generation fails. Build a new layout on the library's shared design tokens (`tokens.css`, in
whichever of the two library locations found above), with the brand kit's overrides on top when
there is one, so brand stays consistent while the composition is free. A plain typeset statement
card, centered text on a brand color and nothing else, is a rejected family on its own; every
custom layout needs a real visual subject: a photo, a diagram, a mocked physical object, an
editorial composition, or a composited AI-generated image or background. Keep it to one idea, two
or three lines of visible text, and real typographic hierarchy. If the layout would still read as a
statement card once the visual subject were removed, it is not done yet.

### AI-image route

**AI imagery lives at two poles, never the uncanny middle.** Fully photoreal, reading as a real
photo, or proudly and obviously artificial in a way where the artificiality itself is the hook (a
miniature diorama, surreal scale, hyper-stylized 3D, an isometric world, a clay or toy aesthetic).
The almost-real middle and generic AI texture are both banned, not because AI is risky, but because
that specific zone reads as fake in a way that erodes trust without earning any of the proud-AI
novelty.

Keep text out of the generated image itself; models mangle text and it dates fast. Either reserve a
clean copy zone in the prompt and overlay the line with a small deterministic HTML render pass, or
let the image run bare and let the ad copy carry the words. Never bake a headline into the
generation.

**Calling kie.ai.** The key lives in `.env` as `KIE_AI_API_KEY`; never print it. Call the REST API
directly (a kie.ai MCP server, if one is connected, works too, but the REST path needs no extra
install): base `https://api.kie.ai/api/v1` with header `Authorization: Bearer $KIE_AI_API_KEY`.
Submit `POST /jobs/createTask` with the model name and an `input` object (prompt, `output_format`,
aspect ratio, and optional `image_input` reference URLs), then poll `GET /jobs/recordInfo?taskId=`
until `data.state` is `success`; the image URLs sit in `resultJson.resultUrls`. Reference images
passed as `image_input` must be publicly reachable URLs: upload local files to a free image host
first, the same way `ads-meta-publish`'s cookbook does for creative uploads. When those reference
images are the founder's own face, get the owner's yes before that upload, every time: name exactly
which photos are about to go up, say plainly that the resulting link is public, viewable by anyone
who has it, and stays that way indefinitely, and proceed only on a clear yes. If the owner would
rather not, they can host the photos themselves somewhere they control and hand over that URL
instead, and generation runs from that URL the same way. Jobs are async and parallel-safe, so submit
a batch and poll while other work continues.

**Founder-face imagery.** This technique works for any founder with four to six evenly lit
reference photos. Use edit-mode generation with those photos only when the face is forward-facing
and clearly visible in the intended shot; use generate mode (no reference image) when the person is
shown from behind, in profile, partially hidden, or only by a hand or object. Edit mode on a
non-frontal prompt produces merged-face artifacts. Write a short identity-lock description once
(build, hair, general look, default wardrobe) and reuse it across every generation so the person
stays recognizable across styles. **Never generate a likeness of anyone who is not the business's
own founder or team member appearing as themselves.** A customer or third party gets a real photo
with explicit consent, or a faceless carrier, never a synthesized face.

**New-style proposal.** When a concept needs a visual style outside whatever styles the workspace
already has approved, do not force-fit an approved style onto it, and do not draft it into the
library's own style catalog either: the shared library stays read-only here, the same never-edited
rule as above. Draft the new style as a pending record in the business's own `brain/ads/styles/`
folder instead (standalone: `ads-brain/styles/`), alongside the rest of its ads memory, generate one
example for this ad, and let the ad reach review normally. The style only enters this business's
approved rotation once a human has reviewed the result; a pending style is fine for one ad but never
self-promotes into default use.

### Video-script route

When the concept needs the user on camera and no footage exists yet, the deliverable is a complete
record-ready package, not a placeholder video: three genuinely different opening-hook variants, one
natural 45 to 60 second script recordable in a single take, shot notes, on-screen text beats,
b-roll ideas, and every claim traceable to its source. Set `asset_status: record-ready` and omit
`creative` in the item; see `references/output-contract.md`. Never label an unrecorded script a
finished video.

## Carousels

Give the sequence one promise and one progression. Card one must stop the scroll without requiring
card two. Each card advances the argument, proof, story, or demonstration; never split one
paragraph across slides. Keep the visual grammar consistent while allowing enough change to reward
the swipe. The final card resolves the idea and states the next step. Inspect every card
individually and as a full strip before handoff.

## Final-pixel gate

Open the finished artifact. Never approve from a prompt, a script, or the HTML source alone.

**Hard failures:** wrong person, product, price, identity, or audience; a false or untraceable
claim, quote, number, interface, or testimonial; a likeness generated or used without the required
consent; a policy violation; unreadable, cropped, misspelled, or malformed text; an anatomical,
object, perspective, or continuity artifact a buyer would notice; a broken file, wrong dimensions,
or missing required cards; no one-second relevance to the intended buyer.

**Taste and craft risks:** generic AI texture or an over-polished poster feel; an attractive
atmosphere without a readable desire, tension, or demonstration; a repeated visual world, hook, or
emotional beat from recent ads; too many design elements competing for attention; a concept that
only becomes understandable after reading the primary text.

**Inspection loop:** view at full resolution, then at mobile-thumbnail size; for video, inspect the
opening, transitions, proof moments, and the CTA frame; compare against the brief for claim
continuity; compare against the nearest approved and rejected local examples when history exists.
Fix and regenerate up to three times. Kill or replace anything still failing a hard check rather
than handing off known-bad work.

## AI-artifact scan (AI-image route only)

Run immediately after generation, before the final-pixel gate: exactly five fingers per visible
hand, nothing floating or disconnected, no melted or gibberish text, consistent shadow direction,
face resemblance to the reference photos when a founder face is used, and the image reads as
intended for its pole (a real photo, or proudly artificial). Any failure: regenerate before moving
on.
