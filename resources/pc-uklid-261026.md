# Lokální disk C: — mapa a návrh úklidu (261026)

Podklad: průchod celým `C:\Users\Lenka` a dalšími složkami na C: (793 tis. souborů) a srovnání s `G:\Můj disk` (35 tis. souborů). Porovnávala jsem **název + velikost souboru**, obsah jsem neotvírala. Google Disk jsem neorganizovala, jen jsem ho použila ke srovnání.

**Nic jsem nepřesunula ani nesmazala.** Tohle je jen návrh.

Seznamy souborů: [[pc-duplicity-s-diskem-261026.csv]] (lokálně i na Disku, 10 444 souborů), [[pc-duplicity-uvnitr-c-261026.csv]] (dvakrát na C:, soubory nad 5 MB).

Navazuje na [[disk-reorganizace-261004]] (Google Disk) a projekt [[disk-reorganizace]].

## 1. Shrnutí

| | |
|---|---|
| Disk C: | 931 GB, **volno 36,6 GB (4 %)** — ⚠️ skoro plný |
| Tvoje data v `C:\Users\Lenka` | 770 GB |
| z toho `Documents` | 518 GB (99 tis. souborů) |
| Google Disk (G:) | streamovací režim, ve skutečnosti 73 GB; v počítači zabírá jen mezipaměť 12 GB |
| Přesné duplicity lokálně × Disk | **10 444 souborů, 12,9 GB** |
| Duplicity uvnitř C: (nad 5 MB) | 496 skupin, **11,2 GB** zbytečně |

**Hlavní zjištění:**

1. **`C:\Users\Lenka\Disk Google (nesynchronizuje se)` (70,5 GB)** je stará zrcadlová kopie Disku z roku 2021. Od přechodu na streamování se nesynchronizuje (potvrzeno v nastavení Disku Google: `old_mirrored_my_drive_path`). Jen asi 7 GB z ní je na Disku dodnes, zbytek se mezitím z Disku smazal nebo přesunul.
2. **Disk C: nemá zálohu.** 518 GB v `Documents` (fotky 2007–2022, surová videa LCEnglish, nahrávky Camtasia, kurzy) existuje jen tady. Jsou to unikátní data, ne kopie. ⚠️ Při poruše disku jsou pryč.
3. **Velké zbytky, které nikdo nepoužívá:** nedokončený upload Disku z roku 2019 (8,6 GB), knihovna her Steam (22,9 GB), instalačky a ISO v Downloads (~14 GB), 1 275 souborů v Downloads starších než rok (33 GB).
4. **`Camtasia Studio` (96 GB)** jsou surové nahrávky obrazovky `.trec` z let 2021–2026, nejvíc 2022–2023 (71 GB).

## 2. Duplicity s Google Diskem

Tohle je odpověď na otázku, co máme zbytečně dvakrát. Platí: na Disku zůstává, lokální kopie jde pryč.

| Lokálně | Velikost | Na Disku je v | Návrh |
|---|---|---|---|
| `Disk Google (nesynchronizuje se)\3_ LCEnglish 🎬` (8 689 souborů) | 4,5 GB | `03 LCEnglish/Products/HELE/HELE ASSETS`, `Zálohy webů/Teachable 261025` | smazat |
| `Disk Google (nesynchronizuje se)\2_ EDUCATION 📚` (353 souborů) | 2,4 GB | `02 EDUCATION/Jazyky`, `Kurzy – AI a marketing`, `Kurzy – ostatní` | smazat |
| ostatní části staré kopie (PRIVATE, F2F, RESEARCH, Easy Voice Recorder) | 0,3 GB | odpovídající složky `01`, `06`, `07` | smazat |
| `Downloads` — volné soubory (87, hlavně zipy přednášek KTF, Jazyky) | 1,7 GB | `02 EDUCATION/KTF`, `Jazyky`, `Literatura…` | smazat |
| `Music` — Igor Levit (Beethoven) a On_DSCH, rozbalené | 1,3 GB | `01 PRIVATE/Hudba` | smazat (i zipy vedle, 3,7 GB) |
| `Documents\online kurzy vlastní` (55 souborů) | 0,6 GB | `03 LCEnglish/Products`, `05 Další online kurzy/Products` | smazat jen tyto soubory |
| `Documents\Lights Camera English` (35 souborů) | 0,5 GB | `03 LCEnglish/Brand Elements`, `Products` | smazat jen tyto soubory |
| `GrowOS-migration` (záloha GrowOS 0.1 z 260906 + zip) | 0,8 GB | `vault/GrowOS`, `vault/archive` | smazat celé |
| `Documents\vault_old záloha` | 0,3 GB | `vault` (a vault má git) | smazat celé |
| `Documents\klavír` | 0,1 GB | `02 EDUCATION/Kurzy – ostatní` | smazat |
| `Documents\Evaluace archiv` | malé | `06 F2F BIZ/ZZ Archiv` | smazat |
| `Downloads\GrowOS-2.0.0`, `Downloads\Productivity Skills Pack`, font bakerie | malé | `vault/GrowOS`, `Databanka AI/Originály skillů 260929`, `03 LCEnglish/Brand Elements` | smazat |

**Nechat, i když je to i na Disku:** `Zotero\storage` (Zotero ho potřebuje), `source\repos` a `tools\imap-mini-mcp` (shoda jen v drobných souborech gitu).

Celkem duplicity s Diskem: **~13 GB**.

### Zbytek staré kopie Disku (63 GB, na Disku už není)

