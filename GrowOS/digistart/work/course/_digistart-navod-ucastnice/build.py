# Staví navod.html a navod.pdf z textu mezi značkami NAVOD-START / NAVOD-END v položce fronty.
# %PROMPT% nahradí zadáním z bloku ``` v digistart-uvodni-prompt.md (jedno místo pravdy).
# Spuštění: python build.py   (potřebuje balíčky markdown a playwright, PDF tiskne Edge)
import re, sys, pathlib
import markdown

HERE = pathlib.Path(__file__).resolve().parent
ITEM = HERE.parent / "digistart-navod-ucastnice.md"
PROMPT_ITEM = HERE.parent / "digistart-uvodni-prompt.md"
import html as _html

src = ITEM.read_text(encoding="utf-8")
body = src.split("<!-- NAVOD-START -->", 1)[1].split("<!-- NAVOD-END -->", 1)[0]
body = "\n".join(l for l in body.splitlines() if not l.startswith("> 📷"))
body = re.sub(r"^//obrázek//$", "\n   *(Sem přijde snímek obrazovky z aplikace.)*\n", body, flags=re.M)  # Lenčina značka chybějícího obrázku
body = re.sub(r"^ {3}(?=\S)", "    ", body, flags=re.M)          # odsazení 3 → 4 mezery
fixed = []
for l in body.splitlines():                                         # prázdný řádek před položkou seznamu
    prev = fixed[-1] if fixed else ""
    if re.match(r"\d+\. ", l) and prev.strip():
        fixed.append("")
    elif re.match(r" {4}\* ", l) and prev.strip() and not re.match(r" {4}\* ", prev):
        fixed.append("")
    fixed.append(l)
body = "\n".join(fixed)
body = body.replace("](_digistart-navod-ucastnice/", "](")  # cesty k obrázkům
prompt = PROMPT_ITEM.read_text(encoding="utf-8").split("## Prompt", 1)[1].split("```", 2)[1].strip()
body = body.replace("%PROMPT%", "PROMPTBLOK")
html_body = markdown.markdown(body, extensions=["sane_lists"])
html_body = html_body.replace("<p>PROMPTBLOK</p>",
    '<div class="prompt"><button type="button" class="kopirovat" onclick="kopirovat(this)">Zkopírovat zadání</button>'
    '<pre id="zadani">' + _html.escape(prompt) + '</pre></div>')
html_body = re.sub(r'<ol start="(\d+)">', lambda m: f'<ol start="{m[1]}" style="counter-reset:krok {int(m[1])-1}">', html_body)
html_body = re.sub(r"<p>(<img [^>]*>)</p>", r'<figure>\1</figure>', html_body)
html_body = html_body.replace('<a href="http', '<a target="_blank" rel="noopener" href="http')

