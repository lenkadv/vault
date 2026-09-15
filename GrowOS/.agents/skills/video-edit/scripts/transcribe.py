#!/usr/bin/env python3
"""
transcribe.py - word-level transcription for video-edit.

Two engines:

  --engine elevenlabs (default)
      ElevenLabs Scribe v2 via API. Needs ELEVENLABS_API_KEY, either already in
      the environment or in a `.env` file in the current working directory
      (KEY=value, one per line). Best accuracy, keyterm prompting (spells brand
      / product names right), optional audio-event tagging (laughter, sighs,
      false starts - real editing signal for the packed transcript, turn on
      with --audio-events).

  --engine local-whisper
      faster-whisper, runs on this machine, no API key, no per-minute cost.
      `pip install faster-whisper` first (not installed by default - this is
      the no-key fallback, not the default path). Slower on a CPU-only laptop,
      no audio-event tagging (the packed transcript just won't show laughter/
      sigh markers - cut decisions still work from pauses and word timing).

Usage:
  python3 transcribe.py video.mp4 --keyterms "BrandName" "ProductName" --audio-events
  python3 transcribe.py video.mp4 --engine local-whisper --model small
  python3 transcribe.py video.mp4 --output transcription.json
"""

import argparse
import json
import os
import subprocess
import sys
import tempfile
import time
from pathlib import Path

VIDEO_EXT = {".mov", ".mp4", ".avi", ".mkv", ".webm", ".m4v", ".wmv"}
AUDIO_EXT = {".wav", ".mp3", ".m4a", ".flac", ".ogg", ".aac"}


def load_dotenv(path=".env"):
    """Load KEY=value pairs from a .env file in the current directory into
    os.environ, without overwriting anything already set. No package needed - this is the whole loader. Point at a different file with --env-file."""
    p = Path(path)
    if not p.exists():
        return
    for line in p.read_text().splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, v = line.split("=", 1)
        os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))


def extract_audio(video_path: str, output_path: str = None) -> str:
    if output_path is None:
        output_path = tempfile.mktemp(suffix=".wav")
    cmd = ["ffmpeg", "-i", video_path, "-vn", "-acodec", "pcm_s16le",
           "-ar", "16000", "-ac", "1", "-y", output_path]
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        raise RuntimeError(f"ffmpeg failed: {r.stderr}")
    return output_path


def resolve_audio(file_path: str):
    """Return (audio_path, temp_path_to_clean_up_or_None)."""
    ext = Path(file_path).suffix.lower()
    if ext in VIDEO_EXT:
        print("Extracting audio from video...", file=sys.stderr)
        tmp = tempfile.mktemp(suffix=".wav")
        return extract_audio(file_path, tmp), tmp
    return file_path, None


def transcribe_elevenlabs(file_path: str, keyterms=None, language=None,
                           tag_audio_events=False) -> list[dict]:
    load_dotenv()
    from elevenlabs import ElevenLabs

    api_key = os.environ.get("ELEVENLABS_API_KEY")
    if not api_key:
        sys.exit(
            "ELEVENLABS_API_KEY not set. Put it in a .env file in this "
            "directory (ELEVENLABS_API_KEY=...) or export it, or use "
            "--engine local-whisper to skip the API entirely."
        )

    audio_path, temp_audio = resolve_audio(str(Path(file_path).resolve()))
    try:
        client = ElevenLabs(api_key=api_key)
        kwargs = {
            "model_id": "scribe_v2",
            "timestamps_granularity": "word",
            "num_speakers": 1,
            "tag_audio_events": tag_audio_events,
        }
        if language:
            kwargs["language_code"] = language
        if keyterms:
            kwargs["keyterms"] = keyterms

        print("Sending to ElevenLabs Scribe v2...", file=sys.stderr)
        t0 = time.time()
        with open(audio_path, "rb") as f:
            response = client.speech_to_text.convert(file=f, **kwargs)
        print(f"Transcription complete in {time.time() - t0:.1f}s", file=sys.stderr)

        words = []
        if getattr(response, "words", None):
            for w in response.words:
                text = w.text if hasattr(w, "text") else str(w.get("text", ""))
                if not text.strip():
                    continue
                entry = {
                    "word": text.strip(),
                    "start": round(w.start if hasattr(w, "start") else w.get("start", 0), 3),
                    "end": round(w.end if hasattr(w, "end") else w.get("end", 0), 3),
                }
                if tag_audio_events:
                    tok_type = w.type if hasattr(w, "type") else (
                        w.get("type", "word") if isinstance(w, dict) else "word")
                    entry["type"] = tok_type or "word"
                words.append(entry)
        return words
    finally:
        if temp_audio and os.path.exists(temp_audio):
            os.remove(temp_audio)


