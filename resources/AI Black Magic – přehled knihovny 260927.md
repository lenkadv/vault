# AI Black Magic: přehled celé knihovny (260927)

Zdroj: konektor AI Black Magic (https://aiblackmagic.com), Pro trial do 27./28. 9. 2026. Souvislosti: [[HANDOFF – AI systém 260926]], [[katalog-moznosti]], [[hlasove-profily]], [[digistart]].

> **Pozor na čas:** všechny položky mají `is_free_accessible: false`. Po skončení trialu nebude přes konektor dostupné nic. Co chceš mít, musí se zkopírovat dnes nebo zítra.

**Staženo 260927 (mimo vault, nic nenainstalováno):** `G:\Můj disk\Databanka AI\AI Black Magic 260927\` (přesunuto 260927). Mapa ve vaultu: [[resources/postupy/databanka]], tabulka `resources/databanka/Databanka.base`. Obsahuje 13 pluginů, 27 tutoriálů, ~50 promptů v 6 souborech a 26 jednoduchých skillů, celkem 23 MB. Co je kde a k čemu (DigiStart / Evident / lcenglish), je v souboru `00 REJSTRIK – co je kde a k čemu.md` v té složce. Stahovalo se od nejsilnějších kandidátů a žádné omezení se neobjevilo.
**Vrstva 2 („nice to have“, 260927):** +7 pluginů, +15 tutoriálů (vč. 18 promptů na weby), +5 souborů promptů (vč. instrukcí 14 Custom GPTs a znalostních souborů 300 Hooks a Image Prompting Guide), všech 49 jednoduchých skillů a 9 sad obrázkových promptů (~415). Celkem 33 MB, popis v sekci „VRSTVA 2“ rejstříku.
**Vrstva 3 (dočištění, 260927):** poslední 2 skilly/pluginy (Contract Writer, E-Commerce Seller), takže **všech 70 skillů a pluginů je staženo**; 6 tutoriálů (Cowork, Second Brain + šablona, slovníček AI pojmů česky, Lights Camera Prompt, Google AI Studio), 12 promptů (sociální sítě, vyjednávání, e-mailové kampaně) a 7 obrázkových sad. Celkem 51 MB, sekce „VRSTVA 3“ rejstříku.

**Značení stáří:** 🟢 = rok 2026 · ⚪ = rok 2025 (spíš zastaralé; výjimkou jsou nadčasové základy promptování)

**Obsah:**
- A. Tři pohledy: DigiStart (§1) · Evident (§2) · marketing lcenglish a tadylenka (§3)
- B. Katalog celé knihovny (§4–§14)

---

# A. TŘI POHLEDY

## 1. DigiStart (se Štěpánkou Uličnou)

**Proč se knihovna hodí:** Black Magic cílí na solopodnikatele, kteří chtějí AI místo placených služeb. To je přesně úhel DigiStartu. Hodně věcí je ale pokročilejších, než účastnice potřebuje: je to Claude Code, agenti, automatizace v Make a Cowork. Níže jsou položky seřazené podle bloků osnovy v [[digistart]]. Jako **pokročilé** jsou označené ty, které by šly nanejvýš do ukázky „kam to jde dál“.

### Nejsilnější kandidáti (přečetla jsem je celé)
- 🟢 **Automate Personal Busy Work** (skill/plugin, úroveň Beginner). Nejlepší materiál pro DigiStart v celé knihovně, **jako metoda do lekce, ne jako software**:
  - Rozhovor „přetáčí týden pozpátku“ a hledá neviditelnou práci: „co jsi dělala víckrát“, „co jsi kopírovala z místa na místo“, „co by na tebe čekalo po 2 týdnech nepřítomnosti“.
  - Úkoly hodnotí prostou aritmetikou: 4minutový úkol denně vydá víc než 90minutový jednou za měsíc.
  - Úkol rozdělí na mechanickou část a úsudek.
  - Úkoly řadí do tříd: **A** běží samo · **B** AI připraví, ty schválíš · **C** děláš sama, ale rychleji · **D** neautomatizovat.
  - Vede **seznam věcí ke zrušení** („nejlepší automatizace je úkol, který není potřeba“).
  - Když nejde nic naplánovat, navrhne **spouštěč**: opakovanou událost v kalendáři s promptem v poznámce.
  - Počítá s tím, že vydrží 2 z 5 automatizací.
  - Funguje i bez propojených nástrojů. Přesně pro člověka, který AI zatím používá jako vyhledávač.
- 🟢 **Four Connectors, Not Forty** (tutoriál, Beginner). Srozumitelný model **Zdroj → Úsudek → Výroba → Cíl**: odkud AI bere podklady, kdo jí dá měřítko kvality, kde vzniká výsledek a kam musí dorazit. Plus pravidlo „připoj jen to, co ti ušetří ruční kopírování“. Obsahuje 5 hotových sestav: tvůrce obsahu, lokální živnost, konzultant, e-shop, tvůrce kurzů. Dobrý rámec pro blok o nahrazování placených služeb.
- 🟢 **One-Person Agency Prompt** (137 ♥). Jeden prompt, ze kterého vznikne hlas značky ve 3 slovech, pozicování v jedné větě, 3 pilíře sdělení, příběh značky na 50 slov, 30denní obsahový kalendář, 3 reklamy, 5 uvítacích e-mailů a týdenní checklist na méně než 5 hodin. **Ideální jako závěrečný praktický úkol bloku C.**
- 🟢 **Claude for Small Business** (tutoriál, Beginner). Oficiální bezplatný plugin od Anthropicu s 15 postupy (pondělní přehled, upomínky faktur, stížnost zákazníka, kontrola smlouvy…). Nástroje jsou americké (QuickBooks, HubSpot) a běží jen v Coworku, takže se hodí jako **ukázka**, co jde. Užitečný je týdenní rytmus: „pondělí přehled, úterý obchod, středa zákazníci…“.
- 🟢 **AI Operations Automation Playbook** (98 ♥). Krátký prompt: „vypiš 3 úkoly, které ti žerou čas“ → AI každý ohodnotí a dá návod krok za krokem. Pro začátečnice ideální.

### Blok A: AI bez žargonu (AI jako osobní asistentka)
- Orientace: 🟢 3 Must-Have AI Tools Mid-2026 · 🟢 ChatGPT or Gemini for Images? · 🟢 How To Use Claude Projects · 🟢 Give Claude a Memory · 🟢 Teach Claude Your Workflows · ⚪ Which LLM to use? (zastaralé) · ⚪ Mastering NotebookLM (starší, NotebookLM je ale pro začátečníky ideální)
- Jak se s AI domluvit: ⚪ návody Primer / Ask Questions / Act As / Break It Down / 7 Common Mistakes in Prompting (starší, ale **nadčasové**) · 🟢 The Loop Is the New Prompt
- Na co si dát pozor: ⚪ Critical Thinking Mode · ⚪ ChatGPT Fact Checks Itself · ⚪ Independent Thought (myšlenka „nech AI oponovat a ověřit se“)
- Místo placených služeb: 🟢 Build Your Own Wispr Flow (diktování zdarma) · 🟢 Your Day, Printed (denní přehled k tisku) · 🟢 skilly Proposal Writer / Contract Writer / Invoice Template / Pricing Calculator / FAQ Generator · 🟢 Build Your Own AI Command Center (spíš pokročilé)
- Produktivita: ⚪ Energy-Aware Work Planning · ⚪ Priority Matrix · ⚪ Personal Time Management · 🟢 Weekly Time Audit · 🟢 Decision-making Framework Generator

### Blok B: vizuální obsah
- 🟢 **Google Pomelli** (tutoriál): bezplatný marketingový nástroj Googlu pro malé firmy, přímo pro cílovku
- 🟢 ChatGPT or Gemini for Images? · ⚪ Image Prompting 101 · ⚪ Nano Banana · ⚪ 15 Nano Banana Photo Edits · ⚪ **Restore Old Photo** (vděčné „wow“ pro 40+)
- 🟢 obrázkové sady Product Photo Styles · Natural UGC Images · Social Media & Marketing Graphics · Camera Angles · Lighting Styles · Portrait & People
- 🟢 skilly Brand Kit (67 ♥) · Social Media Graphics · Launch Assets Package
- 🟢 Websites That Don't Look Made by AI · 🟢 Stop Shipping AI Slop (poznat a nevyrábět „AI vzhled“)
- ⚪ Simple Photo To Professional Marketing Video · ⚪ Sora 2 Photo To Animated Video

### Blok C: sociální sítě a viditelnost
- 🟢 **One-Person Agency** (viz výše) · 🟢 Viral Hook Generator (133 ♥) · 🟢 Cold DM That Actually Works · 🟢 Social Media God Prompt (160 ♥, pokročilejší, ale jako „ukázka síly“ funguje)
- 🟢 skilly Content Calendar Planner · Content Repurposer · Social Media Audit · plugin Claude Social Magic Agent (74 ♥)
- 🟢 prompty z února 2026: Caption Writing Mastery · Stories Content Strategy · Carousel Design · Bio & Profile Optimization · Instagram Growth Strategy Blueprint · Hashtag Strategy · Community Building & Audience Loyalty
- 🟢 **The Local Business Magnet** (plugin): profil na Googlu, žádosti o recenze, odpovědi na recenze. Hodí se, pokud mezi účastnicemi budou živnostnice.
- ⚪ Brand Voice Identification · ⚪ Storytelling Social Media Posts · ⚪ Behind-The-Scenes Post Ideas

### Blok D: kancelář a AI
- 🟢 The SpreadSheet Analyzer (plugin) · 🟢 The Four Microsoft Copilots (tutoriál) · 🟢 Meeting Notes Organizer · ⚪ Spreadsheet Formulas · ⚪ PowerPoint Creation

### Pro stavbu samotného kurzu (práce pro vás lektorky)
- 🟢 **Course Creator Plug-In** (58 ♥, 14 skillů: osnova, scénáře lekcí, prezentace, **pracovní listy**, prodejní stránka). Tady má kurzová část knihovny své místo. lcenglish už kurzy má.
- 🟢 Course Outline Designer · Webinar Planner · Survey Builder (zpětná vazba účastnic) · Lead Magnet Creator · Sales Page Writer
- 🟢 Samotné tutoriály jako **vzor formátu** výukových materiálů: úroveň („Beginner“), doba čtení, sekce „kde to selhává“, „co udělat tento týden“.

### Pro DigiStart příliš pokročilé
Claude Code, Codex, sub-agenti, Kimi K3, vibe coding (Lovable), Make/n8n automatizace, pixely TikTok/Facebook, Cowork dashboardy (jen jako ukázka).

---

## 2. Evident: školení AI pro střední management v korporátu

Zadání ještě není upřesněné, schůzka teprve bude. Cílovka: lidé bez času nástroje zkoumat, pracují v týmech, s tabulkami, poradami a reporty. Korporáty obvykle běží na Microsoft 365.

### Nejsilnější kandidáti
- 🟢 **Automate Personal Busy Work.** Skill výslovně míří i na „lidi uvnitř větší organizace s opakující se částí práce“. Rozhovor + třídy A–D + seznam ke zrušení + rozdělení úkolu na mechaniku a úsudek (např. hodnocení uchazečů = filtr podle kritérií × rozhodnutí o pohovoru; měsíční report = sestavení čísel × doporučení). **Hotová kostra workshopu.**
- 🟢 **The Four Microsoft Copilots** (tutoriál): v korporátu pravděpodobně klíčová věc, co mají k dispozici.
- 🟢 **Custom GPTs vs Workspace Agents** · 🟢 **Your AI Needs an Org Chart** · 🟢 **How to Pick Your First AI Agent** · 🟢 **The AI Agent Playbook** · 🟢 Jev: The AI That Only Decides (AI jako podpora rozhodování)
- 🟢 **Your AI Bill Has Four Leaks** (náklady na AI, argument pro vedení)
- 🟢 Four Connectors, Not Forty (hlavně pasáž „víc připojených nástrojů = horší výsledky“ a „čtení vs. zápis“)

### Týmová a manažerská práce
- 🟢 skilly: The SpreadSheet Analyzer · Weekly Report Generator · Meeting Notes Organizer · SOP Builder · Project Tracker · SWOT Analysis · Vendor Evaluation · Annual Business Review · Customer Support Knowledge Base
- 🟢 tutoriál SOP Extraction from Loom (postupy z nahraného videa)
- 🟢 **prompty z února 2026** (dlouhé rámce, texty ke zkopírování):
  - Porady a spolupráce: Meeting Facilitation & Effectiveness · Meeting Optimization & Time Recovery · Cross-functional Collaboration & Alignment · Remote Team Management
  - Lidé: Delegation Framework & Task Transfer · Conflict Resolution & Difficult Conversations · Feedback Culture · Performance Review System · Onboarding System & First 90 Days · Manager Development Program · Talent Retention · Employee Wellness & Burnout Prevention
  - Řízení: Decision-making Framework Generator · Strategic Planning & Cascading Goals · Goal Setting & OKR · KPI Dashboard Design · Project Management System Architect · Risk Assessment · Organizational Restructuring & Change Management · Crisis Management · Board Management & Governance
  - Osobní efektivita manažera: Email & Communication Management System · Weekly Time Audit · Focus State & Deep Work · Information Management & Knowledge System
- 🟢 Claude For Legal (13 pluginů zdarma) a z tutoriálu Small Business i další oficiální pluginy: productivity, data, finance, enterprise-search. Spíš jako přehled, co existuje.
- Bezpečnost dat: tutoriál Small Business cituje průzkum, podle kterého je bezpečnost dat největší obava. Na korporátním školení se na ni určitě zeptají.

---

## 3. Marketing pro lcenglish a tadylenka (sociální sítě, video)

lcenglish už kurzy má, takže z knihovny potřebuje **marketing**. Sociální sítě a video jsem v první verzi odsunula, ale zajímavé jsou tam, kde práci zjednoduší. A patří jako modul i do DigiStartu (§1, blok C).

- **Video:** 🟢 YouTube Video Factory · 🟢 The Video Production Operator · 🟢 Faceless YouTube Operator · 🟢 Video Script Writer · 🟢 Build a YouTube Channel With Claude · 🟢 Make It Cinematic · 🟢 Assets First, Then Animate · 🟢 Hyperframes vs Motion vs Remotion · 🟢 Make Videos with Google Omni · 🟢 Podcast Show Notes
- **Sociální sítě a recyklace obsahu:** 🟢 Content Repurposer · 🟢 The AI Content Team · 🟢 Claude Social Magic Agent Plugin · 🟢 Content Calendar Planner · „30 Days of Content“ (plugin zmíněný v tutoriálu Four Connectors, v seznamu knihovny jsem ho nenašla) · sestava SparkToro → skill → Canva → **Metricool** (Metricool už máme v GrowOS)
- **E-mail pro lcenglish:** 🟢 Newsletter Builder · 🟢 Email Sequence Builder · 🟢 Win-Back Campaign · 🟢 Testimonial Collector · 🟢 Lead Magnet Creator · 🟢 prompty Welcome Sequence Architect / Re-engagement / Subject Line Mastery (viz §9)
- **tadylenka:** článek na Substacku → útržky na sítě (Content Repurposer); styly obrázků pro vizuály (🟢 Bauhaus, Risograph & Zine, Cyanotype, Film Noir, Vintage Poster); ⚪ Pinterest prompty (vizuální umělecký obsah; starší)
- Většina se překrývá s GrowOS skilly (social-write, content-repurpose, youtube-package, video-script, carousel-create). Nové je hlavně **video** a **recyklace obsahu jako systém**.

---

# B. KATALOG CELÉ KNIHOVNY

## 4. Co to celé je

Placená knihovna „AI obsahu pro solopodnikatele“, anglicky, zaměřená na marketing malých firem. Vznikala ve vrstvách:
- ⚪ **Červenec–prosinec 2025:** stovky krátkých promptů pro ChatGPT generovaných podle šablony (reklamy, TikTok, YouTube titulky, životopisy), Custom GPTs, automatizace, návody. Hodně se opakují a jsou mělké.
- 🟢 **Únor 2026:** asi 290 dlouhých „frameworkových“ promptů (strategie, řízení lidí, e-maily, SEO, sociální sítě) a 60 základních Claude skillů.
- 🟢 **Březen–duben 2026:** 9 nejoblíbenějších promptů v celé knihovně (Social Media God Prompt, One-Person Agency…).
- 🟢 **Od května 2026:** pluginy (balíky skillů) a týdenní tutoriály o nových nástrojích.

## 5. Čísla podle typů

| Typ | Počet | Z roku 2026 |
|---|---|---|
| Prompty | ~900 | ~300 |
| Obrázkové / video prompty | ~175 | ~50 |
| Skilly a pluginy | 70 | **všech 70** |
| Tutoriály | 68 | ~53 |
| Návody | 9 | 0 |
| Custom GPTs | 15 | 0 |
| Automatizace | 20 | 0 |

Stránkování konektoru se u promptů překrývalo, takže pár titulů mohlo vypadnout.

## 6. Skilly a pluginy (70, všechny 🟢 2026)

Legenda: **G** = podobný skill už máme v GrowOS · **P** = překrývá se s Productivity Packem nebo vault skillem · **nové** = nic podobného nemáme

### Pluginy (květen–září 2026)
| Název | ♥ | O čem | Vztah k nám |
|---|---|---|---|
| Humanize Writing Claude Plugin | 91 | 13 skillů: hlasový profil, AI stopy, přepis, skóre | nové; [[hlasove-profily]], viz §7 |
| Claude Social Magic Agent Plugin | 74 | sociální sítě | částečně G · DigiStart C |
| Brand Kit Skill | 67 | brand kit | DigiStart B |
| Google Stitch Website Redesign | 63 | redesign webu | nové |
| Course Creator Plug-In | 58 | tvorba kurzu | **DigiStart (stavba kurzu)** |
| Faceless YouTube Operator | 38 | YouTube bez tváře | lcenglish video |
| The E-Commerce Seller Plugin | 23 | e-shop | nové |
| The Design Director Plugin | 21 | designový dohled | částečně (impeccable-*) |
| The Local Business Magnet | 18 | Google profil, recenze | DigiStart C |
| Client Delivery Operator | 14 | dodávka práce klientům | nové; konzultace (GNOSTIKA, PENTA) |
| YouTube Video Factory | 14 | výroba videí | lcenglish video |
| Automate Personal Busy Work | 13 | audit týdne → automatizace | **DigiStart A + Evident** |
| The AI Content Team | 13 | obsahový tým agentů | částečně G |
| The Video Production Operator | 12 | video | lcenglish video |
| The Automation Architect Plugin | 8 | návrh automatizací | nové (pokročilé) |
| Your Day, Printed | 7 | denní přehled k tisku | P; DigiStart A |
| The SpreadSheet Analyzer | 5 | analýza tabulek | **Evident**, DigiStart D |
| 15 Sub-Agents, Cheaper Than One | 3 | úspora přes subagenty | pokročilé |

### Jednoduché skilly (únor 2026)
- **Obsah a copy:** Blog Post Writer (G), Sales Page Writer (G), About Page Writer, Ad Copy Generator (G), Product Description Writer (G), Press Release Writer, FAQ Generator, Lead Magnet Creator (G), Case Study Writer, Video Script Writer (G)
- **E-mail:** Newsletter Builder (§8), Email Sequence Builder (G), Cold Outreach Sequences (G), Win-Back Campaign, Upsell Sequence Builder
- **Sociální sítě:** Content Calendar Planner, Content Repurposer (G), Social Media Graphics, Social Media Audit, YouTube Thumbnail Generator
- **Značka:** Brand Voice Guide, Brand Refresh Tool, Launch Assets Package
- **Klienti a prodej:** Proposal Writer, Contract Writer, Pitch Deck Creator, Testimonial Collector, Affiliate Program Builder, Client CRM Builder
- **Strategie:** SWOT Analysis, Competitor Analysis, Product Roadmap, Vendor Evaluation, Annual Business Review, Weekly Report Generator
- **Provoz:** SOP Builder, Project Tracker, Pricing Calculator, Invoice Template, Expense Tracker, Return Policy Generator, Customer Support Knowledge Base
- **Vzdělávání:** Course Outline Designer, Webinar Planner (G), Survey Builder, Event Planner, Podcast Show Notes
- **Tým:** Meeting Notes Organizer, Job Posting Writer, Employee Handbook, Agency Onboarding System

## 7. Humanize Writing plugin, rozbor (🟢, staženo)

13 skillů ve standardním formátu Claude Code (`skills/<název>/SKILL.md`). Nepotřebuje Cowork.

| Skill | Co dělá |
|---|---|
| humanizer-setup | Pohovor + 3–5 vzorků → `config.json` s hlasovým profilem |
| voice-profile-builder | Profil v 5 dimenzích (tón, rytmus, slovník, zvláštnosti, co ano/ne); umí profil pro jiného člověka |
| ai-tell-detector | 8 typů AI stop + skóre |
| humanizer-engine | Přepis do tvého hlasu, fakta zůstávají |
| fact-guard | Kontrola, že přepis nic nevymyslel ani neztratil |
| rhythm-and-flow-editor | Rytmus vět, test čtením nahlas |
| cliche-and-jargon-scrubber | Klišé a vata |
| specificity-injector | Vágní → konkrétní (nevymýšlí, ptá se) |
| story-weaver | Anekdoty (nevymýšlí, vytahuje je rozhovorem) |
| platform-adapter | E-mail / LinkedIn / X / blog / YouTube |
| human-score-grader | Skóre 0–100 v 8 dimenzích |
| batch-humanizer | Dávka textů |
| style-guide-generator | Export profilu jako stylistická příručka + blok do promptu |

Zjištění:
- ✅ Dobré pojistky: fact-guard a zákaz vymýšlet.
- ⚠️ **Chybí `config.example.json`**, bez něj setup nejde spustit.
- ⚠️ Katalog AI stop je **jen anglický**.
- ⚠️ Počítá s jedním hlasem, ne se šesti.
- Nepřekrývá se s `jon-benson-voice-hacks`: ten je pro mluvený hlas.
- *DigiStart / Evident:* „jak poznat AI text“ (8 stop) je hotová mini-lekce.

## 8. Newsletter Builder, rozbor (🟢, staženo)

- Brief (8 otázek) → text → Canva → PDF + čistý text → Notion.
- Struktura: předmět do 50 znaků, preview text, háček 2–3 věty, 2 sekce, rychlé tipy, **právě jedna výzva k akci**.
- Technicky by u nás běžel (Notion i Canvu máme připojené). Hodnota je hlavně v kontrolním seznamu; Canva/PDF se pro Drip nehodí.

## 9. Prompty na newslettery (22)

**A) Krátké šablony „jsi expert na newslettery…“ (11, všechny ⚪ 2025).** Menu formátů: Tip-of-the-Week (tip 200 + rozbor 300 slov), Educational Monthly (návod + novinky), Bi-Weekly Behind-the-Scenes, Bi-Weekly Thought Leadership, Bi-Weekly Trends, Monthly Thought Leadership & Q&A, Monthly Engagement, Monthly Success Story, Monthly Authority Positioning, Insights-Focused Weekly, Weekly News Corner / News Summary / BTS & Opinion / Product Spotlight, Quarterly Highlights.

**B) Strategické rámce (11, všechny 🟢 únor 2026):**
| Prompt | ♥ | Co z něj vypadne |
|---|---|---|
| Lead Nurturing Sequence Architect | 49 | péče o potenciální zákazníky |
| Content-driven Email Newsletter | 41 | poměr obsahu, pojmenované sekce, kalendář, segmentace nový × dlouholetý × neaktivní |
| Welcome Sequence Architect | 30 | uvítací série |
| Newsletter Idea Builder | 29 | pilíře, **52 námětů na rok**, opakující se sekce, péče o seznam |
| Subject Line Mastery System | 28 | 15+ vzorců předmětů, A/B testy |
| Educational Email Drip Campaign | 27 | vzdělávací série |
| Newsletter Optimization Framework | 21 | audit newsletteru, 3měsíční plán testů |
| Re-engagement Campaign Strategist | 18 | probuzení neaktivních |
| Advanced Segmentation Strategy | 16 | segmentace |
| A/B Testing Framework for Email | 11 | testování |
| Deliverability Optimization Guide | 5 | doručitelnost |

⚪ Automatizace Newsletter Writer (Make + ChatGPT čte cizí newslettery → náměty) = princip [[svodka-newsletteru]].

## 10. Prompty (~900) podle skupin

| Skupina | Cca | Stáří | Příklady | Kam se hodí |
|---|---|---|---|---|
| **Top 9 (březen–duben 2026)** | 9 | 🟢 | Social Media God Prompt (160), One-Person Agency (137), Viral Hook Generator (133), 90-Day Business Growth Blueprint (116), AI Operations Automation Playbook (98), Instant Competitor Intelligence Report (83), Cold Outreach That Gets Replies (72), Cold DM That Actually Works (65), Investor Pitch That Gets Meetings | DigiStart, lcenglish |
| **Řízení lidí a organizace** | 40 | 🟢 | Meeting Facilitation, Delegation, Conflict Resolution, Onboarding 90 dní, Board Governance, Restructuring | **Evident**, konzultace, EK KTF |
| **Byznys strategie a analýzy** | 45 | 🟢 | Strategic Roadmap (60), Market Research Synthesis (60), Product-market Fit, Pricing, KPI Dashboard | Evident, konzultace |
| **Osobní produktivita (systémy)** | 25 | 🟢 | Habit Stacking, Deep Work, Burnout Prevention, Weekly Time Audit, Decision-making, Email & Communication Management | Evident, DigiStart A |
| **Osobní produktivita (krátké)** | 10 | ⚪ | Energy-Aware Planning, Priority Matrix, Morning Routine, Deep Work Scheduling | DigiStart A |
| **Osobní značka a autorita** | 30 | 🟢 | Speaking Topics, Podcast Guest, Media Pitch, Book & Ebook Outline (42), LinkedIn Profile Optimization (62) | vlastní značka, Evident (LinkedIn) |
| **E-mailové kampaně** | 35 | 🟢 | viz §9, Product Launch, Webinar Promotion | lcenglish |
| **Prodej a vyjednávání** | 30 | 🟢 | Objection Handling, Negotiation, Pricing Psychology, Discovery Framework | konzultace, Evident |
| **Obsahová strategie a psaní** | 35 | 🟢 | Hook Writing, Storytelling Framework, Headline Formulas, Editorial Calendar, Ghostwriting, Brand Voice Bible (44) | tadylenka, lcenglish, DigiStart C |
| **Sociální sítě (strategie)** | 25 | 🟢 | Instagram Growth Blueprint (83), Carousel, Reels, Stories, Captions, TikTok, YouTube Strategy | DigiStart C, lcenglish |
| **SEO** | 35 | 🟢 | Keyword Research, Technical SEO, Local SEO, E-E-A-T, Programmatic SEO | weby |
| **Nápady na produkty a byznys** | 30 | 🟢 | Digital Product Ideation (43), Course Creation Planner, Content Idea Machine (59), Side Hustle Generator | DigiStart |
| **Reklamy FB / Google / pixely** | 200 | ⚪ | Google Ads Headline Creator, Facebook AIDA Ad, TikTok Pixel Setup | zastaralé |
| **UGC a video skripty** | 60 | ⚪ | UGC Video Ad (PAS/AIDA), YouTube Q&A Script | zastaralé |
| **YouTube titulky** | 40 | ⚪ | Curiosity-Driven Title… | zastaralé |
| **Instagram / TikTok / Pinterest / LinkedIn (krátké)** | 60 | ⚪ | Pinterest Content Engine, LinkedIn Lead Gen, Instagram Story plány | spíš zastaralé |
| **Hlas a „lidský“ text** | 8 | ⚪ | Remove Overused Phrases (101), Remove Em Dash (86), AI Writes Like You (51), Avoid AI Detectors | nahrazeno Humanize pluginem (🟢) |
| **Myšlení a kvalita AI** | 8 | ⚪ | Critical Thinking Mode (40), Independent Thought, Fact Checks Itself, Deep Research Prompt Generator | myšlenka nadčasová |
| **Životopisy a motivační dopisy** | 30 | ⚪ | ATS Resume, Narrative Cover Letter | |
| **ChatGPT-specifické úlohy** | 10 | ⚪ | Schedule Tasks in ChatGPT, Book Summarizer Daily Task, Generate Content From Books, GPT Tutor | myšlenka: naplánované úlohy |
| **Ostatní** | 20 | ⚪ | e-commerce, franšízy, nemovitosti, neziskovky | |

## 11. Tutoriály (68)

- **Claude:** 🟢 Claude Code Complete Beginner's Guide · ⚪ Claude Skills: What They Are · 🟢 Teach Claude Your Workflows · 🟢 Give Claude a Memory · 🟢 How To Use Claude Projects · 🟢 How to Use Claude Design · 🟢 Claude Works While You're Gone · 🟢 Build Your First AI Agent with Claude · 🟢 Claude for Small Business · 🟢 Claude For Legal · 🟢 Build Your Own AI Command Center
- **Cowork** (u tebe nejede): 🟢 Complete Guide to Cowork · 🟢 Daily AI Dashboard in Cowork (67) · 🟢 Marketing System in Cowork (38)
- **Postupy a agenti:** 🟢 AI Agent Playbook · 🟢 How to Pick Your First AI Agent · 🟢 Your AI Needs an Org Chart · 🟢 The Loop Is the New Prompt · 🟢 Four Connectors Not Forty · 🟢 Your AI Bill Has Four Leaks · 🟢 Jev: The AI That Only Decides · 🟢 Company OS on Kimi K3 · 🟢 Clawdbot/Moltbot
- **Znalosti:** ⚪ Mastering NotebookLM · 🟢 Second Brain with Claude and Obsidian · 🟢 SOP Extraction from Loom
- **Web a design:** 🟢 Websites That Don't Look Made by AI · 🟢 Steal These 8 Websites · 🟢 Stop Shipping AI Slop · 🟢 Landing Page Design Prompts · 🟢 50 Top Brand's Design Guide md Files · 🟢 Google Stitch · 🟢 Google AI Studio · 🟢 Weavy AI · ⚪ Vibe Coding with Lovable
- **Obrázky a video:** 🟢 ChatGPT or Gemini for Images? · ⚪ Image Prompting 101 · ⚪ Nano Banana · 🟢 AI Image Camera Angles · 🟢 Make It Cinematic · 🟢 Lights Camera Prompt · 🟢 Assets First Then Animate · 🟢 Hyperframes vs Motion vs Remotion · 🟢 Google Omni · ⚪ Sora 2 · ⚪ Best AI Image Generator 2025
- **Marketing:** 🟢 Brand Ranked Inside LLMs (AEO/GEO) · ⚪ AI in Email Marketing · 🟢 Static Ad Generator · 🟢 Google Pomelli · 🟢 Meta's Muse · 🟢 Can AI Buy From You? · ⚪ AI Voice Agents · 🟢 YouTube Channel With Claude
- **Přehledy nástrojů:** 🟢 3 Must-Have AI Tools Mid-2026 · ⚪ Which LLM to use? · 🟢 3 New Gemini Models · 🟢 ChatGPT: Sol Terra & Luna · 🟢 The Four Microsoft Copilots · 🟢 Codex vs Claude Code · 🟢 Custom GPTs vs Workspace Agents · 🟢 The Astra Reality Check · 🟢 Build Your Own Wispr Flow
- **Terminologie:** ⚪ AI Terminologies Explained 1–4 · ⚪ 7 Common Mistakes in Prompting

## 12. Návody (9, všechny ⚪ 2025, nadčasové)
Chain of Thought, Zero-Shot vs Few-Shot, Prompting for Different Modalities, The Art of Iteration, Prompt Engineering Basics, Primer Method, Break It Down, Act As, Ask Questions. Hodí se pro DigiStart A.

## 13. Custom GPTs (15, všechny ⚪ 2025)
U každého je vidět celá systémová instrukce, takže se dá přepsat na skill.
- Humanizer (120): proofreader s kontrolním seznamem a zákazem dlouhých pomlček
- The Social Strategist (94) · Website Audit GPT (89) · Social Media Content Calendar (87) · Email Marketing Maestro (75) · The SEO Architect (75) · Precision Prompt Enhancer (74) · Video Hook Assistant (70) · Business Idea Validator (70) · Lead Marketing Strategist (70) · Strategic Business Advisor (69) · Executive Development Coach (63) · Research Prompt Master (62) · AI Image Prompt Writer (58) · Athena (55)
- *DigiStart:* „vlastní GPT / Projekt s instrukcemi“ je dobrá lekce. Tyhle instrukce jsou vzorové příklady, jak takové instrukce napsat.

## 14. Automatizace (20, všechny ⚪ 2025) a obrázkové prompty

**Automatizace (Make/n8n):** Newsletter Writer, Email Auto Reply Drafter / Sender, Email Categorization, ChatGPT Email Assistants, Scheduled Blog Writer, Blog To Social Post, Repurpose Social Content, Automated Social Posts (68), Reddit Scraper, Lead Gen From Google Maps, LinkedIn URL Finder, Personalized Sales Email, Proposal Drafter, Calendar Event Confirmation, Instagram Comment Auto-Reply 1+2, Slack ChatGPT Assistant, 2× scraping e-shopů. Pro DigiStart i Evident spíš pokročilé.

**Obrázkové / video prompty:**
- 🟢 Styly: Noir Dither, Liminal Space, Risograph & Zine, Exploded View, Y2K Chrome, Vintage Tour Poster, Isometric, Low Poly, Cyanotype, Double Exposure, Memphis, Retro Sci-Fi, Claymation, Vaporwave, Film Noir, Bauhaus
- 🟢 Užitkové: Infographic & Data Visualization, Coupon & Promo Graphics, App Store Mockups, Pitch Deck & Slide Visuals, Device Mockups, Packaging, Logo, Sticker & Merch, Drone, Ultra-Realistic Portrait, Pet Portrait, GPT Image 2 Text, 50 Images for Reels, 50 Design Assets, Home Video, 30 UI Style Guides, Worlds Next Door, 50 Street Photography, 50 Thumbnails, 50 Book Covers, Fake Film Screenshots, Faceless Instagram, Portrait & People, Social Media & Marketing Graphics, Interior, Fashion, Food, Lighting, Cinematic, Product Photo Styles, Natural UGC, Camera Angles
- ⚪ Instagram JSON Templates, Unique AI Image Prompts, Restore Old Photo, Nano Banana edits, produktové fotky, JSON prompting, asi 15 video sad a asi 90 tematických sad (krajiny, Historical Eras, Mythology, Maps, Libraries and Books…)

---

## K rozhodnutí
- Co zkopírovat nebo stáhnout, než trial skončí? Návrh priorit je v odpovědi v konverzaci z 260927.
- Humanize: převzít celý, jen strukturu, nebo nic?
