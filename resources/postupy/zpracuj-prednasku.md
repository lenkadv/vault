# Postup: Zpracuj přednášku (všechny předměty KTF)

Vznikl 261013. Claude čte tento soubor, když Lenka řekne „zpracuj přednášku“ (u kteréhokoli předmětu), přesune nebo ohlásí novou nahrávku, nebo chce upravit starší zápisky z přednášky. **Cíl: z každé přednášky vznikne Google Doc se zápisky, které vypadají u všech předmětů stejně.** Anki karty se dělají jen u předmětů označených v tabulce (zatím Přehledovky a Metodologie 2).

Studium není GTD (žádné tasky do `next-actions`). Bloky v kalendáři viz [[areas/studies]] a pravidla zavírání v [[CLAUDE]].

## Rychlý start (nové vlákno)

Lenka řekne např. „zpracuj přednášku Hagiografie“, „uprav zápisky 261002“ nebo „zpracuj starší dokumenty“. Claude:

1. **Přečte tento soubor celý** + paměť `feedback_pech_zapisky_datace_rozpory`, `feedback_osloveni_lidi`, `reference_notebooklm_cli`, `project_zpracuj_prednasku_postup`; u Přehledovek navíc [[resources/postupy/prehledovky-pech]], u Metodologie 2 [[resources/postupy/metodologie2]]. Před zásahem do Docs načte skill `google-workspace` (+ jeho `references/docs.md`).
2. **Nová přednáška, pořadí kroků:** (A) oddíl 1 přesun mp3 z Easy Voice Recorderu do `26ZS <předmět>`, (B) oddíl 2 Notebook (zdroj nahrát, počkat na `ready`), (C) oddíl 3 zpráva z Notebooku, (D) oddíl 4 kontrola údajů, (E) oddíl 6 Doc z HTML do `26ZS <předmět>`, (F) oddíl 7 vzhled, (G) oddíl 8 Poznámky ke kontrole, (H) oddíl 9 dashboard (Přehledovky), daily a kalendář při zavírání, (I) oddíl 10 Anki jen u Přehledovek a Metodologie 2.
3. **Starší dokument z Notebooku nebo výchozí Doc:** oddíl 7, poslední bod; texty → struktura → vzhled → Poznámky ke kontrole. Skripty a jejich parametry viz oddíl 7.
4. **Pozor na úrovně nadpisů:** v každém Docu jsou jiné (Doc uložený z Notebooku v aplikaci má H4/H5/H6, Doc z HTML má H1 až H4 a u každé zprávy se úrovně liší, např. Muzejnictví 1. 10. má sekce jako H3). Před vzhledem vždy vypsat `docs_index.py outline` a zvolit mapování: titul → TITLE, sekce `N.` → nadpis 1, podsekce → nadpis 2, podpodsekce → nadpis 3. `format_generic.py` má výchozí mapování pro Doc z aplikace a přepínač `--map HEADING_1:title,HEADING_2:h1,HEADING_3:h2,HEADING_4:h3` pro ostatní.
5. Celé vlákno je jedna práce: čas začátku a konce zapisovat do Průběhu dne, kalendář při „zavírám“ (blok na skutečný čas, přestávky 40+ min rozdělit).

## Fronta práce (stav 261013 večer)

Hotové (jednotný vzhled, zkontrolované údaje, Poznámky ke kontrole): `261012` Metodologie 2 (**vzor**), `261013` Přehledovka 19. st., `261006` Přehledovka 19. st. Lenka některé Docy přejmenovala, proto hledat podle ID:

