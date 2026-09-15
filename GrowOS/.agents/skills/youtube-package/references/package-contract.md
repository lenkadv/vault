# Package contract

The exact shape of one `youtube-package` item: the file and folder layout,
the item's own frontmatter, and the full skeleton for each of its five
parts plus the item body. `SKILL.md` points here for format detail so its
own flow stays short - read the part of this file your current phase
needs, not the whole thing at once.

## Layout

```
work/video/<video-slug>-package.md          the item (the package overview)
work/video/_<video-slug>-package/
  titles.md
  description.md
  tags.md
  pinned-comment.md
  community-post.md
```

`<video-slug>` comes from the source script item's own slug (drop a
trailing `-script`, if it has one) or a fresh readable slug from the topic
when there is no script item. Nothing in the parts folder carries a
status, appears in the queue, or gets stamped - the item is the one thing
the owner reviews. All five parts will actually be published, so all five
are sealed into the item's own frontmatter before review (see "Sealing the
five parts," below) - the owner's approval has to cover their exact bytes,
not just the pointers to them.

## Item frontmatter

```yaml
---
type: youtube-package
headline: "<video title/topic> - YouTube package"   # a queue label, not one of the five title options
skill: youtube-package
parent: <video script item's id>   # only when Phase 0 found a work item; omit for a transcript/notes or intake source
stage: needs-final-edit   # optional - set only when chapter timestamps are still placeholders
sealed:
  - _<video-slug>-package/titles.md sha256:<64-character hash>
  - _<video-slug>-package/description.md sha256:<64-character hash>
  - _<video-slug>-package/tags.md sha256:<64-character hash>
  - _<video-slug>-package/pinned-comment.md sha256:<64-character hash>
  - _<video-slug>-package/community-post.md sha256:<64-character hash>
---
```

The system stamps `id`, `status`, `business`, `channel` (`video`), and
`created` - never set those by hand. The item is born `draft`; SKILL.md's
Phase 5 moves it to `review` once every gated part has cleared or been
carried over honestly.

**Why `headline` is not the recommended title.** The five options in
`titles.md` are a real decision the owner still makes at review - writing
the recommended one into `headline` would make the queue look like the
choice was already final. `headline` names the WORK, not the winning
option.

## Sealing the five parts

All five parts - `titles.md`, `description.md`, `tags.md`,
`pinned-comment.md`, `community-post.md` - will actually be published, so
all five are sealed into the item's own `sealed:` block, above, before the
item moves `draft -> review`. This is `system/standards/item-model.md`'s
"Sealed assets" rule, the same mechanism `youtube-thumbnail` already uses
for its rendered concepts: the owner's approval covers the exact bytes, not
just a pointer to them, and a part with no sealed line is never published.

Get each hash with `shasum -a 256 <file>` (`sha256sum` on Linux) and use
exactly what it prints. Nobody edits a sealed line to make a check pass -
if a part changes after the item first reaches `review` (a redo, an edited
pinned comment, a regenerated description), take the item back through the
legal path (`review -> changes -> draft`) so the reseal happens before the
owner's next approval, the same as any other post-review change.

## The item body (the package overview)

```markdown
# <video working title or topic> - YouTube package

**Recommended title:** "<title text>" - <one-line why this one, for this video>
**Source:** <the script item's path | the transcript/notes path | "ad-hoc intake, this session">

## Parts
- Titles (5 options) - `_<video-slug>-package/titles.md`
- Description - `_<video-slug>-package/description.md`
- Tags - `_<video-slug>-package/tags.md`
- Pinned comment - `_<video-slug>-package/pinned-comment.md`
- Community post - `_<video-slug>-package/community-post.md`

## Placeholders left for the owner
- <part file> - <what's missing> - <why> (or a single line: "none")

## Notes
<anything else worth one line - e.g. "chapter timestamps wait on the final edit">
```

The recommended title is a recommendation, not a lock - the item body and
the chat handoff both have to make clear the owner can pick any of the
five.

## titles.md

```markdown
# Title options - <video short name>

1. <title> - *<approach name>*
2. <title> - *<approach name>*
3. <title> - *<approach name>*
4. <title> - *<approach name>*
5. <title> - *<approach name>*

**Recommended:** #<n> - <one-line why>
```

Five options, one from each of `references/title-approaches.md`'s five
approaches (curiosity gap, outcome/result, contrast/before-after, bold
statement, person + emotion). 60 characters or fewer each. Front-loaded.
Every option has to be a title the video actually earns - never a hook the
content can't pay off.

## description.md

```markdown
[Line 1 - the hook. Has to work standing completely alone.]
[Line 2 - the payoff or the main keyword, worked in naturally. Also has to
work standing alone - this is the last line visible before "Show more".]

[1-3 sentences: what the viewer learns or gets from this video.]

CHAPTERS:
0:00 <descriptive title, 50 characters or fewer>
<m:ss> <descriptive title>
...

LINKS MENTIONED:
- <label>: <the real url>
...

ABOUT:
<2-3 sentence bio, from brain/business.md and brain/voice.md>

CONNECT:
<real social links, from setup.md or brain/business.md>
```

**Fold rule.** Lines 1-2 are everything visible before YouTube truncates
the description. Nothing past them may be load-bearing for those two lines
to make sense standing alone.

**Chapters.** First chapter always `0:00`. 3-8 chapters total. Titles 50
characters or fewer, descriptive (name the value of that section, never
"Point 1" or "Intro"). Real timestamps when the final edit has them. No
edit yet: keep the real titles (drawn from the script/transcript's own
section structure), let the first chapter's `0:00` stand (every video
starts at zero - that is a fact, not a guess), and mark every LATER time
`[PLACEHOLDER: timestamp - video not yet edited]` - never a guessed
number.

**Links.** Only real ones: the ones Phase 0 found in the script/transcript
or the owner's own intake answer, or the standing site/lead-magnet/social
urls Phase 1 found in `brain/business.md` / `setup.md`. Nothing on file
for something the video clearly references: `[PLACEHOLDER: link]`.

No tags footer here - tags are their own part (`tags.md`). Repeating them
in the description would just be a second, driftable copy of the same
list.

## tags.md

```markdown
# Tags - <video short name>

<tag one>, <tag two>, <tag three>, ...

---
Mix: <n> broad, <n> specific, <n> long-tail, <n> brand
```

15-20 tags total, most important first: broad (3-5), specific (5-8),
long-tail (3-5), brand (1-2). Every tag a real phrase someone might
actually search - no misleading tag, no padding the count with
near-duplicate wording. The mix line is reference for whoever pastes these
into YouTube Studio, not part of the tag list itself.

## pinned-comment.md

```markdown
# Pinned comment - <video short name>

<the comment, exactly as it will be pinned, 2-3 sentences>
```

One angle, picked for this video: a specific question about the content
(never "what did you think?"), a bonus tip that was not in the video, or a
real resource.

## community-post.md

```markdown
# Community post - <video short name>

<the post, exactly as it will be posted, 2-4 sentences>
```

Curiosity about the video without spoiling it. A question or poll shape
when it fits naturally. The owner's own voice - an announcement, not a
trailer voiceover.
