// Builds an editable PPTX from /tmp/pptx-export/slides.json.
// Each slide is reconstructed as native PowerPoint shapes (rectangles for
// card chrome, text boxes for editable copy, picture frames for images and
// rasterized chart canvases). Background is a flat dark fill — matches the
// deck's overall feel without trying to reproduce CSS gradients natively.
import fs from 'node:fs';
import path from 'node:path';
import pptxgen from 'pptxgenjs';

const SRC = path.resolve(process.argv[2] || '/tmp/pptx-export/slides.json');
const OUT = path.resolve(process.argv[3] || '/Users/austinporter/Projects/master-halco-presentation/Master Halco Vendor Training.pptx');

const DESIGN_W = 1920;
const DESIGN_H = 1080;
const SLIDE_W = 13.333;     // inches — pptx 16:9 wide layout
const SLIDE_H = 7.5;
const PX_TO_IN = SLIDE_W / DESIGN_W;
const PX_TO_PT = 0.5;        // 1920 design-px on a 13.33" slide → 144 dpi → px*0.5 = pt
const BG_DARK = '0A0A0A';    // deck base background

const pxIn = (px) => +(px * PX_TO_IN).toFixed(4);
const pxPt = (px) => Math.max(6, Math.round(px * PX_TO_PT));

// Hex normalizer — pptxgenjs expects hex without #
const hex = (c) => (c && typeof c === 'string') ? c.replace(/^#/, '') : null;

// Pick a font that PowerPoint actually has installed. Saira Condensed, Inter,
// JetBrains Mono are not bundled with Windows/Office out of the box. Map to
// closest PowerPoint default per family.
function fontFor(family) {
  if (!family) return 'Calibri';
  const f = family.toLowerCase();
  if (f.includes('saira') || f.includes('bahnschrift') || f.includes('eurostile') || f.includes('rajdhani')) return 'Bahnschrift';
  if (f.includes('jetbrains') || f.includes('mono') || f.includes('courier') || f.includes('consolas')) return 'Consolas';
  if (f.includes('inter') || f.includes('helvetica') || f.includes('arial')) return 'Aptos';
  return 'Aptos';
}

function applyText(slide, el) {
  const text = el.text || '';
  if (!text) return;

  // letter-spacing: pptxgenjs takes points (it multiplies by 100 itself when
  // emitting OOXML's spc=… in 1/100-pt units). Convert design-px → pt.
  let charSpacing = 0;
  if (el.letterSpacing && el.letterSpacing !== 'normal') {
    const ls = parseFloat(el.letterSpacing);
    if (!isNaN(ls)) charSpacing = +(ls * PX_TO_PT).toFixed(2);
  }

  const upper = el.textTransform === 'uppercase' ? text.toUpperCase() : text;
  const isBold = parseInt(el.fontWeight, 10) >= 600 || el.fontWeight === 'bold';
  const isItalic = el.fontStyle === 'italic';

  // Most text in this deck is single-line; we trust the original geometry.
  // Slight pad so descenders aren't clipped.
  // We extracted from a 1:1 noscale render where each leaf text node's
  // bounding rect is the *exact* fit. PowerPoint's text rendering is not
  // pixel-identical to the browser (different font metrics, kerning), so a
  // box sized to the browser width often forces vertical wrapping. Two
  // counter-measures: widen the box generously and disable wrapping.
  const widenFactor = (el.textAlign === 'center' || el.textAlign === 'right') ? 1.3 : 1.6;
  const boxW = Math.min(DESIGN_W - el.x, Math.round(el.w * widenFactor) + 40);

  slide.addText(upper, {
    x: pxIn(el.x),
    y: pxIn(el.y),
    w: pxIn(boxW),
    h: pxIn(el.h + 12),
    fontFace: fontFor(el.fontFamily),
    fontSize: pxPt(el.fontSize),
    bold: isBold,
    italic: isItalic,
    color: hex(el.color) || 'FFFFFF',
    align: ['center','right','justify'].includes(el.textAlign) ? el.textAlign : 'left',
    valign: 'top',
    charSpacing: charSpacing || undefined,
    margin: 0,
    wrap: false,
    isTextBox: true,
  });
}

function applyRect(slide, el) {
  // Filter out wrapper boxes with no visible chrome
  const fill = hex(el.bg);
  const stroke = (el.borderWidth > 0) ? hex(el.borderColor) : null;
  if (!fill && !stroke && !el.borderRadius) return;

  const opts = {
    x: pxIn(el.x),
    y: pxIn(el.y),
    w: pxIn(el.w),
    h: pxIn(el.h),
    fill: fill ? { color: fill } : { type: 'none' },
    line: stroke ? { color: stroke, width: Math.max(0.5, el.borderWidth * 0.5) } : { type: 'none' },
    rectRadius: el.borderRadius ? Math.min(0.4, pxIn(el.borderRadius)) : 0,
  };
  // pptxgenjs uses different shape types for radius; rounded vs rect
  const shapeType = (el.borderRadius && el.borderRadius > 4) ? 'roundRect' : 'rect';
  slide.addShape(shapeType, opts);
}

function applyImage(slide, el) {
  if (!el.dataUrl) return;
  try {
    slide.addImage({
      data: el.dataUrl,
      x: pxIn(el.x),
      y: pxIn(el.y),
      w: pxIn(el.w),
      h: pxIn(el.h),
    });
  } catch (e) {
    console.error('addImage failed:', e.message);
  }
}

// -----------------------------------------------------------------
// Build deck
// -----------------------------------------------------------------
const slides = JSON.parse(fs.readFileSync(SRC, 'utf8'));
const pres = new pptxgen();
pres.layout = 'LAYOUT_WIDE';
pres.title = 'Shoreline x Master Halco — Region 8 Vendor Training';
pres.company = 'Shoreline Plastics';

// Master with the dark background, applied to every slide
pres.defineSlideMaster({
  title: 'DECK_DARK',
  background: { color: BG_DARK },
});

let totalShapes = 0;
slides.forEach((s, i) => {
  const slide = pres.addSlide({ masterName: 'DECK_DARK' });

  // Pass 1: rects (so they render behind text)
  for (const el of s.elements) if (el.kind === 'rect') applyRect(slide, el);
  // Pass 2: images
  for (const el of s.elements) if (['image', 'canvas', 'svg'].includes(el.kind)) applyImage(slide, el);

  // Pass 2b: if any image is full-bleed (covers the slide), drop a 50% black
  // scrim over it so overlay text stays readable. Mirrors the dark gradient
  // overlay the HTML deck applied in CSS.
  const fullBleed = s.elements.find(e =>
    (e.kind === 'image' || e.kind === 'canvas' || e.kind === 'svg') &&
    e.x <= 4 && e.y <= 4 && e.w >= DESIGN_W - 8 && e.h >= DESIGN_H - 8
  );
  if (fullBleed) {
    slide.addShape('rect', {
      x: 0, y: 0, w: SLIDE_W, h: SLIDE_H,
      fill: { color: '000000', transparency: 50 },
      line: { type: 'none' },
    });
  }

  // Pass 3: text on top
  for (const el of s.elements) if (el.kind === 'text') applyText(slide, el);

  totalShapes += s.elements.length;
  console.error(`  slide ${i + 1}/${slides.length}: ${s.elements.length} shapes`);
});

await pres.writeFile({ fileName: OUT });
console.error('Wrote', OUT, '(', (fs.statSync(OUT).size / (1024 * 1024)).toFixed(2), 'MB,', totalShapes, 'shapes total )');
