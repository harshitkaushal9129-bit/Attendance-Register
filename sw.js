const CACHE_NAME = 'attendance-app-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './attendance.html',
  './records.html',
  './manifest.json',
  'https://harshitkaushal9129-bit.github.io/full-forms-for-o-level/kaushalji.png'
];

// Install Event - Caching all core files & images
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

// Activate Event - Clean up old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event - Serve from Cache, fall back to Network
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});

// Push Notification Handler
self.addEventListener('push', (e) => {
  const data = e.data ? e.data.json() : { title: 'Attendance Notification', body: 'New Update Available!' };
  const options = {
    body: data.body,
    icon: 'https://harshitkaushal9129-bit.github.io/full-forms-for-o-level/kaushalji.png',
    badge: 'https://harshitkaushal9129-bit.github.io/full-forms-for-o-level/kaushalji.png',
    vibrate: [100, 50, 100]
  };
  e.waitUntil(self.registration.showNotification(data.title, options));
});
