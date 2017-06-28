import mongoose from 'mongoose'

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

spotSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

spotSchema.set('toObject', { getters: true })

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

userSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

userSchema.methods.checkPassword = function (password) {
  return this.password === password
}

export { spotSchema, userSchema }
