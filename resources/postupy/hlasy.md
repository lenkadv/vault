# Postup: Psaní textů za Lenku (hlasové profily a smyčka „přepis → poučení“)

Zavedeno 261004 (weekly review, projekt [[hlasove-profily]]). Claude čte tenhle soubor vždy, když píše nebo upravuje text, který půjde pod Lenčiným jménem (e-mail, zpráva, článek, seminárka, newsletter, prodejní text).

## 1. Před psaním přečíst profil

| Text | Profil |
|---|---|
| Osobní a „občanské“ maily (úřady, rodina, spolužáci, vyučující, Štěpánka Uličná jako blízká) | `resources/hlas/osobni/profil-osobni.md` |
| Klienti, NG, VOX, KTF, PENTA, EVIDENT | `resources/hlas/profesni/profil-profesni.md` |
| Seminárka, akademický text | `resources/hlas/akademicky/profil-akademicky.md` (+ [[reference_academic_voice_profile]]) |
| lcenglish (e-maily, výukové texty, videoskripty) | `GrowOS/lcenglish/brain/voice.md` |
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
