// Configuração de rotas
const express = require('express');
const routes = express.Router();

// Controllers
const CardController = require('../app/controllers/CardController');

routes.get('/', CardController.index);
routes.post('/:id/add-one', CardController.addOne);
routes.post('/:id/remove-one', CardController.removeOne);
routes.post('/:id/delete', CardController.delete);

// Exporta as rotas
module.exports = routes;