| Dokument | Předmět | ID | Stav |
|---|---|---|---|
| 261012 Od Johanna Joachima Winckelmanna k počátkům vědeckého znalectví | Metodologie 2 | `18a55BkQnuXA3NvN-Z9yEMfyWoFrkLCv0epCLwTnmBDE` | vzor (Lenka a předchozí vlákno) |
| 261013 Přelom 18. a 19. století: Od neoklasicismu k romantismu | Přehledovka 19. st. | `1kuEcpuInRSLRux3-r84iKGSnpqEMMg0MrwF5WkqUeWk` | hotový; rozpory pro dr. Pecha v dashboardu `pech/q6`, `q7` |
| 261006 Přelom 18. a 19. století a klasicismus | Přehledovka 19. st. | `1rFKf401ZwbKZC7A9qEYlWujbmlBhUm_2_AtTcPOp2Dk` | hotový |
| 261016 Umělecké avantgardy počátku 20. století: Od dynamiky futurismu k původu abstrakce | Přehledovka 20. st. | `1qif_bXmC06R8bXcubeGCcNvatoDmf08UITSevrf9JRk` | hotový (261016), rozpory pro dr. Pecha v dashboardu `pech/q8`, `q9` |
| 261019 Vývoj historiografie, výtvarné kritiky a znalectví v 18. a na počátku 19. století | Metodologie 2 | `1rKKGek2Hux7jzjWww88ZEkxZgr_wytj03TCnS3y32yc` | hotový (261019), rozpory v dashboardu Metodologie 2 `notes/v09`–`v15`; skripty `meto-work\zapisky\build_html1019.py`, `format_meto.py` (nastavení tabulek po jedné) |
| 261020 Proměny umění a estetiky na prahu 19. století: Od neoklasicismu k romantismu | Přehledovka 19. st. | `1hVDtSE7HeDPLHjADk8JwH7e-sSAOxk-M03YZg7D1ryQ` | hotový (261020), rozpory v dashboardu `pech/q10`; skripty `build_html1020.py`, `format_1020.py` (šířky tabulek po jedné) |
| 261002 Počátky avantgardy kolem roku 1905: Fauvismus a německý expresionismus | Přehledovka 20. st. | `1KbPlu9PzneB2CF92gnij3OnLLOBWTvducdNl7K7UxeE` | hotový (261020): **nový Doc**, zpráva znovu jen z nahrávky, 3 kontrolní dotazy, rozpory v dashboardu `pech/q11`; skripty `zapiskyuild_html1002.py` (text píše Claude do `z1002\z1002.md`), `format_1002.py`. Starý surový Doc `1UUeFzbCnjjdVfP8hgJkj7rZzvSIn8hUo5IlaGasf8T4` (261002 20. století…) čeká na rozhodnutí Lenky, zda smazat |
| 261009 Kubismus, purismus a předválečná avantgarda | Přehledovka 20. st. | `1j5j4n6mJUdY3427nkK1-HGXy6tqmhWhsZhnGWA-FNwc` | **k úpravě** |
| 261005 Metodologie II | Metodologie 2 | `1y_FdQPaQU95uksi_2W5a9ebA6Wuc-7oH90nMY988eLA` | **k úpravě** |
| 261001 Metodologie hagiografie, vývoj kultu svatých a prameny | Hagiografie | `1XZn4frnyo3Ph3Splc7QCDn-OBkkWLEgeiUYpQCuGGLk` | výchozí, neupravený (notebook `0e2d3213`) |
| 261008 Metodologie hagiografie a kritická analýza raně křesťanských pramenů … | Hagiografie | `12LqIIydjQDzY3ens_5dxSKaS-CwL6FJVe4VNCdS4E6w` | výchozí, neupravený |
| 261001 Úvod do muzeologie a správy sbírek | Muzejnictví | `1t9S-TOVrNPgQdKbIo9MwN6yc19EUnxXSXpYUd5PvKHU` | výchozí, neupravený (Lenka přejmenovala) |
| 261008 Vývoj muzejnictví, sběratelství a předních evropských sbírkových institucí | Muzejnictví | `1ctqwJG8RKzO9kDG_lyXR9W0QVcgsu4ltqVL10qihoVc` | výchozí, neupravený (Lenka přejmenovala) |
| 261012 Sociologické a historické proměny profese architekta | Barokní architektura | `1B8wMWnc1py1sP0Geivh5LQDWCNXyLf1_DAiQbA8pGD0` | výchozí, neupravený |
| 261006 Vizuální kultura a proměny obrazu ve společnosti | Vizuální kultura | `1WlT52rceh7HFPwOGVu8-aN5FYTQ1ktr1o3CyW8aMq18` | výchozí, neupravený |

