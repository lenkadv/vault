# MOC – Zettelkasten

Mapa systému. Tady začni, když nevíš kam sáhnout.

---

## Jak systém funguje

```
Zotero (zdroj + anotace)
    ↓
zettelkasten/literature/  →  LN – {citekey}.md
    ↓
zettelkasten/permanent/   →  YYMMDD-HHMM Název myšlenky.md
    ↓
akademický text / tadylenka
```

**Literature note** = jeden zdroj, poznámky blízko textu originálu, citáty  
**Permanent note** = jedno tvrzení vlastními slovy, propojené s dalšími PN

---

## Workflow — jak vzniká note

1. Přidat zdroj do Zotera (kniha, článek, webová stránka…)
2. Číst a anotovat přímo v Zoteru → **Add Note from Annotations**
3. Říct Claudovi: „ulož mi LN pro [název]" → Claude najde záznam v JSON a vytvoří `LN – {citekey}.md`
4. **Čtecí capture (260805):** `## Poznámky` sekce v LN je Lenčina volná čtecí zóna — píše tam za běhu čtení, se stránkou, bez rozhodování POZ/PN a bez překlikávání mezi soubory (přímý důsledek zkušenosti se Slepým kuřetem v Notion, kde tohle bylo extrémně náročné). Zpracování do POZ (a případně kandidátů na PN) dělá Claude dávkově, na vyžádání — ne živě při čtení.
5. Zkontrolovat nebo vytvořit autorský soubor `[[Jméno Autora]]` v `literature/` — přidat dílo do sekce **Díla v knihovně**
6. Claude na vyžádání zpracuje `## Poznámky` do POZ notes (`zdroj`, `strana`, `pouziti` prázdné/doplněné, `tvrzeni`) a nabídne kandidáty na PN, pokud narazí na syntetizující větu nepodloženou jednou citací — vlastní PN zakládá jen po Lenčině potvrzení
7. POZ prolinkovat s topics přes `temata`; PN prolinkovat navzájem a zpět na POZ (`## Vychází z`)

Podrobný technický návod: [[zotero-obsidian-workflow]]  
Citace pro seminárky (Zotero + Word): [[zotero-word-workflow]]

### Alternativní vznik — katalogová LN (inventura knihovny na Disku)

Pro zdroje, které už máš stažené (PDF/epub na Google Disku), ale ještě jsi je nezpracovávala pro konkrétní text — cíl je vědět, co máš a najít to podle klíčových slov, ne hluboká četba:

1. Claude otevře soubor na Disku, přečte titulní stranu/obsah/úvod (ne nutně celý text)
2. Vytvoří LN s YAML frontmatter properties **autor (příjmení první), zdroj, rok, soubor_disk, zotero: "", stav: katalogizováno, datum_katalogizace, tags**
3. Sekce Souhrn + Struktura kapitol se vyplní, sekce Poznámky zůstává prázdná
4. **Zotero se nezakládá** — až v okamžiku, kdy ze zdroje skutečně cituješ/pracuješ s ním pro konkrétní text (pozná se podle toho, že vznikají Poznámky/permanent notes)
5. Nové tagy vždy nejdřív zkontrolovat proti [[Rejstřík klíčových slov]], ať nevznikají duplicity (např. "gender" vs. "gender-in-religion")
6. Postup: krok za krokem, po vzorku pár souborů vždy zpětná vazba, ne najednou celá knihovna — viz [[feedback_zettelkasten_transfer_failure]]

Až se ke zdroji vrátíš pro psaní, LN se **dopracuje na plný formát** (doslovné citáty v Poznámkách, Zotero záznam, Datum čtení) — nevzniká druhý soubor.

---

## Složky

