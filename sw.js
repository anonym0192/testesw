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

	const data = JSON.parse(event.data.text());

	event.waitUntil(
		self.registration.showNotification("Fox Notification", 
		{
			body: data.title || "No title",
			icon: 'img/fox.jpg',
			requireInteraction: true,
			notificationData: {
				id: data.id,
				url: data.url,
				nostalgicMusic: 'https://www.youtube.com/watch?v=5Jbo0dTgeos'
			},
			actions: [{title: 'File', action: 'file'},
					{title: 'Mark as read', action: 'read'}]
		})
		);
});

self.addEventListener('notificationclick', function(event){

		
		event.notification.close();

		const notificationData = event.notification.data;

		console.log(notificationData);
		console.log(event.notification.data);

		const url = event.notification.data.url || event.notification.data.nostalgicMusic

		switch(event.action){

			case 'file':
				console.info("The e-mail was filed,  id : "+event.notification.data.id);
			break;

			case 'read':
				console.info("Marked as read, id: "+event.notification.data.id); 
			break;

			default:
					clients.openWindow(url);				
		}		
});

