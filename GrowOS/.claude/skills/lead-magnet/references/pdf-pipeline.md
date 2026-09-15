# The PDF pipeline

The pipeline: build one branded HTML file, then point headless Chrome at it
with `--print-to-pdf`. No account, no library, no install beyond a browser
the owner or the machine running this skill almost certainly already has.
When Chrome is not available, or a render fails verification, the fallback
is the SAME HTML file, handed over as-is, with one plain line telling the
owner to open it in a browser and print to PDF. Nothing about the design is
lost either way - only the file format changes.

This technique was verified in-session on Chrome 151 (macOS): a 3-page
branded checklist (gradient cover with a wordmark, a brand-colored content
page with a footer, a dark CTA back page) rendered pixel-faithful on the
first try, with exact page control and zero spillover. The command and CSS
below are that verified technique, not a theoretical one.

## 1. Build the HTML

One file, `_<slug>/source.html`, self-contained - no external stylesheets,
no network fonts, no relative paths that could break if the file moves.
Everything it needs is inlined or referenced by absolute path.

### Brand tokens, from `brain/brand.md`

Pull the business's actual colors and font description and turn them into a
small set of CSS custom properties at the top of the file, the same pattern
`system/creative-library/ads/RENDER.md` uses for the ad-template library:

```css
:root {
  --accent: #FF5A1F;       /* brain/brand.md's primary color */
  --accent-2: #E11D2A;     /* a second brand color, or a darker tint of --accent */
  --ink: #1A1A1A;          /* dark, near-black - brand.md's dark shade or a neutral charcoal */
  --paper: #FFFFFF;        /* the background tone brand.md describes */
  --muted: #888888;        /* a quiet tone for footers and fine print */
  --heading-font: -apple-system, "Segoe UI", Arial, sans-serif;
  --body-font: -apple-system, "Segoe UI", Helvetica, Arial, sans-serif;
}
```

**Colors.** Use brain/brand.md's exact hex codes when it has them. If it
only has plain names ("warm orange and deep teal"), pick the closest honest
reading. If Colors is still `[PLACEHOLDER: ...]`, do not invent a brand
color - render in a plain, neutral, unbranded look instead (true black on
white, one quiet gray) and say plainly in the handoff that this shipped
without real brand colors.

