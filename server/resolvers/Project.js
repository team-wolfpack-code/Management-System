const { GraphQLError } = require("graphql");
const {
  db: { Project },
} = require("../db/models");

const GetAllProjects = async (parent) => {
  try {
    const projects = await Project.findAll();
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
    const project = await Project.create(args);
    return project;
  } catch (err) {
    console.error("-------->", err);
    if (err.parent.code === "22P02") {
      if (err.parent.message.includes("enum_Projects_status")) {
        throw GraphQLError(
          "The status value can only be 'Pending', 'In-progress', 'Completed', or 'Cancelled'.",
          {
            extensions: {
              code: err.parent.code,
              originalError: err.name,
            },
          }
        );
      } else if (err.parent.message.includes("enum_Projects_platform")) {
        throw GraphQLError(
          "The platform value can only be 'Upwork', 'Fiver', 'Toptal', 'Freelancer', 'LinkedIn', or 'B2B'.",
          {
            extensions: {
              code: err.parent.code,
              originalError: err.name,
            },
          }
        );
      } else {
        throw Error(err);
      }
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
