if('serviceWorker' in navigator && 'Notification' in window){

	window.onload = function(){
		navigator.serviceWorker.register('/testesw/sw.js')
			.then(function(service){
				console.log("Service worker successfully registered");
			}, function(error){
				console.error('Ocorreu um erro ao registrar o service Worker: \n'+error);
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

setTimeout(function(){
	var img = new Image();
	img.src = "img/doomsday.jpg";

	document.body.appendChild(img);
}, 3000);