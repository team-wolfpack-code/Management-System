const {
  db: { Role },
} = require("../db/models");

const GetAllRoles = async (parent) => {
  try {
    const roles = await Role.findAll({});
    return roles;
  } catch (err) {
    console.error(err);
    throw Error(err);
  }
};

const GetRoleById = async (parent, args) => {
  try {
    const role = await Role.findOne({
      where: { id: args.id },
    });
    // if (shift) {
    return role;
    // }
    // return { message: "There isn't any Shift of this id exist." };
  } catch (err) {
    console.error(err);
    throw Error(err);
  }
};

const AddRole = async (parent, args) => {
  try {
    const { roleName, designation, description } = args;

    const role = await Role.create({
      roleName,
      designation,
      description,
    });
    return role;
  } catch (err) {
    console.error(err);
    if (err.parent.code === "23505") {
      throw Error(err.errors[0].message);
    } else if (err.parent.code === "23503") {
      throw Error(err.parent.detail);
    } else {
      throw Error(err);
    }
  }
};

const UpdateRole = async (parent, args) => {
  try {
    const { id, roleName, designation, description } = args;

    let newRole = {};
    if (roleName) {
      newRole["roleName"] = roleName;
    }
    if (designation) {
      newRole["designation"] = designation;
    }
    if (description) {
      newRole["description"] = description;
    }
    if (Object.keys(newRole).length) {
      const [updated] = await Role.update(newRole, {
        where: { id },
      });
      if (updated) {
        return "Role updated successfully!";
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

const DeleteRole = async (parent, args) => {
  try {
    const { id } = args;
    const role = await Role.destroy({
      where: { id },
    });
    if (role) {
      return "Role deleted successfully!.";
    } else {
      throw Error("Please provide the correct id.");
    }
  } catch (err) {
    console.error(err);
    throw Error(err);
  }
};

module.exports = {
  GetAllRoles,
  GetRoleById,
  AddRole,
  UpdateRole,
  DeleteRole,
};
