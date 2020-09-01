self.addEventListener('install', function(event){
	console.log("installing the Service Worker");
	self.skipWaiting();

	event.waitUntil(caches.open('teste-v1').then(cache => {
		cache.add('img/fox.jpg');
	}));

});

self.addEventListener('activate', function(event){
	console.log("activating service worker");
});

self.addEventListener('fetch', function(event){

	const url = new URL(event.request.url);

	console.log("domain :"+url.origin);
	console.log("pathname :"+url.pathname);
	console.log("Request URL :"+event.request.url);

	if(location.origin == url.origin && url.pathname == '/testesw/'){
		event.respondWith(caches.match('/testesw/img/fox.jpg'));
	}
});