const mssql = require("mssql");

// config for your database
var config = {
    user: "sa",
    password: "123456",
    server: "ANDY",
    database: "HR",
    options: {
        trustedConnection: true,
        trustServerCertificate: true,
    },
};

const hr = mssql.connect(config);

module.exports = hr;