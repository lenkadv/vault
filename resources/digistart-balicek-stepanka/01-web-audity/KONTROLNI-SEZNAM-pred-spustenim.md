# Kontrolní seznam před ostrým spuštěním webu

Projděte si spolu u stolu. Stav textů: koncept C z 2. 10. 2026. Zatím chybí zpětná vazba Štěpánky, takže body 1 až 8 se řeší společně.

## A) Obsah: co rozhodnout a doplnit

| # | Co | Kde v souboru `index.html` | Rozhodnutí |
|---|---|---|---|
| 1 | **Reference**: které organizace smíme uvést (název, typ spolupráce, rok, případně citace; vždy se souhlasem). Dnes jsou jen typy organizací bez jmen. | sekce `#reference`, žlutý odstavec `.ph` | |
| 2 | **Tým**: zařadit sekci s lidmi, nebo ne? Dnes je jen žlutý placeholder (firma mluví, audit nestojí na jedné osobě). | `.teamph` | |
| 3 | **Cena**: uvádět cenu na webu? Je úvodní hovor nezávazný, nebo zdarma? (V textu byla věta o ceně, vypuštěna.) | sekce `#kontakt` | |
| 4 | **Tón**: nechat lehké situace („A co když Jana zítra skončí?“, „Co když bude Martin na dovolené…“), nebo zjemnit? | hero + „Poznáváte se?“ | |
| 5 | **Kontakt**: sedí e-mail `ulicna@gnostika.cz` a telefon +420 775 137 779? Je Štěpánka správná kontaktní osoba? | hero + `#kontakt` | |
| 6 | **Logo**: dnes vektor vytažený z PDF nabídky (jen pro koncept). Máte originál (SVG/PNG ve vysokém rozlišení)? | `<svg class="logo">` v záhlaví | |
| 7 | **Důvěrnost** (mlčenlivost, anonymizace, GDPR): vrátit v nějaké podobě? Sekce byla vyřazena. | – | |
| 8 | **Odkaz na gnostika.cz** v patičce a údaje o firmě (IČ 24821039, sídlo Jiráskova 135, 506 01 Jičín): sedí? | `<footer>` | |

## B) Technika: úpravy v souboru

- [ ] Smazat žlutý pruh nahoře (celý `<div class="review">…</div>`), nebo v CSS odkomentovat pravidlo `.review{display:none}`
- [ ] Odstranit všechna žlutá místa `.ph` (nahradit textem, nebo smazat celý odstavec)
- [ ] Odstranit `<meta name="robots" content="noindex">`, až chcete, aby stránku našel Google (do té doby ji nechte)
- [ ] Doplnit meta popis a náhled pro sdílení (Open Graph: titulek, popis, obrázek 1200×630 px)
- [ ] Zkontrolovat `mailto:` a `tel:` odkazy (kliknout z mobilu)
- [ ] Ověřit na mobilu i na počítači (včetně úzkého okna); všechny odkazy a tlačítka
- [ ] Zkontrolovat pravopis a texty proti PDF nabídce („Nabídka audit FEKT VUT GNOSTIKA“, 26. 7. 2026)
- [ ] Zálohovat hotovou verzi (složka `audity` k sobě na disk)

## C) Nasazení

- [ ] Zvolit adresu (`/audity`, subdoména, vlastní doména)
- [ ] Nasadit cestou A nebo B z `NAVOD-nasazeni-na-wordpress.md`
- [ ] Vyprázdnit cache, otevřít z jiného zařízení
- [ ] Doplnit odkaz do menu / na stránku, odkud se na audity přijde
- [ ] Rozhodnout o měření návštěvnosti (bez měření není potřeba cookie lišta)
