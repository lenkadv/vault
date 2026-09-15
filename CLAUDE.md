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
daily/             ← denní záznamy (volitelné)
GrowOS/            ← marketing & content systém (GrowOS 2.0 — charta AGENTS.md)

zettelkasten/
   literature/     ← poznámky ze zdrojů (knihy, články, archiválie)
   permanent/      ← vlastní atomické myšlenky, propojené odkazy

gtd/
   next-actions.md ← konkrétní další kroky podle kontextu
   waiting-for.md  ← čekám od ostatních
   someday-maybe.md← nápady na později

assets/            ← obrázky a přílohy (sem míří drag & drop)
resources/         ← referenční materiály: MOC, clippings, lookup tabulky, zachycené metody — věci k použití, ne ke zpracování
```

## Areas

tadylenka, lcenglish, health, finances-admin, family, japanese, slepekure, studies, domacnost

### Co patří do areas/

Každý soubor v `areas/` má pevnou strukturu — jen tři věci:
1. **Definice** — jedna věta, co oblast je
2. **Aktivní projekty** — wiki-linky na projekty v `projects/`
3. **Klíčové trvalé odkazy** — nástroje, účty, kontakty specifické pro oblast

Do areas/ **nepatří**: tasky, stav projektů, postupy, resources.

### Údržba areas/

- Při založení nového projektu → přidám ho do příslušného areas/ souboru
- Při uzavření/přesunu projektu do someday/archive → odstraním ho z areas/
- Při změně standardu dohodnuté v konverzaci → okamžitě upravím areas/ ve stejné session

## Workflow: Zachytávání

1. Lenka zachytí myšlenku/úkol/odkaz na telefonu → uloží do Notion Note Inbox
2. Při práci u počítače: `/note-inbox-review` → Claude projde inbox a navrhne destinace
3. Důležité věci se zapíší do vault podle níže uvedených pravidel
4. Notion záznamy se přesunou do Archive Note Inbox

### Vstupní filtr pro Obsidian

Před každým uložením do Obsidianu: **K jakému konkrétnímu projektu nebo problému toto použiješ v příštích 3 měsících?**
- Odpověď konkrétní → uložit na správné místo
- Odpověď nejasná → Notion archiv stačí; do Obsidianu nic nejde
- „Chci to dál zpracovat, ale nevím jak" → Omnibus (jen výjimečně)

Výjimky:
- Akademické zdroje: projdou pokud jde o aktivní seminářku nebo bakalářku, nebo pokud Lenka explicitně chce zdroj v resources/
- Swipe: projdou pokud jde o formát nebo mechaniku s jasnou aplikací pro tadylenka nebo lcenglish

## Workflow: Resources

`resources/` jsou tematické klastry, ne hromadné seznamy. Každý soubor = jedno téma.

Formát záznamu v resources/:
- **Název zdroje** — autor (rok) — [odkaz]
  - Použij, až budeš řešit: [konkrétní problém]
  - [ ] #zettel Zpracovat: [[Název]] (jen pokud je myšlenkově silný)

Studies zdroje jdou do `resources/[téma].md`, ne do `areas/studies.md`.

## Task Management

### Kde tasky zapisovat

| Situace | Kam zapsat | Formát |
|---|---|---|
| Task patří k projektu tadylenka nebo lcenglish | Do souboru projektu v `projects/` | `- [ ] Popis #next-action` |
| Task patří k jinému projektu (health, studies…) | Do souboru projektu v `projects/` | `- [ ] Popis #next-action #context` |
| Task kontextový bez projektu | [[next-actions]] — správná sekce | `- [ ] Popis` |
| Task nejasný, nový, bez projektu | [[omnibus]] | `- [ ] Popis` |
| Task čeká na někoho jiného | [[waiting-for]] | `- [ ] Popis 📅 YYYY-MM-DD` |
| Projekt bez next action | Upozornit Lenku, nevymýšlet za ni | — |

### Formáty

**Projekt task — tadylenka / lcenglish** (zobrazí se automaticky v sekci 🌱 tadylenka / 🌱 lcenglish):
```
- [ ] Popis úkolu #next-action
```

**Projekt task — ostatní projekty** (zobrazí se automaticky v příslušné @sekci):
```
- [ ] Popis úkolu #next-action #online
- [ ] Popis úkolu #next-action #telefon
- [ ] Popis úkolu #next-action #doma
- [ ] Popis úkolu #next-action #venku
```
Context tag je povinný — bez něj se task v [[next-actions]] nezobrazí.

