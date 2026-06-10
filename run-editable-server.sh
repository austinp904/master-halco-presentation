#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"
exec /opt/homebrew/bin/python3 -u serve-editable.py --host 127.0.0.1 --port 4179
