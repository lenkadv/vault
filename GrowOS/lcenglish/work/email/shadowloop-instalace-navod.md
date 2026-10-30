---
type: email-snippet
headline: Shadowloop jako aplikace v telefonu (návod pro studenty)
project: shadowloop-admin
source: resources/shadowloop-admin.md
status: draft
business: lcenglish
channel: email
created: 2026-10-30
publish_destination: manual
id: v68pwufnkv
skill: ""
note: ""
---

# Shadowloop jako aplikace v telefonu: krátký návod (návrh 261030)

**Proč:** studentka se ptala, jestli instalace není složitá. Chrome v telefonu teď u Shadowloopu nabízí „Instalovat aplikaci“ (Shadowloop má od 2021 manifest, Chrome od verze 108 už nechce service worker; rozbor v `resources/shadowloop-admin.md`, oddíl „Instalace jako aplikace v telefonu“). Lenka 261030: varianta A, návod jako **možnost v mailu**, ne u otázky „Musím něco instalovat?“ na webu (pořád platí, že nemusí).

**Hlavní sdělení:** instalovat nemusíte. Kdo chce, má Shadowloop jedním klepnutím na ploše jako běžnou aplikaci.

## 1. Odstavec do mailů (varianta k výběru)

**Varianta 1 (krátká, s odkazem na návod v kurzu / na webu):**

> **Tip:** Shadowloop nemusíte nic instalovat, stačí ho otevřít v prohlížeči. Pokud ho ale chcete mít v telefonu po ruce jako ikonu na ploše, zabere to půl minuty:
>
> **Android (Chrome):** vpravo nahoře tři tečky → **Instalovat aplikaci** → Instalovat.
> **iPhone (Safari):** tlačítko Sdílet (čtvereček se šipkou) → **Přidat na plochu** → Přidat.
>
> Pak se Shadowloop otevírá z plochy jako každá jiná aplikace. Po prvním spuštění se v něm jednou přihlaste.

**Varianta 2 (ještě kratší, jen pozvánka):**

> Chcete mít Shadowloop v telefonu jako aplikaci? V Chromu klepněte na tři tečky → **Instalovat aplikaci**, na iPhonu v Safari na Sdílet → **Přidat na plochu**. Instalovat ale nic nemusíte, funguje i v prohlížeči.

## 2. Kam to patří (pořadí podle Lenky 261030)

1. **Lekce „Naučte se mluvit... s Shadowloop“ ve FreshLearn:** HELE, 10x ENGLISH, Naučte se učit anglicky. Dnes v nich je starý návod „přidat na plochu“ pro Android a iPhone se snímky z doby Teachable (mapy kurzů). Nahradit novými kroky a novými snímky. Starý text Claude před úpravou přečte a ukáže.
2. **E-maily ke kurzu Nepravidelná slovesa** (Drip, série `Irregular product email series`): do 1. mailu „Nepravidelná slovesa: NA START“ za odstavec o přihlášení („Na stránce https://shadowloop.lcenglish.cz se přihlaste…“). V ostatních 8 mailech návod dnes není a není potřeba.
3. **Další maily, kde se student poprvé přihlašuje** (návrh, rozhoduje Lenka): HELE inside, 1. mail „[HELE] Vydáváme se na cestu!“ za „Přihlaste se do aplikace Shadowloop“; dárek „Texty a nahrávky“ (workflow `delivery: Shadowloop 10xE texty`, mail „Naučte se mluvit... s Shadowloop“). 10x ENGLISH vlastní sérii v Dripu nemá (mezi kampaněmi ji nevidím).
4. **Web (nejnižší priorita):** článek o Shadowloopu na lcenglish.cz (příspěvek 1531) a případně lcenglish.cz/shadowloop/ níž na stránce, ne v otázce „Musím něco instalovat?“.

## 3. Snímky obrazovky

Potřebuju od Lenky snímky z telefonu (Claude je sám nepořídí, menu prohlížeče v počítači napodobit nejde):
- **Android:** Shadowloop v Chromu s otevřeným menu (tři tečky), kde je vidět „Instalovat aplikaci“; okno „Instalovat“; ikona Shadowloop na ploše.
- **iPhone (jestli je po ruce):** Safari s tlačítkem Sdílet; nabídka s „Přidat na plochu“; okno s přepínačem „Otevřít jako webovou aplikaci“.

Claude je ořízne, skryje jméno účtu a doplní šipky.

## Notes

- ⚠️ Před rozesláním vyzkoušet na telefonu: po instalaci otevřít Shadowloop z plochy a přihlásit se (přihlášení běží ve vyskakovacím okně; na iPhonu má aplikace z plochy vlastní úložiště, takže se student přihlásí znovu). Neověřeno.
- Popisky menu: Android „Instalovat aplikaci“ (starší Chrome „Přidat na plochu“), iPhone iOS 26 „Přidat na plochu“ s přepínačem „Otevřít jako webovou aplikaci“, výchozí zapnutý. Česká znění podle anglických zdrojů, na telefonu neověřeno; upravit podle snímků.
- Text je krátký návod do existujících mailů a lekcí, psaný ručně podle `brain/voice.md` (vykání, krátké věty), ne přes `email-write` (není to samostatný mail). Kdyby Lenka chtěla samostatný mail „Shadowloop jako aplikace“, napíše se skillem.
