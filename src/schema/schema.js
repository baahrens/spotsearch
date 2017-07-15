import {
  GraphQLBoolean,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList
} from 'graphql';

import {
  UserResolvers,
  SpotResolvers,
  AuthResolvers
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
      resolve: SpotResolvers.findAll
    },
    getSpot: {
      type: SpotType,
      args: getSpotInputType.getFields(),
      resolve: SpotResolvers.findOne
    },
    getUser: {
      type: UserType,
      args: getUserInputType.getFields(),
      resolve: AuthResolvers.needsAuth(UserResolvers.findOne)
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
      resolve: AuthResolvers.authenticate
    },
    register: {
      type: UserType,
      args: authenticateInputType.getFields(),
      resolve: AuthResolvers.register
    },
    createSpot: {
      type: SpotType,
      args: createSpotInputType.getFields(),
      resolve: AuthResolvers.needsAuth(SpotResolvers.create)
    },
    updateSpot: {
      type: SpotType,
      // TODO
      resolve: SpotResolvers.update
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
