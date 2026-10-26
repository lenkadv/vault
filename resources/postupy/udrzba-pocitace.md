# Postup: Údržba počítače (ať se disk znovu nezaplevelí)

Zavedeno 261026 po velkém úklidu disku C: (volno 36,6 GB → 572,7 GB, [[resources/pc-uklid-261026]]). Lenka: „nenechat mě už nikdy zaplevelit počítač podobným způsobem“. Cíl: aby se nehromadilo to, co jsme 26. 10. složitě odstraňovali. Hlídat se má hlavně Stažené, zapomenuté aplikace, duplicitní složky a soubory, které patří na Disk.

Platí pravidlo úklidu z 26. 10. (paměť `feedback_uklid_smysl_ne_misto`): rozhoduje smysl, ne velikost ani stáří. Každá položka jde na své místo, do archivu, nebo ke smazání. Claude jen připraví, finálně maže Lenka.

## Pravidla průběžně

1. **Pracovní dokumenty žijí na Google Disku**, ne v `Documents` ani ve Staženém. Na C: zůstávají jen programy a jejich data, pracovní složky nástrojů (`pech-work`, `meto-work`, `fakturace`, `lce-render`, `tools`, `source`) a velká média, dokud nejsou na externím disku ([[resources/pc-uklid-261026]] oddíl 4).
2. **Stažené jsou jen dočasné.** Co tam přistane a má zůstat, se hned nebo nejpozději při měsíční kontrole zařadí na Disk.
3. **Vyzkoušená aplikace dostane datum rozhodnutí.** Když Lenka (nebo Claude za ni) nainstaluje program na zkoušku, Claude založí ve [[waiting-for]] úkol „Rozhodnout: nechat, nebo odinstalovat X“ s 📅 za 14 dní. Platí i pro nástroje, které Claude instaluje sám (npm, CLI, MCP servery); ty zapíše do [[lcenglish-ekosystem]] nebo do kontextu úkolu, kvůli kterému vznikly.
4. **Žádné druhé kopie.** Nová kopie složky (ruční záloha, „Copy of…“, export) jen s datem a důvodem v názvu a s úkolem, kdy ji smazat.

## Měsíčně (asi 5 minut, 1. v měsíci)

Úkol ve [[waiting-for]] (🔁 každý měsíc): Claude vypíše obsah Staženého starší než týden a navrhne ke každé položce, kam patří. Lenka potvrdí a Claude přesune. K tomu jedna věta o volném místě na C:.

## Čtvrtletně (spolu, jeden blok)

Úkol ve [[waiting-for]] (🔁 každé 3 měsíce, první 26. 1. 2027), patří i do Quarterly Sprint. Claude:
1. **Volné místo na C:** porovná s minulou kontrolou. Výchozí stav 261026: 571,7 GB volno z 930,9 GB.
2. **Programy:** načte nainstalované programy (registr Uninstall) a porovná je s posledním soupisem `resources/pc-programy-YYMMDD.csv` (výchozí [[pc-programy-261026.csv]], 77 programů). U každého nového se zeptá „používáš?“. Co ne, odinstaluje Lenka. Pak uloží nový soupis.
3. **Stažené, Dokumenty, Plocha, kořen C: a profil:** nové složky a soubory od minulé kontroly, zařadit podle pravidel výš.
4. **Duplicity C: × Disk:** srovnání podle názvu a velikosti jako 261026 (postup v [[resources/pc-uklid-261026]] úvod).
5. **Archiv `ZZ K záloze`:** stav zálohy (úkol v [[disk-reorganizace]]).
6. Výsledek zapíše do daily a krátce do Záznamu v [[disk-reorganizace]] (nebo do nového projektu, až bude ten uzavřený).

## Jak se to spouští (aby to nezůstalo jen zapsané)

| Co | Spouštěč | Kde je zapsaný |
|---|---|---|
| Měsíční Stažené | úkol 🔁 ve [[waiting-for]] (1. v měsíci); denní plán ho v ten den dá do „Dnes na stole“ | skill `productivity-daily-plan`, krok 2b2 |
| Čtvrtletní údržba | úkol 🔁 ve [[waiting-for]] (26. 1., 26. 4. …); denní plán stejně jako výš; Quarterly Sprint kontroluje, že proběhla | krok 2b2 denního plánu, skill `productivity-quarterly-sprint` (Session 4, bod 4b) |
| Instalace na zkoušku | pravidlo v `CLAUDE.md` (načítá se v každém sezení) → úkol za 14 dní | `CLAUDE.md`, Pravidla |

Po splnění opakovaného úkolu zapíše Claude ručně další výskyt (Tasks plugin ho vytvoří jen při odškrtnutí kliknutím v Obsidianu).

Neměnit: AppData, Zotero, Anki, pracovní složky nástrojů. Při odinstalaci pozor na položky se stejným jménem (261026 odinstalace starého Notionu odinstalovala i ten současný).
