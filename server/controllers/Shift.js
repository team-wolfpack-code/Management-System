const {
  db: { Shift },
} = require("../db/models");

// Get All Shifts:
const GetAllShifts = async (parent) => {
  try {
    const shifts = await Shift.findAll({});
    return shifts;
  } catch (err) {
    console.error(err);
    throw Error(err);
  }
};

// Get Shift by Id:
const GetShiftById = async (parent, args) => {
  try {
    const shift = await Shift.findOne({
      where: { id: args.id },
    });
    // if (shift) {
    return shift;
    // }
    // return { message: "There isn't any Shift of this id exist." };
  } catch (err) {
    console.error(err);
    throw Error(err);
  }
};

// Create a new Shift
const AddShift = async (parent, args) => {
  try {
    const { shift, startTime, endTime } = args;

    // const shifts = await Shift.findOne({
    //   where: { shift },
    // });
    // if (shifts) {
    //   throw new Error("This Shift already exist.");
    // }
    const newShift = await Shift.create({
      shift,
      startTime,
      endTime,
    });
    return newShift;
  } catch (err) {
    if (err.parent.code === "23505") {
      throw Error(err.errors[0].message);
    } else {
      throw Error(err);
    }
  }
};

const UpdateShift = async (parent, args) => {
  try {
    const { id, shift, startTime, endTime } = args;

    let newShift = {};
    if (shift) {
      newShift["shift"] = shift;
    }
    if (startTime) {
      newShift["startTime"] = startTime;
    }
    if (endTime) {
      newShift["endTime"] = endTime;
    }
    if (Object.keys(newShift).length) {
      const [updated] = await Shift.update(newShift, {
        where: { id },
        // returning: true, // This option tells Sequelize to return the updated entity
        // plain: true, // This option tells Sequelize to return only the updated entity, not the metadata
      });
      if (updated) {
        return "Shift updated successfully!";
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

const DeleteShift = async (parent, args) => {
  try {
    const { id } = args;
    const delShift = await Shift.destroy({
      where: { id },
    });
    if (delShift) {
      return "Shift deleted successfully!.";
    } else {
      throw Error("Please provide the correct id.");
    }
  } catch (err) {
    console.error(err);
    throw Error(err);
  }
};

module.exports = {
  GetAllShifts,
  GetShiftById,
  AddShift,
  UpdateShift,
  DeleteShift,
};
