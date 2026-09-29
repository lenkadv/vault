# Průvodce Databankou

Databanka je **jedno místo, kde je evidované všechno, co máme k dispozici pro práci s AI**, a co si o tom myslíme. Patří sem nainstalované skilly, napojené služby a aplikace i stažené materiály z kurzů (tutoriály, prompty, pluginy). Stav k 260929: 285 položek.

## Jak ji otevřít

V Obsidianu: `resources/databanka/Databanka.base`. Otevře se tabulka a nahoře vlevo se přepínají **pohledy**.

| Pohled | Na co se hodí |
|---|---|
| **Nainstalované nástroje** | všechno, co mám nainstalované, seskupené podle zdroje (GrowOS, Jon Benson, Impeccable…) |
| **Používám** | co reálně používám |
| **Skryté a vyřazené** | co jsem vypnula nebo zahodila, a proč |
| **Neprozkoumáno** | co jsem ještě nezkoušela (odtud nabízí Claude ve weekly review) |
| **DigiStart / Evident / lcenglish / tadylenka / Konzultace / Pro mě** | výběr podle toho, pro koho se to hodí |
| **Vše podle tématu** | všechno najednou |

Kliknutím na název otevřeš poznámku. U skillu je v ní odkaz **Otevřít SKILL.md**, který ukáže, jak skill vypadá uvnitř. Otevře se v textovém editoru, ne v Obsidianu, protože složky `.claude` Obsidian nezobrazuje.

## Co znamenají sloupce

| Sloupec | Co v něm je | Kdo ho píše |
|---|---|---|
| **zdroj** | odkud nástroj je (GrowOS 2.0, Jon Benson, AI Black Magic, Anthropic, Vlastní…) | Claude při založení |
| **typ** | nainstalovaný skill · konektor · aplikace · tutoriál · prompty · plugin · skill (stažený) | Claude |
| **pouzij_kdyz** | jedna věta: kdy po tom sáhnout | Claude, ty můžeš přepsat |
| **stav** | `neprozkoumáno` → `prohlédnuto` (podívala jsem se) → `použito` (reálně jsem s tím pracovala) | Claude podle toho, co děláme |
| **verdikt** | prázdné = nerozhodnuto · `ponechat` · `skrýt` (zůstane, ale Claude ho nenabízí) · `vyřadit` (k ničemu) | **ty**, Claude navrhne |
| **pro** | pro koho se to hodí: DigiStart, Evident, lcenglish, tadylenka, konzultace, vlastní | Claude navrhne, ty upravíš |
| **nainstalovano** | `ano` = mám to v počítači · `ne` = jen stažený materiál | Claude |
| **spousteni** | jak to spustit (`/jméno`, nebo „stačí říct“) | Claude |

Uvnitř poznámky dole je oddíl **Poznámky z použití**. Tam patří jedna dvě věty, co si o nástroji myslíme po vyzkoušení. Pro DigiStart je to nejcennější část.

## Kde je co jiného (a proč)

| Místo | K čemu | Hodnocení? |
|---|---|---|
| **Databanka** (tady) | evidence + hodnocení všeho | **ano, jen tady** |
| [[katalog-moznosti]] | čtivé „menu“: co jde s nástroji udělat, seřazené podle výsledku | ne, odkazuje sem |
| [[katalog-ochutnavky]] | plán, v jakém pořadí nástroje zkoušet | ne, výsledek ochutnávky se píše sem |
| Notion **Skills** | pohodlné čtení plného textu skillů | ne. Synchronizace zatím běží, zmrazí se, až se tu zorientuješ |
| `G:\Můj disk\Databanka AI\` | stažené soubory materiálů (mimo vault) | ne |

## Jak to běží samo

- **Začátek většího úkolu:** Claude se podívá do Databanky a jednou větou řekne, jestli k tomu něco máme.
- **„Zavírám“:** co jsme v sezení použili, se posune na `použito` a do daily přijde sekce Z databanky.
- **Weekly review (bod 9b):** Claude nabídne jednu položku z pohledu Neprozkoumáno na vyzkoušení. Po vyzkoušení se doplní stav, verdikt a poznámka.
- **Verdikt `skrýt` / `vyřadit`:** Claude skill schová v osobním nastavení Claude Code, aby nezabíral místo v seznamu skillů. Nic se nemaže, lomítkem jde skill spustit dál.
