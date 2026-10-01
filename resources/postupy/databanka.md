# Postup: Databanka AI

Databanka = **jediný rejstřík všech AI nástrojů a materiálů** i jejich hodnocení: nainstalované skilly (GrowOS, Jon Benson, Impeccable, UI/UX Pro Max, Productivity Pack, Anthropic, vlastní), napojené služby a aplikace, stažené tutoriály, pluginy, prompty a obrázkové sady z kurzů. Od 260929 (dřív jen stažené materiály). Pro Lenku: [[Průvodce Databankou]]. Cíl: využít je pro sebe a znát obsah (při práci simulujeme solopodnikatele, pro kterého jsou určené; hodí se pro [[digistart]], Evident, lcenglish, tadylenka a konzultace).

## Kde co je

- **Soubory:** `G:\Můj disk\Databanka AI\<Zdroj> <YYMMDD stažení>\` (mimo vault). Každý zdroj má ve své složce `00 REJSTRIK…md`.
- **Mapa ve vaultu:** `resources/databanka/<Zdroj>/`, jedna krátká poznámka na položku (předpona zkratkou zdroje, např. `ABM – `). Tabulka: `resources/databanka/Databanka.base` (pohledy podle projektu, „Neprozkoumáno“, „Pro mě“).
- Přehledy knihoven: [[AI Black Magic – přehled knihovny 260927]].

## Kde je hodnocení (260929)

Hodnocení nástrojů (stav, verdikt, Poznámky z použití) se píše **jen do Databanky**. [[katalog-moznosti]] je čtivé menu podle výsledku bez hodnocení, [[katalog-ochutnavky]] je pořadí zkoušení a výsledek ochutnávky jde sem. Notion Skills slouží jen ke čtení textu skillů: synchronizace při „zavírám“ zatím běží, **zmrazí se, až Lenka potvrdí, že se v Databance orientuje**.

## Vlastnosti poznámky

```yaml
databanka: true
zdroj: AI Black Magic
typ: plugin | skill | tutoriál | prompty | obrázkové prompty | nainstalovaný skill | konektor | aplikace
rok: 2026
pro: [DigiStart, Evident, lcenglish, tadylenka, konzultace, vlastní]
tema: [automatizace, sociální sítě, e-mail, video, obrázky, …]
pouzij_kdyz: "konkrétní situace, kdy to otevřít"
stav: neprozkoumáno | prohlédnuto | použito
nainstalovano: ano | ne
verdikt: "" | ponechat | skrýt | vyřadit   # rozhoduje Lenka, Claude navrhne
spousteni: "/jméno nebo 'stačí říct'"     # jen u nainstalovaných
soubor: "Databanka AI/…/cesta"
```
Tělo: `# Název`, „Použij, až:“, jedna věta popisu, odkaz `[Otevřít soubor](<file:///…>)`, „Poznámky z použití:“. Položky se sdružují rozumně: jeden soubor promptů = jedna poznámka, ne každý prompt zvlášť.

## Tři spouštěče (Claude dělá automaticky)

1. **Začátek většího úkolu** (lekce DigiStartu, newsletter, podklad pro Evident, nový typ obsahu): grep `resources/databanka/` podle tématu. Když něco sedí, jedna věta: „K tomu je v databance X.“ Když nic, mlčet.
2. **„Zavírám“:** porovnat, co se v sezení dělalo, s databankou. Max. 1–3 shody → do daily sekce **Z databanky** (i u věcí, které už děláme po svém: „strukturovaně popsané v X“). Žádná shoda = nic nepsat.
3. **Weekly review:** nabídnout jednu položku ve stavu `neprozkoumáno` na seznámení (střídat zdroje a typy).

**Stav:** když Lenka položku otevře → `prohlédnuto`; když se podle ní reálně pracovalo → `použito` + krátká poznámka do „Poznámky z použití“. Při „zavírám“ Claude posune na `použito` i nainstalované nástroje, které se v sezení reálně použily.

