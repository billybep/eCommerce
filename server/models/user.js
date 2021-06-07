'use strict';
const {
  Model
} = require('sequelize');
const { encryptPassword } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsToMany(models.Product, { through: models.Cart })
    }
  };
  User.init({
    username: {
      type      : DataTypes.STRING,
      validate  : { 
        notEmpty: { notEmpty: true }
      }
    },
    email: {
      type      : DataTypes.STRING,
      validate  : { isEmail: true  }
    },
    password: {
      type      : DataTypes.STRING,
      validate  : { 
        len     : {
          args  : [6],
          msg   : 'your password should at least 6 characters length'
        } 
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(instance => {
    instance.password = encryptPassword(instance.password)
    instance.role = 'customer'
  })

  return User;
};