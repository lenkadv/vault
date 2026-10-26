"""Skutečná mapa webu lcenglish.cz (Lenka 261026, Zápisník 261025-2156).

Projde web a zapíše mapa-webu-skutecna.md: všechny stránky, interní odkazy
z každé stránky (kam), externí odkazy, zpětné interní odkazy (odkud sem),
nabízené dárky a vložená videa YouTube. Vedle uloží mapa-webu-data.json
a vypíše rozdíl proti minulému běhu.

Spuštění (z kořene vaultu):  python -I resources/web-lcenglish/mapa_webu.py
Spouští se při weekly review a při „zavírám“ ve vlákně, které měnilo web.
Zobrazení stránek čte z mapa-webu-navstevnost.json (Claude ho obnovuje z Metricoolu přes konektor).
Hlídané údaje (resources/lcenglish-hlidane-udaje.md) hledá v textu stránek a v aktivních mailech Dripu.

Zdroje stránek: sitemapy Rank Math, REST API WordPressu (i stránky s noindex),
prodejní stránky Leadpages a vše, na co vedou interní odkazy.
Vyskakovací okna Dripu: API Dripu (pole whitelist), klíč DRIP_API_KEY
z GrowOS/lcenglish/.env (jen čte).
"""

import base64
import html
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
    """Stránky z Leadpages občas neodpoví včas (261026: /irregular/), proto druhý pokus s delším čekáním."""
    st, final, body = _fetch(url, headers, timeout, verify)
    if st == 0 or st >= 500:
        st, final, body = _fetch(url, headers, timeout * 2, verify)
    return st, final, body


def _fetch(url, headers=None, timeout=30, verify=True):
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
        self.text_parts = []  # viditelný text obsahu (bez šablony, skriptů a stylů)

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
        elif not self._in_nav() and not any(t in ("script", "style", "noscript") for t, _ in self._stack):
            self.text_parts.append(data)


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


PAGE_TEXTS = {}
WATCH_FILE = VAULT / "resources" / "lcenglish-hlidane-udaje.md"


def drip_auth():
    env = VAULT / "GrowOS" / "lcenglish" / ".env"
    if not env.exists():
        return None
    m = re.search(r"^DRIP_API_KEY\s*=\s*['\"]?([^'\"\s]+)", env.read_text(encoding="utf-8"), re.M)
    return {"Authorization": "Basic " + base64.b64encode(f"{m.group(1)}:".encode()).decode()} if m else None


