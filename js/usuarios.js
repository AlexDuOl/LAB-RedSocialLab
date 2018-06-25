
var imageUser;

var config = {
    apiKey: "AIzaSyApDpoaeUms46ufKn1l0Esp-4IvEPuaNyA",
    authDomain: "vive-mexico-f7c49.firebaseapp.com",
    databaseURL: "https://vive-mexico-f7c49.firebaseio.com",
    projectId: "vive-mexico-f7c49",
    storageBucket: "vive-mexico-f7c49.appspot.com",
    messagingSenderId: "489916603655"
  };
  firebase.initializeApp(config);

firebase.database().ref("posts")
.on("child_added", function(s){
    var user = s.val();
    imageUser = user.imgv; 
    console.log(imageUser);
});


var template = '<table class="container">'+
                  '<tbody>'+
                    '<tr class="row">'+
                      '<td class="col s4">__img1__</td>'+
                      '<td class="col s4">__img2__</td>'+
                      '<td class="col s4">__img3__</td>'+
                    '</tr>'+
                  '</tbody>'+
                '</table>'+


$(document).ready( function () {
    var finalTemplate = "";
    finalTemplate = template.replace('__img1__', imageUser);
    $('section').append(finalTemplate);
} );