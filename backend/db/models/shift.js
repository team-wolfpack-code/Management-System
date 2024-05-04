"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Shift extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Shift.hasMany(models.User, {
        foreignKey: "shiftId",
        as: "Users",
      });
    }
  }
  Shift.init(
    {
      shift: { type: DataTypes.STRING, unique: true },
      startTime: DataTypes.TIME,
      endTime: DataTypes.TIME,
    },
    {
      sequelize,
      modelName: "Shift",
    }
  );
  return Shift;
};