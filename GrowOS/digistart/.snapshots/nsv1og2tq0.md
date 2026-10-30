---
type: page-code
headline: "Meta pixel na B3 a děkovací stránku (se souhlasem s cookies)"
status: review
business: digistart
channel: pages
created: 2026-10-30
id: nsv1og2tq0
skill: ""
note: ""
---

# DigiStart: Meta pixel na stránky v Leadpages

**Pixel:** „DigiStart dataset“, ID **1089566730377496**, portfolio DigiStart za GNOSTIKU (28970423829284366), založen 30. 10. 2026 14:32. Ověřeno konektorem Meta 14:38: ve správném portfoliu, aktivní, zatím bez událostí. **Ještě není propojený s reklamním účtem GNOSTIKA DigiStart** (to udělá Lenka v nastavení portfolia).

**Kam:** prodejní stránka B3 https://lenka-dvorakova.lpcontent.net/iYfYzG6Yg_ a děkovací stránka https://lenka-dvorakova.lpcontent.net/DEsHgCcug9 . Vkládá Claude přes konektor Leadpages až po schválení. Texty stránek se nemění, přibude jen lišta souhlasu dole a skript na konec stránky.

## Co pixel měří

| Stránka | Kdy | Událost Meta |
|---|---|---|
| B3 | otevření stránky | PageView + ViewContent |
| B3 | klik na „konzultace“ (6 odkazů na TidyCal) | Lead |
| B3 | klik na „rovnou se přihlaste“ (2 odkazy na SimpleShop) | InitiateCheckout |
| Děkovací | otevření po zaplacení | PageView + Purchase 15 000 CZK (jednou, obnovení stránky se nepočítá znovu) |

Pozor: Lead je **klik** na tlačítko konzultace, ne skutečná rezervace v TidyCalu. Rezervaci pixel nevidí (TidyCal je cizí web).

## ⚠️ Souhlas s cookies

Pixel Meta je marketingová cookie. Podle mého chápání zákona o elektronických komunikacích (od 1. 1. 2022 opt-in) smí běžet až po souhlasu návštěvnice. Neověřovala jsem to s právníkem, je to můj výklad. Proto návrh: pixel se nespustí, dokud návštěvnice neklikne „Souhlasím“. Volba se pamatuje v prohlížeči, takže na děkovací stránce se už neptá (obě stránky jsou na stejné adrese lpcontent.net). Kdo nesouhlasí, toho pixel neuvidí. Meta tím uvidí méně dat, ale je to čisté.

**Text lišty (návrh):**

> Rády bychom věděly, jestli k nám trefila reklama z Facebooku. K tomu potřebujeme cookies Meta. Zapneme je, jen když souhlasíte.
> [Souhlasím] [Nesouhlasím]

Otevřené: odkaz na zásady ochrany osobních údajů GNOSTIKY do lišty. Nevím, jestli je GNOSTIKA má na webu jako samostatnou stránku; zatím bez odkazu.

## Kód (vloží se těsně před `</body>` na obou stránkách)

Liší se jen řádek `var PAGE=`: na B3 `'b3'`, na děkovací `'dekuji'`.

```html
<div id="ds-cc" hidden style="position:fixed;left:0;right:0;bottom:0;z-index:50;background:#231A1D;color:#F6EFE9;font:16px/1.45 'DM Sans',system-ui,sans-serif;padding:14px 20px">
 <div style="max-width:1080px;margin:0 auto;display:flex;flex-wrap:wrap;gap:10px 18px;align-items:center;justify-content:space-between">
  <p style="margin:0;max-width:640px">Rády bychom věděly, jestli k nám trefila reklama z Facebooku. K tomu potřebujeme cookies Meta. Zapneme je, jen když souhlasíte.</p>
  <span style="display:flex;gap:10px">
   <button data-c="1" style="background:#9B224F;color:#fff;border:2px solid #9B224F;border-radius:4px;padding:10px 18px;font:700 15px/1 'DM Sans',sans-serif;cursor:pointer">Souhlasím</button>
   <button data-c="0" style="background:transparent;color:#F6EFE9;border:2px solid rgba(255,255,255,.6);border-radius:4px;padding:10px 18px;font:700 15px/1 'DM Sans',sans-serif;cursor:pointer">Nesouhlasím</button>
  </span>
 </div>
</div>
<script>
(function(){
var ID='1089566730377496',KEY='ds-cc',PAGE='b3';
function load(){
 !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
 fbq('init',ID);fbq('track','PageView');
 if(PAGE==='b3'){
  fbq('track','ViewContent',{content_name:'DigiStart',value:15000,currency:'CZK'});
  document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href]');if(!a)return;
   if(a.href.indexOf('tidycal.com')>-1)fbq('track','Lead',{content_name:'Konzultace DigiStart'});
   else if(a.href.indexOf('simpleshop.cz')>-1)fbq('track','InitiateCheckout',{content_name:'DigiStart',value:15000,currency:'CZK'});
  },true);
 }
 if(PAGE==='dekuji'){
  var done=false;try{done=sessionStorage.getItem('ds-buy')==='1';}catch(x){}
  if(!done){fbq('track','Purchase',{content_name:'DigiStart',value:15000,currency:'CZK'});try{sessionStorage.setItem('ds-buy','1');}catch(x){}}
 }
}
var c=null;try{c=localStorage.getItem(KEY);}catch(x){}
if(c==='1'){load();return;}
if(c==='0')return;
var bar=document.getElementById('ds-cc');bar.hidden=false;
bar.addEventListener('click',function(e){var b=e.target.closest('button[data-c]');if(!b)return;
 var v=b.getAttribute('data-c');try{localStorage.setItem(KEY,v);}catch(x){}
 bar.hidden=true;if(v==='1')load();});
})();
</script>
```

Na mobilu lišta souhlasu dočasně překryje plovoucí tlačítko konzultace dole; po odpovědi zmizí.

## Po schválení

1. Vložit kód přes konektor Leadpages (`edit_page`), B3 i děkovací, a znovu publikovat.
2. Otevřít obě stránky, kliknout Souhlasím a ověřit v datech pixelu (konektor `ads_get_dataset_stats`), že přišly PageView a ViewContent. Purchase ověří až testovací objednávka.
3. ID pixelu do `GrowOS/digistart/setup.md`.
