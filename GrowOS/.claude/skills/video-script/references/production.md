# Video script production — the teleprompter cut and the production brief

**Lineage note.** This notation — the cue vocabulary, the teleprompter-cut
conventions, the one-line-per-shot format — shares its notation layer with
`vsl-write/references/production.md`. Two homes by design: a VSL and a
video script are different crafts with different queues, so each gets its
own file rather than one skill reaching into the other's folder. Read
this file, not that one. Nothing here points into `vsl-write`'s folder,
and none of its VSL-specific section guidance is repeated here — only the
shared notation.

Paths and frontmatter live in SKILL.md's Phase 7; this file is about what
goes inside each part, and inside the annotated master's inline cues.

## The three artifacts, and where each one lives

1. **The annotated master** — `work/video/<slug>.md`, the work item
   itself. Section headers from Phase 3's structure map, the pacing-cue
   brackets below, the hook variants not picked to film, any
   `[PLACEHOLDER: ...]`. This is the drafting copy; nobody reads it on
   camera.
2. **The teleprompter cut** — `_<slug>/teleprompter.md`. Pure spoken
   words. No section headers, no timestamps, no bracket cues of any kind.
   This is the only file the speaker should be looking at.
3. **The production brief** — `_<slug>/production-brief.md`. The editor's
   reference: what is on screen, when, and what to capture that doesn't
   exist yet.

All three parts files live in the item's own underscore folder, per
`system/standards/item-model.md`. Neither part is sealed — SKILL.md's
Phase 7 explains why a script's bytes never leave the machine through this
skill.

## The annotated master's cue vocabulary

Inline, in brackets, at the point in the script where each applies:

```text
[PAUSE]                                    a beat of silence, let a line land
[SLOW]                                     deliver this line slower than the rest
[ENERGY: confident, curious, not hype-y]   a short direction on delivery tone
[B-ROLL: what's on screen during this line] a visual replaces or joins the talking head here
[DEMO: what's on screen during this line]  a screen or product moment happens here
[END]                                      marks the very end of the script
```

Use these sparingly. A script with a bracket on every line is noise, not
direction — they exist for the moments that actually need a note.

## Turning the master into the teleprompter cut

Strip every section header, every timestamp, every bracket cue. What is
left is flowing spoken prose, broken only by a bare `---` between scenes
or major turns. Two conventions carry over because they help a person read
aloud, not because they are drafting metadata:

- **Short line-wrapped chunks.** Break lines at natural breath points, not
  at a fixed character count — the line break itself is the breath cue.
- **Sparing bold** on the handful of words in the whole script that must
  land hard. Not a phrase per sentence — a handful in the whole piece.

Nothing else survives the cut. If a line only makes sense with its
`[ENERGY: ...]` or `[B-ROLL: ...]` note attached, the line needs
rewriting, not a bracket.

## The production brief

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
UGC / native capture
```

Example lines:

```text
- Talking head: direct to camera, confident, casual energy. | Talking head
- Text overlay: the hook line, on screen as it's said. | Animation / motion graphics
```

**Hook variant visuals get their own subsection** when Phase 4 wrote more
than one — sketch the visual concept for each, even though only one gets
filmed, so a swap later needs no new planning.

**A Production Notes footer closes the file**: plain checklists an editor
can run without asking a question.

1. Filming setup — desk or set, lighting, wardrobe, anything about the
   physical shoot.
2. Screen recordings needed — numbered, exact: what to capture, not "a
   demo."
3. Animation or motion graphics needed — numbered, exact: what each one
   shows.

Check `brain/assets/index.md` before calling for new footage or graphics —
something usable may already exist. Check `brain/lessons/` for standing
video corrections (a crop ratio, a pacing habit to avoid) and fold them
into the filming setup checklist rather than leaving them for the editor
to rediscover.

## short-reel additions

Two extra pieces go in `production-brief.md` for this type only, per
SKILL.md Phase 5:

- **The on-screen-text plan** — one line per text beat:
  `- [0:00-0:02] "ON-SCREEN TEXT" — echoes the hook | adds a new point`.
  State whether each beat repeats the spoken words or adds something the
  voice doesn't say; both are legitimate, but the editor needs to know
  which.
- **A safe-zones note** — one plain line flagging that on-screen text and
  key visuals need to sit clear of the platform's own UI (captions bar,
  profile info, like/share/follow buttons). Platforms move this UI over
  time, so check the target platform's current safe-zone guide rather
  than script a fixed pixel or percentage figure as if it were permanent.
