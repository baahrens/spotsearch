import express from 'express'
import graphql from 'express-graphql'
import debug from 'debug'
import jwt from 'express-jwt'

import schema from './schema'
import './data/database'

export const SERVER_PORT = 3000
export const JWT_SECRET = 'somethin secret' // TODO: move this to ENV or use pubKey

const serverDebug = debug('spotsearch:server')

const app = express();

// this is the only route at this point
// and at the same time the GraphQL endpoint
// JWT (JSONWebToken) is used for authentication
// credentialsRequired is set to false because there are endpoints
// you can reach without being authenticated (getSpots etc) so we check for the user
// in the resolvers
app.use('/',
  jwt({ secret: JWT_SECRET, credentialsRequired: false }),
  graphql(({ user }) => ({
    schema,
    graphiql: true,
    // context is passed to every resolver function
    // we pass the user, as we need to validate authentication in some resolvers
    context: { user }
  }))
)

// start the server
app.listen(SERVER_PORT, () => {
  serverDebug('Server started!')
  serverDebug(`URL: http://localhost:${SERVER_PORT}`)
});
