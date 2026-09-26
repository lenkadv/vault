"""Japanese with Shun (Podcast) — výběr epizody + stažení auto-titulků.

Použití:
  python shun_fetch.py --processed 276,275        # vybere epizodu podle pravidla
  python shun_fetch.py --ep 276                   # konkrétní epizoda
Výstup: JSON na stdout (ep, id, title, url, upload_date, lines[]).

Pravidlo výběru: nejvyšší číslo EpNNN, které ještě není v --processed
(= nová epizoda, pokud existuje; jinak nejbližší nezpracovaná směrem do minulosti).
Zdroj seznamu: záložka Videos kanálu filtrovaná na „【N5-N4】EpNNN … Podcast"
(playlist „Japanese with Shun (Podcast)" přes yt-dlp vrací jen prvních 100 dílů).
"""
import argparse, json, os, re, subprocess, sys

ENV = {**os.environ, "PYTHONIOENCODING": "utf-8", "PYTHONUTF8": "1"}

CHANNEL = "https://www.youtube.com/@JapanesewithShun/videos"
EP_RE = re.compile(r"\bEp\s?(\d+)\b", re.I)


def list_episodes(limit):
    out = subprocess.run(
        [sys.executable, "-m", "yt_dlp", "--no-update", "--flat-playlist",
         "--playlist-end", str(limit), "--print", "%(id)s\t%(title)s", CHANNEL],
        capture_output=True, text=True, encoding="utf-8", env=ENV, check=True).stdout
    eps = {}
    for line in out.splitlines():
        vid, _, title = line.partition("\t")
        m = EP_RE.search(title)
        if m and "podcast" in title.lower() and "oyasumi" not in title.lower():
            eps.setdefault(int(m.group(1)), (vid, title))
    return eps


def fetch_lines(vid):
    from youtube_transcript_api import YouTubeTranscriptApi
    data = YouTubeTranscriptApi().fetch(vid, languages=["ja"])
    return [s.text for s in data.snippets if s.text.strip()]


def upload_date(vid):
    return subprocess.run(
        [sys.executable, "-m", "yt_dlp", "--no-update", "--skip-download",
         "--print", "%(upload_date)s", f"https://www.youtube.com/watch?v={vid}"],
        capture_output=True, text=True, encoding="utf-8", env=ENV).stdout.strip()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--processed", default="")
    ap.add_argument("--ep", type=int)
    ap.add_argument("--limit", type=int, default=150)
    a = ap.parse_args()
    done = {int(x) for x in a.processed.split(",") if x.strip()}
    eps = list_episodes(a.limit)
    if a.ep:
        target = a.ep
    else:
        todo = sorted((n for n in eps if n not in done), reverse=True)
        if not todo:
            print(json.dumps({"error": "vše v dosahu je zpracované"}, ensure_ascii=False))
            return
        target = todo[0]
    if target not in eps:
        print(json.dumps({"error": f"Ep{target} nenalezena v posledních {a.limit} videích"}, ensure_ascii=False))
        return
    vid, title = eps[target]
    res = {"ep": target, "id": vid, "title": title,
           "url": f"https://www.youtube.com/watch?v={vid}",
           "upload_date": upload_date(vid),
           "newest_on_channel": max(eps),
           "lines": fetch_lines(vid)}
    sys.stdout.reconfigure(encoding="utf-8")
    print(json.dumps(res, ensure_ascii=False, indent=1))


if __name__ == "__main__":
    main()
