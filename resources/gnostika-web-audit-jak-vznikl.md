# Jak vznikla stránka GNOSTIKY o personálních a procesních auditech (261002)

Záznam jedné pracovní seance (cloudová relace Claude Code, 2. 10. 2026): zadání, podklady, použité nástroje, průběh úprav, rozhodnutí a poučení. Slouží jako paměť projektu [[projects/gnostika-web-audit]] a jako vzor, jak příště postavit podobnou stránku (viz také [[resources/postupy/prodejni-stranky]] a [[resources/navod-prodejni-stranka-s-ai]] pro DigiStart).

Časy jsou přibližné: podle časových razítek Leadpages (UTC) po převodu na středoevropský letní čas (+2 h).

---

## 1. Zadání

### Výchozí zachycení (omnibus, 260928)

> GNOSTIKA: návrh webové stránky s nabídkou personálních a procesních auditů pro další organizace (vzor = audit FEKT VUT, [[gnostika-fekt-audit]]); zároveň vyzkoušet skilly na tvorbu webů — blok pá 2. 10. 12:45–14:30.

### Upřesnění od Lenky na začátku seance

- **Cíl:** vytvořit (a případně upravovat) **koncept** stránky v Leadpages, který se ukáže Štěpánce Uličné k zpětné vazbě.
- **Podklady:** žádný hotový podklad ke stránce neexistuje. **Brand kit GNOSTIKA nemá.** Jediné vodítko: bordó barva v logu (logo je v patičce PDF nabídky pro FEKT). Webové stránky Štěpánky (gnostika.cz) stojí jen na její osobě, nabídka auditů tak stavět nemá.
- **Kdo mluví:** firma. Audity nemají stát na Štěpánce jako tváři (přesah i na Lenku). Varianta s lidmi může přijít později.
- **Co se nabízí:** personální a procesní audit včetně agend a kompetencí. Ukázka práce: nabídka pro FEKT VUT (PDF, 8 stran).
- **Pro koho:** instituce veřejné správy (školy, městské úřady a podobně).
- **Reference:** Štěpánka a GNOSTIKA jich mají hodně, zatím placeholder.
- **Akce:** domluvit konzultaci, kontakt = e-mail a telefon Štěpánky.
- **Charakter stránky:** digitální vizitka, která potvrzuje existenci firmy a nabídky. Neočekává se, že bude bodovat ve vyhledávání. Přijde na ni člověk po kontaktu nebo doporučení.
- **Hlas:** univerzální firemní, ale s trochou lehkosti, ne suchý korporát.

### Další upřesnění během práce (v pořadí, jak přišla)

1. První verze se nelíbila: „není moc sexy“, font a rozložení s hodně volného místa připomínají první verzi LC English („hodně AI“). Má být lidské, ale oslovovat organizace, a lišit se od mraku konkurentů. Najít jiné ukázky stránek o personálních auditech (česky i anglicky) a **nejdřív ukázat možnosti**, stavět až potom.
2. Z možností vybrána **varianta 2** („Víte, kdo u vás co dělá?“), s opravou slovosledu, **decentnější** (blíž variantě 3), ale s velkým písmem a zvýrazněním z varianty 2.
3. **Vykání v množném čísle** (oslovujeme organizaci). Nevycházet jen z FEKT (jde o vysokou školu), cílit na veřejné instituce obecně a vzít prvky z dalších stránek.
4. **Nezmiňovat** „bývalá tajemnice fakulty“ ani „letos vedla audity na VUT a ČVUT“. Nejde o Lenku, GNOSTIKA nestojí na ní. Případně až v sekci Tým, kde zatím jen placeholder.
5. Ilustrační věty typu „A co když Jana zítra skončí?“ jsou dobré: zlehčují vhodným způsobem a odliší od konkurence.
6. „kdo“ i „co“ v hlavním nápisu zvýraznit, aby se barevné bloky nad sebou neslily. Pak: nápis zúžit na dva řádky přes obě části hero, potom na **jeden řádek**, „kdo“ nakloněné doleva a „co“ doprava, a levý sloupec roztáhnout, aby pod tlačítkem nebyla díra.
7. Vypustit celou sekci „Rozhovory zůstávají důvěrné“.
8. Opravit pravopis („lidé ne“, „v každé organizaci“).
9. **Sdílení:** Štěpánka má vidět **stránku**, ne PDF (PDF jen jako doplněk). Chránit heslem, případně noindex.
10. Smazat zamítnuté verze A a B, opravit název na zamykací stránce.
11. Založit projekt, odškrtnout omnibus a vytvořit tento dokument.

