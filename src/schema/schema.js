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

// The root query endpoint
// this icludes all functions for getting data
// like getting a spot or a user
// Every query has:
//  - a return value ('type')
//  - allowed arguments ('args')
//  - a resolve funcion ('resolve')
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

// The root mutation endpoint
// this includes all functions for posting data
// like authenticating, creating a spot or updating your profile
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
      // TODO
      resolve: resolveUpdateSpot
    },
    removeSpot: {
      type: GraphQLBoolean
      // TODO
    },
    updateUser: {
      type: UserType
      // TODO
    }
  }
})

// The root schema used in server.js
const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
})

export default schema
