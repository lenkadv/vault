"""Vloží aktuální znění skillů (SKILL.md) do jejich poznámek v Databance.

Nahrazuje synchronizaci do Notion Skills (zmrazeno 261025). Bere poznámky s
`typ: nainstalovaný skill` a vyplněným `soubor:`, přečte SKILL.md a na konec
poznámky zapíše sbalený blok „Znění skillu“ mezi značky. Zbytek poznámky
(hodnocení, Poznámky z použití) nemění.

Spuštění: python -I "G:/Můj disk/vault/resources/databanka/gen_zneni_skillu.py" [název-skillu ...]
Bez argumentů projde všechny skilly.
"""
import datetime
import os
import re
import sys

VAULT = r"G:\Můj disk\vault"
DATABANKA = os.path.join(VAULT, "resources", "databanka")
HOME = os.path.expanduser("~")
START = "<!-- zneni-skillu:start (generuje gen_zneni_skillu.py, needitovat) -->"
END = "<!-- zneni-skillu:end -->"


def resolve(soubor):
    if soubor.startswith("vault/"):
        return os.path.join(VAULT, soubor[len("vault/"):])
    if soubor.startswith("~/"):
        return os.path.join(HOME, soubor[2:])
    return None


def callout(skill_path, today):
    text = open(skill_path, encoding="utf-8").read().replace("\r\n", "\n")
    fm = ""
    m = re.match(r"^---\n(.*?)\n---\n?", text, re.S)
    if m:
        fm, text = m.group(1), text[m.end():]
    folder = os.path.dirname(skill_path)
    other = []
    for root, _, files in os.walk(folder):
        for f in files:
            rel = os.path.relpath(os.path.join(root, f), folder).replace("\\", "/")
            if rel != "SKILL.md":
                other.append(rel)
    body = []
    if fm:
        body += ["```yaml", fm, "```", ""]
    body += [text.strip()]
    if other:
        body += ["", "**Pomocné soubory ve složce skillu:** " + ", ".join(f"`{o}`" for o in sorted(other)[:40])
                 + (f" a dalších {len(other) - 40}" if len(other) > 40 else "")]
    lines = [START, "", f"> [!quote]- Znění skillu (aktualizováno {today})"]
    lines += [("> " + l) if l else ">" for l in "\n".join(body).split("\n")]
    lines += ["", END]
    return "\n".join(lines)


def main(only):
    today = datetime.date.today().strftime("%y%m%d")
    done, missing = 0, []
    for root, _, files in os.walk(DATABANKA):
        for f in files:
            if not f.endswith(".md"):
                continue
            p = os.path.join(root, f)
            note = open(p, encoding="utf-8").read()
            if not re.search(r"^typ: nainstalovaný skill", note, re.M):
                continue
            m = re.search(r'^soubor: "(.*)"', note, re.M)
            path = resolve(m.group(1)) if m and m.group(1) else None
            if not path:
                continue
            name = os.path.basename(os.path.dirname(path))
            if only and name not in only:
                continue
            if not os.path.exists(path):
                missing.append(f"{f}: {path}")
                continue
            block = callout(path, today)
            if START in note:
                note = note[:note.index(START)].rstrip("\n") + "\n\n" + block + note[note.index(END) + len(END):]
            else:
                note = note.rstrip("\n") + "\n\n" + block + "\n"
            open(p, "w", encoding="utf-8").write(note)
            done += 1
    print(f"Aktualizováno poznámek: {done}")
    for x in missing:
        print("Chybí SKILL.md:", x)


if __name__ == "__main__":
    main(set(sys.argv[1:]))
