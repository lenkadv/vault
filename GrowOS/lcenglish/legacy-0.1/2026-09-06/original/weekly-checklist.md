# Týdenní checklist — Art for English

Jeden checklist na každý týden vydání. Kopírovat, doplnit datum a procházet.

---

## Týden: ___________  |  Epizoda: ___  |  Umělec: ___________

### Pondělí (nebo dříve) — příprava obsahu

- [ ] Otevřít `research/art-bites-curriculum-2026.md` — zkontrolovat co jde tento týden
- [ ] Připravit obsah epizody (příběh, 3 fráze, vzorec, CTA prompt, IG teaser, FB caption)
- [ ] Doplnit `EP = { ... }` v `src/compositions/ArtBiteN<Umelec>.tsx`
- [ ] Stáhnout obraz z muzejní databáze (public domain), uložit do `assets/paintings/` a `public/`
- [ ] Napsat newsletter v `output/newsletter/YYYY-MM-DD-epizoda.md`
  - [ ] YAML frontmatter (platform, status, date, type)
  - [ ] `## Subject:` viditelně na začátku
  - [ ] Liquid codes pro oslovení (ověřit)
  - [ ] Thumbnail placeholder → po renderu doplnit skutečný obrázek
- [ ] Připravit caption pro IG carousel post

### Úterý — render a kontrola

- [ ] Spustit `setup-render.ps1`
- [ ] Zkontrolovat obrázek v `public/` (správný název, správné rozlišení)
- [ ] Spustit `node render-episode.js ABN YYYY-MM-DD-umelec-nazev`
- [ ] Projít všechny vyrenderované soubory:
  - [ ] slide-01 (hook) — správný umělec, název, gramatický pill
  - [ ] slide-02 (obraz) — obraz dobře viditelný, popisek čitelný
  - [ ] slide-03 (příběh) — text čitelný, pointka výrazná
  - [ ] slide-04–06 (fráze) — zlatě správné slovo, překlad sedí
  - [ ] slide-07 (vzorec) — formula box správný
  - [ ] slide-08 (CTA) — prompt konkrétní, next episode aktuální
  - [ ] ig-teaser — příběh + pointa, "Pokračování ve čtvrtek."
  - [ ] fb-teach — fráze, vzorec, caption
  - [ ] nl-thumb — název díla, rok, instituce

### Středa — newsletter

- [ ] Vložit nl-thumb do newsletteru (doplnit PLACEHOLDER s odkazem)
- [ ] Zkopírovat finální text emailu do Dripu
- [ ] Nastavit datum odeslání v Dripu
- [ ] Zkontrolovat subject line a preview text

### Čtvrtek — sociální sítě

- [ ] Publikovat IG carousel (slide-01 až slide-08 + caption)
- [ ] Publikovat FB teach post (fb-teach.png + caption)
- [ ] Zkontrolovat, že hashtagy jsou v pořádku

### Sobota / neděle — engagement posty

- [ ] IG engage post (slide ze série + otázka do komentářů)
- [ ] FB engage post (obraz nebo textový post + otázka)

### Po vydání — archivace

- [ ] Zkontrolovat že všechny soubory jsou na Google Drive
- [ ] Dopsat do týdenního plánu co skutečně odešlo (vs. co bylo v plánu)
- [ ] Poznamenat co fungovalo / co změnit příště

---

## Šablona názvu složky pro carousel

```
YYYY-MM-DD-jmeno-umelce-nazev-dila
```
Příklady:
- `2026-04-16-art-bite-1-caravaggio`
- `2026-04-21-vermeer-mlekarka`
- `2026-04-28-van-eyck-arnolfini`
