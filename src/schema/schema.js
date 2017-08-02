import { makeExecutableSchema } from 'graphql-tools';

import { UserResolvers, SpotResolvers, AuthResolvers } from './resolvers'
import typeDefs from './types'

const resolvers = {
  Query: {
    getSpots: SpotResolvers.findAll,
    getSpot: SpotResolvers.findOne,
    getUser: AuthResolvers.needsAuth(UserResolvers.findOne)
  },
  Mutation: {
    authenticate: AuthResolvers.authenticate,
    register: AuthResolvers.register,
    createSpot: AuthResolvers.needsAuth(SpotResolvers.create)
  },
  Spot: {
    author: ({ author }) => UserResolvers.findOne(author)
  }
}
// export default schema
export default makeExecutableSchema({ typeDefs, resolvers });
