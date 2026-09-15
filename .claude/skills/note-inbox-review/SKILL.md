---
name: note-inbox-review
description: "Zpracuj Note Inbox z Notionu — načti položky, navrhni destinace ve vault, ulož a archivuj."
argument-hint: ""
user-invocable: true
---

# Note Inbox Review

**Účel:** Projít nové položky z Note Inbox v Notionu a uložit je na správná místa ve vault.
**Spouštěč:** `/note-inbox-review`

---

## Databáze

- **Note Inbox (data source):** `collection://c5beecc0-49a5-4bc7-9a32-b7991caeb759`
- **Archive Note Inbox (data source):** `354aeae6-0bc6-8051-ae02-000b8357a1c3`

---

## Vault struktura

```
inbox/omnibus.md                          ← obecné zachycení k pozdějšímu zpracování
areas/                                    ← trvalé oblasti: tadylenka, lcenglish, health, finances-admin, family, japanese, slepekure, studies
projects/                                 ← časově ohraničené projekty s koncem
gtd/next-actions.md                       ← konkrétní další kroky podle kontextu
zettelkasten/literature/                  ← poznámky ze zdrojů
GrowOS/tadylenka/content-ideas.md         ← content nápady pro tadylenka
GrowOS/tadylenka/swipe-files/swipe-content.md ← swipe file pro tadylenka
GrowOS/lcenglish/content-ideas.md         ← content nápady pro lcenglish
GrowOS/lcenglish/swipe-files/swipe-content.md ← swipe file pro lcenglish
```

---

## Krok 0 — Načti kontext

Před triáží načti **paralelně**:
- `CLAUDE.md` — struktura vault a workflow
- `gtd/next-actions.md` — aktuální priority
- `GrowOS/tadylenka/brand.md` — hlas a styl tadylenka (sekce 4: Brand Voice)
- `GrowOS/tadylenka/lessons.md` — naučená pravidla pro tadylenka
- `GrowOS/lcenglish/brand.md` — hlas a styl lcenglish (sekce 4: Brand Voice)
- `GrowOS/lcenglish/lessons.md` — naučená pravidla pro lcenglish

---

## Krok 1 — Načti inbox

**Nepoužívej `notion-search` s prázdným nebo `*` dotazem** — sémantické vyhledávání na prázdný/wildcard dotaz nevrací nic, i když v databázi položky jsou (ověřeno 260823, skill kvůli tomu tvrdil "inbox je prázdný" dvě review po sobě, i když tam byly 3 nezpracované položky). Note Inbox obsahuje pouze nepřesunuté záznamy — archivované jsou v Archive Note Inbox (přesouvají se tam v Kroku 5, ne přes checkbox).

Použij `notion-query-data-sources` (SQL mode):

```
mode: sql
data_source_urls: ["collection://c5beecc0-49a5-4bc7-9a32-b7991caeb759"]
query: SELECT url, "Name", "Status", "Tags", "userDefined:URL", "Date" FROM "collection://c5beecc0-49a5-4bc7-9a32-b7991caeb759" ORDER BY "Date" ASC LIMIT 10
```

(Netřeba filtrovat na `Archive` — v této databázi zpracované položky přestávají existovat jako non-archived tím, že jsou fyzicky přesunuté do jiné databáze v Kroku 5, ne označené checkboxem. Pole `Archive` v schématu je nepoužívané/legacy — neopírej se o něj.)

Pokud SQL query selže kvůli omezení plánu, zkus `notion-search` s konkrétním neprázdným dotazem (např. částí názvu) jako fallback, ale nikdy s `*` nebo prázdným stringem.

Výsledek = 10 nejstarších položek. Pokud je inbox prázdný → řekni a skonči.

Zapiš si pro každou položku: **page ID (z url)**, **titulek**, **Tags**, **Status**, **URL**.

---

## Krok 2 — Načti obsah položek

Fetchni všechny stránky **paralelně v batchích po 5** přes `notion-fetch`.

