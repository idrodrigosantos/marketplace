// Configuração de rotas
const express = require('express');
const routes = express.Router();

// Importa o Multer
const multer = require('../app/middlewares/multer');

// Controllers
const ProductController = require('../app/controllers/ProductController');
const SearchController = require('../app/controllers/SearchController');

const { onlyUsers } = require('../app/middlewares/session');

const Validator = require('../app/validators/product');

// Pesquisar
routes.get('/search', SearchController.index);

// Cadastrar produto
routes.get('/create', onlyUsers, ProductController.create);
routes.post('/', onlyUsers, multer.array('photos', 6), Validator.post, ProductController.post);

// Mostrar produto
routes.get('/:id', ProductController.show);

// Editar produto
routes.get('/:id/edit', onlyUsers, ProductController.edit);
routes.put('/', onlyUsers, multer.array('photos', 6), Validator.put, ProductController.put);

// Deletar produto
routes.delete('/', onlyUsers, ProductController.delete);

// Exporta as rotas
module.exports = routes;