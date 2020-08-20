// Configuração de rotas
const express = require('express');
const routes = express.Router();

// Controllers
const UserController = require('../app/controllers/UserController');

// Validator
const Validator = require('../app/validators/user');

// Registro usuário
routes.get('/register', UserController.registerForm);
routes.post('/register', Validator.post, UserController.post);
routes.get('/', UserController.show);

// Exporta as rotas
module.exports = routes;