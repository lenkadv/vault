# Claude Desktop — postup při pádu appky

Použij, až appka zase spadne nebo zamrzne (např. při WebFetch na nějaké stránce).

## Co se stalo 260801

- Appka dvakrát spadla po WebFetch na arthive.com, což si vynutilo reinstalaci.
- Instalátor (`ClaudeSetup.log`) při každé reinstalaci ukazuje konflikt se službou `CoworkVMService` — appka ji nedokáže čistě odebrat (`Access is denied`), takže Windows odmítne zachovat data appky a **při každé reinstalaci se smaže historie konverzací**.
- Nešlo to spojit s arthive.com jistě — crash log appky totiž **taky zmizí při reinstalaci**, takže zpětně není co zkoumat.

## Než příště reinstaluješ — nejdřív zachraň logy

1. Appku ještě nezavírej/nereinstaluj, pokud jde alespoň spustit Průzkumník souborů.
2. Zkopíruj tuhle složku někam bokem (např. na plochu):
   ```
   C:\Users\Lenka\AppData\Local\Packages\Claude_pzs8sxrjxfjjc\LocalCache\Roaming\Claude\logs\
   ```
3. Teprve pak appku zavři a reinstaluj.
4. V další konverzaci s Claude Code dej vědět, že máš zálohované logy ze staré instalace, a ukaž tu složku — půjde z ní zjistit, co appku skutečně shodilo.

## Při reinstalaci

- V chybovém dialogu instalátoru zvol **"install without Cowork"**, pokud se nabídne — Cowork na tomhle Windows 10 stejně nefunguje (viz [[project_cowork_windows]]) a jeho služba (`CoworkVMService`) je to, co blokuje čistou reinstalaci a maže data.
- Instalátor sám loguje do `C:\Users\Lenka\AppData\Local\Temp\ClaudeSetup.log` — přepisuje se při každém pokusu, takže pokud chceš porovnat víc pokusů, zkopíruj si ho taky bokem před dalším pokusem.

## Kam appka ukládá data (pro orientaci)

- Balíček appky: `C:\Users\Lenka\AppData\Local\Packages\Claude_pzs8sxrjxfjjc\`
- Logy appky: `...\LocalCache\Roaming\Claude\logs\main.log` (hlavní proces), `cowork_vm_node.log`, `claude.ai-web.log`
- `%APPDATA%\AnthropicClaude\logs` **neexistuje** — appka je MSIX balíček, tahle cesta je z jiného typu instalace a nepoužívá se.
