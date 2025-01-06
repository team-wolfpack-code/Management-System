const { db } = require("../db/models");
const { Attendance } = db;

const GetAllAttendances = async () => {
  try {
    const attendances = await Attendance.findAll({});
    return attendances;
  } catch (err) {
    console.error(err);
    throw Error(err);
  }
};

const GetAttendanceById = async (parent, args) => {
  try {
    const attendance = await Attendance.findOne({
      where: { id: args.id },
    });
    return attendance;
  } catch (err) {
    console.error(err);
    throw Error(err);
  }
};

const CreateAttendance = async (parent, args) => {
  try {
    const {
      employeeId,
      date,
      inTime,
      outTime,
      publicHoliday,
      tourHoliday,
      weekend,
      leave,
      overtime,
    } = args;

    const attendance = await Attendance.create({
      employeeId,
      date,
      inTime,
      outTime,
      publicHoliday,
      tourHoliday,
      weekend,
      leave,
      overtime,
    });
    return attendance;
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

const UpdateAttendance = async (parent, args) => {
  try {
    const { id, ...data } = args;

    if (Object.keys(data).length) {
      const [updated] = await Attendance.update(data, {
        where: { id },
      });
      if (updated) {
        return "Attendance updated successfully!";
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

const DeleteAttendance = async (parent, args) => {
  try {
    const { id } = args;
    const attendance = await Attendance.destroy({
      where: { id },
    });
    if (attendance) {
      return "Attendance deleted successfully!.";
    } else {
      throw Error("Please provide the correct id.");
    }
  } catch (err) {
    console.error(err);
    throw Error(err);
  }
};

module.exports = {
  GetAllAttendances,
  GetAttendanceById,
  CreateAttendance,
  UpdateAttendance,
  DeleteAttendance,
};
