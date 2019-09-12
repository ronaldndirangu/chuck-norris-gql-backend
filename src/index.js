import { ApolloServer } from 'apollo-server-express';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { authenticate } from './utils';

dotenv.config();

const {
  APP_PORT = 4000,
  NODE_ENV = 'development',
  DB_URL
} = process.env;

const app = express();
app.disable('x-powered-by');

// Connect to mongo database
mongoose.connect(
  DB_URL,
  { useUnifiedTopology: true }
);

mongoose.connection.once('open', () => {
  console.log('Connected to the database');
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    return { isAuthenticated: authenticate(token) };
  },
  playground: NODE_ENV !== 'production'
});

server.applyMiddleware({ app });

app.listen({ port: APP_PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:${APP_PORT}${server.graphqlPath}`)
);
