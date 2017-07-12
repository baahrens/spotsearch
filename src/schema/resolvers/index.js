import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken'

import { Spot, User } from '../../data/database'
import { JWT_SECRET } from '../../server'
import { spotTypeValues, spotAttributeValues } from '../../data/schemas'

const defaultFilter = {
  minRating: 0,
  maxRating: 5,
  radius: 50,
  type: spotTypeValues,
  attributes: spotAttributeValues
}

export const resolveSpots = (root, { location, filter }) => {
  const mergedFilters = { ...defaultFilter, ...filter } // Merge the user filters with our default ones above

  const radius = mergedFilters.radius * 1000 // Mongo works with meters TODO: do we support miles?

  const mongooseFilter = {
    rating: {
      $gte: mergedFilters.minRating, // gte = greater than or equal
      $lte: mergedFilters.maxRating  // lte = lower than or equal
    },
    type: {
      $in: mergedFilters.type
    },
    attributes: {
      $in: mergedFilters.attributes
    }
  }

  const locationQuery = {
    $near: location,
    $maxDistance: radius
  }

  // Mongo doesn't support geo seach and text search at the same time,
  // so if the user specified a title, we'll use that, otherwise use the location
  if (mergedFilters.title) mongooseFilter.$text = { $search: mergedFilters.title }
  else mongooseFilter.location = locationQuery

  if (mergedFilters.authors) mongooseFilter.author = { $in: mergedFilters.authors }

  return Spot.find(mongooseFilter)
}

export const resolveSpot = (root, { id }) => Spot.findById(id)

export const resolveUser = (root, { id }) => User.findById(id)
export const resolveSpotAuthor = ({ author }) => User.findById(author)

export const resolveCreateSpot = async (root, args, { user: userId }) => {
  const user = await User.findOne({ _id: userId })
  if (user) return Spot.create({ author: user._id, ...args })
}

export const resolveUpdateSpot = (root, { id, data }) => Spot.update(id, data)

// work in progress
// checks user and password for now
export const resolveAuthenticate = async (root, { email, password }) => {
  const user = await User.findOne({ email })

  if (!user) return new GraphQLError('User not found')

  if (!user.checkPassword(password)) return new GraphQLError('Authentication failed')

  return { token: jwt.sign(user.id, JWT_SECRET) }
}


// wraps an resolver to check if the user is authenticated and has a valid token
// returns an error if false
export const needsAuth = func => (root, args, context) => {
  if (context.user) return func(root, args, context)
  return new GraphQLError('Not authenticated')
}
