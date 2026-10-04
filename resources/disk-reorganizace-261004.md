# Google Disk — report a návrh reorganizace (261004)

Podklad: kompletní průchod Diskem přes `G:\Můj disk` (24 849 položek, mimo `vault/`, `Databanka AI/`, `HandyLibrary/`). U `.gdoc/.gsheet/.gslides` jsem viděla jen název, datum a umístění, **obsah jsem neotvírala** — zařazení vychází z názvů, dat a okolních složek. Kde si nejsem jistá, je to označeno **ověřit**.

**Nic jsem nepřesunula ani nesmazala.** Tohle je jen plán.

## Rozhodnutí Lenky (261004) — mají přednost před zbytkem reportu

- **Číslování:** dvouciferné kódy (`00 INBOX`, `01 PRIVATE` … `07 Všichni svatí`), aby se vešlo víc než deset oblastí. `9 Temp` se ruší a mění na `00 INBOX` (třídí Claude).
- **Archiv:** vždy označení, které se řadí na konec: `ZZ ARCHIV` v kořeni (podsložky po oblastech) **a** `ZZ Archiv` uvnitř každé oblasti. Věci, na které se dlouho nesáhlo, se z oblastního archivu stěhují do centrálního podle oblasti.
- **Aplikační složky v kořeni zůstávají samostatně** (záloha z appky): `Easy Voice Recorder`, `UpdraftPlus`, `vault`, `HandyLibrary`, `Databanka AI`. Nahrávky se z `Easy Voice Recorder` **nepřesouvají**; vznikne jen index (nahrávka → předmět).
- **`4/Clients`:** jsou to klientky 1:1 (ne kurzy) → `05 F2F BIZ`. Štěpánka dostane vlastní složku (spolupráce napříč projekty), případně rozstřídění po projektech.
- **Zkratky nahrávek:** SHP = stavebně historický průzkum, SZ = Starý zákon, BarIT = baroko v Itálii, RenesSem = Renesanční seminář. Otevřené: PP, UHS, UmŘem, `My recording NNN`.
- **Osobní doklady (občanka apod.)** zůstávají záměrně online (přístup z mobilu na cestách) — z rizikových věcí je vyřazuju. Zbylé citlivé soubory se sesbírají do jedné složky, kde je projde Lenka.
- **Olympus (580 nahrávek):** nejdřív prohlídka, co to je; část půjde smazat.
- **UpdraftPlus:** nejdřív zjistit, které sady patří ke kterému webu, pak teprve mazat.
- **Pojmenování souborů:** `YYMMDD` (jako ve vaultu).
- **FINÁLNÍ NÁZVY (provedeno 261004):** `00 INBOX` (dříve 9 Temp), `01 PRIVATE 🏡`, `02 EDUCATION 📚`, `03 LCEnglish 🎬`, `04 tadylenka 🖼️` (dříve 7 Všichni svatí — databáze světců zůstane uvnitř jako podsložka), `05 Další online kurzy 💻` (dříve 4 lenkadvorakova.cz; složka s AI workshopy, AI sborovnou, AI jazykáři; Lenka nechce svoje jméno ve složce), `06 F2F BIZ 👥`, `07 RESEARCH & INSPIRATION 🔬`, `ZZ ARCHIV` (dříve Z  Archiv). Osmička `08 SYSTÉM A ZÁLOHY` se založí až při prvním přesunu. **Číslování v dalších oddílech reportu (1–9) je staré — přečíst podle této mapy:** 1→01, 2→02, 3→03, 4→05, 5→06, 6→07, 7→04.
- **Fáze 0–1 dokončeny:** citlivé soubory v `00 INBOX/Citlivé – ke kontrole` (23), kandidáti na smazání v `00 INBOX/Ke smazání` (Lenka maže ručně), přejmenování oblastí hotové; Zotero ověřeno (žádné propojené přílohy, přejmenování bezpečné). Logy: `disk-presuny-log-261004.csv`, `disk-uklid-log-261004.csv` (v něm jsou ještě staré cesty `9  Temp`).
- **Průběh třídění (261004):** hotové dávky 2–6 — KTF Ekonomická komise (`01 PRIVATE/Spolky a funkce`), klienti v `06 F2F BIZ` (Aktivní klienti: FEKT VUT, FINEP, PENTA, MZe, Štěpánka, TANDEM+Prague Walks, VOX, EVIDENT; Archiv klientů: Olympus, Michal Šedivý, Miroslav Urban, HackedList, Starší klienti), tadylenka (`Všichni svatí – databáze` jako podsložka), studium KTF (Renesanční seminář a Exkurze Řím teď v Absolvované), kurzy/mapy/LCEnglish. Volné soubory v kořeni Disku: **0**. Zbývá: třídění `00 INBOX` (původní Temp, ~127 souborů), sloučení duplicitních složek, `Kurzy – byznys a marketing` (sloučení 4 míst), zbytek uvnitř oblastí. Národní galerie = vše pod VOX (složka NG se otevře až při přímé spolupráci).
- **Osmička** chyběla jen proto, že Lenka začala jedničkou a pak dala nejvyšší možné číslo; záměr žádný → `08 SYSTÉM A ZÁLOHY` podle návrhu.
- **NG (Národní galerie):** `Time Management NG`, `NGP_Most_k_reseni_manual`, `Formulář pro NG` = školení v NG (time management ~před třemi lety, komunikace 2026). `OH_*` (overhead = prezentace) jsou zdrojové prezentace od Štěpánky pro přípravu školení → patří k NG. `AI bez obav.pptx`, `MBTI_*`, `Školení GPT` s NG nesouvisejí → podle obsahu jinam.
- **UHS** = konference Umělecko-historické společnosti. UmŘem = Dějiny uměleckého řemesla (potvrzeno). PP a `My recording NNN` si Lenka dohledá sama.
- **Olympus:** nahrávky hovorů smaže Lenka sama; vyhodnocení a reporty zůstávají.
- **UpdraftPlus:** nechat nejnovější sadu každého webu (LCEnglish 2026-03-27 15:07; Lenka Dvořáková/lenkadvorakova.cz 2025-02-05 22:06 — úplnější).
- **Citlivé soubory:** Claude je přesune do jedné složky, projde je Lenka ručně.
- **Shadowloop:** necháme být, řešit samostatně.
- **Pozor při přejmenování oblastí:** vault odkazuje na staré názvy (`gnostika-fekt-audit`, `arttinder-consulting`, `lcenglish-10x-english-sales-page`, `digistart-podminky-vzdelavatel`, `ktf-ek-ppsr-kontrola`, `kurzy-marketing`, `zotero-word-workflow`) — po přejmenování aktualizovat. Zotero: ověřit nastavení „Linked Attachment Base Directory“ před přejmenováním `2  EDUCATION`.
- **Shadowloop:** neměnit, dokud se neověří, co přesně obsahuje (viz odpověď v konverzaci — nejde o exporty, ale o zdrojové balíčky decků).

---

## 1. Shrnutí

| | |
|---|---|
| Celkem na Disku | ~65 GB (z toho ~13 GB nahrávky v Easy Voice Recorder, ~25 GB `2 EDUCATION`, ~10 GB `3 LCEnglish`) |
| Složky 1–9 | existují 1–7 a 9; **chybí 8**; `9 Temp` slouží jako smetiště |
| Volné soubory v kořeni | **148 souborů** (171 MB), z toho 62 gdoc + 24 gsheet + 18 docx + 10 gmap |
| Volné soubory v `9 Temp` | **139 souborů** + 3 podsložky |
| Složky mimo 1–9 | 12 (z toho 3 systémové, na které se váže vault: `vault`, `HandyLibrary`, `Databanka AI`) |
| Přesné duplicity (stejný název + velikost) | 2 199 skupin, ~530 MB zbytečně |
| Prázdné složky | 52 (většina v exportech Adobe Premiere) |

**Šest hlavních problémů:**

