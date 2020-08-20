// Configuração de rotas
const express = require('express');
const routes = express.Router();

// Importa o Multer
const multer = require('../app/middleware/multer');

// Controllers
const ProductController = require('../app/controllers/ProductController');
const SearchController = require('../app/controllers/SearchController');

// Pesquisar
routes.get('/search', SearchController.index);

// Cadastrar produto
routes.get('/create', ProductController.create);
routes.post('/', multer.array('photos', 6), ProductController.post);

// Mostrar produto
routes.get('/:id', ProductController.show);

// Editar produto
routes.get('/:id/edit', ProductController.edit);
routes.put('/', multer.array('photos', 6), ProductController.put);

// Deletar produto
routes.delete('/', ProductController.delete);

// Exporta as rotas
module.exports = routes;