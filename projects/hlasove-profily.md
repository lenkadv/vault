# Hlasové profily — banka textů a styly psaní

**Oblast:** [[areas/ai-nastroje]] (souvisí s [[areas/lcenglish]], [[areas/tadylenka]], [[areas/studies]])
**Založeno:** 260926
**Stav:** aktivní — zatím jen návrh, mapování nezačalo

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

## Postup

- [ ] Zmapovat zdroje (jen čtení, dělá Claude, ~20 min): kolik odeslaných mailů v Gmailu a z jakých adres, co je v Dripu (broadcasty, sekvence, statistiky), Substack, web #next-action #online
- [ ] S Lenkou potvrdit rozdělení do profilů a co do banky patří (~15 min)
- [ ] Profil po profilu: banka → návrh profilu → Lenčiny opravy. Začít lcenglish e-maily z Dripu.
- [ ] Zavést pravidlo „přepis → lessons/“ pro všechny hlasy (zapsat do CLAUDE.md / GrowOS lessons)
- [ ] Volitelně: nainstalovat skill Email Triage (Productivity Pack v `Downloads`) — jeho voice-profile je menší verze profilu 1

## Související

- Jonův ruční `voice.md` (mail 17. 9.: ukázka textu, věta o byznysu „jak u večeře“, typická fráze) — vstup pro profil 1
- Swipe pro webinářové maily: série Jona Schumachera 14.–26. 9. v Gmailu (viz [[svodka-newsletteru]])
- [[youcloned-ai-clone-setup]], [[katalog-moznosti]]
