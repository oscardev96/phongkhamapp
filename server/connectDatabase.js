const mysql = require('mysql2');
let database_info = {
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "phongkham",
    multipleStatements: true,
    supportBigNumbers: true,
    waitForConnections: true,
    connectionLimit: 1,
    queueLimit: 0
}


// // xử lý call back với await
const pool = mysql.createPool(database_info);
const mySql_connection = pool.promise();



// // without caching
module.exports = mySql_connection;
