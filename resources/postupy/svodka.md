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
- **Faktury v mailu (Lenka 261013):** mail s fakturou má Lenka v inboxu, dokud ji nezaplatí; po zadání úhrady ho archivuje. Před zařazením do „Vyžaduje pozornost“ zkontrolovat štítky vlákna: `INBOX` = nezaplaceno, bez `INBOX` = zaplaceno (neuvádět, úkol nezakládat, mail nevracet do inboxu). Memory `feedback_invoice_archive_means_paid`.
- Věci s termínem zapsat i do GTD podle CLAUDE.md (next-actions / waiting-for) — ale náměty pro práci **ne** (viz níže).

## Jazyk shrnutí

**Shrnutí newsletteru psát v jazyce, ve kterém newsletter přišel** (260929): anglické newslettery shrnovat anglicky, české česky. Překladem se ztrácí nuance a Lenka ráda čte anglicky. Platí pro všechny oddíly včetně Marketingu a psaní. **261007 opraveno:** při svodce č. 11 jsem Ben's Bites, AI Inner Circle a další anglické maily napsala česky; Lenka upozornila. Platí tedy i pro „Hlavní body“, sloučené bloky „Další maily“ a krátké zmínky jednotlivých newsletterů (Jon Schumacher, Benson, Wiebe, Tonebase, Art UK, Vox titulky). Česky zůstávají jen nadpisy oddílů, „Vyžaduje pozornost“, „Pro tvou práci“, moje vlastní komentáře a čeští odesílatelé (Deník N, UMPRUM, NG, Česká filharmonie). Nadpisy oddílů, „Vyžaduje pozornost“, „Hlavní body“, „Pro tvou práci“ a úklid zůstávají česky.

**261016, znovu porušeno (svodka č. 18):** Drip, Jon Benson (YouCloned), Wilco, Leadpages, AI Black Magic, Joanna Wiebe, Kennedy, Danny Iny i blok „Substacky a spol.“ jsem napsala česky, ačkoli mail byl anglický. Pravidlo platí i pro **krátké bloky „jen podle předmětu a úryvku“** a pro zmínky v „Marketing a psaní“ a „Česko a svět“. Před publikací projít všechny odstavce a u každého zkontrolovat jazyk originálu.

## Formát a pořadí oddílů

