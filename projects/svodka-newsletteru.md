# Svodka z newsletterů

**Oblast:** [[areas/ai-nastroje]]
**Založeno:** 260926
**Stav:** aktivní — zkušební číslo 1 hotové, čeká na Lenčinu zpětnou vazbu

## Co to je

Lenka nestíhá číst newslettery (Gmail záložky **Promo akce** a **Aktualizace**, ~150 vláken za 2 týdny) a hromadně je maže. Claude z nich dělá **svodku** jako na ministerstvu: souvislý text po tématech, ne seznam shrnutí — aby se nemusela vracet do zdrojů.

- Primární inbox má 1 vlákno — cíl ≤ 20–30 splněn, nic se v Gmailu nepřesouvá ani neštítkuje.
- Formát č. 1: Vyžaduje pozornost (maily, které nejsou newslettery) → Hlavní body → AI → Umění a dějiny → Marketing a psaní → Česko a svět → Pro tvou práci → Kandidáti na odhlášení → 4 otázky.
- Publikováno jako soukromá stránka (stejná adresa pro další čísla): https://claude.ai/artifact/7SYdebdeLaDZdvG9DV4QQ8 — zdrojový HTML je jen dočasně ve scratchpadu; pro další číslo republikovat přes `url`.
- **Zájem neodvozovat z přečteno/nepřečteno** (memory `feedback_newsletter_read_signal`) — jen profil zájmů + Lenčiny reakce.
- Profil zájmů (návrh): nejvíc AI nástroje pro práci, dějiny umění (baroko, ženy v umění, středoevropské umění, výstavy), psaní a Substack; středně marketing malého vzdělávacího byznysu, výuka jazyků, vzdělávání; okrajově politika a svět; přeskočit slevy, e-shopy, notifikace.

## Postup

- [ ] Lenka přečte svodku č. 1 a odpoví na 4 otázky na konci (délka, sekce, AI zprávy vs. tipy, zakládat náměty?) #next-action #online
- [ ] Podle odpovědí zapsat profil zájmů (soubor) a ustálit formát
- [ ] Rozhodnout rytmus (návrh: týdně čt/pá před weekly review) a zda z toho udělat skill / naplánovanou úlohu (upravený `reading-digest` čte záložky místo štítku)

## Související

- [[katalog-moznosti]] sekce 6 (reading-digest), [[hlasove-profily]]
