const CACHE='stock-pnl-calendar-v51-final';
const APP_SHELL='./index.html?v=51';

self.addEventListener('install',event=>{
  event.waitUntil(
    caches.open(CACHE).then(cache=>fetch(APP_SHELL,{cache:'no-store'}).then(resp=>{
      if(resp&&resp.ok)cache.put(APP_SHELL,resp.clone());
    }).catch(()=>{}))
  );
  self.skipWaiting();
});

self.addEventListener('activate',event=>{
  event.waitUntil(
    caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('message',event=>{
  if(event.data&&event.data.type==='SKIP_WAITING')self.skipWaiting();
});

self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  if(event.request.mode==='navigate'){
    event.respondWith(
      fetch(event.request,{cache:'no-store'}).then(resp=>{
        if(resp&&resp.ok){
          const copy=resp.clone();
          caches.open(CACHE).then(cache=>cache.put(APP_SHELL,copy));
        }
        return resp;
      }).catch(()=>caches.match(APP_SHELL))
    );
    return;
  }
  event.respondWith(fetch(event.request,{cache:'no-store'}).catch(()=>caches.match(event.request)));
});
