import { Schema } from 'mongoose'

const spotTypeValues = ['STREET', 'PARK']
const spotAttributeValues = [
  'STAIRS',
  'POOL',
  'KICKER'
]

// the actual database schema for a spot
const spotSchema = new Schema({
  title: {
    type: String,
    required: true,
    index: 'text'
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  attributes: {
    type: [String]
  },
  type: {
    type: String,
    enum: spotTypeValues,
    required: true
  },
  description: {
    type: String
  },
  rating: {
    type: Number,
    min: 0,
    max: 5
  },
  pictures: {
    type: [String]
  },
  location: {
    type: [Number],
    index: '2d',
    required: true
  }
}, { timestamps: true })

spotSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

spotSchema.set('toObject', { getters: true })

export default spotSchema
export { spotAttributeValues, spotTypeValues }
