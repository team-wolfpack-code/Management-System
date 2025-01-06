const graphql = require("graphql");
const { GraphQLDate } = require("graphql-scalars");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLFloat } = graphql;

const OvertimeType = new GraphQLObjectType({
  name: "Overtime",
  fields: () => ({
    id: { type: GraphQLID },
    roleId: { type: GraphQLID },
    gender: { type: GraphQLString },
    rate: { type: GraphQLFloat },

    createdAt: { type: GraphQLDate },
    updatedAt: { type: GraphQLDate },
  }),
});

module.exports = OvertimeType;
