# Pokyny pro AI asistentku: web o personálních a procesních auditech GNOSTIKA

> Soubor je určen pro **ChatGPT, Claude Code i jiné AI asistentky**. Claude Code ho načte přes `CLAUDE.md` (ten na tenhle soubor jen odkazuje). V ChatGPT ho vložte do **Projektu** (Instrukce projektu) nebo ho na začátku konverzace přiložte jako soubor spolu s `index.html`.

## Co je tohle za projekt

Jednostránkový web („digitální vizitka“) **GNOSTIKA CONSULTING, s.r.o.** o **personálním a procesním auditu pro veřejné instituce** (úřady, školy, městské organizace). Jediný cíl stránky: **domluvit konzultaci** (e-mail a telefon uvedené v nabídce). Stránka nemá bodovat ve vyhledávání; lidé na ni přijdou po kontaktu nebo doporučení.

- Hlavní soubor: `index.html` (vše v jednom, logo jako vložený vektor, písma lokálně ve `fonts/` přes `fonty.css`).
- Varianta pro WordPress blok „Vlastní HTML“: `wordpress-blok.html`, vyrábí se z `index.html` skriptem `tvorba-bloku.py` (`python tvorba-bloku.py`). **Upravujte vždy `index.html`**, blok pak znovu vygenerujte; ručně upravený blok by se při dalším generování přepsal.
- Návod k nasazení: `NAVOD-nasazeni-na-wordpress.md`. Co dodělat před spuštěním: `KONTROLNI-SEZNAM-pred-spustenim.md`.

## Pravidla pro texty (závazná)

1. **Nevymýšlej fakta.** Žádné reference, čísla, jména klientů, ceny, certifikace ani citace, které mi nedala uživatelka. Chybějící věc označ žlutým placeholderem (`<span class="ph">[co chybí]</span>`) a zeptej se.
2. **Kontakty a firemní údaje neměň** bez výslovného pokynu: ulicna@gnostika.cz, +420 775 137 779, IČ 24821039, Jiráskova 135, 506 01 Jičín, Ing. Štěpánka Uličná, Ph.D.
3. **Mluví firma, ne osoba.** Nepiš „já“, nepoužívej životopisné údaje o Štěpánce (např. dřívější funkce na fakultě). Případné představení lidí patří jen do sekce Tým, a jen s jejím souhlasem.
4. **Hlas:** vykání v množném čísle („vaše oddělení“, „řekneme vám“), srozumitelně a konkrétně, s lehkostí. Ilustrační situace jsou záměr („A co když Jana zítra skončí?“). Žádné korporátní fráze („komplexní řešení“, „synergie“, „nezávislý pohled“ bez konkrétního obsahu).
5. **Jedna hlavní akce** na stránce: domluvit konzultaci. Nepřidávej další tlačítka ani formuláře bez dohody.
6. **Reference jen se souhlasem** dotyčné organizace. Bez souhlasu zůstávají jen typy organizací.
7. **Pravopis a typografie:** české uvozovky nebo rovné `"` konzistentně s dosavadním textem; pevné mezery (`&nbsp;`) po jednopísmenných předložkách (v, u, k, s, z, a, i, o) v nadpisech; pomlčka v rozsazích „3–12 měsíců“ je půlčtverčíková.

## Pravidla pro design (nerozbíjej)

- Barvy: bordó `#9B224F` (tmavší `#74183B`, růžová `#F3D3E0`), pozadí `#F1ECE6` / `#E8DFD5`, text `#231A1D`, šedá `#5E5155`. Definované v `:root` na začátku `<style>`.
- Písma: **Archivo** (nadpisy, zúžené a extra tučné), **DM Sans** (text), **Caveat** (jen krátké ručně psané věty). Lokální, nikdy nenačítej z Google (kvůli GDPR).
- Zvýrazněná slova „kdo“ a „co“ v hlavním nápisu (bordó pruh, lehké natočení) jsou záměrný ústřední prvek. Neměň ho bez dohody.
- Stránka musí zůstat **použitelná na mobilu** (zalomení na šířce 560 a 980 px, tlačítka přes celou šířku). Po každé úpravě zkontroluj úzké okno.
- Žádné skripty, žádné cizí služby, žádné cookies. Nepřidávej měření ani vkládané prvky třetích stran bez dohody (vyžadovalo by to cookie lištu).

## Žlutá místa a pruh „koncept“

- Žlutý pruh nahoře (`.review`) a žlutá místa v textu (`.ph`) znamenají „čeká na doplnění nebo potvrzení“. **Neodstraňuj je sama/sám** a nenahrazuj vymyšleným textem. Odstraňují se až po schválení obsahu (viz kontrolní seznam).
- `<meta name="robots" content="noindex">` zůstává, dokud uživatelka neřekne, že se stránka zveřejňuje.

## Jak postupovat při úpravě

1. Přečti si `index.html` a tento soubor. Shrň uživatelce jednou větou, co budeš dělat.
2. Dělej **malé změny po jedné**; po každé řekni, co jsi změnila/změnil a kde (název sekce).
3. Po úpravě textu `python tvorba-bloku.py` (pokud se používá WordPress blok).
4. Ověř vzhled: otevři `index.html` v prohlížeči (nebo `python -m http.server` ve složce a otevři `http://localhost:8000`), zkontroluj počítač i mobil.
5. Před nasazením nic nemaž a nepřepisuj existující stránky webu; složka `audity` se jen přidává.

## Když si nejsi jistá/jistý

Zeptej se. Raději jednu otázku navíc než vymyšlený text na webu firmy.