**Verdikt → nastavení Claude Code:** `skrýt` / `vyřadit` = skill se skryje v `~/.claude/settings.json` (`skillOverrides`, hodnota `user-invocable-only` → popis nezabírá místo v seznamu skillů, lomítkem jde spustit dál). Nic se nemaže. Důvod: seznam skillů má rozpočet ~1 % kontextu; když přeteče, nejméně používané skilly ztratí popis a přestanou se spouštět samy (260929 v sezení GrowOS ~25 ze 73 bez popisu).

**Cíl: méně skillů (261001).** Nové know-how přednostně jako postup v `resources/postupy/` s řádkem v tabulce v `CLAUDE.md`, ne jako nový skill. Skill jen tam, kde je potřeba mimo vault nebo k předání. Třídění stávajících skillů probíhá přes verdikty.

**Originály skillů:** `G:\Můj disk\Databanka AI\Originály skillů 260929\` = neupravovaný snímek všech skillů (popis původu v `00 CO TU JE.md`). **Před první úpravou skillu od někoho jiného ho Claude nejdřív zkopíruje sem** (pokud tam ještě není). Pro DigiStart vycházet z originálu, ne z naší upravené kopie. (260929)

**Nový nainstalovaný nástroj** (skill, konektor, aplikace) → nová poznámka do `resources/databanka/<Zdroj>/` (generátor `resources/databanka/gen_nastroje.py` — doplnit nástroj do seznamu a spustit; existující poznámky nepřepisuje).

## Přidání nového zdroje

1. Stáhnout do `G:\Můj disk\Databanka AI\<Zdroj> <YYMMDD>\`, udělat `00 REJSTRIK`.
2. Vytvořit poznámky v `resources/databanka/<Zdroj>/` se stejnými vlastnostmi (skriptem, ne ručně).
3. Řádek do tabulky zdrojů níže.

| Zdroj | Staženo | Položek | Složka |
|---|---|---|---|
| AI Black Magic | 260927 | 147 | `Databanka AI/AI Black Magic 260927` |
| Nainstalované nástroje (skilly, konektory, aplikace) | 260929 | 137 | složky `GrowOS/`, `Jon Benson/`, `Impeccable/`, `UI-UX Pro Max/`, `Productivity Pack/`, `Anthropic/`, `Vlastní/`, `Služby a aplikace/` (jen mapa, soubory jsou nainstalované) |
| Anthropic Academy | 260929 | 1 (kurz Introduction to Agent Skills, 6 lekcí) | `Databanka AI/Anthropic Academy 260929` |
| BNSN Community (Jon Benson) | 261001 | 1 (kurz $10M Sales Page Audit, 9 videolekcí; poznámky z přepisů, přílohy nejsou) | `Databanka AI/BNSN Community 261001` |

Kurzy Anthropic Academy (a podobné online kurzy s přihlášením): Claude čte lekce v Lenčině Chromu (claude-in-chrome), jen čte, nic neodklikává. Do složky zdroje ukládá **strukturované poznámky vlastními slovy** (jeden soubor na lekci, odkaz na originál v hlavičce), ne doslovný přepis. Do vaultu jde **jedna poznámka za kurz** s oddílem „Jak to vysvětlit“, kde jsou příklady z Lenčina vlastního systému. (260929) Videokurzy bez textu (např. BNSN Community): přepisy se čtou z „Show transcript“ pod videem. Když má kurz sloužit jako pracovní metoda, vzniká navíc postup v `resources/postupy/` a řádek v tabulce v `CLAUDE.md` (261001, [[resources/postupy/prodejni-stranky]]).

## Kdy se vrátit k Supabase (rozhodnuto 260927)

Zůstáváme u Obsidian Bases. K databázi (Supabase s významovým vyhledáváním) se vrátit, když nastane **kterékoli** z tohoto:
- databanka přesáhne **500 poznámek**,
- Claude při „zavírám“ nebo na začátku úkolu opakovaně **mine** relevantní položku, protože hledání podle slov nestačí (např. téma je popsané jinými slovy),
- bude potřeba hledat v **plném textu** materiálů (desítky MB tutoriálů), ne jen v mapě.

Mezikrok před Supabase: nahrát rejstříky do notebooku v NotebookLM (už napojený) a ptát se ho na významové shody. Kontrolu počtu dělá Claude při weekly review (`ls resources/databanka -R | wc -l`).
