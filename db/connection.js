// db/connection.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT, // default port for PostgreSQL is 5432
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};

