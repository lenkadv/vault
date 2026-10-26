---
type: email
headline: "Okamžitý mail po přihlášení k newsletteru: poslední díl Art for English"
skill: email-write
subject: "Váš první Art for English"
status: published
business: lcenglish
channel: email
created: 2026-10-26
note: ""
---

<!-- Schválila Lenka v chatu 261026 16:38 („Texty stránky i mailu schvaluju, stav to.“). Položka bez razítka (hlídač GrowOS v sezení z vaultu neběží), stav zapsán ručně. Vydáno 261026 ~16:50: stránka lcenglish.cz/newsletter/ (WP 7546), mail ve workflow Dripu `signup: newsletter A4E` (643734995). -->

# Okamžitý mail po přihlášení

Subject: Váš první Art for English
Preheader: Nemusíte čekat do úterý.

Dobrý den{% if subscriber.osloveni == nil %},{% else %}, {{ subscriber.osloveni }},{% endif %}

děkuju, že jste se {% if subscriber.tags contains "M" %}přihlásil{% elsif subscriber.tags contains "F" %}přihlásila{% else %}přihlásili{% endif %} k Art for English!

Do úterý čekat nemusíte - poslední díl je tady: https://artforenglish.substack.com/archive (je úplně nahoře).

Další díl vám přijde v úterý ráno. A ještě dnes se vám ozvu s pár slovy o tom, proč angličtinu učím právě takhle.

Zdraví L.
