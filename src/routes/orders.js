// Configuração de rotas
const express = require('express');
const routes = express.Router();

// Controllers
const OrderController = require('../app/controllers/OrderController');

const { onlyUsers } = require('../app/middlewares/session');

routes.get('/', onlyUsers, OrderController.index);
routes.post('/', onlyUsers, OrderController.post);
routes.get('/sales', onlyUsers, OrderController.sales);
routes.get('/:id', onlyUsers, OrderController.show);
routes.post('/:id/:action', onlyUsers, OrderController.update);

// Exporta as rotas
module.exports = routes;