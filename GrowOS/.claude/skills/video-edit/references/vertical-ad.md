# Vertical Ad Mode

A single-camera vertical take (phone or webcam, teleprompter or off-the-cuff)
cut down into a tight Meta/Instagram/TikTok ad. Read `references/pipeline.md`
first for the EDL/self-eval/encoding machinery this reuses.

## Format targets

- **Output:** 1080x1920 (9:16), source fps preserved.
- **Length:** most ads land 15-45s. Up to 90s is fine for a story-driven ad;
  past that, it's long-form with a vertical crop, not a "vertical ad" - route
  it to `references/long-form.md` instead and crop at render time.
- **Encoding:** CRF 14, preset fast, LRA 2 on the audio master (see
  `pipeline.md` §4) - short clips get watched on phone speakers in noisy
  places and need a tighter loudness range than long-form.

## The hook has to survive the cut

The first 1-2 seconds decide whether anyone keeps watching. Before finalizing
the cut:

- The opening line must be the strongest line in the take, not necessarily the
  first thing said chronologically. If a stronger hook line exists 20 seconds
  in, the EDL's first segment can point there - the packed transcript is
  read top-to-bottom for content, but segment order in the EDL doesn't have to
  match recording order.
- No slow build. Cut straight into the hook line; no "hey guys," no throat-
  clearing, no pre-roll silence. This is the single most aggressive trim in
  the whole pipeline.
- If the take has multiple hook attempts (common - people re-record their
  opening line more than any other), the packed transcript's `[repeat of Ns]`
  tags usually cluster at the start. Read all the candidates and pick on
  delivery strength, not just "keep the last one" - the retake heuristic
  defaults to the later take, but for a hook line specifically, judge it.

## Cut aggressiveness - tighter than long-form

Vertical ads trim harder than a long-form talking head:

- Remove **every** non-speaking gap, not just the long ones. A 0.4s pause that
  would read as natural breathing room in a 12-minute video reads as dead air
  in a 30-second ad.
- Target cut frequency: a beat change every 3-5 seconds (tighter than
  long-form's 5-7s target in `references/long-form.md`). Constant motion
  keeps a scroll-stopping ad from losing the thumb.
- Crop levels still apply (`normal` / `punched_in` / `tight` - see
  `pipeline.md` for the ffmpeg crop-preset shape and `long-form.md` for the
  emotional-content-to-crop-level table, which applies here too). Instant
  static crops on the cut, never an animated zoom.

## Safe zones

Meta and TikTok both overlay UI chrome on top of the video - profile name,
caption, like/comment/share icons, a progress bar. Anything important placed
under that chrome gets covered.

On a 1080x1920 canvas:

- **Top ~12% (top ~230px):** keep clear of critical text/faces where possible - some placements show a small header here.
- **Bottom ~20% (bottom ~380px):** the densest chrome zone - caption text,
  action buttons, username. This is the zone `references/captions.md`'s
  default `MarginV` is tuned to clear.
- **Left/right ~5% (left/right ~55px):** action buttons sit on the right edge
  on some placements; keep the subject roughly centered.

These are conservative defaults, not a hard spec (placements vary by surface - Feed, Stories, Reels). When in doubt, keep the subject and any burned-in text
inside the center 80% of the frame both axes.

## Filler and retake policy

Same detection as long-form (packed transcript's `<false-start>`,
`[repeat of Ns]`, filler markers) but applied harder - an ad has no room for a
stumble that a 12-minute video could absorb. Drop:

- All false starts, even ones that would read as charming/authentic in a
  longer piece.
- Every earlier take of a repeated line.
- Filler words and hedges ("kind of," "I guess," "you know") unless cutting
  one changes the meaning of the sentence.

## Captions

Burn captions in by default for ad output - most people watch muted in-feed.
Read `references/captions.md` for the caption generator and style config.
Vertical ads are the primary use case that reference file is written for.

## Delivery

Once the self-eval loop (`pipeline.md` §3) is clean and the audio is mastered,
report: final duration, whether it's under the platform's typical placement
limits (60s is the safe universal number if the ad needs to run everywhere),
and the hook line used, so the caller can sanity-check it against the offer.
