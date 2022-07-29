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
      // define association here
    }
  }
  User.init({
    nome: DataTypes.STRING,
    slug: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.STRING,
    admin: DataTypes.BOOLEAN,
    createdAt: DataTypes.STRING,
    modifieadAt: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};