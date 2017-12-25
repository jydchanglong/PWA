
var cacheName = 'latestNews-v2';

// Cache our known resources during install
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
    .then(cache => cache.addAll([
      './js/jquery.js',
      './js/script.js',
      './images/wallhaven.jpg',
      './style/common.css',   
      './index.html'
    ]))
  );
});

   //Cache any new resources as they are fetched
self.addEventListener('fetch', function(event) {
event.respondWith(
    caches.match(event.request, { ignoreSearch: true })
    .then(function(response) {
      if (response) {
        return response;
      }
      var fetchRequest = event.request.clone();

      return fetch(fetchRequest).then(
        function(response) {
          if(!response || response.status !== 200) {
            return response;
          }

          var responseToCache = response.clone();
          caches.open(cacheName)
          .then(function(cache) {
            cache.put(event.request, responseToCache);
          });

          return response;
        }
      );
    })
);
});
