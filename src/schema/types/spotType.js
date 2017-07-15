import {
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
  GraphQLEnumType,
  GraphQLFloat
} from 'graphql'
import { UserResolvers } from '../resolvers'
import { UserType } from './userType'
import { spotTypeValues, spotAttributeValues } from '../../data/schemas'

export const spotAttributesType = new GraphQLEnumType({
  name: 'SpotAttributesType',
  values: spotAttributeValues.reduce((acc, attribute) => {
    acc[attribute.toLowerCase()] = { value: attribute }
    return acc
  }, {})
})

export const spotTypeType = new GraphQLEnumType({
  name: 'SpotTypeType',
  values: spotTypeValues.reduce((acc, type) => {
    acc[type.toLowerCase()] = { value: type }
    return acc
  }, {})
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
      type: new GraphQLNonNull(UserType),
      resolve: ({ author }) => UserResolvers.findOne(author)
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
      type: new GraphQLNonNull(spotTypeType)
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
      type: new GraphQLNonNull(new GraphQLList(GraphQLFloat))
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
      type: new GraphQLNonNull(new GraphQLList(GraphQLFloat))
    },
    limit: {
      type: GraphQLInt
    },
    filter: {
      type: new GraphQLInputObjectType({
        name: 'SpotsFilterType',
        fields: () => ({
          minRating: { type: GraphQLInt },
          maxRating: { type: GraphQLInt },
          radius: { type: GraphQLInt },
          type: { type: new GraphQLList(spotTypeType) },
          attributes: { type: new GraphQLList(spotAttributesType) },
          authors: { type: new GraphQLList(GraphQLString) },
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
      type: new GraphQLNonNull(GraphQLString)
    },
    attributes: {
      type: spotAttributesType
    },
    type: {
      type: new GraphQLNonNull(spotTypeType)
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
      type: new GraphQLNonNull(new GraphQLList(GraphQLFloat))
    }
  })
})
