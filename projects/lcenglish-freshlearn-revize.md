# LCEnglish – revize kurzů ve FreshLearn

**Oblast:** [[areas/lcenglish]]
**Zahájeno:** 261025
**Zdroj:** vlákno „publicspeaking.cz bez WordPressu“ ([[kontext-ukolu]], sekce „Weby mimo WordPress“, záznamy 261025 13:15–13:45)
**Odkazy:** škola https://kurzy.lcenglish.cz · administrace https://app.freshlearn.com · osnovy Teachable [[lcenglish-teachable-osnovy-261025]] · mapa systémů [[lcenglish-ekosystem]] · nákupy [[resources/hele-funnel]]

## Aktuální stav

261027 13:52: Portál studentů je česky (oprava 18): chybějících 333 popisků doplňuje vlastní skript `lce-cestina` v Custom Script → Member Portal, protože editor překladů ve FreshLearn je za tarifem No Brainer Plus. Slovník a postup úprav: [[freshlearn-preklady-portalu]]. Tlačítka jsou cihlová #B23A12 a pozadí papírové (vlastní CSS). Lenka portál prošla (13:47): česky vše, přepínač jazyka ukazuje „Čeština“ (skript `lce-jazyk`). Projekt nemá vlastní next action. Dál čeká oprava 16 (VIP termíny, s rozhodnutím o AI Sborovně v [[next-actions]]). 30. 11. 2026 požádat Teachable o smazání školy ([[waiting-for]]).

## Co to je

FreshLearn (`kurzy.lcenglish.cz`) je od prosince 2023 jediná kurzová platforma LCEnglish. Cíl: soupis všeho, co tam je, vyhodnocení (rozbité, zastaralé, duplicitní, co chybí proti Teachable), opravy se schválením Lenky a nakonec rozhodnutí o zrušení staré školy na Teachable.

Pravidla:
- Přihlašuje se Lenka sama, Claude přihlašovací údaje nezadává.
- Opravy jen po schválení Lenky. **Nic se nemaže bez jejího výslovného souhlasu.**
- Nákupní cesta: prodejní stránka → FAPI → fapipi → Drip + Shadowloop + FreshLearn (fapipi drží Vítek; mapování kurzů v jeho repozitáři neověřeno, ověřené jen HELE = kurz 157241 / plán 22289).

## Next actions

Žádost o smazání Teachable je ve [[waiting-for]], oprava 16 patří k rozhodnutí o AI Sborovně ([[next-actions]]).

## Soupis (FreshLearn, 261025)

Načteno přes administraci (Lenka přihlášená), 10 kurzů, žádné jiné typy produktů. Videa jsou nahraná přímo ve FreshLearn (`freshlearn-vod-cdn`, `freshlms-cdn`), soubory ke stažení ve FreshLearn (`download-content-cdn`).

| ID | Kurz | Stav | Cena (FL) | Moduly / lekce | Veřejná stránka ve FL | Nákup | Teachable |
|---|---|---|---|---|---|---|---|
| 157241 | Angličtina s příběhem (pro začátečníky) = HELE | zveřejněný | 5 970 Kč | 21 / 76 (2 nezveřejněné: Finale, Episode 17+) | `/hele` → ⚠️ tlačítka na SimpleShop `7JED` | FAPI → fapipi (ověřeno 261001) | 74 lekcí, sedí |
| 157254 | 10x ENGLISH | zveřejněný | 1 270 Kč | 11 / 112 | `/10xe` → FAPI a lcenglish.cz | FAPI (odhad: přes fapipi) | 112 lekcí, sedí |
| 157293 | NAUČTE SE UČIT ANGLICKY | zveřejněný | 2 970 Kč | 8 / 38 | `/naucte-se-ucit-anglicky` → ⚠️ SimpleShop `3Ylq` | žádný aktivní (SimpleShop archivován) | 38 lekcí, sedí |
| 157303 | Webináře, které prodávají | zveřejněný, skrytý v katalogu | 3 970 Kč | 11 / 49 | `/webinare-ktere-prodavaji` | nezjištěno | 45 lekcí; FL má navíc 4 lekce, ty jsou **prázdné** |
| 157314 | Nastartujte vlastní online kurz | zveřejněný, skrytý v katalogu | 3 970 Kč | 6 / 13 | `/nastartujte-vlastni-online-kurz` | nezjištěno | v knihovně Teachable není |
| 167515 | AI Sborovna | zveřejněný | 970 Kč (katalog „od 790“) | 12 / 38 (9 nezveřejněných, 2 prázdné moduly) | přímá pokladna FreshLearn | pokladna FL | – |
| 170914 | AI Sborovna VIP | zveřejněný | 970 Kč | 2 / 7 | přímá pokladna FreshLearn | pokladna FL | – |
| 171466–8 | TEST Produkt lifetime / Upsell / subs | koncept | 100 / 500 / 600 Kč měs. | po 1 prázdné lekci | – | – | – |

