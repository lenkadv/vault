# Postup: Psaní textů za Lenku (hlasové profily a smyčka „přepis → poučení“)

Zavedeno 261004 (weekly review, projekt [[hlasove-profily]]). Claude čte tenhle soubor vždy, když píše nebo upravuje text, který půjde pod Lenčiným jménem (e-mail, zpráva, článek, seminárka, newsletter, prodejní text).

## 1. Před psaním přečíst profil

| Text | Profil |
|---|---|
| Osobní a „občanské“ maily (úřady, rodina, spolužáci, vyučující, Štěpánka Uličná jako blízká) | `resources/hlas/osobni/profil-osobni.md` |
| Klienti, NG, VOX, KTF, PENTA, EVIDENT | `resources/hlas/profesni/profil-profesni.md` |
| Seminárka, akademický text | `resources/hlas/akademicky/profil-akademicky.md` (+ [[reference_academic_voice_profile]]) |
| lcenglish (e-maily, výukové texty, videoskripty, **odpovědi účastníkům a zákazníkům** — certifikáty, platby, termíny) | `GrowOS/lcenglish/brain/voice.md` |
| tadylenka | `GrowOS/tadylenka/brain/voice.md` |

Psát rovnou tímto hlasem, ne neutrálně s tím, že se to pak přepíše.

## 2. Smyčka: Claude navrhne → Lenka přepíše → rozdíl se uloží jako poučení

Kdykoli Lenka můj text **přepíše** (upraví přímo v souboru, vloží svou verzi, nebo řekne „takhle ne, spíš takhle“):

1. **Porovnat** moji verzi s její a pojmenovat rozdíl: co jsem napsal → co změnila → **pravidlo** (proč).
2. **Zapsat okamžitě, v téže odpovědi**, bez ptaní (jednou větou jí říct, kam to šlo):
   - osobní / profesní / akademický hlas → sekce **„Poučení z přepisů“** na konci příslušného profilu v `resources/hlas/…`
   - lcenglish / tadylenka → nový soubor `GrowOS/<byznys>/brain/lessons/YYMMDD-téma.md` (formát jako [[README]] a stávající poučení v té složce; `brain/lessons/` smí Claude zapisovat)
3. Poučení, které se **opakuje** (podruhé a víckrát), povýšit: pravidlo doplnit nahoru do těla profilu / `voice.md`.
4. **Nezapisovat** drobnosti: oprava překlepu, faktu nebo jména není poučení o hlase. Zapsat jen to, co říká něco o stylu (slovo, které vždy škrtá, tón, který zjemňuje, délka, otvírák, scéna místo obecné věty).

Platí pro všechny hlasy a všechny kanály, i mimo seanci, která psaní začala.

## 3. Z jaké adresy odeslat — u pracovních mailů hlídat vždy a důrazně (Lenka 261011)

Koncepty z Gmail konektoru vznikají v účtu `lnk.dvorakova@gmail.com` a Claude **nemůže změnit odesílatele**. Lenka u klientských a pracovních mailů musí před odesláním přepnout „Od“ na pracovní adresu; odeslání ze soukromého Gmailu nedělá dobrý dojem (261011: odpověď Veronice Voříškové z PENTY odešla nejdřív z Gmailu a Lenka ji přeposlala z pracovní adresy).

**Pravidlo:** kdykoli připravím koncept nebo návrh pracovního mailu, napíšu **hned na první řádek odpovědi (před text konceptu)** výstrahu, např. „⚠️ Odeslat z `lenka@publicspeaking.cz`, ne z Gmailu“. Jednou větou, výrazně, u každého pracovního konceptu znovu. Když je koncept odpověď ve vlákně, které přišlo na Gmail, upozornit zvlášť, že se „Od“ musí přepnout ručně. Když si adresou nejsem jistá, zeptat se, nehádat.

| Komu / o čem | Odeslat z |
|---|---|
| PENTA (Popadič, Blažek, Matha, Veronika Voříšková a další), NG Praha, VOX kurzy, Galleko, další klienti a kulturní instituce | `lenka@publicspeaking.cz` |
| EVIDENT a firemní školení (HR, víc lidí v kopii) | `info@lenkadvorakova.cz` |
| lcenglish: odběratelé, studenti, Tandem, zákaznická podpora kurzů | `lenka@lcenglish.cz` |
| KTF (vyučující, komise, knihovna, Ekonomická komise) | **školní adresa** (`dvoralen@ktf.cuni.cz`; zdroj: mail přeposlaný na Gmail 11. 10., ověřit u Lenky, kdyby použila jinou). Mail z KTF jí chodí přeposlaný ze školního účtu na Gmail a odpovídá ze školního účtu. |
| Osobní maily (rodina, spolužáci, Štěpánka Uličná jako kamarádka, úřady) | `lnk.dvorakova@gmail.com` |

Zdroj tabulky: [[banka-profesni]] a [[hlasove-profily]] (adresy z korespondence). U nové skupiny adresátů zjistit z poslaných mailů a tabulku doplnit. Pokud Lenka tabulku opraví, přepsat tady.

**Pozor u KTF (Lenka 261011):** konverzace z KTF se odpovídá ze školního účtu, takže se vlákno otevírá v jiném účtu a **v Gmailu `lnk.dvorakova@gmail.com` nemusí být vidět celá konverzace** (jen přeposlané zprávy, ne její odpovědi). Před konceptem odpovědi na KTF mail proto nespoléhat na to, že jsem v Gmailu přečetla celé vlákno: zmínit, že historie může být neúplná, a když je kontext důležitý (termíny, co už bylo odpovězeno), požádat Lenku o doplnění. Koncept z Gmailu je k odeslání z jiného účtu: napsat text, který Lenka zkopíruje do školní pošty.
