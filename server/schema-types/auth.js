const graphql = require("graphql");
const { GraphQLObjectType } = graphql;
const userType = require("./User");

const LoginResponseType = new GraphQLObjectType({
  name: "LoginResponse",
  fields: () => ({
    user: { type: userType },
  }),
});

module.exports = LoginResponseType;
