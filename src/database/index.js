const { Client } = require('pg');
require('dotenv').config();



const client = new Client({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

client.connect();

exports.query = async (queryArgument, params) => {
    const { rows } = await client.query(queryArgument, params);
    return rows;
}