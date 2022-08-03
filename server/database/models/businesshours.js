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
    agendaID: DataTypes.INTEGER,
    daysOfWeek: DataTypes.STRING,
    startTime: DataTypes.STRING,
    endTime: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'BusinessHours',
  });
  return BusinessHours;
};