const {
  db: {
    Salary_Slip,
    Salary,
    User,
    Attendance,
    Project,
    Project_Progress,
    Role,
    Overtime,
  },
} = require("../db/models");

const {
  endOfMonth,
  startOfMonth,
  differenceInBusinessDays,
  subMonths,
  format,
} = require("date-fns");
const { CalculateTax } = require("./Tax");
const { Op, fn, col } = require("sequelize");
const { GraphQLError } = require("graphql");

const GetAllSalarySlips = async (parent) => {
  try {
    const salarySlips = await Salary_Slip.findAll();
    return salarySlips;
  } catch (err) {
    console.error(err);
    throw Error(err);
  }
};

const GetSalarySlipById = async (parent, args) => {
  try {
    const salarySlip = await Salary_Slip.findOne({
      where: { id: args.id },
    });
    return salarySlip;
  } catch (err) {
    console.error(err);
    throw Error(err);
  }
};

const CreateSalarySlip = async (parent, args) => {
  try {
    const salarySlip = await Salary_Slip.create(args);
    return salarySlip;
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

const UpdateSalarySlip = async (parent, args) => {
  try {
    const { id, ...data } = args;

    if (Object.keys(data).length) {
      const [updated] = await Salary_Slip.update(data, {
        where: { id },
      });
      if (updated) {
        return "Salary Slip updated successfully!";
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

const DeleteSalarySlip = async (parent, args) => {
  try {
    const { id } = args;
    const salarySlip = await Salary_Slip.destroy({
      where: { id },
    });
    if (salarySlip) {
      return "Salary Slip deleted successfully!.";
    } else {
      throw Error("Please provide the correct id.");
    }
  } catch (err) {
    console.error(err);
    throw Error(err);
  }
};

const GenerateSalarySlip = async (parent, args) => {
  try {
    const { employeeId } = args;

    const startOfPrevMonth = startOfMonth(subMonths(new Date(), 1));
    const endOfPrevMonth = endOfMonth(subMonths(new Date(), 1));

    const employee = await User.findOne({
      where: { id: employeeId },
      attributes: [
        "id",
        "shiftId",
        "roleId",
        "departmentId",
        "employeeId",
        "name",
        "mobileNo",
        "gender",
        "cnic",
        "email",
        "address",
        "jobTitle",
        "hireDate",
        "dob",
        "status",
        "leaves",
        "availableLeaves",
        "commissionFlag",
        "commissionPercentage",
        [fn("SUM", col("Attendances.leave")), "currentMonthLeaves"], // Add SUM aggregation
        [fn("SUM", col("Attendances.overtime")), "currentMonthOvertime"], // Add SUM aggregation
      ],
      include: [
        {
          model: Salary,
          as: "Salary",
          required: false,
          attributes: ["amount"],
        },
        {
          model: Role,
          required: false,
          attributes: ["designation"],
          include: [
            {
              model: Overtime,
              required: false,
              attributes: ["roleId", "gender", "rate"],
            },
          ],
        },
        {
          model: Attendance,
          as: "Attendances",
          required: false,
          attributes: [],
          where: {
            date: {
              [Op.between]: [startOfPrevMonth, endOfPrevMonth],
            },
          },
        },
      ],
      group: ["User.id", "Salary.id", "Role.id", "Role->Overtimes.id"],
    });

    const overtime = employee.Role.Overtimes.find(
      (x) => x.gender === employee.gender
    );

    let commissionAmount = 0;
    if (employee.commissionFlag) {
      const userProjects = await Project.findAll({
        where: {
          resourcesAllocated: {
            [Op.contains]: [employeeId],
          },
        },
        attributes: [
          "id",
          "name",
          "hourlyRate",
          [fn("SUM", col("Project_Progress.totalAmount")), "totalEarning"],
        ],

        include: [
          {
            model: Project_Progress,
            as: "Project_Progress",
            required: false,
            attributes: [],
            where: {
              endDate: {
                [Op.between]: [startOfPrevMonth, endOfPrevMonth],
              },
            },
          },
        ],
        group: ["Project.id"], // Group by Project ID to allow aggregation
      });

      const totalSum = userProjects.reduce((sum, project) => {
        return sum + (project.dataValues.totalEarning || 0);
      }, 0);
      commissionAmount = employee.commissionPercentage * totalSum;
    }

    const date = format(startOfPrevMonth, "MMMM, yyyy");

    const workingDays = differenceInBusinessDays(
      endOfPrevMonth,
      startOfPrevMonth
    );

    const tax = await CalculateTax(parent, {
      employeeSalary: employee.Salary.amount,
    });

    const leaves =
      employee.availableLeaves < 0
        ? employee.dataValues.currentMonthLeaves || 0
        : 0;

    const fine = leaves * (employee.Salary.amount / workingDays);
    const overtimePay =
      overtime.rate * employee.dataValues.currentMonthOvertime;
    const totalPay =
      employee.Salary.amount -
      employee.Salary.amount * 0.6667 * 0.075 -
      tax -
      fine +
      commissionAmount +
      overtimePay;
    return {
      employeeId: employee.employeeId,
      name: employee.name,
      designation: employee.jobTitle,
      dateOfJoining: employee.hireDate,
      date,
      workingDays,
      salary: employee.Salary.amount,
      basicSalary: employee.Salary.amount * 0.6667,

      overtimePrice: overtime.rate,
      overtimeHours: employee.dataValues.currentMonthOvertime,
      providentFund: employee.Salary.amount * 0.6667 * 0.075,
      tax: Math.round(tax),
      fine,
      extendedLeaves: leaves,
      commission: commissionAmount,
      others: 0,
      totalPay,
    };
  } catch (err) {
    console.error(err);
    throw Error(err);
  }
};

module.exports = {
  GetAllSalarySlips,
  GetSalarySlipById,
  CreateSalarySlip,
  UpdateSalarySlip,
  DeleteSalarySlip,
  GenerateSalarySlip,
};
