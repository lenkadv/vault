# Rendering templates to PNG

Every template in `templates/` is a plain HTML file. No AI, no account, no server, nothing to
install beyond a browser you almost certainly already have. Headless Chrome opens the file,
screenshots it at the exact pixel size baked into the filename, and writes a PNG. This page covers
the render command and how the shared `tokens.css` file controls every template's look at once.

## The render command

Chrome's filename tells you the size: `name.WIDTHxHEIGHT.html`. Point headless Chrome at the file
with a matching window size and a screenshot flag, and it writes a PNG of exactly that size.

```
chrome --headless=new --disable-gpu --hide-scrollbars --allow-file-access-from-files \
  --force-device-scale-factor=2 --window-size=WIDTH,HEIGHT --default-background-color=ffffffff \
  --screenshot=/absolute/path/to/_<ad-code>/<ad-code>.png file:///absolute/path/to/templates/name.WIDTHxHEIGHT.html
```

Set `WIDTH` and `HEIGHT` to match the numbers in the filename exactly (`testimonial-dark.1080x1350.html`
renders at `--window-size=1080,1350`). `--force-device-scale-factor=2` doubles the output resolution
for a crisp, retina-quality PNG (a 1080x1350 template becomes a 2160x2700 image); drop it to `1` for
a faster, smaller preview render. The `file://` URL needs an absolute path, not a relative one: the
template it names is read straight from this library's `templates/` folder. The `--screenshot=` path
is not a library path and output never lands here; it writes straight into the ad's own `_<ad-code>/`
parts folder, the same destination the rebrand and photo-placeholder sections below describe.

### One-liner, all templates

This loop is library maintenance, not ad production: it refreshes a preview of the whole catalog for
whoever maintains `templates/`, and is never a step in making an ad. To render every template in the
folder in one pass, loop over the HTML files and derive the size from each filename:

```bash
cd templates
for f in *.html; do
  [ "$f" = "tokens.css" ] && continue
  size=$(echo "$f" | grep -oE '[0-9]+x[0-9]+' | tail -1)
  w="${size%x*}"; h="${size#*x}"
  chrome --headless=new --disable-gpu --hide-scrollbars --allow-file-access-from-files \
    --force-device-scale-factor=2 --window-size="$w,$h" --default-background-color=ffffffff \
    --screenshot="../examples/${f%.html}.png" "file://$(pwd)/$f"
done
```

Run it from inside `templates/`, and it writes one PNG per template into a sibling `examples/`
folder (create that folder first, or point the `--screenshot` path wherever you keep renders).

## Chrome binary paths

The `chrome` command above assumes Chrome is on your `PATH`. It usually isn't by default. Use the
full path for your platform instead:

**Mac**
```
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome
```

**Windows** (PowerShell or cmd, either usually exists)
```
"C:\Program Files\Google\Chrome\Application\chrome.exe"
"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
```

**Linux**
```
google-chrome
```
or, if that's not found, try `chromium` or `chromium-browser`.

If none of these paths exist, install Google Chrome first (any recent version works; the templates
use only standard CSS and inline SVG, nothing exotic).

## How the rebrand works

Every template links one shared stylesheet:

```html
<link rel="stylesheet" href="tokens.css">
```

`tokens.css` defines a small set of CSS variables: `--accent`, `--accent-soft`, `--ink-deep`,
`--ink-deep-2`, `--paper`, `--paper-2`, `--ink`, `--muted`, `--serif`, `--sans`. Every template's own
styling references these variables instead of hardcoding colors or fonts, so one set of values
controls every template's look at once, across all 29 templates.

This library is stock and stays stock: a guard refuses any AI edit inside it, and the next update
replaces it wholesale regardless, so nothing hand-edited here ever survives.

Your own brand lives one level up, in your workspace's brand kit: `brain/ads/brand-kit/` (standalone:
`ads-brain/brand-kit/`). The setup walkthrough's rebrand conversation creates it once, from the facts
already on file in `brain/brand.md`, and it holds its own `tokens.css` override plus your logo and
avatar. At render time, the kit's tokens and images overlay the stock template you picked, and the
finished PNG lands in that ad's own `_<ad-code>/` parts folder for sealing, never as a bare file
beside the round and never back in this library. No kit yet is a normal state: the render falls back
to the neutral values above and says so plainly, rather than guessing at a brand.

A handful of templates keep a few colors hardcoded on purpose: native-app chrome that needs to look
authentic (iOS blue message bubbles, Reddit's upvote orange, LinkedIn's reaction colors) stays as
the real platform color rather than your brand color, because the whole point of a native-surface
mockup is that it reads as the real app. Everything that represents *your* brand, not the platform's,
still runs through `tokens.css`, by way of the kit.

## Photo placeholders

Every template that needs a photo (a testimonial avatar, a founder headshot, a contact photo) points
at `templates/assets/placeholder-avatar.svg` by default, so every template renders complete with zero
setup. That placeholder stays a placeholder here: the library is never edited to put a real photo in
its place, the same way it is never edited to hold a real brand color.

Your own founder photo, product photo, and logo live in your workspace's brand kit:
`brain/ads/brand-kit/` (standalone: `ads-brain/brand-kit/`). The kit's own `avatar.png` and `logo.svg`
already cover the standing images most templates ask for, and any other founder or product photo an
ad needs belongs there too. At render time, the kit's images overlay the placeholder on the template
you picked, the same way its `tokens.css` override replaces the stock colors, and the result lands in
that ad's own `_<ad-code>/` parts folder, not back in this library.

A square, evenly lit headshot works best for the circular crops used across `testimonial-*`,
`linkedin-founder`, and `community-comment`. See `templates/CATALOG.md` for which templates need a
photo.

## Troubleshooting

- **Blank or white screenshot:** almost always a bad path. Confirm the `file://` URL is absolute and
  that `tokens.css` sits in the same folder as the HTML file (templates load it with a relative
  path).
- **Font looks different than expected:** the `--serif` and `--sans` stacks fall back through system
  fonts, so the exact look varies a little by OS. That's expected and fine; nothing needs installing
  for a template to render.
- **Chrome exits instantly with no PNG:** check the Chrome path is correct for your platform, and
  that the output folder in `--screenshot=` already exists (Chrome won't create missing directories).
