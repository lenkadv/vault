# Lišta souhlasu s cookies (odloženo do someday 261030)

Návrh z 30. 10. 2026 14:55, Lenka ho nepoužila (pixel běží bez lišty) a přípravu lišty odložila do [[someday-maybe]]. Kód nahradí skript pixelu před `</body>` na B3 (`PAGE='b3'`) a děkovací stránce (`PAGE='dekuji'`). Pixel se spustí až po „Souhlasím“; volba se pamatuje v prohlížeči (obě stránky jsou na lpcontent.net), na děkovací se už neptá. Chybí odkaz na zásady ochrany osobních údajů GNOSTIKY.

Text lišty: „Rády bychom věděly, jestli k nám trefila reklama z Facebooku. K tomu potřebujeme cookies Meta. Zapneme je, jen když souhlasíte.“ [Souhlasím] [Nesouhlasím]

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

Na mobilu lišta dočasně překryje plovoucí tlačítko konzultace dole; po odpovědi zmizí.
