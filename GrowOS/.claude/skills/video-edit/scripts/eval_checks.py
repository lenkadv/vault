#!/usr/bin/env python3
"""
eval_checks.py - programmatic defect checks for the self-eval loop.

Input  : rendered .mp4, the edl.json it was rendered from, transcription.json.
Output : defects.json - pass/fail checks plus a list of fixable defects.

Usage:
  python3 eval_checks.py edit_v1.mp4 edl.json transcription.json \
      --output defects.json

This covers only the checks a script can measure (specs, loudness, silence,
mid-word cuts, scene count). Glitch frames and face framing need a human eye - see references/pipeline.md for those.
"""

import argparse
import json
import os
import re
import subprocess
import sys


def run(cmd):
    return subprocess.run(cmd, capture_output=True, text=True)


def probe(path):
    out = run(["ffprobe", "-v", "quiet", "-print_format", "json",
               "-show_streams", "-show_format", path]).stdout
    return json.loads(out) if out.strip() else {}


def measure_loudness(path):
    r = run(["ffmpeg", "-i", path, "-af", "loudnorm=print_format=json",
             "-f", "null", "/dev/null"])
    m = re.search(r"\{[^{}]*\"input_i\"[^{}]*\}", r.stderr, re.DOTALL)
    if not m:
        return None
    try:
        return json.loads(m.group(0))
    except Exception:
        return None


def detect_silences(path):
    r = run(["ffmpeg", "-i", path, "-af", "silencedetect=n=-30dB:d=0.5",
             "-f", "null", "/dev/null"])
    sil = []
    for m in re.finditer(r"silence_start: ([\d.]+).*?silence_end: ([\d.]+)",
                         r.stderr, re.DOTALL):
        sil.append((float(m.group(1)), float(m.group(2))))
    return sil


def scene_count(path):
    r = run(["ffmpeg", "-i", path, "-vf", "select='gt(scene,0.15)',showinfo",
             "-vsync", "vfr", "-f", "null", "/dev/null"])
    return len(re.findall(r"showinfo", r.stderr))


def compute_segment_offsets(segments):
    """Cumulative output-time offset for each EDL segment, in EDL order.

    Duplicated from generate_captions.py's function of the same name -
    render_edl.py is the source of truth for this math (see the comment
    there). Duplicating it here keeps this script a standalone, stdlib-only
    CLI tool with no cross-import between the skill's own scripts.
    """
    offsets = []
    cum = 0.0
    for seg in segments:
        offsets.append(cum)
        cum += float(seg["end"]) - float(seg["start"])
    return offsets


def parse_ass_events(path):
    """Pull (start_seconds, end_seconds) for every Dialogue line in an .ass
    file written by generate_captions.py. Minimal parse - just the two
    timestamp fields every Dialogue line carries in a fixed position
    (`Dialogue: 0,START,END,Style,Name,MarginL,MarginR,MarginV,Effect,Text`)."""
    time_re = re.compile(r"^(\d+):(\d{2}):(\d{2}(?:\.\d+)?)$")

    def to_seconds(t):
        m = time_re.match(t.strip())
        if not m:
            return None
        h, mnt, s = m.groups()
        return int(h) * 3600 + int(mnt) * 60 + float(s)

    events = []
    try:
        with open(path) as f:
            text = f.read()
    except OSError:
        return events
    for line in text.splitlines():
        if not line.startswith("Dialogue:"):
            continue
        fields = line[len("Dialogue:"):].split(",", 9)
        if len(fields) < 3:
            continue
        start, end = to_seconds(fields[1]), to_seconds(fields[2])
        if start is not None and end is not None:
            events.append((start, end))
    return events


# A segment is flagged only when a MEANINGFUL share of its own speech has no
# caption over it - not merely "some caption event happens to overlap the
# segment's output window somewhere" (the old, gameable check: a single
# stray/mistimed event anywhere in a 30s window silenced the whole check for
# that segment, even with 98% of its speech uncaptioned). Coverage is
# measured per spoken word, in OUTPUT time, against the real caption events -
# a word counts as covered only for the seconds a caption event actually
# overlaps it. 50% is the line: it catches the real failure mode (one
# accidental event covering a sliver of the segment) while tolerating the
# normal, expected gaps a real caption track has (stripped filler words, the
# small gap between phrases, a highlight word's own micro-timing) - none of
# those come anywhere near eating half a segment's speech.
UNCOVERED_FRACTION_THRESHOLD = 0.5


