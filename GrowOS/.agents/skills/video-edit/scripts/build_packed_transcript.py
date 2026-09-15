#!/usr/bin/env python3
"""
build_packed_transcript.py - turn a raw transcription.json into a compact,
human-readable packed transcript the editor plans the cut from.

Input  : transcription.json (list of {word,start,end[,type]}), source video.
Output : packed_transcript.md - beats, pauses, audio events, repeated takes.

Usage:
  python3 build_packed_transcript.py transcription.json source.mp4 \
      --output packed_transcript.md

The packed transcript is a read of the footage, not the footage itself. The
planner reads this instead of re-scanning the verbose JSON or re-watching video.
"""

import argparse
import json
import os
import re
import subprocess
import sys
from difflib import SequenceMatcher
from pathlib import Path

PAUSE_THRESHOLD = 0.5      # gap (s) over this ends a beat and becomes a <pause>
RETAKE_MIN_GAP = 3.0       # two phrases must be this far apart to count as a retake
RETAKE_SIMILARITY = 0.75   # SequenceMatcher ratio over this = likely repeated take
PHRASE_LEN = 6             # words per sliding-window phrase
PHRASE_STEP = 3            # window step


def load_tokens(path):
    with open(path) as f:
        toks = json.load(f)
    words, events = [], []
    for t in toks:
        ttype = t.get("type", "word")
        text = (t.get("word") or "").strip()
        if not text:
            continue
        entry = {"text": text, "start": t["start"], "end": t["end"]}
        if ttype == "audio_event":
            events.append(entry)
        else:
            words.append(entry)
    words.sort(key=lambda w: w["start"])
    events.sort(key=lambda e: e["start"])
    return words, events


def build_beats(words):
    """Group words into beats - runs of speech with no pause over the threshold."""
    if not words:
        return []
    beats = []
    cur = [words[0]]
    for prev, w in zip(words, words[1:]):
        gap = w["start"] - prev["end"]
        if gap >= PAUSE_THRESHOLD:
            beats.append(cur)
            cur = [w]
        else:
            cur.append(w)
    beats.append(cur)
    return beats


def detect_retakes(words):
    """Return {phrase_start_time: earlier_time} for phrases said twice.

    Sliding 6-word windows; pairs over 3s apart with similarity > 0.75.
    The prefilter requires the two windows to share at least 2 words - cheap
    enough on long videos, but it does NOT require the same opening word.
    Re-recorded lines often restart differently ("So..." vs "Okay so..."),
    so keying on the first word silently misses most real retakes.
    """
    phrases = []
    for i in range(0, max(0, len(words) - PHRASE_LEN), PHRASE_STEP):
        chunk = words[i:i + PHRASE_LEN]
        text = " ".join(w["text"].lower() for w in chunk)
        phrases.append({
            "text": text,
            "wordset": set(text.split()),
            "start": chunk[0]["start"],
            "end": chunk[-1]["end"],
        })
    retakes = {}
    for i, p1 in enumerate(phrases):
        for p2 in phrases[i + 1:]:
            if p2["start"] - p1["end"] < RETAKE_MIN_GAP:
                continue
            if len(p1["wordset"] & p2["wordset"]) < 2:
                continue
            if SequenceMatcher(None, p1["text"], p2["text"]).ratio() > RETAKE_SIMILARITY:
                # tag the LATER occurrence, point at the earlier one
                retakes.setdefault(round(p2["start"], 2), round(p1["start"], 2))
    return retakes


def detect_false_start(beat, next_beat):
    """A beat is a likely false start if it is a short fragment (<=4 words) and
    the next beat starts soon after sharing its opening word."""
    if next_beat is None or len(beat) > 4:
        return False
    gap = next_beat[0]["start"] - beat[-1]["end"]
    if gap > 1.0:
        return False
    return beat[0]["text"].lower() == next_beat[0]["text"].lower()


def event_label(text):
    """Clean an audio-event token like '(laughter)' into 'laughter'."""
    return re.sub(r"[()\[\]]", "", text).strip().lower() or "event"


def source_duration(video):
    try:
        out = subprocess.run(
            ["ffprobe", "-v", "quiet", "-show_entries", "format=duration",
             "-of", "csv=p=0", video],
            capture_output=True, text=True, timeout=60).stdout.strip()
        return float(out)
    except Exception:
        return None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("transcription")
    ap.add_argument("video")
    ap.add_argument("--output", default="packed_transcript.md")
    args = ap.parse_args()

    if not os.path.exists(args.transcription):
        sys.exit(f"transcription not found: {args.transcription}")

    words, events = load_tokens(args.transcription)
    if not words:
        sys.exit("no word tokens found in transcription")

    beats = build_beats(words)
    retakes = detect_retakes(words)
    dur = source_duration(args.video)

    lines = []
    name = Path(args.video).name
    speech_start = words[0]["start"]
    header = f"# Packed Transcript - {name}\n# source: "
    header += f"{dur:.1f}s | " if dur else ""
    header += f"{len(words)} words | {len(events)} audio events | "
    header += f"speech starts {speech_start:.1f}s"
    lines.append(header)
    lines.append("")

    ev_idx = 0
    for bi, beat in enumerate(beats):
        b_start, b_end = beat[0]["start"], beat[-1]["end"]

        # audio events that fall before this beat starts
        while ev_idx < len(events) and events[ev_idx]["start"] < b_start:
            e = events[ev_idx]
            lines.append(f"<{event_label(e['text'])} {e['end'] - e['start']:.1f}s>")
            ev_idx += 1

        # pause before this beat
        if bi > 0:
            gap = b_start - beats[bi - 1][-1]["end"]
            if gap >= PAUSE_THRESHOLD:
                lines.append(f"<pause {gap:.1f}s>")

        text = " ".join(w["text"] for w in beat)
        line = f"[{b_start:.2f}-{b_end:.2f}] {text}"

        next_beat = beats[bi + 1] if bi + 1 < len(beats) else None
        if detect_false_start(beat, next_beat):
            line += "  <false-start>"

        if round(b_start, 2) in retakes:
            line += f"  [repeat of {retakes[round(b_start, 2)]:.2f}s]"

        lines.append(line)

    # trailing audio events
    while ev_idx < len(events):
        e = events[ev_idx]
        lines.append(f"<{event_label(e['text'])} {e['end'] - e['start']:.1f}s>")
        ev_idx += 1

    # trailing dead air - from the last beat's end (or the last audio event,
    # whichever is later) to the source's own duration. Every gap BETWEEN
    # beats already gets a <pause> line above; this is the one after the
    # LAST beat, which that loop never reaches on its own - without it, a
    # clip that's mostly silence after the final line reads as if the
    # transcript covers the whole source.
    if dur is not None:
        last_end = beats[-1][-1]["end"]
        if events:
            last_end = max(last_end, max(e["end"] for e in events))
        trailing_gap = dur - last_end
        if trailing_gap >= PAUSE_THRESHOLD:
            lines.append(f"<pause {trailing_gap:.1f}s>")

    with open(args.output, "w") as f:
        f.write("\n".join(lines) + "\n")

    print(f"Wrote {args.output}")
    print(f"  beats: {len(beats)} | pauses + events marked | "
          f"repeated takes flagged: {len(retakes)}")


if __name__ == "__main__":
    main()
