---
databanka: true
zdroj: Anthropic Academy
typ: tutoriál
rok: 2026
pro:
  - DigiStart
  - konzultace
  - vlastní
tema:
  - skilly
  - Claude Code
  - automatizace
pouzij_kdyz: "vysvětluješ někomu, co jsou skilly a jak si postavit vlastní, nebo ladíš vlastní skill"
stav: prohlédnuto
nainstalovano: ne
verdikt: ""
soubor: "Databanka AI/Anthropic Academy 260929/Introduction to Agent Skills"
---

# Introduction to Agent Skills

**Použij, až:** vysvětluješ někomu, co jsou skilly a jak si postavit vlastní (DigiStart, konzultace), nebo ladíš vlastní skill.

Oficiální kurz Anthropicu na Claude Academy, 6 textových lekcí s krátkými videi (u videí je i přepis), dohromady ~1 h 45 min: co skill je → první skill → konfigurace a více souborů → srovnání s CLAUDE.md, subagenty, hooky a MCP → sdílení → řešení problémů.

[Otevřít poznámky k lekcím](<file:///G:/Můj disk/Databanka AI/Anthropic Academy 260929/Introduction to Agent Skills>) · [Rejstřík](<file:///G:/Můj disk/Databanka AI/Anthropic Academy 260929/00 REJSTRIK – co je kde a k čemu.md>) · [Kurz online](https://academy.claude.com/courses/introduction-to-agent-skills)

## Jak to vysvětlit (DigiStart, konzultace)

Pět hlavních myšlenek, ke každé příklad z Lenčina vlastního systému:

1. **Skill = návod napsaný jednou, který se použije pokaždé.** Když AI stále dokola vysvětluješ totéž, patří to do skillu.
   *U mě:* `/shun-podcast`. Zpracování epizody do Google Docu má několik kroků (paralelní text, přepis, furigana, odkaz). Nemusím je pokaždé vysvětlovat, stačí napsat „nová epizoda Shun“.
2. **O spuštění rozhoduje popis.** AI dopředu vidí jen jméno a popis a podle významu pozná, kdy skill použít. Dobrý popis říká *co* skill dělá a *kdy* ho použít, včetně frází, jakými o úloze člověk opravdu mluví.
   *U mě:* popis `shun-podcast` obsahuje doslova „Spouští se pokynem ‚/shun-podcast‘, ‚nová epizoda Shun‘, ‚zpracuj Shuna‘“.
3. **Stálá pravidla vs. postup k jedné úloze.** Co platí vždycky, patří do `CLAUDE.md`. Co je potřeba jen občas, patří do skillu, aby to nezahlcovalo každou konverzaci.
   *U mě:* `CLAUDE.md` obsahuje jen tabulku „Pracuji na… → Přečtu `resources/postupy/…`“. Podrobné postupy (zettelkasten, GrowOS, knihovna) se načtou, až když na tom tématu pracuju. Je to stejný princip jako progressive disclosure ve skillech.
4. **Každý nástroj má svou roli.** Skill = znalost. Hook = automatická reakce na událost. Subagent = oddělený pomocník. MCP = napojení na vnější služby.
   *U mě:* hook vkládá do každé zprávy aktuální datum a čas. `/deep-research` běží jako izolovaný agent, aby mezikroky nezaplnily hlavní konverzaci. Napojení na Notion, Gmail a Kalendář je přes MCP.
5. **Když skill nefunguje, je to skoro vždy popis.** Doplň slova, jakými to reálně říkáš. Jinak zkontroluj, že `SKILL.md` je ve vlastní složce a má přesně tenhle název.

**Nápad na cvičení pro DigiStart:** účastníci si sepíšou jednu věc, kterou AI vysvětlují pořád dokola, a přímo na místě z ní napíšou popis skillu (co + kdy + 3 spouštěcí fráze).

Poznámky z použití:
