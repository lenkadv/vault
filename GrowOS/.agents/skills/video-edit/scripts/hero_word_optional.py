#!/usr/bin/env python3
"""
hero_word_optional.py - OPTIONAL: composite one word BEHIND the subject for a
cinematic depth beat (the subject's head/shoulders occlude the word).

This is off by default and NOT part of the core video-edit pipeline. It needs
a background-removal model that is not installed by default:

    pip install rembg pymatting pillow

First run downloads the `u2net_human_seg` segmentation model (~176 MB) to
~/.u2net/. Matting runs CPU-only (~1s/frame) - do not use GPU/CoreML, both
have known mixed-precision corruption bugs with segmentation models. Because
only the hero's short window gets matted (not the whole clip), a few seconds
of hero costs a minute or two, not the whole runtime. See references/captions.md
before turning this on.

What it does: extracts source frames for a short window around the word,
mattes the subject out of them, draws the word behind the matte with a
scale+fade animation, composites background+word+subject back together, and
writes a short opaque mp4 fragment covering exactly that window. Feed that
fragment into the EDL as a full-frame overlay:

    {"type": "hero", "file": "hero_freedom.mp4", "start": 12.25, "end": 13.6}

render_edl.py already applies any non-subtitle overlay as a full-frame
time-gated replace, so no separate render path is needed.

Usage:
  python3 hero_word_optional.py INPUT_VIDEO --word "Freedom" \
      --start 12.4 --end 13.1 --output hero_freedom.mp4 --font fonts/hero-font.ttf
  python3 hero_word_optional.py --check     # verify rembg/pymatting/PIL are installed
"""
import argparse
import glob
import os
import shutil
import subprocess
import sys
import tempfile

DM_SERIF_URL = "https://github.com/google/fonts/raw/main/ofl/dmserifdisplay/DMSerifDisplay-Regular.ttf"
DEFAULT_HERO_COLOR = "#FFC857"  # neutral amber default; override with --color, or match the rail's --highlight-color


def check_deps():
    ok = True
    for mod in ("rembg", "pymatting", "PIL"):
        try:
            __import__(mod)
            print(f"  [OK] {mod}")
        except ImportError:
            print(f"  [MISSING] {mod}")
            ok = False
    return ok


def run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        sys.exit(f"command failed: {' '.join(cmd)}\n{r.stderr[-500:]}")
    return r


def get_fps(video):
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-select_streams", "v", "-of",
         "default=noprint_wrappers=1:nokey=1", "-show_entries", "stream=r_frame_rate", video],
        capture_output=True, text=True).stdout.strip()
    num, _, den = out.partition("/")
    return float(num) / float(den or 1)


def ensure_font(path):
    if os.path.exists(path):
        return path
    os.makedirs(os.path.dirname(path) or ".", exist_ok=True)
    print(f"No font at {path} - fetching a free open-license display font...", file=sys.stderr)
    run(["curl", "-fsSL", "-o", path, DM_SERIF_URL])
    return path


