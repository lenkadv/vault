#!/usr/bin/env python3
"""
generate_captions.py - word-level burned-in captions (.ass) from a transcription.

Input  : transcription.json (list of {word,start,end}), a style config.
Output : an .ass subtitle file. Burn it in with:
    ffmpeg -i cut.mp4 -vf "ass=captions.ass" -c:v libx264 -crf <n> -c:a copy out.mp4
  (or let render_edl.py do it - add {"type":"subtitle","file":"captions.ass"}
  to the EDL's `overlays` array and it burns in as the last render pass.)

Style: two tiers. A rail phrase (2-3 words, always) and an optional highlight
word per phrase (one accent color, sparing). Every color/font/size below has a
default, and every default is overridable from brain/brand.md or an interview - see references/captions.md. Nothing here is hardcoded to one brand.

Usage:
  python3 generate_captions.py transcription.json --output captions.ass
  python3 generate_captions.py transcription.json --output captions.ass \
      --font "Arial Black" --primary-color "#FFFFFF" --highlight-color "#FFC857" \
      --font-size 90 --width 1080 --height 1920 --all-caps
  # a cut with 2+ kept segments - remap onto the cut's own timeline first:
  python3 generate_captions.py transcription.json --edl edl.json --output captions.ass

This is text/JSON logic only - no video processing, no external dependency.
"""

import argparse
import json
import re
import sys
from pathlib import Path

# Filler words/phrases stripped before grouping. Pure literal matching - no
# NLP model, cheap, and good enough: these are near-universal spoken-English
# fillers, not brand- or speaker-specific.
FILLER_WORDS = {"uh", "um", "uhh", "umm", "erm"}
FILLER_PHRASES = ["you know", "i mean", "kind of", "sort of"]
FILLER_TRAILING = {"right?", "right", "yeah?"}

NUMBER_RE = re.compile(r"^[\$]?\d[\d,.]*%?$")
STRONG_VERBS = {"build", "replace", "destroy", "launch", "create", "win", "beat", "stop", "start"}
EMOTIONAL_WORDS = {"impossible", "everything", "never", "free", "finally", "instantly", "guaranteed"}
CONTRAST_WORDS = {"but", "instead", "without", "unless"}


def hex_to_ass(hex_color: str, alpha: str = "00") -> str:
    """'#RRGGBB' -> ASS '&HAABBGGRR' (ASS stores color channels reversed)."""
    h = hex_color.lstrip("#")
    if len(h) != 6:
        raise ValueError(f"expected #RRGGBB, got {hex_color!r}")
    rr, gg, bb = h[0:2], h[2:4], h[4:6]
    return f"&H{alpha}{bb}{gg}{rr}".upper()


def load_words(path):
    with open(path) as f:
        toks = json.load(f)
    words = []
    for t in toks:
        if t.get("type", "word") != "word":
            continue
        text = (t.get("word") or "").strip()
        if not text:
            continue
        words.append({"text": text, "start": float(t["start"]), "end": float(t["end"])})
    words.sort(key=lambda w: w["start"])
    return words


def load_edl_segments(edl_path):
    """Load the EDL's kept segments (schema: references/pipeline.md §2) -
    the only piece of the EDL this script needs."""
    with open(edl_path) as f:
        edl = json.load(f)
    segments = edl.get("segments") or []
    if not segments:
        sys.exit(f"EDL has no segments: {edl_path}")
    return segments


def compute_segment_bounds(segments):
    """Output-time END boundary of each EDL segment, in EDL/render order -
    the point on the CUT's own timeline where one shot's footage ends and
    the next begins. The last entry is also the cut's own total output
    duration, since render_edl.py concatenates every segment back-to-back
    with no gap - so one boundary list covers both the mid-cut case and the
    final-phrase case with the same lookup (see build_ass's use of this)."""
    bounds = []
    cum = 0.0
    for seg in segments:
        cum += float(seg["end"]) - float(seg["start"])
        bounds.append(cum)
    return bounds


