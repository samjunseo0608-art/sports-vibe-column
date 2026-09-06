# 소셜 공유 기능

칼럼 하단 `공유하기` 버튼을 누르면 카카오톡, 인스타그램, X, Facebook, 링크 복사, 다른 앱 메뉴가 열립니다.

- **카카오톡 / 인스타그램**: 모바일에서는 운영체제 공유창을 이용해 설치된 앱으로 전달됩니다.
- **X / Facebook**: 웹 공유창을 바로 엽니다.
- **링크 복사**: 현재 칼럼 URL을 복사합니다.
- **다른 앱**: Web Share API를 이용해 휴대폰의 전체 공유 대상을 엽니다.

## 카카오톡을 버튼 한 번으로 직접 열고 싶다면
카카오 공식 JavaScript SDK 방식은 JavaScript 키와 사이트 도메인 등록이 필요합니다.
`assets/site-config.js`의 `kakaoJavaScriptKey`에 키를 입력하고 Kakao Developers에서 GitHub Pages 도메인을 JavaScript SDK 도메인과 제품 링크 웹 도메인으로 등록하면 카카오톡 버튼이 직접 Kakao Share를 호출합니다.

현재 키를 비워둔 상태에서도 모바일 공유창을 통해 카카오톡으로 보낼 수 있습니다.
