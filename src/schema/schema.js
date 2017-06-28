import {
  GraphQLBoolean,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList
} from 'graphql';

import {
  needsAuth,
  resolveSpots,
  resolveSpot,
  resolveUser,
  resolveCreateSpot,
  resolveUpdateSpot,
  resolveAuthenticate
} from './resolvers'

import {
  SpotType,
  UserType,
  TokenType,
  getSpotsInputType,
  getSpotInputType,
  getUserInputType,
  createSpotInputType,
  authenticateInputType
} from './types'

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
      resolve: needsAuth(resolveUser)
    }
  }
})

const RootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    authenticate: {
      type: TokenType,
      args: authenticateInputType.getFields(),
      resolve: resolveAuthenticate
    },
    createSpot: {
      type: SpotType,
      args: createSpotInputType.getFields(),
      resolve: resolveCreateSpot
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