def compute_segment_offsets(segments):
    """Cumulative output-time offset for each EDL segment, in EDL order.

    render_edl.py is the source of truth for this math - duplicated here
    (not imported) so this script stays a standalone, stdlib-only CLI tool.
    render_edl.py trims each segment from the source at its own start/end,
    resets it to time 0 with `setpts=PTS-STARTPTS`, then concatenates every
    segment's [v][a] pair back-to-back in EDL order (`concat=n=...`). So
    segment i's own first output frame lands at the sum of every earlier
    segment's kept duration - not sorted by source time, EDL order, exactly
    like the concat inputs render_edl.py builds.
    """
    offsets = []
    cum = 0.0
    for seg in segments:
        offsets.append(cum)
        cum += float(seg["end"]) - float(seg["start"])
    return offsets


def remap_words_to_output(words, segments):
    """Map every word's SOURCE-video [start,end] onto the CUT video's output
    timeline, using the EDL's kept segments (see compute_segment_offsets).

    This is the fix for the caption/EDL timing bug: generate_captions.py used
    to time every Dialogue event straight from transcription.json (source
    time), and both burn-in paths (render_edl.py's `overlays`, or a direct
    `ffmpeg -vf ass=` pass) applied those timestamps onto the shorter CUT
    video with no remapping - correct only when there is exactly one kept
    segment starting at 0. Any EDL with 2+ segments silently lost or mistimed
    every caption after the first cut point.

    - A word with no overlap in ANY kept segment was cut away entirely and is
      dropped (nothing is appended for it).
    - A word that overlaps a kept segment maps through that segment's offset.
      If it spans past the segment's own end - a common case; STT engines pad
      a sentence-final word's end timestamp into trailing silence (see
      eval_checks.py's mid-word-cut comment) - it is CLIPPED to the segment's
      end, never stretching into the cut.
    - EDL segments can legitimately overlap in SOURCE time (a replay/highlight
      segment reusing an earlier source range on purpose, or a malformed EDL -
      render_edl.py renders every segment in EDL order with no overlap
      detection). A word inside an overlapping range is physically rendered
      more than once, at a different OUTPUT time each time - so it gets one
      caption event per kept segment it overlaps, not just the first.

    Returns a new list of {"text", "start", "end"} sorted by output start.
    """
    offsets = compute_segment_offsets(segments)
    out = []
    for w in words:
        w_start, w_end = w["start"], w["end"]
        for seg, off in zip(segments, offsets):
            s_start, s_end = float(seg["start"]), float(seg["end"])
            if w_end <= s_start or w_start >= s_end:
                continue  # no overlap with this segment at all
            clipped_start = max(w_start, s_start)
            clipped_end = min(w_end, s_end)
            out.append({
                "text": w["text"],
                "start": off + (clipped_start - s_start),
                "end": off + (clipped_end - s_start),
            })
    out.sort(key=lambda w: w["start"])
    return out


def strip_fillers(words):
    """Remove filler tokens; multi-word filler phrases are matched greedily."""
    out = []
    i = 0
    lowered = [w["text"].lower().strip(".,!?") for w in words]
    while i < len(words):
        matched_phrase = False
        for phrase in FILLER_PHRASES:
            plen = len(phrase.split())
            if " ".join(lowered[i:i + plen]) == phrase:
                i += plen
                matched_phrase = True
                break
        if matched_phrase:
            continue
        w, lw = words[i], lowered[i]
        if lw in FILLER_WORDS:
            i += 1
            continue
        if i == len(words) - 1 and lw in FILLER_TRAILING:
            i += 1
            continue
        out.append(w)
        i += 1
    return out


def group_phrases(words, min_words=2, max_words=3, pause_gap=0.2, hero_windows=None):
    """Group words into display phrases. Breaks at a pause, at max_words, or
    to isolate a word inside a hero window (that word gets its own slot so the
    rail can hand off cleanly if a hero effect is layered on top)."""
    hero_windows = hero_windows or []

    def in_hero(w):
        return any(hw["start"] - 0.05 <= w["start"] <= hw["end"] + 0.05 for hw in hero_windows)

    phrases = []
    cur = []
    for i, w in enumerate(words):
        is_hero = in_hero(w)
        if is_hero and cur:
            phrases.append(cur)
            cur = []
        if is_hero:
            phrases.append([w])
            continue
        if cur:
            gap = w["start"] - cur[-1]["end"]
            if gap >= pause_gap or len(cur) >= max_words:
                phrases.append(cur)
                cur = []
        cur.append(w)
    if cur:
        phrases.append(cur)
    return phrases


