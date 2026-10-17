---
databanka: true
zdroj: Grow On Repeat
typ: tutoriál
rok: 2026
pro:
  - vlastní
  - DigiStart
  - lcenglish
  - tadylenka
tema:
  - marketing
  - skilly
  - GrowOS
  - prodejní stránka
pouzij_kdyz: "nevíš, jak GrowOS funguje (fronta, stavy, brain, Obsidian), chceš postavit vlastní skill, nebo píšeš prodejní stránku kurzu o AI"
stav: prohlédnuto
nainstalovano: ne
verdikt: ""
soubor: "Databanka AI/Grow On Repeat GrowOS 261018/00 REJSTRIK – kurz GrowOS.md"
---

# Kurz GrowOS (Wilco de Kreij, Grow On Repeat)

**Použij, až:** nevíš si rady s GrowOS (jak se předávají výstupy, kdy kontrolovat, jak se plní brain), chceš GrowOS naučit nový postup, nebo píšeš prodejní stránku pro DigiStart.

Videokurz autora GrowOS, 29 lekcí v šesti částech. Úvodní část je ještě z verze 1.0 (březen 2026). Pro 2.0 je důležitá poslední část „GrowOS 2.0“, hlavně lekce **GrowOS in Obsidian** (fronta, kanban, stavy). Nainstalované skilly GrowOS jsou zvlášť v [[Databanka.base]] (složka `GrowOS/`).

[Otevřít rejstřík](<file:///G:/Můj disk/Databanka AI/Grow On Repeat GrowOS 261018/00 REJSTRIK – kurz GrowOS.md>) · [Rozbor prodejní stránky](<file:///G:/Můj disk/Databanka AI/Grow On Repeat GrowOS 261018/Prodejní stránka GrowOS – rozbor.md>) · [Kurz](https://www.growonrepeat.com/dashboard/growos/1/1) · [Prodejní stránka](https://www.growonrepeat.com/growos)

## Jak to vysvětlit (na Lenčině systému)
- **Dvě složky v každém byznysu.** `brain/` = co firma ví (business, voice, audience, lessons…), `work/` = co se vyrobilo. Příklad: `GrowOS/digistart/brain/` a `GrowOS/digistart/work/`. Lekce Obsidian: „všechno jsou obyčejné soubory“, proto je vidíš v Obsidianu i bez GrowOS.
- **Brain** se plní při setupu (a ze složky `add-to-brain/`) a potom jen tehdy, když do něj něco zapíše skill, Claude nebo Lenka ručně. Sám se neaktualizuje a Doktor kontroluje jen strukturu, ne zastaralost. Proto 18. 10. zůstalo v brainu DigiStart „FB stránka neexistuje“, i když byla den předtím založená. Proto existuje kontrola brainu při „zavírám“ (krok 5a v `CLAUDE.md`). Ruční oprava v brainu platí hned od další práce.
- **Fronta není aplikace, ale filtr.** Každý výstup je jeden soubor v `work/<kanál>/` a nahoře má hlavičku se `status`. `GrowOS Queue.base` sbírá všechny tyto soubory ze všech byznysů. Na Lenku čeká jen to, co má `status: review` (pohled „Waiting for you“). Prodejní stránka DigiStart je v `draft`, takže ve frontě vidět není.
- **Stavy** (stejné jako v kurzu): `draft` (Claude ještě dělá) → `review` (čeká na Lenku) → `approved` (ano) / `changes` (oprav, důvod v poli `note`) / `rejected` (zahodit) → `published` (vydáno). Kontrolovat stačí, když je něco v `review`: v Obsidianu pohled „Waiting for you“, nebo v chatu „co čeká na kontrolu“ (skill `review-queue`).
- **Víc počítačů.** GrowOS leží ve vaultu na Google Disku a vault je v gitu. Podle průvodce Multi-Device by Disk na druhém počítači musel být v režimu zrcadlení, jinak chybí skryté složky (`.claude/`, `.growos/`); spolehlivější je git.
- **Nástěnka.** V kurzu autor instaluje komunitní plugin **Base Board** a přetahuje karty mezi sloupci; přetažení přepíše `status` v souboru. U Lenky plugin nainstalovaný není; `GrowOS Queue.base` má pohled „Board“ (karty seskupené podle stavu, s obrázkem) a funguje bez pluginu. Kanban s přetahováním by vyžadoval, aby si Lenka plugin nainstalovala sama (AI to nedělá).
- **Učení z oprav.** V kurzu: tři úrovně, (1) oprava → poučení do `lessons`, (2) „uprav i skill“, (3) vzorky + „vyzpovídej mě“. U Lenky: po „changes“ skill `review-queue` navrhne jednou větou poučení o stylu psaní; po „ano“ jde do `brain/lessons/` (příklad `GrowOS/lcenglish/brain/lessons/261005-fb-upoutavka.md`). Když se stejný návyk objeví třikrát a Lenka ho neodmítla, zapíše se sám. Učí se jen styl psaní, ne fakta, publikování ani nastavení. Samotný přesun na `approved` poučení nevytváří, jen zamrazí schválenou verzi pro publikování.

## Poznámky z použití
- 261017–18: přečteny popisy lekcí 2.0 a přepis lekce „How the System Works“. Rozbor prodejní stránky jako vzor pro DigiStart.
- 261018: z přepisů zpracováno šest lekcí (6/1–6/4, Feedback Loop, Build Your Own Workflow), soubor na lekci ve složce kurzu. Obě PDF (Setup & Upgrade Guide 6/5, Multi-Device & Teams 5/3) uložila Lenka do `02 EDUCATION 📚/Kurzy – AI a marketing/GrowOS/`, poznámky jsou ve složce kurzu. Opraveno: dřívější věta, že poučení vznikají z přesunu na `approved` (u Lenky vznikají z „changes“).
