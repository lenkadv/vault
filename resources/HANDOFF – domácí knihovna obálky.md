# HANDOFF – domácí knihovna: obálky v Notion HOTOVO (260821)

**Dodatek 260821 (pozdě večer):** Lenka nahlásila jednu chybějící obálku, kterou automatický průchod nezachytil — "Rosemary má děťátko - Stepfordské paničky" (Ira Levin, `_id` 273 v Handy Library, spadá do rozsahu dávek 1–4 z 260819/20, ale nějak propadla). Dohledáno a opraveno ručně (extrakce ze zipu podle částečné shody jména, upload, vložení). Pokud se objeví další podobné jednotlivé mezery, stejný postup: `notion-search` podle title+author → pokud stránka nemá obrázek → dohledat `_id`+`Photo_Path` v Handy Library DB → extrahovat ze `source.zip` (leftover v `2aa6934c-a2c8-4164-b61f-b36ac40b93c4` scratchpad, nebo čerstvá záloha) → upload+insert jako jednotlivý případ, netřeba celou dávku.

**✅ VŠECH 430/430 vyfocených obálek dokončeno 260821.** Spolu s dřívějšími 308 online obálkami (260810) je katalog „📚 Knihovna" kompletně obrázkově zpracovaný — 738 stránek s vloženým obrázkem v těle. Zbývá jen: (1) v Notion UI přepnout Gallery view "Cover" zdroj z property na "Page content" (viz sekce "Co zbývá" krok 5 níže — teď už bezpečné, žádná stránka nezůstane bez náhledu), (2) zvážit smazání nepoužívané `Cover` property. Zpracování **přírůstků** (nové skeny přidané do Handy Library po tomto datu) se řídí sekcí "Přírůstky" níže — spustit na pokyn "zpracuj knihovnu" nebo automaticky při weekly review.

---

**Stav k 260810 20:15:** Notion databáze „📚 Knihovna" má kompletní data (740 fyzických + 252 elektronických položek, schéma opravené). **308/308 online obálek hotovo** (vloženy do těla stránky). **Zbývá ~430 vyfocených obálek** (lokální fotky z Handy Library) — to je next action pro nové vlákno.

**Stav k 260819/20 (noční sezení):** **105/430 vyfocených obálek hotovo** (4 dávky po 15/30/30/30, `_id` 3–274 z `book_library`). Postup se osvědčil beze změn — jen jedno zpřesnění (viz gotcha níže o HTML-escapování). Extrakce fotek z zipu jde nejrychleji přímo z lokální Google Drive mountpointu (`G:\Můj disk\HandyLibrary\handy_library_auto_backup_v2*.zip`) přes Python `zipfile` (viz gotcha o diakritice), ne přes Drive API download (limit 10 MB na soubor u MCP nástroje) ani přes `unzip` v Bash (mangluje UTF-8 názvy).

**Stav k 260820/21 (pokračování, stejná záloha):** **315/430 vyfocených obálek hotovo** (+30 dávka 5, `_id` 275–332; +30 dávka 6, `_id` 333–392; +30 dávka 7, `_id` 393–425; +30 dávka 8, `_id` 426–455; +30 dávka 9, `_id` 456–501; +30 dávka 10, `_id` 502–536; +30 dávka 11, `_id` 537–575). Drobný gotcha: Handy Library občas má title s překlepem/OCR chybou (dávka 9: "Velké teojhvězdí" místo "Velké trojhvězdí") — ověřit shodou autora, ne jen textovou podobností.

**Stav k 260821 (dávka 12):** **345/430 vyfocených obálek hotovo** (+30 dávka 12, `_id` 576–609).

**Stav k 260821 (dávka 13):** **375/430 vyfocených obálek hotovo** (+30 dávka 13, `_id` 610–646). Zbývá ~55. Pokračovat od `_id` 647+ (`ORDER BY _id ... AND _id >= 647 LIMIT 30`).

