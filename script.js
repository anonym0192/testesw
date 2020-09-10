const parser = require('helpers/urlBase64ToUint8Array.js');

if('serviceWorker' in navigator && 'Notification' in window){

	window.onload = function(){
		navigator.serviceWorker.register('/testesw/sw.js')
			.then(function(service){
				console.log("Service worker successfully registered");
			}, function(error){
				console.error('Ocorreu um erro ao registrar o service Worker: \n'+error);
			});

			navigator.serviceWorker.ready.then(function(registrator){

				const applicationServerKey = parser('');

				const options = {
					userVisibleOnly: true,
      				applicationServerKey
				};
				
				registrator.subscribe(options).then(function(subscription){

					console.info(subscription);

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


window.onload = function(){

		setTimeout(function(){

		var img = new Image();
		img.src = "img/doomsday.jpg";

		document.body.appendChild(img);
	}, 3000);
}
