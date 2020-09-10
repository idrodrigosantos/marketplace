// Importa a conexão com o banco de dados
const db = require('../../config/db');

// Importa e usa o Base
const Base = require('./Base');
Base.init({ table: 'products' });

module.exports = {
    ...Base,
    // Busca as imagens do produto
    async files(id) {
        const results = await db.query('SELECT * FROM files WHERE product_id = $1', [id]);

        return results.rows;
    },
    // Pesquisa produto
    async search({ filter, category }) {
        let query = `
            SELECT products.*,
                categories.name AS category_name
            FROM products
            LEFT JOIN categories ON (categories.id = products.category_id)
            WHERE 1 = 1
        `;

        if (category) {
            query += ` AND products.category_id = ${category}`
        }

        if (filter) {
            query += ` AND (products.name ilike '%${filter}%'
            OR products.description ilike '%${filter}%')`
        }

        query += ` AND status != 0`

        const results = await db.query(query);
        return results.rows;
    }
};