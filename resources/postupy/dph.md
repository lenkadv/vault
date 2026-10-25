# Postup: přiznání k DPH (identifikovaná osoba)

Lenka je **identifikovaná osoba** (ne plátce DPH). Přiznání DPHDP3 podává za každý měsíc, kdy přijala přiznávanou službu ze zahraničí. Lhůta: **25. den následujícího měsíce** (připadne-li na víkend nebo svátek, posouvá se na nejbližší pracovní den). Dohodnuto 261025.

## Co se přiznává (rozhodnutí Lenky 261025)

- **Přiznává se jen Anthropic (Claude).** U účtu je zadané její evropské DIČ, faktury chodí bez DPH (reverse charge) a Claude používá veřejně k práci (kurzy o Claudu). Proto tam patří. Odebrání DIČ se 24. 9. nepovedlo a Lenka ho už nezkouší ([vlákno podpory](https://mail.google.com/mail/?authuser=lnk.dvorakova@gmail.com#all/thread-f:1877248236423122264)).
- **Ostatní služby z USA (Drip, BNSN/Jon Benson, Canva apod.) Lenka záměrně nepřiznává.** Je to její rozhodnutí, nepřesvědčovat. Claude je jen **vypíše z výpisů jako „další zahraniční služby“** a o zařazení rozhoduje Lenka, ad hoc.
- Soukromé platby (cestování, restaurace, Netflix, e-shopy se zbožím) se nevypisují.
- Řádek: Anthropic jde na **řádek 5** (`p_sl23_e` základ, `dan_psl23_e` daň), stejně jako v srpnu. Částka = koruny z výpisu Air Bank (ne kurz ČNB), zaokrouhleno na celé Kč; daň 21 %.

## Měsíční postup

1. **1.–2. den v měsíci** chodí do Gmailu výpisy Air Bank z obou účtů (Private 1332021013, Business 1332021048; Business od 261025). Jsou zaheslované. **Svodka je dá do „Vyžaduje pozornost“** s pokynem: odheslovat a uložit.
2. **Lenka** výpisy odheslí a uloží do `G:\Můj disk\01 PRIVATE 🏡\Finance\Výpisy Air Bank\YYYY\` jako `Private YYYY-MM.pdf` a `Business YYYY-MM.pdf`. Claude s hesly nepracuje.
3. **Claude** přečte oba výpisy (`pdftotext -enc UTF-8 -raw`), najde platby Anthropic (bývá na Business kartě …4219) a k nim účtenku v Gmailu (`from:anthropic receipt`). Vypíše tabulku: Anthropic (přiznává se) + další zahraniční služby (jen k informaci).
4. **Lenka** potvrdí.
5. **Claude** připraví XML z posledního podaného přiznání (`Finance\DPH\YYYY\`): změní `mesic`, `rok`, `d_poddp` a částky ve `Veta1` a `Veta6`, blok `<Kontrola>` vynechá. Uloží jako `DPH YYYY-MM.xml`.
6. **Lenka** soubor nahraje v Moje daně, zkontroluje a odešle. Pak soubor přejmenuje na `DPH YYYY-MM podáno.xml` (nebo to udělá Claude, až to Lenka řekne).

Mezi příchodem výpisu a 25. je dost času; v denním plánu stačí jeden krátký blok.

## Soubory

- Výpisy: `G:\Můj disk\01 PRIVATE 🏡\Finance\Výpisy Air Bank\YYYY\`
- Přiznání (XML): `G:\Můj disk\01 PRIVATE 🏡\Finance\DPH\YYYY\`
- Struktura XML: [popis struktur EPO](https://adisspr.mfcr.cz/dpr/adis/idpr_pub/epo2_info/popis_struktury_seznam.faces), pokyn [GFŘ-D-50](https://financnisprava.gov.cz/assets/cs/prilohy/d-seznam-dani/Pokyn_GFR_D_50.pdf).

## Ověřeno

- 261025: přiznání za září 2026 nahrané z XML bez bloku `<Kontrola>` Moje daně přijaly, Lenka odeslala a zaplatila. Datum podání `d_poddp` = den odeslání.
