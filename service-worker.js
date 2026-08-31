const CACHE='stock-pnl-calendar-v32-local-nse-logos';
const CORE=['./index.html?v=32','./nse-logos.js?v=32'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;if(e.request.mode==='navigate'){e.respondWith(fetch(e.request,{cache:'no-store'}).catch(()=>caches.match('./index.html?v=32')));return;}e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request,{cache:'no-store'}).then(resp=>{if(new URL(e.request.url).pathname.endsWith('/nse-logos.js')){const copy=resp.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));}return resp;})));});
