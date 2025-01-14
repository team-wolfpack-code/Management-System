const { GraphQLError } = require("graphql");
const {
  db: { Salary },
} = require("../db/models");

const GetAllSalaries = async (parent) => {
  try {
    const salaries = await Salary.findAll();
    return salaries;
  } catch (err) {
    console.error(err);
    throw Error(err);
  }
};

const GetSalaryById = async (parent, args) => {
  try {
    const salary = await Salary.findOne({
      where: { id: args.id },
    });
    return salary;
  } catch (err) {
    console.error(err);
    throw Error(err);
  }
};

const CreateSalary = async (parent, args) => {
  try {
    const {
      employeeId,
      amount,
      effectiveDate,
      incrementDate,
      incrementPercentage,
    } = args;

    const salary = await Salary.create({
      employeeId,
      amount,
      effectiveDate,
      incrementDate,
      incrementPercentage,
    });
    return salary;
  } catch (err) {
    console.error("-------->", err);
    throw new GraphQLError(err.parent.detail, {
      extensions: {
        code: err.parent.code,
        originalError: err.name,
      },
    });
  }
};

const UpdateSalary = async (parent, args) => {
  try {
    const { id, ...data } = args;

    if (Object.keys(data).length) {
      const [updated] = await Salary.update(data, {
        where: { id },
      });
      if (updated) {
        return "Salary updated successfully!";
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

const DeleteSalary = async (parent, args) => {
  try {
    const { id } = args;
    const salary = await Salary.destroy({
      where: { id },
    });
    if (salary) {
      return "Salary deleted successfully!.";
    } else {
      throw Error("Please provide the correct id.");
    }
  } catch (err) {
    console.error(err);
    throw Error(err);
  }
};

module.exports = {
  GetAllSalaries,
  GetSalaryById,
  CreateSalary,
  UpdateSalary,
  DeleteSalary,
};
