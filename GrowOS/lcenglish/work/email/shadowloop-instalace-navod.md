---
type: email-snippet
headline: Shadowloop jako aplikace v telefonu (návod pro studenty)
project: shadowloop-admin
source: resources/shadowloop-admin.md
status: published
business: lcenglish
channel: email
created: 2026-10-30
publish_destination: manual
id: v68pwufnkv
skill: ""
note: Varianta 1 (s úpravou), screenshoty přiloženy - z Androidu, doupravit se zvýrazněním míst, kde je třeba něco udělat (šipkou nebo zakroužkováním). iPhone nemám, musí stačit jen popis.
kanban_order: V1
publish_attempted_at: "2026-10-30T14:40:00Z"
publish_state: prepared
publish_note: "261030: FreshLearn 3 lekce „Naučte se mluvit... s Shadowloop“ (HELE, 10x ENGLISH, NSUA) se 2 snímky, ověřeno novým načtením; Drip série Irregular, 1. mail NA START, tip za odstavec o archivaci, uloženo v editoru v Chromu, ověřeno API (HTML i text). HELE inside, dárek a web zatím ne (rozhodne Lenka). 15:50–16:10 (Lenka „ano“): Drip HELE inside 1. mail (za pondělní úkoly), Drip workflow delivery: Shadowloop 10xE texty mail Naučte se mluvit (za větu o přihlášení), web lcenglish.cz/aplikace-shadowloop/ (WP 1531, oddíl Jak se k aplikaci snadno dostat z telefonu, 2 snímky WP média 7599 a 7600); vše ověřeno API / živou stránkou."
published_at: "2026-10-30T14:45:00Z"
---

# Shadowloop jako aplikace v telefonu: krátký návod (návrh 261030)

**Proč:** studentka se ptala, jestli instalace není složitá. Chrome v telefonu teď u Shadowloopu nabízí „Instalovat aplikaci“ (Shadowloop má od 2021 manifest, Chrome od verze 108 už nechce service worker; rozbor v `resources/shadowloop-admin.md`, oddíl „Instalace jako aplikace v telefonu“). Lenka 261030: varianta A, návod jako **možnost v mailu**, ne u otázky „Musím něco instalovat?“ na webu (pořád platí, že nemusí).

**Hlavní sdělení:** instalovat nemusíte. Kdo chce, má Shadowloop jedním klepnutím na ploše jako běžnou aplikaci.

## 1. Odstavec do mailů (Lenka vybrala variantu 1 a upravila ji, 261030)

> **Tip:** Shadowloop nemusíte instalovat, stačí ho otevřít v prohlížeči. Pokud ho ale chcete mít v telefonu po ruce jako ikonu na ploše, je to snadné a nezabere to ani půl minuty:
>
> **Android (Chrome):** vpravo nahoře tři tečky → **Instalovat a vytvořit zástupce** → **Instalovat**.
> **iPhone (Safari):** tlačítko Sdílet (čtvereček se šipkou) → **Přidat na plochu** → Přidat.
>
> Pak se Shadowloop otevírá z plochy jako každá jiná aplikace. Po prvním spuštění se přihlaste svým e-mailem.

## 1b. Snímky k návodu (Android, pro lekce ve FreshLearn)

Zvýrazněno žlutě s číslem kroku, jméno účtu v záhlaví skryté. Krok „tři tečky vpravo nahoře“ je jen v textu (na snímku ho zakrývá otevřené menu).

**Krok 1:** v menu Chromu položka „Install and create shortcut“ (v češtině „Instalovat a vytvořit zástupce“, viz Notes).
![[261030-1455_shadowloop_instalace-android-1.png]]

**Krok 2:** v okně vybrat „Install“ (Instalovat), ne „Create shortcut“ (Vytvořit zástupce, ten se otevírá v Chromu).
![[261030-1455_shadowloop_instalace-android-2.png]]

iPhone: Lenka nemá, stačí popis v textu.


## 2. Kam to patří (pořadí podle Lenky 261030)

1. **Lekce „Naučte se mluvit... s Shadowloop“ ve FreshLearn:** HELE, 10x ENGLISH, Naučte se učit anglicky. Dnes v nich je starý návod „přidat na plochu“ pro Android a iPhone se snímky z doby Teachable (mapy kurzů). Nahradit novými kroky a novými snímky. Starý text Claude před úpravou přečte a ukáže.
2. **E-maily ke kurzu Nepravidelná slovesa** (Drip, série `Irregular product email series`): do 1. mailu „Nepravidelná slovesa: NA START“ za odstavec o přihlášení („Na stránce https://shadowloop.lcenglish.cz se přihlaste…“). V ostatních 8 mailech návod dnes není a není potřeba.
3. **Další maily, kde se student poprvé přihlašuje** (návrh, rozhoduje Lenka): HELE inside, 1. mail „[HELE] Vydáváme se na cestu!“ za „Přihlaste se do aplikace Shadowloop“; dárek „Texty a nahrávky“ (workflow `delivery: Shadowloop 10xE texty`, mail „Naučte se mluvit... s Shadowloop“). 10x ENGLISH vlastní sérii v Dripu nemá (mezi kampaněmi ji nevidím).
4. **Web (nejnižší priorita):** článek o Shadowloopu na lcenglish.cz (příspěvek 1531) a případně lcenglish.cz/shadowloop/ níž na stránce, ne v otázce „Musím něco instalovat?“.

## 3. Původní snímky od Lenky (261030, Android, anglický Chrome)

![[Pasted image 20261030144945.png]]![[Pasted image 20261030145143.png]]

## Notes

- ⚠️ Před rozesláním vyzkoušet na telefonu: po instalaci otevřít Shadowloop z plochy a přihlásit se (přihlášení běží ve vyskakovacím okně; na iPhonu má aplikace z plochy vlastní úložiště, takže se student přihlásí znovu). Neověřeno.
- Popisky menu: podle Lenčiných snímků má Chrome položku „Install and create shortcut“ a v okně „Install“ / „Create shortcut“. ⚠️ Český popisek „Instalovat a vytvořit zástupce“ je můj odhad překladu, na českém telefonu neověřeno; starší Chrome má „Instalovat aplikaci“ nebo „Přidat na plochu“. iPhone (iOS 26) „Přidat na plochu“ s přepínačem „Otevřít jako webovou aplikaci“, výchozí zapnutý; neověřeno, Lenka iPhone nemá.
- Na snímku je ikona Shadowloopu ještě stará (červená klapka Lights Camera English) a název v manifestu „Lights Camera English Shadowloop“. Po instalaci ji studenti uvidí na ploše. Výměna ikony a názvu = úprava aplikace, jen s Lenčiným souhlasem (návrh, nespěchá).
- Text je krátký návod do existujících mailů a lekcí, psaný ručně podle `brain/voice.md` (vykání, krátké věty), ne přes `email-write` (není to samostatný mail). Kdyby Lenka chtěla samostatný mail „Shadowloop jako aplikace“, napíše se skillem.
