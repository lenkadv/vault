# Zpětná vazba Štěpánky Uličné ke zkušebnímu průchodu DigiStartem (11. 10. 2026)

> Zdroj: e-mail Štěpánky Uličné „DigiStart – shrnutí zkušebního průchodu a můj pohled“, přišel 11. 10. 2026 v 14:59 → [Gmail](https://mail.google.com/mail/?authuser=lnk.dvorakova@gmail.com#all/thread-f:1878758313893206926). Štěpánka psala, že shrnutí připravil Claude z jejích průběžných poznámek a že podrobné poznámky ke každému kroku pošle. Dole je její diktát bez úprav.
> Patří k projektu [[digistart]] a k balíčku [[00-README]]. Z úprav vzniká seznam změn do skillů a návodů, viz úkol v projektu.

## 1. Výsledek v kostce

| Část | Stav | Hlavní zjištění |
|---|---|---|
| I. Web o auditech | běží na gnostika.cz/audity | WordPress nebyl, nasazeno na Netlify |
| 1. Úklid souborů | hotovo | přes 41 tisíc souborů, 271 složek a stovky volných souborů přesunuto, skoro bez chyb; největší wow efekt |
| 2. Hlasové profily | 4 profily v1 odzkoušené, 2 drafty | testy napoprvé „napsala bych“; AI vymýšlí osobní detaily |
| 2b. Psaní textů | používá se | – |
| 3. Koncepty e-mailů | funguje s Outlookem | první ostré koncepty odeslány prakticky beze změn |

Skilly `hlasove-profily` a `koncepty-odpovedi` jsou poprvé vyzkoušené na jiné uživatelce než na Lence a poprvé s Outlookem, a fungují.

## 2. Co upravit (priority podle Štěpánky)

**Vysoká (bezpečnost a věci, které rozbíjejí průchod)**
- Rozbalovat balíček do krátké cesty (např. `C:\dgs`). Do OneDrivu ani do scratchpadu to kvůli limitu 260 znaků nešlo.
- Skripty: kontrolovat délku cílové cesty předem. Jeden soubor se musel zkrátit.
- Skripty: v PowerShellu nepoužívat proměnné lišící se jen velikostí písmen (`$R` a `$r`). Opakovaná chyba.
- Skripty: normalizovat názvy souborů (NFD/NFC) před porovnáváním. Týká se OneDrivu.
- Sdílené složky přesouvá uživatelka sama. Claude Code přesun zablokuje i po schválení. Do návodu přidat, že přesun nemění sdílení a že sdílení se ruší na webu OneDrivu.
- Pojistka u konektoru pošty: vysvětlit, proč se doporučuje zakázat odesílání, mazání a přeposílání, a nabídnout mezikrok „zakázat jen odesílání“. Když ji uživatelka odmítne, respektovat to a zapsat.
- Hlasové profily: počítat s citlivými údaji ve vzorcích (ve vzorku byl mail s heslem). Vyřadit a upozornit.
- Osobní profil: nevymýšlet okolnosti ani fakta o lidech (AI vymyslela bratrovo kolo i „zapít“, a to Štěpánka nepije). Fakta brát z paměti, jinak `[DOPLNIT]`.

**Střední (zlepší zážitek)**
- Velké disky: návod počítá s malou složkou. U desítek tisíc souborů přesouvat složky první úrovně, ne jednotlivé soubory.
- Nejasné složky ukazovat s ukázkou obsahu (názvy souborů), ne jen s názvem. Pak se rozhoduje rychle.
- Duplicity dávat fyzicky na jednu hromadu (složka „ke smazání“), ne jen do seznamu.
- Ověřit tvrzení o synchronizaci (Synology, zálohované složky Windows) dřív, než se z nich udělá pravidlo. Doplnit do pravidla 4 v promptu.
- Hlasové profily: otázku „co víš o svém stylu“ dát až za inventuru a ptát se na konkrétních příkladech. Bez nich Štěpánka neví.
- Odlišit „zvyk/chybu“ od „rysu stylu“ (např. „mne/mě“). Když se jí to ukáže, rozliší to sama.
- U zkušených uživatelek AI odhalovat maily psané s AI (dlouhé, uhlazené, s dlouhou pomlčkou). Našly se 3. U nabídek pomohlo porovnat starší (2023–24) s letošními.
- Nabídky: vždy nabídnout kombinaci „obsah mým stylem, formální části uhlazeně“.
- Koncepty: úprava existujícího konceptu smaže citovanou historii. Raději vytvořit nový koncept odpovědi.
- Když se jméno v poště nenajde, hledat podle kontextu a nesoulad zmínit. Štěpánka zadala špatné příjmení a AI dohledala správnou osobu.

**Nízká (návod a komunikace)**
- Web: chybí plán B bez WordPressu (statický hosting typu Netlify, obecný postup změny DNS u registrátora, varování na MX záznamy). U Czechie se změny DNS projeví až po „Přenést změny“.
- Hlasový vstup komolí názvy („FEKT“ jako „fact“, „smaž“ jako „Vimaš“). Názvy, se kterými se nesmí hýbat, raději psát. Před mazáním se vždy doptat.
- Zkouška propojení pošty: jasněji napsat, že testovací mail posílá uživatelka sama a proč.
- Nový blok do kurzu: „pod pokličkou“. Co je skill, jak vzniká, kde leží a jak se upravuje. Na to se Štěpánka sama ptala.
- Rámec „digitální 5S“ pro účastníky z výroby a leanu.

## 3. Časy

| Krok | Čas |
|---|---|
| Úklid souborů: průzkum a návrh | asi 20 min (přesuny pak pár minut na dávku) |
| Profil pracovní – vykání | asi 60 min (vč. úvodního rozhovoru asi 10 min) |
| Profil pracovní – tykání | asi 25 min |
| Profil osobní | asi 15 min |
| Profil nabídky | asi 20 min |
| Propojení pošty (konektor už zapojený) | asi 2 min |

## 4. Ukázka pro kurz

Navazující práce s prvním ostrým konceptem: koncept, pak anotace webináře podle vzoru z webu klienta, vložení do konceptu, zápis do kalendáře a nakonec změna délky na 2 h na všech třech místech. AI jako asistentka, která drží souvislosti.

## 5. Její pohled (přepis diktátu bez úprav)

Tak můj pohled k tomu, co, co mi dalo nejvíc a co nejvíc. Tak pro mě wow efekt byl skutečně vidět Claude, jak přistupuje na moje složky na počítači, které mám teda na někde na disku sdílené, a jak nejdřív vytvoří strukturu, která, jak by to mělo vypadat. Upozorní mě na to, kolik tam mám položek. Pro mě byl šok, že tam mám 48 tisíc souborů, což mě přijde naprosto šílený. A potom, že tam je obrovské množství duplicit. Takže vlastně to, to, ten wow efekt nebyl s tím, že to potom srovnal, ale to, že mi vlastně ukázal, co tam, co tam ve skutečnosti mám a jak to vypadá. A potom mi pomohl tu strukturu vytvořit, protože kdybych ji takhle tvořila já a několik let si říkám, že bych si měla v tom udělat pořádek, tak ji ani nevymyslím. A to znamená správně vlastně načetl, pro které klienty pracuju, co dělám, jaký, co v těch složkách mám. A podle té struktury vlastně mi to pomohlo rozřadit. A díky tomu mě vlastně napadá, co s některými dalšími položkami, což bude další krok, jak využít tu hromadu materiálů, které jsem si různě postavovala, vytvořila za svoji dobu práce a říkala jsem si, že jednou se mi to bude hodit, ale vlastně jsem se k tomu už nikdy nedostala. A teď vidím, že už se blíží ten krok, kdy spolu s Claudem projdeme jednotlivé položky a jednotlivé soubory a uděláme z toho něco zajímavého a využitelného a nebude to tam jenom uskladněné. Takže není to jenom o tom, že se třeba sníží množství využití disku, ale vlastně je to o koncepci, o tom vlastně pohledu přímo podívat se na ty věci čelem a vlastně skvělý pomocník, který A pomáhá, radí, ale zároveň to i udělá.

Já jsem se cítila ztracená a nebo nejistá, a pořád jsem přemýšlela nad tím, jak se ten skill vytvořil, jak se mi tam dostal. Vím, že mi ho Lenička nahrála, vím, že ho nějak připravila, ale zajímalo by mě, jak vlastně se tenhle ten skill vytváří a, a, a, a t, jak je třeba náročné tohleto všechno promyslet, aby ten skill obsahoval všechny ty kroky, které mě potom prováděla.

A rozhodně v tuhle tu chvíli bych doporučila už jenom toto všem lidem, který mám ve svém okolí, protože podívat se na jejich počítače, jejich plochy, je evidentní, že vlastně ten fyzický nepořádek se v podstatě jenom přesunul do digitálního nepořádku. A tím, jak ve firmách ještě dělám 5S lean, a pracuju s lidma na tom, aby ve věcech měli přehled, tak si uvědomuju, jak je jednoduché vlastně mít nepořádek v těch digitálních, v tom digitálním prostředí a v těch souborech.

Co bych v kurzu chtěla jinak, to mě v tuhle tu chvíli rozhodně nenapadá. Naopak mě přijde naprosto úžasné, jak mě vlastně Claude pomocí těch skillů provází.

Další věc, která mě přijde naprosto neuvěřitelná, je, že načetl moje e-maily a navrhl mi a vlastně ukázal mi, jak s těmi lidmi různě komunikuju. Já jsem se nikdy neuvědomovala, že mám různé způsoby komunikace a že, že vlastně je rozlišuju. Myslela jsem si, že s každým komunikuju tak nějak přibližně stejně, ale není tomu tak. A, a, a vlastně dokázal jsem naučit, způsob, jak komunikovat s určitými typy, skupinami, jak klientů, tak přátel, tak známých, nebo klientů, se kterými mám už nějaký osobnější vztah a přesně dokázal vlastně vychytat ten můj způsob komunikace. Takže při prvních testovacích e-mailech a odpovědích mě naprosto fascinovalo, že používal ta správná slova i ten smajlík, který bych tam dala. A až mě to šokovalo, že jsem, že jsem přistála bych na to, že jsem to psala já.

## Co s tím (návrh)

1. Odpovědět Štěpánce na její mail („dej vědět, co na to říkáš“).
2. Projít priority výš a zapracovat je do skillů a návodů v `01-web-audity` až `04-skill-maily` (nejdřív vysoké: krátká cesta, skripty, citlivé údaje, pojistky pošty, nevymýšlení faktů v osobním profilu).
3. Nové bloky do kurzu: „pod pokličkou“ (jak vzniká skill) a „digitální 5S“.
4. Citát do propagace kurzu jen se Štěpánčiným souhlasem (viz memory „Reference s jménem“): její pohled na úklid souborů a na e-maily je silná reference.
