self.addEventListener('install', function(event){
	console.log("installing the Service Worker");
	self.skipWaiting();

});

self.addEventListener('activate', function(event){

	console.log("activating service worker");
});