#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$SCRIPT_DIR/.."

# Optional overrides via env or positional args
RFP="${1:-RFP/Customer Portal - RFP.md}"
OUTPUT="${2:-output/FL.md}"
MODEL="${3:-claude-sonnet-4-6}"

if ! command -v claude &>/dev/null; then
  echo "ERROR: 'claude' CLI not found. Install Claude Code: https://claude.ai/code" >&2
  exit 1
fi

cd "$ROOT"
"$ROOT/.venv/bin/python" scripts/extract_requirements.py \
  --rfp "$RFP" \
  --output "$OUTPUT" \
  --model "$MODEL" \
  --gaps
  