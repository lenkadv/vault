---
type: course-guide
headline: "Návod pro účastnice: Claude Pro, aplikace, složka DigiStart a první zadání v Claude Code (Windows i Mac)"
skill: ""
status: review
sealed:
  - _digistart-navod-ucastnice/navod.pdf sha256:2046c2167f78e8a6778225843d044392b1539cf056d8e666a79d34815a7e9f57
  - _digistart-navod-ucastnice/navod.html sha256:9260ec9f88783ec672bd76134992d19894c821293aeb1ad9034ed9a5f88c0c61
  - _digistart-navod-ucastnice/img/01-stazeni-windows.png sha256:efaef047e13e6229b3bef00d8570b60b14447e122c29df2ee3a01daeab824bf7
  - _digistart-navod-ucastnice/img/02-stazeni-mac.png sha256:1a7cae383b04f6061455ab2182cbffe90d58ac7f3a38caa36716c853e057ddda
  - _digistart-navod-ucastnice/img/03-stazeni-vyber.png sha256:8dc59558654949e330643e63dec4d133edc4c68a216c0a6af0e8e9ffb1fc7405
  - _digistart-navod-ucastnice/img/04-cenik-pro.png sha256:a5b54ad553b89fddc90b2c756fdc6ff5245bf426f1b47db6ec3e40ac4196eeb2
  - _digistart-navod-ucastnice/img/05-prihlaseni.png sha256:bad88f30bdd7ace26d70f3c20f10a07149cca62d182a82df9f7cc8ea510ccc9b
id: gy6lrimm00
business: digistart
channel: course
created: 2026-10-30
note: pár úprav jsem udělala, další poznámky v textu jsou označené +++
kanban_order: V0
---

# Návod pro účastnice před prvním setkáním

