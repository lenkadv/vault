# HANDOFF — AI systém, stav 260927 večer

Navazuje na [[HANDOFF – AI systém 260926]]. Pro nové vlákno (lokální, ne cloud) stačí napsat: **„navaž na HANDOFF – AI systém 260927“**.

⚠️ **Práce z 260927 vznikla v cloudové seanci** ve větvi `claude/tender-cori-0ou1ms`. Než se na ni v lokálním vlákně navazuje, musí být ve vaultu na Disku: větev pushnout (z cloudu) a lokálně ji stáhnout a sloučit do `main` (`git fetch origin claude/tender-cori-0ou1ms` → `git merge origin/claude/tender-cori-0ou1ms`). Pokud tenhle soubor ve vaultu vidíš, je to hotové.

## Hotovo 260927 (nic dál neřešit)

- **Svodka z e-mailů** — formát ustálen, běží **denně jako krok `/daily-plan`** (skill `productivity-daily-plan`, krok 2e). Postup, pravidla podle odesílatelů, profil zájmů a úklid schránky: [[resources/postupy/svodka]]. Projekt [[svodka-newsletteru]].
  - Gmail konektor má od 260927 právo upravovat štítky (po odpojení a novém připojení). Mazat Claude nesmí — maže Lenka.
  - Štítky: `Svodka/uchovat` (Label_89), `Svodka/smazat` (Label_90). Svodka č. 1 (14.–26. 9.) vyřízená, schránka vyčištěná.
  - Svodka č. 1 (s rozborem Mollicka): https://claude.ai/artifact/7SYdebdeLaDZdvG9DV4QQ8 — další čísla na stejnou adresu.
- **Swipe** Schumacherovy webinářové sekvence → `GrowOS/lcenglish/library/swipe-content.md`.
- **Výstavy do 11. 10.** (Albertina, Belvedere, Borghese) → [[mista-k-navstiveni]] + připomínka ve [[waiting-for]] na 4. 10.
- **Slow Looking** (Behind the Masterpiece) → [[slow-looking]] + `#zettel` úkol. Städel online kurz → [[someday-maybe]].

## Rozpracované — kde navázat

| Téma | Projekt | Další krok |
|---|---|---|
| **Hlasové profily** | [[hlasove-profily]] | Lenka potvrdí 6 profilů (níže), pořadí a jestli rozdělit profesní hlas. Pak profil po profilu. **Drip, Substack a web lcenglish.cz jdou jen z lokální seance** (z cloudu blokované). |
| První denní svodka | [[svodka-newsletteru]] | 28. 9. při `/daily-plan`, období od 27. 9. |
| Průchod katalogem 1 → 7 | [[katalog-ochutnavky]] | Ochutnávka 1.1 `marketing-strategy` |
| Materiály z kurzů → NotebookLM + `brain/` | (bez projektu) | Lenka dodá seznam kurzů a kde leží; k nim patří i zdroje k psaní mailů, newsletterů a webinářových sekvencí |
| Blotato trial | [[next-actions]] @online | Spustit 28. 9. |
| GNOSTIKA / DigiStart přístup | [[waiting-for]] | Štěpánka Uličná do 1. 10. |

### Hlasové profily — rekapitulace (návrh 260926, zdroje zmapovány 260927)

| # | Hlas | Zdroj | Kam |
|---|---|---|---|
| 1 | **Lenka osobně** — běžné maily rodině, přátelům, úřadům | Gmail odeslané z `lnk.dvorakova@gmail.com` | `resources/hlas/` — jen profil + krátké ukázky, ne celé maily |
| 2 | **Lenka profesně** — klienti a instituce (EVIDENT, NG, VOX, KTF, GNOSTIKA) | Gmail: `info@lenkadvorakova.cz` (korporát), `lenka@publicspeaking.cz` (kultura/vzdělávání), část gmailu (GNOSTIKA), `lenka@lcenglish.cz` (studenti) | `resources/hlas/` — **otázka: rozdělit na korporátní a kulturně-vzdělávací?** |
| 3 | **lcenglish e-maily** — webinář před/po, prodej, newslettery | Drip (broadcasty, sekvence, statistiky otevření/kliků) — jen lokálně přes `/drip` | `GrowOS/lcenglish/brain/samples/` + `voice.md` |
| 4 | **lcenglish články na webu** | lcenglish.cz — jen lokálně | GrowOS lcenglish |
| 5 | **tadylenka** — Substack, blog | Substack export (Nastavení → Export) + 4 ukázky v samples | `GrowOS/tadylenka/brain/samples/` + `voice.md` |
| 6 | **Akademický** — seminárky | Drive: Male Gaze (finál PDF 260803 + docx), Restaurování; dvojice pro porovnání 5 × 6: `260921-eva-seminarka-na-substack.md` | `resources/hlas/` |

Otevřené otázky pro Lenku: (1) sedí 6 profilů / rozdělit 2? (2) pořadí — návrh: v lokální seanci rovnou lcenglish z Dripu (původní plán), jinak profesní z Gmailu; (3) osobní maily stále jen profil + krátké ukázky?

Z databanky: [[ABM – Brand voice guide]] — struktura pro sepsání hlasu.

## Drobnost k opravě (trvá z 260926)

`/note-inbox-review` má v Kroku 0 a „Vault struktura“ cesty z GrowOS 0.1 → přepsat na 2.0 + sync do Notion Skills DB.

## Při zavírání nezapomenout

- Sync skillu `productivity-daily-plan` do Notion Skills DB (260927 přibyl krok 2e + `assets/svodka-template.html`).
- Todoist kalendář: blok pro seanci 260927 odpoledne (svodka + hlasové profily) — Lenka nahlásí čas.
