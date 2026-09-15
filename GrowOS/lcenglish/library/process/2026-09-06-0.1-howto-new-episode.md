# Jak vytvořit nový díl Art for English

Postup pro každou novou epizodu, jak reálně probíhá dnes — bez Remotion a bez carouselu (obojí pozastaveno, viz níže).

---

## Krok −1: Rekapitulace a odsouhlasení PŘED jakoukoli prací

**Povinný první krok. Nezačínat research, stahování obrazu ani psaní, dokud Lenka neodsouhlasí zadání.**

Když Lenka řekne "Art for English #NN" (nebo ekvivalent):

1. Otevřít `lcenglish/research/art-bites-curriculum-2026.md` a `projects/lcenglish-art-for-english.md`.
2. **Zrekapitulovat Lence, co má daný díl podle plánu být:**
   - datum odeslání newsletteru
   - gramatický / slovní bod
   - plánované dílo a umělec (+ instituce, rok)
   - poznámka z curricula (proč je to zrovna tady, případný svátek/kontext)
3. **Explicitně se zeptat, jestli tohle sedí — hlavně:**
   - Funguje dané dílo jako **obrázek do newsletteru**? (Ne moc široké/úzké svitky, ne špatně ořezatelné, ne nedohledatelná reprodukce, ne copyright problém.) Reprodukce musí jít hezky použít jako hlavní vizuál emailu.
   - Sedí gramatický jev k dílu, nebo se natahuje?
   - Chce Lenka jednoobrázkovou epizodu, nebo dvojobrázkové srovnání?
   - Má Lenka vlastní real-life hook, nebo se hledá?
4. Když něco nesedí → **nejdřív vybrat náhradní dílo / úhel a odsouhlasit**, teprve pak dál. Změnu zapsat do curricula (revize s datem) i do projektu.

Teprve po odsouhlasení pokračovat krokem 0 (založit složku, brief.md).

---

## Struktura souborů

Každá epizoda má vlastní složku v `output/episodes/`. Ta je zdrojem pravdy pro veškerý obsah.

```
output/
  episodes/
    NN-umelec/              ← jedna složka na epizodu
      brief.md              ← přehled, kanonické věty, linky na všechny soubory a media
      newsletter.md         ← text newsletteru
      carousel-copy.md      ← texty pro slajdy (pozastaveno, viz níže — pište jen na výslovné vyžádání)
      social-posts.md       ← posty k epizodě (OBSERVE, TEACH, ENGAGE)
      video-reel.md         ← script a produkční guide pro Reel (pokud vzniká)
      video-10sentences.md  ← 10 vět pro Reels formát
  social/
    plans/                  ← týdenní plány (přesahují epizody, zůstávají tady)
  newsletter/
    YYYY-MM-DD-nazev.md     ← pouze newslettery, které NEJSOU součástí epizody
```

**Zlaté pravidlo:** Pokud potřebuješ něco změnit (větu, frázi, text), otevři `episodes/NN-umelec/brief.md` — tam najdeš kanonické věty a linky na všechny ostatní soubory epizody.

---

## 0. Vytvoř složku epizody

Před jakýmkoliv psaním vytvoř složku a vyplň `brief.md`:

```
output/episodes/NN-umelec/
```

Do `brief.md` okamžitě zapiš:
- číslo epizody, kód (AB + číslo), obraz, umělec, rok, instituce
- gramatický cíl
- 3 kanonické věty (i jako placeholder — upřesní se při psaní obsahu)
- sekci Media s cestami (i prázdnými — vyplní se postupně)

Template: zkopírovat brief.md z nejnovější hotové epizody a upravit.

---

## 1. Připrav obsah

Otevři `lcenglish/research/art-bites-curriculum-2026.md` a podívej se na data pro danou epizodu.

