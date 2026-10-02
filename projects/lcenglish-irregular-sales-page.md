# LCEnglish – nová prodejní stránka Nepravidelná slovesa za 14 dní

**Oblast:** lcenglish
**Stav:** koncept v Leadpages, neveřejný; 261002 večer Lenka upravila text, čeká se na výběr obrazu a opravy drobností
**Zahájeno:** 261002

## Cíl

Nová prodejní stránka pro kurz Nepravidelná slovesa za 14 dní (790 Kč), stejným způsobem a ve stejné kvalitě jako [[projects/lcenglish-10x-english-sales-page]] (varianta D, 261001). Nahradí starou Leadpages stránku `irregular-new` (neveřejná, nenavázaná na web) a stránku `lcenglish.cz/irregular-cho/` (WordPress/Elementor se vloženým formulářem FAPI).

- [x] Vybrat nový obraz do hero (Goya) a vyměnit ✅ 261002
- [x] Nasadit stránku na lcenglish.cz/irregular, ověřit FAPI → fapipi → Drip → Shadowloop a titulky ✅ 261002
- [ ] Živý test nákupu Nepravidelných sloves (objednávka převodem, ručně „zaplaceno“ se spuštěním akcí → ověřit Drip tag, e-mail „Na start“, přístup do Shadowloopu; testovací data pak smaže Lenka) #next-action #online
- [ ] Před reklamou: měřicí kód (pixel kanálu + nákup na děkovací stránce FAPI), výchozí počet prodejů Nepravidelných sloves ve FAPI #online

## Koncept

- Editor: https://leadpages.com/edit/mbqa97evpzmmrq7eybpf7p21 (stránka `mbqa97evpzmmrq7eybpf7p21`, slug `zmXzFM2OxL`, **nepublikováno**, indexování vypnuté). **Zdroj pravdy je koncept v Leadpages** (Lenka v něm upravuje přímo, Claude jen cílené `edit_page_draft`, nikdy celou stránku). Soubor `GrowOS/lcenglish/library/landing-pages/irregular/irregular-v1-261002.html` je jen výchozí verze před Lenčinými úpravami.
- Tlačítka (5×) vedou na FAPI formulář `34e9f125-5b9a-40bf-8d80-9ccacd96a92a` (ověřeno 261002: „Nepravidelná slovesa za 14 dní“, 790 Kč, zatím jen bankovní převod).
- Titulky: `headlines.md` ve stejné složce. Lenka 261002 upravila H1 na „Tvary nepravidelných sloves už jste se učili. Teď je chcete umět.“
- Arc Mechanismus, kostra podle [[resources/postupy/prodejni-stranky]].

## Obraz (261002)

Steen *The Dissolute Household* (Met 437747) se Lence nelíbí: nezobrazuje nepravidelnost, jen nepořádek. Kandidáti (Met Open Access, public domain, vyzkoušené v hero ořezu): Crazy Quilt (Met 701310, nepravidelné polygony s různými motivy = „každé sloveso jinak, dohromady drží“), Hokusai Velká vlna (Met 56353), Bruegel Babylonská věž (Wikimedia Commons, Kunsthistorisches Museum; jazykový vtip), Cézanne zátiší s nakloněným stolem (Met 435882), Piranesi Carceri (Met 337725, 337060), Dürer Nosorožec (Met 356497). Doporučení Clauda: 1. Crazy Quilt, 2. Hokusai, 3. Babel. Zdrojové soubory kandidátů ve scratchpadu, po výběru uložit originál do `GrowOS/lcenglish/library/landing-pages/irregular/`.

