"""Extract keyframes from ecopile 3d explainer draft.mp4 at user-specified timestamps."""
import os
import subprocess
import sys
import imageio_ffmpeg

FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
HERE = os.path.dirname(os.path.abspath(__file__))
INPUT = os.path.join(HERE, "ecopile 3d explainer draft.mp4")
OUTDIR = os.path.join(HERE, "explainer-keyframes")
os.makedirs(OUTDIR, exist_ok=True)

# (seconds, label) — labels chosen so sorted listing reads as a storyboard
SHOTS = [
    (4.0,    "00-04-logo-intro-pole-top"),
    (7.0,    "00-07-pan-down-mid"),
    (10.0,   "00-10-pan-down-bottom"),
    (14.0,   "00-14-traveling-callout"),
    (19.0,   "00-19-callout-gone-bottom"),
    (24.0,   "00-24-zoom-out-starts"),
    (28.0,   "00-28-wide-full-pole"),
    (28.5,   "00-28_5-capstock-pull-A"),
    (29.0,   "00-29-capstock-pull-B"),
    (29.3,   "00-29_3-capstock-pull-C"),
    (29.7,   "00-29_7-capstock-pull-D"),
    (30.0,   "00-30-capstock-pull-E-blue-substrate"),
    (31.0,   "00-31-substrate-callout-1"),
    (36.0,   "00-36-zoom-back-up-mid"),
    (41.0,   "00-41-substrate-callout-2"),
    (46.0,   "00-46-capstock-flies-back-A"),
    (47.0,   "00-47-capstock-flies-back-B"),
    (48.0,   "00-48-capstock-callout-enters"),
    (49.5,   "00-49_5-capstock-callout-blink-A"),
    (50.5,   "00-50_5-capstock-callout-blink-B"),
    (51.5,   "00-51_5-capstock-callout-blink-C"),
    (54.0,   "00-54-capstock-callout-2"),
    (62.0,   "01-02-closeup-pole-top"),
    (63.5,   "01-03_5-webbing-callout-blink-A"),
    (65.0,   "01-05-webbing-callout-blink-B"),
    (66.5,   "01-06_5-webbing-callout-blink-C"),
    (73.0,   "01-13-stiffness-easy-handling-callout"),
    (76.0,   "01-16-second-callout-rotation-A"),
    (79.0,   "01-19-second-callout-rotation-B"),
    (81.0,   "01-21-pole-splits-top-flies-up"),
    (87.0,   "01-27-webbing-benefits-rotating-blink"),
    (93.0,   "01-33-zoom-out-rejoin-starts"),
    (96.0,   "01-36-rejoin-complete"),
    (98.0,   "01-38-bottom-grooves-view"),
    (100.0,  "01-40-groove-callout-1"),
    (107.0,  "01-47-groove-callout-2"),
    (113.0,  "01-53-groove-callout-3"),
    (121.0,  "02-01-zoom-out-final"),
    (125.0,  "02-05-warranty-callout"),
    (132.0,  "02-12-final-logo-fade"),
]

errors = []
for ts, label in SHOTS:
    out = os.path.join(OUTDIR, f"{label}.jpg")
    cmd = [
        FFMPEG, "-y", "-loglevel", "error",
        "-ss", f"{ts:.3f}",
        "-i", INPUT,
        "-frames:v", "1",
        "-q:v", "3",
        "-update", "1",
        out,
    ]
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        errors.append((label, r.stderr.strip()))
        print(f"FAIL {label}: {r.stderr.strip()[:200]}")
    else:
        print(f"OK   {ts:6.2f}  {label}")

print(f"\nDone. {len(SHOTS) - len(errors)}/{len(SHOTS)} frames extracted to {OUTDIR}")
if errors:
    sys.exit(1)
