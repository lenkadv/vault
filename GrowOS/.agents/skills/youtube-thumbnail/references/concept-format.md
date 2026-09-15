# Concept format

This is the shape every concept in a `youtube-thumbnail` item follows: the
fields each concept carries, how many pairs to build by default, the
mobile-readability line a briefed concept always adds, and the filenames a
render gets saved under. `SKILL.md` points here from Step 4 (build the
pairs), Step 5 (render or brief), and Step 7 (queue it) rather than
repeating any of this inline.

This file does not cover HOW a concept gets rendered or briefed - that is
`.claude/skills/image-create/references/render-or-brief.md`, reused as-is -
or WHICH psychological approaches exist - that is
`.claude/skills/youtube-package/references/title-approaches.md`, reused
as-is. This file is just the shape those two get poured into.

## The fields, per concept

- **Title** - the exact YouTube title text, 60 characters or under. Pulled
  from the title pool (SKILL.md Step 3) when one exists; written fresh
  otherwise.
- **Thumbnail text** - 2 to 5 words, all of the on-image words this concept
  uses. Every word has to earn its place at thumbnail size - cut before you
  add.
- **Layout** - specific placement: where the subject sits, where the text
  sits, what the background does. "Text top-left, subject right third,
  background a soft blur of [X]" - not "clean modern layout." Someone
  should be able to build this from the words alone.
- **Colors** - brand-derived (hex if `brain/brand.md` has it, plain names
  if that is all there is), pushed to the contrast a thumbnail needs. If
  SKILL.md Step 2 found a brand-vs-legibility tension, apply the
  compromise it settled on here, concept by concept, rather than
  re-litigating it for each one.
- **Expression or pose** - only when a person features in the concept.
  What their face and body are doing, matched to the concept's emotional
  angle. Leave this field out entirely for a concept with no person in it,
  rather than writing "n/a."
- **Key Element** - one line: the ONE thing in this concept that earns the
  click. Not a list of everything in the image - the single thing doing
  the work.
- **Why this works** - one line of craft judgment: the psychology behind
  the choice. Never a click-through number, a percentage, or a claimed
  result - nobody has tested it yet.

## Pair count

Default to 3 pairs. Offer 5 - one per approach in
`.claude/skills/youtube-package/references/title-approaches.md` - when the
owner wants a wider test, or asks for more directly. Every pair sits on its
own approach; two pairs that are really the same idea with a different
background color are one pair, not two.

## The mobile-readability rule

A briefed concept (SKILL.md Step 5: no render, or the render failed) always
closes with one more line, on top of the brief shape in
`.claude/skills/image-create/references/render-or-brief.md`:

> **Mobile check:** would the thumbnail text above still read at 160x90 px
> - the size a thumbnail actually shows at in a mobile search or suggested
> list? [Yes, with a one-clause reason, or: no - here is the shorter text
> that would work instead.]

A rendered concept does not need the written line - the owner can look at
the actual file - but the same discipline still applies when Step 4 drafts
the thumbnail text in the first place: if it would not survive a shrink to
160x90 px, it is too long regardless of whether this concept renders or
gets briefed.

One shape note: the shared brief template (render-or-brief.md's) carries a
"Body font" line because most images have body text. A thumbnail does not
- write "none" there rather than inventing body copy to fill the field.

## Render filenames

Renders (and only renders) land in this item's own parts folder,
`work/video/_<video-slug>-thumbnails/`, named for the concept's letter:
`concept-a.png`, `concept-b.png`, `concept-c.png`, and - for a 5-pair set -
`concept-d.png`, `concept-e.png`. The letters match the concept order in
the item body. A briefed concept has no file and no filename; its brief
text lives directly in the item body, in that concept's own section.

## One approach each, never a palette swap

The test only works if the pairs are actually testing different things. A
concept that changes the psychological approach - what kind of curiosity,
promise, or emotion it leads with - is a real pair. A concept that keeps
the same idea and just swaps the background color, font weight, or crops
the same photo differently is not; it tells the owner nothing an A/B test
could not tell them for free. When in doubt, ask: if this thumbnail won,
would the owner learn something different than if the other one won? If
not, it is a repeat, not a pair.
