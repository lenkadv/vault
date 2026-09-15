---
name: productivity-daily-plan
description: Sestaví denní plán — 2–3 nejdůležitější úkoly (MITs) s časovými bloky, zbytek flexibilně. Čte Google Kalendář, prohledá projects/ a GrowOS/ pro #next-action tasky a zkontroluje týdenní priority. Uloží plán jako sekci nahoře v daily/YYMMDD.md (jeden soubor pro celý den). Spusť při: "plan my day", "denní plán", "naplánuj mi den", "co mám dnes dělat", "otevírací rituál", "s čím začít", "co je dnes na pořadu".
---

# productivity-daily-plan

Skill sestaví denní plán metodou Hybrid MIT: 2–3 nejdůležitější úkoly s časovými bloky v peak focus okně, ostatní jako flexibilní seznam. Pracuje s tím, co je v kalendáři, projektech a týdenních prioritách — nestaví od nuly.

Vault-specifické chování:
- Tasky čte přímo z `projects/` a `GrowOS/` (hledá `#next-action`), ne z `next-actions.md`
- Jeden soubor na den: `daily/YYMMDD.md`. Plán je sekce nahoře v dokumentu, zbytek dne (Průběh dne, Systémové změny) se doplňuje pod ni — žádný samostatný `-plan.md`
- Google Kalendář dostupný přes MCP (kalendář: lnk.dvorakova@gmail.com)
- Lenka je odpolední typ — dopoledne jen rituály, hluboká práce od 11:00 výš
- Pracovní bloky na týden jsou nastavené z weekly review — denní plán je upřesňuje, nevytváří od nuly

## Kontrola při spuštění

Před čímkoli jiným zkontroluj `config.json` ve složce tohoto skilu.

- **Pokud `config.json` neexistuje nebo chybí `schedule.peak_focus_windows` nebo `preferences.mit_count`**: spusť **Onboarding**.
- **Pokud `config.json` existuje a je kompletní**: přejdi přímo na **Denní run**.

## Onboarding (první spuštění)

Spustí se jen jednou. Přivítej přirozeně, ne byrokraticky:

> „Nastavíme denní plán — tři rychlé otázky a pak projdeme tvoje oblasti, abys měla goals soubor. Příště bude spuštění okamžité."

### Otázky

**1. Peak focus okno.**
„Kdy máš největší energii na hlubokou práci? Vyber 1,5–2hodinový blok — sem půjdou MITy."
Nabídni příklady: 11:00–13:00, 13:00–15:00, 15:00–17:00. Lenka je odpolední typ, takže odpoledne je pravděpodobné.

**2. Počet MITů.**
„Kolik nejdůležitějších úkolů chceš mít na den? Doporučuju 2–3 — víc než 3 přestane být 'nejdůležitější'."
Default: 3.

**3. Goals — tvoje oblasti.**
„Teď projdeme tvoje oblasti a zapíšeme pár směrů na tento kvartál. Budu se ptát po jedné oblasti."

Projdi postupně každou oblast (po jedné, čekej na odpověď):

- **tadylenka** — co chceš v tomhle kvartálu posunout? (výstupy, metriky, směr)
- **lcenglish** — co chceš v tomhle kvartálu posunout?
- **health** — na čem ti záleží v oblasti zdraví?
- **studies** — co je akademický cíl na tento kvartál?
- **family** — co chceš vědomě pěstovat?
- **japanese** — kde chceš být za 3 měsíce?
- **finances-admin** — co je nejdůležitější dotáhnout nebo nastavit?
- **slepekure** — co chceš s tímto projektem v tomhle kvartálu?

Pro každou oblast přijmi odpověď uživatele a zformuluj ji jako 1–3 stručné body (přirozeně, ne jako bullet-point seznam zadání). Pokud uživatel řekne „přeskočit" nebo „nic konkrétního", zapiš `null`.

Po průchodu všemi oblastmi ulož `gtd/goals.md` v tomto formátu:

```markdown
# Cíle — [kvartál, rok]

## tadylenka
- [cíl 1]
- [cíl 2]

## lcenglish
- [cíl 1]

## health
- [cíl 1]

## studies
- [cíl 1]

## family
- [cíl 1]

## japanese
- [cíl 1]

## finances-admin
- [cíl 1]

## slepekure
- [cíl 1]
```

Vynech sekce, kde uživatel řekl „přeskočit".

### Ulož config

Zapiš `config.json` vedle tohoto souboru:

```json
{
  "version": 1,
  "onboarded_at": "YYMMDD",
  "schedule": {
    "work_start": "11:00",
    "work_end": "19:00",
    "peak_focus_windows": [
      {"start": "HH:MM", "end": "HH:MM", "label": "peak focus"}
    ],
    "recurring_blocks": []
  },
  "goals": {
    "areas": ["tadylenka", "lcenglish", "health", "studies", "family", "japanese", "finances-admin", "slepekure"],
    "goals_file_path": "G:\\Můj disk\\vault\\gtd\\goals.md"
  },
  "output": {
    "plans_folder": "G:\\Můj disk\\vault\\daily",
    "next_week_priorities_file": "G:\\Můj disk\\vault\\gtd\\next-week-priorities.md"
  },
  "preferences": {
    "mit_count": 3,
    "evening_cutoff_hour": 20
  }
}
```

