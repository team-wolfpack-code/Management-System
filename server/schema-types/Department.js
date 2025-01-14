const graphql = require("graphql");
const { GraphQLDate } = require("graphql-scalars");

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt } = graphql;

const DepartmentType = new GraphQLObjectType({
  name: "Department",
  fields: () => ({
    id: { type: GraphQLID },
    departmentHead: { type: GraphQLID },
    departmentName: { type: GraphQLString },
    employeeCount: { type: GraphQLInt },

    createdAt: { type: GraphQLDate },
    updatedAt: { type: GraphQLDate },
  }),
});

module.exports = DepartmentType;
