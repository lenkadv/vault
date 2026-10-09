---
name: hlasove-profily
description: Vytvoří a průběžně zdokonaluje hlasové profily uživatelky (jak píše e-maily, nabídky, zprávy, články), aby AI psala texty, které zní jako ona. Spouští se pokyny jako "udělej mi hlasové profily", "chci, abys psala jako já", "zpracuj moje texty", "upravila jsem tvůj text, poučte se z toho", "aktualizuj hlasový profil". Pracuje v několika krocích: úvodní rozhovor, seznámení se zdroji, návrh sady profilů, banka vzorků, profil, zkouška a trvalá smyčka učení z přepisů.
---

# Hlasové profily

Cílem je, aby texty, které AI napíše za uživatelku (dále „ona“), nemusela přepisovat, protože zní jako ona. Neděláme to jednorázovým promptem: **stavíme sadu profilů, která se časem učí z jejích oprav.**

Hlasový profil je popis toho, jak ona píše v určité situaci: oslovení, délka, tón, slova, která používá a nikdy nepoužívá, stavba textu, podpis. Profilů je víc, protože jinak píše kamarádce, klientovi, úřadu nebo do nabídky.

## Co je třeba mít na paměti vždy

1. **Pracuj po fázích a po každé fázi se zastav.** Nepokračuj k další, dokud ona neřekne „dál“. Hlavně: sadu profilů si nech schválit dřív, než postavíš první banku vzorků.
2. **Hlas je její, ne můj ideál.** Neučesávej ji. Nevylepšuj její styl podle toho, co se obvykle považuje za „dobrý e-mail“. Když píše krátce a bez oslovení, profil to tak zaznamená. Když opakuje věty, které „se nedoporučují“, zapiš je jako rys, ne jako chybu.
3. **Nevymýšlej.** Pravidlo v profilu musí mít doložení ve vzorcích (alespoň dva příklady). Pravidlo bez příkladu označ „hypotéza, ověřit“.
4. **Soukromí.** Vzorky obsahují cizí jména, čísla, adresy. Do banky ukládej jen **text jejích vět**, jména třetích osob a citlivé údaje nahraď značkou (`[klient]`, `[částka]`, `[adresa]`). Vzorky ani profily neposílej mimo místo, kde je uživatelka sama uložila. Hesla, čísla karet, zdravotní nebo osobní údaje do banky nepatří nikdy.
5. **Neposuzuj ji.** Při rozboru popisuj, nehodnoť. Ne „příliš dlouhé“, ale „odstavce mívají 4 až 6 vět“.
6. **Sleduj její vlastní slova.** Když v rozhovoru řekne „tohle bych nikdy nenapsala“, zapiš to doslova do profilu (do části „Nejsem“).

## Kde se pracuje

V pracovní složce, kterou si zvolí (např. `Dokumenty/hlas/`). Vznikne tahle struktura:

```
hlas/
  00-inventura.md            ← co jsme prošly, kolik textů, co se vynechalo
  <profil-1>/
    banka.md                 ← vybrané vzorky (anonymizované) + poznámky
    profil.md                ← profil podle šablony + sekce "Poučení z přepisů"
  <profil-2>/
    ...
  00-prehled-profilu.md      ← tabulka: profil, komu a pro jaké typy textů se používá, jazyk, stav, poslední revize
                               (podle ní si skill psani-textu vybírá správný profil)
```

Šablony najdeš v `references/sablona-profilu.md`, postup rozboru v `references/rozbor-vzorku.md`, smyčku učení v `references/smycka-uceni.md`.

---

## Fáze 1: úvodní rozhovor

Ptej se po jedné otázce. Nabízej možnosti. Zapisuj si odpovědi.

1. **Jak jí máš říkat** a zda vykat, nebo tykat. Jazyk textů (čeština, angličtina, obojí).
2. **Kde jsou její texty?** Možnosti: a) odeslaná pošta (jaký poštovní klient; pokud ještě není propojený s AI, nabídni průvodce propojením z e-mailového skillu `koncepty-odpovedi`, nebo ruční cestu: vložení 30 až 50 odeslaných zpráv do jednoho textového souboru, jen její věty bez citované historie), b) dokumenty na disku (složka, typ souborů: Word, PDF, Google Dok), c) jednotlivé soubory, které ti ukáže, d) zprávy z chatu (WhatsApp, Messenger) v textovém exportu, e) cokoli jiného (newslettery, příspěvky na sítích, nabídky). Zjisti u každého zdroje: kolik toho zhruba je, jaké je období, zda jsou tam texty psané za ni někým jiným (asistentka, AI), které se nemají použít.
3. **K čemu bude hlas potřeba?** (odpovědi na maily, nabídky, zprávy klientům, příspěvky, články, newslettery…)
4. **Co už ví o svém stylu?** Slova, která používá ráda a která nesnáší; texty, které se jí povedly; texty, za které se stydí. (Tyhle odpovědi mají u profilu velkou váhu.)
5. **Co se nesmí číst nebo uložit?** (Osobní korespondence s rodinou, zdravotní témata, jednání, která nechce vynášet.)
6. **Souhlas:** shrň, co přečteš a kam uložíš výstup, a nech si to potvrdit.

