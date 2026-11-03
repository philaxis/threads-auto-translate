<img src="icons/icon-128.png" width="96" alt="">

# Threads Auto-Translate

[English](README.md) · 한국어 · [繁體中文](README.zh-TW.md)

스레드(threads.com)에서 외국어 글 아래에 있는 **번역하기** 버튼을 대신 눌러 주는 작은 Firefox 확장입니다.
번역은 스레드에 원래 있는 번역 기능 그대로이고, 이 확장은 버튼만 눌러 줍니다.

## 설치

1. Firefox에서 이 링크를 누릅니다 → **[threads-auto-translate.xpi 받기](https://github.com/philaxis/threads-auto-translate/releases/latest/download/threads-auto-translate.xpi)**
2. 받은 파일을 Firefox 창 아무 데나 끌어다 놓습니다.
3. 뜨는 창에서 **추가**를 누르면 끝입니다.

Mozilla 서명을 받은 파일이라 일반 Firefox에 그대로 설치되고, 새 버전이 나오면 자동으로 업데이트됩니다.
Chrome은 지원하지 않습니다.

## 하는 일

- 화면 근처에 온 외국어 글의 번역 버튼만, 0.15초 간격으로 하나씩 누릅니다.
- **원본 보기**로 되돌린 글은 다시 번역하지 않습니다.
- 툴바 아이콘을 누르면 켜고 끌 수 있습니다. 꺼져 있으면 아이콘에 `OFF`가 붙습니다.
- 버튼 글자(`번역하기`, `번역 보기`, `Translate`, `See translation`, `翻譯`, `翻译`, `翻訳`)로만 버튼을 찾습니다. 한국어, 영어, 중국어(번체·간체), 일본어 화면을 지원합니다.

## 개인정보

아무 데이터도 모으거나 보내지 않습니다. 요청하는 권한은 켜짐/꺼짐 설정을 저장하는 `storage` 하나뿐이고, 스레드 사이트에서만 동작합니다.
코드는 `content.js`(94줄)와 `background.js`가 전부라 직접 읽어 보셔도 됩니다.

## 알아 두실 점

Meta·Threads와 관련 없는 개인이 만든 비공식 확장입니다. "Threads"는 Meta Platforms, Inc.의 상표입니다.
스레드 화면 구조가 바뀌면 고칠 때까지 동작하지 않을 수 있습니다.

## 개발

- 두 패키지(Firefox `.xpi`, Chrome 웹 스토어용 `.zip`)를 `dist/`에 빌드: `bash build.sh`
- 시험 설치: `about:debugging#/runtime/this-firefox` → **임시 부가 기능 로드** → `manifest.json`
- 새 버전 배포:
  1. `manifest.json`의 `version`을 올립니다.
  2. 확장 파일(manifest.json, content.js, background.js, icons, _locales)만 든 폴더에서 서명합니다.
     ```bash
     npx web-ext sign --channel=unlisted --source-dir <폴더> --artifacts-dir signed \
       --api-key "$WEB_EXT_API_KEY" --api-secret "$WEB_EXT_API_SECRET"
     ```
  3. 서명된 파일을 `threads-auto-translate.xpi` 이름으로 GitHub 릴리스(`v<버전>`)에 올립니다.
  4. `updates.json`에 새 버전 항목을 추가합니다. 설치된 Firefox가 이 파일을 보고 자동으로 업데이트합니다.
