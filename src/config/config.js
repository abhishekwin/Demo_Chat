// {
//   "development": {
//     "username": "abhishek",
//     "password": "abhishek",
//     "database": "demo_react",
//     "host": "localhost",
//     "dialect": "postgres"
//   },
//   "test": {
//     "username": "root",
//     "password": null,
//     "database": "database_test",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   },
//   "production": {
//     "username": "root",
//     "password": "oihyXIsOtR8wQvl2qWrfXlv9HL9Ng1oz",
//     "database": "ecommerce_s5xi",
//     "host": "dpg-cj9ilv63ttrc73ct99r0-a",
//     "dialect": "postgres"
//   }
// }


const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    username: "abhishek",
    password:"abhishek",
    database: "demo_react",
    host: "localhost",
    dialect:  "postgres",
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },
  staging: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },
};
