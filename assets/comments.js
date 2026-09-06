(function(){
  const root=document.getElementById('comments-widget');
  if(!root) return;

  const cfg=(window.SPORTS_VIBE_CONFIG||{}).giscus||{};
  const ready=cfg.repo&&cfg.repoId&&cfg.category&&cfg.categoryId;

  if(!ready){
    root.innerHTML=`<div class="comment-ready"><div class="comment-icon">💬</div><div><strong>댓글 기능 연결 준비 완료</strong><p><code>assets/site-config.js</code>에 Giscus 설정값을 입력하면 칼럼별 공개 댓글창이 표시됩니다.</p></div></div>`;
    return;
  }

  const s=document.createElement('script');
  s.src='https://giscus.app/client.js';
  s.async=true;
  s.crossOrigin='anonymous';
  s.dataset.repo=cfg.repo;
  s.dataset.repoId=cfg.repoId;
  s.dataset.category=cfg.category;
  s.dataset.categoryId=cfg.categoryId;
  s.dataset.mapping=cfg.mapping||'pathname';
  s.dataset.strict='0';
  s.dataset.reactionsEnabled='1';
  s.dataset.emitMetadata='0';
  s.dataset.inputPosition='bottom';
  s.dataset.theme='preferred_color_scheme';
  s.dataset.lang='ko';

  root.appendChild(s);
})();
