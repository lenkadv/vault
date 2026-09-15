---
name: image-create
description: 'Create one branded image for a social post, an ad, a blog header, or any ad-hoc visual need. Picks the right size for the platform, pulls colors and fonts from brain/brand.md, and either renders the real file (when the business has its own image-generation key in .env) or hands over a precise design brief the owner can build from by hand - never fakes a render it cannot do. Triggers: "make me an image", "create a graphic", "I need a visual for this", "design an image for [platform]", "image for this post/ad". Not for a multi-slide carousel (carousel-create) or a set of thumbnail/title A-B pairs (youtube-thumbnail) - both reuse the render-or-brief logic here but run their own multi-image flow.'
user-invocable: true
argument-hint: "[what the image is for, e.g. 'IG post image: new offer launch']"
compatibility: Always runs. Renders a real file only when the business has its own image-generation key set in .env (references/render-or-brief.md); otherwise it ships a precise design brief instead of faking a render.
---

# Image Create

Makes one branded image: a social post graphic, an ad image, a blog header,
or whatever the owner asks for. Pulls the look from `brain/brand.md` so it
matches everything else the business puts out. If the business has its own
image-generation key set up, this skill renders the real file. If not, it
writes a design brief precise enough to hand to a person - honestly, never
pretending a render happened when it did not.

## Step 1: Find the need

Two starting points:

- **Attached to a parent item.** Someone is already writing a post or an ad
  (a work item) and it needs an image. The parent item tells you the
  platform, the topic, and roughly what the image is for. Note the parent's
  file path now - Step 7 needs it, and its underscore parts folder is where
  the output will live (`promo.md` keeps its parts in `_promo/`).
- **Ad-hoc.** The owner just asked for an image with no parent item behind
  it. Ask what it is for if that is not already clear.

## Step 2: Pick the format and dimensions