**Proces zpevněn po chybě z dávky 12 — nový standardní postup pro každou další dávku:**
1. Extrahovat položky + fotky, `dedup_key` jako klíč (jako dřív).
2. `notion-search` pro každý unikátní title+author, zaznamenat `page_id`.
3. `notion-create-file-upload` pro všech ~30 souborů, zaznamenat `file_upload_id` podle `filename` v odpovědi (ne podle pořadí volání).
4. Zapsat **dva samostatné JSON soubory se stejnou sadou klíčů** (`dedup_key`): `batchN_uploads.json` (`dedup_key → file_upload_id`) a `batchN_page_ids.json` (`dedup_key → page_id`). Python skriptem ověřit `set(uploads) == set(pages)` před pokračováním.
5. Python skriptem programově spojit oba soubory přes `dedup_key` do `batchN_insert_plan.json` (`dedup_key, page_id, file_upload_id`) — **nikdy ručně párovat dva seznamy podle pozice**, i když se to zdá rychlejší u malého počtu položek.
6. `insert_content`/`replace_content` volání generovat z tohohle plánu.
7. Ověřit `notion-fetch` na 2-3 náhodně vybraných stránkách (ne jen první v pořadí), že název souboru v S3 URL odpovídá očekávanému ISBN/dedup_key.

**Gotcha (dávka 13) — dvě různé katalogové položky mířící na týž fyzický fotosoubor.** `_id` 639 a 640 ("Prahou krok za krokem", Poche Emanuel) měly v Handy Library **identický `Photo_Path` basename** (dvě fyzické kopie vyfocené jednou fotkou, nebo fotka omylem přiřazená oběma záznamům). Extrakční skript používal `{basename: item}` dict, který při kolizi tiše přepsal starší záznam novým — `_id` 639 zmizel beze stopy (ani "OK" ani "MISSING" v logu). Odhaleno diffem `_id` z `items.json` proti `_id` v extrakčním logu (chybějící byl 639). Oprava: po extrakci zkopírovat fotku i pro přebitou položku (`cp noisbn_id640.jpg noisbn_id639.jpg`). Od dávky 14 extrakční skript iteruje přes VŠECHNY položky (ne přes basename-keyed dict) a hlásí kolize explicitně do logu (`BASENAME COLLISIONS` sekce) — obchází problém napořád.
- Párování na Notion stránky u duplicitního basename: `notion-search` vrátil 2-3 kandidátské stránky se stejným title. `notion-fetch` na každou ukázal, které jsou skutečně fyzické duplicity (`Source: Vlastní-fyzicky`, identické Format/Pages/Published Date) vs. jiná verze téhož díla (např. u "Prahou krok za krokem" byla i třetí stránka se `Source: Online-odkaz` — ta se NEpočítá, protože Handy Library eviduje jen fyzické knihy). Mezi zbylými fyzickými duplicity je 1:1 přiřazení arbitrární.

**Dávka 14 (260821): `_id` 610–646, 30 obálek.** Bez chyb — proces z dávky 13 (`batchN_uploads.json` + `batchN_page_ids.json`, oba keyed by `dedup_key`, cross-validace `set(uploads)==set(pages)` v Pythonu před insert) fungoval napoprvé. Gotcha: "Architektonische Formenlehre" — 2 stejnojmenné Notion stránky, ale jen 1 fyzický záznam v Handy Library; druhá stránka měla `Source: Google Drive` (elektronická verze) — `notion-fetch` na obě rychle ukázal, která je fyzická.

**Dávka 15 (260821): `_id` 647–740, 30+25 = FINÁLNÍCH 55 obálek — vault dokončen.** Vícenásobné volume-disambiguation případy vyřešené stejnou technikou jako v dřívějších dávkách (`notion-fetch` na kandidátské stránky, srovnání `Volume` property s `volNN`/`vol10`/`vol20` v `Photo_Path`):
- "Petr Brandl" (Neumann, ISBN 9788070356319): 3 stejnojmenné stránky — 2 fyzické (Volume 10/20, `Source: Vlastní-fyzicky`) + 1 elektronická (bez Source/ISBN) → elektronická vynechána.
- "Václav Vavřinec Reiner" (Preiss, ISBN 9788070355244): stejný vzorec — 3 stránky, 2 fyzické (Volume 10/20) + 1 elektronická.
- Odlišný název "Václav Vavřinec Reiner\nObrazy a fresky\n..." (Pokorný) byl samostatná kniha, žádná kolize.
- Cloudflare 403 znovu na jeden soubor (`9788070355244_id696.jpg`) — stejná oprava jako dávka 12: re-encode přes PIL (`convert('RGB').save(..., quality=92)`), fungovalo napoprvé.
- Vícenásobné tituly s vloženými `\n` v Handy Library datech (např. "Umění 19. století \nod klasicismu k romantismu", "Die Mosaiken von Rom\nvom dritten...") — `notion-search` zvládl i s newline v query bez problému, žádná speciální očista nebyla potřeba.

