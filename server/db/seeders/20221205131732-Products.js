'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Products',
      [
        {
          name: 'Apple',
          price: 60,
          article: '000018321651500001',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Banana',
          price: 20,
          article: '2',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Potato',
          price: 10,
          article: '3',
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