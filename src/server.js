import express from 'express'
import graphql from 'express-graphql'
import bodyParser from 'body-parser'
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
app.use('/',
  jwt({ secret: JWT_SECRET, credentialsRequired: false }),
  graphql(({ user }) => ({
    schema,
    graphiql: true,
    context: { user }
  }))
)

app.use(bodyParser.text({ type: 'application/graphql' }));

// start the server
app.listen(SERVER_PORT, () => {
  serverDebug(`Server running on port ${SERVER_PORT}`)
});
