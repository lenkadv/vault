# Vyrobí wordpress-blok.html z index.html: obsah <body> + CSS omezené na obalový prvek .gn-audit,
# aby se styly nehádaly s šablonou WordPressu. Spuštění: python tvorba-bloku.py  (ve složce 01-web-audity)
import re, sys, pathlib
src = pathlib.Path("index.html").read_text(encoding="utf-8")
css = re.search(r"<style>(.*?)</style>", src, re.S).group(1)
body = re.search(r"<body>(.*?)</body>", src, re.S).group(1)
css = re.sub(r"/\*.*?\*/", "", css, flags=re.S)           # komentáře pryč
P = ".gn-audit"
def scope(sel):
    sel = sel.strip()
    if sel == ":root": return P
    if sel in ("html", "body"): return P
    if sel == "*": return P + " *"
    return P + " " + sel
def block(m):
    sel, rules = m.group(1), m.group(2)
    if sel.startswith("@"): return m.group(0)
    parts = [scope(s) for s in sel.split(",")]
    return ",".join(parts) + "{" + rules + "}"
def process(css):
    out, i = [], 0
    # rozděl na @media bloky a běžná pravidla
    pat = re.compile(r"@media[^{]+\{((?:[^{}]*\{[^{}]*\})*)\}|([^{}]+)\{([^{}]*)\}", re.S)
    res = []
    for m in pat.finditer(css):
        if m.group(0).startswith("@media"):
            head = m.group(0)[:m.group(0).index("{")+1]
            inner = re.sub(r"([^{}]+)\{([^{}]*)\}", block, m.group(1))
            res.append(head + inner + "}")
        else:
            res.append(block(re.match(r"([^{}]+)\{([^{}]*)\}", m.group(0), re.S)))
    return "\n".join(res)
scoped = process(css)
scoped = scoped.replace(P + ".gn-audit", P).replace(P + "{margin:0;", P + "{")
# :root proměnné a základ těla se přenesou na obal
head = ("<!-- GNOSTIKA audit – blok pro WordPress (Vlastní HTML). Písma: nahrajte složku fonts/ a fonty.css, upravte adresu v href níže. -->\n"
        "<link rel=\"stylesheet\" href=\"/audity/fonty.css\">\n")
wrapper_base = P + "{background:var(--bg);color:var(--ink);font:18px/1.6 var(--t);-webkit-font-smoothing:antialiased;position:relative;display:block;clear:both}\n"
# obranný reset: přebije styly šablony WordPressu na běžných prvcích (třídy níže mají vyšší specificitu a vyhrají)
tags = ["h1","h2","h3","h4","p","ul","ol","li","a","small","b","section","header","footer","main"]
reset = ",".join(P + " " + t for t in tags) + "{color:inherit;text-transform:none;font-style:normal;text-shadow:none;float:none;border:0;background:none;box-shadow:none;text-decoration:none;text-indent:0;columns:auto;list-style:none;margin:0;padding:0;max-width:none;font-family:inherit;font-weight:inherit;line-height:inherit;letter-spacing:normal}\n"
html = head + "<style>\n" + wrapper_base + reset + scoped +"\n</style>\n<div class=\"gn-audit\">" + body + "</div>\n"
pathlib.Path("wordpress-blok.html").write_text(html, encoding="utf-8")
print("hotovo", len(html), "znaků")
