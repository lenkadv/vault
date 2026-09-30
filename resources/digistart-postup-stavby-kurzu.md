# DigiStart: jak stavíme kurz s AI (modelový případ)

Průběžný zápis postupu při stavbě pilotu [[digistart]]: kroky, nástroje a rozhodnutí tak, aby to podle nich mohl zopakovat i někdo jiný. Založeno 260930.

- Použij, až budeš řešit: jak postavit vlastní kurz s pomocí AI (pro sebe, pro klientku, nebo jako ukázku přímo v kurzu DigiStart).

## Nástroje

| Nástroj | K čemu | Poznámka |
|---|---|---|
| Claude (Claude Code v desktopové aplikaci) | vedení celého procesu, otázky, zápisy | pracuje přímo nad složkou s poznámkami |
| Obsidian (vault) | projektový soubor, podklady, tento zápis | vše v Markdownu, propojené odkazy |
| Skill `curriculum-design` (plugin Course Creator, AI Black Magic) | metodika stavby osnovy | zdroj: [[ABM – Course Creator]]; spuštěn přímo ze souboru, bez instalace |
| Databanka AI | kde se hledal vhodný nástroj | [[Průvodce Databankou]] |

## Postup

### Krok 0: Výběr nástroje (260930)
- Hledání v Databance podle slov „course“ a „kurz“ našlo dva kandidáty: plugin Course Creator a samostatný skill Course outline designer.
- Vybrán `curriculum-design` z pluginu: navazuje na další skilly (`lesson-planning`, `video-script`) a staví osnovu metodou **backwards design**, tj. od toho, co má účastnice na konci umět.
- Course outline designer odložen: je stavěný na předtočené kurzy s lekcemi do 25 min (typ Kajabi, Teachable), což neodpovídá živému kurzu.
- Úvodní nastavení pluginu (`course-creator-setup`: značka, hlas, publikum do `config.json`) přeskočeno, protože persona a principy už byly sepsané v projektu.

**Pro replikaci:** Nejdřív se podívej, co už máš: sepsanou personu, starší osnovu, podklady. Skill pak nezačíná od nuly a neptá se na věci, které už víš.

### Krok 1: Ujasnit rámec (260930)
- Rozhodnutí: komerční pilot místo dotovaného 50h kurzu MPSV (důvody v [[digistart]]).
- Pilot: 4–5 týdnů, 1 živé setkání týdně na 1,5–3 h, teorie + praktické zkoušení.

**Pro replikaci:** Formální rámec (dotace nebo komerce, délka, forma) urči dřív než obsah. Mění, kdo kurz platí, a tím i to, jaký problém musí řešit.

### Krok 2: Cílová skupina a její přerod: výchozí stav → cílový stav (260930, rozpracováno)
- Otázky skillu: Kdo to je a v jaké je situaci? Co ji trápí teď? Kde má být na konci a podle čeho pozná, že se kurz vyplatil?
- Odpověď Lenky a Štěpánky: ženy jako ony samy. Solo podnikatelky a živnostnice (lektorky, koučky, podnikatelky pracující na sebe), které už za zviditelnění opakovaně platily a zklamalo je to. Web rychle zastaral nebo stál na cizí platformě, psaní textů je těžké, na sociální sítě nemají čas a nevědí, co psát.
- Zúžení: kurz se ladí na jádro, tedy podnikatelky, které už podnikají. Začínající a ženy po mateřské se přihlásit můžou, ale obsah se na ně neladí. Důvod: dvě skupiny s jiným výchozím bodem by kurz roztrhly.
- Oprava nosné myšlenky: první verze sklouzla k online prezenci (web, sítě), protože to byla nejhlasitější bolest. Po zpětném pohledu se ukázalo, že jádro je širší, a to AI pro zjednodušení každodenní práce solo podnikatelky. Online prezence je jen jedna oblast použití.

**Pro replikaci:** Nejhlasitější bolest persony nemusí být obsah kurzu. Ptej se: je tohle cíl, nebo jen jeden příklad použití?

### Krok 3: Vstupní úroveň a náklady pro účastnici (260930)
- Vstupní úroveň: AI zná a používá jako vyhledávač. Kurz ji posouvá k tomu, že AI za ni udělá kus práce.
- Jádro běží v bezplatných nástrojích. Placené funkce se ukazují jako demonstrovaný postup, ne jako předvádění. Předplatné je volitelné.

**Pro replikaci:** Ptej se na skryté náklady účastnice (předplatné, software, vybavení), ještě než navrhneš obsah. Co kurz vyžaduje navíc, snižuje prodejnost; co je volitelné, může být motivace.

**Pro replikaci:** Personu popisuj podle skutečných lidí, které znáš, ne podle odhadu. Nejsilnější zdroj je vlastní zkušenost: „ženy, jako jsme my“.