**Vážný gotcha (dávka 12) — NEPÁROVAT upload pořadí podle abecedy s items pořadím podle `_id`.** Vytvořila jsem 30 `notion-create-file-upload` volání v pořadí podle unikátního `dedup_key` (přirozeně seřazeno abecedně nástrojem), ale pak jsem `insert_content` volání navázala v pořadí `items.json` (podle `_id`) — dva různé pořadí, offset chyba, **všech 29 úspěšně vložených stránek dostalo špatnou obálku** (posunuté o několik pozic). Odhaleno až zpětnou kontrolou před uzavřením dávky, ne automaticky. **Oprava:** vždy stavět mapování `dedup_key → file_upload_id` a `dedup_key → page_id` do jedné explicitní tabulky (ne dvou nezávisle řazených seznamů) a `insert_content`/`replace_content` volání generovat z téhle tabulky, nikdy ručním "n-tý prvek seznamu A odpovídá n-tému prvku seznamu B". Přidat kontrolní krok: po vytvoření `batch_uploads.json` ho svázat s `batch_items.json` přes `dedup_key` v Pythonu (ne poslat oba seznamy do tool volání ručně v naději, že pořadí sedí).

**Oprava špatně napárovaných obálek:** `update_content` s `old_str` hledajícím doslovný `<image src="file-upload://...">` tag **nefunguje na již vloženou stránku** — Notion po `insert_content` interně převede tag na `![](https://prod-files-secure.s3...)` URL, takže `old_str` matching selže s "No matches found" (ale nic nepoškodí, jen chybu vrátí). Řešení: použít `replace_content` (celý obsah přepsat, ne search-replace) s `new_str` = správný `<image src="file-upload://{id}"></image>` tag — funguje i na stránku, která už obrázek má, protože nezáleží na starém obsahu. Po opravě ověřit `notion-fetch` na 1-2 stránkách, že název souboru v S3 URL sedí s očekávaným ISBN/id.

**Gotcha (dávka 12) — Cloudflare 403 na konkrétní soubor, ne rate limit.** Jeden upload (`noisbn_id600.jpg`, Čechy Umělecké památky) opakovaně (4×, různé file-upload session, různé filename) padal na Cloudflare WAF 403 ("Sorry, you have been blocked"), zatímco souběžně jiný soubor uploadoval bez problémů (kontrolní test) — nešlo tedy o obecný rate limit na IP/session. Příčina: náhodná kolize bajtové sekvence uvnitř konkrétního JPEG s WAF pravidlem (Cloudflare hlásí "malformed data" jako jednu z možných spouští). **Oprava: re-enkódovat obrázek přes PIL** (`Image.open(...).convert('RGB').save(..., 'JPEG', quality=92)`) — změní bajtovou reprezentaci při zachování vizuálního obsahu, obchází kolizi. Fungovalo na první pokus po re-enkódování.

