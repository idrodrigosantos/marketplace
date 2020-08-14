// Configuração de rotas
const express = require('express');
const routes = express.Router();

// Importa o Multer
const multer = require('./app/middleware/multer');

// Controllers
const ProductController = require('./app/controllers/ProductController');
const HomeController = require('./app/controllers/HomeController');
const SearchController = require('./app/controllers/SearchController');

// Página inicial
routes.get('/', HomeController.index);

// Pesquisar
routes.get('/products/search', SearchController.index);

// Cadastrar produto
routes.get('/products/create', ProductController.create);
routes.post('/products', multer.array('photos', 6), ProductController.post);

// Mostrar produto
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