const CACHE_NAME = 'philosophy-suggestion-v25';
const urlsToCache = [
  '/',
  '/offline',
  '/icon.svg',
  '/manifest.json',
  '/fonts/Inter-Regular.woff2',
  '/fonts/Inter-Medium.woff2',
  '/fonts/Inter-SemiBold.woff2',
  '/fonts/Inter-Bold.woff2',
  '/fonts/SpaceGrotesk-Regular.woff2',
  '/fonts/SpaceGrotesk-Bold.woff2',
  '/fonts/HindSiliguri-Regular.woff2',
  '/fonts/HindSiliguri-SemiBold.woff2',
  '/fonts/HindSiliguri-Bold.woff2',
  '/subject/241701',
  '/subject/241703',
  '/subject/241705',
  '/subject/241707',
  '/subject/241709',
  '/subject/241711',
  '/subject/241713',
  '/subject/241715',
  '/subject/241717',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Opened cache');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request).catch(() => caches.match('/offline'));
      })
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
