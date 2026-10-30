# Shadowloop — admin postupy

## Přidat uživatele a přiřadit balíček

Otevři tuto URL v prohlížeči (doplň email a název produktu):

```
https://europe-central2-shadowloop-firebase.cloudfunctions.net/sale?email=EMAIL&produkt=PRODUKT
```

**Příklad:**
```
https://europe-central2-shadowloop-firebase.cloudfunctions.net/sale?email=jkokes@centrum.cz&produkt=HELE
```

**Dostupné produkty** (podle `products/` kolekce ve Firestore):
- `HELE`
- `HELE EW`
- `HELE downsell`
- `10x ENGLISHonly`
- `Irregular`
- `Miroslav Urban`
- `Shadowloop 10xE texty`

**Co se stane:**
- Pokud uživatel ještě nemá účet → zapíše se do `preregistered/{email}` s příslušnými decky. Až se přihlásí na shadowloop.lcenglish.cz, balíček se mu automaticky přiřadí.
- Pokud účet již má → decky se přidají přímo do jeho `users/{uid}` dokumentu.

**Firebase konzole:** https://console.firebase.google.com/u/0/project/shadowloop-firebase/firestore
**Repo:** https://github.com/kokolem/shadowloop (privátní, logika v `functions/index.js`)

## Nahrát nový balíček do aplikace (ověřeno 261025)

Sepsáno podle Firebase a vyzkoušeno na zkušebním balíčku `TEST-generator-paul-261025` (12 vět z generátoru, viz níže): v aplikaci se ukázal, hraje, má obrázek, větu i překlad a všech 12 položek. Vše se dělá ve Firebase konzoli (Lenka je vlastnice projektu), nic se neprogramuje.

**1. Připravit složku balíčku na počítači**
- `deck.csv`: jeden řádek = jedna položka, sloupce **anglicky, česky, nahrávka, obrázek** (např. `Paul wakes up….,Pavel se ráno probouzí….,audio_1.mp3,img.jpg`). Bez záhlaví. Řádek končí zalomením (aplikace poslední prázdný řádek zahazuje; starší balíčky mají místo toho na konci řádek `.,,,`).
- Nahrávky MP3 a obrázky JPG se stejnými názvy, jaké jsou v `deck.csv`. Jeden obrázek může sloužit pro všechny řádky (balíček s příběhem).
- `props.json`: `{"shuffle": false}` pro rozhovor nebo příběh (pevné pořadí), `{"shuffle": true}` pro slovíčka a samostatné věty (náhodné pořadí).
- Z generátoru: `dataset.csv` z archivu má první tři sloupce hotové; doplnit čtvrtý sloupec s obrázkem, uložit jako `deck.csv`, přidat obrázek a `props.json`. Překlad před nahráním zkontrolovat.

