# Postup: Přehledné dějiny umění 19. a 20. století (dr. Pech) — zápočet a zkouška

Vznikl 261006. Claude čte tento soubor, když Lenka řeší Přehledovky, Anki balíčky z prezentací, chronologii nebo web pro spolužáky. Podmínky a termíny viz [[areas/studies]]. Podrobná technika a cesty: memory `project_pech_prehledovky_anki`.

**Studium není GTD** — žádné tasky do `next-actions`, příprava běží jako **bloky v kalendáři** (Todoist kalendář, čas vždy předem potvrdit s Lenkou) a termíny v [[areas/studies]].

## Dashboard (centrální místo)
Artefakt **Přehledovky 19.–20. století**, připnutý v levém menu claude.ai: https://claude.ai/artifact/7m4M1HxEFW3wGHLkWPGwAa (soukromý, jen Lenka). Záložky: Přehled („Co teď“, pokrytí zkoušky), Přednášky (4 kroky: nahrávka · teorie · v Anki · zkontrolováno), Balíčky karet, Trénink (písemná otázka 7 b. opravená Claudem, uzavřené otázky 5 × 3 b., ruční zápis výsledků, trend), Opravy, Pro dr. Pecha.
**Data žijí v uložené paměti artefaktu** (kolekce `lectures`, `decks`, `fixes`, `tests`, `pech`, `teorie`, dokument `meta/main` s termíny a odkazem na web). Claude je čte a mění nástrojem `ArtifactData` (URL výše) — ne přepublikováním stránky. Lenka klikání zapisuje sama.
**Při práci na Přehledovkách Claude průběžně aktualizuje dashboard:** po „zpracuj přednášku“ nastavit `theory:true` u přednášky a doplnit `topic`, přidat nové otázky do `teorie` (doc `t-<směr>-char` / `-dila`, pole `style`, `q`, `a`), po novém balíčku upravit `decks` (počty karet, `imported:false`), po opravě karty změnit stav v `fixes`, po nasazení webu zapsat do `note`. Při „zavírám“ nebo na začátku seance zkontrolovat, jestli dashboard odpovídá realitě. Kód stránky se mění jen na změnu vzhledu/funkcí (publikace stejné cesty).

## Co se zkouší (a čím je to pokryté)

| Část zkoušky | Body | Pokrytí | Stav 261006 |
|---|---|---|---|
| Poznávačka: 10 obrázků × (autor, název, datace, styl), ~50 % ze sbírek NG | 50 | Anki balíčky 01–17, FF-A/B/C; chronologie; návštěvy NG | ✅ hotovo, Lenka má v Anki |
| Uzavřené otázky: data, pojmy, terminologie | 15 | Anki „00 Teorie“, pojmové karty z Artlistu/Tate | 🟡 rozjeto (pilot), doplňovat po každé přednášce |
| 5 písemných otázek po 7 b.: jmenovat zástupce, popsat vývoj v odstavci, charakterizovat směr, nákres kompozice kanonického díla | 35 | Teorie karty (charakteristika, zástupci), týdenní trénink psaní, kreslení kompozic | 🟡 jen směry z přednášky 2. 10. (fauvismus, Brücke, Blaue Reiter) + automatické „zástupci“ |
| Zápočet (Přehledovka 1): poznávačka celého 19. století, konec ZS | — | balíčky 01–12 + FF-A (architektura) | ✅ obrazy; architektura 19. st. jen z FF PDF |
| Mezitest | — | Pech zvažoval „třeba každý měsíc“, zatím neoznámeno | sledovat |

## Plánování bloků (rozhodnuto 261006)
Studijní bloky **nezakládat předem do kalendáře**. Plánují se při **weekly review** (krok „priorities“ a „kalendář příštího týdne“ v `CLAUDE.md`): Claude navrhne bloky na příští týden podle skutečných přednášek a kolizí (např. út 13. 10. koliduje TANDEM od 10:30), Lenka časy potvrdí, pak se založí v Todoist kalendáři. Studium zůstává mimo GTD `next-actions`.

## Týdenní rytmus
- **Denně:** Anki (ranní rituál, bez bloku).
- **Út po přednášce a pá po přednášce (cca 30 min, blok v kalendáři po potvrzení):** Lenka nahraje nahrávku do Gemini Notebooku („Přehledovka 19. století“ / „20. století“), řekne „zpracuj přednášku“.
- **Jednou týdně trénink zkoušky (cca 45 min, blok po potvrzení):** Claude připraví z týdne 5 otázek ve formátu zkoušky (zástupci, vývoj v odstavci, charakteristika směru, nákres kompozice), Lenka odpoví písemně, Claude opraví podle přednášky.

## „Zpracuj přednášku“ — co dělá Claude
1. `notebooklm ask -n <notebook>` na nahrávku: pro každý probíraný směr rok a místo, členové, 4–6 rysů, témata a techniky, díla z přednášky, předchůdci, **a co Pech výslovně označil jako důležité pro zkoušku**. Pracovat jen s tím, co zaznělo; neověřené označit.
2. Z odpovědi vyrobit teorie karty do balíčku „00 Teorie – styly“ (`scripts\theory.py`, seznam `HAND`): charakteristika, zástupci a díla, klíčová data. Přidat do `PECH-VSE.apkg` (`buildall.py`), Lenka naimportuje.
3. Zkontrolovat, jestli vyučující přidal/změnil prezentaci: Lenka stáhne PPTX do `Documents\pech-export`, Claude spustí řetěz skriptů (extract → build → fixes → anki) a nasadí web po pokynu „aktualizuj web“.
4. Zapsat do této tabulky, které směry jsou zpracované.

