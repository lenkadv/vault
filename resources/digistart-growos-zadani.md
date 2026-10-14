# DigiStart: zadání pro založení byznysu v GrowOS (261014)

Čte nové vlákno otevřené ve složce `G:\Můj disk\vault\GrowOS`. Cíl: založit třetí byznys `digistart` podle GrowOS 2.0 a provést Lenku nastavením krok za krokem. Plán a rozhodnutí: [[digistart-kampan-plan]], projekt: [[digistart]]. Vault leží o úroveň výš (`..\`), soubory se čtou odtud.

## Co udělat

1. Přečíst `AGENTS.md` v GrowOS a spustit `growos-setup` pro nový byznys `digistart`. Lenku provádět po jedné otázce, ne vše najednou. Nic nevymýšlet: chybějící věci jako `[PLACEHOLDER: …]`.
2. Do `brain/` zapsat jen ověřená fakta z níže uvedených zdrojů. Nepřebírat nic z `lcenglish` ani `tadylenka` (pravidlo oddělených dat).
3. Do `setup.md` zapsat kanály jen s ID, která Lenka potvrdí. Pro DigiStart zatím žádná ID neexistují (FB stránka, pixel, reklamní účet vznikají až v plánu; **neodvozovat je z lcenglish**).
4. Po založení: `growos-doctor`, výsledek říct Lence.

## Známá fakta (rozhodnuto Lenkou 261014)

- Název: **DigiStart**. Lektorky: Lenka Dvořáková a Štěpánka Uličná. Prodává, fakturuje a platí reklamu **GNOSTIKA** (záloha: Lenčin systém přes FAPI, rozhodne se do 21. 10.).
- Nabídka: **živě stavěný pilot**, 4 setkání po týdnu (páté volitelné a konzultační, později), první dvě setkání pevná, další podle potřeb účastnic. **Termín začátku je zatím OTEVŘENÝ** (viz plán §0a): kurz musí skončit v polovině prosince, čtvrtek nejde (Lenka má školu do 19:00), lepší je středa; Lenka se Štěpánkou jsou v Římě od pátku 13. 11. do středy 18. 11. a Lenka odtamtud nemůže vysílat (nemá stolní počítač). Varianty: start st 11. 11., nebo st 25. 11.; záložně vede úvodní setkání sama Štěpánka. Do textů stránky, reklam ani e-mailů proto zatím nepsat konkrétní datum začátku, dát `[PLACEHOLDER: datum prvního setkání]`. **Pilotní cena 15 000 Kč.** Minimum 10 účastnic, horní hranice 20 (pružně). Varianta B: hotový AI systém v Claudu (placený plán nutný pro nahrání dovedností). Úvodní konzultace (vede Štěpánka) je **před** kurzem a není jeho součástí.
- Cesta zájemkyně: reklama na Facebooku → stránka → rezervace konzultace, nebo koupit rovnou.
- Publikum: solo podnikatelky a živnostnice (lektorky, koučky, poradkyně), které už platily za web a texty a zklamalo je to; AI zkusily jako chytřejší vyhledávač; chtějí lektorky své generace bez žargonu. Zdroj: `projects\digistart.md`, `resources\digistart-pilot-osnova.md`.
- Teplé kontakty: žádné, jen Štěpánčiny známé.
- Reklama: věk čtenářky se v textu nezmiňuje (zásady Meta); stojí na osobnostech obou lektorek.

## Zdroje k přečtení (vault)

- `projects\digistart.md`, `resources\digistart-pilot-osnova.md`, `resources\digistart-kampan-plan.md`
- Zpětná vazba Štěpánky: `resources\digistart-balicek-stepanka\05-zpetna-vazba-zkusebni-pruchod-261011.md` (**citovat jen se souhlasem Štěpánky se jménem**, jinak anonymně)
- Hlasy: `resources\postupy\hlasy.md` (Lenčin profil); Štěpánčin profil je v balíčku `resources\digistart-balicek-stepanka\`
- Swipe: `resources\digistart-swipe.md`; postup stránek: `resources\postupy\prodejni-stranky.md`, `resources\navod-prodejni-stranka-s-ai.md`
- Pravidla textu: o účastnicích generické femininum („účastnice“), zdůrazňovat, co umí, ne co dostane; hook, ne „hák“; nevymýšlet fakta, čísla ani reference.

## Vztah GrowOS a vaultu (platí podle CLAUDE.md vaultu)

- **Strategie a kroky (`#next-action`)** žijí ve vaultu v `projects\digistart.md`. **Konkrétní výroba** (stránka, reklamy, e-maily, příspěvky) je work item v `digistart\work\` a jeho fronta ve stavu draft → review → approved → published.
- Kroky výroby se do vault GTD nepíšou. Do projektu patří jen úkoly typu „projít ve frontě GrowOS stránku ve stavu review“.
- Po každém zveřejnění (stránka živě, reklama založena) napsat do `projects\digistart.md` do sekce Aktuální stav jednu větu a posunout `#next-action` na další krok.
- Až `campaign-plan` vytvoří seznam podkladů kampaně, odkázat na něj z `resources\digistart-kampan-plan.md` a nepsat ho znovu do projektu.

## Pozor

- Neznámé a nezapsané: ceny jiných variant, doména, ID Meta stránky/pixelu/reklamního účtu, provozovatel a podmínky na stránce, strop útraty za reklamu.
- Meta účty LCEnglish (ID v paměti `reference_meta_ads_accounts_connector`) jsou **jiný byznys**, nepoužívat jako výchozí.
- Při zveřejnění vždy safe-state (koncept, pozastavená reklama), zapíná Lenka.
