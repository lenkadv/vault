# Postup — Svodka z e-mailů (newslettery + nevytříděná pošta)

Svodka = souvislý text po tématech („jako na ministerstvu“), aby Lenka nemusela otevírat zdroje. Projekt [[svodka-newsletteru]] uzavřen a archivován 261004 (formát a rozsah potvrzeny beze změny); živá data (vydaná čísla, adresa stránky) jsou na konci tohoto souboru. Ustáleno 260927 podle Lenčiny zpětné vazby ke svodce č. 1.

## Kdy

- **Součást denního otvíracího rituálu** (`/daily-plan`, krok „Svodka“). Obvykle za uplynulý den; když se daily plan nedělal víc dní (Lenka pryč), za celé období od posledního čísla.
- **Formát a rozsah potvrzen 261004:** Lenka po prvním týdnu denních svodek (č. 2–8) řekla, že jsou výborné a zůstávají beze změny i do budoucna. Neladit, jen dodržovat pravidla níž.
- Období = od konce posledního čísla (tabulka „Vydaná čísla“ na konci tohoto souboru) do teď. Po vydání zapsat nový řádek.

## Zdroj

Gmail `lnk.dvorakova@gmail.com`: záložky **Promo akce**, **Aktualizace** a hlavní inbox za dané období (`after:YYYY/MM/DD`). Zájem **neodvozovat z přečteno/nepřečteno**.

## Vyžaduje pozornost → hlavní inbox

- Maily, které vyžadují akci (faktury, výpůjčky, reklamace, účty, termíny, osobní zprávy), jdou jako první oddíl svodky.
- **Každý takový mail přesunout do hlavního (Primary) inboxu**, pokud skončil v Promo akcích nebo Aktualizacích: přidat `CATEGORY_PERSONAL`, odebrat `CATEGORY_PROMOTIONS` / `CATEGORY_UPDATES`. Primary = složka, ze které Lenka maily vyřizuje.
- Přesun: `label_thread` s `CATEGORY_PERSONAL` + `INBOX`, pak `unlabel_thread` s `CATEGORY_PROMOTIONS` + `CATEGORY_UPDATES`. Konektor potřebuje oprávnění gmail.modify (funguje od 260927). **Přesun dělat vždy, u každého mailu z oddílu** — `search_threads` kategorie (`CATEGORY_*`) nevypisuje, takže mail, který vypadá jen jako `INBOX`, může ležet v Promo akcích (260928: Kaufland tiket zůstal v Promo akcích). Pokud přesun selže, dát do svodky u oddílu seznam odkazů a říct to Lence jednou větou; nejčastěji pomůže Gmail konektor odpojit a znovu připojit.
- **Výjimka (261003):** letenky, jízdenky a potvrzení cest (Wizz Air, ČD, RegioJet, Student Agency) má Lenka odložené v Gmailu na den před cestou. Takové maily (bez štítku INBOX) nepřesouvat do hlavního inboxu a štítky jim nezměnit, přidání INBOX odložení zruší a konektor ho neumí obnovit. Jen je shrnout.
- Věci s termínem zapsat i do GTD podle CLAUDE.md (next-actions / waiting-for) — ale náměty pro práci **ne** (viz níže).

## Jazyk shrnutí

