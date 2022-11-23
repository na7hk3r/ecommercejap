const express = require("express")
const cors = require('cors')
const app = express();

app.use(cors())

app.options('*', cors()) 

//  Endpoint Inicial
app.get('/', (req, res) => {
    res.send("Hola Mundo! Servidor local de Mathias Curbelo, para entregaFinal JAP 2022")
});

//  .JSON Categorias
app.get('/cats', (req, res) => {
    res.json(require("./json/cats/cat.json"))
});

// .JSON Categorias - Productos
app.get('/cats_products/:catID', (req, res) => {
    res.json(require("./json/cats_products/" + req.params.catID)) //  + ".json"
});

//  .JSON Productos
app.get('/products/:id', (req, res) => {
    res.json(require("./json/products/" + req.params.id)) // + ".json"
})

//  .JSON Comentarios Productos
app.get('/products_comments/:id', (req, res) => {
    res.json(require("./json/products_comments/" + req.params.id)) //  + ".json"
})

//  .JSON Venta
app.get('/sell', (req, res) => {
    res.json(require("./json/sell/publish.json"))
});

//  .JSON Carrito de Usuario
app.get('/user_cart', (req, res) => {
    res.json(require("./json/user_cart/25801.json"))
})

//  .JSON Carrito
app.get('/cart', (req, res) => {
    res.json(require("./json/cart/buy.json"))
})

// Puerto donde escucha 
app.listen(8000, () => {
    console.log("Aplicacion escuchando en puerto 8000!")
});

