'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Agenda extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Agenda.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      })
      Agenda.hasMany(models.BusinessHours, {
        as: 'businessHours'
      })
      Agenda.hasMany(models.Event, {
        as: 'events'
      })
    }
  }
  Agenda.init({
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    url: DataTypes.STRING,
    duration: DataTypes.STRING,
    start: DataTypes.STRING,
    end: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Agenda',
  });
  return Agenda;
};