**Projekt task s deadlinem:**
```
- [ ] Popis úkolu #next-action #online 📅 YYYY-MM-DD
```
Pozor: deadline ≠ naplánovaný termín. Naplánovaný termín (konkrétní slot v čase) → Google Kalendář, ne 📅 tag.

**Waiting for** (v [[waiting-for]]):
```
- [ ] Čekám na X ohledně Y 📅 YYYY-MM-DD
```
Datum = kdy nejpozději se ozvat, pokud nepřijde odpověď.

[[waiting-for]] má dvě sekce:
- **Čeká na datum** — tasky bez projektu s deadlinem v budoucnosti; v [[next-actions]] se zobrazí automaticky 3 dny před termínem
- **Čeká na někoho** — čekám na odpověď/akci od jiné osoby

**Projekt task bez projektu s budoucím deadlinem** → do sekce "Čeká na datum" v [[waiting-for]], ne do next-actions.

**Kontextový task bez projektu** (přímo v [[next-actions]]):
```
- [ ] Popis úkolu
```
Patří pod správnou sekci: `## @online`, `## @telefon`, `## @doma`, `## @venku/pochůzky`.

### Jak se tasky zobrazují v GTD

[[next-actions]] má tyto automatické sekce (Tasks plugin):
- **🌱 tadylenka** — `#next-action` tasky ze souborů s "tadylenka" v cestě
- **🌱 lcenglish** — `#next-action` tasky ze souborů s "lcenglish" v cestě
- **@online / @telefon / @doma / @venku** — manuální tasky + automaticky tasky z ostatních projektů podle context tagu (`#online`, `#telefon`, `#doma`, `#venku`)
- **📚 Zettelkasten** — `#zettel` tasky z `resources/` a `zettelkasten/literature/`
- **⏰ Follow-upy** — tasky z [[waiting-for]] s deadlinem do 4 dnů

[[master-dashboard]] má širší Dataview přehled:
- Next actions z `projects/` (vč. publishing projektů). GrowOS 2.0 review fronta je
  samostatná — stav přes `node GrowOS/system/tools/growos.js doctor` nebo session-start
- Inbox ke zpracování
- Waiting for vše
- Projekty bez next action

### Google Kalendář

- Úkoly s konkrétním naplánovaným termínem (ne deadlinem) → Google Kalendář
- Před vytvořením eventu vždy potvrdit čas s Lenkou
- Přístup přes MCP nástroj, kalendář: `lnk.dvorakova@gmail.com`

### projects/ obsahuje jen živé projekty

- `projects/` = jen projekty s aktivní `#next-action`
- Projekt v someday → **smazat projektový soubor**, přesunout vše potřebné do someday záznamu (someday záznam musí být akční sám o sobě — bez dalších kliknutí)
- Projekt dokončen → přesunout do `archive/`, zkontrolovat a vyčistit stopy v `areas/`, `gtd/`, `inbox/`

### Next-action advancement — povinný krok při odškrtnutí

Kdykoli odškrtnu task s `#next-action` v projektovém souboru:
1. Odstraním `#next-action` (a context tag) ze splněného tasku — nebo celý řádek smažu
2. Přidám `#next-action` + správný context tag na **další logický task** ve stejném projektu
3. Pokud žádný další task neexistuje → projekt je buď hotový nebo čeká; upozornit Lenku

Toto platí vždy — i když task odškrtávám zpětně, i když ho odškrtávám v daily plan.

### Daily plan — tasky z projektů jsou reference, ne checkboxy

Tasky z `projects/` se v daily plan zapisují jako **plain bullet bez checkboxu** s wiki-linkem na projekt:
```
- Název tasku → [[název-projektu]]
```
Checkbox žije jen v projektovém souboru. Odškrtnutí = jdi do projektu, odškrtni tam + proveď next-action advancement.

Výjimka: ad-hoc tasky vzniklé přímo v daily plan (bez projektu) mohou mít checkbox.

### Zakázáno
- Nevytvářet standalone soubory pro jednotlivé tasky
- Nezapisovat tasky do README, komentářů v kódu ani náhodných poznámek
- Nezapisovat projekt tasky přímo do [[next-actions]] — tam patří jen kontextové věci bez projektu
- Projekt task bez `#next-action` tagu = neviditelný v GTD
- Kopírovat projekt tasky jako checkboxy do daily plan — jen reference s wiki-linkem

### Kdy použít který pohled

| Chci vědět… | Otevřu… |
|---|---|
| Co teď udělat (podle kontextu) | [[next-actions]] |
| Celkový stav všech projektů | [[master-dashboard]] |
| Co čeká na někoho (vše) | [[waiting-for]] |

