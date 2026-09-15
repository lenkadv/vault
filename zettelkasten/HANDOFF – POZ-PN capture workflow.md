# HANDOFF – POZ/PN capture workflow (260805)

Tenhle soubor dokumentuje nejen pravidla (ta jsou v [[MOC – Zettelkasten]]), ale i **myšlenkový postup, jak jsme se k nim dostaly** — na výslovné přání Lenky, protože tahle diskuze se už jednou ztratila při pádu aplikace (viz níž) a nechce si to nechat stát se znovu. Pokud čteš tohle v novém vlákně po nějaké havárii: přečti celý soubor, pak [[MOC – Zettelkasten]] sekce o POZ/PN.

## Původ — a proč se to muselo řešit podruhé

260728 Lenka s Claudem probírala YouTube video **"Obsidian Note-Taking System for Academics"** od kanálu **Effortless Academic** (Source-Topic-Argument metoda) a rozhodla se podle něj přestavět zettelkasten. To vlákno bylo přerušené — Claude v té době opakovaně crashoval (viz [[feedback_arthive_crash]], separátní incident 260731 s WebFetch na arthive.com, který vynutil několik reinstalací appky). Rozjednaná diskuze o konkrétní aplikaci videa na Lenčinu praxi se ztratila, protože session historie appky sahá jen pár dní zpátky — 260728 vlákno samotné se zpětně nedalo dohledat (260805 ověřeno: nástroj na historii sezení jde jen do 260731). Zůstala po něm jen stručná poznámka v `daily/260728.md` a hotová implementace (LN/OUT/topics/POZ vrstvy), ale ne odůvodnění konkrétních voleb.

260805 Lenka požádala o rekapitulaci stavu, znovu přinesla transkript videa a prošly jsme tenhle rozhovor znovu od začátku.

## Problém, který Lenka pojmenovala

V klasickém Zettelkasten (a v původním návrhu MOC) jsou POZ (atomická citace, opřená o autoritu zdroje) a PN (permanent note, vlastní myšlenka) oddělené typy. Lenka namítla: při čtení **neví předem**, jestli se z konkrétní poznámky stane přesná citace, citace+komentář, nebo odrazový můstek k volné úvaze. Rozhodovat o tom hned při zápisu jí přišlo nepraktické — a odporovalo to i jejímu skutečnému postupu při psaní [[OUT – Vojtěch seminárka 2025]] (a předtím Slepému kuřeti v Notion): atomické poznámky vázané na zdroj, ne dvě oddělené kategorie od začátku.

## Co video skutečně říká (přesnější čtení, než napoprvé)

Video má taky tři typy (source / topic / argument), ale klíčové zjištění je **kdy** argument notes vznikají: **nikdy ne současně se čtením**. V demu autor čte, zvýrazní pasáž, rovnou píše atomický claim do topic noty (bez rozhodování). Argument nota vzniká později, asynchronně, když si při procházení propojené sítě všimne vzoru napříč tématy (jeho příklad: fossil fuels → climate change → melting ice → penguins → nová otázka). Doslova: *"idea generation is a side effect of navigating the network"*, ne rituál u čtecího stolu.

To rozpustilo zdánlivý rozpor: Lenčina intuice "nerozlišovat u vzniku" je správná — řešení není zrušit PN, ale nechat PN vznikat pozdě a vzácně, ne u zrodu poznámky.

## Na čem jsme se dohodly (260805)

**Čtecí capture:** `## Poznámky` sekce v LN je Lenčina volná čtecí zóna. Píše tam za běhu čtení — citát, parafráze, vlastní komentář, cokoli, se stránkou — bez rozhodování POZ/PN a bez přepínání mezi soubory. Přímý důsledek zkušenosti se Slepým kuřetem v Notion, kde bylo neustálé zakládání/provazování jednotlivých záznamů za běhu čtení extrémně náročné.

**Zpracování (dávkově, na vyžádání, ne živě):** Claude z `## Poznámky` mechanicky vytáhne POZ notes (`zdroj`, `strana`, `pouziti`, `tvrzeni`). Pokud narazí na syntetizující větu, která není podložená jednou citací (Lenčino vlastní propojení víc zdrojů), nabídne ji jako **kandidáta** na PN — nezaloží ji sám bez potvrzení.

**Kdy vzniká PN — dva vstupní body:**
1. Mechanicky, souběžně s POZ extrakcí při reverse-engineeringu hotové práce.
2. Vzácně, živě — u aktivní práce (typicky Slepé kuře/bakalářka), když se během čtení/psaní skutečně vykrystalizuje myšlenka spojující víc zdrojů.

**Rozhodnuto NEDĚLAT:**
- **Nezpětně tvořit POZ pro 5 starých PN** (z 260606–07, před celou přestavbou) — všechny odkazují jen na LN, ne na POZ, a žádná POZ pro jejich zdroje (Teresa de Jesús, More, Blair) neexistuje. Fabrikovat přesnou citaci/stránku zpětně z paměti by porušilo [[feedback_zettelkasten_transfer_failure]] (nikdy neinterpretovat/nedomýšlet u archivního materiálu). Staré PN zůstávají na starém formátu (`## Zdroje` → LN) jako legacy.
- **Nezpětně vytěžovat obě hotové seminárky na PN** — čekáme málo/nic užitečného, protože akademický text má skoro každé tvrzení podložené citací. Skutečná hodnota PN je dopředná (aktivní práce), ne archeologie hotového textu.

## ⚠️ Korekce k příkladu, co jsem použil

Při vysvětlování jsem jako ukázku "dobré PN" použil [[260607-1157 Internalizovaný útlak — jak číst náboženské autobiografie]]. Lenka opravila: **tuhle notu nenapsala ona, napsal ji Claude** v dřívější konverzaci (a tohle přesně už bylo řešeno jednou předtím). Navíc formálně neodpovídá pravidlu "PN = jedno tvrzení, ne shrnutí" — je to strukturovaná vícebodá esej, ne atomická věta. **Nepoužívat ji příště jako normativní vzor PN bez týhle výhrady.**

## Schema změny provedené 260805

- Všech 144 POZ notes migrováno z `vystup`+`footnote` (ploché pole) na `pouziti:` (list párů `vystup`+`footnote`) — umožňuje jednu POZ citovat ve víc pracích a existovat "nepoužitou" (`pouziti: []`), dřív než víš, k čemu ji použiješ.
- Nový `typ: podcast/přednáška/rozhovor` v kontrolovaném slovníku LN — časová značka jako lokátor (`Autor rok, HH:MM:SS`), stejná logika jako `nepag.` u e-booku bez stránkování. Zdokumentováno v [[resources/zotero-word-workflow]].
- PN šablona: `## Zdroje` (LN) → `## Vychází z` (POZ) + nová `## Podnět` sekce pro necitovatelné podněty (podcast bez formální LN, rozhovor, e-mail).
- [[Poznamky.base]] přepnutá na `pouziti` sloupec — **needěláno**: ověřit v Obsidianu, jak se vnořený list párů reálně vykresluje v tabulce (riziko, že to nebude tak čitelné jako plochý string).

## Status

Domluveno, ale **neověřeno v praxi** — je to živý experiment, ne hotový, otestovaný systém. Vyhodnotit, až Lenka poprvé skutečně použije `## Poznámky` capture → dávkové zpracování na reálném čtení, ideálně příští sezení na Slepém kuři. Tam taky poprvé uvidíme, jak živě vzniká PN podle bodu 2 výše.
