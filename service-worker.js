const CACHE='stock-pnl-calendar-v52-stable-calc-auto-update-final-1';
const SHELL='./index.html';
self.addEventListener('install',e=>{self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{
  for(const k of await caches.keys())if(k!==CACHE)await caches.delete(k);
  await self.clients.claim();
  /* When this new worker replaces an older cached build, automatically reload open app windows once. */
  const clients=await self.clients.matchAll({type:'window',includeUncontrolled:true});
  for(const client of clients){try{await client.navigate(client.url);}catch(err){}}
})());});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  if(e.request.mode==='navigate'){
    e.respondWith((async()=>{
      try{
        const r=await fetch(e.request,{cache:'no-store'});
        if(r&&r.ok){const c=await caches.open(CACHE);c.put(SHELL,r.clone()).catch(()=>{});}
        return r;
      }catch(err){return(await caches.match(SHELL))||Response.error();}
    })());
    return;
  }
  e.respondWith(fetch(e.request,{cache:'no-store'}).catch(()=>caches.match(e.request)));
});
