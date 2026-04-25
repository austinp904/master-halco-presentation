"""Pull a clean transcript for the SnapJacket YouTube video.

Tries youtube-transcript-api first (clean, segmented text). Falls back to
parsing the .vtt files yt-dlp already saved if the API approach fails.
"""
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
VIDEO_ID = "_abnFsl8UYQ"
OUT_PATH = os.path.join(HERE, "snapjacket-explainer-transcript.txt")


def fmt_ts(seconds: float) -> str:
    m, s = divmod(int(seconds), 60)
    return f"[{m:02d}:{s:02d}]"


def via_api():
    from youtube_transcript_api import YouTubeTranscriptApi
    api = YouTubeTranscriptApi()
    fetched = api.fetch(VIDEO_ID, languages=["en"])
    lines = []
    for snippet in fetched:
        lines.append(f"{fmt_ts(snippet.start)} {snippet.text.replace(chr(10), ' ').strip()}")
    return "\n".join(lines)


def via_vtt():
    """Fallback: parse the .en.vtt yt-dlp saved, dedupe rolling captions."""
    vtt_path = os.path.join(HERE, "snapjacket-explainer.en.vtt")
    if not os.path.exists(vtt_path):
        vtt_path = os.path.join(HERE, "snapjacket-explainer.en-orig.vtt")
    text = open(vtt_path, encoding="utf-8").read()
    blocks = text.split("\n\n")
    lines = []
    last = None
    for b in blocks:
        ls = [l for l in b.splitlines() if l and not l.startswith("WEBVTT") and "Kind:" not in l and "Language:" not in l]
        if not ls:
            continue
        ts_line = next((l for l in ls if "-->" in l), None)
        if not ts_line:
            continue
        start = ts_line.split("-->")[0].strip().split(".")[0]
        h, m, s = (int(x) for x in start.split(":"))
        secs = h * 3600 + m * 60 + s
        body = " ".join(l for l in ls if "-->" not in l)
        body = re.sub(r"<[^>]+>", "", body).strip()
        if not body or body == last:
            continue
        lines.append(f"{fmt_ts(secs)} {body}")
        last = body
    return "\n".join(lines)


def main():
    try:
        out = via_api()
        source = "youtube-transcript-api"
    except Exception as e:
        print(f"API path failed ({e}); falling back to .vtt parse", file=sys.stderr)
        out = via_vtt()
        source = "vtt-fallback"

    with open(OUT_PATH, "w", encoding="utf-8") as f:
        f.write(f"# SnapJacket Explainer Transcript\n")
        f.write(f"# Source: youtube.com/watch?v={VIDEO_ID}\n")
        f.write(f"# Method: {source}\n\n")
        f.write(out + "\n")
    print(f"Wrote {OUT_PATH} ({len(out.splitlines())} lines, source={source})")


if __name__ == "__main__":
    main()
