# Mapa webu lcenglish.cz

**Oblast:** [[lcenglish]] · **Založeno:** 261024 (Claude, při přestavbě webu) · **Souvisí:** [[web-lcenglish-audit-261024]], [[kontext-ukolu#Weby mimo WordPress]], [[hele-funnel]]

Co kde na webu je, z čeho je postavené a co na to vede. Aktualizovat vždy, když přibude nebo zmizí stránka, formulář nebo odkaz z reklamy či e-mailu. „Odhad“ = neověřeno.

## Hlavní stránky (menu a patička)

| Adresa | Co to je | Postaveno | Co na to vede |
|---|---|---|---|
| `/` | Hlavní stránka (fotka, loga, čísla, o mně, 6 vybraných článků: od 261026 nejčtenější podle Metricoolu, zkratka `[lce-posledni-clanky clanky="673,6755,925,1363,578,1446"]`, výběr se mění jen tady) | bloky WordPressu (Kadence) + doplněk `lce-blog-filtr.php` | menu Home, logo, patička Homepage |
| `/blog/` | Seznam článků s filtrem (pokročilost, dovednost, hledání) | Kadence + doplněk `lce-blog-filtr.php` | menu Blog, patička |
| `/kurzy/` | Přehled 3 kurzů s odkazy na prodejní stránky | bloky WordPressu | menu Kurzy |
| `/contact/` | Kontaktní formulář (Fluent Forms č. 1 → e-mail na lnk.dvorakova@gmail.com) | bloky WordPressu | menu Kontakt, patička |
| `/privacy-policy/` | Ochrana osobních údajů | editor bloků | patička, formuláře Dripu |
| `/obchodni-podminky/` | Obchodní podmínky | editor bloků | patička |

## Prodej (cesta zákazníka)

| Kurz | Prodejní stránka | Objednávka | Po zaplacení |
|---|---|---|---|
| 10x ENGLISH | `/10x-english/` (Leadpages `Ytf0hlJeNc`, vkládá plugin Leadpages) | tlačítka vedou rovnou na formulář FAPI (`form.fapi.cz`) | FAPI → fapipi → Drip, Shadowloop, FreshLearn ([[hele-funnel]]) |
| Nepravidelná slovesa za 14 dní | `/irregular/` (Leadpages, plugin Leadpages) | **5 tlačítek vede na `/irregular-cho/`** = objednávková stránka s formulářem FAPI (790 Kč) a 3 referencemi, z bloků WordPressu (od 261024, ID 7433, bez hlavičky a patičky, noindex) | FAPI → fapipi |
| Angličtina s příběhem (HELE) | `/hele/` (Leadpages `1ViPiydGxm`, plugin Leadpages, od 261025; 9 tlačítek na `/hele-checkout/`, banner ThePay v patičce) | `/hele-checkout/` = objednávková stránka jako `/irregular-cho/` (WP 7446, formulář FAPI 5 970 Kč, 3 reference k HELE, styl vložený přímo ve stránce, noindex, titulek „Objednávka: Angličtina s příběhem“) | FAPI → fapipi (segment `hele`) |

Pozor: `/nepravidelna-slovesa/` je blogový článek z roku 2020, ne prodejní stránka.

## Mimo WordPress (jen nasměrovaná subdoména)

| Adresa | Co to je | Kde běží |
|---|---|---|
| `kurzy.lcenglish.cz` | kurzy pro kupující | FreshLearn |
| `shadowloop.lcenglish.cz` | aplikace Shadowloop | Google Firebase (`shadowloop-firebase`) |
| `fapipi.lenkadvorakova.cz` | automatika po zaplacení (FAPI → Drip, Shadowloop, FreshLearn) | server kybersquat.cz (MasterDC) |
| `staging.lcenglish.cz` | zkušební kopie webu (neindexovaná, bez měření) | stejný hosting |

## Bývalé stránky Elementoru (od 261024 Elementor vypnutý)

| Adresa | Co to je | Stav 261024 |
|---|---|---|
| `/uprava/`, `/thank-you/` | prázdná „Správa osobních informací“, staré poděkování 2022; odkazy nenalezeny | v konceptech (404) |
| `/anglicky-za-tyden/`, `/anki-navod/` | 2 připnuté články | editor bloků (obsah beze změny) |
| `/hele-sp/` 7438, `/hele-ew-sp/` 7439, `/hele-ew-reg/` 7443 (WebinarKit), `/hele-ew-ty/` 7444, `/hele-ew-replay/` 7445, `/hele-checkout/` 7446 (od 261025 objednávka podle `/irregular-cho/`), `/hele-checkout-ew/` 7447 (SimpleShop, mrtvé) | stránky HELE z 2022 | bloky WordPressu, bez hlavičky a patičky, vzhled třída `lce-lp` v `lce-blog-filtr.php`; kromě `/hele-sp/` noindex; řeší se s HELE |
| `/shakespeare-mail/` 7448 | Den angličtiny (2022) | bloky, noindex; asi smazat |
| koncepty: stará /hele/ 7119, /hele/ z bloků 7436 (slug `hele-bloky`, od 261025), xDemo ×4, landing #707 a #3089, archivní Home/Kurzy/Kontakt/Irregular ChO, staré vstupní stránky Elementoru | — | smazat po čase spolu s pluginem Elementor |

## Drip na webu

- Sledovací kód Dripu (účet 2094497) na všech stránkách WordPressu.
- 84 formulářů Dripu, většinou vyskakovací okna u konkrétních článků (seznam v Dripu, každý má adresu článku).
- Dvě okna nemají omezení na stránky (zobrazují se kdekoli): „Chcete ode mne dostávat angličtinářské tipy e-mailem?“ (ID 37175075, 2022) a „Welcome to Lights Camera English! … přepis videa“ (ID 663641640, 2018). Odhad: to druhé je zastaralé, prověřit.

## Identita a obrázek pro sdílení

- **Identita:** vizuální identita LCEnglish „Galerie“ (261025) je v `GrowOS/lcenglish/brain/brand.md` a ve vzorníku https://claude.ai/artifact/YR59A2aWtN8eTQYshtiNCF. Samostatný soubor identity webu jako u [[resources/web-lenkadvorakova/identita]] lcenglish.cz nemá.
- **Obrázek pro sdílení (od 261026, Lenka schválila):** `wp-content/uploads/2026/10/lcenglish-sdileni.jpg` (médium 7468, 1200×630) = výřez úvodu hlavní stránky (fotka na pozadí města `bckg2web-scaled.jpg`, bílý nadpis „Chcete se (na)učit anglicky?“ v DM Serif Display, světlé logo vlevo nahoře). **Pravidlo (Lenka 261026): náhled pro sdílení vychází z toho, jak vypadá web**, ne ze vzoru jiného webu. Nastaveno: Rank Math → Titles & Meta → Global → OpenGraph Thumbnail (výchozí pro celý web: Home, Blog, Kontakt a vše bez vlastního obrázku) a výslovně u Kurzů (7425) a `/irregular-cho/` (7433) přes `rankmath/v1/updateMeta` (dřív tužka „irregular“ a `irregular-red.jpg` 350×350). Články blogu sdílejí svůj náhledový obrázek (beze změny). Zdrojové HTML obrázku se dá vyrobit znovu headless Edge 1200×630.
- **Prodejní stránky v Leadpages (261026):** `/irregular/` = Goya v barvách Galerie (šedotón × #D1003A jako hero, asset `hkgduy0c6x7pivi2l0bh0h8x`, dřív korálový); `/10x-english/` = Pissarro, *Two Young Peasant Women* (Met [437304](https://www.metmuseum.org/art/collection/search/437304), public domain) vyříznutý na 1200×630 z originálu (asset `a5zyeirb4fk3nhb6mbuu2y0i`, dřív 599×463); `/hele/` beze změny (maketa kurzu). Nastaveno `update_page_seo` (platí hned). Ověřeno curlem na lcenglish.cz a v Sharing Debuggeru Facebooku (hlavní stránka znovu načtena 261026, ostatní adresy Facebook dosud neměl v mezipaměti).

## Měření (všechny stránky WordPressu)

Doplněk `wp-content/mu-plugins/lce-mereni.php` (kopie [[resources/web-lcenglish/lce-mereni.php]]): Meta pixel 552638212929820, Google Tag Manager GTM-W7T2DNRP, GA4 G-TPM0Q6YT3M, Google Ads AW-969557192, Sklik. Leadpages stránky mají pixel ve vlastní hlavičce, nákup měří FAPI.

## ThePay

ThePay (platby kartou přes FAPI) vyžaduje banner se svým logem a logy karet na titulní stránce projektu, ideálně v patičce, do 30 dní od spuštění brány ([náležitosti projektu](https://www.thepay.eu/cs/nalezitosti-projektu/), ověřeno 261025). Banner: `https://gate.thepay.cz/img/thepay-v2-220209-bw-gpay.svg?pid=1345` s odkazem na `https://web.thepay.cz/`. **Pravidlo (Lenka 261025): banner ThePay jen na prodejních stránkách** (v patičce), ne na hlavní stránce ani jinde na webu, kde se nic neprodává. Stav 261025 12:20: je v patičce `/hele/`, `/irregular/` a `/10x-english/`. Na tmavé patičce bez bílého rámečku, převedený stylem do tlumené světle šedé (`filter:grayscale(1) invert(1) brightness(1.3)`, průhlednost 0,55), protože ThePay nemá variantu pro tmavé pozadí (má jen `bw` a `white`, obě pro světlé). Zda ThePay úpravu barvy akceptuje, neověřeno.

**Patička prodejních stránek v Leadpages (Lenka 261025):** „LCEnglish“ jako odkaz na `https://lcenglish.cz/` (podtržení jen po najetí myší) · Lenka Dvořáková; odkazy Ochrana osobních údajů (`/privacy-policy/`) · Obchodní podmínky (`/obchodni-podminky/`); banner ThePay. Platí pro `/hele/`, `/irregular/`, `/10x-english/` a každou další prodejní stránku. Pozor: patička musí mít `display:flow-root`, jinak okraj prvního odstavce vytvoří nad patičkou bílý proužek.
