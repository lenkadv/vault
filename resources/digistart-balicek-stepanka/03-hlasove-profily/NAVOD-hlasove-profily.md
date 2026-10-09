# Návod: hlasové profily jako skill

**K čemu to je:** aby AI psala e-maily, nabídky a další texty tak, jak píšete vy, a abyste je nemusela přepisovat. Profil není jednorázový prompt, ale **soubor, který se učí z vašich oprav**.

**Co v balíčku je**

| Soubor | K čemu |
|---|---|
| `skill/hlasove-profily/SKILL.md` | samotný skill: postup od úvodního rozhovoru po trvalou smyčku učení |
| `skill/hlasove-profily/references/sablona-profilu.md` | šablona profilu (vlastnosti, jsem/nejsem, kontrolní seznam, poučení z přepisů) |
| `skill/hlasove-profily/references/rozbor-vzorku.md` | co se u vzorků sleduje |
| `skill/hlasove-profily/references/smycka-uceni.md` | jak se z přepisů tvoří poučení |
| `skill/psani-textu/SKILL.md` | **druhý skill: používá hotové profily k psaní konceptů libovolných typů textů** (nabídka, zpráva, příspěvek, dopis…): vybere profil, doptá se na chybějící informace, napíše koncept |
| `skill/psani-textu/references/zadani-podle-typu.md` | co je u kterého typu textu potřeba vědět, než se začne psát |

## Jak to funguje (v kostce)

1. **Úvodní rozhovor.** Skill se zeptá, kde máte své texty (pošta, dokumenty, soubory), k čemu hlas potřebujete a co už o svém stylu víte.
2. **Seznámení se zdroji.** Přečte vaše texty (jen čtení) a udělá inventuru.
3. **Vyhodnocení.** Sám navrhne, **kolik profilů je potřeba** (typicky osobní + několik pracovních, třeba odpovědi na maily, nabídky, zprávy). Vy návrh schválíte nebo upravíte.
4. **Banka vzorků a profil** pro každý schválený profil, s otázkami k nejasným místům.
5. **Zkouška:** tři testovací texty, vy říkáte „napsala bych / nenapsala bych“.
6. **Učení:** od té chvíle se **každá vaše oprava** porovná s původním návrhem a rozdíl se uloží do profilu jako poučení. Opakující se poučení se povýší do těla profilu.

## Jak se hotové profily používají: skill „psani-textu“

Když jsou profily hotové, napíšete třeba **„Zpracuj nabídku pro paní Novákovou na tři workshopy.“** Skill `psani-textu`:
1. pozná typ textu (nabídka),
2. podívá se do `hlas/00-prehled-profilu.md` a vybere profil (pokud sedí víc profilů, zeptá se; pokud žádný, nabídne nejbližší nebo vytvoření nového),
3. přečte profil včetně dosavadních poučení,
4. zeptá se **jen na to, co chybí** (cena, termín, rozsah, platnost…), nic nevymýšlí; co nezná, označí `[DOPLNIT: …]`,
5. napíše koncept v hlasu profilu, ukáže, který profil použil a co je potřeba ověřit,
6. po vašich úpravách zapíše poučení do profilu.

Nic neodesílá ani nepublikuje. **Odpovědi na e-maily** (a práci přímo ve schránce) dělá přísnější skill `koncepty-odpovedi` (viz `04-skill-maily`).

## Instalace

### Varianta 1 (doporučená): Claude Code

