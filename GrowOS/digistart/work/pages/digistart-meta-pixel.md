---
type: page-code
headline: Meta pixel na B3 a děkovací stránku (bez lišty cookies)
status: approved
business: digistart
channel: pages
created: 2026-10-30
id: nsv1og2tq0
skill: ""
note: ""
kanban_order: VC
---

# DigiStart: Meta pixel na stránky v Leadpages

**Pixel:** „DigiStart dataset“, ID **1089566730377496**, portfolio DigiStart za GNOSTIKU (28970423829284366), založen 30. 10. 2026 14:32. Ověřeno konektorem Meta 14:38: ve správném portfoliu, aktivní, zatím bez událostí. **Ještě není propojený s reklamním účtem GNOSTIKA DigiStart** (to udělá Lenka v nastavení portfolia).

**Kam:** prodejní stránka B3 https://lenka-dvorakova.lpcontent.net/iYfYzG6Yg_ a děkovací stránka https://lenka-dvorakova.lpcontent.net/DEsHgCcug9 . Vkládá Claude přes konektor Leadpages až po schválení. Texty stránek se nemění, přibude jen skript na konec stránky.

## Co pixel měří

| Stránka | Kdy | Událost Meta |
|---|---|---|
| B3 | otevření stránky | PageView + ViewContent |
| B3 | klik na „konzultace“ (6 odkazů na TidyCal) | Lead |
| B3 | klik na „rovnou se přihlaste“ (2 odkazy na SimpleShop) | InitiateCheckout |
| Děkovací | otevření po zaplacení | PageView + Purchase 14 970 CZK (od 30. 10.; jednou, obnovení stránky se nepočítá znovu) |

Pozor: Lead je **klik** na tlačítko konzultace, ne skutečná rezervace v TidyCalu. Rezervaci pixel nevidí (TidyCal je cizí web).

## Souhlas s cookies: rozhodnutí Lenky

První verze (30. 10. 14:55) měla lištu souhlasu: pixel by běžel až po „Souhlasím“ (Claudův výklad zákona o elektronických komunikacích, opt-in od 2022, neověřený právníkem). **Lenka 30. 10. 14:57: bez lišty cookies.** Pixel tedy běží hned při otevření stránky. Zapsáno v `brain/decisions.md`.

## Kód (vloží se těsně před `</body>` na obou stránkách)

Liší se jen řádek `var PAGE=`: na B3 `'b3'`, na děkovací `'dekuji'`.

```html
<script>
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
(function(){
var PAGE='b3';
fbq('init','1089566730377496');fbq('track','PageView');
if(PAGE==='b3'){
 fbq('track','ViewContent',{content_name:'DigiStart',value:14970,currency:'CZK'});
 document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href]');if(!a)return;
  if(a.href.indexOf('tidycal.com')>-1)fbq('track','Lead',{content_name:'Konzultace DigiStart'});
  else if(a.href.indexOf('simpleshop.cz')>-1)fbq('track','InitiateCheckout',{content_name:'DigiStart',value:14970,currency:'CZK'});
 },true);
}
if(PAGE==='dekuji'){
 var done=false;try{done=sessionStorage.getItem('ds-buy')==='1';}catch(x){}
 if(!done){fbq('track','Purchase',{content_name:'DigiStart',value:14970,currency:'CZK'});try{sessionStorage.setItem('ds-buy','1');}catch(x){}}
}
})();
</script>
<noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1089566730377496&ev=PageView&noscript=1"/></noscript>
```

## Po schválení

1. Vložit kód přes konektor Leadpages (`edit_page`), B3 i děkovací, a znovu publikovat.
2. Otevřít obě stránky a ověřit v datech pixelu (konektor `ads_get_dataset_stats`), že přišly PageView a ViewContent. Purchase ověří až testovací objednávka.
3. ID pixelu do `GrowOS/digistart/setup.md` (hotovo 30. 10.).
