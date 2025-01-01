"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Project_Progress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Project_Progress.belongsTo(models.User, {
        foreignKey: "employeeId",
        sourceKey: "id",
      });
      Project_Progress.belongsTo(models.Project, {
        foreignKey: "projectId",
        sourceKey: "id",
      });
    }
  }
  Project_Progress.init(
    {
      employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      hoursWorked: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      totalAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      }, // hours_worked * hourly_rate
      startTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      endTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Project_Progress",
      // Define a unique constraint for the combination of EmployeeId, ProjectId and Date
      // indexes: [
      //   {
      //     unique: true,
      //     fields: ["employeeId", "projectId", "date"],
      //   },
      // ],
    }
  );
  return Project_Progress;
};
