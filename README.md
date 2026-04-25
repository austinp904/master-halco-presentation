# Shoreline Plastics × Master Halco — Vendor Training Deck

**Read this file first.** It is the canonical brief for the slide-design
agent (Claude Design). It tells you what we're building, the design
system to build it in, where every asset lives, and the rules of
engagement.

---

## 1. The job

Build a **slide deck** that walks Master Halco's regional salespeople
through Shoreline Plastics' product platform — specifically the three
products on this training agenda: **EcoPile**, **SnapJacket**, and
**EcoWall** (the upcoming seawall product line). The deck will be
presented live by Austin Porter (VP Sales & Marketing) and is also
designed to be a **white-label leave-behind** that Master Halco can
re-skin with their own branding.

### Event context (frame all decisions against this)

- **Audience:** Master Halco Region 8 salespeople — CGAD Decking,
  Railing, branch-level outside sales. Not contractors. They need to
  *enable selling Shoreline products to their existing customer base*
  (contractors / property owners / municipalities). They will not
  install or engineer anything themselves.
- **Audience guidance from the rep group:** *"pictures, channel clarity,
  and tools they can use without thinking."* Lean into photos. Keep
  technical depth defensible-but-shallow. Build cheat-sheets, not white
  papers.
- **Event:** Region 8 Sales Training, Tuesday April 28 2026, 8–11 AM
  ET, Hampton Inn Ocoee, Florida. Shoreline shares the 3-hour slot with
  Thruflow + Eva-Last + a co-presenting rep group.
- **Realistic Shoreline content budget:** 30–45 minutes presented live.
  Aim for ~20–28 slide artifacts.

### Deck structure (exact section order — do not rearrange)

1. **Opening — Who is Shoreline & why now** *(~3 slides)*
2. **Product platform overview** *(1 slide — the four-product map)*
3. **EcoPile deep-dive** *(~8–10 slides — the workhorse)*
4. **SnapJacket deep-dive** *(~6–8 slides — repair/retrofit pitch)*
5. **EcoWall preview** *(~3–4 slides — "what's coming next")*
6. **How to sell + how to order** *(~2–3 slides — channel cheat-sheet)*
7. **Closer / Q&A** *(1 slide)*

Each section opens with a single-image / single-tagline title slide
that cleanly transitions from the previous section.

---

## 2. Design system

### Aesthetic target — read this carefully

> **Apple product-keynote energy meets web3 sci-fi HUD, restrained by
> industrial product gravitas.**
>
> Pure black void. One product or one number per slide, lit
> theatrically. Click-triggered reveals — never auto-advance. Glassmorphism
> on overlay UI elements (intro hero card, navigation, section headers)
> only. The HUD callouts that live on product images are solid blocks,
> not glass. Subtle neon-cyan and neon-green accents. Motion is
> tight, snap-to-place, never bouncy.

### Format

- **Slide deck.** Each slide is a self-contained artifact with its
  own click-triggered reveal sequence (taglines, callouts, comparison
  bars enter on click).
- **No auto-advance.** Austin clicks every reveal manually.
- **Horizontal 16:9.** Designed for big-screen projection.

### Brand palette (locked — use these exactly)

| Token | Hex | Where to use |
| --- | --- | --- |
| `--bg-void` | `#0A0A0A` | Slide background base |
| `--bg-vignette` | `#1A1A1F` | Subtle radial wash from upper-right + lower-right corners |
| `--brand-cyan` | `#00B5E2` | Logo arc, "SHORELINE" wordmark, primary accent, callout fill |
| `--brand-blue-deep` | `#1E40FF` | HUD callout top tier, key highlight color for chart bars |
| `--brand-blue-light` | `#7AB7E8` | HUD callout bottom tier |
| `--brand-green` | `#5FB85F` | Logo "PLASTICS" subtext, neon emission glows |
| `--text-white` | `#FFFFFF` | Primary text on dark, HUD reticle |
| `--text-mute` | `#9BA3AE` | Secondary text |
| `--text-dark` | `#0A0A14` | Text on light-blue HUD fills |

**Do not introduce additional colors.** If you need an extra accent,
use a darker or lighter version of the existing tokens. The Shoreline
mark is cyan + green on black — that is the palette.

### Typography

- **Display + headlines + callouts:** geometric extended sans, all-caps,
  weight 600–700, moderate tracking. Recommended free fonts:
  **Saira Condensed**, **Bahnschrift Condensed**, **Eurostile Extended**,
  or **Rajdhani**.
- **Body / supporting:** same family, sentence case, weight 400.
- **Numbers and stats** (for proof-point slides): same family, weight
  700, large, often tracking-tight to feel monolithic.

### Glassmorphism — where it goes

Use frosted-glass panels (`backdrop-filter: blur(24px); background:
rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08)`)
**only** for:

- Intro hero card on the opening slide
- Section-divider title plates
- The channel-cheat-sheet container on the "how to order" slide
- Navigation chrome (slide counter, section indicator)

**Never** apply glass to the on-product HUD callouts — those are
solid blocks, defined below.

### HUD callout system

Three reusable components — see `ecopiile/explainer-keyframes/visual-language.md`
for visual-language reference and the EcoPile keyframes folder for
photographic examples.

**Style A — Two-tier solid block** *(use 80% of the time, anchored to product photos with a thin connector line)*
- Top tier: `--brand-blue-deep` solid fill, `--text-white`, all-caps
- Bottom tier: `--brand-blue-light` solid fill, `--text-dark`, all-caps
- Connector line: 1px white, terminates in a `[ • ]` square-bracket
  reticle marker
- Animation in: top tier slides in from left/right, bottom tier slides
  in 100ms after, line draws in 300ms after that

**Style B — Outline-only / hairline** *(use for the closer / warranty stat / something quietly authoritative)*
- 1px white border, transparent fill
- Two text rows separated by a hairline divider
- Connector ends in a circular ring `⊙` reticle marker
- Reserve this for ~3 moments in the deck

**Style C — Single-tier block** *(use for one-line facts where two-tier feels heavy)*
- Single rectangle, `--brand-blue-light` fill, `--text-dark`
- Same connector + bracket reticle as Style A

### Animation primitives

| Move | Easing | Duration |
| --- | --- | --- |
| Callout slide-in | `cubic-bezier(0.2, 0.8, 0.2, 1)` | 450ms |
| Callout dismiss | `ease-in` | 250ms |
| Image scale (zoom) | `cubic-bezier(0.4, 0, 0.2, 1)` | 800ms |
| Layer peel/restore (EcoPile capstock-off effect) | ease-out-expo | 700ms |
| Cross-section split | `cubic-bezier(0.16, 1, 0.3, 1)` | 900ms |
| Emission/glow pulse | `ease-in-out infinite alternate` | 1200ms |
| Text reveal | `ease-out` | 300ms |

Stagger sequential elements by 80–120ms — never reveal multiple items
at the exact same instant.

---

## 3. Brand assets

| Asset | Path | Use |
| --- | --- | --- |
| Shoreline logo (transparent PNG, hi-res) | `ShorelinePlasticsNewLogo (1).png` | Title slide, footer chrome |
| Shoreline logo (Blender render — hero) | `shoreline-logo-blender-hero.png` | Section divider plates, possible opening hero |
| Shoreline logo (Blender render — transparent) | `shoreline-logo-blender-transparent.png` | When layering over photography |
| EcoPile logo | `ecopiile/Ecopile Logo.png` | EcoPile section title |
| SnapJacket logo | `snapjacket/SnapJacket Logo.png` | SnapJacket section title |
| EcoWall logo | `seawall (upcoming)/ecowall-logo.png` | EcoWall section title |

---

## 4. Folder map — what's where

```
master halco presentation/
├── README.md                          ← you are here
├── MASTER-TALKING-POINTS.md           ← cross-product narrative + proof points
├── Shoreline Pitch Deck excerpts.pdf  ← canonical brand + product platform deck (7 pages)
├── ShorelinePlasticsNewLogo (1).png   ← primary brand logo
├── shoreline-logo-blender-hero.png    ← hero render of logo
├── shoreline-logo-blender-transparent.png
│
├── ecopiile/                          ← EcoPile section assets (folder spelling preserved)
│   ├── talking-points.md              ← deep-dive narrative for the EcoPile section
│   ├── ecopile brochure (2).pdf       ← canonical product brochure
│   ├── Ecopile Logo.png               ← EcoPile logo
│   ├── ecopile pictures/              ← real-world product photos (residential + commercial docks, marinas)
│   │   └── marinas/
│   └── explainer-keyframes/           ← 40 keyframes from the 3D explainer draft + visual-language reference
│       ├── visual-language.md         ← READ THIS — defines the HUD callout system + choreography
│       └── *.jpg                      ← keyframes named MM-SS-label.jpg (sorted = storyboard)
│
├── snapjacket/                        ← SnapJacket section assets
│   ├── talking-points.md              ← deep-dive narrative for the SnapJacket section
│   ├── Copy of SnapJacketBrochure102418 (1).pdf  ← canonical product brochure
│   ├── snapjacket-submittal-and-application.pdf  ← engineering data sheet
│   ├── snapjacket-explainer.mp4       ← 2-min product video (story arc reference)
│   ├── snapjacket-explainer-transcript.txt  ← clean transcript of the video — lift narrative beats from here
│   ├── SnapJacket Logo.png
│   ├── snapjacket before.jpg / after.jpg  ← repair before-and-after shots — gold for slide pairs
│   ├── DJI_*.JPG                      ← drone shots, marina-scale visuals
│   ├── IMG_0569.JPG / IMG_6403.JPG    ← installer shots, install-detail closeups
│   └── 2016-09-30-15.02.11-1024x683.jpg
│
└── seawall (upcoming)/                ← EcoWall preview section assets (sparser by design)
    ├── talking-points.md              ← framing this as a preview, not a flagship pitch
    ├── ecowall-logo.png
    ├── photos/
    │   ├── full-res/                  ← high-quality originals
    │   ├── scaled/                    ← web-optimized for early prototyping
    │   └── diagrams/
    └── email-attachments/
        ├── EcoWall informational packet.pdf
        ├── chart-1-allowable-moment-same-thickness.png  ← reference data viz
        ├── chart-2-allowable-moment-vs-thicker-competitors.png
        └── master-vinyl-sheet-pile-comparison-table.png
```