Pořadí úprav určí Lenka (návrh: nejdřív Přehledovka 20. st. a Metodologie kvůli zkouškám, pak ostatní). U výchozích dokumentů z HTML bývají v textu zbytky `` ``` `` (ASCII schémata), překlepy, nadpis „Executive Summary“ a úrovně nadpisů podle Notebooku; opravit podle oddílů 5 až 8. U Přehledovky 20. st. po úpravě doplnit dashboard (`lectures/p-…` pole `notes`).

Nové nahrávky: Easy Voice Recorder je k 261013 prázdný (vše přesunuto). Další přednášky přicházejí podle rozvrhu (Přehledovka 19. st. úterý, 20. st. pátek, Metodologie 2 pondělí, ostatní podle rozvrhu předmětu).

## 0. Předměty (tabulka je jediné místo, kde se mapuje předmět → složka → Notebook)

Složky jsou v `G:\Můj disk\02 EDUCATION 📚\KTF\Aktuální\`. **Struktura každého předmětu (Lenka 261013):**

```
Aktuální\<předmět>\                 ← „deštník“, NESDÍLENÁ (jméno předmětu bez předpony)
    26ZS <předmět>\                  ← SDÍLENÁ se spolužáky: nahrávky (mp3), poznámky (Google Docy), slajdy (PDF, PPTX, gslides)
    …vlastní materiály volně zde…     ← Anki .apkg, CSV, pracovní soubory, studijní podklady jen pro mě
```

Důvod: Lenka materiály sdílí se spolužáky, a vlastní podklady (Anki, pracovní soubory) chce mít ve stejné složce, aby je našla, ale nechce je sdílet. Sdílí se proto jen podsložka `26ZS <předmět>` (sdílení se dědí směrem dolů, takže deštník zůstává soukromý). **Do `26ZS <předmět>` patří jen to, co smí vidět spolužáci; vlastní věci patří do deštníku mimo ni.** Anki sdílí Lenka podle potřeby zvlášť odkazem na soubor. Nové mp3 a Docy se vždy ukládají do `26ZS <předmět>`. Slajdy budou přibývat, ukládat je tam taky (u Přehledovek jsou slajdy dr. Pecha ve společné složce `Aktuální\Pech 19-20stoleti prezentace`). Skripty a lokální pracovní složky (`Documents\pech-work`, `Documents\meto-work`) jsou mimo Disk, takže se nesdílejí.

| Předmět | Vyučující | Deštníková složka (sdílená podsložka `26ZS …`) | Předpona mp3 (`<předpona>YYMMDD.mp3`) | Notebook | Anki |
|---|---|---|---|---|---|
| Přehledovka 19. století | dr. Pech | `Přehledovka 19. století` | `19stoleti` | „Přehledovka 19. století“ | ano → [[resources/postupy/prehledovky-pech]] |
| Přehledovka 20. století | dr. Pech | `Přehledovka 20. století` | `20stoleti` | „Přehledovka 20. století“ | ano → [[resources/postupy/prehledovky-pech]] |
| Metodologie 2 | doc. Kubík | `Metodologie 2` | `Metod` | „Metodologie II“ | ano → [[resources/postupy/metodologie2]] |
| Hagiografie | prof. Kubín | `Hagiografie` | `Hagio ` (s mezerou, jak jsou stávající soubory) | „Úvod do hagiografie“ | ne |
| Muzejnictví | dr. Vymazalová | `Muzejnictví` | `Muzejnictví ` (s mezerou) | „Úvod do muzejnictví“ | ne |
| Barokní architektura | dr. Štěrbová | `Barokní architektura` | `BarArch` | „Barokní architektura“ (založen 261013) | ne |
| Vizuální kultura 19.–20. století („vizuálka“) | dr. Bendová | `Vizu19-20` | `Vizu` | „Vizuální kultura 19.–20. století“ (založen 261013) | ne |

Notebooky jsou na Disku Google v účtu Lenky; ID se hledá příkazem `notebooklm list` (zkrácené ID stačí, např. Přehledovka 19. století `8c55285b`, Metodologie II `0b9f1a49`). U jména nového notebooku použít název předmětu. **Nový předmět = nový řádek v této tabulce** (složka, předpona, Notebook, vyučující, Anki ano/ne).

Stav starších záznamů, které zápisky ještě nemají (261013): Hagiografie `Hagio 261001`, `Hagio 261008`; Muzejnictví `Muzejnictví 261001`, `Muzejnictví 261008`; Barokní architektura `BarArch261012`; Vizu19-20 `Vizu261006`. U dokumentů z Notebooku, které už existují, ale ještě nemají jednotný vzhled (`261002`, `261009` Přehledovka 20. st., `261005` Metodologie 2), se použije oddíl 7, poslední bod („Starší dokument z Notebooku“).

## 1. Nahrávka: přesun z Easy Voice Recorderu

1. Najdi nejnovější `.mp3` v `G:\Můj disk\Easy Voice Recorder\` (podle data změny). Přehledovka 19. st. je úterý, 20. st. pátek, Metodologie 2 pondělí; u ostatních předmětů podle rozvrhu a data. Pokud je nejistý předmět nebo datum, **zeptat se Lenky**, nehádat.
2. Přejmenuj na `<předpona>YYMMDD.mp3` podle tabulky. **YYMMDD = den přednášky**, ne den zpracování (z data změny souboru, při pochybnosti potvrdit).
3. Přesuň do **sdílené podsložky `26ZS <předmět>`** v deštníkové složce předmětu (PowerShell `Move-Item`; cesty viz oddíl 0). **Nepřepisuj** existující soubor se stejným názvem. Pokud nahrávka už ve složce je, nedělat nic.
4. V Easy Voice Recorderu nezůstane kopie (přesun, ne kopírování). Notebook si nahrávku ponese vlastní kopií, takže po nahrání do Notebooku není potřeba nic dalšího.

## 2. Notebook (NotebookLM přes `notebooklm` v příkazové řádce)

Exe `C:\Users\Lenka\AppData\Local\Packages\PythonSoftwareFoundation.Python.3.11_qbz5n2kfra8p0\LocalCache\local-packages\Python311\Scripts\notebooklm.exe`; před voláním `$env:PYTHONIOENCODING='utf-8'` (v bashi `export PYTHONIOENCODING=utf-8`). Při chybě `notebooklm login` (Lenka se přihlašuje sama, viz memory `reference_notebooklm_cli`). Příkazy Notebooku mohou trvat déle než 2 minuty, dlouhé (generování, nahrávání) pouštět na pozadí.

1. `notebooklm list` → najdi Notebook předmětu. Chybí-li: `notebooklm create "<název předmětu>"`.
2. Nahraj nahrávku: `notebooklm source add "<cesta k mp3>" --type file --timeout 600 -n <notebook>`. Počkej, až je zdroj ve stavu `ready` (`notebooklm source list -n <notebook>`). Zapiš si ID zdroje (zkrácené).
3. **Zdroje:** zpráva se generuje **jen z nahrávky té jedné přednášky** (`-s <id zdroje>`), ne ze slajdů a ne z dalších přednášek. Slajdy a ostatní zdroje v Notebooku slouží až ke kontrole.
4. `notebooklm ask` bez přepínače pokračuje v Lenčině poslední konverzaci a dotaz se jí objeví v chatu (v Notebooku nepoužívat `--new` bez jejího souhlasu, zahazuje konverzaci). Dotazy na jednu přednášku vždy s `-s <id zdroje>`.

## 3. Zpráva z Notebooku

Příkaz (zadání v `Documents\pech-work\zapisky\prompt.txt`, je to Lenčino zadání z 261012; Notebook píše česky díky `--language cs`):

```
notebooklm generate report --format custom --prompt-file prompt.txt -n <notebook> -s <id zdroje> --language cs --wait --timeout 600
```

Zadání doslova: „Create a detailed document that covers the themes and ideas from the sources. Start with a concise Executive Summary that presents the most critical takeaways upfront. The body of the document must provide a detailed and thorough examination of the main themes, evidence, and conclusions found in the sources. This analysis should be structured logically with headings and bullet points to ensure clarity. The tone must be objective and incisive.“

Potom `notebooklm artifact list -n <notebook>` → ID zprávy (stav `completed`; čekat přes `notebooklm artifact wait <id> -n <notebook> --timeout 300`) a `notebooklm download report <soubor.md> -a <id> -n <notebook>` (do pracovní složky, ne do vaultu). **Zprávu přečíst celou.** `notebooklm artifact export … --type docs` nepoužívat: vznikne jeden odstavec se surovým markdownem (`####`, `*`, `|`).

