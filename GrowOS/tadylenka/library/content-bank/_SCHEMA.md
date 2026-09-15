---
project: tadylenka
type: doc
updated: "260909"
---

# Content bank — schéma

Banka **myšlenek a zdrojů** pro tadylenka. Jeden soubor = jeden námět. Členěno do
rubrik, nic víc. **Formát výstupu (článek / carousel / Note / video) se tady
nesleduje** — to je rozhodnutí až při výrobě, ne vlastnost námětu.

Filtrování přes `Content Bank.base`.

## Frontmatter

```yaml
---
project: tadylenka
type: content-idea
rubrika: "zeny-v-obraze"      # viz níž — povinné
status: fresh                 # fresh | used | retired
temata: ["mytologie"]         # volné příčné tagy (baroko, cesky-uhel, tajny-jazyk, mytologie…)
datum_zachyceno: "260507"     # VŽDY YYMMDD (= GrowOS "added")
datum_pouzito: "260525"       # jen u status: used
zdroj: ["https://…"]          # původní odkazy — MŮŽE být víc; ať se dá osvěžit
---
```

`intent` (TEACH / STORY / HOT TAKE / ENGAGE / OBSERVE) je nepovinný zbytek z migrace — u nových souborů se nevyžaduje.

## Tělo

```markdown
# <téma>

## Úhel
<2–4 věty: o čem to je a co je na tom pro tadylenku zajímavé>

## Inspirační zdroje
- <název / účet> — <URL> — <co konkrétně odtud beru>
- <další zdroj…>             # jeden námět může mít víc zdrojů
```

Většina stávajících souborů má zatím jen `**Zdroj:** <URL>` + krátký angle —
sekce `## Inspirační zdroje` se doplňuje, až se námět rozvíjí, ne zpětně u všech.

## `rubrika` — hodnoty

| hodnota | co to je |
|---|---|
| `zeny-v-obraze` | rotující rubrika — žena z konkrétního díla, její příběh |
| `co-vidis` | rotující rubrika — jeden obraz zblízka; patří sem i symboly, atributy a motivy napříč díly („tajný jazyk" jako `temata` tag) |
| `vsichni-svati` | rotující rubrika — ikonografie a hagiografie světců |
| `jine` | námět, který nezapadá do žádné ze tří rubrik — pool (portréty umělců, eseje, praktické). Použitelné na vlajkový esej, IG, cokoli. |
| `mimo` | není námět (kontakty, banka titulků, definice sérií/formátů, časově vázané seznamy) → `status: retired` |

`tajny-jazyk` a `cesky-uhel` jsou příčné `temata` tagy, ne rubriky.

## `status` — hodnoty (GrowOS default)

| hodnota | co to znamená |
|---|---|
| `fresh` | živý nápad, může se vybrat |
| `used` | publikováno (+ `datum_pouzito`) |
| `retired` | zabito, nebo someday-maybe |

Kandidatura na runway **není stav** — námět je buď zapsaný v runway tabulce
v [[projects/tadylenka-publishing]], nebo není.

## Runway se neplní každý týden

Runway se plní **dávkově dopředu** (jako curriculum u Art for English), ne
výběrem dílu po dílu každý týden. Dá se kdykoli dynamicky vstoupit a přehodnotit
(dozrálé téma, výstava) — ale není to bod weekly review.

## Nové záchyty

`/inbox-review` (Base režim) → nový soubor sem, `status: fresh`, rubrika. Syrové
inspirace bez jasné rubriky → `rubrika: jine`. Formátové vzory od jiných tvůrců →
`../swipe-content.md`, ne sem.
