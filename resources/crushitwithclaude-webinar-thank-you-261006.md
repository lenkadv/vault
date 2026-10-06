# Crush It with Claude: děkovací stránka po přihlášení na webinář (swipe, 261006)

**Co to je:** potvrzovací stránka, která se ukáže hned po přihlášení na bezplatný webinář „Crush It with Claude“ (tvůrce: BotBuilders, ve stránce odkaz přes affiliate `am_id=jonschumacher`). Uloženo 261006, 18:45, 1 minutu před začátkem webináře, jako inspirace pro [[projects/digistart]] (děkovací stránka, přihlášení na ukázkovou hodinu, e-maily před kurzem).

**Původní zdroj:** `https://crushitwithclaude.com/thank-you-starting-js?am_id=jonschumacher` (stránka je z GoHighLevel / LeadConnector, video přes video.js, odpočet a osobní odkaz na živé vysílání řeší webinářový nástroj automator.ai). Lenčin osobní odkaz s registračním kódem je v archivu schválně očištěn.

**Použij, až budeš řešit:** co má stát na stránce hned po přihlášení, aby lidé na živý začátek opravdu přišli; jak vypadá jednoduchá webinářová funnel stránka; jak oslovit publikum 40+ jinak než tenhle americký styl ([[projects/digistart]] persona).

**Dárek za účast:** PDF „AI CMO Skills List“ (seznam 83 skillů) → [[BB – AI CMO Skills List]] v Databance. Druhý handout, schéma „jak to funguje“ → [[BB – AI CMO Flowchart]].

## Archiv (aby zůstalo, i když stránka zmizí)

Složka `resources/crushitwithclaude-thank-you-261006/`:
- `01` až `05` — snímky obrazovky stránky shora dolů (desktop, 1024 px)
- `stranka.html` — celé HTML stránky (319 kB, bez osobních údajů; styly a skripty jsou částečně načítané z cizího serveru, takže samotný soubor bez internetu nevypadá přesně, snímky ano)
- `obrazky/` — všechny obrázky ze stránky v původní velikosti (ikony, maskot robot s dárky, logo BotBuilders, pozadí; názvy souborů odpovídají odkazům v HTML)
- Video z horního okna se záměrně neukládá (viz níže)

## Jak je stránka postavená (shora dolů)

1. **Tmavě modrý pruh + bílá karta s oranžovým kroužkem a fajfkou:** „You're confirmed … See you live at the webinar!“ Potvrzení je první a největší věc, takže člověk hned ví, že se přihlášení povedlo.
2. **Nadpis psaný rukopisným písmem (Kalam), podtržený:** „Quick preview of what to expect on the workshop…“ a pod ním **video 83 s** (přehrává se samo, titulky jsou vypálené přímo ve videu, takže funguje i bez zvuku; mluví muž v červeném saku před logem BotBuilders).
3. **Bílá karta s odpočtem** (dny, hodiny, minuty, sekundy) a **osobním odkazem na vysílání s tlačítkem Kopírovat.** Odkaz je hned k dispozici, nemusí se hledat v e-mailu.
4. **Tmavě modrý pás „What You'll Learn“:** 6 bodů ve 2 řadách po 3, každý s bílou ikonou, krátká věta, klíčové slovo tučně (Automate, Skills, AI to use AI, running your emails and tools, Chief Marketing Officer, HUGE announcement). Poslední bod je tajemný teaser bez obsahu.
5. **Světlý pás: maskot robot s dárky v oválném rámečku + „3 Free Gifts for Attending!“** a modrý podtitul (Includes High-Converting Ad Scraper). Důvod přijít živě = dárky, které dostanou jen účastníci.
6. **„What you need to do…“ — 3 sloupce, každý bílá čtvercová karta s modrou ikonou a jednou větou:** přidat do kalendáře + nastavit budík v telefonu · přijít kvůli dárku (ke stažení) · „best viewed on a computer“.
7. **Tmavě modrá patička:** logo BotBuilders, odkazy Contact / Privacy / Terms a dlouhé upozornění (není to schváleno Anthropicem, žádná záruka výsledků, affiliate odkazy).

**Barvy a písma:** tmavě modrá (`#064079` pruh), světle modrý přechod do bílé, oranžová jen na fajfku, jasně modrá pro ikony a odkazy. Písma Inter (nadpisy a texty), HK Grotesk (odpočet), Kalam (rukopisný nadpis nad videem). Stránka má jen jednu akci a tou je přijít, žádné tlačítko „koupit“.

## Co z toho vzít a co ne (návrh, Lenka rozhoduje)

