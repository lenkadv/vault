# Postup: Databanka AI

Databanka = tutoriály, skilly, pluginy, prompty a obrázkové sady z kurzů a knihoven, ke kterým má Lenka přístup. Cíl: využít je pro sebe a znát obsah (při práci simulujeme solopodnikatele, pro kterého jsou určené; hodí se pro [[digistart]], Evident, lcenglish, tadylenka a konzultace).

## Kde co je

- **Soubory:** `G:\Můj disk\Databanka AI\<Zdroj> <YYMMDD stažení>\` (mimo vault). Každý zdroj má ve své složce `00 REJSTRIK…md`.
- **Mapa ve vaultu:** `resources/databanka/<Zdroj>/`, jedna krátká poznámka na položku (předpona zkratkou zdroje, např. `ABM – `). Tabulka: `resources/databanka/Databanka.base` (pohledy podle projektu, „Neprozkoumáno“, „Pro mě“).
- Přehledy knihoven: [[AI Black Magic – přehled knihovny 260927]].

## Vlastnosti poznámky

```yaml
databanka: true
zdroj: AI Black Magic
typ: plugin | skill | tutoriál | prompty | obrázkové prompty
rok: 2026
pro: [DigiStart, Evident, lcenglish, tadylenka, konzultace, vlastní]
tema: [automatizace, sociální sítě, e-mail, video, obrázky, …]
pouzij_kdyz: "konkrétní situace, kdy to otevřít"
stav: neprozkoumáno | prohlédnuto | použito
soubor: "Databanka AI/…/cesta"
```
Tělo: `# Název`, „Použij, až:“, jedna věta popisu, odkaz `[Otevřít soubor](<file:///…>)`, „Poznámky z použití:“. Položky se sdružují rozumně: jeden soubor promptů = jedna poznámka, ne každý prompt zvlášť.

## Tři spouštěče (Claude dělá automaticky)

1. **Začátek většího úkolu** (lekce DigiStartu, newsletter, podklad pro Evident, nový typ obsahu): grep `resources/databanka/` podle tématu. Když něco sedí, jedna věta: „K tomu je v databance X.“ Když nic, mlčet.
2. **„Zavírám“:** porovnat, co se v sezení dělalo, s databankou. Max. 1–3 shody → do daily sekce **Z databanky** (i u věcí, které už děláme po svém: „strukturovaně popsané v X“). Žádná shoda = nic nepsat.
3. **Weekly review:** nabídnout jednu položku ve stavu `neprozkoumáno` na seznámení (střídat zdroje a typy).

**Stav:** když Lenka položku otevře → `prohlédnuto`; když se podle ní reálně pracovalo → `použito` + krátká poznámka do „Poznámky z použití“.

## Přidání nového zdroje

1. Stáhnout do `G:\Můj disk\Databanka AI\<Zdroj> <YYMMDD>\`, udělat `00 REJSTRIK`.
2. Vytvořit poznámky v `resources/databanka/<Zdroj>/` se stejnými vlastnostmi (skriptem, ne ručně).
3. Řádek do tabulky zdrojů níže.

| Zdroj | Staženo | Položek | Složka |
|---|---|---|---|
| AI Black Magic | 260927 | 147 | `Databanka AI/AI Black Magic 260927` |

## Kdy se vrátit k Supabase (rozhodnuto 260927)

Zůstáváme u Obsidian Bases. K databázi (Supabase s významovým vyhledáváním) se vrátit, když nastane **kterékoli** z tohoto:
- databanka přesáhne **500 poznámek**,
- Claude při „zavírám“ nebo na začátku úkolu opakovaně **mine** relevantní položku, protože hledání podle slov nestačí (např. téma je popsané jinými slovy),
- bude potřeba hledat v **plném textu** materiálů (desítky MB tutoriálů), ne jen v mapě.

Mezikrok před Supabase: nahrát rejstříky do notebooku v NotebookLM (už napojený) a ptát se ho na významové shody. Kontrolu počtu dělá Claude při weekly review (`ls resources/databanka -R | wc -l`).
