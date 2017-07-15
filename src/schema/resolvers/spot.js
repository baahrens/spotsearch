import { Spot, User } from '../../data/database'
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

const findAll = (root, { location, filter, limit }) => {
  const mongooseQuery = buildQuery(location, filter)

  const validLimit = limit <= 100 && limit > 0
  const limitResult = validLimit ? limit : 20

  return Spot.find(mongooseQuery).limit(limitResult)
}

const findOne = (root, { id }) => Spot.findById(id)

const update = (root, { id, data }) => Spot.update(id, data)

const create = async (root, args, { user: userId }) => {
  const user = await User.findOne({ _id: userId })
  if (user) return Spot.create({ author: user._id, ...args })
}

export {
  create,
  update,
  findOne,
  findAll
}
