const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.db_user,
    password: process.env.db_password,
    host: process.env.db_host,
    port: process.env.db_PORT,
    database: process.env.database
});

pool.on('error', (err, client) => {
    console.log('Unexpected error on idle client', err);
    process.exit(-1);
});

pool.connect()
.then(() => console.log('Connected to Postgres'))
.catch((err) => console.log('Error with postgres connection', err));


module.exports = { pool };


// user: postgres, pwd: tracker123 