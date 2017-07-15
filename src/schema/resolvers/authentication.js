import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { GraphQLError } from 'graphql';

import { JWT_SECRET } from '../../server'
import { User } from '../../data/database'

const authenticate = async (root, { email, password }, { user: currentUser }) => {
  if (currentUser) return

  const user = await User.findOne({ email })
  const valid = await bcrypt.compare(password, user.password)

  if (!user || !valid) return new GraphQLError('Authentication failed')

  return { token: jwt.sign(user.id, JWT_SECRET) }
}

const register = async (root, { email, password }) => {
  const user = await User.findOne({ email })

  if (user) return new GraphQLError('E-Mail already in use')

  const passwordHash = await bcrypt.hash(password, 10)

  return User.create({ email, password: passwordHash })
}

// wraps an resolver to check if the user is authenticated and has a valid token
// returns an error if false
const needsAuth = func => (root, args, context) => {
  if (context.user) return func(root, args, context)
  return new GraphQLError('Not authenticated')
}

export {
  authenticate,
  register,
  needsAuth
}
