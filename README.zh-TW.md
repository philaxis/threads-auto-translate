<img src="icons/icon-128.png" width="96" alt="">

# Threads Auto-Translate

[English](README.md) · [한국어](README.ko.md) · 繁體中文

這是一個小型 Firefox 擴充套件，會替你在 Threads（threads.com）的外語貼文下方按下 **翻譯** 按鈕。
翻譯本身是 Threads 原有的功能，這個擴充套件只負責按按鈕。

## 安裝

1. 在 Firefox 中點這個連結 → **[下載 threads-auto-translate.xpi](https://github.com/philaxis/threads-auto-translate/releases/latest/download/threads-auto-translate.xpi)**
2. 把下載的檔案拖到 Firefox 視窗的任何位置。
3. 在跳出的視窗按 **新增** 即可。

檔案經過 Mozilla 簽署，可直接安裝在一般 Firefox 中，有新版本時會自動更新。
Chrome、Edge、Brave 等 Chromium 瀏覽器版本正在 Chrome 線上應用程式商店審核中（連結稍後補上）。

## 功能

- 只按畫面附近外語貼文的翻譯按鈕，間隔 0.15 秒，一次按一個。
- 用 **查看原文** 還原的貼文不會再被翻譯。
- 按工具列圖示可以開啟或關閉。關閉時圖示會顯示 `OFF`。
- 只依按鈕文字（`번역하기`、`번역 보기`、`Translate`、`See translation`、`翻譯`、`翻译`、`翻訳`）尋找按鈕，支援韓文、英文、中文（繁體、簡體）、日文介面。

## 隱私

不收集、不傳送任何資料。要求的權限只有儲存開關設定的 `storage` 一個，且只在 Threads 網站上運作。
程式碼全部只有 `content.js`（94 行）和 `background.js`，可以直接自行閱讀。

## 請注意

這是個人製作的非官方擴充套件，與 Meta、Threads 無關。「Threads」是 Meta Platforms, Inc. 的商標。
如果 Threads 的頁面結構改變，擴充套件可能在修好之前無法運作。

## 開發

- 在 `dist/` 產生兩個套件（Firefox `.xpi` 與 Chrome 線上應用程式商店用 `.zip`）：`bash build.sh`
- 測試安裝：`about:debugging#/runtime/this-firefox` → **載入臨時附加元件** → `manifest.json`
- 發布新版本：
  1. 提高 `manifest.json` 的 `version`。
  2. 在只包含擴充套件檔案（manifest.json、content.js、background.js、icons、_locales）的資料夾中簽署。
     ```bash
     npx web-ext sign --channel=unlisted --source-dir <資料夾> --artifacts-dir signed \
       --api-key "$WEB_EXT_API_KEY" --api-secret "$WEB_EXT_API_SECRET"
     ```
  3. 把簽署後的檔案以 `threads-auto-translate.xpi` 的名稱上傳到 GitHub 發布（`v<版本>`）。
  4. 在 `updates.json` 加入新版本項目。已安裝的 Firefox 會讀取這個檔案自動更新。