- **Vzít:** potvrzení hned nahoře · krátké video „co vás čeká“ · odpočet a osobní odkaz na jednom místě · 3 věty „co teď udělat“ s ikonami (kalendář, přijít, počítač) · radu „na počítači je to lepší“ (pro 40+ hodně praktické) · dárek za účast jako důvod přijít živě.
- **Nebrat:** video v horním okně, které se po odpočtu mění na vysílání (matoucí) · předstíraný živý chat · křiklavé „HUGE announcement“, „major unlock“, „24/7“, anglický žargon (u DigiStart je zásada žádný žargon bez vysvětlení) · tajemné body bez obsahu · vypálené titulky přes půl videa · dlouhé právní upozornění tohoto typu. Pro naše publikum by seděla klidnější forma: konkrétní věta, co si účastnice odnese, jméno lektorky, jedna fotka lektorek, ne maskot.
- **Pozor na formu:** americký styl se na český trh nepřenáší 1:1, viz [[resources/postupy/prodejni-stranky]] (oddíl Úpravy pro český trh).

## Video v horním okně (83 s) — nekopírovat

- Přehrávač video.js, stream HLS (`content.apisystem.tech/hls/medias/QJ103qxfEO9Dj2mFP0BJ/media/transcoded_videos/cts-873a9dc82481226e_,360,480,720,1080,p.mp4.urlset/master.m3u8`), kvality 360 až 1080 p.
- **Rozhodnutí Lenky (261006): video nestahovat.** Okno nahoře je jen náhledová ukázka, která se po skončení odpočtu do spuštění webináře změní na vysílání. Pro návštěvníka je to **matoucí** (je to video, nebo už webinář?), proto tohle pro DigiStart nekopírujeme. Uložen je jen vzhled stránky.

## Evergreen webinář, který se tváří jako živý (pozorování Lenky, 261006)

- Webinář je nahrávka dříve vysílaného živého webináře, nastavená jako **evergreen**: spouští se **5 minut po registraci** (nástroj automator.ai).
- Během přehrávání běží **komentáře, které se tváří jako živé**, ale Lenka je považuje za **podezřelé / pravděpodobně vymyšlené**: všichni „účastníci“ mají velmi obyčejná křestní jména (Chris, Tony, Andrew, Joyce, Beth…), což u skutečných lidí v chatu nebývá. Je to zatím její pozorování, nepotvrzený fakt (webinářové nástroje tuhle funkci, simulovaný chat, běžně nabízejí).
- **Pro DigiStart:** evergreen nahrávka sama o sobě problém není (vstup kdykoli, bez čekání), ale **předstírat živé vysílání a vymyšlené komentáře nechceme**. U publika 40+, které hledá lektorky, kterým může věřit, by odhalený podvrh zničil důvěru. Poctivá verze: napsat rovnou „záznam“ (nebo „ukázková hodina ze záznamu + živé otázky v daný termín“), skutečný chat jen s reálnými lidmi.
- Přepis zvuku webináře dodala Lenka 261006, rozbor je v [[BB – Crush It with Claude webinář]] (struktura, nabídka a cena, co vzít a co nebrat).

## Snímky z webináře (od Lenky, 261006)

Soubory ve složce `crushitwithclaude-thank-you-261006/`, čeká se na přepis, který vysvětlí, jak to prezentující používá.

### webinar-01-pinned-AI-CMO-projekt.png (19:15)

![[webinar-01-pinned-AI-CMO-projekt.png]]

**Co je na snímku (jen popis, bez výkladu):**
- Prezentující (v rohu popisek **Matt Leitz**) sdílí obrazovku aplikace Claude. Adresa v záložce je `claude.ai/cowork/…`, ale prezentující říká, že **Cowork už je sloučený do běžného chatu**, takže jde o chat s projektem, ne o terminálový Claude Code (opraveno po přepisu). Účet v levém dolním rohu je „Matt · Max“.
- **Levé menu, sekce Pinned:** připnutá složka/projekt **„AI CMO“** a v něm deset vláken s popisnými názvy: CMO capabilities overview · SEO and GEO BotBuilders · Influencer promoter campaign… · **⚡ Weekly CMO Priorities** (otevřené) · Funnel Conversion Optimizat… · Advertising Management · Webinar video ad script · Image Ads for Meta · Sales video script with ad dem… · Automating CMO work.
- **Otevřený výstup „Weekly CMO Priorities“** je plán jako zaškrtávací seznam rozdělený do dnů (v záběru „Days 5–6: Wire tracking“, „Days 6–7: Sales ready“). U každého úkolu je pod ním **kdo ho dělá** (Developer, Joyce, Matt + sales lead) a u některých **název skillu**, který ho připraví (`conversion-copywriting-email-sequences`). Za každým dnem je **GATE**, tedy podmínka, podle které poznáš, že je blok hotový („Vidíš cestu každého kupujícího od nákupu po rezervovaný hovor v jednom pohledu“).
- Okrajově: jméno **Joyce** je v plánu uvedené jako člen týmu a stejné jméno Lenka předtím zmínila mezi podezřelými komentáři v chatu webináře. Může jít o náhodu, nic z toho neplyne.

**Proč to Lenku zaujalo:** uspořádání připnutých vláken v projektu podle činností (přehled, SEO/GEO, reklama, skripty, automatizace) a plán s vlastníkem úkolu a bránou pro každý blok. K domyšlení po přepisu: jak to používá (jedno vlákno na činnost? jak se do plánu propisují skilly?) a co by se z toho hodilo pro náš systém (denní vlákno, projekty) a pro DigiStart.
