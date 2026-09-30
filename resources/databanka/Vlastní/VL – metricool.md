---
databanka: true
zdroj: Vlastní (uloženo v GrowOS)
typ: nainstalovaný skill
rok: 2026
pro:
  - lcenglish
  - tadylenka
tema:
  - marketing
pouzij_kdyz: "Draft social media posts in your brand voice, then open Metricool's scheduler in your browser so you can review and publish — no API required."
stav: použito
nainstalovano: ano
verdikt: ""
spousteni: "/metricool (automaticky v sezení otevřeném v GrowOS; z vaultu až po otevření souboru v GrowOS)"
soubor: "vault/GrowOS/.claude/skills/metricool/SKILL.md"
---

# metricool

**Použij, až:** Draft social media posts in your brand voice, then open Metricool's scheduler in your browser so you can review and publish — no API required.

**Spuštění:** /metricool (automaticky v sezení otevřeném v GrowOS; z vaultu až po otevření souboru v GrowOS)

**Popis od autora:** Draft social media posts in your brand voice, then open Metricool's scheduler in your browser so you can review and publish — no API required.

[Otevřít SKILL.md](<file:///G:/Můj disk/vault/GrowOS/.claude/skills/metricool/SKILL.md>)

Poznámky z použití:

- 260930 účet a novinky (prohlédnuto v Lenčině přihlášeném Chromu):
  - **Tarif:** PRO 5 značek, 120 EUR/rok (od 2022, dřív 72 EUR), 4 z 5 značek obsazené. Obnoví se 22. 11. 2026 → rozhodnutí ve [[waiting-for]] (připomínka 15. 11.).
  - **Oficiální MCP Metricool** (novinka): ověřený konektor pro Claude (v registru „Metricool Social Media Management“, https://ai.metricool.com/mcp, přihlášení přes OAuth). Funguje na **jakémkoli tarifu** (i zdarma). Umí: statistiky všech sítí, nejlepší čas na post, naplánovat / upravit / vypsat naplánované posty, posty a Reels s metrikami, konkurence, Meta/Google Ads. Popis: https://metricool.com/es/mcp-metricool-claude/
  - Klasické API (Zapier, Looker Studio) jen na tarifech Advanced/Custom, ale na práci s Claudem ho nepotřebujeme, stačí MCP.
  - Náš skill `/metricool` je starší cesta (Claude napíše text a otevře plánovač v prohlížeči, text se vkládá ručně). S MCP by Claude posty rovnou naplánoval a statistiky stáhl sám. Skill přepsat na MCP až při návratu k sítím.
  - Pro srovnání: Typefully (také konektor v registru) plánuje i na Substack (Notes?) — ověřit, až bude aktuální tadylenka Notes.
- 260930 **MCP propojeno** (konektor „Metricool Social Media Management“, Lenka povolila OAuth). Funguje: seznam značek, statistiky IG. První výtah za 1. 4.–30. 9. 2026:
  - **4 značky, nastavení je zmatené:** „Všichni svatí“ (IG tadylenka + FB stránka 101946029417291), „LCEnglish“ (web lcenglish.cz, FB 198814966970945, IG lights_camera_english, YT), „Lenka Dvořáková“ (FB 1156685167817243, IG tadylenka, YT UCZZhyu0…), „Tady Lenka“ (IG tadylenka, YT UCZZhyu0…, ale **FB stránka LCEnglish** 198814966970945). IG tadylenka je ve 3 značkách. Před návratem k sítím uklidit (1 značka = 1 byznys). → **Uklizeno 260930 (Lenka)**, stav: viz mapa účtů v memory `reference_social_accounts_map`.
  - **IG tadylenka:** 82 → 91 sledujících za půl roku, skoro bez aktivity (poslední příspěvek 14. 7.). Reels 136, 214, 31 a 133 zhlédnutí (víc než počet sledujících = dosah mimo ně); jediný carousel (Arnolfini, 9. 6.) dosah 43, 154 zobrazení, 11 lajků, 5 komentářů; Stories dosah ~15–25 na story.
  - **IG lights_camera_english:** 122 → 118, aktivita jen v dubnu (reel 29. 4.: 38 zhlédnutí), od května nic.
- 260930 po úklidu (ověřeno přes MCP): **LCEnglish** (id 2215183) = web lcenglish.cz, IG lights_camera_english, YT UCO77Nq3…; **Lenka Dvořáková** (2215216) = web lenkadvorakova.cz, FB 1156685167817243 (jen reklamní vstup, nepublikuje se); **Tady Lenka** (6083106) = FB 198814966970945 (sloučená stránka LCEnglish + umění), IG tadylenka, YT UCZZhyu0… (zatím nepoužívaný); **Všichni svatí** (1958578) = jen FB 101946029417291, časem zrušit nebo sloučit s Tady Lenka. Drobnost: MCP u značky Všichni svatí vrací interní pole title „LCEnglish“ a description „...aby vás angličtina bavila“ (pozůstatek z 2022); v aplikaci se ukazuje jen label „Všichni svatí“, takže to nic neovlivňuje.