## 4. Kontrola údajů (vždy před zápisem do Docs)

Zdroje v tomto pořadí; **nic se tiše nepřepisuje**, každá odchylka jde do Poznámek ke kontrole.

1. **Podklady předmětu:** prezentace a PDF ve složce předmětu (Přehledovky: `pech-work\cards_final.json`, `fixes.py`, teorie karty `theory.py`; Metodologie 2: `Meto2 2.pdf`, `261005Metodologie2.pdf`; Hagiografie: `00 - Literatura.pptx`; Vizu19-20: `261006Vizu19-20.pdf`).
2. **Dřívější ověření z chatu** (Anki karty, opravy): smím je použít jako zdroj.
3. **Dotaz na přednášku:** co Notebook vynechal nebo zkomolil (jména, roky, kdo co řekl) → `notebooklm ask -n <notebook> -s <id zdroje> "… Odpověz jen z přednášky, uveď slova vyučujícího co nejblíže a když to nezaznělo, napiš to výslovně."` Zaznělo, ale ve zprávě chybí → doplnit do textu (příklad 261013: Gilly).
4. **Web** (WebSearch standardní): životní data, sporné datace, jména staveb. Neověřitelné nechat a zapsat.

Pravidla údajů: datace děl: prezentace vyučujícího, pak přednáška, pak literatura; rozpor mezi nimi **zapsat** (příklad: Gros, *Napoleon v Jaffě*, prezentace 1807–1808, Louvre 1804). Životní data osob při prvním zmínění ve tvaru `(1717–1768)`, nejde-li najít, nepsat. Chybu vyučujícího nikdy neopravovat v textu, ale zapsat (a u věcné chyby dát dr. Pechovi/doc. Kubíkovi k ověření do dashboardu).

