"""Srovná otevřené úkoly ve vaultu s kartami na tabuli úkolů (od 261028).

Použití:
  1. Export karet: ArtifactData list, url tabule, collection "ukoly",
     query.limit 1000, out_dir <složka>  (soubory <složka>/ukoly/<id>.json)
  2. python -I "G:/Můj disk/vault/resources/tabule/tabule_vs_vault.py" <složka>

Vault: projects/*.md řádky "- [ ]" s #next-action + ruční sekce @online/@telefon/
@doma/@venku v gtd/next-actions.md. Bez gtd/waiting-for.md.
Párování: karta má pole `ukol` = text úkolu ve vaultu (stačí zkopírovat řádek bez
"- [ ] "; tagy, data a odkazy se odříznou), u karty, která kryje víc úkolů, seznam
textů. Karty bez `ukol` se párují odhadem (podobnost textu, přednost má soubor
z `odkaz`) a skript navrhne `ukol` k zapsání.
Postup: resources/postupy/tabule.md, oddíl „Kontrola tabule proti vaultu“.
"""
import difflib
import glob
import json
import os
import re
import sys
from datetime import date

VAULT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
MANUAL = ("## @online", "## @telefon", "## @doma", "## @venku")
TASK = re.compile(r"^- \[( |x|X|-)\] (.*)$")
DUE = re.compile(r"📅\s*(\d{4}-\d{2}-\d{2})")


def norm(text):
    """Text úkolu bez tagů, dat, odkazů a formátování – klíč pro párování."""
    t = re.sub(r"[📅✅⏳🛫➕🔁]\s*\d{4}-\d{2}-\d{2}", "", text)
    t = re.sub(r"→.*$", "", t)                      # „→ [[odkaz]]“ na konci
    t = re.sub(r"\[\[([^\]|]*\|)?([^\]]*)\]\]", r"\2", t)
    t = re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", t)
    t = re.sub(r"(?<!\w)#[\w/-]+", "", t)
    t = re.sub(r"^\(\d{6}[^)]*\)\s*", "", t)        # „(261028: …)“ na začátku
    t = re.sub(r"[`*_]", "", t)
    return re.sub(r"\s+", " ", t).strip().lower()


def similar(a, b):
    """Podobnost názvu karty a úkolu: celý text, nebo kolik slov karty je v úkolu (kmen 5 písmen)."""
    stems = lambda s: {w[:5] for w in re.findall(r"\w{4,}", s)}
    sa, sb = stems(a), stems(b)
    share = len(sa & sb) / len(sa) if sa else 0.0
    return max(difflib.SequenceMatcher(None, a, b).ratio(), 0.9 * share)


def vault_tasks():
    out = []
    files = sorted(glob.glob(os.path.join(VAULT, "projects", "*.md")))
    for path in files:
        rel = os.path.relpath(path, VAULT).replace("\\", "/")
        heading = ""
        for i, line in enumerate(open(path, encoding="utf-8").read().splitlines(), 1):
            if line.startswith("#") and " " in line and line.split(" ")[0].strip("#") == "":
                heading = line.strip("# ").strip()
            m = TASK.match(line)
            if m and "#next-action" in m.group(2):
                out.append(dict(task(rel, i, m), linie=heading))
    rel = "gtd/next-actions.md"
    section, fence = None, False
    for i, line in enumerate(open(os.path.join(VAULT, rel), encoding="utf-8").read().splitlines(), 1):
        if line.startswith("```"):
            fence = not fence
            continue
        if line.startswith("## "):
            section = line if line.startswith(MANUAL) else None
            continue
        m = TASK.match(line)
        if section and not fence and m:
            out.append(task(rel, i, m))
    return out


def task(rel, i, m):
    due = DUE.search(m.group(2))
    return {"soubor": rel, "radek": i, "hotovo": m.group(1) != " ", "text": m.group(2),
            "klic": norm(m.group(2)), "datum": due.group(1) if due else ""}


def many_next_actions(tasks):
    """Pravidlo (Lenka 261028): projekt má jednu next action; velký projekt jednu za každou linii.
    Linie = nadpis v projektovém souboru, pod kterým úkol stojí."""
    groups = {}
    for t in tasks:
        if t["soubor"].startswith("projects/") and not t["hotovo"]:
            groups.setdefault((t["soubor"], t["linie"]), []).append(t)
    return [f'{f} › {h or "(bez nadpisu)"}: {len(g)}× (řádky {", ".join(str(t["radek"]) for t in g)})'
            for (f, h), g in sorted(groups.items()) if len(g) > 1]


def bad_area(karty):
    """`oblast` karty = název souboru v areas/ nebo projects/ (bez .md); filtry na tabuli se z nich skládají."""
    ok = {os.path.basename(p)[:-3] for d in ("areas", "projects") for p in glob.glob(os.path.join(VAULT, d, "*.md"))}
    return [f'{k["id"]}: „{k.get("oblast", "")}“' for k in karty
            if (k.get("stav") or "otevreno") != "hotovo" and k.get("oblast") not in ok]


