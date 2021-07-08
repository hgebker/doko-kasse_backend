import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`#graphql
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
};

const middleware = graphqlHTTP((req, res) => ({
  schema,
  rootValue: root,
  graphiql: true,
  context: { req, res },
}));

export default middleware;
