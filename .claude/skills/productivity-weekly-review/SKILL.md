---
name: productivity-weekly-review
description: Spustí kompletní týdenní review — GTD kroky 1–11 + ritual reflexe a výhledu. Trigger: "weekly review", "reflexe týdne", "priorities na příští týden", "shrnutí týdne".
---

# productivity-weekly-review

Tento skill pokrývá **celé týdenní review** — GTD kroky 1–11 i následný ritual.

Tok: GTD čištění → look back → reflect → process → look forward → uložit.

Cílový čas: ~45–60 minut celkem.

---

## First-run check

Před čímkoliv jiným: hledej `config.json` ve složce tohoto skillu.

- **config.json neexistuje nebo chybí pole:** spusť First-run onboarding.
- **config.json existuje a je kompletní:** začni GTD kroky bez ptaní.

---

## GTD kroky 1–10 (vždy první, bez ptaní)

Projdi kroky jeden po druhém. Po každém kroku krátce shrň co bylo a přejdi dál. Po kroku 11 přejdi automaticky na Rituál.

1. [[master-dashboard]] — rychlý přehled: co má next action, co nemá, co čeká
2. `projects/` — každý projekt: živý nebo do someday/archive? Next action aktuální?
3. [[next-actions]] — manuální sekce: hotové smazat, zbývající stále akční?
4. [[waiting-for]] — přišla odpověď? Blíží se follow-up?
5. [[someday-maybe]] — projdi položku po položce: posunulo se něco do akce? Co je mrtvé? Každou věc aktivně zvažuj, neprojíždět jen "nechat."
6. [[omnibus]] — zpracovat zachycené položky
7. `areas/` — aktivní projekty v každé oblasti aktuální?
8. Zettelkasten — `#zettel` tasky: relevantní pro aktuální seminárku nebo bakalářku? Zároveň zkontroluj přírůstky do knihovny "knihy a články" (Google Disk) — viz [[knihovna-disk-checklist]] pole `posledni_kontrola`, postup a Drive dotaz podle CLAUDE.md sekce Pravidelné revize. Po kontrole aktualizuj `posledni_kontrola` na dnešní datum/čas, i když nejsou žádné nové soubory.
9. **tadylenka Notes fronta** — otevřít [[notes-candidates]]: projít kandidáty, vybrat co postovat (naformátovat jako hotovou Note), zbytek smazat nebo ponechat
10. Note Inbox review — spustit `/note-inbox-review`
11. **Archivace dailies** — přesuň všechny soubory `daily/YYMMDD*.md` (denní plány i deníky) do měsíční podsložky `daily/YYYY-MM/` podle jejich měsíce, **kromě dnů otevřeného týdne** (pondělí aktuálního týdne až dnes) — ty zůstávají mimo měsíční složku, dokud týden neskončí. Vytvoř podsložku, pokud pro daný měsíc ještě neexistuje. Proveď automaticky, bez ptaní.

---

## First-run onboarding

Krátké uvítání:

> "Nastavíme weekly review skill — zabere to minutu. Část z Productivity Skills Pack."

Otázky:

