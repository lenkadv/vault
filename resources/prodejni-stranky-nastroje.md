# Prodejní stránky a weby – co máme a jak to do sebe zapadá

Srovnání ze dne 261001. Pracovní postup (co Claude reálně dělá): [[resources/postupy/prodejni-stranky]]. Případová studie: [[projects/lcenglish-10x-english-sales-page]].

Použij, až budeš řešit: kterým nástrojem začít u nové stránky, proč si dvě rady odporují, nebo co ještě zlepšit na 10x ENGLISH.

## 1. Co máme (podle toho, k čemu to slouží)

### Obsah a struktura stránky (co tam napsat a v jakém pořadí)
| Nástroj | Co je to | Použito? | Hodnocení |
|---|---|---|---|
| [[JB – 10M Sales Page Audit]] (Jon Benson) | videokurz, 9 bodů auditu | **ano**, 261001: audit variant A/C → varianta D | Nejlepší **měřítko k hodnocení**: krátké, konkrétní, každá věc má test. Přímý americký tón, čísla jsou ilustrativní. |
| [[GOS – landing-page-write]] (GrowOS) | nainstalovaný skill, píše text + strukturu + směr designu | ne | Nejdůkladnější **postup psaní**: vybere typ stránky a jeden ze 3 „oblouků“ (mechanismus / příběh / identita), čte `brain/` (námitky, reference, příběhy), 9 titulků s bodováním, kontrola tření, nic nevymýšlí. Stránku nestaví, jen podklad. |
| [[GOS – website-audit]] (GrowOS) | nainstalovaný skill, audit webu | ne | Šest oblastí s vahami (obsah, SEO, konverze, důvěra, UX, značka), skóre 0–100 a 10 oprav. Poctivě říká, co z textu nepozná (rychlost, mobil). Hodí se na **celý web** lcenglish.cz, na jednu prodejní stránku je Benson ostřejší. |
| [[ABM – Sales page writer]] (AI Black Magic) | skill ke stažení, nenainstalovaný | ne | Pevná šablona PAS (problém – rozjitření – řešení), tabulka priorit a checklist. Užitečný **checklist**, jinak je to podmnožina GrowOS a Bensona. Instalovat netřeba. |
| [[ABM – About page writer]], [[ABM – Faq generator]], [[ABM – Testimonial collector]] | jednoduché skilly | ne | Úzké pomůcky. Pro LCE užitečný hlavně Testimonial collector (sběr referencí se jménem a výsledkem). |
| [[GOS – vsl-write]] | skill na scénář prodejního videa | ne | Až bude na stránce video. |

