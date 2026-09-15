# Memory

> This is the short list of durable facts about working with this business — the
> things you would otherwise forget between sessions. Both Claude and Codex read
> this file at the start of every session, right after the charter, so the work
> picks up where it left off. Keep it short; it is loaded every time.

## The brain, at a glance (the index)

The top-level pages and the folder indexes — never every filed item. A hundred
files in `samples/` belong in [[samples/index]], not here; this file is loaded
every session and must stay small. When a NEW top-level page is created, add
its line here; that is the only time this list changes.

- [[business]] — facts, the offer ladder, what is verified
- [[audience]] — who it is for, objections, routing
- [[voice]] — how they sound, house-style overrides
- [[brand]] — how they look
- [[plan]] — the one-page marketing plan
- [[decisions]] — the owner's call log
- [[competitors]] — who else is in the room
- [[methodology]] — how they actually do the work
- [[ideas]] — the idea bank
- [[compliance]] — what may and may not be said
- [[assets/index]] — every file in `assets/`, described
- [[samples/index]] — the business's own published writing, listed
- [[research/index]] — dated findings, listed
- The foldered kinds file their items inside themselves: `proof/`, `stories/`,
  `lessons/`, `inbox/` — browse the folder, they are small on purpose.

## What lives here

Durable, useful-next-time notes that no other brain file already owns:

- How the owner likes to work day to day (their rhythm, their pet peeves, the way
  they like things handed over).
- Standing reminders that keep coming up ("double-check the offer price before an
  ad", "they post on Tuesdays").
- Pointers to where deeper knowledge lives, so you do not have to re-hunt for it.

Keep each note to a line or two. When a note grows into a whole topic, give it its
own file in this folder (for example `memory/tools.md`) and leave a one-line
pointer to it here — so this file stays short and quick to load.

## What does NOT live here (it has a better home)

- A voice or taste correction — a word they always cut, a tone they always soften —
  goes in `brain/lessons/`, not here. That is where the system learns their taste.
- A business call and the reason behind it — an offer dropped, a channel chosen —
  goes in `brain/decisions.md`, not here.
- A hard fact, offer, or price goes in `brain/business.md`.
- A secret — a key, password, or token — goes in the business's private `.env`
  file and nowhere else. Never write a secret here.

## How to keep it clean

- One home per fact. Before you add something, check it is not already covered by
  another brain file or a note below, and update it in place instead of repeating it.
- Newest notes on top of the list.
- Plain words. No secrets, ever.

---

## Notes

- **"Todoist kalendář" = Google Calendar s názvem "Todoist"** (id:
  `d0cf3065decc1cb2fe038fcefe927aa76e4896534f469afa6667eadbfb891110@group.calendar.google.com`),
  ne samostatný Todoist konektor. Google Calendar MCP je připojený v GrowOS
  sessions — použít `list_calendars`/`create_event` na tenhle konkrétní
  kalendář, když CLAUDE.md řekne "aktualizovat Todoist kalendář".
- **LCEnglish 2.0 reset (2026-09-14):** při chybějící informaci se nejdřív
  ptát Lenky přímo, ne hledat po starých research/legacy souborech —
  do starých souborů nahlížet až POTÉ, co Lenka dá čerstvou odpověď (na
  ověření/kontext, ne jako první zdroj). Staré `legacy-0.1/`, `decisions.md`
  před 2026-09-14, `research/` soubory z 0.1 éry se necitují jako zdroj v
  nových brain souborech ani v plánu — jsou to nánosy, které se v tomhle
  resetu vědomě nepřenášejí. Jediná výjimka: `brain/samples/` (skutečně
  odeslané newslettery) je platná reálná historie.

- Migrace z GrowOS 0.1 proběhla 2026-09-06. Kompletní 0.1 archiv je v `lcenglish/legacy-0.1/2026-09-06/original/`. Detailní produkční postupy (checklist tvorby epizody, týdenní checklist, howto) jsou v `library/process/`.
- Hlavní běžící formát je **Art for English** — týdenní newsletter přes Drip podle `research/art-bites-curriculum-2026.md`. Postup tvorby dílu je v [[methodology]]. Epizody 1–20 odeslané, #21 naplánovaná v Dripu.
- Thumbnail k epizodě dělá Lenka sama v Canvě — Claude připraví jen text pro Canvu (anglicky).
- Carousely a Remotion render pipeline jsou **opuštěné** (viz [[decisions]]). Nepředpokládat je v žádném postupu.
- HELE funnel / webinář / mini-VSL: materiály jsou v `library/funnel/` a `research/`, ale **launch neběží živě**. Nezakládat na tom aktivní práci bez pokynu Lenky.
- Přivlastňovací tvar: **Lenčino** (ne Lenkino). Pomlčka ve větě `-`, nikdy `—`.
- Oslovení čtenáře: plurál bez rodových koncovek („zkusili jste"), plus Liquid codes v Dripu.
