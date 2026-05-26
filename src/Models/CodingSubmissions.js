'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CodingSubmissions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CodingSubmissions.init({
    interviewId : DataTypes.INTEGER,
    questionId  : DataTypes.INTEGER,
    userId      : DataTypes.INTEGER,
    code        : DataTypes.TEXT,
    language    : DataTypes.STRING,
    output      : DataTypes.TEXT,
    status       : DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'CodingSubmissions',
  });
  return CodingSubmissions;
};