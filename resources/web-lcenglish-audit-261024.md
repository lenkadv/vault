# Web lcenglish.cz — výchozí stav (audit 261024)

> **Aktualizace 261024 19:45:** Lenka zvolila variantu B. Web je přestavěný na Kadence bez Elementor Pro a přenesený na živou doménu; průběh a co zbývá v [[kontext-ukolu#Weby mimo WordPress]]. Údaje níže popisují stav před přestavbou.

**Oblast:** [[lcenglish]] · **Úkol:** [[next-actions]] „Kam převést weby z WordPressu“ → [[kontext-ukolu#Weby mimo WordPress]]
**Zdroj:** kontrola 261024 15:35–15:50 (Claude, Chrome, jen čtení): wp-admin lcenglish.cz (pluginy, stránky, Zdraví webu, UpdraftPlus, REST API), zákaznický účet a Plesk HOSTINGSOLUTIONS, faktury v Gmailu, DNS, PageSpeed Insights. Nic se neměnilo.
**Značka (odhad)** = domněnka, neověřeno.

## Shrnutí v pěti větách

1. Web je technicky **postavený na Elementoru Pro**, ne na Kadence: hlavička, patička, šablona blogového článku, archivy, 404, vyskakovací okno Drip i **všechny měřicí kódy** (Meta pixel, GTM, GA4, Google Ads, Sklik) jsou v Elementor Pro. Bez Elementoru Pro by se web rozpadl a přestalo by měření.
2. Živé a důležité jsou **dvě prodejní stránky z Leadpages** (`/10x-english`, `/irregular`), které s WordPressem skoro nesouvisí (jen je plugin vkládá na doménu). Jsou zároveň nejrychlejší (PageSpeed 78 a 100).
3. Zbytek webu je **blog 112 článků (2017 – srpen 2024)**, 9 publikovaných stránek a 510 médií; hlavní stránka a HELE jsou na mobilu pomalé (PageSpeed 56 a 59, největší obsah se načte za 15–16 s).
4. Hosting stojí **2 163 Kč ročně** (+ 908 Kč za tři domény, ty se platí v každém případě); tarif má 10 GB, využito 4,7 GB, běží na něm i lenkadvorakova.cz a publicspeaking.cz.
5. **Zálohy prakticky neběží:** UpdraftPlus je na ručním režimu, poslední záloha 27. 3. 2026; zálohy hostingu v Plesku nejsou pro zákazníka přístupné (jestli hosting zálohuje sám, neověřeno).

## 1. Pluginy (32: 15 aktivních, 17 neaktivních)

Verze po Lenčině aktualizaci 261024. „Používá se“ = podle toho, co je na webu vidět a co plugin drží.

### Aktivní (15)

| Plugin | K čemu | Používá se? | Návrh na později |
|---|---|---|---|
| **Elementor** 4.3.5 | stavitel stránek | **ano**, 8 stránek + celá šablona webu | nutný, dokud web stojí na Elementoru |
| **Elementor Pro** 4.0.2 | Theme Builder, vyskakovací okna, vlastní kódy | **ano, klíčový**: hlavička, patička, šablony článků (2), archivy (3), 404, výsledky hledání, popupy (Drip na hlavní stránce, WebinarKit), **7 vlastních kódů** (GTM ×2, GA4, GA UA, Google Ads remarketing, Sklik retargeting, Meta Pixel) | předplatné vypršelo → nedostává aktualizace ani bezpečnostní opravy, přitom je verzí pozadu za Elementorem (4.0.2 vs 4.3.5). Riziko roste. Vypnout nejde bez přestavby webu |
| **Leadpages** 1.5.0 | vkládá stránky Leadpages na doménu | **ano**: `/10x-english` a `/irregular` (2 napojené z 207 stránek v účtu) | nutný, dokud prodejní stránky běží přes WordPress |
| **Drip for WordPress** 1.0.2 | sledovací kód Dripu (účet 2094497) | ano, kód je na WordPress stránkách | nutný pro Drip sledování na webu |
| **Metricool** 2.1.2 | statistiky webu v Metricoolu | ano, kód je na stránkách | ponechat, pokud Lenka statistiky webu v Metricoolu sleduje (neověřeno) |
| **Rank Math SEO** | SEO, sitemapa, přesměrování | ano (organické SEO je hlavní zdroj návštěv podle `setup.md`) | ponechat; při přesunu webu je potřeba převést přesměrování a nastavení SEO |
| **WP Rocket** 3.16.2.1 | cache, zrychlení | ano (drop-in `advanced-cache.php`) | **licence vypršela** (nabízí 3.23), takže bez aktualizací. Rozhodnout: obnovit, nebo nahradit bezplatnou cache |
| **Jetpack** 16.3.1 | statistiky, ochrana přihlášení, CDN obrázků, formuláře, monitor, AI… (16 modulů) | částečně: statistiky (kód `stats.wp.com` je na webu), ochrana; kontaktní formuláře 0 odpovědí | (odhad) velká část modulů je zbytečná; zvážit zúžení |
| **Akismet** 5.7.2 | antispam komentářů | málo: komentáře jsou vypnuté, celkem 3 | (odhad) postradatelný |
| **UpdraftPlus** 1.26.13 | zálohy na Google Disk | **nastavený, ale neběží**: režim „ručně“, poslední záloha 27. 3. 2026 | zapnout pravidelné zálohy (dřív než cokoli mazat) |
| **Folders** 3.2.9 | složky v médiích a stránkách | pohodlí v administraci | postradatelný |
| **Loco Translate** 2.8.9 | překlady šablon a pluginů | (odhad) jednorázově použitý | postradatelný, ověřit, zda nedrží vlastní české překlady |
| **LuckyWP Table of Contents** 2.1.14 | obsah v článcích | (odhad) ano ve starších článcích | ponechat, dokud žije blog |
| **Search Exclude** 2.6.8 | skrývá stránky z vyhledávání na webu | (odhad) skrývá děkovací a interní stránky | ponechat / malý |
| **Plugin Detective** 1.2.37 | ladění konfliktů pluginů | ne, nástroj pro řešení potíží | smazat |

### Neaktivní (17)

Neaktivní plugin nic nedělá, ale je na serveru (bezpečnostní riziko, hosting i Zdraví webu doporučují smazat). **Riziko při odstranění u všech nízké** (nic nedělají), s výhradou u označených.

| Plugin | K čemu | Návrh na později |
|---|---|---|
| Broken Link Checker | kontrola rozbitých odkazů | smazat (nebo jednorázově zapnout při úklidu blogu) |
| Database Cleaner | čištění databáze | smazat |
| Imagify | komprese obrázků | smazat, nebo zapnout místo něj (obrázky zpomalují hlavní stránku) |
| Img Title Removal | odstraní title u obrázků | smazat |
| JetElements, JetPopup (Crocoblock) | doplňky Elementoru | smazat (placené, bez aktualizací z WordPress.org) |
| Media Cleaner, Media Sync | úklid médií | smazat (Media Cleaner případně jednorázově při úklidu) |
| SimpleShop | dřívější prodej (před FAPI) | smazat (odhad: SimpleShop už se nepoužívá, prodej jde přes FAPI) |
| Smush | komprese obrázků | smazat |
| Termly | cookie lišta | ⚠️ viz otázka o cookie liště níže |
| Update URLS | hledat a nahradit | smazat |
| WebberZone Top 10 | počítadlo oblíbených článků | smazat |
| WP All Export | export obsahu | smazat (hodí se ale při stěhování, dá se nainstalovat znovu) |
| WPFront Scroll Top | tlačítko nahoru | smazat |
| WPMU DEV Dashboard | účet WPMU DEV | smazat |
| Yoast Duplicate Post | kopírování stránek | smazat |

Navíc: drop-in `maintenance.php` (vlastní stránka údržby, neškodí); neaktivní šablony Hello Elementor 3.4.4 a **Hello Elementor Child** (podřízená šablona, může obsahovat ruční úpravy; neotevíral jsem).

## 2. Šablony

- **Aktivní: Kadence 1.4.5** (nová 1.5.2, aktualizace šablony 261024 neproběhla). Bez podřízené šablony. Protože hlavičku, patičku i šablony článků přebírá Elementor Pro, je Kadence prakticky jen „skořápka“. Ruční úpravy v souborech Kadence jsem neověřoval (editor souborů jsem neotevřel); vlastní CSS v Přizpůsobení také neověřeno.
- Neaktivní: Hello Elementor 3.4.4 a Hello Elementor Child.

## 3. Obsah

| | Počet | Poznámka |
|---|---|---|
| Stránky | 14 (9 publikovaných, 5 konceptů) | koncepty jsou demo „xDemo …“ z roku 2022 → k úklidu |
| Příspěvky (blog) | 113 (112 publikovaných) | první 1/2017, **poslední 16. 8. 2024** |
| Média | 510 souborů | uploads 604 MB |
| Šablony Elementoru | 11 v knihovně + 9 v Theme Builderu + 2 popupy | |
| Komentáře | 3 | komentáře vypnuté |

**Publikované stránky (WordPress):**

| Stránka | Postavená na | Poslední úprava | Poznámka |
|---|---|---|---|
| Home (hlavní) | Elementor | 23. 12. 2025 | |
| Angličtina s příběhem `/hele/` | Elementor (canvas) | 1. 11. 2025 | HELE je v someday; stránka žije |
| Irregular ChO `/irregular-cho/` | Elementor (canvas) | 2. 10. 2026 | odkaz z FAPI (odhad: děkovací / objednávková stránka Nepravidelných sloves) |
| Online kurzy angličtiny `/kurzy/` | Elementor | 15. 9. 2026 | |
| Kontakt | Elementor | 14. 8. 2025 | |
| Správa osobních informací `/uprava/` | Elementor | 18. 7. 2024 | |
| Blog | stránka pro příspěvky (šablona Elementor Pro) | | |
| Obchodní podmínky | editor bloků | 25. 9. 2024 | |
| Ochrana osobních údajů | editor bloků | 6. 5. 2022 | |

**Elementor celkem:** 6 živých stránek + 4 demo koncepty + celá kostra webu a blogu.

**Stránky z Leadpages na doméně** (plugin Leadpages, účet má 207 stránek, na WordPress napojené jen 2):
- `/10x-english` — 10x ENGLISH (prodejní, živá)
- `/irregular` — Nepravidelná slovesa za 14 dní (prodejní, živá). ⚠️ Pozor: adresa `/nepravidelna-slovesa/` **není** prodejní stránka, je to blogový článek z roku 2020 („Nepravidelná slovesa v angličtině: jak na ně v 5 krocích“). V zadání a ve vaultu se místy píše `/nepravidelna-slovesa` jako prodejní stránka — ověřit, kam vedou reklamy a maily.
- Ostatní stránky Leadpages (webináře, DigiStart koncepty) běží na `lenka-dvorakova.lpcontent.net`, ne na WordPressu.

**Zjevně staré:** demo koncepty „xDemo“ (2022), šablony Elementoru pro webináře (Webinar Registration, Replay, HELE-EW…), popup WebinarKit, Google Analytics UA (Google ho vypnul v roce 2024, kód je na webu zbytečně).

**Velikost (Zdraví webu):** celá instalace 2,37 GB = uploads 604 MB + pluginy 349 MB + šablony 10 MB + databáze 100 MB + ostatní soubory WordPressu 1,33 GB. Těch 1,33 GB je na WordPress neobvykle moc (odhad: staré zálohy UpdraftPlus nebo jiné soubory ve `wp-content`; neověřeno). V Plesku zabírá doména lcenglish.cz 3,6 GB.

## 4. Napojení, která musí dál fungovat

| Napojení | Kde je | Na čem závisí |
|---|---|---|
| **Meta pixel 552638212929820** | WordPress stránky: vlastní kód v **Elementor Pro**; Leadpages stránky: v hlavičce stránky v Leadpages; nákup: FAPI děkovací stránka | při odchodu z Elementoru Pro nebo WordPressu přenést |
| **Google Tag Manager GTM-W7T2DNRP, GA4 G-TPM0Q6YT3M, Google Ads AW-969557192, Sklik** | vlastní kódy v Elementor Pro | totéž; GA UA-187897128-1 je mrtvý |
| **Drip** (účet 2094497) | plugin Drip for WordPress + popup Elementor Pro na hlavní stránce | formuláře hlavně mimo WordPress (Leadpages, FAPI) |
| **FAPI** | odkazy a formuláře na `/10x-english` (Leadpages) a `/irregular-cho` (Elementor) | objednávky běží u FAPI, ne na WordPressu |
| **fapipi** (FAPI → Drip → Shadowloop → FreshLearn) | `fapipi.lenkadvorakova.cz` na jiném serveru (37.205.8.210), ne u HOSTINGSOLUTIONS | WordPressu se netýká; DNS záznam je ale u domény lenkadvorakova.cz |
| **Leadpages** | plugin (2 stránky) | při odchodu z WordPressu jde napojit doménu přímo v Leadpages (odhad, neověřeno) |
| **FreshLearn** `kurzy.lcenglish.cz` | DNS CNAME na `cname.freshlearn.com` | jen DNS záznam, na hostingu nezávisí |
| **Shadowloop** `shadowloop.lcenglish.cz` | běží na Firebase (199.36.158.100), DNS u HOSTINGSOLUTIONS | jen DNS záznam |
| **Metricool** | plugin | |
| **Jetpack statistiky** | plugin + účet WordPress.com | |
| **E-mail lenka@lcenglish.cz** | schránka u HOSTINGSOLUTIONS (Plesk), využito 242 kB ze 400 MB; MX `mail.lcenglish.cz` na tomtéž serveru; SPF `include:_spfc.hostingsolutions.cz -all`, DMARC `p=none` | ⚠️ odesílací adresa Dripu. Při změně hostingu se musí vyřešit pošta a DNS, jinak přestanou chodit maily (odhad: schránka přeposílá do Gmailu) |
| **Doména lights-camera-english.com** | alias lcenglish.cz v Plesku | registraci jsem u HOSTINGSOLUTIONS nenašel (odhad: registrovaná jinde) |
| **kurzy.publicspeaking.cz** | Teachable (CNAME) | jen DNS |

## 5. Výkon

**PageSpeed Insights, mobil, 24. 10. 2026 15:40:**

| Stránka | Skóre | Zobrazení prvního obsahu | Největší obsah (LCP) | Postaveno |
|---|---|---|---|---|
| Hlavní stránka | **56** | 7,8 s | **16,2 s** | Elementor |
| `/hele/` | **59** | 4,1 s | **15,0 s** | Elementor |
| `/10x-english` | 78 | 1,1 s | 4,9 s | Leadpages |
| `/irregular` | **100** | 1,1 s | 1,1 s | Leadpages |

Hlavní brzdy hlavní stránky (PageSpeed): skripty a styly blokující vykreslení (úspora až 5,7 s), 606 kB nepoužitého JavaScriptu, krátká doba cache. Reálná data od návštěvníků Google nemá (málo návštěv).

**Zdraví webu (Stav): 0 kritických, 7 doporučení:** smazat neaktivní pluginy · chybí výchozí šablona · zastaralý SQL server (MariaDB 10.6) · opožděná naplánovaná úloha · **vypnutá OPcache** (PHP bez cache kódu, zpomaluje) · chybí trvalá objektová cache · MCP OAuth (konfigurace, nevýznamné).

Server: Linux s jádrem 3.10 (CentOS 7 s prodlouženou podporou TuxCare), Apache/nginx, PHP 8.3.36, paměť 256 MB. Starší systém, ale udržovaný (odhad).

## 6. Hosting HOSTINGSOLUTIONS

- **Tarif:** Webhosting – Multihosting (Reseller hosting), Plesk na serveru `web54.hostingsolutions.cz`, IP 176.227.168.166. 5 domén, 10 GB disku (využito **4,7 GB**), přenos neomezený (1,7 GB/měsíc).
- **Co na něm běží:** lcenglish.cz (3,6 GB) + alias lights-camera-english.com, lenkadvorakova.cz (960 MB), publicspeaking.cz (140 MB), prázdné subdomény shadowloop.lcenglish.cz a kurzy.publicspeaking.cz (aplikace samotné běží jinde).
- **Cena:** 894 Kč + DPH = **1 081,74 Kč za pololetí → 2 163 Kč ročně**. Zaplaceno do 9. 5. 2027 (záloha 202601198, zaplacena 21. 10. 2026).
- **Domény u HOSTINGSOLUTIONS** (každá 302,50 Kč/rok = **908 Kč ročně**, platí se i po případném odchodu z hostingu): lcenglish.cz (do 24. 6. 2027), lenkadvorakova.cz (do 5. 5. 2027), publicspeaking.cz (do 27. 9. 2027).
- **Celkem u HOSTINGSOLUTIONS: cca 3 071 Kč ročně** (Lenka je neplátce DPH, DPH je pro ni náklad).
- **E-maily:** u lcenglish.cz jedna schránka lenka@lcenglish.cz. U ostatních domén jsem schránky neprocházel.
- **Zálohy:** sekce záloh v Plesku hlásí „Oprávnění bylo odepřeno“, zákazník je nevidí. Jestli hosting zálohuje sám a jak dlouho drží zálohy, neověřeno. Hosting nabízí placený „Cloud Backup“.
- Faktury: [poslední záloha](https://mail.google.com/mail/?authuser=lnk.dvorakova@gmail.com#all/thread-f:1879634141929765549) · [zákaznický účet](https://cp.hostingsolutions.cz/clientarea.php?action=services)

## Co z toho plyne pro rozhodnutí (otevřené otázky pro Lenku)

1. **Co má web vlastně dělat?** Dnes prodávají dvě stránky z Leadpages, kurz je ve FreshLearnu, objednávky ve FAPI. WordPress drží hlavně blog (poslední článek 8/2024), pár stránek a měřicí kódy. Je blog pro SEO ještě živý zdroj zákazníků, nebo archiv?
2. **Elementor Pro bez předplatného:** obnovit (bezpečnostní opravy, ale peníze za nástroj, který Lenka nepoužívá), nebo naplánovat přestavbu (Kadence má vlastní hlavičku a patičku, kódy jdou vložit jinak), nebo odejít z WordPressu úplně? Dokud se nerozhodne, web běží na pluginu bez oprav.
3. **WP Rocket bez licence:** obnovit, nebo nahradit? (Souvisí s otázkou 2: pomalá je hlavně Elementor část.)
4. **Kolik stojí alternativa?** Hosting je 2 163 Kč ročně; domény se platí v každém případě. Leadpages už Lenka platí. Je úspora hostingu větší než práce a riziko stěhování (SEO 112 článků, přesměrování, e-mail, DNS)?
5. **lenkadvorakova.cz a publicspeaking.cz** běží na stejném tarifu. Při odchodu lcenglish.cz musí jít jinam i ony, jinak se hosting neušetří.
6. **E-mail lenka@lcenglish.cz** (odesílací adresa Dripu) je u HOSTINGSOLUTIONS. Kam by šel při stěhování?
7. **Zálohy:** zapnout pravidelné zálohy UpdraftPlus dřív, než se cokoli maže nebo stěhuje? (Doporučení, ne rozhodnutí.)
8. **Cookie lišta:** v kódu hlavní stránky není o cookies ani souhlasu nic (Termly je vypnutý), přitom běží Meta pixel, GA4, Google Ads a Sklik. Na `/10x-english` je jen obecný kód, který umí reagovat na cizí lištu (Cookiebot, CookieYes); jestli se nějaká lišta zobrazuje, jsem neověřoval. Jde o vědomé rozhodnutí, nebo o díru? (Lištu by teoreticky mohl vkládat GTM; neověřeno.)
9. **Úklid nezávisle na rozhodnutí:** smazat 17 neaktivních pluginů, demo koncepty a mrtvý kód GA UA, to hosting i WordPress doporučují v každém scénáři. Chce to Lenka udělat teď, nebo až s rozhodnutím?
10. **Adresy prodejních stránek:** `/irregular` vs. `/nepravidelna-slovesa` (blog). Sedí odkazy v reklamách a v Dripu?

## Doplněk 261024 16:10 (Lenčiny odpovědi a dohledané věci)

**Lenka 261024:**
- Cookie lištu vědomě nemá a mít nechce (obtěžuje). Nebrat jako díru, ale jako rozhodnutí.
- Prodej neběží jen přes Leadpages: HELE (`/hele/`, Angličtina s příběhem) je prodejní stránka na Elementoru. FAPI dělá faktury, FreshLearn hostuje kurzy.
- Blog je živý zdroj z vyhledávání, pracovní historie a vizitka, **nechce o něj přijít**.
- **Elementor Pro neobnovovat.** Otevřené zůstává: přestavět web, přesunout na Leadpages (jde to?), odejít z WordPressu (kam?), nebo zjednodušit.

**Co je těch „1,33 GB“ (Plesk, Vypočítat velikost):**
- Webový prostor lcenglish.cz má v Plesku přidělené **3 000 MB a používá 3,5 GB (120 %)** ⚠️. (Tarif 10 GB je rozdělený: lcenglish.cz 3 000 MB, lenkadvorakova.cz 6 240 MB, publicspeaking.cz 1 000 MB.) Jestli překročení něco blokuje (např. nahrávání obrázků), neověřeno.
- `wordpress-backups/` (mimo web): **1,54 GB** = dvě celé zálohy webu z Plesk WP Toolkitu, 21. 11. 2022 (756 MB) a 11. 9. 2024 (811 MB), + databáze 2022.
- Ve `wp-content/`: `updraft` **342 MB** = stará záloha UpdraftPlus z 21. 6. 2022 (novější zálohy z 3/2026 jsou na Google Disku); `languages` **295 MB** (překlady, neobvykle mnoho); `cache` 31 MB (zbytky starých cache pluginů Autoptimize a WP Fastest Cache z 2022 + WP Rocket); `upgrade-temp-backup` 24 MB (dočasné po dnešní aktualizaci).
- `shadowloop.lcenglish.cz/` **374 MB** = stará verze aplikace Shadowloop z 2021 (+ složka `decks`). Živá aplikace na hostingu neběží (viz níže), takže jde (odhad) o pozůstatek. Nemazat bez Vítka.
- Pro srovnání: uploads 298 MB, pluginy 372 MB, šablony 10 MB. Zdraví webu ve WordPressu uvádí jiná čísla (uploads 604 MB); čísla z Plesku jsou přímé měření.

**Kde běží Shadowloop a fapipi:**
- **Shadowloop:** Google Firebase, projekt `shadowloop-firebase` (Firebase Hosting přes CDN, funkce v regionu europe-central2, databáze Firestore; repozitář github.com/kokolem/shadowloop). U HOSTINGSOLUTIONS je jen záznam DNS subdomény a stará kopie. Podklad [[shadowloop-admin]].
- **fapipi:** `fapipi.lenkadvorakova.cz` → server 37.205.8.210 v datacentru MasterDC Praha, server se jmenuje `kybersquat.cz`. Kód github.com/kokolem/fapipi. Čí je server (odhad: Vítkův), neověřeno → zeptat se Vítka. U HOSTINGSOLUTIONS je jen záznam DNS.
- **FreshLearn** (`kurzy.lcenglish.cz`) i **Teachable** (`kurzy.publicspeaking.cz`) jsou samostatné platformy, u hostingu jen DNS.

**Co znamená „zálohy hostingu nevidíš“:** v ovládacím panelu (Plesk) je sekce Zálohy pro zákazníka zamčená („oprávnění odepřeno“), sama si tam zálohu udělat ani obnovit nemůžeš. Podle stránky tarifu dělá HOSTINGSOLUTIONS **denní zálohy, uchovává 7 dní**; obnova je přes podporu („Obnovení dat ze zálohy“ je v ceníku, cenu jsem neověřoval). Starší než týden tedy hosting nemá; vlastní zálohy = UpdraftPlus (teď jen ručně).

**publicspeaking.cz** ⚠️: nepřesměrovává se na úrovni domény. Je na něm **celý WordPress 6.2.14** (aktuální 7.1.3), který přesměrovává přes plugin Redirection na lenkadvorakova.cz. Panel hlásí „instalace je zastaralá“ a čekající aktualizace pluginů a šablon. PHP 8.2.35 (opravená verze). Web 105 MB + databáze 34 MB. Starý neaktualizovaný WordPress je zbytečné bezpečnostní riziko; přesměrování jde udělat bez WordPressu (odhad: v Plesku nebo DNS).

## lenkadvorakova.cz — výchozí stav (261024 16:10, jen čtení)

**Co to je:** malý osobní web, WordPress 7.1.3, PHP 8.3.36, šablona Kadence 1.4.5 (nová 1.5.2) + neaktivní Hello Elementor. Celá instalace 814 MB (uploads jen 15 MB, pluginy 325 MB, „ostatní soubory“ 420 MB — odhad: zbytky záloh a cache jako u lcenglish.cz, neprocházela jsem). Webový prostor 960 MB z 6 240 MB.

**Obsah:** 8 publikovaných stránek, 1 koncept, 3 příspěvky (+3 koncepty), 91 médií.
- Home, Kontakt (Elementor), Blog, Obchodní podmínky, Ochrana osobních údajů
- `alpha`, `surveytest` (Elementor, 2023, odhad: testovací), SUPERworkshop 2022 – záznam (chráněno heslem), koncept „AI sborovna SP“
- Blog: 3 články (2 o AI z května 2023, „Historie novoročních předsevzetí“ 1. 1. 2026)
- **15 stránek z Leadpages přes starý plugin Leadpages Connector 2.3.13:** `/ai` („AI sborovna – prodej skončil“) a záznamy AI workshopů 2023–2024 (`/ai-workshop-…-replay`)

**Pluginy (18: 16 aktivních, 2 neaktivní):**

| Plugin | K čemu | Používá se? | Návrh na později |
|---|---|---|---|
| Elementor 4.3.5 | stavitel stránek | ano: Home, Kontakt, alpha, surveytest | ponechat, dokud stránky na něm stojí |
| Essential Addons for Elementor, Templately | doplňky a šablony Elementoru | (odhad) část prvků na Home | ověřit při zjednodušení |
| Leadpages Connector 2.3.13 | starý plugin Leadpages (Classic) | ano, 15 starých stránek | ⚠️ zastaralá verze; na lcenglish.cz už je nový plugin 1.x. Rozhodnout, jestli staré záznamy workshopů ještě mají žít |
| Fluent Forms | formuláře (2, mj. Subscription Form 2022) | kód je na všech stránkách | (odhad) přihlašovací formulář; ověřit, kam posílá |
| Drip for WordPress | sledovací kód Dripu, **jiný účet 8879539** (ne LCE 2094497) | ano | ponechat |
| Redirection 5.10.1 | 2 přesměrování (`/736-2/` → předsevzetí, `/elementor-361/` → alpha) | ano, málo | ponechat / malý |
| Rank Math SEO, Jetpack, Akismet, Folders, LuckyWP TOC, Metricool, UpdraftPlus, WP Rocket (licence vypršela), Image Optimization | jako u lcenglish.cz | | stejné otázky jako u lcenglish.cz |
| neaktivní: Elementor Pro 3.35.1, Imagify | | ne | smazat (Elementor Pro je velmi stará verze) |

**Měření:** na webu je Drip a Jetpack statistiky, na části stránek Metricool. **Meta pixel ani Google Analytics nejsou.**

**Výkon:** PageSpeed mobil, hlavní stránka **80** (první obsah 2,7 s, největší obsah 4,1 s). Výrazně lepší než lcenglish.cz.

**Zdraví webu (7 doporučení):** šablony čekají na aktualizaci · Jetpack hlásí, že web blokuje požadavky z WordPress.com · neaktivní pluginy · starý SQL server · vypnutá OPcache · chybí objektová cache · MCP OAuth.

**Zálohy:** UpdraftPlus na Google Disk, jen ručně, poslední 5. 2. 2025.

**E-mail:** info@lenkadvorakova.cz u HOSTINGSOLUTIONS (524 kB). SPF obsahuje i Mailgun (odhad: odesílání z nějakého nástroje). Nameservery: ns1.hostingsolutions.cz + czns2.aziendeitalia.com.

**Na doméně dál žije `fapipi.lenkadvorakova.cz`** (automatika nákupů LC English, server kybersquat.cz). ⚠️ Při jakékoli změně DNS lenkadvorakova.cz musí tenhle záznam zůstat, jinak přestanou fungovat nákupy LC English.

**publicspeaking.cz** viz výš: WordPress 6.2.14 jen kvůli přesměrování.

## Možnosti pro lcenglish.cz (podklad k rozhodnutí, nic nerozhodnuto)

Výchozí body od Lenky: blog zůstává (SEO, vizitka), Elementor Pro se neobnovuje, HELE je prodejní stránka na Elementoru.

**Co Leadpages umí (nápověda a web Leadpages, čteno 261024):**
- **Weby (Sites):** více stránek se společnou navigací na vlastní doméně, i na hlavní (`lcenglish.cz`); sitemap automaticky, SSL zdarma; ve všech placených tarifech. ([Sites](https://leadpages.com/product/sites), [připojení domény](https://support.leadpages.com/hc/en-us/articles/44792783022989--New-Leadpages-Connect-your-Domain), aktualizováno 11. 8. 2026)
- **Blog:** vestavěný; u článku adresa (slug), titulní obrázek, kategorie, SEO titulek a popis, OG obrázek, kanonická adresa, RSS, koncepty a plánování, vlastní HTML šablona článku. ([nápověda Blogs](https://support.leadpages.com/hc/en-us/articles/44792811211661--New-Leadpages-Blogs-Creating-and-Managing-Blog-Posts), aktualizováno 2. 4. 2026)
- **Import z WordPressu nemá.** Články ale jde zakládat strojově přes Leadpages konektor v Claude (`create_blog_post` má slug, kategorie, meta, obrázek), takže převod 112 článků je proveditelný (jako koncepty, zveřejnění po Lenčině schválení).
- **Připojení domény:** když na doméně běží jiný web, Leadpages ho „schová“ a doporučuje subdoménu. Připojení hlavní domény = přesun celého webu najednou.
- Neověřeno: jakou adresu mají články na Leadpages blogu. WordPress má `lcenglish.cz/<nazev-clanku>/`; pokud Leadpages používá `/blog/<nazev>`, je potřeba 112 přesměrování 301. Přesměrování na stejné doméně Leadpages podle mailu z 23. 10. 2026 nově umí (zápis v [[lcenglish-10x-english-sales-page]]); jestli jich zvládne stovky, neověřeno. Lenčin tarif Leadpages a jeho limity (počet webů, domén) neověřeny.
- Neověřeno: obsah článků z Elementoru (šablona, obsahy LuckyWP, vložená videa) se do Markdownu převede jen částečně; u článků by byla potřeba kontrola.

**Varianty:**

| | A. WordPress, zjednodušit | B. WordPress jen na blog, prodej v Leadpages | C. Vše do Leadpages | D. Jiná platforma |
|---|---|---|---|---|
| Co se udělá | hlavička, patička a šablona blogu znovu v Kadence (zdarma); měřicí kódy na jedno místo (GTM nebo malý plugin); Elementor Pro pryč; úklid pluginů a starých záloh | jako A + HELE a další prodejní stránky přestavět v Leadpages (vkládat přes plugin jako dnes 10x a Irregular) | web, stránky i 112 článků do Leadpages Site + blog na `lcenglish.cz`; WordPress zrušit | Ghost, Webflow, Squarespace apod. |
| Hosting | zůstává (2 163 Kč/rok) | zůstává | lcenglish.cz hosting nepotřebuje; **úspora jen když odejdou i lenkadvorakova.cz a publicspeaking.cz** | podle platformy, další předplatné |
| Práce | střední, jednorázová | střední + přestavba HELE | velká (převod, přesměrování, DNS, e-mail) | velká + nový nástroj |
| Riziko pro SEO | malé (adresy zůstanou) | malé | střední (změna adres, převod obsahu) | střední |
| Uzamčení | ne | částečně (prodejní stránky už teď) | ano, vše u Leadpages | podle platformy |
| Rychlost | lepší než dnes (bez Elementor Pro) | prodejní stránky rychlé | rychlé (CDN Leadpages) | podle platformy |

**Při odchodu z hostingu by se muselo vyřešit (C, D):** DNS domén (dnes nameservery HOSTINGSOLUTIONS), e-maily lenka@lcenglish.cz a info@lenkadvorakova.cz (Drip odesílá z lenka@lcenglish.cz), záznamy pro `kurzy.`, `shadowloop.`, `fapipi.`, ověření Google a SPF/DKIM pro Drip. Domény se platí dál (908 Kč/rok) u kteréhokoli registrátora.

**Otevřené otázky pro Lenku (k rozhodnutí):**
1. Stojí 2 163 Kč ročně za hosting za práci a riziko velkého stěhování (C)? Nebo je hlavní cíl „méně mazce“, což řeší i A/B?
2. Má HELE zůstat jako prodejní stránka (a tedy ji přestavět v Leadpages), když je funnel v someday?
3. lenkadvorakova.cz: k čemu dnes slouží? Potřebuješ ještě staré záznamy AI workshopů (15 stránek přes starý plugin)? Je to místo pro DigiStart (otázka hostingu digistart.cz)?
4. publicspeaking.cz: přesměrovat bez WordPressu a starý WordPress smazat? (Rozhodnutí Lenky; samotný zásah je malý.)
5. Kdo udělá technickou část: Claude (Leadpages konektor, WordPress), Vítek (DNS, fapipi), nebo kombinace?
