---
databanka: true
zdroj: Vlastní
typ: nainstalovaný skill
rok: 2026
pro:
  - vlastní
tema:
  - výzkum
pouzij_kdyz: "Důkladný průzkum tématu na webu — spustí se jako izolovaný agent, výsledky neovlivní kontext hlavní konverzace."
stav: neprozkoumáno
nainstalovano: ano
verdikt: ""
spousteni: "/deep-research"
soubor: "~/.claude/skills/deep-research/SKILL.md"
---

# deep-research

**Použij, až:** Důkladný průzkum tématu na webu — spustí se jako izolovaný agent, výsledky neovlivní kontext hlavní konverzace.

**Spuštění:** /deep-research

**Popis od autora:** Důkladný průzkum tématu na webu — spustí se jako izolovaný agent, výsledky neovlivní kontext hlavní konverzace. Použij, když potřebuješ hluboký research k článku, epizodě, studiu nebo projektu, aniž by mezikroky zabíraly místo v konverzaci.

[Otevřít SKILL.md](<file:///C:/Users/Lenka/.claude/skills/deep-research/SKILL.md>)

Poznámky z použití:

<!-- zneni-skillu:start (generuje gen_zneni_skillu.py, needitovat) -->

> [!quote]- Znění skillu (aktualizováno 261025)
> ```yaml
> name: deep-research
> description: Důkladný průzkum tématu na webu — spustí se jako izolovaný agent, výsledky neovlivní kontext hlavní konverzace. Použij, když potřebuješ hluboký research k článku, epizodě, studiu nebo projektu, aniž by mezikroky zabíraly místo v konverzaci.
> context: fork
> agent: Explore
> ```
>
> Proveď důkladný průzkum následujícího tématu: $ARGUMENTS
>
> ## Postup
>
> 1. Vyhledej relevantní informace pomocí WebSearch (2–4 různé dotazy, různé úhly pohledu)
> 2. Přečti nejrelevantnější stránky pomocí WebFetch
> 3. Hledej konkrétní fakta, data, citace, kontext — ne jen obecné shrnutí
> 4. Pokud téma zahrnuje umění nebo historii, zaměř se na: vznik díla, historický kontext, symbolika, recepce
> 5. Pokud téma zahrnuje obsah pro lcenglish, hledej také: zajímavý příběh k vyprávění, gramatický jev přirozeně přítomný v kontextu díla
>
> ## Výstup
>
> Vrať strukturovaný souhrn v češtině:
> - **Klíčová fakta** — přesná, ověřitelná
> - **Zajímavý kontext nebo příběh** — co není na první pohled vidět
> - **Přímé citace** (s odkazem na zdroj)
> - **Použité zdroje** — seznam URL
> - **Možné další směry** — co by stálo za hlubší prozkoumání
>
> Buď konkrétní. Vyhni se obecným popisům. Piš tak, aby výstup byl přímo použitelný pro psaní článku nebo skriptu.

<!-- zneni-skillu:end -->
