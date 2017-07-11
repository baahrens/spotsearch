import {
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
  GraphQLEnumType
} from 'graphql'
import { resolveSpotAuthor } from '../resolvers'
import { UserType, getUserInputType } from './userType'

export const spotAttributesType = new GraphQLEnumType({
  name: 'SpotAttributesType',
  values: {
    flat: { value: 'STAIRS' },
    pool: { value: 'POOL' },
    kicker: { value: 'KICKER' }
  }
})

export const spotTypeType = new GraphQLEnumType({
  name: 'SpotTypeType',
  values: {
    street: { value: 'STREET' },
    park: { value: 'PARK' }
  }
})

// The schema representation of a spot
// Uses all fields from the Mongoose Schema
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
      type: UserType,
      resolve: resolveSpotAuthor
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
      type: spotTypeType
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

// If we want to get a specific spot, we just need an ID at this point
export const getSpotInputType = new GraphQLInputObjectType({
  name: 'getSpotInputType',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    }
  }
})

// All fields that can be specified by the client
// for searching, filtering and sorting the spots
// must be listed here
// TODO allowed values for filtering/sorting
export const getSpotsInputType = new GraphQLInputObjectType({
  name: 'getSpotsInputType',
  fields: () => ({
    location: {
      type: new GraphQLList(GraphQLInt)
    },
    filter: {
      type: new GraphQLInputObjectType({
        name: 'SpotsFilterType',
        fields: () => ({
          minRating: { type: GraphQLInt },
          maxRating: { type: GraphQLInt },
          location: { type: new GraphQLList(GraphQLInt) },
          radius: { type: GraphQLInt },
          type: { type: new GraphQLList(spotTypeType) },
          attributes: { type: new GraphQLList(spotAttributesType) },
          author: { type: new GraphQLList(getUserInputType) },
          title: { type: GraphQLString },
          createdAt: { type: GraphQLString },
          updatedAt: { type: GraphQLString },
          city: { type: GraphQLString }
        })
      })
    }
  })
})

// Every value that can be specified by the client
// to create a spot must be listed here
// If a value is required, we need to use GraphQLNonNull()
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
