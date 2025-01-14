"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Salary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Salary.belongsTo(models.User, {
        foreignKey: "employeeId",
        sourceKey: "id",
      });
    }
  }
  Salary.init(
    {
      employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      effectiveDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      incrementDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      incrementPercentage: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Salary",
    }
  );
  return Salary;
};
