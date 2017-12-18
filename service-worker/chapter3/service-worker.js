
var cacheName = 'latestTest-v1';

self.addEventListener('install', event => {
	event.waitUtil(
		caches.open(cacheName)
		.then(cache => cache.addAll([
				'./images/wallhaven.jpg',
				'./js/jquery.js',
				'./index.html'
			]);
		);
	);
});

// Cache any new resources as they are fetched
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
