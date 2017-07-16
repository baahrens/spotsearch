import {
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList
} from 'graphql'

import { SpotType } from './spotType'

// The schema representation of a user
// Uses all fields from the Mongoose Schema
export const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    email: {
      type: new GraphQLNonNull(GraphQLString)
    },
    firstName: {
      type: GraphQLString
    },
    lastName: {
      type: GraphQLString
    },
    stance: {
      type: GraphQLString
    },
    gear: {
      type: GraphQLString
    },
    links: {
      type: new GraphQLList(GraphQLString)
    },
    description: {
      type: GraphQLString
    },
    zipCode: {
      type: GraphQLString
    },
    homeSpot: {
      type: SpotType
    },
    createdAt: {
      type: GraphQLString
    }
  })
})

// If want to get a specific user, we just need an ID at this point
export const getUserInputType = new GraphQLInputObjectType({
  name: 'getUserInputType',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    }
  }
})
