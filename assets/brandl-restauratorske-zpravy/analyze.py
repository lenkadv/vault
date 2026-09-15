"""
Brandl — analýza restaurátorských zpráv
Extrauje technická data z PDF a zapíše srovnávací CSV tabulku.

Spuštění:
    python analyze.py

Výstup:
    srovnani.csv  — tabulka s nalezenými daty
    srovnani.md   — totéž jako Markdown

Závislosti: pip install pypdf pymupdf pytesseract pillow
Tesseract musí být nainstalovaný (https://github.com/UB-Mannheim/tesseract/wiki)
Pro lepší výsledky OCR stáhnout český jazykový balíček:
  https://github.com/tesseract-ocr/tessdata/blob/main/ces.traineddata
  → uložit do C:\Program Files\Tesseract-OCR\tessdata\ces.traineddata
"""

import csv
import io
import os
import re
import sys

from pypdf import PdfReader

# --- katalog děl: filename → (název, datace) ---
KATALOG = {
    "sv-antonin-paduan-jezisek":         ("Sv. Antonín Paduánský s Ježíškem",              "kolem 1690"),
    "jakob-josefovo-roucho":             ("Jákob přijímá Josefovo zkrvavené roucho",        "kolem 1695"),
    "steti-sv-barbory":                  ("Stětí sv. Barbory",                               "asi 1699"),
    "rodinna-podobizna-kokorovsky":      ("Rodinná podobizna Kokořovského",                 "kolem 1705"),
    "modlici-se-panna-marie":            ("Modlící se Panna Marie",                         "kolem 1703"),
    "posledni-vecere":                   ("Poslední večeře",                                "po 1705"),
    "uzdraven-slepeho-tobiase-107":      ("Uzdravení slepého Tobiáše (Praha)",              "kolem 1705"),
    "panna-marie-skapu-sv-simon":        ("Panna Marie uděluje škapulíř sv. Šimonu Štokovi","1708"),
    "alegorie-socharstvi":               ("Alegorie sochařství",                            "po 1710"),
    "divka-s-cisi-vina":                 ("Dívka s číší vína",                              "po 1710"),
    "kajici-mary-magdalena-117":         ("Kající se Máří Magdaléna (NGP O 19134)",         "po 1710"),
    "kajici-mary-magdalena-kopie-239":   ("Kající se Máří Magdaléna (kopie)",               "po 1710"),
    "lot-a-jeho-dcery":                  ("Lot a jeho dcery",                               "kolem 1710"),
    "muz-s-dymkou":                      ("Muž s dýmkou",                                   "po 1710"),
    "navrat-ztraceneho-syna":            ("Návrat ztraceného syna",                         "kolem 1710"),
    "podobizna-mlade-muze-s-gestem":     ("Podobizna mladého muže s gestem na prstech",     "1710–1720"),
    "podobizna-slechtice-modry-plast":   ("Podobizna šlechtice v modrém plášti",            "kolem 1710"),
    "sv-vavrinec":                       ("Sv. Vavřinec",                                   "1710"),
    "uzdraven-slepeho-tobiase-168":      ("Uzdravení slepého Tobiáše (Vyšší Brod)",         "kolem 1710"),
    "vychova-panny-marie":               ("Výchova Panny Marie",                            "kolem 1715"),
    "stigmatizace-sv-frantiska":         ("Stigmatizace sv. Františka z Assisi",            "1718"),
    "sen-proroka-elias":                 ("Sen proroka Eliáše",                             "1724"),
}

# --- hledané technické termíny ---
# Každá položka: (klíč_sloupce, [seznam_hledaných_řetězců], kontext_znaků)
# Kontext = kolik znaků před/za nálezem vytáhnout jako citaci
TERMINY = [
    ("podklad_barva",   ["červen", "bolusov", "bolus", "bíl", "křídov", "hlinka"],          120),
    ("podklad_složení", ["olovnat", "hlinka", "křída", "gips", "sádr"],                      120),
    ("plátno_vazba",    ["keprov", "plátnov", "vazba", "tkaniv"],                            120),
    ("podkresba",       ["podkresb", "základní kresb", "kresb.*olej", "kresb.*čern"],        150),
    ("podmalba",        ["podmalb", "podmálb"],                                              120),
    ("alla_prima",      ["alla prima"],                                                       80),
    ("pigmenty",        ["olovnat. bělob", "lapis lazuli", "ultramarín", "rumělk",
                         "kostní čer", "zem. zelen", "okr", "zinkov. bělob"],               200),
    ("inkarnát",        ["inkarnát", "inkarnátu", "pleš", "ple.", "tváří", "modelac"],       150),
    ("svetla_technika", ["světla", "světel", "tahy", "impasto", "pasta"],                    150),
    ("non_finito",      ["non finito", "nedokonč", "naznač"],                                150),
    ("RTG",             ["rentgen", "rtg", "röntgen", "röntgenol"],                          120),
    ("UV",              ["ultrafial", "uv sv", "luminiscen"],                                 80),
    ("laboratorni",     ["laborat", "příčný řez", "priční řez", "mikroskop",
                         "mikrochemick"],                                                     80),
    ("premalby",        ["přemalb", "premalb"],                                              120),
    ("restaurator_rok", ["restauroval", "restaurovaly", "restaurovaly", "restaurovány",
                         "restauroval", "rest.", "opravil"],                                 150),
]


