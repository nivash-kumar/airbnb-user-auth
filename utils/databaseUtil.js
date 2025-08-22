const mysql = require("mysql2");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "singhkn",
    database: "users"
});

module.exports = pool.promise();