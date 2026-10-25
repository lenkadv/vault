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

## Změna vzhledu a nasazení (od 261025)

Kód je stažený v `C:\Users\Lenka\source\repos\shadowloop` (mimo vault, kvůli knihovnám). Barvy a písma jsou v `src/App.jsx` (motiv), spodní panel přehrávače v `src/Components/Pages/DeckDetail/Controls.jsx`, písma v `public/index.html`. Náhled: v Claude Code spustit `shadowloop` z `.claude/launch.json` (http://localhost:3000).

Postup: úprava → náhled lokálně → commit → push a nasazení spouští Lenka (v PowerShellu s koncovkou `.cmd`, skripty `.ps1` jsou blokované):

```
cd "C:\Users\Lenka\source\repos\shadowloop"; git push origin master
cd "C:\Users\Lenka\source\repos\shadowloop"; npm.cmd run build; firebase.cmd deploy --only hosting
```

Firebase CLI je nainstalované, Lenka přihlášená jako lnk.dvorakova@gmail.com. Návrat k předchozí verzi: Firebase konzole → Hosting → Release history → Rollback.

## Upozornění od Googlu

- 260929 — Firebase Hosting (od 15. 10. 2026 se u **nových** projektů nevytváří hosting automaticky) a Cloud Build (release channels pro build VM, výchozí od 28. 3. 2027, dotčen `shadowloop-firebase`): **nic nedělat.** Shadowloop je existující projekt bez CI/CD a funkce se nasazují ručně; Cloud Build se týká jen dalšího nasazení funkcí a běžné sestavení změnu nepozná.