## Odtajňování karet (nepředbíhat dr. Pecha; od 261007)
Obrazové karty z prezentací, které se ještě neprobíraly, jsou v Anki **pozastavené** (suspend) a mají tag `cekame`. Odtajňuje je Claude až po „zpracuj přednášku“, podle toho, **které slajdy pan Pech skutečně probral** (z přepisu nahrávky: poslední zmíněné dílo). Stav je v `pech-work\released.json`: `{"01": 19, "13": 999}` = z balíčku 01 odtajněné slajdy 1–19, z 13 všechny (999); balíček, který v souboru není, je celý pozastavený (včetně doplňků FF-A/B/C). Teorie karty se nikdy nedrží. **Postup:** po zpracování přednášky upravit `released.json` a spustit `pech-work\hold\anki_hold.py` (zálohuje sbírku do `anki-backup`, pozastaví/odtajní, přidá/odebere tag `cekame`, karty s historií nechá být). **Anki musí být zavřené** (skript používá knihovnu `anki` 26.9.3 přímo na sbírce `%APPDATA%\Anki2\Lenka`); Lenka pak Anki otevře a synchronizuje (mobil). Zkouška na kopii: `--dry <cesta>` ukáže počty beze změny. Alternativa bez zavírání Anki: doplněk AnkiConnect (Lenka by ho nainstalovala).
Počáteční stav 261007: odtajněno 01 (slajdy 1–19; od Ingresa dál čeká na další úterní přednášku) a 13; vše ostatní drženo.

## Opravy
**Lenka opravuje nejraději přímo v Anki** (od 261007). Před jakýmkoli přegenerováním balíčků, chronologie nebo webu proto Claude **nejdřív spustí `anki_sync.py`** (ze složky `pech-work\scripts`): ten přečte kopii Lenčiny sbírky (`%APPDATA%\Anki2\Lenka`), porovná pole Autor/Název/Datace/Styl/Místo a smazané karty s daty a uloží rozdíly do `pech-work\anki_edits.json`, který `fixes.py` načítá (přepíše automatická data, takže se Lenčiny úpravy nikdy nepřepíšou). Pak `fixes.py` → balíčky → `overview.py` → `share.py` → `wrangler deploy`. Zatím se synchronizují jen Pech karty (ne FF a Teorie). Poučení: Anki ukládá text v NFC; data se normalizují stejně.
Druhá cesta: Lenka napíše „prezentace/slajd + co je špatně“ (údaj je na zadní straně karty i v chronologii). Claude opraví ve `fixes.py` (DELETE / SET / IMGPICK / IMGSLIDE), přegeneruje, Lenka naimportuje znovu (opakování v Anki se zachová, ověřeno). Smazané karty import neodstraní — Claude dá hledání pro Anki.

## Teorie karty — pravidlo (rozhodnuto s Lenkou 261007)
**Anki = krátké atomické karty** (jedna otázka, krátká odpověď; výčty nejvýše 3–7 jmen), **6–10 karet na směr**, vždy **až po přednášce** a jen z toho, co pan Pech opravdu probral (z přepisu nahrávky v Notebooku; nezazněly-li postavy, žádné karty). **Dlouhé odpovědi** (charakteristika směru, vývoj v odstavci) patří do **tréninku v dashboardu** (kolekce `teorie`, pole `q`/`a`). Karty jsou v `scripts\theory.py`, seznam `ATOM` (klíč, směr, otázka, odpověď, přednáška; GUID `t2-<klíč>`, tagy `teorie t2 pr_RRRRMMDD s_<směr>`). Přehled karet: `pech-work\teorie-karty-nahled.txt`. Staré dlouhé karty v Anki se mažou hledáním `tag:teorie -tag:t2`.
Zpracováno: 2. 10. (fauvismus, Brücke, Blaue Reiter, expresionismus v architektuře a filmu, návraty expresionismu, data) a 6. 10. (osvícenství, neoklasicismus, teoretici, Mengs, Vien, David) = 66 karet. Ingres, Gros, Flaxman, Canova, Thorvaldsen v přednášce 6. 10. nezazněli.

## Rozpracováno (261007)
- Lenka: naimportovat nový balíček Teorie (66 karet) a staré smazat (`tag:teorie -tag:t2`).
- Duplicity 14/13 a 15/9 má Lenka smazat v Anki; naimportovat Teorii; napsat dr. Pechovi; vyzkoušet Trénink v dashboardu.

## Web pro spolužáky
Chráněný sdíleným heslem, nasazuje Claude příkazem `wrangler deploy` ze složky `pech-work\ktf-studium` na pokyn „aktualizuj web“ (adresa a heslo: nikam nepsat sem, adresa v memory, heslo nastavuje Lenka v Cloudflare). Před zveřejněním nových materiálů připomenout autorská práva (obrázky z Pechových prezentací) — Lenka to řeší s dr. Pechem.

## Zpracované směry (teorie)
| Směr | Z přednášky | Stav |
|---|---|---|
| Fauvismus, Die Brücke, Der Blaue Reiter | 2. 10. 2026 (20. st.) | ✅ karty v „00 Teorie“ |
| Ostatní směry | čekají na přednášky | automatická karta „zástupci“ z dat prezentací |

## Čekáme, až oznámí dr. Pech (neuhánět, řekne sám; rozhodnuto s Lenkou 261007)
- Architektura 19. století: přijde prezentace? (zápočet ji zahrnuje, v prezentacích chybí)
- Další prezentace 20. století (chybí č. 16, česká moderna po 1900).
- Mezitest: ano/ne, kdy.
- Termíny zkoušky, předtermín v lednu.
