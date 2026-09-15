# Title approaches

This is the one shared home for the five psychological approaches a YouTube
title can take. `youtube-package` owns this file and writes its five title
options from it every time. `youtube-thumbnail` reads it too, for the same
taxonomy, rather than keeping a second copy - when a `youtube-package` item
already exists for a video, its `titles.md` options ARE the title pool
`youtube-thumbnail` pairs against; only when no package exists yet does
`youtube-thumbnail` build fresh titles, and it builds them from the five
approaches below, never an invented sixth one. If you are changing what an
approach means, edit it here, not in a copy.

Everything below is generic craft - the pattern a title can take, not a
claim about how well any of them performs. No approach is "the best"; which
one fits depends on the video, the audience, and what is actually true
about the content. None of the examples below are real titles or measured
results - they are bracketed shapes to fill with this video's own facts.

## The shared rules (every title, every approach)

- **60 characters or fewer.** Past that, YouTube truncates it in search and
  in suggested videos - words in the cut-off part earn nothing.
- **Front-loaded.** The reason to click sits in the first few words, not
  the last - mobile can crop the tail, and search weighs the front of a
  title more than the back.
- **Keeps the promise.** The video has to actually deliver whatever the
  title claims. A title that earns a click the content can't cash costs a
  subscriber, not just a view - "honest" is a craft rule here, not a
  nice-to-have.

## The five approaches

### 1. Curiosity gap

Opens a loop the title does not close - the viewer clicks to find out what
finishes the sentence. Fits a video with a genuine reveal, twist, or
specific unexpected result partway through. Does not fit a video that is
really just a straightforward how-to wearing a mystery's clothes - the gap
has to close on something real inside the video, or the click just teaches
the viewer not to trust the next title.

Pattern examples (fill the brackets with what is actually true of this
video):

- "What Happened When I [did the specific thing]"
- "The [common thing] Nobody Tells You About"
- "Why [surprising outcome] (And What I'd Do Differently)"

Pairs naturally with a thumbnail that holds something back - a blur, a
crop, an arrow pointing at part of the frame the viewer can't quite make
out yet. (The full visual spec for that lives in `youtube-thumbnail`'s own
reference, not here.)

### 2. Outcome / result

Leads with the end state - what changed, what got made, what got solved -
so the click is about wanting the same result, not about curiosity. Fits a
video with a real, specific before/after the script can back up. Never
fits when the "result" would have to be invented, rounded up, or borrowed
from someone else's numbers to sound better.

Pattern examples:

- "[The Outcome] in [Real Timeframe]: How It Actually Went"
- "I Tried [The Thing] For [Real Timeframe] - Here's What Happened"
- "How [The Change] Actually Happened"

Pairs naturally with a thumbnail that shows the after state plainly - the
finished result itself, not a teaser of it.

### 3. Contrast / before-after

Names the gap between two states - the old way and a better one, a mistake
and the fix - so the click is about closing that gap for the viewer. Fits a
video that genuinely compares two approaches or states. Weakest when there
is really only one idea in the video and the "contrast" is manufactured
just to fit the formula.

Pattern examples:

- "[Old Way] vs. [Better Way]: What Actually Changed"
- "Stop [Doing The Thing] - Do This Instead"
- "[Before State] to [After State]: What I'd Change"

Pairs naturally with a split-screen or side-by-side thumbnail layout - two
visible states, not one image trying to imply both.

### 4. Bold statement

A short, direct claim stated flatly, with nothing hedging it. Fits a video
where the owner genuinely holds a strong, defensible opinion the content
backs up start to finish. Wrong for a video that is actually balanced or
exploratory - a bold title over a hedging video is its own kind of broken
promise.

Pattern examples:

- "[The Common Belief] Is Wrong"
- "Stop [The Common Practice]"
- "[The Claim]. No Exceptions."

Pairs naturally with a thumbnail that is mostly large type and very little
else - the claim itself is the whole visual, not a backdrop for it.

### 5. Person + emotion

Puts a real person and a real feeling at the center - the video is a story
first, information second. Fits a video with an actual personal stake (the
owner's own attempt, mistake, or turning point). Never fits when there is
no real person or story behind it - a manufactured emotion reads as exactly
that, and undoes the trust the approach depends on.

Pattern examples:

- "I Was [Honest Emotion] Until [What Changed]"
- "The [Role/Situation] Story I Don't Usually Tell"
- "Why I [A Real, Specific Admission]"

Pairs naturally with a close, expressive face on the thumbnail - the
emotion has to be legible at a glance, before anyone reads a word.

## Using all five together

When `youtube-package` writes the five title options for one video, each
option comes from a DIFFERENT one of the approaches above - one curiosity
gap, one outcome/result, one contrast, one bold statement, one person +
emotion. Five variations on the same lever is not five options; it is one
option wearing four costumes. Not every video earns a strong fit for every
approach - when one genuinely does not fit (no real person or story for
approach 5, say), say so plainly next to that option instead of forcing a
weak title just to fill the slot.

`youtube-thumbnail` follows the same one-per-approach discipline when it
pairs a visual against each title - see that skill's own reference for how
the visual half of a pair gets built.
