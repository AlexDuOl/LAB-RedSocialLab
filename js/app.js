var btnAdd = $('#add-post');
var foto;
var ubicacion;
var servicio;/*checked*/
var costoServicio;
var experiencia;
var costoViaje;
var userImg;
var username;

function getDataPost(){
	foto = $('#foto-viaje').val();
	ubicacion = $('#input-place').val();
	servicio = $('#hospdaje-opt').val();/*checked*/
	costoServicio = $('#costo-serv').val();
	experiencia = $('#text-experiencia').val();
	costoViaje = $('#costo-viaje').val();
	userImg = 'placeholder';
	username = 'placeholder';
	console.log( foto + ubicacion + servicio + costoServicio + experiencia + costoViaje);

	addPostData();
};



function addPostData(){
	var postTemplate = `<div class="row">
    <div class="col s12 m8 l8 post-card">
      <section><!--PRIMERA SECCIÓN Datos de usuario-->
        <div class="row usuario-row no-margin">
          <div class="col s3 m2">
            <img id="user-photo" class="circle usuario-m" src="${userImg}" alt="">
          </div>
          <div class="col s9 m8 l10">
            <p id="user-name">${username}</p>
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
        <img id="cont-foto-viaje" class="responsive-img viaje-img" src="${foto}" alt="">
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
            <p class="right">Fecha</p>
          </div>
        </div>
      </section>
    </div>
  </div>`
	$('main').append(postTemplate);
}


$(document).ready(function(){
    $('.modal').modal();
    btnAdd.click(getDataPost);
    $('select').formSelect();
});