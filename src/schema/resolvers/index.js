import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken'

import { Spots, Users } from '../../data/database'
import { JWT_SECRET } from '../../server'

// these functions tell GraphQL how to resolve a specific type
// and get it from the database

export const resolveSpots = () => Spots.find()

export const resolveSpot = id => Spots.findOne({ id })

export const resolveUser = (root, { id }) => Users.findOne({ id })

export const resolveCreateSpot = (root, { data }) => Spots.create(data)

export const resolveUpdateSpot = (root, { id, data }) => Spots.update(id, data)

// work in progress
// checks user and password for now
export const resolveAuthenticate = async (root, { email, password }) => {
  const user = await Users.findOne({ email })

  if (!user) return new GraphQLError('User not found')

  const validPassword = user.checkPassword(password)

  if (!validPassword) return new GraphQLError('Wrong password')

  return { token: jwt.sign(user, JWT_SECRET) }
}


// wraps an resolver to check if the user is authenticated and has a valid token
// returns an error if false
export const needsAuth = func => (root, args, ctx) => {
  if (ctx.user && jwt.verify(ctx.user)) return func(root, args, ctx)
  return new GraphQLError('Not authenticated')
}
