import express from 'express'
import graphqlHTTP from 'express-graphql'
import bodyParser from 'body-parser'
import debug from 'debug'

import schema from './schema'
import './data/database'

const SERVER_PORT = 3000
const serverDebug = debug('spotsearch:server')

const app = express();

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.use(bodyParser.text({ type: 'application/graphql' }));

app.listen(SERVER_PORT, () => {
  serverDebug(`Server running on port ${SERVER_PORT}`)
});
