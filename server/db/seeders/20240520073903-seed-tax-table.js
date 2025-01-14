"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Taxes",
      [
        {
          minIncome: 0,
          maxIncome: 600000,
          taxAmount: 0,
          taxRate: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          minIncome: 600001,
          maxIncome: 1200000,
          taxAmount: 0,
          taxRate: 0.05,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          minIncome: 1200001,
          maxIncome: 2200000,
          taxAmount: 30000,
          taxRate: 0.15,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          minIncome: 2200001,
          maxIncome: 3200000,
          taxAmount: 180000,
          taxRate: 0.25,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          minIncome: 3200001,
          maxIncome: 4100000,
          taxAmount: 430000,
          taxRate: 0.3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          minIncome: 4100001,
          // maxIncome: Number.MAX_SAFE_INTEGER,
          maxIncome: 999999999,
          taxAmount: 700000,
          taxRate: 0.35,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Taxes", null, {});
  },
};
