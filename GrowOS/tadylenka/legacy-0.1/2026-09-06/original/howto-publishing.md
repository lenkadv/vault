# tadylenka — Publishing Workflow

Referenční dokument pro publishing proces. Analogie k `lcenglish/howto-new-episode.md`.

---

## Kadence

| Formát | Frekvence | Poznámka |
|--------|-----------|----------|
| Substack článek | 1× za 14 dní | Alternuje s IG carouselem |
| IG carousel | 1× za 14 dní | Alternuje se Substack článkem — karusely > reely (viz [[lessons]], analýza konkurence) |
| Substack Notes | min. 3× týdně | Krátké postřehy, in-situ, fragmenty |
| IG Stories | příležitostně | Claude upomíná po zmínce o výstavě / galerii / akci |

**Výsledkem je:** každý týden buď článek nebo carousel (na střídačku), plus aspoň 3 Notes.

**Jak se to reálně plní (od 260804):** tohle je cílové tempo za měsíc/kvartál, ne termín na jednotlivou položku. tadylenka nemá tvrdý vnější deadline, takže při nárazu jiné práce (studium, klientské zakázky) je první, co ustoupí. Místo hlídání týdne po týdnu se plánují content sprinty do volných oken a nárazy se zapisují dopředu do Sezónního kalendáře v [[projects/tadylenka-publishing]].

---

## Workflow — Substack článek

- [ ] Vybrat téma z `content-bank/` (pohled "K napsání" v [[GrowOS/tadylenka/content-bank/Content Bank|Content Bank.base]])
- [ ] Napsat draft (hlas: deadpan literární vypravěč, viz [[lessons]])
- [ ] Revize — zkontrolovat: žádné mission statements, žádné sebeshazování, humor nesmí být pojmenován
- [ ] Publikovat na Substack
- [ ] Napsat 1 Substack Note navazující na článek (fragment, reakce, provokace)
- [ ] Ve zvoleném souboru v `content-bank/` nastavit `status: pouzito` + `datum_pouzito`

---

## Workflow — IG carousel

- [ ] Vybrat téma z `content-bank/` (preferovat cross-niche nebo silný hook), formát podle [[projects/tadylenka-publishing]] — Opakující se IG formáty ("Dějiny umění v X" nebo "Co vidíš? / Tak vidíš!")
- [ ] Připravit slides (texty + vizuál)
- [ ] Napsat popisek: Hook → 1 věta o newsletteru → CTA (ART do komentáře → DM)
- [ ] Publikovat na IG
- [ ] Napsat doprovodný Substack Note
- [ ] Ve zvoleném souboru v `content-bank/` nastavit `status: pouzito` + `datum_pouzito`

Reel je zatím neaktivní formát (viz [[lessons]] — karusely generují víc saves/sdílení). Dlouhé YouTube video je samostatný, zatím neodstartovaný plán (viz [[lessons]] — Video).

---

## Substack Notes — systém

Notes vznikají z fronty, ne ze spontánního zachytávání. Claude přidává Note kandidáty do `content-bank/` (soubor se `status: volny-napad`, `tagy_platforma: ["NOTES"]`, `temata: ["substack-notes-format"]`) při každém zavírání sezení, kde byl tadylenka content. Lenka může kdykoli dumpovat fragmenty stejným způsobem. Weekly review = projít pohled "K napsání" filtrovaný na NOTES v [[GrowOS/tadylenka/content-bank/Content Bank|Content Bank.base]], vybrat, postovat.

### Formáty

**Přehlédnutý detail** — jeden konkrétní fakt nebo detail podaný jako věcný komentář, bez "není to zajímavé?". Zdroj: research k newsletterům, Anki. Délka: 70–100 slov.

> *Pařížská Opera 19. století provozovala speciální místnost — foyer de la danse — kde bohatí předplatitelé navazovali po představení kontakty s tanečnicemi výměnou za finanční protislužby. Nebylo to tajemství ani skandál. Byl to součást obchodního modelu, který instituce aktivně podporovala. Edgar Degas strávil v té místnosti stovky hodin se skicákem. Celá jeho sláva se staví na obrazech z toho místa.*

---

**Nevešlo se** — fragment který byl příliš dobrý na vyhození, ale nezapadal do argumentu textu. Lenka dumupuje při psaní, Claude těží z research materiálu. Délka: 50–90 slov.

> *Tahle věta nevešla do textu o Constance Quéniaux: Halil Bay, osmanský vyslanec, který si Původ světa objednal, věřil, že mu Constance přináší štěstí u karet. Obraz schoval za hedvábnou oponu do šatny. Nakonec přišel v hazardu o vše. Constance přežila o desítky let a vlastnila vilu v Normandii.*

---

**Otázka bez odpovědi** — věc která Lenku při výzkumu zastavila. Bez rozuzlení, nebo s rozuzlením které odpověď zkomplikuje. Zdroj: `content-bank/`, momenty při čtení zdrojů. Délka: 40–70 slov.

> *Alma-Tadema celý život maloval nahé antické Řekyně a tvrdil, že zobrazuje starověk. Edwardovské publikum to bralo vážně a obrazy slavilo jako doklad klasického vzdělání. Otázka, na kterou nemám odpověď: o čem to víc vypovídá — o Alma-Tademovi, nebo o publiku?*

---

**Poznámka ze sálu** — flat observation z galerie nebo ze situace, která se opakuje. Deadpan, bez ponaučení. Zdroj: výstavy, opakující se chování návštěvníků. Délka: 20–50 slov.

> *Znalost jmen a dat dějiny umění neotevírá. Otevírá je ochota strávit u jednoho obrazu víc než těch průměrných 11 vteřin.*

---

## IG Stories — kdy a co

Stories nevznikají z plánu. Claude upomíná pokaždé, když Lenka zmíní:
výstavu, galerii, muzeum, procházku s kulturním kontextem, čtení, objev.

Typy stories:
- Výstava / galerie → foto + krátký komentář
- Zajímavý architektonický detail → foto
- Čtení / objev → screenshot nebo citát
- Za oponou → pracovní moment (skica, research, poznámky)

---

## Výběr tématu — jak na to

1. Otevřít [[GrowOS/tadylenka/content-bank/Content Bank|Content Bank.base]]
2. Pohled "Podle tématu" — hledat synergie mezi příbuznými nápady, nebo pohled "K napsání" pro rychlý výběr
3. Zvážit: ladí téma s aktuálním děním? Je tu výstava, výročí, kontext?
4. Zapsat vybrané téma do project souboru jako next action

---

## Soubory a pojmenování

- Output: `tadylenka/output/blog/YYMMDD-nazev/nazev.md`
- Carousels: `tadylenka/output/social/Instagram/YYMMDD-nazev/`
- Notes: není třeba ukládat — Substack je zdroj pravdy