| Co | Velikost | Návrh |
|---|---|---|
| Seriály `Why Women Kill S2`, `Normal People`, `Schitts Creek S2` (staženo 2021) | 27,4 GB | smazat |
| `2_ EDUCATION\Growth University\Webinar Swipe File` (2019–2020, většina videí 2–3× jako „Copy of…“) | 23,3 GB | podle pravidla „marketing starší 3 let → archiv“: smazat, nebo jednu kopii na externí disk |
| `3_ LCEnglish\Products\HELE` — assety epizod E02–E17 (Lesson Notes .mp4, Final Cut) | 12,2 GB | **ověřit**: část je i v `Documents\Lights Camera English\HELE` (2,65 GB shodných souborů). Nechat jednu kopii u ostatních surových videí LCEnglish |
| `1_ PRIVATE\obrázky`, drobnosti | 0,3 GB | projít s tebou |

Když se tohle provede, celá složka `Disk Google (nesynchronizuje se)` zmizí.

## 3. Úklid zbytku disku C:

### A. Bez rizika (asi 55 GB)

| Co | Velikost | Proč |
|---|---|---|
| `Documents\.tmp.drivedownload` (2019) | 8,6 GB | nedokončený upload starého Disku |
| `Documents\Archiv\SteamLibrary` (2019) | 22,9 GB | hry; smazat, pokud už nehraješ |
| Downloads: instalačky `.exe/.msi`, DaVinci Resolve zipy, Manjaro `.iso` | ~14 GB | programy jsou nainstalované nebo nepotřebné |
| `Music` — zipy, ze kterých už je rozbalená hudba | 3,7 GB | duplicita |
| Kopie „Copy of…“ a dvojí soubory uvnitř C: | ~6 GB | viz CSV; hlavně `Fotky a videa` (4,4 GB), `online kurzy absolvované` |

### B. K tvému rozhodnutí (velké archivy, ~400 GB)

Tady nejde o duplicity, ale o unikátní staré věci. Možnosti: smazat, nebo přesunout na **externí disk** (ten zároveň vyřeší chybějící zálohu).

| Co | Velikost | Poslední změna | Můj návrh |
|---|---|---|---|
| `Documents\Fotky a videa\Fotky archiv` (2007–2022) | 117 GB | 2025 | **nemazat**; ověřit, jestli jsou v Google Fotkách. Pokud ne → externí disk jako záloha |
| `Documents\Camtasia Studio` (121 nahrávek `.trec`) | 96 GB | 2026 | nahrávky 2021–2024 (86 GB) smazat nebo na externí disk; 2025–2026 nechat |
| `Documents\Lights Camera English` (10x English surová videa 2019, HELE) | 47 GB | 2022 | externí disk |
| `Documents\online kurzy vlastní` (Wwebinar 2019 32 GB, 10x English, 5denní výzva) | 42 GB | 2020 | externí disk |
| `Documents\online kurzy absolvované` (PVA, Matt Kloskowski, Zach Spuckler…, 2018–2021) | 38 GB | 2022 | pravidlo 3 let → smazat, nebo externí disk |
| `Documents\Archiv` bez Steamu (publicspeaking.cz 21 GB, Knížky od MJ, Accent training…) | 36 GB | 2020 | externí disk |
| `Documents\video projekty archiv` (BTM, staré Camtasia) | 26,5 GB | 2026 | externí disk |
| `Documents\jazyky\Japanese` | 20 GB | 2021 | **ověřit** s tebou (japonštinu děláš) |
| `Documents\Zoom` (nahrávky AI workshopů 2022–2024) | 18 GB | 2024 | externí disk, nebo smazat to, co už nepotřebuješ |
| Lightroom (`Documents\Adobe\Lightroom` + `Lightroom catalog archiv`) a Luminar katalogy | 33 GB | 2021 | používáš ještě Lightroom/Luminar? Jinak náhledy smazat |
| `Videos\kliky\E10 Slow.avi` | 7,5 GB | 2021 | smazat (pracovní render) |
| Downloads: 1 275 souborů starších než rok | 33 GB | — | projít po skupinách (PDF knih → knihovna na Disku; zipy KTF rozbalené jinde) |

### C. Aplikace a mezipaměti (jen pro přehled)

Chrome 17 GB, Claude 11 GB, mezipaměť Disku Google 12 GB, Microsoft Teams 3,7 GB, Anki 4,8 GB, Notion 3,5 GB. Nic z toho nemazat ručně; Chrome a Teams jde vyčistit v jejich nastavení.

## 4. Návrh pravidel a struktury na C:

**Pravidlo:** pracovní dokumenty žijí na Google Disku. Na C: zůstává jen to, co na Disk nepatří:
- programy a jejich data (AppData, Zotero, Anki),
- pracovní složky nástrojů (`pech-work`, `pech-export`, `meto-work`, `fakturace`, `lce-render`, `tools`, `source`) — **neměnit**; vault na lokální cesty odkazuje v [[studies]] (`pech-work`), [[kontext-ukolu]] (`Documents\Zoom`) a [[penta-hacked-list-report]] (dva soubory v `Downloads`, ty před úklidem Downloads přesunout a odkaz opravit),
- velká média, která by Disk zahltila (surová videa, archiv fotek) — dokud nejsou na externím disku.

**Struktura `Documents`** podle kódů z Disku, aby se věci hledaly stejně:

```
Documents\
  01 PRIVATE\          ← Fotky a videa (archiv fotek), Hudba
  02 EDUCATION\        ← online kurzy absolvované, jazyky
  03 LCEnglish\        ← Lights Camera English, online kurzy vlastní, video projekty archiv
  05 Další online kurzy\ ← Zoom nahrávky workshopů
  ZZ ARCHIV\           ← Archiv (publicspeaking.cz, Knížky od MJ…)
  + aplikační složky beze změny: Camtasia Studio, Zoom (výchozí cesta), Adobe, Wondershare, My Kindle Content, Audacity, MiniTool…
  + pracovní složky nástrojů beze změny: pech-work, pech-export, meto-work, fakturace, ynab
```

`Downloads` = jen dočasné věci; jednou měsíčně vyprázdnit (do denního plánu se to dá přidat jako pravidelná věc).

## 5. Postup

