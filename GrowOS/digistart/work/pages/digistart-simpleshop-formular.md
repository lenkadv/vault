---
type: checkout-form
headline: Objednávkový formulář DigiStartu v SimpleShopu GNOSTIKY
note: ""
id: w6ypuhg9vi
status: published
business: digistart
channel: pages
created: 2026-10-28
skill: ""
kanban_order: V0
publish_destination: "simpleshop-gnostika"
publish_ref: "160078"
publish_attempted_at: "2026-10-28T19:50:00Z"
publish_state: "prepared"
publish_note: "Formulář nastaven a uložen v SimpleShopu GNOSTIKY po Lenčině schválení; ověřeno na veřejném formuláři https://form.simpleshop.cz/V5KQb/buy/. Z B3 na něj zatím nic nevede."
published_at: "2026-10-28T20:05:00Z"
---

# DigiStart: objednávkový formulář v SimpleShopu GNOSTIKY (návrh úprav)

**Kde to je:** SimpleShop GNOSTIKY → Produkty → DigiStart (úpravy https://app.simpleshop.cz/produkty/crud/160078/). Veřejný formulář: https://form.simpleshop.cz/V5KQb/buy/

**Zadání (Lenka 2026-10-28):** formulář sladit se stylem DigiStartu (B3), 15 000 Kč, karta a převod, správná věta o tom, kdy se platí. Nic jsem zatím neměnila, jen četla.

## Jak formulář vypadá teď (přečteno 2026-10-28 večer)

- **Cena 0 Kč.** Formulář proto ukazuje jen e-mail a „Potvrďte nákup“, platby se nezobrazí vůbec.
- Platby zapnuté všechny čtyři: karta (Stripe), převod KB, **hotovost, dobírka**.
- Žádný text: popis, stránka po objednání, po zaplacení i text mailu jsou prázdné. Nadpisy a tlačítka výchozí („Objednávka“, „Fakturační údaje“, „Potvrďte nákup“).
- Pole pro množství kusů zobrazené, desetinná místa zobrazená (vyšlo by „15 000,00 Kč“).
- Vzhled výchozí (písmo Open Sans, barvy SimpleShopu), bez obrázku.
- Doklad: při objednávce „Objednávka“, po zaplacení se faktura vystaví a pošle sama (vlastní fakturace SimpleShopu).
- Odstoupení od smlouvy: „Nepovolit“ (bez formuláře SimpleShopu).
- Obchodní podmínky: odkaz na PDF GNOSTIKY z textového pole, účinné od 1. 10. 2022: kontakt pro odstoupení a reklamace `lenka@publicspeaking.cz`, brány ThePay a PayPal, starý zákon 101/2000 Sb. místo GDPR, dodání jako „přístupové údaje do členské sekce“, odstoupení u služeb vyloučeno.

## Návrh úprav

### 1. Cena, platby, pole

| Nastavení | Teď | Návrh |
|---|---|---|
| Cena | 0 Kč | **15 000 Kč** (neplátce DPH, konečná cena) |
| Desetinná místa | zobrazena | skrýt → „15 000 Kč“ |
| Pole „množství“ | zobrazené | schovat (jedna přihláška = jedna účastnice) |
| Platby | karta, převod, hotovost, dobírka | **karta (Stripe) a převod (KB)**; hotovost a dobírku vypnout |
| Změna platby po objednání | povolena | nechat (kdo zvolí převod a rozmyslí si to, zaplatí kartou) |
| Slevové kupóny | skryté | nechat skryté |
| Pole | jen e-mail | e-mail, jméno, příjmení povinné; telefon nepovinný (kvůli konzultaci a připomínkám); firma, IČ a adresa nepovinné (podnikatelka chce fakturu na IČ) |
| Ve vyhledávačích | zobrazuje se | skrýt (formulář se otvírá z B3, ne z Googlu) |
| Kapacita | neomezeně | nechat (Lenka: strop zatím ne) |
| Odstoupení | Nepovolit | nechat (živý kurz) |

### 2. Vzhled podle `brain/brand.md`

SimpleShop nabízí jen písma Open Sans a Roboto, Archivo ani DM Sans nejdou. Návrh: **Open Sans** (bližší DM Sans).

| Prvek | Barva |
|---|---|
| Pozadí formuláře | #F1ECE6 (teplý papír) |
| Text | #231A1D |
| Nadpisy (h2) | #9B224F (bordó) |
| Tlačítko | #9B224F, při najetí #74183B, písmo bílé |
| Rámečky | #E8DFD5, při najetí #F3D3E0, vybraná volba #9B224F |

Obrázek produktu: **zatím žádný.** DigiStart nemá logo a logo GNOSTIKY patří prodávající firmě, ne kurzu (`brand.md`).

### 3. Texty

Varianty tam, kde je volba. Vykání s malým v, slovesa vztahující se k účastníkům v množném čísle generické maskulinum (nemůžeme vyloučit, že se přihlásí nějaký muž).

**Veřejný název produktu** (nahoře na formuláři i na faktuře)
Kurz DigiStart – 4 pondělí od 23. 11. 2026

**Nadpis formuláře** (místo „Objednávka“): Přihláška do kurzu DigiStart

**Nadpis údajů** (místo „Fakturační údaje“): Na koho vystavíme fakturu

**Nadpis plateb:** Jak zaplatíte

**Tlačítko odeslání** (místo „Potvrďte nákup“). Zákon chce, aby z tlačítka bylo jasné, že objednávka zavazuje k platbě:
- A: Závazně se přihlásit a zaplatit


**Popis nad formulářem**

> **Ptát se AI umíte. Teď jí dejte práci.**
>
> V kurzu si s AI nebudeme jen povídat. Za čtyři pondělní večery si ji vycvičíte jako asistenta, jakého by vám záviděl lecjaký generální ředitel: hlídá termíny, pamatuje si, co jste kde slíbili, každé ráno roztřídí poštu a připravené odpovědi nechá čekat na vaše schválení. Na vás zbyde hlavně rozhodování, ostatní odpracuje on.
>
> Všechno, co vás naučíme, jsme samy vyzkoušely a vyladily. Dostanete jen osvědčené postupy, takže nebudete ztrácet čas zbytečnostmi.
>
> **Kdy:** pondělí 23. 11., 30. 11., 7. 12. a 14. 12. 2026, vždy 17–20 h, živé vysílání online s Lenkou Dvořákovou a Štěpánkou Uličnou. Po Vánocích se sejdeme ještě jednou, až budete mít za sebou první vlastní zkušenosti.
>
> **Cena:** 15 000 Kč. Je konečná, DPH se nepřičítá. Platí se hned při přihlášení, kartou nebo převodem. Jakmile platba dorazí, místo v kurzu je vaše.
>
> **Co budete potřebovat:** počítač (notebook nebo stolní počítač) a předplatné Claude Pro (nebo vyšší verzi). Předplatné se platí na měsíc dopředu přímo firmě Anthropic, verze Pro teď stojí 20 USD měsíčně.
>
> Ještě váháte? [Domluvte si nejdřív konzultaci zdarma](https://tidycal.com/ulicna/digistart) se Štěpánkou.

**Stránka po objednání** (vidí ji hned po odeslání, hlavně kdo platí převodem)

> **Děkujeme, přihláška je odeslaná.**
>
> Pokud jste zvolili bankovní převod, platební údaje i QR kód pro mobilní bankovnictví najdete na této stránce a poslaly jsme vám je i do mailu. Při zadávání platby dejte pozor na variabilní symbol – když ho netrefíte, nedozvíme se o vaší platbě včas. Jakmile peníze dorazí, potvrdíme vám místo v kurzu a přijde vám od nás faktura.
>
> Potřebujete se na něco zeptat? Napište na: ulicna@gnostika.cz

**Text do mailu po zaplacení** (a stejný text na děkovací stránce, bod 5)

> **Místo v kurzu DigiStart je vaše!**
>
> Fakturu najdete v příloze. Před prvním setkáním se vám ještě ozveme, abyste věděl/a, jak se na první pondělí připravit a kde najdete odkaz na vysílání. Do té doby nemusíte nic dělat. Ale můžete se těšit! :-)
>
> Těšíme se na vás v pondělí 23. 11. v 17 h.
>
> Za nás obě zdraví
> Lenka

### 4. Věty nad tlačítkem

- Souhlas s obchodními podmínkami GNOSTIKY (už tam je).
- Přidat povinný checkbox: „Beru na vědomí, že pro plnohodnotnou práci v kurzu potřebuji placenou verzi Claude (alespoň Pro, momentálně 20 USD měsíčně, platí se zvlášť firmě Anthropic).“ 

### 5. Děkovací stránka (nová)

Po zaplacení přesměrovat na vlastní děkovací stránku DigiStartu (Leadpages, ve vzhledu B3, noindex). Bude na ní text z mailu po zaplacení, kontakt ulicna@gnostika.cz a později pixel Meta pro měření nákupu z reklamy. Text a vzhled půjdou jako samostatná položka fronty ke schválení; adresu doplním do SimpleShopu (pole „po zaplacení přesměrovat“), až bude stránka schválená.

## Rozhodnutí Lenky 2026-10-28 (19:19)

1. **Deset účastnic na formuláři ne.** Kdy kurz spustit, je rozhodnutí lektorek; deset je pracovní varianta. Věta o vrácení peněz při neotevření na formuláři taky není.
2. **Faktury v SimpleShopu jsou OK.** GNOSTIKA (Štěpánka) to vyřídí se svou účetní.
3. **Obchodní podmínky GNOSTIKY upravit:** kontakt GNOSTIKA (ulicna@gnostika.cz), platební brána Stripe. Samostatný krok.
4. **Platby:** karta přes Stripe (Stripe je potřeba ještě zprovoznit, další krok), převod zatím KB; účet pro převod Lenka ověří.
5. **Odstoupení od smlouvy nebude možné,** je to živý kurz. Ve SimpleShopu zůstává „Nepovolit“; promítnout do obchodních podmínek.
6. **Kontakt:** ulicna@gnostika.cz.
7. **Strop počtu míst** zatím nenastavovat.
8. **Po zaplacení přesměrovat na děkovací stránku,** tu vyrobit (bod 5).

## Po schválení udělám

Nastavím v SimpleShopu body 1–4 (vybrané varianty), uložím, otevřu veřejný formulář a zkontroluji ho na počítači i v úzkém okně. Testovací objednávku dělá Lenka, kartou až po zprovoznění Stripe.

## Notes

- **Kde jsou platební údaje (Lenka 28. 10.: „je to dole správně?“):** nápověda SimpleShopu říká jen, že při převodu se na stránce po objednání vygeneruje QR kód a instrukce k platbě a že vlastní text jde doplnit; jestli jsou nad, nebo pod naším textem, neuvádí (https://podpora.redbit.cz/navod/stranka-po-objednani/). Proto text bez „dole“; polohu ověřit při testovací objednávce převodem.
- **Platba kartou:** při vlastní adrese přesměrování jde zákaznice po zaplacení kartou rovnou na ni (stejný zdroj), proto má děkovací stránka (bod 5) stejný text jako mail po zaplacení.
- Věta o asistentovi v popisu je převzatá z Lenčina schváleného textu „Proč Claude“ (`work/course/digistart-proc-claude.md`), jen „slíbila“ → „slíbili“ kvůli rodu na formuláři.

## Výsledek (2026-10-28 20:50)

Nastaveno a uloženo v SimpleShopu GNOSTIKY, ověřeno na veřejném formuláři https://form.simpleshop.cz/V5KQb/buy/ (detail s popisem: https://form.simpleshop.cz/V5KQb/). Cena, platby karta + převod, pole, nadpisy, tlačítko, barvy, popis, stránka po objednání a po uhrazení, povinný checkbox Claude a souhlas s obchodními podmínkami (výchozí PDF GNOSTIKY).

Zjištěno při nastavení:
- **Popis nad formulářem se zobrazuje na stránce detailu** (`/V5KQb/`), ne na samotném objednávkovém formuláři (`/V5KQb/buy/`). Kam povede tlačítko z B3, je potřeba rozhodnout.
- **Cena bez desetinných míst** se v řádku produktu ukazuje jako „15000 Kč“ (bez mezery), součet „Celkem“ dál jako „15 000,00 Kč“. Je to chování SimpleShopu; jde vrátit na „15 000,00 Kč“ všude.
- **Text do mailu po zaplacení** je v SimpleShopu proměnná `productMailText`. Do mailu se dostane jen tehdy, když ji obsahuje e-mailová šablona (Šablony). Ověřit při testovací objednávce.
- Na „Stránce po uhrazení“ je stejný text jako v mailu, jen první věta zní „Fakturu najdete na této stránce a poslaly jsme vám ji i do mailu.“
- Odstraněn nefunkční řádek „Zadejte název“ ve vlastních polích (skrytý).
- Ve stránce po zaplacení kartou se zatím nepřesměrovává; adresa děkovací stránky přijde po jejím schválení.