1. **Vyžaduje pozornost**
2. **Hlavní body dne** (nebo „dnů“, podle období) — 3–5 bodů
3. **Umělá inteligence** — zprávy i praktické tipy (obojí). Po jednotlivých newsletterech. **Od 261024 u každého newsletteru v nadpisu štítek z [[newslettery-ai]]** (např. „AI Inner Circle · Zprávy“), ať Lenka ví, kdo je kdo. Nový AI odesílatel, který v tabulce není → doplnit do tabulky se štítkem a návrhem.
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
| **Behind the Masterpiece** (behindthemasterpiece.substack.com) | Od 261024: jeden z Lenčiných nejoblíbenějších uměleckých Substacků, i bezplatná část je pro ni velmi hodnotná. **Číst důkladně celý bezplatný text** a shrnout **podrobněji** než ostatní Substacky (hlavní teze, argumentace krok za krokem, konkrétní díla, data a jména; 1–2 odstavce), vždy jako samostatný blok v oddílu Umění a dějiny, nikdy jen jednou větou. Mail je často jen náhled před placenou zdí (článek „PAID“): otevřít webovou verzi a ověřit, kde bezplatná část končí, a to výslovně napsat. Mail `Svodka/smazat` (na webu dohledatelné). Předplatné zvažuje (úkol v [[next-actions]]). |
| **The Rest Is History (newsletter)** | Od 261002: shrnutí **podrobnější** (téma čísla, hlavní teze, jména doporučených knih a autorů). **Maily neodstraňovat**, štítek `Svodka/uchovat` (Lenka je archivuje, jsou v nich tipy na literaturu). Přímý odkaz na webovou verzi (beehiiv) uložit. Doporučené knihy (název — autor — kdo doporučil, jeden odkaz na zdroj) zapsat do [[omnibus]] sekce „Knihy k zapsání do Notion“; do Notionu je zapíše dávka při weekly review (viz níže). |
| **Danny Iny (Mirasee)** | **Od 261016 maily Danny Iny nemazat** (Lenka: poučení pro DigiStart, rozbor sekvence v [[GrowOS/digistart/library/swipe-content|digistart swipe]]); štítek `Svodka/uchovat`. Lenka jeho práci obdivuje, ale maily nečte (je jich hodně). Shrnout, co v týdnu/dni psal — nechce ho ztratit z pozornosti. 261009: video č. 2 série o AI ji zklamalo (kromě úvodní analogie s příjezdem vlaku, uložena v [[analogie-ai-jako-raný-film]]); u dalších videí série psát stručně a věcně, co z nich lze prakticky použít. |
| **Kennedy — Email Marketing Heroes** | Denní maily. Vtipné shrnutí + pojmenovat **vzorec**: jak se dostal od osobní historky k prodeji/propagaci produktu. Maily chodí dál, Lenka je nemusí číst. Lenka ten přechod považuje za geniální (dělá ho v každém mailu) a sleduje ho kvůli vlastní práci; zatím se nic neukládá, Kennedyho celý kurz Lenka má (260929). |
| **White Label Comedy** | Podobně jako Kennedy — vtipné shrnutí + vzorec. Lenka ho chce prozkoumat pro vlastní využití → projde se při rekapitulaci digitálních zdrojů, zápis v [[resources/kurzy-marketing]] (261004). **Od 261020:** maily s týdenními frameworky dávat `Svodka/uchovat` (ne smazat): Lenka je chce s Claudem adaptovat na reklamy pro lcenglish i DigiStart (úkol v [[lcenglish-10x-english-sales-page]]). |
| **Danny Iny — AI Strategist** | Lenka chce jít (26.–28. 10. 2026). Hlídat mail s otevřením registrace a dát ho do „Vyžaduje pozornost“ → [[waiting-for]]. |
| **Jon Benson (BNSN)** | ElevenLabs ukázky: výsledný hlas je nerozeznatelný od živého, ale postup je v placené komunitě (~300 $/měs.), do které Lenka zatím nejde. Stačí krátce zmínit, nic nenabízet. Pozvánky na živé tréninky (YouCloned Command, „hot list“) = předprodej předplatného na nový produkt; jen sledovat jednou větou, nevyhodnocovat (Lenka 261019). |
| **Česká filharmonie** | Lenka obdivuje jejich PR a e-mailing (lepší než NG). Mail přečíst celý, nové postřehy a krátké ukázky doplnit do [[profil-ceska-filharmonie]], ve svodce jednou větou; pak `Svodka/smazat` (260930). |
| **Leadpages Community** | Lenka se 261004 podívala a nezaujalo ji (Teardowns jsou jen pro anglické stránky, české nikdo rozebírat nebude). **Nesledovat**, ve svodce nezmiňovat; výjimka jen zásadní novinka (např. komunita v češtině). |
| **Leadpages — žádost o zákaznický příběh (Corah, 16. 10.)** | Lenka 261017: dělat nebude. Nepřipomínat, v „Pro tvou práci“ ani jinde nezmiňovat; podobné žádosti od nástrojů jen zmínit jednou větou. |
| **Drip, Leadpages** | Nástroje, které Lenka používá. Sledovat **vývoj produktu** (nové funkce, změny, webináře o funkcích) a vytáhnout, co by se hodilo pro lcenglish/tadylenka. |
| **Jon Schumacher a podobné sekvence** | Když přijde celá sekvence (webinář, launch), upozornit na ni jako na vzor. Swipe už zapsaný: [[GrowOS/lcenglish/library/swipe-content]] (260927). |
| **Tonebase** | Nechává si ho jako připomínku, že má streamy klasické hudby. Jednou větou, neodhlašovat. |
| **Burlington Magazine** | Možná odhlásí v příštím kole (mailem posílají málo). |
| **Mother's Earth** | Žádosti o recenzi po nákupu — jen zmínit. |
| **OpenAI** | Chodí na dvě adresy — Lenka jednu odhlásí. |
| **Email Marketing Heroes** | Už chodí jen na jednu adresu. |
| **Kunsti Radar** (každých 14 dní, přehled výstav po celé Evropě) | Od 261005 **vždy `Svodka/uchovat`, nikdy mazat**: Lenka z něj při plánování cest hledá, co kde ještě trvá (starší čísla už dříve začaté výstavy nepokrývají). Ve svodce zmínit výstavy (hlavně Paříž, Řím, Vídeň, Londýn) a nové zajímavé zapsat do [[resources/mista-k-navstiveni]] jen na pokyn. |
| **Vodafone vyúčtování** | Platí se inkasem (Lenka 261005) → neuvádět ve „Vyžaduje pozornost“, jen jednou větou jako informaci v hlavních bodech; mail `Svodka/smazat` (PDF není třeba). |
| **Sunny Lenarduzzi** | Lenka 261024: odebírala kdysi, roky se neozvala, teď nerelevantní → **kandidát na odhlášení** (oddíl „Kandidáti na odhlášení“, odhlásí Lenka). Mail `Svodka/smazat`. |
| **Novinky AI jen pro USA** (Claude Duet, Grok Bot apod.) | Lenka 261024: dokud nejsou dostupné v Evropě, nejsou pro nás aktuální → jednou větou s poznámkou „zatím jen USA“, nerozvádět. |
| **Wilco de Kreij (GrowOS, Grow On Repeat)** | Lenka 261024: maily má ráda jako inspiraci, co s AI jde, ale ne vždy jim rozumí. Hlavní mail (tip, postup) **číst podrobně a vysvětlit, co tím myslí a co z toho můžeme udělat my**, ne jen shrnout. Užitečné postupy do Databanky (`resources/databanka/Grow On Repeat/`), mail pak `Svodka/uchovat`, pokud v poznámce není přímý zdroj. |

