const { db } = require("../db/models");
const { User } = db;

const GetAllUsers = async () => {
  try {
    const users = await User.findAll({});
    return users;
  } catch (err) {
    console.error(err);
    throw Error(err);
  }
};

const GetUserById = async (parent, args) => {
  try {
    const user = await User.findOne({
      where: { id: args.id },
    });
    return user;
  } catch (err) {
    console.error(err);
    throw Error(err);
  }
};

const AddUser = async (parent, args) => {
  try {
    const {
      shiftId,
      roleId,
      departmentId,
      employeeId,
      name,
      mobileNo,
      gender,
      cnic,
      email,
      password,
      address,
      jobTitle,
      hireDate,
      dob,
      status,
      leaves,
      availableLeaves,
      commissionFlag,
      commissionPercentage,
      providentFund,
    } = args;

    const user = await User.create({
      shiftId,
      roleId,
      departmentId,
      employeeId,
      name,
      mobileNo,
      gender,
      cnic,
      email,
      password,
      address,
      jobTitle,
      hireDate,
      dob,
      status,
      leaves,
      availableLeaves,
      commissionFlag,
      commissionPercentage,
      providentFund,
    });
    return user;
  } catch (err) {
    console.error("hello-------->", err);
    if (err.parent.code === "23505") {
      throw Error(err.errors[0].message);
    } else if (err.parent.code === "23503") {
      throw Error(err.parent.detail);
    }
    if (err.parent.code === "22P02") {
      throw Error(
        "The status value can only be 'Active', 'Terminated', or 'Deceased'."
      );
    } else {
      throw Error(err);
    }
  }
};

// const UpdateUser = async (parent, args) => {
//   try {
//     const {
//       id,
//       shiftId,
//       roleId,
//       departmentId,
//       employeeId,
//       name,
//       mobileNo,
//       cnic,
//       email,
//       password,
//       address,
//       jobTitle,
//       hireDate,
//       dob,
//       status,
//       leaves,
//       availableLeaves,
//       commissionFlag,
//       commissionPercentage,
//     } = args;

//     let newUser = {};
//     if (shiftId) {
//       newUser["shiftId"] = shiftId;
//     }
//     if (roleId) {
//       newUser["roleId"] = roleId;
//     }
//     if (departmentId) {
//       newUser["departmentId"] = departmentId;
//     }
//     if (employeeId) {
//       newUser["employeeId"] = employeeId;
//     }
//     if (name) {
//       newUser["name"] = name;
//     }
//     if (mobileNo) {
//       newUser["mobileNo"] = mobileNo;
//     }
//     if (cnic) {
//       newUser["cnic"] = cnic;
//     }
//     if (email) {
//       newUser["email"] = email;
//     }
//     if (password) {
//       newUser["password"] = password;
//     }
//     if (address) {
//       newUser["address"] = address;
//     }
//     if (jobTitle) {
//       newUser["jobTitle"] = jobTitle;
//     }
//     if (hireDate) {
//       newUser["hireDate"] = hireDate;
//     }
//     if (Object.keys(newUser).length) {
//       const [updated] = await User.update(newUser, {
//         where: { id },
//       });
//       if (updated) {
//         return "User updated successfully!";
//       } else {
//         throw Error("Please provide the correct id.");
//       }
//     } else {
//       throw Error("Pleasde provide the data to update.");
//     }
//   } catch (err) {
//     console.error(err);
//     throw Error(err);
//   }
// };

const UpdateUser = async (parent, args) => {
  try {
    const { id, ...updates } = args;

    if (Object.keys(updates).length === 0) {
      throw new Error("Please provide the data to update.");
    }

    const [updated] = await User.update(updates, {
      where: { id },
    });

    if (updated) {
      return "User updated successfully!";
    } else {
      throw new Error("Please provide the correct id.");
    }
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
};
const DeleteUser = async (parent, args) => {
  try {
    const { id } = args;
    const user = await User.destroy({
      where: { id },
    });
    if (user) {
      return "User deleted successfully!.";
    } else {
      throw Error("Please provide the correct id.");
    }
  } catch (err) {
    console.error(err);
    throw Error(err);
  }
};

module.exports = {
  GetAllUsers,
  GetUserById,
  AddUser,
  UpdateUser,
  DeleteUser,
};
