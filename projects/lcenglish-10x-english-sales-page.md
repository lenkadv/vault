# LCEnglish — nová prodejní stránka 10x ENGLISH

**Oblast:** lcenglish
**Stav:** aktivní — nová verze (D) live od 261001, další krok = propagace na studené publikum (261004: Lenka potvrdila, že lcenglish zůstává kanálem příjmů a chce ho znovu nahodit; review „lcenglish jako donor“ zrušeno)
**Zahájeno:** 260915

---

## Cíl

Nahradit slabou generickou FreshLearn prodejní stránku (`kurzy.lcenglish.cz/p/10xe` — bez ceny, CTA "Přihlaste se do kurzu" místo nákupu) plnohodnotnou prodejní stránkou na vlastní doméně, propojenou na existující FAPI checkout a automatizaci (Drip + Shadowloop + FreshLearn).

Vzniklo jako vedlejší produkt zkoušení YouCloned/AI Clone nástrojů (viz [[project_youcloned_integration]] v memory) — 10x English zvolen jako menší/bezpečnější test než HELE.

---

## Stav ke 260915 večer

### ✅ Hotovo a ověřeno
- **Stránka live:** `https://lcenglish.cz/10x-english` — plně funkční, na vlastní doméně, žádný "preview" banner
- **FAPI checkout ověřen:** cena 1 270 Kč sedí, produkční režim, webhook `fapipi.lenkadvorakova.cz/handle-invoice/10XE` správně napojený
- **Automatizace ověřena až po zdrojový kód** (`github.com/kokolem/fapipi/actions.json`): Drip tag "Purchased: 10x ENGLISHonly" + Shadowloop product_id "10x ENGLISHonly" + FreshLearn enrollment (course 157254, plan 22290) — všechno správně nastavené, nic se nemusí opravovat
- **Odkazy na `/kurzy`** (karta + patička) přepnuté na novou stránku — udělala Lenka sama v Elementoru
- **WordPress Leadpages plugin upgradován** z legacy 2.3.13 na 1.3.0 (nová verze podporuje Nova i Classic účet) — starý plugin bezpečně nahrazen, staré landing pages nepoškozené
- **Nova Leadpages účet připojen** k WordPressu přes OAuth, stránka publikovaná přes "Publish to WordPress" (ne přes REST API — ten stripuje `<style>`/`<link>` přes `wp_kses`, viz [[reference_wordpress_rest_api_kses_stripping]])
- **Shadowloop mechanismus poprvé sepsaný pro zákazníka** (ne jen admin postup) → `GrowOS/lcenglish/brain/methodology.md` sekce "Shadowloop — jak appka skutečně funguje" — použitelné napříč kurzy (HELE, 10x English, Irregular)
- **Bezpečnostní nález:** Drip API klíč (hodnota odstraněna 260926 — byla omylem i tady, a tím v Gitu/GitHubu) leží natvrdo v plaintextu na 3 místech (`jmena.py` na ploše, `jmena.py` v `3 LCEnglish/Tech/`, starý "Webhook tutorial" Google Doc) — **260926 Lenka rozhodla: neřešit, klíč nerotovat, nechat jak je, dál neotevírat**

### 🟡 Rozpracováno — vizuální varianta

**Text/copy je hotový a dobrý** (podle Lenky), **současný design je moc "AI trendy"** (impeccable-impeccable styl: karty, grid, hodně vzduchu). Aktuální live verze (viz "Hotovo a ověřeno" výše) **může zůstat jako v1, funguje jako odrazový bod** — Lenka to neoznačila jako blokující, jen jako věc k dalšímu zkoušení.

**Vzor pro vizuální směr:** https://pg.emailmarketingheroes.com/bottomless-emails — myšleno **typem vizuálu** (prostý systémový font, hutnější/textovější layout, méně kartiček a gridů, opakované CTA), ne že se má obsah/struktura kopírovat 1:1. Barvy zůstávají (korálová `oklch(58% 0.18 35)`, hořčicová `oklch(78% 0.135 78)`).

