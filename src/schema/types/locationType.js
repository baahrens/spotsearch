import { GraphQLInputObjectType, GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt } from 'graphql'

export const LocationType = new GraphQLObjectType({
  name: 'LocationType',
  fields: () => ({
    type: {
      type: GraphQLString
    },
    coordinates: {
      type: new GraphQLList(GraphQLInt)
    }
  })
})

export const LocationInputType = new GraphQLInputObjectType({
  name: 'LocationInputType',
  fields: {
    type: {
      type: GraphQLString
    },
    coordinates: {
      type: new GraphQLList(GraphQLInt)
    }
  }
});