1. Zkopírujte do **`C:\Users\<vaše jméno>\.claude\skills\`** složky `skill/hlasove-profily` a `skill/psani-textu` (obě i s podsložkou `references`). Vznikne `…\.claude\skills\hlasove-profily\SKILL.md` a `…\.claude\skills\psani-textu\SKILL.md`. (Mac: `~/.claude/skills/`.)
2. Otevřete Claude Code ve složce, kam chcete ukládat profily (např. `Dokumenty\hlas`), a napište: **„Chci vytvořit hlasové profily.“** (Skill se spustí sám, nebo napište `/hlasove-profily`.)
3. Skill vytvoří složku `hlas/` s profily přímo v pracovní složce. Všechny další použití (e-maily, texty) pak čtou profily odtud.

### Varianta 2: Claude v aplikaci nebo na webu (claude.ai)

Zabalte každou ze složek `hlasove-profily` a `psani-textu` do vlastního ZIP a nahrajte ji v *Nastavení → Možnosti → Dovednosti (Skills)* (název a umístění se v aplikaci mění; případně se zeptejte asistentky). V tomhle režimu skill neukládá soubory přímo na váš disk, soubory s profily vám předá ke stažení a vy je uložíte do pevné složky a při dalším použití je do konverzace znovu přiložíte.

### Varianta 3: ChatGPT

ChatGPT skill v tomhle tvaru nenačte automaticky. Funguje to takhle:
1. Vytvořte **Projekt** („Hlasové profily“).
2. Do **Instrukcí projektu** vložte celý text `SKILL.md` (bez úvodního bloku mezi `---`).
3. Nahrajte do souborů projektu soubory z `references/` (obě složky). Pro psaní textů vytvořte druhý Projekt „Psaní textů“, do jeho instrukcí vložte `SKILL.md` ze `psani-textu` a nahrajte do něj hotové `profil.md` (a `00-prehled-profilu.md`).
4. V chatu napište: „Chci vytvořit hlasové profily“ a postupujte podle rozhovoru. Hotové profily a banky si ukládáte sama jako soubory, která projekt nezmění; po každé opravě vám asistentka řekne, co přidat do `profil.md`, a vy soubor v projektu nahradíte novou verzí.
5. Smyčka učení je v ChatGPT poloruční: asistentka vypíše text poučení, ale do souboru ho nezapíše. Pro plnou automatiku použijte Claude Code.

## Odkud vzít vaše texty

Skill vám u každého zdroje poradí. Možnosti:

| Zdroj | Jak |
|---|---|
| **Odeslaná pošta (Outlook)** | a) Pokud máte propojení Outlooku (viz `04-skill-maily/PRUVODCE-propojeni-mailu.md`), skill přečte složku *Odeslaná pošta*. b) Bez propojení: v Outlooku vyberte 30 až 50 odeslaných zpráv různých typů, otevřete je jednu po jedné a vložte jejich text (jen vaše věty, bez citované historie) do jednoho dokumentu Word nebo textového souboru, nebo je uložte jako `.txt` (*Soubor → Uložit jako → Pouze text*). |
| **Dokumenty (Word, PDF, Google Dok)** | složka na disku; skill přečte soubory, které mu určíte |
| **Zprávy z chatu** | textový export konverzace (např. WhatsApp: *Exportovat chat → bez médií*) |
| **Příspěvky, newslettery** | odkazy nebo uložené texty |

**Co do vzorků nepatří:** automatické odpovědi, přeposlané cizí texty, vaše texty psané někým jiným (asistentkou, AI), a vše, co nechcete ukazovat. Skill se vás před čtením zeptá a jména třetích osob v bance nahradí značkou.

## Co profil ve výsledku obsahuje

Pro každý profil složka `hlas/<profil>/` se souborem `banka.md` (vybrané vzorky) a `profil.md` (jednou větou, vlastnosti, jsem/nejsem, struktura textu, slovník, ukázka téhož sdělení v několika situacích, kontrolní seznam, poučení z přepisů).

## Pravidla, na která se můžete spolehnout

- Skill **čte, nepíše do vaší pošty ani nic neposílá**.
- Skill **nehodnotí** váš styl, jen ho popisuje.
- Soubory s profily zůstávají **u vás** (v pracovní složce).
- Když vám text AI přepíšete, jste u smyčky učení: skill zapíše, co jste změnila.

## Doporučený první průchod (cca 90 minut)

1. 15 min: úvodní rozhovor a výběr zdrojů.
2. 20 min: inventura a návrh sady profilů (schvalujete vy).
3. 30 min: první profil (obvykle osobní nebo pracovní e-mail).
4. 15 min: zkouška na třech testovacích textech.
5. 10 min: pojmenování dalšího profilu, který přijde na řadu.

Další profily po jednom, vždy v jiném sezení.