**Fonts.** `brain/brand.md`'s Fonts section usually names a feel or a
commercial font the render cannot download over the network ("Anton, or a
chunky grotesk like Druk"). Map that feel to the closest system font stack
- weight, letter-spacing, and size do most of the work a specific typeface
would have done. Only reach for `@font-face` with a real embedded font file
(base64 data URI, or an absolute `file://` path to a file actually sitting
in `brain/assets/`) when the business has that file and `assets/index.md`
names it. Never link a font over the network - the render has to work
without depending on a connection being up during the virtual-time budget
below.

**Logo.** Check `brain/assets/index.md` for a logo or brand-mark line. Found
one, and the file exists: inline it as a base64 data URI - never an absolute
`file://` path. The sealed `source.html` has to carry its own bytes; a
`file://` reference points outside the file, so the image behind it could
change, move, or vanish after the owner approves it, and nobody would know -
the seal only ever re-checks `source.html` itself.
`brand.md` mentions a logo but `assets/index.md` has no line for it, or the
file is not actually there: treat it as no usable logo per
`brain/assets/README.md` ("a file with no line is a file the system will
never reach for") - do not go hunting for a plausible filename. The same
applies when `brand.md` points somewhere OUTSIDE `brain/assets/` for the
logo - a website header, a printer, a drive link: do not fetch or chase
it at render time (a render depends on nothing beyond this folder). Use
the wordmark, and tell the owner in one line that dropping the logo file
into `brain/assets/` (with its `index.md` line) puts it on the next
render. No logo at all: build a clean typographic wordmark from the
business's name - real design attention (the heading font, brand color,
generous size and spacing), never a fabricated logo mark or icon.

### Escaping

Every piece of gated content, title, or CTA copy that lands in
`source.html` came from the brain or the item, not written fresh for this
page. "Verbatim" means the WORDING must not change - it does not mean the
raw characters are safe to drop straight into HTML. Before typesetting any
of it, HTML-escape it: `&` -> `&amp;`, `<` -> `&lt;`, `>` -> `&gt;`, `"` ->
`&quot;`. A testimonial or a piece of proof that happens to contain
something that looks like a tag must never become a real tag on the page.

### The design bar

Every render carries all four of these. A PDF missing any one of them has
not cleared Phase 6's verification, whatever the file size says.

- **Cover page** - full-bleed brand color or gradient, the logo or wordmark,
  the chosen title in the heading font, real whitespace. This is the first
  impression; it has to look like a designed product, not a Word document
  with a colored top border.
- **Styled content pages** - the brand accent color on headings, dividers,
  or callout boxes, not just black-on-white body text. Follows the chosen
  format's structure from `references/format-library.md`.
- **Per-page footers** - the business name and a page number, small and
  quiet, on every content page.
- **CTA back page** - the last page, its own distinct treatment (often the
  brand's dark or inverse color), pointing plainly at the Phase 0 offer.
  Its copy comes verbatim from the item's gated CTA block (SKILL.md Phase
  4) - the render typesets those words; it never writes new ones.

## 2. The load-bearing CSS

Every rule below is here because leaving it out breaks something specific.
Do not simplify these away.

```css
@page {
  size: A4;
  margin: 0;
}

* { box-sizing: border-box; }
body { margin: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }

.page {
  position: relative;
  width: 210mm;
  height: 296mm;           /* NOT 297mm - see note below */
  page-break-after: always;
  overflow: hidden;
}
.page:last-child { page-break-after: auto; }

.footer {
  position: absolute;
  bottom: 10mm; left: 20mm; right: 20mm;
  display: flex; justify-content: space-between;
  font-size: 3mm; color: var(--muted);
}
```

- **`@page { size: A4; margin: 0 }`** sets the actual PDF page geometry.
  This is what controls output size here, not a `--window-size` flag - print
  rendering paginates from CSS, unlike the screenshot pipeline in
  `system/creative-library/ads/RENDER.md`. Do not pass `--window-size`; it does
  nothing for `--print-to-pdf` and inventing one just adds noise.
- **One `.page` section per page, at 296mm height, not 297mm.** A4 is
  297mm tall on paper, but 296mm is the verified number here: it gives
  Chrome's print engine 1mm of headroom to absorb its own sub-pixel
  rounding, so content never spills a sliver onto a blank extra page.
  Rounding this up to the textbook 297mm is the single most likely way to
  reintroduce a phantom trailing page - leave it at 296mm.
- **`page-break-after: always` on every page but the last** is exact page
  control: one `.page` div in the HTML becomes exactly one page in the PDF,
  no more, no fewer. Verified directly: three `.page` divs produced a
  3-page PDF, confirmed both by Chrome's own page count and by opening the
  file.
- **`overflow: hidden` on `.page`** stops content that is slightly too tall
  for one page from spilling into the next page's space instead of being
  caught during drafting. If something is cut off, the fix is shortening
  that page's content, not removing this rule.
- **`print-color-adjust: exact` (both prefixed and unprefixed)** is what
  makes background colors and gradients actually print. Without it, Chrome's
  print path drops backgrounds by default and every colored cover and CTA
  page silently turns white.
- **Footers live inside each `.page`, positioned with `position: absolute`,
  not in a CSS `@page` margin box** (`@top-center`, `@bottom-right`, and so
  on). Chrome's headless print-to-pdf does not render CSS Paged Media margin
  boxes, so a footer authored that way simply never appears. Put a `.footer`
  div inside every content page instead.

## 3. The render command

```bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CHROME" --headless=new --disable-gpu --disable-javascript \
  --no-pdf-header-footer \
  --virtual-time-budget=4000 \
  --print-to-pdf="/absolute/path/to/_<slug>/<slug>.pdf" \
  "file:///absolute/path/to/_<slug>/source.html"
```

Both paths must be absolute. A relative path or a bare filename will not
resolve.

- **`--headless=new`** - the current headless engine. Required; the old
  headless mode this used to mean is gone from current Chrome.
- **`--disable-gpu`** - avoids GPU-related rendering failures when there is
  no real display, which is the normal case here.
- **`--disable-javascript`** - the page never needs to run a script to
  render right, so scripting stays off. This is what stops a stray
  `<script>` tag - one that slipped into pasted proof or CTA text and
  survived the escaping step above some other way - from actually running
  during the render.
- **`--no-pdf-header-footer`** - turns off Chrome's own default print
  header/footer (page title, URL, date, page number), so only the design's
  own `.footer` divs show. Without this flag every page gets Chrome's
  generic print chrome stamped on it.
- **`--virtual-time-budget=4000`** - gives the page 4 real seconds to finish
  loading and laying out (fonts, embedded images) before Chrome captures
  it. Raise this if a page embeds large data-URI images and content looks
  half-rendered.
- **`--print-to-pdf=<path>`** - the output file.

### Finding Chrome

Try in order and use the first that exists:

1. `$CHROME_PATH`, if the environment sets it.
2. macOS: `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`,
   then `/Applications/Chromium.app/Contents/MacOS/Chromium`.
3. Windows: `C:\Program Files\Google\Chrome\Application\chrome.exe`, then
   the `(x86)` path.
4. Linux, or anywhere else: `google-chrome` on `PATH`, then `chromium`,
   then `chrome`.

None of these exist: this is the normal, honest no-Chrome case, not an
error to work around. Go straight to the fallback in section 5.

## 4. Verify before calling it done

Three checks, in order. A pass on step 1 alone is not enough - it confirms
Chrome ran, not that the PDF looks right.

1. **The bytes-written line.** Chrome writes a harmless warning to stderr on
   nearly every run:

   ```
   Trying to load the allocator multiple times. This is *not* supported.
   ```

   Ignore it. The line that actually matters looks like this, printed once
   the file is written:

   ```
   105678 bytes written to file /absolute/path/to/_<slug>/<slug>.pdf
   ```

   No such line, or the command exits non-zero: treat it as a failed
   render and go to the fallback.

2. **Stat the file yourself.** Don't rely only on the printed line -
   `ls -la` (or `wc -c`) the output file directly. A real multi-page,
   branded PDF with a gradient cover typically lands in the tens to
   low-hundreds of KB. A file of a few hundred bytes rendered blank,
   whatever the stdout line claimed.

3. **Read it back and look at it.** Open the PDF and check: the page count
   matches the number of `.page` sections in the HTML, the cover shows the
   logo or wordmark on a real brand color (not a blank page), the content
   pages carry the brand's accent color and styling (not plain
   black-on-white default type), footers appear on the content pages, and
   the CTA back page is there and legible. Any of these missing is a failed
   render, even if the file size and page count both look fine.

