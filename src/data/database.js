import mongoose from 'mongoose'
import debug from 'debug'
import { spotSchema, userSchema } from './schemas'

const MONGO_URL = 'mongodb://localhost:27017/local'
const dbDebug = debug('spotsearch:database')

mongoose.Promise = global.Promise

mongoose.connect(MONGO_URL)
const db = mongoose.connection;

export const Spots = db.model('spot', spotSchema)
export const Users = db.model('user', userSchema)

db.on('error', error => {
  dbDebug(`Error connecting to Mongo: ${error}`)
})

db.once('open', () => {
  dbDebug(`Connected to Mongo on ${MONGO_URL}`)
})
