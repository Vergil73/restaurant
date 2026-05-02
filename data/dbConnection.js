const { Pool } = require('pg');

// Creating a connection to the local postgres database
// const pool = new Pool({
//     user: process.env.db_user,
//     password: process.env.db_password,
//     host: process.env.db_host,
//     port: process.env.db_PORT,
//     database: process.env.database,
//     ssl: false
// });

    // PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGSSLMODE, PGCHANNELBINDING


// Production Database in Neon
const pool = new Pool({
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    port: 5432,
    ssl: {
        require: true
    }
});

pool.on('error', (err, client) => {
    console.log('Unexpected error on idle client', err);
    process.exit(-1);
});

pool.connect()
.then(() => console.log('Connected to Postgres'))
.catch((err) => console.log('Error with postgres connection', err));


module.exports = { pool };
5

// user: postgres, pwd: tracker123 