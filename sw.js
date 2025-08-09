const CACHE_NAME = 'cube-simulator-v2';
const urlsToCache = [
  '/',
  '/index.html',
  // 如果你有CSS和JS文件，也加进来
  // '/style.css',
  // '/main.js'
  'https://cdn.jsdelivr.net/npm/chart.js' // 缓存CDN资源
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // 从缓存中返回
        }
        return fetch(event.request); // 否则从网络请求
      })
  );
});