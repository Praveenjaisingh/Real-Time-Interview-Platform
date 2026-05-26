'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RoomParticipants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      roomId: {
        type: Sequelize.STRING, // ✅ FIXED (UUID)
        allowNull: false,
        references: {
          model: 'InterviewRooms',
          key: 'roomId' // ✅ IMPORTANT
        },
        onDelete: 'CASCADE'
      },

      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE'
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

    await queryInterface.addConstraint('RoomParticipants', {
      fields: ['roomId', 'userId'],
      type: 'unique',
      name: 'unique_room_user'
    });

    await queryInterface.addIndex('RoomParticipants', ['roomId']);
    await queryInterface.addIndex('RoomParticipants', ['userId']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('RoomParticipants');
  }
};