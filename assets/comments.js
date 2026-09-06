(function(){
  const root=document.getElementById('comments-widget');
  if(!root) return;

  const comments=(window.SPORTS_VIBE_CONFIG||{}).comments||{};
  const provider=comments.provider||'giscus';

  function loadGiscus(){
    const cfg=comments.giscus||{};
    if(!(cfg.repo&&cfg.repoId&&cfg.category&&cfg.categoryId)){
      root.innerHTML='<div class="comment-ready"><div class="comment-icon">💬</div><div><strong>댓글 설정을 확인해주세요.</strong><p>댓글 연결 정보가 비어 있습니다.</p></div></div>';
      return;
    }
    const s=document.createElement('script');
    s.src='https://giscus.app/client.js';s.async=true;s.crossOrigin='anonymous';
    s.dataset.repo=cfg.repo;s.dataset.repoId=cfg.repoId;s.dataset.category=cfg.category;s.dataset.categoryId=cfg.categoryId;
    s.dataset.mapping=cfg.mapping||'pathname';s.dataset.strict='0';s.dataset.reactionsEnabled='1';s.dataset.emitMetadata='0';s.dataset.inputPosition='bottom';s.dataset.theme='preferred_color_scheme';s.dataset.lang='ko';
    root.appendChild(s);
  }

  function loadCusdis(){
    const cfg=comments.cusdis||{};
    if(!cfg.appId){
      root.innerHTML='<div class="comment-ready"><div class="comment-icon">💬</div><div><strong>게스트 댓글 연결을 위한 App ID가 필요합니다.</strong><p>Cusdis에서 무료 사이트를 만든 뒤 발급되는 App ID를 site-config.js에 입력하면 로그인 없이 이름과 댓글을 남길 수 있습니다.</p></div></div>';
      return;
    }
    const thread=document.createElement('div');
    thread.id='cusdis_thread';
    thread.dataset.host=cfg.host||'https://cusdis.com';
    thread.dataset.appId=cfg.appId;
    thread.dataset.pageId=location.pathname;
    thread.dataset.pageUrl=location.href;
    thread.dataset.pageTitle=document.title;
    root.appendChild(thread);
    const s=document.createElement('script');
    s.async=true;s.defer=true;s.src=(cfg.host||'https://cusdis.com')+'/js/cusdis.es.js';
    root.appendChild(s);
  }

  if(provider==='cusdis') loadCusdis(); else loadGiscus();
})();
