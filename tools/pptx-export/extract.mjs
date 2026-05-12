// Extracts each slide's structured content from the standalone deck.
// Renders the deck at authored 1920x1080 size (noscale), walks every slide,
// and serializes text/image/canvas leaves into JSON.
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';

const HTML = path.resolve(process.argv[2] || '/Users/austinporter/Projects/master-halco-presentation/Master Halco Vendor Training - Standalone.html');
const OUT  = path.resolve(process.argv[3] || '/tmp/pptx-export/slides.json');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  defaultViewport: { width: 1920, height: 1080, deviceScaleFactor: 1 },
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});

const page = await browser.newPage();
page.on('pageerror', e => console.error('PAGE ERROR:', e.message));
page.on('console', msg => {
  const t = msg.type();
  if (t === 'error' || t === 'warning') console.error(`[${t}]`, msg.text());
});

await page.goto('file://' + HTML, { waitUntil: 'load', timeout: 60000 });

// Wait for deck-stage to mount and slides to be collected
await page.waitForFunction(() => {
  const ds = document.querySelector('deck-stage');
  return ds && ds._slides && ds._slides.length > 0;
}, { timeout: 30000 });

// Force authored geometry — no transform scale
await page.evaluate(() => {
  const ds = document.querySelector('deck-stage');
  ds.setAttribute('noscale', '');
  ds._fit();
});

const slideCount = await page.evaluate(() => document.querySelector('deck-stage')._slides.length);
console.error(`Found ${slideCount} slides.`);

