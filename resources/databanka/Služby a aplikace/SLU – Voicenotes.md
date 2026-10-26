---
databanka: true
zdroj: napojená služba (konektor)
typ: konektor
rok: 2026
pro:
  - vlastní
  - DigiStart
tema:
  - napojení
  - přepisy
pouzij_kdyz: "stáhnout přepis nahrávky z voicenotes.com (Lenčiny nahrávky a přepisy videí)"
stav: použito
nainstalovano: ne
verdikt: ""
spousteni: "stačí říct „stáhni z Voicenotes přepis …“"
soubor: ""
---

# Voicenotes

**Použij, až:** potřebuješ přepis nahrávky z [voicenotes.com](https://voicenotes.com/app) (Lenčiny poznámky, přepisy videí z kurzů) a nechceš ho kopírovat ručně.

**Spuštění:** stačí říct „stáhni z Voicenotes přepis …“ (název nebo datum nahrávky).

**Popis:** Voicenotes nahrává a přepisuje audio, dělá shrnutí. Oficiální MCP konektor `https://api.voicenotes.com/mcp` (přihlášení OAuth v prohlížeči, žádný klíč) má čtyři nástroje: hledat poznámky, vypsat je podle data nebo štítku, stáhnout celý přepis, založit novou textovou poznámku. Mazat ani upravovat existující poznámky neumí. Návod: [help.voicenotes.com – Voicenotes MCP](https://help.voicenotes.com/en/articles/14336494-voicenotes-mcp). Postup pro vault: [[resources/postupy/voicenotes]].

Poznámky z použití:
- 261026: konektor zatím nezapnutý (zapíná Lenka, úkol v [[digistart]]). Přepis úvodního videa Dannyho Inyho jsem přečetl přes Claude in Chrome ve vlastní kartě (karta Transcript u nahrávky, `get_page_text`), funguje, když je Lenka v Chromu přihlášená.
