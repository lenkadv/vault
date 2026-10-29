---
type: page-copy
headline: Stránka o Shadowloopu a odstavec do zásad (ověření značky u Googlu)
project: shadowloop-admin
source: resources/shadowloop-admin.md
note: ""
status: review
business: lcenglish
channel: pages
created: 2026-10-29
skill: ""
id: aohbnw5ldc
---

# Shadowloop: podklady k ověření značky u Googlu (návrh 261029)

Proč: aby Google při přihlášení psal „Pokračovat do aplikace **Shadowloop**“ (teď „lcenglish.cz“), chce ověřit značku. K tomu potřebuje veřejnou stránku o aplikaci na ověřené doméně (lcenglish.cz je v Search Console ověřená) a zásady ochrany osobních údajů, které říkají, co aplikace z účtu Google bere. Detail [[shadowloop-admin]]. Hlas: `GrowOS/lcenglish/brain/voice.md`.

Co aplikace podle kódu ukládá (`App.jsx`, `DecksList.jsx`, ověřeno 261028): jméno, e-mail, ID účtu, které balíčky člověk má a které si schoval. Průchod balíčky se neukládá.

## A. Nová stránka lcenglish.cz/shadowloop/ (WordPress, editor bloků)

Titulek stránky: **Shadowloop: aplikace na trénink mluvení**

> Shadowloop je moje aplikace na trénink mluvení. Uslyšíte anglickou větu, uvidíte ji napsanou i s českým překladem a zopakujete ji nahlas. Pak další. A znovu. Až vám věty půjdou z pusy samy.
>
> Téhle metodě se říká *shadowing* - stínování. Nejde o to větu pochopit, to už umíte. Jde o to, aby si pusa zvykla ji říct.
>
> **Jak se do aplikace dostanete**
> Balíčky vět dostanete s kurzy [10x ENGLISH](https://lcenglish.cz/10x-english/), [HELE](https://lcenglish.cz/hele/) a [Irregular](https://lcenglish.cz/irregular/). Několik balíčků je volně dostupných i bez kurzu, a když chcete zkusit, jak to funguje, pošlu vám zdarma [5 krátkých textů](https://lenka-dvorakova.lpcontent.net/shadowloop-texty).
>
> Aplikace běží v prohlížeči na adrese [shadowloop.lcenglish.cz](https://shadowloop.lcenglish.cz), v počítači i v telefonu. Přihlásíte se e-mailem a heslem, nebo účtem Google.
>
> **Co o vás aplikace ví**
> Při přihlášení si aplikace uloží vaše jméno a e-mailovou adresu, aby věděla, které balíčky jsou vaše. Nic dalšího z vašeho účtu Google nebere a nikomu je neposílá. Podrobnosti najdete v [zásadách ochrany osobních údajů](https://lcenglish.cz/privacy-policy/).
>
> Máte otázku? Napište mi na [lenka@lcenglish.cz](mailto:lenka@lcenglish.cz).

Ověřeno 261029 v záloze Firestore z 261028: volně dostupné (`premium: false`) jsou 3 balíčky z 200 (3x25: podstatná jména, přídavná jména, slovesa), proto „několik balíčků“.

## B. Doplnění zásad lcenglish.cz/privacy-policy/

**B1. Do článku I. odst. 4 (seznam zpracovatelů) přidat řádek:**

> – společnost Google (služba Firebase), která provozuje aplikaci Shadowloop a přihlášení účtem Google;

**B2. Nový článek před „Závěrečná ustanovení“** (ta se přečíslují z V. na VI.):

> **V. APLIKACE SHADOWLOOP**
> 1. Provozovatelka provozuje aplikaci Shadowloop na adrese shadowloop.lcenglish.cz, ve které uživatelé trénují mluvení s balíčky vět ze zakoupených kurzů.
> 2. Do aplikace se uživatel přihlásí e-mailem a heslem, nebo účtem Google. Při přihlášení účtem Google získá provozovatelka od společnosti Google jen jméno, e-mailovou adresu a identifikátor účtu. Jiné údaje z účtu Google (kontakty, soubory, poštu apod.) aplikace nezískává.
> 3. Tyto údaje spolu se seznamem balíčků, ke kterým má uživatel přístup, slouží jen k tomu, aby se uživatel mohl přihlásit a aby mu aplikace zpřístupnila zakoupené balíčky. Provozovatelka je nepoužívá k marketingu, neprodává je a nepředává je dalším osobám, s výjimkou společnosti Google, která aplikaci technicky provozuje (služba Firebase).
> 4. Údaje se uchovávají po dobu, kdy má uživatel v aplikaci účet. Uživatel může kdykoli požádat o zrušení účtu a výmaz údajů na adrese info@lenkadvorakova.cz.

⚠️ Zásady v článku V. odst. 2 slibují, že o každé změně provozovatelka informuje uživatele e-mailem 30 dní předem. Doplnění popisuje zpracování, které už probíhá, takže nejde o nový účel; jestli přesto poslat oznámení, rozhoduje Lenka (není to právní posouzení).

## C. Google Auth Platform → Branding (vyplním po schválení A a B)

- App name: Shadowloop (už je)
- User support email: teď `vitek.peterk@gmail.com` → navrhuji `lnk.dvorakova@gmail.com` (nabídka ukazuje jen adresy účtů s přístupem k projektu, `lenka@lcenglish.cz` tam nejspíš nebude; neověřeno)
- App logo: volitelné; logo znamená přísnější kontrolu, navrhuji bez loga
- Application home page: https://lcenglish.cz/shadowloop/
- Privacy policy: https://lcenglish.cz/privacy-policy/
- Terms of service: https://lcenglish.cz/obchodni-podminky/
- Authorized domains: lcenglish.cz (ověřená v Search Console, Lenka je vlastník)
- Developer contact: lnk.dvorakova@gmail.com
- Pak „Verify branding“ → Google posoudí (obvykle pár dní, neověřeno)
