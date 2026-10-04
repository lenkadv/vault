# Modul 3 — The Anatomy of a Skill (poznámky po lekcích)

Součást: [[coursera-agent-skills-for-leaders]] · [Kurz online](https://www.coursera.org/learn/agent-skills) · ~1 h · Poznámky vlastními slovy (261004), ne přepis.
**Pro tebe většinou opakování z Anthropic Academy** (Introduction to Agent Skills); nové jsou hlavně příklady a metafory (a příklady pro assets).

## 21. Anatomie skillu (video)
[Lekce](https://www.coursera.org/learn/agent-skills/lecture/SQ4uI/the-anatomy-of-a-skill)

Skill je **složka** pojmenovaná podle skillu (např. `expense-reports`), kterou zazipuješ a předáš AI. Uvnitř: soubor **`SKILL.md`** (jádro, instrukce; odpovídá Wordovému dokumentu z modulu 1, jen ho nemusíš pokaždé nahrávat) a tři volitelné podsložky: **`scripts/`** (kód a nástroje, které může agent spouštět), **`references/`** (doplňující materiály, které si agent přečte, jen když je potřebuje; např. „při mezinárodní cestě čti průvodce“) a **`assets/`** (šablony, data, hotové polotovary, např. téměř dokončený dashboard).

## 22. Soubor SKILL.md (video)
[Lekce](https://www.coursera.org/learn/agent-skills/lecture/fkhh8/the-skill-md-file-instructions-context-for-your-ai-agent)

Je to textový soubor ve formátu **Markdown**. Nahoře je **front matter** (obalený třemi pomlčkami): `name:` a `description:`. Metafora: strana s právy v knize, popisuje obsah, ale není jeho součástí. Pod tím je **tělo**: instrukce (manuál). Nejjednodušší skill = front matter + tělo uložené jako `SKILL.md`, ve složce, zazipované. Důležitá je jednotná struktura; agent čte rád stejně formátované informace.

## 23. Úvod do Markdownu (čtení)
[Lekce](https://www.coursera.org/learn/agent-skills/supplement/NcVFE/markdown-primer)

Markdown = prostý text s jednoduchou symbolikou: `#` / `##` / `###` nadpisy, `**tučně**`, `*kurzíva*`, `-` odrážky, `1.` číslovaný seznam, `[text](odkaz)` odkaz, front matter na začátku souboru. I bez formátování je text čitelný; skill funguje i v obyčejném textu, Markdown jen pomáhá lidem.

## 24. Scripts: nástroje pro AI agenta (video)
[Lekce](https://www.coursera.org/learn/agent-skills/lecture/WQGQM/scripts-tools-for-your-ai-agent)

Složka `scripts/` je pro kód, kterým agent dělá to, v čem AI není nejsilnější: **velké objemy dat, přesné výpočty, hromadné přejmenování, napojení na systémy** (databáze, CRM, kalendář). Agent s nástrojem je jako zaměstnanec s manuálem i počítačem. Metafora: používání nástrojů je projev inteligence (šimpanzi a stébla trávy). Nástroje si skill vezme s sebou: „tady je postup a tady skript, kterým odešleš vyúčtování“.

## 25. Programování s AI pro skripty (video)
[Lekce](https://www.coursera.org/learn/agent-skills/lecture/At4NX/ai-coding-for-building-scripts)

Skripty **nemusíš psát sama**: AI je v psaní kódu výborná. Zadání: „napiš Python skript, který vezme CSV s výdaji (jméno, dodavatel, částka, datum, kategorie) a vytvoří graf podle kategorie a dodavatele“; čím podrobněji a čím víc příkladů reálných souborů, tím lépe. Pak: stáhnout skript do `scripts/` (nebo „zabal to do skillu přes skill creator“) a nechat AI napsat **návod k použití** do `SKILL.md` („pokud potřebuješ X, přečti tyto instrukce“). Alternativa: v konverzaci s AI vyřešit úlohu s reálným souborem, nechat napsat skript, vyzkoušet a nakonec „zabal to do skillu“.

## 26. Assets: data, šablony a další pro agenta (video)
[Lekce](https://www.coursera.org/learn/agent-skills/lecture/BbKEi/assets-data-templates-and-more-for-the-ai-agent-to-work-with)

Podle autora **nejvíc podceněná část skillu**. Dává agentovi **polotovar**: šablonu, prázdné CSV s hlavičkou, tabulku k vyhledávání (např. sazby podle regionu), databázi, nebo hotový dashboard, který stačí doplnit daty. Proč: AI nezačíná od nuly, výstup je **konzistentnější a levnější** (méně tokenů), a vypadá pokaždé stejně. Příklad: dashboard, který si autor nechal v konverzaci doladit, stáhl a uložil do assets; instrukce říkají jen „doplň data této cesty“.

## 27. Assets a luxusní výstupy (čtení)
[Lekce](https://www.coursera.org/learn/agent-skills/supplement/OnOYs/assets-luxury-outputs)

Do assets ukládej výstupy, které jsou výjimečně dobré a které chceš zopakovat: **přesný formát požadovaný organizací, dashboard, rozvržení**. Dvě použití: (1) **téměř přesná kopie** („vytvoř dashboard přesně v tomto formátu, jen zaktualizuj data nahoře“), (2) **inspirace pro variace** („vytvoř dashboard podle tohoto, zachovej barvy a typy vizualizací“). Můžeš mít víc vzorů najednou, každý je jedna verze „výborného“. Zásada: když uvidíš výstup, který je opravdu skvělý, ulož ho.

## 28. References: kontextová hloubka a příklady (video)
[Lekce](https://www.coursera.org/learn/agent-skills/lecture/853ks/references-contextual-depth-patterns-examples-for-the-ai-agent)

`SKILL.md` je jako **úvod manuálu**, který se čte vždy; ostatní kapitoly (references) agent otevře, jen když je potřeba (např. tuzemské vs. zahraniční cesty, pravidla pro taxi vs. letenky). Důvody: nezaplňovat kontext a mít podrobnosti pro varianty úkolu. **Nejsilnější použití: příklady správných výstupů** — učit příkladem je často snazší než popsat každé pravidlo (jako byste popisovala styl Tolstého).

## 29. Exploring Luxury Outputs (hodnocený úkol)
Zamčeno v kurzu, nestaženo.
