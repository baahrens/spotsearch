import mongoose from 'mongoose'

const locationSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['Point', 'LineString', 'Polygon'],
    default: 'Point'
  },
  coordinates: {
    type: [Number],
    index: '2d'
  }
})

export const spotSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true
  },
  title: {
    type: String
  },
  author: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updateAt: {
    type: Date
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
  location: locationSchema
})

export const userSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true
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
    type: String, //TODO maybe regex
    required: true
  },
  homeSpot: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})
