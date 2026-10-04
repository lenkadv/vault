# Modul 4 — The RECIPE for Skills (poznámky po lekcích)

Součást: [[coursera-agent-skills-for-leaders]] · [Kurz online](https://www.coursera.org/learn/agent-skills) · ~1 h · Poznámky vlastními slovy (261004), ne přepis.
**Nejužitečnější modul kurzu.** Rámec RECIPE je kontrolní seznam pro psaní i opravy skillů; hodí se i pro naše skilly a postupy.

## RECIPE v kostce

| Písmeno | Slovo | Otázka |
|---|---|---|
| **R** | Requests | Co si uživatel řekne a jakým jazykem? (kolem toho se skill organizuje) |
| **E** | Environment | Co má agent „na stole“: nástroje (scripts), příručky (references), polotovary (assets)? |
| **C** | Concrete steps | Jaké jsou konkrétní kroky a v jakém pořadí? |
| **I** | Ideal result | Co přesně má vzniknout a podle čeho poznám, že je dobré? |
| **P** | Presentation | V jakém formátu a struktuře se výsledek podává? |
| **E** | Examples | Jak vypadá správně udělaná věc (a špatná, a výjimky)? |

## 30. The Recipe Framework (video)
[Lekce](https://www.coursera.org/learn/agent-skills/lecture/Waw9D/the-recipe-framework)
Psaní skillu je jako psaní: jde to mnoha způsoby, ale pomáhá mít rámec jako výchozí bod. RECIPE říká, **co do skillu patří, v jakém pořadí a jak to uspořádat.**

## 31. Requests (video)
[Lekce](https://www.coursera.org/learn/agent-skills/lecture/ses95/requests)
Skill organizuj kolem **požadavků uživatele** („zkontroluj vyúčtování“, „udělej prezentaci“, „zkontroluj nové zákazníky v CRM“). Agent si totiž podle toho, co uživatel napsal, vybírá skill. Požadavek má být nadpis (jako název kapitoly). Skill může řešit **jeden požadavek** (rovnou kroky pod nadpisem) nebo **víc**: `SKILL.md` pak funguje jako **obsah** (název, popis, kdy použít a odkaz, kde je to rozepsané). Důvod: **progresivní odkrývání** — kontext agenta je omezená kapacita, má dostat jen tolik, aby věděl, co si přečíst dál. V popisu skillu (front matter) pak napsat „použij, když uživatel žádá…“.

## 32. Environment (video)
[Lekce](https://www.coursera.org/learn/agent-skills/lecture/1TgNt/environment)
Představ si, že novému zaměstnanci dáš úkol: co by mělo být na jeho stole? **Scripts** = výpočetní nástroje a přístup do systémů; **references** = pravidla, příručky, číselníky; **assets** = šablony a polotovary (i logo). V instrukcích agentovi řekni, **kde co leží** („pro sazby čti tento soubor“). Polotovary navíc zvyšují konzistenci a snižují cenu, protože agent nemusí vše psát od nuly.

## 33. Concrete steps (video)
[Lekce](https://www.coursera.org/learn/agent-skills/lecture/aSEZM/concrete-steps)
Konkrétní kroky v pevném pořadí, aby agent úkol pokaždé udělal stejně (jako recept). Kroky mají být **konkrétní, ne vágní** („zkontroluj správnost“ je špatně; „vytáhni tyto hodnoty z účtenek, přiřaď kategorie podle pravidel, částky nad 500 označ k posouzení, chybí-li účtenka, zeptej se“ je dobře). Rozhodovací body („pokud X, pak Y“) se do kroků dají.

## 34. Ideal result (video)
[Lekce](https://www.coursera.org/learn/agent-skills/lecture/wzdGF/ideal-result)
Skill musí jasně říct, **co má vzniknout** a **podle čeho se pozná dobrý výsledek** (kritéria, „rubrika“, podle které se AI sama zhodnotí). Bez toho vzniká variabilita (jednou tabulka, podruhé jiné sloupce). Příklad: souhrn „zkontrolováno 12 položek v celkové hodnotě 847,50, chyby na řádcích 11–14“ + seznam problémů a doporučení. Dvě rady: napsat, zda chceš **přesně tyto výstupy**, nebo i další užitečné (poznámky); a **vázat výstupy na vstupy** (zmínit konkrétní řádky/účtenky), čímž klesá riziko halucinace a snáz zkontroluješ originál.

## 35. Presentation (video)
[Lekce](https://www.coursera.org/learn/agent-skills/lecture/7ghcA/presentation)
Přesně říct, **v jakém formátu**: jeden soubor, nebo víc; HTML dashboard; CSV s konkrétními sloupci; struktura souboru. Co neřekneš, zvolí AI sama a výstupy se budou lišit. Pomáhají **šablony se zástupnými symboly** („Zaměstnanec: [příjmení, jméno]“, „Datum: [DD.MM.RRRR]“) jako u formulářů pro lidi; do zástupných symbolů se dají psát i pokyny. Ještě lépe fungují příklady (následující lekce).

## 36. Examples (video)
[Lekce](https://www.coursera.org/learn/agent-skills/lecture/8OJWy/examples)
Podle autora **nejvíc podceňovaná a možná nejdůležitější část** pro konzistentní výstupy. Příklady ukazují správný výstup, **špatný výstup** i **výjimky**. Doplňují implicitní instrukce (z příkladu „Novák, Jan“ je jasné, že jméno je příjmení, čárka, jméno), ukazují uvažování a konkretizují formát. Mohou ležet v references nebo přímo ve `SKILL.md`.

## 37. RECIPE s více požadavky (video)
[Lekce](https://www.coursera.org/learn/agent-skills/lecture/4eeM4/recipe-with-multiple-requests)
Když skill obsluhuje víc požadavků: ve `SKILL.md` je společné **prostředí** (scripts/references/assets) a společné cíle či standardy; pro každý požadavek zvlášť **kroky, ideální výsledek, prezentace a příklady**, buď přímo, nebo v samostatném souboru. Důvod: při opravě chceš **rychle najít místo** a **neovlivnit ostatní požadavky**. Nejlépe tak, že úprava je v souboru, který se při jiném požadavku nikdy nečte.

## 38. Vylepšování skillu (video)
[Lekce](https://www.coursera.org/learn/agent-skills/lecture/JIltb/refining-a-skill)
Skilly se budou **udržovat a měnit**. Co upravit podle toho, co selhává:
- **Agent vynechává krok nebo chybí kontrola** → upravit **Concrete steps** daného požadavku.
- **Výstup nevypadá, jak má, nebo chybí úvaha** → místo nafukování kroků **přidat příklad** (zachytit konkrétní vstup, co AI vyrobila, a co jsi chtěla místo toho; případně ukázat i špatný výstup).
- **Celkový tón/chování** → upravit **Ideal result**/globální cíl („vždy buď vtipná…“).
- **Mechanické kroky s daty, výpočty** → **přepsat na skript**; je levnější, opakovatelnější a ověřitelnější.
- **Skill přerostl a zmate se** → **vyndat nepodstatné do references** a ve `SKILL.md` jen říct, kdy je číst.

## 39. Vzorec kontextových preferencí (video)
[Lekce](https://www.coursera.org/learn/agent-skills/lecture/kkq0P/contextual-preferences-pattern)
Řeší situaci, kdy se způsob provedení úkolu mění podle **kontextu** (typicky psaní e-mailů: vedení, oznámení kurzu, odpověď s životopisem/abstraktem). Struktura skillu: (1) obecný úkol („použij při psaní e-mailu“); (2) **jak poznat kontext** a případné společné kroky; (3) seznam kontextů, každý s krátkým popisem, případně obecnými pravidly a **odkazem na samostatný soubor** s konkrétními pokyny a **příklady** pro daný kontext (i s přibalenými podklady, třeba fotkou či biografií); (4) **záložní postup**, když žádný kontext nesedí. Soubory s příklady se čtou jen u vybraného kontextu. Při psaní je pro AI často snazší dát příklady dobrých e-mailů, než popsat styl.
**Pro nás:** přesně tak je vhodné stavět psaní za Lenku podle kontextu (e-mail, newsletter, článek, seminárka). Viz `resources/postupy/hlasy.md`.

## 40. AI Skill Refinement (hodnocený úkol)
Zamčeno v kurzu, nestaženo.
