# LCEnglish — nový prodejní funnel (HELE) — podklady (projekt odložen 261004)

**Oblast:** lcenglish
**Stav:** odloženo do [[someday-maybe]] 261004 (weekly review) — Lenka teď pracuje na 10x English a Nepravidelných slovesech, k HELE se vrátí potom. Dřívější stav: Fáze 3 (tvorba obsahu), od 260715 bez pohybu. Tohle je archiv podkladů; akční záznam je v someday.
**Zahájeno:** 260521

---

## Cíl

Postavit nový evergreen prodejní funnel pro HELE (Angličtina s příběhem, 5 970 Kč) se shadowingem jako ústředním mechanismem. Model: reklama → webinář → prodej.

**Struktura (finální, 260526):** Reklama → registrace na webinář → evergreen webinář → HELE 4 970 Kč + bonusy, 48h deadline → upsell 10x English / downsell Shadowloop balíček.
Shadowloop lead magnet jako vstupní bod zamítnut — viz [[GrowOS/lcenglish/research/260526-funnel-handoff]].

**Positioning:** [[GrowOS/lcenglish/research/260521-positioning-brief-hele]]
**Strategická vize (shadowing jako umbrella brand):** [[GrowOS/lcenglish/research/260521-shadowing-superhero-briefing]]

---

## Fáze projektu

### Fáze 0 — Research ✅ 260521
### Fáze 1 — Positioning ✅ 260521

### Fáze 2 — Funnel design

- [x] Definovat nabídku: HELE offer stack ✅ 260526
- [x] Definovat webinář: osa argumentu, struktura, délka, CTA ✅ 260526 → [[GrowOS/lcenglish/research/260526-webinar-blueprint]]
#### HELE offer stack (definováno 260526)

**Cena:** 4 970 Kč (webinář / 48 hodin) → po deadlinu 5 970 Kč
**Bonusy:**
- BONUS 1: Shadowloop balíčky "Angličtina na dovolené" (fráze + rozhovory) — tvorba ~14 dní, Fáze 3
- BONUS 2: PDF "Nejčastější chyby Čechů v angličtině" — tvorba ~14 dní, Fáze 3
**Hodnoty bonusů:** doplnit při tvorbě sales page

### Fáze 3 — Tvorba obsahu

**⚠️ Pivot 260616:** Webinář jde na vedlejší kolej. Začínáme Mini VSL (White Label Comedy metoda — PAS šablona s humorem). Webinář skript v1 zůstává jako záloha, ale nerozvíjíme ho, dokud nebude VSL hotový a otestovaný.

**Strategický základ VSL:** Anti-false-promises positioning — Lenka říká pravdu o časových očekáváních, humor staví na tom, že audience ty sliby zná a znovu se jim nechá nachytat. Diferenciátor: zábava a pohyb dopředu jsou důvod pokračovat, ne plynulost za 60 dní.

