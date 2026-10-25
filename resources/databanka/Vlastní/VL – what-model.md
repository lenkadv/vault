---
databanka: true
zdroj: Vlastní
typ: nainstalovaný skill
rok: 2026
pro:
  - vlastní
tema:
  - výzkum
pouzij_kdyz: "nevíš, jestli na úkol stačí Haiku, Sonnet, nebo je potřeba Opus"
stav: neprozkoumáno
nainstalovano: ano
verdikt: "skrýt"
spousteni: "/what-model"
soubor: "~/.claude/skills/what-model/SKILL.md"
---

# what-model

**Použij, až:** nevíš, jestli na úkol stačí Haiku, Sonnet, nebo je potřeba Opus

**Spuštění:** /what-model

**Popis od autora:** (chybí — SKILL.md nemá frontmatter s popisem, proto se skill nikdy nespustí sám, jen lomítkem)

[Otevřít SKILL.md](<file:///C:/Users/Lenka/.claude/skills/what-model/SKILL.md>)

Poznámky z použití:

<!-- zneni-skillu:start (generuje gen_zneni_skillu.py, needitovat) -->

> [!quote]- Znění skillu (aktualizováno 261025)
> # /what-model
>
> Determine the optimal Claude model tier for your current task.
>
> ## When to use
>
> - **Uncertain about tier** - You're not sure if Haiku, Sonnet, or Opus is right
> - **Cost optimization** - You want the cheapest model that won't compromise quality
> - **Mid-session pivots** - Task type changed and you want to verify you're on the right tier
>
> ## How it works
>
> If the conversation has context, /what-model analyzes it and recommends the most cost-effective tier:
>
> - **Haiku** - Lookups, yes/no questions, simple edits, classification, bulk grunt work. Speed matters, "almost right" is fine.
> - **Sonnet** - Most coding, drafts, debugging, architecture, normal build sessions, design reviews.
> - **Opus** - Sales copy, VSL writing, voice-heavy work, complex multi-file reasoning, design work, anything where wrong output is expensive to fix.
>
> If the chat is empty, it asks what you need, then recommends.
>
> ## Example usage
>
> ```
> /what-model
> → "Analyzing conversation... You're doing a code review with architecture discussion. Recommend: Sonnet. Switch with `/model sonnet`?"
> ```
>
> ```
> /what-model
> → "No context. What are you working on?"
> [you describe task]
> → "That's a lookup task. Recommend: Haiku. Switch with `/model haiku`?"
> ```

<!-- zneni-skillu:end -->
