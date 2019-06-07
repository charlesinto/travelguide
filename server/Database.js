import mysql from "mysql";
import "dotenv/config";

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: process.env.DEV_INSTANCE_DB
})

export default pool;