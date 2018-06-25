window.onload = inicializar;
var fichero;
var storageRef;

function inicializar (){
    fichero = document.getElementById("newImage");
    fichero.addEventListener("change", uploadImages, false);

    storageRef = firebase.storage().ref();
};

function uploadImages(){
    var uploadImage = fichero.files[0];

    var uploadTask = storageRef.child('images/' + uploadImage.name).put(uploadImage);
};