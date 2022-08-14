'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Agenda, {
        as: 'agendas'
      })
      User.hasMany(models.Event, {
        as: 'events'
      })
      
    } 
  }
  User.init({
    nome: DataTypes.STRING,
    slug: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.STRING,
    avatar: DataTypes.BLOB,
    admin: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};