| Složka             | Co tam patří                                                    |
| ------------------ | ---------------------------------------------------------------- |
| `literature/`      | LN notes + `Zotero knihovna.json`                                |
| `literature/authors/` | autorské soubory — osoby, které napsaly citovaný pramen        |
| `literature/osoby/`   | **"Kdo je kdo" karty** — subjekty výzkumu (malíři, faráři, šlechta, komise…), sami nic necitovaného nenapsali. Čistě biografická/faktická karta (kdy narozen/zemřel, kariéra, rodina) + odkazy, kde všude se v pramenech objevili. Na rozdíl od `topics/` **nejsou** nosným tématem s vlastní výzkumnou debatou — jakmile se osoba stane tématem, kolem kterého se staví argument z více zdrojů (jako atribuční spor u Brandla/Reinera/Halbaxe), patří do `topics/` místo sem. |
| `permanent/`       | PN notes — atomické myšlenky vlastními slovy                     |
| `vystupy/`         | **OUT notes** — tvoje vlastní hotové texty (seminárky, bakalářka, články) — NE zdroje, které jsi četla, ale co jsi sama napsala. Viz [[Vystupy.base]] |
| `poznamky/` | **POZ notes** — atomické citace: jedno konkrétní tvrzení, jak se propsalo z LN zdroje do OUT práce. Paralela k Notion "Poznámky" tabulce ze Slepého kuřete. Viz [[Poznamky.base]]. |
| `topics/` | **Topic notes** — jeden soubor na téma/koncept (bez prefixu, název = téma, např. `Mary Magdalene.md`, `Brandl, Petr.md`). Osoby vždy příjmení první, kvůli abecednímu řazení (výjimka: postavy bez rodového příjmení). Vznikají jako skutečné stránky, ne tagy — LN/POZ na ně odkazují dvojím způsobem: `[[wikilink]]` v řádku `**Témata:**` v těle (Linked mentions/Backlinks panel na cílové stránce) a zároveň jako `temata:` YAML property (list wikilinků) — díky tomu jsou vidět i jako sloupec v [[Zdroje.base]], klikatelně, ne jen přes #tag search se snippety. Rostou v čase — začínají jako stub, doplňují se atomickými tvrzeními, jak přibývají zdroje. Osoby sem patří, jen když jsou samy nosným výzkumným tématem (viz `literature/osoby/` výše pro rozlišení). |

---

## Pravidla

- **LN** vzniká buď při práci se zdrojem (plný formát), nebo jako katalogová inventura (lehký formát, viz výše) — nikdy jako prázdný placeholder bez souhrnu
- **PN** = jedno tvrzení, ne shrnutí tématu; název je samo výpověď
- **Kdy vzniká POZ vs. PN (260805, plné odůvodnění a myšlenkový postup viz [[HANDOFF – POZ-PN capture workflow]])** — při čtení/zpracování zdroje se **nerozhoduje**, jestli poznámka bude přesná citace nebo vlastní myšlenka: vzniká vždy POZ (atomická, vázaná na `zdroj`+`strana`), stejně jako u reverse-engineeringu. PN vzniká odděleně, jedním ze dvou vstupních bodů:
  1. **Mechanicky, při reverse-engineeringu hotové práce** — vedle vytahování footnotovaných vět do POZ (krok 3 níž) se vytahují i **tvoje vlastní syntetizující věty** (ne podložené jednou footnotou, ale tvůj závěr spojující víc zdrojů/POZ dohromady) → PN se `## Vychází z` odkazující na příslušné POZ.
  2. **Vzácně, živě** — myšlenka, která tě napadne při čtení nebo procházení propojené sítě (topics, POZ), mimo psaní hotového textu. Zůstává výjimkou, ne rituálem u každé poznámky.
  Necitovatelný podnět bez LN (podcast, rozhovor, e-mailová výměna) — pokud se nezakládá lehká LN s typem `podcast`/`rozhovor` (viz `typ` níž), jde přímo do PN, sekce `## Podnět` s neformálním popisem místo `## Vychází z`.