## 5. The no-Chrome / failed-render fallback

Hand over `_<slug>/source.html` itself as the deliverable - it is already
the fully designed file; nothing is lost. State it in one plain line, for
example:

> Chrome isn't available on this machine (or the render didn't pass
> verification), so here's the fully designed file instead:
> `_<slug>/source.html`. Open it in any browser and print to PDF (Cmd/Ctrl+P,
> then "Save as PDF") to get your PDF - one extra step, same design. One
> thing to know: what got approved and sealed is this HTML file's exact
> bytes, not the PDF you print from it - that happens afterward, on your
> own machine, and nobody checks those final PDF bytes against what was
> approved.

Seal `source.html` in this case (Phase 7), not a PDF that does not exist or
did not verify.

## Troubleshooting

- **A blank or white page where content should be:** almost always
  `print-color-adjust: exact` missing from an element, or a `file://` image
  path that is not actually absolute.
- **An extra blank page at the end:** check `.page` heights are 296mm, not
  297mm, and that the last `.page` uses `page-break-after: auto`, not
  `always`.
- **Fonts look like the OS default, not the brand's:** expected when no
  embedded font file exists - the system-stack fallback is doing its job.
  Only a genuinely missing `@font-face` src path (not an absolute one, or
  pointing at a file that is not there) is a bug.
- **Chrome exits with no PDF and no bytes-written line:** check the Chrome
  path resolved correctly for the platform, and that the parent folder for
  `--print-to-pdf=` already exists - Chrome will not create a missing
  directory.
