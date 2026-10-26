# Ekosystém LCEnglish: mapa všech systémů

Oblast: [[lcenglish]] · založeno 261024 (Lenka: „mapa celého ekosystému, odkud to celé spravovat“), přestavěno 261025 (Claude: u každého systému kde běží, kdo má přístup, napojení, dokumentace, co je otevřené), srovnáno se stavem 261026 (změny 25. 10. večer a 26. 10. ráno). Tohle je rozcestník: podrobnosti zůstávají v odkazovaných souborech, sem patří přehled a „kdo co drží“. Cíl: nemuset se ptát Vítka.
Souvisí s úkolem „Projít audit webu a zdokumentovat systémy kurzů LC English“ v [[next-actions]] a [[kontext-ukolu#Dokumentace systémů LC English]].

**Jak se rozcestník udržuje živý (Lenka 261026):**
- **Při „zavírám“ hlídá hook:** skript `~/.claude/inject-closing-checklist.ps1` při pokynu „zavírám“ vypíše soubory o systémech LCEnglish, které se ten den změnily (projekty `lcenglish-*`, [[shadowloop-admin]], [[drip-lcenglish-uvitani]], `resources/web-lcenglish/` aj.). Claude pak opraví oddíl dotčeného systému a přepíše u něj **Ověřeno**.
- **Při weekly review:** Claude vypíše systémy s „Ověřeno“ starším než 30 dní a nabídne jeden ověřit (krok 7 v `CLAUDE.md`).
- **Údaje v textech** (den vydání Art for English, ceny, počty) hlídá seznam [[lcenglish-hlidane-udaje]]; skript mapy webu vypíše, kde se na webu a v mailech Dripu vyskytují.
- **Ověřeno = datum, kdy někdo stav systému skutečně viděl** (v administraci, v kódu, testem), ne kdy se upravil text.
- Podrobnosti patří do souboru v „Dokumentace“, sem jen přehled. Stránky, odkazy, dárky a videa na webu → [[mapa-webu-skutecna]] (generuje skript), z čeho je web postavený → [[mapa-webu]].

## Jak k nám člověk přijde a co se s ním děje

```
Web lcenglish.cz (WordPress)  ──┐
Stránky v Leadpages (dárky)  ───┼─► Drip (účet LCEnglish 2094497)
Formuláře Dripu na webu      ───┤      │  workflow „delivery: …“ → mail s dárkem
lcenglish.cz/newsletter/     ───┘      │  nebo „signup: newsletter A4E“ (bez dárku) → mail s posledním dílem
                                        │  → CONTROLLER START → 000 GTKY (4 uvítací maily)
                                        │  → vagón podle dárku (B = Nepravidelná slovesa; A HELE, C 10x ENGLISH zatím prázdné)
                                        │  → každé úterý newsletter Art for English (+ zrcadlo na Substacku)
                                        │  každou celou hodinu skript `jmena` (server u fapipi) → Skloňování jmen → oslovení v 5. pádě
                                        │  dárek „Texty… Shadowloop“: odkaz v mailu → Shadowloop funkce `freebie`
                                        ▼
Prodejní stránka (Leadpages na lcenglish.cz) → objednávka FAPI → po zaplacení fapipi →
     Drip (štítek „Purchased: …“, nákup) + Shadowloop (funkce `sale`, balíčky) + FreshLearn (zápis do kurzu)
```

## Přehled: kde co běží a kdo k tomu může

| Systém | Kde běží | Lenka | Vítek | Claude |
|---|---|---|---|---|
| Web lcenglish.cz | WordPress, HOSTINGSOLUTIONS (Plesk) | ✅ admin | – | Chrome + Plesk, když Lenka přihlásí |
| Leadpages | leadpages.com (tarif Grow) | ✅ | – | konektor (jen čtení stránek), Chrome |
| FAPI | fapi.cz | ✅ | ⚠️ nevíme | Chrome (jen čtení, trvalé změny jen po svolení) |
| fapipi | server 37.205.8.210 (MasterDC) | ✅ GitHub, ❌ server | ✅ vše | GitHub v Chromu (jen čtení) |
| Drip | getdrip.com, účet 2094497 | ✅ | – | konektor (čtení, odběratelé) |
| FreshLearn | kurzy.lcenglish.cz | ✅ | – | Chrome, když Lenka přihlásí |
| Shadowloop + Firebase | Google Firebase `shadowloop-firebase` | ✅ vlastnice projektu, GitHub, nasazení | ✅ vlastník | lokální kopie kódu, Firebase CLI, Chrome |
| Skript na oslovení `jmena` | stejný server jako fapipi | ✅ GitHub, ❌ server | ✅ vše | – |
| Skloňování jmen | sklonovani-jmen.cz | ✅ (od 261024) | – | – |

## Systémy

### Web lcenglish.cz (WordPress)

- **Ověřeno:** 261026 (nadpis úvodu a nejčtenější články na hlavní stránce, obrázek pro sdílení, koš Plesku vysypán; přestavba 261024–25)
- **K čemu:** blog (112 článků, hlavní zdroj z vyhledávání; na hlavní stránce od 261026 vybrané nejčtenější články místo 6 nejnovějších, výběr v zkratce `[lce-posledni-clanky clanky="…"]`), stránky Home, Blog, Kurzy, Kontakt, Newsletter (`/newsletter/`, přihlášení k Art for English bez dárku, od 261026), objednávkové stránky `/irregular-cho/` a `/hele-checkout/`; prodejní stránky na doméně vkládá plugin Leadpages.
- **Kde běží:** WordPress 7.1.3 u HOSTINGSOLUTIONS (Plesk, server web54, IP 176.227.168.166, PHP 8.3.36), šablona Kadence, od 261024 bez Elementoru (plugin vypnutý, nesmazaný). Na stejném tarifu i lenkadvorakova.cz a publicspeaking.cz (jen přesměrování). Zkušební kopie `staging.lcenglish.cz` (neměnit, neindexovaná). Hosting cca 3 071 Kč ročně, zaplaceno do 9. 5. 2027.
- **Přístup:** Lenka (2 admin účty: lnk.dvorakova@gmail.com, 07pmtalk@gmail.com), zákaznický účet https://cp.hostingsolutions.cz. Claude pracuje v Chromu, když se Lenka přihlásí; soubory do `mu-plugins` nahrává Claude ve Správci souborů Plesku, když se Lenka přihlásí přes klientskou sekci (Mé služby → lcenglish.cz → Otevřít ovládací panel = jednotné přihlášení; přímá stránka `web54…:8443` chce jiné údaje, viz [[kontext-ukolu#Weby mimo WordPress]] 261026).
- **Napojení:** měřicí kódy z doplňku `wp-content/mu-plugins/lce-mereni.php` (Meta pixel 552638212929820, GTM, GA4, Google Ads, Sklik); vzhled a filtr blogu `lce-blog-filtr.php`; sledovací kód Dripu (plugin Drip for WordPress) a 84 formulářů Dripu; plugin Leadpages (`/10x-english/`, `/irregular/`, `/hele/`); formuláře FAPI na objednávkových stránkách; Rank Math (SEO, výchozí obrázek pro sdílení `lcenglish-sdileni.jpg` od 261026, [[mapa-webu#Identita a obrázek pro sdílení]]); DNS subdomén `kurzy.` (FreshLearn) a `shadowloop.` (Firebase) je u HOSTINGSOLUTIONS. Schránka `lenka@lcenglish.cz` (odesílací adresa Dripu) je na tomtéž hostingu. Zálohy: UpdraftPlus na Google Disk + denní zálohy hostingu (7 dní, obnova přes podporu).
- **Dokumentace:** [[mapa-webu]] (co kde je), [[web-lcenglish-audit-261024]] (výchozí stav, hosting, pluginy), [[kontext-ukolu#Weby mimo WordPress]] (průběh přestavby), kopie doplňků `resources/web-lcenglish/`.
- **Otevřené:** smazat plugin Elementor a archivní koncepty ([[waiting-for]] 📅 2026-10-28); koš Plesku se zbytky `elementor` vysypala podpora HOSTINGSOLUTIONS (svodka č. 27, 261026); levnější tarif hostingu zvážit po úklidu; tarif řešit ve [[waiting-for]] 📅 2027-04-12.

### Leadpages

- **Ověřeno:** 261026 (obrázky pro sdílení a nový snímek Shadowloopu na /irregular/ a /10x-english/; patička a ThePay 261025)
- **K čemu:** prodejní stránky (10x ENGLISH `Ytf0hlJeNc`, Irregular, HELE `1ViPiydGxm`), stránky dárků (Anki, Shadowloop texty, Daily Routine…), stránky seznamu (`remain`, `unsubscribe`…), DigiStart.
- **Kde běží:** https://leadpages.com/dashboard, tarif Grow, subdomény `lenka-dvorakova.lpcontent.net` a `lenkadvorakova.lpages.co`; od 15. 10. 2026 nové prostředí (186 stránek převedeno).
- **Přístup:** Lenka. Claude: konektor (vidí stránky, ne nastavení integrací), úpravy v Chromu.
- **Napojení:** na Drip LCEnglish přes Connectors → Automations („a form is submitted → Drip: Add/Update subscriber → workflow `delivery: …`“); na web přes plugin Leadpages; tlačítka prodejních stránek vedou na FAPI nebo objednávkové stránky webu; Meta pixel v hlavičce každé stránky; patička s bannerem ThePay jen na prodejních stránkách; obrázky pro sdílení `/irregular/` (Goya) a `/10x-english/` (Pissarro) nastavené 261026 přes konektor (`update_page_seo`).
- **Dokumentace:** [[drip-lcenglish-uvitani]] („Dárky v Leadpages napojené zpět na Drip“, „Leadpages po převodu“), [[lcenglish-10x-english-sales-page]], [[mapa-webu]] (patička prodejních stránek), [[prodejni-stranky]].
- **Otevřené:** vyměnit náhled Shadowloopu na `/irregular/` a `/10x-english/` za nový vzhled (next action v projektech); 33 starých automatizací s vypnutým Dripem nechat (Lenka 261024); staré webinářové a AI stránky archivovat (návrh); `stayintouch` patří účtu Dripu AI lektoři, rozhoduje Lenka; HELE stránka je provizorní kopie (ikonky řešit při kampani).

### FAPI

- **Ověřeno:** 261024 (zkušební nákup Irregular prošel)
- **K čemu:** objednávkové formuláře, zálohové faktury, faktury, platby (karta přes ThePay, převod).
- **Kde běží:** fapi.cz; formuláře 10x ENGLISH, HELE (150336, 5 970 Kč), Irregular (790 Kč).
- **Přístup:** Lenka.
- **Napojení:** formulář → krok „4 Akce“ → „Zaplacení objednávky → spustit programový skript“ → `https://fapipi.lenkadvorakova.cz/handle-invoice/<segment>` (u upsellu „Zaplacení položky s kódem“). Měření nákupu (pixel) na děkovací stránce FAPI. Banner ThePay musí být na prodejních stránkách.
- **Pravidla (Vítek 261001):** zachovat vystavování zálohových faktur (bez nich fapipi prodej přeskočí); webhook nechat na „zaplacení objednávky“; před splátkami, předplatným nebo změnou fakturace nechat napojení ověřit. Zkušební objednávku **smazat, ne stornovat** (číselná řada).
- **Dokumentace:** [[resources/hele-funnel]] (Fáze 4), paměť `reference_fapipi_new_product`, Google Doc „Akce do FAPI/Freshlearn/Drip tutorial“ (obsahuje token Dripu, nesdílet).
- **Otevřené:** nic hořícího.

### fapipi (most FAPI → Drip + Shadowloop + FreshLearn)

- **Ověřeno:** 261025 (repozitář, `actions.json`, CI/CD)
- **K čemu:** po zaplacení objednávky ve FAPI provede akce podle segmentu: zapíše jméno a nákup do Dripu, přidá štítek `Purchased: …`, zavolá Shadowloop `sale`, zapíše do kurzu ve FreshLearn.
- **Kde běží:** `fapipi.lenkadvorakova.cz` → server 37.205.8.210 (MasterDC Praha, jméno `kybersquat.cz`), server patří Alexovi (Ála, Lenčin syn; Lenka 261025). DNS záznam je u domény lenkadvorakova.cz (HOSTINGSOLUTIONS). Kód github.com/kokolem/fapipi (soukromý).
- **Přístup:** Lenka má přístup k repozitáři (ověřeno 261024), na server ne. Vítek všechno.
- **Jak upravit bez Vítka:** nastavení je v `actions.json` (segment = produkt, akce `save_name_and_shopper_activity_to_drip`, `add_drip_tag`, `add_shadowloop_product`, `enroll_in_freshlearn`, ID kurzu a plánu). Úprava přes github.dev (v repozitáři klávesa tečka), po uložení se změna sama nasadí na server (CI/CD, `.github/workflows`). Návod psala Lenka: `README.txt` v repozitáři. Čtení v Chromu: `github.com/kokolem/fapipi/blob/master/actions.json?plain=1`.
- **Segmenty (ověřeno):** `hele` (Drip „Purchased: HELE“, Shadowloop `HELE`, FreshLearn 157241 / plán 22289), `10XE` (FreshLearn 157254 / plán 22290, živý test 261006), Irregular (zkušební nákup 261024 prošel).
- **Nový produkt:** 1) segment v `actions.json`, 2) akce ve formuláři FAPI, 3) v Dripu zduplikovat „admin: EU consent – nákup …“ a přepsat tag. Test viz „Jak ověřit, že nákup funguje“ níže.
- **Dokumentace:** `README.txt` v repozitáři (totožný s Google Docem [Akce do FAPI/Freshlearn/Drip tutorial](https://docs.google.com/document/d/1KsSe-VcQVhaUPdMQn9pAS4WIFiXzaMTNw4QXD_PHlxM/edit), návod platný 250724: úprava `actions.json` v github.dev, commit, kontrola zelené fajfky v GitHubu, napojení ve FAPI včetně upsellu), [[resources/hele-funnel]], paměť `reference_fapipi_new_product`.
- **Přístup na server:** Lenka 261025 rozhodla zatím neřešit (Vítek: nepotřebuje, úpravy jdou přes GitHub). Bez něj nejde jen číst logy a nasadit skript `jmena`; při výpadku nebo úpravě `jmena` → Vítek.

### Drip

- **Ověřeno:** 261026 (nové přihlášení k newsletteru bez dárku otestováno; webhooky a oslovení 261025)
- **K čemu:** e-mailový seznam, dárky, uvítání (Controller a vagóny podle Email Marketing Heroes), newsletter Art for English, záznam nákupů.
- **Kde běží:** getdrip.com, účet LCEnglish 2094497, odesílá `lenka@lcenglish.cz`. Druhý účet AI lektoři (8879539) není LCEnglish.
- **Přístup:** Lenka. Claude: konektor (čtení, odběratelé, maily ve workflow); workflow a integrace jen v prohlížeči. API klíč `DRIP_API_KEY` v `GrowOS/lcenglish/.env`.
- **Napojení:** vstupy z Leadpages (automatizace), formulářů Dripu na webu (akce ve formuláři), přihlášení k newsletteru bez dárku na lcenglish.cz/newsletter/ (formulář 377807034 → workflow `signup: newsletter A4E`, od 261026) a fapipi (nákup); webhook 124032 (Automate Hero; nefunkční 119864 a 120166 smazány 261025); skript `jmena` čte a zapisuje pole `osloveni`; mail dárku Shadowloop volá funkci `freebie`; automatizace „admin: EU consent – nákup …“ na štítky `Purchased: …`.
- **Dokumentace:** [[drip-lcenglish-uvitani]] (celá cesta, dárky, Controller, patička, odhlášení), [[email-marketing-heroes]] a [[email-marketing-heroes-mapa]] (metoda), texty mailů `GrowOS/lcenglish/brain/samples/drip-archiv/`.
- **Otevřené:** vagóny A (HELE) a C (10x ENGLISH) prázdné, návrhy Overture C a 6. mailu Overture B čekají na nástěnce GrowOS ([[next-actions]]); testovací kontakty smaže Lenka; anketa ve 3. uvítacím mailu nic nevětví; stránka odhlášení generická (vlastní stránka „vyberte si, co chcete“ zatím neřešit).

### FreshLearn

- **Ověřeno:** 261025 (proklikáno jako studentka, opravy 1–17)
- **K čemu:** kurzová platforma (jediná od 12/2023): HELE 157241, 10x ENGLISH 157254, Naučte se učit anglicky 157293 (skrytý), Webináře 157303 a Nastartujte 157314 (archivní, skryté), AI Sborovna 167515 a VIP 170914 (skryté, bez platební brány).
- **Kde běží:** `kurzy.lcenglish.cz` (DNS CNAME na `cname.freshlearn.com`), administrace https://app.freshlearn.com; videa a soubory přímo ve FreshLearn.
- **Přístup:** Lenka (přihlašuje se sama, Claude heslo nezadává).
- **Napojení:** zápis kupujících dělá fapipi (ID kurzu a plánu v `actions.json`); obchodní podmínky a ochrana osobních údajů přesměrované na lcenglish.cz; prodejní stránky ve FreshLearn vedou na lcenglish.cz; Shadowloop jen odkazy v lekcích.
- **Vzhled:** barvy Galerie (261025), přihlášení s obrazem Toulouse-Lautrec *The Englishman* a pozadím #F7F1EA (261025 večer, popisek „Pamatujte si mě“ je tím čitelný).
- **Dokumentace:** [[lcenglish-freshlearn-revize]] (soupis, opravy 1–17, jak se upravují stránky a lekce), mapy kurzů s texty lekcí [[lcenglish-kurz-hele-mapa]], [[lcenglish-kurz-10x-english-mapa]], [[lcenglish-kurz-ai-sborovna-mapa]] (261025), [[lcenglish-teachable-osnovy-261025]], paměť `reference_freshlearn_admin`.
- **Ověřeno 261025 večer:** HELE, 10x ENGLISH, AI Sborovna a VIP proklikané jako studentka (videa, zvuky, 106 souborů ke stažení, odkazy); mrtvý odkaz a 21 překlepů opraveno.
- **Otevřené:** vlastní CSS portálu (Custom Script → Member Portal) se nenačítá, čeká se na podporu FreshLearn ([[waiting-for]] 📅 2026-10-30); zastaralé termíny ve VIP spolu s rozhodnutím o AI Sborovně ([[next-actions]], [[lcenglish-freshlearn-revize]]); Teachable požádat o smazání 30. 11. 2026 ([[waiting-for]]).

### Shadowloop a Firebase

- **Ověřeno:** 261025 (funkce na Node.js 22, platby, zálohy, přístupy)
- **K čemu:** aplikace na stínování, balíčky ke kurzům (HELE, HELE EW, HELE downsell, 10x ENGLISHonly, Irregular, Miroslav Urban, Shadowloop 10xE texty) a k dárku.
- **Kde běží:** Google Firebase, projekt `shadowloop-firebase`: Hosting (aplikace na `shadowloop.lcenglish.cz`), Cloud Functions v regionu europe-central2, databáze Firestore (`users`, `preregistered`, `products`, `freebies`), Authentication. Kód github.com/kokolem/shadowloop (soukromý, logika `functions/index.js`), lokální kopie `C:\Users\Lenka\source\repos\shadowloop`. Na HOSTINGSOLUTIONS je jen DNS a stará kopie z 2021 (374 MB, nemazat bez Vítka).
- **Platí (ověřeno 261025):** tarif Blaze, platební účet „My Billing Account“ (01CC45-849DC0-28D09A), platební profil **Vítek Peterka**, Visa •5179 platná do **02/2028**. Útrata říjen 2026 0,00 USD, za poslední rok nejvýš 2,4 centu (poslední platba 1. 6. 0,01 USD). Lenka účet vidí (Owner projektu). Před 02/2028 ať Vítek kartu obnoví ([[waiting-for]]).
- **Zálohy Firestore (ověřeno 261025): žádné.** Bez plánu záloh, bez obnovy k okamžiku (PITR), bez ochrany proti smazání databáze. Uživatelé a jejich balíčky (`users`, `preregistered`, `products`, `decks`) existují jen v jedné kopii. Návrh v [[next-actions]].
- **Přístup (ověřeno 261025):** Lenka i Vítek jsou **vlastníci (Owner)** projektu (Firebase → Project settings → Users and permissions), Lenka tedy smí nasadit i funkce. Firebase CLI na počítači přihlášené jako lnk.dvorakova@gmail.com, `functions:list` funguje. Lenka pushuje do repozitáře a nasadila vzhled (261025). Nasazení funkcí je ruční (bez CI/CD), poprvé vyzkoušené 261025 (převod na Node.js 22).
- **Funkce (stav 261025, `firebase.cmd functions:list --project shadowloop-firebase`):**
  - `sale?email=…&produkt=…` (europe-central2, 1. generace, Node.js 22): balíček za nákup, volá fapipi, jde i ručně z prohlížeče.
  - `freebie?email=…&freebie=<id>` (europe-central2, 1. generace, Node.js 22): balíček za dárek, volá odkaz v mailu Dripu, e-mail musí být `| url_encode`, jinak „+“ projde jako mezera.
  - `registerUser` (europe-central2, 1. generace, Node.js 22): spustí se při vzniku dokumentu ve Firestore, při prvním přihlášení připíše balíčky z `preregistered/<email>`.
  - `generator` (us-central1, 2. generace, Node.js 22): **v repozitáři `kokolem/shadowloop` není**. Nasazená 22. 3. 2026 přes Firebase CLI (4 verze týž den), kód jde vidět v Google Cloud → Cloud Run → generator → Source. Podle kódu: přijme tabulku CSV, jazyk, cílový jazyk, hlas a heslo, věty přeloží (Google Translate), namluví (hlasy Chirp3-HD) a vrátí archiv, tedy odhad: výroba balíčků do Shadowloopu. Vítek ji nezná (261025). **Lenka 261025: je to generátor balíčků do Shadowloopu, potřebujeme ho.** Ovládá se stránkou `G:\Můj disk\03 LCEnglish 🎬\Products\Shadowloop\AutoShadowloop.html` (⚠️ obsahuje heslo, nesdílet). Mapa (jak se volá, co vrací, jak se z výstupu stane balíček, co nevíme): [[shadowloop-admin#Generátor balíčků (funkce `generator`, zmapováno 261025)]]. Nemazat.
- **Node.js 22 od 261025 17:52** (Google ukončil Node.js 20 k 30. 10. 2026, [Runtime support](https://docs.cloud.google.com/functions/docs/runtime-support)). `sale`, `freebie` a `registerUser` převedené (Vítek: „stačí změnit 20 na 22“), nasadil Claude se souhlasem Lenky, ověřeno: všechny čtyři funkce `nodejs22 ACTIVE`, test `sale` (Irregular) 200 a `freebie` 302 na aplikaci, ve Firestore `preregistered/lnk.dvorakova+node22test-261025@gmail.com` 9 balíčků (4 + 5). `registerUser` netestováno (spustí se až při prvním přihlášení nového uživatele). Node.js 22 končí 31. 10. 2027 (podpora do 30. 4. 2027). Knihovna `firebase-functions` je stará (3.24), CLI doporučuje aktualizaci, ta ale přináší nekompatibilní změny; teď netřeba. Změna je v GitHubu `master` (commit af1118e, poslala Lenka 261025 19:05); zkušební dokument smazán.
- ⚠️ **Při nasazování funkcí vždy jmenovat:** `firebase.cmd deploy --only functions:sale,functions:freebie,functions:registerUser`. Samotné `--only functions` by chtělo smazat `generator`, protože není v kódu.
- **Dokumentace:** [[shadowloop-admin]] (nahrání nového balíčku do aplikace, ověřeno 261025; ruční přidání balíčku uživateli, změna vzhledu, nasazení, upozornění Googlu), [[drip-lcenglish-uvitani]] (dárek Shadowloop), vzhled `GrowOS/lcenglish/brain/brand.md`.
- **Otevřené:** Firebase hlásí chybějící pravidlo na mazání starých verzí funkcí (`firebase.cmd functions:artifacts:setpolicy`). Projekt je na tarifu Blaze (platí se jen nad limity zdarma), Lence žádné vyúčtování nechodí; Lenka 261025: nechat být. `registerUser` na Node.js 22 zatím netestovaný (spustí se při prvním přihlášení nového uživatele).

### Skript na oslovení `jmena` a Skloňování jmen

- **Ověřeno:** 261026 (frekvence od Vítka: cron `0 * * * *`; repozitář a kontakty v Dripu 261025)
- **K čemu:** každou celou hodinu (cron `0 * * * *`, Vítek 261026) projde kontakty bez pole `osloveni` v obou účtech Dripu (LCEnglish i AI lektoři), zeptá se Skloňování jmen a zapíše oslovení v 5. pádě (Lenko, Davide) a štítek M/F. Oslovení se proto u nového kontaktu neobjeví hned.
- **Kde běží:** Python skript github.com/kokolem/jmena (`main.py`, `invalid_names.json`, `ungendered_names.json`) na serveru u fapipi (37.205.8.210). Služba https://www.sklonovani-jmen.cz, zdarma 10 dotazů denně (stačí: ověřeno 261025, všech 121 aktivních kontaktů LCEnglish má oslovení, za 30 dní 4 nové, nejvýš 1 denně; AI lektoři 0 aktivních) (předplatné vypršelo 13. 4. 2025; při velkých webinářích se platilo, minimum 49 Kč).
- **Přístup:** repozitář Lenka (pozvánka přijata 261024); server jen Vítek; účet Skloňování jmen od 261024 na Lence.
- ⚠️ API klíče Dripu a Skloňování jmen jsou zapsané přímo v `main.py`: u služeb nový klíč negenerovat, jinak skript přestane fungovat.
- **Dokumentace:** [[drip-lcenglish-uvitani#Oslovení v 5. pádě (skript, zjištěno 261024; opraveno podle Vítka 22:30)]].
- **Nasazení (ověřeno 261025 v repozitáři):** na rozdíl od fapipi **nemá CI/CD** (žádné `.github/workflows`), změna na GitHubu se na server sama nedostane. Poslední změna kódu 28. 2. 2024. Kód je jednoduchý: projde stránky odběratelů obou účtů, kdo nemá `osloveni` a má jméno, tomu zjistí 5. pád a rod a zapíše je. Jména, která služba neumí, si ukládá do `invalid_names.json` a `ungendered_names.json` (na serveru, takže kopie v repozitáři je starší). Spouštění je nastavené na serveru: **cron `0 * * * *`, tedy každou celou hodinu** (Vítek 261026; Lenka to tušila správně v Zápisníku 261025, dřív tu stálo „jednou denně“). **Ověřeno 261026 na GitHubu:** `main.py` jednou projde kontakty a skončí (žádná smyčka ani čekání), takže frekvenci určuje jen nastavení na serveru. Zkušební kontakt založený 26. 10. v 16:53 měl oslovení „Lenko“ a štítek F v 18:47, tedy do dvou hodin; jestli to byl jediný denní běh, z toho poznat nejde.
- **Otevřené:** úpravu skriptu nasadí zatím jen Vítek (přístup na server).

### Ostatní

**Ověřeno:** 261025 (sestavení tabulky; Meta jen částečně)

| Systém | K čemu | Kde / účet | Přístup | Podrobně |
|---|---|---|---|---|
| **Automate Hero** | odpočty a „zbývá míst“ (Countdown Hero, Scarcity Hero) | https://automatehero.io, tarif Basic, webhook Dripu 124032 | Lenka (`lenka@publicspeaking.cz`) | [[email-marketing-heroes]] |
| **Substack** | zrcadlo newsletteru Art for English | https://artforenglish.substack.com | Lenka | [[lcenglish-art-for-english]] |
| **Meta (FB/IG) a pixel** | reklama, pixel na webu a Leadpages | reklamní účet Lights Camera English 244326466, stránka 198814966970945, pixel 552638212929820; konektor Meta Ads. ⚠️ **Nedoplněno (Lenka 261025):** úplný soupis účtů Meta (portfolio, reklamní účty, kdo má přístup, platební metoda) doplnit při přípravě reklamy pro LCEnglish | Lenka | `GrowOS/lcenglish/setup.md` |
| **Sociální sítě** | Instagram `lights_camera_english` a YouTube LCEnglish (značka LCEnglish v Metricoolu); Facebook: angličtina se publikuje na FB stránce tadylenka (ID 198814966970945, v nadpisu „Lenka Dvořáková“), druhá FB stránka „Lenka Dvořáková“ (ID 1156685167817243) slouží jen k reklamě | Metricool (MCP konektor), Meta Business | Lenka | paměť `reference_social_accounts_map`, [[feedback_tadylenka_channels]], úklid v [[someday-maybe]] |
| **Metricool** | statistiky webu, plánování příspěvků (koncepty, zveřejňuje Lenka) | plugin na webu, metricool.com | Lenka | `GrowOS/lcenglish/setup.md` |
| **Domény a pošta** | lcenglish.cz (do 25. 6. 2027, registrátor Gransy), lenkadvorakova.cz (do 6. 5. 2027; běží na ní fapipi), publicspeaking.cz (do 28. 9. 2027; ověřeno ve whois CZ.NIC 261025) (přesměrování 301 přes `.htaccess`, WordPress smazán 261025); schránky `lenka@lcenglish.cz`, `lenka@publicspeaking.cz` | HOSTINGSOLUTIONS | Lenka | [[web-lcenglish-audit-261024]] |
| **Staré platformy (vypnuté)** | SimpleShop: produkty archivované 261025, formuláře hlásí „Prodej skončil“. Teachable `publicspeaking.teachable.com` (škola 21392): bezplatný tarif, kurzy jdou otevřít jako studentka, zazálohováno na Disk; `kurzy.publicspeaking.cz` nefunguje | app.simpleshop.cz (`lnk.dvorakova@gmail.com`) | Lenka | [[kontext-ukolu#Weby mimo WordPress]], [[lcenglish-freshlearn-revize]] |
| **Vizuální identita „Galerie“** | barvy a písma pro web, Leadpages, Drip, FreshLearn, Substack, Canvu a Shadowloop (261025) | `GrowOS/lcenglish/brain/brand.md`, vzorník https://claude.ai/artifact/YR59A2aWtN8eTQYshtiNCF | Lenka + Claude | `brand.md` (výjimky Shadowloopu tamtéž) |
| **GrowOS** | výroba výstupů (newsletter, maily, reklamy), fronta ke schválení | `GrowOS/lcenglish/`, nástěnka [[GrowOS fronta.base]] | Lenka + Claude | [[resources/postupy/growos]] |

## Platby a obnovy (sestaveno 261025 z faktur v Gmailu)

| Služba | Tarif | Cena | Kdy se platí | Jak | Zdroj |
|---|---|---|---|---|---|
| **Drip** | do 500 kontaktů (143 aktivních k 6. 10.) | 19 USD měsíčně | 7. každého měsíce | karta •4219, automaticky | faktury „[Drip] Invoice“ na `lenka@publicspeaking.cz` |
| **Leadpages** | Grow Annual | 299 USD ročně (vč. daně) | zaplaceno 22. 10. 2026 → další **22. 10. 2027** | Mastercard •4219 přes Paddle (od 5. 9. 2026), automaticky | „Payment confirmed“ od Paddle |
| **FreshLearn** | Pro, roční | 449 USD (říjen 2025), se slíbenou slevou 399 USD | další **15. 2. 2027** | automatická obnova | vlákno „Problem with payment“; hlídá [[waiting-for]] (sleva 50 USD) |
| **FAPI** | START (do 10 objednávek měsíčně), roční | 2 408 Kč ročně + doplatek při překročení limitu (únor a březen 2025) | zaplaceno 27. 9. 2026 → záloha zhruba **21. 9. 2027** | zálohová faktura (karta automaticky, jinak převod do 7 dní) | „Vaše zálohová faktura za FAPI“ |
| **HOSTINGSOLUTIONS hosting** | Multihosting (Reseller), lcenglish.cz, 5 domén, 10 GB | 1 081,74 Kč za pololetí (2 163 Kč ročně) | zaplaceno **21. 10. 2026** (záloha 202601198, faktura 1131/2026) na období **10. 11. 2026 – 9. 5. 2027** → další záloha zhruba 20. 4. 2027 | zálohová faktura, převodem (Lenka ručně) | maily „Zálohová faktura k úhradě“ / „Platba byla přijata“, [[web-lcenglish-audit-261024]] |
| **Domény** (HOSTINGSOLUTIONS) | lenkadvorakova.cz | 302,50 Kč ročně | zaplaceno **3. 5. 2026** (faktura 492/2026) → platí do **6. 5. 2027** | zálohová faktura, převodem | „Prodloužení registrace domény“, whois CZ.NIC |
| | lcenglish.cz | 302,50 Kč ročně | zaplaceno **5. 6. 2026** (faktura 626/2026) → do **25. 6. 2027** | dtto | dtto |
| | publicspeaking.cz | 302,50 Kč ročně | zaplaceno **14. 9. 2026** (záloha 20260992, faktura 967/2026) → do **27. 9. 2027** | dtto | dtto |
| **Metricool** | PRO, 5 značek | 120 EUR ročně | obnoví se automaticky **22. 11. 2026**; rozhodnout do 15. 11. ([[waiting-for]]) | karta •4219 | [[260930]] |
| **Firebase (Shadowloop)** | Blaze | v praxi 0 (za rok nejvýš 2,4 centu) | měsíčně | **Vítkova** karta •5179 do 02/2028 | Google Cloud Billing; připomínka ve [[waiting-for]] |
| **ThePay** | platební brána | bez předplatného; poplatky se strhávají z výplat (neověřeno) | – | automatické výplaty na účet | měsíční výpisy od ThePay |
| **Automate Hero** | CDH Basic, doživotní | 0 (zaplaceno jednou) | – | – | [[email-marketing-heroes]] |
| **Zdarma** | Substack, Skloňování jmen (10 dotazů denně), GitHub | 0 | – | – | – |

- **Celkem zhruba 30–31 tisíc Kč ročně**: v USD asi 930–980 USD (Drip 228, Leadpages 299, FreshLearn 399–449) + Metricool 120 EUR + v Kč asi 5 500 Kč (FAPI 2 408, hosting 2 163, domény 908). Přepočet (cca 23 Kč za USD, 25 Kč za EUR) je odhad.
- Drip, Leadpages a Metricool platí karta •4219; Lenka ví, že bude ještě nějakou dobu platit, a služby se při neúspěšné platbě ozvou samy (261025).
- Server fapipi a `jmena` platí Alex, Firebase Vítek; obojí v rodině, neřešit (Lenka 261025).

## Jak ověřit, že nákup funguje (bez Vítka, cca 15 minut)

1. Objednávka na prodejní stránce s adresou `lnk.dvorakova+<produkt>test@gmail.com`, platba převodem.
2. FAPI → detail zálohy → „Označit jako zaplacené“ se zaškrtnutým „Spustit akce“. V historii dokladu musí být „programový skript“ s odpovědí 200.
3. Drip: kontakt má štítek `Purchased: …`, nákup jednou a vyplněný souhlas `EU_consent_how/when`.
4. Firebase: `preregistered/<email>` má stejné balíčky jako `products/<produkt>` (odkaz v paměti `reference_fapipi_new_product`).
5. FreshLearn: v kurzu přibyl člen.
6. Úklid dělá Lenka: FAPI zálohu i fakturu **smazat** (ne storno), Drip kontakt smazat, Firestore dokument v `preregistered` smazat.

## Když něco nefunguje: kde hledat

| Příznak | Kde se podívat |
|---|---|
| Kupující nedostal kurz ani balíček | FAPI historie dokladu (proběhl „programový skript“?) → fapipi `actions.json` (segment) → ručně Shadowloop `sale` ([[shadowloop-admin]]), ručně zapsat ve FreshLearn |
| Nákup v Dripu dvakrát | pravidla FAPI výše (zálohové faktury, webhook na zaplacení objednávky) |
| Dárek nepřišel | Leadpages → Connectors → Automations (je u formuláře akce Drip?) → Drip workflow `delivery: …` ([[drip-lcenglish-uvitani]]) |
| Dárek Shadowloop bez balíčku | odkaz v mailu `freebie` s `url_encode`; člověk musí na odkaz kliknout |
| Mail začíná „Dobrý den,“ bez jména | oslovení přibude nejpozději do hodiny (skript `jmena` běží každou celou hodinu); uvítání GTKY čeká hodinu, takže už první mail GTKY má oslovení; bez jména odchází jen okamžitý mail s dárkem nebo posledním dílem (proto v něm Liquid počítá s „Dobrý den,“); jinak vyčerpaných 10 dotazů nebo server (Vítek) |
| Na webu chybí měření | `wp-content/mu-plugins/lce-mereni.php` ([[mapa-webu#Měření (všechny stránky WordPressu)]]) |
| Prodejní stránka zmizela z lcenglish.cz | plugin Leadpages ve WordPressu |
| Shadowloop nejde otevřít | Firebase konzole → Hosting → Release history → Rollback ([[shadowloop-admin]]) |

## Metoda, podle které je to postavené

Uvítání a vagóny podle Email Marketing Heroes (Blueprint: Build Your Controller, kampaně 000, 008, 009) → [[email-marketing-heroes]], mapa platformy [[email-marketing-heroes-mapa]].

## Co drží Vítek (získat přístup nebo kopii, „na závěr“, Lenka 261024)

- [x] Skript na oslovení: repozitář `kokolem/jmena`, přístup má Lenka (261024). Účet sklonovani-jmen.cz přenastavila na sebe (261024).
- [x] Kód fapipi: přístup k repozitáři (261024), úpravy přes GitHub se samy nasadí.
- [x] Kód Shadowloopu: Lenka pushuje a nasazuje vzhled sama (261025).
- [x] Server 37.205.8.210 (fapipi, `jmena`) je Alexův, repozitáře `kokolem/…` jsou Vítkovy; obojí v rodině, vyřešené, dál neřešit (Lenka 261025). Přístup na server zatím netřeba.
- [x] Funkce Shadowloopu na Node.js 22 (261025). Funkci `generator` Vítek nezná (viz Shadowloop výše).
- [x] Webhooky Dripu 119864 (LCEnglish) a 120166 (AI lektoři) na nedokončené skripty „Drip to GSheets“ z 2023: ověřeno, že nic nedělaly; **smazány 261025 19:20** na Lenčin pokyn. Skripty na Disku zůstaly (neškodí).
- [x] Nasazení Cloud Functions Shadowloopu: Lenka je vlastnice projektu, smí; vyzkoušeno 261025 (Node.js 22)

## Otevřené (souhrn, 261026)

- Meta: doplnit soupis účtů (portfolio, reklamní účty, přístupy, platba) při přípravě reklamy pro LCEnglish
- Shadowloop: rozhodnout o zálohování Firestore (žádné zálohy, [[next-actions]])
- Drip: Overture C (10x ENGLISH) a 6. mail Overture B na nástěnce, pak vagón A (HELE) → [[drip-lcenglish-uvitani]], [[next-actions]]
- Web: smazat Elementor a koncepty po 28. 10. ([[waiting-for]]); hlavní stránka a náhledy Shadowloopu v Leadpages se upravují (vlákno „Úpravy webů ze Zápisníku 261025“)
- FreshLearn: podpora kvůli CSS portálu (📅 30. 10.); AI Sborovna a VIP termíny rozhodnout; Teachable 30. 11. ([[lcenglish-freshlearn-revize]])

Vyřešené (261024): oslovení po 15. 10. funguje (test Jana); dárek „Texty… Shadowloop“ opraven (test s „+“ prošel, 5 balíčků v `preregistered`); Anki a další dárky z Leadpages znovu napojené na Drip.
