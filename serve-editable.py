#!/usr/bin/env python3
"""Local static server with a tiny endpoint for presentation text edits."""

from __future__ import annotations

import argparse
import json
import os
import tempfile
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


ROOT = Path(__file__).resolve().parent
EDIT_FILE = ROOT / "ecopile-architect-presentation" / "text-edits.json"
MAX_BODY_BYTES = 1_000_000


class EditableDeckHandler(SimpleHTTPRequestHandler):
    def do_POST(self) -> None:
        if self.path != "/__save-edits":
            self.send_error(HTTPStatus.NOT_FOUND)
            return

        try:
            length = int(self.headers.get("Content-Length", "0"))
        except ValueError:
            self.send_error(HTTPStatus.BAD_REQUEST, "Invalid Content-Length")
            return

        if length <= 0 or length > MAX_BODY_BYTES:
            self.send_error(HTTPStatus.REQUEST_ENTITY_TOO_LARGE, "Invalid edit payload size")
            return

        try:
            payload = json.loads(self.rfile.read(length).decode("utf-8"))
            if not isinstance(payload, dict) or "items" not in payload:
                raise ValueError("Payload must be an object with an items array")
        except Exception as exc:
            self.send_error(HTTPStatus.BAD_REQUEST, f"Invalid JSON: {exc}")
            return

        EDIT_FILE.parent.mkdir(parents=True, exist_ok=True)
        fd, tmp_name = tempfile.mkstemp(prefix=".text-edits.", suffix=".json", dir=str(EDIT_FILE.parent))
        try:
            with os.fdopen(fd, "w", encoding="utf-8") as handle:
                json.dump(payload, handle, indent=2, ensure_ascii=False)
                handle.write("\n")
            os.replace(tmp_name, EDIT_FILE)
        finally:
            if os.path.exists(tmp_name):
                os.unlink(tmp_name)

        response = json.dumps({"ok": True, "path": str(EDIT_FILE), "itemCount": len(payload.get("items", []))})
        body = response.encode("utf-8")
        self.send_response(HTTPStatus.OK)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)


def main() -> None:
    parser = argparse.ArgumentParser(description="Serve the editable EcoPile presentation locally.")
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--port", default=4179, type=int)
    args = parser.parse_args()

    os.chdir(ROOT)
    server = ThreadingHTTPServer((args.host, args.port), EditableDeckHandler)
    print(f"Serving editable deck at http://{args.host}:{args.port}/ecopile-architect-presentation/index.html")
    print(f"Saving edits to {EDIT_FILE}")
    server.serve_forever()


if __name__ == "__main__":
    main()
