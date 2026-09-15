#!/usr/bin/env python3
"""
render_edl.py - render an edit from an EDL (edit decision list).

Input  : edl.json (see references/pipeline.md for the schema).
Output : a rendered .mp4.

Usage:
  python3 render_edl.py edl.json --output edit_v1.mp4

This script makes NO creative decisions. It reads the EDL and builds the ffmpeg
filter graph. If the output is wrong, the EDL is wrong - fix the EDL, not this.
The full filter graph is written next to the output as <output>.filter.txt for
debugging.

An `overlays` array in the EDL (subtitles, and optionally other full-frame
overlays) is applied in order after the segments are concatenated, whatever the
EDL's `mode` is - a captions-only pass on a long-form cut uses the same overlay
path as a vertical ad.
"""

import argparse
import json
import os
import subprocess
import sys


def probe_size(path):
    out = subprocess.run(
        ["ffprobe", "-v", "quiet", "-select_streams", "v:0",
         "-show_entries", "stream=width,height", "-of", "csv=p=0:s=x", path],
        capture_output=True, text=True).stdout.strip()
    try:
        w, h = out.split("x")
        return int(w), int(h)
    except Exception:
        return None, None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("edl")
    ap.add_argument("--output", required=True)
    args = ap.parse_args()

    with open(args.edl) as f:
        edl = json.load(f)

    main_src = edl["source"]["main"]
    broll_src = edl["source"].get("broll")
    sync_offset = edl.get("sync_offset") or 0.0
    out = edl["output"]
    ow, oh, ofps = out["width"], out["height"], out["fps"]
    enc = edl.get("encoding", {})
    crf = enc.get("crf", 18)
    preset = enc.get("preset", "medium")
    abitrate = enc.get("audio_bitrate", "320k")
    presets = edl.get("crop_presets", {})
    segments = edl["segments"]
    if not segments:
        sys.exit("EDL has no segments")

    for p in (main_src, broll_src):
        if p and not os.path.exists(p):
            sys.exit(f"source file not found: {p}")

    src_w, src_h = probe_size(main_src)
    need_scale = (src_w, src_h) != (ow, oh)

    inputs = ["-i", main_src]
    broll_idx = None
    if broll_src:
        broll_idx = 1
        inputs += ["-i", broll_src]

    parts = []
    concat_inputs = []
    for i, seg in enumerate(segments):
        src = seg.get("source", "main")
        start, end = float(seg["start"]), float(seg["end"])
        crop_key = seg.get("crop")
        crop_filter = (presets.get(src, {}) or {}).get(crop_key)

        if src == "broll" and broll_idx is not None:
            vstart, vend = start + sync_offset, end + sync_offset
            vchain = [f"[{broll_idx}:v]trim=start={vstart:.3f}:end={vend:.3f}",
                      "setpts=PTS-STARTPTS"]
        else:
            vchain = [f"[0:v]trim=start={start:.3f}:end={end:.3f}",
                      "setpts=PTS-STARTPTS"]

        if crop_filter:
            vchain.append(crop_filter)
        # ensure the segment ends at output resolution
        joined = ",".join(vchain)
        if "scale=" not in joined and need_scale:
            vchain.append(f"scale={ow}:{oh}:flags=lanczos")
        vchain.append(f"fps={ofps}")
        vchain.append("setsar=1:1")
        parts.append(",".join(vchain) + f"[v{i}];")

        # audio always from the main camera, at the editorial (main) time
        parts.append(
            f"[0:a]atrim=start={start:.3f}:end={end:.3f},"
            f"asetpts=PTS-STARTPTS[a{i}];")
        concat_inputs.append(f"[v{i}][a{i}]")

    n = len(segments)
    graph = "\n".join(parts)
    graph += f"\n{''.join(concat_inputs)}concat=n={n}:v=1:a=1[cv][ca]"

    final_v, final_a = "[cv]", "[ca]"

    # Overlays (full-frame inserts + a subtitle burn-in) apply on top of the
    # concatenated base whenever the EDL carries an `overlays` array - this is
    # not gated to any one mode, so a long-form or multicam EDL can carry a
    # captions-only overlay the same way a vertical ad carries hook/B-roll.
    overlays = edl.get("overlays", [])
    ov_files = [o for o in overlays if o.get("type") != "subtitle" and o.get("file")]
    sub = next((o for o in overlays if o.get("type") == "subtitle"), None)

    cur = final_v
    next_input_idx = (broll_idx + 1) if broll_idx is not None else 1
    for j, ov in enumerate(ov_files):
        inputs += ["-i", ov["file"]]
        idx = next_input_idx + j
        s, e = float(ov["start"]), float(ov["end"])
        graph += (f";\n[{idx}:v]scale={ow}:{oh},setpts=PTS-STARTPTS[ov{j}]"
                  f";\n{cur}[ov{j}]overlay=0:0:enable='between(t,{s:.3f},{e:.3f})'[ovr{j}]")
        cur = f"[ovr{j}]"
    if sub and sub.get("file"):
        sub_path = sub["file"].replace(":", "\\:").replace("'", "\\'")
        graph += f";\n{cur}ass={sub_path}[vsub]"
        cur = "[vsub]"
    final_v = cur

    # write the filter graph to a sidecar file (avoids ARG_MAX, aids debugging)
    filter_path = args.output + ".filter.txt"
    with open(filter_path, "w") as f:
        f.write(graph)

    cmd = [
        "ffmpeg", "-y", *inputs,
        "-filter_complex_script", filter_path,
        "-map", final_v, "-map", final_a,
        "-c:v", "libx264", "-preset", preset, "-crf", str(crf),
        "-r", str(ofps),
        "-c:a", "aac", "-b:a", abitrate,
        "-movflags", "+faststart",
        args.output,
    ]
    print(f"Rendering {n} segments -> {args.output}")
    print(f"  filter graph: {filter_path}")
    log_path = args.output + ".render.log"
    with open(log_path, "w") as log:
        r = subprocess.run(cmd, stdout=log, stderr=subprocess.STDOUT)
    if r.returncode != 0:
        sys.exit(f"ffmpeg failed (rc={r.returncode}). See {log_path}")

    # report
    dur = subprocess.run(
        ["ffprobe", "-v", "quiet", "-show_entries", "format=duration",
         "-of", "csv=p=0", args.output],
        capture_output=True, text=True).stdout.strip()
    print(f"Done. Output duration: {dur}s")


if __name__ == "__main__":
    main()
