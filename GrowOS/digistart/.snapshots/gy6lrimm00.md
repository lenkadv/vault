---
type: course-guide
headline: "Návod pro účastnice: Claude Pro, aplikace, složka DigiStart a první zadání v Claude Code (Windows i Mac)"
skill: ""
status: review
sealed:
  - _digistart-navod-ucastnice/navod.pdf sha256:87d28982e9fd0c70f741fe507dbf307580eae8ce920aade1016529b16b2c7b59
  - _digistart-navod-ucastnice/navod.html sha256:33232a50b0b5b3d9edbaa68b452e59acf31d27ef653848733e5889becbf54176
  - _digistart-navod-ucastnice/img/01-stazeni-windows.png sha256:efaef047e13e6229b3bef00d8570b60b14447e122c29df2ee3a01daeab824bf7
  - _digistart-navod-ucastnice/img/02-stazeni-mac.png sha256:1a7cae383b04f6061455ab2182cbffe90d58ac7f3a38caa36716c853e057ddda
  - _digistart-navod-ucastnice/img/03-stazeni-vyber.png sha256:8dc59558654949e330643e63dec4d133edc4c68a216c0a6af0e8e9ffb1fc7405
  - _digistart-navod-ucastnice/img/04-cenik-pro.png sha256:a5b54ad553b89fddc90b2c756fdc6ff5245bf426f1b47db6ec3e40ac4196eeb2
  - _digistart-navod-ucastnice/img/05-prihlaseni.png sha256:bad88f30bdd7ace26d70f3c20f10a07149cca62d182a82df9f7cc8ea510ccc9b
id: gy6lrimm00
business: digistart
channel: course
created: 2026-10-30
note: ""
---

# Návod pro účastnice před prvním setkáním