1. **Fáze 1 — duplicity s Diskem a odpad (A):** přesunu do `C:\Users\Lenka\00 Ke smazání\`, ty ji vysypeš (z koše, ať se uvolní místo). Log `resources/pc-presuny-log-261026.csv`. Uvolní ~68 GB.
2. **Fáze 2 — stará kopie Disku:** seriály a Growth University podle tvého rozhodnutí, HELE assety sloučím s `Lights Camera English`.
3. **Fáze 3 — externí disk:** pokud ho máš, přesunout tam archivy z tabulky B (záloha + místo).
4. **Fáze 4 — struktura `Documents`** podle kódů.

Před každou fází: tabulka odkud → kam a tvůj souhlas.

## 6. Fáze 1 — plán přesunů (261026)

**Provedeno 261026:** Lenka schválila skupiny 1–8, Steam (9) zůstává na místě. Přesunuto 20 087 souborů (48,8 GB) do `C:\Users\Lenka\00 Ke smazání\`, bez chyb; 1 634 prázdných složek po přesunu odstraněno. Log: [[pc-presuny-log-261026.csv]]. Místo se uvolní až po vysypání koše (maže Lenka).

**Oprava 261026 odpoledne:** u skupiny 5 jsem přesouvala celé složky, ale ne všechny jejich soubory byly na Disku. Ověřeno a napraveno (záznamy „Záchrana“ v logu):
- `Evaluace archiv`: 2 soubory Olympus, které na Disku chyběly, přesunuty do `06 F2F BIZ/ZZ Archiv/Olympus` (třetí tam je pod názvem s pomlčkou).
- `Productivity Skills Pack` = původní balíček AI Black Magic (15 skillů, 13 neupravených) → zkopírován do `Databanka AI/Originály skillů 260929/Productivity Pack – stažený balíček 260523`, opraveno `00 CO TU JE.md` tamtéž.
- `vault_old záloha` (vault do 260523, před gitem) a `growos-0.1-backup-260906` (novější než zip před migrací) → zabaleny do `vault/archive/` (zipy ověřeny).
- Skupiny 3 a 6 ověřeny proti Disku: všechno tam je. Lenka složku `Music` v karanténě už smazala, nic se neztratilo.
- Skupina 9 (Steam, 21,4 GB) přesunuta taky, Lenka 261026 16:01 („hry nehraju, dají se stáhnout znova“).

Přehled obsahu je přímo v karanténě: `C:\Users\Lenka\00 Ke smazání\00 CO TU JE.md`. Zbývá ~62 GB ke smazání.

Cíl všech přesunů: `C:\Users\Lenka\00 Ke smazání\` se zachovanou původní cestou (např. `…\00 Ke smazání\Downloads\camtasia.exe`), takže jde cokoli vrátit. Seznam po souborech: [[pc-presuny-plan-faze1-261026.csv]].

| # | Co | Souborů | Velikost |
|---|---|---|---|
| 1 | Stará kopie Disku: soubory, které jsou přesně stejně na G: | 9 179 | 7,1 GB |
| 2 | Downloads: volné soubory, které jsou na G: (KTF, Jazyky, Literatura, LCEnglish, PENTA Transgas.mp4…) | 87 | 1,7 GB |
| 3 | Music: rozbalené Igor Levit 1–9 a On_DSCH (jsou v `01 PRIVATE/Hudba`) | 151 | 1,7 GB |
| 4 | Music: zipy, ze kterých je hudba rozbalená (`On_DSCH flac.zip` zůstává, rozbalený není) | 11 | 3,7 GB |
| 5 | Celé složky: `GrowOS-migration`, `Documents\vault_old záloha`, `Documents\Evaluace archiv`, `Downloads\GrowOS-2.0.0`, `Downloads\Productivity Skills Pack`, font bakerie | 10 462 | 1,1 GB |
| 6 | Documents: jednotlivé soubory na G: (`online kurzy vlastní`, `Lights Camera English`, `klavír`) | 104 | 1,2 GB |
| 7 | `Documents\.tmp.drivedownload` (nedokončený upload 2019) | 2 | 8,6 GB |
| 8 | Downloads: instalačky `.exe/.msi`, Manjaro `.iso`, DaVinci Resolve (zip i rozbalené), M50 | 91 | 23,7 GB |
| 9 | `Documents\Archiv\SteamLibrary` (hry 2019) — jen na výslovné ano | 15 813 | 22,9 GB |
| | **Celkem** | 36 000 | **71,7 GB** |

## 7. Fáze 2 — zbytek staré kopie Disku (261026)

**Provedeno 261026 16:15, rozhodnutí Lenky:** A smazat; B nechat jednu sadu (k rozhodnutí při procházení marketingových kurzů); C1 smazat, C2 nechat; D1 smazat včetně občanky; D2 zachránit. Výsledek (bez chyb, log `pc-presuny-log-261026.csv`, řádky „Fáze 2“):
- do `00 Ke smazání`: A 27,4 GB, B 11,4 GB (67 kopií, shoda ověřena podle obsahu MD5), C1 2,7 GB, D1 0,3 GB;
- Growth University, jedna sada (197 souborů, 11,8 GB) → `C:\Users\Lenka\Documents\online kurzy absolvované\Growth University\Ze staré kopie Disku\`;
- HELE C2 (91 souborů, 9,6 GB) → `C:\Users\Lenka\Documents\Lights Camera English\HELE\Ze staré kopie Disku\`;
- D2 (6 souborů) → `G:\Můj disk\00 INBOX\Ze staré kopie disku C\` (k zatřídění);
- složka `Disk Google (nesynchronizuje se)` je prázdná; smazat ji nešlo, drží ji jiný proces (nejspíš Disk Google, který ji hlídá) → smaže Lenka, nebo po restartu.

Volno na C: po přesunech 84,5 GB (zatím bez vysypání karantény). Po vysypání `00 Ke smazání` (Lenka 261026): **118,2 GB**.

## 9. Fáze 3 — kandidáti na zálohu (261026)

**Provedeno 261026 17:00** (Lenka: „vyčleň do zvláštní složky“): 158 přesunů bez chyb do `C:\Users\Lenka\ZZ K záloze\`, rozděleno podle kódů Disku (01 PRIVATE, 02 EDUCATION, 03 LCEnglish, 05 Další online kurzy, ZZ ARCHIV). Celkem **442 GB, 40 294 souborů**. Index všech souborů: [[pc-k-zaloze-index-261026.csv]]; přehled přímo ve složce `00 CO TU JE.md`; log `pc-presuny-log-261026.csv` (řádky „Fáze 3“).

Záměrně nepřesunuto: `jazyky\Japanese` (aktivní studium), `Documents\Adobe\Lightroom` (katalog aplikace), Camtasia 2025–2026, Zoom `2022-07-27 SUPERworkshop` (mylně jako otevřený úkol — hotovo už 261025: video na YouTube `SXY8KDRSKNI` jako neveřejné, `/superworkshop-zaznam/` → 301, ověřeno znovu 261026 17:58; místní nahrávka v `Documents\Zoom` je tedy kopie), `Fotky se mnou`, `Videos\kliky` (návrh smazat, nerozhodnuto).

261026 17:00: Growth University (jedna sada, 197 souborů, 11,3 GB) přesunuta na `G:\Můj disk\02 EDUCATION 📚\Kurzy – AI a marketing\Growth University` (Lenka); v `ZZ K záloze` zbývá ~431 GB.

Další krok: rozhodnout, kam zálohovat (cloud / disk / smazat) — Lenka má s externími disky špatnou zkušenost (nepořádek, poruchy), cloud = trvalý poplatek.

## 10. Roztřídění `ZZ K záloze` (261026, návrh, čeká na Lenku)

Po přesunu Growth University na Disk je ve složce **430 GB**. Growth University: 96 souborů na `G:\02 EDUCATION\Kurzy – AI a marketing\Growth University`, 101 odkazů na Google dokumenty (místní `.gdoc` byly jen odkazy bez obsahu) v `00 Odkazy na Google dokumenty.md` tamtéž; 5 souborů `.gshortcut` se na Disk zkopírovalo jako běžné soubory (neškodí, nefungují).

Pravidlo návrhu: **cloud** = nenahraditelné osobní; **jeden disk + index** = vlastní tvorba, která se může hodit; **smazat** = cizí kurzy starší 3 let a nahraditelné věci.

| Návrh | Co | Velikost |
|---|---|---|
| ☁️ cloud | `01 PRIVATE\Fotky archiv` (2002–2025; 11 057 JPG, 3 188 RAW .pef + .cr3/.nef/.dng, 160 TIF, videa 28 GB). 2 027 RAW má vedle sebe JPG (19,7 GB) — RAW je originál, nechat obojí | 117 GB |
| 💽 disk | `03 LCEnglish\Lights Camera English` (10x English surové 2019 33,6 GB, HELE 18,1 GB, FB, Webinar2103, bloopers…) | 56 GB |
| 💽 disk | `03 LCEnglish\online kurzy vlastní` (Wwebinar 2017–19 32,3 GB, 10x English 4,4 GB, 5denní výzva 4,9 GB) | 42 GB |
| 💽 disk | `03 LCEnglish\video projekty archiv` (BTM 2018 11 GB, staré Camtasia 8 GB, ostatní 7,4 GB) | 27 GB |
| 💽 disk | `ZZ ARCHIV\…\publicspeaking.cz` (2016–2020, vlastní byznys) | 21 GB |
| 💽 disk | `05\Zoom nahrávky` (vlastní AI workshopy a webináře 2020–2025) | 20 GB |
| ❓ rozhodni | `03 LCEnglish\Camtasia nahrávky 2020–2024` (96 surových nahrávek obrazovky .trec). Pokud hotová videa žijí ve FreshLearnu / na YouTube, navrhuji smazat — neověřeno | 86 GB |
| ❓ rozhodni | `ZZ ARCHIV\…\Knížky od MJ` (mp3, 2014–2020) a `Media z telefonu` (2014, mp3/m4a) — nevím, co to je | 8 GB |
| ❓ rozhodni | `01 PRIVATE\Lightroom catalog archiv` (katalog 2009–2016 s náhledy; má smysl jen s Lightroomem, úpravy fotek v něm) | 6 GB |
| 💽 disk | `ZZ ARCHIV\…\Accent training` (2019–2020) — **vlastní tvorba**: dabing a stínování (Erin Brockovich, Kristen Bell, Notting Hill), projekty Premiere a Camtasie, záběry z kamery | 2,9 GB |
| ➡️ na Disk | Amy Porterfield (Lenka 261026: nechat) — `online kurzy absolvované\Amy Porterfield DCA` (0,3 GB) + `online marketing\Amy Porterfield` a `Amy Porterfield's Strategy & MP3.zip` (0,6 GB) → návrh `G:\02 EDUCATION\Kurzy – AI a marketing\Amy Porterfield` (jako Growth University) | 0,9 GB |
| ❓ rozhodni | `ZZ ARCHIV\…\online marketing` bez Amy: materiály z kurzů a freebies 2018–2020 (Danny Iny 0,3, Michelle Evans 0,2, David Siteman Garland 0,15, WebinarJam, Joanna Wiebe, Olly Richards, Zach Spuckler, Leadpages, GDPR, kniha Authority…) | 1,3 GB |
| 🗑️ smazat | `02 EDUCATION\online kurzy absolvované`: PVA = Primal Video Accelerator (Justin Brown; YouTube ranking 11,9 GB, natáčení a střih na mobilu, najímání střihače, budování e-mailového listu; 2018), Matt Kloskowski (8,7), Zach Spuckler (6,9), Jasmine Star (5,4), Premiere Skillshare (2,1), Webinars that convert — vše 2018–2021 | 40 GB |
| 🗑️ smazat | `ZZ ARCHIV\…`: Icons (1,7), Lettering and Calligraphy (0,4) + drobnosti | 2,4 GB |

