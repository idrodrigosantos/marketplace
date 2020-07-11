// Importa os pacotes
const express = require('express');
const nunjucks = require('nunjucks');

// Importa as rotas
const routes = require('./routes');

// Importa o method-override
const methodOverride = require('method-override');

// Cria o servidor
const server = express();

// Funcionamento do req.body do post, enviando os dados do formulário
server.use(express.urlencoded({ extended: true }));

// Para usar arquivos estáticos
server.use(express.static('public'));

// Configuração method-override
server.use(methodOverride('_method'));

// Usa as rotas
server.use(routes);

// Configuração do nunjucks
server.set('view engine', 'njk');
nunjucks.configure('src/app/views', {
    express: server,
    // Não faz cache no navegador
    noCache: true
});

// Inicia o servidor na porta 5000
server.listen(5000, function () {
    console.log('Server is running.');
});