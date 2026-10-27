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

## Změna vzhledu a nasazení (od 261025)

Kód je stažený v `C:\Users\Lenka\source\repos\shadowloop` (mimo vault, kvůli knihovnám). Barvy a písma jsou v `src/App.jsx` (motiv), spodní panel přehrávače v `src/Components/Pages/DeckDetail/Controls.jsx`, písma v `public/index.html`. Náhled: v Claude Code spustit `shadowloop` z `.claude/launch.json` (http://localhost:3000).

Postup: úprava → náhled lokálně → commit → push a nasazení spouští Lenka (v PowerShellu s koncovkou `.cmd`, skripty `.ps1` jsou blokované):

```
cd "C:\Users\Lenka\source\repos\shadowloop"; git push origin master
cd "C:\Users\Lenka\source\repos\shadowloop"; npm.cmd run build; firebase.cmd deploy --only hosting
```

Firebase CLI je nainstalované, Lenka přihlášená jako lnk.dvorakova@gmail.com. Návrat k předchozí verzi: Firebase konzole → Hosting → Release history → Rollback.

## Upozornění od Googlu

- 261025 — **hotovo 17:52: funkce běží na Node.js 22** (nasazeno a otestováno, detail v [[lcenglish-ekosystem#Shadowloop a Firebase]]). Původní upozornění: **Node.js 20 končí 30. 10. 2026** (Google [Runtime support](https://docs.cloud.google.com/functions/docs/runtime-support): po tomhle datu nejde funkce aktualizovat a běžící „mohou být vypnuty“). Na Node.js 20 běží `sale`, `freebie` a `registerUser`. Oprava: `functions/package.json` → `"node": "22"`, pak `firebase.cmd deploy --only functions:sale,functions:freebie,functions:registerUser --project shadowloop-firebase`. **Nikdy jen `--only functions`**: v projektu je navíc funkce `generator` (us-central1, Node.js 22), která v repozitáři není, a CLI by ji chtělo smazat. Lenka je vlastnice projektu (Owner), nasadit smí. Vítek 261025: „mělo by stačit změnit 20 na 22, po změně zkontrolovat, že to funguje.“ Detail [[lcenglish-ekosystem#Shadowloop a Firebase]].
- Před nasazením funkcí: `npm.cmd ci` ve složce `functions` (jinak chybí knihovny) a kontrola `npm.cmd run lint` musí projít. Na Windows Git ukládá soubory s konci řádků CRLF a kontrola pak hlásí desítky chyb `linebreak-style`; pomůže soubory `functions/index.js` a `functions/.eslintrc.js` smazat a obnovit příkazem `git -c core.autocrlf=false checkout -- <soubor>`.
- 260929 — Firebase Hosting (od 15. 10. 2026 se u **nových** projektů nevytváří hosting automaticky) a Cloud Build (release channels pro build VM, výchozí od 28. 3. 2027, dotčen `shadowloop-firebase`): **nic nedělat.** Shadowloop je existující projekt bez CI/CD a funkce se nasazují ručně; Cloud Build se týká jen dalšího nasazení funkcí a běžné sestavení změnu nepozná.
