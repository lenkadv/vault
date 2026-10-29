# Drip LCEnglish: co se stane, když se přihlásí někdo nový

Oblast: [[lcenglish]] · zdroj metody: [[email-marketing-heroes]] · související: [[resources/hele-funnel]] (nákupy přes FAPI → fapipi → Drip), [[lcenglish-art-for-english]]
Napojení: Drip i Leadpages mají konektor (Leadpages ukáže stránky, ne nastavení integrace), takže se přihlašovat nemusí. Workflow a integrace se ale upravují jen v prohlížeči.
Zmapováno 261024 přes Drip API (účet LCEnglish 2094497), jen čtení, nic se neměnilo. Texty e-mailů jsou v `GrowOS/lcenglish/brain/samples/drip-archiv/` (export 260927).

## Ve zkratce

Postavila jste to v červenci 2023 podle Email Hero Blueprintu (modul **Build Your Controller** a sekvence Getting To Know You) a podle kampaní **000 GTKY** a **008 Overture**. Je to „vlak“: každý nový člověk projde stejným uvítáním a pak ho rozcestník (Controller) pošle do „vagónu“ s představením jednoho produktu.

- **Uvítání (000 GTKY) funguje.** Ověřeno na kontaktech z února až října 2026, dostanou všechny 4 maily.
- **Funguje i větev B (Nepravidelná slovesa).** Po uvítání přijde 5 mailů 008 Overture B, ověřeno na kontaktu z 13. 10. 2026.
- **Větev A (HELE) je nedostavěná** (C postavená a zapnutá 261029: Overture C). Controller A lidi přijme a hned je pustí ven. Většina nových lidí (všechny dárky kromě Present Perfect) tak po uvítání nedostane žádné představení produktu, jen týdenní A4E.

## Cesta krok za krokem

```
Dárek (Leadpages / Drip formulář)
  → workflow „delivery: <dárek>“
       štítek freebie: …, EU_consent_how/when, mail s dárkem
       nastaví pole controller = a / b / c
       spustí „CONTROLLER START Carriage GTKY“
  → CONTROLLER START
       kdo má štítek CONTROLLER nebo IN_PRODUCT → konec (nic dalšího)
       kdo už má pole carriage_GTKY → uvítání přeskočí
       jinak: zapíše carriage_GTKY, za 1 h série 000 GTKY (4 maily, denně), po ní 24 h pauza
       podle pole controller:
         A → Controller A (HELE)        … prázdné větve, konec
         B → Controller B → Carriage B Overture → série 008 Overture B (5 mailů)
         jiné (C) → Controller C (10x ENGLISH) … prázdné větve, konec
```

Pojistky z Blueprintu, které v tom jsou:
- **Každý vagón jen jednou.** Pole `carriage_GTKY` a `carriage_B_overture` si pamatují datum. Kdo si stáhne druhý dárek, uvítání ani Overture znovu nedostane.
- **Kupující se neobtěžují.** Kdo má `Purchased: Irregular` (nebo HELE, 10x ENGLISH), z vagónu vypadne. U Overture B dostane štítek `carriage: Overture_B_purchase`.
- **Zákazník v kurzu nedostává prodejní maily.** Štítek `IN_PRODUCT` (během produktové série) uvítání zastaví. Po dokončení série „HELE inside“ nebo „Irregular product email series“ ho workflow `admin: IN_PRODUCT removal` odebere.
- Štítek `CONTROLLER` hlídá, aby člověk neběžel ve dvou vagónech najednou.

## Přihlášení k newsletteru bez dárku (od 261026)

- Stránka https://lcenglish.cz/newsletter/ (WP 7546, odkaz v patičce „Učte se se mnou“ a pruh na hlavní stránce), děkovací https://lcenglish.cz/newsletter/diky/ (WP 7547, noindex).
- Formulář Dripu **377807034** „Newsletter A4E (lcenglish.cz/newsletter)“ (vložený HTML, bez dvojího potvrzení, přesměrování na děkovací stránku, štítek `newsletter: A4E` posílá skryté pole `tags[]` v kódu na webu – při změně štítku v Dripu upravit i kód stránky).
- Workflow **`signup: newsletter A4E`** (643734995, kopie „delivery: TOP 3x25“): spouští odeslání formuláře nebo štítek `newsletter: A4E` → `EU_consent_how = newsletter: A4E`, `EU_consent_when` → mail „Váš první Art for English“ (odkaz na archiv Substacku, text v `GrowOS/lcenglish/work/email/newsletter-prihlaseni-prvni-dil.md`) → `controller = c` + CONTROLLER START (za 1 h 000 GTKY) → po uvítání vagón C.
- Ověřeno 261026 dvěma zkušebními přihlášeními (`lnk.dvorakova+newsletter@…`, `+newsletter2@…`): mail dorazil hned, souhlas, `controller`, `CONTROLLER`, štítek (u druhého, po doplnění skrytého pole).

