# Hlasové profily — banka textů a styly psaní

**Oblast:** [[areas/ai-nastroje]] (souvisí s [[areas/lcenglish]], [[areas/tadylenka]], [[areas/studies]])
**Založeno:** 260926
**Stav:** aktivní — všech 6 profilů hotových (260929), pravidlo „přepis → poučení“ zavedeno 261004. Zbývá: kurzy z [[kurzy-marketing]]

## Cíl

Méně přepisování toho, co Claude napíše. Z banky Lenčiných skutečných textů postavit několik hlasových profilů a u každého zavést smyčku „Claude navrhne → Lenka přepíše → rozdíl se uloží jako poučení“ (tak vznikl dobře fungující hlas Art for English).

## Profily (potvrzeno 260927)

Rozhodnutí 260927: **6 profilů, profesní hlas jeden** (rozdíl korporát × kultura/vzdělávání jen jako poznámka v profilu); **pořadí: začít lcenglish e-maily z Dripu**; u osobních mailů **smí do banky i celé maily**.

| # | Hlas | Zdroj textů | Kam |
|---|---|---|---|
| 1 | Lenka osobně (běžné maily) | Gmail odeslané | `resources/hlas/osobni/` — banka + profil (260929), celé maily povoleny (260927) |
| 2 | Lenka profesně (klienti, GNOSTIKA, KTF, NG) | Gmail odeslané, reporty | `resources/hlas/profesni/` (banka + profil, 260928) |
| 3 | lcenglish e-maily — webinář před/po, prodej, newslettery | Drip (broadcasty přes API; webinářové sekvence možná jen exportem — ověřit) + statistiky otevření/kliků = co fungovalo | `GrowOS/lcenglish/brain/samples/` + `voice.md` |
| 4 | lcenglish články na webu | lcenglish.cz | GrowOS lcenglish |
| 5 | tadylenka (Substack, blog) | Substack | `GrowOS/tadylenka/brain/samples/` + `voice.md` |
| 6 | Akademický | seminárky (docx) + články Mundus Symbolicus (sdílený disk, Čistopisy) | `resources/hlas/akademicky/` (banka + profil, 260929) |

GrowOS už má správná místa: `brain/samples/` (banka), `brain/voice.md` (profil), `brain/lessons/` (poučení z přepisů). lcenglish má ~20 A4E newsletterů v samples, tadylenka jen 3–4.

**Vzorový cizí hlas (260930):** Česká filharmonie → [[profil-ceska-filharmonie]] (`resources/hlas/ceska-filharmonie/`). Není to Lenčin hlas, jen uchovaný vzor dobré kulturní komunikace; doplňuje se průběžně ze svodky.

## Mapa zdrojů (260927, jen čtení)

**Gmail — odeslané:** každá ze 4 adres má 200+ odeslaných vláken (Gmail víc nepočítá). Adresy se kryjí s rolemi:

| Adresa | Komu píše (vzorek červen–září 2026) | Hlas |
|---|---|---|
| lnk.dvorakova@gmail.com | rodina, přátelé, úřady, e-shopy; ale i GNOSTIKA / DigiStart (Štěpánka Uličná) | 1 osobní (+ část 2) |
| info@lenkadvorakova.cz | EVIDENT (firemní školení, HR, víc lidí v kopii) | 2 profesní — korporát |
| lenka@publicspeaking.cz | NG Praha, VOX kurzy, KTF knihovna | 2 profesní — kultura/vzdělávání |
| lenka@lcenglish.cz | studenti a klienti lcenglish (Tandem) | 2 profesní — lektorka / 3 lcenglish 1:1 |

**Drip, Substack, web lcenglish.cz:** z cloudového prostředí nedostupné (síť je blokuje). Drip jde přes GrowOS skill `/drip` v seanci na Lenčině počítači; Substack umí export všech článků (Nastavení → Export) jako zip; web přes lokální seanci.

**Akademický text (Drive):** seminárka Male Gaze (finál `LDvorakova_Male Gaze_260803.pdf`, docx ve složce „Male gaze v renesančním umění“), seminárka Restaurování (`seminarka-restaurovani.md`), a hlavně **`260921-eva-seminarka-na-substack.md`** — převod téže látky z akademického do tadylenka hlasu = ideální dvojice pro porovnání hlasů 5 a 6.

**Už ve vaultu:** lcenglish `brain/samples/` 27 souborů (A4E newslettery 1–20+), tadylenka 4 (De Chirico, Courbet, Eva — pin-up); oba `voice.md` ~3 KB.

**Z databanky:** [[ABM – Brand voice guide]] (skill, neprozkoumáno) — struktura pro sepsání hlasu značky.

## Profil 3 — lcenglish e-maily (260927)

