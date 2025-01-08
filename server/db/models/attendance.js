"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Attendance.belongsTo(models.User, {
        foreignKey: "employeeId",
        sourceKey: "id",
      });
    }
  }
  Attendance.init(
    {
      employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      inTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      outTime: {
        type: DataTypes.TIME,
      },
      publicHoliday: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      tourHoliday: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      weekend: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      leave: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      overtime: {
        type: DataTypes.FLOAT,
      },
    },
    {
      sequelize,
      modelName: "Attendance",

      // Define a unique constraint for the combination of EmployeeId and Date
      indexes: [
        {
          unique: true,
          fields: ["employeeId", "date"],
        },
      ],
    }
  );
  return Attendance;
};