## Workflow: Zettelkasten

⚠️ **Systém se od 260728 rozšířil** o vrstvy `vystupy/` (OUT — vlastní hotové texty), `topics/` (skutečné stránky na koncept, ne tagy) a `poznamky/` (POZ — atomické citace vázané na konkrétní zdroj+stránku+výstup), inspirované Source-Topic-Argument metodou a Notion databází Slepé kuře. LN nota má teď plné YAML frontmatter properties (`autor, nazev, typ, zdroj, rok, kde_najit, zotero, stav, tags, temata, pouzito_v`), ne bold-text řádky. **[[MOC – Zettelkasten]] je živá a autoritativní specifikace** — sekce níž popisuje jen původní/základní tok, při rozporu platí MOC.

Tok zpracování: `inbox/` → `zettelkasten/literature/` → `zettelkasten/permanent/` → akademický text

---

**Fleeting notes** → `inbox/`
- Rychlý záchyt myšlenky, odkazu, nápadu — z Obsidianu nebo z Notion
- Dočasné — zpracují se při Weekly Review nebo smažou
- Žádná forma, žádná povinná struktura

**Literature notes** → `zettelkasten/literature/`
- Jedna nota = jeden zdroj (kniha, článek, archiválie, webová stránka, Substack esej…)
- Platí pro všechny citovatelné zdroje — akademické i neakademické (Substack, online eseje apod.), pokud mají autora, datum a URL
- Název: `LN – {citekey}.md` — citekey přebírám z Zotera (BetterBibTeX), např. `LN – BlairMalesSecondarySex2026.md`
- Struktura:
  ```
  # LN – Název zdroje

  **Autor:** [[Jméno Autora]]
  **Zdroj:** Autor, Jméno. "Název." *Publikace*, Datum.
  **URL:** https://...
  **Zotero:** [otevřít v Zoteru](zotero://select/library/items/{itemKey})
  **Datum čtení:** YYMMDD
  **Tagy:** #anglicky #jen #anglické #tagy

  ## Souhrn
  (2–4 věty: o čem zdroj je, hlavní argument)

  ## Poznámky
  (organizováno podle kapitol/sekcí originálního textu)

  ### Název kapitoly (p. X)

  > "Přímý citát." (Autor, Rok, p. X)

  *→ Můj komentář nebo parafráze — vždy v kurzívě, na samostatném řádku po prázdném řádku*

  ## Otázky a reakce

  ## POZ notes, které z toho vzniknou
  ```
  Sekce zůstává prázdná při založení. `- [ ] #zettel Zpracovat: [popis]` se přidává jen dodatečně, a jen pokud je zdroj myšlenkově silný a nota (POZ nebo výjimečně PN) z něj má reálně vzniknout — ne jako automatický placeholder u každé LN noty (viz [[feedback_zettel_placeholder_flood]]).
  **`## Poznámky` je Lenčina volná čtecí zóna (260805)** — zapisuje tam za běhu čtení, se stránkou, bez rozhodování POZ/PN a bez překlikávání mezi soubory. Claude ji na vyžádání dávkově zpracuje do POZ notes (a nabídne kandidáty na PN, pokud narazí na syntetizující větu nepodloženou jednou citací) — nezpracovává se živě při čtení. Podrobně viz [[zettelkasten/MOC – Zettelkasten]].
- Tagy: vždy anglicky
- Autorský soubor: každý autor má vlastní `[[Jméno Autora]].md` v `zettelkasten/literature/` s přehledem děl
- Podsložky v `zettelkasten/literature/`: `authors/` jen pro skutečné autory citovaných pramenů (ti, co text napsali); `osoby/` pro subjekty archivního/pátracího výzkumu (portrétovaní, zmínění v pramenech — např. malíři, faráři, šlechta u Slepého kuřete). Nepatří do `authors/`, i když mají vlastní soubor.
- Zotero workflow: PDF anotovat v Zoteru → "Add Note from Annotations" → JSON se aktualizuje → Claude vygeneruje LN z anotací
- **Přepis anotací do LN noty musí být doslovný** — citáty i Lenčiny vlastní komentáře (`//` v Zotero notě) se přepisují beze změny, bez krácení a bez parafráze. Vlastní syntéza/interpretace patří výhradně do sekcí Souhrn a Otázky a reakce, nikde jinde v Poznámkách.
- Citace bez stránek (online zdroje): použít číslo odstavce nebo název sekce místo stránky
- Nikdy nevytvářet bez jasného zdroje (autor, název, rok)

