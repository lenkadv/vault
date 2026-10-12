# Postup: Metodologie 2 (doc. Kubík) — zkouška, Anki karty a trénink

Vznikl 261007. Claude čte tento soubor, když Lenka řeší Metodologii 2: „zpracuj přednášku“, Anki karty, příprava na zkoušku, trénink. Termíny viz [[areas/studies]]. Vzor je [[resources/postupy/prehledovky-pech]], ale **zkouška je jiná** (písemná, ale individuální: každý dostane jinou otázku, ne společný test), takže se liší trénink.

**Studium není GTD** — žádné tasky do `next-actions`; bloky jsou v kalendáři (čas vždy potvrdit s Lenkou) a plánují se při weekly review.

## Dashboard (artefakt „Metodologie 2“, od 261012)
URL: https://claude.ai/artifact/HJgGjqoiEgAdAydg7A491U (soukromý, jen Lenka). Záložky: **Přehled** („Co teď“, pokrytí tří kroků zkoušky), **Mapa témat** (téma × přednášky, průřezová témata, klik = výklad z přednášek), **Přednášky** (nahrávka · zpracováno · v Anki), **Pramenná literatura** (8 autorů, stav nezačato/vzorek/celé, pokryté metody), **Trénink** (zkouška nanečisto ve 3 krocích, Claude hodnotí jako doc. Kubík podle výkladu z přednášek, doplňující otázka, historie), **Ověřit a čekáme**.
**Data v uložené paměti artefaktu** (kolekce `lectures`, `topics`, `sources`, `tests`, `notes`, dokument `meta/main`), Claude je mění nástrojem `ArtifactData` (URL výše), kód stránky se nepřepublikovává. Zdrojové soubory: `meto-work\dashboard.html` (stránka), `meto-work\seed_dash.py` (počáteční data, generuje `meto-work\seed\*.json`).
**Při „zpracuj přednášku“ Claude navíc aktualizuje dashboard:** (1) `lectures/lRRRRMMDD`: `rec`, `processed`, `topic`, `imported:false` do importu; (2) `topics`: u každého tématu, které zaznělo, doplnit datum do pole `lec` a do `ref` připsat blok „[d. m.] …“ **Kubíkovými slovy**, nová témata založit (`group`: osoba/cech/pojem/metoda, `core`, `tag` = `k_…` z karet, u metod `coverage:"uvod"` až do hlavního výkladu), kontextová `core:false`; (3) `meta/main`: `cards`, `kontext`; (4) `notes`: rozpory k ověření (`kind:"verify"`) a co čekáme (`kind:"wait"`). **Ref texty jsou podklad pro hodnocení tréninku**, proto musí být přesné a pocházet z přednášek (ne ze skript).

## Zdroje
- Gemini Notebook **„Metodologie II“** (`notebooklm … -n 0b9f1a49-d4b9-4ead-82fd-341aff5d4531`): nahrávky přednášek (pondělí 10:15, P8): 5. 10. a 12. 10. (zdroj „Metod261012.mp3“). Nahrávky z Easy Voice Recorder se přesouvají do `KTF/Aktuální/Metodologie 2/26ZS Metodologie 2 nahrávky/` (název `MetodRRMMDD.mp3`) a odtud nahrávají do Notebooku (`notebooklm source add … --type file --timeout 600`); dotaz jen na jednu přednášku přes `ask -s <id zdroje>`.
- Disk `02 EDUCATION/KTF/Aktuální/Metodologie 2/`: studijní text `Meto2 2.pdf` (literatura k dějinám umění v době osvícenství, ~140 tis. znaků, slouží k ověření jmen a dat), starý Notebookem vygenerovaný `251005flashcards.csv` (41 dlouhých karet, nahrazen atomickými).
- Metodologie 1: `KTF/Absolvované/Metodologie 1/metodologie 1 - termíny.pdf` (disegno, idea, decorum, mimesis…), Anki `KTF/Anki Archive/Metodologie1.apkg`. Otázky se mohou vracet i k látce Metodologie I.