**Shrnutí newsletteru psát v jazyce, ve kterém newsletter přišel** (260929): anglické newslettery shrnovat anglicky, české česky. Překladem se ztrácí nuance a Lenka ráda čte anglicky. Platí pro všechny oddíly včetně Marketingu a psaní. Nadpisy oddílů, „Vyžaduje pozornost“, „Hlavní body“, „Pro tvou práci“ a úklid zůstávají česky.

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
| **Substacky obecně** | Číst **celý text** (je v mailu), ne jen titulek. Ke každému **2–3 věty z obsahu** (260928): hlavní teze + konkrétní zjištění/čísla/argumenty, aby Lenka nemusela otevírat zdroj. Nepsat obecné „píše o X“ — napsat, *co* o tom píše. Když je jádro za placenou zdí nebo mail obsahuje jen titulky (např. Artnet PRO), říct to výslovně. |
| **The Rest Is History (newsletter)** | Od 261002: shrnutí **podrobnější** (téma čísla, hlavní teze, jména doporučených knih a autorů). **Maily neodstraňovat**, štítek `Svodka/uchovat` (Lenka je archivuje, jsou v nich tipy na literaturu). Přímý odkaz na webovou verzi (beehiiv) uložit. Doporučené knihy (název — autor — kdo doporučil, jeden odkaz na zdroj) zapsat do [[omnibus]] sekce „Knihy k zapsání do Notion“; do Notionu je zapíše dávka při weekly review (viz níže). |
| **Danny Iny (Mirasee)** | Lenka jeho práci obdivuje, ale maily nečte (je jich hodně). Shrnout, co v týdnu/dni psal — nechce ho ztratit z pozornosti. |
| **Kennedy — Email Marketing Heroes** | Denní maily. Vtipné shrnutí + pojmenovat **vzorec**: jak se dostal od osobní historky k prodeji/propagaci produktu. Maily chodí dál, Lenka je nemusí číst. Lenka ten přechod považuje za geniální (dělá ho v každém mailu) a sleduje ho kvůli vlastní práci; zatím se nic neukládá, Kennedyho celý kurz Lenka má (260929). |
| **White Label Comedy** | Podobně jako Kennedy — vtipné shrnutí + vzorec. Lenka ho chce prozkoumat pro vlastní využití → projde se při rekapitulaci digitálních zdrojů, zápis v [[resources/kurzy-marketing]] (261004). |
| **Danny Iny — AI Strategist** | Lenka chce jít (26.–28. 10. 2026). Hlídat mail s otevřením registrace a dát ho do „Vyžaduje pozornost“ → [[waiting-for]]. |
| **Jon Benson (BNSN)** | ElevenLabs ukázky: výsledný hlas je nerozeznatelný od živého, ale postup je v placené komunitě (~300 $/měs.), do které Lenka zatím nejde. Stačí krátce zmínit, nic nenabízet. |
| **Česká filharmonie** | Lenka obdivuje jejich PR a e-mailing (lepší než NG). Mail přečíst celý, nové postřehy a krátké ukázky doplnit do [[profil-ceska-filharmonie]], ve svodce jednou větou; pak `Svodka/smazat` (260930). |
| **Leadpages Community** | Lenka se 261004 podívala a nezaujalo ji (Teardowns jsou jen pro anglické stránky, české nikdo rozebírat nebude). **Nesledovat**, ve svodce nezmiňovat; výjimka jen zásadní novinka (např. komunita v češtině). |
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
3. **Claude označí zbytek období štítkem `Svodka/smazat`** (Gmail ID `Label_90`) — všechny newslettery, promo a notifikace z Promo akcí a Aktualizací za období svodky, které nemají `Svodka/uchovat`. **Neoznačovat** transakční a úřední maily (Lenka 260927):
   - probíhající objednávky a reklamace (Kaufland apod.) → nechat,
   - bankovní avíza (Air Bank) → neoznačovat; Lenka jen rychle mrkne, jestli tam není něco divného, a smaže sama,
   - účtenky (Stripe, Google Play) → nemazat,
   - bezpečnostní upozornění (GitHub apod.) → nemazat,
   - pošta, datová podání, shrnutí lekcí (italki) → nechat Lence.
   - Potvrzení o vrácení peněz (RegioJet apod.) a proběhlé jízdenky → **ano**, štítek `Svodka/smazat`.
   - **Mail, ze kterého se něco ukládá do vaultu** (kurz, zdroj, námět): do vaultu vždy **přímý proklik na zdroj** (URL kurzu/článku). Když je proklik uložen, nebo jde o Substack/web dohledatelný jinde, nebo o oznámení bez odkazu → mail může `Svodka/smazat`. Když se uloží jen shrnutí bez přímého prokliku → mail **archivovat, nemazat** (260929: maily s kurzy Coursera skončily v koši a ve vaultu byl jen odkaz na mail).
