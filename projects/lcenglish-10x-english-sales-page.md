# LCEnglish — nová prodejní stránka 10x ENGLISH

**Oblast:** lcenglish
**Stav:** aktivní — technicky hotovo a live, design se předělává
**Zahájeno:** 260915

---

## Cíl

Nahradit slabou generickou FreshLearn prodejní stránku (`kurzy.lcenglish.cz/p/10xe` — bez ceny, CTA "Přihlaste se do kurzu" místo nákupu) plnohodnotnou prodejní stránkou na vlastní doméně, propojenou na existující FAPI checkout a automatizaci (Drip + Shadowloop + FreshLearn).

Vzniklo jako vedlejší produkt zkoušení YouCloned/AI Clone nástrojů (viz [[project_youcloned_integration]] v memory) — 10x English zvolen jako menší/bezpečnější test než HELE.

---

## Stav ke 260915 večer

### ✅ Hotovo a ověřeno
- **Stránka live:** `https://lcenglish.cz/10x-english` — plně funkční, na vlastní doméně, žádný "preview" banner
- **FAPI checkout ověřen:** cena 1 270 Kč sedí, produkční režim, webhook `fapipi.lenkadvorakova.cz/handle-invoice/10XE` správně napojený
- **Automatizace ověřena až po zdrojový kód** (`github.com/kokolem/fapipi/actions.json`): Drip tag "Purchased: 10x ENGLISHonly" + Shadowloop product_id "10x ENGLISHonly" + FreshLearn enrollment (course 157254, plan 22290) — všechno správně nastavené, nic se nemusí opravovat
- **Odkazy na `/kurzy`** (karta + patička) přepnuté na novou stránku — udělala Lenka sama v Elementoru
- **WordPress Leadpages plugin upgradován** z legacy 2.3.13 na 1.3.0 (nová verze podporuje Nova i Classic účet) — starý plugin bezpečně nahrazen, staré landing pages nepoškozené
- **Nova Leadpages účet připojen** k WordPressu přes OAuth, stránka publikovaná přes "Publish to WordPress" (ne přes REST API — ten stripuje `<style>`/`<link>` přes `wp_kses`, viz [[reference_wordpress_rest_api_kses_stripping]])
- **Shadowloop mechanismus poprvé sepsaný pro zákazníka** (ne jen admin postup) → `GrowOS/lcenglish/brain/methodology.md` sekce "Shadowloop — jak appka skutečně funguje" — použitelné napříč kurzy (HELE, 10x English, Irregular)
- **Bezpečnostní nález:** Drip API klíč (`ecb18c9026fb3967e3e78b3f1f6ae355`) leží natvrdo v plaintextu na 3 místech (`jmena.py` na ploše, `jmena.py` v `3 LCEnglish/Tech/`, starý "Webhook tutorial" Google Doc) — nevyřešeno, Lenka zatím nechtěla řešit hned

### 🟡 Rozpracováno — vizuální varianta

**Text/copy je hotový a dobrý** (podle Lenky), **současný design je moc "AI trendy"** (impeccable-impeccable styl: karty, grid, hodně vzduchu). Aktuální live verze (viz "Hotovo a ověřeno" výše) **může zůstat jako v1, funguje jako odrazový bod** — Lenka to neoznačila jako blokující, jen jako věc k dalšímu zkoušení.

**Vzor pro vizuální směr:** https://pg.emailmarketingheroes.com/bottomless-emails — myšleno **typem vizuálu** (prostý systémový font, hutnější/textovější layout, méně kartiček a gridů, opakované CTA), ne že se má obsah/struktura kopírovat 1:1. Barvy zůstávají (korálová `oklch(58% 0.18 35)`, hořčicová `oklch(78% 0.135 78)`).

- [ ] Vyzkoušet vizuální variantu 2 (hutnější, méně "designed") pro 10x-english #next-action #online
  - Odstartovat z aktuální verze, případně dál zkoušet i **vyprávěcí/narativnější varianty** — Lenka chce více verzí na porovnání, ne jednu finální přestavbu
  - Zachovat: barvy, existující text/copy, FAPI CTA odkaz, Shadowloop vysvětlovací sekci obsahově
  - Publikovat znovu přes Leadpages "Publish to WordPress" (funguje, ne přes REST API)

---

## Technický postup pro příště (funguje, zopakovatelné)

1. Vytvořit/upravit HTML v Leadpages přes MCP nástroj (`create_page`) — content se NESTRIPUJE, plná podpora `<style>`
2. V Leadpages dashboardu (`leadpages.com/dashboard/pages`) najít stránku → "⋮" → **Publish to WordPress**
3. Nastavit čistý slug (ne auto-generovaný kód) — pozor na konflikt, pokud existuje starý WP draft se stejným slugem (smazat ho přes REST API `DELETE /wp-json/wp/v2/pages/{id}?force=true` nebo v adminu)
4. Nikdy needitovat WP stránky s vlastním CSS přes `POST /wp-json/wp/v2/pages` — `wp_kses` to ztiší smaže

---

## Viz také

- [[areas/lcenglish]]
- [[projects/lcenglish-online-kurz]] — HELE funnel, stejný FAPI/Shadowloop/FreshLearn mechanismus
- [[resources/youcloned-ai-clone-setup]] — kontext, jak tenhle projekt vznikl (vaultová kopie, čitelná i beze mě)
