# Postup: Metodologie 2 (doc. Kubík) — zkouška, Anki karty a trénink

Vznikl 261007. Claude čte tento soubor, když Lenka řeší Metodologii 2: „zpracuj přednášku“, Anki karty, příprava na zkoušku, trénink. Termíny viz [[areas/studies]]. Vzor je [[resources/postupy/prehledovky-pech]], ale **zkouška je jiná** (písemná, ale individuální: každý dostane jinou otázku, ne společný test), takže se liší trénink.

**Studium není GTD** — žádné tasky do `next-actions`; bloky jsou v kalendáři (čas vždy potvrdit s Lenkou) a plánují se při weekly review.

## Zdroje
- Gemini Notebook **„Metodologie II“** (`notebooklm … -n 0b9f1a49-d4b9-4ead-82fd-341aff5d4531`): nahrávky přednášek (pondělí 10:15, P8). Zatím jen 5. 10.
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
- Balíček: `meto-work\anki\METO2.apkg` (kumulativní, všechny přednášky; deck „Metodologie 2“), kopie na Disku ve složce Metodologie 2. Přehled karet: `meto-work\meto-karty-nahled.txt`.
- **Lenka opravuje nejraději přímo v Anki** → před každým přegenerováním Claude spustí `python meto_sync.py` (načte její úpravy a smazané karty do `meto_edits.json`), pak `python meto.py`. Smazané karty import neodstraní.
- Po importu starý Notebookový deck (41 karet z `251005flashcards.csv`) smazat nebo nechat; nové karty ho nepřepisují.

## „Zpracuj přednášku“ — co dělá Claude
1. Nahrávka do Notebooku „Metodologie II“ (Lenka), pak `notebooklm ask` na: osoby, díla s roky, pojmy (kdo zavedl, význam, vývoj), metody a představitelé, **čeští historici umění**, **co vyučující označil jako důležité pro zkoušku**, doporučená literatura. Jen to, co zaznělo; roky, které nezazněly, označit.
2. Ověřit jména a data proti `Meto2 2.pdf` (grep), rozpory označit (např. Condorcet 1793/1794).
3. Přidat nové karty do `ATOM` (nová přednáška = nový `Pxx` zdroj a nové `m2_RRMMDD` v tagu), `meto_sync.py` → `meto.py`, zkopírovat balíček na Disk, Lenka naimportuje.
4. Zapsat do tabulky „Zpracováno“ níže.

## Trénink — písemná zkouška nanečisto (cca 45 min, 1× týdně, čas potvrdit s Lenkou)
Simuluje reálnou zkoušku: individuální otázka, písemná odpověď, vyučující čte a doptává se.
1. Claude zadá **jednu otázku** (střídat okruhy: pramen + metoda, osobnost, pojem 18.–20. st.) z dosud probraného; každý trénink jiná, jako u zkoušky.
2. Lenka napíše **písemnou odpověď** (souvislý text, jaký by napsala na papír) sama, bez karet.
3. Claude se chová jako doc. Kubík: odpověď přečte, **opraví** chyby (proti přepisu přednášky a pramenům), položí **doplňující otázku** (s přesahem do jiné metody nebo do Metodologie I), Lenka písemně doplní.
4. Výsledek (co sedělo, co chybělo) zapsat do tabulky „Trénink“, slabá místa → nové karty nebo čtení pramene.
Dashboard jako u Pecha **zatím není** (nabídnout, až bude víc přednášek).

## Průřezový přehled témat
| Téma (`k_`) | Zaznělo v přednáškách | Co přibylo |
|---|---|---|
| Winckelmann (`winck`) | 5. 10. | 1755, *Dějiny umění starověku*, dějiny stylu, Caylus |
| Styl, maniéra, vkus (`styl`, `maniera`, `vkus`, `depiles`, `bellori`) | 5. 10. | Bellori 1664/72, de Piles 1708, Goethe 1789 |
| Formalistická a kulturněhistorická metoda (`met`) | 5. 10. (jen úvod) | Wölfflin, Burckhardt, Du Bos, Le Clerc — **čekáme na hlavní výklad** |
| Znalectví, kritika, ikonologie (`met`) | 5. 10. (jen úvod) | zatím jen zmínky |
| Čeští historici umění | — | nezazněli |

## Zpracováno
| Přednáška | Témata | Karty | Stav |
|---|---|---|---|
| 5. 10. 2026 | osvícenství (1./2. generace), styl–maniéra–vkus, předchůdci (Vasari, van Mander, Sandrart, Baldinucci, Bellori, de Piles, Du Bos, Houbraken), Winckelmann, Diderot, Condorcet, metody, literatura ke zkoušce | 53 | ✅ sestaveno 261007, čeká na import do Anki |

## Trénink (záznamy)
| Datum | Co | Poznámky |
|---|---|---|
| — | zatím nic | |

## Otevřené
- Termíny zkoušky (první termín, dělení na dvě části) — vyučující je zatím neřekl.
- Čeští historici umění: první přednáška žádného nejmenovala (kromě M. Dvořáka v literatuře); karty po zmínkách v dalších přednáškách.
- Skripta/pramenná literatura: Lenka dosud nečetla; vyberme z ní vzorky (cca 10 stran) po jednom autorovi týdně, aby kryla různé metody.