Match the platform (or the parent item's platform) to `references/platform-sizes.md`.
If the owner names a custom size, use that instead of the table. If the
platform is not obvious, ask rather than guessing.

## Step 3: Read the brand

Open `brain/brand.md` before drafting anything. Pull:

- **Colors** - exact hex codes if given, plain color names if that is all
  there is
- **Fonts** - heading and body
- **Image style** - the look and feel it describes (bright/moody, real
  photos/illustrations, busy/clean)
- **Look and feel, in a word or two**
- **Things to avoid** - visual choices that are wrong for this brand

If a section is still a `[PLACEHOLDER: ...]` because the owner has not filled
it in, use `[PLACEHOLDER: what's missing]` in the brief too. Never invent a
brand color or font to fill the gap.

## Step 4: Build the design brief

This step always runs, no matter what happens next - it is both the input to
a render and the deliverable itself if there is no render. Fill in the exact
shape from `references/render-or-brief.md`'s "Step 3: ship the brief"
section: made-for, dimensions, the copy overlay text (headline, subhead, any
other on-image words), the brand tokens from Step 3, the layout (specific
placement, not "looks nice"), the mood and style, and the visual elements.

Write the actual words for any on-image text now - the headline, a subhead,
a CTA line. Keep it short; text on an image has to read in a glance. Check
`brain/compliance.md`, when it exists, before writing any claim into that
text - what may and may not be said applies to a headline or CTA line the
same as any other copy the business ships.

**Editor gate on the words.** The headline and any on-image copy are words
the owner will ship, so they pass one fresh pair of eyes before moving on.
Do this while everything is still in-progress, before Step 6.

1. Invoke the `reviewer` agent with the on-image text, the business folder
   path, and whatever brief or request this text is answering as the
   comparison source.
2. Act on the verdict - `clean`: move on. `pass-with-notes`: apply the quick
   fixes, use judgment on the rest, move on. `fix`: apply the findings
   (exact replacement for a mechanical tell; your own wording, drawn from the
   brand voice, for a judgment note), then invoke the reviewer again.
3. Two passes at most. Still `fix` after the second? Move on anyway and say
   plainly, in the final report, what is still flagged.

If this runtime cannot run a separate agent, do not skip the check quietly:
run it yourself in-session as a clearly labeled fresh pass - walk
`.claude/skills/humanize/rulebook/tells.md`, run its scorer, apply the same
bar, and check any on-image claim against `brain/compliance.md` the way the
reviewer would (a clash is FLAGGED to the owner, never quietly rewritten) -
and say in the report that the fresh pass ran in-session instead of as a
separate reviewer.

## Step 5: Render, or ship the brief

Follow `references/render-or-brief.md` exactly - it is the shared pattern
`image-create`, `carousel-create`, and `youtube-thumbnail` all use, so do not
improvise a different version of it here. It needs the prompt (built from the
Step 4 brief), the target dimensions from Step 2, and the save path (the
parent's parts folder from Step 1, or a new one for a standalone image - see
Step 7). It hands back exactly one of two things: a saved file's path and
which provider made it, or the full brief text and one honest line for why
there is no render.

## Step 6: Place the asset

**Attached to a parent item:**

1. Find (or make) the parent's underscore parts folder - `promo.md` keeps
   its parts in `_promo/`.
2. Save what Step 5 handed back into that folder: a real render as the image
   file itself (`_promo/image.png`); a brief as a markdown file
   (`_promo/design-brief.md`).
3. **Only when Step 5 produced a real render, and that exact file is the one
   that will publish:** seal it into the parent item's frontmatter before the
   parent moves to `review`, so the owner's approval covers those exact
   bytes:
   ```yaml
   sealed:
     - _promo/image.png sha256:<64-character hash>
   ```
   Get the hash with `shasum -a 256 _promo/image.png` (`sha256sum` on Linux)
   and use exactly what it prints. The path is POSIX-style (forward
   slashes), relative to the parent item's own folder. This is the rule from
   `system/standards/item-model.md`'s "Sealed assets" section - do the
   sealing before review, never after.
   A design brief is never sealed. It is not the thing that ships; it is
   instructions for making the thing that ships.

**Standalone (no parent item):**

1. Write a new item at `work/visuals/<readable-slug>.md`.
2. Set `type: visual-image` (the one field the system cannot guess) and
   `skill: image-create`. Let the system stamp `id`, `status`, `business`,
   `channel`, and `created` - never write those yourself.
3. Born `draft`. Move it to `review` only after Step 4's Editor gate has run.
4. If Step 5 produced a real render, save it as a part beside the item (its
   own underscore folder, e.g. `_<slug>/image.png`) and seal it in exactly as
   above. If it is a brief, the brief text can simply be the item's body -
   no parts folder needed when there is nothing to seal.

## Step 7: Tell the owner what happened

Say plainly, in plain words:

- What the image is for and where it landed (the parent's parts folder, or
  the new `work/visuals/` item).
- Whether it was rendered (which provider) or briefed (and why - no key, or
  the render failed and what broke).
- Whether it is sealed, and into which item.
- Anything still flagged from the Editor gate, if it went out un-clean.
- Any `[PLACEHOLDER]` left because `brain/brand.md` was missing something.

## Reference files

| File | Read for |
|---|---|
| `references/render-or-brief.md` | The env-key check, the render call per provider, the brief format, and what gets handed back. Shared with `carousel-create` and `youtube-thumbnail` - edit it there, not a copy. |
| `references/platform-sizes.md` | Dimensions and aspect ratio by platform |

## When something is missing

A missing image-generation key is not an error - it is the normal state for
a business that has not set one up, and `references/render-or-brief.md`
already covers it: ship the brief, say why, move on. The same honesty
applies anywhere else something is missing - a thin `brain/brand.md`, no
parent item to attach to, a render that fails partway. Say what did not run
and why, fall back to the safest manual path, and never let the final report
imply something happened that did not.
