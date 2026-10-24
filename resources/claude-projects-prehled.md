# Claude Projects — co umí a k čemu by se nám hodily

> Přehled 261024 (úkol z tabule, Lenka spustila „Pusť se do toho“). Fakta z nápovědy Anthropicu, staženo 24. 10. 2026: [Co jsou projekty](https://support.claude.com/en/articles/9517075-what-are-projects) · [Zakládání a správa](https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects) · [RAG pro projekty](https://support.claude.com/en/articles/11473015-retrieval-augmented-generation-rag-for-projects) · [Sdílení](https://support.claude.com/en/articles/9519189-project-visibility-and-sharing). Návrhy použití jsou moje, ne z nápovědy.

## Co projekt je

- **Samostatný pracovní prostor v claude.ai** (web, desktop, telefon) s vlastní historií chatů a vlastní „knihovnou“ podkladů.
- **Instrukce projektu**: text, který Claude čte před každým chatem v projektu (tón, role, pravidla). Název a popis projektu Claude nevidí.
- **Znalosti projektu**: nahrané dokumenty, texty, kód. Claude je má k dispozici ve všech chatech projektu. Co se řekne v jednom chatu, ostatní chaty nevidí, dokud se to nenahraje do znalostí.
- **Velké podklady**: na placených plánech (Pro a výš) se při velkém objemu automaticky zapne vyhledávání v podkladech (RAG), kapacita až zhruba 10×. Nic se nenastavuje.
- **Paměť**: každý projekt má vlastní paměť. V projektu Claude používá paměť projektu a obecnou paměť účtu, ne paměť jiných projektů; obecnou jde pro projekt vypnout. Na Pro je zapnutá standardně.
- **Sdílení** projektu s dalšími lidmi jde jen na plánech Team a Enterprise. Na Pro (tvůj plán) je projekt jen tvůj.
- Nápověda neříká nic o konektorech a skillech v projektech; nevím, ověřila bych prakticky.
- **Nová verze v betě** (zatím pro vybrané uživatele Claude Code na Pro a Max): projekt jako jedna konverzace s paralelními vlákny v cloudu. Týká se nás později; podrobnosti https://code.claude.com/docs/en/claude-projects (nečetla jsem).

## Rozdíl oproti tomu, jak pracujeme teď

Tady v Claude Code mám celý vault, postupy a paměť; to je silnější než projekt. **Projekt se hodí tam, kde vault není: v telefonu a na webu**, a pro věci, které chceš mít „po ruce“ s pevnými instrukcemi. Jeden už máš: **Zápisník** ([[zapisnik-instrukce]]).

## Návrhy, co by ti usnadnily (vyber, co chceš zkusit)

1. **Psaní za mě v telefonu (lcenglish / tadylenka)**: projekt s instrukcemi podle hlasového profilu (`GrowOS/lcenglish/brain/voice.md`) a jako znalosti seznam vydaných dílů A4E. Když tě napadne hook nebo odpověď čtenářce mimo počítač, napíšeš ji tam rovnou tvým hlasem.
2. **Studium na cestě (Přehledovka, Metodologie 2)**: projekt se zápisky z přednášek a okruhy zkoušky jako znalostmi; v tramvaji se tě může ptát nebo vysvětlit dílo. Doplněk k Anki, ne náhrada.
3. **DigiStart pro účastnice**: projekt je přesně ta „obálka“, kterou může účastnice s Claude Pro dostat jako návod: instrukce + podklady kurzu. Souvisí s otevřenou otázkou v [[digistart]] („jak se projekt nebo plugin předá účastnicím“). Pozor: sdílet hotový projekt jde jen na Team, na Pro si ho účastnice musí založit sama podle návodu.
4. **Firemní školení (Evident)**: projekt s osnovou a podklady, ze kterého si v telefonu před školením projdeš body nebo připravíš cvičení.

Nejmenší krok: vyber jeden z návrhů, napíšu instrukce a seznam souborů k nahrání; založíš ho v claude.ai (zabere asi 5 minut).

## Studium na cestě — jak by to vypadalo (261024, Lenka si to rozmýšlí)

- **Projekt „Studium na cestě (KTF)“**, instrukce: zkoušející pro Přehledovku (formát zkoušky dr. Pecha: uzavřené otázky 3 b., písemná 7 b.) a Metodologii 2 (tři kroky, výklad doc. Kubíka, hodnotit podle smyslu, doplňující otázka); ptát se jen z podkladů, chybějící označit „K ověření“.
- **Podklady:** Pech: hlavní studijní dokument ke zkoušce (261016, podklady od spolužáků), zápisky z přednášek, minulé zkoušky. Metodologie 2: mapa ke zkoušce, ověřené zápisky (zatím 3 přednášky), banka otázek. Po každé přednášce jeden nový soubor.
- **Použití jednou větou:** „Zkoušej mě z Pecha, 5 minut“ (3 uzavřené otázky), „Metodologie, krok 2“ (otázka + hodnocení + doplňující otázka), „Vysvětli mi …“ (dílo nebo pojem ze zápisků); hlasový režim v aplikaci cestou.
- **Paměť projektu** si drží, co nešlo, a vrací se k tomu.
- **Nenahradí** Anki a poznávačku obrazů.
- **Překryv:** u Metodologie už je zkoušecí Notebook (NotebookLM) a skill v Gemini; projekt přidává oba předměty na jednom místě, paměť slabých míst a hlasový režim. Návrh: týden zkusit vedle Notebooku.
- **Neověřeno:** jestli se Google Docs v projektu aktualizují samy, nebo se nahrávají znovu.
