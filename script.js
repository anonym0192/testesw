if('serviceWorker' in navigator ){

	window.onload = function(){
		navigator.serviceWorker.register('/testesw/sw.js')
			.then(function(service){
				console.log("Service worker successfully registered");
			}, function(error){
				console.error('Ocorreu um erro ao registrar o service Worker: \n'+error);
			});
		}
}