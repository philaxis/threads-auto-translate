#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

FILES=(manifest.json content.js background.js icons _locales)

mkdir -p dist

rm -f dist/threads-auto-translate.xpi
zip -r -FS dist/threads-auto-translate.xpi "${FILES[@]}"

rm -rf dist/chrome
mkdir -p dist/chrome
cp -R content.js background.js icons _locales dist/chrome/
python3 - <<'PY'
import json

with open("manifest.json", encoding="utf-8") as f:
    m = json.load(f)

m.pop("browser_specific_settings", None)
m["background"] = {"service_worker": "background.js"}
m["minimum_chrome_version"] = "102"

with open("dist/chrome/manifest.json", "w", encoding="utf-8") as f:
    json.dump(m, f, ensure_ascii=False, indent=2)
    f.write("\n")
PY

rm -f dist/threads-auto-translate-chrome.zip
(cd dist/chrome && zip -r -FS ../threads-auto-translate-chrome.zip "${FILES[@]}")
