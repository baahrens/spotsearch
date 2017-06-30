import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull
} from 'graphql'

// This represents the token, a user gets if authentication was successful
export const TokenType = new GraphQLObjectType({
  name: 'TokenType',
  fields: {
    token: {
      type: GraphQLString
    }
  }
})

// Filds needed for authenticating
export const authenticateInputType = new GraphQLInputObjectType({
  name: 'authenticateInputType',
  fields: {
    email: {
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      type: new GraphQLNonNull(GraphQLString)
    }
  }
})
