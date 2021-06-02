// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDzI42OWO37frfJ-G8Svs-L7wlU4Z-Ft-Q",
    authDomain: "adminbasedatos-40c56.firebaseapp.com",
    projectId: "adminbasedatos-40c56",
    storageBucket: "adminbasedatos-40c56.appspot.com",
    messagingSenderId: "628502551851",
    appId: "1:628502551851:web:76ab1b508fb134b9feb96e"
  };
  // Initialize Firebase
  firebase.initializeApp({
    apiKey: "AIzaSyDzI42OWO37frfJ-G8Svs-L7wlU4Z-Ft-Q",
    authDomain: "adminbasedatos-40c56.firebaseapp.com",
    projectId: "adminbasedatos-40c56",
  });
  var db = firebase.firestore();

  observador();

function registro(){

    var correo =document.getElementById('correo').value;
    var id = document.getElementById('id1').value;
    var curp = document.getElementById('curp').value;
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellidos').value;
    var edad = document.getElementById('edad').value;
    var domicilio = document.getElementById('domicilio').value;
    var municipio = document.getElementById('municipio').value;
    var contraseña = document.getElementById('contraseña').value;

firebase.auth().createUserWithEmailAndPassword(correo, contraseña)
.then((userCredential) => {

  db.collection("Informacion").add({
      id: id,
      curp: curp,
      nombre: nombre,
      apellido: apellido,
      edad: edad,
      domicilio: domicilio,
      municipio: municipio,
      
      })
  verificar();
  console.log("Usuario Guardado");
})

.catch((error) => {
  console.error("Error adding document: ", error);
  var errorCode = error.code;
  var errorMessage = error.message;
  // ..
  console.log(errorCode);
  console.log(errorMessage);
});    
}

function verificar(){
  var user = firebase.auth().currentUser;
  user.sendEmailVerification().then(function(){
    console.log("email enviado....")

  }).catch(function(error){
    console.log("error al enviar email....")

  });
}

function observador(){
  firebase.auth().onAuthStateChanged((user) => {
    if (user){
      var uid = user.uid;
      var email = user.email;
      console.log("idusuario: ",uid,", email: ",email);
    }else{
      console.log("el usuarion no ha iniciado sesion")

    }
  });
}

function ingresar(){

  var correo =document.getElementById('correo2').value;
  var contraseña = document.getElementById('contraseña2').value;

  firebase.auth().signInWithEmailAndPassword(correo, contraseña)
.then((user) => {
  // Signed in
  // ...
  console.log("el usuario inicio sesion")
  mostrar();
})
.catch((error) => {
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log(errorCode);
  console.log(errorMessage);
});
}

function cerrar(){
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    window.location.reload();
    console.log("sesion cerrada");
  }).catch((error) => {
    // An error happened.
    console.log(error);
  });
}

function mostrar(){
  var mostrar = document.getElementById('mostrar');
  mostrar.innerHTML = `<button class="btn btn-danger" onclick = "cerrar()"> Cerrar Sesion </button>`
}