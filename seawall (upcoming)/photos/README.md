# Seawall Photos — Filename Mapping

Photos are numbered `seawall1.jpg` through `seawall9.jpg` for easy reference. Each photo exists in two resolutions:

- **`full-res/`** — original photo at native resolution (use for printed materials, large-screen presentations, or anywhere maximum image quality matters)
- **`scaled/`** — same photos resized to **1280 px on the longest edge** at JPEG quality 85, optimized for web/Claude Design embeds. Total size ~2.3 MB across all 9 (vs ~11 MB at full res).

Use `scaled/` by default. Switch to `full-res/` only when slide quality demands it.

`diagrams/` is a separate folder for technical drawings (cross-sections, dimensional analysis) — those are not photos and aren't part of the numbered set.

---

## What each photo shows

| File | Source | What it shows | Recommended slide use |
| --- | --- | --- | --- |
| **seawall1.jpg** | IMG_7512.JPG (factory) | Stack of EcoWall panels in the Jacksonville factory with workers gathered around — exposes the actual interlocking panel profile | **Hero product shot.** Open the EcoWall slide section here. Best image for "this is what the panel looks like." |
| **seawall2.jpg** | IMG_7930.jpg | Excavator with hydraulic hammer driving an EcoWall panel into a finished bulkhead next to a body of water — real install in progress | **Hero action shot.** "Here's how it goes in." Pairs naturally with seawall1 in the same slide. |
| **seawall3.jpg** | "EcoPile Seawall pics" thread, Austin to Jimmy Wear, 2025-04-29 | EcoPile-based seawall mid-construction — dead-men, batter angles, bolted connections (the 3-year-old project Austin references in talking points) | Construction-method slide. Pair with the architecture diagram for "this is how the system goes together." |
| **seawall4.jpg** | Same thread as seawall3 | Second view of the under-construction wall | Supporting visual to seawall3, or use one or the other based on framing. |
| **seawall5.jpg** | "Bulkhead" thread, Tom Fleming to Austin, 2026-01-23 | Finished customer bulkhead — fills Austin's "I can't find finished pictures" gap | "Real customer outcome" slide or appendix. |
| **seawall6.jpg** | Same Tom Fleming thread | Finished customer bulkhead, second angle | Same as seawall5. Pick the better composition. |
| **seawall7.jpg** | Same Tom Fleming thread | Finished customer bulkhead, third angle | Same as seawall5/6. |
| **seawall8.jpg** | Original `eco_kingpile (2).jpg` (also surfaced in 2025-12-29 SKS Aquatic thread) | KingPile profile / cross-section detail | "What is KingPile?" intro visual — the heavy-duty EcoPile variant used as the structural member in seawalls. |
| **seawall9.jpg** | IMG_7463 (1).JPG (factory) | Sheet pile extrusion line equipment | Made-in-USA / manufacturing-credibility slide. |

---

## Image dimensions (after scaling)

| File | Scaled dimensions (px) | Full-res size | Scaled size | Reduction |
| --- | --- | --- | --- | --- |
| seawall1.jpg | 1280 × 960 (landscape) | 4.9 MB | 280 KB | 5.7% |
| seawall2.jpg | 730 × 1280 (portrait) | 440 KB | 168 KB | 38.3% |
| seawall3.jpg | 1280 × 853 (landscape) | 485 KB | 241 KB | 49.8% |
| seawall4.jpg | 1280 × 853 (landscape) | 441 KB | 216 KB | 49.1% |
| seawall5.jpg | 960 × 1280 (portrait) | 528 KB | 306 KB | 57.9% |
| seawall6.jpg | 960 × 1280 (portrait) | 785 KB | 427 KB | 54.4% |
| seawall7.jpg | 960 × 1280 (portrait) | 578 KB | 311 KB | 53.8% |
| seawall8.jpg | 1280 × 484 (wide profile shot) | 436 KB | 167 KB | 38.2% |
| seawall9.jpg | 960 × 1280 (portrait) | 2.2 MB | 215 KB | 9.8% |

EXIF rotation has been applied during scaling, so portrait images are correctly oriented in `scaled/`. The originals in `full-res/` retain their EXIF metadata as captured.

---

## How to add new photos

1. Drop the new photo into the seawall folder (anywhere — the seawall root, `email-attachments/`, etc.).
2. Decide its priority position in the numbered set (insert in the middle and renumber, or append as `seawallN+1`).
3. Ask Claude to "regenerate the seawall photos" — the resize pipeline takes ~30 seconds and updates this README.

If you want to bypass Claude, the resize command on the VPS is:

```bash
# (originals must already be in /home/austin/seawall-resize/full-res/)
python3 /tmp/resize_photos.py
```

(Script source: `email-brain/_pipeline` history / saved at C:\Users\Admin\AppData\Local\Temp\resize_photos.py during the last run.)
