import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken'

import { Spot, User } from '../../data/database'
import { JWT_SECRET } from '../../server'

const defaultFilter = {
  minRating: 0,
  maxRating: 5,
  radius: 50,
  type: ['STREET', 'PARK'], // TODO: constant file for things like this
  attributes: ['STAIRS', 'POOL', 'KICKER'] // TODO: same
}

// these functions tell GraphQL how to resolve a specific type
// and get it from the database
export const resolveSpots = (root, { location, filter }) => {
  const mergedFilters = { ...defaultFilter, ...filter } // Merge the user filters with our default ones above

  const radius = mergedFilters.radius * 1000 // Mongo works with meters TODO: do we support miles?

  const mongooseFilter = {
    rating: {
      $gte: mergedFilters.minRating,
      $lte: mergedFilters.maxRating
    },
    type: {
      $in: mergedFilters.type
    },
    attributes: {
      $in: mergedFilters.attributes
    }
  }

  // Mongo doesn't support geo seach and text search at the same time,
  // so if the user specified a title, we'll use that, otherwise use the location
  if (mergedFilters.title) mongooseFilter.$text = { $search: mergedFilters.title }
  else {
    mongooseFilter.location = {
      $near: location,
      $maxDistance: radius
    }
  }

  return Spot.find(mongooseFilter)
}

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
