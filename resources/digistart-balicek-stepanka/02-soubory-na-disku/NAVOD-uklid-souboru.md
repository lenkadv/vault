# Návod: úprava a organizace souborů s AI

**Pro koho:** pro kohokoli, kdo má na disku nepořádek a nechce se v něm hrabat sám. Nevyžaduje žádné programování ani speciální nástroje. První výstup kurzu DigiStart.
**Čas:** zkušební průchod malou složkou cca 45 minut; celý disk po částech (po jedné složce, nejlépe po dobu několika týdnů).

## Co v balíčku je

| Soubor | K čemu |
|---|---|
| `PROMPT-uklid-souboru.md` | hlavní prompt: vložíte do chatu, asistent vás provede celým postupem |
| `nastroje/seznam-souboru.ps1` | (Windows, režim A) vyrobí seznam souborů ve složce, jen čtení |
| `nastroje/presun-podle-planu.ps1` | (Windows, režim A) přesune soubory podle schváleného plánu, s „zkouškou na sucho“ a vrácením zpět |

## Dva způsoby práce (vybere se na začátku rozhovoru)

| | **Režim A: návrh a já to provedu** | **Režim B: asistent to udělá se mnou** |
|---|---|---|
| Co potřebujete | obyčejný chat (ChatGPT, Claude, Gemini) | nástroj s přístupem k souborům (např. Claude Code, Claude Cowork) |
| Kdo hýbe soubory | vy (ručně, nebo hotovým skriptem) | asistent, po vašem schválení každé dávky |
| Rychlost | pomalejší | rychlejší |
| Riziko | nejnižší | nízké (pravidla: nic nemaže, jen po dávkách, protokol pro vrácení) |
| Doporučení | **začněte tímto** | až když máte důvěru a zkušební dávka dopadla dobře |

**V obou režimech platí:** nic se nemaže, nic se nepřepisuje, přesouvá se jen po schválení a po malých dávkách.

## Postup (zkrácený)

1. **Příprava (5 min).** Vyberte jednu složku, na které si to vyzkoušíte (ne celý disk). Například „Stažené“ nebo „Dokumenty“. Pokud je to možné, vytvořte si zálohu (zkopírujte složku jinam).
2. **Otevřete nový chat** (nejlépe v Projektu) a vložte celý prompt z `PROMPT-uklid-souboru.md`.
3. **Úvodní rozhovor (10 min).** Asistent se vás ptá po jedné otázce: kde soubory jsou, jaký máte počítač, k čemu slouží, jak je hledáte, co se nesmí hýbat, jaký režim chcete.
4. **Seznam souborů.**
   - *Režim A, Windows:* v PowerShellu spusťte `seznam-souboru.ps1` (asistent vám řekne přesný příkaz) a výsledek vložte do chatu.
   - *Režim A, Mac:* asistent vám připraví ekvivalentní příkaz a vysvětlí, jak ho spustit.
   - *Režim B:* asistent složku sám prohlédne (jen čtení).
5. **Návrh struktury.** Asistent ukáže strom složek a vy ho upravíte. Teprve když řeknete „struktura je schválená“, jde se dál.
6. **Plán přesunů** po dávkách. Zkontrolujte ho (v režimu A jde otevřít `plan.csv` v Excelu).
7. **Zkušební dávka** (5 až 10 souborů), pak větší dávky.
8. **Dokončení:** asistent vytvoří soubor `00 JAK-TO-MAM-ORGANIZOVANE.md` s pravidly, aby se struktura dala udržet.

## Co dělat, když…

- **Něco se přesunulo špatně:** řekněte „stop“. V režimu A použijte vrácení zpět (`-Vratit`) s protokolem; v režimu B asistent použije svůj protokol.
- **Soubory jsou na Google Disku nebo OneDrivu:** nejdřív ve složce zkontrolujte, zda je sdílíte s někým dalším; sdílené složky v první fázi vynechte.
- **Asistent navrhuje mazání:** nevadí, ale smazání se dělá vždy ručně a po vlastní kontrole.
- **Soubory „na zítra“:** všechno nové a nezařazené patří do `00 INBOX`, jednou týdně 5 minut třídění.

## Poznámky pro lektorku / pro druhé použití

- V kurzu je to „první úspěch“: za jedno odpoledne vidí účastnice konkrétní výsledek a naučí se základní vzorec práce s AI: **zadání → návrh → kontrola → schválení → provedení** (stejný princip se pak opakuje u mailů a textů).
- Přepínače a pravidla v promptu (nemazat, jen po schválení, po dávkách) jsou záměrně nepřehlédnutelná; je dobré je na začátku kurzu ukázat jako ukázku „jak zadat AI bezpečně“.
- Skripty jsou pro Windows. Pro Mac je asistent napíše sám na základě stejných pravidel (prompt to požaduje).
- Skripty jsou vyzkoušené na zkušební složce (seznam souborů, zkouška na sucho, přesun, kolize názvů, vrácení zpět). Při prvním použití u klientky je vždy spusťte nejprve na malé složce.
