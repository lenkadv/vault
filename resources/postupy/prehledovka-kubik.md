# Postup: Přehledné dějiny antického a středověkého umění (doc. Kubík) – zpracování po tématech

Vznikl 261027. Absolvovaný předmět (1. ročník, ZS + LS). Cíl: **zápisky po tématech** ze všech dostupných nahrávek z různých let, jako podklad ke státnicím. Hlavní postup zápisků (vzhled, kontrola údajů, Poznámky ke kontrole) je v [[resources/postupy/zpracuj-prednasku]]; tady jsou odlišnosti. **Anki se nedělá** (Lenka 261027).

## Proč po tématech, ne po přednáškách
Lenka předmět nenahrávala. Nahrávky jsou z různých ročníků a doc. Kubík v každém roce stihne jiný kus látky (na konci semestru často zhušťuje, v některých letech má víc času). Jedno téma se proto skládá z více nahrávek a jedna nahrávka může obsahovat víc témat.

## Zdroje
- **Notebook „Přehledovka Kubík – všechny nahrávky“** (`7c48904e`, založen 261027): **jediný pracovní notebook**, každá nahrávka v něm jednou. Placený tarif, limit 50 zdrojů neplatí. Malé notebooky `01`–`19` (Pravěk … Pozdní gotika) a „Přehledovka komplet“ (`93d7364d`) zůstávají beze změny; komplet obsahuje jen řadu m4a sloučenou po tématech a **nemá** nahrávky 2018/2019, proto se z něj nekopírovalo.
- **Ročníky nahrávek:** řada m4a (`2 Keltové 1`, `16_1 Karolinská renesance` …, rok neznámý), ZS 2018 (`N. Stredovek DD. MM. 2018`), LS 2019 (`LS N … 1903xx`), ZS 2019 (`7.`/`10. Stredovek … 2019`), **2021/22 od spolužačky** (`PD YYMMDD`, ZS jen 30. 11. 2021, LS 14. 2.–23. 5. 2022).
- **Vizuální kultura středověku 2** (`VIZU 25MMDD` z 2025, `VIZU2 22MMDD` z 2022): doc. Kubík ji vykládá jako podmnožinu přehledovky, takže obsahuje i látku k přehledovce a místy se s ní kryje (Lenka 261027). Zdroj na stejné úrovni jako nahrávky přehledovky, u rozdílů uvádět, že jde o Vizu.
- **Originály nahrávek:** `G:\Můj disk\02 EDUCATION 📚\KTF\XX Absolvované\Přehledovka Kubík – nahrávky k vytřídění (z počítače)\` (podsložky m4a, mp3; `2021-22 od spolužačky (Přehledovka + Vizu 2)` = kopie z disku spolužačky cajchanova@gmail.com, složka Dějiny umění → Prvak → Rec). `Audio Overviews` = AI shrnutí, ne přednáška, nepoužívat. Kubíkův **Úvod do dějin umění** (2021, na disku spolužačky) je jiný předmět, nepoužívá se.
- **Slajdy:** album Google Photos „Přehledné dějiny antického a středověkého umění 24ZS 25LS“ (8. 10. 2024 – 19. 5. 2025, Lenčino, odkaz v Docu `Přehledné dějiny antického a středověkého umění I + II` ve složce předmětu). Otevře se bez přihlášení, fotky jdou stáhnout (`lh3.googleusercontent.com/pw/…=w1600`), mají datum focení. Slajdy jsou většinou fotky děl **bez popisku** → slouží k identifikaci díla, jména a datace z přednášky a webu. Záloha: fotky slajdů 2021/22 na disku spolužačky (`Prvak/Foto_Kubik/PrehledneDejiny1, 2`).
- **Kontrolní materiály (ne zdroj obsahu):** státnicové otázky `KTF/Státnice Bc/` (I. 1–6, II. 1–10), studentské zápisky spolužaček (`Prvak/Kubik-podklady/Přehledovka_*.docx`, 2022), PDF k tématům ve složce předmětu. Co v nich je a v přednášce ne → ověřit v Notebooku, ne opisovat.

## Pracovní složka a přepisy
`C:\Users\Lenka\Documents\kubik-work\` (mimo Disk): `dump.py` stáhne přepisy (`source fulltext`) do `tx\` a osnovy nahrávek (dotaz na jednu nahrávku, vždy `--new -y`, notebook je náš) do `osnovy\`; `sources.json` = seznam zdrojů. Přepisy jsou úplné a čitelné, takže úsek k tématu jde číst přímo, nejen přes shrnutí Notebooku.

## Výstupy
- **Složka:** `KTF\XX Absolvované\Přehledné dějiny antického a středověkého umění\Zápisky\` (bez sdílené podsložky; sdílí se případně celá, Lenka 261027).
- **Jeden Google Doc na téma**, vzhled podle [[resources/postupy/zpracuj-prednasku]], navíc oddíl **„Ke státnicím“** (jako u Metodologie 2) a v Poznámkách ke kontrole rozdíly mezi ročníky **s rokem nahrávky**.
- Zpráva z Notebooku se generuje ze **všech nahrávek k tématu** (`-s` pro každou), ne z jedné.

## Jak vzniká zápisek k tématu (pilot 261027)
1. Nahrávky k tématu najít hledáním klíčových slov v celých přepisech (`tx\`), u nejasných podle osnovy; nahrávky delší pasáže převést `fold` do `wrap\` a číst přímo (ne přes zprávu Notebooku, přepisy jsou úplné, Notebook u více nahrávek vynechává). Takhle jde pracovat souběžně s frontou dotazů na Notebook.
2. Text píše Claude do `zNN.md` ze všech ročníků; rozdíly mezi ročníky a co zaznělo jen v jednom roce → Poznámky ke kontrole (`notesNN.py`). Vizu jako samostatný oddíl „doplněk“.
3. **Lenčiny vlastní poznámky z roku 2025** (PDF ve složce předmětu, např. `Karolinská renesance.pdf`, export z Notionu s datem přednášky a seznamem děl a datací) slouží ke kontrole jmen a datací; podle nich je řada m4a (alespoň `16_1`) z LS 2025, tedy Lenčin ročník.
4. Doc: HTML → Drive `create_file` do `Zápisky`, název `NN Téma: podtitul`; vzhled `formatNN.py --map HEADING_1:title,HEADING_2:h1,HEADING_3:h2,HEADING_4:h3`, dávku rozdělit na 4 části (první s `requiredRevisionId`).

## Témata v samostatných vláknech (Lenka 261027)
Každé téma běží ve **vlastním vlákně** (šetří kontext hlavního vlákna, víc témat najednou). Hlavní vlákno „Přehledovka Kubík“ vlákna zakládá, kontroluje výsledek a vede tabulku Stav.
- Vlákno tématu: přečte tento postup, [[resources/postupy/zpracuj-prednasku]] (oddíly 5–8) a pilot `kubik-work\z09\` (vzor, schválen); pracuje v `kubik-work\zNN\`; Doc do složky `Zápisky`.
- **Nesahá na tento soubor** (víc vláken najednou by se přepisovalo). Výsledek zapíše do `kubik-work\zNN\STAV.md` (odkaz na Doc, použité nahrávky a ročníky, co zbývá) a jednou řádkou do Průběhu dne v `daily/YYMMDD.md`.
- Notebook používá jen výjimečně a vždy s `-s` a bez `--new` (frontu osnov a dotazy jiných vláken nerušit); hlavní zdroj jsou přepisy v `tx\`.
- Státnice: **III. 2** má v oficiálním znění výslovně „byzantský spor o obraz (vč. Libri carolini)“ i dílenskou literaturu (receptáře), proto Libri Carolini a traktát z Lukky patří do III. 2 (ověřeno v `SZZ otázky_.docx` 261027, Lenka se ptala).

## Postup
1. ✅ Společný notebook (261027).
2. Soupis nahrávek → témata (z osnov a přepisů): tabulka nahrávka × téma × ročník × podíl. Výsledek ukázat Lence.
3. **Kostru témat potvrdí Lenka** (výchozí návrh: témata malých notebooků 01–19, jemněji jen kde to pomůže státnicím, např. česká gotika přemyslovská × lucemburská).
4. Pilot jednoho tématu (návrh: Karolínská a otonská renesance, II. 4), schválení vzoru, pak po jednom tématu.
5. Stav zpracování vést v tabulce níže.

## Lenčiny ruční poznámky 2024/25 přes Gemini (261030)

Lenka fotí ruční poznámky z přednášek 2024/25 a nechává je přepsat v Gemini (přepis má chyby, ale dá se číst). Slouží k doplnění mezer v nahrávkách. Prověřeno 261030:

| Zdroj | Přednáška | K čemu |
|---|---|---|
| Doc [Kubík přednáška 241015 1](https://docs.google.com/document/d/10AdafAeTtsq2sIp8gKgtXF8f5tqrQLkp4sTbwiHmU1g/edit) | 2. přednáška, 15. 10. 2024: paleolit, mezolit, neolit (Göbekli Tepe, Bylany), začátek eneolitu | **mezera v 01**: paleolit (v nahrávkách chybí, dosud jen slajdy) |
| Gemini chat „Přepis poznámek z dějin umění“ (gemini.google.com/app/d36fc6dffaa56922), 1 odpověď | bez data; dějiny oboru (Hegel, Waagen, Winckelmann, Berenson, Caylus). Odhad: 1. přednáška 8. 10. 2024 (nenahraná), neověřeno | úvod předmětu, do témat 01–19 nepatří |
| Gemini chat „Přepis pravěku“ (gemini.google.com/app/144ac37c8c1b9d5a), odpovědi 1–4 | 29. 10. 2024: Egypt (Abydos, Stará, Střední, Nová říše, Tutanchamon) | téma 02, nahrávka existuje, jen kontrola |
| tamtéž, odpovědi 5–6 | 5. 11. 2024: kykladská kultura (jen řádek a nákres idolů), Kréta, Mykény, protogeometrický styl | **mezera v 03**: Kyklady, ale jen heslovitě |
| tamtéž, odpovědi 7–10 | 12. 11. 2024: dórský řád, tyranie, vázy, perské války, Periklés, peloponéská válka, Myrón, Diův chrám, Polykleitos | téma 04a, nahrávka existuje, jen kontrola |

**Postup (Lenka 261030):** do Docu „Kubík přednáška 241015 1“ jde jen to, co doplňuje mezery (15. 10. paleolit až eneolit; 5. 11. jedna stránka „Mínojská kultura … Agamemnonova maska – abstrakce“, vložena 261030 za zalomení stránky). Lenka přepis opraví podle ručních poznámek, **teprve pak** Claude doplní do Doců 01 a 03 jen to, co v nich není (zdroj v Poznámkách ke kontrole: Lenčiny ruční poznámky 2024/25). Do té doby z přepisů Gemini nic nepřebírat, jsou v nich chyby čtení.

**Alexandrijská škola (04b) doplněna 261030** z Lenčiných ručních poznámek z 19. 11. 2024 (nadiktovala v chatu; nahrávka `7a Řecko` = pravděpodobně 26. 11. 2024, začíná pergamskou školou). Doplněno i do odstavce Urbanismus (podíl městského obyvatelstva, pouliční osvětlení). **01 a 03 doplněny 261030** z opravených přepisů: 01 oddíl 2 (starší paleolit až Göbekli Tepe, 9 bodů), Shrnutí, Poznámky (rozpor stanová × sedlová střecha, data k ověření); 03 kykladská kultura a Evans (oddíl 1), keramika 18. století (oddíl 5), Poznámky, tabulka Ke státnicím. Mezery v nahrávkách tím pokryté; Becho (Závist) a Amiens v poznámkách nejsou.

## Stav
| Krok | Stav |
|---|---|
| Notebook se všemi nahrávkami | 261027: 61 zkopírováno z malých notebooků, 15 nahráno z Disku, 30 z 2021/22 → po odstranění 9 duplicit **97 nahrávek** |
| Duplicity (podle přepisů, 261027) | z notebooku odstraněny: `10. Stredovek 17. 12. 2019.wav` (= 10a + 10b), `7. Stredovek 19. 11. 2019.wav` (= 7a + 7b), `LS 6. Stredovek 2 25. 3. 2019` (= LS 6.a–c), `3. Stredovek 23. 10. 2018` (= 3a + 3b), `7 Řecko` (= `6. Stredovek 13. 11. 2018`), `8a Řecko` (= `7a Řecko`), `8b Etruskové` (= `7b`), `9a Etruskové` (= `8a`), `2 Keltové 1a` (úsek `2. Středověk 16. 10. 2018`). Přepisy odložené v `kubik-work\tx\_duplicity\`. **Pozor: řada m4a je zčásti tvořená nahrávkami z ZS 2018** (např. `7 Řecko` = 13. 11. 2018), rok u ní tedy není jednotný. Částečný překryv bez odstranění: `13 Ravenna Byzanc` × `13_2 Byzanc_I`, `2 Keltové 1` × `2 Keltové 1b`. |
| Soupis nahrávek | 261027 hotový: `kubik-work\soupis.md` (nahrávka → úseky s podíly, z osnov Notebooku; osnovy v `osnovy\`, celé přepisy v `tx\`) |
| Kostra témat | čeká na soupis a Lenku |
| Pilot 09 Karolínská renesance | 261027 Doc [09 Karolínská renesance: od palácové kaple v Cáchách po bible Karla Holého](https://docs.google.com/document/d/1WHKrzYZe5cpfF_HEvSzLmp5Y92Kuk4WXHaY116USMIQ/edit) (složka `Zápisky`, ID složky `1pWPyIrzLvb9YUTnILWzrdfxFZ5DQdSQK`); **vzor schválen Lenkou 261027 14:11** (struktura, oddíl Ke státnicím, Poznámky ke kontrole s ročníky, Vizu jako doplněk). Pracovní soubory `kubik-work\z09\` (`z09.md`, `notes09.py`, `build_html09.py`, `format09.py` s nastavením tabulek). |
| 06 Řím | 261027 Doc [06 Řím: od etruského dědictví po Konstantinovu stylovou syntézu](https://docs.google.com/document/d/1eqlpjbBM5P0r82hTST7ZQCzL8qeQcPSu9kZCjB1lmcA/edit), 1,5× pilot; detail `kubik-work\z06\STAV.md` |
| 07 Křesťanská antika | 261027 Doc [07 Křesťanská antika: od katakomb po ravennské mozaiky](https://docs.google.com/document/d/1M7NPZ9uA_ynxJSqcJq8Myde-BeQQpj7kYgdyLMhlDSE/edit); justiniánská Ravenna jen z 2022; `z07\STAV.md` |
| 10 Velká Morava | 261027 Doc [10 Velká Morava: od Sámovy říše po zlatnictví a kostely Mikulčic](https://docs.google.com/document/d/17UNQv0_ucwZqt8O1bsfNsqKbK7uRCJ30vuDtRwUxiOs/edit); `z10\STAV.md` |
| 11 Otonská renesance | 261027 Doc [11 Otonská renesance: od Gernrode po evangeliáře Oty III.](https://docs.google.com/document/d/1bzi8UchaV8qdFWY4iFVp7A1J-OAe6iogs9fnKeaKbRs/edit); `z11\STAV.md` |
| 01 Pravěk a Keltové | 261027 Doc [01 Pravěk a Keltové: od Stonehenge po keltská oppida](https://docs.google.com/document/d/1Wd-4Ac8oGDnaWyd26o47QbbqWM89lsfaZSdb1Q0euBo/edit); `z01\STAV.md` |
| 02 Egypt | 261027 Doc [02 Egypt: od Narmerovy palety po fajjúmské portréty](https://docs.google.com/document/d/1v8TxkbMpOOC6c2la73gGTf9pQYPuWSrZ4HcPTo4oP1I/edit), 20 stran; `z02\STAV.md` |
| 03 Egejské civilizace | 261027 Doc [03 Egejské civilizace: od paláce v Knóssu po Lví bránu v Mykénách](https://docs.google.com/document/d/19-4MmRLJczjlbpfoBsBt1CcAVCuURZPtrQ43_BloKrk/edit); kykladská kultura v žádné nahrávce; `z03\STAV.md` |
| 04 Řecko | 261027 dva Docy: [04a Řecko: od geometrického slohu po Feidia](https://docs.google.com/document/d/1OlD-cpOtu47LtPCF8NK_Tz2I8YS5kAtuUJnICg5bF8M/edit), [04b Řecko: od pozdní klasiky po helénismus](https://docs.google.com/document/d/1vAQhtrbfim6Ye2JHY7gbHabeLid2fACCzFaiFw2JuhM/edit); `z04\STAV.md` |
| 05 Etruskové | 261027 Doc [05 Etruskové: od urny z Viterba po Řečníka z Trasimenského jezera](https://docs.google.com/document/d/1IloUrmLd7mqwifkpyLYqdWqXqLYKEGO0OTaBAJ-j0x4/edit); `z05\STAV.md` |
| 08 Barbarské umění | 261027 Doc [08 Barbarské umění na Západě: od zvěrného stylu po Evangeliář z Kellsu](https://docs.google.com/document/d/1xmDrM7RhLy7gbG680e6uYSbRSzJeZ27INcaM51pSu1w/edit); `z08\STAV.md` |
| 12 Románské umění v Evropě | 261027 dva Docy: [12a Románské umění v Evropě: od Cluny po Saint-Denis](https://docs.google.com/document/d/1J7BL9A2raOgNDH97XlJGf8s6KDfzw0b8zeJovpd5lVM/edit), [12b Románské umění v Evropě: Itálie od Sant'Ambrogia po Castel del Monte](https://docs.google.com/document/d/1qQf3DMWOVRyBkHHmnLfcOOA5o_UbS4VtLmGB86wYUv4/edit); `z12\STAV.md` |
| 13 České předrománské a románské | 261027 dva Docy: [13a České předrománské umění: od Bořivojových kostelů po Gumpoldovu legendu](https://docs.google.com/document/d/1P5nmK1pE0_nH2NyfbeT-UTo5xZyaJjQby67GDZ7kyXo/edit), [13b České románské umění: od svatovítské baziliky po Juditin most](https://docs.google.com/document/d/1MBdpbCcn_rcHYffAOwmY5u_muuXKKGcfO5MNFWOVo-M/edit); `z13\STAV.md` |
| 14 Gotika ve Francii a Zaalpí | 261027 [14a](https://docs.google.com/document/d/1zFYqywRmlLE9w5iTca7QcaFa7VFZqQXhHhd4J5xu_6c/edit) Francie, [14b](https://docs.google.com/document/d/1emI4aGFqqB5gwqSDOyaNaa_sNaTivQzvPPuhHc4z6V8/edit) Zaalpí; `z14\STAV.md` |
| 15 Byzanc | 261027 [15a Byzanc I](https://docs.google.com/document/d/17dhWvkxHzMAMRBSciVV7XSC9ERN2EUGnMNkaixGaqY8/edit), [15b Byzanc II–III](https://docs.google.com/document/d/1sm6ziC94E4UDZwr-tnCHJ_CSxrUvn4ISi2ZwDUX9dxc/edit); `z15\STAV.md` |
| 16 Italská gotika | 261027 [16a architektura a sochařství](https://docs.google.com/document/d/1D2SJvGwxZc6ZR97JOQclJmJRSTGfwX5NDy8pI6IOoV4/edit), [16b malířství](https://docs.google.com/document/d/1uNSX23v4hfXq5lRDMupxYm2eteVzejQjOPYrRhTYCoE/edit); `z16\STAV.md` |
| 17 Česká gotika | 261027 [17a přemyslovská](https://docs.google.com/document/d/17N4fSmigF32laZSIvOlWZmFZjI7bvnpLYuHzTCUpqTU/edit), [17b lucemburská do Karla IV.](https://docs.google.com/document/d/1ujVPeDZTYole7SWRBFJlvCE-_FEQR0fwLV79TtnbgdQ/edit); `z17\STAV.md` |
| 18 Krásný sloh a mezinárodní gotika | 261027 [18a Krásný sloh](https://docs.google.com/document/d/1TzyJqzpj54SOJBXZx45dHR5_IYMY4kpUjrTyi-bAmvM/edit), [18b Mezinárodní gotika](https://docs.google.com/document/d/1EaWwfuZF9priklx1ctbXnvqq57HqxwtbGzfWQMFvRPQ/edit); `z18\STAV.md` |
| 19 Pozdní gotika | 261027 [19 Pozdní gotika a počínající renesance](https://docs.google.com/document/d/11kSYPPNp2589E2WOgXveuawOTG8VN1WjJE7tKUJDzpk/edit); `z19\STAV.md` |
| **Celkem** | 261027: všech 19 témat hotových, 27 Docs ve složce `Zápisky`; se slajdy porovnáno jen 01 (paleolit). |
