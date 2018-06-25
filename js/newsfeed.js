$(document).ready(function() {
	var displayName;
    var email;
    var emailVerified;
    var photoURL;
    var isAnonymous;
    var uid;
    var providerData;

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

	// leer base de datos
	firebase.database().ref("posts")
	.on("child_added", function(snapshot){
		var newPost = snapshot.val();
		dataURL = newPost.imgv;
		displayName = newPost.nombre;
		ubicacion =newPost.ubicacion;
		date = newPost.fecha;

		addPostData()
		console.log(newPost);
	});

	var btnAdd = $('#add-post');
	var foto;
	var ubicacion;
	var servicio;/*checked*/
	var costoServicio;
	var experiencia;
	var costoViaje;
	var userImg;
	var username;
	var date = moment().format("h:mm a, DD/MM/YYYY");
	var file;
	var reader;
	var dataURL;

	function imgUrl(fileInput) {
		reader = new FileReader();
		reader.onload = function(evt) {
			dataURL = evt.target.result;
			// addPostData();
			savePostData();
		}

		reader.readAsDataURL(fileInput.files[0]);
	}

	function getPostData(){
		console.log('click');
		foto = $('#foto-viaje')[0];
		ubicacion = $('#input-place').val();
		servicio = $('#hospdaje-opt').val();/*checked*/
		costoServicio = $('#costo-serv').val();
		experiencia = $('#text-experiencia').val();
		costoViaje = $('#costo-viaje').val();
		userImg = 'placeholder';
		username = 'placeholder';

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



	function addPostData(){
		var postTemplate = `<div class="row">
	    <div class="col s12 m8 l8 post-card">
	      <section><!--PRIMERA SECCIÓN Datos de usuario-->
	        <div class="row usuario-row no-margin">
	          <div class="col s3 m2">
	            <img id="user-photo" class="circle usuario-m" src="${photoURL}" alt="">
	          </div>
	          <div class="col s9 m8 l10">
	            <p id="user-name">${displayName}</p>
	            <div class="row no-margin">
	              <div class="col s1">
	                <i class="material-icons">place</i>
	              </div>
	              <div class="col s10">
	                <p id="cont-place">${ubicacion}</p>
	              </div>
	            </div>
	            <a id="mas-info" href="#">Mas info del viaje</a>
	          </div>
	        </div>   
	      </section><!--SEGUNDA SECCIÓN Fotos-->
	      <section class="row">
	        <img id="cont-foto-viaje" class="responsive-img viaje-img" src="${dataURL}" alt="">
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
	            <p class="right">${date}</p>
	          </div>
	        </div>
	      </section>
	    </div>
	  </div>`
	 $('main').append(postTemplate);
	 $('.modal').modal('close');
	}

	console.log(dataURL);

	// escribir en base de datos
	function savePostData () {
		var post = {
				nombre:displayName,
				ubicacion:ubicacion,
				imgv:dataURL,
				fecha:date,
				ownerID:uid
			};

		firebase.database().ref("posts")
		.push(post);
	}


	$('.modal').modal();
	btnAdd.click(getPostData);
	$('select').formSelect();

	




});
