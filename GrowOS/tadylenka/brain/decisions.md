# Decisions

_Nejnovější nahoře. Přeneseno z 0.1 (brand.md, howto-publishing, HANDOFF audit, lessons) při migraci na GrowOS 2.0._

---

## 2026-09-09
Strategický rozhovor o tadylence — nastavena páteř publikování.

- **Úspěch se neměří dosahem ani počtem odběratelů, ale pravidelností.** Na dosah nemá Lenka páku (algoritmus), a hodnocení podle dosahu je přesně to, co otrávilo dřívější práci na Instagramu (hodně času, malý výnos, dělané „kvůli dosahu"). Cíl je proces: dělat to pravidelně a při ohlédnutí vidět, že to dává smysl.
- **Páteř = jeden Substack článek á 14 dní ve třech rotujících rubrikách:** Ženy v obraze / Co vidíš? Tak vidíš! (jako text, ne carousel) / Všichni svatí (ikonografie světců). Rotace dokola, každá rubrika ~1× za 6 týdnů. 800–1200 slov. Den vydání **pátek**.
- **Mechanismus jasnosti (dořešená otevřená otázka z 260804):** funguje jako u Art for English — další krok je vždy předem daný. Runway (seřazená fronta dílů s daty) v [[projects/tadylenka-publishing]], banka `library/content-bank/` filtrovaná přes `Content Bank.base` podle `rubrika`. Lenka si vybírá kandidáty z banky.
- **Úklid content-bank (260909):** `Content Bank.base` byla od migrace rozbitá (špatná cesta) — opraveno. 154 souborů znormalizováno: datum na YYMMDD, datum strhnuté z názvů. Stavy sjednoceny na **GrowOS default `fresh | used | retired`** (`retired` slouží i jako someday-maybe). Kandidatura na runway není stav — je to zápis do runway tabulky.
  - **Banka je jen myšlenky a zdroje — žádná osa formátu.** Pole `tagy_platforma` (NL/IG/NOTES/VID) **smazáno** ze všech souborů. Jestli z námětu bude článek, carousel nebo Note se rozhoduje až při výrobě.
  - **`rubrika` = jen 3 rotující** (`zeny-v-obraze`, `co-vidis`, `vsichni-svati`) + `jine` (nezapadá do rubriky — pool) + `mimo` (není námět: kontakty, banka titulků, definice sérií → `retired`). Symboly/atributy/motivy napříč díly („tajný jazyk") patří pod `co-vidis`, s `temata` tagem `tajny-jazyk`.
  - Rozdělení: zeny-v-obraze 26 · co-vidis 34 · vsichni-svati 6 · jine 66 · mimo 22. Schéma v `library/content-bank/_SCHEMA.md`.
- **Runway se plní dávkově dopředu, ne jako týdenní rozhodování.** Kandidáti na několik měsíců dopředu (jako curriculum u Art for English). Do runway se dá kdykoli dynamicky vstoupit a přehodnotit (dozrálé téma, výstava) — ale výběr dalšího dílu NENÍ pravidelný bod weekly review. Weekly review jen zkontroluje, že runway není prázdná.
- **IG carousel a Notes NEJSOU bonus — jsou pozdější fáze.** Nejdřív zajet tenhle jeden formát a znát jeho reálný čas, pak se při sprint review zváží přidání dalšího rozměru (analogicky k tomu, jak Lenka teď uvažuje o rozšíření Art for English).
- **Zdroj námětů zahrnuje i odbornou práci** — seminárky (renesanční Male Gaze → Ženy v obraze), archivní výzkum k Slepému kuřeti, budoucí odborné texty. Přibývá průběžně.
- Stará doktrína „Substack článek **nebo** IG carousel na střídačku á 14 dní" tímto padá.
- Otevřené k vyhodnocení po prvních dvou dílech: jestli á 14 dní není moc → případně á 3 týdny.

## 2026-09-06
Migrace tadylenka z GrowOS 0.1 na 2.0. Omnibus `brand.md` rozdělen do `brain/` souborů. `content-bank/` (~155 souborů) → `library/content-bank/`. YouTube swipe a plánovací materiály → `library/`. Publikované články a recenze výstav → `brain/samples/`.

## 2026-08-04 (audit)
Velký audit stavu tadylenka. Lenčina formulace: „naprosto nepřehledná změť různých záznamů". Rozhodnuto:
- **Kadence = cílové tempo za kvartál, ne termín na položku.** Substack článek / IG carousel střídavě á 14 dní, Notes 3× týdně — plní se dávkovými content sprinty do volných oken. tadylenka nemá tvrdý vnější deadline, takže při nárazu jiné práce ustupuje první.
- **Formát je IG carousel, ne Reel.** Reel byl historický pozůstatek v dokumentaci. Karusely generují víc saves a sdílení.
- **Pojmenování běhů bez písmenek.** Žádné „Cyklus A/B/C/D" — každý běh má popisný název + datum („IG carousel — Bastille Day (260713)").
- **content-ideas.md (869 řádků) nahrazeno strukturou `content-bank/`** — jednotlivé soubory s frontmatter properties + tabulkový pohled `Content Bank.base`. Umožňuje hledat synergie mezi nápady.
- **Otevřená otázka:** co tadylenka za rok je, jaká priorita vůči ostatním projektům, má se posouvat k příjmu. → **Vyřešeno 260909** (viz záznam nahoře): úspěch = pravidelnost ne dosah, bez tlaku na příjem, páteř = 3 rotující rubriky á 14 dní. Handoff `handoff-audit-260804.md` uzavřen a přesunut mimo vault.

## 2026-03-27
Spuštění newsletteru „Dějiny umění: V nejlepších letech" na Substacku. Cíl: komunita (čtenáři, kteří se vracejí, komentují, sdílejí), ne primárně růst čísla odběratelů. Placené předplatné vypnuté.

## průběžně
Substack Notes vznikají **z fronty, ne ze spontánního zachytávání.** Claude přidává kandidáty do content-banku při zavírání sezení.
