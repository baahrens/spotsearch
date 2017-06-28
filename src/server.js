import express from 'express'
import graphql from 'express-graphql'
import bodyParser from 'body-parser'
import debug from 'debug'
import jwt from 'express-jwt'

import schema from './schema'
import './data/database'

const SERVER_PORT = 3000
const serverDebug = debug('spotsearch:server')

const app = express();

app.use('/',
  jwt({
    secret: 'some secret',
    credentialsRequired: false
  }),
  graphql(req => ({
    schema,
    graphiql: true,
    context: { user: req.user }
  }))
)

app.use(bodyParser.text({ type: 'application/graphql' }));

app.listen(SERVER_PORT, () => {
  serverDebug(`Server running on port ${SERVER_PORT}`)
});
