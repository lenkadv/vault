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
| GTD: kde se tasky zobrazují, archivace nebo someday projektu, projektové tasky v denním plánu | `resources/postupy/gtd.md` |
| Tabule úkolů (kdo co vede: Claude / spolu / Lenka), odškrtávání mimo Obsidian, synchronizace s vaultem, denní plán bez MIT | `resources/postupy/tabule.md` |
| Přiznání k DPH (identifikovaná osoba), výpisy Air Bank, XML pro Moje daně | `resources/postupy/dph.md` (přiznává se jen Anthropic; ostatní zahraniční služby jen vypsat, rozhoduje Lenka) |
| Přepisy z Voicenotes (voicenotes.com), stažení přepisu nahrávky nebo videa, „stáhni z Voicenotes“ | `resources/postupy/voicenotes.md` (konektor, jinak Chrome ve vlastní kartě; nic v aplikaci neměnit) |
| Údržba počítače (disk C:, Stažené, nainstalované programy, duplicity s Diskem), měsíční a čtvrtletní kontrola, instalace programu na zkoušku | `resources/postupy/udrzba-pocitace.md` (vyzkoušená aplikace = úkol „nechat/odinstalovat“ za 14 dní; mazat finálně jen Lenka) |
| **„Zavírám“ v denním vlákně**, čištění next-actions, jak běží denní vlákno, `/recap-all` večer | `resources/postupy/zavirani.md` |
| **Weekly review** (`/weekly-review`), Quarterly Sprint, studijní bloky a pravidelné věci do plánu týdne | `resources/postupy/revize.md` |
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
- **Úkol ve vaultu = karta na tabuli** (od 261028): kdo v kterémkoli vlákně založí `#next-action` v projektu nebo úkol v ruční sekci [[next-actions]], založí hned i kartu na [tabuli](https://claude.ai/artifact/FD5CytwrHaAQhq43PV586N) s polem `ukol` (text úkolu), `odkaz` a `oblast` (soubor v `areas/` nebo `projects/`). Kromě úkolů čekajících na datum a **projektů s vlastní mapou** (DigiStart, od 261030: úkoly jen na [mapě DigiStartu](https://claude.ai/artifact/GpJREkrDcHnoLeDHaEyc2j), na tabuli jediná karta-rozcestník `digistart-mapa`). Odškrtnutí ve vaultu = přepnout i kartu. Postup a kontrolní skript [[resources/postupy/tabule]].
- **Task = jedna krátká věta, jeden jasný krok** (Lenka 261020): řádek s checkboxem (v projektu, v [[next-actions]] i ve [[waiting-for]]) obsahuje jen sloveso + co + tagy/datum, tak aby ho Lenka zvládla sama bez mého výkladu. Historie, kdo co kdy řekl, předchozí kroky a odkazy jdou **pod task jako odsazená odrážka „Kontext:“** (projekt, waiting-for) nebo, u úkolů bez projektu, do [[kontext-ukolu]] (task na ni může odkázat). Nikdy odstavec v řádku tasku. Paměť `feedback_next_actions_kratce`.
- Deadline: `#next-action #online 📅 YYYY-MM-DD`. Pozor: deadline ≠ naplánovaný termín. Konkrétní slot v čase → Google Kalendář (`lnk.dvorakova@gmail.com`, čas vždy předem potvrdit s Lenkou), ne 📅 tag.

### projects/ obsahuje jen živé projekty

`projects/` = jen projekty s aktivní `#next-action`. Projekt do someday nebo hotový (archive/) → postup v [[resources/postupy/gtd]], tam je i kde se tasky zobrazují a jak se píšou do denního plánu.

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
- **Vždy odkaz na původní zdroj** (260929, zpřísněno): kdykoli ukládám nebo přesouvám informaci kamkoli (someday, resources, projekt, zettelkasten, content bank), musí vést **přímo na původní zdroj** — URL kurzu/článku/produktu, ne jen „psalo se v mailu“. Poznámka bez cesty ke zdroji je k ničemu. Kdy smí mail do koše: [[resources/postupy/svodka]] krok 3.
- **Instalace na zkoušku (261027):** kdykoli Lenka nebo Claude nainstaluje program, rozšíření, CLI, npm balíček nebo MCP server na zkoušku, Claude hned založí ve [[waiting-for]] úkol „Rozhodnout: nechat, nebo odinstalovat X“ s 📅 za 14 dní. Důvod a postup: [[resources/postupy/udrzba-pocitace]].
- **Git:** Claude smí lokálně `git add` + `git commit`, **nikdy `git push`** (blokováno) — push spouští Lenka sama (`cd "G:\Můj disk\vault"; git push`). Detaily [[resources/postupy/git-zaloha]].

## Systémové změny — jak je zapisovat

Kdykoli v konverzaci domluvíme nové pravidlo, postup nebo změnu systému:
1. **Okamžitě** — ještě v téže odpovědi — aktualizovat `CLAUDE.md`, příslušný soubor v `resources/postupy/` a/nebo `memory/`
2. Nečekat na "zavírám" ani na pokyn od Lenky
3. Při "zavírám" udělat kontrolu — co bylo dnes změněno? Vše zapsáno? → zapsat do daily note sekce **Systémové změny**

Toto pravidlo platí i samo pro sebe — je zapsáno zde, ne jen v paměti.

**Pokyn „zavírám“** („končím“ apod.) se dělá jen v denním vlákně (výjimečně ve vlákně, kde se dlouho ladilo něco složitého a Lenka to řekne sama) a zavírá za všechna dnešní vlákna. **Než začnu, přečtu si [[resources/postupy/zavirani]]**: kroky 1–9, čištění next-actions, jak běží denní vlákno. Lenka nekontroluje soubory, „zavírám“ je záruka, ne jen záznam.

## Asistentský management

Lenka chce, abych fungoval jako manažer/dispečer jejího času a priorit:

- Na začátku sezení nebo na dotaz "co dělat?" shrnu stav: co hoří, co počká, co je zablokované
- Pracovní úkoly udržuji v todo listu (TodoWrite), ne jen v textu konverzace
- Proaktivně upozorňuji na blížící se deadliny nebo konflikty kapacity
- Pomáhám rozhodovat: explicitně říkám, co teď dělat a co odložit
- Pravidelně připomínám GTD review a Zettelkasten review (viz níže)

## Workflow: Denní vlákno

- **Denní vlákno** (`/daily-plan` ráno, „zavírám“ večer) je jen na přehled dne: plán, Průběh dne, drobnosti. Jeden soubor na den `daily/YYMMDD.md` (plán nahoře, pod ním Průběh dne a Systémové změny). Jak běží celý den → [[resources/postupy/zavirani]].
- **Větší úkol = samostatné vlákno na nejvyšší úrovni (261024):** založit session a odpojit ji, aby nebyla podvláknem a nehlásila se zpět. Každé vlákno má vlastní kontextové okno. Brief vždy obsahuje bod „Konec úkolu“ níže a přepnutí karty na tabuli (začátek `beh: bezi`).
- **Konec úkolu v samostatném vlákně (261028, Lenka: zavírací kolo v každém vlákně pálí tokeny):** vlákno se formálně nezavírá. Jakmile dokončí svůj úkol (nebo se zastaví na čekání), samo, bez pokynu a v téže odpovědi: (1) zapíše výsledek do projektu a do Průběhu dne v `daily/YYMMDD.md` (s časem začátku a konce práce), (2) přepne svou kartu na tabuli (`hotovo`, nebo `ceka`/`fronta` s `potrebuju`), (3) nedodělky předá do `## 📥 Pro denní vlákno`. Pravidla a systémové změny zapisuje hned jako dosud. Commit, push připomínku, kalendář a ostatní kroky „zavírám“ udělá večer denní vlákno za všechna vlákna.
- **📥 Pro denní vlákno (261006):** co ve vlákně zůstane otevřené a nepatří mu (rozhodnutí Lenky, přesun nebo smazání bloku v kalendáři, založení tasku, nabídky čekající na „ano“), nezůstane jen ve vlákně, ale zapíše se jako checkbox do sekce `## 📥 Pro denní vlákno` nahoře v dnešním `daily/YYMMDD.md`, u každé položky zdroj a co se čeká.

## Pravidelné revize

- **Weekly review** (`/weekly-review`): GTD review + ritual, kroky 1–12 → [[resources/postupy/revize]] (skill si ho přečte sám).
- **Denní otvírací rituál** = `/daily-plan` („denní plán“, „naplánuj mi den“); celý postup je ve skillu `productivity-daily-plan`. Goals: [[goals]] (aktualizuje Quarterly Sprint).
- **Údržba počítače** (od 261026): měsíčně 1. v měsíci, čtvrtletně velká kontrola → [[resources/postupy/udrzba-pocitace]].

## Pracovní kadence

- LCEnglish: newsletter 1x týdně v úterý (Drip = hlavní kanál; od 260928 zrcadlo Art for English i na Substacku) + social průběžně; placená reklama teď neběží (260929 — zvažuje se kampaň na 10x English)
- **Art for English = jeden úkol, jeden blok na celou epizodu** (hook, text, Drip, Substack, FB). Ve weekly review, v plánu ani na tabuli ho nedělit na „hook a preheader“ (Lenka 261025: blok 30 min na hook nestačil, #28 trvala 15:37–16:45). Paměť `feedback_lcenglish_episode_one_task`.
- tadylenka (přepsáno 260909): **1× Substack článek á 14 dní, pátek**, tři rotující rubriky — Ženy v obraze → Co vidíš? Tak vidíš! → Všichni svatí, dokola; 800–1200 slov. **Úspěch = pravidelnost, ne dosah ani počet odběratelů.** IG Stories příležitostně — upomínat Lenku po každé zmínce o výstavě, galerii, muzeu nebo kulturní akci. Podrobnosti (runway, content bank, pozdější fáze) → [[resources/postupy/growos]].

## GrowOS — jádro

- `GrowOS/` = samostatný marketing systém pro tadylenka, lcenglish a DigiStart (2.0 od 260906, DigiStart od 261014; co u DigiStartu žije v projektu a co v GrowOS → [[resources/postupy/growos]] „DigiStart: co kde žije“). Charta `GrowOS/AGENTS.md`; systémové cesty v GrowOS (`system/`, `.claude/`, `AGENTS.md`, `CLAUDE.md`) upravuje jen Lenka.
- **Jednotný postup výstupů (261019):** každý výstup = položka fronty GrowOS → Claude ukáže v chatu + nástěnka [[GrowOS fronta.base]] (`review`) → Lenka schválí (`approved`) → teprve pak Drip/Substack/Metricool/Leadpages → po vydání `published`. Žádné výjimky. Detail [[resources/postupy/growos]] („Jednotný postup výstupů“).
- **Rozdělení:** strategie, kadence a `#next-action` („připravit epizodu #NN“) žijí v `projects/` (publishing projekty); konkrétní výroba = work item v `GrowOS/<byznys>/work/` a jeho review fronta — kroky výroby do vault GTD nepsat.
- Po vydání → aktualizovat „Aktuální stav“ (a u A4E „Vydané díly“) v projektu + next-action advancement. Plný postup → [[resources/postupy/growos]].