Doplň skutečné hodnoty z odpovědí.

Pak potvrď: „Nastavení uloženo. Sestavuji první plán."

Přejdi na **Denní run**.

---

## Denní run

### Krok 1 — Datum plánu

Zjisti aktuální datum a hodinu.

- Pokud je hodina **před** `preferences.evening_cutoff_hour` (default 20): datum plánu = dnes.
- Jinak: datum plánu = zítra. Řekni jednou: „Je večer, sestavím plán na zítra. Pokud chceš dnešní, řekni 'plán na dnes'."

Pokud uživatel explicitně řekl „dnes" nebo „zítra", respektuj to.

### Krok 2 — Načtení vstupů

Načítej v tomto pořadí. Žádný vstup není povinný — pokud chybí, přejdi dál bez upozornění.

**a. Carryover z předchozího dne.**

Načti `G:\Můj disk\vault\daily\{YYMMDD-1}.md` (jeden soubor — plán nahoře, průběh dne pod ním). Sekce plánu nezachycuje realitu dne, proto vždy čti i `## Průběh dne` pod ní — tam je věrnější obraz toho, co se skutečně stalo. Z obou částí identifikuj nedokončené položky a kontext pro dnešek. Drž je jako kandidáty na přenesení.

Starší dny mohou mít ještě oddělený `{YYMMDD-1}-plan.md` z doby před sloučením formátu (do 260915) — pokud existuje vedle `.md`, načti i ten.

**b. Next-action tasky z projektů + manuální sekce GTD.**

Projdi rekurzivně:
- `G:\Můj disk\vault\projects\`
- `G:\Můj disk\vault\GrowOS\`

Hledej všechny řádky odpovídající vzoru `- [ ] .+#next-action`. Zachyť celý řádek včetně tagů a případného data `📅 YYYY-MM-DD`. Kontextové tagy (#online, #telefon, #doma, #venku) si poznamenej — pomůžou při sestavení plánu.

Pokud nalezneš soubory, poznamej si jejich cesty — při případném odškrtnutí budeš potřebovat upravit správný soubor.

**Vždy také načíst** manuální sekce `G:\Můj disk\vault\gtd\next-actions.md` — sekce @online, @telefon, @doma, @venku obsahují kontextové tasky bez projektu. Zahrnout je do flexibilního seznamu plánu podle kontextu dne.

**c. Google Kalendář + Todoist kalendář.**

Načti události pro datum plánu ze dvou kalendářů přes MCP:
- `lnk.dvorakova@gmail.com` — schůzky a osobní události
- `d0cf3065decc1cb2fe038fcefe927aa76e4896534f469afa6667eadbfb891110@group.calendar.google.com` — pracovní bloky (Todoist kalendář, barva Sage)

Načti také události na **následující 2 dny** z Todoist kalendáře — abys věděl, které tasky už mají naplánovaný blok a nestavěl je jako MITy na dnešek. Pokud task z projektů má blok v nadcházejících 2 dnech, přesuň ho do sekce „📋 Kdyby náhodou zbyl čas" s poznámkou kdy je blok, nebo ho vůbec nezmiňuj.

Bloky nastavené z weekly review jsou základ, denní plán pracuje v jejich rámci.

**d. Goals soubor.**

Načti `G:\Můj disk\vault\gtd\goals.md`. Použij jako kontext při výběru MITů.

**e. Týdenní priority.**

Načti `G:\Můj disk\vault\gtd\next-week-priorities.md`. Toto je **kontext**, ne seznam úkolů. Při výběru MITů preferuj tasky, které jasně posouvají týdenní prioritu.

**f. Uživatelovy tasky.**

Zeptej se:

> „Co je dnes na stole? Přidej cokoli, co jsem nezachytil — nebo řekni 'nic' a pracujeme s tím, co mám."

Čekej na odpověď.

### Krok 3 — Sestavení plánu

**Základní princip: kalendářní bloky z weekly review jsou MITy.** Denní plán je jen ověření, že bloky platí — nepřidává nové úkoly nad rámec toho, co bylo naplánováno. Přidání dalších věcí Lenku mate a znervózňuje.

**1. Vyber MITy.** MITy jsou bloky z kalendáře pro daný den. Pokud kalendář neobsahuje žádné pracovní bloky, teprve pak vyber z `#next-action` tasků (max N dle `preferences.mit_count`). Kritéria:
   - Posouvá týdenní prioritu
   - Má blížící se deadline (`📅`)
   - Vyžaduje hlubokou soustředěnou práci

   Task, který má blok kdekoliv v aktuálním plánovaném týdnu (tj. do nejbližšího pátku včetně), **nevytahovat jako MIT na dnes**.