- Tagy vždy anglicky, kontrolovat proti [[Rejstřík klíčových slov]] před přidáním nového
- PN se netřídí do podsložek — navigace přes tagy a interní odkazy
- Každý citovatelný zdroj (vč. Substack, online esejů) → LN; bez autora a data → resources/
- Zotero záznam vzniká až při skutečném citování, ne u katalogové LN
- **LN hlavička je YAML frontmatter** (ne bold-text řádky) — properties `autor, nazev, typ, zdroj, rok, kde_najit, zotero, stav, datum_cteni/datum_katalogizace, tags, temata, pouzito_v`. `nazev` = čistý název díla (bez citace/autora), `typ` = kniha/článek/kapitola/recenze/katalog výstavy/disertační práce/kvalifikační práce/archivní pramen/novinový článek/časopisecký článek/podcast/přednáška/rozhovor (kontrolovaný slovník podobný Notion Sources "type") — kvůli [[Zdroje.base|Base]]. U `podcast`/`přednáška`/`rozhovor` (needitovaný/needitovatelný audio/video zdroj) se místo strany cituje **časovou značkou** jako lokátorem — stejná logika jako `nepag.` u e-booku bez stránkování, viz [[resources/zotero-word-workflow]]. Formát: `Autor rok, HH:MM:SS`. Pole `autor` vždy příjmení první ("Příjmení, Jméno"), kvůli řazení. Výjimka: řeholní/kanonizovaná jména bez rodového příjmení (např. Teresa de Jesús, Juana Inés de la Cruz) se nepřevrací — už se řadí správně pod prvním prvkem podle běžné knihovnické konvence.
- **`kde_najit`** — jednotné pole pro dostupnost zdroje. Je-li k dispozici odkaz (Disk, web), do frontmatteru jde **holé URL** (ne s textovým prefixem) — YAML frontmatter nerenderuje markdown syntaxi, holé URL má šanci na automatickou klikatelnost v Base/properties. Bez odkazu (fyzický výtisk, půjčeno) jde do pole popisný text: `Fyzicky: <poznámka/kde stojí>`, `Půjčeno: <od koho/odkud>`. **Navíc** se stejný odkaz vždy zapíše i jako klikatelný markdown link do těla noty (řádek `**Kde najít:** [popisek](URL)`) — to funguje spolehlivě vždy, na rozdíl od frontmatteru. Nikdy nevymýšlet dostupnost — pokud stav neznámý, pole zůstává prázdné a doptat se.
- **Tag vs. topic note** — `#tag` je jen štítek pro [[Rejstřík klíčových slov]] a rychlé filtrování v Base (search se snippety). Topic note (`topics/`) je skutečná stránka s Linked mentions panelem — použít, když chceš téma reálně *procházet* jako dokument, ne jen filtrovat. Nejde o náhradu, ale doplněk — tag zůstává i po založení topic noty.
- **Pojmenování topic notes — anglický úzus** (260804): název topic noty je vždy anglicky (např. [[Gaze]], [[Lucretia]], [[Dating]]), stejně jako tagy. Výjimku tvoří **jména a místa** — ta zůstávají v původním jazyce/tvaru (např. [[Reiner, Václav Vavřinec]], [[Kostel sv. Vojtěcha (Jircháře)]], [[Rudolfine Prague]] — druhé slovo je místo, první anglický přívlastek k němu). Před založením nové topic noty vždy zkontrolovat, jestli podobná téma-nota už neexistuje pod jiným úhlem záběru (viz i sloučení "Gaze and Visual Theory" + "Male Gaze (koncept)" → [[Gaze]] 260804) — radši jedno širší téma než dvě úzce překrývající se.
- **`[[wikilink]]` se musí fyzicky napsat** — Obsidian nedetekuje témata automaticky, ale jakmile je odkaz jednou napsaný, Linked mentions panel na cílové stránce je pak plně automatický (žádná registrace na druhé straně). Při zakládání/úpravě LN nebo POZ vždy zkontrolovat, jestli některý tag odpovídá existující topic notě v `topics/` — pokud ano, přidat **oba** zápisy: `**Témata:** [[...]]` řádek v těle (čitelnost, backlinks) i `temata:` YAML list property (viditelnost/klikatelnost v Base) — rovnou, bez čekání na vyžádání.
- **`pouzito_v`** — property v LN (seznam odkazů na OUT notes), ukazuje ve kterých vlastních textech byl zdroj citovaný. Sloupec v [[Zdroje.base]]. Doplňuje se buď dopředu (když píšeš nový text a zdroj použiješ), nebo zpětně při reverse-engineeringu starší práce.
- **POZ frontmatter** — pole vždy `zdroj`, `strana` (hned za `zdroj` — spolu identifikují přesně odkud tvrzení pochází), `pouziti`, `tvrzeni`, `puvodni_citat`, `tags`, `temata`. Tělo noty stejné pořadí polí: **Zdroj:**, **Strana:**, **Použito v:**, **Témata:**. Viz [[Poznamky.base]].
- **`pouziti` (260805, nahrazuje starší `vystup`+`footnote`)** — list párů `vystup` (odkaz na OUT) + `footnote` (anglicky, nikdy "footnota"), protože jedna POZ může být časem citovaná ve víc pracích s různým číslem poznámky pod čarou:
  ```yaml
  pouziti:
    - vystup: "[[OUT – ...]]"
      footnote: 38
  ```
  **POZ smí vzniknout i s prázdným `pouziti: []`** — při čtení, dřív než víš, ve kterém textu ji použiješ (viz nový workflow níž). Doplňuje se pár za párem, jakmile ji skutečně zacituješ.
