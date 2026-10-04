# Modul 3 — CODER (podrobné poznámky)

Součást: [[coursera-build-anything-with-ai]] · Zdroj: [Coursera, modul 3](https://www.coursera.org/learn/build-anything-with-ai/home/module/3) · ~2 h, 1 hodnocený úkol
Poznámky jsou zhuštění vlastními slovy (261004), ne přepis.

---

## 1. Úvod do rámce CODER (video)
[Lekce](https://www.coursera.org/learn/build-anything-with-ai/lecture/DAXr1/introduction-to-coder)

CODER je způsob, jak přemýšlet o tom, co AI zadat. Všichni říkají, že „kódování už není potřeba“, ale pořád musíš vyjádřit, co chceš, a to vyžaduje stavební kameny. Tvrzení: ve skutečnosti kóduješ, jen si to neuvědomuješ. Poznáš-li stavební kameny, můžeš je skládat.

| Písmeno | Význam | O co jde |
|---|---|---|
| **C** Compute | počítat | vzít informace, aplikovat operace, získat výsledek (např. celkem utracené v kategorii z účtenek) |
| **O** Organize | uspořádat | dát informacím strukturu, přeskupit je, aby byly užitečné (kategorie, anomálie) |
| **D** Display | zobrazit | jak informace vidíš a pracuješ s nimi; důraz na vizuální podobu místo textových seznamů |
| **E** Engineer | stavět systémy | automatizace, workflow, vlastní software; **až nakonec**, protože skládá předchozí |
| **R** Reason | uvažovat | využít inteligenci AI; děje se pořád, ale zvlášť označeno, protože přináší silnější aplikace |

---

## 2. Kurz Engineer (čtení)
[Lekce](https://www.coursera.org/learn/build-anything-with-ai/supplement/4zvAF/the-engineer-course)

- CODER nekončí „E“ náhodou: **Engineer je až na konci a má vlastní kurz** [Build Apps with AI](https://www.coursera.org/learn/build-apps-with-ai).
- C, O, D, R zvládne téměř kdokoli dobrým zadáním a správnými soubory, bez instalace či konfigurace. Stavění aplikací přidává složitost: struktura systému, testování, jak vydrží růst, co když se něco pokazí.
- Kurz Engineer pokrývá: navrhnout aplikaci před stavbou, testovat, iterovat při změně požadavků, poznat, kdy začít znovu, a vědět, kam sama nesahat.
- Tento kurz pokrývá všechno z CODER kromě plné hloubky E; modul „Engineer Systems“ tu je jako úvod.

---

## 3. C — Compute 1: batch operace (video)
[Lekce](https://www.coursera.org/learn/build-anything-with-ai/lecture/cTLMA/c-compute-1-batch-operation)

**Struktura výpočtu:** vstup → logika → výstup. V zadání popisuješ, co AI vezme, co s tím udělat a jaký výsledek chceš.

**Batch operace = „pro každou z těchto věcí udělej tohle“.** Typické: pro každý řádek tabulky, pro každou sekci zprávy, pro každý soubor ve složce, pro každou fotku.

**Ukázka:** hromada výpisů z kreditních karet. Zadání: projdi všechny výpisy a najdi každou opakující se platbu nebo předplatné; u každé uveď název, částku, počet výskytů, první a poslední výpis, kde se objevila, celkově zaplaceno a odhad ročních nákladů. Klasickým programováním by to bylo velmi bolestné, protože data jsou nepřehledná. Ve vzoru batch je to jednoduché: vstup = složka výpisů; logika = pro každý výpis vytáhni tato data; výpočet = součet a roční odhad; výstup = tabulka.

**Příklady vzorců:** „pro každý řádek tabulky urči typ výdaje z těchto tříd“; „pro každý řádek rozhodni, jestli je povolený podle pravidel“.

---

## 4. Příklad: batch operace, která tak nevypadá (video)
[Lekce](https://www.coursera.org/learn/build-anything-with-ai/lecture/af3TB/c-batch-operation-example)

Příklad: napsat hodnocení zaměstnankyně. Složka s poznámkami z jednání jeden na jednoho, projektové dokumenty, e-maily se zpětnou vazbou od kolegů a tabulka s cíli. Vyplň šablonu hodnocení a u každého bodu uveď přímé citace, které ho podpoří. Je to batch operace dvěma způsoby: „pro každou sekci šablony najdi podpůrné citace“ nebo „pro každý dokument najdi citace a vlož je do správné sekce“.

**Poučení:** tohle je také výpočet. Dřív by se takový program napsat nedal (jak poznat, které citace podpoří hodnocení?). Velké jazykové modely umožnily výpočty, které byly dříve nemožné. Stejné věci můžeš vyjádřit slovy různě, ale princip zůstává; poznej vzor pod povrchem.

---

## 5. Výsledek vs. metoda (video)
[Lekce](https://www.coursera.org/learn/build-anything-with-ai/lecture/2tb4W/outcome-vs-method-prompting)

**Metoda:** popisuješ, **jak** to udělat (kroky, data, výpočet). Hodí se, když už proces znáš a chceš, aby ho AI pokaždé stejně dodržela. Příklad: „najdi každé opakující se předplatné a u každého uveď název, částku, počet, první a poslední výskyt, celkem a roční odhad.“

**Výsledek:** popisuješ, **kam** chceš dojít; metodu vymyslí AI. Hodí se, když cíl znáš (jak vypadá dobré řešení), ale nevíš cestu nebo věříš, že AI najde lepší, nebo jsi zvědavá. Příklad: „Pomoz mi pochopit, na co skutečně utrácím peníze z těchto výpisů.“

**Pozor:** u výsledku je nutné být výslovná, jak vypadá cíl; čím víc detailů o cíli, tím lépe. Obojí lze v jednom zadání míchat (části metodou, části výsledkem).

---

## 6. C — Compute: Map/Reduce (video)
[Lekce](https://www.coursera.org/learn/build-anything-with-ai/lecture/bfIce/c-compute-map-reduce)

**Map/Reduce** je úprava batch operace: **map** = z každé položky něco vytáhnout; **reduce** = všechno vytažené sloučit a zhustit do jednoho výstupu (nebo malého počtu).

**Příklady:**
- Přečti každý výpis ve složce, vytáhni transakce (datum, obchodník, částka, kategorie) a sluč vše do jedné tabulky seřazené podle data. Čtení výpisů = map; sestavení tabulky = reduce.
- Z každého životopisu vytáhni jméno, praxi, hlavní jazyky, posledního zaměstnavatele a dej to do tabulky.
- Výsledkový styl: vytáhni výdaje z každého výpisu, sluč je a pomoz mi pochopit, kam peníze skutečně jdou (reduce vede k vysvětlení, ne jen k tabulce).
- Čtvrtletní zprávy / týdenní zprávy týmu: z každé vytáhni úkoly a překážky a sluč je do měsíční zprávy.

Vzor uvidíš všude, hlavně když dáš AI přístup k souborům. Nemusí jít jen o čísla, ale i o stav projektu, plánu nebo cesty.

---

## 7. Cvičení: Map/Reduce — postav něco silného z mnoha souborů (čtení)
[Lekce](https://www.coursera.org/learn/build-anything-with-ai/supplement/B3tjM/exercise-map-reduce-build-something-powerful-from-many-files)

**Vyber jednu variantu** (tam, kde už soubory máš nebo kde bude výstup nejužitečnější), případně vymysli vlastní.

**A — Finanční dashboard.** Vstup: výpisy z banky, exporty z karet, fotky účtenek (PDF, CSV, obrázky; směs formátů je v pořádku). Map: z každého souboru dodavatel, částka, datum, kategorie. Reduce: dashboard se skutečnými vzorci utrácení, auditem předplatných, měsíčními trendy, hlavními kategoriemi a konkrétními úsporami.

**B — Fotoinventář s „očima AI“.** Vstup: složka fotek (pro první pokus 20–200). Ty řídíš, **co z každé fotky vytáhnout** (kdo/co je hlavním motivem, prostředí, nálada, až 5 štítků, jednovětý popis; pro rodinné fotky kdo, věk dětí, příležitost, rok; pro inventář domácnosti místnost, předměty, hodnotová kategorie, stav; pro cestování místo, aktivita, denní doba). Reduce: prohledávatelný a filtrovatelný HTML katalog, galerie karet, katalog podle témat nebo místa, časová osa. Verze 2: pro velké kolekce začít s 20–50 fotkami.

**C — Syntéza dokumentů.** Vstup: nezávislé dokumenty ke stejnému tématu (zápisy z jednání, články, aktualizace projektu, e-maily). Map: z každého klíčové body, rozhodnutí, poznatky, perspektivu zdroje, úkoly nebo otevřené otázky. Reduce: jedna zpráva, executive summary, matice shod a rozporů, znalostní báze podle témat nebo seznam nezodpovězeného.

**Společná kostra zadání (verze 1):**
1. Analyzuj každý soubor ve složce. **Než začneš, řekni**: kolik souborů jsi našla, jaké typy, jaký rozsah dat.
2. Z každého souboru vytáhni: [pole 1], [pole 2], [pole 3], [další důležitá pole].
3. Po zpracování všeho sluč vytažené do: [popis výstupu].
4. Uspořádej informace nejužitečnějším způsobem; klidně přidej grafy, tabulky, vyhledávání, filtry, shrnutí, doporučení.
5. Ulož jako HTML (pokud jiný formát nedává větší smysl) a otevři v prohlížeči.
Verze 2: tentýž text, na začátku „přiložila jsem zip“, na konci „jeden HTML soubor ke stažení“.

**Před psaním zadání rozhodni dvě věci:** (1) co z každého souboru vytáhnout; (2) co z toho sestavit.

**Doladění po prvním výsledku (příklady):** zvýraznit červeně předplatná nad X měsíčně a přidat meziroční srovnání; u fotek zpřesnit lens („znovu prozkoumej fotky, kde je popis kratší než 15 slov“, „přidej, co nepoznáváš“, „nejdůležitější je pro mě nálada, udělej z ní hlavní štítek“); u dokumentů rozšířit sekci rozporů s konkrétními citacemi a přidat „co musím rozhodnout dál“.

**Co se tím učíš:** shromáždíš kolekci, určíš, co se z každé položky vytahuje, a sloučíš to do výsledku. Finanční dashboard odhalí to, co bylo neviditelné ve dvanácti PDF; inventář fotek zpřístupní to, co nešlo hledat; syntéza vyčistí to, co bylo rozptýlené.

---

## 8. Hodnocený úkol — Your Map / Reduce Solution
[Úkol](https://www.coursera.org/learn/build-anything-with-ai/peer/LId0k/your-map-reduce-solution) — odevzdání výsledku cvičení č. 7.

---

## 9. Klíčový slovník (čtení)
[Lekce](https://www.coursera.org/learn/build-anything-with-ai/supplement/IOaGP/key-vocabulary-for-your-prompts)

- **Batch:** „pro každý X… udělej Y“ (pro každý soubor vytáhni dodavatele a celkovou částku; pro každý řádek ve stavu „čeká“ napiš koncept připomínky; pro každou sekci zprávy napiš jednovětné shrnutí); „pro každý z těchto… vyplň šablonu“ (pro každý životopis vyplň hodnoticí šablonu).
- **Map/Reduce:** „přečti každý… vytáhni… a slouč do jednoho“ (přečti každou fakturu, vytáhni částku k úhradě, slož tabulku; přečti každý zápis, vytáhni úkoly, slož jeden seznam).
- **Výsledek:** „chci skončit s…“; „výsledek má být…“; „dej mi… abych mohla…“ (např. „dej mi seřazený seznam kandidátů, abych mohla tento týden rozhodnout“).

---

## 10. Souhrn vzorců (čtení)
[Lekce](https://www.coursera.org/learn/build-anything-with-ai/supplement/eZLA4/summary-of-patterns)

Tři vzory z písmene C:
1. **Batch:** stejná akce na každý prvek kolekce (přejmenovat 200 souborů, shrnout sekce zprávy, vytáhnout hlavní zjištění z odborných článků, vyplnit hodnocení pro každou přihlášku). Hodnota roste s velikostí kolekce: definuješ úkol jednou, AI ho opakuje.
2. **Map/Reduce:** batch + konsolidace. Z 12 faktur částku k úhradě → platební tabulka; z 30 životopisů roky praxe → srovnávací tabulka; z 6 nabídek celková cena → souhrn pro rozhodnutí.
3. **Outcome prompting:** popsat cíl, ne cestu. Dobře: „chci jednu tabulku, jeden řádek na fakturu.“ Špatně: „otevři první fakturu, najdi dodavatele, dej do sloupce A…“ Metoda je strop daný tím, co už umíš; výsledek nechává AI najít lepší cestu.

**Dohromady:** „pro každou fakturu [batch] vytáhni dodavatele, datum a částku [map] a slouč do jedné tabulky podle splatnosti [reduce] — chci schválit platby jedním sezením [výsledek].“

---

## 11. Klíčové koncepty (čtení)
[Lekce](https://www.coursera.org/learn/build-anything-with-ai/supplement/uUTOp/key-concepts)

- **Výpočet škáluje, lidská práce ne.** Člověk zpracovává 50 faktur 50× déle než jednu; instrukce „pro každou“ se definuje jednou a opakuje bez nákladů. Hodnota instrukce roste s velikostí hromady. Odemknout to znamená myslet v kolekcích, ne po jedné věci.
- **Kolekce není hromada, je to jednotka výpočtu.** Ne 50 úkolů, ale jeden úkol s rozsahem 50. „Pro každý“ označuje změnu myšlení.
- **Popsat cíl může být silnější než popsat cestu.** Uvěznění v metodě = omezení na to, co umíš. Výsledková zadání bývají kratší a jasnější a zvládnou i okrajové případy.
- **Extrakce a konsolidace jsou dva různé kroky.** Map = z mnoha věcí zase mnoho menších; reduce = z mnoha extrakcí jedna věc. Někdy stačí jen map (výstup pro každý dokument zvlášť).
- **CODER = pět lupy:** Compute (jak zpracovat ve velkém), Organize (jak strukturovat pro hledání), Display (jak zviditelnit), Engineer (jak stavět systémy), Reason (jak lépe přemýšlet o rozhodnutích). Cíl není zapamatovat akronym, ale poznat: u hromady práce se zeptat, která lupa sedí.
