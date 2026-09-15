---
name: youtube-thumbnail
description: 'Generate 3 to 5 thumbnail-and-title concept pairs for one YouTube video, each pair built on a different psychological approach, so the owner can A/B test them. Pulls the title pool from a youtube-package item when one exists, pulls colors and fonts from brain/brand.md, and renders each concept image (or ships a precise design brief when there is no image-generation key) using the same render-or-brief pattern as image-create. Triggers: "make thumbnails for this video", "thumbnail options", "thumbnail A/B test", "title and thumbnail ideas", "youtube thumbnail concepts". Not for a single social/ad image (image-create), a multi-slide carousel (carousel-create), or the description/chapters/tags/pinned-comment package (youtube-package) - and it never runs the actual test or reports a winner, that stays the owner''s platform step.'
user-invocable: true
argument-hint: "[the video: a script or package item, a topic, or a title/core claim to build thumbnails for]"
compatibility: Always runs. Renders real concept images only when the business has its own image-generation key set in .env (the same check image-create uses, at .claude/skills/image-create/references/render-or-brief.md); otherwise it ships a precise design brief per concept instead of faking a render.
---

# YouTube Thumbnail

Makes a small set of thumbnail-and-title pairs for one YouTube video, each
pair built on a genuinely different psychological approach, so the owner can
test them against each other. Coordinates with `youtube-package`'s title
pool when one exists instead of inventing a competing set of titles. If the
business has its own image-generation key set up, this skill renders the
real concept images. If not, it writes a design brief precise enough to hand
to a person for each concept - honestly, never pretending a render happened
when it did not.

## Step 1: Find the video

Three ways to start:

- **A script item.** A video script already exists in `work/video/` (from
  `video-script`, or a VSL from `vsl-write` if that is what this video is).
- **A package item.** A `youtube-package` item already exists for this video
  in `work/video/` - title options, description, chapters, and the rest.
- **A topic and a core claim from the owner.** No item exists yet. Ask for
  the video's topic and the one claim or outcome it makes, if that is not
  already clear from the conversation.

If the owner does not name a specific video and more than one recent item in
`work/video/` could be it, ask which one rather than guessing. Note the
video-slug now - it is the base of everything this skill saves. When a
script or package item exists, the video-slug is that item's own filename
(without `.md`, and with a trailing `-script` or `-package` dropped, so
this item reads `<video>-thumbnails.md`, never
`<video>-package-thumbnails.md`). When starting from a topic only, build a
fresh readable slug from the topic (lowercase, hyphenated), the same way
every other skill does.

If this is a redo - the owner sent a `-thumbnails` item back with `changes`
and a note - edit that same item in place and address the note; do not
create a second one for the same video.

## Step 2: Read the brain

Before drafting anything, open:

- **`brain/brand.md`** - colors (exact hex if given), fonts, image style,
  and things to avoid. Thumbnails stay on brand, but they are allowed to
  push contrast harder than a normal brand image would. If the brand
  palette is soft, pastel, or red/white-heavy - the kind of palette that
  vanishes next to YouTube's own white background and red UI accents - say
  so plainly and propose the honest compromise: the brand's own accent
  color pushed to full saturation, or brand color paired with high-contrast
  black or white text, rather than quietly ignoring the brand or quietly
  ignoring legibility.
- **`brain/audience.md`** - who this is for, and specifically what stops
  their scroll. A thumbnail lives or dies on a stranger's half-second
  glance; the audience file is what tells you what that person actually
  stops for.
- **`brain/voice.md`** - how the business sounds, even in five words or
  less.
- **`brain/compliance.md`**, when it exists - five words on a thumbnail
  can still make a claim the business may not make; know the lines before
  writing any on-image text, and flag a clash instead of designing
  around it.

Any section still a `[PLACEHOLDER: ...]` because the owner has not filled it
in gets `[PLACEHOLDER: what's missing]` in the concepts too. Never invent a
brand color, font, or audience detail to fill the gap.

## Step 3: Coordinate the titles

Look in `work/video/` for a `youtube-package` item already made for this
video. If one exists, open its parts folder and read its `titles.md` part -
those title options are the pool. Use the exact title text from it, do not
reword it, and never draft a competing title that contradicts it. Pick the
titles whose approaches are the most genuinely different from each other for
the pair count you are building (Step 4). If it lists fewer usable titles
than the pair count, write the rest yourself the same way as the no-package
case below, and say plainly in your report which titles came from the pool
and which you added.

