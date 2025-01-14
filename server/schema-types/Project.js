const graphql = require("graphql");
const { GraphQLDate, GraphQLNonEmptyString } = require("graphql-scalars");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLList,
} = graphql;

const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    resourcesAllocated: { type: new GraphQLList(GraphQLID) },
    bdId: { type: GraphQLID },
    teamLeadId: { type: GraphQLID },
    name: { type: GraphQLNonEmptyString },
    startDate: { type: GraphQLDate },
    endDate: { type: GraphQLDate },
    status: { type: GraphQLNonEmptyString },
    clientName: { type: GraphQLNonEmptyString },
    platform: { type: GraphQLNonEmptyString },
    clientRegion: { type: GraphQLNonEmptyString },
    hourlyFlag: { type: GraphQLBoolean },
    fixedFlag: { type: GraphQLBoolean },
    fixedAmount: { type: GraphQLInt },
    hourlyRate: { type: GraphQLFloat },
    b2bFlag: { type: GraphQLBoolean },
    milestones: { type: GraphQLInt },

    createdAt: { type: GraphQLDate },
    updatedAt: { type: GraphQLDate },
  }),
});

module.exports = ProjectType;
