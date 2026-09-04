const CACHE='stock-pnl-calendar-v52-stock-trade-card-large-final';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>{e.waitUntil((async()=>{for(const k of await caches.keys())if(/^stock-pnl-calendar-/i.test(k))await caches.delete(k);await self.clients.claim();})())});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(new Request(e.request,{cache:'no-store'})).catch(()=>caches.match(e.request)));});