- Celý archiv Dripu stažen do `GrowOS/lcenglish/brain/samples/drip-archiv/`: 505 broadcastů 2018–2026 (soubor na rok) + 17 sérií (webinář HELE EW, HELE funnel/inside, 5denní výzva, GTKY, Overture, Revival, nepravidelná slovesa, onboardingy). Surový text, 1,2 MB.
- Statistiky: u broadcastů a sérií API vrací nuly, ale existuje endpoint `GET /v2/:account/metrics/email` (odhaleno z dokumentace Drip MCP 260927) — otevření, kliky, odhlášení, tržby po e-mailech. Data od 2020, okno max. 366 dní, max. 10 e-mailů na odpověď, **20 dotazů/h na účet**. Stahování všech broadcastů 2020+ běží skriptem (~2,5 h).
- Drip MCP (`https://api.getdrip.com/mcp`, OAuth, čtení/zápis) = stejné API v2, nic navíc; výhoda jen v tom, že nepotřebuje klíč v `.env` a jde připojit v claude.ai. Obsah e-mailů z workflow (např. webinář post-registration) nevrací ani API, ani MCP — jen názvy kroků přes `/workflows/:id/details`.
- `.env` lcenglish: řádek 10 nejde načíst přes `. .env` (hodnota s mezerou bez uvozovek) → Drip klíč načítat jen `grep '^DRIP_'`.
- Návrh hlasu pro webinářové a prodejní e-maily: `GrowOS/lcenglish/brain/research/260927-hlas-webinarove-a-prodejni-emaily.md` — čeká na Lenčiny opravy (4 otázky na konci), pak přenést do `voice.md`.

## Stav 260927 (večer)

- Reference z Gmailu (štítek testimonial): lcenglish → `GrowOS/lcenglish/brain/proof/` (6 souborů, approval pending), AI lektoři → [[reference-ai-lektori]].
- Drip AI lektoři (účet 8879539, 282 broadcastů + 19 sérií) → `resources/hlas/drip-ai-lektori/`; statistiky obou účtů se stahují skriptem (limit 20 dotazů/h).
  - **AI lektoři hotovo 260927 23:48** → `resources/hlas/drip-ai-lektori/00-statistiky.md` (248 e-mailů, 717 objednávek připsaných e-mailům). **LCEnglish pomalé** — automatické série zahlcují okna (10 e-mailů/dotaz), za 2 h jen leden–březen 2023; běží s `SINCE=2023-01-01`. Příště nejdřív zkusit parametr, který omezí metrics jen na broadcasty (např. `email_type`), jinak nechat běžet přes noc.
  - Výsledky statistik (dočasně, mimo vault): LCEnglish `C:/Users/Lenka/AppData/Local/Temp/claude/G--M-j-disk-vault/cafa1e1f-83d0-4f66-b280-05e696153b41/scratchpad/drip/metrics_all.json`, AI lektoři `…/d2deb034-9f08-4ea8-b4d3-07b1bcbd5259/scratchpad/ail/metrics_all.json` (logy `crawl.log` vedle). Skript `metrics_crawl.py` je resumable — při přerušení znovu spustit ve stejné složce s `DRIP_API_KEY` a `DRIP_ACCOUNT_ID` (2094497 / 8879539). Po doběhnutí přesunout výsledky do vaultu (research lcenglish / resources/hlas).
- Skill `/drip` — nová verze připravena, Lenka ji kopíruje sama (`GrowOS/.claude/` je machine set, guard blokuje Clauda).

## Postup

