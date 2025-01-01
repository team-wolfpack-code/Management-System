const { db } = require("../db/models");
const { Project } = db;

const GetAllProjects = async () => {
  try {
    const projects = await Project.findAll({});
    return projects;
  } catch (err) {
    console.error(err);
    throw Error(err);
  }
};

const GetProjectById = async (parent, args) => {
  try {
    const project = await Project.findOne({
      where: { id: args.id },
    });
    return project;
  } catch (err) {
    console.error(err);
    throw Error(err);
  }
};

const CreateProject = async (parent, args) => {
  try {
    // const {
    //   employeeId,
    //   date,
    //   inTime,
    //   outTime,
    //   publicHoliday,
    //   tourHoliday,
    //   weekend,
    //   leave,
    // } = args;

    const project = await Project.create(args);
    return project;
  } catch (err) {
    console.error("-------->", err);
    console.error("-------->", err?.parent?.message);
    if (err.parent.code === "23505") {
      throw Error(err.errors[0].message);
    } else if (err.parent.code === "23503") {
      throw Error(err.parent.detail);
    } else if (err.parent.code === "22P02") {
      if (err.parent.message.includes("enum_Projects_status")) {
        throw Error(
          "The status value can only be 'Pending', 'In-progress', 'Completed', or 'Cancelled'."
        );
      } else if (err.parent.message.includes("enum_Projects_platform")) {
        throw Error(
          "The platform value can only be 'Upwork', 'Fiver', 'Toptal', 'Freelancer', 'LinkedIn', or 'B2B'."
        );
      } else {
        throw Error(err);
      }
    } else {
      throw Error(err);
    }
  }
};

const UpdateProject = async (parent, args) => {
  try {
    const { id, ...data } = args;

    if (Object.keys(data).length) {
      const [updated] = await Project.update(data, {
        where: { id },
      });
      if (updated) {
        return "Project updated successfully!";
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

const DeleteProject = async (parent, args) => {
  try {
    const { id } = args;
    const project = await Project.destroy({
      where: { id },
    });
    if (project) {
      return "Project deleted successfully!.";
    } else {
      throw Error("Please provide the correct id.");
    }
  } catch (err) {
    console.error(err);
    throw Error(err);
  }
};

module.exports = {
  GetAllProjects,
  GetProjectById,
  CreateProject,
  UpdateProject,
  DeleteProject,
};