PAGE = """<!doctype html>
<html lang="cs">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Než přijdete na první setkání DigiStartu</title>
<meta name="robots" content="noindex">
<meta name="description" content="Návod pro účastnice DigiStartu: Claude Pro, aplikace Claude, pracovní složka DigiStart a první zadání v Claude Code.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@700;800&family=DM+Sans:wght@400;600;700&display=swap" rel="stylesheet">
<style>
:root{--bg:#F1ECE6;--bg2:#E8DFD5;--text:#231A1D;--muted:#5E5155;--accent:#9B224F;--accent-dark:#74183B;--soft:#F3D3E0;--card:#FFFDFB}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--text);font:17px/1.6 "DM Sans",system-ui,sans-serif}
main{max-width:760px;margin:0 auto;padding:40px 16px 64px}
.brand{font:800 14px/1 "Archivo",sans-serif;letter-spacing:.12em;text-transform:uppercase;color:var(--accent);margin-bottom:18px}
h1{font:800 clamp(30px,6vw,44px)/1.1 "Archivo",sans-serif;font-stretch:90%;margin:0 0 14px}
h1+p{font-size:19px;color:var(--muted);margin-top:0}
h2{font:800 26px/1.2 "Archivo",sans-serif;margin:48px 0 14px;padding-top:20px;border-top:2px solid var(--bg2)}
a{color:var(--accent)}a:hover{color:var(--accent-dark)}
strong{font-weight:700}
ol{padding-left:0;list-style:none;counter-reset:krok}
ol>li{counter-increment:krok;position:relative;background:var(--card);border-radius:14px;padding:16px 18px 16px 62px;margin:0 0 14px;box-shadow:0 1px 0 var(--bg2)}
ol>li::before{content:counter(krok);position:absolute;left:16px;top:14px;width:32px;height:32px;border-radius:50%;background:var(--accent);color:#fff;font:700 16px/32px "DM Sans",sans-serif;text-align:center}
ol>li p{margin:.2em 0 .5em}
ul{padding-left:1.2em}
figure{margin:14px 0 6px}
img{display:block;max-width:100%;height:auto;border:1px solid var(--bg2);border-radius:10px;background:#fff}
figure img{max-width:min(100%,380px)}
li figure img{max-width:min(100%,520px)}
em{color:var(--muted);font-size:15px}
code{font:15px/1.4 Consolas,Menlo,monospace;background:var(--bg2);padding:1px 5px;border-radius:4px}
.prompt{background:var(--card);border:2px solid var(--accent);border-radius:14px;padding:14px 16px;margin:6px 0 18px}
.prompt pre{margin:0;white-space:pre-wrap;word-wrap:break-word;font:14px/1.5 Consolas,Menlo,monospace;max-height:420px;overflow:auto}
.kopirovat{font:700 15px "DM Sans",sans-serif;background:var(--accent);color:#fff;border:0;border-radius:999px;padding:9px 18px;margin:0 0 12px;cursor:pointer}
.kopirovat:hover{background:var(--accent-dark)}
@media print{
 body{background:#fff;font-size:12pt}
 main{max-width:none;padding:0}
 ol>li{box-shadow:none;border:1px solid var(--bg2);break-inside:avoid}
 figure{break-inside:avoid}
 li figure img{max-width:min(100%,420px)}
 h2{break-after:avoid}
 a{text-decoration:none}
 .kopirovat{display:none}
 .prompt pre{max-height:none;overflow:visible;font-size:9.5pt}
 .prompt{break-inside:auto}
}
@page{size:A4;margin:16mm 16mm 18mm}
</style>
</head>
<body>
<main>
<div class="brand">DigiStart · příprava na kurz</div>
%BODY%
</main>
<script>
function kopirovat(b){navigator.clipboard.writeText(document.getElementById("zadani").innerText).then(function(){b.textContent="Zkopírováno";setTimeout(function(){b.textContent="Zkopírovat zadání"},2500)})}
</script>
</body>
</html>
"""
out_html = HERE / "navod.html"
out_html.write_text(PAGE.replace("%BODY%", html_body), encoding="utf-8")
print("HTML:", out_html)

if "--no-pdf" not in sys.argv:
    from playwright.sync_api import sync_playwright
    with sync_playwright() as p:
        b = p.chromium.launch(channel="msedge")
        pg = b.new_page()
        pg.goto(out_html.as_uri(), wait_until="networkidle")
        pg.pdf(path=str(HERE / "navod.pdf"), format="A4", print_background=True, prefer_css_page_size=True,
               display_header_footer=True, header_template="<span></span>",
               footer_template='<div style="font:9px DM Sans,sans-serif;color:#5E5155;width:100%;text-align:center">Než přijdete na první setkání DigiStartu · strana <span class="pageNumber"></span> z <span class="totalPages"></span></div>',
               margin={"top": "16mm", "bottom": "18mm", "left": "16mm", "right": "16mm"})
        b.close()
    print("PDF:", HERE / "navod.pdf")
