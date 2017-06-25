import { GraphQLInputObjectType, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLInt } from 'graphql'
import { UserType } from './userType'
import { LocationType, LocationInputType } from './locationType'

export const SpotType = new GraphQLObjectType({
  name: 'SpotType',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    title: {
      type: GraphQLString
    },
    author: {
      type: UserType
    },
    createdAt: {
      type: GraphQLString
    },
    updatedAt: {
      type: GraphQLString
    },
    attributes: {
      type: new GraphQLList(GraphQLString)
    },
    type: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    rating: {
      type: GraphQLInt
    },
    pictures: {
      type: new GraphQLList(GraphQLString)
    },
    location: {
      type: LocationType
    }
  })
})

export const getSpotInputType = new GraphQLInputObjectType({
  name: 'getSpotInputType',
  fields: {
    id: {
      type: GraphQLID
    }
  }
})

export const getSpotsInputType = new GraphQLInputObjectType({
  name: 'getSpotsInputType',
  fields: () => ({
    location: {
      type: LocationInputType
    },
    filter: {
      type: GraphQLString
    },
    sort: {
      type: GraphQLString
    }
  })
})
