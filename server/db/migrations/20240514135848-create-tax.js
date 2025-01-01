"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Taxes",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
          // Set `id` field as not updatable
          set() {
            throw new Error("id field is not updatable");
          },
        },
        minIncome: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: true,
        },
        maxIncome: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: true,
        },
        taxRate: {
          type: Sequelize.DOUBLE,
          allowNull: false,
        },
        taxAmount: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          // Set `createdAt` field as not updatable
          set() {
            throw new Error("createdAt field is not updatable");
          },
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          // Set `updatedAt` field as not updatable
          set() {
            throw new Error("updatedAt field is not updatable");
          },
        },
      },
      {
        // Define a unique constraint for the combination of minIncome and maxIncome
        indexes: [
          {
            unique: true,
            fields: ["minIncome", "maxIncome"],
          },
        ],
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Taxes");
  },
};
