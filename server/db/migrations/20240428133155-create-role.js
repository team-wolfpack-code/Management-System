"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Roles", {
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
      roleName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      designation: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("Roles");
  },
};
