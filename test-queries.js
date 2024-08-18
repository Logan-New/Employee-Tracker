// test-queries.js
const db = require('./db/connection.js'); // Adjust path if necessary

const testQueries = async () => {
    try {
        const result = await db.query('SELECT NOW()');
        console.log('Query result:', result.rows);
    } catch (err) {
        console.error('Query error:', err);
    }
};

testQueries();
