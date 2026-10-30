# Kolo digistart-pilot-winningads-1 (WinningAds, 30. 10. 2026)

Zdroj: brief `work/strategy/digistart-pilot-kampan.md`, řádek 4 (statické varianty z WinningAds). Lenka dala pokyn na mapě 30. 10. 20:31.

## Jak vzniklo
- WinningAds (app.winningads.com), nový projekt **DigiStart**, jazyk čeština. Nastavení jen z brainu: popis byznysu z `business.md`, publikum a problémy z `audience.md` (generátor přidal „učitelky“ a vymyšlené problémy, opraveno), pravidla Lenky vložená jako Training Data i jako Instructions (vkládají se do každého promptu).
- Nedalo se upravit: automaticky vyplněné „Proof Assets“ (Case Studies, Testimonials, Statistics) a „Customer Desires“ v nastavení projektu. Instrukce je přebíjejí a u druhé dávky byly touhy vybrány ručně z brainu. ⚠️ Pro další generování je dobré hlídat, že AI nevymýšlí reference.
- Bez fotek lektorek (portréty se do cizí služby neposílaly). Lidé na obrázcích jsou vygenerovaní AI, nejsou to lektorky ani účastnice.
- Kredity: 14 (6 při založení projektu, 1:1; 8 v rozšířeném režimu, 4:5, styly How-To, Lifestyle, Comparative, Product Demo; vizuální styly Humorous, Minimalist, How-To, Multi-Panel, Comparison).
- Texty reklam z WinningAds se nepoužily: porušovaly pravidla (vymyšlená „jedna koučka“, „místa jsou omezená“, „většina žen“, „tři hodiny týdně, to je vše, co potřebujete“, překlep, mužský rod). Texty jsou napsané znovu podle brainu.
- Soubory z WinningAds jsou JPEG (s příponou .png); uloženo jako .jpg, bajty beze změny.

## Změna postupu (Lenka, 30. 10. 21:08)
„Ony ty texty vygenerované v obrázku rovnou stejně vypadají divně a nejsou v brandu.“ Z WinningAds se berou **jen obrázky bez textu** (nástroj Remove Text From Image, 3 kredity), text do obrázku se doladí a vysází v Canvě. Návrhy textu jsou v každé položce v oddílu „Text do obrázku“. Pečeť SHA-256 a kontrola obrázku až na hotové verzi z Canvy.
- Kredity celkem: 19 (14 reklam, 2 úpravy textu v obrázku, 3 odstranění textu).
- Pro příště: ve WinningAds generovat a hned odstranit text, nebo do Instructions dopsat „bez textu v obrázku“ (nezkoušeno).
