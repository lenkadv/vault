---
type: transactional-emails
headline: Texty SimpleShopu po objednávce a po zaplacení (stránka po objednání + maily) hlasem DigiStartu
status: published
publish_destination: "simpleshop-gnostika"
publish_ref: "160078"
publish_attempted_at: "2026-10-30T17:48:00Z"
publish_state: "prepared"
publish_note: "Mail templates 1201, 1202, 1007, 1008 set as individual templates of product DigiStart; page after order text and button saved. Read back from SimpleShop. 3rd reminder still uses the global template."
published_at: "2026-10-30T17:54:00Z"
id: 9p2dt9e8jd
business: digistart
channel: email
created: 2026-10-30
skill: ""
note: poznámky níže v textu označené +++, nějaké provedené opravy
kanban_order: Uy
---

# DigiStart: co kupující uvidí po přihlášce (SimpleShop)

Každý text níž je celý, přesně tak, jak ho kupující uvidí. Hranaté závorky jsou místa, která SimpleShop doplní sám (číslo přihlášky, tlačítko, odkaz). Technické poznámky jsou až na konci.

Pořadí podle cesty kupujícího:
- **Kartou:** stránka po objednání (A) → mail B → mail C → děkovací stránka po kliknutí na tlačítko.
- **Převodem:** stránka po objednání (A) → mail B → po zaplacení mail C. Když platba nedorazí, upomínky D a E.

---

## A. Stránka hned po odeslání přihlášky

Nahoře SimpleShop sám ukáže „Stav objednávky [číslo]“ a razítko „Uhrazeno“ (karta), nebo „Čeká na platbu“ s platebními údaji a QR kódem (převod). Pod tím:

> **Děkujeme, přihláška je odeslaná.**
>
> **Platili jste kartou?** Pak by mělo nahoře svítit „Uhrazeno“ – pokud to tak je, máte hotovo. Potvrzení o rezervaci místa v kurzu a fakturu vám posíláme do mailu.
>
> **Zvolili jste bankovní převod?** Platební údaje i QR kód pro mobilní bankovnictví najdete na této stránce a poslaly jsme vám je i do mailu. Při zadávání platby dejte pozor na variabilní symbol – když ho netrefíte, nedozvíme se o vaší platbě včas. Jakmile peníze dorazí, potvrdíme vám místo v kurzu a přijde vám od nás faktura.
>
> Potřebujete se na něco zeptat? Napište na: ulicna@gnostika.cz
>
> **[ Co dál >> ]** *(tlačítko, jen po zaplacení; vede na děkovací stránku)*

---

## B. Mail hned po odeslání přihlášky (karta i převod)

**Předmět:** DigiStart – přihláška č. [číslo přihlášky]

> Dobrý den,
>
> dorazila k nám vaše přihláška do kurzu DigiStart. Děkujeme!
>
> **Kurz DigiStart – 4 pondělí od 23. 11. 2026**
> Celkem 14 970 Kč
>
> **Platili jste kartou?** Pak máte hotovo. Potvrzení a faktura dojdou v samostatném mailu.
>
> **Platíte převodem?** Platební údaje a QR kód najdete tady:
>
> **[ Zobrazit platební údaje ]**
>
> Variabilní symbol je [číslo]. Dejte na něj pozor – když ho netrefíte, nedozvíme se o vaší platbě včas. Jakmile peníze dorazí, obratem vám to potvrdíme.
>
> Potřebujete se na něco zeptat? Napište nám na ulicna@gnostika.cz.
>
> Za nás obě zdraví
> Lenka

---

## C. Mail po zaplacení (karta hned, převod až peníze dorazí)

**Předmět:** DigiStart – platba za přihlášku č. [číslo přihlášky] dorazila

> Dobrý den,
>
> vaše platba za kurz DigiStart dorazila v pořádku až k nám. Děkujeme!
>
> **Místo v kurzu DigiStart je vaše!**
>
> Fakturu najdete tady: [odkaz na fakturu]
>
> Před prvním setkáním se vám ještě ozveme, abyste věděli, jak se na první pondělí připravit a kde najdete odkaz na vysílání. Do té doby nemusíte nic dělat. Ale můžete se těšit! :-)
>
> Těšíme se na vás v pondělí 23. 11. v 17 h.
>
> Potřebujete se na něco zeptat? Napište nám na ulicna@gnostika.cz.
>
> Za nás obě zdraví
> Lenka

---

## D. První upomínka (převod, platba nedorazila)

**Předmět:** DigiStart: Platba za přihlášku č. [číslo přihlášky] zatím nedorazila

> Dobrý den,
>
> přihlášku do kurzu DigiStart od vás máme, ale platba k nám zatím nedorazila. Možná to mezi sebou ještě banky nestihly vyřídit, možná se zatoulala kvůli variabilnímu symbolu.
>
> Pro jistotu to prosím zkontrolujte. Platební údaje a QR kód najdete tady:
>
> **[ Zobrazit platební údaje ]**
>
> Variabilní symbol: [číslo]
>
> Pokud se někde vyskytl nějaký zádrhel, napište nám na ulicna@gnostika.cz, ať to můžeme společně vyřešit.
>
> Za nás obě zdraví
> Lenka

---

## E. Druhá upomínka

**Předmět:** DigiStart: Pořád na vás čekáme – platba za přihlášku č. [číslo přihlášky]

> Dobrý den,
>
> ještě jednou se připomínáme: platba za vaši přihlášku do kurzu DigiStart k nám pořád nedorazila a dokud nedorazí, nemůžeme vám místo potvrdit.
>
> **[ Zobrazit platební údaje ]**
>
> Variabilní symbol: [číslo]
>
> Rozmysleli jste si to, nebo nastal nějaký zádrhel? Napište nám na ulicna@gnostika.cz, ať víme, na čem jsme.
>
> Za nás obě zdraví
> Lenka

