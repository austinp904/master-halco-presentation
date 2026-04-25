# Claude Design — Copy-Paste Prompt

Open Claude Design, start a new project in **Slide Deck** mode, paste
the prompt below as your first message, and replace `{{REPO_URL}}` with
the GitHub URL of this folder. That's it.

---

## Main prompt — copy from here ⬇

I'm building a slide deck for a vendor training presentation. **Open this GitHub folder first and read `README.md` at the root before doing anything else** — it contains the full brief, design system, brand palette, callout component spec, animation primitives, folder map, per-section guidance, and rules of engagement:

**{{REPO_URL}}**

The README is the source of truth. Treat everything below as a quick orientation, not a substitute.

### TL;DR

- **Audience:** Master Halco regional salespeople (Region 8, Florida). Not contractors. They need to walk away able to *sell* Shoreline products to their existing customer base.
- **Live presenter:** Austin Porter (VP Sales & Marketing), Shoreline Plastics. ~30–45 min content slot. ~20–28 slides total.
- **Three products covered, in this order:** EcoPile (deepest), SnapJacket (deep), EcoWall (preview only — be candid about that).
- **Deliverable:** complete slide deck, click-triggered reveals, no auto-advance.

### Design system (full spec lives in README.md §2 — this is the headline)

- **Aesthetic:** *Apple product-keynote energy meets web3 sci-fi HUD, restrained by industrial product gravitas.* Pure black void background. One product or one number per slide, lit theatrically.
- **Brand palette (locked):** cyan `#00B5E2`, royal blue `#1E40FF`, light blue `#7AB7E8`, neon green `#5FB85F`, on `#0A0A0A` near-black with a subtle radial vignette pulled from the upper-right and lower-right corners. Whites and a single muted-gray for secondary text. **Do not introduce other colors.**
- **Typography:** geometric extended sans, all caps for callouts and display, weight 600–700, moderate tracking. Saira Condensed / Bahnschrift / Eurostile / Rajdhani all work.
- **Glassmorphism — strictly limited.** Use frosted-glass panels only for: opening hero card, section-divider title plates, the channel cheat-sheet card on the "how to order" slide, navigation chrome. **Never** apply glass to on-product HUD callouts — those are solid blocks.
- **HUD callouts** (anchored to product photos with a thin white connector line ending in a `[ • ]` bracket reticle): three styles, fully spec'd in `ecopiile/explainer-keyframes/visual-language.md`. Use them across all three product sections, not just EcoPile.
- **Animation:** click-triggered reveals only. Stagger sequential elements 80–120 ms apart. Easings + durations are in the README.
- **EcoPile section animation choreography** mirrors the existing 3D explainer — capstock peels off to reveal the slate-blue speckled substrate, pile splits at an angle to show the hexagram (six-point star) internal truss, callouts pulse with neon-green emission glows. 40 keyframes from the source video are at `ecopiile/explainer-keyframes/`. Use those keyframes as visual references, then translate the choreography into web/CSS using the design system.

### Build order

Start by producing the **complete deck end-to-end** in one pass — don't ask for confirmation between sections. I'll review and request edits per slide afterward. Section order is fixed:

1. Opening — Who is Shoreline & why now (~3 slides). Open with the CCA / EPA hook: 2.5 million gallons of CCA into Florida waterways every year, modern wood pilings failing in less than half their historical lifespan.
2. Product platform overview (1 slide).
3. EcoPile deep-dive (~8–10 slides). Hurricane Sally proof point — *2,000+ poles, zero confirmed losses* — gets a hero treatment. Cross-section reveal mimics the explainer choreography.
4. SnapJacket deep-dive (~6–8 slides). Slide arc follows the video transcript at `snapjacket/snapjacket-explainer-transcript.txt`. Use the before/after photos as a click-toggle reveal.
5. EcoWall preview (~3–4 slides). Land the headline: 5,979 ft-lb/ft allowable moment vs. competitors at 3,129 and 2,960 — same 0.25" thickness, same market price. Animate the bar chart.
6. How to sell + how to order (~2–3 slides). Channel cheat-sheet as a glassmorphism card.
7. Closer (1 slide). Logo plate, one line, fade-in.

### Hard rules

- **Lift verbatim** the tagline lines, exact quotes, and specific numbers marked in the talking-points files. Don't reword.
- **Do not invent specs.** Every cited number must trace to a talking-points file, brochure PDF, or pitch-deck excerpt in the repo.
- **EcoPile warranty is 50 years**, not 25 — the older brochure has the wrong number; the README's rules-of-engagement section explains.
- **Out of scope** (do not render in any slide): Master Halco contact phone numbers / emails / specific dealer-partner contact names. Those live in MASTER-TALKING-POINTS.md as Austin's prep reference only.
- **White-label-ready** — the deck will be re-skinned by Master Halco with their own branding. Build with a clean master template so the logo and primary color are swappable.

When you're done with the first pass, give me a one-screen summary listing every slide by title so I can flag what to refine.

## ⬆ End of copy-paste prompt

---

## Tips for using this prompt

1. **Replace `{{REPO_URL}}` with the actual public GitHub URL** of this folder before pasting. Sample format: `https://github.com/austinp904/master-halco-presentation`.
2. **Wait for Claude Design to read the README before answering further questions.** It will likely produce the slide titles list before it starts rendering individual slides.
3. **For section-level edits afterward**, paste a short follow-up like:
   > Rebuild the EcoPile cross-section reveal slide. Same data, but use Style B outline-only callouts on the cell-highlight rather than Style A solid blocks. Cite the visual-language doc.
4. **For palette/typography tweaks**, point at README.md §2 and ask for a specific token change.
5. **If Claude Design suggests something that contradicts the README**, ask it to re-read the rules-of-engagement section and try again.
