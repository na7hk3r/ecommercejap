const URL = CART_INFO_URL; // + "25801" + EXT_TYPE
let carritoUsuario = JSON.parse(localStorage.getItem('cartID'));
let producto = {};
let unitPrice = 0;
let costoEnvio = 0;
let subTotal = 0;
let fechaActual = new Date();
let mesActual = fechaActual.getFullYear() + "-" + (fechaActual.getMonth() + 1);


// Hago la peticion al fetch dentro de un evento a la escucha de la carga del contenido.
document.addEventListener("DOMContentLoaded", () => {
    getJSONData(URL)
    .then(function (resultObj) {
            if (resultObj.status === "ok") {
                producto = resultObj.data;
                showCartInfo();
                compra();
                validarPago();
            }
        })
    }
);

// Muestro la información del producto a añadirse en la tabla
function showCartInfo() {
    unitPrice = producto.articles[0].unitCost

    productoCarrito = `
          <tr id="prod">
            <th scope="row">
                <img class="img-thumbnail" width=150rem src="${producto.articles[0].image}"/>
            </th>
            <td>${producto.articles[0].name}</td>
            <td>${producto.articles[0].currency} ${unitPrice}</td>
            <td>
                <div class="form-group col">
                    <input type="number" value=1 min=1 id="cantArticulo" style="width: 20%" onchange="subtotal()">
                </div>
           </td>
            <td><strong>${producto.articles[0].currency} <span id="subtotal">${unitPrice}</span></strong></td> 
            <td><button class="btn btn-outline-danger"><i class="bi bi-trash3-fill cursor-active" onclick="eliminar()"></i></button></td>
          </tr>
    `
document.getElementById("cartProduct").innerHTML = productoCarrito;
}

// Agrego el/los producto almacenado en localStorage a la tabla del carrito
function compra() {
if (carritoUsuario != undefined) {
    let nuevoProducto = "";

    for (let i = 0; i < carritoUsuario.length; i++) {
        let carriProd = carritoUsuario[i].articles[0];

        nuevoProducto = `
        <tr id="prod">
            <th scope="row">
                <img class="img-thumbnail" width=150rem src="${carriProd.image}"/>
            </th>
            <td>${carriProd.name}</td>
            <td>${carriProd.currency} ${carriProd.unitCost}</td>
            <td>
                <div class="form-group col">
                    <input type="number" value=1 min=1 id="cantArticulo" style="width: 20%" onchange="subtotal()">
                </div>
           </td>
            <td><strong>${carriProd.currency} <span id="subtotal">${carriProd.unitCost}</span></strong></td>
            <td><button class="btn btn-outline-danger"><i class="bi bi-trash3-fill cursor-active" onClick="eliminar()"></i></button></td>
          </tr>
        `
        document.getElementById("cartProduct").innerHTML += nuevoProducto;
    }
}
}

// Calcular costo de envío
function calcEnvio() {
    if (document.getElementById("standard").checked) {
        costoEnvio = subTotal * 0.05
        document.getElementById("shippingCost").innerHTML = costoEnvio
    } else if (document.getElementById("express").checked) {
        costoEnvio = subTotal * 0.07
        document.getElementById("shippingCost").innerHTML = costoEnvio
    } else if (document.getElementById("premium").checked) {
        costoEnvio = subTotal * 0.15
        document.getElementById("shippingCost").innerHTML = costoEnvio
    }
};

// Calculo el subtotal (onchange) en esta misma muestra TOTAL
function subtotal() {
    let cantArtic = parseFloat(document.getElementById("cantArticulo").value)
    subTotal = parseFloat(document.getElementById("subtotal").innerText)
    let envio = parseInt(document.getElementById("shippingCost").innerText)

    document.getElementById("subtotal").innerHTML = unitPrice * cantArtic
    document.getElementById("subtotalInicial").innerHTML = subTotal

    document.getElementById("totalFinal").innerHTML = subTotal + envio

} 

// Eliminar productos
function eliminar() {
        localStorage.removeItem('cartID');
        location.reload();
}

// Validacion de formulario
function validacion() {
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
        }, false)
      })
    validarPago()
    swal("Compra realizada", "Ha finalizado con éxito el procedimiento de compra.", "success");
};

// Validacion de modal
function validarPago() {
        let credCard = document.getElementById("credCard");
        let transBank = document.getElementById("transBank");
        let cardInput = document.getElementById("cardInput");
        let secCode = document.getElementById("secCode");
        let vencimiento = document.getElementById("vencimiento");
        let accNum = document.getElementById("accNum");
    
        if (credCard.checked) {
            accNum.value = "";
            accNum.setAttribute('disabled', 'disabled');
            cardInput.removeAttribute('disabled');
            secCode.removeAttribute('disabled');
            vencimiento.removeAttribute('disabled');
            cardInput.classList.remove("is-invalid");
            cardInput.classList.remove("is-valid");
            cardInput.setAttribute('required', 'required');
            secCode.setAttribute('required', 'required');
            vencimiento.setAttribute('required', 'required');
            accNum.removeAttribute('required')
            vencimiento.setAttribute("min", `${mesActual}`);
        }
    
        if (transBank.checked) {
            cardInput.value = "";
            cardInput.setAttribute('disabled', 'disabled');
            secCode.value = "";
            secCode.setAttribute('disabled', 'disabled');
            vencimiento.value = "";
            vencimiento.setAttribute('disabled', 'disabled');
            accNum.removeAttribute('disabled');
            cardInput.classList.remove("is-invalid");
            cardInput.classList.remove("is-valid")
            secCode.classList.remove("is-invalid");
            secCode.classList.remove("is-valid");
            vencimiento.classList.remove("is-invalid");
            vencimiento.classList.remove("is-valid");
            cardInput.removeAttribute('required');
            secCode.removeAttribute('required');
            vencimiento.removeAttribute('required');
            accNum.setAttribute('required', 'required');
        }
};

