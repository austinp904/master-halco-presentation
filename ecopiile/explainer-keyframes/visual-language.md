# EcoPile 3D Explainer — Visual-Language Notes

Reference document for the slide-design agent. Translates the existing
EcoPile draft animation (`ecopile 3d explainer draft.mp4`) into language
a web-presentation tool can act on. The draft is a Blender first-pass with imperfect lighting — the
**choreography** is the asset (the camera moves, peel reveals, callout
HUD, emission pulses). Use it as the storyboard reference; do not
copy the surface render's washed-out tones.

> **Color truth — rendered correctly in real life:**
>
> - **Outer capstock:** smooth medium gray PVC (silvery-gray, almost like
>   anodized aluminum). Stays gray in the deck. Do **not** repaint it
>   in brand colors.
> - **Internal substrate (visible when capstock is peeled or cross-section
>   shown):** **slate blue with darker speckles** — the speckle is real
>   visible regrind from recycled PVC content. Frames where this is
>   correctly visible: `01-13-stiffness-easy-handling-callout.jpg`,
>   `01-21-pole-splits-top-flies-up.jpg`, `01-27-webbing-benefits-rotating-blink.jpg`.
>   The closer reference photo (provided separately by Austin) shows the
>   blue clearly — the explainer-draft render has weak lighting that
>   makes some frames read flat-gray; that's a render issue, not the
>   real product.
> - **Hexagram truss webbing:** light gray, continuous with the
>   capstock material — these are the structural ribs cast in the same
>   PVC blend as the outer skin.
> - **Spiral grooves at base:** rendered in cyan in the source explainer
>   when their callout is active (`01-40-groove-callout-1.jpg`) — that's
>   an emission/highlight effect, not the actual product color (the
>   grooves are the same gray as the rest of the capstock).
>
> Where Shoreline brand cyan and neon green **do** show up:
> - Logo and typography
> - HUD callout fills (Style A solid blocks)
> - Emission/glow pulses to indicate "this is the layer being discussed"
> - Reticle markers and connector lines (these are pure white in the
>   source; brand cyan would also work)
> - Background accent lighting / corner washes
>
> Brand colors stay on the *interface*, not on the *product itself*.

---

## 1. Brand palette (extracted from source)

| Token | Hex (approx) | Usage |
| --- | --- | --- |
| `--bg-void` | `#0A0A0A` → `#1A1A1A` radial | Background — near-black with subtle vignette/spotlight |
| `--brand-cyan` | `#00B5E2` | Logo arc, "SHORELINE" wordmark, primary callout fill |
| `--brand-blue-deep` | `#1E40FF` | Solid block callout top tier, "WITH LESS PENETRATION" highlight |
| `--brand-blue-light` | `#7AB7E8` | Solid block callout bottom tier, groove color |
| `--brand-green` | `#5FB85F` | Logo "PLASTICS" subtext, neon emission accent |
| `--product-capstock-gray` | `#8E94A1` | Real capstock color — smooth medium silvery-gray. Do not paint over. |
| `--product-substrate-blue` | `#3B5A78` | Real internal substrate — slate blue with regrind speckle. Use as base; texture overlay shows recycled-content character. |
| `--product-substrate-blue-rich` | `#1F4E72` | Used in cross-section highlight cell (one cell deeper-saturated to draw eye) |
| `--text-white` | `#FFFFFF` | Top-tier callout text, hairline strokes, reticle |
| `--text-dark` | `#0A0A14` | Bottom-tier callout text on light blue fill |

Radial vignette: subtle pools of light at upper-right and lower-right
corners against pure black — gives the void depth without distracting
from the product silhouette.

---

## 2. Callout system

Three reusable HUD components, all triggered by user click (not auto):

### Style A — "Two-tier solid block" (primary feature callouts)

```
┌─────────────────────────┐
│ ULTRA HIGH IMPACT       │  ← solid royal blue, white text
├─────────────────────────┤
│ SPECIALIZED CAPSTOCK    │  ← solid cyan blue, dark text
└─────────────┬───────────┘
              │  ← thin white hairline (1px)
              └─[ • ]   ← square-bracket reticle with dot
```
- Top tier: `--brand-blue-deep` fill, all-caps white, geometric extended sans
- Bottom tier: `--brand-blue-light` fill, all-caps near-black
- Connector: 1px white line, terminates in `[ ]` reticle marker
- Animation in: top tier slides in from left, bottom tier slides in 100ms after

### Style B — "Outline-only / hairline" (closing / warranty / quietly important)