Potřebuješ:
- [ ] Název díla a umělce (z curricula)
- [ ] Rok vzniku a instituce (z curricula)
- [ ] Ověřená fakta o díle/umělci (s odkazy na zdroje — nikdy nevymýšlet)
- [ ] 3 kanonické anglické věty s gramatickým cílem + zvýrazněnou částí + český překlad
- [ ] Gramatický vzorec a jednořádkovou poznámku k němu
- [ ] Real-life hook pro newsletter — reálný moment z Lenčina života; pokud chybí, nevymýšlet, nechat jako otevřený bod v brief.md

Jakmile jsou věty finální, zapiš je do `brief.md` do sekce Kanonické věty — tím se stávají zdrojem pravdy pro všechny ostatní soubory.

---

## 2. Stáhni obrázek

**Toto je automatický krok — Claude ho provede bez vyzvání při zahájení každé nové epizody.**

Zdroj: Wikimedia Commons (primární), Rijksmuseum, National Gallery, Met Museum — vždy public domain.

1. Najde přímý odkaz na JPG ve vysokém rozlišení
2. Stáhne jako `lcenglish/assets/paintings/jmeno-umelce-nazev-rok.jpg`
3. Zapíše cestu, zdroj a licenční poznámku do `brief.md` sekce Media

Konvence názvu obrazu: `jmeno-umelce-nazev-rok.jpg` — malá písmena, pomlčky, bez diakritiky.
Příklady: `vermeer-milkmaid-1658.jpg`, `hokusai-great-wave-kanagawa-1831.jpg`

**Thumbnail dělá Lenka sama v Canvě** — Claude do `brief.md` připraví jen sekci "Thumbnail — text pro Canvu" s přesným textem (vždy anglicky):

```
FULL ARTIST NAME IN CAPS: TITLE OF WORK IN CAPS
year, Gallery Name, City, Country
```

A řádek: `Pill (gramatický cíl): \`gramatika\``

Claude nestahuje obraz do žádné Remotion/render složky — tahle část pipeline se už nepoužívá (viz sekce Archiv níže).

---

## 3. Napiš newsletter a doprovodné soubory

- `newsletter.md` — hlavní výstup, jde do Dripu
- `social-posts.md` — posty k epizodě (pokud se plánují)
- `video-reel.md` / `video-10sentences.md` — jen pokud Reel skutečně vzniká

Carousel (`carousel-copy.md`) se nepíše automaticky ke každé epizodě — karusely jsou pozastaveny (téměř nulový dopad, rozhodnutí přehodnotit až po datech z Reelů). Psát jen na výslovné vyžádání.

---

## 4. Finalizuj epizodu

- [ ] `episodes/NN-umelec/brief.md` — zkontroluj kanonické věty, doplň všechny cesty k mediím, aktualizuj stav souborů
- [ ] `episodes/NN-umelec/newsletter.md` — finální text
- [ ] `episodes/NN-umelec/social-posts.md` — posty připraveny k publikaci (pokud se dělají)
- [ ] `output/social/plans/week-YYYY-MM-DD.md` — týdenní plán s daty a platformami (pokud se dělá)
- [ ] `research/art-bites-curriculum-2026.md` — epizoda zaznamenána (✅ hotovo)
- [ ] `projects/lcenglish-art-for-english.md` — next-action advancement + Aktuální stav

---

## Archiv: Remotion render pipeline (pozastaveno)

Na začátku série existoval pokus generovat carousel slidy a branded thumbnail přes Remotion (TSX kompozice per epizoda, render skriptem). Ukázalo se to jako neefektivní — pomalejší a horší výsledky než ruční práce v Canvě. **Tahle část se dnes nepoužívá vůbec, ani pro thumbnail, ani pro carousel.** Žádný krok nové epizody nepředpokládá kopírování obrazu do `system/tools/video-animations/public/`, vytváření TSX souboru nebo spouštění render příkazů.

Pokud by se karusely v budoucnu znovu aktivovaly, technické kroky (TSX vytvoření, registrace v Root.tsx, sync + render přes `setup-render.ps1` a `render-episode.js`) jsou zachované v historii lessons.md sekce "Rendering (Remotion)" — než se k tomu vracet, ověřit s Lenkou, že je to znovu žádoucí.
