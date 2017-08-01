import { hashSync, compareSync } from 'bcrypt'
import { Schema } from 'mongoose'

const userSchema = new Schema({
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
    type: String
  },
  homeSpot: {
    type: Schema.Types.ObjectId,
    ref: 'spot'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true })

userSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = this.hashPassword(this.password)
  }
  return next()
})

userSchema.methods = {
  hashPassword(password) {
    return hashSync(password, 10)
  },
  authenticate(password) {
    return compareSync(password, this.password)
  }
}

export default userSchema
