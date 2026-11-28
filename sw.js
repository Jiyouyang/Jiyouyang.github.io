/* Offline support: after the first visit every page, style and script is available without a network.
   HTML is network-first (so updates show up immediately), assets are stale-while-revalidate. */
const VERSION = 'jy-20261128-ix15';
const PAGES = ['/', '/index.html', '/avatar.html', '/computer-tools.html', '/endfield-download.html', '/endfield.html', '/genshin-download.html', '/genshin.html',
  '/hsr-download.html', '/hsr.html', '/minecraft-china.html', '/minecraft-download.html', '/minecraft-launchers.html', '/minecraft-mobile.html',
  '/minecraft-mods.html', '/minecraft-seed.html', '/minecraft.html', '/zzz-download.html', '/zzz.html'];
const LOCAL_ASSET = /(?:href|src)="(\/(?:styles|scripts|assets)\/[^"]+)"/g;

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(VERSION);
    const assets = new Set(['/site.webmanifest?v=20261128-dock1', '/assets/fonts/jy-apple-fallback.woff2']);
    await Promise.all(PAGES.map(async page => {
      const response = await fetch(page, { cache: 'reload' });
      if (!response.ok) throw new Error('Cannot cache ' + page);
      const copy = response.clone();
      const html = await response.text();
      for (const match of html.matchAll(LOCAL_ASSET)) assets.add(match[1]);
      await cache.put(page, copy);
    }));
    await cache.addAll([...assets]);
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) if (key !== VERSION && key.startsWith('jy-')) await caches.delete(key);
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== location.origin || url.pathname === '/sw.js') return;
  if (request.mode === 'navigate') {
    if (!PAGES.includes(url.pathname)) return;
    event.respondWith((async () => {
      const cache = await caches.open(VERSION);
      try {
        const fresh = await fetch(request);
        if (fresh.ok) await cache.put(url.pathname, fresh.clone());
        return fresh;
      } catch {
        return (await cache.match(url.pathname)) || Response.error();
      }
    })());
    return;
  }
  if (!/^\/(assets|styles|scripts)\//.test(url.pathname) && url.pathname !== '/site.webmanifest') return;
  const cache = caches.open(VERSION);
  const refresh = fetch(request).then(async response => {
    if (response.ok) await (await cache).put(request, response.clone());
    return response;
  });
  event.waitUntil(refresh.then(() => {}, () => {}));
  event.respondWith(cache.then(async store => (await store.match(request)) || refresh));
});
