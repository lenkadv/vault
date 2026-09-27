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
- Přesun: `label_thread` s `CATEGORY_PERSONAL` + `INBOX`, pak `unlabel_thread` s `CATEGORY_PROMOTIONS` + `CATEGORY_UPDATES`. Konektor potřebuje oprávnění gmail.modify (funguje od 260927). Pokud přesun selže, dát do svodky u oddílu seznam odkazů a říct to Lence jednou větou; nejčastěji pomůže Gmail konektor odpojit a znovu připojit.
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
| **Ethan Mollick (One Useful Thing)** | Nejdůležitější zdroj. Souhrn **o něco obsáhlejší** než u ostatních (hlavní teze, co zkoušel, 1–2 odstavce) — ne podrobný rozbor. Lenka si pak pustí audio na Substacku nebo přečte mail. (Rozbor z 260927 byl skoro tak dlouhý jako originál — byl to Lenčin brainstorming, ne standard.) |
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

## Úklid schránky po svodce (štítek Svodka/uchovat)

Ustáleno 260927, ladí se za pochodu. Cíl: Lenka většinu mailů maže, ale některé chce ad hoc uchovat — rozhodnutí má být rychlé a filtrovatelné.

1. **Claude při svodce označí kandidáty na uchování** štítkem `Svodka/uchovat` (Gmail ID `Label_89`). Radši méně než víc. **Pravidla třídění (Lenka 260927):**
   - **Uchovat:** Ethan Mollick (chodí mailem, výjimka mezi Substacky) · mail s odkazem na materiál, který chce Lenka podrobně nastudovat (např. série Slow Looking) — k takovému navíc udělat poznámku do `resources/`.
   - **Mazat:** Substacky obecně, hlavně umělecko-historické (dají se najít na Substacku) · maily, ze kterých už je swipe (např. Schumacher) · maily, ze kterých svodka vytáhla informaci a nic dalšího s nimi nebude (Guardian, NG London, Kunsti, Výstavník, AI Inner Circle, novinky Leadpages bez úkolu).
   - Zvážit: novinka Drip/Leadpages, se kterou je třeba něco udělat → spíš úkol do GTD než uchovat mail.
2. **Lenka v Gmailu projde štítek** (`label:svodka-uchovat`): co nechce, tomu štítek odebere; co chce navíc, tomu ho přidá (ručně, cokoli z období svodky).
3. **Claude označí zbytek období štítkem `Svodka/smazat`** (Gmail ID `Label_90`) — všechny newslettery, promo a notifikace z Promo akcí a Aktualizací za období svodky, které nemají `Svodka/uchovat`. **Neoznačovat** transakční a úřední maily: probíhající reklamace/objednávky, bankovní avíza, vrácení peněz, účtenky (Stripe, Google Play), pošta a datová podání, bezpečnostní upozornění (GitHub), shrnutí lekcí (italki) — ty nechat Lence k ručnímu posouzení.
4. **Lenka si štítek `Svodka/smazat` projde a smaže sama** (Claude mazání nemá povolené a nemá ho dělat). Uchované maily archivuje sama.

Filtry pro Lenku: `label:svodka-uchovat` · `label:svodka-smazat`.

## Pro tvou práci — nezakládat

Náměty z oddílu „Pro tvou práci“ **nezakládat** do content banky ani do projektů. Lenka je vyhodnotí sama a dá zpětnou vazbu.

## Výstup

- Soukromá stránka (Artifact) na stálé adrese https://claude.ai/artifact/7SYdebdeLaDZdvG9DV4QQ8 — republikovat přes `url`, stránku předtím přečíst.
- Vzhled podle šablony `.claude/skills/productivity-daily-plan/assets/svodka-template.html` (jen vzhled; rozbor Mollicka v ní je delší, než má být).
- Do daily plánu jedním řádkem: odkaz na svodku + počet mailů ve „Vyžaduje pozornost“.

## Profil zájmů

- **Nejvíc:** AI nástroje pro práci (zprávy i praktické tipy), dějiny umění (baroko, ženy v umění, středoevropské umění, výstavy), psaní a Substack.
- **Středně:** marketing malého vzdělávacího byznysu (e-mail, webináře, sekvence), výuka jazyků, vzdělávání, vývoj nástrojů Drip a Leadpages.
- **Okrajově:** politika a svět (krátký přehled je vítaný).
- **Přeskočit:** slevy, e-shopy, notifikace, účtenky, pokud nevyžadují akci.