**Permanent notes** → `zettelkasten/permanent/`
- Jedna nota = jedno tvrzení, jeden koncept (atomická myšlenka)
- Název: `YYMMDD-HHMM Název myšlenky.md`
- Struktura:
  ```
  # Název myšlenky
  **ID:** YYMMDD-HHMM
  **Tagy:** #téma
  ## Myšlenka (vlastní formulace, argumentativní)
  ## Proč na tom záleží
  ## Spojení s dalšími myšlenkami
  - [[PN – ...]]
  ## Vychází z
  - [[POZ – ...]]
  ```
  Necitovatelný podnět bez POZ/LN (podcast bez formální LN, rozhovor, e-mailová výměna) → sekce `## Podnět` s neformálním popisem místo `## Vychází z`.
- Vzniká buď mechanicky při reverse-engineeringu hotové práce (vlastní syntetizující věty vedle footnotovaných), nebo vzácně živě při čtení/procházení sítě — nikdy jako povinné rozhodnutí u každé jednotlivé poznámky. Podrobně viz [[zettelkasten/MOC – Zettelkasten]].
- Netřídit do podsložek — spoléhat na tagy a interní odkazy
- Nikdy nevytvářet jako shrnutí tématu — vždy jen jedno konkrétní tvrzení

**Pravidla pro zpracování:**
- Když Lenka řekne "zpracuj inbox", procházej soubory v `inbox/` a pro každý navrhni: přeformátovat jako literature note, vytáhnout permanent note, nebo smazat
- Při ukládání noty vždy zvážit: na které noty odkazuje? Do které area patří? Vzniká permanent note?
- Zettelkasten probíhá zpravidla **mimo `projects/`** — nový zdroj ze Zotera → LN nota s `#zettel` taskem → permanent notes. Project soubor vzniká jen pro nastavení nového procesu nebo specifický výstup (seminárka, článek).

## Workflow: Akademické psaní

- Zápisky ze studia → `zettelkasten/literature/` (ne do [[studies]])
- [[studies]] obsahuje pouze stav a přehled studia
- Při psaní textu: hledat relevantní permanent notes přes tagy → skládat argument z hotových not

## Workflow: Domácí knihovna

Sjednocený katalog všeho, co Lenka vlastní/má k dispozici ke čtení — fyzické knihy i elektronické zdroje — žije v Notion databázi **„📚 Knihovna"** (`https://app.notion.com/p/1b8aeae60bc68070ba54f3c5af9910dc`). Architektura (od 260810):

- **Notion „📚 Knihovna" = trvalý, appce-nezávislý index** nad fyzickými i elektronickými zdroji. Obsahuje jen metadata + krátkou synopsi (pole `Summary`), NE plný obsah LN zápisů — to by duplikovalo riziko, kterému se má vyhnout.
- **Obsidian LN (`zettelkasten/literature/LN/`) = jediný zdroj pravdy pro plný obsah** citovatelných zdrojů. Notion na LN jen odkazuje přes pole `Obsidian Note` (`obsidian://` deep link), nikdy obsah nekopíruje.
- **Handy Library (mobilní appka) = jednorázový sběrný nástroj**, ne systém záznamu. Slouží k fyzickému procházení polic (skenování kódů + ruční zadání u starších knih bez kódu). Po synchronizaci do Notionu její role u daných knih končí.
- **Bulk operace přes nativní CSV import/export v Notionu** (ručně, v Notion UI), nikdy přes Notion API volání po jednom řádku — drahé a pomalé pro stovky položek (viz [[feedback_bulk_notion_edits]]). Claude připraví CSV, Lenka ho sama naimportuje.
- Čtenářský deník (přečteno/hodnocení/dojmy) žije přímo v Notionu (`Read`, `Rating`, `My Review` + volný text v těle stránky) — ne jako samostatný Obsidian projekt.
- [[projects/domaci-knihovna]] = provozní projekt pro pokračující fyzický sběr (next-action).

## Workflow: Obrázky a přílohy

- Drag & drop obrázku do poznámky → Obsidian uloží do `assets/`
- Přejmenovat soubor v Obsidianu (ne ve Finderu/Průzkumníku) → odkaz v poznámce se aktualizuje automaticky
- Formát názvu: `YYMMDD-HHMM_kontext_popis.jpg` (např. `260503-1430_vojtěch_NA-AZK14-fol23r.jpg`)
- Zdroj fotek: Google Photos → stáhnout → drag & drop do poznámky → přejmenovat v Obsidianu
- **Výjimka — archivní fotky bez číslování stran:** přejmenovat na původní název z Google Photos (`PXL_YYYYMMDD_HHMMSS.jpg`) — zachová dohledatelnost zpět ke zdroji; `fol[X]` formát použít jen pokud jsou folia číslovaná

