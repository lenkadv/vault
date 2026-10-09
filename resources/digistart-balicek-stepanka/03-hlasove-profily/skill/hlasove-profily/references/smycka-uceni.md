# Smyčka učení: z oprav se profil zlepšuje

Platí pro **všechny profily**, trvale. Princip: AI navrhne text → ona ho přepíše → rozdíl se uloží jako poučení → příště AI píše lépe.

## Kdy se spouští

Kdykoli:
- ona **upraví přímo v souboru** nebo ve zprávě text, který AI napsala,
- **vloží svou verzi** („já bych to napsala takhle“),
- řekne „takhle ne“, „spíš takhle“, „tohle je moc formální / moc kamarádské“,
- po odeslání mailu **přinese skutečně odeslanou verzi** (např. z odeslané pošty) a AI ji porovná s konceptem.

## Postup (4 kroky)

1. **Porovnat** obě verze po větách. Najít, co se změnilo.
2. **Pojmenovat** každý rozdíl jednou větou ve tvaru: **co jsem napsala → co změnila → pravidlo (proč)**.
3. **Zapsat** do sekce „Poučení z přepisů“ příslušného `profil.md` v tomhle formátu a jednou větou jí říct, kam to šlo:

```markdown
### <datum> | <krátký název>
- **Napsala jsem:** „…“
- **Změnila na:** „…“
- **Pravidlo:** <co to říká o stylu, s důvodem>
- **Stav:** nové / opakuje se (podruhé) / povýšeno do těla profilu
```

4. **Povýšit** opakující se poučení. Podruhé a víckrát stejné pravidlo → přenést do těla profilu (vlastnosti, jsem/nejsem, kontrolní seznam, slovník) a označit „povýšeno“.

## Co NEzapisovat

- opravu překlepu, faktu, jména, data nebo částky (není to o hlasu),
- změnu, kterou vynutila situace (např. zkrátila text, protože adresát spěchal),
- jednorázový výběr slov bez opakování, pokud nejde o výrazný rys (u prvního výskytu zapiš s označením „nové, ověřit při dalším“).

## Rozpory

Když nové poučení protiřečí staršímu, **neprohlašuj žádné za platné**. Ukaž obě, zeptej se, které platí pro jakou situaci, a vyhodnoť, zda nejde o důvod k rozdělení profilu (např. „jiné chování k nové klientce a ke stálé“).

## Revize profilu

Po 15 až 20 poučeních nebo po měsíci:
1. sloučit podobná poučení,
2. vyřadit zastaralá (např. uplynula situace, na kterou se vztahovala),
3. povýšit opakovaná,
4. přepsat „jednou větou“, pokud se hlas posunul,
5. zapsat datum revize a nové číslo verze (v2, v3…) do hlavičky profilu a do `00-prehled-profilu.md`.

## Platí pro všechny typy textů a všechny nástroje

Smyčka platí i mimo konverzaci, ve které se profil tvořil: kdykoli jakákoli AI (ve skillu na e-maily, ve skillu `psani-textu`, v jiném chatu) píše podle profilu a ona ji opraví, rozdíl se zapíše do téhož `profil.md`. Proto je profil **soubor**, ne nastavení jedné konverzace.
