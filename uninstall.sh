#!/usr/bin/env bash
set -euo pipefail

PET_ID="window-possum"
TARGET_ROOT="${CODEX_HOME:-$HOME/.codex}/pets"
TARGET_DIR="${TARGET_ROOT}/${PET_ID}"

if [[ ! -d "${TARGET_DIR}" ]]; then
  echo "Window Possum is not installed at ${TARGET_DIR}." >&2
  exit 1
fi

rm -rf "${TARGET_DIR}"

echo "Uninstalled Window Possum from ${TARGET_DIR}"
echo "Thanks for having me. The possum will now gaze out a different window."
