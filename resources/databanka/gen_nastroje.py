# Vygeneruje poznámky Databanky pro nainstalované nástroje (skilly, konektory, aplikace).
import os, re, yaml

VAULT = "G:/Můj disk/vault"
DB = VAULT + "/resources/databanka"
HOME = os.path.expanduser("~").replace("\\", "/")

POUZITO = {  # podle záznamů sezení 260929 (Skill tool, /příkazy, čtení SKILL.md) + katalog „fungují“
    "productivity-daily-plan", "productivity-weekly-review", "note-inbox-review", "shun-podcast",
    "productivity-quarterly-sprint", "productivity-decision-journal", "productivity-calendar-audit",
    "impeccable-impeccable", "done", "humanize", "email-write", "marketing-strategy",
    "research-competitors", "research-audience", "drip", "metricool", "inbox-review",
    "review-exhibition", "last30days", "notebooklm",
    "docx", "pdf", "xlsx", "consolidate-memory", "artifact-design",
}
SKRYT = {"COM", "what-model", "design-system", "ui-styling"}  # katalog-moznosti „Skilly, které k tobě nesedí“ (260926)

GROUPS = [
    # (zdroj, složka, prefix, adresář, filtr, pro, tema)
    ("GrowOS 2.0", "GrowOS", "GOS", VAULT + "/GrowOS/.claude/skills", None, ["lcenglish", "tadylenka"], ["marketing"]),
    ("AI Black Magic – Productivity Pack", "Productivity Pack", "PP", VAULT + "/.claude/skills", lambda n: n.startswith("productivity-"), ["vlastní", "DigiStart"], ["produktivita"]),
    ("Vlastní", "Vlastní", "VL", VAULT + "/.claude/skills", lambda n: not n.startswith("productivity-"), ["vlastní"], ["produktivita"]),
    ("Vlastní", "Vlastní", "VL", HOME + "/.claude/skills", lambda n: n in {"what-model", "deep-research"}, ["vlastní"], ["výzkum"]),
    ("notebooklm-py", "Vlastní", "VL", HOME + "/.claude/skills", lambda n: n == "notebooklm", ["vlastní", "studies"], ["výzkum"]),
    ("Jon Benson – AI Collective", "Jon Benson", "JB", HOME + "/.claude/skills", lambda n: n in {"COM", "done", "done-day", "recap", "recap-all", "project", "jon-benson-voice-hacks"}, ["vlastní"], ["produktivita"]),
    ("Paul Bakaus – Impeccable", "Impeccable", "IMP", HOME + "/.claude/skills", lambda n: n.startswith("impeccable-"), ["vlastní"], ["web", "design"]),
    ("Next Level Builder – UI/UX Pro Max", "UI-UX Pro Max", "UX", HOME + "/.claude/skills", lambda n: n in {"design", "design-system", "ui-styling", "ui-ux-pro-max", "slides", "banner-design", "brand"}, ["vlastní"], ["web", "design"]),
]

def fm(path):
    t = open(path, encoding="utf-8").read()
    m = re.match(r"---\s*\n(.*?)\n---", t, re.S)
    try:
        d = yaml.safe_load(m.group(1)) if m else {}
    except Exception:
        d = {}
        dm = re.search(r"^description:\s*(.*)$", m.group(1) if m else "", re.M)
        if dm: d["description"] = dm.group(1).strip("'\" ")
    return d or {}

def short(desc, n=160):
    desc = re.sub(r"\s+", " ", str(desc or "")).strip()
    first = re.split(r"(?<=[.!?])\s", desc)[0]
    return (first if len(first) <= n else first[:n].rsplit(" ", 1)[0] + "…").replace('"', "'")

def q(s): return '"' + str(s).replace('"', "'") + '"'

def write(folder, prefix, name, zdroj, typ, pro, tema, pouzij, popis, soubor, odkaz, spousteni, stav=None, verdikt=None, extra=""):
    os.makedirs(f"{DB}/{folder}", exist_ok=True)
    stav = stav or ("použito" if name in POUZITO else "neprozkoumáno")
    verdikt = verdikt if verdikt is not None else ("skrýt" if name in SKRYT else "")
    lines = ["---", "databanka: true", f"zdroj: {zdroj}", f"typ: {typ}", "rok: 2026",
             "pro:"] + [f"  - {p}" for p in pro] + ["tema:"] + [f"  - {t}" for t in tema] + [
             f"pouzij_kdyz: {q(pouzij)}", f"stav: {stav}", "nainstalovano: ano", f"verdikt: {q(verdikt)}",
             f"spousteni: {q(spousteni)}", f"soubor: {q(soubor)}", "---", "",
             f"# {name}", "", f"**Použij, až:** {pouzij}", "", f"**Spuštění:** {spousteni}", "",
             f"**Popis od autora:** {re.sub(chr(10), ' ', str(popis)).strip()}", ""]
    if odkaz: lines += [odkaz, ""]
    if extra: lines += [extra, ""]
    lines += ["Poznámky z použití:", ""]
    fn = f"{DB}/{folder}/{prefix} – {name}.md"
    if os.path.exists(fn):  # nepřepisovat hodnocení, které už někdo zapsal
        return 0
    open(fn, "w", encoding="utf-8").write("\n".join(lines))
    return 1

