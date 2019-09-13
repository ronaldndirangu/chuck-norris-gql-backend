import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    joke(category: String!): Joke
    categories: [String!]
  }

  type Joke {
    id: ID!
    value: String!
    url: String
    icon_url: String
    categories: [String!]
  }
`;
