# Postup: Zettelkasten a akademické psaní

Přesunuto z `CLAUDE.md` 260926 (zkrácení hlavního návodu) — text beze změny. `CLAUDE.md` sem odkazuje; Claude čte tenhle soubor vždy, když pracuje se zettelkasten/, LN/POZ/PN notami, Zoterem nebo akademickým textem.

⚠️ **Systém se od 260728 rozšířil** o vrstvy `vystupy/` (OUT — vlastní hotové texty), `topics/` (skutečné stránky na koncept, ne tagy) a `poznamky/` (POZ — atomické citace vázané na konkrétní zdroj+stránku+výstup), inspirované Source-Topic-Argument metodou a Notion databází Slepé kuře. LN nota má teď plné YAML frontmatter properties (`autor, nazev, typ, zdroj, rok, kde_najit, zotero, stav, tags, temata, pouzito_v`), ne bold-text řádky. **[[MOC – Zettelkasten]] je živá a autoritativní specifikace** — sekce níž popisuje jen původní/základní tok, při rozporu platí MOC.

Tok zpracování: `inbox/` → `zettelkasten/literature/` → `zettelkasten/permanent/` → akademický text

---

**Fleeting notes** → `inbox/`
- Rychlý záchyt myšlenky, odkazu, nápadu — z Obsidianu nebo z Notion
- Dočasné — zpracují se při Weekly Review nebo smažou
- Žádná forma, žádná povinná struktura

**Literature notes** → `zettelkasten/literature/`
- Jedna nota = jeden zdroj (kniha, článek, archiválie, webová stránka, Substack esej…)
- Platí pro všechny citovatelné zdroje — akademické i neakademické (Substack, online eseje apod.), pokud mají autora, datum a URL
- Název: `LN – {citekey}.md` — citekey přebírám z Zotera (BetterBibTeX), např. `LN – BlairMalesSecondarySex2026.md`
- Struktura:
  ```
  # LN – Název zdroje

  **Autor:** [[Jméno Autora]]
  **Zdroj:** Autor, Jméno. "Název." *Publikace*, Datum.
  **URL:** https://...
  **Zotero:** [otevřít v Zoteru](zotero://select/library/items/{itemKey})
  **Datum čtení:** YYMMDD
  **Tagy:** #anglicky #jen #anglické #tagy

  ## Souhrn
  (2–4 věty: o čem zdroj je, hlavní argument)

  ## Poznámky
  (organizováno podle kapitol/sekcí originálního textu)

  ### Název kapitoly (p. X)

  > "Přímý citát." (Autor, Rok, p. X)

  *→ Můj komentář nebo parafráze — vždy v kurzívě, na samostatném řádku po prázdném řádku*

  ## Otázky a reakce

  ## POZ notes, které z toho vzniknou
  ```
  Sekce zůstává prázdná při založení. `- [ ] #zettel Zpracovat: [popis]` se přidává jen dodatečně, a jen pokud je zdroj myšlenkově silný a nota (POZ nebo výjimečně PN) z něj má reálně vzniknout — ne jako automatický placeholder u každé LN noty (viz [[feedback_zettel_placeholder_flood]]).
  **`## Poznámky` je Lenčina volná čtecí zóna (260805)** — zapisuje tam za běhu čtení, se stránkou, bez rozhodování POZ/PN a bez překlikávání mezi soubory. Claude ji na vyžádání dávkově zpracuje do POZ notes (a nabídne kandidáty na PN, pokud narazí na syntetizující větu nepodloženou jednou citací) — nezpracovává se živě při čtení. Podrobně viz [[zettelkasten/MOC – Zettelkasten]].
- Tagy: vždy anglicky
- Autorský soubor: každý autor má vlastní `[[Jméno Autora]].md` v `zettelkasten/literature/` s přehledem děl
- Podsložky v `zettelkasten/literature/`: `authors/` jen pro skutečné autory citovaných pramenů (ti, co text napsali); `osoby/` pro subjekty archivního/pátracího výzkumu (portrétovaní, zmínění v pramenech — např. malíři, faráři, šlechta u Slepého kuřete). Nepatří do `authors/`, i když mají vlastní soubor.
- Zotero workflow: PDF anotovat v Zoteru → "Add Note from Annotations" → JSON se aktualizuje → Claude vygeneruje LN z anotací
- **Přepis anotací do LN noty musí být doslovný** — citáty i Lenčiny vlastní komentáře (`//` v Zotero notě) se přepisují beze změny, bez krácení a bez parafráze. Vlastní syntéza/interpretace patří výhradně do sekcí Souhrn a Otázky a reakce, nikde jinde v Poznámkách.
- Citace bez stránek (online zdroje): použít číslo odstavce nebo název sekce místo stránky
- Nikdy nevytvářet bez jasného zdroje (autor, název, rok)

**Permanent notes** → `zettelkasten/permanent/`
- Jedna nota = jedno tvrzení, jeden koncept (atomická myšlenka)
- Název: `YYMMDD-HHMM Název myšlenky.md`
- Struktura:
  ```
  # Název myšlenky
  **ID:** YYMMDD-HHMM
  **Tagy:** #téma
  ## Myšlenka (vlastní formulace, argumentativní)
  ## Proč na tom záleží
  ## Spojení s dalšími myšlenkami
  - [[PN – ...]]
  ## Vychází z
  - [[POZ – ...]]
  ```
  Necitovatelný podnět bez POZ/LN (podcast bez formální LN, rozhovor, e-mailová výměna) → sekce `## Podnět` s neformálním popisem místo `## Vychází z`.
- Vzniká buď mechanicky při reverse-engineeringu hotové práce (vlastní syntetizující věty vedle footnotovaných), nebo vzácně živě při čtení/procházení sítě — nikdy jako povinné rozhodnutí u každé jednotlivé poznámky. Podrobně viz [[zettelkasten/MOC – Zettelkasten]].
- Netřídit do podsložek — spoléhat na tagy a interní odkazy
- Nikdy nevytvářet jako shrnutí tématu — vždy jen jedno konkrétní tvrzení

**Pravidla pro zpracování:**
- Když Lenka řekne "zpracuj inbox", procházej soubory v `inbox/` a pro každý navrhni: přeformátovat jako literature note, vytáhnout permanent note, nebo smazat
- Při ukládání noty vždy zvážit: na které noty odkazuje? Do které area patří? Vzniká permanent note?
- Zettelkasten probíhá zpravidla **mimo `projects/`** — nový zdroj ze Zotera → LN nota s `#zettel` taskem → permanent notes. Project soubor vzniká jen pro nastavení nového procesu nebo specifický výstup (seminárka, článek).

## Akademické psaní

- Zápisky ze studia → `zettelkasten/literature/` (ne do [[studies]])
- [[studies]] obsahuje pouze stav a přehled studia
- Při psaní textu: hledat relevantní permanent notes přes tagy → skládat argument z hotových not

## Zettelkasten review (součást weekly review)

- `#zettel` tasky jsou viditelné v [[next-actions]] — zpracovat ty, které jsou relevantní teď
- Projít `zettelkasten/literature/` — které noty ještě nemají wiki-linky?
- Projít MOC soubory — přidat nové noty do mapy
- Projít `zettelkasten/permanent/` — jsou noty propojené navzájem?
- Kontroly přírůstků do knihoven → [[resources/postupy/knihovna]]
