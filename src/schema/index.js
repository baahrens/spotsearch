import { GraphQLSchema, GraphQLObjectType, GraphQLList } from 'graphql';

import { SpotType } from './types'

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      spots: {
        type: new GraphQLList(SpotType)
      }
    }
  })
});

export default schema
