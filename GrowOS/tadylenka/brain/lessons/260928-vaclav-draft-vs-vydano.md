---
project: tadylenka
type: lessons
datum: "260928"
---

# Václav: první použitelný AI draft dlouhého textu

**Kontext:** Díl „Svatí mezi námi: Václav“ (rubrika Všichni svatí) vyšel 28. 9. 2026
(vzorek `brain/samples/2026-09-28-substack-svati-mezi-nami-vaclav.md`). Na Lenčino
výslovné přání jsem napsal celý draft (work item `work/articles/vaclav-vsichni-svati.md`,
~970 slov). Lenka: „napsala jsi to fakt dobře… v podstatě je to nahozená celá struktura
a já ji budu jenom ladit.“ Upravila v Substacku za jeden večer, vyšlo 857 slov.

**Proč to fungovalo, na rozdíl od Evy (260910):**
1. **Šablona z vlastního vydaného textu** (sv. Josef): úvod → Kdo to byl (odrážky) →
   Jak ho poznáte → Sochy → Obrazy – jak šel čas → „Kolem a kolem“ očíslovaně. Žádná
   komprese akademického textu, ale výplň osvědčeného rámce.
2. **Podklady = fakta, ne próza:** Lenčiny zápisky z přednášek (NotebookLM „České
   církevní dějiny“, přes `source fulltext`) + ověření na webu. Nebylo co „zjednodušovat“.
3. **Popisky obrázků jako druhý kanál humoru** (lekce z Evy) — většina mých popisků
   přežila skoro beze změny (Emma u nohou, „kdo přijde pozdě s anděly“).
4. **⚠️ značky přímo v textu** — Lenka viděla, co ověřit, a ověřila (votivní deska).

## Co Lenka změnila (vzorce pro příště)

- **Úvod kratší a s pointou:** místo mého dlouhého souvětí (pivní etikety, státní
  svátek) tři krátké věty a „A dějiny procházejí kolem něj. Doslova.“ Krátká věta na
  zlomu je její nástroj (viz Eva).
- **Pointa má dopadnout na čtenáře dnes:** „zdvořile zasvětil saskému Vítovi“ →
  „a my proto máme naši hlavní katedrálu zasvěcenou saskému svatému Vítovi“.
- **Suchý dovětek jako samostatná věta:** „Kdy stíhal vládnout, není zřejmé.“ /
  „V té době zřejmě obvyklý způsob…“ / „My srandu.“ Jmenná věta bez slovesa je u ní
  OK, když nese pointu — pravidlo „žádné fragmenty“ platí pro mě, ne absolutně pro ni.
- **Atributy zúžila na tři hlavní** (zbroj + čapka/koruna, kopí s praporcem, štít
  s orlicí); hrozny přesunula do samostatného odstavce s vlastním výkladem (Kristovo
  a jeho mučednické utrpení, ne jen mešní víno) a s obrazem (Brokoff, vinař).
  Vyhodila dva anděly, koně a „černou/plamennou“ orlici ze seznamu.
- **Místní příklady:** Broumov, sv. Salvátor, Hradčany, Konvikt,
  kostelík na Proseku — konkrétní česká místa místo obecných.
- **Vyhodila:** nápis PAX, Parléřovu lebku jako model tváře, bosého Václava, Podivena
  a bod o Lucerně ze závěrečného seznamu (Černý zůstal v textu).
- **Závěrečný seznam:** 5 → 4 body, body 2 a 3 spojené trojtečkou do jedné myšlenky
  (koruna → koleda). Konec bez mé výzvy „zkuste ho poznat i bez koně“.
- **Popisky:** když je info o obrázku přímo v textu vedle něj, popisek nepíše.
- **CTA:** „Díky, že čtete Dějiny umění: V nejlepších letech! Když budete tenhle
  příspěvek sdílet…“ (Substack tlačítko Share) místo mé odběrové věty; Subscribe
  tlačítko hned pod úvodním obrázkem.
- **Křížový odkaz na Art for English** doplnila po vydání (na moje doporučení) jako
  vedlejší větu s hádankou, ne jako reklamu na angličtinu.

## Pravidlo

Rubrika Všichni svatí má ověřenou šablonu a AI draft v ní je **použitelný základ**,
ne jen hrubá hlína. Postup: podklady z NotebookLM/ověřené fakty → draft do šablony
Josefa s popisky a ⚠️ → Claude draft rovnou založí na Substacku (Chrome, postup
v lcenglish `0.1-lessons.md`) → Lenka ladí v Substacku a vydává.
Lekce `260910-longform-drafting-not-viable-yet.md` platí dál pro eseje bez šablony
(Ženy v obraze z vlastní seminárky) — tam roli AI zatím nerozšiřovat bez ověření.