## Zkouška (upřesnila Lenka 261007; Notebook ji z nahrávky vyhodnotil chybně jako ústní)
**Písemná, ale velmi individuální.** Každý student dostane **svou vlastní otázku** (ne společný test), napíše na ni odpověď; vyučující **doc. Kubík** si ji po dopsání přijde přečíst, případně položí **doplňující otázku** nebo opraví, co je špatně. Ústní výměna je minimální, odpovědi jsou **vždy písemné** (případně s doplněním po opravě nebo doplňující otázce). Neprocvičovat tedy jako ústní vyprávění. Lze rozdělit na dva termíny (na druhém „dolepit zbývající“).
Obsah otázek (z úvodní přednášky, struktura jako u Metodologie I; **forma Notebookem nepotvrzená, jen tříkrokový obsah**), tři okruhy, z nichž se otázky skládají:
1. **Pramenná literatura + 2 témata.** Co se z pramenů nejlépe četlo; k tomu druhé téma jiné metody (např. k formalistům kulturněhistorická metoda, výtvarná kritika, památková péče).
2. **Klíčová osobnost („pardál“)**, „vždycky dojde na Čechy“ (Chadraba a kol., *Kapitoly z českého dějepisu umění*: znát životní data).
3. **Terminologie:** pojem 18.–20. století včetně: kdo s ním přišel, co znamená, jak se vyvíjel jeho obsah a použití.
Varování vyučujícího: nečíst jen k jednomu tématu (např. jen památková péče), projít autory napříč metodami; skripta Kroupy a Wittlicha jsou samozřejmost, **zajímá ho znalost pramenů** (stačí vzorek ~10 stran, jde o způsob uvažování autora); nečíst Gombrichův *Příběh umění* (číst *Umění a iluzi*). Páteř předmětu: formalistická + kulturněhistorická metoda. Otázky se mohou vracet k Metodologii I. **Nezaznělo:** body, hodnocení, docházka, referáty, přesné termíny.
**Pramenná literatura:** Winckelmann (*Dějiny umění starověku*), Burckhardt (renesance), Wölfflin, M. Dvořák (*Katechismus památkové péče*), Sedlmayr (*Ztráta středu*), Gombrich (*Umění a iluze*), Belting (*Konec dějin umění*), Panofsky (ikonologie, Suger). Skripta: Kroupa *Školy dějin umění* (1. díl jádro), Wittlich (terminologie).

