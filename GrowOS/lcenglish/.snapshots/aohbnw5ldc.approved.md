---
type: product-page
headline: Anglické věty, které vám půjdou z pusy samy
project: shadowloop-admin
source: resources/shadowloop-admin.md
note: ""
status: approved
business: lcenglish
channel: pages
created: 2026-10-29
skill: landing-page-write
arc: product-page default (app-first)
id: aohbnw5ldc
kanban_order: V0
---

# Shadowloop: stránka aplikace a podklady k ověření značky u Googlu (verze 2, 261029)

**Proč:** aby Google při přihlášení psal „Pokračovat do aplikace **Shadowloop**“ (teď „lcenglish.cz“), chce ověřit značku. Potřebuje veřejnou stránku o aplikaci na ověřené doméně (lcenglish.cz je v Search Console ověřená) a zásady ochrany osobních údajů, které říkají, co aplikace z účtu Google bere. Detail [[shadowloop-admin]].

**Verze 2 (Lenka 261029 18:17):** „udělej tu stránku hezčí než jenom takhle basic, využij informací, které už jsou na blogu, ať ta stránka trochu prodává“. Podklady: [/10x-english/](https://lcenglish.cz/10x-english/) (příběh vzniku aplikace, jak se trénuje), [/irregular/](https://lcenglish.cz/irregular/) a [/hele/](https://lcenglish.cz/hele/) (co Shadowloop v kurzu dělá), článek [/stinovani/](https://lcenglish.cz/stinovani/) (metoda, tlumočník), `brain/methodology.md` (jak aplikace funguje), `brain/proof/` (citace doslova).

**Prodávat smí, ale aplikace musí být hlavní** (doporučení k posouzení Googlem): Google u domovské stránky kontroluje, že je veřejná, na ověřené doméně, nese stejný název jako aplikace, jasně popisuje, co aplikace dělá, a odkazuje na zásady ochrany osobních údajů. Prodejní prvky nevadí. Riziko by byla stránka, která je hlavně prodejní stránkou kurzu a aplikaci zmíní jen okrajově: posuzovatel pak nepozná, že je to domovská stránka Shadowloopu. Proto stavba „aplikace napřed, kurzy jako cesta k balíčkům“, název Shadowloop v titulku i v prvním odstavci a oddíl „Co o vás aplikace ví“ s odkazem na zásady. (Podle pravidel Googlu pro ověření značky, jak je znám; jejich aktuální znění jsem dnes neotevíral.)

**Jedna akce:** vyzkoušet Shadowloop zdarma (dárek 5 krátkých textů, ty se studentovi objeví v aplikaci). Vedlejší odkaz pro stávající studenty: otevřít aplikaci.

**Verze 3 (Lenka 261029 19:28, úpravy přímo v textu + poznámka v závěru):** balíčky 3x25 nejčastějších slov jsou v aplikaci pro všechny a bez přihlášení (ověřeno v kódu `DecksList.jsx`: veřejné balíčky se načítají bez přihlášení), hodí se pro úplné začátečníky; dárek 5 textů slouží k získání e-mailu a je na různých úrovních. Proto: hlavní tlačítko dál dárek (e-mail), začátečníky stránka posílá rovnou do aplikace (úvod pod tlačítkem, karta v oddílu 5, otázky, závěr). Typografie v Lenčiných větách: „v Shadowloop“ → „v Shadowloopu“, „příběh: Věty“ → „příběh: věty“.

**Titulek:** „Anglické věty, které vám půjdou z pusy samy“. Další 4 možnosti a celé hodnocení: `_shadowloop-stranka-a-zasady/headlines.md`.

---

# A. Stránka lcenglish.cz/shadowloop/ (WordPress, editor bloků)

Titulek stránky v prohlížeči (SEO): **Shadowloop: aplikace na trénink mluvení anglicky | LCEnglish**
Adresa: `https://lcenglish.cz/shadowloop/`

Vzhled celé stránky: jako `/10x-english-cho/` – nadpisy DM Serif Display, text Karla, pozadí papír, tlačítka červená z loga (#D1003A), jedna tmavá plocha (inkoust) nahoře, zlatá jen jako fixa pod klíčovým slovem. Žádná modrá ani růžová (`brain/brand.md`).

## Section 1: Úvod
**Headline:** Anglické věty, které vám půjdou z pusy samy
**Body:**
**Shadowloop** je aplikace na trénink mluvení. Uslyšíte anglickou větu, uvidíte ji napsanou i s českým překladem a v pauze ji zopakujete nahlas. Pak další. A znovu. Až vám to začne jít samo.

Funguje v prohlížeči na mobilu i na počítači. Nic neinstalujete.

[Tlačítko] **Chci vyzkoušet 5 textů zdarma** → https://lenka-dvorakova.lpcontent.net/shadowloop-texty
Malým písmem pod tlačítkem: Začínáte úplně od nuly, nebo už máte kurz? [Otevřít Shadowloop →](https://shadowloop.lcenglish.cz)

[IMAGE: snímek obrazovky Shadowloopu v telefonu – věta „The best way to learn English is to watch LCE“ s českým překladem, posuvník a přepínače Anglicky / Česky; existující obrázek z prodejní stránky 10x ENGLISH (Leadpages asset th2hwio6tt6lb623j29pq8vs), nebo nový snímek v aktuálním vzhledu]
**Addresses objection:** structural – none (co to je, pro koho, co udělat)
**Visual:** hero-dark
**Weight:** anchor
**Layout notes:** dva sloupce na počítači: vlevo nadpis, text a tlačítko, vpravo telefon se snímkem; na mobilu nejdřív nadpis a tlačítko, pod nimi telefon. Tmavé pozadí (inkoust), „z pusy samy“ zvýraznit zlatou.

## Section 2: Proč jsem ho postavila
**Headline:** Nejvíc času mi nezabíralo učení, ale hledání
**Body:**
Učím se japonsky. A materiály si chystám podle metody, o které vím, že funguje – stínování. Brzy jsem zjistila, kde je háček: najít texty a nahrávky, zpracovat je, nahrát do nějaké aplikace… Než se člověk skutečně začne učit, musí udělat několik kroků. A právě na nich nejčastěji ztroskotá.

Proto jsem postavila Shadowloop. Věty v něm najdete nachystané a namluvené. Nic nehledáte, nic nezpracováváte. Otevřete aplikaci a trénujete.

*– Lenka Dvořáková*
**Addresses objection:** pochybnost, že to bude zase jen další kurz (Lenka sama ví, kde se učení zasekává)
**Visual:** pull-quote
**Weight:** standard
**Layout notes:** jeden úzký sloupec na papíru, první věta druhého odstavce velkým písmem DM Serif Display jako citát, malá fotka Lenky vedle podpisu, pokud je po ruce.

## Section 3: Jak se v Shadowloopu trénuje
**Headline:** Poslechnout, zopakovat, znovu
**Body:**
1. **Věta zazní třikrát.** Mezi opakováními je pauza a v ní větu nahlas zopakujete po mluvčím.
2. **Tempo určujete vy.** Délku pauzy si nastavíte podle sebe.
3. **Text, jak se vám hodí.** Anglicky, česky, obojí – nebo ho schováte úplně a jen posloucháte. Hned poznáte, jestli už rozumíte bez nápovědy.
4. **Těžká věta? Smyčka.** Tlačítkem se dvěma šipkami si ji pustíte pořád dokola, dokud nesedí.

Některé balíčky v Shadowloopu vyprávějí krátký příběh: věty se pak přehrávají v pevném pořadí, aby dávaly smysl. Při tréninku slovní zásoby a gramatiky se věty pokaždé zamíchají, aby si žádná nepřipadala zanedbávaná (a vy se nenaučili jen ty první).

[IMAGE: detail přehrávače Shadowloopu – spodní tmavý panel s posuvníkem pauzy, přepínači Anglicky / Česky a tlačítkem smyčky, s krátkými popisky šipkami]
**Addresses objection:** „aplikace jen drilují“ – tady je vidět, že tempo i nápovědu řídí student
**Visual:** product-in-action mock
**Weight:** anchor
**Layout notes:** na počítači vlevo očíslované kroky, vpravo snímek s popisky; na mobilu kroky pod sebou a snímek mezi krokem 2 a 3. Světlé pozadí.

## Section 4: Proč nahlas
**Headline:** Jako tlumočník, jen bez překládání
**Body:**
Víte, jak pracuje simultánní tlumočník? Ve sluchátkách slyší řečníka a s malým zpožděním mluví sám. Stínování (anglicky *shadowing*) funguje podobně, jen nic nepřekládáte: posloucháte a hned po mluvčím opakujete.

Co tím trénujete:
- **Plynulost** – mluvíte bez nepřirozených pauz.
- **Výslovnost a intonaci** – nasajete rytmus rodilých mluvčích.
- **Slovíčka a gramatiku** – nenápadně, bez biflování.

Nemusíte být pokročilí. Stínovat jde i na úrovni, kdy ještě zdaleka plynule nemluvíte.

Víc o metodě: [Stínování: jak natrénovat správnou anglickou výslovnost](https://lcenglish.cz/stinovani/)
**Addresses objection:** „na to nemám úroveň“
**Visual:** card grid
**Weight:** standard
**Layout notes:** úvodní odstavec přes celou šířku, pod ním tři karty vedle sebe (na mobilu pod sebou), každá s malou ikonkou v červené z loga. Pozadí papír tmavší.

[Tlačítko uprostřed pod kartami] **Vyzkoušet zdarma** → https://lenka-dvorakova.lpcontent.net/shadowloop-texty

## Section 5: Co v Shadowloopu najdete
**Headline:** Balíčky vět ke každému kurzu
**Body:**
Shadowloop je aplikace, kterou využívají všechny moje kurzy. Materiály máte v aplikaci nachystané hned po zaplacení.

- **[10x ENGLISH](https://lcenglish.cz/10x-english/)** – dialogy ze skutečného života: ztracené klíče, zmeškaný hovor, pracovní pohovor. Pro mírně pokročilé až pokročilé.
- **[Angličtina s příběhem (HELE)](https://lcenglish.cz/hele/)** – věty z příběhu, který vás vtáhne. Krátká opakovací cvičení na každý den.
- **[Nepravidelná slovesa](https://lcenglish.cz/irregular/)** za 14 dní – věty, se kterými se slovesa ve vaší hlavě zabydlí natrvalo, stačí postupovat podle návodu.
- **Zdarma pro každého** – balíčky [3x25 nejčastějších anglických slov](https://shadowloop.lcenglish.cz) (podstatná jména, přídavná jména, slovesa). Jsou v aplikaci pořád a pro všechny, bez přihlášení. Jednoduchá slovíčka, ideální, když začínáte úplně od nuly.
- **Dárek** – [5 krátkých textů](https://lenka-dvorakova.lpcontent.net/shadowloop-texty) na různých úrovních pokročilosti, ať si Shadowloop vyzkoušíte, ať umíte anglicky, kolik umíte.

[IMAGE: obálky tří kurzů (10x ENGLISH, HELE, Nepravidelná slovesa) v jednotném vzhledu, nebo tři snímky balíčků z přehledu v Shadowloopu]
**Addresses objection:** „co přesně v aplikaci dostanu“
**Visual:** card grid
**Weight:** standard
**Layout notes:** pět karet: tři kurzy v řadě, pod nimi dvě širší karty „Zdarma pro každého“ (odkaz rovnou do aplikace) a „Dárek“ (odkaz na dárek), obě odlišené zlatou fixou; na mobilu vše pod sebou. Celá karta klikatelná.

## Section 6: Co říkají studenti
**Headline:** Do hlavy, uší i pusy
**Body:**
„Jako vždy si cením Vašeho nadšení a nápadů, jak si s angličtinou hrajete a jak se mi ji snažíte nacpat do hlavy, uší, pusy.“
*– Kamila, Nepravidelná slovesa*

„Za měsíc mi kurzy pomohly naučit se lépe rozumět mluvené angličtině a dodat si odvahu a začít mluvit.“
*– Romana, 10x ENGLISH*

„mám 77 let a snažím se učit angličtinu na internetu a tudíž mohu posoudit, co se mi líbí. A ten váš přístup k učení se mi líbil mooc.“
*– Hanka, Angličtina s příběhem*

**Addresses objection:** věk („Není už na to pozdě?“) a pochybnost, jestli to bude jiné
**Visual:** testimonial cards
**Weight:** standard
**Layout notes:** tři karty vedle sebe (na mobilu pod sebou), uvozovky ve zlaté, jméno a kurz šedým textem. Citace doslova podle `brain/proof/` (kamila-brachova, romana-svobodova, hanka-hele-77-let), nic neupravovat. Kamila a Romana jen křestním jménem (`use: first-name-or-anonymous`); Hanka smí celým jménem, ale pro jednotnost taky křestním.

[Tlačítko pod kartami] **Chci vyzkoušet 5 textů zdarma** → https://lenka-dvorakova.lpcontent.net/shadowloop-texty

## Section 7: Časté otázky
**Headline:** Časté otázky
**Body:**
**Musím něco instalovat?**
Ne. Shadowloop běží v počítači i telefonu na adrese [shadowloop.lcenglish.cz](https://shadowloop.lcenglish.cz). V telefonu si ho můžete přidat na plochu jako ikonu a otevírat jako běžnou aplikaci.

**Jak se přihlásím?**
E-mailem a heslem, nebo účtem Google. Použijte stejný e-mail, se kterým jste si koupili kurz – podle něj aplikace pozná, které balíčky jsou vaše.

**Kolik to stojí?**
Aplikace je součástí kurzů, nic se za ni neplatí zvlášť. Balíčky 3x25 nejčastějších slov jsou zdarma pro každého, i bez přihlášení.

**Má smysl to ještě zkoušet? Není už pro mě pozdě?**
Není. Stínování stojí na poslechu a opakování po mluvčím. A to funguje v každém věku.

**Musím umět dobře anglicky, abych mohl Shadowloop používat?**
Nemusíte. Začnete na úrovni, která vám sedí, a pomůže vám český překlad a pauza tak dlouhá, jak potřebujete. Pokud začínáte úplně od nuly, pusťte si nejdřív balíčky 3x25 nejčastějších slov.
**Addresses objection:** věk, úroveň, technika, cena
**Visual:** FAQ accordion
**Weight:** standard
**Layout notes:** jeden sloupec, otázky sbalené, první rozbalená. Světlé pozadí.

## Section 8: Co o vás aplikace ví
**Headline:** Co o vás Shadowloop ví
**Body:**
Při přihlášení si aplikace uloží vaše jméno a e-mailovou adresu, aby věděla, které balíčky jsou vaše. Když se přihlásíte účtem Google, dostane od Googlu jen tyhle údaje a identifikátor účtu. K vašim kontaktům, souborům ani poště přístup nemá.

Údaje slouží jen k přihlášení a k tomu, aby vám aplikace ukázala vaše balíčky. Nepoužívám je k reklamě a nikomu je neprodávám. Podrobnosti najdete v [zásadách ochrany osobních údajů](https://lcenglish.cz/privacy-policy/), oddíl Aplikace Shadowloop.

Máte otázku? Napište mi na [lenka@lcenglish.cz](mailto:lenka@lcenglish.cz).
**Addresses objection:** „co dělá s mým účtem Google“ (a požadavek Googlu na ověření značky)
**Visual:** plain text
**Weight:** standard
**Layout notes:** úzký sloupec, malá ikonka zámku v červené z loga u nadpisu. Odkaz na zásady musí být viditelný a klikatelný, ne schovaný v patičce.

## Section 9: Závěr
**Headline:** Zkuste první větu ještě dnes
**Body:**
Pošlu vám zdarma 5 krátkých textů na různých úrovních pokročilosti. Najdete je rovnou v Shadowloopu – stačí poslouchat a opakovat.

[Tlačítko] **Chci vyzkoušet 5 textů zdarma** → https://lenka-dvorakova.lpcontent.net/shadowloop-texty
Malým písmem: Začínáte úplně od nuly? Balíčky 3x25 nejčastějších slov si [pusťte rovnou](https://shadowloop.lcenglish.cz), bez přihlášení. Už máte kurz? [Otevřít Shadowloop →](https://shadowloop.lcenglish.cz)
**Addresses objection:** structural – none
**Visual:** hero-dark
**Weight:** anchor
**Layout notes:** krátký tmavý pás (inkoust) přes celou šířku, text na střed, tlačítko červené. Pod ním běžná patička webu s odkazy Ochrana osobních údajů a Obchodní podmínky.

---

## Roll-upy pro stavbu

**Skimmable Story** (jen nadpisy, shora dolů):
1. Anglické věty, které vám půjdou z pusy samy
2. Nejvíc času mi nezabíralo učení, ale hledání
3. Poslechnout, zopakovat, znovu
4. Jako tlumočník, jen bez překládání
5. Balíčky vět ke každému kurzu
6. Do hlavy, uší i pusy
7. Časté otázky
8. Co o vás Shadowloop ví
9. Zkuste první větu ještě dnes

**CTA Map:**

| Pozice | Text | V jakém stavu je čtenář |
|---|---|---|
| Úvod | Chci vyzkoušet 5 textů zdarma (+ Otevřít Shadowloop) | ví, co aplikace dělá; student rovnou odchází do aplikace |
| Pod „Proč nahlas“ | Vyzkoušet zdarma | chápe metodu a že na ni má úroveň |
| Pod referencemi | Chci vyzkoušet 5 textů zdarma | vidí, že to pomohlo lidem jako on |
| Závěr | Chci vyzkoušet 5 textů zdarma (+ Otevřít Shadowloop) | má odpovězené otázky i jistotu ohledně údajů |

**Objection Coverage** (podle `brain/audience.md`):

| Námitka | Kde |
|---|---|
| Věk jako překážka | 6 (Hanka, 77 let), 7 („Není už na to pozdě?“) |
| Pochybnost, že to bude jiné než dřív | 2 (proč aplikace vznikla), 3 (jak se trénuje), 6 |
| Aplikace jen drilují, nevysvětlují | 3 (tempo a nápověda), 4 (proč nahlas, odkaz na článek) |
| Nemám úroveň | 4, 7 |
| Co dělá s mým účtem Google | 8 |
| Začínám úplně od nuly | 1 (odkaz pod tlačítkem), 5 (3x25 zdarma), 7, 9 |

**Friction self-check (261029):**
- CLARITY ABOVE THE FOLD – pass: název, co dělá, pro koho, tlačítko i snímek v úvodu. Reference až v 6, protože o samotné aplikaci žádná citace v `brain/proof/` není.
- ONE ACTION – pass: všude „vyzkoušet zdarma“; „Otevřít Shadowloop“ jen malým písmem pro stávající studenty.
- PROOF NEAR CLAIMS – pass s výhradou: tvrzení o metodě opřené o článek a zkušenost; ⚠️ citace jsou o kurzech, ne výslovně o aplikaci (proto u nich název kurzu).
- OBJECTION COVERAGE – pass (tabulka výše).
- CTA RHYTHM – pass: tlačítko v 1, 4, 6, 9.
- MOBILE-ORDER SANITY – pass: z nadpisů je jasné co, jak, proč, pro koho a co dál.
- Opraveno: odebrány měnící se počty (100 dialogů, 3 balíčky, 200 balíčků), podle pravidla stálých míst ve `voice.md`.

**Editor gate:** agent `reviewer` není v tomto prostředí k dispozici, proto proběhla kontrola ve vláknu podle `humanize/rulebook/tells.md`. Skript `ai-tells.js` (kanál landing, jen text stránky bez značek): skóre 3/100; nález E24 = tučné popisky otázek a kroků (formát, ne tell). Čtivost „grade 7“ nad stropem 6 platí pro angličtinu, u českého textu rozhoduje `voice.md`. Ručně: druhé „ne X, ale Y“ (ve FAQ) přepsáno; citace beze změny proti `brain/proof/`; žádný vymyšlený údaj.

---

# B. Doplnění zásad lcenglish.cz/privacy-policy/

Lenka 261029: nejde o změnu zásad, jen o lepší formulaci; uživatelům to oznámí později v e-mailu o vylepšeních Shadowloopu (úkol v [[next-actions]]).

**B1. Do článku I. odst. 4 (seznam zpracovatelů) přidat řádek:**

> – společnost Google (služba Firebase), která provozuje aplikaci Shadowloop a přihlášení účtem Google;

**B2. Nový článek před „Závěrečná ustanovení“** (ta se přečíslují z V. na VI.):

> **V. APLIKACE SHADOWLOOP**
> 1. Provozovatelka provozuje aplikaci Shadowloop na adrese shadowloop.lcenglish.cz, ve které uživatelé trénují mluvení s balíčky vět ze zakoupených kurzů.
> 2. Do aplikace se uživatel přihlásí e-mailem a heslem, nebo účtem Google. Při přihlášení účtem Google získá provozovatelka od společnosti Google jen jméno, e-mailovou adresu a identifikátor účtu. Jiné údaje z účtu Google (kontakty, soubory, poštu apod.) aplikace nezískává.
> 3. Tyto údaje spolu se seznamem balíčků, ke kterým má uživatel přístup, slouží jen k tomu, aby se uživatel mohl přihlásit a aby mu aplikace zpřístupnila zakoupené balíčky. Provozovatelka je nepoužívá k marketingu, neprodává je a nepředává je dalším osobám, s výjimkou společnosti Google, která aplikaci technicky provozuje (služba Firebase).
> 4. Údaje se uchovávají po dobu, kdy má uživatel v aplikaci účet. Uživatel může kdykoli požádat o zrušení účtu a výmaz údajů na adrese info@lenkadvorakova.cz.

# C. Google Auth Platform → Branding

Vyplněno a uloženo 261029 18:25 (Lenka: „email změň“):
- App name: Shadowloop (beze změny)
- User support email: `lnk.dvorakova@gmail.com` (dřív `vitek.peterk@gmail.com`; Vítek zůstává vlastníkem projektu, ověřeno v IAM: oba `roles/owner`)
- Application home page: https://lcenglish.cz/shadowloop/ (stránka zatím neexistuje)
- Privacy policy: https://lcenglish.cz/privacy-policy/
- Terms of service: https://lcenglish.cz/obchodni-podminky/
- Authorized domains: lcenglish.cz, shadowloop-firebase.firebaseapp.com (už byly)
- Developer contact: lnk.dvorakova@gmail.com
- Logo: bez loga (s logem přísnější kontrola)
- **„Verify branding“ zatím nestisknuto.** Až po zveřejnění stránky A a doplnění zásad B.
