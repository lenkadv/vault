# LCEnglish – uvítací vlak v Dripu (vagóny A, B, C)

**Oblast:** [[areas/lcenglish]]
**Zahájeno:** 261024 (projekt založen 261029)
**Odkazy:** jak vlak funguje a ID v Dripu [[drip-lcenglish-uvitani]] · metoda [[resources/email-marketing-heroes]] (kampaň 008 The Overture) · položky fronty `GrowOS/lcenglish/work/email/drip-uvitani/`

## Aktuální stav

261029: Vagón C (10x ENGLISH) je postavený a zapnutý: série „008 Overture C“, Carriage C a napojení z Controller C. Testovací kontakt prošel až do série, maily mu chodí 30. 10. – 6. 11., vyhodnocení je ve [[waiting-for]] (6. 11.). 6. mail Overture B je publikovaný. Chybí vagón A (HELE): Controller A lidi přijme a hned je pustí ven. Další krok je vagón A (next action níže), Lenka na něj otevře samostatné vlákno, až bude chtít.

## Co to je

Každý nový odběratel projde uvítáním 000 GTKY. Podle pole `controller` (A = HELE, B = Nepravidelná slovesa, jinak C = 10x ENGLISH) ho Controller pošle do „vagónu“: Carriage workflow přihlásí sérii 6 mailů Overture (podle EMH 008), která představí jeden produkt. Kdo produkt koupí, z vagónu vypadne. Projekt končí, až budou všechny tři vagóny běžet a budou otestované.

## Next actions

- [ ] Postavit s Claudem v Dripu vagón A (HELE) po uvítání #next-action #online
    - Kontext: vlákno otevřít zprávou „Postav vagón A podle projektu lcenglish-drip-uvitaci-vlak“; zadání pro vlákno je hned pod tím. Prodejní stránka HELE běží z Leadpages na `lcenglish.cz/hele/`, objednávka `/hele-checkout/` (261025). Lenka 261024: stránka není vyladěná, ale cesta může běžet.
    - Zadání pro nové vlákno (z 261029, podle stavby vagónu C):
        1. **Texty.** Napsat 6 mailů „008 Overture A“ pro kurz Angličtina s příběhem (HELE) jako položku fronty GrowOS v `GrowOS/lcenglish/work/email/drip-uvitani/`, skillem `email-write` + `humanize`. Každý mail podle stavby příslušného mailu dossieru EMH 008 (shrnutí šesti úhlů a odkaz na kampaň jsou v `overture-c-10x-english-v2.md`). Fakta jen z prodejní stránky HELE a `GrowOS/lcenglish/brain/`. Předtím přečíst lekce `GrowOS/lcenglish/brain/lessons/261024-overture-podle-emh.md`: neopakovat motivy z jiných sérií, problém studenta popisovat tak, jak ho Lenka vidí v hodinách, výzva u odkazu nesmí slibovat přístup zdarma, rodové tvary vždy přes Liquid (`{% if subscriber.tags contains "M" %}…{% elsif subscriber.tags contains "F" %}…{% else %}…{% endif %}`). Pak `review` a čekat na schválení.
        2. **Stavba v Dripu** (Chrome přes rozšíření, účet 2094497), nic nezapínat bez Lenčina „zapni to“:
            - Série: duplikovat „008 Overture C“ (id 486091131) včetně mailů jako „008 Overture A“. Text vložit přes Code View editoru Froala: hodnotu `textarea.fr-code` nastavit JS settrem a tlačítko Code View přepnout skutečným kliknutím (JS `.click()` nefunguje). Uložit jen „Save“.
            - Workflow: duplikovat „Carriage C Overture workflow“ (id 232510381) jako „Carriage A Overture workflow“. Ve výběrech (selectize) smazat vybranou položku klávesou Backspace, napsat novou a dát „Add“. Pole `carriage_A_overture` (nové), cíl a rozhodnutí štítek `Purchased: HELE` (ověřit přesný název v Dripu), štítky `carriage: Overture_A_finished` a `carriage: Overture_A_purchase`, série 008 Overture A.
            - Po „zapni to“: aktivovat sérii (API `activate_campaign`), zapnout workflow (`activate_workflow`), v Controller A (id 877609469) přidat krok „Add a person to a Workflow → Carriage A“ do větve No pod rozhodnutím o poli `carriage_A_overture` (stejně jako v Controller B a C). Ověřit přes API `get_workflow_details`.
        3. **Test.** Testovací kontakt na Lenčin Gmail alias (např. `+overturea`) založit API a poslat rovnou do Controller A (`add_subscriber_to_workflow`, pole `controller` nenastavovat, spouští jiné workflow). Za 2–3 min v historii kontaktu má být Controller A → Carriage A, vyplněné pole a přihlášení do série. Vyhodnocení a smazání kontaktu (jen na Lenčino slovo) do [[waiting-for]].
        4. **Na konci:** výsledek do Průběhu dne v `daily/YYMMDD.md` (čas začátku a konce), do [[drip-lcenglish-uvitani]] a sem do Aktuálního stavu; karta `drip-vagon-a` na tabuli (`beh: bezi` na začátku, `hotovo` nebo `ceka` + `potrebuju` na konci); nedodělky do `## 📥 Pro denní vlákno`. Vlákno se nezavírá a necommituje.

## Záznam (nejnovější nahoře)

### 261029 — Vagón C postaven, zapnut a otestován (vlákno Overture C a B)
- Texty Overture C (6 mailů) a 6. mail Overture B prošly dvěma koly připomínek a Lenka je schválila. Položky GrowOS `overture-c-10x-english-v2.md` a `overture-b-mail-6-v2.md` jsou `published`.
- V Dripu: 6. mail B „Kámen na srdci (a na jazyku)“ (předmět upravila Lenka) v 008 Overture B; série 008 Overture C (id 486091131); Carriage C Overture workflow (id 232510381); v Controller C krok Start Carriage C. Vše aktivní.
- Test: kontakt `lnk.dvorakova+overturec@gmail.com` 13:30 do Controller C, 13:32 Carriage C, pole vyplněné, přihlášen do série.
- Detail v `daily/261029.md`.
