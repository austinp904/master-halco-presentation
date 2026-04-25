# Email-Attachment Index — Seawall Material

Pulled from the email-brain vault on 2026-04-25 via Microsoft Graph API. These are the attachments that came out of seawall-related threads — the same files Austin has been sending to prospects, contractors, and engineers. Use them as direct slide content or as reference for the slide-building agent.

All files are organized by intent (root for the headline packet, then `spec-sheets/`, `installation-photos/`, `drawings/`).

---

## Root

### `EcoWall informational packet.pdf` (1.4 MB)
**Source:** Sent 2026-02-18 by Austin to Clay (thread: "EcoWall"). Same packet was also sent 2026-02-10 to Josh ("Thanks again for your interest in the new vinyl sheet were offering. Ours is a bit unique, as the material…") and on 2026-03-13 to Arthur ("Thanks again for your interest in our new vinyl sheet pile product! Here's a general overview on the sheet…").
**What it is:** Austin's prospect-facing intro packet on EcoWall — the document he sends when a contractor or distributor first asks "what is this thing?" If you remember "a smaller PDF packet to someone highlighting some of the system" — **this is the file.**
**Use it for:** the deepest single source on EcoWall. Lift slide content directly. The fact that Austin sent the same packet to three separate prospects in three months means it's the canonical version — no need to remix.

### `austin-josh-ecowall-explainer-email.md`
**Source:** Email Austin sent to Josh on 2026-02-10 (subject "EcoWall"). Captured verbatim from the email body with the two referenced charts inline-linked.
**Why it matters:** Contains three engineering-credibility concepts that are NOT in the brochures or pitch deck — the modulus-of-elasticity narrative (380K psi industry default vs 800K achievable, currently published at 550K with 3× safety factor still applied), the "hybrid vs. composite" terminology framing, and the product roadmap (current .225"/18" + .25"/24"; future .3-.35" panel competing with .5" market profiles; eventual sub-.5" panel competing with CMI's SG-950 ¾" beast). Lift these three concepts directly onto slides.

### `chart-1-allowable-moment-same-thickness.png` (228 KB)
**Source:** Inline image from Austin's EcoWall explainer emails to Clay (2026-02-18) and Arthur (2026-03-13). Note: this chart appears to be the same comparison shown on slide 7 of `Shoreline Pitch Deck excerpts.pdf` — the deck is the higher-resolution version of this same data.
**What it shows:** EcoWall 24.250 (5,979 ft-lb/ft allowable moment) vs SG-325 (2,960 ft-lb/ft) and ESP 3.1 (3,129 ft-lb/ft) — all at the same .25" thickness. EcoWall is ~2× stronger at the same thickness/weight/price.
**Use it for:** the "we beat the same-priced competition" headline slide. Pair with the email's narrative explanation.

### `chart-2-allowable-moment-vs-thicker-competitors.png` (240 KB)
**Source:** Same email threads as Chart 1.
**What it shows:** EcoWall 24.250 at .25" thick vs. competitors at heavier .375" and .385" thicknesses. Even when competitors upsize to the next thickness tier, EcoWall ties or beats them — at 65–67% of the competitor thickness (and proportionally less material/weight/cost).
**Use it for:** the "even competitors' upsize doesn't beat us" slide — the second move in the engineering argument after Chart 1.

### `master-vinyl-sheet-pile-comparison-table.png` (448 KB)
**Source:** Embedded in Austin's email to Clay (2026-02-18) only — not part of Josh's or Arthur's send. This is Shoreline's internal master spec comparison spreadsheet showing many manufacturer profiles side-by-side (CMI, Pearson, EverLast, Truline, Shoreline, etc.) with thickness, depth, width, allowable moment, section modulus, weight per linear foot, and stiffness ratios.
**Use it for:** the engineering-credibility appendix or a "where EcoWall sits in the broader category" credibility slide. Probably too dense for a standalone slide; better as a leave-behind handout or a zoomable detail in an appendix.

### `Compound stiffness test.mov` (7.7 MB)
**Source:** Attached to all three EcoWall explainer emails (Josh / Clay / Arthur) in early 2026.
**What it is:** A ~7-year-old side-by-side flex test. Austin's description in the email body: *"The blue pipe is our standard rigid material used for mining pipe, and the grey pipe is our first ever successful run of the fiber compound where we got the fibers to bond properly. Since this video was taken 7 years ago, we've more than doubled the number of fibers and rigidity in the formulation."*
**Use it for:** **the strongest single demo asset for the EcoWall slide.** Visceral, audio-free (perfect for a training-room context), and shows the underlying material technology that everything else in the seawall pitch is built on. Open the EcoWall section with this clip if possible. Note that current product is ~2× stiffer than what the video shows — call that out in the slide caption.