## Požadavky ke zkoušce — znovu ověřeno v nahrávce 5. 10. (261012)
Slovní znění vyučujícího (přepis nahrávky) potvrzuje a upřesňuje Lenčin popis. Co platí:
- **Forma:** „kombajnová metoda“: vezme si **10 studentů najednou**, každý **píše osnovu** (odpověď podle své otázky) a vyučující mezitím **střílí doplňující a „žertovné“ otázky**; zkouška „v obdobném duchu jako z Metodologie I“. Slova „ústní“ ani „písemná“ doslova nezazněla. Pro trénink: **psát osnovu, ne přednášet**; odpověď má být postavená tak, aby se dala číst a doptávat. Trvá obvykle **75 minut**, pak přestávka; „promrskáme celou látku“.
- **Rozdělení na termíny:** první část na prvním termínu, zbylé dvě na druhém (nezapomenout říct, že odcházím a už se nevrátím).
- **Obsah (3 kroky):** (1) co se z pramenů nejlépe četlo + **druhé téma** přidané vyučujícím (jiná metoda: kulturněhistorická, výtvarná kritika, památková péče); (2) **klíčová osobnost („pardál“)**, vždy někdo z Čechů, Češi po generacích podle Chadraby: nechtít přesná data, ale **v jaké části století a do které generace patří**; (3) **pojem z 18.–20. století**: kdo s ním přišel, co znamená, jak se vyvíjel.
- **Co se zkouší (důležité):** zkouší „průhledově“ po tematických celcích. Vyučující výslovně řekl, že se **s největší pravděpodobností nebude ptát na literaturu k dějinám umění 18. století** (ta je v přednáškách kontext), ale na **výtvarnou kritiku, představitele formalistické a kulturněhistorické metody, památkovou péči** a podobně. Páteř: **formalistická a kulturněhistorická metoda**. Nové metody umět **spojit s dřívějšími** („změnila se terminologie, jádro myšlenkové konstrukce zůstává“). Zasahuje i do Metodologie I (a do státnic, bakalářských i magisterských).
- **Důležité (zkušenost Lenky z Metodologie I, 261012): chce slyšet to, co a jak říká on.** Říká sice, že skripta Kroupy a Wittlicha jsou samozřejmost a že se na ně ptát nebude, ve skutečnosti ale očekává **jeho výklad: jeho členění, jeho formulace a pojmy, jeho zdůraznění** (generace a „vrchol sil“, pardál, maják, průhledově po tematických celcích). Odpověď postavená jen na skriptech neobstojí. Proto karty i oprava tréninku vycházejí z **přepisů jeho přednášek** (jeho slova), skripta a `Meto2 2.pdf` slouží k ověření jmen a dat. Pramennou literaturu je potřeba přečíst **alespoň výběrově**.
- **Literatura:** skripta Kroupa (1. díl) a Wittlich jsou „samozřejmost“ (viz předchozí bod). Zajímá ho **pramenná literatura**: Winckelmann (stačí ~10 stran, jde o způsob uvažování; hodí se k formalistické i kulturněhistorické metodě), **Burckhardt** (kulturněhistorická metoda, hvězda první velikosti, jen 1. díl syntézy, česky), **Wölfflin** (formalistická, pozitivista), **Max Dvořák** *Katechismus památkové péče* (přečíst celý), **Sedlmayr** *Ztráta středu* (pro ty, koho táhne 20. století), **Gombrich** *Umění a iluze* (ne *Příběh umění*), **Belting** *Konec dějin umění*, **Panofsky** (minimálně studie o opatu Sugerovi). Čtení jednoho tématu (např. jen památková péče) „nepřežije“. Lenka dostala loni od něj papír s literaturou.
- **Rozsah semestru:** přes 18. století do 20., meziválečná doba a částečně druhá polovina 20. století; detailně druhá půlka 20. st. až v magisterském cyklu, ale „klíčoví pardálové“ se objeví už teď.
- **Nezaznělo:** body, hodnocení, docházka, zápočet, přesné termíny.

