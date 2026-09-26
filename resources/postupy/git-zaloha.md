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