---

## 2. Podklady a research

### Z vaultu

- [[projects/gnostika-fekt-audit]] (co je zakázka, tým, rozsah, harmonogram)
- omnibus (výchozí zachycení), [[resources/postupy/prodejni-stranky]] (postup tvorby a kontroly stránek, 9 bodů podle Bensona, „nic nevymýšlet“, placeholdery)
- hlasové profily ([[profil-osobni]] pro mail Štěpánce)
- GrowOS skill `landing-page-write` jsem **přečetla jako vodítko, nespustila** (GNOSTIKA není GrowOS business). Převzala jsem pravidla: nevymýšlet fakta, chybějící věci jako `[PLACEHOLDER]`, jedna hlavní akce.

### PDF „Nabídka audit FEKT VUT GNOSTIKA“

Použito: cíle auditu, metodika (dokumenty, rozhovory, analýza spolupráce mezi odděleními), výstupy (zpráva po odděleních, přehled doporučení s prioritami, podklady pro vedení, prezentace), fáze, tým a role, mlčenlivost, výběr referencí, kontakt (ulicna@gnostika.cz, +420 775 137 779), IČ 24821039, sídlo Jiráskova 135, 506 01 Jičín, **barvy loga** (bordó #9B224F, šedá #AAA9A9) a **samotné logo**.

### Webový research (jak se nabízí personální a procesní audit)

Vyhledávání + stažení stránek přes `curl` (vestavěný WebFetch byl blokovaný). Prošlo se: gnostika.cz (Štěpánka), Petr Kmošek, Dittmann Consulting, Performia, Stimul, Everesta, CPS HR (USA), TSERGAS (Kanada), Raftelis (USA). PwC (403) a Kompetenz People (nenačetlo se) se nepodařilo otevřít.

Co z toho plynulo:
- České nabídky jsou **zaměnitelné** („nezávislý pohled“, „komplexní závěrečná zpráva s doporučením“), popisují proces, ne co organizace zjistí. Vizuálně modrošedá korporátní šeď.
- **Spouštěče auditu** (Stimul, TSERGAS): nové vedení, reorganizace, úspory, potíže s neznámou příčinou, odchod klíčového člověka. Z toho sekce „Kdy se vyplatí podívat se pod pokličku“.
- **Rozdíl mezi předpisem a praxí** (TSERGAS, CPS HR) jako jádro sdělení.
- **Segmentace veřejných institucí** (Everesta): úřady a samospráva, školy, příspěvkové organizace. Z toho sekce „Pro koho audity děláme“.
- **Humor a lidský tón:** gnostika.cz („Proč objevovat Ameriku, když už byla objevena?“), Dittmann („intriky v kuchyňce“).
- Performia = testování jednotlivců (osobnostní testy), což je jiný produkt. GNOSTIKA audituje nastavení práce a procesy.

---

## 3. Použité nástroje

| Nástroj | K čemu | Poznámka |
|---|---|---|
| **Leadpages MCP** (`list_organizations`, `get_onboarding_status`, `list_brand_kits`) | zjištění účtu a brand kitů | účet Grow, jediný brand kit = LCEnglish (nepoužit) |
| Leadpages `create_page_draft`, `get_page_draft`, `edit_page_draft` | soukromé koncepty, čtení aktuální verze (i s Lenčinými úpravami v editoru), cílené úpravy | koncepty se vkládají jako celé HTML, úpravy jako náhrada textu |
| Leadpages `publish_page_draft`, `update_page_seo` (`robotsIndexable:false`), `edit_page`, `get_page`, `list_pages` | zveřejnění, vypnutí indexování, kontrola | heslo Lenka nastavovala sama v editoru |
| **Gmail MCP** `create_draft` | koncept mailu pro Štěpánku | přílohy se nepřipojily (viz poučení) |
| **Google Drive MCP** `search_files`, `get_file_metadata` | hledání složky „Štěpánka“ | nahrání PDF se neprovedlo (viz poučení) |
| `WebSearch`, `curl` | research konkurence a ověřování živé stránky z venku | WebFetch byl zablokovaný síťovou politikou prostředí |
| **Chromium + Playwright** (Node) | screenshoty (počítač, tablet, mobil), PDF z živé stránky | v prostředí předinstalované; fonty se musely dát lokálně |
| **poppler** (`pdftoppm`, `pdfimages`, `pdftocairo`, `pdfinfo`), **ImageMagick** | čtení PDF s nabídkou, zjištění barev loga, vektorové logo | |
| **Python** | zjednodušení křivek loga (Ramer–Douglas–Peucker, 56 kB → 8 kB), generátor HTML | |
| `SendUserFile` | posílání náčrtů a PDF Lence | karty se Lence ze scratchpadu neotevřely |
| Soubory vaultu | postup, projekt, omnibus, waiting-for | |

**Nepoužito:** Black_Magic (vyžaduje přihlášení, nebylo potřeba), Canva, GrowOS skilly jako příkazy, Impeccable.

---

## 4. Průběh úprav

### Krok 0 — příprava
Prohledán vault (poznámky ke GNOSTICE, postup prodejních stránek), přečtena nabídka pro FEKT, ověřen Leadpages (účet Grow, dostatek kreditů). Dohodnuto, co chybí, a otázky ke stavbě (kdo mluví, co se nabízí, pro koho, jedna akce).

### Krok 1 — první verze (cca 13:20)
Vytvořeny dva soukromé koncepty v Leadpages:
- **A (firemní)** a **B (s týmem)**, bordó z loga, serif nadpisy, hodně volného místa, jemné linky.
- Logo: z PDF nabídky vytažen vektor (barvy #9B224F a #AAA9A9), zjednodušen na ~8 kB a vložen inline.
- Texty vycházely z nabídky pro FEKT. Reference z její nabídky jen jako organizace, typ a rok, bez referenčních osob. Žlutě označená místa pro věci, které se nesmí hádat.

Ověřeno v Chromiu na počítači i na mobilu.

### Krok 2 — Lenčina reakce a research
Verze se nelíbila (nesexy, AI vzhled, moc volného místa, text jen z jednoho podkladu zaměřeného na VŠ). Probral se web konkurence a postaven **tři náčrty první obrazovky**:
1. *Poznámky na okraj*: tučné písmo, schéma oddělení s ručními poznámkami.
2. *Víte, kdo u vás co dělá?*: celé bordó, obří písmo, tři situace.
3. *Zpráva na stole*: teplé pozadí, list papíru se strukturou zprávy.

Při tom se ukázalo, že fonty se v prostředí nenačetly (spadly na výchozí patkové) a náčrty by vypadaly jinak. Fonty se stáhly lokálně a náčrty se přerenderovaly, teprve pak se ukázaly.

### Krok 3 — výběr a stavba konceptu C (cca 13:40)
Vybrána varianta 2, ale decentnější: teplé světlé pozadí (z varianty 3), velký tučný Archivo, bordó jen jako akcent, jedna tmavá sekce a bordó kontakt.
- Copy přepsáno obecně pro veřejné instituce, **vykání v množném čísle**, konkrétní situace s lehkostí.
- Struktura: hero (nápis + tři situace) → „Poznáváte se?“ → „Kdy se vyplatí podívat se pod pokličku“ → „Jak audit probíhá“ (5 kroků) → „Zpráva, se kterou se dá začít hned druhý den“ (ukázková strana) → [Rozhovory zůstávají důvěrné — později vypuštěno] → „Pro koho audity děláme“ → kontakt → patička.
- Tým jen jako placeholder, žádné „tajemnice fakulty“ ani „letos audity na VUT/ČVUT“.
- Vedlejší chyba, opravená hned: třída `.out` byla použita pro mřížku výstupů i pro tlačítko a roztahovala tlačítko, přejmenováno na `.outg`.

### Krok 4 — iterace nápisu a rozvržení
Každá změna se nejdřív vyzkoušela v lokální kopii (počítač 1280/1440, tablet 820, mobil 390) a pak se přenesla do Leadpages cílenými úpravami (`edit_page_draft`), aby se nepřepsaly Lenčiny vlastní úpravy v editoru:
1. **Dva řádky přes obě části** (nápis zasahuje nad seznam vpravo) → pak **jeden řádek** po Lenčině úpravě.
2. **„kdo“ −2°, „co“ +2,2°** (původně ~1°, „co“ vypadalo rovně).
3. **Levý sloupec** (úvodní text + tlačítko) se roztáhl do výšky pravého seznamu (větší písmo, tlačítko dole v rovině se spodní čárou).
4. Pevná velikost nápisu 105 px nahrazena pružnou (`clamp(54px, 8.2vw, 112px)`), na počítači vychází stejně a na mobilu se zalomí.
5. Smazána sekce „Rozhovory zůstávají důvěrné“, sekce „Pro koho“ dostala světlý béžový podklad kvůli rytmu stránky.
6. Pravopis: „lidé ne“, „v každé organizaci“.

Lenka průběžně upravovala texty přímo v editoru Leadpages (např. „Dvě oddělení dělají stejnou práci“, „Agenda nikomu nepatří“, „Zavolejte na…“, jméno Martin místo Jany u dovolené, odstranila věty o ceně a „Od vás potřebujeme“). Před každým zásahem se proto stránka znovu načetla.

### Krok 5 — zveřejnění pod heslem (cca 14:05–14:30)
1. Lenka schválila publikování a přijala krátké okno, kdy je stránka bez hesla.
2. `publish_page_draft` → URL na `lenka-dvorakova.lpcontent.net`, hned `update_page_seo` s `robotsIndexable:false` (v kódu `noindex, nofollow`).
3. Heslo nastavila Lenka v editoru. Z venku ověřeno `curl`em: adresa přesměruje na `/unlock`, obsah stránky se tam neprozradí (jen název stránky).
4. Zjištěno: **zamykací stránka ukazuje název z dashboardu**, ne titulek z HTML. Měla „… (koncept C) is protected“. Změnu názvu přes API bez přepsání celého HTML jsem nechtěla riskovat (mohlo by smazat heslo), takže stránku **přejmenovala Lenka v dashboardu** na „GNOSTIKA – audity (koncept)“.
5. Z náhledové adresy `lpcontent.net` vkládá Leadpages nahoru pruh „Preview page – not intended for live traffic“. Zmizí po připojení vlastní domény.

### Krok 6 — předání Štěpánce
- PDF z živé stránky (počítač 1280 px a mobil 390 px, každé jako jedna dlouhá strana, bez pruhu od Leadpages).
- Koncept mailu v Gmailu (tykání, podle osobního profilu): vysvětlení, odkaz, žádost o rozhodnutí u žlutých míst, tónu, kontaktu a loga. **Heslo zvlášť** na WhatsApp. Přílohy Lenka přiložila sama a mail odeslala.
- Smazány verze A a B v Leadpages. Dočasná složka s PDF ve vaultu odstraněna.

---

## 5. Klíčová rozhodnutí a proč

| Rozhodnutí | Důvod |
|---|---|
| Nejdřív ukázat možnosti (náčrty), pak stavět | první verze nesedla, levnější je změnit směr na náčrtu než na celé stránce |
| Stránka nestojí na jedné osobě | audity mají mít přesah i na další lidi, sekce Tým později |
| Veřejné instituce obecně, ne VŠ | FEKT je jen jedna zakázka, další organizace jsou úřady a města |
| Konkrétní situace s lehkostí | konkurence je zaměnitelná a suchá; „A co když Jana zítra skončí?“ je zapamatovatelné |
| Žádné nové údaje | nic nevymyslet (ceny, výsledky, jména) → `[placeholder]`, reference jen jako typ organizace |
| Koncept pod heslem + noindex | Štěpánka má vidět stránku, ne PDF, ale koncept s neodsouhlasenými údaji nemá být veřejný |
| Cílené úpravy místo přepisu | Lenka upravuje v editoru, přepsání celé stránky by smazalo její změny a mohlo smazat heslo |

---

## 6. Poučení a technické pasti

- **Leadpages:**
  - Soukromý koncept = `create_page_draft`, publikace jen na pokyn.
  - `edit_page_draft` / `edit_page` nahrazují přesný text, proto vždy nejdřív načíst aktuální HTML.
  - Zamykací stránka bere **název z dashboardu**. Titulek v HTML se nepřenese.
  - Na adrese `lpcontent.net` je pruh „Preview page“ a Leadpages odpovědi cachuje (≈60 s), změnu hesla nebo názvu zkoušet až po minutě.
  - Smazané stránky drží Leadpages 30 dní v Recently Deleted.
- **Síť prostředí:** vestavěný WebFetch byl blokovaný (po změně nastavení pořád), `curl` přes proxy fungoval. Chromium nenačetlo Google Fonts, fonty se musely stáhnout lokálně.
- **Soubory z cloudu:** PDF ze scratchpadu se Lence otevřít nepodařilo. Gmail i Google Drive konektor berou binární soubor jen jako text v Base64 (~0,5 MB znaků), což se do jedné odpovědi nevejde a hrozí poškození. Spolehlivé je stáhnout z konverzace nebo použít odkaz.
- **Screenshot samotného `.svg` souboru** v Chromiu vypršel, vykreslovat uvnitř HTML.
- **Logo z PDF** je vektorizované, pro koncept stačí, pro ostré nasazení chybí originál.
- **Pravopis a překlepy** hlídat po Lenčiných úpravách v editoru (zapsala „lidi ne“, „organizace“).

---

## 7. Stav k 261002

- Koncept C zveřejněný pod heslem, noindex, název „GNOSTIKA – audity (koncept)“.
- Čeká se na Štěpánku (follow-up 2026-10-07), otevřené body jsou v [[projects/gnostika-web-audit]].
- Odkazy: https://lenka-dvorakova.lpcontent.net/fFhdZ1PwT5 · editor https://leadpages.com/edit/cjuyzbzcc5zfpm50z02cubaj · slug `fFhdZ1PwT5`.

---

## 8. Jak to zopakovat (recept pro další stránku)

1. Přečíst podklady a postup [[resources/postupy/prodejni-stranky]]. Ujasnit: kdo mluví, pro koho, co přesně se slibuje, jedna akce.
2. Z existujícího materiálu vytáhnout fakta, logo a barvy. Co chybí, označit placeholderem.
3. Udělat research konkurence (vyhledávání + `curl`). Zapsat, co mají všichni stejně a čím se odlišit.
4. **Ukázat 2–3 náčrty první obrazovky** (skutečné fonty!) a nechat vybrat nebo kombinovat.
5. Postavit stránku jako **soukromý koncept**, každou změnu nejdřív vyzkoušet lokálně na počítači, tabletu a mobilu.
6. Lenka upravuje texty v editoru, Claude vždy znovu načte aktuální HTML a dělá jen cílené úpravy.
7. Pro sdílení: publikovat, **hned vypnout indexování**, Lenka nastaví heslo, ověřit z venku `curl`em, nastavit rozumný název stránky v dashboardu, poslat odkaz a heslo zvlášť.
8. Po zpětné vazbě: odstranit pruh a placeholdery, heslo, nastavit slug a doménu, záloha HTML do vaultu.
