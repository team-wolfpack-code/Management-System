const {
  db: { Invoice },
} = require("../db/models");

const GetAllInvoices = async (parent) => {
  try {
    const invoices = await Invoice.findAll({});
    return invoices;
  } catch (err) {
    console.error(err);
    throw Error(err);
  }
};

const GetInvoiceById = async (parent, args) => {
  try {
    const invoice = await Invoice.findOne({
      where: { id: args.id },
    });
    return invoice;
  } catch (err) {
    console.error(err);
    throw Error(err);
  }
};

const CreateInvoice = async (parent, args) => {
  try {
    const invoice = await Invoice.create(args);
    return invoice;
  } catch (err) {
    console.error("-------->", err.parent.message);
    if (err.parent.code === "23505") {
      throw Error(err.errors[0].message);
    } else if (err.parent.code === "23503") {
      throw Error(err.parent.detail);
    } else if (err.parent.code === "22P02") {
      throw Error(
        "The status value can only be 'Pending', 'Recieved', or 'Cancelled'."
      );
    } else {
      throw Error(err);
    }
  }
};

const UpdateInvoice = async (parent, args) => {
  try {
    const { id, ...data } = args;

    if (Object.keys(data).length) {
      const [updated] = await Invoice.update(data, {
        where: { id },
      });
      if (updated) {
        return "Invoice updated successfully!";
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

const DeleteInvoice = async (parent, args) => {
  try {
    const { id } = args;
    const invoice = await Invoice.destroy({
      where: { id },
    });
    if (invoice) {
      return "Invoice deleted successfully!.";
    } else {
      throw Error("Please provide the correct id.");
    }
  } catch (err) {
    console.error(err);
    throw Error(err);
  }
};

module.exports = {
  GetAllInvoices,
  GetInvoiceById,
  CreateInvoice,
  UpdateInvoice,
  DeleteInvoice,
};
