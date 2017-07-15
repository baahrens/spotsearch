import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

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

const buildQuery = (location, filter) => {
  const mergedFilters = { ...defaultFilter, ...filter } // Merge the user filters with our default ones above


  const radius = mergedFilters.radius * 1000 // Mongo works with meters TODO: do we support miles?

  const resultQuery = {
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
  if (mergedFilters.title) resultQuery.$text = { $search: mergedFilters.title }
  else resultQuery.location = locationQuery

  if (mergedFilters.authors) resultQuery.author = { $in: mergedFilters.authors }

  return resultQuery
}

export const resolveSpots = (root, { location, filter, limit }) => {
  const mongooseQuery = buildQuery(location, filter)

  const validLimit = limit <= 100 && limit > 0
  const limitResult = validLimit ? limit : 20

  return Spot.find(mongooseQuery).limit(limitResult)
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

  const valid = await bcrypt.compare(password, user.password)

  return valid ? { token: jwt.sign(user.id, JWT_SECRET) } : new GraphQLError('Wrong password')
}

export const resolveRegister = async (root, { email, password }) => {
  const user = await User.findOne({ email })

  if (user) return new GraphQLError('E-Mail already in use')

  const passwordHash = await bcrypt.hash(password, 10)

  return User.create({ email, password: passwordHash })
}


// wraps an resolver to check if the user is authenticated and has a valid token
// returns an error if false
export const needsAuth = func => (root, args, context) => {
  if (context.user) return func(root, args, context)
  return new GraphQLError('Not authenticated')
}
