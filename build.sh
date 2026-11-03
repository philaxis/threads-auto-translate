#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p dist
zip -r -FS dist/threads-auto-translate.xpi manifest.json content.js background.js icons _locales
