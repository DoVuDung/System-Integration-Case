const mysql = require("mysql");

const pr = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "pr",
});

module.exports = pr;