- [x] Vyzkoušet vizuální variantu 2 (hutnější, méně "designed") pro 10x-english ✅ 261001
- [x] Porovnat varianty A/B/C ✅ 261001 (Lenka: A, víc C; návrh Clauda po auditu: hlavička C + tělo A, čeká na potvrzení)
- [x] Rozhodnout garanci, první zdroj návštěvy a příběh ✅ 261001 (garance zatím žádná; cíl = studené publikum, ne Drip; příběh japonština → [[GrowOS/lcenglish/brain/stories/proc-vznikl-10x-english-a-shadowloop]])
- [x] Zkontrolovat variantu D a schválit k nasazení ✅ 261001
- [x] Rozhodnout, odkud přivést studené publikum na novou stránku ✅ 2026-10-04 — **Facebook** (stránka Lenka Dvořáková), reklama rovnou na prodejní stránku; ChatGPT Ads jako druhá možnost později. Porada `marketing-strategy` 261004, plán `GrowOS/lcenglish/brain/plan.md`, rozhodnutí `brain/decisions.md`.

### Reklama na Facebooku — postup podle plánu lcenglish (261004)

Cíl: reklama se sama zaplatí = cena za jeden prodej pod 1 270 Kč (při stropu 2 000 Kč aspoň 2 prodeje). Sledované číslo: výdej ÷ prodeje (Meta Správce reklam proti FAPI).
- [ ] Meta pixel na `lcenglish.cz/10x-english` + událost nákupu na děkovací stránce FAPI (pixel vytvoří Lenka v Meta účtu, vložení a ověření Claude) — blok út 6. 10. 11:00–13:00 #next-action #online
- [ ] Připravit první kolo reklamy: `ads-meta-create` (+ vyzkoušet `ads-meta-research` / `-compliance`, Lenčin kurz na FB reklamy — v `02 EDUCATION` kandidát Ad Flight Navigator / Winning Ads), Lenka schválí
- [ ] `ads-meta-publish` založí reklamu pozastavenou, Lenka ji zapne (strop 2 000 Kč / 14 dní) → při zapnutí založit úkol na vyhodnocení s datem +14 dní
- [ ] Vyhodnocení po 14 dnech (`ads-meta-report`): cena za prodej pod 1 270 Kč → pokračovat; nad → jednou upravit reklamu/cílení, zastavit až po druhém neúspěšném kole

**261001 13:00 — varianta D NASAZENA na `lcenglish.cz/10x-english`.** Postup: obsah Leadpages stránky `Ytf0hlJeNc` (ta, která je napojená na WordPress) nahrazen HTML z D přes MCP `update_page` + `publish:true`; propsalo se hned, bez nového „Publish to WordPress“. Ověřeno: titulek, 5 tlačítek do FAPI (formulář načte 10x ENGLISH za 1 270 Kč), screenshot Shadowloopu nahraný jako asset přímo k `Ytf0hlJeNc`, náhled na počítači i mobilu. Poslední úpravy před nasazením: „LCEnglish“ bez mezery, Pissarro skrytý pod 860 px (mobil, tablet). **Záloha v1:** `GrowOS/lcenglish/library/web/10x-english-v1-260915.html` (vyrenderovaná stránka). Koncepty A/B/C smazány 261001 (v Leadpages „Recently Deleted“ 30 dní), D zůstává. Bullet „výměna pneumatik“ nahrazen skutečnými dialogy z kurzu: „Ztracené klíče, zmeškaný hovor, pracovní pohovor“ (Lost keys 1.9, A missed call 2.2, Job interview 3.10; seznam dialogů = složky `3 LCEnglish/Products/Shadowloop/10xE/SADA 1–10`). 13:10 přepsány body „schovaný text“ a „kde začít“ (Lenka doladila v D), doplněna kurzová platforma (postup den za dnem, návody k Shadowloopu, nahrávky ke stažení): nový odstavec pod Shadowloopem, položka v rámečku, FAQ. ~~D a živá stránka mají stejný obsah~~ – vlákno Benson pak upravilo přímo živou stránku (FAQ „Není už na to pozdě?“, „méně než 13 Kč za dialog“, Pissarro jako asset, meta/og) → **zdroj pravdy = živá stránka `Ytf0hlJeNc`**, koncept D je zastaralý; úpravy dělat jen v živé (Lenka v Leadpages přímo, Claude `edit_page`, nikdy celý `update_page` z D).