### Vzhled (jak to má vypadat)
| Nástroj | Co je to | Použito? | Hodnocení |
|---|---|---|---|
| [[IMP – impeccable-impeccable]] (+ 17 dalších Impeccable skillů) | nainstalovaný skill na tvorbu rozhraní | **ano**, 260915: v1 stránky | Postavil funkční stránku, ale výsledek Lenka hodnotila jako „moc AI trendy“ (karty, grid, vzduch). Dobrý na aplikace a rozhraní, na prodejní stránku příliš designérský. |
| [[ABM – Websites That Don't Look Made by AI]] | tutoriál, 6 znaků AI webu + zdroje | **ano**, 261001: varianty A/B/C, Pissarro z Met | Nejpraktičtější pro vzhled. Hlavní myšlenka: nepsat delší prompt, ale dát **skutečný vzor, čísla a vlastní obrázky**. Stavět po sekcích podle reálného vzoru. |
| [[ABM – Stop Shipping AI Slop]] | tutoriál | ne (obsahem se kryje s předchozím) | Čtyři techniky: řídit jako art director, vzor místo přídavných jmen, skilly s vkusem, audit „AI slop“ na konci. Checklist znaků na konci je dobrý na rychlou kontrolu. |
| [[ABM – Landing Page Design Prompts (+10 promptů)]] | tutoriál + 10 promptů | ne | Hlavní varování: **obrázky z cizích serverů se časem rozbijí**. Na 10x ENGLISH se to týká Pissarra (viz níže). Jinak základy. |
| [[ABM – Steal These 8 Websites (+8 promptů)]] | ukázky webů z jednoho promptu | ne | Firemní a SaaS styl, pro nás málo. |
| [[UX – ui-ux-pro-max]], [[UX – design-system]] apod. | nainstalovaná knihovna stylů a palet | ne | Encyklopedie stylů. Spíš na aplikace a rozhraní, pro prodejní stránku zbytečně široká. |
| [[IMP – impeccable-critique]], [[IMP – impeccable-audit]] | hodnocení designu, technická kontrola | ne | Critique hodnotí UX podle Nielsenových heuristik a person, audit kontroluje přístupnost a mobil. **Doplňují Bensona**: ten se na tohle nedívá. |
| [[ABM – Design Director]], [[ABM – Stitch Website Builder]], [[ABM – Design systémy 50 značek]] | pluginy ke stažení | ne | Stitch potřebuje Google Stitch a nastavení, Design Director je kontrola vizuální kvality. Teď nepotřebujeme. |

### Technika
[[SLU – Leadpages]] (konektor, **používá se**: stránka se nahrává přes MCP a propisuje do WordPressu). Postup v projektu 10x ENGLISH.

## 2. Kde se shodují (tohle platí určitě)

Benson, GrowOS i AI Black Magic se shodují na tomhle:
- titulek mluví o výsledku pro čtenáře, ne o produktu; konkrétně, prostě, bez chytračení;
- reference blízko tvrzení, s konkrétním výsledkem;
- bullety jako přínos nebo zvědavost, ne výčet obsahu;
- tlačítko s přínosem v první osobě („Ano, chci …“), nikdy „Odeslat“ nebo „Koupit“;
- tlačítko víckrát na stránce (min. 3×, GrowOS: zhruba každé 2–3 sekce);
- cena až po hodnotě, s ukotvením (profesionál, jiné kurzy, cena nečinnosti);
- garance jako obrácení rizika, ne reklamační řád;
- žádná falešná naléhavost ani vymyšlená čísla.

**10x ENGLISH (varianta D) splňuje všechno kromě garance** (Lenka zatím nechce) a ukotvení ceny (rozpis bez hodnot, protože nemáme obhajitelné částky).

## 3. Kde si odporují (a jak to rozhodnout)

| Téma | Kdo co říká | Rozhodnutí pro nás |
|---|---|---|
| **Bílé místo** | Benson: vzduch nechá oko odpočinout a stránka má vést k tlačítku, takže méně. ABM Sales page writer: „bílé místo konvertuje“, max. 4 řádky na odstavec. Impeccable: hodně vzduchu, rytmus. | Krátké odstavce ano (čte se to na mobilu), ale žádné prázdné dekorační plochy. D to tak má. |
| **Písmo** | Impeccable: systémové písmo a Inter **zakazuje** jako znak AI. Tutoriál „Websites That Don't…“: výchozí font je znak AI. Vzor Bottomless Emails (a varianta A/D): úmyslně systémové písmo, protože působí jako dopis, ne jako „design“. | Rozhodla Lenka: písmo z A vypadá líp. U textové prodejní stránky je systémové písmo vědomá volba, ne lenost. Platí, pokud zbytek nese charakter (Pissarro, barvy). |
| **Pořadí** | ABM: pevně PAS, „nepřehazovat“. GrowOS: tři různé oblouky podle publika a podkladů, **nikdy jedna šablona**. Benson: příběh hned za titulkem, u analytiků před nabídkou. | GrowOS a Benson mají pravdu proti ABM. D = problém → příběh → bullety → mechanismus → reference → nabídka, což je blízko oblouku „příběh“. |
| **Cena v úvodu** | Benson: cena až po hodnotě. GrowOS (oblouk mechanismus): nabídku vytáhnout nahoru, „aby byl nákup rychle na dosah“. GrowOS kontrola tření: v první třetině stránky má být cena **nebo** tlačítko. | Lenka 261001: tlačítko nahoře ano, cena až u rámečku. To vyhovuje oběma. |
| **Tlačítka** | Benson / ABM: 3×+. Impeccable: „nedělej každé tlačítko primární“. | Nekonflikt: 5 tlačítek ke koupi + vedlejší odkaz „Chci se podívat, jak to funguje ↓“ jako sekundární. D to tak má. |
| **Cena na tlačítku** | ABM: název a cenu na tlačítko nebo hned vedle. Benson: cenu nepsat do závěrečného odstavce (může se změnit). | Cena pod tlačítkem drobně (D tak má od rámečku dál). |
| **Hlas** | ABM: nikdy 3. osoba. Benson: tři hlasy podle cíle, jen je nemíchat. | D: Lenka v 1. osobě v příběhu, jinak „vy“. V pořádku. |

## 4. Co na 10x ENGLISH ještě stojí za zvážení

Seřazeno podle dopadu. Nic z toho není rozhodnuté, rozhoduje Lenka.

1. **Měření před reklamou (technické, důležité).** Na stránce teď neběží žádné měření (žádný Facebook pixel, Google Analytics ani Tag Manager; ověřeno 261001). Další krok projektu je placená reklama na studené publikum. Bez měření reklama nepozná, kdo nakoupil, a nedá se porovnat ani konverze stránky. Prodeje uvidíme ve FAPI, ale ne odkud přišly. Zdroj: GrowOS website-audit (konverze), Benson bod 2.
2. **Obrázek Pissarra se načítá přímo z serveru Met** (`images.metmuseum.org`). Když Met změní adresu nebo zablokuje cizí načítání, úvod zůstane bez obrázku. Řešení: nahrát ho jako asset do Leadpages, stejně jako screenshot Shadowloopu. Zdroj: [[ABM – Landing Page Design Prompts (+10 promptů)]].
3. **Námitka „na to už jsem moc starý/á“ chybí.** V `GrowOS/lcenglish/brain/audience.md` je to nejsilnější zaznamenaná námitka (střední váha). Na stránce na ni nic neodpovídá. Řešení: jedna otázka do FAQ, případně reference staršího studenta (anonymně lze použít např. „mám 77 let…“, zatím neověřeno). Zdroj: GrowOS kontrola tření (pokrytí námitek). Druhá námitka („tenhle kurz nebude jiný“) je pokrytá v P.S. a v citaci Ivany L.
4. **Kdo stránku nechce koupit hned, odejde bez ničeho.** U studeného publika je to většina. Varianta: ukázkový dialog zdarma za e-mail (Drip). Zdroj: GrowOS website-audit (zachycení zájemce), Benson bod 2 (studené publikum = režim prohlížení). Větší krok, spíš až po prvním testu reklamy.
5. **Ukotvení ceny bez vymyšlených částek.** Rozpis hodnoty je bez cen (správně, nemáme obhajitelné). Poctivé ukotvení jde i bez nich, třeba srovnáním s cenou jedné soukromé lekce nebo „méně než 13 Kč za dialog“ (1 270 / 100). Zdroj: Benson bod 6, ABM (rozpočet na den).
6. **Garance:** zatím rozhodnuto „žádná“. Všechny tři zdroje ji považují za jednu z největších pák. Vrátit se k tomu, až bude první výsledek reklamy (formulace musí sedět s obchodními podmínkami FAPI).
7. **Popis stránky pro vyhledávače a sdílení chybí** (meta description, náhledový obrázek). Při sdílení odkazu na Facebooku se pak ukáže náhodný text. Drobnost, rychle opravitelné.

## 5. Doporučené pořadí nástrojů pro příští stránku (např. HELE, DigiStart)

1. **Podklady:** GrowOS `brain/` (námitky, reference, příběhy) a Benson body 2 a 3 (odkud lidé přijdou, kdo mluví).
2. **Text a struktura:** GrowOS `/landing-page-write` (v sezení otevřeném v GrowOS). Je to jediný nástroj, který čte naše podklady a nic nevymýšlí.
3. **Kontrola textu:** Bensonův checklist v 9 bodech ([[resources/postupy/prodejni-stranky]]).
4. **Vzhled:** skutečný vzor + vlastní obrázky podle [[ABM – Websites That Don't Look Made by AI]], ne Impeccable naslepo.
5. **Kontrola vzhledu a techniky:** `/impeccable-critique` nebo `/impeccable-audit` (mobil, přístupnost), obrázky jako vlastní assety, měření, meta popis.
6. **Celý web jednou za čas:** GrowOS `/website-audit`.
