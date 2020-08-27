// Importa os pacotes
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);

// Importa a conexão com o banco de dados
const db = require('./db');

// Exporta o módulo 
module.exports = session({
    // Cria a sessão e guarda no banco de dados
    store: new pgSession({
        pool: db
    }),
    // Chave secreta
    secret: 'chavesecreta',
    // Quando atualizar o sistema, não salva a sessão, apenas quando requisitado
    resave: false,
    // Não salva a sessão se não hover dados
    saveUninitialized: false,
    // Quanto tempo a sessão vai ficar ativa
    cookie: {
        // 30 dias em milissegundos
        maxAge: 30 * 24 * 60 * 60 * 1000
    }
});