1. **Kořen Disku je skládka.** 148 souborů, které patří do 8 různých oblastí (KTF, FEKT, EVIDENT, MZe, kurzy, mapy…). Většina má „domov“ jen o pár kliknutí dál.
2. **`2 EDUCATION` míchá tři různé věci**: vysokoškolské studium (KTF, knihovna, jazyky), nakoupené byznys kurzy (Ad Flight Navigator, Kate McKibbin, White Label Comedy…) a koníčky (klavír, Wondrium). Nakoupené kurzy navíc leží ještě na dalších 3 místech (`4/Inspiration & Ideas`, `6/Copywriting`, `2/X Archiv`).
3. **Easy Voice Recorder (13 GB, 273 nahrávek)** jsou skoro celé nahrávky přednášek KTF, rozhovory FEKT a nahrávky z klavíru — a leží v jedné hromadě, zatímco jejich předměty mají vlastní složky.
4. **Stejná věc na několika místech**: Štěpánka (4×), Komunikační diplomacie (3×), Kate McKibbin (2×), Danny Iny (3×), „AI pro lektory“ (3×), Headshots (2×), Tech/Testimonials/Content/Products (každé v 3 a 4), Latina (2×), Středověká Praha (3×).
5. **Devět různých názvů pro „archiv“**: `Z  Archiv`, `X  Archiv`, `X Archiv`, `XX  Archiv`, `XX   ARCHIV`, `ZZ - Archive`, `ZZ   Archiv`, `X  Archive`, `X  Temporary` — žádné jednotné pravidlo.
6. **Citlivé věci leží nechráněně mezi běžnými soubory** (viz oddíl 7): export z LastPassu, Google `client_secret`, skeny občanky, zálohy přístupů k webům.

**Doporučený postup:** nejdřív bezpečnostní opatření a smazání zřejmého odpadu (oddíl 9, fáze 0–1), pak přesun kořenových souborů a `9 Temp` (fáze 2), pak sloučení duplicitních složek po oblastech (fáze 3–4). Fáze 1–2 dají nejvíc pořádku s nejmenším rizikem.

---

## 2. Co se nesmí přesunout ani přejmenovat bez následků

Tyhle složky mají napevno navázané skripty, zálohy nebo workflow. Zůstávají v kořeni:

| Složka | Proč |
|---|---|
| `vault/` | je to samotný git repozitář a projekt Claude Code; cesta `G:\Můj disk\vault` je zadrátovaná |
| `HandyLibrary/` | [[resources/postupy/knihovna]] ji kontroluje při weekly review přes `G:\Můj disk\HandyLibrary\` |
| `Databanka AI/` | zdroje Databanky AI, odkazy z vaultu |
| `2 EDUCATION/Literatura…/knihy a články` | kontrola přírůstků přes Drive ID složky (`1dy9tyD5…`) — viz [[knihovna-disk-checklist]]. **Samotná složka se přesunout smí (ID zůstane)**, ale její podsložky ne: dotaz `parentId = …` hledá jen přímé děti. Stačí nechat soubory přímo v ní. |
| `Easy Voice Recorder/` | appka ukládá nahrávky sem; složku nechat jako „příjmovou“, nahrávky z ní přesouvat ven (jinak přestane synchronizovat) |
| `UpdraftPlus/` | WordPress plugin zapisuje sem; složku nechat, staré sady promazat |

Přejmenování (např. `9 Temp` → `0 INBOX`) Drive ID nemění, takže odkazy a sdílení fungují dál.

---

## 3. Navržená cílová struktura

Číslování 1–7 zachovat (už ho znáš), doplnit 8, nahradit 9 Temp a přidat 0:

```
0 INBOX                  ← dnešní „9 Temp“. Jen přechodné věci, vyprazdňuje se při weekly review
1 PRIVATE 🏡
   Doklady a administrativa   (Official, daně, plné moci, očkování, VZP, PRE, SVJ, malování-pojistka)
   Finance                    (Vyfakturuj exporty, YNAB, Airbank, finance.gsheet)
   Zdraví                     (Fitness, mamografie…)
   Domov                      (návody, obrázky/doma, SVJ)
   Cestování                  (Japan!, Slezsko, Polsko, letenky, mapy výletů)
   Rodina                     (Vítek, genealogie ← z 6, děda zrcátko)
   Kariéra                    (CV, Job Hunt, cover letter, dashboard kariéry, doporučení NG)
   Spolky a funkce            (Toastmasters ← + Z Archiv/7 BTM, KTF Ekonomická komise ← z 1)
   Hudba                      (Beethoven, DSCH, nahrávky klavíru ← z Easy Voice Recorder)
   Fotky                      (Fotky Lenka, LOOX Presets, FunIG)
2 EDUCATION 📚
   Studium KTF                (Aktuální, Absolvované, Bakalářka, Mundus Symbolicus, Erasmus, Anki, Nahrávky přednášek ← EVR, Formální požadavky)
   Knihovna                   (knihy a články, Přehledy dějin umění, Různé)
   Jazyky                     (Japanese, Francais, Latina, Italiano, Ruština, Deutsch)
   Kurzy – byznys a marketing (vše nakoupené na jednom místě, viz oddíl 4.2)
   Kurzy – ostatní            (Wondrium, Piano, How Music Does That, Art and History)
3 LCEnglish 🎬               (struktura je v zásadě dobrá — viz oddíl 4.3)
4 lenkadvorakova.cz 💻      (viz oddíl 4.4)
5 F2F BIZ 👥
   Aktivní klienti            (FEKT VUT, FINEP, PENTA, MZe, VOX/NGP, Michal Šedivý, Miroslav Urban, HackedList, Štěpánka/Digistart, TANDEM)
   Archiv klientů             (Olympus, EVIDENT, X Archiv)
   Vzory a šablony           (Samples, Call samples, Training materiály)