def transcribe_local_whisper(file_path: str, model_size="small", language=None) -> list[dict]:
    try:
        from faster_whisper import WhisperModel
    except ImportError:
        sys.exit("Missing dependency. Run: pip install faster-whisper")

    audio_path, temp_audio = resolve_audio(str(Path(file_path).resolve()))
    try:
        print(f"Loading faster-whisper model '{model_size}' (CPU, int8)...", file=sys.stderr)
        model = WhisperModel(model_size, device="cpu", compute_type="int8")
        print("Transcribing locally (no API, no audio-event tags)...", file=sys.stderr)
        t0 = time.time()
        segments, _info = model.transcribe(
            audio_path, word_timestamps=True, language=language, vad_filter=True)
        words = []
        for seg in segments:
            for w in (seg.words or []):
                text = (w.word or "").strip()
                if not text:
                    continue
                words.append({"word": text, "start": round(w.start, 3), "end": round(w.end, 3)})
        print(f"Local transcription complete in {time.time() - t0:.1f}s", file=sys.stderr)
        return words
    finally:
        if temp_audio and os.path.exists(temp_audio):
            os.remove(temp_audio)


def transcribe_video(file_path: str, engine="elevenlabs", keyterms=None, language=None,
                      output_path=None, tag_audio_events=False, model_size="small") -> list[dict]:
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"File not found: {file_path}")

    if engine == "local-whisper":
        words = transcribe_local_whisper(file_path, model_size=model_size, language=language)
    else:
        words = transcribe_elevenlabs(file_path, keyterms=keyterms, language=language,
                                       tag_audio_events=tag_audio_events)

    if words:
        duration = words[-1]["end"]
        wpm = (len(words) / duration) * 60 if duration > 0 else 0
        print(f"\n--- Metrics ---\nWords: {len(words)}\nDuration: {duration:.1f}s\n"
              f"WPM: {wpm:.0f}", file=sys.stderr)

    if output_path is None:
        output_path = str(Path(file_path).parent / "transcription.json")
    with open(output_path, "w") as f:
        json.dump(words, f, indent=2)
    print(f"Saved to: {output_path}", file=sys.stderr)
    return words


def main():
    ap = argparse.ArgumentParser(description="Transcribe video/audio for video-edit")
    ap.add_argument("file", help="Path to video or audio file")
    ap.add_argument("--engine", choices=["elevenlabs", "local-whisper"], default="elevenlabs")
    ap.add_argument("--keyterms", nargs="+", default=None,
                     help="Brand/product names to bias spelling toward (ElevenLabs only)")
    ap.add_argument("--language", default=None, help="ISO-639 code (auto-detect if omitted)")
    ap.add_argument("--output", default=None, help="Output JSON path (default: transcription.json next to input)")
    ap.add_argument("--audio-events", action="store_true",
                     help="Tag laughter/sighs/etc as audio_event tokens (ElevenLabs only)")
    ap.add_argument("--model", default="small",
                     help="faster-whisper model size: tiny/base/small/medium/large-v3 (local-whisper only)")
    args = ap.parse_args()

    transcribe_video(
        args.file, engine=args.engine, keyterms=args.keyterms, language=args.language,
        output_path=args.output, tag_audio_events=args.audio_events, model_size=args.model,
    )


if __name__ == "__main__":
    main()
