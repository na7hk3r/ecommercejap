function controlError() {

    var error = false;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    // Comprobación de campos vacios:

    if (email == "" || !email.includes('@')) {
        error = true;
    }
    
    if (password == "") {
        error = true;
    } 

    if (error) {
        alertError();
    } else {
        location.href='./index.html';
    }
}

function alertError() {
    document.getElementById("alertaLogin").classList.add("show");
}

function regresar() {
    document.getElementById("regresar").addEventListener('click', () => {
        location.href='./index.html';
    })
};

    // Capturar nombre de usuario en localStorage: 

document.getElementById("submit").addEventListener('click', () => {
    localStorage.setItem("userInput", document.getElementById('email').value)
});
