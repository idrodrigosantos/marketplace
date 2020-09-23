// Importa a conexão com o banco de dados
const db = require('../../config/db');

// Função sendo usada apenas no Base
function find(filters, table) {
    let query = `SELECT * FROM ${table}`;

    if (filters) {
        Object.keys(filters).map(key => {
            // WHERE | OR | AND
            // Precisa do espaço ` ${
            query += ` ${key}`;

            Object.keys(filters[key]).map(field => {
                // Precisa do espaço ` ${
                query += ` ${field} = '${filters[key][field]}'`;
            });
        });
    }

    return db.query(query);
};

const Base = {
    // Recebe o nome da tabela
    init({ table }) {
        // Se não tiver a tabela
        if (!table) {
            throw new Error('Params inválidos.');
        }

        // this está referindo o objeto Base
        this.table = table;
    },
    async find(id) {
        const results = await find({ where: { id } }, this.table);

        return results.rows[0];
    },
    async findOne(filters) {
        const results = await find(filters, this.table);

        return results.rows[0];
    },
    async findAll(filters) {
        const results = await find(filters, this.table);

        return results.rows;
    },
    async findOneWithDeleted(filters) {
        const results = await find(filters, `${this.table}_with_deleted`);

        return results.rows[0];
    },
    async create(fields) {
        try {
            let keys = [], values = [];

            // Object.keys(fields).map((key, index, array) => {
            //     if ((index + 1) < array.length) {
            //         keys += `${key},`;
            //         values += `${fields[key]},`;
            //     } else {
            //         keys += `${key}`;
            //         values += `${fields[key]}`;
            //     }
            // });
            // OU
            Object.keys(fields).map(key => {
                keys.push(key);
                values.push(`'${fields[key]}'`);
            });

            const query = `INSERT INTO ${this.table} (${keys.join(',')})
                VALUES (${values.join(',')}) RETURNING id
            `;

            const results = await db.query(query);

            return results.rows[0].id;
        } catch (error) {
            console.error(error);
        }
    },
    update(id, fields) {
        try {
            let update = [];

            Object.keys(fields).map(key => {
                const line = `${key} = '${fields[key]}'`;
                update.push(line);
            });

            let query = `UPDATE ${this.table} SET ${update.join(',')} WHERE id = ${id}`;

            return db.query(query);
        } catch (error) {
            console.error(error);
        }
    },
    delete(id) {
        return db.query(`DELETE FROM ${this.table} WHERE id = $1`, [id]);
    }
};

// Exporta o objeto
module.exports = Base;