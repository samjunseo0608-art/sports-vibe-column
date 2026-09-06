(function(){
  // Defensive navigation: keep the main CTA links independent from the share UI.
  document.addEventListener('click', function(e){
    const a=e.target.closest('a[data-site-nav]');
    if(!a) return;
    const target=a.getAttribute('data-site-nav');
    if(target==='columns'){
      e.preventDefault();
      document.getElementById('columns')?.scrollIntoView({behavior:'smooth',block:'start'});
    } else if(target==='about'){
      e.preventDefault();
      window.location.href='about.html';
    }
  });
  const y=document.getElementById('year'); if(y) y.textContent=new Date().getFullYear();

  const cfg=window.SPORTS_VIBE_CONFIG?.share||{};
  const articleTitle=()=>document.querySelector('meta[property="og:title"]')?.content||document.querySelector('h1')?.innerText?.trim()||document.title;
  const articleDesc=()=>document.querySelector('meta[property="og:description"]')?.content||document.querySelector('meta[name="description"]')?.content||'';
  const articleImage=()=>document.querySelector('meta[property="og:image"]')?.content||'';
  const cleanUrl=()=>location.href.split('#')[0];
  const isMobile=()=>/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent||'');

  function toast(message){
    let el=document.querySelector('.share-toast');
    if(!el){ el=document.createElement('div'); el.className='share-toast'; document.body.appendChild(el); }
    el.textContent=message; el.classList.add('show');
    clearTimeout(el._timer); el._timer=setTimeout(()=>el.classList.remove('show'),2600);
  }

  async function copyLink(message='링크를 복사했어요.'){
    const url=cleanUrl();
    try{ await navigator.clipboard.writeText(url); toast(message); return true; }
    catch(e){
      const ta=document.createElement('textarea'); ta.value=url; ta.style.position='fixed'; ta.style.opacity='0'; document.body.appendChild(ta); ta.select();
      try{document.execCommand('copy'); toast(message); return true;}finally{ta.remove();}
    }
  }

  async function mobileNativeShare(){
    if(!isMobile() || !navigator.share) return false;
    const data={title:articleTitle(), text:articleDesc(), url:cleanUrl()};
    try{ await navigator.share(data); return true; }
    catch(e){ if(e?.name!=='AbortError') console.warn('mobile share',e); return false; }
  }

  function loadKakaoSdk(){
    return new Promise((resolve,reject)=>{
      if(window.Kakao) return resolve(window.Kakao);
      const s=document.createElement('script');
      s.src='https://t1.kakaocdn.net/kakao_js_sdk/2.8.1/kakao.min.js';
      s.crossOrigin='anonymous';
      s.onload=()=>resolve(window.Kakao); s.onerror=reject; document.head.appendChild(s);
    });
  }

  async function shareKakao(){
    const key=cfg.kakaoJavaScriptKey?.trim();
    if(key){
      try{
        const Kakao=await loadKakaoSdk();
        if(!Kakao.isInitialized()) Kakao.init(key);
        Kakao.Share.sendDefault({
          objectType:'feed',
          content:{title:articleTitle(),description:articleDesc(),imageUrl:articleImage(),link:{mobileWebUrl:cleanUrl(),webUrl:cleanUrl()}},
          buttons:[{title:'칼럼 읽기',link:{mobileWebUrl:cleanUrl(),webUrl:cleanUrl()}}]
        });
        return;
      }catch(e){ console.warn('Kakao Share fallback',e); }
    }

    // Kakao JavaScript key가 없을 때는 Windows의 불안정한 공유 패널을 열지 않는다.
    if(await mobileNativeShare()) return;
    await copyLink('카카오톡에 보낼 링크를 복사했어요. 채팅창에 붙여넣어 주세요.');
  }

  async function shareInstagram(){
    // 모바일은 OS 공유창에서 Instagram을 선택할 수 있다.
    if(await mobileNativeShare()) return;
    // PC 웹은 Instagram의 URL 직접 공유 API가 없으므로 링크 복사 후 DM 화면을 연다.
    await copyLink('링크를 복사했어요. 인스타그램 DM에 붙여넣어 주세요.');
    setTimeout(()=>window.open('https://www.instagram.com/direct/inbox/','_blank','noopener,noreferrer'),180);
  }

  function shareX(){
    const text=encodeURIComponent(articleTitle());
    const url=encodeURIComponent(cleanUrl());
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`,'_blank','noopener,noreferrer,width=720,height=620');
  }

  function shareFacebook(){
    const url=encodeURIComponent(cleanUrl());
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`,'_blank','noopener,noreferrer,width=720,height=620');
  }

  function shareEmail(){
    const subject=encodeURIComponent(articleTitle());
    const body=encodeURIComponent(`${articleDesc()}\n\n${cleanUrl()}`);
    location.href=`mailto:?subject=${subject}&body=${body}`;
  }

  function svgIcon(name){
    const icons={
      kakao:'<span class="share-logo share-logo-kakao">K</span>',
      instagram:'<span class="share-logo share-logo-instagram">◎</span>',
      x:'<span class="share-logo share-logo-x">𝕏</span>',
      facebook:'<span class="share-logo share-logo-facebook">f</span>',
      copy:'<span class="share-logo share-logo-copy">↗</span>',
      email:'<span class="share-logo share-logo-email">✉</span>'
    }; return icons[name]||'';
  }

  function buildShareSheet(){
    if(document.querySelector('.share-sheet-backdrop')) return;
    const back=document.createElement('div'); back.className='share-sheet-backdrop'; back.hidden=true;
    const mobileNote=isMobile()
      ? '카카오톡·인스타그램은 휴대폰의 공유 기능을 통해 설치된 앱으로 보낼 수 있습니다.'
      : 'PC에서는 카카오톡·인스타그램 링크를 자동 복사합니다. X·Facebook은 바로 공유창이 열립니다.';
    back.innerHTML=`<div class="share-sheet" role="dialog" aria-modal="true" aria-labelledby="share-sheet-title">
      <div class="share-sheet-grip" aria-hidden="true"></div>
      <div class="share-sheet-head"><div><span>SHARE</span><h3 id="share-sheet-title">이 칼럼 공유하기</h3><p>친구와 함께 읽고 이야기해보세요.</p></div><button type="button" class="share-sheet-close" aria-label="닫기">×</button></div>
      <div class="share-platform-grid">
        <button type="button" data-share-platform="kakao">${svgIcon('kakao')}<strong>카카오톡</strong><small>${isMobile()?'앱으로 공유':'링크 복사'}</small></button>
        <button type="button" data-share-platform="instagram">${svgIcon('instagram')}<strong>인스타그램</strong><small>${isMobile()?'앱으로 공유':'DM에 붙여넣기'}</small></button>
        <button type="button" data-share-platform="x">${svgIcon('x')}<strong>X</strong><small>게시물 작성</small></button>
        <button type="button" data-share-platform="facebook">${svgIcon('facebook')}<strong>Facebook</strong><small>피드 공유</small></button>
        <button type="button" data-share-platform="copy">${svgIcon('copy')}<strong>링크 복사</strong><small>어디든 붙여넣기</small></button>
        <button type="button" data-share-platform="email">${svgIcon('email')}<strong>이메일</strong><small>메일로 보내기</small></button>
      </div>
      <div class="share-sheet-note">${mobileNote}</div>
    </div>`;
    document.body.appendChild(back);
    const close=()=>{back.classList.remove('open'); setTimeout(()=>back.hidden=true,180); document.body.classList.remove('share-lock');};
    const open=()=>{back.hidden=false; requestAnimationFrame(()=>back.classList.add('open')); document.body.classList.add('share-lock'); back.querySelector('.share-sheet-close')?.focus();};
    back._open=open; back._close=close;
    back.addEventListener('click',e=>{ if(e.target===back) close(); });
    back.querySelector('.share-sheet-close').addEventListener('click',close);
    back.addEventListener('keydown',e=>{ if(e.key==='Escape') close(); });
    back.querySelector('[data-share-platform="kakao"]').addEventListener('click',shareKakao);
    back.querySelector('[data-share-platform="instagram"]').addEventListener('click',shareInstagram);
    back.querySelector('[data-share-platform="x"]').addEventListener('click',shareX);
    back.querySelector('[data-share-platform="facebook"]').addEventListener('click',shareFacebook);
    back.querySelector('[data-share-platform="copy"]').addEventListener('click',()=>copyLink());
    back.querySelector('[data-share-platform="email"]').addEventListener('click',shareEmail);
  }

  buildShareSheet();
  document.querySelectorAll('button[data-share]').forEach(btn=>btn.addEventListener('click',e=>{
    e.preventDefault();
    e.stopPropagation();
    document.querySelector('.share-sheet-backdrop')?._open?.();
  }));
})();
