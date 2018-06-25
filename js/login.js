$(document).ready(function(){
	var provider = new firebase.auth.GoogleAuthProvider();
	$('#log-in').click(function () {
		console.log('login');
		firebase.auth().signInWithPopup(provider).then(function(result) {
			// obtener nobre y foto del usuario loggeado
			console.log(result,"holi")

			window.location.href += "vistas/newsfeed.html";
		}).catch(error => console.log(error));

	});
});

