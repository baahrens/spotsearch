import { spotTypeValues, spotAttributeValues } from '../data/spotModel'

export default `
  enum SpotType {
    ${spotTypeValues.join(' ')}
  }

  enum SpotAttribute {
    ${spotAttributeValues.join(' ')}
  }
    
  type Spot {
    id: ID!
    title: String
    author: User!
    createdAt: String
    rating: Int
    updatedAt: String
    type: SpotType!
    attributes: [SpotAttribute!]
    description: String
    pictures: [String]
    location: [Float]!
  }

  type User {
    id: ID!
    email: String!
    firstName: String
    lastName: String
    stance: String
    gear: String
    description: String
    zipCode: String
    homeSpot: Spot
    createdAt: String
    links: [String]
  }

  type Token {
    token: String
  }

  input Filter {
    minRating: Int
    maxRating: Int
    radius: Int
    authors: [ID]
    title: String
    createdAt: String
    createdAt: String
    city: String
    type: SpotType!
    attributes: [SpotAttribute!]
  }

  type Query {
    getSpots(location: [Float]!  limit: Int filter: Filter): [Spot]
    getSpot(id: ID!): Spot
    getUser(id: ID!): User
  }

  type Mutation {
    authenticate(email: String! password: String!): Token
    register(email: String! password: String!): User
    createSpot(title: String! description: String, rating: Int pictures: [String] location: [Float]!): Spot
  }
`