## Úklid schránky po svodce (štítek Svodka/uchovat)

Ustáleno 260927, ladí se za pochodu. Cíl: Lenka většinu mailů maže, ale některé chce ad hoc uchovat — rozhodnutí má být rychlé a filtrovatelné.

1. **Claude při svodce označí kandidáty na uchování** štítkem `Svodka/uchovat` (Gmail ID `Label_89`). Radši méně než víc. **Pravidla třídění (Lenka 260927):**
   - **Uchovat:** Ethan Mollick (chodí mailem, výjimka mezi Substacky) · mail s odkazem na materiál, který chce Lenka podrobně nastudovat (např. série Slow Looking) — k takovému navíc udělat poznámku do `resources/`.
   - **Mazat:** Substacky obecně, hlavně umělecko-historické (dají se najít na Substacku) · maily, ze kterých už je swipe (např. Schumacher) · maily, ze kterých svodka vytáhla informaci a nic dalšího s nimi nebude (Guardian, NG London, Výstavník, AI Inner Circle, novinky Leadpages bez úkolu).
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

## Slova ve svodce (Lenka 261017)

Slova „lievák“, „lievik“ a „trichtýř“ nepsat (Lenka: lievák je patvar ze slovenštiny, česky je funnel trichtýř, ale oba nechce). Psát prostě **„funnel“**. Když si nejsem jistá českým slovem, nevymýšlet výklad.

## Pro tvou práci — nezakládat