## Který dárek kam vede

| Dárek (workflow) | Vstup | controller | Co dostane po uvítání |
|---|---|---|---|
| Anki | ⚠️ spouštěč nevyplněný | a | nic (A nedostavěno) |
| TOP 3x25 | štítek nebo Drip formulář | a | nic |
| Daily Routine | Leadpages „Daily Routine“ | a | nic |
| Neighbors | Leadpages „Neighbors“ | a | nic |
| **Present Perfect** | Drip formulář nebo Leadpages „PresentPerfect“ | **B** | **008 Overture B → Nepravidelná slovesa** |
| Shadowloop 10xE texty | ⚠️ spouštěč nevyplněný | c | nic (C nedostavěno) |
| Fall Outfit | ⚠️ spouštěč nevyplněný | c | nic |
| Stínování, Gonna Wanna, Shopping, Mugcake, Chyby rodiláků, Dovolená, 7 online tools | Leadpages, Drip formulář nebo štítek | c / C | nic |
| ChatGPT tahák, Iversen | vyskakovací formulář Dripu, akce ve formuláři (bez workflow) | C | nic |
| To be (okno 991221353 „To Be ContUp“, /to-be/) | akce ve formuláři, štítek `freebie: tobe` (ověřeno 261028) | A | nic |
| **Nepravidelná slovesa 50** (okno 778588959, /nepravidelna-slovesa/) | akce ve formuláři, štítek `freebie: irregular` (ověřeno 261028) | **B** | **008 Overture B** |

Za posledních 12 měsíců poslaly dárkové workflow 154 mailů. Nejvíc 7 online tools (82), Anki (27), Present Perfect (21), TOP 3x25 (13). Dárek nejvíc kliknutý: Anki (63 % kliknutí).

## Uvítací maily (000 GTKY, 4 maily, denně v 8:04)

1. **Učím (se) jinak:** vítání, co čekat, „varování“, že ji angličtina nadchne, a háček na zítra.
2. **Recept na angličtinu:** proti biflování, „Angličtina pro gurmány“, prosba o odpověď.
3. **To po mně nechtějte:** osobní příběh (stres z mluvení) a anketa o úrovni (6 odkazů, štítky `survey: level_A0` … `survey: teacher`).
4. **Nechte se šokovat:** „anglicky vás nenaučím, naučíte se sami“ a reference.

Odpovídá to kampani EMH 000. Maily oslovují podle pole `osloveni` a rodu ze štítku M/F.

## Představení produktu (008 Overture B, 5 mailů)

1. Je 14 dní dost? · 2. Mapa ke zvládnutí nepravidelných sloves · 3. Chybička se vloudí… · 4. Problém s učením · 5. Zpráva od Kamily

V EMH má Overture 6 mailů, každý z jiného úhlu: zasít myšlenku, proměna, zranitelnost + důvěryhodnost, popřít obecné přesvědčení, „lidé jako já“ (reference), osobní naléhavost. ⚠️ Odhad podle předmětů: vaše verze vynechala poslední mail s osobní naléhavostí.

## Ostatní automatizace

- **admin: 009 The Revival:** kdo vstoupí do segmentu „009 The Revival“ (spící kontakty), dostane 9 mailů oživovací série. Kdo žádný neotevře, je den po poslední zprávě **smazán**. Rozhoduje otevření, ne klik. EMH doporučuje kliky, **Lenka 261024 rozhodla nechat otevření**: kdo aspoň otevře, projevil zájem, a při ~100 odběratelích nechceme, aby ubývali rychle.
- **admin: Delete People who are Undeliverable or Unsubscribed:** úklid seznamu.
- **admin: EU consent – nákup HELE / 10x ENGLISH / Irregular** (261001): zápis souhlasu při nákupu, viz [[resources/hele-funnel]].
- **admin: Gender Tag to Custom Field** (2026-04), **admin: Oprava údajů** (2024).
- Šablony `Controller TEMPLATE` a `Carriage TEMPLATE` (koncepty) slouží ke stavbě dalších vagónů.
- Pozastavené: HELE EW post-webinar, webinar: post-registration, webinar: attendees, TEST, Delete not confirmed double opt-ins.