- **Každá POZ nota se zpětně zapíše i do `## Poznámky` sekce své zdrojové LN** — bullet `- [[POZ – ...]] — s. X, footnote Y`, nahrazuje placeholder text. Vzniká tak obousměrný odkaz (LN → POZ přes tuto sekci, POZ → LN přes `zdroj` property).
- **"Co víme" formát (260805)** — každý bullet v sekci `## Co víme` topic noty končí `([[POZ – ...]], [[LN – citekey|citekey]])` — POZ odkaz pro celý kontext, citekey pro rychlou orientaci na zdroj bez otvírání POZ. Číslo footnote se **nepíše** (odkazuje jen na Lenčinu vlastní práci, bez druhého odkazu na konkrétní místo v ní k ničemu). Citekey se bere z pole `zdroj` dané POZ noty.
- **Reverse-engineering hotové práce** (retroaktivní budování systému ze staršího, už odevzdaného textu — na rozdíl od dopředného workflow výše): 1) založit OUT notu pro práci, 2) z jejího seznamu literatury založit/dohledat LN pro každý citovaný zdroj (kontrolovat archiv `archive/zettelkasten-transfer-260728/` na recyklovatelné Zotero odkazy, pokud práce přesahuje se Slepým kuřetem), přidat `pouzito_v` odkaz na OUT, 3) až zdroje existují, z jednotlivých footnotů/citací v textu vznikají POZ notes (`zdroj`, `pouziti`, `strana`, `tvrzeni`, případně `puvodni_citat`, `tags`) — mechanicky párovat existující větu s existující poznámkou pod čarou, **nikdy neinterpretovat ani nedomýšlet** (viz [[feedback_zettelkasten_transfer_failure]]); 4) souběžně s krokem 3 vytahovat i vlastní syntetizující věty (ne přímo podložené jednou footnotou) do PN, `## Vychází z` odkazující na relevantní POZ. Postup vždy po vzorku se zpětnou vazbou, ne najednou celý text.

---

## Existující notes

### Literature notes
- [[LN – teresadejesusZivotVlastniZivotopis1991]] — Terezie z Ávily, Život (četba 260607)
- [[LN – moreUtopie1950]] — Thomas More, Utopie (četba 260630)
- [[LN – BlairMalesSecondarySex2026]] — Gabrielle Blair, Males Are the Secondary Sex (četba 260505)

