const {
  db: { Role_Privileges },
} = require("../db/models");

const GetAllRolePrivileges = async (parent) => {
  try {
    const rolePrivileges = await Role_Privileges.findAll({});
    return rolePrivileges;
  } catch (err) {
    console.error(err);
    throw Error(err);
  }
};

const GetRolePrivilegeById = async (parent, args) => {
  try {
    const rolePrivilege = await Role_Privileges.findOne({
      where: { id: args.id },
    });
    return rolePrivilege;
  } catch (err) {
    console.error(err);
    throw Error(err);
  }
};

const CreateRolePrivilege = async (parent, args) => {
  try {
    const rolePrivilege = await Role_Privileges.create(args);
    return rolePrivilege;
  } catch (err) {
    console.error("-------->", err.parent.message);
    if (err.parent.code === "23505") {
      throw Error(err.errors[0].message);
    } else if (err.parent.code === "23503") {
      throw Error(err.parent.detail);
    } else {
      throw Error(err);
    }
  }
};

const UpdateRolePrivilege = async (parent, args) => {
  try {
    const { id, ...data } = args;

    if (Object.keys(data).length) {
      const [updated] = await Role_Privileges.update(data, {
        where: { id },
      });
      if (updated) {
        return "Role Privilege updated successfully!";
      } else {
        throw Error("Please provide the correct id.");
      }
    } else {
      throw Error("Pleasde provide the data to update.");
    }
  } catch (err) {
    console.error(err);
    throw Error(err);
  }
};

const DeleteRolePrivilege = async (parent, args) => {
  try {
    const { id } = args;
    const rolePrivilege = await Role_Privileges.destroy({
      where: { id },
    });
    if (rolePrivilege) {
      return "Role Privilege deleted successfully!.";
    } else {
      throw Error("Please provide the correct id.");
    }
  } catch (err) {
    console.error(err);
    throw Error(err);
  }
};

module.exports = {
  GetAllRolePrivileges,
  GetRolePrivilegeById,
  CreateRolePrivilege,
  UpdateRolePrivilege,
  DeleteRolePrivilege,
};
