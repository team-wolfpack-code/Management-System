"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Project_Progresses",
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
        projectId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "Projects", //table name
            key: "id",
          },
        },
        startDate: {
          type: Sequelize.DATEONLY,
          allowNull: false,
        },
        endDate: {
          type: Sequelize.DATEONLY,
          allowNull: false,
        },
        hoursWorked: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        totalAmount: {
          type: Sequelize.FLOAT,
          allowNull: false,
        }, // hours_worked * hourly_rate
        startTime: {
          type: Sequelize.TIME,
          allowNull: false,
        },
        endTime: {
          type: Sequelize.TIME,
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
        // Define a unique constraint for the combination of employeeId, projectId and date
        // indexes: [
        //   {
        //     unique: true,
        //     fields: ["employeeId", "projectId", "date"],
        //   },
        // ],
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Project_Progresses");
  },
};
