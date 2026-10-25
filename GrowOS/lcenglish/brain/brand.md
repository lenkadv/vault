# Brand

> Jednotná vizuální identita LCEnglish, platí od 261025 všude: web lcenglish.cz (WordPress/Kadence), prodejní stránky v Leadpages, e-maily v Dripu, FreshLearn, Shadowloop, sociální sítě a Canva, Substack Art for English. Lenka vybrala variantu **B „Galerie“** ze srovnání tří variant (artefakt https://claude.ai/artifact/TUn1d8HmbnmA6XNG1Tps3a). Vzorník s kódy a pravidly, co kde nastavit: https://claude.ai/artifact/YR59A2aWtN8eTQYshtiNCF (soukromý artefakt).

## Proč takhle

Dřív měla každá služba jinou hlavní barvu (web růžová #D65D67 + modrá #073071, Leadpages korálová #CE4522, Drip hnědozlatá #B67A0D, Shadowloop indigo, Substack oranžová, tento soubor rose #BB5566 a teal) a šest sad písem. Nová paleta vychází **jen z loga**: červená klapka #FF0044 a černý nápis. Stejný postup jako u webu auditů GNOSTIKY: jedna barva z loga, k ní tmavá a teplé světlé pozadí. Papírové pozadí a zlato sedí k obrazům ze starých mistrů, na kterých stojí newsletter Art for English i sítě. Modrá, teal a růžová vypadly, protože v logu nejsou.

## Colors

| Role | Kód | Kde |
|---|---|---|
| **Červená z loga** | `#FF0044` | logo, akcent na tmavém pozadí, drobné prvky (linka, ikonka). Ne jako podklad pro malý bílý text (kontrast 3,9:1) |
| **Tlačítko** | `#D1003A` | tlačítka a odkazy na světlém pozadí; bílý text 5,6:1, na papíru 5,0:1 |
| **Tlačítko – hover** | `#A8002E` | najetí myší na tlačítko |
| **Inkoust** (text, tmavé plochy) | `#1A1416` | text, nadpisy, tmavé sekce, tmavé slidy, patička |
| **Šedý text** | `#5E5254` | popisky, vedlejší text na světlém (6,7:1) |
| **Papír** (hlavní pozadí) | `#F7F1EA` | pozadí stránek a sekcí, světlé slidy |
| **Papír tmavší** | `#EFE6DB` | střídání sekcí, rámečky, citace |
| **Linka** | `#E2D6C8` | oddělovače, okraje polí |
| **Zlatá** | `#E6A93B` | zvýraznění klíčového slova **na tmavém** (8,7:1), hvězdičky u referencí |
| **Zlatá fixa** | `#F2D79B` | podklad zvýraznění („fixa“) **na světlém**, text přes ni inkoustem |
| **Bílá** | `#FFFFFF` | text na tmavém a na tlačítku, pole formulářů |

Pravidla:
- Na jedné ploše jedna výrazná barva: červená **nebo** zlatá, ne obě vedle sebe velkými plochami.
- Na světlém pozadí se zlatá nepíše jako text (kontrast nestačí), jen jako fixa pod slovem.
- Žádná modrá, tyrkysová, růžová ani korálová.

## Fonts
- **Nadpisy:** DM Serif Display (Regular 400; má jen jeden řez) — Google Fonts
- **Text, tlačítka, menu:** Karla (400, 700, kurzíva 400) — Google Fonts
- **E-maily (Drip):** newsletter je **osobní dopis** – prostý text bez šablony, bez obrázkového proklikávacího rámce (Lenka 261025: líbí se jí víc a sedí ke značce). Barvy a písma značky se v něm neřeší, jediný obraz je dílo dne. Kdyby někdy vznikl grafický e-mail: nadpisy Georgia, text Arial, tlačítko #D1003A.
- **Substack:** Karla tam není → text příspěvků Source Sans 3, nadpisy DM Serif Display (261025).
- Konec: Fraunces, Roboto Condensed, Teko, Poppins, systémové písmo na prodejních stránkách.

## Logo
Klapka v `#FF0044` a nápis „LIGHTS CAMERA ENGLISH!“ černě (úzké tučné písmo, název neověřen). Soubor na webu: `https://lcenglish.cz/wp-content/uploads/2022/04/Xlogo_transparent_background.png` (průhledné pozadí). Soubory: `assets/logo/lce-logo-tmave.png` (černý nápis, na světlé pozadí) a `assets/logo/lce-logo-svetle.png` (bílý nápis, na tmavé pozadí; vytvořeno 261025).

## Image style
Výtvarná díla z public domain ve vysokém rozlišení (Met Open Access a podobně), žádné stockové fotky ani AI ilustrace. Tmavé pozadí (inkoust) s obrazy jako atmosféra, silná typografie, zlaté zvýraznění klíčových slov. Vzduch a kontrast — ne přeplněné slidy.

## Look and feel, in a word or two
Galerijní, teplá, kontrastní. Papír a inkoust, červená jen tam, kde se má kliknout.

## Things to avoid
Stockové fotky. Přeplněné slidy. Filled pill pro gramatický cíl (vždy jen border). Všude stejné zaoblení a stíny („AI web“). Míchání dalších barev mimo tuto paletu.

## Design notes
- Zaoblení: tlačítka 4px, jinak bez zaoblení nebo do 4px.
- Padding slidů: 72px
- Fráze se zvýrazněním na tmavém slidu: klíčové slovo zlatě (`#E6A93B`), zbytek bílý
- Pill (gramatický cíl): border `#D1003A` (na tmavém `#FF0044`), text stejnou barvou — nikdy filled
- Oddělovací linka: 3px výška, border-radius 2px, červená z loga nebo zlatá
