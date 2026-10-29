---
project: digistart-pilot-staticke-1
skill: ads-meta-create
offer: digistart-pilot
objective: návštěvy stránky (landing page views), rozhodnutí Lenky na Decision Boardu 29. 10. 2026
---

# DigiStart pilot: statické reklamy, kolo 1

Podklad: řádek 3 schváleného briefu kampaně `work/strategy/digistart-pilot-kampan.md` (id 4jmspo7toz). Reklamy hotové do pá 6. 11., běží 9.–20. 11. 2026, zakládá je řádek 6 (pozastavené), zapíná Lenka.

## Readiness
| Component | Rating | Evidence | Action or override |
|---|---|---|---|
| Offer | amber | Jasná cena (15 000 Kč, pilot), termíny, kdo vede, konzultace zdarma (`brain/business.md`). Reference DigiStartu žádné nejsou, jen ohlasy z dřívějších webinářů (`proof/2026-10-21-ohlasy-ai-webinare-lenka.md`). | Reklamy nesou mechanismus, příběh lektorky a otevřenou cenu, ne výsledky účastnic. |
| Message-to-page continuity | amber | Živé čtení B3 29. 10. 2026 (https://lenka-dvorakova.lpcontent.net/iYfYzG6Yg_): stránka pokračuje přesně slibem reklam („Chatovat s AI umíte. Teď jí dejte práci.“, rada × práce, Lenčina svodka, cena, konzultace). Ale stránka má nahoře „Koncept B3 k připomínkám“, žlutá místa (čas mezi setkáními, záznam) a patičku bez údajů GNOSTIKY. | Před spuštěním musí být hotový řádek 14 briefu (úpravy B3). Bez něj je to červená. |
| Measurement | red | Pixel ještě neexistuje (projekt, linie 2). Optimalizace na návštěvy stránky pixel potřebuje. | Linie 2 projektu: ověřit účet, pak pixel. Reklamy se do té doby jen připravují. |
| Account and delivery | amber | Portfolio DigiStart za GNOSTIKU a reklamní účet existují (28. 10.); měna, časové pásmo a karta neověřené. | Karta „ověřit reklamní účet“ na tabuli. |
| Test capacity | amber | 5 000 Kč (předběžně) na 12 dní, asi 420 Kč denně, cíl návštěvy stránky. Na 4 reklamy to stačí k orientačnímu srovnání, ne k závěrům o nákupech. | Kolo drženo na 4 reklamách. |

Red u měření: pokračuje se s rizikem, protože reklamy se teď jen připravují a pixel je samostatný úkol před spuštěním (Lenka 29. 10.: „go“ na řádek 3).

## Strategy
- Audience and awareness: solo podnikatelka, která AI už zkusila jako chytřejší vyhledávač (`brain/audience.md`). Hlavně problem-aware se slabým solution-aware; studený provoz z Facebooku.
- Recommended method mix: contrarian reframe + demonstrace mechanismu, mental movie, founder příběh (native), offer-first.
- User overrides: žádné. Výroba podle doporučení (hybrid), metodu volí skill.
- Signal, adjacent, and explore posture: vše explore (první kolo, žádná historie).

## Round sizing
- Budget and window: 5 000 Kč předběžně, 9.–20. 11. 2026 (Decision Board 29. 10.).
- Target CPA or ROAS: [PLACEHOLDER: není stanovené; optimalizuje se na návštěvy stránky, ne na nákup]
- Existing active concepts: 0 (účet bez reklam).
- Finished concepts: 4 (spodní hranice pro první kolo; brief kampaně: 3–5).

## Placement and production plan
| Ad code | Format | Placement | Method | Lane | Production route |
|---|---|---|---|---|---|
| DGS-IMG-1029-01 | image 1080×1350 | Feed FB/IG | contrarian reframe + demonstrace | explore | custom-html |
| DGS-IMG-1029-02 | image 1080×1350 | Feed FB/IG | mental movie | explore | custom-html |
| DGS-IMG-1029-03 | image 1080×1350 | Feed FB/IG | native conversation (founder) | explore | custom-html, skutečný portrét |
| DGS-IMG-1029-04 | image 1080×1350 | Feed FB/IG | offer-first | explore | custom-html, skutečné portréty |

## Test structure
- Suggested budget: jedna kampaň, jedna sada reklam, 4 reklamy, denní rozpočet podle stropu (asi 420 Kč). Rozdělení řeší `ads-meta-publish`.
- Evaluation floor: 14 dní doručování nebo 2–3 násobek cílové ceny za akci; 12denní kampaň dá jen orientační výsledek. Vyhodnocení = řádek 17 briefu.
- Tracking limitations: bez pixelu nejde optimalizovat na návštěvy stránky ani měřit nákupy; nákup jde přes SimpleShop GNOSTIKY (jiná doména).

## Risks
- B3 je zatím koncept se žlutými místy (řádek 14).
- Pixel a ověření účtu (linie 2 projektu).
- Odkaz reklam: B3 na lpcontent.net; pokud se B3 přesune na digistart.cz nebo ji nahradí B4, `link` se v položkách přepíše před publikací (přes review).
- AI obrázky: DigiStart nemá vlastní klíč kie.ai v `.env`, proto všechny reklamy custom-html (bez AI obrázků). AI vizuály pokrývá řádek 4 (WinningAds) a řádek 5 (AI video).
