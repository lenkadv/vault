# Postup: GrowOS ve vaultu

Přesunuto z `CLAUDE.md` 260926 (zkrácení hlavního návodu) — text beze změny. `CLAUDE.md` drží jen základní pravidla; Claude čte tenhle soubor při práci na lcenglish/tadylenka výstupech a publishing projektech.

GrowOS (`GrowOS/`) je samostatný marketing systém pro tadylenka, lcenglish a (od 261014) DigiStart.
**Od 260906 běží GrowOS 2.0** (migrace z 0.1 — viz [[growos-2-migration]]).


## DigiStart: co kde žije (261021)

DigiStart má od 261014 vlastní složku `GrowOS/digistart/` (třetí byznys vedle lcenglish a tadylenka). Rozdělení je stejné jako u ostatních byznysů, aby projekt a GrowOS mluvily spolu:

| Co | Kde | Proč |
|---|---|---|
| Stav, termíny, domluvy se Štěpánkou, `#next-action` | [[projects/digistart]] | GTD a denní plán čtou jen `projects/` |
| Publikum, hlas, nabídka a ceny, otevřená rozhodnutí o marketingu | `GrowOS/digistart/brain/` (`audience.md`, `voice.md`, `business.md`, `decisions.md`) | čtou je skilly GrowOS při psaní |
| Inspirace pro prodejní stránku, reklamy a kampaň (swipe) | `GrowOS/digistart/library/swipe-content.md` | do 261021 v `resources/digistart-swipe.md` (teď jen přesměrování) |
| Nápady na příspěvky a e-maily | `GrowOS/digistart/brain/ideas.md` | banka nápadů skillu `content-ideas` |
| Hotové výstupy ke schválení | `GrowOS/digistart/work/` (fronta) | jednotný postup výstupů |
| Obsah kurzu (osnova, podklady k lekcím, dovednosti MPSV, podmínky) | `resources/digistart-pilot-osnova.md`, `resources/digistart-podklady.md` a další `resources/digistart-*` | není to marketing, ale náplň kurzu |

- Persona: živá verze je `GrowOS/digistart/brain/audience.md`; sekce Persona v projektu je původní zadání (260915) a neaktualizuje se.
- Nový zdroj z newsletteru nebo jinde, který Lenka okomentuje pro DigiStart: obsah kurzu → `resources/digistart-podklady.md`, prodej a kampaň → swipe v GrowOS, nápad na příspěvek → `brain/ideas.md`.
- `GrowOS/digistart/brain/memory/MEMORY.md` odkazuje zpět na projekt a na soubory s obsahem kurzu.

## Kde otevírat sezení a jak jsou vidět skilly (260929)

- **Práce na lcenglish / tadylenka → otevřít sezení ve složce `GrowOS`.** Odtud jsou automaticky vidět skilly GrowOS i skilly a `CLAUDE.md` vaultu (Claude Code čte `.claude/skills` i v nadřazených složkách).
- **Sezení otevřené ve vaultu:** skilly GrowOS se načtou až ve chvíli, kdy Claude otevře nebo upraví soubor v `GrowOS/` nástrojem Read/Edit (čtení přes příkazový řádek to nespustí). Proto při práci na GrowOS z vaultu **nejdřív otevřít `GrowOS/AGENTS.md` nástrojem Read**. Tím se skilly GrowOS načtou a jde je spouštět i sám podle popisu. Pokud skill pořád chybí, přečíst jeho `GrowOS/.claude/skills/<jméno>/SKILL.md` a postupovat podle něj.

- **Položky do fronty (work items) zakládat jen v sezení otevřeném ve složce `GrowOS`** (261005): mimo ni neběží hlídač, který jim přidělí `id` a `status`, a fronta je nevidí (doktor hlásí „no status“). Opravit = založit položku znovu v GrowOS sezení. Zápis do `memory/` (disk C:) jde od 261006 i ze sezení v GrowOS — hlídač měl chybu (cestu na jiném disku bral jako byznys „C:“); Lenka ji opravila jedním řádkem v `GrowOS/system/tools/lib/paths.js` (`if (path.isAbsolute(rel)) return null;` nad `s = rel;` ve funkci `relSegments`). **Aktualizace GrowOS ji může přepsat** — když se paměť z GrowOS zase nedá zapsat, zkontrolovat ten řádek. Štítek „vault“ v hlavičce aplikace ukazuje git repozitář, ne složku sezení.

## Jak je 2.0 postavené

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