**Varianta D (261001)** – https://leadpages.com/edit/lqwinsnhr4ko7gdq3go6xl2q – úvod z C (Pissarro, popisek svisle), písmo a tělo z A (Lenka: rozvržení a písmo A vypadá líp). Postavená podle Bensonova auditu pro studené publikum: kdo je stránka pro + autorita (přes 1 200 studentů z 80 zemí) v úvodu, cena až po hodnotě, příběh „proč vznikl“ hned za problémem, 6 bulletů se zvědavostí místo výčtu, rozpis hodnoty v rámečku, závěr typu „budoucnost“ bez falešné naléhavosti, tlačítka „Ano, chci…“. Skutečný screenshot Shadowloopu místo maketu (asset na Leadpages). Bez garance (Lenka 261001: zatím žádná).
- 12:42 Lenkina kontrola D → opraveno: tlačítko + cena zpět v úvodu (pro Lenku musí být nákup dostupný všude), tlačítek celkem 5 (úvod, za bullety, za referencemi, u ceny, závěr); „10x ENGLISH“ velkým písmem nad nadpisem; úvodní řádek „…a stejně se při rozhovoru zasekávají“ (ne 2× „překládat v hlavě“); „přes 1 200 studentů z 80 zemí“ pryč (platí pro všechny kurzy a 10x ENGLISH je česko-anglický, zavádějící) → „mluví šesti jazyky a sedmý, japonštinu, se právě učí“ (ověřeno v business.md, navazuje na příběh). Délka praxe zatím v podkladech není.
- 12:46 Další kolo podle Lenky: v úvodu tlačítko bez ceny (cenu uvidí dál a ve FAPI), odkaz „Chci se podívat, jak to funguje ↓“; důkaz „lektorka s 25letou praxí · sama mluví šesti jazyky a sedmý, japonštinu, se učí“ (25 let → business.md); cena u tlačítek až od rámečku „Všechno, co dostanete“ níž; závěr přepsán jemněji: ne „shánění materiálů“ (Lenčina vlastní zkušenost), ale obecná zkušenost „nahrávek v učebnici je málo a nejsou připravené k tréninku“. Lenka text ještě projde detailně. Rozpis hodnoty je bez cen u jednotlivých položek, protože nemáme obhajitelné hodnoty.
- **261001 13:30 — srovnání nástrojů a zhodnocení živé D:** [[resources/prodejni-stranky-nastroje]] (oddíl 4). Hlavní nálezy k rozhodnutí Lenky: na stránce neběží žádné měření (důležité před reklamou), Pissarro se načítá přímo z serveru Met (nahrát jako asset), chybí odpověď na námitku věku, chybí zachycení zájemců, kteří nekoupí hned, chybí meta popis.
- [ ] Vybranou variantu dát místo v1 (Publish to WordPress, slug `10x-english`)

### Vylepšení po srovnání nástrojů (plán 261001)

Zdroj nálezů: [[resources/prodejni-stranky-nastroje]] (oddíl 4). Pořadí = pořadí, ve kterém to dává smysl dělat. Návrhy textů jsou níž, nic z toho zatím není na stránce.

**A. Před spuštěním reklamy (rychlé, malé)**
- [x] Pissarro nahrán jako asset k `Ytf0hlJeNc` (`ld5xuailoxuksx1dshyfr82n`), odkaz v HTML přepsán ✅ 261001
- [x] Meta popis, OG titulek/popis a náhledový obrázek (Pissarro) doplněny přes `update_page_seo` ✅ 261001
- [x] FAQ „Není už na to pozdě?“ doplněno (znění z návrhu níž) ✅ 261001
- [x] (už bylo doplněno ve FAQ) Úroveň konkrétně: „mírně pokročilí až pokročilí“ → „sady od A1/2 po B2/C1“ (označení sad ve FreshLearnu). Lenka potvrdí, jestli takhle chce, a jestli A1/2 nekoliduje s „není pro vás, pokud začínáte úplně od nuly“.
- [x] Pod rámeček s cenou doplněna věta „To je méně než 13 Kč za jeden dialog…“ ✅ 261001
- [ ] Starou stránku `kurzy.lcenglish.cz/p/10xe` skrýt nebo přesměrovat na `lcenglish.cz/10x-english` (FreshLearn, Lenka v administraci).

