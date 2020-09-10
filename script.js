//const parser = require('helpers/urlBase64ToUint8Array.js');
function loadImage(){

	console.log("Image block code running");
	setTimeout(function(){

	var img = new Image();
	img.src = "img/doomsday.jpg";

	document.body.appendChild(img);
}, 3000);
}

if('serviceWorker' in navigator && 'Notification' in window){

	window.onload = function(){
		loadImage();
		navigator.serviceWorker.register('/testesw/sw.js')
			.then(function(service){
				console.log("Service worker successfully registered");
			}, function(error){
				console.error('Ocorreu um erro ao registrar o service Worker: \n'+error);
			});

			navigator.serviceWorker.ready.then(function(registrator){

				const applicationServerKey = '666';//parser('');

				const options = {
					userVisibleOnly: true,
      				applicationServerKey
				};
				
				registrator.pushManager.subscribe(options).then(function(subscription){

					fetch('',{
						method: 'post',
						body: JSON.stringify(subscription)
					}).then(res => {
						console.log(res);
					}).catch( err => {
						console.error(err.message);
					})

				}, function(err){
					console.error(err.message);
				});

			});

			Notification.requestPermission().then(permission => {
				if(permission == "granted"){
					console.log('Granted!');
				}else{
					console.log('Not allowed')
				}
			});
		}
}

