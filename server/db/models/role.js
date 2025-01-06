"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Role.hasMany(models.User, {
        foreignKey: "roleId",
        as: "Users",
      });
      Role.hasMany(models.Overtime, {
        foreignKey: "roleId",
        // as: "RoleOvertimes",
      });
    }
  }
  Role.init(
    {
      roleName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      designation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Role",
    }
  );
  return Role;
};
