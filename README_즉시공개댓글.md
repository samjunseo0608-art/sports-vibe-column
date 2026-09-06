# Supabase 즉시 공개 댓글 연결

사이트 코드는 Supabase 연결까지 완료되어 있습니다.
GitHub에 올리기 전에 딱 한 번 데이터베이스 테이블을 만들어야 합니다.

1. Supabase 프로젝트를 엽니다.
2. 왼쪽 메뉴에서 **SQL Editor**를 엽니다.
3. **New query**를 누릅니다.
4. 이 ZIP의 `SUPABASE_댓글_초기설정.sql` 전체 내용을 붙여넣습니다.
5. **Run**을 누릅니다.
6. 사이트 ZIP을 GitHub 저장소에 덮어쓰고 Commit 합니다.

이후 방문자는 별도 로그인 없이 이름과 댓글을 입력할 수 있고,
댓글은 작성 직후 해당 칼럼에 바로 표시됩니다.

## 구조
- 칼럼별 구분: 현재 페이지의 URL 경로(page_path)
- 저장: Supabase `comments` 테이블
- 공개: `is_visible = true` 댓글만 조회
- 작성 권한: 익명 방문자도 INSERT 가능
- 수정/삭제: 익명 방문자에게 허용하지 않음

## 보안 주의
`site-config.js`의 `sb_publishable_...` 키는 브라우저 공개용 키입니다.
`service_role`, Secret key, 데이터베이스 비밀번호는 절대 HTML/JS에 넣지 마세요.
