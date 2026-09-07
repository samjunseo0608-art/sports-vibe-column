# sportsviblee.kr 통합 경로 수정본

GitHub 저장소 루트에서 아래 파일을 교체하세요.

- index.html
- about.html
- 404.html
- columns/ssg-ad-visibility.html

기존 assets 폴더는 그대로 유지하세요.

핵심 수정:
- /sports-vibe-column/ 경로 제거
- 내부 링크를 sportsviblee.kr 루트 기준으로 통일
- 칼럼 내부 ../ 상대경로 제거
- 404에서 예전 /sports-vibe-column/... 주소를 새 루트 주소로 자동 이동
