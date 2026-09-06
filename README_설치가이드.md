# 체대생의 스포츠 바이브코딩 — 칼럼 웹사이트

## 사이트 이름
- 메인 브랜드: **체대생의 스포츠 바이브코딩**
- 사이트 설명: **바이브코딩으로 스포츠 산업을 바라보고 분석하는 체대생**

긴 문장은 검색/소개 문구로 유지하고, 화면 상단에서는 짧은 브랜드명을 쓰도록 구성했습니다.

## 포함된 파일
- `index.html` : 메인 페이지
- `about.html` : 사이트 소개
- `columns/ssg-ad-visibility.html` : 기존 SSG 야구장 광고 칼럼 + 댓글 영역
- `assets/site.css` : 공통 디자인
- `assets/site.js` : 공유 버튼 등
- `assets/site-config.js` : 댓글 설정
- `assets/comments.js` : Giscus 댓글 로더

## 댓글을 실제로 작동시키는 방법 (Giscus)
정적 HTML만으로는 여러 방문자가 같은 댓글을 공유할 수 없어 GitHub Discussions를 댓글 DB처럼 사용하는 Giscus 연결 구조로 만들어두었습니다.

1. 이 사이트를 올릴 **공개 GitHub 저장소**를 만듭니다.
2. 저장소 `Settings → General → Features`에서 **Discussions**를 켭니다.
3. `https://giscus.app/ko`에서 저장소를 연결합니다.
4. 발급 화면의 `repo`, `repo-id`, `category`, `category-id` 값을 확인합니다.
5. `assets/site-config.js`에 4개 값을 입력합니다.
6. 다시 커밋하면 각 칼럼 URL(pathname)마다 서로 다른 댓글 스레드가 자동 생성됩니다.

예시:
```js
window.SPORTS_VIBE_CONFIG = {
  giscus: {
    repo: "아이디/저장소명",
    repoId: "R_...",
    category: "Comments",
    categoryId: "DIC_...",
    mapping: "pathname"
  }
};
```

## GitHub Pages 배포
1. 폴더 안의 파일을 저장소 루트에 그대로 업로드합니다.
2. GitHub `Settings → Pages`에서 `Deploy from a branch`를 선택합니다.
3. `main / root`를 지정하고 저장합니다.
4. 생성된 Pages 주소로 접속합니다.

## 다음 칼럼 추가
1. `columns/` 폴더에 새 HTML 파일을 만듭니다.
2. 칼럼 하단에 현재 SSG 칼럼의 `comments-section` 영역을 그대로 사용합니다.
3. `index.html`에 새 카드만 추가하면 됩니다.

## 추천 확장 기능
칼럼이 5~10개 이상 쌓인 뒤에는 검색/카테고리 필터, 시리즈 페이지, RSS, 이메일 뉴스레터, 조회수(GoatCounter/Plausible)를 붙이는 것을 추천합니다. 초기에는 기능을 너무 많이 넣기보다 글과 댓글 경험을 먼저 안정화하는 편이 관리가 쉽습니다.