## 5. Text (jednotná pravidla)

- **Slovník:** „v přednášce“ (ne „na nahrávce“, „v přepisu“); vyučující vždy „dr. Pech“, „doc. Kubík“ (**nikdy samotné příjmení**); u historických osob běžné příjmení je v pořádku.
- **Text zápisků bez odkazů na vyučujícího (Lenka 261020):** zápisky jsou poznámky z jeho přednášky, takže co řekl, se píše jako hotová věc. Nepsat „dr. Pech uvedl / uzavřel / spojil / připomněl / zdůraznil“, „podle dr. Pecha“, „v přednášce zaznělo“. Jméno vyučujícího patří jen do **Poznámek ke kontrole** (rozpory: „dr. Pech uvedl X, jiné zdroje Y“) a do organizačních informací, kde jinak nejde (např. „ke zkoušce“ stačí bez jména).
- **Jazyk:** české uvozovky „ “, pomlčka v rozsazích `–` (1717–1768), mezery před interpunkcí pryč, žádné zdvojené mezery, „Shrnutí“ (ne „Souhrn“, ne „Executive Summary“).
- **Struktura Docu:** (1) titulek (TITLE; název přednášky, bez data), (2) **Shrnutí** jako číslovaný seznam 5 až 7 bodů s tučnými hesly, závěry nahoře (ne „Tento dokument shrnuje…“), (3) očíslované sekce `1. …` (nadpis 1. úrovně) s podsekcemi bez čísla (nadpis 2. úrovně), (4) tabulky tam, kde Notebook dává přehled (autoři, díla, termíny), (5) na konci **Poznámky ke kontrole**. Titulek a názvy děl kurzívou; názvy děl v tabulce kurzívou, jména tučně.
- **Co nikdy neměnit bez poznámky:** formulace vyučujícího a věcné údaje.
- **Oprava překlepů:** s jistotou tiše; odhadem (původní slovo nedávalo smysl) označit v Poznámkách.

## 6. Dokument v Google Docs

Název souboru: `YYMMDD <titul zprávy>` (příklady: `261012 Od Johanna Joachima Winckelmanna k počátkům vědeckého znalectví`, `261013 Umění a architektura na přelomu 18. a 19. století: Od neoklasicismu k romantismu`). Složka: sdílená podsložka `26ZS <předmět>`.

1. Z markdownu zprávy sestav HTML (`Documents\pech-work\zapisky\build_html.py`; seznam `R` v něm obsahuje opravy textu a doplněná data, každá musí zabrat právě jednou). Mapování: `#` titul → h1, `##` → h2 (úvodní „Exekutivní shrnutí“ → „Shrnutí“, ostatní očíslovat od 1), `###` → h3 (číslo odstranit), tabulky `<table>`, vnořené odrážky `<ul>`.
2. Drive `create_file` s `contentMimeType: text/html`, `parentId` sdílené podsložky `26ZS <předmět>` (ID zjistit Drive vyhledáváním `title = '26ZS …'`), `textContent` = HTML. Vzniknou nativní nadpisy, odrážky a tabulka. (Ověřeno 261013.)
3. Přečti dokument (`read_doc`, výsledek je velký a uloží se do souboru) a vytvoř dávku vzhledu skriptem `format_generic.py` (viz 7).

### Pevné hodnoty vzhledu (podle vzoru `261012`)