def drip_texts():
    """{místo: text} aktivních mailů Dripu: maily ve workflow a v emailových sériích."""
    auth = drip_auth()
    if not auth:
        return {}
    api = f"https://api.getdrip.com/v2/{DRIP_ACCOUNT}"
    getj = lambda u: (lambda st, _, b: json.loads(b) if st == 200 else {})(*fetch(u, auth))
    clean = lambda h: html.unescape(re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", h or "")))
    out = {}
    for wf in getj(f"{api}/workflows?status=active&per_page=200").get("workflows", []):
        det = getj(f"{api}/workflows/{wf['id']}/details").get("workflows", [{}])[0].get("details", {})
        ids, stack = [], [det]
        while stack:
            n = stack.pop()
            if isinstance(n, dict):
                if n.get("action_type") == "send_email" and n.get("email"):
                    ids.append(n["email"]["id"])
                stack.extend(n.values())
            elif isinstance(n, list):
                stack.extend(n)
        for eid in ids:
            e = getj(f"{api}/workflows/{wf['id']}/emails/{eid}").get("emails", [{}])[0]
            out[f"Drip workflow „{wf['name']}“ → „{e.get('subject') or e.get('name')}“"] = " ".join(
                [e.get("subject") or "", e.get("preheader") or "", e.get("text_body") or clean(e.get("html_body"))])
    for c in getj(f"{api}/campaigns?status=active&per_page=200").get("campaigns", []):
        for e in getj(f"{api}/campaigns/{c['id']}/emails").get("emails", []):
            out[f"Drip série „{c.get('name')}“ → „{e.get('subject')}“"] = " ".join(
                [e.get("subject") or "", e.get("preheader") or "", e.get("text_body") or clean(e.get("html_body"))])
    return out


def watched():
    """[(údaj, platí, regex)] z tabulky v resources/lcenglish-hlidane-udaje.md."""
    rows = []
    if not WATCH_FILE.exists():
        return rows
    for line in WATCH_FILE.read_text(encoding="utf-8").splitlines():
        cells = [c.strip() for c in re.split(r"(?<!\\)\|", line.strip())[1:-1]]
        if len(cells) >= 3 and cells[2].startswith("`"):
            rows.append((cells[0], cells[1], cells[2].strip("`").replace("\\|", "|")))
    return rows


def find_watched(texts):
    """{údaj: {"plati":…, "mista": {místo: [úryvky]}}}"""
    out = {}
    for name, value, rx in watched():
        hits = {}
        for place, text in texts.items():
            for m in list(re.finditer(rx, text, re.I))[:3]:
                hits.setdefault(place, []).append("…" + re.sub(r"\s+", " ", text[max(0, m.start() - 60):m.end() + 60]).strip() + "…")
        out[name] = {"plati": value, "mista": hits}
    return out


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
        "text": re.sub(r"\s+", " ", " ".join(p.text_parts)).strip(),
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
        url = f"{u.scheme}://{host}{u.path}" + (f"?{u.query}" if u.query else "")
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
    global PAGE_TEXTS
    PAGE_TEXTS = {r["final"]: r["text"] for r in pages.values() if r["status"] == 200 and r["text"]}
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
        if max(a, b) >= 20 and abs(a - b) >= 5:  # související články se střídají náhodně, hlídat jen menu a patičku
            lines.append(f"~ {p}: odkazy sem ze šablony (menu, patička) {a} → {b}")
    return lines


COURSES = {"/kurzy/", "/10x-english/", "/irregular/", "/hele/", "/hele-sp/", "/irregular-cho/", "/hele-checkout/"}
LISTINGS = {"/", "/blog/"}  # + kategorie; vedou skoro na všechno, proto jen počtem
TOP_N = 12


def views():
    f = Path(__file__).with_name("mapa-webu-navstevnost.json")
    if not f.exists():
        return {}, None
    v = json.loads(f.read_text(encoding="utf-8"))
    return v.get("zobrazeni", {}), f"{v.get('obdobi', '?')}, {v.get('zdroj', '?')}, staženo {v.get('stazeno', '?')}"


def cell(items):
    """Seznam do buňky tabulky: oddělený čárkami, bez svislítek."""
    return ", ".join(str(i).replace("|", "/") for i in items) if items else "–"


SOCIAL = re.compile(r"(^|\.)(facebook\.com|instagram\.com|fb\.com)$", re.I)


def check_external(urls):
    """{adresa: problém}. Facebook a Instagram nepřihlášenému vrací 200 i u zrušené stránky, proto jen k ručnímu ověření."""
    def one(u):
        host = urlparse(u).hostname or ""
        if SOCIAL.search(host):
            return u, "Facebook/Instagram: automaticky nejde ověřit, zkontrolovat ručně"
        st, final, _ = fetch(u, timeout=20)
        if st == 0:
            st, final, _ = fetch(u, timeout=20, verify=False)
            if st == 200:
                return u, None
        if st in (401, 403, 405, 429, 999):  # ochrana proti robotům, ne rozbitý odkaz
            return u, None
        return u, None if st and st < 400 else (f"chyba {st}" if st else "neodpovídá")
    with ThreadPoolExecutor(6) as ex:
        return {u: e for u, e in ex.map(one, sorted(urls)) if e}


def write_md(data, common, redirects, broken, everywhere, titles, changes, prev_date, ext_bad=None, watch=None):
    now = datetime.now().strftime("%y%m%d %H:%M")
    seen, seen_src = views()
    listings = LISTINGS | {p for p, d in data.items() if d["kind"] == "kategorie"}

    def gift(d):
        g = [titles.get(f) or f for f in d["freebies"]]
        g += ["okno Dripu „" + x.split(": ", 1)[-1] + "“" for x in d["popups"]]
        return g

    def vids(d):
        return " ".join(f"[▶]({v})" for v in d["videos"]) or "–"

    def link(p):
        return f"[{p}]({WEB}{p})"

    order = {"stránka": 0, "Leadpages": 1, "kategorie": 2, "jiné": 3, "článek": 4}
    pages = sorted(data, key=lambda p: (order.get(data[p]["kind"], 9), -seen.get(p, 0), p))
    count = lambda k: sum(d["kind"] == k for d in data.values())
    L = [
        "# Skutečná mapa webu lcenglish.cz",
        "",
        f"**Vygenerováno:** {now} skriptem `resources/web-lcenglish/mapa_webu.py` (neupravovat ručně, přepíše se). "
        "Oblast [[lcenglish]] · z čeho je web postavený a pravidla: [[mapa-webu]] · systémy: [[lcenglish-ekosystem]].",
        "Obnova: při weekly review (předtím Claude obnoví návštěvnost z Metricoolu do `mapa-webu-navstevnost.json`) "
        "a při „zavírám“ ve vlákně, které měnilo web (`python -I resources/web-lcenglish/mapa_webu.py`).",
        "",
        f"Stránek {len(data)}: stránky {count('stránka')}, Leadpages {count('Leadpages')}, kategorie {count('kategorie')}, "
        f"články {count('článek')}. Odkazy se počítají jen z obsahu stránky; menu, patička a „související články“ "
        "jsou souhrnně dole. Zobrazení: " + (seen_src or "data chybí"),
        "",
        "## Kam vést návštěvníka",
        "",
        f"Nejčtenější články (top {TOP_N} podle zobrazení za 12 měsíců): vede z nich odkaz na kurz a nabízejí dárek? "
        "Úkol doplnit do nich dárek nebo odkaz na kurz je v [[next-actions]].",
        "",
        "| Článek | Zobrazení | Odkaz na kurz z textu | Dárek | Vede na (z textu) | Video |",
        "|---|---|---|---|---|---|",
    ]
    top = sorted((p for p in data if data[p]["kind"] == "článek"), key=lambda p: -seen.get(p, 0))[:TOP_N]
    for p in top:
        d = data[p]
        kurz = [l for l in d["internal"] if l in COURSES]
        L.append(f"| {link(p)} | {seen.get(p, '?')} | {cell(kurz) if kurz else '**ne**'} | "
                 f"{cell(gift(d)) if gift(d) else '**žádný**'} | {cell(d['internal'])} | {vids(d)} |")

    L += ["", "## Hlídané údaje", "",
          "Kde se na webu a v aktivních mailech Dripu píše údaj, který se může změnit. Seznam a hodnoty, které platí: "
          "[[lcenglish-hlidane-udaje]]. Když text nesedí s „Platí“, opravit.", ""]
    for name, w in (watch or {}).items():
        L += [f"### {name}", "", f"**Platí:** {w['plati']}", ""]
        if not w["mista"]:
            L.append("- nikde nenalezeno")
        for place, snips in sorted(w["mista"].items()):
            where = link(place) if place.startswith("/") else place
            L.append(f"- {where}: " + " · ".join(s.replace("|", "/") for s in snips[:2]))
        L.append("")
    L += ["", "## Propojení stránek", "",
          "Vede sem z výpisů = hlavní stránka, blog a kategorie (vedou skoro na všechno, proto jen počet). "
          "Ze šablony = menu, patička a „související články“ pod články.", "",
          "| Stránka | Typ | Zobrazení | Vede na | Vede sem z článků a stránek | Vede sem z výpisů / ze šablony | Dárek | Video |",
          "|---|---|---|---|---|---|---|---|"]
    for p in pages:
        d = data[p]
        back = [b for b in d["backlinks"] if b not in listings]
        from_list = len(d["backlinks"]) - len(back)
        typ = d["kind"] + (", noindex" if d["noindex"] else "")
        L.append(f"| {link(p)} | {typ} | {seen.get(p, '–')} | {cell(d['internal'])} | {cell(back)} | "
                 f"{from_list} / {d['nav_backlinks']} | {cell(gift(d))} | {vids(d)} |")

    ext = defaultdict(set)
    for p, d in data.items():
        for u in d["external"]:
            ext[u].add(p)
    host = lambda u: (urlparse(u).hostname or "").removeprefix("www.")
    L += ["", "## Odkazy ven", "",
          f"{len(ext)} různých adres na {len({host(u) for u in ext})} webech, seřazeno podle webu.", "",
          "| Web | Adresa | Ze stránek |", "|---|---|---|"]
    last = None
    for u in sorted(ext, key=lambda u: (host(u), u)):
        h = host(u)
        L.append(f"| {h if h != last else ''} | [{u.split('://', 1)[-1][:70]}]({u}) | {cell(sorted(ext[u]))} |")
        last = h

    gifts = defaultdict(set)
    for p, d in data.items():
        for g in gift(d):
            gifts[g].add(p)
    L += ["", "## Dárky: co se kde nabízí", "", "| Dárek | Na stránkách |", "|---|---|"]
    L += [f"| {g.replace('|', '/')} | {cell(sorted(ps))} |" for g, ps in sorted(gifts.items())]
    if everywhere:
        L += ["", "Vyskakovací okna Dripu bez omezení na stránky (zobrazí se kdekoli): " + "; ".join(everywhere)]

    L += ["", f"## Změny od minulé mapy ({prev_date or 'první běh'})", ""]
    L += [f"- {c}" for c in changes[:200]] or ["- beze změny" if prev_date else "- první mapa, není s čím srovnávat"]
    if len(changes) > 200:
        L.append(f"- … a dalších {len(changes) - 200} (celé v `mapa-webu-data.json` přes git diff)")

    orphans = [p for p in pages if not data[p]["backlinks"] and not data[p]["nav_backlinks"] and p != "/"]
    L += ["", "## Na co nevede žádný odkaz z webu", ""]
    L += [f"- {p} ({data[p]['kind']})" for p in orphans] or ["- nic"]
    L += ["", "## Rozbité a přesměrované interní odkazy", ""]
    L += [f"- {p} → chyba {s}" for p, s in sorted(broken.items())]
    L += [f"- {p} → přesměruje na {t}" for p, t in sorted(redirects.items())]
    if not broken and not redirects:
        L.append("- nic")
    L += ["", "## Rozbité odkazy ven", ""]
    where = defaultdict(set)
    for p, d in data.items():
        for u in d["external"]:
            where[u].add(p)
    for u, e in sorted((ext_bad or {}).items(), key=lambda x: (x[1], x[0])):
        L.append(f"- {u} → {e} ← {cell(sorted(where[u])) if where[u] else 'šablona (menu, patička)'}")
    if not ext_bad:
        L.append("- nic")
    L += ["", "## Odkazy ze šablony (menu, patička, kategorie; počet stránek)", ""]
    wide = [c for c in common if int(c.rsplit("(", 1)[1].rstrip("×)")) >= 20]
    L += [f"- {c}" for c in wide] or ["- nic"]
    if len(common) > len(wide):
        L.append(f"- a {len(common) - len(wide)} článků v „souvisejících článcích“ pod jinými články "
                 "(počet u každé stránky v tabulce Propojení, sloupec ze šablony)")
    OUT_MD.write_text("\n".join(L) + "\n", encoding="utf-8")


def main():
    old, prev_date = {}, None
    if OUT_JSON.exists():
        prev = json.loads(OUT_JSON.read_text(encoding="utf-8"))
        old, prev_date = prev.get("pages", {}), prev.get("generated")
    data, common, redirects, broken, everywhere, titles = build()
    changes = diff(old, data) if old else []
    ext_urls = {u for d in data.values() for u in d["external"]} | {c.rsplit(" (", 1)[0] for c in common if c.startswith("http")}
    ext_bad = check_external(ext_urls)
    texts = {**PAGE_TEXTS, **drip_texts()}
    watch = find_watched(texts)
    old_watch = prev.get("hlidane", {}) if old else {}
    for name, w in watch.items():
        a, b = set(old_watch.get(name, [])), set(w["mista"])
        changes += [f"+ hlídaný údaj „{name}“ nově v: {x}" for x in sorted(b - a)] if name in old_watch else []
        changes += [f"− hlídaný údaj „{name}“ už není v: {x}" for x in sorted(a - b)]
    write_md(data, common, redirects, broken, everywhere, titles, changes, prev_date, ext_bad, watch)
    OUT_JSON.write_text(json.dumps({"generated": datetime.now().strftime("%y%m%d %H:%M"), "pages": data,
                                    "hlidane": {n: sorted(w["mista"]) for n, w in watch.items()}},
                                   ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"Stránek {len(data)}, rozbitých {len(broken)}, přesměrování {len(redirects)}, "
          f"problémových odkazů ven {len(ext_bad)}.")
    print("\n".join(changes) if changes else ("Beze změny." if old else "První běh."))


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    main()
