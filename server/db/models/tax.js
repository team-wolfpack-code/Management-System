"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tax extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tax.init(
    {
      minIncome: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      maxIncome: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      taxRate: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      taxAmount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Tax",

      // Define a unique constraint for the combination of minIncome and maxIncome
      indexes: [
        {
          unique: true,
          fields: ["minIncome", "maxIncome"],
        },
      ],
    }
  );
  return Tax;
};