If no `youtube-package` item exists yet for this video, build the titles
yourself. Read
`.claude/skills/youtube-package/references/title-approaches.md` for the set
of psychological approaches, and write one title per approach you are using
- do not restate that file's contents here, just draw on it. If that file is
not on this install yet (`youtube-package` has not been built), say so
plainly and fall back to your own honest judgment: keep each title on a
genuinely different angle rather than a reworded repeat. The concepts still
get written either way; only the taxonomy depth degrades.

## Step 4: Build the pairs

Default to 3 pairs. Offer 5 - one per approach - when the owner wants a
wider test. Every pair pairs one title (from Step 3) with one thumbnail
concept on its OWN psychological approach - never three pairs that are
really one idea in different colors.

For each concept, write the fields `references/concept-format.md` defines:
title, thumbnail text (2-5 words, all of it), layout, colors, expression or
pose when a person features, the Key Element, and one honest line on why it
works. Keep the "why this works" line to craft judgment - the psychology of
the choice - never an invented click-through number or a claimed result
nobody has measured yet.

## Step 5: Render or brief, per pair

Follow `.claude/skills/image-create/references/render-or-brief.md` exactly -
it is the shared pattern `image-create`, `carousel-create`, and this skill
all use, so do not improvise a different version of it here. Run it once per
concept: the prompt built from that concept's Step 4 fields, the fixed
target dimensions 1280x720, and the save path inside this item's own parts
folder, `work/video/_<video-slug>-thumbnails/concept-a.png` (then
`concept-b.png`, `concept-c.png`, and on through the letters you are using).
It hands back exactly one of two things per concept, never both: a saved
file's path and which provider made it, or the full brief text and one
honest line for why there is no render. A key working for one concept does
not guarantee every concept renders - a single transient failure means that
one concept gets a brief while its siblings still get real files; say so
plainly per concept rather than treating the whole set as one outcome.

A briefed concept uses render-or-brief.md's own "Step 3: ship the brief"
shape, plus one line this skill always adds on top: the mobile check -
would the thumbnail text in this brief still read at 160x90 px, the size a
thumbnail actually shows at in a mobile list? If it would not survive that
shrink, say so and cut the words further rather than shipping a brief that
only works full-size. `references/concept-format.md` has the exact rule.

## Step 6: The Editor gate

The titles and the on-image thumbnail text across every concept are words
the owner will ship, so they pass one fresh pair of eyes before the item
moves to `review`. The layout, color, expression, and Key Element notation
for each concept is internal production notation, the same as a design
brief - never reworded to chase a readability score. Only the titles and the
on-image text are the outward copy the gate scores.

1. Invoke the `reviewer` agent once, with every title and every concept's
   on-image thumbnail text together, the business folder path, and the
   comparison source - the script or package item this was built from, or
   the topic and core claim the owner gave when there was no parent item.
2. Act on the verdict - `clean`: move on. `pass-with-notes`: apply the quick
   fixes, use judgment on the rest, then move on - unless one of those fixes
   touched words that appear on a rendered concept image, in which case the
   same stale-render rule as `fix` applies: redo Step 5 for that concept and
   re-seal it, before this item goes anywhere near `review`. `fix`: apply
   the findings (the exact replacement for a mechanical tell; your own
   wording, drawn from the brand voice, for a judgment note), then invoke
   the reviewer again. If the fix changes any words that appear on a
   rendered concept image, that concept's render is now stale - redo Step 5
   for that concept and re-seal it, before this item goes anywhere near
   `review`. Never seal a render that is older than the copy it shows.
3. Two passes at most. Still `fix` after the second? Move on anyway and say
   plainly, in your report, what is still flagged.