6 RESEARCH & INSPIRATION 🔬  (Swipe file, Copywriting, Content Bible, Book reviews — jen referenční materiál)
7 Všichni svatí 😇           (= tadylenka; viz oddíl 4.7)
8 SYSTÉM A ZÁLOHY            (UpdraftPlus, AutoCrat, Google AI Studio, Google Earth, Classroom, Creator Studio, Uloženo z Chromu)
9 ARCHIV                     ← dnešní „Z  Archiv“ + všechny rozsypané „X/XX/ZZ Archiv“ složky
```

**Pravidlo pro pojmenování archivů:** v každé složce vždy `Z Archiv` (jedno Z, jedna mezera) — řadí se na konec. Konkrétní složky: oddíl 6.

**Pravidlo pro duplikáty a verze:** žádné `(1)`, `Kopie`, `Copy of` — verze jako `_v2` nebo datum `YYMMDD` (stejný formát jako ve vaultu).

---

## 4. Plán po složkách

### 4.1 `1 PRIVATE 🏡`

Tohle je nejblíž hotovému stavu, jen je kořen přeplněný (29 volných souborů) a chybí podsložky.

- **Volné soubory (29) rozdělit** do Doklady / Zdraví / Cestování / Kariéra / Rodina:
  - Zdraví: `Dotazník před očkováním`, `Informace pro očkované`, `OckovaciCertifikat`, 3× `Potvrzení rezervace očkování`, `Spain_QR.pdf`, `Spain_QR_Wallet.pkpass` (covid certifikát) → `Zdraví/Očkování` (a celou složku označit jako citlivou)
  - Kariéra: `Lenka Dvorakova Cover Letter`, 3× CV (2023, 2026, + `Official/cv-cz`), `MJarošová doporučení NG`, `dashboard kariéry.html`, `Job Hunt/`
  - Doklady/domov: `čestné prohlášení malování.gdoc` + složka `malování - pojistka` + `malování.gsheet` → jedna složka `Domov/Malování 2025`
  - Cestování: `boarding_pass` ×2 (z `Omnibus/`), `reservation_info.pdf`, `Japan!/`, `Slezsko/` (5 PDF, 147 MB — **ověřit**, jestli jsou to zdroje k tadylenka a patří spíš do `7`)
  - Rodina: `MyHeritage…csv`, `MyHeritageGEDCOM.ged` → `Rodina/Genealogie` spolu s `6/Genealogie` (55 skenů, 102 MB)
  - Smazat/ověřit: `foto.0157_001.jpg`, `koupelna.jpg`, `Secret Love Affair.gsheet`, `Elpida.gdoc`, `Dary.gdoc`, `Senát.gdoc`, `Úklid.gsheet`, `BookDepository wishlist.pdf`, `TheSkyIsBlue.pdf` (9 MB) — podle názvu nerozumím, co jsou
- **`Omnibus/`** (16 souborů) — složka s tímhle názvem kolidují s `inbox/omnibus.md` ve vaultu. Obsah je různorodý (boarding passy, Profit First, Devenir tchèque, ChatGPT daily routine). Rozdělit do správných míst a složku zrušit.
- **`Official/`** (23 souborů) — obsahuje skeny občanky, podpisy, VZP karty: přesunout do `Doklady a administrativa/Osobní doklady` a zvážit zámek (oddíl 7). Duplicity podpisů (`Alexpodpis` jpg+png, `podpis` ×3).
- **`X  Archiv/`** (18 souborů, z toho `waltz161106.mp4` 155 MB) → `9 ARCHIV/Osobní`. Tohle jsou věci z let 2013–2017 (Toastmasters proslovy, ATECR konference, Nitra EFL).
- **`Toastmasters/` (35 gdoc)** + `Z Archiv/7 BTM` (180 souborů) + `Z Archiv/Kurz rétoriky pilot` + `Z Archiv/publicspeaking.cz` → jedna větev `Spolky a funkce/Toastmasters` (aktivní proslovy) a `9 ARCHIV/Toastmasters` (BTM).
- **`KTF Ekonomická komise/`** — nepatří k tvému studiu, je to funkce (viz poznámka ve vaultu). Přesunout pod `Spolky a funkce`. **Sem přijde i 11 volných souborů z kořene** (oddíl 5, skupina KTF EK).
- **`Hudba/`** (1,9 GB, 177 souborů) — Beethoven po 9 složkách je zbytečně rozsekaný: sjednotit do jedné `Igor Levit – Beethoven sonáty` s podsložkami I–IX. DSCH nechat.
- **`obrázky/`**: `doma/` (12 fotek bytu) → `Domov/Fotky bytu`, `LOOX Presets` (271 MB, Lightroom) → `Fotky/Presety`, `Všichni svatí` (4 obrázky) → `7`, `FunIG` → `7` nebo `Fotky` (**ověřit**).

### 4.2 `2 EDUCATION 📚`

**A) Studium — `KTF/`** (13 GB)
- `Absolvované/` obsahuje 43 předmětů; je dobře strukturované, ale:
  - **`Barokní seminář`** a **`Barokní seminář (1)`** — jedna z nich je pravděpodobně omylem vzniklá kopie (obsahují jiné soubory: seminárka Vojtěch vs. Trojice/Nosseni) → sloučit do jedné s podsložkou `Trojice`.
  - **`Středověká Praha`**, **`Středověká Praha a okolí`** a **`Aktuální/26ZS Středověká Praha a okolí`** — tři složky jednoho předmětu napříč třemi semestry. Sloučit do `Středověká Praha/<ročník>`. Aktuální semestr do `Aktuální/`, po odevzdání přesunout k absolvovaným.
  - **`Pomocné vědy historické LS 2025`**, **`Pomocné vědy historické novověku`**, **`PVH`** (jediný soubor je `Copy of Kopie souboru Archivní rešerše - úvod.pptx`) → sloučit do jedné `Pomocné vědy historické`.
  - **`Proseminář`** (prázdná), **`Proseminář dějin umění`**, **`Aplikovaný proseminář`** → sloučit; prázdnou smazat.
  - **`Latina`** (v `Absolvované`) a **`Jazyky/Latina`** (učebnice) — zůstat oddělené (kurz vs. učebnice), ale do obou dát odkaz/zástupce navzájem.
  - **`Úvod do dějin umění`** (2 soubory), **`Dějiny uměleckého řemesla`** (1 soubor), **`Památková péče`** (1 soubor) — skoro prázdné, protože nahrávky leží v Easy Voice Recorder. Ty tam přijdou při přesunu nahrávek (viz 4.8).
- **`Anki Archive/`** (1,2 GB) obsahuje složku `.claude/` (skrytá, 2 soubory) — nechat, ale uvnitř Anki balíčky `*_test.apkg` zkontrolovat. Přesunout pod `Studium KTF/Anki`. Duplicitní: `Renesance LS.apkg` (96 MB) je také v `Absolvované/Renesance LS/`.
- **Volné soubory ve `KTF/`** (9) — `citacni_zasady`, `formalni_uprava`, `sablona_dipl_1a.docx` (+ duplicitní `KTF-963-version1-ktf_18_version1_1_citacni_zasady_udku.pdf` = totéž co `KTF-18-version1-1_citacni_zasady_udku.pdf`, 726 KB) → `Studium KTF/Formální požadavky`.
- **`X Archiv/`** (FIGHT, Rady pro prváky) → `9 ARCHIV/KTF`.

**B) Knihovna — `Literatura apod. Dějiny - architektura - umění/`** (7,7 GB)
- Přejmenovat na `Knihovna` (ID složky se nezmění).
- `knihy a články` — **210 souborů přímo v kořeni složky** + 5 podsložek. Nepřesouvat do podsložek (rozbilo by to kontrolu přírůstků!). Řešení: Notion „📚 Knihovna“ je katalog, takže tříděním do podsložek nic nezískáš. Doporučuji nechat plochou strukturu, jen odstranit duplicity (níže).
- `Různé/` (26 souborů) — chronologie baroka/renesance (obrázky `baroko chronologie 1…5`) → `Studium KTF/Studijní materiály/Chronologie`; `.gdoc` poznámky → k předmětu.
- `Přehled dějin českého umění` + `Přehled dějin evropského umění` — obsahují stejné PDF (`37a-goticka-malba…` 12 MB, `37b…` 6,6 MB) → ponechat jednu kopii.
- Volné: `Mádl Martin…pdf`, `Prodromus Gloriae Pragenae – obsah.gdoc`, `In Omnem Terram.gdoc`, `Caravaggio.gdoc` → `Studium KTF` k příslušnému projektu (Mundus Symbolicus / Bakalářka).

**C) Jazyky** (2,7 GB) — dobré. Problémy:
- `396907460-Assimil-German-With-Ease.pdf` (369 MB!) — **ověřit**, jestli je potřeba v této velikosti; existuje oblast `deutsch` ve vaultu → přesunout do `Jazyky/Deutsch/`.
- 7 volných souborů (4LANG PROJECT, Deutsch italki, Portuguese log, Shadowing by A. Arguelles, Basic vocabulary…) → rozdělit do `Deutsch/`, `Portugalština/`, `Metody učení`.
- `Eagleton, How to Read Literature` je v `Jazyky/` i v `knihy a články` → smazat tu v `Jazyky/`.
- `Japanese/` (1,9 GB): `Japanese Stories Incl Fugirana 2019.pdf` je dvakrát (kořen + `books/`); `Minna no Nihongo I.pdf` a `Minna no Nihongo Shokyu I Dai 2-Han…pdf` jsou stejný soubor pod dvěma názvy (53 MB). Soubory `japonština z hodin.*`, `NihongoShadowloop1.*` jsou už z 2026 — zařadit do `Japanese/2026`.
- `Francais/` — 24 souborů z let 2016–2017 → `Jazyky/Francais/` je ok, ale `Skype avec …` dokumenty jsou studijní deník; nechat.

**D) Nakoupené byznys kurzy — jedno společné místo `Kurzy – byznys a marketing/`** (dnes na čtyřech místech!)
Sem sloučit (abecedně podle autora/kurzu):

| Dnes | Obsah |
|---|---|
| `2/Ad Flight Navigator` (86) | + root: `ChatGPT Prompts Ad Navigator.gdoc` |
| `2/Canva Crash Course Tina Ghazi`, `2/Digital Course Academy Amy Porterfield`, `2/Email Marketing Heroes League` (+ OMFG2026, Sandra Holze), `2/Kate McKibbin` (eCourse Empire, Launch Lab, Content Collective), `2/White Label Comedy` (BAM, Frameworks, VSL), `2/Winning Ads`, `2/AI Black Magic` | |
| `2/X  Archiv/*` — Accent Training, ALP, Copy School, Course Builder's Lab, Course Builders Laboratory (2×!), Growth University, Happy Subscribers, High Ticket Courses, Neil Patel SEO, PostDeck, Premiere Pro, Social Curator, Social Media Content Plan (Blake Beus), Social System (Rachel Miller), Visibility Challenge, Canva | všechno nakoupené kurzy |
| `4/Inspiration & Ideas/*` — Danny Iny ×6 složek, Kate McKibbin (druhá kopie), Online Workshop Done For You, AI pro lektory a učitele kurz | |
| `6/Copywriting` (157), `6/SWIPE FILE`, root: `Danny Iny ChatGPT`, `Thank you very much, Danny`, `Danny Iny AI briefing transcript`, `Danny Inny Webinar p1 česky`, `Chat GPT workbook – write emails`, `Elite – Firestarter Flash Sale`, `ECE – Chat GPT #0 – Plan Your Webinar`, `STUDENT COPY…` ×2, `90-Day Check-in + Planner 2022`, `TEMPLATE – Funnel tracking dashboard`, `Sales Call`, `Copy of [TEMPLATE] Write Your Own Sales Video/Letter` | |

Rozlišení **kurz** (2) vs. **swipe/příklady** (6): 
- celé kurzy, workshopy, lekce → `2/Kurzy – byznys a marketing`
- jednotlivé příklady dobrých e-mailů, reklam, prodejních stránek (referenční vzory) → `6/Swipe file` (jedna složka, dnes jsou dvě: `6/SWIPE FILE` s prázdnými `Videos`/`Webinars` a `6/Copywriting/swipe file` se 146 soubory)
- **Duplicita**: Danny Iny dnes ve 3 složkách (`4/Inspiration & Ideas`, kořen, `Copywriting/swipe file`); Kate McKibbin ve 2.

**E) Zbytek** — `Misc` (2 soubory) → rozdělit; `Wondrium` (24, 213 MB), `How Music Does That`, `Piano`, `Piano with Jonny` → `Kurzy – ostatní`; `Art and History` (The Rest Is History podcasty, 207 MB; v Temp jsou dalších 5 souborů `TheRestIsHistory*`) → sem sloučit.

### 4.3 `3 LCEnglish 🎬`

Kostra je rozumná, nepotřebuje velký zásah. Úpravy:

- **Reklamy ve čtyřech složkách**: `Ads` (6), `WinningAds` (17), `Content/Reklamy` (1), `Products/Irregular verbs/Promo Irregular` → jedna `Reklamy/` s podsložkami podle produktu (`Irregular verbs`, `HELE`…). Totéž řeší `Content/Social media/Promo` a `Content/Instagram`.
- **Art for English** (10 souborů, 224 MB, od 2026) → `Products/Art for English`, protože je to produkt; `Ideas/Umění mluvit Art for English.gdoc` k němu.
- **`Products/10x English`** (4 soubory) a **`Products/NAUČTE SE UČIT ANGLICKY`** (1072) jsou jeden produkt. Sloučit pod jeden název (vyber, jak se produkt jmenuje dnes). `Testimonials/10xENGLISH` zůstane, ale přesunout pod produkt.
- **`Products/Shadowloop`** (3 835 souborů) — **největší dopad v Drive.** Obsahuje 1 516 souborů, které jsou *přesně stejné* jako ve `HELE ASSETS` (audio příběhy, mp3) a 311 shodných obrázků s `Content/Blog Posts/ZZ Archiv/Anki/*pic files` a `Shadowloop/TOP25x3`. Složky s příponami typu `_teD89keyQ` vypadají jako export ze Shadowloop nástroje. **Rozhodnutí potřebuju od tebe:** jsou to exporty, které umíš vygenerovat znovu? Pak stačí jedna „pravda“ (HELE ASSETS) a Shadowloop-exporty smazat/přesunout do archivu. Viz [[shadowloop-admin]].
- **Úklid Adobe Premiere**: 357 souborů cache (`.cfa`, `.pek`, `Media Cache`, `Audio Previews`) = 515 MB; `PremPro/Copied_*` složky = 261 MB; `HELE 2408/Video Sales Letter audio_data` (282 `.au` souborů, 244 MB — cache zvukového editoru). Tohle jsou dočasné soubory, které se při otevření projektu znovu vygenerují. Bezpečné smazat.
- **`Tech/`** (35 volných souborů, 28 přímo + 7 podsložek): 
  - obsahuje přístupy a hesla (viz oddíl 7)
  - zip pluginů a témat (`elementor-pro`, `wp-rocket`, `themeforest…`) — licenční soubory, ponechat jen aktuální verze
  - `Zálohy webu` (171 souborů, 20 MB) + `UpdraftPlus/` v kořeni jsou obě zálohy webu → sjednotit pod `8 SYSTÉM A ZÁLOHY/Zálohy webu/`
  - `list downloads` (prázdná) smazat; stejně pojmenovaná `4/List downloads` má obsah (exporty z Drip) — **sloučit tyto dvě**
- **`X  Temporary`** (25 souborů z let 2015–2022) a **`X Research`** (25 souborů s CEFR slovníky, `Grammar Profile A1–C2`) → `Research/` (+ sem přijde `6/Porovnávač slovíček` a `6/Jazyková konkurence`, protože jde o stejné téma: slovní zásoba a CEFR). `X Temporary` roztřídit (Polygloti, SKA presentation → archiv; „Objednávky“ → Finances).
- **`Content/Facebook/Angličtina v karanténě`** (355 MB) a **`Content/Videos/X  Archive`** (648 MB, 71 složek `Take NN`) → `9 ARCHIV/LCEnglish` — jsou to staré natáčecí podklady. V `Videos/X Archive` jsou soubory `Copy of …m4a` stejné jako originál.
- **`Content/Blog Posts/Anglicky za týden`**, `Anglicky s AI` — v kořeni leží `Anglicky za týden co se dá naučit a jak na to.gdoc` a `Anglicky s umělou inteligencí.gdoc` → sem.
- **Legal** — sem patří i `Obchod. podmínky FINAL.docx` z kořene (pokud jde o LCEnglish — **ověřit**, mohly být pro lenkadvorakova.cz).
- **`Classroom/Test angličtina`** (kořen, 30 MB) = zkušební Google Classroom: `E01_Getting Ready.mp4` a `E01 TextP.pdf` jsou kopie z HELE → smazat nebo `Products/HELE/` jako jediné místo.
- **Volný soubor v `Products/`**: `Přihlášení ke kurzu.mp4` (je také v Classroomu) → do `HELE` nebo `Tech`.
- Kořen `3 LCEnglish`: `250909 mid-age woman.jpg` → `Reklamy/Irregular verbs` (stejné jako `WinningAds/250909 woman …`).

### 4.4 `4 lenkadvorakova.cz 💻`

- **Tohle je značka pro lektory/školy**: `Products` (AI sborovna, AI workshop, AI jazykáři, Wwebinar…) je jádro. `Branding`, `Content`, `Tech`, `List downloads`, `Testimonials` jsou v pořádku jako vzor.
- **`Inspiration & Ideas`** (404 souborů) — rozdělit: kurzy (Danny Iny ×6, Kate McKibbin) → `2/Kurzy – byznys`; ebooky a šablony (`[ebook] Supercharge Your Workday with ChatGPT` 60 MB, HubSpot ebook, `A-Z Guide to AI in Education`, surfer content planner ×6) → `6/Swipe file` nebo `6/AI zdroje`; `TadyLenka content ideas` (prázdná) smazat; `Social Media Ideas` (1) sloučit. Zbylé AI materiály jsou už zachyceny v Databance AI.
- **`Clients/`** (Alena Rajnochová, Denisa Nováková, Dita Doleželová, Lucie Kučerová, Štěpánka) — jsou to klientky 1:1. Patří do `5 F2F BIZ/Aktivní klienti` (nebo `Archiv klientů`). **Ověřit**, jestli jde o 1:1 klientky nebo účastnice kurzů. `Štěpánka` pak sloučit se `5/Štěpánka` a `5/X Archiv/Štěpánka`.
- **`X  Archiv`** (55 souborů, 2013–2019, vzory webinářů, Amy Porterfield, Bryan Harris) → `9 ARCHIV/Marketing kurzy a vzory` (část patří do `Kurzy`).
- **`Content/XX   ARCHIV`** (74 souborů, 127 MB) → `9 ARCHIV/lenkadvorakova.cz`.
- **Volné v kořeni**: `12-month goals to numbers planner 👑.gsheet`, `Affiliate.gdoc`, `Pozvánka na seminář PPP Brno 3.4.2025.docx` → `Products` nebo archiv.
- **`List downloads`** (25 souborů, exporty z Drip + `MemberBulkImport` + `Objednávky – AI sborovna`): obsahuje **osobní údaje účastníků** (exporty z FreshLearn, e-mailů). Přesunout do `Products/<akce>/` a označit.
- **`Tech/`**: `elementor-pro-3.7.2.zip`, `leadpages-wp-plugin…zip` → smazat/archiv; `.lnk` zástupce (2) jsou nefunkční na jiných zařízeních.

### 4.5 `5 F2F BIZ 👥`

Dnes 16 složek na jedné úrovni, bez rozlišení aktivní/archiv. Navrhuji tři hlavní podsložky.

**Aktivní klienti** (poslední změna 2026):

| Složka | Poznámka |
|---|---|
| `FEKT VUT` | **sem patří 4 volné soubory z kořene** (audit FEKT personální/studijní, `sestava zaměstnanci děkanátu`, `Návrh postupu systematizace` ověřit) + nahrávky `FEKT *` z Easy Voice Recorder (16 souborů, cca 1 GB) → `FEKT VUT/Rozhovory/Nahrávky` |
| `FINEP` (3,2 GB) | 4 verze videa rozhovoru: `FINEP rozhovor full.mp4` (841 MB), `FINEP rozhovor.mp4` (827 MB), `FINEP raw.mp4` (787 MB), `250827FINEP.mp4` (481 MB), `FINEP Roll B.mp4` + `FINEP250827.wav` (91 MB) + `.mp3` (17 MB, shodné s EVR). Rozlišit finální/surové; surové do `Surový materiál/` nebo mimo Drive |
| `PENTA` | sloučit `Komunikační diplomacie` (10 souborů) s `5/Komunikační diplomacie` (2 soubory) a `Komunikační diplomacie` z `X Archiv/Mezigenerační komunikace` ověřit; `HackedList.io` sloučit se `5/HackedList`; `250829PENTA.mp4` (641 MB) |
| `MZe` | **sem 3 verze `Podklad_na_schůzku_-_MZe` z kořene** (`.md.gdoc`, `(1)`, `(2)`) — sloučit do jedné aktuální (v `MZe/` je i `.md`) |
| `VOX/NGP Komunikace`, `Michal Šedivý`, `Miroslav Urban`, `TANDEM`, `Prague Walks`, `HackedList`, `Štěpánka/Digistart` | `TANDEM` + `Prague Walks` = jeden projekt → sloučit. `Miroslav Urban` obsahuje 8 složek `MU_T1…` s `.csv` + `.zip` téhož (kopie datové sady) → nechat jen `.csv` |

**Archiv klientů:**
- `Olympus` (1,8 GB, 1 504 souborů — hlavně `*Evaluations Archive` s 580 nahrávkami hovorů) — uzavřeno 2022 (poslední úprava). → `Archiv klientů/Olympus`. Zvážit, zda nahrávky hovorů (1,7 GB) vůbec držet na Disku — **mohou obsahovat osobní údaje zákazníků třetí strany**.
- `EVIDENT` (2025) — pravděpodobně uzavřeno; **sem 7 volných souborů z kořene** (`EVIDENT_ telephone and email communication training` ×2, `NDA`, `Supplier Questionnaire`, `Customer Emails – Sample`, `CUSTOMER COMMUNICATION IN FRENCH TEAM`, `Seznam lidí.xlsx`). `Seznam lidí` je tam i jako `.gsheet`.
- `X  Archiv` (14 klientů a 24 volných souborů, 2013–2024) → `Archiv klientů/Starší`.

**Vzory a šablony:** `Olympus/Call samples` (7), `EVIDENT/Samples`, `EVIDENT/Training`, `Olympus/Různé` (e-mailové vzory).

**Další:**
- `AI/` (1 PDF, 25 MB) → `6/AI zdroje`.
- **`NG`** (Time Management NG, OH_…, `AI bez obav.pptx`, `NGP_Most_k_reseni_manual`, `Formulář pro NG.gscript`, `Osobní_dotazník_lektora`, `Školení GPT 29.9.23`, `MBTI_*`) — v kořeni leží 10 souborů, které vypadají jako školení pro jednu zakázku; `5/VOX/NGP Komunikace` + `5/X Archiv/Time Management` s tím souvisí. **Ověřit** a vytvořit `Aktivní klienti/NG`.
- `HackedList` (rodinná firma synů) a `Summary HackedList.gdoc` v kořeni → sem. „Discovery Summary“ dokumenty (HackedList, Komunikační diplomacie, Všichni svatí, 2× HELE) — můžeš je držet pohromadě ve `Vzory/Discovery Summary`, nebo u každého klienta; hlavně ne mix.

### 4.6 `6 RESEARCH & INSPIRATION 🔬`

Dnes je z 343 souborů 55 genealogických skenů, 157 copywritingu a 86 slovníků.

- `Genealogie` (55 PNG/JPG, 102 MB) → `1 PRIVATE/Rodina/Genealogie`
- `Porovnávač slovíček`, `Jazyková konkurence` → `3 LCEnglish/Research` (jde o analýzu slovní zásoby pro Shadowloop/LCE)
- `Copywriting` + `SWIPE FILE` → jedna `Swipe file` s podsložkami Emails / Ads / Landing Pages / Sales Pages / Webináře (prázdné `Videos` a `Webinars` smazat)
- 24 volných souborů v kořeni (`20-Jokes-that-Sell`, `Joel Erway`, `High performance e-commerce ads blueprint` 22 MB…) → do `Swipe file` podle typu
- `Book reviews` (3), `Content Bible` (2), `AI pro lektory` (1), `Argumentace` (4) → sloučit do `Referenční materiály`; `Argumentace/Generické maskulinum` → patří ke genderovým tématům v `7` (**ověřit**)
- `FREEBIE Funnel Ready Checklist_Nitvei Studio…pdf` je na dvou místech (kořen `6` a `4/Inspiration & Ideas`) → ponechat jedno

### 4.7 `7 Všichni svatí 😇` (tadylenka)

- Dobře strukturované (svatí podle jmen, kostely, kalendáře, přednášky). 
- `Svatí a další náboženské náměty/Barbora` je prázdná a v kořeni leží `Jak se dělá Barbora.gdoc` → přesunout do ní.
- Volných souborů v kořeni 8 → `Business plan`, `Playbook`, `Discovery Summary` → `Strategie a business`; `sample.csv/.gsheet`, `DP_Gausova_Zornerova.pdf` (diplomka, 4,7 MB — proč tady? **ověřit**) → smazat/přesunout.
- `Substack data/260927`, `tadylenka drafty/Eva`, `zálohy aritable` (Airtable export 2022–2024) → `zálohy aritable` do `9 ARCHIV/tadylenka`.
- **Volné soubory z kořene Disku, které sem patří**: `Courbet L'origin Substack.gdoc`, `Témata pro IG projekt Umění v čase.gsheet`, `Merry XMass Production Deep Research.gdoc`, `Kostel Nanebevzetí v Nové Pace.gdoc`, `Mariánský sloup v Nymburce…`, `Portál nymburské radnice…` (tohle jsou zdroje k seminárkám nebo článkům — **ověřit**, kam jsi je chtěla).
- `_memory-tadylenka-kadence.md` (kořen Disku, 2 kB) — pozůstatek zápisu do paměti; patří do `vault/` (nebo smazat, pokud je obsah už v paměti).

### 4.8 `Easy Voice Recorder` (13 GB, 273 nahrávek) → roztřídit podle názvu

| Prefix v názvu | Počet / velikost | Kam |
|---|---|---|
| `SHP…` (SHP251119, SHP260429) | 17 / 1,3 GB | KTF (předmět `SHP` — **ověřit zkratku**) |
| `EL`, `EvLit` | 22 / 1,8 GB | `KTF/Absolvované/Evropská literatura/Nahrávky` |
| `UmŘem` | 17 / 1,1 GB | `Dějiny uměleckého řemesla` |
| `ČCD` | 11 / 830 MB | `České církevní dějiny` |
| `VizuNov`, `Vizu`, `Vizu20` | 18 / 1,2 GB | `VizuNovověk`, `Vizu20` |
| `SZ` | 10 / 690 MB | **ověřit** (SZ = ?) |
| `Metodologie`, `PP`, `Restaurovani`, `BarIT`, `Hum`/`Humanismus`, `Řeholní řády` ×4 varianty, `PamPéče`, `PVH`, `UHS`, `Muzejnictví`, `Hagio`, `Strahov`, `Špála`, `Israel mosaics`, `Premonstrati`, `Maria konference` ×4, `RenesSem`, `20stoleti261002` | ~70 / ~5 GB | příslušné předměty v `KTF/Absolvované` nebo `Aktuální` |
| `FEKT *` (Stud, Personalni, PR, Organizacni, IT, Pravni, Správa, Ekonomicke, VeřZakazky, Projekt Kapustová…) | 16 / 1 GB | `5/FEKT VUT/Rozhovory/Nahrávky` |
| `FINEP1/2/3`, `PENTA`, `Michal Kocián` | 6 / 90 MB | k příslušnému klientovi (FINEP a PENTA mp3 jsou stejné soubory jako ve složkách klientů) |
| `Siciliano*`, `WoO`, `Arabesque`, `Arabeska`, `Klavír`, `Autumn Leaves`, `James Arthur`, `Colombina` | ~25 / 60 MB | `1/Hudba/Nahrávky klavíru` |
| `Nihongo` | 9 / 17 MB | `Jazyky/Japanese/Nahrávky` |
| `Opitz`, `Gryphius`, `Czepko`, `Růže ran Weckherlin` | 4 / 20 MB | `KTF/…/Evropská literatura` (barokní básníci) |
| `My recording NNN` | 14 / 743 MB | nepojmenované — **bez poslechu nepoznám**. Zkusit rozřadit podle data, nebo poslechnout a přejmenovat |
| `CulturalHeritageCastle.mp3` (69 MB) | | stejný soubor je v `KTF/Absolvované/Cultural Heritage` → smazat |

Pravidlo do budoucna: v appce nastavit pojmenování `YYMMDD_předmět` a po semestru přesunout do složky předmětu.

### 4.9 Ostatní složky v kořeni

| Složka | Doporučení |
|---|---|
| `Z  Archiv` | → `9 ARCHIV`. Obsah: BTM, AirBnB, Gnostika (2014), Helena, Julia Cameron, Kurz rétoriky, PRESENATION, publicspeaking.cz. Roztřídit podle témat (Toastmasters → `Spolky`; ostatní zůstanou). 7 volných souborů (`Click & Study.lnk`, `elektřina villains.gsheet`, 2 fotky, `ReLivee archiv.zip` 24 MB…) |
| `UpdraftPlus` | → `8 SYSTÉM A ZÁLOHY/Zálohy webu/UpdraftPlus`. 1,9 GB, 29 souborů, 6 sad záloh (2022, 2023, 2× 2025-02-05, 2× 2026-03-27). Dvě sady z 2026-03-27 a dvě z 2025-02-05 jsou vzájemně duplicitní (stejné pluginy, themes, others). Ponechat nejnovější (2026-03-27 15:07) = **uvolní ~1,4 GB** |
| `AutoCrat Demo Folder` | demo nasazení doplňku z 5. 10. 2024: 4 sady PDF × 4 „(1)(2)(3)“. Smazat, pokud AutoCrat nepoužíváš |
| `Google AI Studio` | 3 soubory (testovací video z 3. 10. 2025) → smazat |
| `Google Earth` | 1 soubor (`Pražské domy GEarth`) → k mapám `.gmap` |
| `Classroom` | viz 4.3 — duplicitní HELE materiály |
| `Creator Studio`, `Uloženo z Chromu` | **prázdné** (vytvořily je appky) → smazat, případně ponechat, pokud je appka používá |
| `Databanka AI`, `vault`, `HandyLibrary` | nechat v kořeni (oddíl 2) |

---

## 5. Volné soubory v kořeni Disku — kam s nimi (148)

Skupiny podle cíle; v závorce počet. Seznam je podle názvů; **ověřit** = zařazení je odhad.

**→ `1 PRIVATE/Spolky a funkce/KTF Ekonomická komise` (13)**
`dopis AS KTF.gdoc`, `Rozpočet 2025 podklady.xlsx`, `KTF-vydaje-rozpocet-2025.xlsx`, `KTF-prijmy-rozpocet-2025.xlsx`, `Výdaje 1-5-25.xlsx`, `6b Rozpočet KTF 2025 FINAL.xlsx`, `6a Rozdělení finančních prostředků KTF 2025[86].docx`, `Audit_KTF_VZH_2025.gdoc`, `Analýza_KTF_VZH_2025.gdoc`, `Analýza_KTF_VZH_2025_proEK.gdoc`, `RNov-KTF-EKUK-20260424-zapis-navrh_MV.docx`, `Rozpis rozpočtu VŠ na rok 2024.xlsx` a `KTF-193-…tabulky_vzh_2022.gsheet` z Temp
*(složka `PPSŘ kontrola` už tam je — viz [[ktf-ek-ppsr-kontrola]])*

**→ `5 F2F BIZ/Aktivní klienti/FEKT VUT` (4)**
`audit FEKT personální.gdoc`, `audit FEKT studijní.gdoc`, `sestava zaměstnanci děkanátu vč. neobsazených míst _08_26.xlsx`, `Návrh postupu systematizace pracovních míst.pdf` *(ověřit)*

**→ `5 F2F BIZ/Aktivní klienti/MZe` (3)**
3× `Podklad_na_schůzku_-_MZe*.md.gdoc` — sloučit do jedné verze

**→ `5 F2F BIZ/Archiv klientů/EVIDENT` (8)**
2× `EVIDENT_ telephone and email communication training _ order(_241206).docx`, `NDA_Lenka Dvorakova_final.docx`, `Supplier Questionnaire_Lenka.xlsx`, `Customer Emails - Sample.docx`, `CUSTOMER COMMUNICATION IN FRENCH TEAM.docx`, `Seznam lidí.xlsx`, `Stanovy.docx` *(ověřit — může patřit k SVJ)*

**→ `5 F2F BIZ/Aktivní klienti/NG (ověřit)` (11)**
`Time Management NG.pptx` (70 MB; kopie v `5/X Archiv/Time Management`), `OH_time management_27012021.pptx`, `OH_Sdělování nepříjemných věcí.pptx`, `AI bez obav.pptx`, `NGP_Most_k_reseni_manual.gdoc`, `Formulář pro NG.gscript`, `Školení GPT 29.9.23 seznam.xlsx`, `Osobní_dotazník_lektora.docx`, `MBTI_Vypocet_J_P.xlsx`, `MBTI dotazník.gdoc`, `MBTI klíč.gdoc`

**→ `5 F2F BIZ/Archiv klientů/Starší` (7)**
`AJ-Audit_seznam zaměstnanců.xlsx` + `.gsheet` (totéž 2×), `NPI_objednavka_Dvořáková_Lenka.rtf` + `.gdoc` (2×), `ZamerenoByznys Lenka 160825.pptx` (6,6 MB, 2016), `participants_ZŠ Řevnice (1).xlsx`, `slide doctor.gslides`

**→ `2 EDUCATION/Studium KTF/…` (30)**
- *Přehledové tabulky a poznámky*: `Literatura pojmy.gsheet`, `Humanismus a baroko v literatuře.gsheet` + `(1)` (2×), `Španělští autoři…`, `Analýza francouzské literatury 16.–18. stol.`, `Autoři a díla renesanční a barokní literatury`, `Angličtí autoři a jejich díla`, `Analýza anglické literatury`, `EL 19 Francouzské drama…` → `Absolvované/Evropská literatura`
- `Berniniho díla Chronologický přehled.gsheet`, `VizuNovověk251021.pdf` (23 MB), `VizuNovověk 150 vybraných děl.gsheet`, `test VizuNovověk.gsheet` → `Absolvované/VizuNovověk`
- `metodologie 1 - termíny.pdf`, `Rady pro prváky DKU - Výsečový graf 1.gsheet`, `Dějiny umění a přírodní vědy Témata.gdoc` → Metodologie / Rady pro prváky
- `Latinske_vety_jedna_stranka.gdoc`, `Latinske_vety_preklad_a_slovesa.gdoc` → `Absolvované/Latina`
- `Katalogové heslo Emauzy XIV-16.docx` → `Aplikovaný proseminář/Emauzy`
- `PM Vítězná MS timeline + shrnutí.gdoc` → `Středověká Praha a okolí/kostel Panny Marie Vítězné`
- `5 Pražští biskupové 973–1214.gdoc`, `14 Dominikáni (sv. Zdislava).gdoc` → České církevní dějiny / Církevní řády *(ověřit)*
- `Vývoj Kostela Svatého Klimenta.gdoc` — **už existuje stejnojmenný soubor v `Aktuální/26ZS Středověká Praha a okolí`** (stejný den) → smazat zástupce v kořeni
- `Mariánský sloup v Nymburce…`, `Portál nymburské radnice…`, `Kostel Nanebevzetí v Nové Pace` → `Středověká Praha/Sadská-Nymburk` *(ověřit)*
- `Transitorius mundus zpráva o kolokviu.gdoc`, `2026_zprava_Transitorius_mundus.md.gdoc` → `Mundus Symbolicus/Konference Transitorius Mundus` *(možná duplicita)*
- `Ruggiero Pesci Delle Imprese (shrnutí).gdoc` → `Mundus Symbolicus` *(ověřit; tam je `Pesci vs Giovio.pdf`)*
- `Male gaze seminárka - ženské hlasy 16st zdroje.gdoc` → `Aktuální/Renesanční seminář/Male gaze v renesančním umění`
- `Řím 13.–18. 11. 2026 – výdaje.gsheet` → `Aktuální/Exkurze Řím`
- `Major system.gsheet` → `Studium/Paměť a učení` *(nebo `Jazyky/Metody učení`)*
- `Canterbury.mp3` (39 MB) → nahrávka, nejspíš k `Academic English`/exkurzi *(ověřit)*

**→ `2 EDUCATION/Kurzy – byznys a marketing/…` (14)**
`ChatGPT Prompts Ad Navigator.gdoc`, 3× `STUDENT COPY…`/`Chat GPT workbook`, `Elite – Firestarter Flash Sale`, `ECE – Chat GPT #0`, `Email Marketing Heroes to LCEnglish ChatGPT`, `Danny Iny ChatGPT – YouTube`, `Thank you very much, Danny`, `Přeložená kopie Danny Iny AI briefing transcript`, `Danny Inny Webinar p1 česky`, `Sales Call.gdoc`, `Copy of [TEMPLATE] Write Your Own Sales Video/Letter` (2×), `Kopie… 90-Day Check-in + Planner 2022`, `Kopie… TEMPLATE – Funnel tracking dashboard`, `Sample story plots.gdoc`

**→ `3 LCEnglish/…` (10)**
`Speaker Notes for Webinář HELE EW` + `(1)` → `Products/HELE/HELE EW`; `irregular verbs Anki CSV.gsheet`, `Irregular Sales Page copy (KateMK ChatGPT prompt).gdoc` → `Products/Irregular verbs`; `Webináře - statistiky.gsheet` *(ověřit)*; `Drip to GSheets.gscript`, `ruční API.gsheet` → `Tech`; `Anglicky za týden…`, `Anglicky s umělou inteligencí` → `Content/Blog Posts`; `youtube.png`, `youtubeic.png` → `Brand Elements`

**→ `4 lenkadvorakova.cz/…` (3)**
`Prodejni stranka.docx`, `Obchod. podmínky FINAL.docx` *(ověřit LCE vs. tohle)*, `Tvorba obsahu.docx` + `Tvorba obsahu_verse 02.docx` (z Temp)

**→ `1 PRIVATE/…` (24)**
- Doklady: `PRE_160883505.pdf` + `.gdoc` (2×), `PLNÁ MOC.gdoc`, `Tímto čestně prohlašuji-dvorakova.docx`, `DanovePotvrzeni_0000544647.zip`, `DanovePotvrzeni_544647.zip`, `finance.gsheet`
- Rodina/Vítek: `Vítek Peterka – FORMULÁŘ_Seznam četby k MZ (2).docx`
- Cestování: `Výlet Polsko.gmap`
- Kariéra: `20231027_Martin_Jankovský_Resume.DOCX` *(cizí CV? ověřit, jestli patří mezi klienty)*
- Čtení: `451° Fahrenheita.gdoc`, `Obracení Čech na viru.gdoc`
- *Zbytek je smetí — viz Temp*

**→ nový „Mapy památek“ (`2 EDUCATION/Mapy`) (10 `.gmap`)**
`Pražské domy`, `Magický střed Prahy`, `Architektura`, `Architektura s popisky`, `Architektura s různými markers`, `Untitled map`, `Mapa bez názvu`, `Baroko`, `Gotika`, `Výlet Polsko` (viz výše). **Tip:** vault má `resources/mista-k-navstiveni.md`.

**→ `7 Všichni svatí` / tadylenka (5, ověřit)**
`Courbet L'origin Substack`, `Témata pro IG projekt Umění v čase.gsheet`, `Merry XMass Production Deep Research.gdoc`, `Rešerše profily průvodců a popularizátorů architektury historie.gdoc` + `(se socsítěmi)` (2×; ověřit, jestli nepatří k projektu s Michalem Šedivým v `5`), `Zpětná vazba na jeden nádech.gdoc` *(ověřit)*, `Jak se dělá Barbora.gdoc`

**→ `vault/` nebo smazat (2):** `_memory-tadylenka-kadence.md`, `desktop.ini` (systémový, ignorovat)

**→ Smazat po tvém potvrzení (2):** `speech w music test.mp3`, `Untitled spreadsheet.gsheet`

**Neznámé (potřebuju od tebe, 6):** `Text CN - EN.docx`, `Text CN - CZ.docx`, `Contract for Work No. 2023_EN.doc`, `Ice Cream Research.gsheet`, `Daniela Lunger-Sterbova_Expose`, `Zpětná vazba na jeden nádech`

---

## 6. Sjednocení názvů archivních složek

| Dnes | Cílově |
|---|---|
| `Z  Archiv` (kořen) | `9 ARCHIV` |
| `1/X  Archiv`, `2/X  Archiv`, `2/KTF/X Archiv`, `4/X  Archiv`, `5/X  Archiv`, `5/Olympus/X  Archiv` | `9 ARCHIV/<oblast>` **nebo** `Z Archiv` v dané složce |
| `4/Content/XX   ARCHIV`, `5/FEKT VUT/XX  Archiv`, `3/Products/ZZ - Archive`, `3/Content/Blog Posts/ZZ   Archiv`, `3/Content/Videos/X  Archive` | totéž |
| `3/X  Temporary`, `3/X Research` | `Research`, zbytek archiv |

Doporučení: pro dlouho uzavřené věci (Olympus, BTM, MABO, Angličtina v karanténě…) použít centrální `9 ARCHIV/<oblast>`; pro věci „pro jistotu“ uvnitř aktivní oblasti nechat `Z Archiv`. Rozhodni, který model chceš — potřebuju to znát před fází 3.

---

## 7. Citlivé soubory — doporučuji řešit jako první

Obsah jsem **neotvírala**, soudím jen z názvů. Doporučuji projít a podle potřeby přesunout do jedné složky s omezeným sdílením (nebo odstranit z Disku, pokud už neplatí).

| Soubor / složka | Umístění | Riziko |
|---|---|---|
| `LastPasssoubor.csv` | `9 Temp` | **export celého správce hesel** (nešifrovaně). Smazat nebo přesunout offline |
| `client_secret_…apps.googleusercontent.com.json` | `9 Temp` | OAuth klíč Google projektu — smazat/obnovit v konzoli, pokud už není potřeba |
| `stripe_backup_code.txt`, `Freshlearn heslo.png`, `přístupy k webu.gdoc`, `Instagram token LCE.gdoc`, `Drip forms code`, `Olympus přístupy.gdoc` | `3/Tech`, `5/Olympus` | přístupy a tokeny na jednom místě. Po kontrole přesunout do správce hesel |
| `občanka front/back.jpg`, `občanka.zip`, `address proof.pdf`, `telefon proof.pdf`, `registrace k dani.jpg`, `VZP Alex/Vítek.jpg` | `1/Official` | skeny dokladů; ideálně ve složce, která není sdílená a není synchronizovaná do počítače |
| `DPFO2021.pdf`, `DPFOčestné prohlášení.pdf`, `Danove potvrzeni*.zip`, `potvrz_stud_2025.pdf`, `UHS přihláška.pdf`, `payment-refund-…pdf`, `Rozpis rozpočtu VŠ…xlsx` | `9 Temp`, kořen | daně a studium |
| Očkování (certifikáty, QR kódy) | `1/` | zdravotní údaje |
| `List downloads/*.csv` (exporty předplatitelů), `MemberBulkImport*`, `participants_*.gsheet` | `4/List downloads`, `9 Temp`, kořen | osobní údaje účastníků — GDPR |
| `Olympus/*Evaluations Archive` (580 nahrávek hovorů) | `5/Olympus` | zákaznické hovory třetí strany |
| `AutoCrat Demo` (PDF se jmény) | `AutoCrat Demo Folder` | jména z demo dat — nízké riziko |

Doporučená složka: `1 PRIVATE/Doklady a administrativa` s jasným označením — nebo samostatná složka mimo synchronizaci do `G:`.

---

## 8. Duplicity, které stojí za úklid

**Přesné duplicity podle objemu:**

| Co | Kde | Zbytečné MB |
|---|---|---|
| HELE ↔ Shadowloop (audio příběhy, 10xE vzorky) | `3/Products/HELE` ↔ `3/Products/Shadowloop` | 96 (1 516 souborů) |
| Anki obrázky | `3/Content/Blog Posts/ZZ Archiv/Anki` ↔ `3/Products/Shadowloop/TOP25x3` | 78 (311) |
| `Renesance LS.apkg` | `KTF/Absolvované/Renesance LS` ↔ `KTF/Anki Archive` | 96 |
| `CulturalHeritageCastle.mp3` | `KTF/Absolvované/Cultural Heritage` ↔ `Easy Voice Recorder` | 69 |
| `E05_Mr Dunn.mp4`, další HELE videa | `HELE ASSETS/Final Cut All Episodes/E05` ↔ `E05 Assets` | 58 (47 souborů uvnitř HELE) |
| `BelveDefDEF02orez.pdf` | `Literatura/knihy a články` ↔ `KTF/Aktuální/Renesanční seminář/Belvedér` | 32 |
| `E01_Getting Ready.mp4`, `E01 TextP.pdf` | `Classroom/Test angličtina` ↔ `HELE ASSETS/E01` | 30 |
| Přehledy dějin umění (PDF 37a/37b) | `Přehled dějin českého` ↔ `evropského umění` | 19 |

**Stejný soubor pod různým názvem** (pozor — stejná velikost, jiné jméno):
- `Scribner Bernini-His-Life-and-Works.pdf` ↔ `Scribner Charles-Bernini-…` (170 MB, obě v `knihy a články`)
- `Blažíček – Kropáček Slovník…pdf` ↔ `Blazicek_Kropacek_Slovnik…pdf` (86 MB)
- `Minna no Nihongo I.pdf` ↔ `Minna no Nihongo Shokyu I…` (54 MB)
- `BAM 2023_02.pdf` ↔ `February-2023.pdf` (22 MB)
- Broude *Feminism and Art History* (3 verze: 2× PDF, 1× epub, 66 MB), Apostolos-Cappadona (361 MB + komprimovaná 18 MB), Jordan, Ozment (komprimované + plné verze) → ponechat jednu
- `Seminárka Male Gaze.docx` ↔ `… – kopie.docx` (8 MB, ve složce `drafty`)
- `Hubala_Baroque and Rococo Art.zip` (63 MB) v `9 Temp` ↔ `Copy of Hubala…` v KTF (+ PDF 64 MB v `knihy a články` — tj. třikrát)
- `Preiss – Wenzel Lorenz Reiner` ve dvou složkách KTF (`Zotero knihovna` vs `Bakalářka/Reiner Brandl`) — obvyklá Zotero duplicita, ponechat

**Soubory dvakrát ve formátu:** `.xlsx` + `.gsheet`, `.docx` + `.gdoc`, `.pdf` + `.gdoc` (např. `PRE_160883505`, `AJ-Audit_seznam zaměstnanců`, `NPI_objednavka`) — ponechat jen jeden.

**Verze „(1)“, „Kopie“, „Copy of“** — 212 dokumentů. Hlavně v `KTF/Absolvované` (20), `Copywriting/swipe file` (16), `Zálohy webu` (14), `Ad Flight Navigator/Scripts` (8), `Videos` (7).

**`9 Temp`** — viz oddíl 5 a 7. Z 139 volných souborů je ~30 zřejmý odpad (`Untitled document` ×2, `Dokument bez názvu` ×2, `Tabulka bez názvu` ×2, 5× `Shared from Lightroom mobile`, 4× `Google Translate`/`DeepL` screenshoty, `trailing slashes.gdoc`, `temp working doc`, `Test*`, certifikáty `test` ×2), ~25 patří k projektům (Vyfakturuj exporty ×7 → `Finance`, YNAB, TheRestIsHistory ×5, KTF tabulky), ~10 je citlivých, zbytek je různorodý.

---

## 9. Doporučené pořadí provedení

| Fáze | Co | Riziko | Čas |
|---|---|---|---|
| **0 — Bezpečnost** | LastPass CSV, `client_secret`, přístupy a tokeny z `3/Tech` do správce hesel; skeny dokladů do chráněné složky | žádné | pár minut u tebe |
| **1 — Zřejmý odpad** | prázdné složky (52), Premiere cache (515 MB + 261 MB + 244 MB), `.crdownload`, `AutoCrat Demo`, `Google AI Studio`, desktop.ini, zbytečné záložní sady UpdraftPlus (~1,4 GB), test/dummy soubory v Temp | nízké (s tvým souhlasem) | |
| **2 — Kořen a Temp** | všech 148 + 139 volných souborů podle oddílu 5 | nízké (přesun, ne mazání) | |
| **3 — Nahrávky** | `Easy Voice Recorder` → složky předmětů a klientů | nízké, ale 13 GB metadat | |
| **4 — Sloučení oblastí** | `2` (kurzy), `4/Inspiration`, `6` (swipe/genealogie), `5` (aktivní/archiv), `1` (podsložky) | střední (mnoho přesunů) | |
| **5 — Duplicitní složky** | HELE ↔ Shadowloop, Středověká Praha ×3, Barokní seminář ×2, Latina, Štěpánka ×4 | střední — vyžaduje tvé rozhodnutí | |
| **6 — Pojmenování a pravidla** | archivy → jednotný název, `0 INBOX`, `8`, `9`; pravidlo pro nové soubory | nízké | |

**Jak bych to dělala:** přesuny přes lokální `G:\Můj disk` (Drive pro stolní počítače je přenese jako přesun, ne kopii, takže odkazy a sdílení zůstanou). Každou dávku bych předem ukázala jako tabulku „odkud → kam“ a po schválení provedla s logem všech přesunů (CSV s původními cestami), abys mohla cokoli vrátit. Mazání by šlo vždy přes koš Disku (30 dní), nikdy natrvalo.

---

## 10. Co od tebe potřebuju vědět (rozhodnutí)

1. **Struktura 0–9:** souhlasíš s `0 INBOX`, `8 SYSTÉM A ZÁLOHY`, `9 ARCHIV`? Nebo raději nechat `9 Temp` a doplnit jen 8?
2. **Archivy:** centrální `9 ARCHIV/<oblast>`, nebo `Z Archiv` v každé oblasti?
3. **`Shadowloop`:** jde o exporty, které umíš vygenerovat znovu? (rozhoduje o 96 + 78 MB duplicit a ~3 800 souborech)
4. **`4/Clients`:** jsou to 1:1 klientky (→ `5`), nebo účastnice kurzů (→ zůstane)?
5. **`NG`:** co přesně tahle spolupráce je (školení soft skills? odborný lektor?) — abych vytvořila správnou složku.
6. **`Easy Voice Recorder`:** zkratky `SHP`, `SZ`, `BarIT`, `PP`, `UHS`, `RenesSem` — doplň předměty. 14 nahrávek `My recording NNN` (743 MB) nepoznám bez poslechu.
7. **Olympus** (580 nahrávek hovorů, 1,7 GB): chceš držet dál, nebo stáhnout offline/smazat?
8. **UpdraftPlus:** mám navrhnout ponechání jen sady z 2026-03-27?
9. **Citlivé soubory (oddíl 7):** chceš je řešit sama, nebo to mám v dávkách přesunout do jedné složky?
10. **Pojmenování:** zavést pravidlo `YYMMDD_téma_popis` i na Disk (jako v `assets/` ve vaultu)?

---

## Přílohy (v session scratchpadu, ne ve vaultu)

Pro případnou realizaci mám připravené: strom do hloubky 2 a 3, seznam všech 2 199 duplicit, mapu kořenových souborů. Pokud chceš, vyexportuju je jako CSV do `resources/`.