## Fáze 2: seznámení se zdroji (inventura)

1. Projdi zdroje, které povolila. **Jen čtení.** Pokud je zdrojů hodně, vezmi nejdřív vzorek (posledních 50 až 100 odeslaných e-mailů nebo 10 dokumentů).
2. **Vyřaď:** automatické odpovědi, přeposlané cizí texty, citované části z předchozích zpráv (jen její nové věty se počítají), šablony, podpisy.
3. Vyrob `00-inventura.md`: zdroje, počty, období, co jsi vyřadila a proč, hrubé rozdělení textů (podle adresáta a účelu).
4. Ukaž jí inventuru v pěti řádcích a zeptej se: „Odpovídá to tomu, jak píšeš? Chybí něco důležitého?“

## Fáze 3: vyhodnocení a návrh sady profilů

**Tohle je klíčový krok. Nezačínej psát profily dřív, než vyhodnotíš, kolik jich je třeba.**

1. Seskup texty podle **toho, co je od sebe skutečně odlišuje**: komu píše (blízcí, klienti, úřady, kolegové, veřejnost), v jakém vztahu (tykání/vykání, důvěrnost), s jakým účelem (odpověď, nabídka, zpráva, připomínka, příspěvek), v jakém médiu (e-mail, chat, dokument), v jakém jazyce.
2. Použij tohle kritérium pro **oddělení profilů**: v profilech se liší aspoň tři z těchto znaků: oslovení, formálnost, délka, stavba textu, podpis, používání humoru nebo emoji. Pokud se liší jen jeden znak (např. podpis), nejde o nový profil, ale o variantu uvnitř profilu.
3. **Minimum vzorků:** na profil aspoň 8 až 10 textů. Když jich je méně, označ profil „zatím nezralý“; vznikne z něj jen draft a doplní se při dalších textech.
4. Typicky vyjdou: **osobní** (blízcí, tykání), **pracovní** (klienti a partneři), a v rámci pracovního klidně víc profilů podle typu textu: **pracovní e-mail (odpovědi)**, **nabídky a návrhy**, **zprávy a shrnutí**, **veřejné texty** (příspěvky, články). Nevymýšlej víc profilů, než ukazují data.
5. Předlož návrh jako tabulku: profil, komu a co, počet vzorků, jaké se liší znaky, stav (zralý / nezralý). **Zeptej se: „Takhle bych to rozdělila. Co bys upravila?“** Dál nepokračuj, dokud neřekne „schváleno“.

## Fáze 4: banka vzorků a profil (po jednom profilu)

Pro každý schválený profil, jeden po druhém:

1. **Banka:** vyber 8 až 25 **reprezentativních** textů (různé situace v rámci profilu, ne jen ty nejhezčí). Ke každému zapiš: kdy, komu (role, ne jméno), účel, zda jde o první zprávu nebo odpověď. Anonymizuj. Ulož do `banka.md`.
2. **Rozbor** podle `references/rozbor-vzorku.md` (oslovení, první věta, stavba, délka, tón, slovník, interpunkce, rozloučení, podpis, slova, která nikdy nepoužívá…). U každého zjištění uvedi **2 až 3 doslovné příklady**.
3. **Draft profilu** podle `references/sablona-profilu.md`. Včetně: jednou větou, vlastnosti (znamená / neznamená), tabulka „jsem / nejsem“, jedno sdělení v několika situacích (ukázky, které napíšeš ty a ona zkontroluje), kontrolní seznam před odesláním, prázdná sekce „Poučení z přepisů“.
4. **Otázky:** polož jí nejvýš 3 až 5 otázek k věcem, kde jsou vzorky nejednoznačné nebo si protiřečí (např. „v polovině mailů tykáš, v polovině vykáš stejným lidem; podle čeho se rozhoduješ?“). Po jedné.
5. **Oprava a verze 1:** zapracuj její odpovědi. Označ profil „v1“ a datum.
6. **Zapiš profil do přehledu** `hlas/00-prehled-profilu.md`: název, **komu a pro jaké typy textů** (např. „nabídky a návrhy pro klienty“, „e-maily blízkým“, „příspěvky na sítě“), jazyk, stav, datum. Hlavička `profil.md` („Platí pro / Neplatí pro“) a přehled si musí odpovídat; podle nich pak vybírá profil skill `psani-textu`.

