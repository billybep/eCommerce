'use strict';
const { encryptPassword } = require ('../helpers/bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        username  : "administrator",
        email     : "administrator@mail.com",
        password  : encryptPassword('admin123'),
        role      : "admin",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        username  : "client",
        email     : "client@mail.com",
        password  : encryptPassword('client123'),
        role      : "customer",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        username  : "client2",
        email     : "client2@mail.com",
        password  : encryptPassword('client123'),
        role      : "customer",
        createdAt : new Date(),
        updatedAt : new Date()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
