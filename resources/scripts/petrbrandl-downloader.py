"""
Stahuje obrazky v plnem rozliseni z katalogu del na petrbrandl.eu.

Pro kazde id nacte detail stranku (http://petrbrandl.eu/katalog-del/detail-dila/?id=N),
vytahne z ni nazev dila a URL hires obrazku (atribut src elementu #detailHires,
napr. http://petrbrandl.eu/lib/mod/brandl/data/hires-temp/public/....jpg) a stahne ho.

Neexistujici id vraci HTTP 200 s prazdnym #detailHires src - takove id se preskoci.

Pouziti:
    python petrbrandl-downloader.py --id 33
    python petrbrandl-downloader.py --start 1 --end 300 --output "G:\\Muj disk\\vault\\resources\\petrbrandl-images"
"""

import argparse
import os
import re
import time
import unicodedata

import requests

BASE = "http://petrbrandl.eu"
DETAIL_URL = BASE + "/katalog-del/detail-dila/?id={id}"

HIRES_RE = re.compile(r'id="detailHires"\s+src="([^"]*)"')
NAZEV_RE = re.compile(r'<span>N[aá]zev:</span><span>([^<]*)</span>')
AUTOR_RE = re.compile(r'<span>Autor:</span><span>([^<]*)</span>')


def slugify(text: str) -> str:
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode("ascii")
    text = re.sub(r"[^\w\s-]", "", text).strip().lower()
    text = re.sub(r"[\s_-]+", "-", text)
    return text or "bez-nazvu"


def fetch_detail(session: requests.Session, dilo_id: int) -> dict | None:
    resp = session.get(DETAIL_URL.format(id=dilo_id), timeout=30)
    resp.raise_for_status()
    html = resp.text

    hires_match = HIRES_RE.search(html)
    if not hires_match or not hires_match.group(1):
        return None  # neexistujici nebo obrazek bez hires verze

    nazev_match = NAZEV_RE.search(html)
    autor_match = AUTOR_RE.search(html)

    return {
        "id": dilo_id,
        "hires_url": hires_match.group(1),
        "nazev": nazev_match.group(1).strip() if nazev_match else "",
        "autor": autor_match.group(1).strip() if autor_match else "",
    }


def download_image(session: requests.Session, url: str, dest_path: str) -> None:
    resp = session.get(url, timeout=60)
    resp.raise_for_status()
    with open(dest_path, "wb") as f:
        f.write(resp.content)


def main():
    parser = argparse.ArgumentParser(description="Stahovac hires obrazku z petrbrandl.eu")
    parser.add_argument("--id", type=int, help="Stahnout jen jedno konkretni id")
    parser.add_argument("--start", type=int, help="Pocatecni id rozsahu")
    parser.add_argument("--end", type=int, help="Koncove id rozsahu (vcetne)")
    parser.add_argument("--output", default="petrbrandl-images", help="Slozka pro ulozeni obrazku")
    parser.add_argument("--delay", type=float, default=0.5, help="Pauza mezi requesty ve vterinach (default 0.5)")
    args = parser.parse_args()

    if args.id is None and (args.start is None or args.end is None):
        parser.error("zadej --id NEBO --start a --end")

    ids = [args.id] if args.id is not None else range(args.start, args.end + 1)

    os.makedirs(args.output, exist_ok=True)

    session = requests.Session()
    session.headers.update({"User-Agent": "Mozilla/5.0 (research script)"})

    found, skipped = 0, 0
    for dilo_id in ids:
        try:
            info = fetch_detail(session, dilo_id)
        except requests.RequestException as e:
            print(f"[{dilo_id}] chyba pri nacitani stranky: {e}")
            continue

        if info is None:
            print(f"[{dilo_id}] preskoceno (neexistuje nebo bez hires obrazku)")
            skipped += 1
            continue

        ext = os.path.splitext(info["hires_url"])[1] or ".jpg"
        filename = f"{dilo_id:04d}_{slugify(info['nazev'])}{ext}"
        dest_path = os.path.join(args.output, filename)

        if os.path.exists(dest_path):
            print(f"[{dilo_id}] uz existuje, preskakuji: {filename}")
            found += 1
            continue

        try:
            download_image(session, info["hires_url"], dest_path)
            print(f"[{dilo_id}] stazeno: {filename}")
            found += 1
        except requests.RequestException as e:
            print(f"[{dilo_id}] chyba pri stahovani obrazku: {e}")

        time.sleep(args.delay)

    print(f"\nHotovo. Stazeno/existujicich: {found}, preskoceno: {skipped}")


if __name__ == "__main__":
    main()
