# Postup: Git záloha vaultu (od 260915)

Přesunuto z `CLAUDE.md` 260926 (zkrácení hlavního návodu). `CLAUDE.md` drží jen jádro (Claude commituje, Lenka pushuje).

Vault zůstává primárně na Google Disku (sync beze změny) — Git je nad tím **přidaná** verzovaná
vrstva, ne náhrada. Repozitář: `https://github.com/lenkadv/vault` (privátní).

- **Rozsah:** trackuje se jen aktivní textový obsah — `areas/, projects/, gtd/, zettelkasten/,
  daily/, weekly-reviews/, quarterly-reviews/, decisions/, inbox/, resources/ (poznámky, ne
  přílohy), GrowOS/ (text), CLAUDE.md` a další kořenové soubory.
- **Mimo Git** (zůstává jen na Disku, viz `.gitignore` v kořeni vaultu): `archive/`,
  `.trash/` (`GrowOS-0.1-archiv/` je od 260926 úplně mimo vault, `G:\Můj disk\GrowOS-0.1-archiv`), velké binárky (obrázky, PDF, pptx, zip), `.env` soubory
  (tajemství), Google Disk cloudové odkazy (`.gsheet`/`.gdoc`/…), lokální/strojová nastavení
  (`.obsidian/workspace.json`, `.claude/settings.local.json`).
- **Claude nesmí pushovat** — bezpečnostní klasifikátor blokuje `git push` (i `git remote add`)
  jako "out-of-place publication". Claude může lokálně `git add` + `git commit` (např. při
  zavírání session), ale **push na GitHub musí spustit Lenka sama** v PowerShellu:
  ```powershell
  cd "G:\Můj disk\vault"
  git push
  ```
- Instalováno přes YouCloned/AI Clone setup (viz [[resources/youcloned-ai-clone-setup]]) —
  Cursor se nainstaloval, ale **nepoužívá se** jako pracovní prostředí, zůstáváme u Claude Code
  (Code tab). NotebookLM a Supabase jsou zatím jen připravené `.env` placeholdery, nenastavené.

## Proč git, když je vault na Disku (261029, vysvětleno Lence)

**Disk** drží vault synchronizovaný mezi zařízeními. U jednotlivého souboru má koš (30 dní) a historii verzí (zhruba 30 dní nebo 100 verzí). Vrací ale vždy jeden soubor, ne celý vault najednou. A když se něco přepíše nebo smaže, synchronizace to tiše rozešle všude.

**Git** přidává:
- historii celého vaultu v čase (od 15. 9. 2026 přes 470 commitů, každý s popisem, co se změnilo),
- návrat ke stavu ze dne X: jeden soubor nebo celou složku, bez ohledu na 30 dní,
- přehled, co se mezi dvěma dny změnilo (třeba co Claude ve vlákně upravil),
- ochranu proti tichému přepsání: commit je otisk, který synchronizace nepřepíše,
- zálohu mimo Google (GitHub, privátní repozitář).

**Commit** = otisk stavu uložený ve složce `.git` na Disku. **Push** = odeslání otisků na GitHub. Bez pushe historie funguje, ale leží jen na Disku: když se pokazí Disk nebo účet Google, zmizí s ním. Push je tedy ta „záloha mimo Google“. Commity dělá Claude sám, Lence zbývá jen push.

**Využití:** (1) „Vrať mi, jak vypadal soubor X v pondělí“ — Claude dohledá v historii. (2) „Co se včera ve vaultu změnilo?“ — přehled změn podle commitů. (3) Po nepovedené hromadné úpravě (Claude, plugin, synchronizace) vrátit celou složku najednou.

Mimo git zůstávají obrázky, PDF, `archive/` a `.env` (viz výš), ty chrání jen Disk.

**Přístup odjinud (261029, Lenčina otázka k notebooku):**
- *Notebook s aplikací Claude:* cesta přes Disk (Disk Google pro počítač + Obsidian + Claude Code), git k tomu netřeba. Na Disku ale nejsou věci ve `C:\Users\Lenka\.claude\` — paměť (`projects/G--M-j-disk-vault/memory/`), 37 globálních skillů, hooky (čas, „zavírám“) a `settings.json`. Bez nich by Claude na notebooku vault viděl, ale neznal paměť a pravidla z hooků. Řešení až při pořízení notebooku: tuhle složku přenést nebo synchronizovat.
- *Prohlížeč nebo telefon bez instalace:* tady git pomáhá. Cloudová sezení Claude Code (claude.ai/code) a projekty v claude.ai pracují s repozitářem na GitHubu, ne s Diskem. Konektor Disku v claude.ai umí hledat a číst jednotlivé soubory, ale ne pracovat s vaultem jako celkem. Omezení: na GitHubu je jen to, co bylo pushnuté, bez obrázků a PDF; změny z cloudu vznikají ve větvi na GitHubu a do vaultu na Disku se musí stáhnout (ověřit při prvním použití).
