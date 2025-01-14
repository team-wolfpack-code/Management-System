"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Salary_Slips", {
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
      employeeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users", //table name
          key: "id",
        },
      },
      date: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      workingDays: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      salary: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      basicSalary: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      overtimePrice: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      overtimeHours: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      commission: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      extendedLeaves: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      fine: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      tax: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      providentFund: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      others: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      totalPay: {
        type: Sequelize.FLOAT,
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Salary_Slips");
  },
};
