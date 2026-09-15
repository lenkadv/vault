# Zotero + Obsidian — workflow pro zettelkasten

## Jak jsou propojeny

Zotero auto-exportuje celou knihovnu jako JSON do:
`zettelkasten/literature/Zotero knihovna.json`

Plugin: **BetterBibTeX** — aktualizuje JSON okamžitě při každé změně v Zoteru.
Claude tento soubor čte a z něj tahá citekey, itemKey a metadata pro LN noty.

---

## Kde najít citekey a itemKey

**V Zoteru:**
- Pravý klik na záznam → **Info** → pole **Citation Key** = citekey
- Pravý klik → **Copy Item Key** = itemKey (8místný kód, např. `RLVC5GEK`)

**V JSON:**
- Otevřít `zettelkasten/literature/Zotero knihovna.json`
- Hledat podle názvu nebo autora
- Pole `"citationKey"` = citekey, pole `"itemKey"` = itemKey

---

## Formáty, které Claude používá

**Název LN souboru:**
`LN – {citekey}.md`
Příklad: `LN – teresadejesusZivotVlastniZivotopis1991.md`

**Zotero link v LN notě:**
`[otevřít v Zoteru](zotero://select/library/items/{itemKey})`
→ link pracuje s itemKey, ne citekey — nepřeruší se ani při změně citekey

---

## Workflow: nová LN nota

1. Přidat zdroj do Zotera
2. (Volitelné) Číst PDF v Zoteru → anotovat → **Add Note from Annotations**
3. Říct Claudovi: „ulož mi LN pro [název/autora]" — Claude najde záznam v JSON a vytvoří notu
4. LN nota vzniká až při práci se zdrojem, ne jako prázdný placeholder

---

## Workflow: PDF s anotacemi

1. Číst PDF přímo v Zoteru a anotovat (highlight + komentář ke každému highlightu)
2. Pravý klik na záznam → **Add Note from Annotations**
3. JSON se aktualizuje automaticky
4. Claude vidí citáty, komentáře i čísla stránek → vygeneruje LN z anotací

---

## Šablona LN pro archivní pramen (Manuscript)

Používá se místo standardní LN šablony, když zdroj nemá autora ale je to archivní jednotka.

```markdown
# LN – {citekey}

**Archiv:** Národní archiv Praha
**Fond:** [název fondu, např. APA I — Archiv pražského arcibiskupství I.]
**Sign.:** [sign., např. A 2/4]
**Inv. č.:** [inv. č.]
**Rozsah:** [časový rozsah, např. 11/1691–5/1693]
**Zotero:** [otevřít v Zoteru](zotero://select/library/items/{itemKey})
**Datum průzkumu:** YYMMDD
**Tagy:** #archival-source #[fond]

## Citace (dle ÚDKU)

Footnota: [Název/charakteristika dokumentu], [datace], f. Xr., Národní archiv Praha, [fond], inv. č. [č.], sign. [sign.].
Seznam pramenů: Národní archiv Praha, [fond] — [plný název fondu].

## Relevantní folie

### f. Xr. — [stručný popis]
![[YYMMDD_NA-[fond]-[sign]_folXr.jpg]]
> přepis nebo parafráze (vlastní komentář vždy kurzívou na samostatném řádku)

## Otázky a reakce

## Permanent notes, které z toho vzniknou
- [ ] #zettel
```

**Zotero Manuscript — která pole vyplnit:**

| Zotero pole | Co tam dát |
|-------------|------------|
| Title | Název/charakter jednotky (např. *Kopiář odeslaných listů APA*) |
| Archive | Národní archiv Praha |
| Archive Location | sign. A 2/4 |
| Date | 1691–1693 |
| Place | Praha |
| Extra | inv. č. 18 (Zotero nemá samostatné pole pro inv. č.) |

---

## Soubory

- JSON export: `zettelkasten/literature/Zotero knihovna.json`
- LN noty: `zettelkasten/literature/LN – {citekey}.md`
