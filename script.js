if('serviceWorker' in navigator ){

	window.onload = function(){
		navigator.serviceWorker.register('/testesw/sw.js')
			.then(function(){
				console.log("Service worker successfully registered");
			}, function(e){
				//console.error('Ocorreu um erro ao registrar o service Worker: \n'+error);
			});
	}
}
