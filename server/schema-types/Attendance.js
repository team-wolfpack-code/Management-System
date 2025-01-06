const graphql = require("graphql");
const { GraphQLDate, GraphQLLocalTime } = require("graphql-scalars");

const { GraphQLObjectType, GraphQLID, GraphQLBoolean, GraphQLFloat } = graphql;

const AttendanceType = new GraphQLObjectType({
  name: "Attendance",
  fields: () => ({
    id: { type: GraphQLID },
    employeeId: { type: GraphQLID },
    date: { type: GraphQLDate },
    inTime: { type: GraphQLLocalTime },
    outTime: { type: GraphQLLocalTime },
    publicHoliday: { type: GraphQLBoolean },
    tourHoliday: { type: GraphQLBoolean },
    weekend: { type: GraphQLBoolean },
    leave: { type: GraphQLFloat },
    overtime: { type: GraphQLFloat },

    createdAt: { type: GraphQLDate },
    updatedAt: { type: GraphQLDate },
  }),
});

module.exports = AttendanceType;
