# 배포 및 댓글 설치 가이드

## GitHub Pages 배포
1. ZIP을 풉니다.
2. 내부 파일/폴더를 GitHub 저장소 최상단에 덮어씁니다.
3. Commit 합니다.
4. GitHub Pages가 `main / (root)`로 설정되어 있으면 자동 재배포됩니다.

## 로그인 없는 즉시 공개 댓글
댓글 프론트엔드는 이미 Supabase 프로젝트에 연결되어 있습니다.
처음 한 번만 아래 작업을 해주세요.

1. Supabase Dashboard → **SQL Editor**
2. **New query**
3. `SUPABASE_댓글_초기설정.sql` 전체 복사
4. **Run**
5. GitHub Pages 새 배포 후 칼럼 하단에서 테스트

댓글은 작성 즉시 공개되며, 칼럼 URL별로 따로 저장됩니다.

> `sb_publishable_...` 키는 브라우저용 공개 키입니다. Secret key / service_role / DB 비밀번호는 사이트 코드에 넣지 마세요.
