# VSL production — the teleprompter cut and the shot list

Two files, two audiences: the person reading the words out loud, and the
person editing the footage afterward. Neither ever sees the annotated
master's section headers, timestamps, or pacing brackets. Paths and
frontmatter are SKILL.md's Phase 7; this file is about what goes inside
each of the two parts files, and inside the annotated master's inline cues.

## The three artifacts, and where each one lives

1. **The annotated master** — `work/video/<slug>.md`, the work item itself.
   Section headers (CAPTURE, CONNECT, ...), the pacing-cue brackets below,
   both hook variants you did not film, the launch/evergreen fork if you
   wrote both. This is the drafting copy; nobody reads it on camera.
2. **The teleprompter cut** — `_<slug>/teleprompter.md`. Pure spoken words.
   No section headers, no timestamps, no bracket cues of any kind. This is
   the only file the speaker should be looking at.
3. **The shot list** — `_<slug>/shot-list.md`. The editor's reference: what
   is on screen, when, and what to capture that does not exist yet.

Both parts files live in the item's own underscore folder, per
`system/standards/item-model.md`. Neither is sealed — SKILL.md's Phase 7
explains why a script's bytes never leave the machine through this skill.

## The annotated master's pacing-cue vocabulary

Inline, in brackets, at the point in the script where each applies:

```text
[PAUSE]                                    a beat of silence, let a line land
[SLOW]                                     deliver this line slower than the rest
[ENERGY: confident, curious, not hype-y]   a short direction on delivery tone
[HUMOR]                                    this line is meant to land as funny
[DEMO: what's on screen during this line]  a screen or product moment happens here
[END]                                      marks the very end of the script
```

Use these sparingly. A script with a bracket on every line is noise, not
direction — they exist for the moments that actually need a note.

## Turning the master into the teleprompter cut

Strip every section header, every timestamp, every bracket cue. What is
left is flowing spoken prose, broken only by a bare `---` between scenes or
major turns (roughly, between the seven parts). Two conventions carry over
because they help a person read aloud, not because they are drafting
metadata:

- **Short line-wrapped chunks.** Break lines at natural breath points, not
  at a fixed character count — the line break itself is the breath cue.
- **Sparing bold** on the handful of words in the whole script that must
  land hard. Not a phrase per sentence — a handful in the whole piece.

Nothing else survives the cut. If a line only makes sense with its
`[ENERGY: ...]` note attached, the line needs rewriting, not a bracket.

## The shot list

One line per shot, same format throughout:

```text
- [Shot type]: [what's on screen] | [source/category]
```

Source/category tags — pick the one that fits:

```text
Talking head / Direct to camera
B-roll / stock
Screen recording
Animation / motion graphics
Photo cutaway
Archive footage
Testimonial card
```

Example lines:

```text
- Talking head: direct to camera, confident, casual energy. | Talking head
- Text overlay: the contrarian claim from CAPTURE, on screen as it's said. | Animation / motion graphics
```

**Hook variant visuals get their own subsection**, even though only one
hook is filmed — sketch the visual concept for all three from CAPTURE, so a
swap later needs no new planning.

**A Production Notes footer closes the file**: three plain checklists an
editor can run without asking a question.

1. Filming setup — desk or set, lighting, wardrobe, anything about the
   physical shoot.
2. Screen recordings needed — numbered, exact: what to capture, not "a
   demo."
3. Animation or motion graphics needed — numbered, exact: what each one
   shows.

Check `brain/assets/index.md` before calling for new footage or graphics —
something usable may already exist. Check `brain/lessons/` for any standing
video-editing corrections (a crop ratio, a pacing habit to avoid) and fold
them into the filming setup checklist rather than leaving them for the
editor to rediscover.

## The pricing-fork recording note

If OFFER was written with both a launch and an evergreen version
(`references/structure.md`, OFFER), say so plainly at the top of the shot
list: which paragraph needs two takes, and that everything else in the
script is one shared recording. This is the only place in a normal VSL
where "record this twice" is a real instruction — flag it, do not bury it
in the middle of the shot list.
