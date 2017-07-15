import mongoose from 'mongoose'

export const spotTypeValues = ['STREET', 'PARK']
export const spotAttributeValues = [
  'STAIRS',
  'POOL',
  'KICKER'
]

// the actual database schema for a spot
const spotSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
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

// this is a convinience function so we don't have to deal with the underscore
// on the client. Maps '_id' to 'id'
spotSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

spotSchema.set('toObject', { getters: true })

spotSchema.index({
  title: 'text'
})

// the actual database schema for a user
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: {
    type: String
  },
  fistName: {
    type: String
  },
  lastName: {
    type: String
  },
  stance: {
    type: String,
    enum: ['regular', 'goofy']
  },
  gear: {
    type: String
  },
  links: {
    type: [String]
  },
  description: {
    type: String
  },
  zipCode: {
    type: String, // TODO maybe regex
    required: true
  },
  homeSpot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'spot'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true })

// see above
userSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

// function that can be called on every user
userSchema.methods.checkPassword = function (password) {
  return this.password === password
}

export { spotSchema, userSchema }
