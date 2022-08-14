'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BusinessHours extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BusinessHours.belongsTo(models.Agenda, {
        foreignKey: 'agendaId',
        as: 'agenda'
      })
      
    }
  }
  BusinessHours.init({
    agendaId: DataTypes.INTEGER,
    daysOfWeek: DataTypes.STRING,
    startTime: DataTypes.TIME,
    endTime: DataTypes.TIME,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'BusinessHours',
  });
  return BusinessHours;
};