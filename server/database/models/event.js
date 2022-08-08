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
      Event.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      })
      Event.belongsTo(models.Agenda, {
        foreignKey: 'agendaId',
        as: 'agenda'
      })
    }
  }
  Event.init({
    userId: DataTypes.INTEGER,
    AgendaId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    allDay: DataTypes.BOOLEAN,
    start: DataTypes.DATE,
    end: DataTypes.DATE,
    startTime: DataTypes.STRING,
    endTime: DataTypes.STRING,
    emailAluno: DataTypes.STRING,
    telefoneAluno: DataTypes.STRING,
    description: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};