---

## `spec-sheets/`

### `EcoWall 24.25 spec sheet.pdf` (452 KB)
**Source:** Accompanied the EcoWall informational packet in all three 2026 prospect emails (Arthur, Clay, Josh). This is the **24.25-profile sheet** — wider/deeper section, higher allowable moment. The pitch deck's headline comparison table (`5,979 ft-lb/ft allowable moment vs ~3,000 for competitors`) refers to this profile.

### `EcoWall 18 spec sheet.pdf` (367 KB)
**Source:** Same prospect threads — paired with the 24.25 sheet. Smaller profile for lighter-duty applications.

### `EcoWall 24.25 spec sheet (editable).docx` (537 KB) and `EcoWall 18.225 spec sheet (editable).docx` (375 KB)
**Source:** "SEAWALL PRINT SHEETS" thread, 2025-09-15, internal between Austin and Mark Porter.
**What they are:** The Word-source masters of the spec sheets above. **Editable.** Use these if the slide-building agent needs to extract structured data (tables, dimensions, callouts) — a Word doc is much easier to parse than a finished PDF. Also useful if anything needs to be updated before Tuesday.

---

## Photos (moved to `../photos/`)

The installation photos that originally lived in this folder have been consolidated into the **`photos/`** folder at the seawall level (one folder up from this README). They were renamed to a numbered `seawall1.jpg` through `seawall9.jpg` convention and split into `photos/full-res/` and `photos/scaled/` (1280 px max long-edge).

See **`../photos/README.md`** for the full mapping (which photo = which scene + recommended slide use). The `seawall-dims-1.png` and `seawall-dims-2.png` cross-section drawings are now in `../photos/diagrams/`.

---

## `drawings/`

### `24in-sheet-pile-imperial-measurements.pdf` (101 KB) and `24in-sheet-pile-metric-measurements.pdf` (102 KB)
**Source:** "seawall drawings" thread, 2025-12-03 — Austin to Mario. *"I've attached some models of the 24'' sheet pile panel. One is a standard dxf file for the 2d drawing, along with measurement and 3d files."*
**What they are:** Cleanly-dimensioned 2D drawings of the 24" EcoWall panel — both imperial and metric versions. **Likely the single best source for any "what does this thing look like" engineering slide.**

### `24in-sheet-pile.dxf` (11 KB) and `24in-sheet-pile-3d.step` (135 KB)
**Source:** Same Mario thread, 2025-12-03.
**What they are:** Editable CAD files. DXF for 2D AutoCAD-compatible drafting; STEP for 3D modeling (SolidWorks / Fusion / etc.).
**Use it for:** if the slide-building agent has access to a CAD-render tool, these can be turned into clean axonometric or section renders. Otherwise they're a leave-behind for engineer-customers who want to do their own drafting.

### `18in-panel-v1.step` and `24in-panel-v7.step` (~125 KB each)
**Source:** "Seawall designs" thread, 2025-01-20 — Austin internal. *"Pops told me to send you these..."*
**What they are:** 3D design masters of the 18" and 24" EcoWall panels. The "v1" / "v7" suffixes indicate these are the working CAD masters used for tooling and revision tracking.
**Use it for:** same as the other STEP file — engineer leave-behind, or feed to a CAD render pipeline.

---

## What we did NOT pull (and why)

Of the 109 attachments retrieved from 29 seawall-related email threads, the rest were filtered out as one of:

- **Email signature graphics** (image001.png, image002.png — appear in nearly every Outlook-sent email)
- **Email banners** (waterfront-email-banner*.png)
- **Wrong product** (Pile Doctor postcards from a separate marketing campaign)
- **Customer-specific engineering plans** (Thompson Plans_DS.pdf — a 5.6 MB engineering set for a specific SKS Aquatic customer; could be confidential)
- **Administrative paperwork** (credit application PDFs, invoices, China shipment manifest)
- **Pensacola Beach contract docs** (signed contracts and permits — not pitch material)
- **Logo design drafts** (Outlook-m4vzwony.jpg etc. from the EcoWall logo thread)

If you specifically want any of those, the originals are still on the VPS at `~/seawall-attachments/` — just ask and I'll pull more.

---

## How to delete / clean up later

If you want to wipe the source archive on the VPS after copying what you need:

```bash
ssh openclaw 'rm -rf ~/seawall-attachments ~/seawall-curated /tmp/seawall-emails.json /tmp/fetch-attachments.js /tmp/curate_seawall.py'
```
