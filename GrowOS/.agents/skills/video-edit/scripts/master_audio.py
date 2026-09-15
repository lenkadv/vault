#!/usr/bin/env python3
"""
master_audio.py - the video-edit audio chain: denoise -> EQ -> loudness.

Three stages, in order:
  1. Denoise. Room noise (mains hum, broadband room tone) is steady, so the
     best removal is a clean fingerprint of it subtracted from the whole
     track. Two paths:
       - Preferred: `noisereduce` profile-based spectral subtraction, using a
         4s room-tone fingerprint pulled automatically from the longest
         silence in the ORIGINAL source (the edit has its silences trimmed,
         so the source is the only place clean room tone still exists).
         `pip install noisereduce soundfile` to unlock this path.
       - Fallback (no extra installs): ffmpeg's own `afftdn` blind denoise,
         folded into the same filter chain as the EQ. Weaker than the
         profile method but needs nothing beyond ffmpeg, so the script never
         hard-stops for a missing dependency.
  2. EQ + dynamics. Corrects the typical close-mic recording: high-pass, cut
     the low-mid boom, lift presence, add air, gentle compression.
  3. Loudness. Two-pass loudnorm to -16 LUFS (two-pass measures first, so it
     normalizes cleanly instead of pumping).

Usage:
  python3 master_audio.py EDITED_VIDEO --source ORIGINAL_SOURCE --output FINAL.mp4
  python3 master_audio.py EDITED_VIDEO --noise-profile clip.wav --output FINAL.mp4
  python3 master_audio.py EDITED_VIDEO --output FINAL.mp4   # no source, no profile

  --lra 11   long-form talking head (default).  --lra 2   vertical ad / short-form.

Needs ffmpeg always. `pip install noisereduce soundfile` is optional and only
improves stage 1 - everything else runs with ffmpeg alone.
"""
import argparse
import json
import os
import re
import subprocess
import sys
import tempfile

# The EQ chain. "balanced" is the default; warm/bright are alternates for a
# recording that needs a different flavour.
EQ_CHAINS = {
    "balanced": ("highpass=f=90,equalizer=f=250:t=q:w=1.0:g=-4,"
                 "equalizer=f=3200:t=q:w=0.9:g=3,treble=g=3:f=9000,"
                 "acompressor=threshold=-20dB:ratio=3:attack=20:release=200:makeup=3"),
    "warm":     ("highpass=f=85,equalizer=f=300:t=q:w=1.0:g=-3,"
                 "equalizer=f=3000:t=q:w=0.9:g=2.5,treble=g=2:f=9000,"
                 "acompressor=threshold=-19dB:ratio=3.2:attack=15:release=180:makeup=3.5"),
    "bright":   ("highpass=f=95,equalizer=f=280:t=q:w=1.1:g=-6,"
                 "equalizer=f=3500:t=q:w=0.8:g=4,treble=g=4:f=10000,"
                 "acompressor=threshold=-22dB:ratio=2.5:attack=20:release=220:makeup=3"),
}

# ffmpeg-only blind denoise, prepended to the EQ chain when noisereduce/
# soundfile aren't installed. nf (noise floor) -25dB is a conservative default
# that removes hiss/hum without chewing into voice.
FFMPEG_BLIND_DENOISE = "afftdn=nf=-25"


def run(cmd):
    return subprocess.run(cmd, capture_output=True, text=True)


def python_denoise_available():
    try:
        import numpy  # noqa: F401
        import soundfile  # noqa: F401
        import noisereduce  # noqa: F401
        return True
    except ImportError:
        return False


def find_noise_profile(source, dst):
    """Extract a 4s room-tone clip from the longest silence in `source`."""
    r = run(["ffmpeg", "-i", source, "-af", "silencedetect=n=-40dB:d=2",
             "-f", "null", "/dev/null"])
    gaps = []
    starts = re.findall(r"silence_start: ([\d.]+)", r.stderr)
    durs = re.findall(r"silence_duration: ([\d.]+)", r.stderr)
    for s, d in zip(starts, durs):
        gaps.append((float(d), float(s)))
    if not gaps:
        return None
    dur, start = max(gaps)
    if dur < 2.0:
        return None
    take = min(4.0, dur - 0.4)
    ss = start + (dur - take) / 2
    run(["ffmpeg", "-y", "-ss", f"{ss:.2f}", "-t", f"{take:.2f}", "-i", source,
         "-vn", "-ac", "1", "-ar", "48000", "-acodec", "pcm_s24le", dst])
    return dst if os.path.exists(dst) else None


def python_denoise(in_wav, out_wav, noise_wav):
    """Profile-based (or blind) noise reduction via the noisereduce package."""
    import soundfile as sf
    import noisereduce as nr
    y, sr = sf.read(in_wav)
    if y.ndim > 1:
        y = y.mean(axis=1)
    if noise_wav and os.path.exists(noise_wav):
        n, _ = sf.read(noise_wav)
        if n.ndim > 1:
            n = n.mean(axis=1)
        red = nr.reduce_noise(y=y, sr=sr, y_noise=n, stationary=True, prop_decrease=1.0)
        mode = "profile (noisereduce, stationary, prop_decrease=1.0)"
    else:
        red = nr.reduce_noise(y=y, sr=sr, stationary=False, prop_decrease=0.8)
        mode = "blind (noisereduce, non-stationary) - no noise profile found"
    sf.write(out_wav, red, sr)
    return mode


