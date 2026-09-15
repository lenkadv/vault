# YouCloned / AI Clone — instalace a rozhodnutí

Tohle je vaultová kopie toho, co si o integraci YouCloned kurzu (Jon Benson) píšu do vlastní paměti — ať to Lenka vidí a může upravovat, ne jen věřit, že si to pamatuju.

**260915** proběhla integrace nakoupeného kurzu YouCloned (AI Clone od Jona Bensona) do existujícího vaultu — kurz počítá s instalací od nuly, vault ale už existoval a byl rozsáhlý (3 GB), takže postup byl adaptovaný, ne 1:1 podle videa.

## Co se nainstalovalo (přes `youcloned.bnsn.ai/install/windows.ps1`)

- Node.js, Python, Git, Cursor, Claude Code CLI (přes winget)
- 33 nových globálních Claude Code skillů do `~/.claude/skills` (design/prezentace: `/design`, `/slides`, `/banner-design`, `/impeccable-*`, `/ui-ux-pro-max` aj.) — netýkají se GTD workflow, jsou to nástroje na vyžádání
- `.env` template v kořeni vaultu (Supabase/ElevenLabs/OpenAI klíče, zatím prázdné)
- Instalátor **nepřepsal** existující `CLAUDE.md` (má vlastní kontrolu na existenci souboru)

## Rozhodnutí (a proč)

- **Cursor nainstalován, ale nepoužívá se** — zůstáváme u Claude Code desktop (Code tab), který funguje; Cursor by byl duplicitní vrstva pro vault management (ne psaní kódu)
- **Google Disk sync zůstává** jako primární záloha/multi-device přístup, Git je přidaná verzovaná vrstva navrch, ne náhrada — video (Jon Benson) sync explicitně nedoporučuje, ale jeho postup počítá s prázdným vaultem od nuly, ne s existujícím 3GB systémem
- **Git repo scoped přes `.gitignore`** — jen aktivní textový obsah, ne `archive/`, `GrowOS-0.1-archiv/`, binárky, `.env`. Detaily viz sekce "Git záloha vaultu" v `CLAUDE.md`
- **Zvolen celý balík** (NotebookLM + Supabase), ale zatím jen připravená kostra (`.env`) — nenastaveno, žádné účty založené

**GitHub repo:** `https://github.com/lenkadv/vault` (privátní), první push 260915

**Provozní detail:** bezpečnostní klasifikátor blokuje Claudovi `git push` i `git remote add` jako "out-of-place publication" — Claude může jen lokálně committovat, push musí spustit Lenka sama v PowerShellu (`git push`).

## Pokračování 260915 večer — reálný test na 10x English sales page

Plný technický postup a aktuální next-action → [[projects/lcenglish-10x-english-sales-page]].

Vyzkoušeno a opuštěno (v tomhle pořadí):
1. WordPress REST API — stripuje `<style>`/`<link>` přes `wp_kses`, i pro administrátorský účet
2. Ruční psaní do Custom HTML bloku přes simulaci klávesnice — zamrzávalo prohlížeč (React re-render na dlouhý text)
3. Leadpages MCP `create_page` samotné — stránka vznikla v izolovaném "Nova" systému, neviditelná ve starém (Classic) Leadpages dashboardu

**Funkční řešení:** Leadpages MCP `create_page` (content se nestripuje) → upgrade zastaralého WP pluginu "Leadpages Connector" (verze 2.3.13, legacy) na novou verzi 1.3.0 (podporuje Nova i Classic účet zároveň — verze číslovaná tak, že to WordPress update mechanismus sám nikdy nenabídne, protože 2.3.13 vypadá číselně novější) → OAuth propojení v novém pluginu → tlačítko **"Publish to WordPress"** v Leadpages dashboardu. Spolehlivě funguje, žádné strippování stylů.

## Viz také

- [[projects/lcenglish-10x-english-sales-page]]
