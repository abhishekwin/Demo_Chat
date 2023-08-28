'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Chats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      chatType: {
        type: Sequelize.ENUM("GroupChat","OneToOne")
      },
      userId: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        references: {
          model: 'Users', // Referencing the Users table
          key: 'id'       // Referencing the id column of the Users table
        },
        onUpdate: 'CASCADE', // Optional: Cascade updates to related rows
        onDelete: 'CASCADE' 
      },
      createdBy: {
        type: Sequelize.STRING
      },
      title: {
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
    await queryInterface.dropTable('Chats');
  }
};