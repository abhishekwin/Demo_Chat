'use strict';
const {
  Model, Sequelize
} = require('sequelize');
const {
  TableConstants: { CHAT_DETAILS,USER_DETAILS },
} = require("../../constants/table.constant");
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(User) {
      User.hasOne(Chat,{
        foreignKey: "id",
          as: "Users",
          allowNull: false,
          onDelete: "cascade",
          onUpdate: "cascade",
      })

        Chat.belongsTo(User, {
          foreignKey: "id",
          // as: "Users",
          // allowNull: false,
          // onDelete: "cascade",
          // onUpdate: "cascade",
        });
      
      }
  
      toJSON() {
        return { ...this.get() };
      }
    }
  Chat.init({
    chatType: DataTypes.ENUM("GroupChat","OneToOne"),
    userId:{ type: DataTypes.ARRAY(DataTypes.STRING),  references: { model: USER_DETAILS.tableName, key: "id" },},
    createdBy: DataTypes.STRING,
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: CHAT_DETAILS.modelName,
    tableName: CHAT_DETAILS.tableName,
    timestamps: true,
  });
  return Chat;
};