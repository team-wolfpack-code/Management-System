"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Project.hasOne(models.Invoice, {
        foreignKey: "projectId",
        as: "Project",
      });
      Project.hasMany(models.Project_Progress, {
        foreignKey: "projectId",
        as: "Project_Progress",
      });
      // Project.belongsToMany(models.User, {
      //   through: "User_Project",
      //   // foreignKey: "resourcesAllocated",
      //   // sourceKey: "id",
      // });
      Project.belongsTo(models.User, {
        foreignKey: "bdId",
        sourceKey: "id",
      });
      Project.belongsTo(models.User, {
        foreignKey: "teamLeadId",
        sourceKey: "id",
      });
    }
  }
  Project.init(
    {
      resourcesAllocated: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
      },
      bdId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      teamLeadId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM,
        values: ["Pending", "In-progress", "Completed", "Cancelled"],
        allowNull: false,
      },
      clientName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      platform: {
        type: DataTypes.ENUM,
        values: ["Upwork", "Fiver", "Toptal", "Freelancer", "LinkedIn", "B2B"],
        allowNull: false,
      },
      clientRegion: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      hourlyFlag: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      fixedFlag: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      fixedAmount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      hourlyRate: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      b2bFlag: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      milestones: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Project",
    }
  );
  return Project;
};
