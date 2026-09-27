# Drip série: Onboarding campaign Gonna Wanna

Surový export z Dripu (API, 260927). Stav: active, založeno 2018-06-23, 1 e-mailů. Zpoždění = dny od předchozího e-mailu.

---

## 1. {% if subscriber.osloveni == nil %}Už jste to vyzkoušeli?{% elsif subscriber.tags contains "F" %}Už jste to vyzkoušela, {{ subscriber.osloveni }}?{% else %}Už jste to vyzkoušel, {{ subscriber.osloveni }}?{% endif %}

- Zpoždění: 0 dní

Dobrý den, {{ subscriber.osloveni | default: " " }}{% if subscriber.osloveni != nil %}, {% endif %}

{% if subscriber.tags contains "M" %}už jste si prošel nejčastěji zkracované výrazy?

Zajímalo by mě, jestli jste už nějaký zaslechl a rozpoznal nebo dokonce sám nějaký použil. {% elsif subscriber.tags contains "F" %}už jste si prošla nejčastěji zkracované výrazy?

Zajímalo by mě, jestli jste už nějaký zaslechla a rozpoznala nebo dokonce sama nějaký použila. {% else %}

už jste si prošli nejčastěji zkracované výrazy?

Zajímalo by mě, jestli jste už nějaký zaslechli a rozpoznali, nebo dokonce sami nějaký použili.{% endif %} Zajímalo by mě toho vlastně ještě mnohem víc, ale než se začnu vyptávat, měla bych se představit.

Jsem Lenka. Celým jménem Lenka Dvořáková, ale nejlíp slyším právě na tu Lenku.

Kdysi na gymnáziu jsem přišla na to, že mě baví jazyky. Bylo to docela překvapivé, protože to gymnázium bylo matematické. Dělala jsem pak různé věci, stihla jsem studovat v USA a pracovala jsem v diplomacii a na vysoké škole. Cizí řeči jsem si nechávala jako koníček a posbírala jsme jich zatím pět, kterými se domluvím.

Po těch letech, kdy jsem získávala zkušenosti z různých oborů, jsem se před pár lety obloukem vrátila k jazykům. Od té doby pomáhám lidem najít řeč - ať už potřebují komunikovat česky nebo anglicky.

Předpokládám, že mezi takové lidi patříte i vy, a budu ráda, když vám budu moci být prospěšná. Mám za ta léta studia jazyků a mluvení na veřejnosti v zásobě pěkných pár triků, tipů a postupů, o které se s vámi ráda podělím.

Než se do toho pustím, chci se ujistit, že vás správně oslovuji.

{% if subscriber.osloveni == nil %}Jak vám můžu říkat? Moc vás prosím, napište mi tu správnou variantu, ať pro mě nejste anonymní.

{% else %}Můžu Vám říkat {{ subscriber.osloveni }}? Pokud to mám špatně, moc vás prosím, napište mi tu správnou variantu, ať to můžu opravit.{% endif %}

Můžete mi toho ale napsat i víc :-) Kromě toho, {% if subscriber.tags contains "M" %}jestli jste se už potkal se zkrácenými hovorovými výrazy, {% elsif subscriber.tags contains "F" %}jestli jste se už potkala se zkrácenými hovorovými výrazy, {% else %}jestli jste se už potkali se zkrácenými hovorovými výrazy, {% endif %}taky třeba to, s čím nejvíc bojujete, když máte mluvit anglicky. Anebo prostě cokoliv, s čím bych vám mohla pomoci.

Zdraví L.

Lenka Dvořáková

lektorka

Lights Camera English! ( https://lights-camera-english.com )
