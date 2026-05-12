# Master Halco Vendor Training — Handoff Cheatsheet

A reference for picking this deck up in Cursor / Opus or any other tool.

---

## File map

| File | Purpose |
|---|---|
| `Master Halco Vendor Training.html` | The deck. 24 slides as `<section>` children of `<deck-stage>`. Source of truth. |
| `Master Halco Vendor Training - Standalone.html` | Single-file offline build. Open in any browser, press F11, present. |
| `styles.css` | Type, color, glass card, brand chrome. Look here first for visual changes. |
| `editor.js` + `editor.css` | The in-browser editor. ~1100 lines. Loaded by the deck file. |
| `deck-stage.js` | Web component that renders one slide at a time, scales to viewport, handles keyboard nav, posts speaker-note events. |
| `edits-backup.json` | Snapshot of your localStorage edits as of the recovery point. Keep as backup. |
| `assets/` | Renamed photos used by the deck (halfdock, cca-truck, jacket1, etc.) |
| `ecopiile/`, `snapjacket/`, `seawall (upcoming)/`, `ShorelinePlasticsNewLogo (1).png` | Original photo libraries. |

---

## Deck architecture (the basics)

```html
<deck-stage width="1920" height="1080">
  <section data-label="01 Title">…slide 1…</section>
  <section data-label="02 Mission">…slide 2…</section>
  …
</deck-stage>
```

- Slides are authored at **1920×1080**. The `<deck-stage>` web component scales the whole stage with CSS `transform: scale()` to fit any viewport, letterboxed black.
- Each slide gets `data-label` so things can find it. Numbering is human (01, 02 …).
- Arrow keys / clicks go forward and back. URL hash (`#5`) is the slide index.
- Print = one page per slide.
- The corner-brand element (`SHORELINE · 12 / 24`) on each slide is hand-numbered. If you reorder slides, run the renumbering script (or just hand-edit).

If you want to add a slide: copy any existing `<section>` and edit. Update `data-label` and the corner-brand.

---

## Editor — what's in `editor.js`

When **Edit Mode** is on (toolbar toggle, top-right), every editable element on the active slide gets a `data-edid="ed#"` attribute and becomes interactive. All changes are saved to `localStorage` under `mhalco-deck-edits-v1` and re-applied on every page load.

### Capabilities

| Action | How |
|---|---|
| **Select** | Click any text, image, or container |
| **Move** | Drag the selected element |
| **Resize** | Drag the corner squares (free, 2-axis) or the side bars (single-axis). Live W×H readout appears while dragging. |
| **Edit text** | Double-click a text element → contenteditable. Click outside to commit. |
| **Delete** | Press **Delete** or **Backspace**, or click the floating red × button on selection |
| **Reparent** | Drag an element over a container with the cyan glow → drop to nest it inside |
| **Add container** | Toolbar → "+ Container" → choose a glass color → drag from the slide |
| **Image filters** | Select an image → image card appears with opacity / blur / tint / grayscale sliders |
| **Image swap** | Image card → "Slot filename" → upload a file with that name; manifest lets you re-upload across sessions |
| **Per-slide notes** | "✎ NOTES" tab in bottom-right of each slide. Stored in `mhalco-deck-notes-v1`. Used for "leave a note for the next pass." |
| **Revert all** | Toolbar → wipes all edits and reloads |
| **Export edits** | Toolbar → downloads the manifest JSON (= contents of localStorage) |

### How edits attach to elements (the gotcha)

`data-edid="ed1"`, `ed2` … are assigned **at page load** by walking the DOM and tagging every editable element in document order. They are **not stable** across source-HTML structural changes.

Practical implication: if you add or remove elements from the HTML source, the IDs of every later element shift, and any saved edits attached to those IDs now point at different elements. Behavior you'll see:
- An edit that used to resize a glass card on slide 12 now resizes a paragraph on slide 14.
- A "deleted" flag that used to remove an old image now removes a different image.

**Workarounds:**
1. Make all edits via the editor (visual). Only touch source HTML for big restructures.
2. After a structural rewrite, expect to redo the edits on the affected slide.
3. The "Revert All" button is the nuclear option — clears localStorage and starts from source.
4. If you want truly stable IDs, the editor would need to anchor on a content hash or an explicit author-supplied id. It currently does not.

### LocalStorage keys

- `mhalco-deck-edits-v1` — all visual edits
- `mhalco-deck-notes-v1` — per-slide notes

Format of one edit:

```json
"ed1": {
  "dx": -535,           // x translate from natural position
  "dy": -165,           // y translate
  "w": 586,             // width override (px, in slide coords)
  "h": 217,             // height override
  "text": "…html…",     // text override (innerHTML)
  "parent": "ed293",    // reparented under another ed#, or "__slide" for top-level
  "detached": true,     // removed from natural parent (used with absLeft/absTop)
  "absLeft": 28,        // absolute position when detached
  "absTop": 61,
  "deleted": true,      // removed from DOM on next applyEdits
  "slot": "halfdock.jpg", // image slot name (for upload-by-filename)
  "hideSlotLabel": true,  // hide the "filename" pin overlay on this image
  "userCreated": true,    // this element was created in-editor (a new container)
  "bg": "rgba(…)",        // for user-created containers
  "border": "rgba(…)",
  "blur": "blur(24px)",
  "filter": { "opacity": 0.7, "blur": 4, "tint": "dark", "grayscale": 0.4 }
}
```