## ⚠️ Co nesedí (k rozhodnutí, nic jsem neměnila)

1. **Vagóny A (HELE) a C (10x ENGLISH) nejsou postavené.** Návrh textů Overture C (6 mailů) je na nástěnce: `GrowOS/lcenglish/work/email/drip-uvitani/overture-c-10x-english-v2.md`. Šestý mail Overture B: `…/overture-b-mail-6-v2.md`. Obě schválené 261029; od 261029 v Dripu **zapnuté**: série „008 Overture C“ (id 486091131, aktivní), „Carriage C Overture workflow“ (id 232510381, aktivní, napojený z Controller C ve větvi No pod carriage_C_overture), 6. mail B „Co v nás zkamení“ v 008 Overture B (id 12271198, publikovaný). Vagón C je tím postavený, zbývá vagón A (HELE) (staré verze bez -v2 v karanténě `GrowOS/_quarantine/2026-10-28/`). HELE chce Lenka zprovoznit taky (prodejní stránka funguje). Pro 10x ENGLISH by stačila „Overture C“: 5–6 mailů podle šablony Carriage, napojit do prázdné větve v Controller C. To je nejsilnější další krok.
2. **Uvítací mail 1 slibuje věci, které neplatí** (návrh přepisu 261024: `GrowOS/lcenglish/work/email/drip-uvitani/gtky-01-ucim-se-jinak.md`): „každý všední den posílám tipy“ (teď chodí jednou týdně A4E), YouTube a FB skupina Mluvte anglicky bez obav. Přepsat podle současnosti.
3. **Anki, Shadowloop 10xE texty a Fall Outfit nemají v Dripu spouštěč, a Anki opravdu nedoručuje (test 261024).** Lenka to chce opravit.
   - **Kde se lidé přihlašují:** stránky v Leadpages https://lenka-dvorakova.lpcontent.net/anki, `/shadowloop-texty`, `/fall-outfit` (všechny tři zkopírované 16. 6. 2026). Formulář je ve vyskakovacím okně (leadbox) na doméně lenkadvorakova.lpages.co a jmenuje se `anki`. Ostatní dárky z Leadpages mají v Dripu spouštěč „Submitted a landing page“ s názvem formuláře (např. `Shopping`). Těmto třem chybí.
   - **Test 261024 19:30:** přihlášení `Test` / `lnk.dvorakova+ankitest261024@gmail.com` přes stránku Anki v Leadpages. Okno se zavřelo, děkovací stránka nepřišla. Po 12 minutách kontakt v žádném ze tří účtů Dripu není a nedorazil ani mail. **Anki tedy teď nefunguje.** Poslední skutečný kontakt s Anki je z 12. 9. 2026.
   - **Článek lcenglish.cz/anki-navod/:** tři tlačítka „stáhnout / startovací balíček“ vedou na https://lcenglish.cz/anki-download/, a to je **404**. Neexistují ani `/shadowloop-texty/` a `/fall-outfit/` na lcenglish.cz. ⚠️ Odhad: stránky dřív vydával plugin Leadpages ve WordPressu, ale ten je na lcenglish.cz zastaralý nebo odpojený (viz [[web-lcenglish-audit-261024]]).
   - Na článku se navíc po 10 s ukazuje obecné okno Dripu z roku 2018 („Kam vám můžu přepis tohoto videa poslat?“, formulář 663641640). Do Anki nevede a žádné workflow ho nečte.
   - **Oprava (v prohlížeči, API Dripu ani konektor Leadpages to neumí):** (a) v Leadpages u leadboxu Anki zkontrolovat napojení na Drip LCEnglish; (b) v Dripu do workflow `delivery: Anki` přidat spouštěč „Submitted a landing page“ s formulářem `anki` (stejně u Shadowloop a Fall Outfit); (c) tlačítka v článku přesměrovat na stránku Leadpages, nebo ji znovu publikovat na `/anki-download/`; (d) zopakovat test. Testovací kontakt pak smaže Lenka.