## Návaznost na Metodologii I (Notebook „Metodologie I“, 8 nahrávek 6. 10.–15. 12. 2025)
**Kde Metodologie I skončila:** 15. 12. 2025 pozdním manýrismem a barokem (Lomazzo, Zuccari, **Bellori**, **van Mander**, spor poussinistů × rubensistů, **de Piles**, **Baldinucci**, vznik znalecké literatury). Metodologie II začala přesně tam (5. 10. opakování Belloriho, de Pilese, Baldinucciho a van Mandera), proto se na zkoušce mohou ptát na tyto autory i z loňského pohledu.
| Přednáška M1 | Téma |
|---|---|
| 6. 10. 2025 | antické Řecko: technická literatura, kánon (Polykleitos), Platon (mimesis), Aristoteles (techné), decorum (Myrón) |
| 13. 10. | Řím a helénismus: Vitruvius, Plinius, ekfrasis, paragone, ut pictura poesis, Plotínos |
| 20. 10. | středověká teorie: Augustin, Boethius (artes liberales × mechanicae), Izidor, ikonoklasmus, tituli |
| 3. 11. | dílenské příručky (Theophilus, Villard), Suger × Bernard, Dante, Petrarca, Cennini |
| 10. 11. | rané humanistické traktáty: Villani, Ghiberti, Alberti, Landino, Facio |
| 24. 11. | pokročilá renesance: Filarete, Francesco di Giorgio, Piero, Pacioli, Leonardo |
| 1. 12. | manýrismus: Pino, Dolce, Varchi, Michelangelo, **Vasari** (3 etapy, Arti del Disegno) |
| 15. 12. | baroko: Lomazzo, Zuccari, Bellori, van Mander, Poussin × Rubens, de Piles, Baldinucci |
**Pojmy z Metodologie I** (u zkoušky M1 příklady pro krok 3: **disegno, maniera, styl, idea**; vývoj termínu v čase): techné · kánon a proporce · decorum · mimesis · krása · ekfrasis · paragone (1546 Michelangelo: společný základ disegno) · ut pictura poesis · artes liberales × mechanicae · tituli a imago · hodnota stáří · electio · disegno (Cennini → Vasari → Zuccari interno/esterno) · maniera (Cennini, Vasari; pejorativně Gilio, Bellori; de Piles individuální rukopis) · invenzione · idea (Lomazzo, Zuccari, Bellori) · styl (Cicero, Quintilianus; do umění 1664 Bellori) · ritrare × imitare. Lenčin soubor `KTF/Absolvované/Metodologie 1/metodologie 1 - termíny.pdf` a Anki `Metodologie1.apkg` jsou na Disku.
**Pravidla zkoušky M1, která platí i teď:** nesmí se „bouchnout“ ani v jedné ze tří částí (výborná architektura a díry jinde nestačí); u pardála se nechce přesné datum, ale **doba, kdy by se s ním dalo potkat („plně při síle“)**; u pramenů střídání oborů (vybraná architektura → pardál malíř/sochař); termíny zimní i letní.
**Použití:** M1 karty zatím nemáme v našem balíčku (Lenka je má v Anki Archive); u pojmů, které se vracejí v M2 (styl, maniera, idea, krása, ekfrasis…), karty M2 navazují a ve zpracování přednášky se mají odkazovat na M1.

## Pokrytí zkoušky
| Krok zkoušky | Čím je pokrytý | Stav 261007 |
|---|---|---|
| 1. Pramenná literatura + metody | Anki: téma „Literatura ke zkoušce“, „Metody“, „Osvícenští autoři“; **vlastní čtení pramenů** (to nenahradí karty) | karty z 1. přednášky; čtení nezačato |
| 2. Český „pardál“ | Anki karty o českých historicích umění po přednáškách, kde zazní | **nezazněli**, čekáme |
| 3. Terminologie 18.–20. st. | Anki: „Styl a maniéra“, „Osvícenství“ + později další pojmy | rozjeto |

## Průřezový princip — nejtěžší věc předmětu (Lenka 261007)
**Vyučující neprobírá téma najednou.** Metoda, pojem nebo osobnost se vrací napříč semestrem a doplňuje (např. v 2. přednášce základ, v 5. a 6. další údaj, ve 12. dokončení). Otázka u zkoušky se proto **nedá odpovědět z jedné přednášky**; odpověď si student musí poskládat z více přednášek. Důsledky:
1. **Karty a poznámky vést podle tématu, ne podle přednášky.** Každá karta má tag `k_<téma>` (osoba, pojem nebo metoda; u `ATOM` je to předpona klíče) a tag přednášky `m2_RRMMDD`. Hledání v Anki `tag:k_winck` ukáže všechno o tématu napříč přednáškami.
2. **„Zpracuj přednášku“ nikdy jen přidává bez porovnání:** u každé osoby, pojmu a metody z nové přednášky Claude **vyhledá, co už k ní je** (karty v `ATOM` + dřívější přepisy v Notebooku) a nový údaj zařadí k témuž `k_` tagu; když přednáška téma doplňuje nebo mění, řekne to Lence („Winckelmann: nově z 5. přednášky … navazuje na kartu z 2.“). Údaje v rozporu mezi přednáškami označit.
3. **Průřezový přehled** (tabulka níže): pro každé téma, ve kterých přednáškách zaznělo a co přibylo. Aktualizuje se při každém zpracování.
4. **Trénink se skládá průřezově:** otázku volit z **témat napříč přednáškami** (od 2. přednášky přednostně z témat, která zazněla opakovaně), ne z poslední přednášky. Při opravě se odpověď porovnává se **všemi** přednáškami, ve kterých téma zaznělo; Claude předtím dotáže Notebook na téma přes všechny nahrávky. Hlídá, aby Lenčina odpověď nespadla jen na poslední přednášku, a když chybí údaj z jiné, výslovně řekne ze které.
5. Nahrávky všech přednášek patří do **jednoho** Notebooku „Metodologie II“ (jen tak jde dotazovat přes všechny).

