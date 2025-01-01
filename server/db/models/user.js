"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Salary, { foreignKey: "employeeId", as: "Salary" });
      User.hasOne(models.Department, {
        foreignKey: "departmentHead",
        sourceKey: "id",
      });
      User.hasMany(models.Attendance, {
        foreignKey: "employeeId",
        as: "Attendances",
      });
      User.hasMany(models.Project, {
        foreignKey: "bdId",
        as: "Bd-Projects",
      });
      User.hasMany(models.Project, {
        foreignKey: "teamLeadId",
        as: "TeamLead-Projects",
      });
      User.hasMany(models.Salary_Slip, {
        foreignKey: "employeeId",
        as: "Salary Slips",
      });
      User.hasMany(models.Project_Progress, {
        foreignKey: "employeeId",
        as: "Project_Progress",
      });

      User.belongsTo(models.Shift, {
        foreignKey: "shiftId",
        sourceKey: "id",
      });
      User.belongsTo(models.Role, {
        foreignKey: "roleId",
        sourceKey: "id",
      });
      // User.belongsToMany(models.Project, {
      //   through: "User_Project",
      //   as: "Projects",
      //   // foreignKey: "Resources_allocated",
      //   // sourceKey: "id",
      // });
      User.belongsTo(models.Department, {
        foreignKey: "departmentId",
        sourceKey: "id",
      });
    }
  }
  User.init(
    {
      shiftId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      departmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      employeeId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mobileNo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cnic: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      jobTitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hireDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      dob: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM,
        values: ["Active", "Terminated", "Deceased"],
        allowNull: false,
      },
      leaves: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      availableLeaves: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      commissionFlag: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      commissionPercentage: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },

      // // Privileges:
      // create: DataTypes.ARRAY(DataTypes.INTEGER),
      // read: DataTypes.ARRAY(DataTypes.INTEGER),
      // update: DataTypes.ARRAY(DataTypes.INTEGER),
      // delete: DataTypes.ARRAY(DataTypes.INTEGER),
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
