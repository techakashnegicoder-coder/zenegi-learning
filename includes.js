// Simple include loader for header and footer
(function(){
  async function loadInclude(id, url){
    const el = document.getElementById(id);
    if(!el) return;
    try{
      const res = await fetch(url);
      if(!res.ok) return;
      const text = await res.text();
      el.innerHTML = text;
      // hook cart count if present (support both names)
      if(typeof updateGlobalCartCount === 'function') updateGlobalCartCount();
      if(typeof ZentegixUpdateCartCount === 'function') ZentegixUpdateCartCount();
      // sync header cart count element if available
      const headerCount = document.getElementById('headerCartCount');
      if(headerCount && typeof updateGlobalCartCount === 'function'){
        // attempt to call updateGlobalCartCount which should set global count elsewhere
        // as a fallback, try reading localStorage
        try{
          const raw = localStorage.getItem('Zentegix_cart');
          const cart = raw ? JSON.parse(raw) : [];
          headerCount.innerText = cart.length || 0;
        }catch(e){/* ignore */}
      }
      // wire header search to renderProducts if available
      const search = document.getElementById('globalSearch');
      if(search && window.renderProducts){
        search.addEventListener('keydown', (e)=>{ if(e.key==='Enter') renderProducts(search.value); });
      }
    }catch(e){console.error('include load failed',e)}
  }
  document.addEventListener('DOMContentLoaded', ()=>{
    loadInclude('site-header','header.html');
    loadInclude('site-footer','footer.html');
  });
})();

