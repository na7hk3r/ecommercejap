const URL = PRODUCTS_URL + localStorage.catID; // + EXT_TYPE
let arrayProductos = [];

const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_ASC_BY_PRICE = "Menor a Mayor";
const ORDER_DES_BY_PRICE = "Mayor a Menor";
const ORDER_BY_PROD_COUNT = "Cant.";

let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;
let inputSearch = undefined;

// Funcion para mostrar los productos obtenidos del JSON en un div de ID lista

function mostrarProductos() {
    let htmlContentToAppend = "";

    for (let i = 0; i < arrayProductos.length; i++) {
        let product = arrayProductos[i];
    
        if (((minCount == undefined) || (minCount != undefined && parseInt(product.soldCount) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.soldCount) <= maxCount))) {

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action cursor-active" onClick="setCatID(${product.id})">
            <div class="row">
                <div class="col-3">
                    <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">${product.name}-${product.cost}${" "}${product.currency}</h4>
                        <small class="text-muted">${product.soldCount} vendidos</small>
                    </div>
                    <p class="mb-1">${product.description}</p>
                </div>
            </div>
        </div>
        `
        } 
        document.getElementById("lista").innerHTML = htmlContentToAppend;
    }
}

// Esta funcion es como la de mostrarProductos, pero con el mixCount y maxCount para filtrar precios, no cantidad.

function mostrarProductosCost() {
    let htmlContentToAppend = "";

    for (let i = 0; i < arrayProductos.length; i++) {
        let product = arrayProductos[i];
    
        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))) {

        htmlContentToAppend += `
        <div  class="list-group-item ">
            <div class="row">
                <div class="col-3">
                    <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">${product.name}-${product.cost}${" "}${product.currency}</h4>
                        <small class="text-muted">${product.soldCount} vendidos</small>
                    </div>
                    <p class="mb-1">${product.description}</p>
                </div>
            </div>
        </div>
        `
        }
        document.getElementById("lista").innerHTML = htmlContentToAppend;
    }
}

// Filtrado de búsqueda

function mostrarProductosSearch() {
    let htmlContentToAppend = "";

    for (let i = 0; i < arrayProductos.length; i++) {
        let product = arrayProductos[i];
    
        if (((inputSearch == undefined) || (inputSearch != undefined && product.name.includes(inputSearch))) ||
            ((inputSearch == undefined) || (inputSearch != undefined && product.description.includes(inputSearch))))
        {

        htmlContentToAppend += `
        <div  class="list-group-item list-group-item-action cursor-active" onClick="setCatID(${product.id})">
            <div class="row">
                <div class="col-3">
                    <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">${product.name}-${product.cost}${" "}${product.currency}</h4>
                        <small class="text-muted">${product.soldCount} vendidos</small>
                    </div>
                    <p class="mb-1">${product.description}</p>
                </div>
            </div>
        </div>
        `
        }
        document.getElementById("lista").innerHTML = htmlContentToAppend;
    }
}

// Comprobaciones para filtro

function sortProducts(criterio, array){
    let result = [];
    if (criterio === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }else if (criterio === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    } else if (criterio == ORDER_ASC_BY_PRICE){
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criterio === ORDER_DES_BY_PRICE){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criterio === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

// Funcion para filtrar y mostrar ordenadamente

function sortAndShowCategories(sortCriteria, categoriesArray){
    currentSortCriteria = sortCriteria;

    if(categoriesArray != undefined){
        arrayProductos = categoriesArray;
    }

    arrayProductos = sortProducts(currentSortCriteria, arrayProductos);

    //Muestro las categorías ordenadas
    mostrarProductos()
}

/* Cuando el contenido carga, se activa la funcion de obtener info de "PRODUCTS_URL" 
   encontrado en init.js para que sea leido como JSON, le agrego la extensión .json 
   contenida en la variable EXT_TYPE*/

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL + localStorage.catID + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            arrayProductos = resultObj.data.products;
            mostrarProductos();
            document.getElementById('nombreCat').innerHTML = resultObj.data.catName;
            document.getElementById('titleCat').innerHTML = resultObj.data.catName;
        }
    });

            document.getElementById("sortAsc").addEventListener("click", function(){
                sortAndShowCategories(ORDER_ASC_BY_NAME);
            });
        
            document.getElementById("sortDesc").addEventListener("click", function(){
                sortAndShowCategories(ORDER_DESC_BY_NAME);
            });

            document.getElementById("priceAsc").addEventListener("click", function(){
                sortAndShowCategories(ORDER_ASC_BY_PRICE);
            });
        
            document.getElementById("priceDesc").addEventListener("click", function(){
                sortAndShowCategories(ORDER_DES_BY_PRICE);
            });
        
            document.getElementById("sortByCount").addEventListener("click", function(){
                sortAndShowCategories(ORDER_BY_PROD_COUNT);
            });
            
            document.getElementById("clearRangeFilter").addEventListener("click", function(){
                document.getElementById("rangeFilterCountMin").value = "";
                document.getElementById("rangeFilterCountMax").value = "";
        
                minCount = undefined;
                maxCount = undefined;
        
                mostrarProductos();
            });

            document.getElementById("search").addEventListener("click", function(){ 
                inputSearch = document.getElementById("searchInput").value;

                if ((inputSearch != undefined) && (inputSearch != "")) {
                    inputSearch = inputSearch;
                }
                else{
                    inputSearch = undefined;
                } 
                
                mostrarProductosSearch();
            });

            document.getElementById("rangeFilterCount").addEventListener("click", function(){
                //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
                //de productos por categoría.
                minCount = document.getElementById("rangeFilterCountMin").value;
                maxCount = document.getElementById("rangeFilterCountMax").value;
        
                if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
                    minCount = parseInt(minCount);
                }
                else{
                    minCount = undefined;
                }
        
                if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
                    maxCount = parseInt(maxCount);
                }
                else{
                    maxCount = undefined;
                }
        
                mostrarProductosCost();
            });
});

function setCatID(id) {
    localStorage.setItem("catID", id);
    window.location = "product-info.html"
}