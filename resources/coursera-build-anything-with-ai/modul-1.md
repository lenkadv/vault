# Modul 1 — Introduction to Building with AI (podrobné poznámky)

Součást: [[coursera-build-anything-with-ai]] · Zdroj: [Coursera, modul 1](https://www.coursera.org/learn/build-anything-with-ai/home/module/1) · Čas: ~2 h (32 min videa, ~1 h čtení, 1 hodnocený úkol)
Poznámky jsou zhuštění vlastními slovy (261004), ne přepis. U každé lekce je odkaz na originál.

---

## 1. Úvod: počítání, vizualizace, analýza a stavění čehokoli s AI (video, 8 min)
[Lekce](https://www.coursera.org/learn/build-anything-with-ai/lecture/mVcBm/introduction-to-computing-visualizing-analyzing-and-building-anything-with-ai)

**Teze:** osobní počítač nikdy nebyl opravdu osobní. Software vyrábějí programátoři jednou pro všechny, nástroje spolu nemluví a nutí uživatele řešit problém tak, jak to vymysleli oni. S AI už se tomu nemusíš přizpůsobovat: můžeš si nechat analyzovat, vizualizovat nebo postavit cokoli, co odpovídá tvému způsobu práce.

**Ukázka:** autor v nástroji MAJK (vyvinutém na Vanderbiltu) napsal vlastní požadavky na osobní rozpočet do souboru README a jedním zadáním si nechal postavit celou webovou aplikaci: import výpisů z karet a z banky, trendy ve výdajích, detekce zapomenutých předplatných, kategorizace výdajů. Agent sám zvolil technické řešení, založil verzování (aby šlo vrátit chyby) a po pár minutách aplikaci spustil. Data v ukázce jsou vymyšlená. Aplikace navíc sama využívá AI: nahraješ výpis a ona z něj vytáhne transakce.

**Důležité:**
- Technické překážky se obejdou: můžeš AI nechat aplikaci i spustit. Stačí znát slovník a vědět, co si říct.
- Požadavky si můžeš sepsat předem (pak dostaneš „na míru“), nebo stačí obecné zadání („postav aplikaci na osobní rozpočet“), ale výsledek bude průměrný.
- Cíl kurzu: cítit se jako ředitel vlastní firmy, který zadává práci týmu PhD, a ne jako uživatel cizích nástrojů.

---

## 2. Mentální model práce s AI agenty (video, 5 min)
[Lekce](https://www.coursera.org/learn/build-anything-with-ai/lecture/IyCFR/the-mental-model-for-working-with-ai-agents)

**Model:** představ si, že jsi ředitelka a svůj notebook předáš počítačovému PhD. Řekneš mu cíle a potřeby, on se postará o vše na počítači. AI funguje jako překladatel: umí překládat mezi jazyky, takže přeloží i z lidského zadání do „jazyka počítače“.

**Agent = AI + nástroje.** Nástroje jsou způsob, kterým AI posílá počítači zprávy (číst soubor, spustit příkaz, zapsat soubor) a dostává odpovědi. Ve výpisu činnosti agenta vidíš takové kroky (v ukázce „bash“, „read“, „write“); to je AI v rozhovoru s tvým počítačem. Vysokou úroveň zadání (např. „sestav vyúčtování cesty“) agent rozloží na malé kroky.

**Ukázka:** složka s výdaji z cesty + popis procesu vyúčtování → agent sám přečetl pravidla i účtenky, vytvořil CSV ve správném formátu a postavil dashboard se shrnutím. Autor se k AI choval jako k chytrému pracovníkovi: řekl, kde je proces a kde jsou účtenky, a „vymysli to“.

**K zapamatování:** AI umí věci, které bys sama nedělala (psát a spouštět kód). Ty se zbavíš překládání cílů do nízkoúrovňových kroků.

---

## 3. Zadávání práce v MAJK, Claude Code, Cowork, ChatGPT a Claude (video, 12 min)
[Lekce](https://www.coursera.org/learn/build-anything-with-ai/lecture/IRpro/assigning-work-to-your-ai-phd-in-majk-claude-code-claude-cowork-chatgpt-and)

Rozhraní se bude měnit, princip zůstává: **vyber složku, kde má agent pracovat, a pošli zadání.**

**Desktopové nástroje (přímý přístup k počítači)**
- **MAJK:** vlevo dole zelené tlačítko Start Task → název úkolu, **Working Directory** (složka přes Browse), člen týmu (výchozí „Majk Rabbit“) → otevře se chat, napíšeš zadání.
- **Claude Code v aplikaci Claude desktop:** vlevo nahoře přepínač Chat / Cowork / Code → Code → nová relace → před zadáním vybrat složku (otevřít složku → vybrat) → napsat zadání. Ve webovém prohlížeči (claude.ai) Claude Code tímto způsobem není.
- **Claude Cowork:** v horní liště vybrat Cowork → nový úkol → „work in a project“ → vybrat jinou složku → potvrdit povolení měnit soubory → zadání.

**Webové nástroje (claude.ai, ChatGPT v prohlížeči)**
- Nemají přímý přístup k tvým souborům, mají „vlastní počítač“. Složku zazipuješ (Mac: Compress; Windows: pravé tlačítko → Odeslat → Komprimovaná složka), nahraješ přes tlačítko plus, napíšeš zadání, a na konci musíš chtít výsledek zazipovat a stáhnout.
- Pravidlo: co bys nemohla poslat e-mailem jako přílohu (příliš velké), nemusí jít ani zde.

**Dvě verze cvičení v celém kurzu:** Verze 1 = nástroj s přístupem ke složkám (Majk, Claude desktop, Codex). Verze 2 = webové nástroje se zipem.

**Pro a proti:** přímý přístup = „kouzla“ na počítači, ale reálné riziko chyby (smazání, špatný přesun). Webová verze = chyba zůstane na jejich počítači, ale máš víc kroků (nahrát, stáhnout, přenést zpět). Podle míry důvěry si vyber, kterou verzi cvičení děláš. Autor říká, že používá přímý přístup a je s tím smířený, ale rozhodnutí je na každém.

---

## 4. Doporučené nástroje (čtení)
[Lekce](https://www.coursera.org/learn/build-anything-with-ai/supplement/l3FwR/recommended-tools)

Dvě kategorie, obě „PhD“, liší se tím, na čím počítači pracuje.

**PhD na tvém počítači:** ChatGPT Work, Claude Code, Claude Cowork, Codex (OpenAI, desktop macOS), MAJK (Vanderbilt/CR8.io; autor je spoluautor a držitel podílu, upozorňuje na zaujatost). Příklady: roztřídit stažené podle typu, shrnout PDF ve složce, postavit dashboard z tabulek na ploše.
- **Rizika:** nepochopení („uklidit“ složku může znamenat smazání), bezpečnost (útoky přes obsah, který AI zpracovává; čím víc napojení na e-mail, kalendář, finance, tím víc opatrnosti). Ochrany (potvrzovací dialogy, omezená oprávnění, sandbox) ubírají výkon. Univerzálně správná odpověď neexistuje.
- Pozor: počítač musí mít nainstalované správné nástroje, ale s tím ti AI pomůže.

**PhD s vlastním počítačem:** ChatGPT (web), Claude.ai. Bez instalace, ale musíš posílat soubory; jejich počítač nemá tvé programy a data.

**Co z toho plyne:** například aplikace na jídelníček s ukládáním dat. S přímým přístupem ti ji agent postaví, nainstaluje a spustí. S webovou verzí ti ji postaví, ale instalaci a spuštění pak řešíš sama, a to je pro začátečníky moc. Web je nejsnazší start, přímý přístup je nutný, když chceš zajít dál.

---

## 5. Bespoke computing je levný, buď odvážná (video, 6 min)
[Lekce](https://www.coursera.org/learn/build-anything-with-ai/lecture/9xI1C/bespoke-computing-is-cheap-be-bold)

- Software na míru dřív znamenal tým lidí na rok (programátoři, projektový manažer, designér). Rozpočtová aplikace z úvodu vznikla za pět minut a stála pár dolarů za tokeny (tokeny = měna AI agentů).
- **Odvážná ukázka:** složka Stažené → zadání: postav procházelné virtuální město, kde čtvrtě odpovídají oblastem života a práce, architektura, počasí, doprava, reklamy a muzea vychází ze vzorů v datech. Webová aplikace, spusť, otestuj sám a otevři v prohlížeči. Agent sám testoval výsledek (užitečné: ať si práci zkontroluje, než ti ji předá). Vyšly čtvrti jako AI Quarter, Developer District, Academia Heights, Financial Mile, Family Grounds a dopravní uzel (lety, cesty). Cena asi dolar nebo dva.
- **Poučení:** nebýt zbytečně konvenční. Kdo žádá „normální věc“, dostane průměr (např. „osobní rozpočet“ dopadne jako to, co už existuje). Odvážnější, individuální zadání dává odlišný výsledek. Doporučuje žádat odvahu **ve více směrech najednou** a vybírat.
- Firmám se bude vyplácet stavět si nástroje, které odpovídají jejich postupům.

---

## 6. Pochopení nákladů (čtení)
[Lekce](https://www.coursera.org/learn/build-anything-with-ai/supplement/20Qk5/understanding-costs)

- AI je levná, ne zadarmo. Úkoly, které by jinak stály konzultanta či vývojový tým (desítky až stovky tisíc dolarů), se řeší za centy až desítky dolarů.
- Cena je těžko předvídatelná: AI může přečíst mnoho souborů, opakovat kroky, přepnout na silnější model. Příklady cvičení v kurzu mohou stát cca **5–10 USD**, hlavně s velkou složkou. Měsíční předplatné nemusí být neomezené, hrozí limit a nákup dalších kreditů.
- **Doporučení:** sledovat spotřebu, nakupovat kredity po malých částkách, **nezapínat automatické dobíjení**, dokud neznáš fakturaci a své vzorce (autor ho u osobních účtů nepoužívá).
- Na Vanderbiltově centru utrácí za agenty hodně a dostává hodnotu zpět. Nadšení „všechno analyzovat a automatizovat“ spáruj s kontrolou nákladů.

---

## 7. Cvičení: nech AI pomoci uspořádat složku (čtení)
[Lekce](https://www.coursera.org/learn/build-anything-with-ai/supplement/hJMlw/let-ai-help-you-organize-a-folder)

**Cíl:** vybrat nepřehlednou složku a nechat AI navrhnout lepší strukturu, včetně jednoho nečekaného návrhu. Pocit, že to funguje, je první zážitek z toho, co kurz učí.

**Verze 1 — AI s přístupem k počítači**
0. **Kopie složky** předem (Mac: Duplicate; Windows: Kopírovat a vložit na stejném místě). Poprvé je to pojistka.
1. Otevřít nástroj a vybrat složku jako pracovní adresář.
2. **Zadání (vlastními slovy):** prozkoumej složku, abys opravdu pochopila, co v ní je (názvy, typy, vzory). Zamysli se, jak se takové informace obvykle používají a co člověk typicky hledá. Pak navrhni **tři různé způsoby uspořádání**, konkrétně popiš strukturu složek u každého; jeden z nich ať je nečekaný nebo kreativní. Po představení **se zastav, nic neměň a počkej na mou zpětnou vazbu.**
3. Zpětná vazba: napiš, která možnost se ti líbí, a **jak věci ve skutečnosti hledáš** (podle data, projektu, osoby, tématu), a nech variantu upravit. Opakovat, dokud to nesedí.
4. Volitelně: „reorganizuj složku podle vybrané možnosti, přesuň soubory, nic nemaž.“

**Verze 2 — AI na webu:** složku zazipovat, nahrát do nové konverzace, zadání stejné, ale na konci: ať se zeptá, kterou variantu chci a jak obvykle věci hledám; nic zatím nepřesouvat. Po upřesnění: ať soubory přeuspořádá a zazipuje, stáhnu zip a nahradím originál.

**Proč je zpětná vazba důležitá (Platónova jeskyně):** soubory jsou stíny, názvy a struktura jsou stopy toho, jak pracuješ, ne to samé. AI se z nich snaží odhadnout skutečnost. Každá informace od tebe („hledám podle projektu“) jí dává další stíny a blíží ji k pravdě. Cílem není dokonalost, ale dostatečné pochopení, aby její rozhodnutí byla vhled a ne jen kompetentní.

---

## 8. Cvičení: sestav dashboard z vlastních souborů (čtení)
[Lekce](https://www.coursera.org/learn/build-anything-with-ai/supplement/Iynt0/exercise-build-a-dashboard-from-your-own-files)

**Cíl:** vzít kolekci souborů, která k sobě patří, nechat AI vše přečíst a postavit dashboard s **aspoň třemi odlišnými vizualizacemi** (grafy, časová osa, mapa vztahů…). Ne souhrn, ne seznam, ale něco, na co se dá dívat a z čeho se poučit.

**Co použít:** projektová složka (poznámky, e-maily, zápisy: stav a otevřená vlákna), fotky z cesty, podklady k nákupu (PDF, screenshoty, specifikace), finanční výpisy, nebo úplně chaotická složka. Důležité je mít rozumný počet souborů a začít. Při důležitých pracovních souborech použít kopii a zkontrolovat firemní pravidla.

**Verze 1 — zadání:** přečti a analyzuj všechno ve složce; pochop obsah, vztahy mezi soubory a vzory. Postav krásný a přesvědčivý dashboard s nejdůležitějšími poznatky, nejméně tři různé vizualizace (např. rozložení nebo trend, diagram vztahů či struktury, časová osa nebo rozpad). Vyber typy podle toho, co jsi opravdu našla. **Než začneš stavět, stručně řekni, co jsi našla a co chceš vizualizovat**, abych mohla navést; pak postav.
- Krok 3 – navádění: „Nejvíc mě zajímá [trendy výdajů / otevřené úkoly / srovnání produktů / časová osa cesty], ať je to v dashboardu výrazné.“
- Krok 4 – iterace: „Přidej vizualizaci X a udělej sekci Y srozumitelnější.“

**Verze 2 — web:** zip → nahrát → stejné zadání; na konci požádat o HTML, PDF nebo obrázek ke stažení a sdílení.

**Rozdíl oproti shrnutí:** shrnutí říká, co tam je, dashboard ukazuje, co to znamená: proporce, časové osy, shluky, srovnání. U financí, stavu projektů, srovnání výzkumu nebo vzpomínek z cesty tak lze vidět vzory, které by čtení neodhalilo. Čím víc AI řekneš o tom, jaké otázky a rozhodnutí řešíš, tím lepší je výstup.

---

## 9. Hodnocený úkol — Your Dashboard (30 min)
[Lekce](https://www.coursera.org/learn/build-anything-with-ai/peer/AamD0/your-dashboard) · doporučený termín Coursery **5. 10., 23:59 CEST** (jen orientační, žádný tvrdý termín)
Odevzdání výsledku z cvičení č. 8. Hodnotí AI.

---

## 10. Co dál a komunita (čtení)
[Lekce](https://www.coursera.org/learn/build-anything-with-ai/supplement/RPlQV/learning-more-staying-connected)

- Doporučené navazující kurzy téhož autora: **Prompt Engineering for ChatGPT**, Custom GPTs, ChatGPT Advanced Data Analysis, Generative AI Primer, Generative AI for Leaders, Trustworthy Generative AI a další.
- Soukromá komunita (Circle) pro studenty jeho kurzů: doplňky, konzultační hodiny, měsíční přehledy trendů AI. Odkaz je přímo v lekci. Autor je i na LinkedInu (Initiative on the Future of Learning & Generative AI).
- Odborné texty: katalog promptových vzorů (White a kol.) a práce o „Living Software Systems“.