def check_caption_coverage(segments, words, caption_events):
    """Per kept EDL segment: does the transcript show speech in it, and if
    so, is a meaningful share of that speech actually covered by a caption
    event, measured in OUTPUT time? This is the net that would have caught
    the source/output timestamp bug - captions timed on source time silently
    missing every segment after the first - and also catches a caption track
    that is captioning the wrong thing while still lightly touching the
    segment's output window (one stray event no longer buys a whole segment
    a silent pass). Pure timestamp-set math - no ffmpeg, no rendering, cheap
    by design.

    `segments` - the EDL's kept segments (source-time start/end).
    `words` - transcription.json tokens (source-time start/end).
    `caption_events` - (start_seconds, end_seconds) pairs already in OUTPUT
    time, e.g. from parse_ass_events().
    """
    offsets = compute_segment_offsets(segments)
    defects = []
    for seg, off in zip(segments, offsets):
        s_start, s_end = float(seg["start"]), float(seg["end"])
        seg_words = [w for w in words if w["start"] < s_end and w["end"] > s_start]
        if not seg_words:
            continue
        out_start, out_end = off, off + (s_end - s_start)

        speech_total = 0.0
        uncovered_total = 0.0
        for w in seg_words:
            # clip the word to the segment's own source range, same as
            # remap_words_to_output() does, then map it onto OUTPUT time
            w_start = max(float(w["start"]), s_start)
            w_end = min(float(w["end"]), s_end)
            dur = w_end - w_start
            if dur <= 0:
                continue
            out_w_start = off + (w_start - s_start)
            out_w_end = off + (w_end - s_start)
            covered_dur = 0.0
            for ev_start, ev_end in caption_events:
                ov_start = max(out_w_start, ev_start)
                ov_end = min(out_w_end, ev_end)
                if ov_end > ov_start:
                    covered_dur += ov_end - ov_start
            speech_total += dur
            uncovered_total += dur - min(covered_dur, dur)

        if speech_total <= 0:
            continue
        uncovered_fraction = uncovered_total / speech_total
        if uncovered_fraction > UNCOVERED_FRACTION_THRESHOLD:
            covered_pct = (1 - uncovered_fraction) * 100
            defects.append({
                "type": "caption_gap", "timestamp": round(out_start, 2),
                "detail": f"segment {seg.get('id', '?')} ({s_start:.2f}-{s_end:.2f}s "
                          f"source) has speech but only {covered_pct:.0f}% of it is "
                          f"covered by a caption over output window "
                          f"{out_start:.2f}-{out_end:.2f}s",
                "fix": "captions missing for this segment - regenerate with "
                       "--edl or check remapping",
            })
    return defects


