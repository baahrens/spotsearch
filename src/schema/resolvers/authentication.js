import jwt from 'jsonwebtoken'
import { GraphQLError } from 'graphql';

import { JWT_SECRET } from '../../server'
import { User } from '../../data/database'

async function authenticate(root, { email, password }, { user: currentUser }) {
  if (currentUser) return

  const user = await User.findOne({ email })

  if (user && user.authenticate(password)) {
    return { token: jwt.sign(user.id, JWT_SECRET) }
  }

  return new GraphQLError('Authentication failed')
}

async function register(root, { email, password }) {
  const user = await User.findOne({ email })
  if (user) return new GraphQLError('E-Mail already in use')

  return User.create({ email, password })
}

// wraps an resolver to check if the user is authenticated and has a valid token
// returns an error if false
const needsAuth = func => (root, args, context) => {
  if (context.user) return func(root, args, context)
  return new GraphQLError('Not authenticated')
}

export { authenticate, register, needsAuth }
