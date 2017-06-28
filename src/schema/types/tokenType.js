import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLInputObjectType
} from 'graphql'

export const TokenType = new GraphQLObjectType({
  name: 'TokenType',
  fields: {
    token: {
      type: GraphQLString
    }
  }
})

export const authenticateInputType = new GraphQLInputObjectType({
  name: 'authenticateInputType',
  fields: {
    email: {
      type: GraphQLString
    },
    password: {
      type: GraphQLString
    }
  }
})
