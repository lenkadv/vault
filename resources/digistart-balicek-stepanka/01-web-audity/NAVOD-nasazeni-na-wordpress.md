# Návod: nasazení webu o auditech na vlastní WordPress

Stav: koncept C „Víte, kdo u vás co dělá?“ (export z Leadpages, 261002). Stránka je jednostránková „digitální vizitka“ GNOSTIKA CONSULTING o personálním a procesním auditu pro veřejné instituce. Obsahuje žluté placeholdery a pruh „pracovní koncept“ (viz `KONTROLNI-SEZNAM-pred-spustenim.md`), je nastavená jako `noindex` (nevyhledávatelná).

## Co v balíčku je

| Soubor | K čemu |
|---|---|
| `index.html` | **hlavní soubor**: celá stránka (HTML + styly + logo jako obrázek v kódu). Nezávislý na cizích službách |
| `fonty.css` + složka `fonts/` | písma uložená lokálně (bez Google Fonts, bez řešení souhlasu s cookies kvůli písmům) |
| `wordpress-blok.html` | totéž pro vložení do WordPress stránky přes blok „Vlastní HTML“ (styly jsou omezené jen na tuhle stránku, aby se nehádaly se šablonou) |
| `tvorba-bloku.py` | malý skript, který `wordpress-blok.html` znovu vyrobí z `index.html` (po každé úpravě textů v `index.html`) |
| `AGENTS.md` / `CLAUDE.md` | pokyny pro AI asistentku (ChatGPT / Claude Code), aby věděla, co stránka je a co smí měnit |
| `KONTROLNI-SEZNAM-pred-spustenim.md` | co doplnit a zkontrolovat před zveřejněním |

## Krok 0: zjistěte tři věci o svém WordPressu (10 minut)

Nevadí, když je nevíte. Zeptejte se asistentky v chatu (viz „Zadání pro AI“ níže) a ona vás provede.

1. **Kde web běží a jak se k němu dostanete?** Potřebujete aspoň jednu z těchto cest: a) správce souborů u hostingu (webhosting → „Správce souborů“ nebo FTP), b) přihlášení do WordPressu jako správce.
2. **Jakou má web šablonu a editor?** Gutenberg (výchozí WordPress editor), Elementor, Divi, WPBakery, jiný. V administraci: *Vzhled → Šablony* a při úpravě stránky vidíte, který editor se otevře.
3. **Jakou adresu má mít stránka?** Tři běžné možnosti: `gnostika.cz/audity` (podsložka), `audity.gnostika.cz` (subdoména, vyžaduje nastavení u hostingu/DNS), nebo samostatná doména.

> **Zadání pro AI asistentku (zkopírujte do chatu):**
> „Pomoz mi nasadit hotovou HTML stránku (soubor index.html + fonty) na můj WordPress web. Nejdřív se zeptej, kde web běží, jak se k souborům dostanu a jaký má šablonu a editor. Potom vyber nejjednodušší ze tří cest v souboru NAVOD-nasazeni-na-wordpress.md a veď mě po jednom kroku. Nic nemaž a nepřepisuj existující stránky webu bez mého schválení. Před každým krokem, který něco mění, mi řekni, co udělá.“

---

## Cesta A (doporučená): samostatná stránka v podsložce

Stránka se nahraje jako samostatná složka vedle WordPressu. Vypadá **přesně** jako koncept, WordPress ani šablona do ní nezasahují. Je to nejjistější a nejrychlejší cesta.

1. Vytvořte na vlastním počítači složku `audity` a vložte do ní: `index.html`, `fonty.css` a složku `fonts` (s celým obsahem).
2. Přihlaste se do správce souborů hostingu (nebo FTP). Najděte kořenovou složku webu (obvykle `www`, `public_html` nebo `htdocs`; poznáte ji podle toho, že obsahuje složku `wp-content`).
3. Nahrajte složku `audity` do kořenové složky.
4. Otevřete v prohlížeči `https://vase-domena.cz/audity/` (nebo `…/audity/index.html`). Měla by se zobrazit stránka s logem, správnými písmy a žlutým pruhem nahoře.
5. Zkontrolujte na mobilu (nebo zúžením okna prohlížeče).

**Co se může pokazit:**
- *Zobrazí se chyba 404 nebo se otevře WordPress místo stránky:* použijte přímou adresu `…/audity/index.html`. Pokud se nezobrazí ani ta, složka je v jiném místě, než má být (zkontrolujte, že je vedle `wp-content`).
- *Písma vypadají jinak (Times New Roman):* nenahráli jste složku `fonts` nebo `fonty.css`, nebo se nenačetly kvůli omezení hostingu. Zkontrolujte, že adresa `…/audity/fonty.css` se otevře.
- *Změny se neprojevují:* cache. Vyprázdněte ji (plugin pro cache v administraci WordPressu, nebo cache hostingu) a obnovte stránku klávesami Ctrl+F5.
- *Stránka není vidět ve vyhledávačích:* je to záměr. V `index.html` je řádek `<meta name="robots" content="noindex">`; až budete chtít, aby stránku Google našel, odstraňte ho (viz kontrolní seznam).

