# Hlídané údaje LCEnglish

Oblast [[lcenglish]] · založeno 261026 (Lenka: „to udržování aktuálních informací je obecně problém“) · systémy [[lcenglish-ekosystem]] · web [[mapa-webu-skutecna]]

Údaje, které se můžou změnit a jsou napsané na stálých místech (web, prodejní stránky, automatické maily v Dripu). Skript `resources/web-lcenglish/mapa_webu.py` při každém běhu najde na webu a v aktivních mailech Dripu všechna místa, kde se údaj vyskytuje, a vypíše je v [[mapa-webu-skutecna#Hlídané údaje]] (nová a zmizelá místa i v rozdílu proti minulé mapě).

**Jak se používá**
- **Změní se údaj** (např. Art for English vyjde jindy než v úterý, zdraží se kurz): přepsat sloupec „Platí“, spustit skript a opravit všechna vypsaná místa. Hook při „zavírám“ tenhle soubor hlídá spolu s ostatními soubory o LCEnglish.
- **Weekly review:** Claude Lence přečte sloupec „Platí“ jednou otázkou („Platí pořád…?“). Lenka potvrdí, nebo opraví. Pak Claude porovná hodnotu s místy z mapy a vypíše jen ta, kde text nesedí.
- **Pravidlo pro psaní (Lenka 261026):** na stálá místa nepsat den vydání, přesné počty ani data, pokud to jde bez nich („každý týden“, „přes 25 dílů“). Když údaj napsat musíme, přidat ho sem.
- Skript čte text stránek včetně prodejních stránek z Leadpages; co je jen v obrázku, nenajde.

## Seznam

| Údaj | Platí | Hledat (regulární výraz) | Poznámka |
|---|---|---|---|
| Den vydání Art for English | úterý (Drip 8:01, Substack zrcadlo) | `každé úterý\|v úterý\|do úterý\|úterní` | od 260414; „ÚKOLY NA ÚTERÝ“ v kurzu HELE je rozvrh kurzu, ne tohle |
| Jak často vychází Art for English | 1 díl týdně | `každý týden (jedno\|kousek)\|každé úterý vám\|jednou týdně vám` | jen věty o newsletteru, ne obecné „jednou týdně“ v článcích |
| Počet dílů Art for English | #28 vyšel 27. 10. 2026; na webu „přes 25 dílů“ | `\d+\s*díl` | |
| Počet studentů | 1 200+ online (bio na kurzy.lcenglish.cz, ověřeno 14. 9. 2026; na hlavní stránce od 261026) | `\d[\d\s]*\+?\s*student` | dřív 762 (asi z kurzové platformy, neznámo kdy) |
| Počet online kurzů | 3 v prodeji: HELE, 10x ENGLISH, Nepravidelná slovesa (Lenka 261026: uvádět skutečný počet a při změně opravit) | `\d+\s*(online\s*)?kurz` | dřív 5 |
| Vlastní aplikace | 1 (Shadowloop; na hlavní stránce od 261026) | `\d+\s*vlastní aplikac` | |
| Počet článků na blogu | 100+ (112 zveřejněných k 26. 10. 2026; na hlavní stránce od 261026) | `\d+\+?\s*článk` | nové články Lenka teď nepíše |
| Cena Nepravidelná slovesa za 14 dní | 790 Kč | `790` | [[lcenglish-irregular-sales-page]] |
| Cena 10x ENGLISH | 1 270 Kč | `1[\s.]?270` | [[lcenglish-10x-english-sales-page]] |
| Cena Angličtina s příběhem (HELE) | 5 970 Kč | `5[\s.]?970` | [[hele-funnel]] |
