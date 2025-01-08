const {
  db: { Project_Progress },
} = require("../db/models");

const GetAllProjectProgresses = async (parent) => {
  try {
    const projectProgresses = await Project_Progress.findAll({});
    return projectProgresses;
  } catch (err) {
    console.error(err);
    throw Error(err);
  }
};

const GetProjectProgressById = async (parent, args) => {
  try {
    const projectProgress = await Project_Progress.findOne({
      where: { id: args.id },
    });
    return projectProgress;
  } catch (err) {
    console.error(err);
    throw Error(err);
  }
};

const CreateProjectProgress = async (parent, args) => {
  try {
    const projectProgress = await Project_Progress.create(args);
    return projectProgress;
  } catch (err) {
    // console.error("-------->", err.parent.message);
    if (err.parent.code === "23505") {
      throw Error(err.errors[0].message);
    } else if (err.parent.code === "23503") {
      throw Error(err.parent.detail);
    } else {
      throw Error(err);
    }
  }
};

const UpdateProjectProgress = async (parent, args) => {
  try {
    const { id, ...data } = args;

    if (Object.keys(data).length) {
      const [updated] = await Project_Progress.update(data, {
        where: { id },
      });
      if (updated) {
        return "Project Progress updated successfully!";
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

const DeleteProjectProgress = async (parent, args) => {
  try {
    const { id } = args;
    const projectProgress = await Project_Progress.destroy({
      where: { id },
    });
    if (projectProgress) {
      return "Project Progress deleted successfully!.";
    } else {
      throw Error("Please provide the correct id.");
    }
  } catch (err) {
    console.error(err);
    throw Error(err);
  }
};

module.exports = {
  GetAllProjectProgresses,
  GetProjectProgressById,
  CreateProjectProgress,
  UpdateProjectProgress,
  DeleteProjectProgress,
};