def two_pass_loudnorm(in_wav, filter_prefix, lra, out_wav):
    """Apply the prefix filter (denoise + EQ) then two-pass loudnorm to -16 LUFS."""
    chain1 = f"{filter_prefix},loudnorm=I=-16:LRA={lra}:TP=-1.5:print_format=json"
    r = run(["ffmpeg", "-i", in_wav, "-af", chain1, "-f", "null", "/dev/null"])
    m = re.search(r"\{[^{}]*\"input_i\"[^{}]*\}", r.stderr, re.DOTALL)
    if not m:
        sys.exit("loudnorm pass-1 measurement failed")
    j = json.loads(m.group(0))
    chain2 = (f"{filter_prefix},loudnorm=I=-16:LRA={lra}:TP=-1.5:linear=true:"
              f"measured_I={j['input_i']}:measured_TP={j['input_tp']}:"
              f"measured_LRA={j['input_lra']}:measured_thresh={j['input_thresh']}:"
              f"offset={j['target_offset']},aresample=48000")
    # loudnorm resamples internally to 192kHz; aresample above and -ar below
    # pin the output back to 48kHz so the muxed file is standard.
    r = run(["ffmpeg", "-y", "-i", in_wav, "-af", chain2,
             "-ar", "48000", "-c:a", "pcm_s24le", out_wav])
    if r.returncode != 0:
        sys.exit(f"loudnorm pass-2 failed: {r.stderr[-300:]}")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("video", help="the edited video to master the audio of")
    ap.add_argument("--source", help="original source video (for the noise profile)")
    ap.add_argument("--noise-profile", help="a clean room-tone .wav, if you have one")
    ap.add_argument("--output", required=True)
    ap.add_argument("--lra", type=int, default=11,
                    help="loudnorm range: 11 for long-form, 2 for ads/shorts")
    ap.add_argument("--tone", default="balanced",
                    choices=list(EQ_CHAINS), help="EQ flavour (default balanced)")
    args = ap.parse_args()

    tmp = tempfile.mkdtemp(prefix="master_audio_")
    log = []

    # 1. extract the edited video's audio
    raw = os.path.join(tmp, "in.wav")
    run(["ffmpeg", "-y", "-i", args.video, "-vn", "-ac", "1", "-ar", "48000",
         "-acodec", "pcm_s24le", raw])

    have_nr = python_denoise_available()
    eq = EQ_CHAINS[args.tone]

    if have_nr:
        # 2a. noise profile (only meaningful with noisereduce available)
        profile = args.noise_profile
        if not profile and args.source:
            profile = find_noise_profile(args.source, os.path.join(tmp, "noise.wav"))
            log.append(f"noise profile: {'extracted from source' if profile else 'NONE found in source'}")
        elif profile:
            log.append(f"noise profile: supplied ({profile})")
        else:
            log.append("noise profile: none (no --source or --noise-profile given)")

        den = os.path.join(tmp, "denoised.wav")
        mode = python_denoise(raw, den, profile)
        log.append(f"denoise: {mode}")
        denoised_input = den
        filter_prefix = eq
    else:
        # 2b. no noisereduce/soundfile - fold ffmpeg's blind afftdn into the
        # same filter chain as the EQ, so denoise still happens with zero
        # extra pip installs. Weaker than the profile method; documented.
        log.append("denoise: ffmpeg afftdn blind fallback "
                    "(pip install noisereduce soundfile for the better profile-based denoise)")
        denoised_input = raw
        filter_prefix = f"{FFMPEG_BLIND_DENOISE},{eq}"

    # 3. EQ (+ denoise if folded in) + two-pass loudnorm
    mastered = os.path.join(tmp, "mastered.wav")
    two_pass_loudnorm(denoised_input, filter_prefix, args.lra, mastered)
    log.append(f"EQ: {args.tone} | loudnorm: -16 LUFS, LRA {args.lra}, TP -1.5 (two-pass)")

    # 4. mux mastered audio back with the original video stream
    r = run(["ffmpeg", "-y", "-i", args.video, "-i", mastered,
             "-map", "0:v", "-map", "1:a", "-c:v", "copy",
             "-c:a", "aac", "-b:a", "320k", "-ar", "48000",
             "-movflags", "+faststart", args.output])
    if r.returncode != 0:
        sys.exit(f"mux failed: {r.stderr[-300:]}")

    # 5. verify loudness
    v = run(["ffmpeg", "-i", args.output, "-af", "loudnorm=print_format=json",
             "-f", "null", "/dev/null"])
    vm = re.search(r"\"input_i\"\s*:\s*\"(-?[\d.]+)\"", v.stderr)
    log.append(f"output loudness: {vm.group(1) if vm else '?'} LUFS")

    logpath = args.output + ".audiomaster.log"
    with open(logpath, "w") as f:
        f.write("\n".join(log) + "\n")
    print(f"Mastered -> {args.output}")
    for line in log:
        print(f"  {line}")
    subprocess.run(["rm", "-rf", tmp])


if __name__ == "__main__":
    main()
