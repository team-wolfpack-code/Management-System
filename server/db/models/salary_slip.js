"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Salary_Slip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Salary_Slip.belongsTo(models.User, {
        foreignKey: "employeeId",
        sourceKey: "id",
      });
    }
  }
  Salary_Slip.init(
    {
      employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      workingDays: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      salary: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      basicSalary: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      overtimePrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      overtimeHours: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      commission: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      extendedLeaves: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      fine: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      tax: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      providentFund: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      totalPay: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },

    {
      sequelize,
      modelName: "Salary_Slip",
    }
  );
  return Salary_Slip;
};
