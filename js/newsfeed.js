$(document).ready(function() {
	// Se eliminaron algunas variables que no se estaban utilizando
	// Variables on TOP
	var displayName;
    var email;
    var emailVerified;
    var photoURL;
    var isAnonymous;
    var uid;
    var providerData;
    var authorAvatar;

    var btnAdd = $('#add-post');
	var foto;
	var ubicacion;
	var servicio;/*checked*/
	var costoServicio;
	var experiencia;
	var costoViaje;
	var date = moment().format("h:mm a, DD/MM/YYYY");
	var reader;
	var dataURL;
	
	// leer base de datos

	firebase.database().ref("posts")
	.on("child_added", function(snapshot){
			var newPost = snapshot.val();
			// addPostData ahora acepta parametros pues no es necesario agregar los post en el click del boton
			// Y agrega el post igual que los post ya existentes
			addPostData(newPost.authorAvatar, newPost.nombre, newPost.ubicacion, newPost.imgv, newPost.fecha);
	});

	    // datos de usuario
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
		    // User is signed in.
		   	displayName = user.displayName;
			email = user.email;
			emailVerified = user.emailVerified;
			photoURL = user.photoURL;
			isAnonymous = user.isAnonymous;
			uid = user.uid;
			providerData = user.providerData;
			
		} else {
		    window.location = "403.html";
		}
	});


	function imgUrl(fileInput) {
		reader = new FileReader();
		reader.onload = function(evt) {
			dataURL = evt.target.result;
			// SE removio addpost de aqui pues lo hace en el evento de firebase
			savePostData();
		}

		reader.readAsDataURL(fileInput.files[0]);
	}

	// escribir en base de datos
	function savePostData () {
		var post = {
				nombre:displayName,
				ubicacion:ubicacion,
				imgv:dataURL,
				fecha:date,
				ownerID:uid,
				authorAvatar: photoURL ,
			};

		firebase.database().ref("posts")
		.push(post);
	}

	function getPostData(){
		foto = $('#foto-viaje')[0];
		ubicacion = $('#input-place').val();
		servicio = $('#hospdaje-opt').val();
		costoServicio = $('#costo-serv').val();
		experiencia = $('#text-experiencia').val();
		costoViaje = $('#costo-viaje').val();

		if(foto.value && ubicacion){
			imgUrl(foto);
		} else {
			$('.file-path-wrapper').attr('style', 'background:red;');
			$('#input-place').attr('style', 'background:red;');
			console.log('missing information');
		}

		$('.file-path').val('');
		$('#input-place').val('');
		$('#hospdaje-opt').val('');/*checked*/
		$('#costo-serv').val('');
		$('#text-experiencia').val('');
		$('#costo-viaje').val('');
		
	};
	// Se opto por parametros en lugar de variables
	function addPostData(authorAvatar, authorName, location, imageURI, datePublished){
		var postTemplate = `<div class="row">
	    <div class="col s12 m8 l8 post-card">
	      <section><!--PRIMERA SECCIÓN Datos de usuario-->
	        <div class="row usuario-row no-margin">
	          <div class="col s3 m2">
	            <img id="user-photo" class="circle usuario-m" src="${authorAvatar}" alt="">
	          </div>
	          <div class="col s9 m8 l10">
	            <p id="user-name">${authorName}</p>
	            <div class="row no-margin">
	              <div class="col s1">
	                <i class="material-icons">place</i>
	              </div>
	              <div class="col s10">
	                <p id="cont-place">${location}</p>
	              </div>
	            </div>
	            <a id="mas-info" href="#">Mas info del viaje</a>
	          </div>
	        </div>   
	      </section><!--SEGUNDA SECCIÓN Fotos-->
	      <section class="row">
	        <img id="cont-foto-viaje" class="responsive-img viaje-img" src="${imageURI}" alt="">
	      </section>
	      <section><!--TERCERA SECCIÓN Iconos-->
	        <div class="row no-margin">
	          <div class="col s6">
	            <div class="row">
	              <div class="col s3">
	                <a href="#"><i class="material-icons">favorite_border</i></a>
	              </div>
	              <div class="col s3">
	                <a href="#"><i class="material-icons">insert_comment</i></a>
	              </div>
	              <div class="col s3">
	                <a href="#"><i class="material-icons">share</i></a>
	              </div>
	              <div class="col s3">
	                <a href="#">#Likes</a>
	              </div>
	            </div>
	          </div>
	          <div class="col s6">
	            <p class="right">${datePublished}</p>
	          </div>
	        </div>
	      </section>
	    </div>
	  </div>`
	 $('main').append(postTemplate);
	 $('.modal').modal('close');
	}


	$('.modal').modal();
	btnAdd.click(getPostData);
	$('select').formSelect();
});
