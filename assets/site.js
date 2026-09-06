(function(){
  const y=document.getElementById('year'); if(y) y.textContent=new Date().getFullYear();

  const cfg=window.SPORTS_VIBE_CONFIG?.share||{};
  const articleTitle=()=>document.querySelector('meta[property="og:title"]')?.content||document.querySelector('h1')?.innerText?.trim()||document.title;
  const articleDesc=()=>document.querySelector('meta[property="og:description"]')?.content||document.querySelector('meta[name="description"]')?.content||'';
  const articleImage=()=>document.querySelector('meta[property="og:image"]')?.content||'';
  const cleanUrl=()=>location.href.split('#')[0];

  function toast(message){
    let el=document.querySelector('.share-toast');
    if(!el){ el=document.createElement('div'); el.className='share-toast'; document.body.appendChild(el); }
    el.textContent=message; el.classList.add('show');
    clearTimeout(el._timer); el._timer=setTimeout(()=>el.classList.remove('show'),2300);
  }

  async function copyLink(message='링크를 복사했어요.'){
    const url=cleanUrl();
    try{ await navigator.clipboard.writeText(url); toast(message); return true; }
    catch(e){
      const ta=document.createElement('textarea'); ta.value=url; ta.style.position='fixed'; ta.style.opacity='0'; document.body.appendChild(ta); ta.select();
      try{document.execCommand('copy'); toast(message); return true;}finally{ta.remove();}
    }
  }

  async function nativeShare(preface){
    const data={title:articleTitle(), text:articleDesc(), url:cleanUrl()};
    if(navigator.share){
      try{ await navigator.share(data); return true; }catch(e){ if(e?.name!=='AbortError') console.warn(e); return false; }
    }
    await copyLink(preface||'링크를 복사했어요. 원하는 앱에 붙여넣어 주세요.');
    return false;
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
          content:{
            title:articleTitle(),
            description:articleDesc(),
            imageUrl:articleImage(),
            link:{mobileWebUrl:cleanUrl(),webUrl:cleanUrl()}
          },
          buttons:[{title:'칼럼 읽기',link:{mobileWebUrl:cleanUrl(),webUrl:cleanUrl()}}]
        });
        return;
      }catch(e){ console.warn('Kakao Share fallback',e); }
    }
    const ok=await nativeShare('카카오톡에 보낼 링크를 복사했어요.');
    if(!ok && !navigator.share) toast('링크를 복사했어요. 카카오톡에 붙여넣어 주세요.');
  }

  async function shareInstagram(){
    if(navigator.share){
      const ok=await nativeShare();
      if(ok) return;
    }
    await copyLink('링크를 복사했어요. 인스타그램 DM/스토리에 붙여넣어 주세요.');
    setTimeout(()=>{ try{ window.open('https://www.instagram.com/','_blank','noopener'); }catch(e){} },250);
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

  function svgIcon(name){
    const icons={
      kakao:'<span class="share-logo share-logo-kakao">K</span>',
      instagram:'<span class="share-logo share-logo-instagram">◎</span>',
      x:'<span class="share-logo share-logo-x">𝕏</span>',
      facebook:'<span class="share-logo share-logo-facebook">f</span>',
      copy:'<span class="share-logo share-logo-copy">↗</span>',
      more:'<span class="share-logo share-logo-more">•••</span>'
    }; return icons[name]||'';
  }

  function buildShareSheet(){
    if(document.querySelector('.share-sheet-backdrop')) return;
    const back=document.createElement('div'); back.className='share-sheet-backdrop'; back.hidden=true;
    back.innerHTML=`<div class="share-sheet" role="dialog" aria-modal="true" aria-labelledby="share-sheet-title">
      <div class="share-sheet-grip" aria-hidden="true"></div>
      <div class="share-sheet-head"><div><span>SHARE</span><h3 id="share-sheet-title">이 칼럼 공유하기</h3><p>친구와 함께 읽고 이야기해보세요.</p></div><button type="button" class="share-sheet-close" aria-label="닫기">×</button></div>
      <div class="share-platform-grid">
        <button type="button" data-share-platform="kakao">${svgIcon('kakao')}<strong>카카오톡</strong><small>친구·채팅방</small></button>
        <button type="button" data-share-platform="instagram">${svgIcon('instagram')}<strong>인스타그램</strong><small>DM·스토리</small></button>
        <button type="button" data-share-platform="x">${svgIcon('x')}<strong>X</strong><small>게시물 작성</small></button>
        <button type="button" data-share-platform="facebook">${svgIcon('facebook')}<strong>Facebook</strong><small>피드 공유</small></button>
        <button type="button" data-share-platform="copy">${svgIcon('copy')}<strong>링크 복사</strong><small>어디든 붙여넣기</small></button>
        <button type="button" data-share-platform="more">${svgIcon('more')}<strong>다른 앱</strong><small>휴대폰 공유창</small></button>
      </div>
      <div class="share-sheet-note">모바일에서는 설치된 카카오톡·인스타그램 등 다양한 앱이 공유창에 표시됩니다.</div>
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
    back.querySelector('[data-share-platform="more"]').addEventListener('click',()=>nativeShare());
  }

  buildShareSheet();
  document.querySelectorAll('[data-share]').forEach(btn=>btn.addEventListener('click',()=>document.querySelector('.share-sheet-backdrop')?._open?.()));
})();
