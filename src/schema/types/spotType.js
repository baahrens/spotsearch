import {
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLInt
} from 'graphql'
import { UserType } from './userType'

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
      type: new GraphQLList(GraphQLInt)
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
      type: new GraphQLList(GraphQLInt)
    },
    filter: {
      type: GraphQLString
    },
    sort: {
      type: GraphQLString
    }
  })
})

export const createSpotInputType = new GraphQLInputObjectType({
  name: 'createSpotInputType',
  fields: () => ({
    title: {
      type: GraphQLString
    },
    attributes: {
      type: new GraphQLList(GraphQLString)
    },
    type: {
      type: new GraphQLNonNull(GraphQLString)
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
      type: new GraphQLNonNull(new GraphQLList(GraphQLInt))
    }
  })
})