**Katalog knihovny "knihy a články" (Google Disk) — ✅ DOKONČENO 260803, doladěno 260805 — celá knihovna 201/201, žádné odložené položky.** Celá knihovna (Lukrécie/znásilnění v ikonografii, feminismus a dějiny umění, Eva/Adam, Rudolfínská Praha, Pražský hrad, obecná metodologie a dějiny umění/historie) zpracována, postup viz sekce "Alternativní vznik" výše. **201 položek** (196 souborů + 5 podsložek — `Halbax - Racek` a `Horyna` dohledány 260805, žádný přesah, jde o zdroje [[LN – racekDiloMalireHalbaxe1950]] a [[LN – horynaPrazskaRetablovaTvorba1973]] už katalogizované z Vojtěch seminárky; `Baroko` zrušena Lenkou; `Binding_Architektonische Formenlehre` zkatalogizována jako [[LN – bindingArchitektonischeFormenlehre1999]]; `Hartig` zkatalogizován jako [[LN – hartigEssaiAvantagesFemmes1775]] → [[Querelle des femmes]]). Detail a historie zpracování: [[knihovna-disk-checklist]].
- [[LN – almondMaryMagdaleneCultural2023]] — Almond, [[Mary Magdalene]]: A Cultural History (katalogizováno 260728)
- [[LN – apostolosCappadonaMaryMagdaleneVisual2023]] — Apostolos-Cappadona, [[Mary Magdalene]]: A Visual History (katalogizováno 260728)
- [[LN – baileyBetweenRenaissanceBaroque2003]] — Bailey, Between Renaissance and Baroque: Jesuit Art in Rome, 1565–1610 (katalogizováno 260731)
- [[LN – barnetShortGuideWritingArt2005]] — Barnet, A Short Guide to Writing About Art (kapitoly o recenzi a katalogovém heslu) (katalogizováno 260731)
- [[LN – batailleErotismDeathSensuality1986]] — Bataille, Erotism: Death and Sensuality (katalogizováno 260731)
- [[LN – baxandallPaintingExperienceFifteenth1988]] — Baxandall, Painting and Experience in Fifteenth Century Italy (katalogizováno 260731)
- [[LN – baylyRemakingModernWorld2018]] — Bayly, Remaking the Modern World 1900–2015 (katalogizováno 260731)
- [[LN – bazantPerseusAlterEgo2016]] — Bažant, Perseus as Alter Ego of Ferdinand I (katalogizováno 260731)
- [[LN – bazantPrazskyBelvederSeverska2006]] — Bažant, Pražský Belvedér a severská renesance / The Prague Belvedere (katalogizováno 260731, sloučeny 2 jazykové verze)
- [[LN – bazantStatuesVenusAntiquity2022]] — Bažant, Statues of Venus: From Antiquity to the Present (katalogizováno 260731)
- [[LN – belozerskayaMediciGiraffeExotic2006]] — Belozerskaya, The Medici Giraffe (katalogizováno 260731)
- [[LN – beltingFlorenceBaghdadRenaissance2011]] — Belting, Florence and Baghdad (katalogizováno 260731)
- [[LN – beltingInvisibleMasterpiece2001]] — Belting, The Invisible Masterpiece (katalogizováno 260731)
- [[LN – beltingEndHistoryArt1987]] — Belting, The End of the History of Art? (katalogizováno 260731)
- [[LN – bateEnglishLiteratureVeryShort2010]] — Bate, English Literature: A Very Short Introduction (katalogizováno 260731, epub nešel přečíst, vytvořeno z webové rešerše)
- [[LN – baylyBirthModernWorld2004]] — Bayly, The Birth of the Modern World 1780–1914 (katalogizováno 260731, sken bez OCR, vytvořeno z webové rešerše)
- [[LN – berensonFlorentinePainters1909]] — Berenson, The Florentine Painters of the Renaissance (katalogizováno 260731)
- [[LN – berensonSeeingKnowing1953]] — Berenson, Seeing and Knowing (katalogizováno 260731)
- [[LN – bergerWaysOfSeeing1972]] — Berger, Ways of Seeing (katalogizováno 260731, sken bez OCR, vytvořeno z webové rešerše — klíčový text pro feminismus/gender)
- [[LN – growitzShearnChivalryWomansPen2012]] — Growitz Shearn, disertace o Beatriz Bernal a Cristalián de España (katalogizováno 260731)
- [[LN – blazicekKropacekSlovnikPojmu1991]] — Blažíček/Kropáček, Slovník pojmů z dějin umění (katalogizováno 260731, sken bez OCR, vytvořeno z webové rešerše)
- [[LN – bleyerveldHoeBedriechlijckVrouwen2000]] — Bleyerveld, Hoe bedriechlijck dat die vrouwen zijn (katalogizováno 260731, shortcut nešel přečíst, LN z webové rešerše)
- [[LN – bloomItalianRenaissance2002]] — Bloom (ed.), The Italian Renaissance (katalogizováno 260731)
- [[LN – bluntBorromini1979]] — Blunt, Borromini (katalogizováno 260731, sken bez OCR, vytvořeno z webové rešerše)
- [[LN – boardmanGreekArtArchaeology2016]] — Boardman, Greek Art (katalogizováno 260731, sken bez OCR, vytvořeno z webové rešerše)
- [[LN – bockGeschlechtergeschichtenNeuzeit2014]] — Bock, Geschlechtergeschichten der Neuzeit (katalogizováno 260731)
- [[LN – bockWomenEuropeanHistory2002]] — Bock, Women in European History (katalogizováno 260731, sloučeny 3 kopie/výřezy stejné knihy)
- Založena nová topic nota [[Querelle des femmes]] (260731) — propojuje 4 zdroje výše
- [[LN – bokodyImageryPoliticsSexualViolence2023]] — Bokody, The Imagery and Politics of Sexual Violence in Early Renaissance Italy (katalogizováno 260731) — klíčový zdroj, vlastní kapitola o Lukrécii
- [[LN – boorschBuildingVatican1983]] — Boorsch, The Building of the Vatican (katalogizováno 260731, sken bez OCR, LN z webové rešerše)
- [[LN – bronfenOverHerDeadBody1992]] — Bronfen, Over Her Dead Body (katalogizováno 260731)
- [[LN – broudeGarrardFeminismArtHistory1982]] — Broude/Garrard (eds.), Feminism and Art History: Questioning the Litany (katalogizováno 260731, epub+pdf nešly přečíst, LN z webové rešerše) — 1. díl trilogie
- [[LN – broudeGarrardReclaimingFemaleAgency2005]] — Broude/Garrard (eds.), Reclaiming Female Agency (katalogizováno 260731) — 3. díl trilogie
- [[LN – brownBodySociety1988]] — Brown, The Body and Society (katalogizováno 260731)
- [[LN – bugbeeChaucersLucretiaAugustine2019]] — Bugbee, Chaucer's Lucretia and What Augustine Really Said about Rape (katalogizováno 260731)
- [[LN – burkeRenacimientoEuropeo1998]] — Burke, El Renacimiento europeo (katalogizováno 260731)
- [[LN – carrollSaintsSinnersSisters2003]] — Carroll/Stewart (eds.), Saints, Sinners, and Sisters (katalogizováno 260731) — bohatá obrazová dokumentace Lukrécie
- Založena nová topic nota [[Lucretia]] (260731) — propojuje 3 zdroje výše, největší tematický shluk knihovny
- [[LN – coleyHistoricalPoeticLucretiaBritten2018]] — Coley, Historical-Poetic Transformations of the Legend of Lucretia and Britten's opera (katalogizováno 260731)
- [[LN – cothrenDallevaFundamentalsArtHistory2021]] — Cothren/D'Alleva, Fundamentals of Art History (katalogizováno 260731)
- [[LN – dallevaMethodsTheoriesArtHistory2005]] — D'Alleva, Methods and Theories of Art History (katalogizováno 260731, sken bez OCR, LN z webové rešerše)
- [[LN – cornejovaTovarysstvoJezisovo1995]] — Čornejová, Tovaryšstvo Ježíšovo (katalogizováno 260731)
- [[LN – reginoDeEcclesiasticisDisciplinis906]] — Regino z Prümu, De ecclesiasticis disciplinis (katalogizováno 260731)
- [[LN – demetriouVallsRussellHeywoodClassical2021]] — Demetriou/Valls-Russell (eds.), Thomas Heywood and the Classical Tradition (katalogizováno 260731)
- [[LN – deturkIllicitArousalTintoretto2001]] — DeTurk, Illicit Arousal: Tintoretto's Tarquin and Lucretia (katalogizováno 260731)
- [[LN – donaldsonRapesLucretia1982]] — Donaldson, The Rapes of Lucretia (katalogizováno 260731) — zakládající zdroj tématu

