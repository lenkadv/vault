# HANDOFF – tadylenka globální audit a strategie

Tenhle soubor je určený k otevření v **novém, samostatném vlákně** Claude Code (ne pokračování dnešního vlákna z 260804 — to bylo nabité detaily kolem kadence a přejmenovávání, tohle je jiný typ práce). Přečti nejdřív celý, pak soubory v sekci "Kde začít".

## Kontext — proč tenhle audit vzniká

Lenčina vlastní formulace (260804): *"koukala jsem, co máme v obsidianu, a je to naprosto nepřehledná změť různých záznamů, ve které se nejde vyznat. což odpovídá tomu, že ani já, ani ty nevíme, co a jak chceme vlastně dělat."*

Dnešní vlákno (260804, blok plánovaný na 14:30–16:00 v [[gtd/next-week-priorities]]) mělo původně vyřešit jen "vyjasnit kadenci a zahájit Cyklus C" — jednu drobnou next-action, co visela nevyřešená od 260620 (přes měsíc, opakovaně odsouváno v denních plánech). Ukázalo se ale, že jde o symptom většího problému: dokumentace (kadence, formáty) se rozešla s realitou, tracking (Aktuální stav v projektovém souboru) byl neaktuální, pojmenování (Cyklus A/B/C/D) přidávalo zbytečnou kognitivní zátěž a content-ideas.md má 869 řádků nezpracovaných nápadů, zatímco "Ready to Write" je prázdná.

Dnešní vlákno vyřešilo **mechaniku** (viz níže), ne **strategii**. Otevřená otázka, kterou má řešit tenhle handoff: co tadylenka vlastně je, pro koho, s jakou prioritou vůči ostatním projektům, a jaká struktura záznamů v Obsidianu to má odrážet — tohle dnešní vlákno záměrně nechalo netknuté, protože je to jiný typ práce (širší rozvaha, ne oprava).

## Co je už hotové a nastavené (nerozporovat bez důvodu)

Tyhle věci se dnes rozhodly a zapsaly — audit by je měl brát jako výchozí stav, ne od nuly přehodnocovat, pokud se při procházení neukáže konkrétní důvod je změnit:

- **Kadence je cílové tempo za kvartál, ne termín na položku.** Substack článek / IG carousel střídavě á 14 dní, Notes 3× týdně — ale plní se dávkovými content sprinty do volných oken, ne rovnoměrně. Viz [[projects/tadylenka-publishing]] sekce Kadence a Sezónní kalendář.
- **Formát je IG carousel, ne Reel.** Reel byl v dokumentaci historický pozůstatek, reálně se nepoužívá (karusely > reely, viz [[lessons]]). Opraveno v [[GrowOS/tadylenka/howto-publishing]] a CLAUDE.md.
- **Pojmenování běhů bez písmenek.** Žádné "Cyklus A/B/C/D" — každý běh má popisný název + datum (např. "IG carousel — Bastille Day (260713)"). Písmenka nenesla informaci a nutila si pamatovat mapování.
- **lcenglish není fungující zdroj příjmu**, i když je tak v [[gtd/goals]] popsaný (anchor). Reálně nejblíž příjmu jsou teď face-to-face školení/konzultace (GNOSTIKA/FEKT audit, případně Michal Šedivý). Tohle je důležitý kontext pro jakoukoli úvahu o tom, kolik času/priority má tadylenka dostat vůči ostatním projektům — viz [[project_income_reality_lcenglish_vs_consulting]] (paměťový soubor).

## Co zůstává otevřené — skutečný úkol tohohle vlákna

Audit + strategie, přibližně v tomhle pořadí:

1. **Audit skutečného stavu.** Projít `GrowOS/tadylenka/` celé (brand.md, lessons.md, content-ideas.md, notes-candidates.md, audiences/, inspiration/, swipe-files/, output/, research/, inbox-uležet.md, tadylenka-inbox.md) + [[areas/tadylenka]] + [[projects/tadylenka-publishing]]. Sepsat: co tam reálně je, co si odporuje, co je mrtvé/neaktuální, co je duplicitní. Nedomýšlet, nezaplňovat mezery vlastní interpretací — jen zmapovat, co je.
2. **Ujasnit positioning a cíl.** Co tadylenka je (hlas spolužáka, ne profesora — viz [[areas/tadylenka]] úvodní věta), pro koho, a hlavně: má se to teď posouvat směrem k příjmu (viz [[gtd/goals]] — "Posun fokus z angličtiny na art history jako zdroj příjmu") a co to prakticky znamená pro formáty/kadenci/prioritu.
3. **Rozhodnout strukturu záznamů.** content-ideas.md se 869 řádky Quick Capture je součást problému — potřebuje buď systém pravidelného tříbení, nebo jinou strukturu úplně. Podobně notes-candidates.md (91 řádků fronty).
4. **Promítnout rozhodnutí zpět do souborů** — brand.md (po odsouhlasení s Lenkou, GrowOS pravidlo: nikdy needitovat brand.md bez explicitního souhlasu), lessons.md, případně restrukturalizace celé složky.

## Důležité poučení z dnešního vlákna

- **Nevěřit "Aktuální stav" v projektovém souboru bez ověření.** Byl neaktuální (chyběl publikovaný Bastille Day carousel) — reálný stav zjišťovat z více zdrojů (Substack, IG, Lenčino potvrzení), ne jen ze zápisu.
- **Postupovat po krocích a nechat Lenku potvrzovat směr**, ne rovnou navrhnout kompletní restrukturalizaci. Dnešní vlákno fungovalo na principu: diagnóza → nabídnout možnosti (AskUserQuestion) → potvrdit → teprve pak editovat soubory.

## Kde začít

1. [[areas/tadylenka]], [[projects/tadylenka-publishing]] — rychlý přehled
2. `GrowOS/tadylenka/brand.md`, `lessons.md` — hlas a pravidla
3. `GrowOS/tadylenka/content-ideas.md` — rozsah backlogu (966 řádků, dlouhé)
4. `GrowOS/tadylenka/notes-candidates.md`, `inbox-uležet.md`, `tadylenka-inbox.md` — další fronty, co čekají na zpracování
5. Zeptat se Lenky přímo: co si myslí, že tadylenka je za rok? Co ji na současném stavu nejvíc štve?