- Strana A4, okraje 72 pt, písmo **Lora** 11 pt, řádkování **1,25**, odstavec 8 pt pod sebou.
- Odrážky: řádkování 1,2, 5 pt pod sebou, **tučný lead-in** s dvojtečkou (u číslovaného shrnutí i u běžných odrážek).
- **TITLE:** Lora tučně 24 pt, barva vínová `#7A212B` (0,478 / 0,129 / 0,169), 14 pt pod sebou.
- **Nadpis 1:** tučně 17 pt, vínová, linka pod nadpisem 1 pt vínová (odsazení 3 pt).
- **Nadpis 2:** tučně 13 pt, barva `#333340` (0,2 / 0,2 / 0,239).
- **Nadpis 3** (jen výjimečně): tučně 12 pt, šedá `#666666`.
- Všechny nadpisy `keepWithNext` + `keepLinesTogether`; úvodní věty končící dvojtečkou `keepWithNext`.
- **Tabulky:** text 10 pt, řádkování 1,15, bez mezer odstavce, buňky odsazení 6 pt, ohraničení 0,75 pt `#D1C7C7`, záhlaví podklad `#F6EDEB` (0,965 / 0,929 / 0,922) a text tučně vínově, pevné šířky sloupců (součet 451 pt), `preventOverflow` na všech řádcích (řádek se nedělí mezi stránky); první sloupec jména tučně (životní data netučně), druhý sloupec názvy děl kurzívou.
- **Citace** (volitelně): rámeček s levou linkou 2,25 pt vínovou, podklad `#F6F2F0`, odsazení 10 pt, text kurzívou.
- **Schémata a „šipkové“ texty** (ASCII ze samých pomlček a mezer) převést na tabulku (nebo na rámeček v neproporcionálním písmu Roboto Mono 9,5 pt s levou linkou), nikdy nenechat jako text s mezerami.

## 7. Provedení úprav (technicky)

