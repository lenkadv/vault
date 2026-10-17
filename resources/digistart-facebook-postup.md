# DigiStart: založení Facebooku, reklamního účtu a pixelu (postup 261017)

Postup k projektu [[digistart]]. Lenka zakládá účty (Claude účty zakládat nesmí), Claude potom dodělá nastavení a propojení. Ověřeno v nápovědě Meta 17. 10. 2026 (odkazy u kroků). Co ověřené není, je označené.

## Proč nové portfolio „DigiStart“

- **Firemní položky (stránka, reklamní účet, pixel) můžou patřit jen do jednoho portfolia.** Zdroj: [Vytvoření firemního portfolia](https://www.facebook.com/business/help/1710077379203657).
- **Pixel (dataset) nejde odstranit ani převést pod jiné portfolio**, jde jen sdílet. Zdroj: [Vytvoření datasetu pro Meta pixel](https://www.facebook.com/business/help/314143995668266).
- Proto všechno vzniká rovnou v portfoliu DigiStart, ne ve stávajícím portfoliu „Lenka Dvořáková“ (tam je LCEnglish).
- **Předání GNOSTICE později:** portfolio se nepřevádí, jen se v něm změní údaje o firmě a správci (Štěpánka dostane úplnou kontrolu, Lenka se případně odebere). Meta má na to články „Úprava informací v Meta Business Suite“ a „Přidávání lidí k firemnímu portfoliu“; podrobné kroky jsem nečetla.
- ⚠️ **Jeden člověk může sám založit nejvýš 2 firemní portfolia** (zdroj výše). Jedno už Lenka má. Pokud jich má už dvě, nové nepůjde založit: pak napsat Claudovi, řešení je založit ho přes Štěpánku.

## Kroky pro Lenku

1. **Facebooková stránka**
   facebook.com/pages/create → název **DigiStart** → kategorie „Vzdělávání“ → Vytvořit. Fotku, bio a pozvánky přeskočit.

2. **Firemní portfolio** (zdroj: [nápověda Meta](https://www.facebook.com/business/help/1710077379203657))
   business.facebook.com → vlevo nahoře rozbalovací nabídka v oddílu Hlavní stránka → **Vytvořit firemní portfolio** → název **DigiStart** (bez speciálních znaků) → jméno, příjmení a firemní e-mail (zákazníci ho neuvidí) → **Vytvořit**. Potom **potvrdit e-mail**, který Meta pošle.

3. **Stránka do portfolia**
   V portfoliu DigiStart: Nastavení → Účty → **Stránky** → Přidat → **Přidat stránku** (ne „Požádat o přístup“) → DigiStart.
   *Přesné popisky tlačítek jsem v nápovědě neověřila, mohou se mírně lišit.*

4. **Reklamní účet** (zdroj: [Přidání účtu pro reklamu](https://www.facebook.com/business/help/915885887059947))
   Nastavení → Účty → **Účty pro reklamu** → Přidat → **Vytvořit nový účet pro reklamu** → název **DigiStart**, časové pásmo **Europe/Prague**, měna **CZK**.
   ⚠️ Měnu a časové pásmo podle mé znalosti později změnit nejde (neověřeno v nápovědě), proto CZK a Praha.
   Platební metodu teď přeskočit. Kartu GNOSTIKY zadá Lenka nebo Štěpánka později; Claude karty nezadává.

5. **Napsat Claudovi „hotovo“** a poslat adresu stránky.

## Co pak udělá Claude (s Lenčiným souhlasem, přes prohlížeč nebo konektor Meta Ads)

1. **Pixel (dataset)** v portfoliu DigiStart: Nastavení → Zdroje dat → **Datasety a pixely** → +Přidat → název „DigiStart pixel“ → kategorie → Vytvořit (zdroj: [nápověda Meta](https://www.facebook.com/business/help/314143995668266)). Pak k němu přidat reklamní účet DigiStart.
2. Zkontrolovat, že stránka, reklamní účet a pixel jsou v portfoliu DigiStart a navzájem propojené.
3. Přidat Štěpánku do portfolia (pozvánka na její e-mail; přijme ji ona). *Až Lenka řekne, s jakou rolí.*
4. ID stránky, reklamního účtu a pixelu zapsat do `GrowOS/digistart/setup.md`, až je Lenka potvrdí.
5. Pixel vložit na prodejní stránku až po výběru varianty, před spuštěním reklamy (bez pixelu se reklama nespouští).
6. Doplnit na stránku bio, kontakt a tlačítko, až bude jasné, kam vede (stránka DigiStart nebo rezervace).

## Stav 261017 17:27

- Portfolio DigiStart založeno (Lenka). Stránku přes portfolio založit nešlo: Meta portfolio hned **omezila** („Vaši firmu jsme omezili“, důvod: podezření na automatizaci při tvorbě účtu, zásady integrity účtu). Nemůže vytvářet ani spouštět reklamy. Na žádost o kontrolu zbývá 179 dní.
- Postup: Lenka sama a ručně požádá o kontrolu (Kvalita účtu → Požádat o kontrolu), případně ověří identitu. **Claude do Meta účtů DigiStartu přes prohlížeč nesahá, dokud omezení trvá** (důvod omezení je automatizace).
- ID portfolia DigiStart: 1997193427623921 (ze screenshotu žádosti o kontrolu, 17:35). Kontrola chtěla ověřovací SMS kód; v 17:35 nedorazil.
- Ověřovací kód nepřišel ani po druhé žádosti (SMS ani WhatsApp, 17:51). Dnes dál nezkoušet; zítra jednou v aplikaci Meta Business Suite v telefonu. Doporučená souběžná cesta: portfolio za GNOSTIKU založí Štěpánka.
- **FB stránka DigiStart založena z Lenčina profilu (18:48), mimo portfolio:** https://www.facebook.com/profile.php?id=61595531789130 (ID 61595531789130). Do portfolia se přidá až po zrušení omezení, nebo do portfolia GNOSTIKY. Bio, fotky a tlačítko zatím prázdné.
- 21:29: Lenka z telefonu (prohlížeč) našla a odklikla „eskalovat pozastavení“ (jen zaškrtávací políčko, žádné potvrzení se neukázalo). Jestli žádost odešla, nevíme. Ověřit jednou zítra v Kvalitě účtu (stav problému) a v e-mailu / Support Inbox; když se do pár dní nic nehne, cesta přes Štěpánku (portfolio GNOSTIKY).
- Lenka teď má 2 vlastní portfolia, třetí sama založit nemůže. Pokud kontrola neprojde: portfolio založí Štěpánka (GNOSTIKA), což sedí i na pozdější vlastnictví.

## Vzhled stránky (připraveno 261017)

Soubory v `GrowOS/digistart/brain/assets/facebook/` (popis v `brain/assets/index.md`), nahrává Lenka ručně (důvod: portfolio DigiStart omezeno pro podezření na automatizaci, stránka visí na Lenčině profilu, který spravuje i LCEnglish; automatické klikání přes prohlížeč by mohlo upozornit i na její profil — domněnka, neověřeno):
- **Profilová fotka:** `profil-A-foto.jpg` (společná fotka z parku, doporučeno) nebo `profil-B-bordo.jpg` (výřez na bordó).
- **Úvodní fotka:** `uvodni-foto-1640x924.jpg` (rozměr drží text i tváře na počítači i na mobilu).
- **Úvod (bio, max. 101 znaků), dvě možnosti:**
  - „Chatovat s AI umíte. Teď ji naučte, aby pracovala za vás. Živý kurz online s Lenkou a Štěpánkou.“ (96)
  - „Živý kurz online: naučte AI, aby za vás odvedla kus práce. Vedou Lenka Dvořáková a Štěpánka Uličná.“ (99)
- **Kategorie:** Vzdělávání (případně přidat „Vzdělávací web“ nebo „Kurz“, pokud je Facebook nabídne).
- **Tlačítko:** zatím „Poslat zprávu“; po spuštění prodejní stránky „Zaregistrovat se“ / „Další informace“ s odkazem na ni.
- **Web:** zatím nevyplňovat (digistart.cz je zaparkovaná). **E-mail:** podle Lenčina výběru.

### Kontrola 261017 19:20 (veřejný pohled, bez přihlášení)
- Úvod „Chatovat s AI umíte. Teď ji naučte, aby pracovala za vás. S Lenkou a Štěpánkou.“, kategorie Vzdělávání, e-mail info@lenkadvorakova.cz: v pořádku.
- ⚠️ Web **digistart.cz** je vyplněný, ale doména je zaparkovaná → zatím odstranit, vrátit až s prodejní stránkou.
- Příspěvky: zatím jen „aktualizoval(a) úvodní fotku“.
- Lenka: úvodní fotka v1 (výřez ze selfie) se jí nelíbí → nová verze v2 s portréty z roku 2024 (`uvodni-foto-v2-1640x924.jpg`) a upravitelný návrh v Canvě (DAHYSZPRoKY).
- Skupina „Umělá inteligence v lektorské praxi“ (facebook.com/groups/ailektori) je soukromá, příspěvky bez přihlášení nejdou přečíst.

### Metricool a první příspěvky (261017)
- Lenka připojila stránku DigiStart do Metricoolu: značka **DigiStart**, blogId 7485903, FB ID v Metricoolu 1421056167749029 (jiné číslo než profile.php?id=61595531789130; u nových stránek má Facebook dvě ID, domněnka, že jde o tutéž stránku).
- Naplánováno přes Metricool (Lenkův pokyn, texty ze skupiny „Umělá inteligence v lektorské praxi“): 20:15 „Já jsem jasná 4️⃣…“ + obrázek Typologie lidí AI; 20:30 „Jak to máte vy? 😉“ + obrázek S čím se svěřím. Oba vyšly 17. 10. večer. **Antedatovat nejde**: Facebook nedovolí posunout příspěvek před datum založení stránky (Lenka 20:35). Zůstávají s dnešním datem; staré příspěvky ze skupiny dál jen jako běžné nové příspěvky, rozložené v čase.

## Otevřené

- Doména **digistart.cz** (Czechia, zaparkovaná): ověření domény v Meta přijde na řadu až se stránkou na vlastní doméně.
- Kdo z GNOSTIKY bude správce a z jaké karty se platí (rozhodnutí D4 v [[digistart-kampan-plan]]).