## Jednotný postup výstupů (od 261019, rozhodnutí Lenky)

Platí pro **všechno, co Claude pro GrowOS byznysy vyrábí** (lcenglish, tadylenka, DigiStart; newsletter, Substack, článek, příspěvek, prodejní stránka, reklama). Žádné výjimky, ať si Lenka nemusí pamatovat, co se dělá kde.

1. **Výstup = work item** v `GrowOS/<byznys>/work/<kanál>/` (u série podsložka dílu, např. `work/email/28-mucha/newsletter.md`). Podklady (brief, obrázky, research) zůstávají v `library/`. Hned po založení zkontrolovat razítko (`id`, `status: draft`) — bez něj ho fronta nevidí. Sezení musí běžet ve složce `GrowOS` a **nikdy nedělat `cd` do podsložek** (261019: tím hlídač tiše přestane razítkovat); vždy absolutní cesty.
2. **Před review lokální commit** Claudovy verze (pro porovnání úprav a lekce).
3. **`draft → review` + ukázat v chatu:** text (u krátkých věcí celý, u dlouhých shrnutí + odkaz) a odkaz na nástěnku [[GrowOS fronta.base]]. Kde je volba (úvod, titulek, subject), 2–3 varianty.
4. **Lenka upraví a schválí:** v Obsidianu, v chatu nebo v externím nástroji (Drip, Leadpages, Metricool). Úpravy z externího nástroje Claude přenese zpět do položky, ať je v ní vždy aktuální znění. Schválení = karta do `approved` nebo „schvaluju“ v chatu; změny = `changes` + poznámka.
5. **Až po `approved`** jde výstup ven: Drip (duplikát minulé kampaně v Chromu), Substack draft, Metricool koncept, Leadpages. Nic z toho dřív, ani jako koncept. Plánuje a zveřejňuje Lenka.
   - **Výjimka: Facebook DigiStartu je od 261021 v režimu `live`** (Lenka: „Ano, zapni u Facebooku DigiStartu režim live.“; `GrowOS/digistart/setup.md`, kanál social). Po `approved` Claude v chatu jednou větou potvrdí co, kam a kdy („Zveřejním X na stránce DigiStart v [den, čas], ano?“); čas navrhuje podle doporučení Metricoolu (`getBestTimeToPostByNetwork` na příštích 7 dní, Lenka 261021; ⚠️ v odpovědi je `dayOfWeek` 1 = **neděle**, 2 = pondělí … 7 = sobota, ověřeno proti kalendáři Metricoolu 261021; `value` je hrubé skóre, Metricool v kalendáři ukazuje totéž v procentech z nejlepší hodiny týdne), po „ano“ naplánuje příspěvek v Metricoolu ostře (`draft: false`, i s obrázkem), po vyjití ověří a posune na `published`. Do Metricoolu Lenka nechodí. Ostatní kanály a reklamy dál jen koncept / pozastaveno.
   - **Obrázky do Metricoolu (261021):** Lenka obrázky do Metricoolu ručně nenahrává (neschůdné). Metricool bere jen veřejnou adresu obrázku, soukromý soubor z Disku nepřevezme (Disk v Metricoolu propojený není). Postup: zapečetěný obrázek nahrát přes Leadpages konektor jako asset nepublikované stránky (`create_asset_upload` → `curl PUT` → `complete_asset_upload`; u DigiStartu stránka „C Obrazy (koncept)“, slug `yyk9wcADYO`). Veřejná adresa: `https://lenka-dvorakova.lpcontent.net/api/pages/<slug>/assets/<id>`, ta jde do `media` v Metricoolu. Metricool si soubor zkopíruje k sobě; ověřit SHA-256 kopie proti pečeti. `growos publish-stage` na Disku Google odmítá (počet odkazů na souboru 0), shodu textu a pečeti proto kontrolovat ručně proti `.snapshots/<id>.approved.md`.
6. **Po skutečném vydání** Claude ověří a posune `approved → published`; aktualizuje projekt ve vaultu (Aktuální stav, next-action advancement).
7. **Lekce:** porovnat commit z bodu 2 se schválenou verzí, opakující se úpravy do `brain/lessons/`.

