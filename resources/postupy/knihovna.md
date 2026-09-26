# Postup: Domácí knihovna a knihovna na Disku

Přesunuto z `CLAUDE.md` 260926 (zkrácení hlavního návodu) — text beze změny. `CLAUDE.md` sem odkazuje; Claude čte tenhle soubor při práci s knihovnou (Notion „📚 Knihovna“, Handy Library, složka „knihy a články“) a při weekly review.

## Architektura (od 260810)

Sjednocený katalog všeho, co Lenka vlastní/má k dispozici ke čtení — fyzické knihy i elektronické zdroje — žije v Notion databázi **„📚 Knihovna"** (`https://app.notion.com/p/1b8aeae60bc68070ba54f3c5af9910dc`).

- **Notion „📚 Knihovna" = trvalý, appce-nezávislý index** nad fyzickými i elektronickými zdroji. Obsahuje jen metadata + krátkou synopsi (pole `Summary`), NE plný obsah LN zápisů — to by duplikovalo riziko, kterému se má vyhnout.
- **Obsidian LN (`zettelkasten/literature/LN/`) = jediný zdroj pravdy pro plný obsah** citovatelných zdrojů. Notion na LN jen odkazuje přes pole `Obsidian Note` (`obsidian://` deep link), nikdy obsah nekopíruje.
- **Handy Library (mobilní appka) = jednorázový sběrný nástroj**, ne systém záznamu. Slouží k fyzickému procházení polic (skenování kódů + ruční zadání u starších knih bez kódu). Po synchronizaci do Notionu její role u daných knih končí.
- **Bulk operace přes nativní CSV import/export v Notionu** (ručně, v Notion UI), nikdy přes Notion API volání po jednom řádku — drahé a pomalé pro stovky položek (viz [[feedback_bulk_notion_edits]]). Claude připraví CSV, Lenka ho sama naimportuje.
- Čtenářský deník (přečteno/hodnocení/dojmy) žije přímo v Notionu (`Read`, `Rating`, `My Review` + volný text v těle stránky) — ne jako samostatný Obsidian projekt.
- [[projects/domaci-knihovna]] = provozní projekt pro pokračující fyzický sběr (next-action).

## Kontroly přírůstků (běží při weekly review)

- **Knihovna "knihy a články" (Google Disk) — kontrola přírůstků:** jeden cílený Drive dotaz `parentId = '1dy9tyD5wg0WFNZzXtxeoOorNlLo9XLk1' and createdTime > '<posledni_kontrola>'` (viz [[knihovna-disk-checklist]]). Nové soubory přidat jako nové řádky do checklistu a zpracovat v dávkách po 5 (postup viz [[HANDOFF – knihovna katalog]]). Po zpracování aktualizovat `posledni_kontrola` na dnešní datum. Nepoužívat plný výpis složky přes `parentId` bez filtru — nespolehlivé stránkování, viz handoff.
  - Tenhle check běží automaticky při weekly review, ale Lenka ho může kdykoli spustit i mimo něj pokynem **"zpracuj knihovnu"** — stejný mechanismus, jen mimo pravidelný cyklus.
- **Domácí knihovna — kontrola přírůstků:** Handy Library nemá s Notionem žádné propojení, nic sama automaticky nesynchronizuje — tohle je ruční kontrola, kterou dělá Claude nad Lenčinou existující zálohou. Zkontrolovat, jestli od posledního syncu přibyly nové LN soubory (`zettelkasten/literature/LN/`) nebo nové knihy v Handy Library (nová automatická/manuální záloha na Google Disk, `G:\Můj disk\HandyLibrary\`, kterou appka/Lenka průběžně pořizuje). Porovnat velikost nejnovějšího `handy_library_auto_backup_*_v2.zip` (nebo `manual_backup`) s poslední zkontrolovanou zálohou — shodná velikost = pravděpodobně nic nového; odlišná = pravděpodobně přibylo. Nehledat po celém Disku, rovnou `ls "G:\Můj disk\HandyLibrary"`. Detekce: LN podle cesty k souboru, fyzické knihy podle Handy Library interního `_id` (NE podle ISBN — starší knihy ISBN nemají). Přesný postup zpracování (CSV diff + obálky) viz [[HANDOFF – domácí knihovna obálky]], sekce "Přírůstky". Datum posledního syncu a počet přidaných položek zapsat do [[projects/domaci-knihovna]] sekce Průběh.
