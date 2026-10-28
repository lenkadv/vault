---
type: checkout-form
headline: "Objednávkový formulář DigiStartu v SimpleShopu GNOSTIKY"
note: ""
id: w6ypuhg9vi
status: draft
business: digistart
channel: pages
created: 2026-10-28
skill: ""
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

Varianty tam, kde je volba. Vykání s malým v, účastnice v ženském rodě.

**Veřejný název produktu** (nahoře na formuláři i na faktuře)
- A: DigiStart – živý kurz, 4 pondělí od 23. 11. 2026
- B: DigiStart – pilotní kurz AI pro podnikatelky
- C: DigiStart (pilot)

**Nadpis formuláře** (místo „Objednávka“): Přihláška do kurzu DigiStart

**Nadpis údajů** (místo „Fakturační údaje“): Vaše údaje (na ně vystavíme fakturu)

**Nadpis plateb:** Jak chcete zaplatit

**Tlačítko odeslání** (místo „Potvrďte nákup“). Zákon chce, aby z tlačítka bylo jasné, že objednávka zavazuje k platbě:
- A: Závazně se přihlásit a zaplatit
- B: Přihlásit se a zaplatit 15 000 Kč

**Popis nad formulářem**

> **DigiStart: čtyři pondělí, kdy AI začne dělat práci za vás**
>
> Čtyři živá vysílání s Lenkou Dvořákovou a Štěpánkou Uličnou: po 23. 11., 30. 11., 7. 12. a 14. 12. 2026, vždy 17–20 h, online. Páté konzultační setkání bude po Vánocích.
>
> Cena 15 000 Kč, konečná (nejsme plátkyně DPH).
>
> **Kdy se platí:** hned při přihlášení, kartou nebo převodem. Místo máte jisté, jakmile platba dorazí.
>
> **Co budete potřebovat:** počítač a placený Claude Pro (20 USD měsíčně, platí se zvlášť společnosti Anthropic, ne nám).
>
> Nejste si jistá? [Domluvte si nejdřív konzultaci zdarma](https://tidycal.com/ulicna/digistart).

**Stránka po objednání** (vidí ji hned po odeslání, hlavně kdo platí převodem)

> **Děkujeme, přihláška je odeslaná.**
>
> Pokud jste zvolila převod, platební údaje máte níž i v mailu. Prosíme o správný variabilní symbol, jinak platbu nespárujeme. Jakmile peníze dorazí, pošleme vám fakturu a potvrzení místa.
>
> Otázky: ulicna@gnostika.cz

**Text do mailu po zaplacení** (a stejný text na děkovací stránce, bod 5)

> **Máte místo v kurzu DigiStart.**
>
> Faktura je v příloze. Do [PLACEHOLDER: kdy, např. „pátku 20. 11.“] vám pošleme uvítací mail: jak se na první pondělí připravit a kde budou odkazy na vysílání.
>
> Na první setkání 23. 11. v 17 h se těšíme.
>
> Za nás obě zdraví
> Lenka a Štěpánka

### 4. Věty nad tlačítkem

- Souhlas s obchodními podmínkami GNOSTIKY (už tam je).
- Návrh přidat povinný checkbox: „Beru na vědomí, že pro kurz potřebuji placený Claude Pro, který si platím sama.“ (Odpovídá rozhodnutí z 17. 10.: Claude Pro je nutný a stránka to říká otevřeně.)

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
