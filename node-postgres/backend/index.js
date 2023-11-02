const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv').config();

// Create express app
const app = express();
const port = 3000;

// Create pool
const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: {rejectUnauthorized: false}
});

// Add process hook to shutdown pool
process.on('SIGINT', function() {
    pool.end();
    console.log('Application successfully shutdown');
    process.exit(0);
});

app.set("view engine", "ejs");

// app.get('/', (req, res) => {
//     const data = {name: 'Mario'};
//     res.render('index', data);
// });

app.get('/', (req, res) => {
    orders = []
    pool
        .query('SELECT * FROM orders ORDER BY id DESC LIMIT 20;')
        .then(query_res => {
            for (let i = 0; i < query_res.rowCount; i++){
                orders.push(query_res.rows[i]);
            }
            const data = {orders: orders};
            // console.log(data);
            res.render('users', data);        
        });
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});