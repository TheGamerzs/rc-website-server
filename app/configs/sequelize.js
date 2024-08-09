require("dotenv").config();
module.exports = {
    development: {
        username: "root",
        password: "",
        database: "rc",
        host: "localhost",
        dialect: "mysql",
        migrationStorageTableName: "migrations",
        insecureAuth: true,
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: "rc",
        host: "localhost",
        dialect: "mysql",
    },
};
