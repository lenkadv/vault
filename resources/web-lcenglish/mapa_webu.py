"""Skutečná mapa webu lcenglish.cz (Lenka 261026, Zápisník 261025-2156).

Projde web a zapíše mapa-webu-skutecna.md: všechny stránky, interní odkazy
z každé stránky (kam), externí odkazy, zpětné interní odkazy (odkud sem),
nabízené dárky a vložená videa YouTube. Vedle uloží mapa-webu-data.json
a vypíše rozdíl proti minulému běhu.

Spuštění (z kořene vaultu):  python -I resources/web-lcenglish/mapa_webu.py
Spouští se při weekly review a při „zavírám“ ve vlákně, které měnilo web.

Zdroje stránek: sitemapy Rank Math, REST API WordPressu (i stránky s noindex),
prodejní stránky Leadpages a vše, na co vedou interní odkazy.
Vyskakovací okna Dripu: API Dripu (pole whitelist), klíč DRIP_API_KEY
z GrowOS/lcenglish/.env (jen čte).
"""

import base64
import json
import re
import ssl
import sys
import urllib.request
from collections import defaultdict
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlparse

WEB = "https://lcenglish.cz"
HOST = "lcenglish.cz"
DRIP_ACCOUNT = "2094497"
LEADPAGES_SEEDS = ["/10x-english/", "/irregular/", "/hele/"]
SKIP_PATH = re.compile(
    r"^/(wp-content|wp-json|wp-admin|wp-includes|feed|author|category|tag|comments|xmlrpc\.php|wp-login\.php)"
    r"|/feed/$|/page/\d+/$|\.(jpe?g|png|gif|webp|svg|css|js|xml|ico|woff2?)$",
    re.I,
)
FILE_EXT = re.compile(r"\.(pdf|zip|apkg|mp3|mp4|docx?|xlsx?|pptx?)(\?|$)", re.I)
FREEBIE_HOST = re.compile(r"(lpcontent\.net|lpages\.co|leadpages\.(net|co))$", re.I)
YOUTUBE_ID = re.compile(
    r"(?:youtube(?:-nocookie)?\.com/(?:embed/|watch\?v=|shorts/)|youtu\.be/)([A-Za-z0-9_-]{11})"
)

VAULT = Path(__file__).resolve().parents[2]
OUT_MD = Path(__file__).with_name("mapa-webu-skutecna.md")
OUT_JSON = Path(__file__).with_name("mapa-webu-data.json")
UA = {"User-Agent": "Mozilla/5.0 (mapa webu LCEnglish; Claude pro Lenku)"}


def fetch(url, headers=None, timeout=30, verify=True):
    req = urllib.request.Request(url, headers={**UA, **(headers or {})})
    ctx = None if verify else ssl._create_unverified_context()
    try:
        with urllib.request.urlopen(req, timeout=timeout, context=ctx) as r:
            return r.status, r.geturl(), r.read().decode("utf-8", "replace")
    except urllib.error.HTTPError as e:
        return e.code, url, ""
    except Exception:
        return 0, url, ""


def norm(url, base=WEB):
    """Interní adresa → cesta '/neco/', jinak None."""
    u = urlparse(urljoin(base + "/", url.strip()))
    if u.scheme not in ("http", "https") or u.hostname not in (HOST, "www." + HOST):
        return None
    path = re.sub(r"/{2,}", "/", u.path or "/")
    if not path.endswith("/") and "." not in path.rsplit("/", 1)[-1]:
        path += "/"
    return path


VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"}
NAV_TAGS = {"header", "footer", "nav", "aside"}