**Odkaz z webu:** vložte odkaz na `/audity/` do menu nebo na vhodnou stránku (v administraci: *Vzhled → Menu → Vlastní odkazy*).

---

## Cesta B: vložení do WordPress stránky (blok „Vlastní HTML“)

Hodí se, když má být stránka součástí webu (se záhlavím a patičkou šablony) nebo ji chcete mít v seznamu stránek WordPressu.

1. Nahrajte `fonty.css` a složku `fonts` do složky `audity` na hostingu (jako v kroku 1–3 cesty A; `index.html` tam být nemusí).
2. V administraci: *Stránky → Přidat novou*. Název např. „Audity“.
3. Přidejte blok **Vlastní HTML** (v Gutenbergu: znaménko + → „Vlastní HTML“). Vložte do něj celý obsah souboru `wordpress-blok.html` (otevřete ho v Poznámkovém bloku, vše označte Ctrl+A a zkopírujte).
4. V souboru je odkaz na písma `/audity/fonty.css`. Pokud jste složku pojmenovali jinak, upravte ho.
5. V nastavení stránky (pravý panel) zvolte šablonu stránky **„Plná šířka“** / „Bez záhlaví a zápatí“ / „Canvas“ (pokud ji šablona nabízí) a vypněte zobrazení názvu stránky. Je-li šablona jiná, stránka se vejde jen do úzkého sloupce.
6. *Náhled → Publikovat.*
7. Zkontrolujte vzhled na počítači i mobilu.

**Omezení a poznámky:**
- Blok je odzkoušený na zkušební šabloně s „nepřátelskými“ styly (agresivní nadpisy, odstavce, odkazy); styly šablony se do něj nepřenášejí, ale u konkrétní šablony se může objevit drobná odchylka (mezery, šířka). Pokud ano, požádejte AI asistentku, ať je opraví v bloku (v `AGENTS.md` je vysvětleno jak).
- Editor Elementor: použijte widget **HTML**; Divi: **Code modul**; WPBakery: **Raw HTML**. Obsah je stejný.
- Klasický editor WordPressu (starý, bez bloků) může do HTML přidat zbytečné odstavce a zalomení. V takovém případě použijte raději cestu A.
- Po změně textu v `index.html` vyrobte blok znovu: `python tvorba-bloku.py` (nebo požádejte asistentku).

---

## Cesta C: přestavba v editoru (až na dobu, kdy se obsah ustálí)

Pokud má web dlouhodobě spravovat někdo bez zkušeností s HTML, může se stránka později přestavět v editoru šablony (Elementor, Gutenberg). `index.html` k tomu slouží jako **předloha**:

| Prvek | Hodnota |
|---|---|
| Hlavní barva (bordó) | `#9B224F`, tmavší `#74183B`, růžová `#F3D3E0` |
| Pozadí | `#F1ECE6`, světlejší sekce `#E8DFD5`, text `#231A1D`, šedá `#5E5155` |
| Nadpisy | Archivo (extra tučné, zúžené), v hlavním nápisu zvýrazněná slova „kdo“ a „co“ bordó pruhem lehce natočená |
| Text | DM Sans, 18 px |
| Ručně psaný doplněk | Caveat (jen krátké věty) |
| Logo | vektorové logo je přímo v `index.html` (prvek `<svg class="logo">`) |
| Sekce | hlavní nápis, „Poznáváte se?“, „Kdy se vyplatí podívat se pod pokličku“, „Jak audit probíhá“ (5 kroků), „Zpráva, se kterou se dá začít hned druhý den“, „Pro koho audity děláme“, kontakt |

Asistentka (ChatGPT / Claude Code) umí z `index.html` stránku po sekcích přepsat do bloků vybraného editoru. Vždy po jedné sekci, s porovnáním proti předloze.

---

## Po nasazení

- **Záloha:** před jakýmkoli zásahem do webu zálohujte (plugin pro zálohování nebo záloha u hostingu). Cesta A žádné soubory WordPressu nemění, jen přidává složku.
- **Vrácení zpět:** u cesty A stačí smazat složku `audity` (ve správci souborů hostingu); u cesty B stránku přesunout do koše.
- **Soukromí:** stránka nepoužívá cookies, žádnou analytiku ani formulář (jen odkazy `mailto:` a `tel:`). Pokud později doplníte měření návštěvnosti nebo formulář, je třeba souhlas s cookies / informace o zpracování osobních údajů.
- **Další úpravy:** všechny úpravy textu dělejte v `index.html` (nebo nechte asistentku). Pravidla, co se smí měnit, jsou v `AGENTS.md`.