const slides = [];
for (let i = 0; i < slideCount; i++) {
  // Navigate to slide i
  await page.evaluate((idx) => {
    const ds = document.querySelector('deck-stage');
    ds._index = idx;
    ds._applyIndex({ showOverlay: false, broadcast: false, reason: 'api' });
    // Force any reveals to fully expanded state for export
    ds._slides[idx].querySelectorAll('[data-reveal]').forEach(el => {
      el.classList.add('is-revealed');
      el.style.opacity = '1';
      el.style.visibility = 'visible';
      el.style.transform = 'none';
    });
  }, i);
  // Tiny tick so layout settles
  await new Promise(r => setTimeout(r, 50));

  const data = await page.evaluate(() => {
    const ds = document.querySelector('deck-stage');
    const section = ds._slides[ds._index];
    const sRect = section.getBoundingClientRect();

    // Section background
    const sBg = getComputedStyle(section);
    const sectionBg = sBg.backgroundColor && sBg.backgroundColor !== 'rgba(0, 0, 0, 0)' ? sBg.backgroundColor : null;
    const sectionBgImage = sBg.backgroundImage && sBg.backgroundImage !== 'none' ? sBg.backgroundImage : null;

    function rectIn(el) {
      const r = el.getBoundingClientRect();
      return {
        x: Math.round(r.left - sRect.left),
        y: Math.round(r.top - sRect.top),
        w: Math.round(r.width),
        h: Math.round(r.height),
      };
    }
    function isHidden(el) {
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden') return true;
      if (parseFloat(cs.opacity) < 0.05) return true;
      const r = el.getBoundingClientRect();
      if (r.width < 1 || r.height < 1) return true;
      // Off-canvas
      if (r.right < sRect.left || r.left > sRect.right) return true;
      if (r.bottom < sRect.top || r.top > sRect.bottom) return true;
      return false;
    }
    function rgbToHex(rgb) {
      if (!rgb) return null;
      const m = rgb.match(/^rgba?\(([^)]+)\)/);
      if (!m) return null;
      const parts = m[1].split(',').map(s => parseFloat(s.trim()));
      const [r, g, b, a = 1] = parts;
      if (a < 0.05) return null;
      const toHex = n => Math.round(n).toString(16).padStart(2, '0').toUpperCase();
      return '#' + toHex(r) + toHex(g) + toHex(b);
    }

    const elements = [];

    // Walk all descendants, classify leaves
    const all = section.querySelectorAll('*');
    for (const el of all) {
      if (isHidden(el)) continue;
      // Skip editor chrome
      if (el.classList.contains('ed-handle') || el.classList.contains('ed-toolbar')
          || el.classList.contains('ed-image-card') || el.classList.contains('ed-slot-label')
          || el.classList.contains('ed-tint-overlay') || el.classList.contains('ed-delete-btn')
          || el.classList.contains('ed-notes-tab') || el.classList.contains('ed-notes-panel')) continue;

      const tag = el.tagName.toLowerCase();
      const cs = getComputedStyle(el);
      const r = rectIn(el);

      if (tag === 'img') {
        elements.push({ kind: 'image', ...r, src: el.src, alt: el.alt || '' });
        continue;
      }
      if (tag === 'canvas') {
        // Capture chart as data URL
        try {
          const dataUrl = el.toDataURL('image/png');
          elements.push({ kind: 'canvas', ...r, dataUrl });
        } catch (_) {}
        continue;
      }
      if (tag === 'svg') {
        // Serialize SVG as data URL
        try {
          const xml = new XMLSerializer().serializeToString(el);
          const dataUrl = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(xml)));
          elements.push({ kind: 'svg', ...r, dataUrl });
        } catch (_) {}
        continue;
      }

      // Text leaf: element with no element children but non-empty text.
      // (We pick the deepest element so we get the actual computed style for the run.)
      const hasElementChildren = el.children.length > 0;
      const text = el.textContent.replace(/\s+/g, ' ').trim();
      if (!hasElementChildren && text) {
        elements.push({
          kind: 'text',
          ...r,
          text,
          fontFamily: cs.fontFamily,
          fontSize: parseFloat(cs.fontSize),
          fontWeight: cs.fontWeight,
          fontStyle: cs.fontStyle,
          color: rgbToHex(cs.color),
          textAlign: cs.textAlign,
          lineHeight: cs.lineHeight,
          letterSpacing: cs.letterSpacing,
          textTransform: cs.textTransform,
          // Background & border for inline-styled "chips" / pills
          bg: rgbToHex(cs.backgroundColor),
          borderColor: rgbToHex(cs.borderColor),
          borderWidth: parseFloat(cs.borderWidth) || 0,
          borderRadius: parseFloat(cs.borderRadius) || 0,
        });
        continue;
      }

      // Decorative box: element with explicit background color/border/radius and
      // ONLY non-text element children (or none we'll pick separately). We capture
      // it as a "rect" so we can preserve card chrome.
      const bg = rgbToHex(cs.backgroundColor);
      const borderW = parseFloat(cs.borderWidth) || 0;
      const borderC = rgbToHex(cs.borderColor);
      const radius = parseFloat(cs.borderRadius) || 0;
      const hasCardChrome = (bg && bg !== '#000000') || (borderW > 0 && borderC) || radius > 0;
      // Only emit if the box is reasonably card-sized (filters out wrappers)
      if (hasCardChrome && r.w >= 80 && r.h >= 40 && r.w * r.h < 1920 * 1080 * 0.95) {
        elements.push({
          kind: 'rect',
          ...r,
          bg,
          borderColor: borderC,
          borderWidth: borderW,
          borderRadius: radius,
        });
      }
    }

    // Extract speaker notes if available (some decks store them on the section)
    const notes = (ds._notes && ds._notes[ds._index]) || section.dataset.notes || '';

    return {
      index: ds._index,
      sectionBg,
      sectionBgImage,
      width: Math.round(sRect.width),
      height: Math.round(sRect.height),
      elements,
      notes,
    };
  });

  // Resolve any blob: URLs to base64 data URLs (PPTX needs embedded data)
  for (const el of data.elements) {
    if ((el.kind === 'image' || el.kind === 'svg') && el.src && el.src.startsWith('blob:')) {
      try {
        const dataUrl = await page.evaluate(async (url) => {
          const r = await fetch(url);
          const b = await r.blob();
          return await new Promise((resolve, reject) => {
            const fr = new FileReader();
            fr.onload = () => resolve(fr.result);
            fr.onerror = reject;
            fr.readAsDataURL(b);
          });
        }, el.src);
        el.dataUrl = dataUrl;
        delete el.src;
      } catch (err) {
        console.error('    blob fetch failed for', el.src, err.message);
      }
    } else if (el.kind === 'image' && el.src) {
      el.dataUrl = el.src;
      delete el.src;
    }
  }

  console.error(`  slide ${i + 1}/${slideCount}: ${data.elements.length} elements`);
  slides.push(data);
}

await browser.close();

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(slides, null, 2));
console.error('Wrote', OUT, '(', (fs.statSync(OUT).size / 1024).toFixed(0), 'KB )');
