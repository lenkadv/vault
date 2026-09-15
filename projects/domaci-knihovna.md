# Domácí knihovna — katalogizace

**Oblast:** [[areas/domacnost]]
**Stav:** aktivní
**Propojení:** [📚 Knihovna (Notion)](https://app.notion.com/p/1b8aeae60bc68070ba54f3c5af9910dc) — trvalý katalog; [[zettelkasten/literature/]] — plný obsah elektronických/citovaných zdrojů

## Cíl

Zalogovat všechny fyzické knihy z domácí police — hlavně starší beletrii bez čárových kódů, která zatím chybí. Pravidelný slot v týdnu.

## Architektura (260810)

- **Handy Library** = jednorázový sběrný nástroj na telefonu (skenování kódů + ruční zadání u starších knih). Není to trvalé úložiště.
- **Notion „📚 Knihovna"** = trvalý, appce-nezávislý katalog nad fyzickými i elektronickými zdroji. Sem směřuje výsledek sběru.
- Postup: nasbírat v Handy Library → periodicky exportovat CSV → naimportovat do Notionu (ručně, přes nativní CSV import, ne přes API).

## Tasky

- [x] Dokončit ~430 vyfocených obálek v Notion katalogu (upload + vložení do těla stránky) — postup viz [[HANDOFF – domácí knihovna obálky]]
- [x] V Notion UI přepnout Gallery view "Cover" zdroj z property na "Page content" ✅ 2026-09-10
- [ ] Pokračovat v katalogizaci — hlavně starší beletrie bez čárových kódů, ruční zadání do Handy Library #next-action #doma

## Průběh

<!-- zapisovat po každém sezení — kolik knih přidáno, co zajímavého -->

**260810:** Založen sjednocený katalog v Notion „📚 Knihovna" — 740 fyzických knih (dnešní export z Handy Library) + 252 elektronických zdrojů ze zettelkastenu, s odkazy zpět na LN zápisy tam, kde existují. [[ctenarsky-denik]] zrušen jako samostatný projekt (přesunut do archive/) — čtenářský deník teď žije přímo v Notionu. Schéma vyladěno (Typ, Source, Kde najít, Cover). Klikací odkaz do Obsidianu se ukázal jako neproveditelný (Notion nepodporuje navigaci na custom URI schémata) — Obsidian Note zůstává jen ke kopírování. 308/308 online obálek vloženo do těla stránek. Handoff pro dokončení ~430 vyfocených obálek v novém vlákně: [[HANDOFF – domácí knihovna obálky]].

**260815 (weekly review) — kontrola přírůstků:** Žádné nové LN soubory od 10. 8. (4 upravené soubory, všechny už v baseline). Novější Handy Library auto-backup existuje (14. 8.), ale má identickou velikost bajtů jako baseline z 10. 8. — bez plného stažení/diffu nejde ověřit na 100 %, ale silně to ukazuje na 0 nových fyzických knih. Lenka souhlasí se závěrem "pravděpodobně nic nového", bez hlubší kontroly.

**260823 (weekly review) — kontrola přírůstků:** Žádné nové/upravené LN soubory od 15. 8. Handy Library: nový auto-backup z 21. 8. (`handy_library_auto_backup_20260821_2146_v2.zip`, 107 802 731 B) — liší se od zálohy z 14. 8. (107 618 134 B) o ~180 KB, signalizuje přírůstek. Lenka potvrdila, že přidala jednu knihu po 21. 8. (tj. ještě není v této záloze). Diff odložen na příště. Zálohy jsou v `G:\Můj disk\HandyLibrary\` (ne nutné prohledávat celý Disk). Matchování běží podle Handy Library `_id`, takže Lenčiny ruční opravy překlepů v Notionu po importu diff nijak neovlivní.

**260819/20 (noční sezení) — obálky vyfocených knih:** 105/430 vyfocených obálek doplněno do Notionu (4 dávky, `_id` 3–274). Cestou objevena a opravená chyba: první 2 dávky (45 stránek) měly obrázkový tag omylem HTML-escapovaný, takže se na stránce zobrazoval doslovný text místo obrázku — Lenka si všimla, opraveno přes `replace_content`, ověřeno funkční. Postup a nové gotchas (escapování, diakritika v zipu, cesty s diakritikou v Bash) zapsané do [[HANDOFF – domácí knihovna obálky]].

**260820/21 (pokračování) — obálky vyfocených knih:** +210 obálek (dávka 5: `_id` 275–332; dávka 6: `_id` 333–392; dávka 7: `_id` 393–425; dávka 8: `_id` 426–455; dávka 9: `_id` 456–501; dávka 10: `_id` 502–536; dávka 11: `_id` 537–575) — **315/430 hotovo**, zbývá ~115. Použita stejná Handy Library záloha jako 260819. Zrychlení postupu: přímý `notion-search` podle názvu+autora trefil správnou stránku téměř vždy napoprvé; u 4 knih se shodným titulem (edice "Dějiny českého výtvarného umění") rozlišeno přes `Volume` property; v dávce 10 nový case — duplicitní ISBN uvnitř dávky (dvě různé knihy i dvě fyzické kopie téže knihy), ošetřeno v extrakčním skriptu. Next action: pokračovat od `_id` 576+.

**260910:** Gallery view v Notionu přepnut na "Page content" — celý katalog má teď obálky ve zobrazení. Poslední krok architektury hotový. Další: pokračovat ve fyzickém sběru starší beletrie.

**260821 — obálky vyfocených knih DOKONČENY:** +115 obálek (dávka 12: `_id` 576–609; dávka 13: `_id` 610–646; dávka 14: `_id` 647–686; dávka 15: `_id` 687–740) — **430/430 hotovo, celý katalog má teď obrázky u všech položek.** V dávce 12 se objevila a byla opravena vážná chyba: upload-pořadí a page-pořadí se rozjely (řazeno jinak), takže všech 29 stránek dostalo dočasně špatnou obálku — opraveno přes `replace_content` po zpětné kontrole, ověřeno `notion-fetch`. Od dávky 13 dál se používá zpevněný postup (dva JSON soubory keyed by `dedup_key`, programové spojení, cross-validace množin klíčů před zápisem) — dávky 13–15 proběhly bez jediné chyby v párování. Zbývá jen ruční krok v Notion UI: přepnout Gallery view na "Page content" (safe teď, když všechny stránky mají obrázek).
