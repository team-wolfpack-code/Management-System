const graphql = require("graphql");
const { GraphQLDate, GraphQLLocalTime } = require("graphql-scalars");

const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLFloat } = graphql;

const ProjectProgressType = new GraphQLObjectType({
  name: "ProjectProgress",
  fields: () => ({
    id: { type: GraphQLID },
    employeeId: { type: GraphQLID },
    projectId: { type: GraphQLID },
    startDate: { type: GraphQLDate },
    endDate: { type: GraphQLDate },
    hoursWorked: { type: GraphQLInt },
    totalAmount: { type: GraphQLFloat },
    startTime: { type: GraphQLLocalTime },
    endTime: { type: GraphQLLocalTime },

    createdAt: { type: GraphQLDate },
    updatedAt: { type: GraphQLDate },
  }),
});

module.exports = ProjectProgressType;