If this runtime cannot run a separate agent, do not skip the gate quietly:
run it yourself, in-session, as a clearly labeled fresh pass - walk
`.claude/skills/humanize/rulebook/tells.md`, run its scorer
(`node .claude/skills/humanize/scripts/ai-tells.js <file> --channel article`
- the scorer has no thumbnail or video channel, and article is both the
nearest fit and the scorer's own default), apply the same verdict bar, and
check the titles and on-image text against `brain/compliance.md` the way
the reviewer would (a clash is FLAGGED to the owner, never quietly
rewritten) - and say in your report that the fresh pass ran in-session
instead of as a separate reviewer.

## Step 7: Queue it

Write the item at `work/video/<video-slug>-thumbnails.md`. Set `type:
thumbnail-concepts` (the one field the system cannot guess), `skill:
youtube-thumbnail`, and `headline` to a plain one-line queue title (for
example `Thumbnail concepts - <video title or topic>`). Set `parent:` to the
id of the script or package item this was built from, when one exists
(prefer the package item if you coordinated titles from it in Step 3, since
it is the closer sibling; otherwise the script item) - leave it unset when
you started from a topic only, since there is no item to link. Let the
system stamp `id`, `status`, `business`, `channel`, and `created` - never
write those yourself.

The body opens with one line saying what this was built from (the script or
package item's path, or "a topic and core claim from the owner"), then holds
every concept from Step 4 in turn, each with its fields from
`references/concept-format.md`, plus a short closing note on what to test
first and the honest reasoning behind that pick.

**Only for a concept Step 5 actually rendered:** seal it into the item's own
frontmatter before the item moves to `review`, so the owner's approval
covers those exact bytes:

```yaml
sealed:
  - _<video-slug>-thumbnails/concept-a.png sha256:<64-character hash>
  - _<video-slug>-thumbnails/concept-b.png sha256:<64-character hash>
```

Get each hash with `shasum -a 256 <file>` (`sha256sum` on Linux) and use
exactly what it prints. One line per rendered file; a briefed concept gets
no line, because its brief text is not a file that ships, it is
instructions for making one. This is `system/standards/item-model.md`'s
"Sealed assets" rule - seal before review, never after.

**The trap to watch for:** if a render succeeds only AFTER this item already
reached `review` - a redo, a retried key, a late fix - do not seal it into
an item that is already past `draft`. Take the item back through the legal
path (`review -> changes -> draft`) so the reseal happens before the
owner's next approval, the same as any other post-review change. Sealing
into an item at `review` is never legal, no matter how good the excuse.

Born `draft`. Move it to `review` only after Step 6's Editor gate has run.

## Step 8: Tell the owner what happened

Say plainly, in plain words:

- The pairs at a glance: each concept's title and its Key Element, so the
  owner can scan the set in a few seconds.
- For each concept, whether it was rendered (which provider) or briefed
  (and why - no key, or the render failed and what broke).
- Which pair or pairs you would test first, and the honest reasoning - craft
  judgment, never a claimed result.
- Where it landed (`work/video/<video-slug>-thumbnails.md`), and whether it
  is linked to a script or package item.
- Whether the title pool came from an existing `youtube-package` item, was
  built fresh, or was built fresh because that skill or its taxonomy file
  was not available yet.
- Anything still flagged from the Editor gate after two passes.
- Any `[PLACEHOLDER]` left because `brain/brand.md` or `brain/audience.md`
  was missing something.
- If no `youtube-package` item exists yet for this video, mention it is the
  natural next step now that titles are settled. Running the actual A/B
  test, and setting the thumbnail that wins, happens on the owner's own
  YouTube channel - never say a test ran or a concept "won."

## Reference files

| File | Read for |
|---|---|
| `references/concept-format.md` | The per-concept fields, the pair-count default, the mobile-readability rule, and the render filenames. |
| `.claude/skills/image-create/references/render-or-brief.md` | The env-key check, the render call per provider, the brief format, and what gets handed back. Shared with `image-create` and `carousel-create` - edit it there, not a copy. |
| `.claude/skills/youtube-package/references/title-approaches.md` | The psychological title approaches. Shared with `youtube-package` - edit it there, not a copy. If it is not on this install yet, Step 3 says how to degrade. |

## What this skill does not do

- **One image for a single post, ad, or blog header** is `image-create`'s
  job, not this skill's.
- **A multi-slide carousel** is `carousel-create`'s job.
- **The description, chapters, tags, pinned comment, and community post**
  are `youtube-package`'s job.
- This skill produces test pairs. It never runs the actual A/B test, never
  reports a click-through number, and never claims a concept "won" - that
  happens on the owner's own channel, and setting the real thumbnail is a
  manual YouTube Studio step outside any skill here.

## When something is missing

A missing image-generation key is not an error - it is the normal state for
a business that has not set one up, and
`.claude/skills/image-create/references/render-or-brief.md` already covers
it: ship the brief for that concept, say why, move on. The
same honesty applies everywhere else something is missing: no video named
and nothing obvious in `work/video/` (ask, do not guess), a thin
`brain/brand.md` or `brain/audience.md` (`[PLACEHOLDER]`, never invented),
no `youtube-package` item or its taxonomy file not built yet (Step 3's
fallback), no reviewer agent on this runtime (Step 6's fresh-pass fallback),
or no script or package item at all (proceed from the topic, leave
`parent:` unset, say so - a normal start state, not a problem). Say what did
not run and why, fall back to the safest manual path, and never let the
final report imply something happened that did not.
