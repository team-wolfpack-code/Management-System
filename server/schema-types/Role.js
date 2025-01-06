const graphql = require("graphql");
const { GraphQLDate } = require("graphql-scalars");
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const RoleType = new GraphQLObjectType({
  name: "Role",
  fields: () => ({
    id: { type: GraphQLID },
    roleName: { type: GraphQLString },
    designation: { type: GraphQLString },
    description: { type: GraphQLString },

    createdAt: { type: GraphQLDate },
    updatedAt: { type: GraphQLDate },
  }),
});

module.exports = RoleType;