Skripty: `C:\Users\Lenka\Documents\pech-work\zapisky\` (`build_html.py`, `format_generic.py`, `struct1006.py`, `dump_text.py`, `verify.py`, `prompt.txt`, `md2html_raw.py` = převod zprávy na HTML bez jakýchkoli úprav pro výchozí Doc, `nb_jobs.sh` = vzor dávky Notebook → zpráva → md na pozadí). Skill `gdoc-oprava-a-uprava-vzhledu` (zásady oprav) a `google-workspace` (`references/docs.md`) se čtou před zásahem do Docs.

1. `read_doc` → soubor → `dump_text.py` (přehled odstavců s indexy) → soupis chyb.
2. **Textové opravy** `replaceAllText` v jedné dávce (nepotřebuje revizi; hledaný text začínat nestylovým znakem, jinak nová část zdědí tučné/kurzívu; jednou použité „hledání“ musí zabrat právě jednou).
3. **Struktura** (nadpisy, vkládání odstavců, mazání prázdných odstavců, tabulky, sekce poznámek) jedna dávka s `requiredRevisionId`, požadavky od nejvyššího indexu k nejnižšímu (`struct1006.py` je vzor).
4. **Vzhled:** nejprve uložit rozsahy **tučného** (změna písma `weightedFontFamily` tučné vymaže i bez udané váhy), pak jedna dávka z `format_generic.py` (písmo, obnova tučného a kurzívy, styly nadpisů, odstavce, tabulky, poznámky). Dávka musí být ve volání vložená v textu, při velikosti nad ~20 kB rozdělit na dvě.
5. **Revize:** `read_doc` je po každém zápisu zastaralé; revize se může posunout i bez našeho zásahu (autosave). Při chybě „required revision ID does not match“ načíst znovu, ověřit, že se text a indexy nezměnily, a poslat s novým ID. Guard nikdy nevynechávat (kromě dávky jen z `replaceAllText`).
6. **Ověření:** `verify.py` (text před a po je totožný, počet tučných a kurzívních úseků sedí) a kontrola stránek (Drive `download_file_content` jako `application/pdf` → PyMuPDF `fitz`, jen pro kontrolu: osamělé nadpisy na konci stránky, rozdělený řádek tabulky, font; **PDF se nikam neukládá**).
7. **Starší dokument z Notebooku** (b: `261002`, `261009`, `261005`): stejně, navíc nahradit „Souhrn“ → „Shrnutí“ (přepsat úvodní odstavec „Tento dokument shrnuje…“ na číslovaný seznam závěrů), „Sekce N:“ → `N.`, odstranit prázdné nadpisy a odstavce, rozdělit slepené odstavce, ASCII schémata → tabulka. Doc přejmenovat jen na pokyn Lenky (název `YYMMDD titul`).

### Poučení z 261016 (Přehledovka 20. st.)

- **Kontrola proti přednášce** se osvědčila ve třech dotazech `notebooklm ask … -s <zdroj>` s odpovědí ANO / NE / JINAK u každého tvrzení zprávy (jména, roky, názvy děl, počty bodů, kdo co řekl). Notebook si domýšlí (název obrazu, materiály, rok SSSR); co v přednášce nezaznělo, jde buď do Poznámek, nebo z textu pryč. Názvy a roky děl doplnit z prezentace (`cards_final.json`, výpis do UTF-8 souboru, ne na konzoli).
- **Poznámky ke kontrole rovnou v HTML** jako `<h2>` + odstavce `<p><b>Hesla:</b> text</p>` (skript `build_html1016.py`); `format_generic.py` z nich udělá odrážky. Přepínač `--italcol N` (sloupec s názvy děl kurzívou, `-1` žádný, výchozí 1) a `--colw` pro šířky sloupců u tabulky nad 3 řádky. Tabulky s 3 řádky a méně `format_generic.py` bere jako běžné.
- **Po vzhledu zkontrolovat:** (1) v Poznámkách se resetem `bold,italic` ztratí kurzíva u názvů děl, vrátit ji ze seznamu italic rozsahů před resetem; (2) první znak odstavce za tabulkou a konec odstavce před tabulkou dostanou 10 pt z tabulky, přenastavit na 11/13 pt (`verify.py` + výpis velikostí). Dávku vzhledu (~60 kB) poslat ve třech částech; ID revize vrací odpověď `update_doc` pro další část.
- **Python s PyMuPDF** spouštět bez `-I` (v izolovaném režimu `fitz` nenajde).

### Poučení z 261019 (Metodologie 2)

- **Zkomolená jména z přepisu Notebook „dovykládá“ špatně:** „Algrana“ u Diderota vyložil jako Algardiho, správně (Lenka) **Chardin**; „Petr z Apulie“ odhad sedl. Jméno odhadnuté z fonetického přepisu nikdy nepsat do textu jako jisté: buď do Poznámek jako opravu odhadem, nebo se zeptat Lenky, která byla na přednášce.
- Tabulky s různým účelem v jednom Docu: `meto-work\zapisky\format_meto.py` (kopie `format_generic.py` s nastavením po jednotlivých tabulkách: šířky `TW`, tučný 1. sloupec `TB`, sloupec kurzívou `TI`; kurzíva v buňce končí před „ (“).
- Dávka vzhledu po částech do ~16 kB (5 částí místo 3) prošla bez chyby.

### Poučení z 261020 večer (Přehledovka 20. st., starší Doc 261002)

- Starý Doc z Notebooku vznikl ze zprávy, která brala i prezentaci: obsahoval tabulku 46 děl, z nichž většina v přednášce nezazněla, a chyběla v něm třetina přednášky (architektura, film, Nolde, Pechstein, *Neue Wilde*). Proto se **zpráva generuje znovu jen ze zdroje nahrávky** a starý Doc se neopravuje, ale nahradí novým (Drive neumí přepsat obsah existujícího Docu z HTML; nový Doc = nové ID, starý smazat jen se souhlasem Lenky).
- Když je zpráva tenká, Claude napíše text zápisků sám do markdownu (`z1002\z1002.md`) ze zprávy a ze tří kontrolních dotazů; `build_html1002.py` je jen převod + Poznámky ke kontrole.
- Notebook si v odpovědích odporuje (Dufy jednou zazněl, jednou ne): co se liší mezi dotazy, jde do „K ověření v přednášce“, ne do textu jako jisté.

### Poučení z 261020 (Přehledovka 19. st.)

- Notebook ve zprávě přidal desítku jmen a údajů, které v přednášce nezazněly (Abildgaard jako Füssliho žák, Pinel, Dubuffet, Hartley, Janohrad, Vogel…), a spletl i datum v názvu díla (Goya „2. května“). Třetí kontrolní dotaz se seznamem 25–30 konkrétních tvrzení (ANO / NE / JINAK) to odhalil; vypuštěné věci jdou do Poznámek jako „Vypuštěno, protože v přednášce nezaznělo“.
- Tučné heslo s kurzívou názvu díla: v markdownu `**{Název} (rok):**`, `inline()` v `build_html1020.py` převádí `{…}` na `<i>`.
- `####` mezititulky nad tabulkami nahradit úvodní větou s dvojtečkou (jinak vznikne nadpis 2. úrovně vedle podsekcí).

