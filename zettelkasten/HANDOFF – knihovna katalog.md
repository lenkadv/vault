# HANDOFF – katalogizace osobní knihovny (Google Disk)

**✅ PROJEKT DOKONČEN 260803 — celá knihovna (#1–201) je zkatalogizovaná.** Tenhle soubor teď slouží jako archivní záznam postupu a poučení pro podobné budoucí projekty (např. zpracování neotevřených podsložek `Baroko`, `Binding_Architektonische Formenlehre`, `Hartig`, nebo revize `Halbax - Racek`/`Horyna` proti Vojtěchově bakalářce). Přečti si ho celý, pak [[MOC – Zettelkasten]] (živá specifikace celého systému) a [[feedback_zettelkasten_transfer_failure]] (proč se muselo postupovat opatrně a po vzorku).

## Průběžná kontrola přírůstků (od 260803)

Lenka dál ukládá nové zdroje do stejné Disk složky bez jakéhokoli extra kroku při ukládání. Kontrola nových přírůstků běží dvěma způsoby, oba stejným mechanismem:

1. **Automaticky při weekly review** (krok Zettelkasten, viz `CLAUDE.md`)
2. **Kdykoli na pokyn "zpracuj knihovnu"** — nezávisle na cyklu weekly review, když Lenka přidá víc položek najednou a chce je zpracovat hned

**Mechanismus:** [[knihovna-disk-checklist]] má pole `posledni_kontrola` (RFC 3339 timestamp, ne jen datum — viz poučení níže). Spustit **jeden** cílený Drive dotaz `parentId = '1dy9tyD5wg0WFNZzXtxeoOorNlLo9XLk1' and createdTime > '<posledni_kontrola>'` — ne plný výpis složky (nespolehlivé stránkování, viz "Technická poznámka" níže). Nové výsledky přidat jako nové řádky na konec tabulky v checklistu, zpracovat stejným postupem jako původních 201 (dávky po 5, kontrola Zotero JSON, síťování na topic notes, aktualizace checklistu). Po zpracování aktualizovat `posledni_kontrola` na aktuální timestamp.

**Poučení z prvního běhu (260803, #202–218):**
- **`posledni_kontrola` musí být přesný timestamp, ne jen datum** — pokud se knihovna zpracovává týž den, kdy skončil předchozí check (jako tady), datumové rozlišení (YYMMDD) by nerozlišilo "už zkontrolováno dnes ráno" od "přidáno dnes večer". Používat RFC 3339 (`2026-08-03T20:35:00Z`).
- **Ověřovat duplicitu obsahem/velikostí souboru, ne jen jménem** — Baxandall a Chadwick "World of Art" byly nové uploady s odlišným Drive ID, ale stejný titul/velikost jako už katalogizované zdroje. Před založením nové LN vždy zkontrolovat, jestli autor+název už v `literature/LN/` neexistuje.
- **`search_files` s obsahovými náhledy (`contentSnippet`) často stačí k založení katalogové LN bez zvláštního `read_file_content` volání** — u 7 z 17 souborů v této dávce byl náhled z prvního `search_files` dotazu dost bohatý (titulní strana + obsah), u zbylých stačilo `get_file_metadata` (ne plný `read_file_content`) pro stejný typ náhledu.
- **Nové topic notes se zakládají i při průběžné kontrole, ne jen při hlavním zpracování** — založena "Gaze and Visual Theory" (Bryson ×2, Holly, Simons), protože 3+ zdroje sdílely jasné jádro odlišné od [[Feminism and Art History]] (i když se hodně překrývají). 260804 sloučena s "Male Gaze (koncept)" do jednotného tématu [[Gaze]].

## Kontext — co a proč

Lenka má na Google Disku složku **"knihy a články"** (folder ID `1dy9tyD5wg0WFNZzXtxeoOorNlLo9XLk1`) s desítkami staženými PDF/epub zdrojů, které nemá nijak zkatalogizované — tituly samy o sobě jí nic neřeknou, ztrácí přehled, co vlastně má. Cíl: pro každý zdroj vytvořit lehkou "katalogovou" LN notu (bibliografie + kde ho najít + krátké AI shrnutí obsahu podle titulní strany/obsahu/úvodu — NE hluboká četba), aby šlo v [[Zdroje.base]] procházet a hledat podle klíčových slov ještě předtím, než se Lenka rozhodne, který zdroj skutečně použije pro psaní.

Tohle je **širší** scope než běžný zettelkasten (`feedback_zettelkasten_scope` — normálně jen citované/použité zdroje) — tady jde vědomě o kompletní inventuru knihovny, i zdrojů, které možná nikdy nepoužije. To je záměr, ne omyl.

Systém, do kterého se to zapojuje, je popsaný v [[MOC – Zettelkasten]] — LN notes (`zettelkasten/literature/LN/`), topic notes (`zettelkasten/topics/`), [[Rejstřík klíčových slov]], [[Zdroje.base]]. Tahle knihovna používá **jen vrstvu LN + topics** — vystupy/POZ vrstva se jí netýká (nejde o žádnou konkrétní hotovou práci, jen inventuru zdrojů).

## Formát katalogové LN

Viz MOC, sekce "Alternativní vznik — katalogová LN". Shrnutí:

- Umístění: **`zettelkasten/literature/LN/`** (stejná složka jako všechno ostatní, ne samostatná)
- Frontmatter: `autor` (příjmení první — "Příjmení, Jméno"), `nazev`, `typ` (kniha/článek/kapitola/disertační práce/kvalifikační práce/recenze/časopisecký článek/katalog výstavy/**přednáška** — poslední přidána 260803, viz níže), `zdroj` (plná citace), `rok`, `kde_najit` (**holé URL** Google Drive odkazu, bez textového prefixu), `zotero: ""` (**nezakládat** — až při skutečném citování, pokud ale zdroj **už** v Zoteru existuje z dřívějška, použij existující odkaz, viz sekce "Kontrola existujících Zotero záznamů" níže), `stav: katalogizováno`, `datum_katalogizace`, `tags`, `temata` (pokud tag odpovídá existující topic notě)
- Tělo: `**Autor:**`, `**Kde najít:** [Google Disk](URL)` (klikatelný markdown link, frontmatter samo o sobě klikatelnost nezaručuje), `**Zotero:**` řádek jen pokud existuje záznam, `**Témata:**` pokud relevantní, `## Souhrn` (2-4 věty na základě titulní strany/obsahu/úvodu), `## Struktura kapitol` (obsah knihy), prázdné `## Poznámky`, `## Otázky a reakce`, `## Permanent notes, které z toho vzniknou` s `- [ ] #zettel`
- **Nové tagy vždy nejdřív zkontrolovat proti [[Rejstřík klíčových slov]]**. Síťování podle témat (topic notes) je u tohohle úkolu **primární cíl, ne reaktivní dodatek** — viz sekce "Síťování podle témat" níže.
- **Nový `typ` do kontrolovaného slovníku:** `přednáška` (přidáno 260803, u Dienstbierova abstraktu veřejné přednášky — pozvánka/abstrakt, ne publikovaný text). Pokud narazíš na další zdroj, který nesedí do žádné existující hodnoty, přidej novou hodnotu i sem do handoffu a do MOC, ne mlčky.

### Kontrola existujících Zotero záznamů — dělat u KAŽDÉHO zdroje

Než založíš `zotero: ""`, zkontroluj `zettelkasten/literature/Zotero knihovna.json` (Grep na příjmení autora) — několik zdrojů v knihovně **už mělo Zotero záznam z dřívějška** (Dienstbier/disertace, Munk, Erlande-Brandenburg/Kimpel, Fonte, Fusenig — ten poslední dokonce s podrobně rozpracovaným polem `extra` o citování katalogových hesel). V takovém případě zápis `zotero: "zotero://select/library/items/{itemKey}"` a řádek `**Zotero:** [otevřít v Zoteru](...)` do těla — **nezůstává** `zotero: ""` jen proto, že jde o katalogovou LN.

## Co už je hotové

**✅ Zpracováno #1–201 z 201 — celá knihovna.** Viz [[knihovna-disk-checklist]] pro přesný řádek u každého souboru (duplicity, odložené položky, poznámky).

Založené topic notes (finální stav):
- [[Mary Magdalene]] — Almond, Apostolos-Cappadona, Ingenhoff-Danhäuser
- [[Lucretia]] — největší shluk (Donaldson, Bokody, Bugbee, Carroll/Stewart, DeTurk, Coley, Demetriou/Valls-Russell, Endres, Even, Fernández Villanueva/Romero-Delgado, Glendinning, Hults, Jed, Laceste, Matthes, Menchaca-Bagnulo, Miziołek, Paul, Small, Tanev, Webb)
- [[Querelle des femmes]] — Bock (2×), Bleyerveld, Growitz Shearn, Fonte, Jordan, Marinella, Pizan, Reid
- [[Power of Women (topos)]] — Dienstbier (3×), Ozment, **Smith (zakládající monografie)**, Trexler, Wade
- [[Eve and Adam]] — Munk, Flasch, Graves-Patai, Guth, von Erffa, Bitton, Meyers, Milton, Owens, Pagels, Silver-Smith
- [[Feminism and Art History]] — Broude/Garrard (2×), Berger, Horne/Perry, Chadwick, Kelly, McCormack, Mulvey, Nochlin (2×), Pollock, Sutherland Harris
- [[Rudolfine Prague]] — Fusenig, Metzler, Prag um 1600, Uličný/Erotica, Zimmer
- [[Pražský hrad (Renaissance architecture)]] — Bažant, Kroupa, Uličný (3×) — sesterská topic nota k Rudolfínské Praze, ale o starší architektuře (Ferdinand I./II.), ne o Rudolfově dvorském manýrismu

## Poučení pro podobné budoucí projekty

- **Vždy zkontrolovat existující Zotero záznam před založením katalogové LN** — desítky zdrojů v této knihovně měly už dřív založený Zotero záznam (z jiných projektů/citací), a šlo by je jinak omylem duplikovat.
- **Topic notes zakládat proaktivně při 2–3 kvalitních zdrojích**, ne čekat na "dost" zdrojů — jinak hrozí, že se propojení zapomene udělat zpětně.
- **Ověřovat obsah, ne jen název souboru** — minimálně dvakrát se ukázalo, že název souboru/checklistu zavádí (Silver-Smith zařazený k Lucretii byl ve skutečnosti o Adamovi a Evě; Malečková "Czechs and Turks" bylo ve skutečnosti jiné dílo).
- **Skeny bez OCR** (typicky přes 50–100 MB) se nedají přečíst přímo — `WebSearch` na bibliografické údaje + obecný souhrn je jediná cesta, vždy s poznámkou "Poznámka k vzniku noty" v LN.

## Obsah složky — tematický přehled (z první průzkumné sondy, stále platí)

Hlavní shluky (všechny dokončené): ikonografie Lukrécie/znásilnění, feminismus a dějiny umění obecně, Eva/Adam a querelle des femmes, Power of Women topos, metodologické texty (Turabian, D'Alleva, Barnet, Fernie, Eagleton, Segert, Tucker), pražský dvorský manýrismus (Rudolf II.) i starší renesanční architektura Pražského hradu (Ferdinand I./II.). Podsložka "Feminism and Art History" zmíněná v původním handoffu **nikdy neexistovala** pod tím názvem — bylo to mylné očekávání, ne nedokončený úkol.

## Síťování podle témat — primární cíl, ne dodatek

Celý smysl STA metody (viz [[MOC – Zettelkasten]]) je propojená síť konceptů, ne plochý katalog souborů. **Neplatí tichý předpoklad "založím topic notu, až se tag objeví u víc zdrojů"** — u téhle knihovny topic notes zakládat rovnou průběžně, jakmile má shluk aspoň 2–3 zdroje s jasným společným jádrem (viz [[Power of Women (topos)]], založena hned při 3. zdroji stejné dávky).

U každého nově katalogizovaného zdroje se ptát: "patří tohle k některému už existujícímu tématu, nebo zakládá nové?" — ne jen mechanicky přiřazovat tagy a řešit sítě až jako úklid na konci.

## Technická poznámka — Google Drive API

**Vyhledávání jednotlivých souborů podle jména je spolehlivé a rychlé:** `search_files` s `query: "parentId = '...' and title contains 'Příjmení'"` — takhle se zpracovávaly dávky #64–84, funguje dobře i paralelně (víc `search_files` volání najednou pro celou dávku).

**Hromadné vylistování celé složky přes `parentId` bez filtru je nespolehlivé** — stránkování (`pageToken`) vracelo opakovaně stejných 100 souborů místo další stránky. Nepoužívat pro hromadný výpis; pokud potřebuješ ověřit úplnost/pořadí, spolehni se radši na [[knihovna-disk-checklist]] (má už i abecedně seřazený seznam všech 201 položek z první sondy) a jednotlivě dohledávej podle jména.

`read_file_content` na velké skenované PDF (typicky přes 100–300 MB) vrátí prázdný `fileContent` (jen "Untitled" nebo prázdné číslované stránky). Postup u takových: 1) zkusit, jestli existuje "compressed" duplikát ve stejné složce; 2) pokud ne, `WebSearch` na bibliografické údaje + obecný souhrn (Goodreads, nakladatel, Wikipedia) → LN vždy s poznámkou "Poznámka k vzniku noty" vysvětlující, že vznikla z rešerše, ne z přímého čtení.

## Postup (pro budoucí podobné projekty — tenhle konkrétní je hotový)

1. [[knihovna-disk-checklist]] je zdroj pravdy o pořadí a stavu
2. Před založením LN vždy zkontrolovat Zotero JSON na existující záznam (viz sekce výše)
3. Zpracovávat v dávkách po 5–10
4. Po každé dávce: zkontrolovat duplicity (víc formátů/verzí stejného díla), zkontrolovat nové tagy proti [[Rejstřík klíčových slov]], aktivně provazovat na topic notes, aktualizovat checklist (✅/⏭️ + poznámka) a tenhle handoff, pokud se objeví nové poučení
5. [[Zdroje.base]] už tuhle složku pokrývá automaticky (filtr je na celou `literature/LN/`) — nic dalšího zakládat netřeba

## Nezpracované zbytky (mimo scope tohohle handoffu)

- Podsložky `Baroko`, `Binding_Architektonische Formenlehre`, `Hartig` — nikdy neotevřené, obsah neznámý
- `Halbax - Racek`, `Horyna` — odloženy kvůli překryvu s [[OUT – Vojtěch seminárka 2025]], zpracovat jen po ověření proti bibliografii (34 zdrojů)
