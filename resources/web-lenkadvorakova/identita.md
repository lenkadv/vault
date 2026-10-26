# lenkadvorakova.cz – vizuální identita a stavba webu

Schváleno Lenkou 261025. Sesterská identita k LCEnglish (`GrowOS/lcenglish/brain/brand.md`, „Galerie“): stejný papír, inkoust a písma, vlastní hlavní barva místo červené.

## Účel webu

Rozcestník osobní značky a vizitka hlavně pro firemní a korporátní klienty. Hlavní nabídka: **prezentace a komunikace, i v angličtině** (školení a koučink na míru). DigiStart, až bude venku, na stejné úrovni jako školení (třetí karta v nabídce). LCEnglish a Dějiny umění: V nejlepších letech jen jako doplněk dole. Samostatná stránka školení ani blog nejsou (blogové články v konceptech).

## Barvy

| Role | Kód |
|---|---|
| Hlavní barva (petrolejová do modra) | `#1E5470` |
| Hlavní – najetí myší | `#163F55` |
| Papír (pozadí) | `#F7F1EA` |
| Papír tmavší (pruhy, karty doplňků) | `#EFE6DB` |
| Linka | `#E2D6C8` |
| Inkoust (text, patička) | `#1A1416` |
| Šedý text | `#5E5254` |
| Karty | `#FCFAF7` |
| Zlatá (jen obrys fokusu) | `#E6A93B` |

Kontrasty: bílá na hlavní 8,2:1, hlavní na papíře 7,3:1, šedá na papíře 6,7:1.

## Písma

Nadpisy DM Serif Display (400), text a tlačítka Karla (400, 700). Načítá se z Google Fonts v Přizpůsobit → Další styly CSS.

## Kde co je

- **Home** = stránka 751, jeden blok HTML se styly `.ld-*`. Úvod (fotka `Lenka-headshot-e1755199916783.webp` s průhledným pozadím stojí na spodní hraně; od 261026 bez oblouku na celé šířce hlavní barvy, přebito v Dalších stylech CSS), loga klientů, nabídka (2 karty), Proč se mnou (01–03), reference, Moje další projekty, závěr. Titulek a popis pro vyhledávače v Rank Math.
- **Kontakt** = stránka 130, blok HTML `.ldk-*` + formulář Fluent Forms id 1 (upozornění na info@lenkadvorakova.cz; honeypot, token, Akismet, reCAPTCHA v3).
- **Hlavička a patička** pro celý web: Přizpůsobit → Další styly CSS (Kadence) + Patička → HTML. Na Home se jméno v hlavičce skrývá (je velké v úvodu).
- **Úpravy 261026 (Zápisník, Lenka schválila), na konci Dalších stylů CSS:** úvod Home varianta A (celá šířka hlavní barvy, bílé jméno, zlatý nadpis nad ním, fotka velká bez oblouku na spodní hraně, hlavička na Home v hlavní barvě, styl jako úvod lcenglish.cz; oblouk Lenka odmítla jako „estetiku roku 2000“), reference stejně vysoké, patička tlumeně šedá #8C8285 a na středu. Předchozí verze CSS: [[dalsi-styly-css-261026-pred.css]].
- **Obrázek pro sdílení:** [[lenka-dvorakova-sdileni.jpg]] (1200×630, médium 774), v Rank Math u Home a Kontaktu.
- **Měření:** GA4 `G-HXGVN58MPM` (účet „lenkadvorakova.cz“ 233539903, vlastnost 321787141) přes doplněk `wp-content/mu-plugins/ld-mereni.php` (kopie [[ld-mereni.php]]); přihlášenou majitelku neměří. Meta pixel ne. Dál běží Jetpack statistiky a Metricool; Drip „AI lektoři“ (8879539) z webu odstraněn 261025 (plugin Drip for WordPress smazán, účet v Dripu beze změny).

## Pravidla textů (z Lenčiných oprav)

Viz `resources/hlas/profesni/profil-profesni.md`, sekce Poučení 261025: položky seznamu jednou formou, váha číslem bez bombastiky, každá věc vlastní sloveso, starší úspěchy bez roku, kampus Albertov nezmiňovat, firemním klientům neradit, co psát do formuláře. Značka se píše „LCEnglish“.