def cards(folder):
    sub = os.path.join(folder, "ukoly")
    folder = sub if os.path.isdir(sub) else folder
    out = []
    for f in sorted(glob.glob(os.path.join(folder, "*.json"))):
        d = json.load(open(f, encoding="utf-8"))
        d = d.get("data", d) if isinstance(d.get("data"), dict) else d
        d["id"] = os.path.basename(f)[:-5]
        m = re.search(r"[\w./-]+\.md", d.get("odkaz") or "")
        d["_soubor"] = m.group(0) if m else ""
        out.append(d)
    return out


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    sys.stdout.reconfigure(encoding="utf-8")
    today = date.today().isoformat()
    tasks, karty = vault_tasks(), cards(sys.argv[1])
    by_key = {t["klic"]: t for t in tasks}
    paired, guesses, unpaired, used = {}, [], [], set()
    for k in karty:
        # `ukol` je text, nebo seznam textů, když jedna karta kryje víc úkolů ve vaultu
        keys = k.get("ukol") or []
        found = [by_key.get(norm(u)) for u in ([keys] if isinstance(keys, str) else keys)]
        found = [t for t in found if t]
        if found:
            paired[k["id"]] = next((t for t in found if not t["hotovo"]), found[0])
            used.update(id(t) for t in found)
        else:
            unpaired.append(k)
    for k in unpaired:
        if (k.get("stav") or "otevreno") == "hotovo":
            continue
        best, score = None, 0.0
        for t in tasks:
            if id(t) in used or t["hotovo"]:
                continue
            s = similar(norm(k.get("nazev") or ""), t["klic"])
            if t["soubor"] == k["_soubor"]:
                s += 0.15
            if s > score:
                best, score = t, s
        if best and score >= 0.55:
            paired[k["id"]] = best
            used.add(id(best))
            guesses.append((k, best, score))

    def show(t):
        return f'{t["soubor"]}:{t["radek"]}  {t["text"][:110]}'

    vault_only = [t for t in tasks if id(t) not in used and not t["hotovo"]]
    missing = [t for t in vault_only if not (t["datum"] and t["datum"] > today)]
    dated = [t for t in vault_only if t["datum"] and t["datum"] > today]
    live = lambda k: (k.get("stav") or "otevreno") != "hotovo"
    lost = [k for k in karty if k["id"] not in paired and live(k)]
    in_gtd = lambda k: k["_soubor"].startswith("projects/") or k["_soubor"] == "gtd/next-actions.md"
    board_only = [k for k in lost if in_gtd(k)]
    no_task = [k for k in lost if not in_gtd(k)]
    done_vault = [(k, paired[k["id"]]) for k in karty if k["id"] in paired and live(k) and paired[k["id"]]["hotovo"]]
    done_board = [(k, paired[k["id"]]) for k in karty if k["id"] in paired and not live(k) and not paired[k["id"]]["hotovo"]]

    sections = [
        ("CHYBÍ NA TABULI (úkol ve vaultu, karta žádná) → založit kartu", [show(t) for t in missing]),
        ("NA TABULI, VE VAULTU NENÍ (karta odkazuje na projekt nebo next-actions, úkol nenalezen) → ověřit, smazat kartu nebo opravit `ukol`",
         [f'{k["id"]}: {k.get("nazev", "")[:90]}  [{k.get("odkaz", "")}]' for k in board_only]),
        ("HOTOVO NA TABULI, VE VAULTU OTEVŘENÉ → odškrtnout ve vaultu + next-action advancement", [f'{k["id"]} → {show(t)}' for k, t in done_board]),
        ("HOTOVO VE VAULTU, NA TABULI OTEVŘENÉ → kartu na hotovo", [f'{k["id"]} → {show(t)}' for k, t in done_vault]),
        ("ČEKÁ NA DATUM (📅 v budoucnu, karta není; v pořádku, pokud jde o čekání, ne o termín)", [show(t) for t in dated]),
        ("KARTY BEZ ÚKOLU V PROJEKTU (odkaz na kontext-ukolu, GrowOS, resources…; jen pro informaci)",
         [f'{k["id"]}: {k.get("nazev", "")[:90]}  [{k.get("odkaz", "")}]' for k in no_task]),
        ("VÍC NEŽ JEDNA NEXT ACTION V JEDNÉ LINII (projekt, nadpis) → nechat jen krok s nejvyšší prioritou, ostatní bez #next-action",
         many_next_actions(tasks)),
        ("OBLAST MIMO areas/ A projects/ → opravit `oblast` karty", bad_area(karty)),
        ("SPÁROVÁNO ODHADEM → zapsat kartě pole `ukol` (návrh níže)", [f'{k["id"]} ({s:.2f}) → {show(t)}' for k, t, s in guesses]),
    ]
    for title, rows in sections:
        print(f"\n## {title}: {len(rows)}")
        for r in rows:
            print("  - " + r)
    if guesses:
        navrh = {k["id"]: t["klic"] for k, t, _ in guesses}
        path = os.path.join(sys.argv[1], "navrh-ukol.json")
        json.dump(navrh, open(path, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
        print(f"\nNávrh polí `ukol`: {path}")
    print(f"\nVault: {len(tasks)} úkolů, tabule: {len(karty)} karet, spárováno {len(paired)} (z toho odhadem {len(guesses)}).")


if __name__ == "__main__":
    main()