**B. Měření (podmínka pro reklamu)**
- [ ] Až padne rozhodnutí o kanálu (viz #next-action výš): vložit měřicí kód toho kanálu (Meta pixel z Business Manageru, nebo kód ChatGPT Ads) do Leadpages (nastavení stránky → tracking codes) + událost nákupu ve FAPI (děkovací stránka). Kód a ID vytvoří Lenka ve svém účtu, vložení a ověření zvládne Claude.
- [ ] Zapsat výchozí stav před reklamou: kolik prodejů 10x ENGLISH za poslední měsíce (FAPI), aby bylo s čím porovnat.

**C. Později (po prvním testu reklamy)**
- [ ] Zachycení zájemců, kteří nekoupí hned: ukázkový dialog zdarma za e-mail (Drip formulář + jeden dialog v Shadowloopu + krátká uvítací sekvence). Jako vlastní projekt, až bude vidět, kolik lidí ze studené reklamy odchází bez nákupu.
- [ ] Garance: vrátit se k rozhodnutí (teď žádná), formulace v souladu s obchodními podmínkami FAPI.
- [ ] Reference staršího studenta s výslovným souhlasem (k námitce věku), až bude k dispozici.

**Návrhy textů (k Lenčině schválení)**
- *Meta popis:* „100 krátkých rozhovorů ze skutečného života, nachystaných k tréninku v aplikaci. Pro všechny, kdo angličtinu roky studují, a stejně se při rozhovoru zasekávají.“
- *FAQ – Není už na to pozdě?* „Není. Shadowing nestaví na biflování pravidel, ale na poslechu a opakování po mluvčím, a to funguje v každém věku. Tempo si určujete sami: pauzu mezi opakováními si prodloužíte, dialog zpomalíte na 80 % a frázi pustíte ve smyčce, kolikrát potřebujete.“ (Bez tvrzení o věku studentů, dokud nebude ověřená reference.)
- *Ukotvení ceny:* „To je méně než 13 Kč za jeden dialog, i s nahrávkou, překladem a aplikací.“ (1 270 / 100 = 12,70 Kč.)

260926 (weekly review): varianta 2 a další kroky se stránkou zůstávají aktivní — je potřeba rozhodně postoupit dál.

**261001 — tři varianty jako neveřejné koncepty v Leadpages** (živá v1 beze změny, kromě titulku):
- **A – hutná textová** (styl Bottomless Emails): systémové písmo, jeden sloupec, zvýraznění fixou, tlačítko 4× · editor https://leadpages.com/edit/fnlhpq1s1g52h3bqhdcui20d
- **B – dopis od Lenky**: patkové písmo, list papíru, „Dobrý den, …“, odkazy ve větě, podpis „Zdraví L.“, P.S. · obsahuje **[PLACEHOLDER] na skutečnou historku** (nepovinné) · https://leadpages.com/edit/tz5m3je2823tan3lvfci3286
- **C – galerie**: tmavý úvod s detailem Pissarra *Dvě mladé venkovanky* (Met, public domain, [objekt 437304](https://www.metmuseum.org/art/collection/search/437304)) obarveným do korálové, Instrument Serif, římské číslice, velká citace · https://leadpages.com/edit/ttjhd0dmcyktgmyqpeviwa14
- Ve všech: opravený překlep „dořřeknete“, dlouhé pomlčky „—“ → „–“ (podle voice.md), přidána reference Petry Laluhové (souhlas se jménem), Romana a Ivana jen „Romana S.“/„Ivana L.“ (v proof/ souhlas se jménem nedoložen), Romanina citace doslovně.
- Vodítko: tutoriál [[ABM – Websites That Don't Look Made by AI]] (6 znaků AI webu: moc šedých, jednovrstvé stíny, výchozí font, stále stejný layout, všude stejné zaoblení, stock obrázky; řešení mj. obrazy z muzejních public domain sbírek).
- 261001 12:25 Lenka: líbí se A, ještě víc C (Pissarro do značky sedí). Romanina citace zkrácena ve všech variantách (pryč „od listopadu 2019… 48 let“, zastaralé). V C popisek obrazu zmenšen, svisle u pravého okraje, poloprůhledný.
- **Benson audit A vs. C (261001, [[resources/postupy/prodejni-stranky]]):** 6 z 9 bodů stejných (stejný text). A vyhrává v bodě 1 (layout, každý prvek vede ke koupi) a 9 (4 tlačítka, popisky blíž přínosu). C má výhodu u teplého publika (obraz = poznávací znak Art for English). Obě: chybí autorita (kdo mluví), příběh, stack s hodnotami, garance; cena je hned nahoře před hodnotou; bullety = vlastnosti. Doporučení: hlavička C + hutné tělo A + doplnit autoritu, garanci, fascinace. Otevřené otázky na Lenku: garance (FAPI podmínky)? Odkud půjde návštěva první (Drip, nebo reklama)? Skutečný příběh?
- **Titulek živé stránky opraven** (bylo „10x ENGLISH — prototyp prodejní stránky“) → „10x ENGLISH – mluvte a rozumějte anglicky bez překládání v hlavě | LCEnglish“, přes Leadpages MCP `edit_page` s `publish:true`; na lcenglish.cz se propsalo hned, bez nového „Publish to WordPress“.

---

## Kontrola FreshLearn (261001)

Kurz 157254 ve FreshLearnu: Úvod (2 lekce: „Jak používat materiály z kurzu: Stínování“ s PDF `10xE Stínování.pdf` + tabulka `10x English Steps 1 - 5.xlsx` a odkaz goo.gl na online verzi; „Naučte se mluvit... s Shadowloop“) + **Sada 1–10 s úrovněmi A1/2 → B2/C1**, každá 10 dialogů (EN text, CZ překlad, nahrávka, odkaz na Shadowloop) + lekce „Ke stažení“ (PDF sady, `nahravky-80.zip`, `nahravky-100.zip`). Vše ze stránky sedí, kromě „doživotního přístupu“ (nastavuje se ve FAPI/plánu 22290, neověřeno).
Nálezy k řešení:
- Stará stránka `kurzy.lcenglish.cz/p/10xe` je pořád veřejná (starý text, „od začátečníků“, „vyměníme pneumatiky“, tlačítko „Přihlaste se do kurzu“).
- Odkaz `goo.gl/5z37cQ` v Úvodu zatím funguje, ale goo.gl je Googlem ukončená zkracovačka → nahradit přímým odkazem na Google Sheet.
- Na prodejní stránce lze uvést konkrétní úrovně A1/2 → B2/C1 (teď „mírně pokročilí až pokročilí“).
- FreshLearn má: API klíč (Zapier), integrace Zapier/Slack/MailChimp/Zoom/HubSpot, Reports, Email Sequences, Automations, Coupons, Affiliates, Course AI (preview).

**Vyřešeno 261001 13:30:** stará FreshLearn stránka (Web → Pages → „10x ENGLISH“, 862 zobrazení; `kurzy.lcenglish.cz/p/10xe` i `/10xe`) přesměrována na `lcenglish.cz/10x-english` přes Settings → Custom Script (head): meta refresh + `location.replace`; obsah stránky nesmazán (vrácení = smazat skript). Odkaz goo.gl v Úvodu nahrazen přímým odkazem na Google Sheet (ověřeno po uložení). Na prodejní stránce do FAQ „Jaká úroveň“ doplněno „(Pokud znáte evropské úrovně: sady jdou od A1/2 po B2/C1.)“. API klíč FreshLearnu: ve FreshLearnu (Settings → Integrations → Zapier) je pole s klíčem, ale zobrazit/zkopírovat ho jde jen s plánem No Brainer (Lenka ho nemá, kliknutí = nabídka upgradu). Fapipi klíč nějak používá (zápis do kurzu po platbě) – nejspíš uložený na serveru fapipi, nastavoval Vítek; v dokumentu „Akce do FAPI/Freshlearn/Drip tutorial“ klíč není. Návrh Clauda (čeká na Lenku): kvůli přehledům neupgradovat; přehledy brát z FreshLearn → Reports, případně se zeptat Vítka. **Doplněno 261001 večer:** Lenka klíč získala a uložila do `GrowOS/lcenglish/.env` jako `FRESHLEARN_API_KEY` (vedle Drip a WP klíčů; git-ignored, nikam jinam nevkládat). **Ověřeno 261001 23:07:** API funguje (čtení). Base `https://api.freshlearn.com/v1`, hlavička `api-key`; fungují `api/members` (687 členů), `api/course-enrollments` (1040 zápisů; courseId, planId, částka, datum, jméno → kontrola zápisu po nákupu), `api/payments` (957), u každého `/count`; `api/product-enrollments` chce `type` (ProductBundle / DigitalDownload / Masterclass). Dokumentace: https://freshlearn.com/support/api

## Test automatizace FAPI → fapipi → FreshLearn (261001, krok 1 bez zásahu)

| Nákup 10x ENGLISH | FAPI skript | FreshLearn | Drip |
|---|---|---|---|
| Pavel Pavel 13. 10. 2025 | ❌ **502 Bad Gateway** (fapipi nedostupný) | přidán až 16. 10. = ručně | – |
| Miroslav Kocán 21. 10. 2025 | (nekontrolováno) | zapsán týž den ✅ | – |
| Jana Scheinpflugová 3. 11. 2025 | ✅ 200 OK | zapsána týž den ✅ | – |
| Hana Jašová 10. 11. 2025 (sleva 20 %) | ✅ 200 OK | 2 kurzy, 7 240 Kč ✅ | tag „Purchased: 10x ENGLISHonly“ ✅ |

Závěr: automatika funguje; Lenčina vzpomínka na ruční přidání = Pavel Pavel, kdy byl server fapipi chvíli nedostupný a FAPI volání neopakuje (selhání je vidět v historii dokladu jako „Nepodařilo se provést notifikaci“). HELE (Jiří Kokeš 25. 6. 2026) skript nemá vůbec – známý nedodělek. Od 11/2025 žádný nákup 10x → aktuální stav ověřen jen tím, že server fapipi 261001 odpovídá (endpoint `/handle-invoice/10XE` existuje). Kontrola po každém nákupu: FAPI → doklad → Historie změn → „spuštěn programový skript … 200 OK“.

**Živý test 261001 14:00** (objednávka 420260502 → faktura 426507, Test Automatika 10x, `lnk.dvorakova+test10x@gmail.com`, převodem, ručně označeno jako zaplacené se „Spustit akce“):
- FAPI → fapipi `/handle-invoice/10XE`: **200 OK** ✅
- Drip: odběratel vytvořen, tag „Purchased: 10x ENGLISHonly“ ✅ (lifetime_value 2 540 Kč = nákup se zapsal 2×; opraveno Vítkem 261001, viz [[resources/hele-funnel]])
- FreshLearn: člen vytvořen hned, **zápis do kurzu proběhl se zpožděním** ✅ (14:02 zaplaceno, ~14:04 ještě „Not enrolled yet“, 14:10 zapsán, 1 kurz / 1 270 Kč). **Automatika funguje**, jen zápis do kurzu trvá několik minut → při kontrole počkat aspoň 10 min. Body níže o selhání neplatí (ponechány jako záznam omylu):
- ~~do kurzu NEZAPSÁN~~ Plán 22290 „One Time“ 1 270 Kč existuje a je aktivní. Fapipi chybu nehlásí (vrací 200), takže FAPI selhání nevidí.
- Shadowloop: neověřeno.
- ~~Dnes každý kupující se musí přidat ručně~~ – NEPLATÍ, zápis jen trvá několik minut. Příčina nejasná: API jako celek funguje (student se založil), selhává jen zápis do kurzu/plánu – možná změna požadavků FreshLearnu na enrollment, omezení jen této funkce, nebo chyba ve fapipi. Rozhodne log fapipi z 1. 10. 2026 14:02 (Vítek).
- Testovací záznamy 10x (Drip, FreshLearn, Firebase, FAPI faktura 426507) smazány Lenkou 261001 večer po opravě dvojího zápisu; Drip, Firebase a FAPI ověřeno, FreshLearn potvrdila Lenka.
- Překlep „čeká na zplacení“ na děkovací stránce opraven 261001 večer ve formuláři 10x ENGLISH i v 5 formulářích „TEST Produkt…“ (vzory); ostatní formuláře ho neměly.

## Technický postup pro příště (funguje, zopakovatelné)

1. Vytvořit/upravit HTML v Leadpages přes MCP nástroj (`create_page`) — content se NESTRIPUJE, plná podpora `<style>`
2. V Leadpages dashboardu (`leadpages.com/dashboard/pages`) najít stránku → "⋮" → **Publish to WordPress**
3. Nastavit čistý slug (ne auto-generovaný kód) — pozor na konflikt, pokud existuje starý WP draft se stejným slugem (smazat ho přes REST API `DELETE /wp-json/wp/v2/pages/{id}?force=true` nebo v adminu)
4. Nikdy needitovat WP stránky s vlastním CSS přes `POST /wp-json/wp/v2/pages` — `wp_kses` to ztiší smaže

---

## Viz také

- [[areas/lcenglish]]
- [[resources/hele-funnel]] (odloženo do [[someday-maybe]] 261004) — HELE funnel, stejný FAPI/Shadowloop/FreshLearn mechanismus
- [[resources/youcloned-ai-clone-setup]] — kontext, jak tenhle projekt vznikl (vaultová kopie, čitelná i beze mě)

## Propagace — možnosti (260929)

- **ChatGPT Ads (beta)** jako varianta nebo alternativa k Facebooku, až bude produkt připravený k propagaci. Rozhodnuto 260929: promo akci OpenAI (utratit 6 000 Kč do 14 dní → kredit 6 000 Kč) nehonit; začít malým testem s rozpočtem, který nebude líto (orientačně 1 500–2 000 Kč), a sledovat proklik a konverze. Otevřené: jak kanál cílí na české publikum, kolik stojí proklik. Účet Ads Manager: lenka@lenkadvorakova.cz (rozpracovaný, zda vznikl, neověřeno).
