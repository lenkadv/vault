# Postup: GrowOS ve vaultu

Přesunuto z `CLAUDE.md` 260926 (zkrácení hlavního návodu) — text beze změny. `CLAUDE.md` drží jen základní pravidla; Claude čte tenhle soubor při práci na lcenglish/tadylenka výstupech a publishing projektech.

GrowOS (`GrowOS/`) je samostatný marketing systém pro tadylenka a lcenglish.
**Od 260906 běží GrowOS 2.0** (migrace z 0.1 — viz [[growos-2-migration]]).

## Jak je 2.0 postavené

- **Charta je `GrowOS/AGENTS.md`** (CLAUDE.md tam jen odkazuje). Při práci v GrowOS
  kontextu se řídit `AGENTS.md` a `system/standards/`.
- Znalosti byznysu žijí v `GrowOS/<byznys>/brain/` (business, audience, voice, brand,
  plan, competitors, compliance, methodology, ideas, decisions + složky proof/,
  stories/, samples/, research/, assets/, lessons/, inbox/).
- Hotové kusy vznikají jako **work items** v `GrowOS/<byznys>/work/<kanál>/` — jeden
  `.md` se štítkem a stavem `draft → review → changes → approved → published`. To je
  **review fronta GrowOS**, oddělená od vault GTD.
- `GrowOS/<byznys>/setup.md` — per-kanál nastavení. Vše `route: manual` + `safe-state`,
  nic není `live`. Tajemství jen v `GrowOS/<byznys>/.env` (Claude má blokované čtení),
  MCP klíče v `GrowOS/.mcp.json`.
- **Guard hooky** blokují Claudovi editace `GrowOS/system/`, `.claude/`, `.agents/`,
  `AGENTS.md`, `CLAUDE.md` a zápis do cizí byznys složky. **Systémové změny v těchto
  cestách dělá Lenka sama.**

## Hybrid: vault GTD vs GrowOS work fronta

- **`projects/lcenglish-art-for-english.md`, `projects/tadylenka-publishing.md`** drží
  strategii, kadenci, „Vydané díly", „Aktuální stav" a **`#next-action` = co vyrobit
  dál** (viditelné v [[next-actions]] přes 🌱 lcenglish / 🌱 tadylenka).
- **Konkrétní výroba** (napsat newsletter, carousel, recenzi) = **work item
  v `GrowOS/<byznys>/work/`**, prochází review frontou GrowOS. Jednotlivé kroky výroby
  se do vault GTD **nepíšou** — v projektu je jen `#next-action` na úrovni „připravit
  epizodu #NN".
- Po `published` → aktualizovat „Aktuální stav" v projektu + next-action advancement.

## Vlastní skilly (přenesené z 0.1, cesty na 2.0)

- `/drip` — Drip API pro LCEnglish (`DRIP_API_KEY` v `lcenglish/.env`). Vedle něj
  je připojený **Drip MCP** (od 260927) — totéž API; kterou cestu použít, volí Claude
  (typicky MCP na dotazy a zápisy, API na hromadná stahování do souborů).
  **Zakládání broadcastů jako draftů je vítaná pomoc** (skill `/drip` je v tomhle
  zastaralý — tvrdí read-only). Odesílá/plánuje Lenka ve webovém Dripu; odeslání,
  naplánování a mazání/odhlašování odběratelů jen po výslovném potvrzení.
  „Výsledná verze" od Lenky = už upraveno v Dripu, nezakládat duplicitní draft.
  **Smyčka učení (260927):** Claude založí draft v Dripu a svou verzi (předmět,
  preheader, text, broadcast ID) uloží do `GrowOS/lcenglish/work/email/` → Lenka
  draft v Dripu doupraví a odešle → Claude přečte odeslanou verzi (`get_broadcast`),
  porovná se svou a opakující se úpravy (slova, délka, tón, struktura, předmět)
  zapíše do `GrowOS/lcenglish/brain/lessons/`. Kdy: jakmile Lenka řekne „odesláno“,
  jinak nejpozději na začátku přípravy dalšího newsletteru (dohnat všechny
  neporovnané). Jednorázovou úpravu nezobecňovat — lekce až z opakování nebo když
  je změna zjevně zásadová.
- `/metricool` — draft social postů + otevře Metricool v prohlížeči (potřebuje
  playwright MCP; bez něj copy-paste fallback).
- `/inbox-review` — Notion Content Inbox → `brain/ideas.md` (lcenglish) /
  `library/content-bank/` (tadylenka).
- `/review-exhibition` — recenze výstavy přes coach interview → `work/articles/`.
- `/last30days` — research (vlastní `~/.config`, na GrowOS nezávisí).

## LCEnglish Art for English — sync projektu

Po každém vydání epizody aktualizovat [[lcenglish-art-for-english]]:
1. Přidat epizodu do sekce **Vydané díly** (číslo, umělec, dílo, gramatika, datum)
2. Nahradit `#next-action` v sekci **Sekvence** konkrétní příští epizodou z curriculum
   (`GrowOS/lcenglish/brain/research/art-bites-curriculum-2026.md`)

Po dokončení newsletteru epizody zapsat skutečný čas do `C:\Users\Lenka\.claude\projects\G--M-j-disk-vault\memory\project_task_durations.md` — sekce "LCEnglish Art for English — epizoda". Formát: úkol, skutečný čas, poznámka (co zdrželo nebo proč bylo rychle), datum.

## Publishing projekty — sync Aktuální stav

Po dokončení každého publishing cyklu (poslední task označen ✅) okamžitě aktualizovat sekci **Aktuální stav** v projektovém souboru:
- `Poslední [typ výstupu]:` → nové datum a název výstupu
- `Další výstup:` → příští krok podle kadence

Platí pro všechny publishing projekty: [[tadylenka-publishing]], [[lcenglish-art-for-english]] a další.

## tadylenka — podrobnosti kadence

- Námět předem z runway v [[projects/tadylenka-publishing]] + banka `GrowOS/tadylenka/library/content-bank/` (pohled `Content Bank.base`, schéma `content-bank/_SCHEMA.md`).
- IG carousel a Substack Notes = **pozdější fáze**, ne teď. Zváží se při sprint review, až bude článková kadence zajetá.
- Recenze výstav a vlajkový esej běží nezávisle, bez rozvrhu (recenze navázané na studium).
- Cílové tempo, ne bič — laťka nízko schválně, při nárazu jiné práce se díl posune. Reálný čas na díl → `memory/project_task_durations.md`. Sezónní kalendář nárazů viz [[projects/tadylenka-publishing]].
