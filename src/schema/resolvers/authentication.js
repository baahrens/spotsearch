import jwt from 'jsonwebtoken'

import { JWT_SECRET } from '../../server'
import { User } from '../../data/database'

async function authenticate(root, { email, password }, { user: currentUser }) {
  if (currentUser) return

  const user = await User.findOne({ email })

  if (!user && !user.authenticate(password)) {
    return new Error('Authentication failed')
  }

  return { token: jwt.sign(user.id, JWT_SECRET) }
}

async function register(root, { email, password }) {
  const user = await User.findOne({ email })
  if (user) return new Error('E-Mail already in use')

  return User.create({ email, password })
}

// wraps an resolver to check if the user is authenticated and has a valid token
// returns an error if false
const needsAuth = func => (root, args, context) => {
  if (context.user) return func(root, args, context)
  return new Error('Not authenticated')
}

export { authenticate, register, needsAuth }
