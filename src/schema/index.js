import { SpotType } from './types'
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList
} from 'graphql';

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
