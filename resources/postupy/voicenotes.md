# Postup: přepisy z Voicenotes (261026)

Lenka nahrává a přepisuje audio ve [Voicenotes](https://voicenotes.com/app) (voicenotes.com, přihlášená v Chromu). Přepisy si Claude stahuje sám, Lenka je nekopíruje.

## Cesty (ověřeno 261026)

| Cesta | Funguje? | Cena | Bezpečnost |
|---|---|---|---|
| **A. Oficiální konektor (MCP)** `https://api.voicenotes.com/mcp` | **Zapnutý a ověřený 261026 09:20** (Lenka zapnula; `list_notes` i `get_transcript` vrátily nahrávky a celý přepis). | Konektory jsou v placených plánech Claude (Lenka má), Voicenotes podle návodu chce jen „aktivní účet“. | OAuth v prohlížeči, žádný klíč. Jen čte, hledá a umí **založit** textovou poznámku. Mazat ani upravovat neumí. |
| **B. Veřejné API / export** | Veřejná dokumentace API není. | — | — |
| **C. Obsidian plugin „Voicenotes“** (oficiální) | Existuje: synchronizuje poznámky přímo do vaultu v intervalu. Že stahuje i **celý přepis**, návod výslovně neříká (píše o „obsahu poznámky“ a shrnutích); neověřeno. | Zdarma plugin, token z Voicenotes → Settings → Integrations & Automations → Obsidian. | Token leží v nastavení pluginu ve vaultu (`.obsidian/`, synchronizuje se přes Disk). Má příkaz „Delete Remote Voicenote“ s dvojím potvrzením, sync sám nemaže. Vytváří soubory pro všechny nahrávky = nepořádek ve vaultu. |
| **D. Claude in Chrome ve vlastní kartě** | **Funguje, vyzkoušeno 261026.** | Nic navíc. | Jen čtení stránky, nic se neodklikává kromě přepnutí na kartu Transcript. Potřebuje, aby byla Lenka v Chromu přihlášená. |

## Jak to dělat

1. **Výchozí: konektor** (nástroje `search_notes`, `list_notes`, `get_transcript`): najít nahrávku hledáním nebo podle data, stáhnout `get_transcript` (UUID = konec adresy `voicenotes.com/recording/<id>`). `list_notes` bez data vrací jen posledních 30 dní, u starších zadat `date_range`. Odstavce přepisu odděluje `<br/>`. `create_text_note` nepoužívat bez pokynu Lenky.
2. **Záloha, když konektor nejde: Chrome:** vlastní karta → `https://voicenotes.com/app` → kliknout na název nahrávky (adresa `voicenotes.com/recording/<id>`) → karta **Transcript** → `get_page_text`. (JavaScript výstup se ořezává po ~1000 znacích, `get_page_text` vrátí celý text.) Pod přepisem stránka vypisuje i „Related notes“ s celými přepisy, ty odříznout.
3. **Ukládání:** k projektu, kam patří (DigiStart → `GrowOS/digistart/library/`), s odkazem na nahrávku `voicenotes.com/recording/<id>` a na původní zdroj videa, pokud je známý. U přepisů placených kurzů platí pravidlo z [[resources/postupy/databanka]]: poznámky vlastními slovy a krátké citace, celý text zůstává ve Voicenotes (jde kdykoli znovu stáhnout).

Databanka: [[SLU – Voicenotes]].
