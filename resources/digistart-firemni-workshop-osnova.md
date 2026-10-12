# Firemní AI workshop: podklad pro Štěpánku (Lenka, 261012)

Použij, až se bude dělat nabídka nebo příprava firemního workshopu s Claudem. **Není to DigiStart**, jen z něj přirozeně vyrostlo ([[digistart]], zkušební průchod [[00-README]], [[05-zpetna-vazba-zkusebni-pruchod-261011]]). Nabídku posílá a ceny, počty lidí a role doplňuje Štěpánka; tohle je Lenčina výpomoc s **obsahem** a s tím, abychom věděly, že workshop umíme odvést a jak se na něj připravit. Inspirace z kurzu AI Agent Skills for Leaders ([[coursera-agent-skills-for-leaders]]) je vždy vlastními slovy.

**Text nabídky pro Štěpánku (hotový, k doupravení, psaný Lenčiným stylem):** [Google Doc](https://docs.google.com/document/d/1eqOILjTMj3QTgYQ6cOfmO4M4_17iq20AJplZNY7hybU/edit) (261012; zdroj též [Claude Docs](https://claude.ai/code/artifact/d5aae1bc-4272-4fcc-ac18-ef4f799747ea)). Tenhle soubor je podrobný podklad pod ním.

Situace: česká pobočka německé firmy, kontakt přes HR, Claude zatím nepoužívají, licence si mohou vyžádat. Od nás chtějí nabídku.

## Rozhodnutí Lenky (261012 večer), platí pro nabídku

- **Workshop běží na skutečných datech:** vlastní složky, koncepty se ukládají přímo do poštovního programu účastníka (u firemního Microsoft 365 s Claude potřebuje souhlas správce). Podmínka je přístup do ostrého prostředí; když nepůjde, poskytneme tréninková data a řekneme, že některé ukázky nebudou zcela autentické. Kopírování textu do chatu jako běžná cesta v nabídce nefiguruje.
- **Instalace a zprovoznění si dělá účastník sám předem** podle krátkého návodu (pro 90minutové představení to nutné není). Asistence při instalaci je volitelná služba za příplatek, **není v ceně workshopu** a nechceme se k ní zavazovat.
- **V textu nabídky se nepíše „nemusíte nic dokončit“**; stačí, že si všechno vyzkouší a mohou navázat nebo úkoly dokončit po workshopu.
- **Dvě lektorky se do nabídky nepíšou** (workshop nevedou dvě naráz; možná budou obě přítomné, ale nenabízí se to). Počet účastníků: HR uvažuje o 15.
- Názvosloví: „profil stylu psaní“, „sbírka vzorků“ v materiálech pro druhé; vlastní názvy a balíček pro Štěpánku se nemění ([[feedback_terminology_styl_psani_vzorky]]).

## 1. Balíček

1. **Představení, 90 min** (ochutnávka, bez licencí, na našich účtech a ukázkových datech). Podrobná osnova níže jen stručně, v tomhle podkladu není hlavní.
2. **Workshop 1, 3 h, praktický krok za krokem.** Hlavní věc tohoto podkladu, oddíl 3.
3. **Workshop 2, 3 h, asi za 3–4 týdny.** Účastníci přinesou vlastní případy a otázky poslané předem. Oddíl 4.

**Podmínka účasti na workshopech:** každý účastník má licenci Claude s Claude Code (viz oddíl 2).

## 2. Licence (do nabídky jako podmínka a doporučení)

Ověřeno 261012: [claude.com/pricing](https://claude.com/pricing), [nápověda k Team plánu](https://support.claude.com/en/articles/9266767-what-is-the-team-plan). Ceny jsou v USD bez daně a mění se.

| Varianta | Cena | Pro firmu |
|---|---|---|
| Individuální Pro | 20 měsíčně (17 při roční platbě) | nedoporučit: osobní účty, žádná centrální správa, ukládání dat pro trénování je volba uživatele |
| **Team** (2–150 míst) | Standard 25 měsíčně (20 roční) · Premium 125 (100 roční) | **doporučit:** zahrnuje Claude Code, centrální správa a fakturace, SSO, správce řídí konektory, obsah se ve výchozím stavu k trénování nepoužívá |
| Enterprise | od 20 za místo, jen roční, plus spotřeba podle API sazeb | zatím předčasné; má smysl při požadavku na auditní logy nebo od větších počtů |

Doporučení: Team (počet míst podle skupiny, HR uvažuje o 15), pilotně Standard, první měsíce platit měsíčně. Premium jen pro těžší uživatele. Standard má 1,25× limit Pro plánu na relaci, Premium 6,25×; **ještě neověřeno na vlastním Team účtu, jestli Standard místo zvládne zkušební scénář** (viz „Co je třeba udělat“). Licenci kupuje firma přímo od výrobce. Pro naši náplň není potřeba terminál: pracuje se v desktopové aplikaci Claude, v části Code. Co a kam smí firma uložit (GDPR, uložení dat v USA, pravidla německé centrály) si firma posoudí sama, my neposuzujeme právně.

## 3. Workshop 1 (3 h): sada procesů krok za krokem

**Cíl:** účastník si pod vedením lektorky vyzkouší každý krok sám a **dojde v něm tak daleko, aby pochopil, co dělá a proč**. Dokončí to potom po workshopu. Nepředpokládáme, že na místě bude všechno hotové. Podstatné je, aby kroky na sebe navazovaly a ke každému dalšímu měl účastník dost zkušenosti z předchozího. Kdyby si nic nezkoušel sám a poslouchal jen výklad, na konci by se přestal chytat: teorii si bez vlastní zkušenosti nezapamatuje.

**Zásada plánování:** u každého kroku určit (a) **minimum na místě**: kam až se dojde, aby účastník rozuměl principu a uměl pokračovat, a (b) **dokončení doma**. Čas kroku se řídí tím, co z něj potřebuje další krok, ne tím, jak dlouho by trvalo dotáhnout ho celý (u Štěpánky jen profil vykání asi hodinu, na workshopu se tedy hotový profil nečeká).

**Forma:** skupina kolem 15 lidí (HR uvažuje o 15), workshop vede jedna lektorka, případně druhá obchází; do nabídky se počet lektorek nepíše. Každý pracuje na svém počítači. Před workshopem **společná příprava online 30–45 min** (instalace, přihlášení, oprávnění, zkušební složka); bez ní se workshop zasekne na technice. Princip každého kroku: zadání → návrh → kontrola → schválení → provedení; nic se nemaže; odeslání dělá vždy člověk.

| Čas | Krok | Minimum na místě | Dokončení doma | Na čem další krok staví | Připravenost |
|---|---|---|---|---|---|
| 0:00–0:15 | Start: tři způsoby práce (zeptám se · řeknu, co dělat · naplánuji), co smím do AI dát | všichni přihlášení, vědí, co nesmí do AI | – | společná pravidla | nový krátký úvod |
| 0:15–0:55 | **1. Pořádek v souborech** na zkušební složce | AI prozkoumá složku, navrhne strukturu, účastník schválí a přesun proběhne (a zkusí vrátit zpět) | úklid vlastní složky podle postupu | zažitý rytmus zadání → návrh → schválení → provedení | **hotové** (prompt a skripty), potřebuje úpravy ze zpětné vazby |
| 0:55–1:05 | přestávka | | | | |
| 1:05–1:50 | **2. Profil stylu psaní** (pracovní) | úvodní rozhovor, vzorky z vlastních odeslaných e-mailů bez citlivých údajů, první verze profilu a jedna zkouška | dokončení a doladění profilu, další profily (tykání, osobní) | profil je podklad pro krok 3 | **hotové**, vyzkoušené u Štěpánky |
| 1:50–2:30 | **3. Koncepty e-mailů** | propojení s poštou (nejjistější kopírování, konektor jen když správce povolí), bezpečnostní zkoušky, jeden koncept ve stylu profilu | další koncepty, učení z úprav | umí dostat e-mail do AI a zkontrolovat výstup | **hotové**, s Outlookem vyzkoušené u Štěpánky |
| 2:30–2:55 | **4. Termíny a úkoly** | z několika vložených e-mailů nebo poznámek vznikne přehled, co a kdy hoří, s doporučeným pořadím | napojení na vlastní poštu a kalendář | spojuje styl psaní, e-maily a úkoly do jednoho denního rytmu | **chybí**, vzor je Lenčin denní plán; udělat zjednodušenou verzi |
| 2:55–3:00 | Zadání domů: dokončit rozpracované, vybrat vlastní případ pro workshop 2 a poslat otázky | | | | |

Reporty a analýza tabulek mají jiný charakter (je to samostatné téma s kritérii a kontrolou čísel), proto jsou v představení jako ukázka a ve workshopu 2 jako hlavní blok. Pokud by se Lenka se Štěpánkou rozhodly zařadit krátký praktický úvod k tabulkám už do workshopu 1, stačí zkrátit krok 4 nebo 1; nic se tím nerozbije, protože kroky se řídí minimem na místě.

## 4. Workshop 2 (3 h)

**Předem pošlou:** vlastní případ použití, co mezitím dokončili nebo postavili (profily stylu psaní), otázky.

- 0:00–0:20 Kdo co dokončil; kolo „co se povedlo, kde jsem se zasekl“.
- 0:20–0:40 Dva účastníci ukážou kolegům svůj postup (každý 10 min).
- 0:40–1:35 **Reporty a analýza tabulek:** vlastní tabulka účastníka → ověřený přehled. Zásady: svázat každé číslo s řádkem a zdrojem, stanovit předem, jak vypadá dobrý výsledek, ukázka správného výstupu, kontrola vzorcem nebo skriptem, ne od oka; cílový tvar je hotová věc (přehled, tabulka, shrnutí pro vedení), ne text v chatu.
- 1:35–1:45 přestávka
- 1:45–2:15 Odpovědi na předem poslané otázky; oprava postupů podle typu chyby.
- 2:15–2:40 Z povedené konverzace postup: každý uloží jednu svou konverzaci jako opakovatelný postup. Hledání dalších případů („projdi moje konverzace a navrhni, co dělám pořád dokola“).
- 2:40–3:00 Sdílení v týmu: společná knihovna postupů, pravidla (co smí a nesmí do AI), kdo ji udržuje.

## 5. Co z Coursery využíváme (myšlenky vlastními slovy)

| Myšlenka | Kam |
|---|---|
| **RECIPE** (co řeknu · co má AI k dispozici · konkrétní kroky · jak poznám dobrý výsledek · formát · příklad správné věci) jako kontrolní seznam při psaní i opravě postupu | skryté v krocích 2–4, výslovně ve workshopu 2 |
| **Z povedené konverzace postup** (shrnout kroky, kritéria, formát, přiložit vzorový výstup) | konec workshopu 1, workshop 2 |
| **Oprava podle typu chyby** (chybí krok → kroky; špatný vzhled → příklad; obecný tón → ideální výsledek; počty → skript) | workshop 2 |
| **ELITE:** výstup použitelný mimo chat, logicky uspořádaný, s úsudkem, ušitý na míru, dotažený vzhledem | reporty, ukázka v představení |
| **Svázat výstupy se vstupy a stanovit kritéria** (méně vymýšlení čísel) | reporty |
| **Kontextové preference** (e-mail jinak pro kolegu, klienta, vedení) | kroky 2–3 |
| **AI navrhne, co automatizovat**, s varováním, že postup zamyká jeden způsob | workshop 2 |

Texty skillů Dashboard It a File Organizer jsou pod CC BY 4.0 (smí se s uvedením zdroje). Ostatní jen jako inspirace. Poznámky: [[agent-skills-modul-2]], [[agent-skills-modul-4]].

## 6. Co je třeba udělat, aby workshop 1 šlo odvést (příprava)

Hotové máme tři ze čtyř kroků. Zbývá:

1. **Přehled termínů a úkolů** (krok 4): nový skill/postup + návod. Zjednodušená verze Lenčina denního plánu. Kandidát na nejmenší funkční tvar: ze vložených e-mailů a poznámek vytáhne termíny a závazky, seřadí je a navrhne pořadí.
2. **Sada reportů** (workshop 2): skill „report z tabulky“ (RECIPE: kroky, kritéria, formát, příklad) a ukázková data.
3. **Úpravy balíčku podle zpětné vazby Štěpánky** (vysoká priorita): krátká cesta (`C:\dgs`), kontrola délky cest ve skriptech, citlivé údaje ve vzorcích, nevymýšlet fakta v osobním profilu, pojistky u pošty. Zapsáno v projektu [[digistart]].
4. **Blok „pod pokličkou“** (co je skill, kde leží, jak se opravuje): na to se Štěpánka sama ptala. Do workshopu 1 nebo 2.
5. **Ukázková data** bez citlivých údajů: zkušební složka (fiktivní soubory s duplicitami), pár fiktivních e-mailů, fiktivní tabulka.
6. **Kontrolní seznam technické přípravy** pro firmu (instalace, přihlášení, kdo smí co, jak poznat, že konektor pošty povolen) a **záložní cesta pro poštu kopírováním**.
7. **Scénář pro lektorky** (kdo co říká v které minutě) a **jednostránkový handout** pro účastníky (tři způsoby práce, šablona zadání, co smí a nesmí do AI).
8. **Zkouška na Team účtu**: projít scénář na místě Standard, ověřit limity a hlavně to, zda se u každého kroku dá v čase dojít k „minimu na místě“ (viz oddíl 3). Zatím máme časy jen z jednoho člověka.

## 7. Rizika

- Technika před obsahem: instalace, účty, oprávnění (proto společná příprava).
- Konektor pošty vyžaduje souhlas správce; workshop musí fungovat bez něj.
- Citlivá data: cvičení jen na fiktivních a vlastních neciťlivých vzorcích; lektorky nikdy nemají přístup do firemní pošty ani na disky. Ve zkušebním průchodu se ve vzorku objevilo heslo.
- Vymýšlení faktů: v osobních profilech místo nejistého `[DOPLNIT]`.
- Skupinová verze se zkouší poprvé; dosavadní zkušenost je z jednoho člověka.

## 7b. Audit slibů v nabídce (261012 večer): co zvládneme a co závisí na firmě

- **Hotové a vyzkoušené (u jedné uživatelky, Štěpánky):** úklid souborů, styl psaní (profily), koncepty e-mailů, vysvětlení „pod pokličkou“, recept na postup.
- **Dá se postavit, ještě nestojí:** postup „přehled termínů a úkolů“, „report z tabulek“, „druhý pohled před rozhodnutím“, „kde něco chybí“, týdenní přehled pro vedení; ukázková data, scénář, průvodce, návod k zprovoznění. Vše jsou vzory, které umíme (vlastní systém, kurz Build Anything / Agent Skills); chce to postavit a vyzkoušet.
- **Závisí na firmě, nemáme pod kontrolou:** (1) propojení s firemním Microsoft 365 (souhlas globálního správce, psací nástroje pro koncepty zapíná správce; záložně kopírování nebo klasický Outlook + skript); (2) právo instalovat aplikaci na služební notebook; (3) skripty úklidu jsou pro Windows a PowerShell, firemní zásady mohou spouštění skriptů blokovat, na Macu nefungují; (4) limity Standard místa při 15 lidech zároveň (neověřeno).
- **Slib, který je potřeba zpřesnit v nabídce:** „odesílá vždy a jen člověk“ platí pro náš postup (skill nikdy neodesílá), ale nemusí platit technicky u konektoru, pokud správce zapne psací nástroje včetně odesílání. Přesnější: „náš postup nic neodesílá, odesíláte vy“ + doporučení odesílání v konektoru nezapínat.
- **Neověřeno:** jak se sdílí postupy (skilly) v Team plánu napříč týmem (týmový standard); předpoklady Claude Code na čistém firemním notebooku (např. Windows).
- **Před slibem firmě vyzkoušet:** celý workshop 1 na čistém Windows účtu s omezenými právy (nejlépe jako firemní notebook), s Outlookem a Team místem Standard.

## 8. Ne do nabídky, až v dalším kroku (HR)

Počet lidí a role, poštovní a kancelářský systém, smějí-li instalovat aplikace, kdo je správce Microsoft 365, pravidla německé centrály. Položí je Štěpánka nebo HR po zaslání nabídky.
