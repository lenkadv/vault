---
name: shun-podcast
description: Zpracuj epizodu podcastu Japanese with Shun (【N5-N4】EpNNN) do Google Docu — paralelní text JA↔EN, přepis, přepis s furiganou, odkaz na video. Spouští se pokynem „/shun-podcast“, „nová epizoda Shun“, „zpracuj Shuna“ apod.
---

# Japanese with Shun — zpracování epizody

Studijní materiál k japonštině (area [[japanese]]). Založeno 260926.

## Cíl a umístění
- Složka na Disku: `1iEEvFYwYAlgz8L1Huw-q4qH9z02czTN6` (https://drive.google.com/drive/folders/1iEEvFYwYAlgz8L1Huw-q4qH9z02czTN6)
- Jeden Google Doc na epizodu, **název = jen číslo dílu** (např. `276`)
- Zdroj epizod: jen hlavní podcast „【N5-N4】EpNNN … / Japanese Podcast for Beginners“
  (playlist „Japanese with Shun (Podcast)“). **Ne** Oyasumi (#NNN), vlogy, shorts.

## Postup

### 1. Výběr epizody
1. Vypsat obsah složky na Disku (`search_files`, `parentId = '<id složky>'`, `excludeContentSnippets: true`)
   → čísla z názvů dokumentů = zpracované epizody.
2. Spustit ze složky skillu:
   `python shun_fetch.py --processed <čísla oddělená čárkou> > <scratchpad>/epNNN.json`
   Skript vybere **nejvyšší nezpracované číslo** = nová epizoda, pokud vyšla; jinak nejbližší
   nezpracovaná směrem do minulosti (pravidlo od Lenky 260926). Konkrétní díl: `--ep NNN`.
   Pozn.: playlist přes yt-dlp vrací jen prvních 100 dílů, proto skript čte záložku Videos kanálu
   (`--limit 150` ≈ posledních ~60 epizod; pro starší zvýšit).
3. Lence krátce říct, kterou epizodu bereme a proč (nová / spádem dozadu).

### 2. Úprava auto-titulků (varianta B — Lenka nechce ruční přepis přes Voicenotes)
Z `lines` v JSON sestavit data epizody (formát viz níže):
- spojit fragmenty rozsekané titulky do celých vět, doplnit interpunkci （、。？）
- rozdělit do odstavců podle témat
- opravit **zjevné** chyby rozpoznávání řeči z kontextu (homofony 行きる/生きる, vynechané jméno,
  „しと日本語“ → シュンと日本語, zkomolené „A“ → AI, Shunovy samoopravy za běhu)
- **každou opravu zapsat do `corrections`** — Lenka je musí vidět; co není jisté, označit „ověřit poslechem“
- nevymýšlet obsah; výplňová slova (え、うん、まあ) ponechat — jsou součást mluvené japonštiny
- odstranit `[音楽]`, `[ため息]` apod.
- anglický vstup (poděkování, Patreon, reklama na kurz) do přepisu nepřepisovat — jen poznámka `english_segment_note`
- seznam slovíček („Words and phrases used in this episode“) bývá v titulcích silně zkomolený → rekonstruovat
  a v `corrections` uvést, že je rekonstruovaný

### 3. Překlad + furigana
- Každá věta: anglický překlad — přirozený, ale věrný (studijní účel, ne volné přebásnění).
- Čtení kanji vyznačit přímo v japonském textu značkou `{漢字|かな}` u **každého** výskytu.
  Kontrolovat kontextová čtení (今日=きょう, 一人=ひとり, 何=なに/なん, 1000倍=せんばい, 10年前=じゅうねんまえ…).

### 4. Sestavení a nahrání
1. `python shun_build.py <scratchpad>/epNNN.json > <scratchpad>/epNNN.html`
2. Nahrát: `create_file` (konektor neumí přepsat obsah existujícího Docu — oprava = nový dokument
   a starý smaže Lenka) — `title: "NNN"`, `parentId: <id složky>`, `contentMimeType: text/html`,
   `textContent: <obsah HTML>` → Disk převede na Google Doc.
3. Ověřit `read_file_content`, že tabulka i všechny sekce prošly.
4. Lence poslat odkaz + seznam oprav k ověření.
5. **Připomínka podpory Shuna** — spočítat dokumenty ve složce (po nahrání). Je-li jich **10 a víc**
   a sekce „Podpora autora“ níže ještě neříká, že je vyřešeno → na konci odpovědi Lence připomenout.

## Podpora autora (Lenka 260926)
Zpracováváním Shunových epizod využíváme jeho práci, ze které žije. Lenka se mu chce odvděčit,
zatím se ale nechce zavazovat, dokud neví, jak moc materiál bude používat.
- Možnosti: jednorázový příspěvek na **Ko-fi** (https://ko-fi.com/japanesewithshun) nebo předplatné
  na **Patreonu** (https://www.patreon.com/Japanesewithshun, tam je i jeho oficiální přepis).
- **Kdy připomenout:** při 10 zpracovaných epizodách ve složce (a pak znovu při každé další,
  dokud to Lenka nevyřeší). Připomínku formulovat věcně: kolik epizod je hotových, obě možnosti
  a otázka, co z toho zvolí — vyhodnotí podle toho, jak moc s materiálem pracuje.
- Stav: **nevyřešeno** (zpracováno 2 epizody k 260926: 276, 275). Po rozhodnutí sem zapsat, co Lenka zvolila.

## Struktura dokumentu (pořadí dle Lenky 260926)
1. Nadpis `EpNNN – název` + řádek s datem vydání/zpracování a zdrojem
2. **Paralelní text** — tabulka 日本語 | English, jedna věta na řádek; pod japonskou větou celá věta
   v kaně šedým menším písmem (jen u vět s kanji). Záhlaví orámované, řádky s větami **bez čar**
   (Lenčiny úpravy 260926 — řeší generátor, ručně nic neupravovat)
3. **Přepis** — souvislý text bez furigany (vč. seznamu slovíček z epizody)
4. **Přepis s furiganou** — čtení v závorce za kanji, menším šedým písmem: 漢字（かんじ）
5. Opravy oproti automatickým titulkům
6. **Odkaz na video**

## Formát dat (epNNN.json)
```json
{
 "ep": 276, "title": "<plný název videa>", "url": "https://www.youtube.com/watch?v=…",
 "upload_date": "YYMMDD", "processed": "YYMMDD",
 "paragraphs": [ [ ["{日本語|にほんご}の{文|ぶん}。", "English sentence."], … ], … ],
 "vocab_after_paragraph": 7,
 "vocab": [ ["{成長|せいちょう}する", "to grow"], … ],
 "english_segment_note": "(anglický vstup … — vynecháno)",
 "corrections": ["しと日本語 → シュンと日本語 (…)", …]
}
```
Vzor: první zpracovaná epizoda 276 (Google Doc „276“ ve složce).

## Zatím NE (rozhodne se podle praxe)
- samostatný seznam slovíček / Anki balíček
- gramatické poznámky (Lenka chce, forma se teprve vymyslí)
