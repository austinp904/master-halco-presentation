# Master Halco Vendor-Pitch Talking Points — Design Spec

**Date:** 2026-04-25
**Project folder:** `~/Projects/shoreline/master halco presentation/`
**Goal:** Produce reference Markdown files that a downstream slide-building agent (Claude design feature) can pull from to build a presentation pitching Shoreline Plastics products to Master Halco's sales team.

## Audience

Master Halco is a fence/post distributor that Shoreline Plastics recently signed as a vendor. The presentation goes to **Master Halco salespeople**, who will resell to contractors, property owners, and municipalities. So talking points must:

- Make a Master Halco rep sound credible after one read.
- Anticipate the questions their customers will ask them.
- Be lift-and-drop usable by the slide-building agent (flowing prose, not bullet skeletons).

## Products covered

1. **SnapJacket** — marine repair piling jacket
2. **EcoPile** — recycled-plastic structural piling (KingPile variant included)
3. **Seawall (upcoming)** — early-stage product line; lean source material

## Sources (parallel ingest)

| Source | Method | Voice | Cost |
| --- | --- | --- | --- |
| Email-brain vault (~1,800 threads, ~50+ product-relevant) | Local `Explore` subagent | Customer voice / objections / case studies | Anthropic tokens (subagent-isolated) |
| Public web pages (3 URLs) | Local `general-purpose` subagent w/ WebFetch | Marketing voice / public positioning | Anthropic tokens (subagent-isolated) |
| Brochure / pitch-deck PDFs | Direct `Read` by main agent | Authoritative spec / feature voice | Direct context |

URLs:
- https://shorelineplastics.com/
- https://shorelineplastics.com/ecopile/
- https://shorelineplastics.com/snapjacket-marine-repair-piling/

PDFs:
- `master halco presentation/Shoreline Pitch Deck excerpts.pdf`
- `master halco presentation/ecopiile/ecopile brochure (2).pdf`
- `master halco presentation/snapjacket/Copy of SnapJacketBrochure102418 (1).pdf`
- `master halco presentation/snapjacket/snapjacket-submittal-and-application.pdf`

## Deliverables

Four Markdown files inside the presentation folder:

1. **`MASTER-TALKING-POINTS.md`** (root)
   - "Why Shoreline, why now" narrative
   - How the three product lines fit together
   - Cross-product themes (longevity, sustainability, ease of install, made-in-USA, etc.)
   - Key proof points / numbers
   - Master-Halco-specific framing (their distribution channels, fence-adjacent product fit, etc., pulled from any Master Halco-specific email threads)
   - "Suggested presentation flow" — guidance for the slide-building agent on narrative arc

2. **`snapjacket/talking-points.md`**
3. **`ecopiile/talking-points.md`**
4. **`seawall (upcoming)/talking-points.md`**

Each per-product file follows the same structure:

- **What it is** (one-paragraph plain-language explainer)
- **Problem it solves** (the customer's pain point)
- **Materials & specs** (sizes, materials, certifications, weight, color, etc.)
- **Install workflow** (high-level)
- **Differentiators** (vs. concrete, vs. wood, vs. competitor alternatives)
- **Common customer questions & answers** (sourced from email exchanges)
- **Common objections & responses** (sourced from email exchanges)
- **Real project case studies** (location + scope + outcome — anything concrete from emails)
- **Pricing posture** (no actual numbers — the *style* of pricing conversations: dealer pricing, promo windows, volume tiers)
- **Demo-ready stories** (compelling anecdotes for the pitch)
- **Suggested visuals** (point to existing photos / PDFs in the folder)
- **Failure modes / known issues** (e.g., the cracked Eastern Marine snap jacket — handled candidly)

Style: flowing paragraphs (~1,500–2,500 words per product file), not bullet lists. Slide-builder can compress as needed; expanding bullets is harder than condensing prose.

## Out of scope (YAGNI)

- Building actual slides — that's the next agent's job in a fresh chat.
- Generic vault summarization — only product-relevant subset.
- Creating new vault notes — outputs land in the presentation folder only.
- Actual pricing numbers — too sensitive / volatile; reference pricing *behavior* only.

## Execution order

1. Write spec doc + dispatch both subagents in parallel + start reading PDFs.
2. While subagents run, finish reading PDFs.
3. Subagents return; synthesize all sources.
4. Write `MASTER-TALKING-POINTS.md` + three per-product files.
5. Hand off — user opens a fresh chat in the presentation folder and starts on slides.

## Success criteria

- Slide-building agent in a fresh chat can read these four files alone and produce a credible draft pitch deck without re-querying the email vault, the web, or the PDFs.
- A Master Halco rep handed the per-product files alone (no slides) could field 80% of expected customer questions.
- Each per-product file includes at least 3 named real-world case studies.
