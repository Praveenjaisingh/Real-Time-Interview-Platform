'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class InterviewRooms extends Model {
    static associate(models) {

      InterviewRooms.belongsTo(models.Interviews, {
        foreignKey: "interviewId",
        as: "interview"
      });
      InterviewRooms.hasMany(models.RoomParticipants, {
        foreignKey: "roomId",   
        sourceKey: "roomId",        
        as: "participants"
      });
      InterviewRooms.belongsTo(models.Users, {
        foreignKey: "createdBy",
        as: "creator"
      });
    }
  }

  InterviewRooms.init({

    interviewId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    roomId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    meetingLink: {
      type: DataTypes.STRING,
      allowNull: true
    },

    status: {
      type: DataTypes.STRING,
      defaultValue: "active"
    },

    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    }

  }, {
    sequelize,
    modelName: 'InterviewRooms',
    tableName: 'InterviewRooms'
  });

  return InterviewRooms;
};