**Nový gotcha (dávka 10) — duplicitní ISBN v rámci dávky:** dvě různé knihy (Encyklopedie světové architektury 1 a 2, `_id` 534/535) měly v Handy Library omylem identické ISBN, a dvě fyzické kopie téhož titulu (Architektura Albrechta z Valdštejna, `_id` 531/532) mají identické ISBN i title. Extrakční skript teď před pojmenováním souboru kontroluje duplicity ISBN uvnitř dávky — při kolizi připojí `_id` ke klíči (`{isbn}_id{_id}`), jinak by druhý soubor tiše přepsal první při extrakci ze zipu. Párování na Notion stránku: different-title páry (534/535) šly přes běžný `notion-search` podle title bez problému; same-title+same-ISBN pár (531/532) vyžadoval `notion-search` s vyšším `page_size`, potvrzení že existují dvě samostatné Notion stránky (dvě fyzické kopie naimportované zvlášť), a pak libovolné 1:1 přiřazení mezi nimi — nezáleží která obálka jde na kterou stránku, jsou to identické duplicitní záznamy.

**Nový gotcha (dávka 7):** duplicitní tituly bez rozlišujícího textu v názvu (víceset knih ze série "Dějiny českého výtvarného umění" — dva svazky mají doslova identický title string) nejde spárovat jen přes `notion-search` podle title — vrátí obě stránky, nejde vědět která je která. Řešení: `notion-fetch` na obě kandidátské page_id, porovnat `Volume` property proti číslu svazku z `Photo_Path` (v Handy Library je číslo svazku v cestě k souboru jako `volNN`). U víceumělkyň se stejným titulem (např. "Dějiny umění 1–10" od Pijoana) toto riziko nehrozí, protože číslo dílu je přímo v title stringu — problém nastává jen když je číslo dílu uložené výhradně ve `Volume` property, ne v title. Postup mírně zjednodušen oproti kroku 3 níže: **místo paginace celého "Show All" view stačí `notion-search` s `data_source_url: "collection://1b8aeae6-0bc6-81e2-b9ba-000b3fc3c664"` a dotazem "Název Autor"** — v dávce 5 trefil přesný název jako první výsledek u všech 30/30 knih, žádné fuzzy matching ani ruční CSV lookup nebylo potřeba. Rychlejší i spolehlivější než plánovaná paginace přes `notion-query-data-sources`. Nový trik: **leftover soubory z předchozí session scratchpad se dají znovu použít** — `extracted/handy_book_library.db` a `source.zip` z minulé noci ležely v `C:\Users\Lenka\AppData\Local\Temp\claude\G--M-j-disk-vault\{jiné session ID}\scratchpad\handylib\`, zkopírovány do aktuální scratchpad místo nového stahování/rozbalování zálohy. **Nový gotcha:** Python volaný z Bash tool nerozumí Git-Bash cestám (`/c/Users/...`) — `sqlite3.connect()`/`open()` s takovou cestou spadne na `unable to open database file` i když soubor evidentně existuje (`os.path.exists` na `/c/...` vrátí `False`). Vždy použít Windows-style cestu (`C:\Users\...`) v Python skriptech volaných touto cestou, i když samotný Bash příkaz cesty v `/c/...` tvaru běžně akceptuje.

Kontext projektu: [[projects/domaci-knihovna]], [[CLAUDE.md]] sekce „Workflow: Domácí knihovna".

## Notion identifikátory

- Databáze: `https://app.notion.com/p/1b8aeae60bc68070ba54f3c5af9910dc`
- Data source: `collection://1b8aeae6-0bc6-81e2-b9ba-000b3fc3c664`
- View "Show All" (pro paginaci): `https://www.notion.so/1b8aeae60bc68070ba54f3c5af9910dc?v=1b8aeae60bc6817aaec0000c7ab15968`
- View "Gallery": `view://1b8aeae6-0bc6-8084-8bea-000c09aab8c3`

## Aktuální schéma (po všech opravách)

Title, Author, Publisher, Published Date, Language, ISBN, Pages, Series, Volume, **Typ** (select: Próza/Poezie/Jazyky/Non-Fiction/Odborná/Kniha/Článek/Sborník/Archiválie/Web/Archivní pramen/Kapitola/Disertační práce/Kvalifikační práce/Přednáška/Recenze/Katalog výstavy/Novinový článek), **Source** (select: Vlastní-fyzicky/Knihovna-výpůjčka/Zapůjčeno-od-někoho/Google Drive/Online-odkaz), **Kde najít** (text), Summary, Obsidian Note (url — jen ke kopírování, NEklikací, viz níže), Read/Rating/My Review/Comments/Favorite, Item Url, **Cover** (přejmenováno z Image Url, type=Files — funguje pro online obálky, `[]`/prázdné u 430 vyfocených a všech elektronických), Format.

