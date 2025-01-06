"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Attendances",
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
        employeeId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "Users", //table name
            key: "id",
          },
        },
        date: {
          type: Sequelize.DATEONLY,
          allowNull: false,
        },
        inTime: {
          type: Sequelize.TIME,
          allowNull: false,
        },
        outTime: {
          type: Sequelize.TIME,
        },
        publicHoliday: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        tourHoliday: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        weekend: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        leave: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        overtime: {
          type: Sequelize.FLOAT,
          // allowNull: false,
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
        // Define a unique constraint for the combination of EmployeeId and Date
        indexes: [
          {
            unique: true,
            fields: ["employeeId", "date"],
          },
        ],
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Attendances");
  },
};
