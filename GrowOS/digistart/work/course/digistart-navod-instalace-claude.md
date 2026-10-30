---
type: course-guide
headline: "Návod: Claude Pro a aplikace Claude v počítači (Windows i Mac), samostatný, s obrázky"
skill: ""
status: approved
business: digistart
channel: course
created: 2026-10-30
id: ylbelk8llh
note: oprav číslování v části B, jsou tam dvě 3). Pak approved.
sealed:
  - _digistart-navod-instalace-claude/navod.pdf sha256:aba220f464b155b3928c9dbb84cdc862824073c7862e450591aee72599030d99
  - _digistart-navod-instalace-claude/navod.html sha256:3a4fc94b857c9dace74112aade809ae33dd5ecb5fca3ab0d7323e5f928de76be
  - _digistart-navod-instalace-claude/img/01-stazeni-windows.png sha256:efaef047e13e6229b3bef00d8570b60b14447e122c29df2ee3a01daeab824bf7
  - _digistart-navod-instalace-claude/img/02-stazeni-mac.png sha256:1a7cae383b04f6061455ab2182cbffe90d58ac7f3a38caa36716c853e057ddda
  - _digistart-navod-instalace-claude/img/03-stazeni-vyber.png sha256:8dc59558654949e330643e63dec4d133edc4c68a216c0a6af0e8e9ffb1fc7405
  - _digistart-navod-instalace-claude/img/04-cenik-pro.png sha256:a5b54ad553b89fddc90b2c756fdc6ff5245bf426f1b47db6ec3e40ac4196eeb2
  - _digistart-navod-instalace-claude/img/05-prihlaseni.png sha256:bad88f30bdd7ace26d70f3c20f10a07149cca62d182a82df9f7cc8ea510ccc9b
kanban_order: V2
publish_destination: leadpages
publish_ref: zb2u3ejr1oei7y3njpmlfbrs
publish_attempted_at: 2026-10-30T18:10:00Z
publish_state: live
publish_note: Webová verze (navod.html, obrázky jako assety stránky, SHA-256 ověřeno) zveřejněna 30. 10. 2026 19:10 na https://lenka-dvorakova.lpcontent.net/wmKsox8ltF, noindex, na Lenčino výslovné „Ano, zveřejni“ v chatu. Kanál course nemá v setup.md nastavení live, proto položka zůstává approved. PDF se zatím nikam neposlalo.
published_at: 2026-10-30T18:12:00Z
---

<!-- TEXT NÁVODU: z části mezi značkami níž se staví webová stránka i PDF (_digistart-navod-instalace-claude/build.py). Řádky začínající „> 📷“ jsou poznámky pro nás, do stránky ani PDF nejdou. -->
<!-- NAVOD-START -->

# Jak si nainstalovat Claude do počítače

**Krok za krokem pro Windows i Mac: účet, předplatné Claude Pro, stažení aplikace a první zpráva.**

Claude je umělá inteligence od americké firmy Anthropic. Můžete s ním chatovat v prohlížeči, ale v aplikaci v počítači umí mnohem víc: pracuje přímo s vašimi soubory a dokumenty, takže mu je nemusíte pokaždé nahrávat. Práce se soubory v počítači je ale dostupná jen v placených plánech, proto návod počítá s plánem Pro.

Celá příprava má tři části:

* **A.** Založíte si účet a předplatíte Claude Pro.
* **B.** Stáhnete a nainstalujete aplikaci.
* **C.** Přihlásíte se a vyzkoušíte, že všechno funguje.

## Co budete potřebovat

* **Počítač** s Windows 10 nebo novějšími, nebo Mac se systémem macOS 13 (Ventura) nebo novějším. Pro telefon ani tabletu tenhle návod není určen.
* **E-mailovou adresu**, případně účet Google nebo Apple.
* **Platební kartu.** Plán Pro se platí kartou.

## A. Účet a předplatné Claude Pro

