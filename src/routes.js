// Configuração de rotas
const express = require('express');
const routes = express.Router();

// Controller
const ProductController = require('./app/controllers/ProductController');

// Rota inicial
routes.get('/', function (req, res) {
    return res.render('layout.njk');
});

// Rotas
routes.get('/products/create', ProductController.create);
routes.post('/products', ProductController.post);
routes.get('/products/:id/edit', ProductController.edit);
routes.put('/products', ProductController.put);
routes.delete('/products', ProductController.delete);

// Máscara para redirecionamento
routes.get('/ads/create', function (req, res) {
    return res.redirect('/products/create');
});

// Exporta o arquivo
module.exports = routes;