**Co to je:** rozšířená verze schváleného návodu na instalaci (`digistart-navod-instalace-claude.md`, veřejný na https://lenka-dvorakova.lpcontent.net/wmKsox8ltF). Části A–C jsou z něj beze změny, přibyly části D (složka DigiStart) a E (Claude Code a úvodní prompt). Dostanou ho jen účastnice po zaplacení (Lenka 30. 10.). Zadání v části E se při stavbě bere z položky `digistart-uvodni-prompt.md`, takže je jen na jednom místě.

Web a PDF: `_digistart-navod-ucastnice/navod.html` a `navod.pdf`, staví se skriptem `build.py`.

---

<!-- TEXT NÁVODU: mezi značkami níž. %PROMPT% nahradí build.py blokem z digistart-uvodni-prompt.md. -->
<!-- NAVOD-START -->

# Než přijdete na první setkání DigiStartu

**Krok za krokem pro Windows i Mac: Claude Pro, aplikace Claude, vaše pracovní složka DigiStart a první zadání v Claude Code.**

Na prvním setkání budeme rovnou pracovat. Aby nám neutekl čas instalací, připravte si prosím všechno podle tohoto návodu doma. Zabere to zhruba hodinu, většinou méně.

Claude je umělá inteligence od americké firmy Anthropic. V kurzu s ním budete pracovat v aplikaci v počítači, v části, která se jmenuje **Claude Code**. Tam Claude pracuje přímo s vašimi soubory v jedné složce, kterou mu určíte, a čte si z ní i pokyny, jak s vámi má pracovat. Proto návod počítá s placeným plánem Pro.

Celá příprava má pět částí:

* **A.** Založíte si účet a předplatíte Claude Pro.
* **B.** Stáhnete a nainstalujete aplikaci.
* **C.** Přihlásíte se a vyzkoušíte, že všechno funguje.
* **D.** Založíte si pracovní složku DigiStart.
* **E.** Otevřete v ní Claude Code a vložíte první zadání. Claude vám složku připraví pro práci v kurzu.

## Co budete potřebovat

* **Počítač** s Windows 10 nebo novějšími, nebo Mac se systémem macOS 13 (Ventura) nebo novějším. Pro telefon ani tabletu tenhle návod není určen.
* **E-mailovou adresu**, případně účet Google nebo Apple.
* **Platební kartu.** Plán Pro se platí kartou.

## A. Účet a předplatné Claude Pro

Předplatné platíte přímo firmě Anthropic. Podle ceníku Anthropicu stojí Claude Pro **20 USD měsíčně**. K ceně se může připočíst daň a Anthropic cenu může změnit. Aktuální ceník je na [claude.com/pricing](https://claude.com/pricing).

![Ceník Anthropicu, plán Pro: 20 USD při měsíční platbě, 17 USD měsíčně při roční platbě předem](_digistart-navod-ucastnice/img/04-cenik-pro.png)

1. **Otevřete v prohlížeči stránku [claude.ai](https://claude.ai).**
   Uvidíte přihlašovací okno se třemi možnostmi.

   ![Přihlášení na claude.ai: Continue with Google, Continue with Apple, nebo e-mail a Continue with email](_digistart-navod-ucastnice/img/05-prihlaseni.png)

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

   ![Stránka ke stažení na Windows: tlačítko Download for Windows, vedle Windows (arm64) a Microsoft Store](_digistart-navod-ucastnice/img/01-stazeni-windows.png)

   Na Macu uvidíte „Download for macOS“:

   ![Stránka ke stažení na Macu: tlačítko Download for macOS](_digistart-navod-ucastnice/img/02-stazeni-mac.png)

2. **Klikněte na velké černé tlačítko.**
   Na Windows platí pro většinu počítačů právě „Download for Windows“. Verze „Windows (arm64)“ je jen pro počítače se speciálním typem procesoru (například Snapdragon). Nevíte-li si rady, zvolte obyčejné „Download for Windows“.
   Kdyby stránka nabídla něco jiného, než máte, sjeďte níž k rámečku „Desktop“ a vyberte svůj systém tam:

   ![Rámeček Desktop: macOS, Windows a Windows (arm 64), každý s tlačítkem Download](_digistart-navod-ucastnice/img/03-stazeni-vyber.png)

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
   Za chvilku vám Claude odpoví. Aplikace funguje. Teď ještě připravíte pracovní složku a Claude Code.

## D. Pracovní složka DigiStart

Do téhle složky si budete v kurzu ukládat všechno: svoje poznámky, hotovou práci a později i skilly (návody, podle kterých Claude pracuje). Je schválně krátká a přímo na disku. Dlouhé cesty a synchronizované složky (OneDrive, Google Disk, Dropbox) dělají potíže, proto ji tam nezakládejte.

**Windows:**

1. **Otevřete Průzkumník souborů** (ikona žluté složky na hlavním panelu, nebo klávesy Windows + E).
2. **Vlevo klikněte na „Tento počítač“ a pak dvojklikem otevřete „Místní disk (C:)“.**
3. **Klikněte pravým tlačítkem myši do prázdného místa a vyberte „Nový“ → „Složka“.**
4. **Napište název `DigiStart` a stiskněte Enter.**
   Vaše složka je teď `C:\DigiStart`.

**Mac:**

1. **Otevřete Finder** (modrá ikona s obličejem v Docku).
2. **Otevřete svou domovskou složku** klávesami Shift + Cmd + H (v anglickém menu Go → Home). Má název podle vašeho jména v počítači.
3. **Založte novou složku** klávesami Shift + Cmd + N (v anglickém menu File → New Folder).
4. **Napište název `DigiStart` a stiskněte Enter.**

## E. Claude Code a první zadání

1. **V aplikaci Claude klikněte nahoře v levém panelu na „Code“.**
   Pokud vidíte jen ikony, najeďte na ně myší a ukáže se název.
2. **Vyberte, kde má Claude pracovat.** U políčka na psaní je řada ovládacích prvků. Klikněte na první z nich (výběr prostředí) a ve skupině „Local“ zvolte první položku. „Local“ znamená, že Claude pracuje přímo ve vašem počítači.
3. **Vedle něj klikněte na výběr složky, zvolte „Open folder…“ a vyberte svou složku DigiStart** (na Windows `C:\DigiStart`, na Macu `DigiStart` ve vaší domovské složce).
4. **Zkontrolujte režim „Manual“.** V řadě pod políčkem na psaní je výběr režimu. Nechte nebo nastavte „Manual“: Claude vám pak každou změnu nejdřív ukáže a počká na vaše schválení.
5. **Zkopírujte celé zadání z rámečku níže**, vložte ho do políčka na psaní a stiskněte Enter.

%PROMPT%

6. **Schvalujte.** Claude vám nejdřív napíše, že všechno funguje. Pak bude postupně ukazovat, co chce ve složce založit, a u každé změny počká, až ji schválíte. Schvalte všechno, co se týká složky DigiStart.
7. **Zkontrolujte výsledek.** Otevřete složku DigiStart v Průzkumníku nebo ve Finderu. Měly byste v ní vidět složky `prace`, `poznamky` a `00 INBOX` a soubory `mapa.md` a `CLAUDE.md`. Složka `.claude` (na skilly) může být skrytá, to je v pořádku.

**Příště:** v aplikaci klikněte na „Code“, znovu zvolte „Local“ a přes „Open folder…“ složku DigiStart. Claude si při každém otevření sám přečte pokyny ze souboru `CLAUDE.md`, takže mu nemusíte nic vysvětlovat znovu. Předchozí rozhovory najdete v levém panelu.

**Dobré vědět:** plán Pro má limit, kolik práce zvládne Claude za pět hodin a za týden. Na přípravu i na kurz běžně stačí. Kdyby vám Claude napsal, že jste limit vyčerpala, počkejte, až se obnoví.

## Hotovo? Před prvním setkáním máte:

* aplikaci Claude s plánem Pro,
* složku DigiStart a v ní složky a soubory, které vám Claude připravil,
* zkušenost, že Claude Code ve vaší složce funguje.

## Když se něco zasekne

Udělejte si snímek obrazovky toho, co vidíte, a pošlete nám ho [PLACEHOLDER: kam účastnice píše, když se zasekne, e-mail nebo jiný kontakt]. Pomoc najdete také v nápovědě Anthropicu na [support.claude.com](https://support.claude.com). Návod k instalaci tam najdete pod názvem „Install Claude Desktop“.

*Návod připravily Lenka Dvořáková a Štěpánka Uličná (DigiStart). Ověřeno podle stránek Anthropicu 30. 10. 2026. Anthropic svoje stránky i aplikaci průběžně mění, takže některé obrázky nebo názvy tlačítek mohou vypadat trochu jinak. Obrázky jsou snímky stránek claude.com a claude.ai.*

<!-- NAVOD-END -->

---

## Notes

**Zdroje k částem D a E (ověřeno 30. 10. 2026):**
- https://code.claude.com/docs/en/desktop-quickstart — Claude Code je v Pro („requires a Pro, Max, Ultra, Team, or Enterprise subscription“); „in the Code tab at the top of the app's sidebar“; prostředí: první ovládací prvek, „select the top entry in the Local group“; složka: ovládací prvek vedle, „Open folder…“; aplikace Claude Code obsahuje, Node.js ani CLI netřeba; v režimu Manual „Claude proposes each change and waits for your approval“.
- https://code.claude.com/docs/en/desktop — režimy Manual, Accept edits, Plan, Auto; výběr režimu „in the row under the prompt box“; Git jen pro izolované relace (Worktree), ve výchozím stavu vypnuté; levý panel se seznamem relací.
- https://code.claude.com/docs/en/memory a /skills — `CLAUDE.md` ze složky, kde se Claude Code spustí, „at the start of every session“; skilly z `.claude/skills/` v té složce.
- https://support.claude.com/en/articles/11145838-use-claude-code-with-your-pro-max-or-ultra-plan — Pro má limit na pět hodin a týdenní limit, Claude Code a chat ho sdílejí.

**Co jsem neověřil (domněnky, ověřit při prvním průchodu na čistém počítači):**
- Že je „Manual“ výchozí režim: nápověda ho neoznačuje jako výchozí, odvozuji z nastavení. Proto v návodu „nechte nebo nastavte“.
- Přesné názvy tlačítek na schválení změny: nápověda je neuvádí („buttons to approve or decline“), v návodu jen „schvalte“.
- Kde přesně leží řada ovládacích prvků (nápověda: „under the prompt box“ u režimu a modelu). Napsal jsem „u políčka na psaní“.
- Postup ve Windows (Průzkumník, „Tento počítač“, „Nový → Složka“) a na Macu (Shift + Cmd + H, Shift + Cmd + N) je běžné chování systému, ne z Anthropicu. České názvy v menu Macu jsem nepsal, protože si jimi nejsem jistý.
- Že Claude Code ve Windows nepotřebuje Git pro běžnou práci: tak to stojí v nápovědě, ale na čistém počítači neověřeno.
- **Snímky z aplikace chybí** jako u základního návodu (Lenčina aplikace by ukázala její rozhovory a složky). Části D a E jsou bez obrázků.

**Placeholder:** kontakt, kam účastnice píše, když se zasekne (část „Když se něco zasekne“). Základní veřejný návod ho nemá, tady pro platící účastnice dává smysl.

**Rod:** účastnice v ženském rodě (dostanou ho jen přihlášené, vlastní text kurzu). Kdyby se přihlásil muž, je to jeden text navíc; rozhodne Lenka.