Starší rozpracované věci (Art for English do #27, DigiStart koncepty v Leadpages ze 17. 10.) se dodělávají po staru; nové vznikají už takto.

## Hybrid: vault GTD vs GrowOS work fronta

- **`projects/lcenglish-art-for-english.md`, `projects/tadylenka-publishing.md`** drží
  strategii, kadenci, „Vydané díly", „Aktuální stav" a **`#next-action` = co vyrobit
  dál** (viditelné v [[next-actions]] přes 🌱 lcenglish / 🌱 tadylenka).
- **Konkrétní výroba** (napsat newsletter, carousel, recenzi) = **work item
  v `GrowOS/<byznys>/work/`**, prochází review frontou GrowOS. Jednotlivé kroky výroby
  se do vault GTD **nepíšou** — v projektu je jen `#next-action` na úrovni „připravit
  epizodu #NN".
- Po `published` → aktualizovat „Aktuální stav" v projektu + next-action advancement.

## Vlastní skilly (přenesené z 0.1, cesty na 2.0)

- `/drip` — Drip API pro LCEnglish (`DRIP_API_KEY` v `lcenglish/.env`). Vedle něj
  je připojený **Drip MCP** (od 260927) — totéž API; kterou cestu použít, volí Claude
  (typicky MCP na dotazy a zápisy, API na hromadná stahování do souborů).
  **Zakládání broadcastů jako draftů je vítaná pomoc** (skill `/drip` je v tomhle
  zastaralý — tvrdí read-only). Odesílá/plánuje Lenka ve webovém Dripu; odeslání,
  naplánování a mazání/odhlašování odběratelů jen po výslovném potvrzení.
  „Výsledná verze" od Lenky = už upraveno v Dripu, nezakládat duplicitní draft.
  **Od Drip release notes srpen–září 2026 (vyšly 14. 10. 2026)** umí MCP u single email
  kampaně i přiřadit uložený segment (`set_broadcast_audience`) a naplánovat odeslání
  (`schedule_broadcast`). Draft založený přes MCP má výchozí publikum „All people“, takže
  segment Newsletter je potřeba nastavit vždy. Naplánování přes MCP jen na Lenčino
  výslovné „naplánuj“ s konkrétním časem; obrázek (thumbnail) se přes MCP nahrát nedá.
  ⚠️ **Art for English ale přes `create_broadcast` nezakládat** (261019): vzniká kampaň v Custom HTML editoru se surovým kódem, ne v Text Builderu. Draft = duplikát minulé epizody v Chromu, viz `GrowOS/lcenglish/brain/lessons/0.1-lessons.md`.
  **Smyčka učení (260927):** Claude založí draft v Dripu a svou verzi (předmět,
  preheader, text, broadcast ID) uloží do `GrowOS/lcenglish/work/email/` → Lenka
  draft v Dripu doupraví a odešle → Claude přečte odeslanou verzi (`get_broadcast`),
  porovná se svou a opakující se úpravy (slova, délka, tón, struktura, předmět)
  zapíše do `GrowOS/lcenglish/brain/lessons/`. Kdy: jakmile Lenka řekne „odesláno“,
  jinak nejpozději na začátku přípravy dalšího newsletteru (dohnat všechny
  neporovnané). Jednorázovou úpravu nezobecňovat — lekce až z opakování nebo když
  je změna zjevně zásadová.
- **Úpravy Lenky v Obsidianu → učení (od 261012):** Claude před předáním draftu newsletteru (`library/episodes/NN-umelec/newsletter.md`) udělá lokální commit s jeho verzí. Až Lenka řekne „upraveno / finální“, porovná `git diff` s tím commitem (u více kol i mezi mezistavy) a zapíše pozorování do `brain/lessons/0.1-lessons.md`; zobecňuje jen to, co se opakuje. Úpravy rovnou v Dripu Claude přečte přes `get_broadcast` (viz smyčka učení výš). Lenčino „(doplň)“ v textu = pokyn pro Clauda. Před předáním zkontrolovat názvy časů a jiná odborná slova.
- `/metricool` — draft social postů + otevře Metricool v prohlížeči (potřebuje
  playwright MCP; bez něj copy-paste fallback).
- `/inbox-review` — Notion Content Inbox → `brain/ideas.md` (lcenglish) /
  `library/content-bank/` (tadylenka).
- `/review-exhibition` — recenze výstavy přes coach interview → `work/articles/`.
- `/last30days` — research (vlastní `~/.config`, na GrowOS nezávisí).

## LCEnglish Art for English — sync projektu

Po každém vydání epizody aktualizovat [[lcenglish-art-for-english]]:
1. Přidat epizodu do sekce **Vydané díly** (číslo, umělec, dílo, gramatika, datum)
2. Nahradit `#next-action` v sekci **Sekvence** konkrétní příští epizodou z curriculum
   (`GrowOS/lcenglish/brain/research/art-bites-curriculum-2026.md`)

Po dokončení newsletteru epizody zapsat skutečný čas do `C:\Users\Lenka\.claude\projects\G--M-j-disk-vault\memory\project_task_durations.md` — sekce "LCEnglish Art for English — epizoda". Formát: úkol, skutečný čas, poznámka (co zdrželo nebo proč bylo rychle), datum.

## Publishing projekty — sync Aktuální stav

Po dokončení každého publishing cyklu (poslední task označen ✅) okamžitě aktualizovat sekci **Aktuální stav** v projektovém souboru:
- `Poslední [typ výstupu]:` → nové datum a název výstupu
- `Další výstup:` → příští krok podle kadence

Platí pro všechny publishing projekty: [[tadylenka-publishing]], [[lcenglish-art-for-english]] a další.

## tadylenka — podrobnosti kadence

- Námět předem z runway v [[projects/tadylenka-publishing]] + banka `GrowOS/tadylenka/library/content-bank/` (pohled `Content Bank.base`, schéma `content-bank/_SCHEMA.md`).
- IG carousel a Substack Notes = **pozdější fáze**, ne teď. Zváží se při sprint review, až bude článková kadence zajetá.
- Recenze výstav a vlajkový esej běží nezávisle, bez rozvrhu (recenze navázané na studium).
- Cílové tempo, ne bič — laťka nízko schválně, při nárazu jiné práce se díl posune. Reálný čas na díl → `memory/project_task_durations.md`. Sezónní kalendář nárazů viz [[projects/tadylenka-publishing]].

## Kontrola brainu při zavírání GrowOS vlákna (261018)

GrowOS brain sám od sebe nedoplňuje a Doktor hlídá jen strukturu, ne zastaralý obsah. Proto při každém „zavírám“ ve vlákně, kde se pracovalo na byznysu v GrowOS (DigiStart, lcenglish, tadylenka):
1. `grep -n PLACEHOLDER` v `GrowOS/<byznys>/brain/*.md` a `setup.md` a projít i věty typu „neexistuje / zatím ne / not yet“.
2. Porovnat s tím, co se v sezení stalo nebo rozhodlo (založené účty, stránky, rozhodnutí Lenky). Co je zastaralé, rovnou opravit (fakta s datem a zdrojem); co je rozhodnutí, zapsat do `decisions.md` a smazat z „Open decisions“.
3. Stav work items: co Claude dodělal pro Lenku, posunout `draft → review`; co čeká na někoho jiného (Štěpánka), zůstává ve stavu a čekání jde do [[waiting-for]] (GrowOS stav „čeká na jiného“ nemá).
4. Na schvalování se Lenky při zavírání neptat (je unavená, nedělala by to). Rozhoduje ráno: denní plán vypíše sekci „Nové v GrowOS“ (jen položky nově nebo znovu v `review` od posledního plánu, každou jednou; schválené a naplánované ne, po odeslání ověřuje Claude tiše, 261019) a ona odpoví jednou větou, nebo přetáhne kartu na nástěnce [[GrowOS fronta.base]] (jen ze sloupce `review`). **Nástěnka = pohled typu `base-board` z komunitního doplňku Base Board** (nainstalován 261019, v2.6.1). Typ `kanban` je vestavěná nástěnka Obsidianu: zobrazí jen sloupce s položkami a ignoruje nastavení sloupců, názvu karty i otevírání (to byl stav 17.–19. 10.). Návod ve skillu `review-queue/board-view.md` uvádí ještě starý typ `kanban`.
5. Lence jednou větou: „Brain DigiStart doplněn: X, Y.“ ID účtů do `setup.md` jen po jejím potvrzení.

Vzniklo 261018: brain DigiStart den po založení FB stránky pořád tvrdil, že stránka neexistuje.

## Nový byznys: hlídání otevřených rozhodnutí (261014)

GrowOS `[PLACEHOLDER]` sám nehlídá. U každého nově založeného byznysu: sekce „Open decisions“ nahoře v `GrowOS/<byznys>/brain/decisions.md` (kdo rozhoduje), jeden `#next-action` v projektu ve vaultu, který na ni odkazuje, a poznámka v `brain/memory/MEMORY.md`, ať se čte na začátku práce. Rozhodnutí podávat Lence po jednom. Rozhodnuté zapsat jako dated entry, doplnit placeholder, řádek smazat. Paměť `feedback_growos_placeholders_hlidat`.
