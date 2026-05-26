'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('InterviewRooms', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },

      interviewId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Interviews',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },

      roomId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },

      meetingLink: {
        type: Sequelize.STRING,
        allowNull: true
      },

      status: {
        type: Sequelize.ENUM('active', 'ended', 'scheduled'),
        defaultValue: 'active'
      },

      createdBy: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });

    await queryInterface.addIndex('InterviewRooms', ['interviewId']);
    await queryInterface.addIndex('InterviewRooms', ['roomId']);
    await queryInterface.addIndex('InterviewRooms', ['createdBy']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('InterviewRooms');
  }
};