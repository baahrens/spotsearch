import mongoose from 'mongoose'

// the actual database schema for a spot
const spotSchema = new mongoose.Schema({
  title: {
    type: String
  },
  author: {
    type: String,
    required: true
  },
  attributes: {
    type: [String]
  },
  type: {
    type: String,
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
    index: '2d'
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
    type: String
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
