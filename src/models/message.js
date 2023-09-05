'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const { User} = models
      this.belongsTo(User, {
        foreignKey: "sender",
        allowNull: false,
        onDelete: "cascade",
        onUpdate: "cascade",
        as: 'userSender'
      });
      this.belongsTo(User,{
        foreignKey: "receiver",
        allowNull: false,
        onDelete: "cascade",
        onUpdate: "cascade",
        as: 'userReceiver'
      })
      // this.hasMany(Product, {foreignKey:"sellerId"})
      // this.hasMany(addCart, {foreignKey:"userId"})
    }
  }
  Message.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    chatid: {
      type: DataTypes.INTEGER,
      references: { model: "Chats", key: "id" }

    },
    sender: {
      type: DataTypes.INTEGER,
      references: { model: "Users", key: "id" }
    },
    receiver: {
      type: DataTypes.INTEGER,
      references: { model: "Users", key: "id" }

    },
    message: {
      type: DataTypes.STRING
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};