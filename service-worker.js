const CACHE='stock-pnl-calendar-v52-final';
const SHELL='./index.html?v=52';
const CORE=[SHELL];

self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)));
  self.skipWaiting();
});

self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  if(event.request.mode==='navigate'){
    event.respondWith((async()=>{
      try{
        const response=await fetch(event.request,{cache:'no-store'});
        if(response&&response.ok){
          const cache=await caches.open(CACHE);
          cache.put(SHELL,response.clone()).catch(()=>{});
        }
        return response;
      }catch(err){
        return (await caches.match(SHELL)) || Response.error();
      }
    })());
    return;
  }
  event.respondWith((async()=>{
    try{return await fetch(event.request,{cache:'no-store'});}catch(err){return (await caches.match(event.request)) || Response.error();}
  })());
});
