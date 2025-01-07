const { db } = require("../db/models");
const { User } = db;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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

const GetUserByCnic = async (parent, args) => {
  try {
    const user = await User.findOne({
      where: { cnic: args.cnic },
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
    const salt = await bcrypt.genSalt(30);
    const secretPassword = await bcrypt.hash(password, salt);
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
      password: secretPassword,
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

const loginUser = async (parent, args, context) => {
  const { res } = context;
  const { email, password } = args;
  try {
    const user = await User.findOne({
      where: { email },
    });
    if (!user) {
      throw Error("Please enter valid credentials");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw Error("Please enter valid credentials");
    }

    const userData = {
      id: user.id,
      roleId: user.roleId,
      name: user.name,
      email: user.email,
    };

    const authToken = jwt.sign(userData, process.env.USER_JWT_SECRECT, {
      expiresIn: "1d",
      algorithm: "HS512",
    });

    // Set authToken in cookie
    res.cookie("authToken", authToken, {
      httpOnly: true, // makes the cookie inaccessible to JavaScript (helps against XSS)
      secure: process.env.NODE_ENV === "production", // set to true if using https
      sameSite: "Strict", // helps protect against CSRF
      maxAge: 24 * 60 * 60 * 1000, // cookie expiry time (1 day)
    });

    return { user: userData };
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

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
  GetUserByCnic,
  AddUser,
  UpdateUser,
  DeleteUser,
  loginUser,
};
