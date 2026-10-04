# AI Agent Skills for Leaders (studijní poznámky + doporučení, co číst)

**Zdroj:** [Coursera – AI Agent Skills for Leaders](https://www.coursera.org/learn/agent-skills) — Dr. Jules White, Vanderbilt (4 moduly, podle Coursery ~6 h, 5 hodnocených úkolů, aktualizováno 5/2026, 4,8 hvězdy)
**Přístup:** trial Coursera Plus (zdarma do 11. 10. 2026, zrušit nejpozději 10. 10. → [[waiting-for]]). Projekt: [[claude-academy]]. Související kurz: [[coursera-build-anything-with-ai]].
**Poznámky jsou zhuštění vlastními slovy (261004), ne přepis.** U každé lekce je odkaz na originál. Přečetla jsem všech 40 položek (25 videí, 9 čtení); 5 hodnocených úkolů a jedna „coach“ položka (konverzace s AI) se nestahují, jejich zadání proto neznám.

Použij, až budeš řešit: jak postavit dobrý skill (struktura, co do něj dát, jak ho opravovat), jak vysvětlit skilly někomu bez programátorských znalostí (DigiStart), nebo jak z věcí, které s AI děláš pořád dokola, udělat opakovatelný postup.

## Stručný verdikt (návrh, rozhoduješ ty)

- **Nové oproti tomu, co už znáš** (Anthropic Academy Introduction to Agent Skills + vlastní skilly ve vaultu): hlavně **metoda RECIPE** (modul 4) a **vzorec kontextových preferencí** (modul 4, poslední lekce). To je opravdu užitečný rámec, jak psát a opravovat skilly. Dále **„luxusní výstupy“ a rámec ELITE** (modul 2): co má skill dodat, aby výsledek nebyl text v chatu, ale hotový výstup.
- **Spíš opakování:** modul 1 (co je skill, první skill ručně v editoru), většina modulu 3 (SKILL.md, složky scripts/references/assets, Markdown). Pokud jsi prošla Anthropic Academy, je to totéž jinými slovy, jen pro ChatGPT a bez příkazové řádky.
- **Rozdíl proti Academy:** kurz je psaný pro lidi bez programování, ukazuje to v ChatGPT i Claude (webový editor skillů a „skill creator“), ne v kódovém prostředí. Pro vysvětlování DigiStartu je to vhodnější než Academy.
- **Úkoly:** hodnotí je AI, jsou k tomu, aby sis skill vytvořila a vyzkoušela. Pro tebe jsou zbytečné, pokud nechceš certifikát.

### Co číst, když chceš ušetřit čas (cca 2 h místo 6)
1. **Modul 4 celý** (RECIPE, 9 videí, ~1 h): lekce 30–39 níže.
2. **Modul 2, čtení „Luxury Outputs for Every Task“ (ELITE) a „Amazing Luxury Outputs to Put in Skills“** (15 min): seznam typů výstupů je použitelný jako menu při zadávání skillů.
3. **Modul 3, videa Assets a References** (2 × cca 8 min): odpovídá našemu `resources/postupy/` (references) a šablonám (assets); zbytek modulu 3 přeskočit.
4. **Modul 1 a 2:** jen texty skillů ke čtení (Dashboard It, File Organizer, plánovací dashboard). Jsou pod licencí CC BY 4.0, tedy se smí použít s uvedením zdroje (viz poznámka u modulu 2).

Jinak můžeš celé moduly 1 a 3 přeskočit a modul 2 vzít jen ve čtení.

## Co z kurzu vzít pro náš systém (návrh)

- **RECIPE jako kontrolní seznam při psaní/opravě skillu** (Requests, Environment, Concrete steps, Ideal result, Presentation, Examples): zkusit ho přiložit k postupu `resources/postupy/hlasy.md` a k tvorbě hlasových profilů; vzorec kontextových preferencí (modul 4, lekce 39) přesně odpovídá tomu, co děláme u psaní za Lenku podle kontextu (e-mail, článek, newsletter).
- **Oprava skillu podle typu chyby** (modul 4, lekce 38) je rychlá pomůcka i pro naše skilly: chybí krok → úprava kroků; špatný vzhled či úvaha → přidat příklad; obecný tón → upravit ideální výsledek; mechanické výpočty → skript; skill přerostl → vyndat do references.
- **Nápad, jak najít skilly k vytvoření:** nechat AI projít paměť a navrhnout opakující se úkoly (lekce 17); platí jen tam, kde už přesně víš, co chceš (jinak skill „zamkne“ jeden způsob a ztratíš objevování).
- **Pro DigiStart:** rozlišení „text v chatu vs. hotový výstup (dashboard, zip, CSV)“ je pěkný vysvětlující příklad pro začátečnice. Připojit k [[digistart-podklady]] Blok S.

## Poznámky po modulech

- [[agent-skills-modul-1]] — Co jsou AI agent skills? (lekce 1–10)
- [[agent-skills-modul-2]] — Skilly s velkou hodnotou, „luxusní výstupy“ (lekce 11–20)
- [[agent-skills-modul-3]] — Anatomie skillu (lekce 21–29)
- [[agent-skills-modul-4]] — Metoda RECIPE (lekce 30–40)

Soubory jsou ve složce `resources/coursera-agent-skills-for-leaders/`.
