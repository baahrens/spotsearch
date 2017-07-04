import mongoose from 'mongoose'
import debug from 'debug'
import { spotSchema, userSchema } from './schemas'
import createFixtures from './fixtures'

// The mongo url
// will change in the future
const MONGO_URL = 'mongodb://localhost:27017/local'
const dbDebug = debug('spotsearch:database')

// use ES6 promises
mongoose.Promise = global.Promise

// connect to the DB
mongoose.connect(MONGO_URL)
const db = mongoose.connection;

// Create our models, using the schemata specified in './schema'
export const Spot = db.model('spot', spotSchema)
export const User = db.model('user', userSchema)

db.on('error', error => {
  dbDebug(`Error connecting to Mongo: ${error}`)
})

db.once('open', () => {
  dbDebug(`Connected to Mongo on ${MONGO_URL}`)
  dbDebug('Inserting test data...')
  createFixtures(Spot, User)
})