n = 0
for zdroj, folder, prefix, d, flt, pro, tema in GROUPS:
    for name in sorted(os.listdir(d)):
        p = f"{d}/{name}/SKILL.md"
        if not os.path.isfile(p) or (flt and not flt(name)): continue
        desc = fm(p).get("description", "")
        rel = p.replace(VAULT + "/", "vault/").replace(HOME + "/", "~/")
        n += write(folder, prefix, name, zdroj, "nainstalovaný skill", pro, tema, short(desc), desc, rel,
                   f"[Otevřít SKILL.md](<file:///{p}>)", f"/{name}" + (" (jen v sezení otevřeném v GrowOS)" if prefix == "GOS" else ""))
print("skills", n)

ANT = {  # vestavěné skilly Claude Code / anthropic-skills (bez lokálního souboru)
 "docx": "vytvořit nebo upravit Word dokument", "pdf": "číst, spojovat, vyplňovat nebo vytvářet PDF",
 "pptx": "vytvořit nebo upravit prezentaci v PowerPointu", "xlsx": "pracovat s tabulkou Excel/CSV",
 "skill-creator": "postavit nový skill nebo vylepšit existující, včetně testů",
 "consolidate-memory": "uklidit paměť Claude — sloučit duplicity, opravit zastaralé",
 "import-memory": "převést paměť z jiného AI asistenta do Claude",
 "schedule": "naplánovat opakovaný úkol, který běží v cloudu podle času",
 "loop": "opakovat příkaz v intervalu v rámci sezení",
 "artifact-design": "stavět publikovanou stránku (artifact) — design", "artifact-capabilities": "stránka s daty, formulářem, sdíleným stavem",
 "artifact-diagramming": "diagram do stránky", "dataviz": "graf nebo dashboard",
 "code-review": "kontrola změn v kódu", "security-review": "bezpečnostní kontrola kódu", "simplify": "zjednodušit změněný kód",
 "init": "založit CLAUDE.md pro nový projekt", "run": "spustit a vyzkoušet aplikaci projektu",
 "claude-api": "stavět aplikaci nad Claude API", "fewer-permission-prompts": "méně dotazů na povolení (povolit bezpečné příkazy)",
 "update-config": "změnit nastavení Claude Code, hooky, oprávnění", "keybindings-help": "klávesové zkratky Claude Code",
 "morning": "ranní přehled (Anthropic)", "explain-usage": "vysvětlit spotřebu a limity", "setup-claude": "úvodní nastavení Claude",
 "docs": "Claude Docs — živé dokumenty", "google-workspace": "práce s Google Workspace",
}
n = 0
for name, what in ANT.items():
    n += write("Anthropic", "ANT", name, "Anthropic (vestavěné)", "nainstalovaný skill", ["vlastní"], ["Claude Code"], what, what,
               "", "", f"/{name} (vestavěné, bez souboru na disku)")
print("anthropic", n)

SLUZBY = [  # (název, k čemu, stav, zdroj)
 ("Gmail", "číst, třídit a psát koncepty e-mailů; svodka z newsletterů", "použito"),
 ("Google Kalendář", "číst a zakládat bloky v kalendáři (vč. Todoist kalendáře)", "použito"),
 ("Google Disk", "hledat a číst soubory na Disku (knihovna, Mundus Symbolicus)", "použito"),
 ("Notion", "Note Inbox, Skills DB, Slepé kuře, knihovna", "použito"),
 ("Drip", "newslettery LCEnglish — metriky, koncepty broadcastů", "použito"),
 ("Canva", "návrhy grafiky, export, šablony značky", "neprozkoumáno"),
 ("Leadpages", "landing pages a blog (účet Grow)", "neprozkoumáno"),
 ("Claude Docs", "živé dokumenty na claude.ai, sdílitelné", "neprozkoumáno"),
 ("Claude in Chrome", "ovládání tvého Chromu s přihlášením (kurzy, weby)", "použito"),
 ("Vestavěný prohlížeč", "prohlížeč přímo v aplikaci Claude, oddělený od Chromu", "neprozkoumáno"),
 ("Computer use", "ovládání desktopových aplikací (Word apod.) přes obrazovku", "neprozkoumáno"),
 ("Scheduled tasks", "naplánované úlohy v aplikaci Claude", "neprozkoumáno"),
 ("AI Black Magic konektor", "knihovna promptů a skillů (trial skončil 260928)", "použito"),
]
APPS = [
 ("NotebookLM (CLI)", "dotazy do Lenčiných notebooků z Claude Code", "použito", "reference_notebooklm_cli"),
 ("Zotero API", "čtení kolekcí a zápis not v Zoteru", "použito", "reference_zotero_api_key"),
 ("Blotato", "plánování příspěvků na sociální sítě (trial)", "neprozkoumáno", ""),
 ("Cowork", "Claude Cowork — cloudová sezení (Win10: lokální VM ne)", "prohlédnuto", "project_cowork_windows"),
]
n = 0
for name, what, stav in SLUZBY:
    n += write("Služby a aplikace", "SLU", name, "napojená služba (konektor)", "konektor", ["vlastní"], ["napojení"], what, what, "", "",
               "stačí říct, co chceš — Claude konektor použije sám", stav=stav)
for name, what, stav, mem in APPS:
    extra = f"Podrobnosti v paměti Claude: `{mem}`" if mem else ""
    n += write("Služby a aplikace", "APP", name, "aplikace", "aplikace", ["vlastní"], ["napojení"], what, what, "", "",
               "přes Claude Code", stav=stav, extra=extra)
print("sluzby+apps", n)
