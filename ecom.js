// Shared ecommerce utilities for Zentegix
const Zentegix_PRODUCTS = [
  {id:'p1', title:'Maths Formula Book', price:199, img:'https://via.placeholder.com/600x360?text=Maths+Book'},
  {id:'p2', title:'Science Notes PDF', price:149, img:'https://via.placeholder.com/600x360?text=Science+PDF'},
  {id:'p3', title:"Zentegix T‑Shirt", price:499, img:'https://via.placeholder.com/600x360?text=Tshirt'},
  {id:'p4', title:'Revision Cards Pack', price:249, img:'https://via.placeholder.com/600x360?text=Revision+Cards'},
  {id:'p5', title:'Class 10 Video Course', price:999, img:'https://via.placeholder.com/600x360?text=Video+Course'},
  {id:'p6', title:'Premium Mock Tests', price:699, img:'https://via.placeholder.com/600x360?text=Mock+Tests'},
  {id:'p7', title:'Stationery Kit', price:299, img:'https://via.placeholder.com/600x360?text=Stationery'}
];

function loadZentegixCart(){
  try{ const saved = localStorage.getItem('Zentegix_cart'); return saved?JSON.parse(saved):[]; }catch(e){ return []; }
}
function saveZentegixCart(cart){ try{ localStorage.setItem('Zentegix_cart', JSON.stringify(cart)); }catch(e){} }
function ZentegixAddToCart(productId, qty=1){
  const cart = loadZentegixCart();
  const prod = Zentegix_PRODUCTS.find(p=>p.id===productId);
  if(!prod) return;
  const existing = cart.find(i=>i.id===productId);
  if(existing) existing.qty += qty; else cart.push({id:prod.id, title:prod.title, price:prod.price, qty});
  saveZentegixCart(cart);
  updateGlobalCartCount();
}
function ZentegixChangeQty(productId, delta){
  let cart = loadZentegixCart();
  const it = cart.find(i=>i.id===productId); if(!it) return;
  it.qty += delta; if(it.qty<=0) cart = cart.filter(x=>x.id!==productId);
  saveZentegixCart(cart); updateGlobalCartCount();
}
function ZentegixRemoveItem(productId){ let cart = loadZentegixCart(); cart = cart.filter(i=>i.id!==productId); saveZentegixCart(cart); updateGlobalCartCount(); }
function ZentegixClearCart(){ saveZentegixCart([]); updateGlobalCartCount(); }
function ZentegixCartTotal(){ const cart = loadZentegixCart(); return cart.reduce((s,i)=> s + (i.price * (i.qty||1)), 0); }
function updateGlobalCartCount(){ const els = document.querySelectorAll('#cartCount'); els.forEach(el=>{ const cart = loadZentegixCart(); el.innerText = cart.reduce((s,i)=> s + (i.qty||1), 0); }); }

// Initialize count on load
document.addEventListener('DOMContentLoaded', updateGlobalCartCount);

