
(function(){
  const y=document.getElementById('year'); if(y) y.textContent=new Date().getFullYear();
  document.querySelectorAll('[data-share]').forEach(btn=>btn.addEventListener('click',async()=>{
    const data={title:document.title,text:document.querySelector('meta[name="description"]')?.content||'',url:location.href};
    try{if(navigator.share){await navigator.share(data)}else{await navigator.clipboard.writeText(location.href);btn.textContent='링크 복사됨 ✓';setTimeout(()=>btn.textContent='공유하기',1800)}}catch(e){}
  }));
})();
