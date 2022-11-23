const CATEGORIES_URL = "http://localhost:8000/cats";
const PUBLISH_PRODUCT_URL = "http://localhost:8000/publish.json";
const PRODUCTS_URL = "http://localhost:8000/cats_products/";
const PRODUCT_INFO_URL = "http://localhost:8000/products/";
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:8000/products_comments/";
const CART_INFO_URL = "http://localhost:8000/user_cart/";
const CART_BUY_URL = "http://localhost:8000/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
};

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
};

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = "ok";
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = "error";
      result.data = error;
      hideSpinner();
      return result;
    });
};

/* Cierra sesión, quita el item del local Storage 
      y reinicia el nombre de la etiqueta*/
function cerrarSesion() {
  localStorage.removeItem("userInput");
  user.innerHTML = "Iniciar Sesión";
}

function loginUser() {
  let user = document.getElementById("user");
  let getUserInput = localStorage.getItem("userInput");

  if (getUserInput !== "null") {
    user.innerHTML = getUserInput;
  }
}
