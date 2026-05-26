'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Questions extends Model {
    static associate(models) {
    }
  }

  Questions.init({

    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    difficulty: DataTypes.ENUM('easy', 'medium', 'hard'),
    category: DataTypes.STRING,

  }, {

    sequelize,
    modelName: 'Questions',

  });

  return Questions;
};