> **The 3D EcoPile draft mp4 itself is intentionally not in this repo
> (171 MB exceeds GitHub's per-file limit). The 40 extracted keyframes
> in `ecopiile/explainer-keyframes/` plus the `visual-language.md`
> document fully replace it as a design reference.**

---

## 5. Per-section guidance

### Opening — Who is Shoreline & why now

- Lift the mission verbatim from `MASTER-TALKING-POINTS.md` §"Why Shoreline,
  Why Now":
  > *"Modernize marine construction through sustainable composites that
  > outlast and outperform wood, while sticking to a price point that
  > makes the products attainable for residential and lighter commercial
  > projects."*
- The CCA / EPA hook is the **strongest "why now"** — open with it.
  Numbers worth a dedicated slide: **2.5 million gallons of CCA into
  Florida waterways annually**; 2003 EPA ban with marine carve-out;
  modern wood pilings failing in <half their historical lifespan.
- Visual: hero render of the Shoreline logo (`shoreline-logo-blender-hero.png`)
  on black, fade-in.
- **18-year-old Jacksonville-FL family-run company** — work this in
  early as trust-builder.

### Product platform overview slide

One slide showing the four-product platform with **today's three** (EcoPile,
SnapJacket, EcoWall) highlighted and the fourth (DuroSleeve, the SnapJacket
extrusion sub-brand) in a muted state. Shoreline calls the platform "composite
marine construction technologies." Cite **half the cost of comparable 100%
fiberglass** as the platform's economic differentiator.

### EcoPile section — the workhorse

- Source: `ecopiile/talking-points.md`. Lift verbatim where marked.
- **Tagline (slide-card):** *"Never change your piling again."*
- **The killer differentiator slide — Hurricane Sally:** *"Out of the
  2,000+ poles we had out there in the early days, we didn't lose a
  single piling that we were aware of."* Surrounding concrete-pile
  structures: "completely wiped out." Build this as a high-impact
  proof-point slide. The mechanism — *rigid structures tear themselves
  apart in hurricanes; controlled flex absorbs storm energy* — is a
  counter-intuitive insight worth landing.
- **Cross-section reveal:** mimic the choreography described in
  `ecopiile/explainer-keyframes/visual-language.md` — capstock peels
  off to reveal the slate-blue speckled substrate, then a closeup of
  the **hexagram (six-point star) internal truss**, then a split-pile
  cross-section showing the cells. Each reveal is click-triggered.
  Use the photographic keyframes as reference for *what the slides
  should resemble*, then translate to web/CSS in the design system.
- **Proof points to bake into stat-card slides:**
  - **50-year warranty — only piling on the market with a written warranty**
  - **Up to 10 lbs of recycled PVC reused per linear foot**
  - **8+ years in the field, multiple national building awards**
  - **~25% rigidity increase from the new formulation (last 6 mo); 12" wall ~20–25% thicker = ~40% stiffer than prior 12" generation**
- **Sizing cheat-sheet slide:** 8" / 10" / 12" / 14" with depth-and-use-case
  rules of thumb (table in talking-points.md). Frame as a card the
  Master Halco rep can mentally photograph.

### SnapJacket section — repair / retrofit

- Source: `snapjacket/talking-points.md` + `snapjacket-explainer-transcript.txt`.
- **Tagline:** *"The longest-lasting affordable solution to fix decaying pilings."*
- The **video transcript narrative arc is the slide arc** — pain (docks
  expensive, piles don't last), demolition cost (barge + crane to replace
  even a few piles), reveal (SnapJacket), how-it-works (4-step:
  slip-around → drive into sand → slide locking mechanism → fill with
  cement), warranty close (25-year), sustainability close (recycled
  plastic, saves trees, keeps chemical treatment out of waterways).
- **Show the before/after shots** (`snapjacket before.jpg` /
  `snapjacket after.jpg`) as a side-by-side or click-toggle reveal —
  this is the "pictures pictures pictures" payoff.
