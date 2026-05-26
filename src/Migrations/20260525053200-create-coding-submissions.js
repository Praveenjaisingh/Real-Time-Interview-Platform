'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CodingSubmissions', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },

      interviewId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Interviews',
          key: 'id'
        }
      },

      questionId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Questions',
          key: 'id'
        }
      },

      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },

      code: {
        type: Sequelize.TEXT
      },

      language: {
        type: Sequelize.STRING
      },

      output: {
        type: Sequelize.TEXT
      },

      status: {
        type: Sequelize.STRING
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CodingSubmissions');
  }
};