Z každé stránky si vezmi:
- `userDefined:URL` — odkaz na zdroj
- `Tags` — signály pro routing
- `Status` — priorita (High/Medium/Low Priority, Add To Calendar)
- `Content Idea` — checkbox (pokud true → patří do tadylenka)
- obsah stránky, pokud existuje

---

## Krok 3 — Navrhni destinace

### Vstupní filtr (spusť před každou položkou)

Před navržením destinace do Obsidianu: **K jakému konkrétnímu projektu nebo problému toto Lenka použije v příštích 3 měsících?**

| Situace | Akce |
|---------|------|
| Odpověď konkrétní | Uložit do Obsidianu na správné místo |
| Odpověď nejasná | `[Notion archiv]` — do Obsidianu nic |
| „Chci dál zpracovat, nevím jak" | `[Omnibus]` — jen výjimečně |

Výjimky: Akademické zdroje projdou filtrem pokud jde o aktivní seminářku/bakalářku nebo pokud Lenka explicitně chce zdroj v resources/. Swipe projde pokud jde o formát nebo mechaniku s jasnou adaptací pro tadylenka nebo lcenglish.

Prezentuj tabulku:

| # | Název | Konkrétní použití | Návrh |
|---|-------|-------------------|-------|

**Routing vodítko:**

| Signál | Doporučená destinace |
|--------|---------------------|
| `content` nebo `Content Idea = true` nebo zaměřeno na umění/psaní/osobní brand | `[NL: tadylenka]`, `[IG: tadylenka]`, nebo `[Swipe: tadylenka]` |
| Zmínka „LCEnglish" nebo zaměřeno na výuku jazyků, angličtinu, učení | `[NL: lcenglish]`, `[IG: lcenglish]`, nebo `[Swipe: lcenglish]` |
| `art` | `[Area: tadylenka]` nebo `[Area: studies]` podle kontextu |
| `marketing` | `[Area: tadylenka]` nebo `[Area: lcenglish]` podle kontextu |
| `latin` | `[Area: studies]` |
| `to read` / `reading` | `[Note: slug]` nebo `[Omnibus]` |
| `to watch` | `[Note: slug]` nebo `[Omnibus]` |
| `AI` / `Tool = true` | `[Omnibus]` nebo `[Note: slug]` |
| `recipes` | **Notion only** — přidej tag "recipes" + přesuň do archivu (bez vault souboru) |
| `food places` | `[Omnibus]` |
| Tip na knížku | `[Books]` → `📖 Book Recommendations` DB |
| Konkrétní umělecké dílo (obraz/socha), které Lenku zaujalo — ne formát/mechanika k napodobení, ale dílo samo | `[Art Image Bank]` → `Art Image Bank — tadylenka` DB |
| Status: `High Priority` | `[GTD]` → @online nebo příslušná `[Area: X]` |
| Status: `Add To Calendar` | `[GTD]` → @online s poznámkou o datu |
| Bez kontextu / nepotřebné | `[Smazat]` |

**Možné destinace:**
- **[Resource: téma]** — vytvoří/aktualizuje `resources/[téma].md` s kontextovým háčkem (pro studies zdroje místo [Area: studies])
- **[Area: X]** — X = tadylenka / health / family / finances / japanese / slepekure / lcenglish (ne studies — viz [Resource: téma])
- **[Project: název]** — vytvoří/aktualizuje `projects/název.md`
- **[Note: slug]** — vytvoří `zettelkasten/literature/slug.md`
- **[GTD]** — přidá do `gtd/next-actions.md` (kontexty: @online, @telefon jen pro hovory, @venku/pochůzky)
- **[NL: tadylenka]** / **[IG: tadylenka]** / **[NL+IG: tadylenka]** — námět na newsletter nebo IG post pro tadylenka → `content-ideas.md`
- **[Swipe: tadylenka]** — zajímavý formát nebo přístup k napodobení → `swipe-files/swipe-content.md`
- **[NL: lcenglish]** / **[IG: lcenglish]** / **[NL+IG: lcenglish]** — námět pro lcenglish → `content-ideas.md`
- **[Swipe: lcenglish]** — swipe file pro lcenglish → `swipe-files/swipe-content.md`
- **[Omnibus]** — přidá do `inbox/omnibus.md`
- **[Books]** — vytvoří záznam v Notion DB `📖 Book Recommendations` (`collection://2a5e491b-229c-4daa-834b-1f7e67948738`) — viz sekce níže
- **[Art Image Bank]** — vytvoří záznam v Notion DB `Art Image Bank — tadylenka` (`collection://9b7a40ab-08d6-424b-adee-b005c0f5775a`) — viz sekce níže
- **[Smazat]** — přesune do archivu bez uložení (bez vault souboru)

