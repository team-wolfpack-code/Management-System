"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Projects", {
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
      resourcesAllocated: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: false,
        references: {
          model: "Users", //table name
          key: "id",
        },
      },
      bdId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users", //table name
          key: "id",
        },
      },
      teamLeadId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users", //table name
          key: "id",
        },
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM,
        values: ["Pending", "In-progress", "Completed", "Cancelled"],
        allowNull: false,
      },
      clientName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      platform: {
        type: Sequelize.ENUM,
        values: ["Upwork", "Fiver", "Toptal", "Freelancer", "LinkedIn", "B2B"],
        allowNull: false,
      },
      clientRegion: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      hourlyFlag: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      fixedFlag: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      fixedAmount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      hourlyRate: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      b2bFlag: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      milestones: {
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Projects");
  },
};
