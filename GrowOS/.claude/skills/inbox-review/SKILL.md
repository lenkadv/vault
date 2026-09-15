---
name: inbox-review
description: "Zpracuj content inbox z Notionu — načti všechny nové položky, navrhni destinace, ulož a přesuň do archivu."
argument-hint: ""
user-invocable: true
---

# Inbox Review

**Účel:** Projít nové položky v content inboxu, vyhodnotit je a uložit na správné místo.
**Spouštěč:** `/inbox-review`

---

## Architektura

Inbox a archiv jsou dvě oddělené databáze. Inbox obsahuje **výhradně nezpracované položky** — zpracované jsou přesunuty do archivu. Díky tomu `notion-search` na inbox vrátí vždy jen nové položky bez jakéhokoliv filtrování.

- **Inbox collection:** `9ca41150-9058-4451-a283-d32545976937`
- **Archiv data source:** `352aeae6-0bc6-8163-ad40-000b7adda3e4`

---

## Krok 0 — Načti kontext

Načti `[active-business]/brain/lessons/` a `brain/ideas.md`.

**Zjisti úložný režim businessu** (GrowOS 2.0):
- **Base režim** — existuje `[active-business]/library/content-bank/` (složka jednotlivých souborů + `Content Bank.base`). Platí pro **tadylenka**. Nové nápady = jednotlivé soubory do `library/content-bank/` (viz Krok 4). Zdroj pravdy pro schéma je `[active-business]/library/content-bank/_SCHEMA.md` — přečti ho před ukládáním. Nezralé / nepoužitelné věci: `status: retired` (pohled „Retired / mimo").
- **Ideas režim** (výchozí) — banka je jeden soubor `[active-business]/brain/ideas.md`. Platí pro **lcenglish**. Nový nápad = nový řádek v `brain/ideas.md` ve formátu `- <nápad> — channel: <kanál> · status: fresh · added: RRRR-MM-DD`. Nedozrálé věci se nechávají v Notion inboxu (nepřesouvají se), nebo dostanou `status: retired`, když je jasné, že se nepoužijí.

---

## Krok 1 — Načti inbox

```
notion-search, data_source_url: collection://9ca41150-9058-4451-a283-d32545976937
query: "", page_size: 25, max_highlight_length: 0
```

Výsledek = všechny nezpracované položky. Pokud je prázdný → řekni uživatelce a skonči.

Zapiš si pro každou položku: **page ID** a **titulek**.

---

## Krok 2 — Načti obsah všech položek najednou

Fetchni všechny stránky **paralelně v batchích po 5** přes `notion-fetch`.

Z každé stránky si vezmi:
- `userDefined:URL` — odkaz na zdroj
- obsah stránky — Notion někdy cachuje text z odkazu, využij to

Pokud stránka nemá obsah ani URL → pracuj jen s titulkem.

---

## Krok 3 — Navrhni destinace pro všechny položky najednou

Prezentuj přehlednou tabulku:

| # | Název | Co to je | Návrh |
|---|-------|----------|-------|

Možné destinace:
- **[NL]** — námět na newsletter
- **[IG]** — námět na IG post/carousel
- **[NL+IG]** — oboje
- **[Swipe]** — zajímavý formát nebo přístup k napodobení
- **[Uležet]** — zatím necháme v inboxu, nepřesouváme
- **[Smazat]** — přesuneme do archivu bez uložení

Uživatelka opraví co nesedí, zbytek bere jako schváleno.

---

## Krok 4 — Ulož potvrzené položky

### [NL] nebo [NL+IG] — Ideas režim (lcenglish) → `[active-business]/brain/ideas.md`

Přidej řádek do sekce `## The bank` (do vhodné podsekce podle kanálu, nové nahoře):

```
- <nápad — jedna jasná věta; rubrika pokud sedí; zdroj URL na konci> — channel: <email|instagram|articles|video|strategy> · status: fresh · added: RRRR-MM-DD
```

Pro [NL+IG] uveď oba kanály nebo dej řádek do obou podsekcí.

### [NL], [IG] nebo [NL+IG] — Base režim (tadylenka) → `[active-business]/library/content-bank/`

V Base režimu se **neřeší formát** (článek / carousel / Note) — banka je jen náměty a zdroje. Vytvoř nový soubor `library/content-bank/[téma — slug].md` (**bez data v názvu, bez názvu rubriky v názvu**):

```yaml
---
project: tadylenka
type: content-idea
rubrika: jine        # zeny-v-obraze | co-vidis | vsichni-svati | jine | mimo
status: fresh        # fresh | used | retired
temata: []           # skutečné téma (umělec / dílo / symbol) — vyplnit JEN u 3 hlavních rubrik, jinak []
datum_zachyceno: "[YYMMDD]"
zdroj: ["[URL pokud existuje]"]
---

# [téma]

## Úhel
[2–4 věty: o čem to je a co je na tom zajímavé, jak to uchopit]

## Inspirační zdroje
- [název / účet] — [URL] — [co konkrétně odtud beru]
```

Volba `rubrika`:
- Sedí do některé ze tří rotujících rubrik (žena z díla / jeden obraz zblízka vč. symbolů a motivů / světci) → `zeny-v-obraze`, `co-vidis` nebo `vsichni-svati`, a **vyplň `temata`** (konkrétní umělec, dílo, symbol).
- Nezapadá → `jine` (pool, `temata: []`).
- Není to námět (kontakt, banka titulků, popis formátu) → `rubrika: mimo`, `status: retired`.

### [Swipe] → `[active-business]/library/swipe-content.md`

```
## [DATUM] — [Název/zdroj]

- **Co to je:** [popis]
- **Proč to funguje:** [co je na formátu nebo přístupu zajímavého]
- **Jak použít:** [konkrétní inspirace]
- Odkaz: [URL]
```

### [Uležet] — Ideas režim (lcenglish) → nech v Notion inboxu

Nepřesouvej do archivu. Zůstane jako nezpracovaná položka do příště.

### [Uležet] — Base režim (tadylenka) → soubor v `library/content-bank/` se `status: retired`

Stejný postup jako [NL]/[IG] výše, ale `status: retired` a do frontmatteru přidej `poznamka: "[proč čekáme]"`. Položku přesuň do Notion archivu stejně jako ostatní zpracované.

---

## Krok 5 — Přesuň zpracované položky do archivu

Přesuň **všechny položky kromě [Uležet] v Ideas režimu** (včetně [Smazat] a [Uležet] v Base režimu) do archivu:

```
notion-move-pages
  page_or_database_ids: [všechna relevantní page ID]
  new_parent: { type: "data_source_id", data_source_id: "352aeae6-0bc6-8163-ad40-000b7adda3e4" }
```

Přesun proveď **paralelně** — jedním voláním se všemi ID najednou (limit je 100).

---

## Krok 6 — Shrnutí

Jednou větou: kolik položek zpracováno a kam šly.

---

## Technické poznámky

- `notion-search` na inbox vrátí vždy jen nezpracované položky — žádné filtrování není potřeba
- Nikdy nepoužívej `notion-update-page` pro archivaci — používej `notion-move-pages`
- Ideas režim (lcenglish): banka je `[active-business]/brain/ideas.md` (jeden soubor, řádky)
- Base režim (tadylenka): jednotlivé soubory v `library/content-bank/`, `status: fresh`, `rubrika` povinná. Schéma: `library/content-bank/_SCHEMA.md`. Žádná osa formátu.
- Swipe: `[active-business]/library/swipe-content.md`
- Překryv s 2.0 skillem `brain-capture` / složkou `add-to-brain/`: tenhle skill je jen pro **Notion Content Inbox** (Lenčin telefon → Notion). Materiál dropnutý přímo do `add-to-brain/` řeší `brain-capture`, ne tenhle skill.
