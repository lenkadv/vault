# Mapa webu lcenglish.cz

**Oblast:** [[lcenglish]] · **Založeno:** 261024 (Claude, při přestavbě webu) · **Souvisí:** [[web-lcenglish-audit-261024]], [[kontext-ukolu#Weby mimo WordPress]], [[hele-funnel]]

Z čeho je web postavený, pravidla a co na něj vede zvenku (reklama, e-maily). „Odhad“ = neověřeno.
**Všechny stránky s odkazy tam a zpět, dárky a videi YouTube:** [[mapa-webu-skutecna]], generuje ji skript `mapa_webu.py` (od 261026; obnova při weekly review a při „zavírám“ ve vlákně, které měnilo web, hlídá to hook, viz [[lcenglish-ekosystem]]). Tenhle soubor se upravuje ručně, když se změní stavba webu nebo pravidlo.

## Hlavní stránky (menu a patička)

| Adresa | Co to je | Postaveno | Co na to vede |
|---|---|---|---|
| `/` | Hlavní stránka (fotka, loga, čísla, o mně, 6 vybraných článků: od 261026 nejčtenější podle Metricoolu, zkratka `[lce-posledni-clanky clanky="673,6755,925,1363,578,1446"]`, výběr se mění jen tady) | bloky WordPressu (Kadence) + doplněk `lce-blog-filtr.php` | menu Home, logo, patička Homepage |
| `/blog/` | Seznam článků s filtrem (pokročilost, dovednost, hledání) | Kadence + doplněk `lce-blog-filtr.php` | menu Blog, patička |
| `/kurzy/` | Přehled 3 kurzů s odkazy na prodejní stránky | bloky WordPressu | menu Kurzy |
| `/newsletter/` | Přihlášení k newsletteru Art for English bez dárku (formulář Dripu 377807034 → workflow `signup: newsletter A4E`), od 261026 | bloky WordPressu, formulář jako HTML blok, pás nadpisu šablony skrytý; od 261030 obraz Fragonard *Čtoucí dívka* (médium 7596, blok Obrázek vpravo 280 px, třída `lce-newsletter-obraz`, styl pro mobil a `clear` u formuláře `.lce-nl` v HTML bloku pod ním) | patička „Učte se se mnou“, pruh na hlavní stránce |
| `/newsletter/diky/` | Děkovací stránka po přihlášení (noindex) | bloky WordPressu | přesměrování z formuláře Dripu |
| `/contact/` | Kontaktní formulář (Fluent Forms č. 1 → e-mail na lnk.dvorakova@gmail.com) | bloky WordPressu | menu Kontakt, patička |
| `/privacy-policy/` | Ochrana osobních údajů | editor bloků | patička, formuláře Dripu |
| `/obchodni-podminky/` | Obchodní podmínky | editor bloků | patička |

## Prodej (cesta zákazníka)

| Kurz | Prodejní stránka | Objednávka | Po zaplacení |
|---|---|---|---|
| 10x ENGLISH | `/10x-english/` (Leadpages `Ytf0hlJeNc`, vkládá plugin Leadpages) | `/10x-english-cho/` = objednávková stránka (WP 7583, od 261029; formulář FAPI 1 270 Kč, rámeček „Co dostanete“, 3 reference, celý vzhled ve stylu stránky podle značky: DM Serif Display + Karla, barvy z loga, formulář FAPI přebarvený proměnnými, šedá loga plateb, noindex, titulek „Objednávka: 10x ENGLISH“). 5 tlačítek na prodejní stránce vede sem (od 261029) | FAPI → fapipi → Drip, Shadowloop, FreshLearn ([[hele-funnel]]) |
| Nepravidelná slovesa za 14 dní | `/irregular/` (Leadpages, plugin Leadpages) | **5 tlačítek vede na `/irregular-cho/`** = objednávková stránka s formulářem FAPI (790 Kč) a 3 referencemi, z bloků WordPressu (od 261024, ID 7433, bez hlavičky a patičky, noindex; od 261029 jednotný vzhled podle značky jako `/10x-english-cho/`) | FAPI → fapipi |
| Angličtina s příběhem (HELE) | `/hele/` (Leadpages `1ViPiydGxm`, plugin Leadpages, od 261025; 9 tlačítek na `/hele-checkout/`, banner ThePay v patičce) | `/hele-checkout/` = objednávková stránka jako `/irregular-cho/` (WP 7446, formulář FAPI 5 970 Kč, 3 reference k HELE, od 261029 jednotný vzhled podle značky jako `/10x-english-cho/`, noindex, titulek „Objednávka: Angličtina s příběhem“) | FAPI → fapipi (segment `hele`) |

Pozor: `/nepravidelna-slovesa/` je blogový článek z roku 2020, ne prodejní stránka.

## Mimo WordPress (jen nasměrovaná subdoména)

| Adresa | Co to je | Kde běží |
|---|---|---|
| `kurzy.lcenglish.cz` | kurzy pro kupující | FreshLearn |
| `shadowloop.lcenglish.cz` | aplikace Shadowloop | Google Firebase (`shadowloop-firebase`) |
| `fapipi.lenkadvorakova.cz` | automatika po zaplacení (FAPI → Drip, Shadowloop, FreshLearn) | server kybersquat.cz (MasterDC) |
| ~~`staging.lcenglish.cz`~~ | zkušební kopie webu, **smazána 261027** (záloha `Zálohy webů/staging.lcenglish.cz 261027` do 27. 1. 2027); adresa nenaváže spojení, zástupný DNS záznam `*` zůstává | — |

## Bývalé stránky Elementoru (od 261024 Elementor vypnutý)

| Adresa | Co to je | Stav 261024 |
|---|---|---|
| `/uprava/`, `/thank-you/` | prázdná „Správa osobních informací“, staré poděkování 2022; odkazy nenalezeny | v konceptech (404) |
| `/anglicky-za-tyden/`, `/anki-navod/` | 2 připnuté články | editor bloků (obsah beze změny) |
| `/hele-sp/` 7438 (od 261026 přesměrováno 301 na `/hele/`, Rank Math → Redirections), `/hele-ew-sp/` 7439, `/hele-ew-reg/` 7443 (WebinarKit), `/hele-ew-ty/` 7444, `/hele-ew-replay/` 7445, `/hele-checkout/` 7446 (od 261025 objednávka podle `/irregular-cho/`), `/hele-checkout-ew/` 7447 (SimpleShop, mrtvé) | stránky HELE z 2022 | bloky WordPressu, bez hlavičky a patičky, vzhled třída `lce-lp` v `lce-blog-filtr.php`; kromě `/hele-sp/` noindex; řeší se s HELE |
| `/shakespeare-mail/` 7448 | Den angličtiny (2022) | bloky, noindex; asi smazat |
| koncepty: stará /hele/ 7119, /hele/ z bloků 7436 (slug `hele-bloky`, od 261025), xDemo ×4, landing #707 a #3089, archivní Home/Kurzy/Kontakt/Irregular ChO, staré vstupní stránky Elementoru | — | smazat po čase spolu s pluginem Elementor |

## Drip na webu

- Sledovací kód Dripu (účet 2094497) na všech stránkách WordPressu.
- 84 formulářů Dripu, většinou vyskakovací okna u konkrétních článků (seznam v Dripu, každý má adresu článku).
- Dvě okna nemají omezení na stránky (zobrazují se kdekoli): „Chcete ode mne dostávat angličtinářské tipy e-mailem?“ (ID 37175075, 2022) a „Welcome to Lights Camera English! … přepis videa“ (ID 663641640, 2018). Odhad: to druhé je zastaralé, prověřit.
- ⚠️ Rozpor (261026): API Dripu hlásí jako zapnutá (`is_widget_enabled`) a bez omezení na stránky **4** okna: 37175075, 772993722 „Jak vám může internet ZDARMA pomoci s angličtinou?“, 478702637 a 663641640 (obě „Welcome to Lights Camera English!“). Podle Průběhu dne 261025 bylo okno z roku 2018 vypnuté; buď API vypnutí nehlásí, nebo jde o jiné okno. Ověřit v Dripu. Seznam oken po stránkách je v [[mapa-webu-skutecna#Dárky: co se kde nabízí]].
- **Tlačítka „Download the transcript“ u dílů Take (zjištěno 261027):** obrázkový odkaz s `data-drip-show-form` na `getdrip.com/forms/<ID>/submissions/new` (u ~80 článků). Dnešní skript Dripu (Onsite) stará okna po kliknutí neotevírá, kliknutí jen otevře stránku formuláře na getdrip.com v nové kartě. U Take 16 (114825197) stránka funguje, u Take 52 (663641640) Drip vrací 404 (proč, nevíme; API rozdíl neukazuje). Tlačítko u /walk-in-the-woods/ Lenka 261027 nechala odstranit. Jestli po vyplnění přepis opravdu přijde mailem, neověřeno.
- **Rozbité odkazy ven opraveny 261027** (REST WordPressu v Chromu): YouTube `c/PublicspeakingCz` → `channel/UCO77Nq3CpYaW_0xUB_8yVkA?sub_confirmation=1` (= @LiCaEnglish, jako šablona) v /jak-zacit-mluvit-anglicky/ a /keltove-a-anglictina/; odstavec s předložkovým minikurzem (kurzy.lcenglish.cz, 404) smazán z /jak-se-naucit-anglicke-predlozky/; tlačítko s přepisem smazáno z /walk-in-the-woods/. Mapa přegenerována, oddíl „Rozbité odkazy ven“ obsahuje už jen FB a IG k ruční kontrole.
- **Hlavní obrázek u článků s videem nahoře skrytý (Lenka 261027):** u 94 ze 112 článků, které začínají videem, se nahoře zdvojoval hlavní obrázek a náhled videa. Kadence přepínač u článku „Zobrazit hlavní obrázek“ (meta `_kad_post_feature: hide`, nastaveno přes REST). Obrázek zůstává nastavený: ukazuje se v seznamu blogu a jako náhled pro sdílení. 3 články s videem níž a 15 textových mají obrázek dál. **Nový článek s videem nahoře:** přepínač nastavit ručně v editoru (nastavení Kadence u článku).
- **Komentáře vypnuté (Lenka 261027):** byly otevřené u 13 článků z let 2017–2020 a chodil do nich spam (Take 61 Survival Kit). Zavřeno u všech 112 článků, výchozí stav pro nové články `default_comment_status: closed` (pingbacky už byly zavřené). Tři staré schválené komentáře (2018, /public-transport/, /how-are-you/) zůstávají vidět.

## Nejčtenější články: dárek a kurz (Lenka schválila 261028)

Ke každému z 12 nejčtenějších článků (seznam a zobrazení: [[mapa-webu-skutecna#Kam vést návštěvníka]]) jeden dárek do vagónu v Dripu a odkaz na kurz, který k tématu sedí. Forma: pod článek krátký odstavec s odkazem ve větě (ne tlačítko „ZDE“, podle `GrowOS/lcenglish/brain/voice.md`) na stránku dárku v Leadpages, které jsou od 261024 napojené na Drip. Kurz jednou větou v textu. Popupy Leadpages zatím ne: při ~100 zobrazeních ročně se nedají změřit a soupeřily by se starými okny Dripu. Vagóny: [[drip-lcenglish-uvitani]]. Do 28. 10. 2026 funguje až ke kurzu jen B, C čeká na schválení Overture C, A (HELE) postavené není.

| Článek | Dárek → vagón | Kurz v textu |
|---|---|---|
| /how-are-you/ | **nový:** Texty a nahrávky v Shadowloopu → C | 10x ENGLISH |
| /anglicky-chatgpt/ | ChatGPT tahák (beze změny) → C | 10x ENGLISH |
| /to-be/ | okno To be (beze změny, formulář 991221353 „To Be ContUp“) → A (ověřeno 261028) | Angličtina s příběhem (HELE) |
| /anki-navod/ | Anki (beze změny) → A | 10x ENGLISH (Lenka 261028) |
| /predpritomny-cas/ | Present Perfect (beze změny) → B | Nepravidelná slovesa |
| /anglicka-slovicka/ | 3x25 (beze změny) → A | už odkazuje na /hele/, nic neměnit |
| /proc-se-vanoce-anglicky-pisou-xmas/ | **nový:** přihláška k Art for English (/newsletter/) → C | – |
| /nepravidelna-slovesa/ | okno „50 sloves“ (beze změny, formulář 778588959) → B (ověřeno 261028) | Nepravidelná slovesa |
| /7-nejlepsich-youtube-kanalu-na-uceni-anglictiny/ | nic (Lenka 261028: článek je starý, kanály možná neexistují) | – |
| /dont-poop/ | **nový:** Stínování → C | 10x ENGLISH |
| /czech-easter/ | **nový:** přihláška k Art for English → C | – |
| /anglicky-za-tyden/ | 3x25 (beze změny) → A | Angličtina s příběhem (HELE) |

Adresy: dárky https://lenka-dvorakova.lpcontent.net/shadowloop-texty, `/7onlinetools`, `/stinovani`, newsletter https://lcenglish.cz/newsletter/; kurzy https://lcenglish.cz/10x-english/, `/hele/`, `/irregular/` (všechny vrátily 200, 261028).

**Provedeno 261028 ~21:30** (REST WordPressu v Chromu, texty schválené na nástěnce GrowOS, položka `htbag2myul` `GrowOS/lcenglish/work/pages/clanky-darek-kurz.md`, Lenka je před schválením přepsala): na konec 10 článků oddělovač + 1–2 odstavce, začínají komentářem `<!-- lce-darek-kurz -->` (podle něj se dají najít). Ověřeno živě, odkazy na stránkách jsou. Původní znění je v revizích WordPressu. /anglicka-slovicka/ beze změny, YouTube kanály vynechány. Akce oken Dripu se čtou jen v prohlížeči: `getdrip.com/2094497/forms/<id>/actions`.
Úpravy po kontrole Lenky (261028 21:45): /anki-navod/ smazán odstavec s odběrem YouTube (a jeden oddělovač), /anglicky-za-tyden/ smazán odstavec s odkazem na Angličtinu na dovolenou, /to-be/ mezera 32 px nad oddělovačem (lepil se na fotky galerie). /how-are-you/: vložené video z getyarn.io se nenačítalo (Yarn je za ochranou Cloudflare, i Lenka viděla jen šedou plochu). Na Lenčin pokyn 261028 21:55 nahrazeno odstavcem s odkazem na PlayPhrase (`playphrase.me/#/search?q=how+are+you%3F+fine`, 7 ukázek z filmů; vložit do stránky nejde, X-Frame-Options).

## Identita a obrázek pro sdílení

- **Identita:** vizuální identita LCEnglish „Galerie“ (261025) je v `GrowOS/lcenglish/brain/brand.md` a ve vzorníku https://claude.ai/artifact/YR59A2aWtN8eTQYshtiNCF. Samostatný soubor identity webu jako u [[resources/web-lenkadvorakova/identita]] lcenglish.cz nemá.
- **Obrázek pro sdílení (od 261026, Lenka schválila):** `wp-content/uploads/2026/10/lcenglish-sdileni.jpg` (médium 7468, 1200×630) = výřez úvodu hlavní stránky (fotka na pozadí města `bckg2web-scaled.jpg`, bílý nadpis „Chcete se (na)učit anglicky?“ v DM Serif Display, světlé logo vlevo nahoře). **Pravidlo (Lenka 261026): náhled pro sdílení vychází z toho, jak vypadá web**, ne ze vzoru jiného webu. Nastaveno: Rank Math → Titles & Meta → Global → OpenGraph Thumbnail (výchozí pro celý web: Home, Blog, Kontakt a vše bez vlastního obrázku) a výslovně u Kurzů (7425) a `/irregular-cho/` (7433) přes `rankmath/v1/updateMeta` (dřív tužka „irregular“ a `irregular-red.jpg` 350×350). Články blogu sdílejí svůj náhledový obrázek (beze změny). Zdrojové HTML obrázku se dá vyrobit znovu headless Edge 1200×630.
- **Prodejní stránky v Leadpages (261026):** `/irregular/` = Goya v barvách Galerie (šedotón × #D1003A jako hero, asset `hkgduy0c6x7pivi2l0bh0h8x`, dřív korálový); `/10x-english/` = Pissarro, *Two Young Peasant Women* (Met [437304](https://www.metmuseum.org/art/collection/search/437304), public domain) vyříznutý na 1200×630 z originálu (asset `a5zyeirb4fk3nhb6mbuu2y0i`, dřív 599×463); `/hele/` beze změny (maketa kurzu). Nastaveno `update_page_seo` (platí hned). Ověřeno curlem na lcenglish.cz a v Sharing Debuggeru Facebooku (hlavní stránka znovu načtena 261026, ostatní adresy Facebook dosud neměl v mezipaměti).

## Měření (všechny stránky WordPressu)

Doplněk `wp-content/mu-plugins/lce-mereni.php` (kopie [[resources/web-lcenglish/lce-mereni.php]]): Meta pixel 552638212929820, Google Tag Manager GTM-W7T2DNRP, GA4 G-TPM0Q6YT3M, Google Ads AW-969557192, Sklik. Leadpages stránky mají pixel ve vlastní hlavičce, nákup měří FAPI.

## ThePay

ThePay (platby kartou přes FAPI) vyžaduje banner se svým logem a logy karet na titulní stránce projektu, ideálně v patičce, do 30 dní od spuštění brány ([náležitosti projektu](https://www.thepay.eu/cs/nalezitosti-projektu/), ověřeno 261025). Banner: `https://gate.thepay.cz/img/thepay-v2-220209-bw-gpay.svg?pid=1345` s odkazem na `https://web.thepay.cz/`. **Pravidlo (Lenka 261025): banner ThePay jen na prodejních stránkách** (v patičce), ne na hlavní stránce ani jinde na webu, kde se nic neprodává. Stav 261025 12:20: je v patičce `/hele/`, `/irregular/` a `/10x-english/`. Na tmavé patičce bez bílého rámečku, převedený stylem do tlumené světle šedé (`filter:grayscale(1) invert(1) brightness(1.3)`, průhlednost 0,55), protože ThePay nemá variantu pro tmavé pozadí (má jen `bw` a `white`, obě pro světlé). Zda ThePay úpravu barvy akceptuje, neověřeno.

**Patička prodejních stránek v Leadpages (Lenka 261025):** „LCEnglish“ jako odkaz na `https://lcenglish.cz/` (podtržení jen po najetí myší) · Lenka Dvořáková; odkazy Ochrana osobních údajů (`/privacy-policy/`) · Obchodní podmínky (`/obchodni-podminky/`); banner ThePay. Platí pro `/hele/`, `/irregular/`, `/10x-english/` a každou další prodejní stránku. Pozor: patička musí mít `display:flow-root`, jinak okraj prvního odstavce vytvoří nad patičkou bílý proužek.