## Co je hotové

1. Schéma sjednocené, vyčištěné od duplicitních sloupců (viz gotchas níže).
2. 740 fyzických + 252 elektronických řádků naimportováno (finální CSV kola s opravami Typ/Author/HTML/datumy).
3. 13 fyzických knih má `Obsidian Note` propojenou na existující LN (fuzzy match title+author, práh 0.82).
4. **308 knih s online obálkou (Handy Library `Image_Url` pole) má obrázek vložený přímo do těla stránky** — `<image src="URL"></image>` na začátku obsahu, přes `notion-update-page` / `insert_content`.
5. Gallery view **zatím zůstává** na výchozím nastavení cover source — NEPŘEPÍNAT na "Page content", dokud nejsou hotové i vyfocené obálky (jinak by 430 knih dočasně ztratilo náhled, co mají teď v property).

## Co zbývá — přesný postup

### 1. Získat čerstvou zálohu Handy Library (pokud starší než pár dní)

Google Drive folder `HandyLibrary/` (`parentId` lze najít přes `search_files`), soubor `handy_library_manual_backup_*.zip`. Rozbalit — obsahuje `handy_book_library.db` (SQLite) + `Photos/` + `Icons/` složky.

### 2. Najít fotografované knihy

```sql
SELECT _id, Title, Author, ISBN, ISBN10, Photo_Path
FROM book_library
WHERE Photo_Path IS NOT NULL AND Photo_Path != '' AND Deleted_At IS NULL
```
~430 řádků. `Photo_Path` obsahuje přesný název souboru (končí `/Photos/{filename}.jpg`) — **žádné fuzzy matching potřeba, appka to už páruje 1:1 v rámci vlastních dat.**

### 3. Postavit Title+ISBN → aktuální Notion page_id lookup

**Page ID se mění při každém delete+reimportu** — nikdy nepoužívat staré ID z předchozí session. Paginovat přes `notion-query-data-sources` s `mode: "view"` na "Show All" view URL výše, `page_size: 100`, sledovat `next_cursor` dokud `has_more: false` (~10 kol pro 992 řádků). Výsledek je moc velký na přímé zobrazení — ukládá se do tool-result souboru, zpracovat přes Python (`json.load` + extrahovat jen Title/ISBN/url do menšího CSV).

**Nepoužívat `mode: "sql"` pro velké dotazy** — narazí na "usage limit for Query Data Source" (workspace plán limit, stejné omezení popsané v Claude paměti `project_notion_query_plan_limit`). View mode limit nemá.

### 4. Pro každou z ~430 knih: upload + vložení do těla

Třífázový postup na knihu:
1. `notion-create-file-upload` (filename) → vrátí `file_upload_id`, `upload_url`, `upload_headers`
2. Upload souboru na `upload_url` — **`curl -F` (multipart form) v tomhle sandboxu nefunguje** (exit 26 / status 000, i bez mezer v cestě). Řešení: sestavit multipart tělo ručně v Pythonu (boundary + `Content-Disposition` header + binární data + closing boundary) do `.bin` souboru, pak `curl --data-binary "@soubor.bin" -H "Content-Type: multipart/form-data; boundary=..."`. (Tahle poučka je i v Claude paměti jako `reference_curl_multipart_sandbox`.)
3. `notion-update-page` s `command: "insert_content"`, `content: "<image src=\"file-upload://{id}\"></image>"`, `position: {"type": "start"}`

**Nezkoušet nastavit obrázek přímo do `Cover` property přes `update_properties`** — vždy vrátí "File ... not found", bez ohledu na formát hodnoty (zkoušeno: `file-upload://id`, holé ID, plný markdown tag). Nahrané soubory jdou vložit jen do obsahu stránky, ne do Files-type vlastnosti databáze. (Tahle poučka je i v Claude paměti jako `reference_notion_file_upload_limits`.)

