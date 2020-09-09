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

	if(location.origin == url.origin && url.pathname == '/testesw/img/doomsday.jpg'){
		event.respondWith(caches.match('/testesw/img/fox.jpg'));
		console.log(event.request.url);
	}
});

self.addEventListener('push', function(event){
	event.waitUntil(
		self.registration.showNotification("Fox Notification", 
		{
			body: event.data.text(),
			icon: 'img/fox.jpg',
			requireInteraction: true,
			data: {
				id: 666,
				url: 'https://www.youtube.com/watch?v=5Jbo0dTgeos';
			}
		})
		);
});

self.addEventListener('notificationclick', function(event){

		console.log('notification click');
		console.log(event.notification.data);

		event.notification.close();
		clients.openWindow(event.notification.data.url);
});

