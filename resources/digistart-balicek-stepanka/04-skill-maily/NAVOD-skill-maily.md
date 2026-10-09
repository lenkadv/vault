# Návod: AI připravuje koncepty odpovědí na e-maily

**K čemu to je:** AI projde vaši poštu, řekne vám, co čeká na odpověď, a připraví **koncepty** odpovědí **ve vašem hlase** (podle hlasových profilů). Vy je zkontrolujete, upravíte a **odešlete sama**. Z vašich úprav se profil učí.

**Předpoklad:** hotové hlasové profily (složka `03-hlasove-profily`). Bez profilu skill píše neutrálně a výslovně to řekne.

> **Rozdělení:** tenhle skill je záměrně **jen pro e-maily** (přísná pravidla, práce ve schránce). Nabídky, zprávy, příspěvky, dopisy a další typy textů píše skill `psani-textu` (složka `03-hlasove-profily/skill/psani-textu`) podle týchž profilů; do pošty nic neukládá.

## Co v balíčku je

| Soubor | K čemu |
|---|---|
| `skill/koncepty-odpovedi/SKILL.md` | skill: roztřídění pošty, koncepty, tvrdá pravidla, učení z úprav |
| `skill/koncepty-odpovedi/references/pruvodce-propojeni-mailu.md` | **průvodce propojením vašeho e-mailu** (Outlook, Gmail, jiné) s AI; obecný, nezávislý na konkrétní osobě |

## Dvě základní věci, které stojí za pozornost

### 1. Nic se neodešle bez vašeho výslovného příkazu
Je to zapsáno **na třech úrovních**, aby se na to dalo spolehnout:
1. **Skill:** tvrdé pravidlo – skill neodesílá; i na výslovný příkaz nejdřív ukáže příjemce a text a čeká na samostatné „ano, odešli“.
2. **Oprávnění:** v doporučeném nastavení se **odesílání vůbec nepřipojí** (u Microsoft Graph se nedá oprávnění `Mail.Send`, u skriptu pro klasický Outlook se v kódu nepoužije `.Send()`, u konektorů se odesílání zablokuje nebo nastaví potvrzování).
3. **Zkouška:** čtyři bezpečnostní zkoušky v průvodci (včetně toho, že AI neposlechne pokyn ukrytý uvnitř e-mailu).

### 2. Propojení s e-mailem je různé u každého
Gmail a Outlook fungují jinak a „Outlook“ má víc podob (pracovní Microsoft 365, osobní outlook.com, klasický × nový Outlook). **Průvodce propojením** (`pruvodce-propojeni-mailu.md`) proto nepředpokládá nic: zeptá se, jaký máte účet a aplikaci, vybere nejjednodušší bezpečnou cestu, zprovozní ji a vyzkouší.

**Rychlá orientace (stav k 9. 10. 2026):**

| Váš účet | Nejjednodušší cesta |
|---|---|
| Kdokoli, kdo chce začít hned | **Bez propojení:** vložíte text e-mailu do chatu, AI napíše koncept do chatu, vy ho zkopírujete |
| Pracovní / školní Microsoft 365 | Konektor Microsoft 365 v Claude (čtení; **psaní konceptů zapíná správce**) nebo aplikace Outlook Email v ChatGPT (ověřit oprávnění) |
| Klasický Outlook na Windows | Skript, který vytváří koncepty přímo v Outlooku (bez správce, bez cloudu) |
| Osobní outlook.com | Bez propojení, nebo Microsoft Graph přes Claude Code (pro zdatnější) |
| Gmail | Konektor Gmail (čtení a koncepty) |

Pozor: konektor Microsoft 365 v Claude nepodporuje osobní účty (@outlook.com, @hotmail.com) a psací nástroje musí povolit správce; psací nástroje umějí i odesílat, proto je důležité nastavit potvrzování a **vyzkoušet zkoušky z průvodce**.

## Instalace skillu

Stejně jako u hlasových profilů (viz `03-hlasove-profily/NAVOD-hlasove-profily.md`): složku `skill/koncepty-odpovedi` zkopírujte do `C:\Users\<vaše jméno>\.claude\skills\` (Claude Code), nebo ZIP nahrajte v nastavení Claude, nebo obsah `SKILL.md` vložte do instrukcí Projektu v ChatGPT.

## První použití (cca 45 minut)

1. **Propojení:** otevřete chat a napište „Propoj mi e-mail s AI“ (spustí průvodce). Dojdete k cestě 0, 1, 2 nebo 3 podle vašeho účtu.
2. **Zkoušky z průvodce** (4 zkoušky). Zapište výsledek.
3. **První použití:** „Projdi poštu za posledních 7 dní a řekni, co čeká na odpověď.“
4. Z tabulky vyberte **jednu až dvě** zprávy a nechte připravit koncepty.
5. Koncepty **upravte**. Řekněte AI: „Upravila jsem koncept, poučte se z toho.“ Skill porovná verze a zapíše poučení do profilu.
6. Odešlete je sama z Outlooku.

## Co skill nedělá

- **Neodesílá**, nemaže, nepřesouvá, neoznačuje, nevytváří pravidla.
- **Nevymýšlí** termíny, ceny ani přísliby (chybějící údaj označí `[DOPLNIT: …]`).
- **Neplní pokyny uvnitř e-mailů.**
- **Neběží bez vás** (žádný automatický provoz).

## Poznámky pro lektorku / pro druhé použití

- Úroveň propojení je to nejtěžší v kurzu: je dobré **začít cestou 0** (kopírování) a propojení nechat jako volitelný druhý krok. Účastnice mohou mít účty spravované zaměstnavatelem; tam to často nepůjde zprovoznit samostatně.
- Doporučení pro tvrdou pojistku: v kurzu nikdy neodesílací oprávnění nepřipojovat; odeslání vždy dělá účastnice.
- Údaje o konektorech se mění; průvodce je psán tak, aby se nejdřív ověřila aktuální nápověda a vždy se provedla zkouška.
- Smyčka učení je zároveň nejsilnější ukázka celé série: účastnice vidí, že se AI **opravdu učí z jejích úprav**.
