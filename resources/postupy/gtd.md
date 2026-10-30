# GTD — kde se co zobrazuje, archivace projektů, tasky v denním plánu

Přesunuto z `CLAUDE.md` 261030 (zeštíhlení, znění beze změny, nadpisy o úroveň výš). Čte se při denním plánu, weekly review, archivaci projektu nebo přesunu do someday a když se ptáš, kde se task zobrazí. Ostatní pravidla Task Managementu (kam tasky zapisovat, jedna next action, karta na tabuli, advancement, „Nezapomenout“, Zakázáno) zůstávají v `CLAUDE.md`.

## Jak se tasky zobrazují v GTD

[[next-actions]] (Tasks plugin): **🌱 tadylenka / 🌱 lcenglish** (`#next-action` ze souborů s tím názvem v cestě) · **@online / @telefon / @doma / @venku** (manuální + projektové podle context tagu) · **📚 Zettelkasten** (`#zettel` z `resources/` a `zettelkasten/literature/`) · **⏰ Follow-upy** (waiting-for do 4 dnů).

[[master-dashboard]] (Dataview): next actions z `projects/`, inbox, waiting-for, projekty bez next action. GrowOS review fronta je samostatná (`node GrowOS/system/tools/growos.js doctor`).

| Chci vědět… | Otevřu… |
|---|---|
| Co teď udělat (podle kontextu) | [[next-actions]] |
| Celkový stav všech projektů | [[master-dashboard]] |
| Co čeká na někoho (vše) | [[waiting-for]] |

## projects/ obsahuje jen živé projekty

- `projects/` = jen projekty s aktivní `#next-action`
- Projekt v someday → **smazat projektový soubor**, přesunout vše potřebné do someday záznamu (someday záznam musí být akční sám o sobě — bez dalších kliknutí)
- Projekt dokončen → přesunout do `archive/`, zkontrolovat a vyčistit stopy v `areas/`, `gtd/`, `inbox/`

## Daily plan — tasky z projektů jsou reference, ne checkboxy

Tasky z `projects/` se v daily plan zapisují jako **plain bullet bez checkboxu** s wiki-linkem: `- Název tasku → [[název-projektu]]`. Checkbox žije jen v projektovém souboru. Odškrtnutí = jdi do projektu, odškrtni tam + proveď next-action advancement. Výjimka: ad-hoc tasky vzniklé přímo v daily plan (bez projektu) mohou mít checkbox.

## Vždy odkaz na zdroj — u e-mailů (z CLAUDE.md, Pravidla)

Totéž stojí i v [[resources/postupy/svodka]] (krok 3).

  - shrnutí **+ přímý proklik na zdroj** uložen → mail může do koše (`Svodka/smazat`);
  - jen shrnutí bez přímého prokliku (odkaz vede jen na mail) → mail **zůstává dohledatelný v archivu**, nemazat;
  - Substack a jiné na webu dohledatelné texty, běžná oznámení bez odkazu (např. „registrace brzy“) → mail může do koše.