4. **Lenka si štítek `Svodka/smazat` projde a smaže sama** (Claude mazání nemá povolené a nemá ho dělat). Uchované maily archivuje sama.

Filtry pro Lenku: `label:svodka-uchovat` · `label:svodka-smazat`.

## Přehledové newslettery (Artnet apod.) — hlavní článek otevřít

Když newsletter obsahuje jen titulky s odkazy (Artnet Daily apod.), **hlavní propagovaný článek otevřít a shrnout z webu**, pokud není za placenou zdí (260928). Odkazy jsou přesměrovací — WebFetch na news.artnet.com vrací 403, funguje vestavěný prohlížeč (`navigate` + `get_page_text`). Placený článek (Artnet PRO) jen označit. **Rozsah jako u Substacku: 2–3 věty o hlavním článku + max. jedna věta o zbytku přehledu** — shrnutí Artnetu 260928 (dva odstavce s cenami všech položek) bylo zbytečně podrobné.

## Knihy a literatura ze svodky → dávkově do Notionu

Dohodnuto 261002 (úspora, jedno načtení Notionu týdně místo při každé svodce): kdykoli ve svodce nebo jinde narazím na doporučení knihy, nezapisuji do Notionu hned. Zapíšu jednu řádku `Název — autor — kdo doporučil` do [[omnibus]] sekce „Knihy k zapsání do Notion“, u zdroje jednou přímý odkaz. Při weekly review (krok Note Inbox review) se celá fronta zapíše do Notion „📖 Book Recommendations“ najednou: jedno načtení schématu, jeden dotaz na existující tituly (duplicity jen označit a ukázat Lence, neodhadovat podle názvu), jedna dávka. Priority „⭐ check it out“, Tags podle obsahu, Why = zdroj + datum + kdo doporučil; přímý odkaz do sloupce **Zdroj** (URL, přidán 261002). Zapsané řádky z omnibusu smazat. Zapisují se jen moderní knihy (odborná a populárně naučná literatura), primární prameny a klasiky (Plútarchos, Voltaire, Rousseau apod.) ne (Lenka 261002).

## Terminologie: smazat ≠ odhlásit

- **Kandidát ke smazání** = konkrétní mail, dostane štítek `Svodka/smazat` (Lenka ho smaže).
- **Kandidát na odhlášení** = odesílatel, kterého by Lenka mohla přestat odebírat (oddíl svodky).
Mail zmíněný v odhlášení **pořád patří pod `Svodka/smazat`**, pokud z něj nic není potřeba (260928).

## Frekvence odesílatelů — neodhadovat

Z toho, co je ve schránce, **neusuzovat, jak často odesílatel chodí** („přišlo poprvé za dlouho“) — Lenka maily průběžně maže, takže historie ve schránce je neúplná (260928: Vox a Artnet chodí často). Kandidáty na odhlášení navrhovat podle obsahu, ne podle domnělé frekvence.

## Pro tvou práci — nezakládat

Slevy na vstupné do muzeí ve svodce nezmiňovat, Lenka má ICOM (261003). Náměty z oddílu „Pro tvou práci“ **nezakládat** do content banky ani do projektů. Lenka je vyhodnotí sama a dá zpětnou vazbu.

## Výstup

- Soukromá stránka (Artifact) na stálé adrese https://claude.ai/artifact/7SYdebdeLaDZdvG9DV4QQ8 — republikovat přes `url`, stránku předtím přečíst.
- Vzhled podle šablony `.claude/skills/productivity-daily-plan/assets/svodka-template.html` (jen vzhled; rozbor Mollicka v ní je delší, než má být).
- Do daily plánu jedním řádkem: odkaz na svodku + počet mailů ve „Vyžaduje pozornost“.

