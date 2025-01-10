const { GraphQLError } = require("graphql");
const {
  db: { Overtime },
} = require("../db/models");

const GetAllOvertimes = async (parent) => {
  try {
    const overtimes = await Overtime.findAll();
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
    console.error("-------->", err);
    if (err.parent.code === "22P02") {
      throw new GraphQLError(
        "The gender value can only be 'Male', 'Female', or 'Other'.",
        {
          extensions: {
            code: err.parent.code,
            originalError: err.name,
          },
        }
      );
    } else {
      throw new GraphQLError(err.parent.detail, {
        extensions: {
          code: err.parent.code,
          originalError: err.name,
        },
      });
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