- [ ] Napsat Mini VSL skript (WLC PAS šablona)
  - **Pozastaveno 260715** — Hook, Problem, Solution reveal a 4/5 bulletů hotové → [[GrowOS/lcenglish/output/funnel/260714-minivsl-draft-v1]]. Lenka odhalila strukturální problém: Hook/Problem/Solution spolu logicky nedrží jednu nit (viz [[feedback_mentor_throughline]]). Než se pokračuje, Lenka si sama promyslí throughline mimo sekvenční mentoring.
  - Zbývá: bullet 5 (bonus), close/CTA, a hlavně sladit throughline napříč sekcemi
  - Postup: [[GrowOS/lcenglish/research/260616-wlc-minivsl-process]]
  - Šablona (fill-in-the-blanks): [Google Doc](https://docs.google.com/document/d/1qJXcaYxVtsHA95EsuJ030X1QAsS9r1rZ8V0we1RrtTM/edit)
  - Training notes: [[GrowOS/lcenglish/research/260616-wlc-minivsl-training]]
  - Dělat v novém vlákně s Claudem jako mentorem (viz [[GrowOS/lcenglish/research/260616-wlc-minivsl-mentor-notes]])
- [ ] Nahrát VSL
  - 📎 Tool: PromptSmart Pro (autocue, iPhone přední kamera, scrolluje podle hlasu)
  - 📎 Alternativa faceless: HeyGen avatar + Gamma.app slidy
- [ ] ~~Dopsat a schválit skript webináře~~ — odloženo
  - Záloha: [[GrowOS/lcenglish/output/funnel/260605-webinar-skript-v1]]
  - Vrátit se po dokončení VSL s novými insights
- [ ] Napsat post-webinářové / post-VSL emaily (48h okno)
- [ ] Napsat landing page (nový positioning — ROSUM/shadowing; stará verze: [[GrowOS/lcenglish/output/landing-pages/2026-04-06-hele/copy]])
- [ ] Napsat prodejní stránku se slevou

### Fáze 4 — Technické propojení

- [ ] Shadowloop — ověřit flow: vytvoření účtu → přístup k balíčkům
- [ ] Webinarkit — nahrát webinář, nastavit evergreen
- [ ] WordPress — landing page + prodejní stránka se slevou
- [ ] Drip — email sekvence před i po webináři
- [ ] Automatehero — deadline script
- [x] FAPI — zprovoznit akce (sale URL → Shadowloop přiřazení balíčku) ✅ 261001
  - Ve fapipi segment `hele` už byl (Drip tag „Purchased: HELE“, Shadowloop `HELE`, FreshLearn kurz 157241 / plán 22289). Chybělo napojení ve FAPI: formulář HELE (150336) → Akce → „Zaplacení objednávky → spustit programový skript“ → `https://fapipi.lenkadvorakova.cz/handle-invoice/hele`.
  - **EU consent u nákupu (261001):** v Dripu (účet LCE) tři aktivní automatizace „admin: EU consent – nákup HELE / 10x ENGLISH / Irregular“: spouštěč „Applied a tag“ `Purchased: …` → `EU_consent_how` = název tagu, `EU_consent_when` = `{{ now | in_time_zone: subscriber.time_zone }}` (stejně jako freebie automatizace; bez podmínky, přepíše se čerstvější hodnota). **Nový produkt s fapipi = zduplikovat jednu z nich** (Drip → Workflows → … → Duplicate), přepsat název, tag ve spouštěči a hodnotu `EU_consent_how`, zapnout. Ověřeno živě na testovacím odběrateli.
  - Živý test 261001 (platba převodem, ručně „zaplaceno“ se spuštěním akcí): FAPI → fapipi 200 OK, Drip tag, Shadowloop (`preregistered` s `premiumDecks`) i zápis do FreshLearnu ✅. Dvojí zápis nákupu do Dripu (lifetime value 2×) opravil Vítek 261001: FAPI posílalo oznámení za zaplacenou objednávku i za navazující fakturu, automatika teď zpracuje jen zaplacenou, nestornovanou zálohovou objednávku. **Pravidla pro správu FAPI:** u formulářů zachovat vystavování zálohových faktur (bez nich by automatika prodej přeskočila); webhooky nechat na „zaplacení objednávky“ (u upsellu zaplacení konkrétní položky); před zavedením splátek, předplatného nebo změnou fakturačního režimu nechat napojení ověřit s Vítkem.

### Fáze 5 — Reklamy

- [ ] Připravit reklamní kreativy (Meta)
  - 📎 Před tvorbou přečíst materiály z OMFG: sekce Kristine Mirelle (AI klon skripty, Google Flow) + Neil Shoney (šablona Canva)
  - 📎 Tool pro AI video reklamy: [Arcads Claude Code](https://github.com/krusemediallc/arcads-claude-code) — Seedance 2.0, Veo 3.1, Nano Banana, 37 šablon Meta image ads, Claude Code integrace
- [ ] Spustit malý testovací rozpočet
- [ ] Sledovat čísla a diagnostikovat

### Fáze 6 — Škálování

- [ ] Vyhodnotit výsledky → rozhodnout o škálování

---

## Rozhodnutí a kontext

- Starý webinář: nepoužívat — 3+ let starý, nový od nuly (cca 45–60 min)
- Živé launche: ne
- Agentura: ne, Lenka spravuje reklamy sama
- Kurz se před launchem neaktualizuje (animace)
- Email list = ex-studenti a pasivní sledující, není akviziční kanál → nový segment přes Shadowloop

---

---

## Mapa dokumentů — funnel

### Strategie & research
| Dokument | Obsah |
|---|---|
| [[GrowOS/lcenglish/research/260521-positioning-brief-hele]] | Positioning brief — ROSUM, shadowing, Shadowloop, funnel architektura |
| [[GrowOS/lcenglish/research/260521-shadowing-superhero-briefing]] | Strategická vize — shadowing jako umbrella brand lcenglish |
| [[GrowOS/lcenglish/research/260521-webinar-strategy-research]] | Market research — webinářové formáty, CZ trh, konkurence |
| [[GrowOS/lcenglish/research/260526-funnel-handoff]] | Historický dokument — finální rozhodnutí z 260526 (funnel design, offer stack) |

### Mini VSL (aktivní — od 260616)
| Dokument | Obsah |
|---|---|
| [[GrowOS/lcenglish/research/260616-wlc-minivsl-process]] | ⭐ Postup krok za krokem — jak napsat VSL |
| [[GrowOS/lcenglish/research/260616-wlc-minivsl-training]] | Training notes z WLC tréninku (PAS šablona, zásady humoru) |
| [[GrowOS/lcenglish/research/260616-wlc-minivsl-mentor-notes]] | Mentor notes pro session psaní skriptu |
| [Šablona fill-in-the-blanks](https://docs.google.com/document/d/1qJXcaYxVtsHA95EsuJ030X1QAsS9r1rZ8V0we1RrtTM/edit) | WLC PAS šablona — pracovní dokument |
| [[GrowOS/lcenglish/research/260616-wlc-minivsl-transcript]] | Upravený transcript celého 90min tréninku |
| PDF slidy WLC | `G:\Můj disk\2 EDUCATION 📚\White Label Comedy\Jokes-That-Sell-Mini-VSLs-In-Minutes.pdf` |

### Webinář (odloženo — záloha)
| Dokument | Obsah |
|---|---|
| [[GrowOS/lcenglish/research/260526-webinar-blueprint]] | Blueprint — struktura sekce po sekci, zdroje, instrukce |
| [[GrowOS/lcenglish/output/funnel/260605-webinar-skript-v1]] | Skript v1 — záloha, vrátit se po VSL |
| [VSL skript](https://docs.google.com/document/d/1a4VAhFRzace3i68GRS5bvlcn5aN9MBMi0y36tFPx6LE) | Zdrojový skript — starý VSL (hook, ROSUM, testimonials, CTA) |
| [Starý webinář skript](https://docs.google.com/document/d/1d9Ab0KJSMyAOVxxHpEpyHh8XY9zOL7xmgK9IYPkuHsE) | Zdrojový skript — starý webinář (pain points, Shadowloop demo) |

### Sales page & landing page
| Dokument | Obsah |
|---|---|
| [[GrowOS/lcenglish/output/landing-pages/2026-04-06-hele/copy]] | ⚠️ Starý positioning (před ROSUM/shadowing) — přepsat v Fázi 3 |
| [[GrowOS/lcenglish/output/landing-pages/2026-04-06-hele/headlines]] | Headlines ke staré verzi |

---

## Swipe / Inspo

### Lead magnet místo registrace na webinář (260625)
Místo klasického „zaregistruj se na webinář" nabídnout **malý okamžitý bonus** (PDF/checklist) + webclass (= webinář) jako bonus zdarma + download/materiál přímo během webclassu.
- Pocit: dostanu něco hned, webinář je navíc
- Mechanika: snižuje bariéru vstupu, zvyšuje vnímanou hodnotu, „webclass" méně třecí slovo než „webinář"
- Aplikace pro HELE: místo registrace na webinář → free PDF nebo mini audio cvičení → HELE webinář jako bonus
- **Zdroj:** https://ultimateaisystem.com/thankyou/kit (thank-you page po prokliknutí)

## Viz také

- [[areas/lcenglish]]
- [[projects/lcenglish-art-for-english]]