class Page(HTMLParser):
    """Odkazy z obsahu stránky odděleně od šablony (hlavička, menu, patička, boční panel, související články)."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.title, self._in_title, self._title_done = "", False, False
        self.links, self.nav_links, self.noindex = [], [], False
        self.leadbox = False
        self._stack = []  # (tag, je_šablona)

    def _in_nav(self):
        return any(n for _, n in self._stack)

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag not in VOID:
            nav = tag in NAV_TAGS or "entry-related" in (a.get("class") or "")
            self._stack.append((tag, nav))
        if tag == "title" and not self._title_done:
            self._in_title = True
        elif tag == "meta" and (a.get("name") or "").lower() == "robots":
            self.noindex = "noindex" in (a.get("content") or "").lower()
        elif tag == "a" and a.get("href"):
            (self.nav_links if self._in_nav() else self.links).append(a["href"])
            if any(k.startswith("data-leadbox") for k in a):
                self.leadbox = True

    def handle_endtag(self, tag):
        if tag == "title" and self._in_title:
            self._in_title, self._title_done = False, True
        for i in range(len(self._stack) - 1, -1, -1):
            if self._stack[i][0] == tag:
                del self._stack[i:]
                break

    def handle_data(self, data):
        if self._in_title:
            self.title += data


def sitemap_paths():
    paths = set()
    for sm in ("page-sitemap.xml", "post-sitemap.xml"):
        _, _, xml = fetch(f"{WEB}/{sm}")
        paths |= {norm(u) for u in re.findall(r"<loc>([^<]+)</loc>", xml)}
    return {p for p in paths if p}


def rest_items(kind):
    items, page = [], 1
    while True:
        st, _, body = fetch(f"{WEB}/wp-json/wp/v2/{kind}?per_page=100&page={page}&_fields=link,type")
        if st != 200:
            break
        batch = json.loads(body)
        if not batch:
            break
        items += batch
        page += 1
    label = {"posts": "článek", "pages": "stránka", "categories": "kategorie"}[kind]
    return {norm(i["link"]): label for i in items}


def drip_popups():
    """{cesta: [nadpis okna]} z formulářů Dripu, které se zobrazují na konkrétních stránkách."""
    env = VAULT / "GrowOS" / "lcenglish" / ".env"
    key = None
    if env.exists():
        m = re.search(r"^DRIP_API_KEY\s*=\s*['\"]?([^'\"\s]+)", env.read_text(encoding="utf-8"), re.M)
        key = m and m.group(1)
    if not key:
        return {}, "klíč Dripu nenalezen, vyskakovací okna vynechána"
    auth = base64.b64encode(f"{key}:".encode()).decode()
    st, _, body = fetch(f"https://api.getdrip.com/v2/{DRIP_ACCOUNT}/forms", {"Authorization": f"Basic {auth}"})
    if st != 200:
        return {}, f"API Dripu vrátilo {st}, vyskakovací okna vynechána"
    out, everywhere = defaultdict(list), []
    for f in json.loads(body).get("forms", []):
        if not f.get("is_widget_enabled"):
            continue
        name = (f.get("headline") or f.get("button_text") or f"formulář {f['id']}").strip()
        label = f"vyskakovací okno Dripu {f['id']}: {re.sub(r'<[^>]+>', '', name)[:80]}"
        if f.get("is_whitelist_enabled") and f.get("whitelist"):
            for u in f["whitelist"]:
                p = norm(u)
                if p:
                    out[p].append(label)
        else:
            everywhere.append(label)
    return dict(out), everywhere


def analyse(path):
    st, final, html = fetch(WEB + path)
    p = Page()
    try:
        p.feed(html)
    except Exception:
        pass
    final_path = norm(final) or path
    leadpages = "lpcontent.net" in html and "leadpages" in html.lower()
    res = classify(p.links + (p.nav_links if leadpages else []), path, final_path)
    nav = classify([] if leadpages else p.nav_links, path, final_path)
    videos = sorted({f"https://www.youtube.com/watch?v={v}" for v in YOUTUBE_ID.findall(html)})
    return {
        "path": path,
        "final": final_path,
        "status": st,
        "title": re.sub(r"\s+", " ", p.title).strip(),
        "noindex": p.noindex,
        "kind": "Leadpages" if leadpages else None,
        **res,
        "nav_internal": nav["internal"],
        "nav_external": nav["external"],
        "videos": videos,
        "leadbox": p.leadbox,
    }


def classify(hrefs, path, final_path):
    internal, external, freebies, files = set(), set(), set(), set()
    for href in hrefs:
        h = href.strip()
        if not h or h.startswith(("#", "mailto:", "tel:", "javascript:")):
            continue
        ip = norm(h, WEB + path)
        if ip:
            if FILE_EXT.search(ip) or ip.startswith("/wp-content/uploads/"):
                files.add(WEB + ip)
            elif not SKIP_PATH.search(ip) and ip != final_path:
                internal.add(ip)
            continue
        u = urlparse(h)
        host = (u.hostname or "").lower()
        if not host:
            continue
        url = f"{u.scheme}://{host}{u.path}" + (f"?{u.query}" if host.endswith("youtube.com") and u.query else "")
        if FREEBIE_HOST.search(host):
            freebies.add(url)
        elif FILE_EXT.search(u.path):
            files.add(url)
        elif not YOUTUBE_ID.search(h):
            external.add(url)
    return {"internal": sorted(internal), "external": sorted(external),
            "freebies": sorted(freebies), "files": sorted(files)}


def crawl():
    kinds = {**rest_items("pages"), **rest_items("posts"), **rest_items("categories")}
    todo = set(kinds) | sitemap_paths() | set(LEADPAGES_SEEDS)
    todo = {p for p in todo if p and not SKIP_PATH.search(p)}
    pages, seen = {}, set()
    with ThreadPoolExecutor(4) as ex:
        while todo:
            batch = sorted(todo - seen)[:400]
            if not batch or len(seen) > 600:
                break
            seen |= set(batch)
            for r in ex.map(analyse, batch):
                pages[r["path"]] = r
            todo = {l for r in pages.values() if r["status"] == 200
                    for l in r["internal"] + r["nav_internal"]} - seen
    for r in pages.values():
        r["kind"] = r["kind"] or kinds.get(r["final"]) or kinds.get(r["path"]) or "jiné"
    return pages


def freebie_titles(urls):
    titles = {}
    def one(u):
        _, _, html = fetch(u, verify=False)  # jen veřejný titulek; Python odmítá certifikát lpcontent.net
        m = re.search(r"<title[^>]*>(.*?)</title>", html, re.S | re.I)
        return u, re.sub(r"\s+", " ", m.group(1)).strip() if m else ""
    with ThreadPoolExecutor(4) as ex:
        for u, t in ex.map(one, sorted(urls)):
            titles[u] = t
    return titles


def build():
    pages = crawl()
    ok = {p: r for p, r in pages.items() if r["status"] == 200 and r["final"] == p}
    redirects = {p: r["final"] for p, r in pages.items() if r["status"] == 200 and r["final"] != p}
    broken = {p: r["status"] for p, r in pages.items() if r["status"] != 200}
    popups, everywhere = drip_popups()

    # Odkazy ze šablony (menu, patička, kategorie, související články) se u stránek neopakují; souhrn jednou.
    common = defaultdict(int)
    for r in ok.values():
        for l in set(r["nav_internal"]) | set(r["nav_external"]):
            common[l] += 1

    back = defaultdict(set)
    for p, r in ok.items():
        for l in r["internal"]:
            back[redirects.get(l, l)].add(p)

    data = {}
    for p, r in sorted(ok.items()):
        data[p] = {
            "title": r["title"],
            "kind": r["kind"],
            "noindex": r["noindex"],
            "internal": r["internal"],
            "external": r["external"],
            "backlinks": sorted(back.get(p, [])),
            "freebies": r["freebies"] + (["Leadbox (vyskakovací formulář Leadpages)"] if r["leadbox"] else []),
            "popups": popups.get(p, []),
            "files": r["files"],
            "videos": r["videos"],
        }
    titles = freebie_titles({f for d in data.values() for f in d["freebies"] if f.startswith("http")})
    nav_back = defaultdict(int)
    for l, c in common.items():
        nav_back[redirects.get(l, l)] += c
    for p in data:
        data[p]["nav_backlinks"] = nav_back.get(p, 0)
    common = [f"{l} ({c}×)" for l, c in sorted(common.items(), key=lambda x: (-x[1], x[0]))]
    return data, common, redirects, broken, everywhere, titles


def diff(old, new):
    lines = []
    for p in sorted(set(new) - set(old)):
        lines.append(f"+ nová stránka {p}")
    for p in sorted(set(old) - set(new)):
        lines.append(f"− zmizela stránka {p}")
    for p in sorted(set(old) & set(new)):
        for key, label in (("internal", "odkaz"), ("external", "externí odkaz"), ("freebies", "dárek"),
                           ("popups", "okno Dripu"), ("videos", "video")):
            a, b = set(old[p].get(key, [])), set(new[p].get(key, []))
            lines += [f"+ {p}: {label} {x}" for x in sorted(b - a)]
            lines += [f"− {p}: {label} {x}" for x in sorted(a - b)]
        a, b = old[p].get("nav_backlinks", 0), new[p].get("nav_backlinks", 0)
        if a != b and max(a, b) >= 20:  # související články se střídají náhodně, hlídat jen menu a patičku
            lines.append(f"~ {p}: odkazy sem ze šablony (menu, patička) {a} → {b}")
    return lines


def write_md(data, common, redirects, broken, everywhere, titles, changes, prev_date):
    now = datetime.now().strftime("%y%m%d %H:%M")
    fb = lambda u: f"{titles.get(u) or u} ({u})" if u.startswith("http") else u
    order = {"stránka": 0, "Leadpages": 1, "kategorie": 2, "jiné": 3, "článek": 4}
    pages = sorted(data, key=lambda p: (order.get(data[p]["kind"], 9), p))
    L = [
        "# Skutečná mapa webu lcenglish.cz",
        "",
        f"**Vygenerováno:** {now} skriptem `resources/web-lcenglish/mapa_webu.py` (neupravovat ručně, přepíše se). "
        "Oblast [[lcenglish]] · z čeho je web postavený a pravidla: [[mapa-webu]] · systémy: [[lcenglish-ekosystem]].",
        "Obnova: při weekly review a při „zavírám“ ve vlákně, které měnilo web nebo Leadpages "
        "(`python -I resources/web-lcenglish/mapa_webu.py`).",
        "",
        f"Stránek: {len(data)} (stránky {sum(d['kind']=='stránka' for d in data.values())}, "
        f"Leadpages {sum(d['kind']=='Leadpages' for d in data.values())}, "
        f"kategorie {sum(d['kind']=='kategorie' for d in data.values())}, "
        f"články {sum(d['kind']=='článek' for d in data.values())}, jiné {sum(d['kind']=='jiné' for d in data.values())}). "
        "Odkazy počítají jen obsah stránky; menu, patička, kategorie a „související články“ jsou souhrnně dole.",
        "",
        f"## Změny od minulé mapy ({prev_date or 'první běh'})",
        "",
    ]
    L += [f"- {c}" for c in changes[:200]] or ["- beze změny" if prev_date else "- první mapa, není s čím srovnávat"]
    if len(changes) > 200:
        L.append(f"- … a dalších {len(changes) - 200} (celé v `mapa-webu-data.json` přes git diff)")
    L += ["", "## Přehled", "",
          "| Stránka | Typ | Odkazy ven (int./ext.) | Vede sem (z obsahu / ze šablony) | Dárky | Videa |",
          "|---|---|---|---|---|---|"]
    for p in pages:
        d = data[p]
        gifts = len(d["freebies"]) + len(d["popups"])
        typ = d["kind"] + (", noindex" if d["noindex"] else "")
        L.append(f"| [{p}]({WEB}{p}) | {typ} | {len(d['internal'])} / {len(d['external'])} | "
                 f"{len(d['backlinks'])} / {d['nav_backlinks']} | {gifts or '–'} | {len(d['videos']) or '–'} |")

    gifts = defaultdict(set)
    for p, d in data.items():
        for f in d["freebies"]:
            gifts[fb(f)].add(p)
        for f in d["popups"]:  # stejný nadpis okna = jeden dárek, ID oken jsou u stránek
            gifts["vyskakovací okno Dripu „" + f.split(": ", 1)[-1] + "“"].add(p)
    L += ["", "## Dárky: co se kde nabízí", ""]
    L += [f"- **{g}** ← {', '.join(sorted(ps))}" for g, ps in sorted(gifts.items())] or ["- nic nenalezeno"]
    if everywhere:
        L += ["", "Vyskakovací okna Dripu bez omezení na stránky (zobrazí se kdekoli):", ""]
        L += [f"- {e}" for e in everywhere]

    vids = defaultdict(set)
    for p, d in data.items():
        for v in d["videos"]:
            vids[v].add(p)
    L += ["", "## Videa YouTube", ""]
    L += [f"- {v} ← {', '.join(sorted(ps))}" for v, ps in sorted(vids.items())] or ["- žádná"]

    orphans = [p for p in pages if not data[p]["backlinks"] and not data[p]["nav_backlinks"] and p != "/"]
    L += ["", "## Na co nevede žádný odkaz z webu", ""]
    L += [f"- {p} ({data[p]['kind']})" for p in orphans] or ["- nic"]
    L += ["", "## Rozbité a přesměrované interní odkazy", ""]
    L += [f"- {p} → chyba {s}" for p, s in sorted(broken.items())]
    L += [f"- {p} → přesměruje na {t}" for p, t in sorted(redirects.items())]
    if not broken and not redirects:
        L.append("- nic")
    L += ["", "## Odkazy ze šablony (menu, patička, kategorie, související články; počet stránek)", ""]
    wide = [c for c in common if int(c.rsplit("(", 1)[1].rstrip("×)")) >= 20]
    L += [f"- {c}" for c in wide] or ["- nic"]
    if len(common) > len(wide):
        L.append(f"- a {len(common) - len(wide)} článků v „souvisejících článcích“ pod jinými články "
                 "(počet je u každé stránky v Přehledu, sloupec Vede sem / ze šablony)")

    L += ["", "## Stránky podrobně", ""]
    for p in pages:
        d = data[p]
        L += [f"### {p}", "", f"{d['title']} · {d['kind']}" + (" · noindex" if d["noindex"] else ""), ""]
        for label, key in (("Interní odkazy", "internal"), ("Externí odkazy", "external"),
                           ("Vede sem", "backlinks"), ("Soubory", "files"), ("Videa", "videos")):
            if d[key]:
                L.append(f"- **{label}:** " + ", ".join(d[key]))
        if d["freebies"] or d["popups"]:
            L.append("- **Dárky:** " + "; ".join([fb(f) for f in d["freebies"]] + d["popups"]))
        L.append("")
    OUT_MD.write_text("\n".join(L), encoding="utf-8")


def main():
    old, prev_date = {}, None
    if OUT_JSON.exists():
        prev = json.loads(OUT_JSON.read_text(encoding="utf-8"))
        old, prev_date = prev.get("pages", {}), prev.get("generated")
    data, common, redirects, broken, everywhere, titles = build()
    changes = diff(old, data) if old else []
    write_md(data, common, redirects, broken, everywhere, titles, changes, prev_date)
    OUT_JSON.write_text(json.dumps({"generated": datetime.now().strftime("%y%m%d %H:%M"), "pages": data},
                                   ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"Stránek {len(data)}, rozbitých {len(broken)}, přesměrování {len(redirects)}.")
    print("\n".join(changes) if changes else ("Beze změny." if old else "První běh."))


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    main()
