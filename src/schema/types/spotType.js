import UserType from './userType'
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLInt
} from 'graphql';

const LocationType = new GraphQLObjectType({
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

const SpotType = new GraphQLObjectType({
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

export default SpotType
