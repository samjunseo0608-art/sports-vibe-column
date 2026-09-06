
(function(){
  const root=document.getElementById('comments-widget'); if(!root) return;
  const cfg=(window.SPORTS_VIBE_CONFIG||{}).giscus||{};
  const ready=cfg.repo&&cfg.repoId&&cfg.categoryId;
  if(!ready){
    root.innerHTML=`<div class="comment-ready"><div class="comment-icon">💬</div><div><strong>댓글 기능 연결 준비 완료</strong><p>이 영역은 GitHub Discussions 기반 <b>Giscus</b>와 연결되도록 만들어졌습니다. 배포할 GitHub 저장소가 정해지면 <code>assets/site-config.js</code>의 값을 한 번만 입력하면, 칼럼마다 별도의 공개 댓글창이 생깁니다.</p></div></div>`;
    return;
  }
  const s=document.createElement('script'); s.src='https://giscus.app/client.js'; s.async=true; s.crossOrigin='anonymous';
  s.dataset.repo=cfg.repo; s.dataset.repoId=cfg.repoId; s.dataset.category=cfg.category||'Comments'; s.dataset.categoryId=cfg.categoryId;
  s.dataset.mapping=cfg.mapping||'pathname'; s.dataset.strict='0'; s.dataset.reactionsEnabled='1'; s.dataset.emitMetadata='0'; s.dataset.inputPosition='top';
  s.dataset.theme='light'; s.dataset.lang='ko'; s.dataset.loading='lazy'; root.appendChild(s);
})();
