
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