4. **Kdo upravil workflow 15. 10.:** všech 35 workflow má čas úpravy 15. 10. 2026 mezi 19:04 a 00:10, postupně jedno po druhém. ⚠️ Odhad: udělal to sám Drip při aktualizaci systému. Drip ten týden rozesílal novinky „8 updates“ (zmínka ve svodce 16. 10.) a stejně se tím časem objevil nový způsob čtení workflow, který tu používám. Claude to být nemohl, konektor Dripu workflow upravovat neumí a žádné vlákno ten večer v Dripu nepracovalo (prohledáno). Historii změn workflow Drip podle mých informací neukazuje (neověřeno). Jistotu by dala jen podpora Dripu.
5. Dovolená nastaví `C`, ale čeká na `B`. Je to chyba z kopírování, prakticky neškodí.
6. Anketa o úrovni ve 3. uvítacím mailu dává štítky, ale nic podle nich dál nevětví.
7. Štítky dárků bez vlastního workflow (`freebie: chatgpt`, `predlozkovyminikurz`, `irregular`, `lce20`, `t1`–`t62`…) jsou nejspíš z pravidel (Rules) nebo starých kampaní. Pravidla API neukazuje.

## Oslovení v 5. pádě (skript, zjištěno 261024; opraveno podle Vítka 22:30)

**Správně (Vítek 261024):** oslovení dělá Python skript github.com/kokolem/jmena, který běží na serveru u fapipi každou celou hodinu (cron `0 * * * *`, Vítek 261026; dřív zde chybně „jednou denně“). Projde kontakty bez `osloveni` v obou účtech Dripu (LCE, AI lektoři), zeptá se Skloňování jmen, zapíše `osloveni` a štítek M/F. Proto se u nových kontaktů oslovení objeví až druhý den. Odstavec níže o webhooku a Apps Scriptu je překonaný: webhook 119864 oslovení nedělá.