**Slepé kuře — sv. Vojtěch:** první přenos z Notionu do Obsidianu (260701) se ukázal jako paskvil (viz [[feedback_zettelkasten_transfer_failure]]), soubory přesunuty do `archive/zettelkasten-transfer-260728/`. **260728 — druhý pokus dokončen** reverse-engineeringem z hotové seminárky (ne z raw Zotero anotací): všech **34 zdrojů** bibliografie [[OUT – Vojtěch seminárka 2025]] katalogizováno jako LN (12 recyklováno z archivu — Zotero odkazy beze změny, jen nová hlavička; 22 nových). Procházet přes [[Zdroje.base]] (filtr `pouzito_v`) nebo přes [[Attribution]] topic notu (Linked mentions). U ~15 nových zdrojů `kde_najit` zatím chybí — fyzické knihy/staré tisky, nedohledáno.

### Autorské soubory (`literature/authors/`) — napsali citovaný pramen
- [[Thomas More]], [[Gabrielle Blair]], [[Teresa de Jesús]] — autoři z obecné četby

### Osoby (`literature/osoby/`) — "Kdo je kdo" karty, subjekty výzkumu, sami nic citovaného nenapsali
Zatím prázdné (260805 — účel ujasněn: biografická karta + kde se osoba objevila v pramenech, na rozdíl od `topics/`, kam patří osoby, které jsou samy nosným výzkumným tématem s debatou z více zdrojů — viz [[Brandl, Petr]], [[Reiner, Václav Vavřinec]], [[Halbax, Michael Václav]] jako topics). Kandidáti z Vojtěch materiálu: vedlejší postavy zmíněné v POZ jen okrajově (komise/znalci jako Maixner, Barvitius, farář P. Hudem). Původní soubory k sv. Vojtěchovi přesunuty 260728 do `archive/zettelkasten-transfer-260728/`, viz [[feedback_zettelkasten_transfer_failure]] — nerecyklovat automaticky, založit znovu podle nového formátu.

