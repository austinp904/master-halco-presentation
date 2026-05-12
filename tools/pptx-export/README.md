# PPTX Export

Generates an editable `Master Halco Vendor Training.pptx` from the standalone
HTML deck. Each slide becomes a real PowerPoint slide with native shapes:

- **Text** → editable text boxes with mapped fonts (Saira Condensed → Bahnschrift, Inter → Aptos)
- **Cards / pills** → rounded rectangles preserving fill, border, radius
- **Images** → embedded picture frames (blob URLs from the bundle are inlined)
- **Charts (`<canvas>`)** → rasterized to PNG and embedded (data is not editable, but you can swap the image)
- **Full-bleed hero photos** → 50% black scrim auto-added on top so overlay text stays readable

## How it works

Two-stage pipeline:

1. **`extract.mjs`** — launches Chrome via `puppeteer-core`, opens the deck
   with `noscale` so geometry is captured at authored 1920×1080, walks every
   slide's DOM, and writes a structured JSON of every visible leaf
   (text/image/canvas/svg/decorative-rect) plus computed style.

2. **`build.mjs`** — consumes that JSON, maps each leaf to a native PPTX
   shape via `pptxgenjs`, and writes the .pptx into the project root.

Both stages are deliberately separate so you can inspect / tweak the
`slides.json` between extract and build if anything looks off.

## Run

```bash
cd tools/pptx-export
npm install              # one time
node extract.mjs         # walks the deck, dumps slides.json (~25 MB)
node build.mjs           # writes "Master Halco Vendor Training.pptx" to repo root
```

## Notes / known limitations

- **CSS gradients** (radial backgrounds, gradient text fills) → flat dark
  background + solid color text. PowerPoint can't render the same gradients
  natively without losing editability.
- **Glassmorphism / backdrop-filter** → flattened to flat fills.
- **Animations / reveals** → all reveal-by-click content is forced visible
  for the export. PowerPoint slide transitions are not generated.
- **Custom fonts** → mapped to PowerPoint defaults so slides render the same
  on any machine. Original fonts: install them locally and search-replace
  `fontFor()` in `build.mjs` to use them.
- **Letter spacing** → preserved (CSS px → pt conversion in `build.mjs`).
- **Charts** → embedded as PNG snapshots. To make them editable, recreate
  with PowerPoint's native chart tool.
