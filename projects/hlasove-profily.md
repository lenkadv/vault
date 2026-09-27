# Hlasové profily — banka textů a styly psaní

**Oblast:** [[areas/ai-nastroje]] (souvisí s [[areas/lcenglish]], [[areas/tadylenka]], [[areas/studies]])
**Založeno:** 260926
**Stav:** aktivní — zdroje zmapovány 260927, čeká na Lenčino potvrzení profilů

## Cíl

Méně přepisování toho, co Claude napíše. Z banky Lenčiných skutečných textů postavit několik hlasových profilů a u každého zavést smyčku „Claude navrhne → Lenka přepíše → rozdíl se uloží jako poučení“ (tak vznikl dobře fungující hlas Art for English).

## Profily (návrh 260926, Lenka potvrdí)

| # | Hlas | Zdroj textů | Kam |
|---|---|---|---|
| 1 | Lenka osobně (běžné maily) | Gmail odeslané | `resources/hlas/` — jen profil + krátké ukázky, **ne celé maily** (cizí údaje, Git/GitHub) |
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

## Postup

- [x] Zmapovat zdroje (260927, viz Mapa zdrojů výše)
- [ ] S Lenkou potvrdit rozdělení do profilů, pořadí a co do banky patří #next-action #online
- [ ] Profil po profilu: banka → návrh profilu → Lenčiny opravy. Začít lcenglish e-maily z Dripu.
- [ ] Zavést pravidlo „přepis → lessons/“ pro všechny hlasy (zapsat do CLAUDE.md / GrowOS lessons)
- [ ] Volitelně: nainstalovat skill Email Triage (Productivity Pack v `Downloads`) — jeho voice-profile je menší verze profilu 1

## Související

- Jonův ruční `voice.md` (mail 17. 9.: ukázka textu, věta o byznysu „jak u večeře“, typická fráze) — vstup pro profil 1
- Swipe pro webinářové maily: série Jona Schumachera 14.–26. 9. v Gmailu (viz [[svodka-newsletteru]])
- [[youcloned-ai-clone-setup]], [[katalog-moznosti]]
