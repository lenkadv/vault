# Methodology

## Our way of doing it, in steps
Jak vzniká jeden díl Art for English (dnešní podoba — bez Remotion, bez carouselu):

1. **Rekapitulace a odsouhlasení PŘED jakoukoli prací.** Když Lenka řekne „Art for English #NN": otevřít `brain/research/art-bites-curriculum-2026.md`, zrekapitulovat jí datum odeslání, gramatický/slovní bod, plánované dílo a umělce, poznámku z curricula. Explicitně se zeptat, jestli to sedí — hlavně jestli dílo funguje jako obrázek do newsletteru (ne moc široké/úzké, dobře ořezatelné, dohledatelná public-domain reprodukce) a jestli gramatika k dílu sedí, nebo se natahuje. Nezačínat research ani psaní, dokud Lenka neodsouhlasí.
2. **Založit složku epizody** `work/email/NN-umelec/` a `_brief.md`: číslo, kód (AB + číslo), obraz, umělec, rok, instituce, gramatický cíl, 3 kanonické věty (i placeholder), sekce Media s cestami.
3. **Připravit obsah:** ověřená fakta o díle/umělci (s odkazy na zdroje, nikdy nevymýšlet), 3 kanonické anglické věty s gramatickým cílem + zvýrazněnou částí + český překlad, gramatický vzorec + jednořádková poznámka, real-life hook z Lenčina života (pokud chybí, nevymýšlet — nechat otevřený bod). Finální věty zapsat do `_brief.md` jako zdroj pravdy.
4. **Stáhnout obraz** z Wikimedia Commons / Rijksmuseum / National Gallery / Met — vždy public domain, vysoké rozlišení. Uložit jako `jmeno-umelce-nazev-rok.jpg` (malá písmena, pomlčky, bez diakritiky). Zapsat cestu, zdroj a licenci do `_brief.md`.
5. **Napsat newsletter** (`newsletter.md`, jde do Dripu) a doprovodné soubory jen pokud reálně vznikají (`social-posts.md`, `video-reel.md`, `video-10sentences.md`). Carousel se nepíše automaticky — jen na výslovné vyžádání.
6. **Finalizovat:** zkontrolovat kanonické věty a cesty v `_brief.md`, finální text newsletteru, zaznamenat epizodu do curricula (✅ hotovo), aktualizovat projekt (next-action advancement + Aktuální stav).
7. **Do hlasového korpusu** (`brain/samples/`) kopírovat finální text **až po potvrzeném naplánování/odeslání v Dripu** — ne dřív. Rozhodnuto 2026-09-14: zabraňuje to zanesení nedokončených verzí do korpusu, ze kterého se čerpá hlas.

**Vědomá výjimka (rozhodnuto 2026-09-14):** Art for English zůstává u lehčí struktury `library/episodes/NN-umelec/` (ne formální `work/email/` work item s review-frontovými statusy draft→review→changes→approved→published) — Lenka epizody neschvaluje přes GrowOS frontu, ale přímou úpravou v konverzaci a finalizací v Dripu. `newsletter.md` má vlastní jednoduché pole `status: draft/final`, které stačí k porovnání draftu a finální verze a k odvození lekcí (viz krok 8). Pokud se v budoucnu rozjede víc kanálů, které frontu skutečně využívají, přehodnotit.
8. **Po zaznamenání finální verze** porovnat můj draft s Lenčinými úpravami a odvodit generalizovatelné lekce (ne jednorázové tvůrčí volby) do `brain/lessons/0.1-lessons.md`, sekce Email/Newsletter — stejný princip jako u work-item review diffů, jen bez formální fronty.

Thumbnail dělá Lenka sama v Canvě — Claude připraví jen text pro Canvu (vždy anglicky). Hotový `nl-thumb.png` Lenka ukládá do složky epizody (`library/episodes/NN-umelec/nl-thumb.png`) — stejné jméno u každé epizody, protože identitu nese cesta. (Konvence od 260914; dřív u #1–2 šel do sdíleného `brain/assets/paintings/`, u #3–21 se neukládal vůbec.)
```
FULL ARTIST NAME IN CAPS: TITLE OF WORK IN CAPS
year, Gallery Name, City, Country
```
plus řádek `Pill (gramatický cíl): gramatika`.

Detailní checklisty (tvorba epizody, týdenní checklist) jsou v `library/process/`.

## What we call things
- **Art for English – Umění mluvit** — série: 1 obraz · 5 minut · pár frází + 1 gramatický bod + mluvní úkol (60 s). Úroveň A2–B1.
- **grammar-first** — přístup série: nejdřív jazykový cíl týdne, pak se k němu vybere dílo. Zaručuje variabilitu a progresi.
- **kanonické věty** — 3 anglické věty s gramatickým cílem, které jsou zdrojem pravdy pro celou epizodu (v `_brief.md`).
- **anglické jednohubky** — interní název emailového newsletteru LCEnglish.
- **shadowing** — metoda 10x ENGLISH: poslech a souběžné opakování dialogu, plná rychlost i 80 % tempo, integrace se Shadowloop appem.
- **HELE** — interní název vlajkového kurzu „Angličtina s příběhem".

## What we believe that others do not
- Gramatická tabulka se zapomene přes noc; příběh z obrazu (a jazyk v něm) zůstane. Vizuální a příběhový kontext > izolované cvičení.
- Streak není pokrok. Dva roky denně na aplikaci ≠ umět si objednat kafe.
- Pokrok v jazyce je často neviditelný — každé malé vítězství se má oslavit, jinak to člověk vzdá.
- Věk není překážka. Rozhoduje sebedůvěra a aktivita, ne „talent na jazyky" ani „mozek po padesátce".
- Mluvení je statisticky nejslabší dovednost Čechů v angličtině — obsah to má adresovat přímo (speaking task u každého Art Bitu), ne okrajově.

## The mistakes we see over and over
- Biflování slovíček a gramatiky mimo kontext — naučí se na test, v řeči nepoužije.
- Sledování seriálů s českými titulky jako „učení" — pohodlné, bez pokroku.
- Čekání, až „to bude umět líp", než si dovolí promluvit.
- Měření snahy streakem místo schopnosti se domluvit.

## Proof this works
- Viz `brain/samples/` — 21 odeslaných newsletterů Art for English v Lenčině hlase.
- Studentské výsledky: [PLACEHOLDER: přesunout doslovné citáty do brain/proof/ a odkázat odsud].