1. **Složka pro review soubory.** Výchozí: `G:\Můj disk\vault\weekly-reviews\`

2. **Soubor s priorities na příští týden.** Výchozí: `G:\Můj disk\vault\gtd\next-week-priorities.md`

Uloži `config.json`:

```json
{
  "version": 1,
  "onboarded_at": "YYMMDD",
  "output": {
    "reviews_folder": "<absolutní cesta>",
    "next_week_priorities_file": "<absolutní cesta>"
  },
  "pack_integration": {
    "next_actions_file": "G:\\Můj disk\\vault\\gtd\\next-actions.md",
    "brain_dumps_folder": "G:\\Můj disk\\vault\\Brain Dumps\\",
    "areas_folder": "G:\\Můj disk\\vault\\areas\\",
    "waiting_for_file": "G:\\Můj disk\\vault\\gtd\\waiting-for.md"
  },
  "preferences": {
    "review_day": "Saturday"
  }
}
```

Potvrdit: "Nastaveno. Spustíme review teď?"

---

## Rituál

9 sekcí. Neprezentuj všechny najednou — jdi sekci po sekci, krátce shrň co proběhlo, pak přejdi dál. Pacing je součástí rituálu.

Okno = posledních 7 dní od dnešního dne.

### Sekce 1 — Zahájení

Nastav tón v 2-3 větách:

> "OK, týdenní review. Projdeme 9 sekcí — pohled zpátky, reflexe, zpracování, výhled. Asi 20 minut. Připravena?"

Počkej na potvrzení. Nezačínaj automaticky.

---

### Sekce 2 — Pohled zpátky: Co dostalo čas? (adaptace Goal Coverage)

*Tato sekce nahrazuje originální Sec 2 (MITs) a Sec 3 (Goal coverage), které vyžadují Daily Plan Builder a goals file, které nemáme.*

Přečti `areas/` složku — seznam oblastí: tadylenka, lcenglish, health, finances-admin, family, japanese, slepekure, studies.

Zeptej se přímo:

> "Které oblasti dostaly tento týden skutečný čas? (tadylenka, lcenglish, studies, japonština, zdraví, rodina...)"

Počkej na odpověď. Pak navrhni:
- Co bylo těžké nebo přetížené
- Co mohlo vypadnout bez povšimnutí

Nezmoralizuj — zanedbané oblasti mohou být záměrné. Jen povrchni a nech uživatelku rozhodnout.

Zachyť odpověď pro review soubor.

---

### Sekce 3 — Pohled zpátky: Opakující se témata z brain dumpů

Pokud je nakonfigurována `brain_dumps_folder`, seznam dump soubory z posledních 7 dní a přečti každý.

Skenuj sekce **Ideas**, **Decisions**, **Questions** (přeskoč Tasks — ty jsou v next-actions; přeskoč Notes — to je referenční materiál).

Vypovrchni:
- Věci, které vypadají jako by chtěly pozornost (Decision, který sedí nevyřešený; Question, na který je odpověď, jen o ní nepřemýšlela)
- Co se v dumpech opakuje

Formát:

```
Brain dump scan, posledních 7 dní:
- X dumpů
- Opakující se rozhodnutí: "..." (2 dumpy)
- Otázka, která má asi odpověď: "..."

Chceš něco z toho zpracovat, nebo posunout?
```

Pro každou položku: přidat do next-week priorities, přeformulovat a přidat do next-actions, zahodit, nebo odložit.

Přeskočit pokud brain dumps složka není nakonfigurována nebo je prázdná.

---

### Sekce 4 — Reflexe

2-3 reflektivní otázky, jednu po druhé. Nepaluj všechny najednou.

Výchozí sada (použij většinu týdnů):
1. **Co fungovalo dobře tento týden?** (Ne jen splněné úkoly — rozhodnutí, energie, prostředí, návyky.)
2. **Co nefungovalo?** (Systémy, plány, očekávání, které produkovaly třecí plochy.)
3. **Jedna věc, kterou chci příští týden jinak?**

Střídej s alternativními otázkami z `references/reflective-questions.md` každé 3-4 týdny.

Zachyť odpovědi doslova — to jsou jádro review souboru. Nepřeformuluj.

---

### Sekce 5 — Process: Stav waiting-for

Přečti [[waiting-for]] — to je kompletní přehled čekajících věcí.

Vypovrchni:
- Co má termín v příštích 7 dnech
- Co čeká na odpověď déle než 2 týdny

Formát:

```
Waiting for — přehled:
- Blíží se: [X] — deadline [datum]
- Čeká dlouho: [Y] — od [datum], bez odpovědi

Chceš někam poslat follow-up, nebo datum posunout?
```

---

### Sekce 6 — Process: Next-actions — manuální sekce

*Náš [[next-actions]] používá Tasks plugin query bloky — skill nemůže číst rozlišené tasky z query. Místo toho projdeme jen manuální sekce.*

Přečti [[next-actions]]. Skenuj jen manuální textové položky pod sekcemi `## @online`, `## @telefon`, `## @doma`, `## @venku/pochůzky` — ignoruj ` ```tasks ``` ` bloky.

Pro každou manuální položku:
> "Keep / Drop / Defer / Reframe?"

- **Keep** — nechat jak je
- **Drop** — smazat řádek
- **Defer** — přesunout do `## Odloženo` sekce dole v souboru
- **Reframe** — přepsat; zeptej se na nové znění

Po projití ulož upravený [[next-actions]].