```
┌─────────────────────────┐
│ THE ONLY PILING         │  ← transparent fill, white text
├ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┤
│ WITH A 50 YEAR WARRANTY │  ← white text, hairline divider
└─────────────┬───────────┘
              │
              └─⊙   ← circular ring + dot reticle
```
- No fill, just a 1px white outline rectangle
- Hairline divider between two text rows
- Connector ends in a small ring (clinical / finalizing feel)
- Use **only** for the warranty payoff at the end of the EcoPile section.

### Style C — "Single light block" (single-line facts)

Same as Style A but only one tier (`--brand-blue-light`, dark text).
Used for the spiral-groove callout: `SPIRAL RETENTION GROOVES`.

### Reticle markers (the bracket on the line end)

Two variants — both 1px white, ~24×24px:

1. **Square brackets `[ • ]`** — paired right-angle corners with center
   dot. Used for "active feature being discussed."
2. **Ring `⊙`** — concentric circle with center dot. Used for
   measurement / data-point / closing callouts.

---

## 3. Typography

- **All callouts and on-canvas text:** geometric extended sans, all-caps,
  moderate tracking. Closest free fonts: **Saira Condensed**, **Bahnschrift
  Condensed**, **Eurostile Extended**, or **Rajdhani**. Weight 600–700.
- **Logo wordmark:** matches existing Shoreline mark (custom).
- Body text on slides outside of callouts: same family, sentence case,
  weight 400.

---

## 4. Choreography — beat-by-beat

