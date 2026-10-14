# Ideas

> Banka nápadů tadylenka žije jako **`library/content-bank/`** — jednotlivé
> soubory (jeden = jeden námět), filtrované přes `Content Bank.base`. Plné schéma
> je v **`library/content-bank/_SCHEMA.md`**. Nepřevádět zpět do jednoho souboru.

## How this works

Anything can go in. An idea does not have to be good, finished, or even a whole
sentence. Half of them will never be used, and that is the point — you cannot pick
the good ones until there are enough to pick from.

The system proposes new ideas here with a note about where each came from. It
never turns an idea into published work on its own; ideas become drafts, drafts go
to your review queue, and you decide.

## The shape of a line

One idea per line. Each line carries the idea, the channel it fits, its status,
and the date it was added:

```
- <the idea, one clear line> — channel: <channel> · status: <fresh|used|retired> · added: YYYY-MM-DD
```

- **channel** is where the idea would run: `social`, `email`, `ads`, `video`,
  `pages`, `articles`, `visuals`, a platform name like `instagram`, or `strategy`
  for a bigger swing (a launch, a new offer, a whole campaign).
- **status** is `fresh` (waiting to be made), `used` (a draft was made from it —
  the line then also carries a `used:` date and the work item's path), or
  `retired` (killed, but kept so the same idea does not come round again).

You can edit any of this by hand — it is your file. Flip a `fresh` idea to
`retired` to kill it, or move a status yourself any time.

## Jak to funguje
- Nový námět → nový soubor v `library/content-bank/`, `status: fresh`, `rubrika`.
- **`rubrika`:** `zeny-v-obraze` / `co-vidis` / `vsichni-svati` (3 rotující) + `jine` (nezapadá do rubriky, pool) + `mimo` (není námět → `retired`).
- **`status`:** `fresh` / `used` / `retired` (GrowOS default; `retired` = zabito i someday).
- **`temata`:** skutečné téma položky (konkrétní umělec/dílo/symbol) — plní se jen u tří hlavních rubrik.
- **Žádná osa formátu** — jestli z námětu bude článek, carousel nebo Note se rozhoduje až při výrobě.
- Pohled `Content Bank.base` → „Tři rubriky" / per-rubrika / „Jiné" / „Použité" / „Retired".
- Výběr do runway (`projects/tadylenka-publishing` (projekt ve vaultu)) se dělá dávkově dopředu, ne každý týden.

## Aktivní / opakující se formáty (odkud brát, když je prázdno)
- **„Ženy v obraze"** — Substack rubrika: žena z díla, její příběh a kontext.
- **„Co vidíš? / Tak vidíš!"** — Substack rubrika: jeden obraz, postupné odhalování (i symboly a motivy).
- **„Všichni svatí"** — Substack rubrika: ikonografie a hagiografie světců.
- **Recenze výstavy** — po každé návštěvě velké výstavy (pro Substack i KTF seminář).
- **IG Stories** — po každé zmínce o výstavě/galerii/muzeu.
- IG carousel („Dějiny umění v X", „Co vidíš" jako carousel) a Notes = **pozdější fáze** (viz [[decisions]] 2026-09-09).

## Bigger swings
- Placené předplatné Substacku (zatím vypnuté) — až bude komunita. — channel: strategy · status: fresh · added: 2026-09-06
- Live akce / procházky Prahou s kulturním kontextem. — channel: strategy · status: fresh · added: 2026-09-06
- Dlouhé YouTube video o umění — neodstartovaný plán, podklady v `library/youtube-planning/`. — channel: video · status: fresh · added: 2026-04-13

## The bank
_Viz `library/content-bank/` — bod výše. Tady se jednotlivé nápady neduplikují._