- **Wetsuit-installer photo + drone shots** — leverage these for
  scale and "this is real, look at it" credibility.
- **Sizing rule:** size by host pile **circumference + 2" annular
  space**, not diameter. Cheat-sheet card.

### EcoWall preview section

- Source: `seawall (upcoming)/talking-points.md`. Be candid that this
  is **a preview, not a flagship pitch.** The framing should set up
  future Master Halco channel conversations, not close a sale Tuesday.
- **The headline number to land:** EcoWall 24.250 allowable moment of
  **5,979 ft-lb/ft** vs. competitor ESP 3.1 at 3,129 and SG-325 at
  2,960 — *102% / 91% advantage at parity 0.25" thickness and parity
  market price.* Use the existing chart in `seawall (upcoming)/email-attachments/chart-1-allowable-moment-same-thickness.png`
  as reference data; rebuild it in the design system (dark bg, brand
  colors, animated reveal of bars on click).
- The story is: **fiber-reinforced regrind from EcoPile / SnapJacket
  production is converted into stiffer-than-vinyl seawall panels at
  vinyl-sheet pricing.** Sustainability + economics aligned.
- Pair with KingPile structural members (heavier-duty EcoPile variant)
  to position as a complete recycled-composite seawall system.

### How to sell + how to order

Build a channel-clarity slide that focuses on **workflow**, not dollar
specifics. Pricing tiers, volume discounts, and partner-rep contact info
are deliberately **out of scope for the deck** — Austin will cover those
verbally and in the leave-behind. The slide should answer:

- **What does the order workflow look like?** (Quote request → confirmation → fulfillment)
- **Who fulfills which product?** Channel routing per product — SnapJacket
  ships direct from Shoreline; EcoPile and EcoWall route through regional
  fulfillment partners. The slide should make this visible at a glance
  without naming specific partner companies or contacts.
- **What's the typical quote turnaround?** Same-day or next-morning;
  1–2 days for large or custom-length quotes.

This slide should be a glassmorphism cheat-sheet card, not a wall of
text. No tables of phone numbers, no email lists, no dollar figures.

### Closer / Q&A

Final logo plate with a single line — recommend: *"Modernize the substrate.
Outlast the elements."* — fade-in only.

---

## 6. Rules of engagement

1. **Lift verbatim where marked.** Tagline lines, exact quotes, specific
   numbers — these have been validated. Don't reword for "tone."
2. **Do not invent technical specs.** Every spec the deck cites must
   trace to one of the talking-points files, the brochure PDFs, or
   the pitch deck excerpts. If something feels missing, leave the slot
   blank or cite the closest available number.
3. **Use the SnapJacket video transcript** (`snapjacket/snapjacket-explainer-transcript.txt`)
   as the SnapJacket narrative — it captures the working voice already.
4. **The visual-language doc** at `ecopiile/explainer-keyframes/visual-language.md`
   is the design source of truth for the HUD callout system. Use it
   for all three product sections, not just EcoPile.
5. **Photos:** use the real product photography liberally. Master Halco's
   audience explicitly asked for "pictures, pictures, pictures."
6. **Out of scope for the deck (don't render these):** Master Halco
   contact list (phone numbers / emails), specific dealer-partner
   contact names. These exist in `MASTER-TALKING-POINTS.md` for
   Austin's preparation reference but are **not** to appear in slides.
7. **White-label-ready.** Master Halco asked for a deck they can re-skin
   with their own logo. Build with a clean master template, swappable
   logo and colors — no Shoreline branding *inside* the body of slides
   that could not easily be swapped to Master Halco's identity for a
   re-skin.
8. **Honor the warranty correction:** EcoPile is **50 years**, not 25.
   The older `ecopile brochure (2).pdf` says 25 — the current truth
   per the pitch deck and Austin's correction is **50**. Use 50.
9. **No ASCII diagrams, no placeholder Lorem Ipsum, no stock-photo
   stand-ins for actual product shots.** If an asset isn't in this
   folder, ask — don't generate.

---

## 7. Files you should open before building

In this order:

1. `README.md` (this file) — full context
2. `MASTER-TALKING-POINTS.md` — cross-product narrative + proof points
3. `ecopiile/explainer-keyframes/visual-language.md` — HUD callout system + animation choreography (used across all three products)
4. `ecopiile/talking-points.md` — EcoPile deep-dive
5. `snapjacket/talking-points.md` — SnapJacket deep-dive
6. `snapjacket/snapjacket-explainer-transcript.txt` — SnapJacket narrative arc
7. `seawall (upcoming)/talking-points.md` — EcoWall preview framing

The PDFs (`Shoreline Pitch Deck excerpts.pdf`, brochures, submittal docs)
are reference fallbacks — open if a talking-points claim feels thin
and you need to verify a number.