def resolve_caption_coverage_check(edl, captions_path_arg, words):
    """Decide what the caption_coverage check entry should be: run the real
    check against a captions file, warn a given file wasn't found, or - when
    nothing at all was given (the normal state at Step 5, before captions
    exist) - say so plainly instead of silently producing no entry at all.
    That silence used to let a caption track ship without ever being
    checked, with no line anywhere saying it hadn't run.

    Returns (check_dict, cov_defects) - cov_defects is always a list (empty
    when nothing was actually checked).
    """
    captions_path = captions_path_arg
    if not captions_path:
        sub = next((o for o in edl.get("overlays", []) if o.get("type") == "subtitle"), None)
        captions_path = sub.get("file") if sub else None

    if captions_path and os.path.exists(captions_path):
        cap_events = parse_ass_events(captions_path)
        cov_defects = check_caption_coverage(edl.get("segments", []), words, cap_events)
        check = {"name": "caption_coverage",
                 "status": "pass" if not cov_defects else "fail",
                 "detail": ("every speech segment has a caption" if not cov_defects
                            else f"{len(cov_defects)} segment(s) missing caption coverage")}
        return check, cov_defects

    if captions_path:
        check = {"name": "caption_coverage", "status": "warn",
                 "detail": f"captions file not found: {captions_path}"}
        return check, []

    check = {"name": "caption_coverage", "status": "warn",
             "detail": "no --captions given and the EDL carries no subtitle "
                       "overlay - caption coverage was NOT checked, not a pass"}
    return check, []


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("video")
    ap.add_argument("edl")
    ap.add_argument("transcription")
    ap.add_argument("--output", default="defects.json")
    ap.add_argument("--captions", default=None,
                     help="path to the burned-in .ass file, for the caption-coverage "
                          "check; falls back to the EDL's overlays subtitle entry "
                          "(type: subtitle) when omitted")
    ap.add_argument("--target-lufs", type=float, default=-16.0,
                     help="integrated loudness target (default -16, same for every mode)")
    ap.add_argument("--lufs-tolerance", type=float, default=1.0,
                     help="acceptable +/- band around the target (default 1.0 LU)")
    args = ap.parse_args()

    with open(args.edl) as f:
        edl = json.load(f)
    with open(args.transcription) as f:
        words = [w for w in json.load(f) if w.get("type", "word") == "word"]

    checks, defects = [], []

    # --- spec match -------------------------------------------------------
    info = probe(args.video)
    streams = info.get("streams", [])
    v = next((s for s in streams if s["codec_type"] == "video"), {})
    a = next((s for s in streams if s["codec_type"] == "audio"), {})
    out = edl.get("output", {})
    rw, rh = v.get("width"), v.get("height")
    fps = eval(v["r_frame_rate"]) if v.get("r_frame_rate") else None
    dur = float(info.get("format", {}).get("duration", 0) or 0)

    if (rw, rh) == (out.get("width"), out.get("height")):
        checks.append({"name": "resolution", "status": "pass",
                       "detail": f"{rw}x{rh}"})
    else:
        checks.append({"name": "resolution", "status": "fail",
                       "detail": f"got {rw}x{rh}, EDL wants "
                                 f"{out.get('width')}x{out.get('height')}"})
        defects.append({"type": "spec_mismatch", "timestamp": None,
                        "detail": f"resolution {rw}x{rh}",
                        "fix": "fix EDL output block / re-render"})

    want_fps = out.get("fps")
    if fps and want_fps and abs(fps - want_fps) > 0.5:
        checks.append({"name": "fps", "status": "fail",
                       "detail": f"got {fps:.2f}, want {want_fps}"})
        defects.append({"type": "spec_mismatch", "timestamp": None,
                        "detail": f"fps {fps:.2f}", "fix": "fix EDL output fps"})
    else:
        checks.append({"name": "fps", "status": "pass",
                       "detail": f"{fps:.2f}" if fps else "unknown"})

    vcodec = v.get("codec_name")
    checks.append({"name": "video_codec",
                   "status": "pass" if vcodec == "h264" else "warn",
                   "detail": str(vcodec)})
    abr = int(a.get("bit_rate", 0) or 0)
    checks.append({"name": "audio",
                   "status": "pass" if a.get("codec_name") == "aac" and abr >= 256000
                   else "warn",
                   "detail": f"{a.get('codec_name')} {abr // 1000}kbps"})

    # --- loudness ---------------------------------------------------------
    loud = measure_loudness(args.video)
    if loud:
        ii = float(loud.get("input_i", 0))
        tp = float(loud.get("input_tp", 0))
        lo, hi = args.target_lufs - args.lufs_tolerance, args.target_lufs + args.lufs_tolerance
        ok = lo <= ii <= hi and tp < -1.0
        checks.append({"name": "loudness",
                       "status": "pass" if ok else "fail",
                       "detail": f"{ii:.1f} LUFS, TP {tp:.1f} dBTP"})
        if not ok:
            defects.append({"type": "loudness", "timestamp": None,
                            "detail": f"{ii:.1f} LUFS / TP {tp:.1f}",
                            "fix": "re-run scripts/master_audio.py"})
    else:
        checks.append({"name": "loudness", "status": "warn",
                       "detail": "could not measure"})

    # --- silence ----------------------------------------------------------
    sil = detect_silences(args.video)
    long_sil = [(s, e) for s, e in sil if e - s > 0.6]
    trailing = [(s, e) for s, e in sil if dur and e >= dur - 0.15
                and dur - s > 0.3]
    leading = [(s, e) for s, e in sil if s <= 0.1 and e - s > 0.2]
    if not long_sil and not trailing and not leading:
        checks.append({"name": "silence", "status": "pass",
                       "detail": f"{len(sil)} short pauses, none over 0.6s"})
    else:
        checks.append({"name": "silence", "status": "fail",
                       "detail": f"{len(long_sil)} long, "
                                 f"{len(trailing)} trailing, {len(leading)} leading"})
        for s, e in long_sil:
            defects.append({"type": "residual_silence", "timestamp": round(s, 2),
                            "detail": f"{e - s:.1f}s silence at {s:.1f}s",
                            "fix": "split the EDL segment at this silence - first check "
                                   "the transcript for a word overlapping this window; a "
                                   "quietly trailing-off word is speech, not silence - "
                                   "skip the split if a word overlaps"})
        for s, e in trailing:
            defects.append({"type": "trailing_silence", "timestamp": round(s, 2),
                            "detail": f"{dur - s:.1f}s trailing silence",
                            "fix": "lower the last segment's end to last word + 0.15s"})
        for s, e in leading:
            defects.append({"type": "leading_silence", "timestamp": round(s, 2),
                            "detail": f"{e - s:.1f}s leading silence",
                            "fix": "raise the first segment's start to first speech - 0.1s"})

    # --- mid-word cuts ----------------------------------------------------
    # Each EDL segment start/end is a cut in source time. A word whose interval
    # straddles a cut got clipped mid-syllable.
    boundaries = set()
    for seg in edl.get("segments", []):
        boundaries.add(round(float(seg["start"]), 3))
        boundaries.add(round(float(seg["end"]), 3))
    midword = []
    words_sorted = sorted(words, key=lambda w: w["start"])
    for b in sorted(boundaries):
        straddler = next((w for w in words_sorted
                          if w["start"] + 0.05 < b < w["end"] - 0.05), None)
        if not straddler:
            continue
        # Scribe (and most STT engines) pad the end timestamp of a
        # sentence-final word into the trailing silence, so a deliberate
        # trailing-silence trim looks like it splits that word. It is only a
        # real mid-word cut if speech genuinely continues past the boundary - # another word starts soon.
        continues = any(b < w["start"] <= b + 0.5 for w in words_sorted)
        if continues:
            midword.append((b, straddler["word"],
                            straddler["start"], straddler["end"]))
    if midword:
        checks.append({"name": "mid_word_cuts", "status": "fail",
                       "detail": f"{len(midword)} cuts land inside a word"})
        for b, word, ws, we in midword:
            defects.append({"type": "mid_word_cut", "timestamp": round(b, 2),
                            "detail": f"cut at {b:.2f}s splits '{word}' "
                                      f"({ws:.2f}-{we:.2f})",
                            "fix": "shift the cut to the nearest word boundary"})
    else:
        checks.append({"name": "mid_word_cuts", "status": "pass",
                       "detail": "all cuts land between words"})

    # --- caption coverage ---------------------------------------------
    # Catches the source/output timestamp bug: captions timed on source time
    # and burned onto a cut video with 2+ segments silently miss every
    # segment after the first. Pure timestamp-set math against the EDL's own
    # segments - no ffmpeg, no rendering. See resolve_caption_coverage_check
    # for what happens when no captions exist yet (Step 5, before Step 7).
    cap_check, cov_defects = resolve_caption_coverage_check(edl, args.captions, words)
    defects.extend(cov_defects)
    checks.append(cap_check)

    # --- scene count (informational) -------------------------------------
    sc = scene_count(args.video)
    per_min = sc / (dur / 60) if dur else 0
    checks.append({"name": "scene_changes", "status": "info",
                   "detail": f"{sc} scene changes ({per_min:.1f}/min)"})

    result = {
        "video": args.video,
        "edl_version": edl.get("version"),
        "duration": round(dur, 1),
        "checks": checks,
        "defects": defects,
        "clean": len(defects) == 0,
    }
    with open(args.output, "w") as f:
        json.dump(result, f, indent=2)

    print(f"Wrote {args.output}")
    for c in checks:
        print(f"  [{c['status'].upper()}] {c['name']}: {c['detail']}")
    print(f"  -> {len(defects)} defect(s), clean={result['clean']}")


if __name__ == "__main__":
    main()
