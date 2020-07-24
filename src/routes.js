// Configuração de rotas
const express = require('express');
const routes = express.Router();

// Importa o Multer
const multer = require('./app/middleware/multer');

// Controller
const ProductController = require('./app/controllers/ProductController');

// Rota inicial
routes.get('/', function (req, res) {
    return res.render('layout.njk');
});

// Cadastrar produto
routes.get('/products/create', ProductController.create);
routes.post('/products', multer.array('photos', 6), ProductController.post);

// Mostra Produto
routes.get('/products/:id', ProductController.show);

// Editar produto
routes.get('/products/:id/edit', ProductController.edit);
routes.put('/products', multer.array('photos', 6), ProductController.put);

// Deletar produto
routes.delete('/products', ProductController.delete);

// Máscara para redirecionamento
routes.get('/ads/create', function (req, res) {
    return res.redirect('/products/create');
});

// Exporta o arquivo
module.exports = routes;