# Postup: Prodejní stránky (osvědčený postup)

Náš postup pro tvorbu, úpravu a hodnocení prodejních a landing stránek. Vznikl 261001 z práce na [[projects/lcenglish-10x-english-sales-page]] (v1 → varianty A/B/C → audit → D) a ze srovnání všech nástrojů v Databance ([[resources/prodejni-stranky-nastroje]]). Měřítko kvality: kurz Jona Bensona [[JB – 10M Sales Page Audit]] (poznámky k lekcím v `G:\Můj disk\Databanka AI\BNSN Community 261001\`), převedený na český trh.

Obecná verze k předání (DigiStart, konzultace): [[resources/navod-prodejni-stranka-s-ai]]. Když se změní tenhle postup, zkontrolovat i ji.

**Forma (rozhodnuto 261001):** v našem systému zůstává jako postup, ne jako skill. Cílem je počet skillů snižovat. Skill pro DigiStart se řeší zvlášť.

Čtu, když: píšu nebo upravuji prodejní / landing stránku (Leadpages, WordPress, FreshLearn), Lenka chce zhodnotit stránku (svou, klientskou, konkurence), nebo ladíme nabídku, cenu, garanci či tlačítka.

## Přehled fází

| # | Fáze | Nástroj | Kdo rozhoduje |
|---|---|---|---|
| 0 | Podklady a tři otázky | GrowOS `brain/` | Lenka odpovídá na otázky, které podklady nepokryjí |
| 1 | Text a struktura | GrowOS `/landing-page-write` (sezení v GrowOS) | Lenka vybírá titulek |
| 2 | Kontrola textu | 9 bodů níž (Benson) | Lenka schvaluje opravy |
| 3 | Vzhled: 2–3 varianty | vzor + vlastní obrázky, ne Impeccable naslepo | Lenka vybírá / kombinuje |
| 4 | Stavba a nasazení | Leadpages MCP → WordPress | Claude, po Lenčině „ano“ |
| 5 | Technická kontrola | checklist níž | Claude |
| 6 | Po spuštění | měření, záznam do projektu | Lenka |

## Fáze 0: podklady a tři otázky

Číst: `GrowOS/<byznys>/brain/` (business.md, audience.md – námitky, proof/, stories/, voice.md, brand.md). Pro DigiStart a konzultace analogické podklady ve vaultu.

1. **Odkud čtenář přijde?** (Kde byl 5 vteřin předtím?)
   - vlastní seznam (Drip) → **důvěra**: bez představování, rovnou novinka, nabídka brzy;
   - vyhledávání / ChatGPT Ads → **lov**: konkrétní slib, termín, tlačítko nahoře;
   - Facebook, Instagram, studená reklama → **prohlížení**: příběh, problém před produktem, víc vysvětlit;
   - doporučení partnera → začít jménem doporučujícího.
   Dva výrazně odlišné zdroje = dvě verze stránky.
2. **Kdo ze stránky mluví a proč mu věřit?** Jedna konkrétní věta o důvěryhodnosti, **ověřená v business.md** (u 10x ENGLISH: „1 200 studentů z 80 zemí“ platilo pro všechny kurzy, ne pro tenhle → pryč). Jeden hlas, u Lenky první osoba.
3. **Co přesně stránka slibuje?** Pro koho · co · za jak dlouho · čím je to jiné.

A navíc: **jaká je jedna akce** (koupit / zapsat se / rezervovat) a **jaká je garance** (rozhodnutí Lenky, sladit s FAPI podmínkami).

## Fáze 1: text a struktura

- Pokud jde o lcenglish nebo tadylenka: GrowOS `/landing-page-write` (vybere oblouk mechanismus / příběh / identita podle podkladů, 9 titulků s bodováním, kontrola tření, nic nevymýšlí, chybějící věci jako `[PLACEHOLDER]`).
- Jinde stejná logika ručně. Výchozí kostra dlouhé stránky:
  1. Titulek (potvrzuje, že je čtenář správně) + kdo jsem a proč mi věřit + tlačítko
  2. Problém čtenáře jeho slovy
  3. Příběh před → zlom → po (skutečný, ze `stories/`)
  4. Bullety se zvědavostí (ne obsah kurzu)
  5. Jak to funguje (skutečný screenshot, ne maketa)
  6. Reference (jen se souhlasem se jménem, jinak „Romana S.“ / anonymně)
  7. Co dostanete (rámeček) → cena → ukotvení ceny → tlačítko
  8. Garance (pokud je) → tlačítko
  9. Pro koho to je / není · FAQ (každá námitka z audience.md má odpověď)
  10. Závěr (jeden ze tří typů) → tlačítko · P.S.
- **Nikdy nevymýšlet:** čísla, hodnoty jednotlivých položek, reference, výsledky. Bez obhajitelné hodnoty rozpis bez cen (10x ENGLISH).

## Fáze 2: kontrola textu (9 bodů)

Ke každému bodu **OK / slabé / chybí** + konkrétní přepsaný text. Výstup: tabulka + 3 opravy s největším dopadem nahoře.

1. **Layout:** Prodávají slova i bez designu? Má každý vizuální prvek úkol, nebo je tam pro atmosféru?
2. **Shoda s publikem:** Sedí otvírák na zdroj návštěvy (fáze 0)?
3. **Autorita:** Je do 5 vteřin jasné, kdo mluví? Konkrétní, ověřená věta o důvěryhodnosti? Jeden hlas?
4. **Titulek:** Chce se číst další řádek? O čtenáři, přínos (test „No a co?“), prostý, konkrétní?
5. **Příběh:** Je? Na jednom místě? Před–zlom–po? Konkrétní?
6. **Nabídka:** Pojmenované části, součet nebo poctivé ukotvení (cena za kus, cena nečinnosti), cena až po hodnotě?
7. **Bullety:** Fascinace, ne sylabus? Test 4 otázek (mezera zvědavosti · nedá se uhodnout · specifický pro produkt · zaujal by i zákazníka konkurence)?
8. **Garance:** Slib k výsledku + co si kupující nechá + krok navíc? U ceny i před posledním tlačítkem?
9. **Závěr a tlačítka:** Odstavec nad posledním tlačítkem rámuje rozhodnutí? Tlačítka „Ano, chci …“? Aspoň 3×?

Plus z GrowOS kontroly tření: **každá námitka z audience.md má na stránce domov** (u 10x ENGLISH chyběl věk).

## Fáze 3: vzhled

- Postavit **2–3 varianty vedle sebe** jako neveřejné koncepty (u 10x ENGLISH: A hutná textová, B dopis, C galerie). Lenka vybírá a kombinuje. Výsledná D = úvod z C + tělo A. Porovnávání funguje líp než jedna „finální“ verze.
- Dát **skutečný vzor** (stránka, která se Lence líbí, např. Bottomless Emails), ne přídavná jména („moderní, čisté“).
- Vlastní obrázky: skutečné screenshoty produktu, obrazy z public domain sbírek (Met Open Access) obarvené do barev značky. Žádné stock fotky, žádné AI ilustrace.
- Kontrola znaků AI webu: moc šedých odstínů, jednovrstvé stíny, všude stejné zaoblení, kartičky ve třech sloupcích, centrované všechno.
- Impeccable (`/impeccable-impeccable`) na prodejní stránku jen s pevným vzorem, sám od sebe tíhne k „AI trendy“ kartám (v1).
- **Obraz k tématu, ne jen k atmosféře (261002, Nepravidelná slovesa):** vybrat dílo, které ten problém ukazuje obrazem a vtipem (Steen *The Dissolute Household* = „nevychovaná“ slovesa) a ověřit, že v něm nejsou jen dojmy (rčení „domácnost jako od Jana Steena“ ověřeno). Met Open Access hledat přes `collectionapi.metmuseum.org/public/collection/v1.1/search` (v1 `/search` od 1. 10. 2026 nefunguje). Tmavé malby se v korálovém hero (grayscale + multiply) slijí do hněda, proto před nahráním jen zesvětlit šedotón (gamma ~0,5) a barvu nechat na CSS.
- Lenčiny standardy: **nákup dostupný všude** (tlačítko už v úvodu, cena může až níž), krátké odstavce, „–“ místo „—“.

## Fáze 4: stavba a nasazení (Leadpages)

- HTML se nahrává přes Leadpages MCP (`create_page` / `update_page`), ne přes WordPress REST API (`wp_kses` smaže styly).
- Nová stránka: Leadpages dashboard → ⋮ → **Publish to WordPress**, čistý slug.
- Úprava stránky, která už je napojená na WordPress: `update_page` s `publish:true` se propíše hned.
- Před přepsáním živé stránky **záloha** vyrenderované verze (`GrowOS/<byznys>/library/web/`).
- Koncepty po výběru smazat (Leadpages je drží 30 dní v Recently Deleted).
- Podrobnosti a ID: [[projects/lcenglish-10x-english-sales-page]] (Technický postup).
- **Úpravy konceptu, když Lenka upravuje i v editoru (261002, [[resources/gnostika-web-audit-jak-vznikl]]):** před každým zásahem znovu načíst aktuální HTML (`get_page_draft`) a dělat cílené úpravy (`edit_page_draft` / `edit_page`), nikdy nepřepisovat celou stránku (smazalo by to její změny a mohlo i heslo). Změnu nejdřív vyzkoušet lokálně (počítač, tablet, mobil, s opravdovými fonty).
- **Nasazení na WordPress a úpravy webu (261002):** „Publish to WordPress“ v dashboardu Leadpages (⋮ u publikované stránky) mi bezpečnostní pravidlo zablokovalo jako ostré nasazení, dělá ho Lenka (po výslovném svolení a ověření v prohlížeči). Po nasazení **zkontrolovat adresu (hlavně přesměrování `/stará-adresa` → starý checkout, ve starém Rank Math) a po nasazení veřejné `<title>`, popis, og/twitter a robots curlem.** Úpravy Rank Math (titulek, popis, noindex) u checkout stránky jsem dělala přes Chrome až po Lenčině výslovném svolení. Smazané stránky Leadpages jdou vrátit z „Recently Deleted“ (Manage → Recently Deleted → Restore, vrátí se jako nepublikovaný koncept).
- **Checkout stránka (vložený formulář FAPI) má vlastní titulek:** neponechávat interní název typu „Irregular ChO“; titulek „Objednávka: <produkt> | LCEnglish“, popis o objednávce a noindex, aby se neukazovala ve vyhledávání vedle prodejní stránky.
- **Souběh s Lenkou v editoru (261002, ztratily se jí dvě úpravy):** `edit_page_draft` čte uloženou verzi, ne to, co má Lenka právě rozdělané v otevřeném editoru. Když Lenka mezi mým načtením a zápisem upravovala, její neuložené změny se po mém zápisu ztratily (editor se přenačetl). Pravidlo: **dokud má Lenka koncept otevřený v editoru, přes API do něj nepíšu**, ani drobné opravy. Napřed se zeptat, jestli editor zavřela nebo uložila; po mém zápisu ať editor obnoví (F5). Před zápisem vždy znovu načíst aktuální HTML a po zápisu zkontrolovat.
- **Nahrání obrázků k novému konceptu (261002, funguje):** `create_page_draft` s HTML a zástupnými texty → `create_asset_upload` (slug stránky) → `curl -X PUT --data-binary` na vrácenou adresu → `complete_asset_upload` → `edit_page_draft` přepíše zástupné texty na `https://lenka-dvorakova.lpcontent.net/api/pages/<slug>/assets/<id>?w=1200&fit=scale-down&format=auto&quality=82`. Meta popis a OG obrázek `update_page_seo` funguje už na konceptu. Koncept `list_pages` nepotřebuje, neotevírat cizí koncepty.
- **Sdílení konceptu s kolegou nebo klientem (261002):** publikovat po Lenčině pokynu, hned vypnout indexování (`update_page_seo`, `robotsIndexable:false`), heslo nastaví Lenka sama v editoru Leadpages (Page Settings → Password Protection), ne v chatu. Ověřit z venku (`curl`: adresa přesměruje na `/unlock`) a zkontrolovat **název stránky v dashboardu**, protože se ukazuje na zamykací stránce. Odkaz a heslo posílat zvlášť. Na adrese `lpcontent.net` je nahoře pruh „Preview page“ (zmizí s vlastní doménou). PDF z cloudu se Lence nemusí otevřít a nejdou nahrát přes Gmail ani Drive, spolehlivé je odkaz na stránku.

## Fáze 5: technická kontrola před spuštěním

- [ ] Všechny obrázky jako asset v Leadpages, žádný načítaný z cizího serveru.
- [ ] Všechna tlačítka vedou do správného FAPI formuláře (produkt, cena). Formulář otevřít v prohlížeči a zkontrolovat **i způsoby platby**: když je jen převod, na stránce nesmí stát „přístup ihned po zaplacení“ (nastalo u Nepravidelných sloves 261002).
- [ ] Reference patří k tomu produktu, který stránka prodává (u staré stránky Nepravidelných sloves byly citace z HELE a 10x ENGLISH). Zkontrolovat v `brain/proof/` pole „Produkt“.
- [ ] Měřicí kód, pokud na stránku půjde reklama (pixel kanálu + nákup na děkovací stránce FAPI).
- [ ] Meta popis a náhledový obrázek pro sdílení.
- [ ] Mobil: úzké okno, nic nepřetéká, tlačítko na dosah.
- [ ] Stará verze stránky (jiná URL, FreshLearn) skrytá nebo přesměrovaná.
- [ ] Odkazy uvnitř produktu fungují (u 10x ENGLISH: zastaralá zkracovačka goo.gl).

## Fáze 6: po spuštění

- Do projektu zapsat: co se změnilo, proč (body auditu), výchozí počet prodejů / konverze před změnou.
- Po prvním testu reklamy: kolik lidí odchází bez nákupu → zachycení e-mailu (ukázka zdarma), garance.
- Nové poučení zapsat sem (a případně do obecného návodu).

## Úpravy pro český trh a naše značky

- Americký direct response v Česku působí jako tlačení. Struktura ano (konkrétnost, příběh, nabídka, garance, tlačítko s přínosem), křik ne: žádné CAPS, falešná naléhavost, vykřičníky ve velkém.
- Hodnoty a čísla jen pravdivá a obhajitelná.
- Garance = dobrovolný závazek nad zákonnou lhůtu, musí jít dodržet a sedět s FAPI. Krok navíc pro Lenku spíš „konzultace zdarma“ než peníze navíc.
- Vykání/tykání podle značky (lcenglish vyká).
- Čísla z Bensonova kurzu (0,4 % vs. 4 %) neopakovat jako fakta.

## Rozpory mezi zdroji (rozhodnuto)

Systémové písmo (Impeccable zakazuje, my ho u textové stránky používáme vědomě) · pořadí sekcí podle publika, ne pevná šablona PAS · tlačítko nahoře, cena níž · bílé místo jen tam, kde pomáhá čtení. Zdůvodnění: [[resources/prodejni-stranky-nastroje]] oddíl 3.
