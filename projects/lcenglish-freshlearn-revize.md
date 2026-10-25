# LCEnglish – revize kurzů ve FreshLearn

**Oblast:** [[areas/lcenglish]]
**Zahájeno:** 261025
**Zdroj:** vlákno „publicspeaking.cz bez WordPressu“ ([[kontext-ukolu]], sekce „Weby mimo WordPress“, záznamy 261025 13:15–13:45)
**Odkazy:** škola https://kurzy.lcenglish.cz · administrace https://app.freshlearn.com · osnovy Teachable [[lcenglish-teachable-osnovy-261025]] · mapa systémů [[lcenglish-ekosystem]] · nákupy [[resources/hele-funnel]]

## Aktuální stav

261025 17:00: Revize hotová (opravy 1–10, All Courses, sjednocené obchodní podmínky a ochrana osobních údajů). AI Sborovna a VIP skryté z katalogu, hlavní stránky i All Courses; co s nimi dál, je úkol v [[next-actions]]. Zbývá proklikat kurzy jako studentka (next action) a 30. 11. 2026 požádat Teachable o smazání školy ([[waiting-for]]).

## Co to je

FreshLearn (`kurzy.lcenglish.cz`) je od prosince 2023 jediná kurzová platforma LCEnglish. Cíl: soupis všeho, co tam je, vyhodnocení (rozbité, zastaralé, duplicitní, co chybí proti Teachable), opravy se schválením Lenky a nakonec rozhodnutí o zrušení staré školy na Teachable.

Pravidla:
- Přihlašuje se Lenka sama, Claude přihlašovací údaje nezadává.
- Opravy jen po schválení Lenky. **Nic se nemaže bez jejího výslovného souhlasu.**
- Nákupní cesta: prodejní stránka → FAPI → fapipi → Drip + Shadowloop + FreshLearn (fapipi drží Vítek; mapování kurzů v jeho repozitáři neověřeno, ověřené jen HELE = kurz 157241 / plán 22289).

## Next actions

- [ ] Proklikat kurzy ve FreshLearn jako studentka s Claudem (videa, zvuky, obrázky, soubory, odkazy) #next-action #online
    - Kontext: Claude umí v náhledu pro studenty projít každou lekci a zkontrolovat, že se video a zvuk načte, obrázky zobrazí a soubory jsou ke stažení (videa nepřehrává celá). Lenka 261025: udělat později. Žádost o smazání Teachable je ve [[waiting-for]] na 30. 11. 2026.

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

## Záznam (nejnovější nahoře)

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
