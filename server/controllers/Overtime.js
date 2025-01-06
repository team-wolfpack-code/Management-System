const { db } = require("../db/models");
const { Overtime } = db;

const GetAllOvertimes = async () => {
  try {
    const overtimes = await Overtime.findAll({});
    return overtimes;
  } catch (err) {
    console.error(err);
    throw Error(err);
  }
};

const GetOvertimeById = async (parent, args) => {
  try {
    const overtime = await Overtime.findOne({
      where: { id: args.id },
    });
    return overtime;
  } catch (err) {
    console.error(err);
    throw Error(err);
  }
};

const AddOvertime = async (parent, args) => {
  try {
    const { roleId, gender, rate } = args;

    const overtime = await Overtime.create({
      roleId,
      gender,
      rate,
    });
    return overtime;
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

const UpdateOvertime = async (parent, args) => {
  try {
    const { id, roleId, gender, rate } = args;

    let newOvertime = {};

    if (roleId) {
      newOvertime["roleId"] = roleId;
    }
    if (gender) {
      newOvertime["gender"] = gender;
    }
    if (rate) {
      newOvertime["rate"] = rate;
    }

    if (Object.keys(newOvertime).length) {
      const [updated] = await Overtime.update(newOvertime, {
        where: { id },
      });
      if (updated) {
        return "Overtime updated successfully!";
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

const DeleteOvertime = async (parent, args) => {
  try {
    const { id } = args;
    const overtime = await Overtime.destroy({
      where: { id },
    });
    if (overtime) {
      return "Overtime deleted successfully!.";
    } else {
      throw Error("Please provide the correct id.");
    }
  } catch (err) {
    console.error(err);
    throw Error(err);
  }
};

module.exports = {
  GetAllOvertimes,
  GetOvertimeById,
  AddOvertime,
  UpdateOvertime,
  DeleteOvertime,
};
