# Modul 1 — What are AI Agent Skills? (poznámky po lekcích)

Součást: [[coursera-agent-skills-for-leaders]] · [Kurz online](https://www.coursera.org/learn/agent-skills) · ~1 h · Poznámky vlastními slovy (261004), ne přepis.

## 1. Seeing Skills in Action (video)
[Lekce](https://www.coursera.org/learn/agent-skills/lecture/CH6Rb/seeing-skills-in-action)

Dvě ukázky téhož úkolu. **Bez skillu:** autor nahrál účtenky z cesty do ChatGPT a řekl „vytvoř vyúčtování“. Dostal obecnou tabulku, ale ne svůj formát: chtěl CSV se zvolenými sloupci a kategoriemi, a musel by to AI dlouze vysvětlovat. **Se skillem:** skill pro vyúčtování cest mu při jediné větě dodal CSV ve správném formátu, hezký dashboard s rozpadem výdajů a přejmenované účtenky (datum, dodavatel, kategorie) zabalené v zipu. Totéž zvládl i Claude, když dostal tentýž skill, tedy skill není vázaný na nástroj. Všechny dnešní chatovací nástroje jsou uvnitř agenti.

**Poučení:** skill učí agenta, jak chceš věci dělat, opakovaně.

## 2. Skilly jako výcvik na požádání (video)
[Lekce](https://www.coursera.org/learn/agent-skills/lecture/cw5tJ/skills-are-on-demand-training-for-ai-agents)

Metafora nového zaměstnance: dáš mu sadu manuálů. Když zadáš úkol, přečte názvy manuálů, vybere vhodný, přečte ho a udělá práci podle něj. Skill je přesně takový manuál v textu: postup, formáty, kontext, omezení. Agent si z dostupných skillů vybere ten, který odpovídá zadání (podle názvu a popisu). Nejde o drahé „trénování modelu“, píše to kdokoli.

## 3. Ruční vytvoření skillu (video)
[Lekce](https://www.coursera.org/learn/agent-skills/lecture/0sUc8/creating-a-skill-manually)

Nejjednodušší skill je dokument ve Wordu se třemi částmi: **název**, **popis (kdy skill použít)** a **instrukce (postup)**. Příklad: „osobní kouč výkonu“, který projde historii chatu, řekne jednu skrytou věc o uživateli, navrhne jednu změnu na týden a způsob měření, a výsledek dá do tabulky a CSV. V ChatGPT: účet vlevo dole → Skills → Nový skill → vytvořit v editoru, vložit tři části. V Claude je rozhraní trochu jiné. Pak stačí požádat o věc, která odpovídá popisu, a AI skill použije („used personal coach skill“).

**Doporučení autora:** začni skill psát sama (promyslet ho), teprve potom ho nech AI vylepšit („co mi chybí, co zkrátit“). Nejlepší skilly vznikají z lidského přemýšlení, ne z automatiky.

## 4. Dashboard skill (video)
[Lekce](https://www.coursera.org/learn/agent-skills/lecture/zVVGm/building-a-dashboarding-skill)

Jednoduchý skill „dashboard it“: popis obsahuje i **spouštěcí frázi** („kdykoli uživatel řekne dashboard it“), instrukce říkají projít celou konverzaci, vytáhnout záměr, klíčové entity a nejdůležitější poznatky, napsat HTML + JavaScript jako náhled v konverzaci a vysvětlit, jak ho stáhnout a otevřít v prohlížeči. Přidané designové zásady dávají hezký výsledek. Ukázky: obyčejná konverzace o počtu kliků dětí → dashboard; konverzace o matematice (PCA) → interaktivní vizualizace. Obecný přínos: stejná informace s vizuální podobou působí hodnotněji a lépe se čte i sdílí.

## 5. Skill na třídění souborů (video)
[Lekce](https://www.coursera.org/learn/agent-skills/lecture/pSmUg/building-a-file-organizer-skill)

Skill „organize files“: určit cíl a jak budeš soubory hledat → vymyslet jednotné pojmenování → navrhnout strukturu složek podle nejdůležitějšího rozměru → přejmenovat a uspořádat (odstranit duplicity) → zabalit do zipu a stručně vysvětlit logiku. Ukázka: 15 snímků obrazovky s názvy podle času; AI se na ně podívala a roztřídila je podle toho, co ukazují a jaký koncept z kurzu ilustrují (čtyři složky, README s vysvětlením). Napadá tě rodinné fotky, PDF, daňové skeny, výdaje podle rozpočtových kategorií.

## 6. Skill vytvořený v chatu přes „skill creator“ (video)
[Lekce](https://www.coursera.org/learn/agent-skills/lecture/NEO8v/creating-a-skill-in-chat-with-a-skill-creator)

Vytvoření skillu je samo skill: ChatGPT i Claude mají vestavěný skill creator. V ChatGPT „vytvořit pomocí chatu“, vložíš popis, co chceš, a AI vyrobí balíček, který si stáhneš a nainstaluješ. Kdy to stačí: když chceš rychle začít. Autor ale často dává přednost ruční tvorbě, protože **dobrý skill stojí na tvých znalostech a přemýšlení, ne na nástroji**. Mechanika je jednoduchá, těžké je vymyslet, co do skillu dát.

## 7. Create a Simple Skill (coach) a 8. Trying Out Your Skill (hodnocený úkol)
Zamčeno v kurzu, nestaženo. Z názvů: vytvořit jednoduchý skill a vyzkoušet ho. Zadání neznám.

## 9. Build & Try an Amazing Planning Skill (čtení)
[Lekce](https://www.coursera.org/learn/agent-skills/supplement/pqUtz/build-try-an-amazing-planning-skill)

Krok za krokem postavený skill `project-planning-dashboard`: (1) název a popis (kdy použít: nápad na projekt, rozsah, zápisy → plán s úkoly, závislostmi, odhady, riziky); (2) instrukce: analyzovat, rozdělit na fáze, konkrétní úkoly s ID, závislosti, odhady, poznámky a rizika, vyrobit dva výstupy; (3) **mysli odvážně o výstupech**: bohaté CSV (ID, název, fáze, závislosti, odhad, poznámky, rizika, role, priorita, odůvodnění) a moderní HTML dashboard s fázemi, Gantt časovou osou, kritickou cestou, riziky a souhrny; (4) vyzkoušet na vlastním projektu; (5) zvednout banální úkol (nákupní seznam, recept) na plán. Poučení: zeptej se, jaký výstup by byl neuvěřitelně cenný dostat okamžitě.

## 10. Co dál a komunita (čtení)
[Lekce](https://www.coursera.org/learn/agent-skills/supplement/RPlQV/learning-more-staying-connected)
Stejné doporučení jako u Build Anything: soukromá komunita na Circle, LinkedIn autora, navazující kurzy (Prompt Engineering for ChatGPT, Custom GPTs, ChatGPT Advanced Data Analysis, Generative AI primer), katalog promptových vzorců a práce o „Living Software Systems“.
