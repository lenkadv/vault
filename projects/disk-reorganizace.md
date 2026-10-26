# Reorganizace Google Disku

**Oblast:** [[areas/domacnost]]
**Založeno:** 261004
**Stav:** základní struktura hotová 261004 (00 INBOX … 07, ZZ ARCHIV); zbývá podrobné procházení po položkách

Plán, rozhodnutí a mapa starých → nových názvů: [[resources/disk-reorganizace-261004]]. Logy přesunů: `resources/disk-presuny-log-261004.csv`, `resources/disk-uklid-log-261004.csv` (odkud → kam, podle nich jde cokoli vrátit).

## Aktuální stav

261026 23:08: **úklid disku C: hotový**, včetně systémové části a odinstalace nepoužívaných aplikací. **C: volno 572,7 GB z 931** (ráno 36,6 GB, disk svítil červeně). Ve `C:\Users\Lenka\ZZ K záloze` zůstává jen archiv k zálohování (117,8 GB: Fotky archiv, audioknihy, katalogy a presety Lightroomu, drobnosti LCEnglish, fotky a videa z Documents). Na Disku čeká `00 INBOX` (Praz 1964.zip, 6 souborů ze staré kopie, `Ke smazání`) a `KTF/Poznámky z INBOXu` k zatřídění. Další krok: rozhodnout, kam archiv zálohovat. Detaily [[resources/pc-uklid-261026]].

