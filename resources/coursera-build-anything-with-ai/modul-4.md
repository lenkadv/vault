# Modul 4 — Expectations & Experience: Iterating with Your AI PhD (podrobné poznámky)

Součást: [[coursera-build-anything-with-ai]] · Zdroj: [Coursera, modul 4](https://www.coursera.org/learn/build-anything-with-ai/home/module/4) · ~1 h, bez hodnoceného úkolu
Poznámky jsou zhuštění vlastními slovy (261004), ne přepis.

---

## 1. Očekávání a zkušenost: zavírání smyčky (video)
[Lekce](https://www.coursera.org/learn/build-anything-with-ai/lecture/uaP2R/expectations-and-experience-closing-the-loop-with-ai)

**Problém:** AI nežije v našem světě. Nemá tělo a software, který tvoří, nezažívá tak jako my. Zároveň z promptu nemůže znát všechna tvá očekávání. Výsledek: je nevyhnutelné, že postaví něco, co neodpovídá představě. Proto musíš **zavřít smyčku**: ty jsi její ruce, oči a uši.

**Ukázka:** autor dal AI složku se všemi materiály svých kurzů a zadání: z nejsilnějších příležitostí vymysli produktové směry, značku, prototypy, dashboardy, odhad obchodního modelu, plán spuštění, web a investorskou ukázkovou místnost, jako by na tom pracoval startupový tým měsíce; ulož do složky nové firmy a otevři web a demo v prohlížeči. AI vymyslela produkt PromptIQ (školení celé organizace v myšlení s AI), web a demo aplikace (sledování pokroku týmu, certifikace). Zadání bylo ale „velké a tenké“.

**Očekávání = co chceš.** AI nemůže vědět nic nad rámec promptu. Většina lidí si myslí, že ví, co chce, a není to pravda; dozvíš se to při iteraci. Autor pak dal nové očekávání: úvodní stránka má vypadat jako Matrix, ale ve tvaru jeho iniciál JW a obsah „deště“ mají být statistiky a témata z kurzů; po 10 sekundách se to vnoří do stránky s demem. Výsledek byl těžko čitelný, tak dopřesnil očekávání (obtáhnout JW bíle). **Zpětná vazba funguje v konverzaci**, nemusíš do kódu.

**Obecně:** stejně jako u najatého člověka — neví, co máš v hlavě, nad rámec toho, co řekneš. Čím víc času věnuješ promyšlení a zpětné vazbě, tím lépe. Když něco postaví a není to ono, vysvětli: „postavila jsi X, ale chtěla jsem Y“ nebo „změnila jsem názor“.

---

## 2. Očekávání přes obrázky: multimodální zadání (video)
[Lekce](https://www.coursera.org/learn/build-anything-with-ai/lecture/bBAoy/expectations-through-pictures-with-multimodal-prompting)

- Slovy se očekávání vyjadřuje obtížně; obrázek je často snazší. Multimodální = kromě slov i obrázky (a hlas).
- **Ukázka:** autor se v letadle nudil a černou fixou nakreslil na papír návrh „planetárního“ rozhraní (středový kruh Continue, sedm satelitních uzlů na čarách, dashboard, learning path, ikona tužky vlevo nahoře), vyfotil telefonem, uložil do počítače a řekl AI: přepracuj stránku produktu podle tohoto obrázku. V MAJK lze obrázek přetáhnout do chatu. AI popsala, co vidí, zvolila „radikální odklon“ a postavila to; i **tužka** přenesená do postranního panelu. Nedorozumění jsou možná slovy i vizuálně.
- **Tipy:** screenshot věci, která se ti líbí; náčrt na ubrousku nebo tabuli; po brainstormingu týmu nechat AI postavit proof of concept, zatímco tým jde na kávu.

---

## 3. Zkušenost: pomoz AI pochopit, co vidíš (video)
[Lekce](https://www.coursera.org/learn/build-anything-with-ai/lecture/5b6Ev/experience-helping-it-understand-what-you-see)

- **Očekávání = co chceš; zkušenost = co skutečně vidíš po tom, co AI postavila.** AI neví, jak věc zažíváš, a musíš jí to popsat: co vidíš, jak se to chová, jestli je to pomalé, jaké chyby se objevují.
- **Chyby:** AI napíše software s chybami. Autor do kódu záměrně vložil chybu, která „zhroutila“ planetární rozvržení; poslal AI screenshot a ona ji opravila. Znovu vložil chybu se syntaktickým problémem (chybějící zavírací závorka) → screenshot chybové obrazovky → AI chybu našla a opravila.
- **Praktická pravidla:** celou chybovou hlášku **zkopíruj a vlož** jako další zadání, vysvětlování většinou netřeba; když věc vypadá špatně, **screenshot** a „takhle to nevypadá správně“. Naučit se pořizovat screenshot na svém počítači je užitečné.
- Zkušenost vs. očekávání jsou propojené; obojí zpětně posiluje výsledek.

---

## 4. Klíčový slovník pro zadání (čtení)
[Lekce](https://www.coursera.org/learn/build-anything-with-ai/supplement/0KmpQ/key-vocabulary-for-your-prompts)

Modul je o zavírání smyčky: AI nevidí tvou obrazovku, nepocítí rozložení a neví, co sis představovala. To je tvá práce.

- **Očekávání — „takhle to chci“** (před akcí AI, zaměřuje ji): „chci, aby to vypadalo jako tento náčrt“, „záhlaví má být výrazné a vystředěné, ne malé a vlevo“, „představovala jsem si spíš časovou osu než tabulku“. Čím přesněji řekneš, jak vypadá „dobře“, tím blíž bude první pokus.
- **Zkušenost — „takhle to skutečně vidím“** (po akci AI, koriguje směr): „tlačítko je vidět, ale po kliknutí se nic nestane“, „rozvržení je špatně, všechno pod sebou, mělo by to být vedle sebe“, „dostala jsem chybu, která říká…“. Neříkej jen „je to špatně“; popiš, co vidíš.
- **Očekávala jsem X, ale dostala jsem Y** — nejužitečnější vzorec zpětné vazby; dává AI vše potřebné k pochopení rozdílu. Příklady: „čekala jsem, že sloupec součtů sčítá každý řádek, ale vidím samé nuly“; „myslela jsem, že kliknutí otevře nový panel, ale nic se neděje“.
- **Multimodální očekávání — pošli obrázek:** screenshot podobného rozvržení, fotka náčrtu, referenční design; platí hlavně pro vizuální věci (dashboardy, rozvržení, styl).
- **„Takhle jsem to nemyslela, ukážu ti“:** když slovy nejde, přepni na ukazování; screenshot s vyznačením („tady“) je lepší než odstavec popisu.

---

## 5. Cvičení: nakresli svůj proces a sleduj, jak běží (čtení)
[Lekce](https://www.coursera.org/learn/build-anything-with-ai/supplement/hWfz3/exercise-draw-your-process-then-watch-it-run)

**Cíl:** nakreslit na papír **proces** (krabice, šipky, rozhodovací body), který popisuje výpočet nad reálnou složkou souborů; vyfotit; dát AI spolu se soubory; sledovat, jak diagram přečte a provede. Často vyvolá pocit „počkat, to opravdu zabralo?“. Nepotřebuješ kód ani pseudokód.

**Co potřebuješ:** složku souborů (CSV s prodeji, odpověďmi, logy; sbírka dokumentů; obrázky k roztřídění a přejmenování; cokoliv, na co sis řekla „kéž bych to mohla zpracovat hromadně“), papír a pero.

**Krok 1 — vymysli, co chceš udělat.** Příklady: přečti každé CSV, najdi řádky s částkou nad 500 USD, označ je a sluč do jednoho souboru; podívej se na každý dokument, vytáhni datum a hlavní téma a přejmenuj soubor; roztřiď obrázky podle toho, zda mají text; přelož španělský obsah do angličtiny; najdi duplicity napříč soubory. Proces může mít větvení („pokud X, tak…“) a smyčky („pro každý soubor…“).

**Krok 2 — nakresli.** Krabice = kroky (Přečti soubor, Vytáhni datum, Přejmenuj), šipky = tok, kosočtverce = rozhodnutí (Je částka > 500? ano/ne), popisky. Nemusí být hezké; musí být zhruba srozumitelné. Tipy: jasný vstup (složka) a výstup (co chceš na konci); u rozhodnutí nakreslit obě cesty; psát konkrétní věci („částka > 500“ místo „zkontroluj, jestli je velká“).

**Verze 1 — AI na počítači:**
3. Vyfotit diagram (celý, čitelný, bez stínů).
4. Otevřít nástroj a vybrat složku.
5. Zadání: připojený diagram popisuje proces, který mám aplikovat na soubory ve složce. Pečlivě diagram prostuduj a **popiš zpět**, co si myslíš, že proces je (co dělá každý krok, rozhodovací body, očekávaný výstup). **Zeptej se, zda je tvůj výklad správný, než něco uděláš.** Po potvrzení proces proveď. Pokud je něco nejasné nebo nečitelné, **zeptej se, nehádej.**
6. Přečti výklad AI, oprav chyby („kosočtverec ‚dup?‘ znamená, zda se řádek už objevil v předchozím souboru, ne duplicitu uvnitř jednoho souboru“), potvrď a nech spustit.

**Verze 2 — web:** diagram vyfotit; složku zazipovat; do nové konverzace přiložit oba (foto + zip); stejné zadání s tím, že výsledek má být nový zip ke stažení (nebo zobrazený přímo, je-li malý).

**Krok 7 — změň názor.** Po prvním běhu změň jeden krok: práh 1 000 USD místo 500; tři kategorie místo dvou; k přejmenování přidat datum jako předponu; obrácená výchozí větev. Dvě cesty: (A) překresli (škrtni starý krok, nakresli nový, vyfoť, pošli s popisem, co se změnilo) nebo (B) řekni slovy (například „práh 1 000 USD a označené řádky do samostatného souboru“). Cíl: vidět, že AI aktualizuje pochopení procesu a že výpočet řídíš změnou očekávání, v modalitě, která ti vyhovuje.

**Rozšíření (volitelně):** složitější diagram s více větvemi a smyčkami; ošetření chyb (co dělat s prázdným souborem nebo chybějící hodnotou); kombinace překreslení jedné části a slovní změny jiné; zkusit jiný typ složky (obrázky, audio, kódy).

**Poučení:** mezera mezi „umím si představit proces“ a „dokážu počítač přimět ho provést“ bývala obrovská (programovací jazyk, práce se soubory, řízení toku). Fotka ji zavřela. Vývojový diagram je přirozený lidský způsob popisu procesu a teď je zároveň platným způsobem programování. Nenaučila ses kódovat, naučila ses nakreslit, co myslíš — a to stačilo.
