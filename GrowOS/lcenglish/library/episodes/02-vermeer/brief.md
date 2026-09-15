---
episode: 2
code: AB2
painting: Mlékařka / The Milkmaid
artist: Johannes Vermeer
year: 1658
institution: Rijksmuseum, Amsterdam
grammar: There is / There are + předložky místa
publish-newsletter: 2026-04-21
publish-carousel: 2026-04-23
---

# Epizoda 02 — Vermeer: Mlékařka

## Kanonické věty (zdroj pravdy — změna zde = update ve všech souborech)

| # | Anglicky | Highlight | Česky |
|---|---|---|---|
| 1 | There is **bread** on the table. | bread | Na stole leží chléb. |
| 2 | There is a **window** on the left side of the room. | window | Na levé straně místnosti je okno. |
| 3 | There are **tiles** on the wall. | tiles | Na zdi jsou dlaždičky. |

---

## Obsah epizody

| Soubor | Popis | Stav |
|---|---|---|
| [newsletter.md](newsletter.md) | Newsletter Art for English #2 | ✅ odesláno v Dripu 21. 4. 2026 |
| [carousel-copy.md](carousel-copy.md) | Texty pro carousel (8 slidů + caption) | 📝 draft — čeká na render |
| [social-posts.md](social-posts.md) | Posty k epizodě (OBSERVE, TEACH, ENGAGE) | 📝 draft — plánováno 20.–26. 4. |
| [video-reel.md](video-reel.md) | Script a produkční guide pro Reel | 📝 ready to record |
| [video-10sentences.md](video-10sentences.md) | 10 vět pro Reels formát (verze A + B) | 📝 draft |

---

## Media — soubory a cesty

### Obraz
- Originál: `lcenglish/assets/paintings/vermeer-milkmaid-1658.jpg` ⚠️ stáhnout
- Zdroj: `https://www.rijksmuseum.nl/en/collection/SK-A-2344` — tlačítko Download, nejvyšší rozlišení
- Pro Remotion: `system/tools/video-animations/public/vermeer-milkmaid-1658.jpg`

### Carousel — rendery
Složka: `lcenglish/output/social/carousels/2026-04-23-art-for-english-2-vermeer/` ⚠️ zatím prázdná
- `slide-01.png` … `slide-08.png`
- `ig-teaser.png` — IG Story teaser
- `fb-teach.png` — Facebook Teach post vizuál
- `nl-thumb.png` — Thumbnail pro newsletter

### Audio (pro carousel, slajdy 4–6 se renderují jako MP4)
Složka: `system/tools/video-animations/public/ab2/` ⚠️ zatím prázdná
- `audio_1.mp3` — "There is bread on the table."
- `audio_2.mp3` — "There is a window on the left side of the room."
- `audio_3.mp3` — "There are tiles on the wall."

### Reel
- Script + produkční guide: [video-reel.md](video-reel.md)
- Výstup po natočení: `lcenglish/output/video/2026-04-23-vermeer-reel-final.mp4`

### Remotion
- TSX: `system/tools/video-animations/src/compositions/ArtBite2Vermeer.tsx`
- Render příkaz: `node render-episode.js AB2 2026-04-21-vermeer-mlekarka`