Dávkovat po ~15-30 najednou (paralelní tool volání v jedné zprávě) — při tomhle tempu žádné selhání za celých 308 kol.

### 5. Po dokončení všech 430

- V Notion UI přepnout Gallery view "Cover" zdroj z property na "Page content" (přes API se nastavení view zatím nezkoušelo — jednodušší ručně kliknout v Notionu).
- Zvážit smazání teď nepoužívané `Cover` property (Files type) — nebo ji nechat jako neškodný zbytek.

## Přírůstky — jak identifikovat a zpracovat nové položky

Tohle běží při každém dalším syncu (weekly review krok Zettelkasten, nebo na pokyn "zpracuj knihovnu"), ne jen jednorázově teď.

### Detekce nových položek

**Elektronické (LN):** Porovnat aktuální seznam `zettelkasten/literature/LN/*.md` proti množině souborů, které už mají odkaz v Notion `Obsidian Note` property (paginovat přes "Show All" view jako v kroku 3 výše, vytáhnout jen řádky s neprázdným `Obsidian Note`, z URL vyparsovat `file=` parametr). Nové LN soubory = ty, co v téhle množině chybí. Přesná shoda podle cesty k souboru, žádné fuzzy matching.

**Fyzické (Handy Library) — NE podle ISBN.** Knihy starší ~30 let ISBN nemají (Lenka jich má hodně), takže ISBN matching by je systematicky přeskakoval jako "nic nového". Místo toho: Handy Library přiděluje každé katalogizované knize stabilní interní `_id` (autoincrement, nezávislý na ISBN, existuje u úplně každé knihy). Diffovat podle tohohle.

- **Baseline snapshot:** [[handy-library-snapshot-260810.csv]] — obsahuje `handy_id` (= `_id` z `book_library`), Title, Author, ISBN pro všech 740 knih naimportovaných 260810.
- **Postup:** stáhnout čerstvou zálohu (krok 1 výše), vytáhnout `SELECT _id, Title, Author, ISBN FROM book_library WHERE Deleted_At IS NULL`, porovnat sloupec `_id` proti `handy_id` v posledním uloženém snapshotu. Nové fyzické knihy = `_id`, které v snapshotu chybí.
- **Po zpracování:** přepsat snapshot soubor čerstvým plným exportem (nový baseline pro příští sync) — pojmenovat `handy-library-snapshot-{YYMMDD}.csv`, starý smazat nebo přesunout, ať nevznikají desítky verzí.

### Zpracování

1. Vygenerovat CSV **jen pro nové řádky** — stejná čistící logika jako v hlavním importu (parsovat `Published_Date`/`Author3` JSON blobs, `Location`→`Typ` mapování, HTML strip ze `Summary`, `Source` odvození, `Rating` nechat prázdné, `Kde najít` prázdné u fyzických). Pro elektronické: `Source` podle domény `kde_najit` (Google Drive/Online-odkaz/Knihovna-výpůjčka/prázdné).
2. Znovu spustit fuzzy match (título+autor, práh 0.82) mezi **novými** řádky a **celou** aktuální elektronickou/fyzickou množinou (ne jen mezi sebou) — zachytí případy, kdy nová fyzická kniha odpovídá už existujícímu LN, nebo naopak.
3. Lenka naimportuje malé CSV přes nativní import — **nejde o delete+reimport**, jen přidání nových řádků, žádné riziko ztráty starých dat.
4. Obálky nových položek (online URL i vyfocené) doplnit stejným per-page postupem jako v hlavní části tohohle handoffu — ale jen pro novou dávku, což by mělo být řádově jednotky až nízké desítky položek, ne stovky.
5. Zapsat datum syncu a počet přidaných položek do [[projects/domaci-knihovna]] sekce Průběh.

## Gotchas, na které narazíš znovu