- Pole `osloveni` (Lenko, Davide, Eliško) a štítky M/F doplňuje **skript Google Apps Script**. Drip ho volá webhookem při každém přidání štítku (`subscriber.applied_tag`, webhook 119864, založen 31. 7. 2023, adresa začíná `https://script.google.com/macros/s/AKfycbzo…/exec`). Skript se ptá služby **Skloňování jmen** (https://www.sklonovani-jmen.cz, Jan Kozák).
- Účet u služby má **Vítek** (vitek.peterk@gmail.com), on skript nejspíš postavil. Na Lenčině Disku skript není. Předplatné naposledy vypršelo 13. 4. 2025, od té doby služba běží zdarma, **10 dotazů denně**. Oslovení se doplňovalo dál (ověřeno na kontaktech do 13. 10. 2026). **⚠️ Test 261024 20:34 (Daily Routine, „Jana“): ani po 6 minutách oslovení ani štítek F nepřibyly, i když štítky přibývaly (freebie, CONTROLLER).** Skript teď nejspíš nefunguje. Odhad: od změn 15. 10. (Drip, Leadpages), nebo skript vypadl na straně Google či služby. Ověřit může jen Vítek: protokol spuštění skriptu v Apps Script a stav účtu na sklonovani-jmen.cz. Maily bez oslovení začínají „Dobrý den,“ (Liquid na to pamatuje), takže nic nespadne.
- Ceník: minimum 49 Kč, při velkých webinářích Lenka platila kolem 300 Kč ročně. Upozornění na vyčerpání kreditu chodí Vítkovi, ten je přeposílá.
- Druhý webhook v Dripu (124032) patří Automate Hero (Countdown Hero), také na přidání štítku.

## Shadowloop balíček u dárku „Texty… Shadowloop“ se nepřidá (zjištěno 261024 21:30)

- Lenka se přihlásila do Shadowloopu testovací adresou `lnk.dvorakova+shadowtest-261024@gmail.com` (dárek „Texty a nahrávky k procvičování v aplikaci Shadowloop“, mail „Naučte se mluvit... s Shadowloop“ slibuje celé texty v aplikaci). V aplikaci jsou jen základní balíčky (podstatná, přídavná jména, slovesa 3×25), balíček s texty chybí.
- Balíčky přidává Cloud Function `sale` (`…cloudfunctions.net/sale?email=…&produkt=…`, viz [[shadowloop-admin]]). Produkt `Shadowloop 10xE texty` ve Firestore existuje. U nákupů ji volá fapipi z FAPI, **u dárku ji nevolá nic**: workflow `delivery: Shadowloop 10xE texty` v Dripu ani automatizace v Leadpages volání nemají. Jak to fungovalo dřív (Jitka H. 2/2026), nevím.
- **Vyřešeno 261024 22:20 (Vítek + mail v Dripu):** Shadowloop má funkci `/freebie`. Mail „Naučte se mluvit... s Shadowloop“ (workflow `delivery: Shadowloop 10xE texty`) má u slova „aplikace“ odkaz `https://europe-central2-shadowloop-firebase.cloudfunctions.net/freebie?email={{ subscriber.email }}&freebie=Qb95FxyZvaY51QGlZ859`. Balíček se přidá, **až člověk klikne na „aplikace“**. Odkaz „Shadowloop“ v první větě vede jen na shadowloop.lcenglish.cz a balíček nepřidá.
- Kód (`kokolem/shadowloop`, `functions/index.js`, přečteno 261024): `freebie` vezme `email` a `freebie` z adresy, e-mail převede na malá písmena, přidá balíčky z `freebies/<id>` (nebo do `preregistered`) a přesměruje na https://shadowloop.lcenglish.cz/.
- ⚠️ Proč test neprošel (potvrzeno kódem, „+“ se v adrese čte jako mezera): testovací adresa má „+“ (`lnk.dvorakova+shadowtest-…`). V odkazu se e-mail vkládá bez zakódování a „+“ se v adrese změní na mezeru, takže funkce dostane jinou adresu. Skutečné adresy bez „+“ by měly projít. Druhá možnost: Lenka klikla na „Shadowloop“, ne na „aplikace“.
- **Upraveno 261024 22:28 (Lenka schválila):** v mailu oba odkazy („Shadowloop“ i „aplikace“) vedou na `/freebie?email={{ subscriber.email | url_encode }}&freebie=Qb95FxyZvaY51QGlZ859`, cizí atribut `data-saferedirecturl` smazán, ověřeno přes API. **Test 22:30** `lnk.dvorakova+shadowtest2-261024@gmail.com`: odkaz v mailu měl `%2B`, po kliknutí přesměrování na aplikaci, ve Firestore `preregistered/…shadowtest2…` 5 balíčků ✅.
- Původní úvahy (nahrazeno výše): (a) Leadpages „Custom Webhook“ (posílá data formuláře metodou POST na pevnou adresu), (b) akce Webhook ve workflow v Dripu (také POST, data kontaktu), (c) Vítek doplní do `sale` nebo do skriptu, který už dostává webhook Dripu při každém štítku, pravidlo „štítek `freebie: shadowloop10xetexty` → produkt `Shadowloop 10xE texty`“. U (a) a (b) nevím, jestli `sale` přijme data metodou POST (kód je v soukromém repozitáři `kokolem/shadowloop`). Ověřit by šlo jedním zkušebním voláním pro testovací adresu.
- Při průzkumu se v Leadpages omylem přidala vypnutá akce Custom Webhook u Shadowloopu. Je smazaná, automatizace je zase jen Email Notifications + Drip.

## Skript na oslovení: kde není (261024 20:50)

V Lenčině Apps Script (https://script.google.com/home, účet lnk.dvorakova@gmail.com) je 19 vlastních projektů a 7 sdílených. Žádný oslovení nedělá: dva „Drip to GSheets“ (31. 7. a 16. 8. 2023) jen zapisují e-mail a produkt do tabulky. V „Moje spuštění“ je za 7 dní 0 spuštění, i když Drip webhook ten den volal mnohokrát. Skript tedy běží pod jiným účtem, nejspíš Vítkovým. Test na kontaktu `lnk.dvorakova+pptest-261024@gmail.com` (Jana, Present Perfect, založen 20:44): **oslovení „Jano“ se doplnilo** (Lenka 261024 21:30). Skript tedy funguje, jen to trvá déle než pár minut.

## Uvítací mail 1 v Dripu (261024 20:25)

Nové znění bloku „V rámci tohoto dobrodružství…“ (Art for English, tipy, odpovídejte) je vložené do série 000 GTKY, HTML i prostý text, ověřeno přes API. Položka GrowOS `lcenglish/work/email/drip-uvitani/gtky-01-ucim-se-jinak.md` je ve stavu `published`.

## Dárky v Leadpages napojené zpět na Drip (261024 20:30)

Napojení přidala Claude v Chromu na Lenčin pokyn: akce „Drip: Add/Update subscriber → workflow `delivery: …`“, jméno (Jméno, First name 2) → First Name, e-mail (E-mail, E-mailová adresa, Email 2) → Email.

| Stránka v Leadpages | Workflow v Dripu | Stav |
|---|---|---|
| Anki | delivery: Anki | ✅ test 3× |
| Texty a nahrávky… Shadowloop | delivery: Shadowloop 10xE texty | ✅ test |
| Daily Routine | delivery: Daily Routine | ✅ test (Jana) |
| 7OnlineTools | delivery: 7 online tools | napojeno |
| Neighbors | delivery: Neighbors | napojeno |
| Stinovani | delivery: Stínování | napojeno |
| Shopping | delivery: Shopping | napojeno |
| Mugcake | delivery: Mugcake | napojeno |
| Present Perfect (stránka v Leadpages) | delivery: Present Perfect | napojeno |
| Fall Outfit | delivery: Fall Outfit | nová automatizace, napojeno |

Nechané být (Lenka 261024): 33 starých automatizací s vypnutým Dripem (vyskakovací formuláře, 5denní výzvy, Birthday), HELE stránky.

**stayintouch** není LCEnglish: je to přihláška „Zůstaňme v kontaktu“ pro podnikatelky v účtu Dripu **AI lektoři** (workflow 726588676 „Stay-in-touch podnikatelky“, pozastavené od 3/2024). Leadpages je napojený jen na Drip LCEnglish, proto hlásí „not in list“. Oprava znamená připojit v Leadpages druhý účet Dripu a workflow zapnout. Rozhoduje Lenka.

## Oprava Anki a Shadowloop (261024 ~20:00, Claude v Chromu, Lenka schválila)

- **Příčina:** v novém Leadpages (https://leadpages.com/dashboard → Connectors → Automations) neměl formulář Anki žádnou automatizaci do Dripu (formulář po převodu dostal nové ID `anki`, dřív `wcnBoX9sCcQTUitVm2PWBi`). Shadowloop měl jen „Email Notifications“, Drip chyběl. Leady se v Leadpages ukládaly (Leads), do Dripu nešly.
- **Oprava:** u stránky Anki nová automatizace „a form is submitted (anki) → Drip: Add/Update subscriber → workflow `delivery: Anki`“. U Shadowloopu přidaná akce Drip → workflow `delivery: Shadowloop 10xE texty`. Mapování: Jméno a First name 2 → First Name, E-mail, E-mailová adresa a Email 2 → Email. Leadpages kontakt rovnou přidá do workflow, takže spouštěč ve workflow v Dripu není potřeba.
- **Test:** `lnk.dvorakova+ankitest3-261024@gmail.com` a `+shadowtest-261024` → kontakt v Dripu se jménem, štítek, souhlas, `controller`, mail s dárkem dorazil za pár sekund ✅. Testovací kontakty v Dripu (3: ankitest2, ankitest3, shadowtest; první test „ankitest“ se do Dripu nedostal) dostanou i uvítací sérii. **Smazat je v Dripu může jen Lenka.**
- Oslovení (`osloveni`) se novým kontaktům nevyplní, maily pak začínají „Dobrý den,“ bez jména. U starších kontaktů je vyplněné, ⚠️ nevím čím (možná ručně nebo workflow „admin: Oprava údajů“).
- **Leadpages hlásí dalších 33 automatizací do Dripu s vypnutou akcí** (staré vyskakovací formuláře, 5denní výzvy, Birthday). ⚠️ I `stayintouch` má akci Drip vypnutou a míří na workflow 726588676, které v Dripu už neexistuje. Rozhodnout, co s nimi (viz návrh níže).
- Audit Logs (kdo co změnil) má Leadpages jen ve vyšším tarifu Scale. Nekupovat.

## Leadpages po převodu do nového prostředí (zjištěno 261024)

- **15. 10. 2026 20:18–20:26 převedl Leadpages 186 stránek** do nového prostředí (konektor je ukazuje s datem vzniku 15. 10.). Ten samý večer 21:04–02:10 se změnil čas úpravy u všech workflow v Dripu. ⚠️ Odhad: přepojení stránek z Leadpages do Dripu při převodu. Lenka to tušila správně.
- Dalších 18 stránek (Anki, Shadowloop texty, Fall Outfit, Shopping, Mugcake, Neighbors, Daily Routine, Stínování, Present Perfect, děkovací a odhlašovací stránky) vzniklo v novém prostředí už 16. 6. 2026.
- **Anki doručovalo i po 16. 6.** (5 mailů s dárkem do 12. 9.). Přestalo nejpozději 15. 10. Test 261024 do Dripu nedorazil vůbec.
- Mail s dárkem od 17. 6. do 24. 10.: Anki 5, TOP 3x25 4, Present Perfect 3, Gonna Wanna 2, Shadowloop 1, Stínování 1. Daily Routine, Shopping, Mugcake, Neighbors, Fall Outfit a 7 online tools za celý rok 0, tyhle stránky nikdo nenavštěvuje.
- TOP 3x25 a Present Perfect jdou přes formulář Dripu na lcenglish.cz (`/anglicky-za-tyden/`, `/predpritomny-cas/`), na Leadpages nezávisí.

**Co z převedených stránek může na něčem záležet** (zbytek jsou staré webináře 2017–2025, AI workshopy a výzvy, které nikam nevedou):
- dárky: `anki`, `shadowloop-texty`, `7onlinetools`, `stinovani`, `present-perfect`, `fall-outfit`, `shopping`, `mugcake`, `neighbors`, `daily-routine`;
- seznam a souhlasy: `newsletter-sign-up`, `postconfirm`, `unsubscribe`, `resubscribe`, `stayintouch`, `remain`, `remainlce`, `lce-ty`, `thank-you-universal-lce`, `tyuni`;
- HELE: `hele-ty`, `hele-emails`, `hele-remove`, `regwebinar`.

**Návrh postupu (rozhoduje Lenka):**
1. Opravit jen to, co je živé: Anki (je na něj článek s návodem a chodí na něj lidé z Googlu) a Shadowloop texty. V Leadpages zkontrolovat napojení na Drip, v Dripu doplnit spouštěč, test.
2. Zkontrolovat stránky seznamu (`remain`, `unsubscribe`, `resubscribe`, `stayintouch`): odkazují na ně maily, např. Revival.
3. Dárky bez návštěv (Daily Routine, Shopping, Mugcake, Neighbors, Fall Outfit, 7 online tools) nechat být, nebo zrušit, a odpojit od nich workflow.
4. Staré webinářové a AI stránky v Leadpages archivovat. Nic se tím nerozbije.
5. ~~Na webu přesměrovat `lcenglish.cz/anki-download/`~~ hotovo 261024: tlačítka v článku Anki (příspěvek 1363) a 2 odkazy v článku Shadowloop (1531) vedou na stránky v Leadpages. Kontrola všech 122 příspěvků a stránek: jiné mrtvé odkazy na dárky nejsou. Zbývá: okno „přepis videa“ je Drip formulář **„Take 52 Walk in the Woods Transcript“** (Popup Form, id 663641640, v Dripu: Forms → Embedded & Pop-up forms, ne Onsite). Za posledních 30 dní 0 zobrazení, takže ho nikdo nevidí. Lze ho deaktivovat, nic nehoří. Ve stejném seznamu jsou ale **živé** vyskakovací formuláře: „ChatGPT tahák“ (268 zobrazení / 91 odeslání), „Nepravidelná slovesa“ (83/27), „TOP 3x25“ (85/33), „Iversenova metoda - tabulka“ (23/9). U „ChatGPT tahák“ a „Iversen“ ověřeno 261024 23:00, fungují, viz oddíl níže.

## Vyskakovací formuláře ChatGPT tahák a Iversen (ověřeno 261024 23:00)

Nemají workflow „delivery“, protože všechno dělají **akce přímo ve formuláři** (Drip → Forms → formulář → Submission → Automation → „click here“, adresa `getdrip.com/2094497/forms/<id>/actions`). API Dripu tyhle akce neukazuje.

| Formulář (id, stránka) | Co se stane po odeslání |
|---|---|
| **ChatGPT tahák** (183675657, lcenglish.cz/anglicky-chatgpt/) | štítek `freebie: chatgpt`; upozornění na lenka@lcenglish.cz; `EU_consent_when` a `EU_consent_how = freebie: chatgpt`; mail „Potrénujte angličtinu s umělou inteligencí!“ s odkazem „Tady si stáhněte tahák“ (PDF „Anglicky s ChatGPT“ na Disku, odkaz funguje); `CONTROLLER START Carriage GTKY`; `controller = C` |
| **Iversenova metoda - tabulka** (148075416, lcenglish.cz/iversenova-metoda/) | štítek `freebie: iversen`; upozornění na lenka@lights-camera-english.com; souhlas jako výše; mail „Potrénujte slovíčka s Iversenovou metodou!“ s odkazem na „Iversen tabulka.pdf“ na pCloudu a na články 3-tipy-na-slovicka a slovicka-karticky (vše funguje); `CONTROLLER START`; `controller = C` |

Ověřeno i na skutečném kontaktu: ChatGPT 24. 8. 2026 (souhlas, `controller C`, uvítání GTKY za 6 minut).

Drobnosti (nic nehoří, rozhoduje Lenka):
- Oba vedou do vagónu C, takže po uvítání zatím nic nedostanou. Vyřeší to Overture C.
- Mail ChatGPT zve na Facebook (`facebook.com/LiCaEnglish`), stejně jako dřív uvítací mail 1.
- Tabulka Iversen je na pCloudu (účet s Premium). Kdyby pCloud skončil, odkaz přestane fungovat. Tahák ChatGPT je na Disku.
- Upozornění u Iversena chodí na starou adresu `lenka@lights-camera-english.com`.
- Stejným způsobem (akce ve formuláři) nejspíš fungují i ostatní vyskakovací formuláře. ⚠️ Domněnka, ověřeno jen u těchto dvou.

## Zdroj metody (EMH)

- Blueprint, modul Build Your Controller: https://member.emailmarketingheroes.com/training/build-your-controller/ (video „The Tech Bit“ + návody pro HighLevel, Keap, ActiveCampaign, ConvertKit, Kartra, Ontraport; **pro Drip návod není**, převod je váš).
- Blueprint, Your Getting To Know You Sequence a Your SCORE Email Engine: https://member.emailmarketingheroes.com/training/the-email-hero-blueprint/
- Kampaň 000 GTKY: https://member.emailmarketingheroes.com/training/fyeo-campaign-dossiers/000-the-getting-to-know-you-welcome-sequence/ (vaše kopie dokumentu na Disku: https://docs.google.com/document/d/1cabc7SJT_moksJOQ6qruZyBiXfl3ccqb1RaQAo3Feg8/edit)
- Kampaň 008 Overture: https://member.emailmarketingheroes.com/training/fyeo-campaign-dossiers/008-the-overture-campaign/ (kopie uložena 261024: https://docs.google.com/document/d/19SxkaL0okt5kmizAZTz1mvq8V1EVKzu9Fzc5VMR091Q/edit)
- Kampaň 009 Revival: https://member.emailmarketingheroes.com/training/fyeo-campaign-dossiers/009-the-revival-lol-terrible-friend-campaign/ (kopie na Disku: https://docs.google.com/document/d/1fDFVroEmgCFE2f7iP8RbR89QlVESBY5umDb7e-jgCwE/edit)


## Patička a odhlášení (ověřeno 261024)

- **Patička je česky** a odkaz na odhlášení je v textu jako slovo „odhlásit“: „Aaaaa.... pokud jste zapomněli, proč vám píše jakási Lenka Dvořáková, … můžete se z odběru úplně odhlásit.“ Ověřeno na náhledu A4E #27 (broadcast 919204975, https://www.getdrip.com/broadcasts/919204975/2cd4daad3ee0f0ac7198b). Upravovat netřeba.
- **Kam odkaz vede:** vždy na stránku Dripu (povinné). V Settings → Email Setup → Unsubscribe Links jsou dvě volby: stránka správy odběru (odhlásit vše, jednotlivé série, témata) nebo potvrzovací stránka (jedno potvrzení = odhlášení ze všeho, s logem z Brand Assets). Kterou má účet nastavenou, jsem neviděla (API to neukazuje). Počeštit Dripovu stránku podle nápovědy asi nejde (domněnka).
- **Nápad na později (Lenka 261024: zatím neřešit):** vlastní stránka „vyberte si, co chcete dostávat“ (Leadpages + Onsite formulář Dripu, frekvence a témata, lidské slovo místo generické stránky) a odkaz na ni v patičce vedle povinného odhlášení. Dává smysl, až bude víc druhů mailů (A4E zvlášť, kurzy zvlášť). Postup Dripu: https://help.drip.com/hc/en-us/articles/15665192692493-Create-a-Subscription-Management-Form-with-Onsite . Další podrobnosti a zdroje v [[kontext-ukolu#Odhlašovací stránka Drip]].
