# Methodology

## Our way of doing it, in steps
Jak vzniká jeden díl Art for English (dnešní podoba — bez Remotion, bez carouselu):

1. **Rekapitulace a odsouhlasení PŘED jakoukoli prací.** Když Lenka řekne „Art for English #NN": otevřít `brain/research/art-bites-curriculum-2026.md`, zrekapitulovat jí datum odeslání, gramatický/slovní bod, plánované dílo a umělce, poznámku z curricula. Explicitně se zeptat, jestli to sedí — hlavně jestli dílo funguje jako obrázek do newsletteru (ne moc široké/úzké, dobře ořezatelné, dohledatelná public-domain reprodukce) a jestli gramatika k dílu sedí, nebo se natahuje. Nezačínat research ani psaní, dokud Lenka neodsouhlasí.
2. **Založit složku podkladů** `library/episodes/NN-umelec/` a `brief.md`: číslo, kód (AB + číslo), obraz, umělec, rok, instituce, gramatický cíl, 3 kanonické věty (i placeholder), sekce Media s cestami.
3. **Připravit obsah:** ověřená fakta o díle/umělci (s odkazy na zdroje, nikdy nevymýšlet), 3 kanonické anglické věty s gramatickým cílem + zvýrazněnou částí + český překlad, gramatický vzorec + jednořádková poznámka, real-life hook z Lenčina života (pokud chybí, nevymýšlet — nechat otevřený bod). Finální věty zapsat do `_brief.md` jako zdroj pravdy.
4. **Stáhnout obraz** z Wikimedia Commons / Rijksmuseum / National Gallery / Met — vždy public domain, vysoké rozlišení. Uložit **do složky epizody** `library/episodes/NN-umelec/` jako `jmeno-umelce-nazev-rok.jpg` (malá písmena, pomlčky, bez diakritiky) — jediné místo pro obrazy epizod (od 2026-10-05; `brain/assets/paintings/` zrušeno). Krok se dělá hned při přípravě briefu, ne až na vyžádání. Obraz, který se nakonec nepoužije (vyřazený původní plán, alternativa), se přesouvá do `library/episodes/_nepouzite-obrazy/`. Zapsat cestu, zdroj a licenci do `_brief.md`.
5. **Napsat výstupy jako položky fronty GrowOS (jednotný postup od 2026-10-19, rozhodnutí Lenky — žádné výjimky):** podklady (`brief.md`, obraz, thumbnail) zůstávají v `library/episodes/NN-umelec/`; každý výstup je work item: newsletter `work/email/NN-umelec/newsletter.md` (`type: newsletter`), zrcadlo na Substack `work/articles/NN-umelec/substack.md` (`type: article`, pravidla 6b) a FB upoutávka `work/social/NN-umelec/facebook-*.md` (`type: social-post`, pravidla 6c). Hned po založení zkontrolovat, že hlavička má `id` a `status: draft` (razítko hlídače; bez něj fronta položku nevidí — sezení musí běžet ve složce `GrowOS`, žádné `cd` do podsložek). Před předáním k review lokální commit Claudovy verze (pro porovnání úprav). Carousel a video jen na výslovné vyžádání.
6. **Review a schválení:** Claude posune položku `draft → review` a **ukáže text Lence v chatu** s odkazem na nástěnku `gtd/GrowOS fronta.base` (u FB upoutávky 2–3 varianty úvodu). Lenka upraví (Obsidian, chat, nebo přímo v Dripu — pak Claude úpravy přenese zpět do položky přes `get_broadcast`) a schválí: přetažením karty do `approved` nebo slovem v chatu. Žádosti o změnu = `changes` (Lenčina poznámka v poli `note`), Claude opraví a vrátí do `review`. **Nic nejde do Dripu, na Substack ani do Metricoolu, dokud položka není `approved`** — ani jako koncept.
6a. **Po schválení:** Drip = duplikát minulé epizody v Chromu (Text Builder, segment Newsletter; nikdy MCP `create_broadcast`, viz lekce 0.1, Drip), Substack draft přes Chrome (postup v lekcích), FB koncept v Metricoolu (Tady Lenka). Plánuje a zveřejňuje Lenka, čas volí ona. Jakmile výstup skutečně vyjde, Claude ho ověří a posune `approved → published`. Pak zaznamenat epizodu do curricula (✅), aktualizovat projekt (Vydané díly, next-action advancement, Aktuální stav).
6b. **Zrcadlo na Substack — povinný krok uzavření každé epizody** (od 2026-09-28): epizoda je uzavřená až po zveřejnění na Substacku. Připravit verzi pro Substack (položka fronty, krok 5) z textu newsletteru — bez pozdravu a podpisu (žádné „Dobrý den“, „Zdraví L.“ ani snippet — text začíná první větou s velkým písmenem), rodové Liquid tvary → plurál, jinak beze změn. Titulek = subject, podtitulek **bez čísla dílu** (Substack začal až od #24, čísla by se pletla s LCEnglish). Obrázek na Substacku nejde prolinkovat — proklik z Dripu se vynechává. Tlačítko odběru může zůstat anglicky. **Výzvy k odpovědi** („napište mi“, „odpovězte“) převést na výzvu ke komentářům („napište do komentářů“) — platí od 260928 pro nové díly; už připravené archivní drafty se zpětně nemění. Výstup `substack.md` + `substack.html` (ke zkopírování s kurzívou). Publikuje Lenka.
6c. **Upoutávka na Facebook (Tady Lenka)** (od 2026-10-14; ověřeno pilotem na #25 a #26, rozhodnutí Lenky 2026-10-05): po 6b připravit z hotové epizody jeden příspěvek na FB stránku Tady Lenka (`work/social/NN-umelec/facebook-*.md`, skill `social-write`, intent story). Jen s přesahem umění + angličtina, obraz i jazyk dohromady; čistě angličtinářské příspěvky patří na IG LCEnglish, kde se zatím nezačíná. Poučení z `brain/lessons/261005-fb-upoutavka.md`: jiný úvod než článek, bez názvu série, nové věty v Lenčině hlase, bez efektních zvratů, bez markdown kurzívy (uvozovky), odkaz na Substack jen v prvním komentáři. **Postup jako u všech výstupů (kroky 5–6a):** varianty úvodu ve frontě, Lenka vybírá a schvaluje, teprve potom Metricool. Čas zveřejnění volí Lenka podle Metricoolu (nejlepší čas pro publikum, u #27 12:30), Claude navrhne, ale nerozhoduje. V Metricoolu se schválený příspěvek uloží jako koncept s obrázkem (Canva thumbnail) a odkazem na Substack v prvním komentáři; plánuje a zveřejňuje Lenka. Po zveřejnění ověřit, že příspěvek skutečně vyšel (čekání ve vault `gtd/waiting-for.md`). Upoutávka epizodu neuzavírá (uzavřená je podle 6b); když nestačí čas, odkládá se upoutávka, ne epizoda ani reklama.
7. **Do hlasového korpusu** (`brain/samples/`) kopírovat finální text **až po stavu `published`** — ne dřív. Rozhodnuto 2026-09-14: zabraňuje to zanesení nedokončených verzí do korpusu, ze kterého se čerpá hlas.

~~Vědomá výjimka z 2026-09-14 (newsletter mimo frontu)~~ **zrušena 2026-10-19** (Lenka): jeden postup pro všechny výstupy, ať se nemusí pamatovat, co má výjimku. Starý stav platí jen pro epizody #1–27 v `library/episodes/`.
8. **Po schválení (approved)** porovnat Claudovu verzi z commitu se schválenou a odvodit generalizovatelné lekce (ne jednorázové tvůrčí volby) do `brain/lessons/0.1-lessons.md`, sekce Email/Newsletter (FB upoutávka: `brain/lessons/261005-fb-upoutavka.md`). Claudova verze zůstává jen v historii Gitu; v položce je vždy aktuální text.

Thumbnail dělá Lenka sama v Canvě — Claude připraví jen text pro Canvu (vždy anglicky). Hotový `nl-thumb.png` Lenka ukládá do složky epizody (`library/episodes/NN-umelec/nl-thumb.png`) — stejné jméno u každé epizody, protože identitu nese cesta. (Konvence od 260914; dřív u #1–2 šel do sdíleného `brain/assets/paintings/`, u #3–21 se neukládal vůbec.)
```
FULL ARTIST NAME IN CAPS: TITLE OF WORK IN CAPS
year, Gallery Name, City, Country
```
plus řádek `Pill (gramatický cíl): gramatika`.

Detailní checklisty (tvorba epizody, týdenní checklist) jsou v `library/process/`.

## What we call things
- **Art for English – Umění mluvit** — série: 1 obraz · 5 minut · pár frází + 1 gramatický bod + mluvní úkol (60 s). Úroveň A2–B1.
- **grammar-first** — přístup série: nejdřív jazykový cíl týdne, pak se k němu vybere dílo. Zaručuje variabilitu a progresi.
- **kanonické věty** — 3 anglické věty s gramatickým cílem, které jsou zdrojem pravdy pro celou epizodu (v `_brief.md`).
- **anglické jednohubky** — interní název emailového newsletteru LCEnglish.
- **shadowing** — metoda 10x ENGLISH: poslech a souběžné opakování dialogu, plná rychlost i 80 % tempo, integrace se Shadowloop appem.
- **HELE** — interní název vlajkového kurzu „Angličtina s příběhem".

## Shadowloop — jak appka skutečně funguje (napříč kurzy)

Zatím to bylo popsané jen v admin/technickém `resources/shadowloop-admin.md` (jak přiřadit balíček uživateli) a v uživatelském návodu na Disku (`3 LCEnglish/Products/Shadowloop/SHADOWLOOP návod.pdf`). Tady je to jako framing napříč kurzy — používá HELE, 10x ENGLISH i Nepravidelná slovesa, je to průřezový differentiator (potvrzeno 2026-09-14 v `brain/business.md`).

**Co appka dělá:**
- Progresivní webová appka (`shadowloop.lcenglish.cz`) — funguje z prohlížeče na počítači i mobilu, žádný app store. Jde přidat jako ikonu na plochu telefonu (Android i iPhone).
- Student se přihlásí stejným emailem, jakým koupil kurz, a vidí jen balíčky, ke kterým má přístup.
- Balíček = sada frází/vět. Každá se přehraje **3×** s pauzou mezi opakováními — v té pauze student frázi nahlas zopakuje (shadowing). Délka pauzy je nastavitelná.
- Text jde zobrazit anglicky, česky, oboje, nebo schovat úplně (test porozumění bez nápovědy).
- Tlačítko se dvěma šipkami pustí frázi ve smyčce, když je obzvlášť těžká.
- Dva typy balíčků: **nezávislé fráze** — pořadí se při každém spuštění zamíchá, aby žádná fráze nezůstala "sirotkem" bez procvičení; **balíček s příběhem** — pořadí zůstává pevné, aby dávalo smysl.

**Proč to je framing hodnota, ne jen technický detail:** appka řeší přesně to, co studentům chybí — aktivní opakování nahlas (ne pasivní poslech), v jejich vlastním tempu, kdykoli a kdekoli. Je to mechanismus za slibem "porozumíte mluvené angličtině a rozmluvíte se", ne jen bonus navíc.

**Zatím nevybudováno:** jednotný, opakovaně použitelný text/vizuál vysvětlující Shadowloop zákazníkovi (na sales page, v kurzu, v onboardingu) — dosud se to zmiňuje jen letmo ("přidejte si materiály do appky Shadowloop"), bez vysvětlení mechanismu. Příležitost pro standardní blok, který se vloží do všech prodejních stránek stejně.

## What we believe that others do not
- Gramatická tabulka se zapomene přes noc; příběh z obrazu (a jazyk v něm) zůstane. Vizuální a příběhový kontext > izolované cvičení.
- Streak není pokrok. Dva roky denně na aplikaci ≠ umět si objednat kafe.
- Pokrok v jazyce je často neviditelný — každé malé vítězství se má oslavit, jinak to člověk vzdá.
- Věk není překážka. Rozhoduje sebedůvěra a aktivita, ne „talent na jazyky" ani „mozek po padesátce".
- Mluvení je statisticky nejslabší dovednost Čechů v angličtině — obsah to má adresovat přímo (speaking task u každého Art Bitu), ne okrajově.

## The mistakes we see over and over
- Biflování slovíček a gramatiky mimo kontext — naučí se na test, v řeči nepoužije.
- Sledování seriálů s českými titulky jako „učení" — pohodlné, bez pokroku.
- Čekání, až „to bude umět líp", než si dovolí promluvit.
- Měření snahy streakem místo schopnosti se domluvit.

## Proof this works
- Viz `brain/samples/` — 21 odeslaných newsletterů Art for English v Lenčině hlase.
- Studentské výsledky: [PLACEHOLDER: přesunout doslovné citáty do brain/proof/ a odkázat odsud].
