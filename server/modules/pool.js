const pg = require('pg');
const Pool = pg.Pool;

const pool = new Pool({
    database: 'bookstore',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
});

pool.on('connect' () => {
    console.log('Pool connected');
});

pool.on('error', (err) => {
    console.log('DB Error: ', err);
});

module.exports = pool;