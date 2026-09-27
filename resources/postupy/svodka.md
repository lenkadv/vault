# Postup — Svodka z e-mailů (newslettery + nevytříděná pošta)

Svodka = souvislý text po tématech („jako na ministerstvu“), aby Lenka nemusela otevírat zdroje. Projekt: [[svodka-newsletteru]]. Ustáleno 260927 podle Lenčiny zpětné vazby ke svodce č. 1.

## Kdy

- **Součást denního otvíracího rituálu** (`/daily-plan`, krok „Svodka“). Obvykle za uplynulý den; když se daily plan nedělal víc dní (Lenka pryč), za celé období od posledního čísla.
- Období = od konce posledního čísla (tabulka „Vydaná čísla“ v [[svodka-newsletteru]]) do teď. Po vydání zapsat nový řádek.

## Zdroj

Gmail `lnk.dvorakova@gmail.com`: záložky **Promo akce**, **Aktualizace** a hlavní inbox za dané období (`after:YYYY/MM/DD`). Zájem **neodvozovat z přečteno/nepřečteno**.

## Vyžaduje pozornost → hlavní inbox

- Maily, které vyžadují akci (faktury, výpůjčky, reklamace, účty, termíny, osobní zprávy), jdou jako první oddíl svodky.
- **Každý takový mail přesunout do hlavního (Primary) inboxu**, pokud skončil v Promo akcích nebo Aktualizacích: přidat `CATEGORY_PERSONAL`, odebrat `CATEGORY_PROMOTIONS` / `CATEGORY_UPDATES`. Primary = složka, ze které Lenka maily vyřizuje.
- Konektor Gmail potřebuje oprávnění upravovat štítky (gmail.modify). 260927 ho neměl → pokud přesun selže, dát do svodky u oddílu seznam odkazů a říct Lence jednou větou.
- Věci s termínem zapsat i do GTD podle CLAUDE.md (next-actions / waiting-for) — ale náměty pro práci **ne** (viz níže).

## Formát a pořadí oddílů

1. **Vyžaduje pozornost**
2. **Hlavní body dne** (nebo „dnů“, podle období) — 3–5 bodů
3. **Umělá inteligence** — zprávy i praktické tipy (obojí). Po jednotlivých newsletterech.
4. **Umění a dějiny** — po newsletterech (Art History News, Guardian, NG London, Kunsti, Výstavník…)
5. **Marketing a psaní**
6. **Česko a svět** — krátce; podcasty drobným písmem na konci stačí
7. **Pro tvou práci** — jen návrhy, nic nezakládat
8. **Kandidáti na odhlášení**

Délka: při denní svodce stačí kratší — hlavní je souvislý text, ne seznam.

## Pravidla podle odesílatelů

| Odesílatel | Jak zpracovat |
|---|---|
| **Ethan Mollick (One Useful Thing)** | Nejdůležitější zdroj. Obsáhlejší souhrn: hlavní teze + **konkrétně rozebrat, co dělal a jak** (jeho experimenty, nástroje, postup), aby si to Lenka uměla představit. Lenka si pak pustí audio na Substacku nebo přečte mail. |
| **Substacky obecně** | Číst **celý text** (je v mailu), ne jen titulek. Ke každému krátká poznámka o obsahu. |
| **Danny Iny (Mirasee)** | Lenka jeho práci obdivuje, ale maily nečte (je jich hodně). Shrnout, co v týdnu/dni psal — nechce ho ztratit z pozornosti. |
| **Kennedy — Email Marketing Heroes** | Denní maily. Vtipné shrnutí + pojmenovat **vzorec**: jak se dostal od osobní historky k prodeji/propagaci produktu. Maily chodí dál, Lenka je nemusí číst. |
| **White Label Comedy** | Podobně jako Kennedy — vtipné shrnutí + vzorec. |
| **Drip, Leadpages** | Nástroje, které Lenka používá. Sledovat **vývoj produktu** (nové funkce, změny, webináře o funkcích) a vytáhnout, co by se hodilo pro lcenglish/tadylenka. |
| **Jon Schumacher a podobné sekvence** | Když přijde celá sekvence (webinář, launch), upozornit na ni jako na vzor. Swipe už zapsaný: [[GrowOS/lcenglish/library/swipe-content]] (260927). |
| **Tonebase** | Nechává si ho jako připomínku, že má streamy klasické hudby. Jednou větou, neodhlašovat. |
| **Burlington Magazine** | Možná odhlásí v příštím kole (mailem posílají málo). |
| **Mother's Earth** | Žádosti o recenzi po nákupu — jen zmínit. |
| **OpenAI** | Chodí na dvě adresy — Lenka jednu odhlásí. |
| **Email Marketing Heroes** | Už chodí jen na jednu adresu. |

## Pro tvou práci — nezakládat

Náměty z oddílu „Pro tvou práci“ **nezakládat** do content banky ani do projektů. Lenka je vyhodnotí sama a dá zpětnou vazbu.

## Výstup

- Soukromá stránka (Artifact) na stálé adrese https://claude.ai/artifact/7SYdebdeLaDZdvG9DV4QQ8 — republikovat přes `url`, stránku předtím přečíst.
- Vzhled podle šablony `.claude/skills/productivity-daily-plan/assets/svodka-template.html`.
- Do daily plánu jedním řádkem: odkaz na svodku + počet mailů ve „Vyžaduje pozornost“.

## Profil zájmů

- **Nejvíc:** AI nástroje pro práci (zprávy i praktické tipy), dějiny umění (baroko, ženy v umění, středoevropské umění, výstavy), psaní a Substack.
- **Středně:** marketing malého vzdělávacího byznysu (e-mail, webináře, sekvence), výuka jazyků, vzdělávání, vývoj nástrojů Drip a Leadpages.
- **Okrajově:** politika a svět (krátký přehled je vítaný).
- **Přeskočit:** slevy, e-shopy, notifikace, účtenky, pokud nevyžadují akci.
