// Importa a conexão com o banco de dados
const db = require('../../config/db');

module.exports = {
    all() {
        return db.query('SELECT * FROM categories');
    }
}