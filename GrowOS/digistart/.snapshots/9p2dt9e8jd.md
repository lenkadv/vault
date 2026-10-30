---
type: transactional-emails
headline: Texty SimpleShopu po objednávce a po zaplacení (stránka po objednání + maily) hlasem DigiStartu
status: review
publish_destination: "simpleshop-gnostika"
id: 9p2dt9e8jd
business: digistart
channel: email
created: 2026-10-30
skill: ""
note: ""
---

# SimpleShop GNOSTIKY: stránka po objednání a maily po objednávce a platbě

**Zadání (Lenka 2026-10-30 18:19):** (1) po platbě kartou se ukazuje text pro platbu převodem, upravit; (2) maily, které SimpleShop posílá po objednávce, po zaplacení atd., přepsat naším hlasem. Nic jsem v SimpleShopu neměnila, jen četla (30. 10. večer).

## ⚠️ Než se to nastaví: maily platí pro celý SimpleShop GNOSTIKY

Šablony mailů jsou v SimpleShopu nastavení celého účtu (Nastavení → E-maily a upomínky), ne produktu. Kdyby Štěpánka přes tenhle SimpleShop prodávala i něco jiného, dostanou tyhle maily i její další zákazníci, i s podpisem Lenky. V seznamu produktů jsem jiný produkt nenašla, ale stránka se načítá skriptem a nejsem si tím jistá. **Potřebuju od Štěpánky potvrdit, že DigiStart je v jejím SimpleShopu jediný prodávaný produkt** (nebo jí to říct, ať ví, že se maily mění).

Část, která patří jen DigiStartu, jde do textu produktu (proměnná `{productMailText}`, nastavuje se u produktu), aby šablony byly co nejobecnější.

---

## 1. Stránka po objednání (produkt DigiStart → záložka Stránka po objednání)

**Proč se to děje:** SimpleShop má pro stránku po objednání jen jeden text pro všechny způsoby platby. Po platbě kartou ukáže stav objednávky s razítkem „Uhrazeno“, pod ním tenhle text a tlačítko „Pokračovat >>“, které podle nápovědy SimpleShopu vede na stránku po uhrazení (u nás děkovací stránka v Leadpages). Rozlišit text podle platby nastavení neumí (nápověda https://podpora.redbit.cz/navod/stranka-po-objednani/). Text proto musí sedět na obě cesty.

**Návrh textu na stránce:**

> **Děkujeme, přihláška je odeslaná.**
>
> **Platili jste kartou?** Pak máte hotovo, nahoře u objednávky svítí „Uhrazeno“. Klikněte na tlačítko a dozvíte se, co bude dál. Fakturu vám posíláme do mailu.
>
> **Zvolili jste bankovní převod?** Platební údaje i QR kód pro mobilní bankovnictví najdete na této stránce a poslaly jsme vám je i do mailu. Při zadávání platby dejte pozor na variabilní symbol – když ho netrefíte, nedozvíme se o vaší platbě včas. Jakmile peníze dorazí, potvrdíme vám místo v kurzu a přijde vám od nás faktura.
>
> Potřebujete se na něco zeptat? Napište na: ulicna@gnostika.cz

Odstavec o převodu je Lenčin schválený text beze změny.

**Tlačítko pro pokračování** (místo výchozího „Pokračovat >>“): **Co bude dál >>**

Ověřit při další testovací objednávce kartou: že tlačítko opravdu vede na děkovací stránku https://lenka-dvorakova.lpcontent.net/DEsHgCcug9 (podle nápovědy ano, vyzkoušené to nemám).

---

## 2. Mail po objednávce (Nastavení → E-maily a upomínky → „Nová objednávka, pokud je cena vyšší než 0 Kč“)

Chodí hned po odeslání přihlášky, při kartě i při převodu.

**Teď:** předmět „NOVÁ OBJEDNÁVKA č. {number} | SimpleShop“, text „Dobrý den, potvrzujeme přijetí Vaší objednávky č. … Stav platby můžete ověřit na následujícím odkazu … Pokud je objednávka zaplacena a stále jste neobdrželi zboží nebo službu, kontaktujte nás…“

**Návrh:**

Předmět: **Přihláška je u nás: {firstOrderItemText}**

> Dobrý den,
>
> děkujeme, vaše přihláška k nám dorazila:
>
> <b>{items}</b>
> Celkem {price}
>
> **Platili jste kartou?** Pak je hotovo. Potvrzení a fakturu vám pošleme v dalším mailu.
>
> **Platíte převodem?** Platební údaje a QR kód najdete tady:
>
> {BUTTON_STATUS}Zobrazit platební údaje{/BUTTON_STATUS}
>
> Variabilní symbol je {vs}. Dejte na něj pozor – když ho netrefíte, nedozvíme se o vaší platbě včas. Jakmile peníze dorazí, ozveme se.
>
> Potřebujete se na něco zeptat? Napište na {companyMail}.
>
> Za nás obě zdraví
> Lenka

---

## 3. Mail po zaplacení (Nastavení → E-maily a upomínky → „Potvrzení úhrady“)

**Teď:** předmět „Potvrzení přijetí platby (doklad č. {number}) | {company}“, text „…děkujeme za úhradu objednávky s vystavenou fakturou… Vše je nyní v zaplacené a produkt si můžete rovnou užít! … {BUTTON_PRODUCT}Zobrazit produkt…“ (překlep „v zaplacené“ je ve výchozí šabloně SimpleShopu).

**Návrh:**

Předmět: **Zaplaceno, děkujeme: {firstOrderItemText}**

> Dobrý den,
>
> vaše platba {price} k nám v pořádku dorazila. Děkujeme!
>
> {productMailText}
>
> Fakturu najdete tady: {inv::link}
>
> Potřebujete se na něco zeptat? Napište na {companyMail}.

Podpis je až v textu produktu (níž), aby se v mailu neopakoval.

**Text produktu DigiStart pro mail** (produkt → pole pro text do mailu po zaplacení, `{productMailText}`). Lenčin schválený text z 28. 10., jen bez první věty o faktuře (tu teď říká šablona):

> **Místo v kurzu DigiStart je vaše!**
>
> Před prvním setkáním se vám ještě ozveme, abyste věděl/a, jak se na první pondělí připravit a kde najdete odkaz na vysílání. Do té doby nemusíte nic dělat. Ale můžete se těšit! :-)
>
> Těšíme se na vás v pondělí 23. 11. v 17 h.
>
> Za nás obě zdraví
> Lenka