### Výstupy (`vystupy/`) — tvoje vlastní práce
- [[OUT – Vojtěch seminárka 2025]] — 34 zdrojů v bibliografii (všechny katalogizované), 83 footnotovaných tvrzení (další krok: POZ notes)
- [[OUT – Male Gaze seminárka 2026]] — 260804, **hotovo**. Bibliografie (50 zdrojů: 9 pramenů + 41 sekundární literatura): 22 nových LN založeno (8 primárních pramenů, 9 zcela nových sekundárních zdrojů, 5 odlišných vydání/jazykových verzí téhož díla — de Pisan/Pizan má 3 různé edice, Berger má anglický i český překlad, Kraus 2001 je jiné stránkování Broude–Garrard sborníku než existující 1982 LN), 23 existujících LN propojeno přes `pouzito_v`. Kapitoly ve sbornících (Fučíková/Schütz v Fusenig 2010, Krieger v Guth 2012) přiřazeny na úroveň celé publikace, ne vlastní LN — s komentářem v POZ. Mimochodem odhalen chybějící LN k Petzold, *Romanesque Art* (1995) — existovala jen LN k jinému textu stejného autora, doplněno jako [[LN – petzoldRomanesqueArt1995]]. Založena nová topic nota "Male Gaze (koncept)" (Sartre → Berger → Mulvey genealogie pojmu) — týž den sloučena s "Gaze and Visual Theory" do jednotného tématu [[Gaze]]. 81 footnotovaných tvrzení → **66 POZ notes** pokrývá 64 z 81 (17 vynecháno, bez citovatelného obsahu — viz [[OUT – Male Gaze seminárka 2026]]), zpětné odkazy `## Poznámky` doplněny ve všech dotčených LN.

### Poznámky/citace (`poznamky/`) — 260728: **hotovo, všech 78 citovatelných footnotů zpracováno** (78 POZ notes ze 83 footnotů seminárky [[OUT – Vojtěch seminárka 2025]]). 5 footnotů vynecháno záměrně — bez citace/zdroje, jen osobní poznámka nebo Lenčina vlastní nedoložená úvaha: **37** (poděkování P. Hudemovi), **41** (kdo inicioval přestavbu — bez citace), **44** (litoměřická verze obrazu — bez citace), **71** (biografie faráře Nyklese — bez citace), **81** (autorství obrazu sv. Rodiny — bez citace). [[Poznamky.base]] hotová, zpětné odkazy `## Poznámky` doplněny ve všech dotčených LN.

**260804 — [[OUT – Male Gaze seminárka 2026]] hotovo**: 66 POZ notes pokrývá 64 z 81 footnotů, 17 vynecháno (obecné zmínky bez konkrétní stránky/tvrzení nebo vlastní nedoložené úvahy autorky — čísla 2, 6, 9, 14, 17, 23, 24, 27, 30, 32, 33, 36, 39, 40, 46, 52, 65). Dvě footnoty (11, 19) mají po dvou POZ, protože citují dva zdroje najednou. Zpětné odkazy `## Poznámky` doplněny ve všech dotčených LN.

⚠️ **Nalezená nesrovnalost v seminárce:** footnote 27 jmenuje autora disertace (bibliograficky "Racek") jako "Macek" — viz [[POZ – Racek odmítnutí Halbaxe skupina žen]]. Stálo by za to opravit v původním .docx.

