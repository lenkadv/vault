# Setup

What this skill needs installed, and how to check it's actually there before
starting a job. Run the checks in §5 first - a missing dependency found five
minutes into a render wastes the render.

## 1. ffmpeg (required, always)

**Mac:**
```bash
brew install ffmpeg
```

**Windows:**
```powershell
winget install ffmpeg
```
(or grab a "full" build from gyan.dev / BtbN - both ship the caption-burning
codec by default. A minimal/self-compiled ffmpeg can be missing it silently,
see the pre-flight check below.)

Verify captions will actually burn in (needs `libass`):
```bash
ffmpeg -filters | grep ass
```
No output means captions can't render - reinstall with a full build.

## 2. Python 3.11+

Check with `python3 --version`. Every bundled script (`scripts/*.py`) is pure
standard library plus the two optional packages below - nothing else to
install for the core pipeline.

## 3. Transcription - pick one

**Default: ElevenLabs Scribe (your own key).** Best accuracy, keyterm
prompting (spells brand/product names right), optional audio-event tagging
that the retake/pause detection in `build_packed_transcript.py` uses.

1. Sign up at elevenlabs.io, get an API key.
2. Put it in a `.env` file in the folder you're running this from:
   ```
   ELEVENLABS_API_KEY=your-key-here
   ```
3. Install the client: `pip install elevenlabs`

This is pay-per-use - check ElevenLabs' current pricing before a long job.

**No-key fallback: local Whisper.** No account, no per-minute cost, runs on
this machine.

```bash
pip install faster-whisper
```

```bash
python3 .claude/skills/video-edit/scripts/transcribe.py video.mp4 \
    --engine local-whisper --model small
```

Model size trade-off (CPU-only, no GPU assumed): `tiny`/`base` are fast but
noticeably less accurate; `small` is the default and a reasonable balance;
`medium`/`large-v3` are meaningfully slower on a CPU-only laptop but more
accurate. This path has no audio-event tagging - the packed transcript just
won't show laughter/sigh markers, which slightly weakens retake detection but
doesn't break it (pause and word-repeat detection both still work).

## 4. Optional extras

**Better denoise** (`scripts/master_audio.py` uses ffmpeg's own denoise
filter without this, but the result is weaker):
```bash
pip install noisereduce soundfile
```

**Hero-word caption effect** (off by default - see
`references/captions.md` §3 before turning this on, it's a real dependency
and a real render-time cost):
```bash
pip install rembg pymatting pillow
```

**Multi-camera sync** (only if the footage has 2+ camera angles - see
`references/multicam.md`):
```bash
pip install numpy scipy
```

## 5. Pre-flight check

Run before starting any job:

```bash
ffmpeg -version >/dev/null 2>&1 && echo "ffmpeg: OK" || echo "ffmpeg: MISSING"
ffmpeg -version >/dev/null 2>&1 && { ffmpeg -filters | grep -q ass && echo "libass: OK" || echo "libass: MISSING - captions won't burn in"; }
python3 -c 'import sys; ok = sys.version_info >= (3, 11); print("python3: OK" if ok else "python3: TOO OLD - needs 3.11+"); sys.exit(0 if ok else 1)'
python3 -c "import elevenlabs" 2>/dev/null && echo "elevenlabs: OK" || echo "elevenlabs: not installed (fine if using local-whisper)"
python3 -c "import faster_whisper" 2>/dev/null && echo "faster-whisper: OK" || echo "faster-whisper: not installed (fine if using ElevenLabs)"
```

(The libass line only runs when ffmpeg exists - a missing ffmpeg is one
problem, not two. The python3 line checks the 3.11+ floor stated in §2, not
just the version string.)

If both transcription paths are missing, stop and give the owner the choice
of which one to install - don't pick for them, and don't guess and fail
mid-job.

If the owner declines an install, or it can't run here, the skill continues
in plan-only mode - see `SKILL.md` Step 0.

## 6. Windows - honest caveat

This skill's scripts were written to be portable (pure Python arithmetic
instead of `bc`, no hardcoded Unix paths, no repo-root directory hunting for
`.env`), but the end-to-end pipeline has not actually been run on Windows.
If something breaks - a path separator, a quoting difference in a subprocess
call, a font that isn't where expected - that's genuinely useful information:
report exactly what failed and where, rather than working around it silently.
The ffmpeg commands themselves are identical cross-platform; the most likely
friction points are font availability (Arial Black should be stock on
Windows too, but verify) and Python environment setup for anyone who isn't
already comfortable with `pip`.
