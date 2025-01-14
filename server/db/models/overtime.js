"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Overtime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Overtime.belongsTo(models.Role, {
        foreignKey: "roleId",
        sourceKey: "id",
      });
    }
  }
  Overtime.init(
    {
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      gender: {
        type: DataTypes.ENUM,
        values: ["Male", "Female", "Other"],
        allowNull: false,
      },

      rate: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Overtime",
    }
  );
  return Overtime;
};