Součty (po úpravách 261026 17:10): cloud **117 GB**, disk **169 GB**, na Disk **0,9 GB**, rozhodni **101 GB**, smazat **42 GB**. Pokud Camtasia půjde pryč, do cloudu jen fotky.

**Provedeno 261026 17:20–17:35 (Lenka):**
- PVA (15,7 GB) → `00 Ke smazání`.
- Amy Porterfield (161 souborů) → `G:\02 EDUCATION\Kurzy – AI a marketing\Amy Porterfield\` (`Digital Course Academy (DCA)`, `Materiály 2018–2020`).
- Growth University: 54 dokumentů Google ze složky Webinar Swipe File (vlastník growthtools.com) zkopírováno do `G:\…\Kurzy – AI a marketing\Growth University\Webinar Swipe File - Growth Tools_` (+ `Webinar Swipe File 2020`, `Slide Decks`); obsah ověřen. Lenčiny vlastní dokumenty GU (Partnerships, Best By Link, Content Cycle, Website Optimization, Exit Offer, Viral Thank You Pages) leží v původní složce `G:\…\Kurzy – AI a marketing\ZZ Archiv\Growth University` (od 2020). **Sloučeno 261026 17:32 (Lenka):** vše je v `G:\…\Kurzy – AI a marketing\ZZ Archiv\Growth University` (205 souborů, 11,3 GB); videa a zkopírované webináře v podsložce `Webinar Swipe File - Growth Tools (kopie 261026)`, `WA1 Week 1 Monday Video.mp4` ve `Webinars Playbook`, seznam odkazů `00 Odkazy na Google dokumenty.md`. Zástupce na původní sdílenou složku growthtools.com zůstal. Nová prázdná složka smazána. Odkazy uvnitř zkopírovaných dokumentů (slajdy, videa) dál vedou na soubory growthtools.com.
- online marketing → `00 Ke smazání` (Lenka: smazat), ponecháno k rozhodnutí: `Persona-Petra-Konečná-1.docx` (vlastní práce), `GDPR` (české vzory souhlasu, double opt-in, checklist, 2018), `Joanna Wiebe` (Copy Hackers: pracovní listy hodnotové nabídky, review mining, 21denní launch plán).
- Accent training: ponechány výsledné soubory (`Erin dub.mp4`, `EatLovePray.mp4`, `200312.mp4`, `accent.mp3`, `Julia Roberts Notting Hill.m4a`, `ErinE.m4a`, `Erin1.mp3`), pracovní (wav, projekty, surový záběr MVI_3378 1,8 GB, „ready for editing“, filmový klip) → `00 Ke smazání`. Co je „výsledné“, je odhad podle názvů a formátu.
- V `00 Ke smazání` teď ~19 GB (PVA + online marketing + Accent). **Lenka smazala 261026 17:35**, prázdnou složku odstranil Claude.
- Výběr z online marketing na Disku (261026 17:36, 24 souborů): `G:\03 LCEnglish\Legal\GDPR (vzory 2018)`, `G:\02 EDUCATION\Kurzy – AI a marketing\Joanna Wiebe (Copy Hackers)`, `G:\03 LCEnglish\Research\Persona-Petra-Konečná-1.docx` (zařazení persony k LCEnglish je odhad). Složka `online marketing` v `ZZ K záloze` smazána (zbyl jen odpad z Macu).
- Otevřené k rozhodnutí (vše v `C:\Users\Lenka\ZZ K záloze\`): `03 LCEnglish\Camtasia nahrávky 2020–2024` (80 GB, 96 nahrávek), `ZZ ARCHIV\Archiv (z Documents)\Knížky od MJ` (5,8 GB: audioknihy, `Ctenaruv raj`, `TYG_Audiobook.zip`), `ZZ ARCHIV\Archiv (z Documents)\Media z telefonu` (1,6 GB, hudba z telefonu 2014: Acker Bilk, Astrud Gilberto, Beethoven, Chet Baker…), `01 PRIVATE\Lightroom catalog archiv` (5,8 GB).

Odkazy Growth University na Google dokumenty: vzorek 4 ze 101 ověřen přes Disk Google — všechny existují; 2 vlastní Lenka (leží jinde na jejím Disku), 2 vlastní growthtools.com (sdílené s Lenkou; zůstanou jen, dokud je autor nesmaže).

## 0. Pravidlo úklidu (Lenka 261026 17:56) — platí pro všechny další kroky

Úklid neděláme kvůli místu, ale aby systém dával smysl. Velikost není kritérium; „staré“ je podnět k rozhodnutí, ne důvod k archivu. U každé položky podle obsahu: **používám → na své místo**, **chci si nechat → archiv** (jen to se zálohuje), **nepotřebuju → smazat**. Oddíly 3B, 9 a 10 vznikly podle velikosti a stáří a po celých složkách — tabulka v oddílu 11 se proto nahrazuje tříděním po položkách.

## 11. Přerovnání `ZZ K záloze` podle obsahu (261026, překonáno oddílem 0)

Lenka 261026: obsah složek neodpovídá názvům (Claude přesouval celé původní složky z `Documents` a zařadil je podle převahy) → každá podsložka tam, kam patří. Všechno v `ZZ K záloze` pochází z `Documents` (z Hudby, Obrázků, Videí ani Stažených zatím nic).

| Co | Teď v | Nově v |
|---|---|---|
| Handstand | 02 EDUCATION\online kurzy absolvované | 01 PRIVATE |
| BTM (videa Toastmasters 2018, 10,3 GB) | 03 LCEnglish\video projekty archiv | 01 PRIVATE\Spolky a funkce\BTM |
| Knížky od MJ (audioknihy), Media z telefonu (hudba 2014), Lettering and Calligraphy | ZZ ARCHIV\Archiv (z Documents) | 01 PRIVATE |
| Světci přednáška.mp4 | 02 EDUCATION\online kurzy absolvované | 04 tadylenka (odhad) |
| proseminář_nalejvárna2 (mp4 + projekt) | 03 LCEnglish\video projekty archiv | 02 EDUCATION\KTF |
| Accent training | ZZ ARCHIV\Archiv (z Documents) | 03 LCEnglish |
| Vermeer.tscproj | 03 LCEnglish\video projekty archiv | 03 LCEnglish\Art for English |
| Zoom: Nepravidelná slovesa – Online sborovna (2×), Irregular Verbs | 05 Další online kurzy\Zoom nahrávky | 03 LCEnglish\Zoom nahrávky |
| AI jazyky, AI sborovna, všechny AI workshopy, webináře AI/ChatGPT, AI pro učitele, Workshop AI kancl, AI Porad(n)a, AIadmin (mp4 + projekty) | 03 LCEnglish\video projekty archiv | 05 Další online kurzy\Videa a záznamy |
| Wwebinar („Nastartujte kurz“, kurz pro tvůrce kurzů, 2017–2019), Zoom „Jak spustit vlastní online kurz“ | 03 LCEnglish\online kurzy vlastní / 05 Zoom | 05 Další online kurzy (odhad — ověř) |
| lenkadvorakova.cz, publicspeaking.cz (vlastní starší byznysy) | ZZ ARCHIV\Archiv (z Documents) | 05 Další online kurzy\ZZ Archiv |
| FINEP, PENTA (projekty Camtasie), ŠUličná Project Management Podcast, PUličný Prague Castle, Martin, sebastian | 03 LCEnglish\video projekty archiv | 06 F2F BIZ (Štěpánka / klienti; sebastian a Martin odhad) |
| ArcHistory Ep0.mp4 | 03 LCEnglish\video projekty archiv | 04 tadylenka (odhad) |
| Camtasia nahrávky 2020–2024 (96 nahrávek bez názvů, jen „Rec datum“) | 03 LCEnglish | kořen `ZZ K záloze\Camtasia nahrávky 2020–2024 (nezařazené)` — podle obsahu nejde rozdělit bez přehrání |
| Icons, Scrivener | ZZ ARCHIV\Archiv (z Documents) | ZZ ARCHIV (beze změny, složku přejmenovat na `ZZ ARCHIV\Různé`) |
| prázdné záznamy Zoom (8× „… Zoom Meeting“, Training Room, How to Get ChatGPT…, Prezentační dovednosti — 0 MB) | 05 Zoom nahrávky | smazat |

Zbytek beze změny: 01 Fotky archiv + Lightroom catalog archiv; 02 online kurzy absolvované; 03 Lights Camera English, 10x English, 5denní výzva.

## 15. Systémová část C: (261026 21:25)

Lenka: mezipaměť Disku Google (79 GB po dnešním nahrávání) nechat, Disk ji zmenší sám po synchronizaci; Chrome nechat; Blackmagic a Luminar nechat. **Do `00 Ke smazání` přesunuto (8,2 GB):** starý skript a token k Google Disku (`client_secret…json`, `token.pickle`, `drive_files.py`, `file_list.csv`, 2023), `C:\AMD`, `C:\Temp`, `C:\AnkiAutomation` (nefunkční), staré aktualizace programů, `npm-cache`, `pip`, `CrashDumps`, dočasné soubory v `AppData\Local\Temp` (32 používaných souborů zůstalo), drobnosti a prázdné složky v profilu. **Odinstaluje Lenka v Nastavení → Aplikace:** Steam (hry 32 GB, jdou kdykoli znovu stáhnout), Unity 2020.3.35f1, Unity 2021.3.4f1, Unity Hub, Visual Studio + Windows Kits, GIMP, Red Giant, Topaz, BlueStacks, Origin (EA app), HitPaw, MiniTool, CapCut, Descript, Evernote, FileZilla; zbytky po nich pak uklidí Claude.

**21:50:** Lenka odinstalovala Unity, Visual Studio 2019 + Installer, MiniTool, Descript, GIMP, Steam (hry 33 GB smazány s ním); Red Giant, Topaz, BlueStacks, EA/Origin, HitPaw, CapCut, Evernote už nainstalované nebyly; FileZilla čeká na restart. Zbytky (17 + 8 složek, mezipaměti Unity/Descript/CapCut/Evernote, uložené hry a nastavení her) → `00 Ke smazání` (12,4 GB). V `Program Files`/`ProgramData` zůstalo ~12 chráněných zbytků (0,2 GB). V seznamu aplikací zůstaly mrtvé položky Cities: Skylines, Planet Coaster, Planet Zoo (klíče `HKLM\…\Uninstall\Steam App 255710/493340/703080`, neškodné). Ponecháno: VS 2010 Tools for Office Runtime, DaVinci, Luminar, Chrome. Red Giant odinstalován dávkovými soubory v `ProgramData\Red Giant\uninstall` + zbytek smazán ručně (21:57). **C: volno 507,3 GB.**

**Po restartu (22:10):** Lenka vysypala koš a restartovala. FileZilla a Backup and Sync from Google zmizely ze seznamu aplikací. Zbytky FileZilly (nastavení, 0 MB) → `00 Ke smazání`. Po starém Disku Google zůstala prázdná složka `C:\Program Files\Google\Drive` (chráněná, smaže Lenka). Současný Disk (`Drive File Stream`) nedotčen, mezipaměť 79,3 GB. **C: volno 572,7 GB z 931 GB** (ráno 36,6 GB).

## 14. Fáze 4b — Videa, Obrázky, Dokumenty (261026 20:50)

Videa a Obrázky promazala Lenka sama. Dokumenty (po jejím promazání, Lenka rozhodla): katalog Lightroomu 2021 → `ZZ K záloze\01 PRIVATE\Lightroom katalogy 2009–2016\Katalog 2020–2021`, náhledy a zbytek `Adobe` ke smazání; Camtasia 2025 ke smazání (2026 zůstává); Kubík Přehledovka (m4a, mp3, Audio Overviews) → `KTF/XX Absolvované/Přehledovka Kubík – nahrávky k vytřídění (z počítače)`, `P9_ Architektura.pdf` → knihovna jako `Fischer_Architektura – vybrané kapitoly z dějin (2015).pdf`; EK 2025_2026 → `01 PRIVATE/Spolky a funkce/KTF Ekonomická komise`; AS KTF → `Spolky a funkce/AS KTF`; jazyky → `Jazyky` (Italiano, Japanese); Fotky a videa (kromě „Fotky se mnou“) → `ZZ K záloze\01 PRIVATE`, presety k Lightroomu; Evaluace archiv.zip ke smazání (vše na Disku); prázdné složky smazány. `list downloads` zůstává (Lenka). Pracovní a aplikační složky zůstávají. Volno na C: 271,8 GB, v `00 Ke smazání` 173,9 GB.

## 13. Fáze 4a — Stažené soubory (261026)

**Provedeno 261026 19:35 (Lenka):** 1 doklady → smazat (pracovní kopie); 2 literatura → knihovna „knihy a články“ (49) a `Jazyky` (18), duplicity zkontrolovány; 3 KTF → `KTF/Poznámky z INBOXu (k roztřídění)` (11) a na místo (VizuNovověk 251007/14, 251104, 251202 do `XX Absolvované/VizuNovověk`; PDF Museum Barberini, Pop Art Xmas, Jan IV. z Dražic k prezentacím), duplicitní VizuNovověk251021 → `G:\00 INBOX\Ke smazání`; 4 nahrávky EL1_251006 a „6. 10.“ → `Easy Voice Recorder` (SZ1_251009 tam už byla jako SZ251009.mp3), videa z telefonu (9) → `C:\Users\Lenka\00 K prohlédnutí – videa z telefonu`, DigiStart testovací videa → `06/Aktivní klienti/Štěpánka/Digistart/Testovací videa 261025 (z počítače)`, podcast → smazat; 5 PENTA → `06/Aktivní klienti/PENTA/HackedList report 2609`, cesty v projektu opraveny. Ostatní (6 198 souborů) → `00 Ke smazání`. Stažené jsou prázdné.

Kontrola 261026 19:50 (Lenka: „ty stažený zkontrolovat líp“): v `00 Ke smazání\Downloads` je 5 838 souborů (19,6 GB) jen tady. Vráceno: `MFolder` → `Music\Martha Argerich`. Fotky slajdů KTF LS25 (zipy + složky) Lenka ověřila ve svých albech Fotek Google → smazat. Otevřené: vlastní prezentace pptx, Kniha svatých 1–2, Praz 1964, 10. století architektury (rar), ENEN, Anki exporty KTF.

Původní návrh:

Lenka: Stažené = dočasné místo, „většina by měla být ke smazání“. Postup obráceně: vybrat, co má cenu, zbytek ke smazání. Stav: 1 448 položek, 25,8 GB (465 PDF, 59 mp3, 44 zipů, 34 složek, 34 videí…); podle roku: 2021–2023 569, 2024 359, 2025 299, 2026 215.

Nechat (na místo):
1. **Osobní a úřední doklady** (~40): výpisy z účtů (09-2026, 05-2022), daňový výpis 2025, daňová potvrzení, Tax Return 2020, pojistná smlouva, změny pojistného OSVČ, faktury, smlouvy; SVJ (ÚZ 2024 a 2025 + podklady, zápisy výboru 2025, smlouva správce 2007, výpis z rejstříku) → `G:\01 PRIVATE\Finance`, `SVJ`, `Doklady a administrativa`.
2. **Odborná literatura** (~60 PDF/EPUB): Mundus Symbolicus, Techniques of the World's Great Painters, The Glory of Byzantium, Symbol Emblem Alegorie, Slovanský klášter (Kubínová), Studien Prämonstratenser, Ikonografie sv. Terezie, Book of Saints, Golden Legend, Building of the Vatican, Brandl, Hubala 1–10, Sacred Topography of Medieval Prague, Wittkower, Connors, Zuccaro, Botticelli, Kennerley, Tachov, Klášter sv. Jiří, Picinelli…, diplomové práce → knihovna „knihy a články“ na Disku (katalogizace přírůstků při weekly review, [[resources/postupy/knihovna]]); jazykové (Italian Without Toil, Japanese grammar, Genki answer key, Minna) → `02 EDUCATION/Jazyky`. Duplicity „(1)“ ke smazání.
3. **KTF podklady** (VizuNovověk 2510–2512, Metodologie 251124, SHP 2511, proseminář architektura, muzeologie, návod zápisy) → `02 EDUCATION/KTF` (co už tam je, ke smazání).
4. **Audio/video vlastní**: nahrávky přednášek EL1_251006, SZ1_251009, „6. 10. 9.13“ → `Easy Voice Recorder` na Disku (podle postupu zpracuj přednášku, ověřit); videa z telefonu PXL (2024, 2025) → Fotky archiv; DigiStart testovací videa (261025) → DigiStart na Disku; podcast o Beethovenovi s Igorem Levitem (německy, ~40 mp3) → `Music\Podcasty` (odhad, že ho chce nechat).
5. **PENTA HackedList** (zpráva + složka `Penta_RE_HackedList_prehled`) → `06 F2F BIZ/Aktivní klienti/PENTA` a opravit cesty v [[penta-hacked-list-report]].

Ke smazání všechno ostatní: zipy (fotky slajdů z přednášek KTF LS25 – zip i rozbalené, odhad: jsou v Google Fotkách; stažené zálohy z Disku `drive-download…`, `I. Čechy…`; FEKT VUT zipy ze SharePointu), instalačka Disku, pluginy WordPressu, písma, exporty odběratelů, Anki exporty (balíčky jsou v Anki), videa na YouTube/Wistii (SUPERworkshop, Take 46, webináře AI), Danny Iny (je na Disku), Transgas.MOV (sestřih je na Disku), staré jízdenky a palubní lístky, obrázky a drobné dokumenty.

## 12. Fáze 4 — zbytek uživatelských složek (návrh)

Stav 261026 17:45: Documents 58,5 GB, Downloads 24 GB, Videos 12 GB, Pictures 8,8 GB, Music 2,4 GB, Desktop a 3D Objects ~0. Postup po složkách, vždy tabulka → souhlas:
1. **Downloads** — KTF zipy, které jsou vedle i rozbalené (zip smazat, rozbalené ověřit proti G:), PDF knih → knihovna na Disku, zbytek starší roku projít.
2. **Videos** — `kliky` (render 7,7 GB), záběry MVI_3643/3644 (2025), LCE.
3. **Documents** — jazyky/Japanese (aktivní, nechat nebo na Disk), Adobe\Lightroom (aplikační katalog), ynab, MiniTool, drobné; pracovní složky (pech-work, meto-work, fakturace, KTF) nechat.
4. **Pictures, Music** — katalogy Luminaru (používáš?), flac hudba.
Co z toho bude k záloze, půjde rovnou do správné podsložky `ZZ K záloze`.

## 8. Duplicity uvnitř C: mimo archiv fotek (261026)

**Provedeno 261026 16:40** (Lenka schválila): 26 souborů, 1,56 GB v `C:\Users\Lenka\00 Ke smazání\`, bez chyb; před přesunem znovu ověřeno, že ponechaná kopie existuje. Log `pc-presuny-log-261026.csv`, řádky „Duplicity uvnitř C:“.

Ze 6,1 GB dvojic na C: je 4,1 GB v `Fotky a videa\Fotky archiv` → řeší se až ve fázi 3. Zbytek jsem ověřila podle obsahu (MD5); jako duplicita zůstalo **26 souborů, 1,56 GB**. Soubory se stejným názvem a velikostí, ale jiným obsahem (`Lightroom catalog archiv`, `Lights Camera English\10x English`), v seznamu nejsou. Seznam po souborech: [[pc-presuny-plan-duplicity-c-261026.csv]]. Cíl: `C:\Users\Lenka\00 Ke smazání\` se zachovanou cestou.

| Smazat z | Zůstává v | Souborů | Velikost |
|---|---|---|---|
| `online kurzy absolvované\Skillshare Premiere course` (ukázková videa Clip 01–14, Cloning, Music Clip) | `online kurzy absolvované\Premiere Pro Skillshare` | 16 | 0,90 GB |
| `Archiv\online marketing\Zach Spuckler` (3 videa) | `online kurzy absolvované\Zach Spuckler` | 3 | 0,35 GB |
| `online kurzy vlastní\Wwebinar` (`feedback1.wav` v Nastartujte kurz, `FB okruhy.mp4` v Tutorialy) | `Wwebinar\feedback1.wav`, `Wwebinar 1807\podklady pro Dášu\FB okruhy.mp4` | 2 | 0,14 GB |
| `jazyky\Japanese\Kana_Practice_Sheets_Nihongo_Shark.pdf` (volný soubor) | uvnitř kurzu `NativShark\…\Kana Mastery` | 1 | 0,09 GB |
| `10x English\evergreen\Gramatika\příručky E.wav` | `10x English\prirucky` | 1 | 0,03 GB |
| `Downloads\dobra-pamet-zaklad-uspechu mobil.mobi` | `My Kindle Content` | 1 | 0,02 GB |
| `Pictures\Luminar Share` — 2 kopie téže fotky | `Luminar Share\2022_08_10_23_16_04` | 2 | 0,03 GB |

Po fázi 1 zbývá ve `Disk Google (nesynchronizuje se)` 1 128 souborů, 63,4 GB. Každý soubor jsem znovu porovnala s G: i se zbytkem C: (název + velikost). Seznam po souborech: [[pc-presuny-plan-faze2-261026.csv]].

| # | Co | Souborů | Velikost | Kam |
|---|---|---|---|---|
| A | Seriály Why Women Kill S2, Normal People, Schitt's Creek S2 (+ titulky) | 68 | 27,4 GB | `00 Ke smazání` |
| B | Growth University – Webinar Swipe File (2019–2020; 172 souborů je tam 2–3×, bez kopií by to bylo 11,8 GB) | 264 | 23,3 GB | `00 Ke smazání` |
| C1 | HELE – soubory, které jsou i v `Documents\Lights Camera English` nebo vícekrát | 128 | 2,7 GB | `00 Ke smazání` |
| C2 | HELE – jediná kopie (Lesson Notes `.mp4` a `.wav` k epizodám E01–E17, Úvod) | 91 | 9,6 GB | **ponechat**: `Documents\Lights Camera English\HELE\Ze staré kopie Disku\` |
| D1 | Drobnosti: starší verze souborů, které jsou na G:, LOOX presety (jsou jinde na C:), titulky Goblin, nahrávky hovorů Olympus 2107, `občanka.pdf` z 2017 | 571 | 0,3 GB | `00 Ke smazání` |
| D2 | Drobnosti s jedinou kopií: `Minna no Nihongo ta správná.pdf`, `seminarka.odt` (2021), `PM_schedulling_priprava_AJ.pptx`, `My recording 16–18.mp3` | 6 | 0,06 GB | **zachránit**: `G:\Můj disk\00 INBOX\Ze staré kopie disku C\` |
| | **Celkem** | 1 128 | 63,4 GB | z toho 53,7 GB ke smazání |

Po přesunu bude složka `Disk Google (nesynchronizuje se)` prázdná a smažu ji.
