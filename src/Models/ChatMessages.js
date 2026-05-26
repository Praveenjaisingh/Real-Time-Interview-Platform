'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class ChatMessages extends Model {

    static associate(models) {

      ChatMessages.belongsTo(models.Interviews, {
        foreignKey: 'interviewId',
        as: 'interview'
      });

      ChatMessages.belongsTo(models.Users, {
        foreignKey: 'senderId',
        as: 'sender'
      });
    }
  }

  ChatMessages.init(
    {
      interviewId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      senderId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      message: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'ChatMessages',
      tableName: 'ChatMessages',
      timestamps: true
    }
  );

  return ChatMessages;
};