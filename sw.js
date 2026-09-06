const CACHE_NAME = 'attendance-app-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});

self.addEventListener('push', (e) => {
  const data = e.data ? e.data.json() : { title: 'Attendance Notification', body: 'New Update Available!' };
  const options = {
    body: data.body,
    icon: 'https://via.placeholder.com/192/00f3ff/000000?text=App',
    badge: 'https://via.placeholder.com/192/00f3ff/000000?text=App',
    vibrate: [100, 50, 100]
  };
  e.waitUntil(self.registration.showNotification(data.title, options));
});