## Anki karty — pravidlo (jako u Pecha, 261007)
**Krátké atomické karty** (jedna otázka, krátká odpověď, výčty nejvýše 3–7 položek), vždy **až po přednášce** a jen z toho, co vyučující opravdu probral (přepis nahrávky v Notebooku), doplněné roky a jména z `Meto2 2.pdf` (zdroj na kartě to uvádí). Co nezaznělo, žádná karta. Údaje, které jsou jen z přepisu nahrávky a mohou být zkomolené (jména, roky), mají tag `overit`.
- Skripty: `C:\Users\Lenka\Documents\meto-work\` — `meto.py` (seznam `ATOM`: klíč, téma, otázka, odpověď, zdroj, příznaky; GUID `m2-<klíč>`; tagy `meto2 m2_RRMMDD t_<téma>`), `meto_sync.py`.
- Balíček: `meto-work\anki\METO2.apkg` (kumulativní, všechny přednášky) s **nadřazeným balíčkem „Metodologie 2“ a dvěma podbalíčky: „1 Jádro“ (56 karet, procházejí se první) a „2 Doplněk“ (45 karet, z toho 15 `zk_kontext`)**. Rozdělení je v `meto.py` v množině `JADRO` (to, co Kubík výslovně zdůraznil: Winckelmann, Caylus a datace komparací, Lessing, majáky Christ/Fiorillo/Bartsch, Burckhardt, Wölfflin, pramenná literatura, páteřní metody, pojmy pro krok 3, generace, Češi, Hegel); štítky `zk_jadro` / `zk_doplnek`. **Nová karta jde do `JADRO`, jen když to Kubík zdůraznil nebo patří k pojmům a pardálům kroků zkoušky**, ostatní do doplňku. Import existující karty mezi podbalíčky nepřesune; přesun (a změnu stupně) dělá Lenka v Anki přes `tag:zk_jadro` a `tag:zk_doplnek`. Kopie balíčku na Disku ve složce Metodologie 2. Přehled karet: `meto-work\meto-karty-nahled.txt`.
- **Lenka opravuje nejraději přímo v Anki** → před každým přegenerováním Claude spustí `python meto_sync.py` (načte její úpravy a smazané karty do `meto_edits.json`), pak `python meto.py`. Smazané karty import neodstraní. **Pořadí je důležité (poučení 261012):** `meto_sync.py` vždy **dřív**, než se v `meto.py` změní text jakékoli existující karty. Jinak by zapsal starý text z Anki jako „úpravu Lenky“ a přepsal novou verzi (stalo se u `maniera-goethe`, opraveno ručně v `meto_edits.json`).
- Karty z jedné přednášky jsou v `new_cards_pNN.py` (seznam `NEW_P2` …), konstanty zdrojů v `meto_consts.py`; karta s tagem více přednášek má v poli Zdroj „přednášky 5. a 12. 10.“ (`P12pdf`).
- Po importu starý Notebookový deck (41 karet z `251005flashcards.csv`) smazat nebo nechat; nové karty ho nepřepisují.

## „Zpracuj přednášku“ — co dělá Claude
1. Nahrávka do Notebooku „Metodologie II“ (Lenka), pak `notebooklm ask` na: osoby, díla s roky, pojmy (kdo zavedl, význam, vývoj), metody a představitelé, **čeští historici umění**, **co vyučující označil jako důležité pro zkoušku**, doporučená literatura. Jen to, co zaznělo; roky, které nezazněly, označit.
2. Ověřit jména a data proti `Meto2 2.pdf` (grep), rozpory označit (např. Condorcet 1793/1794).
3. Přidat nové karty do `ATOM` (nová přednáška = nový `Pxx` zdroj a nové `m2_RRMMDD` v tagu), `meto_sync.py` → `meto.py`, zkopírovat balíček na Disk, Lenka naimportuje.
4. Zapsat do tabulky „Zpracováno“ níže.

## Trénink — písemná zkouška nanečisto (cca 45 min, 1× týdně, čas potvrdit s Lenkou)
Simuluje reálnou zkoušku: individuální otázka, písemná odpověď, vyučující čte a doptává se.
1. Claude zadá **jednu otázku** (střídat okruhy: pramen + metoda, osobnost, pojem 18.–20. st.) z dosud probraného; každý trénink jiná, jako u zkoušky.
2. Lenka napíše **osnovu odpovědi** (jak by ji psala při zkoušce: hlavní body, jména, data, souvislosti, tak aby se dala číst a doptávat; ne esej) sama, bez karet. Kroky 1–3 zkoušky dostane ideálně všechny tři (jako u zkoušky), jinak jeden po druhém; u pardála jen „doba a generace“, ne přesná data.
3. Claude se chová jako doc. Kubík: odpověď přečte, **opraví** chyby (proti přepisu přednášek: **jak to řekl on**, jeho pojmy a členění; pramenům a skriptům až druhotně) a hlídá, jestli odpověď mluví jeho jazykem, položí **doplňující otázku** (s přesahem do jiné metody nebo do Metodologie I), Lenka písemně doplní.
4. Výsledek (co sedělo, co chybělo) zapsat do tabulky „Trénink“, slabá místa → nové karty nebo čtení pramene.
Dashboard jako u Pecha **zatím není** (nabídnout, až bude víc přednášek).

## Průřezový přehled témat
| Téma (`k_`) | Zaznělo v přednáškách | Co přibylo |
|---|---|---|
| Winckelmann (`winck`) | 5. 10., 12. 10. | 5. 10.: 1755, *Dějiny umění starověku*, dějiny stylu, Caylus. 12. 10.: 1717–1768, dráha (Halle, Jena, Albani), popularizátor Cayluse, **obojetný (formalista i kulturní historik) – u zkoušky i státnic**, ideál Řecka 5. st., fáze, vykopávky |
| Styl, maniéra, vkus (`styl`, `maniera`, `vkus`, `depiles`, `bellori`, `goethe`) | 5. 10., 12. 10. | 5. 10.: Bellori 1664/72, de Piles 1708, Goethe 1789 (pejorativní maniéra). 12. 10.: Goethe znovu + **tři stupně tvorby** (nápodoba přírody → osobní styl/manýra → ideální styl) |
| Caylus a metoda datace komparací (`caylus`, `datace`) | 12. 10. (5. 10. jen zmínka) | autopsie, ruka umělce, relativní vývojová řada; **vyučující: důležité u zkoušky i státnic** |
| Hegel, Humboldt, Schlegel, Lessing, Herder (`hegel`, `lessing`, `herder`, `schlegel`) | 12. 10. (5. 10. Hegel jen jako syntéza) | tři principy dějin umění, Laokoon 1766, plastika×skulptura |
| Británie 18. st. (`brit`, `reynolds`, `hogarth`, `wren`, `essex`, `warton`, `walpole`, `burke`) | 12. 10. | akademie 1768, Hogarth 1753, Wren 1713, Essex 1771 |
| **Znalectví** (`znal`, `christ`, `fiorillo`, `bartsch`, `sonnenfels`, `met-znalectvi`) | 5. 10. (**páteř dějin umění až dodnes**, vznik z heuristiky a terminologie, Francie špička, předstupně van Mander až Houbraken, kritika opřená o znalecké základy), 12. 10. (metody a země) | maják Christ 1735 Lipsko, Fiorillo 1813 Göttingen, Bartsch 21 sv., stavy grafiky |
| Formalistická a kulturněhistorická metoda (`met`) | 5. 10. (úvod), 12. 10. (jen přes Winckelmanna a Hegela) | Wölfflin, Burckhardt, Du Bos, Le Clerc — **čekáme na hlavní výklad** |
| Ikonologie, výtvarná kritika, památková péče (`met`) | 5. 10. (úvod), 12. 10. (zmínky: Diderot, Wren, Winckelmann a vykopávky) | zatím jen zmínky |
| Čeští historici umění | 12. 10. | **Dlabač** (Strahov, 2. gen., slovník 1815–16), **Hollar** (ilustrace Dugdalea); Mistr Theodorik a Dientzenhoferové jen mimochodem |

## Zpracováno
| Přednáška | Témata | Karty | Stav |
|---|---|---|---|
| 5. 10. 2026 | osvícenství (1./2. generace), styl–maniéra–vkus, předchůdci (Vasari, van Mander, Sandrart, Baldinucci, Bellori, de Piles, Du Bos, Houbraken), Winckelmann, Diderot, Condorcet, metody, literatura ke zkoušce | 53 | ✅ sestaveno a naimportováno do Anki 261007 |
| 12. 10. 2026 | Winckelmann podrobně, Caylus a datace komparací, německá reakce (Hegel, Schlegel, Goethe, Lessing, Herder), Británie (Reynolds, Hogarth, Wren, Essex, Warton, Walpole, Burke/Price, Dugdale/Hollar), dílenské receptáře, znalectví (Christ, Fiorillo, Bartsch, Sonnenfels, Dlabač), dějiny umění na univerzitách | +43 nových, 1 upravená (Goethe) = 96 celkem | ✅ sestaveno 261012, čeká na import (13 karet s tagem `overit`) |

## Trénink (záznamy)
| Datum | Co | Poznámky |
|---|---|---|
| — | zatím nic | |

## Otevřené
- **Karty `zk_kontext` (rozhodnuto 261012):** vyučující řekl, že se nejspíš nebude ptát na literaturu k dějinám umění 18. století, ale na metody (formalistická, kulturněhistorická, výtvarná kritika, památková péče), pardály a pojmy. Lenka schválila: všechny karty tématu „Británie“ (11) a dále dílenské receptáře, Sonnenfels, Kugler, stavy grafiky = **15 karet s tagem `zk_kontext`** (seznam `KONTEXT` v `meto.py`). Nemažou se; v Anki `tag:zk_kontext` je lze odložit nebo naopak vyfiltrovat jádro `-tag:zk_kontext`. Nové přednášky: u karet z literatury 18. st. mimo metody, pardály a pojmy dávat `zk_kontext` rovnou.
- Poučení ze synchronizace: `meto_sync.py` si pamatuje všechny dřívější sestavené verze karet (`hist` v `meto_edits.json`) a za Lenčinu úpravu bere jen text, který se od žádné z nich neliší (jinak by nenaimportovaná nová verze vypadala jako „úprava“).
- Termíny zkoušky (první termín, dělení na dvě části) — vyučující je zatím neřekl.
- Čeští historici umění: 12. 10. poprvé Dlabač a Hollar (karty hotové); další čekáme. K „pardálovi“ ze zkoušky patří i životní data podle Chadraby: až bude víc Čechů, zvážit samostatný přehled.
- Rozpory nahrávka × studijní text (karty mají tag `overit`): Caylus *Sbírka starožitností* 1757 × 1752–1767; Humboldtova reforma univerzity 1800 × 1810; Condorcet 1794 × 1793; Hogarth „polovina 18. st.“ × 1753. Ověřit u pramene nebo se zeptat vyučujícího.
- Údaje jen z přepisu nahrávky bez opory v PDF (Burke, Price, Orlandi, Kugler, Warton, vykopávky u Winckelmanna): ověřit při čtení pramenů.
- Skripta/pramenná literatura: Lenka dosud nečetla; vyberme z ní vzorky (cca 10 stran) po jednom autorovi týdně, aby kryla různé metody.