Statistika administrace: 686 členů, 1 041 zápisů, tržby celkem 1 890 620 (měna neuvedena, odhad Kč).

Jen na Teachable (ve FreshLearn není):
- **Mluvte anglicky bez obav** (3 běhy 2017, 50 lekcí, kurz projevu v angličtině).
- **Předložkový minikurz** (zdarma, 3 videa: Sbíráme, Třídíme, Opakujeme; Lenka v něm není zapsaná). Odkazuje na něj lekce 5.2 v Naučte se učit anglicky.
- 5 anglických kurzů cizího autora (Primal Video), ty nejsou produkt LCEnglish.

## Vyhodnocení

**Funguje:** osnovy 10x ENGLISH, HELE a Naučte se učit anglicky jsou ve FreshLearn celé, videa a audio běží z FreshLearn, „Ke stažení“ u všech 10 sad 10x ENGLISH (texty + nahrávky 80 % a 100 %), Dropbox balíčky Anki u HELE „Materiály ze všech epizod“ odpovídají (200).

**Rozbité:**
1. ⚠️ **Úložiště Teachable v textu lekcí** (`cdn.fs.teachablecdn.com`, neplatný certifikát, prohlížeč nenačte; ověřeno v editoru FreshLearn, 91 adres):
   - HELE „Co je Anki a jak se s ním učit slovíčka“: **27 obrázků návodu** chybí, „Našli jste chybu…“ 1 obrázek.
   - HELE x.4 „materiály k procvičování“ (17×): odkazy „EnnEN.apkg / EnnCZ.apkg“ v textu jsou mrtvé; u 15 epizod jsou stejné soubory níž v sekci ke stažení, takže stačí odkaz v textu odstranit nebo přesměrovat.
   - ⚠️ **HELE 7.4 a 10.4 nemají ve FreshLearn žádné soubory**: chybí balíčky Anki (EN, CZ) i texty (Text.pdf, TextP.pdf). Na Teachable jsou (`uploads.teachablecdn.com`, funguje).
   - Naučte se učit anglicky: 8 obrázků v „Naučte se mluvit… s Shadowloop“, 1 v „2.1 Klasické knížky“; odkazy na PDF a tabulky v textu (Stínování, Souhrny 1.6–5.3, Jak dál) mrtvé, soubory jsou ale ve FreshLearn ke stažení.
   - Webináře: odkazy na PDF v textu mrtvé (soubory ve FL jsou), 2 obrázky v „Záznam úvodního webináře“.
   - 10x ENGLISH: v každé ze 100 lekcí malá ikonka (26 px) z Teachable, kosmetické.
2. **Prodejní stránky ve FreshLearn:** `/hele` a `/naucte-se-ucit-anglicky` mají tlačítka na SimpleShop (archivovaný, „Prodej skončil“). `/10xe` je v pořádku (FAPI).
3. **Mrtvé externí odkazy:** `kurzy.publicspeaking.cz/p/predlozkovy-minikurz` (NSUA 5.2), `lights-camera-english.com` (doména neexistuje; NSUA 1.2 YouTube, 1.5 Seriály), `goo.gl` (zkracovač Google; 1.1 Podcasty a Stínování vedou na Google dokumenty, které vracejí 410, odhad: smazané nebo neveřejné; „Jak dál“ `goo.gl/iiX9KU` 404).
4. **Prázdné lekce:** Webináře – Software pro nahrávání/editaci videí, Kurzové platformy, Organizace práce, Technické vybavení (zveřejněné, bez obsahu). AI Sborovna: 7 nezveřejněných prázdných lekcí a prázdné moduly Matematika, Společenské vědy (studenti nevidí, nevadí).

**Zastaralé:** e-mail `lenka@publicspeaking.cz` ve Webinářích (funguje, přeposílá), doporučení SimpleShopu a Teachable v „Přijímání plateb“ a „Kurzové platformy“ (Webináře, Nastartujte), `ytmp3.cc` (dnes přesměrovává jinam), patička katalogu „© 2023“, text „Shadowlooop“ (překlep v HELE), katalog AI Sborovna „od 790 Kč“ vs. cena 970 Kč (odhad: druhý plán; neověřeno).

**Duplicitní:** TEST produkty (3 koncepty), dvojí „fb_texty.pdf“ ve Webinářích (2 lekce, záměr?). Mezi kurzy duplicity nejsou.

## Opravy

Stav: **návrh** = čeká na Lenku · **schváleno** · **hotovo**. Nic se nemaže bez výslovného souhlasu.

