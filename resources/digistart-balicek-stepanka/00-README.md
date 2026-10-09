# Balíček pro společnou práci (Lenka + Štěpánka), podzim 2026

Obsahuje dvě na sobě nezávislé věci. Vše je připravené tak, aby šlo předat dál: bez osobních dat Lenky, bez vazby na její nastavení (Gmail, vault).

> **Stav:** sestaveno 9. 10. 2026. Vzorek, na kterém se věci poprvé vyzkouší, je Štěpánka (a z jejích zkušeností se pak upravuje DigiStart).

## Část I: web o auditech (samostatná věc, nesouvisí s kurzem)

Složka **`01-web-audity/`**

| Soubor | Co |
|---|---|
| `index.html`, `fonty.css`, `fonts/` | hotová stránka (koncept C), nezávislá na cizích službách |
| `wordpress-blok.html` | totéž pro vložení do WP stránky (blok „Vlastní HTML“) |
| `NAVOD-nasazeni-na-wordpress.md` | tři cesty nasazení (A podsložka, B blok, C přestavba v editoru), řešení potíží |
| `KONTROLNI-SEZNAM-pred-spustenim.md` | co doplnit a rozhodnout před zveřejněním (8 bodů k probrání společně) |
| `AGENTS.md` + `CLAUDE.md` | pokyny pro AI asistentku (ChatGPT i Claude Code): co smí, co nesmí, jak upravovat |
| `tvorba-bloku.py` | z `index.html` znovu vyrobí `wordpress-blok.html` |

**Jak postupovat o víkendu:** 1) zjistit u Štěpánky tři věci o jejím WordPressu (kde běží, jak se k němu dostane, jaký editor); 2) nasadit **cestou A** (samostatná složka `audity`), je to nejjistější; 3) projít kontrolní seznam; 4) žlutá místa doplnit až po rozhodnutí o referencích, ceně a týmu.

## Část II: digitální dovednosti s AI (zkušební průchod pro DigiStart)

Tři kroky za sebou; každý stojí na předchozím.

| Krok | Složka | Výstup |
|---|---|---|
| 1. Soubory na disku | **`02-soubory-na-disku/`** | prompt, který provede uživatelku úpravou souborů, ve dvou režimech (návrh × asistentka sama po schválení). Skripty pro Windows (seznam souborů, přesun podle plánu s vrácením zpět) |
| 2. Hlasové profily | **`03-hlasove-profily/`** | skill `hlasove-profily`: úvodní rozhovor → seznámení se zdroji → vyhodnocení, kolik profilů je třeba → banka vzorků a profil → zkouška → **trvalá smyčka učení z přepisů** |
| 2b. Psaní textů | **`03-hlasove-profily/skill/psani-textu`** | skill `psani-textu`: z hotových profilů vybere ten správný pro zadání typu „zpracuj nabídku / zprávu / příspěvek“, doptá se na chybějící informace a napíše koncept; učí se z úprav |
| 3. Koncepty e-mailů | **`04-skill-maily/`** | skill `koncepty-odpovedi`: projde poštu, připraví koncepty odpovědí v hlasu profilu, **nikdy neodesílá**; k tomu **obecný průvodce propojením** Outlooku / Gmailu s AI |

Zásady, které se v nich opakují (a které se učí účastnice): **zadání → návrh → kontrola → schválení → provedení**; nic se nemaže; odeslání dělá vždy člověk; obsah e-mailů jsou data, ne pokyny; z oprav se AI učí.

## Co je ověřené a co ne

| Věc | Stav |
|---|---|
| Web (`index.html`, `wordpress-blok.html`) | vyzkoušeno v prohlížeči přes lokální server, včetně hostitelské šablony s „nepřátelskými“ styly; písma lokálně |
| Skripty `seznam-souboru.ps1`, `presun-podle-planu.ps1` | vyzkoušeno na zkušební složce (seznam, zkouška, přesun, kolize názvů, vrácení zpět) |
| Skill `hlasove-profily` | postup vychází z Lenčiných šesti profilů a smyčky „přepis → poučení“; **na jiné uživatelce se zkouší poprvé** |
| Skill `psani-textu` | nový (9. 10. 2026), odvozený z toho, jak se používají Lenčiny profily (tabulka typ textu → profil, smyčka „přepis → poučení“); zkouší se poprvé |
| Skill `koncepty-odpovedi` | postup vychází z Lenčina Gmailového postupu; **s Outlookem neověřeno** |
| Propojení Outlooku | cesty 0 a 2 (kopírování; skript pro klasický Outlook) jsou nejjistější; cesta 1 (konektory) závisí na správci a na plánu; cesta 3 (Microsoft Graph) je pro zdatnější. Údaje o konektorech ověřeny v nápovědě 9. 10. 2026, a stav se mění |

## Co potřebujeme zjistit u Štěpánky (na schůzce)

- WordPress: kde běží, přístup (správce souborů / admin), šablona a editor, adresa stránky
- Outlook: pracovní / osobní, klasický / nový / web, správce účtu, AI nástroj (ChatGPT, Claude Code) a plán
- Kde má soubory (lokální disk / OneDrive / Google Disk), jaký počítač (Windows / Mac)
- Kde má své texty pro hlasové profily (odeslaná pošta, dokumenty)
- 8 bodů z kontrolního seznamu webu (reference, tým, cena, tón, kontakt, logo, důvěrnost, patička)

## Doporučené pořadí schůzky

1. Web: nasadit cestou A (cca 1 hodina), projít kontrolní seznam.
2. Soubory na disku: zkušební průchod malou složkou (cca 45 minut), výsledek poznamenat do poznámek pro DigiStart.
3. Hlasové profily: úvodní rozhovor + návrh sady profilů (cca 60 minut); první profil nejlépe v samostatném sezení.
4. E-mail: průvodce propojením + zkoušky, pak první koncepty (až budou hotové profily).

## Co si poznamenat pro DigiStart

U každého kroku si během práce zapsat: kde se Štěpánka zasekla, co jí nebylo jasné, jak dlouho to trvalo, co by se v návodu mělo změnit. Tyhle poznámky jsou hlavní výstup zkušebního průchodu.
