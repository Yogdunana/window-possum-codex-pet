#!/usr/bin/env bash
set -euo pipefail

PET_ID="window-possum"
SOURCE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/${PET_ID}"
TARGET_ROOT="${CODEX_HOME:-$HOME/.codex}/pets"
TARGET_DIR="${TARGET_ROOT}/${PET_ID}"

if [[ ! -f "${SOURCE_DIR}/pet.json" || ! -f "${SOURCE_DIR}/spritesheet.webp" ]]; then
  echo "Could not find ${PET_ID}/pet.json and ${PET_ID}/spritesheet.webp next to install.sh." >&2
  exit 1
fi

mkdir -p "${TARGET_ROOT}"
rm -rf "${TARGET_DIR}"
cp -R "${SOURCE_DIR}" "${TARGET_DIR}"

# Verify installation
if [[ ! -f "${TARGET_DIR}/pet.json" ]]; then
  echo "Installation verification failed: pet.json not found at ${TARGET_DIR}/pet.json" >&2
  exit 1
fi

if [[ ! -f "${TARGET_DIR}/spritesheet.webp" ]]; then
  echo "Installation verification failed: spritesheet.webp not found at ${TARGET_DIR}/spritesheet.webp" >&2
  exit 1
fi

echo "Installed Window Possum to ${TARGET_DIR}"
echo "Open Codex > Settings > Appearance > Pets > Refresh local pets, then select Window Possum."
