let nombre =  document.getElementById("nombre");
let apellido = document.getElementById("apellido");
let segNombre = document.getElementById("segNombre");
let segApellido = document.getElementById("segApellido");
let tel = document.getElementById("tel");
let emailUser = document.getElementById("emailUser");
let empty = false;
let profileImg = document.getElementById("profileImg");

/*  Evento que es lanzado cuando carga el DOM
    envia a función para verificar login    */
document.addEventListener("DOMContentLoaded", () => {
    checkLogin();
});

//Verifica que esté logeado.
function checkLogin() {
    if(localStorage.getItem("userInput") !== null){
        showUser();
    };
};

//Validacion de campos requeridos llenos
function validate() {
    'use strict'

    // Obtener todos los formularios a los que queremos aplicar estilos de validación de Bootstrap personalizados
    var forms = document.querySelectorAll('.needs-validation')

    // Bucle sobre ellos y evitar el envío
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()){
            event.preventDefault()
            event.stopPropagation()
        }

            form.classList.add('was-validated')
        }, false
        )
        })
};

//Guarda la info de los input en localStorage
function saveProfileData() {
    localStorage.setItem("nombre", nombre.value);
    localStorage.setItem("segNombre", segNombre.value);
    localStorage.setItem("apellido", apellido.value);
    localStorage.setItem("segApellido", segApellido.value);
    localStorage.setItem("tel", tel.value);
}

/*  En caso de tener info guardada en localStorage, 
    se muestra al usuario   */
function showUser() {
    emailUser.value = localStorage.getItem("userInput")
    nombre.value = localStorage.getItem("nombre")
    segNombre.value = localStorage.getItem("segNombre")
    apellido.value = localStorage.getItem("apellido")
    segApellido.value = localStorage.getItem("segApellido")
    tel.value = localStorage.getItem("tel")
    if (localStorage.getItem("newImage") !== null)
    {profileImg.src = localStorage.getItem("newImage")}
}

/*  Desafio, con FileReader() - 
    fileReader envia la img como un resultado que se envia al src de la imagen */
function readURL(myImg){
    const reader = new FileReader();
  
    reader.addEventListener("load", () =>{
      localStorage.setItem("newImage", reader.result);
      profileImg.src = reader.result;
    })
  
    reader.readAsDataURL(myImg.files[0]);
  }
