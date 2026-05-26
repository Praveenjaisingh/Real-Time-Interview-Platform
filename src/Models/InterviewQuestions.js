'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InterviewQuestions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  InterviewQuestions.init({
    interviewId: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'InterviewQuestions',
  });
  return InterviewQuestions;
};