---

## 4. Upomínky nezaplacené přihlášky (převod)

SimpleShop teď posílá tři upomínky: po 3 dnech, po 10 dnech a třetí (výchozí texty „NEUHRAZENÁ {TYPE} č. {number}“, „…její splatnost uplynula dne…“). U kurzu, který začíná 23. 11. a přihlášky běží do 22. 11., třetí upomínka dojde nejspíš až po začátku kurzu. **Návrh: první dvě přepsat, třetí vypnout.** Kolik dní je splatnost, jsem nezjišťovala; podle toho se dá doladit, kdy upomínky chodí.

**1. upomínka** — předmět: **Platba za přihlášku zatím nedorazila**

> Dobrý den,
>
> přihlášku od vás máme, ale platba {price} k nám zatím nedorazila. Možná ještě putuje bankou, možná se zatoulala kvůli variabilnímu symbolu.
>
> Platební údaje a QR kód najdete tady:
>
> {BUTTON_STATUS}Zobrazit platební údaje{/BUTTON_STATUS}
>
> Variabilní symbol: {vs}
>
> Pokud už jste zaplatili, tenhle mail klidně přeskočte. A kdyby se platba nedařila, napište nám na {companyMail}, domluvíme se.
>
> Za nás obě zdraví
> Lenka

**2. upomínka** — předmět: **Pořád na vás čekáme: platba za přihlášku**

> Dobrý den,
>
> ještě jednou se připomínáme: platba {price} za vaši přihlášku k nám pořád nedorazila, a dokud nedorazí, nemůžeme vám místo potvrdit.
>
> {BUTTON_STATUS}Zobrazit platební údaje{/BUTTON_STATUS}
>
> Variabilní symbol: {vs}
>
> Rozmysleli jste si to, nebo vám něco brání? Napište nám na {companyMail}, ať víme, na čem jsme.
>
> Za nás obě zdraví
> Lenka

---

## Co neměním

- Koncová faktura, objednávka zdarma, vstupenky, ručně vystavené faktury: DigiStart je nepoužívá, nechávám výchozí.
- Odesílací adresa: mail teď v předmětu nese „| SimpleShop“. Jestli maily chodí z adresy SimpleShopu, nebo z gnostika.cz (Nastavení → „Nastavit vlastní odesílací e-mailové adresy“), jsem neověřovala. ⚠️ Pokud chodí z adresy SimpleShopu, odpověď zákaznice nemusí dojít Štěpánce; proto v textech „napište na {companyMail}“, ne „odpovězte na tento mail“.
- `{companyMail}` beru z fakturačních údajů GNOSTIKY; že je to ulicna@gnostika.cz, ověřím při nastavení.

## Po schválení udělám

Po Lenčině schválení a Štěpánčině potvrzení (oddíl nahoře) nastavím body 1–4 v SimpleShopu GNOSTIKY a uložím. Ověření: další testovací objednávka kartou a převodem (dělá Lenka), maily přijdou na její adresu.