| # | Oprava | Kdo | Stav |
|---|---|---|---|
| 1 | HELE 7.4 a 10.4: stáhnout z Teachable 4 soubory každé epizody (Anki EN, CZ, Text.pdf, TextP.pdf) a nahrát do FreshLearn | Claude | **hotovo** 261025 (obě lekce 4 soubory, ověřeno) |
| 2 | HELE x.4 (17 lekcí): mrtvé odkazy v textu na .apkg nahradit větou „soubory najdete níže ke stažení“ | Claude | **hotovo** 261025 (název souboru zůstal jako text, na konci věta „Všechny soubory najdete níže ke stažení.“) |
| 3 | HELE „Co je Anki“: 27 obrázků návodu stáhnout z Teachable a nahrát do FreshLearn; + 1 obrázek v „Našli jste chybu“ | Claude | **hotovo** 261025 (pořadí ověřeno podle textu u každého obrázku) |
| 4 | Naučte se učit anglicky a Webináře: mrtvé odkazy v textu na PDF přesměrovat na kopie ve FreshLearn; 9 + 2 obrázky z Teachable přenést | Claude | **hotovo** 261025 (13 lekcí, 17 odkazů; obrázky Shadowloop 8, Klasické knížky 1, úvodní webinář 2) |
| 5 | 10x ENGLISH: ikonku z Teachable ve 100 lekcích odstranit | Claude | **hotovo** 261025 (bylo to malé logo Shadowloop za větou „…v aplikaci Shadowloop.“; jde vrátit, logo je teď ve FreshLearn) |
| 6 | Prodejní stránky `/hele` a `/naucte-se-ucit-anglicky` ve FreshLearn | Lenka rozhodla 14:40, Claude provedl | **hotovo** 261025: HELE 5 tlačítek → `https://lcenglish.cz/hele/`; Naučte se učit anglicky 5 tlačítek → `https://lcenglish.cz/kurzy/`, odkaz v nadpisu „Díky kurzu NAUČTE SE UČIT ANGLICKY“ zrušen (nadpis tím ztratil velké písmo), kurz skrytý z katalogu („Make Public“ vypnuto, zapsaní studenti přístup mají). Prodej NSUA zatím ne. Blok „Plán kurzu“ na stránce NSUA přepnut z kurzu Nastartujte na NAUČTE SE UČIT ANGLICKY (15:10, Lenka „ano“). |
| 7 | Mrtvé externí odkazy a Předložkový minikurz | Lenka rozhodla 15:05, Claude provedl | **hotovo** 261025 v Naučte se učit anglicky: 1.2 YouTube a 1.5 Seriály → stejné články na lcenglish.cz; Stínování a Jak dál: věta o online tabulce (goo.gl, Google tabulka už neexistuje) vypuštěna, zůstává „Stáhněte si ji ve formátu Excel“; 1.1 Podcasty: řádek o výběru podcastů (dokument neexistuje) a prázdné „Odkazy:“ vypuštěny; 1.4 Audioknížky: ytmp3.cc vypuštěno; 5.2: odkaz na minikurz i úvodní věta, která do něj zvala, vypuštěny (text pod videem je teď prázdný). Minikurz: 3 videa stažená na Disk, do FreshLearn nepřenesen. |
| 8 | Webináře: 4 prázdné lekce skrýt (zrušit zveřejnění), ne mazat | Claude | **hotovo** 261025 (stav Draft) |
| 9 | Záloha kurzu Mluvte anglicky bez obav z Teachable na Disk | Lenka „ano“ 15:10, Claude provedl | **hotovo** 261025: `Zálohy webů/Teachable 261025/Mluvte anglicky bez obav/` = 32 videí (`videa/`, 31 z běhu 2018 + jiné úvodní video z běhu 3–4/2017; délky ověřeny proti osnově), 25 příloh (`prilohy/`: checklisty M1–M8, šablona, 13 MP3, obrázek) a soubor s osnovou a texty lekcí; celkem ~1 GB. Běhy 10–11/2017 a 3–4/2017 mají stejnou osnovu i přílohy, zálohován jeden (odhad: i videa stejná, liší se jen úvodní, to je uložené). |
| 10 | Drobnosti v textech | Lenka rozhodla 16:00, Claude provedl | **hotovo** 261025: „Shadowlooop“ → „Shadowloop“ (název lekce v HELE); patička „© Lights Camera English 2023“ → „© LCEnglish“ a odkaz „Zpátky na web LCEnglish“ na stránkách Home, 10x ENGLISH (měla „© LCEnglish 2025“), HELE, Naučte se učit anglicky a All Courses. Beze změny (Lenka): archivní Webináře a Nastartujte (e-mail lenka@publicspeaking.cz funguje, dobové tipy na nástroje); stránky Webináře, Nastartujte, Obchodní podmínky a Ochrana osobních údajů mají patičku „© Lenka Dvořáková 2023“, nechány. |
| 11 | TEST produkty (3 koncepty) | Lenka | **nechat** (Lenka 16:00) |
| 12 | Zrušení Teachable | Lenka | **zatím ne** (Lenka 16:00): škola běží na bezplatném tarifu, nic nestojí; vše podstatné zazálohované. Viz next action. |
| 13 | Přihlašovací stránka: popisek „Pamatujte si mě“ u šoupátka je neviditelný (barva textu #1A1416 = barva pozadí). Nastavení Theme → Text colour je společné pro celý portál, změna by rozbila světlé stránky; Custom Script „Member Portal“ se načítá až po přihlášení; náhled v editoru popisek ukazuje světle (chyba FreshLearn). Varianty: A napsat podpoře FreshLearn, B pozadí přihlášení na papír #F7F1EA, C nechat | Lenka vybrala B 20:37, Claude provedl | **hotovo** 261025: Settings → Member Portal → Customise portal → Theme → „Login and sign-up background“ #1A1416 → #F7F1EA, Save changes. Ověřeno živě na stránce obnovy hesla (stejná šablona): pozadí #F7F1EA, text #1A1416. |
| 14 | 10x ENGLISH, Úvod „Stínování“: věta s odkazem na online tabulku (Google, 410) vypustit, nechat Excel (jako NSUA) | Lenka „ano“ 20:40, Claude provedl | **hotovo** 261025: odstavec s odkazem vypuštěn, věta „Nebo si tabulku stáhněte ve formátu Excel.“ → „Tabulku si stáhněte ve formátu Excel, najdete ji níže ke stažení.“; 2 videa a 2 soubory zůstaly |
| 15 | Překlepy: HELE 7, 10x ENGLISH 4, AI Sborovna 8 (seznamy v mapách kurzů) | Lenka „ano“ 20:40, Claude provedl | **hotovo** 261025: 21 oprav v 15 lekcích (HELE 7, 10x ENGLISH 3, AI Sborovna 11 včetně „:Dávej mi…:“ → „„Dávej mi…““). **Neopraveno 10x 2.4** „You want give blood too?“ (nahrávka může větu říkat takto, neověřeno poslechem). Opraveno jen v textu lekcí; PDF ke stažení a balíčky v Shadowloop mají původní znění. |
| 17 | Portál po přihlášení: růžové pozadí stránek (#FCEDF1). FreshLearn ho odvozuje z barvy tlačítek, v nastavení vzhledu na něj pole není („Page background“ v Menu and products mění jen profilovou kartu vlevo, ověřeno v náhledu bez uložení). Návrh: vlastní CSS v Settings → Custom Script → Member Portal (načítá se po přihlášení) → pozadí papír #F7F1EA, zvýraznění papír tmavší #EFE6DB | Lenka „ano“ 20:49, Claude provedl | **uloženo** 261025 20:51: Member Portal zapnuto, In Head Section: `<style id="lce-paper">` (proměnné `--c-brand-soft` → #EFE6DB, `--c-brand-line` → #E2D6C8, `.mp-shell, .page-body-wrapper` → #F7F1EA) + stejný styl přes `<script>` pro jistotu. Vyzkoušeno v kartě před uložením (knihovna i kurz bez růžové). ⚠️ **Nefunguje** (ověřeno 20:53–20:55 po Lenčině novém přihlášení): v administraci uloženo a zapnuto, ale portál ho nenačte ani na kurzylce.freshlearn.com, ani na kurzy.lcenglish.cz/member (portál běží i tam). Profil, který si portál stahuje, má `showCustomScriptCode: false` a prázdný kód; veřejné API přihlášení vrací `companyProfileDTO: null`. Odhad (neověřeno): vlastní kód pro portál FreshLearn nedoručuje (chyba nebo funkce vyššího tarifu). Kód v administraci zůstal, nic nerozbíjí. |
| 18 | Portál studentů zčásti anglicky („My Library“, „Achievements“, „Filters“, „0% Completed“, „0 / 4 Chapters“…): v jazyce Czech chybělo 571 popisků. Editor překladů (Settings → Languages) je za tarifem No Brainer Plus | Lenka schválila překlady a cestu skriptem 13:25–13:28, Claude provedl | **hotovo** 261027: 333 popisků (co student vidí; partnerský program, pokladna, masterclass, MFA a SCORM vynechány) ve skriptu `lce-cestina` v Custom Script → Member Portal (Head, pod `lce-paper`). Lenka prošla portál po přihlášení (13:47), zbýval jen přepínač „Czech“ → skript `lce-jazyk` („Čeština“, ověřeno). |
| 16 | AI Sborovna VIP „Termíny nadcházejících vysílání“: jen minulé akce, rok 2024 místo 2025, doména lenakdvorakova.cz | Lenka | **návrh** (souvisí s rozhodnutím o AI Sborovně) |

## Záznam (nejnovější nahoře)

- **261027 13:47–13:52** Lenka prošla portál: česky vše kromě přepínače jazyka („Czech“ = název jazyka v nastavení FreshLearn, ne popisek). Přidán skript `<script id="lce-jazyk">` (přepíše samostatný nápis „Czech“ na „Čeština“ mimo editory a obsah lekcí, upraví i `languageDTO` v sessionStorage), uloženo, mezipaměť profilu smazána. Ověřeno na stránce zapomenutého hesla v nové kartě.

- **261027 13:16–14:10** Oprava 18, čeština v portálu (vlákno „FreshLearn: dopřeložit portál“). Portál bere popisky z výchozí angličtiny v kódu a přes ně slučuje texty jazyka Czech (`fs-readonly-api…/public/custom-text/<stránka>/language/640`); česky 303, chybělo 571 (FreshLearn přidal nové popisky a do češtiny je nedoplnil). Úprava v Settings → Languages je za tarifem No Brainer Plus; zápis přímo přes API Claude nepoužil (obcházel by placenou funkci). Lenka schválila překlady (malé v u vykání, paměť `feedback_vy_lowercase`) a cestu skriptem. Skript `lce-cestina` (14 KB, slovník 333 popisků) přidán do Custom Script → Member Portal → In Head Section pod `lce-paper`, uloženo tlačítkem Update; portál měl dál starou kopii nastavení, pomohlo smazání mezipaměti profilu (`DELETE fs-readonly-api…/v1/api/cache/company-profile?domainId=17745`, stejné volání dělá administrace). Skript zachytí odpověď s texty jazyka a doplní do ní chybějící klíče, portál pak vykresluje česky sám; obsahu lekcí se nedotkne. Ověřeno: přihlašovací stránka po čistém načtení i po obnovení (skript doběhne před stažením textů, patička „Vytvořeno v“). E-maily portálu česky: zápis do kurzu, zapomenuté heslo (zapnuté jsou ještě změna hesla, MFA a připomínky živých lekcí, neprocházeny).

- **261027 13:02–13:20** Lenka vybrala A cihlovou. Customize Member Portal → Theme: Button colour #D1003A → **#B23A12**, Hover #A8002E → **#8E2E0E**, Icon colour #D1003A → **#B23A12** (hover a ikony Claude dorovnal, aby nezůstaly červené), uloženo („All changes saved“). Náhled Dashboard: pozadí #FAF1EE (= výpočet). Živý portál kurzy.lcenglish.cz/member (přihlašovací stránka, nová karta): tlačítko rgb(178,58,18) ✔, FreshLearn generuje `--c-brand-soft` #FAF1EE a `--c-brand-line` #EED4CB. **Zjištění:** vlastní CSS `lce-paper` z Custom Script → Member Portal se teď načítá (25. 10. ne) a přebíjí to na papír: `--c-brand-soft` #EFE6DB, linky #E2D6C8, pozadí stránek #F7F1EA. Po přihlášení papír: **ověřeno Lenkou 13:16** (screenshoty knihovny a lekce, růžová pryč). Koncept odpovědi podpoře (z 12:35) tím ztrácí naléhavost, odeslání je na Lence.
- **261027 12:20–12:35** Podpora FreshLearn (Frank, 26. 10.): pozadí portálu změnit nejde, Custom Script systémová nastavení neupraví. Lenka chce růžovou pryč změnou barvy tlačítek. Pozadí = 7 % barvy tlačítek do bílé (`--c-brand-soft`), linky 22 % (`--c-brand-line`); ověřeno na #D1003A → #FCEDF1 / #F5C7D4, u jiných barev jde o výpočet, ověřit v náhledu. Varianty: A cihlová #B23A12 → #FAF1EE (bílý text 6,0:1); **B rezavá #8D3700 → #F7F1ED ≈ papír #F7F1EA** (7,8:1, linka #E6D3C7 ≈ #E2D6C8); C inkoust #1A1416 → #EFEFEF. Čeká na Lenčin výběr; pak změnit v Customize Member Portal → Theme a doplnit [[GrowOS/lcenglish/brain/brand]] (FreshLearn). Koncept odpovědi podpoře (žádost o samostatné pozadí) v Gmailu ve vlákně, ⚠️ odeslat z info@lenkadvorakova.cz.
- **261025 21:00** Lenka odeslala mail podpoře FreshLearn (oprava 17), starý koncept s doménami v textu smazala → [[waiting-for]] 📅 2026-10-30.

- **261025 20:56–20:58** Koncept zprávy podpoře FreshLearn (anglicky, Gmail, na support@freshlearn.com): růžové pozadí #FCEDF1 odvozené z barvy tlačítek a nenačítaný Custom Script → Member Portal. Odešle Lenka.

- **261025 20:53–20:55** Ověření opravy 17 po novém přihlášení: kód se nenačítá (viz tabulka). V kódu portálu se vlastní skript vkládá z `companyProfile.customScriptHead`, jen když `showCustomScriptCode` je true a portál neběží na adrese *.freshlearn.com; na kurzy.lcenglish.cz/member podmínku domény splňuje, ale server posílá prázdný profil. V portálu se nic neměnilo, smazána jen kopie profilu v paměti karty (sessionStorage) kvůli novému načtení.

- **261025 20:49–20:52** Oprava 17 (Lenka „ano“): růžová #FCEDF1 = proměnná `--c-brand-soft`, kterou FreshLearn odvozuje z barvy tlačítek (inline na `<html>`), používá ji pozadí stránky (`.mp-shell`, `.page-body-wrapper`), aktivní položka menu a štítky kurzů; `--c-brand-line` #F5C7D4 růžové linky. CSS uloženo do Custom Script → Member Portal (viz tabulka). Portál načítá vlastní kód při přihlášení (v kódu portálu `companyProfile.customScriptHead`, drží se v sessionStorage), v otevřené relaci ani v nové kartě se zatím neprojevil (`showCustomScriptCode` false) → čeká na nové přihlášení.

- **261025 20:40–20:45** Opravy 14 a 15 (Lenka „ano“): 16 lekcí upraveno přes API administrace (načtení → náhrada textu, každá náhrada nalezena právě jednou → uložení), mezipaměť kurzů 157241, 157254, 167515 obnovena (`DELETE fs-readonly-api.freshlearn.com/v1/api/course-optimized/cache…`; adresa na `backend.freshlearn.com` nefunguje). Ověřeno novým načtením: všech 16 lekcí má nové znění, Stínování bez odkazu na Google, 2 videa a 2 soubory. Přihlašovací stránka ověřena živě (studentská relace v Chromu mezitím vypršela): popisek „Pamatujte si mě“ čitelný. Růžové pozadí portálu: rozbor v opravě 17, nic neuloženo (náhled vrácen přes Cancel → Discard).

- **261025 20:37–20:40** Oprava 13 (Lenka: varianta B). Výběr barvy ve FreshLearn nebere psaní z klávesnice (zapsal #FF77FF1E), hodnota zadána přímo do pole Hex. Přihlašovací stránku jako přihlášená studentka otevřít nejde (přesměruje do knihovny), ověřeno na `/member/#/forgot-password`, nic neodesláno.

- **261025 19:59–20:30** Proklikání kurzů jako studentka (účet info@lenkadvorakova.cz, Claude in Chrome, vlákno FreshLearn: proklikat kurzy jako studentka). Studentské rozhraní posílá obsah lekcí šifrovaně, proto: (1) automatický průchod všemi lekcemi v rozhraní studentky (tlačítko další lekce, u každé stav videa/zvuku, obrázky, odkazy), (2) soubory ke stažení a externí odkazy ověřené stažením prvního bajtu a curl, (3) texty lekcí přečtené z administrace (jen čtení) → mapy kurzů.
  - **HELE:** 74 lekcí, 52 videí a 2 zvuky se načtou, 74 souborů ke stažení OK, Dropbox balíčky a odkazy (Anki, YouTube, Shadowloop) živé.
  - **10x ENGLISH:** 112 lekcí, 102 lekcí se 2 nahrávkami (100 % a 80 %) OK, 32 souborů OK. ⚠️ Mrtvý odkaz na online tabulku v Úvodu (oprava 14).
  - **AI Sborovna:** 27 zveřejněných lekcí, videa OK, odkazy živé (vlastní GPTs ověřené jen adresou). Obsah zastaralý (Bing Chat, Bard, rozhraní 2024).
  - **VIP:** 7 lekcí, 3 videa ve FreshLearn a 1 na YouTube OK; termíny vysílání zastaralé (oprava 16).
  - Přihlašovací stránka: domněnka potvrzena, šoupátko je „Pamatujte si mě“, popisek má barvu pozadí (oprava 13). V administraci nic neměněno.
  - Vedlejší efekt: průchod lekcemi přehrával začátky videí, FreshLearn si u studentského účtu uložil čas sledování; žádná lekce není označená jako dokončená (0 %).

- **261025 16:52–17:00** AI Sborovna a AI Sborovna VIP: „Make Public“ vypnuto (publicView false, kurzy dál zveřejněné pro zapsané), odebrány z bloku „Doporučuji“ na hlavní stránce a z All Courses (Lenka). Ověřeno živě: hlavní stránka 10x ENGLISH + HELE, All Courses bez AI Sborovny. Založeny úkoly: proklikat kurzy jako studentka (zde), rozhodnout o AI Sborovně ([[next-actions]], kontext v [[kontext-ukolu#AI Sborovna]]).

- **261025 16:36–16:55** Doplňující kontroly (Lenka):
  - **Nákup 10x ENGLISH → FreshLearn je ověřený:** živý test 261006 (objednávka 420260502, FAPI → fapipi `/handle-invoice/10XE` 200 OK, Drip, Firebase, FreshLearn člen vznikl) a nastavení fapipi `actions.json` (kurz 157254, plán 22290), viz [[lcenglish-10x-english-sales-page]] a [[daily/2026-10/261006]].
  - **AI Sborovna:** prodávala se přes SimpleShop (archivováno 261025), stránka `lcenglish.cz/ai` hlásí „prodej skončil“. Ve FreshLearn je kurz zveřejněný s vlastní pokladnou (`/checkout/Course/28834`, 970 Kč), ale **žádná platební brána není napojená** (Stripe nepřipojený, PayPal prázdný; Razorpay neověřen, odhad prázdný) → zaplatit nejde. Co s tím, rozhodne Lenka.
  - **Obchodní podmínky a ochrana osobních údajů sjednocené:** lcenglish.cz a lenkadvorakova.cz mají shodné obchodní podmínky (info@lenkadvorakova.cz, IČO 647 28 617); samostatnou ochranu osobních údajů má jen lcenglish.cz (`/privacy-policy/`, lenkadvorakova.cz ji nemá, ochrana údajů je tam v čl. 10 obchodních podmínek). Ve FreshLearn byly starší verze s lenka@publicspeaking.cz → stránky `/terms` a `/privacy` teď přesměrovávají na `lcenglish.cz/obchodni-podminky/` a `lcenglish.cz/privacy-policy/` (vlastní kód v hlavičce stránky, jako u `/10xe`; přesměrování v nastavení FreshLearn je placené). Na lcenglish.cz v ochraně osobních údajů 2× lenka@publicspeaking.cz → info@lenkadvorakova.cz (WordPress stránka 4452, stará verze v revizích). Ověřeno živě. Text dál zmiňuje „weby lcenglish.cz a publicspeaking.cz“ (neměněno).
  - Kontrola lekcí jako studentka: Lenka chtěla jen vědět, jestli jde; nedělalo se.

- **261025 16:19–16:25** Stránka All Courses (`kurzy.lcenglish.cz/all-courses`, blok Product → výběr kurzů): odškrtnuty Naučte se učit anglicky, Webináře, Nastartujte, přidána AI Sborovna (Lenka). Ověřeno živě: AI Sborovna, 10x ENGLISH, Angličtina s příběhem; blok „Testimonial Video“ beze změny.

- **261025 15:57–16:15** Oprava 10 provedena (viz tabulka). Patička je v každé stránce webu zvlášť (blok Footer → Copyright Text a T&C Text), společná patička v Website → Navigation je prázdná. Ověřeno na živém webu: Home, HELE, Naučte se učit anglicky, All Courses bez „Lights Camera English 2023“. Účet Teachable: lnk.dvorakova@gmail.com, škola ID 21392; poslední faktura Teachable (11/2023) šla na lenka@lights-camera-english.com (doména už nefunguje). Nalezeno: Obchodní podmínky ve FreshLearn uvádějí 4× lenka@publicspeaking.cz (adresa funguje; právní text, neměněno).

- **261025 15:10–15:35** Oprava 9. Videa kurzu nemají na Teachable tlačítko Stáhnout, ale odkaz `/courses/<kurz>/lectures/<lekce>/hotmart_lecture_video_download_link/<příloha>` funguje i tak. Hromadné stahování z JavaScriptu Chrome po prvním souboru zablokoval, místní přijímač zablokoval taky (odhad: povolení přístupu k místní síti, nenastavovala jsem), fungovala navigace karty na odkaz ke stažení → složka Stažené soubory → přesun a přejmenování na Disk. 4 duplicitní kopie, které vznikly opakováním, smazány po ověření shody (`cmp`); ostatní soubory ve Stažených nedotčené. Texty lekcí převedené do Markdownu (`Mluvte anglicky bez obav – osnova a texty lekcí.md`). Kurz odkazuje na lenka@publicspeaking.cz, FB skupinu a kurz „How to do great presentations in English“ (kurzy.publicspeaking.cz).

- **261025 15:00–15:20** Blok „Plán kurzu“ na prodejní stránce Naučte se učit anglicky opraven (blok Curriculum → Content → Course; ukazoval kurz Nastartujte vlastní online kurz). Ověřeno na živé stránce; HELE ukazuje svou osnovu, `/10xe` přesměrovává na lcenglish.cz/10x-english. Oprava 7 podle Lenčina rozhodnutí (viz tabulka), 7 lekcí NSUA upraveno přes API, ověřeno: 0 mrtvých odkazů, soubory ke stažení zůstaly. Google dokumenty za goo.gl (výběr podcastů, online tabulky) na Lenčině Disku nejsou a Google je hlásí jako nedostupné (410). Předložkový minikurz: jako majitelka školy jde lekce otevřít bez zápisu, 3 videa (36–41 MB) stažena do `G:\Můj disk\Zálohy webů\Teachable 261025\Predlozkovy minikurz\`. ⚠️ Přímý odkaz na editor stránek `build.freshlearn.com/add-next/<id>` odhlásil Lenku z FreshLearn; editor otevírat jen přes Website → Pages → Edit.

- **261025 14:40–15:20** Oprava 6 (Lenka: HELE tlačítka na lcenglish.cz/hele; Naučte se učit anglicky skrýt, prodej zatím ne). Prodejní stránky kurzů jsou ve FreshLearn ve Website → Pages (editor `build.freshlearn.com/add-next/<id>`, HELE 18694, NSUA 18698); odkaz tlačítka je v bloku → tužka → záložka CTA → Link, pak Save bloku a Save stránky. Ověřeno na živých stránkách: `/hele` 0× SimpleShop, tlačítka na lcenglish.cz/hele; `/naucte-se-ucit-anglicky` 0× SimpleShop, 5× lcenglish.cz/kurzy; kurz NSUA `publicView false`. Karta HELE v katalogu `kurzy.lcenglish.cz` vede na `/hele`, takže z katalogu se teď dostane na současnou prodejní stránku. Nalezeno navíc: blok „Plán kurzu“ na stránce NSUA ukazuje osnovu kurzu Nastartujte vlastní online kurz (chyba nastavení bloku; stránka je skrytá, neopravováno). Návštěvy stránek podle administrace: HELE 103, NSUA 229.

- **261025 14:10–15:05** Opravy 1–5 a 8 (Lenka „ano“ 14:10, včetně stažení z Teachable). Postup:
  - **Záloha originálů z Teachable** na Disk `G:\Můj disk\Zálohy webů\Teachable 261025\` (48 souborů, 28 MB): HELE Co je Anki (27 obr.), HELE E07 a E10 (Anki EN/CZ, Text, TextP), HELE Nasli chybu (gif), NSUA Shadowloop (8), NSUA 2.1 (1), Webinare uvodni webinar (3, logo se ve FL nepoužilo). Zdroj `uploads.teachablecdn.com` funguje bez přihlášení.
  - **Soubory 7.4 a 10.4** nahrané přes editor FreshLearn (sekce „Add downloadable files“, nahrání lekci rovnou uloží). FreshLearn názvy převádí na malá písmena (`e07en.apkg` apod.).
  - **Text lekcí** upravený přes API administrace (stejné načtení a uložení lekce jako editor, pak obnovení mezipaměti kurzu). Obrázky nahrané do úložiště FreshLearn (`media-lib.freshlearn.com/17745/lce-…`), všech 39 se načte.
  - **Kontrola:** v 7 kurzech 0 odkazů na `cdn.fs.teachablecdn.com`; všech 17 lekcí x.4 v HELE má 4 soubory ke stažení; lekce Anki v editoru: obrázky u správného textu.
  - Neměněno: odkazy na lights-camera-english.com, goo.gl, kurzy.publicspeaking.cz, SimpleShop (body 6, 7 a 10 čekají na Lenku).

- **261025 14:30** Soupis FreshLearn (API administrace, jen čtení) a porovnání s Teachable. Výsledek výše. Kontroly: 333 lekcí načteno, adresy z textu lekcí roztříděné podle domén, `cdn.fs.teachablecdn.com` ověřeno curl (SEC_E_WRONG_PRINCIPAL) i v editoru FreshLearn (obrázky se nenačtou), na Teachable lekce HELE 1.4 nabízí stejné soubory z `uploads.teachablecdn.com` (funguje). Nic se neměnilo, editor jsem dvakrát otevřela a zavřela bez uložení.
- **261025 13:55** Teachable (Lenka přihlášená, jen čtení): v „My library“ 12 kurzů + veřejný „Předložkový minikurz“. Osnovy uložené v [[lcenglish-teachable-osnovy-261025]]. Lekce jdou otevřít jako studentka (ověřeno na „Party Time!“ v Naučte se učit anglicky: video hraje, tlačítko Stáhnout). Neplatí tedy, že z Teachable nic nevytáhneme. Veřejný katalog FreshLearn (`kurzy.lcenglish.cz`) ukazuje 3 kurzy: AI Sborovna (od 790 Kč), 10x ENGLISH (1 270 Kč), Angličtina s příběhem (5 970 Kč); patička „© 2023“.
- **261025** Projekt založen (Claude, samostatné vlákno). V Databance k revizi kurzů sedí jen [[ABM – Course outline designer]] (návrh osnovy), použitelné jako kontrolní seznam struktury.
