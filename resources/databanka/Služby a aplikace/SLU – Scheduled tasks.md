---
databanka: true
zdroj: napojená služba (konektor)
typ: konektor
rok: 2026
pro:
  - vlastní
tema:
  - napojení
pouzij_kdyz: "naplánované úlohy v aplikaci Claude"
stav: neprozkoumáno
nainstalovano: ano
verdikt: ""
spousteni: "stačí říct, co chceš — Claude konektor použije sám"
soubor: ""
---

# Scheduled tasks

**Použij, až:** naplánované úlohy v aplikaci Claude

**Spuštění:** stačí říct, co chceš — Claude konektor použije sám

**Popis od autora:** naplánované úlohy v aplikaci Claude

## Návod AI Signal (Dan Rice, 27. 10. 2026)

Zdroj: [Set up an AI task that runs every morning](https://aisignalcircle.com/scheduled-tasks), podrobně pro Claude [Set up your first scheduled task in Claude](https://myaisignal.substack.com/p/set-up-your-first-scheduled-task) (Lokesh Choudhary, 23. 10. 2026, 13 kroků se snímky). Přečteno 261028 v denním vlákně.

- **Kde:** claude.ai i aplikace v telefonu, v postranním panelu „Scheduled“ → „+“ → *Create with Claude* (Claude se zeptá na 5 otázek a úlohu sestaví) nebo *Set up manually*. Jen na Pro a výš.
- **Nastavení:** model (na drobné hledání stačí Sonnet, šetří limit), oprávnění *Manual* / *Auto* / *Skip all approvals* (nikdy to třetí), opakování (hodinově až měsíčně), přesný čas, v *Advanced settings* konektory (jen ty, které úloha potřebuje; v Auto je Claude použije bez ptaní) a oznámení (push, e-mail, Slack).
- **Pasti:** čas se může uložit v jiném časovém pásmu (u Groku 8:15 jako UTC), po uložení vždy přečíst čas na kartě. Úloha jednou proběhne a pak přestane, nikdo si nevšimne: po prvním plánovaném čase zkontrolovat *History*. Vyčerpaný limit zastaví všechny úlohy. Konektory jsou nejčastější místo selhání: nejdřív úloha jen nad webem, aplikace přidat po týdnu. V odpovědi vždy proklepnout jeden odkaz.
- **Počítač:** podle článku od 6. 10. 2026 běží nové úlohy na Pro a Max v cloudu Anthropic, počítač může být vypnutý. Úloha, která čte soubory v počítači (u nás vault), počítač zapnutý potřebuje.
- **Pravidlo autora:** jedna nudná práce na úlohu. Po 7 dnech: ušetřila čas? Nechat, jinak smazat.
- **Pro DigiStart:** hotová lekce „vlastní ranní asistent“: otázkový prompt, 7denní test, kontrola historie a odkazů.

Poznámky z použití:

- 261028: první zkušební úloha **Kontrola A4E** (claude.ai, každé úterý 16:01 (celou hodinu aplikace nevzala), Drip, Substack a od 261028 i Facebook přes Metricool, nic nemění; Lenka založila 261029 kolem půlnoci, zkušební běh se zelenou fajfkou). Kontrola běhu 3. 11., rozhodnutí 11. 11. ([[waiting-for]]).
