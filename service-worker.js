const CACHE='stock-pnl-calendar-v29-nse-symbol-master';
const CORE=['./index.html?v=29','./manifest.json?v=29','./icons/stock-pnl-v17-192.png','./icons/stock-pnl-v17-512.png','./icons/stock-pnl-maskable-v17-192.png','./icons/stock-pnl-maskable-v17-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;if(e.request.mode==='navigate'){e.respondWith(fetch(e.request,{cache:'no-store'}).catch(()=>caches.match('./index.html?v=29')));return;}e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request,{cache:'no-store'})));});