Uživatelka opraví co nesedí, zbytek bere jako schváleno.

---

## Krok 4 — Ulož potvrzené položky

### Linking — obecné pravidlo pro všechny vault soubory

Při každém uložení do vault aktivně hledej propojení s existujícími soubory a přidej Obsidian wiki-linky `[[...]]`. Nepiš linky naslepo — jen na soubory, které skutečně existují (zkontroluj přes Glob nebo Grep). Název wiki-linku = název souboru bez přípony `.md`.

Kde linkovat:
- Oblasti a projekty se propojují navzájem: `[[areas/tadylenka]]`, `[[projects/název]]`
- Content nápady odkazují na zettelkasten: `[[zettelkasten/permanent/YYMMDD-HHMM Název]]` nebo `[[zettelkasten/literature/LN – Název]]`
- Literatura notes odkazují na existující permanent notes: `[[YYMMDD-HHMM Název myšlenky]]` (jen název souboru, Obsidian nepotřebuje celou cestu)

---

### [Resource: téma] → `resources/[téma].md`

Pokud soubor neexistuje, vytvoř s frontmatter:
```markdown
---
type: resource
area: [studies / tadylenka / ...]
---

# [Téma] — zdroje

[Stručný kontext — k čemu klastr slouží]

## Zdroje

- **Název** — autor (rok) — [odkaz]
  - Použij, až budeš řešit: [konkrétní problém]
  - `- [ ] #zettel Zpracovat: [[Název]]` (jen pokud je myšlenkově silný)

*Viz také: [[areas/studies]]*
```

Pokud soubor existuje, přidej nový záznam do sekce `## Zdroje`.

### [Area: X] → `areas/[X].md`

Přidej na konec nebo do relevantní sekce:
```
- [Název / poznámka] — [URL]
  *(ze záznamu: [krátký kontext])*
  Spojení: [[projects/název]] [[zettelkasten/permanent/...]] (jen pokud existují)
```

### [Project: název] → `projects/[název].md`

Pokud soubor neexistuje, vytvoř s minimální strukturou:
```markdown
# [Název projektu]

Oblast: [[areas/X]]

## Co to je

[Stručný popis z Notion záznamu]

## Příští krok

(doplnit)
```

### [Note: slug] → `zettelkasten/literature/[slug].md`

Vytvoř nebo doplň note podle šablony z CLAUDE.md. Slug = stručný název bez diakritiky.

Na konci sekce "Permanent notes, které z toho vzniknou" aktivně navrhni 1–2 atomické myšlenky, které by z tohoto zdroje mohly vzniknout jako permanent notes — i když ještě neexistují.

V sekci "Otázky a reakce" přidej `[[...]]` na existující permanent notes, které s tímto zdrojem rezonují.

### [GTD] → `gtd/next-actions.md`

Přidej jako novou checkbox položku do správné sekce podle kontextu (@počítač, @telefon, @venku/pochůzky, @čekání).

### [NL/IG/NL+IG: tadylenka] nebo [NL/IG/NL+IG: lcenglish] → `GrowOS/[business]/content-ideas.md`

Přidej do sekce `## Quick Capture` (nové záznamy nahoře, pod `<!-- Add new captures at the top -->`):

```
### [DATUM] — Z Notion inboxu

- [NL] [případně i IG] [Název nebo téma]
  - Zdroj: [URL pokud existuje]
  - Angle: [co je na tom zajímavého, jak uchopit — vycházej z brand.md a lessons.md]
  - [Rubrika pokud sedí]
  - Intent type: [TEACH / STORY / HOT TAKE / ENGAGE / OBSERVE]
  - Vault: [[...]] (odkazy na relevantní zettelkasten noty, areas nebo projects — jen pokud existují)
```

