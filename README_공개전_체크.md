# 공개 전 체크

1. GitHub 저장소 최상단에 `index.html`, `about.html`, `assets/`, `columns/`가 같은 구조로 올라갔는지 확인합니다.
2. GitHub Actions의 Pages 배포가 초록색 체크인지 확인합니다.
3. 아래 주소를 직접 열어 확인합니다.
   - `/sports-vibe-column/`
   - `/sports-vibe-column/about.html`
   - `/sports-vibe-column/columns/ssg-ad-visibility.html`
4. Supabase에서 처음이면 `SUPABASE_댓글_초기설정.sql`, 이미 테이블을 만들었다면 `SUPABASE_댓글_보안업데이트.sql`을 SQL Editor에서 실행합니다.
5. 모바일에서 상단 `칼럼 / 주제 / 글쓴이`, 메인 `읽어보기`, 칼럼 하단 공유 버튼과 댓글 등록을 각각 한 번 테스트합니다.

## 이번 공개용 보안 보강
- 브라우저용 Supabase publishable key만 사용합니다. service_role/secret key는 포함하지 않습니다.
- CSP를 추가해 스크립트·API 연결 대상을 필요한 도메인으로 제한했습니다.
- 댓글은 `textContent`로 출력되어 댓글 내용이 HTML/스크립트로 실행되지 않습니다.
- 익명 사용자는 댓글 읽기와 작성만 가능하고 수정·삭제 권한은 없습니다.
- 댓글 작성 가능 경로를 칼럼 경로로 제한했습니다.
- 댓글 폼에 개인정보를 적지 말라는 공개 안내를 추가했습니다.
- 외부 기사 이미지는 referrer 전송을 줄이고 lazy loading을 사용합니다.

※ 로그인 없는 즉시 공개 댓글은 완전한 스팸 차단이 아닙니다. 방문자가 크게 늘면 Cloudflare Turnstile + 서버/Edge Function 검증을 추가하는 것이 다음 단계입니다.


## 공개 연락처
- 글쓴이 페이지에 `samjunseo0608@naver.com` 이메일이 공개됩니다. 인스타그램 등 외부에 사이트를 공유하면 누구나 이 주소를 볼 수 있습니다.
