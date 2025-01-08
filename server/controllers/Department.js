const {
  db: { Department },
} = require("../db/models");

const GetAllDepartments = async (parent) => {
  try {
    const departments = await Department.findAll({});
    return departments;
  } catch (err) {
    console.error(err);
    throw Error(err);
  }
};

const GetDepartmentById = async (parent, args) => {
  try {
    const department = await Department.findOne({
      where: { id: args.id },
    });
    // if (shift) {
    return department;
    // }
    // return { message: "There isn't any Shift of this id exist." };
  } catch (err) {
    console.error(err);
    throw Error(err);
  }
};

const AddDepartment = async (parent, args) => {
  try {
    // const { departmentName, departmentHead, employeeCount } = args;
    const { ...departmentFeilds } = args;

    const department = await Department.create(departmentFeilds);
    return department;
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

const UpdateDepartment = async (parent, args) => {
  try {
    const { id, departmentName, departmentHead, employeeCount } = args;

    let newDepartment = {};
    if (departmentName) {
      newDepartment["departmentName"] = departmentName;
    }
    if (departmentHead) {
      newDepartment["departmentHead"] = departmentHead;
    }
    if (employeeCount) {
      newDepartment["employeeCount"] = employeeCount;
    }
    if (Object.keys(newDepartment).length) {
      const [updated] = await Department.update(newDepartment, {
        where: { id },
      });
      if (updated) {
        return "Department updated successfully!";
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

const DeleteDepartment = async (parent, args) => {
  try {
    const { id } = args;
    const department = await Department.destroy({
      where: { id },
    });
    if (department) {
      return "Department deleted successfully!.";
    } else {
      throw Error("Please provide the correct id.");
    }
  } catch (err) {
    console.error(err);
    throw Error(err);
  }
};

module.exports = {
  GetAllDepartments,
  GetDepartmentById,
  AddDepartment,
  UpdateDepartment,
  DeleteDepartment,
};
