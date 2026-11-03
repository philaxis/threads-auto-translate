<img src="icons/icon-128.png" width="96" alt="">

# Threads Auto-Translate

English · [한국어](README.ko.md) · [繁體中文](README.zh-TW.md)

A small Firefox extension that clicks the **Translate** button under foreign-language posts on Threads (threads.com) for you.
Translation is Threads' own built-in feature; this extension only clicks the button.

## Install

1. In Firefox, open this link → **[Download threads-auto-translate.xpi](https://github.com/philaxis/threads-auto-translate/releases/latest/download/threads-auto-translate.xpi)**
2. Drag the downloaded file anywhere into the Firefox window.
3. Click **Add** in the dialog that appears.

The file is signed by Mozilla, so it installs in regular Firefox and updates automatically when a new version is released.
Chrome is not supported.

## What it does

- Clicks the translate button only on posts near the screen, one at a time, 150 ms apart.
- Posts you switch back with **See original** are not translated again.
- Click the toolbar icon to turn it on or off. When it is off, the icon shows `OFF`.
- Finds buttons by their label only: `번역하기`, `번역 보기`, `Translate`, `See translation`, `翻譯`, `翻译`, `翻訳` (Korean, English, Chinese Traditional, Chinese Simplified, Japanese).

## Privacy

It collects and sends no data. The only permission it asks for is `storage`, used to save the on/off setting, and it runs only on the Threads site.
The whole code is `content.js` (94 lines) and `background.js`, so you can read it yourself.

## Notes

This is an unofficial extension made by an individual, not affiliated with Meta or Threads. "Threads" is a trademark of Meta Platforms, Inc.
If the Threads page structure changes, the extension may stop working until it is fixed.

## Development

- Test install: `about:debugging#/runtime/this-firefox` → **Load Temporary Add-on** → `manifest.json`
- Release a new version:
  1. Bump `version` in `manifest.json`.
  2. Sign in a folder containing only the extension files (manifest.json, content.js, background.js, icons, _locales).
     ```bash
     npx web-ext sign --channel=unlisted --source-dir <folder> --artifacts-dir signed \
       --api-key "$WEB_EXT_API_KEY" --api-secret "$WEB_EXT_API_SECRET"
     ```
  3. Upload the signed file to the GitHub release (`v<version>`) with the name `threads-auto-translate.xpi`.
  4. Add the new version to `updates.json`. Installed Firefox reads this file and updates automatically.
