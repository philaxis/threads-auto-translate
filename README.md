# Threads 자동 번역

스레드(threads.com / threads.net) 피드에서 외국어 게시물의 **번역하기** 버튼을 자동으로 눌러 주는 아주 작은 Firefox 확장입니다.
번역 자체는 Threads(Meta)가 하며, 이 확장은 버튼만 대신 클릭합니다.

## 동작

- 화면 근처(위아래 800px)에 들어온 게시물의 번역 버튼만 순서대로 클릭합니다.
- 한 번 처리한 게시물은 다시 건드리지 않습니다. **원본 보기**로 되돌려도 다시 번역되지 않습니다.
- 클래스 이름 같은 내부 값은 쓰지 않고, 버튼의 글자(`번역하기`, `번역 보기`, `Translate`, `See translation`)로만 찾습니다.

## 켜기 / 끄기

툴바의 아이콘을 누르면 켜짐/꺼짐이 바뀝니다. 꺼져 있으면 배지에 `OFF`가 표시됩니다.
설정은 브라우저에 저장되어 다음에 열어도 유지됩니다.

## 설치 (Windows · Mac · Linux 공통)

1. Firefox에서 아래 링크를 누릅니다. (GitHub에 로그인된 상태여야 받아집니다)
   **[threads-auto-translate.xpi 다운로드](https://github.com/philaxis/threads-auto-translate/releases/latest/download/threads-auto-translate.xpi)**
2. 받은 파일을 Firefox 창 아무 데나 끌어다 놓습니다.
3. 뜨는 창에서 **추가**를 누르면 끝. 이후 threads.com에서 자동으로 번역됩니다.

Mozilla 서명을 받은 파일이라 일반 Firefox에 그대로 영구 설치됩니다.

## 새 버전 만들기 (개발용)

1. `manifest.json`의 `version`을 올립니다. (같은 버전은 다시 서명할 수 없음)
2. 서명: 확장 파일(manifest.json, content.js, background.js, icons)만 든 폴더에서
   ```bash
   npx web-ext sign --channel=unlisted --source-dir <폴더> --artifacts-dir signed
   ```
3. 서명된 xpi를 `threads-auto-translate.xpi` 이름으로 GitHub 릴리스에 올립니다.

임시로 시험만 할 때는 `about:debugging#/runtime/this-firefox` → **임시 부가 기능 로드** → `manifest.json`.
