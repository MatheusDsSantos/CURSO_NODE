const mysql = require('mysql')
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    port: 4040,
    user: 'matheus',
    password: '123456*',
    database: 'nodemysql'
})

module.exports = pool