**2. Založit záznam balíčku ve Firestore**
- [Firestore → decks](https://console.firebase.google.com/u/0/project/shadowloop-firebase/firestore/databases/-default-/data/~2Fdecks) → Add document.
- Document ID: Auto-ID, nebo vlastní čitelné (funguje obojí). ID si zapsat.
- Pole: `category` (string, nadpis skupiny na kartě, např. „10xEnglish“), `name` (string, název balíčku), `uid` (string, **stejné jako ID dokumentu**), `premium` (**boolean**: `true` = jen pro ty, kdo ho mají v účtu; `false` = uvidí ho každý, i nepřihlášený).
- ⚠️ U nového pole `premium` je typ výchozí string a hodnota boolean výchozí `false`; přepnout na boolean a `true`, jinak je balíček veřejný.

**3. Nahrát soubory do Storage**
- [Storage → decks](https://console.firebase.google.com/u/0/project/shadowloop-firebase/storage/shadowloop-firebase.appspot.com/files/~2Fdecks) → ikonka nové složky → název = **ID balíčku** → otevřít složku → Upload file → vybrat všechny soubory (`deck.csv`, `props.json`, nahrávky, obrázky).
- Prázdná složka se v seznamu neukáže, dokud do ní něco nenahraješ; adresa složky je `…/files/~2Fdecks~2F<ID>`.

**4. Zpřístupnit balíček**
- Kupujícím produktu: Firestore → `products` → dokument produktu (např. `10x ENGLISHonly`) → do pole `decks` (seznam ID) přidat ID (ověřeno v kódu `sale`). Každý nový kupující ho pak dostane **automaticky**: při nákupu fapipi zavolá `sale`, ta přečte aktuální seznam `decks` produktu a zkopíruje ho kupujícímu do `premiumDecks` (ověřeno v kódu 261025). Platí i pro další nákupy téhož člověka (koupí 10x English, za 3 měsíce HELE → balíčky HELE se mu přidají samy, Lenka 261025). ⚠️ Jediná výjimka: **nový balíček přidaný do produktu, který se už prodává.** Kdo ten produkt koupil dřív (např. v květnu 10x English s 30 balíčky, v listopadu přibude 31.), nový balíček sám nedostane: skript běží jen při nákupu a aplikace čte jen seznam `premiumDecks` u člověka, produkt znovu nečte (kód `sale` a `DecksList.jsx`, na skutečném zákazníkovi neověřeno). Příklad z praxe: balíčky na míru pro Miroslava Urbana (2026) mají vlastní produkt `products/Miroslav Urban` (5 balíčků); jeho účet `urbanmiro@seznam.cz` má právě těch 5 ve stejném pořadí, stejně tak Lenčiny účty lnk.dvorakova@gmail.com a 07pmtalk@gmail.com (stav 261025; zda se mu přidávaly ručně nebo přes produkt, ze záznamů nepoznat). Chce-li Lenka balíček dát i jim: přidat ručně (další bod), nebo pro ně znovu otevřít adresu `sale` s jejich e-mailem a produktem (přidá jen chybějící, nic nezdvojí).
- Jednomu člověku: Firestore → `users` → filtr (ikonka trychtýře) → pole `email`, podmínka „equal to“, e-mail → u pole `premiumDecks` tlačítko + → string s ID balíčku → Add. Kdo ještě nemá účet: `preregistered/<e-mail>` → `premiumDecks`.
- Tabulku [Shadowloop Firebase user friendly názvy balíčků](https://docs.google.com/spreadsheets/d/1qopm0vZDWD8BJ79pxAMq7v6dUGOwy70G2adf83fGlic/edit) doplnit o nový balíček (název ↔ ID), ať je dohledatelný.

**5. Ověřit:** přihlásit se na shadowloop.lcenglish.cz účtem, který balíček má (zkušební účet `lnk.dvorakova+shadowtest-261024@gmail.com`, „Jana“, je v Chromu přihlášený), balíček spustit, zkontrolovat obrázek, text, překlad, zvuk a počet položek.

**Zkušební balíček 261025:** po ověření celý smazán (Lenka 261025 19:00; záznam, soubory ve Storage, položky v účtech; ověřeno).

## Japonské balíčky ze staré verze (vráceno 261027)

Ve staré verzi aplikace z roku 2021 (před Firebase, kopie na hostingu lcenglish.cz ve složce `shadowloop.lcenglish.cz`, záloha `G:\Můj disk\Zálohy webů\shadowloop-stara-kopie 261027\shadowloop-stara-kopie-261027.zip`) bylo 195 balíčků. Při porovnání 261027 chyběly ve Firebase jen japonské, ostatní skupiny (10xEnglish, HELE, Nepravidelná slovesa, TOP25 = 3x25) tam jsou celé.

- **Nahráno 261027 (Lenka „ano, nahraj“):** 33 balíčků, všechny `premium: true`. Skupina **Japonština** „27 Lesson“ až „41 Vocab“ (15) a skupina **JapanesePod** „JPod S4-15“ až „JPod S4-32“ (18). Japonština 25 a 26 ve Firebase už byla.
- **Kdo je vidí:** jen účet `lnk.dvorakova@gmail.com`. Do jeho `premiumDecks` přidáno všech 35 japonských (i 25 a 26, které v něm předtím nebyly), účet má teď 140 balíčků. Žádnému produktu balíčky nepatří.
- **Pořadí (`props.json`):** JapanesePod `{"shuffle": false}` (rozhovor v pevném pořadí, poslední položka je celá lekce `S4LNN.mp3`), převzato ze staré verze. Japonština `{"shuffle": true}`: jsou to samostatné věty, stará verze `props.json` neměla a bez něj míchala; stejně je nastavený i balíček 25 ve Firebase.
- **Jak:** skriptem přes Firebase CLI přihlášení (Storage + Firestore REST), soubor `<složka>.csv` přejmenován na `deck.csv`, v 35 Vocab opraven název nahrávky `11 .mp3` → `11.mp3`. Ověřeno v aplikaci na zkušebním účtu (dočasně přidané JPod S4-16 a 35 Vocab, pak zase odebrané): obrázek, japonská věta, anglický překlad, zvuk, počet položek (11 a 25) sedí.
- **ID a názvy:** list „Japonština“ v tabulce [Shadowloop Firebase user friendly názvy balíčků](https://docs.google.com/spreadsheets/d/1qopm0vZDWD8BJ79pxAMq7v6dUGOwy70G2adf83fGlic/edit).
- Překlad v japonských balíčcích je anglický (sloupec „česky“ obsahuje angličtinu), tak to bylo i ve staré verzi.

## Generátor balíčků (funkce `generator`, zmapováno 261025)

Lenka 261025: generátor je nástroj na výrobu balíčků do Shadowloopu, potřebujeme ho. Kód není v repozitáři `kokolem/shadowloop`, žije jen ve Firebase.

- **Kde:** `https://us-central1-shadowloop-firebase.cloudfunctions.net/generator` (Cloud Functions 2. generace, us-central1, Node.js 22, 1 GB, limit 5 minut). Nasazený 22. 3. 2026 přes Firebase CLI (4 verze týž den). Kód: Google Cloud → Cloud Run → generator → Source (`index.js`, `package.json`), tlačítko „Download archive“ stáhne zdroj.
- **Jak se volá:** jen metodou POST s JSON: `csvBase64` (tabulka CSV v base64, v prvním sloupci věta), `sourceLang` (jazyk vět, např. `en-US`), `targetLang` (jazyk překladu, např. `cs`), `voiceConfig` (hlas Chirp3-HD, např. `Aoede`), `password` (heslo je přímo v kódu; nikam ho neopisovat). Bez hesla vrátí 401, bez údajů 400. Funkce je veřejná, chrání ji jen heslo.
- **Co udělá:** pro každý řádek přeloží větu (Google Translate) a namluví ji hlasem `<jazyk>-Chirp3-HD-<hlas>` (Google Text-to-Speech, MP3). Vrátí `translated_dataset.zip`: `dataset.csv` (původní sloupce + překlad + název nahrávky `audio_N.mp3`) a nahrávky.
- **Proč to sedí na Shadowloop:** balíček v aplikaci = dokument `decks/<id>` ve Firestore (`uid`, `name`, `category`, `premium`) a ve Storage složka `decks/<id>/` s `deck.csv` (sloupce: anglicky, česky, nahrávka, obrázek), nahrávkami a volitelně `props.json` (`shuffle`). Výstup generátoru má stejné pořadí sloupců, takže odhad: `dataset.csv` se přejmenuje na `deck.csv` a nahraje se s nahrávkami. Aplikace sama zapisovat nesmí (pravidla Firestore i Storage `allow write: if false`), balíček se tedy zakládá ručně ve Firebase konzoli. Placený balíček (`premium: true`) se pak přidá do produktu v `products/<produkt>`, aby ho dostali kupující.
- **Odkud se volá (Lenka 261025):** stránka `G:\Můj disk\03 LCEnglish 🎬\Products\Shadowloop\AutoShadowloop.html` (otevřít dvojklikem v prohlížeči; „Shadowloop Generator“, březen 2026). Dřív ležela v „3  LCEnglish 🎬“, složka se při reorganizaci Disku přejmenovala, starý odkaz `file:///…/3%20%20LCEnglish…` proto nefunguje. Postup ve stránce: nahrát CSV s větami (jedna věta na řádek, první sloupec) → Source Language (výchozí English US) → Target Language (čeština) → TTS Voice (výchozí Aoede, ženské a mužské hlasy Chirp3-HD) → Process → stáhne se `translated_dataset_<číslo>.zip`. Stránka volá funkci na adrese `https://generator-rdxy636twa-uc.a.run.app` (totéž co `…cloudfunctions.net/generator`).
- ⚠️ **Heslo funkce je zapsané přímo v souboru stránky** (pole pro heslo stránka nemá). Kdo má soubor, může generátor používat na Lenčin účet Google Cloud. Soubor nesdílet ani nedávat do veřejné složky.
- **Ukázka (22. 3. 2026):** vstup `Shadowloop Dev/AutoShadowloop test.csv` (12 vět o Paulovi), výstup `Shadowloop Dev/translated_dataset_1774219061945/` = `dataset.csv` (věta, český překlad, `audio_N.mp3`) + 12 nahrávek. Formát odpovídá `deck.csv` v aplikaci, chybí jen 4. sloupec obrázek.
- **Záměr (Google Doc [Shadowloop: AI phase](https://docs.google.com/document/d/17vQDcRG1Bi2MUEyzkpIrm7hfJI_BRyhTa79HZilDaLo/edit), 16. 3. 2026):** zrychlit výrobu „curated“ balíčků: k připravené sadě vět AI udělá překlad, nahrávku (a obrázek), autor zkontroluje, pak se doplní `props.json` a nahraje do aplikace (ideálně asistovaně). Typ 1 = náhodné pořadí, každá položka vlastní obrázek (slovíčka, HELE); typ 2 = pevné pořadí, jeden obrázek, rozhovor nebo příběh (10x ENGLISH). Nápady na později: archivace karet, SRS jako Anki, drillová cvičení, vzorové věty podle úrovně CEFR, uživatelské balíčky. Generátor zatím dělá jen překlad a nahrávku, obrázky a nahrání do aplikace ne.
- **Nahrání do aplikace je ruční (Lenka 261025: „myslím, že ručně, postup máme někde zdokumentovaný“).** Hledáno 261025 bez úspěchu: vault, Disk (Google Docs, `manuál`, `Shadowloop Dev`, „SHADOWLOOP návod“ = jen návod pro studenty), Gmail s Vítkem, README repozitáře. Co se našlo:
  - Hotové složky balíčků z května 2026 na Disku (balíčky pro Miroslava Urbana, produkt `Miroslav Urban`): v každé `deck.csv` (anglicky, česky, `audio_N.mp3` nebo `N.mp3`, obrázek `imgN.jpg`) a `props.json` (`{"shuffle": true}` pro náhodné pořadí, `false` pro příběh). Tak tedy vypadá balíček připravený k nahrání.
  - Tabulka [Shadowloop Firebase user friendly názvy balíčků](https://docs.google.com/spreadsheets/d/1qopm0vZDWD8BJ79pxAMq7v6dUGOwy70G2adf83fGlic/edit) (s hvězdičkou): ID balíčků (`uid`) a jejich názvy po produktech (HELE, 10xE, Nepravidelná slovesa, 3x25, Shadowloop 10xE texty), list „product decks“ = co obsahuje který produkt, list „Lidi“ = kdo má které balíčky (stav 2022). Pole balíčku ve Firestore podle tabulky: `category`, `name`, `premium`, `uid`.
  - Lenka 261025 tipovala README repozitáře Shadowloopu a dokument o postupu Drip, FreshLearn, Shadowloop. Prověřeno: README `kokolem/shadowloop` je jen výchozí text Create React App; `README.txt` ve fapipi a Google Doc [Akce do FAPI/Freshlearn/Drip tutorial](https://docs.google.com/document/d/1KsSe-VcQVhaUPdMQn9pAS4WIFiXzaMTNw4QXD_PHlxM/edit) (návod platný 250724, totožný s README) popisují jen napojení **hotového** produktu na nákup (akce `add_shadowloop_product` s ID produktu z Firestore `products`), ne nahrání balíčku do aplikace.
  - Kde je samotný postup (Storage `decks/<id>/` + dokument `decks/<id>` + doplnění do `products/<produkt>`), zatím nevíme. Doplnit, až se najde, nebo sepsat znovu a ověřit na zkušebním balíčku.
- Logy generátoru za posledních 30 dní jsou prázdné, tedy se nepoužíval.
- **Náklady:** platí se Google Translate a Text-to-Speech podle počtu znaků (hlasy Chirp3-HD jsou dražší než základní); ceny neověřeny.
- ⚠️ Při nasazování funkcí z repozitáře vždy jmenovat funkce (`--only functions:sale,…`), jinak by Firebase generátor smazal.

## Záloha a obnova (od 261028)

Lenka 261028: placené zálohy Googlu nechce (ani zlomky centu), dat přibývá málo. Proto: **ochrana proti smazání + vlastní měsíční export na Disk zdarma**, spouští Claude při měsíční údržbě (1. v měsíci se Staženými, [[resources/postupy/udrzba-pocitace]]).

- **Ochrana proti smazání databáze:** zapnutá 261028 22:33 (`deleteProtectionState: DELETE_PROTECTION_ENABLED`, ověřeno). Databázi `(default)` nejde smazat, dokud ji někdo (Owner) výslovně nevypne. Na data, aplikaci ani cenu to vliv nemá. Pozor: proti smazání **jednotlivých dokumentů** nechrání, na to je export.
- **Skript:** `C:\Users\Lenka\source\repos\shadowloop-zaloha\zaloha.py` (mimo vault), přihlašuje se tokenem Firebase CLI (`firebase.cmd login`, účet lnk.dvorakova@gmail.com), žádné heslo ani klíč v souboru. Spouštět `python -I zaloha.py <příkaz>`, nápověda bez příkazu.
- **Měsíčně:**
  ```
  cd "C:\Users\Lenka\source\repos\shadowloop-zaloha"; python -I zaloha.py info; python -I zaloha.py zaloha; python -I zaloha.py storage-stahni
  ```
  - `info`: ochrana, PITR, počty dokumentů po kolekcích.
  - `zaloha`: všechny kolekce (a případné podkolekce) do `G:\Můj disk\Zálohy webů\shadowloop-firestore\firestore-YYMMDD.json`, hodnoty v původním typovaném tvaru REST API (obnova je bezztrátová).
  - `storage-stahni`: soubory balíčků do `G:\Můj disk\Zálohy webů\shadowloop-storage\decks\<id>\…`; stahuje jen nové nebo změněné (porovná velikost a MD5), takže **nový balíček se doplní sám** při dalším spuštění, nebo hned po nahrání balíčku stejným příkazem.
- **Stav 261028 (první záloha):** Firestore 770 dokumentů (`decks` 200, `freebies` 2, `preregistered` 357, `products` 7, `users` 204), soubor 2,7 MB, čtení ≈ 770 (limit zdarma 50 000 denně, takže i desetinásobek dat je bez problému). Storage 4 975 objektů (4 807 souborů + 168 prázdných záznamů složek), 384 MB, jen složka `decks/` (200 balíčků); úplná kopie stažena 261028 do `shadowloop-storage` (370 MB na Disku), druhé spuštění už nestáhlo nic.
- **Postup studentů aplikace neukládá** (ověřeno v kódu 261028, `App.jsx`, `DecksList.jsx`): dokument `users/<uid>` má jen `uid`, `displayName`, `email`, `premiumDecks` (které balíčky má) a `archived` (které si schoval). Kolik vět kdo přehrál, se nikam nezapisuje. Záloha jednou měsíčně tedy ztrátou hrozí jen u nových účtů a nákupů za poslední měsíc; ty jdou dohledat ve fapipi a znovu přidat adresou `sale`.
- **Obnova** (vždy nejdřív nanečisto):
  - `python -I zaloha.py obnova "<soubor>" --nanecisto`: jen vypíše, co by se zapsalo.
  - `python -I zaloha.py obnova "<soubor>" --do-prefixu test_obnova_ [--kolekce products]`: zapíše do zkušebních kolekcí `test_obnova_<kolekce>`; úklid `python -I zaloha.py smazat-prefix test_obnova_`.
  - `python -I zaloha.py obnova "<soubor>" --prepsat-ziva [--kolekce users]`: **skutečná obnova živých dat, jen po havárii a se souhlasem Lenky**; chce potvrzení „ANO“. Dokumenty ze zálohy přepíše, dokumenty vzniklé po záloze nechá být.
  - Vyzkoušeno 261028: nanečisto všech 770, naostro `products` → `test_obnova_products` (7 ze 7 shodných s originálem), pak smazáno; živé kolekce beze změny.
- **Obnova Storage:** soubory ze `shadowloop-storage\decks\<id>\` nahrát zpět ve Firebase konzoli (Storage → decks → složka `<id>` → Upload file), stejně jako u nového balíčku výš.

## Změna vzhledu a nasazení (od 261025)

Kód je stažený v `C:\Users\Lenka\source\repos\shadowloop` (mimo vault, kvůli knihovnám). Barvy a písma jsou v `src/App.jsx` (motiv), spodní panel přehrávače v `src/Components/Pages/DeckDetail/Controls.jsx`, písma v `public/index.html`. Náhled: v Claude Code spustit `shadowloop` z `.claude/launch.json` (http://localhost:3000).

Postup: úprava → náhled lokálně → commit → push a nasazení spouští Lenka (v PowerShellu s koncovkou `.cmd`, skripty `.ps1` jsou blokované):

```
cd "C:\Users\Lenka\source\repos\shadowloop"; git push origin master
cd "C:\Users\Lenka\source\repos\shadowloop"; npm.cmd run build; firebase.cmd deploy --only hosting
```

Firebase CLI je nainstalované, Lenka přihlášená jako lnk.dvorakova@gmail.com. Návrat k předchozí verzi: Firebase konzole → Hosting → Release history → Rollback.

## Dárek „Texty a nahrávky“ (Leadpages, přestavěno 261030)

- **Cesta (ověřeno 261030 zkušební adresou):** stránka [lenka-dvorakova.lpcontent.net/shadowloop-texty](https://lenka-dvorakova.lpcontent.net/shadowloop-texty) (Leadpages, stránka `hzk2n8pevgbxzpdcsluk9cql`) → formulář `shadowloop_10xe_texty` (pole `first_name`, `email_address`) → automatizace Leadpages → Drip workflow `delivery: Shadowloop 10xE texty` (štítek `freebie: shadowloop10xetexty`, souhlas, mail „Naučte se mluvit... s Shadowloop“, uvítací série) → odkaz v mailu → funkce `freebie` (balíček `freebies/Qb95FxyZvaY51QGlZ859`, 5 textů) → přesměrování do aplikace. Texty e-mailem nechodí, v mailu je jen odkaz.
- **Stránka:** vlastní HTML ve vzhledu značky, zdroj `GrowOS/lcenglish/library/web/shadowloop-texty-darek-261029.html`, původní stránka z 2022 v `…/shadowloop-texty-puvodni-zaloha-261029.html`. Po odeslání formulář zmizí a ukáže se „Hotovo! Mrkněte do e-mailu.“ (hlídá text `data-success-message`, při změně hlášky upravit i skript dole). ⚠️ **Název formuláře a pole neměnit**, jinak se přeruší napojení na Drip. Snímek aplikace je asset stránky 10x ENGLISH v Leadpages (`th2hwio6tt6lb623j29pq8vs`).
- Úpravy: konektor Leadpages (`update_page` / `edit_page`, zveřejnění chce potvrzení).

## Adresa při přihlášení Googlem (hotovo 261029)

**Výsledek 261029 20:10:** Google při přihlášení píše „Pokračovat do aplikace **Shadowloop**“ a pod tím odkazy na zásady a smluvní podmínky (ověřeno na výběru účtu). Ověření značky prošlo automaticky za pár minut po „Verify branding“, pak „Publish branding“. ⚠️ Kdyby se v Branding změnil název, logo nebo odkazy, ověřuje se znovu; domovská stránka `lcenglish.cz/shadowloop/` a článek V. v zásadách musí zůstat (Google je kontroluje).

**Stav 261029 18:05:** Lenka nasadila, v nasazeném kódu je `authDomain:"shadowloop.lcenglish.cz"` (ověřeno). Google přihlášení s novým přesměrováním přijímá, výběr účtu ukazuje „Pokračovat do aplikace **lcenglish.cz**“ (ověřeno přímým odkazem na výběr účtu, účet nevybrán). Přihlášený zkušební účet „Jana“ zůstal přihlášený.

**Stav 261029 20:05 (Lenka schválila verzi 3):** stránka [lcenglish.cz/shadowloop/](https://lcenglish.cz/shadowloop/) zveřejněná (WP **7587**, jeden blok Vlastní HTML se stylem, zdroj `GrowOS/lcenglish/library/web/shadowloop-stranka-261029.html`; Kadence bez titulku, plná šířka, unboxed; Rank Math titulek „Shadowloop: aplikace na trénink mluvení anglicky | LCEnglish“, index). Obrázek v úvodu je snímek z Leadpages (asset `th2hwio6tt6lb623j29pq8vs` stránky 10x ENGLISH), při smazání toho assetu by zmizel. Zásady [lcenglish.cz/privacy-policy/](https://lcenglish.cz/privacy-policy/) (WP 4452) doplněny: Google (Firebase) mezi zpracovateli a nový článek V. Aplikace Shadowloop, závěrečná ustanovení jsou VI. (předchozí znění v revizích WordPressu). V Google Auth Platform stisknuto „Verify branding“ (20:03). Ověřeno: stránka 200, index, odkaz na zásady, na mobilu bez vodorovného posunu.

**Stav 261029 18:45:** Branding uložen (support a vývojářský e-mail `lnk.dvorakova@gmail.com`, domovská stránka `lcenglish.cz/shadowloop/`, zásady, obchodní podmínky; „Verify branding“ zatím nestisknuto). Vítek (`vitek.peterk@gmail.com`) zůstává vlastníkem projektu (`roles/owner`, ověřeno v IAM); support e-mail na přístup nemá vliv. Stránka verze 2 (prodejnější, z blogu) ve frontě GrowOS v `review`. Zásady podle Lenky nejsou změna, jen upřesnění; oznámí se v e-mailu o vylepšeních Shadowloopu (úkol v next-actions).

**Stav 261029 18:15:** Lenka ověřila přihlášení Googlem v anonymním okně, bez problémů. Doména `lcenglish.cz` je v Search Console ověřená (Lenka vlastník, přes DNS). Podklady k ověření značky (text stránky `lcenglish.cz/shadowloop/`, doplnění zásad ochrany osobních údajů, vyplnění Branding) jsou ve frontě GrowOS: [[GrowOS/lcenglish/work/pages/shadowloop-stranka-a-zasady|podklady]] (`review`). Po schválení: stránku a zásady vložit do WordPressu, vyplnit Branding, „Verify branding“.

**Ověření značky („Pokračovat do aplikace Shadowloop“), zjištěno 261029:** Google Auth Platform → Branding: název aplikace „Shadowloop“ už je vyplněný, stav „Your branding needs to be verified before it can be shown to users“. Chybí: domovská stránka aplikace (veřejná, popis aplikace, odkaz na zásady; `lcenglish.cz/shadowloop/` neexistuje), zásady ochrany osobních údajů s Shadowloopem a přihlášením Googlem (`lcenglish.cz/privacy-policy/` je nezmiňuje, jen Google Analytics), authorized domain `lcenglish.cz` ověřená v Google Search Console, kontaktní e-mail vývojáře. Support e-mail je teď `vitek.peterk@gmail.com`. Google pak značku kontroluje (u základního přihlášení obvykle pár dní, neověřeno).

**Stav 261029 17:05 (Lenka „ano, přepni“):** OAuth klient má navíc origin `https://shadowloop.lcenglish.cz` a přesměrování `https://shadowloop.lcenglish.cz/__/auth/handler` (staré adresy zůstávají, ověřeno po uložení). Doména je v Authorized domains Firebase (ověřeno přes API). Kód: `authDomain: 'shadowloop.lcenglish.cz'`, commit `ab3a55e` v `C:\Users\Lenka\source\repos\shadowloop`, build hotový. Čeká na nasazení Lenkou (`firebase.cmd deploy --only hosting`) a test přihlášení. Pak (Lenka 261029) spustit ověření značky, aby se zobrazoval název „Shadowloop“. Návrat: v `App.jsx` vrátit `shadowloop-firebase.firebaseapp.com` a nasadit, nebo Rollback v Hosting.

Google při přihlášení ukazuje `shadowloop-firebase.firebaseapp.com`, protože v kódu je `authDomain: 'shadowloop-firebase.firebaseapp.com'` (`src/App.jsx`, `firebaseConfig`). Google vypisuje doménu, přes kterou přihlášení prochází.

- **Návrh: `authDomain` = `shadowloop.lcenglish.cz`.** Doména už běží na Firebase Hosting (DNS 199.36.158.100) a přihlašovací stránka `https://shadowloop.lcenglish.cz/__/auth/handler` odpovídá 200 (ověřeno 261029). Kroky: (1) Google Cloud Console → APIs & Services → Credentials → OAuth klient „Web client (auto created by Google Service)“ → Authorized redirect URIs přidat `https://shadowloop.lcenglish.cz/__/auth/handler` (starou nechat); (2) Firebase → Authentication → Settings → Authorized domains: ověřit, že je tam `shadowloop.lcenglish.cz`; (3) v `src/App.jsx` přepsat `authDomain`, build a `firebase.cmd deploy --only hosting`; (4) vyzkoušet přihlášení Googlem i e-mailem. Přihlášení e-mailem a heslem se to netýká, účty zůstávají.
- **Název aplikace a logo na obrazovce souhlasu** (Google Auth Platform → Branding) samy doménu nenahradí: Google ukáže název „Shadowloop“ místo domény až po ověření značky (domovská stránka, zásady ochrany osobních údajů, ověřená doména, pár dní). Volitelný další krok, ne nutný.

## Upozornění od Googlu

- 261030 — **Mazání nepoužívaných OAuth klientů: nic se nemaže, nic dělat** (ověřeno 13:20–13:30). Mail Google z 29. 10. 23:12 ([Gmail](https://mail.google.com/mail/?authuser=lnk.dvorakova@gmail.com#all/thread-f:1880423853661055962)) hlásil v `shadowloop-firebase` klienty nepoužité 5 měsíců, smazání za 30 dní; ID v mailu nejsou. V projektu je jen **jeden** OAuth klient: „Web client (auto created by Google Service)“, webová aplikace, založen 25. 7. 2021, ID `177841367667-jrseg0srr020tq70sv40su4rc43ct3ge.apps.googleusercontent.com`. Je to právě klient přihlášení Googlem do Shadowloopu (stejné ID ve Firebase → Authentication → Sign-in method → Google → Web SDK configuration → Web client ID) a nesmí se smazat. Konzole u něj ukazuje **Last used date: October 29, 2026** (testy přihlášení 29. 10.), takže už nepoužívaný není. Odhad: mail vycházel ze starších dat (Google uvádí zpoždění den i víc) a přihlášením Googlem se dřív nikdo měsíce nepřihlásil, studenti asi používají e-mail a heslo; neověřeno. ⚠️ Google maže klienty nepoužité 6 měsíců: kdyby mail přišel znovu, stačí se jednou přihlásit na shadowloop.lcenglish.cz Googlem. Smazaného klienta jde 30 dní obnovit (Google Auth Platform → Clients → „Restore deleted OAuth clients“).
- 261025 — **hotovo 17:52: funkce běží na Node.js 22** (nasazeno a otestováno, detail v [[lcenglish-ekosystem#Shadowloop a Firebase]]). Původní upozornění: **Node.js 20 končí 30. 10. 2026** (Google [Runtime support](https://docs.cloud.google.com/functions/docs/runtime-support): po tomhle datu nejde funkce aktualizovat a běžící „mohou být vypnuty“). Na Node.js 20 běží `sale`, `freebie` a `registerUser`. Oprava: `functions/package.json` → `"node": "22"`, pak `firebase.cmd deploy --only functions:sale,functions:freebie,functions:registerUser --project shadowloop-firebase`. **Nikdy jen `--only functions`**: v projektu je navíc funkce `generator` (us-central1, Node.js 22), která v repozitáři není, a CLI by ji chtělo smazat. Lenka je vlastnice projektu (Owner), nasadit smí. Vítek 261025: „mělo by stačit změnit 20 na 22, po změně zkontrolovat, že to funguje.“ Detail [[lcenglish-ekosystem#Shadowloop a Firebase]].
- Před nasazením funkcí: `npm.cmd ci` ve složce `functions` (jinak chybí knihovny) a kontrola `npm.cmd run lint` musí projít. Na Windows Git ukládá soubory s konci řádků CRLF a kontrola pak hlásí desítky chyb `linebreak-style`; pomůže soubory `functions/index.js` a `functions/.eslintrc.js` smazat a obnovit příkazem `git -c core.autocrlf=false checkout -- <soubor>`.
- 260929 — Firebase Hosting (od 15. 10. 2026 se u **nových** projektů nevytváří hosting automaticky) a Cloud Build (release channels pro build VM, výchozí od 28. 3. 2027, dotčen `shadowloop-firebase`): **nic nedělat.** Shadowloop je existující projekt bez CI/CD a funkce se nasazují ručně; Cloud Build se týká jen dalšího nasazení funkcí a běžné sestavení změnu nepozná.

## Instalace jako aplikace v telefonu (prozkoumáno 261030)

**Proč Chrome nabízí „Instalovat“:** Shadowloop má od ledna 2021 soubor `public/site.webmanifest` (commit `f257dbf`, 17. 1. 2021, odkaz v `public/index.html`): název „Lights Camera English Shadowloop“, krátký název „Shadowloop“, ikony 192 a 512 px, `display: standalone`. 25. 10. 2026 se v něm změnily jen barvy (`a6e500c`). Service worker aplikace nemá (ověřeno v kódu a na živém webu: `/service-worker.js` vrací jen stránku aplikace). Dřív Chrome bez service workeru nabízel jen „Přidat na plochu“ (zástupce); od Chrome 108 na mobilu ho k instalaci z menu nevyžaduje ([Chrome for Developers](https://developer.chrome.com/blog/update-install-criteria)). Proto teď „Instalovat aplikaci“: Shadowloop se otevře v celém okně bez adresního řádku, s vlastní ikonou a v seznamu aplikací. Odhad: změnu přinesla aktualizace Chromu, ne úprava Shadowloopu. Manifest nemá `start_url` ani `id`; Chrome si podle všeho vezme adresu stránky (domněnka, neověřeno na zařízení).

**Android (Chrome):** tři tečky vpravo nahoře → „Instalovat aplikaci“ (u starších verzí „Přidat na plochu“) → Instalovat. Jestli Chrome bez service workeru nabídne i automatickou lištu nebo událost `beforeinstallprompt` (tlačítko „Nainstalovat“ v aplikaci), zdroje jednoznačně neříkají; ověřit na telefonu.

**iPhone (Safari):** Sdílet (čtverec se šipkou; v iOS 26 případně přes tři tečky) → „Přidat na plochu“ → přepínač „Otevřít jako webovou aplikaci“ (v iOS 26 výchozí zapnutý) → Přidat ([heise](https://heise.de/-10749652)). Na iPhonu tlačítko „Nainstalovat“ udělat nejde, Safari `beforeinstallprompt` nemá; jen návod.

⚠️ **Přihlášení:** na iPhonu má aplikace z plochy vlastní úložiště, takže se student po instalaci přihlásí znovu. Přihlášení běží přes vyskakovací okno (`signInFlow: 'popup'`, `LoginDialog.jsx`); v aplikaci z plochy je to neověřené. Před rozesláním návodu vyzkoušet na iPhonu i Androidu.

**Návrhy navedení (čeká na Lenku):**
- **A. Krátký návod s obrázky (doporučeno jako první):** dvě karty po třech krocích (Android, iPhone), snímky obrazovky; na lcenglish.cz/shadowloop/ (otázka „Musím něco instalovat?“) a jeden odstavec do uvítacího mailu po nákupu. V aplikaci se nic nemění. Výroba přes frontu GrowOS.
- **B. Tlačítko „Přidat na plochu“ v aplikaci:** Android = jedno klepnutí a systémové okno (`beforeinstallprompt`, pokud ho Chrome bez service workeru pustí); iPhone = tlačítko ukáže tři kroky s obrázkem. V nainstalované aplikaci se tlačítko skryje. Vyžaduje úpravu kódu a nasazení Lenkou.
- Drobnost při B: v manifestu doplnit `start_url`, `id` a nahradit starý název „Lights Camera English Shadowloop“ „Shadowloop – LCEnglish“ (zobrazuje se při instalaci).
