const { Op } = require("sequelize");
const { db } = require("../db/models");
const { Tax } = db;

const GetAllTaxes = async () => {
  try {
    const taxes = await Tax.findAll({});
    return taxes;
  } catch (err) {
    console.error(err);
    throw Error(err);
  }
};

const GetTaxById = async (parent, args) => {
  try {
    const tax = await Tax.findOne({
      where: { id: args.id },
    });
    return tax;
  } catch (err) {
    console.error(err);
    throw Error(err);
  }
};

const CreateTax = async (parent, args) => {
  try {
    const tax = await Tax.create(args);
    return tax;
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

const UpdateTax = async (parent, args) => {
  try {
    const { id, ...data } = args;

    if (Object.keys(data).length) {
      const [updated] = await Tax.update(data, {
        where: { id },
      });
      if (updated) {
        return "Tax updated successfully!";
      } else {
        throw Error("Please provide the correct id.");
      }
    } else {
      throw Error("Pleasde provide the data to update.");
    }
  } catch (err) {
    console.error(err);
    if (err.parent?.code === "23505") {
      throw Error(err.errors[0].message);
    } else if (err.parent?.code === "23503") {
      throw Error(err.parent.detail);
    } else {
      throw Error(err);
    }
  }
};

const DeleteTax = async (parent, args) => {
  try {
    const { id } = args;
    const tax = await Tax.destroy({
      where: { id },
    });
    if (tax) {
      return "Tax deleted successfully!.";
    } else {
      throw Error("Please provide the correct id.");
    }
  } catch (err) {
    console.error(err);
    throw Error(err);
  }
};

const CalculateTax = async (parent, args) => {
  try {
    const { employeeSalary } = args;
    const annualSalary = employeeSalary * 12;

    const tax = await Tax.findOne({
      where: {
        [Op.and]: [
          { minIncome: { [Op.lte]: annualSalary } },
          { maxIncome: { [Op.gte]: annualSalary } },
        ],
      },
    });
    const annualTax =
      (annualSalary - tax.minIncome + 1) * tax.taxRate + tax.taxAmount;

    return annualTax / 12;
  } catch (err) {
    console.error(err);
    throw Error(err);
  }
};

module.exports = {
  GetAllTaxes,
  GetTaxById,
  CreateTax,
  UpdateTax,
  DeleteTax,
  CalculateTax,
};
