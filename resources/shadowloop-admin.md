# Shadowloop — admin postupy

## Přidat uživatele a přiřadit balíček

Otevři tuto URL v prohlížeči (doplň email a název produktu):

```
https://europe-central2-shadowloop-firebase.cloudfunctions.net/sale?email=EMAIL&produkt=PRODUKT
```

**Příklad:**
```
https://europe-central2-shadowloop-firebase.cloudfunctions.net/sale?email=jkokes@centrum.cz&produkt=HELE
```

**Dostupné produkty** (podle `products/` kolekce ve Firestore):
- `HELE`
- `HELE EW`
- `HELE downsell`
- `10x ENGLISHonly`
- `Irregular`
- `Miroslav Urban`
- `Shadowloop 10xE texty`

**Co se stane:**
- Pokud uživatel ještě nemá účet → zapíše se do `preregistered/{email}` s příslušnými decky. Až se přihlásí na shadowloop.lcenglish.cz, balíček se mu automaticky přiřadí.
- Pokud účet již má → decky se přidají přímo do jeho `users/{uid}` dokumentu.

**Firebase konzole:** https://console.firebase.google.com/u/0/project/shadowloop-firebase/firestore
**Repo:** https://github.com/kokolem/shadowloop (privátní, logika v `functions/index.js`)