Slevy na vstupné do muzeí ve svodce nezmiňovat, Lenka má ICOM (261003). Náměty z oddílu „Pro tvou práci“ **nezakládat** do content banky ani do projektů. Lenka je vyhodnotí sama a dá zpětnou vazbu. **Nekomentovaný návrh = zahodit (Lenka 261021):** když Lenka na návrh z „Pro tvou práci“ nezareaguje, vyhodnotila ho jako nenosný; nikam ho neukládat, nepřipomínat a v dalších svodkách nevracet. Ukládá se jen to, co Lenka výslovně okomentuje.

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
| 9 | 4. 10. 10:10 – 5. 10. 12:53 | 26 vláken; 4× Vyžaduje pozornost (Vodafone vyúčtování, KTF Opakované stipendium, KTF Petr Kubín Teams, LinkedIn Aneta z NG Praha; Vodafone je inkaso = jen informace, stipendium čeká na přístup k dokumentu → waiting-for 12. 10., Teams přístup funguje); 21 vláken `Svodka/smazat`, `Svodka/uchovat` Kunsti Radar (Lenka 261005: archivovat, ne mazat); mimo svodku FuTr vlákno (vyřízeno 261004), Portu a reas.cz (promo, neoznačeno) |
| 10 | 5. 10. 12:53 – 6. 10. 10:40 | 30 vláken; 4× Vyžaduje pozornost (Evident seznam účastníků komunikačního školení, KTF rezervace Delehaye do 19. 10., KTF jednání EK 19. 10. 9:00, Štěpánka přeposlala salda od VUT); 23 vláken `Svodka/smazat`, uchovat nic; bez štítku UMPRUM kolokvium, italki shrnutí lekce, kalendářní upozornění Gemini |
| 11 | 6. 10. 10:40 – 7. 10. 10:14 | 29 vláken; 2× Vyžaduje pozornost (FreshLearn nabídl slevu 50 USD na obnovení, Anthropic účtenka QRVMHXKX-0007 pořád bez DPH) a NG pozvánka Pavilon Cecoslovacchia 100 (13. 10., Lenka nejde); 24 vláken `Svodka/smazat`, uchovat nic; bez štítku Student Agency doklad (odložené), Air Bank 3× platba kartou, BotBuilders kalendářní pozvánka |
| 12 | 7. 10. 10:14 – 8. 10. 11:59 | 23 vláken; 2× Vyžaduje pozornost (Evident termíny komunikačního školení: Markéta Hánlová 21. 10./4. 11./11. 11., Ross Zylman 11. 11./18. 11./25. 11./2. 12., společný 11. 11.; KTF doc. Kubín: exkurze Budeč 15. 10. 17:00 + zápis na tři referáty, Prosek 23. 10.); 19 vláken `Svodka/smazat`, uchovat nic; bez štítku Air Bank (211,90 Kč), Drip účtenka 7. 10. |
| 13 | 8. 10. 11:59 – 9. 10. 10:40 | 21 vláken; 1× Vyžaduje pozornost (NATECO odmítla kolečka: na model nejsou díly, zkusit neznačkovou opravnu; přesunuto do hlavního inboxu); 18 vláken `Svodka/smazat`, `Svodka/uchovat` The Rest Is History (Illuminati, 9. 10.; 13 knih do [[omnibus]]); bez štítku Knihobot watchdog (konektor mail neotevřel) |
| 14 | 9. 10. 10:40 – 11. 10. 19:10 | asi 65 vláken (dva dny, Lenka byla v Jičíně); 4× Vyžaduje pozornost (PENTA, Veronika Voříšková prosí o fakturační údaje, Štěpánka shrnutí zkušebního průchodu DigiStartu + sdílená složka FEKT VUT Brno, opravna Petra Šumana opraví kolečka, přines celý kufr; Rohlík únik dat jen info), všechny už byly v Primary; 52 vláken `Svodka/smazat`, uchovat nic; bez štítku FreshLearn, Coursera, Air Bank, Drip, kódy, Knihobot ×2; pozn.: Artnet jen titulky, několik politických Substacků jen podle předmětu |
| 15 | 11. 10. 19:10 – 12. 10. 12:30 | 14 vláken (půl dne); 4× Vyžaduje pozornost (PENTA objednávka 4615001906 a prosba o fakturu, Chinese Point faktura za japonštinu 9/2026, U Verpánku 800 Kč za kolečko, Štěpánka Fw 5S Oloví jen informace), všechny už v Primary; 7 vláken `Svodka/smazat`, uchovat nic; bez štítku Air Bank |
| 16 | 12. 10. 12:30 – 13. 10. 12:40 | 23 vláken; 4× Vyžaduje pozornost (Eva Bendová: Vizuální kultura dnes odpadá, ilustrace 20. 10., exkurze Muzeum literatury a Čermák 24. 11. 12:30; Air Bank: úhrada 4 190 Kč nešla odeslat, dobít do 19. 10.; čtenářka Renata odpověděla na A4E #26; Danny Iny zve na AI Strategist na konci videa 4), Air Bank a Danny Iny přesunuty do Primary; 15 vláken `Svodka/smazat`, uchovat nic; bez štítku Eva Bendová, Renata, Air Bank ×2, Danny Iny, ICOM DESIGN Talk ×2 (14. 10. 15:00), ÚDU pozvánka (21. 10. 16:30) |
| 17 | 13. 10. 12:40 – 14. 10. 11:05 | 26 vláken; 5× Vyžaduje pozornost (Tandem Old Town Tour 3. 11. a Slaný 4. 11., Marie Vymazalová: ve čtvrtek ústně, Rudolfinum informace ke koncertu 14. 10. přesunuta do Primary, Wizz Air e-faktura bez přesunu); 20 vláken `Svodka/smazat`, uchovat nic; bez štítku Ars linearis CFP |
| 18 | 14. 10. 11:05 – 16. 10. 16:35 | asi 70 vláken (15. 10. nebyl denní soubor); 7× Vyžaduje pozornost (Štěpánka žádost o přístup k osnově FEKT ze svého gmailu, Marie Vymazalová kontrola PPSŘ a jednání EK 19. 10., knihovna KTF út 20. 10. 12:30 × učebna P8, Städel: lístek zdarma na pokladně, Gabriela Hámová přílohy k Pechovi do 14. 11., Tomáš Popadič PENTA), Štěpánka a knihovna přesunuty do Primary; 5 knih z TRIH do [[omnibus]]; ~55 vláken `Svodka/smazat`, `Svodka/uchovat` TRIH (King Arthur Debate); bez štítku Air Bank, Google Play, Wolt, Coinbase, Mirasee, Pražské jaro |
| 19 | 16. 10. 16:35 – 17. 10. 14:45 | 16 vláken; 1× Vyžaduje pozornost (Danny Iny „Measure. Measure again.“: hosté na AI Strategist zdarma do 18. 10., přesunuto do Primary); 12 vláken `Svodka/smazat`, `Svodka/uchovat` Danny Iny zůstává; bez štítku Leadpages (žádost o zákaznický příběh), Erasmus+ oznámení o ochraně údajů, Air Bank |
| 20 | 17. 10. 14:45 – 19. 10. 9:45 | 31 vláken (víkend); 3× Vyžaduje pozornost (Evident: Diego Daenekindt potvrdil 11. 11., Meta zamítla ověření identity, Danny Iny start přípravy AI Strategist), Meta a Danny Iny přesunuty do Primary; 21 vláken `Svodka/smazat`, `Svodka/uchovat` Kunsti Radar a 3× Danny Iny; bez štítku Evident, Meta omezení DigiStart, Maruška (podklad EK), Štěpánka, Air Bank, připomínka Genius Scan |
| 21 | 19. 10. 9:45 – 20. 10. 14:10 | 22 vláken; 2× Vyžaduje pozornost (Štěpánka termíny DigiStartu: konzultace 4.–9. 11., kurz varianta A od 16. 11. / B od 23. 11., Lenka odpověděla „probereme ústně“; Danny Iny pre-training den 1, přesunuto do Primary); 17 vláken `Svodka/smazat`, `Svodka/uchovat` Danny Iny; bez štítku Štěpánka, Evident autoodpověď (Kateřina Suvarinová nemocná), Air Bank ×2 |
| 22 | 20. 10. 14:10 – 21. 10. 10:50 | 29 vláken; 4× Vyžaduje pozornost (HOSTINGSOLUTIONS záloha 202601198 za hosting lcenglish.cz 1 081,74 Kč, splatnost 10. 11.; Portu kontrola údajů podle AML; Renata odpověděla na A4E #27; Danny Iny pre-training den 2), Portu a Danny Iny přesunuty do Primary; 24 vláken `Svodka/smazat`, `Svodka/uchovat` Mollick (Co-Existence) a Danny Iny; bez štítku HOSTINGSOLUTIONS, Portu, Renata; Artlust 19. 10. patřil do č. 21 |
| 23 | 21. 10. 10:50 – 22. 10. 12:30 | 21 vláken; 2× Vyžaduje pozornost (Renata znovu: jaký seriál, 100 vět a shadowing, „stará na techniku“; Danny Iny Prompt 2 Deep Identity Mapping, přesunuto do Primary); 15 vláken `Svodka/smazat`, `Svodka/uchovat` Danny Iny; bez štítku Renata, Štěpánka (Fw AI Institute), HOSTINGSOLUTIONS daňový doklad, připomínka DPH, ÚDU přednáška 4. 11.; Lenka: History of Women (Sleeping Beauty) přeřazen na `Svodka/uchovat`, Schjerfbeck do content banky |
| 24 | 22. 10. 12:30 – 23. 10. 11:45 | 31 vláken; 2× Vyžaduje pozornost (Danny Iny Prompt 3 Install Your AI Operating System, přesunuto do Primary; Renata: týden mimo, seriály zkusí, jen info); 27 vláken `Svodka/smazat`, `Svodka/uchovat` TRIH (Arthurian Recommendations, žádné knihy do omnibusu: prameny a romány) a Danny Iny; bez štítku Renata, Knihobot watchdog |
| 25 | 23. 10. 11:45 – 24. 10. 13:20 | 36 vláken (pátek odpoledne a sobota); 2× Vyžaduje pozornost (Evident: místnost na Evropské, kterou upřesní, stejní účastníci, angličtina; TidyCal: zrušená rezervace „Konzultace“ na Štěpánčině stránce 8. 11., nejspíš Lenčin test, přesunuto do Primary); 31 vláken `Svodka/smazat`, `Svodka/uchovat` Danny Iny ×2 a Wilco „my favorite AI trick“ (rozbor v Databance, Lenka 261024); Lenka 261024: Evident odpověď konceptem, podklad [[evident-skoleni-261111]]; TidyCal test → úkol v [[digistart]]; Hokusai v Dulwich do [[resources/mista-k-navstiveni]]; bez štítku Evident, TidyCal; Artnet jen titulky, články neotevřeny |

## Publikace

- Svodka se publikuje jako soukromá stránka (artifact), **stejná adresa pro všechna čísla**: https://claude.ai/artifact/7SYdebdeLaDZdvG9DV4QQ8 — pro další číslo republikovat přes `url` (zdrojový HTML je jen dočasně ve scratchpadu).
- Maily z „Vyžaduje pozornost“ se přesouvají do hlavního inboxu (Primary), viz výše.
- Zájem neodvozovat z přečteno/nepřečteno (memory `feedback_newsletter_read_signal`).
