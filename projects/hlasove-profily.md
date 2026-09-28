# Hlasové profily — banka textů a styly psaní

**Oblast:** [[areas/ai-nastroje]] (souvisí s [[areas/lcenglish]], [[areas/tadylenka]], [[areas/studies]])
**Založeno:** 260926
**Stav:** aktivní — profily potvrzeny 260927, začíná se lcenglish e-maily z Dripu

## Cíl

Méně přepisování toho, co Claude napíše. Z banky Lenčiných skutečných textů postavit několik hlasových profilů a u každého zavést smyčku „Claude navrhne → Lenka přepíše → rozdíl se uloží jako poučení“ (tak vznikl dobře fungující hlas Art for English).

## Profily (potvrzeno 260927)

Rozhodnutí 260927: **6 profilů, profesní hlas jeden** (rozdíl korporát × kultura/vzdělávání jen jako poznámka v profilu); **pořadí: začít lcenglish e-maily z Dripu**; u osobních mailů **smí do banky i celé maily**.

| # | Hlas | Zdroj textů | Kam |
|---|---|---|---|
| 1 | Lenka osobně (běžné maily) | Gmail odeslané | `resources/hlas/` — profil + banka, celé maily povoleny (260927) |
| 2 | Lenka profesně (klienti, GNOSTIKA, KTF, NG) | Gmail odeslané, reporty | `resources/hlas/` |
| 3 | lcenglish e-maily — webinář před/po, prodej, newslettery | Drip (broadcasty přes API; webinářové sekvence možná jen exportem — ověřit) + statistiky otevření/kliků = co fungovalo | `GrowOS/lcenglish/brain/samples/` + `voice.md` |
| 4 | lcenglish články na webu | lcenglish.cz | GrowOS lcenglish |
| 5 | tadylenka (Substack, blog) | Substack | `GrowOS/tadylenka/brain/samples/` + `voice.md` |
| 6 | Akademický | seminárky (docx) | `resources/hlas/` |

GrowOS už má správná místa: `brain/samples/` (banka), `brain/voice.md` (profil), `brain/lessons/` (poučení z přepisů). lcenglish má ~20 A4E newsletterů v samples, tadylenka jen 3–4.

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
- [ ] Profil po profilu: banka → návrh profilu → Lenčiny opravy. Profil 3 (lcenglish e-maily): banka + návrh hotové 260927.
  - [x] Profil 3: návrh odsouhlasen 260927 (odkaz víckrát = OK, příběhový styl lepší, ale ověřit proti kurzům)
  - [x] Statistiky LCEnglish staženy 260928 (broadcasty 2023–2025 kompletní + část 2020–21) → `GrowOS/lcenglish/brain/research/260928-drip-statistiky-broadcastu.md`. Trik: MCP/API `metrics/email` s filtrem `broadcast_ids` po 10 = ~18 dotazů na 3 roky.
  - [x] Zhodnotit webinářovou sekvenci AI lektorů 260928 → [[01-rozbor-webinarove-sekvence]] (prodává webinář; −15 min a záznam ≈ polovina tržeb; 3 maily poslední den bez únavy; nedělní mail nejslabší; 2 otázky pro Lenku na konci)
  - [x] Profil 5 (tadylenka): Substack export → `GrowOS/tadylenka/brain/samples/substack-archiv/` (10 článků + otevíranost) 260927
  - [ ] Kurzy z [[kurzy-marketing]] projít s Lenkou (postupně, nejdřív ten nejaktuálnější)
  - [ ] Profil 2 — profesní (Gmail, 4 adresy): nové vlákno „Hlasové profily — profesní“, Claude sbírá banku + píše návrh, Lenka opravuje #next-action #online
  - [ ] Profil 6 — akademický (Drive seminárky + dvojice Eva seminárka/Substack)
  - [ ] Profil 1 — osobní (Gmail)
  - [ ] Profil 4 — web lcenglish.cz (jen lokální seance)
  - [ ] Profil 5 — tadylenka: návrh profilu z `substack-archiv/` (banka hotová)

**Rytmus:** 1 profil = 1 vlákno = 1 blok v kalendáři (~1 h Lenčina času: přečíst návrh a opravit). Po dokončení profilu next-action advancement na další v pořadí výše a navrhnout blok na další profil.
- [ ] Zavést pravidlo „přepis → lessons/“ pro všechny hlasy (zapsat do CLAUDE.md / GrowOS lessons)
- [ ] Volitelně: nainstalovat skill Email Triage (Productivity Pack v `Downloads`) — jeho voice-profile je menší verze profilu 1

## Související

- Jonův ruční `voice.md` (mail 17. 9.: ukázka textu, věta o byznysu „jak u večeře“, typická fráze) — vstup pro profil 1
- Swipe pro webinářové maily: série Jona Schumachera 14.–26. 9. v Gmailu (viz [[svodka-newsletteru]])
- [[youcloned-ai-clone-setup]], [[katalog-moznosti]]