---

## Visual system

Defined in `styles.css`. Variables at the top.

### Colors
- `--ink: #0A0A0A` — page background, deepest
- `--brand-cyan: #00B5E2` — Shoreline primary
- `--text-white: #FFFFFF`
- `--text-mute: rgba(255,255,255,0.6)`
- Glass: `rgba(255,255,255,0.04)` background, `backdrop-filter: blur(24px)`, 24px corner radius

### Type
Saira Condensed (300/400/500/600/700) loaded from Google Fonts.

| Class | Usage |
|---|---|
| `.h-display` | Numbers, big stats — 200+ px |
| `.h-title` | Slide titles — 60–96 px |
| `.h-eyebrow` | Section breadcrumb — small, cyan |
| `.body-lg` | Main paragraph — 22-30 px |
| `.body-md` | Secondary — 18-22 px |
| `.label-sm` | All-caps micro-label — 14-18 px |

### Layout components
- `.slide-pad` — 80px slide padding wrapper. Always the outer slide container.
- `.center-all` — flex centers
- `.glass` — frosted glass card (24px radius)
- `.corner-brand` — bottom-right "SHORELINE · NN / 24" tag
- `.deck-chrome` — top-left section breadcrumb

### Slide section template
```html
<section data-label="NN Slide Name">
  <div class="slide-pad" style="display:flex; flex-direction:column;">
    <div class="h-eyebrow">// Section · Subsection</div>
    <h1 class="h-title">Slide title.</h1>
    <!-- content -->
  </div>
  <div class="corner-brand"><span class="bar"></span> SHORELINE · NN / 24</div>
  <div class="deck-chrome">
    <span class="dot"></span><span class="section-name">Section</span>
    <span class="sep">/</span><span>Subsection</span>
  </div>
</section>
```

---

## Slide inventory

| # | Label | Notes |
|---|---|---|
| 01 | Title | Glass hero card, dock backdrop, presenter info |
| 02 | Mission | Quote card |
| 03 | (gap — old "Why Now" moved to slide 24) | |
| 04 | Wood Lifespan | Halfdock photo + decay stats |
| 05 | Platform | 3 product cards (EcoPile 01, SnapJacket 02, Seawall 03) |
| 06 | EcoPile Divider | Logo over deck photo |
| 07 | EcoPile Tagline | Glass tagline + wood-deck warranty image |
| 08 | EcoPile Anatomy | (note: user wants animation here — placeholder) |
| 09 | Hexagram Truss | Cross-section diagram |
| 10 | EcoPile Cross-Section | |
| 11 | Hurricane Sally | Storm proof point — note: video placeholder |
| 12 | EcoPile Sizing | 4 size tiles (8/10/12/16″) with use cases |
| 13 | EcoPile Proof Points | |
| 14 | EcoPile Overview | Recap with 6 stat tiles |
| 15 | SnapJacket Divider | Logo + glass tile |
| 16 | SnapJacket Tagline | Bridge photo + tagline |
| 17 | Before/After | Two photos, no overlay |
| 18 | SnapJacket Install | (note: video placeholder) |
| 19 | SnapJacket Tools | Tool list + jacket1 photo |
| 20 | SnapJacket Specs | Sizing cheat sheet (diameter not circumference) |
| 21 | EcoWall Divider | |
| 22 | EcoWall Bar Chart | (note: video placeholder for compound strength) |
| 23 | How to Sell | 3-row channel cheat sheet |
| 24 | Why Now | CCA truck hook (moved from slide 3) |
| 25 | Closer | Final CTA |

---

## Open todos / placeholder zones

From your in-deck notes — these are spots flagged for video or async work:

- **Slide 08 EcoPile Anatomy** — wants click-through animation, possibly short MP4 segments
- **Slide 11 Hurricane Sally** — wants embedded video clips (your YouTube footage)
- **Slide 18 SnapJacket Install** — wants embedded video clip
- **Slide 22 EcoWall Bar Chart** — wants compound-strength video at end

Video implementation suggestion: drop `<video>` elements with `controls` and `preload="none"` so they don't bloat initial load. Click-to-advance segments = use `currentTime` jumps on a single source file.

---

## Recreating the editor in Cursor (rough plan)

If you want a similar in-browser editor in another tool, the architecture in `editor.js` is:

1. **Tag** — on activate, walk the DOM, attach `data-edid="ed#"` to every editable element matching a selector list (text tags, images, glass containers).
2. **Apply** — read localStorage, walk the edits, find each `[data-edid="…"]`, apply transform/size/text/parent/deleted/etc.
3. **Interact** — single delegated mousedown handler at document level → resolves to nearest `[data-editable]` ancestor → starts drag/resize/select.
4. **Persist** — every gesture writes back to localStorage and saves immediately.

Total surface is ~1100 lines, no dependencies. Could be a starting reference if you want to port it.

---

## Final notes

- The standalone HTML build is your real deliverable. Self-contained, works offline, presents in any browser.
- The editor is for **your** authoring use. If you hand the standalone file to a colleague to view, they get the deck without the edit chrome (it stays hidden until toggled).
- All photo files in `assets/` are normalized (lowercase, hyphens). The originals in `ecopiile/`, `snapjacket/` are still there too.