Třetí upomínka: vypnout. Přišla by nejspíš až po začátku kurzu.

---

## Technické poznámky (pro nastavení, ne pro kupující)

- **Kde:** šablony mailů se nastaví jen v produktu DigiStart (Lenka 30. 10.: jde to u každého produktu zvlášť). Ostatní nastavení účtu GNOSTIKY zůstane.
- **Mail C celý v šabloně:** protože šablona je jen pro DigiStart, píšu do ní celý text. Pole produktu „text do mailu“ (`{productMailText}`) se do mailu nevkládá, jinak by se podpis objevil uprostřed mailu. Oproti minulé verzi je proto faktura nad textem o prvním setkání a podpis až na konci.
- **Proměnné SimpleShopu** místo hranatých závorek: číslo přihlášky `{number}`, položka `{items}`, cena `{price}`, tlačítko s platebními údaji `{BUTTON_STATUS}Zobrazit platební údaje{/BUTTON_STATUS}`, variabilní symbol `{vs}`, faktura `{inv::link}`, kontakt `{companyMail}`. Že `{companyMail}` je ulicna@gnostika.cz, ověřím při nastavení.
- **Cena v mailu B:** SimpleShop ji může vypsat jako „14 970,00 Kč“ (s desetinami); jde to vidět až v testovacím mailu.
- **Tlačítko na stránce A:** při Lenčině zkušební objednávce vedlo na děkovací stránku. ⚠️ V ostré verzi poběží děkovací stránka na doméně DigiStartu: až bude doména, je potřeba v produktu přepsat „URL po uhrazení“ (teď https://lenka-dvorakova.lpcontent.net/DEsHgCcug9).
- **Odesílací adresa:** neověřeno, jestli maily chodí z adresy SimpleShopu, nebo z gnostika.cz. Proto „napište nám na…“, ne „odpovězte na tento mail“.
- Koncová faktura, objednávka zdarma, vstupenky, ručně vystavené faktury: DigiStart je nepoužívá, zůstávají výchozí.

## Po schválení udělám

Nastavím A–E v produktu DigiStart v SimpleShopu GNOSTIKY a uložím. Ověření: další testovací objednávka kartou a převodem (dělá Lenka).

## Výsledek (2026-10-30 18:48–18:55)

Nastaveno v SimpleShopu GNOSTIKY, produkt DigiStart, a ověřeno zpětným načtením:
- **A** stránka po objednání: text a tlačítko „Co dál >>“ (záložka Stránka po objednání). Ostatní nastavení produktu se nezměnilo (porovnána všechna pole před a po uložení).
- **B–E** maily: v produktu DigiStart → Odesílané e-maily (`/produkty/crud/maily/160078/`) přepnuto na „Použít individuální šablonu pro produkt DigiStart“. Globální šablony účtu GNOSTIKY zůstaly beze změny.
- Mail po objednávce už měl individuální šablonu („DigiStart - objednávka č. {number}“, nevím od koho), přepsána schváleným textem.
- **Číslo přihlášky v mailu po zaplacení:** v tomto mailu je `{number}` číslo faktury, ne přihlášky. Proto je v předmětu `{ord::number}`. Tuhle proměnnou nápověda SimpleShopu neuvádí (má jen `{ord::link}` a `{inv::number}`), je to můj odhad. **Ověřit testovací objednávkou:** když se v předmětu ukáže doslova „{ord::number}“, předmět opravím.
- **3. upomínka:** Lenka 18:56: „Třetí upomínku dělat nebudem.“ V globálním nastavení GNOSTIKY má „Neposílat“, takže nechodí.
- ⚠️ **1. a 2. upomínka zatím taky nechodí:** v globálním nastavení (Nastavení → E-maily a upomínky) mají všechny tři upomínky „Neposílat“ (zjištěno 18:58). Šablona v produktu určuje jen text, ne jestli se posílá. Aby chodily, musí se u 1. a 2. upomínky přepnout na „Posílat odběrateli faktury“ (po 3 a 10 dnech po splatnosti); to platí pro celý účet GNOSTIKY. **Lenka 18:59: „Ano, zapni.“** Zapnuto 19:00 (globálně, 1. a 2. upomínka „Posílat odběrateli faktury“, 3 a 10 dní po splatnosti; 3. dál „Neposílat“), ověřeno zpětným načtením. Pro produktové šablony DigiStartu platí texty z produktu. **Lenka 19:12:** splatnost 1 den (po konzultaci se má platit hned), 1. upomínka 2 dny po splatnosti, 2. upomínka o 2 dny později. Nastaveno 19:15 a ověřeno: produkt DigiStart splatnost 1 den (jiné pole produktu se nezměnilo); upomínky globálně 2 a 4 dny po splatnosti (SimpleShop počítá obě od splatnosti). Průběh: přihláška den 0, splatnost den 1, 1. upomínka den 3, 2. upomínka den 5.
- Pole produktu „Text v e-mailu“ (`{productMailText}`) zůstalo vyplněné, ale žádná šablona DigiStartu ho nepoužívá.

- **Odesílatel (zjištěno 19:28):** maily chodí jako „GNOSTIKA CONSULTING, s.r.o. <gnostika-consulting-sro-1@zakaznik.simpleshop.cz>“, vlastní adresa přidaná není. Lenka 19:27: ano, odesílat z ulicna@gnostika.cz, nastaví Štěpánka (DKIM u domény gnostika.cz); karta `pl-odesilatel` na mapě DigiStartu.