**1b. Založ kalendářní blok pro každý MIT.** Pokud MIT vznikl výběrem z `#next-action` tasků (tj. ještě nemá vlastní událost v Todoist kalendáři), **hned vytvoř** událost v Todoist kalendáři (`create_event`, barva Sage/colorId 2) pro přiřazený čas — ne až při zavírání dne. Bez kalendářního bloku MIT pro Lenku "neexistuje". Pokud MIT už je z existujícího Todoist bloku (bloky z weekly review), nic nezakládej — jen ho zobraz v „Naplánováno". Pokud čas kolidoval a posunul se (viz krok 2), založ blok na nový, reálný čas — nikdy ne na čas, který už uplynul.

**2. Ověř bloky.** Projdi kalendářní bloky dnešního dne — platí? Pokud je konflikt (schůzka přes blok apod.), upozorni. Jinak beze změny.

**3. Zobraz naplánované bloky.** Přidej do plánu kalendářní události a existující bloky jako sekci `## 📅 Naplánováno`.

**4. Zbytek jako flexibilní seznam.** Vše, co se nedostalo mezi MITy, jde do `## 📋 Kdyby náhodou zbyl čas` bez časových bloků.

**5. Pokrytí oblastí.** Zmapuj každý MIT na oblast z goals. Pokud nějaká oblast nebyla v plánech 5+ dní, upozorni na konci: „5+ dní bez: [oblast] — zvážit zítra."

Výjimky (nevypisovat do warningu): **family** a **finances-admin** mají vlastní dynamiku a neřídí se aktivním zásahem den co den. **japanese** vypisovat, ale ne jako naléhavý požadavek, pokud právě běží jiný intenzivní blok (např. seminárka) — spíš jako „až poleví".

### Krok 4 — Ulož soubor

Vše jde do jednoho souboru: `G:\Můj disk\vault\daily\{YYMMDD}.md`. Plán tvoří horní část dokumentu, `## Průběh dne` a pozdější `## Systémové změny` pokračují pod ní.

- **Soubor ještě neexistuje** → vytvoř ho: plán podle `assets/plan-template.md` nahoře, pod ním prázdná sekce `## Průběh dne`.
- **Soubor už existuje** (např. z předchozího spuštění skillu ten den, nebo už obsahuje `## Průběh dne` ze session, co běžela od rána) → nahraď/vlož jen plánovou část nahoře (od H1 po oddělovač `---` před „Plán vygenerován..."), **zbytek souboru pod ní nech beze změny**. Nikdy nepřepisuj `## Průběh dne` ani `## Systémové změny`.

Použij `assets/plan-template.md`. Vypusť celé sekce, ke kterým nemáš obsah — prázdné nadpisy dělají plán dutým.

### Krok 5 — Chat summary

Vypiš přehled přirozeně a úsporně. Formát:

```
Plán uložen → daily/{YYMMDD}.md

🎯 Dnes nejdůležitější
1. {MIT 1} — {start}–{konec}
2. {MIT 2} — {start}–{konec}

📅 Naplánováno
- {start}–{konec} — {blok}

📋 Kdyby náhodou zbyl čas
- {úkol}
- {úkol}

{volitelně: ⚠️ 5+ dní bez: [oblast]}
```

Neptej se, jestli označit tasky jako hotové — Lenka si je odškrtává sama v projektových souborech, až budou hotové.

---

## Úprava nastavení

Pokud uživatel řekne „změň pracovní hodiny", „přidej opakující se blok", „aktualizuj peak focus" nebo podobně:
- Načti `config.json`
- Změň jen to, co bylo řečeno
- Ulož a potvrď změnu

Úplný onboarding znovu jen pokud uživatel výslovně požádá o reset.

Pokud uživatel chce aktualizovat goals: načti `gtd/goals.md`, proveď změnu, ulož.

---

## Průběžné reporty během dne

Kdykoli Lenka hlásí dokončenou aktivitu, čas nebo změnu plánu — zapsat do `daily/{YYMMDD}.md` sekce `## Průběh dne` (pod plánem, ve stejném souboru). Toto platí i mimo spuštění skillu (tj. i v běžné konverzaci). Nedat to jen do plánu — Průběh dne je primární záznam toho, co se skutečně stalo.

⚠️ `{YYMMDD}` = den, kdy seance reálně probíhá, ne systémové datum. Pokud je po půlnoci a Lenka ještě neoznámila konec dne, zápis patří do souboru **předchozího** dne — nikdy nezakládat nový dnešní soubor jen kvůli změně data. Viz pravidlo v CLAUDE.md („Daily zápisy po půlnoci").

## Graceful failures

- Žádný soubor za předchozí den → tichý skip
- Žádné `#next-action` tasky → pokračuj, zeptej se na tasky
- Google Kalendář nedostupný → pokračuj bez kalendáře, zmíň to jednou
- Goals soubor chybí → tichý skip, goals coverage přeskoč
- Uživatel nedá žádné tasky a nic není v projektech → sestav minimální plán (kalendářní bloky + prázdný MIT seznam s otázkou „Co by z dnešního dne udělalo výhru?")