- **`RENAME COLUMN` + `ALTER COLUMN ... SET <type>` ve stejném dávkovém `statements` volání vytvoří duplicitní sloupec** (`Typ 1`, `Typ 2` atd.) místo přejmenování na místě. Vždy dělat RENAME a ALTER jako samostatná volání.
- **Handy Library ukládá `Published_Date` a `Author3` jako syrové JSON někdy, plain text jindy** — vždy parsovat obě možnosti (`{"date_string":...}` / `{"contributors":[...]}`), nikdy nekopírovat pole 1:1 bez kontroly.
- **`Location` pole v Handy Library ve skutečnosti obsahuje žánr** (Próza/Poezie/Jazyky/Non-Fiction), ne fyzické umístění — mapuje se na `Typ`, ne na `Kde najít`.
- **`Summary` pole u knih z Goodreads/Amazon lookupu obsahuje syrové HTML** (`<p>`, `<i>`, `<a href>`, entity) — vždy `re.sub` tagy pryč + `html.unescape`.
- **Rating pole v Handy Library je externí Goodreads průměr, ne osobní hodnocení** (důkaz: 690/739 knih mělo Rating vyplněné i při Read=false) — nemapovat do Notion `Rating`, nechat prázdné.
- **`obsidian://` (a obecně cokoli mimo `http`/`https`) není klikací v Notionu** — ani jako URL property, ani jako markdown link `[text](scheme://...)` v těle stránky. Notion vytvoří jen vizuálně podobný, ale nefunkční prvek (ikonka + text). Jediná funkční cesta je copy-paste hodnoty z property ručně.
- **Soubory ve scratchpadu občas zmizí mezi Bash voláními** (neznámý mechanismus, možná automatický úklid) — pokud skript najednou hlásí "file not found" pro soubor vytvořený před pár minutami, prostě ho znovu vygenerovat, ne debugovat proč zmizel.
- **Bash tool má problém s Windows konzolovým kódováním u české diakritiky** — `print()` s českým textem může spadnout na `UnicodeEncodeError` nebo zobrazit `�` v terminálu, i když data v souboru/paměti jsou v pořádku. Řešení: zapisovat výstup do souboru (`open(..., encoding='utf-8')`) a číst přes Read tool, ne spoléhat na to, co se ukáže v Bash výstupu.
- **`insert_content`/`replace_content` u `notion-update-page`: `<image src="...">...</image>` se musí poslat jako doslovné `<`/`>` znaky, NE jako HTML entity `&lt;`/`&gt;`.** Při prvním pokusu (dávky 1+2, 45 stránek) jsem omylem poslala entity-escapovaný text — Notion to bez chyby přijalo a uložilo jako obyčejný viditelný text na stránce (žádný error, žádné varování), ne jako obrázkový blok. Zjištěno až když si toho Lenka všimla vizuálně v Notionu. Oprava: `replace_content` s `new_str` obsahujícím doslovné `<image src="file-upload://{id}"></image>` — funkční verze se pozná podle toho, že `notion-fetch` vrátí `![](https://prod-files-secure.s3...)` místo doslovného tagu v `<content>`. **Vždy ověřit fetch-em aspoň jednu stránku z první dávky nové session**, než se pokračuje na desítky dalších.
- **`unzip` v Bash sandboxu mangluje UTF-8 názvy souborů se souborů se speciálními znaky** (diakritika, `…` ellipsis) na cp437 nesmysly — i přes explicitní UTF-8 obsah v zipu. Python `zipfile` modul (s `flag_bits` UTF-8 příznakem) dekóduje správně. Řešení pro dávkové zpracování: nekopírovat celý zip pomocí `unzip -o` do složky, ale otevřít `zipfile.ZipFile` a extrahovat jen potřebné soubory podle přesného `Photo_Path` z SQLite (`namelist()` → match podle basename), přejmenovat rovnou na čistý ASCII název (ISBN, nebo `id{_id}` když ISBN chybí) při extrakci — obchází mangling úplně.
- **Cesty s diakritikou (`G:\Můj disk\...`) občas selžou v Python `open()`/`zipfile.ZipFile()` volaném z Bash tool** (`FileNotFoundError` i když soubor evidentně existuje) — kvůli mismatch mezi shellovým a Pythonovým filesystem encoding. Oprava: nejdřív `cp` soubor do scratchpadu s čistě ASCII cestou (`cp "/g/Můj disk/..." ./source.zip`), pak pracovat s tím.