261026: **přibyl lokální disk C:** (skoro plný, volno 37 GB z 931). Mapa a návrh v [[resources/pc-uklid-261026]]: duplicity s Diskem ~13 GB, stará zrcadlová kopie Disku z 2021 (70 GB), 518 GB v `Documents` bez zálohy. Fáze 1 hotová 261026: duplicity, odpad a hry Steam (~62 GB) v `C:\Users\Lenka\00 Ke smazání\` (přehled `00 CO TU JE.md` přímo ve složce, log `resources/pc-presuny-log-261026.csv`); nejisté věci zachráněny na Disk. Fáze 2 hotová 261026 16:15 (stará kopie Disku vyprázdněná; Growth University jedna sada a HELE jediné kopie v `Documents`, 6 souborů v `G:\00 INBOX\Ze staré kopie disku C`). Duplicity uvnitř C: (1,6 GB) taky hotové. Karanténa vysypaná, stará složka Disku Google pryč, **C: volno 169 GB** (ráno 37 GB). 261026 večer: `ZZ K záloze` prošlo po položkách (pravidlo „smysl, ne místo“, [[resources/pc-uklid-261026]] oddíl 0): vlastní kurzy, HELE, NSUA, Wwebinar, Nastartujte, 5DV, BTM, publicspeaking.cz, lenkadvorakova.cz, Growth University, Amy Porterfield na Disku; ke smazání ~133 GB (Lenka maže). Ve `ZZ K záloze` zůstal jen archiv k zálohování: Fotky archiv 109 GB, audioknihy 5,8 GB, katalogy Lightroomu 1 GB, drobnosti LCEnglish 1,6 GB. Další krok: rozhodnout, kam archiv zálohovat, a fáze 4 (Stažené, Videa, zbytek Dokumentů, Obrázky). Původně: fáze 3 (externí disk pro archivy, viz [[resources/pc-uklid-261026]] oddíl 3B). Google Disk sám zůstává odložený na listopad.

261018 (weekly review): **odloženo na listopad** — do konce října mají přednost FEKT a DigiStart. Next action se obnoví 2. 11. (připomínka v [[waiting-for]], sekce „Čeká na datum“).

Hotovo 261004: kořen Disku a 00 INBOX prázdné, klienti rozdělení (06 F2F BIZ: Aktivní klienti / ZZ Archiv), kurzy sloučené do `02 EDUCATION/Kurzy – byznys a marketing`, tadylenka s podsložkou `Všichni svatí – databáze`, archivy sjednocené na `ZZ Archiv`, pravidlo „inspirace/marketing/AI starší 3 let → archiv“. Pravidla práce: nic nemazat natrvalo z `G:` (jen přesun do `00 INBOX/Ke smazání`), před každou dávkou tabulka odkud → kam a souhlas, nahrávky v `Easy Voice Recorder` se nehýbou.

## Tasky

- [ ] Rozhodnout s Claudem, kam zálohovat složku `C:\Users\Lenka\ZZ K záloze` #next-action #online
  - Kontext: po probrání 261026 zbývá jen archiv 117,8 GB (Fotky archiv, audioknihy, katalogy a presety Lightroomu, drobnosti LCEnglish, fotky a videa z Documents), přehled `00 CO TU JE.md` přímo ve složce. Lenka nechce cloud, který by musela platit navěky; možnosti externí disk / část na Disk (5 TB) — [[resources/pc-uklid-261026]] oddíl 9
- [ ] Zatřídit 6 souborů v `G:\00 INBOX\Ze staré kopie disku C`

- [ ] Projít `01 PRIVATE` po položkách s Claudem — 29 volných souborů v kořeni (očkování, CV, cestovní věci, malování…) a složky `Official`, `Omnibus`, `Hudba`, `obrázky`, `ZZ Archiv`; citlivé věci tam jsou záměrně online #online (odloženo na listopad, 261018 → [[waiting-for]] „Čeká na datum“ 📅 2026-11-02)
- [ ] Podrobně projít `02 EDUCATION/KTF/Absolvované` (43 předmětů), `Literatura apod.`, `Jazyky`
- [ ] Podrobně projít `03 LCEnglish` (Products/HELE, Content, Tech; Shadowloop řešit samostatně)
- [ ] Roztřídit zbytek `ZZ ARCHIV` v kořeni (AirBnB, Gnostika, Helena, Julia Cameron, Kurz rétoriky, PRESENATION, publicspeaking.cz) podle oblastí
- [x] Sloučit složky `Středověká Praha` (3 složky) a `Barokní seminář` (2 složky), Swipe file a zbytek `05/Inspiration & Ideas` ✅ 2026-10-05 — ověřeno, že už bylo hotovo 261004 (logy `disk-presuny-log-261004.csv`): `Absolvované/Středověká Praha a okolí` (stávající semestr `Aktuální/26ZS Středověká Praha a okolí` s kódem na začátku se nesloučil, správně), `Absolvované/Barokní seminář` (+ podsložka `Další semestry`), `07/Swipe file` a `07/ZZ Archiv/Swipe file`. **Pravidlo do budoucna (Lenka 261005):** při slučování složek se nejdřív zeptat, jestli nejde o různé semestry; složka aktuálního semestru (kód `26ZS` apod. na začátku) se nesluje.
- [ ] Lenka: vysypat `00 INBOX/Ke smazání` (~90 položek) a projít `00 INBOX/Citlivé – ke kontrole` (23 souborů)
- [x] Nahrávky hovorů Olympusu (567 souborů, 1,65 GB) přesunuty 261004 do `00 INBOX/Ke smazání/Olympus nahrávky hovorů` — Lenka je smaže ručně spolu se zbytkem `Ke smazání`; vyhodnocení, reporty, Call samples a vzory zůstaly v `06 F2F BIZ/ZZ Archiv/Olympus` ✅ 2026-10-04
- [ ] Doplnit index nahrávek v `Easy Voice Recorder` (nahrávka → předmět); otevřené: PP, `My recording NNN`
- [ ] Shadowloop složka: samostatně rozhodnout, co s ní (zdrojové balíčky decků)

## Záznam (nejnovější nahoře)

- 261026 **Úklid disku C: za jeden den (09:11–09:48, 15:52–23:08, spolu s Claudem).** Volné místo 36,6 GB → 572,7 GB z 931 GB (disk svítil červeně, teď je víc než polovina volná). Prošli jsme duplicity s Diskem Google, starou kopii Disku, archiv po položkách, Stažené, Dokumenty, kořen C: a profil; odinstalováno přes 15 nepoužívaných programů a jejich zbytky (Steam a hry, Unity, Visual Studio, GIMP, Red Giant, MiniTool, Descript, FileZilla, starý Backup and Sync…). Vlastní věci zařazeny na Disk na svá místa, nic nesmazáno bez Lenčina souhlasu, finální mazání dělala Lenka. **Lenka (k citování, až bude doporučovat práci s Claudem):** dlouho toužila tenhle úklid udělat a hlavně přijít na kloub tomu, které aplikace může odinstalovat a které ne; ukázalo se, jak se ve Windows na pozadí hromadí věci, které člověk nainstaluje a zapomene, i ty, které tam zůstávají proti jeho vůli; Claude to s ní prošel a vytřídil, mazání přinášelo „zvláštní uspokojující pocit“. Podrobnosti [[resources/pc-uklid-261026]].