### Topics (`topics/`) — pilot, funguje
- [[Mary Magdalene]] — zdroje: Almond, Apostolos-Cappadona
- [[Querelle des femmes]] — 260731, zdroje: Bock (2×), Bleyerveld, Growitz Shearn — z katalogizace knihovny "knihy a články"
- [[Lucretia]] — 260731, zdroje: Bokody, Bugbee, Carroll/Stewart — z katalogizace knihovny "knihy a články", největší shluk
- [[Power of Women (topos)]] — 260803, zdroje: 3× Dienstbier (Weibermacht v pozdně středověké profánní malbě) — příbuzné, ale samostatné téma vůči [[Querelle des femmes]]
- [[Eve and Adam]] — 260803, zdroje: Munk, Flasch, Graves-Patai, Guth (přes kap. Krieger), von Erffa (klíčová referenční příručka) — mýtus o stvoření/pádu napříč teologií a ikonografií
- [[Feminism and Art History]] — 260803, zdroje: Broude/Garrard (2×), Berger, Horne/Perry, Chadwick, Kelly, McCormack, Mulvey, Nochlin (2×) — feministická metoda/historiografie oboru, odlišná od Querelle des femmes i Power of Women
- [[Gaze]] — 260804, teorie pohledu ve výtvarném umění a filmu — sloučeno z původních dvou topics, "Male Gaze (koncept)" (Sartre → Berger → Mulvey genealogie pojmu, založeno při zpracování [[OUT – Male Gaze seminárka 2026]]) a "Gaze and Visual Theory" (Bryson, Holly, Simons, Nead, Pollock, založeno 260803 při katalogizaci knihovny) — na žádost Lenky sloučeno do jednoho tématu, ať se nefragmentuje
- [[Rudolfine Prague]] — 260803, zdroje: Fusenig (Hans von Aachen), Metzler (Spranger), Prag um 1600, Uličný/Erotica — dvorský manýrismus Rudolfa II., odlišná chronologicky od starší renesance Ferdinanda I./II. (Belveder)
- [[Aachen, Hans von]] — 260804, zdroje: Fusenig, Metzler, Uličný — užší topic nota vyňatá z [[Rudolfine Prague]], konkrétně malíř a jeho dvě Lukréciiny obrazy, založeno při zpracování [[OUT – Male Gaze seminárka 2026]]
- [[Venus]] — 260804, zdroj: Bažant — antický ikonografický typ (Venus pudica/Anadyomene) recyklovaný pro Evu i Lukrécii, propojuje [[Eve and Adam]] a [[Lucretia]]
- [[Pražský hrad (Renaissance architecture)]] — 260803, zdroje: Bažant, Kroupa, Uličný (3×) — stavební historie Belvederu a paláce u Bílé věže napříč Ferdinandem I., Ferdinandem II. a raným Rudolfem
- [[Attribution]] — 17 zdrojů (celá historiografie atribuce sv. Vojtěcha na Zelené hoře, viz Linked mentions)
- [[Reiner, Václav Vavřinec]] — 9 zdrojů
- [[Brandl, Petr]] — 10 zdrojů
- [[Halbax, Michael Václav]] — 3 zdroje
- [[Dating]] — 260728, otázka 1718 vs. 1693, vzniklo při zakládání POZ notes
- [[Kostel sv. Vojtěcha (Jircháře)]] — 260728, obecné informace o stavbě nezávisle na atribuci/dataci obrazu

⚠️ Poučení 260728: při hromadném katalogizování snadno unikne, že se tag opakuje napříč zdroji dost na to, aby si zasloužil topic notu — příště při zakládání dávky zdrojů rovnou zkontrolovat četnost tagů, ne až po upozornění. Topic notes o skutečných osobách vždy pojmenovat příjmení první ("Příjmení, Jméno") — stejná konvence jako `autor` pole u LN, kvůli abecednímu řazení. Výjimka: postavy bez rodového příjmení (Mary Magdalene, Teresa de Jesús) se nepřevrací.

**260804 — sekce "Co víme" zaplněna ve všech topics, které mají POZ notes** (mechanicky vytaženo pole `tvrzeni` z každé POZ, seřazeno chronologicky podle `footnote`, s odkazem zpět na POZ notu). Attribution (39), Querelle des femmes (20), Lucretia (20), Brandl/Reiner (18 každý), Eve and Adam (17), Dating (15), Kostel sv. Vojtěcha (14), Rudolfine Prague (10), Gaze (7), Aachen (7), Halbax (4), Feminism and Art History (3), Power of Women (2), Venus (1). Mary Magdalene a Pražský hrad (Renaissance architecture) zůstávají prázdné — žádný OUT text zatím necituje jejich zdroje footnoty, takže neexistují POZ, ze kterých by šlo čerpat.

### Eseje a reflexe
- [[260607-1213 Esej — Anatomie internalizované viny]]

### Permanent notes
- [[260607-1157 Internalizovaný útlak — jak číst náboženské autobiografie]]
- [[260607-1217 Sekulární badatel nemůže číst církevní dějiny s chladným odstupem]]

## Poznámka k formátu — archivní/pátrací výzkum (Slepé kuře)

Zdroje sv. Vojtěcha nejsou zpracovány jako klasické LN se shrnutím a vlastní parafrází — jde o **evidenční/pátrací výzkum** (viz [[feedback_zettelkasten_archival_evidence]]), kde primárně platí doslovná citace + přesná stránka, ne vlastní interpretace. Vlastní tvrzení (permanent notes) vznikají až když víc datapointů začne dávat dohromady smysl — ne u každého zdroje zvlášť.