**Co to je:** rozšířená verze schváleného návodu na instalaci (`digistart-navod-instalace-claude.md`, veřejný na https://lenka-dvorakova.lpcontent.net/wmKsox8ltF). Části A–C jsou z něj beze změny, přibyly části D (složka DigiStart) a E (Claude Code a úvodní prompt). Dostanou ho jen účastnice po zaplacení (Lenka 30. 10.). Zadání v části E se při stavbě bere z položky `digistart-uvodni-prompt.md`, takže je jen na jednom místě.

Web a PDF: `_digistart-navod-ucastnice/navod.html` a `navod.pdf`, staví se skriptem `build.py`.

---

<!-- TEXT NÁVODU: mezi značkami níž. %PROMPT% nahradí build.py blokem z digistart-uvodni-prompt.md. -->
<!-- NAVOD-START -->

# Než přijdete na první setkání DigiStartu

**Krok za krokem pro Windows i Mac: Claude Pro, aplikace Claude, vaše pracovní složka DigiStart a první zadání v Claude Code.**

Na prvním setkání budeme rovnou pracovat. Abychom využili čas naplno, bude se nám hodit mít pár věcí nachystaných dopředu. Postupujte podle tohoto návodu, příprava by vám neměla zabrat ani hodinu.

Claude je umělá inteligence od americké firmy Anthropic. V kurzu s ním budete pracovat v aplikaci v počítači, v části, která se jmenuje **Claude Code**. Tam Claude pracuje přímo s vašimi soubory ve složce, kterou mu určíte, a čte si z ní i pokyny, jak s vámi má pracovat. Takovou složku si v tomto návodu připravíte, bude se jmenovat DigiStart. Aby to fungovalo, je potřeba mít placeným plán Claude, alespoň verzi Pro.

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
3. **Napište Claudovi první zprávu**, třeba „Ahoj, zkouším, jestli mi to funguje“, a stiskněte Enter.
   Za chvilku vám Claude odpoví. Aplikace funguje. Teď ještě připravíte pracovní složku a Claude Code.

## D. Pracovní složka DigiStart

Do téhle složky si budete v kurzu ukládat všechno potřebné: svoje poznámky, hotovou práci a později i návody, podle kterých Claude pracuje.

**Založte si složku s názvem `DigiStart`:**

* **Windows:** přímo na disku C:, takže bude `C:\DigiStart`.
* **Mac:** ve své domovské složce (má název podle vašeho jména v počítači).

Krátká cesta je schválně. Windows mají limit na délku cesty k souboru a u dlouhých cest hlásí chyby. Při zkoušce na to narazila Štěpánka ve OneDrivu, kde cesty bývají dlouhé.

Máte všechno zvyklá ukládat na Google Disk, OneDrive nebo Dropbox, aby se vám to zálohovalo? Můžete tam DigiStart založit taky. Dejte ji ale hned do hlavní složky Disku, ne hluboko do podsložek, a nastavte, aby byla v počítači vždycky celá, ne jen „online“.

## E. Claude Code a první zadání

1. **V aplikaci Claude klikněte nahoře v levém panelu na „Code“.**
   Pokud vidíte jen ikonky, najeďte na ně myší a ukáže se název.
//obrázek//
2. **Vyberte, kde má Claude pracovat.** U políčka na psaní je řada ovládacích prvků. Klikněte na první z nich (výběr prostředí) a ve skupině „Local“ zvolte první položku. „Local“ znamená, že Claude pracuje přímo ve vašem počítači.
//obrázek//
3. **Vedle něj klikněte na výběr složky, zvolte „Open folder…“ a vyberte svou složku DigiStart.**
4. **Nastavte režim „Accept edits“.** V řadě pod políčkem na psaní je výběr režimu. V režimu „Accept edits“ Claude sám zakládá a upravuje soubory ve složce DigiStart a nemusíte mu odklikávat každý krok. Zeptá se jen u věcí mimo tuhle složku nebo u složitějších příkazů. Aplikace si režim pro složku DigiStart zapamatuje.
5. **Zkopírujte celé zadání z rámečku níže**, vložte ho do políčka na psaní a stiskněte Enter.

%PROMPT%

6. **Nechte Clauda pracovat.** Nejdřív vám napíše, že všechno funguje. Pak ve složce založí, co je v zadání, a na konci vám shrne, co udělal. Kdyby se přesto na něco zeptal, povolte to, pokud se to týká složky DigiStart. Když si nejste jistá, napište mu „Nerozumím, vysvětli mi to jednoduše.“
7. **Zkontrolujte výsledek.** Otevřete složku DigiStart v počítači. Měly byste v ní vidět složky `prace`, `poznamky` a `00 INBOX` a soubory `mapa.md` a `CLAUDE.md`. Složka `.claude` (na skilly) může být skrytá, to je v pořádku.

**Příště:** stačí otevřít aplikaci a kliknout na „Code“. U políčka na psaní jen zkontrolujte, že je vybraná složka DigiStart. Kdyby tam byla jiná, vyberte DigiStart přes „Open folder…“. Claude si při každém otevření sám přečte pokyny a postupy, které jste spolu připravili, takže mu nemusíte nic vysvětlovat znovu. Předchozí konverzace najdete v levém panelu.

**Dobré vědět:** Plán Pro má limit, kolik práce zvládne Claude za pět hodin a za týden. Na přípravu i na kurz to běžně stačí. Kdyby vám Claude napsal, že jste limit vyčerpala, počkejte, až se obnoví.

## Hotovo? Před prvním setkáním máte:

* aplikaci Claude s plánem Pro,
* složku DigiStart a v ní složky a soubory, které vám Claude připravil,
* zkušenost, že Claude Code ve vaší složce funguje.

## Když se něco zasekne

Nejdřív se zeptejte Clauda. Myslíme to vážně: kurz je o tom, že s ním budete řešit věci, které neznáte, a technické potíže jsou jeho obor. Otevřete v prohlížeči nebo v telefonu [claude.ai](https://claude.ai), napište, co se děje, a přidejte snímek obrazovky. Odpoví hned, nikdy ho to neotráví a na rozdíl od nás nespí.

Pomoc najdete také v nápovědě Anthropicu na [support.claude.com](https://support.claude.com). Návod k instalaci tam najdete pod názvem „Install Claude Desktop“.

Když neporadí ani Claude, ani nápověda, pošlete nám snímek obrazovky na [PLACEHOLDER: kam účastnice píše, když se zasekne, e-mail nebo jiný kontakt]. Podíváme se na to, nebo to spolu vyřešíme na prvním setkání.

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
- **Režim „Accept edits“ místo „Manual“ (Lenka 30. 10. 22:29: v Manualu by účastnice pořád potvrzovala věci, kterým nerozumí).** Podle code.claude.com/docs/en/desktop a /permission-modes (30. 10.): Accept edits sám přijímá úpravy souborů a běžné příkazy jako `mkdir`, `mv`, `cp` (i `rm`) uvnitř pracovní složky, ptá se u cest mimo ni a u ostatních příkazů; režim „is remembered per folder“. Režim „Auto“ (bez dotazů, kontroluje ho klasifikátor) je podle nápovědy dostupný na všech plánech u novějších modelů; nevybral jsem ho, protože Accept edits drží Clauda ve složce DigiStart. Rozhodne Lenka.
- Že si aplikace pamatuje naposledy vybranou složku: nápověda to neříká (Lenka to tak má vyzkoušené). Proto v „Příště“ jen „zkontrolujte“.
- **Synchronizované složky (Lenka 30. 10.: ona má složku na Google Disku, Štěpánka na OneDrivu):** zákaz změněn na doporučení. Jediný doložený problém je limit délky cesty ve Windows (Štěpánka 11. 10., OneDrive). Rada „nastavit, aby byla složka v počítači celá, ne jen online“ je moje obecná znalost (soubory jen v cloudu Claude nepřečte, dokud se nestáhnou), v nápovědě Anthropicu o tom nic není.
- `//obrázek//` (Lenčina značka): build.py ji vykreslí jako „(Sem přijde snímek obrazovky z aplikace.)“, dokud snímek nebude.
- Kde přesně leží řada ovládacích prvků (nápověda: „under the prompt box“ u režimu a modelu). Napsal jsem „u políčka na psaní“.
- **Složku si účastnice zakládá sama (Lenka 30. 10. 21:06):** „budeme předpokládat, že si složku umí vytvořit samy“. Proto v části D jen kde a jak se má jmenovat, bez klikacího postupu. Varianta „složku založí Claude“ vyzkoušena a odložena jako složitější.
- Že Claude Code ve Windows nepotřebuje Git pro běžnou práci: tak to stojí v nápovědě, ale na čistém počítači neověřeno.
- **Snímky z aplikace chybí** jako u základního návodu (Lenčina aplikace by ukázala její rozhovory a složky). Části D a E jsou bez obrázků.

**Placeholder:** kontakt, kam účastnice píše, když se zasekne (část „Když se něco zasekne“). Základní veřejný návod ho nemá, tady pro platící účastnice dává smysl.

**Rod:** účastnice v ženském rodě (dostanou ho jen přihlášené, vlastní text kurzu). Kdyby se přihlásil muž, je to jeden text navíc; rozhodne Lenka.
