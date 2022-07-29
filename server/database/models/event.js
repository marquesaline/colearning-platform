'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Event.hasOne(models.User, {
        as: 'user'
      })
      Event.hasOne(models.hasOne, {
        as: 'agenda'
      })
    }
  }
  Event.init({
    title: DataTypes.STRING,
    allDay: DataTypes.BOOLEAN,
    start: DataTypes.STRING,
    end: DataTypes.STRING,
    startTime: DataTypes.STRING,
    endTime: DataTypes.STRING,
    emailAluno: DataTypes.STRING,
    telefoneAluno: DataTypes.STRING,
    description: DataTypes.STRING,
    createdAt: DataTypes.STRING,
    modifiedAt: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};