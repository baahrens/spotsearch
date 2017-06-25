import {
  GraphQLBoolean,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList
} from 'graphql';

import { resolveSpots, resolveSpot, resolveUser, resolveCreateSpot, resolveUpdateSpot } from './resolvers'
import { SpotType, getSpotsInputType, getSpotInputType, UserType, getUserInputType, createSpotInputType } from './types'

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    getSpots: {
      type: new GraphQLList(SpotType),
      args: getSpotsInputType.getFields(),
      resolve: resolveSpots
    },
    getSpot: {
      type: SpotType,
      args: getSpotInputType.getFields(),
      resolve: resolveSpot
    },
    getUser: {
      type: UserType,
      args: getUserInputType.getFields(),
      resolve: resolveUser
    }
  }
})

const RootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    createSpot: {
      type: SpotType,
      args: createSpotInputType.getFields(),
      resolve: (root, data) => resolveCreateSpot({
        ...data,
        author: 'some'
      })
    },
    updateSpot: {
      type: SpotType,
      resolve: resolveUpdateSpot
    },
    removeSpot: {
      type: GraphQLBoolean
    },
    updateUser: {
      type: UserType
    }
  }
})

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
})

export default schema
