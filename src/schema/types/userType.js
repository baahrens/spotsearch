import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList
} from 'graphql'

import SpotType from './spotType'

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    email: {
      type: GraphQLString
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

export default UserType