## Pravidla

- [[omnibus]] je jediný vstupní bod — nikdy přímo do areas/ nebo gtd/ bez zpracování
- Formát dat vždy YYMMDD (např. 260502 pro 2. května 2026)
- **Daily zápisy po půlnoci:** pokud je po půlnoci a Lenka ještě neoznámila konec dne ("jdu spát" apod.), veškerý zápis do `daily/` (Průběh dne, systémové změny, cokoli) patří do souboru **předchozího** dne, ne do dne podle systémového data. Platí vždy — při zavírání i při průběžných zápisech mimo skilly. Nikdy nezakládat nový `daily/{dnešní YYMMDD}.md` jen kvůli změně systémového data uprostřed pokračující seance. Viz [[feedback_daily_note_midnight]].
- [[next-actions]] nemá tvrdý limit položek, ale každá položka musí být konkrétní a akční
- GrowOS je samostatný systém (2.0) — při práci v GrowOS kontextu se řídit `GrowOS/AGENTS.md`
- Při přesunu položky kamkoliv (someday, resources, projekt, zettelkasten) vždy zachovat původní URL/zdroj — bez odkazu je položka v budoucnu nepoužitelná

## Systémové změny — jak je zapisovat

Kdykoli v konverzaci domluvíme nové pravidlo, postup nebo změnu systému:
1. **Okamžitě** — ještě v téže odpovědi — aktualizovat `CLAUDE.md` a/nebo příslušný soubor v `memory/`
2. Nečekat na "zavírám" ani na pokyn od Lenky
3. Při "zavírám" udělat kontrolu — co bylo dnes změněno? Vše zapsáno? → zapsat do daily note sekce **Systémové změny**

Toto pravidlo platí i samo pro sebe — je zapsáno zde, ne jen v paměti.

### Čištění next-actions — povinný krok na konci každé seance

Na konci každé seance (při "zavírám" nebo kdykoli je seance u konce) smazat všechny `[x]` položky z manuálních sekcí v [[next-actions]]. Automatické query bloky (`tasks`) se čistí samy — mazat jen plaintext checkboxy.

### Pokyn "zavírám"

Při zavírání sezení (Lenka řekne "zavírám", "končím" apod.):
1. **Projít konverzaci** — co bylo domluveno jako pravidlo nebo změna systému?
2. **Ověřit** — je každá změna zapsána v `CLAUDE.md` a/nebo `memory/`? Pokud ne → opravit.
3. **tadylenka content mining** — bylo v sezení tadylenka content (research, recenze výstavy, rozepsaný text, zajímavý zdroj)? Pokud ano → přidat jako námět do `GrowOS/tadylenka/library/content-bank/`, zařadit do rubriky, `status: fresh` (nebo `retired`, pokud spíš someday). Notes fronta je pozastavená (pozdější fáze) — do [[notes-candidates]] se nic nepřidává.
4. **Aktualizovat kalendář** — aktualizovat Todoist kalendář na skutečné časy pracovních bloků (start + end). Neuskutečněné bloky: buď rovnou přesunout na konkrétní termín, nebo smazat — žádný blok nesmí zůstat v minulosti jako neaktualizovaný. Do kalendáře patří reálná aktivita bez ohledu na to, jestli byla dopředu naplánovaná — pokud pro proběhlé sezení žádný blok neexistoval, založit nový (Todoist kalendář, Sage) se skutečným časem trvání sezení. Pokud Lenka čas nenahlásila, zeptat se.
5. **Zapsat daily note** — otevřít `daily/YYMMDD.md` (jeden soubor pro celý den: plán nahoře, zbytek — Průběh dne, Systémové změny — pod ním). **YYMMDD = den, kdy seance reálně probíhala, ne systémové datum.** Pokud je po půlnoci a Lenka ještě nešla spát (pokračující konverzace, žádné oznámení "jdu spát" nebo nový den), zápis pořád patří do souboru **předchozího** dne — viz [[feedback_daily_note_midnight]]. Append: shrnutí sezení, klíčová rozhodnutí, systémové změny. Pokud soubor neexistuje → vytvořit.
6. **Před potvrzením zkontrolovat**: byl `daily/YYMMDD.md` skutečně zapsán/aktualizován v tomto sezení? Pokud ne → vrátit se ke kroku 5.
7. **Potvrdit** Lence: "Systémové změny jsou zapsány, vault je aktuální."

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

