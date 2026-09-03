const VERSION='54-corrected';
const APP_CACHE='stock-pnl-calendar-v54-corrected';
self.addEventListener('install',event=>{self.skipWaiting();});
self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(k=>/^stock-pnl-calendar-/i.test(k)).map(k=>caches.delete(k)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  if(event.request.mode==='navigate'){
    event.respondWith(fetch(new Request(event.request,{cache:'no-store'})));
    return;
  }
  if(url.origin===self.location.origin){
    event.respondWith(fetch(new Request(event.request,{cache:'no-store'})));
  }
});