Předplatné platíte přímo firmě Anthropic. Podle ceníku Anthropicu stojí Claude Pro **20 USD měsíčně**. K ceně se může připočíst daň a Anthropic cenu může změnit. Aktuální ceník je na [claude.com/pricing](https://claude.com/pricing).

![Ceník Anthropicu, plán Pro: 20 USD při měsíční platbě, 17 USD měsíčně při roční platbě předem](_digistart-navod-instalace-claude/img/04-cenik-pro.png)

1. **Otevřete v prohlížeči stránku [claude.ai](https://claude.ai).**
   Uvidíte přihlašovací okno se třemi možnostmi.

   ![Přihlášení na claude.ai: Continue with Google, Continue with Apple, nebo e-mail a Continue with email](_digistart-navod-instalace-claude/img/05-prihlaseni.png)

2. **Vyberte, jak se chcete přihlašovat.** Buď klikněte na „Continue with Google“ nebo „Continue with Apple“, nebo napište svou e-mailovou adresu do políčka „Enter your email“ a klikněte na „Continue with email“.
   Když zvolíte e-mail, přijde vám do schránky zpráva s odkazem na přihlášení. Klikněte na odkaz v ní. Pokud zprávu nevidíte, podívejte se i do složky Hromadné nebo Spam.
   **Zapamatujte si, kterou cestou jste se přihlásili.** Stejnou budete potřebovat i v aplikaci.
3. **Projděte úvodní otázky** a vyplňte, co je potřeba (například jméno).
   Pak uvidíte okno s políčkem na psaní. Účet máte založený, zatím zdarma.
4. **Klikněte vlevo dole na své jméno nebo iniciály a vyberte „Settings“ (Nastavení).**
5. **Otevřete „Billing“ (Platby) a klikněte na „Upgrade plan“.**
   Uvidíte nabídku plánů.
6. **U plánu Pro klikněte na „Get Pro plan“.**
7. **Vyberte měsíční, nebo roční platbu.** Měsíční vás neváže na celý rok, předplatné můžete kdykoliv zrušit. Roční platba vychází levněji v přepočtu na jeden měsíc, ale platí se najednou na celý rok dopředu.
8. **Zadejte údaje karty a klikněte na „Subscribe“.**
   Po zaplacení uvidíte v nastavení, že máte plán Pro.


**Dobré vědět:** předplatné se každý měsíc (nebo rok) samo obnovuje, pokud ho sami nezrušíte. Zrušit ho můžete kdykoli ve stejném místě, Settings → Billing, tlačítkem „Cancel“. Plán Pro pak platí do konce zaplaceného období. Aby vám nestrhli další platbu, zrušte ho pro jistotu alespoň 24 hodin před dalším datem platby.

## B. Stažení a instalace aplikace

1. **Otevřete v prohlížeči stránku [claude.com/download](https://claude.com/download).**
   Stránka pozná, jaký máte počítač, a nahoře nabídne správné tlačítko.

   Na Windows uvidíte „Download for Windows“:

   ![Stránka ke stažení na Windows: tlačítko Download for Windows, vedle Windows (arm64) a Microsoft Store](_digistart-navod-instalace-claude/img/01-stazeni-windows.png)

   Na Macu uvidíte „Download for macOS“:

   ![Stránka ke stažení na Macu: tlačítko Download for macOS](_digistart-navod-instalace-claude/img/02-stazeni-mac.png)

2. **Klikněte na velké černé tlačítko.**
   Na Windows platí pro většinu počítačů právě „Download for Windows“. Verze „Windows (arm64)“ je jen pro počítače se speciálním typem procesoru (například Snapdragon). Nevíte-li si rady, zvolte obyčejné „Download for Windows“.
   Kdyby stránka nabídla něco jiného, než máte, sjeďte níž k rámečku „Desktop“ a vyberte svůj systém tam:

   ![Rámeček Desktop: macOS, Windows a Windows (arm 64), každý s tlačítkem Download](_digistart-navod-instalace-claude/img/03-stazeni-vyber.png)

   Do počítače se stáhne instalační soubor. Najdete ho ve složce Stažené soubory.
3. **Otevřete stažený soubor dvojklikem a postupujte podle pokynů na obrazovce.**
   * **Windows:** instalace proběhne sama. Zeptá-li se počítač, jestli aplikaci dovolíte provádět změny, klikněte na „Ano“.
   * **Mac:** otevře se okno s ikonou Clauda. Přetáhněte ikonu do složky Aplikace (Applications).
   
4. **Spusťte Clauda.**
   * **Windows:** v nabídce Start.
   * **Mac:** ve složce Aplikace. Při prvním spuštění se Mac může zeptat, jestli opravdu chcete otevřít aplikaci staženou z internetu. Klikněte na „Otevřít“.

   Uvidíte okno aplikace Claude s nabídkou přihlášení.

## C. Přihlášení a kontrola

1. **Přihlaste se stejnou cestou jako v části A**: stejným e-mailem, nebo stejným účtem Google či Apple. Uvidíte okno s políčkem na psaní.
2. **Zkontrolujte, že máte Pro.** Klikněte vlevo dole na své jméno.
   U jména nebo v nastavení uvidíte „Pro“. Pokud tam vidíte „Free“, přihlásili jste se nejspíš jiným e-mailem nebo jiným účtem než v části A. Odhlaste se a přihlaste se tím, kterým jste platili.
3. **Napište Claudovi první zprávu**, třeba „Dobrý den, zkouším, jestli mi to funguje.“, a stiskněte Enter.
   Za chvilku vám Claude odpoví. Hotovo, aplikace je připravená.

## Když se něco zasekne

Udělejte si snímek obrazovky toho, co vidíte, a podívejte se do nápovědy Anthropicu na [support.claude.com](https://support.claude.com). Návod k instalaci tam najdete pod názvem „Install Claude Desktop“.

*Návod připravily Lenka Dvořáková a Štěpánka Uličná (DigiStart). Ověřeno podle stránek Anthropicu 30. 10. 2026. Anthropic svoje stránky i aplikaci průběžně mění, takže některé obrázky nebo názvy tlačítek mohou vypadat trochu jinak. Obrázky jsou snímky stránek claude.com a claude.ai.*

<!-- NAVOD-END -->

---

## Kam to patří (návrh, nic není zveřejněné)

1. **Samostatný návod (Lenka 30. 10.):** funguje i bez kurzu, třeba pro zájemkyni, která se ještě rozhoduje. Dvě podoby ze stejného textu: **PDF k zaslání** a **webová stránka** s odkazem (na webu DigiStartu, až bude; do té doby třeba nezveřejněná stránka v Leadpages). Obojí v `_digistart-navod-instalace-claude/` (`navod.html`, `navod.pdf`), staví se skriptem `build.py`. Zveřejnění až po schválení.
2. **Účastnicím po zaplacení** pak stačí odkaz na tenhle návod a jeden úvodní prompt, který v aplikaci nastaví všechno potřebné pro práci v kurzu (samostatný úkol v projektu, Lenka 30. 10.).
3. Uvítací text „Proč DigiStart běží na Claudu“ na návod odkazuje (placeholder v bodě 1).

## Notes

**Změna 30. 10. 16:00 (Lenka):** z e-mailu přepsáno na samostatný návod nezávislý na kurzu, bez oslovení, data kurzu a podpisu; tvary neutrální (může číst kdokoli, i muž: pravidlo v `brain/voice.md`). Přidány obrázky a stavba webu a PDF.

**Obrázky (pořídil Claude 30. 10.):** stránky claude.com/download (pro Windows i pro Mac), claude.com/pricing a claude.ai/login, sejmuté v prohlížeči bez přihlášení, cookies odmítnuty, vyskakovací novinky skryté. **Chybí snímky z aplikace a z placení** (místa `> 📷` v textu): na Lenčině účtu už Pro je, takže obrazovky „Upgrade plan“ a platby nejdou zobrazit; instalaci by bylo nutné spustit znovu; Mac nemáme. Snímky z Lenčina účtu by navíc ukázaly její konverzace a údaje karty. Možnosti: (a) nechat návod jen s webovými snímky, (b) projít to jednou naostro na čistém účtu (třeba u Štěpánky nebo testerky z „Seznam“ úkolu) a snímky pořídit tam, (c) já na Lenčině počítači sejmu aspoň prázdné okno aplikace, s oříznutím osobních údajů.

**Zdroje (ověřeno 30. 10. 2026):**
- https://claude.com/download — horní tlačítko podle počítače („Download for Windows“ + „Windows (arm64)“ + Microsoft Store; na Macu „Download for macOS“); rámeček „Desktop“ s macOS, Windows, Windows (arm 64); „Some features are only available to paid plans“.
- https://support.claude.com/en/articles/10065433-installing-claude-desktop — „macOS 13 (Ventura) or higher“, „Windows 10 or higher“; „Open the file to complete installation“, „Launch Claude from your Applications folder (Mac) or Start menu (Windows)“, „Sign in with your account“; Cowork (místní soubory) jen na placených plánech.
- https://support.claude.com/en/articles/13345190-get-started-with-cowork — místní soubory jen v aplikaci pro macOS nebo Windows, jen placené plány.
- https://claude.com/pricing — Pro „$20 if billed monthly“, „$17“ měsíčně při roční platbě („$200 billed up front“); „Prices shown don't include applicable tax“; platba kartou.
- https://claude.ai/login — „Continue with Google“, „Continue with Apple“, „Enter your email“, „Continue with email“ (vidět 30. 10.).
- https://support.claude.com/en/articles/8325609-how-do-i-sign-up-for-the-pro-plan — odkaz e-mailem; Settings → Billing → „Upgrade plan“ → „Get Pro plan“ → měsíčně/ročně → „Subscribe“; automatické obnovování.
- https://support.claude.com/en/articles/8325617-how-do-i-cancel-my-paid-claude-subscription — Settings → Billing → „Cancel“; plán platí do konce období; zrušit aspoň 24 hodin před další platbou.

**Co jsem neověřil (domněnky):**
- Přihlášení přímo v aplikaci (C1): Anthropic píše jen „Sign in with your account“; že nabídka odpovídá webu, odhaduji.
- Mac: přetažení do složky Aplikace a dotaz „Otevřít“; Windows: dotaz „Ano“. Běžné chování počítačů, ne z Anthropicu.
- „Snapdragon“ u Windows (arm64): moje vysvětlení.
- Kde přesně se ukáže „Pro“ (C2) a úvodní otázky (A3).
- Jazyk rozhraní: návod používá anglické názvy tlačítek z webu a nápovědy; jestli aplikace nabízí češtinu, jsem neověřoval.

**Pravidla brainu:** cena „podle ceníku Anthropicu 20 USD měsíčně“ s poznámkou o změně (compliance); bez prodeje; „vy“ s malým v. Věta „Hotovo, aplikace je připravená“ místo „jste připravená“ kvůli neutrálním tvarům.
