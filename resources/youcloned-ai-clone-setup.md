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
- **Zvolen celý balík** (NotebookLM + Supabase), ale zatím jen připravená kostra (`.env`). Aktualizace 260926: NotebookLM napojen, Supabase vědomě odložena (viz sekce níže)

**GitHub repo:** `https://github.com/lenkadv/vault` (privátní), první push 260915

**Provozní detail:** bezpečnostní klasifikátor blokuje Claudovi `git push` i `git remote add` jako "out-of-place publication" — Claude může jen lokálně committovat, push musí spustit Lenka sama v PowerShellu (`git push`).

## Struktura složek — Jonova vs. naše (260926)

Jon v kurzu doporučuje plochou strukturu vaultu. Instalátor náš vault nepřestavěl a přestavovat se nebude (rozbily by se wiki-linky, Dataview/Tasks pohledy, skilly, GrowOS i Git záloha). Jeho principy máme, jen pod jinými názvy — když lekce řekne „dej to do X“, přeložit podle tabulky:

| Jon | Náš vault |
|---|---|
| `CLAUDE.md` v kořeni (critical) | `CLAUDE.md` v kořeni — stejné |
| `attachments/` | `assets/` |
| `reference/` | `resources/` |
| `Jon Benson/` (osobní poznámky, deník, nápady) | `daily/`, `areas/`, `projects/`, `inbox/`, `zettelkasten/` |
| `Course – YouCloned/` | tahle poznámka |
| `voice.md` | byznysy: `GrowOS/lcenglish/brain/voice.md`, `GrowOS/tadylenka/brain/voice.md`; osobní zatím není (kandidát: `resources/voice.md`) |

Proč na hloubce složek nezáleží: Jonovo „flat is fast“ řeší, aby Claude soubory našel. U nás to zajišťuje `CLAUDE.md` (popisuje, co kde je) + vyhledávání. Kdyby nějaký krok kurzu počítal s přesnou Jonovou strukturou, řešit u konkrétní lekce.

## NotebookLM ↔ Claude Code (260926)

Jon ve videu propojuje NotebookLM s Claude Code „v Cursoru“ — ve skutečnosti jen spouští Claude Code v terminálu Cursoru. **Cursor není potřeba**, funguje to přímo tady v Code tabu.

- Nástroj: neoficiální **notebooklm-py** (https://github.com/teng-lin/notebooklm-py), příkaz `notebooklm`. Nainstalováno přes pip, přidáno do PATH, skill `notebooklm` pro Claude Code.
- Přihlášení: Lenka se přihlásí sama v okně Chromu (Windows Hello/passkey nabídku odmítnout). Kdyby to přestalo fungovat, stačí říct „přihlas NotebookLM znovu“.
- Použití: stačí napsat např. „zeptej se notebooku Male gaze na…“ — Claude najde notebook a odpoví s citacemi zdrojů.
- Pozor: dotaz se připíše do poslední konverzace v daném notebooku (uvidíš ho v NotebookLM). Odpovědi jsou shrnutí — do LN notes dál jen doslovné citace ze Zotera.
- Riziko: neoficiální rozhraní Googlu, může se občas rozbít.

## Supabase — zatím ne (260926)

Jon (modul Supabase) ji nabízí na tři věci; u Lenky je každá už pokrytá jinde:

| Jon | U nás |
|---|---|
| Dotazy s filtry nad strukturovanými daty | Notion databáze (Slepé kuře, Knihovna, Skills, Brandl) + Obsidian Bases s YAML vlastnostmi (Content Bank, Zdroje, Poznámky) |
| Paměť mezi vlákny („co jsem dělala včera“) | daily notes + Claude memory + hledání v minulých seancích |
| Sémantické hledání (pgvector) | NotebookLM (napojeno 260926) |

**Rozhodnutí:** nezakládat. Byla by to další úložiště navíc (proti zjednodušování), s dalším tajemstvím ke správě a daty, do kterých Lenka sama nenahlédne. Slot `DATABASE_URL` v kořenovém `.env` zůstává prázdný a připravený.

**Aktualizace 260927:** pro Databanku AI zvoleny Obsidian Bases, ne Supabase (Lenka ji chce procházet očima). Konkrétní limity pro návrat (500 poznámek / míjení shod / hledání v plném textu) jsou v [[resources/postupy/databanka]].

**Kdy se vrátit:** při konkrétním úkolu, kde narazí Notion — Claude má automaticky ukládat stovky/tisíce záznamů, které nepotřebuješ procházet očima, nebo vlastní aplikace (např. pro lcenglish), která potřebuje databázi. Založení pak ~10 min (supabase.com → přihlášení přes GitHub → nový projekt → connection string do `.env`).

## Pokračování 260915 večer — reálný test na 10x English sales page

Plný technický postup a aktuální next-action → [[projects/lcenglish-10x-english-sales-page]].

Vyzkoušeno a opuštěno (v tomhle pořadí):
1. WordPress REST API — stripuje `<style>`/`<link>` přes `wp_kses`, i pro administrátorský účet
2. Ruční psaní do Custom HTML bloku přes simulaci klávesnice — zamrzávalo prohlížeč (React re-render na dlouhý text)
3. Leadpages MCP `create_page` samotné — stránka vznikla v izolovaném "Nova" systému, neviditelná ve starém (Classic) Leadpages dashboardu

**Funkční řešení:** Leadpages MCP `create_page` (content se nestripuje) → upgrade zastaralého WP pluginu "Leadpages Connector" (verze 2.3.13, legacy) na novou verzi 1.3.0 (podporuje Nova i Classic účet zároveň — verze číslovaná tak, že to WordPress update mechanismus sám nikdy nenabídne, protože 2.3.13 vypadá číselně novější) → OAuth propojení v novém pluginu → tlačítko **"Publish to WordPress"** v Leadpages dashboardu. Spolehlivě funguje, žádné strippování stylů.

## Viz také

- [[projects/lcenglish-10x-english-sales-page]]
