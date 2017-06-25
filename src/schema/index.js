import {
  GraphQLBoolean,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList
} from 'graphql';

import { SpotType, getSpotsInputType, getSpotInputType, UserType, getUserInputType } from './types'

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    getSpots: {
      name: 'getSpots',
      type: new GraphQLList(SpotType),
      args: getSpotsInputType.getFields()
    },
    getSpot: {
      type: SpotType,
      args: getSpotInputType.getFields()
    },
    getUser: {
      type: UserType,
      args: getUserInputType.getFields()
    }
  }
})

const RootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    createSpot: {
      type: SpotType
    },
    updateSpot: {
      type: SpotType
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
