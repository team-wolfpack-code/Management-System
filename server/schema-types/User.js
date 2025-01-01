const graphql = require("graphql");
const { GraphQLDate } = require("graphql-scalars");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLFloat,
} = graphql;

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    shiftId: { type: GraphQLID },
    roleId: { type: GraphQLID },
    departmentId: { type: GraphQLID },
    employeeId: { type: GraphQLString },
    name: { type: GraphQLString },
    mobileNo: { type: GraphQLString },
    cnic: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    address: { type: GraphQLString },
    jobTitle: { type: GraphQLString },
    hireDate: { type: GraphQLDate },
    dob: { type: GraphQLDate },
    status: { type: GraphQLString },
    leaves: { type: GraphQLInt },
    availableLeaves: { type: GraphQLFloat },
    commissionFlag: { type: GraphQLBoolean },
    commissionPercentage: { type: GraphQLFloat },

    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
});

module.exports = UserType;