Pokud jsou manuální sekce prázdné (všechno je v query blocích): přeskoč a řekni "Manuální sekce jsou prázdné — query bloky spravuje Tasks plugin automaticky."

---

### Sekce 7 — Výhled: Kalendář příští týden

Pokud je dostupný calendar connector (MCP), načti události na příštích 7 dní. Vypovrchni:
- Celkový počet schůzek/bloků
- Co vyžaduje přípravu (prezentace, důležité hovory, rozhodnutí)
- Volná okna pro hlubokou práci (delší neblokované úseky)

Formát:

```
Příštích 7 dní v kalendáři:
- X schůzek/bloků
- Vyžaduje přípravu: "..." 
- Volná okna: [den] [čas] ([délka])

Chceš na něco upozornit nebo připravit dopředu?
```

Zachyť prep poznámky pro review soubor.

Pokud calendar connector není dostupný: přeskoč sekci.

---

### Sekce 8 — Výhled: Priority příštího týdne

**Před touto sekcí — strategické podklady:**

Priorita je strategická orientace, ne seznam urgentních tasků. Urgentní věci se postarají samy. Cílem je identifikovat důležité-neurgentní věci, které mají v tomto týdnu příležitost.

Před tím, než položíš otázku na priority, proveď:
1. **Přečti dailies** za období od posledního review (max 10 souborů z `daily/`). Hledej: co se strategicky řešilo, jaká rozhodnutí padla, co má momentum, co se ztratilo.
2. **Přečti projects/** a **areas/** — ne jen "má next action?", ale: jak si projekt stojí v celém kontextu? Jaký je směr? Co čeká na rozhodnutí? Co je zablokované?
3. **Nabídni vlastní hodnocení** — řekni co vidíš a proč to považuješ za podstatné. Uživatelka pak opraví nebo doplní.

Zeptej se přímo:

> "Na co chceš příští týden orientovat? Jaké jsou 3-5 priorit, kolem kterých chceš týden postavit?"

Počkej na odpověď. Pokud jich je víc než 5, zatlač zpět:
> "To je hodně — co jsou 3, kdybys musela vybrat?"

Zapiš do `output.next_week_priorities_file` pomocí šablony v `assets/priorities-template.md`. **Přepiš** soubor (nepřidávej) — každý týden začíná čistý.

**Po zapsání priorit — bloky do kalendáře (povinný krok):**

Pro každou prioritu vytvoř blok v Google Kalendáři (Todoist kalendář, ID: `d0cf3065decc1cb2fe038fcefe927aa76e4896534f469afa6667eadbfb891110@group.calendar.google.com`, barva Sage / colorId "2"). Bloky od 11:00. Před vytvořením každého bloku potvrď čas s Lenkou — nenavrhuj sloty v minulosti, respektuj schůzky z kalendáře.

---

### Sekce 9 — Uložit a zavřít

Sestav review soubor podle šablony v `assets/review-template.md`. Vyplň každou sekci, která proběhla. Vynech sekce, které byly přeskočeny — nechávej prázdné nadpisy.

Ulož do `{reviews_folder}/{YYMMDD}-week-review.md` (YYMMDD = dnešní datum).

Vytiskni závěrečné shrnutí:

```
Týdenní review uložen → {cesta}
Manuální next-actions: {N} zachováno, {N} smazáno, {N} odloženo, {N} přepsáno.
Priority příštího týdne zapsány → {cesta}

Hotovo. Dobrý týden.
```

Konec. Nepokračuj v mluvení.

---

## Graceful failures

- **Soubory nenakonfigurovány nebo neexistují:** přeskoč postiženou sekci, krátce řekni, pokračuj. Skill funguje i bez integrace — stane se čistě reflexivním review.
- **Calendar connector nedostupný:** přeskoč Sekci 7.
- **Uživatelka chce přerušit uprostřed:** zapiš co bylo zodpovězeno, ulož částečný review soubor s poznámkou `⚠ Nedokončeno — přerušeno u Sekce X`, konec čistě.

---

## Referenční soubory

- `assets/review-template.md` — struktura weekly review souboru
- `assets/priorities-template.md` — šablona priorities souboru
- `references/ritual-structure.md` — hlubší zdůvodnění každé sekce, načíst pokud potřebuješ
- `references/reflective-questions.md` — alternativní reflektivní otázky pro střídání
