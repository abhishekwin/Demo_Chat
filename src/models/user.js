'use strict';
const {
  Model
} = require('sequelize');
const {
  TableConstants: { USER_DETAILS },
} = require("../../constants/table.constant");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phoneNumber: DataTypes.BIGINT
  }, {
    sequelize,
      modelName: USER_DETAILS.modelName,
      tableName: USER_DETAILS.tableName,
      timestamps: true,
  });
  return User;
};