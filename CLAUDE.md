# Vault — Instrukce pro Claude Code

Tento vault je osobní systém Lenky pro správu života, studia a projektů.

## Výpočet relativních dat — povinný mezikrok

Kdykoli v odpovědi použiji relativní čas (zítra, pozítří, za X dní, v pondělí apod.), musím nejdřív napsat mezikrok:
> Dnes je [datum ze systému]. Cíl je [datum]. Rozdíl = X dní.

Teprve pak napsat výsledek. Bez tohoto mezikroku nesmím relativní datum uvést.

## Struktura

```
inbox/omnibus.md   ← zachycené věci k zpracování
areas/             ← trvalé oblasti života
projects/          ← časově ohraničené věci s koncem
archive/           ← hotové projekty
daily/             ← denní záznamy (starší v daily/YYYY-MM/)
weekly-reviews/ · quarterly-reviews/ · decisions/ · Brain Dumps/  ← výstupy revizí a skillů
GrowOS/            ← marketing & content systém (GrowOS 2.0 — charta AGENTS.md)

zettelkasten/      ← literature/ (LN), poznamky/ (POZ), permanent/ (PN), topics/, vystupy/ (OUT)

gtd/
   next-actions.md ← konkrétní další kroky podle kontextu
   waiting-for.md  ← čekám od ostatních
   someday-maybe.md← nápady na později

assets/            ← obrázky a přílohy (sem míří drag & drop)
resources/         ← referenční materiály: MOC, clippings, lookup tabulky, zachycené metody — věci k použití, ne ke zpracování
resources/postupy/ ← detailní postupy, které Claude čte podle potřeby (viz „Postupy“ níže)
```

## Postupy — číst při práci na daném tématu

Detailní workflow nejsou v tomhle souboru, aby se nenačítaly v každé seanci. **Před prací na tématu si příslušný soubor přečtu** — pravidla v něm platí stejně, jako by byla tady.

| Pracuji na… | Přečtu |
|---|---|
| zettelkasten/, LN/POZ/PN notes, Zotero, akademický text, zpracování inbox/ na noty | `resources/postupy/zettelkasten.md` + [[MOC – Zettelkasten]] (autoritativní) |
| Domácí knihovna, Notion „📚 Knihovna“, Handy Library, knihovna „knihy a články“ na Disku | `resources/postupy/knihovna.md` |
| GrowOS, lcenglish/tadylenka výstupy, publishing projekty, `/drip`, `/metricool` | `resources/postupy/growos.md` (+ `GrowOS/AGENTS.md`) |
| Git, `.gitignore`, commit/push | `resources/postupy/git-zaloha.md` |
| Svodka z e-mailů (newslettery, nevytříděná pošta), `/daily-plan` krok svodka | `resources/postupy/svodka.md` |
| Prodejní / landing stránky — tvorba, úprava nebo hodnocení (svoje, klientské, konkurence), nabídka, cena, garance, tlačítka | `resources/postupy/prodejni-stranky.md` |
| Psaní textu za Lenku (e-mail, zpráva, článek, seminárka, newsletter, prodejní text), úprava jejích textů, hlasové profily | `resources/postupy/hlasy.md` (profil před psaním; když Lenka můj text přepíše → rozdíl hned zapsat jako poučení; **u pracovního mailu vždy důrazně upozornit, z jaké adresy odeslat**, ne z Gmailu: oddíl 3) |
| Přehledné dějiny umění 19.–20. st. (dr. Pech): příprava na zápočet/zkoušku, Anki balíčky z prezentací, chronologie, web pro spolužáky, „zpracuj přednášku“ | `resources/postupy/prehledovky-pech.md` |
| Metodologie 2 (KTF): zkouška (písemná individuální, doc. Kubík), Anki karty z přednášek, trénink nanečisto, „zpracuj přednášku“ u Metodologie, státnice z metodologie (témata III. 1–20 jako kostra) | `resources/postupy/metodologie2.md` |
| Přehledné dějiny antického a středověkého umění (doc. Kubík, absolvováno): zápisky po tématech z nahrávek více ročníků, ke státnicím | `resources/postupy/prehledovka-kubik.md` (notebook „Přehledovka Kubík – všechny nahrávky“, bez Anki) |
| **Zpracování přednášky u kteréhokoli předmětu KTF** („zpracuj přednášku“, nová nahrávka z Easy Voice Recorderu, jednotné zápisky v Google Docs, Notebook, kontrola údajů, úprava starších zápisků z Notebooku) | `resources/postupy/zpracuj-prednasku.md` (hlavní postup; Anki jen u Přehledovek a Metodologie 2 → jejich postupy výše) |
| Tabule úkolů (kdo co vede: Claude / spolu / Lenka), odškrtávání mimo Obsidian, synchronizace s vaultem, denní plán bez MIT | `resources/postupy/tabule.md` |
| Přiznání k DPH (identifikovaná osoba), výpisy Air Bank, XML pro Moje daně | `resources/postupy/dph.md` (přiznává se jen Anthropic; ostatní zahraniční služby jen vypsat, rozhoduje Lenka) |
| Přepisy z Voicenotes (voicenotes.com), stažení přepisu nahrávky nebo videa, „stáhni z Voicenotes“ | `resources/postupy/voicenotes.md` (konektor, jinak Chrome ve vlastní kartě; nic v aplikaci neměnit) |
| Údržba počítače (disk C:, Stažené, nainstalované programy, duplicity s Diskem), měsíční a čtvrtletní kontrola, instalace programu na zkoušku | `resources/postupy/udrzba-pocitace.md` (vyzkoušená aplikace = úkol „nechat/odinstalovat“ za 14 dní; mazat finálně jen Lenka) |
| Databanka AI (všechny AI nástroje a materiály + jejich hodnocení: nainstalované skilly, konektory, tutoriály, prompty), nový zdroj nebo nástroj | `resources/postupy/databanka.md` |

