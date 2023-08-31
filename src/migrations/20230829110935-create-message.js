'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      chatid: {
        type: Sequelize.INTEGER,
        references: { model: "Chats", key: "id" }

      },
      sender: {
        type: Sequelize.INTEGER,
        references: { model: "Users", key: "id" }

      },
      receiver: {
        type: Sequelize.INTEGER,
        references: { model: "Users", key: "id" }

      },
      message: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Messages');
  }
};