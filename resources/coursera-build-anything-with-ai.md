# Build Anything with AI — No Code Required (studijní poznámky)

**Zdroj:** [Coursera – Build Anything with AI](https://www.coursera.org/learn/build-anything-with-ai) — Dr. Jules White, Vanderbilt (9 h, 6 modulů, 6 hodnocených úkolů, aktualizováno 6/2026)
**Přístup:** trial Coursera Plus od 4. 10. 2026, zdarma do 11. 10. → zrušení hlídá [[waiting-for]]; po trialu kurz zmizí, proto tyto poznámky. Projekt: [[claude-academy]].
**Poznámky jsou vlastní zhuštění (261004), ne přepis.** Přesné formulace zadání a plné prompty z cvičení jsou v lekcích — odkazy níže, dokud trial běží.

**Podrobné poznámky po lekcích (rozepsané, včetně postupu všech cvičení):** [[modul-1]] · [[modul-2]] · [[modul-3]] · [[modul-4]] · [[modul-5]] (obsahuje i capstone) · [[modul-6]] — složka `resources/coursera-build-anything-with-ai/`.
**Doslovné přepisy videí:** všech 22 stáhla Lenka sama oficiálním tlačítkem Coursery (panel **Files** → Transcript) 261004 do `G:\Můj disk\Databanka AI\Coursera Build Anything with AI 261004\Texty lekcí (přepisy videí a čtení)\`; k nim i čtení uložená jako Google Dokumenty (`.gdoc`). Číslo v názvu = pořadí v obsahu kurzu; rejstřík je ve [složce](<file:///G:/Můj disk/Databanka AI/Coursera Build Anything with AI 261004/00 REJSTRIK – co je kde a k čemu.md>). Jen pro osobní studium, autorsky chráněné.

Použij, až budeš řešit: jak zadávat AI agentovi (Claude Code) velké úkoly nad složkou souborů, aniž bys uměla programovat; jak zpětně opravit, co postavil špatně; jak AI využít na rozhodování.

## Hodnocení Lenky (261004) a využití pro DigiStart

Trochu zklamání: pro Lenku nic zásadně nového (pro další studentky může být obsah i popisy cvičení užitečný). **Užitečná je struktura** kurzu a jednotlivé lekce jako vzor pro stavbu kurzu [[digistart]] → [[digistart-podklady]] (Blok S: struktura kurzu, struktura lekce, co převzít a co ne).
**Rychlý přístup z DigiStartu:** tyto poznámky (moduly 1–6 ve složce `resources/coursera-build-anything-with-ai/`) + stažené texty lekcí od Lenky ve složce na Disku (odkaz výše). Mapa v databance: [[CB – Build Anything with AI]].

## Hlavní myšlenka kurzu

AI agent s přístupem k počítači (Claude Code, Cowork, Codex, MAJK) funguje jako „počítačový PhD“, kterému předáš notebook: řekneš cíl, on si sám přeloží, co s počítačem udělat. Ty dodáváš **nápad na začátku** a **úsudek na konci** (kontrola kvality). Prostředek je proces: zadat → zkontrolovat → opravit zpětnou vazbou.

## Modul 1 — Úvod, mentální model

- [Mentální model](https://www.coursera.org/learn/build-anything-with-ai/lecture/IyCFR/the-mental-model-for-working-with-ai-agents): agent = AI + nástroje (tool calls = zprávy, kterými AI „mluví“ s počítačem). Příklady: zpráva o výdajích ze složky účtenek, rozpočtová aplikace z jednoho zadání, „digitální město“ ze složky Stažené.
- [Jak zadat úkol v nástrojích](https://www.coursera.org/learn/build-anything-with-ai/lecture/IRpro/assigning-work-to-your-ai-phd-in-majk-claude-code-claude-cowork-chatgpt-and): vždy vybrat **pracovní složku** a pak napsat zadání. **Verze 1** = nástroj s přímým přístupem ke složkám (Claude Code v desktopové aplikaci — záložka Code; Cowork; Codex; MAJK). **Verze 2** = web (claude.ai, ChatGPT): složku zazipovat, nahrát, výsledek stáhnout zazipovaný. Každé cvičení v kurzu má obě verze.
- [Doporučené nástroje](https://www.coursera.org/learn/build-anything-with-ai/supplement/l3FwR/recommended-tools): rizika přímého přístupu — omyl při „uklidit složku“ (smazání/přesun), prompt injection přes zpracovaný obsah; čím víc propojíš (mail, kalendář, finance), tím víc přemýšlet. Barriéry ubírají výkon.
- [Náklady](https://www.coursera.org/learn/build-anything-with-ai/supplement/20Qk5/understanding-costs): AI je levná, ne zdarma; cvičení stojí centy až ~5–10 USD, hlavně u velkých složek. Sledovat spotřebu, **nezapínat automatické dobíjení**.
- **Cvičení „uspořádej složku“** ([lekce](https://www.coursera.org/learn/build-anything-with-ai/supplement/hJMlw/let-ai-help-you-organize-a-folder)): nejdřív kopie složky; AI složku prozkoumá, navrhne **tři způsoby uspořádání (jeden nečekaný)**, nic nemění, počká na tvůj názor; potom upřesníš, jak věci hledáš, a teprve pak přesune (nic nemaže).
- **Cvičení „dashboard z vlastních souborů“** ([lekce](https://www.coursera.org/learn/build-anything-with-ai/supplement/Iynt0/exercise-build-a-dashboard-from-your-own-files)): složka souborů, co k sobě patří (projekt, fotky z cesty, výpisy, průzkum produktů) → AI nejdřív řekne, co našla a co chce vizualizovat, pak postaví dashboard s ≥ 3 vizualizacemi. **Hodnocený úkol: Your Dashboard** (doporučený termín Coursery 5. 10.).

## Modul 2 — Velké zadání, odvaha

- [Velká zadání](https://www.coursera.org/learn/build-anything-with-ai/lecture/vbmmU/1000x-improvement-with-big-prompts): zadávat **projekt, ne mikrokroky**. Čím větší rozsah, tím víc práce agent udělá, než se vrátí k tobě. Příklad: sada životopisů + popis pozice → matice kritérií v CSV + dashboard s proklikem na životopis. Důvěru budovat u nízkorizikových věcí (kopie složky).
- [Be Bold](https://www.coursera.org/learn/build-anything-with-ai/lecture/9xI1C/bespoke-computing-is-cheap-be-bold): na míru je dnes levné; kdo zadá „normální věc“, dostane průměr. Žádat odvážné varianty a víc směrů najednou.
- **Cvičení Be Bold** ([lekce](https://www.coursera.org/learn/build-anything-with-ai/supplement/QZCR0/exercise-be-bold-unlock-your-computational-creativity-with-ai)): pět nápadů na jednostránkový HTML výstup ze souborů — muzeum digitálního života, dashboard skrytých vzorců, „paralelní verze mě“, továrna na startupy z poznámek, situační místnost. **Úkol: Your Bold Creation.**
- **Cvičení Career Impact** ([lekce](https://www.coursera.org/learn/build-anything-with-ai/supplement/ayFIH/exercise-display-your-career-impact-with-ai)): z životopisu postavit dashboard kariérního dopadu (časová osa, dovednosti, opakující se vzorce); bonus: přeladit na konkrétní inzerát/hodnocení; volitelně dashboard pro vyjednávání o platu. **Úkol: Your Career Impact Solution.**
- Slovník: „dokonči tenhle projekt“ (ne úkol) · „prozkoumej, pochop, navrhni možnosti“ · personalizované počítání · be bold.
- Klíčové: **rozsah zadání je násobič**; vlastní nástroj na míru je levnější než učit se cizí; odvaha je racionální, když jsou experimenty levné; **nejdřív prozkoumat a navrhnout, pak jednat**.

## Modul 3 — rámec CODER, část C (Compute)

CODER = Compute · Organize · Display · Engineer · Reason (E je až na konci a má vlastní kurz [Build Apps with AI](https://www.coursera.org/learn/build-apps-with-ai)).

- [Batch operation](https://www.coursera.org/learn/build-anything-with-ai/lecture/cTLMA/c-compute-1-batch-operation): „**pro každý** soubor/řádek/foto udělej Y“. Příklad: ze všech výpisů najít opakované platby (název, částka, počet výskytů, první a poslední výskyt, roční odhad). Funguje i na nečistá data, která by klasický program nezvládl (citace do hodnocení zaměstnance podle šablony).
- [Metoda vs. výsledek](https://www.coursera.org/learn/build-anything-with-ai/lecture/2tb4W/outcome-vs-method-prompting): metoda = znám kroky, trvám na nich; výsledek = znám cíl, způsob nechám na AI. Dá se míchat. U výsledku je potřeba přesně popsat, jak vypadá cíl.
- [Map/Reduce](https://www.coursera.org/learn/build-anything-with-ai/lecture/bfIce/c-compute-map-reduce): z každého zdroje vytáhnout jednu věc (map) a sloučit do jednoho výstupu (reduce). Příklady: výpisy → jedna tabulka podle data; týdenní zprávy → měsíční souhrn.
- **Cvičení Map/Reduce** ([lekce](https://www.coursera.org/learn/build-anything-with-ai/supplement/B3tjM/exercise-map-reduce-build-something-powerful-from-many-files)): tři varianty — finanční dashboard, inventář fotek „očima AI“, syntéza dokumentů do jedné zprávy. Kostra zadání: AI nejdřív sdělí počet souborů, typy a rozsah dat → co z každého souboru vytáhnout → co z toho sestavit → výsledek jako HTML a otevřít v prohlížeči. **Úkol: Your Map / Reduce Solution.**
- Vzorec dohromady: „pro každou fakturu [batch] vytáhni dodavatele, datum, částku [map] a slouč do jedné tabulky podle splatnosti [reduce] — chci schválit platby jedním sezením [výsledek]“.

## Modul 4 — Očekávání a zkušenost (zavřít smyčku)

- [Closing the loop](https://www.coursera.org/learn/build-anything-with-ai/lecture/uaP2R/expectations-and-experience-closing-the-loop-with-ai): AI nevidí, co ty, a nezná tvá očekávání nad rámec zadání. **Ty jsi jeho ruce, oči a uši.** Iterovat: „postavil jsi X, očekávala jsem Y, protože…“.
- [Obrázky místo slov](https://www.coursera.org/learn/build-anything-with-ai/lecture/bBAoy/expectations-through-pictures-with-multimodal-prompting): náčrt fixou na papíře, screenshot vzoru, fotka tabule → AI to podle něj přestaví. Chyba v pochopení je možná i u obrázků.
- [Zkušenost](https://www.coursera.org/learn/build-anything-with-ai/lecture/5b6Ev/experience-helping-it-understand-what-you-see): chyby (prázdná stránka, chybová hláška) — vložit celou hlášku nebo screenshot, vysvětlení často netřeba.
- Nejužitečnější vzorec zpětné vazby: **„očekávala jsem X, vidím Y“**.
- **Cvičení „nakresli proces a sleduj, jak běží“** ([lekce](https://www.coursera.org/learn/build-anything-with-ai/supplement/hWfz3/exercise-draw-your-process-then-watch-it-run)): ručně nakreslený vývojový diagram (větvení, cykly) → fotka + složka souborů → AI nejdřív popíše, jak diagramu rozumí, počká na potvrzení, pak ho provede; potom změnit jeden krok (překreslit nebo slovně). *(Bez hodnoceného úkolu.)*

## Modul 5 — CODER II: Organize, Display, Reason

**Organize**
- [Interpretive organization](https://www.coursera.org/learn/build-anything-with-ai/lecture/ew8fQ/o-organize): AI **přečte obsah / podívá se na obrázek** a teprve podle toho třídí, ne podle názvu souboru. Příklady: fotky podle toho, co na nich je; poznámky z porad podle typu výsledku; účtenky → složky podle cest a přejmenování pro vyúčtování. Vždy ať nejdřív ukáže strukturu.
- [Outcome-oriented organization](https://www.coursera.org/learn/build-anything-with-ai/lecture/QOXye/outcome-oriented-organization): bez kategorií, jen cíl („co opravdu rozhoduje při výběru produktu — tabulka“).
- [Organize for goal](https://www.coursera.org/learn/build-anything-with-ai/lecture/pcjiT/o-organize-for-goal-pattern): stejná data uspořádat pro konkrétní cíl, **vytvořit „pohled“** a zdroj nechat beze změny (kdo se ozvat tento týden; vše ke klientovi do 30 s; dva pohledy na prodeje; dva dashboardy „co řešit hned“ vs. „jak daleko jsme“).

**Display**
- [Display](https://www.coursera.org/learn/build-anything-with-ai/lecture/AMCM8/d-display): zaklínadlo **„dashboard jako jeden samostatný HTML soubor“** (otevře se v prohlížeči, AI to umí dobře). Chyby ve vzhledu jsou běžné (nízký kontrast, divný blok) → zpětná vazba, screenshot. Pěkně zpracovaná data působí hodnotněji; druhý pohled na data pomáhá odhalit chyby.
- [Display for pattern](https://www.coursera.org/learn/build-anything-with-ai/lecture/9Xj2e/d-display-for-pattern): neřešit barvy, ale **proč a pro koho** — „zobraz to tak, aby tomu rozuměl X, který potřebuje Y“ (finanční tým chce hustotu, CEO 90 vteřin, správní rada příběh růstu, manažer páteční klid, retrospektiva).

**Reason** (AI jako pojistka a druhý pohled, ne náhrada tvého úsudku)
- [Gap analysis](https://www.coursera.org/learn/build-anything-with-ai/lecture/5J1Gm/r-reason-1-gap-analysis): co každý dokument pokrývá, co vylučuje a hlavně **co neřeší žádný**. Použití: porovnání nabídek (tři nabídky na rekonstrukci), plán cesty, vyúčtování pracovní cesty.
- **Cvičení Gap Analysis** ([lekce](https://www.coursera.org/learn/build-anything-with-ai/supplement/8cC1n/exercise-the-missing-pieces-gap-analysis-on-a-real-decision)): 3–7 dokumentů k reálnému rozhodnutí → dashboard se čtyřmi částmi (matice pokrytí, co každý zdroj vynechal, **sdílená slepá místa**, doporučený další průzkum) + závěrečná otázka „co by tě znepokojilo a jak bys rozhodla dnes“. **Úkol: Your Gap Analysis Solution.**
- [Trade-off analysis](https://www.coursera.org/learn/build-anything-with-ai/lecture/hgBnj/r-reason-2-tradeoff-analysis): co obětuji při volbě A vs. B; AI sama odvodí dimenze z dokumentů (dvě nabídky práce, dvě města, dvě školy).
- [Čtyři soudní vzorce](https://www.coursera.org/learn/build-anything-with-ai/supplement/eS6SC/the-four-judgment-patterns-assumption-audit-steelman-pre-mortem-blind-spot): **Assumption audit** (skryté předpoklady seřazené podle nebezpečí, „nosné“ nahoře) · **Steelman** (nejsilnější argument proti mně, seřazený podle obtížnosti vyvrátit, a co mé podklady neřeší) · **Pre-mortem** (příběh o tom, jak plán selhal, a které varovné signály jsou už v dokumentech) · **Blind spot archaeology** (čí pohled v materiálech úplně chybí). Využívají to, že AI nemá zájem na tom, aby měl tvůj plán pravdu.
- **Capstone: osobní zpravodajský přehled** ([lekce](https://www.coursera.org/learn/build-anything-with-ai/supplement/4QhAM/exercise-your-personal-intelligence-briefing)): vybrat doménu (práce, finance, zdraví, tvorba), složka reálných souborů (aspoň 10–20) → jeden HTML přehled o pěti částech: situace, vzorce a trendy (≥ 2 vizualizace), gap analýza, rizika a slepá místa (3–5 seřazených), plán 30 dní (konkrétní kroky opřené o nalezené věci). Dotahovací otázky na slabá místa + závěrečná „co v souborech skrývá nejdůležitější věc, na kterou jsem se nezeptala“. **Úkol: Your Briefing Solution.**

## Modul 6 — závěr

[Závěr](https://www.coursera.org/learn/build-anything-with-ai/lecture/9bCjr/wrapping-up-thought-to-computation): „augmentovaná, ne umělá inteligence“. Přínos tvůj = dobrý nápad na začátku + kvalitní kontrola na konci; AI je nedokonalá, vyrovnáš to **procesem** (iterace, testy, posouzení). Čím lepší proces, tím větší důvěra a rychlejší cesta od myšlenky k výsledku. Hodnocený úkol: žádný (5minutový modul). Dál: Prompt Engineering for ChatGPT, Build Apps with AI (6 h, součást stejného programu), Agent Skills for Leaders.

## Šest hodnocených úkolů (hodnotí AI)

Your Dashboard (M1) · Your Bold Creation (M2) · Your Career Impact Solution (M2) · Your Map / Reduce Solution (M3) · Your Gap Analysis Solution (M5) · Your Briefing Solution (M5). Certifikát nás nezajímá; úkoly dělat jen tam, kde z nich mám užitek.

## Co z toho pro Lenku (návrh)

- **Verze 1 je dostupná:** Claude Code v desktopové aplikaci (záložka Code) — stejný nástroj, který běží ve vaultu. Cowork na Windows 10 nefunguje.
- Dobré cvičné cíle z vlastních věcí: gap analysis nabídek/podkladů (GNOSTIKA, EVIDENT, DigiStart), map/reduce nad složkou fotek z archivu nebo výpisy z účtů (finances-admin), dashboard dopadu z životopisu (nabídky, reference), interpretive organization složky Stažené.
- Použitelné i do osnovy [[digistart]]: rozlišení **projekt vs. úkol**, **výsledek vs. metoda**, **očekávání vs. zkušenost**, vzorce CODER.
- Související: [[claude-academy]], kurz AI Agent Skills for Leaders (stejný program).