**Volba Lenky 261002 22:00: Goya, *El sueño de la razón produce monstruos* (Los Caprichos, č. 43, 1799), Met [338473](https://www.metmuseum.org/art/collection/search/338473), public domain.** Originál a zesvětlený ořez v `GrowOS/lcenglish/library/landing-pages/irregular/` (`goya-sleep-of-reason-original.jpg`, `goya-sleep-of-reason-hero.jpg`). Soubory jsou nahrané jako assety stránky (hero id `jnvtyc6pzd7yn729fsvdu5z9`, og id `qhrzvqbqq4028h7skqqwtbsh`), **ve stránce vyměněno 261002 22:08** (verze 370: src hero, alt, popisek, `object-position:50% 70%`, og obrázek; Lenčiny úpravy z v. 368 zachované). Původní plán výměny níž je jen záznam: Výměna = `edit_page_draft`: src hero, alt, popisek („Francisco Goya, El sueño de la razón produce monstruos (Los Caprichos, č. 43, 1799) · The Met, public domain“), CSS `object-position` z `58% 45%` na `50% 70%`; potom `update_page_seo` og obrázek na `qhrzvqbqq4028h7skqqwtbsh`. Steenovy assety zůstávají v knihovně stránky, po výměně smazat nepoužité.

**Barevnost kurzů (rozhodnuto 261002):** korálová všude, žádné odlišování podle kurzu. Obraz Lenka ještě zvažuje.

## Co Lenka rozhodla 261002

- Garance: žádná, stejně jako u 10x ENGLISH.
- Jedno zadání = nejvýš zhruba 20 minut ✓. Materiály zůstávají napořád ✓.
- Nemusí se upřesňovat „50 sloves po dvou větách“ (Lenka text upravila).
- Screenshot aplikace může být z jakéhokoli balíčku, ponechán ten z 10x ENGLISH.
- **FAPI: zapnout platbu kartou** (formulář má teď jen převod). Dřív, než stránku spustíme, to ve FAPI zkontrolovat; po zapnutí karty se k tlačítkům může vrátit „přístup ihned po zaplacení“ (Lenka už „po připsání platby“ z tlačítek sama vyřadila).
- Reference: k Nepravidelným slovesům máme jedinou (Kamila). Claude 261002 přidal obecné, doslovné a jen s křestním jménem: Vít (HELE, „nestihl jsem všechny úkoly, ale vím, jak pracovat“), Daniela (HELE, denní návyk), Romana (kurzy, porozumění a odvaha mluvit) a Hanka, 77 let (HELE, k námitce věku, v FAQ). Hlavně u Víta a Daniely uvedeno, ze kterého kurzu jsou. Víc referencí přímo k nepravidelným slovesům stále chybí.

## Poznámky Clauda k Lenčiným úpravám a co z nich Lenka rozhodla (261002 večer)

Provedeno v konceptu: „ne z tabulek“, pomlčky „–“ (2×), nadpis FAQ „Je mi už spousta let, …“, věty před ukázkou sjednocené („vzorové věty“, bez „dvě věty“ a „padesáti“), og titulek podle nového H1, reference bez hranatých závorek (výpustky se vypustí tiše, vždy celé věty, žádné úpravy uvnitř věty).

Ponecháno záměrně (Lenka): „Nepravidelná slovesa napořád“ u ceny a u posledního tlačítka, „mluvíte úplně sami“ u časové osy, „Poslední už všechno zvládnete“, odstavec o bezplatných balíčcích malým písmem (je to volný přístup do aplikace pro kohokoli, nic se nestahuje; odkaz se otevírá v novém okně, takže stránka návštěvníkovi zůstane). Ukotvení ceny „16 Kč za sloveso“ Lenka nechce („zní děsně“, slovesa nikdo nekupuje), cena na kus se nevrací.

**261002 21:55:** další kolo oprav po Lenčině kontrole (verze konceptu 361): „metoda“, čárka před „a můžete hned začít“, „dávalo smysl“, „přečetli“, všude „stínování“ (ne shadowing), nad titulkem „biflovali ze seznamů a tabulek“, iniciály u Daniely T. a Romany S., Hanka „studentka kurzu“, odstavec „Věty, nahrávky i aplikace…“ bez „A hlavně:“, z tlačítek pryč „Přístup po připsání platby“. Ponecháno záměrně (Lenka): „takřka zázračná metoda“ a slib porozumění/mluvení/slovíček/gramatiky, synonyma nejpoužívanější/nejčastější/nejfrekventovanější, „na pár dní“ × „na dva až tři dny“, „Postupujeme … pustíte“, „epizod“ u Víta. Před spuštěním ještě: ve FAQ „Kdy můžu začít?“ je „po připsání platby“, po zapnutí karty ve FAPI přepsat.

Reference po úpravě: Vít (bez věty o nestihnutých úkolech, začíná „Chci Vám poděkovat za … vedení“), Daniela (+ věta o tom, že i unavená alespoň projede slovíčka), Romana (jen věta o porozumění a odvaze), Hanka v FAQ.

## Stav nasazení (261002 22:25)

Ověřeno bez změn: FAPI formulář „Irregular“ (150339) má platbu kartou, Google Pay, online převod i běžný převod, stejně jako 10x ENGLISH (150342); akce „Zaplacení objednávky → programový skript `…/handle-invoice/Irregular`“; `actions.json` ve fapipi má segment `Irregular` (Drip tag `Purchased: Irregular` + Shadowloop produkt `Irregular`); Drip: workflow „admin: EU consent – nákup Irregular“ a pravidlo „product: Irregular Purchase to Email Series“ (tag → e-mailová série „Irregular product email series“); checkout stránka `lcenglish.cz/irregular-cho/` (vložený formulář, všechny platby) funguje.

Hotovo: nová stránka **publikovaná v Leadpages** `https://lenka-dvorakova.lpcontent.net/zmXzFM2OxL` (noindex), všech 5 tlačítek vede na `lcenglish.cz/irregular-cho/`, og obrázek a hero Goya, Steenovy assety smazané.

**261002 22:30 – NASAZENO.** Lenka publikovala na WordPress a odstranila přesměrování: `https://lcenglish.cz/irregular/` vrací 200 a servíruje novou stránku (title „Z tabulky do pusy: nepravidelná slovesa za 14 dní | LCEnglish“, og/twitter titulek a popis podle H1, og obrázek Goya, 5× tlačítko → `/irregular-cho/`, žádné „koncept/nová“ v názvech; ověřeno curlem). `/kurzy` → `/irregular` funguje. Leadpages: smazány (do Recently Deleted na 30 dní) koncept D Nepravidelných sloves, stará varianta D 10x ENGLISH a stará `irregular-new`. Ponecháno: GNOSTIKA koncept (jiný projekt) a ostatní starší stránky (doručovací stránky z Dripu).

**261002 22:40:** checkout `/irregular-cho/` (WP post 7299) opraven v Rank Math s Lenčiným výslovným svolením: titulek „Objednávka: Nepravidelná slovesa za 14 dní | LCEnglish“, popis „Objednávka kurzu … Platba kartou, Google Pay nebo převodem.“, robots noindex, formulář zůstal (ověřeno curlem). Interní název stránky „Irregular ChO“ ve WP nezměněn (neviditelný pro návštěvníky). Stará Leadpages stránka „Irregular New“ vrácena z koše jako **nepublikovaný koncept** (Lenka: jsou v ní myšlenky, ke kterým se možná vrátíme; pozor, citace Víta a Romany tam jsou k jiným kurzům a pod Kamilou stálo „Jake, Bow Wow Dog Walking“). Leadpages ukazuje u nové stránky „Draft changes“ (Lenka po publikaci na WP ještě upravovala): aby se změny dostaly na web, je nutné znovu Publish v Leadpages / aktualizovat WordPress.

(Níž už vyřešený návrh pro checkout, ponechán jako záznam.) **Otevřené (vyřešeno výše):** checkout stránka `/irregular-cho/` má titulek „Irregular ChO | LCEnglish“, popis ze starého textu, og obrázek `irregular-red.jpg` (350 px) a je indexovatelná. Návrh: titulek „Objednávka: Nepravidelná slovesa za 14 dní | LCEnglish“, popis „Objednávka kurzu Nepravidelná slovesa za 14 dní (790 Kč): 14 dní krátkých úkolů a aplikace Shadowloop. Platba kartou, Google Pay nebo převodem.“, robots noindex, interní název stránky „Objednávka – Nepravidelná slovesa“ (v WordPressu / Rank Math, upravuje Lenka nebo výslovné povolení).

(Původní seznam kroků níž je už splněný, ponechán jako záznam.) **Zbývalo (blokováno bezpečnostním pravidlem, ostré nasazení na lcenglish.cz musí udělat Lenka nebo to výslovně povolit):** 1) Leadpages dashboard → karta stránky → ⋮ → Publish to WordPress, slug `irregular`; 2) odstranit přesměrování `/irregular` → `/irregular-cho/` (pravděpodobně Rank Math → Redirections), jinak bude `/irregular` dál vést na checkout; 3) `update_page_seo` s `robotsIndexable:true`; 4) kontrola: `/kurzy` → karta Irregular už vede na `https://lcenglish.cz/irregular` (netřeba měnit); 5) ve FAQ případně změnit „po připsání platby“.

## Až bude schváleno

- Nasazení: Leadpages → ⋮ → Publish to WordPress s čistým slugem; zvolit adresu (`irregular` už obsazuje stará stránka „Irregular ChO“ → buď přesměrovat, nebo přepsat) a upravit odkazy v e-mailech Dripu, které vedou na `lcenglish.cz/irregular`. Záloha staré stránky před přepsáním.
- `update_page_seo` s `robotsIndexable:true` až při spuštění, test na mobilu, [[resources/postupy/prodejni-stranky]] Fáze 5.
- Měření (pixel, nákup na děkovací stránce) před reklamou.
