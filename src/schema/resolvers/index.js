import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken'

import { Spot, User } from '../../data/database'
import { JWT_SECRET } from '../../server'

// these functions tell GraphQL how to resolve a specific type
// and get it from the database

export const resolveSpots = () => Spot.find()

export const resolveSpot = id => Spot.findOne({ id })

export const resolveUser = (root, { id }) => User.findById(id)
export const resolveSpotAuthor = ({ author }) => User.findById(author)

export const resolveCreateSpot = (root, { data }) => Spot.create(data)

export const resolveUpdateSpot = (root, { id, data }) => Spot.update(id, data)

// work in progress
// checks user and password for now
export const resolveAuthenticate = async (root, { email, password }) => {
  const user = await User.findOne({ email })

  if (!user || !user.checkPassword(password)) return new GraphQLError('Authentication failed')

  return { token: jwt.sign(user, JWT_SECRET) }
}


// wraps an resolver to check if the user is authenticated and has a valid token
// returns an error if false
export const needsAuth = func => (root, args, context) => {
  if (context.user && jwt.verify(context.user)) return func(root, args, context)
  return new GraphQLError('Not authenticated')
}
