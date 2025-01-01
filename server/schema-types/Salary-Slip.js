const graphql = require("graphql");
const { GraphQLDate } = require("graphql-scalars");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLFloat,
  GraphQLString,
  GraphQLInt,
} = graphql;

const SalarySlipType = new GraphQLObjectType({
  name: "SalarySlip",
  fields: () => ({
    id: { type: GraphQLID },
    employeeId: { type: GraphQLID },
    date: { type: GraphQLString },
    workingDays: { type: GraphQLInt },
    salary: { type: GraphQLFloat },
    basicSalary: { type: GraphQLFloat },
    overtimePrice: { type: GraphQLFloat },
    overtimeHours: { type: GraphQLFloat },
    commission: { type: GraphQLFloat },
    extendedLeaves: { type: GraphQLFloat },
    fine: { type: GraphQLFloat },
    tax: { type: GraphQLFloat },
    providentFund: { type: GraphQLFloat },
    totalPay: { type: GraphQLFloat },

    createdAt: { type: GraphQLDate },
    updatedAt: { type: GraphQLDate },
  }),
});
const GenerateSalarySlipType = new GraphQLObjectType({
  name: "GenerateSalarySlip",
  fields: () => ({
    employeeId: { type: GraphQLID },
    name: { type: GraphQLString },
    designation: { type: GraphQLString },
    dateOfJoining: { type: GraphQLDate },
    salary: { type: GraphQLFloat },
    date: { type: GraphQLString },
    workingDays: { type: GraphQLInt },
    basicSalary: { type: GraphQLFloat },
    overtimePrice: { type: GraphQLFloat },
    overtimeHours: { type: GraphQLFloat },

    commission: { type: GraphQLFloat },
    extendedLeaves: { type: GraphQLFloat },
    fine: { type: GraphQLFloat },
    tax: { type: GraphQLFloat },
    providentFund: { type: GraphQLFloat },
    totalPay: { type: GraphQLFloat },

    createdAt: { type: GraphQLDate },
    updatedAt: { type: GraphQLDate },
  }),
});

module.exports = { SalarySlipType, GenerateSalarySlipType };
