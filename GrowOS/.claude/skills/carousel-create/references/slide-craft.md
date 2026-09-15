# Slide craft

This file is the craft law for every slide in every carousel, whichever arc
`references/arcs.md` picked. The arc sets the shape; this file is what makes
each individual slide actually work - the word bands, the rules that keep
momentum swipe to swipe, the honesty beat, the readability floors, the
platform dimensions, and the sealing checklist for whatever gets rendered.

## Word bands

- **Hook slide (S1): 15-50 words.** Self-contained - a question, a dare, or a
  clear value line that works even if this is the only slide anyone ever
  sees. Nobody has swiped yet; the hook cannot lean on a slide 2 that has not
  happened for them.
- **Mid / value slides: 20-35 words.** One idea. No paragraphs on a slide,
  ever - if a slide needs two sentences to make its point, it usually needs
  two slides instead.
- **Landing slide: the same discipline as a mid slide.** Tight, not a
  paragraph, even though it is doing three jobs at once in that small space -
  the punchline or reframe, the CTA, and the honesty beat (below). If all
  three will not fit tightly, cut copy before loosening the band.

## The hook-slide rule

Slide 1 has to work completely alone. Carousels get shared, screenshotted,
and shown as a single preview image before anyone swipes - if the hook only
makes sense next to slide 2, it has already lost the reader who never gets
that far. Read the hook by itself, with the rest of the carousel covered up,
and check it still poses a real question, a real dare, or a real value line
on its own.

## The one-idea rule

Exactly one idea per slide. This is the rule most likely to slip under
deadline pressure - a slide that quietly carries two ideas because they felt
related is still two ideas, and it reads as clutter, not efficiency. If a
value slide is fighting to fit, that is the tell: split it into two slides
rather than shrinking the type to make it fit on one.

## The momentum / persistent-motif rule

Before writing slide 2, name ONE visual element that will persist across
every slide in this carousel and advance by exactly one step each time it
appears again. A bar that fills, a checklist that checks off, an item that
gets struck through, a layer that gets added, a card that flips, a counter
that ticks up - the specific object matters less than that there is one, and
that it is the SAME one from slide to slide.

Write the motif's name once, near the top of the item body (SKILL.md Step 4).
Then, in every single slide's design notes, state the motif's literal STATE
on that slide - not "advance the motif" as a vague instruction to a future
designer, but the actual state: "bar at 3 of 5 segments filled," "myth #2
struck, myth #3 next," "card 4 of 6 flipped face-up." A carousel with no
persistent motif still needs some visual thread that changes slide to slide,
or the set reads as several unrelated images posted next to each other, not
one carousel.

## The honesty beat

Every carousel lands one true, plainly-stated limit or promise on the landing
slide - not a disclaimer bolted onto the bottom, but part of the actual
landing line the reader reads last. This is the trust move: the moment the
carousel could oversell and chooses not to.

Pull the honesty beat from THIS business's own brain - `brain/business.md`,
`brain/proof/`, `brain/compliance.md`, `brain/audience.md`, or any other
brain file that states a real limit or promise - never invent one, and
never borrow a phrasing that belongs to somebody else's marketing. Process framing over
invented numbers, always: a real, describable amount of time, effort, or a
real stated term beats a fabricated statistic every time. If nothing in the
brain gives you a real fact to build the honesty beat from, that is a
`[PLACEHOLDER: what's missing]`, never a guess dressed up as one.

Any number or quote used anywhere in the carousel - not just the honesty
beat - comes from `brain/proof/` byte-faithful, exactly as written there.
Never trim or sharpen a real quote to make it fit a slide's word band; pick a
shorter one, or use it in full across two slides, but never edit the words
themselves.

## Readability floors

- **Works at thumbnail size.** Shrink the slide mentally to the size it will
  actually appear at in a scrolling feed. If the words disappear or the
  motif's state is not legible at that size, the type is too small or there
  is too much of it - fix the slide, not the viewer's eyesight.
- **Contrast: AA minimum (4.5:1)** between text and background, on every
  slide, not just the ones with light backgrounds.
- **Brand accent as accent, not wallpaper.** The brand's accent color marks
  the one thing that matters on a slide - the motif, a key word - and is
  never the dominant background wash on every slide. If everything is the
  accent color, nothing is.
- **Big type, few words.** If a slide's copy does not sit comfortably at a
  size a thumb-scrolling reader can read without zooming in, the copy is too
  long. Cut words before shrinking type past what is comfortably readable.

## Platform and dimensions

| Platform | Dimensions | Aspect ratio | Notes |
|---|---|---|---|
| Instagram feed carousel (default) | 1080 x 1350 px | 4:5 portrait | Takes more feed height; the default unless the design genuinely wants a square canvas. |
| Instagram feed carousel (square) | 1080 x 1080 px | 1:1 | Fine when the design wants a square canvas instead. |
| LinkedIn document carousel | 1080 x 1080 px | 1:1 | LinkedIn posts a carousel as a document (a PDF of square pages), not a stack of separate images - see SKILL.md Step 8 for the honest note about the one manual assembly step this leaves for the owner. |

These are carousel-specific sizes, not `image-create`'s single-image table
(`references/platform-sizes.md`, in that skill's own folder, deliberately
excludes carousels and points back here). Use this table for a carousel; use
that one for a single image.

## The sealing checklist

A carousel can seal more than one file - most skills in this system seal zero
or one. Every slide that actually gets rendered is its own file and earns its
own line under `sealed:`; a five-slide carousel with five real renders means
five lines, not one.

1. **Only a real render gets sealed.** A slide that stayed a design brief - no
   key, or that one slide's render failed - is never sealed. It has no file
   to hash.
2. **One line per rendered slide, in slide order:**
   ```yaml
   sealed:
     - _<slug>/slide-01.png sha256:<hash>
     - _<slug>/slide-02.png sha256:<hash>
   ```
   Get each hash with `shasum -a 256 _<slug>/slide-0N.png` (`sha256sum` on
   Linux) and use exactly what it prints. Paths are POSIX-style, relative to
   the item's own folder - the same rule as `system/standards/item-model.md`'s
   "Sealed assets."
3. **Seal every rendered slide before the item moves to `review`, never
   after.** The owner's approval has to cover the exact bytes of every slide
   that will actually ship, not just some of them.
4. **A mixed carousel is a normal, honest state.** Some slides rendered, some
   left as briefs - seal only the rendered ones, leave the briefed ones
   unsealed, and say plainly in the handoff which is which and why.
5. **A re-render after the item has already reached `review` is not a quiet
   file swap.** It goes back through the legal status path - `review ->
   changes -> draft` - gets re-rendered and re-sealed like new, then back to
   `review`. Nobody edits a sealed line in place to make an old hash match a
   new file; that is exactly the shortcut `system/standards/item-model.md`
   rules out.
