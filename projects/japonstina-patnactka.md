# Japonština — denní patnáctka

Denní rutina 15 minut bez Anki: jeden nový gramatický bod z Genki II (pravidlo → vysvětlit nahlas → 3 věty o sobě), vybavení starších bodů (dny +1, +3, +7) a krátký úsek Shuna (poslech, čtení kanji, 3–5 slov). Cíl: aby na hodině s lektorkou nebylo pořád „nepamatuju“. Oblast [[japanese]].

## Stav

- Artefakt „Japonská patnáctka“: https://claude.ai/artifact/JqowfSeKgte5k1t4zqTjse (Den 0 = mapa 59 bodů Genki II L13–23, hodnocení Umím / Matně / Neumím; data v artefaktu `state/ratings`, Claude je čte přes ArtifactData).
- Verze 3 (261007): test je „české věta → řekni japonsky“ (struktura se neprozradí dopředu) a každý bod má 2–5 otázek na podbody (1. a 3. osoba, zápor, typ slovesa), celkem 151 otázek; hodnocení po otázkách v `state/ratings2` (klíče `l14-1.a`, `.b`…; starší klíče bez písmene se berou jako `.a`). Pravidlo: tvoření a poznání struktury se testuje, ne vybavení hotového tvaru.
- Verze 4 (261007): 13 dnů po ~15 min. Den = jedna lekce Genki II (L13 a L22 rozdělené na dvě části): 1) test gramatiky (asi 8 min), 2) úsek epizody Shun 276 s časy z titulků + slova dne + „všimni si“ (asi 4 min; text je v Google Docu 276, v artefaktu jen odkazy a časy), 3) otázka dne s textovým polem (asi 3 min; odpovědi se ukládají do `state/ratings2` v poli `answers`, lektorka je opraví → základ banky odpovědí). Po 13 dnech: Přehled slabých míst → z něj fronta pravidelné patnáctky. Dostupné epizody Shuna: jen 275 a 276 zpracované (275 zatím nepoužita).
- Verze 5 (261007): oprava ukládání (zatržítko Shun a odpověď dne se ztrácely, protože starší snapshot z databáze přepsal lokální stav; teď rozhoduje `updatedAt`), nový blok 4 „Moje slova ze Shuna“ (cvičení čtení ze slov, která Lenka označí v Docu žlutě; jednoduchý interval 1/3/7/14/30 dní). Zvýraznění čtu z HTML exportu Docu → [[reference-gdoc-highlight-extraction]]; slova zapisuji do `state/words`. Lenka musí po každé epizodě říct „vytáhni slova“ (zatím ručně). Zatím 2 slova (誰も, 成長).
- Anki se nepoužívá, dokud Lenka nepocítí potřebu se vrátit (261007). Důvod: přetížení Anki ze školy a metoda ji neláká. Dluh v Anki (asi 5 300 japonských karet po termínu) se neřeší.
- Rozhodnutí 261007: pravidlo nejdřív (teorie „když chci říct X, použiju tvar Y“) + nahlas aplikace; lektorka odpovědi z banky na hodině zkontroluje a ráda.

## Plán

1. Den 0: Lenka ohodnotí mapu (asi 15 min) → Claude sestaví frontu (chronologicky od prvního matného bodu; co zapíše z hodin, předbíhá).
2. Od dne 1: denní stránka v artefaktu (4 nové body týdně + den opakování). Úsek Shuna z lekce, která se právě učí.
3. První týden ručně, pak zvážit automatické obnovování.
4. Později (volitelně): banka odpovědí na otázky z hodin, kanji čtení přes úseky Shuna, vrácení Anki.

## Úkoly

- [ ] Otevřít artefakt „Japonská patnáctka“, ověřit opravu ukládání (zatrhnout „Shun hotovo“, napsat odpověď dne, stránku znovu načíst) a napsat Claude výsledek; pak pokračovat dalším dnem (den = ~15 min) #next-action #online
- [ ] Po 13. dni napsat Claude „hotovo“ → z Přehledu postavit pravidelnou frontu opakování (po 13 dnech)
- [ ] Po každé epizodě Shuna říct Claude „vytáhni slova“ (zvýrazněná slova z Docu → cvičení čtení)