**Databanka AI** (`resources/databanka/`, tabulka `Databanka.base`, pro Lenku [[Průvodce Databankou]]): jediné místo s hodnocením všech AI nástrojů (stav, verdikt, poznámky z použití). Na začátku většího úkolu ji prohledám podle tématu a když něco sedí, řeknu to jednou větou. Detaily a spouštěče v postupu výše.

## Areas

tadylenka, lcenglish, health, finances-admin, family, japanese, slepekure, studies, domacnost, ai-nastroje, deutsch

Každý soubor v `areas/` má pevnou strukturu — jen tři věci:
1. **Definice** — jedna věta, co oblast je
2. **Aktivní projekty** — wiki-linky na projekty v `projects/`
3. **Klíčové trvalé odkazy** — nástroje, účty, kontakty specifické pro oblast

Do areas/ **nepatří**: tasky, stav projektů, postupy, resources.

Údržba: nový projekt → přidat do příslušné areas/; projekt do someday/archive → odebrat z areas/; změna standardu domluvená v konverzaci → upravit areas/ ve stejné session.

## Workflow: Zachytávání

1. Lenka zachytí myšlenku/úkol/odkaz na telefonu → uloží do Notion Note Inbox, nebo namluví do projektu **Zápisník** v aplikaci Claude (uloží se jako `.md` do `inbox/telefon/`, [[zapisnik-instrukce]]; zpracuje ho Claude při `/daily-plan` a při „zavírám“, od 261025)
2. Při práci u počítače: `/note-inbox-review` → Claude projde inbox a navrhne destinace
3. Důležité věci se zapíší do vault podle níže uvedených pravidel
4. Notion záznamy se přesunou do Archive Note Inbox

### Vstupní filtr pro Obsidian

Před každým uložením do Obsidianu: **K jakému konkrétnímu projektu nebo problému toto použiješ v příštích 3 měsících?**
- Odpověď konkrétní → uložit na správné místo
- Odpověď nejasná → Notion archiv stačí; do Obsidianu nic nejde
- „Chci to dál zpracovat, ale nevím jak" → Omnibus (jen výjimečně)

Výjimky:
- Akademické zdroje: projdou pokud jde o aktivní seminárku nebo bakalářku, nebo pokud Lenka explicitně chce zdroj v resources/
- Swipe: projdou pokud jde o formát nebo mechaniku s jasnou aplikací pro tadylenka nebo lcenglish

## Workflow: Resources

`resources/` jsou tematické klastry, ne hromadné seznamy. Každý soubor = jedno téma. Studies zdroje jdou do `resources/[téma].md`, ne do `areas/studies.md`.

Formát záznamu v resources/:
- **Název zdroje** — autor (rok) — [odkaz]
  - Použij, až budeš řešit: [konkrétní problém]
  - [ ] #zettel Zpracovat: [[Název]] (jen pokud je myšlenkově silný)

## Task Management

### Kde tasky zapisovat

| Situace | Kam zapsat | Formát |
|---|---|---|
| Task patří k projektu tadylenka nebo lcenglish | Do souboru projektu v `projects/` | `- [ ] Popis #next-action` |
| Task patří k jinému projektu (health, studies…) | Do souboru projektu v `projects/` | `- [ ] Popis #next-action #online` (nebo `#telefon`, `#doma`, `#venku`) |
| Task kontextový bez projektu | [[next-actions]] — sekce `## @online`, `## @telefon`, `## @doma`, `## @venku/pochůzky` | `- [ ] Popis` |
| Task bez projektu s budoucím deadlinem | [[waiting-for]] sekce „Čeká na datum“ (v next-actions se ukáže 3 dny předem) | `- [ ] Popis 📅 YYYY-MM-DD` |
| Task nejasný, nový, bez projektu | [[omnibus]] | `- [ ] Popis` |
| Task čeká na někoho jiného | [[waiting-for]] sekce „Čeká na někoho“ | `- [ ] Čekám na X ohledně Y 📅 YYYY-MM-DD` (datum = kdy se nejpozději ozvat) |
| Projekt bez next action | Upozornit Lenku, nevymýšlet za ni | — |

