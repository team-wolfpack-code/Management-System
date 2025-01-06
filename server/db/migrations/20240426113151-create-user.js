"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
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
      shiftId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Shifts", //table name
          key: "id",
        },
      },
      roleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Roles", //table name
          key: "id",
        },
      },
      departmentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Departments", //table name
          key: "id",
        },
      },
      employeeId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      mobileNo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      gender: {
        type: Sequelize.ENUM,
        values: ["Male", "Female", "Other"],
        allowNull: false,
      },
      cnic: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      jobTitle: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      hireDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      dob: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM,
        values: ["Active", "Terminated", "Deceased"],
        allowNull: false,
      },
      leaves: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      availableLeaves: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      commissionFlag: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      commissionPercentage: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      providentFund: {
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

      // // Privileges
      // create: {
      //   type: Sequelize.ARRAY(Sequelize.INTEGER),
      //   allowNull: false,
      //   defaultValue: [],
      //   references: {
      //     model: "Roles", // table name
      //     key: "id",
      //   },
      // },
      // read: {
      //   type: Sequelize.ARRAY(Sequelize.INTEGER),
      //   allowNull: false,
      //   defaultValue: [],
      //   references: {
      //     model: "Roles", // table name
      //     key: "id",
      //   },
      // },
      // update: {
      //   type: Sequelize.ARRAY(Sequelize.INTEGER),
      //   allowNull: false,
      //   defaultValue: [],
      //   references: {
      //     model: "Roles", // table name
      //     key: "id",
      //   },
      // },
      // delete: {
      //   type: Sequelize.ARRAY(Sequelize.INTEGER),
      //   allowNull: false,
      //   defaultValue: [],
      //   references: {
      //     model: "Roles", // table name
      //     key: "id",
      //   },
      // },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
