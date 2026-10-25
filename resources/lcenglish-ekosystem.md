# Ekosystém LC English: mapa všech systémů

Oblast: [[lcenglish]] · založeno 261024 (Lenka: „mapa celého ekosystému, odkud to celé spravovat“). Tohle je rozcestník: co kde běží, kdo má účet a kde je podrobný popis. Podrobnosti zůstávají v odkazovaných souborech, sem patří jen přehled a „kdo co drží“.
Souvisí s úkolem „Projít audit webu a zdokumentovat systémy kurzů LC English“ v [[next-actions]] a [[kontext-ukolu#Dokumentace systémů LC English]].

## Jak k nám člověk přijde a co se s ním děje

```
Web lcenglish.cz (WordPress)  ──┐
Stránky v Leadpages (dárky)  ───┼─► Drip (účet LCEnglish 2094497)
Formuláře Dripu na webu      ───┘      │  workflow „delivery: …“ → mail s dárkem
                                        │  → CONTROLLER START → 000 GTKY (4 uvítací maily)
                                        │  → vagón podle dárku (B = Nepravidelná slovesa; A HELE, C 10x ENGLISH zatím prázdné)
                                        │  → každé úterý newsletter Art for English (+ zrcadlo na Substacku)
                                        │  jednou denně skript `jmena` (server u fapipi) → Skloňování jmen → oslovení v 5. pádě
                                        ▼
Prodejní stránka (Leadpages / web) → FAPI objednávka → fapipi → Drip (štítek Purchased) + Shadowloop (přístup) + FreshLearn (kurz)
```

## Systémy

| Systém | K čemu | Kde / účet | Kdo k němu má přístup | Podrobně |
|---|---|---|---|---|
| **Web lcenglish.cz** | blog (112 článků), stránky kurzů, formuláře Dripu | WordPress u HOSTINGSOLUTIONS (Plesk), šablona Kadence, Elementor Pro neobnoven | Lenka | [[web-lcenglish-audit-261024]] |
| **Leadpages** | prodejní stránky (10x ENGLISH, Irregular), stránky dárků, DigiStart | https://leadpages.com/dashboard, tarif Grow; konektor Claude (čtení stránek); od 15. 10. 2026 nové prostředí | Lenka (Chrome) | [[drip-lcenglish-uvitani]] (napojení dárků na Drip), [[lcenglish-10x-english-sales-page]] |
| **Drip** | e-mailový seznam, automatizace, newsletter | účet LCEnglish 2094497, odesílá `lenka@lcenglish.cz`; konektor Claude (čtení + odběratelé) | Lenka (Chrome) | [[drip-lcenglish-uvitani]] |
| **Skloňování jmen** | oslovení v 5. pádě (Lenko, Davide) do pole `osloveni` | https://www.sklonovani-jmen.cz, zdarma 10 dotazů denně (předplatné vypršelo 13. 4. 2025) | **od 261024 přenastaveno na Lenku** (údaje na webu služby). API klíč nikam nekopírovat, nový neregenerovat: běžící skript používá stávající | [[drip-lcenglish-uvitani#Oslovení v 5. pádě (skript, zjištěno 261024)]] |
| **Vyskakovací formuláře Dripu** | dárky přímo na webu (ChatGPT tahák, Nepravidelná slovesa, TOP 3x25, Iversen…) | Drip → Forms → Embedded & Pop-up forms (jiný seznam než Onsite, kde je „LCE homepage“) | Lenka | [[drip-lcenglish-uvitani]] |
| **Skript na oslovení `jmena`** | každý den projde kontakty bez pole `osloveni` v Dripu (LCE i AI lektoři), zeptá se Skloňování jmen a zapíše oslovení a M/F | kód github.com/kokolem/jmena (`main.py`, seznamy `invalid_names.json`, `ungendered_names.json`), běží denně na serveru u fapipi (37.205.8.210, „u Álího“) | Lenka má přístup k repozitáři (pozvánka přijata 261024). ⚠️ API klíče Dripu a Skloňování jmen jsou zapsané přímo v `main.py`: nový klíč u služby negenerovat, jinak skript přestane fungovat. Proto oslovení přibude až do druhého dne | Vítek 261024 |
| **FAPI** | objednávky, faktury, platby | formuláře 10x ENGLISH, HELE, Irregular | Lenka | [[resources/hele-funnel]] (pravidla správy FAPI) |
| **fapipi** | most FAPI → Drip + Shadowloop + FreshLearn po zaplacení (Vítek 261024: v repozitáři je dokumentace, kterou psala Lenka; nastavené CI/CD, změna v repozitáři se rovnou nasadí na server) | `fapipi.lenkadvorakova.cz`, server 37.205.8.210 (MasterDC, `kybersquat.cz`), kód github.com/kokolem/fapipi | ⚠️ Vítek (server i kód) | [[resources/hele-funnel]], paměť `reference_fapipi_new_product`. **Lenčina dokumentace je v repozitáři:** `README.txt` (jak přidat kurz a pricing plan do `actions.json`, akce `save_name_and_shopper_activity_to_drip`, `add_drip_tag`, `add_shadowloop_product`, `enroll_in_freshlearn`, napojení ve FAPI: formulář → Akce → spustit programový skript → `https://fapipi.lenkadvorakova.cz/handle-invoice/<segment>`, upsell přes „Zaplacení položky s kódem“). Úpravy přes github.dev (klávesa tečka v repozitáři); po uložení se změna sama nasadí na server (CI/CD, `.github/workflows`). Lenka má přístup přes GitHub (ověřeno 261024) |
| **Shadowloop** | aplikace na stínování, balíčky ke kurzům | Firebase `shadowloop-firebase`, kód github.com/kokolem/shadowloop (`functions/index.js`: `sale` = balíček za nákup podle produktu v `products/`, volá fapipi; `freebie` = balíček za dárek podle `freebies/<id>`, volá ho odkaz v mailu, pak přesměruje na aplikaci; kdo ještě nemá účet, dostane balíčky do `preregistered/<email>` a připíšou se mu při prvním přihlášení), `shadowloop.lcenglish.cz` | ⚠️ Vítek (vývoj), Lenka (obsah) | [[shadowloop-admin]] |
| **FreshLearn** | kurzová platforma (10x ENGLISH, HELE…) | `kurzy.lcenglish.cz` | Lenka | [[resources/hele-funnel]] |
| **Automate Hero** | odpočty a „zbývá míst“ (Countdown Hero, Scarcity Hero) | https://automatehero.io, tarif Basic, webhook Dripu 124032 | Lenka (`lenka@publicspeaking.cz`) | [[email-marketing-heroes]] |
| **Substack** | zrcadlo newsletteru Art for English | https://artforenglish.substack.com | Lenka | [[lcenglish-art-for-english]] |
| **Meta (FB/IG) a pixel** | reklama, pixel na webu a Leadpages | reklamní účet Lights Camera English, pixel 552638212929820 | Lenka | `GrowOS/lcenglish/setup.md` |
| **Hosting a domény** | lcenglish.cz, schránka `lenka@lcenglish.cz`; publicspeaking.cz jen přesměrování 301 přes `.htaccess` (WordPress smazán 261025) + schránka `lenka@publicspeaking.cz` | HOSTINGSOLUTIONS, cca 3 071 Kč ročně; Multihosting zaplacený do 9. 5. 2027 (tarif řešit ve [[waiting-for]] 📅 2027-04-12) | Lenka | [[web-lcenglish-audit-261024]] |
| **Staré platformy (vypnuté)** | SimpleShop: všechny produkty archivované 261025, formuláře hlásí „Prodej skončil“ (webhook `api.php` SimpleShop → Drip smazán s WordPressem publicspeaking.cz). Teachable `publicspeaking.teachable.com`: bezplatný tarif, administrace nepřístupná, prodejní stránky dál vidět, koupit nejde; `kurzy.publicspeaking.cz` nefunguje | SimpleShop: app.simpleshop.cz (`lnk.dvorakova@gmail.com`) | Lenka | [[kontext-ukolu#Weby mimo WordPress]]; revize FreshLearn a zrušení Teachable: projekt `lcenglish-freshlearn-revize` |
| **GrowOS** | výroba výstupů (newsletter, maily, reklamy), fronta ke schválení | `GrowOS/lcenglish/`, nástěnka [[GrowOS fronta.base]] | Lenka + Claude | [[resources/postupy/growos]] |

## Metoda, podle které je to postavené

Uvítání a vagóny podle Email Marketing Heroes (Blueprint: Build Your Controller, kampaně 000, 008, 009) → [[email-marketing-heroes]], mapa platformy [[email-marketing-heroes-mapa]].

## Co drží Vítek (získat přístup nebo kopii, „na závěr“, Lenka 261024)

- [x] Skript na oslovení: repozitář `kokolem/jmena`, přístup má Lenka (261024). Účet sklonovani-jmen.cz přenastavila na sebe (261024).
- [ ] Přístup na server 37.205.8.210 (běží tam fapipi i `jmena`)
- Webhook Dripu 119864 na Google Apps Script (`AKfycbzo…`) oslovení **nedělá** (Vítek 261024). K čemu je, nevíme; vlastník neznámý. Odhad: zbytek pokusu „Drip to GSheets“ z 31. 7. 2023. Zeptat se, pak případně smazat.
- Server a kód fapipi, kód Shadowloopu (repozitáře `kokolem`)

## Rozpracované a otevřené (261024)

- Overture C (představení 10x ENGLISH po uvítání) a vagón A (HELE) → [[drip-lcenglish-uvitani]]
- Oslovení po 15. 10. ověřeno: funguje (test Jana, 261024)
- Dárek „Texty… Shadowloop“: opraveno 261024, test s „+“ prošel (Firestore `preregistered`, 5 balíčků)
