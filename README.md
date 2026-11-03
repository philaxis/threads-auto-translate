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

## 설치

### 임시 설치 (개발용, 재시작하면 사라짐)

1. Firefox 주소창에 `about:debugging#/runtime/this-firefox` 입력
2. **임시 부가 기능 로드** 클릭
3. 이 폴더의 `manifest.json` 선택

### 영구 설치

일반 Firefox는 서명된 `.xpi`만 설치할 수 있습니다.

- AMO에 **unlisted**로 서명:
  ```bash
  npx web-ext sign --channel=unlisted --api-key ... --api-secret ...
  ```
- 또는 Developer Edition / Nightly에서 `about:config` → `xpinstall.signatures.required`를 `false`로 바꾼 뒤
  `bash build.sh`로 만든 `dist/threads-auto-translate.xpi`를 설치합니다.

## 빌드

```bash
bash build.sh
```

`dist/threads-auto-translate.xpi`가 만들어집니다.
