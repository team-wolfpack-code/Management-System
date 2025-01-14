const { GraphQLError } = require("graphql");
const {
  db: { Attendance },
} = require("../db/models");

const GetAllAttendances = async (parent) => {
  try {
    const attendances = await Attendance.findAll();
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
    throw new GraphQLError(err.parent.detail, {
      extensions: {
        code: err.parent.code,
        originalError: err.name,
      },
    });
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