- Context tag je u projektů mimo tadylenka/lcenglish povinný — bez něj se task v [[next-actions]] nezobrazí.
- **Jedna next action na projekt** (Lenka 261028): malý projekt má jednu `#next-action`; velký projekt (DigiStart) má linie s prioritou (nadpis v projektu = linie) a v každé linii nanejvýš jednu. Ostatní kroky v projektu bez tagu. Detail [[resources/postupy/tabule]].
- **Úkol ve vaultu = karta na tabuli** (od 261028): kdo v kterémkoli vlákně založí `#next-action` v projektu nebo úkol v ruční sekci [[next-actions]], založí hned i kartu na [tabuli](https://claude.ai/artifact/FD5CytwrHaAQhq43PV586N) s polem `ukol` (text úkolu), `odkaz` a `oblast` (soubor v `areas/` nebo `projects/`). Kromě úkolů čekajících na datum. Odškrtnutí ve vaultu = přepnout i kartu. Postup a kontrolní skript [[resources/postupy/tabule]].
- **Task = jedna krátká věta, jeden jasný krok** (Lenka 261020): řádek s checkboxem (v projektu, v [[next-actions]] i ve [[waiting-for]]) obsahuje jen sloveso + co + tagy/datum, tak aby ho Lenka zvládla sama bez mého výkladu. Historie, kdo co kdy řekl, předchozí kroky a odkazy jdou **pod task jako odsazená odrážka „Kontext:“** (projekt, waiting-for) nebo, u úkolů bez projektu, do [[kontext-ukolu]] (task na ni může odkázat). Nikdy odstavec v řádku tasku. Paměť `feedback_next_actions_kratce`.
- Deadline: `#next-action #online 📅 YYYY-MM-DD`. Pozor: deadline ≠ naplánovaný termín. Konkrétní slot v čase → Google Kalendář (`lnk.dvorakova@gmail.com`, čas vždy předem potvrdit s Lenkou), ne 📅 tag.

### Jak se tasky zobrazují v GTD

[[next-actions]] (Tasks plugin): **🌱 tadylenka / 🌱 lcenglish** (`#next-action` ze souborů s tím názvem v cestě) · **@online / @telefon / @doma / @venku** (manuální + projektové podle context tagu) · **📚 Zettelkasten** (`#zettel` z `resources/` a `zettelkasten/literature/`) · **⏰ Follow-upy** (waiting-for do 4 dnů).

[[master-dashboard]] (Dataview): next actions z `projects/`, inbox, waiting-for, projekty bez next action. GrowOS review fronta je samostatná (`node GrowOS/system/tools/growos.js doctor`).

| Chci vědět… | Otevřu… |
|---|---|
| Co teď udělat (podle kontextu) | [[next-actions]] |
| Celkový stav všech projektů | [[master-dashboard]] |
| Co čeká na někoho (vše) | [[waiting-for]] |

### projects/ obsahuje jen živé projekty

- `projects/` = jen projekty s aktivní `#next-action`
- Projekt v someday → **smazat projektový soubor**, přesunout vše potřebné do someday záznamu (someday záznam musí být akční sám o sobě — bez dalších kliknutí)
- Projekt dokončen → přesunout do `archive/`, zkontrolovat a vyčistit stopy v `areas/`, `gtd/`, `inbox/`

### Projektový soubor — aktuální stav nahoře, nové zápisy nad starší (261018)

Kdo otevře projekt, musí hned nahoře vidět, kde se teď je. Pořadí v každém souboru v `projects/`:
1. Hlavička (oblast, zdroj, odkazy)
2. `## Aktuální stav` — 2–5 vět s datem YYMMDD: kde projekt je, na co se čeká, další krok. Při každé změně ji **přepsat**, nepřidávat další odstavec
3. `## Co to je` / klíčové odkazy a pravidla projektu (trvalé věci)
4. `## Next actions` — jen otevřené úkoly
5. `## Záznam (nejnovější nahoře)` — datované záznamy o průběhu. **Nový záznam vždy NAD předchozí**, nikdy na konec souboru. Hotové úkoly se sem převedou jako záznam (nebo se smažou), nehromadí se jako `[x]` mezi otevřenými

Starší projekty se přerovnají postupně, vždy když na soubor sáhnu (nebo při weekly review), obsah se při tom nemaže. U publishing projektů platí navíc pole „Poslední / Další“ v Aktuálním stavu ([[feedback_publishing_aktualni_stav]]).

### Next-action advancement — povinný krok při odškrtnutí

Kdykoli odškrtnu task s `#next-action` v projektovém souboru:
1. Odstraním `#next-action` (a context tag) ze splněného tasku — nebo celý řádek smažu
2. Přidám `#next-action` + správný context tag na **další logický task** ve stejném projektu
3. Pokud žádný další task neexistuje → projekt je buď hotový nebo čeká; upozornit Lenku

Toto platí vždy — i když task odškrtávám zpětně, i když ho odškrtávám v daily plan.

### Daily plan — tasky z projektů jsou reference, ne checkboxy

Tasky z `projects/` se v daily plan zapisují jako **plain bullet bez checkboxu** s wiki-linkem: `- Název tasku → [[název-projektu]]`. Checkbox žije jen v projektovém souboru. Odškrtnutí = jdi do projektu, odškrtni tam + proveď next-action advancement. Výjimka: ad-hoc tasky vzniklé přímo v daily plan (bez projektu) mohou mít checkbox.

### „Nezapomenout“ není poznámka, ale task (261004)

Když Lenka řekne „nezapomenout“, „jen aby to nezapadlo“, „neřešit hned“ nebo ji napadne věc „na potom“, **nikdy to nezůstane jen větou v daily nebo v textu projektu** — poznámka bez viditelného tasku se nikdy nevrátí. Hned v téže odpovědi:
1. Task s `#next-action` + context tag v projektovém souboru (nebo, bez projektu, ruční sekce v [[next-actions]]; s termínem do [[waiting-for]] s 📅). Bez `#next-action` je neviditelný.
2. Pokud „neřešit hned“ → i tak `#next-action`; Lenka rozhodne při plánování, kdy. Neodsouvat tagem nebo slovy „zatím ne“.
3. Při `/daily-plan` a „zavírám“ projít sekce „Nezapomenout“ / „Zbývá“ v dnešním a včerejším daily: co nemá živý task, založit; co je hotové, odškrtnout.

### Zakázáno
- Nevytvářet standalone soubory pro jednotlivé tasky
- Nezapisovat tasky do README, komentářů v kódu ani náhodných poznámek
- Nezapisovat projekt tasky přímo do [[next-actions]] — tam patří jen kontextové věci bez projektu
- Projekt task bez `#next-action` tagu = neviditelný v GTD
- Kopírovat projekt tasky jako checkboxy do daily plan — jen reference s wiki-linkem

## Workflow: Obrázky a přílohy

- Drag & drop do poznámky → Obsidian uloží do `assets/`; přejmenovat v Obsidianu (ne v Průzkumníku), odkaz se aktualizuje sám
- Formát názvu: `YYMMDD-HHMM_kontext_popis.jpg` (např. `260503-1430_vojtěch_NA-AZK14-fol23r.jpg`); zdroj fotek: Google Photos → stáhnout → drag & drop
- **Výjimka — archivní fotky bez číslování stran:** ponechat původní název z Google Photos (`PXL_YYYYMMDD_HHMMSS.jpg`) kvůli dohledatelnosti; `fol[X]` jen u číslovaných folií

## Pravidla

- [[omnibus]] je jediný vstupní bod — nikdy přímo do areas/ nebo gtd/ bez zpracování
- Formát dat vždy YYMMDD (např. 260502 pro 2. května 2026)
- **Daily zápisy po půlnoci:** pokud je po půlnoci a Lenka ještě neoznámila konec dne ("jdu spát" apod.), veškerý zápis do `daily/` (Průběh dne, systémové změny, cokoli) patří do souboru **předchozího** dne, ne do dne podle systémového data. Platí vždy — při zavírání i při průběžných zápisech mimo skilly. Nikdy nezakládat nový `daily/{dnešní YYMMDD}.md` jen kvůli změně systémového data uprostřed pokračující seance. Viz [[feedback_daily_note_midnight]].
- [[next-actions]] nemá tvrdý limit položek, ale každá položka musí být konkrétní a akční
- GrowOS je samostatný systém (2.0) — při práci v GrowOS kontextu se řídit `GrowOS/AGENTS.md` a [[resources/postupy/growos]]
- **Říkat, když hádám** (261014, podle AI Signal „7 řádků“): když něco nevím nebo si to domýšlím (souvislost, zdroj, datum, význam cizího sdělení), řeknu to výslovně a oddělím od ověřeného; u tvrzení o jejích věcech uvedu soubor nebo mail, odkud to mám. Radši „nevím, ověřím“ než hladké domýšlení. Paměť `feedback_say_when_guessing`.
- **Styl odpovědí v chatu** (261014, z AI Signal „7 řádků“, vybrala Lenka): (1) začít odpovědí, bez „skvělá otázka“; (2) krátké prosté věty; (3) bez emoji a nadšení, **kromě varovných značek**, hlavně ⚠️ u odesílací adresy a deadlinů; (4) nepřebírat její náladu, zůstat věcná; (5) ~~Stop when it's done~~ **neplatí**: nabídky dalších kroků a upozornění na deadliny zůstávají (role dispečera); (6) ptát se jen když chybějící informace změní odpověď, a po jedné otázce; (7) viz „Říkat, když hádám“ výš. Šablona denního plánu (emoji v nadpisech sekcí) se nemění, dokud Lenka neřekne. Paměť `feedback_style_rules_ai_signal`.
- **Vždy odkaz na původní zdroj** (260929, zpřísněno): kdykoli ukládám nebo přesouvám informaci kamkoli (someday, resources, projekt, zettelkasten, content bank), musí vést **přímo na původní zdroj** — URL kurzu/článku/produktu, ne jen „psalo se v mailu“. Poznámka bez cesty ke zdroji je k ničemu. U e-mailů:
  - shrnutí **+ přímý proklik na zdroj** uložen → mail může do koše (`Svodka/smazat`);
  - jen shrnutí bez přímého prokliku (odkaz vede jen na mail) → mail **zůstává dohledatelný v archivu**, nemazat;
  - Substack a jiné na webu dohledatelné texty, běžná oznámení bez odkazu (např. „registrace brzy“) → mail může do koše.
- **Instalace na zkoušku (261027):** kdykoli Lenka nebo Claude nainstaluje program, rozšíření, CLI, npm balíček nebo MCP server na zkoušku, Claude hned založí ve [[waiting-for]] úkol „Rozhodnout: nechat, nebo odinstalovat X“ s 📅 za 14 dní. Důvod a postup: [[resources/postupy/udrzba-pocitace]].
- **Git:** Claude smí lokálně `git add` + `git commit`, **nikdy `git push`** (blokováno) — push spouští Lenka sama (`cd "G:\Můj disk\vault"; git push`). Detaily [[resources/postupy/git-zaloha]].

## Systémové změny — jak je zapisovat

Kdykoli v konverzaci domluvíme nové pravidlo, postup nebo změnu systému:
1. **Okamžitě** — ještě v téže odpovědi — aktualizovat `CLAUDE.md`, příslušný soubor v `resources/postupy/` a/nebo `memory/`
2. Nečekat na "zavírám" ani na pokyn od Lenky
3. Při "zavírám" udělat kontrolu — co bylo dnes změněno? Vše zapsáno? → zapsat do daily note sekce **Systémové změny**

Toto pravidlo platí i samo pro sebe — je zapsáno zde, ne jen v paměti.

### Čištění next-actions — povinný krok na konci každé seance

Na konci každé seance (při "zavírám" nebo kdykoli je seance u konce) smazat všechny `[x]` položky z manuálních sekcí v [[next-actions]]. Automatické query bloky (`tasks`) se čistí samy — mazat jen plaintext checkboxy.

### Pokyn "zavírám"

Při zavírání sezení (Lenka řekne "zavírám", "končím" apod.) — **od 261028 jen v denním vlákně** (a výjimečně ve vlákně, kde se dlouho ladilo něco složitého a Lenka to řekne sama). Ostatní vlákna se formálně nezavírají, viz „Konec úkolu v samostatném vlákně“ níže. Denní vlákno při zavírání udělá kroky za všechna dnešní vlákna: jeden společný commit, kalendář se skutečnými časy z jejich záznamů (seznam sezení, `/recap-all`), Databanka, evidence hodin, Zápisník, kontrola karet na tabuli:
1. **Projít konverzaci** — co bylo domluveno jako pravidlo nebo změna systému? Pokud bylo vlákno tak dlouhé, že se jeho začátek zkomprimoval (v kontextu je souhrn místo původních zpráv), nejdřív sám spustit `/recap`. Ten čte celý záznam z disku, takže se na nic z počátku vlákna nezapomene. (260929)
1b. **Nevyřešené věci v dnešních vláknech** (od 261028, Lenka: vlákna se formálně nezavírají, nic nesmí zapadnout): projít všechna dnešní vlákna (`list_sessions`, i odpojená na nejvyšší úrovni; detail `get_session` / `list_events`, souhrnně `/recap-all`) a vypsat Lence jedním seznamem jen to, co na ni čeká: otázky bez odpovědi, návrhy ke schválení, vlákna se stavem „čeká na uživatele“, nedokončené kroky. U každé položky vlákno (klikací odkaz) a co se čeká. Co je úkol, rovnou založit (projekt, [[next-actions]], [[waiting-for]]); co je jen otázka, nechat na Lence. Srovnat s `## 📥 Pro denní vlákno` a kartami s `ceka: true` na tabuli, nic nezdvojovat. Nic nečeká = nic nepsat.
2. **Ověřit** — je každá změna zapsána v `CLAUDE.md`, `resources/postupy/` a/nebo `memory/`? Pokud ne → opravit.
3. **Git commit + push check** — pokud v sezení vznikly změny v trackované části vaultu, lokálně je committnout (`git add -A && git commit`). Zkontrolovat `git log origin/main..HEAD`, jestli existují neodeslané commity (i z dřívějška) — pokud ano, připomenout Lence, ať spustí `git push` sama — **vždy jako samostatný blok kódu ```bash s příkazem `cd "G:\Můj disk\vault"; git push`** (v aplikaci má tlačítko Run, nic se nekopíruje; 260929). Pokud nic k odeslání není, nic neříkat.
4. **Znění skillů v Databance** (od 261025, nahrazuje Notion Skills): sáhli jsme v sezení na skill (nový nebo upravený SKILL.md, vault `.claude/skills/`, `GrowOS/.claude/skills/`, `~/.claude/skills/`)? → spustit `python -I "G:/Můj disk/vault/resources/databanka/gen_zneni_skillu.py" <název-skillu>`; vloží aktuální znění do jeho poznámky v Databance (sbalený blok „Znění skillu“). Nový skill bez poznámky → nejdřív poznámka přes `gen_nastroje.py` ([[resources/postupy/databanka]]). Smazaný skill → upozornit Lenku. Notion databáze Skills je **zmrazená** (Lenka 261025): zůstává, jak je, už se neaktualizuje.
5. **tadylenka content mining** — bylo v sezení tadylenka content (research, recenze výstavy, rozepsaný text, zajímavý zdroj)? Pokud ano → přidat jako námět do `GrowOS/tadylenka/library/content-bank/`, zařadit do rubriky, `status: fresh` (nebo `retired`, pokud spíš someday). Notes fronta je pozastavená (pozdější fáze) — do [[notes-candidates]] se nic nepřidává.
5a. **GrowOS brain** (od 261018) — pracovalo se v sezení na byznysu v GrowOS? → zkontrolovat zastaralé `[PLACEHOLDER]` a věty „neexistuje / zatím ne“ v `GrowOS/<byznys>/brain/` a `setup.md` proti tomu, co se v sezení stalo, opravit, a work items pro Lenku posunout do `review`. **Jen tichá kontrola, na schvalování se Lenky při zavírání neptat** (rozhoduje ráno v denním plánu, 261018). Postup [[resources/postupy/growos]] („Kontrola brainu při zavírání“).
5b. **Databanka** — porovnat, co se v sezení dělalo, s `resources/databanka/`. Max. 1–3 shody → do daily sekce **Z databanky** („k tomu je strukturovaně popsané X“), i u věcí, které už děláme po svém. Žádná shoda = nic nepsat. (Pravidlo od 260927, [[resources/postupy/databanka]].)
6. **Aktualizovat kalendář** — aktualizovat Todoist kalendář na skutečné časy pracovních bloků (start + end). Neuskutečněné bloky: buď rovnou přesunout na konkrétní termín, nebo smazat — žádný blok nesmí zůstat v minulosti jako neaktualizovaný. Do kalendáře patří reálná aktivita bez ohledu na to, jestli byla dopředu naplánovaná — pokud pro proběhlé sezení žádný blok neexistoval, založit nový (Todoist kalendář, Sage) se skutečným časem trvání sezení. Výjimka: pětiminutová a podobně krátká sezení (drobnost vyřízená během pár minut) do kalendáře nezapisovat (260929). **Denní vlákno (261005, změněno 261019):** samotné sestavení plánu a průběžné drobné zápisy blok nemají. **Ale aktivní práce se svodkou a poštou ano** (Lenka 261019: zabere dost času, který se jinak nikde neeviduje): od chvíle, kdy Lenka otevře a komentuje svodku, přes vyřizování drobností z ní (maily, zápisy do vaultu, kontrola dokumentů) až do jejich dokončení → blok „Svodka a pošta (denní vlákno)“ v Todoist kalendáři se skutečným časem (začátek = její první zpráva ke svodce, konec = poslední vyřízená věc), založit hned po dokončení, ne až večer. Pauzy a práce v jiných vláknech se nezapočítávají. Jiná věcná práce v denním vlákně (celé téma místo nového vlákna) dostane vlastní blok. **Časy hlídá Claude, na čas se Lenky neptá** (260927): začátek = čas první zprávy v seanci (hook UserPromptSubmit vkládá aktuální čas do každé zprávy), konec = čas pokynu „zavírám“; delší pauzy mezi zprávami (40+ min) = přerušení, blok rozdělit. Pokud je vlákno otevřené celý den, časy průběžně zapisovat do Průběhu dne.
5d. **Rozcestník LCEnglish** (od 261026): hook `~/.claude/inject-closing-checklist.ps1` při „zavírám“ vypíše dnes změněné soubory o systémech LCEnglish → opravit oddíl dotčeného systému v [[lcenglish-ekosystem]] a přepsat „Ověřeno: YYMMDD“; měnil-li se web nebo Leadpages, spustit `resources/web-lcenglish/mapa_webu.py` a rozdíl do Průběhu dne. Nic nevypsal = nic nedělat.
5c. **Zápisník** (od 261025): projít `inbox/telefon/` (bez podsložky `zarazeno/`); nové poznámky zařadit podle Task Managementu, **z každé poznámky vždy vznikne úkol** (task s `#next-action` + context tagem, ruční sekce [[next-actions]] nebo [[waiting-for]] s 📅), nikdy jen zápis, kontext nebo otevřená otázka, a to i u DigiStartu (Lenka 261026); soubor přesunout do `inbox/telefon/zarazeno/`, do daily jednou řádkou „co → kam“. Nic nového = nic nepsat.
6a. **Tabule úkolů** (od 261025, Lenka: stavy se při zavírání vláken nepropisovaly): najít na [tabuli](https://claude.ai/artifact/FD5CytwrHaAQhq43PV586N) karty, kterých se práce ve vlákně týkala (podle názvu a `odkaz`), a přepsat je: `stav: hotovo`, nebo `beh`/`ceka`/`potrebuju` podle toho, kde to skončilo, krátká zpráva do rozhovoru karty (`vlakno`, přidat na konec, nastavit `zpracovano`); Lenčiny nepřečtené zprávy zpracovat. **Denní vlákno navíc spustí kontrolu tabule proti vaultu** (`resources/tabule/tabule_vs_vault.py`, od 261028) a opraví, co vypíše. Samostatná vlákna kartu přepínají sama při dokončení úkolu (261028); denní vlákno při zavírání projde všechny karty proti Průběhu dne a opraví, co zůstalo. Postup [[resources/postupy/tabule]].
6b. **Evidence hodin** (`resources/fakturace-klienti.md`, od 261013): proběhlé klientské hodiny a vycházky (Tandem, Kocián, PENTA…) podle kalendáře **a navíc práci pro Štěpánku** (audit FEKT, web GNOSTIKY, DigiStart, firemní workshop; počítačová práce s hodinami podle bloků v Todoist kalendáři, dny fyzicky u Štěpánky jen jako dny). Nefakturuje se po hodinách, je to přehled pro Lenku a případně Štěpánku. Zdroj: skutečné časy bloků a Průběh dne.
7. **Zapsat daily note** — `daily/YYMMDD.md` (jeden soubor pro celý den: plán nahoře, pod ním Průběh dne a Systémové změny). **YYMMDD = den, kdy seance reálně probíhala** (pravidlo o půlnoci viz Pravidla výše). Append: shrnutí sezení, klíčová rozhodnutí, systémové změny; nedodělky, které nepatří vláknu, do `## 📥 Pro denní vlákno` (viz Workflow: Denní vlákno). Pokud soubor neexistuje → vytvořit.
8. **Před potvrzením zkontrolovat**: byl `daily/YYMMDD.md` skutečně zapsán/aktualizován v tomto sezení? Pokud ne → vrátit se ke kroku 7.
9. **Potvrdit** Lence: "Systémové změny jsou zapsány, vault je aktuální."

Lenka nekontroluje soubory — "zavírám" je záruka, ne jen záznam.

## Asistentský management

Lenka chce, abych fungoval jako manažer/dispečer jejího času a priorit:

- Na začátku sezení nebo na dotaz "co dělat?" shrnu stav: co hoří, co počká, co je zablokované
- Pracovní úkoly udržuji v todo listu (TodoWrite), ne jen v textu konverzace
- Proaktivně upozorňuji na blížící se deadliny nebo konflikty kapacity
- Pomáhám rozhodovat: explicitně říkám, co teď dělat a co odložit
- Pravidelně připomínám GTD review a Zettelkasten review (viz níže)

## Workflow: Denní vlákno

Vlákno, kde běží denní plán, je organizační jednotka dne — ne jednorázový skill run:

- Otevře se ráno (`/daily-plan`) a zůstává otevřené **celý den** jako primární místo pro sledování reality dne.
- Jeden soubor na den: `daily/YYMMDD.md` — plán nahoře, Průběh dne a Systémové změny pod ním; žádný samostatný `-plan.md`.
- Průběžně: Lenka do téhož vlákna reportuje postup (hotovo, časy, odchylky) → zapisuje se do sekce **Průběh dne**.
- Delší soustředěná práce na jednom projektu běží ve vlastním vlákně — včetně vlastního uzavření podle [[#Pokyn "zavírám"]].
- **Denní vlákno jen na přehled (261024):** ranní plán, večerní zavírání a drobnosti. Větší úkol, který vznikne během dne, Claude hned pošle do **samostatného vlákna na nejvyšší úrovni** (založit session a odpojit ji, aby nebyla podvláknem a nehlásila se zpět); v briefu vždy zápis výsledku do projektu a do Průběhu dne v `daily/YYMMDD.md` **a přepnutí příslušné karty na tabuli úkolů** (začátek `beh: bezi`, konec `hotovo` nebo `ceka`; 261025). Každé vlákno má vlastní kontextové okno.
- **Konec úkolu v samostatném vlákně (261028, Lenka: zavírací kolo v každém vlákně pálí tokeny a většinu dělá vlákno průběžně):** vlákno se formálně nezavírá. Jakmile dokončí svůj úkol (nebo se zastaví na čekání), samo, bez pokynu a v téže odpovědi: (1) zapíše výsledek do projektu a do Průběhu dne v `daily/YYMMDD.md` (s časem začátku a konce práce), (2) přepne svou kartu na tabuli (`hotovo`, nebo `ceka`/`fronta` s `potrebuju`), (3) nedodělky předá do `## 📥 Pro denní vlákno`. Pravidla a systémové změny zapisuje hned jako dosud. Commit, push připomínku, kalendář a ostatní kroky „zavírám“ udělá večer denní vlákno za všechna vlákna. Tohle patří do každého briefu nového vlákna.
- **Předávání věcí z jiných vláken (261006):** co v individuálním vlákně zůstane otevřené a nepatří mu (rozhodnutí Lenky, přesun nebo smazání bloku v kalendáři, založení tasku, nabídky čekající na „ano“), nezůstane jen v jeho vlastní sekci, ale zapíše se do sekce `## 📥 Pro denní vlákno` nahoře v dnešním `daily/YYMMDD.md` (checkboxy; u každé položky zdroj a co se čeká). Denní vlákno ji čte při každém průběžném zápisu a při zavírání: položky vyřídí (založí task, přesune kalendář, zeptá se Lenky) a odškrtne. Při dokončení úkolu v individuálním vlákně se nedodělky předávají sem.
- **Zkušebně od 260929 — `/recap-all` při zavírání denního vlákna** (jen tam, ne u ostatních vláken): spustit s oknem od prvního otevření dne (výchozích 12 h nestačí), výsledek porovnat s `daily/YYMMDD.md` a do Průběhu dne doplnit **jen to, co chybí** (vlákna, která se nezavřela nebo nezapsala, nedořešené další kroky). Lence neukazovat celý výpis, jen doplněné. Vyhodnotit při nejbližším weekly review: pomáhá, nebo jen přidává text? Výsledek → poznámka [[JB – recap-all]] v Databance.
- Denní vlákno se zavírá **jako poslední** v rámci dne (rekapitulace + formální uzavření), klidně i po půlnoci — pořád do daily note aktuálního, ještě neuzavřeného dne. Pokud vlákno omylem zůstane otevřené hluboko do dalšího dne, Lenka to při zavírání výslovně řekne.

## Pravidelné revize

**GTD weekly review + Weekly review ritual** — spouští se společně při `/weekly-review`, bez ptaní, vždy v tomto pořadí:
1. [[master-dashboard]] — rychlý přehled: co má next action, co nemá, co čeká
2. `projects/` — projít každý projekt: živý nebo do someday/archive? Next action aktuální?
3. [[next-actions]] — ruční sekce (@online, @telefon, @doma, @venku): hotové smazat, zbývající stále akční?
4. [[waiting-for]] — přišla odpověď? Blíží se follow-up?
5. [[someday-maybe]] — posunulo se něco do akce? Co je mrtvé?
6. [[omnibus]] — zpracovat zachycené položky po jedné
7. `areas/` — rychlá kontrola: jsou aktivní projekty v každé oblasti aktuální? Jsou "doplnit" položky stále relevantní nebo je vyčistit? Vždy se zeptat na stav seminárek v [[studies]] (vytvářet tlak, i když nemají projekty). **Přehledovky (dr. Pech):** otevřít dashboard (artefakt, odkaz v [[resources/postupy/prehledovky-pech]]) a projít „Co teď“: nezpracované přednášky, nezkontrolované balíčky, čekající opravy, poslední trénink (od 261006). **LCEnglish (od 261026):** v [[lcenglish-ekosystem]] vypsat systémy s „Ověřeno“ starším než 30 dní a nabídnout jeden ověřit; obnovit `resources/web-lcenglish/mapa-webu-navstevnost.json` z Metricoolu (značka 2215183, metriky WTPA01/WTPA02, posledních 12 měsíců), spustit `python -I resources/web-lcenglish/mapa_webu.py` a Lence ukázat jen rozdíl proti minulé mapě (nové/zmizelé stránky, odkazy, dárky, videa); jednou otázkou se zeptat, jestli platí hodnoty ve sloupci „Platí“ v [[lcenglish-hlidane-udaje]], a vypsat jen místa z mapy (oddíl Hlídané údaje), kde text nesedí
8. **Zettelkasten** — `#zettel` tasky v [[next-actions]]: relevantní pro aktuální seminárku nebo bakalářku? Pokud ano → `#next-action` do projektu. Zettelkasten review (wiki-linky, MOC, propojení PN) → [[resources/postupy/zettelkasten]]. **Kontroly přírůstků** do knihovny „knihy a články“ (Drive dotaz) i domácí knihovny (Handy Library) → [[resources/postupy/knihovna]] (pokynem **„zpracuj knihovnu“** i mimo review).
9. **tadylenka runway** — zkontrolovat, že runway v [[projects/tadylenka-publishing]] není prázdná (min. 2–3 díly dopředu). Pokud dochází → říct Lence, ať doplní dávku z `Content Bank.base` (pohledy podle rubrik, `status: fresh`). NEvybírat díl po dílu každý týden — runway se plní dávkově. (Notes fronta je od 261004 vyřazená z weekly review; vrátí se organicky, až se rozjedou sociální sítě.)
9b. **Databanka** — nabídnout jednu položku ve stavu `neprozkoumáno` z `Databanka.base` na seznámení (střídat zdroje a typy). Zkontrolovat počet poznámek: nad 500 → připomenout návrat k Supabase ([[resources/postupy/databanka]]).
10. **Note Inbox review** — spustit `/note-inbox-review` a zpracovat Notion Note Inbox; ve stejném kroku jedním dávkovým zápisem přenést fronta knih ze sekce „Knihy k zapsání do Notion“ v [[omnibus]] do Notion „📖 Book Recommendations“ (postup [[resources/postupy/svodka]], od 261002)
11. **Archivace dailies** — přesunout všechny soubory z `daily/` (YYMMDD*.md) do `daily/YYYY-MM/` podsložky odpovídající jejich měsíci (např. `daily/2026-06/`), **všechny starší než dnešní** (dnešní den ještě běží). Automaticky, bez ptaní. Upřesněno 260920.
12. **Weekly review ritual** (úpravy 261024: čas oblastí Claude čte z kalendáře sám, reflexe tři otázky najednou a dobrovolně, priority bez MIT, Zápisník i brain dump paralelně, výroba dílů v samostatném vlákně; paměť `feedback_weekly_review_ritual_adaptace`) — navazuje bez ptaní: pohled zpátky na oblasti, reflexe (2-3 otázky), brain dump backlog, waiting-for přehled, kalendář příštího týdne, priority → uloží `weekly-reviews/YYMMDD-week-review.md` a `gtd/next-week-priorities.md`
    - Při sekci priorities: přečíst dailies za uplynulý týden (max 10), areas/ a projects/ — hodnotit strategicky, ne jen operačně. Prioritou jsou důležité-neurgentní věci. Nabídnout vlastní hodnocení, pak čekat na reakci.
    - **Studium: Přehledovky (dr. Pech), od 261006.** Při plánování příštího týdne vždy navrhnout studijní bloky: **po každé přednášce (út, pá) cca 30 min** „zpracuj přednášku“ a **1× týdně cca 45 min trénink zkoušky** (návrh: neděle dopoledne). Časy potvrdit s Lenkou a po potvrzení založit v Todoist kalendáři (běžná pravidla kalendáře). Do priorit zařadit studium jako důležité-neurgentní věc, dokud trvá semestr; výsledek zapsat do `gtd/next-week-priorities.md`. Kolize s jinými bloky řešit přesunem bloku, ne vynecháním. Detail [[resources/postupy/prehledovky-pech]].
    - **Pravidelné věci (od 261018):** malé pravidelné návyky (např. japonská patnáctka) se při plánování týdne s Lenkou projdou a zapíšou do sekce `## Každý den / pravidelně` v `gtd/next-week-priorities.md`. Denní plán je pak každý den vypíše jako vlastní řádek, ne jako MIT ani mezi drobné úkoly. Důvod: next action se sama nenabízí a na tyhle věci jinak dojde až při review („aha, to jsem nedělala“).
    - Projects aktualizovat průběžně i při review — nejen next actions, ale celý stav a směřování.
    - Dailies psát tak, aby obsahovaly info použitelné při příštím review (rozhodnutí, momentum, strategické posuny).

**Údržba počítače (od 261026):** měsíčně 1. v měsíci Stažené (5 min) a čtvrtletně velká kontrola (programy proti soupisu, nové složky, duplicity, volné místo), úkoly 🔁 ve [[waiting-for]], čtvrtletní kontrola patří i do Quarterly Sprint. Postup [[resources/postupy/udrzba-pocitace]].

**Denní otvírací rituál** (každý den při sezení u počítače):
- Spustit `/daily-plan` nebo napsat „denní plán" / „naplánuj mi den"
- Skill sestaví svodku z nevytříděných e-mailů od posledního čísla ([[resources/postupy/svodka]]), přečte Google Kalendář, projde `projects/` pro `#next-action` tasky (vč. publishing projektů), zkontroluje [[next-week-priorities]]. zpracuje nové poznámky ze Zápisníku (`inbox/telefon/`, od 261025), z fronty GrowOS vypíše jen novinky: položky, které od posledního plánu přibyly do `review` nebo se tam vrátily po opravě (každou jednou); schválené a naplánované nevypisuje a po plánovaném odeslání si Claude tiše ověří, že prošlo, a posune na `published`, Lence se ozve jen při chybě (261019); Lenka odpoví jednou větou; nástěnka [[GrowOS fronta.base]] (od 261018); karty, které Lenka posunula do `changes` nebo `approved`, Claude při denním plánu rovnou zpracuje (jak s kartou pracovat: [[resources/postupy/growos]] „Jak pracovat s kartou na nástěnce“, 261024)
- Výstup: plán **bez MIT** (skill přepsán 261029): pevné časy z kalendáře + krátký výběr „Dnes na stole“ rozdělený podle tabule na Ty / Spolu / Claude, ostatní jen na [tabuli](https://claude.ai/artifact/FD5CytwrHaAQhq43PV586N); jako sekce nahoře v `daily/YYMMDD.md`. Kalendářní bloky plán sám nezakládá, čas navrhne a založí po potvrzení
- Kalendářní bloky z weekly review jsou základ — denní plán je upřesňuje, nevytváří od nuly
- Goals soubor: [[goals]] — kvartální směry, aktualizuje se při Quarterly Sprint

## Pracovní kadence

- LCEnglish: newsletter 1x týdně v úterý (Drip = hlavní kanál; od 260928 zrcadlo Art for English i na Substacku) + social průběžně; placená reklama teď neběží (260929 — zvažuje se kampaň na 10x English)
- **Art for English = jeden úkol, jeden blok na celou epizodu** (hook, text, Drip, Substack, FB). Ve weekly review, v plánu ani na tabuli ho nedělit na „hook a preheader“ (Lenka 261025: blok 30 min na hook nestačil, #28 trvala 15:37–16:45). Paměť `feedback_lcenglish_episode_one_task`.
- tadylenka (přepsáno 260909): **1× Substack článek á 14 dní, pátek**, tři rotující rubriky — Ženy v obraze → Co vidíš? Tak vidíš! → Všichni svatí, dokola; 800–1200 slov. **Úspěch = pravidelnost, ne dosah ani počet odběratelů.** IG Stories příležitostně — upomínat Lenku po každé zmínce o výstavě, galerii, muzeu nebo kulturní akci. Podrobnosti (runway, content bank, pozdější fáze) → [[resources/postupy/growos]].

## GrowOS — jádro

- `GrowOS/` = samostatný marketing systém pro tadylenka, lcenglish a DigiStart (2.0 od 260906, DigiStart od 261014; co u DigiStartu žije v projektu a co v GrowOS → [[resources/postupy/growos]] „DigiStart: co kde žije“). Charta `GrowOS/AGENTS.md`; systémové cesty v GrowOS (`system/`, `.claude/`, `AGENTS.md`, `CLAUDE.md`) upravuje jen Lenka.
- **Jednotný postup výstupů (261019):** každý výstup = položka fronty GrowOS → Claude ukáže v chatu + nástěnka [[GrowOS fronta.base]] (`review`) → Lenka schválí (`approved`) → teprve pak Drip/Substack/Metricool/Leadpages → po vydání `published`. Žádné výjimky. Detail [[resources/postupy/growos]] („Jednotný postup výstupů“).
- **Rozdělení:** strategie, kadence a `#next-action` („připravit epizodu #NN“) žijí v `projects/` (publishing projekty); konkrétní výroba = work item v `GrowOS/<byznys>/work/` a jeho review fronta — kroky výroby do vault GTD nepsat.
- Po vydání → aktualizovat „Aktuální stav“ (a u A4E „Vydané díly“) v projektu + next-action advancement. Plný postup → [[resources/postupy/growos]].
