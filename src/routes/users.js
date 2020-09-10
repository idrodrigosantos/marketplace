// Configuração de rotas
const express = require('express');
const routes = express.Router();

// Controllers
const UserController = require('../app/controllers/UserController');
const SessionController = require('../app/controllers/SessionController');
const OrderController = require('../app/controllers/OrderController');

// Validators
const UserValidator = require('../app/validators/user');
const SessionValidator = require('../app/validators/session');

const { isLoggedRedirectToUsers, onlyUsers } = require('../app/middlewares/session');

// Login / logout
routes.get('/login', isLoggedRedirectToUsers, SessionController.loginForm);
routes.post('/login', SessionValidator.login, SessionController.login);
routes.post('/logout', SessionController.logout);

// Resetar senha / esqueceu senha
routes.get('/forgot-password', SessionController.forgotForm);
routes.get('/password-reset', SessionController.resetForm);
routes.post('/forgot-password', SessionValidator.forgot, SessionController.forgot);
routes.post('/password-reset', SessionValidator.reset, SessionController.reset);

// Registro usuário
routes.get('/register', UserController.registerForm);
routes.post('/register', UserValidator.post, UserController.post);
routes.get('/', onlyUsers, UserValidator.show, UserController.show);
routes.put('/', UserValidator.update, UserController.update);
routes.delete('/', UserController.delete);

// Listagem de anúncios do usuário
routes.get('/ads', UserController.ads);

// Compra de produtos
routes.post('/orders', onlyUsers, OrderController.post);

// Exporta as rotas
module.exports = routes;