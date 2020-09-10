// Importa e usa o Base
const Base = require('./Base');
Base.init({ table: 'files' });

module.exports = {
    ...Base,
};