- Otevře se ráno (`/daily-plan` nebo ekvivalent) a zůstává otevřené **celý den** jako primární místo pro sledování reality dne.
- Jeden soubor na den: `daily/YYMMDD.md`. `/daily-plan` do něj zapíše plán jako sekci nahoru; zbytek dne (Průběh dne, Systémové změny) se doplňuje pod ni ve stejném souboru — žádný samostatný `-plan.md`.
- Na začátku: upřesnění plánu.
- Průběžně: Lenka do téhož vlákna reportuje postup (hotovo, časy, odchylky) → zapisuje se do `daily/{YYMMDD}.md` sekce **Průběh dne**.
- Pokud úkol vyžaduje vlastní soustředěné vlákno (typicky delší práce na jednom projektu), řeší se kompletně tam — včetně vlastního uzavření podle pravidel v [[#Pokyn "zavírám"]].
- Denní vlákno se zavírá **jako poslední** v rámci dne: rekapitulace, jestli vše sedí, a formální uzavření (viz „Pokyn 'zavírám'").
- Toto uzavření může nastat kalendářně až po půlnoci — pořád patří do daily note **aktuálního, ještě neuzavřeného** dne, dokud Lenka neoznámí konec dne. Viz [[feedback_daily_note_midnight]].
- Výjimka: pokud vlákno omylem zůstane otevřené hluboko do dalšího dne bez formálního zavření, Lenka to při zavírání výslovně řekne.

## Pravidelné revize

**GTD weekly review + Weekly review ritual** — spouští se společně při `/weekly-review`, bez ptaní, vždy v tomto pořadí:
1. [[master-dashboard]] — rychlý přehled: co má next action, co nemá, co čeká
2. `projects/` — projít každý projekt: živý nebo do someday/archive? Next action aktuální?
3. [[next-actions]] — ruční sekce (@online, @telefon, @doma, @venku): hotové smazat, zbývající stále akční?
4. [[waiting-for]] — přišla odpověď? Blíží se follow-up?
5. [[someday-maybe]] — posunulo se něco do akce? Co je mrtvé?
6. [[omnibus]] — zpracovat zachycené položky po jedné
7. `areas/` — rychlá kontrola: jsou aktivní projekty v každé oblasti aktuální? Jsou "doplnit" položky stále relevantní nebo je vyčistit? Vždy se zeptat na stav seminářek v [[studies]] (vytvářet tlak, i když nemají projekty)
8. **Zettelkasten** — `#zettel` tasky v [[next-actions]]: relevantní pro aktuální seminářku nebo bakalářku? Pokud ano → `#next-action` do projektu
9. **tadylenka runway** — zkontrolovat, že runway v [[projects/tadylenka-publishing]] není prázdná (min. 2–3 díly dopředu). Pokud dochází → říct Lence, ať doplní dávku z `Content Bank.base` (pohledy podle rubrik, `status: fresh`). NEvybírat díl po dílu každý týden — runway se plní dávkově. (Notes fronta pozastavená — pozdější fáze.)
10. **Note Inbox review** — spustit `/note-inbox-review` a zpracovat Notion Note Inbox
11. **Archivace dailies** — přesunout všechny soubory z `daily/` (YYMMDD*.md) do `daily/YYYY-MM/` podsložky odpovídající jejich měsíci (např. `daily/2026-06/`), **kromě dnů otevřeného týdne** (pondělí aktuálního týdne až dnes) — ty zůstávají mimo měsíční složku, dokud týden neskončí. Automaticky, bez ptaní.
12. **Weekly review ritual** — navazuje bez ptaní: pohled zpátky na oblasti, reflexe (2-3 otázky), brain dump backlog, waiting-for přehled, kalendář příštího týdne, priority → uloží `weekly-reviews/YYMMDD-week-review.md` a `gtd/next-week-priorities.md`
    - Při sekci priorities: přečíst dailies za uplynulý týden (max 10), areas/ a projects/ — hodnotit strategicky, ne jen operačně. Prioritou jsou důležité-neurgentní věci. Nabídnout vlastní hodnocení, pak čekat na reakci.
    - Projects aktualizovat průběžně i při review — nejen next actions, ale celý stav a směřování.
    - Dailies psát tak, aby obsahovaly info použitelné při příštím review (rozhodnutí, momentum, strategické posuny).

**Zettelkasten review** (součást weekly review, ne samostatný ritual):
- `#zettel` tasky jsou viditelné v [[next-actions]] — zpracovat ty, které jsou relevantní teď
- Projít `zettelkasten/literature/` — které noty ještě nemají wiki-linky?
- Projít MOC soubory — přidat nové noty do mapy
- Projít `zettelkasten/permanent/` — jsou noty propojené navzájem?
- **Knihovna "knihy a články" (Google Disk) — kontrola přírůstků:** jeden cílený Drive dotaz `parentId = '1dy9tyD5wg0WFNZzXtxeoOorNlLo9XLk1' and createdTime > '<posledni_kontrola>'` (viz [[knihovna-disk-checklist]]). Nové soubory přidat jako nové řádky do checklistu a zpracovat v dávkách po 5 (postup viz [[HANDOFF – knihovna katalog]]). Po zpracování aktualizovat `posledni_kontrola` na dnešní datum. Nepoužívat plný výpis složky přes `parentId` bez filtru — nespolehlivé stránkování, viz handoff.
  - Tenhle check běží automaticky při weekly review, ale Lenka ho může kdykoli spustit i mimo něj pokynem **"zpracuj knihovnu"** — stejný mechanismus, jen mimo pravidelný cyklus.
- **Domácí knihovna — kontrola přírůstků:** Handy Library nemá s Notionem žádné propojení, nic sama automaticky nesynchronizuje — tohle je ruční kontrola, kterou dělá Claude nad Lenčinou existující zálohou. Zkontrolovat, jestli od posledního syncu přibyly nové LN soubory (`zettelkasten/literature/LN/`) nebo nové knihy v Handy Library (nová automatická/manuální záloha na Google Disk, `G:\Můj disk\HandyLibrary\`, kterou appka/Lenka průběžně pořizuje). Porovnat velikost nejnovějšího `handy_library_auto_backup_*_v2.zip` (nebo `manual_backup`) s poslední zkontrolovanou zálohou — shodná velikost = pravděpodobně nic nového; odlišná = pravděpodobně přibylo. Nehledat po celém Disku, rovnou `ls "G:\Můj disk\HandyLibrary"`. Detekce: LN podle cesty k souboru, fyzické knihy podle Handy Library interního `_id` (NE podle ISBN — starší knihy ISBN nemají). Přesný postup zpracování (CSV diff + obálky) viz [[HANDOFF – domácí knihovna obálky]], sekce "Přírůstky". Datum posledního syncu a počet přidaných položek zapsat do [[projects/domaci-knihovna]] sekce Průběh.

**Denní otvírací rituál** (každý den při sezení u počítače):
- Spustit `/daily-plan` nebo napsat „denní plán" / „naplánuj mi den"
- Skill přečte Google Kalendář, projde `projects/` pro `#next-action` tasky (vč. publishing projektů), zkontroluje [[next-week-priorities]]. GrowOS 2.0 review frontu bere zvlášť (session-start GrowOS nebo `growos.js doctor`)
- Výstup: `daily/YYMMDD.md` — plán (2–3 MITy v časových blocích + flexibilní seznam) jako sekce nahoře v dokumentu; pod ní zůstává/pokračuje zbytek dne (Průběh dne, Systémové změny)
- Kalendářní bloky z weekly review jsou základ — denní plán je upřesňuje, nevytváří od nuly
- Goals soubor: [[goals]] — kvartální směry, aktualizuje se při Quarterly Sprint

## Pracovní kadence

- LCEnglish: newsletter 1x týdně v úterý + reklama (průběžně) + social průběžně
- tadylenka (přepsáno 260909):
  - **Páteř: 1× Substack článek á 14 dní, tři rotující rubriky** — Ženy v obraze → Co vidíš? Tak vidíš! (text, ne carousel) → Všichni svatí, dokola. 800–1200 slov, vydání **pátek**. Námět předem z runway v [[projects/tadylenka-publishing]] + banka `GrowOS/tadylenka/library/content-bank/` (pohled `Content Bank.base`, schéma `content-bank/_SCHEMA.md`).
  - **Úspěch = pravidelnost, ne dosah ani počet odběratelů.** Nehodnotit podle dosahu.
  - IG carousel a Substack Notes = **pozdější fáze**, ne teď. Zváží se při sprint review, až bude článková kadence zajetá.
  - IG Stories příležitostně — upomínat Lenku po každé zmínce o výstavě, galerii, muzeu nebo kulturní akci.
  - Recenze výstav a vlajkový esej běží nezávisle, bez rozvrhu (recenze navázané na studium).
  - Pořád platí: cílové tempo, ne bič — laťka nízko schválně, při nárazu jiné práce se díl posune. Reálný čas na díl → `memory/project_task_durations.md`. Sezónní kalendář nárazů viz [[projects/tadylenka-publishing]].

## GrowOS

GrowOS (`GrowOS/`) je samostatný marketing systém pro tadylenka a lcenglish.
**Od 260906 běží GrowOS 2.0** (migrace z 0.1 — viz [[growos-2-migration]]).

### Jak je 2.0 postavené

- **Charta je `GrowOS/AGENTS.md`** (CLAUDE.md tam jen odkazuje). Při práci v GrowOS
  kontextu se řídit `AGENTS.md` a `system/standards/`.
- Znalosti byznysu žijí v `GrowOS/<byznys>/brain/` (business, audience, voice, brand,
  plan, competitors, compliance, methodology, ideas, decisions + složky proof/,
  stories/, samples/, research/, assets/, lessons/, inbox/).
- Hotové kusy vznikají jako **work items** v `GrowOS/<byznys>/work/<kanál>/` — jeden
  `.md` se štítkem a stavem `draft → review → changes → approved → published`. To je
  **review fronta GrowOS**, oddělená od vault GTD.
- `GrowOS/<byznys>/setup.md` — per-kanál nastavení. Vše `route: manual` + `safe-state`,
  nic není `live`. Tajemství jen v `GrowOS/<byznys>/.env` (Claude má blokované čtení),
  MCP klíče v `GrowOS/.mcp.json`.
- **Guard hooky** blokují Claudovi editace `GrowOS/system/`, `.claude/`, `.agents/`,
  `AGENTS.md`, `CLAUDE.md` a zápis do cizí byznys složky. **Systémové změny v těchto
  cestách dělá Lenka sama.**

### Hybrid: vault GTD vs GrowOS work fronta

- **`projects/lcenglish-art-for-english.md`, `projects/tadylenka-publishing.md`** drží
  strategii, kadenci, „Vydané díly", „Aktuální stav" a **`#next-action` = co vyrobit
  dál** (viditelné v [[next-actions]] přes 🌱 lcenglish / 🌱 tadylenka).
- **Konkrétní výroba** (napsat newsletter, carousel, recenzi) = **work item
  v `GrowOS/<byznys>/work/`**, prochází review frontou GrowOS. Jednotlivé kroky výroby
  se do vault GTD **nepíšou** — v projektu je jen `#next-action` na úrovni „připravit
  epizodu #NN".
- Po `published` → aktualizovat „Aktuální stav" v projektu + next-action advancement.

### Vlastní skilly (přenesené z 0.1, cesty na 2.0)

- `/drip` — Drip API pro LCEnglish (`DRIP_API_KEY` v `lcenglish/.env`). Broadcasty
  read-only, odesílá se ve webovém Dripu. „Výsledná verze" od Lenky = už upraveno
  v Dripu, nezakládat draft.
- `/metricool` — draft social postů + otevře Metricool v prohlížeči (potřebuje
  playwright MCP; bez něj copy-paste fallback).
- `/inbox-review` — Notion Content Inbox → `brain/ideas.md` (lcenglish) /
  `library/content-bank/` (tadylenka).
- `/review-exhibition` — recenze výstavy přes coach interview → `work/articles/`.
- `/last30days` — research (vlastní `~/.config`, na GrowOS nezávisí).

### LCEnglish Art for English — sync projektu

Po každém vydání epizody aktualizovat [[lcenglish-art-for-english]]:
1. Přidat epizodu do sekce **Vydané díly** (číslo, umělec, dílo, gramatika, datum)
2. Nahradit `#next-action` v sekci **Sekvence** konkrétní příští epizodou z curriculum
   (`GrowOS/lcenglish/brain/research/art-bites-curriculum-2026.md`)

Po dokončení newsletteru epizody zapsat skutečný čas do `C:\Users\Lenka\.claude\projects\G--M-j-disk-vault\memory\project_task_durations.md` — sekce "LCEnglish Art for English — epizoda". Formát: úkol, skutečný čas, poznámka (co zdrželo nebo proč bylo rychle), datum.

### Publishing projekty — sync Aktuální stav

Po dokončení každého publishing cyklu (poslední task označen ✅) okamžitě aktualizovat sekci **Aktuální stav** v projektovém souboru:
- `Poslední [typ výstupu]:` → nové datum a název výstupu
- `Další výstup:` → příští krok podle kadence

Platí pro všechny publishing projekty: [[tadylenka-publishing]], [[lcenglish-art-for-english]] a další.