def pick_highlight(phrase, highlight_terms, rate, last_highlighted):
    """Pick at most one word per phrase to accent. Sparse and never on two
    consecutive phrases. Priority: numbers > configured keyterms > strong
    verbs > emotional words > contrast words."""
    if last_highlighted or len(phrase) == 0:
        return None
    texts = [w["text"].strip(".,!?").lower() for w in phrase]
    for idx, t in enumerate(texts):
        if NUMBER_RE.match(phrase[idx]["text"]):
            return idx
    for idx, t in enumerate(texts):
        if t in highlight_terms:
            return idx
    for idx, t in enumerate(texts):
        if t in STRONG_VERBS:
            return idx
    for idx, t in enumerate(texts):
        if t in EMOTIONAL_WORDS:
            return idx
    for idx, t in enumerate(texts):
        if t in CONTRAST_WORDS:
            return idx
    return None


def ass_escape(text):
    return text.replace("{", "(").replace("}", ")")


def format_time(t):
    h = int(t // 3600)
    m = int((t % 3600) // 60)
    s = t % 60
    return f"{h}:{m:02d}:{s:05.2f}"


def build_ass(phrases, cfg, highlight_terms, segment_bounds=None):
    header = f"""[Script Info]
ScriptType: v4.00+
PlayResX: {cfg['width']}
PlayResY: {cfg['height']}
WrapStyle: 0

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Default,{cfg['font']},{cfg['font_size']},{cfg['primary_ass']},&H000000FF,&H00000000,&H80000000,-1,0,0,0,100,100,0,0,1,{cfg['outline']},{cfg['shadow']},2,40,40,{cfg['margin_v']},1
Style: Highlight,{cfg['font']},{cfg['font_size']},{cfg['highlight_ass']},&H000000FF,&H00000000,&H80000000,-1,0,0,0,100,100,0,0,1,{cfg['outline']},{cfg['shadow']},2,40,40,{cfg['margin_v']},1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""
    # NOTE: the [Events] Format line above MUST keep the Name column, and every
    # Dialogue line below MUST carry the matching empty field (the ",," after
    # the style). Some libass builds misalign fields and render a stray comma
    # glyph if Name is dropped from either side.

    lines = []
    last_highlighted = False
    for pi, phrase in enumerate(phrases):
        if not phrase:
            continue
        hi_idx = pick_highlight(phrase, highlight_terms, cfg["highlight_rate"], last_highlighted)
        last_highlighted = hi_idx is not None

        words_out = []
        for idx, w in enumerate(phrase):
            text = w["text"]
            if cfg["all_caps"]:
                text = text.upper()
            text = ass_escape(text)
            if idx == hi_idx:
                words_out.append("{\\rHighlight}" + text + "{\\rDefault}")
            else:
                words_out.append(text)
        text_line = " ".join(words_out)

        start, end = phrase[0]["start"], phrase[-1]["end"]
        if end - start < 0.5:
            end = start + 0.5
        # A short phrase's minimum-duration bump must never eat into the next
        # phrase's start - clamp against it (leave a hair of a gap) instead of
        # overlapping two Dialogue lines on screen at once.
        next_phrase = phrases[pi + 1] if pi + 1 < len(phrases) else None
        if next_phrase:
            end = min(end, next_phrase[0]["start"] - 0.01)
        # ...and it must never eat into the NEXT EDL SEGMENT either - a phrase
        # near a cut point can sit far enough from the next phrase that the
        # clamp above never fires, and still bleed onto the next segment's
        # unrelated footage. Clamp against the output-time end of whichever
        # segment this phrase's own start falls inside (the last boundary
        # doubles as the cut's total duration, so this covers the final
        # phrase too - see compute_segment_bounds).
        if segment_bounds:
            seg_end = next((b for b in segment_bounds if b > start), segment_bounds[-1])
            end = min(end, seg_end)
        end = max(end, start + 0.05)
        lines.append(
            f"Dialogue: 0,{format_time(start)},{format_time(end)},Default,,0,0,0,,{text_line}"
        )
    return header + "\n".join(lines) + "\n"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("transcription")
    ap.add_argument("--edl", default=None,
                     help="edl.json - when given, remap every word's source-video time "
                          "onto the cut's OUTPUT timeline before grouping phrases (drops "
                          "words wholly inside a cut region, clips a word that spans a "
                          "keep-boundary at the segment's own end). Omit for captions-only "
                          "mode on an already-cut video - today's behavior, unchanged.")
    ap.add_argument("--output", default="captions.ass")
    ap.add_argument("--width", type=int, default=1080)
    ap.add_argument("--height", type=int, default=1920)
    ap.add_argument("--font", default="Arial Black", help="stock on macOS and Windows")
    ap.add_argument("--font-size", type=int, default=90)
    ap.add_argument("--primary-color", default="#FFFFFF", help="rail text color, #RRGGBB")
    ap.add_argument("--highlight-color", default="#FFC857", help="accent word color, #RRGGBB")
    ap.add_argument("--outline", type=int, default=5)
    ap.add_argument("--shadow", type=int, default=2)
    ap.add_argument("--margin-v", type=int, default=500,
                     help="bottom margin in px - keep captions clear of platform UI chrome")
    ap.add_argument("--all-caps", action="store_true", default=True)
    ap.add_argument("--no-all-caps", dest="all_caps", action="store_false")
    ap.add_argument("--min-words", type=int, default=2)
    ap.add_argument("--max-words", type=int, default=3)
    ap.add_argument("--highlight-rate", type=float, default=0.25,
                     help="target fraction of phrases carrying a highlight word")
    ap.add_argument("--keyterms", nargs="*", default=[],
                     help="brand/product words to prioritize for the highlight color")
    ap.add_argument("--start-at", type=float, default=0.0,
                     help="drop captions before this timestamp (reserve an opening)")
    ap.add_argument("--hero-windows", default=None,
                     help="JSON file or literal JSON: [{\"start\":s,\"end\":e}, ...] - "
                          "these words get their own rail slot left EMPTY, for hand-off "
                          "to the optional hero-word effect (references/captions.md)")
    ap.add_argument("--no-filler-strip", dest="strip_fillers", action="store_false", default=True)
    args = ap.parse_args()

    words = load_words(args.transcription)
    if not words:
        sys.exit("no word tokens in transcription")

    segment_bounds = None
    if args.edl:
        segments = load_edl_segments(args.edl)
        words = remap_words_to_output(words, segments)
        segment_bounds = compute_segment_bounds(segments)
        if not words:
            sys.exit("no words remain after remapping onto the EDL's kept segments")

    words = [w for w in words if w["start"] >= args.start_at]
    if not words:
        sys.exit(f"no words remain after --start-at {args.start_at}")

    if args.strip_fillers:
        words = strip_fillers(words)

    hero_windows = []
    if args.hero_windows:
        raw = args.hero_windows
        data = json.loads(Path(raw).read_text()) if Path(raw).exists() else json.loads(raw)
        hero_windows = data

    phrases = group_phrases(words, args.min_words, args.max_words, hero_windows=hero_windows)

    cfg = {
        "width": args.width, "height": args.height,
        "font": args.font, "font_size": args.font_size,
        "primary_ass": hex_to_ass(args.primary_color),
        "highlight_ass": hex_to_ass(args.highlight_color),
        "outline": args.outline, "shadow": args.shadow, "margin_v": args.margin_v,
        "all_caps": args.all_caps, "highlight_rate": args.highlight_rate,
    }
    highlight_terms = {t.lower() for t in args.keyterms}

    ass = build_ass(phrases, cfg, highlight_terms, segment_bounds=segment_bounds)
    with open(args.output, "w") as f:
        f.write(ass)

    n_hi = sum(1 for line in ass.splitlines() if "\\rHighlight" in line)
    print(f"Wrote {args.output}")
    print(f"  {len(phrases)} phrases | {n_hi} highlighted "
          f"({n_hi / len(phrases) * 100:.0f}% of phrases)")
    if hero_windows:
        print(f"  {len(hero_windows)} hero window(s) left empty in the rail for hand-off")


if __name__ == "__main__":
    main()
