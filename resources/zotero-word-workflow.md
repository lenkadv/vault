# Zotero + Word — workflow pro seminárky ÚDKU UK

## Soubory

- CSL styl: `resources/udku_citation_style.csl` — [otevřít soubor](G:\Můj disk\vault\resources\udku_citation_style.csl)
- Citační pokyny ÚDKU: [otevřít PDF](G:\Můj disk\2  EDUCATION 📚\KTF\KTF-963-version1-ktf_18_version1_1_citacni_zasady_udku.pdf)
- Formální úprava KTF (vč. biblických citací, obrázků): [web KTF](https://www.ktf.cuni.cz/KTF-963-version1-formalni_uprava_ktfa.pdf) — [otevřít lokálně](G:\Můj disk\2  EDUCATION 📚\KTF\KTF-963-version1-formalni_uprava_ktfa.pdf)
- Šablona Word: [otevřít šablonu](G:\Můj disk\2  EDUCATION 📚\KTF\KTF-963-version1-ktf_963_version1_sablona_dipl_1a.docx)

---

## 1. Instalace CSL stylu do Zotera (trvalá)

1. Zotero → **Edit → Preferences → Cite → Styles**
2. Klikni **+** (plus) dole
3. Vyber `resources/udku_citation_style.csl`
4. Styl se zkopíruje do Zotera — zůstane natrvalo

> ⚠️ Double-click na .csl soubor nebo načtení přes "Manage Styles" je dočasné — styl po restartu zmizí. Vždy instalovat přes **+**.

**Aktualizace už nainstalovaného stylu** (po úpravě `udku_citation_style.csl`): Zotero si styl při instalaci zkopíruje k sobě — úprava souboru ve vaultu se sama nepropíše.
1. Cite → Styles → najdi **ÚDKU** v seznamu → označ → **–** (odebrat)
2. Znovu **+** → vyber upravený `resources/udku_citation_style.csl`

---

## 2. Propojení Zotera s Wordem

1. Otevři Word → zkontroluj záložku **Zotero** v ribbonu
2. Pokud záložka chybí: Zotero → **Edit → Preferences → Cite → Word Processors → Install Microsoft Word Add-in**
3. V ribbonu Zotero → **Document Preferences** → vyber styl **ÚDKU**

---

## 3. Vkládání citací

- **Citace v textu (footnota):** záložka Zotero → **Add/Edit Citation** → vyhledej zdroj → zadej stranu → Enter
  - Výsledek: `Hlinomaz 2003, s. 186–188.`
  - **U ÚDKU se do zkrácené citace v poznámce nikdy nepíše název díla** — jen příjmení, rok, strana. Platí i při úplně prvním výskytu díla (na rozdíl od obecného KTF vzoru, kde se plná citace píše jen napoprvé) — plný bibliografický údaj jde výhradně do závěrečného seznamu literatury.
- **Tamtéž:** Zotero to řeší automaticky, pokud citace bezprostředně následuje
- **Seznam literatury na konci:** Zotero → **Add/Edit Bibliography** → vloží kompletní seznam

### Kurziva v běžném textu

Dvě odlišné situace, stejný nástroj (kurziva), jiný důvod:

- **Název díla** zmíněný v textu (ne v citaci/katalogovém záhlaví) → kurzivou, bez tučného řezu (tučná kurziva je vyhrazená jen pro katalogová záhlaví, viz sekce 7). Platí i v nadpisech — termín/název si kurzivu podrží i uvnitř tučného nadpisu. Př.: *Bytí a nicota*, *Alphabet of Ben Sira*.
- **Citátový výraz** — cizí slovo/sousloví ponechané v textu v originále (nepřeložené) → taky kurzivou, ale jde o obecnou českou typografickou konvenci (Kočička/Blažek), ne o ÚDKU pravidlo. Př.: *male gaze*, *le regard*.
- **Biblické odkazy a podobné lokátory** (`Gn 1,27`, `1 Tim 2,14`) → **bez kurzivy** — je to zkrácený odkazový formát, ne název díla ani citátový výraz.
- Když cituješ dílo, které máš v Zoteru pod cizojazyčným (originálním) názvem, ale v textu ho chceš pojmenovat česky (čtenářsky plynulejší) — použij český název v kurzivě, cizí originál případně připoj v závorce při prvním výskytu. Citační aparát (poznámka, bibliografie) ale musí odpovídat skutečně citovanému vydání, ne tomu, jak dílo pojmenováváš v textu. Pokud pro dílo neexistuje žádný publikovaný český překlad (jen tvoje vlastní pracovní označení), použij název ve stejném jazyce jako citované vydání — nevymýšlet vlastní český název tam, kde by mohl matoucně působit jako název existujícího překladu.

---

## 4. Co Zotero nezvládne automaticky — ruční úpravy

| Situace | Co udělat |
|---|---|
| Německý editor: `hg. von Jméno` | Upravit ručně v textu po vygenerování |
| Ediční řada: `(=Malé karlovarské monografie, sv. 2)` | Dopsat do pole **Extra** v záznamu Zotera, nebo ručně |
| Archivní prameny | Zadat jako typ **Manuscript**, pole Archive + Archive Location |
| Katalogová hesla (číslovaný popis jednoho díla v katalogu, ne plynulá kapitola) | Kniha jako celek v Zoteru (typ **Book**), `creators` jen editor (autor hesla do Extra pro přehled — viz níže). Zotero/CSL sám nevygeneruje č. k. ani autora hesla, nutná ruční úprava po vložení citace, nejlépe až v rámci finální kontroly před odevzdáním (viz sekce 9), ne za psaní. „Kat. [Místo] [Rok]" prefix používat, jen když má publikace opravdu jedno jasné místo výstavy — viz výjimky níže. |
| Nepřímá citace (cit. dle) — cituješ zdroj A, ale fyzicky držíš jen zdroj B, který A cituje | Zadat oba zdroje do Zotera zvlášť (i A, i s neúplnými údaji, pokud je nemáš celé). Vložit citaci A → za ni ručně napsat `, cit. dle ` → vložit druhou živou citaci B. Výsledek: `Autor A rok, s. X, cit. dle Autor B rok, s. Y.` |
| Nepublikovaný pramen (např. restaurátorská zpráva) | Zadat jako typ **Report**. Do Title připsat `(nepublikovaná restaurátorská zpráva)` za název. Pokud je dostupný online i když je "nepublikovaný" v akademickém smyslu, doplnit `Dostupné z: URL` na konec — úzus to explicitně neřeší, ale zvyšuje to ověřitelnost zdroje |
| Instituce jako autor bez data (např. Bible/biblenet.cz) — citace vygeneruje jen `Instituce.` bez roku, což za vlastní větou zakončenou tečkou vypadá jako dvě useknuté věty a navíc nepůsobí jako rozpoznatelný odkaz na zdroj | Word pole s živou Zotero citací nejde ručně upravit uprostřed (přepíše se při refreshi) — pro tenhle typ deklarativní poznámky (viz níže Prameny bez data) proto Zotero vkládání úplně vynechat a napsat celou poznámku ručně jako plain text, včetně `(Instituce, b. d.)`. |

---

## Citace Bible, magisteria a patristické literatury

Tyhle zdroje se necitují přes Zotero jako běžná literatura (žádný krátký `PŘÍJMENÍ rok, s. X` styl) — mají vlastní formát podle formalni_uprava_ktfa.pdf (1.4.3), s vnitřním lokátorem místo strany.

⚠️ **Upřesnění (260801):** „necitují se přes Zotero" neznamená u jmenovaných patristických autorů (Tertullianus, Augustinus, Hieronymus...) „Zotero se nepoužívá vůbec" — to platí jen pro Bibli/magisterium/instituce bez osobního autora (viz „Prameny bez data" níže). U jmenovaného autora se postupuje takhle:
1. Založit Zotero položku (typ Webpage, autor jen `lastName`, žádné `date`, `extra` pole s poznámkou o vnitřním lokátoru, tag `rucni-zapis-do-seznamu-pramenu`) — viz vzor Tertullianus (`8FXUGVVR`).
2. Vložit citaci přes Zotero do poznámky pod čarou normálně (Add/Edit Citation) — bez data vygeneruje jen `Autor.` (např. `Tertullianus.`)
3. Hned za to ručně dopsat název díla + vnitřní lokátor: `, De Cultu Feminarum I,1.` — výsledek `Tertullianus., De Cultu Feminarum I,1.` (ano, dvojitá interpunkce `.,` je otisk tohohle postupu, zatím neopravovat, řeší se až při finální kontrole)
4. Díky kroku 2 se zdroj objeví v automaticky generovaném Seznamu literatury (i když s tagem `rucni-zapis-do-seznamu-pramenu` pro kontrolu před odevzdáním, viz sekce „Prameny bez data" níže)

### Bible
- Dvě soustavy zkratek knih: **ekumenická** (Český ekumenický překlad) nebo **katolická** (liturgické knihy, Katechismus) — vyber jednu a drž se jí důsledně v celé práci
- Formát: zkratka knihy [mezera] kapitola[čárka bez mezery]verš — `Mt 1,18`
- **Jediný formát, který se píše přímo v běžném textu, ne do poznámky pod čarou** — na rozdíl od ostatních citací
- Rozsah v rámci jedné kapitoly: pomlčka bez mezer — `Gn 3,1–7`
- Rozsah přes víc kapitol: pomlčka s mezerami — `Sk 6,8 – 8,3`
- Pozor na mezeru u zkratky: ekumenické `1K` (bez mezery), katolické `1 Kor` (s mezerou) — nemíchat systémy

### Dokumenty magisteria (koncilní dokumenty, katechismus, kanonické právo)
- V textu/poznámce jen zkratka + číslo článku/kánonu, **bez stránek**: `DV 12` (Dei Verbum, čl. 12), `KKC 871`, `CIC, kán. 1331`
- Víc odkazů najednou odděl středníkem: `DV 16; SC 25; KKC 1122`
- Do seznamu literatury patří plný bibliografický údaj použitého souborného vydání (ne přes Zotero — zadat ručně)

### Patristická literatura
Není v žádném ÚDKU/KTF dokumentu výslovně řešeno — obecná konvence oboru, ne KTF pravidlo. Cituje se podle kritických edic (nejčastěji Migne, *Patrologia Latina* / *Patrologia Graeca*) formátem **zkratka edice, svazek, sloupec** — ne strana:

> PL 32, col. 661 (= Augustinus, *Confessiones*, in: *Patrologia Latina*, sv. 32, sloupec 661)

Odpovídá to způsobu, jakým malý ÚDKU PDF řeší jiné edice pramenů (CDB, FRB, MGH) — zavedená zkratka + svazek + sloupec/strana, plné rozvedení v seznamu vydaných pramenů. Zkratka pro sloupec podle ÚDKU je `sl.` (starší příklad ve stejném dokumentu ale používá `col.` — obojí se v oboru běžně vidí, drž se jednoho důsledně v celé práci).

### Talmud
Taky obecná konvence, ne KTF pravidlo. Cituje se **pojednání (traktát) + folio + strana (a/b)** — univerzální foliace napříč vydáními, funguje jako biblická kapitola,verš:

> Talmud Bavli, Sanhedrin 39a.

nebo se zavedenou zkratkou `b.` (Bavli, na rozdíl od `y.` pro jeruzalémský Talmud): `b. Sanhedrin 39a.`

Na rozdíl od Bible nemá Talmud v KTF pravidlech výslovnou výjimku "přímo do textu bez poznámky" — bezpečnější je citovat v poznámce pod čarou jako u ostatních pramenů, s folio+stranou místo čísla strany. Konkrétní použitý překlad/edici (viz Sefaria níže) deklarovat jednou u prvního výskytu, stejně jako u Bible.

### Obecný vzorec pro všechny primární prameny s vlastním vnitřním členěním

Stejný přístup jako u Talmudu platí i pro **Zohar** (svazek + folio + strana, např. `Zohar I, 34b`), **Abecedu Ben Sira** (číslo pasáže, např. `Abeceda Ben Sira, 78`) a **spisy církevních otců** (kniha,kapitola, např. `Tertullianus, De Cultu Feminarum I,1` nebo `Augustinus, De Genesi ad Litteram XI,30–42`): cituje se vnitřním lokátorem nezávislým na vydání, konkrétní použitá edice/překlad se deklaruje jednou u prvního výskytu v poznámce. Pokud pro dílo neexistuje ověřený český překlad, použít volně dostupný latinský/originální text (např. tertullian.org, thelatinlibrary.com, Perseus Scaife Viewer) a přeložit si pasáž sama — u patristiky je to běžná a legitimní praxe.

**Než něco založit do Zotera:** vždy nejdřív potvrdit u Lenky, že zdroj skutečně vidí/má přístup — nezakládat automaticky jen na základě researchu (viz [[feedback_zotero_confirm_before_add]]).

### E-book bez tiskového stránkování

Když má Lenka zdroj jen jako e-book bez čísel stran (reflowable formát, nebo PDF konverze, kde čísla stran jsou jen artefakt prohlížeče, ne skutečné stránkování žádného vydání): **ÚDKU na tenhle případ má vlastní oficiální zkratku — `nepag.` (nestránkováno)** — viz Citační úzus ÚDKU KTF UK, příloha `formalni_uprava_ktfa.pdf`, s. 22, ve stejné skupině jako `s. d.` (bez data) a `s. l.` (bez místa vydání). Použít ji přímo v citaci místo čísla strany, doplněnou nadpisem/podnadpisem jako lokátorem (protože `nepag.` samo o sobě neurčuje místo v textu):

> `Viennot 2020, nepag. — Chapitre premier: Des héritages lourds – La dégradation du statut juridique des femmes.`

`nepag.` se vztahuje ke **konkrétní citované edici** (Lenčinu e-booku), ne k dílu obecně — i kdyby jiné vydání stránkování mělo, tohle je poctivé a přesné, protože Lenka cituje edici, kterou skutečně používá.

⚠️ Nezapomenout **tečku na konci celé citace** (malý ÚDKU PDF: „tečka se píše pouze na konci citace") — u víceúrovňového lokátoru je snadné na ni zapomenout, protože sama poslední úroveň tečku nemá.

⚠️ Názvy kapitol/podkapitol použité jako lokátor se píšou **bez uvozovek a bez kurzivy** — malý ÚDKU PDF chce kurzivu jen pro názvy celých monografií, „tituly článků, studií, kapitol... nekurzivně", a v žádném vzoru citace se název kapitoly neuvozuje uvozovkami. Správně tedy: `Viennot 2020, nepag. — Chapitre premier: Des héritages lourds – La dégradation du statut juridique des femmes` (víceúrovňový lokátor oddělený dvojtečkou/pomlčkou, žádné „...").

### Podcast / přednáška / rozhovor (audio-video zdroj bez stránkování)

Stejný problém jako u e-booku bez stránkování — ÚDKU nemá pro audio/video vlastní vzor (ověřeno, malý PDF ho neobsahuje), takže se použije stejná logika jako u `nepag.`: **časová značka jako lokátor** místo strany.

> `Hessel 2026, 00:15:32`

Zdroj se zakládá jako LN s `typ: podcast` (nebo `přednáška`/`rozhovor`), `kde_najit` = odkaz na epizodu/záznam. Zavedeno 260805 při přestavbě zettelkastenu — viz [[zettelkasten/MOC – Zettelkasten]].

Skutečné tiskové stránkování (přes Cairn.info u francouzských odborných knih, dostupné jako `...-page-XXX` odkazy dohledatelné přes `[[WebSearch]]`, i když cairn.info sám blokuje přímý fetch) použít jen jako **orientační doplněk** pro celé kapitoly (Cairn indexuje na úrovni kapitol, ne podsekcí) — nepoužívat ho jako zdroj čísla strany pro pinpoint citaci, kterou Lenka nemůže ve vlastním e-booku ověřit.

Zavedeno 260801 u Éliane Viennot, „La fin de la Renaissance", in: Reid (ed.), *Femmes et littérature* I, Gallimard 2020 (Zotero `PB4P5GNM`) — vnitřní hierarchie nadpisů zapsaná v poli Extra dané položky, doplňovat při každé nové citované podkapitole.

### Katalogová hesla — přesný vzor podle ÚDKU PDF (sekce A5)

Platí jen pro **číslované popisy jednoho konkrétního díla** v katalogu (má vlastní č. k.) — ne pro plynulé kapitoly/eseje uvnitř téhož katalogu (ty se citují normálně jako A3, autor jako `creators`; příklad z Zotera: Fučíková „The Life"/Schütz „Portrait Painting" jako běžné kapitoly v katalogu Fusenig 2010).

**V poznámce pod čarou (vzor z PDF):**
> Kat. Praha 1993, s. 118–121, č. k. III/1.13 (autor hesla Pavel Preiss).

**V seznamu bibliografie:**
> KAT. PRAHA 1993
> *Artis pictoriae amatores: Evropa v zrcadle pražského barokního sběratelství*, ed. Lubomír Slavíček, Praha 1993.

Klíčové odlišnosti od běžné citace kapitoly:
1. Zkratka v poznámce i v bibliografii je **„Kat. [Místo] [Rok]"**, ne jméno editora.
2. Musí obsahovat **číslo katalogu (č. k.)** konkrétního hesla, ne jen stranu.
3. **„(autor hesla Jméno)"** se píše přímo viditelně do textu poznámky, ne jen jako soukromá poznámka.
4. Bibliografický záznam je **celá kniha** (title, editor, místo, rok) — žádná dílčí sekce/kapitola se do bibliografie zvlášť nedostává, i když různá hesla v knize napsali různí autoři.

⚠️ **Past chyba (opravena 260730):** Pro katalogová hesla z knihy Fusenig 2010 jsem nejdřív omylem založila samostatné Book Section položky per sekce („Prague", „Munich and Augsburg") — to je špatně, vytvořilo by to v bibliografii druhý, matoucí záznam ke stejné knize (jednou pod „FUSENIG 2010", podruhé pod „KAT. BERLIN – MÜNCHEN 2010" s cizím titulem sekce). **Pro všechna číslovaná hesla z jedné knihy stačí a musí se používat jedna základní položka knihy** (editor jako `creators`, ISBN, místo, rok) — žádné odvozené položky za sekci.

⚠️ **„Kat. [Místo] [Rok]" prefix nesedí mechanicky vždycky (zjištěno 260730 u Fusenig 2010).** Vzor z PDF (Kat. Praha 1993) počítá s jednoduchým případem: jedna výstava, jedno město, publikace = čistý katalog. Nesedí, když:
- výstava putovala po víc institucích/městech (Fusenig 2010: Aachen → Praha → Vídeň) — pak není jednoznačné „místo",
- „místo vydání" v tiráži je jen sídlo nakladatelství, ne místo konání výstavy (Berlin – München = sídlo Deutscher Kunstverlag, ne místo výstavy),
- publikace je svým charakterem spíš odborná kniha s eseji, ke které patří i katalogová část, ne čistě katalog.

V takových případech se cituje **jednotně pod editorem jako běžná edited kniha** (např. „Fusenig 2010"), i pro číslovaná hesla — jen s doplněným č. k. a autorem hesla: `Fusenig 2010, s. [strana], č. k. [číslo] (autor hesla [Jméno]).` Bez „Kat." prefixu, bez ruční úpravy záhlaví bibliografie — Zotero vygeneruje správně samo. Rozhodnout případ od případu, ne automaticky aplikovat „Kat. Místo Rok" na každý zdroj se štítkem "exhibition catalog".

**Jak na to v Zoteru/Wordu:** Zotero/CSL tohle samo nevygeneruje (styl je nastavený na autora/editora + rok). Postup:
1. Kniha jako celek v Zoteru — typ **Book**, `creators` = editor katalogu. Do Extra u téhle položky napsat, kteří autoři napsali které číslované sekce/hesla (pro vlastní přehled), a připomínku postupu z bodů 2–4 níž.
2. Za psaní vložit citaci normálně přes Zotero, přes tuhle jednu položku, s příslušnou stranou jako locator (vygeneruje např. „Fusenig 2010, s. 224.") — funguje jako placeholder, bez ohledu na to, které číslo hesla nebo který autor hesla se zrovna cituje.
3. **Až při finální kontrole před odevzdáním** (spolu s Unlink Citations, viz sekce 9) ručně přepsat každou takovou citaci na plný ÚDKU tvar — přidat č. k. a „(autor hesla X)", opravit „Fusenig 2010" na „Kat. [Místo] [Rok]". Dělat to až na konci, ne za psaní — Word pole se živou Zotero citací se při refreshi (`F9`) přepíše a ruční úpravy uprostřed by se ztratily.
4. V bibliografii po vygenerování ručně opravit záhlaví "FUSENIG 2010" → "KAT. [MÍSTO] [ROK]" (jen záhlaví, zbytek řádku sedí) — **jen jednou**, i když se z knihy cituje víc různých hesel/autorů.

⚠️ **Autor sekce (podle obsahu knihy) ≠ autor konkrétního hesla.** V katalogové části bývá u obsahu uveden jen autor úvodního/spojujícího textu širší sekce (např. „Munich and Augsburg" — Jacoby); jednotlivá číslovaná hesla uvnitř té sekce často psali jiní specialisté a podepisovali se iniciálami na konci hesla. „(autor hesla X)" v citaci musí odpovídat tomu, kdo skutečně podepsal *dané konkrétní heslo* — vždy ověřit iniciály/podpis u hesla samotného, ne jen převzít autora sekce z obsahu. (Zjištěno 260730 u Fusenig 2010: heslo č. 26, s. 141, leží v sekci Jacobyho, ale je podepsáno „EF" = Eliška Fučíková.)

### Prameny bez data — sledování přes Zotero štítek

Bible i primární prameny typu Talmud v Zoteru typicky nemají datum → citace vygeneruje jen `Instituce.` bez roku, což potřebuje ruční `, b. d.` a kvůli uzamčeným Word polím se musí psát jako celá poznámka ručně (viz tabulka výše) — **tyhle položky se tak nikdy nedostanou do automatické Zotero bibliografie** a hrozí, že se na ně zapomene v seznamu pramenů.

**Řešení:** každé takové položce v Zoteru přidat štítek `rucni-zapis-do-seznamu-pramenu` (bez diakritiky — s diakritikou se při zápisu přes API/curl na Windows tag poškodil). Před odevzdáním: Zotero → levý panel **Tags** → klikni na štítek → vyfiltruje přesně to, co je potřeba ručně přidat do sekce Prameny vydané.

Aktuálně takhle otagované: Bible (biblenet.cz, ČEP), Talmud (Sefaria, William Davidson Talmud/Steinsaltz) a Tertullianus, *De Cultu Feminarum* (tertullian.org, latinský text).

---

## 5. Před odevzdáním

1. **Záloha dokumentu** (uložit kopii!)
2. Zotero ribbon → **Unlink Citations** — odpojí živé citace, zmrazí jako plain text
3. Bez tohoto kroku se citace mohou rozbít na jiném počítači nebo při konverzi

---

## 6. Formátování dokumentu — přenos stylů ze šablony

Pokud máš text napsaný jinde (Google Docs → .docx) a potřebuješ aplikovat styly ze školní šablony:

### Přenos stylů přes Organizátor

1. Záložka **Domů** → panel Styly (šipka vpravo dole od sekce Styly) → **Spravovat styly** → **Importovat/exportovat**
2. Vlevo je tvůj dokument, vpravo klikni **Zavřít soubor** → **Otevřít soubor**
3. V dialogu změň filtr na **Všechny soubory (\*.\*)** — jinak se .docx šablona nenabídne
4. Vyber šablonu KTF
5. Vpravo označ všechny styly (klik na první, Shift+klik na poslední) → **← Kopírovat**
6. Na dotaz "Přepsat stávající?" → **Ano všem**
7. **Zavřít**

> 💡 Šablona se v dropdownu "Styly ze souboru" sama nenabízí (Word tam ukazuje jen `Normal.dotm` a právě otevřené dokumenty). Pro rychlejší přístup příště: připnout `KTF-963-version1-ktf_963_version1_sablona_dipl_1a.docx` do **Rychlého přístupu** v Průzkumníku (pravý klik → Připnout do rychlého přístupu) — pak je v dialogu Otevřít soubor jedním klikem. Případně zkontrolovat seznam "Naposledy použité" v tom samém dialogu, tam se po prvním otevření může objevit taky.

### Odsazení prvního řádku odstavce — typografická výjimka po nadpisu

Styl **Základní text** má mít odsazení 1. řádku 0,5 cm (formalni_uprava_ktfa.pdf, bod 4.2.1). Odstavec hned po nadpisu (např. první odstavec pod „Úvod") ale smí být bez odsazení — existuje pro něj varianta stylu **Základní text 1 / Tělo textu 1**. Není to chyba šablony.

⚠️ Pokud i **druhý** odstavec (ne hned po nadpisu) zůstane bez odsazení, pak už styl „Základní text" v šabloně opravdu nemá nastavené odsazení a je potřeba ho opravit: Domů → panel Styly → pravý klik na „Základní text" → Změnit → Formát → Odstavec → Speciální: **První řádek** → 0,5 cm.

### Nastavení footnot

Reference → šipka v rohu sekce "Poznámky pod čarou":
- Umístění: Pod čarou na stránce
- Formát čísla: 1, 2, 3…
- Číslování: Průběžné

### Číslování kapitol

1. Záložka **Domů** → šipka u tlačítka víceúrovňového seznamu
2. Vyber variantu **"1 Nadpis 1 / 1.1 Nadpis 2 / 1.1.1 Nadpis 3"** (třetí v sekci Knihovna seznamů, vpravo dole)
3. Nadpisy bez číslování (Obsah, Úvod, Závěr, Seznam literatury): klikni na nadpis → víceúrovňový seznam → **Žádné**
4. Pokud po odebrání číslování nesedí čísla: klikni na první číslovaný nadpis → pravý klik na číslo → **Nastavit hodnotu číslování** → nastav na 1

**Tečka za číslem (1. / 1.1. / 1.1.1., ne 1 / 1.1 / 1.1.1):**
Vzorová varianta ji sama nepřidá — je třeba upravit definici seznamu:
1. Šipka u víceúrovňového seznamu → **Definovat nový víceúrovňový seznam...**
2. Vlevo vyber **Úroveň 1** → v poli **Formát čísla** klikni **za** šedý placeholder (ne do něj!) → napiš `.`
3. Totéž pro **Úroveň 2** a **Úroveň 3**
4. Zkontroluj, že **Propojit úroveň se stylem** = Nadpis 1 / Nadpis 2 / Nadpis 3 podle úrovně
5. OK

> ⚠️ **Přenos stylů přes Organizátor** (viz výše) typografii nadpisů zkopíruje, ale **napojení číslování na styl ne** — jde o samostatný objekt (linked list), který se musí nastavit znovu i po naimportování hotových stylů Nadpis 1–3. Známá vada Wordu.

### Vložení poznámky pod čarou ručně

**Reference → Vložit poznámku pod čarou** (nebo `Alt+Ctrl+F`)
Zotero toto dělá automaticky při vložení citace — není třeba ručně.

### Navigace v dokumentu

**Zobrazení → Navigační podokno** (nebo `Ctrl+F` → záložka Nadpisy) — zobrazí osnovu vlevo, kliknutím přeskočíš na kapitolu.

---

## 7. Obrázky a obrazová příloha (dle citačního úzu ÚDKU, příloha formalni_uprava_ktfa.pdf)

### Pořadí závěrečných částí práce (bod 1.2.7 formalni_uprava_ktfa.pdf)

1. Závěr
2. *(Obrazová příloha)* — nepovinná
3. *(Seznam vyobrazení)* — nepovinný
4. Seznam použitých zkratek — povinný jen u bakalářské/diplomové/disertační práce (u seminárky nepovinný, viz 1.2.8)
5. Seznam použité literatury / pramenů — povinný i pro seminárku
6. *(Rejstříky, další přílohy)* — nepovinné, na úplný konec

Obrazová příloha a seznam vyobrazení jdou **před** seznam zkratek a literatury, ne za něj. Prázdná Word šablona KTF má defaultně jiné pořadí (Seznam zkratek → Seznam literatury → obecné "Přílohy" na konci) — to je obecná varianta bez obrazové přílohy jako samostatného bloku; pro práci s vyobrazeními je potřeba přeuspořádat nadpisy podle bodu 1.2.7 (viz vzor v [[projects/seminarka-restaurovani]]).

### Odkaz na obrázek v textu
`[2]` — číslo v hranatých závorkách, **tučně**

### Odkaz na obrázek v poznámce pod čarou
`obr. 24` — nebo originální označení: Abb., Taf., Tab. atp.

### Popisky pod obrázky
Bez tečky na konci. Formát podle tématu:
- *podle lokality:* `1. Litomyšl, zámek, sgrafito na fasádě, detail, foto: autor`
- *podle ikonografie:* `2. Samson a Dalila, kolem 1570, sgrafito`
- *podle názvu díla:* `3. Bible boskovická, fol. 425, Adorace Krista, po roce 1415`
- *podle autora:* `4. Václav Chad: Ukřižování, 1941, olej, lepenka, 99 × 65 cm`

### Seznam vyobrazení (na konci práce, před seznamem literatury)
Uvádí se zdroj:
- fotografie: `Foto: autor` / `Foto: ÚDU AV ČR`
- reprodukce (tištěný zdroj): `Reprodukce z: TAKÁCS 1998, 105, obr. 25`
- reprodukce (internetový zdroj, dle formalni_uprava_ktfa.pdf s. 25):
  - web **s autorem** (článek, katalogové heslo s uvedeným autorem) → zadat jako Zotero položku (Webpage) a citovat zkráceně stejně jako tištěnou reprodukci: `Reprodukce z: JÄGGI 2005`
  - web **bez autora** (muzejní databáze, katalogová stránka) → plná URL + datum přístupu: `Reprodukce z: http://petrbrandl.eu/..., vyhledáno 2. 7. 2026`
  - **Wiki/Wikimedia Commons a galerijní databáze obecně spadají pod „bez autora"** — u obrázku samotného typicky není jmenovaný osobní autor reprodukce, i když stránka jako celek autora má (instituce, projekt). Výjimka: pokud je u konkrétní reprodukce podepsaný autor (článek, katalogové heslo), cituje se zkráceně jako tištěná reprodukce, viz výše.
  - **Uživatelská jména/přezdívky na Wikimedia Commons se počítají jako „bez autora"**, i když tam formálně nějaké jméno je (rozhodnuto 260731) — přezdívka nahrávajícího uživatele není dohledatelná autorská identita jako u recenze nebo katalogového hesla, kde jméno vypovídá o autoritě zdroje. Nemá cenu kvůli tomu pátrat, kdo se za přezdívkou skrývá — vždy URL + vyhledáno. (Licence typu CC BY formálně vyžaduje uvedení autora — pro citaci dle ÚDKU to neřešit, ale kdo chce být licenci věrný, může nepovinně připojit „Foto: [přezdívka]/Wikimedia Commons".)
  - **Jmenovaný fotograf, ale žádné tvrzení z pramene se necituje** (rozhodnuto 260801, u fotografie z databáze Centre André Chastel — foto Céline Gumiel) → nezakládat do Zotera, nevkládat footnotu. Kombinovaný formát: `Foto: Jméno Příjmení, Instituce. Reprodukce z: URL`. Zotero + footnota do hlavního textu (viz „Citace zdroje obrázku" níže) je vyhrazená jen pro případy, kdy se z pramene skutečně cituje/používá nějaké tvrzení (např. lot essay aukčního domu argumentující atribuci) — ne pro čistou atribuci fotografa.
  - **Zkratka pro hodně obrázků z internetu najednou:** ÚDKU (viz sekce D malého PDF) dovoluje u internetových zdrojů jedno souhrnné datum ověření na konci seznamu místo opakování „vyhledáno" u každé položky — použitelné i tady. Do popisku (Krok 1 níže) napsat celou URL, na konec Seznamu vyobrazení/literatury přidat jednou větu: *„Všechny internetové zdroje vyobrazení ověřeny ke dni DD. MM. RRRR."* — a u jednotlivých URL pak „vyhledáno" nemusí být.

### Word — titulky a křížové odkazy
Pro automatické číslování obrázků: klikni na obrázek → pravý klik → **Vložit titulek**
Pro odkaz v textu: **Vložení → Křížový odkaz** → typ Obrázek → Vložit
Aktualizace číslování: `Ctrl+A` → `F9`

> ⚠️ Formát odkazu `[2]` tučně nelze v MS Word plně automatizovat přes titulky — číslo se generuje, ale závorky a tučné písmo je třeba formátovat ručně nebo přes styl.

### Automatické číslování obrázků (Word)

Cíl: obrázky se číslují automaticky, odkaz v textu `[2]` se aktualizuje při přidání/odebrání obrázku.

**Krok 1 — dialog Titulek:**
- Klikni **Nový popisek** → napiš `KTF obr` → OK
- Vyber štítek `KTF obr` ze seznamu
- Zaškrtnout: **Vyjmout z titulku popisek**
- Umístění: pod vybraným objektem
- Klikni OK → Word vloží číslo `1`
- Za číslo ručně napiš popisek **včetně zdroje** (viz níže) — po celou dobu psaní, ne až na konci

**Formát popisku pod obrázkem (během psaní — obsahuje i zdroj kvůli automatizaci, viz Krok 4):**
`1. Popis díla, lokalita, datace. Foto: autor`
`1. Popis díla. Reprodukce z: PŘÍJMENÍ rok, strana, obr. číslo`
— strana bez zkratky `s.` (citační úzus ÚDKU)

**Krok 2 — Křížový odkaz v textu**
1. V textu postav kurzor na místo odkazu
2. **Vložení → Křížový odkaz** → typ = tvůj štítek → Pouze číslo → Vložit
3. Ručně přidej `[` před a `]` za → označ tučně (`Ctrl+B`)

**Krok 3 — Seznam vyobrazení (plně automatický)**
1. Postav kurzor na místo seznamu
2. **Reference → Vložit seznam obrázků** → vyber svůj štítek → OK
3. **Vypnout „Zobrazit čísla stránek"** (a tím i zarovnání vpravo/vodicí znak) — ověřeno v obhájených pracích 260802: Seznam vyobrazení na čísla stránek neodkazuje, i když samotná obrazová příloha čísla stránek má (viz sekce 8, Stránkování). Zůstane jen popisek a číslo obrázku. Formáty: Podle šablony.
4. Protože popisek obsahuje i zdroj (Krok 1), seznam ho zdědí automaticky — při přehození pořadí obrázků nebo přidání/odebrání se přes `Ctrl+A` → `F9` sám přeuspořádá i přečísluje, nic se ručně neopravuje

**Krok 4 — Před odevzdáním: zkrácení popisků pod obrázky**
Citační úzus ÚDKU chce mít popisek pod obrázkem stručný (bez zdroje) a zdroj až v seznamu vyobrazení. Dokud se ale píše, je zdroj v popisku kvůli automatizaci (Krok 1–3) žádoucí. Proto tohle udělat jako jeden z posledních kroků, spolu s Unlink Citations u Zotera (viz sekce 9):
1. Naposledy aktualizuj seznam: klikni do něj → `F9`
2. Označ celý vygenerovaný seznam vyobrazení → **`Ctrl+Shift+F9`** — pole se "zmrazí" na obyčejný text a přestane se řídit popisky
3. Teprve pak jdi zpátky k jednotlivým popiskům pod obrázky v textu a zkrať je (odeber `Foto:.../Reprodukce z:...` část) — zmrazený seznam na konci zůstane nedotčený
4. Od tohoto bodu už na seznam vyobrazení neaplikuj `F9` (na zbytek dokumentu — obsah, čísla obrázků, křížové odkazy — normálně ano)

**Aktualizace číslování po přidání obrázku (dokud seznam není zmrazený):**
`Ctrl+A` → `F9`

### Citace zdroje obrázku — known issue

Zotero v popisku titulku vždy vytvoří footnotu (CSL styl je nastaven jako "note") — nelze obejít.

**Řešení:**
- Popisek napiš ručně ve správném formátu ÚDKU
- Zdroj vlož přes Zotero do footnoty u odkazu `[1]` v hlavním textu — tam přirozeně patří a zároveň se zdroj dostane do bibliografie
- V bibliografii se zobrazí jen zdroje vložené přes Zotero — ručně psané citace se tam neobjeví

**Pokud odkaz `[X]` na obrázek už má vlastní poznámku s jiným obsahem** (a nová viditelná citace by tam vypadala nekonzistentně vůči sousedním odkazům bez poznámky): vlož Zotero citaci do téže poznámky, kamkoli, a označ ji jako **skrytý text** (`Ctrl+Shift+H`). V náhledu je vidět jen jako tečkované podtržení (normální chování editoru, ne chyba), v tisku/PDF exportu zmizí úplně, ale Zotero ji pro bibliografii stále zohlední. Přežije i Unlink Citations (sekce 9), není potřeba se k tomu vracet.

### Kompletní formule popisku

`Autor díla: Název díla, datace, technika/materiál, rozměry. Instituce, město[, inv. č.]. Reprodukce z: zdroj`

- **Autor díla** (ne autor fotky/reprodukce) jde na úplný začátek, před dvojtečku.
- **Rozměry:** jen dílo samotné (výška × šířka), ne rám ani hloubka/tloušťka desky.
- **Instituce/sbírka** jde za techniku a rozměry, **před** „Reprodukce z:" — a na rozdíl od zdroje reprodukce **zůstává v popisku i po finálním zkrácení** (Krok 4), protože identifikuje dílo samotné (kde fyzicky je), ne odkud je fotka.
- U fresek a architektonicky vázaných děl (nelze přesunout do sbírky) je lokalita/instituce stejně důležitá jako u vzoru „podle lokality".
- **Verzálky:** jméno v „Reprodukce z: PŘÍJMENÍ rok" se píše VERZÁLKAMI (`Ctrl+Shift+K`) — platí jak v popisku (protože se doslovně kopíruje do Seznamu vyobrazení), tak výsledně tam. Neplatí pro běžné poznámky pod čarou (tam normální tvar, jak generuje Zotero).
- **Detail/výřez z fotografie:** vlož celou fotku → **Formát obrázku → Oříznout** → přetáhni okraje na požadovanou část → potvrď mimo obrázek. Do popisku připsat „detail" (stejný vzor jako u „podle lokality").

### Odkazy v popiscích — nedělat klikatelné

Piš/vkládej URL jako obyčejný text, ne hypertextový odkaz — řešit hned při vkládání, ne hromadně na konci (`Ctrl+Shift+F9` na celý popisek by smazalo i automatické číslo obrázku z Kroku 1).
- Průběžně: Soubor → Možnosti → Kontrola pravopisu a mluvnice → Možnosti automatických oprav → Automatické formátování při psaní → odškrtnout „Internetové a síťové cesty hypertextovým odkazem".
- U už vzniklého odkazu: označ URL → pravý klik → **Odebrat hypertextový odkaz**.

### Wiki/Commons uživatelská jména = bez autora

Přezdívka nahrávajícího uživatele na Wikimedia Commons (nebo obdobné komunitní databázi) se počítá jako „bez autora", i když tam formálně nějaké jméno je — není to dohledatelná autorská identita jako u recenze/katalogového hesla. Nepátrat, kdo se za přezdívkou skrývá — vždy URL + vyhledáno.

### Formát pro předávání hotových popisků v konverzaci

Když Claude prochází dávku obrázků a diktuje hotové popisky zpět: blockquote + monospace (`> `X. ...``), s „X." místo skutečného čísla (skutečné číslo dá až Word automaticky), a **bez hypertextových odkazů** v URL (jinak se v samotné konverzaci nekliká, ale při kopírování do Wordu by se to zase muselo ručně odstraňovat).

---

## 8. Stránkování

Cíl: titulní strana a obsah bez čísel, číslování od strany 1 od Úvodu.

1. Postav kurzor těsně před "Úvod"
2. **Rozložení → Konce → Další stránka** (oddíl, ne jen konec stránky!)
3. Klikni do textu za Úvodem → **Vložení → Číslo stránky** → dole uprostřed
4. Klikni do zápatí → záložka **Návrh** → zruš **Propojit s předchozím**
5. Přejdi do zápatí první části → smaž číslo stránky pokud se tam zobrazilo
6. Zpět v zápatí druhé části → **Vložení → Číslo stránky → Formát čísel stran** → Začít od: 1
7. Pokud čísla nejsou na všech stránkách: klikni do zápatí → v záložce Návrh zruš **Jiná první stránka**

Čísla stránek jsou na všech stránkách od Úvodu do konce (vč. obrazové přílohy, seznamu vyobrazení, bibliografie).

---

## 9. Před odevzdáním — finální kontrola

1. `Ctrl+A` → `F9` — aktualizace obsahu, číslování obrázků, křížových odkazů
2. Zkontrolovat obsah — sedí čísla stran?
3. **Záloha dokumentu** (uložit kopii se suffixem `_pred-unlink`)
   > ⚠️ **Uložit jako** přepne aktivní okno Wordu na tu novou kopii `_pred-unlink` — originál zůstane na disku nedotčený, ale ty teď pracuješ v kopii! Zavři okno a **znovu otevři původní soubor** (bez suffixu), než budeš pokračovat krokem 4. Kopie `_pred-unlink` tak zůstane netknutá jako pojistka se živými citacemi.
4. Zotero ribbon → **Unlink Citations** — zmrazí citace jako plain text (bez tohoto se mohou rozbít na jiném počítači)
5. Zkontrolovat bibliografii — zarovnání vlevo (`Ctrl+A` v sekci bibliografie → `Ctrl+L`)
6. Zotero → vyfiltrovat štítek `rucni-zapis-do-seznamu-pramenu` → ověřit, že každá položka je ručně zapsaná v sekci Prameny vydané (viz sekce "Prameny bez data" výše)

---

## Zjištění stavu rozepsaného .docx bez otevírání ve Wordu

Google Drive MCP nástroj (`read_file_content`) umí přečíst obsah `.docx` přímo přes Drive API jako čitelný text — na rozdíl od otevření v Google Docs (viz sekce níže) při tom soubor **nijak needituje ani nekonvertuje**, je to čistě read-only fetch. Užitečné pro rychlé zjištění „kde jsme skončily" na začátku sezení (poslední napsaný odstavec, placeholdery `[pozn.]`/`[obrázek]`, rozepsané poznámky) bez nutnosti Lenka popisovat stav ručně nebo otevírat Word. Použito 260728 k obnovení kontextu seminárky Male Gaze po přestávce.

---

## ⚠️ NIKDY neotvírat hotový .docx v Google Docs — ani z telefonu

**HOTOVÝ `.docx` (seminárka, bakalářka) SE ZA ŽÁDNÝCH OKOLNOSTÍ NESMÍ OTEVÍRAT V GOOGLE DOCS — ANI Z TELEFONU, ANI "JEN NA PŘEČTENÍ".**

Otevření `.docx` z Google Drive na telefonu vypadá jako čtení, ale Drive app ho běžně otevře v editačním "Office kompatibilním" režimu — jakákoli změna (i omylem) se rovnou uloží zpátky do `.docx` a poláme Wordí prvky (TOC pole, Zotero citace, styly, číslování kapitol). Stalo se 260703 — text seminárky Restaurování dopsaný a zkontrolovaný 260702 se po telefonu rozpadl. Naštěstí PDF poslané vedoucímu bylo uloženo už předtím.

**Na čtení hotového dokumentu (na telefonu i jinde) použít výhradně PDF export — nikdy neotvírat živý `.docx`.**

**Pokud přesto dojde k poškození**, obnovit přes historii verzí v Google Docs (otevřít soubor na docs.google.com, ikona hodin vpravo nahoře / `Ctrl+Alt+Shift+H`) — najít poslední "Importovaný soubor .docx" verzi před poškozením a **Obnovit tuto verzi**.

⚠️ **Po obnovení verze kontrolovat výsledek ve Wordu, ne v náhledu Google Docs.** Google Docs `.docx` interně konvertuje a přepočítává řádkování/stránkování/titulky jinak než Word — i správně obnovená verze může v Docs vypadat rozbitá (přetékající řádky, zmizelé titulky obrázků), přestože je soubor v pořádku. Google Docs náhled proto není spolehlivý test korektnosti — je potřeba otevřít reálně ve Wordu.

### Jak bezpečně dělat revize z telefonu

Google Docs app je vyloučená (viz výše). Bezpečná cesta je mobilní appka **Microsoft Word** — čte `.docx` nativně, nekonvertuje formát, takže neláme TOC/citace/styly:

1. Nainstalovat Word (Android/iOS, zdarma s Microsoft účtem)
2. Ve Wordu: **Otevřít → Přidat místo → Google Drive** → přihlásit Google účtem → najít soubor přímo v Drive (žádná kopie, stále jeden zdroj pravdy)
3. Před jakoukoli úpravou zapnout **Sledování změn** (Revize → Sledování změn) — i kdyby ses spletla nebo omylem něco přepsala, změna zůstane viditelná a jde vrátit, místo aby se tiše propsala do finálního textu
4. Čistě na čtení (bez revizí) zůstává nejbezpečnější PDF export — Word app otevři jen když chceš opravdu něco poznamenat/opravit

Pokud revize z telefonu nejsou nutné hned, alternativa bez instalace appky: přečíst v PDF a poznámky/změny nadiktovat/zapsat jinam (Obsidian mobile, Notion), promítnout do `.docx` až později na počítači.

---

## Známé problémy a jejich řešení

| Problém | Příčina | Řešení |
|---|---|---|
| Záhlaví bibliografie (`BOŠTÍK 2007`) je roztažené přes celý řádek | Word justifikuje `display="block"` elementy | Po refreshi označit bibliografii → `Ctrl+L` |
| Citace v popisku obrázku vytvoří footnotu | CSL styl je "note" — nelze vložit inline | Popisek napsat ručně, zdroj vložit Zoterem do footnoty u odkazu `[1]` v textu |
| Tamtéž se zobrazí místo správné citace | Zotero detekuje opakování zdroje | Kliknout na citaci → Add/Edit Citation → hledat možnost potlačení ibid |
| Titulek obrázku zůstal na původním místě po přesunu | Word nepřesouvá titulek spolu s obrázkem | Označit titulek → `Ctrl+X` → vložit pod obrázek |
| U webových zdrojů (`Webpage`) se do vygenerované citace nepropíše „vyhledáno DD. MM. RRRR" | CSL styl accessDate u tohoto item typu nezahrnuje do poznámkového makra | Dopsat ručně za citaci, stejně jako u „cit. dle" — `Christie's 2010, vyhledáno 31. 7. 2026.` (zjištěno 260731) |

---

## Rozsahy stránek — bez elidování

Velký KTF dokument (`formalni_uprava_ktfa.pdf`, s. 14) předepisuje rozsahy stránek/letopočtů zapisovat **vždy celé, krátkou pomlčkou bez mezer** — příklad v PDF: `1380–1390` (ne zkráceně `1380–90`). Platí i pro citace v poznámkách i v bibliografii.

Tohle **není nastavení v Zotero Preferences** (tam nic takového není) — je to atribut `page-range-format` přímo v CSL souboru (`resources/udku_citation_style.csl`, řádek 2, na elementu `<style>`). Hodnota `minimal-two` (zjištěno 260802) elidovala rozsahy (`134–183` → `134–83`), v rozporu s KTF pravidlem — opraveno na `expanded` (CSL hodnota, která čísla nezkracuje). Po úpravě CSL souboru nutné styl v Zoteru znovu nahrát (odebrat + přidat, viz sekce 1) a ve Wordu udělat Refresh — jinak se oprava nepropíše.

## Opakovaný autor v Seznamu literatury

Nepoužívat pomlčku („———") ani „Týž"/„Táž" jako náhradu za opakované jméno autora v Seznamu literatury — ověřeno 260802, každá položka se píše celá (`BERGER 2016`, ne `——— 2016`). „Týž"/„Táž" patří jen do poznámek pod čarou (náhrada za blízko opakovanou citaci), ne do bibliografie. CSL atribut `subsequent-author-substitute` proto z `resources/udku_citation_style.csl` odstraněn.

## Poznámky k CSL stylu

- Soubor: `resources/udku_citation_style.csl` (upraveno 260604 z originálu udku_citation_style7.csl)
- Ověřeno: kniha, článek v časopise, článek v novinách, kapitola ve sborníku, dizertace, webová stránka, rukopis
- Záhlaví bibliografie: VERZÁLKY příjmení + rok, odděleno m-dashem u více autorů (`BUKOLSKÁ – MACHÁLKOVÁ 1980`)
- Editor-only knihy: `Emanuel Poche, ed., Název, Praha rok.`
- Zarovnání záhlaví: Word justifikuje — opravit ručně `Ctrl+L` po každém refreshi
- **Citační styl (citace, bibliografie, „s.", tečky): řídit se malým ÚDKU PDF (`ktf_18_version1_1_citacni_zasady_udku.pdf`) — ne přílohou ve velkém `formalni_uprava_ktfa.pdf`.** Obrázky/vyobrazení: podle velkého KTF dokumentu (ten citace obecně neřeší). Tahle dvě pravidla si na několika místech odporují (viz níže) — malý PDF je specifičtější a autoritativní pro citace.
- 260702 — **oprava chyby**: krátce jsem se řídila přílohou ve velkém dokumentu a tvrdila, že se „s." u strany nepoužívá a že bibliografie je bez tečky na konci. Malý ÚDKU PDF ale výslovně říká opak: **„Strana, strany – s."** je povinná zkratka a **„tečka se píše pouze na konci citace"** (tzn. citace tečkou končí). CSL styl (makra `locators`, `pages`, `<bibliography><layout suffix=".">`) byl vrácen do původního stavu — **nic se neopravovalo, byl v pořádku**.
- Po jakékoli budoucí úpravě CSL souboru je nutné styl v Zoteru **znovu nahrát** (odebrat + přidat, viz sekce 1) — úprava souboru ve vaultu se do Zotera sama nepropíše.