- [x] Zmapovat zdroje (260927, viz Mapa zdrojů výše)
- [x] S Lenkou potvrdit rozdělení do profilů, pořadí a co do banky patří (260927)
- [x] Profil po profilu: banka → návrh profilu → Lenčiny opravy (všech 6 hotových 260929). Profil 3 (lcenglish e-maily): banka + návrh hotové 260927.
  - [x] Profil 3: návrh odsouhlasen 260927 (odkaz víckrát = OK, příběhový styl lepší, ale ověřit proti kurzům)
  - [x] Statistiky LCEnglish staženy 260928 (broadcasty 2023–2025 kompletní + část 2020–21) → `GrowOS/lcenglish/brain/research/260928-drip-statistiky-broadcastu.md`. Trik: MCP/API `metrics/email` s filtrem `broadcast_ids` po 10 = ~18 dotazů na 3 roky.
  - [x] Zhodnotit webinářovou sekvenci AI lektorů 260928 → [[01-rozbor-webinarove-sekvence]] (prodává webinář; −15 min a záznam ≈ polovina tržeb; 3 maily poslední den bez únavy; nedělní mail nejslabší; 2 otázky pro Lenku na konci)
  - [x] Profil 5 (tadylenka): Substack export → `GrowOS/tadylenka/brain/samples/substack-archiv/` (10 článků + otevíranost) 260927
  - [x] Profil 2 — profesní: banka + návrh 260928 → [[banka-profesni]], [[profil-profesni]] (26 mailů: PENTA, EVIDENT, Galleko, NG, VOX, KTF; maily Štěpánce Uličné vyřazeny — specifický tón kamarádky a spolupracovnice)
  - [x] Profil 2: odpovědi na otázky zapracovány, profil odsouhlasen 260928
  - [x] Profil 6 — akademický: banka + návrh 260929 → [[banka-akademicky]], [[profil-akademicky]] (4 seminárky: Vojtěch 2025, Male Gaze, Restaurování, Litomyšl 2026 + lekce Eva; Restaurování a Litomyšl podezřele „AI-neutrální“ → otázka 1)
  - [x] Profil 6: odpovědi zapracovány 260929, doplněny články Mundus Symbolicus I/I/07 a I/I/08, sekce „Práce s AI podporou“ (Vojtěch = měřítko hlasu)
  - [x] Profil 6: seznam AI obratů potvrzen celý 260929, Claude ho hlídá i v Lenčiných větách; IN OMNEM TERRAM = druhé měřítko hlasu
  - [x] Profil 1 — osobní: banka + návrh 260929 → [[banka-osobni]], [[profil-osobni]] (20 vláken z Gmailu: blízcí a spolužáci, známí a vyučující, úřady a stížnosti, anglické podpory; rodinná korespondence v Gmailu skoro není)
  - [x] Profil 1: odpovědi zapracovány, profil odsouhlasen 260929 (občanský profil; Štěpánka = blízcí, kromě mailů na víc adresátů; tučné odrážky v delších mailech OK; „není X, je Y“ max. jednou)
  - [x] Profil 4 — web lcenglish.cz: web stažen 260929 (WordPress API, 121 textů → `GrowOS/lcenglish/brain/samples/web-archiv/`), návrh → `GrowOS/lcenglish/brain/research/260929-hlas-web-clanky-navrh.md`
  - [x] Profil 4: zapracováno do lcenglish `voice.md` 260929 (sekce „Delší výukové texty“: kurzy, materiály, videoskripty; blogové SEO články se už nepíšou)
  - [x] Profil 5 — tadylenka: návrh 260929 → `GrowOS/tadylenka/brain/research/260929-hlas-tadylenka-navrh.md` (voice.md sedí v jádru; chybí první osoba, anachronismy, krátká věta jako pointa; podrežimy podle rubrik; 4 podezřelé AI pasáže)
  - [x] Profil 5: odpovědi zapracovány do `GrowOS/tadylenka/brain/voice.md` 260929 (první osoba a anachronismy = záměr; krátká věta jen jako pointa; recenze v hlasu, ze skillu review-exhibition jen postup; uvítací příspěvek přepsat → [[tadylenka-publishing]])

**Rytmus:** 1 profil = 1 vlákno = 1 blok v kalendáři (~1 h Lenčina času: přečíst návrh a opravit). Po dokončení profilu next-action advancement na další v pořadí výše a navrhnout blok na další profil.
- [x] Doplnit do profilů 3 prvky z [[ABM – Brand voice guide]] (odvozené z banky, ne z dotazníku): vlastnosti „znamená / neznamená“, tabulka „jsme / nejsme“, jedno sdělení v různých situacích (Lenka zkontroluje), kontrolní seznam pro Clauda. Pilot na [[profil-profesni]], pak jako šablona pro další profily (260928)
  - 260929 pilot doplněn do [[profil-profesni]] (4 vlastnosti se „znamená / neznamená“, tabulka „jsem / nejsem“, jedno sdělení v 5 situacích, kontrolní seznam)
  - [x] Lenka ukázky schválila 260929 („funguje to výborně“); prvky doplněny do všech profilů: [[profil-osobni]], [[profil-akademicky]], lcenglish a tadylenka `voice.md`
- [ ] Projít kurzy z [[kurzy-marketing]] s Lenkou — postupně, nejdřív ten nejaktuálnější; cíl: vytěžit pro psaní e-mailů, webinářových sekvencí, prodejních stránek (Lenka 261004: rozhodně chceme) #next-action #online
- [x] Přenést vzory odpovědí z Drive dokumentu „Průběžný pracovní“ do hlasových profilů ✅ 2026-10-04 → profil 3: nová sekce „Odpovědi účastníkům a studentům“ v `GrowOS/lcenglish/brain/voice.md`, banka [[odpovedi-ucastnikum-ai-workshopy]] v `brain/samples/`; v [[profil-profesni]] a [[hlasy]] odkaz. Zbývá jen Lenčina kontrola návrhu (2 ukázkové verze na konci sekce).
- [x] Lenka: zkontrolovat 2 ukázkové verze na konci sekce „Odpovědi účastníkům a studentům“ v `GrowOS/lcenglish/brain/voice.md` ✅ 2026-10-05 — v pořádku, bez úprav
- [x] Zavést pravidlo „přepis → lessons/“ pro všechny hlasy ✅ 2026-10-04 → `resources/postupy/hlasy.md` + řádek v tabulce Postupy v CLAUDE.md + memory `reference_voice_profiles`
- [x] ~~Skill Email Triage~~ — nenainstalovat (261004): to samé dělá svodka; zvážit jen vzor: koncept návrhů odpovědí v Lenčině hlasu u mailů z „Vyžaduje pozornost“

## Související

- Jonův ruční `voice.md` (mail 17. 9.: ukázka textu, věta o byznysu „jak u večeře“, typická fráze) — vstup pro profil 1
- Swipe pro webinářové maily: série Jona Schumachera 14.–26. 9. v Gmailu (viz [[svodka-newsletteru]])
- [[youcloned-ai-clone-setup]], [[katalog-moznosti]]