def extrahuj_text(pdf_path: str) -> tuple[str, bool]:
    """Vrátí (text, je_skenované). Zkusí pypdf, pak OCR."""
    reader = PdfReader(pdf_path)
    text = ""
    for page in reader.pages:
        t = page.extract_text() or ""
        text += t

    if len(text.strip()) > 100:
        return text, False

    # Text je prázdný nebo minimální → zkusit OCR
    try:
        import fitz
        import pytesseract
        from PIL import Image

        doc = fitz.open(pdf_path)
        ocr_text = ""
        lang = "ces+eng" if os.path.exists(
            r"C:\Program Files\Tesseract-OCR\tessdata\ces.traineddata"
        ) else "eng"

        for page in doc:
            pix = page.get_pixmap(matrix=fitz.Matrix(2.5, 2.5))
            img = Image.open(io.BytesIO(pix.tobytes("png")))
            ocr_text += pytesseract.image_to_string(img, lang=lang)

        return ocr_text, True

    except Exception as e:
        return f"[OCR selhalo: {e}]", True


def najdi_kontext(text: str, hledane: list[str], znaku: int) -> str:
    """Najde první výskyt libovolného hledaného řetězce a vrátí okolní kontext."""
    text_lower = text.lower()
    for h in hledane:
        for m in re.finditer(h.lower(), text_lower):
            start = max(0, m.start() - 30)
            end = min(len(text), m.end() + znaku)
            snippet = text[start:end].replace("\n", " ").strip()
            return f'"{snippet}"'
    return ""


def analyzuj(pdf_dir: str) -> list[dict]:
    radky = []
    for filename, (nazev, datace) in KATALOG.items():
        pdf_path = os.path.join(pdf_dir, filename + ".pdf")
        if not os.path.exists(pdf_path):
            print(f"  CHYBÍ: {filename}.pdf")
            continue

        print(f"  Zpracovávám: {filename}...")
        text, sken = extrahuj_text(pdf_path)

        radek = {
            "soubor":   filename,
            "název":    nazev,
            "datace":   datace,
            "skenované": "ano" if sken else "ne",
            "znaků":    len(text),
        }

        for klic, hledane, znaku in TERMINY:
            radek[klic] = najdi_kontext(text, hledane, znaku)

        radky.append(radek)

    return radky


def uloz_csv(radky: list[dict], vystup: str):
    if not radky:
        return
    sloupce = list(radky[0].keys())
    with open(vystup, "w", newline="", encoding="utf-8-sig") as f:
        w = csv.DictWriter(f, fieldnames=sloupce)
        w.writeheader()
        w.writerows(radky)
    print(f"\nUloženo: {vystup}")


def uloz_md(radky: list[dict], vystup: str):
    """Markdown tabulka — jen sloupce s alespoň jedním nálezem."""
    if not radky:
        return

    technicke = [k for k, _, _ in TERMINY]
    neprazdne = [k for k in technicke if any(r.get(k) for r in radky)]
    zakladni = ["název", "datace", "skenované"]
    sloupce = zakladni + neprazdne

    lines = []
    lines.append("| " + " | ".join(sloupce) + " |")
    lines.append("| " + " | ".join(["---"] * len(sloupce)) + " |")
    for r in radky:
        cells = [str(r.get(k, "")).replace("|", "\\|") for k in sloupce]
        lines.append("| " + " | ".join(cells) + " |")

    with open(vystup, "w", encoding="utf-8") as f:
        f.write("# Brandl — srovnání technických dat z restaurátorských zpráv\n\n")
        f.write("\n".join(lines))
    print(f"Uloženo: {vystup}")


if __name__ == "__main__":
    skript_dir = os.path.dirname(os.path.abspath(__file__))
    print(f"Složka PDF: {skript_dir}\n")

    radky = analyzuj(skript_dir)

    uloz_csv(radky, os.path.join(skript_dir, "srovnani.csv"))
    uloz_md(radky,  os.path.join(skript_dir, "srovnani.md"))

    print(f"\nZpracováno {len(radky)} zpráv.")
    prazdne = sum(1 for r in radky if r["znaků"] < 200)
    if prazdne:
        print(f"Pozor: {prazdne} zpráv má méně než 200 znaků (skenované nebo prázdné).")
        print("Pro lepší výsledky nainstaluj český Tesseract balíček (viz komentář v hlavičce skriptu).")
