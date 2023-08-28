const { readdirSync } = require("fs");
const { join, basename } = require("path");
const { Sequelize } = require("sequelize");

require("dotenv").config();


const dbConfig = require("../config/db.config");  
const sequelize = new Sequelize(dbConfig.production);

const db = {};

readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 &&
      file !== basename(__filename) &&
      file.slice(-3) === ".js",
  )
  .forEach((file) => {
    // eslint-disable-next-line import/no-dynamic-require
    const model = require(join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes,
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});



db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db.sequelize;