## Profil zájmů

- **Nejvíc:** AI nástroje pro práci (zprávy i praktické tipy), dějiny umění (baroko, ženy v umění, středoevropské umění, výstavy), psaní a Substack.
- **Středně:** marketing malého vzdělávacího byznysu (e-mail, webináře, sekvence), výuka jazyků, vzdělávání, vývoj nástrojů Drip a Leadpages.
- **Okrajově:** politika a svět (krátký přehled je vítaný).
- **Přeskočit:** slevy, e-shopy, notifikace, účtenky, pokud nevyžadují akci.

## Vydaná čísla

| Č. | Období | Poznámka |
|---|---|---|
| 1 | 14.–26. 9. 2026 | zkušební, ~150 vláken; 260927 doplněn rozbor Mollicka; schránka vyčištěna (Lenka smazala `Svodka/smazat`) |
| 2 | 27. 9. – 28. 9. 8:40 | první denní, 19 vláken; 1× Vyžaduje pozornost (Kaufland tiket); 17 vláken `Svodka/smazat`, uchovat nic |
| 3 | 28. 9. 8:40 – 29. 9. 10:30 | 47 vláken; 4× Vyžaduje pozornost (Kaufland storno, Česká pošta, Štěpánka Uličná Agendy OSA, ResearchGate); 33 vláken `Svodka/smazat`, uchovat nic |
| 4 | 29. 9. 10:30 – 30. 9. 11:10 | 34 vláken; 4× Vyžaduje pozornost (Jan Žáček na JIP, PENTA MAS 4, italki potvrzeno, Knihobot watchdog); 28 vláken `Svodka/smazat`, uchovat nic |
| 5 | 30. 9. 11:10 – 1. 10. 9:10 | 35 vláken; 4× Vyžaduje pozornost (KTF výkaz Opakované stipendium, Štěpánka Uličná k DigiStartu, Tandem 13. 10. potvrzen, Knihobot = jen košík); 27 vláken `Svodka/smazat` (Wilco a Laura Belgray archivovat — swipe bez webové verze), ICOM talk bez štítku |
| 6 | 1. 10. 9:10 – 2. 10. 10:50 | 38 vláken; 5× Vyžaduje pozornost (FreshLearn 449 USD, Vox poptávka školení, KTF EK termín, Milan Pech Přehledovka, TidyCal Stripe); 23 vláken `Svodka/smazat`, `Svodka/uchovat` Mollick a The Rest Is History (Reading List) |
| 7 | 2. 10. 10:50 – 3. 10. 20:50 | 34 vláken (svodka dělaná večer 3. 10. zpětně, ranní plán ten den nebyl); 3× Vyžaduje pozornost (letenky Řím Wizz Air, jízdenky Drážďany 31. 10., Štěpánka přeposlala podklady FEKT/Apollo); 23 vláken `Svodka/smazat`, uchovat nic; bez štítku NG Praha, Muzeum Prahy, Descript, PayPal ×2, Air Bank |
| 8 | 3. 10. 20:50 – 4. 10. 10:10 | 4 vlákna (Deník N, Art Fix, Marie Ercoles, NativShark); nic ve Vyžaduje pozornost; 4 vlákna `Svodka/smazat`, uchovat nic |

## Publikace

- Svodka se publikuje jako soukromá stránka (artifact), **stejná adresa pro všechna čísla**: https://claude.ai/artifact/7SYdebdeLaDZdvG9DV4QQ8 — pro další číslo republikovat přes `url` (zdrojový HTML je jen dočasně ve scratchpadu).
- Maily z „Vyžaduje pozornost“ se přesouvají do hlavního inboxu (Primary), viz výše.
- Zájem neodvozovat z přečteno/nepřečteno (memory `feedback_newsletter_read_signal`).