Pro [IG] přidej navíc:
- Navrhovaný formát (carousel / post / reel)
- Návrh hooku pokud je zřejmý

Vault linking pro tadylenka je obzvlášť důležitý — tadylenka se prolíná s osobním životem, výzkumem a studiem. Hledej propojení v `zettelkasten/`, `areas/studies.md`, `areas/tadylenka.md` a `projects/`.

### [Swipe: tadylenka] nebo [Swipe: lcenglish] → `GrowOS/[business]/swipe-files/swipe-content.md`

```
## [DATUM] — [Název/zdroj]

- **Co to je:** [popis]
- **Proč to funguje:** [co je na formátu nebo přístupu zajímavého]
- **Jak použít:** [konkrétní inspirace pro daný business]
- Odkaz: [URL]
- Vault: [[...]] (jen pokud existuje relevantní propojení)
```

### [Omnibus] → `inbox/omnibus.md`

Přidej do nové datované sekce (nové nahoře):
```
## [DATUM]
- **[Název]** — [URL]
```

### [Books] → `📖 Book Recommendations` (Notion)

Vytvoř nový záznam v DB `collection://2a5e491b-229c-4daa-834b-1f7e67948738` pomocí `notion-create-pages`.

Schéma záznamu (vyplň co znáš):
- **Name** — název knihy
- **Author** — autor (pokud znáš)
- **Tags** — žánrové tagy (Historical Fiction, Non-fiction, Art, atd.)
- **Priority** — ⭐ = Low, ⭐⭐ = Medium, ⭐⭐⭐ = High (podle zájmu)
- **Why** — jedna věta proč (z Notion záznamu nebo z obsahu stránky)

Pokud je záznamu víc knih najednou (např. článek "10 nejlepších..."), vytvoř jednu stránku na každou knihu.

### [Art Image Bank] → `Art Image Bank — tadylenka` (Notion)

Vytvoř nový záznam v DB `collection://9b7a40ab-08d6-424b-adee-b005c0f5775a` pomocí `notion-create-pages`.

Schéma záznamu (vyplň co znáš, zbytek nech prázdné — nevymýšlet):
- **Název díla** (title)
- **Umělec**
- **Rok** — rok vzniku nebo rozsah
- **Technika / materiál** — multi-select z existujících hodnot (oil on canvas, watercolour, drawing, ...)
- **Rozměry** — výška × šířka v cm
- **Majitel / muzeum**
- **Zdroj URL** — odkaz na vysoké rozlišení (Wikimedia, muzejní sbírka apod.), jinak zdrojový odkaz ze záznamu
- **Poznámky** — kontext, odkud dílo pochází (např. sdíleno v Substack Note od X)
- **Kde viděla** / **Viděla naživo** / **Použito v** — vyplnit jen pokud je to ze záznamu zřejmé

---

## Krok 5 — Přesuň zpracované položky do archivu

Přesuň **všechny zpracované i smazané položky** do Archive Note Inbox:

```
notion-move-pages
  page_or_database_ids: [všechna relevantní page ID]
  new_parent: { type: "data_source_id", data_source_id: "354aeae6-0bc6-8051-ae02-000b8357a1c3" }
```

Přesun proveď **paralelně** — jedním voláním se všemi ID najednou (limit 100).

---

## Krok 6 — Shrnutí

Jednou větou: kolik položek zpracováno a kam šly. Pokud zbývají další položky v Note Inbox, navrhni pokračovat.

---

## Technické poznámky

- Note Inbox a Archive Note Inbox jsou dvě oddělené databáze — items se přesouvají mezi nimi pomocí `notion-move-pages`
- Nikdy nepoužívej `notion-update-page` pro archivaci — používej `notion-move-pages`
- `gtd/next-actions.md` nemá tvrdý limit, ale každá položka musí být konkrétní a akční
- Zpracovává se 10 položek najednou. Po dokončení se zeptej, zda pokračovat dalšími 10.