## Fáze 5: zkouška

1. Napiš **tři testovací texty** v novém profilu pro tři různé situace (zadá ona, nebo je navrhneš, a ona vybere).
2. Ona ke každému řekne: „napsala bych to“ / „nenapsala bych to“ / „napsala bych to takhle“ (a přepíše).
3. Rozdíly projdi smyčkou učení (viz níže) a profil upravíš. Tím je profil připraven; ve `00-prehled-profilu.md` ho označ „v1, odzkoušeno“.

## Fáze 6: trvalý režim, smyčka učení

Tohle je ta část, která z jednorázového úkolu dělá učící se systém. **Platí vždy, i mimo tuhle konverzaci**, kdykoli kdokoli (ty nebo jiná AI) píše text podle jejího profilu.

**Kdykoli ona text přepíše, opraví, nebo řekne „takhle ne, spíš takhle“:**
1. **Porovnej** svou verzi s její a pojmenuj rozdíl: *co jsem napsala → co změnila → pravidlo (proč)*.
2. **Zapiš okamžitě**, ve stejné odpovědi, bez ptaní, do sekce **„Poučení z přepisů“** na konci příslušného `profil.md` (datum, rozdíl, pravidlo, příklad „před/po“). Jednou větou jí řekni, kam to šlo.
3. **Opakující se poučení** (podruhé a víckrát) **povýš**: pravidlo se přenese nahoru do těla profilu (do vlastností, tabulky „jsem / nejsem“ nebo kontrolního seznamu) a v poučeních se označí „povýšeno“.
4. **Nezapisuj drobnosti:** oprava překlepu, faktu, jména nebo data není poučení o hlase. Zapiš jen to, co říká něco o **stylu**: slovo, které vždy škrtá, tón, který zjemňuje, délka, otvírák, konkrétní scéna místo obecné věty.
5. **Rozpory:** když nové poučení protiřečí staršímu, neprohlašuj žádné za správné. Ukaž jí obě a zeptej se, které platí pro který typ situace (někdy je to další profil).
6. **Revize profilu:** po cca 15 až 20 poučeních, nebo jednou za měsíc, nabídni krátkou revizi: sloučit podobná poučení, vyřadit zastaralá, povýšit opakovaná, aktualizovat tabulku jsem/nejsem. Zapiš datum revize.

**Přidání nových zdrojů:** kdykoli ona doloží další texty (nové maily, nový typ dokumentu), nabídni, ať je zařadíme: doplnit banku (nezahazovat stará), zkontrolovat, zda neukazují na nový profil, a pokud ano, vrátit se k Fázi 3 pro daný typ.

---

## Co dělat, když…

- **Má málo textů** (jen pár mailů): udělej jeden „základní profil“ a označ ho nezralý. Doplní se z přepisů; to je v pořádku.
- **Texty psala dřív někdo jiný nebo AI** (poznáš to podle chladné neosobní stavby, frází typu „v dnešním rychle se měnícím světě“): zeptej se, zda je vyřadit.
- **Dva hlasy v jednom profilu** (např. psala jinak před třemi lety): sděl jí to a zeptej se, který platí dnes. Starší nech v samostatné banka-archiv.
- **Hodnotí ji někdo jiný** (partner, kolegyně chce, ať píše jinak): tohle není profil. Profil popisuje, jak píše ona.

## Jak se používá hotový profil

Před psaním textu **přečti odpovídající profil** (`hlas/<profil>/profil.md`) a piš rovnou tímto hlasem, ne neutrálně s tím, že se to pak přepíše. Před předáním textu projdi kontrolní seznam z profilu. Nikdy text nezveřejňuj ani neodesílej sama; to dělá ona.

Hotové profily se používají skilly:
- **`psani-textu`**: koncepty libovolných typů textů (nabídka, zpráva, příspěvek, dopis…). Sám vybere profil podle `hlas/00-prehled-profilu.md`, doptá se na chybějící informace a napíše koncept.
- **`koncepty-odpovedi`**: odpovědi na e-maily s přísnými pravidly (nikdy neodesílá).
