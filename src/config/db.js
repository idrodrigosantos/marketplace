// Conexão com o banco de dados
const { Pool } = require('pg');

module.exports = new Pool({
    // user: 'Usuário PostgreSQL',
    // password: 'Senha PostgreSQL',
    host: 'localhost',
    port: 5432,
    database: 'marketplace'
});