### Krok 4: Název, slib, profil, požadavky, výstupy učení (260930)
- Výstup do [[digistart-pilot-osnova]], sekce 1–5 skillu: 3 varianty názvu (podle výsledku, podle identity, podle zvědavosti), slib kurzu ve dvou větách, „pro koho je / pro koho není“, vstupní požadavky, 7 výstupů učení.
- Výstupy učení se píšou **dřív než moduly** (backwards design): moduly se z nich teprve odvodí.
- Kontrola výstupů podle Bloomovy taxonomie: stoupají od porozumění k tvorbě vlastního.

**Pro replikaci:** Sekce „pro koho kurz není“ je stejně důležitá jako „pro koho je“. Nevhodné zájemkyně se odfiltrují samy a pilot nerozbijí.

### Krok 5: Kontrola výstupů proti ceně (260930)
- První verze výstupů byla dovednostní („budete umět…“). Lenka ji porovnala s cenovou představou (kolem 35 000 Kč) a s kurzy, které sama koupila (GrowOS 10 000 Kč, kurz Jona Bensona kolem 1 000 Kč): „za tohle bych dala 3 000 Kč“.
- Přepracováno na **hotové věci**, které si účastnice odnese (nabídka, web, obsah na sítě, e-maily, provozní rutiny, knihovna postupů). Dovednosti se učí cestou.
- Zdroj kostry: [[katalog-moznosti]], Lenčina mapa toho, co sama s AI dělá. Vlastní praxe lektorky je nejlepší zdroj obsahu.

**Pro replikaci:** Výstupy učení zkontroluj otázkou „kolik bych za tohle sama zaplatila?“. U dražšího kurzu musí být výstupem hotová věc, kterou si účastnice odnese, ne jen dovednost. Teorii (např. „kdy AI chybuje“) zvládne půlhodinový výklad a jako hlavní výstup kurzu neobstojí.

### Krok 6: Forma a podpora mezi lekcemi (260930)
- Vyřazen výstup „e-maily, které pracují za vás“: běžná podnikatelka na e-mailing nemyslí. Lektorka nesmí promítat do persony vlastní marketingový svět.
- Problém: volitelné dílny a podpora po kurzu mají malou účast (Lenčina zkušenost). Rešerše na webu to potvrdila. Kohortové kurzy mají vysokou dokončenost díky společnému termínu a tomu, že se ví, kdo co dělá, ne díky volitelným hodinám navíc. Doporučované jsou malé skupiny, termíny v kalendáři od prvního dne a délka 3–5 týdnů.
- Návrh formy: praxe uvnitř hlavního setkání, týdenní odevzdávky se zpětnou vazbou, individuální konzultace na objednávku, malá skupina, jedno naplánované setkání 30 dní po kurzu. Podrobně v [[digistart-pilot-osnova]], sekce 7.

**Pro replikaci:** Podporu navrhuj tak, aby nezávisela na tom, jestli lidi přijdou. Zpětná vazba na odevzdaný výstup a konzultace na objednávku fungují i při nízké účasti, otevřená dílna ne.
- Doladěno s Lenkou: průběžné individuální konzultace vyřazeny kvůli škálování (při 30 účastnicích = 30 h). Nahrazeny úvodní konzultací před kurzem a dílnami na přihlášení (koná se od 3, max. 5, další termín se otevírá po naplnění).

**Pro replikaci:** Každý prvek podpory přepočítej na hodiny lektorky při optimistickém počtu účastníků. Co neškáluje, nahraď něčím, co se otevírá jen podle poptávky.
- Úvodní konzultace = prodejní rozhovor před koupí. Zpětná vazba na odevzdávky = minuty, ne půlhodina: kontrolní seznam k výstupu, návrh zpětné vazby připraví AI, lektorka zkontroluje.

### Krok 7: Rozvrh po týdnech (260930)
- Sekce 6 skillu: 5 týdnů, každý s hlavním výstupem, lekcemi, odevzdávkou, rutinou týdne a postupy do knihovny. Pravidla skillu: rychlá výhra v prvním modulu, hlavní výstup v posledním, žádný modul nestaví na pozdějším.
- Provozní rutiny rozprostřeny po jedné do každého týdne, aby knihovna postupů rostla průběžně.

**Pro replikaci:** Nejdřív urči pořadí výstupů podle závislostí (co na čem stojí), pak teprve lekce. Rychlou výhru dej na začátek i v případě, že logicky patří jinam: rozhoduje motivace v prvním týdnu.

### Krok 8: Doplnění z dřívějších materiálů a verze pro kolegyni (260930)
- Z původní osnovy pro MPSV vrácena úprava fotek z mobilu (týden 4, spolu se sítěmi). Z přehledu AI Black Magic doplněn audit týdne do týdne 1.
- Vznikl samostatný dokument pro spolulektorku: jen výsledek (pro koho, co si účastnice odnese, jak kurz probíhá, rozvrh, podklady, otázky k rozhodnutí), bez historie rozhodování. Nástroj: Claude Docs (sdílený dokument s komentáři).

**Pro replikaci:** Pracovní poznámky (proč jsme co změnily) a dokument pro partnera drž odděleně. Partner potřebuje návrh a otázky k rozhodnutí, ne cestu k nim.
