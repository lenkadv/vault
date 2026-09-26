"""Sestaví HTML dokument epizody z JSON dat (viz SKILL.md) → nahrává se na Disk jako Google Doc.

Použití: python shun_build.py epNNN.json > epNNN.html
Značení čtení v datech: {漢字|かな}  → bez furigany „漢字“, s furiganou „漢字（かな）“.
"""
import html as _html, json, re, sys


class html:
    @staticmethod
    def escape(s):
        return _html.escape(s, quote=False)

# tabulka: záhlaví orámované (.h), řádky s větami bez čar (.n) — Lenčina úprava 260926
FURI = re.compile(r"\{([^|}]+)\|([^}]+)\}")


def plain(s):
    return html.escape(FURI.sub(r"\1", s))


def kana(s):
    return html.escape(FURI.sub(lambda m: m.group(2), s))


def furi(s):
    out, pos = [], 0
    for m in FURI.finditer(s):
        out.append(html.escape(s[pos:m.start()]))
        out.append(f'{html.escape(m.group(1))}<span class="r">（{html.escape(m.group(2))}）</span>')
        pos = m.end()
    out.append(html.escape(s[pos:]))
    return "".join(out)


def transcript(d, fmt):
    parts = []
    for i, para in enumerate(d["paragraphs"]):
        parts.append("<p>" + "".join(fmt(ja) for ja, _ in para) + "</p>")
        if i == d.get("vocab_after_paragraph") and d.get("vocab"):
            parts.append("<p><i>Words and phrases used in this episode</i></p><ul>"
                         + "".join(f"<li>{fmt(w)} – {html.escape(en)}</li>" for w, en in d["vocab"])
                         + "</ul>")
        # anglický vstup/reklama bývá těsně před rozloučením (poslední odstavec)
        if i == len(d["paragraphs"]) - 2 and d.get("english_segment_note"):
            parts.append(f'<p><i>{html.escape(d["english_segment_note"])}</i></p>')
    return "\n".join(parts)


def main():
    d = json.load(open(sys.argv[1], encoding="utf-8"))
    rows = []
    for para in d["paragraphs"]:
        for ja, en in para:
            reading = f'<br><span class="r">{kana(ja)}</span>' if FURI.search(ja) else ""
            rows.append(f'<tr><td class="n">{plain(ja)}{reading}</td>'
                        f'<td class="n">{html.escape(en)}</td></tr>')
    url = html.escape(d["url"])
    short = re.sub(r"^【[^】]*】\s*Ep\s?\d+\s*|\s*/[^/]*Podcast[^/]*$", "", d["title"])
    doc = f"""<html><head><meta charset="utf-8"><style>.r{{color:#888888;font-size:9pt}} td{{vertical-align:top;width:50%}} .h{{border:1pt solid #000000}} .n{{border:0pt solid #000000;padding-bottom:6pt}}</style></head><body>
<h1>Ep{d['ep']} – {html.escape(short)}</h1>
<p><i>Vydáno {d['upload_date']} · zpracováno {d['processed']} · zdroj: automatické titulky YouTube, upravené (seznam oprav na konci)</i></p>
<h2>Paralelní text</h2>
<table style="border-collapse:collapse;width:100%">
<tr><td class="h"><b>日本語</b></td><td class="h"><b>English</b></td></tr>
{''.join(rows)}
</table>
<h2>Přepis</h2>
{transcript(d, plain)}
<h2>Přepis s furiganou</h2>
{transcript(d, furi)}
<h2>Opravy oproti automatickým titulkům</h2>
<ul>{''.join(f'<li>{html.escape(c)}</li>' for c in d.get('corrections', []))}</ul>
<p><b>Video:</b> <a href="{url}">{url}</a></p>
</body></html>"""
    sys.stdout.reconfigure(encoding="utf-8")
    print(doc)


if __name__ == "__main__":
    main()
