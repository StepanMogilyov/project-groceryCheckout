'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Products',
      [
        {
          name: 'Dirol',
          price: 30,
          article: '000018321651500001',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Orbit',
          price: 20,
          article: '000018361251200001',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Cola',
          price: 40,
          article: '000018359264100001',
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  },
};