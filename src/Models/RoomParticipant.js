'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class RoomParticipants extends Model {
    static associate(models) {

      RoomParticipants.belongsTo(models.InterviewRooms, {
        foreignKey: "roomId",
        targetKey: "roomId",
        as: "room"
      });

      RoomParticipants.belongsTo(models.Users, {
        foreignKey: "userId",
        as: "user"   
      });
    }
  }

  RoomParticipants.init({
    roomId: {
      type: DataTypes.STRING, 
      allowNull: false
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }

  }, {
    sequelize,
    modelName: 'RoomParticipants',
    tableName: 'RoomParticipants'
  });

  return RoomParticipants;
};