def hex_to_rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("video", nargs="?")
    ap.add_argument("--word")
    ap.add_argument("--start", type=float)
    ap.add_argument("--end", type=float)
    ap.add_argument("--output", default="hero_word.mp4")
    ap.add_argument("--font", default="fonts/hero-font.ttf")
    ap.add_argument("--color", default=DEFAULT_HERO_COLOR, help="#RRGGBB, no adaptive light/dark fallback yet - spot check the output against the background")
    ap.add_argument("--lead-in", type=float, default=0.15)
    ap.add_argument("--linger", type=float, default=0.8)
    ap.add_argument("--check", action="store_true", help="check dependencies and exit")
    args = ap.parse_args()

    if args.check:
        print("Checking hero-word dependencies:")
        sys.exit(0 if check_deps() else 1)

    if not (args.video and args.word and args.start is not None and args.end is not None):
        sys.exit("need: VIDEO --word W --start S --end E (or --check)")

    if not check_deps():
        sys.exit("Missing dependency. Run: pip install rembg pymatting pillow")

    from rembg import remove, new_session
    from PIL import Image, ImageDraw, ImageFont, ImageFilter

    font_path = ensure_font(args.font)
    fps = get_fps(args.video)
    win_start = max(0.0, args.start - args.lead_in)
    win_end = args.end + args.linger
    win_dur = win_end - win_start

    tmp = tempfile.mkdtemp(prefix="hero_word_")
    src_dir, fg_dir, out_dir = (os.path.join(tmp, d) for d in ("src", "fg", "out"))
    for d in (src_dir, fg_dir, out_dir):
        os.makedirs(d, exist_ok=True)

    # 1. extract just the window's frames
    run(["ffmpeg", "-y", "-ss", f"{win_start:.3f}", "-t", f"{win_dur:.3f}", "-i", args.video,
         "-vf", f"fps={fps}", os.path.join(src_dir, "f_%05d.png")])
    frames = sorted(glob.glob(os.path.join(src_dir, "f_*.png")))
    if not frames:
        sys.exit("no frames extracted for the hero window - check --start/--end against the clip")

    # 2. matte the subject out of each window frame (edge-decontaminated)
    print(f"Matting {len(frames)} frame(s) (CPU, ~1s/frame)...", file=sys.stderr)
    sess = new_session("u2net_human_seg")
    for f in frames:
        with open(f, "rb") as fh:
            data = remove(fh.read(), session=sess, alpha_matting=True,
                          alpha_matting_foreground_threshold=240,
                          alpha_matting_background_threshold=10,
                          alpha_matting_erode_size=10)
        img = Image.open(__import__("io").BytesIO(data)).convert("RGBA")
        r, g, b, a = img.split()
        a = a.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(1.0))
        Image.merge("RGBA", (r, g, b, a)).save(os.path.join(fg_dir, os.path.basename(f)))

    # 3. find head-top from the first matted frame's alpha channel, place the
    #    word just above it (lower third tucks behind hair, rest stays clear)
    first_fg = Image.open(sorted(glob.glob(os.path.join(fg_dir, "*.png")))[0])
    w, h = first_fg.size
    alpha = first_fg.split()[-1]
    head_top = h  # fallback: middle of frame if no subject found
    for y in range(h):
        row = alpha.crop((0, y, w, y + 1))
        if max(row.getdata()) > 40:
            head_top = y
            break
    word_cy = max(0, int(head_top - 0.06 * h * 0.3))

    # 4. draw the hero word (scale+fade in over lead-in, hold, fade out over linger)
    color = hex_to_rgb(args.color)
    target_w = int(w * 0.32)
    base_font_size = 120
    font = ImageFont.truetype(font_path, base_font_size)
    bbox = font.getbbox(args.word)
    text_w = bbox[2] - bbox[0] or 1
    font_size = max(24, int(base_font_size * target_w / text_w))
    font = ImageFont.truetype(font_path, font_size)

    n = len(frames)
    for i, f in enumerate(frames):
        t = win_start + i / fps
        if t < args.start:
            prog = max(0.0, (t - win_start) / max(args.lead_in, 1e-6))
            alpha_mul, scale = prog, 0.85 + 0.15 * prog
        elif t > args.end:
            prog = max(0.0, 1 - (t - args.end) / max(args.linger, 1e-6))
            alpha_mul, scale = prog, 1.0
        else:
            alpha_mul, scale = 1.0, 1.0

        word_img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
        draw = ImageDraw.Draw(word_img)
        fsz = max(10, int(font_size * scale))
        f_scaled = ImageFont.truetype(font_path, fsz)
        bbox = draw.textbbox((0, 0), args.word, font=f_scaled)
        tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
        draw.text((w / 2 - tw / 2, word_cy - th / 2), args.word, font=f_scaled,
                   fill=(*color, int(255 * alpha_mul)))

        base = Image.open(f).convert("RGBA")
        fg = Image.open(os.path.join(fg_dir, os.path.basename(f))).convert("RGBA")
        composite = Image.alpha_composite(base, word_img)
        composite = Image.alpha_composite(composite, fg)
        composite.convert("RGB").save(os.path.join(out_dir, os.path.basename(f)))

    # 5. encode the composited window back to an opaque mp4 fragment
    run(["ffmpeg", "-y", "-framerate", str(fps), "-i", os.path.join(out_dir, "f_%05d.png"),
         "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "16", args.output])

    print(f"Wrote {args.output} - full-frame overlay for [{win_start:.2f}, {win_end:.2f}]s")
    print('Add to the EDL overlays array: '
          f'{{"type": "hero", "file": "{args.output}", "start": {win_start:.2f}, "end": {win_end:.2f}}}')
    shutil.rmtree(tmp, ignore_errors=True)


if __name__ == "__main__":
    main()