Numbers are seconds in the source mp4. Two columns: what the source
does, and the web-translation for the design agent (since we're not
rendering 3D — we're recreating the *feel* in HTML/CSS).

| Time | Source action | Web translation |
| --- | --- | --- |
| 0:00–0:04 | Shoreline logo center; top of EcoPile peeking up from below frame | Hero slide: logo center, faint silhouette of pile rising from bottom (CSS image with mask-fade) |
| 0:04–0:10 | Slow vertical pan **down** the full length of the pile, dark void backdrop | Vertical scroll-jacked or `transform: translateY()` reveal of a tall product photo as user advances |
| 0:14 | Traveling Style-A callout pinned to passing point: **"DESIGNED SOLELY AROUND / THE MARINE INDUSTRY"** | Click 1 — Style A slides in from left, line draws to product |
| 0:19 | Callout dismisses, camera reaches base of pile (spiral grooves visible) | Click 2 — callout fades out; camera/zoom shifts focus to base |
| 0:24–0:28 | Pull-back to wide shot — full pile in void | Click 3 — scale down, full product centered |
| 0:28–0:30 | **FAST**: outer capstock peels/slides downward off the pile like a sleeve, revealing slate-blue speckled substrate beneath. Internal hex truss visible at cut-top | Click 4 — capstock layer animates `translateY(60%)` + `opacity 0.3` over 600ms ease-out; substrate underneath rendered in `--product-substrate-blue` with subtle regrind-speckle texture |
| 0:31 | Style-A callout: substrate-related (read source: this label faded too quick to OCR — supply our own: **"FIBERGLASS-COMPOSITE SUBSTRATE"**) | Click 5 — Style A enters; reticle anchored to bare substrate |
| 0:41 | Style-A callout: **"> 200% MORE RIGID / THAN RIGID PVC"** | Click 6 — Style A enters, replaces previous |
| 0:46–0:48 | Capstock flies **back up** into place on the pile | Click 7 — capstock layer animates back; both callouts dismiss |
| 0:49–0:55 | Style-A callout: **"ULTRA HIGH IMPACT / SPECIALIZED CAPSTOCK"**. Capstock surface pulses emissively (bright/dim/bright) to indicate the layer being discussed | Click 8 — Style A enters; capstock surface gets `box-shadow: 0 0 24px var(--brand-cyan)` pulsing on a 1.2s ease-in-out infinite alternate animation |
| 1:02 | Closeup at top of pile — hexagram (Star-of-David / 6-point star) internal truss revealed | Click 9 — image swap to top-down close shot |
| 1:03–1:07 | Internal webbing callout. Glow inside the cells blinks emissively | Click 10 — Style A: **"ENHANCED STIFFNESS / EASIER HANDLING"**; cells get a `--brand-green` inner glow, pulsing 1s |
| 1:15–1:20 | Pile rotates slowly; second callout joins, shares screen | Click 11 — pile image rotates via CSS `transform: rotateY()`; second Style A enters from right |
| 1:20–1:22 | **FAST**: camera flies down to mid-pile; pile splits at an angle and top half lifts up/away (cross-section reveal) | Click 12 — split image asset; top half `translateY(-30%)` + slight rotation; cross-section face newly exposed |
| 1:23–1:32 | Two callouts on cross-section: **"5 TIMES THE SURFACE AREA / TO GENERATE SKIN FRICTION"** and **"BETTER SETTLING RESISTANCE / WITH LESS PENETRATION"**. One cell of the truss gets a vivid blue fill highlight | Click 13 — both callouts enter; one inner cell gets `background: var(--brand-cyan)` to draw eye |
| 1:32–1:36 | Camera pulls back, top half rejoins bottom | Click 14 — reverse the split animation; callouts dismiss |
| 1:36–1:40 | Camera drops to base of pile; spiral retention grooves get a teal/blue emission color | Click 15 — image swap to base shot; grooves rendered in `--brand-blue-light` with `filter: drop-shadow(0 0 4px var(--brand-cyan))` |
| 1:40 | Style-C callout: **"SPIRAL RETENTION GROOVES"** | Click 16 — Style C enters |
| 1:47, 1:53 | Two follow-up groove callouts — supply: **"5× MORE GRIP THAN SMOOTH"** and **"DRIVES IN WITH LESS BLOWS"** (substitute language welcome) | Clicks 17–18 |
| 2:01–2:05 | Camera quickly zooms way out; pile gets small in the frame | Click 19 — scale down everything to 30% |
| 2:05–2:11 | Style-B (outline-only) callout: **"THE ONLY PILING / WITH A 50 YEAR WARRANTY"** | Click 20 — Style B enters; this is the closer |
| 2:12 | Logo fade-in as final shot | Click 21 — Shoreline logo fades in at center, pile fades out |

**Note on copy:** the source video has a typo — "WARRANT" instead of
"WARRANTY". Render the corrected spelling. Also note the source's
"GENERATES" subject-verb mismatch (`SURFACE AREA / TO GENERATES`) —
fix to `TO GENERATE`.

---

## 5. Animation primitives (cheat-sheet for the design agent)

Use these consistent motion tokens across the EcoPile section so it
feels like one piece:

| Move | Easing | Duration |
| --- | --- | --- |
| Callout slide-in (left/right) | `cubic-bezier(0.2, 0.8, 0.2, 1)` | 450ms |
| Callout dismiss | `ease-in` | 250ms |
| Camera-equivalent scale | `cubic-bezier(0.4, 0, 0.2, 1)` | 800ms |
| Capstock peel/restore | `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo) | 700ms |
| Pile split | `cubic-bezier(0.16, 1, 0.3, 1)` | 900ms |
| Emission pulse | `ease-in-out infinite alternate` | 1200ms |
| Reticle line draw-in | `ease-out` | 300ms |

---

## 6. The "feel" target — referenceable in the prompt

Tell Claude Design: *"Apple product-keynote energy. Pure black void.
One product, lit theatrically, holds the entire frame. HUD-style
callouts in Shoreline cyan-blue and royal blue snap in on click,
anchored to the model with a thin white line ending in a square
bracket reticle. Subtle neon-green emission pulses indicate which
component is being discussed. Glassmorphism only on overlay UI
elements (intro hero card, navigation, section headers) — never on
the callouts themselves, which are solid HUD blocks. Web3 / sci-fi
HUD vibe restrained by industrial product gravitas."*

---

## 7. Source frame index

40 keyframes in `./` next to this file. Naming is `MM-SS-label.jpg`,
so an alphabetical sort reads as a storyboard. See `extract_keyframes.py`
for the source timestamps.

Key frames the design agent should see (highest signal):
- `00-04-logo-intro-pole-top.jpg` — opener composition
- `00-14-traveling-callout.jpg` — Style-A in context
- `00-41-substrate-callout-2.jpg` — Style-A right-side variant + truss visible
- `00-50_5-capstock-callout-blink-B.jpg` — emission peak (whole capstock glows)
- `01-02-closeup-pole-top.jpg` — hexagram truss reveal
- `01-13-stiffness-easy-handling-callout.jpg` — Style-A on cross-section
- `01-21-pole-splits-top-flies-up.jpg` — split-reveal moment
- `01-27-webbing-benefits-rotating-blink.jpg` — dual callout + cell highlight
- `01-40-groove-callout-1.jpg` — Style-C single-line callout, grooves emitting
- `02-05-warranty-callout.jpg` — Style-B (outline-only) closer
