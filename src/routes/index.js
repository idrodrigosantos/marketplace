// Configuração de rotas
const express = require('express');
const routes = express.Router();

// Controllers
const HomeController = require('../app/controllers/HomeController');

// Importa as rotas
const products = require('./products');
const users = require('./users');
const cart = require('./cart');
const orders = require('./orders');

// Página inicial
routes.get('/', HomeController.index);

// Adiciona o /products na frente de todas rotas do routes/products.js
routes.use('/products', products);
// Adiciona o /users na frente de todas rotas do routes/users.js
routes.use('/users', users);
// Adiciona o /cart na frente de todas rotas do routes/cart.js
routes.use('/cart', cart);
// Adiciona o /orders na frente de todas rotas do routes/orders.js
routes.use('/orders', orders);

// Máscara para redirecionamento
routes.get('/ads/create', function (req, res) {
    return res.redirect('/products/create');
});

routes.get('/accounts', function (req, res) {
    return res.redirect('/users/login');
});

// Exporta as rotas
module.exports = routes;