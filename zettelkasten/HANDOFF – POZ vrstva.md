# HANDOFF – POZ vrstva (atomické citace)

Tenhle soubor je určený k otevření v novém vlákně/konverzaci. Přečti nejdřív celý, pak [[MOC – Zettelkasten]] (živá specifikace celého systému) a [[feedback_zettelkasten_transfer_failure]] (paměťový soubor — poučení z prvního neúspěšného pokusu, proč se musí postupovat opatrně).

## Kontext — co a proč stavíme

Lenka (uživatelka) chtěla zettelkasten v Obsidianu, který by fungoval podobně jako její Notion databáze "Slepé kuře" (Sources ↔ Poznámky ↔ Images), ale s výhodami Obsidianu (fulltextové hledání, provázání). Inspirace metodou Source-Topic-Argument z videa "Effortless Academic" (Obsidian Note-Taking System for Academics). Systém má čtyři vrstvy:

- **LN** (`zettelkasten/literature/LN/`) — source notes, jeden na citovaný zdroj. Frontmatter: `autor, nazev, typ, zdroj, rok, kde_najit, zotero, stav, datum_cteni/datum_katalogizace, tags, temata, pouzito_v`.
- **OUT** (`zettelkasten/vystupy/`) — vlastní hotové výstupy (seminárky, bakalářka, články) — NE zdroje, ale co Lenka sama napsala.
- **topics** (`zettelkasten/topics/`) — skutečné stránky na koncept/téma (ne tagy), název = téma, osoby příjmení první. LN na ně odkazují přes `temata` property i `**Témata:**` řádek v těle.
- **POZ** (`zettelkasten/poznamky/`) — **zatím neexistuje, tohle je úkol tohoto vlákna.** Atomické citace — prostřední vrstva mezi LN zdrojem a OUT výstupem, paralela k Notion tabulce "Poznámky".

Kompletní pravidla (frontmatter schémata, `kde_najit` konvence, tag vs. topic note, atd.) jsou zapsaná v [[MOC – Zettelkasten]] — je to živý dokument, důvěryhodnější než tahle příručka, pokud si odporují.

## Důležité poučení

První pokus přenést Slepé kuře do Obsidianu (260701) skončil špatně — vymyšlená interpretace a nepropojené soubory, viz [[feedback_zettelkasten_transfer_failure]]. Proto:
- **Nikdy neinterpretovat ani nedomýšlet** — jen mechanicky spárovat existující větu v hotovém textu s existující footnotou/citací.
- **Vždy postupovat po vzorku** (3–5 položek), ukázat výsledek, počkat na zpětnou vazbu — nikdy nezpracovat všechno najednou.
- Lenka opakovaně chtěla vidět **výsledek v Base** (tabulkový pohled), ne jen v souborech — počítej s tím, že po založení pár POZ notes bude chtít `Poznamky.base`.

## Aktuální stav

- [[OUT – Vojtěch seminárka 2025]] — seminárka o obraze sv. Vojtěch na Zelené hoře (KTF UK, 2025). Bibliografie: 34 zdrojů, **všechny už zkatalogizované jako LN** (viz [[Zdroje.base]], sloupec `pouzito_v`).
- Topic notes hotové a fungující: [[Attribution]] (17 zdrojů), [[Reiner, Václav Vavřinec]] (9), [[Brandl, Petr]] (10), [[Halbax, Michael Václav]] (3).
- Text seminárky má **83 očíslovaných footnotů** — to je úkol: z každého vytvořit POZ notu.

## Úkol — založit POZ notes

Pro každou footnotu v seminárce:
1. Přečíst větu/tvrzení v těle textu, ke kterému se footnota váže, a samotnou footnotu (citace, strana, případně doslovný citát v originále).
2. Vytvořit POZ notu v `zettelkasten/poznamky/` s frontmatterem:
   - `zdroj:` odkaz na příslušnou LN (`[[LN – ...]]`)
   - `vystup:` odkaz na `[[OUT – Vojtěch seminárka 2025]]` (seznam — časem může posloužit i jinému výstupu)
   - `strana:` číslo stránky
   - `tvrzeni:` parafráze tvrzení (mechanicky převzatá z těla seminárky, ne nová interpretace)
   - `puvodni_citat:` nepovinně — pokud footnota obsahuje doslovný citát v originále (latinsky, polsky, německy...)
   - `tags:` zkontrolovat proti [[Rejstřík klíčových slov]]
3. Pojmenování souboru — návrh (nebylo s Lenkou finálně odsouhlaseno, potvrdit na vzorku): `POZ – {krátký popis tvrzení}.md`, analogie k `LN – {citekey}.md`.
4. Po vzorku pár POZ notes založit `zettelkasten/Poznamky.base` (filtr na folder `zettelkasten/poznamky`, sloupce podobně jako [[Zdroje.base]]: zdroj, vystup, strana, tags).
5. Pokud se při procházení objeví tag, který se opakuje napříč víc citacemi — zvážit topic notu (viz poučení 260728 v MOC: u dávkového zpracování snadno unikne, že tag zaslouží vlastní stránku — zkontrolovat rovnou, ne až po upozornění).

## Zdrojový text seminárky

Plný text (docx) je na Google Disku: **"Vojtěch seminárka 250723.docx"**, file ID `1gVc0aPzWDXsmYoMjXKsHHDfD1fKAsQMv` (Google Drive MCP nástroj `read_file_content` — vrátí čitelný text včetně všech 83 číslovaných footnotů s přesnými citacemi a stránkami). Stejný odkaz je i v `kde_najit` poli [[OUT – Vojtěch seminárka 2025]].

## Jak začít

Doporučený první krok: přečíst text seminárky, vybrat prvních 3–5 footnotů (ideálně napříč různými zdroji, aby vzorek otestoval formát na různých typech citací — přímý citát vs. parafráze, český vs. cizojazyčný zdroj), vytvořit POZ notes, ukázat Lence a počkat na reakci přesně jako u předchozích kroků (katalogizace zdrojů, topic notes) v tomhle systému.