**Nové nahrávky (261019):** Hagiografie a Muzejnictví z 15. 10. (`Hagio 261015.mp3`, `Muzejnictvi 261015.mp3`) zůstávají v Easy Voice Recorderu, **zatím nezpracovávat** (Lenka, kvůli tokenům).

## 8. Poznámky ke kontrole (poslední sekce Docu)

Nadpis 1. úrovně „Poznámky ke kontrole“, pod ním **odrážky s tučným heslem a dvojtečkou, v tomto pořadí** (co není, vynechat):

1. **Zdroj a úpravy** (jaký Notebook, která přednáška, co se v textu změnilo: titulek, přejmenování nadpisů, schéma → tabulka).
2. **Překlepy opravené s jistotou** (seznam „původní → nové“).
3. **Opravy odhadem** (původní slovo nedávalo smysl, ověřit podle přednášky).
4. **Oprava věcného údaje** (např. nesprávný název díla v tabulce).
5. **Životní data osob** (které osoby, odkud, že nejsou ověřená).
6. **Data děl z prezentací vyučujícího** (seznam díl → rok).
7. **Data z jiných zdrojů** (seznam).
8. **Rozpor:** (každý rozpor zvlášť; kdo uvádí co, co je v textu; „probrat s dr. Pechem / doc. Kubíkem“, kde je třeba).
9. **Doplněno podle přednášky** (co Notebook vynechal a Claude doplnil).
10. **K ověření v přednášce** (co zbývá poslechnout).

Slovník poznámek stejný jako v textu (v přednášce, dr. Pech, doc. Kubík).

## 9. Po vytvoření Docu

1. **Dashboard** (jen Přehledovky): `ArtifactData` → `lectures/<id>` pole `notes` = `{url, title, made, checked}`; rozpory pro dr. Pecha do `pech/q…`. Stránka dashboardu odkaz zatím nezobrazuje (chtělo by sloupec „Zápisky“).
2. **Daily:** jeden řádek do Průběhu dne dnešního `daily/YYMMDD.md` (přednáška, název Docu, počet rozporů k ověření).
3. **Kalendář:** skutečný čas práce zapsat při „zavírám“ podle pravidel v [[CLAUDE]] (blok „Zpracování přednášky <předmět>“), ne předem.
4. Lence v závěrečné zprávě: odkaz na Doc (název jako odkaz), co jsem změnil, co ověřit (5 až 8 odrážek), co zbývá.

## 10. Anki větev (jen předměty označené „ano“)

Pořadí není povinné, ale platí: **kontrola Anki je vždy první, než se cokoli generuje** (Přehledovky: `anki_sync.py` + `anki_check.py`, Metodologie 2: `meto_sync.py`). Detail a pravidla (atomické karty, odtajňování, limity, web) jsou v postupech [[resources/postupy/prehledovky-pech]] a [[resources/postupy/metodologie2]]. Vztah k zápiskům: existují-li karty z té přednášky, jsou první zdroj kontroly údajů (oddíl 4), a rozpory objevené při tvorbě karet se doplní do Poznámek ke kontrole. U předmětů bez Anki tento oddíl odpadá.

## Otevřené (doptat se Lenky při první příležitosti)

- Struktura „deštník + sdílená podsložka `26ZS <předmět>`“ je od 261013 zavedená u všech sedmi předmětů (Přehledovky, Metodologie 2, Hagiografie, Muzejnictví, Barokní architektura, Vizu19-20). Vizu19-20: podsložka se jmenuje `26ZS Vizu19-20`. Vlastní materiály jsou zatím jen v deštníku Metodologie 2 (`METO2-karty.apkg`, `251005flashcards.csv`).
- `26ZS Středověká Praha a okolí` je pojmenovaná podle dřívějšího zvyku jako jediná složka (obsahuje referát, handouty, bakalářskou práci Lenky); převést na strukturu deštník + sdílená podsložka, až Lenka řekne.
- Starší nahrávky ostatních předmětů (Hagiografie 1. a 8. 10., Muzejnictví 1. a 8. 10., Barokní architektura 12. 10., Vizu19-20 6. 10.): 261013 jsou v Notebooku a mají **výchozí** (nekontrolovanou a neupravenou) zprávu uloženou jako Doc v `26ZS <předmět>`; kontrola a úprava podle tohoto postupu čeká na pokyn Lenky (prezentace ve složkách budou zdrojem pro kontrolu údajů).
